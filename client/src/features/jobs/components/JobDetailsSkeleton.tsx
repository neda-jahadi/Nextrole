import Container from '@/components/layouts/Container';
import Panel from '@/components/layouts/Panel';
import Section from '@/components/layouts/Section';
import Skeleton from '@/components/ui/Skeleton';

const JobDetailsSkeleton = () => (
  <Section>
    <Container>
      <div
        className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2"
        role="status"
        aria-label="Loading job details"
      >
        <article className="flex flex-col gap-4" aria-hidden="true">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-5 w-2/5" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-28" />
          </div>
        </article>

        <aside aria-hidden="true">
          <Panel className="flex flex-col gap-6">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-5 w-1/3" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <Skeleton className="h-6 w-44" />
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-5 w-1/2" />
          </Panel>
        </aside>
        <span className="sr-only">Loading job details...</span>
      </div>
    </Container>
  </Section>
);

export default JobDetailsSkeleton;
