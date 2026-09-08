import { useId } from 'react';
import { FaMapMarker } from 'react-icons/fa';

import type { SingleJob } from '../types/jobTypes';
import { JOB_TYPES_LABELS, WORK_MODE_LABELS } from '../constants/job';
import Card from '@/components/ui/Card';
import TextLink from '@/components/ui/text-link';

type JobCardProps = {
  job: SingleJob;
};

const JobCard = ({ job }: JobCardProps) => {
  const detailsPath = `/jobs/${job.id}`;
  const descId = useId();
  const description = job.description?.trim() ?? '';

  return (
    <Card>
      {/* Job metadata */}
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-accent-foreground">
          {JOB_TYPES_LABELS[job.type]}
        </span>

        <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          {WORK_MODE_LABELS[job.workMode]}
        </span>
      </div>

      {/* Job title */}
      <h3 className="card-title">
        <TextLink to={detailsPath} aria-describedby={descId}>
          {job.title}
        </TextLink>
      </h3>

      {/* Description */}
      <p id={descId} className="line-clamp-3 text-sm leading-6 text-foreground">
        {description}
      </p>

      {/* Salary / company */}
      <div>
        <p className="font-medium text-primary">{job.salary}</p>

        <p className="text-sm text-muted-foreground">{job.company.name}</p>
      </div>
      {/* Location */}
      <div className="mt-auto flex flex-col gap-4">
        <hr className="text-primary-light" />
        <div>
          <p className="flex items-center gap-2 text-sm">
            <FaMapMarker
              aria-hidden="true"
              className="size-4 shrink-0 text-primary"
            />

            <span className="sr-only">Location:</span>

            <span>
              {job.region.name} – {job.municipality.name}
            </span>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
