'use client';

import React from 'react';
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

export const createUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(1, 'Please input your full name'),
  role: z.enum(['student', 'admin'], {
    message: 'Please select at least 1 role',
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

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

  const onSubmit = async (data: CreateUserInput) => {
    mutateAsync(data, {
      onSuccess: () => {
        router.push(`/admin/user`);
      },
    });
  };

  useEffect(() => {
    if (isSuccess) reset();
  }, [isSuccess]);

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Create User</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-[70%] mx-auto"
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
    </div>
  );
}
