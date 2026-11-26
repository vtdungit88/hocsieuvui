import React from 'react';
import { AvatarConfig } from '../../types';

interface AvatarHeadLayerProps {
  config: AvatarConfig;
  skin: string;
  hair: string;
  animated: boolean;
  uid: string;
}

export const AvatarHeadLayer: React.FC<AvatarHeadLayerProps> = ({
  config,
  skin,
  hair,
  animated,
  uid
}) => {
  const isMaskedHeadgear = config.hairStyle === 'helmet_astro' || config.hairStyle === 'hood_ninja';
  const showBackHair =
    config.hairStyle === 'ponytail' ||
    config.hairStyle === 'ponytail_ribbon' ||
    config.hairStyle === 'twintails' ||
    config.hairStyle === 'bob_bangs' ||
    config.hairStyle === 'curly_wave' ||
    config.hairStyle === 'crown_princess' ||
    config.hairStyle === 'tiara_fairy' ||
    config.hairStyle === 'hat_nonla';

  const irisColor =
    config.gender === 'girl' ? '#78350F' : config.gender === 'scholar' ? '#0F172A' : '#451A03';

  return (
    <>
      {/* BACK HAIR SILHOUETTE (behind ears & neck for dimensional depth) */}
      {showBackHair && (
        <g id="back-hair-layer">
          {config.hairStyle === 'ponytail' && (
            <path d="M188 86 Q228 96 226 148 Q210 154 196 122 Z" fill={hair} stroke="#0F172A" strokeOpacity="0.22" strokeWidth="1.6" />
          )}
          {config.hairStyle === 'ponytail_ribbon' && (
            <g>
              <path
                d="M188 84 Q234 94 230 156 Q216 164 202 146 Q196 130 192 114 Z"
                fill={hair}
                stroke="#0F172A"
                strokeOpacity="0.22"
                strokeWidth="1.8"
              />
              <path d="M198 106 Q216 124 216 146" fill="none" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="4" strokeLinecap="round" />
            </g>
          )}
          {config.hairStyle === 'twintails' && (
            <g>
              <path d="M105 104 Q72 125 84 166 Q98 164 108 126 Z" fill={hair} stroke="#0F172A" strokeOpacity="0.22" strokeWidth="1.8" />
              <path d="M195 104 Q228 125 216 166 Q202 164 192 126 Z" fill={hair} stroke="#0F172A" strokeOpacity="0.22" strokeWidth="1.8" />
            </g>
          )}
          {(config.hairStyle === 'bob_bangs' ||
            config.hairStyle === 'crown_princess' ||
            config.hairStyle === 'tiara_fairy' ||
            config.hairStyle === 'hat_nonla') && (
            <path
              d="M102 108 Q96 142 112 154 L188 154 Q204 142 198 108 Z"
              fill={hair}
              stroke="#0F172A"
              strokeOpacity="0.2"
              strokeWidth="1.6"
            />
          )}
          {config.hairStyle === 'curly_wave' && (
            <g fill={hair}>
              <circle cx="104" cy="118" r="15" />
              <circle cx="196" cy="118" r="15" />
              <circle cx="110" cy="136" r="12" />
              <circle cx="190" cy="136" r="12" />
            </g>
          )}
        </g>
      )}

      {/* HEAD & EXPRESSIVE CHIBI FACE */}
      <g id="head-layer">
        {/* Neck with chin drop shadow */}
        <rect x="139" y="142" width="22" height="20" rx="8" fill={skin} />
        <ellipse cx="150" cy="149" rx="12" ry="5" fill="#92400E" opacity="0.2" />

        {/* Cute Plump Ears */}
        <circle cx="104" cy="111" r="11.5" fill={skin} stroke="#B45309" strokeOpacity="0.22" strokeWidth="1.5" />
        <circle cx="104" cy="111" r="11.5" fill={`url(#skinShading_${uid})`} />
        <path d="M101 107 Q106 111 101 116" fill="none" stroke="#F43F5E" strokeOpacity="0.35" strokeWidth="2.5" strokeLinecap="round" />

        <circle cx="196" cy="111" r="11.5" fill={skin} stroke="#B45309" strokeOpacity="0.22" strokeWidth="1.5" />
        <circle cx="196" cy="111" r="11.5" fill={`url(#skinShading_${uid})`} />
        <path d="M199 107 Q194 111 199 116" fill="none" stroke="#F43F5E" strokeOpacity="0.35" strokeWidth="2.5" strokeLinecap="round" />

        {/* Chibi Head Base + 3D Radial Lighting */}
        <ellipse cx="150" cy="107" rx="45" ry="43" fill={skin} stroke="#B45309" strokeOpacity="0.22" strokeWidth="1.6" />
        <ellipse cx="150" cy="107" rx="45" ry="43" fill={`url(#skinShading_${uid})`} />

        {/* Soft Glowing Rosy Cheeks */}
        <ellipse cx="122" cy="121" rx="11" ry="7" fill={`url(#blush_${uid})`} />
        <ellipse cx="178" cy="121" rx="11" ry="7" fill={`url(#blush_${uid})`} />

        {/* Cute Chibi Button Nose */}
        <ellipse cx="150" cy="115" rx="3" ry="2.2" fill="#D97706" opacity="0.38" />
        <circle cx="149" cy="114.2" r="1" fill="#FFFFFF" opacity="0.65" />

        {/* Expressive Mouth matching emotion */}
        {!isMaskedHeadgear && (
          <g>
            {config.eyeExpression === 'surprised_cute' ? (
              <ellipse cx="150" cy="130" rx="5.5" ry="6.5" fill="#BE123C" stroke="#881337" strokeWidth="1.8" />
            ) : config.eyeExpression === 'focused_scholar' ? (
              <path d="M142 130 Q150 133 158 130" stroke="#991B1B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            ) : (
              <g>
                <path
                  d="M140 126 Q150 140 160 126 Z"
                  fill="#BE123C"
                  stroke="#881337"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path d="M142 127 Q150 130 158 127" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
                <ellipse cx="150" cy="133.5" rx="5" ry="2.5" fill="#FB7185" />
              </g>
            )}
          </g>
        )}

        {/* EYES & EXPRESSIONS (Glossy Anime/Chibi Dual-Catchlight) */}
        <g className={animated ? 'studio-blink' : ''}>
          {/* Eyebrows for expressive warmth */}
          {config.eyeExpression !== 'sunglasses_boss' &&
            config.eyeExpression !== 'visor_hud' &&
            config.eyeExpression !== 'mask_hero' &&
            config.eyeExpression !== 'goggles_racer' && (
              <g fill="none" stroke={hair === '#1E293B' ? '#334155' : hair} strokeWidth="3.2" strokeLinecap="round">
                <path
                  d={
                    config.eyeExpression === 'focused_scholar' || config.eyeExpression === 'flame_eyes'
                      ? 'M121 94 L141 99'
                      : 'M122 95 Q132 90 140 94'
                  }
                />
                <path
                  d={
                    config.eyeExpression === 'focused_scholar' || config.eyeExpression === 'flame_eyes'
                      ? 'M179 94 L159 99'
                      : 'M160 94 Q168 90 178 95'
                  }
                />
              </g>
            )}

          {config.eyeExpression === 'glasses_happy' && (
            <g id="exp_glasses">
              {/* Glossy eyes inside round glasses */}
              <ellipse cx="132" cy="108" rx="9" ry="10.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.4" />
              <ellipse cx="168" cy="108" rx="9" ry="10.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.4" />
              <ellipse cx="133" cy="108.5" rx="6.8" ry="8.5" fill={irisColor} />
              <ellipse cx="167" cy="108.5" rx="6.8" ry="8.5" fill={irisColor} />
              <circle cx="130.5" cy="105" r="3.2" fill="#FFFFFF" />
              <circle cx="164.5" cy="105" r="3.2" fill="#FFFFFF" />
              <circle cx="135.5" cy="112" r="1.4" fill="#FFFFFF" />
              <circle cx="169.5" cy="112" r="1.4" fill="#FFFFFF" />
              {/* Round cute scholar glasses */}
              <circle cx="132" cy="108" r="14.5" fill="#BAE6FD" fillOpacity="0.16" stroke="#1E293B" strokeWidth="2.8" />
              <circle cx="168" cy="108" r="14.5" fill="#BAE6FD" fillOpacity="0.16" stroke="#1E293B" strokeWidth="2.8" />
              <line x1="146.5" y1="108" x2="153.5" y2="108" stroke="#1E293B" strokeWidth="2.8" />
              <path d="M124 100 Q128 97 134 98" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.8" />
              <path d="M160 100 Q164 97 170 98" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.8" />
            </g>
          )}

          {config.eyeExpression === 'sparkle_joy' && (
            <g id="exp_sparkle">
              {/* Sclera + glossy iris + lower gradient sheen + dual catchlights */}
              <ellipse cx="132" cy="108" rx="10.5" ry="12" fill="#FFFFFF" />
              <ellipse cx="168" cy="108" rx="10.5" ry="12" fill="#FFFFFF" />
              <ellipse cx="133" cy="108.5" rx="8.2" ry="10.2" fill={irisColor} />
              <ellipse cx="167" cy="108.5" rx="8.2" ry="10.2" fill={irisColor} />
              <path d="M127 113 Q133 118 139 113" fill="#38BDF8" opacity="0.45" />
              <path d="M161 113 Q167 118 173 113" fill="#38BDF8" opacity="0.45" />
              <circle cx="133" cy="108.5" r="4.5" fill="#0F172A" />
              <circle cx="167" cy="108.5" r="4.5" fill="#0F172A" />
              <circle cx="129.5" cy="104" r="3.8" fill="#FFFFFF" />
              <circle cx="163.5" cy="104" r="3.8" fill="#FFFFFF" />
              <circle cx="136" cy="113" r="1.7" fill="#FFFFFF" />
              <circle cx="170" cy="113" r="1.7" fill="#FFFFFF" />
              <path d="M121 104 Q132 95 142 103" fill="none" stroke="#0F172A" strokeWidth="2.8" strokeLinecap="round" />
              <path d="M158 103 Q168 95 179 104" fill="none" stroke="#0F172A" strokeWidth="2.8" strokeLinecap="round" />
            </g>
          )}

          {config.eyeExpression === 'cool_wink' && (
            <g id="exp_wink">
              <path d="M122 109 Q132 100 142 109" stroke="#0F172A" strokeWidth="3.6" strokeLinecap="round" fill="none" />
              <ellipse cx="168" cy="108" rx="10.5" ry="12" fill="#FFFFFF" />
              <ellipse cx="167" cy="108.5" rx="8.2" ry="10.2" fill={irisColor} />
              <circle cx="167" cy="108.5" r="4.2" fill="#0F172A" />
              <circle cx="163.5" cy="104" r="3.6" fill="#FFFFFF" />
              <circle cx="170" cy="113" r="1.6" fill="#FFFFFF" />
              <path d="M158 103 Q168 95 179 104" fill="none" stroke="#0F172A" strokeWidth="2.8" strokeLinecap="round" />
            </g>
          )}

          {config.eyeExpression === 'heart_eyes' && (
            <g id="exp_heart_eyes">
              <path
                d="M132 117 C124 111 121 104 126 100 C129 98 131.5 100 132 102 C132.5 100 135 98 138 100 C143 104 140 111 132 117 Z"
                fill="#F43F5E"
                stroke="#9F1239"
                strokeWidth="1.5"
              />
              <circle cx="128" cy="104" r="2.2" fill="#FFFFFF" opacity="0.85" />
              <path
                d="M168 117 C160 111 157 104 162 100 C165 98 167.5 100 168 102 C168.5 100 171 98 174 100 C179 104 176 111 168 117 Z"
                fill="#F43F5E"
                stroke="#9F1239"
                strokeWidth="1.5"
              />
              <circle cx="164" cy="104" r="2.2" fill="#FFFFFF" opacity="0.85" />
            </g>
          )}

          {config.eyeExpression === 'star_eyes' && (
            <g id="exp_star_eyes">
              <ellipse cx="132" cy="108" rx="10.5" ry="12" fill="#FFFFFF" />
              <ellipse cx="168" cy="108" rx="10.5" ry="12" fill="#FFFFFF" />
              <ellipse cx="132" cy="108" rx="8.5" ry="10" fill="#1E3A8A" />
              <ellipse cx="168" cy="108" rx="8.5" ry="10" fill="#1E3A8A" />
              <polygon points="132,100 134,106 140,106 135,109.5 137,115 132,111.5 127,115 129,109.5 124,106 130,106" fill="#FDE047" />
              <polygon points="168,100 170,106 176,106 171,109.5 173,115 168,111.5 163,115 165,109.5 160,106 166,106" fill="#FDE047" />
              <circle cx="128" cy="103" r="2" fill="#FFFFFF" />
              <circle cx="164" cy="103" r="2" fill="#FFFFFF" />
            </g>
          )}

          {config.eyeExpression === 'surprised_cute' && (
            <g id="exp_surprised">
              <circle cx="132" cy="108" r="11" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.6" />
              <circle cx="168" cy="108" r="11" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.6" />
              <circle cx="132" cy="108" r="5.5" fill={irisColor} />
              <circle cx="168" cy="108" r="5.5" fill={irisColor} />
              <circle cx="130" cy="105.5" r="2.4" fill="#FFFFFF" />
              <circle cx="166" cy="105.5" r="2.4" fill="#FFFFFF" />
            </g>
          )}

          {config.eyeExpression === 'focused_scholar' && (
            <g id="exp_scholar">
              <ellipse cx="132" cy="109" rx="9" ry="9.5" fill="#FFFFFF" />
              <ellipse cx="168" cy="109" rx="9" ry="9.5" fill="#FFFFFF" />
              <ellipse cx="133" cy="109" rx="6.8" ry="8" fill={irisColor} />
              <ellipse cx="167" cy="109" rx="6.8" ry="8" fill={irisColor} />
              <circle cx="133" cy="109" r="3.6" fill="#0F172A" />
              <circle cx="167" cy="109" r="3.6" fill="#0F172A" />
              <circle cx="130" cy="106" r="2.8" fill="#FFFFFF" />
              <circle cx="164" cy="106" r="2.8" fill="#FFFFFF" />
            </g>
          )}

          {config.eyeExpression === 'sunglasses_boss' && (
            <g id="exp_sunglasses">
              <rect x="116" y="97" width="31" height="20" rx="6" fill="#0F172A" stroke="#FACC15" strokeWidth="2" />
              <rect x="153" y="97" width="31" height="20" rx="6" fill="#0F172A" stroke="#FACC15" strokeWidth="2" />
              <line x1="147" y1="104" x2="153" y2="104" stroke="#FACC15" strokeWidth="3" />
              <line x1="121" y1="102" x2="133" y2="112" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
              <line x1="158" y1="102" x2="170" y2="112" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            </g>
          )}

          {config.eyeExpression === 'visor_hud' && (
            <g id="exp_visor_hud">
              <path
                d="M111 97 Q150 90 189 97 L184 119 Q150 124 116 119 Z"
                fill="#0EA5E9"
                fillOpacity="0.86"
                stroke="#0F172A"
                strokeWidth="2.5"
              />
              <line x1="120" y1="104" x2="144" y2="104" stroke="#E0F2FE" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="168" cy="108" r="4.5" fill="#FEF08A" />
              <circle cx="179" cy="108" r="2.2" fill="#BAE6FD" />
            </g>
          )}

          {config.eyeExpression === 'mask_hero' && (
            <g id="exp_mask_hero">
              <path
                d="M110 99 Q130 90 150 101 Q170 90 190 99 L185 119 Q166 123 155 112 L145 112 Q134 123 115 119 Z"
                fill="#1D4ED8"
                stroke="#FACC15"
                strokeWidth="2.2"
              />
              <ellipse cx="132" cy="108" rx="8" ry="5" fill="#FFFFFF" />
              <ellipse cx="168" cy="108" rx="8" ry="5" fill="#FFFFFF" />
              <circle cx="132" cy="108" r="2.6" fill="#0F172A" />
              <circle cx="168" cy="108" r="2.6" fill="#0F172A" />
            </g>
          )}

          {config.eyeExpression === 'goggles_racer' && (
            <g id="exp_goggles_racer">
              <rect x="114" y="95" width="32" height="22" rx="8" fill="#0F172A" stroke="#F59E0B" strokeWidth="2.5" />
              <rect x="154" y="95" width="32" height="22" rx="8" fill="#0F172A" stroke="#F59E0B" strokeWidth="2.5" />
              <rect x="146" y="103" width="8" height="6" fill="#F59E0B" />
              <rect x="118" y="99" width="24" height="14" rx="5" fill="#38BDF8" opacity="0.88" />
              <rect x="158" y="99" width="24" height="14" rx="5" fill="#38BDF8" opacity="0.88" />
              <line x1="122" y1="103" x2="134" y2="103" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              <line x1="162" y1="103" x2="174" y2="103" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          {config.eyeExpression === 'flame_eyes' && (
            <g id="exp_flame_eyes">
              <ellipse cx="132" cy="108" rx="10" ry="11" fill="#7C2D12" stroke="#FACC15" strokeWidth="1.5" />
              <ellipse cx="168" cy="108" rx="10" ry="11" fill="#7C2D12" stroke="#FACC15" strokeWidth="1.5" />
              <circle cx="132" cy="108" r="5.2" fill="#F59E0B" />
              <circle cx="168" cy="108" r="5.2" fill="#F59E0B" />
              <circle cx="130" cy="105" r="2.8" fill="#FEF08A" />
              <circle cx="166" cy="105" r="2.8" fill="#FEF08A" />
            </g>
          )}
        </g>
      </g>

      {/* VOLUMETRIC 3D HAIR / HEADGEAR LAYER */}
      <g id="hair-layer">
        {config.hairStyle === 'short_neat' && (
          <g>
            <path
              d="M104 106 C100 58 200 58 196 106 C188 86 164 82 150 88 C136 82 112 86 104 106 Z"
              fill={hair}
              stroke="#0F172A"
              strokeOpacity="0.22"
              strokeWidth="1.6"
            />
            <path
              d="M104 106 C100 58 200 58 196 106 C188 86 164 82 150 88 C136 82 112 86 104 106 Z"
              fill={`url(#hairGloss_${uid})`}
            />
            <path d="M122 72 Q148 64 176 72" fill="none" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {config.hairStyle === 'undercut' && (
          <g id="hair_undercut">
            <path
              d="M106 108 C104 62 192 54 196 90 C186 78 148 76 118 92 Z"
              fill={hair}
              stroke="#0F172A"
              strokeOpacity="0.22"
              strokeWidth="1.6"
            />
            <path
              d="M120 74 Q158 48 194 72 Q170 84 132 86 Z"
              fill={hair}
              stroke="#0F172A"
              strokeOpacity="0.22"
              strokeWidth="1.6"
            />
            <path d="M132 68 Q162 56 184 68" fill="none" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {config.hairStyle === 'messy_spiky' && (
          <g>
            <path
              d="M104 102 C100 72 122 50 144 58 C154 44 178 52 178 68 C196 66 202 84 195 104 C184 86 166 84 150 92 C136 82 118 86 104 102 Z"
              fill={hair}
              stroke="#0F172A"
              strokeOpacity="0.24"
              strokeWidth="1.8"
            />
            <path
              d="M104 102 C100 72 122 50 144 58 C154 44 178 52 178 68 C196 66 202 84 195 104 C184 86 166 84 150 92 C136 82 118 86 104 102 Z"
              fill={`url(#hairGloss_${uid})`}
            />
            <path d="M124 68 Q152 56 174 68" fill="none" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {(config.hairStyle === 'ponytail' || config.hairStyle === 'ponytail_ribbon') && (
          <g id="hair_ponytail">
            <path
              d="M104 108 C100 58 200 58 196 108 C184 86 162 82 150 90 C138 82 116 86 104 108 Z"
              fill={hair}
              stroke="#0F172A"
              strokeOpacity="0.22"
              strokeWidth="1.6"
            />
            <path
              d="M104 108 C100 58 200 58 196 108 C184 86 162 82 150 90 C138 82 116 86 104 108 Z"
              fill={`url(#hairGloss_${uid})`}
            />
            <path d="M122 72 Q150 62 178 72" fill="none" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="4" strokeLinecap="round" />
            {config.hairStyle === 'ponytail_ribbon' ? (
              <g>
                {/* Cute oversized pink ribbon bow */}
                <path d="M192 86 Q178 68 188 64 Q198 70 194 84 Z" fill="#F472B6" stroke="#BE185D" strokeWidth="1.5" />
                <path d="M196 86 Q216 74 214 86 Q204 94 194 88 Z" fill="#EC4899" stroke="#BE185D" strokeWidth="1.5" />
                <circle cx="193" cy="86" r="5" fill="#FBCFE8" stroke="#BE185D" strokeWidth="1.5" />
              </g>
            ) : (
              <ellipse cx="195" cy="90" rx="7" ry="5" fill="#EF4444" stroke="#991B1B" strokeWidth="1.5" />
            )}
          </g>
        )}

        {config.hairStyle === 'twintails' && (
          <g id="hair_twintails">
            <path
              d="M104 108 C100 58 200 58 196 108 C184 88 164 84 150 90 C136 84 116 88 104 108 Z"
              fill={hair}
              stroke="#0F172A"
              strokeOpacity="0.22"
              strokeWidth="1.6"
            />
            <path
              d="M104 108 C100 58 200 58 196 108 C184 88 164 84 150 90 C136 84 116 88 104 108 Z"
              fill={`url(#hairGloss_${uid})`}
            />
            <circle cx="102" cy="102" r="6.5" fill="#EC4899" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="198" cy="102" r="6.5" fill="#EC4899" stroke="#FFFFFF" strokeWidth="1.5" />
          </g>
        )}

        {config.hairStyle === 'bob_bangs' && (
          <g id="hair_bob">
            <path
              d="M102 108 C100 58 200 58 198 108 C188 94 176 92 150 94 C124 92 112 94 102 108 Z"
              fill={hair}
              stroke="#0F172A"
              strokeOpacity="0.22"
              strokeWidth="1.6"
            />
            <path
              d="M102 108 C100 58 200 58 198 108 C188 94 176 92 150 94 C124 92 112 94 102 108 Z"
              fill={`url(#hairGloss_${uid})`}
            />
            <path d="M124 72 Q150 64 176 72" fill="none" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {config.hairStyle === 'curly_wave' && (
          <g id="hair_curly">
            <circle cx="116" cy="78" r="18" fill={hair} />
            <circle cx="138" cy="68" r="20" fill={hair} />
            <circle cx="162" cy="68" r="20" fill={hair} />
            <circle cx="184" cy="78" r="18" fill={hair} />
            <circle cx="104" cy="96" r="13" fill={hair} />
            <circle cx="196" cy="96" r="13" fill={hair} />
            <path d="M125 62 Q150 53 175 62" fill="none" stroke="#FFFFFF" strokeOpacity="0.26" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {/* Mũ Lưỡi Trai Ngôi Sao */}
        {config.hairStyle === 'hat_cap_red' && (
          <g id="hat_cap_red">
            <path
              d="M104 106 C100 58 200 58 196 106 C182 88 118 88 104 106 Z"
              fill={hair}
            />
            <path
              d="M104 88 C104 54 196 54 196 88 Z"
              fill="#EF4444"
              stroke="#991B1B"
              strokeWidth="2"
            />
            <path d="M106 86 Q155 76 206 90 Q168 96 106 88 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
            <circle cx="150" cy="70" r="10" fill="#FACC15" stroke="#991B1B" strokeWidth="1.5" />
            <polygon points="150,63 152,68 157,68 153,71 154.5,76 150,73 145.5,76 147,71 143,68 148,68" fill="#DC2626" />
          </g>
        )}

        {/* Tai Nghe Mèo Game Thủ (from concept board!) */}
        {config.hairStyle === 'headphones_cat' && (
          <g id="headphones_cat">
            <path
              d="M104 106 C100 58 200 58 196 106 C184 86 116 86 104 106 Z"
              fill={hair}
            />
            <path d="M122 72 Q150 64 178 72" fill="none" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="4" strokeLinecap="round" />
            {/* Cat ear pods */}
            <polygon points="108,76 114,50 132,68" fill="#EC4899" stroke="#7C3AED" strokeWidth="2.5" strokeLinejoin="round" />
            <polygon points="113,72 117,57 127,68" fill="#FBCFE8" />
            <polygon points="192,76 186,50 168,68" fill="#EC4899" stroke="#7C3AED" strokeWidth="2.5" strokeLinejoin="round" />
            <polygon points="187,72 183,57 173,68" fill="#FBCFE8" />
            {/* Headband */}
            <path d="M102 104 C102 58 198 58 198 104" fill="none" stroke="#7C3AED" strokeWidth="7" strokeLinecap="round" />
            <path d="M118 70 Q150 60 182 70" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
            {/* Glowing side earcups */}
            <rect x="93" y="96" width="14" height="28" rx="7" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
            <rect x="193" y="96" width="14" height="28" rx="7" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
            <circle cx="100" cy="110" r="4" fill="#F472B6" />
            <circle cx="200" cy="110" r="4" fill="#F472B6" />
          </g>
        )}

        {/* Vương Miện Công Chúa */}
        {config.hairStyle === 'crown_princess' && (
          <g id="crown_princess">
            <path
              d="M102 108 C100 58 200 58 198 108 C184 86 116 86 102 108 Z"
              fill={hair}
            />
            <path d="M122 72 Q150 64 178 72" fill="none" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="4" strokeLinecap="round" />
            <polygon
              points="126,68 124,44 139,55 150,38 161,55 176,44 174,68"
              fill={`url(#goldMetal_${uid})`}
              stroke="#B45309"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="150" cy="57" r="4.5" fill="#EC4899" stroke="#FFFFFF" strokeWidth="1" />
            <circle cx="135" cy="60" r="3" fill="#38BDF8" />
            <circle cx="165" cy="60" r="3" fill="#38BDF8" />
          </g>
        )}

        {/* Bờm Cánh Tiên Lung Linh */}
        {config.hairStyle === 'tiara_fairy' && (
          <g id="tiara_fairy">
            <path
              d="M102 108 C100 58 200 58 198 108 C184 86 116 86 102 108 Z"
              fill={hair}
            />
            <path d="M106 88 C114 60 186 60 194 88" fill="none" stroke="#F472B6" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M114 72 Q96 48 118 52 Q126 62 122 70 Z" fill="#A5F3FC" stroke="#38BDF8" strokeWidth="1.5" />
            <path d="M186 72 Q204 48 182 52 Q174 62 178 70 Z" fill="#A5F3FC" stroke="#38BDF8" strokeWidth="1.5" />
            <polygon points="150,52 153,60 161,60 155,65 157,72 150,67 143,72 145,65 139,60 147,60" fill="#FDE047" stroke="#D97706" strokeWidth="1" />
          </g>
        )}

        {/* Nón Lá Quê Hương */}
        {config.hairStyle === 'hat_nonla' && (
          <g id="hat_nonla">
            <path d="M104 108 C102 64 198 64 196 108 C184 88 116 88 104 108 Z" fill={hair} />
            <path d="M112 96 Q116 124 134 142" fill="none" stroke="#DC2626" strokeWidth="2.5" />
            <path d="M188 96 Q184 124 166 142" fill="none" stroke="#DC2626" strokeWidth="2.5" />
            <polygon
              points="76,92 150,36 224,92"
              fill="#FDE68A"
              stroke="#B45309"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <ellipse cx="150" cy="92" rx="74" ry="8" fill="#FCD34D" stroke="#B45309" strokeWidth="2" />
            <path d="M98 76 Q150 82 202 76" fill="none" stroke="#D97706" strokeWidth="1.4" opacity="0.65" />
            <path d="M118 60 Q150 65 182 60" fill="none" stroke="#D97706" strokeWidth="1.4" opacity="0.65" />
          </g>
        )}

        {/* Mũ Thuyền Trưởng Hải Tặc */}
        {config.hairStyle === 'hat_pirate' && (
          <g id="hat_pirate">
            <path d="M106 104 C104 68 196 68 194 104 C182 90 118 90 106 104 Z" fill={hair} />
            <path
              d="M94 86 Q150 96 206 86 L192 52 Q150 40 108 52 Z"
              fill="#1E293B"
              stroke="#FACC15"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <circle cx="150" cy="67" r="9" fill="#FACC15" />
            <polygon points="150,60 152,65 157,65 153,68 154.5,73 150,70 145.5,73 147,68 143,65 148,65" fill="#1E293B" />
          </g>
        )}

        {/* Mũ Giáp Siêu Anh Hùng */}
        {config.hairStyle === 'helmet_hero' && (
          <g id="helmet_hero">
            <path
              d="M102 106 C100 50 200 50 198 106 L189 106 C182 84 118 84 111 106 Z"
              fill="#DC2626"
              stroke="#FACC15"
              strokeWidth="2.5"
            />
            <path d="M133 58 L150 90 L167 58 Z" fill={`url(#goldMetal_${uid})`} />
            <polygon points="150,62 153,69 160,69 154,73 156,80 150,76 144,80 146,73 140,69 147,69" fill="#DC2626" />
            <rect x="98" y="96" width="10" height="24" rx="5" fill="#FACC15" stroke="#991B1B" strokeWidth="1.5" />
            <rect x="192" y="96" width="10" height="24" rx="5" fill="#FACC15" stroke="#991B1B" strokeWidth="1.5" />
            <path d="M116 66 Q146 56 172 64" fill="none" stroke="#FFFFFF" strokeOpacity="0.32" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        )}

        {/* Mũ Chiến Binh Biệt Đội */}
        {config.hairStyle === 'helmet_ranger' && (
          <g id="helmet_ranger">
            <path
              d="M101 110 C99 50 201 50 199 110 L189 110 C184 86 168 84 150 84 C132 84 116 86 111 110 Z"
              fill={hair === '#1E293B' ? '#2563EB' : hair}
              stroke="#FFFFFF"
              strokeWidth="2.2"
            />
            <path d="M116 86 Q150 75 184 86 L180 96 Q150 88 120 96 Z" fill="#0F172A" />
            <polygon points="150,55 157,70 150,78 143,70" fill="#FDE047" stroke="#B45309" strokeWidth="1.2" />
            <circle cx="102" cy="106" r="5.5" fill="#FACC15" />
            <circle cx="198" cy="106" r="5.5" fill="#FACC15" />
          </g>
        )}

        {/* Khăn Trùm Ninja Bóng Đêm */}
        {config.hairStyle === 'hood_ninja' && (
          <g id="hood_ninja">
            <path
              d="M102 112 C100 56 200 56 198 112 C188 86 112 86 102 112 Z"
              fill="#0F172A"
            />
            <path d="M107 119 Q150 113 193 119 L186 150 Q150 157 114 150 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="1.8" />
            <rect x="106" y="76" width="88" height="10" rx="5" fill="#DC2626" />
            <rect x="138" y="73" width="24" height="15" rx="4" fill={`url(#silverMetal_${uid})`} stroke="#334155" strokeWidth="1.5" />
            <path d="M192 81 L218 70 L213 82 L220 90 L192 86 Z" fill="#DC2626" />
          </g>
        )}

        {/* Mũ Bảo Hiểm Tay Đua */}
        {config.hairStyle === 'helmet_racer' && (
          <g id="helmet_racer">
            <path
              d="M102 108 C100 52 200 52 198 108 L188 104 C178 86 122 86 112 104 Z"
              fill="#F8FAFC"
              stroke="#0284C7"
              strokeWidth="2.5"
            />
            <rect x="144" y="57" width="12" height="30" rx="4" fill="#EF4444" />
            <path d="M110 89 L190 89" stroke="#0284C7" strokeWidth="5.5" strokeLinecap="round" />
            <rect x="97" y="98" width="9" height="18" rx="4" fill="#0F172A" />
            <rect x="194" y="98" width="9" height="18" rx="4" fill="#0F172A" />
          </g>
        )}

        {/* Mũ Pháp Sư Chóp Nhọn */}
        {config.hairStyle === 'hat_wizard' && (
          <g id="hat_wizard">
            <path d="M104 102 C102 68 198 68 196 102 C184 90 116 90 104 102 Z" fill={hair} />
            <ellipse cx="150" cy="79" rx="58" ry="13" fill="#4C1D95" stroke="#F59E0B" strokeWidth="2.5" />
            <path d="M118 77 L148 14 L180 77 Z" fill="#5B21B6" stroke="#F59E0B" strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M124 68 Q150 75 176 68" stroke="#F59E0B" strokeWidth="5" fill="none" />
            <polygon points="150,40 153,47 160,47 154,51 156,58 150,54 144,58 146,51 140,47 147,47" fill="#FDE047" />
          </g>
        )}

        {/* Mũ Phi Hành Gia Vòm Kính */}
        {config.hairStyle === 'helmet_astro' && (
          <g id="helmet_astro">
            <path d="M110 98 C110 66 190 66 190 98 C178 88 122 88 110 98 Z" fill={hair} opacity="0.88" />
            <circle cx="150" cy="107" r="52" fill="#BAE6FD" fillOpacity="0.22" stroke="#E2E8F0" strokeWidth="5" />
            <path d="M112 76 Q130 60 156 62" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" fill="none" opacity="0.75" />
            <rect x="112" y="146" width="76" height="11" rx="5.5" fill={`url(#silverMetal_${uid})`} stroke="#64748B" strokeWidth="1.5" />
            <circle cx="150" cy="151.5" r="3.5" fill="#0284C7" />
          </g>
        )}

        {/* Kính bảo hộ gắn trán khi mặc áo Blouse Nhà Khoa Học */}
        {config.outfitId === 'outfit_lab' && (
          <g id="lab_goggles">
            <rect x="108" y="72" width="84" height="8" rx="4" fill="#0F172A" />
            <rect x="118" y="65" width="26" height="18" rx="6" fill="#7DD3FC" stroke="#0284C7" strokeWidth="2.5" />
            <rect x="156" y="65" width="26" height="18" rx="6" fill="#7DD3FC" stroke="#0284C7" strokeWidth="2.5" />
            <line x1="122" y1="70" x2="132" y2="70" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <line x1="160" y1="70" x2="170" y2="70" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}
      </g>
    </>
  );
};
