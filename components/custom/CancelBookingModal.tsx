'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogOverlay,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';

interface CancelBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  seatNumber: string;
  date: string;
  slot: number;
}

export default function CancelBookingModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  seatNumber,
  date,
  slot,
}: CancelBookingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed z-50 bg-white p-6 rounded-lg max-w-md w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center text-red-600">
            Cancel Booking
          </DialogTitle>
        </DialogHeader>

        <div className="text-sm text-start mt-2">
          <p className="mb-1 text-gray-700">
            Are you sure you want to cancel the booking for:
          </p>
          <p>
            <b>Seat:</b> {seatNumber}
          </p>
          <p>
            <b>Date:</b> {dayjs(date).format('DD-MM-YYYY')}
          </p>
          <p>
            <b>Slot:</b> {slot}
          </p>
        </div>

        <DialogFooter className="flex justify-center gap-3 mt-6">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            No, Keep it
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Cancelling...' : 'Yes, Cancel'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
