import Loading from '@/components/Loading';
import { HOME } from '@/constants/pathname';
import useAuth from '@/hooks/queries/user/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { data: user, isPending, isError } = useAuth();

  if (isPending) return <Loading />;
  if (isError || !user) return <Navigate to={HOME} replace />;
  return <Outlet />;
};

export default ProtectedRoute;
