import { JOB_SORT, JOB_TYPES, WORK_MODE } from '../constants/job';
import type { Company } from '@/features/company/types/companyTypes';
import type {
  Municipality,
  Region,
} from '@/features/locations/types/locationTypes';

export type JobType = (typeof JOB_TYPES)[number];
export type JobSort = (typeof JOB_SORT)[keyof typeof JOB_SORT];
export type WorkMode = (typeof WORK_MODE)[number];

export type Job = {
  id: number;
  title: string;
  type: JobType;
  description: string;
  salary: string;
  workMode: WorkMode;
  companyId: number;
  regionId: number;
  municipalityId: number;
};

export type PaginationType = {
  totalJobs: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type JobTitleSuggestion = {
  title: string;
  count: number;
};

export type SingleJob = Job & {
  company: Company;
  region: Region;
  municipality: Municipality;
};

export type CreateJobInput = {
  title: string;
  type: JobType;
  description: string;
  salary: string;
  workMode: WorkMode;
  municipalityId: number;
};

export type JobParams = {
  limit?: number;
  page?: number;
  title?: string;
  types?: string[];
  modes?: string[];
  location?: string;
};

export type SingleJobFilterKey = 'title' | 'location';
export type MultiJobFilterKey = 'type' | 'mode';
