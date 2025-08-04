'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { format } from 'date-fns';
import { GetAllBookingsParams } from '@/services/booking.service';
import { useAdminBookings } from '@/hooks/booking/useAdminBookings';
import { Badge } from '@/components/ui/badge';
import { DatePickerWithRange } from '@/components/custom/DatePickerRange';
import { Checkbox } from '@/components/ui/checkbox'; // 🧠 import Checkbox
import { useCancelMultipleBookings } from '@/hooks/booking/useCancelMultipleBookings';
import { CancelLabBookingsModal } from '@/components/custom/CancelMultipleLabBookingModal';
import { Booking } from '@/types';
// import { cancelMultipleBookings } from '@/services/booking.service'; // 👈 bạn cần tạo service này

const statuses = ['approved', 'cancelled'];

export default function BookingManagePage() {
  const [filters, setFilters] = useState<GetAllBookingsParams>({
    page: 1,
    limit: 10,
    status: 'approved',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const [selectedBookings, setSelectedBookings] = useState<Booking[]>([]);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);

  const {
    data,
    isLoading: getBookingsLoading,
    isError: getBookingsFail,
  } = useAdminBookings(filters);
  const bookings = data?.data || [];
  const meta = data?.meta;

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
    setSelectedBookings([]);
  };

  const handleStatusChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      status: value === 'all' ? undefined : value,
      page: 1,
    }));
  };

  const handleKeywordChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      keyword: value,
      page: 1,
    }));
  };

  const handleDateRangeChange = (range: {
    from: Date | undefined;
    to: Date | undefined;
  }) => {
    setFilters((prev) => ({
      ...prev,
      from: range.from && range.from.toISOString(),
      to: range.to && range.to.toISOString(),
      page: 1,
    }));
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split('|');
    setFilters((prev) => ({
      ...prev,
      sortBy,
      sortOrder: sortOrder as 'asc' | 'desc',
    }));
  };

  const toggleSelectBooking = (booking: Booking) => {
    setSelectedBookings((prev) =>
      prev.includes(booking) && booking.status !== 'cancelled'
        ? prev.filter((b) => b._id !== booking._id)
        : [...prev, booking]
    );
  };

  const toggleSelectAll = () => {
    if (
      selectedBookings.length ===
      bookings.filter((b) => b.status !== 'cancelled').length
    ) {
      setSelectedBookings([]);
    } else {
      setSelectedBookings(bookings.filter((b) => b.status !== 'cancelled'));
    }
  };

  const handleCancelSelected = () => {
    if (selectedBookings.length === 0) return;
    console.log('Cancelling:', selectedBookings);
    setIsCancelModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold mb-4">Booking Management</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="keyword">Search</Label>
            <Input
              id="keyword"
              placeholder="Search by user/lab..."
              className="bg-white"
              onChange={(e) => handleKeywordChange(e.target.value)}
            />
          </div>

          <div>
            <Label>Status</Label>
            <Select
              onValueChange={handleStatusChange}
              value={filters.status || 'all'}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    <p className="capitalize">{status}</p>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Date range</Label>
            <DatePickerWithRange
              onChange={handleDateRangeChange}
              defaultValue={{
                from: filters.from ? new Date(filters.from) : undefined,
                to: filters.to ? new Date(filters.to) : undefined,
              }}
            />
          </div>

          <div>
            <Label>Sort by</Label>
            <Select
              onValueChange={handleSortChange}
              value={`${filters.sortBy}|${filters.sortOrder}`}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt|desc">Newest</SelectItem>
                <SelectItem value="createdAt|asc">Oldest</SelectItem>
                <SelectItem value="slot|asc">Slot ↑</SelectItem>
                <SelectItem value="slot|desc">Slot ↓</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {selectedBookings.length > 0 && (
        <div className="flex justify-between items-center">
          <p className="text-sm">{selectedBookings.length} selected</p>
          <Button variant="destructive" onClick={handleCancelSelected} className="flex items-center gap-2">
            <X className="w-4 h-4" />
            Cancel Selected
          </Button>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              {filters.status !== 'cancelled' &&
                bookings.find((b) => b.status !== 'cancelled') && (
                  <Checkbox
                    checked={
                      bookings.length > 0 &&
                      selectedBookings.length ===
                      bookings.filter((b) => b.status !== 'cancelled').length
                    }
                    onCheckedChange={() => {
                      toggleSelectAll();
                    }}
                  />
                )}
            </TableHead>
            <TableHead>User</TableHead>
            <TableHead>Lab</TableHead>
            <TableHead>Seat</TableHead>
            <TableHead>Slot</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>
                  {booking.status !== 'cancelled' && (
                    <Checkbox
                      checked={selectedBookings.includes(booking)}
                      onCheckedChange={() => toggleSelectBooking(booking)}
                    />
                  )}
                </TableCell>
                <TableCell>{booking.user?.fullName}</TableCell>
                <TableCell>{booking.lab?.name}</TableCell>
                <TableCell>{booking.seat?.seatNumber}</TableCell>
                <TableCell>{booking.slot}</TableCell>
                <TableCell>
                  {format(new Date(booking.date), 'yyyy-MM-dd')}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`capitalize ${booking.status === 'approved'
                      ? 'bg-green-500 hover:bg-green-500 text-white'
                      : 'bg-orange-300 hover:bg-orange-300 text-white'
                      }`}
                  >
                    {booking.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                {getBookingsLoading
                  ? 'Loading'
                  : getBookingsFail
                    ? 'Fail to load data'
                    : 'No data'}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {bookings && bookings.length > 0 && (
        <div className="flex justify-end items-center gap-2">
          <Button
            className="w-6 aspect-square"
            disabled={filters.page === 1}
            onClick={() => handlePageChange(filters.page! - 1)}
          >
            <ChevronLeft />
          </Button>
          <span className="text-[0.9rem]">
            {filters.page} / {meta?.totalPages}
          </span>
          <Button
            className="w-6 aspect-square"
            disabled={filters.page === meta?.totalPages}
            onClick={() => handlePageChange(filters.page! + 1)}
          >
            <ChevronRight />
          </Button>
        </div>
      )}

      {/* Modal */}
      <CancelLabBookingsModal
        open={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        bookingIds={selectedBookings.map((b) => b._id)}
      />
    </div>
  );
}
