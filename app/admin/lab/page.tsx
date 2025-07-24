'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { useLabs } from '@/hooks/lab/useLabs';
import { GetLabsParams } from '@/services/lab.service';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

export default function LabsManagementPage() {
  const [params, setParams] = useState<GetLabsParams>({
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isSuccess } = useLabs(params);

  const labs = isSuccess ? data.data : [];
  const total = data?.meta.totalItems || 0;
  const totalPages = Math.ceil(total / (params.limit || 10));

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams((prev) => ({
      ...prev,
      keyword: e.target.value,
      page: 1,
    }));
  };

  const handleStatusChange = (value: string) => {
    setParams((prev) => ({
      ...prev,
      status: value === 'ALL' ? undefined : (value as 'active' | 'inactive'),
      page: 1,
    }));
  };

  const handlePageChange = (newPage: number) => {
    setParams((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Lab Management</h1>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Input
          placeholder="Search labs..."
          value={params.keyword || ''}
          onChange={handleKeywordChange}
          className="max-w-sm"
        />

        <div className="flex items-center gap-2">
          <Label>Status</Label>
          <Select onValueChange={handleStatusChange} defaultValue="ALL">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3}>Loading...</TableCell>
              </TableRow>
            ) : labs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3}>No labs found.</TableCell>
              </TableRow>
            ) : (
              labs.map((lab) => (
                <TableRow key={lab._id}>
                  <TableCell>{lab.name}</TableCell>
                  <TableCell>
                    <Badge
                      className={`capitalize ${lab.status === 'active' ? 'bg-green-500 hover:bg-green-500 text-white' : 'bg-orange-300 hover:bg-orange-300 text-white'}`}
                    >
                      {lab.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(lab.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Link href={`/admin/lab/${lab._id}`}>
                            View details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 focus:text-red-700">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {labs && labs.length > 0 && (
        <div className="flex justify-end items-center mt-4">
          <div className="flex gap-2 items-center">
            <Button
              className="w-6 aspect-square"
              onClick={() => handlePageChange((params.page || 1) - 1)}
              disabled={params.page === 1}
            >
              <ChevronLeft />
            </Button>
            <span className="text-[0.9rem]">
              {params.page} / {totalPages}
            </span>
            <Button
              className="w-6 aspect-square"
              onClick={() => handlePageChange((params.page || 1) + 1)}
              disabled={params.page === totalPages}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
