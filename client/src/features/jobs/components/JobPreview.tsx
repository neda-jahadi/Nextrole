import type { SingleJob } from '../types/jobTypes';
import JobCard from './JobCard';

type JobPreviewProps = {
  jobs: SingleJob[] | [];
  limit?: number;
};

const JobPreview = ({ jobs, limit }: JobPreviewProps) => {
  const displayedJobs = limit ? jobs.slice(0, limit) : jobs;
  return (
    <ul className="flex flex-col gap-4">
      {displayedJobs.map((job) => (
        <li key={job.id}>
          <JobCard job={job} />
        </li>
      ))}
    </ul>
  );
};

export default JobPreview;
