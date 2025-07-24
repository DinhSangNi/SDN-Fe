import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLab, CreateLabDto } from '@/services/lab.service';
import toast from 'react-hot-toast';

export const useCreateLab = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLabDto) => createLab(data),
    onSuccess: () => {
      toast.success('Lab created successfully!');
      queryClient.invalidateQueries({ queryKey: ['labs'] });
    },
    onError: (error: any) => {
      toast.error('Failed to create lab.');
    },
  });
};
