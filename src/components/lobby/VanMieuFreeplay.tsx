import React, { useEffect, useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../utils/audio';
import {
  Gift,
  Sparkles,
  Trophy,
  X,
  Plus,
  Flame,
  Palette,
  RotateCcw,
  Check
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
  { id: 'tr_fan', name: 'Quạt Giấy Lễ Hội', x: 10, y: 54, color: '#f43f5e' },
  { id: 'tr_candy', name: 'Kẹo Hồ Lô Ngọt', x: 91, y: 54, color: '#fb923c' },
  { id: 'tr_chime', name: 'Chuông Gió Ngọc', x: 43, y: 58, color: '#38bdf8' },
  { id: 'tr_brush', name: 'Cọ Vẽ Cầu Vồng', x: 76, y: 69, color: '#a855f7' },
  { id: 'tr_lantern', name: 'Đèn Lồng Tí Hon', x: 26, y: 84, color: '#facc15' }
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
 * 1. Interactive Freeplay Props placed directly inside the 2.5D Van Mieu world
 * ==========================================================================*/
interface VanMieuInteractiveLayerProps {
  lighting: LightingMode;
  drumCombo: number;
  drumShaking: boolean;
  drumRipples: DrumRipple[];
  lanterns: FloatingLantern[];
  balloonBursts: BalloonBurst[];
  critters: AmbientCritter[];
  foundTreasures: string[];
  catWaving: boolean;
  onPortalClick: () => void;
  onDrumHit: () => void;
  onHopscotchClick: () => void;
  onPondClick: (pondX: number, pondY: number) => void;
  onCreativeCornerClick: () => void;
  onFairyLibraryClick: () => void;
  onMarketClick: () => void;
  onCatchCritter: (critter: AmbientCritter) => void;
  onCollectTreasure: (tr: TreasureItem) => void;
}

export const VanMieuInteractiveLayer: React.FC<VanMieuInteractiveLayerProps> = ({
  lighting,
  drumCombo,
  drumShaking,
  drumRipples,
  lanterns,
  balloonBursts,
  critters,
  foundTreasures,
  catWaving,
  onPortalClick,
  onDrumHit,
  onHopscotchClick,
  onPondClick,
  onCreativeCornerClick,
  onFairyLibraryClick,
  onMarketClick,
  onCatchCritter,
  onCollectTreasure
}) => {
  const isNight = lighting === 'night';

  return (
    <>
      {/* 1. Khuê Văn Các Glowing Teleport Portal (Top Center) */}
      <button
        type="button"
        data-interactive="true"
        onClick={(e) => {
          e.stopPropagation();
          onPortalClick();
        }}
        style={{ left: '50%', top: '44%', zIndex: 420 }}
        className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
        title="Cổng Dịch Chuyển Khuê Văn Các — Mở Bản Đồ Du Hành"
      >
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
          <span className="absolute inset-0 rounded-full border-2 border-cyan-300/80 animate-ping opacity-55" />
          <svg viewBox="0 0 64 64" className="w-12 h-12 sm:w-14 sm:h-14 animate-spin" style={{ animationDuration: '9s' }}>
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
        <span className="mt-0.5 block px-2 py-0.5 rounded-full bg-sky-600/90 text-white text-[10px] font-black shadow-md whitespace-nowrap opacity-90 group-hover:scale-105 transition-transform">
          Cổng Du Hành
        </span>
      </button>

      {/* 2. Trò Chơi Dân Gian Pavilion: Ceremonial Drum + Lanterns + Hopscotch (Top-Left) */}
      <div
        style={{ left: '15%', top: '53%', zIndex: 480 }}
        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
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
          title="Bấm để gõ Trống Khai Hội! (Combo 5 tiếng bùng nổ pháo hoa)"
        >
          {/* Wooden Festival Awning & Sign */}
          <div className="px-3 py-1 rounded-xl bg-gradient-to-b from-amber-500 to-orange-600 border-2 border-amber-200 text-white text-[11px] font-black shadow-md whitespace-nowrap mb-1">
            Trò chơi dân gian
          </div>
          {/* Hanging Red Lanterns + Giant Red Drum */}
          <div className="relative px-3 py-1.5 rounded-2xl bg-amber-900/85 border-2 border-amber-400/70 shadow-lg flex items-center gap-2">
            <span className={`w-2.5 h-3.5 rounded-full bg-red-500 border border-amber-300 ${isNight ? 'shadow-[0_0_12px_#f59e0b]' : ''}`} />
            <svg viewBox="0 0 64 56" className="w-12 h-11 sm:w-14 sm:h-12 drop-shadow">
              <path d="M16 48 L24 34 L40 34 L48 48" stroke="#78350f" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              <ellipse cx="32" cy="24" rx="22" ry="16" fill="#dc2626" />
              <ellipse cx="32" cy="24" rx="14" ry="11" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5" />
              <circle cx="32" cy="24" r="4" fill="#ef4444" />
            </svg>
            <span className={`w-2.5 h-3.5 rounded-full bg-red-500 border border-amber-300 ${isNight ? 'shadow-[0_0_12px_#f59e0b]' : ''}`} />
          </div>
          <span className="mt-1 px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-black shadow whitespace-nowrap">
            🥁 Gõ Trống ({drumCombo}/5)
          </span>
        </button>

        {/* Hopscotch Chalk Tiles (Nhảy Lò Cò) */}
        <button
          type="button"
          data-interactive="true"
          onClick={(e) => {
            e.stopPropagation();
            onHopscotchClick();
          }}
          className="mt-1.5 px-2.5 py-1 rounded-xl bg-white/85 hover:bg-white border-2 border-sky-400 text-[10px] font-black text-sky-700 shadow-sm cursor-pointer active:scale-95 transition-transform"
          title="Nhảy Ô Lò Cò vui nhộn"
        >
          🟦🟨 Nhảy Lò Cò
        </button>
      </div>

      {/* Drum Soundwave Ripples */}
      {drumRipples.map((r) => (
        <div
          key={r.id}
          style={{ left: '15%', top: '54%', zIndex: 470 }}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-4 border-amber-300 animate-ping"
        />
      ))}

      {/* 3. Twin Lotus Pond Clickable Zones (Thả Đèn Hoa Đăng) */}
      <button
        type="button"
        data-interactive="true"
        onClick={(e) => {
          e.stopPropagation();
          onPondClick(33, 59);
        }}
        style={{ left: '34%', top: '57%', zIndex: 430 }}
        className="absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full bg-teal-600/85 hover:bg-teal-500 text-white text-[10px] font-black border border-teal-200/80 shadow-md cursor-pointer transition-transform hover:scale-105 whitespace-nowrap"
        title="Bấm để thả Đèn Hoa Đăng xuống Hồ Sen trái"
      >
        🪷 Thả Hoa Đăng
      </button>

      <button
        type="button"
        data-interactive="true"
        onClick={(e) => {
          e.stopPropagation();
          onPondClick(66, 59);
        }}
        style={{ left: '66%', top: '57%', zIndex: 430 }}
        className="absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full bg-teal-600/85 hover:bg-teal-500 text-white text-[10px] font-black border border-teal-200/80 shadow-md cursor-pointer transition-transform hover:scale-105 whitespace-nowrap"
        title="Bấm để thả Đèn Hoa Đăng xuống Hồ Sen phải"
      >
        🏮 Thả Đèn Sen
      </button>

      {/* Drifting Floating Lanterns on the Lotus Ponds */}
      {lanterns.map((ln) => (
        <div
          key={ln.id}
          style={{ left: `${ln.x}%`, top: `${ln.y}%`, zIndex: 455 }}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center studio-float"
        >
          <svg viewBox="0 0 36 32" className="w-7 h-7 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]">
            <ellipse cx="18" cy="24" rx="13" ry="5" fill="#fb7185" />
            <polygon points="8,22 18,12 28,22" fill={ln.color} />
            <circle cx="18" cy="18" r="4" fill="#fef08a" />
          </svg>
        </div>
      ))}

      {/* 4. Góc Sáng Tạo & Mèo May Mắn (Top-Right) */}
      <button
        type="button"
        data-interactive="true"
        onClick={(e) => {
          e.stopPropagation();
          onCreativeCornerClick();
        }}
        style={{ left: '85%', top: '54%', zIndex: 480 }}
        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer focus:outline-none"
        title="Góc Sáng Tạo — Chọn màu Dấu Chân Cầu Vồng & Vuốt ve Mèo May Mắn"
      >
        <div className="px-3 py-1 rounded-xl bg-gradient-to-b from-amber-400 to-orange-500 border-2 border-white text-slate-950 text-[11px] font-black shadow-md whitespace-nowrap mb-1">
          🎨 Góc sáng tạo
        </div>
        <div className="px-3 py-1.5 rounded-2xl bg-amber-100/95 border-2 border-amber-500 shadow-lg flex items-center gap-2 group-hover:scale-105 transition-transform">
          {/* Paint Easel */}
          <svg viewBox="0 0 40 44" className="w-8 h-9">
            <line x1="20" y1="4" x2="10" y2="40" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
            <line x1="20" y1="4" x2="30" y2="40" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
            <rect x="9" y="10" width="22" height="18" rx="3" fill="#ffffff" stroke="#b45309" strokeWidth="2" />
            <path d="M11 24 L17 17 L22 22 L28 15 L29 24 Z" fill="#38bdf8" />
          </svg>
          {/* Lucky Waving Cat */}
          <svg
            viewBox="0 0 44 44"
            className={`w-9 h-9 transition-transform ${catWaving ? 'scale-115 -rotate-6' : ''}`}
          >
            <polygon points="10,16 13,5 20,12" fill="#f8fafc" stroke="#f59e0b" strokeWidth="2" />
            <polygon points="34,16 31,5 24,12" fill="#f8fafc" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="22" cy="24" r="14" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="17" cy="22" r="2.2" fill="#1e293b" />
            <circle cx="27" cy="22" r="2.2" fill="#1e293b" />
            <circle cx="22" cy="33" r="4" fill="#facc15" />
          </svg>
        </div>
        <span className="mt-1 px-2 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-black shadow whitespace-nowrap">
          ✨ Màu Dấu Chân
        </span>
      </button>

      {/* 5. Góc Cổ Tích / Thư Viện Nhỏ (Bottom-Left Pavilion — Playable Memory Match!) */}
      <button
        type="button"
        data-interactive="true"
        onClick={(e) => {
          e.stopPropagation();
          onFairyLibraryClick();
        }}
        style={{ left: '15%', top: '76%', zIndex: 620 }}
        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer focus:outline-none"
        title="Thư Viện Nhỏ — Chơi Mini-Game Lật Hình Cổ Tích 20 giây!"
      >
        <div className="px-3 py-1 rounded-xl bg-gradient-to-b from-sky-500 to-blue-700 border-2 border-sky-200 text-white text-[11px] font-black shadow-md whitespace-nowrap mb-1">
          📖 Thư viện nhỏ
        </div>
        <div className="px-3.5 py-2 rounded-2xl bg-sky-50/95 border-2 border-blue-500 shadow-lg flex items-center gap-2 group-hover:scale-105 transition-transform">
          <svg viewBox="0 0 48 44" className="w-10 h-9">
            <polygon points="2,16 24,4 46,16" fill="#2563eb" />
            <rect x="6" y="16" width="36" height="24" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            <rect x="10" y="20" width="8" height="14" rx="1.5" fill="#f43f5e" />
            <rect x="20" y="20" width="8" height="14" rx="1.5" fill="#10b981" />
            <rect x="30" y="20" width="8" height="14" rx="1.5" fill="#3b82f6" />
          </svg>
        </div>
        <span className="mt-1 px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-black shadow whitespace-nowrap">
          🃏 Lật Hình Cổ Tích
        </span>
      </button>

      {/* 6. Chợ Cổ Tích (Bottom-Right Pavilion — Freeplay Toy Stall!) */}
      <button
        type="button"
        data-interactive="true"
        onClick={(e) => {
          e.stopPropagation();
          onMarketClick();
        }}
        style={{ left: '85%', top: '76%', zIndex: 620 }}
        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer focus:outline-none"
        title="Chợ Cổ Tích — Lấy Đồ Chơi Biến Hình & Bóng Bay miễn phí!"
      >
        <div className="px-3 py-1 rounded-xl bg-gradient-to-b from-rose-500 to-red-600 border-2 border-amber-200 text-white text-[11px] font-black shadow-md whitespace-nowrap mb-1">
          🎪 Chợ cổ tích
        </div>
        <div className="px-3.5 py-2 rounded-2xl bg-rose-50/95 border-2 border-rose-400 shadow-lg flex items-center gap-2 group-hover:scale-105 transition-transform">
          <svg viewBox="0 0 56 46" className="w-12 h-9">
            <rect x="6" y="16" width="32" height="24" rx="4" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
            <path d="M4 16 L40 16 L36 6 L8 6 Z" fill="#ef4444" />
            <rect x="14" y="6" width="6" height="10" fill="#ffffff" />
            <rect x="26" y="6" width="6" height="10" fill="#ffffff" />
            <circle cx="46" cy="14" r="6" fill="#facc15" />
            <circle cx="51" cy="20" r="5" fill="#38bdf8" />
            <circle cx="43" cy="22" r="5" fill="#f472b6" />
          </svg>
        </div>
        <span className="mt-1 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black shadow whitespace-nowrap">
          🎈 Túi Đồ Chơi
        </span>
      </button>

      {/* 7. Hidden Daily Treasures (5 Scavenger Hunt Collectibles) */}
      {TREASURE_NODES.map((tr) => {
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

      {/* 8. Ambient Clickable Butterflies (Day/Sunset) or Glowing Fireflies (Night) */}
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

      {/* 9. Rising Balloon Bursts */}
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
 * 2. Top-Right Overhead Live Mini-Map ("Văn Miếu 📍") matching mockup
 * ==========================================================================*/
interface VanMieuMiniMapProps {
  selfX: number;
  selfY: number;
  peers: { id: string; x: number; y: number }[];
  foundTreasures: string[];
  onOpenTravel: () => void;
}

export const VanMieuMiniMap: React.FC<VanMieuMiniMapProps> = ({
  selfX,
  selfY,
  peers,
  foundTreasures,
  onOpenTravel
}) => {
  return (
    <div
      data-interactive="true"
      onClick={(e) => e.stopPropagation()}
      className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-emerald-900/90 border-2 border-amber-300 shadow-xl overflow-hidden select-none shrink-0"
    >
      {/* Header label */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white text-[9px] sm:text-[10px] font-black px-1.5 py-0.5 flex items-center justify-between">
        <span className="truncate">Văn Miếu</span>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
      </div>

      {/* Overhead schematic */}
      <div className="relative w-full h-[calc(100%-16px)] bg-emerald-600/90">
        {/* Central Path */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-3.5 bg-amber-200/90" />
        {/* Khuê Văn Các Roof */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1 w-6 h-3 rounded-xs bg-red-600 border border-amber-300" />
        {/* Twin Lotus Ponds */}
        <div className="absolute left-[22%] top-[24%] w-3.5 h-3.5 rounded-xs bg-cyan-400 border border-white/70" />
        <div className="absolute right-[22%] top-[24%] w-3.5 h-3.5 rounded-xs bg-cyan-400 border border-white/70" />

        {/* Unclaimed Treasure Blinking Dots */}
        {TREASURE_NODES.filter((t) => !foundTreasures.includes(t.id)).map((t) => (
          <span
            key={t.id}
            style={{ left: `${t.x}%`, top: `${Math.max(18, t.y - 18)}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-yellow-300 animate-pulse"
          />
        ))}

        {/* Peer Dots */}
        {peers.map((p) => (
          <span
            key={p.id}
            style={{ left: `${p.x}%`, top: `${Math.max(15, p.y - 10)}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white border border-slate-900"
          />
        ))}

        {/* Self Pulsing Blue Dot */}
        <span
          style={{ left: `${selfX}%`, top: `${Math.max(15, selfY - 10)}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-sky-400 border-2 border-white shadow"
        />

        {/* + Expand / Travel Map Button */}
        <button
          type="button"
          onClick={onOpenTravel}
          className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-blue-600 hover:bg-blue-500 text-white border border-white flex items-center justify-center shadow cursor-pointer"
          title="Mở Bản Đồ Du Hành"
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
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black text-white bg-gradient-to-r ${toy.gradient}`}
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
 * 4. Fun Quests & 5-Treasure Scavenger Hunt Modal ("Nhiệm vụ vui" & "Quà tặng")
 * ==========================================================================*/
interface FunQuestsModalProps {
  stats: VanMieuStats;
  onClaimGift: () => void;
  onClose: () => void;
}

export const VanMieuFunQuestsModal: React.FC<FunQuestsModalProps> = ({
  stats,
  onClaimGift,
  onClose
}) => {
  const quests = [
    {
      label: 'Gõ Trống Khai Hội cùng bạn bè',
      current: Math.min(3, stats.drumsHit),
      target: 3
    },
    {
      label: 'Thả Đèn Hoa Đăng xuống Hồ Sen',
      current: Math.min(2, stats.lanternsReleased),
      target: 2
    },
    {
      label: 'Bắt Bướm xinh hoặc Đom Đóm phát sáng',
      current: Math.min(3, stats.crittersCaught),
      target: 3
    },
    {
      label: 'Nhặt Kho Báu ẩn quanh sân Văn Miếu',
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
        className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border-2 border-sky-300 dark:border-slate-700 p-5 shadow-2xl space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Gift className="w-5 h-5 text-rose-500" />
              Nhiệm Vụ Vui & Kho Báu Hôm Nay
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Chơi tự do không áp lực — hoàn thành để bắn pháo hoa ăn mừng!
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

        <div className="space-y-2.5">
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
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-black tabular-nums shrink-0 ${
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
              Hoàn thành ít nhất 2 nhiệm vụ vui để mở pháo hoa & hóa khổng lồ!
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
 * 5. Playable Non-Academic Mini-Game: "Lật Hình Cổ Tích" (Fairy Memory Match)
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
              🃏 Lật Hình Cổ Tích Văn Miếu
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ghép đủ 6 cặp hình giống nhau nhanh nhất có thể! (Không phải bài tập đâu nha)
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
            ⏱ Thời gian: {elapsed}s
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
              className="text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Xếp lại thẻ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ============================================================================
 * 6. Fun Courtyard Scoreboard Modal ("Bảng xếp hạng vui" inside Văn Miếu)
 * ==========================================================================*/
export const VanMieuFunRankModal: React.FC<{
  alias: string;
  stats: VanMieuStats;
  onClose: () => void;
}> = ({ alias, stats, onClose }) => {
  const rows = useMemo(
    () => [
      { label: 'Tiếng Trống Khai Hội đã gõ', value: `${stats.drumsHit} lần`, accent: 'text-rose-600' },
      { label: 'Đèn Hoa Đăng đã thả Hồ Sen', value: `${stats.lanternsReleased} đèn`, accent: 'text-amber-600' },
      { label: 'Bướm & Đom Đóm bắt được', value: `${stats.crittersCaught} chú`, accent: 'text-emerald-600' },
      { label: 'Đồ Chơi Chợ Cổ Tích đã dùng', value: `${stats.toysUsed} lượt`, accent: 'text-sky-600' },
      {
        label: 'Kỷ lục Lật Hình Cổ Tích',
        value: stats.bestMemorySeconds !== null ? `${stats.bestMemorySeconds} giây` : 'Chưa thử',
        accent: 'text-violet-600'
      }
    ],
    [stats]
  );

  return (
    <div
      data-interactive="true"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border-2 border-amber-400 dark:border-slate-700 p-5 shadow-2xl space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              Thành Tích Vui Chơi Của {alias}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tổng hợp kỷ lục dạo chơi tự do tại Quảng Trường Văn Miếu
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

        <div className="space-y-2">
          {rows.map((r) => (
            <div
              key={r.label}
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2"
            >
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{r.label}</span>
              <span className={`text-sm font-black tabular-nums ${r.accent}`}>{r.value}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/35 p-3 rounded-2xl border border-amber-200 dark:border-amber-800">
          <Flame className="w-4 h-4 shrink-0" />
          <span>Mỗi ngày tìm đủ 5 Kho Báu ẩn & gõ 5 nhịp Trống Hội cùng bạn bè để bắn pháo hoa toàn sân!</span>
        </div>
      </div>
    </div>
  );
};
