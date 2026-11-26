-- hsv_phase15_avatar_world.sql (ADDITIVE & IDEMPOTENT)
-- Target: Supabase project owqbwykjabwevkbjroym (after hsv_phase14).
-- Expands HSV Avatar World (v0.2.16) to 103 studio items across 8 categories,
-- 7 studio collection sets, personal room backdrop, and updated vehicle travel discounts.

-- ===== 1. UPSERT ALL 103 STUDIO ITEMS =====
insert into public.shop_items (
  item_key, name, description, item_type, price_coins, required_stars, is_active,
  rarity, tagline, render_type, set_id, sort_order
) values
  ('outfit_uniform', 'Đồng Phục Khăn Quàng Đỏ', 'Áo sơ mi trắng tinh khôi thắt khăn quàng đỏ tươi. Chuẩn tác phong học sinh gương mẫu.', 'outfit', 0, 0, true, 'base', 'Học sinh chăm ngoan', 'uniform', null, 1),
  ('outfit_scout', 'Áo Gile Thám Hiểm Bản Đồ', 'Áo túi hộp kaki năng động gắn huy hiệu la bàn, sẵn sàng vượt ải trên Bản đồ thám hiểm.', 'outfit', 12, 0, true, 'popular', 'Sẵn sàng vượt ải', 'scout', 'set_explorer', 2),
  ('outfit_sport', 'Áo Thể Dục Năng Động 3 Sọc', 'Thoáng mát, co giãn cực tốt cho những giờ thể dục và đấu trường siêu tốc.', 'outfit', 18, 0, true, 'popular', 'Khỏe để học tốt', 'sport', null, 3),
  ('outfit_hoodie', 'Hoodie Biệt Đội Tri Thức', 'Áo hoodie in biểu tượng Số Pi và Vô Cùng, giữ ấm mỗi tối ôn bài chuẩn bị kiểm tra.', 'outfit', 24, 2, true, 'popular', 'Ấm áp mùa ôn thi', 'hoodie', null, 4),
  ('outfit_racer', 'Đồ Đua Siêu Tốc Turbo', 'Bộ đồ tay đua phối sắc trắng xanh dương và sọc cờ về đích cực ngầu cho đường đua tri thức.', 'outfit', 28, 2, true, 'popular', 'Bứt phá tốc độ', 'racer', 'set_racer', 5),
  ('outfit_ranger_red', 'Chiến Giáp Biệt Đội Đỏ Rực', 'Trang phục biệt đội chiến binh nguyên bản Học Siêu Vui với đai lưng ngôi sao sức mạnh.', 'outfit', 32, 3, true, 'popular', 'Đoàn kết là sức mạnh', 'ranger_red', 'set_elemental', 6),
  ('outfit_lab', 'Áo Blouse Nhà Khoa Học Nhí', 'Áo choàng trắng phòng thí nghiệm kèm kính bảo hộ gắn trán cho tín đồ Khoa học tự nhiên.', 'outfit', 42, 4, true, 'vip', 'Say mê khám phá', 'lab', 'set_scientist', 7),
  ('outfit_detective', 'Vest Thám Tử Lừng Danh', 'Bộ vest lịch lãm thắt nơ đỏ, chuyên gia phá giải các bài toán hóc búa nhất.', 'outfit', 52, 5, true, 'vip', 'Chân lý chỉ có một', 'detective', null, 8),
  ('outfit_ninja', 'Bộ Đồ Ninja Bóng Đêm', 'Trang phục ninja gọn nhẹ với khăn choàng đỏ và giáp vai ẩn mình chinh phục thử thách.', 'outfit', 58, 5, true, 'vip', 'Nhanh nhẹn bí ẩn', 'ninja', null, 9),
  ('outfit_varsity', 'Áo Khoác Bóng Chày Học Đường', 'Áo khoác Varsity xanh navy phối tay kem cực chất dành cho thủ lĩnh đội tuyển lớp.', 'outfit', 65, 6, true, 'vip', 'Phong cách thủ lĩnh', 'varsity', null, 10),
  ('outfit_hero_core', 'Giáp Siêu Anh Hùng Lõi Sao', 'Bộ giáp đỏ vàng phát sáng lõi năng lượng hình ngôi sao trước ngực, sẵn sàng bảo vệ lớp học.', 'outfit', 68, 6, true, 'vip', 'Lõi sao rực cháy', 'hero_core', 'set_superhero', 11),
  ('outfit_knight', 'Giáp Hiệp Sĩ Ánh Sáng', 'Áo giáp bạc viền vàng hoàng gia cùng áo choàng xanh lam uy nghiêm bảo vệ chính nghĩa.', 'outfit', 74, 7, true, 'vip', 'Trung thực & dũng cảm', 'knight', null, 12),
  ('outfit_hero_shield', 'Chiến Giáp Đội Trưởng Ngôi Sao', 'Bộ chiến giáp xanh dương – bạc gắn huy hiệu Ngôi Sao Dũng Cảm dẫn dắt toàn đội.', 'outfit', 78, 7, true, 'vip', 'Tinh thần đồng đội', 'hero_shield', null, 13),
  ('outfit_aodai_tech', 'Cổ Phục Trạng Nguyên Hiện Đại', 'Lấy cảm hứng từ trang phục Trạng Nguyên Việt Nam hòa quyện hoa văn công nghệ ánh kim.', 'outfit', 82, 8, true, 'vip', 'Vinh danh Bảng Vàng', 'aodai_tech', null, 14),
  ('outfit_astronaut', 'Phi Hành Gia Khám Phá Sao', 'Bộ đồ phi hành gia trắng cam với bảng điều khiển oxy và phù hiệu thám hiểm ngân hà.', 'outfit', 88, 9, true, 'vip', 'Vươn tới các vì sao', 'astronaut', null, 15),
  ('outfit_scholar', 'Áo Choàng Pháp Sư Tri Thức', 'Áo choàng nhung tím thêu chòm sao vàng kim, tỏa ánh sáng trí tuệ cổ điển.', 'outfit', 120, 12, true, 'mythic', 'Phép thuật tính nhẩm', 'scholar', 'set_cosmic', 16),
  ('outfit_wizard_ice', 'Áo Choàng Pháp Sư Băng Giá', 'Áo choàng pha lê xanh ngọc lấp lánh tinh thể tuyết giúp đầu óc luôn tỉnh táo giải đề.', 'outfit', 130, 13, true, 'mythic', 'Bình tĩnh tuyệt đối', 'wizard_ice', null, 17),
  ('outfit_ranger_gold', 'Chiến Giáp Biệt Đội Hoàng Kim', 'Phiên bản giáp chiến binh nâng cấp bọc vàng kim với cầu vai sư tử dũng mãnh.', 'outfit', 145, 15, true, 'mythic', 'Thủ lĩnh tối thượng', 'ranger_gold', null, 18),
  ('outfit_cyber', 'Bộ Giáp Phi Hành Gia Lượng Tử', 'Trang phục công nghệ vũ trụ tối tân, sẵn sàng chinh phục dải ngân hà tri thức.', 'outfit', 165, 18, true, 'mythic', 'Đỉnh cao tương lai', 'cyber', 'set_cosmic', 19),
  ('outfit_mecha_pilot', 'Giáp Phi Công Robot Biến Hình', 'Bộ giáp cơ khí đa sắc chuẩn buồng lái robot khổng lồ với lò phản ứng xanh dương.', 'outfit', 175, 18, true, 'mythic', 'Hợp thể chiến thắng', 'mecha_pilot', null, 20),
  ('hand_pencil', 'Bút Chì 2B Cổ Điển', 'Cây bút chì quen thuộc vẽ hình, nháp phép tính không bao giờ thiếu trong cặp sách.', 'handheld', 0, 0, true, 'base', 'Vũ khí khởi đầu', 'pencil', null, 21),
  ('hand_ruler', 'Thước Kẻ Dẻo Cầu Vồng', 'Thước nhựa dẻo uốn cong không gãy, đo chuẩn từng milimet trên vở ô ly.', 'handheld', 10, 0, true, 'popular', 'Đo chuẩn từng ly', 'ruler', null, 22),
  ('hand_star_wand', 'Gậy Phép Ngôi Sao Tri Thức', 'Đầu gậy gắn ngôi sao vàng lấp lánh, vung lên là giải xong phép tính khó.', 'handheld', 15, 1, true, 'popular', 'Tỏa sáng mỗi câu đúng', 'star_wand', null, 23),
  ('hand_backpack_rocket', 'Cặp Sách Tên Lửa Siêu Tốc', 'Cặp sách học sinh gắn hai ống đẩy mini giúp mang đầy đủ sách vở mà nhẹ tênh.', 'handheld', 18, 1, true, 'popular', 'Đến lớp siêu vui', 'backpack_rocket', null, 24),
  ('hand_compass', 'Bộ Compa Hợp Kim Titan', 'Vẽ đường tròn, tam giác đều và hình lục giác sắc nét đến từng milimet.', 'handheld', 22, 2, true, 'popular', 'Tuyệt đỉnh hình học', 'compass', null, 25),
  ('hand_camera', 'Máy Ảnh Phóng Viên Nhí', 'Chiếc máy ảnh nhỏ xinh chớp đèn flash ghi lại mọi kỳ quan trên bản đồ Việt Nam.', 'handheld', 25, 2, true, 'popular', 'Lưu giữ kỷ niệm', 'camera', 'set_explorer', 26),
  ('hand_micro', 'Micro Ngôi Sao Sân Khấu', 'Micro không dây lấp lánh dành cho các bạn tự tin thuyết trình và ca hát.', 'handheld', 28, 2, true, 'popular', 'Tự tin tỏa sáng', 'micro', null, 27),
  ('hand_magnifier', 'Kính Lúp Thám Tử Bạc', 'Soi rõ từng chi tiết bẫy đề bài trong SGK và thí nghiệm khoa học tự nhiên.', 'handheld', 36, 3, true, 'vip', 'Bắt trọn mọi bẫy đề', 'magnifier', 'set_explorer', 28),
  ('hand_beaker', 'Bộ Ống Nghiệm Pha Chế Kỳ Diệu', 'Cặp bình thí nghiệm sủi bọt xanh ngọc và vàng rực cho nhà khoa học nhí.', 'handheld', 44, 4, true, 'vip', 'Thí nghiệm kỳ thú', 'beaker', 'set_scientist', 29),
  ('hand_casio', 'Máy Tính Khoa Học FX Pro', 'Chiếc máy tính bỏ túi huyền thoại của mọi học sinh phổ thông, bấm nhanh như chớp.', 'handheld', 48, 5, true, 'vip', 'Bảo bối phòng thi', 'casio', 'set_scientist', 30),
  ('hand_guitar', 'Đàn Guitar Điện Cầu Vồng', 'Cây đàn guitar điện gọn nhẹ khuấy động không khí giờ ra chơi và Sảnh Online.', 'handheld', 52, 5, true, 'vip', 'Giai điệu tuổi thơ', 'guitar', null, 31),
  ('hand_telescope', 'Kính Thiên Văn Khám Phá Sao', 'Ống kính đồng thau viền xanh giúp quan sát các chòm sao và hành tinh xa xôi.', 'handheld', 60, 6, true, 'vip', 'Ngắm nhìn bầu trời', 'telescope', null, 32),
  ('hand_trophy_mini', 'Cúp Pha Lê Đấu Trường', 'Chiếc cúp pha lê lấp lánh biểu tượng của nhà vô địch Đấu Trường 60 giây.', 'handheld', 72, 7, true, 'vip', 'Chiến thắng vang dội', 'trophy_mini', null, 33),
  ('hand_laser', 'Kiếm Ánh Sáng Số Học', 'Phát ra chùm tia sáng ngọc lục bảo chỉ thẳng vào đáp án chính xác.', 'handheld', 115, 12, true, 'mythic', 'Chỉ đâu trúng đó', 'laser', 'set_cosmic', 34),
  ('hand_hero_shield', 'Khiên Năng Lượng Ngôi Sao', 'Tấm khiên tròn ba vòng đỏ – bạc – xanh với ngôi sao chính giữa bảo vệ tri thức.', 'handheld', 125, 12, true, 'mythic', 'Vững vàng trước mọi đề khó', 'hero_shield', 'set_superhero', 35),
  ('hand_element_staff', 'Quyền Trượng Ngũ Hành Nguyên Tố', 'Trượng pha lê tỏa năng lượng năm màu Kim – Mộc – Thủy – Hỏa – Thổ rực rỡ.', 'handheld', 140, 14, true, 'mythic', 'Sức mạnh ngũ hành', 'element_staff', 'set_elemental', 36),
  ('hand_tome', 'Đại Bí Kíp Tri Thức Dát Vàng', 'Cuốn cổ thư dát vàng tổng hợp trọn vẹn công thức Toán và Khoa học từ Lớp 1 đến Lớp 9.', 'handheld', 150, 16, true, 'mythic', 'Bí kíp trấn phái', 'tome', null, 37),
  ('phone_brick', 'Điện Thoại Cục Gạch Huyền Thoại', 'Pin bền cả tháng, rơi xuống sân trường không một vết xước.', 'phone', 0, 0, true, 'base', 'Nồi đồng cối đá', 'brick', null, 38),
  ('phone_walkie', 'Bộ Đàm Thám Hiểm Rừng Xanh', 'Bắt sóng cực khỏe để gọi đồng đội cùng vượt ải trên Bản đồ.', 'phone', 12, 0, true, 'popular', 'Kết nối đồng đội', 'walkie', null, 39),
  ('phone_flip', 'Điện Thoại Nắp Gập Retro', 'Gập kêu tanh tách sành điệu với sắc hồng pastel trẻ trung.', 'phone', 20, 1, true, 'popular', 'Phong cách cổ điển', 'flip', null, 40),
  ('phone_cameraphone', 'Smartphone Quay Vlog Học Đường', 'Gắn tay cầm chống rung kèm vòng đèn selfie quay video giải bài tập siêu nét.', 'phone', 32, 3, true, 'popular', 'Sáng tạo nội dung', 'cameraphone', null, 41),
  ('phone_smart', 'Smartphone Màn Hình Tràn Viền', 'Lướt học siêu mượt, màn hình sắc nét bảo vệ mắt cho học sinh.', 'phone', 45, 4, true, 'vip', 'Thông minh đa năng', 'smart', null, 42),
  ('phone_ranger_morpher', 'Đồng Hồ Biến Hình Biệt Đội', 'Thiết bị liên lạc đeo tay phát sáng 5 viên đá nguyên tố để triệu hồi biệt đội.', 'phone', 55, 5, true, 'vip', 'Biến hình sẵn sàng', 'ranger_morpher', 'set_elemental', 43),
  ('phone_console_mini', 'Máy Chơi Game Cầm Tay Pro', 'Máy game cầm tay hai tay cầm neon giải trí thông minh sau giờ học.', 'phone', 65, 6, true, 'vip', 'Học vui chơi chất', 'console_mini', 'set_racer', 44),
  ('phone_promax', 'Flagship Titan Sa Mạc', 'Khung viền titan vàng cát sang trọng với cụm 3 camera siêu nét.', 'phone', 75, 8, true, 'vip', 'Đẳng cấp học đường', 'promax', null, 45),
  ('phone_holo', 'Máy Chiếu Hologram 3D AI', 'Chiếu mô hình hình học không gian lơ lửng 3D ngay trên lòng bàn tay.', 'phone', 140, 15, true, 'mythic', 'Công nghệ viễn tưởng', 'holo', null, 46),
  ('veh_honeycomb', 'Dép Tổ Ong Huyền Thoại', 'Đôi dép quốc dân êm ái, đồng hành cùng biết bao thế hệ học trò Việt Nam.', 'vehicle', 0, 0, true, 'base', 'Bước chân dũng cảm', 'honeycomb', null, 47),
  ('veh_skateboard', 'Ván Trượt Đường Phố Năng Động', 'Ván gỗ phong 7 lớp họa tiết đường phố cực ngầu để lướt qua sân trường.', 'vehicle', 14, 1, true, 'popular', 'Lướt nhanh như gió', 'skateboard', null, 48),
  ('veh_bike_mini', 'Xe Đạp Mini Cổ Điển Có Giỏ', 'Xe đạp màu xanh ngọc có giỏ đựng sách vở và chuông reng reng vui tai.', 'vehicle', 24, 2, true, 'popular', 'Kỷ niệm tuổi thơ', 'bike_mini', null, 49),
  ('veh_scooter_pastel', 'Xe Tay Ga Mini Pastel', 'Nhỏ gọn, xinh xắn màu xanh bạc hà cùng đèn pha tròn cổ điển.', 'vehicle', 42, 4, true, 'vip', 'Dạo phố siêu xinh', 'scooter_pastel', null, 50),
  ('veh_mountain', 'Xe Đạp Địa Hình Thể Thao', 'Bánh gai hầm hố, bộ đề 21 tốc độ chinh phục mọi cung đường đồi núi.', 'vehicle', 55, 5, true, 'vip', 'Vua leo dốc', 'mountain', 'set_explorer', 51),
  ('veh_ebike', 'Xe Điện Thông Minh Xanh', 'Chạy điện êm ru, thân thiện môi trường, không lo trễ giờ vào lớp.', 'vehicle', 78, 7, true, 'vip', 'Êm ái thần tốc', 'ebike', null, 52),
  ('veh_jetpack', 'Đôi Cánh Phản Lực Siêu Tốc', 'Ba lô phản lực kép giúp bạn bay vút trên không trung và giảm 15% vé du hành.', 'vehicle', 85, 8, true, 'vip', 'Bay lượn tự do', 'jetpack', null, 53),
  ('veh_supercar', 'Siêu Xe Đua Turbo HSV', 'Siêu xe thể thao đỏ vàng khí động học, giảm 15% vé du hành xuyên Việt.', 'vehicle', 88, 8, true, 'vip', 'Đỉnh cao đường đua', 'supercar', 'set_racer', 54),
  ('veh_cyber_moto', 'Siêu Mô Tô Năng Lượng Xanh', 'Mô tô tương lai bánh phát sáng neon xanh ngọc, lướt cực êm qua mọi thành phố.', 'vehicle', 95, 9, true, 'vip', 'Tia chớp tương lai', 'cyber_moto', 'set_racer', 55),
  ('veh_hoverboard', 'Ván Trượt Phản Trọng Lực', 'Lơ lửng cách mặt đất 20cm với ánh sáng xanh dương công nghệ cao.', 'vehicle', 120, 12, true, 'mythic', 'Bay trên mặt đất', 'hoverboard', null, 56),
  ('veh_cloud_nimbus', 'Đám Mây Thần Tốc Cầu Vồng', 'Đám mây bồng bềnh tỏa dải cầu vồng lơ lửng trên bầu trời kỳ ảo, giảm 30% vé bay.', 'vehicle', 155, 16, true, 'mythic', 'Cưỡi mây lướt gió', 'cloud_nimbus', null, 57),
  ('veh_spaceship', 'Phi Thuyền Mini VNPT Cloud', 'Tàu vũ trụ cá nhân động cơ phản lực ánh sáng đưa bạn du hành qua các thiên hà.', 'vehicle', 170, 18, true, 'mythic', 'Chinh phục ngân hà', 'spaceship', 'set_cosmic', 58),
  ('veh_mecha_walker', 'Robot Biến Hình Chiến Giáp', 'Cỗ máy chiến giáp biến hình hai chân khổng lồ với buồng lái bảo vệ và giảm 30% vé.', 'vehicle', 185, 20, true, 'mythic', 'Chiến binh khổng lồ', 'mecha_walker', null, 59),
  ('veh_magic_carpet', 'Thảm Bay Thần Thoại Fibonacci', 'Thảm bay dệt hoa văn dãy số vàng, lơ lửng đưa bạn tới đỉnh cao Bảng Vàng.', 'vehicle', 195, 22, true, 'mythic', 'Thần thoại vô đối', 'carpet', null, 60),
  ('veh_hero_jet', 'Phi Cơ Phản Lực Biệt Đội', 'Chiến đấu cơ phản lực siêu thanh màu đỏ – bạc, giảm 30% mọi chuyến du hành!', 'vehicle', 210, 22, true, 'mythic', 'Siêu thanh xuyên Việt', 'hero_jet', null, 61),
  ('tech_notebook', 'Vở Ô Ly Tinh Khôi 96 Trang', 'Giấy trắng chống lóa, kẻ ô ly sắc nét để rèn chữ và ghi chép công thức.', 'tech', 0, 0, true, 'base', 'Nét chữ nết người', 'notebook', null, 62),
  ('tech_abacus', 'Bàn Tính Gẩy Soroban Gỗ', 'Bàn tính hạt gỗ giúp tăng tốc khả năng tính nhẩm siêu tốc cho Tiểu học.', 'tech', 15, 1, true, 'popular', 'Tính nhẩm siêu phàm', 'abacus', null, 63),
  ('tech_drawpad', 'Bảng Vẽ Điện Tử Sáng Tạo', 'Bảng vẽ cảm ứng kèm bút stylus giúp phác thảo hình học và vẽ tranh siêu vui.', 'tech', 28, 2, true, 'popular', 'Sáng tạo không giới hạn', 'drawpad', null, 64),
  ('tech_tablet', 'Máy Tính Bảng SGK Điện Tử', 'Màn hình bảo vệ mắt, mở nhanh toàn bộ sách giáo khoa Lớp 1 đến Lớp 9.', 'tech', 35, 3, true, 'vip', 'Học tập mọi nơi', 'tablet', null, 65),
  ('tech_ultrabook', 'Laptop Nhôm Mỏng Nhẹ Pro', 'Mỏng nhẹ chỉ 1kg, pin dùng cả ngày để lập trình và làm bài thuyết trình nhóm.', 'tech', 62, 6, true, 'vip', 'Làm việc nhóm đỉnh cao', 'ultrabook', null, 66),
  ('tech_vr_station', 'Kính Thực Tế Ảo VR 360', 'Khám phá hệ mặt trời, tế bào sinh học và bảo tàng lịch sử ngay trong phòng học ảo.', 'tech', 75, 7, true, 'vip', 'Trải nghiệm 360 độ', 'vr_station', null, 67),
  ('tech_drone_cam', 'Drone Quay Phim Học Tập', 'Drone 4 cánh tự động bay lơ lửng bên cạnh ghi hình các thí nghiệm và thành tích.', 'tech', 85, 8, true, 'vip', 'Góc nhìn trên cao', 'drone_cam', null, 68),
  ('tech_gaming', 'Laptop Đồ Họa RGB Tản Nhiệt', 'Bàn phím đổi màu rực rỡ, mô phỏng hình học 3D và thí nghiệm mượt mà.', 'tech', 110, 11, true, 'mythic', 'Chiến mượt mọi tác vụ', 'gaming', null, 69),
  ('tech_holo_desk', 'Bàn Điều Khiển Hologram Đội Trưởng', 'Trạm chiếu bản đồ 3D nổi giữa không trung để điều phối nhiệm vụ cùng bạn bè.', 'tech', 145, 15, true, 'mythic', 'Tổng hành dinh thông minh', 'holo_desk', 'set_superhero', 70),
  ('tech_quantum', 'Lõi Máy Tính Lượng Tử AI', 'Khối năng lượng xoay quanh hạt nhân lượng tử, xử lý hàng triệu phép tính trong chớp mắt.', 'tech', 160, 17, true, 'mythic', 'Trí tuệ vũ trụ', 'quantum', null, 71),
  ('pet_none', 'Tự Lực Cánh Sinh', 'Rèn luyện tinh thần độc lập và tự giác khi chinh phục các bài học.', 'pet', 0, 0, true, 'base', 'Tự tin tự giác', 'none', null, 72),
  ('pet_corgi', 'Cún Corgi Đeo Nơ Đỏ', 'Chú cún chân ngắn tinh nghịch luôn vẫy đuôi cổ vũ mỗi khi bạn ghi điểm.', 'pet', 18, 1, true, 'popular', 'Người bạn trung thành', 'corgi', 'set_pet_lover', 73),
  ('pet_cat', 'Mèo Mướp Ham Học', 'Chú mèo mướp thông minh meo meo ăn mừng khi bạn đạt chuỗi Combo.', 'pet', 24, 2, true, 'popular', 'Bạn thân chăm chỉ', 'cat', null, 74),
  ('pet_panda', 'Gấu Trúc Võ Sư Đai Đen', 'Bé gấu trúc mũm mĩm quấn băng đô đỏ rất chăm luyện tập cùng bạn mỗi ngày.', 'pet', 34, 3, true, 'popular', 'Kiên trì bền bỉ', 'panda', 'set_pet_lover', 75),
  ('pet_bunny', 'Thỏ Ngọc Đeo Kính Tri Thức', 'Tai dài đáng yêu, nhảy tưng tưng mỗi lần bạn hoàn thành xuất sắc 15 câu.', 'pet', 42, 4, true, 'vip', 'Nhanh nhẹn tinh anh', 'bunny', null, 76),
  ('pet_fox', 'Cáo Nhí Chín Đuôi Trí Tuệ', 'Tiểu hồ ly cam vàng thông minh với chùm đuôi xù mịn tỏa sáng dịu nhẹ.', 'pet', 56, 5, true, 'vip', 'Linh hoạt sáng dạ', 'fox', 'set_pet_lover', 77),
  ('pet_owl', 'Cú Vọ Tiến Sĩ Mũ Vuông', 'Đội mũ tốt nghiệp tí hon, biểu tượng thông thái nhắc bạn đọc kỹ đề bài.', 'pet', 68, 7, true, 'vip', 'Biểu tượng thông thái', 'owl', null, 78),
  ('pet_vuibot', 'Robot VNPT Vui-Bot Mini', 'Phiên bản đồng hành thu nhỏ của linh vật VNPT Vui-Bot, mắt LED biết cười cực dễ thương.', 'pet', 85, 8, true, 'vip', 'Trợ thủ công nghệ', 'robot', 'set_scientist', 79),
  ('pet_unicorn', 'Thú Cưỡi Kỳ Lân Sao Băng', 'Chú kỳ lân trắng bờm cầu vồng với sừng vàng lấp lánh mang lại niềm vui bất tận.', 'pet', 148, 15, true, 'mythic', 'Phép màu diệu kỳ', 'unicorn', 'set_pet_lover', 80),
  ('pet_dragon', 'Rồng Con Tí Nị Lửa Vàng', 'Bé rồng huyền thoại bay lơ lửng vỗ cánh, mang lại may mắn trên mọi đấu trường.', 'pet', 155, 16, true, 'mythic', 'Thần thú may mắn', 'dragon', null, 81),
  ('pet_mecha_lion', 'Sư Tử Robot Biệt Đội Vàng', 'Chiến thú cơ khí bờm vàng kim dũng mãnh sẵn sàng hợp lực cùng chủ nhân.', 'pet', 165, 17, true, 'mythic', 'Mãnh thú cơ khí', 'mecha_lion', 'set_elemental', 82),
  ('pet_phoenix', 'Phượng Hoàng Lửa Nhí', 'Chú chim phượng hoàng rực rỡ sải cánh vàng cam biểu tượng của ý chí vươn lên.', 'pet', 175, 18, true, 'mythic', 'Tái sinh rực rỡ', 'phoenix', null, 83),
  ('bg_classroom', 'Lớp Học Nắng Mai', 'Khung cảnh lớp học sáng sủa ngập tràn ánh nắng ban mai và bảng xanh thân quen.', 'backdrop', 0, 0, true, 'base', 'Khởi đầu quen thuộc', 'bg_classroom', null, 84),
  ('bg_forest', 'Đảo Thám Hiểm Rừng Xanh', 'Thảm cỏ xanh mướt cùng thác pha lê lấp lánh trên quần đảo Thám Hiểm.', 'backdrop', 20, 2, true, 'popular', 'Thiên nhiên tươi mát', 'bg_forest', 'set_explorer', 85),
  ('bg_my_room', 'Phòng Cá Nhân Học Sinh', 'Căn phòng riêng ấm cúng có bàn học máy tính, giường ngủ, kệ sách và cây xanh tự trang trí.', 'backdrop', 25, 2, true, 'popular', 'Góc học tập riêng', 'bg_my_room', null, 86),
  ('bg_ocean', 'Đại Dương San Hô Xanh Thẳm', 'Làn nước biển trong vắt với rặng san hô rực rỡ, bọt khí và đàn cá nhỏ tung tăng.', 'backdrop', 36, 3, true, 'popular', 'Khám phá đại dương', 'bg_ocean', null, 87),
  ('bg_lab', 'Phòng Lab Công Nghệ VNPT', 'Phòng thí nghiệm công nghệ cao với màn hình hình học và ánh sáng xanh dịu.', 'backdrop', 46, 5, true, 'vip', 'Khoa học hiện đại', 'bg_lab', 'set_scientist', 88),
  ('bg_magic_forest', 'Rừng Phép Thuật Đom Đóm', 'Khu rừng huyền bí với tinh thể phát sáng, cây cổ thụ và đom đóm lung linh.', 'backdrop', 62, 6, true, 'vip', 'Khu rừng kỳ ảo', 'bg_magic_forest', 'set_pet_lover', 89),
  ('bg_castle', 'Lâu Đài Phép Thuật Hoàng Gia', 'Tòa lâu đài tháp nhọn lung linh giữa thung lũng ánh dương đầy cờ hoa.', 'backdrop', 68, 7, true, 'vip', 'Vương quốc tri thức', 'bg_castle', null, 90),
  ('bg_arena', 'Đấu Trường Ánh Dương', 'Khán đài rực rỡ cờ hoa chào đón những nhà vô địch leo Top Bảng Vàng.', 'backdrop', 74, 8, true, 'vip', 'Sân khấu vinh quang', 'bg_arena', null, 91),
  ('bg_future_city', 'Thành Phố Tương Lai Neo-HSV', 'Đô thị công nghệ với các tòa tháp ánh sáng, tàu điện trên cao và bầu trời neon dịu.', 'backdrop', 82, 8, true, 'vip', 'Đô thị siêu anh hùng', 'bg_future_city', 'set_superhero', 92),
  ('bg_galaxy', 'Vũ Trụ Tri Thức Lượng Tử', 'Bầu trời cực quang sâu thẳm với các chòm sao và khối đa diện trôi lơ lửng.', 'backdrop', 135, 14, true, 'mythic', 'Bao la vô tận', 'bg_galaxy', 'set_cosmic', 93),
  ('aura_none', 'Mặc Định Tự Nhiên', 'Hiển thị nhân vật mộc mạc, gọn gàng không kèm hiệu ứng vòng sáng.', 'aura', 0, 0, true, 'base', 'Đơn giản tinh tế', 'aura_none', null, 94),
  ('aura_sparkle', 'Bụi Sao Lấp Lánh', 'Những ngôi sao vàng nhỏ xoay nhẹ xung quanh nhân vật đầy sinh động.', 'aura', 22, 2, true, 'popular', 'Lấp lánh tỏa sáng', 'aura_sparkle', null, 95),
  ('aura_footsteps', 'Hiệu Ứng Bước Chân Ánh Sao', 'Dải vòng năng lượng và dấu bước chân phát sáng lấp lánh dưới chân nhân vật.', 'aura', 26, 2, true, 'popular', 'Từng bước vững vàng', 'aura_footsteps', 'set_racer', 96),
  ('aura_rainbow', 'Cầu Vồng Rực Rỡ Ngũ Sắc', 'Vòm cầu vồng bảy sắc kèm những ngôi sao nhỏ mang năng lượng tích cực mỗi ngày.', 'aura', 32, 3, true, 'popular', 'Niềm vui ngập tràn', 'aura_rainbow', null, 97),
  ('aura_electric', 'Vòng Năng Lượng Xanh VNPT', 'Vòng quỹ đạo điện tích xanh dương xoay đều chuẩn công nghệ số.', 'aura', 54, 5, true, 'vip', 'Tốc độ ánh sáng', 'aura_electric', 'set_scientist', 98),
  ('aura_ice', 'Vòng Băng Pha Lê Tuyết Trắng', 'Những bông tuyết pha lê xoay quanh tạo cảm giác mát lạnh và tập trung.', 'aura', 58, 5, true, 'vip', 'Tinh khiết pha lê', 'aura_ice', null, 99),
  ('aura_lightning', 'Hào Quang Tia Sét Bão Tố', 'Những tia chớp vàng – xanh bùng nổ quanh nhân vật chuẩn phong cách chiến binh.', 'aura', 66, 6, true, 'vip', 'Phản xạ thần tốc', 'aura_lightning', 'set_elemental', 100),
  ('aura_flame', 'Hào Quang Phượng Hoàng Vàng', 'Vầng hào quang rực lửa vàng kim uy nghiêm của bậc Trạng Nguyên Đấu Trường.', 'aura', 125, 13, true, 'mythic', 'Khí chất vô địch', 'aura_flame', 'set_cosmic', 101),
  ('aura_wings_angel', 'Đôi Cánh Thiên Thần Ánh Sáng', 'Đôi cánh lông vũ trắng ngà viền vàng rạng rỡ phía sau lưng nhân vật.', 'aura', 138, 14, true, 'mythic', 'Đôi cánh ước mơ', 'aura_wings_angel', null, 102),
  ('aura_wings_cyber', 'Đôi Cánh Phản Quang Siêu Anh Hùng', 'Đôi cánh năng lượng công nghệ cao màu xanh cyan – vàng cực ngầu.', 'aura', 150, 15, true, 'mythic', 'Sải cánh tương lai', 'aura_wings_cyber', 'set_superhero', 103)
