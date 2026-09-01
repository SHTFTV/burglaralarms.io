import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldAlert, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  Timer,
  PawPrint,
  Wind,
  Radio
} from 'lucide-react';
import { 
  FALSE_ALARM_PREVENTION_TIPS, 
  MUNICIPAL_PERMIT_GUIDE, 
  FREQUENTLY_ASKED_QUESTIONS 
} from '../data/guideData';
import { alarmAudio } from '../utils/audioSynthesizer';

export const PermitAndKnowledgeHub: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    alarmAudio.playKeypadBeep();
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      
      {/* Header */}
      <div className="mb-10 border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>SECURITY COMPLIANCE, PERMITS & KNOWLEDGE BASE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Municipal Permits, False Alarm Prevention & Guides
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Everything you need to know about city alarm registrations, avoiding false dispatch fines, and mastering modern intrusion equipment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        
        {/* Left Column: False Alarm Prevention Standards (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2.5 mb-4">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">SIA CP-01 False Alarm Elimination</h3>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Over 85% of municipal police dispatches for alarms turn out to be accidental user errors or environmental triggers. Here is how our architecture eliminates false dispatches:
            </p>

            <div className="space-y-4">
              {FALSE_ALARM_PREVENTION_TIPS.map((tip, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">{tip.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Municipal Permits (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2.5 mb-4">
              <FileText className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Municipal Alarm Permit Guidance</h3>
            </div>

            <div className="space-y-4">
              {MUNICIPAL_PERMIT_GUIDE.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <h4 className="text-xs font-mono font-bold text-amber-400 uppercase mb-1">
                    {item.topic}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200">
              <strong className="text-white font-mono uppercase block mb-1">Need help filing your city permit?</strong>
              Our onboarding team will look up your municipal code and pre-populate your alarm registration paperwork free of charge upon activation!
            </div>
          </div>
        </div>

      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center gap-2.5 mb-6">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-3">
          {FREQUENTLY_ASKED_QUESTIONS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-900/60 transition-colors"
                >
                  <span className="text-sm font-semibold text-white">{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-amber-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 font-mono">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
