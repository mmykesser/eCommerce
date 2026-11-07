import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { RegisterPage } from './pages/RegisterPage.tsx';
import { NotFoundPage } from './pages/NotFoundPage.tsx';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute.tsx';
import { PublicOnlyRoute } from './features/auth/components/PublicOnlyRoute.tsx';
import { useAuthInit } from './features/auth/hooks/useAuthInit';
import { useAuthEvents } from './features/auth/hooks/useAuthEvents';
import { LoadingScreen } from './components/ui/LoadingScreen.tsx';
import { MainLayout } from './layouts/MainLayout.tsx';

function App() {
  const { isInitializing } = useAuthInit();

  useAuthEvents();

  if (isInitializing) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}></Route>
    </Routes>
  );
}

export default App;
