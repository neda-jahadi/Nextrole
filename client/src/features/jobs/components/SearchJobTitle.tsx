import SearchInput from '@/components/ui/searchInput';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';

type SearchFieldProps = {
  id: string;
  value: string | '';
  onChange: (value: string) => void;
};

const SearchJobTitle = ({ id, value, onChange }: SearchFieldProps) => {
  const [searchTitle, setSearchTitle] = useState(value);
  const debaouncedSearchTitle = useDebounce(searchTitle, 500);

  useEffect(() => {
    onChange(debaouncedSearchTitle);
  }, [debaouncedSearchTitle, onChange]);

  return (
    <SearchInput
      id={id}
      value={searchTitle}
      handleChange={setSearchTitle}
      placeholder="Search by job title..."
      aria-label="Search job titles"
    />
  );
};

export default SearchJobTitle;
