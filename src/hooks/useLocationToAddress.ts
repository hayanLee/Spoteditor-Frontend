import { useEffect, useMemo, useRef, useState } from "react";

interface AddressData {
  address_name: string; // 전체 주소 (예: "서울 송파구 가락동 199-4")
  main_address_no: string; // 주번지 번호 (예: "199")
  sub_address_no: string; // 부번지 번호 (예: "4")
  mountain_yn: "Y" | "N"; // 산 여부 (Y: 산, N: 일반)
  region_1depth_name: string; // 시/도 (예: "서울")
  region_2depth_name: string; // 시/군/구 (예: "송파구")
  region_3depth_name: string; // 동/읍/면 (예: "가락동")
  zip_code: string; // 우편번호 (예: "")
  }

export default function useLocationToAddress(latitude: number | null, longitude: number | null) {
    const [address, setAddress] = useState<AddressData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const prevCoords = useRef<{ lat: number; lng: number } | null>(null);

    const coordKey = useMemo(() => `${latitude},${longitude}`, [latitude, longitude]);
  
    useEffect(() => {
      if (latitude === null || longitude === null) return;
      if (!window.kakao || !window.kakao.maps) {
        setError("카카오맵 API가 로드되지 않았습니다.");
        return;
      }
  
      //같은 좌표에 대한 중복 요청 방지
      if (prevCoords.current?.lat === latitude && prevCoords.current?.lng === longitude) {
        return; // 같은 좌표일 경우 API 요청 안 함
      }
      prevCoords.current = { lat: latitude, lng: longitude }; // 이전 좌표 저장
  
      setLoading(true);
      setError(null);
  
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.coord2Address(longitude, latitude, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
          setAddress(result[0].address);
        } else {
          setError("주소 정보를 가져올 수 없습니다.");
        }
        setLoading(false);
      });
    }, [coordKey]);
  
    return { address, loading, error };
  }