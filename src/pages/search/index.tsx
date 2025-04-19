import CustomPagination from '@/components/CustomPagination';
import SectionHeader from '@/components/Header/SectionHeader';
import LogCard from '@/components/LogCard/LogCard';
import SearchNotFound from '@/features/search/SearchNotFound';
import SearchTitleHeader from '@/features/search/SearchTitleHeader';
import useSearchAddresLog from '@/hooks/queries/searchLog/useSearchAddresLog';
import useSearchNameLog from '@/hooks/queries/searchLog/useSearchNameLog';
import PageLayout from '@/layouts/PageLayout';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

function Search() {
  const location = useLocation();
  const nav = useNavigate();
  const [searchParams] = useSearchParams();

  const pageNumber = searchParams.get('pageNumber');

  const title = location.state?.title || '';

  const sido = location.state.sido;
  const bname = location.state.bname;
  useEffect(() => {
    if (!title && !sido && !bname) {
      nav('/');
    }
  }, [title, sido, bname, nav]);
  const { data: addresData } = useSearchAddresLog(
    { page: Number(pageNumber), sido, bname },
    { enabled: !!bname }
  );
  const { data: nameData } = useSearchNameLog(
    { page: Number(pageNumber), name: title },
    { enabled: !!title }
  );

  const data = title ? nameData : addresData;
  //const isLoading = title ? isNameLoading : isAddresLoading;
  return (
    <PageLayout>
      <SearchTitleHeader labelText="Searching for" queryText={title || bname} />
      <section className="flex flex-col w-full pt-10 web:pt-[50px]">
        <SectionHeader
          labelText="Sort by"
          queryText="Popularity"
          className="pt-10 web:pt-[50px] gap-[3px] web:gap-[9px]"
        />
        {data?.content.length === 0 || !data ? (
          <SearchNotFound />
        ) : (
          <>
            <div className="flex flex-col gap-y-[34px] web:grid web:grid-cols-4 web:gap-x-[15px] web:gap-y-10 mt-6 web:mt-[50px]">
              {data?.content?.map((log, idx: number) => {
                const isLarge = idx === 2;

                return (
                  <div key={idx} className={cn(isLarge && 'col-span-2 row-span-2')}>
                    <LogCard log={log} isLarge={isLarge} />
                  </div>
                );
              })}
            </div>
            <CustomPagination currentPage={data?.pageNumber!} totalPages={data?.totalPages!} />
          </>
        )}
      </section>
    </PageLayout>
  );
}

export default Search;
