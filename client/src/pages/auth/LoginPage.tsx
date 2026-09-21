import LoginForm from '../../features/auth/forms/LoginForm';
import Container from '@/components/layouts/Container';
import Section from '@/components/layouts/Section';
import Panel from '@/components/layouts/Panel';
import TextLink from '@/components/ui/text-link';
import GoogleLoginButton from '@/features/auth/components/GoogleLoginButton';

const LoginPage = () => {
  return (
    <Section>
      <Container size="narrow">
        <Panel className="flex flex-col gap-6">
          <h1 className="section-title text-center">Log in</h1>
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
