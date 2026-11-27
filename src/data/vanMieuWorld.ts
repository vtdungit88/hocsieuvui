export type VanMieuZoneId =
  | 'heritage_plaza'
  | 'pet_garden'
  | 'adventure_island'
  | 'festival_home';

export interface VanMieuZoneMeta {
  id: VanMieuZoneId;
  shortName: string;
  title: string;
  subtitle: string;
  accentBg: string;
  miniCoords: { x: number; y: number };
}

export const VAN_MIEU_ZONES: VanMieuZoneMeta[] = [
  {
    id: 'heritage_plaza',
    shortName: 'Quảng Trường',
    title: 'Quảng Trường Văn Miếu & Sân Chơi Dân Gian',
    subtitle: 'Di tích Khuê Văn Các thanh tịnh ở trung tâm · Sân chơi dân gian riêng bên hông',
    accentBg: 'from-amber-500 to-red-600',
    miniCoords: { x: 50, y: 42 }
  },
  {
    id: 'pet_garden',
    shortName: 'Vườn Thú Cưng',
    title: 'Vườn Thú Cưng Cổ Tích',
    subtitle: 'Nhận thú cưng miễn phí, vuốt ve, ném bóng & đua thú cưng sôi động',
    accentBg: 'from-emerald-500 to-teal-600',
    miniCoords: { x: 18, y: 60 }
  },
  {
    id: 'adventure_island',
    shortName: 'Đảo Phiêu Lưu',
    title: 'Đảo Phiêu Lưu & Suối Ngọc',
    subtitle: 'Đường đua vượt chướng ngại giả tưởng bên ngoài di tích · Câu cá thư giãn',
    accentBg: 'from-sky-500 to-indigo-600',
    miniCoords: { x: 82, y: 58 }
  },
  {
    id: 'festival_home',
    shortName: 'Lễ Hội & Nhà',
    title: 'Phố Thời Trang, Vũ Hội & Nhà Riêng',
    subtitle: 'Sân khấu nhảy theo nhạc, chụp ảnh nhóm, phối đồ & trang trí căn nhà nhỏ',
    accentBg: 'from-rose-500 to-purple-600',
    miniCoords: { x: 50, y: 78 }
  }
];

export interface VanMieuNpc {
  id: string;
  name: string;
  role: string;
  zone: VanMieuZoneId;
  x: number;
  y: number;
  robeColor: string;
  hatColor: string;
  greeting: string;
  tip: string;
  primaryActionLabel: string;
  primaryActionId:
    | 'daily_checkin'
    | 'open_oanquan'
    | 'open_tugofwar'
    | 'open_pet_garden'
    | 'open_obstacle_race'
    | 'open_fishing'
    | 'open_house'
    | 'open_stage_dance';
  secondaryActionLabel?: string;
  secondaryActionId?:
    | 'open_tugofwar'
    | 'open_pet_race'
    | 'open_fishing'
    | 'open_shop'
    | 'open_travel';
}

