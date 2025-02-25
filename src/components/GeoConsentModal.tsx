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
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';

export default function GeoConsentModal() {
  const [open, setOpen] = useState(false);

  /* 추후 유저 데이터에 위치 정보를 저장할 경우 활용 */
  //const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  /* 위치 권한 상태 확인 함수 */
  const checkPermission = async () => {
    if (!('permissions' in navigator)) return;

    const result = await navigator.permissions.query({ name: 'geolocation' });

    // "prompt(사용자가 아직 위치 권한을 허용/거부하지 않음)" 상태이면 자동으로 모달 오픈
    if (result.state === 'prompt') {
      setOpen(true);
    }

    // 브라우저 설정에서 권한이 변경될 때 감지(granted: 사용자가 이미 위치 권한을 허용함)
    result.onchange = () => {
      if (result.state === 'granted') {
        setOpen(false); // 권한 허용 시 모달 닫기
      }
    };
  };

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

  // 컴포넌트 마운트 시 권한 상태 확인
  useEffect(() => {
    checkPermission();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Overlay className="mobile:bg-white" />
      <DialogContent
        hideCloseButton
        className="mobile:top-0 mobile:left-[50%] w-[375px] web:w-[424px] mobile:translate-x-[-50%] mobile:translate-y-0 web:p-[15px]"
      >
        <section className="flex items-center justify-end w-full p-4 web:p-0">
          <DialogClose asChild>
            <button>
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
          <DialogFooter className="flex flex-row items-center gap-2 py-5 web:grid web:grid-cols-2">
            <Button
              variant="outline"
              className="flex-1 font-semibold"
              onClick={() => setOpen(false)}
            >
              거절
            </Button>
            <Button className="font-semibold" onClick={requestLocation}>
              동의
            </Button>
          </DialogFooter>
        </div>
        <div className="mobile:fixed mobile:top-0 mobile:-z-10 mobile:w-screen mobile:h-screen mobile:bg-white" />
      </DialogContent>
    </Dialog>
  );
}
