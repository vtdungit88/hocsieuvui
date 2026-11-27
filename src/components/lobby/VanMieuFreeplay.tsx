import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../utils/audio';
import {
  FISH_SPECIES,
  VAN_MIEU_ACHIEVEMENTS,
  VAN_MIEU_NPCS,
  VAN_MIEU_ZONES,
  type VanMieuNpc,
  type VanMieuWorldSave,
  type VanMieuZoneId
} from '../../data/vanMieuWorld';
import {
  Gift,
  Sparkles,
  Trophy,
  X,
  Plus,
  Palette,
  RotateCcw,
  Check,
  Compass,
  Flag,
  Heart,
  Fish,
  Home,
  Megaphone,
  Music,
  Shirt,
  Users
} from 'lucide-react';

export type LightingMode = 'day' | 'sunset' | 'night';
export type AvatarScaleMode = 'normal' | 'giant' | 'tiny';
export type ToyId =
  | 'water_balloon'
  | 'giant_candy'
  | 'tiny_candy'
  | 'balloons'
  | 'firework'
  | 'lantern';

export type TrailColorId = 'none' | 'rainbow' | 'gold' | 'sakura' | 'cyan';

export interface FloatingLantern {
  id: string;
  x: number;
  y: number;
  alias: string;
  color: string;
  createdAt: number;
}

export interface BalloonBurst {
  id: string;
  x: number;
  y: number;
  createdAt: number;
}

export interface DrumRipple {
  id: string;
  combo: number;
  createdAt: number;
}

export interface AmbientCritter {
  id: string;
  x: number;
  y: number;
  kind: 'butterfly' | 'firefly';
  color: string;
}

export interface TreasureItem {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
}

export interface VanMieuStats {
  dateKey: string;
  drumsHit: number;
  lanternsReleased: number;
  crittersCaught: number;
  toysUsed: number;
  memoryWins: number;
  bestMemorySeconds: number | null;
  foundTreasures: string[];
  giftClaimed: boolean;
}

export const getTodayKey = () => new Date().toISOString().slice(0, 10);

export const TREASURE_NODES: TreasureItem[] = [
  { id: 'tr_fan', name: 'Quạt Giấy Lễ Hội', x: 11, y: 54, color: '#f43f5e' },
  { id: 'tr_candy', name: 'Kẹo Hồ Lô Ngọt', x: 90, y: 54, color: '#fb923c' },
  { id: 'tr_chime', name: 'Chuông Gió Ngọc', x: 43, y: 58, color: '#38bdf8' },
  { id: 'tr_brush', name: 'Cọ Vẽ Cầu Vồng', x: 76, y: 69, color: '#a855f7' },
  { id: 'tr_lantern', name: 'Đèn Lồng Tí Hon', x: 28, y: 84, color: '#facc15' }
];

export const TRAIL_OPTIONS: { id: TrailColorId; label: string; dot: string }[] = [
  { id: 'none', label: 'Không dấu chân', dot: '#cbd5e1' },
  { id: 'rainbow', label: 'Bụi Cầu Vồng', dot: 'linear-gradient(135deg,#fb7185,#facc15,#38bdf8)' },
  { id: 'gold', label: 'Sao Vàng Lấp Lánh', dot: '#facc15' },
  { id: 'sakura', label: 'Cánh Hoa Đào', dot: '#f472b6' },
  { id: 'cyan', label: 'Bọt Biển Xanh', dot: '#22d3ee' }
];

export const TOY_CATALOG: {
  id: ToyId;
  name: string;
  desc: string;
  badge: string;
  gradient: string;
}[] = [
  {
    id: 'lantern',
    name: 'Đèn Hoa Đăng',
    desc: 'Thả đèn phát sáng trôi bồng bềnh trên Hồ Sen Văn Miếu.',
    badge: 'Lễ hội',
    gradient: 'from-amber-400 to-orange-500'
  },
  {
    id: 'giant_candy',
    name: 'Kẹo Khổng Lồ',
    desc: 'Hóa to nhân vật gấp rưỡi siêu oai trong 20 giây!',
    badge: '20 giây',
    gradient: 'from-rose-400 to-pink-600'
  },
  {
    id: 'tiny_candy',
    name: 'Kẹo Tí Hon',
    desc: 'Thu nhỏ thành chú lùn siêu cưng trong 20 giây!',
    badge: '20 giây',
    gradient: 'from-violet-400 to-purple-600'
  },
  {
    id: 'balloons',
    name: 'Chùm Bóng Bay',
    desc: 'Thả chùm bóng bay 5 màu rực rỡ bay lên bầu trời!',
    badge: 'Bất ngờ',
    gradient: 'from-sky-400 to-blue-600'
  },
  {
    id: 'water_balloon',
    name: 'Bóng Nước Cầu Vồng',
    desc: 'Nổ tung tia màu sắc & đổi hào quang cầu vồng quanh người!',
    badge: '12 giây',
    gradient: 'from-cyan-400 to-teal-500'
  },
  {
    id: 'firework',
    name: 'Pháo Hoa Cầm Tay',
    desc: 'Bắn pháo hoa tưng bừng ngay tại vị trí đang đứng!',
    badge: 'Rực rỡ',
    gradient: 'from-yellow-400 to-red-500'
  }
];

export function loadVanMieuStats(studentId: string): VanMieuStats {
  const today = getTodayKey();
  const empty: VanMieuStats = {
    dateKey: today,
    drumsHit: 0,
    lanternsReleased: 0,
    crittersCaught: 0,
    toysUsed: 0,
    memoryWins: 0,
    bestMemorySeconds: null,
    foundTreasures: [],
    giftClaimed: false
  };
  try {
    const raw = localStorage.getItem(`hsv_vanmieu_stats_${studentId}`);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<VanMieuStats>;
    if (parsed.dateKey !== today) {
      return {
        ...empty,
        bestMemorySeconds: typeof parsed.bestMemorySeconds === 'number' ? parsed.bestMemorySeconds : null
      };
    }
    return {
      ...empty,
      ...parsed,
      foundTreasures: Array.isArray(parsed.foundTreasures) ? parsed.foundTreasures : []
    };
  } catch {
    return empty;
  }
}

