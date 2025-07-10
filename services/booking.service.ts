import api from '@/lib/axiosInstance';

export const getBookingsByLabAndDateRange = async (
  labId: string,
  from: string,
  to: string
) => {
  const res = await api.get(`/booking/lab-range`, {
    params: { labId, from, to },
  });
  return res.data.data;
};

export const createMultipleLabBookings = async (
  payload: {
    lab: string;
    date: string;
    slot: number;
  }[]
) => {
  const res = await api.post(`/booking/multiple`, {
    bookings: payload,
  });
  return res.data.data;
};
