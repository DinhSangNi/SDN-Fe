import { Loader2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

type Props = {
  type?: 'submit' | 'reset' | 'button' | undefined;
  className?: string;
  children?: ReactNode;
  loading?: boolean;
  onClick?: () => void;
};

export function ButtonLoading({
  type,
  className,
  children,
  loading,
  onClick,
}: Props) {
  return (
    <Button
      type={type}
      size="sm"
      className={className}
      disabled={loading}
      onClick={onClick}
    >
      {loading && <Loader2Icon className="animate-spin" />}
      {children}
    </Button>
  );
}
