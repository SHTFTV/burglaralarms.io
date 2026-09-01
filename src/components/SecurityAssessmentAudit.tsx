import React, { useState } from 'react';
import { 
  FileCheck2, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { RISK_AUDIT_QUESTIONS } from '../data/equipmentData';
import { alarmAudio } from '../utils/audioSynthesizer';
import confetti from 'canvas-confetti';

interface SecurityAssessmentAuditProps {
  setActiveTab: (tab: string) => void;
}

export const SecurityAssessmentAudit: React.FC<SecurityAssessmentAuditProps> = ({ setActiveTab }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    alarmAudio.playKeypadBeep();
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const calculateAuditScore = () => {
    alarmAudio.playDisarmTone();
    setIsCalculated(true);
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {}
  };

  // Compute total points
  const totalPossible = RISK_AUDIT_QUESTIONS.length * 10;
  let totalScore = 0;
  const answeredCount = Object.keys(selectedAnswers).length;

  RISK_AUDIT_QUESTIONS.forEach(q => {
    const selectedIdx = selectedAnswers[q.id];
    if (selectedIdx !== undefined) {
      totalScore += q.options[selectedIdx].scoreWeight;
    }
  });

  const percentage = Math.round((totalScore / totalPossible) * 100);

  const getScoreGrade = (pct: number) => {
    if (pct >= 90) return { grade: 'A+', label: 'Fortified Security Baseline', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
    if (pct >= 75) return { grade: 'B', label: 'Moderate Protection (Minor Gaps)', color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30' };
    if (pct >= 50) return { grade: 'C', label: 'Vulnerable to Smash & Grab Attacks', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
    return { grade: 'F', label: 'Critical Risk: High Vulnerability', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/30' };
  };

  const gradeInfo = getScoreGrade(percentage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      
      {/* Header */}
      <div className="mb-8 border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-2">
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>HOME & COMMERCIAL RISK ASSESSMENT ENGINE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Property Intrusion Vulnerability Audit
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Evaluate physical entry points, electronic communication redundancy, perimeter visibility, and dispatch protocol against FBI burglary statistics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Questions List (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {RISK_AUDIT_QUESTIONS.map((q, qIndex) => {
            const currentSelected = selectedAnswers[q.id];
            return (
              <div 
                key={q.id}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-slate-950 border border-slate-700 text-amber-400 font-mono font-bold text-xs flex items-center justify-center">
                    0{qIndex + 1}
                  </span>
                  <h3 className="text-base font-bold text-white">{q.title}</h3>
                </div>

                <div className="space-y-2.5 mt-4">
                  {q.options.map((opt, optIndex) => {
                    const isChosen = currentSelected === optIndex;
                    return (
                      <div
                        key={optIndex}
                        onClick={() => handleSelectOption(q.id, optIndex)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                          isChosen
                            ? 'bg-amber-500/10 border-amber-500 text-white shadow-md'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center flex-shrink-0 ${
                          isChosen ? 'border-amber-400 bg-amber-400' : 'border-slate-600'
                        }`}>
                          {isChosen && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                        </div>

                        <div className="flex-1 text-xs">
                          <div className="font-semibold text-slate-200">{opt.label}</div>
                          {isChosen && (
                            <div className="text-[11px] text-amber-300/90 mt-1.5 font-mono flex items-center gap-1.5">
                              <Info className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                              <span>{opt.tip}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="flex justify-end pt-2">
            <button
              onClick={calculateAuditScore}
              disabled={answeredCount < RISK_AUDIT_QUESTIONS.length}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 disabled:hover:from-amber-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition-all font-mono flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 stroke-[2.5]" />
              <span>CALCULATE FINAL SECURITY SCORE ({answeredCount}/{RISK_AUDIT_QUESTIONS.length})</span>
            </button>
          </div>
        </div>

        {/* Right Column: Scorecard & Action Plan (4 Cols) */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          <div className="bg-slate-900/95 border-2 border-slate-700/80 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
            
            <div className="text-center pb-6 border-b border-slate-800">
              <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                COMPREHENSIVE PROPERTY RATING
              </span>

              <div className="my-4">
                <div className={`text-6xl font-black font-mono ${gradeInfo.color}`}>
                  {percentage}%
                </div>
                <div className="text-sm font-bold text-white mt-1">
                  Grade {gradeInfo.grade}: {gradeInfo.label}
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className={`h-full transition-all duration-700 ${
                    percentage >= 75 ? 'bg-emerald-500' : percentage >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            {/* Key vulnerability mitigation recommendations */}
            <div className="py-4 space-y-3">
              <h4 className="font-mono text-xs font-bold text-slate-300 uppercase">
                Priority Mitigation Plan:
              </h4>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>Install 5G Dual-Carrier Cellular Hub to eliminate phone wire & Wi-Fi jamming risks.</span>
                </div>

                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <Lock className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Mount magnetic contacts on all exterior doors & ground windows.</span>
                </div>

                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Activate 24/7 UL 5-Diamond Central Station dispatch for sub-15s response.</span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveTab('builder');
                  alarmAudio.playKeypadBeep();
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs font-mono shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4 stroke-[2.5]" />
                <span>BUILD SYSTEM WITH AUDIT SPECS</span>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
