import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logoutUser } from '../../features/auth/authSlice';
import { BRAND_NAME } from '../../constants/brand';

interface IUserActionsProps {
  userName: string;
  onLogout: () => void;
}

const UserActions = ({ userName, onLogout }: IUserActionsProps) => {
  return (
    <div className="flex items-center gap-sm md:gap-md">
      <span className="hidden text-label-sm text-on-surface-variant sm:inline md:text-title-sm">
        {userName}
      </span>
      <button
        type="button"
        onClick={onLogout}
        className="flex h-7 items-center justify-center gap-xs rounded-xl border border-outline-variant px-sm text-label-sm text-on-surface transition-colors hover:border-primary hover:bg-surface-container-low active:scale-95 md:h-10 md:px-md md:text-body-md"
      >
        <span className="material-symbols-outlined text-body-md leading-none md:text-headline-md">
          logout
        </span>
        <span className="hidden sm:inline">Sign Out</span>
      </button>
    </div>
  );
};

const GuestActions = () => {
  return (
    <div className="flex items-center gap-xs md:gap-sm">
      <Link
        to="/login"
        className="rounded-full px-sm py-xs text-label-sm text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary md:px-md md:py-sm md:text-body-md"
      >
        Sign In
      </Link>
      <Link
        to="/register"
        className="hidden rounded-full bg-primary px-md py-xs text-label-sm text-on-primary transition-all hover:bg-inverse-surface active:scale-95 sm:inline md:px-lg md:py-sm md:text-body-md"
      >
        Sign Up
      </Link>
    </div>
  );
};

export const Header = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const handleLogout = () => {
    void dispatch(logoutUser());
  };
  return (
    <header className="sticky top-0 z-20 px-sm pt-sm whitespace-nowrap sm:px-margin-mobile md:px-xl md:pt-md">
      <div className="mx-auto flex h-14 w-full items-center justify-between rounded-2xl border border-white/60 bg-surface-container-lowest/30 px-md shadow-[0_8px_40px_rgba(0,0,0,0.04)] backdrop-blur-2xl md:h-16 md:px-lg">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-sm text-primary transition-opacity hover:opacity-80"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-primary text-on-primary md:h-10 md:w-10">
            <span className="material-symbols-outlined text-body-md leading-none md:text-headline-md">
              devices
            </span>
          </div>
          <span className="text-body-md font-semibold tracking-tight md:text-headline-md">
            {BRAND_NAME}
          </span>
        </Link>
        <div className="flex shrink-0 items-center gap-sm md:gap-md">
          <Link
            to="/cart"
            aria-label="Shopping cart"
            className="flex h-7 w-7 items-center justify-center rounded-full text-on-surface transition-colors hover:bg-surface-container-low active:scale-95 md:h-10 md:w-10"
          >
            <span className="material-symbols-outlined text-body-md leading-none md:text-headline-md">
              shopping_bag
            </span>
          </Link>
          {user ? <UserActions userName={user.name} onLogout={handleLogout} /> : <GuestActions />}
        </div>
      </div>
    </header>
  );
};
