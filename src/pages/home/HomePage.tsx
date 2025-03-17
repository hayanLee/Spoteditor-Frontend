import MainCarousel from '@/components/Carousel/MainCarousel';
import ArrowIcon from '@/components/Icons/ArrowIcon';
import MainPageLogCardList from '@/components/LogCard/MainPageLogCardList';
import { Button } from '@/components/ui/button';
import { REGISTER_SELECT } from '@/constants/pathname';
import MainHero from '@/features/homepage/MainHero';
import TypingText from '@/features/homepage/TypingText';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navi = useNavigate();
  const handleGotoRegisterPage = () => navi(REGISTER_SELECT);

  return (
    <>
      {/* 메인 히어로 */}
      <MainHero />

      <div className="flex flex-col px-4 web:px-[50px]">
        {/* 제목 */}
        <div className="flex items-end justify-between mt-10 mb-6 font-untitled">
          <div className="text-xl font-semibold web:text-2xl">
            <h3 className="text-primary-300">Sort by</h3>
            <h3 className="text-primary-950">Popularity</h3>
          </div>
        </div>

        {/* 컨테이너 */}
        <MainCarousel />

        {/* 에디터 설명 */}
        <div className="flex flex-col justify-center my-20 web:grid web:grid-cols-2 border-primary-100 web:gap-7">
          <div className="py-[18px] border-t border-b flex flex-col justify-center web:py-10">
            <TypingText text='모든 유저가 특별한 "에디터"가 될 수 있어요!' />

            <div className="flex my-[15px]">
              <Button
                className="rounded-full text-text-sm text-white py-2.5 px-6 web:text-text-md web:py-3"
                onClick={handleGotoRegisterPage}
              >
                나의 추천 코스 등록하기
              </Button>
              <div className="flex items-center justify-center w-10 h-10 bg-black rounded-full">
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
        <div className="mb-6 font-untitled">
          <div className="text-xl font-semibold web:text-2xl">
            <h3 className="text-primary-300">Latest</h3>
            <h3 className="text-primary-950">Log</h3>
          </div>
        </div>

        <MainPageLogCardList />
      </div>
    </>
  );
};

export default HomePage;
