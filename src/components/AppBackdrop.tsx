import React from 'react';

/** Fixed, full-system background featuring the Vietnamese Culture Day cartoon festival illustration. */
export type BackdropView = 'study' | 'shop' | 'blitz' | 'map' | 'lobby' | 'leaderboard';

const CULTURE_BG_SRC = `${import.meta.env.BASE_URL}assets/aistudio/image_dbe11a39.png`;

const VIEW_TINTS: Record<BackdropView, string> = {
  study: 'from-[#f6efe0]/75 via-[#f6efe0]/20 to-amber-50/10',
  shop: 'from-[#f6efe0]/75 via-fuchsia-50/20 to-amber-50/15',
  blitz: 'from-[#f6efe0]/70 via-orange-50/20 to-amber-50/10',
  map: 'from-[#f6efe0]/70 via-emerald-50/20 to-teal-50/10',
  lobby: 'from-[#f6efe0]/70 via-emerald-50/20 to-lime-50/10',
  leaderboard: 'from-[#f6efe0]/75 via-amber-50/25 to-yellow-50/10'
};

export const AppBackdrop: React.FC<{ view?: BackdropView }> = ({ view = 'study' }) => {
  const lightWash = VIEW_TINTS[view];
  return (
    <div aria-hidden className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[#f6efe0] dark:bg-[#0f1722]">
      {/* Illustrated cultural festival scene with cartoon characters, banyan tree & flags */}
      <img
        src={CULTURE_BG_SRC}
        alt=""
        decoding="async"
        className="w-full h-full object-cover object-[30%_bottom] sm:object-[center_72%] opacity-90 dark:opacity-35 dark:brightness-75 dark:saturate-110 transition-opacity duration-500"
      />

      {/* Soft parchment top wash for crisp card contrast while keeping characters vibrant below & around margins */}
      <div className={`absolute inset-0 bg-gradient-to-b ${lightWash} dark:from-slate-950/80 dark:via-slate-950/50 dark:to-slate-950/45 transition-colors duration-500`} />

      {/* Subtle warm radial glow matching the festival palette */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-amber-300/20 dark:bg-amber-400/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-emerald-400/15 dark:bg-emerald-500/10 blur-3xl" />

      {/* Gentle festival sparkles */}
      {Array.from({ length: 10 }, (_, i) => (
        <span
          key={i}
          className="absolute hsv-anim-twinkle text-amber-400/70 dark:text-amber-200/50"
          style={{
            left: `${(i * 39 + 7) % 94}%`,
            top: `${(i * 21 + 6) % 72}%`,
            fontSize: 12 + (i % 3) * 4,
            animationDelay: `${-i * 0.7}s`
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
};
