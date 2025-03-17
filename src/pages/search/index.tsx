import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import PageLayout from '@/layouts/PageLayout';
import { cn } from '@/lib/utils';
import SectionHeader from '@/components/Header/SectionHeader';
import SearchTitleHeader from '@/features/search/SearchTitleHeader';
import CustomPagination from '@/components/CustomPagination';
import useSearchAddresLog from '@/hooks/queries/searchLog/useSearchAddresLog';
import useSearchNameLog from '@/hooks/queries/searchLog/useSearchNameLog';
import SearchNotFound from '@/features/search/SearchNotFound';
import LogCard from '@/features/homepage/LogCard';

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
          className="pt-10 web:pt-[50px] gap-2 web:gap-3.5"
        />
        {data?.content.length === 0 ? (
          <SearchNotFound />
        ) : (
          <>
            <div className="flex flex-col gap-y-[34px] web:grid web:grid-cols-4 web:grid-rows-4 web:gap-x-[15px] web:gap-y-10 mt-6 web:mt-[50px]">
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
{
  /* <div className="flex flex-col web:grid web:grid-cols-4 web:grid-rows-4 web:gap-x-[15px] web:gap-y-10">
{content?.map((log: LogContent, idx: number) => {
  const isLarge = idx === 2;

  return (
    <div key={idx} className={cn(isLarge && 'col-span-2 row-span-2')}>
      <LogCard log={log} isLarge={isLarge} />
    </div>
  );
})}
</div>
<MainPagination totalPages={totalPages} /> */
}
