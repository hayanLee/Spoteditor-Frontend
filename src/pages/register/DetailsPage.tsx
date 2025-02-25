import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PlaceDetailFormItem from '@/features/registerpage/PlaceDetailFormItem';
import { ArrowLeft, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// 스크롤 수정 필요
const DetailsPage = () => {
  const navi = useNavigate();
  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center gap-2.5 pb-3">
        <ArrowLeft size={24} onClick={() => navi(-1)} className="cursor-pointer" />
        <h3 className="text-text-2xl font-bold">서울 · 종로구</h3>
      </header>

      <main className="flex flex-col items-center grow gap-3 min-h-0 overflow-y-auto scrollbar-hide">
        {/* 로그 제목, 설명 */}
        <Input
          placeholder="제목을 입력해주세요. (최대 30자) *"
          className="border-b px-0 placeholder:text-primary-300 placeholder:after:content-['*'] placeholder:after:text-red-500"
        />

        <Textarea
          className="bg-primary-50 text-primary-300 text-text-sm placeholder:text-primary-300 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="내용을 입력해주세요. (최대 500자)"
        />

        {/* 버튼 클릭하면  PlaceDetailFormItem 추가하기*/}
        <PlaceDetailFormItem />
        <PlaceDetailFormItem />
        <PlaceDetailFormItem />

        <Button
          className="w-full text-primary-600 font-bold text-text-sm mb-10"
          variant={'outline'}
        >
          <Plus />
          장소 추가
        </Button>
      </main>

      {/* 버튼 */}
      <Button className="w-full mb-3" asChild size={'xl'}>
        <Link to={'#'}>완료</Link>
      </Button>
    </div>
  );
};

export default DetailsPage;
