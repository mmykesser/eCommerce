import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';

export const PublicOnlyRoute = () => {
  const user = useAppSelector((state) => state.auth.user);

  return user ? <Navigate to="/" replace /> : <Outlet />;
};