export const VAN_MIEU_NPCS: VanMieuNpc[] = [
  {
    id: 'npc_cudo',
    name: 'Cụ Đồ Văn Miếu',
    role: 'Người Kể Chuyện Di Sản',
    zone: 'heritage_plaza',
    x: 61,
    y: 55,
    robeColor: '#7c2d12',
    hatColor: '#1e293b',
    greeting: 'Chào cháu đến thăm Văn Miếu! Khuê Văn Các và Vườn Bia Tiến Sĩ là nơi giữ gìn nét đẹp văn hóa thanh tịnh.',
    tip: 'Các trò chơi náo nhiệt được bố trí gọn gàng ở Sân Chơi bên trái và các khu giả tưởng bên ngoài. Cháu nhớ nhận quà điểm danh hôm nay nhé!',
    primaryActionLabel: 'Nhận Quà Điểm Danh',
    primaryActionId: 'daily_checkin',
    secondaryActionLabel: 'Mở Bản Đồ Du Hành',
    secondaryActionId: 'open_travel'
  },
  {
    id: 'npc_beti',
    name: 'Bé Tí Dân Gian',
    role: 'Trọng Tài Sân Chơi',
    zone: 'heritage_plaza',
    x: 24,
    y: 63,
    robeColor: '#ea580c',
    hatColor: '#facc15',
    greeting: 'Hôm nay Sân Chơi Dân Gian mở hội tưng bừng luôn! Mời bạn thi Ô Ăn Quan hoặc kéo co cùng đội nhé!',
    tip: 'Có thể đấu cùng [BOT] Bé Tí hoặc rủ bạn trong sảnh kéo co chung thời gian thực!',
    primaryActionLabel: 'Chơi Ô Ăn Quan',
    primaryActionId: 'open_oanquan',
    secondaryActionLabel: 'Thi Kéo Co Đồng Đội',
    secondaryActionId: 'open_tugofwar'
  },
  {
    id: 'npc_milinh',
    name: 'Bảo Mẫu Mi Linh',
    role: 'Quản Lý Vườn Thú Cưng',
    zone: 'pet_garden',
    x: 34,
    y: 59,
    robeColor: '#059669',
    hatColor: '#f472b6',
    greeting: 'Chào mừng đến Vườn Thú Cưng! Bạn nào chưa có thú cưng có thể nhận nuôi miễn phí ngay một bé nhé!',
    tip: 'Chọn thú cưng xong nhớ vuốt ve, ném bóng trên bãi cỏ hoặc đăng ký Đua Thú Cưng!',
    primaryActionLabel: 'Nhận & Chăm Thú Cưng',
    primaryActionId: 'open_pet_garden',
    secondaryActionLabel: 'Vào Đường Đua Thú',
    secondaryActionId: 'open_pet_race'
  },
  {
    id: 'npc_trongtai',
    name: 'Trọng Tài Tí Hon',
    role: 'Đảo Phiêu Lưu & Suối Ngọc',
    zone: 'adventure_island',
    x: 42,
    y: 59,
    robeColor: '#2563eb',
    hatColor: '#f97316',
    greeting: 'Đảo Phiêu Lưu nằm tách biệt trên cầu gỗ giả tưởng ngoài di tích — sẵn sàng bứt tốc chưa nào?',
    tip: 'Nhảy qua chướng ngại gom thật nhiều sao hoặc ghé Suối Ngọc cạnh thác nước để câu cá thư giãn!',
    primaryActionLabel: 'Đua Vượt Chướng Ngại',
    primaryActionId: 'open_obstacle_race',
    secondaryActionLabel: 'Câu Cá Thư Giãn',
    secondaryActionId: 'open_fishing'
  },
  {
    id: 'npc_cochu',
    name: 'Cô Chủ Sân Khấu',
    role: 'Phố Thời Trang & Nhà Riêng',
    zone: 'festival_home',
    x: 64,
    y: 58,
    robeColor: '#db2777',
    hatColor: '#fde047',
    greeting: 'Sân khấu Lễ Hội cuối tuần đang lên đèn rồi! Bạn muốn nhảy tập thể hay ghé trang trí Ngôi Nhà Riêng?',
    tip: 'Tất cả trang phục, cánh và thú cưng từ Avatar Studio đều mang sang sảnh chơi thoải mái!',
    primaryActionLabel: 'Vào Ngôi Nhà Riêng',
    primaryActionId: 'open_house',
    secondaryActionLabel: 'Phối Đồ Thời Trang',
    secondaryActionId: 'open_shop'
  }
];

export interface StarterPetOption {
  petId: string;
  shortName: string;
  title: string;
  personality: string;
  badgeColor: string;
}

