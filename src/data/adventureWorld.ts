export type AdventureRealmId =
  | 'van_hien'
  | 'forest'
  | 'sky_island'
  | 'ocean_kingdom'
  | 'dino_valley'
  | 'candy_land';

export interface RealmLandmark {
  id: string;
  name: string;
  subtitle: string;
  story: string;
  artType:
    | 'khue_van_cac'
    | 'bia_tien_si'
    | 'ho_sen'
    | 'waterfall'
    | 'crystal_cave'
    | 'ancient_tree'
    | 'rainbow_bridge'
    | 'wind_arena'
    | 'star_observatory'
    | 'pearl_palace'
    | 'coral_reef'
    | 'sunken_ship'
    | 'dino_nest'
    | 'fossil_cave'
    | 'volcano_spring'
    | 'cake_castle'
    | 'choco_river'
    | 'lollipop_grove';
  x: number;
  y: number;
  iconBg: string;
}

export interface RealmSecretItem {
  id: string;
  name: string;
  hint: string;
  x: number;
  y: number;
  color: string;
  accent: string;
  shape: 'scroll' | 'gem' | 'feather' | 'pearl' | 'amber' | 'candy';
}

export interface RealmNpc {
  id: string;
  name: string;
  role: string;
  x: number;
  y: number;
  robeColor: string;
  hatColor: string;
  greeting: string;
  questTitle: string;
  questDesc: string;
  miniGameKind: 'lantern_match' | 'firefly_tap' | 'star_catch' | 'shell_rhythm' | 'fossil_dig' | 'candy_rain';
}

export interface AdventureRealm {
  id: AdventureRealmId;
  order: number;
  code: string;
  name: string;
  shortName: string;
  tagline: string;
  badgeName: string;
  badgeColor: string;
  unlockRequirement: number; // total stars/points from previous realm (0 for first)
  palette: {
    skyTop: string;
    skyBottom: string;
    cloudTint: string;
    grassTop: string;
    grassLight: string;
    cliffFront: string;
    cliffSide: string;
    pathStone: string;
    pathEdge: string;
    waterColor: string;
    accentGlow: string;
  };
  landmarks: RealmLandmark[];
  secrets: RealmSecretItem[];
  npc: RealmNpc;
  chest: {
    id: string;
    name: string;
    x: number;
    y: number;
    rewardTitle: string;
    starsBonus: number;
  };
  portalPos: { x: number; y: number };
  startPos: { x: number; y: number };
}

