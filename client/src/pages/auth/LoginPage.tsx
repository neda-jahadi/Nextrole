import LoginForm from '../../features/auth/forms/LoginForm';
import Container from '@/components/layouts/Container';
import Section from '@/components/layouts/Section';
import FormPanel from '@/components/layouts/FormPanel';
import TextLink from '@/components/ui/text-link';

const LoginPage = () => {
  return (
    <Section>
      <Container size="narrow">
        <FormPanel className="flex flex-col gap-6">
          <h1 className="section-title text-center">Log in</h1>
          <LoginForm onSuccessRedirect="/profile" />
          <p className="text-center">
            <span>No account ?</span>
            <TextLink to="/signup" className="ml-2">
              Sign up
            </TextLink>
          </p>
        </FormPanel>
      </Container>
    </Section>
  );
};

export default LoginPage;