export const STARTER_PETS: StarterPetOption[] = [
  {
    petId: 'pet_corgi',
    shortName: 'Chó Corgi',
    title: 'Cún Corgi Đeo Nơ Đỏ',
    personality: 'Năng động, thích chạy nhảy bắt bóng',
    badgeColor: '#f97316'
  },
  {
    petId: 'pet_cat',
    shortName: 'Mèo Mướp',
    title: 'Mèo Mướp Đáng Yêu',
    personality: 'Thông minh, thích được vuốt ve',
    badgeColor: '#eab308'
  },
  {
    petId: 'pet_bunny',
    shortName: 'Thỏ Ngọc',
    title: 'Thỏ Ngọc Tai Dài',
    personality: 'Nhanh nhẹn, nhảy xa cực đỉnh',
    badgeColor: '#ec4899'
  },
  {
    petId: 'pet_panda',
    shortName: 'Gấu Trúc',
    title: 'Gấu Trúc Nhí Đai Đỏ',
    personality: 'Dễ thương, hiền lành, mê tre xanh',
    badgeColor: '#10b981'
  },
  {
    petId: 'pet_dragon',
    shortName: 'Rồng Mini',
    title: 'Rồng Con Lửa Vàng',
    personality: 'Lém lỉnh, thích lượn vòng cổ vũ',
    badgeColor: '#8b5cf6'
  }
];

export interface FishSpecies {
  id: string;
  name: string;
  rarity: 'Phổ biến' | 'Quý' | 'Hiếm';
  color: string;
  accent: string;
  starsReward: number;
  note: string;
}

export const FISH_SPECIES: FishSpecies[] = [
  {
    id: 'fish_carp',
    name: 'Cá Chép Vàng',
    rarity: 'Phổ biến',
    color: '#f59e0b',
    accent: '#fef08a',
    starsReward: 1,
    note: 'Lấp lánh dưới làn nước trong xanh Suối Ngọc.'
  },
  {
    id: 'fish_betta',
    name: 'Cá Đuôi Lụa Xanh',
    rarity: 'Phổ biến',
    color: '#0ea5e9',
    accent: '#7dd3fc',
    starsReward: 1,
    note: 'Bơi uyển chuyển như dải ruy băng.'
  },
  {
    id: 'fish_koi',
    name: 'Cá Koi Tam Sắc',
    rarity: 'Quý',
    color: '#ef4444',
    accent: '#ffffff',
    starsReward: 2,
    note: 'Mang lại may mắn bình an cho cả đội.'
  },
  {
    id: 'fish_puffer',
    name: 'Cá Nóc Bong Bóng',
    rarity: 'Quý',
    color: '#facc15',
    accent: '#fef9c3',
    starsReward: 2,
    note: 'Hay phồng má tròn xoe khi ngạc nhiên.'
  },
  {
    id: 'fish_lotus',
    name: 'Cá Hoa Sen Hồng',
    rarity: 'Hiếm',
    color: '#ec4899',
    accent: '#fbcfe8',
    starsReward: 3,
    note: 'Chỉ xuất hiện gần cụm hoa sen tỏa hương.'
  },
  {
    id: 'fish_crystal',
    name: 'Rùa Pha Lê Nhí',
    rarity: 'Hiếm',
    color: '#2dd4bf',
    accent: '#cffafe',
    starsReward: 4,
    note: 'Linh vật tí hon canh giữ dòng suối thần tiên.'
  }
];

export interface ObstacleLeaderEntry {
  id: string;
  name: string;
  timeSec: number;
  stars: number;
  isBot: boolean;
  period: 'daily' | 'weekly';
}

export const BOT_OBSTACLE_RECORDS: ObstacleLeaderEntry[] = [
  { id: 'bot_obs_1', name: 'Tí Nhanh Nhẹn [BOT]', timeSec: 21.4, stars: 8, isBot: true, period: 'daily' },
  { id: 'bot_obs_2', name: 'Thỏ Bông [BOT]', timeSec: 24.8, stars: 7, isBot: true, period: 'daily' },
  { id: 'bot_obs_3', name: 'Mèo Cam [BOT]', timeSec: 28.2, stars: 6, isBot: true, period: 'daily' },
  { id: 'bot_obs_w1', name: 'Sóc Siêu Tốc [BOT]', timeSec: 19.6, stars: 9, isBot: true, period: 'weekly' },
  { id: 'bot_obs_w2', name: 'Tí Nhanh Nhẹn [BOT]', timeSec: 21.4, stars: 8, isBot: true, period: 'weekly' }
];

export interface FunAchievementBadge {
  id: string;
  title: string;
  desc: string;
  color: string;
  check: (save: VanMieuWorldSave) => boolean;
}

