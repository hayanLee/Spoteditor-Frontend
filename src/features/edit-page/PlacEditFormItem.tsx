import { Textarea } from '@/components/ui/textarea';
import { LogEditFormData } from '@/pages/register-page/EditPage';
import { PlaceInLog } from '@/services/apis/types/logAPI.type';
import useDrawerStore from '@/store/drawerStore';
import { Circle, CircleCheck, Clock, MapPin } from 'lucide-react';
import { Control, Controller, UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import PlaceEditImagesInput from './PlaceEditImagesInput';

interface PlaceEditFormItemProps {
  control: Control<LogEditFormData>;
  place: kakao.maps.services.PlacesSearchResultItem | PlaceInLog;
  idx: number;
  setValue: UseFormSetValue<LogEditFormData>;
  trigger: UseFormTrigger<LogEditFormData>;
}

const PlaceEditFormItem = ({ place, idx, control, setValue, trigger }: PlaceEditFormItemProps) => {
  const isOpen = useDrawerStore((state) => state.isOpen); // 열림 여부
  const openModal = useDrawerStore((state) => state.openDrawer); // 열림 + 타켓 지정
  const closeModal = useDrawerStore((state) => state.closeDrawer);
  const targetPlace = useDrawerStore((state) => state.targetPlace);
  const targetPlaceId = targetPlace && 'id' in targetPlace ? targetPlace?.id : targetPlace?.placeId;

  const placeId = 'id' in place ? place.id : place.placeId;
  const placeName = 'place_name' in place ? place.place_name : place.name;
  const category = 'category_group_name' in place ? place.category_group_name : place.category;
  const address =
    'road_address_name' in place ? place.road_address_name : place.address?.roadAddress;
  const roadAddress =
    'road_address_name' in place ? place.road_address_name : place.address?.roadAddress;
  const placeDescription = 'description' in place && place.description;

  return (
    <div className="py-[5px]">
      {/* 장소 설명 */}
      <section className="flex flex-col gap-2">
        <div className="text-text-lg font-bold">
          <div className="flex justify-between">
            <p>{String(idx + 1).padStart(2, '0')}</p>
            {isOpen && targetPlaceId === placeId ? (
              <CircleCheck className="fill-black stroke-white" onClick={closeModal} />
            ) : (
              <Circle className="stroke-neutral-200" onClick={() => openModal(place)} />
            )}
          </div>
          <p className="flex items-center">{placeName}</p>
        </div>

        <div className="flex flex-col text-primary-400">
          <div className="flex gap-2 items-center text-text-sm">
            <Clock size={16} />
            <p className="after:ml-1.5">{category}</p>
          </div>
          <div className="flex gap-2 items-center text-text-sm">
            <MapPin size={16} />
            <p className="after:ml-1.5 after:content-['|'] after:text-primary-100">
              {address.split(' ')[0]}
            </p>
            <p>{roadAddress}</p>
          </div>
        </div>
      </section>

      {/* 사진 첨부 */}
      <PlaceEditImagesInput control={control} setValue={setValue} idx={idx} trigger={trigger} />

      {/* 내용 */}
      <Controller
        name={`places.${idx}.placeDescription`}
        control={control}
        defaultValue={placeDescription || ''}
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

export default PlaceEditFormItem;
