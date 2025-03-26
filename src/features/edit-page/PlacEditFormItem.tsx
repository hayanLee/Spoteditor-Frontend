import { Textarea } from '@/components/ui/textarea';
import { LogEditFormData } from '@/pages/edit-page';
import { PlaceInLog } from '@/services/apis/types/logAPI.type';
import useDrawerStore from '@/store/drawerStore';
import { Circle, CircleCheck, Clock, MapPin } from 'lucide-react';
import { Controller, Path, UseFormReturn } from 'react-hook-form';
import PlaceEditImagesInput from './PlaceEditImagesInput';

interface PlaceEditFormItemProps {
  place: PlaceInLog;
  idx: number;
  form: UseFormReturn<LogEditFormData>;
}

const PlaceEditFormItem = ({ place, idx, form }: PlaceEditFormItemProps) => {
  const isOpen = useDrawerStore((state) => state.isOpen); // 열림 여부
  const openLogDrawer = useDrawerStore((state) => state.openLogDrawer); // 열림 + 타켓 지정
  const closeDrawer = useDrawerStore((state) => state.closeDrawer);
  const targetPlace = useDrawerStore((state) => state.editTargetPlace);
  const {
    name,
    address: { address, roadAddress },
    category,
    description,
    placeId,
  } = place;
  const isTargetPlace = targetPlace?.placeId === placeId;

  return (
    <div className="py-[5px]">
      {/* 장소 정보 */}
      <section className="flex flex-col gap-2">
        <div className="text-text-lg font-bold">
          <div className="flex justify-between">
            <p>{String(idx + 1).padStart(2, '0')}</p>
            {isOpen && isTargetPlace ? (
              <CircleCheck className="fill-black stroke-white" onClick={closeDrawer} />
            ) : (
              <Circle className="stroke-neutral-200" onClick={() => openLogDrawer(place)} />
            )}
          </div>
          <p className="flex items-center">{name}</p>
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

      {/* 사진 */}
      <PlaceEditImagesInput form={form} placeName={name} />

      {/* 내용 */}
      <Controller
        name={`places.${name}.placeDescription` as Path<LogEditFormData>}
        control={form.control}
        defaultValue={description || ''}
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