export const ADVENTURE_REALMS: AdventureRealm[] = [
  {
    id: 'van_hien',
    order: 1,
    code: '01',
    name: 'Vùng Đất Văn Hiến',
    shortName: 'Văn Hiến',
    tagline: 'Khuê Văn Các, hồ sen ngát hương & vườn bia Tiến sĩ thanh tịnh',
    badgeName: 'Sứ Giả Văn Hiến',
    badgeColor: 'from-amber-400 to-red-600',
    unlockRequirement: 0,
    palette: {
      skyTop: '#bae6fd',
      skyBottom: '#fef3c7',
      cloudTint: '#ffffff',
      grassTop: '#65c466',
      grassLight: '#86efac',
      cliffFront: '#8d5b3e',
      cliffSide: '#6e432b',
      pathStone: '#f5dec2',
      pathEdge: '#d97706',
      waterColor: '#38bdf8',
      accentGlow: '#fbbf24'
    },
    startPos: { x: 22, y: 72 },
    portalPos: { x: 84, y: 26 },
    landmarks: [
      {
        id: 'vh_khuevan',
        name: 'Khuê Văn Các',
        subtitle: 'Biểu tượng ngàn năm rực sáng',
        story: 'Tòa gác mái ngói đỏ hai tầng soi bóng xuống giếng Thiên Quang, nơi lưu giữ tinh hoa hiếu học.',
        artType: 'khue_van_cac',
        x: 50,
        y: 38,
        iconBg: 'from-red-500 to-amber-500'
      },
      {
        id: 'vh_bia',
        name: 'Vườn Bia Rùa Vàng',
        subtitle: '82 tấm bia đá cổ uy nghiêm',
        story: 'Những chú rùa đá vững chãi nâng đỡ tấm bia khắc hoa văn mây rồng tuyệt đẹp.',
        artType: 'bia_tien_si',
        x: 30,
        y: 48,
        iconBg: 'from-amber-600 to-stone-600'
      },
      {
        id: 'vh_hosen',
        name: 'Hồ Sen Ánh Sao',
        subtitle: 'Mặt nước trong xanh nở hoa sen',
        story: 'Từng đóa sen hồng rung rinh trên mặt hồ phẳng lặng phản chiếu ánh nắng vàng ấm áp.',
        artType: 'ho_sen',
        x: 68,
        y: 58,
        iconBg: 'from-teal-500 to-cyan-500'
      }
    ],
    secrets: [
      {
        id: 'sec_vh_brush',
        name: 'Bút Lông Ngọc Bích',
        hint: 'Giấu gần gốc cây đa bên trái bia đá',
        x: 19,
        y: 54,
        color: '#10b981',
        accent: '#a7f3d0',
        shape: 'scroll'
      },
      {
        id: 'sec_vh_seal',
        name: 'Ấn Rồng Vàng Cổ',
        hint: 'Lấp lánh cạnh bậc thềm Khuê Văn Các',
        x: 58,
        y: 44,
        color: '#f59e0b',
        accent: '#fef08a',
        shape: 'gem'
      },
      {
        id: 'sec_vh_lantern',
        name: 'Đèn Kéo Quân Tí Hon',
        hint: 'Nổi nhẹ bên bờ Hồ Sen',
        x: 78,
        y: 66,
        color: '#ef4444',
        accent: '#fde047',
        shape: 'scroll'
      }
    ],
    npc: {
      id: 'npc_vh_rua',
      name: 'Cụ Rùa Thông Thái',
      role: 'Người Giữ Chìa Khóa Cổ',
      x: 42,
      y: 63,
      robeColor: '#b45309',
      hatColor: '#facc15',
      greeting: 'Chào nhà thám hiểm nhí! Cháu hãy thắp sáng 4 chiếc đèn lồng cổ để mở bí mật của Văn Hiến nhé!',
      questTitle: 'Thắp Sáng Đêm Hội Văn Hiến',
      questDesc: 'Chạm lần lượt vào các chiếc đèn lồng đang tối trước khi hết giờ!',
      miniGameKind: 'lantern_match'
    },
    chest: {
      id: 'chest_vh',
      name: 'Rương Bảo Vật Văn Hiến',
      x: 75,
      y: 40,
      rewardTitle: 'Huy Chương Ngọn Đuốc Vàng',
      starsBonus: 3
    }
  },
  {
    id: 'forest',
    order: 2,
    code: '02',
    name: 'Rừng Bí Ẩn',
    shortName: 'Rừng Bí Ẩn',
    tagline: 'Rừng cây ngàn năm, thác pha lê, hang động đom đóm & kho báu',
    badgeName: 'Nhà Thám Hiểm Rừng Xanh',
    badgeColor: 'from-emerald-500 to-teal-700',
    unlockRequirement: 2,
    palette: {
      skyTop: '#a7f3d0',
      skyBottom: '#ecfdf5',
      cloudTint: '#f0fdf4',
      grassTop: '#22c55e',
      grassLight: '#4ade80',
      cliffFront: '#57534e',
      cliffSide: '#44403c',
      pathStone: '#d6d3d1',
      pathEdge: '#15803d',
      waterColor: '#06b6d4',
      accentGlow: '#34d399'
    },
    startPos: { x: 20, y: 70 },
    portalPos: { x: 84, y: 27 },
    landmarks: [
      {
        id: 'fr_waterfall',
        name: 'Thác Pha Lê 3 Tầng',
        subtitle: 'Dòng nước trắng xóa mát lành',
        story: 'Nước suối đổ từ vách đá cao tạo thành hồ cầu vồng lấp lánh giữa rừng sâu.',
        artType: 'waterfall',
        x: 68,
        y: 38,
        iconBg: 'from-cyan-500 to-blue-600'
      },
      {
        id: 'fr_cave',
        name: 'Hang Động Đom Đóm',
        subtitle: 'Những tinh thể tím phát sáng',
        story: 'Bên trong hang đá có hàng trăm chú đom đóm bay lượn dẫn lối tới kho báu.',
        artType: 'crystal_cave',
        x: 34,
        y: 42,
        iconBg: 'from-purple-500 to-indigo-600'
      },
      {
        id: 'fr_tree',
        name: 'Cây Cổ Thụ Ngàn Năm',
        subtitle: 'Ngôi nhà trên cây của Tinh Linh',
        story: 'Thân cây khổng lồ với cầu thang xoắn và chiếc đèn lồng treo trên cành cao.',
        artType: 'ancient_tree',
        x: 50,
        y: 62,
        iconBg: 'from-emerald-500 to-lime-600'
      }
    ],
    secrets: [
      {
        id: 'sec_fr_crystal',
        name: 'Pha Lê Rừng Sâu',
        hint: 'Phát sáng bên cửa Hang Đom Đóm',
        x: 22,
        y: 46,
        color: '#a855f7',
        accent: '#e9d5ff',
        shape: 'gem'
      },
      {
        id: 'sec_fr_mushroom',
        name: 'Nấm Phát Sáng Xanh',
        hint: 'Mọc dưới tán Cây Cổ Thụ',
        x: 42,
        y: 72,
        color: '#14b8a6',
        accent: '#99f6e4',
        shape: 'gem'
      },
      {
        id: 'sec_fr_leaf',
        name: 'Chiếc Lá Vàng Cổ',
        hint: 'Trôi cạnh chân Thác Pha Lê',
        x: 78,
        y: 52,
        color: '#eab308',
        accent: '#fef08a',
        shape: 'feather'
      }
    ],
    npc: {
      id: 'npc_fr_fairy',
      name: 'Tinh Linh Rừng Xanh',
      role: 'Người Canh Thác Nước',
      x: 36,
      y: 63,
      robeColor: '#10b981',
      hatColor: '#c084fc',
      greeting: 'Đêm nay đom đóm bay khắp rừng! Cháu giúp ta bắt 6 chú đom đóm phát sáng để mở rương nhé!',
      questTitle: 'Bắt Đom Đóm Hang Pha Lê',
      questDesc: 'Chạm nhanh vào những chú đom đóm phát sáng bay ra trên màn hình!',
      miniGameKind: 'firefly_tap'
    },
    chest: {
      id: 'chest_fr',
      name: 'Rương Rừng Pha Lê',
      x: 76,
      y: 66,
      rewardTitle: 'Vương Miện Lá Ngọc',
      starsBonus: 3
    }
  },
  {
    id: 'sky_island',
    order: 3,
    code: '03',
    name: 'Đảo Trên Mây',
    shortName: 'Đảo Trên Mây',
    tagline: 'Đảo bay lơ lửng, cầu cầu vồng & đường đua trên không',
    badgeName: 'Kỵ Sĩ Cầu Vồng',
    badgeColor: 'from-sky-400 to-indigo-600',
    unlockRequirement: 4,
    palette: {
      skyTop: '#7dd3fc',
      skyBottom: '#f0f9ff',
      cloudTint: '#ffffff',
      grassTop: '#38bdf8',
      grassLight: '#bae6fd',
      cliffFront: '#94a3b8',
      cliffSide: '#64748b',
      pathStone: '#fbcfe8',
      pathEdge: '#f472b6',
      waterColor: '#e0f2fe',
      accentGlow: '#f472b6'
    },
    startPos: { x: 20, y: 70 },
    portalPos: { x: 84, y: 27 },
    landmarks: [
      {
        id: 'sky_bridge',
        name: 'Cầu Cầu Vồng 7 Sắc',
        subtitle: 'Cây cầu ánh sáng nối các đảo bay',
        story: 'Bước chân lên cầu cầu vồng tạo thành những nốt nhạc leng keng giữa bầu trời.',
        artType: 'rainbow_bridge',
        x: 50,
        y: 52,
        iconBg: 'from-pink-500 to-amber-400'
      },
      {
        id: 'sky_wind',
        name: 'Đấu Trường Cối Xay Gió',
        subtitle: 'Đường đua lướt mây tốc độ',
        story: 'Những cánh quạt khổng lồ quay đều tạo luồng gió nâng các nhà thám hiểm bay cao.',
        artType: 'wind_arena',
        x: 30,
        y: 40,
        iconBg: 'from-sky-500 to-cyan-500'
      },
      {
        id: 'sky_obs',
        name: 'Đài Thiên Văn Sao Băng',
        subtitle: 'Kính viễn vọng ngắm dải ngân hà',
        story: 'Mỗi buổi chiều hoàng hôn, mưa sao băng rực rỡ lướt qua đỉnh tháp pha lê.',
        artType: 'star_observatory',
        x: 72,
        y: 44,
        iconBg: 'from-indigo-500 to-purple-600'
      }
    ],
    secrets: [
      {
        id: 'sec_sky_feather',
        name: 'Lông Vũ Cầu Vồng',
        hint: 'Bay nhẹ cạnh chân Cầu Cầu Vồng',
        x: 58,
        y: 66,
        color: '#ec4899',
        accent: '#fbcfe8',
        shape: 'feather'
      },
      {
        id: 'sec_sky_star',
        name: 'Mảnh Sao Băng Xanh',
        hint: 'Rơi bên Đài Thiên Văn',
        x: 79,
        y: 58,
        color: '#38bdf8',
        accent: '#fef08a',
        shape: 'gem'
      },
      {
        id: 'sec_sky_compass',
        name: 'La Bàn Mây Trắng',
        hint: 'Đặt gần Cối Xay Gió',
        x: 20,
        y: 49,
        color: '#f59e0b',
        accent: '#fde68a',
        shape: 'scroll'
      }
    ],
    npc: {
      id: 'npc_sky_pilot',
      name: 'Phi Công Mây Trắng',
      role: 'Thuyền Trưởng Khí Cầu',
      x: 35,
      y: 66,
      robeColor: '#0284c7',
      hatColor: '#f97316',
      greeting: 'Mưa sao băng sắp bay qua Đảo Trên Mây! Hãy giúp ta hứng 6 ngôi sao vàng rơi xuống nhé!',
      questTitle: 'Hứng Mưa Sao Băng',
      questDesc: 'Chạm nhanh vào các ngôi sao sáng trước khi chúng bay mất!',
      miniGameKind: 'star_catch'
    },
    chest: {
      id: 'chest_sky',
      name: 'Rương Kho Báu Ngân Hà',
      x: 73,
      y: 67,
      rewardTitle: 'Đôi Cánh Mây Cầu Vồng',
      starsBonus: 3
    }
  },
  {
    id: 'ocean_kingdom',
    order: 4,
    code: '04',
    name: 'Vương Quốc Đại Dương',
    shortName: 'Đại Dương',
    tagline: 'Rạn san hô rực rỡ, sinh vật biển & kho báu dưới đáy nước',
    badgeName: 'Thợ Lặn Hoàng Gia',
    badgeColor: 'from-cyan-500 to-blue-700',
    unlockRequirement: 6,
    palette: {
      skyTop: '#0891b2',
      skyBottom: '#67e8f9',
      cloudTint: '#cffafe',
      grassTop: '#2dd4bf',
      grassLight: '#5eead4',
      cliffFront: '#0e7490',
      cliffSide: '#155e75',
      pathStone: '#fde68a',
      pathEdge: '#06b6d4',
      waterColor: '#0284c7',
      accentGlow: '#22d3ee'
    },
    startPos: { x: 20, y: 71 },
    portalPos: { x: 84, y: 27 },
    landmarks: [
      {
        id: 'oc_palace',
        name: 'Cung Điện Ngọc Trai',
        subtitle: 'Tòa lâu đài vỏ sò khổng lồ',
        story: 'Nơi những viên ngọc trai khổng lồ phát sáng soi rọi cả đáy biển xanh thẳm.',
        artType: 'pearl_palace',
        x: 50,
        y: 38,
        iconBg: 'from-cyan-500 to-teal-500'
      },
      {
        id: 'oc_coral',
        name: 'Rạn San Hô Cầu Vồng',
        subtitle: 'Khu vườn cá hề & sứa phát sáng',
        story: 'Hàng trăm nhánh san hô cam, hồng, tím đung đưa theo từng nhịp sóng biển.',
        artType: 'coral_reef',
        x: 29,
        y: 50,
        iconBg: 'from-rose-500 to-orange-400'
      },
      {
        id: 'oc_ship',
        name: 'Con Tàu Kho Báu Cổ',
        subtitle: 'Tàu gỗ cổ đại phủ đầy rêu ngọc',
        story: 'Chiếc thuyền buồm cổ nằm yên bình với vô số đồng tiền vàng óng ánh.',
        artType: 'sunken_ship',
        x: 71,
        y: 56,
        iconBg: 'from-amber-600 to-yellow-600'
      }
    ],
    secrets: [
      {
        id: 'sec_oc_pearl',
        name: 'Ngọc Trai Xanh Biếc',
        hint: 'Nằm trong vỏ sò gần Cung Điện',
        x: 59,
        y: 44,
        color: '#06b6d4',
        accent: '#ffffff',
        shape: 'pearl'
      },
      {
        id: 'sec_oc_shell',
        name: 'Vỏ Ốc Hát Nhạc',
        hint: 'Giấu giữa Rạn San Hô',
        x: 21,
        y: 57,
        color: '#f472b6',
        accent: '#fbcfe8',
        shape: 'pearl'
      },
      {
        id: 'sec_oc_crown',
        name: 'Vương Miện San Hô',
        hint: 'Lấp lánh bên mạn Con Tàu Cổ',
        x: 80,
        y: 64,
        color: '#facc15',
        accent: '#fef08a',
        shape: 'gem'
      }
    ],
    npc: {
      id: 'npc_oc_mermaid',
      name: 'Tiên Cá San Hô',
      role: 'Nhạc Sĩ Biển Cả',
      x: 42,
      y: 65,
      robeColor: '#06b6d4',
      hatColor: '#f472b6',
      greeting: 'Đại dương đang mở tiệc âm nhạc! Cháu hãy bấm theo đúng chuỗi 4 vỏ ốc phát sáng nhé!',
      questTitle: 'Giai Điệu Vỏ Ốc Biển',
      questDesc: 'Ghi nhớ và chạm lại đúng thứ tự các vỏ ốc phát sáng!',
      miniGameKind: 'shell_rhythm'
    },
    chest: {
      id: 'chest_oc',
      name: 'Rương Ngọc Trai Biển Sâu',
      x: 75,
      y: 39,
      rewardTitle: 'Huy Hiệu Đinh Ba Ngọc',
      starsBonus: 3
    }
  },
  {
    id: 'dino_valley',
    order: 5,
    code: '05',
    name: 'Thung Lũng Khủng Long',
    shortName: 'Khủng Long',
    tagline: 'Khủng long hoạt hình, hóa thạch cổ đại & thám hiểm núi lửa',
    badgeName: 'Nhà Khảo Cổ Tài Ba',
    badgeColor: 'from-orange-500 to-amber-700',
    unlockRequirement: 8,
    palette: {
      skyTop: '#fed7aa',
      skyBottom: '#fef3c7',
      cloudTint: '#fff7ed',
      grassTop: '#84cc16',
      grassLight: '#bef264',
      cliffFront: '#b45309',
      cliffSide: '#78350f',
      pathStone: '#fde68a',
      pathEdge: '#ea580c',
      waterColor: '#f97316',
      accentGlow: '#fb923c'
    },
    startPos: { x: 20, y: 71 },
    portalPos: { x: 84, y: 27 },
    landmarks: [
      {
        id: 'dn_nest',
        name: 'Tổ Trứng T-Rex Nhí',
        subtitle: 'Những quả trứng đốm dễ thương',
        story: 'Chú khủng long con tinh nghịch đang tập nhảy giữa những quả trứng khổng lồ.',
        artType: 'dino_nest',
        x: 31,
        y: 48,
        iconBg: 'from-lime-500 to-emerald-600'
      },
      {
        id: 'dn_fossil',
        name: 'Hang Hóa Thạch Vàng',
        subtitle: 'Dấu tích khủng long triệu năm',
        story: 'Những mảnh xương hóa thạch quý hiếm lấp lánh dưới ánh đuốc thám hiểm.',
        artType: 'fossil_cave',
        x: 52,
        y: 38,
        iconBg: 'from-amber-500 to-orange-600'
      },
      {
        id: 'dn_volcano',
        name: 'Suối Nóng Núi Lửa Hiền',
        subtitle: 'Hồ nước ấm bốc hơi lấp lánh',
        story: 'Ngọn núi lửa hiền hòa tỏa ánh sáng cam ấm áp làm nơi tắm nắng cho đàn khủng long.',
        artType: 'volcano_spring',
        x: 72,
        y: 56,
        iconBg: 'from-red-500 to-orange-500'
      }
    ],
    secrets: [
      {
        id: 'sec_dn_egg',
        name: 'Trứng Khủng Long Đốm',
        hint: 'Nấp trong bụi dương xỉ gần Tổ Trứng',
        x: 20,
        y: 56,
        color: '#84cc16',
        accent: '#fef08a',
        shape: 'amber'
      },
      {
        id: 'sec_dn_tooth',
        name: 'Răng Hóa Thạch Cổ',
        hint: 'Sáng lên ở lối vào Hang Hóa Thạch',
        x: 61,
        y: 44,
        color: '#f59e0b',
        accent: '#ffffff',
        shape: 'amber'
      },
      {
        id: 'sec_dn_amber',
        name: 'Đá Hổ Phách Lửa',
        hint: 'Lấp lánh cạnh Suối Nóng',
        x: 80,
        y: 65,
        color: '#ea580c',
        accent: '#fde047',
        shape: 'gem'
      }
    ],
    npc: {
      id: 'npc_dn_explorer',
      name: 'Bé Dino & Nhà Thám Hiểm',
      role: 'Đội Khảo Cổ Tiền Sử',
      x: 42,
      y: 64,
      robeColor: '#d97706',
      hatColor: '#65a30d',
      greeting: 'Gào~ Có 6 tảng đá chứa hóa thạch quý vừa lộ ra! Cháu chạm nhanh để khai quật giúp nhé!',
      questTitle: 'Khai Quật Hóa Thạch Cổ',
      questDesc: 'Chạm gõ liên tục vào các tảng đá để tìm đủ hóa thạch khủng long!',
      miniGameKind: 'fossil_dig'
    },
    chest: {
      id: 'chest_dn',
      name: 'Rương Hóa Thạch Hoàng Kim',
      x: 75,
      y: 39,
      rewardTitle: 'Cúp Vàng Khủng Long',
      starsBonus: 3
    }
  },
  {
    id: 'candy_land',
    order: 6,
    code: '06',
    name: 'Xứ Sở Kẹo Ngọt',
    shortName: 'Kẹo Ngọt',
    tagline: 'Nhà bánh kẹo, dòng sông sô-cô-la & thế giới cổ tích rực rỡ',
    badgeName: 'Hoàng Tử / Công Chúa Kẹo Ngọt',
    badgeColor: 'from-pink-500 to-rose-600',
    unlockRequirement: 10,
    palette: {
      skyTop: '#fbcfe8',
      skyBottom: '#fff1f2',
      cloudTint: '#fff5f7',
      grassTop: '#f9a8d4',
      grassLight: '#fbcfe8',
      cliffFront: '#92400e',
      cliffSide: '#78350f',
      pathStone: '#fef3c7',
      pathEdge: '#ec4899',
      waterColor: '#a16207',
      accentGlow: '#f472b6'
    },
    startPos: { x: 20, y: 71 },
    portalPos: { x: 84, y: 27 },
    landmarks: [
      {
        id: 'cd_castle',
        name: 'Lâu Đài Bánh Kem',
        subtitle: 'Tòa tháp kem dâu & kẹo dẻo',
        story: 'Mỗi bức tường đều làm từ bánh quy giòn tan với mái tháp kem bông xốp mịn.',
        artType: 'cake_castle',
        x: 50,
        y: 38,
        iconBg: 'from-pink-500 to-rose-500'
      },
      {
        id: 'cd_river',
        name: 'Dòng Sông Sô-Cô-La',
        subtitle: 'Cầu bánh quế bắc qua suối ngọt',
        story: 'Dòng sông sô-cô-la ấm áp lấp lánh hạt cốm 7 sắc cầu vồng.',
        artType: 'choco_river',
        x: 69,
        y: 57,
        iconBg: 'from-amber-700 to-yellow-600'
      },
      {
        id: 'cd_grove',
        name: 'Rừng Kẹo Mút Cầu Vồng',
        subtitle: 'Những cây kẹo xoắn khổng lồ',
        story: 'Mỗi khi gió thổi qua, kẹo mút phát ra âm thanh vui tai như hộp nhạc cổ tích.',
        artType: 'lollipop_grove',
        x: 29,
        y: 49,
        iconBg: 'from-fuchsia-500 to-purple-500'
      }
    ],
    secrets: [
      {
        id: 'sec_cd_lollipop',
        name: 'Kẹo Mút Cầu Vồng',
        hint: 'Xoay tròn trong Rừng Kẹo Mút',
        x: 20,
        y: 57,
        color: '#ec4899',
        accent: '#fef08a',
        shape: 'candy'
      },
      {
        id: 'sec_cd_cookie',
        name: 'Bánh Quy Ngôi Sao',
        hint: 'Đặt trên bậc thềm Lâu Đài Bánh Kem',
        x: 59,
        y: 44,
        color: '#f59e0b',
        accent: '#fffbeb',
        shape: 'candy'
      },
      {
        id: 'sec_cd_honey',
        name: 'Hũ Mật Tiên Cổ Tích',
        hint: 'Nổi bên bờ Dòng Sông Sô-Cô-La',
        x: 80,
        y: 65,
        color: '#fbbf24',
        accent: '#ffffff',
        shape: 'gem'
      }
    ],
    npc: {
      id: 'npc_cd_bear',
      name: 'Đầu Bếp Gấu Bông',
      role: 'Nghệ Nhân Bánh Cổ Tích',
      x: 42,
      y: 64,
      robeColor: '#ec4899',
      hatColor: '#ffffff',
      greeting: 'Mưa kẹo ngọt cầu vồng đang rơi! Cháu hãy hứng thật nhiều viên kẹo ngon nhất cho bữa tiệc nhé!',
      questTitle: 'Lễ Hội Mưa Kẹo Ngọt',
      questDesc: 'Chạm nhanh vào những viên kẹo ngọt rơi xuống trước khi hết giờ!',
      miniGameKind: 'candy_rain'
    },
    chest: {
      id: 'chest_cd',
      name: 'Rương Tối Thượng Kẹo Ngọt',
      x: 75,
      y: 39,
      rewardTitle: 'Vương Miện Cổ Tích Toàn Cầu',
      starsBonus: 5
    }
  }
];

