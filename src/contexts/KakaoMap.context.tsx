import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';
interface KakaoMapContextType {
  mapContainerRef: React.RefObject<HTMLDivElement | null>;
  placeRef: React.RefObject<kakao.maps.services.Places | null>;
  currentLocationRef: React.RefObject<{ lat: number; lon: number } | null>;
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
  const currentLocationRef = useRef<{ lat: number; lon: number } | null>(null); // 현재 위치
  const [isLoading, setIsLoading] = useState(true);
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  // sdk 로드
  useEffect(() => {
    loadKakaoMapSDK(() => setIsSDKLoaded(true));
  }, []);

  // 지도 api 로드
  useEffect(() => {
    if (isSDKLoaded) {
      window.kakao.maps.load(() => setIsMapLoaded(true));
    }
  }, [isSDKLoaded]);

  // 지도 초기화
  useEffect(() => {
    if (isMapLoaded) {
      initMap();
    }
  }, [isMapLoaded]);

  const setCurrentLocation = async () => {
    if (currentLocationRef.current) return;

    const { lat, lon } = await getCurrentLocation(); // 현재 위치 가져오기
    currentLocationRef.current = { lat, lon };
  };

  const initMap = async () => {
    if (!isMapLoaded || !mapContainerRef.current) return;

    setIsLoading(true);
    await setCurrentLocation();

    const options = {
      center: new window.kakao.maps.LatLng(
        currentLocationRef.current?.lat || 37.5665,
        currentLocationRef.current?.lon || 126.978
      ),
      level: 3,
    };

    const mapInstacne = new window.kakao.maps.Map(mapContainerRef.current, options);
    setMap(mapInstacne);
    placeRef.current = new window.kakao.maps.services.Places();
    setIsLoading(false);
  };

  const value = {
    mapContainerRef,
    placeRef,
    currentLocationRef,
    isLoading,
    initMap,
    map,
  };

  return <KakaoMapContext.Provider value={value}>{children}</KakaoMapContext.Provider>;
}

// sdk
function loadKakaoMapSDK(loadedCallback: () => void) {
  const script = document.createElement('script');
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
    import.meta.env.VITE_KAKAO_MAP_KEY
  }&autoload=false&libraries=services`;
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
