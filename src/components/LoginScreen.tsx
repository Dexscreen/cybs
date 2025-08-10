import React, { useState, useEffect } from 'react';
import { Terminal, Lock, Wifi } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (code: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [code, setCode] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [bootText, setBootText] = useState('');

  const bootSequence = [
    'INITIALIZING SECURE CONNECTION...',
    'LOADING ENCRYPTION PROTOCOLS...',
    'ESTABLISHING PROXY TUNNEL...',
    'BYPASSING FIREWALL...',
    'CONNECTION SECURED',
    'READY FOR AUTHENTICATION'
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < bootSequence.length) {
        setBootText(prev => prev + bootSequence[index] + '\n');
        index++;
      } else {
        clearInterval(interval);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (code === '30225') {
        onLogin(code);
      } else {
        setAttempts(prev => prev + 1);
        setError('ACCESS DENIED - INVALID CODE');
        setCode('');
      }
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-green-400 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Terminal className="w-12 h-12 mr-4" />
            <div>
              <h1 className="text-2xl font-bold">SECURE ACCESS TERMINAL</h1>
              <p className="text-sm text-green-300">UNAUTHORIZED ACCESS PROHIBITED</p>
            </div>
          </div>
        </div>

        {/* Boot Sequence */}
        <div className="bg-gray-900 border border-green-400 p-4 mb-6 h-48 overflow-y-auto">
          <pre className="text-xs whitespace-pre-wrap">{bootText}</pre>
          <div className="flex items-center mt-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
            <span className="text-xs">SYSTEM READY</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm mb-2">
              <Lock className="w-4 h-4 inline mr-2" />
              ENTER ACCESS CODE
            </label>
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-gray-900 border border-green-400 p-3 text-green-400 focus:outline-none focus:border-green-300 focus:shadow-lg focus:shadow-green-400/20"
              placeholder="•••••"
              maxLength={5}
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-900/20 border border-red-400 p-2">
              {error}
              <div className="text-xs mt-1">ATTEMPTS: {attempts}/3</div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || code.length !== 5}
            className="w-full bg-green-900 hover:bg-green-800 disabled:bg-gray-800 disabled:text-gray-500 border border-green-400 p-3 transition-all duration-200 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full mr-2"></div>
                AUTHENTICATING...
              </>
            ) : (
              <>
                <Wifi className="w-4 h-4 mr-2" />
                CONNECT
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-green-600">
          <p>ENCRYPTED CONNECTION • TOR ENABLED • VPN ACTIVE</p>
          <p className="mt-1">Last login: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;