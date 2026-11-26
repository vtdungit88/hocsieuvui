import React from 'react';
import { AvatarConfig } from '../types';
import { AvatarHeadLayer } from './avatar/AvatarHeadLayer';
import { AvatarOutfitLayer } from './avatar/AvatarOutfitLayer';
import { AvatarAccessoriesLayer } from './avatar/AvatarAccessoriesLayer';
import {
  AvatarAuraLayer,
  AvatarVehicleLayer,
  AvatarPetLayer
} from './avatar/AvatarVehiclePetAuraLayer';

interface AvatarRendererProps {
  config: AvatarConfig;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showVehicle?: boolean;
  showTech?: boolean;
  showPet?: boolean;
  showAura?: boolean;
  animated?: boolean;
  isReacting?: boolean;
  onTap?: () => void;
  className?: string;
}

const FLOATING_VEHICLES = new Set([
  'veh_hoverboard',
  'veh_magic_carpet',
  'veh_spaceship',
  'veh_cloud_nimbus',
  'veh_hero_jet',
  'veh_jetpack'
]);

export const AvatarRenderer: React.FC<AvatarRendererProps> = ({
  config,
  size = 'md',
  showVehicle = true,
  showTech = true,
  showPet = true,
  showAura = true,
  animated = true,
  isReacting = false,
  onTap,
  className = ''
}) => {
  const sizeMap = {
    sm: { width: 120, height: 130 },
    md: { width: 200, height: 230 },
    lg: { width: 280, height: 320 },
    xl: { width: 340, height: 390 }
  };

  const skin = config.skinColor || '#FDDFC6';
  const hair = config.hairColor || '#1E293B';
  const auraId = config.auraId || 'aura_none';
  const isFloatingVehicle = FLOATING_VEHICLES.has(config.vehicleId);

  return (
    <div
      onClick={onTap}
      role={onTap ? 'button' : undefined}
      tabIndex={onTap ? 0 : undefined}
      onKeyDown={
        onTap
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onTap();
              }
            }
          : undefined
      }
      aria-label={onTap ? 'Chạm để tương tác với nhân vật' : undefined}
      className={`relative inline-flex items-center justify-center select-none ${
        onTap ? 'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-3xl' : ''
      } ${isReacting ? 'studio-tap-jump' : ''} ${className}`}
      style={{
        width: sizeMap[size].width,
        height: sizeMap[size].height
      }}
    >
      <svg
        viewBox="0 0 300 350"
        className="w-full h-full overflow-visible drop-shadow-md"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="carpetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          <linearGradient id="hoverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>

          <linearGradient id="cyberSuit" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="50%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          <linearGradient id="rgbKey" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="25%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="75%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>

          <linearGradient id="flameAura" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>

          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 0. AURA LAYER (Behind character) */}
        {showAura && <AvatarAuraLayer auraId={auraId} animated={animated} />}

        {/* Ground Shadow */}
        <ellipse cx="150" cy="316" rx="72" ry="11" fill="#0F172A" opacity="0.16" />

        {/* FLOATING WRAPPER FOR CHARACTER + VEHICLE */}
        <g className={animated && isFloatingVehicle ? 'studio-float' : ''}>
          {/* 1. VEHICLE / BASE (Bottom Layer) */}
          {showVehicle && <AvatarVehicleLayer vehicleId={config.vehicleId} />}

          {/* 2. BODY / LEGS */}
          <g id="legs-layer">
            <rect x="120" y="240" width="18" height="60" rx="6" fill="#1E3A8A" />
            <rect x="162" y="240" width="18" height="60" rx="6" fill="#1E3A8A" />
            {config.vehicleId !== 'veh_honeycomb' && (
              <>
                <ellipse cx="128" cy="300" rx="14" ry="7" fill="#0F172A" />
                <ellipse cx="172" cy="300" rx="14" ry="7" fill="#0F172A" />
              </>
            )}
          </g>

          {/* BREATHING TORSO + HEAD + ARMS + HANDHELD + PHONE + TECH */}
          <g className={animated ? 'studio-breathe' : ''}>
            {/* 3. OUTFIT / TORSO */}
            <AvatarOutfitLayer outfitId={config.outfitId} />

            {/* 4. ARMS */}
            <g id="arms-layer">
              <path d="M105 165 Q85 195 90 220" stroke={skin} strokeWidth="16" strokeLinecap="round" fill="none" />
              <path d="M195 165 Q215 195 210 220" stroke={skin} strokeWidth="16" strokeLinecap="round" fill="none" />
            </g>

            {/* 5 & 6. HEAD, EYES, HAIR & HEADGEAR */}
            <AvatarHeadLayer config={config} skin={skin} hair={hair} animated={animated} />

            {/* 7, 8 & 9. HANDHELD, PHONE & TECH ACCESSORIES */}
            <AvatarAccessoriesLayer config={config} showTech={showTech} animated={animated} />
          </g>
        </g>

        {/* 10. COMPANION PET */}
        {showPet && <AvatarPetLayer config={config} animated={animated} />}
      </svg>
    </div>
  );
};
