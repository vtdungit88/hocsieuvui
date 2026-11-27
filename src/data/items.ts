import { ShopItem, StudioSet, PersonalRoomDecor } from '../types';

export const DEFAULT_ROOM_DECOR: PersonalRoomDecor = {
  wallTheme: 'warm',
  showDeskPc: true,
  showBed: true,
  showBookshelf: true,
  showPlant: true,
  showPoster: true,
  showTrophyRack: true
};

export const STUDIO_SETS: StudioSet[] = [
  {
    id: 'set_superhero',
    name: 'Bộ Siêu Anh Hùng HSV',
    titleReward: 'Siêu Anh Hùng Tri Thức',
    description: 'Chiến giáp lõi năng lượng, khiên ngôi sao và đôi cánh ánh sáng bảo vệ hành tinh tri thức.',
    accentColor: 'rose',
    itemIds: ['outfit_hero_core', 'hand_hero_shield', 'tech_holo_desk', 'aura_wings_cyber', 'bg_future_city']
  },
  {
    id: 'set_elemental',
    name: 'Bộ Chiến Binh Nguyên Tố',
    titleReward: 'Chiến Binh Ngũ Hành',
    description: 'Lấy cảm hứng từ các biệt đội chiến binh nguyên tố, kết hợp quyền trượng và thú cơ khí đồng hành.',
    accentColor: 'violet',
    itemIds: ['outfit_ranger_red', 'hand_element_staff', 'phone_ranger_morpher', 'pet_mecha_lion', 'aura_lightning']
  },
  {
    id: 'set_explorer',
    name: 'Bộ Nhà Thám Hiểm Kỳ Quan',
    titleReward: 'Nhà Thám Hiểm Nhí',
    description: 'Sưu tầm trọn bộ thám hiểm để băng rừng vượt suối và ghi lại khoảnh khắc qua từng ải SGK.',
    accentColor: 'emerald',
    itemIds: ['outfit_scout', 'hand_magnifier', 'hand_camera', 'veh_mountain', 'bg_forest']
  },
  {
    id: 'set_scientist',
    name: 'Bộ Nhà Khoa Học Nhí',
    titleReward: 'Kỹ Sư Tương Lai',
    description: 'Trang bị chuẩn phòng thí nghiệm công nghệ cao cùng ống nghiệm, kính thiên văn và Vui-Bot Mini.',
    accentColor: 'blue',
    itemIds: ['outfit_lab', 'hand_casio', 'hand_beaker', 'pet_vuibot', 'bg_lab', 'aura_electric']
  },
  {
    id: 'set_racer',
    name: 'Bộ Tay Đua Siêu Tốc',
    titleReward: 'Tay Đua Vô Địch',
    description: 'Trang phục đua xe khí động học, siêu xe Turbo và bước chân ánh sao bứt phá tốc độ.',
    accentColor: 'cyan',
    itemIds: ['outfit_racer', 'veh_supercar', 'veh_cyber_moto', 'phone_console_mini', 'aura_footsteps']
  },
  {
    id: 'set_pet_lover',
    name: 'Bộ Người Bạn Thú Cưng',
    titleReward: 'Bạn Thân Muôn Loài',
    description: 'Quy tụ những người bạn đáng yêu nhất từ chú cáo chín đuôi, gấu trúc đến kỳ lân sao băng.',
    accentColor: 'teal',
    itemIds: ['pet_corgi', 'pet_fox', 'pet_panda', 'pet_unicorn', 'bg_magic_forest']
  },
  {
    id: 'set_cosmic',
    name: 'Bộ Huyền Thoại Học Tập',
    titleReward: 'Huyền Thoại Học Tập',
    description: 'Set trang bị đỉnh cao tỏa hào quang rực rỡ trên Bảng Vàng và mọi đấu trường tri thức.',
    accentColor: 'amber',
    itemIds: ['outfit_cyber', 'outfit_scholar', 'hand_laser', 'veh_spaceship', 'bg_galaxy', 'aura_flame']
  }
];

