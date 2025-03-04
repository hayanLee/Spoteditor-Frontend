import GeoConsentModal from '@/components/GeoConsentModal';
import useGeolocationPermission from '@/hooks/useGeolocationPermission';
import { Outlet, useLocation } from 'react-router-dom';

const RegisterLayout = () => {
  /* /register로 시작하는 url 진입 시 위치권한 동의 여부에 따라 모달창 렌더링*/
  const { pathname } = useLocation();
  const isRegister = pathname.startsWith('/register');
  const { open } = useGeolocationPermission();
  return (
    <div className="flex flex-col items-center h-screen mx-auto web:w-[724px]">
      <div className="w-full h-full grow">
        <Outlet />
      </div>
      {isRegister && open && <GeoConsentModal />}
    </div>
  );
};

export default RegisterLayout;
