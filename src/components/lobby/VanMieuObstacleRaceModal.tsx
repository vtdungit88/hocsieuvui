import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../utils/audio';
import {
  BOT_OBSTACLE_RECORDS,
  type ObstacleLeaderEntry
} from '../../data/vanMieuWorld';
import { Bot, Flag, Play, RotateCcw, Star, Trophy, User, X } from 'lucide-react';

type RaceState = 'TITLE_MENU' | 'PLAYING' | 'GAME_OVER';

interface ObstacleEntity {
  id: number;
  x: number; // world meters (80..760)
  kind: 'hurdle' | 'mushroom' | 'mud' | 'star';
  collected?: boolean;
}

interface VanMieuObstacleRaceModalProps {
  playerName: string;
  bestSec: number | null;
  onFinishRace: (timeSec: number, starsCollected: number) => void;
  onClose: () => void;
}

const TRACK_LENGTH = 800; // meters

const generateTrack = (): ObstacleEntity[] => {
  const list: ObstacleEntity[] = [];
  let uid = 1;
  for (let m = 105; m <= 740; m += 58) {
    const r = (m / 58) % 4;
    if (r === 1) {
      list.push({ id: uid++, x: m, kind: 'hurdle' });
    } else if (r === 2) {
      list.push({ id: uid++, x: m, kind: 'mushroom' });
      list.push({ id: uid++, x: m + 8, kind: 'star' });
    } else if (r === 3) {
      list.push({ id: uid++, x: m, kind: 'mud' });
    } else {
      list.push({ id: uid++, x: m, kind: 'hurdle' });
      list.push({ id: uid++, x: m + 22, kind: 'star' });
    }
  }
  return list;
};

