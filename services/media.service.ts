import api from '@/lib/axiosInstance';
import { Media } from '@/types';

export async function uploadMedia(file: File): Promise<Media> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await api.post('/media/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data.data as Media;
}

export const deleteMediaByUrl = async (url: string) => {
  return await api.delete(`/media`, {
    params: {
      url: url,
    },
  });
};
