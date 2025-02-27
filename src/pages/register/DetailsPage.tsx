import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { REGISTER_SEARCH } from '@/constants/pathname';
import PlaceDetailFormItem from '@/features/registerpage/PlaceDetailFormItem';
import useImagePreview from '@/hooks/useImagePreview';
import { cn } from '@/lib/utils';
import { useRegisterStore } from '@/store/registerStore';
import { ArrowLeft, Camera, CircleX } from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 스크롤 수정 필요
const DetailsPage = () => {
  const navi = useNavigate();
  const selectedPlaces = useRegisterStore((state) => state.selectedPlaces);
  const { imagePreview, handleFileChange, handleClearImage } = useImagePreview();
  const coverUploadInputRef = useRef<HTMLInputElement>(null);

  const logTitleInputRef = useRef<HTMLInputElement>(null);
  const handleClearTitle = () => {
    if (logTitleInputRef.current) {
      logTitleInputRef.current.value = '';
      logTitleInputRef.current.focus();
    }
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('제출');
  };

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}
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

      <form
        className="flex flex-col items-center grow gap-3 min-h-0 overflow-y-auto scrollbar-hide"
        onSubmit={handleSubmit}
      >
        {/* 로그 타이틀 */}
        <div className="flex items-center w-full border-b">
          <Input
            name="logTitle"
            placeholder="제목을 입력해주세요. (최대 30자) *"
            className=" placeholder:text-primary-300 placeholder:after:content-['*'] font-medium"
            ref={logTitleInputRef}
            maxLength={30}
            defaultValue=""
          />
          <CircleX className=" fill-primary-100 stroke-white" onClick={handleClearTitle} />
        </div>
        {/* 커버 이미지 */}
        {imagePreview && (
          <div className="relative">
            <Input
              id="coverImg"
              type="image"
              src={imagePreview}
              alt="커버 이미지"
              className="w-full aspect-[2/1] p-0 object-cover"
            />
            <CircleX
              className="stroke-primary-100 absolute top-4 right-4 cursor-pointer hover:fill-slate-50/50"
              onClick={handleClearImage}
            />
          </div>
        )}
        {/* 파일 입력 */}
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={coverUploadInputRef}
          className="hidden"
        />
        {/* 커버 이미지 버튼 */}
        <Button
          variant={'outline'}
          className={cn(
            'border w-full border-dashed gap-[5px] text-primary-600 px-2.5 py-3',
            imagePreview && 'hidden'
          )}
          onClick={() => coverUploadInputRef.current?.click()}
        >
          <Camera />
          <span className="text-text-sm font-bold">
            커버이미지<span className="text-error-600 m-1">*</span>
          </span>
        </Button>
        {/* 로그 설명 */}
        <Textarea
          className="bg-primary-50 min-h-[85px] px-[18px] py-2.5 text-primary-300 text-text-sm placeholder:text-primary-300 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="내용을 입력해주세요. (최대 500자)"
          maxLength={500}
        />
        <div className="flex flex-col w-full">
          {selectedPlaces.map((place, idx) => (
            <PlaceDetailFormItem place={place} key={place.id} idx={idx + 1} />
          ))}
        </div>
      </form>

      {/* 버튼 */}
      <div className="pt-2 pb-3 px-4">
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button className="w-full" size={'xl'}>
              선택
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <span className="text-info-500">{logTitleInputRef.current?.value}</span> 로그를
                등록하시겠어요?
              </AlertDialogTitle>
              <AlertDialogDescription>
                <Label htmlFor="secret" className="flex items-center gap-3">
                  <Input type="checkbox" id="secret" className="w-fit" />
                  <span className="text-black text-text-sm">비공개</span>
                </Label>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction>확인</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default DetailsPage;
