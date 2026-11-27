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
  size?: 'xs' | 'thumb' | 'sm' | 'md' | 'lg' | 'xl';
  showVehicle?: boolean;
  showTech?: boolean;
  showPet?: boolean;
  showAura?: boolean;
  showPedestal?: boolean;
  animated?: boolean;
  isReacting?: boolean;
  facing?: 1 | -1;
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

const ARMORED_BOOT_OUTFITS = new Set([
  'outfit_hero_core',
  'outfit_knight',
  'outfit_hero_shield',
  'outfit_astronaut',
  'outfit_ranger_red',
  'outfit_ranger_gold',
  'outfit_cyber',
  'outfit_mecha_pilot',
  'outfit_racer'
]);

const OUTFIT_SLEEVE_PALETTE: Record<
  string,
  { sleeve: string; sleeveDark: string; cuff: string; pants: string; pantsDark: string; shoe: string; shoeAccent: string }
> = {
  outfit_uniform: {
    sleeve: '#FFFFFF',
    sleeveDark: '#CBD5E1',
    cuff: '#EF4444',
    pants: '#2563EB',
    pantsDark: '#1E3A8A',
    shoe: '#3B82F6',
    shoeAccent: '#FFFFFF'
  },
  outfit_scout: {
    sleeve: '#F59E0B',
    sleeveDark: '#B45309',
    cuff: '#78350F',
    pants: '#64748B',
    pantsDark: '#334155',
    shoe: '#B45309',
    shoeAccent: '#FDE047'
  },
  outfit_sport: {
    sleeve: '#FB923C',
    sleeveDark: '#C2410C',
    cuff: '#FFFFFF',
    pants: '#334155',
    pantsDark: '#0F172A',
    shoe: '#F97316',
    shoeAccent: '#FEF08A'
  },
  outfit_hoodie: {
    sleeve: '#60A5FA',
    sleeveDark: '#2563EB',
    cuff: '#FFFFFF',
    pants: '#475569',
    pantsDark: '#1E293B',
    shoe: '#3B82F6',
    shoeAccent: '#FACC15'
  },
  outfit_racer: {
    sleeve: '#38BDF8',
    sleeveDark: '#0369A1',
    cuff: '#FFFFFF',
    pants: '#1E293B',
    pantsDark: '#0F172A',
    shoe: '#EF4444',
    shoeAccent: '#FACC15'
  },
  outfit_ranger_red: {
    sleeve: '#EF4444',
    sleeveDark: '#991B1B',
    cuff: '#FACC15',
    pants: '#DC2626',
    pantsDark: '#7F1D1D',
    shoe: '#F8FAFC',
    shoeAccent: '#EF4444'
  },
  outfit_lab: {
    sleeve: '#F8FAFC',
    sleeveDark: '#CBD5E1',
    cuff: '#0EA5E9',
    pants: '#475569',
    pantsDark: '#1E293B',
    shoe: '#0284C7',
    shoeAccent: '#BAE6FD'
  },
  outfit_detective: {
    sleeve: '#475569',
    sleeveDark: '#1E293B',
    cuff: '#94A3B8',
    pants: '#334155',
    pantsDark: '#0F172A',
    shoe: '#78350F',
    shoeAccent: '#D97706'
  },
  outfit_ninja: {
    sleeve: '#1E293B',
    sleeveDark: '#090D1F',
    cuff: '#EF4444',
    pants: '#1E293B',
    pantsDark: '#090D1F',
    shoe: '#334155',
    shoeAccent: '#EF4444'
  },
  outfit_varsity: {
    sleeve: '#FEF3C7',
    sleeveDark: '#FDE68A',
    cuff: '#1D4ED8',
    pants: '#2563EB',
    pantsDark: '#1E3A8A',
    shoe: '#F97316',
    shoeAccent: '#FFFFFF'
  },
  outfit_hero_core: {
    sleeve: '#DC2626',
    sleeveDark: '#7F1D1D',
    cuff: '#FACC15',
    pants: '#B91C1C',
    pantsDark: '#7F1D1D',
    shoe: '#F59E0B',
    shoeAccent: '#38BDF8'
  },
  outfit_knight: {
    sleeve: '#E2E8F0',
    sleeveDark: '#64748B',
    cuff: '#F59E0B',
    pants: '#64748B',
    pantsDark: '#334155',
    shoe: '#CBD5E1',
    shoeAccent: '#F59E0B'
  },
  outfit_hero_shield: {
    sleeve: '#2563EB',
    sleeveDark: '#1E3A8A',
    cuff: '#FFFFFF',
    pants: '#1D4ED8',
    pantsDark: '#1E3A8A',
    shoe: '#DC2626',
    shoeAccent: '#FFFFFF'
  },
  outfit_aodai_tech: {
    sleeve: '#EF4444',
    sleeveDark: '#991B1B',
    cuff: '#FDE047',
    pants: '#F8FAFC',
    pantsDark: '#CBD5E1',
    shoe: '#F59E0B',
    shoeAccent: '#FEF08A'
  },
  outfit_astronaut: {
    sleeve: '#FFFFFF',
    sleeveDark: '#CBD5E1',
    cuff: '#F97316',
    pants: '#F1F5F9',
    pantsDark: '#94A3B8',
    shoe: '#F97316',
    shoeAccent: '#38BDF8'
  },
  outfit_scholar: {
    sleeve: '#7C3AED',
    sleeveDark: '#4C1D95',
    cuff: '#FACC15',
    pants: '#5B21B6',
    pantsDark: '#2E1065',
    shoe: '#8B5CF6',
    shoeAccent: '#FDE047'
  },
  outfit_wizard_ice: {
    sleeve: '#0EA5E9',
    sleeveDark: '#0369A1',
    cuff: '#E0F2FE',
    pants: '#0284C7',
    pantsDark: '#0C4A6E',
    shoe: '#38BDF8',
    shoeAccent: '#FFFFFF'
  },
  outfit_ranger_gold: {
    sleeve: '#FACC15',
    sleeveDark: '#B45309',
    cuff: '#1E293B',
    pants: '#334155',
    pantsDark: '#0F172A',
    shoe: '#F59E0B',
    shoeAccent: '#FFFFFF'
  },
  outfit_cyber: {
    sleeve: '#1E293B',
    sleeveDark: '#090D1F',
    cuff: '#22D3EE',
    pants: '#1E293B',
    pantsDark: '#090D1F',
    shoe: '#0EA5E9',
    shoeAccent: '#22D3EE'
  },
  outfit_mecha_pilot: {
    sleeve: '#3B82F6',
    sleeveDark: '#1E3A8A',
    cuff: '#FACC15',
    pants: '#1D4ED8',
    pantsDark: '#1E3A8A',
    shoe: '#EF4444',
    shoeAccent: '#22D3EE'
  }
};

