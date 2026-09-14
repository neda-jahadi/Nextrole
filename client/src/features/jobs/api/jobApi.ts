import { api } from '../../../lib/api/axios';
import axios from 'axios';

import type {
  CreateJobInput,
  Job,
  JobParams,
  JobTitleSuggestion,
  PaginationType,
  SingleJob,
} from '../types/jobTypes';

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

type UpdateJobInput = {
  id: string;
  jobToEdit: CreateJobInput;
};

type ApiDeleteResponse = {
  success: boolean;
  message: string;
};

type JobsApiResponse<T> = {
  success: boolean;
  data: T;
  pagination: PaginationType;
  titleSuggestions: JobTitleSuggestion[];
  message?: string;
};

export const postJob = async (job: CreateJobInput): Promise<Job> => {
  try {
    const res = await api.post<ApiResponse<Job>>('/api/jobs', job);
    return res.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? 'Failed to add a job');
    }
    throw new Error('Failed to add a job');
  }
};

export const editJob = async ({
  id,
  jobToEdit,
}: UpdateJobInput): Promise<Job> => {
  try {
    const res = await api.put<ApiResponse<Job>>(`/api/jobs/${id}`, jobToEdit);
    return res.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ?? 'Failed to edit the job',
      );
    }

    throw new Error('Failed to edit the job');
  }
};

export const deleteJob = async (id: string): Promise<boolean> => {
  try {
    const res = await api.delete<ApiDeleteResponse>(`/api/jobs/${id}`);
    return res.data.success;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ?? 'Failed to delete the job',
      );
    }

    throw new Error('Failed to delete the job');
  }
};

// Get all jobs
export const fetchJobs = async (params?: JobParams) => {
  try {
    const res = await api.get<JobsApiResponse<SingleJob[]>>('/api/jobs', {
      params: {
        page: params?.page,
        limit: params?.limit,
        title: params?.title,
        type: params?.types,
        mode: params?.modes,
        location: params?.location,
      },
    });
    return {
      data: res.data.data,
      pagination: res.data.pagination,
      titleSuggestions: res.data.titleSuggestions,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? 'Failed to fetch jobs');
    }
    throw new Error('Failed to fetch jobs');
  }
};

// Get single job
export const fetchJobById = async (id: string): Promise<SingleJob> => {
  try {
    const res = await api.get<ApiResponse<SingleJob>>(`/api/jobs/${id}`);
    return res.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ?? 'Failed to fetch the job',
      );
    }
    throw new Error('Failed to fetch the job');
  }
};
