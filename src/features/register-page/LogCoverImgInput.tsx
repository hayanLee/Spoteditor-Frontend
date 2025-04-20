import { CameraIcon } from '@/components/Icons';
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useImageUpload from '@/hooks/useImageUpload';
import { cn } from '@/lib/utils';
import { LogEditFormData } from '@/pages/edit-page';
import { LogWriteFormData } from '@/pages/register-page/LogWritePage';
import { CircleX } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Controller, useController, useFormContext } from 'react-hook-form';
interface LogCoverImgInputprops {
  isEditMode?: boolean;
}
const LogCoverImgInput = ({ isEditMode }: LogCoverImgInputprops) => {
  const { control, setValue, formState } = useFormContext<LogWriteFormData | LogEditFormData>();
  const { field } = useController({ name: 'coverImgSrc', control });
  const storedFile =
    isEditMode && field.value && 'storedFile' in field.value ? field.value.storedFile : '';

  const { presignedUrlObj, imagePreview, handleFileChange, handleClearImage, isUploading } =
    useImageUpload(storedFile);
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (presignedUrlObj) setValue('coverImgSrc', presignedUrlObj, { shouldValidate: true });
  }, [presignedUrlObj, setValue]);

  return (
    <Controller
      name="coverImgSrc"
      control={control}
      render={({ field }) => {
        return (
          <>
            {/* 커버 이미지 */}
            <div className={cn(imagePreview && 'relative mb-3 w-full')}>
              {isUploading ? (
                <Loading className="h-[300px]" />
              ) : (
                imagePreview && (
                  <>
                    <img
                      src={imagePreview as string}
                      alt="업로드된 커버 이미지"
                      className="w-full aspect-[2/1] object-cover"
                    />
                    <CircleX
                      className="stroke-light-300 stroke-1 fill-light-100 absolute top-4 right-4 cursor-pointer hover:brightness-105 "
                      onClick={() => {
                        handleClearImage();
                        field.onChange(null);
                      }}
                      size={24}
                    />
                  </>
                )
              )}
            </div>

            {/* 커버 이미지 업로드 버튼 */}
            <div className="px-4 w-full">
              <Input
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.avif"
                onChange={async (e) => {
                  await handleFileChange(e);
                  field.onChange(presignedUrlObj);
                }}
                ref={fileInputRef}
                className="hidden"
              />
              {!imagePreview && (
                <Button
                  variant="outline"
                  className={cn(
                    'border w-full border-dashed gap-[5px] text-primary-600 px-2.5 py-3 my-3',
                    formState.errors.coverImgSrc && 'bg-error-100'
                  )}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <CameraIcon className="stroke-primary-600" />
                  <span className="text-text-sm font-bold">
                    커버이미지<span className="text-error-600 m-1">*</span>
                  </span>
                </Button>
              )}
            </div>
          </>
        );
      }}
    />
  );
};

export default LogCoverImgInput;