export interface AdventureWorldSave {
  discoveredLandmarks: string[];
  collectedSecrets: string[];
  completedNpcs: string[];
  openedChests: string[];
  unlockedRealms: AdventureRealmId[];
  adventureStars: number;
  lastRealm: AdventureRealmId;
}

const DEFAULT_SAVE: AdventureWorldSave = {
  discoveredLandmarks: [],
  collectedSecrets: [],
  completedNpcs: [],
  openedChests: [],
  unlockedRealms: ['van_hien'],
  adventureStars: 0,
  lastRealm: 'van_hien'
};

export function loadAdventureSave(studentId: string): AdventureWorldSave {
  try {
    const raw = localStorage.getItem(`hsv_adventure_world_${studentId}`);
    if (!raw) return DEFAULT_SAVE;
    const parsed = JSON.parse(raw) as Partial<AdventureWorldSave>;
    const unlocked: AdventureRealmId[] = Array.isArray(parsed.unlockedRealms) && parsed.unlockedRealms.length > 0
      ? parsed.unlockedRealms
      : ['van_hien'];
    if (!unlocked.includes('van_hien')) unlocked.unshift('van_hien');
    return {
      discoveredLandmarks: Array.isArray(parsed.discoveredLandmarks) ? parsed.discoveredLandmarks : [],
      collectedSecrets: Array.isArray(parsed.collectedSecrets) ? parsed.collectedSecrets : [],
      completedNpcs: Array.isArray(parsed.completedNpcs) ? parsed.completedNpcs : [],
      openedChests: Array.isArray(parsed.openedChests) ? parsed.openedChests : [],
      unlockedRealms: unlocked,
      adventureStars: typeof parsed.adventureStars === 'number' ? parsed.adventureStars : 0,
      lastRealm: parsed.lastRealm && ADVENTURE_REALMS.some((r) => r.id === parsed.lastRealm)
        ? parsed.lastRealm
        : 'van_hien'
    };
  } catch {
    return DEFAULT_SAVE;
  }
}

