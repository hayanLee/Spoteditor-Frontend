import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { REGISTER_DETAILS, REGISTER_SEARCH } from '@/constants/pathname';
import { useKakaoMap } from '@/contexts/KakaoMap.context';
import RegisterSearchBar from '@/features/registerpage/RegisterSearchBar';
import SearchResultDrawer from '@/features/registerpage/SearchResultDrawer';
import SelectedPlacePreview from '@/features/registerpage/SelectedPlacePreview';
import { cn } from '@/lib/utils';
import { useRegisterStore } from '@/store/registerStore';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MapPage = () => {
  const navi = useNavigate();
  const { mapContainerRef, placeRef, currentLocationRef, isLoading, initMap, map } = useKakaoMap();

  const selectedPlaces = useRegisterStore((state) => state.selectedPlaces);
  const removeSelectedPlace = useRegisterStore((state) => state.removeSelectedPlace);

  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [markers, setMarkers] = useState<kakao.maps.Marker[] | null>([]); // 검색 결과 마커들
  const [places, setPlaces] = useState<kakao.maps.services.PlacesSearchResult>([]); // 검색 결과 장소들

  useEffect(() => {
    initMap();
  }, []);

  // 검색어 입력
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputRef.current || !placeRef.current || !map) return;

    removeMarker(); // 기존 검색어 마크 지우기

    const query = inputRef.current.value;
    placeRef.current.keywordSearch(query, searchByKeyword, {
      location: new window.kakao.maps.LatLng(
        currentLocationRef.current?.lat,
        currentLocationRef.current?.lon
      ),
      radius: 2000,
    });
  };

  // pagination 가능
  const searchByKeyword = (result: kakao.maps.services.PlacesSearchResult, status: string) => {
    if (status === window.kakao.maps.services.Status.OK) {
      setPlaces(result);
      displayPlaces(result);
      setIsOpen(true);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 없습니다.');
      setPlaces([]);
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert('검색 중 오류가 발생했습니다.');
      setPlaces([]);
    }
  };

  const displayPlaces = (result: kakao.maps.services.PlacesSearchResult) => {
    const bounds = new window.kakao.maps.LatLngBounds(); // 경계 객체

    const newMarkers = result.map((place) => {
      const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
      bounds.extend(placePosition);
      return addMarker(placePosition);
    });

    map?.setBounds(bounds);
    setMarkers(newMarkers);
  };

  const addMarker = (position: kakao.maps.LatLng) => {
    const marker = new window.kakao.maps.Marker({ position });
    marker.setMap(map);

    // 클릭 시 중앙 정렬
    window.kakao.maps.event.addListener(marker, 'click', () => {
      map?.setCenter(position);
    });

    return marker;
  };

  const removeMarker = () => {
    markers?.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  // 장소 클릭 시, 지도 중심을 클릭한 장소로 이동
  const handlePlaceClick = (place: kakao.maps.services.PlacesSearchResultItem) => {
    if (!map || !placeRef.current) return;
    const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
    map.setCenter(placePosition);
  };

  return (
    <div
      className={cn(
        'h-full grid',
        selectedPlaces.length > 0 ? 'grid-rows-[auto_auto_1fr_auto]' : 'grid-rows-[auto_1fr_auto]'
      )}
    >
      <RegisterSearchBar ref={inputRef} onSubmit={handleSubmit} to={REGISTER_SEARCH} />
      {selectedPlaces.length > 0 && <SelectedPlacePreview onRemove={removeSelectedPlace} />}
      {/* 지도 담을 영역 */}
      <div ref={mapContainerRef} className="w-full h-full relative">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Button
              variant={'outline'}
              fullRounded
              className={cn(
                'absolute bottom-[15px] left-1/2 transform -translate-x-1/2 z-20 !text-text-sm invisible',
                places.length && 'visible'
              )}
              onClick={() => setIsOpen(true)}
            >
              목록 보기
            </Button>
          </>
        )}
      </div>
      {/* 장소 리스트 */}
      {!!places.length && (
        <SearchResultDrawer
          places={places}
          onPlaceClick={handlePlaceClick}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      <div className="pt-2 pb-6 px-4">
        <Button
          className="w-full"
          size={'xl'}
          onClick={() => navi(REGISTER_DETAILS)}
          disabled={!selectedPlaces.length}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default MapPage;
