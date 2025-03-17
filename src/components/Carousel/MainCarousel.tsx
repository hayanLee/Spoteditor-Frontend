import LogCardSkeleton from '@/components/Skeleton/LogCardSkeleton';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import LogCard from '@/features/homepage/LogCard';
import useLogList from '@/hooks/queries/log/useLogList';
import { LogContent } from '@/services/apis/types/logAPI.type';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';

const MainCarousel = () => {
  const { data, isPending, isError } = useLogList();
  const { content } = data ?? {};
  const isDataReady = isPending || !data || isError;

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (api) {
      const totalSlides = api.scrollSnapList().length;
      const selectedSlide = api.selectedScrollSnap() + 1;

      setTotal(totalSlides);
      setCurrent(selectedSlide);

      api.on('select', () => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    }
  }, [api]);

  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <>
      <div className="w-full flex justify-end relative bottom-[50px]">
        <div className="w-20 h-1 bg-primary-200">
          <div className="h-full bg-black" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <Carousel
        plugins={[Autoplay({ delay: 8000, stopOnInteraction: false })]}
        opts={{
          slidesToScroll: 4,
        }}
        setApi={setApi}
      >
        <CarouselContent className="flex">
          {isDataReady
            ? [...Array(4)].map((_, idx) => (
                <CarouselItem className="flex-none basis-1/1.5 web:basis-1/4" key={idx}>
                  <LogCardSkeleton />
                </CarouselItem>
              ))
            : content?.map((log: LogContent) => (
                <CarouselItem className="flex-none basis-1/1.5 web:basis-1/4" key={log.placeLogId}>
                  <LogCard vertical log={log} />
                </CarouselItem>
              ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};

export default MainCarousel;
