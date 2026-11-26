import React from 'react';
import { AvatarConfig } from '../../types';

interface AvatarAccessoriesLayerProps {
  config: AvatarConfig;
  showTech: boolean;
  animated: boolean;
}

export const AvatarAccessoriesLayer: React.FC<AvatarAccessoriesLayerProps> = ({
  config,
  showTech,
  animated
}) => {
  return (
    <>
      {/* 7. HANDHELD ITEM (Right Hand) */}
      <g id="handheld-layer">
        {config.handheldId === 'hand_pencil' && (
          <g transform="translate(205, 195) rotate(-30)">
            <rect x="0" y="0" width="8" height="45" fill="#F59E0B" rx="1" />
            <polygon points="0,45 8,45 4,55" fill="#FED7AA" />
            <polygon points="2,50 6,50 4,55" fill="#1E293B" />
            <rect x="0" y="0" width="8" height="6" fill="#F43F5E" />
          </g>
        )}

        {config.handheldId === 'hand_ruler' && (
          <g transform="translate(200, 185) rotate(-20)">
            <rect x="0" y="0" width="10" height="55" rx="3" fill="#06B6D4" opacity="0.85" stroke="#0891B2" strokeWidth="1" />
            <line x1="2" y1="10" x2="8" y2="10" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="2" y1="20" x2="6" y2="20" stroke="#FFFFFF" strokeWidth="1" />
            <line x1="2" y1="30" x2="8" y2="30" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="2" y1="40" x2="6" y2="40" stroke="#FFFFFF" strokeWidth="1" />
            <line x1="2" y1="50" x2="8" y2="50" stroke="#FFFFFF" strokeWidth="1.5" />
          </g>
        )}

        {config.handheldId === 'hand_star_wand' && (
          <g transform="translate(202, 175) rotate(12)" filter="url(#glowEffect)">
            <line x1="8" y1="50" x2="18" y2="12" stroke="#EC4899" strokeWidth="4" strokeLinecap="round" />
            <polygon points="18,-2 21,7 30,7 23,13 25,22 18,16 11,22 13,13 6,7 15,7" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
          </g>
        )}

        {config.handheldId === 'hand_backpack_rocket' && (
          <g transform="translate(194, 180) rotate(-6)">
            <rect x="2" y="6" width="24" height="32" rx="6" fill="#2563EB" stroke="#1E3A8A" strokeWidth="1.5" />
            <rect x="6" y="14" width="16" height="14" rx="3" fill="#60A5FA" />
            <rect x="0" y="34" width="7" height="10" rx="2" fill="#DC2626" />
            <rect x="21" y="34" width="7" height="10" rx="2" fill="#DC2626" />
            <polygon points="1,44 6,44 3.5,52" fill="#FACC15" />
            <polygon points="22,44 27,44 24.5,52" fill="#FACC15" />
          </g>
        )}

        {config.handheldId === 'hand_compass' && (
          <g transform="translate(205, 185) rotate(-15)">
            <line x1="12" y1="5" x2="2" y2="50" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
            <line x1="12" y1="5" x2="22" y2="50" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
            <circle cx="12" cy="5" r="5" fill="#0284C7" />
            <circle cx="2" cy="50" r="2" fill="#0F172A" />
            <circle cx="22" cy="50" r="2" fill="#EF4444" />
          </g>
        )}

        {config.handheldId === 'hand_camera' && (
          <g transform="translate(192, 188) rotate(-8)">
            <rect x="0" y="6" width="32" height="22" rx="4" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5" />
            <rect x="8" y="2" width="10" height="5" rx="1.5" fill="#F59E0B" />
            <circle cx="16" cy="17" r="7" fill="#38BDF8" stroke="#E2E8F0" strokeWidth="2" />
            <circle cx="16" cy="17" r="3" fill="#0F172A" />
            <circle cx="27" cy="10" r="2" fill="#FEF08A" />
          </g>
        )}

        {config.handheldId === 'hand_micro' && (
          <g transform="translate(204, 178) rotate(18)">
            <rect x="6" y="18" width="7" height="30" rx="3" fill="#1E293B" />
            <circle cx="9.5" cy="11" r="9.5" fill="#CBD5E1" stroke="#0EA5E9" strokeWidth="2" />
            <line x1="3" y1="11" x2="16" y2="11" stroke="#475569" strokeWidth="1.5" />
            <circle cx="22" cy="2" r="2" fill="#F43F5E" />
          </g>
        )}

        {config.handheldId === 'hand_magnifier' && (
          <g transform="translate(198, 182) rotate(15)">
            <line x1="12" y1="22" x2="6" y2="46" stroke="#78350F" strokeWidth="5" strokeLinecap="round" />
            <circle cx="15" cy="12" r="12" fill="#BAE6FD" stroke="#64748B" strokeWidth="3.5" />
            <path d="M9 8 Q13 4 19 6" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        )}

        {config.handheldId === 'hand_beaker' && (
          <g transform="translate(194, 180) rotate(-6)" filter="url(#glowEffect)">
            <rect x="8" y="2" width="8" height="10" fill="#E2E8F0" />
            <path d="M8 12 L2 38 Q1 42 5 42 L19 42 Q23 42 22 38 L16 12 Z" fill="#BAE6FD" fillOpacity="0.85" stroke="#0284C7" strokeWidth="1.5" />
            <path d="M5 26 L19 26 L21 38 Q22 41 18 41 L6 41 Q2 41 3 38 Z" fill="#10B981" />
            <circle cx="10" cy="31" r="2" fill="#FEF08A" />
            <circle cx="15" cy="35" r="1.5" fill="#FFFFFF" />
          </g>
        )}

        {config.handheldId === 'hand_casio' && (
          <g transform="translate(195, 185) rotate(-10)" filter="url(#glowEffect)">
            <rect x="0" y="0" width="28" height="46" rx="4" fill="#0F172A" stroke="#2563EB" strokeWidth="2" />
            <rect x="3" y="4" width="22" height="12" rx="2" fill="#E2E8F0" />
            <text x="14" y="13" fill="#0F172A" fontSize="7" fontWeight="bold" textAnchor="middle">FX PRO</text>
            <rect x="4" y="18" width="20" height="4" fill="#78350F" />
            <circle cx="7" cy="28" r="2" fill="#3B82F6" />
            <circle cx="14" cy="28" r="2" fill="#3B82F6" />
            <circle cx="21" cy="28" r="2" fill="#3B82F6" />
            <circle cx="7" cy="36" r="2" fill="#94A3B8" />
            <circle cx="14" cy="36" r="2" fill="#94A3B8" />
            <circle cx="21" cy="36" r="2" fill="#EF4444" />
          </g>
        )}

        {config.handheldId === 'hand_guitar' && (
          <g transform="translate(190, 168) rotate(-18)">
            <rect x="14" y="-8" width="5" height="32" rx="2" fill="#78350F" />
            <rect x="12" y="-12" width="9" height="8" rx="2" fill="#FACC15" />
            <path d="M5 22 L28 22 L32 42 Q16 54 2 42 Z" fill="#EC4899" stroke="#FACC15" strokeWidth="2" />
            <circle cx="16" cy="34" r="4" fill="#FFFFFF" />
          </g>
        )}

        {config.handheldId === 'hand_telescope' && (
          <g transform="translate(196, 174) rotate(-25)">
            <rect x="2" y="10" width="12" height="36" rx="3" fill="#0284C7" stroke="#FACC15" strokeWidth="1.5" />
            <rect x="4" y="0" width="8" height="14" rx="2" fill="#F59E0B" />
            <ellipse cx="8" cy="1" rx="5" ry="2.5" fill="#7DD3FC" />
          </g>
        )}

        {config.handheldId === 'hand_trophy_mini' && (
          <g transform="translate(198, 180) rotate(-6)" filter="url(#glowEffect)">
            <path d="M4 2 L24 2 L20 18 Q14 23 8 18 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
            <rect x="12" y="20" width="4" height="8" fill="#CA8A04" />
            <rect x="7" y="28" width="14" height="5" rx="1.5" fill="#78350F" />
          </g>
        )}

        {config.handheldId === 'hand_laser' && (
          <g transform="translate(205, 185) rotate(-45)" filter="url(#glowEffect)">
            <rect x="0" y="0" width="6" height="35" rx="3" fill="#334155" stroke="#10B981" strokeWidth="1.5" />
            <line x1="3" y1="0" x2="3" y2="-60" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {config.handheldId === 'hand_hero_shield' && (
          <g transform="translate(196, 178)" filter="url(#glowEffect)">
            <circle cx="18" cy="22" r="22" fill="#DC2626" stroke="#1E293B" strokeWidth="1.5" />
            <circle cx="18" cy="22" r="16" fill="#F8FAFC" />
            <circle cx="18" cy="22" r="10.5" fill="#1D4ED8" />
            <polygon points="18,13 20.4,19 27,19 21.7,22.8 23.6,29 18,25.2 12.4,29 14.3,22.8 9,19 15.6,19" fill="#FFFFFF" />
          </g>
        )}

        {config.handheldId === 'hand_element_staff' && (
          <g transform="translate(206, 152) rotate(10)" filter="url(#glowEffect)">
            <rect x="6" y="16" width="5" height="64" rx="2.5" fill="#B45309" stroke="#FACC15" strokeWidth="1" />
            <polygon points="8.5,-4 19,9 8.5,22 -2,9" fill="#38BDF8" stroke="#FDE047" strokeWidth="2" />
            <circle cx="-3" cy="6" r="3" fill="#EF4444" />
            <circle cx="20" cy="6" r="3" fill="#10B981" />
            <circle cx="8.5" cy="-6" r="3" fill="#FACC15" />
          </g>
        )}

        {config.handheldId === 'hand_tome' && (
          <g transform="translate(190, 180) rotate(-10)" filter="url(#glowEffect)">
            <rect x="0" y="0" width="35" height="48" rx="4" fill="#78350F" stroke="#F59E0B" strokeWidth="2" />
            <rect x="4" y="4" width="27" height="40" rx="2" fill="#B45309" />
            <circle cx="17" cy="24" r="9" fill="#FEF08A" />
            <text x="17" y="28" fill="#78350F" fontSize="12" fontWeight="bold" textAnchor="middle">√∞</text>
          </g>
        )}
      </g>

      {/* 8. PHONE ITEM (Left Hand) */}
      <g id="phone-layer">
        {config.phoneId === 'phone_brick' && (
          <g transform="translate(72, 195) rotate(15)">
            <rect x="0" y="0" width="20" height="38" rx="5" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="1.5" />
            <rect x="3" y="4" width="14" height="12" rx="2" fill="#84CC16" />
            <circle cx="10" cy="22" r="3" fill="#94A3B8" />
            <rect x="4" y="27" width="12" height="7" rx="1" fill="#64748B" />
          </g>
        )}

        {config.phoneId === 'phone_walkie' && (
          <g transform="translate(70, 192) rotate(12)">
            <rect x="14" y="-12" width="3" height="14" rx="1.5" fill="#1E293B" />
            <rect x="0" y="0" width="20" height="40" rx="4" fill="#15803D" stroke="#064E3B" strokeWidth="1.5" />
            <rect x="3" y="4" width="14" height="12" rx="2" fill="#FEF08A" />
            <line x1="4" y1="22" x2="16" y2="22" stroke="#064E3B" strokeWidth="2" />
            <line x1="4" y1="27" x2="16" y2="27" stroke="#064E3B" strokeWidth="2" />
          </g>
        )}

        {config.phoneId === 'phone_flip' && (
          <g transform="translate(74, 195) rotate(15)">
            <rect x="0" y="0" width="18" height="25" rx="3" fill="#EC4899" />
            <circle cx="9" cy="8" r="4" fill="#FCE7F3" />
          </g>
        )}

        {config.phoneId === 'phone_cameraphone' && (
          <g transform="translate(68, 186) rotate(8)">
            <circle cx="13" cy="2" r="9" fill="none" stroke="#FEF08A" strokeWidth="2.5" />
            <rect x="1" y="6" width="24" height="40" rx="4" fill="#0F172A" stroke="#EC4899" strokeWidth="1.5" />
            <rect x="3" y="9" width="20" height="32" rx="2" fill="#38BDF8" />
          </g>
        )}

        {config.phoneId === 'phone_smart' && (
          <g transform="translate(68, 190) rotate(12)">
            <rect x="0" y="0" width="24" height="44" rx="4" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
            <rect x="2" y="2" width="20" height="40" rx="3" fill="#0284C7" />
            <circle cx="12" cy="6" r="1.5" fill="#FFFFFF" />
          </g>
        )}

        {config.phoneId === 'phone_ranger_morpher' && (
          <g transform="translate(70, 196) rotate(10)" filter="url(#glowEffect)">
            <rect x="2" y="0" width="22" height="26" rx="5" fill="#DC2626" stroke="#FACC15" strokeWidth="2" />
            <circle cx="13" cy="13" r="6" fill="#0F172A" />
            <circle cx="13" cy="13" r="3" fill="#38BDF8" />
            <circle cx="7" cy="5" r="2" fill="#FACC15" />
            <circle cx="19" cy="5" r="2" fill="#10B981" />
          </g>
        )}

        {config.phoneId === 'phone_console_mini' && (
          <g transform="translate(62, 194) rotate(8)">
            <rect x="0" y="0" width="32" height="18" rx="5" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
            <rect x="6" y="3" width="20" height="12" rx="2" fill="#38BDF8" />
            <rect x="0" y="2" width="5" height="14" rx="2" fill="#EF4444" />
            <rect x="27" y="2" width="5" height="14" rx="2" fill="#2563EB" />
          </g>
        )}

        {config.phoneId === 'phone_promax' && (
          <g transform="translate(65, 185) rotate(10)" filter="url(#glowEffect)">
            <rect x="0" y="0" width="26" height="48" rx="5" fill="#D97706" stroke="#FEF08A" strokeWidth="1.5" />
            <rect x="2" y="2" width="22" height="44" rx="4" fill="#1E293B" />
            <circle cx="7" cy="8" r="2.5" fill="#D97706" stroke="#FEF08A" strokeWidth="0.8" />
            <circle cx="13" cy="8" r="2.5" fill="#D97706" stroke="#FEF08A" strokeWidth="0.8" />
            <circle cx="10" cy="14" r="2.5" fill="#D97706" stroke="#FEF08A" strokeWidth="0.8" />
          </g>
        )}

        {config.phoneId === 'phone_holo' && (
          <g transform="translate(62, 185)" filter="url(#glowEffect)">
            <ellipse cx="14" cy="40" rx="14" ry="4" fill="#06B6D4" />
            <polygon points="14,40 2,10 26,10" fill="#22D3EE" opacity="0.45" />
            <text x="14" y="22" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">AI 3D</text>
          </g>
        )}
      </g>

      {/* 9. TECH / DESK ITEM (Beside Student Left) */}
      {showTech && (
        <g id="tech-layer">
          {config.techId === 'tech_notebook' && (
            <g transform="translate(30, 240)">
              <rect x="0" y="0" width="38" height="48" rx="3" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />
              <rect x="6" y="8" width="26" height="16" rx="2" fill="#FFFFFF" />
              <text x="19" y="16" fill="#1E293B" fontSize="6" fontWeight="bold" textAnchor="middle">VỞ GHI</text>
              <text x="19" y="22" fill="#2563EB" fontSize="5" textAnchor="middle">SGK 1-9</text>
              <line x1="4" y1="30" x2="34" y2="30" stroke="#93C5FD" strokeWidth="1" />
              <line x1="4" y1="36" x2="34" y2="36" stroke="#93C5FD" strokeWidth="1" />
            </g>
          )}

          {config.techId === 'tech_abacus' && (
            <g transform="translate(24, 244)">
              <rect x="0" y="0" width="44" height="36" rx="3" fill="#92400E" />
              <rect x="4" y="4" width="36" height="28" fill="#FEF3C7" />
              <line x1="4" y1="13" x2="40" y2="13" stroke="#78350F" strokeWidth="1.5" />
              <line x1="4" y1="23" x2="40" y2="23" stroke="#78350F" strokeWidth="1.5" />
              <circle cx="12" cy="13" r="3" fill="#EF4444" />
              <circle cx="22" cy="13" r="3" fill="#F59E0B" />
              <circle cx="30" cy="23" r="3" fill="#2563EB" />
              <circle cx="16" cy="23" r="3" fill="#10B981" />
            </g>
          )}

          {config.techId === 'tech_drawpad' && (
            <g transform="translate(20, 238)">
              <rect x="0" y="0" width="48" height="36" rx="4" fill="#1E293B" stroke="#EC4899" strokeWidth="1.5" />
              <rect x="4" y="4" width="36" height="28" rx="2" fill="#FFFFFF" />
              <path d="M8 22 Q18 10 28 20 T36 14" fill="none" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" />
              <line x1="42" y1="6" x2="42" y2="28" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" />
            </g>
          )}

          {config.techId === 'tech_tablet' && (
            <g transform="translate(25, 230)">
              <rect x="0" y="0" width="46" height="58" rx="4" fill="#1E293B" stroke="#94A3B8" strokeWidth="2" />
              <rect x="3" y="3" width="40" height="52" rx="2" fill="#EFF6FF" />
              <text x="23" y="18" fill="#1E40AF" fontSize="6" fontWeight="bold" textAnchor="middle">SGK SỐ</text>
              <text x="23" y="28" fill="#3B82F6" fontSize="5" textAnchor="middle">LỚP 1-9</text>
              <rect x="8" y="34" width="30" height="15" rx="2" fill="#DBEAFE" />
            </g>
          )}

          {config.techId === 'tech_ultrabook' && (
            <g transform="translate(20, 240)">
              <polygon points="10,10 45,10 52,38 3,38" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.5" />
              <rect x="12" y="12" width="31" height="22" fill="#0F172A" />
              <rect x="0" y="38" width="55" height="6" rx="2" fill="#94A3B8" />
            </g>
          )}

          {config.techId === 'tech_vr_station' && (
            <g transform="translate(20, 232)" filter="url(#glowEffect)">
              <rect x="4" y="10" width="46" height="26" rx="8" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
              <rect x="9" y="14" width="36" height="14" rx="5" fill="#0EA5E9" opacity="0.7" />
              <path d="M12 18 L24 18 M30 18 L42 18" stroke="#E0F2FE" strokeWidth="2" strokeLinecap="round" />
              <rect x="16" y="38" width="22" height="8" rx="2" fill="#475569" />
            </g>
          )}

          {config.techId === 'tech_drone_cam' && (
            <g transform="translate(18, 212)" className={animated ? 'studio-float' : ''}>
              <line x1="8" y1="10" x2="44" y2="26" stroke="#475569" strokeWidth="2.5" />
              <line x1="44" y1="10" x2="8" y2="26" stroke="#475569" strokeWidth="2.5" />
              <ellipse cx="8" cy="10" rx="8" ry="2.5" fill="#38BDF8" opacity="0.8" />
              <ellipse cx="44" cy="10" rx="8" ry="2.5" fill="#38BDF8" opacity="0.8" />
              <ellipse cx="8" cy="26" rx="8" ry="2.5" fill="#38BDF8" opacity="0.8" />
              <ellipse cx="44" cy="26" rx="8" ry="2.5" fill="#38BDF8" opacity="0.8" />
              <circle cx="26" cy="18" r="8" fill="#0F172A" stroke="#E2E8F0" strokeWidth="1.5" />
              <circle cx="26" cy="18" r="3" fill="#EF4444" />
            </g>
          )}

          {config.techId === 'tech_gaming' && (
            <g transform="translate(15, 235)" filter="url(#glowEffect)">
              <polygon points="12,8 52,8 60,38 4,38" fill="#0F172A" stroke="#06B6D4" strokeWidth="2" />
              <rect x="15" y="10" width="34" height="24" fill="#1E1B4B" />
              <text x="32" y="24" fill="#38BDF8" fontSize="8" fontWeight="bold" textAnchor="middle">&gt;GAME_</text>
              <rect x="2" y="38" width="60" height="8" rx="2" fill="url(#rgbKey)" />
            </g>
          )}

          {config.techId === 'tech_holo_desk' && (
            <g transform="translate(16, 224)" filter="url(#glowEffect)">
              <rect x="6" y="42" width="44" height="10" rx="3" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
              <polygon points="28,42 8,10 48,10" fill="#38BDF8" opacity="0.28" />
              <circle cx="28" cy="20" r="10" fill="none" stroke="#BAE6FD" strokeWidth="1.5" />
              <polygon points="28,12 31,18 37,18 32,22 34,28 28,24 22,28 24,22 19,18 25,18" fill="#FACC15" />
            </g>
          )}

          {config.techId === 'tech_quantum' && (
            <g transform="translate(25, 220)" filter="url(#glowEffect)" className={animated ? 'studio-float' : ''}>
              <circle cx="25" cy="25" r="18" fill="#0284C7" opacity="0.3" />
              <circle cx="25" cy="25" r="10" fill="#38BDF8" />
              <ellipse cx="25" cy="25" rx="24" ry="8" fill="none" stroke="#F59E0B" strokeWidth="2" transform="rotate(30 25 25)" />
              <ellipse cx="25" cy="25" rx="24" ry="8" fill="none" stroke="#10B981" strokeWidth="2" transform="rotate(-30 25 25)" />
            </g>
          )}
        </g>
      )}
    </>
  );
};
