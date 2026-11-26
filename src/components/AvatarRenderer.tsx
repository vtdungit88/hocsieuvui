import React, { useId } from 'react';
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

const OUTFIT_SLEEVE_PALETTE: Record<string, { sleeve: string; cuff: string; pants: string; shoe: string }> = {
  outfit_uniform: { sleeve: '#FFFFFF', cuff: '#DC2626', pants: '#1E3A8A', shoe: '#2563EB' },
  outfit_scout: { sleeve: '#D97706', cuff: '#78350F', pants: '#475569', shoe: '#92400E' },
  outfit_sport: { sleeve: '#EA580C', cuff: '#FFFFFF', pants: '#1E293B', shoe: '#F97316' },
  outfit_hoodie: { sleeve: '#4F46E5', cuff: '#818CF8', pants: '#334155', shoe: '#4F46E5' },
  outfit_racer: { sleeve: '#0284C7', cuff: '#FFFFFF', pants: '#0F172A', shoe: '#EF4444' },
  outfit_ranger_red: { sleeve: '#DC2626', cuff: '#FFFFFF', pants: '#B91C1C', shoe: '#FFFFFF' },
  outfit_lab: { sleeve: '#F8FAFC', cuff: '#0284C7', pants: '#334155', shoe: '#0284C7' },
  outfit_detective: { sleeve: '#334155', cuff: '#94A3B8', pants: '#1E293B', shoe: '#1E293B' },
  outfit_ninja: { sleeve: '#0F172A', cuff: '#DC2626', pants: '#0F172A', shoe: '#1E293B' },
  outfit_varsity: { sleeve: '#FEF3C7', cuff: '#1E3A8A', pants: '#1D4ED8', shoe: '#EA580C' },
  outfit_hero_core: { sleeve: '#B91C1C', cuff: '#FACC15', pants: '#991B1B', shoe: '#F59E0B' },
  outfit_knight: { sleeve: '#CBD5E1', cuff: '#F59E0B', pants: '#475569', shoe: '#64748B' },
  outfit_hero_shield: { sleeve: '#1E40AF', cuff: '#FFFFFF', pants: '#1E3A8A', shoe: '#DC2626' },
  outfit_aodai_tech: { sleeve: '#B91C1C', cuff: '#FDE047', pants: '#F8FAFC', shoe: '#D97706' },
  outfit_astronaut: { sleeve: '#F8FAFC', cuff: '#EA580C', pants: '#E2E8F0', shoe: '#EA580C' },
  outfit_scholar: { sleeve: '#581C87', cuff: '#F59E0B', pants: '#3B0764', shoe: '#7C3AED' },
  outfit_wizard_ice: { sleeve: '#0369A1', cuff: '#BAE6FD', pants: '#0C4A6E', shoe: '#0EA5E9' },
  outfit_ranger_gold: { sleeve: '#F59E0B', cuff: '#FEF08A', pants: '#1E293B', shoe: '#D97706' },
  outfit_cyber: { sleeve: '#1E293B', cuff: '#22D3EE', pants: '#0F172A', shoe: '#0284C7' },
  outfit_mecha_pilot: { sleeve: '#1E293B', cuff: '#38BDF8', pants: '#1E3A8A', shoe: '#EF4444' }
};

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
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9_-]/g, '');

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
  const palette = OUTFIT_SLEEVE_PALETTE[config.outfitId] || OUTFIT_SLEEVE_PALETTE.outfit_uniform;
  const isGirlSkirt =
    config.gender === 'girl' &&
    (config.outfitId === 'outfit_uniform' ||
      config.outfitId === 'outfit_hoodie' ||
      config.outfitId === 'outfit_scholar' ||
      config.outfitId === 'outfit_wizard_ice');

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
          {/* Chibi 3D skin highlight & chin shadow overlay */}
          <radialGradient id={`skinShading_${uid}`} cx="40%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.28" />
            <stop offset="65%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0.18" />
          </radialGradient>

          {/* Soft rosy chibi cheek blush */}
          <radialGradient id={`blush_${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FB7185" stopOpacity="0.58" />
            <stop offset="65%" stopColor="#FB7185" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#FB7185" stopOpacity="0" />
          </radialGradient>

          {/* Hair 3D volumetric highlight */}
          <linearGradient id={`hairGloss_${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.34" />
            <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0.24" />
          </linearGradient>

          {/* Torso soft 3D volume shading */}
          <linearGradient id={`clothShade_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
            <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0.2" />
          </linearGradient>

          {/* Gold & silver toy-metallic gradients */}
          <linearGradient id={`goldMetal_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="48%" stopColor="#FACC15" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          <linearGradient id={`silverMetal_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          <linearGradient id={`carpetGrad_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          <linearGradient id={`hoverGrad_${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>

          <linearGradient id={`cyberSuit_${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="55%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          <linearGradient id={`rgbKey_${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="25%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="75%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>

          <linearGradient id={`flameAura_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>

          <radialGradient id={`groundShadow_${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0F172A" stopOpacity="0.28" />
            <stop offset="70%" stopColor="#0F172A" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
          </radialGradient>

          <filter id={`glowEffect_${uid}`} x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 0. AURA LAYER (Behind character) */}
        {showAura && <AvatarAuraLayer auraId={auraId} animated={animated} uid={uid} />}

        {/* Soft Ground Contact Shadow */}
        <ellipse cx="150" cy="316" rx="76" ry="13" fill={`url(#groundShadow_${uid})`} />

        {/* FLOATING WRAPPER FOR CHARACTER + VEHICLE */}
        <g className={animated && isFloatingVehicle ? 'studio-float' : ''}>
          {/* 1. VEHICLE / BASE (Bottom Layer) */}
          {showVehicle && <AvatarVehicleLayer vehicleId={config.vehicleId} uid={uid} />}

          {/* 2. CHIBI LEGS & CHUNKY SNEAKERS */}
          <g id="legs-layer">
            {/* Legs / Socks & Trousers */}
            <rect x="119" y="236" width="21" height="58" rx="9" fill={palette.pants} stroke="#1E293B" strokeWidth="1.8" />
            <rect x="160" y="236" width="21" height="58" rx="9" fill={palette.pants} stroke="#1E293B" strokeWidth="1.8" />
            {/* Knee highlight sheen */}
            <rect x="123" y="242" width="6" height="44" rx="3" fill="#FFFFFF" opacity="0.12" />
            <rect x="164" y="242" width="6" height="44" rx="3" fill="#FFFFFF" opacity="0.12" />
            {/* Skirt flare for female student styles */}
            {isGirlSkirt && (
              <g>
                <path
                  d="M111 236 L189 236 L196 266 Q150 272 104 266 Z"
                  fill={config.outfitId === 'outfit_uniform' ? '#1E3A8A' : palette.pants}
                  stroke="#0F172A"
                  strokeWidth="1.8"
                />
                <line x1="130" y1="240" x2="126" y2="265" stroke="#FFFFFF" strokeOpacity="0.22" strokeWidth="2" />
                <line x1="150" y1="240" x2="150" y2="267" stroke="#FFFFFF" strokeOpacity="0.22" strokeWidth="2" />
                <line x1="170" y1="240" x2="174" y2="265" stroke="#FFFFFF" strokeOpacity="0.22" strokeWidth="2" />
              </g>
            )}

            {/* Chunky 3D Cartoon Sneakers (hidden when wearing honeycomb sandals) */}
            {config.vehicleId !== 'veh_honeycomb' && (
              <g>
                {/* Left Sneaker */}
                <ellipse cx="127" cy="303" rx="18" ry="8" fill="#F8FAFC" stroke="#1E293B" strokeWidth="1.8" />
                <path
                  d="M111 299 Q115 285 130 286 Q142 287 143 299 Z"
                  fill={palette.shoe}
                  stroke="#1E293B"
                  strokeWidth="1.8"
                />
                <ellipse cx="121" cy="297" rx="6" ry="3.5" fill="#FFFFFF" opacity="0.9" />
                <line x1="126" y1="289" x2="133" y2="291" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                <line x1="125" y1="293" x2="133" y2="295" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

                {/* Right Sneaker */}
                <ellipse cx="173" cy="303" rx="18" ry="8" fill="#F8FAFC" stroke="#1E293B" strokeWidth="1.8" />
                <path
                  d="M157 299 Q158 287 170 286 Q185 285 189 299 Z"
                  fill={palette.shoe}
                  stroke="#1E293B"
                  strokeWidth="1.8"
                />
                <ellipse cx="179" cy="297" rx="6" ry="3.5" fill="#FFFFFF" opacity="0.9" />
                <line x1="167" y1="291" x2="174" y2="289" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                <line x1="167" y1="295" x2="175" y2="293" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              </g>
            )}
          </g>

          {/* BREATHING TORSO + HEAD + ARMS + HANDHELD + PHONE + TECH */}
          <g className={animated ? 'studio-breathe' : ''}>
            {/* 3. OUTFIT / TORSO */}
            <AvatarOutfitLayer outfitId={config.outfitId} uid={uid} />

            {/* 4. PLUMP CARTOON ARMS, SLEEVES & HANDS */}
            <g id="arms-layer">
              {/* Left Arm (Sleeve + Forearm + Chibi Hand) */}
              <path
                d="M107 166 Q88 186 89 212"
                stroke={skin}
                strokeWidth="16"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M107 166 Q91 180 91 196"
                stroke={palette.sleeve}
                strokeWidth="19"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="91" cy="197" r="9.5" fill="none" stroke={palette.cuff} strokeWidth="3.5" opacity="0.95" />
              <circle cx="89" cy="214" r="9.5" fill={skin} stroke="#B45309" strokeOpacity="0.28" strokeWidth="1.4" />
              <circle cx="89" cy="214" r="9.5" fill={`url(#skinShading_${uid})`} />

              {/* Right Arm (Sleeve + Forearm + Chibi Hand) */}
              <path
                d="M193 166 Q212 186 211 212"
                stroke={skin}
                strokeWidth="16"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M193 166 Q209 180 209 196"
                stroke={palette.sleeve}
                strokeWidth="19"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="209" cy="197" r="9.5" fill="none" stroke={palette.cuff} strokeWidth="3.5" opacity="0.95" />
              <circle cx="211" cy="214" r="9.5" fill={skin} stroke="#B45309" strokeOpacity="0.28" strokeWidth="1.4" />
              <circle cx="211" cy="214" r="9.5" fill={`url(#skinShading_${uid})`} />
            </g>

            {/* 5 & 6. HEAD, EYES, HAIR & HEADGEAR */}
            <AvatarHeadLayer config={config} skin={skin} hair={hair} animated={animated} uid={uid} />

            {/* 7, 8 & 9. HANDHELD, PHONE & TECH ACCESSORIES */}
            <AvatarAccessoriesLayer config={config} showTech={showTech} animated={animated} uid={uid} />
          </g>
        </g>

        {/* 10. COMPANION PET */}
        {showPet && <AvatarPetLayer config={config} animated={animated} uid={uid} />}
      </svg>
    </div>
  );
};
