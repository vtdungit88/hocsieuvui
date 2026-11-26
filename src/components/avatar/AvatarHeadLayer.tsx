import React from 'react';
import { AvatarConfig } from '../../types';

interface AvatarHeadLayerProps {
  config: AvatarConfig;
  skin: string;
  hair: string;
  animated: boolean;
}

export const AvatarHeadLayer: React.FC<AvatarHeadLayerProps> = ({
  config,
  skin,
  hair,
  animated
}) => {
  const isMaskedHeadgear = config.hairStyle === 'helmet_astro' || config.hairStyle === 'hood_ninja';

  return (
    <>
      {/* HEAD & FACE */}
      <g id="head-layer">
        <rect x="140" y="145" width="20" height="20" fill={skin} />
        <circle cx="112" cy="115" r="11" fill={skin} />
        <circle cx="188" cy="115" r="11" fill={skin} />
        <ellipse cx="150" cy="115" rx="38" ry="42" fill={skin} />
        <ellipse cx="128" cy="125" rx="7" ry="4" fill="#F43F5E" opacity="0.3" />
        <ellipse cx="172" cy="125" rx="7" ry="4" fill="#F43F5E" opacity="0.3" />
        <ellipse cx="150" cy="118" rx="2" ry="3" fill="#D97706" opacity="0.4" />
        {!isMaskedHeadgear && (
          <path
            d="M142 130 Q150 140 158 130"
            stroke="#991B1B"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="#DC2626"
          />
        )}

        {/* EYES & EXPRESSION */}
        <g className={animated ? 'studio-blink' : ''}>
          {config.eyeExpression === 'glasses_happy' && (
            <g id="exp_glasses">
              <circle cx="134" cy="110" r="14" fill="none" stroke="#1E293B" strokeWidth="3" />
              <circle cx="166" cy="110" r="14" fill="none" stroke="#1E293B" strokeWidth="3" />
              <line x1="148" y1="110" x2="152" y2="110" stroke="#1E293B" strokeWidth="3" />
              <path d="M128 111 Q134 105 140 111" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M160 111 Q166 105 172 111" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          )}

          {config.eyeExpression === 'sparkle_joy' && (
            <g id="exp_sparkle">
              <ellipse cx="134" cy="110" rx="9" ry="11" fill="#1E293B" />
              <ellipse cx="166" cy="110" rx="9" ry="11" fill="#1E293B" />
              <circle cx="131" cy="107" r="4" fill="#FFFFFF" />
              <circle cx="163" cy="107" r="4" fill="#FFFFFF" />
              <circle cx="136" cy="114" r="2" fill="#FFFFFF" />
              <circle cx="168" cy="114" r="2" fill="#FFFFFF" />
            </g>
          )}

          {config.eyeExpression === 'cool_wink' && (
            <g id="exp_wink">
              <path d="M126 112 Q134 106 142 112" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <ellipse cx="166" cy="110" rx="8" ry="10" fill="#1E293B" />
              <circle cx="164" cy="108" r="3" fill="#FFFFFF" />
            </g>
          )}

          {config.eyeExpression === 'focused_scholar' && (
            <g id="exp_scholar">
              <line x1="125" y1="102" x2="142" y2="106" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
              <line x1="175" y1="102" x2="158" y2="106" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="134" cy="112" rx="7" ry="8" fill="#1E293B" />
              <ellipse cx="166" cy="112" rx="7" ry="8" fill="#1E293B" />
              <circle cx="133" cy="110" r="2.5" fill="#FFFFFF" />
              <circle cx="165" cy="110" r="2.5" fill="#FFFFFF" />
            </g>
          )}

          {config.eyeExpression === 'sunglasses_boss' && (
            <g id="exp_sunglasses">
              <polygon points="120,102 146,102 142,118 124,118" fill="#0F172A" />
              <polygon points="154,102 180,102 176,118 158,118" fill="#0F172A" />
              <line x1="146" y1="106" x2="154" y2="106" stroke="#0F172A" strokeWidth="3" />
              <line x1="124" y1="108" x2="138" y2="108" stroke="#38BDF8" strokeWidth="1.5" />
              <line x1="158" y1="108" x2="172" y2="108" stroke="#38BDF8" strokeWidth="1.5" />
            </g>
          )}

          {config.eyeExpression === 'visor_hud' && (
            <g id="exp_visor_hud">
              <path
                d="M115 101 Q150 95 185 101 L181 119 Q150 123 119 119 Z"
                fill="#0EA5E9"
                fillOpacity="0.82"
                stroke="#0F172A"
                strokeWidth="2.5"
              />
              <line x1="123" y1="107" x2="142" y2="107" stroke="#E0F2FE" strokeWidth="2" strokeLinecap="round" />
              <circle cx="167" cy="110" r="4" fill="#FEF08A" />
              <circle cx="177" cy="110" r="2" fill="#BAE6FD" />
            </g>
          )}

          {config.eyeExpression === 'mask_hero' && (
            <g id="exp_mask_hero">
              <path
                d="M114 103 Q132 95 150 104 Q168 95 186 103 L182 119 Q166 122 155 113 L145 113 Q134 122 118 119 Z"
                fill="#1D4ED8"
                stroke="#FACC15"
                strokeWidth="1.8"
              />
              <ellipse cx="134" cy="110" rx="7" ry="4.5" fill="#FFFFFF" />
              <ellipse cx="166" cy="110" rx="7" ry="4.5" fill="#FFFFFF" />
              <circle cx="134" cy="110" r="2.2" fill="#0F172A" />
              <circle cx="166" cy="110" r="2.2" fill="#0F172A" />
            </g>
          )}

          {config.eyeExpression === 'goggles_racer' && (
            <g id="exp_goggles_racer">
              <rect x="118" y="99" width="28" height="19" rx="6" fill="#0F172A" stroke="#F59E0B" strokeWidth="2.5" />
              <rect x="154" y="99" width="28" height="19" rx="6" fill="#0F172A" stroke="#F59E0B" strokeWidth="2.5" />
              <rect x="146" y="106" width="8" height="5" fill="#F59E0B" />
              <rect x="122" y="103" width="20" height="11" rx="3" fill="#38BDF8" opacity="0.85" />
              <rect x="158" y="103" width="20" height="11" rx="3" fill="#38BDF8" opacity="0.85" />
              <line x1="125" y1="106" x2="136" y2="106" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="161" y1="106" x2="172" y2="106" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
            </g>
          )}

          {config.eyeExpression === 'flame_eyes' && (
            <g id="exp_flame_eyes">
              <line x1="122" y1="99" x2="143" y2="104" stroke="#B91C1C" strokeWidth="3" strokeLinecap="round" />
              <line x1="178" y1="99" x2="157" y2="104" stroke="#B91C1C" strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="134" cy="110" rx="8.5" ry="9.5" fill="#7C2D12" />
              <ellipse cx="166" cy="110" rx="8.5" ry="9.5" fill="#7C2D12" />
              <circle cx="134" cy="110" r="4.5" fill="#F59E0B" />
              <circle cx="166" cy="110" r="4.5" fill="#F59E0B" />
              <circle cx="132" cy="107" r="2.2" fill="#FEF08A" />
              <circle cx="164" cy="107" r="2.2" fill="#FEF08A" />
            </g>
          )}
        </g>
      </g>

      {/* HAIR / HELMET / HEADGEAR LAYER */}
      <g id="hair-layer">
        {config.hairStyle === 'short_neat' && (
          <path d="M112 110 C110 70 190 70 188 110 C180 95 120 95 112 110 Z" fill={hair} />
        )}

        {config.hairStyle === 'undercut' && (
          <g id="hair_undercut">
            <path d="M112 115 C112 70 188 65 190 95 C185 80 150 75 125 90 Z" fill={hair} />
            <path d="M125 78 Q155 60 185 75 Q160 85 135 88 Z" fill={hair} />
          </g>
        )}

        {config.hairStyle === 'messy_spiky' && (
          <path
            d="M112 105 L118 80 L132 85 L145 65 L158 80 L172 68 L182 85 L190 105 C180 92 120 92 112 105 Z"
            fill={hair}
          />
        )}

        {config.hairStyle === 'ponytail' && (
          <g id="hair_ponytail">
            <path d="M112 115 C110 75 190 75 188 115 C180 95 120 95 112 115 Z" fill={hair} />
            <ellipse cx="196" cy="95" rx="7" ry="5" fill="#EF4444" />
            <path d="M198 96 Q225 110 220 145 Q212 140 205 115 Z" fill={hair} />
          </g>
        )}

        {config.hairStyle === 'twintails' && (
          <g id="hair_twintails">
            <path d="M112 115 C110 75 190 75 188 115 C180 95 120 95 112 115 Z" fill={hair} />
            <circle cx="106" cy="110" r="5" fill="#EC4899" />
            <path d="M104 112 Q80 130 92 160 Q96 140 106 120 Z" fill={hair} />
            <circle cx="194" cy="110" r="5" fill="#EC4899" />
            <path d="M196 112 Q220 130 208 160 Q204 140 194 120 Z" fill={hair} />
          </g>
        )}

        {config.hairStyle === 'bob_bangs' && (
          <g id="hair_bob">
            <path
              d="M110 115 C108 70 192 70 190 115 L192 135 C186 135 184 100 180 100 C160 105 140 105 120 100 C116 100 114 135 108 135 Z"
              fill={hair}
            />
          </g>
        )}

        {config.hairStyle === 'curly_wave' && (
          <g id="hair_curly">
            <circle cx="120" cy="85" r="16" fill={hair} />
            <circle cx="140" cy="75" r="18" fill={hair} />
            <circle cx="160" cy="75" r="18" fill={hair} />
            <circle cx="180" cy="85" r="16" fill={hair} />
            <circle cx="112" cy="105" r="12" fill={hair} />
            <circle cx="188" cy="105" r="12" fill={hair} />
          </g>
        )}

        {/* Mũ Giáp Siêu Anh Hùng (Open-face hero helmet with star crest) */}
        {config.hairStyle === 'helmet_hero' && (
          <g id="helmet_hero">
            <path
              d="M108 112 C106 60 194 60 192 112 L185 112 C180 90 120 90 115 112 Z"
              fill="#DC2626"
              stroke="#FACC15"
              strokeWidth="2.5"
            />
            <path d="M135 66 L150 96 L165 66 Z" fill="#FACC15" />
            <polygon points="150,70 153,77 160,77 154,81 156,88 150,84 144,88 146,81 140,77 147,77" fill="#DC2626" />
            <rect x="104" y="102" width="9" height="22" rx="4" fill="#FACC15" />
            <rect x="187" y="102" width="9" height="22" rx="4" fill="#FACC15" />
          </g>
        )}

        {/* Mũ Chiến Binh Biệt Đội (Ranger open-chin helmet) */}
        {config.hairStyle === 'helmet_ranger' && (
          <g id="helmet_ranger">
            <path
              d="M107 116 C105 60 195 60 193 116 L184 116 C181 94 166 90 150 90 C134 90 119 94 116 116 Z"
              fill={hair === '#1E293B' ? '#2563EB' : hair}
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            <path d="M120 92 Q150 82 180 92 L176 101 Q150 94 124 101 Z" fill="#0F172A" />
            <polygon points="150,64 156,77 150,84 144,77" fill="#FDE047" />
            <circle cx="108" cy="112" r="5" fill="#FACC15" />
            <circle cx="192" cy="112" r="5" fill="#FACC15" />
          </g>
        )}

        {/* Khăn Trùm Ninja Bóng Đêm */}
        {config.hairStyle === 'hood_ninja' && (
          <g id="hood_ninja">
            <path
              d="M108 118 C106 66 194 66 192 118 C184 94 116 94 108 118 Z"
              fill="#0F172A"
            />
            <path d="M113 123 Q150 118 187 123 L182 154 Q150 160 118 154 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
            <rect x="112" y="84" width="76" height="9" rx="4" fill="#DC2626" />
            <rect x="140" y="81" width="20" height="13" rx="3" fill="#94A3B8" stroke="#334155" strokeWidth="1.5" />
            <path d="M188 88 L210 78 L206 89 L212 96 L188 92 Z" fill="#DC2626" />
          </g>
        )}

        {/* Mũ Bảo Hiểm Tay Đua */}
        {config.hairStyle === 'helmet_racer' && (
          <g id="helmet_racer">
            <path
              d="M108 114 C106 62 194 62 192 114 L184 110 C176 92 124 92 116 110 Z"
              fill="#F8FAFC"
              stroke="#0284C7"
              strokeWidth="2.5"
            />
            <rect x="145" y="67" width="10" height="28" rx="3" fill="#EF4444" />
            <path d="M115 95 L185 95" stroke="#0284C7" strokeWidth="5" strokeLinecap="round" />
            <rect x="104" y="104" width="8" height="16" rx="3" fill="#0F172A" />
            <rect x="188" y="104" width="8" height="16" rx="3" fill="#0F172A" />
          </g>
        )}

        {/* Mũ Pháp Sư Chóp Nhọn */}
        {config.hairStyle === 'hat_wizard' && (
          <g id="hat_wizard">
            <path d="M112 108 C110 76 190 76 188 108 C178 96 122 96 112 108 Z" fill={hair} />
            <ellipse cx="150" cy="86" rx="54" ry="12" fill="#4C1D95" stroke="#F59E0B" strokeWidth="2.5" />
            <path d="M120 84 L148 24 L178 84 Z" fill="#5B21B6" stroke="#F59E0B" strokeWidth="2" strokeLinejoin="round" />
            <path d="M126 76 Q150 82 173 76" stroke="#F59E0B" strokeWidth="5" fill="none" />
            <polygon points="150,48 153,55 160,55 154,59 156,66 150,62 144,66 146,59 140,55 147,55" fill="#FDE047" />
          </g>
        )}

        {/* Mũ Phi Hành Gia Vòm Kính */}
        {config.hairStyle === 'helmet_astro' && (
          <g id="helmet_astro">
            <path d="M115 104 C115 74 185 74 185 104 C174 94 126 94 115 104 Z" fill={hair} opacity="0.85" />
            <circle cx="150" cy="113" r="49" fill="#BAE6FD" fillOpacity="0.22" stroke="#E2E8F0" strokeWidth="4.5" />
            <path d="M116 82 Q132 69 154 71" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7" />
            <rect x="115" y="150" width="70" height="10" rx="5" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.5" />
            <circle cx="150" cy="155" r="3" fill="#0284C7" />
          </g>
        )}

        {/* Lab safety goggles on forehead if lab coat equipped */}
        {config.outfitId === 'outfit_lab' && (
          <g id="lab_goggles">
            <rect x="115" y="79" width="70" height="8" rx="4" fill="#0F172A" />
            <rect x="122" y="73" width="24" height="16" rx="5" fill="#7DD3FC" stroke="#0284C7" strokeWidth="2.5" />
            <rect x="154" y="73" width="24" height="16" rx="5" fill="#7DD3FC" stroke="#0284C7" strokeWidth="2.5" />
          </g>
        )}
      </g>
    </>
  );
};