export function saveAdventureSave(studentId: string, save: AdventureWorldSave) {
  try {
    localStorage.setItem(`hsv_adventure_world_${studentId}`, JSON.stringify(save));
  } catch {
    // ignore storage quota errors
  }
}

export function getRealmExplorationPoints(realm: AdventureRealm, save: AdventureWorldSave): number {
  const lm = realm.landmarks.filter((l) => save.discoveredLandmarks.includes(l.id)).length;
  const sec = realm.secrets.filter((s) => save.collectedSecrets.includes(s.id)).length;
  const npcDone = save.completedNpcs.includes(realm.npc.id) ? 2 : 0;
  return lm + sec + npcDone;
}

export function isRealmChestReady(realm: AdventureRealm, save: AdventureWorldSave): boolean {
  const allLandmarksDone = realm.landmarks.every((l) => save.discoveredLandmarks.includes(l.id));
  const npcDone = save.completedNpcs.includes(realm.npc.id);
  return allLandmarksDone && npcDone;
}

export type LandmarkChallengeKind = 'quiz' | 'puzzle' | 'boss';

export interface LandmarkGateInfo {
  kind: LandmarkChallengeKind;
  stepNumber: 1 | 2 | 3;
  gateTitle: string;
  gateDesc: string;
  coinsReward: number;
  xpReward: number;
  starsReward: number;
  isLocked: boolean;
  lockReason: string;
}

