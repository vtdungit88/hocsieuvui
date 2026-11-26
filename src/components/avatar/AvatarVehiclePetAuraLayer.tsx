import React from 'react';
import { AvatarConfig } from '../../types';

interface AuraLayerProps {
  auraId: string;
  animated: boolean;
}

export const AvatarAuraLayer: React.FC<AuraLayerProps> = ({ auraId, animated }) => {
  if (!auraId || auraId === 'aura_none') return null;

  return (
    <g id="aura-layer">
      {auraId === 'aura_sparkle' && (
        <g className={animated ? 'studio-aura-spin' : ''}>
          <circle cx="150" cy="190" r="98" fill="none" stroke="#FACC15" strokeWidth="2" strokeDasharray="6 10" opacity="0.7" />
          <polygon points="150,78 154,88 164,88 156,94 159,104 150,98 141,104 144,94 136,88 146,88" fill="#FDE047" />
          <circle cx="62" cy="185" r="4" fill="#FEF08A" />
          <circle cx="238" cy="185" r="4" fill="#FEF08A" />
          <circle cx="95" cy="272" r="3.5" fill="#FACC15" />
          <circle cx="205" cy="272" r="3.5" fill="#FACC15" />
        </g>
      )}

      {auraId === 'aura_footsteps' && (
        <g className={animated ? 'studio-aura-pulse' : ''}>
          <ellipse cx="150" cy="312" rx="92" ry="18" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="8 6" opacity="0.85" />
          <ellipse cx="150" cy="312" rx="68" ry="12" fill="none" stroke="#FACC15" strokeWidth="2" opacity="0.7" />
          <polygon points="82,306 85,311 90,311 86,314 88,319 82,316 76,319 78,314 74,311 79,311" fill="#FDE047" />
          <polygon points="218,306 221,311 226,311 222,314 224,319 218,316 212,319 214,314 210,311 215,311" fill="#FDE047" />
        </g>
      )}

      {auraId === 'aura_rainbow' && (
        <g className={animated ? 'studio-aura-pulse' : ''}>
          <path d="M52 245 A102 102 0 0 1 248 245" fill="none" stroke="#EF4444" strokeWidth="5" opacity="0.7" />
          <path d="M58 245 A96 96 0 0 1 242 245" fill="none" stroke="#F59E0B" strokeWidth="5" opacity="0.7" />
          <path d="M64 245 A90 90 0 0 1 236 245" fill="none" stroke="#10B981" strokeWidth="5" opacity="0.7" />
          <path d="M70 245 A84 84 0 0 1 230 245" fill="none" stroke="#38BDF8" strokeWidth="5" opacity="0.7" />
          <circle cx="64" cy="145" r="4" fill="#FEF08A" />
          <circle cx="236" cy="145" r="4" fill="#FEF08A" />
        </g>
      )}

      {auraId === 'aura_electric' && (
        <g className={animated ? 'studio-aura-pulse' : ''} filter="url(#glowEffect)">
          <ellipse cx="150" cy="195" rx="108" ry="62" fill="none" stroke="#38BDF8" strokeWidth="2.5" transform="rotate(-18 150 195)" opacity="0.75" />
          <ellipse cx="150" cy="195" rx="108" ry="62" fill="none" stroke="#0EA5E9" strokeWidth="2" transform="rotate(18 150 195)" opacity="0.65" />
          <circle cx="56" cy="158" r="5" fill="#7DD3FC" />
          <circle cx="244" cy="230" r="5" fill="#7DD3FC" />
        </g>
      )}

      {auraId === 'aura_ice' && (
        <g className={animated ? 'studio-aura-spin' : ''} filter="url(#glowEffect)">
          <circle cx="150" cy="190" r="102" fill="none" stroke="#BAE6FD" strokeWidth="2" strokeDasharray="4 8" opacity="0.85" />
          <polygon points="150,74 155,86 167,86 157,93 161,105 150,98 139,105 143,93 133,86 145,86" fill="#E0F2FE" />
          <polygon points="56,185 62,193 56,201 50,193" fill="#7DD3FC" />
          <polygon points="244,185 250,193 244,201 238,193" fill="#7DD3FC" />
          <polygon points="90,268 95,274 90,280 85,274" fill="#BAE6FD" />
          <polygon points="210,268 215,274 210,280 205,274" fill="#BAE6FD" />
        </g>
      )}

      {auraId === 'aura_lightning' && (
        <g className={animated ? 'studio-aura-pulse' : ''} filter="url(#glowEffect)">
          <circle cx="150" cy="190" r="102" fill="none" stroke="#FACC15" strokeWidth="2" strokeDasharray="12 6" opacity="0.7" />
          <polyline points="62,125 46,158 64,158 50,198" fill="none" stroke="#FDE047" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="238,125 254,158 236,158 250,198" fill="none" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="145,62 158,76 147,82 158,96" fill="none" stroke="#FACC15" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}

      {auraId === 'aura_flame' && (
        <g className={animated ? 'studio-aura-pulse' : ''} filter="url(#glowEffect)">
          <circle cx="150" cy="190" r="105" fill="none" stroke="url(#flameAura)" strokeWidth="4" opacity="0.75" />
          <circle cx="150" cy="190" r="92" fill="none" stroke="#FEF08A" strokeWidth="1.5" strokeDasharray="10 6" opacity="0.8" />
          <path d="M55 215 Q42 175 68 145 Q58 180 70 205 Z" fill="#F59E0B" opacity="0.8" />
          <path d="M245 215 Q258 175 232 145 Q242 180 230 205 Z" fill="#F59E0B" opacity="0.8" />
        </g>
      )}

      {auraId === 'aura_wings_angel' && (
        <g className={animated ? 'studio-float' : ''} filter="url(#glowEffect)">
          <path d="M126 182 Q70 112 30 148 Q52 178 44 205 Q78 205 120 220 Z" fill="#FFFFFF" stroke="#FDE047" strokeWidth="2.5" />
          <path d="M112 192 Q64 150 48 172" fill="none" stroke="#FEF08A" strokeWidth="2" />
          <path d="M174 182 Q230 112 270 148 Q248 178 256 205 Q222 205 180 220 Z" fill="#FFFFFF" stroke="#FDE047" strokeWidth="2.5" />
          <path d="M188 192 Q236 150 252 172" fill="none" stroke="#FEF08A" strokeWidth="2" />
        </g>
      )}

      {auraId === 'aura_wings_cyber' && (
        <g className={animated ? 'studio-aura-pulse' : ''} filter="url(#glowEffect)">
          <polygon points="122,185 32,126 48,176 26,204 118,225" fill="#0EA5E9" fillOpacity="0.65" stroke="#BAE6FD" strokeWidth="2" />
          <polygon points="105,192 54,158 64,194" fill="#FACC15" opacity="0.8" />
          <polygon points="178,185 268,126 252,176 274,204 182,225" fill="#0EA5E9" fillOpacity="0.65" stroke="#BAE6FD" strokeWidth="2" />
          <polygon points="195,192 246,158 236,194" fill="#FACC15" opacity="0.8" />
        </g>
      )}
    </g>
  );
};

export const AvatarVehicleLayer: React.FC<{ vehicleId: string }> = ({ vehicleId }) => {
  return (
    <g id="vehicle-layer" className="transition-all duration-300">
      {vehicleId === 'veh_honeycomb' && (
        <g id="honeycomb_sandals">
          <ellipse cx="120" cy="305" rx="16" ry="7" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
          <ellipse cx="120" cy="304" rx="12" ry="4" fill="#FEF08A" />
          <ellipse cx="180" cy="305" rx="16" ry="7" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
          <ellipse cx="180" cy="304" rx="12" ry="4" fill="#FEF08A" />
        </g>
      )}

      {vehicleId === 'veh_skateboard' && (
        <g id="veh_skateboard">
          <rect x="85" y="298" width="130" height="12" rx="6" fill="#F97316" stroke="#1E293B" strokeWidth="2.5" />
          <rect x="105" y="300" width="90" height="4" rx="2" fill="#FDE047" opacity="0.8" />
          <circle cx="110" cy="314" r="7" fill="#38BDF8" stroke="#0F172A" strokeWidth="2" />
          <circle cx="190" cy="314" r="7" fill="#38BDF8" stroke="#0F172A" strokeWidth="2" />
        </g>
      )}

      {vehicleId === 'veh_bike_mini' && (
        <g id="bike_mini">
          <circle cx="85" cy="295" r="24" fill="none" stroke="#64748B" strokeWidth="3" />
          <circle cx="85" cy="295" r="4" fill="#334155" />
          <circle cx="215" cy="295" r="24" fill="none" stroke="#64748B" strokeWidth="3" />
          <circle cx="215" cy="295" r="4" fill="#334155" />
          <path d="M85 295 L140 295 L180 260 L120 260 Z" fill="none" stroke="#0D9488" strokeWidth="5" strokeLinejoin="round" />
          <path d="M140 295 L150 245" stroke="#0D9488" strokeWidth="5" />
          <path d="M140 245 L165 245" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
          <path d="M180 260 L215 295" stroke="#0D9488" strokeWidth="4" />
          <rect x="195" y="235" width="22" height="16" rx="2" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
          <rect x="200" y="228" width="12" height="12" rx="1" fill="#3B82F6" />
        </g>
      )}

      {vehicleId === 'veh_scooter_pastel' && (
        <g id="scooter_pastel">
          <circle cx="92" cy="298" r="17" fill="#334155" stroke="#94A3B8" strokeWidth="3" />
          <circle cx="208" cy="298" r="17" fill="#334155" stroke="#94A3B8" strokeWidth="3" />
          <path d="M80 288 Q110 260 132 288 L185 288 Q195 255 215 275 L220 296 L78 296 Z" fill="#6EE7B7" stroke="#059669" strokeWidth="2.5" />
          <path d="M188 265 L196 236 L212 236" fill="none" stroke="#059669" strokeWidth="5" strokeLinecap="round" />
          <circle cx="215" cy="248" r="5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
        </g>
      )}

      {vehicleId === 'veh_mountain' && (
        <g id="bike_mountain">
          <circle cx="75" cy="295" r="26" fill="none" stroke="#1E293B" strokeWidth="5" strokeDasharray="3 2" />
          <circle cx="225" cy="295" r="26" fill="none" stroke="#1E293B" strokeWidth="5" strokeDasharray="3 2" />
          <path d="M75 295 L135 295 L185 250 L125 250 Z" fill="none" stroke="#EF4444" strokeWidth="6" strokeLinejoin="round" />
          <path d="M185 250 L225 295" stroke="#EF4444" strokeWidth="5" />
          <path d="M175 235 L215 235" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
        </g>
      )}

      {vehicleId === 'veh_ebike' && (
        <g id="bike_ebike">
          <ellipse cx="150" cy="310" rx="90" ry="14" fill="#0284C7" opacity="0.2" />
          <rect x="100" y="280" width="100" height="20" rx="8" fill="#F8FAFC" stroke="#0284C7" strokeWidth="3" />
          <circle cx="95" cy="300" r="16" fill="#334155" stroke="#64748B" strokeWidth="4" />
          <circle cx="205" cy="300" r="16" fill="#334155" stroke="#64748B" strokeWidth="4" />
          <circle cx="220" cy="255" r="6" fill="#38BDF8" filter="url(#glowEffect)" />
        </g>
      )}

      {vehicleId === 'veh_jetpack' && (
        <g id="veh_jetpack" filter="url(#glowEffect)">
          <rect x="88" y="182" width="18" height="46" rx="7" fill="#E2E8F0" stroke="#0284C7" strokeWidth="2" />
          <rect x="194" y="182" width="18" height="46" rx="7" fill="#E2E8F0" stroke="#0284C7" strokeWidth="2" />
          <polygon points="90,228 104,228 97,258" fill="#F59E0B" />
          <polygon points="196,228 210,228 203,258" fill="#F59E0B" />
          <polygon points="93,228 101,228 97,246" fill="#FEF08A" />
          <polygon points="199,228 207,228 203,246" fill="#FEF08A" />
        </g>
      )}

      {vehicleId === 'veh_supercar' && (
        <g id="veh_supercar">
          <path d="M58 292 L78 266 L185 266 L236 284 L242 302 L58 302 Z" fill="#DC2626" stroke="#1E293B" strokeWidth="2.5" />
          <polygon points="58,274 78,266 72,282 54,282" fill="#FACC15" />
          <path d="M96 270 L180 270 L198 282 L90 282 Z" fill="#BAE6FD" opacity="0.85" />
          <rect x="80" y="287" width="140" height="4" fill="#FACC15" />
          <circle cx="95" cy="304" r="15" fill="#0F172A" stroke="#94A3B8" strokeWidth="3" />
          <circle cx="95" cy="304" r="6" fill="#FACC15" />
          <circle cx="205" cy="304" r="15" fill="#0F172A" stroke="#94A3B8" strokeWidth="3" />
          <circle cx="205" cy="304" r="6" fill="#FACC15" />
        </g>
      )}

      {vehicleId === 'veh_cyber_moto' && (
        <g id="veh_cyber_moto" filter="url(#glowEffect)">
          <circle cx="84" cy="296" r="22" fill="none" stroke="#0F172A" strokeWidth="7" />
          <circle cx="84" cy="296" r="18" fill="none" stroke="#38BDF8" strokeWidth="2.5" />
          <circle cx="216" cy="296" r="22" fill="none" stroke="#0F172A" strokeWidth="7" />
          <circle cx="216" cy="296" r="18" fill="none" stroke="#38BDF8" strokeWidth="2.5" />
          <path d="M84 294 L126 266 L194 268 L216 294 L160 296 Z" fill="#1E293B" stroke="#0EA5E9" strokeWidth="2.5" />
          <circle cx="222" cy="264" r="5" fill="#FEF08A" />
        </g>
      )}

      {vehicleId === 'veh_hoverboard' && (
        <g id="hoverboard" filter="url(#glowEffect)">
          <ellipse cx="150" cy="315" rx="75" ry="14" fill="url(#hoverGrad)" />
          <ellipse cx="150" cy="315" rx="65" ry="8" fill="#0F172A" />
          <ellipse cx="150" cy="328" rx="55" ry="6" fill="#38BDF8" opacity="0.6" />
          <circle cx="105" cy="315" r="4" fill="#A5F3FC" />
          <circle cx="195" cy="315" r="4" fill="#A5F3FC" />
        </g>
      )}

      {vehicleId === 'veh_cloud_nimbus' && (
        <g id="veh_cloud_nimbus" filter="url(#glowEffect)">
          <path d="M72 312 Q150 330 228 312" stroke="#F43F5E" strokeWidth="4" fill="none" opacity="0.7" />
          <path d="M78 317 Q150 335 222 317" stroke="#38BDF8" strokeWidth="4" fill="none" opacity="0.7" />
          <circle cx="96" cy="306" r="18" fill="#FFFFFF" />
          <circle cx="126" cy="298" r="22" fill="#FEF08A" />
          <circle cx="156" cy="296" r="24" fill="#FFFFFF" />
          <circle cx="186" cy="300" r="20" fill="#FEF08A" />
          <circle cx="208" cy="306" r="15" fill="#FFFFFF" />
        </g>
      )}

      {vehicleId === 'veh_spaceship' && (
        <g id="spaceship_pod" filter="url(#glowEffect)">
          <ellipse cx="150" cy="308" rx="82" ry="18" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
          <path d="M85 304 Q150 282 215 304 L205 320 Q150 328 95 320 Z" fill="#1E293B" stroke="#0EA5E9" strokeWidth="2" />
          <ellipse cx="110" cy="322" rx="14" ry="5" fill="#F59E0B" />
          <ellipse cx="190" cy="322" rx="14" ry="5" fill="#F59E0B" />
          <circle cx="150" cy="306" r="6" fill="#38BDF8" />
        </g>
      )}

      {vehicleId === 'veh_mecha_walker' && (
        <g id="veh_mecha_walker" filter="url(#glowEffect)">
          <rect x="92" y="256" width="24" height="54" rx="6" fill="#2563EB" stroke="#FACC15" strokeWidth="2" />
          <rect x="184" y="256" width="24" height="54" rx="6" fill="#2563EB" stroke="#FACC15" strokeWidth="2" />
          <rect x="86" y="302" width="36" height="14" rx="4" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
          <rect x="178" y="302" width="36" height="14" rx="4" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
          <rect x="112" y="260" width="76" height="24" rx="6" fill="#DC2626" stroke="#FACC15" strokeWidth="2" />
          <circle cx="150" cy="272" r="7" fill="#38BDF8" />
        </g>
      )}

      {vehicleId === 'veh_magic_carpet' && (
        <g id="magic_carpet" filter="url(#glowEffect)">
          <path d="M60 305 Q150 285 240 305 Q210 325 150 325 Q90 325 60 305 Z" fill="url(#carpetGrad)" />
          <path d="M70 307 Q150 292 230 307" stroke="#FEF08A" strokeWidth="2" strokeDasharray="4 3" fill="none" />
          <circle cx="60" cy="305" r="4" fill="#F59E0B" />
          <circle cx="240" cy="305" r="4" fill="#F59E0B" />
          <text x="150" y="316" fill="#FEF08A" fontSize="11" fontWeight="bold" textAnchor="middle">1, 1, 2, 3, 5, 8, 13...</text>
        </g>
      )}

      {vehicleId === 'veh_hero_jet' && (
        <g id="veh_hero_jet" filter="url(#glowEffect)">
          <polygon points="48,308 118,280 182,280 252,308 210,320 90,320" fill="#DC2626" stroke="#E2E8F0" strokeWidth="2" />
          <ellipse cx="150" cy="298" rx="34" ry="12" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.5" />
          <ellipse cx="102" cy="322" rx="12" ry="4" fill="#FACC15" />
          <ellipse cx="198" cy="322" rx="12" ry="4" fill="#FACC15" />
        </g>
      )}
    </g>
  );
};

export const AvatarPetLayer: React.FC<{ config: AvatarConfig; animated: boolean }> = ({
  config,
  animated
}) => {
  if (config.petId === 'pet_none') return null;

  return (
    <g id="pet-layer" className={animated ? 'studio-pet-bob' : ''}>
      {config.petId === 'pet_corgi' && (
        <g transform="translate(228, 246)">
          <ellipse cx="20" cy="30" rx="16" ry="11" fill="#F97316" />
          <ellipse cx="14" cy="32" rx="8" ry="6" fill="#FFFFFF" />
          <circle cx="17" cy="15" r="11" fill="#FDBA74" />
          <ellipse cx="17" cy="18" rx="7" ry="5" fill="#FFFFFF" />
          <polygon points="8,10 12,1 17,9" fill="#EA580C" />
          <polygon points="18,9 23,1 27,10" fill="#EA580C" />
          <circle cx="13" cy="14" r="1.8" fill="#1E293B" />
          <circle cx="21" cy="14" r="1.8" fill="#1E293B" />
          <circle cx="17" cy="17" r="2" fill="#1E293B" />
          <polygon points="13,24 21,24 17,28" fill="#EF4444" />
        </g>
      )}

      {config.petId === 'pet_cat' && (
        <g transform="translate(230, 245)">
          <ellipse cx="20" cy="30" rx="15" ry="12" fill="#F97316" />
          <circle cx="18" cy="16" r="11" fill="#FDBA74" />
          <polygon points="10,10 14,3 18,10" fill="#EA580C" />
          <polygon points="20,10 24,3 28,10" fill="#EA580C" />
          <circle cx="14" cy="15" r="2" fill="#1E293B" />
          <circle cx="22" cy="15" r="2" fill="#1E293B" />
          <path d="M16 19 Q18 22 20 19" stroke="#991B1B" strokeWidth="1.5" fill="none" />
          <path d="M33 32 Q42 20 38 10" stroke="#F97316" strokeWidth="4" strokeLinecap="round" fill="none" />
        </g>
      )}

      {config.petId === 'pet_panda' && (
        <g transform="translate(226, 242)">
          <circle cx="10" cy="9" r="5" fill="#0F172A" />
          <circle cx="28" cy="9" r="5" fill="#0F172A" />
          <ellipse cx="19" cy="33" rx="14" ry="12" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          <circle cx="19" cy="17" r="12" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          <rect x="8" y="8" width="22" height="4" rx="2" fill="#DC2626" />
          <ellipse cx="14" cy="17" rx="3.5" ry="4.5" fill="#0F172A" />
          <ellipse cx="24" cy="17" rx="3.5" ry="4.5" fill="#0F172A" />
          <circle cx="14" cy="16" r="1.2" fill="#FFFFFF" />
          <circle cx="24" cy="16" r="1.2" fill="#FFFFFF" />
          <circle cx="19" cy="21" r="2" fill="#0F172A" />
        </g>
      )}

      {config.petId === 'pet_bunny' && (
        <g transform="translate(230, 236)">
          <ellipse cx="14" cy="8" rx="4" ry="11" fill="#FFFFFF" stroke="#F472B6" strokeWidth="1.5" />
          <ellipse cx="24" cy="8" rx="4" ry="11" fill="#FFFFFF" stroke="#F472B6" strokeWidth="1.5" />
          <ellipse cx="19" cy="36" rx="13" ry="11" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          <circle cx="19" cy="21" r="11" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          <circle cx="15" cy="20" r="3.5" fill="none" stroke="#0284C7" strokeWidth="1.5" />
          <circle cx="23" cy="20" r="3.5" fill="none" stroke="#0284C7" strokeWidth="1.5" />
          <circle cx="15" cy="20" r="1.2" fill="#1E293B" />
          <circle cx="23" cy="20" r="1.2" fill="#1E293B" />
          <circle cx="19" cy="24" r="1.5" fill="#F43F5E" />
        </g>
      )}

      {config.petId === 'pet_fox' && (
        <g transform="translate(226, 240)">
          <path d="M28 36 Q46 22 44 10 Q38 22 30 28 Z" fill="#F97316" />
          <path d="M31 38 Q48 34 45 20 Q38 30 31 32 Z" fill="#FACC15" />
          <ellipse cx="18" cy="34" rx="13" ry="10" fill="#EA580C" />
          <polygon points="8,12 12,1 18,11" fill="#EA580C" />
          <polygon points="19,11 26,1 28,12" fill="#EA580C" />
          <circle cx="18" cy="18" r="11" fill="#F97316" />
          <ellipse cx="18" cy="22" rx="7" ry="5" fill="#FFFFFF" />
          <circle cx="14" cy="17" r="1.8" fill="#1E293B" />
          <circle cx="22" cy="17" r="1.8" fill="#1E293B" />
          <circle cx="18" cy="21" r="1.8" fill="#0F172A" />
        </g>
      )}

      {config.petId === 'pet_owl' && (
        <g transform="translate(230, 235)">
          <ellipse cx="20" cy="30" rx="14" ry="16" fill="#78350F" />
          <ellipse cx="20" cy="32" rx="9" ry="11" fill="#FEF3C7" />
          <circle cx="20" cy="18" r="12" fill="#92400E" />
          <circle cx="15" cy="18" r="6" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="25" cy="18" r="6" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="15" cy="18" r="3" fill="#1E293B" />
          <circle cx="25" cy="18" r="3" fill="#1E293B" />
          <polygon points="18,22 22,22 20,26" fill="#EA580C" />
          <polygon points="20,4 32,8 20,12 8,8" fill="#1E3A8A" />
          <line x1="28" y1="9" x2="30" y2="16" stroke="#F59E0B" strokeWidth="1.5" />
        </g>
      )}

      {(config.petId === 'pet_robot' || config.petId === 'pet_vuibot') && (
        <g transform="translate(230, 235)" filter="url(#glowEffect)">
          <rect x="8" y="14" width="24" height="28" rx="6" fill="#E2E8F0" stroke="#0284C7" strokeWidth="2" />
          <line x1="20" y1="14" x2="20" y2="4" stroke="#64748B" strokeWidth="2" />
          <circle cx="20" cy="4" r="3" fill="#38BDF8" />
          <rect x="12" y="18" width="16" height="10" rx="2" fill="#0F172A" />
          <circle cx="16" cy="23" r="2" fill="#38BDF8" />
          <circle cx="24" cy="23" r="2" fill="#38BDF8" />
          <line x1="14" y1="34" x2="26" y2="34" stroke="#10B981" strokeWidth="2" />
        </g>
      )}

      {config.petId === 'pet_unicorn' && (
        <g transform="translate(224, 226)" filter="url(#glowEffect)">
          <ellipse cx="22" cy="40" rx="15" ry="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          <circle cx="18" cy="22" r="11" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          <polygon points="18,12 22,-2 26,12" fill="#FACC15" />
          <path d="M24 14 Q36 22 30 34" stroke="#EC4899" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M26 20 Q38 28 32 38" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <circle cx="15" cy="21" r="2" fill="#4F46E5" />
        </g>
      )}

      {config.petId === 'pet_dragon' && (
        <g transform="translate(230, 225)" filter="url(#glowEffect)">
          <ellipse cx="20" cy="35" rx="14" ry="12" fill="#DC2626" />
          <circle cx="18" cy="20" r="12" fill="#EF4444" />
          <polygon points="12,12 14,4 18,12" fill="#F59E0B" />
          <polygon points="18,12 22,4 24,12" fill="#F59E0B" />
          <circle cx="14" cy="18" r="3" fill="#FEF08A" />
          <circle cx="14" cy="18" r="1.5" fill="#78350F" />
          <path d="M30 35 Q40 25 36 12" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" fill="none" />
          <ellipse cx="8" cy="24" rx="4" ry="2" fill="#FBBF24" />
        </g>
      )}

      {config.petId === 'pet_mecha_lion' && (
        <g transform="translate(226, 232)" filter="url(#glowEffect)">
          <polygon points="6,18 11,4 20,10 29,4 34,18 29,28 11,28" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
          <rect x="10" y="28" width="20" height="18" rx="4" fill="#DC2626" stroke="#FACC15" strokeWidth="1.5" />
          <circle cx="20" cy="17" r="8" fill="#FEF08A" />
          <rect x="14" y="14" width="12" height="5" rx="2" fill="#0F172A" />
          <circle cx="17" cy="16.5" r="1.5" fill="#38BDF8" />
          <circle cx="23" cy="16.5" r="1.5" fill="#38BDF8" />
        </g>
      )}

      {config.petId === 'pet_phoenix' && (
        <g transform="translate(224, 218)" filter="url(#glowEffect)">
          <path d="M22 36 Q42 18 38 6 Q28 16 24 26 Z" fill="#F59E0B" />
          <path d="M18 36 Q2 18 8 8 Q14 18 18 28 Z" fill="#EF4444" />
          <ellipse cx="20" cy="32" rx="10" ry="12" fill="#EF4444" />
          <circle cx="20" cy="18" r="8" fill="#F59E0B" />
          <polygon points="18,10 20,2 24,10" fill="#FEF08A" />
          <circle cx="17" cy="17" r="2" fill="#FFFFFF" />
          <polygon points="16,21 20,24 22,20" fill="#FDE047" />
        </g>
      )}
    </g>
  );
};
