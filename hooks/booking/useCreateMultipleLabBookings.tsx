import {
  CreateBookingDto,
  createMultipleLabBookings,
} from '@/services/booking.service';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useCreateMultipleLabBooking = () => {
  return useMutation({
    mutationFn: createMultipleLabBookings,
    onSuccess: () => {
      toast.success('Booking successfully!');
    },
    onError: () => {
      toast.error('Booking failed!');
    },
  });
};
