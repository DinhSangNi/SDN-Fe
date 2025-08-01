'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, Users, Clock, MapPin, BarChart3 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useLabs } from '@/hooks/lab/useLabs';
import { useSeatsBySlot } from '@/hooks/seat/useSeatsBySlot';
import { Booking, Seat } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const SLOT_TIME = {
  1: { start: '07:00', end: '09:15' },
  2: { start: '09:30', end: '11:45' },
  3: { start: '12:30', end: '14:45' },
  4: { start: '15:00', end: '17:15' },
};

function SeatSkeleton() {
  return <Skeleton className="w-10 h-10 rounded border" />;
}

export default function BookingDashboardPage() {
  const [selectedLab, setSelectedLab] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string>('1');

  const { data: labs = [], isLoading: isLabsLoading } = useLabs({
    page: 1,
    limit: 100,
  });

  // Auto-select SE lab when labs are loaded
  useEffect(() => {
    if (labs.data && labs.data.length > 0 && !selectedLab) {
      // Try to find lab with name "SE" first
      const seLab = labs.data.find((lab) =>
        lab.name.toLowerCase().includes('se') ||
        lab.name.toLowerCase() === 'se'
      );

      if (seLab) {
        setSelectedLab(seLab._id);
      } else {
        // Fallback to first lab if SE lab not found
        setSelectedLab(labs.data[0]._id);
      }
    }
  }, [labs.data, selectedLab]);

  const {
    data: seats = [],
    isLoading: isSeatsLoading,
    refetch,
  } = useSeatsBySlot({
    labId: selectedLab,
    date: format(selectedDate, 'yyyy-MM-dd'),
    slot: selectedSlot,
    enabled: !!selectedLab && !!selectedDate && !!selectedSlot,
  });

  const selectedLabData = labs.data?.find((lab) => lab._id === selectedLab);
  const seatsChunks = [seats.slice(0, 20), seats.slice(20, seats.length)];

  function chunkSize() {
    return Math.ceil(seatsChunks[1].length / 6);
  }

  const bookedSeats = seats.filter((seat) => seat.isBooked);
  const availableSeats = seats.filter((seat) => !seat.isBooked);
  const occupancyRate = seats.length > 0 ? (bookedSeats.length / seats.length) * 100 : 0;

  const handleRefresh = () => {
    if (selectedLab && selectedDate && selectedSlot) {
      refetch();
    }
  };

  function renderSeat(seat: Seat & { isBooked: boolean; booking: Booking }) {
    const isBooked = seat.isBooked;

    return (
      <div
        key={seat._id}
        className={`w-10 h-10 text-sm flex items-center justify-center border rounded relative group cursor-pointer
        ${isBooked ? 'bg-red-300 text-white' : 'bg-green-300'}`}
        title={
          isBooked
            ? `Booked by: ${seat.booking?.user?.fullName || 'Unknown'}`
            : 'Available'
        }
      >
        {seat.seatNumber}
        {isBooked && (
          <div className="absolute bottom-0 left-0 w-full bg-red-600 text-white text-xs px-1 py-0.5 rounded-b opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            {seat.booking?.user?.fullName || 'Unknown'}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Booking Dashboard</h1>
        </div>
        <Button onClick={handleRefresh} disabled={!selectedLab}>
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Lab Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Lab</label>
              <Select value={selectedLab} onValueChange={setSelectedLab}>
                <SelectTrigger>
                  <SelectValue placeholder="Loading labs..." />
                </SelectTrigger>
                <SelectContent>
                  {isLabsLoading ? (
                    <SelectItem value="loading" disabled>
                      Loading labs...
                    </SelectItem>
                  ) : (
                    labs.data?.map((lab) => (
                      <SelectItem key={lab._id} value={lab._id}>
                        {lab.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !selectedDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Slot Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Slot</label>
              <Select value={selectedSlot} onValueChange={setSelectedSlot}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a slot" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(SLOT_TIME).map(([slotNum, time]) => (
                    <SelectItem key={slotNum} value={slotNum}>
                      Slot {slotNum} ({time.start} - {time.end})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      {selectedLab && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Lab</p>
                  <p className="text-lg font-bold">{selectedLabData?.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Time Slot</p>
                  <p className="text-lg font-bold">
                    {SLOT_TIME[selectedSlot as unknown as keyof typeof SLOT_TIME]?.start} -{' '}
                    {SLOT_TIME[selectedSlot as unknown as keyof typeof SLOT_TIME]?.end}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Available</p>
                  <p className="text-lg font-bold text-green-600">
                    {availableSeats.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Booked</p>
                  <p className="text-lg font-bold text-red-600">
                    {bookedSeats.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Occupancy</p>
                  <p className="text-lg font-bold text-purple-600">
                    {occupancyRate.toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Lab Layout */}
      {selectedLab && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Lab Layout</span>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-300 rounded border"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-300 rounded border"></div>
                  <span>Booked</span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isSeatsLoading ? (
              <div className="min-h-[80vh] border bg-white mt-4 px-14 py-6">
                <div className="flex justify-center mb-16">
                  <div className="w-1/2 px-2 py-1 border-2 text-center text-sm bg-gray-200">
                    Screen
                  </div>
                </div>
                <div className="flex justify-between">
                  {/* Loading skeleton */}
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
                  <div className="space-y-6 h-fit w-fit">
                    {[...Array(3)].map((_, i) => (
                      <div key={`skeleton-group-${i}`}>
                        <div className="flex gap-1">
                          {[...Array(4)].map((_, idx) => (
                            <SeatSkeleton key={`right-top-${i}-${idx}`} />
                          ))}
                        </div>
                        <div className="p-2 border flex items-center justify-center text-sm bg-gray-200 my-2">
                          <p>Desk</p>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(4)].map((_, idx) => (
                            <SeatSkeleton key={`right-bottom-${i}-${idx}`} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : seats.length > 0 ? (
              <div className="min-h-[80vh] border bg-white mt-4 px-14 py-6">
                <div className="flex justify-center mb-16">
                  <div className="w-1/2 px-2 py-1 border-2 text-center text-sm bg-gray-200">
                    Screen
                  </div>
                </div>
                <div className="flex justify-between">
                  {/* Left side */}
                  <div className="w-1/3 flex h-fit">
                    <div className="space-y-1">
                      {seatsChunks?.[0]
                        ?.slice(0, Math.ceil(seatsChunks?.[0].length / 2))
                        .map((seat) => renderSeat(seat))}
                    </div>
                    <div className="p-2 border flex items-center justify-center text-sm bg-gray-200 mx-4">
                      <p className="rotate-90">Desk</p>
                    </div>
                    <div className="space-y-1">
                      {seatsChunks?.[0]
                        ?.slice(
                          Math.ceil(seatsChunks?.[0].length / 2),
                          Math.ceil(seatsChunks?.[0].length / 2) * 2
                        )
                        .map((seat) => renderSeat(seat))}
                    </div>
                  </div>

                  {/* Right side */}
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
            ) : (
              <div className="text-center py-8 text-gray-500">
                No seats found for the selected criteria
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Booking Details Table */}
      {selectedLab && bookedSeats.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Seat Number</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Booking Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookedSeats.map((seat) => (
                  <TableRow key={seat._id}>
                    <TableCell className="font-medium">
                      {seat.seatNumber}
                    </TableCell>
                    <TableCell>{seat.booking?.user?.fullName || 'N/A'}</TableCell>
                    <TableCell>{seat.booking?.user?.email || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge
                        className={`capitalize ${seat.booking?.status === 'approved'
                          ? 'bg-green-500 hover:bg-green-500 text-white'
                          : 'bg-orange-300 hover:bg-orange-300 text-white'
                          }`}
                      >
                        {seat.booking?.status || 'N/A'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {seat.booking?.createdAt
                        ? format(new Date(seat.booking.createdAt), 'HH:mm:ss')
                        : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
