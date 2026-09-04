import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import type { PaginationType } from '@/features/jobs/types/jobTypes';

type AppPaginationProps = {
  pagination?: PaginationType;
  onPageChange: (currentPage: number) => void;
};

const AppPagination = ({ pagination, onPageChange }: AppPaginationProps) => {
  const totalPages = pagination ? pagination.totalPages : 0;
  const currentPage = pagination ? pagination.currentPage : 1;
  const hasNextPage = pagination ? pagination.hasNextPage : false;
  const hasPrevPage = pagination ? pagination.hasPrevPage : false;
  const handleClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    if (page === currentPage) return;
    onPageChange(page);
  };

  // Build page range: show first, last, neighbors and ellipses
  const pages: (number | 'ellipsis')[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);

    const left = Math.max(2, currentPage - 1);
    const right = Math.min(totalPages - 1, currentPage + 1);

    if (left > 2) pages.push('ellipsis');

    for (let i = left; i <= right; i++) pages.push(i);

    if (right < totalPages - 1) pages.push('ellipsis');

    pages.push(totalPages);
  }

  return (
    <Pagination className="py-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={!hasPrevPage}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              if (hasPrevPage) onPageChange(Math.max(1, currentPage - 1));
            }}
          />
        </PaginationItem>

        {pages.map((p, idx) =>
          p === 'ellipsis' ? (
            <PaginationItem key={`ell-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                href="#"
                isActive={p === currentPage}
                className="flex items-center justify-center"
                onClick={(e: React.MouseEvent) => handleClick(e, Number(p))}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={!hasNextPage}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              if (hasNextPage)
                onPageChange(Math.min(totalPages, currentPage + 1));
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default AppPagination;
