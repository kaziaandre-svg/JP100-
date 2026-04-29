
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Bug, Activity, Zap, Server, Database, Search } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { VirusStats } from '../types';

export default function AntiSpyScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState('');
  const [stats, setStats] = useState<VirusStats>({
    scanned: 1024592,
    threats: 142,
    cleaned: 138,
    isolated: 4,
  });

  const mockFiles = [
    '/proc/sys/kernel/spy_mod',
    '/lib/modules/hidden_rootkit',
    '/usr/bin/remote_access_v3',
    '/etc/init.d/malware_service',
    '/sys/devices/cpu0/intruder_core',
    'com.android.system.spyware.apk',
    'keyboard_logger_module.so'
  ];

  useEffect(() => {
    let interval: any;
    if (isScanning && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 0.5, 100));
        setCurrentFile(mockFiles[Math.floor(Math.random() * mockFiles.length)] + "/" + Math.random().toString(36).substring(7));
      }, 50);
    } else if (progress >= 100) {
      setIsScanning(false);
    }
    return () => clearInterval(interval);
  }, [isScanning, progress]);

  const startScan = () => {
    setProgress(0);
    setIsScanning(true);
  };

  const chartData = [
    { name: 'Neutralizacje', value: stats.cleaned, color: '#00FF41' },
    { name: 'Izolacja', value: stats.isolated, color: '#facc15' },
    { name: 'Zagrożenia', value: 0, color: '#ef4444' }
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-black p-2 panel-border">
          <div className="text-[10px] opacity-70 uppercase tracking-tighter">Files Scanned</div>
          <div className="text-xl font-black text-white">{stats.scanned.toLocaleString()}</div>
        </div>
        <div className="bg-black p-2 panel-border border-red-900/50">
          <div className="text-[10px] opacity-70 uppercase tracking-tighter">Threats Removed</div>
          <div className="text-xl font-black text-neon-green">{stats.threats}</div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <div className="text-[10px] flex justify-between uppercase font-bold">
            <span>Kernel Processor Scan</span>
            <span className="neon-text">{progress.toFixed(1)}%</span>
          </div>
          <div className="h-1 bg-green-900/40 rounded-full overflow-hidden">
            <motion.div animate={{ width: `${progress}%` }} className="h-full bg-neon-green shadow-[0_0_8px_#00FF41]" />
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="text-[10px] flex justify-between uppercase font-bold">
            <span>Memory Isolation Vault</span>
            <span className="text-white">ACTIVE</span>
          </div>
          <div className="h-1 bg-green-900/40 rounded-full overflow-hidden">
            <motion.div animate={{ width: `45%` }} className="h-full bg-neon-green/60" />
          </div>
        </div>
      </div>

      <div className="bg-black/50 p-3 panel-border h-48 flex flex-col gap-2">
        <div className="text-[10px] text-white border-b border-green-900/50 pb-1 mb-1 font-bold uppercase tracking-widest">Real-time Activity Log:</div>
        <div className="flex-1 overflow-y-auto custom-scrollbar text-[10px] font-mono opacity-80 space-y-1 leading-tight">
          <div className={isScanning ? 'text-neon-green' : 'opacity-40'}>
            [SYSTEM] {isScanning ? `Skanuję: ${currentFile}` : 'Głębokie skanowanie gotowe.'}
          </div>
          <div className="text-neon-green/60">[CLEAN] No spy-code detected in Process ID: 442</div>
          <div className="text-red-400">[DETECT] Suspicious API call in App: "SocialX"</div>
          <div className="text-yellow-400">[ISOLATE] Process quarantined in secure shell</div>
          <div className="text-white">[REPAIR] Binary integrity restored...</div>
          <div className="text-neon-green">[INFO] Processor integrity: 100%</div>
          <div className="text-neon-green/40">[INFO] Anti-cloning protocol: ENABLED</div>
          {isScanning && progress > 50 && <div className="text-red-500 animate-pulse">[ALERT] Hidden rootkit fragment purged.</div>}
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 led-active rounded-full" />
          <span className="text-[10px] uppercase font-bold opacity-60">Engine: JP100% Quantum-Shield</span>
        </div>
        <button 
          onClick={startScan}
          disabled={isScanning}
          className="px-4 py-2 border border-neon-green text-black bg-neon-green hover:bg-white transition-all font-bold uppercase text-[11px]"
        >
          {isScanning ? 'Scanning...' : 'Full System Scrub'}
        </button>
      </div>
    </div>
  );
}

