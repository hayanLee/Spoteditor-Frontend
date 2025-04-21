import XIcon from '@/components/Icons/XIcon';
import { useCitySearchStore } from '@/store/searchStore';
import CitySearchButton from './CitySearchButton';
import { cityCategories, cityDistricts } from '@/services/data/cityData';
import BnameButtonList from './BnameButtonList';

export default function CitySearchDropbox() {
  const {
    sido,
    isSidoDropBox,
    isBnameDropBox,
    closeDropBox,
    setSido,
    setBname,
    toggleSidoDropBox,
    toggleBnameDropBox,
  } = useCitySearchStore();

  const onSidoClick = (sido: string) => {
    setSido(sido);
    setBname(cityDistricts[sido]?.[0]);
    toggleSidoDropBox();
  };

  const onBnameClick = (bname: string) => {
    setBname(bname);
    toggleBnameDropBox();
  };
  return (
    <>
      <header className="flex items-center justify-between py-3">
        <div className="flex justify-start gap-1 web:gap-2.5 mobile:flex-col web:justify-between web:items-center">
          <h3 className="font-bold text-text-2xl">도시선택</h3>
          <h4 className="flex-1 text-text-xs text-primary-400">
            에디터가 새로운 지역을 추가하면 새로운 지역이 생겨요!
          </h4>
        </div>
        <div>
          <button type="button" onClick={closeDropBox}>
            <XIcon className="w-[34px] h-[34px]" />
          </button>
        </div>
      </header>
      <div className="flex justify-center web:justify-start">
        <section className="grid grid-cols-2 web:flex web:justify-start web:items-center gap-[5px] flex-wrap mobile:w-[343px]">
          {isSidoDropBox &&
            cityCategories.map((sido) => (
              <CitySearchButton key={sido} gio={sido} onClick={onSidoClick} />
            ))}

          {isBnameDropBox && <BnameButtonList sido={sido} onSigunguClick={onBnameClick} />}
        </section>
        <div
          onClick={() => closeDropBox()}
          className="fixed top-0 left-0 w-screen h-screen -z-10"
        />
      </div>
    </>
  );
}
