import { useQuery } from '@tanstack/react-query';
import { getSeatsByLabId } from '@/services/seat.service';
import { Seat } from '@/types';

export const useSeatsByLabId = (labId: string) => {
  return useQuery<Seat[]>({
    queryKey: ['seats', labId],
    queryFn: async () => await getSeatsByLabId(labId),
    enabled: !!labId,
    staleTime: 3 * 60 * 1000,
  });
};
