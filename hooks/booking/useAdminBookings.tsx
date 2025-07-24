import { useQuery } from '@tanstack/react-query';
import {
  getAllBookings,
  GetAllBookingsParams,
} from '@/services/booking.service';

export const useAdminBookings = (params: GetAllBookingsParams) => {
  return useQuery({
    queryKey: ['bookings', params],
    queryFn: () => getAllBookings(params),
    staleTime: 1000 * 60 * 3,
  });
};
