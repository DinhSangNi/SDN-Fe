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
import { Clock, MapPin, Users } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useLabBooking } from '@/hooks/booking/useLabBooking';
import { useLabById } from '@/hooks/lab/useLabById';
import { Skeleton } from '@/components/ui/skeleton';
import { BackButton } from '@/components/custom/BackButton';
import { useRouter } from 'next/navigation';

export const SLOT_TIME = {
  1: { start: '07:00', end: '09:15' },
  2: { start: '09:30', end: '11:45' },
  3: { start: '12:30', end: '14:45' },
  4: { start: '15:00', end: '17:15' },
};

export default function CalendarView() {
  const [selectedLab, setSelectedLab] = useState<string>();
  const [startDate, setStartDate] = useState(dayjs().startOf('isoWeek'));
  const user = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const from = dayjs(startDate).startOf('day').utc().toISOString();
  const to = dayjs(startDate).add(6, 'day').endOf('day').utc().toISOString();

  const { data: schedule, isLoading: isBookingLoading } = useLabBooking({
    labId: selectedLab!!,
    from,
    to,
  });

  const { data: labInfo, isLoading: isLabInfoLoading } = useLabById(
    selectedLab ?? ''
  );

  const isLoading = isBookingLoading || isLabInfoLoading;

  const weekDates = Array.from({ length: 7 }).map((_, i) =>
    dayjs(startDate).add(i, 'day')
  );

  return (
    <div className="md:w-[80%] w-[90%] mx-auto py-10">
      <div className="mb-2">
        <BackButton />
      </div>

      <div className="text-center">
        <h1 className="text-[1.4rem] font-bold">Lab Booking System</h1>
        <p className="text-[0.9rem]">Schedule your lab sessions efficiently</p>
      </div>

      <div className="mt-6">
        <div className="w-full h-full flex flex-col gap-4 justify-between">
          <div className="w-full">
            <h1 className="font-semibold mb-2 flex gap-1">
              <MapPin />
              <p>Select Lab</p>
            </h1>
            <LabSelector value={selectedLab} onSelect={setSelectedLab} />
          </div>
        </div>

        {isLoading ? (
          <div className="flex gap-8 items-start mt-6">
            <Skeleton className="w-[300px] h-[300px] rounded-lg" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-6 w-1/3" />
              <div className="grid grid-cols-7 gap-3 mt-4">
                {Array.from({ length: 28 }).map((_, i) => (
                  <Skeleton key={i} className="h-[60px] rounded-md" />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-8 items-start mt-6">
            <Calendar
              mode="single"
              selected={startDate.toDate()}
              className="w-[300px] aspect-square !p-0"
              onSelect={(date) => setStartDate(dayjs(date).startOf('isoWeek'))}
            />
            <div className="overflow-x-auto">
              <div className="flex justify-between items-center mb-4">
                <h1 className="font-bold text-[0.9rem] items-end flex gap-2">
                  <Clock className="w-5" />
                  <p>Weekly Schedule</p>
                </h1>
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
                        const slotData = schedule?.[dateKey]?.[slotNum];
                        const status = slotData?.status ?? 'available';
                        const bookedSeats = slotData?.bookedSeats ?? 0;
                        const totalSeats = labInfo?.totalSeats ?? 0;

                        return (
                          <td
                            key={date.toISOString()}
                            onClick={() =>
                              router.push(
                                `/lab/${selectedLab}/booking?date=${dateKey}&slot=${slotNum}`
                              )
                            }
                            className={cn(
                              'border p-1 md:p-2 text-center text-xs cursor-pointer text-[0.7rem] md:text-[1rem]',
                              status === 'full'
                                ? 'bg-red-300 text-red-700'
                                : 'bg-green-300 text-green-700'
                            )}
                          >
                            <div className="text-[0.9rem] text-gray-700 mt-1 flex gap-1 items-end justify-center">
                              <Users className="w-4" />
                              <p>
                                {bookedSeats}/{totalSeats}
                              </p>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
