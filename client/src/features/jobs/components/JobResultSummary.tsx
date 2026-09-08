import Spinner from '@/components/ui/Spinner';
import NotFound from '@/pages/NotFound';

type JobResultSummaryProps = {
  isLoading: boolean;
  isError: boolean;
  totalJobs: number;
};

const JobResultSummary = ({
  isLoading,
  isError,
  totalJobs,
}: JobResultSummaryProps) => {
  if (isLoading) {
    return <Spinner loading={true} />;
  }

  if (isError) {
    return <NotFound />;
  }

  return (
    <>
      {totalJobs > 0 ? (
        <div>{totalJobs} Jobs found</div>
      ) : (
        <div>No Jobs found</div>
      )}
    </>
  );
};

export default JobResultSummary;
