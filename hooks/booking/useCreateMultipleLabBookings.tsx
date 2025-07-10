import { createMultipleLabBookings } from '@/services/booking.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type CreateMultipleLabBookingsBody = {
  lab: string;
  date: string;
  slot: number;
}[];

export const useCreateMultipleLabBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateMultipleLabBookingsBody) => {
      return await createMultipleLabBookings(payload);
    },
    onSuccess: (_data, variables) => {
      const uniqueLab = [...new Set(variables.map((b) => b.lab))];
      uniqueLab.forEach((labId) => {
        queryClient.invalidateQueries({ queryKey: ['lab-booking', labId] });
      });
    },
  });
};
