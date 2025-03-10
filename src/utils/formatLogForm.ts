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

// const formatPlace = (place: kakao.maps.services.PlacesSearchResultItem): Place => ({
//   name: place.place_name,
//   description: textRefs.current[place.id],
//   address: formatAddress(place),
//   category: 'TOUR',
//   originalFiles: presignedUrlList[place.place_name].map((item) => item.originalFile),
//   uuids: presignedUrlList[place.place_name].map((item) => item.uuid),
// });
