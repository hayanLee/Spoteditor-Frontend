import ModifyDrawer from '@/components/Drawer/ModifyDrawer';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import LogCoverImgInput from '@/features/register-page/LogCoverImgInput';
import LogWriteBar from '@/features/register-page/LogWriteBar';
import PlaceFormItem from '@/features/register-page/PlaceFormItem';
import useCreateLogMutation from '@/hooks/mutations/log/useCreateLogMutation';
import useFormattedLog from '@/hooks/useFormattedLog';
import { cn } from '@/lib/utils';
import { PresignUrlResponse } from '@/services/apis/types/registerAPI.type';
import { LogWriteFormSchema } from '@/services/schemas/logSchema';
import { useRegisterStore } from '@/store/registerStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleX } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
export interface LogWriteFormData {
  title: string;
  description: string;
  coverImgSrc: PresignUrlResponse | null;
  places: { photos: PresignUrlResponse[]; placeDescription?: string }[];
  status: 'public' | 'private';
}

const LogWritePage = () => {
  const format = useFormattedLog();
  const form = useForm<LogWriteFormData>({
    resolver: zodResolver(LogWriteFormSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      description: '',
      coverImgSrc: null,
      places: [],
      status: 'public',
    },
  });
  const { mutateAsync: logCreateMutation } = useCreateLogMutation();

  const selectedPlaces = useRegisterStore((state) => state.selectedPlaces);
  const resetSelectedPlaces = useRegisterStore((state) => state.clearAllSelections);
  const [sido = '', , bname = ''] = selectedPlaces[0]?.address_name?.split(' ') || [];

  const onSubmit = async (values: LogWriteFormData) => {
    const formattedLog = format(values);
    // console.log(formattedLog);
    const { status } = await logCreateMutation(formattedLog);
    if (status === 201) resetSelectedPlaces();
  };

  return (
    <div className="h-full flex flex-col">
      <LogWriteBar sido={sido} bname={bname} />

      <FormProvider {...form}>
        <form
          className="flex flex-col items-center grow min-h-0 overflow-y-auto scrollbar-hide"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex w-full px-4">
                <Input
                  {...field}
                  placeholder="제목을 입력해주세요. (최대 30자) *"
                  className={cn(
                    "placeholder:text-primary-300 placeholder:after:content-['*'] font-medium px-0 border-b border-gray-100",
                    form.formState.errors.title && 'placeholder:text-error-500'
                  )}
                />
                {field.value && (
                  <CircleX
                    className="h-full stroke-white fill-light-100  stroke-1 top-2  cursor-pointer"
                    size={24}
                    onClick={() => form.setValue(field.name, '')}
                  />
                )}
              </FormItem>
            )}
          />
          {/* 커버 이미지 */}
          <LogCoverImgInput />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem className="px-4 w-full">
                <FormControl>
                  <Textarea
                    {...field}
                    variant={'ghost'}
                    size={'lg'}
                    placeholder="내용을 입력해주세요. (최대 500자)"
                    className={cn(
                      form.formState.errors.description && 'placeholder:text-error-500'
                    )}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* 장소 */}
          <div className="flex flex-col w-full mt-3 px-4">
            {selectedPlaces.map((place, idx) => (
              <PlaceFormItem place={place} key={place.id} idx={idx} />
            ))}

            <div className="text-error-500 px-4 py-3 bg-error-50 text-center rounded-[10px] my-2.5 text-text-sm">
              부적절한 이미지 적발시 로그가 삭제될 수 있습니다.
            </div>
          </div>
        </form>
        {/* <Button onClick={() => console.log(form.formState.errors, form.watch())}>확인용</Button> */}

        {/* 버튼 */}
        <div className="pt-2 pb-3 px-4 ">
          <ModifyDrawer />
          {/* <ConfirmDialog
            title="로그를 등록하시겠어요?"
            showCheckbox={true}
            checkboxLabel="비공개"
            onConfirm={form.handleSubmit(onSubmit)}
            disabled={!!Object.keys(form.formState.errors).length}
          /> */}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant={Object.keys(form.formState.errors).length ? 'muted' : 'default'}
                size="xl"
                className="w-full"
                disabled={!!Object.keys(form.formState.errors).length}
              >
                제출
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[400px] min-w-[300px]">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-text-2xl">
                  로그를 등록하시겠어요?
                </AlertDialogTitle>
                <AlertDialogDescription className="hidden">
                  alertDialog 설명란
                </AlertDialogDescription>
                <FormField
                  name="status"
                  control={form.control}
                  render={({ field }) => (
                    <Label
                      htmlFor="secret"
                      className="flex items-center gap-3 h-fit cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id="secret"
                        className="w-5 h-5 border rounded-sm bg-white cursor-pointer accent-black"
                        checked={field.value === 'private'}
                        onChange={(e) => field.onChange(e.target.checked ? 'private' : 'public')}
                      />
                      <span className="text-black text-text-sm">비공개</span>
                    </Label>
                  )}
                />
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>취소</AlertDialogCancel>
                <AlertDialogAction onClick={form.handleSubmit(onSubmit)}>확인</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </FormProvider>
    </div>
  );
};

export default LogWritePage;
