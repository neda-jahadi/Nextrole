import Container from '../../components/layouts/Container';
import Section from '@/components/layouts/Section';
import useJobSearch from '@/features/jobs/hooks/useJobSearch';
import JobFilters from '@/features/jobs/components/JobFilters';
import JobResultSummary from '@/features/jobs/components/JobResultSummary';
import JobWorkSpace from '@/features/jobs/components/JobWorkSpace';
import JobPreview from '@/features/jobs/components/JobPreview';

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

            <JobResultSummary
              isLoading={isLoadingJobs}
              isError={isErrorJobs}
              totalJobs={totalJobs}
            />

            {totalJobs > 0 && (
              <JobWorkSpace
                selectedJob={selectedJob}
                onSelectJob={setSelectedJobId}
                jobs={jobs}
                pagination={pagination}
                onPageChange={setPage}
              />
            )}
          </div>

          <aside
            aria-label="Selected job preview"
            className="sticky top-24 hidden max-h-[calc(100vh-7rem)] overflow-y-auto rounded-lg border border-border bg-surface p-6 shadow-card lg:block"
          >
            {selectedJob ? (
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
