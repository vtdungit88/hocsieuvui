import { soundManager } from './audio';

export type MusicScene = 'home' | 'study' | 'shop' | 'blitz' | 'map' | 'lobby' | 'leaderboard';

interface VoiceStep {
  lead?: number;       // Melody note (Hz)
  harmony?: number;    // Optional harmony third/fifth (Hz)
  bass?: number;       // Bass note (Hz)
  chord?: number[];    // Soft pad triad/seventh (Hz[])
  pulse?: boolean;     // Light rhythmic percussive tick
}

interface SceneScore {
  bpm: number;
  leadType: OscillatorType;
  leadGain: number;
  leadDecay: number;
  filterHz: number;
  steps: VoiceStep[];
}

// Note frequency helpers (Hz)
const N = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.0, A3: 220.0, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, Fs4: 369.99, G4: 392.0, A4: 440.0, Bb4: 466.16, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, Fs5: 739.99, G5: 783.99, A5: 880.0, B5: 987.77, C6: 1046.5
} as const;

const CH = {
  C: [N.C4, N.E4, N.G4],
  Am: [N.A3, N.C4, N.E4],
  F: [N.F3, N.A3, N.C4],
  G: [N.G3, N.B3, N.D4],
  Dm: [N.D4, N.F4, N.A4],
  Bb: [N.Bb4 / 2, N.D4, N.F4],
  D: [N.D4, N.Fs4, N.A4],
  Bm: [N.B3, N.D4, N.Fs4],
  Em: [N.E4, N.G4, N.B4],
  A: [N.A3, N.E4, N.G4]
};

/**
 * 32-step original procedural themes (eighth-note grid) for each world.
 * Warm, joyful, non-monotonous A-B game phrases designed for kids.
 */
