import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import kakaoLoginButton from '@/assets/login/kakao-login-button.png';
import { Button } from '../../components/ui/button';
import { useLoginMoalStore } from '@/store/loginStore';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import XIcon from '@/components/Icons/XIcon';

function LoginModal() {
  const { isOpen, closeLoginModal } = useLoginMoalStore();
  return (
    /* onClose(): 모달이 닫힐 때 호출되어 open을 false로 변경 */
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeLoginModal()} modal={true}>
      <DialogPrimitive.Overlay className=" mobile:bg-white" />
      <DialogContent
        hideCloseButton
        className="mobile:top-0 mobile:left-[50%] mobile:w-[375px] mobile:translate-x-[-50%] mobile:translate-y-0 web:pb-[44.82px]"
      >
        <DialogClose
          asChild
          className="flex items-center justify-end w-full web:py-2 mobile:py-[13px]"
        >
          <button>
            <XIcon className="w-[34px] h-[34px]" />
          </button>
        </DialogClose>
        <div className="flex w-[339px] flex-col items-center gap-[20px]">
          <DialogHeader>
            <DialogTitle>Spoteditor</DialogTitle>
            <DialogTitle>로그인</DialogTitle>
            <DialogDescription>
              지금 로그인 하시고 매일 새로운 Spoteditor의
              <br /> 업데이트 소식을 확인해보세요.
            </DialogDescription>
          </DialogHeader>
          <Button variant={null} className="w-auto web:my-5 mobile:my-10">
            <img className="object-contain" src={kakaoLoginButton} alt="카카오 로그인 버튼" />
          </Button>
          <p className="text-text-xs text-center text-[#6D727D] w-[320px]">
            로그인은 <span className="underline underline-offset-2">개인정보보호정책</span> 및
            <span className="underline underline-offset-2">서비스약관</span>에 동의하는 것을
            의미하며, 서비스 이용을 위해 이메일과 이름, 프로필 이미지를 수집합니다.
          </p>
        </div>
        <div className="mobile:fixed mobile:top-0 mobile:-z-10 mobile:w-screen mobile:h-screen mobile:bg-white" />
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
