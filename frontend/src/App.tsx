import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { RegisterPage } from './pages/RegisterPage.tsx';
import { useAuthInit } from './features/auth/hooks/useAuthInit';
import { useAuthEvents } from './features/auth/hooks/useAuthEvents';
import { LoadingScreen } from './components/ui/LoadingScreen.tsx';

function App() {
  const { isInitializing } = useAuthInit();

  useAuthEvents();

  if (isInitializing) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
