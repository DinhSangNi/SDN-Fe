import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelLabBooking } from '@/services/booking.service';
import toast from 'react-hot-toast';

export const useCancelLabBooking = (
  labId: string,
  date: string,
  slot: number
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (labBookingId: string) => cancelLabBooking(labBookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['seats', labId, date, slot],
      });
      toast.success('Booking updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Booking failed');
    },
  });
};
