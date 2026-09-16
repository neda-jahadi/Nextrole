import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';

const JobCardSkeleton = () => (
  <Card className="gap-4" aria-hidden="true">
    <div className="flex gap-2">
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
    <Skeleton className="h-6 w-3/4" />
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-2/3" />
    </div>
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-4 w-1/2" />
    </div>
    <div className="mt-auto flex flex-col gap-4">
      <hr className="border-border" />
      <Skeleton className="h-4 w-2/5" />
    </div>
  </Card>
);

export default JobCardSkeleton;
