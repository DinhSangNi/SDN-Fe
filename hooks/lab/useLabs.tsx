import { useQuery } from '@tanstack/react-query';
import { getLabs, GetLabsParams } from '@/services/lab.service';

export const useLabs = (params: GetLabsParams) => {
  return useQuery({
    queryKey: ['labs', params],
    queryFn: async () => {
      return await getLabs(params);
    },
    staleTime: 3 * 60 * 1000,
  });
};
