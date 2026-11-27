import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  CheckCircle2,
  Compass,
  Maximize2,
  Minimize2,
  Sparkles,
  Volume2
} from 'lucide-react';
import type { StudentProfile } from '../../types';
import {
  ADVENTURE_REALMS,
  type AdventureRealm,
  type AdventureWorldSave,
  type RealmLandmark,
  type RealmSecretItem,
  getRealmExplorationPoints,
  isRealmChestReady
} from '../../data/adventureWorld';
import { AvatarRenderer } from '../AvatarRenderer';
import { soundManager } from '../../utils/audio';

interface IsometricWorldStageProps {
  student: StudentProfile;
  realm: AdventureRealm;
  save: AdventureWorldSave;
  onSelectLandmark: (landmark: RealmLandmark) => void;
  onCollectSecret: (secret: RealmSecretItem) => void;
  onTalkNpc: () => void;
  onOpenChest: () => void;
  onPortalActivate: () => void;
}

/** 2.5D illustrated SVG buildings for all 18 landmarks across the 6 realms */
export const LandmarkArt: React.FC<{
  artType: RealmLandmark['artType'];
  discovered?: boolean;
  className?: string;
}> = ({ artType, discovered = false, className = 'w-20 h-20' }) => {
  switch (artType) {
    case 'khue_van_cac':
      return (
        <svg viewBox="0 0 110 110" className={className} aria-hidden="true">
          <ellipse cx="55" cy="96" rx="38" ry="10" fill="#0f172a" opacity="0.22" />
          {/* Stone plinth */}
          <polygon points="22,86 55,97 88,86 55,75" fill="#e2e8f0" />
          <polygon points="22,86 55,97 55,103 22,92" fill="#94a3b8" />
          <polygon points="55,97 88,86 88,92 55,103" fill="#64748b" />
          {/* Pillars */}
          <rect x="31" y="54" width="6" height="32" rx="2" fill="#b91c1c" />
          <rect x="44" y="57" width="6" height="31" rx="2" fill="#dc2626" />
          <rect x="60" y="57" width="6" height="31" rx="2" fill="#b91c1c" />
          <rect x="73" y="54" width="6" height="32" rx="2" fill="#991b1b" />
          {/* Lower roof */}
          <path d="M18 57 L55 42 L92 57 L82 63 L55 52 L28 63 Z" fill="#dc2626" />
          <path d="M22 58 L55 45 L88 58" fill="none" stroke="#facc15" strokeWidth="2.5" />
          {/* Upper pavilion + circular sun window */}
          <rect x="37" y="29" width="36" height="22" rx="3" fill="#991b1b" />
          <circle cx="55" cy="40" r="8" fill="#fef08a" stroke="#f59e0b" strokeWidth="2.5" />
          <circle cx="55" cy="40" r="4" fill="#f59e0b" />
          {/* Upper curved roof */}
          <path d="M25 32 Q55 12 85 32 L76 37 L55 25 L34 37 Z" fill="#ef4444" />
          <polygon points="55,11 59,20 51,20" fill="#facc15" />
        </svg>
      );
    case 'bia_tien_si':
      return (
        <svg viewBox="0 0 110 110" className={className} aria-hidden="true">
          <ellipse cx="55" cy="95" rx="36" ry="9" fill="#0f172a" opacity="0.2" />
          {/* Turtle base */}
          <ellipse cx="55" cy="84" rx="28" ry="12" fill="#78716c" />
          <ellipse cx="55" cy="80" rx="22" ry="9" fill="#a8a29e" />
          <circle cx="80" cy="82" r="6" fill="#78716c" />
          <circle cx="82" cy="81" r="1.5" fill="#1c1917" />
          {/* Stele */}
          <rect x="38" y="30" width="34" height="50" rx="10" fill="#d6d3d1" stroke="#78716c" strokeWidth="2.5" />
          <rect x="44" y="38" width="22" height="34" rx="4" fill="#fafaf9" />
          <line x1="48" y1="46" x2="62" y2="46" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="48" y1="53" x2="62" y2="53" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          <line x1="48" y1="60" x2="58" y2="60" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          <circle cx="55" cy="33" r="4" fill="#f59e0b" />
        </svg>
      );
    case 'ho_sen':
      return (
        <svg viewBox="0 0 110 110" className={className} aria-hidden="true">
          <ellipse cx="55" cy="78" rx="44" ry="20" fill="#bae6fd" />
          <ellipse cx="55" cy="76" rx="40" ry="17" fill="#0ea5e9" />
          <ellipse cx="55" cy="74" rx="34" ry="13" fill="#38bdf8" />
          {/* Lily pads */}
          <ellipse cx="38" cy="76" rx="11" ry="5" fill="#22c55e" />
          <ellipse cx="70" cy="79" rx="12" ry="5.5" fill="#16a34a" />
          <ellipse cx="56" cy="68" rx="9" ry="4" fill="#4ade80" />
          {/* Pink lotus flowers */}
          <g transform="translate(38 72)">
            <path d="M-8 0 Q-4 -11 0 -13 Q4 -11 8 0 Z" fill="#f472b6" />
            <path d="M-11 1 Q-7 -6 -2 -8 L0 0 Z" fill="#fbcfe8" />
            <path d="M11 1 Q7 -6 2 -8 L0 0 Z" fill="#fbcfe8" />
            <circle cx="0" cy="-3" r="2.5" fill="#fde047" />
          </g>
          <g transform="translate(70 74)">
            <path d="M-7 0 Q-3 -10 0 -11 Q3 -10 7 0 Z" fill="#ec4899" />
            <circle cx="0" cy="-3" r="2" fill="#fde047" />
          </g>
          {/* Floating starlight */}
          <circle cx="52" cy="54" r="3" fill="#fef08a" opacity="0.9" />
          <circle cx="64" cy="48" r="2" fill="#ffffff" opacity="0.85" />
        </svg>
      );
    case 'waterfall':
      return (
        <svg viewBox="0 0 110 110" className={className} aria-hidden="true">
          <ellipse cx="55" cy="92" rx="42" ry="12" fill="#06b6d4" opacity="0.35" />
          {/* Cliff rock */}
          <polygon points="18,84 26,30 56,20 88,34 92,84" fill="#64748b" />
          <polygon points="56,20 88,34 92,84 58,84" fill="#475569" />
          <ellipse cx="55" cy="28" rx="30" ry="10" fill="#22c55e" />
          {/* Cascading water */}
          <path d="M40 30 Q43 58 34 86 L68 86 Q63 58 66 30 Z" fill="#38bdf8" />
          <path d="M46 31 Q48 56 42 84 L58 84 Q56 56 58 31 Z" fill="#bae6fd" />
          {/* Foam */}
          <ellipse cx="52" cy="86" rx="22" ry="7" fill="#e0f2fe" />
          <circle cx="38" cy="84" r="4" fill="#ffffff" />
          <circle cx="66" cy="85" r="4" fill="#ffffff" />
        </svg>
      );
    case 'crystal_cave':
      return (
        <svg viewBox="0 0 110 110" className={className} aria-hidden="true">
          <ellipse cx="55" cy="94" rx="40" ry="10" fill="#0f172a" opacity="0.25" />
          <path d="M16 90 Q24 28 55 24 Q86 28 94 90 Z" fill="#475569" />
          <path d="M55 24 Q86 28 94 90 L55 90 Z" fill="#334155" />
          {/* Cave opening */}
          <path d="M34 90 Q36 48 55 46 Q74 48 76 90 Z" fill="#1e1b4b" />
          {/* Glowing crystals */}
          <polygon points="26,86 32,58 40,86" fill="#a855f7" />
          <polygon points="32,58 40,86 35,86" fill="#d8b4fe" />
          <polygon points="70,86 78,54 86,86" fill="#22d3ee" />
          <polygon points="48,46 53,34 59,46" fill="#c084fc" />
          <circle cx="54" cy="70" r="3" fill="#fde047" />
          <circle cx="62" cy="62" r="2.5" fill="#a5f3fc" />
        </svg>
      );
    case 'ancient_tree':
      return (
        <svg viewBox="0 0 110 110" className={className} aria-hidden="true">
          <ellipse cx="55" cy="95" rx="34" ry="10" fill="#0f172a" opacity="0.22" />
          {/* Trunk & roots */}
          <path d="M36 92 Q45 72 44 48 L66 48 Q65 72 74 92 Z" fill="#78350f" />
          <rect x="49" y="65" width="12" height="18" rx="6" fill="#facc15" />
          {/* Lush canopy */}
          <circle cx="36" cy="48" r="20" fill="#16a34a" />
          <circle cx="74" cy="48" r="20" fill="#15803d" />
          <circle cx="55" cy="32" r="24" fill="#22c55e" />
          <circle cx="48" cy="26" r="10" fill="#86efac" opacity="0.5" />
          {/* Hanging lantern */}
          <line x1="74" y1="56" x2="74" y2="66" stroke="#78350f" strokeWidth="2" />
          <circle cx="74" cy="70" r="5" fill="#fde047" />
        </svg>
      );
    case 'rainbow_bridge':
      return (
        <svg viewBox="0 0 110 110" className={className} aria-hidden="true">
          <ellipse cx="26" cy="86" rx="18" ry="8" fill="#ffffff" opacity="0.9" />
          <ellipse cx="84" cy="86" rx="18" ry="8" fill="#ffffff" opacity="0.9" />
          <path d="M22 82 Q55 18 88 82" fill="none" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
          <path d="M25 82 Q55 24 85 82" fill="none" stroke="#f59e0b" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M28 82 Q55 30 82 82" fill="none" stroke="#facc15" strokeWidth="5" strokeLinecap="round" />
          <path d="M31 82 Q55 36 79 82" fill="none" stroke="#22c55e" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M34 82 Q55 42 76 82" fill="none" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
          <circle cx="55" cy="30" r="3" fill="#ffffff" />
        </svg>
      );
    case 'wind_arena':
      return (
        <svg viewBox="0 0 110 110" className={className} aria-hidden="true">
          <ellipse cx="55" cy="94" rx="34" ry="9" fill="#0f172a" opacity="0.18" />
          {/* Tower */}
          <polygon points="40,90 46,42 64,42 70,90" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M43 42 Q55 24 67 42 Z" fill="#0284c7" />
          <rect x="49" y="68" width="12" height="22" rx="6" fill="#0ea5e9" />
          {/* Windmill blades */}
          <g transform="translate(55 48)">
            <rect x="-3" y="-32" width="6" height="28" rx="3" fill="#f472b6" />
            <rect x="-3" y="4" width="6" height="28" rx="3" fill="#38bdf8" />
            <rect x="-32" y="-3" width="28" height="6" rx="3" fill="#facc15" />
            <rect x="4" y="-3" width="28" height="6" rx="3" fill="#4ade80" />
            <circle cx="0" cy="0" r="6" fill="#1e293b" />
          </g>
        </svg>
      );
    case 'star_observatory':
      return (
        <svg viewBox="0 0 110 110" className={className} aria-hidden="true">
          <ellipse cx="55" cy="95" rx="34" ry="9" fill="#0f172a" opacity="0.2" />
          <rect x="37" y="48" width="36" height="44" rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
          <path d="M35 50 Q55 20 75 50 Z" fill="#4f46e5" />
          {/* Telescope */}
          <g transform="translate(68 33) rotate(-32)">
            <rect x="0" y="-5" width="26" height="10" rx="4" fill="#facc15" stroke="#b45309" strokeWidth="1.5" />
            <circle cx="26" cy="0" r="5" fill="#38bdf8" />
          </g>
          <circle cx="55" cy="68" r="7" fill="#38bdf8" stroke="#4f46e5" strokeWidth="2" />
          <polygon points="28,28 31,34 37,35 32,39 33,45 28,42 23,45 24,39 19,35 25,34" fill="#fde047" />
        </svg>
      );
    case 'pearl_palace':
      return (
        <svg viewBox="0 0 110 110" className={className} aria-hidden="true">
          <ellipse cx="55" cy="94" rx="40" ry="10" fill="#083344" opacity="0.25" />
          {/* Scallop shell back */}
          <path d="M20 72 Q22 24 55 20 Q88 24 90 72 Z" fill="#67e8f9" />
          <path d="M30 72 Q34 32 55 28 Q76 32 80 72 Z" fill="#cffafe" />
          {/* Towers */}
          <rect x="26" y="54" width="14" height="36" rx="4" fill="#06b6d4" />
          <rect x="70" y="54" width="14" height="36" rx="4" fill="#06b6d4" />
          {/* Giant glowing pearl */}
          <circle cx="55" cy="66" r="15" fill="#ffffff" stroke="#38bdf8" strokeWidth="2.5" />
          <circle cx="50" cy="61" r="4" fill="#e0f2fe" />
          <polygon points="55,14 60,23 50,23" fill="#facc15" />
        </svg>
      );
    case 'coral_reef':
      return (
        <svg viewBox="0 0 110 110" className={className} aria-hidden="true">
          <ellipse cx="55" cy="92" rx="40" ry="10" fill="#0e7490" opacity="0.3" />
          {/* Coral branches */}
          <path d="M35 88 L35 50 M35 66 L24 54 M35 60 L45 48" stroke="#fb7185" strokeWidth="9" strokeLinecap="round" fill="none" />
          <path d="M62 88 L62 42 M62 64 L50 52 M62 56 L76 46" stroke="#fb923c" strokeWidth="9" strokeLinecap="round" fill="none" />
          <path d="M80 88 L82 60 M82 72 L91 64" stroke="#c084fc" strokeWidth="7" strokeLinecap="round" fill="none" />
          {/* Cute clownfish */}
          <ellipse cx="48" cy="42" rx="10" ry="6" fill="#f97316" />
          <polygon points="58,42 64,37 64,47" fill="#f97316" />
          <rect x="45" y="36.5" width="3" height="11" fill="#ffffff" />
          <circle cx="42" cy="40.5" r="1.3" fill="#0f172a" />
        </svg>
      );
    case 'sunken_ship':
      return (
        <svg viewBox="0 0 110 110" className={className} aria-hidden="true">
          <ellipse cx="55" cy="94" rx="40" ry="9" fill="#083344" opacity="0.28" />
          {/* Mast + torn sail */}
          <rect x="52" y="24" width="5" height="46" fill="#78350f" />
          <path d="M57 26 Q78 36 74 58 L57 54 Z" fill="#fef3c7" />
          {/* Hull */}
          <path d="M20 66 L90 66 L78 90 L30 90 Z" fill="#92400e" />
          <path d="M24 72 L86 72" stroke="#facc15" strokeWidth="3" />
          <circle cx="42" cy="79" r="4" fill="#38bdf8" stroke="#facc15" strokeWidth="1.5" />
          <circle cx="56" cy="79" r="4" fill="#38bdf8" stroke="#facc15" strokeWidth="1.5" />
          <circle cx="70" cy="79" r="4" fill="#38bdf8" stroke="#facc15" strokeWidth="1.5" />
        </svg>
      );
    case 'dino_nest':
      return (
        <svg viewBox="0 0 110 110" className={className} aria-hidden="true">
          <ellipse cx="55" cy="92" rx="38" ry="10" fill="#0f172a" opacity="0.2" />
          {/* Nest straw */}
          <ellipse cx="55" cy="80" rx="34" ry="13" fill="#d97706" />
          <ellipse cx="55" cy="76" rx="28" ry="10" fill="#fde68a" />
          {/* Eggs */}
          <ellipse cx="42" cy="64" rx="11" ry="15" fill="#ecfccb" stroke="#65a30d" strokeWidth="2" />
          <circle cx="39" cy="60" r="2.5" fill="#84cc16" />
          <circle cx="45" cy="68" r="2" fill="#84cc16" />
          <ellipse cx="66" cy="62" rx="12" ry="16" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
          <circle cx="64" cy="56" r="2.5" fill="#eab308" />
          {/* Baby green dino */}
          <circle cx="55" cy="48" r="10" fill="#4ade80" />
          <circle cx="58" cy="46" r="2" fill="#0f172a" />
        </svg>
      );
    case 'fossil_cave':
      return (
        <svg viewBox="0 0 110 110" className={className} aria-hidden="true">
          <ellipse cx="55" cy="94" rx="40" ry="10" fill="#0f172a" opacity="0.24" />
          <path d="M18 90 Q28 30 55 26 Q84 30 92 90 Z" fill="#b45309" />
          <path d="M35 90 Q38 50 55 48 Q72 50 75 90 Z" fill="#451a03" />
          {/* Golden bone crest */}
          <rect x="40" y="34" width="30" height="7" rx="3.5" fill="#fef3c7" />
          <circle cx="39" cy="34" r="4" fill="#fef3c7" />
          <circle cx="39" cy="40" r="4" fill="#fef3c7" />
          <circle cx="71" cy="34" r="4" fill="#fef3c7" />
          <circle cx="71" cy="40" r="4" fill="#fef3c7" />
          {/* Torch */}
          <rect x="26" y="64" width="4" height="20" fill="#78350f" />
          <circle cx="28" cy="61" r="5" fill="#fb923c" />
        </svg>
      );
    case 'volcano_spring':
      return (
        <svg viewBox="0 0 110 110" className={className} aria-hidden="true">
          <ellipse cx="55" cy="93" rx="40" ry="10" fill="#0f172a" opacity="0.22" />
          {/* Mountain */}
          <polygon points="18,90 42,34 68,34 92,90" fill="#9a3412" />
          <polygon points="55,34 68,34 92,90 55,90" fill="#7c2d12" />
          {/* Friendly lava crown */}
          <path d="M40 34 Q55 44 70 34 Q63 26 55 28 Q47 26 40 34 Z" fill="#fb923c" />
          <circle cx="55" cy="20" r="4" fill="#fde047" />
          {/* Warm pool */}
          <ellipse cx="55" cy="86" rx="22" ry="7" fill="#38bdf8" />
        </svg>
      );
    case 'cake_castle':
      return (
        <svg viewBox="0 0 110 110" className={className} aria-hidden="true">
          <ellipse cx="55" cy="95" rx="38" ry="10" fill="#831843" opacity="0.2" />
          {/* Cake layers */}
          <rect x="24" y="64" width="62" height="26" rx="8" fill="#fbcfe8" stroke="#ec4899" strokeWidth="2" />
          <rect x="34" y="42" width="42" height="24" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
          {/* Frosting drips */}
          <path d="M24 67 Q34 76 44 67 Q55 76 66 67 Q76 76 86 67 L86 62 L24 62 Z" fill="#f472b6" />
          {/* Cone towers */}
          <polygon points="55,14 40,42 70,42" fill="#ec4899" />
          <circle cx="55" cy="14" r="5" fill="#ef4444" />
          <rect x="49" y="72" width="12" height="18" rx="6" fill="#92400e" />
        </svg>
      );
    case 'choco_river':
      return (
        <svg viewBox="0 0 110 110" className={className} aria-hidden="true">
          <ellipse cx="55" cy="80" rx="44" ry="16" fill="#78350f" />
          <ellipse cx="55" cy="78" rx="38" ry="12" fill="#b45309" />
          {/* Wafer bridge */}
          <path d="M28 74 Q55 50 82 74" fill="none" stroke="#fde68a" strokeWidth="10" strokeLinecap="round" />
          <path d="M28 74 Q55 50 82 74" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
          {/* Sprinkles */}
          <circle cx="36" cy="80" r="2.5" fill="#f472b6" />
          <circle cx="72" cy="82" r="2.5" fill="#38bdf8" />
          <circle cx="55" cy="85" r="2.5" fill="#4ade80" />
        </svg>
      );
    case 'lollipop_grove':
    default:
      return (
        <svg viewBox="0 0 110 110" className={className} aria-hidden="true">
          <ellipse cx="55" cy="95" rx="36" ry="9" fill="#831843" opacity="0.2" />
          {/* Sticks */}
          <rect x="35" y="54" width="5" height="38" rx="2.5" fill="#f8fafc" />
          <rect x="54" y="46" width="6" height="46" rx="3" fill="#f8fafc" />
          <rect x="74" y="58" width="5" height="34" rx="2.5" fill="#f8fafc" />
          {/* Swirl candies */}
          <circle cx="37.5" cy="48" r="14" fill="#ec4899" stroke="#ffffff" strokeWidth="2.5" />
          <circle cx="37.5" cy="48" r="7" fill="none" stroke="#fef08a" strokeWidth="3" />
          <circle cx="57" cy="36" r="17" fill="#a855f7" stroke="#ffffff" strokeWidth="2.5" />
          <circle cx="57" cy="36" r="9" fill="none" stroke="#f9a8d4" strokeWidth="3.5" />
          <circle cx="76.5" cy="52" r="12" fill="#38bdf8" stroke="#ffffff" strokeWidth="2.5" />
          <circle cx="76.5" cy="52" r="6" fill="none" stroke="#ffffff" strokeWidth="2.5" />
          {discovered && <circle cx="57" cy="18" r="4" fill="#facc15" />}
        </svg>
      );
  }
};

