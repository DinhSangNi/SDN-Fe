'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(isoWeek);
dayjs.extend(utc);
dayjs.extend(timezone);

import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import LabSelector from '@/components/custom/LabSelector';
import { Button } from '@/components/ui/button';
import { useLabBooking } from '@/hooks/booking/useLabBooking';
import { useCreateMultipleLabBooking } from '@/hooks/booking/useCreateMultipleLabBookings';
import { Clock, MapPin } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import StatusLegend from '@/components/custom/StatusLegend';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { User } from '@/types';
import { BackButton } from '@/components/custom/BackButton';

const SLOT_TIME = {
  1: { start: '07:00', end: '09:15' },
  2: { start: '09:30', end: '11:45' },
  3: { start: '12:30', end: '14:45' },
  4: { start: '15:00', end: '17:15' },
};

export default function CalendarView() {
  const [selectedLab, setSelectedLab] = useState<string>();
  const [startDate, setStartDate] = useState(dayjs().startOf('isoWeek'));
  const [selectedSlots, setSelectedSlots] = useState<Record<string, number[]>>(
    {}
  );
  const user = useSelector((state: RootState) => state.auth);

  const from = dayjs(startDate).startOf('day').utc().toISOString();
  const to = dayjs(startDate).add(6, 'day').endOf('day').utc().toISOString();

  const { data: schedule, isLoading } = useLabBooking({
    labId: selectedLab as string,
    from,
    to,
  });
  const { mutate: createBooking, isPending } = useCreateMultipleLabBooking();

  const weekDates = Array.from({ length: 7 }).map((_, i) =>
    dayjs(startDate).add(i, 'day')
  );

  const toggleSlot = (date: string, slot: number) => {
    setSelectedSlots((prev) => {
      const existing = prev[date] || [];
      const exists = existing.includes(slot);

      if (exists) {
        const updated = existing.filter((s) => s !== slot);
        if (updated.length === 0) {
          const { [date]: _, ...rest } = prev;
          return rest;
        }
        return {
          ...prev,
          [date]: updated,
        };
      } else {
        return {
          ...prev,
          [date]: [...existing, slot],
        };
      }
    });
  };

  const handleBooking = async () => {
    const payload = Object.entries(selectedSlots).flatMap(([date, slots]) =>
      slots.map((slot) => ({ date, slot, lab: selectedLab as string }))
    );

    console.log('Booking payload:', payload);
    createBooking(payload, {
      onSuccess: () => {
        setSelectedSlots({});
      },
    });
  };

  return (
    <div className="md:w-[80%] w-[90%] mx-auto py-10">
      <div className="mb-2">
        <BackButton />
      </div>
      <div>
        <h1 className="text-[1.4rem] font-bold">Lab Booking System</h1>
        <p className="text-[0.9rem]">Schedule your lab sessions efficiently</p>
      </div>
      <div className="md:grid md:grid-cols-2 gap-x-8 mt-8 items-start">
        <div className="w-full h-full flex flex-col gap-4 justify-between">
          <div className="w-full">
            <h1 className="font-bold mb-4 flex gap-2">
              <MapPin />
              <p>Select Lab</p>
            </h1>
            <LabSelector value={selectedLab} onSelect={setSelectedLab} />
          </div>
          <div className="w-full">
            <StatusLegend />
          </div>
        </div>
        <div className="w-full">
          <Calendar
            mode="single"
            selected={startDate.toDate()}
            className="w-full"
            onSelect={(date) => setStartDate(dayjs(date).startOf('isoWeek'))}
          />
        </div>
      </div>

      <div className="overflow-x-auto mt-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold flex gap-2">
            <Clock />
            <p>Weekly Schedule</p>
          </h1>
          <Button
            disabled={!Object.keys(selectedSlots).length || isPending}
            onClick={handleBooking}
          >
            {isPending ? 'Processing...' : 'Booking'}
          </Button>
        </div>
        <table className="table-fixed border border-gray-200 w-full">
          <thead>
            <tr>
              <th className="border p-2">Slot \ Day</th>
              {weekDates.map((date) => (
                <th
                  key={date.toISOString()}
                  className="border p-2 text-sm font-medium"
                >
                  {date.format('ddd DD/MM')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(SLOT_TIME).map(([slotNum, time]) => (
              <tr key={slotNum}>
                <td className="border p-2 text-sm font-medium text-center">
                  Slot {slotNum} <br />
                  <span className="text-xs text-gray-500 hidden lg:block">
                    {time.start} - {time.end}
                  </span>
                </td>
                {weekDates.map((date) => {
                  const dateKey = dayjs(date)
                    .startOf('day')
                    .utc()
                    .toISOString();
                  const status = schedule?.[dateKey]?.[slotNum]?.status;
                  const bookedUser: User = schedule?.[dateKey]?.[slotNum]?.user;
                  const selected = selectedSlots[dateKey]?.includes(
                    Number(slotNum)
                  );

                  return (
                    <Tooltip key={dateKey + slotNum}>
                      <TooltipTrigger asChild>
                        <td
                          onClick={() => {
                            if (status !== 'booked')
                              toggleSlot(dateKey, Number(slotNum));
                          }}
                          className={cn(
                            'border p-1 md:p-2 text-center text-xs cursor-pointer text-[0.7rem] md:text-[1rem]',
                            status === 'booked'
                              ? user.id === bookedUser?._id
                                ? 'bg-purple-300 text-purple-700'
                                : 'bg-red-300 text-red-700'
                              : selected
                                ? 'bg-blue-300 text-blue-700'
                                : 'bg-green-300 text-green-700'
                          )}
                        >
                          {status === 'booked'
                            ? 'Booked'
                            : selected
                              ? 'Choosen'
                              : 'Empty'}
                        </td>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs">
                        {status === 'booked'
                          ? user.id === bookedUser?._id
                            ? 'Booked by you'
                            : `Booked by ${bookedUser?.fullName || bookedUser?.email || 'another user'}`
                          : selected
                            ? 'You selected this slot'
                            : 'Slot available'}
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
