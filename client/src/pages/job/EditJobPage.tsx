import { useJob } from '../../features/jobs/api/jobData';
import { useParams } from 'react-router-dom';
import NotFound from '../NotFound';

import { useMunicipalities } from '@/features/locations/api/locationQuery';
import EditJobForm from '@/features/jobs/forms/EditJobForm';
import JobFormSkeleton from '@/features/jobs/components/JobFormSkeleton';
import Section from '@/components/layouts/Section';
import Container from '@/components/layouts/Container';
import Panel from '@/components/layouts/Panel';

const EditJobPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: job, isLoading, isError } = useJob(id);
  const {
    data: municipalities = [],
    isLoading: isLoadingMunicipalities,
    isError: isErrorMunicipalities,
  } = useMunicipalities();

  if (!id) return <NotFound />;
  if (isLoading || isLoadingMunicipalities) return <JobFormSkeleton />;
  if (isError || isErrorMunicipalities || !job) return <NotFound />;

  return (
    <Section>
      <Container size="narrow">
        <Panel>
          <h1 className="section-title text-center">Edit the Job</h1>
          <EditJobForm
            key={id}
            job={job}
            municipalities={municipalities}
            id={id}
          />
        </Panel>
      </Container>
    </Section>
  );
};

export default EditJobPage;
