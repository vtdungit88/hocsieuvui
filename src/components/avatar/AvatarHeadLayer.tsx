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

  const irisTop =
    config.gender === 'girl' ? '#78350F' : config.gender === 'scholar' ? '#1E293B' : '#451A03';
  const irisBot =
    config.gender === 'girl' ? '#D97706' : config.gender === 'scholar' ? '#38BDF8' : '#B45309';

  const headOutline = '#9A3412';

  return (
    <>
      {/* BACK HAIR SILHOUETTE (behind ears & neck for rich 3D depth) */}
      {showBackHair && (
        <g id="back-hair-layer" filter={`url(#softAO_${uid})`}>
          {config.hairStyle === 'ponytail' && (
            <g>
              <path
                d="M214 78 Q266 94 260 162 Q242 172 226 146 Q218 122 214 102 Z"
                fill={hair}
              />
              <path
                d="M214 78 Q266 94 260 162 Q242 172 226 146 Q218 122 214 102 Z"
                fill={`url(#hairGloss_${uid})`}
              />
              <path d="M228 96 Q246 122 246 150" stroke="#FFFFFF" strokeOpacity="0.22" strokeWidth="5" strokeLinecap="round" fill="none" />
            </g>
          )}

          {config.hairStyle === 'ponytail_ribbon' && (
            <g>
              <path
                d="M212 74 Q268 88 264 168 Q246 184 228 164 Q220 140 214 108 Z"
                fill={hair}
              />
              <path
                d="M212 74 Q268 88 264 168 Q246 184 228 164 Q220 140 214 108 Z"
                fill={`url(#hairGloss_${uid})`}
              />
              <path d="M228 95 Q250 124 249 156" stroke="#FFFFFF" strokeOpacity="0.24" strokeWidth="5.5" strokeLinecap="round" fill="none" />
            </g>
          )}

          {config.hairStyle === 'twintails' && (
            <g>
              <path
                d="M96 94 Q54 122 72 178 Q90 176 102 128 Z"
                fill={hair}
              />
              <path
                d="M96 94 Q54 122 72 178 Q90 176 102 128 Z"
                fill={`url(#hairGloss_${uid})`}
              />
              <path
                d="M224 94 Q266 122 248 178 Q230 176 218 128 Z"
                fill={hair}
              />
              <path
                d="M224 94 Q266 122 248 178 Q230 176 218 128 Z"
                fill={`url(#hairGloss_${uid})`}
              />
            </g>
          )}

          {(config.hairStyle === 'bob_bangs' ||
            config.hairStyle === 'crown_princess' ||
            config.hairStyle === 'tiara_fairy' ||
            config.hairStyle === 'hat_nonla') && (
            <g>
              <path
                d="M92 98 Q80 156 108 174 Q160 182 212 174 Q240 156 228 98 Z"
                fill={hair}
              />
              <path
                d="M92 98 Q80 156 108 174 Q160 182 212 174 Q240 156 228 98 Z"
                fill={`url(#hairGloss_${uid})`}
              />
              <path d="M98 136 Q95 158 110 166" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M222 136 Q225 158 210 166" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="4" strokeLinecap="round" fill="none" />
            </g>
          )}

          {config.hairStyle === 'curly_wave' && (
            <g fill={hair}>
              <circle cx="94" cy="116" r="21" />
              <circle cx="226" cy="116" r="21" />
              <circle cx="102" cy="142" r="17" />
              <circle cx="218" cy="142" r="17" />
              <circle cx="94" cy="116" r="21" fill={`url(#hairGloss_${uid})`} />
              <circle cx="226" cy="116" r="21" fill={`url(#hairGloss_${uid})`} />
            </g>
          )}
        </g>
      )}

      {/* GIANT EXPRESSIVE PIXAR-CHIBI HEAD */}
      <g id="head-layer">
        {/* Soft Neck & Chin Occlusion Shadow */}
        <rect x="148" y="152" width="24" height="26" rx="10" fill={skin} />
        <ellipse cx="160" cy="161" rx="16" ry="7" fill="#7C2D12" opacity="0.28" />

        {/* Cute Plump Ears with Inner Ear Warmth */}
        <g>
          <circle cx="92" cy="114" r="14.5" fill={skin} />
          <circle cx="92" cy="114" r="14.5" fill={`url(#skinShading_${uid})`} />
          <circle cx="92" cy="115" r="8" fill="#FB7185" opacity="0.24" />
          <path d="M89 109 Q95 114 89 120" fill="none" stroke={headOutline} strokeOpacity="0.28" strokeWidth="2.4" strokeLinecap="round" />

          <circle cx="228" cy="114" r="14.5" fill={skin} />
          <circle cx="228" cy="114" r="14.5" fill={`url(#skinShading_${uid})`} />
          <circle cx="228" cy="115" r="8" fill="#FB7185" opacity="0.24" />
          <path d="M231 109 Q225 114 231 120" fill="none" stroke={headOutline} strokeOpacity="0.28" strokeWidth="2.4" strokeLinecap="round" />
        </g>

        {/* Squishy Pear-Cheek 3D Chibi Face Silhouette (Zero hard black borders!) */}
        <path
          d="M160 44 C205 44 227 74 226 113 C225 148 197 166 160 166 C123 166 95 148 94 113 C93 74 115 44 160 44 Z"
          fill={skin}
        />
        <path
          d="M160 44 C205 44 227 74 226 113 C225 148 197 166 160 166 C123 166 95 148 94 113 C93 74 115 44 160 44 Z"
          fill={`url(#skinShading_${uid})`}
        />

        {/* Soft Cast Shadow from Bangs onto Forehead */}
        {!isMaskedHeadgear && (
          <path
            d="M104 72 Q160 90 216 72 Q194 56 160 56 Q126 56 104 72 Z"
            fill="#7C2D12"
            opacity="0.1"
          />
        )}

        {/* Airbrushed Glowing Rosy Cheeks */}
        <ellipse cx="117" cy="128" rx="14" ry="8.5" fill={`url(#blush_${uid})`} />
        <ellipse cx="203" cy="128" rx="14" ry="8.5" fill={`url(#blush_${uid})`} />

        {/* Cute Soft 3D Button Nose */}
        <ellipse cx="160" cy="122" rx="4.2" ry="2.8" fill="#C2410C" opacity="0.34" />
        <ellipse cx="158.8" cy="120.8" rx="1.6" ry="1" fill="#FFFFFF" opacity="0.7" />

        {/* Expressive 3D Mouth */}
        {!isMaskedHeadgear && (
          <g>
            {config.eyeExpression === 'surprised_cute' ? (
              <g>
                <ellipse cx="160" cy="139" rx="7" ry="8.5" fill="#BE123C" />
                <ellipse cx="160" cy="143" rx="4.5" ry="3.2" fill="#FB7185" />
              </g>
            ) : config.eyeExpression === 'focused_scholar' ? (
              <path
                d="M149 138 Q160 142 171 138"
                stroke="#9F1239"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            ) : (
              <g>
                <path
                  d="M145 133 Q160 151 175 133 Q160 137 145 133 Z"
                  fill="#BE123C"
                />
                {/* Cute white upper tooth rim */}
                <path d="M148 134.5 Q160 137.5 172 134.5" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
                {/* Coral tongue */}
                <ellipse cx="160" cy="141.5" rx="7.5" ry="3.4" fill="#FB7185" />
              </g>
            )}
          </g>
        )}

        {/* GIANT SOULFUL PIXAR/ANIME EYES */}
        <g className={animated ? 'studio-blink' : ''}>
          {/* Sculpted Expressive Eyebrows */}
          {config.eyeExpression !== 'sunglasses_boss' &&
            config.eyeExpression !== 'visor_hud' &&
            config.eyeExpression !== 'mask_hero' &&
            config.eyeExpression !== 'goggles_racer' && (
              <g fill="none" stroke={hair === '#1E293B' ? '#334155' : hair} strokeWidth="4.2" strokeLinecap="round">
                <path
                  d={
                    config.eyeExpression === 'focused_scholar' || config.eyeExpression === 'flame_eyes'
                      ? 'M119 88 L145 95'
                      : 'M120 90 Q133 83 145 89'
                  }
                />
                <path
                  d={
                    config.eyeExpression === 'focused_scholar' || config.eyeExpression === 'flame_eyes'
                      ? 'M201 88 L175 95'
                      : 'M175 89 Q187 83 200 90'
                  }
                />
              </g>
            )}

          {config.eyeExpression === 'glasses_happy' && (
            <g id="exp_glasses">
              <ellipse cx="134" cy="111" rx="12" ry="13.5" fill="#FFFFFF" />
              <ellipse cx="186" cy="111" rx="12" ry="13.5" fill="#FFFFFF" />
              <ellipse cx="135" cy="111.5" rx="9.5" ry="11" fill={irisTop} />
              <ellipse cx="185" cy="111.5" rx="9.5" ry="11" fill={irisTop} />
              <ellipse cx="135" cy="115" rx="7.5" ry="5" fill={irisBot} opacity="0.55" />
              <ellipse cx="185" cy="115" rx="7.5" ry="5" fill={irisBot} opacity="0.55" />
              <circle cx="135" cy="111.5" r="5" fill="#0F172A" />
              <circle cx="185" cy="111.5" r="5" fill="#0F172A" />
              <circle cx="130.5" cy="106.5" r="4.2" fill="#FFFFFF" />
              <circle cx="180.5" cy="106.5" r="4.2" fill="#FFFFFF" />
              <circle cx="139" cy="116" r="2" fill="#FFFFFF" />
              <circle cx="189" cy="116" r="2" fill="#FFFFFF" />
              <path d="M121 105 Q134 94 146 104" fill="none" stroke="#1E293B" strokeWidth="3.4" strokeLinecap="round" />
              <path d="M174 104 Q186 94 199 105" fill="none" stroke="#1E293B" strokeWidth="3.4" strokeLinecap="round" />
              {/* Cute round scholar glasses */}
              <circle cx="134" cy="111" r="18.5" fill="#BAE6FD" fillOpacity="0.16" stroke="#1E293B" strokeWidth="3.2" />
              <circle cx="186" cy="111" r="18.5" fill="#BAE6FD" fillOpacity="0.16" stroke="#1E293B" strokeWidth="3.2" />
              <line x1="152.5" y1="110" x2="167.5" y2="110" stroke="#1E293B" strokeWidth="3.2" />
              <path d="M123 101 Q129 97 137 99" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.82" />
              <path d="M175 101 Q181 97 189 99" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.82" />
            </g>
          )}

          {config.eyeExpression === 'sparkle_joy' && (
            <g id="exp_sparkle">
              <ellipse cx="134" cy="111" rx="13.5" ry="15" fill="#FFFFFF" />
              <ellipse cx="186" cy="111" rx="13.5" ry="15" fill="#FFFFFF" />
              <ellipse cx="135" cy="111.5" rx="10.8" ry="12.8" fill={irisTop} />
              <ellipse cx="185" cy="111.5" rx="10.8" ry="12.8" fill={irisTop} />
              <ellipse cx="135" cy="116" rx="8.5" ry="5.5" fill={irisBot} opacity="0.6" />
              <ellipse cx="185" cy="116" rx="8.5" ry="5.5" fill={irisBot} opacity="0.6" />
              <circle cx="135" cy="111" r="5.6" fill="#0F172A" />
              <circle cx="185" cy="111" r="5.6" fill="#0F172A" />
              <circle cx="130" cy="105" r="4.8" fill="#FFFFFF" />
              <circle cx="180" cy="105" r="4.8" fill="#FFFFFF" />
              <circle cx="139" cy="117" r="2.1" fill="#FFFFFF" />
              <circle cx="189" cy="117" r="2.1" fill="#FFFFFF" />
              <path d="M119 106 Q134 92 148 104" fill="none" stroke="#0F172A" strokeWidth="3.6" strokeLinecap="round" />
              <path d="M172 104 Q186 92 201 106" fill="none" stroke="#0F172A" strokeWidth="3.6" strokeLinecap="round" />
            </g>
          )}

          {config.eyeExpression === 'cool_wink' && (
            <g id="exp_wink">
              <path d="M121 112 Q134 100 147 112" stroke="#1E293B" strokeWidth="4.4" strokeLinecap="round" fill="none" />
              <ellipse cx="186" cy="111" rx="13.5" ry="15" fill="#FFFFFF" />
              <ellipse cx="185" cy="111.5" rx="10.8" ry="12.8" fill={irisTop} />
              <ellipse cx="185" cy="116" rx="8.5" ry="5.5" fill={irisBot} opacity="0.6" />
              <circle cx="185" cy="111" r="5.6" fill="#0F172A" />
              <circle cx="180" cy="105" r="4.8" fill="#FFFFFF" />
              <circle cx="189" cy="117" r="2.1" fill="#FFFFFF" />
              <path d="M172 104 Q186 92 201 106" fill="none" stroke="#0F172A" strokeWidth="3.6" strokeLinecap="round" />
            </g>
          )}

          {config.eyeExpression === 'heart_eyes' && (
            <g id="exp_heart_eyes">
              <path
                d="M134 123 C122 114 118 104 125 99 C129 96 132.5 99 134 102 C135.5 99 139 96 143 99 C150 104 146 114 134 123 Z"
                fill="#F43F5E"
              />
              <circle cx="128" cy="105" r="3" fill="#FFFFFF" opacity="0.88" />
              <path
                d="M186 123 C174 114 170 104 177 99 C181 96 184.5 99 186 102 C187.5 99 191 96 195 99 C202 104 198 114 186 123 Z"
                fill="#F43F5E"
              />
              <circle cx="180" cy="105" r="3" fill="#FFFFFF" opacity="0.88" />
            </g>
          )}

          {config.eyeExpression === 'star_eyes' && (
            <g id="exp_star_eyes">
              <ellipse cx="134" cy="111" rx="13.5" ry="15" fill="#FFFFFF" />
              <ellipse cx="186" cy="111" rx="13.5" ry="15" fill="#FFFFFF" />
              <ellipse cx="134" cy="111" rx="10.8" ry="12.5" fill="#1E3A8A" />
              <ellipse cx="186" cy="111" rx="10.8" ry="12.5" fill="#1E3A8A" />
              <polygon points="134,100 137,108 145,108 139,113 141,120 134,116 127,120 129,113 123,108 131,108" fill="#FDE047" />
              <polygon points="186,100 189,108 197,108 191,113 193,120 186,116 179,120 181,113 175,108 183,108" fill="#FDE047" />
              <circle cx="129" cy="104" r="2.6" fill="#FFFFFF" />
              <circle cx="181" cy="104" r="2.6" fill="#FFFFFF" />
            </g>
          )}

          {config.eyeExpression === 'surprised_cute' && (
            <g id="exp_surprised">
              <circle cx="134" cy="111" r="14" fill="#FFFFFF" />
              <circle cx="186" cy="111" r="14" fill="#FFFFFF" />
              <circle cx="134" cy="111" r="7.5" fill={irisTop} />
              <circle cx="186" cy="111" r="7.5" fill={irisTop} />
              <circle cx="134" cy="111" r="4" fill="#0F172A" />
              <circle cx="186" cy="111" r="4" fill="#0F172A" />
              <circle cx="131" cy="107" r="3" fill="#FFFFFF" />
              <circle cx="183" cy="107" r="3" fill="#FFFFFF" />
            </g>
          )}

          {config.eyeExpression === 'focused_scholar' && (
            <g id="exp_focused">
              <ellipse cx="134" cy="111" rx="13" ry="11.5" fill="#FFFFFF" />
              <ellipse cx="186" cy="111" rx="13" ry="11.5" fill="#FFFFFF" />
              <ellipse cx="134" cy="111" rx="9" ry="9" fill={irisTop} />
              <ellipse cx="186" cy="111" rx="9" ry="9" fill={irisTop} />
              <circle cx="134" cy="111" r="4.5" fill="#0F172A" />
              <circle cx="186" cy="111" r="4.5" fill="#0F172A" />
              <circle cx="130.5" cy="107" r="3.4" fill="#FFFFFF" />
              <circle cx="182.5" cy="107" r="3.4" fill="#FFFFFF" />
              <path d="M119 101 L147 104" stroke="#0F172A" strokeWidth="3.2" strokeLinecap="round" />
              <path d="M201 101 L173 104" stroke="#0F172A" strokeWidth="3.2" strokeLinecap="round" />
            </g>
          )}

          {config.eyeExpression === 'sunglasses_boss' && (
            <g id="exp_sunglasses" filter={`url(#softAO_${uid})`}>
              <rect x="111" y="96" width="44" height="27" rx="9" fill="#0F172A" />
              <rect x="165" y="96" width="44" height="27" rx="9" fill="#0F172A" />
              <rect x="152" y="102" width="16" height="6" rx="3" fill="#0F172A" />
              <path d="M119 102 L134 102 L123 117 Z" fill="#FFFFFF" opacity="0.28" />
              <path d="M173 102 L188 102 L177 117 Z" fill="#FFFFFF" opacity="0.28" />
            </g>
          )}

          {config.eyeExpression === 'visor_hud' && (
            <g id="exp_visor" filter={`url(#glowEffect_${uid})`}>
              <path d="M110 96 L210 96 Q216 112 204 124 L170 124 L160 116 L150 124 L116 124 Q104 112 110 96 Z" fill="#06B6D4" fillOpacity="0.88" />
              <line x1="122" y1="106" x2="146" y2="106" stroke="#E0F2FE" strokeWidth="3" strokeLinecap="round" />
              <circle cx="188" cy="110" r="4.5" fill="#FDE047" />
              <line x1="176" y1="110" x2="200" y2="110" stroke="#E0F2FE" strokeWidth="2" />
            </g>
          )}

          {config.eyeExpression === 'mask_hero' && (
            <g id="exp_mask_hero">
              <path d="M107 95 Q134 89 160 99 Q186 89 213 95 Q217 114 205 123 Q182 126 168 117 L160 112 L152 117 Q138 126 115 123 Q103 114 107 95 Z" fill="#DC2626" />
              <path d="M122 104 Q134 100 146 109 Q134 117 122 111 Z" fill="#FFFFFF" />
              <path d="M198 104 Q186 100 174 109 Q186 117 198 111 Z" fill="#FFFFFF" />
            </g>
          )}

          {config.eyeExpression === 'goggles_racer' && (
            <g id="exp_goggles_racer" filter={`url(#softAO_${uid})`}>
              <rect x="97" y="102" width="126" height="12" rx="4" fill="#1E293B" />
              <rect x="110" y="95" width="44" height="28" rx="12" fill="#38BDF8" fillOpacity="0.85" stroke="#E2E8F0" strokeWidth="3" />
              <rect x="166" y="95" width="44" height="28" rx="12" fill="#38BDF8" fillOpacity="0.85" stroke="#E2E8F0" strokeWidth="3" />
              <line x1="154" y1="108" x2="166" y2="108" stroke="#E2E8F0" strokeWidth="4" />
              <path d="M119 101 L133 101 L122 115 Z" fill="#FFFFFF" opacity="0.52" />
              <path d="M175 101 L189 101 L178 115 Z" fill="#FFFFFF" opacity="0.52" />
            </g>
          )}

          {config.eyeExpression === 'flame_eyes' && (
            <g id="exp_flame_eyes" filter={`url(#glowEffect_${uid})`}>
              <ellipse cx="134" cy="111" rx="13" ry="13.5" fill="#FDE047" />
              <ellipse cx="186" cy="111" rx="13" ry="13.5" fill="#FDE047" />
              <circle cx="134" cy="111" r="7.5" fill="#DC2626" />
              <circle cx="186" cy="111" r="7.5" fill="#DC2626" />
              <circle cx="130.5" cy="107" r="3" fill="#FFFFFF" />
              <circle cx="182.5" cy="107" r="3" fill="#FFFFFF" />
            </g>
          )}
        </g>

        {/* SCULPTED VOLUMETRIC 3D HAIR & HEADGEAR (20 styles, ZERO harsh ink wireframe!) */}
        <g id="hair-layer" filter={`url(#softAO_${uid})`}>
          {config.hairStyle === 'short_neat' && (
            <g>
              <path
                d="M92 103 C88 55 126 30 160 30 C196 30 232 55 228 103 C218 82 198 76 179 86 C168 74 148 76 135 88 C118 76 100 84 92 103 Z"
                fill={hair}
              />
              <path
                d="M92 103 C88 55 126 30 160 30 C196 30 232 55 228 103 C218 82 198 76 179 86 C168 74 148 76 135 88 C118 76 100 84 92 103 Z"
                fill={`url(#hairGloss_${uid})`}
              />
              <path d="M118 52 Q160 39 202 52" stroke="#FFFFFF" strokeOpacity="0.32" strokeWidth="6" strokeLinecap="round" fill="none" />
            </g>
          )}

          {config.hairStyle === 'undercut' && (
            <g>
              <path
                d="M94 98 C90 50 128 24 166 24 C205 24 233 50 225 96 C214 75 190 70 162 82 C136 69 110 74 94 98 Z"
                fill={hair}
              />
              <path d="M128 32 Q166 10 202 36 Q180 56 146 66 Q126 52 128 32 Z" fill={hair} />
              <path d="M128 32 Q166 10 202 36 Q180 56 146 66 Q126 52 128 32 Z" fill={`url(#hairGloss_${uid})`} />
              <path d="M138 35 Q168 24 192 38" stroke="#FFFFFF" strokeOpacity="0.34" strokeWidth="5.5" strokeLinecap="round" fill="none" />
            </g>
          )}

          {config.hairStyle === 'messy_spiky' && (
            <g>
              {/* Sculpted curly-spiky chibi locks inspired by reference Boy */}
              <path
                d="M91 100 Q84 72 104 54 Q98 30 130 34 Q148 12 174 28 Q206 16 212 46 Q236 64 226 100 Q212 80 194 86 Q178 66 160 85 Q142 66 124 85 Q106 78 91 100 Z"
                fill={hair}
              />
              <path
                d="M91 100 Q84 72 104 54 Q98 30 130 34 Q148 12 174 28 Q206 16 212 46 Q236 64 226 100 Q212 80 194 86 Q178 66 160 85 Q142 66 124 85 Q106 78 91 100 Z"
                fill={`url(#hairGloss_${uid})`}
              />
              <path d="M118 46 Q156 26 198 46" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="5.5" strokeLinecap="round" fill="none" />
            </g>
          )}

          {config.hairStyle === 'ponytail' && (
            <g>
              <circle cx="212" cy="70" r="10" fill="#FACC15" />
              <path
                d="M92 102 C88 54 126 30 160 30 C196 30 232 54 228 102 C214 82 192 78 160 86 C128 78 106 82 92 102 Z"
                fill={hair}
              />
              <path d="M92 102 C88 54 126 30 160 30 C196 30 232 54 228 102 C214 82 192 78 160 86 C128 78 106 82 92 102 Z" fill={`url(#hairGloss_${uid})`} />
              <path d="M120 48 Q160 36 200 48" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="5.5" strokeLinecap="round" fill="none" />
            </g>
          )}

          {config.hairStyle === 'ponytail_ribbon' && (
            <g>
              <path
                d="M92 102 C88 54 126 30 160 30 C196 30 232 54 228 102 C214 82 192 78 160 86 C128 78 106 82 92 102 Z"
                fill={hair}
              />
              <path d="M92 102 C88 54 126 30 160 30 C196 30 232 54 228 102 C214 82 192 78 160 86 C128 78 106 82 92 102 Z" fill={`url(#hairGloss_${uid})`} />
              <path d="M120 48 Q160 36 200 48" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="5.5" strokeLinecap="round" fill="none" />
              {/* Glossy pink satin bow matching reference Girl */}
              <g transform="translate(202 58) rotate(20)">
                <path d="M0 0 C-18 -16 -24 6 -4 6 Z" fill="#EC4899" />
                <path d="M0 0 C18 -16 24 6 4 6 Z" fill="#F472B6" />
                <circle cx="0" cy="3" r="6" fill="#BE185D" />
              </g>
            </g>
          )}

          {config.hairStyle === 'twintails' && (
            <g>
              <circle cx="98" cy="96" r="9" fill="#F43F5E" />
              <circle cx="222" cy="96" r="9" fill="#F43F5E" />
              <path
                d="M92 102 C88 54 126 30 160 30 C196 30 232 54 228 102 C214 80 184 78 160 85 C136 78 106 80 92 102 Z"
                fill={hair}
              />
              <path d="M92 102 C88 54 126 30 160 30 C196 30 232 54 228 102 C214 80 184 78 160 85 C136 78 106 80 92 102 Z" fill={`url(#hairGloss_${uid})`} />
              <path d="M120 48 Q160 36 200 48" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="5.5" strokeLinecap="round" fill="none" />
            </g>
          )}

          {config.hairStyle === 'bob_bangs' && (
            <g>
              <path
                d="M90 106 C86 52 126 28 160 28 C196 28 234 52 230 106 L220 106 Q204 82 184 88 Q160 80 136 88 Q116 82 100 106 Z"
                fill={hair}
              />
              <path d="M90 106 C86 52 126 28 160 28 C196 28 234 52 230 106 L220 106 Q204 82 184 88 Q160 80 136 88 Q116 82 100 106 Z" fill={`url(#hairGloss_${uid})`} />
              <path d="M118 48 Q160 36 202 48" stroke="#FFFFFF" strokeOpacity="0.32" strokeWidth="6" strokeLinecap="round" fill="none" />
            </g>
          )}

          {config.hairStyle === 'curly_wave' && (
            <g>
              <path
                d="M90 98 C86 50 126 26 160 26 C196 26 234 50 230 98 Q210 78 186 84 Q160 72 134 84 Q110 78 90 98 Z"
                fill={hair}
              />
              <path d="M90 98 C86 50 126 26 160 26 C196 26 234 50 230 98 Q210 78 186 84 Q160 72 134 84 Q110 78 90 98 Z" fill={`url(#hairGloss_${uid})`} />
              <path d="M120 46 Q160 32 200 46" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="5.5" strokeLinecap="round" fill="none" />
            </g>
          )}

          {config.hairStyle === 'hat_cap_red' && (
            <g>
              <path d="M94 98 C98 76 122 72 160 84 C198 72 222 76 226 98 Z" fill={hair} />
              <path d="M92 80 C94 34 128 22 160 22 C194 22 226 34 228 80 Z" fill="#EF4444" />
              <path d="M92 80 C94 34 128 22 160 22 C194 22 226 34 228 80 Z" fill={`url(#clothShade_${uid})`} />
              {/* Cap brim */}
              <path d="M90 76 Q160 66 244 82 Q242 94 180 86 Q124 84 90 82 Z" fill="#B91C1C" />
              <circle cx="160" cy="50" r="14" fill="#FFFFFF" />
              <polygon points="160,39 163.5,47 172,47 165,52 167.5,60 160,55 152.5,60 155,52 148,47 156.5,47" fill={`url(#goldMetal_${uid})`} />
            </g>
          )}

          {config.hairStyle === 'headphones_cat' && (
            <g>
              <path
                d="M93 102 C89 55 126 31 160 31 C195 31 231 55 227 102 Q208 80 184 86 Q160 76 136 86 Q112 80 93 102 Z"
                fill={hair}
              />
              <path d="M93 102 C89 55 126 31 160 31 C195 31 231 55 227 102 Q208 80 184 86 Q160 76 136 86 Q112 80 93 102 Z" fill={`url(#hairGloss_${uid})`} />
              {/* Thick plush rainbow/purple gamer headband */}
              <path d="M88 104 A72 72 0 0 1 232 104" fill="none" stroke="#8B5CF6" strokeWidth="14" strokeLinecap="round" />
              <path d="M94 94 A68 68 0 0 1 226 94" fill="none" stroke="#F472B6" strokeWidth="5" strokeLinecap="round" opacity="0.65" />
              {/* Glowing Cat Ears */}
              <polygon points="98,58 106,18 134,42" fill="#EC4899" />
              <polygon points="105,52 110,27 127,43" fill="#FBCFE8" />
              <polygon points="222,58 214,18 186,42" fill="#EC4899" />
              <polygon points="215,52 210,27 193,43" fill="#FBCFE8" />
              {/* Glossy Ear Cups */}
              <rect x="74" y="88" width="22" height="44" rx="11" fill="#7C3AED" />
              <rect x="78" y="96" width="10" height="28" rx="5" fill="#22D3EE" />
              <rect x="224" y="88" width="22" height="44" rx="11" fill="#7C3AED" />
              <rect x="232" y="96" width="10" height="28" rx="5" fill="#22D3EE" />
            </g>
          )}

          {config.hairStyle === 'crown_princess' && (
            <g>
              <path
                d="M92 102 C88 54 126 30 160 30 C196 30 232 54 228 102 Q206 80 160 85 Q114 80 92 102 Z"
                fill={hair}
              />
              <path d="M92 102 C88 54 126 30 160 30 C196 30 232 54 228 102 Q206 80 160 85 Q114 80 92 102 Z" fill={`url(#hairGloss_${uid})`} />
              {/* Royal Gold Crown */}
              <polygon points="122,42 132,14 148,30 160,6 172,30 188,14 198,42" fill={`url(#goldMetal_${uid})`} />
              <rect x="122" y="39" width="76" height="8" rx="4" fill="#D97706" />
              <circle cx="160" cy="31" r="5" fill="#EC4899" />
              <circle cx="137" cy="34" r="3.8" fill="#38BDF8" />
              <circle cx="183" cy="34" r="3.8" fill="#38BDF8" />
            </g>
          )}

          {config.hairStyle === 'tiara_fairy' && (
            <g>
              <path
                d="M92 102 C88 54 126 30 160 30 C196 30 232 54 228 102 Q206 80 160 85 Q114 80 92 102 Z"
                fill={hair}
              />
              <path d="M92 102 C88 54 126 30 160 30 C196 30 232 54 228 102 Q206 80 160 85 Q114 80 92 102 Z" fill={`url(#hairGloss_${uid})`} />
              <path d="M108 62 A56 50 0 0 1 212 62" fill="none" stroke="#F472B6" strokeWidth="7" strokeLinecap="round" />
              <path d="M112 46 Q90 22 114 22 Q132 24 134 44 Z" fill="#A5F3FC" opacity="0.9" />
              <path d="M208 46 Q230 22 206 22 Q188 24 186 44 Z" fill="#A5F3FC" opacity="0.9" />
              <polygon points="160,16 164,25 173,25 166,30 168,39 160,34 152,39 154,30 147,25 156,25" fill="#FDE047" />
            </g>
          )}

          {config.hairStyle === 'hat_nonla' && (
            <g>
              <path d="M94 98 Q126 80 160 86 Q194 80 226 98 Q224 72 160 70 Q96 72 94 98 Z" fill={hair} />
              <polygon points="160,4 66,80 254,80" fill="#FDE68A" />
              <polygon points="160,4 66,80 254,80" fill={`url(#clothShade_${uid})`} />
              <path d="M100 54 Q160 66 220 54" stroke="#B45309" strokeOpacity="0.35" strokeWidth="2.2" fill="none" />
              <path d="M82 68 Q160 82 238 68" stroke="#B45309" strokeOpacity="0.35" strokeWidth="2.2" fill="none" />
              <path d="M115 80 Q138 156 160 165 Q182 156 205 80" fill="none" stroke="#EC4899" strokeWidth="4.2" />
            </g>
          )}

          {config.hairStyle === 'hat_pirate' && (
            <g>
              <path d="M94 96 Q126 78 160 84 Q194 78 226 96 Z" fill={hair} />
              <path d="M94 74 Q160 64 226 74 L222 86 Q160 78 98 86 Z" fill="#DC2626" />
              <path d="M72 64 Q160 12 248 64 Q236 86 196 80 Q160 72 124 80 Q84 86 72 64 Z" fill="#1E293B" />
              <path d="M72 64 Q160 12 248 64" fill="none" stroke={`url(#goldMetal_${uid})`} strokeWidth="5" strokeLinecap="round" />
              {/* Pirate Star Emblem */}
              <circle cx="160" cy="48" r="14" fill="#FFFFFF" />
              <polygon points="160,37 163.5,45 172,45 165,50 167.5,58 160,53 152.5,58 155,50 148,45 156.5,45" fill="#1E293B" />
            </g>
          )}

          {config.hairStyle === 'helmet_hero' && (
            <g>
              <path
                d="M91 106 C88 46 126 24 160 24 C196 24 232 46 229 106 L216 106 Q204 72 184 74 L160 90 L136 74 Q116 72 104 106 Z"
                fill="#DC2626"
              />
              <path
                d="M91 106 C88 46 126 24 160 24 C196 24 232 46 229 106 L216 106 Q204 72 184 74 L160 90 L136 74 Q116 72 104 106 Z"
                fill={`url(#clothShade_${uid})`}
              />
              <path d="M138 30 L182 30 L170 76 L150 76 Z" fill={`url(#goldMetal_${uid})`} />
              <rect x="84" y="88" width="14" height="36" rx="7" fill={`url(#goldMetal_${uid})`} />
              <rect x="222" y="88" width="14" height="36" rx="7" fill={`url(#goldMetal_${uid})`} />
            </g>
          )}

          {config.hairStyle === 'helmet_ranger' && (
            <g>
              <path d="M92 100 C88 46 126 24 160 24 C196 24 232 46 228 100 Z" fill={hair} />
              <path d="M92 100 C88 46 126 24 160 24 C196 24 232 46 228 100 Z" fill={`url(#clothShade_${uid})`} />
              <path d="M108 66 L142 54 L160 66 L178 54 L212 66 L196 86 L124 86 Z" fill="#0F172A" />
              <polygon points="160,34 166,46 160,58 154,46" fill={`url(#goldMetal_${uid})`} />
              <path d="M120 44 Q160 32 200 44" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="5" strokeLinecap="round" fill="none" />
            </g>
          )}

          {config.hairStyle === 'hood_ninja' && (
            <g>
              <path d="M92 106 C88 48 126 26 160 26 C196 26 232 48 228 106 L228 150 Q160 172 92 150 Z" fill="#1E293B" />
              <rect x="108" y="88" width="104" height="34" rx="14" fill={skin} />
              <rect x="94" y="64" width="132" height="16" rx="5" fill="#DC2626" />
              <rect x="142" y="67" width="36" height="10" rx="4" fill={`url(#silverMetal_${uid})`} />
            </g>
          )}

          {config.hairStyle === 'helmet_racer' && (
            <g>
              <path
                d="M90 108 C86 44 126 22 160 22 C196 22 234 44 230 108 L214 108 Q206 72 160 72 Q114 72 106 108 Z"
                fill="#0284C7"
              />
              <path d="M150 24 L170 24 L170 72 L150 72 Z" fill="#FFFFFF" />
              <path d="M155 24 L165 24 L165 72 L155 72 Z" fill="#FACC15" />
              <path d="M114 48 Q160 32 206 48" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="5" strokeLinecap="round" fill="none" />
            </g>
          )}

          {config.hairStyle === 'hat_wizard' && (
            <g>
              <path d="M94 96 Q126 78 160 84 Q194 78 226 96 Z" fill={hair} />
              <ellipse cx="160" cy="68" rx="84" ry="15" fill="#4C1D95" />
              <polygon points="106,68 160,0 214,68" fill="#5B21B6" />
              <path d="M114 58 Q160 66 206 58 L209 68 Q160 75 111 68 Z" fill={`url(#goldMetal_${uid})`} />
              <polygon points="160,26 163,34 171,34 164,39 167,47 160,42 153,47 156,39 149,34 157,34" fill="#FEF08A" />
            </g>
          )}

          {config.hairStyle === 'helmet_astro' && (
            <g>
              <circle cx="160" cy="100" r="76" fill="#E0F2FE" fillOpacity="0.22" stroke="#FFFFFF" strokeWidth="7" />
              <path d="M92 66 Q160 22 228 66 L216 82 Q160 56 104 82 Z" fill="#F8FAFC" />
              <path d="M148 26 L172 26 L172 64 L148 64 Z" fill="#F97316" />
              <path d="M112 58 Q128 42 154 42" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" fill="none" opacity="0.72" />
            </g>
          )}
        </g>
      </g>
    </>
  );
};
