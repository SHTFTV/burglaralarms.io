import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Check, 
  Radio, 
  DollarSign, 
  Sparkles, 
  Building, 
  FileCheck2, 
  PhoneCall,
  Zap,
  SlidersHorizontal
} from 'lucide-react';
import { MONITORING_PLANS } from '../data/equipmentData';
import { alarmAudio } from '../utils/audioSynthesizer';

interface MonitoringPlansProps {
  onOpenQuote: (config: any) => void;
  setActiveTab: (tab: string) => void;
}

export const MonitoringPlans: React.FC<MonitoringPlansProps> = ({ onOpenQuote, setActiveTab }) => {
  const [annualPremium, setAnnualPremium] = useState<number>(1800);
  const [discountRate, setDiscountRate] = useState<number>(15);

  const annualSavings = Math.round(annualPremium * (discountRate / 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>UL 2050 & 5-DIAMOND CERTIFIED CENTRAL DISPATCH</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          24/7 Professional Alarm Monitoring
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2">
          Backed by multi-redundant central stations, dedicated dual-carrier 5G cellular modems, and certified priority first responder dispatch.
        </p>
      </div>

      {/* 3-Tier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 items-stretch">
        {MONITORING_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`bg-slate-900/90 rounded-2xl p-6 sm:p-7 border flex flex-col justify-between transition-all ${
              plan.popular
                ? 'border-amber-500 shadow-2xl shadow-amber-500/10 ring-2 ring-amber-500/20 relative'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-mono font-black text-[10px] uppercase tracking-wider shadow-md">
                MOST POPULAR PROTECTION
              </div>
            )}

            <div>
              <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                {plan.tagline}
              </p>

              <div className="mb-6 pb-6 border-b border-slate-800">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-white">
                    {plan.monthlyPrice === 0 ? '$0' : `$${plan.annualDiscountPrice}`}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {plan.monthlyPrice === 0 ? 'Forever' : '/ month (billed annually)'}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-amber-400 mt-1">
                  {plan.slaResponseTime}
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setActiveTab('builder');
                alarmAudio.playKeypadBeep();
              }}
              className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
                plan.popular
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950'
                  : 'bg-slate-950 hover:bg-slate-800 text-white border border-slate-700'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>CONFIGURE WITH THIS PLAN</span>
            </button>
          </div>
        ))}
      </div>

      {/* Insurance Discount Calculator Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>CERTIFICATE OF MONITORING BENEFIT</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Calculate Your Homeowners Insurance Rebate
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Insurance companies reward homeowners with certified 24/7 burglar and fire alarm monitoring by slashing up to 20% off annual premiums. In many cases, your insurance savings completely offset the cost of monitoring!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Annual Home Insurance Premium:
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 font-mono text-slate-400 text-sm">$</span>
                  <input
                    type="number"
                    value={annualPremium}
                    onChange={(e) => setAnnualPremium(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-7 pr-3 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Carrier Alarm Discount Rate:
                </label>
                <select
                  value={discountRate}
                  onChange={(e) => setDiscountRate(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
                >
                  <option value={10}>10% (Perimeter Burglar Alarm)</option>
                  <option value={15}>15% (Burglar + Smoke/Heat Monitored)</option>
                  <option value={20}>20% (Full Security + Fire + Water Flood)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 text-center">
            <div className="text-[11px] font-mono uppercase text-slate-400 mb-1">
              ESTIMATED ANNUAL INSURANCE SAVINGS
            </div>
            <div className="text-4xl sm:text-5xl font-black font-mono text-emerald-400 my-2">
              ${annualSavings} <span className="text-sm text-slate-400 font-normal">/ year</span>
            </div>
            <div className="text-xs font-mono text-slate-400">
              5-Year Policy Savings: <strong className="text-white">${annualSavings * 5}</strong>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
              We provide an official digital Certificate of Monitoring with Central Station UL-Listing number upon activation for instant submission to your insurer.
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
