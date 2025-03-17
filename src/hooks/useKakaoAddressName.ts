import { useEffect, useMemo, useRef, useState } from 'react';

//입력값: "송파구"
//반환값: { lat: 37.514575, lng: 127.107931 }

interface Coordinates {
  latitude: number;
  longitude: number;
}

export default function useKakaoAddressName(addressName: string) {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const prevAddress = useRef<string | null>(null);
  const geocoderRef = useRef<kakao.maps.services.Geocoder | null>(null);

  //입력값 최적화: trim() 적용 후 같은 값이면 메모이제이션
  const memoizedAddress = useMemo(() => addressName.trim(), [addressName]);

  useEffect(() => {
    if (!memoizedAddress) return;
    if (!window.kakao || !window.kakao.maps) {
      setError('카카오맵 API가 로드되지 않았습니다.');
      return;
    }

    // Geocoder 인스턴스 메모이제이션 (객체 생성 최적화)
    if (!geocoderRef.current) {
      geocoderRef.current = new window.kakao.maps.services.Geocoder();
    }

    // 같은 주소에 대한 중복 요청 방지 (마지막 요청된 주소와 비교)
    if (prevAddress.current === memoizedAddress) return;
    prevAddress.current = memoizedAddress;

    setLoading(true);
    setError(null);

    if (!geocoderRef.current) {
      geocoderRef.current = new window.kakao.maps.services.Geocoder();
    }

    if (geocoderRef.current) {
      geocoderRef.current.addressSearch(memoizedAddress, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
          const { x, y } = result[0];
          setCoordinates({ latitude: parseFloat(y), longitude: parseFloat(x) });
        } else {
          setError('위경도 정보를 찾을 수 없습니다.');
        }
        setLoading(false);
      });
    }
  }, [memoizedAddress]);

  return { coordinates, loading, error };
}
