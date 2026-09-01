// Procedural Web Audio API sound synthesizer for authentic alarm system feedback
class AlarmAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private currentSirenOsc1: OscillatorNode | null = null;
  private currentSirenOsc2: OscillatorNode | null = null;
  private sirenInterval: number | null = null;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopContinuousSiren();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playKeypadBeep() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1800, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public playDoorChime() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      // High note
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(987.77, now); // B5
      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc1.connect(gain1);
      gain1.connect(this.masterGain);
      osc1.start(now);
      osc1.stop(now + 0.35);

      // Low note
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(783.99, now + 0.18); // G5
      gain2.gain.setValueAtTime(0.25, now + 0.18);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc2.connect(gain2);
      gain2.connect(this.masterGain);
      osc2.start(now + 0.18);
      osc2.stop(now + 0.65);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public playArmTone() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.setValueAtTime(1600, now + 0.08);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch {
      // Audio fallback
    }
  }

  public playDisarmTone() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      const freqs = [659.25, 880, 1174.66]; // E5, A5, D6 pleasant resolution
      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const noteTime = now + idx * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.18, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(noteTime);
        osc.stop(noteTime + 0.36);
      });
    } catch {
      // Audio fallback
    }
  }

  public playCountdownBeep(isFast: boolean = false) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(isFast ? 2200 : 1400, now);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (isFast ? 0.05 : 0.08));

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // Audio fallback
    }
  }

  public startContinuousSiren() {
    if (this.isMuted) return;
    this.stopContinuousSiren();
    try {
      this.init();
      if (!this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'square';

      // Warble modulation
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(2.5, now); // 2.5Hz modulation
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(600, now); // +/- 600Hz sweep

      osc1.frequency.setValueAtTime(1400, now);
      osc2.frequency.setValueAtTime(1410, now);

      lfo.connect(osc1.frequency);
      lfo.connect(osc2.frequency);

      gain.gain.setValueAtTime(0.25, now);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.masterGain);

      lfo.start(now);
      osc1.start(now);
      osc2.start(now);

      this.currentSirenOsc1 = osc1;
      this.currentSirenOsc2 = osc2;
    } catch {
      // Audio fallback
    }
  }

  public stopContinuousSiren() {
    if (this.currentSirenOsc1) {
      try {
        this.currentSirenOsc1.stop();
        this.currentSirenOsc1.disconnect();
      } catch {}
      this.currentSirenOsc1 = null;
    }
    if (this.currentSirenOsc2) {
      try {
        this.currentSirenOsc2.stop();
        this.currentSirenOsc2.disconnect();
      } catch {}
      this.currentSirenOsc2 = null;
    }
    if (this.sirenInterval) {
      window.clearInterval(this.sirenInterval);
      this.sirenInterval = null;
    }
  }

  // Play single test sample (3 seconds)
  public playTestSample(type: 'burglar_siren' | 'fire_t3' | 'co_t4' | 'strobe_chime' | 'entry_delay') {
    if (this.isMuted) return;
    this.stopContinuousSiren();
    
    if (type === 'burglar_siren') {
      this.startContinuousSiren();
      setTimeout(() => this.stopContinuousSiren(), 3000);
    } else if (type === 'fire_t3') {
      this.playFireT3Sequence();
    } else if (type === 'co_t4') {
      this.playCOT4Sequence();
    } else if (type === 'strobe_chime') {
      this.playDoorChime();
    } else if (type === 'entry_delay') {
      let count = 0;
      const interval = setInterval(() => {
        this.playCountdownBeep(true);
        count++;
        if (count >= 6) clearInterval(interval);
      }, 300);
    }
  }

  private playFireT3Sequence() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    // 3 pulses of 0.5s on, 0.5s off
    for (let i = 0; i < 3; i++) {
      const startTime = now + i * 0.7;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(3100, startTime);
      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.setValueAtTime(0.001, startTime + 0.45);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(startTime);
      osc.stop(startTime + 0.46);
    }
  }

  private playCOT4Sequence() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    // 4 short pulses of 0.1s
    for (let i = 0; i < 4; i++) {
      const startTime = now + i * 0.2;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(3200, startTime);
      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.setValueAtTime(0.001, startTime + 0.12);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(startTime);
      osc.stop(startTime + 0.13);
    }
  }
}

export const alarmAudio = new AlarmAudioEngine();
