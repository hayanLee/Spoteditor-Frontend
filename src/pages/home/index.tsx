import mockImg1 from '@/assets/mock/1.png';
import mockImg3 from '@/assets/mock/3.png';
import ArrowIcon from '@/components/Icons/ArrowIcon';
import MainPagination from '@/components/Pagination/MainPagination';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import CitySearchForm from '@/features/homepage/CitySearchForm';
import CourseButton from '@/features/homepage/CourseButton';
import LogCard from '@/features/homepage/LogCard';

import { cn } from '@/lib/utils';
const categories: string[] = [
  '로.맨.틱 데이트 코스!',
  '가성비 굿 하루',
  '액티비티한 하루!',
  '감성충전 미술관 데이트',
  '홀로 독서하는 하루',
  '찐하게 소비한 하루',
  '친구랑 다양하고 알차게 보낸 하루',
];
const HomePage = () => {
  return (
    <div>
      <div className="bg-black py-8 px-4 flex flex-col web:grid web:grid-cols-2 web:gap-[30px] web:px-[50px] web:py-10">
        <div className="flex flex-col justify-between gap-5">
          <div className="text-white text-md web:text-xl">
            반가워요! <br />
            Spoteditor는 "어디 가서 놀지?"
            <br className="web:hidden" />
            하고 고민하는
            <br className="hidden web:block" />
            여러분을 위해
            <br className="web:hidden" />
            만들어졌어요.
          </div>

          <CitySearchForm />
        </div>

        <div className="flex flex-col web:px-5 gap-5">
          <p className="text-primary-500 text-text-sm web:text-text-xl">
            사실 어디 놀러 갈지 정하는 게 의외로 스트레스잖아요? 맛집도 찾고, 사진 찍기 좋은 곳도
            골라야 하고, 이동 동선도 생각해야 하고... 아, 머리 아파! Spoteditor에선 그런 고민 필요
            없어요. 하루를 알차게 보낼 수 있는 데이트 코스나 친구랑 돌아다니기 좋은 루트를 쉽게
            찾아볼 수 있게 도와드릴게요. 그냥 간단히 어떤 분위기의 하루를 보내고 싶은지, 누구랑 함께
            하는지, 어떤 지역에서 놀고 싶은지만 알려주세요. 저희가 딱 맞는 루트를 추천해 드릴게요.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((category) => (
              <CourseButton key={category} category={category} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col px-4 web:px-[50px]">
        {/* 제목 */}
        <div className="flex justify-between items-end mt-10 mb-6">
          <div>
            <h3 className="text-primary-300 text-xl font-semibold">Sort by</h3>
            <h3 className="text-primary-950 text-xl font-semibold">Popularity</h3>
          </div>
          <div className="hidden web:block">--------</div>
        </div>

        {/* 컨테이너 */}
        <Carousel>
          <CarouselContent className="flex">
            {[...Array(5)].map((_, idx) => (
              <CarouselItem className="flex-none basis-1/1.5 web:basis-1/4" key={idx}>
                <LogCard
                  title={'혼자 보내는 하루, 골목골목 숨어있는 용산 원효로 카페'}
                  image={mockImg1}
                  location1="서울"
                  location2="위치 세부정보"
                  vertical
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* 에디터 설명 */}
        <div className="flex flex-col web:grid web:grid-cols-2 border-primary-100 my-20 web:gap-7 justify-center">
          <div className="py-[18px] border-t border-b flex flex-col justify-center web:py-10">
            <h3 className="text-md font-bold web:text-xl">
              모든 유저가 <br className="web:hidden" />
              특별한 "에디터"가 될 수 있어요!
            </h3>

            <div className="flex my-[15px]">
              <Button className="rounded-full text-text-sm text-white py-2.5 px-6 web:text-text-md web:py-3">
                나의 추천 코스 등록하기
              </Button>
              <div className="rounded-full w-10 h-10 bg-black flex justify-center items-center">
                <ArrowIcon />
              </div>
            </div>
          </div>

          <p className="text-primary-300 text-text-sm web:border-t border-b border-primary-100 py-[18px] web:h-full flex items-center web:text-text-lg web:font-regular">
            내가 좋아하는 숨은 명소와 맛집을 공유하고, 다른 유저들이 여러분의 루트를 참고하며 "내가
            만든 코스로 누군가 즐거운 하루를 보냈구나!" 하는 느낌, 상상만 해도 행복하지 않나요? 🥰
            다른 유저들이 참고할 수 있도록 여러분만의 코스를 나눠보세요. 여러분이 만들어준 코스는
            많은 사람들에게 새로운 영감을 줄 거예요!
          </p>
        </div>

        {/* 로그 */}
        <div>
          <h3 className="text-primary-300 text-xl font-semibold">Latest</h3>
          <h3 className="text-primary-950 text-xl font-semibold">Log</h3>
        </div>

        <div className="flex flex-col gap-y-8 web:grid web:grid-cols-4 web:grid-rows-4 web:gap-x-[15px] web:gap-y-10">
          {[...Array(13)].map((_, idx) => {
            const isLarge = idx === 2;

            const logCardProps = {
              key: idx,
              title: '혼자 보내는 하루, 골목골목 숨어있는 용산 원효로 카페',
              image: isLarge ? mockImg1 : mockImg3,
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

        <MainPagination />
      </div>
    </div>
  );
};

export default HomePage;
