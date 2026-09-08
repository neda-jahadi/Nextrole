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
            <h2 className="section-title">Looking to hire?</h2>
            <p>Post your job and find the right talent for your company</p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="flex flex-col gap-4 text-center">
              <h3 className="card-title">For Job Seekers</h3>
              <p>
                Create a profile, browse job listings, and apply for positions
                that match your skills and interests.
              </p>
            </Card>
            <Card className="flex flex-col gap-4 text-center">
              <h3 className="card-title">For Employers</h3>
              <p>
                Post job openings, review applications, and connect with
                qualified candidates to fill your positions.
              </p>
            </Card>
            <Card className="flex flex-col gap-4 text-center">
              <h3 className="card-title">For Everyone</h3>
              <p>
                Our platform is designed to make the job search and hiring
                process easier and more efficient for everyone involved.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section variant="muted">
        <Container className="flex flex-col gap-10">
          <div className="text-center flex flex-col gap-2 ">
            <h2 className="section-title">Get Started</h2>
            <p>Sign up today and start finding work or hiring talent</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <ButtonLink
              to="/signup"
              aria-label="Sign up as a job seeker"
              className="self-center"
            >
              Sign up as a job seeker
            </ButtonLink>
            <ButtonLink
              to="/business/register-company"
              aria-label="Register your company"
              className="self-center"
            >
              Register your company
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default HomePage;
