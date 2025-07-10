import { useQuery } from '@tanstack/react-query';
import { getPosts, GetPostsParams } from '@/services/post.service';

export const usePost = (params: GetPostsParams) => {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: async () => {
      return await getPosts(params);
    },
    staleTime: 3 * 60 * 1000,
  });
};
