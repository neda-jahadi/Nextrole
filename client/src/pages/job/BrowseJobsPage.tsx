import Container from '../../components/layouts/Container';
import Section from '@/components/layouts/Section';
import useJobSearch from '@/features/jobs/hooks/useJobSearch';
import JobFilters from '@/features/jobs/components/JobFilters';
import JobResultSummary from '@/features/jobs/components/JobResultSummary';
import JobWorkSpace from '@/features/jobs/components/JobWorkSpace';

const BrowseJobsPage = () => {
  const {
    filters,
    jobs,
    pagination,
    totalJobs,
    locationOptions,
    setMultiParamValue,
    setSingleParamValue,
    handleUpdateTitle,
    handleChangePage,
    isLoadingJobs,
    isErrorJobs,
  } = useJobSearch();

  return (
    <>
      <Section>
        <Container className="flex flex-col gap-10">
          <h1 className="page-title text-center">Browse Jobs</h1>
          <JobFilters
            filters={filters}
            setSingleParamValue={setSingleParamValue}
            setMultiParamValue={setMultiParamValue}
            handleUpdateTitle={handleUpdateTitle}
            locationOptions={locationOptions}
          />
          <JobResultSummary
            isLoading={isLoadingJobs}
            isError={isErrorJobs}
            totalJobs={totalJobs}
          />
          {totalJobs > 0 && (
            <JobWorkSpace
              jobs={jobs}
              pagination={pagination}
              handleChangePage={handleChangePage}
            />
          )}
        </Container>
      </Section>
    </>
  );
};

export default BrowseJobsPage;
