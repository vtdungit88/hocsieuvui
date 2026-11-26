import React, { useId } from 'react';
import { AvatarConfig, AvatarFrameId } from '../../types';
import { AvatarHeadLayer } from './AvatarHeadLayer';

interface HeadPreviewProps {
  config: AvatarConfig;
  hairStyle?: string;
  eyeExpression?: string;
  mode: 'hair' | 'eyes';
}

/**
 * Renders an authentic zoomed-in 3D Pixar-Chibi head/face preview using AvatarHeadLayer
 * so hair, headgear, glasses, masks, and expressions show live artwork instead of plain text.
 */
export const AvatarHeadPreviewThumb: React.FC<HeadPreviewProps> = ({
  config,
  hairStyle,
  eyeExpression,
  mode
}) => {
  const rawUid = useId();
  const uid = `thumb_${rawUid.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const skin = config.skinColor || '#FDDFC6';
  const hair = config.hairColor || '#1E293B';
  const previewConfig: AvatarConfig = {
    ...config,
    hairStyle: hairStyle ?? config.hairStyle,
    eyeExpression: eyeExpression ?? config.eyeExpression
  };

  return (
    <svg
      viewBox={mode === 'hair' ? '74 10 172 154' : '88 60 144 104'}
      className={mode === 'hair' ? 'w-16 h-14 mx-auto overflow-visible' : 'w-16 h-12 mx-auto overflow-visible'}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`skinShading_${uid}`} cx="38%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.34" />
          <stop offset="58%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="86%" stopColor="#C2410C" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#9A3412" stopOpacity="0.28" />
        </radialGradient>
        <radialGradient id={`blush_${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FB7185" stopOpacity="0.62" />
          <stop offset="55%" stopColor="#F43F5E" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#FB7185" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`hairGloss_${uid}`} x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.38" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0.34" />
        </linearGradient>
        <linearGradient id={`clothShade_${uid}`} x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.28" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id={`goldMetal_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="45%" stopColor="#FACC15" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id={`silverMetal_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <filter id={`softAO_${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#0F172A" floodOpacity="0.18" />
        </filter>
        <filter id={`glowEffect_${uid}`} x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <AvatarHeadLayer config={previewConfig} skin={skin} hair={hair} animated={false} uid={uid} />
    </svg>
  );
};

/**
 * Illustrated 3D Cartoon Frame Preview matching the "Khung avatar & Sticker" concept art.
 */
