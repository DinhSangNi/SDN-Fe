'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DatePickerWithRangeProps {
  defaultValue?: { from?: Date; to?: Date };
  onChange: (range: { from: Date | undefined; to: Date | undefined }) => void;
}

export function DatePickerWithRange({
  defaultValue,
  onChange,
}: DatePickerWithRangeProps) {
  const [from, setFrom] = React.useState<Date | undefined>(defaultValue?.from);
  const [to, setTo] = React.useState<Date | undefined>(defaultValue?.to);
  const [open, setOpen] = React.useState(false);

  const handleFromSelect = (date: Date | undefined) => {
    setFrom(date);
    // Reset to if from > to
    if (to && date && date > to) {
      setTo(undefined);
    }
  };

  const handleToSelect = (date: Date | undefined) => {
    setTo(date);
    if (from && date) {
      onChange({ from, to: date });
      setOpen(false);
    } else if (!from && !date) {
      onChange({ from, to: date });
      setOpen(false);
    }
  };

  const displayLabel =
    from && to
      ? `${format(from, 'LLL dd, y')} - ${format(to, 'LLL dd, y')}`
      : from
        ? `${format(from, 'LLL dd, y')} - ...`
        : 'Pick a date range';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !from && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {displayLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="flex gap-4">
          <div>
            <p className="mb-2 text-sm font-medium">From</p>
            <Calendar
              mode="single"
              selected={from}
              onSelect={handleFromSelect}
              disabled={(date) => !!to && date > to}
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">To</p>
            <Calendar
              mode="single"
              selected={to}
              onSelect={handleToSelect}
              disabled={(date) => !!from && date < from}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
