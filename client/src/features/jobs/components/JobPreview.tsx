import TextLink from '@/components/ui/text-link';
import type { SingleJob } from '../types/jobTypes';
import { useEffect, useId, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { JOB_TYPES_LABELS, WORK_MODE_LABELS } from '../constants/job';

const DESCRIPTION_PREVIEW_LENGTH = 260;

const JobPreview = ({ job }: { job: SingleJob }) => {
  const detailsPath = `/jobs/${job.id}`;
  const descId = useId();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsExpanded(false);
  }, [job.id]);

  const hasLongDescription =
    job.description.length > DESCRIPTION_PREVIEW_LENGTH;

  return (
    <div className="flex flex-col gap-8">
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
        <div className="flex flex-wrap gap-2">
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
        <h3 className="card-title mb-3">About the job</h3>
        <p
          id={descId}
          className={`whitespace-pre-line leading-7 ${
            !isExpanded && hasLongDescription ? 'line-clamp-5' : ''
          }`}
        >
          {job.description}
        </p>

        {hasLongDescription && (
          <button
            type="button"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-expanded={isExpanded}
            aria-controls={descId}
            onClick={() => setIsExpanded((current) => !current)}
          >
            {isExpanded ? (
              <>
                Show less <ChevronUp className="h-4 w-4" aria-hidden="true" />
              </>
            ) : (
              <>
                Show more <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default JobPreview;
