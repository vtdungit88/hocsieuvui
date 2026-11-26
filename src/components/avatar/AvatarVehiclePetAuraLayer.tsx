import React from 'react';
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
        <g className={animated ? 'studio-aura-spin' : ''}>
          <circle cx="150" cy="186" r="104" fill="none" stroke="#FACC15" strokeWidth="2.5" strokeDasharray="8 10" opacity="0.75" />
          <circle cx="150" cy="186" r="88" fill="none" stroke="#FEF08A" strokeWidth="1.5" opacity="0.45" />
          <polygon points="150,70 155,83 168,83 157,91 161,104 150,96 139,104 143,91 132,83 145,83" fill="#FDE047" stroke="#D97706" strokeWidth="1" />
          <circle cx="56" cy="184" r="5" fill="#FEF08A" />
          <circle cx="244" cy="184" r="5" fill="#FEF08A" />
          <circle cx="90" cy="272" r="4" fill="#FACC15" />
          <circle cx="210" cy="272" r="4" fill="#FACC15" />
        </g>
      )}

      {auraId === 'aura_footsteps' && (
        <g className={animated ? 'studio-aura-pulse' : ''}>
          <ellipse cx="150" cy="312" rx="96" ry="20" fill="#38BDF8" fillOpacity="0.12" stroke="#38BDF8" strokeWidth="2.8" strokeDasharray="8 6" />
          <ellipse cx="150" cy="312" rx="70" ry="13" fill="none" stroke="#FACC15" strokeWidth="2.4" opacity="0.85" />
          <polygon points="80,305 83,310 89,310 84,313 86,319 80,315 74,319 76,313 71,310 77,310" fill="#FDE047" />
          <polygon points="220,305 223,310 229,310 224,313 226,319 220,315 214,319 216,313 211,310 217,310" fill="#FDE047" />
        </g>
      )}

      {auraId === 'aura_rainbow' && (
        <g className={animated ? 'studio-aura-pulse' : ''}>
          <path d="M46 244 A108 108 0 0 1 254 244" fill="none" stroke="#EF4444" strokeWidth="5.5" strokeLinecap="round" opacity="0.78" />
          <path d="M52 244 A102 102 0 0 1 248 244" fill="none" stroke="#F59E0B" strokeWidth="5.5" strokeLinecap="round" opacity="0.78" />
          <path d="M58 244 A96 96 0 0 1 242 244" fill="none" stroke="#FACC15" strokeWidth="5.5" strokeLinecap="round" opacity="0.78" />
          <path d="M64 244 A90 90 0 0 1 236 244" fill="none" stroke="#22C55E" strokeWidth="5.5" strokeLinecap="round" opacity="0.78" />
          <path d="M70 244 A84 84 0 0 1 230 244" fill="none" stroke="#38BDF8" strokeWidth="5.5" strokeLinecap="round" opacity="0.78" />
          {/* Cute puffy rainbow clouds */}
          <circle cx="54" cy="244" r="14" fill="#FFFFFF" />
          <circle cx="68" cy="240" r="11" fill="#FFFFFF" />
          <circle cx="246" cy="244" r="14" fill="#FFFFFF" />
          <circle cx="232" cy="240" r="11" fill="#FFFFFF" />
        </g>
      )}

      {auraId === 'aura_electric' && (
        <g className={animated ? 'studio-aura-pulse' : ''} filter={`url(#glowEffect_${uid})`}>
          <ellipse cx="150" cy="192" rx="112" ry="64" fill="none" stroke="#38BDF8" strokeWidth="3" transform="rotate(-18 150 192)" opacity="0.8" />
          <ellipse cx="150" cy="192" rx="112" ry="64" fill="none" stroke="#0EA5E9" strokeWidth="2.4" transform="rotate(18 150 192)" opacity="0.7" />
          <circle cx="52" cy="156" r="6" fill="#7DD3FC" />
          <circle cx="248" cy="228" r="6" fill="#7DD3FC" />
          <circle cx="150" cy="256" r="4.5" fill="#BAE6FD" />
        </g>
      )}

      {auraId === 'aura_ice' && (
        <g className={animated ? 'studio-aura-spin' : ''} filter={`url(#glowEffect_${uid})`}>
          <circle cx="150" cy="186" r="106" fill="#E0F2FE" fillOpacity="0.08" stroke="#BAE6FD" strokeWidth="2.5" strokeDasharray="5 8" />
          <polygon points="150,66 155,79 169,79 158,87 162,100 150,92 138,100 142,87 131,79 145,79" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1" />
          <polygon points="52,184 60,194 52,204 44,194" fill="#7DD3FC" />
          <polygon points="248,184 256,194 248,204 240,194" fill="#7DD3FC" />
          <polygon points="86,272 93,280 86,288 79,280" fill="#BAE6FD" />
          <polygon points="214,272 221,280 214,288 207,280" fill="#BAE6FD" />
        </g>
      )}

      {auraId === 'aura_lightning' && (
        <g className={animated ? 'studio-aura-pulse' : ''} filter={`url(#glowEffect_${uid})`}>
          <circle cx="150" cy="188" r="106" fill="none" stroke="#FACC15" strokeWidth="2.5" strokeDasharray="12 6" opacity="0.75" />
          <polyline points="58,120 40,156 60,156 44,200" fill="none" stroke="#FDE047" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="242,120 260,156 240,156 256,200" fill="none" stroke="#38BDF8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="145,54 158,69 146,75 159,90" fill="none" stroke="#FACC15" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}

      {auraId === 'aura_flame' && (
        <g className={animated ? 'studio-aura-pulse' : ''} filter={`url(#glowEffect_${uid})`}>
          <circle cx="150" cy="188" r="108" fill="none" stroke={`url(#flameAura_${uid})`} strokeWidth="4.5" opacity="0.82" />
          <circle cx="150" cy="188" r="95" fill="none" stroke="#FEF08A" strokeWidth="2" strokeDasharray="10 6" opacity="0.85" />
          <path d="M52 216 Q36 172 68 136 Q56 176 70 206 Z" fill="#F59E0B" opacity="0.88" />
          <path d="M248 216 Q264 172 232 136 Q244 176 230 206 Z" fill="#F59E0B" opacity="0.88" />
        </g>
      )}

      {auraId === 'aura_wings_angel' && (
        <g className={animated ? 'studio-float' : ''} filter={`url(#glowEffect_${uid})`}>
          {/* Overhead golden halo */}
          <ellipse cx="150" cy="48" rx="34" ry="8" fill="none" stroke={`url(#goldMetal_${uid})`} strokeWidth="4" />
          {/* Luminous feathered left wing */}
          <path
            d="M126 178 Q64 98 20 136 Q38 164 26 184 Q48 192 38 212 Q78 212 120 226 Z"
            fill="#FFFFFF"
            stroke="#FDE047"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path d="M114 190 Q62 140 42 164" fill="none" stroke="#BAE6FD" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M110 204 Q66 174 52 192" fill="none" stroke="#FEF08A" strokeWidth="2.2" strokeLinecap="round" />
          {/* Luminous feathered right wing */}
          <path
            d="M174 178 Q236 98 280 136 Q262 164 274 184 Q252 192 262 212 Q222 212 180 226 Z"
            fill="#FFFFFF"
            stroke="#FDE047"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path d="M186 190 Q238 140 258 164" fill="none" stroke="#BAE6FD" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M190 204 Q234 174 248 192" fill="none" stroke="#FEF08A" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      )}

      {auraId === 'aura_wings_cyber' && (
        <g className={animated ? 'studio-aura-pulse' : ''} filter={`url(#glowEffect_${uid})`}>
          <polygon points="122,182 22,118 44,172 18,204 116,226" fill="#0EA5E9" fillOpacity="0.68" stroke="#BAE6FD" strokeWidth="2.2" />
          <polygon points="108,188 48,148 62,194" fill="#FACC15" opacity="0.88" />
          <polygon points="178,182 278,118 256,172 282,204 184,226" fill="#0EA5E9" fillOpacity="0.68" stroke="#BAE6FD" strokeWidth="2.2" />
          <polygon points="192,188 252,148 238,194" fill="#FACC15" opacity="0.88" />
          <ellipse cx="150" cy="312" rx="88" ry="16" fill="#0EA5E9" fillOpacity="0.18" stroke="#38BDF8" strokeWidth="2" />
        </g>
      )}
    </g>
  );
};

export const AvatarVehicleLayer: React.FC<{ vehicleId: string; uid: string }> = ({ vehicleId, uid }) => {
  return (
    <g id="vehicle-layer" className="transition-all duration-300">
      {vehicleId === 'veh_honeycomb' && (
        <g id="honeycomb_sandals">
          <ellipse cx="127" cy="306" rx="18" ry="7.5" fill="#FACC15" stroke="#B45309" strokeWidth="2" />
          <ellipse cx="127" cy="305" rx="13" ry="4" fill="#FEF08A" />
          <ellipse cx="173" cy="306" rx="18" ry="7.5" fill="#FACC15" stroke="#B45309" strokeWidth="2" />
          <ellipse cx="173" cy="305" rx="13" ry="4" fill="#FEF08A" />
        </g>
      )}

      {vehicleId === 'veh_skateboard' && (
        <g id="veh_skateboard">
          <rect x="82" y="298" width="136" height="13" rx="6.5" fill="#F97316" stroke="#1E293B" strokeWidth="2.4" />
          <rect x="104" y="300.5" width="92" height="4" rx="2" fill="#FDE047" opacity="0.85" />
          <circle cx="108" cy="315" r="7.5" fill="#38BDF8" stroke="#0F172A" strokeWidth="2" />
          <circle cx="192" cy="315" r="7.5" fill="#38BDF8" stroke="#0F172A" strokeWidth="2" />
        </g>
      )}

      {vehicleId === 'veh_bike_mini' && (
        <g id="bike_mini">
          <circle cx="84" cy="295" r="24" fill="none" stroke="#475569" strokeWidth="3.5" />
          <circle cx="84" cy="295" r="5" fill="#334155" />
          <circle cx="216" cy="295" r="24" fill="none" stroke="#475569" strokeWidth="3.5" />
          <circle cx="216" cy="295" r="5" fill="#334155" />
          <path d="M84 295 L140 295 L180 258 L120 258 Z" fill="none" stroke="#0D9488" strokeWidth="5.5" strokeLinejoin="round" />
          <path d="M140 295 L150 245" stroke="#0D9488" strokeWidth="5" />
          <path d="M140 245 L165 245" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
          <path d="M180 258 L216 295" stroke="#0D9488" strokeWidth="4.5" />
          <rect x="195" y="235" width="23" height="17" rx="4" fill="#FDE68A" stroke="#B45309" strokeWidth="2" />
          <rect x="200" y="227" width="12" height="11" rx="2" fill="#3B82F6" />
        </g>
      )}

      {vehicleId === 'veh_scooter_pastel' && (
        <g id="scooter_pastel">
          <circle cx="90" cy="298" r="17" fill="#334155" stroke="#CBD5E1" strokeWidth="3" />
          <circle cx="210" cy="298" r="17" fill="#334155" stroke="#CBD5E1" strokeWidth="3" />
          <path d="M78 288 Q108 260 132 288 L185 288 Q195 255 217 275 L222 296 L76 296 Z" fill="#6EE7B7" stroke="#059669" strokeWidth="2.4" />
          <path d="M188 265 L196 236 L212 236" fill="none" stroke="#059669" strokeWidth="5" strokeLinecap="round" />
          <circle cx="217" cy="248" r="5.5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
        </g>
      )}

      {vehicleId === 'veh_mountain' && (
        <g id="bike_mountain">
          <circle cx="75" cy="295" r="26" fill="none" stroke="#1E293B" strokeWidth="5.5" strokeDasharray="3 2" />
          <circle cx="225" cy="295" r="26" fill="none" stroke="#1E293B" strokeWidth="5.5" strokeDasharray="3 2" />
          <path d="M75 295 L135 295 L185 250 L125 250 Z" fill="none" stroke="#EF4444" strokeWidth="6" strokeLinejoin="round" />
          <path d="M185 250 L225 295" stroke="#EF4444" strokeWidth="5" />
          <path d="M175 235 L215 235" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
        </g>
      )}

      {vehicleId === 'veh_ebike' && (
        <g id="bike_ebike">
          <ellipse cx="150" cy="310" rx="90" ry="14" fill="#0284C7" opacity="0.22" />
          <rect x="98" y="280" width="104" height="20" rx="9" fill="#F8FAFC" stroke="#0284C7" strokeWidth="3" />
          <circle cx="95" cy="300" r="16" fill="#334155" stroke="#64748B" strokeWidth="4" />
          <circle cx="205" cy="300" r="16" fill="#334155" stroke="#64748B" strokeWidth="4" />
          <circle cx="220" cy="255" r="6" fill="#38BDF8" filter={`url(#glowEffect_${uid})`} />
        </g>
      )}

      {vehicleId === 'veh_jetpack' && (
        <g id="veh_jetpack" filter={`url(#glowEffect_${uid})`}>
          <rect x="86" y="180" width="19" height="47" rx="8" fill={`url(#silverMetal_${uid})`} stroke="#0284C7" strokeWidth="2.2" />
          <rect x="195" y="180" width="19" height="47" rx="8" fill={`url(#silverMetal_${uid})`} stroke="#0284C7" strokeWidth="2.2" />
          <polygon points="88,227 103,227 95.5,260" fill="#F59E0B" />
          <polygon points="197,227 212,227 204.5,260" fill="#F59E0B" />
          <polygon points="92,227 100,227 95.5,248" fill="#FEF08A" />
          <polygon points="201,227 209,227 204.5,248" fill="#FEF08A" />
        </g>
      )}

      {vehicleId === 'veh_supercar' && (
        <g id="veh_supercar">
          <path d="M56 292 L78 265 L186 265 L238 284 L244 303 L56 303 Z" fill="#DC2626" stroke="#1E293B" strokeWidth="2.4" strokeLinejoin="round" />
          <polygon points="56,273 78,265 72,282 52,282" fill="#FACC15" />
          <path d="M96 269 L180 269 L198 282 L90 282 Z" fill="#BAE6FD" opacity="0.9" />
          <rect x="80" y="287" width="142" height="4.5" rx="2" fill="#FACC15" />
          <circle cx="95" cy="304" r="15" fill="#0F172A" stroke="#CBD5E1" strokeWidth="3" />
          <circle cx="95" cy="304" r="6" fill={`url(#goldMetal_${uid})`} />
          <circle cx="205" cy="304" r="15" fill="#0F172A" stroke="#CBD5E1" strokeWidth="3" />
          <circle cx="205" cy="304" r="6" fill={`url(#goldMetal_${uid})`} />
        </g>
      )}

      {vehicleId === 'veh_cyber_moto' && (
        <g id="veh_cyber_moto" filter={`url(#glowEffect_${uid})`}>
          <circle cx="84" cy="296" r="22" fill="none" stroke="#0F172A" strokeWidth="7" />
          <circle cx="84" cy="296" r="18" fill="none" stroke="#38BDF8" strokeWidth="2.8" />
          <circle cx="216" cy="296" r="22" fill="none" stroke="#0F172A" strokeWidth="7" />
          <circle cx="216" cy="296" r="18" fill="none" stroke="#38BDF8" strokeWidth="2.8" />
          <path d="M84 294 L126 265 L194 267 L216 294 L160 296 Z" fill="#1E293B" stroke="#0EA5E9" strokeWidth="2.5" strokeLinejoin="round" />
          <circle cx="222" cy="264" r="5.5" fill="#FEF08A" />
        </g>
      )}

      {vehicleId === 'veh_hoverboard' && (
        <g id="hoverboard" filter={`url(#glowEffect_${uid})`}>
          <ellipse cx="150" cy="315" rx="76" ry="14" fill={`url(#hoverGrad_${uid})`} />
          <ellipse cx="150" cy="315" rx="65" ry="8" fill="#0F172A" />
          <ellipse cx="150" cy="328" rx="55" ry="6" fill="#38BDF8" opacity="0.65" />
          <circle cx="104" cy="315" r="4.5" fill="#A5F3FC" />
          <circle cx="196" cy="315" r="4.5" fill="#A5F3FC" />
        </g>
      )}

      {vehicleId === 'veh_cloud_nimbus' && (
        <g id="veh_cloud_nimbus" filter={`url(#glowEffect_${uid})`}>
          <path d="M70 312 Q150 332 230 312" stroke="#F43F5E" strokeWidth="4.5" fill="none" opacity="0.75" />
          <path d="M76 318 Q150 338 224 318" stroke="#38BDF8" strokeWidth="4.5" fill="none" opacity="0.75" />
          <circle cx="96" cy="306" r="18" fill="#FFFFFF" />
          <circle cx="126" cy="298" r="22" fill="#FEF08A" />
          <circle cx="156" cy="296" r="24" fill="#FFFFFF" />
          <circle cx="186" cy="300" r="20" fill="#FEF08A" />
          <circle cx="208" cy="306" r="15" fill="#FFFFFF" />
        </g>
      )}

      {vehicleId === 'veh_spaceship' && (
        <g id="spaceship_pod" filter={`url(#glowEffect_${uid})`}>
          <ellipse cx="150" cy="308" rx="84" ry="18" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
          <path d="M84 304 Q150 280 216 304 L206 320 Q150 328 94 320 Z" fill="#1E293B" stroke="#0EA5E9" strokeWidth="2" />
          <ellipse cx="110" cy="322" rx="14" ry="5" fill="#F59E0B" />
          <ellipse cx="190" cy="322" rx="14" ry="5" fill="#F59E0B" />
          <circle cx="150" cy="306" r="6.5" fill="#38BDF8" />
        </g>
      )}

      {vehicleId === 'veh_mecha_walker' && (
        <g id="veh_mecha_walker" filter={`url(#glowEffect_${uid})`}>
          <rect x="92" y="256" width="24" height="54" rx="7" fill="#2563EB" stroke="#FACC15" strokeWidth="2" />
          <rect x="184" y="256" width="24" height="54" rx="7" fill="#2563EB" stroke="#FACC15" strokeWidth="2" />
          <rect x="86" y="302" width="36" height="14" rx="5" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
          <rect x="178" y="302" width="36" height="14" rx="5" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
          <rect x="112" y="260" width="76" height="24" rx="7" fill="#DC2626" stroke="#FACC15" strokeWidth="2" />
          <circle cx="150" cy="272" r="7.5" fill="#38BDF8" />
        </g>
      )}

      {vehicleId === 'veh_magic_carpet' && (
        <g id="magic_carpet" filter={`url(#glowEffect_${uid})`}>
          <path d="M58 305 Q150 284 242 305 Q210 326 150 326 Q90 326 58 305 Z" fill={`url(#carpetGrad_${uid})`} />
          <path d="M68 307 Q150 292 232 307" stroke="#FEF08A" strokeWidth="2" strokeDasharray="4 3" fill="none" />
          <circle cx="58" cy="305" r="4.5" fill="#F59E0B" />
          <circle cx="242" cy="305" r="4.5" fill="#F59E0B" />
          <text x="150" y="316" fill="#FEF08A" fontSize="11" fontWeight="bold" textAnchor="middle">1, 1, 2, 3, 5, 8, 13...</text>
        </g>
      )}

      {vehicleId === 'veh_hero_jet' && (
        <g id="veh_hero_jet" filter={`url(#glowEffect_${uid})`}>
          <polygon points="46,308 118,279 182,279 254,308 210,320 90,320" fill="#DC2626" stroke="#E2E8F0" strokeWidth="2.2" strokeLinejoin="round" />
          <ellipse cx="150" cy="298" rx="35" ry="12" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.8" />
          <ellipse cx="102" cy="322" rx="12" ry="4" fill="#FACC15" />
          <ellipse cx="198" cy="322" rx="12" ry="4" fill="#FACC15" />
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

  return (
    <g id="pet-layer" className={animated ? 'studio-pet-bob' : ''}>
      {/* Plump 3D-shaded Chibi Corgi */}
      {config.petId === 'pet_corgi' && (
        <g transform="translate(222, 238)">
          <ellipse cx="22" cy="46" rx="18" ry="5" fill="#0F172A" opacity="0.14" />
          <ellipse cx="22" cy="33" rx="17" ry="12" fill="#F97316" stroke="#9A3412" strokeWidth="1.5" />
          <ellipse cx="15" cy="35" rx="9" ry="7" fill="#FFFFFF" />
          <polygon points="7,14 11,0 19,10" fill="#EA580C" stroke="#9A3412" strokeWidth="1.4" strokeLinejoin="round" />
          <polygon points="23,10 31,0 35,14" fill="#EA580C" stroke="#9A3412" strokeWidth="1.4" strokeLinejoin="round" />
          <circle cx="21" cy="17" r="13.5" fill="#FDBA74" stroke="#9A3412" strokeWidth="1.5" />
          <ellipse cx="21" cy="21" rx="8.5" ry="6" fill="#FFFFFF" />
          <ellipse cx="13" cy="20" rx="3.2" ry="2" fill="#FB7185" opacity="0.55" />
          <ellipse cx="29" cy="20" rx="3.2" ry="2" fill="#FB7185" opacity="0.55" />
          <circle cx="15.5" cy="15.5" r="2.6" fill="#0F172A" />
          <circle cx="26.5" cy="15.5" r="2.6" fill="#0F172A" />
          <circle cx="14.7" cy="14.7" r="1" fill="#FFFFFF" />
          <circle cx="25.7" cy="14.7" r="1" fill="#FFFFFF" />
          <circle cx="21" cy="19.5" r="2.2" fill="#1E293B" />
          <path d="M18.5 22 Q21 25 23.5 22" stroke="#991B1B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <polygon points="15,28 27,28 21,33" fill="#EF4444" stroke="#991B1B" strokeWidth="1" />
        </g>
      )}

      {/* Cool Chibi Cat with stylish sunglasses option vibe */}
      {config.petId === 'pet_cat' && (
        <g transform="translate(222, 238)">
          <ellipse cx="22" cy="46" rx="17" ry="5" fill="#0F172A" opacity="0.14" />
          <path d="M35 35 Q46 21 41 10" stroke="#F97316" strokeWidth="5" strokeLinecap="round" fill="none" />
          <ellipse cx="22" cy="34" rx="15" ry="12" fill="#FB923C" stroke="#9A3412" strokeWidth="1.5" />
          <ellipse cx="20" cy="35" rx="8" ry="7" fill="#FFF7ED" />
          <polygon points="10,13 13,2 20,11" fill="#EA580C" stroke="#9A3412" strokeWidth="1.4" strokeLinejoin="round" />
          <polygon points="24,11 31,2 34,13" fill="#EA580C" stroke="#9A3412" strokeWidth="1.4" strokeLinejoin="round" />
          <circle cx="22" cy="18" r="13" fill="#FED7AA" stroke="#9A3412" strokeWidth="1.5" />
          <ellipse cx="14" cy="21" rx="3" ry="1.8" fill="#FB7185" opacity="0.55" />
          <ellipse cx="30" cy="21" rx="3" ry="1.8" fill="#FB7185" opacity="0.55" />
          <circle cx="17" cy="17" r="2.6" fill="#0F172A" />
          <circle cx="27" cy="17" r="2.6" fill="#0F172A" />
          <circle cx="16.2" cy="16.2" r="1" fill="#FFFFFF" />
          <circle cx="26.2" cy="16.2" r="1" fill="#FFFFFF" />
          <path d="M19 21 Q22 24 25 21" stroke="#991B1B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </g>
      )}

      {/* Kung-fu Chibi Panda */}
      {config.petId === 'pet_panda' && (
        <g transform="translate(222, 234)">
          <ellipse cx="21" cy="50" rx="17" ry="5" fill="#0F172A" opacity="0.14" />
          <circle cx="10" cy="9" r="6" fill="#0F172A" />
          <circle cx="32" cy="9" r="6" fill="#0F172A" />
          <ellipse cx="21" cy="36" rx="15" ry="13" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          <ellipse cx="21" cy="38" rx="14" ry="5" fill="#0F172A" />
          <circle cx="21" cy="19" r="13.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          <rect x="8" y="9" width="26" height="4.5" rx="2.2" fill="#DC2626" />
          <ellipse cx="15.5" cy="19" rx="4" ry="5" fill="#0F172A" />
          <ellipse cx="26.5" cy="19" rx="4" ry="5" fill="#0F172A" />
          <circle cx="15.5" cy="18" r="1.5" fill="#FFFFFF" />
          <circle cx="26.5" cy="18" r="1.5" fill="#FFFFFF" />
          <circle cx="21" cy="23.5" r="2.2" fill="#0F172A" />
        </g>
      )}

      {/* Scholar Chibi Bunny */}
      {config.petId === 'pet_bunny' && (
        <g transform="translate(224, 228)">
          <ellipse cx="20" cy="54" rx="16" ry="5" fill="#0F172A" opacity="0.14" />
          <ellipse cx="14" cy="9" rx="4.8" ry="12" fill="#FFFFFF" stroke="#F472B6" strokeWidth="1.8" />
          <ellipse cx="26" cy="9" rx="4.8" ry="12" fill="#FFFFFF" stroke="#F472B6" strokeWidth="1.8" />
          <ellipse cx="20" cy="40" rx="14" ry="12" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.8" />
          <rect x="11" y="30" width="18" height="4.5" rx="2" fill="#FACC15" />
          <circle cx="20" cy="23" r="12.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.8" />
          <circle cx="15.5" cy="22" r="4" fill="none" stroke="#0284C7" strokeWidth="1.8" />
          <circle cx="24.5" cy="22" r="4" fill="none" stroke="#0284C7" strokeWidth="1.8" />
          <circle cx="15.5" cy="22" r="1.6" fill="#0F172A" />
          <circle cx="24.5" cy="22" r="1.6" fill="#0F172A" />
          <circle cx="20" cy="26" r="1.8" fill="#F43F5E" />
        </g>
      )}

      {/* Kitsune Chibi Fox */}
      {config.petId === 'pet_fox' && (
        <g transform="translate(220, 234)">
          <ellipse cx="21" cy="50" rx="18" ry="5" fill="#0F172A" opacity="0.14" />
          <path d="M30 39 Q50 23 47 9 Q40 22 31 29 Z" fill="#F97316" />
          <path d="M33 41 Q52 36 49 20 Q41 31 33 34 Z" fill="#FEF08A" />
          <ellipse cx="20" cy="37" rx="14" ry="11" fill="#EA580C" stroke="#9A3412" strokeWidth="1.4" />
          <polygon points="8,14 12,1 19,12" fill="#EA580C" stroke="#9A3412" strokeWidth="1.4" strokeLinejoin="round" />
          <polygon points="21,12 28,1 32,14" fill="#EA580C" stroke="#9A3412" strokeWidth="1.4" strokeLinejoin="round" />
          <circle cx="20" cy="20" r="12.5" fill="#F97316" stroke="#9A3412" strokeWidth="1.4" />
          <ellipse cx="20" cy="24" rx="8" ry="5.5" fill="#FFFFFF" />
          <circle cx="15" cy="18.5" r="2.2" fill="#0F172A" />
          <circle cx="25" cy="18.5" r="2.2" fill="#0F172A" />
          <circle cx="14.3" cy="17.8" r="0.9" fill="#FFFFFF" />
          <circle cx="24.3" cy="17.8" r="0.9" fill="#FFFFFF" />
          <circle cx="20" cy="22.5" r="2" fill="#0F172A" />
        </g>
      )}

      {/* Scholar Chibi Owl */}
      {config.petId === 'pet_owl' && (
        <g transform="translate(224, 230)">
          <ellipse cx="21" cy="52" rx="16" ry="5" fill="#0F172A" opacity="0.14" />
          <ellipse cx="21" cy="34" rx="15" ry="17" fill="#78350F" stroke="#451A03" strokeWidth="1.6" />
          <ellipse cx="21" cy="36" rx="10" ry="12" fill="#FEF3C7" />
          <circle cx="21" cy="20" r="13" fill="#92400E" stroke="#451A03" strokeWidth="1.5" />
          <circle cx="15.5" cy="20" r="6.2" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="26.5" cy="20" r="6.2" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="15.5" cy="20" r="3" fill="#0F172A" />
          <circle cx="26.5" cy="20" r="3" fill="#0F172A" />
          <circle cx="14.6" cy="19" r="1" fill="#FFFFFF" />
          <circle cx="25.6" cy="19" r="1" fill="#FFFFFF" />
          <polygon points="18.5,24 23.5,24 21,28.5" fill="#EA580C" />
          <polygon points="21,3 34,8 21,13 8,8" fill="#1E3A8A" stroke="#FACC15" strokeWidth="1" />
        </g>
      )}

      {/* Vui-Bot Mini Companion (aligned with VuiBotMascot visual design!) */}
      {(config.petId === 'pet_robot' || config.petId === 'pet_vuibot') && (
        <g transform="translate(222, 228)" filter={`url(#glowEffect_${uid})`}>
          {/* Blue mini superhero cape */}
          <path d="M12 28 L4 48 L36 48 L28 28 Z" fill="#2563EB" opacity="0.88" />
          {/* Side ear pods */}
          <rect x="4" y="13" width="6" height="12" rx="3" fill="#0284C7" />
          <rect x="30" y="13" width="6" height="12" rx="3" fill="#0284C7" />
          {/* Round white chibi bot head & torso */}
          <rect x="8" y="31" width="24" height="18" rx="8" fill="#F8FAFC" stroke="#0284C7" strokeWidth="1.8" />
          <circle cx="20" cy="40" r="5" fill="#FACC15" stroke="#0284C7" strokeWidth="1.2" />
          <rect x="7" y="7" width="26" height="24" rx="11" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
          {/* Glowing dark visor with cute curved happy cyan eyes */}
          <rect x="10" y="11" width="20" height="15" rx="6" fill="#0F172A" />
          <path d="M13 18 Q15.5 14 18 18" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M22 18 Q24.5 14 27 18" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M17.5 22 Q20 24.5 22.5 22" stroke="#FB7185" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        </g>
      )}

      {/* Starry Chibi Unicorn */}
      {config.petId === 'pet_unicorn' && (
        <g transform="translate(220, 224)" filter={`url(#glowEffect_${uid})`}>
          <ellipse cx="22" cy="54" rx="17" ry="5" fill="#0F172A" opacity="0.14" />
          <ellipse cx="22" cy="41" rx="16" ry="12.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.8" />
          <circle cx="19" cy="23" r="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.8" />
          <polygon points="18,12 22,-3 26,12" fill={`url(#goldMetal_${uid})`} />
          <path d="M25 14 Q38 22 32 35" stroke="#EC4899" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M27 21 Q39 29 33 40" stroke="#38BDF8" strokeWidth="3.8" strokeLinecap="round" fill="none" />
          <circle cx="15" cy="21.5" r="2.4" fill="#4F46E5" />
          <circle cx="14.3" cy="20.8" r="0.9" fill="#FFFFFF" />
        </g>
      )}

      {/* Chibi Little Dragon */}
      {config.petId === 'pet_dragon' && (
        <g transform="translate(222, 224)" filter={`url(#glowEffect_${uid})`}>
          <ellipse cx="21" cy="52" rx="16" ry="5" fill="#0F172A" opacity="0.14" />
          <ellipse cx="21" cy="36" rx="15" ry="13" fill="#DC2626" stroke="#7F1D1D" strokeWidth="1.5" />
          <ellipse cx="19" cy="38" rx="9" ry="8" fill="#FEF08A" />
          <circle cx="19" cy="20" r="13" fill="#EF4444" stroke="#7F1D1D" strokeWidth="1.5" />
          <polygon points="11,11 13,2 18,11" fill={`url(#goldMetal_${uid})`} />
          <polygon points="20,11 25,2 27,11" fill={`url(#goldMetal_${uid})`} />
          <circle cx="14.5" cy="18.5" r="3.2" fill="#FEF08A" />
          <circle cx="14.5" cy="18.5" r="1.7" fill="#0F172A" />
          <circle cx="24.5" cy="18.5" r="3.2" fill="#FEF08A" />
          <circle cx="24.5" cy="18.5" r="1.7" fill="#0F172A" />
          <path d="M32 36 Q44 26 40 12" stroke="#DC2626" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        </g>
      )}

      {/* Mecha Lion */}
      {config.petId === 'pet_mecha_lion' && (
        <g transform="translate(222, 228)" filter={`url(#glowEffect_${uid})`}>
          <polygon points="6,19 11,4 21,10 31,4 36,19 30,30 12,30" fill={`url(#goldMetal_${uid})`} stroke="#78350F" strokeWidth="1.8" />
          <rect x="11" y="29" width="20" height="19" rx="5" fill="#DC2626" stroke="#FACC15" strokeWidth="1.6" />
          <circle cx="21" cy="18" r="8.5" fill="#FEF08A" />
          <rect x="14.5" y="15" width="13" height="5.5" rx="2.5" fill="#0F172A" />
          <circle cx="18" cy="17.8" r="1.6" fill="#38BDF8" />
          <circle cx="24" cy="17.8" r="1.6" fill="#38BDF8" />
        </g>
      )}

      {/* Chibi Fire Phoenix */}
      {config.petId === 'pet_phoenix' && (
        <g transform="translate(220, 218)" filter={`url(#glowEffect_${uid})`}>
          <path d="M23 36 Q44 17 40 5 Q30 16 25 26 Z" fill="#F59E0B" />
          <path d="M18 36 Q0 17 6 7 Q14 17 18 28 Z" fill="#EF4444" />
          <ellipse cx="21" cy="33" rx="11" ry="13" fill="#EF4444" stroke="#991B1B" strokeWidth="1.5" />
          <circle cx="21" cy="18" r="9.5" fill="#F59E0B" stroke="#B45309" strokeWidth="1.4" />
          <polygon points="18,9 21,0 25,9" fill="#FEF08A" />
          <circle cx="17.5" cy="17" r="2.2" fill="#0F172A" />
          <circle cx="17" cy="16.3" r="0.8" fill="#FFFFFF" />
          <circle cx="24.5" cy="17" r="2.2" fill="#0F172A" />
          <circle cx="24" cy="16.3" r="0.8" fill="#FFFFFF" />
          <polygon points="18.5,21 23.5,21 21,25" fill="#FDE047" />
        </g>
      )}
    </g>
  );
};
