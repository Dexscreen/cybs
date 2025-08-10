import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import HackerDashboard from './components/HackerDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasLicense, setHasLicense] = useState(false);

  const handleLogin = (code: string) => {
    if (code === '30225') {
      setIsAuthenticated(true);
    }
  };

  const handleLicenseActivation = (isActivated: boolean) => {
    setHasLicense(isActivated);
  };
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {!isAuthenticated ? (
        <LoginScreen onLogin={handleLogin} />
      ) : (
        <HackerDashboard hasLicense={hasLicense} onLicenseActivation={handleLicenseActivation} />
      )}
    </div>
  );
}

export default App;