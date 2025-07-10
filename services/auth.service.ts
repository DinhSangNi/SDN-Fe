import api from '@/lib/axiosInstance';

export const login = async (loginFormData: {
  email: string;
  password: string;
}) => {
  const res = await api.post(`/auth/login`, loginFormData);
  return res;
};

export const register = async (registerFormData: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const res = await api.post(`/auth/register`, registerFormData);
  return res;
};

export const logout = async () => {
  const res = await api.post(`/auth/logout`);
  return res;
};

export const refreshToken = async () => {
  const res = await api.post(`/auth/refresh`);
  return res;
};
