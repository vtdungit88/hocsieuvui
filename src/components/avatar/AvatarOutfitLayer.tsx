import React from 'react';

interface AvatarOutfitLayerProps {
  outfitId: string;
  uid: string;
}

export const AvatarOutfitLayer: React.FC<AvatarOutfitLayerProps> = ({ outfitId, uid }) => {
  return (
    <g id="outfit-layer" filter={`url(#softAO_${uid})`}>
      {/* 1. Đồng Phục Khăn Quàng Đỏ */}
      {outfitId === 'outfit_uniform' && (
        <g id="outfit_uniform_group">
          {/* Puffed 3D shirt torso */}
          <path d="M120 170 Q160 165 200 170 L197 242 Q160 248 123 242 Z" fill="#FFFFFF" />
          <path d="M120 170 Q160 165 200 170 L197 242 Q160 248 123 242 Z" fill={`url(#clothShade_${uid})`} />
          {/* Crisp sculpted shirt collar */}
          <polygon points="140,168 160,190 148,167" fill="#E2E8F0" />
          <polygon points="180,168 160,190 172,167" fill="#E2E8F0" />
          {/* Plush Red Scarf */}
          <path d="M142 172 Q160 185 178 172 L171 215 L160 198 L149 215 Z" fill="#EF4444" />
          <path d="M142 172 Q160 185 178 172 L171 215 L160 198 L149 215 Z" fill={`url(#clothShade_${uid})`} />
          <circle cx="160" cy="184" r="5" fill="#DC2626" />
          {/* HSV Blue Chest Patch */}
          <rect x="128" y="196" width="22" height="12" rx="4" fill="#2563EB" />
          <text x="139" y="204.5" fill="#FFFFFF" fontSize="7" fontWeight="bold" textAnchor="middle">
            HSV
          </text>
        </g>
      )}

      {/* 2. Áo Gile Thám Hiểm Bản Đồ */}
      {outfitId === 'outfit_scout' && (
        <g id="outfit_scout_group">
          <path d="M120 170 Q160 165 200 170 L197 242 Q160 248 123 242 Z" fill="#FEF3C7" />
          <path d="M120 170 L149 170 L149 243 L123 242 Z" fill="#F59E0B" />
          <path d="M171 170 L200 170 L197 242 L171 243 Z" fill="#F59E0B" />
          <path d="M120 170 Q160 165 200 170 L197 242 Q160 248 123 242 Z" fill={`url(#clothShade_${uid})`} />
          {/* Cargo Pocket Flaps */}
          <rect x="127" y="206" width="18" height="17" rx="5" fill="#B45309" />
          <rect x="127" y="206" width="18" height="6" rx="3" fill="#92400E" />
          <rect x="175" y="206" width="18" height="17" rx="5" fill="#B45309" />
          <rect x="175" y="206" width="18" height="6" rx="3" fill="#92400E" />
          {/* Explorer Compass Badge */}
          <circle cx="182" cy="188" r="8" fill="#10B981" />
          <circle cx="182" cy="188" r="4.5" fill="#FEF08A" />
        </g>
      )}

      {/* 3. Áo Thể Dục Năng Động 3 Sọc */}
      {outfitId === 'outfit_sport' && (
        <g id="outfit_sport_group">
          <path d="M120 170 Q160 165 200 170 L197 242 Q160 248 123 242 Z" fill="#F97316" />
          <rect x="144" y="168" width="32" height="76" rx="4" fill="#1E293B" />
          <line x1="153" y1="170" x2="153" y2="243" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="167" y1="170" x2="167" y2="243" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M120 170 Q160 165 200 170 L197 242 Q160 248 123 242 Z" fill={`url(#clothShade_${uid})`} />
          <circle cx="160" cy="206" r="12" fill={`url(#goldMetal_${uid})`} />
          <polygon
            points="160,198 162.5,204 168.5,204 163.5,207.5 165.5,213.5 160,210 154.5,213.5 156.5,207.5 151.5,204 157.5,204"
            fill="#1E293B"
          />
        </g>
      )}

      {/* 4. Hoodie Biệt Đội Tri Thức (Plush 3D Pixar Hoodie matching reference Boy!) */}
      {outfitId === 'outfit_hoodie' && (
        <g id="outfit_hoodie_group">
          {/* Puffed 3D hoodie collar behind neck */}
          <path d="M126 168 Q160 186 194 168 Q186 156 160 162 Q134 156 126 168 Z" fill="#60A5FA" />
          <path d="M118 170 Q160 164 202 170 L198 244 Q160 250 122 244 Z" fill="#3B82F6" />
          <path d="M118 170 Q160 164 202 170 L198 244 Q160 250 122 244 Z" fill={`url(#clothShade_${uid})`} />
          {/* Crisp white central zip seam */}
          <line x1="160" y1="178" x2="160" y2="245" stroke="#E0F2FE" strokeWidth="2.6" strokeLinecap="round" />
          <rect x="157" y="177" width="6" height="8" rx="2" fill={`url(#silverMetal_${uid})`} />
          {/* Plush Kangaroo Pouch */}
          <path d="M133 216 L187 216 L184 240 Q160 245 136 240 Z" fill="#2563EB" />
          <path d="M133 216 L187 216" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
          {/* Golden Star Badge */}
          <circle cx="143" cy="196" r="10.5" fill={`url(#goldMetal_${uid})`} />
          <text x="143" y="200" fill="#1E3A8A" fontSize="9.5" fontWeight="bold" textAnchor="middle">
            π∞
          </text>
        </g>
      )}

      {/* 5. Đồ Đua Siêu Tốc Turbo */}
      {outfitId === 'outfit_racer' && (
        <g id="outfit_racer_group">
          <path d="M118 170 Q160 165 202 170 L198 244 Q160 250 122 244 Z" fill="#0284C7" />
          <path d="M140 168 L180 168 L176 244 L144 244 Z" fill="#F8FAFC" />
          <rect x="157" y="168" width="6" height="76" fill="#EF4444" />
          <path d="M118 170 Q160 165 202 170 L198 244 Q160 250 122 244 Z" fill={`url(#clothShade_${uid})`} />
          {/* Checkered Waist Belt */}
          <rect x="122" y="228" width="76" height="12" rx="4" fill="#1E293B" />
          <rect x="132" y="231" width="11" height="6" rx="1.5" fill="#FFFFFF" />
          <rect x="154" y="231" width="11" height="6" rx="1.5" fill="#FFFFFF" />
          <rect x="176" y="231" width="11" height="6" rx="1.5" fill="#FFFFFF" />
          <circle cx="160" cy="200" r="12" fill={`url(#goldMetal_${uid})`} />
          <text x="160" y="204" fill="#0F172A" fontSize="10" fontWeight="bold" textAnchor="middle">
            01
          </text>
        </g>
      )}

      {/* 6. Chiến Giáp Biệt Đội Đỏ Rực */}
      {outfitId === 'outfit_ranger_red' && (
        <g id="outfit_ranger_red_group">
          <path d="M118 170 Q160 165 202 170 L198 244 Q160 250 122 244 Z" fill="#EF4444" />
          <polygon points="122,172 160,208 198,172 196,188 160,224 124,188" fill="#FFFFFF" />
          <path d="M118 170 Q160 165 202 170 L198 244 Q160 250 122 244 Z" fill={`url(#clothShade_${uid})`} />
          <polygon points="160,180 172,193 160,206 148,193" fill={`url(#goldMetal_${uid})`} />
          <rect x="122" y="226" width="76" height="12" rx="5" fill="#0F172A" />
          <rect x="151" y="224" width="18" height="16" rx="5" fill={`url(#goldMetal_${uid})`} />
        </g>
      )}

      {/* 7. Áo Blouse Nhà Khoa Học Nhí */}
      {outfitId === 'outfit_lab' && (
        <g id="outfit_lab_group">
          <path d="M117 170 Q160 165 203 170 L201 250 Q160 256 119 250 Z" fill="#F8FAFC" />
          <rect x="148" y="170" width="24" height="80" fill="#38BDF8" opacity="0.28" />
          <polygon points="142,169 160,196 178,169" fill="#0EA5E9" />
          <path d="M117 170 Q160 165 203 170 L201 250 Q160 256 119 250 Z" fill={`url(#clothShade_${uid})`} />
          <rect x="171" y="196" width="19" height="22" rx="4" fill="#E2E8F0" />
          <line x1="176" y1="189" x2="176" y2="199" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="184" y1="189" x2="184" y2="199" stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      )}

      {/* 8. Vest Thám Tử Lừng Danh */}
      {outfitId === 'outfit_detective' && (
        <g id="outfit_detective_group">
          <path d="M119 170 Q160 165 201 170 L197 244 Q160 248 123 244 Z" fill="#334155" />
          <polygon points="148,168 160,210 172,168" fill="#FFFFFF" />
          {/* Cute Red Bowtie */}
          <polygon points="150,175 160,181 150,187" fill="#EF4444" />
          <polygon points="170,175 160,181 170,187" fill="#EF4444" />
          <circle cx="160" cy="181" r="3.5" fill="#B91C1C" />
          <polygon points="130,170 150,214 136,214" fill="#1E293B" />
          <polygon points="190,170 170,214 184,214" fill="#1E293B" />
          <path d="M119 170 Q160 165 201 170 L197 244 Q160 248 123 244 Z" fill={`url(#clothShade_${uid})`} />
        </g>
      )}

      {/* 9. Bộ Đồ Ninja Bóng Đêm */}
      {outfitId === 'outfit_ninja' && (
        <g id="outfit_ninja_group">
          <path d="M118 170 Q160 165 202 170 L198 244 Q160 248 122 244 Z" fill="#1E293B" />
          <path d="M122 174 L190 236 L180 244 L117 185 Z" fill="#EF4444" opacity="0.92" />
          <path d="M130 169 Q160 186 190 169 L183 184 Q160 198 137 184 Z" fill="#DC2626" />
          <path d="M118 170 Q160 165 202 170 L198 244 Q160 248 122 244 Z" fill={`url(#clothShade_${uid})`} />
          <rect x="122" y="226" width="76" height="11" rx="4" fill="#B91C1C" />
          <circle cx="160" cy="231.5" r="6" fill={`url(#silverMetal_${uid})`} />
        </g>
      )}

      {/* 10. Áo Khoác Bóng Chày Học Đường */}
      {outfitId === 'outfit_varsity' && (
        <g id="outfit_varsity_group">
          <path d="M118 170 Q160 165 202 170 L197 244 Q160 248 123 244 Z" fill="#1D4ED8" />
          <path d="M118 170 L134 170 L130 212 L120 208 Z" fill="#FEF3C7" />
          <path d="M202 170 L186 170 L190 212 L200 208 Z" fill="#FEF3C7" />
          <path d="M118 170 Q160 165 202 170 L197 244 Q160 248 123 244 Z" fill={`url(#clothShade_${uid})`} />
          <line x1="160" y1="173" x2="160" y2="244" stroke="#FEF3C7" strokeWidth="3" strokeLinecap="round" />
          <circle cx="141" cy="198" r="11" fill={`url(#goldMetal_${uid})`} />
          <text x="141" y="202" fill="#1E3A8A" fontSize="11" fontWeight="bold" textAnchor="middle">
            A+
          </text>
        </g>
      )}

      {/* 11. Giáp Siêu Anh Hùng Lõi Sao (3D Toy Mech Hero Chest matching image_3dfc56c3!) */}
      {outfitId === 'outfit_hero_core' && (
        <g id="outfit_hero_core_group">
          <path d="M116 170 Q160 164 204 170 L198 244 Q160 250 122 244 Z" fill="#DC2626" />
          {/* Golden Armored Shoulder Plates */}
          <path d="M116 171 L144 171 L136 212 L121 206 Z" fill={`url(#goldMetal_${uid})`} />
          <path d="M204 171 L176 171 L184 212 L199 206 Z" fill={`url(#goldMetal_${uid})`} />
          <polygon points="126,216 194,216 186,243 134,243" fill="#991B1B" />
          <path d="M116 170 Q160 164 204 170 L198 244 Q160 250 122 244 Z" fill={`url(#clothShade_${uid})`} />
          {/* Glowing Star Energy Reactor */}
          <circle cx="160" cy="200" r="16" fill="#0F172A" />
          <circle cx="160" cy="200" r="12" fill="#38BDF8" filter={`url(#glowEffect_${uid})`} />
          <polygon
            points="160,190 163,197 170,197 164.5,201.5 166.5,208 160,204 153.5,208 155.5,201.5 150,197 157,197"
            fill="#FFFFFF"
          />
        </g>
      )}

      {/* 12. Giáp Hiệp Sĩ Ánh Sáng */}
      {outfitId === 'outfit_knight' && (
        <g id="outfit_knight_group">
          {/* Flowing Blue Royal Cape behind shoulders */}
          <path d="M110 174 L210 174 L222 258 L98 258 Z" fill="#2563EB" opacity="0.92" />
          {/* Metallic Silver Breastplate */}
          <path d="M118 170 Q160 164 202 170 L196 244 Q160 250 124 244 Z" fill={`url(#silverMetal_${uid})`} />
          <path d="M124 174 L160 212 L196 174" fill="none" stroke={`url(#goldMetal_${uid})`} strokeWidth="4" strokeLinecap="round" />
          {/* Sculpted 3D Pauldrons */}
          <circle cx="121" cy="176" r="12" fill={`url(#silverMetal_${uid})`} />
          <circle cx="199" cy="176" r="12" fill={`url(#silverMetal_${uid})`} />
          <circle cx="121" cy="176" r="6" fill={`url(#goldMetal_${uid})`} />
          <circle cx="199" cy="176" r="6" fill={`url(#goldMetal_${uid})`} />
          <rect x="123" y="224" width="74" height="11" rx="4" fill="#78350F" />
          <rect x="152" y="222" width="16" height="15" rx="4" fill={`url(#goldMetal_${uid})`} />
        </g>
      )}

      {/* 13. Chiến Giáp Đội Trưởng Ngôi Sao */}
      {outfitId === 'outfit_hero_shield' && (
        <g id="outfit_hero_shield_group">
          <path d="M118 170 Q160 165 202 170 L198 244 Q160 250 122 244 Z" fill="#1D4ED8" />
          <rect x="142" y="212" width="7" height="32" rx="2" fill="#EF4444" />
          <rect x="156.5" y="212" width="7" height="32" rx="2" fill="#FFFFFF" />
          <rect x="171" y="212" width="7" height="32" rx="2" fill="#EF4444" />
          <path d="M118 170 Q160 165 202 170 L198 244 Q160 250 122 244 Z" fill={`url(#clothShade_${uid})`} />
          <path d="M122 176 L146 198 L174 198 L198 176" fill="none" stroke="#E2E8F0" strokeWidth="3.5" strokeLinecap="round" />
          <polygon
            points="160,182 164,191 174,191 166,197 169,206 160,200 151,206 154,197 146,191 156,191"
            fill="#FFFFFF"
          />
        </g>
      )}

      {/* 14. Cổ Phục Trạng Nguyên Hiện Đại */}
      {outfitId === 'outfit_aodai_tech' && (
        <g id="outfit_aodai_group">
          <path d="M118 170 Q160 165 202 170 L204 264 Q160 270 116 264 Z" fill="#DC2626" />
          <path d="M118 170 Q160 165 202 170 L204 264 Q160 270 116 264 Z" fill={`url(#clothShade_${uid})`} />
          <path d="M142 169 Q160 185 178 169" fill="none" stroke="#FDE047" strokeWidth="4" strokeLinecap="round" />
          <circle cx="160" cy="204" r="15" fill="none" stroke="#FDE047" strokeWidth="2.8" />
          <polygon
            points="160,193 163,201 171,201 164.5,205.5 167,213 160,208.5 153,213 155.5,205.5 149,201 157,201"
            fill="#FEF08A"
          />
        </g>
      )}

      {/* 15. Phi Hành Gia Khám Phá Sao */}
      {outfitId === 'outfit_astronaut' && (
        <g id="outfit_astronaut_group">
          <path d="M116 170 Q160 165 204 170 L198 244 Q160 250 122 244 Z" fill="#F8FAFC" />
          <path d="M116 170 Q160 165 204 170 L198 244 Q160 250 122 244 Z" fill={`url(#clothShade_${uid})`} />
          <rect x="123" y="170" width="74" height="12" rx="6" fill="#F97316" />
          <rect x="141" y="191" width="38" height="30" rx="8" fill="#E2E8F0" />
          <circle cx="150" cy="202" r="4" fill="#EF4444" />
          <circle cx="160" cy="202" r="4" fill="#10B981" />
          <circle cx="170" cy="202" r="4" fill="#0284C7" />
          <rect x="148" y="211" width="24" height="4.5" rx="2" fill="#0F172A" />
          <rect x="122" y="226" width="76" height="11" rx="5" fill="#F97316" />
        </g>
      )}

      {/* 16. Áo Choàng Pháp Sư Tri Thức */}
      {outfitId === 'outfit_scholar' && (
        <g id="outfit_scholar_group">
          <path d="M114 170 Q160 164 206 170 L205 262 Q160 270 115 262 Z" fill="#6D28D9" />
          <path d="M114 170 Q160 164 206 170 L205 262 Q160 270 115 262 Z" fill={`url(#clothShade_${uid})`} />
          <path d="M116 171 Q160 190 204 171" stroke={`url(#goldMetal_${uid})`} strokeWidth="5" fill="none" strokeLinecap="round" />
          <circle cx="160" cy="204" r="15" fill={`url(#goldMetal_${uid})`} filter={`url(#glowEffect_${uid})`} />
          <text x="160" y="209.5" fill="#4C1D95" fontSize="15" fontWeight="bold" textAnchor="middle">
            Σ
          </text>
        </g>
      )}

      {/* 17. Áo Choàng Pháp Sư Băng Giá */}
      {outfitId === 'outfit_wizard_ice' && (
        <g id="outfit_wizard_ice_group">
          <path d="M114 170 Q160 164 206 170 L205 262 Q160 270 115 262 Z" fill="#0284C7" />
          <path d="M150 170 L170 170 L168 263 L152 263 Z" fill="#E0F2FE" />
          <path d="M114 170 Q160 164 206 170 L205 262 Q160 270 115 262 Z" fill={`url(#clothShade_${uid})`} />
          <path d="M116 171 Q160 190 204 171" stroke="#BAE6FD" strokeWidth="5" fill="none" strokeLinecap="round" />
          <polygon points="160,188 170,204 160,220 150,204" fill="#A5F3FC" filter={`url(#glowEffect_${uid})`} />
          <circle cx="136" cy="226" r="3.5" fill="#E0F2FE" />
          <circle cx="184" cy="226" r="3.5" fill="#E0F2FE" />
        </g>
      )}

      {/* 18. Chiến Giáp Biệt Đội Hoàng Kim */}
      {outfitId === 'outfit_ranger_gold' && (
        <g id="outfit_ranger_gold_group">
          <path d="M116 170 Q160 164 204 170 L198 244 Q160 250 122 244 Z" fill={`url(#goldMetal_${uid})`} />
          <path d="M116 170 L146 170 L160 208 L174 170 L204 170 L190 198 L160 218 L130 198 Z" fill="#FEF08A" />
          <path d="M116 170 Q160 164 204 170 L198 244 Q160 250 122 244 Z" fill={`url(#clothShade_${uid})`} />
          <circle cx="160" cy="192" r="10" fill="#EF4444" />
          <rect x="122" y="226" width="76" height="11" rx="4" fill="#1E293B" />
          <polygon points="160,221 169,231.5 160,242 151,231.5" fill="#FACC15" />
        </g>
      )}

      {/* 19. Bộ Giáp Phi Hành Gia Lượng Tử */}
      {outfitId === 'outfit_cyber' && (
        <g id="outfit_cyber_group">
          <path d="M116 170 Q160 164 204 170 L198 244 Q160 250 122 244 Z" fill={`url(#cyberSuit_${uid})`} />
          <circle cx="160" cy="204" r="16" fill="#0EA5E9" filter={`url(#glowEffect_${uid})`} />
          <circle cx="160" cy="204" r="8.5" fill="#A5F3FC" />
          <line x1="130" y1="189" x2="145" y2="189" stroke="#22D3EE" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="175" y1="189" x2="190" y2="189" stroke="#22D3EE" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      )}

      {/* 20. Giáp Phi Công Robot Biến Hình */}
      {outfitId === 'outfit_mecha_pilot' && (
        <g id="outfit_mecha_pilot_group">
          <path d="M116 170 Q160 164 204 170 L198 244 Q160 250 122 244 Z" fill="#1E293B" />
          <polygon points="118,170 142,170 136,202 120,196" fill="#EF4444" />
          <polygon points="202,170 178,170 184,202 200,196" fill="#2563EB" />
          <polygon points="142,172 178,172 172,222 148,222" fill={`url(#silverMetal_${uid})`} />
          <circle cx="160" cy="196" r="12" fill="#0EA5E9" filter={`url(#glowEffect_${uid})`} />
          <polygon points="154,196 160,188 166,196 160,204" fill="#FEF08A" />
          <rect x="122" y="226" width="76" height="11" rx="5" fill="#FACC15" />
        </g>
      )}
    </g>
  );
};
