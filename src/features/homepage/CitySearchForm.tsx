import GeoConsentModal from '@/components/GeoConsentModal';
import { Button } from '@/components/ui/button';
import useGeolocationPermission from '@/hooks/useGeolocationPermission';
import { useState } from 'react';

function CitySearchForm() {
  const [open, setOpen] = useState(false);
  const { permission } = useGeolocationPermission();
  const onSearchClick = () => {
    if (permission === 'prompt') {
      setOpen(true);
    }
    /* 추후 모달창 닫혔을 경우 검색할 수 있는 기능 추가 */
  };
  return (
    <>
      <form className="flex flex-col gap-2.5 web:grid web:grid-cols-[3fr_70px] ">
        <div className="grid grid-cols-2 gap-1.5">
          <div className="flex flex-col bg-white px-3 py-2.5 gap-2">
            <label htmlFor="sido" className="text-primary-400 text-text-sm">
              어디로 놀러갈까요?
            </label>
            <input
              id="sido"
              type="text"
              placeholder="서울"
              className="font-bold text-black grow text-text-md placeholder:text-black web:text-sm"
            />
          </div>
          <div className="flex flex-col bg-white px-3 py-2.5 gap-2">
            <label htmlFor="gu" className="text-primary-400 text-text-sm">
              더 상세히 검색!
            </label>
            <input
              id="gu"
              type="text"
              placeholder="종로구, 중구"
              className="font-bold text-black grow text-text-md placeholder:text-black web:text-sm"
            />
          </div>
        </div>
        <Button
          onClick={onSearchClick}
          className="font-medium text-white rounded-none bg-primary-950 text-text-sm hover:bg-primary-900"
          asChild
        >
          <p className="h-full">검색</p>
        </Button>
      </form>
      {open ? <GeoConsentModal /> : null}
    </>
  );
}

export default CitySearchForm;