export const SHOP_ITEMS: ShopItem[] = [
  // =========================================================================
  // 1. TRANG PHỤC (OUTFITS - 20 món)
  // =========================================================================
  {
    id: 'outfit_uniform',
    name: 'Đồng Phục Khăn Quàng Đỏ',
    category: 'outfit',
    costCoins: 0,
    costStars: 0,
    description: 'Áo sơ mi trắng tinh khôi thắt khăn quàng đỏ tươi. Chuẩn tác phong học sinh gương mẫu.',
    rarity: 'base',
    iconName: 'Shirt',
    tagline: 'Học sinh chăm ngoan',
    renderType: 'uniform'
  },
  {
    id: 'outfit_scout',
    name: 'Áo Gile Thám Hiểm Bản Đồ',
    category: 'outfit',
    costCoins: 12,
    costStars: 0,
    description: 'Áo túi hộp kaki năng động gắn huy hiệu la bàn, sẵn sàng vượt ải trên Bản đồ thám hiểm.',
    rarity: 'popular',
    iconName: 'Compass',
    tagline: 'Sẵn sàng vượt ải',
    renderType: 'scout',
    setId: 'set_explorer'
  },
  {
    id: 'outfit_sport',
    name: 'Áo Thể Dục Năng Động 3 Sọc',
    category: 'outfit',
    costCoins: 18,
    costStars: 0,
    description: 'Thoáng mát, co giãn cực tốt cho những giờ thể dục và đấu trường siêu tốc.',
    rarity: 'popular',
    iconName: 'Shirt',
    tagline: 'Khỏe để học tốt',
    renderType: 'sport'
  },
  {
    id: 'outfit_hoodie',
    name: 'Hoodie Biệt Đội Tri Thức',
    category: 'outfit',
    costCoins: 24,
    costStars: 2,
    description: 'Áo hoodie in biểu tượng Số Pi và Vô Cùng, giữ ấm mỗi tối ôn bài chuẩn bị kiểm tra.',
    rarity: 'popular',
    iconName: 'Sparkles',
    tagline: 'Ấm áp mùa ôn thi',
    renderType: 'hoodie'
  },
  {
    id: 'outfit_racer',
    name: 'Đồ Đua Siêu Tốc Turbo',
    category: 'outfit',
    costCoins: 28,
    costStars: 2,
    description: 'Bộ đồ tay đua phối sắc trắng xanh dương và sọc cờ về đích cực ngầu cho đường đua tri thức.',
    rarity: 'popular',
    iconName: 'Zap',
    tagline: 'Bứt phá tốc độ',
    renderType: 'racer',
    setId: 'set_racer'
  },
  {
    id: 'outfit_ranger_red',
    name: 'Chiến Giáp Biệt Đội Đỏ Rực',
    category: 'outfit',
    costCoins: 32,
    costStars: 3,
    description: 'Trang phục biệt đội chiến binh nguyên bản Học Siêu Vui với đai lưng ngôi sao sức mạnh.',
    rarity: 'popular',
    iconName: 'Shield',
    tagline: 'Đoàn kết là sức mạnh',
    renderType: 'ranger_red',
    setId: 'set_elemental'
  },
  {
    id: 'outfit_lab',
    name: 'Áo Blouse Nhà Khoa Học Nhí',
    category: 'outfit',
    costCoins: 42,
    costStars: 4,
    description: 'Áo choàng trắng phòng thí nghiệm kèm kính bảo hộ gắn trán cho tín đồ Khoa học tự nhiên.',
    rarity: 'vip',
    iconName: 'Atom',
    tagline: 'Say mê khám phá',
    renderType: 'lab',
    setId: 'set_scientist'
  },
  {
    id: 'outfit_detective',
    name: 'Vest Thám Tử Lừng Danh',
    category: 'outfit',
    costCoins: 52,
    costStars: 5,
    description: 'Bộ vest lịch lãm thắt nơ đỏ, chuyên gia phá giải các bài toán hóc búa nhất.',
    rarity: 'vip',
    iconName: 'Crown',
    tagline: 'Chân lý chỉ có một',
    renderType: 'detective'
  },
  {
    id: 'outfit_ninja',
    name: 'Bộ Đồ Ninja Bóng Đêm',
    category: 'outfit',
    costCoins: 58,
    costStars: 5,
    description: 'Trang phục ninja gọn nhẹ với khăn choàng đỏ và giáp vai ẩn mình chinh phục thử thách.',
    rarity: 'vip',
    iconName: 'Zap',
    tagline: 'Nhanh nhẹn bí ẩn',
    renderType: 'ninja'
  },
  {
    id: 'outfit_varsity',
    name: 'Áo Khoác Bóng Chày Học Đường',
    category: 'outfit',
    costCoins: 65,
    costStars: 6,
    description: 'Áo khoác Varsity xanh navy phối tay kem cực chất dành cho thủ lĩnh đội tuyển lớp.',
    rarity: 'vip',
    iconName: 'Award',
    tagline: 'Phong cách thủ lĩnh',
    renderType: 'varsity'
  },
  {
    id: 'outfit_hero_core',
    name: 'Giáp Siêu Anh Hùng Lõi Sao',
    category: 'outfit',
    costCoins: 68,
    costStars: 6,
    description: 'Bộ giáp đỏ vàng phát sáng lõi năng lượng hình ngôi sao trước ngực, sẵn sàng bảo vệ lớp học.',
    rarity: 'vip',
    iconName: 'Sparkles',
    tagline: 'Lõi sao rực cháy',
    renderType: 'hero_core',
    setId: 'set_superhero'
  },
  {
    id: 'outfit_knight',
    name: 'Giáp Hiệp Sĩ Ánh Sáng',
    category: 'outfit',
    costCoins: 74,
    costStars: 7,
    description: 'Áo giáp bạc viền vàng hoàng gia cùng áo choàng xanh lam uy nghiêm bảo vệ chính nghĩa.',
    rarity: 'vip',
    iconName: 'Shield',
    tagline: 'Trung thực & dũng cảm',
    renderType: 'knight'
  },
  {
    id: 'outfit_hero_shield',
    name: 'Chiến Giáp Đội Trưởng Ngôi Sao',
    category: 'outfit',
    costCoins: 78,
    costStars: 7,
    description: 'Bộ chiến giáp xanh dương – bạc gắn huy hiệu Ngôi Sao Dũng Cảm dẫn dắt toàn đội.',
    rarity: 'vip',
    iconName: 'Star',
    tagline: 'Tinh thần đồng đội',
    renderType: 'hero_shield'
  },
  {
    id: 'outfit_aodai_tech',
    name: 'Cổ Phục Trạng Nguyên Hiện Đại',
    category: 'outfit',
    costCoins: 82,
    costStars: 8,
    description: 'Lấy cảm hứng từ trang phục Trạng Nguyên Việt Nam hòa quyện hoa văn công nghệ ánh kim.',
    rarity: 'vip',
    iconName: 'Crown',
    tagline: 'Vinh danh Bảng Vàng',
    renderType: 'aodai_tech'
  },
  {
    id: 'outfit_astronaut',
    name: 'Phi Hành Gia Khám Phá Sao',
    category: 'outfit',
    costCoins: 88,
    costStars: 9,
    description: 'Bộ đồ phi hành gia trắng cam với bảng điều khiển oxy và phù hiệu thám hiểm ngân hà.',
    rarity: 'vip',
    iconName: 'Rocket',
    tagline: 'Vươn tới các vì sao',
    renderType: 'astronaut'
  },
  {
    id: 'outfit_scholar',
    name: 'Áo Choàng Pháp Sư Tri Thức',
    category: 'outfit',
    costCoins: 120,
    costStars: 12,
    description: 'Áo choàng nhung tím thêu chòm sao vàng kim, tỏa ánh sáng trí tuệ cổ điển.',
    rarity: 'mythic',
    iconName: 'Sparkles',
    tagline: 'Phép thuật tính nhẩm',
    renderType: 'scholar',
    setId: 'set_cosmic'
  },
  {
    id: 'outfit_wizard_ice',
    name: 'Áo Choàng Pháp Sư Băng Giá',
    category: 'outfit',
    costCoins: 130,
    costStars: 13,
    description: 'Áo choàng pha lê xanh ngọc lấp lánh tinh thể tuyết giúp đầu óc luôn tỉnh táo giải đề.',
    rarity: 'mythic',
    iconName: 'Sparkles',
    tagline: 'Bình tĩnh tuyệt đối',
    renderType: 'wizard_ice'
  },
  {
    id: 'outfit_ranger_gold',
    name: 'Chiến Giáp Biệt Đội Hoàng Kim',
    category: 'outfit',
    costCoins: 145,
    costStars: 15,
    description: 'Phiên bản giáp chiến binh nâng cấp bọc vàng kim với cầu vai sư tử dũng mãnh.',
    rarity: 'mythic',
    iconName: 'Crown',
    tagline: 'Thủ lĩnh tối thượng',
    renderType: 'ranger_gold'
  },
  {
    id: 'outfit_cyber',
    name: 'Bộ Giáp Phi Hành Gia Lượng Tử',
    category: 'outfit',
    costCoins: 165,
    costStars: 18,
    description: 'Trang phục công nghệ vũ trụ tối tân, sẵn sàng chinh phục dải ngân hà tri thức.',
    rarity: 'mythic',
    iconName: 'Rocket',
    tagline: 'Đỉnh cao tương lai',
    renderType: 'cyber',
    setId: 'set_cosmic'
  },
  {
    id: 'outfit_mecha_pilot',
    name: 'Giáp Phi Công Robot Biến Hình',
    category: 'outfit',
    costCoins: 175,
    costStars: 18,
    description: 'Bộ giáp cơ khí đa sắc chuẩn buồng lái robot khổng lồ với lò phản ứng xanh dương.',
    rarity: 'mythic',
    iconName: 'Cpu',
    tagline: 'Hợp thể chiến thắng',
    renderType: 'mecha_pilot'
  },

  // =========================================================================
  // 2. PHỤ KIỆN CẦM TAY (HANDHELD - 17 món)
  // =========================================================================
  {
    id: 'hand_pencil',
    name: 'Bút Chì 2B Cổ Điển',
    category: 'handheld',
    costCoins: 0,
    costStars: 0,
    description: 'Cây bút chì quen thuộc vẽ hình, nháp phép tính không bao giờ thiếu trong cặp sách.',
    rarity: 'base',
    iconName: 'PenTool',
    tagline: 'Vũ khí khởi đầu',
    renderType: 'pencil'
  },
  {
    id: 'hand_ruler',
    name: 'Thước Kẻ Dẻo Cầu Vồng',
    category: 'handheld',
    costCoins: 10,
    costStars: 0,
    description: 'Thước nhựa dẻo uốn cong không gãy, đo chuẩn từng milimet trên vở ô ly.',
    rarity: 'popular',
    iconName: 'Ruler',
    tagline: 'Đo chuẩn từng ly',
    renderType: 'ruler'
  },
  {
    id: 'hand_star_wand',
    name: 'Gậy Phép Ngôi Sao Tri Thức',
    category: 'handheld',
    costCoins: 15,
    costStars: 1,
    description: 'Đầu gậy gắn ngôi sao vàng lấp lánh, vung lên là giải xong phép tính khó.',
    rarity: 'popular',
    iconName: 'Sparkles',
    tagline: 'Tỏa sáng mỗi câu đúng',
    renderType: 'star_wand'
  },
  {
    id: 'hand_backpack_rocket',
    name: 'Cặp Sách Tên Lửa Siêu Tốc',
    category: 'handheld',
    costCoins: 18,
    costStars: 1,
    description: 'Cặp sách học sinh gắn hai ống đẩy mini giúp mang đầy đủ sách vở mà nhẹ tênh.',
    rarity: 'popular',
    iconName: 'Backpack',
    tagline: 'Đến lớp siêu vui',
    renderType: 'backpack_rocket'
  },
  {
    id: 'hand_compass',
    name: 'Bộ Compa Hợp Kim Titan',
    category: 'handheld',
    costCoins: 22,
    costStars: 2,
    description: 'Vẽ đường tròn, tam giác đều và hình lục giác sắc nét đến từng milimet.',
    rarity: 'popular',
    iconName: 'Compass',
    tagline: 'Tuyệt đỉnh hình học',
    renderType: 'compass'
  },
  {
    id: 'hand_camera',
    name: 'Máy Ảnh Phóng Viên Nhí',
    category: 'handheld',
    costCoins: 25,
    costStars: 2,
    description: 'Chiếc máy ảnh nhỏ xinh chớp đèn flash ghi lại mọi kỳ quan trên bản đồ Việt Nam.',
    rarity: 'popular',
    iconName: 'Camera',
    tagline: 'Lưu giữ kỷ niệm',
    renderType: 'camera',
    setId: 'set_explorer'
  },
  {
    id: 'hand_micro',
    name: 'Micro Ngôi Sao Sân Khấu',
    category: 'handheld',
    costCoins: 28,
    costStars: 2,
    description: 'Micro không dây lấp lánh dành cho các bạn tự tin thuyết trình và ca hát.',
    rarity: 'popular',
    iconName: 'Mic',
    tagline: 'Tự tin tỏa sáng',
    renderType: 'micro'
  },
  {
    id: 'hand_magnifier',
    name: 'Kính Lúp Thám Tử Bạc',
    category: 'handheld',
    costCoins: 36,
    costStars: 3,
    description: 'Soi rõ từng chi tiết bẫy đề bài trong SGK và thí nghiệm khoa học tự nhiên.',
    rarity: 'vip',
    iconName: 'Search',
    tagline: 'Bắt trọn mọi bẫy đề',
    renderType: 'magnifier',
    setId: 'set_explorer'
  },
  {
    id: 'hand_beaker',
    name: 'Bộ Ống Nghiệm Pha Chế Kỳ Diệu',
    category: 'handheld',
    costCoins: 44,
    costStars: 4,
    description: 'Cặp bình thí nghiệm sủi bọt xanh ngọc và vàng rực cho nhà khoa học nhí.',
    rarity: 'vip',
    iconName: 'FlaskConical',
    tagline: 'Thí nghiệm kỳ thú',
    renderType: 'beaker',
    setId: 'set_scientist'
  },
  {
    id: 'hand_casio',
    name: 'Máy Tính Khoa Học FX Pro',
    category: 'handheld',
    costCoins: 48,
    costStars: 5,
    description: 'Chiếc máy tính bỏ túi huyền thoại của mọi học sinh phổ thông, bấm nhanh như chớp.',
    rarity: 'vip',
    iconName: 'Calculator',
    tagline: 'Bảo bối phòng thi',
    renderType: 'casio',
    setId: 'set_scientist'
  },
  {
    id: 'hand_guitar',
    name: 'Đàn Guitar Điện Cầu Vồng',
    category: 'handheld',
    costCoins: 52,
    costStars: 5,
    description: 'Cây đàn guitar điện gọn nhẹ khuấy động không khí giờ ra chơi và Sảnh Online.',
    rarity: 'vip',
    iconName: 'Music',
    tagline: 'Giai điệu tuổi thơ',
    renderType: 'guitar'
  },
  {
    id: 'hand_telescope',
    name: 'Kính Thiên Văn Khám Phá Sao',
    category: 'handheld',
    costCoins: 60,
    costStars: 6,
    description: 'Ống kính đồng thau viền xanh giúp quan sát các chòm sao và hành tinh xa xôi.',
    rarity: 'vip',
    iconName: 'Telescope',
    tagline: 'Ngắm nhìn bầu trời',
    renderType: 'telescope'
  },
  {
    id: 'hand_trophy_mini',
    name: 'Cúp Pha Lê Đấu Trường',
    category: 'handheld',
    costCoins: 72,
    costStars: 7,
    description: 'Chiếc cúp pha lê lấp lánh biểu tượng của nhà vô địch Đấu Trường 60 giây.',
    rarity: 'vip',
    iconName: 'Trophy',
    tagline: 'Chiến thắng vang dội',
    renderType: 'trophy_mini'
  },
  {
    id: 'hand_laser',
    name: 'Kiếm Ánh Sáng Số Học',
    category: 'handheld',
    costCoins: 115,
    costStars: 12,
    description: 'Phát ra chùm tia sáng ngọc lục bảo chỉ thẳng vào đáp án chính xác.',
    rarity: 'mythic',
    iconName: 'Zap',
    tagline: 'Chỉ đâu trúng đó',
    renderType: 'laser',
    setId: 'set_cosmic'
  },
  {
    id: 'hand_hero_shield',
    name: 'Khiên Năng Lượng Ngôi Sao',
    category: 'handheld',
    costCoins: 125,
    costStars: 12,
    description: 'Tấm khiên tròn ba vòng đỏ – bạc – xanh với ngôi sao chính giữa bảo vệ tri thức.',
    rarity: 'mythic',
    iconName: 'Shield',
    tagline: 'Vững vàng trước mọi đề khó',
    renderType: 'hero_shield',
    setId: 'set_superhero'
  },
  {
    id: 'hand_element_staff',
    name: 'Quyền Trượng Ngũ Hành Nguyên Tố',
    category: 'handheld',
    costCoins: 140,
    costStars: 14,
    description: 'Trượng pha lê tỏa năng lượng năm màu Kim – Mộc – Thủy – Hỏa – Thổ rực rỡ.',
    rarity: 'mythic',
    iconName: 'Sparkles',
    tagline: 'Sức mạnh ngũ hành',
    renderType: 'element_staff',
    setId: 'set_elemental'
  },
  {
    id: 'hand_tome',
    name: 'Đại Bí Kíp Tri Thức Dát Vàng',
    category: 'handheld',
    costCoins: 150,
    costStars: 16,
    description: 'Cuốn cổ thư dát vàng tổng hợp trọn vẹn công thức Toán và Khoa học từ Lớp 1 đến Lớp 9.',
    rarity: 'mythic',
    iconName: 'BookOpen',
    tagline: 'Bí kíp trấn phái',
    renderType: 'tome'
  },

  // =========================================================================
  // 3. ĐIỆN THOẠI & LIÊN LẠC (PHONE - 9 món)
  // =========================================================================
  {
    id: 'phone_brick',
    name: 'Điện Thoại Cục Gạch Huyền Thoại',
    category: 'phone',
    costCoins: 0,
    costStars: 0,
    description: 'Pin bền cả tháng, rơi xuống sân trường không một vết xước.',
    rarity: 'base',
    iconName: 'Phone',
    tagline: 'Nồi đồng cối đá',
    renderType: 'brick'
  },
  {
    id: 'phone_walkie',
    name: 'Bộ Đàm Thám Hiểm Rừng Xanh',
    category: 'phone',
    costCoins: 12,
    costStars: 0,
    description: 'Bắt sóng cực khỏe để gọi đồng đội cùng vượt ải trên Bản đồ.',
    rarity: 'popular',
    iconName: 'Radio',
    tagline: 'Kết nối đồng đội',
    renderType: 'walkie'
  },
  {
    id: 'phone_flip',
    name: 'Điện Thoại Nắp Gập Retro',
    category: 'phone',
    costCoins: 20,
    costStars: 1,
    description: 'Gập kêu tanh tách sành điệu với sắc hồng pastel trẻ trung.',
    rarity: 'popular',
    iconName: 'Smartphone',
    tagline: 'Phong cách cổ điển',
    renderType: 'flip'
  },
  {
    id: 'phone_cameraphone',
    name: 'Smartphone Quay Vlog Học Đường',
    category: 'phone',
    costCoins: 32,
    costStars: 3,
    description: 'Gắn tay cầm chống rung kèm vòng đèn selfie quay video giải bài tập siêu nét.',
    rarity: 'popular',
    iconName: 'Video',
    tagline: 'Sáng tạo nội dung',
    renderType: 'cameraphone'
  },
  {
    id: 'phone_smart',
    name: 'Smartphone Màn Hình Tràn Viền',
    category: 'phone',
    costCoins: 45,
    costStars: 4,
    description: 'Lướt học siêu mượt, màn hình sắc nét bảo vệ mắt cho học sinh.',
    rarity: 'vip',
    iconName: 'Smartphone',
    tagline: 'Thông minh đa năng',
    renderType: 'smart'
  },
  {
    id: 'phone_ranger_morpher',
    name: 'Đồng Hồ Biến Hình Biệt Đội',
    category: 'phone',
    costCoins: 55,
    costStars: 5,
    description: 'Thiết bị liên lạc đeo tay phát sáng 5 viên đá nguyên tố để triệu hồi biệt đội.',
    rarity: 'vip',
    iconName: 'Watch',
    tagline: 'Biến hình sẵn sàng',
    renderType: 'ranger_morpher',
    setId: 'set_elemental'
  },
  {
    id: 'phone_console_mini',
    name: 'Máy Chơi Game Cầm Tay Pro',
    category: 'phone',
    costCoins: 65,
    costStars: 6,
    description: 'Máy game cầm tay hai tay cầm neon giải trí thông minh sau giờ học.',
    rarity: 'vip',
    iconName: 'Gamepad2',
    tagline: 'Học vui chơi chất',
    renderType: 'console_mini',
    setId: 'set_racer'
  },
  {
    id: 'phone_promax',
    name: 'Flagship Titan Sa Mạc',
    category: 'phone',
    costCoins: 75,
    costStars: 8,
    description: 'Khung viền titan vàng cát sang trọng với cụm 3 camera siêu nét.',
    rarity: 'vip',
    iconName: 'Crown',
    tagline: 'Đẳng cấp học đường',
    renderType: 'promax'
  },
  {
    id: 'phone_holo',
    name: 'Máy Chiếu Hologram 3D AI',
    category: 'phone',
    costCoins: 140,
    costStars: 15,
    description: 'Chiếu mô hình hình học không gian lơ lửng 3D ngay trên lòng bàn tay.',
    rarity: 'mythic',
    iconName: 'Radio',
    tagline: 'Công nghệ viễn tưởng',
    renderType: 'holo'
  },

  // =========================================================================
  // 4. XE CỘ & DI CHUYỂN (VEHICLE - 15 món)
  // =========================================================================
  {
    id: 'veh_honeycomb',
    name: 'Dép Tổ Ong Huyền Thoại',
    category: 'vehicle',
    costCoins: 0,
    costStars: 0,
    description: 'Đôi dép quốc dân êm ái, đồng hành cùng biết bao thế hệ học trò Việt Nam.',
    rarity: 'base',
    iconName: 'Footprints',
    tagline: 'Bước chân dũng cảm',
    renderType: 'honeycomb'
  },
  {
    id: 'veh_skateboard',
    name: 'Ván Trượt Đường Phố Năng Động',
    category: 'vehicle',
    costCoins: 14,
    costStars: 1,
    description: 'Ván gỗ phong 7 lớp họa tiết đường phố cực ngầu để lướt qua sân trường.',
    rarity: 'popular',
    iconName: 'Zap',
    tagline: 'Lướt nhanh như gió',
    renderType: 'skateboard'
  },
  {
    id: 'veh_bike_mini',
    name: 'Xe Đạp Mini Cổ Điển Có Giỏ',
    category: 'vehicle',
    costCoins: 24,
    costStars: 2,
    description: 'Xe đạp màu xanh ngọc có giỏ đựng sách vở và chuông reng reng vui tai.',
    rarity: 'popular',
    iconName: 'Bike',
    tagline: 'Kỷ niệm tuổi thơ',
    renderType: 'bike_mini'
  },
  {
    id: 'veh_scooter_pastel',
    name: 'Xe Tay Ga Mini Pastel',
    category: 'vehicle',
    costCoins: 42,
    costStars: 4,
    description: 'Nhỏ gọn, xinh xắn màu xanh bạc hà cùng đèn pha tròn cổ điển.',
    rarity: 'vip',
    iconName: 'Bike',
    tagline: 'Dạo phố siêu xinh',
    renderType: 'scooter_pastel'
  },
  {
    id: 'veh_mountain',
    name: 'Xe Đạp Địa Hình Thể Thao',
    category: 'vehicle',
    costCoins: 55,
    costStars: 5,
    description: 'Bánh gai hầm hố, bộ đề 21 tốc độ chinh phục mọi cung đường đồi núi.',
    rarity: 'vip',
    iconName: 'Bike',
    tagline: 'Vua leo dốc',
    renderType: 'mountain',
    setId: 'set_explorer'
  },
  {
    id: 'veh_ebike',
    name: 'Xe Điện Thông Minh Xanh',
    category: 'vehicle',
    costCoins: 78,
    costStars: 7,
    description: 'Chạy điện êm ru, thân thiện môi trường, không lo trễ giờ vào lớp.',
    rarity: 'vip',
    iconName: 'Zap',
    tagline: 'Êm ái thần tốc',
    renderType: 'ebike'
  },
  {
    id: 'veh_jetpack',
    name: 'Đôi Cánh Phản Lực Siêu Tốc',
    category: 'vehicle',
    costCoins: 85,
    costStars: 8,
    description: 'Ba lô phản lực kép giúp bạn bay vút trên không trung và giảm 15% vé du hành.',
    rarity: 'vip',
    iconName: 'Rocket',
    tagline: 'Bay lượn tự do',
    renderType: 'jetpack'
  },
  {
    id: 'veh_supercar',
    name: 'Siêu Xe Đua Turbo HSV',
    category: 'vehicle',
    costCoins: 88,
    costStars: 8,
    description: 'Siêu xe thể thao đỏ vàng khí động học, giảm 15% vé du hành xuyên Việt.',
    rarity: 'vip',
    iconName: 'Car',
    tagline: 'Đỉnh cao đường đua',
    renderType: 'supercar',
    setId: 'set_racer'
  },
  {
    id: 'veh_cyber_moto',
    name: 'Siêu Mô Tô Năng Lượng Xanh',
    category: 'vehicle',
    costCoins: 95,
    costStars: 9,
    description: 'Mô tô tương lai bánh phát sáng neon xanh ngọc, lướt cực êm qua mọi thành phố.',
    rarity: 'vip',
    iconName: 'Zap',
    tagline: 'Tia chớp tương lai',
    renderType: 'cyber_moto',
    setId: 'set_racer'
  },
  {
    id: 'veh_hoverboard',
    name: 'Ván Trượt Phản Trọng Lực',
    category: 'vehicle',
    costCoins: 120,
    costStars: 12,
    description: 'Lơ lửng cách mặt đất 20cm với ánh sáng xanh dương công nghệ cao.',
    rarity: 'mythic',
    iconName: 'Sparkles',
    tagline: 'Bay trên mặt đất',
    renderType: 'hoverboard'
  },
  {
    id: 'veh_cloud_nimbus',
    name: 'Đám Mây Thần Tốc Cầu Vồng',
    category: 'vehicle',
    costCoins: 155,
    costStars: 16,
    description: 'Đám mây bồng bềnh tỏa dải cầu vồng lơ lửng trên bầu trời kỳ ảo, giảm 30% vé bay.',
    rarity: 'mythic',
    iconName: 'Cloud',
    tagline: 'Cưỡi mây lướt gió',
    renderType: 'cloud_nimbus'
  },
  {
    id: 'veh_spaceship',
    name: 'Phi Thuyền Mini VNPT Cloud',
    category: 'vehicle',
    costCoins: 170,
    costStars: 18,
    description: 'Tàu vũ trụ cá nhân động cơ phản lực ánh sáng đưa bạn du hành qua các thiên hà.',
    rarity: 'mythic',
    iconName: 'Rocket',
    tagline: 'Chinh phục ngân hà',
    renderType: 'spaceship',
    setId: 'set_cosmic'
  },
  {
    id: 'veh_mecha_walker',
    name: 'Robot Biến Hình Chiến Giáp',
    category: 'vehicle',
    costCoins: 185,
    costStars: 20,
    description: 'Cỗ máy chiến giáp biến hình hai chân khổng lồ với buồng lái bảo vệ và giảm 30% vé.',
    rarity: 'mythic',
    iconName: 'Bot',
    tagline: 'Chiến binh khổng lồ',
    renderType: 'mecha_walker'
  },
  {
    id: 'veh_magic_carpet',
    name: 'Thảm Bay Thần Thoại Fibonacci',
    category: 'vehicle',
    costCoins: 195,
    costStars: 22,
    description: 'Thảm bay dệt hoa văn dãy số vàng, lơ lửng đưa bạn tới đỉnh cao Bảng Vàng.',
    rarity: 'mythic',
    iconName: 'Star',
    tagline: 'Thần thoại vô đối',
    renderType: 'carpet'
  },
  {
    id: 'veh_hero_jet',
    name: 'Phi Cơ Phản Lực Biệt Đội',
    category: 'vehicle',
    costCoins: 210,
    costStars: 22,
    description: 'Chiến đấu cơ phản lực siêu thanh màu đỏ – bạc, giảm 30% mọi chuyến du hành!',
    rarity: 'mythic',
    iconName: 'Plane',
    tagline: 'Siêu thanh xuyên Việt',
    renderType: 'hero_jet'
  },

  // =========================================================================
  // 5. VỞ & CÔNG NGHỆ HỌC TẬP (TECH - 10 món)
  // =========================================================================
  {
    id: 'tech_notebook',
    name: 'Vở Ô Ly Tinh Khôi 96 Trang',
    category: 'tech',
    costCoins: 0,
    costStars: 0,
    description: 'Giấy trắng chống lóa, kẻ ô ly sắc nét để rèn chữ và ghi chép công thức.',
    rarity: 'base',
    iconName: 'Book',
    tagline: 'Nét chữ nết người',
    renderType: 'notebook'
  },
  {
    id: 'tech_abacus',
    name: 'Bàn Tính Gẩy Soroban Gỗ',
    category: 'tech',
    costCoins: 15,
    costStars: 1,
    description: 'Bàn tính hạt gỗ giúp tăng tốc khả năng tính nhẩm siêu tốc cho Tiểu học.',
    rarity: 'popular',
    iconName: 'Grid',
    tagline: 'Tính nhẩm siêu phàm',
    renderType: 'abacus'
  },
  {
    id: 'tech_drawpad',
    name: 'Bảng Vẽ Điện Tử Sáng Tạo',
    category: 'tech',
    costCoins: 28,
    costStars: 2,
    description: 'Bảng vẽ cảm ứng kèm bút stylus giúp phác thảo hình học và vẽ tranh siêu vui.',
    rarity: 'popular',
    iconName: 'PenTool',
    tagline: 'Sáng tạo không giới hạn',
    renderType: 'drawpad'
  },
  {
    id: 'tech_tablet',
    name: 'Máy Tính Bảng SGK Điện Tử',
    category: 'tech',
    costCoins: 35,
    costStars: 3,
    description: 'Màn hình bảo vệ mắt, mở nhanh toàn bộ sách giáo khoa Lớp 1 đến Lớp 9.',
    rarity: 'vip',
    iconName: 'Tablet',
    tagline: 'Học tập mọi nơi',
    renderType: 'tablet'
  },
  {
    id: 'tech_ultrabook',
    name: 'Laptop Nhôm Mỏng Nhẹ Pro',
    category: 'tech',
    costCoins: 62,
    costStars: 6,
    description: 'Mỏng nhẹ chỉ 1kg, pin dùng cả ngày để lập trình và làm bài thuyết trình nhóm.',
    rarity: 'vip',
    iconName: 'Laptop',
    tagline: 'Làm việc nhóm đỉnh cao',
    renderType: 'ultrabook'
  },
  {
    id: 'tech_vr_station',
    name: 'Kính Thực Tế Ảo VR 360',
    category: 'tech',
    costCoins: 75,
    costStars: 7,
    description: 'Khám phá hệ mặt trời, tế bào sinh học và bảo tàng lịch sử ngay trong phòng học ảo.',
    rarity: 'vip',
    iconName: 'Glasses',
    tagline: 'Trải nghiệm 360 độ',
    renderType: 'vr_station'
  },
  {
    id: 'tech_drone_cam',
    name: 'Drone Quay Phim Học Tập',
    category: 'tech',
    costCoins: 85,
    costStars: 8,
    description: 'Drone 4 cánh tự động bay lơ lửng bên cạnh ghi hình các thí nghiệm và thành tích.',
    rarity: 'vip',
    iconName: 'Cpu',
    tagline: 'Góc nhìn trên cao',
    renderType: 'drone_cam'
  },
  {
    id: 'tech_gaming',
    name: 'Laptop Đồ Họa RGB Tản Nhiệt',
    category: 'tech',
    costCoins: 110,
    costStars: 11,
    description: 'Bàn phím đổi màu rực rỡ, mô phỏng hình học 3D và thí nghiệm mượt mà.',
    rarity: 'mythic',
    iconName: 'Cpu',
    tagline: 'Chiến mượt mọi tác vụ',
    renderType: 'gaming'
  },
  {
    id: 'tech_holo_desk',
    name: 'Bàn Điều Khiển Hologram Đội Trưởng',
    category: 'tech',
    costCoins: 145,
    costStars: 15,
    description: 'Trạm chiếu bản đồ 3D nổi giữa không trung để điều phối nhiệm vụ cùng bạn bè.',
    rarity: 'mythic',
    iconName: 'Server',
    tagline: 'Tổng hành dinh thông minh',
    renderType: 'holo_desk',
    setId: 'set_superhero'
  },
  {
    id: 'tech_quantum',
    name: 'Lõi Máy Tính Lượng Tử AI',
    category: 'tech',
    costCoins: 160,
    costStars: 17,
    description: 'Khối năng lượng xoay quanh hạt nhân lượng tử, xử lý hàng triệu phép tính trong chớp mắt.',
    rarity: 'mythic',
    iconName: 'Server',
    tagline: 'Trí tuệ vũ trụ',
    renderType: 'quantum'
  },

  // =========================================================================
  // 6. THÚ CƯNG ĐỒNG HÀNH (PET - 12 món)
  // =========================================================================
  {
    id: 'pet_none',
    name: 'Tự Lực Cánh Sinh',
    category: 'pet',
    costCoins: 0,
    costStars: 0,
    description: 'Rèn luyện tinh thần độc lập và tự giác khi chinh phục các bài học.',
    rarity: 'base',
    iconName: 'Smile',
    tagline: 'Tự tin tự giác',
    renderType: 'none'
  },
  {
    id: 'pet_corgi',
    name: 'Cún Corgi Đeo Nơ Đỏ',
    category: 'pet',
    costCoins: 18,
    costStars: 1,
    description: 'Chú cún chân ngắn tinh nghịch luôn vẫy đuôi cổ vũ mỗi khi bạn ghi điểm.',
    rarity: 'popular',
    iconName: 'Heart',
    tagline: 'Người bạn trung thành',
    renderType: 'corgi',
    setId: 'set_pet_lover'
  },
  {
    id: 'pet_cat',
    name: 'Mèo Mướp Ham Học',
    category: 'pet',
    costCoins: 24,
    costStars: 2,
    description: 'Chú mèo mướp thông minh meo meo ăn mừng khi bạn đạt chuỗi Combo.',
    rarity: 'popular',
    iconName: 'Cat',
    tagline: 'Bạn thân chăm chỉ',
    renderType: 'cat'
  },
  {
    id: 'pet_panda',
    name: 'Gấu Trúc Võ Sư Đai Đen',
    category: 'pet',
    costCoins: 34,
    costStars: 3,
    description: 'Bé gấu trúc mũm mĩm quấn băng đô đỏ rất chăm luyện tập cùng bạn mỗi ngày.',
    rarity: 'popular',
    iconName: 'Heart',
    tagline: 'Kiên trì bền bỉ',
    renderType: 'panda',
    setId: 'set_pet_lover'
  },
  {
    id: 'pet_bunny',
    name: 'Thỏ Ngọc Đeo Kính Tri Thức',
    category: 'pet',
    costCoins: 42,
    costStars: 4,
    description: 'Tai dài đáng yêu, nhảy tưng tưng mỗi lần bạn hoàn thành xuất sắc 15 câu.',
    rarity: 'vip',
    iconName: 'Sparkles',
    tagline: 'Nhanh nhẹn tinh anh',
    renderType: 'bunny'
  },
  {
    id: 'pet_fox',
    name: 'Cáo Nhí Chín Đuôi Trí Tuệ',
    category: 'pet',
    costCoins: 56,
    costStars: 5,
    description: 'Tiểu hồ ly cam vàng thông minh với chùm đuôi xù mịn tỏa sáng dịu nhẹ.',
    rarity: 'vip',
    iconName: 'Sparkles',
    tagline: 'Linh hoạt sáng dạ',
    renderType: 'fox',
    setId: 'set_pet_lover'
  },
  {
    id: 'pet_owl',
    name: 'Cú Vọ Tiến Sĩ Mũ Vuông',
    category: 'pet',
    costCoins: 68,
    costStars: 7,
    description: 'Đội mũ tốt nghiệp tí hon, biểu tượng thông thái nhắc bạn đọc kỹ đề bài.',
    rarity: 'vip',
    iconName: 'Feather',
    tagline: 'Biểu tượng thông thái',
    renderType: 'owl'
  },
  {
    id: 'pet_vuibot',
    name: 'Robot VNPT Vui-Bot Mini',
    category: 'pet',
    costCoins: 85,
    costStars: 8,
    description: 'Phiên bản đồng hành thu nhỏ của linh vật VNPT Vui-Bot, mắt LED biết cười cực dễ thương.',
    rarity: 'vip',
    iconName: 'Bot',
    tagline: 'Trợ thủ công nghệ',
    renderType: 'robot',
    setId: 'set_scientist'
  },
  {
    id: 'pet_unicorn',
    name: 'Thú Cưỡi Kỳ Lân Sao Băng',
    category: 'pet',
    costCoins: 148,
    costStars: 15,
    description: 'Chú kỳ lân trắng bờm cầu vồng với sừng vàng lấp lánh mang lại niềm vui bất tận.',
    rarity: 'mythic',
    iconName: 'Star',
    tagline: 'Phép màu diệu kỳ',
    renderType: 'unicorn',
    setId: 'set_pet_lover'
  },
  {
    id: 'pet_dragon',
    name: 'Rồng Con Tí Nị Lửa Vàng',
    category: 'pet',
    costCoins: 155,
    costStars: 16,
    description: 'Bé rồng huyền thoại bay lơ lửng vỗ cánh, mang lại may mắn trên mọi đấu trường.',
    rarity: 'mythic',
    iconName: 'Flame',
    tagline: 'Thần thú may mắn',
    renderType: 'dragon'
  },
  {
    id: 'pet_mecha_lion',
    name: 'Sư Tử Robot Biệt Đội Vàng',
    category: 'pet',
    costCoins: 165,
    costStars: 17,
    description: 'Chiến thú cơ khí bờm vàng kim dũng mãnh sẵn sàng hợp lực cùng chủ nhân.',
    rarity: 'mythic',
    iconName: 'Crown',
    tagline: 'Mãnh thú cơ khí',
    renderType: 'mecha_lion',
    setId: 'set_elemental'
  },
  {
    id: 'pet_phoenix',
    name: 'Phượng Hoàng Lửa Nhí',
    category: 'pet',
    costCoins: 175,
    costStars: 18,
    description: 'Chú chim phượng hoàng rực rỡ sải cánh vàng cam biểu tượng của ý chí vươn lên.',
    rarity: 'mythic',
    iconName: 'Flame',
    tagline: 'Tái sinh rực rỡ',
    renderType: 'phoenix'
  },

  // =========================================================================
  // 7. PHÔNG NỀN & THẾ GIỚI (BACKDROP - 10 món)
  // =========================================================================
  {
    id: 'bg_classroom',
    name: 'Lớp Học Nắng Mai',
    category: 'backdrop',
    costCoins: 0,
    costStars: 0,
    description: 'Khung cảnh lớp học sáng sủa ngập tràn ánh nắng ban mai và bảng xanh thân quen.',
    rarity: 'base',
    iconName: 'Image',
    tagline: 'Khởi đầu quen thuộc',
    renderType: 'bg_classroom'
  },
  {
    id: 'bg_forest',
    name: 'Đảo Thám Hiểm Rừng Xanh',
    category: 'backdrop',
    costCoins: 20,
    costStars: 2,
    description: 'Thảm cỏ xanh mướt cùng thác pha lê lấp lánh trên quần đảo Thám Hiểm.',
    rarity: 'popular',
    iconName: 'Trees',
    tagline: 'Thiên nhiên tươi mát',
    renderType: 'bg_forest',
    setId: 'set_explorer'
  },
  {
    id: 'bg_my_room',
    name: 'Phòng Cá Nhân Học Sinh',
    category: 'backdrop',
    costCoins: 25,
    costStars: 2,
    description: 'Căn phòng riêng ấm cúng có bàn học máy tính, giường ngủ, kệ sách và cây xanh tự trang trí.',
    rarity: 'popular',
    iconName: 'Home',
    tagline: 'Góc học tập riêng',
    renderType: 'bg_my_room'
  },
  {
    id: 'bg_ocean',
    name: 'Đại Dương San Hô Xanh Thẳm',
    category: 'backdrop',
    costCoins: 36,
    costStars: 3,
    description: 'Làn nước biển trong vắt với rặng san hô rực rỡ, bọt khí và đàn cá nhỏ tung tăng.',
    rarity: 'popular',
    iconName: 'Waves',
    tagline: 'Khám phá đại dương',
    renderType: 'bg_ocean'
  },
  {
    id: 'bg_lab',
    name: 'Phòng Lab Công Nghệ VNPT',
    category: 'backdrop',
    costCoins: 46,
    costStars: 5,
    description: 'Phòng thí nghiệm công nghệ cao với màn hình hình học và ánh sáng xanh dịu.',
    rarity: 'vip',
    iconName: 'Atom',
    tagline: 'Khoa học hiện đại',
    renderType: 'bg_lab',
    setId: 'set_scientist'
  },
  {
    id: 'bg_magic_forest',
    name: 'Rừng Phép Thuật Đom Đóm',
    category: 'backdrop',
    costCoins: 62,
    costStars: 6,
    description: 'Khu rừng huyền bí với tinh thể phát sáng, cây cổ thụ và đom đóm lung linh.',
    rarity: 'vip',
    iconName: 'Sparkles',
    tagline: 'Khu rừng kỳ ảo',
    renderType: 'bg_magic_forest',
    setId: 'set_pet_lover'
  },
  {
    id: 'bg_castle',
    name: 'Lâu Đài Phép Thuật Hoàng Gia',
    category: 'backdrop',
    costCoins: 68,
    costStars: 7,
    description: 'Tòa lâu đài tháp nhọn lung linh giữa thung lũng ánh dương đầy cờ hoa.',
    rarity: 'vip',
    iconName: 'Crown',
    tagline: 'Vương quốc tri thức',
    renderType: 'bg_castle'
  },
  {
    id: 'bg_arena',
    name: 'Đấu Trường Ánh Dương',
    category: 'backdrop',
    costCoins: 74,
    costStars: 8,
    description: 'Khán đài rực rỡ cờ hoa chào đón những nhà vô địch leo Top Bảng Vàng.',
    rarity: 'vip',
    iconName: 'Trophy',
    tagline: 'Sân khấu vinh quang',
    renderType: 'bg_arena'
  },
  {
    id: 'bg_future_city',
    name: 'Thành Phố Tương Lai Neo-HSV',
    category: 'backdrop',
    costCoins: 82,
    costStars: 8,
    description: 'Đô thị công nghệ với các tòa tháp ánh sáng, tàu điện trên cao và bầu trời neon dịu.',
    rarity: 'vip',
    iconName: 'Building2',
    tagline: 'Đô thị siêu anh hùng',
    renderType: 'bg_future_city',
    setId: 'set_superhero'
  },
  {
    id: 'bg_galaxy',
    name: 'Vũ Trụ Tri Thức Lượng Tử',
    category: 'backdrop',
    costCoins: 135,
    costStars: 14,
    description: 'Bầu trời cực quang sâu thẳm với các chòm sao và khối đa diện trôi lơ lửng.',
    rarity: 'mythic',
    iconName: 'Sparkles',
    tagline: 'Bao la vô tận',
    renderType: 'bg_galaxy',
    setId: 'set_cosmic'
  },

  // =========================================================================
  // 8. HÀO QUANG & HIỆU ỨNG (AURA - 10 món)
  // =========================================================================
  {
    id: 'aura_none',
    name: 'Mặc Định Tự Nhiên',
    category: 'aura',
    costCoins: 0,
    costStars: 0,
    description: 'Hiển thị nhân vật mộc mạc, gọn gàng không kèm hiệu ứng vòng sáng.',
    rarity: 'base',
    iconName: 'Circle',
    tagline: 'Đơn giản tinh tế',
    renderType: 'aura_none'
  },
  {
    id: 'aura_sparkle',
    name: 'Bụi Sao Lấp Lánh',
    category: 'aura',
    costCoins: 22,
    costStars: 2,
    description: 'Những ngôi sao vàng nhỏ xoay nhẹ xung quanh nhân vật đầy sinh động.',
    rarity: 'popular',
    iconName: 'Sparkles',
    tagline: 'Lấp lánh tỏa sáng',
    renderType: 'aura_sparkle'
  },
  {
    id: 'aura_footsteps',
    name: 'Hiệu Ứng Bước Chân Ánh Sao',
    category: 'aura',
    costCoins: 26,
    costStars: 2,
    description: 'Dải vòng năng lượng và dấu bước chân phát sáng lấp lánh dưới chân nhân vật.',
    rarity: 'popular',
    iconName: 'Footprints',
    tagline: 'Từng bước vững vàng',
    renderType: 'aura_footsteps',
    setId: 'set_racer'
  },
  {
    id: 'aura_rainbow',
    name: 'Cầu Vồng Rực Rỡ Ngũ Sắc',
    category: 'aura',
    costCoins: 32,
    costStars: 3,
    description: 'Vòm cầu vồng bảy sắc kèm những ngôi sao nhỏ mang năng lượng tích cực mỗi ngày.',
    rarity: 'popular',
    iconName: 'Sun',
    tagline: 'Niềm vui ngập tràn',
    renderType: 'aura_rainbow'
  },
  {
    id: 'aura_electric',
    name: 'Vòng Năng Lượng Xanh VNPT',
    category: 'aura',
    costCoins: 54,
    costStars: 5,
    description: 'Vòng quỹ đạo điện tích xanh dương xoay đều chuẩn công nghệ số.',
    rarity: 'vip',
    iconName: 'Zap',
    tagline: 'Tốc độ ánh sáng',
    renderType: 'aura_electric',
    setId: 'set_scientist'
  },
  {
    id: 'aura_ice',
    name: 'Vòng Băng Pha Lê Tuyết Trắng',
    category: 'aura',
    costCoins: 58,
    costStars: 5,
    description: 'Những bông tuyết pha lê xoay quanh tạo cảm giác mát lạnh và tập trung.',
    rarity: 'vip',
    iconName: 'Snowflake',
    tagline: 'Tinh khiết pha lê',
    renderType: 'aura_ice'
  },
  {
    id: 'aura_lightning',
    name: 'Hào Quang Tia Sét Bão Tố',
    category: 'aura',
    costCoins: 66,
    costStars: 6,
    description: 'Những tia chớp vàng – xanh bùng nổ quanh nhân vật chuẩn phong cách chiến binh.',
    rarity: 'vip',
    iconName: 'Zap',
    tagline: 'Phản xạ thần tốc',
    renderType: 'aura_lightning',
    setId: 'set_elemental'
  },
  {
    id: 'aura_flame',
    name: 'Hào Quang Phượng Hoàng Vàng',
    category: 'aura',
    costCoins: 125,
    costStars: 13,
    description: 'Vầng hào quang rực lửa vàng kim uy nghiêm của bậc Trạng Nguyên Đấu Trường.',
    rarity: 'mythic',
    iconName: 'Flame',
    tagline: 'Khí chất vô địch',
    renderType: 'aura_flame',
    setId: 'set_cosmic'
  },
  {
    id: 'aura_wings_angel',
    name: 'Đôi Cánh Thiên Thần Ánh Sáng',
    category: 'aura',
    costCoins: 138,
    costStars: 14,
    description: 'Đôi cánh lông vũ trắng ngà viền vàng rạng rỡ phía sau lưng nhân vật.',
    rarity: 'mythic',
    iconName: 'Feather',
    tagline: 'Đôi cánh ước mơ',
    renderType: 'aura_wings_angel'
  },
  {
    id: 'aura_wings_cyber',
    name: 'Đôi Cánh Phản Quang Siêu Anh Hùng',
    category: 'aura',
    costCoins: 150,
    costStars: 15,
    description: 'Đôi cánh năng lượng công nghệ cao màu xanh cyan – vàng cực ngầu.',
    rarity: 'mythic',
    iconName: 'Sparkles',
    tagline: 'Sải cánh tương lai',
    renderType: 'aura_wings_cyber',
    setId: 'set_superhero'
  }
];

