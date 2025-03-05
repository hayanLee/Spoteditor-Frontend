import CompassIcon from '@/components/Icons/CompassIcon';
import XIcon from '@/components/Icons/XIcon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import useGeolocationPermission from '@/hooks/useGeolocationPermission';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useLocation, useNavigate } from 'react-router-dom';

export default function GeoConsentModal() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const { open, setOpen } = useGeolocationPermission();

  /* 위치 요청 함수 (모달에서 동의 시 실행) */
  const requestLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setOpen(false); // 위치 가져오면 모달 닫기
        },
        (error) => {
          console.error('위치 정보를 가져올 수 없습니다. 다시 시도해 주세요.', error);
        }
      );
    }
  };

  /* 모달 닫을 때, 현재 경로가 /register로 시작하면 홈으로 이동 */
  const handleClose = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen && pathname.startsWith('/register')) {
      nav(-1);
    }
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      {/* onOpenChange는 모달이 열리거나 닫힐 때 boolean 값을 자동으로 전달 */}
      <DialogPrimitive.Overlay className="mobile:bg-white" />
      <DialogContent
        hideCloseButton
        className="mobile:top-0 mobile:left-[50%] w-[375px] web:w-[424px] mobile:translate-x-[-50%] mobile:translate-y-0 web:p-[15px]"
      >
        <section className="flex items-center justify-end w-full p-4 web:p-0">
          <DialogClose asChild className="bg-transparent focus:outline-none focus:ring-0">
            <button onClick={() => handleClose(false)}>
              <XIcon className="w-[34px] h-[34px]" />
            </button>
          </DialogClose>
        </section>
        <div className="flex flex-col px-5">
          <DialogHeader className="gap-4 web:gap-6 mb-2.5">
            <section className="flex flex-col items-center w-full gap-5">
              <CompassIcon />
              <DialogTitle className="font-bold text-text-2xl">
                위치기반 서비스 이용 동의
              </DialogTitle>
            </section>
            <DialogDescription className="text-text-xs text-primary-700">
              스팟에디터는 위치 정보의 보호 및 이용 등에 관한 법률에 따라 현재 위치 확인, 주변
              관광지 찾기가 포함된 서비스 이용을 위해서 위치기반 서비스 이용 약관 동의가 필요합니다.
              동의하지 않는 경우 위치기반 서비스 이용에 제약을 받을 수 있습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row items-center gap-2 py-5">
            <Button
              variant="outline"
              className="flex-1 font-semibold"
              onClick={() => handleClose(false)}
            >
              거절
            </Button>
            <Button className="font-semibold web:flex-1" onClick={requestLocation}>
              동의
            </Button>
          </DialogFooter>
        </div>
        <div className="mobile:fixed mobile:top-0 mobile:-z-10 mobile:w-screen mobile:h-screen mobile:bg-white" />
      </DialogContent>
    </Dialog>
  );
}
