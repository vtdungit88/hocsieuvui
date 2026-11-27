import React from 'react';
import { type VanMieuZoneId } from '../data/vanMieuWorld';

interface City3DLandmarkProps {
  destKey: string;
  mode?: 'stage' | 'card';
  lighting?: 'day' | 'sunset' | 'night';
  zone?: VanMieuZoneId;
  className?: string;
}

/**
 * Crisp 3D isometric / perspective vector landmarks for the 10 Vietnamese destinations.
 * Used both as the panoramic backdrop of the live Social Lobby ("stage")
 * and as miniature 3D dioramas inside the Vietnam Travel Map ("card").
 */
export const City3DLandmark: React.FC<City3DLandmarkProps> = ({
  destKey,
  mode = 'stage',
  lighting = 'day',
  zone = 'heritage_plaza',
  className = ''
}) => {
  const uid = `${mode}_${destKey}_${lighting}_${zone}`;
  const isCard = mode === 'card';
  const viewBox = '0 0 1200 540';

  const renderScene = () => {
    switch (destKey) {
      case 'hanoi_ho_guom':
        return (
          <>
            <defs>
              <linearGradient id={`sky_${uid}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="56%" stopColor="#bae6fd" />
                <stop offset="100%" stopColor="#fef3c7" />
              </linearGradient>
              <linearGradient id={`lake_${uid}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="55%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>
            <rect width="1200" height="540" fill={`url(#sky_${uid})`} />
            <circle cx="960" cy="88" r="42" fill="#fde047" opacity="0.92" />
            <ellipse cx="230" cy="82" rx="84" ry="22" fill="#ffffff" opacity="0.82" />
            <ellipse cx="700" cy="68" rx="96" ry="24" fill="#ffffff" opacity="0.72" />
            <path d="M0 245 L110 212 L220 238 L350 198 L480 235 L680 206 L860 235 L1040 194 L1200 225 L1200 280 L0 280 Z" fill="#93c5fd" opacity="0.55" />
            {/* Hoan Kiem Jade Water */}
            <rect x="0" y="255" width="1200" height="115" fill={`url(#lake_${uid})`} />
            <ellipse cx="600" cy="300" rx="460" ry="30" fill="#34d399" opacity="0.25" />
            {/* Turtle Tower Isometric Island */}
            <ellipse cx="600" cy="296" rx="96" ry="18" fill="#15803d" />
            <ellipse cx="600" cy="292" rx="82" ry="13" fill="#22c55e" />
            <polygon points="562,286 600,275 638,286 600,295" fill="#d97706" />
            <rect x="572" y="246" width="56" height="40" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
            <rect x="580" y="220" width="40" height="28" fill="#fef9c3" stroke="#b45309" strokeWidth="2" />
            <polygon points="574,220 600,196 626,220" fill="#b45309" />
            <rect x="592" y="256" width="16" height="24" rx="8" fill="#78350f" />
            {/* Iconic Red The Huc Bridge */}
            <path d="M770 296 Q890 242 1010 296" fill="none" stroke="#dc2626" strokeWidth="14" strokeLinecap="round" />
            <path d="M770 288 Q890 234 1010 288" fill="none" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
            {/* Stone Walkway Plaza */}
            <polygon points="0,350 1200,350 1200,540 0,540" fill="#f1f5f9" />
            <polygon points="0,350 1200,350 1200,372 0,372" fill="#cbd5e1" />
            {/* Willow Trees */}
            <circle cx="150" cy="255" r="46" fill="#16a34a" />
            <circle cx="195" cy="268" r="36" fill="#22c55e" />
            <rect x="164" y="290" width="14" height="62" fill="#78350f" />
            <circle cx="1075" cy="265" r="48" fill="#15803d" />
            <rect x="1068" y="296" width="14" height="58" fill="#78350f" />
          </>
        );

      case 'halong_bay':
        return (
          <>
            <defs>
              <linearGradient id={`sky_${uid}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="55%" stopColor="#7dd3fc" />
                <stop offset="100%" stopColor="#e0f2fe" />
              </linearGradient>
              <linearGradient id={`sea_${uid}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0d9488" />
                <stop offset="50%" stopColor="#0891b2" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
            </defs>
            <rect width="1200" height="540" fill={`url(#sky_${uid})`} />
            <circle cx="220" cy="86" r="44" fill="#fef08a" />
            <ellipse cx="550" cy="76" rx="110" ry="26" fill="#ffffff" opacity="0.82" />
            {/* Sea */}
            <rect x="0" y="240" width="1200" height="160" fill={`url(#sea_${uid})`} />
            {/* 3D Limestone Karsts */}
            <polygon points="150,275 215,155 275,275" fill="#1e293b" />
            <polygon points="215,155 275,275 315,275 235,165" fill="#334155" />
            <ellipse cx="215" cy="175" rx="34" ry="18" fill="#15803d" />
            <polygon points="480,285 565,120 645,285" fill="#1f2937" />
            <polygon points="565,120 645,285 690,285 590,136" fill="#334155" />
            <ellipse cx="568" cy="145" rx="46" ry="22" fill="#16a34a" />
            {/* Fighting Cock Islets (Hòn Trống Mái) */}
            <polygon points="790,282 818,200 855,212 840,282" fill="#475569" />
            <polygon points="865,282 882,196 922,220 905,282" fill="#334155" />
            {/* Red Wooden Sailboat */}
            <polygon points="340,295 455,295 435,315 358,315" fill="#78350f" />
            <polygon points="395,210 395,292 442,278" fill="#dc2626" />
            <polygon points="388,225 388,292 348,282" fill="#ef4444" />
            {/* Wooden Pier Deck */}
            <polygon points="0,350 1200,350 1200,540 0,540" fill="#fde68a" />
            <polygon points="0,350 1200,350 1200,372 0,372" fill="#d97706" />
            <line x1="0" y1="415" x2="1200" y2="415" stroke="#f59e0b" strokeWidth="2" opacity="0.45" />
            <line x1="0" y1="475" x2="1200" y2="475" stroke="#f59e0b" strokeWidth="2" opacity="0.45" />
          </>
        );

      case 'sapa_fansipan':
        return (
          <>
            <defs>
              <linearGradient id={`sky_${uid}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#312e81" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#c7d2fe" />
              </linearGradient>
            </defs>
            <rect width="1200" height="540" fill={`url(#sky_${uid})`} />
            <circle cx="960" cy="96" r="46" fill="#fef08a" opacity="0.92" />
            {/* Misty Mountains */}
            <polygon points="0,330 220,120 450,330" fill="#4338ca" />
            <polygon points="300,330 600,82 900,330" fill="#3730a3" />
            <polygon points="600,82 900,330 980,330 645,105" fill="#4f46e5" />
            <polygon points="780,330 1020,138 1200,330" fill="#4338ca" />
            {/* Fansipan 3143m Monument */}
            <polygon points="575,95 600,56 625,95" fill="#e2e8f0" />
            <rect x="593" y="34" width="14" height="30" fill="#dc2626" />
            {/* Golden Terraced Fields */}
            <path d="M0 315 Q300 285 600 318 T1200 308 L1200 370 L0 370 Z" fill="#84cc16" />
            <path d="M0 335 Q300 312 600 342 T1200 332 L1200 390 L0 390 Z" fill="#eab308" />
            {/* Sea of Clouds */}
            <ellipse cx="260" cy="255" rx="180" ry="26" fill="#ffffff" opacity="0.65" />
            <ellipse cx="860" cy="240" rx="210" ry="28" fill="#ffffff" opacity="0.62" />
            {/* Stone Mountain Plaza */}
            <polygon points="0,360 1200,360 1200,540 0,540" fill="#e2e8f0" />
            <polygon points="0,360 1200,360 1200,382 0,382" fill="#94a3b8" />
          </>
        );

      case 'hue_imperial':
        return (
          <>
            <defs>
              <linearGradient id={`sky_${uid}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7e22ce" />
                <stop offset="55%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#fde68a" />
              </linearGradient>
            </defs>
            <rect width="1200" height="540" fill={`url(#sky_${uid})`} />
            <circle cx="240" cy="110" r="46" fill="#fef08a" opacity="0.92" />
            {/* Perfume River */}
            <rect x="0" y="275" width="1200" height="80" fill="#38bdf8" opacity="0.82" />
            {/* Ngo Mon Imperial Gate */}
            <rect x="330" y="210" width="540" height="75" fill="#78350f" />
            <rect x="390" y="160" width="420" height="52" fill="#dc2626" />
            <polygon points="365,162 600,104 835,162" fill="#d97706" />
            <polygon points="440,126 600,82 760,126" fill="#b45309" />
            <rect x="560" y="220" width="80" height="65" rx="14" fill="#451a03" />
            <rect x="440" y="232" width="52" height="53" rx="10" fill="#451a03" />
            <rect x="708" y="232" width="52" height="53" rx="10" fill="#451a03" />
            {/* Courtyard Plaza */}
            <polygon points="0,348 1200,348 1200,540 0,540" fill="#fef3c7" />
            <polygon points="0,348 1200,348 1200,370 0,370" fill="#d97706" />
          </>
        );

      case 'danang_dragon':
        return (
          <>
            <defs>
              <linearGradient id={`sky_${uid}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="60%" stopColor="#bae6fd" />
                <stop offset="100%" stopColor="#fef08a" />
              </linearGradient>
            </defs>
            <rect width="1200" height="540" fill={`url(#sky_${uid})`} />
            <circle cx="980" cy="86" r="40" fill="#fde047" />
            {/* Han River */}
            <rect x="0" y="255" width="1200" height="100" fill="#0284c7" />
            {/* City Skyline */}
            <rect x="110" y="135" width="76" height="125" fill="#64748b" />
            <rect x="200" y="95" width="64" height="165" fill="#475569" />
            <rect x="920" y="120" width="82" height="140" fill="#475569" />
            <rect x="1020" y="150" width="70" height="110" fill="#64748b" />
            {/* Iconic Golden Dragon Bridge */}
            <rect x="120" y="280" width="960" height="18" fill="#cbd5e1" />
            <path
              d="M220 280 Q320 205 420 280 Q530 198 640 280 Q750 205 860 280"
              fill="none"
              stroke="#eab308"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <circle cx="888" cy="242" r="24" fill="#facc15" stroke="#ca8a04" strokeWidth="4" />
            <polygon points="908,236 965,214 958,258" fill="#fb923c" opacity="0.85" />
            {/* Riverfront Promenade */}
            <polygon points="0,348 1200,348 1200,540 0,540" fill="#e2e8f0" />
            <polygon points="0,348 1200,348 1200,372 0,372" fill="#94a3b8" />
          </>
        );

      case 'nhatrang_beach':
        return (
          <>
            <defs>
              <linearGradient id={`sky_${uid}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="65%" stopColor="#67e8f9" />
                <stop offset="100%" stopColor="#ecfeff" />
              </linearGradient>
            </defs>
            <rect width="1200" height="540" fill={`url(#sky_${uid})`} />
            <circle cx="960" cy="86" r="44" fill="#fde047" />
            {/* Turquoise Ocean */}
            <rect x="0" y="230" width="1200" height="125" fill="#06b6d4" />
            <path d="M0 325 Q300 305 600 328 T1200 318 L1200 360 L0 360 Z" fill="#ffffff" opacity="0.55" />
            {/* Tram Huong Tower */}
            <polygon points="565,265 635,265 616,135 584,135" fill="#fb7185" />
            <polygon points="575,138 625,138 600,98" fill="#f59e0b" />
            {/* Golden Beach Sand */}
            <polygon points="0,345 1200,345 1200,540 0,540" fill="#fde68a" />
            <polygon points="0,345 1200,345 1200,368 0,368" fill="#fcd34d" />
            {/* Coconut Palm Trees */}
            <rect x="132" y="195" width="16" height="160" fill="#92400e" />
            <ellipse cx="140" cy="192" rx="68" ry="18" fill="#16a34a" />
            <ellipse cx="140" cy="192" rx="18" ry="52" fill="#15803d" />
            <rect x="1040" y="205" width="16" height="150" fill="#92400e" />
            <ellipse cx="1048" cy="202" rx="64" ry="18" fill="#16a34a" />
          </>
        );

      case 'dalat_flowers':
        return (
          <>
            <defs>
              <linearGradient id={`sky_${uid}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="55%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#fce7f3" />
              </linearGradient>
            </defs>
            <rect width="1200" height="540" fill={`url(#sky_${uid})`} />
            <circle cx="240" cy="96" r="42" fill="#fef08a" />
            {/* Pine Hills */}
            <path d="M0 280 Q240 190 540 265 T1200 250 L1200 320 L0 320 Z" fill="#15803d" />
            {/* Xuan Huong Lake */}
            <rect x="0" y="275" width="1200" height="75" fill="#38bdf8" />
            {/* Giant Yellow Wild Sunflower Dome (Quảng Trường Lâm Viên) */}
            <polygon points="480,285 600,150 720,285" fill="#facc15" stroke="#ca8a04" strokeWidth="5" />
            <polygon points="520,285 600,185 680,285" fill="#eab308" />
            <polygon points="750,285 820,192 890,285" fill="#22c55e" opacity="0.88" />
            {/* Pine Trees */}
            <polygon points="120,290 165,165 210,290" fill="#166534" />
            <polygon points="190,300 235,180 280,300" fill="#14532d" />
            <polygon points="990,295 1035,168 1080,295" fill="#166534" />
            {/* Flower Square Ground */}
            <polygon points="0,348 1200,348 1200,540 0,540" fill="#f3e8ff" />
            <polygon points="0,348 1200,348 1200,372 0,372" fill="#c084fc" />
          </>
        );

      case 'hcm_landmark':
        return (
          <>
            <defs>
              <linearGradient id={`sky_${uid}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ea580c" />
                <stop offset="50%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#fef3c7" />
              </linearGradient>
            </defs>
            <rect width="1200" height="540" fill={`url(#sky_${uid})`} />
            <circle cx="940" cy="100" r="46" fill="#fef08a" />
            {/* Saigon River */}
            <rect x="0" y="275" width="1200" height="75" fill="#0284c7" />
            {/* Landmark 81 Isometric Tower */}
            <rect x="572" y="45" width="56" height="240" fill="#38bdf8" />
            <rect x="546" y="105" width="26" height="180" fill="#0284c7" />
            <rect x="628" y="122" width="26" height="163" fill="#0369a1" />
            <line x1="600" y1="15" x2="600" y2="45" stroke="#ffffff" strokeWidth="5" />
            {/* Ben Thanh Market Clock Facade */}
            <rect x="190" y="218" width="220" height="72" fill="#fde047" stroke="#ca8a04" strokeWidth="3" />
            <polygon points="270,218 300,175 330,218" fill="#dc2626" />
            <circle cx="300" cy="235" r="14" fill="#ffffff" stroke="#78350f" strokeWidth="3" />
            {/* City Plaza */}
            <polygon points="0,348 1200,348 1200,540 0,540" fill="#e2e8f0" />
            <polygon points="0,348 1200,348 1200,372 0,372" fill="#94a3b8" />
          </>
        );

      case 'phuquoc_island':
        return (
          <>
            <defs>
              <linearGradient id={`sky_${uid}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="48%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#fde047" />
              </linearGradient>
            </defs>
            <rect width="1200" height="540" fill={`url(#sky_${uid})`} />
            {/* Sunset Over Ocean */}
            <circle cx="600" cy="215" r="76" fill="#fef08a" opacity="0.92" />
            <rect x="0" y="230" width="1200" height="120" fill="#0ea5e9" />
            <ellipse cx="600" cy="265" rx="180" ry="20" fill="#fb923c" opacity="0.55" />
            {/* Sea-crossing Cable Car */}
            <line x1="0" y1="135" x2="1200" y2="115" stroke="#1e293b" strokeWidth="3" />
            <rect x="440" y="132" width="38" height="28" rx="6" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
            <rect x="760" y="124" width="38" height="28" rx="6" fill="#facc15" stroke="#ffffff" strokeWidth="2" />
            {/* White Sand Beach Plaza */}
            <polygon points="0,346 1200,346 1200,540 0,540" fill="#fef3c7" />
            <polygon points="0,346 1200,346 1200,370 0,370" fill="#fcd34d" />
            {/* Palm Silhouettes */}
            <rect x="140" y="190" width="16" height="165" fill="#78350f" />
            <ellipse cx="148" cy="188" rx="68" ry="18" fill="#15803d" />
            <rect x="1040" y="196" width="16" height="160" fill="#78350f" />
            <ellipse cx="1048" cy="194" rx="66" ry="18" fill="#15803d" />
          </>
        );

      case 'hanoi_school':
      default: {
        const isNight = lighting === 'night';
        const isSunset = lighting === 'sunset';
        const activeZone = isCard ? 'heritage_plaza' : zone;

        if (activeZone === 'pet_garden') {
          return (
            <>
              <defs>
                <linearGradient id={`sky_${uid}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isNight ? '#0f172a' : isSunset ? '#fb7185' : '#0ea5e9'} />
                  <stop offset="60%" stopColor={isNight ? '#1e293b' : isSunset ? '#fdba74' : '#7dd3fc'} />
                  <stop offset="100%" stopColor={isNight ? '#334155' : '#fef9c3'} />
                </linearGradient>
                <linearGradient id={`meadow_${uid}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isNight ? '#14532d' : '#4ade80'} />
                  <stop offset="100%" stopColor={isNight ? '#052e16' : '#16a34a'} />
                </linearGradient>
              </defs>
              <rect width="1200" height="540" fill={`url(#sky_${uid})`} />
              <circle cx={isSunset ? 920 : 220} cy="84" r="40" fill={isNight ? '#fef08a' : '#fde047'} opacity="0.92" />
              <ellipse cx="420" cy="76" rx="95" ry="22" fill="#ffffff" opacity={isNight ? 0.18 : 0.8} />
              <ellipse cx="860" cy="64" rx="110" ry="24" fill="#ffffff" opacity={isNight ? 0.16 : 0.72} />
              {/* Distant Văn Miếu silhouette reminder outside the park */}
              <polygon points="480,210 600,152 720,210" fill="#dc2626" opacity="0.28" />
              <rect x="0" y="210" width="1200" height="44" fill={isNight ? '#1e3a2f' : '#86efac'} />
              {/* Lush Sunlit Pet Park Grass */}
              <rect x="0" y="248" width="1200" height="292" fill={`url(#meadow_${uid})`} />
              {/* Winding Stone Garden Path */}
              <path d="M0 390 Q350 320 600 375 T1200 355 L1200 540 L0 540 Z" fill={isNight ? '#334155' : '#fde68a'} opacity="0.72" />
              {/* White Picket Pet Fence */}
              <line x1="0" y1="258" x2="1200" y2="258" stroke="#fef3c7" strokeWidth="8" />
              {[80, 160, 240, 320, 400, 480, 560, 640, 720, 800, 880, 960, 1040, 1120].map((fx) => (
                <rect key={fx} x={fx} y="232" width="14" height="36" rx="5" fill="#fffbeb" stroke="#d97706" strokeWidth="1.5" />
              ))}
              {/* Cute Pet Fountain (Center) */}
              <ellipse cx="600" cy="304" rx="88" ry="22" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="3" />
              <ellipse cx="600" cy="300" rx="68" ry="15" fill="#38bdf8" />
              <rect x="588" y="255" width="24" height="42" rx="6" fill="#cbd5e1" />
              <ellipse cx="600" cy="256" rx="34" ry="9" fill="#f1f5f9" />
              <circle cx="600" cy="236" r="10" fill="#7dd3fc" opacity="0.85" />
              {/* Agility Hoops & Gazebo on Right */}
              <circle cx="880" cy="285" r="34" fill="none" stroke="#f97316" strokeWidth="8" />
              <rect x="875" y="318" width="10" height="26" fill="#78350f" />
              <circle cx="96" cy="212" r="56" fill="#15803d" />
              <rect x="86" y="252" width="20" height="64" fill="#78350f" />
              <circle cx="1105" cy="214" r="56" fill="#16a34a" />
              <rect x="1095" y="252" width="20" height="64" fill="#78350f" />
            </>
          );
        }

        if (activeZone === 'adventure_island') {
          return (
            <>
              <defs>
                <linearGradient id={`sky_${uid}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isNight ? '#0f172a' : isSunset ? '#7c3aed' : '#0284c7'} />
                  <stop offset="55%" stopColor={isNight ? '#1e1b4b' : isSunset ? '#f43f5e' : '#38bdf8'} />
                  <stop offset="100%" stopColor={isNight ? '#312e81' : '#cffafe'} />
                </linearGradient>
                <linearGradient id={`stream_${uid}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
              </defs>
              <rect width="1200" height="540" fill={`url(#sky_${uid})`} />
              <circle cx="940" cy="88" r="40" fill="#fef08a" opacity="0.9" />
              {/* Distant Fantasy Floating Rocks */}
              <polygon points="110,230 240,120 370,230" fill="#4f46e5" opacity="0.35" />
              <polygon points="820,240 980,108 1140,240" fill="#0ea5e9" opacity="0.35" />
              {/* Waterfall & Jade Fishing Stream (Suối Ngọc outside Văn Miếu) */}
              <rect x="640" y="190" width="90" height="125" rx="18" fill="#bae6fd" opacity="0.85" />
              <path d="M560 290 L1200 290 L1200 390 L610 390 Z" fill={`url(#stream_${uid})`} opacity="0.92" />
              <ellipse cx="920" cy="336" rx="180" ry="18" fill="#7dd3fc" opacity="0.35" />
              {/* Wooden Adventure Bridge & Parkour Track Platform */}
              <rect x="0" y="275" width="630" height="265" fill={isNight ? '#14532d' : '#4ade80'} />
              <polygon points="0,350 1200,350 1200,540 0,540" fill={isNight ? '#334155' : '#fde68a'} />
              {/* Wooden Hurdle & Checkered Race Banner */}
              <rect x="210" y="220" width="12" height="90" fill="#78350f" />
              <rect x="390" y="220" width="12" height="90" fill="#78350f" />
              <rect x="200" y="205" width="212" height="32" rx="8" fill="#ef4444" stroke="#facc15" strokeWidth="3" />
              {/* Bouncy Mushroom Pads */}
              <ellipse cx="145" cy="322" rx="34" ry="14" fill="#ec4899" />
              <rect x="136" y="326" width="18" height="22" fill="#fef3c7" />
              {/* Wooden Fishing Dock extending over Suối Ngọc */}
              <polygon points="730,335 880,335 900,375 710,375" fill="#b45309" stroke="#78350f" strokeWidth="3" />
            </>
          );
        }

        if (activeZone === 'festival_home') {
          return (
            <>
              <defs>
                <linearGradient id={`sky_${uid}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isNight ? '#1e1b4b' : isSunset ? '#be185d' : '#2563eb'} />
                  <stop offset="60%" stopColor={isNight ? '#4c1d95' : isSunset ? '#fb7185' : '#60a5fa'} />
                  <stop offset="100%" stopColor={isNight ? '#701a75' : '#fef3c7'} />
                </linearGradient>
              </defs>
              <rect width="1200" height="540" fill={`url(#sky_${uid})`} />
              {/* Festive String Lights */}
              <path d="M60 110 Q320 155 600 115 Q880 155 1140 110" fill="none" stroke="#fde047" strokeWidth="3" />
              {[140, 260, 380, 500, 700, 820, 940, 1060].map((lx, idx) => (
                <circle key={lx} cx={lx} cy={128} r="10" fill={idx % 2 === 0 ? '#fb7185' : '#facc15'} />
              ))}
              {/* Center Music Festival Stage */}
              <polygon points="390,260 810,260 850,315 350,315" fill="#7c3aed" stroke="#facc15" strokeWidth="4" />
              <rect x="430" y="165" width="340" height="96" rx="14" fill="#312e81" stroke="#38bdf8" strokeWidth="3" />
              <polygon points="400,168 600,115 800,168" fill="#db2777" />
              {/* Cozy Cottage Porch on Right + Fashion Boutique on Left */}
              <rect x="75" y="205" width="210" height="90" rx="12" fill="#fce7f3" stroke="#ec4899" strokeWidth="3" />
              <polygon points="60,210 295,210 275,168 80,168" fill="#ec4899" />
              <rect x="915" y="200" width="210" height="95" rx="12" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
              <polygon points="895,204 1145,204 1020,148" fill="#ea580c" />
              {/* Warm Stone & Lawn Plaza */}
              <rect x="0" y="295" width="1200" height="245" fill={isNight ? '#1e293b' : '#fed7aa'} />
              <polygon points="340,315 860,315 960,540 240,540" fill={isNight ? '#334155' : '#fef3c7'} opacity="0.82" />
            </>
          );
        }

        return (
          <>
            <defs>
              <linearGradient id={`sky_${uid}`} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={isNight ? '#0f172a' : isSunset ? '#7c3aed' : '#0284c7'}
                />
                <stop
                  offset="54%"
                  stopColor={isNight ? '#1e1b4b' : isSunset ? '#fb7185' : '#60a5fa'}
                />
                <stop
                  offset="100%"
                  stopColor={isNight ? '#312e81' : isSunset ? '#fde68a' : '#dbeafe'}
                />
              </linearGradient>
              <linearGradient id={`courtyard_${uid}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isNight ? '#475569' : '#fed7aa'} />
                <stop offset="55%" stopColor={isNight ? '#334155' : '#fdba74'} />
                <stop offset="100%" stopColor={isNight ? '#1e293b' : '#f59e0b'} stopOpacity={isNight ? 1 : 0.48} />
              </linearGradient>
              <linearGradient id={`pond_${uid}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={isNight ? '#0f766e' : '#2dd4bf'} />
                <stop offset="100%" stopColor={isNight ? '#134e4a' : '#0284c7'} />
              </linearGradient>
              <linearGradient id={`roofRed_${uid}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>
              <radialGradient id={`portalGlow_${uid}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#e0f2fe" />
                <stop offset="45%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Sky */}
            <rect width="1200" height="540" fill={`url(#sky_${uid})`} />

            {/* Stars or Clouds & Sun/Moon */}
            {isNight ? (
              <>
                <circle cx="960" cy="74" r="32" fill="#fef08a" opacity="0.92" />
                <circle cx="972" cy="68" r="28" fill="#1e1b4b" />
                {[
                  [130, 52], [260, 88], [390, 44], [520, 74], [740, 56], [850, 92], [1080, 48]
                ].map(([sx, sy], idx) => (
                  <circle key={idx} cx={sx} cy={sy} r={idx % 2 === 0 ? 3 : 2} fill="#fef9c3" opacity="0.85" />
                ))}
              </>
            ) : (
              <>
                <circle
                  cx={isSunset ? 920 : 210}
                  cy={isSunset ? 120 : 72}
                  r="42"
                  fill={isSunset ? '#fbbf24' : '#fef08a'}
                  opacity="0.9"
                />
                <ellipse cx="260" cy="70" rx="95" ry="24" fill="#ffffff" opacity="0.82" />
                <ellipse cx="880" cy="60" rx="115" ry="26" fill="#ffffff" opacity="0.75" />
                <ellipse cx="470" cy="92" rx="68" ry="18" fill="#ffffff" opacity="0.68" />
              </>
            )}

            {/* Distant Lush Canopy */}
            <g opacity={isNight ? 0.55 : 1}>
              <circle cx="95" cy="175" r="78" fill="#15803d" />
              <circle cx="200" cy="188" r="64" fill="#16a34a" />
              <circle cx="330" cy="185" r="56" fill="#22c55e" />
              <circle cx="885" cy="185" r="58" fill="#22c55e" />
              <circle cx="1010" cy="180" r="68" fill="#16a34a" />
              <circle cx="1115" cy="172" r="80" fill="#15803d" />
            </g>

            {/* Long Flanking Red-Tiled Galleries & Stone Stele Garden (Vườn Bia Tiến Sĩ) */}
            <rect x="75" y="198" width="1050" height="58" fill={isNight ? '#334155' : '#fef3c7'} />
            <polygon points="55,198 1145,198 1120,162 80,162" fill={`url(#roofRed_${uid})`} />
            <rect x="75" y="246" width="1050" height="12" fill="#cbd5e1" />
            {/* Doctor Stone Steles on Turtle Pedestals */}
            {[160, 240, 320, 405, 795, 880, 960, 1040].map((bx) => (
              <g key={bx}>
                <ellipse cx={bx} cy="242" rx="18" ry="6" fill="#64748b" />
                <rect x={bx - 12} y="208" width="24" height="32" rx="4" fill="#94a3b8" />
                <rect x={bx - 8} y="213" width="16" height="22" rx="2" fill="#cbd5e1" />
              </g>
            ))}

            {/* Iconic 2-Tier Khuê Văn Các Pavilion (Center Hero) */}
            <g>
              {/* Stone Foundation & Steps */}
              <polygon points="480,258 720,258 738,274 462,274" fill="#e2e8f0" />
              <polygon points="545,258 655,258 666,282 534,282" fill="#f1f5f9" />
              {/* Lower Columns & Swirl Portal Arch */}
              <rect x="505" y="192" width="190" height="66" fill="#7f1d1d" />
              {[512, 542, 650, 680].map((px) => (
                <rect key={px} x={px} y="190" width="10" height="68" rx="3" fill="#dc2626" />
              ))}
              {/* Glowing Swirling Blue Teleport Portal inside Khuê Văn Các */}
              <ellipse cx="600" cy="226" rx="42" ry="30" fill={`url(#portalGlow_${uid})`} />
              <ellipse cx="600" cy="228" rx="24" ry="26" fill="#38bdf8" opacity="0.85" />
              <ellipse cx="600" cy="228" rx="14" ry="16" fill="#e0f2fe" opacity="0.95" />

              {/* Lower Roof + Golden "Khuê Văn Các" Sign */}
              <polygon points="472,194 728,194 700,164 500,164" fill={`url(#roofRed_${uid})`} />
              <rect x="536" y="168" width="128" height="24" rx="8" fill="#78350f" stroke="#facc15" strokeWidth="2.5" />
              <text
                x="600"
                y="184"
                textAnchor="middle"
                fill="#fef08a"
                fontSize="13"
                fontWeight="900"
                fontFamily="Baloo 2, sans-serif"
              >
                Khuê Văn Các
              </text>

              {/* Upper Tier with Round Golden Sun-Window */}
              <rect x="538" y="108" width="124" height="56" fill="#991b1b" />
              <circle cx="600" cy="136" r="19" fill="#fef08a" stroke="#f59e0b" strokeWidth="3.5" />
              <circle cx="600" cy="136" r="11" fill="#78350f" />
              {[0, 45, 90, 135].map((deg) => (
                <line
                  key={deg}
                  x1="600"
                  y1="118"
                  x2="600"
                  y2="154"
                  stroke="#facc15"
                  strokeWidth="2.5"
                  transform={`rotate(${deg} 600 136)`}
                />
              ))}
              {/* Upper Curved Pavilion Roof */}
              <path d="M500 112 Q600 58 700 112 L680 118 Q600 76 520 118 Z" fill="#b91c1c" />
              <polygon points="512,112 600,66 688,112" fill={`url(#roofRed_${uid})`} />
              <circle cx="600" cy="60" r="7" fill="#facc15" />
            </g>

            {/* Courtyard Floor & Twin Green Grass Gardens */}
            <rect x="0" y="264" width="1200" height="276" fill={isNight ? '#14532d' : '#4ade80'} />
            {/* Central Warm Terracotta Stone Walkway & Forecourt */}
            <polygon points="0,352 1200,352 1200,540 0,540" fill="#fde68a" />
            <polygon points="518,274 682,274 800,540 400,540" fill={`url(#courtyard_${uid})`} />
            <polygon points="0,352 1200,352 1200,540 0,540" fill="#fdba74" opacity="0.45" />
            {!isCard && (
              <g stroke={isNight ? '#475569' : '#ea580c'} strokeOpacity="0.22" strokeWidth="2">
                <line x1="0" y1="395" x2="1200" y2="395" />
                <line x1="0" y1="442" x2="1200" y2="442" />
                <line x1="0" y1="490" x2="1200" y2="490" />
                <line x1="600" y1="274" x2="600" y2="540" />
              </g>
            )}

            {/* Twin Blooming Lotus Ponds (Hồ Sen & Giếng Thiên Quang) */}
            <g>
              {/* Left Pond */}
              <polygon points="285,282 485,282 465,346 250,346" fill={`url(#pond_${uid})`} stroke="#e2e8f0" strokeWidth="6" />
              <ellipse cx="345" cy="316" rx="22" ry="9" fill="#22c55e" />
              <ellipse cx="420" cy="308" rx="18" ry="8" fill="#16a34a" />
              <ellipse cx="385" cy="328" rx="20" ry="8" fill="#4ade80" />
              <circle cx="344" cy="311" r="7" fill="#f472b6" />
              <circle cx="422" cy="303" r="6" fill="#fbcfe8" />

              {/* Right Pond */}
              <polygon points="715,282 915,282 950,346 735,346" fill={`url(#pond_${uid})`} stroke="#e2e8f0" strokeWidth="6" />
              <ellipse cx="785" cy="310" rx="22" ry="9" fill="#22c55e" />
              <ellipse cx="860" cy="320" rx="20" ry="8" fill="#16a34a" />
              <ellipse cx="820" cy="330" rx="16" ry="7" fill="#4ade80" />
              <circle cx="785" cy="305" r="7" fill="#f472b6" />
              <circle cx="862" cy="314" r="6" fill="#f9a8d4" />
            </g>

            {/* Decorative Lush Corner Trees, Shrubs & Stone Lanterns */}
            <g>
              <circle cx="52" cy="240" r="68" fill="#16a34a" />
              <rect x="40" y="275" width="22" height="90" fill="#78350f" />
              <circle cx="1148" cy="240" r="68" fill="#15803d" />
              <rect x="1138" y="275" width="22" height="90" fill="#78350f" />
              {/* Wooden Courtyard Fences */}
              <line x1="120" y1="342" x2="245" y2="342" stroke="#b45309" strokeWidth="6" strokeLinecap="round" />
              <line x1="955" y1="342" x2="1080" y2="342" stroke="#b45309" strokeWidth="6" strokeLinecap="round" />
            </g>

            {/* Card-mode Miniature Kiosk Preview Silhouettes */}
            {isCard && (
              <>
                <rect x="110" y="268" width="130" height="58" rx="8" fill="#92400e" />
                <polygon points="95,270 255,270 235,244 115,244" fill="#d97706" />
                <circle cx="175" cy="296" r="18" fill="#dc2626" stroke="#facc15" strokeWidth="4" />
                <rect x="960" y="268" width="130" height="58" rx="8" fill="#f59e0b" />
                <polygon points="945,270 1105,270 1085,244 965,244" fill="#0284c7" />
              </>
            )}
          </>
        );
      }
    }
  };

  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      className={`w-full h-full block ${className}`}
      aria-hidden="true"
    >
      {renderScene()}
    </svg>
  );
};
