import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getProfile } from '../authSlice';

export const useAuthInit = () => {
  const dispatch = useAppDispatch();
  const { isInitializing } = useAppSelector((state) => state.auth);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!hasStarted.current && isInitializing) {
      hasStarted.current = true;
      dispatch(getProfile());
    }
  }, [dispatch, isInitializing]);

  return { isInitializing };
};
