import XIcon from '@/components/Icons/XIcon';
import { useCitySearchStore } from '@/store/searchStore';
import CitySearchButton from './CitySearchButton';
import { cityCategories } from '@/services/data/cityData';
import useKakaoAddressName from '@/hooks/useKakaoAddressName';
import useLocationToAddress from '@/hooks/useLocationToAddress';
import BnameButtonList from './BnameButtonList';
import { useEffect, useState } from 'react';

export default function CitySearchDropbox() {
  const { sido, bname, setSido, setBname, closeDropBox, setRealBname, resetCityState } =
    useCitySearchStore();
  const { coordinates } = useKakaoAddressName(bname);
  const [validCoordinates, setValidCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // coordinates가 유효한 값이 있을 때만 업데이트
  useEffect(() => {
    if (coordinates?.latitude && coordinates?.longitude) {
      setValidCoordinates(coordinates);
    }
  }, [coordinates]);

  // 좌표가 설정된 경우에만 주소 검색 실행
  const { address } = useLocationToAddress(
    validCoordinates?.latitude ?? null,
    validCoordinates?.longitude ?? null
  );

  useEffect(() => {
    if (address?.region_2depth_name) {
      setRealBname(address.region_2depth_name);

      // 상태 초기화를 지연하여 setRealBname()이 먼저 실행되도록 함
      setTimeout(() => {
        resetCityState();
      }, 100);
    }
  }, [address]);

  const onSidoClick = (sido: string) => {
    setSido(sido);
  };

  const onBnameClick = (bname: string) => {
    setBname(bname);
    closeDropBox();
  };
  return (
    <section className="z-[1111] web:z-10 mobile:fixed mobile:top-0 mobile:left-0 web:absolute web:top-[93px] bg-white w-screen h-screen web:h-auto web:w-[655px] px-4 web:py-5 web:pl-[30px] web:pr-5 flex flex-col gap-[18px] web:gap-2.5">
      <header className="flex items-center justify-between py-3">
        <div className="flex justify-start gap-1 web:gap-2.5 mobile:flex-col web:justify-between web:items-center">
          <h3 className="font-bold text-text-2xl">도시선택</h3>
          <h4 className="flex-1 text-text-xs text-primary-400">
            에디터가 새로운 지역을 추가하면 새로운 지역이 생겨요!
          </h4>
        </div>
        <div>
          <button onClick={closeDropBox}>
            <XIcon className="w-[34px] h-[34px]" />
          </button>
        </div>
      </header>
      <div className="flex justify-center">
        <section className="grid grid-cols-2 web:flex web:justify-start web:items-center gap-[5px] flex-wrap">
          {!sido &&
            !bname &&
            cityCategories.map((sido) => (
              <CitySearchButton key={sido} gio={sido} onClick={onSidoClick} />
            ))}
          {sido && !bname && <BnameButtonList sido={sido} onSigunguClick={onBnameClick} />}
        </section>
      </div>
    </section>
  );
}
