import React from 'react';
import { AvatarConfig } from '../../types';

interface AvatarAccessoriesLayerProps {
  config: AvatarConfig;
  showTech: boolean;
  animated: boolean;
  uid: string;
}

export const AvatarAccessoriesLayer: React.FC<AvatarAccessoriesLayerProps> = ({
  config,
  showTech,
  animated,
  uid
}) => {
  return (
    <>
      {/* 7. HANDHELD ITEM (Right Hand) */}
      <g id="handheld-layer">
        {config.handheldId === 'hand_pencil' && (
          <g transform="translate(204, 192) rotate(-30)">
            <rect x="0" y="0" width="9" height="46" rx="2" fill="#F59E0B" stroke="#78350F" strokeWidth="1.4" />
            <rect x="2" y="8" width="2.5" height="34" fill="#FEF08A" opacity="0.7" />
            <polygon points="0,46 9,46 4.5,57" fill="#FED7AA" stroke="#78350F" strokeWidth="1.2" />
            <polygon points="2.5,52 6.5,52 4.5,57" fill="#1E293B" />
            <rect x="0" y="0" width="9" height="7" rx="1.5" fill="#F43F5E" />
            <rect x="0" y="6" width="9" height="3" fill={`url(#silverMetal_${uid})`} />
          </g>
        )}

        {config.handheldId === 'hand_ruler' && (
          <g transform="translate(200, 184) rotate(-20)">
            <rect x="0" y="0" width="12" height="56" rx="4" fill="#06B6D4" fillOpacity="0.9" stroke="#0E7490" strokeWidth="1.5" />
            <line x1="2" y1="10" x2="8" y2="10" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="2" y1="20" x2="6" y2="20" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="2" y1="30" x2="8" y2="30" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="2" y1="40" x2="6" y2="40" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="2" y1="50" x2="8" y2="50" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        )}

        {config.handheldId === 'hand_star_wand' && (
          <g transform="translate(202, 174) rotate(12)" filter={`url(#glowEffect_${uid})`}>
            <line x1="8" y1="52" x2="18" y2="12" stroke="#EC4899" strokeWidth="5" strokeLinecap="round" />
            <line x1="8" y1="52" x2="18" y2="12" stroke="#FBCFE8" strokeWidth="1.6" strokeLinecap="round" />
            <polygon
              points="18,-3 21.5,7 32,7 23.5,13 26.5,23 18,16.5 9.5,23 12.5,13 4,7 14.5,7"
              fill={`url(#goldMetal_${uid})`}
              stroke="#B45309"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <circle cx="15" cy="9" r="2" fill="#FFFFFF" opacity="0.9" />
          </g>
        )}

        {config.handheldId === 'hand_backpack_rocket' && (
          <g transform="translate(194, 178) rotate(-6)">
            <rect x="2" y="6" width="26" height="34" rx="8" fill="#2563EB" stroke="#1E3A8A" strokeWidth="1.8" />
            <rect x="7" y="14" width="16" height="14" rx="4" fill="#60A5FA" />
            <circle cx="15" cy="21" r="4" fill="#FDE047" />
            <rect x="-1" y="34" width="8" height="11" rx="3" fill="#DC2626" />
            <rect x="23" y="34" width="8" height="11" rx="3" fill="#DC2626" />
            <polygon points="0,45 6,45 3,54" fill="#FACC15" />
            <polygon points="24,45 30,45 27,54" fill="#FACC15" />
          </g>
        )}

        {config.handheldId === 'hand_compass' && (
          <g transform="translate(204, 184) rotate(-15)">
            <line x1="12" y1="5" x2="2" y2="50" stroke="#475569" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="12" y1="5" x2="22" y2="50" stroke="#475569" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="12" cy="5" r="5.5" fill="#0284C7" stroke="#FFFFFF" strokeWidth="1.2" />
            <circle cx="2" cy="50" r="2.2" fill="#0F172A" />
            <circle cx="22" cy="50" r="2.2" fill="#EF4444" />
          </g>
        )}

        {config.handheldId === 'hand_camera' && (
          <g transform="translate(191, 186) rotate(-8)">
            <rect x="0" y="6" width="34" height="24" rx="6" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.6" />
            <rect x="9" y="1" width="11" height="6" rx="2" fill="#F59E0B" />
            <circle cx="17" cy="18" r="7.5" fill="#38BDF8" stroke="#E2E8F0" strokeWidth="2.2" />
            <circle cx="17" cy="18" r="3.5" fill="#0F172A" />
            <circle cx="14.5" cy="15.5" r="1.5" fill="#FFFFFF" />
            <circle cx="28" cy="11" r="2.2" fill="#FEF08A" />
          </g>
        )}

        {config.handheldId === 'hand_micro' && (
          <g transform="translate(204, 176) rotate(18)">
            <rect x="6" y="18" width="7.5" height="32" rx="3.5" fill="#1E293B" stroke="#475569" strokeWidth="1.2" />
            <circle cx="9.7" cy="11" r="10" fill={`url(#silverMetal_${uid})`} stroke="#0EA5E9" strokeWidth="2" />
            <line x1="2.5" y1="11" x2="17" y2="11" stroke="#475569" strokeWidth="1.8" />
            <circle cx="22" cy="2" r="2.5" fill="#F43F5E" />
          </g>
        )}

        {config.handheldId === 'hand_magnifier' && (
          <g transform="translate(198, 180) rotate(15)">
            <line x1="12" y1="22" x2="6" y2="48" stroke="#78350F" strokeWidth="5.5" strokeLinecap="round" />
            <circle cx="15" cy="12" r="12.5" fill="#BAE6FD" stroke="#64748B" strokeWidth="3.5" />
            <path d="M9 8 Q13 4 19 6" stroke="#FFFFFF" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          </g>
        )}

        {config.handheldId === 'hand_beaker' && (
          <g transform="translate(194, 178) rotate(-6)" filter={`url(#glowEffect_${uid})`}>
            <rect x="8" y="2" width="9" height="10" rx="2" fill="#E2E8F0" stroke="#0284C7" strokeWidth="1.2" />
            <path
              d="M8 12 L2 38 Q1 43 6 43 L19 43 Q24 43 23 38 L17 12 Z"
              fill="#BAE6FD"
              fillOpacity="0.88"
              stroke="#0284C7"
              strokeWidth="1.6"
            />
            <path d="M5 26 L20 26 L22 38 Q23 41 18 41 L7 41 Q2 41 3 38 Z" fill="#10B981" />
            <circle cx="10" cy="31" r="2.2" fill="#FEF08A" />
            <circle cx="15.5" cy="35" r="1.6" fill="#FFFFFF" />
          </g>
        )}

        {config.handheldId === 'hand_casio' && (
          <g transform="translate(195, 184) rotate(-10)" filter={`url(#glowEffect_${uid})`}>
            <rect x="0" y="0" width="29" height="47" rx="5" fill="#0F172A" stroke="#2563EB" strokeWidth="2" />
            <rect x="3" y="4" width="23" height="12" rx="2" fill="#E2E8F0" />
            <text x="14.5" y="13" fill="#0F172A" fontSize="7" fontWeight="bold" textAnchor="middle">FX PRO</text>
            <rect x="4" y="18" width="21" height="4" rx="1" fill="#78350F" />
            <circle cx="7.5" cy="28" r="2.2" fill="#3B82F6" />
            <circle cx="14.5" cy="28" r="2.2" fill="#3B82F6" />
            <circle cx="21.5" cy="28" r="2.2" fill="#3B82F6" />
            <circle cx="7.5" cy="36" r="2.2" fill="#94A3B8" />
            <circle cx="14.5" cy="36" r="2.2" fill="#94A3B8" />
            <circle cx="21.5" cy="36" r="2.2" fill="#EF4444" />
          </g>
        )}

        {config.handheldId === 'hand_guitar' && (
          <g transform="translate(190, 166) rotate(-18)">
            <rect x="14" y="-8" width="5.5" height="32" rx="2" fill="#78350F" />
            <rect x="12" y="-12" width="9.5" height="8" rx="2" fill={`url(#goldMetal_${uid})`} />
            <path d="M5 22 L28 22 L33 43 Q16 55 2 43 Z" fill="#EC4899" stroke="#FACC15" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="16.5" cy="34" r="4.5" fill="#FFFFFF" />
          </g>
        )}

        {config.handheldId === 'hand_telescope' && (
          <g transform="translate(196, 172) rotate(-25)">
            <rect x="2" y="10" width="13" height="36" rx="4" fill="#0284C7" stroke="#FACC15" strokeWidth="1.8" />
            <rect x="4" y="0" width="9" height="14" rx="2.5" fill={`url(#goldMetal_${uid})`} />
            <ellipse cx="8.5" cy="1" rx="5.5" ry="2.5" fill="#7DD3FC" />
          </g>
        )}

        {config.handheldId === 'hand_trophy_mini' && (
          <g transform="translate(198, 178) rotate(-6)" filter={`url(#glowEffect_${uid})`}>
            <path d="M4 2 L24 2 L20 18 Q14 23 8 18 Z" fill={`url(#goldMetal_${uid})`} stroke="#B45309" strokeWidth="1.6" />
            <rect x="12" y="20" width="4" height="8" fill="#CA8A04" />
            <rect x="7" y="28" width="14" height="5" rx="2" fill="#78350F" />
          </g>
        )}

        {config.handheldId === 'hand_laser' && (
          <g transform="translate(205, 184) rotate(-45)" filter={`url(#glowEffect_${uid})`}>
            <rect x="0" y="0" width="7" height="35" rx="3.5" fill="#334155" stroke="#10B981" strokeWidth="1.6" />
            <line x1="3.5" y1="0" x2="3.5" y2="-62" stroke="#10B981" strokeWidth="5" strokeLinecap="round" />
            <line x1="3.5" y1="0" x2="3.5" y2="-60" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {config.handheldId === 'hand_hero_shield' && (
          <g transform="translate(195, 176)" filter={`url(#glowEffect_${uid})`}>
            <circle cx="18" cy="22" r="22.5" fill="#DC2626" stroke="#1E293B" strokeWidth="1.8" />
            <circle cx="18" cy="22" r="16.2" fill="#F8FAFC" />
            <circle cx="18" cy="22" r="10.8" fill="#1D4ED8" />
            <polygon points="18,13 20.4,19 27,19 21.7,22.8 23.6,29 18,25.2 12.4,29 14.3,22.8 9,19 15.6,19" fill="#FFFFFF" />
            <path d="M6 12 Q14 4 24 6" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        )}

        {config.handheldId === 'hand_element_staff' && (
          <g transform="translate(206, 150) rotate(10)" filter={`url(#glowEffect_${uid})`}>
            <rect x="6" y="16" width="5.5" height="65" rx="2.75" fill="#B45309" stroke="#FACC15" strokeWidth="1.2" />
            <polygon points="8.5,-5 20,9 8.5,23 -3,9" fill="#38BDF8" stroke="#FDE047" strokeWidth="2" />
            <circle cx="-4" cy="6" r="3.2" fill="#EF4444" />
            <circle cx="21" cy="6" r="3.2" fill="#10B981" />
            <circle cx="8.5" cy="-7" r="3.2" fill="#FACC15" />
          </g>
        )}

        {config.handheldId === 'hand_tome' && (
          <g transform="translate(190, 178) rotate(-10)" filter={`url(#glowEffect_${uid})`}>
            <rect x="0" y="0" width="36" height="49" rx="5" fill="#78350F" stroke="#F59E0B" strokeWidth="2.2" />
            <rect x="4" y="4" width="28" height="41" rx="3" fill="#B45309" />
            <circle cx="18" cy="24" r="9.5" fill={`url(#goldMetal_${uid})`} />
            <text x="18" y="28" fill="#78350F" fontSize="12" fontWeight="bold" textAnchor="middle">√∞</text>
          </g>
        )}
      </g>

      {/* 8. PHONE ITEM (Left Hand) */}
      <g id="phone-layer">
        {config.phoneId === 'phone_brick' && (
          <g transform="translate(70, 192) rotate(15)">
            <rect x="0" y="0" width="21" height="39" rx="6" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="1.6" />
            <rect x="3" y="4" width="15" height="12" rx="2.5" fill="#84CC16" />
            <circle cx="10.5" cy="22" r="3.2" fill="#94A3B8" />
            <rect x="4" y="27" width="13" height="7" rx="1.5" fill="#64748B" />
          </g>
        )}

        {config.phoneId === 'phone_walkie' && (
          <g transform="translate(68, 190) rotate(12)">
            <rect x="14" y="-12" width="3.5" height="14" rx="1.75" fill="#1E293B" />
            <rect x="0" y="0" width="21" height="41" rx="5" fill="#15803D" stroke="#064E3B" strokeWidth="1.6" />
            <rect x="3" y="4" width="15" height="12" rx="2.5" fill="#FEF08A" />
            <line x1="4" y1="22" x2="17" y2="22" stroke="#064E3B" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="4" y1="27" x2="17" y2="27" stroke="#064E3B" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        )}

        {config.phoneId === 'phone_flip' && (
          <g transform="translate(72, 192) rotate(15)">
            <rect x="0" y="0" width="19" height="27" rx="4.5" fill="#EC4899" stroke="#9D174D" strokeWidth="1.5" />
            <circle cx="9.5" cy="9" r="4.5" fill="#FCE7F3" />
          </g>
        )}

        {config.phoneId === 'phone_cameraphone' && (
          <g transform="translate(66, 184) rotate(8)">
            <circle cx="13" cy="2" r="9" fill="none" stroke="#FEF08A" strokeWidth="2.6" />
            <rect x="1" y="6" width="24" height="40" rx="5" fill="#0F172A" stroke="#EC4899" strokeWidth="1.8" />
            <rect x="3.5" y="9.5" width="19" height="31" rx="2.5" fill="#38BDF8" />
            <line x1="6" y1="13" x2="12" y2="13" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
          </g>
        )}

        {config.phoneId === 'phone_smart' && (
          <g transform="translate(66, 188) rotate(12)">
            <rect x="0" y="0" width="25" height="45" rx="5" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.8" />
            <rect x="2.5" y="2.5" width="20" height="40" rx="3.5" fill="#0284C7" />
            <circle cx="12.5" cy="6.5" r="1.5" fill="#FFFFFF" />
            <line x1="6" y1="12" x2="16" y2="12" stroke="#BAE6FD" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        )}

        {config.phoneId === 'phone_ranger_morpher' && (
          <g transform="translate(68, 194) rotate(10)" filter={`url(#glowEffect_${uid})`}>
            <rect x="2" y="0" width="23" height="27" rx="6" fill="#DC2626" stroke="#FACC15" strokeWidth="2" />
            <circle cx="13.5" cy="13.5" r="6.5" fill="#0F172A" />
            <circle cx="13.5" cy="13.5" r="3.2" fill="#38BDF8" />
            <circle cx="7" cy="5" r="2" fill="#FACC15" />
            <circle cx="20" cy="5" r="2" fill="#10B981" />
          </g>
        )}

        {config.phoneId === 'phone_console_mini' && (
          <g transform="translate(60, 192) rotate(8)">
            <rect x="0" y="0" width="34" height="19" rx="6" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.8" />
            <rect x="6" y="3" width="22" height="13" rx="2.5" fill="#38BDF8" />
            <rect x="0" y="2" width="5.5" height="15" rx="2.5" fill="#EF4444" />
            <rect x="28.5" y="2" width="5.5" height="15" rx="2.5" fill="#2563EB" />
          </g>
        )}

        {config.phoneId === 'phone_promax' && (
          <g transform="translate(64, 184) rotate(10)" filter={`url(#glowEffect_${uid})`}>
            <rect x="0" y="0" width="27" height="49" rx="6" fill={`url(#goldMetal_${uid})`} stroke="#FEF08A" strokeWidth="1.5" />
            <rect x="2.5" y="2.5" width="22" height="44" rx="4.5" fill="#1E293B" />
            <circle cx="7.5" cy="8.5" r="2.6" fill="#D97706" stroke="#FEF08A" strokeWidth="0.9" />
            <circle cx="13.5" cy="8.5" r="2.6" fill="#D97706" stroke="#FEF08A" strokeWidth="0.9" />
            <circle cx="10.5" cy="14.5" r="2.6" fill="#D97706" stroke="#FEF08A" strokeWidth="0.9" />
          </g>
        )}

        {config.phoneId === 'phone_holo' && (
          <g transform="translate(60, 184)" filter={`url(#glowEffect_${uid})`}>
            <ellipse cx="14" cy="40" rx="14" ry="4.5" fill="#06B6D4" />
            <polygon points="14,40 2,10 26,10" fill="#22D3EE" opacity="0.48" />
            <text x="14" y="22" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">AI 3D</text>
          </g>
        )}
      </g>

      {/* 9. TECH / DESK ITEM (Beside Student Left) */}
      {showTech && (
        <g id="tech-layer">
          {config.techId === 'tech_notebook' && (
            <g transform="translate(26, 238)">
              <rect x="0" y="0" width="40" height="50" rx="5" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
              <rect x="6" y="8" width="28" height="17" rx="3" fill="#FFFFFF" />
              <text x="20" y="16" fill="#1E293B" fontSize="6.5" fontWeight="bold" textAnchor="middle">VỞ GHI</text>
              <text x="20" y="22.5" fill="#2563EB" fontSize="5.2" fontWeight="bold" textAnchor="middle">SGK 1-9</text>
              <line x1="5" y1="32" x2="35" y2="32" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="5" y1="39" x2="35" y2="39" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          )}

          {config.techId === 'tech_abacus' && (
            <g transform="translate(22, 242)">
              <rect x="0" y="0" width="46" height="38" rx="5" fill="#92400E" stroke="#451A03" strokeWidth="1.8" />
              <rect x="4" y="4" width="38" height="30" rx="2" fill="#FEF3C7" />
              <line x1="4" y1="14" x2="42" y2="14" stroke="#78350F" strokeWidth="1.8" />
              <line x1="4" y1="24" x2="42" y2="24" stroke="#78350F" strokeWidth="1.8" />
              <circle cx="12" cy="14" r="3.5" fill="#EF4444" />
              <circle cx="22" cy="14" r="3.5" fill="#F59E0B" />
              <circle cx="31" cy="24" r="3.5" fill="#2563EB" />
              <circle cx="17" cy="24" r="3.5" fill="#10B981" />
            </g>
          )}

          {config.techId === 'tech_drawpad' && (
            <g transform="translate(18, 236)">
              <rect x="0" y="0" width="50" height="38" rx="6" fill="#1E293B" stroke="#EC4899" strokeWidth="2" />
              <rect x="4" y="4" width="38" height="30" rx="3" fill="#FFFFFF" />
              <path d="M8 23 Q19 10 29 21 T38 14" fill="none" stroke="#EC4899" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="44" y1="6" x2="44" y2="30" stroke="#FACC15" strokeWidth="3.5" strokeLinecap="round" />
            </g>
          )}

          {config.techId === 'tech_tablet' && (
            <g transform="translate(23, 228)">
              <rect x="0" y="0" width="48" height="60" rx="6" fill="#1E293B" stroke="#94A3B8" strokeWidth="2.2" />
              <rect x="3.5" y="3.5" width="41" height="53" rx="3" fill="#EFF6FF" />
              <text x="24" y="19" fill="#1E40AF" fontSize="6.5" fontWeight="bold" textAnchor="middle">SGK SỐ</text>
              <text x="24" y="29" fill="#3B82F6" fontSize="5.2" fontWeight="bold" textAnchor="middle">LỚP 1-9</text>
              <rect x="8" y="35" width="32" height="16" rx="3" fill="#DBEAFE" />
            </g>
          )}

          {config.techId === 'tech_ultrabook' && (
            <g transform="translate(18, 238)">
              <polygon points="10,10 47,10 54,40 3,40" fill={`url(#silverMetal_${uid})`} stroke="#64748B" strokeWidth="1.8" />
              <rect x="13" y="13" width="31" height="22" rx="2" fill="#0F172A" />
              <rect x="0" y="40" width="57" height="7" rx="3" fill="#94A3B8" />
            </g>
          )}

          {config.techId === 'tech_vr_station' && (
            <g transform="translate(18, 230)" filter={`url(#glowEffect_${uid})`}>
              <rect x="4" y="10" width="48" height="27" rx="9" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
              <rect x="9" y="14" width="38" height="15" rx="6" fill="#0EA5E9" opacity="0.78" />
              <path d="M12 19 L25 19 M31 19 L44 19" stroke="#E0F2FE" strokeWidth="2.2" strokeLinecap="round" />
              <rect x="16" y="39" width="24" height="8" rx="3" fill="#475569" />
            </g>
          )}

          {config.techId === 'tech_drone_cam' && (
            <g transform="translate(16, 210)" className={animated ? 'studio-float' : ''}>
              <line x1="8" y1="10" x2="46" y2="27" stroke="#475569" strokeWidth="3" />
              <line x1="46" y1="10" x2="8" y2="27" stroke="#475569" strokeWidth="3" />
              <ellipse cx="8" cy="10" rx="9" ry="3" fill="#38BDF8" opacity="0.85" />
              <ellipse cx="46" cy="10" rx="9" ry="3" fill="#38BDF8" opacity="0.85" />
              <ellipse cx="8" cy="27" rx="9" ry="3" fill="#38BDF8" opacity="0.85" />
              <ellipse cx="46" cy="27" rx="9" ry="3" fill="#38BDF8" opacity="0.85" />
              <circle cx="27" cy="18.5" r="9" fill="#0F172A" stroke="#E2E8F0" strokeWidth="1.8" />
              <circle cx="27" cy="18.5" r="3.5" fill="#EF4444" />
            </g>
          )}

          {config.techId === 'tech_gaming' && (
            <g transform="translate(14, 234)" filter={`url(#glowEffect_${uid})`}>
              <polygon points="12,8 54,8 62,39 4,39" fill="#0F172A" stroke="#06B6D4" strokeWidth="2.2" />
              <rect x="15" y="11" width="36" height="24" rx="2" fill="#1E1B4B" />
              <text x="33" y="25" fill="#38BDF8" fontSize="8" fontWeight="bold" textAnchor="middle">&gt;GAME_</text>
              <rect x="2" y="39" width="62" height="9" rx="3" fill={`url(#rgbKey_${uid})`} />
            </g>
          )}

          {config.techId === 'tech_holo_desk' && (
            <g transform="translate(16, 222)" filter={`url(#glowEffect_${uid})`}>
              <rect x="6" y="42" width="46" height="11" rx="4" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.8" />
              <polygon points="29,42 8,10 50,10" fill="#38BDF8" opacity="0.3" />
              <circle cx="29" cy="20" r="10.5" fill="none" stroke="#BAE6FD" strokeWidth="1.8" />
              <polygon points="29,12 32,18 38,18 33,22 35,28 29,24 23,28 25,22 20,18 26,18" fill="#FACC15" />
            </g>
          )}

          {config.techId === 'tech_quantum' && (
            <g transform="translate(24, 218)" filter={`url(#glowEffect_${uid})`} className={animated ? 'studio-float' : ''}>
              <circle cx="26" cy="26" r="19" fill="#0284C7" opacity="0.32" />
              <circle cx="26" cy="26" r="10.5" fill="#38BDF8" />
              <ellipse cx="26" cy="26" rx="25" ry="8.5" fill="none" stroke="#F59E0B" strokeWidth="2.2" transform="rotate(30 26 26)" />
              <ellipse cx="26" cy="26" rx="25" ry="8.5" fill="none" stroke="#10B981" strokeWidth="2.2" transform="rotate(-30 26 26)" />
            </g>
          )}
        </g>
      )}
    </>
  );
};
