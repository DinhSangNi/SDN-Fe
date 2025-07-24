import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateBookingDto, createLabBooking } from '@/services/booking.service';
import toast from 'react-hot-toast';

type Props = {
  data: Partial<CreateBookingDto>;
};

export const useCreateLabBooking = ({ data }: Props) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createLabBooking(data as CreateBookingDto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['seats', data.labId, data.date, data.slot],
      });
      toast.success('Booking created successfully!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Booking failed');
    },
  });
};
