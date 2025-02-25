import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { REGISTER_SEARCH } from '@/constants/pathname';
import PlaceDetailFormItem from '@/features/registerpage/PlaceDetailFormItem';
import { useRegisterStore } from '@/store/registerStore';
import { ArrowLeft, Camera } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// 스크롤 수정 필요
const DetailsPage = () => {
  const navi = useNavigate();
  const selectedPlaces = useRegisterStore((state) => state.selectedPlaces);

  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center py-3 justify-between">
        <div className="flex gap-2.5">
          <ArrowLeft size={24} onClick={() => navi(-1)} className="cursor-pointer" />
          <h3 className="text-text-2xl font-bold">서울 · 종로구</h3>
        </div>
        <Button
          variant={'transparent'}
          className="text-primary-300 !text-text-md"
          onClick={() => navi(REGISTER_SEARCH)}
        >
          장소 추가
        </Button>
      </header>

      <main className="flex flex-col items-center grow gap-3 min-h-0 overflow-y-auto scrollbar-hide">
        {/* 로그 제목, 설명 */}
        <Input
          placeholder="제목을 입력해주세요. (최대 30자) *"
          className="border-b px-0 placeholder:text-primary-300 placeholder:after:content-['*'] placeholder:after:text-red-500"
        />

        <Button
          variant={'outline'}
          className="border w-full border-dashed gap-[5px] text-primary-600 px-2.5 py-3"
        >
          <Camera />
          <span className="text-text-sm font-bold">
            커버이미지<span className="text-error-600 m-1">*</span>
          </span>
        </Button>

        <Textarea
          className="bg-primary-50 text-primary-300 text-text-sm placeholder:text-primary-300 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="내용을 입력해주세요. (최대 500자)"
        />

        <div className="flex flex-col w-full">
          {selectedPlaces.map((place, idx) => (
            <PlaceDetailFormItem place={place} key={place.id} idx={idx + 1} />
          ))}
        </div>
      </main>

      {/* 버튼 */}
      {/* {isChecked ? (
        <div className="bg-black grid grid-cols-3 pt-2 pb-3">
          <Button>
            <ArrowUp />
            위로
          </Button>
          <Button>
            <ArrowDown />
            아래로
          </Button>
          <Button>
            <Trash />
            삭제하기
          </Button>
        </div>
      ) : ( */}
      <div className="pt-2 pb-3 px-4">
        <Button className="w-full" asChild size={'xl'}>
          <Link to={'#'}>완료</Link>
        </Button>
      </div>
      {/* )} */}
    </div>
  );
};

export default DetailsPage;
