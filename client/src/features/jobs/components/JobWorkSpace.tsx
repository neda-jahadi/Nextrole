import PaginationComponent from '@/components/navigation/AppPagination';
import type { PaginationType, SingleJob } from '../types/jobTypes';
import JobListItem from './JobListItems';
import JobPreview from './JobPreview';

type JobWorkSpaceProps = {
  jobs: SingleJob[];
  pagination?: PaginationType;
  selectedJob: SingleJob | null;
  onSelectJob: (jobId: string) => void;
  onPageChange: (pageValue: number) => void;
};

const JobWorkSpace = ({
  jobs,
  pagination,
  selectedJob,
  onSelectJob,
  onPageChange,
}: JobWorkSpaceProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 bg-surface shadow-card">
      <div aria-label="Job search results" className="border-r border-border">
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <JobListItem
                job={job}
                variant={
                  job.id.toString() === selectedJob?.id.toString()
                    ? 'interactive'
                    : 'default'
                }
                onSelectJob={onSelectJob}
              />
              <hr className="border-border" />
            </li>
          ))}
        </ul>
        <PaginationComponent
          pagination={pagination}
          onPageChange={(value) => onPageChange(value)}
        />
      </div>
      <aside aria-label="Selected job preview" className="p-6">
        <div>
          {selectedJob ? (
            <JobPreview job={selectedJob} />
          ) : (
            <span className="text-muted-foreground">
              Select a job to view details
            </span>
          )}
        </div>
      </aside>
    </div>
  );
};

export default JobWorkSpace;
