import React from 'react';
import { 
  Cpu, 
  Radio, 
  ShieldCheck, 
  Zap, 
  Waves, 
  Activity, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  Eye,
  Dog
} from 'lucide-react';
import { HARDWARE_COMPARISON } from '../data/guideData';
import { alarmAudio } from '../utils/audioSynthesizer';

export const HardwareTechMatrix: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      
      {/* Header */}
      <div className="mb-8 border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold mb-2">
          <Cpu className="w-3.5 h-3.5" />
          <span>ENGINEERING SPECIFICATIONS & PROTOCOL ARCHITECTURE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Hardwired vs. Wireless Security Hardware Matrix
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Understand the physics, transmission protocols, anti-jamming safeguards, and false-alarm prevention algorithms powering modern intrusion alarm systems.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl mb-12">
        <div className="p-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
            Architecture Comparison: Hardwired vs Sub-GHz vs Legacy Wi-Fi
          </h3>
          <span className="text-xs font-mono text-amber-400">UL 1023 Standard</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 font-mono uppercase text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-4 w-1/4">Specification / Vector</th>
                <th className="p-4 w-1/4 text-emerald-400">Sub-GHz 868/915 MHz (Recommended)</th>
                <th className="p-4 w-1/4 text-slate-300">Hardwired Copper (EOL Resistor)</th>
                <th className="p-4 w-1/4 text-rose-400">Legacy 2.4GHz Wi-Fi DIY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono text-slate-300">
              {HARDWARE_COMPARISON.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-bold text-white bg-slate-950/30">{row.feature}</td>
                  <td className="p-4 text-emerald-300 bg-emerald-950/10 leading-relaxed">{row.wirelessModern}</td>
                  <td className="p-4 text-slate-300 leading-relaxed">{row.hardwired}</td>
                  <td className="p-4 text-rose-300 bg-rose-950/10 leading-relaxed">{row.legacyWifi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sensor Physics Deep-Dives */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Dual-Tech Motion Detector Physics */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 w-fit text-cyan-400 mb-4">
            <Activity className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-white mb-2">Dual-Tech PIR + 24GHz Microwave</h4>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Standard PIR sensors only look for temperature changes (heat delta). Dual-tech combines thermal tracking with active 24GHz Doppler radar. An alarm only trips when <strong className="text-white">BOTH</strong> sensors confirm intrusion simultaneously, eliminating 99.8% of false alarms.
          </p>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-cyan-300">
            ✓ Ignores heating vents & sunshine<br />
            ✓ Pet immune under 50 lbs<br />
            ✓ Anti-masking tamper detection
          </div>
        </div>

        {/* Card 2: Acoustic Glassbreak Frequency Matching */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 w-fit text-blue-400 mb-4">
            <Waves className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-white mb-2">Dual-Stage Acoustic Pattern Matching</h4>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Glass doesn't just shatter; it flexes first. The acoustic microphone listens for a sub-audible low-frequency pressure wave (&lt;50Hz thud) followed within 150 milliseconds by the high-frequency crystalline shatter (4-6kHz).
          </p>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-blue-300">
            ✓ Protects multiple windows in a 30ft room<br />
            ✓ Immune to dog barking & dishware<br />
            ✓ Works on Plate, Tempered & Laminated
          </div>
        </div>

        {/* Card 3: Encrypted Frequency Hopping */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 w-fit text-amber-400 mb-4">
            <Radio className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-white mb-2">Multi-Channel Frequency Hopping (FHSS)</h4>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            If an attacker activates an illegal RF jamming transmitter on a frequency channel, our transceivers detect the signal-to-noise degradation instantly, hop across 64 pseudo-random channels, and send a Jamming Tamper alert to Central Station.
          </p>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-amber-300">
            ✓ 256-bit AES rolling key encryption<br />
            ✓ 12-second supervised polling interval<br />
            ✓ Anti-replay token verification
          </div>
        </div>

      </div>

    </div>
  );
};
