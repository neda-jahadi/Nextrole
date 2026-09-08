// import { useId } from 'react';

import type { SingleJob } from '../types/jobTypes';
import { WORK_MODE_LABELS } from '../constants/job';

type JobListItemProps = {
  job: SingleJob;
  onSelectJob: (jobId: string) => void;
};

const JobListItem = ({ job, onSelectJob }: JobListItemProps) => {
  //   const detailsPath = `/jobs/${job.id}`;
  //   const descId = useId();

  return (
    <button
      className="group flex text-left h-full w-full flex-col gap-2 border-b border-border p-6 hover:shadow-card hover:cursor-pointer transition-box-shadow duration-300"
      onClick={() => onSelectJob(job.id.toString())}
    >
      <h3 className="card-title">{job.title}</h3>

      <p className="text-sm text-muted-foreground">{job.company.name}</p>
      <p className="flex items-center gap-2 text-sm">
        {job.region.name} – {job.municipality.name} (
        {WORK_MODE_LABELS[job.workMode]})
      </p>
    </button>
  );
};

export default JobListItem;
