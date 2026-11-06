import { Outlet } from 'react-router-dom';
import { Header } from '../components/ui/Header';

export const MainLayout = () => {
  return (
    <div
      className="flex min-h-screen flex-col text-on-surface antialiased"
      style={{
        background:
          'radial-gradient(circle at left top, rgb(208, 228, 255) 0%, rgb(249, 249, 249) 40%, rgb(193, 220, 255) 100%)',
      }}
    >
      <Header />
      <main className="mx-auto w-full flex-1 p-margin-mobile md:p-xl">
        <Outlet />
      </main>
    </div>
  );
};
