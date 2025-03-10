import { Textarea } from '@/components/ui/textarea';
import useImages from '@/hooks/useImages';
import { PresignedUrlWithName } from '@/services/apis/types/registerAPI.type';
import { ChevronRight, Circle, CircleCheck, Clock, MapPin } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import PlaceImagesInput from './PlaceImagesInput';

interface PlaceDetailFormItemProps {
  place: kakao.maps.services.PlacesSearchResultItem;
  idx: number;
  registerTextRef: (id: string, elem: HTMLTextAreaElement) => void;
  onChangePresignUrlList: Dispatch<SetStateAction<{ [key: number]: PresignedUrlWithName[] }>>;
  setModifyTarget?: Dispatch<SetStateAction<kakao.maps.services.PlacesSearchResultItem | null>>;
}

const PlaceDetailFormItem = ({
  place,
  idx,
  registerTextRef,
  onChangePresignUrlList,
  setModifyTarget,
}: PlaceDetailFormItemProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChecked = () => {
    if (!setModifyTarget) return;
    setIsChecked((prev) => {
      const newChcked = !prev;
      if (newChcked) setModifyTarget(place);
      else setModifyTarget(null);
      return newChcked;
    });
  };

  const { handleFileChange, handleRemoveImage, imagePreviews, presignedUrls } = useImages();

  useEffect(() => {
    onChangePresignUrlList((prev) => ({
      ...prev,
      [place.place_name]: presignedUrls,
    }));
  }, [onChangePresignUrlList, presignedUrls, place.place_name]);

  return (
    <div className="py-[5px]">
      {/* 장소 설명 */}
      <section className="flex flex-col gap-2">
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
            {place.place_name} <ChevronRight className="w-[1.2em] h-[1.2em]" />
          </p>
        </div>

        <div className="flex flex-col text-primary-400">
          <div className="flex gap-2 items-center text-text-sm">
            <Clock size={16} />
            <p className="after:ml-1.5">{place.category_group_name}</p>
          </div>
          <div className="flex gap-2 items-center text-text-sm">
            <MapPin size={16} />
            <p className="after:ml-1.5 after:content-['|'] after:text-primary-100">
              {place.road_address_name.split(' ')[0]}
            </p>
            <p>{place.road_address_name}</p>
          </div>
        </div>
      </section>

      {/* 사진 첨부 */}
      <PlaceImagesInput
        handleFileChange={handleFileChange}
        handleRemoveImage={handleRemoveImage}
        imagePreviews={imagePreviews}
      />

      {/* 내용 */}
      <Textarea
        className="bg-primary-50 min-h-[85px] px-[18px] py-2.5 text-primary-300 text-text-sm placeholder:text-primary-300 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="내용을 입력해주세요. (최대 500자)"
        maxLength={500}
        ref={(el) => registerTextRef(place.id, el!)}
      />
    </div>
  );
};

export default PlaceDetailFormItem;
