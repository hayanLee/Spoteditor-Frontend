import mockImg from '@/assets/mock/3.png';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import useResponsive from '@/hooks/useResponsive';
import { cn } from '@/lib/utils';
import { PlaceInLog } from '@/services/apis/types/logAPI.type';
import { Image } from '@/services/apis/types/registerAPI.type';
import { Bookmark, Clock, MapPin } from 'lucide-react';
import { useState } from 'react';

interface PlaceItemProps {
  place: PlaceInLog;
  idx: number;
}

const PlaceItem = ({ place, idx }: PlaceItemProps) => {
  const { name, description, address, images } = place;
  const [isChecked, setIsChecked] = useState(false);
  const handleClick = () => setIsChecked((prev) => !prev);
  const { isMobile } = useResponsive();
  return (
    <div className="border-t border-primary-100 pt-[15px] pb-10 web:grid web:grid-cols-[1fr_3fr] web:gap-[15px] web:py-5">
      {/* 장소 제목 */}
      <div className="space-y-2">
        <div className="flex justify-between text-text-lg font-bold web:text-text-2xl">
          <div>
            <p>{String(idx).padStart(2, '0')}</p>
            <h4>{name}</h4>
          </div>
          <Bookmark
            className={cn('cursor-pointer web:!size-9', isChecked && 'fill-black')}
            onClick={handleClick}
          />
        </div>

        <div className="flex flex-col text-text-sm text-primary-400 web:text-text-lg">
          <div className="flex gap-2 items-center">
            <Clock className="w-[1em] h-[1em]" />
            <p>카페</p>
          </div>
          <div className="flex gap-2 items-center">
            <MapPin className="w-[1em] h-[1em]" />
            <p className="after:ml-1.5 after:content-['|'] after:text-primary-100">
              {address.sido}
            </p>
            <p>
              {address.bname} {address.sigungu}
            </p>
          </div>
        </div>
      </div>

      {/* 이미지 컨테이너 */}
      <div className="grow">
        <Carousel className="my-[15px] web:my-0" opts={{ active: isMobile }}>
          <CarouselContent>
            {images.map((img: Image) => (
              <CarouselItem className="flex-none web:basis-1/3" key={img.imageId}>
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
        <p className="text-primary-400 text-text-sm web:text-text-lg web:my-5">{description}</p>
      </div>
    </div>
  );
};

export default PlaceItem;