on conflict (item_key) do update set
  name = excluded.name,
  description = excluded.description,
  item_type = excluded.item_type,
  price_coins = excluded.price_coins,
  required_stars = excluded.required_stars,
  is_active = excluded.is_active,
  rarity = excluded.rarity,
  tagline = excluded.tagline,
  render_type = excluded.render_type,
  set_id = excluded.set_id,
  sort_order = excluded.sort_order;

-- ===== 2. ENSURE FREE BASE ITEMS ARE BACKFILLED IN STUDENT INVENTORY =====
insert into public.student_inventory (student_id, item_id)
select p.id, si.id
from public.profiles p
cross join public.shop_items si
where si.price_coins = 0 and si.required_stars = 0
on conflict do nothing;

-- ===== 3. UPDATE travel_to_destination FOR NEW VEHICLE DISCOUNTS =====
create or replace function public.travel_to_destination(p_dest_key text, p_trip_nonce text)
returns jsonb
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_uid uuid := auth.uid();
  v_dest public.destinations;
  v_xp bigint := 0;
  v_lvl integer := 1;
  v_coins bigint := 0;
  v_veh text := '';
  v_discount_pct integer := 0;
  v_final_cost integer := 0;
  v_travel public.student_travel_state;
  v_prev_count integer := 0;
  v_new_stamps jsonb;
  v_xp_bonus integer := 0;
