import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from '@/components/ui/dialog';
import { Button } from './ui/button';

export default function ErrorPopup() {
    //추후 쥬스탄드를 이용한 상태관리리
    return (
        /* onClose(): 모달이 닫힐 때 호출되어 open을 false로 변경 */
        <Dialog  modal={true}>
          <DialogContent
            hideCloseButton
            className="flex w-[300px] max-w-[512px] web:w-[390px] p-6 flex-col items-center gap-4">
              <DialogHeader className='w-full'>
                <DialogTitle className='font-bold text-text-2xl'>잘못된 접근입니다.</DialogTitle>
              </DialogHeader>
            <DialogClose className='flex justify-end w-full' asChild>
                <Button className='w-[100px] h-[42px] px-[14] py-5 font-semibold text-[13px]'>확인</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      );
}