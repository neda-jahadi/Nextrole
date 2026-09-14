import Panel from '@/components/layouts/Panel';
import { Field, FieldLabel } from '@/components/ui/field';
import SearchJobTitle from './SearchJobTitle';
import { Autocomplete } from '@/components/ui/autocomplete/autocomplete';
import { MultiSelectDropDown } from '@/components/ui/multiselect-dropdown';
import {
  JOB_TYPES,
  JOB_TYPES_LABELS,
  WORK_MODE,
  WORK_MODE_LABELS,
} from '../constants/job';
import type {
  JobTitleSuggestion,
  MultiJobFilterKey,
  SingleJobFilterKey,
} from '../types/jobTypes';

type JobFiltersProps = {
  filters: {
    title: string;
    types: string[];
    modes: string[];
    location: string;
  };
  titleSuggestions: JobTitleSuggestion[];
  setSingleParamValue: (key: SingleJobFilterKey, value: string) => void;
  setMultiParamValue: (key: MultiJobFilterKey, value: string[]) => void;
  locationOptions: { label: string; value: string }[];
};

const JobFilters = ({
  filters,
  titleSuggestions,
  setSingleParamValue,
  setMultiParamValue,
  locationOptions,
}: JobFiltersProps) => {
  return (
    <Panel className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-4">
        <Field>
          <FieldLabel htmlFor="job-title-filter">Job Title</FieldLabel>
          <SearchJobTitle
            id="job-title-filter"
            value={filters.title}
            suggestions={titleSuggestions}
            onChange={(value) => setSingleParamValue('title', value)}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="location-filter">Location</FieldLabel>
          <Autocomplete
            id="location-filter"
            options={locationOptions}
            value={filters.location}
            placeholder="Location..."
            onChange={(value) => setSingleParamValue('location', value)}
          />
        </Field>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Field className="w-full sm:w-84">
          <FieldLabel htmlFor="work-mode-filter">Work Mode</FieldLabel>
          <MultiSelectDropDown
            id="work-mode-filter"
            placeholder="Work mode"
            options={WORK_MODE.map((type) => ({
              label: WORK_MODE_LABELS[type],
              value: type,
            }))}
            selected={filters.modes}
            onSelectChange={(values) =>
              setMultiParamValue('mode', values as string[])
            }
          />
        </Field>
        <Field className="w-full sm:w-84">
          <FieldLabel htmlFor="job-type-filter">Job Type</FieldLabel>
          <MultiSelectDropDown
            id="job-type-filter"
            placeholder="Job Type"
            options={JOB_TYPES.map((type) => ({
              label: JOB_TYPES_LABELS[type],
              value: type,
            }))}
            selected={filters.types}
            onSelectChange={(values) =>
              setMultiParamValue('type', values as string[])
            }
          />
        </Field>
      </div>
    </Panel>
  );
};

export default JobFilters;