/**
 * Each realm has 3 distinct progressive stages:
 * - Stage 1 (landmarks[1]): Knowledge Quiz (2/3 correct)
 * - Stage 2 (landmarks[2]): Relic Memory Puzzle (match 4 pairs)
 * - Stage 3 (landmarks[0], the central monument): Boss Trial (4/5 timed questions), locked until Stage 1 & 2 cleared
 */
export function getLandmarkGateInfo(
  realm: AdventureRealm,
  landmarkId: string,
  save: AdventureWorldSave
): LandmarkGateInfo {
  const idx = realm.landmarks.findIndex((l) => l.id === landmarkId);
  if (idx === 1) {
    return {
      kind: 'quiz',
      stepNumber: 1,
      gateTitle: 'Trạm 1 · Thử Thách Tri Thức',
      gateDesc: 'Trả lời đúng ít nhất 2/3 câu hỏi theo khối lớp của bạn để mở cổng công trình.',
      coinsReward: 15,
      xpReward: 15,
      starsReward: 1,
      isLocked: false,
      lockReason: ''
    };
  }
  if (idx === 2) {
    return {
      kind: 'puzzle',
      stepNumber: 2,
      gateTitle: 'Trạm 2 · Giải Mã Cổ Vật',
      gateDesc: 'Lật tìm đủ 4 cặp biểu tượng cổ vật giống nhau để kích hoạt năng lượng vùng đất.',
      coinsReward: 20,
      xpReward: 20,
      starsReward: 1,
      isLocked: false,
      lockReason: ''
    };
  }

  // Central monument (index 0) is Stage 3 Boss Gate
  const prereqIds = realm.landmarks.slice(1).map((l) => l.id);
  const prereqsDone = prereqIds.every((id) => save.discoveredLandmarks.includes(id));
  return {
    kind: 'boss',
    stepNumber: 3,
    gateTitle: 'Trạm 3 · Cửa Ải Thủ Lĩnh Vùng',
    gateDesc: 'Đạt tối thiểu 4/5 câu trong 45 giây để nhận Huy Hiệu vùng đất & mở đường tới Rương Báu!',
    coinsReward: 35,
    xpReward: 30,
    starsReward: 2,
    isLocked: !prereqsDone,
    lockReason: prereqsDone
      ? ''
      : 'Cần hoàn thành Trạm 1 (Tri Thức) và Trạm 2 (Giải Mã) trong vùng này trước!'
  };
}

