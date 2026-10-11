import { useEffect } from 'react';
import { useAppDispatch } from '../../../hooks/redux';
import { logout } from '../authSlice';

export const useAuthEvents = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleUnauthorized = () => {
      dispatch(logout());
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, [dispatch]);
};
