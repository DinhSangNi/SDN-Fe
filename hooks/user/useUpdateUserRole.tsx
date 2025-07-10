import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserRole } from '@/services/user.service';
import toast from 'react-hot-toast';

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      role,
    }: {
      id: string;
      role: 'admin' | 'student';
    }) => await updateUserRole(id, role),

    onSuccess: () => {
      toast.success('User role updated successfully');
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },

    onError: () => {
      toast.error('Failed to update user role');
    },
  });
};
