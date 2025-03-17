import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

interface MainPaginationProps {
  totalPages?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const MainPagination = ({ totalPages = 5, currentPage, onPageChange }: MainPaginationProps) => {
  const isEllipsis = totalPages > 3;
  const hasNext = currentPage < totalPages;
  const hasPrev = currentPage > 1;

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        {hasPrev && (
          <PaginationItem>
            <PaginationPrevious onClick={() => handlePageClick(currentPage - 1)} />
          </PaginationItem>
        )}

        {[...Array(totalPages)].map((_, idx) => {
          const page = idx + 1;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => handlePageClick(page)}
                className={page === currentPage ? 'active' : ''}
              >
                {String(page).padStart(2, '0')}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {isEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {isEllipsis && (
          <PaginationItem>
            <PaginationLink onClick={() => handlePageClick(totalPages)}>
              {String(totalPages).padStart(2, '0')}
            </PaginationLink>
          </PaginationItem>
        )}

        {hasNext && (
          <PaginationItem>
            <PaginationNext onClick={() => handlePageClick(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default MainPagination;
