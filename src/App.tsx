import { Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './components/NavBar';
import securePage from './components/SecurePage';
import LandingPage from './pages/LandingPage';

const ProtectedLanding = securePage(LandingPage);

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ProtectedLanding />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
