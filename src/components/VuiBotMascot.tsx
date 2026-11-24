import React from 'react';
import { VUIBOT_ASSETS, type VuiBotExpression } from '../data/vuibotMascot';
import { APP_LOGO_SRC } from '../data/versionHistory';

export type VuiBotMotion = 'float' | 'wave' | 'cheer' | 'none';

interface VuiBotMascotProps {
  expression?: VuiBotExpression;
  motion?: VuiBotMotion;
  showBlinkGlint?: boolean;
  alt?: string;
  className?: string;
  imgClassName?: string;
  loading?: 'eager' | 'lazy';
}

const MOTION_CLASS: Record<VuiBotMotion, string> = {
  float: 'vuibot-anim-float',
  wave: 'vuibot-anim-wave',
  cheer: 'vuibot-anim-cheer',
  none: ''
};

/**
 * Shared animated Vui-Bot character component.
 * Reuses the unified sprite set with compositor-only float, wave, and visor blink effects.
 */
export const VuiBotMascot: React.FC<VuiBotMascotProps> = ({
  expression = 'happy',
  motion = 'float',
  showBlinkGlint = true,
  alt = 'Vui-Bot – trợ lý ảo Học Siêu Vui',
  className = '',
  imgClassName = '',
  loading = 'eager'
}) => {
  const src = VUIBOT_ASSETS[expression] ?? VUIBOT_ASSETS.happy;

  return (
    <span className={`relative inline-flex items-center justify-center select-none ${MOTION_CLASS[motion]} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        referrerPolicy="no-referrer"
        onError={(e) => {
          const el = e.currentTarget;
          if (el.dataset.fallbackApplied === '1') return;
          el.dataset.fallbackApplied = '1';
          el.src = APP_LOGO_SRC;
        }}
        className={`block w-full h-full object-contain drop-shadow-[0_10px_18px_rgba(37,99,235,0.28)] ${imgClassName}`}
      />
      {showBlinkGlint && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[28%] right-[28%] top-[34%] h-[16%] rounded-full bg-cyan-300/25 blur-[2px] vuibot-anim-blink"
        />
      )}
    </span>
  );
};
