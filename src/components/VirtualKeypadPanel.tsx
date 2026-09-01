import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Radio, 
  BatteryMedium, 
  AlertTriangle, 
  Moon, 
  Bell, 
  Volume2, 
  KeyRound, 
  CheckCircle2, 
  Hash,
  SlidersHorizontal
} from 'lucide-react';
import { alarmAudio } from '../utils/audioSynthesizer';
import { INITIAL_ZONES } from '../data/equipmentData';
import { ZoneItem } from '../types/security';

export const VirtualKeypadPanel: React.FC = () => {
  const [pin, setPin] = useState<string>('');
  const [statusText, setStatusText] = useState<string>('SYSTEM READY TO ARM');
  const [armMode, setArmMode] = useState<'disarmed' | 'stay' | 'away' | 'night'>('disarmed');
  const [zones, setZones] = useState<ZoneItem[]>(INITIAL_ZONES);
  const [chimeEnabled, setChimeEnabled] = useState<boolean>(true);
  const [guestCode, setGuestCode] = useState<string | null>(null);

  const handleDigit = (d: string) => {
    alarmAudio.playKeypadBeep();
    if (pin.length < 4) {
      setPin(prev => prev + d);
    }
  };

  const handleClear = () => {
    alarmAudio.playKeypadBeep();
    setPin('');
  };

  const handleArmAction = (mode: 'stay' | 'away' | 'night') => {
    if (armMode !== 'disarmed') {
      setStatusText('DISARM FIRST WITH MASTER PIN');
      alarmAudio.playKeypadBeep();
      return;
    }
    alarmAudio.playArmTone();
    setArmMode(mode);
    if (mode === 'stay') setStatusText('ARMED [STAY] - INTERIOR BYPASSED');
    if (mode === 'away') setStatusText('ARMED [AWAY] - ALL ZONES ACTIVE');
    if (mode === 'night') setStatusText('ARMED [NIGHT INSTANT] - 0s DELAY');
  };

  const handleDisarm = () => {
    if (pin === '1234' || (guestCode && pin === guestCode)) {
      alarmAudio.playDisarmTone();
      setArmMode('disarmed');
      setStatusText('SYSTEM DISARMED - ALL ZONES SECURE');
      setPin('');
    } else if (pin === '9999') {
      alarmAudio.playDisarmTone();
      setArmMode('disarmed');
      setStatusText('SYSTEM DISARMED (DURESS SIGNAL SENT TO 911)');
      setPin('');
    } else {
      alarmAudio.playKeypadBeep();
      setStatusText('INVALID MASTER CODE (Try 1234)');
      setPin('');
    }
  };

  const toggleZoneBypass = (zoneId: string) => {
    setZones(prev => prev.map(z => {
      if (z.id === zoneId) {
        const nextStatus = z.status === 'bypassed' ? 'normal' : 'bypassed';
        alarmAudio.playKeypadBeep();
        return { ...z, status: nextStatus };
      }
      return z;
    }));
  };

  const generateGuestCode = () => {
    const randomPin = Math.floor(1000 + Math.random() * 9000).toString();
    setGuestCode(randomPin);
    alarmAudio.playDoorChime();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold mb-2">
            <KeyRound className="w-3.5 h-3.5" />
            <span>COMMERCIAL GRADE ACCESS TERMINAL</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Interactive Security Control Keypad
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Simulate master user controls, test stay/away modes, toggle zone bypasses, and generate temporary contractor or guest passcodes.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-slate-400 bg-slate-900 p-2.5 rounded-xl border border-slate-800 self-start md:self-auto">
          <span className="flex items-center gap-1.5 text-cyan-400">
            <Radio className="w-4 h-4" /> 5G Dual SIM: 100%
          </span>
          <span>|</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <BatteryMedium className="w-4 h-4" /> AC Mains: 120V OK
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Realistic Physical Keypad Unit (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900/95 border-2 border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            
            {/* Top Keypad Status Display */}
            <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl p-5 mb-6 shadow-inner relative overflow-hidden">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800/80 pb-2 mb-3">
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${armMode === 'disarmed' ? 'bg-emerald-400' : 'bg-red-500 animate-ping'}`} />
                  <strong className="text-white">AEGIS TOUCH COMMAND</strong>
                </span>
                <span className="text-amber-400 font-bold">NODE ID #001</span>
              </div>

              <div className="text-center py-2">
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 mb-1">
                  {statusText}
                </div>
                <div className="text-3xl font-mono font-black text-white tracking-widest h-9 flex items-center justify-center">
                  {pin ? pin.replace(/./g, '•') : '----'}
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-800/80">
                <span>PRESS 1234 + DISARM</span>
                <span>DURESS: 9999</span>
              </div>
            </div>

            {/* Arm Mode Quick Access Function Buttons */}
            <div className="grid grid-cols-3 gap-3 mb-6 font-mono text-xs font-bold">
              <button
                onClick={() => handleArmAction('away')}
                className={`py-3.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all active:scale-95 ${
                  armMode === 'away'
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-200 border-slate-800'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>ARM AWAY</span>
              </button>

              <button
                onClick={() => handleArmAction('stay')}
                className={`py-3.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all active:scale-95 ${
                  armMode === 'stay'
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-200 border-slate-800'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>ARM STAY</span>
              </button>

              <button
                onClick={() => handleArmAction('night')}
                className={`py-3.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all active:scale-95 ${
                  armMode === 'night'
                    ? 'bg-indigo-500 text-white border-indigo-400 shadow-lg'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-200 border-slate-800'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span>NIGHT INSTANT</span>
              </button>
            </div>

            {/* Numeric Keypad Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6 font-mono">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'CLR', '0', 'DISARM'].map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    if (key === 'CLR') handleClear();
                    else if (key === 'DISARM') handleDisarm();
                    else handleDigit(key);
                  }}
                  className={`py-4 rounded-2xl border text-base font-bold transition-all shadow-md active:scale-95 flex items-center justify-center ${
                    key === 'DISARM'
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white border-emerald-400'
                      : key === 'CLR'
                      ? 'bg-slate-800 hover:bg-slate-700 text-rose-400 border-slate-700'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-100 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>

            {/* Bottom Controls: Chime and Guest PIN */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setChimeEnabled(!chimeEnabled);
                  alarmAudio.playDoorChime();
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all ${
                  chimeEnabled
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                    : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Door Chime: {chimeEnabled ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={generateGuestCode}
                className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-cyan-400 transition-all flex items-center gap-2"
              >
                <Hash className="w-3.5 h-3.5" />
                <span>{guestCode ? `Guest PIN: ${guestCode}` : 'Generate 24h Guest PIN'}</span>
              </button>
            </div>

          </div>
        </div>

        {/* Right Column: Zone Supervisor & Bypassing Matrix (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div>
                <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                  ZONE STATUS & BYPASS CONTROLS
                </span>
                <h3 className="text-base font-bold text-white">Supervised Sensor Loops</h3>
              </div>
              <span className="text-xs font-mono text-slate-400">7 Total Zones</span>
            </div>

            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Bypassing allows specific windows or garage doors to remain open while the rest of the house remains fully armed.
            </p>

            <div className="space-y-2.5 font-mono text-xs">
              {zones.map((zone) => {
                const isBypassed = zone.status === 'bypassed';
                return (
                  <div
                    key={zone.id}
                    className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                      isBypassed
                        ? 'bg-amber-950/20 border-amber-500/40 text-amber-300'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2.5 h-2.5 rounded-full ${isBypassed ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                      <div>
                        <div className="font-bold text-white">Zone 0{zone.zoneNumber}: {zone.name}</div>
                        <div className="text-[10px] text-slate-400">{zone.room} • {zone.type.replace('_', ' ')}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleZoneBypass(zone.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                        isBypassed
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-900 text-slate-300 hover:text-white border-slate-700 hover:bg-slate-800'
                      }`}
                    >
                      {isBypassed ? 'BYPASSED' : 'BYPASS'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