export const AvatarRenderer: React.FC<AvatarRendererProps> = ({
  config,
  size = 'md',
  showVehicle = true,
  showTech = true,
  showPet = true,
  showAura = true,
  showPedestal = false,
  animated = true,
  isReacting = false,
  facing = 1,
  onTap,
  className = ''
}) => {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  // Hiệu ứng ánh sáng 3D (đồ chơi nhựa bóng) – chỉ ở cỡ lớn, và bỏ qua trên máy yếu khi đang hoạt họa để giữ độ mượt.
  const useToy =
    (size === 'md' || size === 'lg' || size === 'xl') &&
    !(animated && typeof navigator !== 'undefined' && (navigator.hardwareConcurrency || 4) < 6);

  const sizeMap = {
    xs: { width: 28, height: 32 },
    thumb: { width: 48, height: 54 },
    sm: { width: 96, height: 108 },
    md: { width: 205, height: 235 },
    lg: { width: 290, height: 330 },
    xl: { width: 345, height: 395 }
  };

  const skin = config.skinColor || '#FDDFC6';
  const hair = config.hairColor || '#1E293B';
  const auraId = config.auraId || 'aura_none';
  const isFloatingVehicle = FLOATING_VEHICLES.has(config.vehicleId);
  const palette = OUTFIT_SLEEVE_PALETTE[config.outfitId] || OUTFIT_SLEEVE_PALETTE.outfit_uniform;
  const isArmored = ARMORED_BOOT_OUTFITS.has(config.outfitId);
  const isGirlSkirt =
    config.gender === 'girl' &&
    (config.outfitId === 'outfit_uniform' ||
      config.outfitId === 'outfit_hoodie' ||
      config.outfitId === 'outfit_scholar' ||
      config.outfitId === 'outfit_wizard_ice' ||
      config.outfitId === 'outfit_varsity');

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
        viewBox="0 0 320 360"
        className="w-full h-full overflow-visible drop-shadow-[0_12px_18px_rgba(15,23,42,0.22)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Pixar-style 3D spherical face & limb shading */}
          <radialGradient id={`skinShading_${uid}`} cx="38%" cy="28%" r="72%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.34" />
            <stop offset="58%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="86%" stopColor="#C2410C" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#9A3412" stopOpacity="0.28" />
          </radialGradient>

          {/* Soft airbrushed rosy cheek blush */}
          <radialGradient id={`blush_${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FB7185" stopOpacity="0.62" />
            <stop offset="55%" stopColor="#F43F5E" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#FB7185" stopOpacity="0" />
          </radialGradient>

          {/* Hair 3D volumetric gloss & shadow */}
          <linearGradient id={`hairGloss_${uid}`} x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.38" />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0.34" />
          </linearGradient>

          {/* Cloth / Garment 3D volume shading */}
          <linearGradient id={`clothShade_${uid}`} x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.28" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0.28" />
          </linearGradient>

          {/* Sleeves & Trousers 3D directional shading */}
          <linearGradient id={`sleeveGrad_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={palette.sleeve} />
            <stop offset="100%" stopColor={palette.sleeveDark} />
          </linearGradient>
          <linearGradient id={`pantsGrad_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={palette.pants} />
            <stop offset="100%" stopColor={palette.pantsDark} />
          </linearGradient>
          <linearGradient id={`shoeGrad_${uid}`} x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor={palette.shoe} />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0.45" />
          </linearGradient>

          {/* Metallic gold & silver toy gradients */}
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
            <stop offset="0%" stopColor="#0F172A" stopOpacity="0.34" />
            <stop offset="68%" stopColor="#0F172A" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
          </radialGradient>

          <radialGradient id={`pedestalGlow_${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.65" />
            <stop offset="65%" stopColor="#0EA5E9" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>

          <filter id={`glowEffect_${uid}`} x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
<filter id={`toy3d_${uid}`} x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" result="h" />
            <feSpecularLighting in="h" surfaceScale="5" specularConstant="0.3" specularExponent="28" lightingColor="#FFFFFF" result="spec">
              <feDistantLight azimuth="235" elevation="55" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceAlpha" operator="in" result="specIn" />
            <feDiffuseLighting in="h" surfaceScale="4.0" diffuseConstant="1" lightingColor="#FFFFFF" result="dif">
              <feDistantLight azimuth="235" elevation="60" />
            </feDiffuseLighting>
            <feComposite in="SourceGraphic" in2="dif" operator="arithmetic" k1="1.12" k2="0" k3="0" k4="0" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" result="litIn" />
            <feBlend in="specIn" in2="litIn" mode="screen" />
          </filter>
          <filter id={`softAO_${uid}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#0F172A" floodOpacity="0.22" />
          </filter>
        </defs>

        {/* 0. AURA LAYER (Behind character, soft luminescent glow) */}
        {showAura && <AvatarAuraLayer auraId={auraId} animated={animated} uid={uid} />}

        {/* Optional Holographic Studio Pedestal matching 3D Character Customizer concept */}
        {showPedestal ? (
          <g transform="translate(160 326)">
            <ellipse cx="0" cy="4" rx="108" ry="22" fill={`url(#pedestalGlow_${uid})`} />
            <ellipse
              cx="0"
              cy="2"
              rx="86"
              ry="15"
              fill="#0EA5E9"
              fillOpacity="0.16"
              stroke="#38BDF8"
              strokeWidth="2.5"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="66"
              ry="10"
              fill="#E0F2FE"
              fillOpacity="0.38"
              stroke="#BAE6FD"
              strokeWidth="1.5"
            />
            <ellipse cx="0" cy="0" rx="52" ry="7" fill={`url(#groundShadow_${uid})`} />
          </g>
        ) : (
          <ellipse cx="160" cy="326" rx="82" ry="14" fill={`url(#groundShadow_${uid})`} />
        )}

        {/* FACING + FLOATING WRAPPER FOR CHARACTER + VEHICLE */}
        <g
          transform={facing === -1 ? 'translate(320 0) scale(-1 1)' : undefined}
          filter={useToy ? `url(#toy3d_${uid})` : undefined}
        >
          <g className={animated && isFloatingVehicle ? 'studio-float' : ''}>
            {/* 1. VEHICLE / BASE (Bottom Layer) */}
            {showVehicle && <AvatarVehicleLayer vehicleId={config.vehicleId} uid={uid} />}

            {/* 2. SCULPTED CHIBI LEGS, SHORTS/SKIRT & 3D TOY SNEAKERS */}
            <g id="legs-layer">
              {/* Upper legs / shorts / sculpted trousers */}
              {isArmored ? (
                <>
                  {/* Full sculpted armored/sport pants */}
                  <path
                    d="M127 240 Q124 268 128 292 L152 292 Q154 266 155 244 Z"
                    fill={`url(#pantsGrad_${uid})`}
                  />
                  <path
                    d="M193 240 Q196 268 192 292 L168 292 Q166 266 165 244 Z"
                    fill={`url(#pantsGrad_${uid})`}
                  />
                  {/* Sculpted 3D knee pads */}
                  <rect x="128" y="262" width="22" height="12" rx="6" fill={palette.cuff} />
                  <rect x="170" y="262" width="22" height="12" rx="6" fill={palette.cuff} />
                  <rect x="131" y="264" width="12" height="4" rx="2" fill="#FFFFFF" opacity="0.45" />
                  <rect x="173" y="264" width="12" height="4" rx="2" fill="#FFFFFF" opacity="0.45" />
                </>
              ) : (
                <>
                  {/* Skin lower legs + cute ribbed white socks */}
                  <path d="M131 264 L149 264 L148 294 L132 294 Z" fill={skin} />
                  <path d="M131 264 L149 264 L148 294 L132 294 Z" fill={`url(#skinShading_${uid})`} />
                  <path d="M171 264 L189 264 L188 294 L172 294 Z" fill={skin} />
                  <path d="M171 264 L189 264 L188 294 L172 294 Z" fill={`url(#skinShading_${uid})`} />

                  {/* Crew Socks */}
                  <rect x="130" y="282" width="20" height="14" rx="5" fill="#F8FAFC" />
                  <rect x="170" y="282" width="20" height="14" rx="5" fill="#F8FAFC" />
                  <line x1="132" y1="286" x2="148" y2="286" stroke={palette.cuff} strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="172" y1="286" x2="188" y2="286" stroke={palette.cuff} strokeWidth="2.5" strokeLinecap="round" />

                  {/* Cuffed Denim/School Shorts (when not wearing skirt) */}
                  {!isGirlSkirt && (
                    <g>
                      <path
                        d="M123 236 L197 236 L196 270 Q178 273 166 268 L160 255 L154 268 Q142 273 124 270 Z"
                        fill={`url(#pantsGrad_${uid})`}
                      />
                      {/* Cuffs */}
                      <rect x="123" y="264" width="32" height="8" rx="4" fill="#FFFFFF" fillOpacity="0.22" />
                      <rect x="165" y="264" width="32" height="8" rx="4" fill="#FFFFFF" fillOpacity="0.22" />
                      {/* Shorts highlight */}
                      <path d="M130 242 Q140 246 144 260" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                      <path d="M190 242 Q180 246 176 260" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                    </g>
                  )}
                </>
              )}

              {/* Pleated 3D Girl Skirt */}
              {isGirlSkirt && (
                <g filter={`url(#softAO_${uid})`}>
                  <path
                    d="M122 235 L198 235 L208 272 Q160 280 112 272 Z"
                    fill={`url(#pantsGrad_${uid})`}
                  />
                  {/* Soft pleat ridges */}
                  <path d="M138 238 L131 273" stroke="#0F172A" strokeOpacity="0.2" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M160 238 L160 275" stroke="#0F172A" strokeOpacity="0.2" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M182 238 L189 273" stroke="#0F172A" strokeOpacity="0.2" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M122 267 Q160 275 198 267" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="2.5" fill="none" />
                </g>
              )}

              {/* Chunky 3D Toy Sneakers / Boots (hidden when wearing honeycomb sandals) */}
              {config.vehicleId !== 'veh_honeycomb' && (
                <g filter={`url(#softAO_${uid})`}>
                  {/* Left Sneaker */}
                  <g transform="translate(-2 0)">
                    {/* Thick rubber midsole */}
                    <path d="M114 307 Q114 318 136 318 Q156 318 156 307 Q156 301 135 301 Q114 301 114 307 Z" fill="#F8FAFC" />
                    <path d="M115 312 Q135 317 155 312" stroke="#CBD5E1" strokeWidth="2.5" fill="none" />
                    {/* Sculpted sneaker upper */}
                    <path
                      d="M116 305 Q116 287 136 287 Q152 287 154 305 Z"
                      fill={palette.shoe}
                    />
                    <path
                      d="M116 305 Q116 287 136 287 Q152 287 154 305 Z"
                      fill={`url(#clothShade_${uid})`}
                    />
                    {/* Glossy toe cap */}
                    <ellipse cx="126" cy="303" rx="9" ry="5" fill={palette.shoeAccent} opacity="0.92" />
                    {/* Laces */}
                    <line x1="132" y1="291" x2="142" y2="293" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
                    <line x1="130" y1="296" x2="141" y2="298" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
                  </g>

                  {/* Right Sneaker */}
                  <g transform="translate(2 0)">
                    <path d="M164 307 Q164 318 184 318 Q206 318 206 307 Q206 301 185 301 Q164 301 164 307 Z" fill="#F8FAFC" />
                    <path d="M165 312 Q185 317 205 312" stroke="#CBD5E1" strokeWidth="2.5" fill="none" />
                    <path
                      d="M166 305 Q168 287 184 287 Q204 287 204 305 Z"
                      fill={palette.shoe}
                    />
                    <path
                      d="M166 305 Q168 287 184 287 Q204 287 204 305 Z"
                      fill={`url(#clothShade_${uid})`}
                    />
                    <ellipse cx="194" cy="303" rx="9" ry="5" fill={palette.shoeAccent} opacity="0.92" />
                    <line x1="178" y1="293" x2="188" y2="291" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
                    <line x1="179" y1="298" x2="190" y2="296" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
                  </g>
                </g>
              )}
            </g>

            {/* BREATHING TORSO + HEAD + ARMS + HANDHELD + PHONE + TECH */}
            <g className={animated ? 'studio-breathe' : ''}>
              {/* 3. OUTFIT / TORSO */}
              <AvatarOutfitLayer outfitId={config.outfitId} uid={uid} />

              {/* 4. SCULPTED CHIBI ARMS, PUFFY SLEEVES & PLUMP HANDS */}
              <g id="arms-layer" filter={`url(#softAO_${uid})`}>
                {/* Left Arm (cheerful outward slant) */}
                <g>
                  {/* Forearm skin */}
                  <path
                    d="M107 195 Q99 208 98 222 Q105 225 112 221 Q115 208 119 198 Z"
                    fill={skin}
                  />
                  <path
                    d="M107 195 Q99 208 98 222 Q105 225 112 221 Q115 208 119 198 Z"
                    fill={`url(#skinShading_${uid})`}
                  />
                  {/* Sculpted Sleeve */}
                  <path
                    d="M123 171 Q105 174 99 198 Q108 205 120 202 Q124 188 127 177 Z"
                    fill={`url(#sleeveGrad_${uid})`}
                  />
                  <ellipse cx="109.5" cy="200" rx="10.5" ry="4" fill={palette.cuff} transform="rotate(14 109.5 200)" />
                  {/* Chubby hand + thumb */}
                  <circle cx="104" cy="224" r="10.5" fill={skin} />
                  <circle cx="104" cy="224" r="10.5" fill={`url(#skinShading_${uid})`} />
                  <ellipse cx="111.5" cy="220" rx="4.5" ry="3.5" fill={skin} transform="rotate(-25 111.5 220)" />
                </g>

                {/* Right Arm (slightly raised / friendly wave-ready angle) */}
                <g>
                  <path
                    d="M213 195 Q221 208 222 222 Q215 225 208 221 Q205 208 201 198 Z"
                    fill={skin}
                  />
                  <path
                    d="M213 195 Q221 208 222 222 Q215 225 208 221 Q205 208 201 198 Z"
                    fill={`url(#skinShading_${uid})`}
                  />
                  <path
                    d="M197 171 Q215 174 221 198 Q212 205 200 202 Q196 188 193 177 Z"
                    fill={`url(#sleeveGrad_${uid})`}
                  />
                  <ellipse cx="210.5" cy="200" rx="10.5" ry="4" fill={palette.cuff} transform="rotate(-14 210.5 200)" />
                  <circle cx="216" cy="224" r="10.5" fill={skin} />
                  <circle cx="216" cy="224" r="10.5" fill={`url(#skinShading_${uid})`} />
                  <ellipse cx="208.5" cy="220" rx="4.5" ry="3.5" fill={skin} transform="rotate(25 208.5 220)" />
                </g>
              </g>

              {/* 5 & 6. GIANT EXPRESSIVE PIXAR-CHIBI HEAD, EYES, HAIR & HEADGEAR */}
              <AvatarHeadLayer config={config} skin={skin} hair={hair} animated={animated} uid={uid} />

              {/* 7, 8 & 9. HANDHELD, PHONE & TECH ACCESSORIES */}
              <AvatarAccessoriesLayer config={config} showTech={showTech} animated={animated} uid={uid} />
            </g>
          </g>
        </g>

        {/* 10. COMPANION PET */}
        {showPet && <AvatarPetLayer config={config} animated={animated} uid={uid} />}
      </svg>
    </div>
  );
};
