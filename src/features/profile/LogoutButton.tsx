import LogoutIcon from '@/components/Icons/LogoutIcon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

function LogoutButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center cursor-default justify-start gap-2 text-[14px] rounded-sm px-4 py-3 w-full hover:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-900">
          <LogoutIcon />
          <p>로그아웃</p>
        </button>
      </DialogTrigger>
      <DialogContent className="web:w-[390px] mobile:w-[300px] p-6">
        <DialogTitle className="w-full mb-2 section-heading">로그아웃</DialogTitle>
        <DialogDescription className="text-[14px] text-[#6D727D] text-start w-full mb-4">
          로그아웃 하시겠어요?
        </DialogDescription>
        <DialogClose asChild className="flex justify-end w-full">
          <div className="space-x-[15px]">
            <Button variant="outline" className="w-[80px]">
              취소
            </Button>
            <Button className="w-[100px]">확인</Button>
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default LogoutButton;
