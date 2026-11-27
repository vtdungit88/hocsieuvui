import React, { useEffect, useMemo, useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Compass,
  Lock,
  RotateCcw,
  Sparkles,
  Star,
  Swords,
  Timer,
  Trophy,
  Unlock,
  X
} from 'lucide-react';
import type { GradeLevel } from '../../types';
import {
  ADVENTURE_REALMS,
  type AdventureRealm,
  type AdventureWorldSave,
  type RealmLandmark,
  type RealmPortalStatus,
  getLandmarkGateInfo,
  getRealmExplorationPoints,
  isRealmChestReady
} from '../../data/adventureWorld';
import { buildArenaQuestionDeck, type ArenaQuestion } from '../../utils/arenaQuestionGenerator';
import { MathText } from '../MathText';
import { LandmarkArt, SecretItemArt } from './IsometricWorldStage';
import { soundManager } from '../../utils/audio';

const PUZZLE_SYMBOLS_BY_REALM: Record<AdventureRealm['id'], string[]> = {
  van_hien: ['🏮', '📜', '🪷', '🐢'],
  forest: ['🌿', '💎', '🦋', '🍄'],
  sky_island: ['🌈', '⭐', '🪁', '☁️'],
  ocean_kingdom: ['🐚', '🐠', '🫧', '👑'],
  dino_valley: ['🦕', '🥚', '🦴', '🌋'],
  candy_land: ['🍭', '🧁', '🍩', '🍓']
};

interface LandmarkModalProps {
  realm: AdventureRealm;
  landmark: RealmLandmark | null;
  save: AdventureWorldSave;
  grade: GradeLevel;
  discovered: boolean;
  discoveredCountInRealm: number;
  onDiscover: (landmark: RealmLandmark) => void;
  onSwitchToStudyMap?: () => void;
  onClose: () => void;
}

