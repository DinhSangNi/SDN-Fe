import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserActiveStatus } from '@/services/user.service';
import toast from 'react-hot-toast';

export const useUpdateUserActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) =>
      await updateUserActiveStatus(id, isActive),
    onSuccess: () => {
      toast.success('Status update successful');
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
    onError: () => {
      toast.error('An error occurred while updating the status.');
    },
  });
};