/** Distinct vector art for hidden secrets */
export const SecretItemArt: React.FC<{
  item: RealmSecretItem;
  className?: string;
}> = ({ item, className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <circle cx="24" cy="24" r="18" fill={item.accent} opacity="0.32" />
    {item.shape === 'gem' && (
      <polygon
        points="24,6 39,18 33,40 15,40 9,18"
        fill={item.color}
        stroke="#ffffff"
        strokeWidth="2.5"
      />
    )}
    {item.shape === 'scroll' && (
      <g>
        <rect x="11" y="13" width="26" height="22" rx="4" fill="#fef3c7" stroke={item.color} strokeWidth="2.5" />
        <rect x="9" y="11" width="30" height="5" rx="2.5" fill={item.color} />
        <rect x="9" y="32" width="30" height="5" rx="2.5" fill={item.color} />
        <circle cx="24" cy="24" r="4" fill={item.accent} />
      </g>
    )}
    {item.shape === 'feather' && (
      <path
        d="M36 9 C24 10 15 20 12 37 C22 35 33 27 36 9 Z"
        fill={item.color}
        stroke="#ffffff"
        strokeWidth="2.2"
      />
    )}
    {item.shape === 'pearl' && (
      <g>
        <path d="M10 30 Q24 40 38 30 Q35 16 24 14 Q13 16 10 30 Z" fill={item.color} stroke="#ffffff" strokeWidth="2" />
        <circle cx="24" cy="25" r="7" fill="#ffffff" />
        <circle cx="22" cy="23" r="2" fill={item.accent} />
      </g>
    )}
    {item.shape === 'amber' && (
      <g>
        <ellipse cx="24" cy="25" rx="12" ry="15" fill={item.color} stroke="#ffffff" strokeWidth="2.5" />
        <circle cx="20" cy="20" r="3" fill={item.accent} />
      </g>
    )}
    {item.shape === 'candy' && (
      <g>
        <rect x="22" y="25" width="4" height="16" rx="2" fill="#ffffff" />
        <circle cx="24" cy="20" r="11" fill={item.color} stroke="#ffffff" strokeWidth="2.5" />
        <circle cx="24" cy="20" r="5" fill="none" stroke={item.accent} strokeWidth="3" />
      </g>
    )}
  </svg>
);

const AMBIENT_PARTICLES = [
  { id: 0, left: 12, top: 22, delay: '0s', dur: '5.5s' },
  { id: 1, left: 26, top: 64, delay: '0.8s', dur: '6.2s' },
  { id: 2, left: 41, top: 18, delay: '1.6s', dur: '4.9s' },
  { id: 3, left: 58, top: 72, delay: '0.4s', dur: '6.8s' },
  { id: 4, left: 73, top: 28, delay: '1.9s', dur: '5.3s' },
  { id: 5, left: 87, top: 54, delay: '1.1s', dur: '6.0s' }
];

export const IsometricWorldStage: React.FC<IsometricWorldStageProps> = ({
  student,
  realm,
  save,
  onSelectLandmark,
  onCollectSecret,
  onTalkNpc,
  onOpenChest,
  onPortalActivate
}) => {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [playerPos, setPlayerPos] = useState<{ x: number; y: number }>(realm.startPos);
  const [facing, setFacing] = useState<1 | -1>(1);
  const [ripple, setRipple] = useState<{ x: number; y: number; key: number } | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Reset player position when switching realms
  useEffect(() => {
    setPlayerPos(realm.startPos);
    setFacing(1);
    setRipple(null);
  }, [realm.id, realm.startPos]);

  const points = getRealmExplorationPoints(realm, save);
  const chestOpened = save.openedChests.includes(realm.chest.id);
  const chestReady = isRealmChestReady(realm, save);
  const npcDone = save.completedNpcs.includes(realm.npc.id);
  const realmIdx = ADVENTURE_REALMS.findIndex((r) => r.id === realm.id);
  const nextRealm = realmIdx >= 0 && realmIdx < ADVENTURE_REALMS.length - 1 ? ADVENTURE_REALMS[realmIdx + 1] : null;
  const nextUnlocked = nextRealm ? save.unlockedRealms.includes(nextRealm.id) : false;

  const moveAvatarTo = (x: number, y: number) => {
    const clampedX = Math.max(12, Math.min(88, x));
    const clampedY = Math.max(24, Math.min(82, y));
    setFacing(clampedX < playerPos.x - 1 ? -1 : clampedX > playerPos.x + 1 ? 1 : facing);
    setPlayerPos({ x: clampedX, y: clampedY });
    setRipple({ x: clampedX, y: clampedY, key: Date.now() });
  };

  const handleGroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    soundManager.play('click');
    moveAvatarTo(xPct, yPct);
  };

  // Winding path through startPos -> lm0 -> lm1 -> lm2 -> chest -> portalPos (in 0..1000 x 0..600 SVG space)
  const windingPath = useMemo(() => {
    const pts = [
      realm.startPos,
      realm.landmarks[1] ? { x: realm.landmarks[1].x, y: realm.landmarks[1].y + 8 } : realm.startPos,
      realm.landmarks[0] ? { x: realm.landmarks[0].x, y: realm.landmarks[0].y + 10 } : realm.portalPos,
      realm.landmarks[2] ? { x: realm.landmarks[2].x, y: realm.landmarks[2].y + 8 } : realm.portalPos,
      { x: realm.chest.x, y: realm.chest.y + 6 },
      realm.portalPos
    ];
    const scaled = pts.map((p) => ({ x: p.x * 10, y: p.y * 6 }));
    let d = `M ${scaled[0].x} ${scaled[0].y}`;
    for (let i = 1; i < scaled.length; i++) {
      const prev = scaled[i - 1];
      const curr = scaled[i];
      const cx1 = (prev.x + curr.x) / 2;
      const cy1 = prev.y;
      const cx2 = (prev.x + curr.x) / 2;
      const cy2 = curr.y;
      d += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${curr.x} ${curr.y}`;
    }
    return d;
  }, [realm]);

  const remainingSecrets = realm.secrets.filter((s) => !save.collectedSecrets.includes(s.id)).length;

  return (
    <div
      ref={stageRef}
      className={
        isFullscreen
          ? 'fixed inset-0 z-[70] bg-slate-950/95 p-2 sm:p-4 flex flex-col justify-center'
          : 'relative'
      }
    >
      <div
        className={`relative w-full overflow-hidden rounded-3xl border-4 border-white dark:border-slate-700 shadow-2xl select-none ${
          isFullscreen ? 'flex-1 max-w-[1440px] mx-auto w-full' : ''
        }`}
        style={{
          background: `linear-gradient(180deg, ${realm.palette.skyTop} 0%, ${realm.palette.skyBottom} 100%)`
        }}
      >
        {/* Top Stage HUD overlay (compact, z-30, never blocks middle play surface) */}
        <div className="relative z-30 flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 pt-3 pb-1 pointer-events-none">
          <div className="pointer-events-auto inline-flex items-center gap-2 rounded-2xl bg-slate-900/75 text-white px-3 py-1.5 backdrop-blur-sm shadow-md">
            <Compass className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="text-xs sm:text-sm font-black whitespace-nowrap">
              {realm.code}. {realm.name}
            </span>
            <span aria-hidden="true" className="text-white/40">·</span>
            <span className="text-xs font-bold text-amber-200 tabular-nums whitespace-nowrap">
              {points}/8 điểm
            </span>
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            {remainingSecrets > 0 && (
              <div className="hidden sm:inline-flex items-center gap-1.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 px-3 py-1.5 text-xs font-bold shadow">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Còn {remainingSecrets} vật phẩm ẩn trên đảo</span>
              </div>
            )}
            <button
              type="button"
              onClick={() => {
                soundManager.play('click');
                setIsFullscreen((v) => !v);
              }}
              aria-label={isFullscreen ? 'Thu gọn bản đồ' : 'Mở rộng toàn màn hình'}
              className="p-2 rounded-xl bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white shadow hover:scale-105 transition-transform cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Scrollable wrapper on narrow phones so interactive 2.5D island objects stay roomy */}
        <div className="w-full overflow-x-auto overscroll-x-contain">
          <div
            onClick={handleGroundClick}
            role="application"
            aria-label={`Bản đồ thám hiểm ${realm.name}. Chạm vào mặt đảo để di chuyển nhân vật hoặc chạm vào công trình, kho báu, NPC.`}
            className={`relative min-w-[660px] sm:min-w-0 w-full cursor-pointer ${
              isFullscreen ? 'h-[72dvh] sm:h-[80dvh]' : 'h-[390px] sm:h-[470px] lg:h-[550px]'
            }`}
            style={{ isolation: 'isolate' }}
          >
            {/* LAYER 1: Floating clouds, isometric 3D island terrain, water & winding stone path */}
            <svg
              viewBox="0 0 1000 600"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full z-[1] pointer-events-none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id={`isoTop_${realm.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={realm.palette.grassLight} />
                  <stop offset="100%" stopColor={realm.palette.grassTop} />
                </linearGradient>
                <linearGradient id={`isoCliffL_${realm.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={realm.palette.cliffFront} />
                  <stop offset="100%" stopColor={realm.palette.cliffSide} />
                </linearGradient>
              </defs>

              {/* Soft surrounding cloud bed */}
              <g opacity="0.88" fill={realm.palette.cloudTint}>
                <ellipse cx="140" cy="110" rx="110" ry="34" />
                <ellipse cx="210" cy="100" rx="70" ry="28" />
                <ellipse cx="830" cy="120" rx="125" ry="36" />
                <ellipse cx="760" cy="108" rx="68" ry="26" />
                <ellipse cx="110" cy="495" rx="135" ry="44" />
                <ellipse cx="885" cy="505" rx="140" ry="44" />
                <ellipse cx="495" cy="560" rx="220" ry="42" />
              </g>

              {/* Main 2.5D Isometric Island Rock & Cliff Depth */}
              <polygon
                points="85,335 495,525 915,320 915,388 495,575 85,392"
                fill={`url(#isoCliffL_${realm.id})`}
              />
              <polygon
                points="85,335 495,525 495,575 85,392"
                fill={realm.palette.cliffFront}
                opacity="0.92"
              />
              <polygon
                points="495,525 915,320 915,388 495,575"
                fill={realm.palette.cliffSide}
                opacity="0.95"
              />
              {/* Rocky facets on cliff */}
              <polygon points="165,375 215,400 200,448 148,422" fill="#000000" opacity="0.1" />
              <polygon points="340,455 410,488 390,536 325,500" fill="#000000" opacity="0.12" />
              <polygon points="620,468 690,432 675,495 605,526" fill="#ffffff" opacity="0.08" />

              {/* Top Isometric Grass / Surface Deck */}
              <polygon
                points="85,335 495,125 915,320 495,525"
                fill={`url(#isoTop_${realm.id})`}
                stroke="#ffffff"
                strokeOpacity="0.45"
                strokeWidth="5"
              />
              {/* Subtle terraced plateau in upper center */}
              <polygon
                points="285,295 495,190 715,285 495,395"
                fill="#ffffff"
                opacity="0.16"
              />

              {/* Realm water stream / pond / choco river feature */}
              <path
                d="M 540 315 Q 670 335 765 395 Q 660 440 535 378 Z"
                fill={realm.palette.waterColor}
                opacity="0.82"
              />
              <path
                d="M 575 342 Q 660 362 715 392"
                fill="none"
                stroke="#ffffff"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.5"
              />

              {/* Winding stepped cobblestone / rainbow path */}
              <path
                d={windingPath}
                fill="none"
                stroke={realm.palette.pathEdge}
                strokeWidth="34"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.32"
              />
              <path
                d={windingPath}
                fill="none"
                stroke={realm.palette.pathStone}
                strokeWidth="24"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={windingPath}
                fill="none"
                stroke="#ffffff"
                strokeWidth="4"
                strokeDasharray="10 14"
                strokeLinecap="round"
                opacity="0.7"
              />

              {/* Decorative Isometric Trees / Bushes around borders */}
              {[
                { x: 185, y: 285, c: '#16a34a' },
                { x: 255, y: 225, c: '#22c55e' },
                { x: 760, y: 265, c: '#15803d' },
                { x: 830, y: 315, c: '#22c55e' },
                { x: 470, y: 475, c: '#16a34a' }
              ].map((t, idx) => (
                <g key={idx} transform={`translate(${t.x} ${t.y})`}>
                  <ellipse cx="0" cy="14" rx="15" ry="6" fill="#0f172a" opacity="0.18" />
                  <rect x="-4" y="0" width="8" height="14" rx="2" fill="#78350f" />
                  <circle cx="0" cy="-8" r="15" fill={realm.id === 'candy_land' ? '#f472b6' : t.c} />
                  <circle cx="-5" cy="-12" r="7" fill="#ffffff" opacity="0.22" />
                </g>
              ))}
            </svg>

            {/* LAYER 2: Realm Ambient Particles (sparkles / leaves / bubbles / stars) */}
            <div className="absolute inset-0 z-[5] pointer-events-none" aria-hidden="true">
              {AMBIENT_PARTICLES.map((p) => (
                <span
                  key={p.id}
                  className="absolute w-2.5 h-2.5 rounded-full hsv-anim-float"
                  style={{
                    left: `${p.left}%`,
                    top: `${p.top}%`,
                    backgroundColor: realm.palette.accentGlow,
                    boxShadow: `0 0 10px ${realm.palette.accentGlow}`,
                    animationDelay: p.delay,
                    ['--d' as string]: p.dur
                  }}
                />
              ))}
            </div>

            {/* Click Ground Ripple */}
            {ripple && (
              <span
                key={ripple.key}
                className="absolute z-[8] -translate-x-1/2 -translate-y-1/2 w-10 h-6 rounded-full border-2 border-white bg-white/30 pointer-events-none animate-ping"
                style={{ left: `${ripple.x}%`, top: `${ripple.y}%` }}
                aria-hidden="true"
              />
            )}

            {/* LAYER 3A: 3 Interactive Landmarks */}
            {realm.landmarks.map((lm) => {
              const discovered = save.discoveredLandmarks.includes(lm.id);
              return (
                <button
                  key={lm.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    soundManager.play('click');
                    moveAvatarTo(lm.x, lm.y + 8);
                    onSelectLandmark(lm);
                  }}
                  style={{ left: `${lm.x}%`, top: `${lm.y}%` }}
                  aria-label={`Địa điểm ${lm.name}${discovered ? ' (đã khám phá)' : ' (chạm để khám phá)'}`}
                  className="absolute z-[12] -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300 rounded-2xl"
                >
                  <div className="relative transition-transform duration-200 group-hover:-translate-y-1.5 group-hover:scale-105 group-active:scale-95">
                    <LandmarkArt
                      artType={lm.artType}
                      discovered={discovered}
                      className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-[0_10px_14px_rgba(15,23,42,0.28)]"
                    />
                    {discovered ? (
                      <span
                        title="Đã khám phá"
                        className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white border-2 border-white shadow flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-md bg-amber-400 text-slate-900 border-2 border-white text-[10px] font-black shadow hsv-anim-hop">
                        Mới
                      </span>
                    )}
                  </div>
                  <span className="mt-0.5 px-2.5 py-0.5 rounded-lg bg-slate-900/80 text-white text-[11px] sm:text-xs font-extrabold shadow whitespace-nowrap group-hover:bg-amber-400 group-hover:text-slate-900 transition-colors">
                    {lm.name}
                  </span>
                </button>
              );
            })}

            {/* LAYER 3B: 3 Hidden Secret Collectibles */}
            {realm.secrets.map((sec) => {
              const collected = save.collectedSecrets.includes(sec.id);
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    moveAvatarTo(sec.x, sec.y + 4);
                    onCollectSecret(sec);
                  }}
                  style={{ left: `${sec.x}%`, top: `${sec.y}%` }}
                  aria-label={collected ? `${sec.name} (đã thu thập)` : `Vật phẩm bí mật ${sec.name}`}
                  className={`absolute z-[14] -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300 rounded-xl ${
                    collected ? 'opacity-55 hover:opacity-90' : ''
                  }`}
                >
                  <div className={collected ? '' : 'hsv-anim-bob'}>
                    <SecretItemArt
                      item={sec}
                      className="w-9 h-9 sm:w-10 sm:h-10 drop-shadow-[0_4px_8px_rgba(0,0,0,0.28)] group-hover:scale-125 transition-transform"
                    />
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 text-[10px] font-bold shadow whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                    {collected ? `✓ ${sec.name}` : sec.name}
                  </span>
                </button>
              );
            })}

            {/* LAYER 3C: Realm NPC */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                soundManager.play('click');
                moveAvatarTo(realm.npc.x, realm.npc.y + 5);
                onTalkNpc();
              }}
              style={{ left: `${realm.npc.x}%`, top: `${realm.npc.y}%` }}
              aria-label={`Nói chuyện với ${realm.npc.name}`}
              className="absolute z-[15] -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300 rounded-2xl"
            >
              <span
                className={`mb-0.5 px-2 py-0.5 rounded-lg text-[10px] font-black shadow border border-white whitespace-nowrap ${
                  npcDone
                    ? 'bg-emerald-500 text-white'
                    : 'bg-amber-300 text-slate-900 hsv-anim-hop'
                }`}
              >
                {npcDone ? '✓ Đã xong nhiệm vụ' : '! Nhiệm vụ vui'}
              </span>
              <svg viewBox="0 0 64 76" className="w-12 h-14 sm:w-14 sm:h-16 drop-shadow-lg group-hover:scale-110 transition-transform" aria-hidden="true">
                <ellipse cx="32" cy="70" rx="18" ry="5" fill="#0f172a" opacity="0.24" />
                <path d="M18 68 Q20 42 32 42 Q44 42 46 68 Z" fill={realm.npc.robeColor} />
                <circle cx="32" cy="30" r="14" fill="#fde6d2" />
                <path d="M16 24 Q32 10 48 24 Z" fill={realm.npc.hatColor} />
                <circle cx="27" cy="30" r="2" fill="#0f172a" />
                <circle cx="37" cy="30" r="2" fill="#0f172a" />
                <path d="M28 36 Q32 39 36 36" fill="none" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="px-2 py-0.5 rounded-lg bg-slate-900/80 text-white text-[10px] sm:text-[11px] font-bold shadow whitespace-nowrap">
                {realm.npc.name}
              </span>
            </button>

            {/* LAYER 3D: Interactive Treasure Chest */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                moveAvatarTo(realm.chest.x, realm.chest.y + 5);
                onOpenChest();
              }}
              style={{ left: `${realm.chest.x}%`, top: `${realm.chest.y}%` }}
              aria-label={realm.chest.name}
              className="absolute z-[14] -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300 rounded-2xl"
            >
              <svg
                viewBox="0 0 72 64"
                className={`w-14 h-12 sm:w-16 sm:h-14 drop-shadow-lg transition-transform group-hover:scale-110 ${
                  chestReady && !chestOpened ? 'hsv-anim-hop' : ''
                }`}
                aria-hidden="true"
              >
                <ellipse cx="36" cy="56" rx="26" ry="7" fill="#0f172a" opacity="0.24" />
                {/* Chest body */}
                <rect x="14" y="28" width="44" height="26" rx="6" fill={chestOpened ? '#92400e' : '#b45309'} stroke="#facc15" strokeWidth="2.5" />
                {/* Chest lid */}
                <path
                  d={chestOpened ? 'M12 24 Q36 6 60 24 L56 30 L16 30 Z' : 'M12 30 Q36 14 60 30 Z'}
                  fill="#d97706"
                  stroke="#fde047"
                  strokeWidth="2.5"
                />
                <rect x="31" y="28" width="10" height="12" rx="3" fill="#facc15" />
                {chestReady && !chestOpened && (
                  <circle cx="36" cy="14" r="6" fill="#fef08a" opacity="0.85" />
                )}
              </svg>
              <span
                className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold shadow whitespace-nowrap ${
                  chestOpened
                    ? 'bg-emerald-600 text-white'
                    : chestReady
                    ? 'bg-amber-300 text-slate-900'
                    : 'bg-slate-800/85 text-slate-200'
                }`}
              >
                {chestOpened ? '✓ Đã mở rương' : chestReady ? 'Mở rương báu!' : 'Rương (Cần 3 điểm)'}
              </span>
            </button>

            {/* LAYER 3E: Swirling Teleport Portal */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                moveAvatarTo(realm.portalPos.x, realm.portalPos.y + 6);
                onPortalActivate();
              }}
              style={{ left: `${realm.portalPos.x}%`, top: `${realm.portalPos.y}%` }}
              aria-label={nextRealm ? `Cổng dịch chuyển tới ${nextRealm.name}` : 'Cổng Hoàng Gia Kẹo Ngọt'}
              className="absolute z-[13] -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-300 rounded-2xl"
            >
              <svg viewBox="0 0 80 88" className="w-16 h-18 sm:w-20 sm:h-22 drop-shadow-[0_0_16px_rgba(56,189,248,0.85)] group-hover:scale-110 transition-transform" aria-hidden="true">
                <ellipse cx="40" cy="80" rx="28" ry="8" fill="#0f172a" opacity="0.24" />
                <path d="M16 76 Q14 14 40 12 Q66 14 64 76 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="2.5" />
                <ellipse cx="40" cy="46" rx="18" ry="26" fill="#0284c7" />
                <ellipse cx="40" cy="46" rx="13" ry="20" fill="#38bdf8" />
                <ellipse cx="40" cy="46" rx="7" ry="12" fill="#e0f2fe" />
                <circle cx="40" cy="14" r="4" fill="#facc15" />
              </svg>
              <span className="px-2 py-0.5 rounded-lg bg-sky-600 text-white text-[10px] sm:text-[11px] font-black shadow whitespace-nowrap">
                {nextRealm
                  ? nextUnlocked
                    ? `Sang ${nextRealm.shortName}`
                    : `Cổng -> ${nextRealm.shortName}`
                  : 'Cổng Cổ Tích'}
              </span>
            </button>

            {/* LAYER 4: Live Player Character walking directly on the 2.5D island */}
            <div
              className="absolute z-[20] -translate-x-1/2 -translate-y-[82%] pointer-events-none flex flex-col items-center"
              style={{
                left: `${playerPos.x}%`,
                top: `${playerPos.y}%`,
                transition: 'left 480ms cubic-bezier(0.22, 1, 0.36, 1), top 480ms cubic-bezier(0.22, 1, 0.36, 1)'
              }}
            >
              <span className="mb-0.5 px-2 py-0.5 rounded-lg bg-amber-300 text-slate-900 text-[10px] font-black shadow border border-white whitespace-nowrap">
                {student.name || 'Bạn'}
              </span>
              <AvatarRenderer
                config={student.avatarConfig}
                size="sm"
                animated={true}
                showPet={true}
                showAura={true}
                showVehicle={false}
                facing={facing}
              />
            </div>
          </div>
        </div>

        {/* Bottom quick instruction bar inside stage */}
        <div className="relative z-30 flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2 bg-slate-900/70 text-white/95 text-xs backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Volume2 className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>Chạm vào mặt đảo để dạo chơi · Chạm vào công trình, vật phẩm ẩn, NPC, rương báu hoặc cổng để khám phá!</span>
          </div>
          <span className="font-bold text-amber-200 whitespace-nowrap tabular-nums">
            Huy hiệu: {realm.badgeName}
          </span>
        </div>
      </div>
    </div>
  );
};