export const LandmarkModal: React.FC<LandmarkModalProps> = ({
  realm,
  landmark,
  save,
  grade,
  discovered,
  discoveredCountInRealm,
  onDiscover,
  onSwitchToStudyMap,
  onClose
}) => {
  const gate = landmark ? getLandmarkGateInfo(realm, landmark.id, save) : null;

  // Challenge phases
  const [stage, setStage] = useState<'brief' | 'playing' | 'failed' | 'cleared'>('brief');
  const [seedNonce, setSeedNonce] = useState(1);

  // Quiz & Boss Quiz state
  const totalQ = gate?.kind === 'boss' ? 5 : 3;
  const passNeeded = gate?.kind === 'boss' ? 4 : 2;
  const deck: ArenaQuestion[] = useMemo(() => {
    if (!landmark || !gate || (gate.kind !== 'quiz' && gate.kind !== 'boss')) return [];
    return buildArenaQuestionDeck({
      grade,
      totalQuestions: totalQ,
      matchSeed: seedNonce * 997 + realm.order * 37 + gate.stepNumber
    });
  }, [landmark, gate, grade, totalQ, seedNonce, realm.order]);

  const [qIdx, setQIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [bossTimeLeft, setBossTimeLeft] = useState(45);

  // Memory Puzzle state (Stage 2)
  const [cards, setCards] = useState<Array<{ id: number; sym: string; matched: boolean }>>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const buildPuzzleCards = () => {
    const syms = PUZZLE_SYMBOLS_BY_REALM[realm.id] ?? ['⭐', '💎', '🏮', '🐚'];
    const pairs = [...syms, ...syms].map((sym, idx) => ({ id: idx, sym, matched: false }));
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
    return pairs;
  };

  useEffect(() => {
    if (!landmark) return;
    setStage(discovered ? 'cleared' : 'brief');
    setQIdx(0);
    setCorrectCount(0);
    setSelectedOpt(null);
    setBossTimeLeft(45);
    setFlipped([]);
    setMoves(0);
    setCards(buildPuzzleCards());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [landmark?.id, discovered]);

  // Boss 45s countdown
  useEffect(() => {
    if (!landmark || !gate || gate.kind !== 'boss' || stage !== 'playing') return;
    const t = window.setInterval(() => {
      setBossTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(t);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(t);
  }, [landmark, gate, stage]);

  useEffect(() => {
    if (stage === 'playing' && gate?.kind === 'boss' && bossTimeLeft === 0) {
      soundManager.play('wrong');
      setStage('failed');
    }
  }, [bossTimeLeft, stage, gate?.kind]);

  if (!landmark || !gate) return null;

  const startChallenge = () => {
    soundManager.play('click');
    setSeedNonce((n) => n + 1);
    setQIdx(0);
    setCorrectCount(0);
    setSelectedOpt(null);
    setBossTimeLeft(45);
    setFlipped([]);
    setMoves(0);
    setCards(buildPuzzleCards());
    setStage('playing');
  };

  const handleAnswerOption = (optId: string) => {
    if (selectedOpt || !deck[qIdx]) return;
    const opt = deck[qIdx].options.find((o) => o.id === optId);
    if (!opt) return;
    setSelectedOpt(optId);
    const nextCorrect = opt.right ? correctCount + 1 : correctCount;
    if (opt.right) {
      soundManager.play('correct');
      setCorrectCount(nextCorrect);
    } else {
      soundManager.play('wrong');
    }

    window.setTimeout(() => {
      if (qIdx + 1 >= deck.length) {
        if (nextCorrect >= passNeeded) {
          setStage('cleared');
          if (!discovered) {
            onDiscover(landmark);
          }
        } else {
          soundManager.play('wrong');
          setStage('failed');
        }
      } else {
        setQIdx((i) => i + 1);
        setSelectedOpt(null);
      }
    }, 650);
  };

  const handleCardFlip = (cardIdx: number) => {
    if (flipped.length >= 2 || flipped.includes(cardIdx) || cards[cardIdx]?.matched) return;
    soundManager.play('click');
    const nextFlipped = [...flipped, cardIdx];
    setFlipped(nextFlipped);
    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = nextFlipped;
      if (cards[a].sym === cards[b].sym) {
        soundManager.play('correct');
        const nextCards = cards.map((c, i) => (i === a || i === b ? { ...c, matched: true } : c));
        setCards(nextCards);
        setFlipped([]);
        if (nextCards.every((c) => c.matched)) {
          setStage('cleared');
          if (!discovered) {
            onDiscover(landmark);
          }
        }
      } else {
        window.setTimeout(() => setFlipped([]), 550);
      }
    }
  };

  const activeQ = deck[qIdx];

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center bg-slate-950/65 p-0 sm:p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="landmark-modal-title"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-lg max-h-[90dvh] overflow-y-auto bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 space-y-4"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-sky-600 dark:text-sky-400">
              {realm.code}. {realm.name} · {gate.gateTitle}
            </p>
            <h2 id="landmark-modal-title" className="text-xl font-black text-slate-900 dark:text-white leading-snug">
              {landmark.name}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{landmark.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {stage === 'brief' && (
          <>
            <div className={`rounded-2xl p-4 bg-gradient-to-br ${landmark.iconBg} flex items-center justify-center shadow-inner`}>
              <LandmarkArt artType={landmark.artType} discovered={discovered} className="w-24 h-24 drop-shadow-xl" />
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{landmark.story}</p>

            <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-3.5 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-black text-slate-800 dark:text-slate-100">
                <span>Thử thách mở khóa công trình</span>
                <span className="text-amber-600 dark:text-amber-400 tabular-nums">
                  +{gate.coinsReward} Xu · +{gate.xpReward} XP · +{gate.starsReward} Sao
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">{gate.gateDesc}</p>
            </div>

            {gate.isLocked ? (
              <div className="space-y-2">
                <div className="w-full py-3 px-4 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 text-center">
                  <Lock className="w-4 h-4 shrink-0" /> {gate.lockReason}
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={startChallenge}
                  className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-sm shadow-lg hover:scale-[1.01] transition-transform inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  {gate.kind === 'boss'
                    ? 'Khiêu Chiến Thủ Lĩnh (45s)'
                    : gate.kind === 'puzzle'
                    ? 'Mở Bảng Giải Mã Cổ Vật'
                    : `Làm Nhanh 3 Câu (Lớp ${grade})`}
                </button>
                {onSwitchToStudyMap && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSwitchToStudyMap();
                    }}
                    className="py-3 px-4 rounded-2xl bg-sky-100 dark:bg-slate-800 text-sky-700 dark:text-sky-300 font-bold text-xs sm:text-sm hover:bg-sky-200 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Đảo Kiến Thức
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {stage === 'playing' && (gate.kind === 'quiz' || gate.kind === 'boss') && activeQ && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-black text-slate-600 dark:text-slate-300 tabular-nums">
              <span>
                Câu {qIdx + 1}/{deck.length} · Cần đúng ≥ {passNeeded} câu
              </span>
              <span className="text-emerald-600">Đã đúng: {correctCount}</span>
              {gate.kind === 'boss' && (
                <span className={`inline-flex items-center gap-1 ${bossTimeLeft <= 10 ? 'text-rose-600' : 'text-sky-600'}`}>
                  <Timer className="w-3.5 h-3.5" /> {bossTimeLeft}s
                </span>
              )}
            </div>

            <div className="rounded-2xl bg-sky-50 dark:bg-slate-800 p-4 text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              <MathText text={activeQ.questionText} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activeQ.options.map((opt, idx) => {
                const isSelected = selectedOpt === opt.id;
                let cls =
                  'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-sky-400';
                if (selectedOpt) {
                  if (opt.right) cls = 'bg-emerald-500 border-emerald-600 text-white';
                  else if (isSelected) cls = 'bg-rose-500 border-rose-600 text-white';
                  else cls = 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 opacity-60';
                }
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleAnswerOption(opt.id)}
                    disabled={!!selectedOpt}
                    className={`p-3 rounded-2xl border-2 text-left text-sm font-bold transition-all cursor-pointer ${cls}`}
                  >
                    <span className="font-black mr-1.5">{String.fromCharCode(65 + idx)}.</span>
                    <MathText text={opt.text} />
                  </button>
                );
              })}
            </div>

            {selectedOpt && activeQ.explanation && (
              <div className="text-xs text-slate-600 dark:text-slate-300 bg-amber-50 dark:bg-slate-800 rounded-xl p-2.5">
                💡 <MathText text={activeQ.explanation} />
              </div>
            )}
          </div>
        )}

        {stage === 'playing' && gate.kind === 'puzzle' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums">
              <span>Chạm 2 thẻ giống nhau để giải mã</span>
              <span>Lượt lật: {moves}</span>
            </div>
            <div className="grid grid-cols-4 gap-2.5 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800">
              {cards.map((c, idx) => {
                const open = c.matched || flipped.includes(idx);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleCardFlip(idx)}
                    className={`h-16 sm:h-20 rounded-2xl text-2xl font-black transition-all cursor-pointer flex items-center justify-center border-2 ${
                      c.matched
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-400 scale-95'
                        : open
                        ? 'bg-white dark:bg-slate-900 border-amber-400 shadow'
                        : 'bg-gradient-to-br from-sky-500 to-indigo-600 border-white/40 text-white hover:scale-105'
                    }`}
                  >
                    {open ? c.sym : '?'}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {stage === 'failed' && (
          <div className="rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 p-4 text-center space-y-3">
            <div className="text-base font-black text-rose-700 dark:text-rose-300">
              Chưa đạt yêu cầu ({correctCount}/{totalQ} câu đúng — cần {passNeeded} câu)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Bạn có thể thử lại ngay với bộ câu hỏi mới hoặc luyện thêm tại Đảo Kiến Thức!
            </p>
            <button
              type="button"
              onClick={startChallenge}
              className="px-5 py-2.5 rounded-2xl bg-amber-500 text-white font-black text-sm inline-flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Thử lại bộ câu mới
            </button>
          </div>
        )}

        {stage === 'cleared' && (
          <div className="space-y-3">
            <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 p-4 text-center space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-black text-base">
                <CheckCircle2 className="w-5 h-5" /> Đã chinh phục {landmark.name}!
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 tabular-nums">
                Tiến độ huy hiệu {realm.badgeName}: {discoveredCountInRealm}/3 công trình
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-sm cursor-pointer"
            >
              Tiếp tục thám hiểm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

interface NpcQuestModalProps {
  realm: AdventureRealm;
  open: boolean;
  completed: boolean;
  onComplete: () => void;
  onClose: () => void;
}

const SHELL_COLORS = [
  { id: 0, label: 'Đỏ', bg: 'bg-rose-500', ring: 'ring-rose-300' },
  { id: 1, label: 'Ngọc', bg: 'bg-cyan-500', ring: 'ring-cyan-300' },
  { id: 2, label: 'Vàng', bg: 'bg-amber-400', ring: 'ring-amber-200' },
  { id: 3, label: 'Tím', bg: 'bg-violet-500', ring: 'ring-violet-300' }
];

export const NpcQuestModal: React.FC<NpcQuestModalProps> = ({
  realm,
  open,
  completed,
  onComplete,
  onClose
}) => {
  const { npc } = realm;
  const [phase, setPhase] = useState<'intro' | 'playing' | 'timeout' | 'won'>('intro');
  const [timeLeft, setTimeLeft] = useState(25);

  const [lanterns, setLanterns] = useState<boolean[]>([true, false, false, true, false, false]);
  const [tapScore, setTapScore] = useState(0);
  const [targets, setTargets] = useState<Array<{ id: number; x: number; y: number; hue: string }>>([]);
  const [shellSeq] = useState<number[]>([0, 2, 1, 3]);
  const [shellStep, setShellStep] = useState(0);
  const [activeFlash, setActiveFlash] = useState<number | null>(null);
  const [shellMessage, setShellMessage] = useState('Nhìn kỹ 4 vỏ ốc phát sáng rồi bấm lại theo thứ tự!');
  const [rocks, setRocks] = useState<number[]>([2, 2, 2, 2, 2, 2]);

  const resetMiniGame = () => {
    setTimeLeft(25);
    setLanterns([true, false, false, true, false, false]);
    setTapScore(0);
    setTargets([
      { id: 1, x: 22, y: 28, hue: '#fde047' },
      { id: 2, x: 54, y: 52, hue: '#f472b6' },
      { id: 3, x: 78, y: 30, hue: '#38bdf8' }
    ]);
    setShellStep(0);
    setActiveFlash(null);
    setShellMessage('Nhìn kỹ 4 vỏ ốc phát sáng rồi bấm lại theo thứ tự!');
    setRocks([2, 2, 2, 2, 2, 2]);
  };

  useEffect(() => {
    if (open) {
      resetMiniGame();
      setPhase(completed ? 'won' : 'intro');
    }
  }, [open, realm.id, completed]);

  // 25s real game countdown
  useEffect(() => {
    if (!open || phase !== 'playing') return;
    const t = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(t);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(t);
  }, [open, phase]);

  useEffect(() => {
    if (open && phase === 'playing' && timeLeft === 0) {
      soundManager.play('wrong');
      setPhase('timeout');
    }
  }, [open, phase, timeLeft]);

  // Moving targets timer
  useEffect(() => {
    if (!open || phase !== 'playing') return;
    if (
      npc.miniGameKind !== 'firefly_tap' &&
      npc.miniGameKind !== 'star_catch' &&
      npc.miniGameKind !== 'candy_rain'
    ) {
      return;
    }
    const iv = window.setInterval(() => {
      setTargets((prev) =>
        prev.map((t) => ({
          ...t,
          x: 15 + Math.floor(Math.random() * 70),
          y: 18 + Math.floor(Math.random() * 64)
        }))
      );
    }, 1100);
    return () => window.clearInterval(iv);
  }, [open, phase, npc.miniGameKind]);

  const playShellPreview = () => {
    setShellStep(0);
    setShellMessage('Đang phát giai điệu vỏ ốc…');
    shellSeq.forEach((shellIdx, stepIdx) => {
      window.setTimeout(() => {
        setActiveFlash(shellIdx);
        soundManager.play('coin');
        window.setTimeout(() => {
          setActiveFlash(null);
          if (stepIdx === shellSeq.length - 1) {
            setShellMessage('Đến lượt bạn bấm 4 vỏ ốc theo đúng thứ tự!');
          }
        }, 320);
      }, stepIdx * 520 + 200);
    });
  };

  useEffect(() => {
    if (open && phase === 'playing' && npc.miniGameKind === 'shell_rhythm') {
      playShellPreview();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, phase, npc.miniGameKind]);

  if (!open) return null;

  const finishQuest = () => {
    soundManager.play('fanfare');
    setPhase('won');
    onComplete();
  };

  const handleLanternTap = (idx: number) => {
    if (lanterns[idx]) return;
    soundManager.play('coin');
    const next = [...lanterns];
    next[idx] = true;
    setLanterns(next);
    if (next.every(Boolean)) finishQuest();
  };

  const handleTapTarget = (targetId: number) => {
    soundManager.play('coin');
    const nextScore = tapScore + 1;
    setTapScore(nextScore);
    setTargets((prev) =>
      prev.map((t) =>
        t.id === targetId
          ? {
              ...t,
              x: 14 + Math.floor(Math.random() * 72),
              y: 16 + Math.floor(Math.random() * 66)
            }
          : t
      )
    );
    if (nextScore >= 6) finishQuest();
  };

  const handleShellTap = (shellIdx: number) => {
    if (activeFlash !== null) return;
    if (shellSeq[shellStep] === shellIdx) {
      soundManager.play('coin');
      const next = shellStep + 1;
      setShellStep(next);
      if (next >= shellSeq.length) {
        setShellMessage('Tuyệt vời! Bạn đã đánh thức khúc nhạc đại dương!');
        finishQuest();
      } else {
        setShellMessage(`Đúng rồi (${next}/4)! Tiếp tục nhé!`);
      }
    } else {
      soundManager.play('wrong');
      setShellStep(0);
      setShellMessage('Chưa đúng thứ tự — thử lại từ vỏ ốc đầu tiên nhé!');
    }
  };

  const handleRockTap = (idx: number) => {
    if (rocks[idx] <= 0) return;
    soundManager.play('drum');
    const next = [...rocks];
    next[idx] = Math.max(0, next[idx] - 1);
    setRocks(next);
    if (next.every((r) => r === 0)) finishQuest();
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center bg-slate-950/65 p-0 sm:p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="npc-quest-title"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-lg max-h-[90dvh] overflow-y-auto bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 space-y-4"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 64 76" className="w-10 h-11" aria-hidden="true">
                <path d="M18 68 Q20 42 32 42 Q44 42 46 68 Z" fill={npc.robeColor} />
                <circle cx="32" cy="30" r="14" fill="#fde6d2" />
                <path d="M16 24 Q32 10 48 24 Z" fill={npc.hatColor} />
                <circle cx="27" cy="30" r="2" fill="#0f172a" />
                <circle cx="37" cy="30" r="2" fill="#0f172a" />
              </svg>
            </div>
            <div>
              <h2 id="npc-quest-title" className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                {npc.name}
              </h2>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {npc.role} · {realm.shortName}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="rounded-2xl bg-sky-50 dark:bg-slate-800 p-3.5 text-sm text-slate-700 dark:text-slate-200">
          “{npc.greeting}”
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="font-black text-slate-900 dark:text-white">{npc.questTitle}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{npc.questDesc}</p>
            </div>
            {phase === 'playing' && (
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs font-black tabular-nums inline-flex items-center gap-1 ${timeLeft <= 6 ? 'text-rose-600' : 'text-sky-600'}`}>
                  <Timer className="w-3.5 h-3.5" /> {timeLeft}s
                </span>
                <button
                  type="button"
                  onClick={resetMiniGame}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Chơi lại
                </button>
              </div>
            )}
          </div>

          {phase === 'intro' && (
            <button
              type="button"
              onClick={() => {
                soundManager.play('click');
                resetMiniGame();
                setPhase('playing');
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black shadow-lg hover:scale-[1.02] transition-transform cursor-pointer"
            >
              Bắt đầu thử thách 25s (+25 Xu · +20 XP · +2 Tiến độ)
            </button>
          )}

          {phase === 'timeout' && (
            <div className="rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 p-4 text-center space-y-2">
              <p className="font-black text-rose-700 dark:text-rose-300 text-sm">Hết 25 giây rồi!</p>
              <button
                type="button"
                onClick={() => {
                  resetMiniGame();
                  setPhase('playing');
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 text-white font-black text-xs cursor-pointer"
              >
                Thử lại ngay
              </button>
            </div>
          )}

          {phase === 'playing' && npc.miniGameKind === 'lantern_match' && (
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900">
              {lanterns.map((lit, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleLanternTap(idx)}
                  className={`py-4 rounded-2xl font-black text-sm transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    lit
                      ? 'bg-amber-400 text-slate-900 shadow-[0_0_20px_rgba(251,191,36,0.85)]'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  <span className="text-2xl">{lit ? '🏮' : '🌑'}</span>
                  <span>{lit ? 'Đã sáng' : 'Chạm thắp'}</span>
                </button>
              ))}
            </div>
          )}

          {phase === 'playing' &&
            (npc.miniGameKind === 'firefly_tap' ||
              npc.miniGameKind === 'star_catch' ||
              npc.miniGameKind === 'candy_rain') && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                  <span>Tiến độ thu thập</span>
                  <span className="tabular-nums text-amber-600">{tapScore}/6</span>
                </div>
                <div
                  className={`relative h-52 rounded-2xl overflow-hidden ${
                    npc.miniGameKind === 'candy_rain'
                      ? 'bg-gradient-to-b from-pink-200 to-rose-100'
                      : 'bg-gradient-to-b from-indigo-950 to-slate-900'
                  }`}
                >
                  {targets.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleTapTarget(t.id)}
                      style={{ left: `${t.x}%`, top: `${t.y}%` }}
                      aria-label="Chạm bắt mục tiêu"
                      className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg bg-white/20 backdrop-blur-xs hover:scale-125 active:scale-90 transition-all duration-300 cursor-pointer"
                    >
                      {npc.miniGameKind === 'firefly_tap'
                        ? '✨'
                        : npc.miniGameKind === 'star_catch'
                        ? '⭐'
                        : '🍬'}
                    </button>
                  ))}
                </div>
              </div>
            )}

          {phase === 'playing' && npc.miniGameKind === 'shell_rhythm' && (
            <div className="space-y-3 p-4 rounded-2xl bg-cyan-950 text-white">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-bold text-cyan-200">{shellMessage}</span>
                <button
                  type="button"
                  onClick={playShellPreview}
                  className="px-2.5 py-1 rounded-lg bg-cyan-800 hover:bg-cyan-700 font-bold whitespace-nowrap cursor-pointer"
                >
                  Xem lại mẫu
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2.5">
                {SHELL_COLORS.map((sh) => {
                  const lit = activeFlash === sh.id;
                  return (
                    <button
                      key={sh.id}
                      type="button"
                      onClick={() => handleShellTap(sh.id)}
                      className={`py-4 rounded-2xl font-black text-xs text-white transition-transform cursor-pointer ${sh.bg} ${
                        lit ? `scale-110 ring-4 ${sh.ring}` : 'hover:scale-105 active:scale-95'
                      }`}
                    >
                      <div className="text-xl mb-1">🐚</div>
                      {sh.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {phase === 'playing' && npc.miniGameKind === 'fossil_dig' && (
            <div className="grid grid-cols-3 gap-2.5 p-4 rounded-2xl bg-amber-950/90">
              {rocks.map((hp, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleRockTap(idx)}
                  className={`py-4 rounded-2xl font-black text-xs transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    hp === 0
                      ? 'bg-amber-300 text-slate-900'
                      : hp === 1
                      ? 'bg-amber-700 text-amber-100 hover:bg-amber-600'
                      : 'bg-stone-700 text-stone-100 hover:bg-stone-600'
                  }`}
                >
                  <span className="text-2xl">{hp === 0 ? '🦴' : hp === 1 ? '⛏️' : '🪨'}</span>
                  <span>{hp === 0 ? 'Đã thấy!' : `Gõ (${hp})`}</span>
                </button>
              ))}
            </div>
          )}

          {phase === 'won' && (
            <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 p-4 text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 font-black text-emerald-700 dark:text-emerald-300 text-base">
                <CheckCircle2 className="w-5 h-5" /> Hoàn thành nhiệm vụ {npc.name}!
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Bạn đã nhận +25 Xu, +20 XP & +2 Tiến độ tại {realm.name}.
              </p>
              <button
                type="button"
                onClick={() => {
                  resetMiniGame();
                  setPhase('playing');
                }}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-xs hover:scale-105 transition-transform cursor-pointer"
              >
                Chơi lại cho vui
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface PortalGateModalProps {
  targetRealm: AdventureRealm | null;
  status: RealmPortalStatus | null;
  onUnlockAndEnter: (realmId: AdventureRealm['id']) => void;
  onNavigateToStudy?: () => void;
  onSwitchToStudyMap?: () => void;
  onNavigateToArena?: () => void;
  onClose: () => void;
}

export const PortalGateModal: React.FC<PortalGateModalProps> = ({
  targetRealm,
  status,
  onUnlockAndEnter,
  onNavigateToStudy,
  onSwitchToStudyMap,
  onNavigateToArena,
  onClose
}) => {
  if (!targetRealm || !status) return null;
  return (
    <div
      className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center bg-slate-950/70 p-0 sm:p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="portal-gate-title"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-lg max-h-[90dvh] overflow-y-auto bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 space-y-4"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-sky-600 dark:text-sky-400">
              Cổng Dịch Chuyển Liên Vùng
            </p>
            <h2 id="portal-gate-title" className="text-xl font-black text-slate-900 dark:text-white">
              {targetRealm.code}. {targetRealm.name}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{targetRealm.tagline}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Two-Key Gate checklist */}
        <div className="space-y-2.5">
          <div
            className={`rounded-2xl border p-3.5 flex items-start gap-3 ${
              status.prevRealmCleared
                ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
            }`}
          >
            {status.prevRealmCleared ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <Lock className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="text-sm font-black text-slate-900 dark:text-white">
                Chìa khóa 1 · Chinh phục {status.prevRealmName}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {status.prevRealmCleared
                  ? 'Đã hoàn thành 3 công trình hoặc mở Rương vùng trước.'
                  : `Cần chinh phục đủ 3 công trình hoặc mở Rương kho báu tại ${status.prevRealmName}.`}
              </p>
            </div>
          </div>

          <div
            className={`rounded-2xl border p-3.5 flex items-start gap-3 ${
              status.systemReady
                ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                : 'bg-amber-50/80 dark:bg-slate-800 border-amber-300 dark:border-amber-800'
            }`}
          >
            {status.systemReady ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <Lock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <div className="text-sm font-black text-slate-900 dark:text-white">
                Chìa khóa 2 · Năng Lượng Tri Thức Toàn Hệ Thống
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Yêu cầu: <span className="font-bold">{status.requirement.altSummary}</span>
              </p>
              <div className="mt-2 grid grid-cols-2 gap-1.5 text-[11px] font-bold text-slate-700 dark:text-slate-200 tabular-nums">
                <span>Sao hiện có: {status.currentSystemStars}/{status.requiredSystemStars}</span>
                <span>Bài học xong: {status.lessonsCleared}/{status.requirement.minLessonsCleared}</span>
                <span>Cấp độ: Lv.{status.studentLevel}/{status.requirement.minLevel}</span>
                <span>Đấu trường: {status.blitzBest}/{status.requirement.minBlitzScore}đ</span>
              </div>
            </div>
          </div>
        </div>

        {status.canUnlockNow ? (
          <button
            type="button"
            onClick={() => onUnlockAndEnter(targetRealm.id)}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-black text-sm shadow-lg hover:scale-[1.01] transition-transform inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <Unlock className="w-5 h-5" /> Mở Cổng Bước Vào {targetRealm.name}!
          </button>
        ) : (
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
              Chọn cách kiếm thêm Sao & XP trên hệ thống để mở cổng:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {onSwitchToStudyMap && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSwitchToStudyMap();
                  }}
                  className="py-2.5 px-3 rounded-xl bg-sky-600 text-white font-black text-xs inline-flex items-center justify-center gap-1.5 hover:bg-sky-500 cursor-pointer"
                >
                  <Compass className="w-4 h-4" /> Đảo Kiến Thức
                </button>
              )}
              {onNavigateToStudy && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToStudy();
                  }}
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-black text-xs inline-flex items-center justify-center gap-1.5 hover:bg-emerald-500 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" /> Làm Bài Học
                </button>
              )}
              {onNavigateToArena && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToArena();
                  }}
                  className="py-2.5 px-3 rounded-xl bg-amber-500 text-white font-black text-xs inline-flex items-center justify-center gap-1.5 hover:bg-amber-400 cursor-pointer"
                >
                  <Swords className="w-4 h-4" /> Đấu Trường
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface ChestRewardModalProps {
  realm: AdventureRealm | null;
  open: boolean;
  onClose: () => void;
}

export const ChestRewardModal: React.FC<ChestRewardModalProps> = ({ realm, open, onClose }) => {
  if (!open || !realm) return null;
  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm max-h-[90dvh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 text-center space-y-4 studio-chest-reveal"
      >
        <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-300 to-orange-500 flex items-center justify-center text-white shadow-lg">
          <Trophy className="w-10 h-10" />
        </div>
        <div>
          <p className="text-xs font-bold text-amber-600">Mở Rương Kho Báu Thành Công!</p>
          <h3 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">{realm.chest.name}</h3>
        </div>
        <div className="rounded-2xl bg-amber-50 dark:bg-slate-800 p-3.5 space-y-1">
          <p className="text-sm font-black text-amber-700 dark:text-amber-300">{realm.chest.rewardTitle}</p>
          <p className="text-xs font-bold text-slate-600 dark:text-slate-300 tabular-nums">
            +{realm.chest.starsBonus} Sao Thám Hiểm · +50 Xu · +40 XP
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black cursor-pointer"
        >
          Tuyệt vời!
        </button>
      </div>
    </div>
  );
};

interface CollectionAlbumModalProps {
  open: boolean;
  save: AdventureWorldSave;
  onSelectRealm: (realmId: AdventureRealm['id']) => void;
  onClose: () => void;
}

export const CollectionAlbumModal: React.FC<CollectionAlbumModalProps> = ({
  open,
  save,
  onSelectRealm,
  onClose
}) => {
  if (!open) return null;

  const totalBadges = ADVENTURE_REALMS.filter((r) =>
    r.landmarks.every((l) => save.discoveredLandmarks.includes(l.id))
  ).length;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center bg-slate-950/65 p-0 sm:p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="collection-album-title"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-2xl max-h-[90dvh] overflow-y-auto bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 space-y-4"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="collection-album-title" className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-500" /> Bộ Sưu Tập 6 Vùng Đất
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Vượt 3 trạm thử thách, dò tìm vật phẩm bí mật & mở rương báu theo từng vùng đất.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng"
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
          <div className="rounded-2xl bg-sky-50 dark:bg-slate-800 p-3">
            <div className="text-lg font-black text-sky-600 tabular-nums">{save.unlockedRealms.length}/6</div>
            <div className="text-xs font-bold text-slate-600 dark:text-slate-300">Vùng đã mở</div>
          </div>
          <div className="rounded-2xl bg-amber-50 dark:bg-slate-800 p-3">
            <div className="text-lg font-black text-amber-600 tabular-nums">{totalBadges}/6</div>
            <div className="text-xs font-bold text-slate-600 dark:text-slate-300">Huy hiệu vùng</div>
          </div>
          <div className="rounded-2xl bg-emerald-50 dark:bg-slate-800 p-3">
            <div className="text-lg font-black text-emerald-600 tabular-nums">{save.collectedSecrets.length}/18</div>
            <div className="text-xs font-bold text-slate-600 dark:text-slate-300">Vật phẩm ẩn</div>
          </div>
          <div className="rounded-2xl bg-purple-50 dark:bg-slate-800 p-3">
            <div className="text-lg font-black text-purple-600 tabular-nums">{save.openedChests.length}/6</div>
            <div className="text-xs font-bold text-slate-600 dark:text-slate-300">Rương báu</div>
          </div>
        </div>

        <div className="space-y-3">
          {ADVENTURE_REALMS.map((r) => {
            const unlocked = save.unlockedRealms.includes(r.id);
            const lmDone = r.landmarks.filter((l) => save.discoveredLandmarks.includes(l.id)).length;
            const badgeEarned = lmDone === r.landmarks.length;
            const chestOpened = save.openedChests.includes(r.chest.id);
            const pts = getRealmExplorationPoints(r, save);
            const chestReady = isRealmChestReady(r, save);

            return (
              <div
                key={r.id}
                className={`rounded-2xl border p-4 space-y-3 ${
                  unlocked
                    ? 'border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60'
                    : 'border-slate-200/70 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900 opacity-75'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{r.code}. {r.name}</span>
                      {!unlocked && <Lock className="w-3.5 h-3.5 text-slate-400" />}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                      Huy hiệu: {r.badgeName} ({lmDone}/3) · Tiến độ {pts}/8 điểm
                    </div>
                  </div>
                  {unlocked && (
                    <button
                      type="button"
                      onClick={() => {
                        onSelectRealm(r.id);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-500 cursor-pointer whitespace-nowrap"
                    >
                      Tới vùng này
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {r.secrets.map((sec) => {
                    const found = save.collectedSecrets.includes(sec.id);
                    return (
                      <div
                        key={sec.id}
                        className={`rounded-xl p-2 border text-center flex flex-col items-center gap-1 ${
                          found
                            ? 'bg-white dark:bg-slate-900 border-amber-300 dark:border-amber-700'
                            : 'bg-slate-100 dark:bg-slate-900/50 border-dashed border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        <div className={found ? '' : 'grayscale opacity-35'}>
                          <SecretItemArt item={sec} className="w-8 h-8" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-tight">
                          {found ? sec.name : 'Chưa tìm thấy'}
                        </span>
                      </div>
                    );
                  })}
                  <div
                    className={`rounded-xl p-2 border text-center flex flex-col items-center justify-center gap-1 ${
                      chestOpened
                        ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-400'
                        : 'bg-slate-100 dark:bg-slate-900/50 border-dashed border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    <Star className={`w-6 h-6 ${chestOpened ? 'text-amber-500 fill-amber-400' : 'text-slate-400'}`} />
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-tight">
                      {chestOpened ? r.chest.rewardTitle : chestReady ? 'Rương sẵn sàng!' : 'Rương khóa'}
                    </span>
                  </div>
                </div>

                {badgeEarned && (
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Đã đạt huy hiệu {r.badgeName}!
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
