import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

export type Option = {
  value: string;
  label: string;
};

type AutocompleteProps = {
  id: string;
  options: Option[];
  value: string;
  placeholder?: string;
  className?: string;
  onChange: (value: string) => void;
};

export function Autocomplete({
  id,
  options,
  value,
  placeholder = 'Search...',
  className,
  onChange,
}: AutocompleteProps) {
  const selectedOption = options.find((opt) => opt.value === value);

  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(
    selectedOption ? selectedOption.label : '',
  );

  const filteredOptions = React.useMemo(() => {
    const search = inputValue.trim().toLowerCase();
    if (!search) return [];

    return options.filter((option) =>
      option.label.toLowerCase().includes(search),
    );
  }, [options, inputValue]);

  const shouldShowList = isOpen && inputValue.trim().length > 0;

  const handleSelectItem = (option: Option) => {
    setInputValue(option.label);
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div
      className={cn('relative w-full field-container', className)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsOpen(false);
        }
      }}
    >
      <Command shouldFilter={false}>
        <CommandInput
          id={id}
          placeholder={placeholder}
          value={inputValue}
          onValueChange={(val) => {
            setInputValue(val);
            setIsOpen(true);
            if (val === '') onChange(''); // Instantly reset filter state if they clear field
          }}
          onFocus={() => setIsOpen(inputValue.trim().length > 0)}
        />
        <CommandList
          className={cn(
            'absolute top-full left-0 z-50 mt-1 w-full',
            'rounded-md border border-border',
            'bg-popover text-popover-foreground',
            'shadow-popover',
            shouldShowList ? 'block' : 'hidden',
          )}
        >
          {filteredOptions.length === 0 ? (
            <CommandEmpty className="text-muted-foreground px-3 h-11 flex items-center">
              Inga resultat funna.
            </CommandEmpty>
          ) : (
            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value} // Command expects unique identifier here
                  onSelect={() => handleSelectItem(option)}
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </div>
  );
}
