import React from 'react';
import { 
  ShieldCheck, 
  SlidersHorizontal, 
  Radio, 
  Activity, 
  Lock, 
  Zap, 
  CheckCircle,
  FileCheck2,
  Volume2
} from 'lucide-react';
import { alarmAudio } from '../utils/audioSynthesizer';

interface HeroSectionProps {
  setActiveTab: (tab: string) => void;
  onOpenQuote: () => void;
  systemState: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setActiveTab, onOpenQuote, systemState }) => {
  return (
    <div className="relative overflow-hidden bg-slate-950 border-b border-slate-800 bg-security-grid py-12 md:py-16">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Next-Gen UL 1023 & SIA CP-01 Certified Alarm Architecture</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Military-Grade Perimeter & <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                Intrusion Alarm Systems
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Design, simulate, and configure zero-compromise burglar alarms for modern homes, commercial facilities, and high-value properties. Featuring dual-carrier 5G cellular failover, volumetric dual-tech PIR, acoustic glassbreak detection, and sub-15 second central station response.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setActiveTab('builder');
                  alarmAudio.playKeypadBeep();
                }}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition-all font-mono"
              >
                <SlidersHorizontal className="w-4 h-4 stroke-[2.5]" />
                <span>BUILD CUSTOM ALARM</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('simulator');
                  alarmAudio.playDoorChime();
                }}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-all font-mono"
              >
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>TEST VIRTUAL ZONE LAB</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('audit');
                  alarmAudio.playKeypadBeep();
                }}
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-800 text-sm transition-all"
              >
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <span>8-Point Risk Audit</span>
              </button>
            </div>

            {/* Key trust badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Dual-SIM 5G Cellular</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Crash & Smash Defense</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Up to 20% Insurance Rebate</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Telemetry & Control Panel Widget */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-2xl backdrop-blur-xl">
              
              {/* Top Panel bar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs text-slate-200 font-bold uppercase tracking-wider">
                    AEGIS PRO HUB STATUS
                  </span>
                </div>
                <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  SYSTEM READY
                </span>
              </div>

              {/* Status matrix */}
              <div className="grid grid-cols-2 gap-3 mb-4 font-mono text-xs">
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Communication</div>
                  <div className="text-slate-100 font-semibold flex items-center gap-1.5 mt-0.5">
                    <Radio className="w-3.5 h-3.5 text-cyan-400" />
                    <span>5G LTE-M Primary</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-1">Fiber Fallback Ready</div>
                </div>

                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Emergency Power</div>
                  <div className="text-slate-100 font-semibold flex items-center gap-1.5 mt-0.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>24h Li-Ion Reserve</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-1">AC Mains: 120V OK</div>
                </div>
              </div>

              {/* Live Zone Ticker */}
              <div className="bg-slate-950/90 rounded-xl border border-slate-800 p-3 mb-4">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                  <span>ACTIVE SUPERVISED ZONES</span>
                  <span className="text-emerald-400 font-bold">7 / 7 SECURE</span>
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex items-center justify-between py-1 px-2 rounded bg-slate-900/60 border border-slate-800/60 text-slate-300">
                    <span className="flex items-center gap-2">
                      <Lock className="w-3 h-3 text-emerald-400" />
                      <span>Z01: Front Entry Magnetic</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">CLOSED</span>
                  </div>

                  <div className="flex items-center justify-between py-1 px-2 rounded bg-slate-900/60 border border-slate-800/60 text-slate-300">
                    <span className="flex items-center gap-2">
                      <Activity className="w-3 h-3 text-emerald-400" />
                      <span>Z03: Main Hall PIR Microwave</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">CLEAR</span>
                  </div>

                  <div className="flex items-center justify-between py-1 px-2 rounded bg-slate-900/60 border border-slate-800/60 text-slate-300">
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>Z04: Patio Acoustic Glassbreak</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">ARMED</span>
                  </div>
                </div>
              </div>

              {/* Quick Interactive Test Banner */}
              <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">Interactive Zone Testing</div>
                  <div className="text-[11px] text-slate-400">Simulate break-in triggers and sirens in real-time</div>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('simulator');
                    alarmAudio.playDoorChime();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-bold transition-all whitespace-nowrap"
                >
                  Launch Lab →
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
