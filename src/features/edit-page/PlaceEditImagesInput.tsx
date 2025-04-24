import useImagesUpload from '@/hooks/useImagesUpload';
import { LogEditFormData } from '@/pages/edit-page';
import { Controller, Path, useController } from 'react-hook-form';

interface PlaceEditImagesInputProps {
  placeName: string;
}

const PlaceEditImagesInput = ({ placeName }: PlaceEditImagesInputProps) => {
  const { field } = useController({ name: `places.${placeName}.photos` }); // 기존 이미지들 (Image)
  const { imagePreviews } = useImagesUpload(field.value);

  return (
    <>
      <Controller
        name={`places.${placeName}.photos` as Path<LogEditFormData>}
        render={() => (
          <div className="flex overflow-x-auto scrollbar-hide mb-2.5 mt-[15px]">
            {imagePreviews.map((previewURL, previewIdx) => (
              <div className="relative m-1 shrink-0" key={previewIdx}>
                <img
                  src={previewURL.previewUrl}
                  alt="장소 이미지"
                  className="h-[300px] object-cover p-0"
                />
              </div>
            ))}
          </div>
        )}
      />
    </>
  );
};

export default PlaceEditImagesInput;
