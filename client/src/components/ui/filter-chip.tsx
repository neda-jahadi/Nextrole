import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

type FilterChipProps = {
  label: string;
  onRemove: () => void;
  className?: string;
};
const FilterChip = ({ label, onRemove, className }: FilterChipProps) => {
  return (
    <button
      type="button"
      onClick={onRemove}
      className={cn(
        'group inline-flex h-8 items-center gap-2 rounded-full',
        'bg-primary-light px-3 text-sm font-medium text-primary',
        'transition-colors hover:bg-primary-light/80',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      <span>{label}</span>
      <X
        aria-hidden="true"
        className="size-4 text-muted-foreground transition-opacity group-hover:text-primary"
      />
    </button>
  );
};

export default FilterChip;
