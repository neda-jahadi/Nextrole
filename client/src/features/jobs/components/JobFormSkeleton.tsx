import Container from '@/components/layouts/Container';
import Panel from '@/components/layouts/Panel';
import Section from '@/components/layouts/Section';
import Skeleton from '@/components/ui/Skeleton';

const JobFormSkeleton = () => (
  <Section>
    <Container size="narrow">
      <Panel>
        <div
          className="flex flex-col gap-6"
          role="status"
          aria-label="Loading job form"
        >
          <Skeleton className="mx-auto h-8 w-40" />
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="flex flex-col gap-2" aria-hidden="true">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-11 w-full" />
            </div>
          ))}
          <Skeleton className="h-28 w-full" aria-hidden="true" />
          <Skeleton className="h-10 w-32" aria-hidden="true" />
          <span className="sr-only">Loading job form...</span>
        </div>
      </Panel>
    </Container>
  </Section>
);

export default JobFormSkeleton;
