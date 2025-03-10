import mockImg3 from '@/assets/mock/3.png';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '@/layouts/PageLayout';
import LogCard from '@/features/homepage/LogCard';
import { cn } from '@/lib/utils';
import SectionHeader from '@/components/Header/SectionHeader';
import SearchTitleHeader from '@/features/search/SearchTitleHeader';
import CustomPagination from '@/components/CustomPagination';

function Search() {
  const location = useLocation();
  const nav = useNavigate();
  const title = location.state?.title || '';

  useEffect(() => {
    if (!title) {
      nav('/');
    }
  }, [title, nav]);
  return (
    <PageLayout>
      <SearchTitleHeader labelText="Searching for" queryText={title} />
      <section className="flex flex-col w-full pt-10 web:pt-[50px]">
        <SectionHeader
          labelText="Sort by"
          queryText="Popularity"
          className="pt-10 web:pt-[50px] gap-2 web:gap-3.5"
        />
        <div className="flex flex-col gap-y-[34px] web:grid web:grid-cols-4 web:grid-rows-4 web:gap-x-[15px] web:gap-y-10 mt-6 web:mt-[50px]">
          {[...Array(13)].map((_, idx) => {
            const isLarge = idx === 2;

            const logCardProps = {
              placeId: idx,
              name: '혼자 보내는 하루, 골목골목 숨어있는 용산 원효로 카페',
              image: mockImg3,
              location1: '서울',
              location2: '위치 세부정보',
              isLarge,
            };

            return (
              <div key={idx} className={cn(isLarge && 'col-span-2 row-span-2')}>
                <LogCard {...logCardProps} />
              </div>
            );
          })}
        </div>
        <CustomPagination currentPage={1} totalPages={2} />
      </section>
    </PageLayout>
  );
}

export default Search;
