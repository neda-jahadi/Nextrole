import LoginForm from '../../features/auth/forms/LoginForm';
import Container from '@/components/layouts/Container';
import Section from '@/components/layouts/Section';
import Panel from '@/components/layouts/Panel';
import TextLink from '@/components/ui/text-link';
import Alert from '@/components/ui/alert';
import GoogleLoginButton from '@/features/auth/components/GoogleLoginButton';
import { useSearchParams } from 'react-router-dom';

const LoginPage = () => {
  const authErrorMessages: Record<string, string> = {
    google_auth_cancelled: 'Google sign-in was cancelled. Please try again.',
    google_auth_failed:
      'We couldn’t sign you in with Google. Please try again.',
    account_link_required:
      'An account with this email already exists. Sign in with your existing method first.',
  };
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');
  const errorMessage = error ? authErrorMessages[error] : null;

  return (
    <Section>
      <Container size="narrow">
        <Panel className="flex flex-col gap-6">
          <h1 className="section-title text-center">Log in</h1>
          {errorMessage && <Alert variant="error">{errorMessage}</Alert>}

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
