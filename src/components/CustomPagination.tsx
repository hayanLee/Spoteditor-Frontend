import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { useSearchParams } from 'react-router-dom';

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function CustomPagination({ currentPage, totalPages }: CustomPaginationProps) {
  if (totalPages <= 1 || !currentPage) return null;

  const [_, setSearchParams] = useSearchParams();

  const handlePageChange = (page: number) => {
    setSearchParams({ pageNumber: page.toString() });
  };

  const shouldShowLeftArrow = currentPage >= 3;
  const shouldShowRightArrow = currentPage < totalPages - 2;

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage === 3) {
      return [2, 3, 4, '...', totalPages];
    }
    if (currentPage > totalPages - 2) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    if (currentPage > 3 && totalPages - 3) {
      return [currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }

    return [1, 2, 3, '...', totalPages];
  };
  return (
    <Pagination>
      <PaginationContent>
        {shouldShowLeftArrow && (
          <PaginationItem>
            <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
          </PaginationItem>
        )}
        {getPageNumbers().map((page, idx) =>
          Number.isInteger(page) ? (
            <PaginationItem key={idx}>
              <PaginationLink
                onClick={() => handlePageChange(Number(page))}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationEllipsis key={idx} />
          )
        )}
        {shouldShowRightArrow && (
          <PaginationItem>
            <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
