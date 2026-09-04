import { useParams } from 'react-router-dom';
import Container from '../../components/layouts/Container';
import { FaMapMarker } from 'react-icons/fa';
import ButtonLink from '../../components/ui/ButtonLink';
import { useDeleteJob, useJob } from '../../features/jobs/api/jobData';
import NotFound from '../NotFound';
import Spinner from '../../components/ui/Spinner';
import { useNavigate } from 'react-router-dom';
import {
  JOB_TYPES_LABELS,
  WORK_MODE_LABELS,
} from '@/features/jobs/constants/job';
import { Button } from '@/components/ui/button/button';
import { useAuth } from '../../context/useAuth';
import Section from '@/components/layouts/Section';
import Panel from '@/components/layouts/Panel';

const JobDetailsPage = () => {
  const { isApprovedCompany, user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const { data: job, isLoading, isError } = useJob(id);

  const deleteJobMutation = useDeleteJob();

  const navigate = useNavigate();

  if (!id) return <NotFound />;

  if (isLoading) {
    return (
      <section className="px-4 py-12">
        <Container>
          <Spinner loading={true} />
        </Container>
      </section>
    );
  }

  if (isError || !job) {
    return <NotFound />;
  }

  const handleDeleteSingleJob = () => {
    const ok = window.confirm('Are you sure you want to delete this job?');
    if (!ok) return;
    deleteJobMutation.mutate(id, {
      onSuccess: () => {
        navigate('/jobs');
      },
    });
  };

  const canManageJob = isApprovedCompany && user?.id === job.company.userId;

  return (
    <>
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
            <article className="flex flex-col gap-4">
              <div className="flex gap-2">
                <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-accent-foreground">
                  {JOB_TYPES_LABELS[job.type]}
                </span>
                <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-accent-foreground">
                  {WORK_MODE_LABELS[job.workMode]}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="page-title">{job.title}</h1>
                <p className="inline-flex gap-2 items-center">
                  <FaMapMarker aria-hidden="true" className="size-4" />
                  <span className="sr-only">Location</span>
                  {job.region.name} - {job.municipality.name}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="card-title">Job Description</h3>
                <p className="mb-4">{job.description}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="card-title">Salary</h3>

                <p className="mb-4">{job.salary}</p>
              </div>
            </article>

            <aside
              aria-label="Company and actions"
              className="flex flex-col gap-6"
            >
              <Panel className="flex flex-col gap-6">
                <div>
                  <h2 className="section-title">Company Info</h2>

                  <p>{job.company.name}</p>

                  <p className="my-2">{job.company.description}</p>

                  <hr className="my-4" />

                  <h3 className="card-title">Contact Email:</h3>

                  <a
                    href={`mailto:${job.company.contactEmail}`}
                    className="mt-1 block rounded bg-indigo-100 p-2 font-bold underline-offset-2 hover:underline focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                  >
                    {job.company.contactEmail}
                  </a>

                  <h3 className="card-title">Contact Phone:</h3>

                  <a
                    href={`tel:${job.company.contactPhone}`}
                    className="mt-1 block rounded bg-indigo-100 p-2 font-bold underline-offset-2 hover:underline focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                  >
                    {job.company.contactPhone}
                  </a>
                </div>
                {canManageJob && (
                  <div>
                    <hr />
                    <h2 className="text-xl font-bold mb-6">Manage the Job</h2>
                    <ButtonLink
                      to={`/jobs/edit-job/${job.id}`}
                      className="w-full"
                    >
                      Edit Job
                    </ButtonLink>
                    <Button
                      variant="destructive"
                      className="w-full rounded-full my-2"
                      disabled={deleteJobMutation.isPending}
                      onClick={() => handleDeleteSingleJob()}
                    >
                      {deleteJobMutation.isPending ? 'Deleting ...' : 'Delete'}
                    </Button>
                    <div></div>
                    {deleteJobMutation.isError && (
                      <p>{(deleteJobMutation.error as Error).message}</p>
                    )}
                  </div>
                )}
              </Panel>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default JobDetailsPage;
