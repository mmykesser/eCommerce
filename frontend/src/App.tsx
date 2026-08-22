import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage.tsx';
import { RegisterPage } from './pages/RegisterPage.tsx';
import { useAuthInit } from './features/auth/hooks/useAuthInit';
import { LoadingScreen } from './components/ui/LoadingScreen.tsx';

function App() {
  const { isInitializing } = useAuthInit();

  if (isInitializing) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
