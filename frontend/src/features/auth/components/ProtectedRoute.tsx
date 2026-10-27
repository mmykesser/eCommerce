import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';

export const ProtectedRoute = () => {
  const user = useAppSelector((state) => state.auth.user);

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
