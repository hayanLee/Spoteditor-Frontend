import { Button } from '@/components/ui/button';

function CitySearchForm() {
  return (
    <section>
      <form className="grid grid-rows-2 gap-2.5 web:flex web:h-full">
        <div className="flex gap-[6px] grow">
          <div className="flex flex-col grow bg-white px-3 py-2.5 gap-2">
            <label htmlFor="sido" className="text-primary-400 text-text-sm">
              어디로 놀러갈까요?
            </label>
            <input
              id="sido"
              type="text"
              placeholder="서울"
              className="grow text-black text-text-md font-bold placeholder:text-black web:text-sm"
            />
          </div>
          <div className="flex flex-col grow bg-white px-3 py-2.5 gap-2">
            <label htmlFor="gu" className="text-primary-400 text-text-sm">
              더 상세히 검색!
            </label>
            <input
              id="gu"
              type="text"
              placeholder="종로구, 중구"
              className="grow text-black text-text-md font-bold placeholder:text-black web:text-sm"
            />
          </div>
        </div>
        <Button className="bg-primary-950 text-text-sm text-white rounded-none web:h-full">
          검색
        </Button>
      </form>
    </section>
  );
}

export default CitySearchForm;