export const HAIR_STYLES = [
  { id: 'short_neat', name: 'Tóc Ngắn Gọn Gàng', forGender: ['boy', 'girl', 'scholar'] },
  { id: 'undercut', name: 'Undercut Sành Điệu', forGender: ['boy', 'scholar'] },
  { id: 'messy_spiky', name: 'Tóc Nhím Năng Động', forGender: ['boy', 'scholar'] },
  { id: 'ponytail', name: 'Đuôi Ngựa Năng Động', forGender: ['girl'] },
  { id: 'ponytail_ribbon', name: 'Đuôi Ngựa Nơ Hồng', forGender: ['girl'] },
  { id: 'twintails', name: 'Buộc Hai Bên Chibi', forGender: ['girl'] },
  { id: 'bob_bangs', name: 'Mái Ngố Đáng Yêu', forGender: ['girl'] },
  { id: 'curly_wave', name: 'Xoăn Bồng Bềnh Cá Tính', forGender: ['boy', 'girl', 'scholar'] },
  { id: 'hat_cap_red', name: 'Mũ Lưỡi Trai Ngôi Sao', forGender: ['boy', 'girl', 'scholar'] },
  { id: 'headphones_cat', name: 'Tai Nghe Mèo Game Thủ', forGender: ['boy', 'girl', 'scholar'] },
  { id: 'crown_princess', name: 'Vương Miện Công Chúa', forGender: ['girl'] },
  { id: 'tiara_fairy', name: 'Bờm Cánh Tiên Lung Linh', forGender: ['girl'] },
  { id: 'hat_nonla', name: 'Nón Lá Quê Hương', forGender: ['boy', 'girl', 'scholar'] },
  { id: 'hat_pirate', name: 'Mũ Thuyền Trưởng Hải Tặc', forGender: ['boy', 'girl', 'scholar'] },
  { id: 'helmet_hero', name: 'Mũ Giáp Siêu Anh Hùng', forGender: ['boy', 'girl', 'scholar'] },
  { id: 'helmet_ranger', name: 'Mũ Chiến Binh Biệt Đội', forGender: ['boy', 'girl', 'scholar'] },
  { id: 'hood_ninja', name: 'Khăn Trùm Ninja Bóng Đêm', forGender: ['boy', 'girl', 'scholar'] },
  { id: 'helmet_racer', name: 'Mũ Bảo Hiểm Tay Đua', forGender: ['boy', 'girl', 'scholar'] },
  { id: 'hat_wizard', name: 'Mũ Pháp Sư Chóp Nhọn', forGender: ['boy', 'girl', 'scholar'] },
  { id: 'helmet_astro', name: 'Mũ Phi Hành Gia Vòm Kính', forGender: ['boy', 'girl', 'scholar'] }
];

