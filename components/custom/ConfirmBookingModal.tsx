'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Seat } from '@/types';
import { format } from 'date-fns';

type ConfirmBookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  seat: Seat;
  date: string;
  slot: number;
  isLoading?: boolean;
};

export default function ConfirmBookingModal({
  isOpen,
  onClose,
  onConfirm,
  seat,
  date,
  slot,
  isLoading = false,
}: ConfirmBookingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Booking</DialogTitle>
        </DialogHeader>

        <div className="text-sm text-center">
          <p className="text-[1rem]">
            Book seat <b>{seat.seatNumber}</b> at slot <b>{slot}</b> on{' '}
            <b>{format(new Date(date), 'PPP')}</b>?
          </p>
        </div>

        <DialogFooter className="flex justify-center gap-2 mt-4">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={isLoading}>
            {isLoading ? 'Booking...' : 'Confirm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
