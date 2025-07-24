import api from '@/lib/axiosInstance';

export const getSeatsBySlot = async ({
  labId,
  date,
  slot,
}: {
  labId: string;
  date: string;
  slot: number;
}) => {
  const res = await api.get(`/labs/${labId}/seats`, {
    params: { date, slot },
  });
  return res.data.data;
};

export const getSeatsByLabId = async (labId: string) => {
  const res = await api.get(`/seats/${labId}`);
  return res.data.data;
};
