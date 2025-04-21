import { cn } from '@/lib/utils';
import { useCitySearchStore } from '@/store/searchStore';
import { useState } from 'react';
import CitySearchForm from '../search/CitySearchForm/CitySearchForm';
import CourseButton from './CourseButton';

const categories: string[] = [
  '로.맨.틱 데이트 코스!',
  '가성비 굿 하루',
  '액티비티한 하루!',
  '감성충전 미술관 데이트',
  '홀로 독서하는 하루',
  '찐하게 소비한 하루',
  '친구랑 다양하고 알차게 보낸 하루',
];
const MainHero = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDropBox } = useCitySearchStore();
  return (
    <>
      <div className="web:z-20 bg-black px-4 py-[30px] gap-[25px] flex flex-col web:grid-cols-2 web:grid web:px-[50px] web:py-10 relative">
        <div className="flex text-white text-lg font-medium web:text-4xl items-center !leading-[1.4]">
          어디 갈지 고민될 땐?
          <br />
          감각있는 스팟 큐레이터들이 직접 만든
          <br />
          리얼 코스를 만나보세요!
        </div>

        <div className="flex flex-col gap-[25px]">
          <CitySearchForm />

          {/* 접히는 부분 */}
          <div
            className={`w-5 h-5 transition-all duration-300 absolute bottom-0 right-0 cursor-pointer [clip-path:polygon(0%_0%,100%_0%,0%_100%)] web:hidden
          ${isOpen ? 'bg-primary-500' : 'bg-black'}`}
            onClick={() => setIsOpen(!isOpen)}
          />
          <div
            className={`w-5 h-5 transition-all duration-300 absolute bottom-0 right-0 cursor-pointer [clip-path:polygon(100%_0%,0%_100%,100%_100%)] web:hidden
          ${isOpen ? 'bg-white' : 'bg-primary-500'}`}
            onClick={() => setIsOpen(!isOpen)}
          />

          {/* 접히는 설명 */}
          <div
            className={cn(
              'flex flex-col transition-all duration-300 web:py-0.5 gap-5 justify-between web:max-h-[345px] web:opacity-100',
              isOpen ? 'max-h-[345px] opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <div className="flex flex-wrap gap-1.5">
              {categories.map((category) => (
                <CourseButton key={category} category={category} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {isDropBox && (
        <div className="bg-black/50 backdrop-blur-[10px] w-screen h-screen fixed top-0 left-0 z-10 mobile:hidden" />
      )}
    </>
  );
};

export default MainHero;
