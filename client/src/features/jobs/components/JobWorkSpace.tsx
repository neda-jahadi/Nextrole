import { useState } from 'react';
import PaginationComponent from '@/components/navigation/AppPagination';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet';
import type { PaginationType, SingleJob } from '../types/jobTypes';
import JobListItem from './JobListItems';
import JobPreview from './JobPreview';

type JobWorkSpaceProps = {
  jobs: SingleJob[];
  pagination?: PaginationType;
  selectedJob: SingleJob | null;
  onSelectJob: (jobId: string) => void;
  onPageChange: (pageValue: number) => void;
};

const JobWorkSpace = ({
  jobs,
  pagination,
  selectedJob,
  onSelectJob,
  onPageChange,
}: JobWorkSpaceProps) => {
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);

  const handleSelectJob = (jobId: string) => {
    onSelectJob(jobId);

    if (window.matchMedia('(max-width: 1023px)').matches) {
      setIsMobilePreviewOpen(true);
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-card">
        <div aria-label="Job search results">
          <ul>
            {jobs.map((job) => (
              <li key={job.id}>
                <JobListItem
                  job={job}
                  variant={
                    job.id.toString() === selectedJob?.id.toString()
                      ? 'interactive'
                      : 'default'
                  }
                  onSelectJob={handleSelectJob}
                />
                <hr className="border-border" />
              </li>
            ))}
          </ul>
          <PaginationComponent
            pagination={pagination}
            onPageChange={(value) => onPageChange(value)}
          />
        </div>
      </div>

      <Sheet
        open={isMobilePreviewOpen}
        onOpenChange={setIsMobilePreviewOpen}
      >
        <SheetContent
          side="bottom"
          className="max-h-[88vh] overflow-y-auto rounded-t-2xl p-6 pt-10 lg:hidden"
        >
          <div
            className="absolute left-1/2 top-3 h-1.5 w-12 -translate-x-1/2 rounded-full bg-muted"
            aria-hidden="true"
          />
          {selectedJob ? (
            <>
              <SheetTitle className="sr-only">{selectedJob.title}</SheetTitle>
              <SheetDescription className="sr-only">
                Preview of the selected job
              </SheetDescription>
              <JobPreview key={selectedJob.id} job={selectedJob} />
            </>
          ) : (
            <>
              <SheetTitle className="sr-only">Job preview</SheetTitle>
              <SheetDescription>Select a job to view details</SheetDescription>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default JobWorkSpace;
