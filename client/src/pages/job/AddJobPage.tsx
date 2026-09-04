import { useMunicipalities } from '@/features/locations/api/locationQuery';
import JobForm from '@/features/jobs/forms/JobForm';
import Spinner from '@/components/ui/Spinner';
import NotFound from '@/pages/NotFound';
import Section from '@/components/layouts/Section';
import Container from '@/components/layouts/Container';
import Panel from '@/components/layouts/Panel';

const AddJobPage = () => {
  const { data: municipalities, isLoading, isError } = useMunicipalities();

  if (isLoading) return <Spinner loading={true} />;
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
