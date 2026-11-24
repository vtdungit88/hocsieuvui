import { soundManager } from './audio';

export type MusicScene = 'study' | 'shop' | 'blitz' | 'map' | 'lobby' | 'leaderboard';
const THEMES: Record<MusicScene, number[]> = {
  study: [392, 440, 523.25, 587.33, 523.25, 440, 392, 329.63],
  shop: [523.25, 659.25, 783.99, 659.25, 587.33, 783.99, 880, 783.99],
  blitz: [392, 523.25, 659.25, 783.99, 659.25, 523.25, 587.33, 783.99],
  map: [261.63, 329.63, 392, 523.25, 440, 392, 329.63, 293.66],
  lobby: [329.63, 392, 493.88, 587.33, 493.88, 392, 349.23, 440],
  leaderboard: [440, 523.25, 659.25, 783.99, 880, 783.99, 659.25, 523.25]
};
const PREF = 'hsv_music_enabled';
class GameMusic {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private timer: number | null = null;
  private scene: MusicScene = 'study';
  private step = 0;
  private enabled = (() => { try { return localStorage.getItem(PREF) !== '0'; } catch { return true; } })();
  private unlocked = false;

  isEnabled() { return this.enabled; }
  setEnabled(on: boolean) {
    this.enabled = on;
    try { localStorage.setItem(PREF, on ? '1' : '0'); } catch { /* storage optional */ }
    if (on) { this.unlocked = true; this.start(); } else this.stop();
  }
  setMuted(muted: boolean) { if (muted) this.stop(); else if (this.enabled) this.start(); }
  setScene(scene: MusicScene) {
    if (this.scene === scene) return;
    this.scene = scene;
    this.step = 0;
    if (this.timer !== null) { this.stop(); if (this.enabled && this.unlocked && !soundManager.getMuted()) this.start(); }
  }
  unlock() { this.unlocked = true; if (this.enabled && !soundManager.getMuted()) this.start(); }
  private start() {
    if (this.timer !== null || !this.enabled || this.scene === 'map' || soundManager.getMuted() || typeof window === 'undefined') return;
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return;
      this.ctx = this.ctx ?? new AC();
      void this.ctx.resume();
      this.master = this.ctx.createGain();
      this.master.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.master.gain.linearRampToValueAtTime(0.035, this.ctx.currentTime + 1.2);
      this.master.connect(this.ctx.destination);
      this.timer = window.setInterval(() => this.schedule(), 360);
    } catch { this.stop(); }
  }
  private stop() {
    if (this.timer !== null) window.clearInterval(this.timer);
    this.timer = null;
    if (this.ctx && this.master) {
      const old = this.master;
      old.gain.cancelScheduledValues(this.ctx.currentTime);
      old.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.12);
      window.setTimeout(() => { try { old.disconnect(); } catch { /* ignore */ } }, 500);
    }
    this.master = null;
  }
  private schedule() {
    if (!this.ctx || !this.master || this.ctx.state !== 'running' || soundManager.getMuted()) { if (soundManager.getMuted()) this.stop(); return; }
    const t = this.ctx.currentTime + 0.03;
    const melody = THEMES[this.scene];
    const note = melody[this.step % melody.length];
    const beat = this.scene === 'blitz' ? 0.23 : 0.38;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = this.scene === 'shop' ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(note, t);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(this.scene === 'blitz' ? 0.045 : 0.028, t + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + beat * 0.85);
    osc.connect(gain); gain.connect(this.master); osc.start(t); osc.stop(t + beat);
    if (this.step % 4 === 0) {
      const bass = this.ctx.createOscillator(); const bg = this.ctx.createGain();
      bass.type = 'sine'; bass.frequency.value = note / 2;
      bg.gain.setValueAtTime(0.0001, t); bg.gain.linearRampToValueAtTime(0.012, t + 0.04); bg.gain.exponentialRampToValueAtTime(0.0001, t + beat * 3.5);
      bass.connect(bg); bg.connect(this.master); bass.start(t); bass.stop(t + beat * 3.6);
    }
    this.step++;
  }
}
export const gameMusic = new GameMusic();
