import { Textarea } from '@/components/ui/textarea';
import { LogWriteFormData } from '@/pages/register-page/LogWritePage';
import useDrawerStore from '@/store/drawerStore';
import { Circle, CircleCheck, Clock, MapPin } from 'lucide-react';
import { Control, Controller, UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import PlaceImagesInput from './PlaceImagesInput';

interface PlaceFormItemProps {
  control: Control<LogWriteFormData>;
  place: kakao.maps.services.PlacesSearchResultItem;
  idx: number;
  setValue: UseFormSetValue<LogWriteFormData>;
  trigger: UseFormTrigger<LogWriteFormData>;
}

const PlaceFormItem = ({ place, idx, control, setValue, trigger }: PlaceFormItemProps) => {
  const isOpen = useDrawerStore((state) => state.isOpen); // 열림 여부
  const openModal = useDrawerStore((state) => state.openNewLogDrawer); // 열림 + 타켓 지정
  const closeModal = useDrawerStore((state) => state.closeDrawer);
  const targetPlace = useDrawerStore((state) => state.newLogTargetPlace);

  return (
    <div className="py-[5px]">
      {/* 장소 설명 */}
      <section className="flex flex-col gap-2">
        <div className="text-text-lg font-bold">
          <div className="flex justify-between">
            <p>{String(idx + 1).padStart(2, '0')}</p>
            {isOpen && targetPlace?.id === place.id ? (
              <CircleCheck className="fill-black stroke-white" onClick={closeModal} />
            ) : (
              <Circle className="stroke-neutral-200" onClick={() => openModal(place)} />
            )}
          </div>
          <p className="flex items-center">{place.place_name}</p>
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
      <PlaceImagesInput control={control} setValue={setValue} idx={idx} trigger={trigger} />

      {/* 내용 */}
      <Controller
        name={`places.${idx}.placeDescription`}
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            value={(field.value as string) ?? ''}
            className="bg-primary-50 min-h-[85px] px-[18px] py-2.5 text-primary-300 text-text-sm placeholder:text-primary-300 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="내용을 입력해주세요. (최대 500자)"
          />
        )}
      />
    </div>
  );
};

export default PlaceFormItem;
