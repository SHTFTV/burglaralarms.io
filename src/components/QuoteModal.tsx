import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  Phone, 
  Mail, 
  User, 
  Building,
  Sparkles,
  FileCheck2
} from 'lucide-react';
import { EQUIPMENT_CATALOG } from '../data/equipmentData';
import { alarmAudio } from '../utils/audioSynthesizer';
import confetti from 'canvas-confetti';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  quoteData: any;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, quoteData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    preferredDate: '',
    notes: ''
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const data = quoteData || {
    propertyType: 'residential',
    sqft: 2400,
    hardwareTotal: 499,
    installCost: 149,
    monthlyRate: 19.99,
    billingCycle: 'annual',
    selectedPlan: { name: '24/7 Professional UL Cellular Monitoring', slaResponseTime: '< 15s Response' },
    quantities: {},
    totalSensorCount: 7
  };

  const quoteId = `BA-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alarmAudio.playDisarmTone();
    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border-2 border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white font-mono">Formal Security Proposal</h3>
                <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30">
                  {quoteId}
                </span>
              </div>
              <p className="text-xs text-slate-400">BurglarAlarms.io • Interactive System Planning Tool</p>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              alarmAudio.playKeypadBeep();
            }}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-white">Your Spec Is Saved!</h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thanks, <strong className="text-white">{formData.name || 'there'}</strong>. Your configuration (Ref: {quoteId}) is saved below — print or screenshot it and take it to a licensed installer or monitoring provider in your area to get an actual quote and, once you sign up, a real Certificate of Monitoring for your insurer.
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono"
                >
                  Return to Platform
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Proposal Specs Summary */}
              <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 font-mono text-xs space-y-3">
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Target Property:</span>
                  <span className="text-white uppercase font-bold">{data.propertyType} ({data.sqft?.toLocaleString()} sq ft)</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Supervised Devices:</span>
                  <span className="text-white font-bold">{data.totalSensorCount || 7} Perimeter & Interior Zones</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Monitoring Program:</span>
                  <span className="text-emerald-400 font-bold">{data.selectedPlan?.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Equipment & Hardware:</span>
                  <span className="text-white font-bold">${data.hardwareTotal}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Installation & RF Calibration:</span>
                  <span className="text-white font-bold">{data.installCost === 0 ? 'DIY ($0)' : `$${data.installCost}`}</span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-bold">
                  <span className="text-amber-400">Recurring Monthly Monitoring:</span>
                  <span className="text-amber-400">${data.monthlyRate} / mo</span>
                </div>
              </div>

              {/* Save Configuration Form */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Save Your System Configuration</span>
                </h4>
                <p className="text-[11px] text-slate-500 -mt-2">
                  This just saves your spec sheet for printing — it isn't sent to anyone or scheduled with an installer.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1">Full Name / Business Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1">Email Address *</label>
                    <input
                      required
                      type="email"
                      placeholder="sarah@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1">Direct Phone Number *</label>
                    <input
                      required
                      type="tel"
                      placeholder="(555) 019-2834"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-300 mb-1">Property City / Zip Code</label>
                    <input
                      type="text"
                      placeholder="e.g. Austin, TX 78701"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono flex items-center gap-2"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / Save PDF</span>
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs font-mono shadow-lg flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 stroke-[2.5]" />
                    <span>SAVE MY CONFIGURATION</span>
                  </button>
                </div>
              </form>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
