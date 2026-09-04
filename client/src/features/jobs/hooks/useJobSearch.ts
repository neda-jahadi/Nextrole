import { useSearchParams } from 'react-router-dom';
import { useJobs } from '@/features/jobs/api/jobData';
import {
  useMunicipalities,
  useRegions,
} from '@/features/locations/api/locationQuery';
import { useCallback } from 'react';

const useJobSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') || 1);
  const title = searchParams.get('title') || '';
  const types = searchParams.getAll('type');
  const modes = searchParams.getAll('mode');
  const location = searchParams.get('location') || '';

  const {
    data: jobsData,
    isLoading: isLoadingJobs,
    isError: isErrorJobs,
  } = useJobs({
    page,
    types,
    modes,
    title,
    location,
  });
  const { data: regionsData } = useRegions();
  const { data: municipalitiesData } = useMunicipalities();

  const jobs = jobsData?.data || [];
  const pagination = jobsData?.pagination;
  const regions = regionsData ? regionsData : [];
  const municipalities = municipalitiesData ? municipalitiesData : [];

  const totalJobs = pagination?.totalJobs || 0;

  const locationOptions = [
    ...regions.map((region) => ({
      value: `region-${region.id}`,
      label: region.name,
    })),

    ...municipalities.map((municipality) => ({
      value: `municipality-${municipality.id}`,
      label: `${municipality.name} (${municipality.region.name})`,
    })),
  ];

  const handleChangePage = (key: string, newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, String(newPage));
    setSearchParams(params);
  };

  const setMultiParamValue = (key: string, values: string[]) => {
    const params = new URLSearchParams(searchParams);

    params.delete(key);

    values.forEach((value) => params.append(key, value));

    params.set('page', '1');
    setSearchParams(params);
  };

  const setSingleParamValue = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      const currentValue = searchParams.get(key) || '';
      if (currentValue === value) return;
      if (value.trim()) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.set('page', '1');
      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const handleUpdateTitle = useCallback(
    (value: string) => {
      setSingleParamValue('title', value);
    },
    [setSingleParamValue],
  );
  return {
    filters: {
      title,
      types,
      modes,
      location,
    },
    jobs,
    pagination,
    totalJobs,
    locationOptions,
    handleChangePage,
    setMultiParamValue,
    setSingleParamValue,
    handleUpdateTitle,
    isLoadingJobs,
    isErrorJobs,
  };
};

export default useJobSearch;