export const HAIR_COLORS = [
  { id: '#1E293B', name: 'Đen Tuyền' },
  { id: '#78350F', name: 'Nâu Hạt Dẻ' },
  { id: '#D97706', name: 'Vàng Nắng' },
  { id: '#DC2626', name: 'Đỏ Năng Lượng' },
  { id: '#7C3AED', name: 'Tím Khói' },
  { id: '#0284C7', name: 'Xanh Biển' }
];

export const SKIN_TONES = [
  { id: '#FDDFC6', name: 'Sáng Hồng' },
  { id: '#F7CEB2', name: 'Tự Nhiên' },
  { id: '#E8B693', name: 'Bánh Mật' },
  { id: '#C68B59', name: 'Rắn Rỏi' }
];

export const EYE_EXPRESSIONS = [
  { id: 'glasses_happy', name: 'Kính Cận Bác Học & Cười Tươi' },
  { id: 'sparkle_joy', name: 'Mắt Long Lanh Tinh Anh' },
  { id: 'cool_wink', name: 'Nháy Mắt Tự Tin' },
  { id: 'heart_eyes', name: 'Mắt Trái Tim Yêu Thích' },
  { id: 'star_eyes', name: 'Mắt Ngôi Sao Hào Hứng' },
  { id: 'surprised_cute', name: 'Ngạc Nhiên Dễ Thương' },
  { id: 'focused_scholar', name: 'Tập Trung Cao Độ' },
  { id: 'sunglasses_boss', name: 'Kính Đen Cool Ngầu' },
  { id: 'visor_hud', name: 'Kính Chiến Binh Công Nghệ HUD' },
  { id: 'mask_hero', name: 'Mặt Nạ Siêu Anh Hùng' },
  { id: 'goggles_racer', name: 'Kính Phi Công Đua Xe' },
  { id: 'flame_eyes', name: 'Đôi Mắt Rực Lửa Quyết Tâm' }
];

