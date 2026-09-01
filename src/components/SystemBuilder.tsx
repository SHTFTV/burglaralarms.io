import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Building2, 
  Warehouse, 
  Landmark, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Wrench, 
  Sparkles, 
  FileText, 
  Check, 
  Info,
  Radio,
  Sliders,
  DollarSign,
  Lock,
  Flame,
  Activity,
  Waves,
  DoorClosed,
  ScanLine,
  Volume2,
  KeyRound,
  Droplets,
  Camera
} from 'lucide-react';
import { EQUIPMENT_CATALOG, MONITORING_PLANS } from '../data/equipmentData';
import { EquipmentItem, MonitoringPlan, PropertyType } from '../types/security';
import { alarmAudio } from '../utils/audioSynthesizer';
import confetti from 'canvas-confetti';

interface SystemBuilderProps {
  onOpenQuote: (config: any) => void;
  setActiveTab: (tab: string) => void;
}

export const SystemBuilder: React.FC<SystemBuilderProps> = ({ onOpenQuote, setActiveTab }) => {
  const [propertyType, setPropertyType] = useState<PropertyType>('residential');
  const [sqft, setSqft] = useState<number>(2400);
  const [exteriorDoors, setExteriorDoors] = useState<number>(3);
  const [perimeterWindows, setPerimeterWindows] = useState<number>(10);
  
  // Equipment counts map
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  
  // Selected monitoring plan
  const [selectedPlanId, setSelectedPlanId] = useState<string>('pro_cellular_dispatch');
  const [installType, setInstallType] = useState<'diy' | 'pro_install'>('pro_install');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Auto-seed recommended equipment when property or sqft changes
  const applyRecommendedPresets = (prop: PropertyType = propertyType, area: number = sqft) => {
    const initialCounts: Record<string, number> = {};
    EQUIPMENT_CATALOG.forEach(item => {
      initialCounts[item.id] = item.recommendedQty(prop, area);
    });
    // Specific adjustments
    if (prop === 'residential') {
      initialCounts['contact_door_window'] = exteriorDoors + Math.min(4, perimeterWindows);
    } else if (prop === 'small_business') {
      initialCounts['contact_door_window'] = exteriorDoors + 4;
      initialCounts['pir_dualtech_motion'] = Math.max(2, Math.round(area / 600));
      initialCounts['acoustic_glassbreak'] = 2;
    } else if (prop === 'commercial') {
      initialCounts['contact_door_window'] = exteriorDoors + 6;
      initialCounts['pir_dualtech_motion'] = Math.max(4, Math.round(area / 1000));
      initialCounts['outdoor_perimeter_beam'] = 2;
      initialCounts['ai_deterrence_camera'] = 4;
    } else if (prop === 'estate') {
      initialCounts['contact_door_window'] = exteriorDoors + 12;
      initialCounts['pir_dualtech_motion'] = 5;
      initialCounts['outdoor_perimeter_beam'] = 4;
      initialCounts['acoustic_glassbreak'] = 4;
      initialCounts['siren_strobe_outdoor'] = 2;
      initialCounts['ai_deterrence_camera'] = 6;
    }
    setQuantities(initialCounts);
  };

  useEffect(() => {
    applyRecommendedPresets(propertyType, sqft);
  }, [propertyType]);

  const updateQuantity = (itemId: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [itemId]: next };
    });
    alarmAudio.playKeypadBeep();
  };

  // Calculations
  const hardwareTotal = EQUIPMENT_CATALOG.reduce((sum, item) => {
    const count = quantities[item.id] || 0;
    return sum + (item.price * count);
  }, 0);

  const totalSensorCount: number = (Object.values(quantities) as number[]).reduce((a, b) => a + b, 0);

  const installCost = installType === 'diy' ? 0 : 149 + Math.max(0, (totalSensorCount - 5) * 15);

  const currentPlan = MONITORING_PLANS.find(p => p.id === selectedPlanId) || MONITORING_PLANS[1];
  const monthlyRate = billingCycle === 'annual' ? currentPlan.annualDiscountPrice : currentPlan.monthlyPrice;

  // Render Icon helper
  const renderItemIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return <ShieldCheck className="w-5 h-5 text-amber-400" />;
      case 'DoorClosed': return <DoorClosed className="w-5 h-5 text-emerald-400" />;
      case 'Activity': return <Activity className="w-5 h-5 text-cyan-400" />;
      case 'Waves': return <Waves className="w-5 h-5 text-blue-400" />;
      case 'ScanLine': return <ScanLine className="w-5 h-5 text-purple-400" />;
      case 'Volume2': return <Volume2 className="w-5 h-5 text-rose-400" />;
      case 'KeyRound': return <KeyRound className="w-5 h-5 text-amber-300" />;
      case 'Flame': return <Flame className="w-5 h-5 text-red-400" />;
      case 'Droplets': return <Droplets className="w-5 h-5 text-sky-400" />;
      case 'Camera': return <Camera className="w-5 h-5 text-indigo-400" />;
      default: return <ShieldCheck className="w-5 h-5 text-amber-400" />;
    }
  };

  const categories = [
    { id: 'all', label: 'All Equipment' },
    { id: 'core', label: 'Hubs & Keypads' },
    { id: 'perimeter', label: 'Perimeter Doors/Windows' },
    { id: 'interior', label: 'Motion & Interior' },
    { id: 'deterrence', label: 'Outdoor Sirens' },
    { id: 'life_safety', label: 'Fire & Flood' },
    { id: 'surveillance', label: '4K AI Cameras' },
  ];

  const filteredEquipment = selectedCategory === 'all' 
    ? EQUIPMENT_CATALOG 
    : EQUIPMENT_CATALOG.filter(e => e.category === selectedCategory);

  const handleGenerateQuote = () => {
    alarmAudio.playDisarmTone();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    onOpenQuote({
      propertyType,
      sqft,
      exteriorDoors,
      perimeterWindows,
      quantities,
      selectedPlan: currentPlan,
      installType,
      installCost,
      hardwareTotal,
      monthlyRate,
      billingCycle,
      totalSensorCount
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      
      {/* Top Header & Intro */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold mb-2">
            <Sliders className="w-3.5 h-3.5" />
            <span>INTERACTIVE SYSTEM DESIGNER & COST ENGINE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Build Your Custom Alarm Architecture
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Select your property footprint, customize supervised sensor zones, choose professional installation or DIY, and pick your 24/7 UL monitoring tier.
          </p>
        </div>

        <button
          onClick={() => {
            applyRecommendedPresets();
            alarmAudio.playDoorChime();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 transition-all self-start md:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Reset to Recommended Specs</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Property Configuration & Equipment Picker (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Step 1: Property Type Selection */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-wider">
                STEP 1: SELECT PROPERTY PROFILE
              </span>
              <span className="text-xs text-slate-400">Tailors sensor density and placement</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'residential', label: 'Residential Home', desc: 'Houses, Condos, Townhomes', icon: Home },
                { id: 'small_business', label: 'Small Business', desc: 'Retail, Clinics, Offices', icon: Building2 },
                { id: 'commercial', label: 'Commercial / Depot', desc: 'Warehouses, Flex Spaces', icon: Warehouse },
                { id: 'estate', label: 'Estate / Acreage', desc: 'Multi-Acre, Perimeter Beams', icon: Landmark },
              ].map((prop) => {
                const IconComp = prop.icon;
                const isSelected = propertyType === prop.id;
                return (
                  <button
                    key={prop.id}
                    onClick={() => {
                      setPropertyType(prop.id as PropertyType);
                      alarmAudio.playKeypadBeep();
                    }}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div>
                      <div className={`p-2 rounded-lg w-fit mb-3 ${isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400'}`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div className="font-bold text-sm text-white">{prop.label}</div>
                      <div className="text-[11px] text-slate-400 mt-1 leading-snug">{prop.desc}</div>
                    </div>
                    {isSelected && (
                      <div className="mt-3 flex items-center gap-1 text-[11px] font-mono text-amber-400 font-semibold">
                        <Check className="w-3.5 h-3.5" /> Selected
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footprint Sliders & Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-800/80">
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-slate-300">Property Area:</span>
                  <span className="text-amber-400 font-bold">{sqft.toLocaleString()} sq ft</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="12000"
                  step="250"
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-slate-300">Exterior Entry Doors:</span>
                  <span className="text-cyan-400 font-bold">{exteriorDoors} doors</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => { setExteriorDoors(Math.max(1, exteriorDoors - 1)); alarmAudio.playKeypadBeep(); }}
                    className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="flex-1 text-center font-mono font-bold text-sm bg-slate-950 py-1 rounded-lg border border-slate-800">
                    {exteriorDoors}
                  </span>
                  <button 
                    onClick={() => { setExteriorDoors(exteriorDoors + 1); alarmAudio.playKeypadBeep(); }}
                    className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-slate-300">Perimeter Ground Windows:</span>
                  <span className="text-cyan-400 font-bold">{perimeterWindows} windows</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => { setPerimeterWindows(Math.max(1, perimeterWindows - 1)); alarmAudio.playKeypadBeep(); }}
                    className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="flex-1 text-center font-mono font-bold text-sm bg-slate-950 py-1 rounded-lg border border-slate-800">
                    {perimeterWindows}
                  </span>
                  <button 
                    onClick={() => { setPerimeterWindows(perimeterWindows + 1); alarmAudio.playKeypadBeep(); }}
                    className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Equipment Customization */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-wider">
                  STEP 2: CUSTOMIZE HARDWARE SENSORS & DETERRENCE
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">Select Zone Components</h3>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5">
                {categories.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                      selectedCategory === c.id
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Equipment Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredEquipment.map((item) => {
                const count = quantities[item.id] || 0;
                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                      count > 0 
                        ? 'bg-slate-950/90 border-slate-700/80 shadow-md' 
                        : 'bg-slate-950/40 border-slate-800/60 opacity-80'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                            {renderItemIcon(item.iconName)}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white leading-tight">{item.name}</h4>
                            <span className="text-xs font-mono font-bold text-amber-400">${item.price} each</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="space-y-1 mb-4">
                        {item.specs.slice(0, 2).map((spec, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                            <div className="w-1 h-1 rounded-full bg-cyan-400" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Counter Controls */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 mt-auto">
                      <div className="text-[11px] font-mono text-slate-400">
                        Subtotal: <strong className="text-white">${item.price * count}</strong>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={count === 0}
                          className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-slate-900 flex items-center justify-center text-slate-200 transition-all"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center font-mono font-bold text-sm text-amber-400">
                          {count}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 flex items-center justify-center text-slate-200 hover:text-white transition-all"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Installation Method */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-wider">
                STEP 3: DEPLOYMENT & INSTALLATION
              </span>
              <span className="text-xs text-slate-400">Zero-hassle setup options</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                onClick={() => { setInstallType('pro_install'); alarmAudio.playKeypadBeep(); }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  installType === 'pro_install'
                    ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-white">
                    <Wrench className="w-4 h-4 text-amber-400" />
                    <span>White-Glove Certified Pro Installation</span>
                  </div>
                  <span className="font-mono font-bold text-xs text-amber-400">
                    ${installCost}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Licensed security technician mounts all sensors, calibrates PIR microwave look-down angles, tests RF signal mesh, and conducts live Central Station walk-through tests.
                </p>
              </div>

              <div 
                onClick={() => { setInstallType('diy'); alarmAudio.playKeypadBeep(); }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  installType === 'diy'
                    ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-white">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>DIY Pre-Programmed Smart Kit</span>
                  </div>
                  <span className="font-mono font-bold text-xs text-emerald-400">
                    FREE ($0)
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  All sensors are 100% pre-paired to your Aegis Hub out of the box with commercial 3M VHB peel-and-stick backing. Includes step-by-step mobile AR setup guide.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Pricing Engine & Proposal Summary (4 cols) */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          <div className="bg-slate-900/95 border-2 border-slate-700/80 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                  SYSTEM QUOTE ESTIMATE
                </span>
                <h3 className="text-lg font-black text-white">Cost Summary</h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
                {totalSensorCount} Supervised Devices
              </span>
            </div>

            {/* Monitoring Tier Selector */}
            <div className="py-4 border-b border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono text-slate-300 font-bold uppercase">
                  Monitoring Tier
                </span>
                {/* Annual toggle */}
                <button
                  onClick={() => {
                    setBillingCycle(billingCycle === 'annual' ? 'monthly' : 'annual');
                    alarmAudio.playKeypadBeep();
                  }}
                  className="text-[11px] font-mono text-amber-400 underline hover:text-amber-300"
                >
                  {billingCycle === 'annual' ? 'Annual (20% Off)' : 'Switch to Annual'}
                </button>
              </div>

              <div className="space-y-2">
                {MONITORING_PLANS.map((plan) => {
                  const isPlanSelected = selectedPlanId === plan.id;
                  const price = billingCycle === 'annual' ? plan.annualDiscountPrice : plan.monthlyPrice;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => {
                        setSelectedPlanId(plan.id);
                        alarmAudio.playKeypadBeep();
                      }}
                      className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isPlanSelected
                          ? 'bg-amber-500/15 border-amber-500 text-white'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isPlanSelected ? 'border-amber-400 bg-amber-400' : 'border-slate-600'}`}>
                          {isPlanSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{plan.name}</div>
                          <div className="text-[10px] text-slate-400">{plan.slaResponseTime}</div>
                        </div>
                      </div>

                      <div className="font-mono text-xs font-bold text-amber-400">
                        {price === 0 ? 'FREE' : `$${price}/mo`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Line item totals */}
            <div className="py-4 space-y-2.5 text-xs font-mono border-b border-slate-800">
              <div className="flex justify-between text-slate-300">
                <span>Hardware Equipment ({totalSensorCount} items):</span>
                <span className="text-white font-bold">${hardwareTotal}</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Professional Installation:</span>
                <span className={installCost === 0 ? 'text-emerald-400 font-bold' : 'text-white font-bold'}>
                  {installCost === 0 ? 'DIY FREE' : `$${installCost}`}
                </span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Monthly 24/7 Monitoring:</span>
                <span className="text-amber-400 font-bold">
                  {monthlyRate === 0 ? '$0 / mo' : `$${monthlyRate} / mo`}
                </span>
              </div>

              {currentPlan.insuranceDiscountCert && (
                <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300 font-mono flex items-center justify-between">
                  <span>Est. Insurance Policy Rebate:</span>
                  <span className="font-bold text-emerald-400">-$240 to -$480 / yr</span>
                </div>
              )}
            </div>

            {/* Grand Total */}
            <div className="pt-4 pb-2">
              <div className="flex justify-between items-baseline mb-1 font-mono">
                <span className="text-xs text-slate-400 uppercase">One-Time Initial Total:</span>
                <span className="text-2xl font-black text-white">${hardwareTotal + installCost}</span>
              </div>
              <div className="flex justify-between items-baseline font-mono text-xs">
                <span className="text-slate-400">Recurring Monitoring:</span>
                <span className="text-amber-400 font-bold">${monthlyRate} / month</span>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="space-y-2.5 pt-4">
              <button
                onClick={handleGenerateQuote}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 transition-all font-mono flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 stroke-[2.5]" />
                <span>GENERATE FORMAL PROPOSAL</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('simulator');
                  alarmAudio.playDoorChime();
                }}
                className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-xs font-mono transition-all flex items-center justify-center gap-1.5"
              >
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>Test Sensor Setup in Zone Simulator</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500 text-center mt-3">
              30-Day Money-Back Guarantee • Lifetime Hardware Warranty with Pro Plan • No Long-Term Contracts
            </p>

          </div>
        </div>

      </div>

    </div>
  );
};