export function saveVanMieuStats(studentId: string, stats: VanMieuStats) {
  try {
    localStorage.setItem(`hsv_vanmieu_stats_${studentId}`, JSON.stringify(stats));
  } catch {
    // ignore quota error
  }
}

/* ============================================================================
 * 1. Interactive Freeplay Props & Respectful Cultural NPCs across 4 Zones
 * ==========================================================================*/
interface VanMieuInteractiveLayerProps {
  activeZone: VanMieuZoneId;
  lighting: LightingMode;
  drumCombo: number;
  drumShaking: boolean;
  drumRipples: DrumRipple[];
  lanterns: FloatingLantern[];
  balloonBursts: BalloonBurst[];
  critters: AmbientCritter[];
  foundTreasures: string[];
  catWaving: boolean;
  lawnBallActive: boolean;
  stageDanceActive: boolean;
  onSelectZone: (zone: VanMieuZoneId) => void;
  onSelectNpc: (npc: VanMieuNpc) => void;
  onPortalClick: () => void;
  onOpenNoticeBoard: () => void;
  onDrumHit: () => void;
  onHopscotchClick: () => void;
  onOpenOAnQuan: () => void;
  onOpenTugOfWar: () => void;
  onPondClick: (pondX: number, pondY: number) => void;
  onCreativeCornerClick: () => void;
  onFairyLibraryClick: () => void;
  onMarketClick: () => void;
  onOpenPetCare: (tab: 'care' | 'race') => void;
  onThrowLawnBall: () => void;
  onOpenObstacleRace: () => void;
  onOpenFishing: () => void;
  onOpenHouse: () => void;
  onOpenShop: () => void;
  onTriggerStageDance: () => void;
  onCatchCritter: (critter: AmbientCritter) => void;
  onCollectTreasure: (tr: TreasureItem) => void;
}

