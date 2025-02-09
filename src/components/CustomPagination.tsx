import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useState } from 'react';

interface CustomPaginationProps {
  total: number;
  current: number;
}

function CustomPagination({ total, current }: CustomPaginationProps) {
  const [pageNums] = useState([1, 2, 3]);

  const onPrevClick = () => {};

  const onNextClick = () => {};
  return (
    <Pagination>
      <PaginationContent>
        {current >= 1 || current <= 3 ? (
          <PaginationItem>
            <PaginationPrevious onClick={onPrevClick} />
          </PaginationItem>
        ) : null}
        {pageNums.map((num) => (
          <PaginationItem>
            <PaginationLink isActive={current === num}>{num}</PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="">{total}</PaginationLink>
        </PaginationItem>
        {current >= total - 3 && current <= total ? (
          <PaginationItem>
            <PaginationPrevious onClick={onPrevClick} />
          </PaginationItem>
        ) : null}
        <PaginationItem>
          <PaginationNext onClick={onNextClick} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default CustomPagination;
