import { CameraIcon } from '@/components/Icons';
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useImagePreview from '@/hooks/useImagePreview';
import { LogEditFormData } from '@/pages/edit-page';
import { CircleX } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Control, Controller, useController, UseFormReturn } from 'react-hook-form';

interface CoverImageInputProps {
  name: 'coverImgSrc';
  control: Control<LogEditFormData>;
  form: UseFormReturn<LogEditFormData>;
}

const LogCoverEditInput = ({ name, control, form }: CoverImageInputProps) => {
  const { field } = useController({ name, control });
  const storedFile = field.value && 'storedFile' in field.value ? field.value.storedFile : ''; // Image일때만 있음
  const { presignedUrlObj, imagePreview, handleFileChange, handleClearImage, isUploading } =
    useImagePreview(storedFile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* 이미지 변경되면 변경된 필드에 저장 */
  useEffect(() => {
    if (presignedUrlObj !== null) {
      field.onChange(presignedUrlObj);
      form.setValue(name, presignedUrlObj);
    }
  }, [presignedUrlObj]);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <>
            {/* 커버 이미지 */}
            <div className="relative mb-3 w-full max-h-[300px]">
              {isUploading ? (
                <Loading className="h-[300px]" />
              ) : (
                imagePreview && (
                  <img
                    src={imagePreview as string}
                    alt="커버 이미지"
                    className="w-full h-full object-cover"
                  />
                )
              )}

              {!isUploading && imagePreview && (
                <CircleX
                  className="stroke-primary-100 absolute top-4 right-4 cursor-pointer hover:fill-slate-50/50"
                  onClick={() => {
                    handleClearImage();
                    field.onChange({});
                    form.trigger(name);
                  }}
                />
              )}
            </div>

            {/* 커버 이미지 업로드 버튼 */}
            <div className="px-4 w-full">
              <Input
                type="file"
                accept="image/*"
                onChange={async (e) => await handleFileChange(e)}
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

export default LogCoverEditInput;
