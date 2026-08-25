import Section from '@/components/layouts/Section';
import type { AuthCompany } from '../../auth/types/authtypes';
import Container from '@/components/layouts/Container';

type CompanyStatusProps = {
  company: AuthCompany;
};

const CompanyStatusNotice = ({ company }: CompanyStatusProps) => {
  const isPending = company.status === 'PENDING';

  return (
    <Section>
      <Container className="flex flex-col gap-6">
        {isPending ? (
          <>
            <h1 className="section-title">Company registration under review</h1>
            <p className="text-muted-foreground">
              We've received your company registration. An administrator needs
              to approve it before you can publish or manage jobs.
            </p>
          </>
        ) : (
          <>
            <h1 className="section-title">
              Company registration needs attention
            </h1>
            <p className="text-muted-foreground">
              Your company registration wasn't approved. Please contact support
              for more information.
            </p>
          </>
        )}
      </Container>
    </Section>
  );
};

export default CompanyStatusNotice;
