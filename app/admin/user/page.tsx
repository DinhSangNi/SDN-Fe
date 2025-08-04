'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, Trash2 } from 'lucide-react';

import { GetUsersParams } from '@/services/user.service';
import { User } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useUsers } from '@/hooks/user/useUser';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { useUpdateUserRole } from '@/hooks/user/useUpdateUserRole';
import { useUpdateUserActive } from '@/hooks/user/useUpdateUserActive';
import ConfirmDeleteDialog from '@/components/custom/ConfirmDeleteDialog';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';
import { Loader2 } from "lucide-react"

const roles = ['admin', 'student'];

export default function UserManagePage() {
  const [filters, setFilters] = useState<GetUsersParams>({
    isActive: true,
    page: 1,
    limit: 10,
    role: undefined,
  });

  const { data, isLoading, isError } = useUsers(filters);

  const users = data?.data || [];
  const meta = data?.meta;

  const changeRoleMutation = useUpdateUserRole();
  const updateActiveMutation = useUpdateUserActive();

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleRoleChange = (role: string) => {
    setFilters((prev) => ({
      ...prev,
      role: role === 'all' ? undefined : role,
      page: 1,
    }));
  };

  const changeRole = (data: { id: string; role: 'admin' | 'student' }) => {
    changeRoleMutation.mutate(data);
  };

  const toggleActiveStatus = (id: string, current: boolean) => {
    updateActiveMutation.mutate({ id, isActive: !current });
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }
  if (isError) return <p>Failed to fetch user data.</p>;

  return (
    <div className="space-y-4">
      <div className="">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">User Management</h1>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center space-x-2">
            <h1>Role:</h1>
            <Select
              onValueChange={handleRoleChange}
              value={filters.role || 'all'}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? (
            users.map((user: User) => (
              <TableRow key={user._id}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    value={user.role}
                    onValueChange={(value) =>
                      changeRole({
                        id: user._id,
                        role: value as 'admin' | 'student',
                      })
                    }
                  >
                    <SelectTrigger className="w-[120px] h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell
                  onClick={() =>
                    toggleActiveStatus(user._id, user.isActive as boolean)
                  }
                >
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger>
                      {user.isActive ? (
                        <span className="text-green-600 font-bold">Active</span>
                      ) : (
                        <span className="text-red-500 font-bold">Inactive</span>
                      )}
                    </TooltipTrigger>
                    <TooltipContent className="bg-white p-1 ">
                      {user.isActive ? (
                        <p className="text-[0.8rem] text-red-500">
                          Change to Inactive
                        </p>
                      ) : (
                        <p className="text-[0.8rem] text-green-600">
                          Change to Active
                        </p>
                      )}
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => console.log('View', user._id)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </DropdownMenuItem>
                      <ConfirmDeleteDialog type="user" id={user._id}>
                        <DropdownMenuItem
                          className="text-red-600 flex items-center gap-2"
                          onSelect={(e) => e.preventDefault()}
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </DropdownMenuItem>
                      </ConfirmDeleteDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-end items-center mt-4 space-x-2 text-sm">
        <Button
          disabled={filters.page <= 1}
          className="h-8 p-0 aspect-square"
          onClick={() => handlePageChange(filters.page - 1)}
        >
          <ChevronLeft />
        </Button>

        <span>
          Page {filters.page} / {meta?.totalPages}
        </span>

        <Button
          disabled={filters.page >= (meta?.totalPages || 1)}
          className="h-8 p-0 aspect-square"
          onClick={() => handlePageChange(filters.page + 1)}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
