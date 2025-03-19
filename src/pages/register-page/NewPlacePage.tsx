import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const NewPlacePage = () => {
  const navi = useNavigate();
  return (
    <div className="flex flex-col h-full px-4">
      <header className="mt-3 flex items-center gap-2 border-b pb-2 border-primary-50">
        <ArrowLeft size={24} onClick={() => navi(-1)} className="cursor-pointer" />
        <h3 className="text-text-2xl font-bold">새로운 장소 추가하기</h3>
      </header>

      <main className="grow">
        <div className="py-5">
          <div className="flex font-text-sm font-bold gap-1">
            <h4>장소명</h4>
            <span className="text-error-600">*</span>
          </div>
          <Input
            placeholder="공간명을 입력해주세요"
            className="border-b border-primary-100 px-0 text-primary-500 font-medium placeholder:text-primary-200"
          />
        </div>
        <div className="py-5">
          <div className="flex font-text-sm font-bold gap-1">
            <h4>위치</h4>
            <span className="text-error-600">*</span>
          </div>
          <Input
            placeholder="주소 검색"
            className="border-b border-primary-100 px-0 text-primary-500 font-medium placeholder:text-primary-200"
          />
        </div>
        <div className="py-5">
          <div className="flex font-text-sm font-bold gap-1">
            <h4>공간 유형</h4>
            <span className="text-error-600">*</span>
          </div>
          <Input
            placeholder="공간 유형을 입력해주세요"
            className="border-b border-primary-100 px-0 text-primary-500 font-medium placeholder:text-primary-200"
          />
        </div>
      </main>

      {/* 버튼 */}
      <Button className="w-full mb-3" asChild size={'xl'}>
        <Link to={'#'}>완료</Link>
      </Button>
    </div>
  );
};

export default NewPlacePage;
