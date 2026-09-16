import Container from '@/components/layouts/Container';
import Section from '@/components/layouts/Section';
import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';

const ProfileSkeleton = () => (
  <div role="status" aria-label="Loading profile">
    <Section>
      <Container size="narrow">
        <div className="flex flex-col items-center gap-3" aria-hidden="true">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-5 w-56" />
          <Skeleton className="h-7 w-28 rounded-full" />
        </div>
      </Container>
    </Section>

    <Section variant="muted">
      <Container size="narrow">
        <Card className="flex flex-col gap-6" aria-hidden="true">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-10 w-32" />
        </Card>
      </Container>
    </Section>
    <span className="sr-only">Loading profile...</span>
  </div>
);

export default ProfileSkeleton;
