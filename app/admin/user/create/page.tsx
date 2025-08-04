'use client';

import React, { useState, useRef } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateUser } from '@/hooks/user/useCreateUser';
import { useEffect } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { Upload, X, FileText, UserPlus, FileSpreadsheet, Download, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import api from '@/lib/axiosInstance';
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';

export const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(1, 'Please input your full name'),
  role: z.enum(['student', 'admin'], {
    message: 'Please select at least 1 role',
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

interface CSVUserData {
  email: string;
  fullName: string;
}

export default function CreateUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const { mutateAsync, isPending, isSuccess } = useCreateUser();
  const router = useRouter();

  // CSV Upload states
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<CSVUserData[]>([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isCreatingUsers, setIsCreatingUsers] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // CSV Upload handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    const allowedTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain',
      'application/json'
    ];

    const allowedExtensions = ['.csv', '.xls', '.xlsx', '.txt', '.json'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));

    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      toast.error('Please select a valid file (CSV, Excel, TXT, or JSON)');
      return;
    }

    setIsUploading(true);
    setCsvFile(file);

    try {
      // Parse file content locally (no API call yet)
      let parsedData: CSVUserData[] = [];

      if (file.type === 'application/json' || fileExtension === '.json') {
        // Handle JSON files
        const text = await file.text();
        const jsonData = JSON.parse(text);
        parsedData = Array.isArray(jsonData) ? jsonData.map(item => ({
          email: item.email || '',
          fullName: item.fullName || item.name || '',
        })) : [];
      } else if (fileExtension === '.csv' || file.type === 'text/csv' || file.type === 'text/plain') {
        // Handle CSV/TXT files
        const text = await file.text();
        const lines = text.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim());

        parsedData = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
          return {
            email: values[0] || '',
            fullName: values[1] || '',
          };
        }).filter(user => user.email);
      } else if (fileExtension === '.xlsx' || fileExtension === '.xls' ||
        file.type === 'application/vnd.ms-excel' ||
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        // Handle Excel files
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Skip header row and convert to our format
        const rows = jsonData.slice(1) as string[][];
        parsedData = rows.map(row => ({
          email: row[1]?.toString() || '',
          fullName: row[0]?.toString() || '',
        })).filter(user => user.email);
      } else {
        toast.error('Unsupported file format. Please use CSV, Excel, TXT, or JSON files.');
        return;
      }

      setCsvData(parsedData.filter(user => user.email)); // Filter out empty rows
      setShowPreviewModal(true);
    } catch (error) {
      toast.error('Error parsing file. Please check the file format.');
    } finally {
      setIsUploading(false);
    }
  };

  // Handle bulk user creation
  const handleBulkCreateUsers = async () => {
    if (csvData.length === 0) {
      return;
    }

    setIsCreatingUsers(true);
    try {
      // First upload the file to get a URL (if needed for audit trail)
      let fileUrl = null;
      if (csvFile) {
        console.log("SCV File", csvFile);
        const formData = new FormData();
        formData.append('file', csvFile);

        // console.log('Uploading file...', formData.get('file'));

        const uploadResponse = await api.post('/users/import-excel', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        fileUrl = uploadResponse.data.url;
      }
      toast.success("Successfully created users!");
      // Close modal and reset
      setShowPreviewModal(false);
      setCsvData([]);
      setCsvFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error in bulk creation:', error);
      toast.error('Error creating users. Please try again.');
    } finally {
      setIsCreatingUsers(false);
    }
  };

  const onSubmit = async (data: CreateUserInput) => {
    mutateAsync(data, {
      onSuccess: () => {
        router.push(`/admin/user`);
      },
    });
  };

  useEffect(() => {
    if (isSuccess) reset();
  }, [isSuccess, reset]);

  console.log("SCVDATA", csvData)

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Create User</h1>
        <p className="text-gray-600">Create users manually or upload a CSV file</p>
      </div>

      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Manual Creation
          </TabsTrigger>
          <TabsTrigger value="csv" className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            CSV Upload
          </TabsTrigger>
        </TabsList>

        {/* Manual Creation Tab */}
        <TabsContent value="manual">
          <Card>
            <CardHeader>
              <CardTitle>Create User Manually</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    {...register('email')}
                    placeholder="example@gmail.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register('password')}
                    placeholder="********"
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    {...register('fullName')}
                    placeholder="Nguyen Van A"
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-500">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <Label>Role</Label>
                  <Select
                    {...register('role')}
                    onValueChange={(value) =>
                      setValue('role', value as 'admin' | 'student')
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && (
                    <p className="text-sm text-red-500">{errors.role.message}</p>
                  )}
                </div>

                <Button type="submit" disabled={isPending} className="font-bold">
                  {isPending ? 'Creating...' : 'Create User'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CSV Upload Tab */}
        <TabsContent value="csv">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Upload User Data File</span>
                <a
                  href="/sample-users.csv"
                  download="sample-users.csv"
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  <Download className="h-4 w-4" />
                  Download Sample
                </a>
              </CardTitle>
              <p className="text-sm text-gray-600">
                Upload a file with user data. Supported formats: CSV, Excel, TXT, JSON
              </p>
              <div className="mt-2 p-3 bg-gray-50 rounded-lg text-xs">
                <p className="font-medium text-gray-700 mb-1">File format examples:</p>
                <div className="space-y-1 text-gray-600">
                  <p><strong>CSV/TXT:</strong> email,fullName</p>
                  <p><strong>Excel:</strong> Column A: email, Column B: fullName</p>
                  <p><strong>JSON:</strong> {`[{"email":"user@example.com","fullName":"John Doe"}]`}</p>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p className="text-gray-500 text-xs">
                    <strong>Note:</strong> Password will be set to default, role will be &apos;student&apos;. First row should contain headers.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
                  }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                  accept=".csv,.xls,.xlsx,.txt,.json"
                />

                {csvFile ? (
                  <div className="flex items-center justify-center space-x-3">
                    <FileText className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900">{csvFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(csvFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setCsvFile(null);
                        setCsvData([]);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      className="text-red-500 hover:text-red-700"
                      title="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        Drop your file here, or{' '}
                        <button
                          type="button"
                          className="text-blue-600 hover:text-blue-500 underline"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                        >
                          browse
                        </button>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Supported formats: CSV, Excel (.xls, .xlsx), TXT, JSON
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Expected columns: email, fullName
                      </p>
                    </div>
                  </div>
                )}

                {isUploading && (
                  <div className="mt-4">
                    <p className="text-blue-600">Processing file...</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* CSV Preview Modal */}
      <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Preview CSV Data</DialogTitle>
            <p className="text-sm text-gray-600">
              Review and edit the data before creating users. Click on any cell to edit.
            </p>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Found {csvData.length} users to create
              </p>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {csvData.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Input
                          value={user.email}
                          onChange={(e) => {
                            const newData = [...csvData];
                            newData[index].email = e.target.value;
                            setCsvData(newData);
                          }}
                          className="min-w-[200px]"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={user.fullName}
                          onChange={(e) => {
                            const newData = [...csvData];
                            newData[index].fullName = e.target.value;
                            setCsvData(newData);
                          }}
                          className="min-w-[150px]"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newData = csvData.filter((_, i) => i !== index);
                            setCsvData(newData);
                          }}
                          className="text-red-500 hover:text-red-700"
                          title="Delete row"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPreviewModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleBulkCreateUsers}
              disabled={csvData.length === 0 || isCreatingUsers}
            >
              {isCreatingUsers ? 'Creating...' : `Create ${csvData.length} Users`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
