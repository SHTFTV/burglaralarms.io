import React from 'react';
import { 
  ShieldCheck, 
  Mail, 
  MapPin, 
  Lock, 
  Award, 
  CheckCircle
} from 'lucide-react';
import { alarmAudio } from '../utils/audioSynthesizer';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenQuote }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      
      {/* Compliance & Standards Bar */}
      <div className="border-b border-slate-800/80 py-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-amber-400 font-bold block text-sm">UL 1023 / UL 2050</span>
              <span className="text-[10px] text-slate-400">Certified Central Dispatch</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-emerald-400 font-bold block text-sm">SIA CP-01</span>
              <span className="text-[10px] text-slate-400">False Alarm Reduction Standard</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-cyan-400 font-bold block text-sm">AES-256</span>
              <span className="text-[10px] text-slate-400">Rolling Code RF Encryption</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-purple-400 font-bold block text-sm">NFPA 72</span>
              <span className="text-[10px] text-slate-400">National Fire & Life Safety</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Col (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-lg font-black text-white font-mono">
                burglaralarms<span className="text-amber-400">.io</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An interactive planning and education tool for designing and comparing residential and commercial intrusion alarm systems, hardware, and monitoring options before you buy.
            </p>
          </div>

          {/* Nav Col (3 cols) */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Interactive Tools
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => { setActiveTab('builder'); alarmAudio.playKeypadBeep(); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  System Builder & Cost Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('simulator'); alarmAudio.playDoorChime(); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Virtual Zone Floorplan Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('keypad'); alarmAudio.playKeypadBeep(); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Live Interactive Keypad Terminal
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('audit'); alarmAudio.playKeypadBeep(); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  8-Point Risk Assessment Audit
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('soundlab'); alarmAudio.playKeypadBeep(); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Alarm Siren Sound Bench
                </button>
              </li>
            </ul>
          </div>

          {/* Resources Col (2 cols) */}
          <div className="md:col-span-2 space-y-2.5">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Guides & Specs
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => { setActiveTab('tech'); alarmAudio.playKeypadBeep(); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Hardwired vs Wireless
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('monitoring'); alarmAudio.playKeypadBeep(); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  24/7 UL Monitoring Plans
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('knowledge'); alarmAudio.playKeypadBeep(); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Municipal Alarm Permits
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('knowledge'); alarmAudio.playKeypadBeep(); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  False Alarm Prevention
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency Hotline Col (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Emergency & Consultation
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-[11px] text-slate-400">
                This tool doesn't dispatch technicians or monitoring itself. Use it to plan your system, then take your saved spec to a licensed installer or monitoring provider in your area.
              </div>
            </div>

            <button
              onClick={() => { onOpenQuote(); alarmAudio.playKeypadBeep(); }}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs shadow-md transition-all"
            >
              Build & Save My Spec
            </button>
          </div>

        </div>

        {/* Parent Brand Bar */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 font-mono">
          <div>
            A Division of <span className="text-slate-300">Builders Haus</span> • Powered by <span className="text-slate-300">Industry Army Marketing</span>
          </div>
          <a
            href="mailto:build@buildershaus.com"
            className="hover:text-amber-400 transition-colors"
          >
            Guest post with us
          </a>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} BurglarAlarms.io. All rights reserved. An educational security-planning tool, not a licensed alarm or monitoring provider.
          </div>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
