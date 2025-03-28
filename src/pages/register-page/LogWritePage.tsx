import { ConfirmDialog } from '@/components/Dialog/ConfirmDialog';
import ModifyDrawer from '@/components/Drawer/ModifyDrawer';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import LogCoverImgInput from '@/features/register-page/LogCoverImgInput';
import LogWriteBar from '@/features/register-page/LogWriteBar';
import PlaceFormItem from '@/features/register-page/PlaceFormItem';
import useCreateLogMutation from '@/hooks/mutations/log/useCreateLogMutation';
import { cn } from '@/lib/utils';
import { Log, PresignUrlResponse } from '@/services/apis/types/registerAPI.type';
import { LogWriteFormSchema } from '@/services/schemas/logSchema';
import { useRegisterStore } from '@/store/registerStore';
import { formatAddress } from '@/utils/formatLogForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleX } from 'lucide-react';
import { useForm } from 'react-hook-form';

export interface LogWriteFormData {
  title: string;
  description: string;
  coverImgSrc: PresignUrlResponse | null;
  places: { photos: PresignUrlResponse[]; placeDescription?: string }[];
}

const LogWritePage = () => {
  const form = useForm<LogWriteFormData>({
    resolver: zodResolver(LogWriteFormSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      description: '',
      coverImgSrc: null,
      places: [],
    },
  });
  const { mutateAsync: logCreateMuatation } = useCreateLogMutation();

  /* states */
  const selectedPlaces = useRegisterStore((state) => state.selectedPlaces);
  const resetSelectedPlaces = useRegisterStore((state) => state.clearAllSelections);
  const selectedWhom = useRegisterStore((state) => state.experience.selectedWhom);
  const selectedMoods = useRegisterStore((state) => state.experience.selectedMoods);

  const [sido = '', , bname = ''] = selectedPlaces[0]?.address_name?.split(' ') || [];

  /* handlers */
  const formatLog = ({ title, description, coverImgSrc, places }: LogWriteFormData): Log => {
    return {
      name: title,
      description: description,
      originalFile: coverImgSrc?.originalFile || '',
      uuid: coverImgSrc?.uuid || '',
      status: 'public',
      tags: [
        ...selectedWhom.map((whom) => ({ name: whom, category: 'WITH_WHOM' as const })),
        ...selectedMoods.map((mood) => ({ name: mood, category: 'MOOD' as const })),
      ],
      places: places.map((place, idx) => {
        return {
          name: selectedPlaces[idx].place_name,
          description: place.placeDescription || '',
          address: formatAddress(selectedPlaces[idx]),
          category: 'TOUR',
          originalFiles: place?.photos.map((item) => item.originalFile),
          uuids: place?.photos.map((item) => item.uuid),
        };
      }),
    };
  };

  const onSubmit = async (values: LogWriteFormData) => {
    const formatedLog = formatLog(values);
    if (!formatedLog) return;
    const { status } = await logCreateMuatation(formatedLog);
    if (status === 201) resetSelectedPlaces();
  };

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}
      <LogWriteBar sido={sido} bname={bname} />

      <Form {...form}>
        <form
          className="flex flex-col items-center grow min-h-0 overflow-y-auto scrollbar-hide "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col items-center w-full border-b px-4 relative">
                <Input
                  {...field}
                  placeholder="제목을 입력해주세요. (최대 30자) *"
                  className={cn(
                    "placeholder:text-primary-300 placeholder:after:content-['*'] font-medium px-0",
                    form.formState.errors.title && 'placeholder:text-error-500'
                  )}
                />
                <FormMessage className="w-full" />
                {field.value && (
                  <CircleX
                    className="stroke-white fill-primary-100 absolute stroke-1 top-2 right-4  cursor-pointer hover:fill-slate-50/50"
                    size={24}
                    onClick={() => form.setValue(field.name, '')}
                  />
                )}
              </FormItem>
            )}
          />

          {/* 커버 이미지 */}
          <LogCoverImgInput
            name="coverImgSrc"
            control={form.control}
            setValue={form.setValue}
            trigger={form.trigger}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem className="px-4 w-full">
                <FormControl>
                  <Textarea
                    {...field}
                    className="bg-primary-50 min-h-[85px] px-[18px] py-2.5 text-primary-300 text-text-sm  placeholder:text-primary-300 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="내용을 입력해주세요. (최대 500자)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 장소 */}
          <div className="flex flex-col w-full mt-3 px-4">
            {selectedPlaces.map((place, idx) => (
              <PlaceFormItem
                control={form.control}
                place={place}
                key={place.id}
                idx={idx}
                setValue={form.setValue}
                trigger={form.trigger}
              />
            ))}
          </div>
        </form>
      </Form>

      {/* <Button onClick={() => console.log(form.formState.errors)}>확인</Button> */}

      {/* 버튼 */}
      <div className="pt-2 pb-3 px-4 ">
        <ModifyDrawer />
        <ConfirmDialog
          title="로그를 등록하시겠어요?"
          showCheckbox={true}
          checkboxLabel="비공개"
          onConfirm={form.handleSubmit(onSubmit)}
          disabled={!!Object.keys(form.formState.errors).length}
        />
      </div>
    </div>
  );
};

export default LogWritePage;
