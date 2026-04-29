import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  Antenna, 
  PhoneCall, 
  Menu, 
  X, 
  ShieldAlert,
  Info 
} from 'lucide-react';
import BiometricScanner from './components/BiometricScanner';
import AntiSpyScanner from './components/AntiSpyScanner';
import PrivateComm from './components/PrivateComm';
import { Category } from './types';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('biometric');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const navItems = [
    { id: 'biometric', label: 'Biometric lock Phone', icon: Lock, desc: 'Skan twarzy i oka' },
    { id: 'antispy', label: 'Antyspy ½ Antywirus', icon: Antenna, desc: 'Ochrona procesora' },
    { id: 'comm', label: 'Call ½ SMS Private', icon: PhoneCall, desc: 'Ukryte ID i VPN' },
    { id: 'deploy', label: 'Quantum Dev Cloud', icon: ShieldCheck, desc: 'Eksport APK & GitHub' },
  ];

  return (
    <div className="min-h-screen bg-dark-gray font-mono text-[13px] selection:bg-neon-green selection:text-black">
      {/* Header - High Density Specification */}
      <header className="px-6 py-4 border-b border-border-gray flex justify-between items-end bg-black/40 backdrop-blur-md sticky top-0 z-40">
        <div className="flex flex-col">
          <span className="text-[10px] opacity-70 tracking-[0.2em] font-bold">SECURED INTERFACE v4.0.2</span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-widest text-white uppercase italic">
            Jestem prywatny na 100 %
          </h1>
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-xl font-black neon-text italic">JP100% SYSTEM</div>
          <div className="flex items-center gap-2 justify-end">
            <span className="text-[10px] opacity-70">QUANTUM ENCRYPTION ACTIVE</span>
            <div className="led-active w-2 h-2 rounded-full"></div>
          </div>
        </div>
      </header>

      <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
        {/* Navigation - Mobile Friendly Tabs */}
        <nav className="flex lg:hidden gap-2 mb-6 overflow-x-auto pb-2 custom-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveCategory(item.id as Category)}
              className={`whitespace-nowrap px-4 py-2 border text-[11px] uppercase font-bold transition-all ${
                activeCategory === item.id 
                ? 'bg-neon-green/10 border-neon-green text-neon-green neon-border' 
                : 'border-border-gray text-gray-500'
              }`}
            >
              {item.label.split(' ')[0]}
            </button>
          ))}
        </nav>

        {/* High Density Grid - Desktop 3 Columns / Mobile 1 Column */}
        {activeCategory !== 'deploy' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 01. Biometry */}
            <section className={`flex flex-col gap-4 p-4 panel-border transition-all ${activeCategory === 'biometric' ? 'neon-border opacity-100' : 'opacity-40 lg:opacity-100'}`}>
              <div className="flex justify-between items-center border-b border-border-gray pb-2">
                <h2 className="font-bold uppercase tracking-tighter text-white flex items-center gap-2">
                  <span className="opacity-40">01.</span> Biometric Lock Phone
                </h2>
                <span className="bg-green-900/40 px-2 py-1 text-[10px] font-bold">JP100% SHIELD</span>
              </div>
              <BiometricScanner />
            </section>

            {/* 02. Antyspy */}
            <section className={`flex flex-col gap-4 p-4 panel-border transition-all ${activeCategory === 'antispy' ? 'neon-border opacity-100' : 'opacity-40 lg:opacity-100'}`}>
              <div className="flex justify-between items-center border-b border-border-gray pb-2">
                <h2 className="font-bold uppercase tracking-tighter text-white flex items-center gap-2">
                  <span className="opacity-40">02.</span> Antyspy ½ Antywirus
                </h2>
                <span className="bg-green-900/40 px-2 py-1 text-[10px] font-bold text-neon-green">JP100% SCAN</span>
              </div>
              <AntiSpyScanner />
            </section>

            {/* 03. Communication */}
            <section className={`flex flex-col gap-4 p-4 panel-border transition-all ${activeCategory === 'comm' ? 'neon-border opacity-100' : 'opacity-40 lg:opacity-100'}`}>
              <div className="flex justify-between items-center border-b border-border-gray pb-2">
                <h2 className="font-bold uppercase tracking-tighter text-white flex items-center gap-2">
                  <span className="opacity-40">03.</span> Call ½ SMS Private
                </h2>
                <span className="bg-green-900/40 px-2 py-1 text-[10px] font-bold">JP100% TUNNEL</span>
              </div>
              <PrivateComm />
            </section>
          </div>
        ) : (
          <div className="bg-black/60 p-8 panel-border neon-border font-mono space-y-6">
            <div className="flex items-center gap-4 border-b border-neon-green/30 pb-4">
              <ShieldCheck className="w-10 h-10 text-neon-green" />
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">Centrum Eksportu JP100%</h3>
                <p className="text-[10px] opacity-60">DOSTĘP DO ARCHIWALNYCH I NATYWNYCH ŚRODOWISK</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-neon-green/5 p-4 border border-neon-green/20">
                  <h4 className="text-xs font-bold text-neon-green mb-2 uppercase">1. Eksport na GitHub</h4>
                  <p className="text-[11px] opacity-70 mb-4">Użyj menu "Settings" w prawym górnym rogu tego okna (AI Studio), aby przesłać kod bezpośrednio do swojego repozytorium.</p>
                </div>

                <div className="bg-neon-green/5 p-4 border border-neon-green/20">
                  <h4 className="text-xs font-bold text-neon-green mb-2 uppercase">2. Generowanie APK (Android)</h4>
                  <p className="text-[11px] opacity-70 mb-2">Aby uruchomić na starszych Androidach, użyj Capacitor:</p>
                  <code className="text-[9px] block bg-black p-2 text-white/40 mb-2">
                    npm install @capacitor/core @capacitor/cli<br/>
                    npx cap init JP100 com.jp100.app<br/>
                    npx cap add android
                  </code>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-neon-green/5 p-4 border border-neon-green/20">
                  <h4 className="text-xs font-bold text-neon-green mb-2 uppercase">3. Sklep Play (Release)</h4>
                  <ul className="text-[10px] space-y-2 opacity-70">
                    <li>• Budowa: npx cap open android (w Android Studio)</li>
                    <li>• Target: SDK 33 (Wymóg Google Play)</li>
                    <li>• Min support: SDK 21 (Android 5.0+)</li>
                  </ul>
                </div>
                
                <div className="bg-red-900/10 p-4 border border-red-500/30">
                   <h4 className="text-xs font-bold text-red-500 mb-2 uppercase">Instalacja APK</h4>
                   <p className="text-[10px] opacity-60 italic">Plik .APK można zainstalować bezpośrednio na telefonie po włączeniu "Nieznanych źródeł" w ustawieniach Androida.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-8 px-8 py-4 border-t border-border-gray flex flex-col sm:flex-row justify-between gap-4 text-[10px] uppercase tracking-widest font-bold">
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><div className="led-active w-1.5 h-1.5 rounded-full" /> SYSTEM: ONLINE</span>
          <span className="text-gray-500">CPU: 42°C</span>
          <span className="text-gray-500">ENCRYPTION: AES-256-XTS</span>
        </div>
        <div className="italic text-neon-green/60">
          QUANTUM CYBERNETIC INTERFACE - JP100% STEALTH TECH
        </div>
      </footer>

      {/* Welcome Modal remains for initial briefing */}

      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-cyber-dark/95 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-lg w-full bg-cyber-grey border border-cyber-green p-8 rounded-2xl neon-border flex flex-col items-center text-center gap-6"
            >
               <ShieldAlert className="w-16 h-16 text-yellow-400 animate-pulse" />
               <div>
                  <h3 className="text-2xl font-mono font-bold neon-text mb-2 tracking-tighter uppercase underline decoration-cyber-green underline-offset-4">Inicjalizacja Systemu JP100%</h3>
                  <p className="text-sm opacity-70 leading-relaxed font-mono">
                     Uzyskujesz dostęp do "Jestem prywatny na 100%". Pamiętaj: system operuje w trybie kwantowym. Wszystkie połączenia są tunelowane przez 15 niezależnych węzłów VPN.
                  </p>
               </div>
               
               <div className="grid grid-cols-2 gap-4 w-full text-[10px] font-mono opacity-60 text-left bg-black/40 p-4 rounded-lg border border-gray-800">
                  <div>[SCAN] Face & Eye Live</div>
                  <div>[VPN] 256-bit Rotation</div>
                  <div>[CPU] Real-time Scrubbing</div>
                  <div>[LOC] Anti-cloning active</div>
               </div>

               <button 
                 onClick={() => setShowWelcome(false)}
                 className="w-full py-4 bg-cyber-green text-black font-black uppercase tracking-widest rounded hover:bg-cyber-green/80 transition-all font-mono"
               >
                 AKCEPTUJĘ I WCHODZĘ
               </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

