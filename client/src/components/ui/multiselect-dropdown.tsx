import { ChevronDown } from 'lucide-react'; // Senior change: Single chevron is standard for dropdowns

import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type Option = {
  label: string;
  value: string;
};

type MultiSelectDropDownProps = {
  id: string;
  placeholder: string;
  options: Option[];
  selected: string[];
  onSelectChange?: (value: string[]) => void;
};

export function MultiSelectDropDown({
  id,
  placeholder,
  options,
  selected,
  onSelectChange,
}: MultiSelectDropDownProps) {
  const handleToggle = (optionValue: string) => {
    if (!onSelectChange) return;

    const nextSelected = selected.includes(optionValue)
      ? selected.filter((val) => val !== optionValue)
      : [...selected, optionValue];

    onSelectChange(nextSelected);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="field"
          size="field"
          aria-haspopup="listbox"
          id={id}
          className={cn(
            'justify-between',
            selected.length === 0 && 'text-muted-foreground',
          )}
        >
          <span>
            {selected.length === 0
              ? `${placeholder}`
              : `${selected.length} selected`}
          </span>
          <ChevronDown className="ml-2 size-4 shrink-0 text-muted-foreground" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className={cn(
          'w-[var(--radix-popover-trigger-width)]',
          'border-border bg-popover text-popover-foreground shadow-popover',
        )}
        align="start"
      >
        <div role="listbox" aria-multiselectable="true">
          {options.map((option) => (
            <label
              key={option.value}
              htmlFor={`filter-${option.value}`}
              className={cn(
                'flex cursor-pointer select-none items-center gap-2 px-2',
                'rounded-md h-9 text-sm',
                'hover:bg-accent hover:text-accent-foreground',
                'focus-within:bg-accent focus-within:text-accent-foreground',
              )}
            >
              <Checkbox
                id={`filter-${option.value}`}
                checked={selected.includes(option.value)}
                onCheckedChange={() => handleToggle(option.value)}
              />
              <span className="flex-1">{option.label}</span>
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
