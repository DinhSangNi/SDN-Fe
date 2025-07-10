'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLab } from '@/hooks/lab/useLab';
import { Lab } from '@/types';
import { useEffect, useState } from 'react';

type Props = {
  value?: string;
  onSelect?: (value: string) => void;
};

const LabSelector = ({ value, onSelect }: Props) => {
  const [selected, setSelected] = useState<string | undefined>(value);
  const { data: labs, isLoading } = useLab();

  useEffect(() => {
    setSelected(value);

    if (!value && labs && labs.length > 0) {
      const defaultLabId = labs[0]._id;
      setSelected(defaultLabId);
      onSelect?.(defaultLabId);
    }
  }, [labs, value]);

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Đang tải...</p>;
  }

  return (
    <div className="w-full">
      <Select value={selected} onValueChange={onSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Chọn phòng lab" />
        </SelectTrigger>
        <SelectContent className="w-full">
          {labs?.map((lab: Lab) => (
            <SelectItem key={lab._id} value={lab._id}>
              {lab.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LabSelector;
