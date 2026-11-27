import React from 'react';
import { PET_ART, PET_DEFS, PET_SMOOTH } from './petArt';
import { AvatarConfig } from '../../types';

interface AuraLayerProps {
  auraId: string;
  animated: boolean;
  uid: string;
}

export const AvatarAuraLayer: React.FC<AuraLayerProps> = ({ auraId, animated, uid }) => {
  if (!auraId || auraId === 'aura_none') return null;

  return (
    <g id="aura-layer">
      {auraId === 'aura_sparkle' && (
        <g className={animated ? 'studio-aura-spin' : ''} filter={`url(#glowEffect_${uid})`}>
          <circle cx="160" cy="190" r="112" fill="none" stroke="#FACC15" strokeWidth="3" strokeDasharray="8 11" opacity="0.82" />
          <circle cx="160" cy="190" r="95" fill="none" stroke="#FEF08A" strokeWidth="2" opacity="0.48" />
          <polygon points="160,64 165,78 179,78 168,86 172,100 160,92 148,100 152,86 141,78 155,78" fill="#FDE047" />
          <circle cx="56" cy="188" r="6" fill="#FEF08A" />
          <circle cx="264" cy="188" r="6" fill="#FEF08A" />
          <circle cx="94" cy="284" r="4.5" fill="#FACC15" />
          <circle cx="226" cy="284" r="4.5" fill="#FACC15" />
        </g>
      )}

      {auraId === 'aura_footsteps' && (
        <g className={animated ? 'studio-aura-pulse' : ''} filter={`url(#glowEffect_${uid})`}>
          <ellipse cx="160" cy="322" rx="104" ry="21" fill="#38BDF8" fillOpacity="0.16" stroke="#38BDF8" strokeWidth="3" strokeDasharray="9 6" />
          <ellipse cx="160" cy="322" rx="76" ry="14" fill="none" stroke="#FACC15" strokeWidth="2.8" opacity="0.9" />
          <polygon points="82,315 85,321 91,321 86,324 88,330 82,326 76,330 78,324 73,321 79,321" fill="#FDE047" />
          <polygon points="238,315 241,321 247,321 242,324 244,330 238,326 232,330 234,324 229,321 235,321" fill="#FDE047" />
        </g>
      )}

      {auraId === 'aura_rainbow' && (
        <g className={animated ? 'studio-aura-pulse' : ''} filter={`url(#glowEffect_${uid})`}>
          <path d="M44 252 A116 116 0 0 1 276 252" fill="none" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" opacity="0.82" />
          <path d="M50 252 A110 110 0 0 1 270 252" fill="none" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" opacity="0.82" />
          <path d="M56 252 A104 104 0 0 1 264 252" fill="none" stroke="#FACC15" strokeWidth="6" strokeLinecap="round" opacity="0.82" />
          <path d="M62 252 A98 98 0 0 1 258 252" fill="none" stroke="#22C55E" strokeWidth="6" strokeLinecap="round" opacity="0.82" />
          <path d="M68 252 A92 92 0 0 1 252 252" fill="none" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" opacity="0.82" />
          {/* Fluffy glowing rainbow clouds */}
          <circle cx="52" cy="252" r="15" fill="#FFFFFF" />
          <circle cx="67" cy="248" r="12" fill="#FFFFFF" />
          <circle cx="268" cy="252" r="15" fill="#FFFFFF" />
          <circle cx="253" cy="248" r="12" fill="#FFFFFF" />
        </g>
      )}

      {auraId === 'aura_electric' && (
        <g className={animated ? 'studio-aura-pulse' : ''} filter={`url(#glowEffect_${uid})`}>
          <ellipse cx="160" cy="196" rx="120" ry="66" fill="none" stroke="#38BDF8" strokeWidth="3.5" transform="rotate(-18 160 196)" opacity="0.85" />
          <ellipse cx="160" cy="196" rx="120" ry="66" fill="none" stroke="#0EA5E9" strokeWidth="2.8" transform="rotate(18 160 196)" opacity="0.75" />
          <circle cx="54" cy="158" r="6.5" fill="#7DD3FC" />
          <circle cx="266" cy="234" r="6.5" fill="#7DD3FC" />
          <circle cx="160" cy="264" r="5" fill="#BAE6FD" />
        </g>
      )}

      {auraId === 'aura_ice' && (
        <g className={animated ? 'studio-aura-spin' : ''} filter={`url(#glowEffect_${uid})`}>
          <circle cx="160" cy="190" r="112" fill="#E0F2FE" fillOpacity="0.1" stroke="#BAE6FD" strokeWidth="3" strokeDasharray="6 9" />
          <polygon points="160,62 165,76 179,76 168,85 172,99 160,91 148,99 152,85 141,76 155,76" fill="#E0F2FE" />
          <polygon points="52,188 61,199 52,210 43,199" fill="#7DD3FC" />
          <polygon points="268,188 277,199 268,210 259,199" fill="#7DD3FC" />
          <polygon points="90,282 98,291 90,300 82,291" fill="#BAE6FD" />
          <polygon points="230,282 238,291 230,300 222,291" fill="#BAE6FD" />
        </g>
      )}

      {auraId === 'aura_lightning' && (
        <g className={animated ? 'studio-aura-pulse' : ''} filter={`url(#glowEffect_${uid})`}>
          <circle cx="160" cy="190" r="112" fill="none" stroke="#FACC15" strokeWidth="3" strokeDasharray="13 7" opacity="0.78" />
          <polyline points="56,120 38,158 58,158 42,204" fill="none" stroke="#FDE047" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="264,120 282,158 262,158 278,204" fill="none" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="154,48 168,64 156,71 170,87" fill="none" stroke="#FACC15" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}

      {auraId === 'aura_flame' && (
        <g className={animated ? 'studio-aura-pulse' : ''} filter={`url(#glowEffect_${uid})`}>
          <circle cx="160" cy="192" r="114" fill="none" stroke={`url(#flameAura_${uid})`} strokeWidth="5.5" opacity="0.86" />
          <circle cx="160" cy="192" r="100" fill="none" stroke="#FEF08A" strokeWidth="2.5" strokeDasharray="11 7" opacity="0.88" />
          <path d="M50 224 Q32 174 68 134 Q54 178 70 212 Z" fill="#F59E0B" opacity="0.9" />
          <path d="M270 224 Q288 174 252 134 Q266 178 250 212 Z" fill="#F59E0B" opacity="0.9" />
        </g>
      )}

      {auraId === 'aura_wings_angel' && (
        <g className={animated ? 'studio-float' : ''} filter={`url(#glowEffect_${uid})`}>
          {/* Overhead luminous golden halo */}
          <ellipse cx="160" cy="26" rx="36" ry="8" fill="none" stroke={`url(#goldMetal_${uid})`} strokeWidth="4.5" />
          {/* Luminous feathered left wing (zero dark outline, soft white + cyan/gold glow!) */}
          <path
            d="M128 182 Q58 92 14 138 Q32 170 20 192 Q46 202 36 222 Q80 220 124 234 Z"
            fill="#FFFFFF"
            fillOpacity="0.96"
          />
          <path d="M116 196 Q60 142 38 168" fill="none" stroke="#BAE6FD" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M112 212 Q66 180 48 198" fill="none" stroke="#FEF08A" strokeWidth="3" strokeLinecap="round" />
          {/* Luminous feathered right wing */}
          <path
            d="M192 182 Q262 92 306 138 Q288 170 300 192 Q274 202 284 222 Q240 220 196 234 Z"
            fill="#FFFFFF"
            fillOpacity="0.96"
          />
          <path d="M204 196 Q260 142 282 168" fill="none" stroke="#BAE6FD" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M208 212 Q254 180 272 198" fill="none" stroke="#FEF08A" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}

      {auraId === 'aura_wings_cyber' && (
        <g className={animated ? 'studio-aura-pulse' : ''} filter={`url(#glowEffect_${uid})`}>
          <polygon points="124,186 16,114 40,174 12,210 118,234" fill="#0EA5E9" fillOpacity="0.72" />
          <polygon points="110,192 46,148 62,198" fill="#FACC15" opacity="0.9" />
          <polygon points="196,186 304,114 280,174 308,210 202,234" fill="#0EA5E9" fillOpacity="0.72" />
          <polygon points="210,192 274,148 258,198" fill="#FACC15" opacity="0.9" />
          <ellipse cx="160" cy="322" rx="94" ry="17" fill="#0EA5E9" fillOpacity="0.24" stroke="#38BDF8" strokeWidth="2.5" />
        </g>
      )}
    </g>
  );
};

export const AvatarVehicleLayer: React.FC<{ vehicleId: string; uid: string }> = ({ vehicleId, uid }) => {
  return (
    <g id="vehicle-layer" className="transition-all duration-300" filter={`url(#softAO_${uid})`}>
      {vehicleId === 'veh_honeycomb' && (
        <g id="honeycomb_sandals">
          <ellipse cx="136" cy="312" rx="20" ry="8.5" fill={`url(#goldMetal_${uid})`} />
          <ellipse cx="136" cy="310.5" rx="14" ry="4.5" fill="#FEF08A" />
          <ellipse cx="184" cy="312" rx="20" ry="8.5" fill={`url(#goldMetal_${uid})`} />
          <ellipse cx="184" cy="310.5" rx="14" ry="4.5" fill="#FEF08A" />
        </g>
      )}

      {vehicleId === 'veh_skateboard' && (
        <g id="veh_skateboard">
          <rect x="86" y="305" width="148" height="14" rx="7" fill="#F97316" />
          <rect x="110" y="308" width="100" height="4.5" rx="2.2" fill="#FDE047" opacity="0.9" />
          <circle cx="114" cy="322" r="8" fill="#38BDF8" />
          <circle cx="114" cy="322" r="3.5" fill="#FFFFFF" />
          <circle cx="206" cy="322" r="8" fill="#38BDF8" />
          <circle cx="206" cy="322" r="3.5" fill="#FFFFFF" />
        </g>
      )}

      {vehicleId === 'veh_bike_mini' && (
        <g id="bike_mini">
          <circle cx="92" cy="302" r="24" fill="none" stroke="#475569" strokeWidth="4.5" />
          <circle cx="92" cy="302" r="5.5" fill="#334155" />
          <circle cx="228" cy="302" r="24" fill="none" stroke="#475569" strokeWidth="4.5" />
          <circle cx="228" cy="302" r="5.5" fill="#334155" />
          <path d="M92 302 L148 302 L190 264 L128 264 Z" fill="none" stroke="#14B8A6" strokeWidth="6" strokeLinejoin="round" />
          <path d="M148 302 L158 250" stroke="#14B8A6" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M148 250 L174 250" stroke="#334155" strokeWidth="6.5" strokeLinecap="round" />
          <path d="M190 264 L228 302" stroke="#14B8A6" strokeWidth="5" strokeLinecap="round" />
          <rect x="206" y="242" width="24" height="18" rx="6" fill="#FDE68A" />
          <rect x="212" y="234" width="12" height="11" rx="3" fill="#3B82F6" />
        </g>
      )}

      {vehicleId === 'veh_scooter_pastel' && (
        <g id="scooter_pastel">
          <circle cx="96" cy="304" r="18" fill="#334155" />
          <circle cx="96" cy="304" r="10" fill="#CBD5E1" />
          <circle cx="224" cy="304" r="18" fill="#334155" />
          <circle cx="224" cy="304" r="10" fill="#CBD5E1" />
          <path d="M84 294 Q116 264 142 294 L196 294 Q208 260 230 282 L235 302 L82 302 Z" fill="#6EE7B7" />
          <path d="M198 272 L208 242 L224 242" fill="none" stroke="#059669" strokeWidth="5.5" strokeLinecap="round" />
          <circle cx="230" cy="254" r="6" fill="#FEF08A" />
        </g>
      )}

      {vehicleId === 'veh_mountain' && (
        <g id="bike_mountain">
          <circle cx="84" cy="302" r="26" fill="none" stroke="#1E293B" strokeWidth="6" strokeDasharray="4 2" />
          <circle cx="236" cy="302" r="26" fill="none" stroke="#1E293B" strokeWidth="6" strokeDasharray="4 2" />
          <path d="M84 302 L144 302 L196 256 L134 256 Z" fill="none" stroke="#EF4444" strokeWidth="6.5" strokeLinejoin="round" />
          <path d="M196 256 L236 302" stroke="#EF4444" strokeWidth="5.5" />
          <path d="M186 242 L226 242" stroke="#0F172A" strokeWidth="6.5" strokeLinecap="round" />
        </g>
      )}

      {vehicleId === 'veh_ebike' && (
        <g id="bike_ebike">
          <ellipse cx="160" cy="316" rx="94" ry="15" fill="#0284C7" opacity="0.22" />
          <rect x="104" y="286" width="112" height="22" rx="11" fill="#F8FAFC" />
          <rect x="114" y="292" width="92" height="6" rx="3" fill="#0EA5E9" />
          <circle cx="102" cy="307" r="17" fill="#334155" />
          <circle cx="102" cy="307" r="8" fill="#CBD5E1" />
          <circle cx="218" cy="307" r="17" fill="#334155" />
          <circle cx="218" cy="307" r="8" fill="#CBD5E1" />
          <circle cx="232" cy="264" r="6.5" fill="#38BDF8" filter={`url(#glowEffect_${uid})`} />
        </g>
      )}

      {vehicleId === 'veh_jetpack' && (
        <g id="veh_jetpack" filter={`url(#glowEffect_${uid})`}>
          <rect x="92" y="182" width="21" height="48" rx="9" fill={`url(#silverMetal_${uid})`} />
          <rect x="207" y="182" width="21" height="48" rx="9" fill={`url(#silverMetal_${uid})`} />
          <rect x="95" y="190" width="15" height="8" rx="4" fill="#0284C7" />
          <rect x="210" y="190" width="15" height="8" rx="4" fill="#0284C7" />
          <polygon points="94,230 111,230 102.5,264" fill="#F59E0B" />
          <polygon points="209,230 226,230 217.5,264" fill="#F59E0B" />
          <polygon points="98,230 107,230 102.5,250" fill="#FEF08A" />
          <polygon points="213,230 222,230 217.5,250" fill="#FEF08A" />
        </g>
      )}

      {vehicleId === 'veh_supercar' && (
        <g id="veh_supercar">
          <path d="M60 298 L84 270 L198 270 L252 290 L258 310 L60 310 Z" fill="#EF4444" />
          <path d="M60 298 L84 270 L198 270 L252 290 L258 310 L60 310 Z" fill={`url(#clothShade_${uid})`} />
          <polygon points="60,278 84,270 78,288 56,288" fill="#FACC15" />
          <path d="M104 274 L192 274 L210 288 L98 288 Z" fill="#BAE6FD" opacity="0.92" />
          <rect x="86" y="293" width="148" height="5" rx="2.5" fill="#FACC15" />
          <circle cx="102" cy="311" r="16" fill="#0F172A" />
          <circle cx="102" cy="311" r="8" fill={`url(#goldMetal_${uid})`} />
          <circle cx="218" cy="311" r="16" fill="#0F172A" />
          <circle cx="218" cy="311" r="8" fill={`url(#goldMetal_${uid})`} />
        </g>
      )}

      {vehicleId === 'veh_cyber_moto' && (
        <g id="veh_cyber_moto" filter={`url(#glowEffect_${uid})`}>
          <circle cx="92" cy="303" r="23" fill="none" stroke="#0F172A" strokeWidth="8" />
          <circle cx="92" cy="303" r="18" fill="none" stroke="#38BDF8" strokeWidth="3.2" />
          <circle cx="228" cy="303" r="23" fill="none" stroke="#0F172A" strokeWidth="8" />
          <circle cx="228" cy="303" r="18" fill="none" stroke="#38BDF8" strokeWidth="3.2" />
          <path d="M92 301 L134 270 L206 272 L228 301 L170 303 Z" fill="#1E293B" />
          <path d="M134 273 L206 275" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" />
          <circle cx="234" cy="269" r="6" fill="#FEF08A" />
        </g>
      )}

      {vehicleId === 'veh_hoverboard' && (
        <g id="hoverboard" filter={`url(#glowEffect_${uid})`}>
          <ellipse cx="160" cy="321" rx="80" ry="15" fill={`url(#hoverGrad_${uid})`} />
          <ellipse cx="160" cy="321" rx="68" ry="8.5" fill="#0F172A" />
          <ellipse cx="160" cy="334" rx="58" ry="6.5" fill="#38BDF8" opacity="0.65" />
          <circle cx="110" cy="321" r="5" fill="#A5F3FC" />
          <circle cx="210" cy="321" r="5" fill="#A5F3FC" />
        </g>
      )}

      {vehicleId === 'veh_cloud_nimbus' && (
        <g id="veh_cloud_nimbus" filter={`url(#glowEffect_${uid})`}>
          <path d="M74 318 Q160 340 246 318" stroke="#F43F5E" strokeWidth="5" fill="none" opacity="0.78" />
          <path d="M80 325 Q160 346 240 325" stroke="#38BDF8" strokeWidth="5" fill="none" opacity="0.78" />
          <circle cx="102" cy="312" r="19" fill="#FFFFFF" />
          <circle cx="134" cy="304" r="23" fill="#FEF08A" />
          <circle cx="164" cy="302" r="25" fill="#FFFFFF" />
          <circle cx="196" cy="306" r="21" fill="#FEF08A" />
          <circle cx="220" cy="312" r="16" fill="#FFFFFF" />
        </g>
      )}

      {vehicleId === 'veh_spaceship' && (
        <g id="spaceship_pod" filter={`url(#glowEffect_${uid})`}>
          <ellipse cx="160" cy="314" rx="88" ry="19" fill="#0F172A" />
          <path d="M90 310 Q160 284 230 310 L220 326 Q160 335 100 326 Z" fill="#1E293B" />
          <ellipse cx="116" cy="328" rx="15" ry="5.5" fill="#F59E0B" />
          <ellipse cx="204" cy="328" rx="15" ry="5.5" fill="#F59E0B" />
          <circle cx="160" cy="312" r="7" fill="#38BDF8" />
        </g>
      )}

      {vehicleId === 'veh_mecha_walker' && (
        <g id="veh_mecha_walker" filter={`url(#glowEffect_${uid})`}>
          <rect x="98" y="262" width="26" height="54" rx="9" fill="#2563EB" />
          <rect x="196" y="262" width="26" height="54" rx="9" fill="#2563EB" />
          <rect x="92" y="308" width="38" height="15" rx="6" fill="#0F172A" />
          <rect x="190" y="308" width="38" height="15" rx="6" fill="#0F172A" />
          <rect x="120" y="266" width="80" height="26" rx="9" fill="#EF4444" />
          <circle cx="160" cy="279" r="8" fill="#38BDF8" />
        </g>
      )}

      {vehicleId === 'veh_magic_carpet' && (
        <g id="magic_carpet" filter={`url(#glowEffect_${uid})`}>
          <path d="M64 312 Q160 290 256 312 Q222 334 160 334 Q98 334 64 312 Z" fill={`url(#carpetGrad_${uid})`} />
          <path d="M74 314 Q160 298 246 314" stroke="#FEF08A" strokeWidth="2.4" strokeDasharray="5 3" fill="none" />
          <circle cx="64" cy="312" r="5" fill="#F59E0B" />
          <circle cx="256" cy="312" r="5" fill="#F59E0B" />
          <text x="160" y="323" fill="#FEF08A" fontSize="11" fontWeight="bold" textAnchor="middle">
            1, 1, 2, 3, 5, 8, 13...
          </text>
        </g>
      )}

      {vehicleId === 'veh_hero_jet' && (
        <g id="veh_hero_jet" filter={`url(#glowEffect_${uid})`}>
          <polygon points="50,314 126,284 194,284 270,314 222,327 98,327" fill="#DC2626" />
          <ellipse cx="160" cy="304" rx="37" ry="13" fill="#38BDF8" />
          <ellipse cx="108" cy="329" rx="13" ry="4.5" fill="#FACC15" />
          <ellipse cx="212" cy="329" rx="13" ry="4.5" fill="#FACC15" />
        </g>
      )}
    </g>
  );
};

export const AvatarPetLayer: React.FC<{ config: AvatarConfig; animated: boolean; uid: string }> = ({
  config,
  animated,
  uid
}) => {
  if (config.petId === 'pet_none') return null;

  const vuiBotSpriteUrl = `${import.meta.env.BASE_URL}assets/vuibot/happy.png`;
  const isVuiBot = config.petId === 'pet_vuibot' || config.petId === 'pet_robot';
  const art = PET_ART[config.petId];
  const fx = PET_SMOOTH.has(config.petId) ? 'petSmooth' : 'petFur';

  // Thú cưng được vẽ lớn (~110px trên khung 320) đứng cạnh nhân vật, có lông, mắt bóng và bóng đổ.
  return (
    <g id="pet-layer" className={animated ? 'studio-pet-bob' : ''} filter={`url(#softAO_${uid})`}>
      {isVuiBot && (
        <g transform="translate(208, 232)">
          <ellipse cx="52" cy="102" rx="34" ry="7" fill="#0284C7" opacity="0.22" />
          <image href={vuiBotSpriteUrl} x="0" y="0" width="104" height="108" preserveAspectRatio="xMidYMid meet" />
        </g>
      )}
      {art && (
        <g transform="translate(208, 238)">
          <defs dangerouslySetInnerHTML={{ __html: PET_DEFS.split('__UID__').join(uid) }} />
          <g filter={`url(#${fx}_${uid})`} dangerouslySetInnerHTML={{ __html: art.split('__UID__').join(uid) }} />
        </g>
      )}
    </g>
  );
};
