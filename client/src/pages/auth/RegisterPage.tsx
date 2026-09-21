import RegisterForm from '../../features/auth/forms/RegisterForm';
import Section from '@/components/layouts/Section';
import Container from '@/components/layouts/Container';
import Panel from '@/components/layouts/Panel';
import TextLink from '@/components/ui/text-link';
import GoogleLoginButton from '@/features/auth/components/GoogleLoginButton';

const RegisterPage = () => {
  return (
    <Section>
      <Container size="narrow">
        <Panel className="flex flex-col gap-6">
          <h1 className="section-title text-center">Create an account</h1>
          <RegisterForm onSuccessRedirect="/profile" />
          <GoogleLoginButton />
          <p className="text-center">
            Already have an account?
            <TextLink to="/login" className="ml-2">
              Login
            </TextLink>
          </p>
        </Panel>
      </Container>
    </Section>
  );
};

export default RegisterPage;
