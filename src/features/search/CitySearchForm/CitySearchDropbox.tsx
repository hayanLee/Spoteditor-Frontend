import XIcon from '@/components/Icons/XIcon';
import { useCitySearchStore } from '@/store/searchStore';
import CitySearchButton from './CitySearchButton';
import { cityCategories } from '@/services/data/cityData';
import BnameButtonList from './BnameButtonList';

export default function CitySearchDropbox() {
  const { sido, bname, setSido, setBname, closeDropBox } = useCitySearchStore();

  const onSidoClick = (sido: string) => {
    setSido(sido);
    setBname('');
  };

  const onBnameClick = (bname: string) => {
    setBname(bname);
    closeDropBox();
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
      <div className="flex justify-center">
        <section className="grid grid-cols-2 web:flex web:justify-center web:items-center gap-[5px] flex-wrap">
          {!sido &&
            !bname &&
            cityCategories.map((sido) => (
              <CitySearchButton key={sido} gio={sido} onClick={onSidoClick} />
            ))}
          {sido && !bname && <BnameButtonList sido={sido} onSigunguClick={onBnameClick} />}
        </section>
      </div>
    </>
  );
}
