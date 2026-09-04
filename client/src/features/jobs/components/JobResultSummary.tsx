import Spinner from '@/components/ui/Spinner';
import NotFound from '@/pages/NotFound';

const JobResultSummary = ({
  isLoading,
  isError,
  totalJobs,
}: {
  isLoading: boolean;
  isError: boolean;
  totalJobs: number;
}) => {
  return (
    <>
      {isLoading && <Spinner loading={true} />}
      {isError && <NotFound />}
      {totalJobs > 0 ? (
        <div>{totalJobs} Jobs found</div>
      ) : (
        <div>No Jobs found</div>
      )}
    </>
  );
};

export default JobResultSummary;
