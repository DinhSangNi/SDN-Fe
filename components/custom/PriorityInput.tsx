// components/custom/PriorityInput.tsx
'use client';

import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useUpdatePostPriority } from '@/hooks/post/useUpdatePostPriority';

type Props = {
  postId: string;
  initialPriority: number;
};

export default function PriorityInput({ postId, initialPriority }: Props) {
  const [priority, setPriority] = useState<number>(initialPriority);
  const [dirty, setDirty] = useState(false);
  const { mutate, isPending } = useUpdatePostPriority();

  const handleBlur = () => {
    if (dirty) {
      mutate({ id: postId, priority });
      setDirty(false);
    }
  };

  return (
    <Input
      type="number"
      value={priority}
      disabled={isPending}
      onChange={(e) => {
        const raw = e.target.value;
        const val = raw === '' ? '' : parseInt(raw, 10);

        setPriority(val === '' ? 0 : isNaN(val) ? 0 : val);
        setDirty(true);
      }}
      onBlur={handleBlur}
      className="w-20 text-sm"
    />
  );
}