export const VanMieuInteractiveLayer: React.FC<VanMieuInteractiveLayerProps> = ({
  activeZone,
  lighting,
  drumCombo,
  drumShaking,
  drumRipples,
  lanterns,
  balloonBursts,
  critters,
  foundTreasures,
  catWaving,
  lawnBallActive,
  stageDanceActive,
  onSelectZone,
  onSelectNpc,
  onPortalClick,
  onOpenNoticeBoard,
  onDrumHit,
  onHopscotchClick,
  onOpenOAnQuan,
  onOpenTugOfWar,
  onPondClick,
  onCreativeCornerClick,
  onFairyLibraryClick,
  onMarketClick,
  onOpenPetCare,
  onThrowLawnBall,
  onOpenObstacleRace,
  onOpenFishing,
  onOpenHouse,
  onOpenShop,
  onTriggerStageDance,
  onCatchCritter,
  onCollectTreasure
}) => {
  const isNight = lighting === 'night';
  const zoneNpcs = VAN_MIEU_NPCS.filter((n) => n.zone === activeZone);

  return (
    <>
      {/* ZONE-SPECIFIC INTERACTIVE OBJECTS */}
      {activeZone === 'heritage_plaza' && (
        <>
          {/* 1. Khuê Văn Các Cultural Portal (Monument Center kept dignified!) */}
          <button
            type="button"
            data-interactive="true"
            onClick={(e) => {
              e.stopPropagation();
              onPortalClick();
            }}
            style={{ left: '50%', top: '44%', zIndex: 420 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
            title="Cổng Di Sản Khuê Văn Các — Mở Bản Đồ Du Hành Việt Nam"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full border-2 border-cyan-300/80 animate-ping opacity-55" />
              <svg viewBox="0 0 64 64" className="w-11 h-11 sm:w-13 sm:h-13 animate-spin" style={{ animationDuration: '9s' }}>
                <defs>
                  <radialGradient id="vanMieuPortal" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="45%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="32" cy="32" r="26" fill="url(#vanMieuPortal)" />
                <path d="M32 8 A24 24 0 0 1 56 32" stroke="#e0f2fe" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <path d="M32 56 A24 24 0 0 1 8 32" stroke="#7dd3fc" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              </svg>
            </div>
            <span className="mt-0.5 block px-2 py-0.5 rounded-lg bg-sky-700/90 text-white text-[10px] font-black shadow-md whitespace-nowrap">
              Cổng Du Hành
            </span>
          </button>

          {/* 2. Courtyard Event Notice Board */}
          <button
            type="button"
            data-interactive="true"
            onClick={(e) => {
              e.stopPropagation();
              onOpenNoticeBoard();
            }}
            style={{ left: '72%', top: '50%', zIndex: 440 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-2xl bg-amber-900/90 hover:bg-amber-800 border-2 border-amber-300 text-amber-100 shadow-lg flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform"
            title="Bảng Thông Báo Sự Kiện Lễ Hội Văn Miếu"
          >
            <Megaphone className="w-4 h-4 text-amber-300 shrink-0" />
            <div className="text-left leading-tight">
              <div className="text-[10px] font-black text-amber-200 whitespace-nowrap">Bảng Sự Kiện</div>
              <div className="text-[9px] font-bold text-white/90 whitespace-nowrap">Lễ Hội Hoa Đăng</div>
            </div>
          </button>

          {/* 3. Side Yard: Sân Chơi Dân Gian (Ô Ăn Quan, Kéo Co, Trống Hội, Lò Cò) */}
          <div
            style={{ left: '15%', top: '56%', zIndex: 480 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
          >
            <button
              type="button"
              data-interactive="true"
              onClick={(e) => {
                e.stopPropagation();
                onDrumHit();
              }}
              className={`relative group cursor-pointer focus:outline-none flex flex-col items-center ${
                drumShaking ? 'scale-110 -rotate-3' : 'hover:scale-105'
              } transition-transform`}
              title="Trống Khai Hội (Gõ 5 nhịp nổ pháo hoa)"
            >
              <div className="px-2.5 py-0.5 rounded-lg bg-gradient-to-b from-amber-500 to-orange-600 border border-amber-200 text-white text-[10px] font-black shadow whitespace-nowrap mb-1">
                Sân Chơi Dân Gian
              </div>
              <div className="relative px-2.5 py-1 rounded-2xl bg-amber-900/85 border-2 border-amber-400/70 shadow-lg flex items-center gap-1.5">
                <span className={`w-2 h-3 rounded-full bg-red-500 border border-amber-300 ${isNight ? 'shadow-[0_0_10px_#f59e0b]' : ''}`} />
                <svg viewBox="0 0 64 56" className="w-10 h-9 drop-shadow">
                  <path d="M16 48 L24 34 L40 34 L48 48" stroke="#78350f" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                  <ellipse cx="32" cy="24" rx="22" ry="16" fill="#dc2626" />
                  <ellipse cx="32" cy="24" rx="14" ry="11" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5" />
                </svg>
                <span className={`w-2 h-3 rounded-full bg-red-500 border border-amber-300 ${isNight ? 'shadow-[0_0_10px_#f59e0b]' : ''}`} />
              </div>
              <span className="mt-0.5 px-2 py-0.5 rounded-lg bg-rose-600 text-white text-[9px] font-black shadow whitespace-nowrap">
                Gõ Trống ({drumCombo}/5)
              </span>
            </button>

            <div className="flex flex-wrap items-center justify-center gap-1 max-w-[175px]">
              <button
                type="button"
                data-interactive="true"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenOAnQuan();
                }}
                className="px-2 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-[10px] font-black border border-white shadow cursor-pointer whitespace-nowrap"
              >
                Ô Ăn Quan
              </button>
              <button
                type="button"
                data-interactive="true"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenTugOfWar();
                }}
                className="px-2 py-1 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-[10px] font-black border border-white shadow cursor-pointer whitespace-nowrap"
              >
                Kéo Co
              </button>
              <button
                type="button"
                data-interactive="true"
                onClick={(e) => {
                  e.stopPropagation();
                  onHopscotchClick();
                }}
                className="px-2 py-0.5 rounded-lg bg-white/90 hover:bg-white text-sky-700 text-[9px] font-black border border-sky-300 shadow cursor-pointer whitespace-nowrap"
              >
                Nhảy Lò Cò
              </button>
            </div>
          </div>

          {drumRipples.map((r) => (
            <div
              key={r.id}
              style={{ left: '15%', top: '54%', zIndex: 470 }}
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-4 border-amber-300 animate-ping"
            />
          ))}

          {/* 4. Twin Lotus Ponds (Thả Hoa Đăng) */}
          <button
            type="button"
            data-interactive="true"
            onClick={(e) => {
              e.stopPropagation();
              onPondClick(34, 59);
            }}
            style={{ left: '35%', top: '57%', zIndex: 430 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-teal-600/90 hover:bg-teal-500 text-white text-[10px] font-black border border-teal-200/80 shadow-md cursor-pointer transition-transform hover:scale-105 whitespace-nowrap"
          >
            Thả Hoa Đăng
          </button>

          <button
            type="button"
            data-interactive="true"
            onClick={(e) => {
              e.stopPropagation();
              onPondClick(66, 59);
            }}
            style={{ left: '65%', top: '57%', zIndex: 430 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-teal-600/90 hover:bg-teal-500 text-white text-[10px] font-black border border-teal-200/80 shadow-md cursor-pointer transition-transform hover:scale-105 whitespace-nowrap"
          >
            Thả Đèn Sen
          </button>

          {lanterns.map((ln) => (
            <div
              key={ln.id}
              style={{ left: `${ln.x}%`, top: `${ln.y}%`, zIndex: 455 }}
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 studio-float"
            >
              <svg viewBox="0 0 36 32" className="w-7 h-7 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]">
                <ellipse cx="18" cy="24" rx="13" ry="5" fill="#fb7185" />
                <polygon points="8,22 18,12 28,22" fill={ln.color} />
                <circle cx="18" cy="18" r="4" fill="#fef08a" />
              </svg>
            </div>
          ))}

          {/* 5. Side Creative Corner (Bụi Tiên) & Fairy Library + Market */}
          <button
            type="button"
            data-interactive="true"
            onClick={(e) => {
              e.stopPropagation();
              onCreativeCornerClick();
            }}
            style={{ left: '86%', top: '55%', zIndex: 480 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer focus:outline-none"
          >
            <div className="px-2.5 py-0.5 rounded-lg bg-gradient-to-b from-amber-400 to-orange-500 border border-white text-slate-950 text-[10px] font-black shadow whitespace-nowrap mb-1">
              Góc Sáng Tạo
            </div>
            <div className="px-2.5 py-1 rounded-2xl bg-amber-100/95 border-2 border-amber-500 shadow-lg flex items-center gap-1.5 group-hover:scale-105 transition-transform">
              <svg
                viewBox="0 0 44 44"
                className={`w-8 h-8 transition-transform ${catWaving ? 'scale-115 -rotate-6' : ''}`}
              >
                <polygon points="10,16 13,5 20,12" fill="#f8fafc" stroke="#f59e0b" strokeWidth="2" />
                <polygon points="34,16 31,5 24,12" fill="#f8fafc" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="22" cy="24" r="14" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="17" cy="22" r="2.2" fill="#1e293b" />
                <circle cx="27" cy="22" r="2.2" fill="#1e293b" />
                <circle cx="22" cy="33" r="4" fill="#facc15" />
              </svg>
            </div>
            <span className="mt-0.5 px-2 py-0.5 rounded-lg bg-purple-600 text-white text-[9px] font-black shadow whitespace-nowrap">
              Dấu Chân Tiên
            </span>
          </button>

          <button
            type="button"
            data-interactive="true"
            onClick={(e) => {
              e.stopPropagation();
              onFairyLibraryClick();
            }}
            style={{ left: '15%', top: '79%', zIndex: 620 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer focus:outline-none"
          >
            <div className="px-2.5 py-1 rounded-xl bg-gradient-to-b from-sky-500 to-blue-700 border-2 border-sky-200 text-white text-[10px] font-black shadow-md whitespace-nowrap">
              Lật Hình Cổ Tích
            </div>
          </button>

          <button
            type="button"
            data-interactive="true"
            onClick={(e) => {
              e.stopPropagation();
              onMarketClick();
            }}
            style={{ left: '85%', top: '79%', zIndex: 620 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer focus:outline-none"
          >
            <div className="px-2.5 py-1 rounded-xl bg-gradient-to-b from-rose-500 to-red-600 border-2 border-amber-200 text-white text-[10px] font-black shadow-md whitespace-nowrap">
              Chợ Cổ Tích
            </div>
          </button>
        </>
      )}

      {/* ZONE 2: VƯỜN THÚ CƯNG */}
      {activeZone === 'pet_garden' && (
        <>
          <button
            type="button"
            data-interactive="true"
            onClick={(e) => {
              e.stopPropagation();
              onOpenPetCare('care');
            }}
            style={{ left: '22%', top: '52%', zIndex: 470 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 px-3.5 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white border-2 border-white shadow-lg flex items-center gap-1.5 text-xs font-black cursor-pointer hover:scale-105 transition-transform whitespace-nowrap"
          >
            <Heart className="w-4 h-4 text-rose-200" />
            Nhận &amp; Chăm Thú Cưng
          </button>

          <button
            type="button"
            data-interactive="true"
            onClick={(e) => {
              e.stopPropagation();
              onThrowLawnBall();
            }}
            style={{ left: '53%', top: '66%', zIndex: 470 }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 border-2 border-white shadow-lg text-xs font-black cursor-pointer transition-transform ${
              lawnBallActive ? 'scale-125 -translate-y-4' : 'hover:scale-105'
            } whitespace-nowrap`}
          >
            Ném Bóng Bãi Cỏ
          </button>

          <button
            type="button"
            data-interactive="true"
            onClick={(e) => {
              e.stopPropagation();
              onOpenPetCare('race');
            }}
            style={{ left: '78%', top: '53%', zIndex: 470 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:brightness-105 text-white border-2 border-white shadow-lg flex items-center gap-1.5 text-xs font-black cursor-pointer hover:scale-105 transition-transform whitespace-nowrap"
          >
            <Flag className="w-4 h-4" />
            Đua Thú Cưng (4 Làn)
          </button>
        </>
      )}

      {/* ZONE 3: ĐẢO PHIÊU LƯU & SUỐI NGỌC */}
      {activeZone === 'adventure_island' && (
        <>
          <button
            type="button"
            data-interactive="true"
            onClick={(e) => {
              e.stopPropagation();
              onOpenObstacleRace();
            }}
            style={{ left: '26%', top: '50%', zIndex: 470 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:brightness-110 text-white border-2 border-white shadow-xl flex items-center gap-1.5 text-xs font-black cursor-pointer hover:scale-105 transition-transform whitespace-nowrap"
          >
            <Flag className="w-4 h-4 text-amber-300" />
            Đường Đua Vượt Chướng Ngại
          </button>

          <button
            type="button"
            data-interactive="true"
            onClick={(e) => {
              e.stopPropagation();
              onOpenFishing();
            }}
            style={{ left: '74%', top: '62%', zIndex: 470 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-600 hover:brightness-110 text-white border-2 border-white shadow-xl flex items-center gap-1.5 text-xs font-black cursor-pointer hover:scale-105 transition-transform whitespace-nowrap"
          >
            <Fish className="w-4 h-4" />
            Câu Cá Suối Ngọc
          </button>
        </>
      )}

      {/* ZONE 4: PHỐ LỄ HỘI, VŨ HỘI & NHÀ RIÊNG */}
      {activeZone === 'festival_home' && (
        <>
          <button
            type="button"
            data-interactive="true"
            onClick={(e) => {
              e.stopPropagation();
              onOpenShop();
            }}
            style={{ left: '16%', top: '52%', zIndex: 470 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 px-3.5 py-2 rounded-2xl bg-rose-500 hover:bg-rose-400 text-white border-2 border-white shadow-lg flex items-center gap-1.5 text-xs font-black cursor-pointer hover:scale-105 transition-transform whitespace-nowrap"
          >
            <Shirt className="w-4 h-4" />
            Phố Thời Trang (Studio)
          </button>

          <button
            type="button"
            data-interactive="true"
            onClick={(e) => {
              e.stopPropagation();
              onTriggerStageDance();
            }}
            style={{ left: '50%', top: '52%', zIndex: 470 }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-2 border-amber-300 shadow-xl flex items-center gap-1.5 text-xs font-black cursor-pointer transition-transform whitespace-nowrap ${
              stageDanceActive ? 'scale-110 animate-bounce' : 'hover:scale-105'
            }`}
          >
            <Music className="w-4 h-4 text-amber-300" />
            Vũ Hội Sân Khấu!
          </button>

          <button
            type="button"
            data-interactive="true"
            onClick={(e) => {
              e.stopPropagation();
              onOpenHouse();
            }}
            style={{ left: '84%', top: '52%', zIndex: 470 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 px-3.5 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 border-2 border-white shadow-lg flex items-center gap-1.5 text-xs font-black cursor-pointer hover:scale-105 transition-transform whitespace-nowrap"
          >
            <Home className="w-4 h-4" />
            Ngôi Nhà Riêng
          </button>
        </>
      )}

      {/* ZONE TELEPORT PORTALS RIGHT ON THE GROUND (Zero menu hunting!) */}
      <div
        data-interactive="true"
        onClick={(e) => e.stopPropagation()}
        style={{ left: '50%', top: '92%', zIndex: 495 }}
        className="absolute -translate-x-1/2 -translate-y-full flex items-center gap-1.5 px-2 py-1 rounded-2xl bg-slate-950/70 backdrop-blur-xs border border-white/25 shadow-lg max-w-[92%] overflow-x-auto"
      >
        <span className="text-[10px] font-bold text-amber-300 whitespace-nowrap pl-1">
          Cổng Khu:
        </span>
        {VAN_MIEU_ZONES.map((z) => {
          const isCur = z.id === activeZone;
          return (
            <button
              key={z.id}
              type="button"
              onClick={() => onSelectZone(z.id)}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-black whitespace-nowrap cursor-pointer transition-colors ${
                isCur
                  ? 'bg-amber-400 text-slate-950 shadow'
                  : 'bg-white/15 hover:bg-white/25 text-white'
              }`}
            >
              {z.shortName}
            </button>
          );
        })}
      </div>

      {/* IN-WORLD ANIMATED NPCs FOR CURRENT ZONE */}
      {zoneNpcs.map((npc) => (
        <button
          key={npc.id}
          type="button"
          data-interactive="true"
          onClick={(e) => {
            e.stopPropagation();
            onSelectNpc(npc);
          }}
          style={{ left: `${npc.x}%`, top: `${npc.y}%`, zIndex: Math.round(npc.y * 10) }}
          className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center group cursor-pointer focus:outline-none"
          title={`${npc.name} — ${npc.role}`}
        >
          <span className="mb-0.5 px-2 py-0.5 rounded-xl bg-amber-300 text-slate-950 text-[9px] font-black border border-white shadow animate-bounce whitespace-nowrap">
            Nói chuyện!
          </span>
          <svg viewBox="0 0 56 68" className="w-11 h-13 sm:w-12 sm:h-14 drop-shadow-md group-hover:scale-105 transition-transform">
            <ellipse cx="28" cy="64" rx="14" ry="4" fill="rgba(15,23,42,0.28)" />
            <path d="M16 40 L40 40 L44 62 L12 62 Z" fill={npc.robeColor} />
            <circle cx="28" cy="24" r="14" fill="#fde68a" />
            <path d="M13 20 Q28 8 43 20 L40 13 Q28 6 16 13 Z" fill={npc.hatColor} />
            <circle cx="23" cy="24" r="2" fill="#0f172a" />
            <circle cx="33" cy="24" r="2" fill="#0f172a" />
            <path d="M24 30 Q28 33 32 30" stroke="#991b1b" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
          <span className="px-2 py-0.5 rounded-lg bg-slate-900/85 text-amber-200 text-[9px] font-black border border-amber-400/50 whitespace-nowrap">
            {npc.name}
          </span>
        </button>
      ))}

      {/* Hidden Daily Treasures */}
      {(activeZone === 'heritage_plaza' || activeZone === 'adventure_island') &&
        TREASURE_NODES.map((tr) => {
          if (foundTreasures.includes(tr.id)) return null;
          return (
            <button
              key={tr.id}
              type="button"
              data-interactive="true"
              onClick={(e) => {
                e.stopPropagation();
                onCollectTreasure(tr);
              }}
              style={{ left: `${tr.x}%`, top: `${tr.y}%`, zIndex: 720 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none animate-bounce"
              title={`Kho báu ẩn: ${tr.name} — Bấm để nhặt!`}
            >
              <div
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center group-hover:scale-125 transition-transform"
                style={{ backgroundColor: tr.color }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </button>
          );
        })}

      {/* Ambient Clickable Butterflies / Fireflies */}
      {critters.map((c) => (
        <button
          key={c.id}
          type="button"
          data-interactive="true"
          onClick={(e) => {
            e.stopPropagation();
            onCatchCritter(c);
          }}
          style={{ left: `${c.x}%`, top: `${c.y}%`, zIndex: 740 }}
          className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none studio-float hover:scale-125 transition-transform"
          title={c.kind === 'firefly' ? 'Đom đóm phát sáng — Chạm để bắt!' : 'Bướm xinh — Chạm để bắt!'}
        >
          {c.kind === 'firefly' ? (
            <span
              className="block w-4 h-4 rounded-full border border-white animate-pulse"
              style={{
                backgroundColor: c.color,
                boxShadow: `0 0 12px ${c.color}`
              }}
            />
          ) : (
            <svg viewBox="0 0 28 24" className="w-6 h-5 drop-shadow">
              <ellipse cx="9" cy="10" rx="7" ry="5" fill={c.color} />
              <ellipse cx="19" cy="10" rx="7" ry="5" fill={c.color} />
              <ellipse cx="10" cy="16" rx="5" ry="4" fill="#fde047" />
              <ellipse cx="18" cy="16" rx="5" ry="4" fill="#fde047" />
              <rect x="13" y="6" width="2" height="12" rx="1" fill="#1e293b" />
            </svg>
          )}
        </button>
      ))}

      {/* Rising Balloon Bursts */}
      {balloonBursts.map((b) => (
        <div
          key={b.id}
          style={{ left: `${b.x}%`, top: `${b.y}%`, zIndex: 950 }}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full studio-reveal-pop"
        >
          <svg viewBox="0 0 64 72" className="w-16 h-18 drop-shadow-lg">
            <line x1="32" y1="32" x2="32" y2="68" stroke="#e2e8f0" strokeWidth="1.5" />
            <circle cx="20" cy="22" r="10" fill="#fb7185" />
            <circle cx="44" cy="22" r="10" fill="#38bdf8" />
            <circle cx="32" cy="14" r="11" fill="#facc15" />
            <circle cx="24" cy="30" r="8" fill="#4ade80" />
            <circle cx="40" cy="30" r="8" fill="#c084fc" />
          </svg>
        </div>
      ))}
    </>
  );
};

/* ============================================================================
 * 2. Top-Right 4-Zone World Mini-Map
 * ==========================================================================*/
interface VanMieuMiniMapProps {
  activeZone: VanMieuZoneId;
  selfX: number;
  selfY: number;
  peers: { id: string; x: number; y: number }[];
  foundTreasures: string[];
  onSelectZone: (zone: VanMieuZoneId) => void;
  onOpenTravel: () => void;
}

export const VanMieuMiniMap: React.FC<VanMieuMiniMapProps> = ({
  activeZone,
  selfX,
  selfY,
  peers,
  onSelectZone,
  onOpenTravel
}) => {
  const curMeta = VAN_MIEU_ZONES.find((z) => z.id === activeZone) ?? VAN_MIEU_ZONES[0];

  return (
    <div
      data-interactive="true"
      onClick={(e) => e.stopPropagation()}
      className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-emerald-900/95 border-2 border-amber-300 shadow-xl overflow-hidden select-none shrink-0"
    >
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white text-[9px] font-black px-1.5 py-0.5 flex items-center justify-between">
        <span className="truncate">{curMeta.shortName}</span>
        <Compass className="w-3 h-3 text-amber-300 shrink-0" />
      </div>

      <div className="relative w-full h-[calc(100%-18px)] bg-emerald-700/90">
        {/* Clickable Zone Nodes */}
        {VAN_MIEU_ZONES.map((z) => {
          const isCur = z.id === activeZone;
          return (
            <button
              key={z.id}
              type="button"
              onClick={() => onSelectZone(z.id)}
              style={{ left: `${z.miniCoords.x}%`, top: `${z.miniCoords.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-lg border text-[8px] font-black flex items-center justify-center cursor-pointer transition-transform ${
                isCur
                  ? 'bg-amber-400 text-slate-950 border-white scale-110 shadow'
                  : 'bg-slate-900/70 text-white border-white/50 hover:scale-105'
              }`}
              title={`Chuyển tới ${z.shortName}`}
            >
              {z.shortName.slice(0, 2)}
            </button>
          );
        })}

        {/* Live Peer Dots */}
        {peers.map((p) => (
          <span
            key={p.id}
            style={{ left: `${p.x}%`, top: `${Math.max(15, p.y - 10)}%` }}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white border border-slate-900"
          />
        ))}

        {/* Self Blue Dot */}
        <span
          style={{ left: `${selfX}%`, top: `${Math.max(15, selfY - 10)}%` }}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-sky-400 border-2 border-white shadow"
        />

        {/* + Expand Vietnam Travel Map */}
        <button
          type="button"
          onClick={onOpenTravel}
          className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-blue-600 hover:bg-blue-500 text-white border border-white flex items-center justify-center shadow cursor-pointer"
          title="Bản Đồ Du Hành Việt Nam"
          aria-label="Mở Bản Đồ Du Hành"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

/* ============================================================================
 * 3. Toybox & Trail Modal ("Túi Đồ Chơi" + "Góc Sáng Tạo")
 * ==========================================================================*/
interface ToyboxModalProps {
  activeScale: AvatarScaleMode;
  activeTrail: TrailColorId;
  colorSplashActive: boolean;
  onUseToy: (toyId: ToyId) => void;
  onSelectTrail: (trail: TrailColorId) => void;
  onClose: () => void;
}

export const VanMieuToyboxModal: React.FC<ToyboxModalProps> = ({
  activeScale,
  activeTrail,
  colorSplashActive,
  onUseToy,
  onSelectTrail,
  onClose
}) => {
  return (
    <div
      data-interactive="true"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border-2 border-amber-300 dark:border-slate-700 p-5 shadow-2xl space-y-4 max-h-[88svh] overflow-y-auto"
      >
        <div className="flex items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Túi Đồ Chơi Chợ Cổ Tích
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Dùng miễn phí thoải mái để biến hình và vui đùa cùng cả phòng!
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {TOY_CATALOG.map((toy) => {
            const isActive =
              (toy.id === 'giant_candy' && activeScale === 'giant') ||
              (toy.id === 'tiny_candy' && activeScale === 'tiny') ||
              (toy.id === 'water_balloon' && colorSplashActive);
            return (
              <button
                key={toy.id}
                type="button"
                onClick={() => onUseToy(toy.id)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                  isActive
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 hover:border-sky-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black text-white bg-gradient-to-r ${toy.gradient}`}
                  >
                    {toy.badge}
                  </span>
                  {isActive && (
                    <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                      <Check className="w-3 h-3" /> Đang bật
                    </span>
                  )}
                </div>
                <div>
                  <div className="text-sm font-black text-slate-900 dark:text-white">
                    {toy.name}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                    {toy.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
          <div className="text-xs font-black text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-purple-500" />
            Màu Dấu Chân Bụi Tiên (Góc Sáng Tạo)
          </div>
          <div className="flex flex-wrap gap-2">
            {TRAIL_OPTIONS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => onSelectTrail(t.id)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                  activeTrail === t.id
                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-200'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/15"
                  style={{ background: t.dot }}
                />
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 4. Fun Quests, Event Notice & Gentle Daily Check-In Modal
 * ==========================================================================*/
interface FunQuestsModalProps {
  stats: VanMieuStats;
  worldSave: VanMieuWorldSave;
  checkedInToday: boolean;
  onDailyCheckIn: () => void;
  onClaimGift: () => void;
  onClose: () => void;
}

export const VanMieuFunQuestsModal: React.FC<FunQuestsModalProps> = ({
  stats,
  worldSave,
  checkedInToday,
  onDailyCheckIn,
  onClaimGift,
  onClose
}) => {
  const quests = [
    {
      label: 'Gõ Trống Khai Hội hoặc đấu 1 ván Dân Gian',
      current: Math.min(3, stats.drumsHit + worldSave.oAnQuanWins + worldSave.tugOfWarWins),
      target: 3
    },
    {
      label: 'Thả Đèn Hoa Đăng tại Lễ Hội Hồ Sen',
      current: Math.min(2, stats.lanternsReleased),
      target: 2
    },
    {
      label: 'Chơi cùng thú cưng / câu cá / vượt chướng ngại',
      current: Math.min(3, worldSave.petBallCatches + worldSave.obstacleRuns + Object.keys(worldSave.fishCounts).length),
      target: 3
    },
    {
      label: 'Săn Kho Báu ẩn quanh Thế Giới Văn Miếu',
      current: stats.foundTreasures.length,
      target: TREASURE_NODES.length
    }
  ];

  const completedCount = quests.filter((q) => q.current >= q.target).length;

  return (
    <div
      data-interactive="true"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border-2 border-sky-300 dark:border-slate-700 p-5 shadow-2xl space-y-4 max-h-[90svh] overflow-y-auto"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Gift className="w-5 h-5 text-rose-500" />
              Sự Kiện Lễ Hội &amp; Nhiệm Vụ Vui
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Không áp lực chuỗi ngày — thích lúc nào ghé chơi lúc đó!
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

        {/* Featured Seasonal Event Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow space-y-1">
          <div className="text-xs font-black flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Sự Kiện Nổi Bật: Lễ Hội Hoa Đăng Văn Miếu
          </div>
          <p className="text-[11px] opacity-95">
            Thả đèn hoa đăng tại Hồ Sen, nhảy vũ hội sân khấu &amp; mở rương pháo hoa cuối tuần!
          </p>
        </div>

        {/* Gentle Daily Check-In (No Streak Pressure!) */}
        <div className="p-3 rounded-2xl border border-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/30 flex items-center justify-between gap-2">
          <div>
            <div className="text-xs font-black text-emerald-900 dark:text-emerald-200">
              Điểm Danh Nhẹ Nhàng (+2 Sao trang trí)
            </div>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-300">
              Đã ghé thăm tổng cộng {worldSave.totalCheckInDays} ngày (không mất chuỗi khi nghỉ)
            </div>
          </div>
          <button
            type="button"
            disabled={checkedInToday}
            onClick={onDailyCheckIn}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white text-xs font-black cursor-pointer shrink-0"
          >
            {checkedInToday ? 'Đã Nhận' : 'Nhận Quà'}
          </button>
        </div>

        <div className="space-y-2">
          {quests.map((q) => {
            const done = q.current >= q.target;
            return (
              <div
                key={q.label}
                className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${
                  done
                    ? 'border-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/30'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                  {q.label}
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-lg text-[11px] font-black tabular-nums shrink-0 ${
                    done
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {q.current}/{q.target}
                </span>
              </div>
            );
          })}
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/35 border border-amber-200 dark:border-amber-800 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-black text-amber-950 dark:text-amber-200">
              Rương Quà Lễ Hội ({completedCount}/4 xong)
            </div>
            <div className="text-[11px] text-amber-800 dark:text-amber-300">
              Hoàn thành ít nhất 2 hoạt động để mở pháo hoa &amp; hóa khổng lồ!
            </div>
          </div>
          <button
            type="button"
            disabled={completedCount < 2 || stats.giftClaimed}
            onClick={onClaimGift}
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 text-slate-950 text-xs font-black cursor-pointer shrink-0"
          >
            {stats.giftClaimed ? 'Đã Mở Quà' : 'Mở Rương'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 5. Playable Non-Academic Mini-Game: "Lật Hình Cổ Tích"
 * ==========================================================================*/
interface MemoryCard {
  uid: number;
  pairId: string;
  label: string;
  bg: string;
  icon: React.ReactNode;
}

const MEMORY_SYMBOLS: Omit<MemoryCard, 'uid'>[] = [
  {
    pairId: 'turtle',
    label: 'Cụ Rùa Vàng',
    bg: 'bg-amber-100',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <ellipse cx="20" cy="23" rx="13" ry="9" fill="#d97706" />
        <circle cx="34" cy="22" r="4" fill="#fbbf24" />
        <ellipse cx="20" cy="21" rx="9" ry="5" fill="#f59e0b" />
      </svg>
    )
  },
  {
    pairId: 'lantern',
    label: 'Đèn Lồng Đỏ',
    bg: 'bg-rose-100',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <ellipse cx="20" cy="20" rx="11" ry="12" fill="#ef4444" />
        <rect x="15" y="6" width="10" height="4" rx="2" fill="#facc15" />
        <rect x="15" y="30" width="10" height="4" rx="2" fill="#facc15" />
      </svg>
    )
  },
  {
    pairId: 'lotus',
    label: 'Hoa Sen Hồng',
    bg: 'bg-pink-100',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <ellipse cx="20" cy="28" rx="14" ry="5" fill="#22c55e" />
        <ellipse cx="20" cy="18" rx="6" ry="10" fill="#f472b6" />
        <ellipse cx="13" cy="21" rx="5" ry="8" fill="#fbcfe8" />
        <ellipse cx="27" cy="21" rx="5" ry="8" fill="#fbcfe8" />
      </svg>
    )
  },
  {
    pairId: 'drum',
    label: 'Trống Khai Hội',
    bg: 'bg-orange-100',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <ellipse cx="20" cy="20" rx="13" ry="11" fill="#dc2626" />
        <ellipse cx="20" cy="20" rx="8" ry="7" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      </svg>
    )
  },
  {
    pairId: 'cat',
    label: 'Mèo May Mắn',
    bg: 'bg-sky-100',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <polygon points="10,16 13,6 19,12" fill="#38bdf8" />
        <polygon points="30,16 27,6 21,12" fill="#38bdf8" />
        <circle cx="20" cy="22" r="11" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
        <circle cx="16" cy="21" r="2" fill="#0f172a" />
        <circle cx="24" cy="21" r="2" fill="#0f172a" />
      </svg>
    )
  },
  {
    pairId: 'star',
    label: 'Khuê Văn Tinh',
    bg: 'bg-violet-100',
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8">
        <polygon points="20,5 24,15 35,16 27,23 29,34 20,28 11,34 13,23 5,16 16,15" fill="#facc15" />
      </svg>
    )
  }
];

const buildShuffledDeck = (): MemoryCard[] => {
  const deck = [...MEMORY_SYMBOLS, ...MEMORY_SYMBOLS].map((item, idx) => ({
    ...item,
    uid: idx
  }));
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

export const FairyMemoryGameModal: React.FC<{
  bestSeconds: number | null;
  onWin: (elapsedSeconds: number) => void;
  onClose: () => void;
}> = ({ bestSeconds, onWin, onClose }) => {
  const [cards, setCards] = useState<MemoryCard[]>(() => buildShuffledDeck());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (won) return;
    const t = window.setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => window.clearInterval(t);
  }, [won]);

  const handleFlip = (uid: number) => {
    if (won || flipped.length >= 2 || flipped.includes(uid)) return;
    const target = cards.find((c) => c.uid === uid);
    if (!target || matched.includes(target.pairId)) return;

    soundManager.play('click');
    const nextFlipped = [...flipped, uid];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      const first = cards.find((c) => c.uid === nextFlipped[0]);
      const second = cards.find((c) => c.uid === nextFlipped[1]);
      if (first && second && first.pairId === second.pairId) {
        soundManager.play('coin');
        const nextMatched = [...matched, first.pairId];
        setMatched(nextMatched);
        setFlipped([]);
        if (nextMatched.length === MEMORY_SYMBOLS.length) {
          setWon(true);
          soundManager.play('fanfare');
          confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
          onWin(elapsed);
        }
      } else {
        window.setTimeout(() => setFlipped([]), 550);
      }
    }
  };

  const handleReset = () => {
    soundManager.play('click');
    setCards(buildShuffledDeck());
    setFlipped([]);
    setMatched([]);
    setElapsed(0);
    setWon(false);
  };

  return (
    <div
      data-interactive="true"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/65 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border-2 border-blue-400 dark:border-slate-700 p-5 shadow-2xl space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Lật Hình Cổ Tích Văn Miếu
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ghép đủ 6 cặp hình giống nhau nhanh nhất có thể!
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

        <div className="flex items-center justify-between text-xs font-bold px-1">
          <span className="text-blue-600 dark:text-blue-400 tabular-nums">
            Thời gian: {elapsed}s
          </span>
          <span className="text-emerald-600 dark:text-emerald-400 tabular-nums">
            Đã ghép: {matched.length}/{MEMORY_SYMBOLS.length} cặp
          </span>
          {bestSeconds !== null && (
            <span className="text-amber-600 dark:text-amber-400 tabular-nums">
              Kỷ lục: {bestSeconds}s
            </span>
          )}
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {cards.map((card) => {
            const isOpen = flipped.includes(card.uid) || matched.includes(card.pairId);
            return (
              <button
                key={card.uid}
                type="button"
                onClick={() => handleFlip(card.uid)}
                className={`h-16 sm:h-18 rounded-2xl border-2 flex items-center justify-center transition-all cursor-pointer ${
                  isOpen
                    ? `${card.bg} border-amber-400 scale-[1.02]`
                    : 'bg-gradient-to-br from-sky-500 to-blue-700 border-sky-300 hover:brightness-110 active:scale-95'
                }`}
                aria-label={isOpen ? card.label : 'Thẻ úp'}
              >
                {isOpen ? (
                  card.icon
                ) : (
                  <Sparkles className="w-5 h-5 text-amber-200" />
                )}
              </button>
            );
          })}
        </div>

        {won ? (
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 flex items-center justify-between gap-2">
            <div className="text-xs font-black text-emerald-800 dark:text-emerald-200">
              Hoan hô! Hoàn thành trong {elapsed} giây!
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Chơi lại
            </button>
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Xếp bài lại
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ============================================================================
 * 6. Fun Records, Collections & Achievements Modal ("Kỷ lục & Thành tựu")
 * ==========================================================================*/
export const VanMieuFunRankModal: React.FC<{
  alias: string;
  stats: VanMieuStats;
  worldSave: VanMieuWorldSave;
  onClose: () => void;
}> = ({ alias, stats, worldSave, onClose }) => {
  const uniqueFish = Object.keys(worldSave.fishCounts).length;

  return (
    <div
      data-interactive="true"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border-2 border-amber-400 dark:border-slate-700 p-5 shadow-2xl space-y-4 max-h-[88svh] overflow-y-auto"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Thành Tựu &amp; Bộ Sưu Tập — {alias}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/35 border border-amber-200">
            <div className="text-[11px] font-bold text-amber-800 dark:text-amber-300">Thắng Dân Gian</div>
            <div className="text-lg font-black text-amber-950 dark:text-white tabular-nums">
              {worldSave.oAnQuanWins + worldSave.tugOfWarWins}
            </div>
          </div>
          <div className="p-2.5 rounded-2xl bg-sky-50 dark:bg-sky-950/35 border border-sky-200">
            <div className="text-[11px] font-bold text-sky-800 dark:text-sky-300">Kỷ lục Vượt Ải</div>
            <div className="text-lg font-black text-sky-950 dark:text-white tabular-nums">
              {worldSave.obstacleBestSec !== null ? `${worldSave.obstacleBestSec}s` : '—'}
            </div>
          </div>
          <div className="p-2.5 rounded-2xl bg-cyan-50 dark:bg-cyan-950/35 border border-cyan-200">
            <div className="text-[11px] font-bold text-cyan-800 dark:text-cyan-300">Cá Suối Ngọc</div>
            <div className="text-lg font-black text-cyan-950 dark:text-white tabular-nums">
              {uniqueFish}/{FISH_SPECIES.length}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-black text-slate-700 dark:text-slate-200">
            Huy Hiệu Thành Tựu Mở Khóa:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {VAN_MIEU_ACHIEVEMENTS.map((ach) => {
              const unlocked = ach.check(worldSave);
              return (
                <div
                  key={ach.id}
                  className={`p-3 rounded-2xl border flex items-start gap-2.5 ${
                    unlocked
                      ? 'border-amber-300 bg-amber-50/70 dark:bg-amber-950/30'
                      : 'border-slate-200 dark:border-slate-800 opacity-60'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl bg-gradient-to-br ${ach.color} text-white flex items-center justify-center shrink-0`}
                  >
                    {unlocked ? <Check className="w-4 h-4" /> : <Users className="w-3.5 h-3.5" />}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-black text-slate-900 dark:text-white">
                      {ach.title}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      {ach.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          <span>Trống hội: {stats.drumsHit} · Hoa đăng: {stats.lanternsReleased} · Kho báu: {stats.foundTreasures.length}/5</span>
        </div>
      </div>
    </div>
  );
};
