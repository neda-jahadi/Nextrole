import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import type { JobParams } from '../types/jobTypes';
import { toast } from 'react-toastify';
import { deleteJob, editJob, fetchJobs, postJob, fetchJobById } from './jobApi';

// ✅ One place for keys
const jobKeys = {
  all: ['jobs'] as const,
  list: (params: JobParams | undefined) => ['jobs', params ?? null] as const,
  detail: (id: string | undefined) => ['job', id ?? null] as const,
};

export function useJobs(params?: JobParams) {
  const getJobsQuery = useQuery({
    queryKey: jobKeys.list(params),
    queryFn: ({ signal }) => fetchJobs(params, signal),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
  return getJobsQuery;
}

export function useJob(id?: string) {
  const getJobQuery = useQuery({
    queryKey: jobKeys.detail(id),
    queryFn: () => fetchJobById(id as string),
    enabled: !!id,
  });
  return getJobQuery;
}

// Create job
export function useAddJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postJob,
    onSuccess: () => {
      toast.success('Job added successfully!');
      queryClient.invalidateQueries({ queryKey: jobKeys.all });
    },
  });
}

// Delete job

export function useDeleteJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      toast.success('Job deleted successfully!');
      queryClient.invalidateQueries({ queryKey: jobKeys.all });
    },
  });
}

// Edit job
export function useEditJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editJob,
    onSuccess: (_, variables) => {
      toast.success('Job Edited successfully!');
      queryClient.invalidateQueries({ queryKey: jobKeys.all });
      queryClient.invalidateQueries({ queryKey: jobKeys.detail(variables.id) });
    },
  });
}
