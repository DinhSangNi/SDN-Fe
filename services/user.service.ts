import api from '@/lib/axiosInstance';
import { PaginationResponse, User } from '@/types';

export type GetUsersParams = {
  role?: string;
  isActive?: boolean;
  page: number;
  limit: number;
};

export type CreateUserDto = {
  email: string;
  password: string;
  fullName: string;
  role: 'student' | 'admin';
};

export const getUsers = async (params?: GetUsersParams) => {
  const res = await api.get('/user', {
    params: {
      ...params,
      isActive: params?.isActive?.toString(),
    },
  });
  return res.data.data as PaginationResponse<User>;
};

export const createUser = async (payload: CreateUserDto) => {
  const res = await api.post(`/user`, payload);
  return res.data;
};

export const updateUserRole = async (id: string, role: 'admin' | 'student') => {
  const res = await api.patch(`/user/${id}/role`, { role });
  return res.data;
};

export const updateUserActiveStatus = async (id: string, isActive: boolean) => {
  const res = await api.patch(`/user/${id}/active`, { isActive });
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await api.delete(`/user/${id}`);
  return res.data;
};