export const AvatarFrameThumb: React.FC<{ frameId: AvatarFrameId }> = ({ frameId }) => {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');

  if (frameId === 'frame_cat_gold') {
    return (
      <svg viewBox="0 0 64 64" className="w-14 h-14 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id={`fg_${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>
        <polygon points="10,22 15,6 27,15" fill={`url(#fg_${uid})`} />
        <polygon points="54,22 49,6 37,15" fill={`url(#fg_${uid})`} />
        <polygon points="13,19 16,10 23,16" fill="#FDA4AF" />
        <polygon points="51,19 48,10 41,16" fill="#FDA4AF" />
        <rect x="8" y="13" width="48" height="44" rx="14" fill="#FFFBEB" stroke={`url(#fg_${uid})`} strokeWidth="5" />
        <circle cx="32" cy="57" r="4.5" fill="#FACC15" />
      </svg>
    );
  }

  if (frameId === 'frame_star_blue') {
    return (
      <svg viewBox="0 0 64 64" className="w-14 h-14 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id={`fb_${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="55%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
        </defs>
        <rect x="8" y="10" width="48" height="44" rx="14" fill="#F0F9FF" stroke={`url(#fb_${uid})`} strokeWidth="5" />
        <polygon points="52,6 54,12 60,14 54,16 52,22 50,16 44,14 50,12" fill="#FDE047" />
        <polygon points="12,44 13.5,48 18,49.5 13.5,51 12,55 10.5,51 6,49.5 10.5,48" fill="#38BDF8" />
      </svg>
    );
  }

  if (frameId === 'frame_rainbow') {
    return (
      <svg viewBox="0 0 64 64" className="w-14 h-14 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id={`fr_${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="35%" stopColor="#FACC15" />
            <stop offset="68%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
        <rect x="8" y="10" width="48" height="44" rx="14" fill="#FFF1F2" stroke={`url(#fr_${uid})`} strokeWidth="5.5" />
        <circle cx="14" cy="14" r="4" fill="#F43F5E" />
        <circle cx="50" cy="14" r="4" fill="#38BDF8" />
        <circle cx="32" cy="54" r="4" fill="#FACC15" />
      </svg>
    );
  }

  if (frameId === 'frame_hero_shield') {
    return (
      <svg viewBox="0 0 64 64" className="w-14 h-14 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id={`fh_${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
        <rect x="8" y="11" width="48" height="44" rx="14" fill="#EFF6FF" stroke={`url(#fh_${uid})`} strokeWidth="5" />
        <path d="M32 4 L40 8 L39 16 L32 20 L25 16 L24 8 Z" fill="#2563EB" />
        <polygon points="32,8 33.5,11.5 37,12 34.5,14.5 35,18 32,16.2 29,18 29.5,14.5 27,12 30.5,11.5" fill="#FDE047" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" className="w-14 h-14 shrink-0" aria-hidden="true">
      <rect x="8" y="10" width="48" height="44" rx="14" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="4" />
      <circle cx="32" cy="32" r="9" fill="#E2E8F0" />
    </svg>
  );
};

export type StudioStickerId = 'none' | 'good' | 'wow' | 'love' | 'top1';

/**
 * 3D Cartoon Sticker Badges matching the "Khung avatar & Sticker" (Good! / WoW!) mockup.
 */
export const StudioStickerBadge: React.FC<{ stickerId: StudioStickerId; className?: string }> = ({
  stickerId,
  className = 'w-20 h-10'
}) => {
  if (stickerId === 'none') return null;

  if (stickerId === 'good') {
    return (
      <svg viewBox="0 0 110 48" className={`${className} drop-shadow-md`} aria-hidden="true">
        <defs>
          <linearGradient id="stkGoodBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="55%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
        </defs>
        <rect x="4" y="5" width="102" height="38" rx="19" fill="#FFFFFF" />
        <rect x="7" y="8" width="96" height="32" rx="16" fill="url(#stkGoodBg)" />
        <path d="M18 14 Q55 10 92 14" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" fill="none" />
        <text x="55" y="30" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="900" fontFamily="Baloo 2, sans-serif">
          Good!
        </text>
      </svg>
    );
  }

  if (stickerId === 'wow') {
    return (
      <svg viewBox="0 0 110 48" className={`${className} drop-shadow-md`} aria-hidden="true">
        <defs>
          <linearGradient id="stkWowBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="55%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
        </defs>
        <rect x="4" y="5" width="102" height="38" rx="19" fill="#FFFFFF" />
        <rect x="7" y="8" width="96" height="32" rx="16" fill="url(#stkWowBg)" />
        <path d="M18 14 Q55 10 92 14" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="round" fill="none" />
        <text x="55" y="30" textAnchor="middle" fill="#FEF08A" fontSize="18" fontWeight="900" fontFamily="Baloo 2, sans-serif">
          WoW!
        </text>
      </svg>
    );
  }

  if (stickerId === 'love') {
    return (
      <svg viewBox="0 0 110 48" className={`${className} drop-shadow-md`} aria-hidden="true">
        <defs>
          <linearGradient id="stkLoveBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDA4AF" />
            <stop offset="55%" stopColor="#F43F5E" />
            <stop offset="100%" stopColor="#BE123C" />
          </linearGradient>
        </defs>
        <rect x="4" y="5" width="102" height="38" rx="19" fill="#FFFFFF" />
        <rect x="7" y="8" width="96" height="32" rx="16" fill="url(#stkLoveBg)" />
        <path d="M27 28 C21 23, 18 18, 22 15 C25 13, 27 16, 27 17 C27 16, 29 13, 32 15 C36 18, 33 23, 27 28 Z" fill="#FEF08A" />
        <text x="68" y="29" textAnchor="middle" fill="#FFFFFF" fontSize="15" fontWeight="900" fontFamily="Baloo 2, sans-serif">
          Tuyệt!
        </text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 110 48" className={`${className} drop-shadow-md`} aria-hidden="true">
      <defs>
        <linearGradient id="stkTopBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C4B5FD" />
          <stop offset="55%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#5B21B6" />
        </linearGradient>
      </defs>
      <rect x="4" y="5" width="102" height="38" rx="19" fill="#FFFFFF" />
      <rect x="7" y="8" width="96" height="32" rx="16" fill="url(#stkTopBg)" />
      <polygon points="26,14 28.5,20 35,20.5 30,24.5 31.5,31 26,27.5 20.5,31 22,24.5 17,20.5 23.5,20" fill="#FDE047" />
      <text x="66" y="29" textAnchor="middle" fill="#FFFFFF" fontSize="15" fontWeight="900" fontFamily="Baloo 2, sans-serif">
        TOP 1
      </text>
    </svg>
  );
};

const CREST_COLORS = {
  rose: { wingA: '#FDA4AF', wingB: '#E11D48', shieldA: '#FB7185', shieldB: '#9F1239' },
  violet: { wingA: '#DDD6FE', wingB: '#7C3AED', shieldA: '#A78BFA', shieldB: '#5B21B6' },
  emerald: { wingA: '#A7F3D0', wingB: '#059669', shieldA: '#34D399', shieldB: '#065F46' },
  blue: { wingA: '#BAE6FD', wingB: '#2563EB', shieldA: '#60A5FA', shieldB: '#1E40AF' },
  cyan: { wingA: '#A5F3FC', wingB: '#0891B2', shieldA: '#22D3EE', shieldB: '#155E75' },
  teal: { wingA: '#99F6E4', wingB: '#0D9488', shieldA: '#2DD4BF', shieldB: '#115E59' },
  amber: { wingA: '#FEF08A', wingB: '#D97706', shieldA: '#FBBF24', shieldB: '#92400E' }
} as const;

/**
 * 3D Winged Crest & Golden Star Emblem matching the "Hào quang & Danh hiệu" concept art.
 */
export const TitleCrestSvg: React.FC<{
  color: 'rose' | 'violet' | 'emerald' | 'blue' | 'cyan' | 'teal' | 'amber';
  className?: string;
}> = ({ color, className = 'w-10 h-8 shrink-0' }) => {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const pal = CREST_COLORS[color] || CREST_COLORS.amber;

  return (
    <svg viewBox="0 0 88 56" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`cw_${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={pal.wingA} />
          <stop offset="100%" stopColor={pal.wingB} />
        </linearGradient>
        <linearGradient id={`cs_${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={pal.shieldA} />
          <stop offset="100%" stopColor={pal.shieldB} />
        </linearGradient>
      </defs>
      {/* Left Wing */}
      <path d="M36 28 Q16 10 4 12 Q10 22 20 26 Q8 26 6 32 Q16 35 28 34 Z" fill={`url(#cw_${uid})`} />
      <path d="M36 32 Q20 28 12 37 Q22 40 34 37 Z" fill={pal.wingA} opacity="0.85" />
      {/* Right Wing */}
      <path d="M52 28 Q72 10 84 12 Q78 22 68 26 Q80 26 82 32 Q72 35 60 34 Z" fill={`url(#cw_${uid})`} />
      <path d="M52 32 Q68 28 76 37 Q66 40 54 37 Z" fill={pal.wingA} opacity="0.85" />
      {/* Golden Rim Shield */}
      <path d="M44 8 L60 15 L57 35 Q44 48 44 48 Q44 48 31 35 L28 15 Z" fill="#FACC15" />
      <path d="M44 12 L56 17 L54 33 L44 44 L34 33 L32 17 Z" fill={`url(#cs_${uid})`} />
      {/* Center Star */}
      <polygon
        points="44,17 46.5,24 54,24.5 48,29 50,36 44,32 38,36 40,29 34,24.5 41.5,24"
        fill="#FEF08A"
      />
    </svg>
  );
};
