import React, { useCallback, useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { AvatarConfig } from '../../types';
import { AvatarPetLayer } from '../avatar/AvatarVehiclePetAuraLayer';
import { STARTER_PETS } from '../../data/vanMieuWorld';
import { soundManager } from '../../utils/audio';
import { Bot, Check, Flame, Heart, Play, RotateCcw, Sparkles, Trophy, User, X } from 'lucide-react';

interface VanMieuPetZoneModalProps {
  initialTab?: 'care' | 'race';
  avatarConfig: AvatarConfig;
  adoptedStarterPetId: string | null;
  petAffection: number;
  petBallCatches: number;
  onAdoptPet: (petId: string) => void;
  onPetHeart: () => void;
  onBallCatch: () => void;
  onWinPetRace: (starsEarned: number) => void;
  onClose: () => void;
}

interface PetRacer {
  id: string;
  name: string;
  petId: string;
  progress: number; // 0..100
  isBot: boolean;
}

export const VanMieuPetZoneModal: React.FC<VanMieuPetZoneModalProps> = ({
  initialTab = 'care',
  avatarConfig,
  adoptedStarterPetId,
  petAffection,
  petBallCatches,
  onAdoptPet,
  onPetHeart,
  onBallCatch,
  onWinPetRace,
  onClose
}) => {
  const [tab, setTab] = useState<'care' | 'race'>(initialTab);
  const [heartPop, setHeartPop] = useState(false);
  const [ballPos, setBallPos] = useState<{ x: number; active: boolean }>({ x: 75, active: false });

  // Pet Race state machine
  const [raceState, setRaceState] = useState<'READY' | 'RACING' | 'FINISHED'>('READY');
  const [racers, setRacers] = useState<PetRacer[]>([]);
  const [powerCursor, setPowerCursor] = useState(50);
  const [winnerName, setWinnerName] = useState('');
  const [boostCooldown, setBoostCooldown] = useState(false);

  const currentPetId =
    avatarConfig.petId && avatarConfig.petId !== 'pet_none'
      ? avatarConfig.petId
      : adoptedStarterPetId || 'pet_corgi';

  const currentPetMeta = STARTER_PETS.find((p) => p.petId === currentPetId) ?? STARTER_PETS[0];

  const handleThrowBall = () => {
    if (ballPos.active) return;
    soundManager.play('jump');
    const targetX = 72 + Math.round(Math.random() * 14);
    setBallPos({ x: targetX, active: true });
    window.setTimeout(() => {
      soundManager.play('coin');
      setBallPos({ x: 75, active: false });
      onBallCatch();
    }, 950);
  };

  const handlePetAffection = () => {
    soundManager.play('coin');
    setHeartPop(true);
    onPetHeart();
    window.setTimeout(() => setHeartPop(false), 650);
  };

  // Pet Race Initialization
  const startPetRace = useCallback(() => {
    soundManager.play('drum');
    setWinnerName('');
    setRacers([
      {
        id: 'self_pet',
        name: `${currentPetMeta.shortName} (Bạn)`,
        petId: currentPetId,
        progress: 0,
        isBot: false
      },
      { id: 'bot_1', name: 'Mèo Cam [BOT]', petId: 'pet_cat', progress: 0, isBot: true },
      { id: 'bot_2', name: 'Thỏ Bông [BOT]', petId: 'pet_bunny', progress: 0, isBot: true },
      { id: 'bot_3', name: 'Gấu Trúc [BOT]', petId: 'pet_panda', progress: 0, isBot: true }
    ]);
    setRaceState('RACING');
  }, [currentPetId, currentPetMeta.shortName]);

  // Oscillating rhythm bar & bot racing loop
  const awardedRef = useRef(false);
  useEffect(() => {
    if (raceState !== 'RACING') {
      awardedRef.current = false;
      return;
    }

    const barTimer = window.setInterval(() => {
      setPowerCursor((c) => {
        const t = Date.now() / 360;
        return Math.round(50 + Math.sin(t) * 45);
      });
    }, 50);

    const raceTimer = window.setInterval(() => {
      setRacers((prev) => {
        const next = prev.map((r) => {
          const baseStep = r.isBot ? 2.5 + Math.random() * 3.1 : 2.1;
          return { ...r, progress: Math.min(100, r.progress + baseStep) };
        });
        const top = next.find((r) => r.progress >= 100);
        if (top && !awardedRef.current) {
          awardedRef.current = true;
          setWinnerName(top.name);
          setRaceState('FINISHED');
          if (!top.isBot) {
            soundManager.play('fanfare');
            confetti({ particleCount: 85, spread: 80, origin: { y: 0.6 } });
            onWinPetRace(2);
          } else {
            soundManager.play('coin');
            onWinPetRace(1);
          }
        }
        return next;
      });
    }, 180);

    return () => {
      window.clearInterval(barTimer);
      window.clearInterval(raceTimer);
    };
  }, [raceState, onWinPetRace]);

  const handlePetBoost = useCallback(() => {
    if (raceState !== 'RACING' || boostCooldown) return;
    setBoostCooldown(true);
    window.setTimeout(() => setBoostCooldown(false), 260);
    const inSweetSpot = powerCursor >= 35 && powerCursor <= 65;
    soundManager.play(inSweetSpot ? 'coin' : 'click');
    setRacers((prev) =>
      prev.map((r) =>
        r.id === 'self_pet'
          ? { ...r, progress: Math.min(100, r.progress + (inSweetSpot ? 9.5 : 4.2)) }
          : r
      )
    );
  }, [boostCooldown, powerCursor, raceState]);

  useEffect(() => {
    if (tab !== 'race' || raceState !== 'RACING') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        handlePetBoost();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handlePetBoost, raceState, tab]);

  const previewConfig: AvatarConfig = {
    ...avatarConfig,
    petId: currentPetId
  };

  return (
    <div
      data-interactive="true"
      onClick={onClose}
      className="fixed inset-0 z-[90] bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-400 dark:border-slate-700 p-4 sm:p-6 shadow-2xl space-y-4 max-h-[92dvh] overflow-y-auto"
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" />
              Vườn Thú Cưng Cổ Tích
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Nhận thú cưng miễn phí đi theo khắp Văn Miếu, vuốt ve ném bóng &amp; thi Đua Thú Cưng!
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

        {/* Interactive Mode Tabs */}
        <div className="grid grid-cols-2 gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-black">
          <button
            type="button"
            onClick={() => setTab('care')}
            className={`py-2 rounded-xl transition-colors cursor-pointer ${
              tab === 'care'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Nhận &amp; Chăm Thú Cưng
          </button>
          <button
            type="button"
            onClick={() => setTab('race')}
            className={`py-2 rounded-xl transition-colors cursor-pointer ${
              tab === 'race'
                ? 'bg-white dark:bg-slate-900 text-amber-600 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Đua Thú Cưng (4 Làn)
          </button>
        </div>

        {tab === 'care' ? (
          <div className="space-y-4">
            {/* Live Interactive Pet Meadow */}
            <div className="relative h-44 rounded-3xl bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-300 dark:from-slate-800 dark:to-emerald-950 border-2 border-emerald-300 overflow-hidden flex items-center justify-between px-6">
              <div
                style={{
                  transform: ballPos.active ? 'translateX(120px) scale(1.15)' : 'translateX(0px)'
                }}
                className="relative w-32 h-32 transition-transform duration-500 flex items-center justify-center"
              >
                <svg viewBox="0 0 220 280" className="w-full h-full">
                  <AvatarPetLayer config={previewConfig} animated={true} uid="pet_garden_modal" />
                </svg>
                {heartPop && (
                  <span className="absolute top-0 right-2 text-2xl animate-bounce">💖</span>
                )}
              </div>

              {ballPos.active && (
                <div
                  style={{ left: `${ballPos.x}%` }}
                  className="absolute bottom-8 w-6 h-6 rounded-full bg-gradient-to-br from-rose-500 to-amber-400 border-2 border-white shadow animate-bounce"
                />
              )}

              <div className="text-right space-y-2 z-10">
                <div className="text-xs font-black text-slate-800 dark:text-white">
                  Thân thiết: <span className="text-rose-600 tabular-nums">{petAffection}</span> · Bắt bóng:{' '}
                  <span className="text-emerald-700 dark:text-emerald-300 tabular-nums">{petBallCatches}</span>
                </div>
                <div className="flex flex-wrap justify-end gap-2">
                  <button
                    type="button"
                    onClick={handlePetAffection}
                    className="px-3.5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-black shadow cursor-pointer flex items-center gap-1"
                  >
                    <Heart className="w-3.5 h-3.5" /> Vuốt ve
                  </button>
                  <button
                    type="button"
                    onClick={handleThrowBall}
                    disabled={ballPos.active}
                    className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 disabled:opacity-60 text-slate-950 text-xs font-black shadow cursor-pointer flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Ném bóng
                  </button>
                </div>
              </div>
            </div>

            {/* Free Starter Pet Picker */}
            <div>
              <div className="text-xs font-black text-slate-700 dark:text-slate-200 mb-2">
                Chọn Thú Cưng Miễn Phí Ban Đầu (tự động đi theo nhân vật):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {STARTER_PETS.map((pet) => {
                  const isEquipped = avatarConfig.petId === pet.petId;
                  return (
                    <button
                      key={pet.petId}
                      type="button"
                      onClick={() => {
                        soundManager.play('equip');
                        onAdoptPet(pet.petId);
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                        isEquipped
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 shadow-sm'
                          : 'border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>{pet.shortName}</span>
                          {isEquipped && (
                            <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                              <Check className="w-3 h-3" /> Đang đi cùng
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {pet.personality}
                        </div>
                      </div>
                      <span
                        className="px-2 py-0.5 rounded-lg text-[10px] font-black text-white shrink-0"
                        style={{ backgroundColor: pet.badgeColor }}
                      >
                        Miễn phí
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {raceState === 'READY' ? (
              <div className="space-y-3 py-2">
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/35 border border-amber-200 dark:border-amber-800 text-xs text-slate-700 dark:text-slate-200 space-y-1">
                  <div className="font-black text-sm text-amber-900 dark:text-amber-200">
                    Đường đua 4 làn — Thú cưng tranh tài!
                  </div>
                  <p>
                    Bé <b>{currentPetMeta.shortName}</b> của bạn sẽ chạy cùng 3 đối thủ <b>[BOT]</b>. Bấm nút <b>Tăng Tốc</b> (hoặc <b>Space</b>) đúng lúc kim rơi vào vùng Xanh ở giữa để phóng vọt lên!
                  </p>
                </div>
                <button
                  type="button"
                  onClick={startPetRace}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-105 text-slate-950 font-black text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4" /> Xuất Phát Đua Thú Cưng!
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {/* 4 Race Lanes */}
                <div className="space-y-2 p-3 rounded-2xl bg-emerald-50 dark:bg-slate-800 border border-emerald-300 dark:border-slate-700">
                  {racers.map((r) => (
                    <div key={r.id} className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className="flex items-center gap-1 text-slate-800 dark:text-slate-100">
                          {r.isBot ? <Bot className="w-3 h-3 text-slate-500" /> : <User className="w-3 h-3 text-emerald-600" />}
                          {r.name}
                        </span>
                        <span className="tabular-nums text-slate-500">{Math.round(r.progress)}%</span>
                      </div>
                      <div className="relative h-6 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 overflow-hidden px-1 flex items-center">
                        <div
                          style={{ width: `${r.progress}%` }}
                          className={`h-4 rounded-full transition-all duration-150 ${
                            r.isBot ? 'bg-amber-400' : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {raceState === 'RACING' ? (
                  <div className="space-y-2">
                    {/* Rhythm Sweet Spot Meter */}
                    <div className="relative h-5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div className="absolute inset-y-0 left-[35%] w-[30%] bg-emerald-400/80" />
                      <div
                        style={{ left: `${powerCursor}%` }}
                        className="absolute top-0 bottom-0 w-2 -translate-x-1/2 bg-slate-950 dark:bg-white rounded-full"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handlePetBoost}
                      className="w-full min-h-[50px] py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-transform"
                    >
                      <Flame className="w-4 h-4 text-amber-300" />
                      TĂNG TỐC NGAY! (Vùng Xanh = X2 Tốc Độ)
                    </button>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-6 h-6 text-amber-500 shrink-0" />
                      <div className="text-xs font-black text-slate-900 dark:text-white">
                        Về nhất: {winnerName}! ({winnerName.includes('Bạn') ? '+2 Sao' : '+1 Sao cổ vũ'})
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={startPetRace}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Đua lại
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
