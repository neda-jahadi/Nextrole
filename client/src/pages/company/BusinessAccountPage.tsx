import { Navigate } from 'react-router-dom';
import Container from '../../components/layouts/Container';
import Spinner from '../../components/ui/Spinner';
import LoginForm from '../../features/auth/forms/LoginForm';
import { useAuth } from '../../context/useAuth';
import Section from '@/components/layouts/Section';
import TextLink from '@/components/ui/text-link';
import Panel from '@/components/layouts/Panel';
import CompanySetupIntro from '../../features/company/components/CompanySetupIntro';
import CompanyStatusNotice from '../../features/company/components/CompanyStatusNotice';

const BusinessAccountPage = () => {
  const {
    isAuthenticated,
    user,
    company,
    isApprovedCompany,
    isLoading,
    isAdmin,
  } = useAuth();

  if (isLoading) return <Spinner loading={isLoading} />;

  if (isAdmin) {
    return <Navigate to="/profile" replace />;
  }

  if (isApprovedCompany) {
    return <Navigate to="/profile" replace />;
  }

  if (company && !isApprovedCompany) {
    return <CompanyStatusNotice company={company} />;
  }

  if (isAuthenticated && !isAdmin && user) {
    return <CompanySetupIntro name={user?.name} />;
  }

  return (
    <Section>
      <Container size="narrow" className="flex flex-col gap-6">
        <header className="flex flex-col gap-2 text-center">
          <h1 className="section-title">Set up your business account</h1>

          <p className="text-muted-foreground">
            Already have a NextRole account? Sign in with your existing account,
            even if it is currently a personal account. You can continue from
            there and request to set it up for your business.
          </p>

          <p className="text-muted-foreground">
            New to NextRole? <TextLink to="/signup">Create an account</TextLink>{' '}
            first, then continue with your business setup.
          </p>
        </header>
        <Panel className="">
          <LoginForm onSuccessRedirect="/business/register-company" />
        </Panel>
      </Container>
    </Section>
  );
};

export default BusinessAccountPage;
