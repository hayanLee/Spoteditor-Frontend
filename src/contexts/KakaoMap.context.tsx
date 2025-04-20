import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

interface KakaoMapContextType {
  mapContainerRef: React.RefObject<HTMLDivElement | null>;
  place: kakao.maps.services.Places | null;
  geocoder: kakao.maps.services.Geocoder | null;
  currentLocation: {
    lat: number;
    lon: number;
  } | null;
  isLoading: boolean;
  initMap: () => Promise<void>;
  map: kakao.maps.Map | null;
}

const KakaoMapContext = createContext<KakaoMapContextType | null>(null);

export const useKakaoMap = () => {
  const state = useContext(KakaoMapContext);
  if (!state) throw new Error('KakaoMapContext Provider Not Found');
  return state;
};

export function KakaoMapProvider({ children }: PropsWithChildren) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const placeRef = useRef<kakao.maps.services.Places | null>(null);
  const geocoderRef = useRef<kakao.maps.services.Geocoder | null>(null);
  const currentLocationRef = useRef<{ lat: number; lon: number } | null>(null); /* 현재 위치 */

  const [isLoading, setIsLoading] = useState(true);
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  /* sdk 로드 */
  useEffect(() => {
    loadKakaoMapSDK(() => setIsSDKLoaded(true));
  }, []);

  /* 지도 api 로드 */
  useEffect(() => {
    if (isSDKLoaded) {
      window.kakao.maps.load(() => setIsMapLoaded(true));
    }
  }, [isSDKLoaded]);

  /* 지도 초기화 */
  useEffect(() => {
    if (isMapLoaded) initMap();
  }, [isMapLoaded]);

  /* 현재 위치 가져오기 */
  const setCurrentLocation = async () => {
    if (currentLocationRef.current) return;

    const { lat, lon } = await getCurrentLocation();
    currentLocationRef.current = { lat, lon };
  };

  /* 지도 객체 만들기 */
  const createMapInstance = ({
    lat = currentLocationRef.current ? currentLocationRef.current.lat : 37.5665,
    lon = currentLocationRef.current ? currentLocationRef.current.lon : 126.978,
  }: {
    lat?: number;
    lon?: number;
  }) => {
    const options = {
      center: new window.kakao.maps.LatLng(lat, lon),
      level: 3,
    };

    return new window.kakao.maps.Map(mapContainerRef.current, options);
  };

  /* 장소 객체 만들기 */
  const createPlacesInstance = () => {
    if (!placeRef.current) placeRef.current = new window.kakao.maps.services.Places();
  };

  const createGeocoderInstance = () => {
    if (!geocoderRef.current) geocoderRef.current = new kakao.maps.services.Geocoder();
  };

  /* 지도 초기화 */
  const initMap = useCallback(async () => {
    if (!isMapLoaded || !mapContainerRef.current) return;
    setIsLoading(true);
    await setCurrentLocation();

    const mapInstance = createMapInstance({});

    setMap(mapInstance);
    setIsLoading(false);

    createPlacesInstance();
    createGeocoderInstance();
  }, [isMapLoaded]);

  const value = useMemo(
    () => ({
      mapContainerRef,
      place: placeRef.current,
      geocoder: geocoderRef.current,
      currentLocation: currentLocationRef.current,
      isLoading,
      initMap,
      map,
    }),
    [isLoading, initMap, map]
  );
  return <KakaoMapContext.Provider value={value}>{children}</KakaoMapContext.Provider>;
}

/* sdk */
function loadKakaoMapSDK(loadedCallback: () => void) {
  const script = document.createElement('script');
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
    import.meta.env.VITE_KAKAO_MAP_KEY
  }&autoload=false&libraries=services`;
  script.async = true;
  script.onload = loadedCallback;
  document.head.appendChild(script);
}

/* geolocation */
async function getCurrentLocation(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (error) => {
        console.error('위치 정보 가져오기 실패, 서울시청으로 기본 위치 설정', error);
        resolve({
          lat: 37.5665,
          lon: 126.978,
        });
      }
    );
  });
}
