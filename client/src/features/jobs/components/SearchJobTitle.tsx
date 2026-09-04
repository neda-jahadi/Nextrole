import SearchInput from '@/components/ui/searchInput';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';

type SearchFieldProps = {
  id: string;
  title: string | '';
  handleUpdateSearchParams: (value: string) => void;
};

const SearchJobTitle = ({
  id,
  title,
  handleUpdateSearchParams,
}: SearchFieldProps) => {
  const [searchTitle, setSearchTitle] = useState(title);
  const debaouncedSearchTitle = useDebounce(searchTitle, 500);

  useEffect(() => {
    handleUpdateSearchParams(debaouncedSearchTitle);
  }, [debaouncedSearchTitle, handleUpdateSearchParams]);

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
