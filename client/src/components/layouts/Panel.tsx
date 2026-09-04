import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type PanelProps = {
  children: ReactNode;
  className?: string;
};

const Panel = ({ children, className }: PanelProps) => {
  return (
    <div
      className={cn(
        'rounded-md border border-border bg-surface p-6 shadow-card',
        'sm:p-8',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Panel;
