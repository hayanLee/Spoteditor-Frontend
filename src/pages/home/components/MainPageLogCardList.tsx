import CustomPagination from '@/components/CustomPagination';
import LogCard from '@/components/LogCard/LogCard';
import { Skeleton } from '@/components/ui/skeleton';
import useLogList from '@/hooks/queries/log/useLogList';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'react-router-dom';

const MainPageLogCardList = () => {
  const [searchParams] = useSearchParams();
  const pageNumber = searchParams.get('pageNumber');
  const { data, isPending, isError } = useLogList({ page: Number(pageNumber) || 1 });
  const isDataReady = isPending || isError;
  const content = data?.content || [];
  const gridRows = content?.length ? Math.min(Math.floor(content.length / 4), 4) : 0;

  return (
    <div className="flex flex-col mb-[100px] web:mb-[140px]">
      <div
        className={`web:grid web:grid-cols-4 web:grid-rows-${gridRows} web:gap-x-[15px] web:gap-y-10 web:mb-[50px] space-y-[34px] web:space-y-0`}
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

      <CustomPagination
        currentPage={Number(data?.pageNumber)}
        totalPages={Number(data?.totalPages)}
      />
    </div>
  );
};

export default MainPageLogCardList;
