// hooks/useCancelMultipleBookings.ts
import { useMutation } from '@tanstack/react-query';
import { cancelMultipleBookings } from '@/services/booking.service';
import toast from 'react-hot-toast';

export const useCancelMultipleBookings = () => {
  return useMutation({
    mutationFn: cancelMultipleBookings,
    onSuccess: () => {
      toast.success('Hủy các ghế thành công');
    },
    onError: () => {
      const message = 'Hủy ghế thất bại. Vui lòng thử lại.';
      toast.error(message);
    },
  });
};
