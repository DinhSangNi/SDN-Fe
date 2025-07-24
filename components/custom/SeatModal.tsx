'use client';

import { useCreateLabBooking } from '@/hooks/booking/useCreateBooking';
import { useSeatsBySlot } from '@/hooks/seat/useSeatsBySlot';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Booking, Seat } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SeatBookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const labId = searchParams.get('labId') || '';
  const date = searchParams.get('date') || '';
  const slot = Number(searchParams.get('slot'));
  const currentUserId = searchParams.get('userId') || '';

  const [selectedSeat, setSelectedSeat] = useState<
    (Seat & { isBooked: boolean; booking: Booking }) | null
  >();

  const {
    data: seats = [],
    isLoading,
    refetch,
  } = useSeatsBySlot({
    labId,
    date,
    slot,
    enabled: !!labId && !!date && !!slot,
  });

  const seatsChunks = [seats.slice(0, 20), seats.slice(20, seats.length)];

  const { mutateAsync: bookSeat, isPending: isBooking } = useCreateLabBooking({
    data: { labId, slot, date },
  });

  const handleConfirm = async () => {
    if (!selectedSeat) return;
    await bookSeat();
    await refetch();
    setSelectedSeat(null);
  };

  return (
    <div className="max-w-[1000px] mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Seat Booking for {new Date(date).toLocaleDateString()} - Slot {slot}
      </h1>
      {isLoading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <div className="h-[80vh] border bg-white mt-4 px-6">
          <div className="flex justify-center mb-16">
            <div className="w-1/2 px-2 py-1 border text-center text-sm bg-gray-200">
              Màn hình chiếu
            </div>
          </div>
          <div className="flex justify-between">
            {/* Dãy bên trái */}
            <div className="w-1/3 flex">
              <div className="space-y-1">
                {seatsChunks?.[0]
                  .slice(0, Math.ceil(seatsChunks?.[0].length / 2))
                  .map((seat) => renderSeat(seat))}
              </div>
              <div className="p-2 border flex items-center justify-center text-sm bg-gray-200 mx-4">
                <p className="rotate-90">Bàn học</p>
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
            <div className="space-y-1">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <div className="flex gap-1">
                    {seatsChunks?.[1]
                      .slice(i * 2 * chunkSize(), (i * 2 + 1) * chunkSize())
                      .map((seat) => renderSeat(seat))}
                  </div>
                  <div className="p-2 border flex items-center justify-center text-sm bg-gray-200 my-4">
                    <p>Bàn học</p>
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

      {/* Confirm Booking Section */}
      {selectedSeat && (
        <div className="mt-6 text-center">
          <p className="text-sm mb-2">
            Book seat <b>{selectedSeat?.seatNumber}</b> at slot <b>{slot}</b> on{' '}
            <b>{new Date(date).toLocaleDateString()}</b>?
          </p>
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setSelectedSeat(null)}
              disabled={isBooking}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirm} disabled={isBooking}>
              {isBooking ? 'Booking...' : 'Confirm'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  function chunkSize() {
    return Math.ceil(seatsChunks[1].length / 6);
  }

  function renderSeat(seat: Seat & { isBooked: boolean; booking: Booking }) {
    const isMine = seat.booking?.user._id === currentUserId;
    const isBooked = !!seat.booking;
    return (
      <div
        key={seat._id}
        className={`w-10 h-10 text-sm flex items-center justify-center border rounded cursor-pointer
        ${isBooked ? (isMine ? 'bg-purple-300' : 'bg-red-300') : 'bg-green-300'}`}
        onClick={() => {
          if (!isBooked) {
            setSelectedSeat(seat);
          }
        }}
      >
        {seat.seatNumber}
      </div>
    );
  }
}
