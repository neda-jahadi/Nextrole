import type { SingleJob } from '../types/jobTypes';
import { WORK_MODE_LABELS } from '../constants/job';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

type JobListItemProps = {
  variant?: 'default' | 'interactive';
  className?: string;
  job: SingleJob;
  onSelectJob: (jobId: string) => void;
};

const JobListItemVariants = cva(
  'group flex text-left h-full w-full flex-col gap-2 border-l-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-transparent p-6 hover:shadow-card hover:cursor-pointer transition-box-shadow',
  {
    variants: {
      variant: {
        default: 'bg-surface',
        interactive: 'bg-accent border-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const JobListItem = ({
  variant,
  className,
  job,
  onSelectJob,
}: JobListItemProps) => {
  return (
    <button
      type="button"
      className={cn(JobListItemVariants({ variant }), className)}
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
