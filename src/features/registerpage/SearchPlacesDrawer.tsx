import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { useRegisterStore } from '@/store/registerStore';
import { Dispatch, SetStateAction } from 'react';

interface PlaceListDrawerProps {
  places: kakao.maps.services.PlacesSearchResult;
  onPlaceClick: (place: kakao.maps.services.PlacesSearchResultItem) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const PlaceListDrawer = ({ places, onPlaceClick, isOpen, setIsOpen }: PlaceListDrawerProps) => {
  const addSelectedPlace = useRegisterStore((state) => state.addSelectedPlace);
  return (
    <Drawer modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="max-h-[40vh]">
        <DrawerTitle className="hidden">검색 장소 리스트</DrawerTitle>
        <div className="overflow-y-auto scrollbar-hide">
          <ul className="cursor-pointer">
            {places.map((place, index) => (
              <li
                key={index}
                className="py-2.5 px-4  flex justify-between items-center hover:bg-primary-50"
                onClick={() => onPlaceClick(place)}
              >
                <div>
                  <div className="flex items-center gap-[3px] font-medium mb-[3px]">
                    <h4 className="text-text-sm">{place.place_name}</h4>
                    <span className="text-text-xs text-primary-400">{place.category_name}</span>
                  </div>
                  <div className="flex font-medium text-text-xs items-center gap-1.5">
                    <h5 className=" text-primary-300">도로명</h5>
                    <p className="text-primary-400">{place.road_address_name}</p>
                  </div>
                  <div className="flex font-medium text-text-xs items-center gap-1.5">
                    <h5 className=" text-primary-300">지번</h5>
                    <p className="text-primary-400">{place.address_name}</p>
                  </div>
                </div>
                <Button
                  variant={'outline'}
                  size={'s'}
                  fullRounded
                  onClick={() => addSelectedPlace(place)}
                >
                  선택
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PlaceListDrawer;
