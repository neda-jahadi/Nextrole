import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useDebounce } from '@/hooks/useDebounce';
import type { JobTitleSuggestion } from '../types/jobTypes';
import { useEffect, useState } from 'react';

type SearchFieldProps = {
  id: string;
  value: string;
  suggestions: JobTitleSuggestion[];
  isFetching: boolean;
  onChange: (value: string) => void;
};

const MIN_AUTOCOMPLETE_LENGTH = 2;

const SearchJobTitle = ({
  id,
  value,
  suggestions,
  isFetching,
  onChange,
}: SearchFieldProps) => {
  const [searchTitle, setSearchTitle] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedSearchTitle = useDebounce(searchTitle, 300);

  useEffect(() => {
    onChange(debouncedSearchTitle);
  }, [debouncedSearchTitle, onChange]);

  const normalizedSearchTitle = searchTitle.trim();
  const isCurrentSearch = normalizedSearchTitle === value.trim();
  const shouldShowSuggestions =
    isOpen &&
    normalizedSearchTitle.length >= MIN_AUTOCOMPLETE_LENGTH &&
    isCurrentSearch;

  const handleSelect = (title: string) => {
    setSearchTitle(title);
    onChange(title);
    setIsOpen(false);
  };

  return (
    <div
      className="relative w-full field-container"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setIsOpen(false);
        }
      }}
    >
      <Command shouldFilter={false}>
        <CommandInput
          id={id}
          value={searchTitle}
          placeholder="Search by job title..."
          aria-label="Search job titles"
          onValueChange={(nextValue) => {
            setSearchTitle(nextValue);
            setIsOpen(nextValue.trim().length >= MIN_AUTOCOMPLETE_LENGTH);

            if (nextValue === '') {
              onChange('');
            }
          }}
          onFocus={() =>
            setIsOpen(
              normalizedSearchTitle.length >= MIN_AUTOCOMPLETE_LENGTH,
            )
          }
        />

        <CommandList
          className={`absolute left-0 top-full z-50 mt-1 w-full rounded-md border border-border bg-popover text-popover-foreground shadow-popover ${
            shouldShowSuggestions ? 'block' : 'hidden'
          }`}
        >
          {isFetching ? (
            <div className="px-3 py-3 text-sm text-muted-foreground">
              Searching...
            </div>
          ) : suggestions.length === 0 ? (
            <CommandEmpty className="flex h-11 items-center px-3 text-muted-foreground">
              No matching job titles.
            </CommandEmpty>
          ) : (
            <CommandGroup>
              {suggestions.map((suggestion) => (
                <CommandItem
                  key={suggestion.title}
                  value={suggestion.title}
                  className="flex items-center justify-between gap-3"
                  onSelect={() => handleSelect(suggestion.title)}
                >
                  <span>{suggestion.title}</span>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {suggestion.count}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </div>
  );
};

export default SearchJobTitle;
