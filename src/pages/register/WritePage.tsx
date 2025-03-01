import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { REGISTER_DETAILS } from '@/constants/pathname';
import { ArrowLeft } from 'lucide-react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const WritePage = () => {
  const navi = useNavigate();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSaveContent = () =>
    navi(REGISTER_DETAILS, { state: { text: textAreaRef.current?.value } });

  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center py-3 justify-between">
        <div className="flex gap-2.5">
          <ArrowLeft size={24} onClick={() => navi(-1)} className="cursor-pointer" />
        </div>
        <Button
          variant={'transparent'}
          className="text-primary-300 !text-text-sm"
          onClick={handleSaveContent}
        >
          완료
        </Button>
      </header>
      <Textarea
        className="grow p-4 text-text-sm placeholder:text-primary-300 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="내용을 입력해주세요. (최대 500자)"
        maxLength={500}
        ref={textAreaRef}
      />
    </div>
  );
};

export default WritePage;
