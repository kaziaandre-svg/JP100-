
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, ShieldAlert, Scan, Eye, MapPin, UserCheck, ShieldClose } from 'lucide-react';
import { ScanLog } from '../types';

export default function BiometricScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanType, setScanType] = useState<'face' | 'eye'>('face');
  const [attempts, setAttempts] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [logs, setLogs] = useState<ScanLog[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
      setIsScanning(true);
    } catch (err) {
      console.error("Camera access denied", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsScanning(false);
  };

  const handleScan = () => {
    const success = Math.random() > 0.4;
    
    if (success) {
      alert("Autoryzacja pomyślna. Dostęp przyznany.");
      setAttempts(0);
      setIsScanning(false);
      setShowWarning(false);
      stopCamera();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 3) {
        setShowWarning(true);
        triggerSecurityProtocol();
      } else {
        setScanType('eye');
      }
    }
  };

  const triggerSecurityProtocol = () => {
    const newLog: ScanLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      type: scanType,
      status: 'denied',
      location: { lat: 52.2297, lng: 21.0122 },
    };
    setLogs([newLog, ...logs]);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Scanner Visualizer */}
      <div className="relative aspect-square sm:aspect-video bg-black/60 rounded border border-neon-green/30 overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute top-2 left-2 text-[9px] opacity-50 flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> LIVE FEED: {scanType.toUpperCase()}
        </div>
        
        {isScanning ? (
          <div className="w-full h-full relative">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover opacity-40" />
            <div className="scanline" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-32 h-32 border-2 ${attempts > 1 ? 'border-red-500' : 'border-neon-green'} rounded-full animate-pulse flex items-center justify-center relative`}>
                 <div className="absolute inset-0 border border-neon-green/10 rounded-full animate-ping" />
                 {scanType === 'face' ? <UserCheck className="w-12 h-12" /> : <Eye className="w-12 h-12" />}
              </div>
            </div>
            <div className="absolute bottom-4 left-0 right-0 px-4 flex gap-2">
               <button 
                 onClick={handleScan}
                 className="flex-1 py-2 bg-neon-green text-black font-bold uppercase text-[11px] hover:bg-white transition-all shadow-[0_0_15px_rgba(0,255,65,0.4)]"
               >
                 EXECUTE SCAN
               </button>
               <button 
                 onClick={stopCamera}
                 className="px-4 py-2 bg-red-900/20 border border-red-500 text-red-500 uppercase text-[11px]"
               >
                 ABORT
               </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-10">
             {!showWarning ? (
               <>
                 <Scan className="w-16 h-16 opacity-20" />
                 <button 
                   onClick={startCamera}
                   className="px-8 py-3 border border-neon-green text-neon-green font-bold uppercase tracking-widest hover:bg-neon-green/10 transition-all text-[11px]"
                 >
                   Inicjuj Biometrię
                 </button>
                 <p className="text-[10px] opacity-40">WYMAGANA WERYFIKACJA WŁAŚCICIELA</p>
               </>
             ) : (
               <div className="text-red-500 flex flex-col items-center gap-2 p-4 text-center">
                  <ShieldAlert className="w-16 h-16 animate-bounce" />
                  <p className="text-sm font-bold uppercase">System Lockout Active</p>
                  <p className="text-[10px] opacity-60">Przekroczono limit prób. Dane logowania zapisane.</p>
               </div>
             )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Protection Toggles */}
        <div className="bg-black/40 p-3 panel-border flex flex-col gap-2">
          <div className="text-[10px] text-white opacity-70 uppercase tracking-widest mb-1">Protection Matrix</div>
          {['GALLERY', 'MESSAGES', 'BANKING', 'CONTACTS'].map(app => (
            <div key={app} className="flex justify-between items-center text-[11px] p-1 border-b border-white/5 last:border-0 hover:bg-neon-green/5 transition-colors">
              <span>{app} PROTECTION:</span>
              <span className="text-white font-bold flex items-center gap-2">
                ENABLED <div className="led-active w-1.5 h-1.5 rounded-full" />
              </span>
            </div>
          ))}
        </div>

        {/* Intelligence Log */}
        <div className="bg-black/60 p-3 panel-border h-32 overflow-hidden flex flex-col">
          <div className="text-[10px] text-red-500 font-bold mb-2 uppercase tracking-tighter">Intrusion Intelligence Logs:</div>
          <div className="flex-1 overflow-y-auto custom-scrollbar text-[10px] font-mono opacity-80 space-y-1">
            {logs.length === 0 && <div className="opacity-30 italic">[MONITORING STATUS: ACTIVE - NO THREATS]</div>}
            {logs.map(log => (
              <div key={log.id} className="text-red-400">
                [{log.timestamp}] INTRUSION DETECTED | {log.type.toUpperCase()} MISMATCH | LOC: {log.location?.lat}, {log.location?.lng}
              </div>
            ))}
            <div className="opacity-30">[{new Date().toLocaleTimeString()}] DEVICE OWNER AUTO-VERIFIED STATUS: OK</div>
          </div>
        </div>
      </div>
    </div>
  );
}

