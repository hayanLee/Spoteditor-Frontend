import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

function SaveProfileButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-[6px] w-[120px] h-[42px]">저장</Button>
      </DialogTrigger>
      <DialogContent className="web:w-[390px] mobile:w-[300px] p-6">
        <DialogTitle className="w-full mb-2 section-heading">저장이 완료 되었습니다.</DialogTitle>
        <DialogDescription className="text-12 text-[#6D727D] text-start w-full mb-4">
          수정된 프로필 정보가 저장되었습니다.
        </DialogDescription>
        <DialogClose asChild className="flex justify-end w-full">
          <div className="space-x-[15px]">
            <Button variant="outline" className="w-[53px]">
              닫기
            </Button>
            <Button className="w-[91px]">확인</Button>
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default SaveProfileButton;
