import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePostPriority } from '@/services/post.service';

export function useUpdatePostPriority() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePostPriority,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
