import GeoConsentModal from '@/components/GeoConsentModal';
import { KakaoMapProvider } from '@/contexts/KakaoMap.context';
import useGeolocationPermission from '@/hooks/useGeolocationPermission';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const RegisterLayout = () => {
  /* /register로 시작하는 url 진입 시 위치권한 동의 여부에 따라 모달창 렌더링*/
  const { setOpen, permission, checkPermission } = useGeolocationPermission();

  useEffect(() => {
    checkPermission();
  }, []);

  useEffect(() => {
    if (permission !== 'granted') {
      setOpen(true);
    }
  }, [permission]);
  return (
    <div className="flex flex-col items-center h-screen mx-auto web:w-[724px]">
      <div className="w-full h-full grow">
        <KakaoMapProvider>
          <Outlet />
        </KakaoMapProvider>
      </div>
      {permission !== 'granted' && <GeoConsentModal />}
    </div>
  );
};

export default RegisterLayout;
