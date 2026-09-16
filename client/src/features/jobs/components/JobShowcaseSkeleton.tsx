import JobCardSkeleton from './JobCardSkeleton';

type JobShowcaseSkeletonProps = {
  count?: number;
};

const JobShowcaseSkeleton = ({ count = 3 }: JobShowcaseSkeletonProps) => (
  <div
    className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    role="status"
    aria-label="Loading jobs"
  >
    {Array.from({ length: count }, (_, index) => (
      <JobCardSkeleton key={index} />
    ))}
    <span className="sr-only">Loading jobs...</span>
  </div>
);

export default JobShowcaseSkeleton;
