import { useSearchParams } from 'react-router-dom';
import { useJobs } from '@/features/jobs/api/jobData';
import {
  useMunicipalities,
  useRegions,
} from '@/features/locations/api/locationQuery';
import { useCallback } from 'react';
import type { MultiJobFilterKey, SingleJobFilterKey } from '../types/jobTypes';

const useJobSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') || 1);
  const title = searchParams.get('title') || '';
  const types = searchParams.getAll('type');
  const modes = searchParams.getAll('mode');
  const location = searchParams.get('location') || '';
  const jobId = searchParams.get('job') || '';

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
  const selectedJobId = jobId || jobs[0]?.id?.toString() || '';
  const selectedJob =
    jobs.find((job) => job.id.toString() === selectedJobId) || null;

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

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(newPage));
    params.delete('job');
    setSearchParams(params);
  };

  const setMultiParamValue = (key: MultiJobFilterKey, values: string[]) => {
    console.log('setMultiParamValue called with:', key, values);
    const params = new URLSearchParams(searchParams);

    params.delete(key);

    values.forEach((value) => params.append(key, value));

    params.set('page', '1');
    setSearchParams(params);
  };

  const setSingleParamValue = useCallback(
    (key: SingleJobFilterKey, value: string) => {
      console.log('setSingleParamValue called with:', key, value);
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

  const setSelectedJobId = (jobId: string) => {
    const params = new URLSearchParams(searchParams);
    if (jobId.trim()) {
      params.set('job', jobId);
    } else {
      params.delete('job');
    }
    setSearchParams(params);
  };

  return {
    filters: {
      title,
      types,
      modes,
      location,
    },
    jobs,
    selectedJob,
    pagination,
    totalJobs,
    locationOptions,
    setPage,
    setMultiParamValue,
    setSingleParamValue,
    setSelectedJobId,
    isLoadingJobs,
    isErrorJobs,
  };
};

export default useJobSearch;
