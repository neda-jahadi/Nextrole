import { useNavigate } from 'react-router-dom';

import Container from '@/components/layouts/Container';
import Section from '@/components/layouts/Section';
import Card from '@/components/ui/Card';
import ButtonLink from '@/components/ui/ButtonLink';
import { Button } from '@/components/ui/button/button';
import ProfileSkeleton from '@/components/loading/ProfileSkeleton';

import { useLogout } from '@/features/auth/api/authQueries';
import { useAuth } from '@/context/useAuth';

const ProfilePage = () => {
  const { user, isLoading, isAdmin, company } = useAuth();

  const navigate = useNavigate();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate('/login');
      },
    });
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (!user) {
    return null;
  }

  const accountLabel = isAdmin
    ? 'Administrator'
    : company
      ? 'Company account'
      : 'Job seeker';

  return (
    <>
      <Section>
        <Container size="narrow">
          <div className="flex flex-col gap-3 text-center">
            <p className="text-sm font-medium text-primary">My profile</p>
            <h1 className="page-title">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
            <div>
              <span className="inline-flex rounded-full bg-primary-light px-3 py-1 text-sm font-medium text-primary">
                {accountLabel}
              </span>
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="muted">
        <Container size="narrow">
          {isAdmin && (
            <Card>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="section-title">Administration</h2>
                  <p className="text-muted-foreground">
                    Review company registrations and manage platform
                    administration.
                  </p>
                </div>
                <div>
                  <ButtonLink to="/admin-dashboard">
                    Open Admin Dashboard
                  </ButtonLink>
                </div>
              </div>
            </Card>
          )}

          {!isAdmin && company && (
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="section-title">Company information</h2>
                  <p className="text-muted-foreground">
                    Your registered company details.
                  </p>
                </div>

                <Card>
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex flex-col gap-1">
                        <h3 className="card-title">{company.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Company profile
                        </p>
                      </div>
                      <span className="rounded-full bg-primary-light px-3 py-1 text-sm font-medium text-primary">
                        {company.status}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h3 className="text-sm font-semibold">About</h3>
                      <p className="text-muted-foreground">
                        {company.description}
                      </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-sm font-semibold">Contact</h3>
                        <div className="text-sm text-muted-foreground">
                          <p>{company.contactEmail}</p>
                          <p>{company.contactPhone}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-sm font-semibold">Location</h3>
                        <p className="text-sm text-muted-foreground">
                          {company.municipality}, {company.region}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <h2 className="section-title">Your jobs</h2>
                    <p className="text-muted-foreground">
                      Manage the jobs published by your company.
                    </p>
                  </div>
                  <ButtonLink to="/jobs/add-job">Add Job</ButtonLink>
                </div>

                <Card>
                  <p className="text-muted-foreground">
                    Your company jobs will be shown here.
                  </p>
                </Card>
              </div>
            </div>
          )}

          {!isAdmin && !company && (
            <Card>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="section-title">Find your next opportunity</h2>
                  <p className="text-muted-foreground">
                    Explore available jobs and find a role that matches your
                    skills and preferred way of working.
                  </p>
                </div>
                <div>
                  <ButtonLink to="/jobs">Browse Jobs</ButtonLink>
                </div>
              </div>
            </Card>
          )}
        </Container>
      </Section>

      <Section>
        <Container size="narrow">
          <div className="flex items-center justify-between border-t border-border pt-6">
            <div>
              <h2 className="font-semibold">Account</h2>
              <p className="text-sm text-muted-foreground">
                Sign out from your NextRole account.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending ? 'Logging out...' : 'Log out'}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default ProfilePage;
