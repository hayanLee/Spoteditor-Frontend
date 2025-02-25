import { Button } from '@/components/ui/button';
import { KakaoPlace } from '@/pages/register/types/place.type';
import { useRegisterStore } from '@/store/registerStore';

const PlaceListItem = ({ place }: { place: KakaoPlace }) => {
  const addSelectedPlace = useRegisterStore((state) => state.addSelectedPlace);

  const { place_name, category_group_name, address_name } = place;
  const [city, district] = address_name.split(' ');

  return (
    <div className="flex justify-between py-1 items-center">
      <div className="text-text-sm font-medium">
        <h5>{place_name}</h5>
        <p className="text-primary-300">{`${category_group_name} · ${city} · ${district}`}</p>
      </div>
      <Button variant={'ghost'} size={'s'} fullRounded onClick={() => addSelectedPlace(place)}>
        선택
      </Button>
    </div>
  );
};

export default PlaceListItem;
