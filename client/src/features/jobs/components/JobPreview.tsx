import TextLink from '@/components/ui/text-link';
import type { SingleJob } from '../types/jobTypes';
import { useId } from 'react';
import { JOB_TYPES_LABELS, WORK_MODE_LABELS } from '../constants/job';

const JobPreview = ({ job }: { job: SingleJob }) => {
  const detailsPath = `/jobs/${job.id}`;
  const descId = useId();

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">{job.company.name}</p>
        <h2 className="section-title">
          <TextLink to={detailsPath} aria-describedby={descId}>
            {job.title}
          </TextLink>
        </h2>
        <p className="text-sm text-muted-foreground">
          {job.region.name} - {job.municipality.name}
        </p>
        <div className="flex gap-2">
          <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-accent-foreground">
            {JOB_TYPES_LABELS[job.type]}
          </span>
          <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-accent-foreground">
            {WORK_MODE_LABELS[job.workMode]}
          </span>
        </div>
      </div>
      <hr className="divider" />
      <div>
        <h3 className="card-title">About the job</h3>
        <p className="">{job.description}</p>
      </div>
    </div>
  );
};

export default JobPreview;
