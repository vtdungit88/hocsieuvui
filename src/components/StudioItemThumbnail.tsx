import React from 'react';
import { ItemCategory, ItemRarity } from '../types';

interface StudioItemThumbnailProps {
  renderType: string;
  category: ItemCategory;
  rarity: ItemRarity;
  size?: 'sm' | 'md' | 'lg';
}

const RARITY_BG: Record<ItemRarity, string> = {
  base: 'from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900',
  popular: 'from-sky-50 to-blue-100 dark:from-sky-950/60 dark:to-blue-900/50',
  vip: 'from-amber-50 to-orange-100 dark:from-amber-950/60 dark:to-orange-900/40',
  mythic:
    'from-violet-100 via-fuchsia-50 to-cyan-100 dark:from-violet-950/70 dark:via-purple-900/50 dark:to-cyan-950/60'
};

export const StudioItemThumbnail: React.FC<StudioItemThumbnailProps> = ({
  renderType,
  category,
  rarity,
  size = 'md'
}) => {
  const dim = size === 'lg' ? 'w-24 h-24' : size === 'sm' ? 'w-11 h-11' : 'w-16 h-16';

  const renderArtwork = () => {
    // BACKDROPS (10)
    if (category === 'backdrop') {
      const palette: Record<string, { sky: string; ground: string; accent: string; sub: string }> = {
        bg_classroom: { sky: '#DBEAFE', ground: '#F59E0B', accent: '#15803D', sub: '#FFFFFF' },
        bg_forest: { sky: '#38BDF8', ground: '#16A34A', accent: '#A5F3FC', sub: '#15803D' },
        bg_my_room: { sky: '#FEF3C7', ground: '#D97706', accent: '#2563EB', sub: '#FDE047' },
        bg_ocean: { sky: '#0284C7', ground: '#EAB308', accent: '#F43F5E', sub: '#38BDF8' },
        bg_lab: { sky: '#1E3A8A', ground: '#0F172A', accent: '#38BDF8', sub: '#22D3EE' },
        bg_magic_forest: { sky: '#312E81', ground: '#065F46', accent: '#A855F7', sub: '#FDE047' },
        bg_castle: { sky: '#60A5FA', ground: '#22C55E', accent: '#E2E8F0', sub: '#EF4444' },
        bg_arena: { sky: '#B45309', ground: '#F59E0B', accent: '#FEF08A', sub: '#DC2626' },
        bg_future_city: { sky: '#0F172A', ground: '#1E293B', accent: '#22D3EE', sub: '#A855F7' },
        bg_galaxy: { sky: '#1E1B4B', ground: '#312E81', accent: '#FDE047', sub: '#38BDF8' }
      };
      const c = palette[renderType] || palette.bg_classroom;
      return (
        <g>
          <rect x="10" y="14" width="60" height="52" rx="10" fill={c.sky} stroke="#FFFFFF" strokeWidth="2.5" />
          <path d="M10 48 Q40 40 70 48 L70 56 Q70 66 60 66 L20 66 Q10 66 10 56 Z" fill={c.ground} />
          {renderType === 'bg_my_room' ? (
            <>
              <rect x="28" y="20" width="24" height="18" rx="3" fill="#BAE6FD" stroke="#92400E" strokeWidth="2" />
              <rect x="14" y="42" width="22" height="12" rx="3" fill="#3B82F6" />
              <rect x="46" y="38" width="18" height="14" rx="2" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
            </>
          ) : renderType === 'bg_castle' ? (
            <>
              <rect x="28" y="26" width="24" height="24" fill="#E2E8F0" />
              <polygon points="26,26 33,15 40,26" fill="#EF4444" />
              <polygon points="40,26 47,15 54,26" fill="#EF4444" />
              <rect x="36" y="38" width="8" height="12" rx="4" fill="#78350F" />
            </>
          ) : renderType === 'bg_future_city' ? (
            <>
              <rect x="16" y="28" width="11" height="24" fill="#334155" stroke="#22D3EE" strokeWidth="1.5" />
              <rect x="33" y="20" width="14" height="32" fill="#1E293B" stroke="#A855F7" strokeWidth="1.5" />
              <rect x="52" y="26" width="11" height="26" fill="#334155" stroke="#38BDF8" strokeWidth="1.5" />
            </>
          ) : renderType === 'bg_ocean' ? (
            <>
              <circle cx="24" cy="24" r="3" fill="#BAE6FD" />
              <circle cx="32" cy="30" r="2" fill="#BAE6FD" />
              <ellipse cx="50" cy="32" rx="7" ry="4" fill="#FACC15" />
              <polygon points="56,32 62,28 62,36" fill="#F97316" />
              <path d="M18 52 Q22 40 26 52 M24 52 Q28 42 32 52" stroke="#F43F5E" strokeWidth="3" fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="26" cy="29" r="6" fill={c.accent} />
              <rect x="40" y="25" width="22" height="14" rx="3" fill={c.sub} opacity="0.85" />
            </>
          )}
        </g>
      );
    }

    // AURAS (10)
    if (category === 'aura') {
      if (renderType === 'aura_wings_angel') {
        return (
          <g>
            <path d="M38 44 Q16 20 12 36 Q14 48 24 54 Q34 52 38 48 Z" fill="#FFFFFF" stroke="#FDE047" strokeWidth="2" />
            <path d="M42 44 Q64 20 68 36 Q66 48 56 54 Q46 52 42 48 Z" fill="#FFFFFF" stroke="#FDE047" strokeWidth="2" />
            <ellipse cx="40" cy="22" rx="11" ry="4" fill="none" stroke="#FACC15" strokeWidth="3" />
          </g>
        );
      }
      if (renderType === 'aura_wings_cyber') {
        return (
          <g>
            <polygon points="38,44 10,20 16,38 12,48 28,54" fill="#06B6D4" stroke="#FACC15" strokeWidth="2" />
            <polygon points="42,44 70,20 64,38 68,48 52,54" fill="#06B6D4" stroke="#FACC15" strokeWidth="2" />
            <circle cx="40" cy="40" r="6" fill="#FDE047" stroke="#0F172A" strokeWidth="1.5" />
          </g>
        );
      }
      if (renderType === 'aura_rainbow') {
        return (
          <g>
            <path d="M14 54 A26 26 0 0 1 66 54" fill="none" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
            <path d="M19 54 A21 21 0 0 1 61 54" fill="none" stroke="#FACC15" strokeWidth="4" strokeLinecap="round" />
            <path d="M24 54 A16 16 0 0 1 56 54" fill="none" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" />
            <path d="M29 54 A11 11 0 0 1 51 54" fill="none" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />
          </g>
        );
      }
      if (renderType === 'aura_lightning') {
        return (
          <g>
            <circle cx="40" cy="40" r="24" fill="none" stroke="#38BDF8" strokeWidth="2.5" opacity="0.6" />
            <polygon points="44,12 28,42 40,42 34,66 54,34 41,34" fill="#FACC15" stroke="#0284C7" strokeWidth="2" strokeLinejoin="round" />
          </g>
        );
      }
      if (renderType === 'aura_ice') {
        return (
          <g>
            <line x1="40" y1="14" x2="40" y2="66" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="17" y1="27" x2="63" y2="53" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="63" y1="27" x2="17" y2="53" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="40" cy="40" r="7" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
          </g>
        );
      }
      if (renderType === 'aura_footsteps') {
        return (
          <g>
            <ellipse cx="40" cy="54" rx="26" ry="8" fill="none" stroke="#22D3EE" strokeWidth="3" />
            <ellipse cx="30" cy="34" rx="7" ry="11" fill="#FDE047" stroke="#F59E0B" strokeWidth="1.5" transform="rotate(-12 30 34)" />
            <ellipse cx="50" cy="42" rx="7" ry="11" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" transform="rotate(12 50 42)" />
          </g>
        );
      }
      const auraColor =
        renderType === 'aura_flame'
          ? '#F59E0B'
          : renderType === 'aura_electric'
          ? '#0EA5E9'
          : renderType === 'aura_sparkle'
          ? '#EAB308'
          : '#94A3B8';
      return (
        <g>
          <circle
            cx="40"
            cy="40"
            r="24"
            fill="none"
            stroke={auraColor}
            strokeWidth="3"
            strokeDasharray={renderType === 'aura_none' ? '4 4' : 'none'}
            opacity="0.85"
          />
          <circle cx="40" cy="40" r="16" fill="none" stroke={auraColor} strokeWidth="2" opacity="0.5" />
          {renderType !== 'aura_none' && (
            <>
              <polygon points="40,10 43,18 51,18 44,23 47,30 40,25 33,30 36,23 29,18 37,18" fill={auraColor} />
              <circle cx="18" cy="52" r="3" fill={auraColor} />
              <circle cx="62" cy="52" r="3" fill={auraColor} />
            </>
          )}
        </g>
      );
    }

    // OUTFITS (20)
    if (category === 'outfit') {
      const outfitColors: Record<string, { main: string; trim: string; badge: string }> = {
        uniform: { main: '#FFFFFF', trim: '#DC2626', badge: '#2563EB' },
        scout: { main: '#D97706', trim: '#78350F', badge: '#10B981' },
        sport: { main: '#EA580C', trim: '#1E293B', badge: '#FFFFFF' },
        hoodie: { main: '#4F46E5', trim: '#312E81', badge: '#FEF08A' },
        racer: { main: '#2563EB', trim: '#FFFFFF', badge: '#FACC15' },
        ranger_red: { main: '#DC2626', trim: '#FFFFFF', badge: '#FACC15' },
        lab: { main: '#F8FAFC', trim: '#0284C7', badge: '#06B6D4' },
        detective: { main: '#334155', trim: '#1E293B', badge: '#DC2626' },
        ninja: { main: '#0F172A', trim: '#DC2626', badge: '#94A3B8' },
        varsity: { main: '#1E3A8A', trim: '#FEF3C7', badge: '#F59E0B' },
        hero_core: { main: '#B91C1C', trim: '#FACC15', badge: '#38BDF8' },
        knight: { main: '#CBD5E1', trim: '#2563EB', badge: '#FACC15' },
        hero_shield: { main: '#1D4ED8', trim: '#EF4444', badge: '#FFFFFF' },
        aodai_tech: { main: '#B91C1C', trim: '#F59E0B', badge: '#FEF08A' },
        astronaut: { main: '#F8FAFC', trim: '#F97316', badge: '#38BDF8' },
        scholar: { main: '#6B21A8', trim: '#F59E0B', badge: '#FDE047' },
        wizard_ice: { main: '#0E7490', trim: '#BAE6FD', badge: '#FFFFFF' },
        ranger_gold: { main: '#EAB308', trim: '#1E293B', badge: '#EF4444' },
        cyber: { main: '#0F172A', trim: '#06B6D4', badge: '#38BDF8' },
        mecha_pilot: { main: '#1E40AF', trim: '#FACC15', badge: '#22D3EE' }
      };
      const c = outfitColors[renderType] || outfitColors.uniform;
      return (
        <g>
          {/* Optional cape accent for hero/knight/wizard */}
          {(renderType === 'hero_core' || renderType === 'knight' || renderType === 'scholar' || renderType === 'wizard_ice') && (
            <path d="M22 20 L12 60 L68 60 L58 20 Z" fill={c.trim} opacity="0.45" />
          )}
          {/* Sleeves */}
          <path d="M16 24 L27 18 L27 38 L13 38 Z" fill={c.trim} />
          <path d="M64 24 L53 18 L53 38 L67 38 Z" fill={c.trim} />
          {/* Torso */}
          <path d="M24 18 L56 18 L52 64 L28 64 Z" fill={c.main} stroke="#94A3B8" strokeWidth="1.5" />
          {/* Collar / Sash */}
          <polygon points="33,18 40,30 47,18" fill={c.trim} />
          {renderType === 'hero_core' || renderType === 'mecha_pilot' ? (
            <polygon points="40,34 47,42 40,50 33,42" fill={c.badge} stroke="#FFFFFF" strokeWidth="1.5" />
          ) : (
            <circle cx="40" cy="43" r="7" fill={c.badge} />
          )}
        </g>
      );
    }

    // HANDHELDS (17)
    if (category === 'handheld') {
      if (renderType === 'pencil') {
        return (
          <g transform="rotate(-35 40 40)">
            <rect x="35" y="14" width="10" height="42" rx="2" fill="#F59E0B" />
            <rect x="35" y="14" width="10" height="7" rx="1" fill="#F43F5E" />
            <polygon points="35,56 45,56 40,67" fill="#FED7AA" />
            <polygon points="38,62 42,62 40,67" fill="#1E293B" />
          </g>
        );
      }
      if (renderType === 'ruler') {
        return (
          <g transform="rotate(-25 40 40)">
            <rect x="32" y="12" width="16" height="56" rx="4" fill="#06B6D4" stroke="#0E7490" strokeWidth="2" />
            <line x1="34" y1="22" x2="42" y2="22" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="34" y1="32" x2="40" y2="32" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="34" y1="42" x2="42" y2="42" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="34" y1="52" x2="40" y2="52" stroke="#FFFFFF" strokeWidth="2" />
          </g>
        );
      }
      if (renderType === 'star_wand') {
        return (
          <g>
            <line x1="22" y1="62" x2="48" y2="32" stroke="#EC4899" strokeWidth="5" strokeLinecap="round" />
            <polygon points="50,12 54,23 66,23 56,30 60,41 50,34 40,41 44,30 34,23 46,23" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
          </g>
        );
      }
      if (renderType === 'backpack_rocket') {
        return (
          <g>
            <rect x="14" y="34" width="10" height="24" rx="4" fill="#94A3B8" />
            <rect x="56" y="34" width="10" height="24" rx="4" fill="#94A3B8" />
            <polygon points="15,58 23,58 19,68" fill="#F59E0B" />
            <polygon points="57,58 65,58 61,68" fill="#F59E0B" />
            <rect x="22" y="18" width="36" height="42" rx="9" fill="#2563EB" stroke="#1E3A8A" strokeWidth="2" />
            <rect x="28" y="36" width="24" height="16" rx="4" fill="#FACC15" />
          </g>
        );
      }
      if (renderType === 'camera') {
        return (
          <g>
            <rect x="16" y="24" width="48" height="34" rx="7" fill="#1E293B" stroke="#94A3B8" strokeWidth="2" />
            <rect x="30" y="18" width="20" height="8" rx="3" fill="#334155" />
            <circle cx="40" cy="41" r="11" fill="#38BDF8" stroke="#E2E8F0" strokeWidth="3" />
            <circle cx="40" cy="41" r="5" fill="#0F172A" />
            <circle cx="55" cy="31" r="3" fill="#FACC15" />
          </g>
        );
      }
      if (renderType === 'micro') {
        return (
          <g transform="rotate(-25 40 40)">
            <rect x="35" y="32" width="10" height="34" rx="4" fill="#1E293B" stroke="#FACC15" strokeWidth="1.5" />
            <circle cx="40" cy="24" r="12" fill="#CBD5E1" stroke="#475569" strokeWidth="2" />
            <line x1="30" y1="24" x2="50" y2="24" stroke="#64748B" strokeWidth="2" />
          </g>
        );
      }
      if (renderType === 'magnifier') {
        return (
          <g>
            <line x1="48" y1="48" x2="64" y2="64" stroke="#78350F" strokeWidth="7" strokeLinecap="round" />
            <circle cx="36" cy="36" r="18" fill="#BAE6FD" stroke="#64748B" strokeWidth="4" />
            <path d="M27 29 Q32 23 39 25" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>
        );
      }
      if (renderType === 'beaker') {
        return (
          <g>
            <path d="M26 16 L38 16 L38 30 L48 56 Q49 62 42 62 L22 62 Q15 62 16 56 L26 30 Z" fill="#A5F3FC" stroke="#0284C7" strokeWidth="2" />
            <path d="M20 48 L44 48 L46 56 Q46 60 41 60 L23 60 Q18 60 18 56 Z" fill="#10B981" />
            <rect x="52" y="24" width="12" height="38" rx="6" fill="#FDE047" stroke="#D97706" strokeWidth="2" />
            <circle cx="32" cy="40" r="3" fill="#FFFFFF" />
          </g>
        );
      }
      if (renderType === 'casio') {
        return (
          <g>
            <rect x="23" y="12" width="34" height="56" rx="5" fill="#0F172A" stroke="#3B82F6" strokeWidth="2" />
            <rect x="28" y="17" width="24" height="13" rx="2" fill="#E2E8F0" />
            <circle cx="31" cy="40" r="3" fill="#38BDF8" />
            <circle cx="40" cy="40" r="3" fill="#38BDF8" />
            <circle cx="49" cy="40" r="3" fill="#38BDF8" />
            <circle cx="31" cy="50" r="3" fill="#94A3B8" />
            <circle cx="40" cy="50" r="3" fill="#94A3B8" />
            <circle cx="49" cy="50" r="3" fill="#EF4444" />
          </g>
        );
      }
      if (renderType === 'guitar') {
        return (
          <g transform="rotate(-35 40 40)">
            <rect x="37" y="10" width="6" height="30" rx="2" fill="#78350F" />
            <rect x="34" y="8" width="12" height="6" rx="2" fill="#FACC15" />
            <path d="M24 38 L56 38 L52 64 Q40 70 28 64 Z" fill="#EF4444" stroke="#FDE047" strokeWidth="2" />
            <rect x="35" y="45" width="10" height="8" rx="2" fill="#FFFFFF" />
          </g>
        );
      }
      if (renderType === 'telescope') {
        return (
          <g>
            <line x1="40" y1="40" x2="26" y2="66" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="40" y1="40" x2="54" y2="66" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
            <g transform="rotate(-28 40 34)">
              <rect x="14" y="27" width="48" height="14" rx="4" fill="#F59E0B" stroke="#78350F" strokeWidth="2" />
              <ellipse cx="62" cy="34" rx="4" ry="8" fill="#38BDF8" />
            </g>
          </g>
        );
      }
      if (renderType === 'trophy_mini') {
        return (
          <g>
            <path d="M25 18 L55 18 L50 42 Q40 50 30 42 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
            <path d="M25 22 Q15 22 18 33 Q21 38 28 36" fill="none" stroke="#EAB308" strokeWidth="3" />
            <path d="M55 22 Q65 22 62 33 Q59 38 52 36" fill="none" stroke="#EAB308" strokeWidth="3" />
            <rect x="36" y="45" width="8" height="12" fill="#CA8A04" />
            <rect x="28" y="57" width="24" height="7" rx="2" fill="#78350F" />
          </g>
        );
      }
      if (renderType === 'laser') {
        return (
          <g transform="rotate(-40 40 40)">
            <rect x="36" y="42" width="8" height="24" rx="3" fill="#334155" stroke="#10B981" strokeWidth="1.5" />
            <rect x="38" y="8" width="4" height="35" rx="2" fill="#34D399" />
          </g>
        );
      }
      if (renderType === 'hero_shield') {
        return (
          <g>
            <circle cx="40" cy="40" r="26" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
            <circle cx="40" cy="40" r="19" fill="#FFFFFF" />
            <circle cx="40" cy="40" r="12" fill="#2563EB" />
            <polygon points="40,30 43,37 50,37 44,41 46,48 40,44 34,48 36,41 30,37 37,37" fill="#FFFFFF" />
          </g>
        );
      }
      if (renderType === 'element_staff') {
        return (
          <g transform="rotate(-25 40 40)">
            <rect x="37" y="24" width="6" height="44" rx="3" fill="#D97706" />
            <circle cx="40" cy="20" r="11" fill="#A855F7" stroke="#FDE047" strokeWidth="2.5" />
            <circle cx="40" cy="20" r="5" fill="#22D3EE" />
          </g>
        );
      }
      if (renderType === 'tome') {
        return (
          <g>
            <rect x="20" y="14" width="40" height="52" rx="5" fill="#78350F" stroke="#F59E0B" strokeWidth="2.5" />
            <rect x="25" y="19" width="30" height="42" rx="2" fill="#B45309" />
            <circle cx="40" cy="40" r="10" fill="#FEF08A" />
            <text x="40" y="44" fill="#78350F" fontSize="11" fontWeight="bold" textAnchor="middle">
              Σ
            </text>
          </g>
        );
      }
      // compass
      return (
        <g>
          <circle cx="40" cy="20" r="6" fill="#0284C7" />
          <line x1="40" y1="24" x2="24" y2="62" stroke="#475569" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="40" y1="24" x2="56" y2="62" stroke="#475569" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="30" y1="45" x2="50" y2="45" stroke="#0284C7" strokeWidth="3" />
        </g>
      );
    }

    // PHONES (9)
    if (category === 'phone') {
      if (renderType === 'ranger_morpher') {
        return (
          <g>
            <rect x="32" y="10" width="16" height="60" rx="4" fill="#1E293B" />
            <circle cx="40" cy="40" r="19" fill="#DC2626" stroke="#FACC15" strokeWidth="3" />
            <circle cx="40" cy="40" r="11" fill="#0F172A" />
            <circle cx="40" cy="40" r="5" fill="#22D3EE" />
          </g>
        );
      }
      if (renderType === 'console_mini') {
        return (
          <g>
            <rect x="12" y="25" width="56" height="30" rx="8" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
            <rect x="25" y="30" width="30" height="20" rx="3" fill="#0284C7" />
            <circle cx="19" cy="40" r="3" fill="#FACC15" />
            <circle cx="61" cy="36" r="2.5" fill="#EF4444" />
            <circle cx="61" cy="44" r="2.5" fill="#22C55E" />
          </g>
        );
      }
      const phonePalette: Record<string, { body: string; screen: string }> = {
        brick: { body: '#1E3A8A', screen: '#84CC16' },
        walkie: { body: '#15803D', screen: '#FACC15' },
        flip: { body: '#EC4899', screen: '#FCE7F3' },
        cameraphone: { body: '#0F172A', screen: '#F472B6' },
        smart: { body: '#0F172A', screen: '#38BDF8' },
        promax: { body: '#D97706', screen: '#1E293B' },
        holo: { body: '#0284C7', screen: '#A5F3FC' }
      };
      const p = phonePalette[renderType] || phonePalette.smart;
      return (
        <g>
          {renderType === 'walkie' && <rect x="46" y="8" width="4" height="14" rx="2" fill="#334155" />}
          {renderType === 'cameraphone' && (
            <circle cx="40" cy="14" r="7" fill="none" stroke="#FDE047" strokeWidth="2.5" />
          )}
          <rect x="25" y="14" width="30" height="52" rx="6" fill={p.body} stroke="#E2E8F0" strokeWidth="1.5" />
          <rect x="29" y="19" width="22" height="34" rx="3" fill={p.screen} />
          {renderType === 'holo' && <polygon points="40,34 26,12 54,12" fill="#22D3EE" opacity="0.65" />}
          <circle cx="40" cy="59" r="2.5" fill="#FFFFFF" opacity="0.8" />
        </g>
      );
    }

    // VEHICLES (15)
    if (category === 'vehicle') {
      if (renderType === 'honeycomb') {
        return (
          <g>
            <ellipse cx="40" cy="42" rx="24" ry="11" fill="#FACC15" stroke="#CA8A04" strokeWidth="2.5" />
            <ellipse cx="40" cy="39" rx="16" ry="6" fill="#FEF08A" />
            <circle cx="32" cy="42" r="2" fill="#CA8A04" />
            <circle cx="40" cy="42" r="2" fill="#CA8A04" />
            <circle cx="48" cy="42" r="2" fill="#CA8A04" />
          </g>
        );
      }
      if (renderType === 'skateboard') {
        return (
          <g transform="rotate(-12 40 40)">
            <rect x="12" y="34" width="56" height="10" rx="5" fill="#F97316" stroke="#1E293B" strokeWidth="2" />
            <circle cx="24" cy="48" r="5" fill="#38BDF8" stroke="#0F172A" strokeWidth="1.5" />
            <circle cx="56" cy="48" r="5" fill="#38BDF8" stroke="#0F172A" strokeWidth="1.5" />
          </g>
        );
      }
      if (renderType === 'jetpack') {
        return (
          <g>
            <rect x="21" y="18" width="14" height="34" rx="6" fill="#2563EB" stroke="#FACC15" strokeWidth="2" />
            <rect x="45" y="18" width="14" height="34" rx="6" fill="#2563EB" stroke="#FACC15" strokeWidth="2" />
            <rect x="35" y="28" width="10" height="8" fill="#1E293B" />
            <polygon points="23,52 33,52 28,68" fill="#F59E0B" />
            <polygon points="47,52 57,52 52,68" fill="#F59E0B" />
          </g>
        );
      }
      if (renderType === 'supercar') {
        return (
          <g>
            <path d="M12 46 Q20 28 38 28 L56 32 Q68 36 68 48 L12 48 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
            <path d="M28 32 L46 32 L52 40 L24 40 Z" fill="#38BDF8" />
            <circle cx="24" cy="50" r="8" fill="#1E293B" stroke="#E2E8F0" strokeWidth="2" />
            <circle cx="56" cy="50" r="8" fill="#1E293B" stroke="#E2E8F0" strokeWidth="2" />
          </g>
        );
      }
      if (renderType === 'cyber_moto') {
        return (
          <g>
            <circle cx="20" cy="48" r="10" fill="#0F172A" stroke="#22D3EE" strokeWidth="3.5" />
            <circle cx="60" cy="48" r="10" fill="#0F172A" stroke="#22D3EE" strokeWidth="3.5" />
            <path d="M20 48 L36 30 L58 34 L60 48" fill="none" stroke="#06B6D4" strokeWidth="5" strokeLinejoin="round" />
            <rect x="34" y="28" width="16" height="6" rx="3" fill="#FACC15" />
          </g>
        );
      }
      if (renderType === 'cloud_nimbus') {
        return (
          <g>
            <path d="M14 50 Q40 58 66 50" stroke="#F43F5E" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M18 54 Q40 62 62 54" stroke="#38BDF8" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="28" cy="40" r="11" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="2" />
            <circle cx="42" cy="34" r="13" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="2" />
            <circle cx="54" cy="41" r="10" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="2" />
            <rect x="24" y="39" width="32" height="12" rx="6" fill="#FFFFFF" />
          </g>
        );
      }
      if (renderType === 'mecha_walker') {
        return (
          <g>
            <rect x="24" y="16" width="32" height="26" rx="6" fill="#2563EB" stroke="#FACC15" strokeWidth="2" />
            <rect x="30" y="22" width="20" height="10" rx="3" fill="#22D3EE" />
            <rect x="26" y="42" width="10" height="22" rx="3" fill="#475569" />
            <rect x="44" y="42" width="10" height="22" rx="3" fill="#475569" />
            <rect x="22" y="60" width="14" height="6" rx="2" fill="#DC2626" />
            <rect x="44" y="60" width="14" height="6" rx="2" fill="#DC2626" />
          </g>
        );
      }
      if (renderType === 'hero_jet') {
        return (
          <g>
            <polygon points="40,10 50,36 70,48 50,52 46,66 40,56 34,66 30,52 10,48 30,36" fill="#EF4444" stroke="#FACC15" strokeWidth="2" />
            <ellipse cx="40" cy="34" rx="5" ry="10" fill="#38BDF8" />
          </g>
        );
      }
      if (renderType === 'spaceship') {
        return (
          <g>
            <path d="M40 12 Q56 30 52 54 L28 54 Q24 30 40 12 Z" fill="#E2E8F0" stroke="#0284C7" strokeWidth="2" />
            <circle cx="40" cy="33" r="6" fill="#38BDF8" />
            <polygon points="28,44 18,58 28,54" fill="#EF4444" />
            <polygon points="52,44 62,58 52,54" fill="#EF4444" />
            <polygon points="34,54 46,54 40,68" fill="#F59E0B" />
          </g>
        );
      }
      if (renderType === 'carpet') {
        return (
          <g>
            <path d="M12 42 Q40 28 68 42 Q56 56 40 56 Q24 56 12 42 Z" fill="#7C3AED" stroke="#F59E0B" strokeWidth="2.5" />
            <path d="M20 42 Q40 34 60 42" stroke="#FEF08A" strokeWidth="2" strokeDasharray="3 2" fill="none" />
          </g>
        );
      }
      if (renderType === 'hoverboard') {
        return (
          <g>
            <ellipse cx="40" cy="44" rx="26" ry="8" fill="#06B6D4" stroke="#0F172A" strokeWidth="2" />
            <ellipse cx="40" cy="54" rx="18" ry="4" fill="#38BDF8" opacity="0.5" />
          </g>
        );
      }
      // Bikes & Scooters (bike_mini, scooter_pastel, mountain, ebike)
      const frameColor =
        renderType === 'mountain'
          ? '#EF4444'
          : renderType === 'scooter_pastel'
          ? '#34D399'
          : renderType === 'ebike'
          ? '#0284C7'
          : '#0D9488';
      return (
        <g>
          <circle cx="22" cy="50" r="10" fill="none" stroke="#334155" strokeWidth="3.5" />
          <circle cx="58" cy="50" r="10" fill="none" stroke="#334155" strokeWidth="3.5" />
          <path d="M22 50 L38 50 L48 32 L30 32 Z" fill="none" stroke={frameColor} strokeWidth="4" strokeLinejoin="round" />
          <path d="M48 32 L58 50" stroke={frameColor} strokeWidth="3.5" />
          <line x1="44" y1="26" x2="54" y2="26" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      );
    }

    // TECH (10)
    if (category === 'tech') {
      if (renderType === 'notebook') {
        return (
          <g>
            <rect x="22" y="14" width="36" height="52" rx="4" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
            <rect x="28" y="22" width="24" height="16" rx="2" fill="#FFFFFF" />
            <line x1="27" y1="46" x2="53" y2="46" stroke="#BFDBFE" strokeWidth="2" />
            <line x1="27" y1="54" x2="47" y2="54" stroke="#BFDBFE" strokeWidth="2" />
          </g>
        );
      }
      if (renderType === 'abacus') {
        return (
          <g>
            <rect x="14" y="18" width="52" height="44" rx="4" fill="#92400E" />
            <rect x="19" y="23" width="42" height="34" fill="#FEF3C7" />
            <line x1="19" y1="32" x2="61" y2="32" stroke="#78350F" strokeWidth="2" />
            <line x1="19" y1="45" x2="61" y2="45" stroke="#78350F" strokeWidth="2" />
            <circle cx="28" cy="32" r="4" fill="#EF4444" />
            <circle cx="38" cy="32" r="4" fill="#F59E0B" />
            <circle cx="48" cy="45" r="4" fill="#2563EB" />
            <circle cx="32" cy="45" r="4" fill="#10B981" />
          </g>
        );
      }
      if (renderType === 'drawpad') {
        return (
          <g>
            <rect x="12" y="20" width="52" height="40" rx="5" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
            <rect x="17" y="25" width="42" height="30" rx="2" fill="#F8FAFC" />
            <path d="M24 44 Q34 30 46 42" stroke="#EC4899" strokeWidth="3" fill="none" strokeLinecap="round" />
            <line x1="56" y1="16" x2="68" y2="32" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
          </g>
        );
      }
      if (renderType === 'vr_station') {
        return (
          <g>
            <rect x="14" y="26" width="52" height="28" rx="9" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
            <path d="M22 36 Q30 32 36 38 L44 38 Q50 32 58 36 L58 46 Q48 48 42 44 L38 44 Q32 48 22 46 Z" fill="#22D3EE" />
          </g>
        );
      }
      if (renderType === 'drone_cam') {
        return (
          <g>
            <line x1="16" y1="24" x2="64" y2="54" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="64" y1="24" x2="16" y2="54" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" />
            <ellipse cx="16" cy="24" rx="9" ry="3" fill="#38BDF8" />
            <ellipse cx="64" cy="24" rx="9" ry="3" fill="#38BDF8" />
            <ellipse cx="16" cy="54" rx="9" ry="3" fill="#38BDF8" />
            <ellipse cx="64" cy="54" rx="9" ry="3" fill="#38BDF8" />
            <rect x="29" y="30" width="22" height="18" rx="6" fill="#E2E8F0" stroke="#0284C7" strokeWidth="2" />
            <circle cx="40" cy="40" r="5" fill="#0F172A" />
          </g>
        );
      }
      if (renderType === 'holo_desk') {
        return (
          <g>
            <polygon points="16,50 64,50 56,64 24,64" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
            <polygon points="40,48 20,20 60,20" fill="#22D3EE" opacity="0.35" />
            <circle cx="40" cy="28" r="10" fill="none" stroke="#38BDF8" strokeWidth="2" />
            <circle cx="40" cy="28" r="4" fill="#FACC15" />
          </g>
        );
      }
      if (renderType === 'quantum') {
        return (
          <g>
            <circle cx="40" cy="40" r="10" fill="#38BDF8" />
            <ellipse cx="40" cy="40" rx="26" ry="9" fill="none" stroke="#F59E0B" strokeWidth="2.5" transform="rotate(30 40 40)" />
            <ellipse cx="40" cy="40" rx="26" ry="9" fill="none" stroke="#10B981" strokeWidth="2.5" transform="rotate(-30 40 40)" />
          </g>
        );
      }
      // Tablet / Laptops (tablet, ultrabook, gaming)
      return (
        <g>
          <rect x="16" y="20" width="48" height="32" rx="4" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
          <rect x="20" y="24" width="40" height="24" rx="2" fill={renderType === 'gaming' ? '#312E81' : '#DBEAFE'} />
          <rect x="10" y="54" width="60" height="7" rx="3" fill={renderType === 'gaming' ? '#F59E0B' : '#94A3B8'} />
        </g>
      );
    }

    // PETS (12)
    if (category === 'pet') {
      if (renderType === 'none') {
        return (
          <g>
            <circle cx="40" cy="40" r="20" fill="#E2E8F0" />
            <circle cx="33" cy="36" r="2.5" fill="#475569" />
            <circle cx="47" cy="36" r="2.5" fill="#475569" />
            <path d="M33 46 Q40 52 47 46" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>
        );
      }
      if (renderType === 'corgi') {
        return (
          <g>
            <polygon points="20,30 26,14 34,26" fill="#F97316" />
            <polygon points="60,30 54,14 46,26" fill="#F97316" />
            <circle cx="40" cy="40" r="18" fill="#FDBA74" />
            <ellipse cx="40" cy="44" rx="11" ry="8" fill="#FFFFFF" />
            <circle cx="33" cy="36" r="2.5" fill="#1E293B" />
            <circle cx="47" cy="36" r="2.5" fill="#1E293B" />
            <circle cx="40" cy="42" r="3" fill="#1E293B" />
            <polygon points="34,57 46,57 40,62" fill="#EF4444" />
          </g>
        );
      }
      if (renderType === 'panda') {
        return (
          <g>
            <circle cx="23" cy="24" r="7" fill="#0F172A" />
            <circle cx="57" cy="24" r="7" fill="#0F172A" />
            <circle cx="40" cy="42" r="18" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
            <rect x="22" y="29" width="36" height="5" rx="2" fill="#EF4444" />
            <ellipse cx="32" cy="41" rx="5" ry="4" fill="#0F172A" />
            <ellipse cx="48" cy="41" rx="5" ry="4" fill="#0F172A" />
            <circle cx="32" cy="41" r="1.5" fill="#FFFFFF" />
            <circle cx="48" cy="41" r="1.5" fill="#FFFFFF" />
            <circle cx="40" cy="47" r="2.5" fill="#0F172A" />
          </g>
        );
      }
      if (renderType === 'fox') {
        return (
          <g>
            <polygon points="18,32 24,13 35,27" fill="#EA580C" />
            <polygon points="62,32 56,13 45,27" fill="#EA580C" />
            <circle cx="40" cy="42" r="17" fill="#FB923C" />
            <polygon points="24,43 40,56 56,43 40,47" fill="#FFFFFF" />
            <circle cx="33" cy="38" r="2.5" fill="#1E293B" />
            <circle cx="47" cy="38" r="2.5" fill="#1E293B" />
            <circle cx="40" cy="45" r="2.5" fill="#1E293B" />
          </g>
        );
      }
      if (renderType === 'unicorn') {
        return (
          <g>
            <polygon points="36,24 40,8 44,24" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
            <circle cx="40" cy="42" r="17" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2" />
            <path d="M26 28 Q34 20 40 24" stroke="#A855F7" strokeWidth="4" fill="none" strokeLinecap="round" />
            <circle cx="34" cy="40" r="2.5" fill="#7C3AED" />
            <circle cx="46" cy="40" r="2.5" fill="#7C3AED" />
            <ellipse cx="40" cy="49" rx="8" ry="5" fill="#FBCFE8" />
          </g>
        );
      }
      if (renderType === 'mecha_lion') {
        return (
          <g>
            <polygon points="40,14 58,24 62,44 48,60 32,60 18,44 22,24" fill="#F59E0B" stroke="#78350F" strokeWidth="2" />
            <circle cx="40" cy="40" r="13" fill="#E2E8F0" stroke="#1E293B" strokeWidth="1.5" />
            <rect x="30" y="34" width="20" height="6" rx="3" fill="#22D3EE" />
            <polygon points="36,46 44,46 40,50" fill="#DC2626" />
          </g>
        );
      }
      if (renderType === 'phoenix') {
        return (
          <g>
            <path d="M12 40 Q22 22 36 36" stroke="#F97316" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M68 40 Q58 22 44 36" stroke="#F97316" strokeWidth="5" fill="none" strokeLinecap="round" />
            <polygon points="40,14 44,26 36,26" fill="#FACC15" />
            <circle cx="40" cy="42" r="15" fill="#EF4444" stroke="#FACC15" strokeWidth="2" />
            <circle cx="35" cy="39" r="2.5" fill="#FEF08A" />
            <circle cx="45" cy="39" r="2.5" fill="#FEF08A" />
            <polygon points="37,45 43,45 40,50" fill="#FACC15" />
          </g>
        );
      }
      if (renderType === 'bunny') {
        return (
          <g>
            <ellipse cx="32" cy="20" rx="5" ry="14" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2" />
            <ellipse cx="48" cy="20" rx="5" ry="14" fill="#FFFFFF" stroke="#F472B6" strokeWidth="2" />
            <circle cx="40" cy="44" r="16" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
            <circle cx="34" cy="42" r="4" fill="none" stroke="#0284C7" strokeWidth="2" />
            <circle cx="46" cy="42" r="4" fill="none" stroke="#0284C7" strokeWidth="2" />
            <circle cx="40" cy="48" r="2" fill="#F43F5E" />
          </g>
        );
      }
      if (renderType === 'robot') {
        return (
          <g>
            <line x1="40" y1="12" x2="40" y2="22" stroke="#64748B" strokeWidth="3" />
            <circle cx="40" cy="11" r="4" fill="#38BDF8" />
            <rect x="22" y="22" width="36" height="36" rx="10" fill="#E2E8F0" stroke="#0284C7" strokeWidth="2.5" />
            <rect x="27" y="30" width="26" height="14" rx="4" fill="#0F172A" />
            <circle cx="34" cy="37" r="3" fill="#38BDF8" />
            <circle cx="46" cy="37" r="3" fill="#38BDF8" />
          </g>
        );
      }
      if (renderType === 'dragon') {
        return (
          <g>
            <polygon points="26,24 30,12 36,24" fill="#FACC15" />
            <polygon points="54,24 50,12 44,24" fill="#FACC15" />
            <circle cx="40" cy="42" r="18" fill="#EF4444" />
            <circle cx="34" cy="38" r="3" fill="#FEF08A" />
            <circle cx="46" cy="38" r="3" fill="#FEF08A" />
            <ellipse cx="40" cy="50" rx="8" ry="4" fill="#F59E0B" />
          </g>
        );
      }
      if (renderType === 'owl') {
        return (
          <g>
            <ellipse cx="40" cy="44" rx="18" ry="18" fill="#92400E" />
            <circle cx="33" cy="38" r="6" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" />
            <circle cx="47" cy="38" r="6" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" />
            <circle cx="33" cy="38" r="2.5" fill="#1E293B" />
            <circle cx="47" cy="38" r="2.5" fill="#1E293B" />
            <polygon points="40,14 54,20 40,26 26,20" fill="#1E3A8A" />
          </g>
        );
      }
      // cat
      return (
        <g>
          <polygon points="22,30 27,16 35,27" fill="#EA580C" />
          <polygon points="58,30 53,16 45,27" fill="#EA580C" />
          <circle cx="40" cy="42" r="17" fill="#FDBA74" />
          <circle cx="34" cy="40" r="2.5" fill="#1E293B" />
          <circle cx="46" cy="40" r="2.5" fill="#1E293B" />
          <path d="M36 47 Q40 50 44 47" stroke="#991B1B" strokeWidth="2" fill="none" />
        </g>
      );
    }

    return <circle cx="40" cy="40" r="18" fill="#3B82F6" />;
  };

  return (
    <div
      className={`${dim} shrink-0 rounded-2xl bg-gradient-to-br ${RARITY_BG[rarity]} border border-black/5 dark:border-white/10 flex items-center justify-center overflow-hidden shadow-inner group-hover:scale-105 transition-transform duration-200`}
    >
      <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-xs">
        {renderArtwork()}
      </svg>
    </div>
  );
};
