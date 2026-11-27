import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { AvatarConfig, PersonalRoomDecor, RoomWallTheme } from '../../types';
import { DEFAULT_ROOM_DECOR } from '../../data/items';
import { FISH_SPECIES, type FishSpecies } from '../../data/vanMieuWorld';
import { AvatarRenderer } from '../AvatarRenderer';
import { StudioStageBackdrop } from '../StudioStageBackdrop';
import { soundManager } from '../../utils/audio';
import {
  Check,
  Droplets,
  Fish,
  Home,
  Palette,
  Sparkles,
  Sprout,
  Trees,
  X
} from 'lucide-react';

interface VanMieuFishingHouseModalProps {
  initialTab?: 'fishing' | 'house';
  studentId: string;
  studentName: string;
  avatarConfig: AvatarConfig;
  fishCounts: Record<string, number>;
  plantLevel: number;
  onCatchFish: (fish: FishSpecies) => void;
  onWaterPlant: () => void;
  onOpenStudio: () => void;
  onClose: () => void;
}

const loadRoomDecor = (studentId: string): PersonalRoomDecor => {
  try {
    const raw = localStorage.getItem(`hsv_room_decor_${studentId}`);
    if (!raw) return DEFAULT_ROOM_DECOR;
    const parsed = JSON.parse(raw) as Partial<PersonalRoomDecor>;
    const validTheme: RoomWallTheme =
      parsed.wallTheme === 'warm' ||
      parsed.wallTheme === 'sky' ||
      parsed.wallTheme === 'forest' ||
      parsed.wallTheme === 'galaxy'
        ? parsed.wallTheme
        : DEFAULT_ROOM_DECOR.wallTheme;
    return {
      wallTheme: validTheme,
      showDeskPc: typeof parsed.showDeskPc === 'boolean' ? parsed.showDeskPc : true,
      showBed: typeof parsed.showBed === 'boolean' ? parsed.showBed : true,
      showBookshelf: typeof parsed.showBookshelf === 'boolean' ? parsed.showBookshelf : true,
      showPlant: typeof parsed.showPlant === 'boolean' ? parsed.showPlant : true,
      showPoster: typeof parsed.showPoster === 'boolean' ? parsed.showPoster : true,
      showTrophyRack: typeof parsed.showTrophyRack === 'boolean' ? parsed.showTrophyRack : true
    };
  } catch {
    return DEFAULT_ROOM_DECOR;
  }
};

const saveRoomDecor = (studentId: string, decor: PersonalRoomDecor) => {
  try {
    localStorage.setItem(`hsv_room_decor_${studentId}`, JSON.stringify(decor));
  } catch {
    // ignore
  }
};

type FishState = 'IDLE' | 'WAITING' | 'BITING' | 'CAUGHT' | 'ESCAPED';

