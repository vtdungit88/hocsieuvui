import React from 'react';

interface AvatarOutfitLayerProps {
  outfitId: string;
}

export const AvatarOutfitLayer: React.FC<AvatarOutfitLayerProps> = ({ outfitId }) => {
  return (
    <g id="outfit-layer">
      {outfitId === 'outfit_uniform' && (
        <g id="outfit_uniform_group">
          <path d="M105 160 L195 160 L185 245 L115 245 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
          <polygon points="135,160 150,180 142,160" fill="#F1F5F9" />
          <polygon points="165,160 150,180 158,160" fill="#F1F5F9" />
          <path d="M136 168 Q150 178 164 168 L155 210 L150 190 L145 210 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
          <rect x="118" y="185" width="18" height="11" rx="2" fill="#2563EB" />
          <text x="127" y="193" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle">HSV</text>
        </g>
      )}

      {outfitId === 'outfit_scout' && (
        <g id="outfit_scout_group">
          <path d="M105 160 L195 160 L185 245 L115 245 Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
          <path d="M105 160 L140 160 L140 245 L115 245 Z" fill="#B45309" />
          <path d="M160 160 L195 160 L185 245 L160 245 Z" fill="#B45309" />
          <rect x="116" y="205" width="18" height="16" rx="2" fill="#92400E" />
          <rect x="166" y="205" width="18" height="16" rx="2" fill="#92400E" />
          <circle cx="175" cy="182" r="7" fill="#10B981" stroke="#FEF08A" strokeWidth="1.5" />
        </g>
      )}

      {outfitId === 'outfit_sport' && (
        <g id="outfit_sport_group">
          <path d="M105 160 L195 160 L185 245 L115 245 Z" fill="#EA580C" />
          <rect x="135" y="160" width="30" height="85" fill="#1E293B" />
          <line x1="145" y1="160" x2="145" y2="245" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="155" y1="160" x2="155" y2="245" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="150" cy="204" r="11" fill="#FACC15" />
          <text x="150" y="208" fill="#1E293B" fontSize="10" fontWeight="bold" textAnchor="middle">★</text>
        </g>
      )}

      {outfitId === 'outfit_hoodie' && (
        <g id="outfit_hoodie_group">
          <path d="M100 160 L200 160 L185 248 L115 248 Z" fill="#4F46E5" />
          <rect x="125" y="215" width="50" height="25" rx="6" fill="#4338CA" />
          <circle cx="150" cy="188" r="16" fill="#FEF08A" />
          <text x="150" y="193" fill="#4338CA" fontSize="13" fontWeight="bold" textAnchor="middle">π ∞</text>
        </g>
      )}

      {outfitId === 'outfit_racer' && (
        <g id="outfit_racer_group">
          <path d="M103 158 L197 158 L187 248 L113 248 Z" fill="#0284C7" stroke="#0F172A" strokeWidth="1.5" />
          <path d="M128 158 L172 158 L167 248 L133 248 Z" fill="#F8FAFC" />
          <rect x="147" y="158" width="6" height="90" fill="#EF4444" />
          <rect x="115" y="232" width="70" height="10" fill="#1E293B" />
          <rect x="125" y="234" width="10" height="6" fill="#FFFFFF" />
          <rect x="145" y="234" width="10" height="6" fill="#FFFFFF" />
          <rect x="165" y="234" width="10" height="6" fill="#FFFFFF" />
          <circle cx="150" cy="195" r="11" fill="#FACC15" stroke="#1E293B" strokeWidth="1.5" />
          <text x="150" y="199" fill="#0F172A" fontSize="9" fontWeight="bold" textAnchor="middle">01</text>
        </g>
      )}

      {outfitId === 'outfit_ranger_red' && (
        <g id="outfit_ranger_red_group">
          <path d="M102 158 L198 158 L186 248 L114 248 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
          {/* White diamond sash */}
          <polygon points="104,160 150,202 196,160 194,178 150,218 106,178" fill="#FFFFFF" />
          <polygon points="150,170 162,184 150,198 138,184" fill="#FACC15" />
          {/* Belt */}
          <rect x="114" y="226" width="72" height="11" rx="3" fill="#0F172A" />
          <rect x="142" y="224" width="16" height="15" rx="3" fill="#FACC15" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>
      )}

      {outfitId === 'outfit_lab' && (
        <g id="outfit_lab_group">
          <path d="M102 158 L198 158 L190 250 L110 250 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
          <rect x="140" y="160" width="20" height="90" fill="#0EA5E9" opacity="0.25" />
          <polygon points="135,158 150,185 165,158" fill="#38BDF8" />
          <rect x="162" y="185" width="18" height="22" rx="2" fill="#E2E8F0" />
          <line x1="167" y1="178" x2="167" y2="188" stroke="#EF4444" strokeWidth="3" />
          <line x1="174" y1="178" x2="174" y2="188" stroke="#0284C7" strokeWidth="3" />
        </g>
      )}

      {outfitId === 'outfit_detective' && (
        <g id="outfit_detective_group">
          <path d="M105 160 L195 160 L185 245 L115 245 Z" fill="#334155" />
          <polygon points="140,160 150,200 160,160" fill="#FFFFFF" />
          <polygon points="142,166 150,172 142,178" fill="#DC2626" />
          <polygon points="158,166 150,172 158,178" fill="#DC2626" />
          <circle cx="150" cy="172" r="3" fill="#991B1B" />
          <polygon points="120,160 140,205 125,205" fill="#1E293B" />
          <polygon points="180,160 160,205 175,205" fill="#1E293B" />
        </g>
      )}

      {outfitId === 'outfit_ninja' && (
        <g id="outfit_ninja_group">
          <path d="M102 158 L198 158 L186 248 L114 248 Z" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
          <path d="M105 162 L182 238 L173 246 L101 174 Z" fill="#DC2626" opacity="0.9" />
          <path d="M115 160 Q150 176 185 160 L178 175 Q150 188 122 175 Z" fill="#DC2626" />
          <rect x="115" y="226" width="70" height="10" fill="#B91C1C" />
          <circle cx="150" cy="231" r="5" fill="#E2E8F0" />
        </g>
      )}

      {outfitId === 'outfit_varsity' && (
        <g id="outfit_varsity_group">
          <path d="M104 158 L196 158 L186 246 L114 246 Z" fill="#1E3A8A" />
          <path d="M104 158 L120 158 L116 200 L106 196 Z" fill="#FEF3C7" />
          <path d="M196 158 L180 158 L184 200 L194 196 Z" fill="#FEF3C7" />
          <line x1="150" y1="162" x2="150" y2="246" stroke="#FEF3C7" strokeWidth="2.5" />
          <circle cx="132" cy="190" r="10" fill="#F59E0B" />
          <text x="132" y="194" fill="#1E3A8A" fontSize="11" fontWeight="bold" textAnchor="middle">A+</text>
        </g>
      )}

      {outfitId === 'outfit_hero_core' && (
        <g id="outfit_hero_core_group">
          <path d="M101 158 L199 158 L186 248 L114 248 Z" fill="#B91C1C" stroke="#FACC15" strokeWidth="2" />
          <path d="M103 160 L132 160 L124 205 L108 198 Z" fill="#FACC15" />
          <path d="M197 160 L168 160 L176 205 L192 198 Z" fill="#FACC15" />
          <polygon points="118,215 182,215 174,244 126,244" fill="#991B1B" stroke="#F59E0B" strokeWidth="1.5" />
          <circle cx="150" cy="192" r="16" fill="#0F172A" stroke="#FACC15" strokeWidth="2.5" />
          <circle cx="150" cy="192" r="10" fill="#38BDF8" filter="url(#glowEffect)" />
          <polygon points="150,183 153,189 159,189 154,193 156,199 150,195 144,199 146,193 141,189 147,189" fill="#FFFFFF" />
        </g>
      )}

      {outfitId === 'outfit_knight' && (
        <g id="outfit_knight_group">
          {/* Royal blue cape hint behind shoulders */}
          <path d="M98 162 L202 162 L208 250 L92 250 Z" fill="#1D4ED8" opacity="0.85" />
          {/* Silver armor breastplate */}
          <path d="M105 158 L195 158 L185 246 L115 246 Z" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
          <path d="M108 162 L150 202 L192 162" fill="none" stroke="#F59E0B" strokeWidth="3.5" />
          <circle cx="110" cy="166" r="10" fill="#CBD5E1" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="190" cy="166" r="10" fill="#CBD5E1" stroke="#F59E0B" strokeWidth="2" />
          <rect x="115" y="222" width="70" height="10" fill="#78350F" />
          <rect x="143" y="220" width="14" height="14" rx="2" fill="#FACC15" />
        </g>
      )}

      {outfitId === 'outfit_hero_shield' && (
        <g id="outfit_hero_shield_group">
          <path d="M102 158 L198 158 L186 248 L114 248 Z" fill="#1E40AF" stroke="#E2E8F0" strokeWidth="2" />
          <rect x="134" y="208" width="6" height="38" fill="#DC2626" />
          <rect x="147" y="208" width="6" height="38" fill="#FFFFFF" />
          <rect x="160" y="208" width="6" height="38" fill="#DC2626" />
          <path d="M108 164 L134 190 L166 190 L192 164" fill="none" stroke="#E2E8F0" strokeWidth="3" />
          <polygon points="150,174 154,183 164,183 156,189 159,198 150,192 141,198 144,189 136,183 146,183" fill="#FFFFFF" />
        </g>
      )}

      {outfitId === 'outfit_aodai_tech' && (
        <g id="outfit_aodai_group">
          <path d="M102 158 L198 158 L190 256 L110 256 Z" fill="#B91C1C" stroke="#F59E0B" strokeWidth="2" />
          <path d="M135 158 Q150 174 165 158" fill="none" stroke="#FDE047" strokeWidth="3.5" />
          <circle cx="150" cy="196" r="15" fill="none" stroke="#FDE047" strokeWidth="2.5" />
          <text x="150" y="201" fill="#FEF08A" fontSize="11" fontWeight="bold" textAnchor="middle">★</text>
        </g>
      )}

      {outfitId === 'outfit_astronaut' && (
        <g id="outfit_astronaut_group">
          <path d="M100 158 L200 158 L188 248 L112 248 Z" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
          <rect x="108" y="160" width="84" height="12" rx="4" fill="#EA580C" />
          <rect x="132" y="182" width="36" height="30" rx="5" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
          <circle cx="141" cy="194" r="4" fill="#EF4444" />
          <circle cx="151" cy="194" r="4" fill="#10B981" />
          <circle cx="161" cy="194" r="4" fill="#0284C7" />
          <rect x="138" y="203" width="24" height="4" rx="2" fill="#0F172A" />
          <rect x="114" y="226" width="72" height="10" fill="#EA580C" />
        </g>
      )}

      {outfitId === 'outfit_scholar' && (
        <g id="outfit_scholar_group">
          <path d="M98 158 L202 158 L190 252 L110 252 Z" fill="#581C87" />
          <path d="M98 158 Q150 175 202 158" stroke="#F59E0B" strokeWidth="4" fill="none" />
          <circle cx="150" cy="190" r="14" fill="#FBBF24" filter="url(#glowEffect)" />
          <text x="150" y="195" fill="#581C87" fontSize="14" fontWeight="bold" textAnchor="middle">Σ</text>
        </g>
      )}

      {outfitId === 'outfit_wizard_ice' && (
        <g id="outfit_wizard_ice_group">
          <path d="M98 158 L202 158 L190 254 L110 254 Z" fill="#0369A1" stroke="#BAE6FD" strokeWidth="2" />
          <path d="M142 158 L158 158 L156 254 L144 254 Z" fill="#E0F2FE" />
          <path d="M98 158 Q150 178 202 158" stroke="#7DD3FC" strokeWidth="4" fill="none" />
          <polygon points="150,178 158,194 150,210 142,194" fill="#A5F3FC" filter="url(#glowEffect)" />
          <circle cx="125" cy="215" r="3" fill="#E0F2FE" />
          <circle cx="175" cy="215" r="3" fill="#E0F2FE" />
        </g>
      )}

      {outfitId === 'outfit_ranger_gold' && (
        <g id="outfit_ranger_gold_group">
          <path d="M100 158 L200 158 L186 248 L114 248 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
          {/* Golden breast shield + shoulder guards */}
          <path d="M100 158 L138 158 L150 198 L162 158 L200 158 L184 185 L150 208 L116 185 Z" fill="#FEF08A" stroke="#B45309" strokeWidth="2" />
          <circle cx="150" cy="182" r="9" fill="#DC2626" stroke="#B45309" strokeWidth="1.5" />
          <rect x="114" y="226" width="72" height="10" fill="#1E293B" />
          <polygon points="150,222 158,231 150,240 142,231" fill="#FACC15" />
        </g>
      )}

      {outfitId === 'outfit_cyber' && (
        <g id="outfit_cyber_group">
          <path d="M100 158 L200 158 L185 248 L115 248 Z" fill="url(#cyberSuit)" stroke="#06B6D4" strokeWidth="2" />
          <circle cx="150" cy="195" r="16" fill="#0891B2" filter="url(#glowEffect)" />
          <circle cx="150" cy="195" r="8" fill="#A5F3FC" />
          <line x1="120" y1="180" x2="135" y2="180" stroke="#06B6D4" strokeWidth="3" />
          <line x1="165" y1="180" x2="180" y2="180" stroke="#06B6D4" strokeWidth="3" />
        </g>
      )}

      {outfitId === 'outfit_mecha_pilot' && (
        <g id="outfit_mecha_pilot_group">
          <path d="M98 158 L202 158 L188 248 L112 248 Z" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
          <polygon points="100,158 128,158 122,190 104,185" fill="#EF4444" />
          <polygon points="200,158 172,158 178,190 196,185" fill="#2563EB" />
          <polygon points="132,164 168,164 162,216 138,216" fill="#E2E8F0" />
          <circle cx="150" cy="188" r="11" fill="#0EA5E9" filter="url(#glowEffect)" />
          <polygon points="145,188 150,181 155,188 150,195" fill="#FEF08A" />
          <rect x="114" y="226" width="72" height="10" fill="#FACC15" />
        </g>
      )}
    </g>
  );
};
