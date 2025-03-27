import { CameraIcon } from '@/components/Icons';
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useImagePreview from '@/hooks/useImagePreview';
import { LogWriteFormData } from '@/pages/register-page/LogWritePage';
import { CircleX } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Control, Controller, UseFormSetValue, UseFormTrigger } from 'react-hook-form';

interface CoverImageInputProps {
  name: 'coverImgSrc';
  control: Control<LogWriteFormData>;
  setValue: UseFormSetValue<LogWriteFormData>;
  trigger: UseFormTrigger<LogWriteFormData>;
}

const LogCoverImgInput = ({ name, control, setValue, trigger }: CoverImageInputProps) => {
  const { presignedUrlObj, imagePreview, handleFileChange, handleClearImage, isUploading } =
    useImagePreview();

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (presignedUrlObj) setValue(name, presignedUrlObj);
    trigger(name);
  }, [name, presignedUrlObj, setValue, trigger]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <>
            {/* 커버 이미지 */}
            <div className="relative mb-3">
              {isUploading ? (
                <Loading className="h-[300px]" />
              ) : (
                imagePreview && (
                  <img
                    src={imagePreview as string}
                    alt="커버 이미지"
                    className="w-full aspect-[2/1] object-cover"
                  />
                )
              )}

              {!isUploading && imagePreview && (
                <CircleX
                  className="stroke-primary-100 absolute top-4 right-4 cursor-pointer hover:fill-slate-50/50"
                  onClick={() => {
                    handleClearImage();
                    field.onChange(null);
                  }}
                />
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
                  className="border w-full border-dashed gap-[5px] text-primary-600 px-2.5 py-3 my-3"
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
