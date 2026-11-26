import React, { useId } from 'react';
import { PersonalRoomDecor } from '../types';
import { DEFAULT_ROOM_DECOR } from '../data/items';

interface StudioStageBackdropProps {
  backdropId?: string;
  roomDecor?: PersonalRoomDecor;
}

const ROOM_WALL_COLORS = {
  warm: {
    shell: '#FEF3C7',
    wallLeftTop: '#FFFDF5',
    wallLeftBot: '#FDE68A',
    wallRightTop: '#FEF9C3',
    wallRightBot: '#FCD34D',
    floorTop: '#FDE68A',
    floorBot: '#D97706',
    plank: '#B45309',
    trim: '#78350F',
    rugOuter: '#38BDF8',
    rugMid: '#FDE047',
    rugInner: '#F472B6'
  },
  sky: {
    shell: '#CCFBF1',
    wallLeftTop: '#E0F2FE',
    wallLeftBot: '#BAE6FD',
    wallRightTop: '#CCFBF1',
    wallRightBot: '#99F6E4',
    floorTop: '#FDE68A',
    floorBot: '#D97706',
    plank: '#B45309',
    trim: '#0369A1',
    rugOuter: '#38BDF8',
    rugMid: '#FEF08A',
    rugInner: '#FB7185'
  },
  forest: {
    shell: '#DCFCE7',
    wallLeftTop: '#F0FDF4',
    wallLeftBot: '#BBF7D0',
    wallRightTop: '#ECFDF5',
    wallRightBot: '#A7F3D0',
    floorTop: '#FDE68A',
    floorBot: '#B45309',
    plank: '#92400E',
    trim: '#15803D',
    rugOuter: '#22C55E',
    rugMid: '#FDE047',
    rugInner: '#38BDF8'
  },
  galaxy: {
    shell: '#312E81',
    wallLeftTop: '#1E1B4B',
    wallLeftBot: '#312E81',
    wallRightTop: '#1E1B4B',
    wallRightBot: '#3B0764',
    floorTop: '#475569',
    floorBot: '#1E293B',
    plank: '#0F172A',
    trim: '#38BDF8',
    rugOuter: '#8B5CF6',
    rugMid: '#38BDF8',
    rugInner: '#F472B6'
  }
} as const;

