import { useNavigate } from 'react-router';
import { useLogout } from '../../auth/api/authQueries';
import Container from '@/components/layouts/Container';
import ButtonLink from '../../../components/ui/ButtonLink';
import { Button } from '../../../components/ui/button/button';
import Section from '@/components/layouts/Section';

const CompanySetupIntro = ({ name }: { name: string }) => {
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  const handleAnotherAccount = (type?: string) => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        const url = type ? `/business/${type}` : '';
        navigate(url);
      },
    });
  };

  return (
    <Section>
      <Container size="narrow" className="text-center flex flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="section-title">Setup your company</h1>
          <p className="font-medium text-foreground">
            You are signed in as {name}
          </p>
          <p className="text-muted-foreground">
            Your existing NextRole account can also be used to manage your
            company and job posts. You don't need to create another account.
          </p>
        </header>

        <ButtonLink to="/business/register-company" className="justify-center">
          Continue with this account
        </ButtonLink>

        <p className="text-center">
          <span>Using a different account?</span>
          <Button
            variant="link"
            className="justify-center h-auto"
            onClick={() => handleAnotherAccount()}
          >
            Sign out and use another account
          </Button>
        </p>
      </Container>
    </Section>
  );
};

export default CompanySetupIntro;
