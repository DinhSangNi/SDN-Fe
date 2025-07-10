import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '@/services/post.service';
import { toast } from 'react-hot-toast';
import type { PostFormData } from '@/components/custom/PostForm';
import { useRouter } from 'next/navigation';

export function useCreatePost() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: PostFormData) => {
      return await createPost(data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
      toast.success('Create post successfully!');
      router.push('/admin/post');
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Create post failed!');
    },
  });

  return mutation;
}
