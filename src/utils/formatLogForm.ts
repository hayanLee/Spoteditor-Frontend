import { Address } from '@/services/apis/types/registerAPI.type';

/* 주소를 테이블 타입에 맞춰 변환 */
export const formatAddress = (place: kakao.maps.services.PlacesSearchResultItem): Address => ({
  address: place.address_name,
  roadAddress: place.road_address_name,
  latitude: Number(place.y),
  longitude: Number(place.x),
  sido: place.address_name.split(' ')[0],
  bname: place.address_name.split(' ')[1],
  sigungu: place.address_name.split(' ')[2],
});
