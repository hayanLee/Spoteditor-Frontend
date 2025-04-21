import MainCarousel from '@/components/Carousel/MainCarousel';
import { Button } from '@/components/ui/button';
import { REGISTER_SELECT } from '@/constants/pathname';
import MainHero from '@/features/home-page/MainHero';
import TypingText from '@/features/home-page/TypingText';
import { MoveUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MainPageLogCardList from '../detail-page/components/MainPageLogCardList';

const HomePage = () => {
  (() => {
    window.navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        window.document.body.innerHTML = `<h2>📍현재 위치</h2><p>위도: ${lat}</p><p>경도: ${lng}</p>`;
        console.log({ lat, lng });
      },
      (err) => {
        window.document.body.innerHTML = `<p style="color: red;">❌ 위치 오류: ${err.message}</p>`;
        console.error(err);
      }
    );
  })();
  const navi = useNavigate();
  const handleGotoRegisterPage = () => navi(REGISTER_SELECT);

  return (
    <>
      {/* 메인 히어로 */}
      <MainHero />

      <div className="flex flex-col px-4 web:px-[50px]">
        {/* 제목 */}
        <div className="flex items-end justify-between mt-10 mb-6">
          <div className="text-xl font-medium web:text-2xl !leading-[120%] font-untitled">
            <h3 className="text-primary-300">Sort by</h3>
            <h3 className="text-primary-950">Popularity</h3>
          </div>
        </div>

        {/* 컨테이너 */}
        <MainCarousel />

        {/* 에디터 설명 */}
        <div className="flex flex-col justify-center my-20 web:grid web:grid-cols-2 border-primary-100 web:gap-7">
          <div className="py-[18px] border-t border-b flex flex-col justify-center web:py-10 gap-[15px] web:gap-6">
            <TypingText text='모든 유저가 특별한 "에디터"가 될 수 있어요!' />

            <div className="flex">
              <Button
                className="rounded-full text-text-sm text-white py-2.5 px-6 web:text-text-md web:py-3"
                onClick={handleGotoRegisterPage}
              >
                나의 추천 코스 등록하기
              </Button>
              <Button
                fullRounded
                onClick={handleGotoRegisterPage}
                className="h-full aspect-square p-0"
              >
                <MoveUpRight strokeWidth={3} />
              </Button>
            </div>
          </div>

          <div className="flex-col text-light-300 text-text-sm web:border-t border-b border-primary-100 py-[18px] web:h-full flex justify-center web:text-text-lg web:font-regular web:px-5">
            <p>
              내가 좋아하는 숨은 명소와 맛집을 공유하고, 다른 유저들이 여러분의 루트를 참고하며
              "내가 만든 코스로 누군가 즐거운 하루를 보냈구나!" 하는 느낌, 상상만 해도 행복하지
              않나요? 🥰
            </p>
            <p>다른 유저들이 참고할 수 있도록 여러분만의 코스를 나눠보세요.</p>
            <p>여러분이 만들어준 코스는 많은 사람들에게 새로운 영감을 줄 거예요!</p>
          </div>
        </div>

        {/* 로그 */}
        <div className="mb-6 font-untitled">
          <div className="text-xl font-medium web:text-2xl">
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
