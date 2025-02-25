import { Button } from '@/components/ui/button';
import { REGISTER_DETAILS } from '@/constants/pathname';
import RegisterSearchBar from '@/features/registerpage/RegisterSearchBar';
import { cn } from '@/lib/utils';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const kakao = (window as any).kakao;
const options = {
  center: new kakao.maps.LatLng(33.450701, 126.570667),
};

const MapPage = () => {
  const mapContainerRef = useRef(null);
  const inputRef = useRef(null);
  const [map, setMap] = useState(null);
  const [ps, setPlaceInstance] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    kakao.maps.load(() => {
      if (!mapContainerRef.current) return;
      const mapInstance = new kakao.maps.Map(mapContainerRef.current, options);
      setMap(mapInstance);
      const placeInstance = new kakao.maps.services.Places();
      setPlaceInstance(placeInstance);
    });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current || !ps || !map) return;
    removeMarker();
    ps.keywordSearch(inputRef.current.value, searchByKeyword);
  };

  const searchByKeyword = (result, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      setPlaces(result);
      displayPlaces(result);
      displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 없습니다.');
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 중 오류가 발생했습니다.');
    }
  };

  const displayPlaces = (result) => {
    const bounds = new kakao.maps.LatLngBounds();
    const newMarkers = result.map((place) => {
      const placePosition = new kakao.maps.LatLng(place.y, place.x);
      bounds.extend(placePosition);
      return addMarker(placePosition, place);
    });

    map?.setBounds(bounds);
    setMarkers(newMarkers);
  };

  const addMarker = (position, place) => {
    const marker = new kakao.maps.Marker({ position });
    marker.setMap(map);

    // 인포윈도우 생성
    const infowindow = new kakao.maps.InfoWindow({
      content: `<div>
                  <h4 class=${cn('text-text-sm font-semibold')}>${place.place_name}</h4>
                  <p class=${cn('text-text-xs')}>${place.address_name}</p>
                </div>`,
    });

    // 마커 클릭 시 인포윈도우 열기
    kakao.maps.event.addListener(marker, 'click', () => {
      infowindow.open(map, marker);
      map.setCenter(position); // 마커 클릭 시 지도 중앙으로 이동
    });

    return { marker, infowindow }; // 마커와 인포윈도우 반환
  };

  const removeMarker = () => {
    markers.forEach((markerObj) => markerObj.marker.setMap(null));
    setMarkers([]);
  };

  const displayPagination = (pagination) => {
    console.log('페이지 수:', pagination.last);
  };

  // 장소 클릭 시, 마커와 인포윈도우 열기
  const handlePlaceClick = (place) => {
    if (!map || !ps) return;

    const placePosition = new kakao.maps.LatLng(place.y, place.x);

    // 지도 중심을 클릭한 장소로 이동
    map.setCenter(placePosition);

    // 기존 마커와 인포윈도우를 제거한 후 새로 추가
    removeMarker();
    const { marker, infowindow } = addMarker(placePosition, place);

    // 인포윈도우 열기
    infowindow.open(map, marker);
  };

  return (
    <div className="h-full flex flex-col">
      <RegisterSearchBar ref={inputRef} onSubmit={handleSubmit} />

      {/* 지도 담을 영역 */}
      <div ref={mapContainerRef} className="w-full h-full relative"></div>

      {/* 장소 리스트 */}
      {places.length > 0 && (
        <div className="mt-4 px-4 overflow-y-auto scrollbar-hide h-1/3">
          <ul className="space-y-2 cursor-pointer">
            {places.map((place, index) => (
              <li
                key={index}
                className="text-text-sm border-b pb-2"
                onClick={() => handlePlaceClick(place)} // 장소 클릭 시 처리
              >
                <h4 className={cn(' font-semibold')}>{place.place_name}</h4>
                <p>{place.address_name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="px-4 mb-6 pt-2">
        <Button className="w-full" asChild size={'xl'}>
          <Link to={REGISTER_DETAILS}>선택</Link>
        </Button>
      </div>
    </div>
  );
};

export default MapPage;
