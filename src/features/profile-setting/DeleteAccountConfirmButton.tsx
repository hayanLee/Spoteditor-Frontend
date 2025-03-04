import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useDeleteUser } from '@/hooks/queries/user/useDeleteUser';
import { useNavigate } from 'react-router-dom';

function DeleteAccountConfirmButton() {
  const nav = useNavigate();
  const { isPending, isSuccess, mutate } = useDeleteUser();

  const onDeleteClick = () => {
    if (isPending) return;
    mutate();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-red-600 text-text-xs">삭제하기</button>
      </DialogTrigger>
      <DialogContent hideCloseButton className="web:w-[390px] mobile:w-[300px] p-6">
        <DialogTitle className="w-full section-heading">계정삭제</DialogTitle>
        <DialogDescription className="mt-2 text-text-sm text-[#6D727D] text-start w-full mb-4">
          {!isSuccess ? (
            <span>
              계정을 삭제시 등록된 로그는 영구삭제됩니다.
              <br />
              계정을 삭제하시겠어요?
            </span>
          ) : (
            <span>계정 삭제가 완료 되었습니다.</span>
          )}
        </DialogDescription>
        {!isSuccess ? (
          <section className="flex justify-end w-full gap-x-2">
            <DialogClose asChild>
              <Button variant="outline" className="w-[80px]">
                취소
              </Button>
            </DialogClose>
            <Button onClick={onDeleteClick} disabled={isPending} className="w-[100px]">
              {isPending ? '삭제 중...' : '확인'}
            </Button>
          </section>
        ) : (
          <DialogClose asChild className="flex justify-end w-full">
            <div>
              <Button onClick={() => nav('/')} className="w-[100px]">
                확인
              </Button>
            </div>
          </DialogClose>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default DeleteAccountConfirmButton;