export const VanMieuFishingHouseModal: React.FC<VanMieuFishingHouseModalProps> = ({
  initialTab = 'fishing',
  studentId,
  studentName,
  avatarConfig,
  fishCounts,
  plantLevel,
  onCatchFish,
  onWaterPlant,
  onOpenStudio,
  onClose
}) => {
  const [tab, setTab] = useState<'fishing' | 'house'>(initialTab);
  const [fishState, setFishState] = useState<FishState>('IDLE');
  const [caughtFish, setCaughtFish] = useState<FishSpecies | null>(null);
  const [roomDecor, setRoomDecor] = useState<PersonalRoomDecor>(() => loadRoomDecor(studentId));

  const waitTimerRef = useRef<number | null>(null);
  const escapeTimerRef = useRef<number | null>(null);

  const clearFishTimers = () => {
    if (waitTimerRef.current) window.clearTimeout(waitTimerRef.current);
    if (escapeTimerRef.current) window.clearTimeout(escapeTimerRef.current);
  };

  useEffect(() => {
    return () => clearFishTimers();
  }, []);

  const handleCastLine = () => {
    clearFishTimers();
    soundManager.play('splash');
    setCaughtFish(null);
    setFishState('WAITING');
    const delay = 1400 + Math.round(Math.random() * 1800);
    waitTimerRef.current = window.setTimeout(() => {
      soundManager.play('coin');
      setFishState('BITING');
      escapeTimerRef.current = window.setTimeout(() => {
        setFishState((cur) => (cur === 'BITING' ? 'ESCAPED' : cur));
      }, 2200);
    }, delay);
  };

  const handleReelIn = () => {
    if (fishState !== 'BITING') return;
    clearFishTimers();
    const roll = Math.random();
    const pool =
      roll > 0.85
        ? FISH_SPECIES.filter((f) => f.rarity === 'Hiếm')
        : roll > 0.52
        ? FISH_SPECIES.filter((f) => f.rarity === 'Quý')
        : FISH_SPECIES.filter((f) => f.rarity === 'Phổ biến');
    const chosen = pool[Math.floor(Math.random() * pool.length)] ?? FISH_SPECIES[0];
    setCaughtFish(chosen);
    setFishState('CAUGHT');
    soundManager.play('fanfare');
    confetti({ particleCount: 55, spread: 70, origin: { y: 0.6 } });
    onCatchFish(chosen);
  };

  const updateDecor = (next: PersonalRoomDecor) => {
    soundManager.play('click');
    setRoomDecor(next);
    saveRoomDecor(studentId, next);
  };

  const uniqueFishCount = Object.keys(fishCounts).length;

  return (
    <div
      data-interactive="true"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border-2 border-cyan-400 dark:border-slate-700 p-4 sm:p-6 shadow-2xl space-y-4 max-h-[92svh] overflow-y-auto"
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              {tab === 'fishing' ? (
                <Fish className="w-5 h-5 text-cyan-500" />
              ) : (
                <Home className="w-5 h-5 text-amber-500" />
              )}
              {tab === 'fishing' ? 'Câu Cá Thư Giãn — Suối Ngọc' : `Ngôi Nhà Riêng Của ${studentName}`}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {tab === 'fishing'
                ? `Thả cần câu nhẹ nhàng bên Suối Ngọc, sưu tầm đủ ${FISH_SPECIES.length} loài cá quý!`
                : 'Trang trí phòng riêng, chăm vườn cây xanh & khoe thú cưng cùng bạn bè.'}
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

        {/* Interactive Mode Switch */}
        <div className="grid grid-cols-2 gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-black">
          <button
            type="button"
            onClick={() => setTab('fishing')}
            className={`py-2 rounded-xl transition-colors cursor-pointer ${
              tab === 'fishing'
                ? 'bg-white dark:bg-slate-900 text-cyan-600 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Câu Cá Suối Ngọc ({uniqueFishCount}/{FISH_SPECIES.length})
          </button>
          <button
            type="button"
            onClick={() => setTab('house')}
            className={`py-2 rounded-xl transition-colors cursor-pointer ${
              tab === 'house'
                ? 'bg-white dark:bg-slate-900 text-amber-600 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Ngôi Nhà &amp; Vườn Cây
          </button>
        </div>

        {tab === 'fishing' ? (
          <div className="space-y-4">
            {/* Interactive Pond Viewport */}
            <div className="relative h-44 rounded-3xl bg-gradient-to-b from-sky-200 via-cyan-200 to-teal-500 dark:from-slate-800 dark:to-teal-950 border-2 border-cyan-300 overflow-hidden flex flex-col items-center justify-center p-4">
              {/* Wooden Pier Top Edge */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-amber-800 border-b-4 border-amber-600 flex items-center justify-center text-[11px] font-black text-amber-100">
                Cầu Gỗ Suối Ngọc (Ngoài Văn Miếu)
              </div>

              {fishState === 'IDLE' && (
                <div className="mt-4 text-center space-y-2">
                  <div className="text-xs font-bold text-slate-900">
                    Mặt suối xanh mát — sẵn sàng thả câu thư giãn!
                  </div>
                  <button
                    type="button"
                    onClick={handleCastLine}
                    className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-black shadow-lg cursor-pointer hover:brightness-105"
                  >
                    Thả Cần Câu
                  </button>
                </div>
              )}

              {fishState === 'WAITING' && (
                <div className="mt-4 flex flex-col items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-white shadow animate-bounce" />
                  <div className="text-xs font-black text-slate-900">
                    Đang chờ cá cắn câu... giữ yên nhé!
                  </div>
                </div>
              )}

              {fishState === 'BITING' && (
                <div className="mt-4 flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={handleReelIn}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 border-2 border-white text-slate-950 text-sm font-black shadow-xl animate-bounce cursor-pointer"
                  >
                    CÁ CẮN CÂU! KÉO CẦN NGAY!
                  </button>
                </div>
              )}

              {fishState === 'ESCAPED' && (
                <div className="mt-4 text-center space-y-2">
                  <div className="text-xs font-black text-slate-900">
                    Cá bơi mất rồi! Thử thả lại cần nhé.
                  </div>
                  <button
                    type="button"
                    onClick={handleCastLine}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-black cursor-pointer"
                  >
                    Thả Câu Lại
                  </button>
                </div>
              )}

              {fishState === 'CAUGHT' && caughtFish && (
                <div className="mt-4 flex flex-col sm:flex-row items-center gap-3 bg-white/95 rounded-2xl px-4 py-2.5 shadow-lg">
                  <svg viewBox="0 0 64 40" className="w-12 h-8 shrink-0">
                    <polygon points="8,20 2,10 2,30" fill={caughtFish.color} />
                    <ellipse cx="34" cy="20" rx="22" ry="12" fill={caughtFish.color} />
                    <ellipse cx="36" cy="22" rx="12" ry="6" fill={caughtFish.accent} opacity="0.85" />
                    <circle cx="46" cy="17" r="2.5" fill="#0f172a" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs font-black text-slate-900">
                      Câu được: {caughtFish.name} ({caughtFish.rarity})
                    </div>
                    <div className="text-[11px] text-slate-600">
                      +{caughtFish.starsReward} Sao · {caughtFish.note}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCastLine}
                    className="px-3 py-1.5 rounded-xl bg-cyan-600 text-white text-xs font-black cursor-pointer shrink-0"
                  >
                    Câu Tiếp
                  </button>
                </div>
              )}
            </div>

            {/* Fish Collection Grid */}
            <div>
              <div className="text-xs font-black text-slate-700 dark:text-slate-200 mb-2">
                Sổ Tay Sưu Tầm Cá Suối Ngọc:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {FISH_SPECIES.map((f) => {
                  const count = fishCounts[f.id] || 0;
                  return (
                    <div
                      key={f.id}
                      className={`p-2.5 rounded-2xl border text-xs ${
                        count > 0
                          ? 'border-cyan-300 bg-cyan-50/70 dark:bg-cyan-950/30'
                          : 'border-slate-200 dark:border-slate-800 opacity-65'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 font-black text-slate-900 dark:text-white">
                        <span className="truncate">{count > 0 ? f.name : '???'}</span>
                        <span className="text-[10px] text-cyan-700 dark:text-cyan-300 tabular-nums">
                          x{count}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{f.rarity}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Live Cozy Room Stage */}
            <div className="relative h-56 sm:h-64 rounded-3xl overflow-hidden border-2 border-amber-300 shadow-inner">
              <StudioStageBackdrop backdropId="bg_my_room" roomDecor={roomDecor} />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 scale-[0.82] sm:scale-[0.9] origin-bottom pointer-events-none">
                <AvatarRenderer
                  config={avatarConfig}
                  size="sm"
                  animated={true}
                  showPet={true}
                  showTech={true}
                />
              </div>
              {/* Potted Plant Watering Corner */}
              <div className="absolute bottom-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs rounded-2xl p-2.5 border border-emerald-300 shadow flex items-center gap-2">
                {plantLevel >= 3 ? (
                  <Trees className="w-6 h-6 text-emerald-600" />
                ) : (
                  <Sprout className="w-6 h-6 text-emerald-500" />
                )}
                <div className="text-left">
                  <div className="text-[10px] font-black text-slate-800 dark:text-white">
                    Cây Vườn Nhà · Cấp {plantLevel}/4
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.play('splash');
                      onWaterPlant();
                    }}
                    className="mt-0.5 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black flex items-center gap-1 cursor-pointer"
                  >
                    <Droplets className="w-3 h-3" /> Tưới nước
                  </button>
                </div>
              </div>
            </div>

            {/* Wall Theme & Furniture Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="text-xs font-black text-slate-800 dark:text-white flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-amber-500" /> Màu Tường Phòng Riêng
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-xs font-bold">
                  {(
                    [
                      ['warm', 'Vàng Ấm'],
                      ['sky', 'Xanh Biển'],
                      ['forest', 'Rừng Xanh'],
                      ['galaxy', 'Dải Ngân Hà']
                    ] as const
                  ).map(([theme, label]) => (
                    <button
                      key={theme}
                      type="button"
                      onClick={() => updateDecor({ ...roomDecor, wallTheme: theme })}
                      className={`py-1.5 px-2 rounded-xl border cursor-pointer ${
                        roomDecor.wallTheme === theme
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="text-xs font-black text-slate-800 dark:text-white">
                  Bày Trí Nội Thất (đồng bộ Studio):
                </div>
                <div className="flex flex-wrap gap-1.5 text-[11px] font-bold">
                  {(
                    [
                      ['showBed', 'Giường ngủ'],
                      ['showDeskPc', 'Bàn & Máy tính'],
                      ['showBookshelf', 'Giá sách'],
                      ['showPlant', 'Chậu cây'],
                      ['showPoster', 'Tranh treo tường'],
                      ['showTrophyRack', 'Kệ cúp']
                    ] as const
                  ).map(([key, label]) => {
                    const active = roomDecor[key];
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => updateDecor({ ...roomDecor, [key]: !active })}
                        className={`px-2.5 py-1 rounded-xl border flex items-center gap-1 cursor-pointer ${
                          active
                            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-200'
                            : 'border-slate-200 dark:border-slate-700 text-slate-500'
                        }`}
                      >
                        {active && <Check className="w-3 h-3" />}
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={onOpenStudio}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs font-black flex items-center gap-1.5 shadow cursor-pointer"
              >
                <Sparkles className="w-4 h-4" /> Mở Phố Thời Trang &amp; Đổi Trang Phục
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
