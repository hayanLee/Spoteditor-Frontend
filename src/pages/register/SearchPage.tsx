import { Button } from '@/components/ui/button';
import { REGISTER_DETAILS } from '@/constants/pathname';
import PlaceListItem from '@/features/registerpage/PlaceListItem';
import RegisterSearchBar from '@/features/registerpage/RegisterSearchBar';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  return (
    <div className="h-full flex flex-col">
      <RegisterSearchBar />

      <main className="flex flex-col items-center grow ">
        {/* 최근 검색 */}
        <div className="w-full">
          <h3 className="text-text-2xl font-bold pt-5 pb-2.5">최근 검색한 장소</h3>
          {[...Array(2)].map((_, idx) => (
            <PlaceListItem key={idx} />
          ))}
        </div>

        {/* 최근 저장 */}
        <div className="w-full">
          <h3 className="text-text-2xl font-bold pt-5 pb-2.5">저장된 장소</h3>
          {[...Array(5)].map((_, idx) => (
            <PlaceListItem key={idx} />
          ))}

          <Button className="w-full" variant={'ghost'}>
            전체보기
          </Button>
        </div>
      </main>

      {/* 버튼 */}
      <Button className="w-full mb-3" asChild size={'xl'}>
        <Link to={REGISTER_DETAILS}>완료</Link>
      </Button>
    </div>
  );
};

export default SearchPage;
