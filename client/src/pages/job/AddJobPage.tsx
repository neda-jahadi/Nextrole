import { useMunicipalities } from '@/features/locations/api/locationQuery';
import JobForm from '@/features/jobs/forms/JobForm';
import JobFormSkeleton from '@/features/jobs/components/JobFormSkeleton';
import NotFound from '@/pages/NotFound';
import Section from '@/components/layouts/Section';
import Container from '@/components/layouts/Container';
import Panel from '@/components/layouts/Panel';

const AddJobPage = () => {
  const { data: municipalities, isLoading, isError } = useMunicipalities();

  if (isLoading) return <JobFormSkeleton />;
  if (isError || !municipalities) return <NotFound />;

  return (
    <Section>
      <Container size="narrow">
        <Panel>
          <h1 className="section-title text-center">Add Job</h1>
          <JobForm municipalities={municipalities} />
        </Panel>
      </Container>
    </Section>
  );
};

export default AddJobPage;