export interface VanMieuWorldSave {
  adoptedStarterPetId: string | null;
  petAffection: number;
  petBallCatches: number;
  petRaceWins: number;
  oAnQuanWins: number;
  tugOfWarWins: number;
  obstacleBestSec: number | null;
  obstacleRuns: number;
  stageDances: number;
  plantLevel: number; // 1..4
  lastCheckInDate: string | null;
  totalCheckInDays: number;
  fishCounts: Record<string, number>;
  blockedPeerIds: string[];
  bonusStarsEarned: number;
}

export const DEFAULT_WORLD_SAVE: VanMieuWorldSave = {
  adoptedStarterPetId: null,
  petAffection: 1,
  petBallCatches: 0,
  petRaceWins: 0,
  oAnQuanWins: 0,
  tugOfWarWins: 0,
  obstacleBestSec: null,
  obstacleRuns: 0,
  stageDances: 0,
  plantLevel: 1,
  lastCheckInDate: null,
  totalCheckInDays: 0,
  fishCounts: {},
  blockedPeerIds: [],
  bonusStarsEarned: 0
};

export const VAN_MIEU_ACHIEVEMENTS: FunAchievementBadge[] = [
  {
    id: 'ach_explorer',
    title: 'Nhà Thám Hiểm Văn Miếu',
    desc: 'Điểm danh & ghé thăm quảng trường Văn Miếu',
    color: 'from-amber-400 to-orange-500',
    check: (s) => s.totalCheckInDays >= 1
  },
  {
    id: 'ach_folk',
    title: 'Cao Thủ Dân Gian',
    desc: 'Thắng ít nhất 1 ván Ô Ăn Quan hoặc Kéo Co',
    color: 'from-rose-500 to-red-600',
    check: (s) => s.oAnQuanWins + s.tugOfWarWins >= 1
  },
  {
    id: 'ach_pet_friend',
    title: 'Bạn Thân Thú Cưng',
    desc: 'Nhận nuôi thú cưng & đạt 5 điểm thân thiết',
    color: 'from-emerald-400 to-teal-600',
    check: (s) => Boolean(s.adoptedStarterPetId) && s.petAffection >= 5
  },
  {
    id: 'ach_runner',
    title: 'Người Chạy Nhanh',
    desc: 'Về đích Đảo Phiêu Lưu dưới 28 giây',
    color: 'from-sky-400 to-indigo-600',
    check: (s) => s.obstacleBestSec !== null && s.obstacleBestSec <= 28
  },
  {
    id: 'ach_angler',
    title: 'Thợ Câu Mát Tay',
    desc: 'Sưu tầm ít nhất 3 loài cá ở Suối Ngọc',
    color: 'from-cyan-400 to-blue-600',
    check: (s) => Object.keys(s.fishCounts).length >= 3
  },
  {
    id: 'ach_gardener',
    title: 'Chủ Nhà Đảm Đang',
    desc: 'Tưới cây vườn nhà lên cấp 3 trở lên',
    color: 'from-lime-500 to-green-600',
    check: (s) => s.plantLevel >= 3
  }
];

export function loadWorldSave(studentId: string): VanMieuWorldSave {
  try {
    const raw = localStorage.getItem(`hsv_vanmieu_world_${studentId}`);
    if (!raw) return DEFAULT_WORLD_SAVE;
    const parsed = JSON.parse(raw) as Partial<VanMieuWorldSave>;
    return {
      ...DEFAULT_WORLD_SAVE,
      ...parsed,
      fishCounts: parsed.fishCounts && typeof parsed.fishCounts === 'object' ? parsed.fishCounts : {},
      blockedPeerIds: Array.isArray(parsed.blockedPeerIds) ? parsed.blockedPeerIds : []
    };
  } catch {
    return DEFAULT_WORLD_SAVE;
  }
}

export function saveWorldSave(studentId: string, save: VanMieuWorldSave) {
  try {
    localStorage.setItem(`hsv_vanmieu_world_${studentId}`, JSON.stringify(save));
  } catch {
    // ignore storage quota errors
  }
}
