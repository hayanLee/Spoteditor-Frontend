import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from '../ui/pagination';
interface MainPaginationProps {
  totalPages?: number;
}

const MainPagination = ({ totalPages = 5 }: MainPaginationProps) => {
  const isEllipsis = totalPages > 3;
  const hasNext = totalPages > 1;
  return (
    <Pagination>
      <PaginationContent>
        {[...Array(totalPages)].map((_, idx) => (
          <PaginationItem key={idx}>
            <PaginationLink>{String(idx + 1).padStart(2, '0')}</PaginationLink>
          </PaginationItem>
        ))}
        {isEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {isEllipsis && (
          <PaginationItem>
            <PaginationLink>{String(totalPages).padStart(2, '0')}</PaginationLink>
          </PaginationItem>
        )}
        {hasNext && (
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default MainPagination;