begin
  if v_uid is null then raise exception 'not authenticated' using errcode = '28000'; end if;
  if p_trip_nonce is null or length(trim(p_trip_nonce)) < 4 or length(p_trip_nonce) > 64 then
    raise exception 'invalid trip nonce' using errcode = '22023';
  end if;

  select * into v_dest from public.destinations where dest_key = p_dest_key and is_active;
  if not found then raise exception 'destination not found' using errcode = 'P0002'; end if;

  insert into public.student_travel_state(student_id)
    values (v_uid) on conflict (student_id) do nothing;
  select * into v_travel from public.student_travel_state where student_id = v_uid for update;

  select coalesce(xp_balance, 0), coalesce(coin_balance, 0)
    into v_xp, v_coins
  from public.student_wallets where student_id = v_uid for update;

  v_lvl := public.xp_to_level(v_xp);
  if v_lvl < v_dest.required_level then
    raise exception 'requires level %', v_dest.required_level using errcode = 'P0001';
  end if;

  -- Check vehicle equipped for travel discount (30% Mythic / 15% VIP)
  select coalesce(config->>'vehicleId', '') into v_veh
  from public.student_avatars where student_id = v_uid;

  if v_veh in (
    'veh_hoverboard','veh_spaceship','veh_magic_carpet',
    'veh_mecha_walker','veh_cloud_nimbus','veh_hero_jet'
  ) then
    v_discount_pct := 30;
  elsif v_veh in (
    'veh_scooter_pastel','veh_mountain','veh_ebike',
    'veh_supercar','veh_cyber_moto','veh_jetpack'
  ) then
    v_discount_pct := 15;
  else
    v_discount_pct := 0;
  end if;

  if p_dest_key = 'hanoi_school' or v_dest.ticket_coins = 0 then
    v_final_cost := 0;
  else
    v_final_cost := greatest(1, round((v_dest.ticket_coins * (100 - v_discount_pct)) / 100.0)::integer);
  end if;

  if v_final_cost > 0 then
    if v_coins < v_final_cost then
      raise exception 'not enough coins' using errcode = 'P0001';
    end if;
    perform private.post_ledger_entry(
      'coin', v_uid, 'spend'::public.ledger_kind, -v_final_cost,
      'travel_ticket', v_dest.id,
      'trip:' || v_uid::text || ':' || p_trip_nonce,
      'Vé khứ hồi Hà Nội ↔ ' || v_dest.name
    );
    v_xp_bonus := 5;
    perform private.post_ledger_entry(
      'xp', v_uid, 'earn'::public.ledger_kind, v_xp_bonus,
      'travel_explore', v_dest.id,
      'trip_xp:' || v_uid::text || ':' || p_trip_nonce,
      'Khám phá ' || v_dest.name
    );
  end if;

  v_prev_count := coalesce((v_travel.stamps->>p_dest_key)::integer, 0);
  v_new_stamps := v_travel.stamps || jsonb_build_object(p_dest_key, v_prev_count + 1);

  update public.student_travel_state
    set current_dest = p_dest_key,
        stamps = v_new_stamps,
        total_km = total_km + (v_dest.distance_km * 2),
        updated_at = now()
  where student_id = v_uid;

  select coalesce(xp_balance, 0), coalesce(coin_balance, 0)
    into v_xp, v_coins
  from public.student_wallets where student_id = v_uid;

  return jsonb_build_object(
    'current_dest', p_dest_key,
    'final_cost', v_final_cost,
    'discount_pct', v_discount_pct,
    'xp_bonus', v_xp_bonus,
    'coins', v_coins,
    'xp', v_xp,
    'level', public.xp_to_level(v_xp),
    'stamps', v_new_stamps,
    'total_km', v_travel.total_km + (v_dest.distance_km * 2)
  );
end
$function$;
