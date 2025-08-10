import React, { useState, useEffect } from 'react';
import { Zap, Play, Square, Target, Activity } from 'lucide-react';

const DDoSSimulator: React.FC = () => {
  const [targetUrl, setTargetUrl] = useState('');
  const [isAttacking, setIsAttacking] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [attackStats, setAttackStats] = useState({
    packetsPerSecond: 0,
    totalPackets: 0,
    responseTime: 0,
    successRate: 0
  });

  const attackMessages = [
    'Initializing attack vectors...',
    'Establishing botnet connections...',
    'Bypassing rate limiting...',
    'Flooding target with requests...',
    'TCP SYN flood initiated...',
    'UDP flood in progress...',
    'HTTP GET flood active...',
    'Target server responding slowly...',
    'Connection timeouts detected...',
    'Server resources exhausted...',
    'Target appears to be down...',
    'Attack successful - target compromised'
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAttacking) {
      interval = setInterval(() => {
        // Add random log messages
        const randomMessage = attackMessages[Math.floor(Math.random() * attackMessages.length)];
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [...prev.slice(-20), `[${timestamp}] ${randomMessage}`]);

        // Update attack stats
        setAttackStats(prev => ({
          packetsPerSecond: Math.floor(Math.random() * 10000) + 5000,
          totalPackets: prev.totalPackets + Math.floor(Math.random() * 1000) + 500,
          responseTime: Math.floor(Math.random() * 5000) + 1000,
          successRate: Math.max(0, 100 - Math.floor(Math.random() * 30))
        }));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAttacking]);

  const startAttack = () => {
    if (!targetUrl) return;
    
    setIsAttacking(true);
    setLogs([`[${new Date().toLocaleTimeString()}] Attack initiated on ${targetUrl}`]);
    setAttackStats({ packetsPerSecond: 0, totalPackets: 0, responseTime: 0, successRate: 100 });
  };

  const stopAttack = () => {
    setIsAttacking(false);
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Attack terminated`]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Zap className="w-6 h-6 mr-3" />
        <h2 className="text-2xl font-bold">DDoS ATTACK SIMULATOR</h2>
      </div>

      {/* Target Configuration */}
      <div className="bg-gray-900 border border-green-400 p-4">
        <h3 className="text-lg font-bold mb-4">TARGET CONFIGURATION</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2">TARGET URL</label>
            <input
              type="text"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="https://target-website.com"
              className="w-full bg-gray-800 border border-green-400 p-3 text-green-400 focus:outline-none focus:border-green-300"
              disabled={isAttacking}
            />
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={startAttack}
              disabled={!targetUrl || isAttacking}
              className="flex items-center px-6 py-3 bg-red-900 hover:bg-red-800 disabled:bg-gray-800 disabled:text-gray-500 border border-red-400 transition-all duration-200"
            >
              <Play className="w-4 h-4 mr-2" />
              START ATTACK
            </button>
            
            <button
              onClick={stopAttack}
              disabled={!isAttacking}
              className="flex items-center px-6 py-3 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-800 disabled:text-gray-500 border border-green-400 transition-all duration-200"
            >
              <Square className="w-4 h-4 mr-2" />
              STOP ATTACK
            </button>
          </div>
        </div>
      </div>

      {/* Attack Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-900 border border-green-400 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-green-300">PACKETS/SEC</p>
              <p className="text-2xl font-bold">{attackStats.packetsPerSecond.toLocaleString()}</p>
            </div>
            <Activity className="w-8 h-8 text-green-300" />
          </div>
        </div>
        
        <div className="bg-gray-900 border border-green-400 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-green-300">TOTAL PACKETS</p>
              <p className="text-2xl font-bold">{attackStats.totalPackets.toLocaleString()}</p>
            </div>
            <Target className="w-8 h-8 text-green-300" />
          </div>
        </div>
        
        <div className="bg-gray-900 border border-green-400 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-green-300">RESPONSE TIME</p>
              <p className="text-2xl font-bold">{attackStats.responseTime}ms</p>
            </div>
            <Activity className="w-8 h-8 text-red-400" />
          </div>
        </div>
        
        <div className="bg-gray-900 border border-green-400 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-green-300">SUCCESS RATE</p>
              <p className="text-2xl font-bold">{attackStats.successRate}%</p>
            </div>
            <Zap className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Attack Console */}
      <div className="bg-gray-900 border border-green-400 p-4">
        <h3 className="text-lg font-bold mb-4">ATTACK CONSOLE</h3>
        <div className="bg-black border border-green-400 p-4 h-64 overflow-y-auto">
          {logs.map((log, index) => (
            <div key={index} className="text-sm mb-1 font-mono">
              {log}
            </div>
          ))}
          {isAttacking && (
            <div className="flex items-center mt-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
              <span className="text-xs">ATTACK IN PROGRESS...</span>
            </div>
          )}
        </div>
      </div>

      {/* Attack Progress */}
      {isAttacking && (
        <div className="bg-gray-900 border border-red-400 p-4">
          <h3 className="text-lg font-bold mb-4 text-red-400">ATTACK STATUS: ACTIVE</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Target Saturation</span>
              <span>{Math.min(100, Math.floor(attackStats.totalPackets / 1000))}%</span>
            </div>
            <div className="w-full bg-gray-700 h-2">
              <div 
                className="bg-red-400 h-2 transition-all duration-1000"
                style={{ width: `${Math.min(100, Math.floor(attackStats.totalPackets / 1000))}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DDoSSimulator;