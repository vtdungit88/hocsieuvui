import { soundManager } from './audio';

export type MusicScene = 'home' | 'study' | 'shop' | 'blitz' | 'map' | 'lobby' | 'leaderboard';

interface VoiceStep {
  lead?: number;       // Melody note (Hz)
  bass?: number;       // Bass note (Hz)
  chord?: number[];    // Soft pad chord (Hz[])
  arp?: number;        // Soft harp-like arpeggio note (Hz)
  pulse?: boolean;     // Light rhythmic tick
}

interface SceneScore {
  bpm: number;
  leadType: OscillatorType;
  leadGain: number;
  leadDecay: number;
  filterHz: number;
  arpGain: number;
  padGain: number;
  pulseEvery: number;  // 0 = no pulse, n = every n steps
  steps: VoiceStep[];
}

const NOTE_PC: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

function midiToHz(m: number): number {
  return 440 * Math.pow(2, (m - 69) / 12);
}

/** "C#5" / "Bb4" / "A4" -> Hz; "." = rest. */
function noteHz(tok: string): number | undefined {
  if (tok === '.' || tok === '-') return undefined;
  const m = /^([A-G])([#b]?)(\d)$/.exec(tok);
  if (!m) return undefined;
  const pc = NOTE_PC[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0);
  return midiToHz(12 * (Number(m[3]) + 1) + pc);
}

/** "Am" / "Bb" / "F#m" -> pitch class + minor flag. */
function parseChord(name: string): { pc: number; minor: boolean } {
  const m = /^([A-G])([#b]?)(m?)$/.exec(name);
  if (!m) return { pc: 0, minor: false };
  return { pc: (NOTE_PC[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0) + 12) % 12, minor: m[3] === 'm' };
}

type Bar = [chord: string, melody: string];

interface SceneSpec {
  bpm: number;
  leadType: OscillatorType;
  leadGain: number;
  leadDecay: number;
  filterHz: number;
  arpGain: number;
  padGain: number;
  pulseEvery: number;
  bars: Bar[]; // 16 bars x 8 eighth-notes = 128 steps per loop
}

function buildScore(spec: SceneSpec): SceneScore {
  const steps: VoiceStep[] = [];
  for (const [chordName, melody] of spec.bars) {
    const { pc, minor } = parseChord(chordName);
    let bassMidi = 36 + pc;
    if (bassMidi < 43) bassMidi += 12;
    const third = minor ? 3 : 4;
    const base = 48 + pc; // pad octave
    const pad = [base, base + third, base + 7].map(midiToHz);
    const arpBase = 60 + pc;
    const arpTones = [arpBase, arpBase + third, arpBase + 7, arpBase + 12].map(midiToHz);
    const arpPattern = [0, 1, 2, 3, 2, 1, 2, 1];
    const toks = melody.trim().split(/\s+/);
    for (let k = 0; k < 8; k++) {
      const step: VoiceStep = {};
      const lead = noteHz(toks[k] ?? '.');
      if (lead) step.lead = lead;
      if (k === 0) { step.bass = midiToHz(bassMidi); step.chord = pad; }
      if (k === 4) step.bass = midiToHz(bassMidi + (bassMidi > 50 ? 0 : 7));
      if (spec.arpGain > 0) step.arp = arpTones[arpPattern[k]];
      if (spec.pulseEvery > 0 && k % spec.pulseEvery === 0) step.pulse = true;
      steps.push(step);
    }
  }
  return {
    bpm: spec.bpm, leadType: spec.leadType, leadGain: spec.leadGain, leadDecay: spec.leadDecay,
    filterHz: spec.filterHz, arpGain: spec.arpGain, padGain: spec.padGain, pulseEvery: spec.pulseEvery, steps
  };
}

/**
 * Nhạc nền thủ công (tự sáng tác, tổng hợp bằng Web Audio – không cần tải file).
 * Mỗi khu vực một giai điệu riêng dài 16 ô nhịp (~80-95 giây rồi mới lặp), tiết tấu chậm, âm trầm êm
 * theo phong cách nhạc game phiêu lưu/nông trại: pad dày + arpeggio như đàn hạc + giai điệu hộp nhạc.
 */
const SCORES: Record<Exclude<MusicScene, 'map'>, SceneScore> = {
  // Trang chủ: C trưởng, chậm, ấm áp như làng quê trong game nông trại
  home: buildScore({
    bpm: 80, leadType: 'triangle', leadGain: 0.17, leadDecay: 0.55, filterHz: 2300, arpGain: 0.05, padGain: 0.04, pulseEvery: 0,
    bars: [
      ['C', 'E5 . G5 . E5 . D5 .'], ['G', 'D5 . B4 . D5 . G5 .'], ['Am', 'C5 . E5 . A5 . G5 .'], ['Em', 'E5 . G5 . B5 . G5 .'],
      ['F', 'A4 . C5 . F5 . E5 .'], ['C', 'E5 . D5 . C5 . G4 .'], ['F', 'F5 . A5 . G5 . F5 .'], ['G', 'D5 . . . B4 . D5 .'],
      ['Am', 'E5 . A5 . C6 . B5 .'], ['F', 'A5 . G5 . F5 . C5 .'], ['C', 'E5 . G5 . C6 . G5 .'], ['G', 'B5 . A5 . G5 . D5 .'],
      ['Am', 'C5 . E5 . D5 . C5 .'], ['Dm', 'D5 . F5 . A5 . F5 .'], ['G', 'G5 . F5 . D5 . B4 .'], ['C', 'C5 . E5 . G5 . . .']
    ]
  }),

  // Bài học: F trưởng, rất chậm, hộp nhạc dịu để tập trung
  study: buildScore({
    bpm: 70, leadType: 'sine', leadGain: 0.15, leadDecay: 0.7, filterHz: 1900, arpGain: 0.04, padGain: 0.045, pulseEvery: 0,
    bars: [
      ['F', 'A4 . . . C5 . A4 .'], ['Dm', 'D5 . . . F5 . E5 .'], ['Bb', 'D5 . . . F5 . D5 .'], ['C', 'E5 . . . G5 . E5 .'],
      ['F', 'A4 . C5 . F5 . . .'], ['Am', 'E5 . . . C5 . A4 .'], ['Bb', 'D5 . F5 . D5 . C5 .'], ['C', 'E5 . D5 . C5 . . .'],
      ['Dm', 'A4 . D5 . F5 . A5 .'], ['Bb', 'G5 . F5 . D5 . F5 .'], ['F', 'A5 . G5 . F5 . C5 .'], ['C', 'E5 . G5 . E5 . D5 .'],
      ['Dm', 'F5 . D5 . A4 . D5 .'], ['Bb', 'D5 . F5 . Bb4 . D5 .'], ['C', 'E5 . D5 . C5 . B4 .'], ['F', 'A4 . C5 . F5 . . .']
    ]
  }),

  // Studio: G trưởng, nhí nhảnh nhẹ nhàng kiểu cửa hàng thời trang trong game
  shop: buildScore({
    bpm: 92, leadType: 'triangle', leadGain: 0.16, leadDecay: 0.32, filterHz: 2700, arpGain: 0.05, padGain: 0.035, pulseEvery: 4,
    bars: [
      ['G', 'B4 . D5 G5 . D5 B4 .'], ['Em', 'G5 . E5 G5 . B5 G5 .'], ['C', 'E5 . G5 E5 . C5 E5 .'], ['D', 'F#5 . A5 F#5 . D5 . .'],
      ['G', 'D5 . G5 B5 . G5 D5 .'], ['Em', 'E5 . G5 B5 . A5 G5 .'], ['Am', 'C5 . E5 A5 . G5 E5 .'], ['D', 'F#5 . E5 D5 . A4 D5 .'],
      ['C', 'G5 . E5 G5 . C6 G5 .'], ['D', 'A5 . F#5 D5 . F#5 A5 .'], ['Bm', 'D5 . F#5 B5 . F#5 D5 .'], ['Em', 'G5 . B5 G5 . E5 G5 .'],
      ['C', 'E5 . G5 C6 . G5 E5 .'], ['D', 'F#5 . A5 F#5 . E5 D5 .'], ['G', 'G5 . B5 D6 . B5 G5 .'], ['G', 'G5 . . . . . . .']
    ]
  }),

  // Đấu trường: A thứ, nhịp nhanh hơn, kịch tính kiểu game phiêu lưu nhưng âm vẫn êm
  blitz: buildScore({
    bpm: 124, leadType: 'square', leadGain: 0.075, leadDecay: 0.2, filterHz: 2000, arpGain: 0, padGain: 0.04, pulseEvery: 2,
    bars: [
      ['Am', 'A4 C5 E5 A5 G5 E5 C5 E5'], ['F', 'F5 E5 C5 A4 C5 F5 E5 C5'], ['C', 'E5 G5 C6 G5 E5 G5 E5 C5'], ['G', 'D5 G5 B5 G5 D5 B4 D5 G5'],
      ['Am', 'A4 C5 E5 A5 C6 A5 E5 C5'], ['F', 'A5 F5 C5 F5 A5 C6 A5 F5'], ['G', 'B5 G5 D5 G5 B5 D6 B5 G5'], ['Em', 'E5 G5 B5 G5 E5 B4 E5 G5'],
      ['Am', 'E5 A5 E5 C5 E5 A5 C6 A5'], ['F', 'C6 A5 F5 A5 C6 F5 A5 C6'], ['C', 'G5 E5 C5 E5 G5 C6 G5 E5'], ['G', 'D6 B5 G5 B5 D6 G5 B5 D6'],
      ['F', 'F5 A5 C6 A5 F5 C5 F5 A5'], ['G', 'G5 B5 D6 B5 G5 D5 G5 B5'], ['Am', 'A5 C6 E6 C6 A5 E5 A5 C6'], ['Am', 'A5 . . . . . . .']
    ]
  }),

  // Sảnh Online: D trưởng, tươi sáng thân thiện như quảng trường làng
  lobby: buildScore({
    bpm: 90, leadType: 'triangle', leadGain: 0.16, leadDecay: 0.4, filterHz: 2600, arpGain: 0.05, padGain: 0.038, pulseEvery: 4,
    bars: [
      ['D', 'F#5 . A5 . F#5 . D5 .'], ['A', 'E5 . A4 . C#5 . E5 .'], ['Bm', 'D5 . F#5 . B5 . A5 .'], ['G', 'G5 . B4 . D5 . G5 .'],
      ['D', 'A5 . F#5 . D5 . F#5 .'], ['A', 'E5 . C#5 . A4 . C#5 .'], ['G', 'B4 . D5 . G5 . F#5 .'], ['A', 'E5 . . . C#5 . E5 .'],
      ['Bm', 'F#5 . D5 . B4 . D5 .'], ['G', 'G5 . B5 . A5 . G5 .'], ['D', 'F#5 . E5 . D5 . A4 .'], ['A', 'C#5 . E5 . A5 . G5 .'],
      ['G', 'G5 . F#5 . E5 . D5 .'], ['A', 'E5 . F#5 . G5 . A5 .'], ['D', 'A5 . F#5 . D5 . F#5 .'], ['D', 'D5 . . . . . . .']
    ]
  }),

  // Bảng xếp hạng: Si giáng trưởng, trang trọng nhẹ nhàng như nhạc vinh danh trong game
  leaderboard: buildScore({
    bpm: 76, leadType: 'triangle', leadGain: 0.16, leadDecay: 0.6, filterHz: 2200, arpGain: 0.04, padGain: 0.05, pulseEvery: 0,
    bars: [
      ['Bb', 'D5 . F5 . Bb5 . A5 .'], ['Gm', 'G5 . D5 . Bb4 . D5 .'], ['Eb', 'G5 . Bb5 . G5 . Eb5 .'], ['F', 'A5 . F5 . C5 . F5 .'],
      ['Bb', 'D5 . F5 . D6 . Bb5 .'], ['Gm', 'G5 . Bb5 . D6 . Bb5 .'], ['Eb', 'Eb5 . G5 . Bb5 . G5 .'], ['F', 'A5 . C6 . A5 . F5 .'],
      ['Cm', 'C5 . Eb5 . G5 . Eb5 .'], ['F', 'F5 . A5 . C6 . A5 .'], ['Bb', 'D6 . C6 . Bb5 . F5 .'], ['Gm', 'Bb5 . G5 . D5 . G5 .'],
      ['Eb', 'G5 . Bb5 . Eb6 . Bb5 .'], ['F', 'C6 . A5 . F5 . A5 .'], ['Bb', 'D5 . F5 . Bb5 . D6 .'], ['Bb', 'Bb5 . . . . . . .']
    ]
  })
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
      // Lớp chuông nhẹ một quãng tám trên giúp giai điệu "lấp lánh" như hộp nhạc
      if (score.leadType !== 'square') {
        this.playTone(step.lead * 2, time, score.leadDecay * 0.5, score.leadGain * 0.1, 'sine');
      }
    }

    if (step.arp) {
      this.playTone(step.arp, time, stepDur * 2.2, score.arpGain, 'sine', 0.01);
    }

    if (step.bass) {
      this.playTone(step.bass, time, Math.min(0.9, stepDur * 3.5), 0.13, 'triangle', 0.02);
    }

    if (step.chord) {
      for (const freq of step.chord) {
        this.playTone(freq, time, stepDur * 7.5, score.padGain, 'sine', 0.18);
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
