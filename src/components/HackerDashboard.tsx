import React, { useState } from 'react';
import { Shield, Lock, Wifi, Globe, Users, Phone, Zap, Terminal, Eye, Network, HelpCircle } from 'lucide-react';
import { cryptoWallets, isValidTransactionHash } from '../config/walletConfig';
import NetworkMap from './NetworkMap';
import PhoneMonitor from './PhoneMonitor';
import DDoSSimulator from './DDoSSimulator';
import TerminalEmulator from './TerminalEmulator';
import SocialMediaMonitor from './SocialMediaMonitor';
import LoginScreen from './LoginScreen';

interface HackerDashboardProps {
  hasLicense: boolean;
  onLicenseActivation: (isActivated: boolean) => void;
}

const HackerDashboard: React.FC<HackerDashboardProps> = ({ hasLicense, onLicenseActivation }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [showPayment, setShowPayment] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);
  const [transactionHash, setTransactionHash] = useState('');

  const handleVerifyTransaction = () => {
    if (selectedCrypto && isValidTransactionHash(transactionHash)) {
      onLicenseActivation(true);
      setShowPayment(false);
      setTransactionHash('');
      setSelectedCrypto(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const renderContent = () => {
    if (!hasLicense && activeSection !== 'overview') {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Lock className="w-16 h-16 mx-auto mb-4 text-red-400" />
            <h3 className="text-xl font-bold mb-2">PREMIUM ACCESS REQUIRED</h3>
            <p className="text-gray-400 mb-4">This module requires a premium license</p>
            <button
              onClick={() => setShowPayment(true)}
              className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded transition-colors"
            >
              UNLOCK ACCESS
            </button>
          </div>
        </div>
      );
    }

    switch (activeSection) {
      case 'network':
        return <NetworkMap />;
      case 'phone':
        return <PhoneMonitor />;
      case 'ddos':
        return <DDoSSimulator />;
      case 'terminal':
        return <TerminalEmulator />;
      case 'social':
        return <SocialMediaMonitor />;
      case 'login':
        return <LoginScreen onLogin={() => {}} />;
      default:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">CYBER SPYWARE CONTROL CENTER</h2>
              <p className="text-green-300">Advanced surveillance and penetration testing suite</p>
            </div>

            {/* System Status */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-900 border border-green-400 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-green-300">PROXY STATUS</p>
                    <p className="text-lg font-bold">ACTIVE</p>
                  </div>
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
              </div>
              
              <div className="bg-gray-900 border border-green-400 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-green-300">TOR NETWORK</p>
                    <p className="text-lg font-bold">CONNECTED</p>
                  </div>
                  <Globe className="w-6 h-6 text-green-400" />
                </div>
              </div>
              
              <div className="bg-gray-900 border border-green-400 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-green-300">TARGETS</p>
                    <p className="text-lg font-bold">47</p>
                  </div>
                  <Users className="w-6 h-6 text-green-400" />
                </div>
              </div>
              
              <div className="bg-gray-900 border border-green-400 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-green-300">UPTIME</p>
                    <p className="text-lg font-bold">99.9%</p>
                  </div>
                  <Wifi className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </div>

            {/* License Status */}
            <div className="bg-gray-900 border border-green-400 p-6">
              <h3 className="text-xl font-bold mb-4">LICENSE STATUS</h3>
              {hasLicense ? (
                <div className="flex items-center">
                  <Shield className="w-8 h-8 text-green-400 mr-4" />
                  <div>
                    <p className="text-lg font-bold text-green-400">PREMIUM ACTIVE</p>
                    <p className="text-sm text-green-300">All modules unlocked • Unlimited access</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Lock className="w-8 h-8 text-red-400 mr-4" />
                    <div>
                      <p className="text-lg font-bold text-red-400">TRIAL MODE</p>
                      <p className="text-sm text-gray-400">Limited functionality • Overview only</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPayment(true)}
                    className="bg-green-600 hover:bg-green-500 text-black font-bold py-2 px-6 rounded transition-colors"
                  >
                    UPGRADE TO PREMIUM
                  </button>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-900 border border-green-400 p-6">
              <h3 className="text-xl font-bold mb-4">OPERATION STATISTICS</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400">156</p>
                  <p className="text-xs text-green-300">SUCCESSFUL BREACHES</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-400">23</p>
                  <p className="text-xs text-blue-300">ACTIVE MONITORS</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-400">8.2TB</p>
                  <p className="text-xs text-yellow-300">DATA INTERCEPTED</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-400">99.7%</p>
                  <p className="text-xs text-red-300">SUCCESS RATE</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 border-r border-green-400 min-h-screen p-4">
          <div className="mb-8">
            <h1 className="text-xl font-bold mb-2">CYBER SPYWARE</h1>
            <p className="text-xs text-green-300">v2.4.7 ELITE</p>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveSection('overview')}
              className={`w-full text-left p-3 rounded transition-colors ${
                activeSection === 'overview' ? 'bg-green-900 text-green-300' : 'hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-3" />
                OVERVIEW
              </div>
            </button>

            <button
              onClick={() => setActiveSection('network')}
              className={`w-full text-left p-3 rounded transition-colors ${
                activeSection === 'network' ? 'bg-green-900 text-green-300' : 'hover:bg-gray-800'
              } ${!hasLicense ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center">
                <Network className="w-4 h-4 mr-3" />
                NETWORK MAP
                {!hasLicense && <Lock className="w-3 h-3 ml-auto" />}
              </div>
            </button>

            <button
              onClick={() => setActiveSection('phone')}
              className={`w-full text-left p-3 rounded transition-colors ${
                activeSection === 'phone' ? 'bg-green-900 text-green-300' : 'hover:bg-gray-800'
              } ${!hasLicense ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3" />
                PHONE MONITOR
                {!hasLicense && <Lock className="w-3 h-3 ml-auto" />}
              </div>
            </button>

            <button
              onClick={() => setActiveSection('ddos')}
              className={`w-full text-left p-3 rounded transition-colors ${
                activeSection === 'ddos' ? 'bg-green-900 text-green-300' : 'hover:bg-gray-800'
              } ${!hasLicense ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-3" />
                DDOS ATTACK
                {!hasLicense && <Lock className="w-3 h-3 ml-auto" />}
              </div>
            </button>

            <button
              onClick={() => setActiveSection('terminal')}
              className={`w-full text-left p-3 rounded transition-colors ${
                activeSection === 'terminal' ? 'bg-green-900 text-green-300' : 'hover:bg-gray-800'
              } ${!hasLicense ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center">
                <Terminal className="w-4 h-4 mr-3" />
                TERMINAL
                {!hasLicense && <Lock className="w-3 h-3 ml-auto" />}
              </div>
            </button>

            <button
              onClick={() => setActiveSection('social')}
              className={`w-full text-left p-3 rounded transition-colors ${
                activeSection === 'social' ? 'bg-green-900 text-green-300' : 'hover:bg-gray-800'
              } ${!hasLicense ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-3" />
                SOCIAL MONITOR
                {!hasLicense && <Lock className="w-3 h-3 ml-auto" />}
              </div>
            </button>

            <button
              onClick={() => setActiveSection('login')}
              className={`w-full text-left p-3 rounded transition-colors ${
                activeSection === 'login' ? 'bg-green-900 text-green-300' : 'hover:bg-gray-800'
              } ${!hasLicense ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center">
                <Lock className="w-4 h-4 mr-3" />
                LOGIN BYPASS
                {!hasLicense && <Lock className="w-3 h-3 ml-auto" />}
              </div>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-green-500/50 rounded-lg p-6 max-w-3xl w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-green-400">UNLOCK CYBER SPYWARE SUITE</h3>
              <button
                onClick={() => setShowPayment(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {!selectedCrypto ? (
              <div>
                <p className="text-green-300 mb-6">Select payment method to unlock all premium features:</p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {Object.entries(cryptoWallets).map(([key, wallet]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedCrypto(key)}
                      className="bg-gray-800 hover:bg-gray-700 border border-green-500/30 p-4 rounded-lg transition-colors"
                    >
                      <div className="text-green-400 font-semibold mb-2">{wallet.name}</div>
                      <div className="text-xs text-green-300">{wallet.usdValue}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h4 className="text-green-400 font-semibold mb-4">
                    Send payment to unlock suite
                  </h4>
                  <div className="bg-gray-800 p-4 rounded border border-green-500/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-green-300">Wallet Address:</span>
                      <button
                        onClick={() => copyToClipboard(cryptoWallets[selectedCrypto].address)}
                        className="text-xs bg-green-600 hover:bg-green-500 text-black px-2 py-1 rounded"
                      >
                        COPY
                      </button>
                    </div>
                    <div className="font-mono text-xs text-white break-all bg-black p-2 rounded">
                      {cryptoWallets[selectedCrypto].address}
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      Network: {cryptoWallets[selectedCrypto].network}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm text-green-300 mb-2">Transaction Hash:</label>
                  <input
                    type="text"
                    value={transactionHash}
                    onChange={(e) => setTransactionHash(e.target.value)}
                    placeholder="Enter transaction hash for verification..."
                    className="w-full bg-gray-800 border border-green-500/30 rounded px-3 py-2 text-white font-mono text-sm"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedCrypto(null)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                  >
                    BACK
                  </button>
                  <button
                    onClick={handleVerifyTransaction}
                    disabled={!transactionHash}
                    className="flex-1 bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold py-2 px-4 rounded transition-colors"
                  >
                    VERIFY & UNLOCK SUITE
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HackerDashboard;