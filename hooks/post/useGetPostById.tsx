import { useQuery } from '@tanstack/react-query';
import { getPostById } from '@/services/post.service';

export const useGetPostById = (id: string) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      return await getPostById(id);
    },
    enabled: !!id,
  });
};
