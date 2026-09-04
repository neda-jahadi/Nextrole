import { SearchIcon, X } from 'lucide-react';
import Input from './Input';
import { cn } from '@/lib/utils';

type SearchInputProps = {
  id: string;
  value: string;
  handleChange: (value: string) => void;
  placeholder?: string;
  'aria-label'?: string;
};

const SearchInput = ({
  id,
  value,
  handleChange,
  placeholder = 'Search...',
  'aria-label': ariaLabel = 'Search',
}: SearchInputProps) => {
  return (
    <div className="field-container flex items-center px-3">
      <SearchIcon
        className="size-4 shrink-0 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        id={id}
        type="text"
        placeholder={placeholder}
        aria-label={ariaLabel}
        value={value}
        variant="ghost"
        onChange={(e) => handleChange(e.target.value)}
      />
      {value && (
        <button
          type="button"
          onClick={() => handleChange('')}
          className={cn(
            'group inline-flex size-7 items-center justify-center rounded-sm',
            'text-muted-foreground transition-colors',
            'hover:text-primary',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          )}
          aria-label="Clear search"
        >
          <X
            className="size-4 transition-colors group-hover:text-primary"
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
