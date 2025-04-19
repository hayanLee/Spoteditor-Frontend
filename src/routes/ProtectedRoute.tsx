import { HOME } from '@/constants/pathname';
import useUser from '@/hooks/queries/user/useUser';
import { useLoginMoalStore } from '@/store/loginStore';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { openLoginModal } = useLoginMoalStore();
  const { data: user } = useUser();

  if (!user) {
    openLoginModal();
    return <Navigate to={HOME} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
