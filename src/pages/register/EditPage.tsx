import { ConfirmDialog } from '@/components/Dialog/ConfirmDialog';
import ModifyDrawer from '@/components/Drawer/ModifyDrawer';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import LogCoverEditInput from '@/features/editPage/LogCoverEditInput';
import LogEditBar from '@/features/editPage/LogEditBar';
import PlaceEditFormItem from '@/features/editPage/PlacEditFormItem';
import useLog from '@/hooks/queries/log/useLog';
import { cn } from '@/lib/utils';
import api from '@/services/apis/api';
import { Image, PresignUrlResponse } from '@/services/apis/types/registerAPI.type';
import { LogEditFormSchema } from '@/services/schemas/logSchema';
import { useEditLogStore } from '@/store/editLogStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleX } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export interface LogEditFormData {
  title: string;
  description: string;
  coverImgSrc: PresignUrlResponse | Image | null;
  places: {
    photos: (PresignUrlResponse | Image)[]; // 기존 + 새이미지
    placeDescription?: string;
  }[];
}

const EditPage = () => {
  const navi = useNavigate();
  const { placeLogId } = useParams();
  const { data: logData } = useLog(Number(placeLogId));
  const selectedPlaces = useEditLogStore((state) => state.selectedPlaces);
  const setInitialPlaces = useEditLogStore((state) => state.setInitialPlaces);

  const form = useForm<LogEditFormData>({
    resolver: zodResolver(LogEditFormSchema),
    mode: 'onBlur',
    defaultValues: {
      title: logData?.name || '',
      description: logData?.description || '',
      coverImgSrc: logData?.image || null,
      places:
        logData?.places.map((item) => ({
          photos: item.images,
          placeDescription: item.description || '',
        })) || [],
    },
  });

  useEffect(() => {
    if (logData?.places) setInitialPlaces(logData?.places);
  }, [logData?.places, setInitialPlaces]);

  const onSubmit = async (values: LogEditFormData) => {
    const { dirtyFields } = form.formState;
    try {
      const NumericPlaceId = Number(placeLogId);
      if (dirtyFields.title) {
        const result = await api.log.updateLog(NumericPlaceId, { name: values.title });
        if (result) navi(`/log/${placeLogId}`, { replace: true });
        console.log('제목 변경');
      }

      if (dirtyFields.description) {
        const result = await api.log.updateLog(NumericPlaceId, {
          description: values.description,
        });
        if (result) navi(`/log/${placeLogId}`, { replace: true });
        console.log('설명 변경');
      }

      if (dirtyFields.coverImgSrc) {
        const newCover = values.coverImgSrc as PresignUrlResponse;
        const result = await api.log.updateLog(NumericPlaceId, {
          originalFile: newCover?.originalFile,
          uuid: newCover?.uuid,
        });
        if (result) navi(`/log/${placeLogId}`, { replace: true });
        console.log('커버 이미지 변경');
      }

      // if (dirtyFields.places) {
      //   const result = await api.log.updateLog(NumericPlaceId, { places: values.places });
      //   console.log('장소 변경:', result);
      // }

      console.log('수정 완료!');
    } catch (error) {
      console.error('수정 중 오류 발생:', error);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}
      <LogEditBar logTitle={form.watch('title')} />

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
          <LogCoverEditInput
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
              <PlaceEditFormItem
                control={form.control}
                place={place}
                key={place.placeId}
                idx={idx}
                setValue={form.setValue}
                trigger={form.trigger}
              />
            ))}
          </div>
        </form>
      </Form>

      <Button
        onClick={() => {
          console.log(form.watch());
          console.log(form.formState.dirtyFields);
          console.log(form.formState.errors);
        }}
      >
        체크
      </Button>

      {/* 버튼 */}
      <div className="pt-2 pb-3 px-4 ">
        <ModifyDrawer />
        <ConfirmDialog
          title="로그를 등록하시겠어요?"
          showCheckbox={true}
          checkboxLabel="비공개"
          onConfirm={form.handleSubmit(onSubmit)}
          disabled={!!Object.keys(form.formState.errors).length || !form.formState.isDirty}
        />
      </div>
    </div>
  );
};

export default EditPage;
