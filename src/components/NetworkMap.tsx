import React, { useState, useEffect } from 'react';
import { Globe, Wifi, Server, Smartphone, Monitor, Router, Plus, Target } from 'lucide-react';

const NetworkMap: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [newTarget, setNewTarget] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const [nodes, setNodes] = useState([
    { id: 'router', type: 'router', x: 400, y: 200, status: 'compromised', name: 'Main Router' },
    { id: 'server1', type: 'server', x: 200, y: 100, status: 'target', name: 'Web Server' },
    { id: 'server2', type: 'server', x: 600, y: 100, status: 'secure', name: 'Database Server' },
    { id: 'pc1', type: 'computer', x: 100, y: 300, status: 'compromised', name: 'Admin PC' },
    { id: 'pc2', type: 'computer', x: 300, y: 350, status: 'scanning', name: 'User PC #1' },
    { id: 'pc3', type: 'computer', x: 500, y: 350, status: 'secure', name: 'User PC #2' },
    { id: 'phone1', type: 'phone', x: 150, y: 450, status: 'monitoring', name: 'Target Phone' },
    { id: 'phone2', type: 'phone', x: 650, y: 300, status: 'secure', name: 'Employee Phone' },
  ]);

  const [connections, setConnections] = useState([
    { from: 'router', to: 'server1' },
    { from: 'router', to: 'server2' },
    { from: 'router', to: 'pc1' },
    { from: 'router', to: 'pc2' },
    { from: 'router', to: 'pc3' },
    { from: 'pc1', to: 'phone1' },
    { from: 'router', to: 'phone2' },
  ]);

  const addNewTarget = () => {
    if (!newTarget.trim()) return;
    
    setIsScanning(true);
    setTimeout(() => {
      const deviceTypes = ['server', 'computer', 'phone'];
      const statuses = ['secure', 'scanning', 'target', 'compromised'];
      const randomType = deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      const newNode = {
        id: `node-${Date.now()}`,
        type: randomType,
        x: Math.floor(Math.random() * 600) + 100,
        y: Math.floor(Math.random() * 300) + 100,
        status: randomStatus,
        name: newTarget
      };
      
      setNodes(prev => [...prev, newNode]);
      
      // Add connection to router
      setConnections(prev => [...prev, { from: 'router', to: newNode.id }]);
      
      setSelectedNode(newNode.id);
      setNewTarget('');
      setIsScanning(false);
    }, 3000);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'router': return Router;
      case 'server': return Server;
      case 'computer': return Monitor;
      case 'phone': return Smartphone;
      default: return Wifi;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compromised': return 'text-red-400 border-red-400';
      case 'target': return 'text-yellow-400 border-yellow-400';
      case 'scanning': return 'text-blue-400 border-blue-400';
      case 'monitoring': return 'text-purple-400 border-purple-400';
      case 'secure': return 'text-green-400 border-green-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getConnectionColor = (fromNode: any, toNode: any) => {
    if (fromNode.status === 'compromised' || toNode.status === 'compromised') {
      return 'stroke-red-400';
    } else if (fromNode.status === 'target' || toNode.status === 'target') {
      return 'stroke-yellow-400';
    } else if (fromNode.status === 'scanning' || toNode.status === 'scanning') {
      return 'stroke-blue-400';
    }
    return 'stroke-green-400';
  };

  const selectedNodeData = selectedNode ? nodes.find(n => n.id === selectedNode) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Globe className="w-6 h-6 mr-3" />
        <h2 className="text-2xl font-bold">NETWORK TOPOLOGY MAP</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Network Visualization */}
        <div className="lg:col-span-2 bg-gray-900 border border-green-400 p-4">
          <h3 className="text-lg font-bold mb-4">LIVE NETWORK MAP</h3>
          
          {/* Add New Target */}
          <div className="mb-4 p-3 bg-gray-800 border border-gray-600">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
                placeholder="Enter IP address or device name..."
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
                    <Target className="w-4 h-4 mr-2" />
                    SCAN TARGET
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="relative bg-black border border-green-400 h-96 overflow-hidden">
            <svg width="100%" height="100%" className="absolute inset-0">
              {/* Connections */}
              {connections.map((conn, index) => {
                const fromNode = nodes.find(n => n.id === conn.from);
                const toNode = nodes.find(n => n.id === conn.to);
                if (!fromNode || !toNode) return null;

                return (
                  <g key={index}>
                    <line
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      className={`${getConnectionColor(fromNode, toNode)} stroke-2`}
                      strokeDasharray={fromNode.status === 'compromised' || toNode.status === 'compromised' ? "5,5" : "none"}
                    />
                    {/* Data flow animation */}
                    <circle
                      r="3"
                      className="fill-current text-white"
                      opacity="0.8"
                    >
                      <animateMotion
                        dur="3s"
                        repeatCount="indefinite"
                        begin={`${index * 0.5}s`}
                      >
                        <mpath href={`#path-${index}`} />
                      </animateMotion>
                    </circle>
                    <path
                      id={`path-${index}`}
                      d={`M ${fromNode.x} ${fromNode.y} L ${toNode.x} ${toNode.y}`}
                      fill="none"
                      stroke="none"
                    />
                  </g>
                );
              })}

              {/* Nodes */}
              {nodes.map((node) => {
                const Icon = getNodeIcon(node.type);
                return (
                  <g key={node.id}>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="20"
                      className={`${getStatusColor(node.status)} fill-gray-900 stroke-2 cursor-pointer`}
                      onClick={() => setSelectedNode(node.id)}
                    />
                    {node.status === 'compromised' && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="25"
                        className="stroke-red-400 fill-none stroke-1 animate-pulse"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Node labels */}
            {nodes.map((node) => (
              <div
                key={`label-${node.id}`}
                className="absolute text-xs text-center pointer-events-none"
                style={{
                  left: node.x - 30,
                  top: node.y + 25,
                  width: 60
                }}
              >
                {node.name}
              </div>
            ))}
          </div>
        </div>

        {/* Node Details */}
        <div className="bg-gray-900 border border-green-400 p-4">
          <h3 className="text-lg font-bold mb-4">NODE DETAILS</h3>
          {selectedNodeData ? (
            <div className="space-y-4">
              <div className="flex items-center">
                {React.createElement(getNodeIcon(selectedNodeData.type), { 
                  className: `w-8 h-8 mr-3 ${getStatusColor(selectedNodeData.status).split(' ')[0]}` 
                })}
                <div>
                  <h4 className="font-bold">{selectedNodeData.name}</h4>
                  <p className="text-xs text-gray-400">{selectedNodeData.type.toUpperCase()}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={`uppercase ${getStatusColor(selectedNodeData.status).split(' ')[0]}`}>
                    {selectedNodeData.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>IP Address:</span>
                  <span className="text-green-300">192.168.1.{Math.floor(Math.random() * 255)}</span>
                </div>
                <div className="flex justify-between">
                  <span>MAC Address:</span>
                  <span className="text-green-300">
                    {Array.from({length: 6}, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(':')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Last Seen:</span>
                  <span className="text-green-300">{new Date().toLocaleTimeString()}</span>
                </div>
              </div>

              {selectedNodeData.status === 'compromised' && (
                <div className="p-3 bg-red-900/20 border border-red-400">
                  <p className="text-sm text-red-400 font-bold">COMPROMISED</p>
                  <p className="text-xs text-red-300 mt-1">
                    Full access obtained. Backdoor installed. Monitoring all activity.
                  </p>
                </div>
              )}

              {selectedNodeData.status === 'target' && (
                <div className="p-3 bg-yellow-900/20 border border-yellow-400">
                  <p className="text-sm text-yellow-400 font-bold">TARGET ACQUIRED</p>
                  <p className="text-xs text-yellow-300 mt-1">
                    Vulnerability detected. Preparing exploit payload.
                  </p>
                </div>
              )}

              {selectedNodeData.status === 'scanning' && (
                <div className="p-3 bg-blue-900/20 border border-blue-400">
                  <p className="text-sm text-blue-400 font-bold">SCANNING</p>
                  <p className="text-xs text-blue-300 mt-1">
                    Port scan in progress. Identifying open services.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-400">Click on a node to view details</p>
          )}
        </div>
      </div>

      {/* Network Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900 border border-red-400 p-4">
          <h4 className="text-sm font-bold text-red-400 mb-2">COMPROMISED</h4>
          <p className="text-2xl font-bold">{nodes.filter(n => n.status === 'compromised').length}</p>
        </div>
        <div className="bg-gray-900 border border-yellow-400 p-4">
          <h4 className="text-sm font-bold text-yellow-400 mb-2">TARGETS</h4>
          <p className="text-2xl font-bold">{nodes.filter(n => n.status === 'target').length}</p>
        </div>
        <div className="bg-gray-900 border border-blue-400 p-4">
          <h4 className="text-sm font-bold text-blue-400 mb-2">SCANNING</h4>
          <p className="text-2xl font-bold">{nodes.filter(n => n.status === 'scanning').length}</p>
        </div>
        <div className="bg-gray-900 border border-green-400 p-4">
          <h4 className="text-sm font-bold text-green-400 mb-2">SECURE</h4>
          <p className="text-2xl font-bold">{nodes.filter(n => n.status === 'secure').length}</p>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gray-900 border border-green-400 p-4">
        <h3 className="text-lg font-bold mb-4">LEGEND</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-red-400 bg-gray-900 rounded mr-2"></div>
            <span>Compromised</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-yellow-400 bg-gray-900 rounded mr-2"></div>
            <span>Target</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-blue-400 bg-gray-900 rounded mr-2"></div>
            <span>Scanning</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-purple-400 bg-gray-900 rounded mr-2"></div>
            <span>Monitoring</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-green-400 bg-gray-900 rounded mr-2"></div>
            <span>Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkMap;