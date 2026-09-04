import { Navigate } from 'react-router-dom';
import RegisterCompanyForm from '../../features/company/forms/RegisterCompanyForm';
import Container from '../../components/layouts/Container';
import { useAuth } from '../../context/useAuth';
import Spinner from '@/components/ui/Spinner';
import NotFound from '@/pages/NotFound';
import { useMunicipalities } from '@/features/locations/api/locationQuery';
import Section from '@/components/layouts/Section';
import Panel from '@/components/layouts/Panel';

const RegisterCompanyPage = () => {
  const { company, isApprovedCompany } = useAuth();
  const { data: municipalities, isLoading, isError } = useMunicipalities();

  if (isLoading) return <Spinner loading={true} />;
  if (isError || !municipalities) return <NotFound />;

  if (isApprovedCompany) {
    return <Navigate to="/profile" replace />;
  }

  if (company && company.status !== 'APPROVED') {
    return <Navigate to="/business" replace />;
  }

  return (
    <Section>
      <Container size="narrow">
        <Panel className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="section-title text-center">
              Tell us about Your company
            </h1>
            <p className="text-muted-foreground">
              Add your company details to start the approval process
            </p>
          </div>
          <RegisterCompanyForm
            onSuccessRedirect="/business"
            municipalities={municipalities}
          />
        </Panel>
      </Container>
    </Section>
  );
};

export default RegisterCompanyPage;
