import { Textarea } from '@/components/ui/textarea';
import useImages from '@/hooks/useImages';
import { PresignedUrlWithName, ResponsePlace } from '@/services/apis/types/registerAPI.type';
import { ChevronRight, Circle, CircleCheck, Clock, MapPin } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import PlaceImagesInput from '../registerpage/PlaceImagesInput';

interface PlaceEditFormItemProps {
  place: ResponsePlace;
  idx: number;
  registerTextRef: (id: string, elem: HTMLTextAreaElement) => void;
  onChangePresignUrlList: Dispatch<SetStateAction<{ [key: number]: PresignedUrlWithName[] }>>;
  setModifyTarget?: Dispatch<SetStateAction<kakao.maps.services.PlacesSearchResultItem | null>>;
}

const PlaceEditFormItem = ({
  place,
  idx,
  registerTextRef,
  onChangePresignUrlList,
}: // setModifyTarget,
PlaceEditFormItemProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChecked = () => {
    console.log('아직 안됨', setIsChecked);
    // if (!setModifyTarget) return;
    // setIsChecked((prev) => {
    //   const newChcked = !prev;
    //   if (newChcked) setModifyTarget(place);
    //   else setModifyTarget(null);
    //   return newChcked;
    // });
  };

  const { handleFileChange, handleRemoveImage, imagePreviews, presignedUrls } = useImages();

  useEffect(() => {
    onChangePresignUrlList((prev) => ({
      ...prev,
      [place.name]: presignedUrls,
    }));
  }, [onChangePresignUrlList, presignedUrls, place.name]);

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
            {place.name} <ChevronRight className="w-[1.2em] h-[1.2em]" />
          </p>
        </div>

        <div className="flex flex-col text-primary-400">
          <div className="flex gap-2 items-center text-text-sm">
            <Clock size={16} />
            <p className="after:ml-1.5">{place.category}</p>
          </div>
          <div className="flex gap-2 items-center text-text-sm">
            <MapPin size={16} />
            <p className="after:ml-1.5 after:content-['|'] after:text-primary-100">
              {place.address.address.split(' ')[0]}
            </p>
            <p>{place.address.address}</p>
          </div>
        </div>
      </section>

      {/* 사진 첨부 */}
      <PlaceImagesInput
        handleFileChange={handleFileChange}
        handleRemoveImage={handleRemoveImage}
        imagePreviews={imagePreviews || place.images}
        defaultplaceImgs={place.images}
      />

      {/* 내용 */}
      <Textarea
        className="bg-primary-50 min-h-[85px] px-[18px] py-2.5 text-primary-300 text-text-sm placeholder:text-primary-300 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="내용을 입력해주세요. (최대 500자)"
        maxLength={500}
        ref={(el) => registerTextRef(place.name, el!)}
      />
    </div>
  );
};

export default PlaceEditFormItem;
