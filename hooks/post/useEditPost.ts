import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostFormData } from '@/components/custom/PostForm';
import { useRouter } from 'next/navigation';
import { editPost } from '@/services/post.service';
import toast from 'react-hot-toast';

export const useEditPost = (id: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: PostFormData) => {
      await editPost(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', id] });
      toast.success('Update post successfully');
      router.push('/admin/post');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Create post failed!');
    },
  });
};
