import React from 'react';
import { ShieldCheck, Volume2, VolumeX, Sparkles, FileText } from 'lucide-react';
import { alarmAudio } from '../utils/audioSynthesizer';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenQuote: () => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  systemState: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenQuote,
  isMuted,
  setIsMuted,
  systemState,
}) => {
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    alarmAudio.setMuted(nextMuted);
    if (!nextMuted) {
      alarmAudio.playKeypadBeep();
    }
  };

  const navItems = [
    { id: 'builder', label: 'System Builder' },
    { id: 'simulator', label: 'Virtual Zone Lab' },
    { id: 'keypad', label: 'Live Keypad' },
    { id: 'audit', label: 'Security Audit' },
    { id: 'tech', label: 'Hardware Specs' },
    { id: 'soundlab', label: 'Siren Audio Lab' },
    { id: 'monitoring', label: '24/7 Monitoring' },
    { id: 'knowledge', label: 'Permits & FAQs' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      {/* Top informational banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-slate-300 font-semibold tracking-wider text-[11px]">
              INTERACTIVE SECURITY PLANNING & EDUCATION TOOL
            </span>
          </div>
          <span className="hidden md:inline text-slate-400 font-mono text-[11px]">
            Compare systems, estimate costs, and learn the standards — not a licensed monitoring provider
          </span>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('builder')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/30 transition-all border border-amber-400/40">
            <ShieldCheck className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-white font-mono">
                burglaralarms<span className="text-amber-400 font-mono">.io</span>
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              Intrusion Detection & Security Engineering
            </p>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          {navItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                alarmAudio.playKeypadBeep();
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Right action controls */}
        <div className="flex items-center gap-2.5">
          {/* Sound Toggle */}
          <button
            onClick={toggleMute}
            title={isMuted ? 'Unmute alarm sound feedback' : 'Mute alarm sound feedback'}
            className={`p-2 rounded-lg border transition-all text-xs font-mono flex items-center gap-1.5 ${
              isMuted
                ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/60'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Audio Live'}</span>
          </button>

          {/* Instant Proposal / Quote button */}
          <button
            onClick={() => {
              onOpenQuote();
              alarmAudio.playKeypadBeep();
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all font-mono"
          >
            <FileText className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>INSTANT QUOTE</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="lg:hidden flex overflow-x-auto gap-1 px-4 py-2 bg-slate-900/90 border-t border-slate-800/60 no-scrollbar">
        {navItems.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              alarmAudio.playKeypadBeep();
            }}
            className={`px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white bg-slate-950/60 border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
};
