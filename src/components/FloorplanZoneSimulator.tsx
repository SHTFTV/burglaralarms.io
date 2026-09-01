import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  DoorOpen, 
  DoorClosed, 
  Activity, 
  Waves, 
  Volume2, 
  Play, 
  RotateCcw, 
  Radio, 
  AlertTriangle, 
  Lock, 
  Unlock, 
  Eye, 
  Dog, 
  User, 
  CheckCircle2,
  Sparkles,
  Zap,
  PhoneCall,
  Flame
} from 'lucide-react';
import { INITIAL_ZONES } from '../data/equipmentData';
import { AlarmArmMode, ZoneItem, SystemEventLog } from '../types/security';
import { alarmAudio } from '../utils/audioSynthesizer';

export const FloorplanZoneSimulator: React.FC = () => {
  const [zones, setZones] = useState<ZoneItem[]>(INITIAL_ZONES);
  const [armMode, setArmMode] = useState<AlarmArmMode>('armed_away');
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);
  const [countdownSeconds, setCountdownSeconds] = useState<number | null>(null);
  const [pinInput, setPinInput] = useState<string>('');
  const [keypadMessage, setKeypadMessage] = useState<string>('SYSTEM ARMED AWAY');
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>('z-01');
  const [isSirenActive, setIsSirenActive] = useState<boolean>(false);
  const [simulatedActor, setSimulatedActor] = useState<'intruder' | 'pet' | 'homeowner' | null>(null);
  const [actorPosition, setActorPosition] = useState<{ x: number; y: number }>({ x: 20, y: 95 });

  const [logs, setLogs] = useState<SystemEventLog[]>([
    {
      id: 'log-01',
      timestamp: '08:00:12',
      type: 'arm',
      message: 'System Armed [AWAY] by User 01 (Master)',
      severity: 'info'
    },
    {
      id: 'log-02',
      timestamp: '08:00:15',
      type: 'info',
      message: 'All 7 Supervised Zones Supervised & Reporting Normal',
      severity: 'success'
    }
  ]);

  const countdownIntervalRef = useRef<number | null>(null);

  const addLog = (message: string, severity: 'info' | 'warning' | 'critical' | 'success', type: SystemEventLog['type'], zoneName?: string) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    setLogs(prev => [
      {
        id: `log-${Date.now()}-${Math.random()}`,
        timestamp: timeStr,
        message,
        severity,
        type,
        zone: zoneName
      },
      ...prev.slice(0, 19)
    ]);
  };

  // Handle countdown effect
  useEffect(() => {
    if (countdownSeconds !== null && countdownSeconds > 0) {
      countdownIntervalRef.current = window.setInterval(() => {
        setCountdownSeconds(prev => {
          if (prev === null || prev <= 1) {
            // Trigger full alarm!
            triggerFullAlarm('Entry Delay Expired - No Valid Code Entered');
            return null;
          }
          alarmAudio.playCountdownBeep(prev <= 10);
          return prev - 1;
        });
      }, 1000);
    } else if (countdownSeconds === 0) {
      triggerFullAlarm('Entry Delay Expired');
    }

    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, [countdownSeconds]);

  const triggerFullAlarm = (reason: string) => {
    setArmMode('alarm_triggered');
    setIsSirenActive(true);
    setKeypadMessage('ALARM IN PROGRESS! POLICE DISPATCH NOTIFIED');
    alarmAudio.startContinuousSiren();
    addLog(`ALARM TRIGGERED: ${reason}. High-decibel 115dB outdoor siren activated.`, 'critical', 'alarm');
    addLog('Central Station received SIA Contact ID 1130 (Burglary Alarm). Dispatching First Responders.', 'critical', 'alarm');
  };

  // Disarm handler
  const handleDisarm = (pin: string = pinInput) => {
    if (pin === '1234' || pin === '0000') {
      alarmAudio.stopContinuousSiren();
      alarmAudio.playDisarmTone();
      setArmMode('disarmed');
      setIsSirenActive(false);
      setCountdownSeconds(null);
      setPinInput('');
      setKeypadMessage('SYSTEM DISARMED - READY TO ARM');
      setActiveSimulation(null);
      setSimulatedActor(null);
      
      // reset zone statuses
      setZones(prev => prev.map(z => ({ ...z, status: 'normal' })));

      addLog('System Disarmed by Master PIN (User 01). Alarm Cancel Signal Transmitted.', 'success', 'disarm');
    } else if (pin === '9999') {
      // Silent Duress Code!
      alarmAudio.stopContinuousSiren();
      alarmAudio.playDisarmTone();
      setArmMode('disarmed');
      setIsSirenActive(false);
      setCountdownSeconds(null);
      setPinInput('');
      setKeypadMessage('SYSTEM DISARMED');
      addLog('Silent Duress Code Activated! System appears disarmed but silent Hostage Emergency code (CID 1121) dispatched to 911!', 'critical', 'alarm');
    } else {
      alarmAudio.playKeypadBeep();
      setKeypadMessage('INVALID CODE - TRY AGAIN (Default: 1234)');
      setPinInput('');
    }
  };

  const handleKeypadPress = (digit: string) => {
    alarmAudio.playKeypadBeep();
    if (pinInput.length < 4) {
      const newPin = pinInput + digit;
      setPinInput(newPin);
      if (newPin.length === 4) {
        handleDisarm(newPin);
      }
    }
  };

  // Simulation scenario runner
  const runScenario = (scenarioKey: 'front_door' | 'glassbreak' | 'hall_motion' | 'pet_walk' | 'garage_door') => {
    // Reset any existing sirens or counts
    alarmAudio.stopContinuousSiren();
    setCountdownSeconds(null);
    setIsSirenActive(false);

    if (scenarioKey === 'front_door') {
      setActiveSimulation('front_door');
      setSimulatedActor('intruder');
      setActorPosition({ x: 20, y: 85 });
      
      setZones(prev => prev.map(z => z.id === 'z-01' ? { ...z, status: 'triggered' } : z));
      alarmAudio.playDoorChime();
      addLog('Zone 01 (Front Entryway Door) Magnetic Reed Contact OPENED.', 'warning', 'zone_open', 'Zone 01');

      if (armMode === 'armed_away') {
        setCountdownSeconds(30);
        setKeypadMessage('ENTRY DELAY ACTIVE: ENTER PIN (30s)');
        alarmAudio.playCountdownBeep(false);
        addLog('Entry Delay Countdown started (30 seconds remaining to enter valid PIN).', 'warning', 'info');
      } else if (armMode === 'armed_stay' || armMode === 'armed_night') {
        triggerFullAlarm('Zone 01 Instant Breach in Stay Mode');
      }
    } else if (scenarioKey === 'glassbreak') {
      setActiveSimulation('glassbreak');
      setSimulatedActor('intruder');
      setActorPosition({ x: 80, y: 40 });
      setZones(prev => prev.map(z => z.id === 'z-04' ? { ...z, status: 'triggered' } : z));
      addLog('Zone 04 (Living Room Acoustic Glassbreak) registered 5kHz shattered glass acoustic signature.', 'critical', 'alarm', 'Zone 04');
      
      if (armMode !== 'disarmed') {
        triggerFullAlarm('Zone 04 Acoustic Glassbreak Triggered');
      }
    } else if (scenarioKey === 'hall_motion') {
      setActiveSimulation('hall_motion');
      setSimulatedActor('intruder');
      setActorPosition({ x: 48, y: 50 });
      setZones(prev => prev.map(z => z.id === 'z-03' ? { ...z, status: 'triggered' } : z));
      addLog('Zone 03 (Main Hallway Dual-Tech Motion) detected human thermal infrared mass (98.6°F) + 24GHz Doppler radar shift.', 'critical', 'alarm', 'Zone 03');
      
      if (armMode === 'armed_away') {
        triggerFullAlarm('Zone 03 Interior Motion Breach');
      } else if (armMode === 'armed_stay') {
        addLog('Interior Motion ignored because system is in ARMED STAY mode (Interior zones bypassed for resident mobility).', 'info', 'bypass');
      }
    } else if (scenarioKey === 'pet_walk') {
      setActiveSimulation('pet_walk');
      setSimulatedActor('pet');
      setActorPosition({ x: 48, y: 56 });
      alarmAudio.playKeypadBeep();
      addLog('Pet (35 lb Golden Retriever) traversed through hallway under PIR 80° optical lens.', 'info', 'info');
      addLog('Pet Immunity Algorithm: Thermal mass < 50 lbs & target elevation < 2.5 ft. Target successfully filtered as non-threat. NO FALSE ALARM.', 'success', 'info');
    } else if (scenarioKey === 'garage_door') {
      setActiveSimulation('garage_door');
      setSimulatedActor('intruder');
      setActorPosition({ x: 18, y: 25 });
      setZones(prev => prev.map(z => z.id === 'z-05' ? { ...z, status: 'triggered' } : z));
      addLog('Zone 05 (Garage Access Roll-up Door) contact opened.', 'warning', 'zone_open', 'Zone 05');
      if (armMode !== 'disarmed') {
        triggerFullAlarm('Zone 05 Garage Breach');
      }
    }
  };

  const setSystemArm = (mode: AlarmArmMode) => {
    alarmAudio.stopContinuousSiren();
    setIsSirenActive(false);
    setCountdownSeconds(null);
    setZones(prev => prev.map(z => ({ ...z, status: 'normal' })));

    if (mode === 'armed_away') {
      alarmAudio.playArmTone();
      setArmMode('armed_away');
      setKeypadMessage('ARMED AWAY - ALL ZONES ACTIVE');
      addLog('System Armed in AWAY Mode (Perimeter + Interior Active)', 'info', 'arm');
    } else if (mode === 'armed_stay') {
      alarmAudio.playArmTone();
      setArmMode('armed_stay');
      setKeypadMessage('ARMED STAY - INTERIOR BYPASSED');
      addLog('System Armed in STAY Mode (Perimeter Active, Hall Motion Bypassed for Pet/Resident Mobility)', 'info', 'arm');
    } else if (mode === 'disarmed') {
      handleDisarm('1234');
    }
  };

  const selectedZone = zones.find(z => z.id === selectedZoneId) || zones[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      
      {/* Header & Controls bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold mb-2">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>VIRTUAL INTRUSION & SENSOR SIMULATION LAB</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Interactive Zone Floorplan & Signal Simulator
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Test real-world intrusion scenarios on an architectural floorplan. Trigger forced entry, acoustic glassbreaks, and pet roaming to watch sensor physics, siren beacons, and central station telemetry respond in real-time.
          </p>
        </div>

        {/* Global Arm / Disarm quick buttons */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 self-start lg:self-auto">
          <button
            onClick={() => setSystemArm('armed_away')}
            className={`px-3 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
              armMode === 'armed_away'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Arm Away</span>
          </button>

          <button
            onClick={() => setSystemArm('armed_stay')}
            className={`px-3 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
              armMode === 'armed_stay'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Arm Stay</span>
          </button>

          <button
            onClick={() => setSystemArm('disarmed')}
            className={`px-3 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
              armMode === 'disarmed'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Unlock className="w-3.5 h-3.5" />
            <span>Disarm (1234)</span>
          </button>
        </div>
      </div>

      {/* Main Simulator Canvas & Side Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Interactive Floorplan Canvas (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Top Scenario Triggers */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span className="text-slate-400 font-bold uppercase flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 text-amber-400" />
              <span>Simulate Scenario:</span>
            </span>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => runScenario('front_door')}
                className="px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-500/40 text-slate-200 hover:text-rose-300 transition-all flex items-center gap-1.5"
              >
                <DoorOpen className="w-3.5 h-3.5 text-rose-400" />
                <span>Forced Front Door</span>
              </button>

              <button
                onClick={() => runScenario('glassbreak')}
                className="px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-amber-950/60 border border-slate-800 hover:border-amber-500/40 text-slate-200 hover:text-amber-300 transition-all flex items-center gap-1.5"
              >
                <Waves className="w-3.5 h-3.5 text-amber-400" />
                <span>Glass Shatter</span>
              </button>

              <button
                onClick={() => runScenario('hall_motion')}
                className="px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-500/40 text-slate-200 hover:text-cyan-300 transition-all flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>Hallway Intruder</span>
              </button>

              <button
                onClick={() => runScenario('pet_walk')}
                className="px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-emerald-950/60 border border-slate-800 hover:border-emerald-500/40 text-slate-200 hover:text-emerald-300 transition-all flex items-center gap-1.5"
              >
                <Dog className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pet Roam Test (35 lb)</span>
              </button>
            </div>
          </div>

          {/* 2D Floorplan Visual Stage */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-950 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-4 select-none">
            
            {/* Architectural Blueprint Grid Lines */}
            <div className="absolute inset-0 bg-security-grid opacity-60 pointer-events-none" />

            {/* Room Blueprint Dividers */}
            <div className="absolute inset-4 rounded-xl border border-slate-700/60 pointer-events-none">
              
              {/* Garage Room (Top Left) */}
              <div className="absolute top-0 left-0 w-1/3 h-1/2 border-r border-b border-slate-700/60 bg-slate-900/30 p-3">
                <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider">GARAGE (ZONE 05)</span>
              </div>

              {/* Master Bedroom (Top Right) */}
              <div className="absolute top-0 right-0 w-1/2 h-1/2 border-l border-b border-slate-700/60 bg-slate-900/20 p-3">
                <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider">MASTER BEDROOM (ZONE 06)</span>
              </div>

              {/* Central Hallway */}
              <div className="absolute top-1/2 left-1/3 w-1/4 h-1/2 border-r border-slate-700/60 bg-slate-900/40 p-2">
                <span className="font-mono text-[9px] text-slate-500 font-bold uppercase tracking-wider">CENTRAL HALLWAY</span>
              </div>

              {/* Living & Great Room (Bottom Right) */}
              <div className="absolute top-1/2 right-0 w-5/12 h-1/2 bg-slate-900/20 p-3">
                <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider">LIVING ROOM & PATIO (ZONE 02 & 04)</span>
              </div>

              {/* Front Foyer Entryway (Bottom Left) */}
              <div className="absolute top-1/2 left-0 w-1/3 h-1/2 bg-slate-900/30 p-3">
                <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider">FOYER / ENTRY (ZONE 01)</span>
              </div>

            </div>

            {/* PIR Motion Cone Visualization (Zone 03) */}
            <div 
              className="absolute left-[48%] top-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-500"
              style={{
                width: '180px',
                height: '180px',
                clipPath: 'polygon(50% 50%, 0% 100%, 100% 100%)',
                background: armMode === 'armed_stay' 
                  ? 'radial-gradient(circle, rgba(148, 163, 184, 0.08) 0%, transparent 80%)'
                  : zones.find(z => z.id === 'z-03')?.status === 'triggered'
                  ? 'radial-gradient(circle, rgba(239, 68, 68, 0.45) 0%, rgba(239, 68, 68, 0.05) 80%)'
                  : 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, rgba(6, 182, 212, 0.02) 80%)',
              }}
            >
              <div className="w-full h-full animate-pulse opacity-40 border-b border-cyan-400/40" />
            </div>

            {/* Acoustic Glassbreak Radius (Zone 04) */}
            <div 
              className="absolute left-[75%] top-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-300 border"
              style={{
                width: '140px',
                height: '140px',
                borderColor: zones.find(z => z.id === 'z-04')?.status === 'triggered' ? 'rgba(239, 68, 68, 0.6)' : 'rgba(59, 130, 246, 0.2)',
                backgroundColor: zones.find(z => z.id === 'z-04')?.status === 'triggered' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(59, 130, 246, 0.04)',
              }}
            />

            {/* Strobe Siren Alarm Flare when Siren is active */}
            {isSirenActive && (
              <div className="absolute inset-0 bg-red-600/20 animate-pulse pointer-events-none flex items-center justify-center">
                <div className="px-6 py-3 rounded-2xl bg-red-950/90 border-2 border-red-500 text-red-100 font-mono font-black text-sm tracking-widest shadow-2xl flex items-center gap-3 animate-bounce">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <span>115dB ALARM ACTIVE • CENTRAL STATION DISPATCH IN PROGRESS</span>
                </div>
              </div>
            )}

            {/* Countdown Banner in stage */}
            {countdownSeconds !== null && (
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 bg-amber-950/90 border-2 border-amber-500 px-5 py-2.5 rounded-xl text-center shadow-2xl animate-pulse">
                <div className="text-[10px] font-mono text-amber-300 uppercase font-bold">ENTRY DELAY ACTIVE - ENTER PIN</div>
                <div className="text-2xl font-black font-mono text-white">00:{countdownSeconds.toString().padStart(2, '0')}</div>
              </div>
            )}

            {/* Simulated Actor Marker (Intruder or Pet) */}
            {simulatedActor && (
              <div 
                className="absolute z-20 transition-all duration-700 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{ left: `${actorPosition.x}%`, top: `${actorPosition.y}%` }}
              >
                {simulatedActor === 'intruder' ? (
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-rose-600 border-2 border-white shadow-lg shadow-rose-500/50 flex items-center justify-center text-white animate-bounce">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-mono font-bold bg-slate-950/90 text-rose-400 px-1.5 py-0.5 rounded border border-rose-500/40 mt-1">
                      Intruder
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 border-2 border-white shadow-lg shadow-emerald-500/50 flex items-center justify-center text-white animate-pulse">
                      <Dog className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-mono font-bold bg-slate-950/90 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/40 mt-1">
                      Pet (35 lb)
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Placed Interactive Supervised Sensors */}
            {zones.map((zone) => {
              const isTriggered = zone.status === 'triggered';
              const isSelected = selectedZoneId === zone.id;
              return (
                <div
                  key={zone.id}
                  onClick={() => {
                    setSelectedZoneId(zone.id);
                    alarmAudio.playKeypadBeep();
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
                  style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
                >
                  <div className="relative">
                    {isTriggered && (
                      <span className="absolute -inset-2 rounded-full bg-red-500 animate-ping opacity-75" />
                    )}

                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all shadow-md ${
                        isTriggered
                          ? 'bg-red-600 text-white border-2 border-white ring-4 ring-red-500/40'
                          : isSelected
                          ? 'bg-amber-500 text-slate-950 border-2 border-white ring-2 ring-amber-400'
                          : 'bg-slate-900 border border-slate-600 text-slate-200 hover:border-amber-400'
                      }`}
                    >
                      {zone.type === 'door_contact' && <DoorClosed className="w-3.5 h-3.5" />}
                      {zone.type === 'pir_motion' && <Activity className="w-3.5 h-3.5" />}
                      {zone.type === 'glassbreak' && <Waves className="w-3.5 h-3.5" />}
                      {zone.type === 'siren_strobe' && <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
                    </div>

                    {/* Zone Badge tooltip */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.5 rounded bg-slate-950/90 border border-slate-800 text-[9px] font-mono text-slate-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      Z0{zone.zoneNumber}: {zone.name}
                    </div>
                  </div>
                </div>
              );
            })}

          </div>

          {/* Selected Zone Diagnostics Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded font-mono text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  ZONE 0{selectedZone.zoneNumber} DIAGNOSTICS
                </span>
                <h4 className="text-sm font-bold text-white">{selectedZone.name}</h4>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-slate-400">Battery: <strong className="text-emerald-400">{selectedZone.batteryLevel}%</strong></span>
                <span className="text-slate-400">Signal: <strong className="text-cyan-400">{selectedZone.signalStrength}%</strong></span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono pt-2 border-t border-slate-800/80 text-slate-400">
              <div>Room: <span className="text-slate-200">{selectedZone.room}</span></div>
              <div>Type: <span className="text-slate-200 uppercase">{selectedZone.type.replace('_', ' ')}</span></div>
              <div>State: <span className={selectedZone.status === 'triggered' ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                {selectedZone.status.toUpperCase()}
              </span></div>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Keypad & Live Central Station Event Stream (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Virtual Wall Keypad */}
          <div className="bg-slate-900 border-2 border-slate-700/80 rounded-2xl p-5 shadow-2xl">
            
            {/* Keypad Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${armMode === 'disarmed' ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`} />
                <span className="font-mono text-xs font-bold text-slate-300">AEGIS TOUCH KEYPAD</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">PIN: 1-2-3-4</span>
            </div>

            {/* LCD Screen Display */}
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-3 mb-4 text-center font-mono shadow-inner">
              <div className="text-[11px] text-emerald-400 font-bold tracking-wider uppercase mb-1">
                {keypadMessage}
              </div>
              <div className="text-xl font-bold tracking-widest text-emerald-200 h-7 flex items-center justify-center">
                {pinInput ? pinInput.replace(/./g, '•') : '----'}
              </div>
            </div>

            {/* Numeric Keypad Grid */}
            <div className="grid grid-cols-3 gap-2 mb-4 font-mono">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'CLR', '0', 'ENT'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => {
                    if (btn === 'CLR') {
                      setPinInput('');
                      alarmAudio.playKeypadBeep();
                    } else if (btn === 'ENT') {
                      handleDisarm();
                    } else {
                      handleKeypadPress(btn);
                    }
                  }}
                  className={`py-3 rounded-xl border text-sm font-bold transition-all active:scale-95 ${
                    btn === 'ENT'
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500'
                      : btn === 'CLR'
                      ? 'bg-slate-800 hover:bg-slate-700 text-rose-400 border-slate-700'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-200 border-slate-800'
                  }`}
                >
                  {btn}
                </button>
              ))}
            </div>

            {/* Quick Emergency Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => triggerFullAlarm('Manual Keypad Panic Trigger')}
                className="py-2 px-3 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-300 font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>PANIC ALARM</span>
              </button>

              <button
                onClick={() => {
                  setPinInput('9999');
                  handleDisarm('9999');
                }}
                className="py-2 px-3 rounded-lg bg-amber-950/60 hover:bg-amber-900 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>SILENT DURESS</span>
              </button>
            </div>

          </div>

          {/* Real-time Central Station Telemetry Stream */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="font-mono text-xs text-slate-300 font-bold uppercase">
                  CENTRAL STATION EVENT LOG
                </span>
              </div>
              <button
                onClick={() => setLogs([])}
                className="text-[10px] font-mono text-slate-500 hover:text-slate-300"
              >
                Clear
              </button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1 text-xs font-mono">
              {logs.length === 0 ? (
                <div className="text-slate-500 text-center py-4 text-[11px]">No recent telemetry events</div>
              ) : (
                logs.map((log) => (
                  <div
                    key={log.id}
                    className={`p-2 rounded-lg border leading-tight ${
                      log.severity === 'critical'
                        ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                        : log.severity === 'warning'
                        ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                        : log.severity === 'success'
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] opacity-75 mb-0.5">
                      <span>[{log.timestamp}]</span>
                      {log.zone && <span className="font-bold">{log.zone}</span>}
                    </div>
                    <div>{log.message}</div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
