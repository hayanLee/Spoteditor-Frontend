import MainPagination from '@/components/Pagination/MainPagination';
import useLogList from '@/hooks/queries/log/useLogList';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import LogCard from '../../features/homepage/LogCard';
import { Skeleton } from '../ui/skeleton';

const MainPageLogCardList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isPending, isError } = useLogList({ page: currentPage });
  const { content, totalPages } = data ?? {};

  const isDataReady = isPending || isError || !content;
  const gridRows = content?.length ? Math.min(Math.floor(content.length / 4), 4) : 0;

  return (
    <div className="flex flex-col mb-[100px] web:mb-[140px]">
      <div
        className={`web:grid web:grid-cols-4 web:grid-rows-${gridRows} web:gap-x-[15px] web:gap-y-10 web:mb-[50px]`}
      >
        {isDataReady
          ? [...Array(9)].map((_, idx) => (
              <div key={idx} className={cn(idx === 2 && 'col-span-2 row-span-2')}>
                <Skeleton className="w-full min-h-[200px] h-full rounded-lg" />
              </div>
            ))
          : content.map((log, idx) => {
              const isLarge = idx === 2;
              return (
                <div key={idx} className={cn(isLarge && 'col-span-2 row-span-2')}>
                  <LogCard log={log} isLarge={isLarge} />
                </div>
              );
            })}
      </div>

      <MainPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default MainPageLogCardList;
