import { useQuery } from '@tanstack/react-query';
import { getAllLabs } from '@/services/lab.service';

export const useLab = () => {
  return useQuery({
    queryKey: ['lab'],
    queryFn: async () => {
      return await getAllLabs();
    },
  });
};
