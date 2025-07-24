import api from '@/lib/axiosInstance';
import { Booking } from '@/types';

export const getBookingsByLabAndDateRange = async (
  labId: string,
  from: string,
  to: string
) => {
  const res = await api.get(`/bookings/lab-range`, {
    params: { labId, from, to },
  });
  return res.data.data;
};

export interface CreateBookingDto {
  labId: string;
  date: string;
  slot: number;
  seatId: string;
}

export interface GetAllBookingsParams {
  keyword?: string;
  labId?: string;
  userId?: string;
  page?: number;
  limit?: number;
  status?: string;
  slot?: number;
  from?: string;
  to?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

export const createLabBooking = async (payload: CreateBookingDto) => {
  const res = await api.post('/bookings', payload);
  return res.data;
};

export const cancelLabBooking = async (labBookingId: string) => {
  const res = await api.patch(`/bookings/${labBookingId}/cancel-booking`);
  return res.data.data;
};

export const createMultipleLabBookings = async (data: {
  bookings: CreateBookingDto[];
}) => {
  const res = await api.post('/bookings/multiple', data);
  return res.data;
};

export const cancelMultipleBookings = async (data: {
  bookingIds: string[];
}) => {
  const res = await api.patch('/bookings/cancel-bookings', data);
  return res.data;
};

export const getAllBookings = async (
  params: GetAllBookingsParams
): Promise<PaginatedResponse<Booking>> => {
  const response = await api.get('/bookings', { params });
  return response.data.data;
};
