import React from 'react';
import { PersonalRoomDecor } from '../types';
import { DEFAULT_ROOM_DECOR } from '../data/items';

interface StudioStageBackdropProps {
  backdropId?: string;
  roomDecor?: PersonalRoomDecor;
}

const ROOM_WALL_COLORS = {
  warm: { wallTop: '#FFFBEB', wallBot: '#FEF3C7', floorTop: '#FDE68A', floorBot: '#D97706', trim: '#B45309' },
  sky: { wallTop: '#F0F9FF', wallBot: '#E0F2FE', floorTop: '#CBD5E1', floorBot: '#94A3B8', trim: '#0284C7' },
  forest: { wallTop: '#F0FDF4', wallBot: '#DCFCE7', floorTop: '#FDE68A', floorBot: '#B45309', trim: '#15803D' },
  galaxy: { wallTop: '#1E1B4B', wallBot: '#312E81', floorTop: '#334155', floorBot: '#0F172A', trim: '#38BDF8' }
} as const;

export const StudioStageBackdrop: React.FC<StudioStageBackdropProps> = ({
  backdropId = 'bg_classroom',
  roomDecor = DEFAULT_ROOM_DECOR
}) => {
  if (backdropId === 'bg_my_room') {
    const palette = ROOM_WALL_COLORS[roomDecor.wallTheme] ?? ROOM_WALL_COLORS.warm;
    const isDarkRoom = roomDecor.wallTheme === 'galaxy';

    return (
      <svg
        viewBox="0 0 600 420"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="myRoomWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={palette.wallTop} />
            <stop offset="100%" stopColor={palette.wallBot} />
          </linearGradient>
          <linearGradient id="myRoomFloor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={palette.floorTop} />
            <stop offset="100%" stopColor={palette.floorBot} />
          </linearGradient>
        </defs>
        <rect width="600" height="420" fill="url(#myRoomWall)" />
        {/* Window in center */}
        <rect x="235" y="42" width="130" height="96" rx="10" fill={isDarkRoom ? '#0F172A' : '#BAE6FD'} stroke={palette.trim} strokeWidth="5" />
        <line x1="300" y1="42" x2="300" y2="138" stroke="#FFFFFF" strokeWidth="3" />
        <line x1="235" y1="90" x2="365" y2="90" stroke="#FFFFFF" strokeWidth="3" />
        {isDarkRoom ? (
          <>
            <circle cx="262" cy="64" r="3" fill="#FEF08A" />
            <circle cx="332" cy="70" r="8" fill="#FDE047" />
          </>
        ) : (
          <circle cx="334" cy="68" r="11" fill="#FDE047" />
        )}

        {/* Superhero poster (left wall) */}
        {roomDecor.showPoster && (
          <g>
            <rect x="52" y="54" width="76" height="98" rx="8" fill="#1E3A8A" stroke="#FACC15" strokeWidth="3" />
            <circle cx="90" cy="96" r="20" fill="#DC2626" />
            <polygon points="90,82 94,91 104,91 96,97 99,106 90,100 81,106 84,97 76,91 86,91" fill="#FDE047" />
            <text x="90" y="138" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">HERO HSV</text>
          </g>
        )}

        {/* Trophy & Achievement rack above window/right */}
        {roomDecor.showTrophyRack && (
          <g>
            <rect x="405" y="64" width="142" height="10" rx="3" fill="#92400E" />
            <path d="M424 38 L442 38 L439 54 Q433 58 427 54 Z" fill="#FACC15" stroke="#B45309" strokeWidth="1.5" />
            <rect x="431" y="55" width="4" height="9" fill="#B45309" />
            <polygon points="480,38 484,48 494,48 486,54 489,64 480,58 471,64 474,54 466,48 476,48" fill="#38BDF8" />
            <circle cx="526" cy="52" r="11" fill="#EF4444" stroke="#FACC15" strokeWidth="2" />
            <text x="526" y="56" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">A+</text>
          </g>
        )}

        {/* Cozy Bed (left) */}
        {roomDecor.showBed && (
          <g>
            <rect x="26" y="218" width="16" height="96" rx="4" fill="#92400E" />
            <rect x="38" y="252" width="152" height="58" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
            <rect x="46" y="238" width="44" height="20" rx="8" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="2" />
            <rect x="92" y="254" width="98" height="46" rx="6" fill="#3B82F6" />
            <rect x="180" y="246" width="12" height="64" rx="4" fill="#92400E" />
          </g>
        )}

        {/* Bookshelf (back right) */}
        {roomDecor.showBookshelf && (
          <g>
            <rect x="405" y="102" width="96" height="122" rx="6" fill="#B45309" stroke="#78350F" strokeWidth="3" />
            <rect x="413" y="112" width="80" height="30" fill="#FEF3C7" />
            <rect x="413" y="150" width="80" height="30" fill="#FEF3C7" />
            <rect x="413" y="188" width="80" height="28" fill="#FEF3C7" />
            <rect x="418" y="117" width="10" height="24" fill="#EF4444" />
            <rect x="430" y="120" width="10" height="21" fill="#2563EB" />
            <rect x="442" y="115" width="10" height="26" fill="#10B981" />
            <rect x="458" y="154" width="12" height="25" fill="#8B5CF6" />
            <rect x="472" y="157" width="11" height="22" fill="#F59E0B" />
          </g>
        )}

        {/* Study Desk & Computer (right) */}
        {roomDecor.showDeskPc && (
          <g>
            <rect x="408" y="248" width="164" height="14" rx="4" fill="#D97706" stroke="#92400E" strokeWidth="2" />
            <rect x="418" y="262" width="14" height="54" fill="#92400E" />
            <rect x="546" y="262" width="14" height="54" fill="#92400E" />
            {/* Monitor */}
            <rect x="462" y="192" width="76" height="46" rx="5" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
            <rect x="467" y="197" width="66" height="34" rx="2" fill="#0EA5E9" opacity="0.85" />
            <rect x="494" y="238" width="12" height="10" fill="#475569" />
            {/* Desk Lamp */}
            <path d="M430 248 L430 220 L446 212" fill="none" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
            <polygon points="440,214 456,208 452,222" fill="#FACC15" />
          </g>
        )}

        {/* Potted Plant */}
        {roomDecor.showPlant && (
          <g>
            <polygon points="525,280 562,280 556,315 531,315" fill="#EA580C" stroke="#9A3412" strokeWidth="2" />
            <ellipse cx="543" cy="264" rx="12" ry="18" fill="#16A34A" />
            <ellipse cx="530" cy="272" rx="10" ry="13" fill="#22C55E" transform="rotate(-22 530 272)" />
            <ellipse cx="556" cy="272" rx="10" ry="13" fill="#22C55E" transform="rotate(22 556 272)" />
          </g>
        )}

        {/* Room Floor & Rug */}
        <rect x="0" y="312" width="600" height="108" fill="url(#myRoomFloor)" />
        <ellipse cx="300" cy="360" rx="165" ry="26" fill={isDarkRoom ? '#4F46E5' : '#FFFFFF'} opacity="0.4" stroke={palette.trim} strokeWidth="2" />
      </svg>
    );
  }

  if (backdropId === 'bg_castle') {
    return (
      <svg
        viewBox="0 0 600 420"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="castleSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="55%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#FEF3C7" />
          </linearGradient>
          <linearGradient id="castleGrass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>
        </defs>
        <rect width="600" height="420" fill="url(#castleSky)" />
        <circle cx="490" cy="70" r="32" fill="#FEF08A" />
        {/* Castle Towers */}
        <rect x="115" y="135" width="60" height="185" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
        <polygon points="105,135 145,75 185,135" fill="#7C3AED" />
        <rect x="425" y="135" width="60" height="185" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
        <polygon points="415,135 455,75 495,135" fill="#7C3AED" />
        <rect x="210" y="95" width="180" height="225" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" />
        <polygon points="245,95 300,25 355,95" fill="#DC2626" />
        <line x1="300" y1="10" x2="300" y2="28" stroke="#FACC15" strokeWidth="3" />
        <polygon points="300,10 326,18 300,24" fill="#FACC15" />
        {/* Castle Arch Gate */}
        <path d="M258 320 L258 242 Q300 205 342 242 L342 320 Z" fill="#78350F" />
        {/* Lawn */}
        <path d="M0 315 Q300 295 600 315 L600 420 L0 420 Z" fill="url(#castleGrass)" />
        <ellipse cx="300" cy="356" rx="150" ry="22" fill="#14532D" opacity="0.28" />
      </svg>
    );
  }

  if (backdropId === 'bg_future_city') {
    return (
      <svg
        viewBox="0 0 600 420"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="futureSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="55%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#0EA5E9" />
          </linearGradient>
        </defs>
        <rect width="600" height="420" fill="url(#futureSky)" />
        {/* Futuristic Skyline */}
        <rect x="30" y="130" width="65" height="190" rx="6" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
        <rect x="108" y="95" width="72" height="225" rx="6" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
        <rect x="260" y="65" width="80" height="255" rx="8" fill="#1E293B" stroke="#FACC15" strokeWidth="1.5" />
        <rect x="425" y="105" width="68" height="215" rx="6" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
        <rect x="506" y="140" width="64" height="180" rx="6" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
        {/* Window lights */}
        <line x1="124" y1="120" x2="164" y2="120" stroke="#7DD3FC" strokeWidth="3" />
        <line x1="124" y1="145" x2="164" y2="145" stroke="#7DD3FC" strokeWidth="3" />
        <line x1="278" y1="95" x2="322" y2="95" stroke="#FDE047" strokeWidth="3" />
        <line x1="278" y1="122" x2="322" y2="122" stroke="#38BDF8" strokeWidth="3" />
        {/* Elevated skytrack */}
        <rect x="0" y="248" width="600" height="8" fill="#38BDF8" opacity="0.45" />
        <rect x="180" y="236" width="86" height="14" rx="7" fill="#F8FAFC" stroke="#0284C7" strokeWidth="2" />
        {/* Tech Platform */}
        <rect x="0" y="315" width="600" height="105" fill="#0F172A" />
        <ellipse cx="300" cy="356" rx="165" ry="24" fill="#0EA5E9" opacity="0.25" stroke="#38BDF8" strokeWidth="2" />
      </svg>
    );
  }

  if (backdropId === 'bg_magic_forest') {
    return (
      <svg
        viewBox="0 0 600 420"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="magicSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="60%" stopColor="#312E81" />
            <stop offset="100%" stopColor="#065F46" />
          </linearGradient>
        </defs>
        <rect width="600" height="420" fill="url(#magicSky)" />
        <circle cx="495" cy="74" r="28" fill="#FEF9C3" opacity="0.9" />
        {/* Giant mystical trees */}
        <rect x="44" y="140" width="38" height="180" rx="8" fill="#4C1D95" />
        <circle cx="65" cy="128" r="65" fill="#059669" opacity="0.88" />
        <rect x="515" y="135" width="38" height="185" rx="8" fill="#4C1D95" />
        <circle cx="532" cy="125" r="64" fill="#10B981" opacity="0.88" />
        {/* Glowing mushrooms */}
        <ellipse cx="135" cy="306" rx="20" ry="10" fill="#EC4899" />
        <rect x="130" y="306" width="10" height="18" fill="#FCE7F3" />
        <ellipse cx="465" cy="304" rx="18" ry="9" fill="#38BDF8" />
        <rect x="460" y="304" width="10" height="18" fill="#E0F2FE" />
        {/* Fireflies */}
        <circle cx="170" cy="120" r="4" fill="#FDE047" className="studio-float" />
        <circle cx="240" cy="180" r="3" fill="#A5F3FC" className="studio-float" />
        <circle cx="410" cy="140" r="4" fill="#FDE047" className="studio-float" />
        {/* Ground */}
        <path d="M0 318 Q300 296 600 318 L600 420 L0 420 Z" fill="#064E3B" />
        <ellipse cx="300" cy="356" rx="150" ry="22" fill="#34D399" opacity="0.24" />
      </svg>
    );
  }

  if (backdropId === 'bg_ocean') {
    return (
      <svg
        viewBox="0 0 600 420"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="oceanWater" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="55%" stopColor="#0369A1" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>
        <rect width="600" height="420" fill="url(#oceanWater)" />
        {/* Sun rays */}
        <polygon points="150,0 240,340 160,340" fill="#BAE6FD" opacity="0.16" />
        <polygon points="360,0 440,340 340,340" fill="#BAE6FD" opacity="0.14" />
        {/* Bubbles */}
        <circle cx="110" cy="135" r="8" fill="none" stroke="#E0F2FE" strokeWidth="2" opacity="0.7" />
        <circle cx="132" cy="105" r="5" fill="none" stroke="#E0F2FE" strokeWidth="2" opacity="0.7" />
        <circle cx="485" cy="145" r="10" fill="none" stroke="#E0F2FE" strokeWidth="2" opacity="0.7" />
        {/* Corals */}
        <path d="M55 340 Q45 270 72 250 Q78 295 85 340 Z" fill="#F43F5E" />
        <path d="M90 340 Q105 280 120 270 Q112 310 112 340 Z" fill="#F59E0B" />
        <path d="M510 340 Q500 270 526 250 Q532 295 540 340 Z" fill="#EC4899" />
        {/* Sand floor */}
        <path d="M0 322 Q300 302 600 322 L600 420 L0 420 Z" fill="#FDE68A" />
        <ellipse cx="300" cy="356" rx="150" ry="22" fill="#D97706" opacity="0.22" />
      </svg>
    );
  }

  if (backdropId === 'bg_forest') {
    return (
      <svg
        viewBox="0 0 600 420"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="forestSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="55%" stopColor="#7DD3FC" />
            <stop offset="100%" stopColor="#DCFCE7" />
          </linearGradient>
          <linearGradient id="forestGround" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>
          <linearGradient id="waterfallGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <rect width="600" height="420" fill="url(#forestSky)" />
        <circle cx="510" cy="68" r="36" fill="#FEF08A" opacity="0.9" />
        <circle cx="510" cy="68" r="56" fill="#FEF08A" opacity="0.25" />
        <path d="M0 265 Q140 190 290 250 Q450 185 600 245 L600 420 L0 420 Z" fill="#86EFAC" />
        <path d="M445 215 L495 215 L520 330 L425 330 Z" fill="url(#waterfallGrad)" opacity="0.85" />
        <ellipse cx="472" cy="330" rx="68" ry="14" fill="#A5F3FC" opacity="0.7" />
        <g>
          <rect x="65" y="235" width="18" height="70" rx="5" fill="#78350F" />
          <circle cx="74" cy="215" r="46" fill="#16A34A" />
          <circle cx="55" cy="230" r="32" fill="#22C55E" />
          <circle cx="96" cy="228" r="30" fill="#15803D" />
        </g>
        <g>
          <rect x="528" y="220" width="16" height="75" rx="5" fill="#78350F" />
          <circle cx="536" cy="198" r="40" fill="#15803D" />
          <circle cx="515" cy="212" r="28" fill="#22C55E" />
        </g>
        <path d="M0 320 Q300 295 600 320 L600 420 L0 420 Z" fill="url(#forestGround)" />
        <ellipse cx="300" cy="356" rx="145" ry="22" fill="#14532D" opacity="0.35" />
        <circle cx="150" cy="160" r="3.5" fill="#FEF08A" className="studio-float" />
        <circle cx="410" cy="140" r="3" fill="#BAE6FD" className="studio-float" />
        <circle cx="210" cy="210" r="2.5" fill="#FEF08A" className="studio-float" />
      </svg>
    );
  }

  if (backdropId === 'bg_lab') {
    return (
      <svg
        viewBox="0 0 600 420"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="labWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="65%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
          <linearGradient id="labFloor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>
        <rect width="600" height="420" fill="url(#labWall)" />
        <path d="M40 320 L40 80 Q40 40 80 40 L520 40 Q560 40 560 80 L560 320" fill="none" stroke="#38BDF8" strokeWidth="2" opacity="0.3" />
        <rect x="44" y="88" width="135" height="92" rx="12" fill="#0EA5E9" opacity="0.16" stroke="#38BDF8" strokeWidth="1.5" />
        <circle cx="95" cy="134" r="24" fill="none" stroke="#7DD3FC" strokeWidth="1.5" />
        <ellipse cx="95" cy="134" rx="34" ry="11" fill="none" stroke="#BAE6FD" strokeWidth="1.2" transform="rotate(35 95 134)" />
        <ellipse cx="95" cy="134" rx="34" ry="11" fill="none" stroke="#BAE6FD" strokeWidth="1.2" transform="rotate(-35 95 134)" />
        <circle cx="95" cy="134" r="5" fill="#FDE047" />
        <rect x="420" y="88" width="135" height="92" rx="12" fill="#0EA5E9" opacity="0.16" stroke="#38BDF8" strokeWidth="1.5" />
        <polyline points="440,154 468,132 492,142 534,108" fill="none" stroke="#34D399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="488" y="170" fill="#BAE6FD" fontSize="12" fontWeight="bold" textAnchor="middle">a² + b² = c²</text>
        <rect x="0" y="310" width="600" height="110" fill="url(#labFloor)" />
        <line x1="0" y1="310" x2="600" y2="310" stroke="#38BDF8" strokeWidth="2.5" opacity="0.7" />
        <ellipse cx="300" cy="356" rx="155" ry="22" fill="#0EA5E9" opacity="0.25" stroke="#38BDF8" strokeWidth="2" />
      </svg>
    );
  }

  if (backdropId === 'bg_arena') {
    return (
      <svg
        viewBox="0 0 600 420"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="arenaSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="55%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="arenaFloor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
        <rect width="600" height="420" fill="url(#arenaSky)" />
        <path d="M0 285 Q300 235 600 285 L600 325 L0 325 Z" fill="#451A03" opacity="0.65" />
        <rect x="55" y="120" width="22" height="165" fill="#78350F" />
        <rect x="523" y="120" width="22" height="165" fill="#78350F" />
        <polygon points="88,110 132,110 132,205 110,188 88,205" fill="#DC2626" />
        <polygon points="468,110 512,110 512,205 490,188 468,205" fill="#2563EB" />
        <polygon points="150,0 265,350 185,350" fill="#FEF08A" opacity="0.16" />
        <polygon points="450,0 415,350 335,350" fill="#FEF08A" opacity="0.16" />
        <path d="M0 315 Q300 295 600 315 L600 420 L0 420 Z" fill="url(#arenaFloor)" />
        <ellipse cx="300" cy="356" rx="158" ry="24" fill="#B45309" opacity="0.35" stroke="#FEF08A" strokeWidth="2.5" />
      </svg>
    );
  }

  if (backdropId === 'bg_galaxy') {
    return (
      <svg
        viewBox="0 0 600 420"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="galaxySky" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#090D1F" />
            <stop offset="50%" stopColor="#1E1B4B" />
            <stop offset="100%" stopColor="#312E81" />
          </linearGradient>
          <radialGradient id="nebulaGlow" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.38" />
            <stop offset="55%" stopColor="#8B5CF6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#090D1F" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="600" height="420" fill="url(#galaxySky)" />
        <rect width="600" height="420" fill="url(#nebulaGlow)" />
        <circle cx="80" cy="62" r="2" fill="#FFFFFF" />
        <circle cx="145" cy="112" r="1.5" fill="#BAE6FD" />
        <circle cx="230" cy="48" r="2.2" fill="#FDE047" />
        <circle cx="385" cy="76" r="1.8" fill="#FFFFFF" />
        <circle cx="490" cy="54" r="2.5" fill="#FDE047" />
        <circle cx="535" cy="150" r="1.8" fill="#C4B5FD" />
        <circle cx="95" cy="195" r="2" fill="#7DD3FC" />
        <circle cx="495" cy="118" r="30" fill="#6366F1" />
        <ellipse cx="495" cy="118" rx="54" ry="12" fill="none" stroke="#FDE047" strokeWidth="3" transform="rotate(-18 495 118)" />
        <polyline points="60,115 110,88 155,120" fill="none" stroke="#38BDF8" strokeWidth="1" opacity="0.45" />
        <ellipse cx="300" cy="355" rx="170" ry="28" fill="#1E1B4B" stroke="#38BDF8" strokeWidth="2.5" />
        <ellipse cx="300" cy="355" rx="120" ry="16" fill="#0EA5E9" opacity="0.25" />
      </svg>
    );
  }

  // Default: bg_classroom (Lớp Học Nắng Mai)
  return (
    <svg
      viewBox="0 0 600 420"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="classWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EFF6FF" />
          <stop offset="100%" stopColor="#DBEAFE" />
        </linearGradient>
        <linearGradient id="classFloor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <rect width="600" height="420" fill="url(#classWall)" />
      <rect x="36" y="55" width="95" height="145" rx="10" fill="#BAE6FD" stroke="#93C5FD" strokeWidth="4" />
      <line x1="83.5" y1="55" x2="83.5" y2="200" stroke="#FFFFFF" strokeWidth="3" />
      <line x1="36" y1="127" x2="131" y2="127" stroke="#FFFFFF" strokeWidth="3" />
      <polygon points="131,65 250,310 131,310" fill="#FEF9C3" opacity="0.35" />
      <rect x="170" y="58" width="260" height="145" rx="10" fill="#14532D" stroke="#92400E" strokeWidth="7" />
      <text x="300" y="102" fill="#FEF08A" fontSize="15" fontWeight="bold" textAnchor="middle" opacity="0.85">
        HỌC SIÊU VUI
      </text>
      <text x="230" y="140" fill="#BBF7D0" fontSize="12" opacity="0.75">
        1 + 1 = 2
      </text>
      <text x="365" y="142" fill="#BBF7D0" fontSize="12" opacity="0.75">
        a² + b² = c²
      </text>
      <circle cx="300" cy="166" r="14" fill="none" stroke="#86EFAC" strokeWidth="1.8" opacity="0.65" />
      <circle cx="515" cy="98" r="28" fill="#FFFFFF" stroke="#64748B" strokeWidth="4" />
      <line x1="515" y1="98" x2="515" y2="80" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
      <line x1="515" y1="98" x2="528" y2="104" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="0" y="315" width="600" height="105" fill="url(#classFloor)" opacity="0.55" />
      <ellipse cx="300" cy="356" rx="145" ry="20" fill="#92400E" opacity="0.14" />
    </svg>
  );
};
