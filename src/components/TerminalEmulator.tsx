import React, { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

const TerminalEmulator: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'BLACKHAT TERMINAL v2.1.3',
    'Secure connection established',
    'Type "help" for available commands',
    ''
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => [
      'Available commands:',
      '  help          - Show this help message',
      '  clear         - Clear terminal',
      '  scan          - Scan network for targets',
      '  scan [target] - Scan specific target',
      '  exploit       - Launch exploit against target',
      '  exploit [ip]  - Exploit specific target',
      '  backdoor      - Install backdoor on compromised system',
      '  keylogger     - Activate keylogger',
      '  decrypt       - Decrypt captured data',
      '  status        - Show system status',
      '  whoami        - Display current user',
      '  nmap [target] - Network map scan',
      '  ping [target] - Ping target host',
      '  exit          - Close terminal',
      ''
    ],
    clear: () => {
      setHistory(['']);
      return [];
    },
    scan: () => [
      'Scanning network for vulnerable targets...',
      'Found 15 active hosts:',
      '  192.168.1.100  - Windows 10 (SMB open)',
      '  192.168.1.101  - Linux Ubuntu (SSH open)',
      '  192.168.1.102  - macOS (AFP open)',
      '  10.0.0.50      - Router (Telnet open)',
      '  172.16.0.25    - Web Server (HTTP/HTTPS)',
      'Scan complete. 5 vulnerable targets identified.',
      ''
    ],
    exploit: () => [
      'Launching exploit framework...',
      'Target: 192.168.1.100',
      'Vulnerability: MS17-010 (EternalBlue)',
      'Payload: windows/x64/meterpreter/reverse_tcp',
      'Exploit sent... waiting for response...',
      'SUCCESS: Meterpreter session opened',
      'Target compromised successfully!',
      ''
    ],
    backdoor: () => [
      'Installing persistent backdoor...',
      'Creating registry entries...',
      'Copying payload to system32...',
      'Setting up autostart mechanism...',
      'Backdoor installed successfully!',
      'Connection will persist after reboot.',
      ''
    ],
    keylogger: () => [
      'Activating keylogger module...',
      'Hooking keyboard events...',
      'Keylogger active - capturing keystrokes',
      'Log file: /tmp/keylog_' + Date.now() + '.txt',
      'Press Ctrl+C to stop logging',
      ''
    ],
    decrypt: () => [
      'Decrypting captured data...',
      'Algorithm: AES-256',
      'Brute force attack initiated...',
      'Testing 10,000 keys per second...',
      'Key found: 4f8b2c9e1a7d6f3e8b5a2c9f1e4d7a6b',
      'Decryption successful!',
      'Data saved to: /tmp/decrypted_data.txt',
      ''
    ],
    status: () => [
      'System Status:',
      '  CPU Usage: 23%',
      '  Memory: 4.2GB / 16GB',
      '  Network: 156 Mbps',
      '  Active Connections: 47',
      '  Compromised Targets: 12',
      '  Running Exploits: 3',
      '  Keyloggers Active: 2',
      ''
    ],
    whoami: () => [
      'root@blackhat-terminal',
      'UID: 0 (root)',
      'Groups: root, wheel, admin',
      'Privileges: SYSTEM',
      ''
    ],
    exit: () => [
      'Closing secure connection...',
      'Clearing traces...',
      'Connection terminated.',
      ''
    ]
  };

  const handleCustomCommand = (cmd: string, args: string[]) => {
    const command = cmd.toLowerCase();
    
    if (command === 'scan' && args.length > 0) {
      const target = args[0];
      return [
        `Scanning target: ${target}...`,
        'Port scan initiated...',
        `Host ${target} is up (0.0023s latency)`,
        'PORT     STATE SERVICE',
        '22/tcp   open  ssh',
        '80/tcp   open  http',
        '443/tcp  open  https',
        '3389/tcp open  ms-wbt-server',
        `Scan complete for ${target}`,
        ''
      ];
    }
    
    if (command === 'exploit' && args.length > 0) {
      const target = args[0];
      return [
        `Targeting: ${target}`,
        'Loading exploit modules...',
        'Vulnerability scanner active...',
        `Found CVE-2021-34527 on ${target}`,
        'Preparing payload...',
        'Exploit launched successfully!',
        `${target} has been compromised`,
        ''
      ];
    }
    
    if (command === 'nmap' && args.length > 0) {
      const target = args[0];
      return [
        `Starting Nmap scan on ${target}...`,
        'Nmap scan report for ' + target,
        `Host is up (0.00${Math.floor(Math.random() * 99)}s latency).`,
        'Not shown: 996 closed ports',
        'PORT     STATE SERVICE',
        '21/tcp   open  ftp',
        '22/tcp   open  ssh',
        '80/tcp   open  http',
        '443/tcp  open  https',
        'Nmap done: 1 IP address scanned',
        ''
      ];
    }
    
    if (command === 'ping' && args.length > 0) {
      const target = args[0];
      return [
        `PING ${target} (${target}): 56 data bytes`,
        `64 bytes from ${target}: icmp_seq=0 ttl=64 time=0.${Math.floor(Math.random() * 999)}ms`,
        `64 bytes from ${target}: icmp_seq=1 ttl=64 time=0.${Math.floor(Math.random() * 999)}ms`,
        `64 bytes from ${target}: icmp_seq=2 ttl=64 time=0.${Math.floor(Math.random() * 999)}ms`,
        `--- ${target} ping statistics ---`,
        '3 packets transmitted, 3 received, 0% packet loss',
        ''
      ];
    }
    
    return null;
  };
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    const parts = trimmedCmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    const newHistory = [...history, `root@blackhat:~# ${cmd}`];
    
    // Check for custom commands with arguments first
    const customOutput = handleCustomCommand(command, args);
    if (customOutput) {
      setHistory([...newHistory, ...customOutput]);
    } else if (commands[command as keyof typeof commands]) {
      const output = commands[command as keyof typeof commands]();
      if (command !== 'clear') {
        setHistory([...newHistory, ...output]);
      }
    } else if (command === '') {
      setHistory([...newHistory, '']);
    } else {
      setHistory([...newHistory, `Command not found: ${cmd}`, 'Type "help" for available commands', '']);
    }
    
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Terminal className="w-6 h-6 mr-3" />
        <h2 className="text-2xl font-bold">SECURE TERMINAL</h2>
      </div>

      <div className="bg-black border border-green-400 p-4 h-96 overflow-y-auto font-mono text-sm" ref={terminalRef}>
        {history.map((line, index) => (
          <div key={index} className="mb-1">
            {line}
          </div>
        ))}
        
        <div className="flex items-center">
          <span className="text-green-300 mr-2">root@blackhat:~#</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-green-400"
            autoComplete="off"
            spellCheck={false}
          />
          <span className="animate-pulse">█</span>
        </div>
      </div>

      <div className="bg-gray-900 border border-green-400 p-4">
        <h3 className="text-lg font-bold mb-4">QUICK COMMANDS</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.keys(commands).slice(1, -1).map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="p-2 bg-gray-800 hover:bg-gray-700 border border-green-400 text-xs transition-all duration-200"
            >
              {cmd.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 border border-yellow-400 p-4">
        <h3 className="text-lg font-bold mb-2 text-yellow-400">SECURITY WARNING</h3>
        <p className="text-sm text-yellow-300">
          This terminal provides direct access to advanced penetration testing tools. 
          All commands are logged and monitored. Use with extreme caution.
        </p>
      </div>
    </div>
  );
};

export default TerminalEmulator;