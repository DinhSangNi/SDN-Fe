// hooks/useSeatsBySlot.ts
import { useQuery } from '@tanstack/react-query';
import { getSeatsBySlot } from '@/services/seat.service';
import { Booking, Seat } from '@/types';

interface UseSeatsBySlotParams {
  labId: string;
  date: string;
  slot: number;
  enabled: boolean;
}

export const useSeatsBySlot = ({
  labId,
  date,
  slot,
  enabled = true,
}: UseSeatsBySlotParams) => {
  return useQuery<(Seat & { isBooked: boolean; booking: Booking })[]>({
    queryKey: ['seats', labId, date, slot],
    queryFn: () => getSeatsBySlot({ labId: labId, date: date, slot: slot }),
    enabled: !!labId && !!date && !!slot && enabled,
    staleTime: 5 * 60 * 1000,
  });
};
