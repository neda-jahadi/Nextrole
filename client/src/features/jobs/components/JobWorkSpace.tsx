import PaginationComponent from '@/components/navigation/AppPagination';
import JobCard from './JobCard';
import type { PaginationType, SingleJob } from '../types/jobTypes';

type JobWorkSpaceProps = {
  jobs: SingleJob[];
  pagination?: PaginationType;
  handleChangePage: (param: string, value: number) => void;
};

const JobWorkSpace = ({
  jobs,
  pagination,
  handleChangePage,
}: JobWorkSpaceProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 bg-surface shadow-card">
      <div className="">
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <JobCard job={job} />
            </li>
          ))}
        </ul>
        <PaginationComponent
          pagination={pagination}
          onPageChange={(value) => handleChangePage('page', value)}
        />
      </div>
      <aside>
        <p>
          The first job in the list comes here or the job in the list user
          clicks on
        </p>
      </aside>
    </div>
  );
};

export default JobWorkSpace;
