import React, { useState, useEffect } from 'react';
import { Smartphone, MapPin, Phone, MessageSquare, Battery, Signal, Plus, Search } from 'lucide-react';

const PhoneMonitor: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState('');
  const [newTarget, setNewTarget] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [deviceData, setDeviceData] = useState({
    battery: 0,
    signal: 0,
    location: { lat: 40.7128, lng: -74.0060, address: 'New York, NY' },
    lastSeen: new Date()
  });

  const [devices, setDevices] = useState([
    { id: 'device-1', name: 'TARGET PHONE #1', model: 'iPhone 14 Pro', status: 'ACTIVE', number: '+1-555-0123' },
    { id: 'device-2', name: 'TARGET PHONE #2', model: 'Samsung Galaxy S23', status: 'ACTIVE', number: '+1-555-0456' },
    { id: 'device-3', name: 'TARGET PHONE #3', model: 'Google Pixel 7', status: 'OFFLINE', number: '+1-555-0789' }
  ]);

  const callLogs = [
    { time: '14:32', number: '+1-555-0123', duration: '3:45', type: 'outgoing' },
    { time: '13:15', number: '+1-555-0456', duration: '1:22', type: 'incoming' },
    { time: '12:08', number: '+1-555-0789', duration: '0:45', type: 'missed' },
    { time: '11:45', number: '+1-555-0321', duration: '7:12', type: 'outgoing' },
    { time: '10:30', number: '+1-555-0654', duration: '2:33', type: 'incoming' }
  ];

  const messages = [
    { time: '14:45', contact: 'Sarah', message: 'Hey, are we still meeting tonight?', type: 'received' },
    { time: '14:43', contact: 'Sarah', message: 'Yes, see you at 8pm', type: 'sent' },
    { time: '13:20', contact: 'Mike', message: 'The project files are ready', type: 'received' },
    { time: '12:15', contact: 'Mom', message: 'Don\'t forget dinner on Sunday', type: 'received' },
    { time: '11:30', contact: 'Boss', message: 'Meeting moved to 3pm', type: 'received' }
  ];

  const addNewTarget = () => {
    if (!newTarget.trim()) return;
    
    setIsScanning(true);
    setTimeout(() => {
      const newDevice = {
        id: `device-${Date.now()}`,
        name: newTarget.toUpperCase(),
        model: ['iPhone 14 Pro', 'Samsung Galaxy S23', 'Google Pixel 7', 'OnePlus 11'][Math.floor(Math.random() * 4)],
        status: ['ACTIVE', 'SCANNING', 'OFFLINE'][Math.floor(Math.random() * 3)],
        number: `+1-555-${Math.floor(Math.random() * 9000) + 1000}`
      };
      setDevices(prev => [...prev, newDevice]);
      setSelectedDevice(newDevice.id);
      setNewTarget('');
      setIsScanning(false);
    }, 3000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDeviceData(prev => ({
        ...prev,
        battery: Math.max(10, Math.min(100, prev.battery + (Math.random() - 0.5) * 5)),
        signal: Math.max(0, Math.min(100, prev.signal + (Math.random() - 0.5) * 20)),
        lastSeen: new Date()
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Smartphone className="w-6 h-6 mr-3" />
        <h2 className="text-2xl font-bold">PHONE MONITORING SYSTEM</h2>
      </div>

      {/* Device Selection */}
      <div className="bg-gray-900 border border-green-400 p-4">
        <h3 className="text-lg font-bold mb-4">MONITORED DEVICES</h3>
        
        {/* Add New Target */}
        <div className="mb-4 p-3 bg-gray-800 border border-gray-600">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newTarget}
              onChange={(e) => setNewTarget(e.target.value)}
              placeholder="Enter phone number or device name..."
              className="flex-1 bg-gray-700 border border-green-400 p-2 text-green-400 text-sm focus:outline-none focus:border-green-300"
              disabled={isScanning}
            />
            <button
              onClick={addNewTarget}
              disabled={isScanning || !newTarget.trim()}
              className="px-4 py-2 bg-green-900 hover:bg-green-800 disabled:bg-gray-700 border border-green-400 text-sm flex items-center"
            >
              {isScanning ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full mr-2"></div>
                  SCANNING...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  ADD TARGET
                </>
              )}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {devices.map((device) => (
            <button
              key={device.id}
              onClick={() => setSelectedDevice(device.id)}
              className={`p-4 text-left transition-all duration-200 ${
                selectedDevice === device.id
                  ? 'bg-green-900 border border-green-400'
                  : 'bg-gray-800 border border-gray-600 hover:border-green-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold">{device.name}</h4>
                <div className={`w-3 h-3 rounded-full ${
                  device.status === 'ACTIVE' ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                }`}></div>
              </div>
              <p className="text-sm text-green-300">{device.model}</p>
              <p className="text-xs text-gray-400">{device.number}</p>
              <p className="text-xs text-gray-400">{device.status}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Status */}
        <div className="bg-gray-900 border border-green-400 p-4">
          <h3 className="text-lg font-bold mb-4">DEVICE STATUS</h3>
          {selectedDevice ? (
            <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Battery className="w-5 h-5 mr-2" />
                <span>Battery Level</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">{Math.floor(deviceData.battery)}%</span>
                <div className="w-20 bg-gray-700 h-2">
                  <div 
                    className={`h-2 transition-all duration-1000 ${
                      deviceData.battery > 20 ? 'bg-green-400' : 'bg-red-400'
                    }`}
                    style={{ width: `${deviceData.battery}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Signal className="w-5 h-5 mr-2" />
                <span>Signal Strength</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">{Math.floor(deviceData.signal)}%</span>
                <div className="w-20 bg-gray-700 h-2">
                  <div 
                    className="bg-green-400 h-2 transition-all duration-1000"
                    style={{ width: `${deviceData.signal}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Location</span>
              </div>
              <span className="text-green-300">{deviceData.location.address}</span>
            </div>

            <div className="flex items-center justify-between">
              <span>Last Seen</span>
              <span className="text-green-300">{deviceData.lastSeen.toLocaleTimeString()}</span>
            </div>
          </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              <Smartphone className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Select a device to view status</p>
            </div>
          )}
        </div>

        {/* Location Map */}
        <div className="bg-gray-900 border border-green-400 p-4">
          <h3 className="text-lg font-bold mb-4">LOCATION TRACKING</h3>
          {selectedDevice ? (
            <div className="bg-gray-800 h-48 flex items-center justify-center border border-green-400">
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-2 text-red-400 animate-pulse" />
              <p className="text-sm">LIVE LOCATION</p>
              <p className="text-xs text-green-300">40.7128°N, 74.0060°W</p>
              <p className="text-xs text-gray-400 mt-2">GPS ACCURACY: ±3m</p>
            </div>
          </div>
          ) : (
            <div className="bg-gray-800 h-48 flex items-center justify-center border border-green-400">
              <div className="text-center text-gray-400">
                <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Select a device to track location</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Call Logs */}
        <div className="bg-gray-900 border border-green-400 p-4">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <Phone className="w-5 h-5 mr-2" />
            CALL LOGS
          </h3>
          <div className="space-y-2">
            {callLogs.map((call, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-800 border border-gray-700">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    call.type === 'outgoing' ? 'bg-blue-400' :
                    call.type === 'incoming' ? 'bg-green-400' : 'bg-red-400'
                  }`}></div>
                  <div>
                    <p className="text-sm font-bold">{call.number}</p>
                    <p className="text-xs text-gray-400">{call.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm">{call.duration}</p>
                  <p className="text-xs text-green-300 uppercase">{call.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="bg-gray-900 border border-green-400 p-4">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            MESSAGE INTERCEPTS
          </h3>
          <div className="space-y-2">
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 border ${
                msg.type === 'sent' ? 'bg-blue-900/20 border-blue-400' : 'bg-gray-800 border-gray-700'
              }`}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-bold">{msg.contact}</span>
                  <span className="text-xs text-gray-400">{msg.time}</span>
                </div>
                <p className="text-sm">{msg.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneMonitor;