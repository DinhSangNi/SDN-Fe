'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCancelMultipleBookings } from '@/hooks/booking/useCancelMultipleBookings';
import { useQueryClient } from '@tanstack/react-query';

interface CancelBookingsModalProps {
  open: boolean;
  onClose: () => void;
  bookingIds: string[];
}

export function CancelLabBookingsModal({
  open,
  onClose,
  bookingIds,
}: CancelBookingsModalProps) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useCancelMultipleBookings();

  const handleCancel = () => {
    mutate(
      {
        bookingIds,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['bookings'],
          });
        },
      }
    );
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Bookings</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 text-sm">
          <p>
            Are you sure you want to cancel <strong>{bookingIds.length}</strong>{' '}
            bookings?
          </p>
          <p>This action cannot be undone.</p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleCancel}
            disabled={isPending}
          >
            {isPending ? 'Cancelling...' : 'Confirm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
