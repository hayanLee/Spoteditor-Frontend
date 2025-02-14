import mockImg from '@/assets/mock/3.png';
import { BookMarkIcon, ClockIcon, SpotIcon, StarIcon } from '@/components/Icons';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const PlaceItem = () => {
  return (
    <div className="border-t py-[15px] web:grid web:grid-cols-[1fr_3fr] web:gap-5 web:py-4">
      {/* 장소 제목 */}
      <div>
        <div className="flex justify-between">
          <div className="text-text-lg font-bold web:text-text-2xl">
            <p>01</p>
            <h4>서촌 베란다</h4>
          </div>
          <BookMarkIcon className="cursor-pointer" />
        </div>

        <div className="flex flex-col text-text-sm text-primary-400 web:text-text-lg">
          <div className="flex gap-2 items-center">
            <ClockIcon />
            <p className="after:ml-1.5 after:content-['|'] after:text-primary-100">카페</p>
            <p className="text-info-500">영업중</p>
            <p>오후 8시에 영업종료</p>
          </div>
          <div className="flex gap-2 items-center">
            <SpotIcon className="stroke-primary-400" />
            <p className="after:ml-1.5 after:content-['|'] after:text-primary-100">서울</p>
            <p>위치 세부정보</p>
          </div>
        </div>
      </div>

      {/* 이미지 컨테이너 */}
      <div className="grow">
        <Carousel className="my-5 web:my-0 web:mb-5 ">
          <CarouselContent className="gap-2.5 flex">
            {[...Array(3)].map((_, idx) => (
              <CarouselItem className="flex-none web:basis-1/3" key={idx}>
                <Dialog>
                  <DialogTrigger>
                    <img src={mockImg} alt="mockImg" className="w-[245px] web:w-full" />
                  </DialogTrigger>
                  <DialogContent className="bg-transparent" hideCloseButton>
                    <Carousel className="w-full">
                      <CarouselContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                          <CarouselItem key={index}>
                            <img src={mockImg} alt="mockImg" />
                          </CarouselItem>
                        ))}
                      </CarouselContent>

                      {/* 좌우 버튼 */}
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </DialogContent>
                </Dialog>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* 장소 설명 */}
        <div className="flex items-center text-text-sm font-bold gap-1">
          <StarIcon fontSize={18} />
          <p>4.0</p>
        </div>
        <p className="text-primary-400 text-text-sm mt-2.5 web:text-text-lg">
          그저 그날의 날씨, 공간의 분위기, 흘러나오는 음악 소리, 그리고 함께 있는 사람, 그 모든
          것들이 조화롭게 어우러지는 순간. 그럴 때 커피 한 잔이 우리의 감정을 담는 그릇이 되어특별한
          의미를 갖는 것 같아요. 풍류는 옛 선비들이 인격 수양을 위해 자연을 가까이 두고 멋스럽게
          운치를 즐기던 행위를 뜻합니다. 어느 학자는 이런 의미를 두고 멋스럽게
        </p>
      </div>
    </div>
  );
};

export default PlaceItem;
