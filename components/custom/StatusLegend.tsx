'use client';

import { cn } from '@/lib/utils';

const STATUS = [
  {
    key: 'bookedByMe',
    label: 'Booked by you',
    color: 'bg-purple-300 text-purple-700',
  },
  { key: 'booked', label: 'Booked', color: 'bg-red-300 text-red-700' },
  { key: 'chosen', label: 'Selected', color: 'bg-blue-300 text-blue-700' },
  { key: 'empty', label: 'Available', color: 'bg-green-300 text-green-700' },
];

export default function StatusLegend() {
  return (
    <div className="flex flex-col gap-4 justify-start">
      {STATUS.map((status) => (
        <div key={status.key} className="flex items-center gap-2 text-sm">
          <div
            className={cn(
              'w-4 h-4 rounded',
              status.color,
              'border border-gray-300 shrink-0'
            )}
          />
          <span>{status.label}</span>
        </div>
      ))}
    </div>
  );
}
