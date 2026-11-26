import React from 'react';

interface AvatarOutfitLayerProps {
  outfitId: string;
  uid: string;
}

export const AvatarOutfitLayer: React.FC<AvatarOutfitLayerProps> = ({ outfitId, uid }) => {
  return (
    <g id="outfit-layer">
      {outfitId === 'outfit_uniform' && (
        <g id="outfit_uniform_group">
          <path d="M106 156 L194 156 L186 244 L114 244 Z" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" strokeLinejoin="round" />
          <path d="M106 156 L194 156 L186 244 L114 244 Z" fill={`url(#clothShade_${uid})`} />
          <polygon points="133,156 150,178 142,156" fill="#E2E8F0" />
          <polygon points="167,156 150,178 158,156" fill="#E2E8F0" />
          <path d="M135 164 Q150 176 165 164 L156 208 L150 187 L144 208 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="1.5" strokeLinejoin="round" />
          <rect x="118" y="185" width="20" height="12" rx="3" fill="#2563EB" />
          <text x="128" y="194" fill="#FFFFFF" fontSize="6.5" fontWeight="bold" textAnchor="middle">HSV</text>
        </g>
      )}

      {outfitId === 'outfit_scout' && (
        <g id="outfit_scout_group">
          <path d="M106 156 L194 156 L186 244 L114 244 Z" fill="#FEF3C7" stroke="#B45309" strokeWidth="1.8" />
          <path d="M106 156 L140 156 L140 244 L114 244 Z" fill="#D97706" />
          <path d="M160 156 L194 156 L186 244 L160 244 Z" fill="#D97706" />
          <path d="M106 156 L194 156 L186 244 L114 244 Z" fill={`url(#clothShade_${uid})`} />
          <rect x="116" y="203" width="19" height="17" rx="4" fill="#92400E" stroke="#78350F" strokeWidth="1.2" />
          <rect x="165" y="203" width="19" height="17" rx="4" fill="#92400E" stroke="#78350F" strokeWidth="1.2" />
          <circle cx="174" cy="180" r="8" fill="#10B981" stroke="#FEF08A" strokeWidth="2" />
        </g>
      )}

      {outfitId === 'outfit_sport' && (
        <g id="outfit_sport_group">
          <path d="M106 156 L194 156 L186 244 L114 244 Z" fill="#EA580C" stroke="#9A3412" strokeWidth="1.8" />
          <rect x="134" y="156" width="32" height="88" fill="#1E293B" />
          <line x1="144" y1="158" x2="144" y2="243" stroke="#FFFFFF" strokeWidth="2.2" />
          <line x1="156" y1="158" x2="156" y2="243" stroke="#FFFFFF" strokeWidth="2.2" />
          <path d="M106 156 L194 156 L186 244 L114 244 Z" fill={`url(#clothShade_${uid})`} />
          <circle cx="150" cy="202" r="12" fill={`url(#goldMetal_${uid})`} stroke="#78350F" strokeWidth="1.5" />
          <polygon points="150,194 152.5,200 158.5,200 153.5,203.5 155.5,209.5 150,206 144.5,209.5 146.5,203.5 141.5,200 147.5,200" fill="#1E293B" />
        </g>
      )}

      {outfitId === 'outfit_hoodie' && (
        <g id="outfit_hoodie_group">
          {/* Cozy puffed hood collar */}
          <path d="M112 152 Q150 174 188 152 Q180 142 150 148 Q120 142 112 152 Z" fill="#6366F1" stroke="#312E81" strokeWidth="1.8" />
          <path d="M102 156 L198 156 L186 246 L114 246 Z" fill="#4F46E5" stroke="#312E81" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M102 156 L198 156 L186 246 L114 246 Z" fill={`url(#clothShade_${uid})`} />
          <line x1="150" y1="164" x2="150" y2="246" stroke="#C7D2FE" strokeWidth="2" strokeDasharray="3 2" />
          {/* Kangaroo pouch pocket */}
          <path d="M124 214 L176 214 L172 238 Q150 242 128 238 Z" fill="#4338CA" stroke="#312E81" strokeWidth="1.5" />
          <circle cx="150" cy="189" r="15" fill={`url(#goldMetal_${uid})`} stroke="#312E81" strokeWidth="1.5" />
          <text x="150" y="194" fill="#312E81" fontSize="12" fontWeight="bold" textAnchor="middle">π ∞</text>
        </g>
      )}

      {outfitId === 'outfit_racer' && (
        <g id="outfit_racer_group">
          <path d="M103 156 L197 156 L187 246 L113 246 Z" fill="#0284C7" stroke="#0F172A" strokeWidth="1.8" />
          <path d="M128 156 L172 156 L167 246 L133 246 Z" fill="#F8FAFC" />
          <rect x="147" y="156" width="6" height="90" fill="#EF4444" />
          <path d="M103 156 L197 156 L187 246 L113 246 Z" fill={`url(#clothShade_${uid})`} />
          <rect x="115" y="230" width="70" height="11" rx="3" fill="#1E293B" />
          <rect x="125" y="232" width="10" height="6" fill="#FFFFFF" />
          <rect x="145" y="232" width="10" height="6" fill="#FFFFFF" />
          <rect x="165" y="232" width="10" height="6" fill="#FFFFFF" />
          <circle cx="150" cy="194" r="12" fill={`url(#goldMetal_${uid})`} stroke="#1E293B" strokeWidth="1.5" />
          <text x="150" y="198" fill="#0F172A" fontSize="9.5" fontWeight="bold" textAnchor="middle">01</text>
        </g>
      )}

      {outfitId === 'outfit_ranger_red' && (
        <g id="outfit_ranger_red_group">
          <path d="M102 156 L198 156 L186 246 L114 246 Z" fill="#DC2626" stroke="#7F1D1D" strokeWidth="1.8" />
          <polygon points="104,158 150,200 196,158 194,176 150,216 106,176" fill="#FFFFFF" />
          <path d="M102 156 L198 156 L186 246 L114 246 Z" fill={`url(#clothShade_${uid})`} />
          <polygon points="150,168 162,182 150,196 138,182" fill={`url(#goldMetal_${uid})`} stroke="#991B1B" strokeWidth="1.2" />
          <rect x="114" y="224" width="72" height="12" rx="4" fill="#0F172A" />
          <rect x="142" y="222" width="16" height="16" rx="4" fill={`url(#goldMetal_${uid})`} stroke="#FFFFFF" strokeWidth="1.5" />
        </g>
      )}

      {outfitId === 'outfit_lab' && (
        <g id="outfit_lab_group">
          <path d="M102 156 L198 156 L190 250 L110 250 Z" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
          <rect x="140" y="158" width="20" height="92" fill="#0EA5E9" opacity="0.22" />
          <polygon points="135,156 150,183 165,156" fill="#38BDF8" />
          <path d="M102 156 L198 156 L190 250 L110 250 Z" fill={`url(#clothShade_${uid})`} />
          <rect x="162" y="185" width="18" height="22" rx="3" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="167" y1="178" x2="167" y2="188" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          <line x1="174" y1="178" x2="174" y2="188" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}

      {outfitId === 'outfit_detective' && (
        <g id="outfit_detective_group">
          <path d="M105 156 L195 156 L186 244 L114 244 Z" fill="#334155" stroke="#0F172A" strokeWidth="1.8" />
          <polygon points="140,156 150,198 160,156" fill="#FFFFFF" />
          <polygon points="142,164 150,170 142,176" fill="#DC2626" />
          <polygon points="158,164 150,170 158,176" fill="#DC2626" />
          <circle cx="150" cy="170" r="3" fill="#991B1B" />
          <polygon points="120,156 140,203 125,203" fill="#1E293B" />
          <polygon points="180,156 160,203 175,203" fill="#1E293B" />
          <path d="M105 156 L195 156 L186 244 L114 244 Z" fill={`url(#clothShade_${uid})`} />
        </g>
      )}

      {outfitId === 'outfit_ninja' && (
        <g id="outfit_ninja_group">
          <path d="M102 156 L198 156 L186 246 L114 246 Z" fill="#0F172A" stroke="#334155" strokeWidth="1.8" />
          <path d="M105 160 L182 236 L173 244 L101 172 Z" fill="#DC2626" opacity="0.92" />
          <path d="M115 158 Q150 174 185 158 L178 173 Q150 186 122 173 Z" fill="#DC2626" />
          <rect x="115" y="224" width="70" height="10" rx="3" fill="#B91C1C" />
          <circle cx="150" cy="229" r="5.5" fill={`url(#silverMetal_${uid})`} />
        </g>
      )}

      {outfitId === 'outfit_varsity' && (
        <g id="outfit_varsity_group">
          <path d="M104 156 L196 156 L186 244 L114 244 Z" fill="#1E3A8A" stroke="#0F172A" strokeWidth="1.8" />
          <path d="M104 156 L120 156 L116 198 L106 194 Z" fill="#FEF3C7" />
          <path d="M196 156 L180 156 L184 198 L194 194 Z" fill="#FEF3C7" />
          <path d="M104 156 L196 156 L186 244 L114 244 Z" fill={`url(#clothShade_${uid})`} />
          <line x1="150" y1="160" x2="150" y2="244" stroke="#FEF3C7" strokeWidth="2.8" />
          <circle cx="132" cy="189" r="10.5" fill={`url(#goldMetal_${uid})`} />
          <text x="132" y="193" fill="#1E3A8A" fontSize="11" fontWeight="bold" textAnchor="middle">A+</text>
        </g>
      )}

      {outfitId === 'outfit_hero_core' && (
        <g id="outfit_hero_core_group">
          <path d="M101 156 L199 156 L186 246 L114 246 Z" fill="#B91C1C" stroke="#FACC15" strokeWidth="2.2" />
          <path d="M103 158 L132 158 L124 203 L108 196 Z" fill={`url(#goldMetal_${uid})`} />
          <path d="M197 158 L168 158 L176 203 L192 196 Z" fill={`url(#goldMetal_${uid})`} />
          <polygon points="118,213 182,213 174,242 126,242" fill="#991B1B" stroke="#F59E0B" strokeWidth="1.5" />
          <path d="M101 156 L199 156 L186 246 L114 246 Z" fill={`url(#clothShade_${uid})`} />
          <circle cx="150" cy="190" r="16.5" fill="#0F172A" stroke="#FACC15" strokeWidth="2.5" />
          <circle cx="150" cy="190" r="10.5" fill="#38BDF8" filter={`url(#glowEffect_${uid})`} />
          <polygon points="150,181 153,187 159,187 154,191 156,197 150,193 144,197 146,191 141,187 147,187" fill="#FFFFFF" />
        </g>
      )}

      {outfitId === 'outfit_knight' && (
        <g id="outfit_knight_group">
          <path d="M96 160 L204 160 L212 252 L88 252 Z" fill="#1D4ED8" opacity="0.88" />
          <path d="M105 156 L195 156 L185 244 L115 244 Z" fill={`url(#silverMetal_${uid})`} stroke="#475569" strokeWidth="2" />
          <path d="M108 160 L150 200 L192 160" fill="none" stroke="#F59E0B" strokeWidth="3.5" />
          <circle cx="109" cy="164" r="11" fill={`url(#silverMetal_${uid})`} stroke="#F59E0B" strokeWidth="2" />
          <circle cx="191" cy="164" r="11" fill={`url(#silverMetal_${uid})`} stroke="#F59E0B" strokeWidth="2" />
          <rect x="115" y="220" width="70" height="10" rx="3" fill="#78350F" />
          <rect x="143" y="218" width="14" height="14" rx="3" fill={`url(#goldMetal_${uid})`} />
        </g>
      )}

      {outfitId === 'outfit_hero_shield' && (
        <g id="outfit_hero_shield_group">
          <path d="M102 156 L198 156 L186 246 L114 246 Z" fill="#1E40AF" stroke="#E2E8F0" strokeWidth="2" />
          <rect x="134" y="206" width="6" height="38" fill="#DC2626" />
          <rect x="147" y="206" width="6" height="38" fill="#FFFFFF" />
          <rect x="160" y="206" width="6" height="38" fill="#DC2626" />
          <path d="M102 156 L198 156 L186 246 L114 246 Z" fill={`url(#clothShade_${uid})`} />
          <path d="M108 162 L134 188 L166 188 L192 162" fill="none" stroke="#E2E8F0" strokeWidth="3" />
          <polygon points="150,172 154,181 164,181 156,187 159,196 150,190 141,196 144,187 136,181 146,181" fill="#FFFFFF" />
        </g>
      )}

      {outfitId === 'outfit_aodai_tech' && (
        <g id="outfit_aodai_group">
          <path d="M102 156 L198 156 L190 258 L110 258 Z" fill="#B91C1C" stroke="#F59E0B" strokeWidth="2.2" />
          <path d="M102 156 L198 156 L190 258 L110 258 Z" fill={`url(#clothShade_${uid})`} />
          <path d="M134 156 Q150 172 166 156" fill="none" stroke="#FDE047" strokeWidth="3.5" />
          <circle cx="150" cy="194" r="15" fill="none" stroke="#FDE047" strokeWidth="2.5" />
          <polygon points="150,183 153,191 161,191 154.5,195.5 157,203 150,198.5 143,203 145.5,195.5 139,191 147,191" fill="#FEF08A" />
        </g>
      )}

      {outfitId === 'outfit_astronaut' && (
        <g id="outfit_astronaut_group">
          <path d="M100 156 L200 156 L188 246 L112 246 Z" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
          <path d="M100 156 L200 156 L188 246 L112 246 Z" fill={`url(#clothShade_${uid})`} />
          <rect x="108" y="158" width="84" height="12" rx="5" fill="#EA580C" />
          <rect x="131" y="180" width="38" height="30" rx="6" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
          <circle cx="140" cy="192" r="4" fill="#EF4444" />
          <circle cx="150" cy="192" r="4" fill="#10B981" />
          <circle cx="160" cy="192" r="4" fill="#0284C7" />
          <rect x="138" y="201" width="24" height="4" rx="2" fill="#0F172A" />
          <rect x="114" y="224" width="72" height="10" rx="4" fill="#EA580C" />
        </g>
      )}

      {outfitId === 'outfit_scholar' && (
        <g id="outfit_scholar_group">
          <path d="M98 156 L202 156 L192 254 L108 254 Z" fill="#581C87" stroke="#F59E0B" strokeWidth="1.8" />
          <path d="M98 156 L202 156 L192 254 L108 254 Z" fill={`url(#clothShade_${uid})`} />
          <path d="M98 156 Q150 174 202 156" stroke="#F59E0B" strokeWidth="4.5" fill="none" />
          <circle cx="150" cy="190" r="14.5" fill={`url(#goldMetal_${uid})`} filter={`url(#glowEffect_${uid})`} />
          <text x="150" y="195" fill="#581C87" fontSize="14" fontWeight="bold" textAnchor="middle">Σ</text>
        </g>
      )}

      {outfitId === 'outfit_wizard_ice' && (
        <g id="outfit_wizard_ice_group">
          <path d="M98 156 L202 156 L192 254 L108 254 Z" fill="#0369A1" stroke="#BAE6FD" strokeWidth="2" />
          <path d="M142 156 L158 156 L156 254 L144 254 Z" fill="#E0F2FE" />
          <path d="M98 156 L202 156 L192 254 L108 254 Z" fill={`url(#clothShade_${uid})`} />
          <path d="M98 156 Q150 176 202 156" stroke="#7DD3FC" strokeWidth="4.5" fill="none" />
          <polygon points="150,176 159,192 150,208 141,192" fill="#A5F3FC" filter={`url(#glowEffect_${uid})`} />
          <circle cx="125" cy="214" r="3" fill="#E0F2FE" />
          <circle cx="175" cy="214" r="3" fill="#E0F2FE" />
        </g>
      )}

      {outfitId === 'outfit_ranger_gold' && (
        <g id="outfit_ranger_gold_group">
          <path d="M100 156 L200 156 L186 246 L114 246 Z" fill={`url(#goldMetal_${uid})`} stroke="#78350F" strokeWidth="1.8" />
          <path d="M100 156 L138 156 L150 196 L162 156 L200 156 L184 184 L150 206 L116 184 Z" fill="#FEF08A" stroke="#B45309" strokeWidth="2" />
          <circle cx="150" cy="180" r="9.5" fill="#DC2626" stroke="#B45309" strokeWidth="1.5" />
          <rect x="114" y="224" width="72" height="10" rx="3" fill="#1E293B" />
          <polygon points="150,220 158,229 150,238 142,229" fill="#FACC15" />
        </g>
      )}

      {outfitId === 'outfit_cyber' && (
        <g id="outfit_cyber_group">
          <path d="M100 156 L200 156 L186 246 L114 246 Z" fill={`url(#cyberSuit_${uid})`} stroke="#06B6D4" strokeWidth="2" />
          <circle cx="150" cy="193" r="16" fill="#0891B2" filter={`url(#glowEffect_${uid})`} />
          <circle cx="150" cy="193" r="8" fill="#A5F3FC" />
          <line x1="120" y1="178" x2="135" y2="178" stroke="#06B6D4" strokeWidth="3" strokeLinecap="round" />
          <line x1="165" y1="178" x2="180" y2="178" stroke="#06B6D4" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}

      {outfitId === 'outfit_mecha_pilot' && (
        <g id="outfit_mecha_pilot_group">
          <path d="M98 156 L202 156 L188 246 L112 246 Z" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
          <polygon points="100,156 128,156 122,188 104,183" fill="#EF4444" />
          <polygon points="200,156 172,156 178,188 196,183" fill="#2563EB" />
          <polygon points="132,162 168,162 162,214 138,214" fill={`url(#silverMetal_${uid})`} />
          <circle cx="150" cy="186" r="11.5" fill="#0EA5E9" filter={`url(#glowEffect_${uid})`} />
          <polygon points="145,186 150,179 155,186 150,193" fill="#FEF08A" />
          <rect x="114" y="224" width="72" height="10" rx="4" fill="#FACC15" />
        </g>
      )}
    </g>
  );
};
