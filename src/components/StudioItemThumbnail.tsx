import React, { useId } from 'react';
import { PET_ART, PET_DEFS, PET_SMOOTH, PET_ID_BY_RENDER } from './avatar/petArt';
import { ItemCategory, ItemRarity } from '../types';

interface StudioItemThumbnailProps {
  renderType: string;
  category: ItemCategory;
  rarity: ItemRarity;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const RARITY_BG: Record<ItemRarity, string> = {
  base: 'from-sky-50 via-white to-slate-100 dark:from-slate-800 dark:to-slate-900',
  popular: 'from-cyan-50 via-white to-blue-100 dark:from-sky-950/60 dark:to-blue-900/50',
  vip: 'from-amber-50 via-yellow-50 to-orange-100 dark:from-amber-950/60 dark:to-orange-900/40',
  mythic:
    'from-fuchsia-50 via-violet-50 to-cyan-100 dark:from-violet-950/70 dark:via-purple-900/50 dark:to-cyan-950/60'
};

export const StudioItemThumbnail: React.FC<StudioItemThumbnailProps> = ({
  renderType,
  category,
  rarity,
  size = 'md'
}) => {
  const rawUid = useId();
  const uid = rawUid.replace(/[^a-zA-Z0-9_-]/g, '');
  const dim =
    size === 'xl'
      ? 'w-28 h-28'
      : size === 'lg'
      ? 'w-20 h-20 sm:w-24 sm:h-24'
      : size === 'sm'
      ? 'w-12 h-12'
      : 'w-16 h-16';

  const vuiBotSpriteUrl = `${import.meta.env.BASE_URL}assets/vuibot/happy.png`;

  // Use the real 3D Pixar-rendered Vui-Bot asset directly for pet_vuibot!
  if (category === 'pet' && renderType === 'robot') {
    return (
      <div
        className={`${dim} shrink-0 rounded-2xl bg-gradient-to-br ${RARITY_BG[rarity]} border border-white/80 dark:border-white/10 flex items-center justify-center overflow-hidden shadow-inner group-hover:scale-105 transition-transform duration-200 relative p-1.5`}
      >
        <div className="pointer-events-none absolute inset-x-1.5 top-1 h-2.5 rounded-full bg-white/60 dark:bg-white/10 blur-[1px]" />
        <img
          src={vuiBotSpriteUrl}
          alt="Vui-Bot Mini"
          className="w-full h-full object-contain drop-shadow-[0_4px_8px_rgba(2,132,199,0.28)]"
          loading="lazy"
        />
      </div>
    );
  }

  const renderArtwork = () => {
    // BACKDROPS (10)
    if (category === 'backdrop') {
      const palette: Record<string, { sky: string; ground: string; accent: string; sub: string }> = {
        bg_classroom: { sky: '#DBEAFE', ground: '#F59E0B', accent: '#16A34A', sub: '#FFFFFF' },
        bg_forest: { sky: '#38BDF8', ground: '#22C55E', accent: '#A5F3FC', sub: '#15803D' },
        bg_my_room: { sky: '#CCFBF1', ground: '#F59E0B', accent: '#FB7185', sub: '#FDE047' },
        bg_ocean: { sky: '#0284C7', ground: '#EAB308', accent: '#F43F5E', sub: '#38BDF8' },
        bg_lab: { sky: '#1E3A8A', ground: '#0F172A', accent: '#38BDF8', sub: '#22D3EE' },
        bg_magic_forest: { sky: '#312E81', ground: '#059669', accent: '#A855F7', sub: '#FDE047' },
        bg_castle: { sky: '#60A5FA', ground: '#22C55E', accent: '#F8FAFC', sub: '#EF4444' },
        bg_arena: { sky: '#D97706', ground: '#F59E0B', accent: '#FEF08A', sub: '#DC2626' },
        bg_future_city: { sky: '#0F172A', ground: '#1E293B', accent: '#22D3EE', sub: '#A855F7' },
        bg_galaxy: { sky: '#1E1B4B', ground: '#312E81', accent: '#FDE047', sub: '#38BDF8' }
      };
      const c = palette[renderType] || palette.bg_classroom;
      return (
        <g filter={`url(#toyAO_${uid})`}>
          <rect x="10" y="13" width="60" height="54" rx="14" fill={c.sky} />
          <path d="M10 47 Q40 39 70 47 L70 53 Q70 67 56 67 L24 67 Q10 67 10 53 Z" fill={c.ground} />
          {renderType === 'bg_my_room' ? (
            <>
              <polygon points="14,26 40,16 40,46 14,54" fill="#FFFDF5" />
              <polygon points="40,16 66,26 66,54 40,46" fill="#E0F2FE" />
              <polygon points="14,54 40,46 66,54 40,64" fill="#FBBF24" />
              <polygon points="20,28 33,23 33,37 20,42" fill="#7DD3FC" />
              <polygon points="43,43 57,38 62,45 48,50" fill="#FB7185" />
              <ellipse cx="40" cy="54" rx="10" ry="3.5" fill="#38BDF8" />
            </>
          ) : renderType === 'bg_castle' ? (
            <>
              <rect x="28" y="26" width="24" height="24" fill="#F8FAFC" />
              <polygon points="26,26 33,14 40,26" fill="#EF4444" />
              <polygon points="40,26 47,14 54,26" fill="#EF4444" />
              <rect x="36" y="38" width="8" height="12" rx="4" fill="#92400E" />
            </>
          ) : renderType === 'bg_future_city' ? (
            <>
              <rect x="16" y="28" width="11" height="24" rx="3" fill="#334155" />
              <rect x="33" y="20" width="14" height="32" rx="3" fill="#1E293B" />
              <rect x="52" y="26" width="11" height="26" rx="3" fill="#38BDF8" />
            </>
          ) : renderType === 'bg_ocean' ? (
            <>
              <circle cx="24" cy="24" r="3.5" fill="#BAE6FD" />
              <circle cx="32" cy="30" r="2.5" fill="#BAE6FD" />
              <ellipse cx="50" cy="32" rx="7.5" ry="4.5" fill="#FACC15" />
              <polygon points="56,32 62,28 62,36" fill="#F97316" />
              <path d="M18 52 Q22 40 26 52 M24 52 Q28 42 32 52" stroke="#F43F5E" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="26" cy="29" r="7" fill={c.accent} />
              <rect x="40" y="25" width="22" height="14" rx="4" fill={c.sub} opacity="0.95" />
            </>
          )}
          <path d="M16 19 Q40 13 64 19" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.52" />
        </g>
      );
    }

    // AURAS (10)
    if (category === 'aura') {
      if (renderType === 'aura_wings_angel') {
        return (
          <g filter={`url(#toyGlow_${uid})`}>
            <path d="M38 45 Q15 19 10 37 Q13 50 24 56 Q34 54 38 49 Z" fill="#FFFFFF" />
            <path d="M42 45 Q65 19 70 37 Q67 50 56 56 Q46 54 42 49 Z" fill="#FFFFFF" />
            <path d="M22 40 Q30 34 36 42" stroke="#BAE6FD" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M58 40 Q50 34 44 42" stroke="#BAE6FD" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <ellipse cx="40" cy="20" rx="13" ry="4.5" fill="none" stroke={`url(#gold_${uid})`} strokeWidth="4" />
          </g>
        );
      }
      if (renderType === 'aura_wings_cyber') {
        return (
          <g filter={`url(#toyGlow_${uid})`}>
            <polygon points="38,44 9,19 16,38 11,49 28,55" fill="#0EA5E9" />
            <polygon points="42,44 71,19 64,38 69,49 52,55" fill="#0EA5E9" />
            <circle cx="40" cy="40" r="7.5" fill={`url(#gold_${uid})`} />
          </g>
        );
      }
      if (renderType === 'aura_rainbow') {
        return (
          <g filter={`url(#toyGlow_${uid})`}>
            <path d="M14 54 A26 26 0 0 1 66 54" fill="none" stroke="#EF4444" strokeWidth="5" strokeLinecap="round" />
            <path d="M19 54 A21 21 0 0 1 61 54" fill="none" stroke="#FACC15" strokeWidth="5" strokeLinecap="round" />
            <path d="M24 54 A16 16 0 0 1 56 54" fill="none" stroke="#22C55E" strokeWidth="5" strokeLinecap="round" />
            <path d="M29 54 A11 11 0 0 1 51 54" fill="none" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" />
            <circle cx="16" cy="54" r="6" fill="#FFFFFF" />
            <circle cx="64" cy="54" r="6" fill="#FFFFFF" />
          </g>
        );
      }
      if (renderType === 'aura_lightning') {
        return (
          <g filter={`url(#toyGlow_${uid})`}>
            <circle cx="40" cy="40" r="24" fill="none" stroke="#38BDF8" strokeWidth="3.5" opacity="0.65" />
            <polygon points="44,12 27,42 40,42 34,66 55,34 41,34" fill={`url(#gold_${uid})`} />
          </g>
        );
      }
      if (renderType === 'aura_ice') {
        return (
          <g filter={`url(#toyGlow_${uid})`}>
            <line x1="40" y1="14" x2="40" y2="66" stroke="#38BDF8" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="17" y1="27" x2="63" y2="53" stroke="#38BDF8" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="63" y1="27" x2="17" y2="53" stroke="#38BDF8" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="40" cy="40" r="8" fill="#E0F2FE" />
          </g>
        );
      }
      if (renderType === 'aura_footsteps') {
        return (
          <g filter={`url(#toyGlow_${uid})`}>
            <ellipse cx="40" cy="54" rx="26" ry="8.5" fill="none" stroke="#22D3EE" strokeWidth="3.5" />
            <ellipse cx="30" cy="34" rx="7.5" ry="11.5" fill={`url(#gold_${uid})`} transform="rotate(-12 30 34)" />
            <ellipse cx="50" cy="42" rx="7.5" ry="11.5" fill="#38BDF8" transform="rotate(12 50 42)" />
          </g>
        );
      }
      const auraColor =
        renderType === 'aura_flame'
          ? '#F59E0B'
          : renderType === 'aura_electric'
          ? '#0EA5E9'
          : renderType === 'aura_sparkle'
          ? '#FACC15'
          : '#94A3B8';
      return (
        <g filter={renderType !== 'aura_none' ? `url(#toyGlow_${uid})` : undefined}>
          <circle
            cx="40"
            cy="40"
            r="24"
            fill="none"
            stroke={auraColor}
            strokeWidth="4"
            strokeDasharray={renderType === 'aura_none' ? '5 5' : 'none'}
            opacity="0.92"
          />
          <circle cx="40" cy="40" r="16" fill="none" stroke={auraColor} strokeWidth="2.5" opacity="0.55" />
          {renderType !== 'aura_none' && (
            <>
              <polygon points="40,10 43,18 51,18 44,23 47,30 40,25 33,30 36,23 29,18 37,18" fill={auraColor} />
              <circle cx="18" cy="52" r="3.5" fill={auraColor} />
              <circle cx="62" cy="52" r="3.5" fill={auraColor} />
            </>
          )}
        </g>
      );
    }

    // OUTFITS (20) — Plush 3D rounded toy garments!
    if (category === 'outfit') {
      const outfitColors: Record<string, { main: string; trim: string; badge: string }> = {
        uniform: { main: '#FFFFFF', trim: '#EF4444', badge: '#2563EB' },
        scout: { main: '#F59E0B', trim: '#92400E', badge: '#10B981' },
        sport: { main: '#F97316', trim: '#1E293B', badge: '#FFFFFF' },
        hoodie: { main: '#3B82F6', trim: '#1D4ED8', badge: '#FDE047' },
        racer: { main: '#0284C7', trim: '#FFFFFF', badge: '#FACC15' },
        ranger_red: { main: '#EF4444', trim: '#FFFFFF', badge: '#FACC15' },
        lab: { main: '#F8FAFC', trim: '#0EA5E9', badge: '#22D3EE' },
        detective: { main: '#334155', trim: '#1E293B', badge: '#EF4444' },
        ninja: { main: '#1E293B', trim: '#EF4444', badge: '#CBD5E1' },
        varsity: { main: '#1D4ED8', trim: '#FEF3C7', badge: '#FACC15' },
        hero_core: { main: '#DC2626', trim: '#FACC15', badge: '#38BDF8' },
        knight: { main: '#CBD5E1', trim: '#2563EB', badge: '#FACC15' },
        hero_shield: { main: '#1D4ED8', trim: '#EF4444', badge: '#FFFFFF' },
        aodai_tech: { main: '#DC2626', trim: '#FACC15', badge: '#FEF08A' },
        astronaut: { main: '#F8FAFC', trim: '#F97316', badge: '#38BDF8' },
        scholar: { main: '#6D28D9', trim: '#F59E0B', badge: '#FDE047' },
        wizard_ice: { main: '#0284C7', trim: '#BAE6FD', badge: '#FFFFFF' },
        ranger_gold: { main: '#FACC15', trim: '#1E293B', badge: '#EF4444' },
        cyber: { main: '#0F172A', trim: '#06B6D4', badge: '#38BDF8' },
        mecha_pilot: { main: '#1E40AF', trim: '#FACC15', badge: '#22D3EE' }
      };
      const c = outfitColors[renderType] || outfitColors.uniform;
      return (
        <g filter={`url(#toyAO_${uid})`}>
          {(renderType === 'hero_core' || renderType === 'knight' || renderType === 'scholar' || renderType === 'wizard_ice') && (
            <path d="M21 20 L11 61 L69 61 L59 20 Z" fill={c.trim} opacity="0.58" />
          )}
          {/* Puffy rounded 3D sleeves */}
          <path d="M14 25 Q22 18 28 19 L28 38 L12 39 Z" fill={c.trim} />
          <path d="M66 25 Q58 18 52 19 L52 38 L68 39 Z" fill={c.trim} />
          {/* Rounded plush torso */}
          <path d="M23 18 Q40 15 57 18 L54 64 Q40 67 26 64 Z" fill={c.main} />
          <path d="M23 18 Q40 15 57 18 L54 64 Q40 67 26 64 Z" fill={`url(#shine_${uid})`} />
          <polygon points="32,17 40,30 48,17" fill={c.trim} />
          {renderType === 'hero_core' || renderType === 'mecha_pilot' ? (
            <polygon points="40,34 48,43 40,52 32,43" fill={c.badge} />
          ) : (
            <circle cx="40" cy="43" r="7.5" fill={c.badge} />
          )}
        </g>
      );
    }

    // HANDHELDS (17)
    if (category === 'handheld') {
      if (renderType === 'pencil') {
        return (
          <g transform="rotate(-35 40 40)" filter={`url(#toyAO_${uid})`}>
            <rect x="34" y="13" width="12" height="44" rx="4" fill={`url(#gold_${uid})`} />
            <rect x="34" y="13" width="12" height="8" rx="3" fill="#F43F5E" />
            <polygon points="34,57 46,57 40,68" fill="#FED7AA" />
            <polygon points="38,63 42,63 40,68" fill="#1E293B" />
          </g>
        );
      }
      if (renderType === 'ruler') {
        return (
          <g transform="rotate(-25 40 40)" filter={`url(#toyAO_${uid})`}>
            <rect x="31" y="12" width="18" height="56" rx="6" fill="#06B6D4" />
            <line x1="34" y1="22" x2="43" y2="22" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
            <line x1="34" y1="32" x2="41" y2="32" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <line x1="34" y1="42" x2="43" y2="42" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
            <line x1="34" y1="52" x2="41" y2="52" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          </g>
        );
      }
      if (renderType === 'star_wand') {
        return (
          <g filter={`url(#toyGlow_${uid})`}>
            <line x1="21" y1="63" x2="48" y2="32" stroke="#EC4899" strokeWidth="6" strokeLinecap="round" />
            <polygon points="50,11 54,23 67,23 56,30 60,42 50,35 40,42 44,30 33,23 46,23" fill={`url(#gold_${uid})`} />
          </g>
        );
      }
      if (renderType === 'backpack_rocket') {
        return (
          <g filter={`url(#toyAO_${uid})`}>
            <rect x="13" y="34" width="11" height="24" rx="5" fill={`url(#silver_${uid})`} />
            <rect x="56" y="34" width="11" height="24" rx="5" fill={`url(#silver_${uid})`} />
            <polygon points="14,58 23,58 18.5,69" fill="#F59E0B" />
            <polygon points="57,58 66,58 61.5,69" fill="#F59E0B" />
            <rect x="21" y="17" width="38" height="44" rx="12" fill="#2563EB" />
            <rect x="28" y="35" width="24" height="17" rx="6" fill={`url(#gold_${uid})`} />
          </g>
        );
      }
      if (renderType === 'camera') {
        return (
          <g filter={`url(#toyAO_${uid})`}>
            <rect x="29" y="17" width="22" height="9" rx="4" fill="#F59E0B" />
            <rect x="15" y="23" width="50" height="36" rx="10" fill="#1E293B" />
            <circle cx="40" cy="41" r="12" fill="#38BDF8" />
            <circle cx="40" cy="41" r="6" fill="#0F172A" />
            <circle cx="37" cy="38" r="2.5" fill="#FFFFFF" />
            <circle cx="56" cy="30" r="3" fill="#FACC15" />
          </g>
        );
      }
      if (renderType === 'micro') {
        return (
          <g transform="rotate(-25 40 40)" filter={`url(#toyAO_${uid})`}>
            <rect x="34" y="32" width="12" height="34" rx="6" fill="#1E293B" />
            <circle cx="40" cy="24" r="13" fill={`url(#silver_${uid})`} />
            <line x1="29" y1="24" x2="51" y2="24" stroke="#38BDF8" strokeWidth="2.8" strokeLinecap="round" />
          </g>
        );
      }
      if (renderType === 'magnifier') {
        return (
          <g filter={`url(#toyAO_${uid})`}>
            <line x1="48" y1="48" x2="64" y2="64" stroke="#92400E" strokeWidth="7.5" strokeLinecap="round" />
            <circle cx="36" cy="36" r="18" fill="#BAE6FD" stroke={`url(#silver_${uid})`} strokeWidth="4.5" />
            <path d="M27 29 Q32 23 39 25" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        );
      }
      if (renderType === 'beaker') {
        return (
          <g filter={`url(#toyGlow_${uid})`}>
            <path d="M25 16 L39 16 L39 30 L49 56 Q50 63 42 63 L22 63 Q14 63 15 56 L25 30 Z" fill="#A5F3FC" />
            <path d="M19 48 L45 48 L47 56 Q47 61 41 61 L23 61 Q17 61 17 56 Z" fill="#10B981" />
            <rect x="52" y="24" width="12" height="39" rx="6" fill="#FDE047" />
            <circle cx="32" cy="40" r="3" fill="#FFFFFF" />
          </g>
        );
      }
      if (renderType === 'casio') {
        return (
          <g filter={`url(#toyAO_${uid})`}>
            <rect x="22" y="12" width="36" height="56" rx="8" fill="#1E293B" />
            <rect x="27" y="17" width="26" height="14" rx="3" fill="#E2E8F0" />
            <circle cx="31" cy="40" r="3.2" fill="#38BDF8" />
            <circle cx="40" cy="40" r="3.2" fill="#38BDF8" />
            <circle cx="49" cy="40" r="3.2" fill="#38BDF8" />
            <circle cx="31" cy="50" r="3.2" fill="#94A3B8" />
            <circle cx="40" cy="50" r="3.2" fill="#94A3B8" />
            <circle cx="49" cy="50" r="3.2" fill="#EF4444" />
          </g>
        );
      }
      if (renderType === 'guitar') {
        return (
          <g transform="rotate(-35 40 40)" filter={`url(#toyAO_${uid})`}>
            <rect x="37" y="10" width="6" height="30" rx="3" fill="#92400E" />
            <rect x="34" y="8" width="12" height="6" rx="2.5" fill="#FACC15" />
            <path d="M23 38 L57 38 L53 65 Q40 72 27 65 Z" fill="#EC4899" />
            <rect x="35" y="45" width="10" height="8" rx="3" fill="#FFFFFF" />
          </g>
        );
      }
      if (renderType === 'telescope') {
        return (
          <g filter={`url(#toyAO_${uid})`}>
            <line x1="40" y1="40" x2="26" y2="66" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
            <line x1="40" y1="40" x2="54" y2="66" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
            <g transform="rotate(-28 40 34)">
              <rect x="14" y="27" width="48" height="14" rx="5" fill={`url(#gold_${uid})`} />
              <ellipse cx="62" cy="34" rx="4.5" ry="8" fill="#38BDF8" />
            </g>
          </g>
        );
      }
      if (renderType === 'trophy_mini') {
        return (
          <g filter={`url(#toyGlow_${uid})`}>
            <path d="M24 17 L56 17 L51 43 Q40 52 29 43 Z" fill={`url(#gold_${uid})`} />
            <path d="M24 22 Q14 22 17 33 Q20 38 28 36" fill="none" stroke="#F59E0B" strokeWidth="3.5" />
            <path d="M56 22 Q66 22 63 33 Q60 38 52 36" fill="none" stroke="#F59E0B" strokeWidth="3.5" />
            <rect x="35.5" y="46" width="9" height="12" fill="#B45309" />
            <rect x="27" y="57" width="26" height="8" rx="4" fill="#92400E" />
          </g>
        );
      }
      if (renderType === 'laser') {
        return (
          <g transform="rotate(-40 40 40)" filter={`url(#toyGlow_${uid})`}>
            <rect x="35.5" y="42" width="9" height="24" rx="4" fill="#334155" />
            <rect x="37.5" y="8" width="5" height="35" rx="2.5" fill="#34D399" />
          </g>
        );
      }
      if (renderType === 'hero_shield') {
        return (
          <g filter={`url(#toyGlow_${uid})`}>
            <circle cx="40" cy="40" r="27" fill="#EF4444" />
            <circle cx="40" cy="40" r="20" fill="#FFFFFF" />
            <circle cx="40" cy="40" r="13" fill="#2563EB" />
            <polygon points="40,29 43,37 51,37 44.5,41.5 47,49 40,44.5 33,49 35.5,41.5 29,37 37,37" fill="#FFFFFF" />
            <path d="M23 26 Q38 17 55 24" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.48" />
          </g>
        );
      }
      if (renderType === 'element_staff') {
        return (
          <g transform="rotate(-25 40 40)" filter={`url(#toyGlow_${uid})`}>
            <rect x="36.5" y="24" width="7" height="44" rx="3.5" fill={`url(#gold_${uid})`} />
            <circle cx="40" cy="20" r="11.5" fill="#A855F7" />
            <circle cx="40" cy="20" r="5.5" fill="#22D3EE" />
          </g>
        );
      }
      if (renderType === 'tome') {
        return (
          <g filter={`url(#toyGlow_${uid})`}>
            <rect x="19" y="13" width="42" height="54" rx="8" fill="#78350F" />
            <rect x="24" y="18" width="32" height="44" rx="4" fill="#D97706" />
            <circle cx="40" cy="40" r="10.5" fill="#FEF08A" />
            <text x="40" y="44" fill="#78350F" fontSize="12" fontWeight="bold" textAnchor="middle">
              Σ
            </text>
          </g>
        );
      }
      return (
        <g filter={`url(#toyAO_${uid})`}>
          <circle cx="40" cy="19" r="7" fill="#0284C7" />
          <line x1="40" y1="24" x2="24" y2="62" stroke={`url(#silver_${uid})`} strokeWidth="5" strokeLinecap="round" />
          <line x1="40" y1="24" x2="56" y2="62" stroke={`url(#silver_${uid})`} strokeWidth="5" strokeLinecap="round" />
          <line x1="30" y1="45" x2="50" y2="45" stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      );
    }

    // PHONES (9)
    if (category === 'phone') {
      if (renderType === 'ranger_morpher') {
        return (
          <g filter={`url(#toyGlow_${uid})`}>
            <rect x="31" y="10" width="18" height="60" rx="6" fill="#1E293B" />
            <circle cx="40" cy="40" r="20" fill="#EF4444" stroke={`url(#gold_${uid})`} strokeWidth="3.5" />
            <circle cx="40" cy="40" r="11" fill="#0F172A" />
            <circle cx="40" cy="40" r="5.5" fill="#22D3EE" />
          </g>
        );
      }
      if (renderType === 'console_mini') {
        return (
          <g filter={`url(#toyAO_${uid})`}>
            <rect x="11" y="24" width="58" height="32" rx="11" fill="#1E293B" />
            <rect x="24" y="29" width="32" height="22" rx="4" fill="#0EA5E9" />
            <circle cx="18" cy="40" r="3.5" fill="#FACC15" />
            <circle cx="62" cy="36" r="2.8" fill="#EF4444" />
            <circle cx="62" cy="44" r="2.8" fill="#22C55E" />
          </g>
        );
      }
      const phonePalette: Record<string, { body: string; screen: string }> = {
        brick: { body: '#1E3A8A', screen: '#84CC16' },
        walkie: { body: '#16A34A', screen: '#FACC15' },
        flip: { body: '#EC4899', screen: '#FCE7F3' },
        cameraphone: { body: '#0F172A', screen: '#F472B6' },
        smart: { body: '#0F172A', screen: '#38BDF8' },
        promax: { body: '#F59E0B', screen: '#1E293B' },
        holo: { body: '#0284C7', screen: '#A5F3FC' }
      };
      const p = phonePalette[renderType] || phonePalette.smart;
      return (
        <g filter={`url(#toyAO_${uid})`}>
          {renderType === 'walkie' && <rect x="46" y="7" width="5" height="15" rx="2.5" fill="#334155" />}
          {renderType === 'cameraphone' && (
            <circle cx="40" cy="14" r="7.5" fill="none" stroke="#FDE047" strokeWidth="3" />
          )}
          <rect x="24" y="13" width="32" height="54" rx="9" fill={p.body} />
          <rect x="28.5" y="18.5" width="23" height="35" rx="4" fill={p.screen} />
          <path d="M31 21 L45 21 L31 36 Z" fill="#FFFFFF" opacity="0.3" />
          {renderType === 'holo' && <polygon points="40,34 25,11 55,11" fill="#22D3EE" opacity="0.65" />}
          <circle cx="40" cy="60" r="2.8" fill="#FFFFFF" opacity="0.88" />
        </g>
      );
    }

    // VEHICLES (15)
    if (category === 'vehicle') {
      if (renderType === 'honeycomb') {
        return (
          <g filter={`url(#toyAO_${uid})`}>
            <ellipse cx="40" cy="42" rx="25" ry="12" fill={`url(#gold_${uid})`} />
            <ellipse cx="40" cy="39" rx="17" ry="6.5" fill="#FEF08A" />
            <circle cx="32" cy="42" r="2.2" fill="#B45309" />
            <circle cx="40" cy="42" r="2.2" fill="#B45309" />
            <circle cx="48" cy="42" r="2.2" fill="#B45309" />
          </g>
        );
      }
      if (renderType === 'skateboard') {
        return (
          <g transform="rotate(-12 40 40)" filter={`url(#toyAO_${uid})`}>
            <rect x="11" y="34" width="58" height="11" rx="5.5" fill="#F97316" />
            <rect x="18" y="36" width="44" height="3.5" rx="1.75" fill="#FDE047" />
            <circle cx="24" cy="49" r="5.5" fill="#38BDF8" />
            <circle cx="56" cy="49" r="5.5" fill="#38BDF8" />
          </g>
        );
      }
      if (renderType === 'jetpack') {
        return (
          <g filter={`url(#toyGlow_${uid})`}>
            <rect x="20" y="17" width="15" height="36" rx="7" fill="#2563EB" />
            <rect x="45" y="17" width="15" height="36" rx="7" fill="#2563EB" />
            <rect x="35" y="28" width="10" height="9" fill="#1E293B" />
            <polygon points="22,53 33,53 27.5,69" fill="#F59E0B" />
            <polygon points="47,53 58,53 52.5,69" fill="#F59E0B" />
          </g>
        );
      }
      if (renderType === 'supercar') {
        return (
          <g filter={`url(#toyAO_${uid})`}>
            <path d="M10 47 Q19 27 38 27 L57 31 Q69 36 69 49 L10 49 Z" fill="#EF4444" />
            <path d="M27 31 L47 31 L53 40 L23 40 Z" fill="#38BDF8" />
            <rect x="16" y="42" width="46" height="3" rx="1.5" fill="#FACC15" />
            <circle cx="24" cy="51" r="8.5" fill="#1E293B" />
            <circle cx="24" cy="51" r="4" fill={`url(#gold_${uid})`} />
            <circle cx="56" cy="51" r="8.5" fill="#1E293B" />
            <circle cx="56" cy="51" r="4" fill={`url(#gold_${uid})`} />
          </g>
        );
      }
      if (renderType === 'cyber_moto') {
        return (
          <g filter={`url(#toyGlow_${uid})`}>
            <circle cx="20" cy="48" r="11" fill="#0F172A" stroke="#22D3EE" strokeWidth="3.5" />
            <circle cx="60" cy="48" r="11" fill="#0F172A" stroke="#22D3EE" strokeWidth="3.5" />
            <path d="M20 48 L36 29 L58 33 L60 48" fill="none" stroke="#06B6D4" strokeWidth="5.5" strokeLinejoin="round" />
            <rect x="33" y="27" width="18" height="6.5" rx="3" fill="#FACC15" />
          </g>
        );
      }
      if (renderType === 'cloud_nimbus') {
        return (
          <g filter={`url(#toyGlow_${uid})`}>
            <path d="M13 51 Q40 59 67 51" stroke="#F43F5E" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            <path d="M18 55 Q40 63 62 55" stroke="#38BDF8" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <circle cx="27" cy="40" r="12" fill="#FFFFFF" />
            <circle cx="42" cy="34" r="14" fill="#FFFFFF" />
            <circle cx="55" cy="41" r="11" fill="#FFFFFF" />
            <rect x="23" y="39" width="34" height="13" rx="6.5" fill="#FFFFFF" />
          </g>
        );
      }
      if (renderType === 'mecha_walker') {
        return (
          <g filter={`url(#toyAO_${uid})`}>
            <rect x="23" y="16" width="34" height="27" rx="8" fill="#2563EB" />
            <rect x="29" y="22" width="22" height="11" rx="4" fill="#22D3EE" />
            <rect x="25" y="43" width="11" height="21" rx="4" fill="#475569" />
            <rect x="44" y="43" width="11" height="21" rx="4" fill="#475569" />
            <rect x="21" y="60" width="15" height="7" rx="3" fill="#EF4444" />
            <rect x="44" y="60" width="15" height="7" rx="3" fill="#EF4444" />
          </g>
        );
      }
      if (renderType === 'hero_jet') {
        return (
          <g filter={`url(#toyGlow_${uid})`}>
            <polygon points="40,10 50,36 70,48 50,52 46,66 40,56 34,66 30,52 10,48 30,36" fill="#EF4444" />
            <ellipse cx="40" cy="34" rx="5.5" ry="11" fill="#38BDF8" />
          </g>
        );
      }
      if (renderType === 'spaceship') {
        return (
          <g filter={`url(#toyGlow_${uid})`}>
            <path d="M40 12 Q57 30 53 54 L27 54 Q23 30 40 12 Z" fill={`url(#silver_${uid})`} />
            <circle cx="40" cy="33" r="6.5" fill="#38BDF8" />
            <polygon points="27,44 17,58 27,54" fill="#EF4444" />
            <polygon points="53,44 63,58 53,54" fill="#EF4444" />
            <polygon points="34,54 46,54 40,68" fill="#F59E0B" />
          </g>
        );
      }
      if (renderType === 'carpet') {
        return (
          <g filter={`url(#toyGlow_${uid})`}>
            <path d="M11 42 Q40 27 69 42 Q56 57 40 57 Q24 57 11 42 Z" fill="#7C3AED" />
            <path d="M20 42 Q40 34 60 42" stroke="#FEF08A" strokeWidth="2.5" strokeDasharray="4 2" fill="none" />
          </g>
        );
      }
      if (renderType === 'hoverboard') {
        return (
          <g filter={`url(#toyGlow_${uid})`}>
            <ellipse cx="40" cy="44" rx="27" ry="9" fill="#06B6D4" />
            <ellipse cx="40" cy="44" rx="18" ry="5" fill="#0F172A" />
            <ellipse cx="40" cy="55" rx="19" ry="4.5" fill="#38BDF8" opacity="0.6" />
          </g>
        );
      }
      const frameColor =
        renderType === 'mountain'
          ? '#EF4444'
          : renderType === 'scooter_pastel'
          ? '#34D399'
          : renderType === 'ebike'
          ? '#0284C7'
          : '#14B8A6';
      return (
        <g filter={`url(#toyAO_${uid})`}>
          <circle cx="22" cy="50" r="10.5" fill="none" stroke="#334155" strokeWidth="4" />
          <circle cx="58" cy="50" r="10.5" fill="none" stroke="#334155" strokeWidth="4" />
          <path d="M22 50 L38 50 L48 32 L30 32 Z" fill="none" stroke={frameColor} strokeWidth="4.5" strokeLinejoin="round" />
          <path d="M48 32 L58 50" stroke={frameColor} strokeWidth="4" />
          <line x1="44" y1="26" x2="54" y2="26" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
        </g>
      );
    }

    // TECH (10)
    if (category === 'tech') {
      if (renderType === 'notebook') {
        return (
          <g filter={`url(#toyAO_${uid})`}>
            <rect x="21" y="13" width="38" height="54" rx="7" fill="#3B82F6" />
            <rect x="27" y="21" width="26" height="17" rx="3.5" fill="#FFFFFF" />
            <line x1="27" y1="46" x2="53" y2="46" stroke="#BFDBFE" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="27" y1="54" x2="47" y2="54" stroke="#BFDBFE" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        );
      }
      if (renderType === 'abacus') {
        return (
          <g filter={`url(#toyAO_${uid})`}>
            <rect x="13" y="18" width="54" height="44" rx="7" fill="#92400E" />
            <rect x="18" y="23" width="44" height="34" rx="3" fill="#FEF3C7" />
            <line x1="18" y1="32" x2="62" y2="32" stroke="#78350F" strokeWidth="2.2" />
            <line x1="18" y1="46" x2="62" y2="46" stroke="#78350F" strokeWidth="2.2" />
            <circle cx="28" cy="32" r="4.2" fill="#EF4444" />
            <circle cx="38" cy="32" r="4.2" fill="#F59E0B" />
            <circle cx="48" cy="46" r="4.2" fill="#2563EB" />
            <circle cx="32" cy="46" r="4.2" fill="#10B981" />
          </g>
        );
      }
      if (renderType === 'drawpad') {
        return (
          <g filter={`url(#toyAO_${uid})`}>
            <rect x="11" y="20" width="54" height="40" rx="8" fill="#1E293B" />
            <rect x="16" y="25" width="44" height="30" rx="3.5" fill="#F8FAFC" />
            <path d="M24 44 Q34 30 46 42" stroke="#EC4899" strokeWidth="3.2" fill="none" strokeLinecap="round" />
            <line x1="56" y1="15" x2="68" y2="32" stroke="#F59E0B" strokeWidth="4.5" strokeLinecap="round" />
          </g>
        );
      }
      if (renderType === 'vr_station') {
        return (
          <g filter={`url(#toyGlow_${uid})`}>
            <rect x="13" y="26" width="54" height="28" rx="11" fill="#0F172A" />
            <path d="M21 36 Q30 32 36 38 L44 38 Q50 32 59 36 L59 46 Q48 48 42 44 L38 44 Q32 48 21 46 Z" fill="#22D3EE" />
          </g>
        );
      }
      if (renderType === 'drone_cam') {
        return (
          <g filter={`url(#toyAO_${uid})`}>
            <line x1="16" y1="24" x2="64" y2="54" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
            <line x1="64" y1="24" x2="16" y2="54" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="16" cy="24" rx="10" ry="3.5" fill="#38BDF8" />
            <ellipse cx="64" cy="24" rx="10" ry="3.5" fill="#38BDF8" />
            <ellipse cx="16" cy="54" rx="10" ry="3.5" fill="#38BDF8" />
            <ellipse cx="64" cy="54" rx="10" ry="3.5" fill="#38BDF8" />
            <rect x="29" y="30" width="22" height="18" rx="7" fill={`url(#silver_${uid})`} />
            <circle cx="40" cy="40" r="5" fill="#0F172A" />
          </g>
        );
      }
      if (renderType === 'holo_desk') {
        return (
          <g filter={`url(#toyGlow_${uid})`}>
            <polygon points="15,50 65,50 57,64 23,64" fill="#1E293B" />
            <polygon points="40,48 20,20 60,20" fill="#22D3EE" opacity="0.4" />
            <circle cx="40" cy="28" r="10.5" fill="none" stroke="#38BDF8" strokeWidth="2.5" />
            <circle cx="40" cy="28" r="4.5" fill="#FACC15" />
          </g>
        );
      }
      if (renderType === 'quantum') {
        return (
          <g filter={`url(#toyGlow_${uid})`}>
            <circle cx="40" cy="40" r="10.5" fill="#38BDF8" />
            <ellipse cx="40" cy="40" rx="26" ry="9" fill="none" stroke="#F59E0B" strokeWidth="2.8" transform="rotate(30 40 40)" />
            <ellipse cx="40" cy="40" rx="26" ry="9" fill="none" stroke="#10B981" strokeWidth="2.8" transform="rotate(-30 40 40)" />
          </g>
        );
      }
      return (
        <g filter={`url(#toyAO_${uid})`}>
          <rect x="15" y="20" width="50" height="32" rx="7" fill="#0F172A" />
          <rect x="19" y="24" width="42" height="24" rx="3" fill={renderType === 'gaming' ? '#312E81' : '#DBEAFE'} />
          <rect x="10" y="54" width="60" height="8" rx="4" fill={renderType === 'gaming' ? '#F59E0B' : '#94A3B8'} />
        </g>
      );
    }

    // PETS (11 vector + Vui-Bot 3D sprite handled above) — Plush 3D zero-outline faces!
    if (category === 'pet') {
      if (renderType === 'none') {
        return (
          <g filter={`url(#toyAO_${uid})`}>
            <circle cx="40" cy="40" r="20" fill="#E2E8F0" />
            <circle cx="33" cy="36" r="2.8" fill="#475569" />
            <circle cx="47" cy="36" r="2.8" fill="#475569" />
            <path d="M33 46 Q40 52 47 46" stroke="#475569" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          </g>
        );
      }
      if (PET_ID_BY_RENDER[renderType] && PET_ART[PET_ID_BY_RENDER[renderType]]) {
        const petKey = PET_ID_BY_RENDER[renderType];
        return (
          <g transform="translate(5 3) scale(0.7)">
            <defs dangerouslySetInnerHTML={{ __html: PET_DEFS.split('__UID__').join(`p${uid}`) }} />
            <g
              filter={`url(#${PET_SMOOTH.has(petKey) ? 'petSmooth' : 'petFur'}_p${uid})`}
              dangerouslySetInnerHTML={{ __html: PET_ART[petKey].split('__UID__').join(`p${uid}`) }}
            />
          </g>
        );
      }
      if (renderType === 'corgi') {
        return (
          <g filter={`url(#toyAO_${uid})`}>
            <polygon points="19,31 26,12 35,26" fill="#EA580C" />
            <polygon points="61,31 54,12 45,26" fill="#EA580C" />
            <circle cx="40" cy="42" r="19" fill="#FDBA74" />
            <ellipse cx="40" cy="46" rx="12" ry="8.5" fill="#FFFFFF" />
            <circle cx="33" cy="37" r="3.2" fill="#0F172A" />
            <circle cx="34" cy="36" r="1.2" fill="#FFFFFF" />
            <circle cx="47" cy="37" r="3.2" fill="#0F172A" />
            <circle cx="48" cy="36" r="1.2" fill="#FFFFFF" />
            <ellipse cx="27" cy="42" rx="3.4" ry="2" fill="#FB7185" opacity="0.55" />
            <ellipse cx="53" cy="42" rx="3.4" ry="2" fill="#FB7185" opacity="0.55" />
            <circle cx="40" cy="43" r="2.8" fill="#1E293B" />
            <polygon points="33,58 47,58 40,65" fill="#EF4444" />
          </g>
        );
      }
      if (renderType === 'panda') {
        return (
          <g filter={`url(#toyAO_${uid})`}>
            <circle cx="22" cy="23" r="7.5" fill="#0F172A" />
            <circle cx="58" cy="23" r="7.5" fill="#0F172A" />
            <circle cx="40" cy="42" r="19" fill="#FFFFFF" />
            <rect x="22" y="28" width="36" height="5.5" rx="2.75" fill="#EF4444" />
            <ellipse cx="32" cy="41" rx="5.2" ry="4.4" fill="#0F172A" />
            <ellipse cx="48" cy="41" rx="5.2" ry="4.4" fill="#0F172A" />
            <circle cx="32" cy="40.5" r="1.8" fill="#FFFFFF" />
            <circle cx="48" cy="40.5" r="1.8" fill="#FFFFFF" />
            <circle cx="40" cy="47.5" r="2.6" fill="#0F172A" />
          </g>
        );
      }
      if (renderType === 'fox') {
        return (
          <g filter={`url(#toyAO_${uid})`}>
            <polygon points="18,32 24,13 35,27" fill="#EA580C" />
            <polygon points="62,32 56,13 45,27" fill="#EA580C" />
            <circle cx="40" cy="42" r="18" fill="#FB923C" />
            <polygon points="23,43 40,57 57,43 40,48" fill="#FFFFFF" />
            <circle cx="33" cy="38" r="3" fill="#0F172A" />
            <circle cx="34" cy="37" r="1.2" fill="#FFFFFF" />
            <circle cx="47" cy="38" r="3" fill="#0F172A" />
            <circle cx="48" cy="37" r="1.2" fill="#FFFFFF" />
            <circle cx="40" cy="45" r="2.6" fill="#1E293B" />
          </g>
        );
      }
      if (renderType === 'unicorn') {
        return (
          <g filter={`url(#toyGlow_${uid})`}>
            <polygon points="35,24 40,7 45,24" fill={`url(#gold_${uid})`} />
            <circle cx="40" cy="43" r="18" fill="#FFFFFF" />
            <path d="M25 28 Q34 20 40 24" stroke="#A855F7" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            <circle cx="34" cy="41" r="3" fill="#7C3AED" />
            <circle cx="46" cy="41" r="3" fill="#7C3AED" />
            <ellipse cx="40" cy="50" rx="8.5" ry="5.5" fill="#FBCFE8" />
          </g>
        );
      }
      if (renderType === 'mecha_lion') {
        return (
          <g filter={`url(#toyGlow_${uid})`}>
            <polygon points="40,13 59,24 63,44 48,61 32,61 17,44 21,24" fill={`url(#gold_${uid})`} />
            <circle cx="40" cy="40" r="13.5" fill="#E2E8F0" />
            <rect x="29.5" y="34" width="21" height="6.5" rx="3.2" fill="#22D3EE" />
            <polygon points="36,46 44,46 40,51" fill="#EF4444" />
          </g>
        );
      }
      if (renderType === 'phoenix') {
        return (
          <g filter={`url(#toyGlow_${uid})`}>
            <path d="M12 40 Q22 21 36 36" stroke="#F97316" strokeWidth="5.5" fill="none" strokeLinecap="round" />
            <path d="M68 40 Q58 21 44 36" stroke="#F97316" strokeWidth="5.5" fill="none" strokeLinecap="round" />
            <polygon points="40,13 45,26 35,26" fill="#FACC15" />
            <circle cx="40" cy="42" r="16" fill="#EF4444" />
            <circle cx="35" cy="39" r="2.8" fill="#FEF08A" />
            <circle cx="45" cy="39" r="2.8" fill="#FEF08A" />
            <polygon points="37,45 43,45 40,51" fill="#FACC15" />
          </g>
        );
      }
      if (renderType === 'bunny') {
        return (
          <g filter={`url(#toyAO_${uid})`}>
            <ellipse cx="32" cy="19" rx="5.5" ry="15" fill="#FFFFFF" />
            <ellipse cx="32" cy="19" rx="3" ry="10" fill="#FBCFE8" />
            <ellipse cx="48" cy="19" rx="5.5" ry="15" fill="#FFFFFF" />
            <ellipse cx="48" cy="19" rx="3" ry="10" fill="#FBCFE8" />
            <circle cx="40" cy="44" r="17" fill="#FFFFFF" />
            <circle cx="34" cy="42" r="4.5" fill="none" stroke="#0284C7" strokeWidth="2.2" />
            <circle cx="46" cy="42" r="4.5" fill="none" stroke="#0284C7" strokeWidth="2.2" />
            <circle cx="40" cy="48.5" r="2.2" fill="#F43F5E" />
          </g>
        );
      }
      if (renderType === 'dragon') {
        return (
          <g filter={`url(#toyGlow_${uid})`}>
            <polygon points="25,24 30,11 36,24" fill={`url(#gold_${uid})`} />
            <polygon points="55,24 50,11 44,24" fill={`url(#gold_${uid})`} />
            <circle cx="40" cy="42" r="18" fill="#EF4444" />
            <circle cx="34" cy="38" r="3.5" fill="#FEF08A" />
            <circle cx="46" cy="38" r="3.5" fill="#FEF08A" />
            <ellipse cx="40" cy="50" rx="8.5" ry="4.5" fill="#F59E0B" />
          </g>
        );
      }
      if (renderType === 'owl') {
        return (
          <g filter={`url(#toyAO_${uid})`}>
            <ellipse cx="40" cy="44" rx="18" ry="18" fill="#92400E" />
            <circle cx="33" cy="38" r="6.2" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2.2" />
            <circle cx="47" cy="38" r="6.2" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2.2" />
            <circle cx="33" cy="38" r="2.8" fill="#0F172A" />
            <circle cx="47" cy="38" r="2.8" fill="#0F172A" />
            <polygon points="40,14 55,20 40,26 25,20" fill="#1E3A8A" />
          </g>
        );
      }
      // Cool Cat with stylish shades!
      return (
        <g filter={`url(#toyAO_${uid})`}>
          <polygon points="21,31 26,14 35,27" fill="#CBD5E1" />
          <polygon points="59,31 54,14 45,27" fill="#CBD5E1" />
          <circle cx="40" cy="42" r="18" fill="#F8FAFC" />
          <rect x="25" y="34" width="13" height="9" rx="3" fill="#0F172A" />
          <rect x="42" y="34" width="13" height="9" rx="3" fill="#0F172A" />
          <rect x="37" y="36" width="6" height="2.8" fill="#0F172A" />
          <path d="M35.5 48 Q40 51.5 44.5 48" stroke="#FB7185" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        </g>
      );
    }

    return <circle cx="40" cy="40" r="18" fill="#3B82F6" />;
  };

  return (
    <div
      className={`${dim} shrink-0 rounded-2xl bg-gradient-to-br ${RARITY_BG[rarity]} border border-white/80 dark:border-white/10 flex items-center justify-center overflow-hidden shadow-inner group-hover:scale-105 transition-transform duration-200 relative`}
    >
      <div className="pointer-events-none absolute inset-x-1.5 top-1 h-2 rounded-full bg-white/60 dark:bg-white/10 blur-[1px]" />
      <svg viewBox="0 0 80 80" className="w-full h-full">
        <defs>
          <linearGradient id={`gold_${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#FACC15" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id={`silver_${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
          <linearGradient id={`shine_${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0.22" />
          </linearGradient>
          <filter id={`toyAO_${uid}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#0F172A" floodOpacity="0.18" />
          </filter>
<filter id={`toy3d_${uid}`} x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.1" result="h" />
            <feSpecularLighting in="h" surfaceScale="1.6" specularConstant="0.3" specularExponent="28" lightingColor="#FFFFFF" result="spec">
              <feDistantLight azimuth="235" elevation="55" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceAlpha" operator="in" result="specIn" />
            <feDiffuseLighting in="h" surfaceScale="1.2800000000000002" diffuseConstant="1" lightingColor="#FFFFFF" result="dif">
              <feDistantLight azimuth="235" elevation="60" />
            </feDiffuseLighting>
            <feComposite in="SourceGraphic" in2="dif" operator="arithmetic" k1="1.12" k2="0" k3="0" k4="0" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" result="litIn" />
            <feBlend in="specIn" in2="litIn" mode="screen" />
          </filter>
          <filter id={`toyGlow_${uid}`} x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="2.2" result="b" />
            <feComposite in="SourceGraphic" in2="b" operator="over" />
          </filter>
        </defs>
        {category !== 'backdrop' && (
          <ellipse cx="40" cy="70" rx="19" ry="3.8" fill="#0F172A" opacity="0.14" />
        )}
        <g filter={category !== 'backdrop' ? `url(#toy3d_${uid})` : undefined}>{renderArtwork()}</g>
      </svg>
    </div>
  );
};
