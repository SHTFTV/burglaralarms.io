import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Square, 
  Flame, 
  AlertTriangle, 
  ShieldAlert, 
  Bell, 
  Timer,
  Info
} from 'lucide-react';
import { alarmAudio } from '../utils/audioSynthesizer';

export const SirenSoundTester: React.FC = () => {
  const [activeSound, setActiveSound] = useState<string | null>(null);

  const testAudio = (type: 'burglar_siren' | 'fire_t3' | 'co_t4' | 'strobe_chime' | 'entry_delay') => {
    alarmAudio.stopContinuousSiren();
    setActiveSound(type);
    alarmAudio.playTestSample(type);
    setTimeout(() => {
      setActiveSound(null);
    }, type === 'burglar_siren' ? 3200 : 2500);
  };

  const stopAllAudio = () => {
    alarmAudio.stopContinuousSiren();
    setActiveSound(null);
  };

  const soundProfiles = [
    {
      id: 'burglar_siren',
      type: 'burglar_siren' as const,
      title: '115dB High-Decibel Outdoor Intrusion Warble',
      dbRating: '115 dB at 1m',
      desc: 'Dual-tone modulated sweeping square wave designed to disorient intruders and alert neighbors within 400 meters.',
      icon: ShieldAlert,
      color: 'text-amber-400',
      border: 'hover:border-amber-500/50'
    },
    {
      id: 'fire_t3',
      type: 'fire_t3' as const,
      title: 'NFPA 72 Temporal 3 (T3) Fire Alarm Cadence',
      dbRating: '85 - 95 dB (Life Safety)',
      desc: 'Standardized 3-pulse cadence (0.5s on, 0.5s off, 0.5s on, 0.5s off, 0.5s on, 1.5s pause) for smoke & heat emergencies.',
      icon: Flame,
      color: 'text-rose-400',
      border: 'hover:border-rose-500/50'
    },
    {
      id: 'co_t4',
      type: 'co_t4' as const,
      title: 'Temporal 4 (T4) Carbon Monoxide Alarm Code',
      dbRating: '85 dB (NFPA 720)',
      desc: 'Distinctive 4-pulse rapid cadence alerting occupants to deadly, odorless carbon monoxide gas leaks.',
      icon: AlertTriangle,
      color: 'text-orange-400',
      border: 'hover:border-orange-500/50'
    },
    {
      id: 'entry_delay',
      type: 'entry_delay' as const,
      title: 'Keypad Entry Delay Warning Countdown',
      dbRating: '75 dB (Indoor Keypad)',
      desc: 'Escalating warning beeps prompting homeowners to enter their disarm PIN before central station dispatch.',
      icon: Timer,
      color: 'text-cyan-400',
      border: 'hover:border-cyan-500/50'
    },
    {
      id: 'strobe_chime',
      type: 'strobe_chime' as const,
      title: 'Pleasant Dual-Tone Door & Window Chime',
      dbRating: '65 dB (Ambient Ambient)',
      desc: 'Friendly 2-tone melodic chime announcing family arrivals, customer entry, or children opening doors.',
      icon: Bell,
      color: 'text-emerald-400',
      border: 'hover:border-emerald-500/50'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold mb-2">
            <Volume2 className="w-3.5 h-3.5" />
            <span>WEB AUDIO FREQUENCY TEST BENCH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Alarm Sound & Siren Acoustic Lab
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Test the audible alarm patterns, decibel levels, and siren cadences used in Aegis security systems. Synthesized dynamically with Web Audio API.
          </p>
        </div>

        <button
          onClick={stopAllAudio}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-rose-400 self-start sm:self-auto"
        >
          <Square className="w-3.5 h-3.5 fill-current" />
          <span>Stop All Audio</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {soundProfiles.map((sound) => {
          const IconComponent = sound.icon;
          const isPlaying = activeSound === sound.type;
          return (
            <div
              key={sound.id}
              className={`bg-slate-900/90 border rounded-2xl p-6 shadow-xl transition-all flex flex-col justify-between ${
                isPlaying 
                  ? 'border-amber-400 bg-slate-900 ring-2 ring-amber-400/20' 
                  : `border-slate-800 ${sound.border}`
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className={`p-3 rounded-xl bg-slate-950 border border-slate-800 ${sound.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    {sound.dbRating}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">{sound.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {sound.desc}
                </p>
              </div>

              <button
                onClick={() => testAudio(sound.type)}
                className={`w-full py-3 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                  isPlaying
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-amber-400'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Volume2 className="w-4 h-4 animate-bounce" />
                    <span>PLAYING TONE (3s)...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>TEST AUDIO PATTERN</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
};
