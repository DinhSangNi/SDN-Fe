import { useQuery } from '@tanstack/react-query';
import { getLabById } from '@/services/lab.service';
import { Lab } from '@/types';

export const useLabById = (labId: string | undefined) => {
  return useQuery<Lab>({
    queryKey: ['labs', labId],
    queryFn: async () => {
      return await getLabById(labId as string);
    },
    enabled: !!labId,
    staleTime: 3 * 60 * 1000,
  });
};
