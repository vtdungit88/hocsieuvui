import React, { useCallback, useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../utils/audio';
import { Bot, Flame, RotateCcw, Trophy, User, Users, X } from 'lucide-react';

type TugState = 'TITLE_MENU' | 'PLAYING' | 'GAME_OVER';

export interface TugParticipant {
  id: string;
  name: string;
  team: 'blue' | 'red';
  isBot: boolean;
}

interface VanMieuTugOfWarModalProps {
  playerId: string;
  playerName: string;
  onlinePeers: { id: string; alias: string }[];
  externalPeerPullDelta: number; // incremented from Realtime when peer helps pull
  onBroadcastPull: (power: number) => void;
  onWin: (starsEarned: number) => void;
  onClose: () => void;
}

export const VanMieuTugOfWarModal: React.FC<VanMieuTugOfWarModalProps> = ({
  playerId,
  playerName,
  onlinePeers,
  externalPeerPullDelta,
  onBroadcastPull,
  onWin,
  onClose
}) => {
  const [gameState, setGameState] = useState<TugState>('TITLE_MENU');
  const [ropePos, setRopePos] = useState(0); // -100 (Blue wins) to +100 (Red wins)
  const [timeLeft, setTimeLeft] = useState(18);
  const [tapCount, setTapCount] = useState(0);
  const [roster, setRoster] = useState<TugParticipant[]>([]);
  const lastExternalRef = useRef(externalPeerPullDelta);

  const buildRoster = useCallback((): TugParticipant[] => {
    const peerTeammate = onlinePeers[0]
      ? { id: onlinePeers[0].id, name: `${onlinePeers[0].alias} [Người chơi]`, team: 'blue' as const, isBot: false }
      : { id: 'bot_b2', name: 'Cún Corgi [BOT]', team: 'blue' as const, isBot: true };

    const peerRival = onlinePeers[1]
      ? { id: onlinePeers[1].id, name: `${onlinePeers[1].alias} [Người chơi]`, team: 'red' as const, isBot: false }
      : { id: 'bot_r1', name: 'Gấu Trúc [BOT]', team: 'red' as const, isBot: true };

    return [
      { id: playerId, name: `${playerName} (Bạn)`, team: 'blue', isBot: false },
      peerTeammate,
      peerRival,
      { id: 'bot_r2', name: 'Mèo Cam [BOT]', team: 'red', isBot: true }
    ];
  }, [onlinePeers, playerId, playerName]);

  const startMatch = () => {
    soundManager.play('drum');
    setRoster(buildRoster());
    setRopePos(0);
    setTimeLeft(18);
    setTapCount(0);
    setGameState('PLAYING');
  };

  // Receive live teammate pulls via Realtime
  useEffect(() => {
    if (gameState !== 'PLAYING') {
      lastExternalRef.current = externalPeerPullDelta;
      return;
    }
    const diff = externalPeerPullDelta - lastExternalRef.current;
    if (diff > 0) {
      lastExternalRef.current = externalPeerPullDelta;
      setRopePos((p) => Math.max(-100, p - diff));
    }
  }, [externalPeerPullDelta, gameState]);

  const handlePull = useCallback(() => {
    if (gameState !== 'PLAYING') return;
    soundManager.play('click');
    setTapCount((c) => c + 1);
    onBroadcastPull(6);
    setRopePos((prev) => {
      const next = Math.max(-100, prev - 6.5);
      if (next <= -100) {
        setGameState('GAME_OVER');
      }
      return next;
    });
  }, [gameState, onBroadcastPull]);

  // Spacebar support
  useEffect(() => {
    if (gameState !== 'PLAYING') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        handlePull();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [gameState, handlePull]);

  // Match timer & Bot tug simulation
  useEffect(() => {
    if (gameState !== 'PLAYING') return;
    const tick = window.setInterval(() => {
      setRopePos((prev) => {
        // Blue bot contributes subtle assist, Red bots pull steadily
        const blueBotAssist = -2.2;
        const redBotPull = 4.6 + Math.random() * 2.2;
        const next = Math.max(-100, Math.min(100, prev + blueBotAssist + redBotPull));
        if (next >= 100 || next <= -100) {
          setGameState('GAME_OVER');
        }
        return next;
      });
    }, 320);

    const countdown = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setGameState('GAME_OVER');
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(tick);
      window.clearInterval(countdown);
    };
  }, [gameState]);

  // Award stars cleanly when finishing
  const awardedRef = useRef(false);
  useEffect(() => {
    if (gameState === 'PLAYING') {
      awardedRef.current = false;
      return;
    }
    if (gameState === 'GAME_OVER' && !awardedRef.current) {
      awardedRef.current = true;
      if (ropePos < 0) {
        soundManager.play('fanfare');
        confetti({ particleCount: 90, spread: 85, origin: { y: 0.55 } });
        onWin(2);
      } else {
        soundManager.play('coin');
        onWin(1);
      }
    }
  }, [gameState, onWin, ropePos]);

  const blueTeam = roster.filter((p) => p.team === 'blue');
  const redTeam = roster.filter((p) => p.team === 'red');

  return (
    <div
      data-interactive="true"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-3xl bg-white dark:bg-slate-900 border-2 border-rose-400 dark:border-slate-700 p-4 sm:p-6 shadow-2xl space-y-4"
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-rose-500" />
              Kéo Co Đồng Đội — Sân Chơi Dân Gian
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Nhấp liên tục hoặc bấm phím Space để kéo cờ đỏ về phía Đội Xanh trong 18 giây!
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
          <div className="space-y-4 py-2">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/35 border border-emerald-200 dark:border-emerald-800 text-xs text-slate-700 dark:text-slate-200 space-y-2">
              <div className="font-black text-sm text-emerald-900 dark:text-emerald-200">
                Đội hình ghép tự động (phân biệt rõ Người thật &amp; BOT):
              </div>
              <p>
                Nếu trong sảnh đang có bạn bè trực tuyến, họ có thể tham gia trợ lực theo thời gian thực. Nếu chơi một mình, đồng đội <b>[BOT]</b> sẽ tự động vào sân cùng bạn!
              </p>
            </div>
            <button
              type="button"
              onClick={startMatch}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:brightness-105 text-white font-black text-sm shadow-lg cursor-pointer"
            >
              Vào Sân Kéo Co Ngay!
            </button>
          </div>
        )}

        {gameState !== 'TITLE_MENU' && (
          <>
            {/* Timer & Team Lineups */}
            <div className="flex items-center justify-between px-2 text-xs font-black">
              <span className="text-sky-600 dark:text-sky-400">Đội Xanh (Bạn)</span>
              <span className="px-3 py-1 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 tabular-nums">
                ⏱ {timeLeft}s
              </span>
              <span className="text-rose-600 dark:text-rose-400">Đội Đỏ</span>
            </div>

            {/* Teams Clarity Badges */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
              <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 space-y-1">
                {blueTeam.map((m) => (
                  <div key={m.id} className="flex items-center gap-1.5 text-sky-900 dark:text-sky-200 truncate">
                    {m.isBot ? <Bot className="w-3.5 h-3.5 shrink-0" /> : <User className="w-3.5 h-3.5 shrink-0" />}
                    <span className="truncate">{m.name}</span>
                  </div>
                ))}
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 space-y-1">
                {redTeam.map((m) => (
                  <div key={m.id} className="flex items-center gap-1.5 text-rose-900 dark:text-rose-200 truncate">
                    {m.isBot ? <Bot className="w-3.5 h-3.5 shrink-0" /> : <User className="w-3.5 h-3.5 shrink-0" />}
                    <span className="truncate">{m.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Rope & Red Ribbon Track */}
            <div className="relative h-24 rounded-2xl bg-gradient-to-b from-sky-100 to-emerald-200 dark:from-slate-800 dark:to-emerald-950 border-2 border-emerald-400 overflow-hidden flex items-center px-6">
              {/* Center Winning Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/80 -translate-x-1/2" />
              {/* Rope */}
              <div
                style={{ transform: `translateX(${ropePos * 0.85}px)` }}
                className="relative w-full h-3 rounded-full bg-amber-700 border border-amber-900 transition-transform duration-150 flex items-center justify-center"
              >
                {/* Red Center Flag */}
                <div className="w-4 h-7 bg-red-600 border-2 border-white rounded-sm shadow-md" />
              </div>
            </div>

            {gameState === 'PLAYING' ? (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handlePull}
                  className="w-full min-h-[54px] py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:brightness-110 active:scale-95 text-white font-black text-base shadow-lg cursor-pointer flex items-center justify-center gap-2 transition-transform"
                >
                  <Flame className="w-5 h-5 text-amber-300" />
                  KÉO MẠNH! (Đã bấm {tapCount} nhịp)
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Trophy className="w-7 h-7 text-amber-500 shrink-0" />
                  <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                    {ropePos < 0
                      ? `Đội Xanh chiến thắng rực rỡ! (+2 Sao · ${tapCount} nhịp kéo)`
                      : ropePos === 0
                      ? 'Hai đội bất phân thắng bại! (+1 Sao)'
                      : `Đội Đỏ nhỉnh hơn chút xíu! (+1 Sao cổ vũ · ${tapCount} nhịp)`}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={startMatch}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <RotateCcw className="w-4 h-4" /> Đấu lại
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
