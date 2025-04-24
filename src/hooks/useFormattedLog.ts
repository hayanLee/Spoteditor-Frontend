import { LogWriteFormData } from '@/pages/register-page/LogWritePage';
import { useRegisterStore } from '@/store/registerStore';
import { formatAddress } from '../utils/formatLogForm';

const useFormattedLog = () => {
  const selectedPlaces = useRegisterStore((state) => state.selectedPlaces);
  const selectedWhom = useRegisterStore((state) => state.experience.selectedWhom);
  const selectedMoods = useRegisterStore((state) => state.experience.selectedMoods);

  const format = (formData: LogWriteFormData) => {
    const { title, description, coverImgSrc, places, status } = formData;
    return {
      name: title,
      description,
      originalFile: coverImgSrc?.originalFile || '',
      uuid: coverImgSrc?.uuid || '',
      status,
      tags: [
        ...selectedWhom.map((whom) => ({ name: whom, category: 'WITH_WHOM' as const })),
        ...selectedMoods.map((mood) => ({ name: mood, category: 'MOOD' as const })),
      ],
      places: places.map((place, idx) => {
        return {
          name: selectedPlaces[idx].place_name,
          description: place.placeDescription || '',
          address: formatAddress(selectedPlaces[idx]),
          category: 'TOUR' as const,
          originalFiles: place.photos.map((item) => item.originalFile),
          uuids: place.photos.map((item) => item.uuid),
        };
      }),
    };
  };

  return format;
};

export default useFormattedLog;
