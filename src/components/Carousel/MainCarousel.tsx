import LogCard from '@/components/LogCard/LogCard';
import LogCardSkeleton from '@/components/Skeleton/LogCardSkeleton';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import useLogList from '@/hooks/queries/log/useLogList';
import { LogContent } from '@/services/apis/types/logAPI.type';
import Autoplay from 'embla-carousel-autoplay';
import throttle from 'lodash/throttle';
import { useCallback, useEffect, useRef, useState } from 'react';

const MainCarousel = () => {
  const { data, isPending, isError } = useLogList({
    page: 1,
    size: 12,
    direction: 'ASC',
  });

  const { content } = data ?? {};
  const isDataReady = isPending || !data || isError;

  const [api, setApi] = useState<CarouselApi | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const autoplayPlugin = useRef(Autoplay({ delay: 8000, stopOnInteraction: false }));

  const handleSetApi = useCallback((carouselApi: CarouselApi | null) => {
    setApi(carouselApi);
  }, []);

  const updateProgressBar = useCallback(() => {
    if (!api || !progressRef.current) return;
    const progress = api.scrollProgress();
    progressRef.current.style.transform = `scaleX(${progress})`;
  }, [api]);

  const throttledUpdateProgress = useRef(
    throttle(updateProgressBar, 16, { leading: true, trailing: true })
  ).current;

  useEffect(() => {
    if (!api) return;
    updateProgressBar();

    api.on('scroll', throttledUpdateProgress);
    api.on('select', updateProgressBar);
    api.on('settle', updateProgressBar); // 스크롤이 정착했을 때
    api.on('reInit', updateProgressBar); // 캐러셀이 다시 초기화될 때

    return () => {
      api.off('scroll', throttledUpdateProgress);
      api.off('select', updateProgressBar);
      api.on('settle', updateProgressBar);
      api.on('reInit', updateProgressBar);

      throttledUpdateProgress.cancel();
    };
  }, [api, updateProgressBar, throttledUpdateProgress]);

  useEffect(() => {
    return () => {
      autoplayPlugin.current.stop();
    };
  }, []);

  return (
    <>
      <div className="w-full flex justify-end relative bottom-[50px]">
        <div className="w-20 h-1 bg-primary-200 rounded-full">
          <div
            ref={progressRef}
            className="h-full bg-black transition-transform duration-300 ease-out rounded-full"
            style={{
              transformOrigin: 'left',
            }}
          />
        </div>
      </div>
      <Carousel
        plugins={[autoplayPlugin.current]}
        opts={{
          slidesToScroll: 4,
        }}
        setApi={handleSetApi}
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
