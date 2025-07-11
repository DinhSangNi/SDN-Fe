import { createUser, CreateUserDto } from '@/services/user.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateUserDto) => {
      const res = await createUser(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
      toast.success('Create user successfully');
    },
    onError: () => {
      toast.success('Create user Fail');
    },
  });
};
