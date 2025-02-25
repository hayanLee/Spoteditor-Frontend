import { Button } from '@/components/ui/button';
import { REGISTER_SEARCH } from '@/constants/pathname';
import RegisterSearchBar from '@/features/registerpage/RegisterSearchBar';
import { cn } from '@/lib/utils';
import { useRegisterStore } from '@/store/registerStore';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KakaoPlace } from './types/place.type';
declare global {
  interface Window {
    kakao: any;
  }
}

const MapPage = () => {
  const navi = useNavigate();
  const addSelectedPlace = useRegisterStore((state) => state.addSelectedPlace);
  const handleSelectPlace = () => {
    addSelectedPlace(selectedPlace);
    navi(REGISTER_SEARCH);
  };

  const isSDKLoadedRef = useRef(false);
  const isMapLoadedRef = useRef(false);
  const mapContainerRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef(null);
  const placeRef = useRef(null);
  const geoCoderRef = useRef(null);
  const currentLocationRef = useRef<{ lat: number; lon: number } | null>(null);

  const [address, setAddress] = useState('');
  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState<KakaoPlace[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<KakaoPlace>({});
  const [hasNoPlace, setHasNoPlace] = useState(false);

  // sdk 로드
  useEffect(() => {
    if (!isSDKLoadedRef.current) {
      loadKakaoMapSDK(() => {
        isSDKLoadedRef.current = true;

        // 지도 로드 되면 초기화
        window.kakao.maps.load(() => {
          isMapLoadedRef.current = true;
          initMap();
        });
      });
    }
  }, []);

  const initMap = async () => {
    if (!isSDKLoadedRef.current || !isMapLoadedRef.current) return;

    try {
      const { lat, lon } = await getCurrentLocation(); // 현재 위치 가져오기
      currentLocationRef.current = { lat, lon };

      const options = {
        center: new window.kakao.maps.LatLng(lat, lon), // 직접 lat, lon 사용
        level: 3,
      };

      mapRef.current = new window.kakao.maps.Map(mapContainerRef.current, options);
      placeRef.current = new window.kakao.maps.services.Places();
      geoCoderRef.current = new window.kakao.maps.services.Geocoder();

      geoCoderRef.current.coord2Address(lon, lat, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const address = result[0].address.address_name;
          setAddress(address);
        } else {
          console.log('주소 변환 실패');
        }
      });
    } catch (error) {
      console.log('위치 정보 가져오기 실패');
    }
  };

  // 검색어 입력
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputRef.current || !placeRef.current || !mapRef.current) return;

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
  const searchByKeyword = (result: KakaoPlace[], status: string) => {
    if (status === window.kakao.maps.services.Status.OK) {
      setPlaces(result);
      displayPlaces(result);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 없습니다.');
      setHasNoPlace(true);
      setPlaces([]);
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert('검색 중 오류가 발생했습니다.');
      setPlaces([]);
    }
  };

  const displayPlaces = (result: KakaoPlace[]) => {
    const bounds = new window.kakao.maps.LatLngBounds(); // 경계 객체

    const newMarkers = result.map((place) => {
      const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
      bounds.extend(placePosition);
      return addMarker(placePosition);
    });

    mapRef.current?.setBounds(bounds);
    setMarkers(newMarkers);
  };

  const addMarker = (position) => {
    const marker = new window.kakao.maps.Marker({ position });
    marker.setMap(mapRef.current);

    // 클릭 시 중앙 정렬
    window.kakao.maps.event.addListener(marker, 'click', () => {
      mapRef.current?.setCenter(position);
    });

    return marker;
  };

  const removeMarker = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  // 장소 클릭 시, 지도 중심을 클릭한 장소로 이동
  const handlePlaceClick = (place) => {
    if (!mapRef.current || !placeRef.current) return;
    const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
    mapRef.current.setCenter(placePosition);
    setSelectedPlace(place);
  };

  return (
    <div className="h-full flex flex-col">
      <RegisterSearchBar ref={inputRef} onSubmit={handleSubmit} to={REGISTER_SEARCH} />
      {/* 지도 담을 영역 */}
      <div ref={mapContainerRef} className="w-full h-full relative">
        <span
          className={cn(
            'absolute bottom-[15px] left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full border border-primary-100 z-20 font-medium hidden',
            address && 'block'
          )}
        >
          {address}
        </span>
      </div>

      {/* 장소 리스트 */}
      {!!places.length && (
        <div className="overflow-y-auto scrollbar-hide h-1/2">
          <ul className="cursor-pointer">
            {places.map((place, index) => (
              <li
                key={index}
                className="py-2.5 px-4  flex justify-between items-center hover:bg-primary-50"
                onClick={() => handlePlaceClick(place)} // 장소 클릭 시 처리
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
                <Button variant={'outline'} size={'s'} fullRounded>
                  선택
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="pt-2 pb-6 px-4">
        <Button className="w-full" size={'xl'} onClick={handleSelectPlace}>
          선택
        </Button>
      </div>
    </div>
  );
};

// sdk
function loadKakaoMapSDK(loadedCallback) {
  const script = document.createElement('script');
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
    import.meta.env.VITE_KAKAO_MAP_KEY
  }&autoload=false&libraries=services,clusterer`;
  script.async = true;
  script.onload = loadedCallback;
  document.head.appendChild(script);
}

// geolocation
async function getCurrentLocation(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
}

export default MapPage;
