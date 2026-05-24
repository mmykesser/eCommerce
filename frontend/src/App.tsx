import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