export const VanMieuObstacleRaceModal: React.FC<VanMieuObstacleRaceModalProps> = ({
  playerName,
  bestSec,
  onFinishRace,
  onClose
}) => {
  const [gameState, setGameState] = useState<RaceState>('TITLE_MENU');
  const [leaderTab, setLeaderTab] = useState<'daily' | 'weekly'>('daily');
  const [hud, setHud] = useState({ dist: 0, elapsedSec: 0, stars: 0, playerY: 0 });
  const [entitiesSnapshot, setEntitiesSnapshot] = useState<ObstacleEntity[]>([]);

  // Live physics refs so rAF stays buttery 60fps
  const stateRef = useRef({
    dist: 0,
    speed: 36, // meters/sec
    playerY: 0, // height above ground px
    vy: 0,
    jumpsUsed: 0,
    elapsedMs: 0,
    stars: 0,
    mudUntil: 0,
    boostUntil: 0,
    lastTs: 0,
    entities: generateTrack()
  });
  const rafRef = useRef<number | null>(null);

  const startRace = useCallback(() => {
    soundManager.play('drum');
    const freshTrack = generateTrack();
    stateRef.current = {
      dist: 0,
      speed: 36,
      playerY: 0,
      vy: 0,
      jumpsUsed: 0,
      elapsedMs: 0,
      stars: 0,
      mudUntil: 0,
      boostUntil: 0,
      lastTs: performance.now(),
      entities: freshTrack
    };
    setEntitiesSnapshot(freshTrack);
    setHud({ dist: 0, elapsedSec: 0, stars: 0, playerY: 0 });
    setGameState('PLAYING');
  }, []);

  const triggerJump = useCallback(() => {
    if (gameState !== 'PLAYING') return;
    const s = stateRef.current;
    if (s.jumpsUsed < 2) {
      soundManager.play('jump');
      s.vy = s.jumpsUsed === 0 ? 440 : 380;
      s.jumpsUsed += 1;
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'PLAYING') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        triggerJump();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [gameState, triggerJump]);

  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const step = (now: number) => {
      const s = stateRef.current;
      const dt = Math.min(0.05, Math.max(0.001, (now - s.lastTs) / 1000));
      s.lastTs = now;
      s.elapsedMs += dt * 1000;

      // Vertical jump physics
      if (s.playerY > 0 || s.vy > 0) {
        s.playerY += s.vy * dt;
        s.vy -= 1250 * dt;
        if (s.playerY <= 0) {
          s.playerY = 0;
          s.vy = 0;
          s.jumpsUsed = 0;
        }
      }

      // Horizontal speed modifiers
      const curSpeed =
        now < s.boostUntil ? 54 : now < s.mudUntil ? 21 : 38;
      s.dist += curSpeed * dt;

      // Collisions within [-4, +4] meters window
      for (const ent of s.entities) {
        if (ent.collected) continue;
        if (Math.abs(ent.x - s.dist) < 4.5) {
          if (ent.kind === 'star' && s.playerY > 18) {
            ent.collected = true;
            s.stars += 1;
            soundManager.play('coin');
          } else if (ent.kind === 'mushroom' && s.playerY < 32) {
            ent.collected = true;
            s.vy = 560;
            s.jumpsUsed = 1;
            s.boostUntil = now + 1100;
            soundManager.play('jump');
          } else if (ent.kind === 'hurdle' && s.playerY < 26) {
            ent.collected = true;
            s.mudUntil = now + 900;
            soundManager.play('wrong');
          } else if (ent.kind === 'mud' && s.playerY < 10) {
            ent.collected = true;
            s.mudUntil = now + 1000;
            soundManager.play('splash');
          }
        }
      }

      setHud({
        dist: Math.min(TRACK_LENGTH, Math.round(s.dist)),
        elapsedSec: Math.round(s.elapsedMs / 100) / 10,
        stars: s.stars,
        playerY: Math.round(s.playerY)
      });
      setEntitiesSnapshot([...s.entities]);

      if (s.dist >= TRACK_LENGTH) {
        const finalSec = Math.round(s.elapsedMs / 100) / 10;
        soundManager.play('fanfare');
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.55 } });
        onFinishRace(finalSec, Math.max(1, s.stars));
        setGameState('GAME_OVER');
        return;
      }

      rafRef.current = window.requestAnimationFrame(step);
    };

    rafRef.current = window.requestAnimationFrame(step);
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [gameState, onFinishRace]);

  const leaderboardRows = useMemo<ObstacleLeaderEntry[]>(() => {
    const base = BOT_OBSTACLE_RECORDS.filter((r) => r.period === leaderTab);
    if (bestSec !== null) {
      return [
        ...base,
        {
          id: 'self_rec',
          name: `${playerName} [Người chơi]`,
          timeSec: bestSec,
          stars: 8,
          isBot: false,
          period: leaderTab
        }
      ].sort((a, b) => a.timeSec - b.timeSec);
    }
    return base.sort((a, b) => a.timeSec - b.timeSec);
  }, [bestSec, leaderTab, playerName]);

  const visibleEntities = entitiesSnapshot.filter(
    (e) => !e.collected && e.x >= hud.dist - 12 && e.x <= hud.dist + 82
  );

  return (
    <div
      data-interactive="true"
      onClick={onClose}
      className="fixed inset-0 z-[90] bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border-2 border-sky-400 dark:border-slate-700 p-4 sm:p-6 shadow-2xl space-y-4 max-h-[92dvh] overflow-y-auto"
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Flag className="w-5 h-5 text-sky-500" />
              Đường Đua Vượt Chướng Ngại — Đảo Phiêu Lưu
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Khu vực giả tưởng tách biệt ngoài Văn Miếu · Nhảy qua rào gỗ, bật nấm hồng &amp; gom Sao!
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {gameState === 'TITLE_MENU' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/35 border border-sky-200 dark:border-sky-800 text-xs text-slate-700 dark:text-slate-200 space-y-1.5">
              <div className="font-black text-sm text-sky-900 dark:text-sky-200">Cách điều khiển:</div>
              <p>Bấm nút <b>Nhảy / Nhảy Kép</b> (hoặc phím <b>Space / Mũi tên Lên</b>) để nhảy qua rào cản và vũng bùn, đạp lên <b>Nấm Hồng</b> để bay bứt tốc và nhặt <b>Sao Vàng</b> trên không!</p>
            </div>

            <button
              type="button"
              onClick={startRace}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:brightness-105 text-white font-black text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4" /> Bắt Đầu Đường Đua 800m!
            </button>

            {/* Daily / Weekly Leaderboard */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-3 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-500" /> Bảng Thành Tích Đường Đua
                </span>
                <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={() => setLeaderTab('daily')}
                    className={`px-2.5 py-1 rounded-lg cursor-pointer ${leaderTab === 'daily' ? 'bg-white dark:bg-slate-900 text-sky-600 shadow-xs' : 'text-slate-500'}`}
                  >
                    Hôm nay
                  </button>
                  <button
                    type="button"
                    onClick={() => setLeaderTab('weekly')}
                    className={`px-2.5 py-1 rounded-lg cursor-pointer ${leaderTab === 'weekly' ? 'bg-white dark:bg-slate-900 text-sky-600 shadow-xs' : 'text-slate-500'}`}
                  >
                    Tuần này
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                {leaderboardRows.map((row, idx) => (
                  <div
                    key={row.id}
                    className={`px-3 py-2 rounded-xl flex items-center justify-between text-xs font-bold ${
                      !row.isBot
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                        : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-5 text-center font-black tabular-nums">#{idx + 1}</span>
                      {row.isBot ? <Bot className="w-3.5 h-3.5 text-slate-500" /> : <User className="w-3.5 h-3.5 text-emerald-600" />}
                      <span>{row.name}</span>
                    </span>
                    <span className="font-black tabular-nums">{row.timeSec.toFixed(1)}s</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {gameState === 'PLAYING' && (
          <div className="space-y-3">
            {/* Live HUD */}
            <div className="grid grid-cols-3 gap-2 text-xs font-black">
              <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-200 tabular-nums">
                Quãng đường: {hud.dist}/{TRACK_LENGTH}m
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 tabular-nums text-center">
                ⏱ {hud.elapsedSec.toFixed(1)}s
              </div>
              <div className="p-2.5 rounded-xl bg-yellow-50 dark:bg-yellow-950/40 text-yellow-800 dark:text-yellow-200 tabular-nums text-right flex items-center justify-end gap-1">
                <Star className="w-3.5 h-3.5 text-amber-500" /> {hud.stars} Sao
              </div>
            </div>

            {/* Interactive 2D Runner Viewport */}
            <div
              onClick={triggerJump}
              className="relative w-full h-48 sm:h-56 rounded-2xl bg-gradient-to-b from-sky-300 via-sky-100 to-emerald-200 dark:from-slate-800 dark:to-emerald-950 border-2 border-sky-400 overflow-hidden cursor-pointer select-none"
            >
              {/* Wooden Sky Bridge Ground */}
              <div className="absolute inset-x-0 bottom-0 h-10 bg-amber-700 border-t-4 border-amber-500" />

              {/* Runner Character */}
              <div
                style={{
                  left: '14%',
                  bottom: `${40 + hud.playerY}px`
                }}
                className="absolute -translate-x-1/2 w-10 h-12 rounded-2xl bg-gradient-to-b from-blue-500 to-indigo-600 border-2 border-white shadow-lg flex flex-col items-center justify-center text-white font-black text-xs"
              >
                <span className="w-4 h-4 rounded-full bg-amber-200 border border-white mb-0.5" />
                <span>GO</span>
              </div>

              {/* Scrolling Obstacles & Stars */}
              {visibleEntities.map((ent) => {
                const leftPct = 14 + ((ent.x - hud.dist) / 76) * 86;
                return (
                  <div
                    key={ent.id}
                    style={{
                      left: `${leftPct}%`,
                      bottom: ent.kind === 'star' ? '106px' : '40px'
                    }}
                    className="absolute -translate-x-1/2"
                  >
                    {ent.kind === 'hurdle' && (
                      <div className="w-6 h-8 rounded-t-md bg-orange-600 border-2 border-amber-200 shadow" />
                    )}
                    {ent.kind === 'mushroom' && (
                      <div className="w-9 h-6 rounded-t-full bg-pink-500 border-2 border-white shadow" />
                    )}
                    {ent.kind === 'mud' && (
                      <div className="w-12 h-3 rounded-full bg-amber-900 border border-amber-700" />
                    )}
                    {ent.kind === 'star' && (
                      <Star className="w-7 h-7 text-amber-400 fill-amber-400 drop-shadow animate-bounce" />
                    )}
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={triggerJump}
              className="w-full min-h-[52px] py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-105 active:scale-95 text-white font-black text-sm shadow-lg cursor-pointer transition-transform"
            >
              NHẢY / NHẢY KÉP (Bấm hoặc Phím Space)
            </button>
          </div>
        )}

        {gameState === 'GAME_OVER' && (
          <div className="space-y-4 py-2">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 flex items-center gap-3">
              <Trophy className="w-8 h-8 text-amber-500 shrink-0" />
              <div>
                <div className="text-base font-black text-slate-900 dark:text-white">
                  Về đích sau {hud.elapsedSec.toFixed(1)} giây!
                </div>
                <div className="text-xs text-emerald-800 dark:text-emerald-200 font-bold">
                  Bạn nhặt được +{Math.max(1, hud.stars)} Sao trang trí trên đường đua!
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setGameState('TITLE_MENU')}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold cursor-pointer"
              >
                Xem Bảng Thành Tích
              </button>
              <button
                type="button"
                onClick={startRace}
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Đua Lại
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
