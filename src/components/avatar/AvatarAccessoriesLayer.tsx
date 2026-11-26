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
      {/* 7. HANDHELD ITEM (Right Hand anchor: (216, 224)) */}
      <g id="handheld-layer" filter={`url(#softAO_${uid})`}>
        {config.handheldId === 'hand_pencil' && (
          <g transform="translate(216, 188) rotate(-26)">
            <rect x="-4" y="0" width="10" height="48" rx="4" fill={`url(#goldMetal_${uid})`} />
            <rect x="-1.5" y="9" width="3" height="34" rx="1.5" fill="#FEF08A" opacity="0.72" />
            <polygon points="-4,48 6,48 1,60" fill="#FED7AA" />
            <polygon points="-1.2,54 3.2,54 1,60" fill="#1E293B" />
            <rect x="-4" y="0" width="10" height="8" rx="3" fill="#F43F5E" />
            <rect x="-4" y="6" width="10" height="3.5" fill={`url(#silverMetal_${uid})`} />
          </g>
        )}

        {config.handheldId === 'hand_ruler' && (
          <g transform="translate(214, 182) rotate(-18)">
            <rect x="-4" y="0" width="14" height="58" rx="5" fill="#06B6D4" fillOpacity="0.94" />
            <rect x="-2" y="2" width="4" height="54" rx="2" fill="#FFFFFF" opacity="0.32" />
            <line x1="-1" y1="12" x2="6" y2="12" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <line x1="-1" y1="22" x2="4" y2="22" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="-1" y1="32" x2="6" y2="32" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <line x1="-1" y1="42" x2="4" y2="42" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="-1" y1="52" x2="6" y2="52" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {config.handheldId === 'hand_star_wand' && (
          <g transform="translate(212, 174) rotate(14)" filter={`url(#glowEffect_${uid})`}>
            <line x1="6" y1="54" x2="18" y2="12" stroke="#EC4899" strokeWidth="6" strokeLinecap="round" />
            <line x1="6" y1="54" x2="18" y2="12" stroke="#FBCFE8" strokeWidth="2" strokeLinecap="round" />
            <polygon
              points="18,-4 22,7 33,7 24,14 27,25 18,18 9,25 12,14 3,7 14,7"
              fill={`url(#goldMetal_${uid})`}
            />
            <circle cx="15" cy="9" r="2.4" fill="#FFFFFF" opacity="0.92" />
          </g>
        )}

        {config.handheldId === 'hand_backpack_rocket' && (
          <g transform="translate(206, 186) rotate(-6)">
            <rect x="-2" y="34" width="9" height="12" rx="4" fill="#EF4444" />
            <rect x="23" y="34" width="9" height="12" rx="4" fill="#EF4444" />
            <polygon points="-1,46 6,46 2.5,56" fill="#FACC15" />
            <polygon points="24,46 31,46 27.5,56" fill="#FACC15" />
            <rect x="2" y="6" width="26" height="34" rx="10" fill="#2563EB" />
            <rect x="7" y="14" width="16" height="14" rx="5" fill="#60A5FA" />
            <circle cx="15" cy="21" r="4.5" fill="#FDE047" />
          </g>
        )}

        {config.handheldId === 'hand_compass' && (
          <g transform="translate(212, 184) rotate(-14)">
            <line x1="12" y1="6" x2="2" y2="52" stroke={`url(#silverMetal_${uid})`} strokeWidth="5" strokeLinecap="round" />
            <line x1="12" y1="6" x2="22" y2="52" stroke={`url(#silverMetal_${uid})`} strokeWidth="5" strokeLinecap="round" />
            <circle cx="12" cy="6" r="6" fill="#0284C7" />
            <circle cx="2" cy="52" r="2.6" fill="#0F172A" />
            <circle cx="22" cy="52" r="2.6" fill="#EF4444" />
          </g>
        )}

        {config.handheldId === 'hand_camera' && (
          <g transform="translate(202, 196) rotate(-8)">
            <rect x="8" y="1" width="14" height="7" rx="3" fill="#F59E0B" />
            <rect x="0" y="6" width="36" height="26" rx="8" fill="#1E293B" />
            <circle cx="18" cy="19" r="9" fill="#38BDF8" />
            <circle cx="18" cy="19" r="4.5" fill="#0F172A" />
            <circle cx="15" cy="16" r="2" fill="#FFFFFF" />
            <circle cx="30" cy="11" r="2.5" fill="#FEF08A" />
          </g>
        )}

        {config.handheldId === 'hand_micro' && (
          <g transform="translate(212, 180) rotate(18)">
            <rect x="6" y="18" width="8.5" height="33" rx="4.25" fill="#1E293B" />
            <circle cx="10.2" cy="11" r="10.5" fill={`url(#silverMetal_${uid})`} />
            <line x1="2.5" y1="11" x2="18" y2="11" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="22" cy="2" r="2.6" fill="#F43F5E" />
          </g>
        )}

        {config.handheldId === 'hand_magnifier' && (
          <g transform="translate(208, 184) rotate(15)">
            <line x1="13" y1="22" x2="7" y2="50" stroke="#92400E" strokeWidth="6.5" strokeLinecap="round" />
            <circle cx="15" cy="12" r="13.5" fill="#BAE6FD" stroke={`url(#silverMetal_${uid})`} strokeWidth="4.2" />
            <path d="M8 8 Q13 3 20 6" stroke="#FFFFFF" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          </g>
        )}

        {config.handheldId === 'hand_beaker' && (
          <g transform="translate(204, 184) rotate(-6)" filter={`url(#glowEffect_${uid})`}>
            <rect x="8" y="2" width="10" height="10" rx="3" fill="#E2E8F0" />
            <path
              d="M8 12 L2 39 Q1 45 7 45 L19 45 Q25 45 24 39 L18 12 Z"
              fill="#BAE6FD"
              fillOpacity="0.9"
            />
            <path d="M5 27 L21 27 L23 39 Q24 43 18 43 L8 43 Q2 43 3 39 Z" fill="#10B981" />
            <circle cx="10" cy="32" r="2.5" fill="#FEF08A" />
            <circle cx="16" cy="36" r="1.8" fill="#FFFFFF" />
          </g>
        )}

        {config.handheldId === 'hand_casio' && (
          <g transform="translate(204, 190) rotate(-10)" filter={`url(#glowEffect_${uid})`}>
            <rect x="0" y="0" width="30" height="48" rx="7" fill="#1E293B" />
            <rect x="3.5" y="4" width="23" height="12" rx="3" fill="#E2E8F0" />
            <text x="15" y="12.5" fill="#0F172A" fontSize="6.8" fontWeight="bold" textAnchor="middle">
              FX PRO
            </text>
            <rect x="4" y="18" width="22" height="4" rx="1.5" fill="#B45309" />
            <circle cx="8" cy="28.5" r="2.4" fill="#38BDF8" />
            <circle cx="15" cy="28.5" r="2.4" fill="#38BDF8" />
            <circle cx="22" cy="28.5" r="2.4" fill="#38BDF8" />
            <circle cx="8" cy="37" r="2.4" fill="#94A3B8" />
            <circle cx="15" cy="37" r="2.4" fill="#94A3B8" />
            <circle cx="22" cy="37" r="2.4" fill="#EF4444" />
          </g>
        )}

        {config.handheldId === 'hand_guitar' && (
          <g transform="translate(198, 174) rotate(-18)">
            <rect x="14" y="-8" width="6" height="32" rx="3" fill="#92400E" />
            <rect x="11.5" y="-12" width="11" height="8" rx="3" fill={`url(#goldMetal_${uid})`} />
            <path d="M4 22 L29 22 L34 45 Q17 58 1 45 Z" fill="#EC4899" />
            <circle cx="17" cy="35" r="5" fill="#FFFFFF" />
          </g>
        )}

        {config.handheldId === 'hand_telescope' && (
          <g transform="translate(206, 178) rotate(-25)">
            <rect x="2" y="10" width="14" height="38" rx="5" fill="#0284C7" />
            <rect x="4" y="0" width="10" height="15" rx="3.5" fill={`url(#goldMetal_${uid})`} />
            <ellipse cx="9" cy="1" rx="6" ry="2.8" fill="#7DD3FC" />
          </g>
        )}

        {config.handheldId === 'hand_trophy_mini' && (
          <g transform="translate(206, 186) rotate(-6)" filter={`url(#glowEffect_${uid})`}>
            <path d="M3 2 L27 2 L22 20 Q15 26 8 20 Z" fill={`url(#goldMetal_${uid})`} />
            <rect x="12.5" y="21" width="5" height="9" fill="#CA8A04" />
            <rect x="7" y="29" width="16" height="6" rx="3" fill="#92400E" />
          </g>
        )}

        {config.handheldId === 'hand_laser' && (
          <g transform="translate(216, 192) rotate(-42)" filter={`url(#glowEffect_${uid})`}>
            <rect x="0" y="0" width="8" height="36" rx="4" fill="#334155" />
            <line x1="4" y1="0" x2="4" y2="-66" stroke="#10B981" strokeWidth="6" strokeLinecap="round" />
            <line x1="4" y1="0" x2="4" y2="-64" stroke="#A7F3D0" strokeWidth="2.4" strokeLinecap="round" />
          </g>
        )}

        {config.handheldId === 'hand_hero_shield' && (
          <g transform="translate(202, 186)" filter={`url(#glowEffect_${uid})`}>
            <circle cx="20" cy="24" r="24" fill="#DC2626" />
            <circle cx="20" cy="24" r="17.5" fill="#F8FAFC" />
            <circle cx="20" cy="24" r="11.5" fill="#1D4ED8" />
            <polygon
              points="20,14 22.6,20.5 29.5,20.5 24,24.8 26,31.5 20,27.5 14,31.5 16,24.8 10.5,20.5 17.4,20.5"
              fill="#FFFFFF"
            />
            <path d="M7 14 Q16 5 26 7" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </g>
        )}

        {config.handheldId === 'hand_element_staff' && (
          <g transform="translate(216, 158) rotate(10)" filter={`url(#glowEffect_${uid})`}>
            <rect x="6" y="16" width="6.5" height="68" rx="3.25" fill="#B45309" />
            <polygon points="9,-6 21,9 9,24 -3,9" fill="#38BDF8" />
            <circle cx="-4" cy="6" r="3.6" fill="#EF4444" />
            <circle cx="22" cy="6" r="3.6" fill="#10B981" />
            <circle cx="9" cy="-8" r="3.6" fill="#FACC15" />
          </g>
        )}

        {config.handheldId === 'hand_tome' && (
          <g transform="translate(198, 186) rotate(-10)" filter={`url(#glowEffect_${uid})`}>
            <rect x="0" y="0" width="38" height="50" rx="7" fill="#78350F" />
            <rect x="4" y="4" width="30" height="42" rx="4" fill="#D97706" />
            <circle cx="19" cy="25" r="10" fill={`url(#goldMetal_${uid})`} />
            <text x="19" y="29" fill="#78350F" fontSize="12" fontWeight="bold" textAnchor="middle">
              √∞
            </text>
          </g>
        )}
      </g>

      {/* 8. PHONE ITEM (Left Hand anchor: (104, 224)) */}
      <g id="phone-layer" filter={`url(#softAO_${uid})`}>
        {config.phoneId === 'phone_brick' && (
          <g transform="translate(80, 198) rotate(15)">
            <rect x="0" y="0" width="22" height="40" rx="7" fill="#1E3A8A" />
            <rect x="3.5" y="4.5" width="15" height="12" rx="3" fill="#84CC16" />
            <circle cx="11" cy="23" r="3.5" fill="#94A3B8" />
            <rect x="4.5" y="28" width="13" height="7" rx="2" fill="#64748B" />
          </g>
        )}

        {config.phoneId === 'phone_walkie' && (
          <g transform="translate(78, 196) rotate(12)">
            <rect x="14" y="-12" width="4" height="14" rx="2" fill="#1E293B" />
            <rect x="0" y="0" width="22" height="42" rx="6" fill="#16A34A" />
            <rect x="3.5" y="4.5" width="15" height="12" rx="3" fill="#FEF08A" />
            <line x1="5" y1="23" x2="17" y2="23" stroke="#064E3B" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="5" y1="28" x2="17" y2="28" stroke="#064E3B" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {config.phoneId === 'phone_flip' && (
          <g transform="translate(82, 200) rotate(15)">
            <rect x="0" y="0" width="20" height="28" rx="6" fill="#EC4899" />
            <circle cx="10" cy="9.5" r="4.8" fill="#FCE7F3" />
          </g>
        )}

        {config.phoneId === 'phone_cameraphone' && (
          <g transform="translate(76, 192) rotate(8)">
            <circle cx="13" cy="2" r="9.5" fill="none" stroke="#FEF08A" strokeWidth="3" />
            <rect x="1" y="6" width="25" height="42" rx="6" fill="#0F172A" />
            <rect x="3.5" y="9.5" width="20" height="33" rx="3.5" fill="#38BDF8" />
            <line x1="6" y1="13" x2="13" y2="13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {config.phoneId === 'phone_smart' && (
          <g transform="translate(76, 194) rotate(12)">
            <rect x="0" y="0" width="26" height="46" rx="7" fill="#0F172A" />
            <rect x="2.5" y="2.5" width="21" height="41" rx="5" fill="#0EA5E9" />
            <circle cx="13" cy="7" r="1.8" fill="#FFFFFF" />
            <line x1="6" y1="13" x2="17" y2="13" stroke="#BAE6FD" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        )}

        {config.phoneId === 'phone_ranger_morpher' && (
          <g transform="translate(78, 200) rotate(10)" filter={`url(#glowEffect_${uid})`}>
            <rect x="2" y="0" width="24" height="28" rx="7" fill="#EF4444" />
            <circle cx="14" cy="14" r="7" fill="#0F172A" />
            <circle cx="14" cy="14" r="3.6" fill="#38BDF8" />
            <circle cx="7" cy="5.5" r="2.2" fill="#FACC15" />
            <circle cx="21" cy="5.5" r="2.2" fill="#10B981" />
          </g>
        )}

        {config.phoneId === 'phone_console_mini' && (
          <g transform="translate(68, 202) rotate(8)">
            <rect x="0" y="0" width="36" height="20" rx="7" fill="#0F172A" />
            <rect x="6" y="3" width="24" height="14" rx="3" fill="#38BDF8" />
            <rect x="0" y="2" width="6" height="16" rx="3" fill="#EF4444" />
            <rect x="30" y="2" width="6" height="16" rx="3" fill="#2563EB" />
          </g>
        )}

        {config.phoneId === 'phone_promax' && (
          <g transform="translate(74, 192) rotate(10)" filter={`url(#glowEffect_${uid})`}>
            <rect x="0" y="0" width="28" height="50" rx="7" fill={`url(#goldMetal_${uid})`} />
            <rect x="2.5" y="2.5" width="23" height="45" rx="5" fill="#1E293B" />
            <circle cx="8" cy="9" r="2.8" fill="#F59E0B" />
            <circle cx="14" cy="9" r="2.8" fill="#F59E0B" />
            <circle cx="11" cy="15" r="2.8" fill="#F59E0B" />
          </g>
        )}

        {config.phoneId === 'phone_holo' && (
          <g transform="translate(70, 190)" filter={`url(#glowEffect_${uid})`}>
            <ellipse cx="14" cy="40" rx="15" ry="5" fill="#06B6D4" />
            <polygon points="14,40 1,9 27,9" fill="#22D3EE" opacity="0.52" />
            <text x="14" y="22" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">
              AI 3D
            </text>
          </g>
        )}
      </g>

      {/* 9. TECH / DESK ITEM (Left Hover / Desk Zone: x~14..78, y~218..300) */}
      {showTech && (
        <g id="tech-layer" filter={`url(#softAO_${uid})`}>
          {config.techId === 'tech_notebook' && (
            <g transform="translate(22, 244)">
              <rect x="0" y="0" width="42" height="52" rx="7" fill="#3B82F6" />
              <rect x="6" y="8" width="30" height="18" rx="4" fill="#FFFFFF" />
              <text x="21" y="16.5" fill="#1E293B" fontSize="6.5" fontWeight="bold" textAnchor="middle">
                VỞ GHI
              </text>
              <text x="21" y="23" fill="#2563EB" fontSize="5.2" fontWeight="bold" textAnchor="middle">
                SGK 1-9
              </text>
              <line x1="6" y1="34" x2="36" y2="34" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
              <line x1="6" y1="41" x2="36" y2="41" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          {config.techId === 'tech_abacus' && (
            <g transform="translate(18, 248)">
              <rect x="0" y="0" width="48" height="40" rx="7" fill="#92400E" />
              <rect x="4.5" y="4.5" width="39" height="31" rx="4" fill="#FEF3C7" />
              <line x1="4.5" y1="15" x2="43.5" y2="15" stroke="#78350F" strokeWidth="2" />
              <line x1="4.5" y1="25" x2="43.5" y2="25" stroke="#78350F" strokeWidth="2" />
              <circle cx="13" cy="15" r="3.8" fill="#EF4444" />
              <circle cx="23" cy="15" r="3.8" fill="#F59E0B" />
              <circle cx="32" cy="25" r="3.8" fill="#2563EB" />
              <circle cx="18" cy="25" r="3.8" fill="#10B981" />
            </g>
          )}

          {config.techId === 'tech_drawpad' && (
            <g transform="translate(16, 244)">
              <rect x="0" y="0" width="52" height="40" rx="8" fill="#1E293B" />
              <rect x="4.5" y="4.5" width="39" height="31" rx="4" fill="#FFFFFF" />
              <path d="M9 24 Q20 11 30 22 T39 15" fill="none" stroke="#EC4899" strokeWidth="2.8" strokeLinecap="round" />
              <line x1="46" y1="7" x2="46" y2="32" stroke="#FACC15" strokeWidth="4" strokeLinecap="round" />
            </g>
          )}

          {config.techId === 'tech_tablet' && (
            <g transform="translate(20, 236)">
              <rect x="0" y="0" width="48" height="60" rx="8" fill="#1E293B" />
              <rect x="3.5" y="3.5" width="41" height="53" rx="5" fill="#EFF6FF" />
              <text x="24" y="19" fill="#1E40AF" fontSize="6.5" fontWeight="bold" textAnchor="middle">
                SGK SỐ
              </text>
              <text x="24" y="29" fill="#3B82F6" fontSize="5.2" fontWeight="bold" textAnchor="middle">
                LỚP 1-9
              </text>
              <rect x="8" y="35" width="32" height="16" rx="4" fill="#DBEAFE" />
            </g>
          )}

          {config.techId === 'tech_ultrabook' && (
            <g transform="translate(15, 246)">
              <polygon points="10,10 49,10 56,42 3,42" fill={`url(#silverMetal_${uid})`} />
              <rect x="13" y="13" width="33" height="23" rx="3" fill="#0F172A" />
              <rect x="0" y="42" width="59" height="8" rx="4" fill="#94A3B8" />
            </g>
          )}

          {config.techId === 'tech_vr_station' && (
            <g transform="translate(16, 238)" filter={`url(#glowEffect_${uid})`}>
              <rect x="4" y="10" width="48" height="28" rx="11" fill="#0F172A" />
              <rect x="9" y="14" width="38" height="16" rx="7" fill="#0EA5E9" opacity="0.86" />
              <path d="M12 20 L25 20 M31 20 L44 20" stroke="#E0F2FE" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="16" y="40" width="24" height="8" rx="4" fill="#475569" />
            </g>
          )}

          {config.techId === 'tech_drone_cam' && (
            <g transform="translate(14, 214)" className={animated ? 'studio-float' : ''}>
              <line x1="8" y1="10" x2="48" y2="28" stroke="#64748B" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="48" y1="10" x2="8" y2="28" stroke="#64748B" strokeWidth="3.5" strokeLinecap="round" />
              <ellipse cx="8" cy="10" rx="10" ry="3.5" fill="#38BDF8" opacity="0.88" />
              <ellipse cx="48" cy="10" rx="10" ry="3.5" fill="#38BDF8" opacity="0.88" />
              <ellipse cx="8" cy="28" rx="10" ry="3.5" fill="#38BDF8" opacity="0.88" />
              <ellipse cx="48" cy="28" rx="10" ry="3.5" fill="#38BDF8" opacity="0.88" />
              <circle cx="28" cy="19" r="9.5" fill="#0F172A" />
              <circle cx="28" cy="19" r="4" fill="#EF4444" />
            </g>
          )}

          {config.techId === 'tech_gaming' && (
            <g transform="translate(12, 240)" filter={`url(#glowEffect_${uid})`}>
              <polygon points="12,8 56,8 64,40 4,40" fill="#0F172A" />
              <rect x="15" y="11" width="38" height="25" rx="3" fill="#1E1B4B" />
              <text x="34" y="26" fill="#38BDF8" fontSize="8" fontWeight="bold" textAnchor="middle">
                &gt;GAME_
              </text>
              <rect x="2" y="40" width="64" height="10" rx="4" fill={`url(#rgbKey_${uid})`} />
            </g>
          )}

          {config.techId === 'tech_holo_desk' && (
            <g transform="translate(14, 228)" filter={`url(#glowEffect_${uid})`}>
              <rect x="6" y="44" width="48" height="12" rx="5" fill="#1E293B" />
              <polygon points="30,44 8,10 52,10" fill="#38BDF8" opacity="0.34" />
              <circle cx="30" cy="21" r="11" fill="none" stroke="#BAE6FD" strokeWidth="2" />
              <polygon points="30,13 33,19 39,19 34,23 36,29 30,25 24,29 26,23 21,19 27,19" fill="#FACC15" />
            </g>
          )}

          {config.techId === 'tech_quantum' && (
            <g transform="translate(20, 224)" filter={`url(#glowEffect_${uid})`} className={animated ? 'studio-float' : ''}>
              <circle cx="26" cy="26" r="19" fill="#0284C7" opacity="0.34" />
              <circle cx="26" cy="26" r="11" fill="#38BDF8" />
              <ellipse cx="26" cy="26" rx="26" ry="9" fill="none" stroke="#F59E0B" strokeWidth="2.5" transform="rotate(30 26 26)" />
              <ellipse cx="26" cy="26" rx="26" ry="9" fill="none" stroke="#10B981" strokeWidth="2.5" transform="rotate(-30 26 26)" />
            </g>
          )}
        </g>
      )}
    </>
  );
};
