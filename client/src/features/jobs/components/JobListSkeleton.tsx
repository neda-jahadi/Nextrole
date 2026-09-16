import Skeleton from '@/components/ui/Skeleton';

type JobListSkeletonProps = {
  count?: number;
};

const JobListSkeleton = ({ count = 5 }: JobListSkeletonProps) => (
  <div
    className="overflow-hidden rounded-lg border border-border bg-surface shadow-card"
    role="status"
    aria-label="Loading job results"
  >
    {Array.from({ length: count }, (_, index) => (
      <div
        key={index}
        className="flex flex-col gap-2 border-b border-border p-6 last:border-b-0"
        aria-hidden="true"
      >
        <Skeleton className="h-6 w-3/5" />
        <Skeleton className="h-4 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    ))}
    <span className="sr-only">Loading job results...</span>
  </div>
);

export default JobListSkeleton;
