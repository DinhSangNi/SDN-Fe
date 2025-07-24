'use client';

import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useSeatsByLabId } from '@/hooks/seat/useGetSeatsByLabId';
import { useLabById } from '@/hooks/lab/useLabById';
import { Users } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { Seat } from '@/types';

export default function LabDetailPage() {
  const { id } = useParams();
  const labId = id as string;

  const { data: lab, isLoading: isLabLoading } = useLabById(labId);
  const { data: seats = [], isLoading: isSeatsLoading } =
    useSeatsByLabId(labId);

  const seatsChunks = [seats.slice(0, 20), seats.slice(20)];

  if (isLabLoading || isSeatsLoading) {
    return <Skeleton className="w-full h-96" />;
  }

  return (
    <div className="w-[90%] mx-auto py-6">
      <div className="w-full flex justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">{lab?.name}</h1>
          <div>
            <p className="flex gap-1 justify-center items-center text-muted-foreground text-sm">
              <Users className="w-4 h-4" />
              {lab?.totalSeats || 'No description'}
            </p>
            <p className="text-muted-foreground text-sm">
              {lab?.description || 'No description'}
            </p>
            <p className="text-muted-foreground text-sm">
              {lab?.location || 'No description'}
            </p>
          </div>
        </div>
      </div>

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
                    .slice((i * 2 + 1) * chunkSize(), (i * 2 + 2) * chunkSize())
                    .map((seat) => renderSeat(seat))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  function chunkSize() {
    return Math.ceil(seatsChunks[1].length / 6);
  }

  function renderSeat(seat: Seat) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            key={seat._id}
            className={`w-10 h-10 text-sm cursor-pointer flex items-center justify-center border rounded
          ${seat.status === 'AVAILABLE' ? 'bg-green-300' : 'bg-red-300'}`}
          >
            {seat.seatNumber}
          </div>
        </TooltipTrigger>
        <TooltipContent className="m-2">
          <p className="p-2 text-[0.7rem] bg-gray-200">{seat.status}</p>
        </TooltipContent>
      </Tooltip>
    );
  }
}
