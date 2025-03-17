import { CameraIcon } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useImages from '@/hooks/useImages';
import { LogEditFormData } from '@/pages/register/EditPage';
import { Image } from '@/services/apis/types/registerAPI.type';
import { CircleX } from 'lucide-react';
import { useEffect, useRef } from 'react';
import {
  Control,
  Controller,
  useController,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';
interface PlaceEditImagesInputProps {
  control: Control<LogEditFormData>;
  defaultplaceImgs?: Image[];
  setValue: UseFormSetValue<LogEditFormData>;
  idx: number;
  trigger: UseFormTrigger<LogEditFormData>;
}

const PlaceEditImagesInput = ({ control, setValue, idx, trigger }: PlaceEditImagesInputProps) => {
  const { field } = useController({ name: `places.${idx}.photos`, control });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { imagePreviews, handleFileChange, handleRemoveImage, isUploading, presignedUrlObjs } =
    useImages(field.value as Image[]);

  useEffect(() => {
    if (presignedUrlObjs) {
      setValue(`places.${idx}.photos`, presignedUrlObjs);
      trigger(`places.${idx}.photos`);
    }
  }, [presignedUrlObjs, setValue, idx, trigger]);

  return (
    <>
      <Button
        variant="outline"
        className="border w-full border-dashed gap-[5px] text-primary-600 px-2.5 py-3 mt-[15px] mb-2.5"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
      >
        <CameraIcon className="stroke-primary-600" />
        <span className="text-text-sm font-bold">
          사진첨부<span className="text-error-600"> * </span>(최대 3장)
        </span>
      </Button>

      <Controller
        name={`places.${idx}.photos`}
        control={control}
        render={({ field }) => (
          <div className="flex overflow-x-auto mb-2.5">
            {/* 기존 이미지 */}
            {imagePreviews.map((previewURL, previewIdx) => (
              <div className="relative m-1 shrink-0" key={previewIdx}>
                <Input
                  type="image"
                  src={previewURL}
                  alt="장소 이미지"
                  className="h-[300px] object-cover p-0 "
                />
                <CircleX
                  className="stroke-primary-300 fill-slate-100 stroke-1 absolute top-2 right-2  cursor-pointer hover:fill-slate-50/50"
                  onClick={() => {
                    handleRemoveImage(previewIdx);
                  }}
                />
              </div>
            ))}

            <Input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                await handleFileChange(e);
                field.onChange(presignedUrlObjs);
              }}
              ref={fileInputRef}
              className="hidden"
              multiple
            />
          </div>
        )}
      />
    </>
  );
};

export default PlaceEditImagesInput;
