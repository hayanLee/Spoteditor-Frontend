export type KakaoPlace = {
  address_name: string; // 지번 주소
  category_group_code: string; // 카테고리 코드 (ex. CE7: 카페)
  category_group_name: string; // 카테고리 그룹명 (ex. 카페)
  category_name: string; // 상세 카테고리 (ex. 음식점 > 카페)
  distance: string; // 기준 좌표와의 거리 (미터 단위)
  id: string; // 장소 ID
  phone: string; // 전화번호 (없으면 빈 문자열)
  place_name: string; // 장소명
  place_url: string; // 카카오맵 URL
  road_address_name: string; // 도로명 주소
  x: string; // 경도 (longitude)
  y: string; // 위도 (latitude)
};
