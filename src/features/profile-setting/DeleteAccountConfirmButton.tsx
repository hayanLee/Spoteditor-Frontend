import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

function DeleteAccountConfirmButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-red-600 text-text-xs">삭제하기</button>
      </DialogTrigger>
      <DialogContent hideCloseButton className="web:w-[390px] mobile:w-[300px] p-6">
        <DialogTitle className="w-full mb-2 section-heading">계정삭제</DialogTitle>
        <DialogDescription className="text-text-xs text-[#6D727D] text-start w-full mb-4">
          계정 삭제가 완료 되었습니다.
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

export default DeleteAccountConfirmButton;
