import CustomPagination from '@/components/CustomPagination';
import CaptionTitle from '@/components/Header/CaptionTitle';
import LogCard from '@/components/LogCard/LogCard';
import useSearchAddresLog from '@/hooks/queries/searchLog/useSearchAddresLog';
import useSearchNameLog from '@/hooks/queries/searchLog/useSearchNameLog';
import PageLayout from '@/layouts/PageLayout';
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
  return (
    <PageLayout>
      <CaptionTitle title="Searching for" subTitle={title || bname} boldTarget="subTitle" />

      <div className="border border-b-primary-100 w-full my-10 web:my-[60px]" />

      <section className="flex flex-col w-full">
        {data?.content.length === 0 || !data ? (
          <p className="text-light-300 text-text-lg web:text-text-xl">검색 결과가 없습니다.</p>
        ) : (
          <>
            <CaptionTitle title="Sort by" subTitle="Popularity" />
            <div className="flex flex-col gap-y-[34px] web:grid web:grid-cols-4 web:gap-x-[15px] web:gap-y-10 mt-6 web:mt-[50px]">
              {data?.content?.map((log) => (
                <LogCard log={log} key={log.placeLogId} />
              ))}
            </div>
            <CustomPagination
              currentPage={Number(data?.pageNumber)}
              totalPages={Number(data?.totalPages)}
            />
          </>
        )}
      </section>
    </PageLayout>
  );
}

export default Search;