export const StudioStageBackdrop: React.FC<StudioStageBackdropProps> = ({
  backdropId = 'bg_classroom',
  roomDecor = DEFAULT_ROOM_DECOR
}) => {
  const rawUid = useId();
  const uid = rawUid.replace(/[^a-zA-Z0-9_-]/g, '');

  if (backdropId === 'bg_my_room') {
    const palette = ROOM_WALL_COLORS[roomDecor.wallTheme] ?? ROOM_WALL_COLORS.warm;
    const isDarkRoom = roomDecor.wallTheme === 'galaxy';
    const outline = isDarkRoom ? 'rgba(148,163,184,0.35)' : 'rgba(51,65,85,0.24)';

    return (
      <svg
        viewBox="0 0 600 420"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`roomBg_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isDarkRoom ? '#0F172A' : '#F0F9FF'} />
            <stop offset="100%" stopColor={isDarkRoom ? '#1E1B4B' : '#E2E8F0'} />
          </linearGradient>
          <linearGradient id={`wallL_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={palette.wallLeftTop} />
            <stop offset="100%" stopColor={palette.wallLeftBot} />
          </linearGradient>
          <linearGradient id={`wallR_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={palette.wallRightTop} />
            <stop offset="100%" stopColor={palette.wallRightBot} />
          </linearGradient>
          <linearGradient id={`floorIso_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={palette.floorTop} />
            <stop offset="100%" stopColor={palette.floorBot} />
          </linearGradient>
          <radialGradient id={`centerGlow_${uid}`} cx="50%" cy="55%" r="48%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft ambient backdrop behind diorama */}
        <rect width="600" height="420" fill={`url(#roomBg_${uid})`} />

        {/* Isometric diorama outer thickness & corner shell */}
        <path
          d="M20 96 Q20 74 40 66 L282 14 Q300 10 318 14 L560 66 Q580 74 580 96 L580 356 Q580 374 562 380 L318 416 Q300 419 282 416 L38 380 Q20 374 20 356 Z"
          fill={palette.shell}
          stroke={outline}
          strokeWidth="3"
        />

        {/* Left & Right isometric walls */}
        <polygon
          points="32,82 300,26 300,274 32,334"
          fill={`url(#wallL_${uid})`}
          stroke={outline}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <polygon
          points="300,26 568,82 568,334 300,274"
          fill={`url(#wallR_${uid})`}
          stroke={outline}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* Baseboard trim */}
        <polygon points="32,320 300,262 300,274 32,334" fill={palette.trim} opacity="0.22" />
        <polygon points="300,262 568,320 568,334 300,274" fill={palette.trim} opacity="0.28" />

        {/* Isometric Wooden Floor */}
        <polygon
          points="32,334 300,274 568,334 300,404"
          fill={`url(#floorIso_${uid})`}
          stroke={outline}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        {/* Floor plank lines */}
        <line x1="115" y1="316" x2="395" y2="379" stroke={palette.plank} strokeWidth="1.2" opacity="0.24" />
        <line x1="205" y1="295" x2="482" y2="357" stroke={palette.plank} strokeWidth="1.2" opacity="0.24" />
        <line x1="115" y1="355" x2="388" y2="294" stroke={palette.plank} strokeWidth="1.2" opacity="0.2" />
        <line x1="205" y1="378" x2="476" y2="314" stroke={palette.plank} strokeWidth="1.2" opacity="0.2" />

        {/* Front wooden edge thickness */}
        <polygon
          points="32,334 300,404 300,415 32,346"
          fill="#D97706"
          stroke={outline}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <polygon
          points="568,334 300,404 300,415 568,346"
          fill="#B45309"
          stroke={outline}
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Wall Clock & Mini Calendar on far left */}
        <g>
          <circle cx="62" cy="140" r="17" fill="#C4B5FD" stroke={outline} strokeWidth="2" />
          <circle cx="62" cy="140" r="12" fill="#FFFFFF" stroke={outline} strokeWidth="1.5" />
          <line x1="62" y1="140" x2="62" y2="132" stroke="#334155" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="62" y1="140" x2="69" y2="143" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
          <polygon points="48,170 76,164 76,186 48,192" fill="#FEF3C7" stroke={outline} strokeWidth="1.8" />
          <polygon points="48,170 76,164 76,170 48,176" fill="#F97316" stroke={outline} strokeWidth="1.5" />
        </g>

        {/* Isometric Slatted Window with Blinds (Left wall) */}
        <g>
          <polygon
            points="100,104 206,82 206,184 100,208"
            fill={isDarkRoom ? '#0F172A' : '#BAE6FD'}
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <polygon
            points="100,104 206,82 206,184 100,208"
            fill="none"
            stroke={outline}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Window pane divider */}
          <line x1="153" y1="93" x2="153" y2="196" stroke="#FFFFFF" strokeWidth="3" />
          {/* Sky/Moon inside window */}
          {isDarkRoom ? (
            <>
              <circle cx="132" cy="158" r="8" fill="#FDE047" />
              <circle cx="176" cy="142" r="2.5" fill="#FEF9C3" />
              <circle cx="122" cy="136" r="2" fill="#BAE6FD" />
            </>
          ) : (
            <>
              <circle cx="176" cy="140" r="10" fill="#FEF08A" />
              <ellipse cx="132" cy="166" rx="18" ry="8" fill="#FFFFFF" opacity="0.85" />
            </>
          )}
          {/* Blue Slatted Blinds on top half */}
          <polygon
            points="96,100 210,77 210,126 96,150"
            fill="#60A5FA"
            stroke={outline}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <line x1="98" y1="112" x2="208" y2="89" stroke="#93C5FD" strokeWidth="1.5" />
          <line x1="98" y1="124" x2="208" y2="101" stroke="#3B82F6" strokeWidth="1.5" />
          <line x1="98" y1="136" x2="208" y2="113" stroke="#2563EB" strokeWidth="1.5" />
          {/* Blind pull cord */}
          <line x1="106" y1="148" x2="106" y2="178" stroke="#E2E8F0" strokeWidth="2" />
          <circle cx="106" cy="180" r="3" fill="#FFFFFF" stroke={outline} strokeWidth="1.2" />
        </g>

        {/* Mini AC unit near top right corner (matching isometric room reference) */}
        <g>
          <polygon
            points="318,46 392,62 392,88 318,72"
            fill="#F8FAFC"
            stroke={outline}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <polygon
            points="318,46 334,40 408,56 392,62"
            fill="#E2E8F0"
            stroke={outline}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <polygon
            points="392,62 408,56 408,82 392,88"
            fill="#CBD5E1"
            stroke={outline}
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <line x1="326" y1="68" x2="384" y2="80" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Superhero Poster & Hanging Headphones (center-left/right wall) */}
        {roomDecor.showPoster && (
          <g>
            {/* Framed Hero HSV Poster */}
            <polygon
              points="226,82 276,72 276,128 226,138"
              fill="#1E3A8A"
              stroke="#FACC15"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <circle cx="251" cy="102" r="14" fill="#DC2626" />
            <polygon
              points="251,92 254,99 261,99 255,103 257,110 251,106 245,110 247,103 241,99 248,99"
              fill="#FDE047"
            />
            <text x="251" y="126" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle">
              HERO HSV
            </text>

            {/* Cute Hanging Headphones on right wall */}
            <path
              d="M352 126 A14 14 0 0 1 378 132"
              fill="none"
              stroke="#FB923C"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <circle cx="352" cy="133" r="6" fill="#F97316" stroke={outline} strokeWidth="1.8" />
            <circle cx="378" cy="139" r="6" fill="#F97316" stroke={outline} strokeWidth="1.8" />
          </g>
        )}

        {/* Dual Floating Shelves with Books, Rubber Duck & Gold Trophy */}
        {roomDecor.showTrophyRack && (
          <g>
            {/* Top floating shelf */}
            <polygon
              points="460,118 544,136 534,142 450,124"
              fill="#F59E0B"
              stroke={outline}
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <polygon
              points="450,124 534,142 534,149 450,131"
              fill="#D97706"
              stroke={outline}
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            {/* Stacked upright colorful books */}
            <rect x="462" y="96" width="8" height="24" rx="1.5" fill="#EF4444" stroke={outline} strokeWidth="1.4" />
            <rect x="471" y="99" width="8" height="23" rx="1.5" fill="#F472B6" stroke={outline} strokeWidth="1.4" />
            <rect x="480" y="95" width="9" height="29" rx="1.5" fill="#3B82F6" stroke={outline} strokeWidth="1.4" />
            {/* Gold Trophy */}
            <path d="M506 108 L522 108 L519 124 Q514 128 509 124 Z" fill="#FACC15" stroke={outline} strokeWidth="1.5" />
            <rect x="512" y="125" width="4" height="7" fill="#B45309" />
            <rect x="508" y="131" width="12" height="4" rx="1" fill="#78350F" />

            {/* Lower floating shelf */}
            <polygon
              points="460,164 544,182 534,188 450,170"
              fill="#F59E0B"
              stroke={outline}
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <polygon
              points="450,170 534,188 534,195 450,177"
              fill="#D97706"
              stroke={outline}
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            {/* Gamepad & Rubber Duck */}
            <rect x="464" y="154" width="22" height="12" rx="5" fill="#475569" stroke={outline} strokeWidth="1.4" />
            <circle cx="470" cy="160" r="2" fill="#38BDF8" />
            <circle cx="480" cy="160" r="2" fill="#F472B6" />
            <circle cx="514" cy="168" r="7" fill="#FDE047" stroke={outline} strokeWidth="1.4" />
            <circle cx="518" cy="161" r="5" fill="#FDE047" stroke={outline} strokeWidth="1.4" />
            <polygon points="522,161 527,163 522,165" fill="#F97316" />
          </g>
        )}

        {/* Bookshelf & Cute Speaker/Radio (Left wall lower area) */}
        {roomDecor.showBookshelf && (
          <g>
            {/* Tall Bookshelf / Organizer on far left */}
            <polygon
              points="40,224 88,214 106,224 58,236"
              fill="#64748B"
              stroke={outline}
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <polygon
              points="40,224 58,236 58,312 40,300"
              fill="#475569"
              stroke={outline}
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <polygon
              points="58,236 106,224 106,300 58,312"
              fill="#334155"
              stroke={outline}
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            {/* Books & cans inside cabinet */}
            <rect x="65" y="242" width="8" height="18" rx="1" fill="#EF4444" stroke={outline} strokeWidth="1" />
            <rect x="75" y="240" width="8" height="18" rx="1" fill="#38BDF8" stroke={outline} strokeWidth="1" />
            <rect x="85" y="238" width="8" height="18" rx="1" fill="#FACC15" stroke={outline} strokeWidth="1" />
            <rect x="65" y="274" width="10" height="16" rx="1" fill="#EC4899" stroke={outline} strokeWidth="1" />
            <rect x="77" y="272" width="10" height="16" rx="1" fill="#22C55E" stroke={outline} strokeWidth="1" />
            {/* Cute orange radio on top */}
            <rect x="64" y="198" width="24" height="18" rx="3" fill="#F97316" stroke={outline} strokeWidth="1.6" />
            <circle cx="71" cy="208" r="3" fill="#FEF3C7" />
            <circle cx="81" cy="208" r="3" fill="#FEF3C7" />
          </g>
        )}

        {/* Isometric Study Desk & Curved PC Monitor (back center-left) */}
        {roomDecor.showDeskPc && (
          <g>
            {/* Desk tabletop */}
            <polygon
              points="164,228 286,202 324,220 202,248"
              fill="#F8FAFC"
              stroke={outline}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <polygon
              points="202,248 324,220 324,229 202,257"
              fill="#CBD5E1"
              stroke={outline}
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            {/* Desk drawers */}
            <polygon
              points="204,257 248,247 248,290 204,300"
              fill="#F59E0B"
              stroke={outline}
              strokeWidth="1.8"
            />
            <polygon
              points="208,262 242,254 242,268 208,276"
              fill="#FEF3C7"
              stroke={outline}
              strokeWidth="1.2"
            />
            <polygon
              points="208,280 242,272 242,286 208,294"
              fill="#FEF3C7"
              stroke={outline}
              strokeWidth="1.2"
            />
            {/* Curved Monitor */}
            <polygon
              points="224,174 274,162 274,202 224,214"
              fill="#0F172A"
              stroke="#38BDF8"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <polygon points="228,178 270,168 270,198 228,208" fill="#38BDF8" opacity="0.85" />
            <rect x="246" y="206" width="8" height="12" fill="#475569" stroke={outline} strokeWidth="1.2" />
            {/* Mini PC Tower */}
            <rect x="192" y="196" width="22" height="32" rx="4" fill="#E2E8F0" stroke={outline} strokeWidth="1.8" />
            <circle cx="203" cy="204" r="2.5" fill="#22D3EE" />
            {/* Keyboard & Desk Lamp */}
            <polygon points="236,225 278,215 292,222 250,232" fill="#93C5FD" stroke={outline} strokeWidth="1.4" />
            <path d="M294 212 L298 188 L308 184" fill="none" stroke="#F59E0B" strokeWidth="3.2" strokeLinecap="round" />
            <polygon points="302,186 316,180 314,193" fill="#FDE047" stroke={outline} strokeWidth="1.4" />
          </g>
        )}

        {/* Cozy Bed & Nightstand (Right isometric area) */}
        {roomDecor.showBed && (
          <g>
            {/* Headboard */}
            <polygon
              points="376,204 454,234 454,264 376,234"
              fill="#FEF3C7"
              stroke={outline}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Bed base & mattress */}
            <polygon
              points="324,262 396,232 476,266 404,300"
              fill="#FFFFFF"
              stroke={outline}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Cozy Coral/Red Blanket Fold */}
            <polygon
              points="318,266 378,242 452,275 392,306"
              fill="#FB7185"
              stroke={outline}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <polygon
              points="356,251 384,240 456,272 428,284"
              fill="#FEF3C7"
              stroke={outline}
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            {/* Side thickness */}
            <polygon
              points="318,266 392,306 392,324 318,284"
              fill="#E11D48"
              stroke={outline}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <polygon
              points="392,306 476,266 476,284 392,324"
              fill="#CBD5E1"
              stroke={outline}
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Plump pillows */}
            <ellipse cx="404" cy="240" rx="16" ry="9" fill="#FEF9C3" stroke={outline} strokeWidth="1.8" transform="rotate(14 404 240)" />
            <ellipse cx="430" cy="252" rx="16" ry="9" fill="#FDBA74" stroke={outline} strokeWidth="1.8" transform="rotate(14 430 252)" />

            {/* Nightstand + Warm Night Lamp */}
            <polygon
              points="466,278 504,262 528,274 490,290"
              fill="#F59E0B"
              stroke={outline}
              strokeWidth="1.8"
            />
            <polygon
              points="466,278 490,290 490,322 466,310"
              fill="#D97706"
              stroke={outline}
              strokeWidth="1.8"
            />
            <polygon
              points="490,290 528,274 528,306 490,322"
              fill="#B45309"
              stroke={outline}
              strokeWidth="1.8"
            />
            <circle cx="497" cy="264" r="9" fill="#FEF08A" stroke={outline} strokeWidth="1.8" />
          </g>
        )}

        {/* Potted Plant & Mini Corner Aquarium */}
        {roomDecor.showPlant && (
          <g>
            {/* Potted Plant by left wall */}
            <polygon points="114,274 142,274 137,302 119,302" fill="#EA580C" stroke={outline} strokeWidth="1.8" />
            <ellipse cx="128" cy="256" rx="12" ry="18" fill="#16A34A" stroke={outline} strokeWidth="1.5" />
            <ellipse cx="115" cy="264" rx="9" ry="12" fill="#22C55E" stroke={outline} strokeWidth="1.5" transform="rotate(-24 115 264)" />
            <ellipse cx="141" cy="264" rx="9" ry="12" fill="#22C55E" stroke={outline} strokeWidth="1.5" transform="rotate(24 141 264)" />

            {/* Mini Glowing Aquarium on right foreground corner */}
            <polygon
              points="498,306 534,292 558,304 522,318"
              fill="#BAE6FD"
              stroke={outline}
              strokeWidth="1.6"
            />
            <polygon
              points="498,306 522,318 522,346 498,334"
              fill="#38BDF8"
              opacity="0.72"
              stroke={outline}
              strokeWidth="1.6"
            />
            <polygon
              points="522,318 558,304 558,332 522,346"
              fill="#0EA5E9"
              opacity="0.72"
              stroke={outline}
              strokeWidth="1.6"
            />
            <circle cx="514" cy="322" r="3.5" fill="#FACC15" />
            <circle cx="538" cy="320" r="3" fill="#FB7185" />
          </g>
        )}

        {/* Center Highlight Glow & Cozy Rainbow Floor Rug right beneath avatar */}
        <ellipse cx="300" cy="346" rx="190" ry="44" fill={`url(#centerGlow_${uid})`} />
        <ellipse
          cx="300"
          cy="356"
          rx="148"
          ry="28"
          fill={palette.rugOuter}
          opacity="0.9"
          stroke={outline}
          strokeWidth="2.2"
        />
        <ellipse cx="300" cy="356" rx="116" ry="21" fill={palette.rugMid} opacity="0.92" />
        <ellipse cx="300" cy="356" rx="82" ry="14" fill={palette.rugInner} opacity="0.9" />
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
          <linearGradient id={`castleSky_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="55%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#FEF3C7" />
          </linearGradient>
          <linearGradient id={`castleGrass_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>
        </defs>
        <rect width="600" height="420" fill={`url(#castleSky_${uid})`} />
        <circle cx="490" cy="70" r="34" fill="#FEF08A" />
        <circle cx="490" cy="70" r="52" fill="#FEF08A" opacity="0.25" />
        {/* Fluffy clouds */}
        <g fill="#FFFFFF" opacity="0.88">
          <circle cx="90" cy="68" r="18" />
          <circle cx="112" cy="62" r="22" />
          <circle cx="134" cy="68" r="16" />
          <circle cx="380" cy="54" r="16" />
          <circle cx="400" cy="48" r="20" />
          <circle cx="420" cy="54" r="15" />
        </g>
        {/* Castle Towers */}
        <rect x="115" y="135" width="60" height="185" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2.2" />
        <polygon points="105,135 145,75 185,135" fill="#7C3AED" stroke="#4C1D95" strokeWidth="2" />
        <rect x="425" y="135" width="60" height="185" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2.2" />
        <polygon points="415,135 455,75 495,135" fill="#7C3AED" stroke="#4C1D95" strokeWidth="2" />
        <rect x="210" y="95" width="180" height="225" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2.2" />
        <polygon points="245,95 300,25 355,95" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
        <line x1="300" y1="10" x2="300" y2="28" stroke="#FACC15" strokeWidth="3.5" />
        <polygon points="300,10 328,18 300,24" fill="#FACC15" />
        <path d="M258 320 L258 242 Q300 205 342 242 L342 320 Z" fill="#78350F" stroke="#451A03" strokeWidth="2.5" />
        <path d="M0 315 Q300 295 600 315 L600 420 L0 420 Z" fill={`url(#castleGrass_${uid})`} />
        <ellipse cx="300" cy="356" rx="155" ry="24" fill="#14532D" opacity="0.26" />
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
          <linearGradient id={`futureSky_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#090D1F" />
            <stop offset="55%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#0EA5E9" />
          </linearGradient>
        </defs>
        <rect width="600" height="420" fill={`url(#futureSky_${uid})`} />
        <circle cx="90" cy="60" r="2" fill="#BAE6FD" />
        <circle cx="210" cy="42" r="2.5" fill="#FDE047" />
        <circle cx="490" cy="68" r="2" fill="#FFFFFF" />
        <rect x="30" y="130" width="65" height="190" rx="8" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
        <rect x="108" y="95" width="72" height="225" rx="8" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
        <rect x="260" y="65" width="80" height="255" rx="10" fill="#1E293B" stroke="#FACC15" strokeWidth="2" />
        <rect x="425" y="105" width="68" height="215" rx="8" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
        <rect x="506" y="140" width="64" height="180" rx="8" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
        <line x1="124" y1="120" x2="164" y2="120" stroke="#7DD3FC" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="124" y1="145" x2="164" y2="145" stroke="#7DD3FC" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="278" y1="95" x2="322" y2="95" stroke="#FDE047" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="278" y1="122" x2="322" y2="122" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" />
        <rect x="0" y="248" width="600" height="8" fill="#38BDF8" opacity="0.5" />
        <rect x="180" y="236" width="86" height="14" rx="7" fill="#F8FAFC" stroke="#0284C7" strokeWidth="2" />
        <rect x="0" y="315" width="600" height="105" fill="#0F172A" />
        <ellipse cx="300" cy="356" rx="165" ry="24" fill="#0EA5E9" opacity="0.32" stroke="#38BDF8" strokeWidth="2.5" />
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
          <linearGradient id={`magicSky_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="60%" stopColor="#312E81" />
            <stop offset="100%" stopColor="#065F46" />
          </linearGradient>
        </defs>
        <rect width="600" height="420" fill={`url(#magicSky_${uid})`} />
        <circle cx="495" cy="74" r="30" fill="#FEF9C3" opacity="0.92" />
        <circle cx="495" cy="74" r="46" fill="#FEF9C3" opacity="0.2" />
        <rect x="44" y="140" width="38" height="180" rx="10" fill="#4C1D95" />
        <circle cx="65" cy="128" r="65" fill="#059669" opacity="0.9" />
        <rect x="515" y="135" width="38" height="185" rx="10" fill="#4C1D95" />
        <circle cx="532" cy="125" r="64" fill="#10B981" opacity="0.9" />
        <ellipse cx="135" cy="306" rx="22" ry="11" fill="#EC4899" />
        <rect x="130" y="306" width="10" height="18" rx="3" fill="#FCE7F3" />
        <ellipse cx="465" cy="304" rx="20" ry="10" fill="#38BDF8" />
        <rect x="460" y="304" width="10" height="18" rx="3" fill="#E0F2FE" />
        <circle cx="170" cy="120" r="4.5" fill="#FDE047" className="studio-float" />
        <circle cx="240" cy="180" r="3.5" fill="#A5F3FC" className="studio-float" />
        <circle cx="410" cy="140" r="4.5" fill="#FDE047" className="studio-float" />
        <path d="M0 318 Q300 296 600 318 L600 420 L0 420 Z" fill="#064E3B" />
        <ellipse cx="300" cy="356" rx="152" ry="22" fill="#34D399" opacity="0.28" />
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
          <linearGradient id={`oceanWater_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="55%" stopColor="#0369A1" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>
        <rect width="600" height="420" fill={`url(#oceanWater_${uid})`} />
        <polygon points="150,0 240,340 160,340" fill="#BAE6FD" opacity="0.18" />
        <polygon points="360,0 440,340 340,340" fill="#BAE6FD" opacity="0.16" />
        <circle cx="110" cy="135" r="9" fill="#E0F2FE" fillOpacity="0.2" stroke="#E0F2FE" strokeWidth="2" />
        <circle cx="132" cy="105" r="5" fill="#E0F2FE" fillOpacity="0.25" stroke="#E0F2FE" strokeWidth="2" />
        <circle cx="485" cy="145" r="11" fill="#E0F2FE" fillOpacity="0.2" stroke="#E0F2FE" strokeWidth="2" />
        <path d="M55 340 Q45 270 72 250 Q78 295 85 340 Z" fill="#F43F5E" />
        <path d="M90 340 Q105 280 120 270 Q112 310 112 340 Z" fill="#F59E0B" />
        <path d="M510 340 Q500 270 526 250 Q532 295 540 340 Z" fill="#EC4899" />
        <path d="M0 322 Q300 302 600 322 L600 420 L0 420 Z" fill="#FDE68A" />
        <ellipse cx="300" cy="356" rx="150" ry="22" fill="#D97706" opacity="0.24" />
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
          <linearGradient id={`forestSky_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="55%" stopColor="#7DD3FC" />
            <stop offset="100%" stopColor="#DCFCE7" />
          </linearGradient>
          <linearGradient id={`forestGround_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>
          <linearGradient id={`waterfallGrad_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <rect width="600" height="420" fill={`url(#forestSky_${uid})`} />
        <circle cx="510" cy="68" r="36" fill="#FEF08A" opacity="0.92" />
        <circle cx="510" cy="68" r="56" fill="#FEF08A" opacity="0.28" />
        <path d="M0 265 Q140 190 290 250 Q450 185 600 245 L600 420 L0 420 Z" fill="#86EFAC" />
        <path d="M445 215 L495 215 L520 330 L425 330 Z" fill={`url(#waterfallGrad_${uid})`} opacity="0.88" />
        <ellipse cx="472" cy="330" rx="68" ry="14" fill="#A5F3FC" opacity="0.72" />
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
        <path d="M0 320 Q300 295 600 320 L600 420 L0 420 Z" fill={`url(#forestGround_${uid})`} />
        <ellipse cx="300" cy="356" rx="148" ry="22" fill="#14532D" opacity="0.32" />
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
          <linearGradient id={`labWall_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="65%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
          <linearGradient id={`labFloor_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>
        <rect width="600" height="420" fill={`url(#labWall_${uid})`} />
        <path d="M40 320 L40 80 Q40 40 80 40 L520 40 Q560 40 560 80 L560 320" fill="none" stroke="#38BDF8" strokeWidth="2.2" opacity="0.32" />
        <rect x="44" y="88" width="135" height="92" rx="14" fill="#0EA5E9" opacity="0.18" stroke="#38BDF8" strokeWidth="1.8" />
        <circle cx="95" cy="134" r="24" fill="none" stroke="#7DD3FC" strokeWidth="1.5" />
        <ellipse cx="95" cy="134" rx="34" ry="11" fill="none" stroke="#BAE6FD" strokeWidth="1.2" transform="rotate(35 95 134)" />
        <ellipse cx="95" cy="134" rx="34" ry="11" fill="none" stroke="#BAE6FD" strokeWidth="1.2" transform="rotate(-35 95 134)" />
        <circle cx="95" cy="134" r="5" fill="#FDE047" />
        <rect x="420" y="88" width="135" height="92" rx="14" fill="#0EA5E9" opacity="0.18" stroke="#38BDF8" strokeWidth="1.8" />
        <polyline points="440,154 468,132 492,142 534,108" fill="none" stroke="#34D399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="488" y="170" fill="#BAE6FD" fontSize="12" fontWeight="bold" textAnchor="middle">a² + b² = c²</text>
        <rect x="0" y="310" width="600" height="110" fill={`url(#labFloor_${uid})`} />
        <line x1="0" y1="310" x2="600" y2="310" stroke="#38BDF8" strokeWidth="2.5" opacity="0.7" />
        <ellipse cx="300" cy="356" rx="155" ry="22" fill="#0EA5E9" opacity="0.28" stroke="#38BDF8" strokeWidth="2" />
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
          <linearGradient id={`arenaSky_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="55%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id={`arenaFloor_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
        <rect width="600" height="420" fill={`url(#arenaSky_${uid})`} />
        <path d="M0 285 Q300 235 600 285 L600 325 L0 325 Z" fill="#451A03" opacity="0.65" />
        <rect x="55" y="120" width="22" height="165" rx="4" fill="#78350F" />
        <rect x="523" y="120" width="22" height="165" rx="4" fill="#78350F" />
        <polygon points="88,110 132,110 132,205 110,188 88,205" fill="#DC2626" />
        <polygon points="468,110 512,110 512,205 490,188 468,205" fill="#2563EB" />
        <polygon points="150,0 265,350 185,350" fill="#FEF08A" opacity="0.18" />
        <polygon points="450,0 415,350 335,350" fill="#FEF08A" opacity="0.18" />
        <path d="M0 315 Q300 295 600 315 L600 420 L0 420 Z" fill={`url(#arenaFloor_${uid})`} />
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
          <linearGradient id={`galaxySky_${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#090D1F" />
            <stop offset="50%" stopColor="#1E1B4B" />
            <stop offset="100%" stopColor="#312E81" />
          </linearGradient>
          <radialGradient id={`nebulaGlow_${uid}`} cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
            <stop offset="55%" stopColor="#8B5CF6" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#090D1F" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="600" height="420" fill={`url(#galaxySky_${uid})`} />
        <rect width="600" height="420" fill={`url(#nebulaGlow_${uid})`} />
        <circle cx="80" cy="62" r="2.2" fill="#FFFFFF" />
        <circle cx="145" cy="112" r="1.8" fill="#BAE6FD" />
        <circle cx="230" cy="48" r="2.4" fill="#FDE047" />
        <circle cx="385" cy="76" r="2" fill="#FFFFFF" />
        <circle cx="490" cy="54" r="2.5" fill="#FDE047" />
        <circle cx="535" cy="150" r="2" fill="#C4B5FD" />
        <circle cx="95" cy="195" r="2.2" fill="#7DD3FC" />
        <circle cx="495" cy="118" r="30" fill="#6366F1" />
        <ellipse cx="495" cy="118" rx="54" ry="12" fill="none" stroke="#FDE047" strokeWidth="3.2" transform="rotate(-18 495 118)" />
        <polyline points="60,115 110,88 155,120" fill="none" stroke="#38BDF8" strokeWidth="1.2" opacity="0.48" />
        <ellipse cx="300" cy="355" rx="170" ry="28" fill="#1E1B4B" stroke="#38BDF8" strokeWidth="2.5" />
        <ellipse cx="300" cy="355" rx="120" ry="16" fill="#0EA5E9" opacity="0.28" />
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
        <linearGradient id={`classWall_${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EFF6FF" />
          <stop offset="100%" stopColor="#DBEAFE" />
        </linearGradient>
        <linearGradient id={`classFloor_${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <rect width="600" height="420" fill={`url(#classWall_${uid})`} />
      <rect x="36" y="55" width="95" height="145" rx="12" fill="#BAE6FD" stroke="#60A5FA" strokeWidth="4" />
      <line x1="83.5" y1="55" x2="83.5" y2="200" stroke="#FFFFFF" strokeWidth="3" />
      <line x1="36" y1="127" x2="131" y2="127" stroke="#FFFFFF" strokeWidth="3" />
      <polygon points="131,65 250,310 131,310" fill="#FEF9C3" opacity="0.38" />
      <rect x="170" y="58" width="260" height="145" rx="12" fill="#14532D" stroke="#92400E" strokeWidth="7" />
      <text x="300" y="102" fill="#FEF08A" fontSize="15" fontWeight="bold" textAnchor="middle" opacity="0.9">
        HỌC SIÊU VUI
      </text>
      <text x="230" y="140" fill="#BBF7D0" fontSize="12" opacity="0.8">
        1 + 1 = 2
      </text>
      <text x="365" y="142" fill="#BBF7D0" fontSize="12" opacity="0.8">
        a² + b² = c²
      </text>
      <circle cx="300" cy="166" r="14" fill="none" stroke="#86EFAC" strokeWidth="1.8" opacity="0.7" />
      <circle cx="515" cy="98" r="28" fill="#FFFFFF" stroke="#64748B" strokeWidth="4" />
      <line x1="515" y1="98" x2="515" y2="80" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
      <line x1="515" y1="98" x2="528" y2="104" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="0" y="315" width="600" height="105" fill={`url(#classFloor_${uid})`} opacity="0.58" />
      <ellipse cx="300" cy="356" rx="145" ry="20" fill="#92400E" opacity="0.16" />
    </svg>
  );
};