export interface RealmSystemRequirement {
  minSystemStars: number;
  minLessonsCleared: number;
  minLevel: number;
  minBlitzScore: number;
  altSummary: string;
}

export const REALM_SYSTEM_REQUIREMENTS: Record<AdventureRealmId, RealmSystemRequirement> = {
  van_hien: {
    minSystemStars: 0,
    minLessonsCleared: 0,
    minLevel: 1,
    minBlitzScore: 0,
    altSummary: 'Mở tự do cho mọi học sinh'
  },
  forest: {
    minSystemStars: 4,
    minLessonsCleared: 1,
    minLevel: 2,
    minBlitzScore: 20,
    altSummary: '≥ 4 Sao tổng, hoặc xong 1 bài học / Cấp 2 / Đấu trường ≥ 20đ'
  },
  sky_island: {
    minSystemStars: 10,
    minLessonsCleared: 2,
    minLevel: 2,
    minBlitzScore: 40,
    altSummary: '≥ 10 Sao tổng, hoặc xong 2 bài học / Cấp 2 / Đấu trường ≥ 40đ'
  },
  ocean_kingdom: {
    minSystemStars: 18,
    minLessonsCleared: 3,
    minLevel: 3,
    minBlitzScore: 60,
    altSummary: '≥ 18 Sao tổng, hoặc xong 3 bài học / Cấp 3 / Đấu trường ≥ 60đ'
  },
  dino_valley: {
    minSystemStars: 28,
    minLessonsCleared: 5,
    minLevel: 4,
    minBlitzScore: 80,
    altSummary: '≥ 28 Sao tổng, hoặc xong 5 bài học / Cấp 4 / Đấu trường ≥ 80đ'
  },
  candy_land: {
    minSystemStars: 40,
    minLessonsCleared: 8,
    minLevel: 5,
    minBlitzScore: 100,
    altSummary: '≥ 40 Sao tổng, hoặc xong 8 bài học / Cấp 5 / Đấu trường ≥ 100đ'
  }
};

