import { HOME } from '@/constants/pathname';
import useAuth from '@/hooks/queries/user/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { data: user } = useAuth();

  if (!user) return <Navigate to={HOME} replace />;
  return <Outlet />;
};

export default ProtectedRoute;
