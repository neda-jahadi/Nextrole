import RegisterForm from '../../features/auth/forms/RegisterForm';
import Section from '@/components/layouts/Section';
import Container from '@/components/layouts/Container';
import FormPanel from '@/components/layouts/FormPanel';
import TextLink from '@/components/ui/text-link';

const RegisterPage = () => {
  return (
    <Section>
      <Container size="narrow">
        <FormPanel className="flex flex-col gap-6">
          <h1 className="section-title text-center">Create an account</h1>
          <RegisterForm onSuccessRedirect="/profile" />
          <p className="text-center">
            Already have an account?
            <TextLink to="/login" className="ml-2">
              Login
            </TextLink>
          </p>
        </FormPanel>
      </Container>
    </Section>
  );
};

export default RegisterPage;