const SCORES: Record<Exclude<MusicScene, 'map'>, SceneScore> = {
  // 1. Trang chủ: Vui tươi, thân thiện (C Major bright marimba adventure)
  home: {
    bpm: 112,
    leadType: 'triangle',
    leadGain: 0.2,
    leadDecay: 0.26,
    filterHz: 3600,
    steps: [
      { lead: N.E5, bass: N.C3, chord: CH.C, pulse: true },
      { lead: N.G5 },
      { lead: N.A5, harmony: N.E5, pulse: true },
      { lead: N.G5 },
      { lead: N.E5, bass: N.G3, chord: CH.C, pulse: true },
      { lead: N.C5 },
      { lead: N.D5, harmony: N.B4, pulse: true },
      { lead: N.E5 },

      { lead: N.F5, bass: N.F3, chord: CH.F, pulse: true },
      { lead: N.A5 },
      { lead: N.G5, harmony: N.E5, pulse: true },
      { lead: N.F5 },
      { lead: N.E5, bass: N.C3, chord: CH.C, pulse: true },
      { lead: N.D5 },
      { lead: N.C5, harmony: N.G4, pulse: true },
      {},

      { lead: N.G5, bass: N.A3, chord: CH.Am, pulse: true },
      { lead: N.E5 },
      { lead: N.C5, harmony: N.A4, pulse: true },
      { lead: N.E5 },
      { lead: N.D5, bass: N.F3, chord: CH.F, pulse: true },
      { lead: N.F5 },
      { lead: N.A5, harmony: N.F5, pulse: true },
      { lead: N.G5 },

      { lead: N.E5, bass: N.G3, chord: CH.G, pulse: true },
      { lead: N.D5 },
      { lead: N.C5, harmony: N.E4, pulse: true },
      { lead: N.D5 },
      { lead: N.E5, harmony: N.C5, bass: N.C3, chord: CH.C, pulse: true },
      { lead: N.G5 },
      { lead: N.C6, harmony: N.E5, pulse: true },
      {}
    ]
  },

  // 2. Bài học: Nhẹ nhàng, tập trung (F Major soft kalimba & airy chords)
  study: {
    bpm: 84,
    leadType: 'sine',
    leadGain: 0.16,
    leadDecay: 0.42,
    filterHz: 2400,
    steps: [
      { lead: N.A4, bass: N.F3, chord: CH.F },
      {},
      { lead: N.C5 },
      { lead: N.D5 },
      { lead: N.C5, bass: N.C3, chord: CH.C },
      {},
      { lead: N.A4 },
      {},

      { lead: N.Bb4, bass: N.G3, chord: CH.Bb },
      {},
      { lead: N.A4 },
      { lead: N.G4 },
      { lead: N.F4, bass: N.C3, chord: CH.C },
      {},
      { lead: N.G4 },
      {},

      { lead: N.A4, bass: N.D3, chord: CH.Dm },
      {},
      { lead: N.F5 },
      { lead: N.D5 },
      { lead: N.C5, bass: N.Bb4 / 4, chord: CH.Bb },
      {},
      { lead: N.A4 },
      { lead: N.G4 },

      { lead: N.F4, bass: N.C3, chord: CH.C },
      {},
      { lead: N.A4 },
      { lead: N.G4 },
      { lead: N.F4, harmony: N.C4, bass: N.F3, chord: CH.F },
      {},
      {},
      {}
    ]
  },

  // 3. Studio: Nhí nhảnh, thời trang (G Major playful boutique bounce)
  shop: {
    bpm: 118,
    leadType: 'triangle',
    leadGain: 0.19,
    leadDecay: 0.2,
    filterHz: 3900,
    steps: [
      { lead: N.B4, bass: N.G3, chord: CH.G, pulse: true },
      { lead: N.D5 },
      { lead: N.G5, pulse: true },
      { lead: N.Fs5 },
      { lead: N.E5, bass: N.E3, chord: CH.Em, pulse: true },
      { lead: N.D5 },
      { lead: N.B4, pulse: true },
      { lead: N.G4 },

      { lead: N.A4, bass: N.C3, chord: CH.C, pulse: true },
      { lead: N.C5 },
      { lead: N.E5, pulse: true },
      { lead: N.D5 },
      { lead: N.C5, bass: N.D3, chord: CH.D, pulse: true },
      { lead: N.A4 },
      { lead: N.Fs4, pulse: true },
      { lead: N.A4 },

      { lead: N.G4, bass: N.G3, chord: CH.G, pulse: true },
      { lead: N.B4 },
      { lead: N.D5, pulse: true },
      { lead: N.G5 },
      { lead: N.A5, harmony: N.Fs5, bass: N.D3, chord: CH.D, pulse: true },
      { lead: N.G5 },
      { lead: N.Fs5, pulse: true },
      { lead: N.D5 },

      { lead: N.E5, bass: N.C3, chord: CH.C, pulse: true },
      { lead: N.G5 },
      { lead: N.Fs5, bass: N.D3, pulse: true },
      { lead: N.D5 },
      { lead: N.G5, harmony: N.B4, bass: N.G3, chord: CH.G, pulse: true },
      {},
      { lead: N.D5, pulse: true },
      {}
    ]
  },

  // 4. Đấu trường: Nhanh, sôi động (A minor / C major heroic arcade)
  blitz: {
    bpm: 138,
    leadType: 'sawtooth',
    leadGain: 0.13,
    leadDecay: 0.18,
    filterHz: 2800,
    steps: [
      { lead: N.A4, bass: N.A3, chord: CH.Am, pulse: true },
      { lead: N.C5 },
      { lead: N.E5, bass: N.A3, pulse: true },
      { lead: N.A5 },
      { lead: N.G5, bass: N.G3, chord: CH.G, pulse: true },
      { lead: N.E5 },
      { lead: N.D5, bass: N.G3, pulse: true },
      { lead: N.E5 },

      { lead: N.F5, bass: N.F3, chord: CH.F, pulse: true },
      { lead: N.E5 },
      { lead: N.D5, bass: N.F3, pulse: true },
      { lead: N.C5 },
      { lead: N.B4, bass: N.G3, chord: CH.G, pulse: true },
      { lead: N.D5 },
      { lead: N.E5, bass: N.G3, pulse: true },
      {},

      { lead: N.C5, bass: N.C3, chord: CH.C, pulse: true },
      { lead: N.E5 },
      { lead: N.G5, bass: N.C3, pulse: true },
      { lead: N.A5 },
      { lead: N.G5, bass: N.F3, chord: CH.F, pulse: true },
      { lead: N.F5 },
      { lead: N.E5, bass: N.F3, pulse: true },
      { lead: N.D5 },

      { lead: N.E5, bass: N.A3, chord: CH.Am, pulse: true },
      { lead: N.G5 },
      { lead: N.A5, harmony: N.E5, bass: N.G3, pulse: true },
      { lead: N.B5 },
      { lead: N.C6, harmony: N.E5, bass: N.A3, chord: CH.Am, pulse: true },
      {},
      { lead: N.A5, pulse: true },
      {}
    ]
  },

  // 5. Sảnh Online: Vui vẻ, giao lưu (D Major sunny social plaza)
  lobby: {
    bpm: 106,
    leadType: 'triangle',
    leadGain: 0.19,
    leadDecay: 0.25,
    filterHz: 3500,
    steps: [
      { lead: N.Fs5, bass: N.D3, chord: CH.D, pulse: true },
      { lead: N.E5 },
      { lead: N.D5, pulse: true },
      { lead: N.A4 },
      { lead: N.B4, bass: N.G3, chord: CH.G, pulse: true },
      { lead: N.D5 },
      { lead: N.G5, harmony: N.B4, pulse: true },
      { lead: N.Fs5 },

      { lead: N.E5, bass: N.A3, chord: CH.A, pulse: true },
      { lead: N.D5 },
      { lead: N.E5, pulse: true },
      { lead: N.Fs5 },
      { lead: N.D5, harmony: N.A4, bass: N.D3, chord: CH.D, pulse: true },
      {},
      { lead: N.A4, pulse: true },
      {},

      { lead: N.B4, bass: N.B3, chord: CH.Bm, pulse: true },
      { lead: N.D5 },
      { lead: N.Fs5, pulse: true },
      { lead: N.A5 },
      { lead: N.G5, bass: N.G3, chord: CH.G, pulse: true },
      { lead: N.Fs5 },
      { lead: N.E5, pulse: true },
      { lead: N.D5 },

      { lead: N.E5, bass: N.A3, chord: CH.A, pulse: true },
      { lead: N.Fs5 },
      { lead: N.G5, pulse: true },
      { lead: N.E5 },
      { lead: N.D5, harmony: N.Fs4, bass: N.D3, chord: CH.D, pulse: true },
      {},
      { lead: N.A5, pulse: true },
      {}
    ]
  },

  // 6. Bảng xếp hạng: Tươi sáng, vinh danh (C Major uplifting chimes)
  leaderboard: {
    bpm: 114,
    leadType: 'triangle',
    leadGain: 0.19,
    leadDecay: 0.28,
    filterHz: 3800,
    steps: [
      { lead: N.C5, harmony: N.E4, bass: N.C3, chord: CH.C, pulse: true },
      { lead: N.E5 },
      { lead: N.G5, pulse: true },
      { lead: N.C6 },
      { lead: N.B5, bass: N.G3, chord: CH.G, pulse: true },
      { lead: N.G5 },
      { lead: N.A5, pulse: true },
      { lead: N.G5 },

      { lead: N.F5, bass: N.F3, chord: CH.F, pulse: true },
      { lead: N.A5 },
      { lead: N.G5, pulse: true },
      { lead: N.E5 },
      { lead: N.D5, bass: N.G3, chord: CH.G, pulse: true },
      {},
      { lead: N.G5, pulse: true },
      {},

      { lead: N.E5, bass: N.A3, chord: CH.Am, pulse: true },
      { lead: N.G5 },
      { lead: N.A5, pulse: true },
      { lead: N.C6 },
      { lead: N.G5, bass: N.F3, chord: CH.F, pulse: true },
      { lead: N.F5 },
      { lead: N.E5, pulse: true },
      { lead: N.D5 },

      { lead: N.C5, bass: N.G3, chord: CH.G, pulse: true },
      { lead: N.E5 },
      { lead: N.G5, pulse: true },
      { lead: N.B5 },
      { lead: N.C6, harmony: N.E5, bass: N.C3, chord: CH.C, pulse: true },
      {},
      {},
      {}
    ]
  }
};

const PREF_KEY = 'hsv_music_enabled';

type MusicListener = () => void;

class GameMusic {
  private ctx: AudioContext | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private masterGain: GainNode | null = null;
  private sceneBus: GainNode | null = null;
  private sceneFilter: BiquadFilterNode | null = null;
  private schedulerTimer: number | null = null;
  private scene: MusicScene = 'home';
  private stepIndex = 0;
  private nextNoteTime = 0;
  private unlocked = false;
  private listeners = new Set<MusicListener>();
  private visibilityWired = false;
  private enabled = (() => {
    try {
      return localStorage.getItem(PREF_KEY) !== '0';
    } catch {
      return true;
    }
  })();

  constructor() {
    if (typeof document !== 'undefined' && !this.visibilityWired) {
      this.visibilityWired = true;
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.stopScheduler(true);
        } else if (this.enabled && this.unlocked && !soundManager.getMuted() && this.scene !== 'map') {
          this.start();
        }
      });
    }
  }

  subscribe(listener: MusicListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit() {
    this.listeners.forEach((fn) => {
      try {
        fn();
      } catch {
        /* ignore subscriber errors */
      }
    });
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  isActuallyPlaying(): boolean {
    return this.schedulerTimer !== null && this.enabled && !soundManager.getMuted() && this.scene !== 'map';
  }

  getScene(): MusicScene {
    return this.scene;
  }

  setEnabled(on: boolean) {
    this.enabled = on;
    try {
      localStorage.setItem(PREF_KEY, on ? '1' : '0');
    } catch {
      /* storage optional */
    }
    if (on) {
      this.unlocked = true;
      this.ensureAudioContext(true);
      if (!soundManager.getMuted() && this.scene !== 'map') {
        this.start();
      }
    } else {
      this.stopScheduler(true);
    }
    this.emit();
  }

  toggleEnabled(): boolean {
    const next = !this.enabled;
    this.setEnabled(next);
    return next;
  }

  setMuted(muted: boolean) {
    if (muted) {
      this.stopScheduler(true);
    } else if (this.enabled && this.unlocked && this.scene !== 'map') {
      this.ensureAudioContext(true);
      this.start();
    }
    this.emit();
  }

  setScene(nextScene: MusicScene) {
    if (this.scene === nextScene) return;
    this.scene = nextScene;
    this.stepIndex = 0;

    if (nextScene === 'map') {
      this.stopScheduler(true);
      this.emit();
      return;
    }

    if (this.enabled && this.unlocked && !soundManager.getMuted()) {
      // Smoothly crossfade out previous scene bus and start fresh scene bus
      this.fadeOutActiveBus();
      if (this.schedulerTimer === null) {
        this.start();
      } else if (this.ctx) {
        this.createSceneBus(SCORES[nextScene].filterHz);
        this.nextNoteTime = this.ctx.currentTime + 0.08;
      }
    }
    this.emit();
  }

  /** Must be called from a user gesture (pointerdown/touchstart/click/keydown) to satisfy browser autoplay policy. */
  unlock() {
    this.unlocked = true;
    const ready = this.ensureAudioContext(true);
    if (ready && this.enabled && !soundManager.getMuted() && this.scene !== 'map' && this.schedulerTimer === null) {
      this.start();
    }
  }

  private ensureAudioContext(resumeSync: boolean): boolean {
    if (typeof window === 'undefined') return false;
    try {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return false;

      if (!this.ctx) {
        this.ctx = new AC();
        this.compressor = this.ctx.createDynamicsCompressor();
        this.compressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
        this.compressor.knee.setValueAtTime(16, this.ctx.currentTime);
        this.compressor.ratio.setValueAtTime(4, this.ctx.currentTime);
        this.compressor.attack.setValueAtTime(0.01, this.ctx.currentTime);
        this.compressor.release.setValueAtTime(0.18, this.ctx.currentTime);

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.24, this.ctx.currentTime);

        this.compressor.connect(this.masterGain);
        this.masterGain.connect(this.ctx.destination);
      }

      if (resumeSync && this.ctx.state === 'suspended') {
        void this.ctx.resume().then(() => {
          if (this.enabled && this.unlocked && !soundManager.getMuted() && this.scene !== 'map' && this.schedulerTimer === null) {
            this.start();
          }
        }).catch(() => undefined);
      }
      return true;
    } catch {
      return false;
    }
  }

  private createSceneBus(filterHz: number) {
    if (!this.ctx || !this.compressor) return;
    const now = this.ctx.currentTime;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(filterHz, now);
    filter.Q.setValueAtTime(0.7, now);

    const bus = this.ctx.createGain();
    bus.gain.setValueAtTime(0.0001, now);
    bus.gain.linearRampToValueAtTime(1, now + 0.45);

    filter.connect(bus);
    bus.connect(this.compressor);

    this.sceneFilter = filter;
    this.sceneBus = bus;
  }

  private fadeOutActiveBus() {
    if (!this.ctx || !this.sceneBus) return;
    const oldBus = this.sceneBus;
    const oldFilter = this.sceneFilter;
    this.sceneBus = null;
    this.sceneFilter = null;
    try {
      const now = this.ctx.currentTime;
      oldBus.gain.cancelScheduledValues(now);
      oldBus.gain.setValueAtTime(Math.max(0.0001, oldBus.gain.value), now);
      oldBus.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
      window.setTimeout(() => {
        try {
          oldFilter?.disconnect();
          oldBus.disconnect();
        } catch {
          /* ignore */
        }
      }, 360);
    } catch {
      /* ignore */
    }
  }

  private start() {
    if (
      this.schedulerTimer !== null ||
      !this.enabled ||
      !this.unlocked ||
      this.scene === 'map' ||
      soundManager.getMuted() ||
      (typeof document !== 'undefined' && document.hidden)
    ) {
      return;
    }

    if (!this.ensureAudioContext(true) || !this.ctx) return;

    const score = SCORES[this.scene];
    this.fadeOutActiveBus();
    this.createSceneBus(score.filterHz);
    this.nextNoteTime = this.ctx.currentTime + 0.06;
    this.schedulerTimer = window.setInterval(() => this.scheduler(), 60);
    this.emit();
  }

  private stopScheduler(fadeOut: boolean) {
    if (this.schedulerTimer !== null) {
      window.clearInterval(this.schedulerTimer);
      this.schedulerTimer = null;
    }
    if (fadeOut) {
      this.fadeOutActiveBus();
    }
    this.emit();
  }

  private scheduler() {
    if (!this.ctx || !this.sceneFilter || this.scene === 'map') return;
    if (!this.enabled || soundManager.getMuted()) {
      this.stopScheduler(true);
      return;
    }
    if (this.ctx.state !== 'running') return;

    const score = SCORES[this.scene];
    const stepDur = 60 / score.bpm / 2; // Eighth-note grid
    const scheduleAhead = 0.18;

    while (this.nextNoteTime < this.ctx.currentTime + scheduleAhead) {
      const step = score.steps[this.stepIndex % score.steps.length];
      this.scheduleStep(step, this.nextNoteTime, stepDur, score);
      this.nextNoteTime += stepDur;
      this.stepIndex++;
    }
  }

  private scheduleStep(step: VoiceStep, time: number, stepDur: number, score: SceneScore) {
    if (!this.ctx || !this.sceneFilter) return;

    if (step.lead) {
      this.playTone(step.lead, time, score.leadDecay, score.leadGain, score.leadType);
      // Gentle bright harmonic chime on home/shop/leaderboard accents
      if (this.scene === 'home' || this.scene === 'leaderboard') {
        this.playTone(step.lead * 2, time, score.leadDecay * 0.6, score.leadGain * 0.14, 'sine');
      }
    }

    if (step.harmony) {
      this.playTone(step.harmony, time, score.leadDecay * 0.9, score.leadGain * 0.45, 'sine');
    }

    if (step.bass) {
      this.playTone(step.bass, time, Math.min(0.45, stepDur * 1.75), 0.15, 'triangle');
    }

    if (step.chord) {
      for (const freq of step.chord) {
        this.playTone(freq, time, stepDur * 3.4, 0.036, 'sine', 0.045);
      }
    }

    if (step.pulse) {
      this.playSoftPulse(time);
    }
  }

  private playTone(
    freq: number,
    startTime: number,
    duration: number,
    peakGain: number,
    type: OscillatorType,
    attack = 0.015
  ) {
    if (!this.ctx || !this.sceneFilter) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(peakGain, startTime + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.sceneFilter);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.04);
  }

  private playSoftPulse(startTime: number) {
    if (!this.ctx || !this.sceneFilter) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(920, startTime);
    osc.frequency.exponentialRampToValueAtTime(340, startTime + 0.035);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(0.028, startTime + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.045);

    osc.connect(gain);
    gain.connect(this.sceneFilter);

    osc.start(startTime);
    osc.stop(startTime + 0.055);
  }
}

export const gameMusic = new GameMusic();
