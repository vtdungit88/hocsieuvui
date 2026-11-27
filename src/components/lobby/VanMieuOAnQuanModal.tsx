import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../utils/audio';
import { ArrowLeft, ArrowRight, Bot, RotateCcw, Sparkles, Trophy, Users, X } from 'lucide-react';

type GameState = 'TITLE_MENU' | 'PLAYING' | 'GAME_OVER';
type GameMode = 'bot' | 'pvp_local';
type TurnOwner = 'p1' | 'p2';

interface VanMieuOAnQuanModalProps {
  playerName: string;
  onWin: (starsEarned: number) => void;
  onClose: () => void;
}

const INITIAL_BOARD = (): number[] => [
  10, // 0: Left Quan
  5, 5, 5, 5, 5, // 1..5: Top row (P2 / Bot, L -> R)
  10, // 6: Right Quan
  5, 5, 5, 5, 5 // 7..11: Bottom row (P1, R -> L)
];

const P1_PITS = [11, 10, 9, 8, 7]; // displayed Left -> Right for Player 1
const P2_PITS = [1, 2, 3, 4, 5]; // displayed Left -> Right for Player 2 / Bot

export const VanMieuOAnQuanModal: React.FC<VanMieuOAnQuanModalProps> = ({
  playerName,
  onWin,
  onClose
}) => {
  const [gameState, setGameState] = useState<GameState>('TITLE_MENU');
  const [mode, setMode] = useState<GameMode>('bot');
  const [board, setBoard] = useState<number[]>(INITIAL_BOARD);
  const [scores, setScores] = useState<{ p1: number; p2: number }>({ p1: 0, p2: 0 });
  const [turn, setTurn] = useState<TurnOwner>('p1');
  const [selectedPit, setSelectedPit] = useState<number | null>(null);
  const [activeCursor, setActiveCursor] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [statusLog, setStatusLog] = useState('Chọn 1 ô dân của bạn và chọn hướng rải sỏi!');
  const [handStones, setHandStones] = useState(0);
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

  const startNewGame = (nextMode: GameMode) => {
    soundManager.play('click');
    setMode(nextMode);
    setBoard(INITIAL_BOARD());
    setScores({ p1: 0, p2: 0 });
    setTurn('p1');
    setSelectedPit(null);
    setActiveCursor(null);
    setIsAnimating(false);
    setHandStones(0);
    setStatusLog('Lượt của bạn! Chạm một ô có sỏi bên hàng dưới.');
    setGameState('PLAYING');
  };

  const checkGameFinished = (b: number[], sc: { p1: number; p2: number }) => {
    if (b[0] === 0 && b[6] === 0) {
      const p2Left = P2_PITS.reduce((sum, i) => sum + b[i], 0);
      const p1Left = P1_PITS.reduce((sum, i) => sum + b[i], 0);
      const finalScores = {
        p1: sc.p1 + p1Left,
        p2: sc.p2 + p2Left
      };
      setBoard(Array(12).fill(0));
      setScores(finalScores);
      setGameState('GAME_OVER');
      if (finalScores.p1 > finalScores.p2) {
        soundManager.play('fanfare');
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
        onWin(2);
      } else if (finalScores.p1 === finalScores.p2) {
        soundManager.play('coin');
        onWin(1);
      }
      return true;
    }
    return false;
  };

  const executeMove = async (startPit: number, step: 1 | -1, actor: TurnOwner) => {
    if (isAnimating || gameState !== 'PLAYING') return;
    if (board[startPit] <= 0) return;

    setIsAnimating(true);
    setSelectedPit(null);

    const b = [...board];
    const sc = { ...scores };
    let idx = startPit;
    let hand = b[idx];
    b[idx] = 0;
    setBoard([...b]);
    setHandStones(hand);
    setActiveCursor(idx);
    setStatusLog(`${actor === 'p1' ? playerName : mode === 'bot' ? '[BOT] Bé Tí' : 'Bạn 2'} bốc ${hand} viên sỏi...`);
    soundManager.play('click');
    await sleep(220);

    // Sow and continue scooping when landing on non-empty Dân pit
    while (true) {
      if (cancelledRef.current) return;
      while (hand > 0) {
        if (cancelledRef.current) return;
        idx = (idx + step + 12) % 12;
        b[idx] += 1;
        hand -= 1;
        setBoard([...b]);
        setHandStones(hand);
        setActiveCursor(idx);
        soundManager.play('click');
        await sleep(165);
      }

      const nextIdx = (idx + step + 12) % 12;
      // Stop if next pit is a Quan pit
      if (nextIdx === 0 || nextIdx === 6) {
        setStatusLog('Gặp ô Quan nên dừng lượt rải.');
        break;
      }

      // Next pit has stones -> scoop & continue!
      if (b[nextIdx] > 0) {
        hand = b[nextIdx];
        b[nextIdx] = 0;
        idx = nextIdx;
        setBoard([...b]);
        setHandStones(hand);
        setActiveCursor(idx);
        setStatusLog(`Bốc tiếp ${hand} viên ở ô kế bên!`);
        await sleep(220);
        continue;
      }

      // Next pit is empty -> check capture! (Double empty = stop)
      let gained = 0;
      let probe = nextIdx;
      while (b[probe] === 0 && probe !== 0 && probe !== 6) {
        const lootIdx = (probe + step + 12) % 12;
        if (b[lootIdx] > 0) {
          gained += b[lootIdx];
          b[lootIdx] = 0;
          sc[actor] += gained;
          setBoard([...b]);
          setScores({ ...sc });
          setActiveCursor(lootIdx);
          soundManager.play('coin');
          setStatusLog(`Ăn được +${gained} điểm!`);
          await sleep(320);
          const afterLoot = (lootIdx + step + 12) % 12;
          if (afterLoot === 0 || afterLoot === 6 || b[afterLoot] > 0) {
            break;
          }
          probe = afterLoot;
          gained = 0;
        } else {
          break;
        }
      }
      break;
    }

    setActiveCursor(null);
    setHandStones(0);

    if (checkGameFinished(b, sc)) {
      setIsAnimating(false);
      return;
    }

    // Switch turn & auto-borrow 5 stones if next player's row is empty
    const nextActor: TurnOwner = actor === 'p1' ? 'p2' : 'p1';
    const nextPits = nextActor === 'p1' ? P1_PITS : P2_PITS;
    const sumNext = nextPits.reduce((s, p) => s + b[p], 0);
    if (sumNext === 0) {
      for (const p of nextPits) b[p] = 1;
      sc[nextActor] = Math.max(0, sc[nextActor] - 5);
      setBoard([...b]);
      setScores({ ...sc });
      setStatusLog(
        `${nextActor === 'p1' ? 'Bạn' : mode === 'bot' ? '[BOT] Bé Tí' : 'Bạn 2'} hết sỏi — rải 5 sỏi tiếp sức!`
      );
    } else {
      setStatusLog(
        nextActor === 'p1'
          ? 'Đến lượt bạn! Chạm một ô hàng dưới.'
          : mode === 'bot'
          ? '[BOT] Bé Tí đang tính nước đi...'
          : 'Đến lượt Bạn 2! Chạm một ô hàng trên.'
      );
    }

    setTurn(nextActor);
    setIsAnimating(false);
  };

  // Bot turn calculation
  useEffect(() => {
    if (gameState !== 'PLAYING' || mode !== 'bot' || turn !== 'p2' || isAnimating) return;
    const timer = window.setTimeout(() => {
      const validPits = P2_PITS.filter((p) => board[p] > 0);
      if (validPits.length === 0) return;
      const bestPit = validPits[Math.floor(Math.random() * validPits.length)];
      const step: 1 | -1 = Math.random() > 0.45 ? 1 : -1;
      void executeMove(bestPit, step, 'p2');
    }, 650);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, mode, turn, isAnimating]);

  const opponentLabel = mode === 'bot' ? '[BOT] Bé Tí' : 'Bạn 2';

  const renderPitCell = (pitIndex: number, isPlayerRow: boolean) => {
    const count = board[pitIndex];
    const canPick =
      gameState === 'PLAYING' &&
      !isAnimating &&
      count > 0 &&
      ((turn === 'p1' && isPlayerRow) || (turn === 'p2' && mode === 'pvp_local' && !isPlayerRow));
    const isSelected = selectedPit === pitIndex;
    const isCursor = activeCursor === pitIndex;

    return (
      <div key={pitIndex} className="relative flex flex-col items-center">
        <button
          type="button"
          disabled={!canPick}
          onClick={() => {
            soundManager.play('click');
            setSelectedPit(isSelected ? null : pitIndex);
          }}
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
            isCursor
              ? 'border-amber-400 bg-amber-100 dark:bg-amber-900/60 scale-105 shadow-md'
              : isSelected
              ? 'border-blue-500 bg-sky-100 dark:bg-sky-900/60 ring-2 ring-blue-300'
              : canPick
              ? 'border-amber-300 bg-amber-50/95 dark:bg-slate-800 hover:border-orange-500 cursor-pointer active:scale-95'
              : 'border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/50 opacity-80'
          }`}
        >
          <span className="text-lg font-black text-slate-900 dark:text-white tabular-nums">
            {count}
          </span>
          <div className="flex flex-wrap justify-center gap-0.5 max-w-[38px] mt-0.5">
            {Array.from({ length: Math.min(count, 6) }).map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            ))}
          </div>
        </button>

        {/* Direction picker popover when pit is selected */}
        {isSelected && (
          <div className="mt-1.5 flex items-center gap-1 z-20">
            <button
              type="button"
              onClick={() => void executeMove(pitIndex, isPlayerRow ? 1 : -1, turn)}
              className="px-2 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black flex items-center gap-0.5 shadow cursor-pointer whitespace-nowrap"
              title="Rải sang trái"
            >
              <ArrowLeft className="w-3 h-3" /> Trái
            </button>
            <button
              type="button"
              onClick={() => void executeMove(pitIndex, isPlayerRow ? -1 : 1, turn)}
              className="px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-black flex items-center gap-0.5 shadow cursor-pointer whitespace-nowrap"
              title="Rải sang phải"
            >
              Phải <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      data-interactive="true"
      onClick={onClose}
      className="fixed inset-0 z-[90] bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border-2 border-amber-400 dark:border-slate-700 p-4 sm:p-6 shadow-2xl space-y-4 max-h-[92dvh] overflow-y-auto"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Ô Ăn Quan — Sân Chơi Dân Gian
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Rải sỏi theo vòng, gặp ô trống + ô có sỏi kế bên là ăn điểm! Thắng nhận +2 Sao.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            aria-label="Đóng trò chơi Ô Ăn Quan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {gameState === 'TITLE_MENU' && (
          <div className="space-y-4 py-2">
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-100 space-y-1.5">
              <div className="font-black text-sm">Luật chơi nhanh:</div>
              <p>1. Chọn 1 ô dân bên hàng dưới (hàng của bạn), rồi bấm <b>Trái</b> hoặc <b>Phải</b> để rải từng viên sỏi.</p>
              <p>2. Viên cuối rơi sát ô có sỏi thì bốc rải tiếp; rơi sát <b>1 ô trống + 1 ô có sỏi</b> thì ăn toàn bộ số sỏi đó!</p>
              <p>3. Hết 2 ô Quan hai bên là kết thúc — ai nhiều sỏi hơn thắng!</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => startNewGame('bot')}
                className="p-4 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 hover:brightness-105 text-slate-950 font-black text-left shadow-md cursor-pointer flex items-center justify-between"
              >
                <div>
                  <div className="text-sm flex items-center gap-1.5">
                    <Bot className="w-4 h-4" /> Đấu với [BOT] Bé Tí
                  </div>
                  <div className="text-[11px] font-bold opacity-85 mt-0.5">
                    Chơi ngay một mình cực nhanh
                  </div>
                </div>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => startNewGame('pvp_local')}
                className="p-4 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 hover:brightness-105 text-white font-black text-left shadow-md cursor-pointer flex items-center justify-between"
              >
                <div>
                  <div className="text-sm flex items-center gap-1.5">
                    <Users className="w-4 h-4" /> Chơi 2 bạn (cùng máy)
                  </div>
                  <div className="text-[11px] font-semibold opacity-90 mt-0.5">
                    Thách đấu bạn ngồi cạnh
                  </div>
                </div>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {gameState !== 'TITLE_MENU' && (
          <>
            {/* Scoreboard */}
            <div className="grid grid-cols-3 items-center gap-2 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-xs font-bold">
              <div className={`p-2 rounded-xl text-center ${turn === 'p1' ? 'bg-emerald-600 text-white shadow' : 'text-slate-700 dark:text-slate-200'}`}>
                <div className="truncate">{playerName} (Bạn)</div>
                <div className="text-lg font-black tabular-nums">{scores.p1}</div>
              </div>
              <div className="text-center space-y-0.5">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Trên tay: <b className="text-amber-600 dark:text-amber-400 tabular-nums">{handStones}</b>
                </div>
                <div className="text-[11px] font-black text-slate-800 dark:text-slate-100">
                  {turn === 'p1' ? 'Lượt của Bạn' : `Lượt ${opponentLabel}`}
                </div>
              </div>
              <div className={`p-2 rounded-xl text-center ${turn === 'p2' ? 'bg-rose-600 text-white shadow' : 'text-slate-700 dark:text-slate-200'}`}>
                <div className="truncate">{opponentLabel}</div>
                <div className="text-lg font-black tabular-nums">{scores.p2}</div>
              </div>
            </div>

            {/* Status banner */}
            <div className="px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs font-bold text-amber-900 dark:text-amber-200 text-center">
              {statusLog}
            </div>

            {/* Traditional Board */}
            <div className="p-3 sm:p-4 rounded-3xl bg-amber-100/80 dark:bg-slate-800 border-2 border-amber-400 dark:border-slate-700 overflow-x-auto">
              <div className="min-w-[430px] flex items-center justify-between gap-2">
                {/* Left Quan (0) */}
                <div
                  className={`w-16 h-32 sm:w-20 sm:h-36 rounded-l-full rounded-r-xl border-2 flex flex-col items-center justify-center shrink-0 transition-all ${
                    activeCursor === 0
                      ? 'border-amber-500 bg-amber-200 scale-105'
                      : 'border-amber-500/70 bg-amber-50 dark:bg-slate-900'
                  }`}
                >
                  <span className="text-[10px] font-black text-amber-800 dark:text-amber-300">Quan</span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                    {board[0]}
                  </span>
                </div>

                {/* Center 2 rows */}
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-5 gap-2 justify-items-center">
                    {P2_PITS.map((pit) => renderPitCell(pit, false))}
                  </div>
                  <div className="grid grid-cols-5 gap-2 justify-items-center">
                    {P1_PITS.map((pit) => renderPitCell(pit, true))}
                  </div>
                </div>

                {/* Right Quan (6) */}
                <div
                  className={`w-16 h-32 sm:w-20 sm:h-36 rounded-r-full rounded-l-xl border-2 flex flex-col items-center justify-center shrink-0 transition-all ${
                    activeCursor === 6
                      ? 'border-amber-500 bg-amber-200 scale-105'
                      : 'border-amber-500/70 bg-amber-50 dark:bg-slate-900'
                  }`}
                >
                  <span className="text-[10px] font-black text-amber-800 dark:text-amber-300">Quan</span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                    {board[6]}
                  </span>
                </div>
              </div>
            </div>

            {gameState === 'GAME_OVER' ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Trophy className="w-7 h-7 text-amber-500 shrink-0" />
                  <div>
                    <div className="text-sm font-black text-slate-900 dark:text-white">
                      {scores.p1 > scores.p2
                        ? `Hoan hô! ${playerName} thắng ${scores.p1} - ${scores.p2}! (+2 Sao)`
                        : scores.p1 === scores.p2
                        ? `Hòa cực gay cấn ${scores.p1} - ${scores.p2}! (+1 Sao)`
                        : `${opponentLabel} thắng ${scores.p2} - ${scores.p1}! Thử lại nào!`}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => startNewGame(mode)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <RotateCcw className="w-4 h-4" /> Chơi lại
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setGameState('TITLE_MENU')}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Đổi chế độ chơi
                </button>
                <button
                  type="button"
                  onClick={() => startNewGame(mode)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Xếp sỏi lại
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
