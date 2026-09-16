import ButtonLink from '../components/ui/ButtonLink';
import Container from '../components/layouts/Container';
import Section from '@/components/layouts/Section';
import { useJobs } from '@/features/jobs/api/jobData';
import Spinner from '@/components/ui/Spinner';
import NotFound from './NotFound';
import JobShowcase from '@/features/jobs/components/JobShowcase';
import Card from '@/components/ui/Card';

const HomePage = () => {
  const { data, isLoading, isError } = useJobs({ limit: 3 });
  const jobs = data ? data.data : [];

  return (
    <>
      <Section>
        <Container className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="page-title">Find work that fits you</h1>
            <p className="card-title">
              Discover opportunities that match your skills, location and way of
              working
            </p>
            <div className="flex flex-col items-start gap-3 sm:flex-row">
              <ButtonLink to="/jobs" aria-label="Explore jobs" size="lg">
                Explore jobs
              </ButtonLink>
              <ButtonLink
                to="/business/register-company"
                aria-label="Register your company"
                variant="outline"
                size="lg"
              >
                For employers
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
      <Section variant="muted">
        <Container className="flex flex-col gap-10">
          <div className="text-center flex flex-col gap-2 ">
            <h2 className="section-title">Latest Opportunities</h2>
            <p>Fresh opportunities from companies looking for talent</p>
          </div>
          <div>
            {isLoading && <Spinner loading={true} />}
            {isError && <NotFound />}
            {!isError && !isLoading && <JobShowcase jobs={jobs} />}
          </div>
          <ButtonLink
            to="/jobs"
            aria-label="View all jobs"
            className="self-center"
          >
            View all jobs
          </ButtonLink>
        </Container>
      </Section>
      <Section>
        <Container className="flex flex-col gap-10">
          <div className="text-center flex flex-col gap-2 ">
            <h2 className="section-title">Hiring talent?</h2>
            <p>
              Create a company account to post jobs and connect with candidates
            </p>
          </div>
          <ButtonLink
            to="/business/register-company"
            aria-label="Register your company"
            className="self-center"
          >
            Register your company
          </ButtonLink>
        </Container>
      </Section>
      <Section>
        <Container className="flex flex-col gap-10">
          <div className="text-center flex flex-col gap-2 ">
            <h2 className="section-title">How it works</h2>
            <p>
              Find out how our platform can help you find work or hire talent
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="flex flex-col gap-4 text-center">
              <h3 className="card-title">For Job Seekers</h3>
              <p>
                Browse job listings and apply for positions that match your
                skills and interests.
              </p>
            </Card>
            <Card className="flex flex-col gap-4 text-center">
              <h3 className="card-title">For Employers</h3>
              <p>
                Create a company account, post job openings, and connect with
                candidates for your team.
              </p>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default HomePage;
