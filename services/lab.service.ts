import api from '@/lib/axiosInstance';

export const getAllLabs = async () => {
  const res = await api.get(`/lab`);
  return res.data.data;
};
