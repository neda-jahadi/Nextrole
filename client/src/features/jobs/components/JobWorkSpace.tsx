import PaginationComponent from '@/components/navigation/AppPagination';
import type { PaginationType, SingleJob } from '../types/jobTypes';
import JobListItem from './JobListItems';

type JobWorkSpaceProps = {
  jobs: SingleJob[];
  pagination?: PaginationType;
  selectedJobId?: string;
  onSelectJob: (jobId: string) => void;
  onPageChange: (pageValue: number) => void;
};

const JobWorkSpace = ({
  jobs,
  pagination,
  selectedJobId,
  onSelectJob,
  onPageChange,
}: JobWorkSpaceProps) => {
  const selectedJob =
    jobs.find((job) => job.id.toString() === selectedJobId) ?? jobs[0];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 bg-surface shadow-card">
      <div className="border-r border-border">
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <JobListItem job={job} onSelectJob={onSelectJob} />
            </li>
          ))}
        </ul>
        <PaginationComponent
          pagination={pagination}
          onPageChange={(value) => onPageChange(value)}
        />
      </div>
      <aside>
        <div>
          {selectedJob ? (
            <>
              <h2 className="text-lg font-semibold">{selectedJob.title}</h2>
              <p className="text-sm text-muted-foreground">
                {selectedJob.company.name} - {selectedJob.region.name} -{' '}
                {selectedJob.municipality.name}
              </p>
              <p className="mt-4">{selectedJob.description}</p>
            </>
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
