import { CameraIcon } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useImages from '@/hooks/useImages';
import { LogEditFormData } from '@/pages/edit-page/EditPage';
import { isEqual } from 'lodash';
import { CircleX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Controller, Path, useController, UseFormReturn } from 'react-hook-form';

interface PlaceEditImagesInputProps {
  form: UseFormReturn<LogEditFormData>;
  placeName: string;
}

const PlaceEditImagesInput = ({ form, placeName }: PlaceEditImagesInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { field } = useController({ name: `places.${placeName}.photos` }); // 기존 이미지들 (Image)
  const [photos, setPhotos] = useState(field.value);

  useEffect(() => {
    // field.value가 변경될 때마다 photos 상태를 업데이트
    if (field.value && !isEqual(field.value, photos)) {
      setPhotos(field.value);
    }
  }, [field.value, photos]);

  const {
    imagePreviews,
    handleFileChange,
    handleRemoveImage,
    isUploading,
    presignedUrlObjs,
    removedImageIds, // 삭제된 기존 이미지 ID 리스트
  } = useImages(photos);

  useEffect(() => {
    form.setValue(`places.${placeName}.newPhotos`, presignedUrlObjs, { shouldValidate: true });
  }, [presignedUrlObjs, form, placeName]);

  const handleRemove = (previewIdx: number, isNew: boolean) => handleRemoveImage(previewIdx, isNew);

  useEffect(() => {
    const currentValue = form.getValues(`places.${placeName}.deleteImageIds`);
    if (!isEqual(currentValue, removedImageIds)) {
      form.setValue(`places.${placeName}.deleteImageIds`, removedImageIds, { shouldDirty: true });
    }
  }, [removedImageIds, form, placeName]);

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
        name={`places.${placeName}.photos` as Path<LogEditFormData>}
        control={form.control}
        render={() => (
          <div className="flex overflow-x-auto mb-2.5">
            {/* 기존 이미지 */}
            {imagePreviews.map((previewURL, previewIdx) => (
              <div className="relative m-1 shrink-0" key={previewIdx}>
                <Input
                  type="image"
                  src={previewURL.previewUrl}
                  alt="장소 이미지"
                  className="h-[300px] object-cover p-0"
                />
                <CircleX
                  className="stroke-primary-300 fill-slate-100 stroke-1 absolute top-2 right-2 cursor-pointer hover:fill-slate-50/50"
                  onClick={() => handleRemove(previewIdx, previewURL.isNew)}
                />
              </div>
            ))}

            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
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
