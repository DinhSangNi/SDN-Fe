import { useMutation, useQueryClient } from '@tanstack/react-query';
import { togglePostVisibility } from '@/services/post.service';
import toast from 'react-hot-toast';

export function useTogglePostVisibility() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: togglePostVisibility,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
