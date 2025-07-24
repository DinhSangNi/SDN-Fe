// bookingColumns.ts
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Booking } from '../../../types';
import { format } from 'date-fns';

export const bookingColumns: ColumnDef<Booking>[] = [
  {
    accessorKey: 'user.email',
    header: 'User',
    cell: ({ row }) => <span>{row.original.user?.email ?? 'N/A'}</span>,
  },
  {
    accessorKey: 'lab.name',
    header: 'Lab',
    cell: ({ row }) => <span>{row.original.lab?.name ?? 'N/A'}</span>,
  },
  {
    accessorKey: 'seat.name',
    header: 'Seat',
    cell: ({ row }) => <span>{row.original.seat?.seatNumber ?? 'N/A'}</span>,
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => format(new Date(row.original.date), 'yyyy-MM-dd'),
  },
  {
    accessorKey: 'slot',
    header: 'Slot',
    cell: ({ row }) => <span>Slot {row.original.slot}</span>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const color = status === 'approved' ? 'green' : 'red';
      return <Badge color={color}>{status}</Badge>;
    },
  },
];
