import { useQuery } from '@tanstack/react-query';
import { getBookingsByLabAndDateRange } from '@/services/booking.service';

type UseLabBookingParams = {
  labId: string;
  from: string;
  to: string;
};

export const useLabBooking = ({ labId, from, to }: UseLabBookingParams) => {
  return useQuery({
    queryKey: ['lab-bookings', labId, from, to],
    enabled: !!labId,
    queryFn: async () => {
      return await getBookingsByLabAndDateRange(labId, from, to);
    },
  });
};