export interface RealmPortalStatus {
  alreadyUnlocked: boolean;
  prevRealmName: string;
  prevRealmCleared: boolean;
  systemReady: boolean;
  canUnlockNow: boolean;
  currentSystemStars: number;
  requiredSystemStars: number;
  lessonsCleared: number;
  studentLevel: number;
  blitzBest: number;
  requirement: RealmSystemRequirement;
}

export function evaluateRealmPortalStatus(
  targetRealm: AdventureRealm,
  save: AdventureWorldSave,
  profileStats: {
    profileStars: number;
    studyMapStars: number;
    lessonsCleared: number;
    level: number;
    highScoreBlitz: number;
  }
): RealmPortalStatus {
  const req = REALM_SYSTEM_REQUIREMENTS[targetRealm.id];
  const currentSystemStars =
    Math.max(profileStats.profileStars, profileStats.studyMapStars) + save.adventureStars;

  const idx = ADVENTURE_REALMS.findIndex((r) => r.id === targetRealm.id);
  const prevRealm = idx > 0 ? ADVENTURE_REALMS[idx - 1] : null;
  const prevRealmCleared = prevRealm
    ? save.openedChests.includes(prevRealm.chest.id) ||
      prevRealm.landmarks.every((l) => save.discoveredLandmarks.includes(l.id))
    : true;

  const systemReady =
    targetRealm.order === 1 ||
    currentSystemStars >= req.minSystemStars ||
    profileStats.lessonsCleared >= req.minLessonsCleared ||
    profileStats.level >= req.minLevel ||
    profileStats.highScoreBlitz >= req.minBlitzScore;

  const alreadyUnlocked = save.unlockedRealms.includes(targetRealm.id);
  return {
    alreadyUnlocked,
    prevRealmName: prevRealm?.name ?? '',
    prevRealmCleared,
    systemReady,
    canUnlockNow: alreadyUnlocked || (prevRealmCleared && systemReady),
    currentSystemStars,
    requiredSystemStars: req.minSystemStars,
    lessonsCleared: profileStats.lessonsCleared,
    studentLevel: profileStats.level,
    blitzBest: profileStats.highScoreBlitz,
    requirement: req
  };
}

