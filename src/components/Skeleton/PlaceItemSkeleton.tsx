import { Clock, MapPin } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

const PlaceItemSkeleton = () => {
  return (
    <div className="border-t border-primary-100 pt-[15px] pb-10 web:grid web:grid-cols-[1fr_3fr] web:gap-[15px] web:py-5">
      {/* 장소 제목 */}
      <div className="space-y-2">
        <div className="flex justify-between text-text-lg font-bold web:text-text-2xl">
          <div className="space-y-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>

        <div className="flex flex-col text-text-sm text-primary-400 web:text-text-lg">
          <div className="flex gap-2 items-center">
            <Clock className="w-[1em] h-[1em]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
          <div className="flex gap-2 items-center">
            <MapPin className="w-[1em] h-[1em]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
      </div>

      {/* 이미지 컨테이너 */}
      <div>
        <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="flex gap-6 h-[245px] web:h-[424px] my-[15px]">
            {[...Array(3)].map((_, idx) => (
              <Skeleton className="h-full w-60 web:w-80 flex-shrink-0" key={idx} />
            ))}
          </div>
        </div>

        <div className="text-primary-400 text-text-sm web:text-text-lg web:my-5 space-y-2">
          <Skeleton className="h-5 w-[600px]" />
          <Skeleton className="h-5 w-[400px]" />
        </div>
      </div>
    </div>
  );
};

export default PlaceItemSkeleton;
