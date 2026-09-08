import type { SingleJob } from '../types/jobTypes';
import JobCard from './JobCard';

type JobPreviewProps = {
  jobs: SingleJob[] | [];
  limit?: number;
};

const JobPreview = ({ jobs, limit }: JobPreviewProps) => {
  if (!jobs?.length) {
    return (
      <div className="text-center">
        <p className="mt-4 text-gray-700">No Jobs found right now.</p>
      </div>
    );
  }

  const displayedJobs = limit ? jobs.slice(0, limit) : jobs;
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayedJobs.map((job) => (
        <li key={job.id}>
          <JobCard job={job} />
        </li>
      ))}
    </ul>
  );
};

export default JobPreview;
