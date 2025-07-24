'use client';

import { useCreateLabBooking } from '@/hooks/booking/useCreateBooking';
import { useSeatsBySlot } from '@/hooks/seat/useSeatsBySlot';
import { useState } from 'react';
import { Booking, Seat } from '@/types';
import { useParams, useSearchParams } from 'next/navigation';
import ConfirmBookingModal from '@/components/custom/ConfirmBookingModal';
import dayjs from 'dayjs';
import { SLOT_TIME } from '../../calendar/page';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from '@radix-ui/react-dialog';
import { DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import CancelBookingModal from '@/components/custom/CancelBookingModal';
import { useCancelLabBooking } from '@/hooks/booking/useCancelBooking';
import { Clock, Users } from 'lucide-react';
import { BackButton } from '@/components/custom/BackButton';
import { Skeleton } from '@/components/ui/skeleton';

function SeatSkeleton() {
  return <Skeleton className="w-10 h-10 rounded border" />;
}

export default function SeatBookingPage() {
  const searchParams = useSearchParams();
  const param = useParams();

  const labId = param.id || '';
  const date = searchParams.get('date') || '';
  const slot = Number(searchParams.get('slot'));

  const user = useSelector((state: RootState) => state.auth);

  const [selectedSeat, setSelectedSeat] = useState<
    (Seat & { isBooked: boolean; booking: Booking }) | null
  >();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isRejectBookingOpen, setIsRejectBookingOpen] =
    useState<boolean>(false);

  const {
    data: seats = [],
    isLoading,
    refetch,
  } = useSeatsBySlot({
    labId: (labId as string) ?? '',
    date,
    slot,
    enabled: !!labId && !!date && !!slot,
  });

  const seatsChunks = [seats.slice(0, 20), seats.slice(20, seats.length)];

  const { mutateAsync: bookSeat, isPending: isBooking } = useCreateLabBooking({
    data: {
      labId: (labId as string) ?? '',
      slot,
      date,
      seatId: selectedSeat?._id,
    },
  });

  const { mutateAsync: cancelBooking } = useCancelLabBooking(
    (labId as string) ?? '',
    date,
    slot
  );

  const handleCancelBooking = async () => {
    if (!selectedSeat) return;
    await cancelBooking(selectedSeat?.booking?._id);
    await refetch();
    setIsCancelModalOpen(false);
    setSelectedSeat(null);
  };

  const handleConfirm = async () => {
    if (!selectedSeat) return;
    await bookSeat();
    await refetch();
    setSelectedSeat(null);
  };

  return (
    <div className="w-[80%] mx-auto py-8">
      <div className="flex flex-col items-center">
        <div className="flex justify-start w-full">
          <BackButton />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-center">
          {`Seat Booking for ${dayjs(date).format('DD-MM-YYYY')}`}
        </h1>
        <div className="flex gap-4 items-center text-[0.9rem]">
          <div className="flex gap-2 items-end">
            <Clock className="w-[1rem]" />
            <p>{`Slot ${slot}(${SLOT_TIME[slot as keyof typeof SLOT_TIME].start} - ${SLOT_TIME[slot as keyof typeof SLOT_TIME].end})`}</p>
          </div>
          <div className="flex gap-2 items-end">
            <Users className="w-[1rem]" />
            <p className="text-center">
              {`${seats.filter((seat) => seat.isBooked).length}/${seats.length}`}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-center my-6">
        <div className="flex gap-2 items-center">
          <div className="w-6 h-6 bg-purple-300"></div>
          <p className="text-[0.8rem]">Booked by you</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-6 h-6 bg-red-300"></div>
          <p className="text-[0.8rem]">Booked by other</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-6 h-6 bg-green-300"></div>
          <p className="text-[0.8rem]">Available</p>
        </div>
      </div>

      {isLoading ? (
        <div className="min-h-[80vh] border bg-white mt-4 px-14 py-6">
          <div className="flex justify-center mb-16">
            <div className="w-1/2 px-2 py-1 border-2 text-center text-sm bg-gray-200">
              Screen
            </div>
          </div>
          <div className="flex justify-between">
            {/* Dãy bên trái */}
            <div className="w-1/3 flex h-fit">
              <div className="space-y-1">
                {[...Array(10)].map((_, idx) => (
                  <SeatSkeleton key={`left-top-${idx}`} />
                ))}
              </div>
              <div className="p-2 border flex items-center justify-center text-sm bg-gray-200 mx-4">
                <p className="rotate-90">Desk</p>
              </div>
              <div className="space-y-1">
                {[...Array(10)].map((_, idx) => (
                  <SeatSkeleton key={`left-bottom-${idx}`} />
                ))}
              </div>
            </div>

            {/* Dãy bên phải */}
            <div className="space-y-6 h-fit w-fit">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <SeatSkeleton key={`right-top-${i}-${idx}`} />
                    ))}
                  </div>
                  <div className="p-2 border flex items-center justify-center text-sm bg-gray-200 my-2">
                    <p>Desk</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <SeatSkeleton key={`right-bottom-${i}-${idx}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[80vh] border bg-white mt-4 px-14 py-6">
          <div className="flex justify-center mb-16">
            <div className="w-1/2 px-2 py-1 border-2 text-center text-sm bg-gray-200">
              Screen
            </div>
          </div>
          <div className="flex justify-between">
            {/* Dãy bên trái */}
            <div className="w-1/3 flex h-fit">
              <div className="space-y-1">
                {seatsChunks?.[0]
                  .slice(0, Math.ceil(seatsChunks?.[0].length / 2))
                  .map((seat) => renderSeat(seat))}
              </div>
              <div className="p-2 border flex items-center justify-center text-sm bg-gray-200 mx-4">
                <p className="rotate-90">Desk</p>
              </div>
              <div className="space-y-1">
                {seatsChunks?.[0]
                  .slice(
                    Math.ceil(seatsChunks?.[0].length / 2),
                    Math.ceil(seatsChunks?.[0].length / 2) * 2
                  )
                  .map((seat) => renderSeat(seat))}
              </div>
            </div>

            {/* Dãy bên phải */}
            <div className="space-y-6 h-fit w-fit">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <div className="flex gap-1">
                    {seatsChunks?.[1]
                      .slice(i * 2 * chunkSize(), (i * 2 + 1) * chunkSize())
                      .map((seat) => renderSeat(seat))}
                  </div>
                  <div className="p-2 border flex items-center justify-center text-sm bg-gray-200 my-2">
                    <p>Desk</p>
                  </div>
                  <div className="flex gap-1">
                    {seatsChunks?.[1]
                      .slice(
                        (i * 2 + 1) * chunkSize(),
                        (i * 2 + 2) * chunkSize()
                      )
                      .map((seat) => renderSeat(seat))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedSeat && (
        <ConfirmBookingModal
          isOpen={isConfirmModalOpen}
          onClose={() => setSelectedSeat(null)}
          onConfirm={handleConfirm}
          seat={selectedSeat}
          date={date}
          slot={slot}
          isLoading={isBooking}
        />
      )}

      <Dialog open={isRejectBookingOpen} onOpenChange={setIsRejectBookingOpen}>
        <DialogOverlay className="fixed inset-0 bg-black/50 z-40" />
        <DialogContent className="fixed z-50 bg-white p-6 rounded-lg max-w-md w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-center">
              You’ve already booked a seat!
            </DialogTitle>
          </DialogHeader>

          <div className="text-sm text-center mt-2">
            <p className="text-gray-600">
              Please cancel your existing booking before choosing another seat.
            </p>
          </div>

          <DialogFooter className="flex justify-center gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setIsRejectBookingOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {selectedSeat && (
        <CancelBookingModal
          isOpen={isCancelModalOpen}
          onClose={() => setIsCancelModalOpen(false)}
          onConfirm={handleCancelBooking}
          seatNumber={selectedSeat.seatNumber}
          date={date}
          slot={slot}
        />
      )}
    </div>
  );

  function chunkSize() {
    return Math.ceil(seatsChunks[1].length / 6);
  }

  function renderSeat(seat: Seat & { isBooked: boolean; booking: Booking }) {
    const isMine = seat.booking?.user?._id === user.id;
    const isBooked = seat.isBooked;

    return (
      <div
        key={seat._id}
        className={`w-10 h-10 text-sm flex items-center justify-center border rounded cursor-pointer
        ${isBooked ? (isMine ? 'bg-purple-300' : 'bg-red-300') : 'bg-green-300'}`}
        onClick={() => {
          if (isBooked && isMine) {
            setSelectedSeat(seat);
            setIsCancelModalOpen(true);
            return;
          }

          if (isBooked && !isMine) {
            return;
          }

          const hasBookedOtherSeat = seats.some(
            (s) => s._id !== seat._id && s.booking?.user?._id === user.id
          );

          if (hasBookedOtherSeat) {
            setIsRejectBookingOpen(true);
            return;
          }

          setSelectedSeat(seat);
          setIsConfirmModalOpen(true);
        }}
      >
        {seat.seatNumber}
      </div>
    );
  }
}
