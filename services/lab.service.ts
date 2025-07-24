import api from '@/lib/axiosInstance';
import { PaginatedResponse } from './booking.service';
import { Lab } from '@/types';

export interface CreateLabDto {
  name: string;
  description?: string;
  location?: string;
  totalSeats?: number;
  autoGenerateSeats?: boolean;
}
export interface GetLabsParams {
  keyword?: string;
  status?: 'active' | 'inactive';
  page?: number;
  limit?: number;
}

export const createLab = async (data: CreateLabDto): Promise<Lab> => {
  const response = await api.post('/labs', data);
  return response.data.data;
};

export const getLabs = async (
  params: GetLabsParams
): Promise<PaginatedResponse<Lab>> => {
  const res = await api.get('/labs', {
    params,
  });
  return res.data.data;
};

export const getLabById = async (labId: string) => {
  const res = await api.get(`/labs/${labId}`);
  return res.data.data;
};