export const AVATAR_FRAMES: {
  id: 'frame_none' | 'frame_cat_gold' | 'frame_star_blue' | 'frame_rainbow' | 'frame_hero_shield';
  name: string;
  desc: string;
  ringClass: string;
  accentColor: string;
}[] = [
  {
    id: 'frame_none',
    name: 'Mặc Định Gọn Gàng',
    desc: 'Khung sân khấu tiêu chuẩn rõ nét',
    ringClass: 'border-slate-200 dark:border-slate-700',
    accentColor: '#64748B'
  },
  {
    id: 'frame_cat_gold',
    name: 'Khung Tai Mèo Vàng Kim',
    desc: 'Viền vàng rực rỡ kèm tai mèo đáng yêu',
    ringClass: 'border-amber-400 ring-4 ring-amber-300/40 dark:ring-amber-500/30',
    accentColor: '#F59E0B'
  },
  {
    id: 'frame_star_blue',
    name: 'Khung Ánh Sao Vũ Trụ',
    desc: 'Ánh xanh dương lấp lánh các vì sao',
    ringClass: 'border-sky-400 ring-4 ring-sky-400/35 dark:ring-sky-500/30',
    accentColor: '#0EA5E9'
  },
  {
    id: 'frame_rainbow',
    name: 'Khung Cầu Vồng Ngọt Ngào',
    desc: 'Viền sắc màu tươi vui đầy năng lượng',
    ringClass: 'border-pink-400 ring-4 ring-fuchsia-400/30 dark:ring-pink-500/25',
    accentColor: '#EC4899'
  },
  {
    id: 'frame_hero_shield',
    name: 'Khung Huy Hiệu Siêu Anh Hùng',
    desc: 'Khung chiến binh đỏ xanh mạnh mẽ',
    ringClass: 'border-red-500 ring-4 ring-blue-500/30 dark:ring-red-500/30',
    accentColor: '#DC2626'
  }
];
