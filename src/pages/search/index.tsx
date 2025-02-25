import SectionHeader from '@/components/Header/SectionHeader';
import mockImg3 from '@/assets/mock/3.png';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomPagination from '@/components/CustomPagination';
import PageLayout from '@/layouts/PageLayout';
import LogCard from '@/features/homepage/LogCard';
import { cn } from '@/lib/utils';

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
    <PageLayout className="web:gap-[50px]">
      <SectionHeader labelText="Searching for" queryText={title} bottomLine />
      <SectionHeader labelText="Sort by" queryText="Popularity" />
      {/* <SearchNotFound /> */}
      <div className="flex flex-col gap-y-8 web:grid web:grid-cols-4 web:grid-rows-4 web:gap-x-[15px] web:gap-y-10">
        {[...Array(13)].map((_, idx) => {
          const isLarge = idx === 2;

          const logCardProps = {
            key: idx,
            title: '혼자 보내는 하루, 골목골목 숨어있는 용산 원효로 카페',
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
      <CustomPagination current={2} total={12} />
    </PageLayout>
  );
}

export default Search;
