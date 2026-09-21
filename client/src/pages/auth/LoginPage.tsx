import LoginForm from '../../features/auth/forms/LoginForm';
import Container from '@/components/layouts/Container';
import Section from '@/components/layouts/Section';
import Panel from '@/components/layouts/Panel';
import TextLink from '@/components/ui/text-link';
import Alert from '@/components/ui/alert';
import GoogleLoginButton from '@/features/auth/components/GoogleLoginButton';
import { useSearchParams } from 'react-router-dom';

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');

  return (
    <Section>
      <Container size="narrow">
        <Panel className="flex flex-col gap-6">
          <h1 className="section-title text-center">Log in</h1>
          {error === 'google_auth_cancelled' && (
            <Alert variant="error">
              Google sign-in was cancelled. Please try again.
            </Alert>
          )}

          <LoginForm onSuccessRedirect="/profile" />
          <GoogleLoginButton />
          <p className="text-center">
            <span>No account ?</span>
            <TextLink to="/signup" className="ml-2">
              Sign up
            </TextLink>
          </p>
        </Panel>
      </Container>
    </Section>
  );
};

export default LoginPage;
