import Container from '../../components/layouts/Container';
import Section from '@/components/layouts/Section';
import useJobSearch from '@/features/jobs/hooks/useJobSearch';
import JobFilters from '@/features/jobs/components/JobFilters';
import JobResultSummary from '@/features/jobs/components/JobResultSummary';
import JobWorkSpace from '@/features/jobs/components/JobWorkSpace';
import JobPreview from '@/features/jobs/components/JobPreview';
import JobListSkeleton from '@/features/jobs/components/JobListSkeleton';
import Skeleton from '@/components/ui/Skeleton';

const BrowseJobsPage = () => {
  const {
    filters,
    jobs,
    pagination,
    totalJobs,
    titleSuggestions,
    locationOptions,
    selectedJob,
    setMultiParamValue,
    setSingleParamValue,
    setPage,
    setSelectedJobId,
    isLoadingJobs,
    isFetchingJobs,
    isErrorJobs,
  } = useJobSearch();

  return (
    <Section>
      <Container className="flex flex-col gap-8">
        <h1 className="page-title text-center">Browse Jobs</h1>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-start">
          <div className="flex min-w-0 flex-col gap-6">
            <JobFilters
              filters={filters}
              titleSuggestions={titleSuggestions}
              isFetchingSuggestions={isFetchingJobs}
              setSingleParamValue={setSingleParamValue}
              setMultiParamValue={setMultiParamValue}
              locationOptions={locationOptions}
            />

            {!isLoadingJobs && (
              <JobResultSummary
                isLoading={false}
                isError={isErrorJobs}
                totalJobs={totalJobs}
              />
            )}

            {isLoadingJobs ? (
              <JobListSkeleton />
            ) : (
              totalJobs > 0 && (
                <JobWorkSpace
                  selectedJob={selectedJob}
                  onSelectJob={setSelectedJobId}
                  jobs={jobs}
                  pagination={pagination}
                  onPageChange={setPage}
                />
              )
            )}
          </div>

          <aside
            aria-label="Selected job preview"
            className="sticky top-24 hidden max-h-[calc(100vh-7rem)] overflow-y-auto rounded-lg border border-border bg-surface p-6 shadow-card lg:block"
          >
            {isLoadingJobs ? (
              <div className="flex flex-col gap-4" role="status" aria-label="Loading job preview">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-2/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <span className="sr-only">Loading job preview...</span>
              </div>
            ) : selectedJob ? (
              <JobPreview key={selectedJob.id} job={selectedJob} />
            ) : (
              <p className="text-muted-foreground">
                Select a job to view details
              </p>
            )}
          </aside>
        </div>
      </Container>
    </Section>
  );
};

export default BrowseJobsPage;
