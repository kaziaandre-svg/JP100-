
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageSquare, Globe, Shield, Send, Clock, PhoneOff, Lock } from 'lucide-react';
import { CommLog } from '../types';

export default function PrivateComm() {
  const [activeTab, setActiveTab] = useState<'calls' | 'sms'>('calls');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [currentVpn, setCurrentVpn] = useState('Switzerland');
  const [logs, setLogs] = useState<CommLog[]>([]);
  const [isVpnShifting, setIsVpnShifting] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const countries = [
    'Switzerland', 'Iceland', 'Panama', 'Seychelles', 'Bermuda',
    'Romania', 'Malaysia', 'Singapore', 'Netherlands', 'Norway',
    'Finland', 'Cayman Islands', 'Malta', 'Gibraltar', 'Virgin Islands'
  ];

  useEffect(() => {
    const vpnInterval = setInterval(() => {
      setIsVpnShifting(true);
      setTimeout(() => {
        setCurrentVpn(countries[Math.floor(Math.random() * countries.length)]);
        setIsVpnShifting(false);
      }, 500);
    }, 5000);

    return () => clearInterval(vpnInterval);
  }, []);

  useEffect(() => {
    let interval: any;
    if (isCalling) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [isCalling]);

  const handleDial = (num: string) => {
    if (phoneNumber.length < 15) setPhoneNumber(prev => prev + num);
  };

  const [showConfirm, setShowConfirm] = useState(false);

  const initiateCall = () => {
    if (!phoneNumber) {
      alert("PROSZĘ WPROWADZIĆ NUMER");
      return;
    }
    setShowConfirm(true);
  };

  const confirmCall = () => {
    setShowConfirm(false);
    setIsCalling(true);
    const newLog: CommLog = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'call',
      target: phoneNumber,
      timestamp: new Date().toLocaleTimeString(),
      vpnLocation: currentVpn,
      status: 'ACTIVE'
    };
    setLogs([newLog, ...logs]);
    
    // Real-world integration: Trigger system dialer
    // This will open the phone's native calling app with the number
    window.location.href = `tel:${phoneNumber}`;
  };

  const startCall = initiateCall; // Alias for consistency

  const endCall = () => {
    setIsCalling(false);
    alert("POŁĄCZENIE ZAKOŃCZONE. ID MASKOWANE POMYŚLNIE.");
    setPhoneNumber('');
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const executeSms = () => {
    if (!phoneNumber || !message) {
      alert("PROSZĘ PODAĆ NUMER I TREŚĆ");
      return;
    }
    const newLog: CommLog = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'sms',
      target: phoneNumber,
      timestamp: new Date().toLocaleTimeString(),
      content: message,
      vpnLocation: currentVpn
    };
    setLogs([newLog, ...logs]);
    // Simulate audio chime for SMS
    playTone(880, 0.1);
    alert(`Packet encrypted and routed via ${currentVpn}.`);
    setMessage('');
    setPhoneNumber('');
  };

  const playTone = (freq: number, duration: number) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Audio Context blocked by browser policy. Interaction required.");
    }
  };

  const playCallingTone = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(480, audioCtx.currentTime + 1);
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    oscillator.start();
    return () => {
      oscillator.stop();
      audioCtx.close();
    };
  };

  useEffect(() => {
    let stopTone: () => void;
    if (isCalling) {
      stopTone = playCallingTone();
    }
    return () => {
      if (stopTone) stopTone();
    };
  }, [isCalling]);

  return (
    <div className="flex flex-col gap-4 font-mono">
      {/* User's Personal Secure ID */}
      <div className="bg-neon-green p-1 mb-2">
         <div className="bg-black p-2 flex justify-between items-center border border-neon-green/50">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 led-active rounded-full" />
               <span className="text-[10px] font-black uppercase text-neon-green">Twój Prywatny Numer JP100%:</span>
            </div>
            <span className="text-white font-black tracking-widest">+48 700 *** 100</span>
         </div>
      </div>

      {/* VPN Banner */}
      <div className="bg-black/80 px-4 py-2 panel-border flex items-center justify-between border-neon-green/40">
        <div className="flex flex-col">
          <span className="text-[9px] opacity-70 uppercase tracking-tighter">VPN Rotation (5s)</span>
          <span className="text-white font-bold text-xs underline decoration-neon-green shadow-neon-green">GATEWAY: {currentVpn.toUpperCase()}</span>
        </div>
        <div className="text-right">
          <span className="text-[9px] block opacity-70 uppercase">SIM ID Status</span>
          <span className="text-neon-green font-bold uppercase text-[11px] animate-pulse flex items-center gap-1">
             <Lock className="w-3 h-3" /> HIDDEN
          </span>
        </div>
      </div>

      <div className="bg-black/30 p-4 panel-border flex flex-col gap-4 relative overflow-hidden">
        {/* Confirmation Dialog Overlay */}
        <AnimatePresence>
          {showConfirm && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 border-2 border-neon-green text-center"
            >
              <Shield className="w-12 h-12 text-neon-green mb-4 animate-pulse" />
              <h4 className="text-sm font-black text-white uppercase mb-2">Potwierdź Połączenie</h4>
              <p className="text-[10px] opacity-60 mb-6">Numer docelowy: <span className="text-neon-green">{phoneNumber}</span><br/>Połączenie zostanie przekierowane przez kartę SIM i zamaskowane przez JP100%.</p>
              
              <div className="flex gap-2 w-full">
                <button 
                  onClick={confirmCall}
                  className="flex-1 py-3 bg-neon-green text-black font-black uppercase text-[11px] shadow-[0_0_15px_rgba(0,255,65,0.4)]"
                >
                  POŁĄCZ TERAZ
                </button>
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-3 border border-border-gray text-gray-500 uppercase text-[11px]"
                >
                  ANULUJ
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isCalling && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 z-20 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 border-2 border-neon-green/50 animate-pulse"
          >
             <div className="w-20 h-20 rounded-full border-2 border-neon-green flex items-center justify-center mb-4 relative">
                <div className="absolute inset-0 border border-neon-green rounded-full animate-ping opacity-20" />
                <Phone className="w-10 h-10 text-neon-green" />
             </div>
             <p className="text-[10px] opacity-50 uppercase tracking-widest mb-1">Dzwonienie przez Sieć Operatora (SIM)...</p>
             <h3 className="text-2xl font-black text-white mb-2">{phoneNumber}</h3>
             <div className="text-neon-green font-bold text-lg mb-8">{formatTime(callDuration)}</div>
             
             <div className="text-[10px] text-neon-green/60 mb-6 flex items-center gap-2">
                <Shield className="w-3 h-3" /> ID ZAMASKOWANE PRZEZ JP100-TUNNEL
             </div>

             <button 
               onClick={endCall}
               className="w-full py-4 bg-red-600/20 border border-red-500 text-red-500 font-black uppercase text-sm flex items-center justify-center gap-3 hover:bg-red-600 hover:text-white transition-all shadow-[0_0_20px_rgba(255,0,0,0.3)]"
             >
               <PhoneOff className="w-6 h-6" /> ROZŁĄCZ
             </button>
          </motion.div>
        )}

        <div className="flex gap-1">
          {['calls', 'sms'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 py-1 text-[10px] uppercase font-black transition-all border ${activeTab === tab ? 'bg-neon-green text-black border-neon-green shadow-neon-green' : 'border-border-gray text-gray-600'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-black border border-border-gray p-2 text-center text-neon-green font-black text-lg tracking-[0.2em] h-12 flex items-center justify-center relative">
          {phoneNumber || <span className="opacity-10 text-xs">AWAITING INPUT...</span>}
          {phoneNumber && (
            <button 
              onClick={() => setPhoneNumber(prev => prev.slice(0, -1))}
              className="absolute right-2 p-2 opacity-50 hover:opacity-100"
            >
              <Send className="w-4 h-4 rotate-180" />
            </button>
          )}
        </div>

        {activeTab === 'calls' ? (
          <div className="grid grid-cols-3 gap-1">
            {['1','2','3','4','5','6','7','8','9','*','0','#'].map(key => (
              <button 
                key={key} 
                onClick={() => handleDial(key)}
                className="py-3 bg-black/40 border border-border-gray text-white hover:border-neon-green hover:text-neon-green active:scale-95 transition-all text-xl"
              >
                {key}
              </button>
            ))}
            <button 
              onClick={startCall}
              className="col-span-3 py-4 bg-neon-green/10 border border-neon-green text-neon-green font-black uppercase text-sm hover:bg-neon-green hover:text-black transition-all shadow-[0_0_10px_rgba(0,255,65,0.2)] mt-2 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" /> POŁĄCZ (SIM INTEGRATED)
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-black/80 border border-border-gray p-3 h-24 text-[11px] text-neon-green resize-none outline-none focus:border-neon-green transition-all placeholder:opacity-10"
              placeholder="ENCRYPTED MESSAGE CONTENT..."
            />
            <button 
              onClick={executeSms}
              className="py-4 bg-neon-green/10 border border-neon-green text-neon-green font-black uppercase text-sm hover:bg-neon-green hover:text-black transition-all shadow-[0_0_10px_rgba(0,255,65,0.2)] flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" /> WYŚLIJ PRZEZ TUNEL
            </button>
          </div>
        )}
      </div>

      {/* Logs Table */}
      <div className="bg-black/60 p-3 panel-border flex flex-col gap-2 h-40">
        <div className="text-[10px] text-white font-bold flex justify-between uppercase tracking-tighter">
          <span>Stealth Activity Logs:</span>
          <span className="opacity-40 flex items-center gap-1"><div className="w-1.5 h-1.5 bg-neon-green rounded-full shadow-neon-green" /> SESSION LIVE</span>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1">
          {logs.length === 0 && <div className="text-[10px] opacity-20 italic">No encrypted traffic detected in this session.</div>}
          {logs.map(log => (
            <div key={log.id} className="flex justify-between items-center text-[10px] border-l-2 border-neon-green pl-2 py-1 border-b border-white/5 bg-white/5">
              <div className="flex flex-col">
                <span className="text-white font-bold uppercase tracking-tight">{log.type} TO: {log.target}</span>
                <span className="text-[9px] opacity-40">{log.timestamp}</span>
              </div>
              <span className="text-neon-green font-bold text-[9px] px-2 border border-neon-green/30">MASKED via {log.vpnLocation}</span>
            </div>
          ))}
        </div>
      </div>
      
      <button className="w-full py-2 bg-green-900/40 border border-neon-green/40 text-[9px] uppercase font-bold hover:bg-green-800 transition-colors">
        REFRESH OPERATOR PERMISSIONS
      </button>
    </div>
  );
}

