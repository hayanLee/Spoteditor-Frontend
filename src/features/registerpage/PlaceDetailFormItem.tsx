import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { KakaoPlace } from '@/pages/register/types/place.type';
import { Camera, ChevronRight, Circle, CircleCheck, Clock, MapPin } from 'lucide-react';
import { useState } from 'react';

const PlaceDetailFormItem = ({ place, idx }: { place: KakaoPlace; idx: number }) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChecked = () => setIsChecked((prev) => !prev);

  return (
    <div className="py-[5px]">
      {/* 장소 설명 */}
      <div className="flex flex-col gap-2">
        <div className="text-text-lg font-bold">
          <div className="flex justify-between">
            <p>{String(idx).padStart(2, '0')}</p>
            {isChecked ? (
              <CircleCheck className="fill-black stroke-white" onClick={handleChecked} />
            ) : (
              <Circle className="stroke-neutral-200" onClick={handleChecked} />
            )}
          </div>
          <p className="flex items-center">
            {place.place_name} <ChevronRight />
          </p>
        </div>

        <div className="flex flex-col text-primary-400">
          <div className="flex gap-2 items-center text-text-sm">
            <Clock size={16} />
            <p className="after:ml-1.5 after:content-['|'] after:text-primary-100">
              {place.category_group_name}
            </p>
            <p className="text-info-500">영업중</p>
            <p>오후 8시에 영업종료</p>
          </div>
          <div className="flex gap-2 items-center text-text-sm">
            <MapPin size={16} />
            <p className="after:ml-1.5 after:content-['|'] after:text-primary-100">
              {place.road_address_name.split(' ')[0]}
            </p>
            <p>{place.road_address_name}</p>
          </div>
        </div>
      </div>

      {/* 사진 첨부 */}
      <Button
        variant={'outline'}
        className="border w-full border-dashed gap-[5px] text-primary-600 px-2.5 py-3 mt-[15px] mb-2.5"
      >
        <Camera />
        <span className="text-text-sm font-bold">사진첨부 (최대 3장)</span>
      </Button>

      {/* 내용 */}
      <Textarea
        className="bg-primary-50 text-primary-300 text-text-sm placeholder:text-primary-300 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="내용을 입력해주세요. (최대 500자)"
      />
    </div>
  );
};
export default PlaceDetailFormItem;
