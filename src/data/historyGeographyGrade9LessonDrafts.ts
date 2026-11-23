import type { HGLessonDraft } from './historyGeographyLessonDrafts';

type CompactLesson = {
  id: string;
  grade: 8 | 9;
  strand: 'history' | 'geography' | 'integrated';
  title: string;
  summary: string;
  objectives: [string, string, string];
  sections: [
    { heading: string; body: string; keyPoint: string; example: string },
    { heading: string; body: string; keyPoint: string; example: string },
    { heading: string; body: string; keyPoint: string; example: string }
  ];
};

const COMPACT_LESSONS: CompactLesson[] = [
  // ======================== GRADE 8 INTEGRATED (2) ========================
  {
    id: 'g8-integrated-1',
    grade: 8,
    strand: 'integrated',
    title: 'Văn minh châu thổ sông Hồng và sông Cửu Long',
    summary: 'Tìm hiểu quá trình hình thành, phát triển châu thổ sông Hồng và sông Cửu Long; phân tích chế độ nước sông và mối liên hệ với đời sống cư dân, thích ứng biến đổi khí hậu.',
    objectives: [
      'Trình bày được đặc điểm hình thành và phát triển châu thổ sông Hồng và sông Cửu Long.',
      'Phân tích được chế độ nước của hai hệ thống sông và ảnh hưởng tới sản xuất, cư trú.',
      'Đề xuất được giải pháp ứng phó biến đổi khí hậu tại hai vùng châu thổ.'
    ],
    sections: [
      {
        heading: 'Hình thành châu thổ và điều kiện tự nhiên',
        body: 'Châu thổ sông Hồng được bồi tụ bởi phù sa hệ thống sông Hồng và sông Thái Bình trong vùng vịnh biển cổ, nổi bật với hệ thống đê điều lâu đời để trị thủy. Châu thổ sông Cửu Long hình thành do phù sa sông Mê Công bồi đắp trên nền địa hình thấp, bằng phẳng với mạng lưới sông ngòi, kênh rạch chằng chịt và đường bờ biển dài.',
        keyPoint: 'Hai vùng châu thổ là sản phẩm bồi tụ phù sa sông lớn, nhưng khác nhau về địa hình và lịch sử trị thủy.',
        example: 'Ở đồng bằng sông Hồng, đê ngăn lũ giúp ổn định khu dân cư và đồng ruộng từ thời phong kiến.'
      },
      {
        heading: 'Chế độ nước sông và đời sống cư dân',
        body: 'Sông Hồng có chế độ nước hai mùa rõ rệt; mùa lũ tập trung nhanh, mực nước lên cao và chênh lệch lớn giữa mùa lũ với mùa cạn. Sông Cửu Long có dòng chảy điều hòa hơn nhờ Biển Hồ ở Campuchia; mùa nước nổi mang lại phù sa và nguồn lợi thủy sản phong phú, gắn với văn hóa chợ nổi, nhà sàn và nghề trồng lúa nước.',
        keyPoint: 'Chế độ nước chi phối trực tiếp mùa vụ nông nghiệp, kiến trúc nhà ở, giao thông và tập quán sinh hoạt.',
        example: 'Người dân miền Tây Nam Bộ tận dụng mùa nước nổi để đánh bắt cá linh, trồng bông điên điển và phát triển du lịch sinh thái.'
      },
      {
        heading: 'Thích ứng biến đổi khí hậu ở hai châu thổ',
        body: 'Biến đổi khí hậu, nước biển dâng, sạt lở bờ sông bờ biển và xâm nhập mặn đang tác động mạnh đến sản xuất và sinh hoạt, đặc biệt ở đồng bằng sông Cửu Long. Cần kết hợp củng cố đê biển, bảo vệ rừng ngập mặn, sử dụng tiết kiệm nguồn nước, chuyển đổi cơ cấu cây trồng vật nuôi chịu mặn và hợp tác quản lí nguồn nước xuyên biên giới.',
        keyPoint: 'Phát triển bền vững châu thổ đòi hỏi kết hợp công trình thủy lợi, chuyển đổi sinh kế và hợp tác lưu vực.',
        example: 'Nhiều địa phương ở Bến Tre và Sóc Trăng chuyển sang mô hình lúa – tôm thích ứng với mùa khô xâm nhập mặn.'
      }
    ]
  },
  {
    id: 'g8-integrated-2',
    grade: 8,
    strand: 'integrated',
    title: 'Bảo vệ chủ quyền, các quyền và lợi ích hợp pháp của Việt Nam ở Biển Đông',
    summary: 'Tìm hiểu chứng cứ lịch sử và cơ sở pháp lí khẳng định chủ quyền biển đảo Việt Nam; nắm vững các quyền hợp pháp theo Công ước Luật Biển 1982 và trách nhiệm công dân.',
    objectives: [
      'Nêu được những chứng cứ lịch sử về quá trình xác lập và thực thi chủ quyền của Việt Nam ở Biển Đông.',
      'Trình bày được cơ sở pháp lí về vùng biển Việt Nam theo Luật Biển Việt Nam và UNCLOS 1982.',
      'Xác định được trách nhiệm của học sinh trong việc bảo vệ chủ quyền, quyền và lợi ích hợp pháp trên biển.'
    ],
    sections: [
      {
        heading: 'Chứng cứ lịch sử khẳng định chủ quyền biển đảo',
        body: 'Từ thời các chúa Nguyễn thế kỉ XVII, nhà nước Việt Nam đã lập đội Hoàng Sa, Bắc Hải để khai thác sản vật, đo vẽ thủy trình và dựng bia, cắm mốc tại hai quần đảo Hoàng Sa và Trường Sa. Nhiều bộ chính sử, địa bạ, châu bản triều Nguyễn và bản đồ cổ trong nước lẫn phương Tây đều ghi nhận quá trình thực thi chủ quyền liên tục, hòa bình của Việt Nam.',
        keyPoint: 'Nhà nước phong kiến Việt Nam đã xác lập và thực thi chủ quyền liên tục, hòa bình đối với Hoàng Sa và Trường Sa.',
        example: 'Châu bản triều Nguyễn thời Minh Mạng, Thiệu Trị ghi chép rõ việc cử thủy quân ra Hoàng Sa đo đạc và cứu hộ tàu thuyền.'
      },
      {
        heading: 'Cơ sở pháp lí theo UNCLOS 1982 và Luật Biển Việt Nam',
        body: 'Công ước Liên hợp quốc về Luật Biển năm 1982 (UNCLOS 1982) và Luật Biển Việt Nam năm 2012 xác định rõ chế độ pháp lí của nội thủy, lãnh hải rộng 12 hải lí, vùng tiếp giáp lãnh hải, vùng đặc quyền kinh tế rộng 200 hải lí và thềm lục địa. Việt Nam kiên trì giải quyết tranh chấp bằng biện pháp hòa bình trên cơ sở tôn trọng luật pháp quốc tế.',
        keyPoint: 'UNCLOS 1982 là khuôn khổ pháp lí quan trọng để xác định chủ quyền, quyền chủ quyền và giải quyết hòa bình tranh chấp.',
        example: 'Trong vùng đặc quyền kinh tế 200 hải lí, Việt Nam có quyền chủ quyền về thăm dò và khai thác tài nguyên biển.'
      },
      {
        heading: 'Phát triển kinh tế biển gắn với bảo vệ chủ quyền',
        body: 'Hoạt động đánh bắt xa bờ, dịch vụ hậu cần nghề cá, khai thác năng lượng, du lịch biển và nghiên cứu hải dương học góp phần khẳng định sự hiện diện dân sự hợp pháp trên biển. Học sinh cần học tập tốt lịch sử và địa lí biển đảo, tuyên truyền thông tin chính xác và tham gia bảo vệ môi trường biển.',
        keyPoint: 'Mỗi công dân góp phần bảo vệ biển đảo bằng tri thức đúng đắn, thái độ thượng tôn pháp luật và bảo vệ môi trường.',
        example: 'Tham gia tìm hiểu tư liệu lịch sử chính thống và giữ gìn vệ sinh bãi biển địa phương là hành động thiết thực.'
      }
    ]
  },

  // ======================== GRADE 9 HISTORY (21) ========================
  {
    id: 'g9-history-01',
    grade: 9,
    strand: 'history',
    title: 'Nước Nga và Liên Xô từ năm 1918 đến năm 1945',
    summary: 'Tìm hiểu quá trình xây dựng và bảo vệ chính quyền Xô viết từ 1918–1921, Chính sách kinh tế mới (NEP), công cuộc công nghiệp hóa của Liên Xô và vai trò trong Chiến tranh thế giới thứ hai.',
    objectives: [
      'Nêu được những nét chính về tình hình nước Nga Xô viết giai đoạn 1918–1922 và sự ra đời của Liên Xô.',
      'Trình bày được nội dung, thành tựu và hạn chế trong công cuộc xây dựng chủ nghĩa xã hội ở Liên Xô (1925–1941).',
      'Đánh giá được vai trò quyết định của Liên Xô trong cuộc chiến chống phát xít (1941–1945).'
    ],
    sections: [
      {
        heading: 'Từ nước Nga Xô viết đến sự thành lập Liên Xô (1918–1922)',
        body: 'Từ năm 1918 đến 1920, chính quyền Xô viết thực hiện chính sách Cộng sản thời chiến để đánh thắng thù trong giặc ngoài, bảo vệ thành quả Cách mạng tháng Mười. Năm 1921, Lê-nin đề xướng Chính sách kinh tế mới (NEP) thay chế độ trưng thu lương thực bằng thuế lương thực, khôi phục thị trường và đưa đất nước thoát khỏi khủng hoảng. Tháng 12/1922, Liên bang Cộng hòa xã hội chủ nghĩa Xô viết (Liên Xô) được thành lập.',
        keyPoint: 'Chính sách kinh tế mới (1921) giúp phục hồi kinh tế; tháng 12/1922 Liên Xô chính thức thành lập.',
        example: 'Nhờ NEP, nông dân được tự do bán phần lương thực dư thừa sau khi nộp thuế cố định.'
      },
      {
        heading: 'Công cuộc xây dựng đất nước (1925–1941)',
        body: 'Qua các kế hoạch 5 năm lần thứ nhất và thứ hai, Liên Xô ưu tiên công nghiệp hóa xã hội chủ nghĩa và tập thể hóa nông nghiệp. Sản lượng công nghiệp tăng vượt bậc, vươn lên đứng đầu châu Âu và thứ hai thế giới, giáo dục và khoa học kĩ thuật phát triển mạnh. Tuy nhiên, quá trình tập thể hóa nóng vội và mô hình kế hoạch hóa tập trung cao độ cũng để lại nhiều tổn thất cho nông dân và dân chủ nội bộ.',
        keyPoint: 'Liên Xô trở thành cường quốc công nghiệp trong thập niên 1930, song mô hình kinh tế – chính trị tập trung cao độ có những hạn chế lớn.',
        example: 'Nhiều tổ hợp công nghiệp nặng như nhà máy máy kéo Khác-cốp, thủy điện Đơ-nhi-ép được xây dựng trong kế hoạch 5 năm.'
      },
      {
        heading: 'Liên Xô trong cuộc chiến chống phát xít (1941–1945)',
        body: 'Tháng 6/1941, phát xít Đức tấn công Liên Xô, mở đầu cuộc Chiến tranh giữ nước vĩ đại. Nhân dân và Hồng quân Liên Xô đã làm phá sản chiến lược đánh nhanh thắng nhanh tại Mát-xcơ-va, giành bước ngoặt quyết định tại Xta-lin-grát (1942–1943) và Cuốc-xcơ, rồi tiến vào giải phóng Đông Âu, đánh chiếm Béc-lin tháng 5/1945 và góp phần đánh bại quân phiệt Nhật.',
        keyPoint: 'Liên Xô giữ vai trò trụ cột trên mặt trận châu Âu, tiêu diệt lực lượng chủ yếu của phát xít Đức.',
        example: 'Chiến thắng Xta-lin-grát đầu năm 1943 tạo bước ngoặt xoay chuyển cục diện Chiến tranh thế giới thứ hai.'
      }
    ]
  },
  {
    id: 'g9-history-02',
    grade: 9,
    strand: 'history',
    title: 'Châu Âu và nước Mỹ từ năm 1918 đến năm 1945',
    summary: 'Tìm hiểu trật tự Véc-xai – Oa-sinh-tơn, cuộc đại suy thoái kinh tế 1929–1933, Chính sách mới ở Mỹ và sự trỗi dậy của chủ nghĩa phát xít ở Đức, I-ta-li-a.',
    objectives: [
      'Trình bày được những nét chính về kinh tế, chính trị châu Âu và nước Mỹ giai đoạn 1918–1929.',
      'Phân tích được nguyên nhân, biểu hiện và hậu quả của cuộc Đại suy thoái kinh tế 1929–1933.',
      'So sánh được hai con đường thoát khủng hoảng: Chính sách mới ở Mỹ và con đường phát xít hóa ở Đức.'
    ],
    sections: [
      {
        heading: 'Trật tự Véc-xai – Oa-sinh-tơn và thập niên 1920',
        body: 'Sau Chiến tranh thế giới thứ nhất, các nước thắng trận thiết lập hệ thống hòa ước Véc-xai – Oa-sinh-tơn nhằm phân chia lại thị trường và thuộc địa, làm nảy sinh mâu thuẫn gay gắt giữa các nước thắng trận và bại trận. Trong giai đoạn 1924–1929, kinh tế tư bản tạm thời ổn định và phát triển nhanh, đặc biệt nước Mỹ trở thành trung tâm công nghiệp và tài chính lớn nhất thế giới.',
        keyPoint: 'Trật tự Véc-xai – Oa-sinh-tơn chứa đựng nhiều mâu thuẫn; Mỹ vươn lên giữ vị thế kinh tế số một thế giới.',
        example: 'Ngành công nghiệp ô tô và đồ gia dụng Mỹ bùng nổ mạnh mẽ trong những năm 1920.'
      },
      {
        heading: 'Đại suy thoái 1929–1933 và Chính sách mới ở Mỹ',
        body: 'Tháng 10/1929, thị trường chứng khoán Niu Oóc sụp đổ, châm ngòi cho cuộc khủng hoảng kinh tế trầm trọng nhất lịch sử chủ nghĩa tư bản. Sản xuất đình đốn, hàng chục triệu người thất nghiệp và đói nghèo. Tổng thống Ph. Ru-dơ-ven triển khai Chính sách mới (New Deal): nhà nước can thiệp điều tiết ngân hàng, tạo việc làm công cộng, cứu trợ xã hội, giúp Mỹ phục hồi trong khuôn khổ dân chủ tư sản.',
        keyPoint: 'Chính sách mới mở rộng vai trò điều tiết của nhà nước để phục hồi kinh tế và duy trì chế độ dân chủ tư sản.',
        example: 'Đạo luật Phục hưng công nghiệp và các dự án xây dựng đập thủy điện tạo hàng triệu việc làm cho người dân Mỹ.'
      },
      {
        heading: 'Sự trỗi dậy của chủ nghĩa phát xít ở châu Âu',
        body: 'Ở I-ta-li-a (1922) và đặc biệt là Đức (1933), giới cầm quyền thiết lập chế độ độc tài phát xít để thoát khủng hoảng và chuẩn bị chiến tranh chia lại thế giới. Đảng Quốc xã của Hít-le thủ tiêu nền dân chủ, đàn áp phong trào công nhân, bài Do Thái và gấp rút chạy đua vũ trang, biến châu Âu thành lò lửa chiến tranh mới.',
        keyPoint: 'Đức và I-ta-li-a chọn con đường phát xít hóa bộ máy nhà nước và gây chiến tranh xâm lược.',
        example: 'Năm 1933, Hít-le lên làm Thủ tướng Đức, từng bước xé bỏ Hòa ước Véc-xai và quân sự hóa nền kinh tế.'
      }
    ]
  },
  {
    id: 'g9-history-03',
    grade: 9,
    strand: 'history',
    title: 'Châu Á từ năm 1918 đến năm 1945',
    summary: 'Tìm hiểu sự quân phiệt hóa của Nhật Bản, phong trào cách mạng ở Trung Quốc và cuộc đấu tranh giành độc lập ở Ấn Độ, Đông Nam Á trong giai đoạn 1918–1945.',
    objectives: [
      'Trình bày được tình hình Nhật Bản giai đoạn 1918–1945 và quá trình thiết lập chế độ quân phiệt.',
      'Nêu được những sự kiện chính của phong trào cách mạng Trung Quốc (1919–1945).',
      'Trình bày được nét nổi bật trong phong trào độc lập dân tộc ở Ấn Độ và Đông Nam Á.'
    ],
    sections: [
      {
        heading: 'Nhật Bản trên con đường quân phiệt hóa',
        body: 'Sau năm 1918, Nhật Bản thu nhiều lợi nhuận nhưng sớm gặp khó khăn bởi khủng hoảng tài chính 1927 và Đại suy thoái 1929–1933. Giới quân phiệt từng bước nắm quyền, quân sự hóa bộ máy nhà nước và phát động chiến tranh xâm lược: đánh chiếm Đông Bắc Trung Quốc (1931), mở rộng xâm lược toàn Trung Quốc (1937) và Đông Nam Á (1940–1941), biến Nhật thành lò lửa chiến tranh ở châu Á – Thái Bình Dương.',
        keyPoint: 'Nhật Bản thoát khủng hoảng bằng chủ nghĩa quân phiệt và mở rộng chiến tranh xâm lược châu Á.',
        example: 'Sự kiện Phụng Thiên năm 1931 mở đầu cho cuộc xâm lược vùng Đông Bắc Trung Quốc của quân phiệt Nhật.'
      },
      {
        heading: 'Trung Quốc từ phong trào Ngũ Tứ đến kháng chiến chống Nhật',
        body: 'Ngày 4/5/1919 bùng nổ phong trào Ngũ Tứ chống đế quốc và phong kiến. Năm 1921, Đảng Cộng sản Trung Quốc thành lập; sau cuộc Bắc phạt (1926–1927), nội chiến Quốc – Cộng nổ ra suốt thập niên 1927–1937. Trước họa xâm lăng của phát xít Nhật năm 1937, Quốc dân đảng và Đảng Cộng sản hợp tác thành lập mặt trận thống nhất dân tộc kháng chiến chống Nhật.',
        keyPoint: 'Cách mạng Trung Quốc trải qua phong trào Ngũ Tứ, nội chiến Quốc – Cộng và đoàn kết kháng chiến chống Nhật.',
        example: 'Sự biến Tây An cuối năm 1936 thúc đẩy sự hợp tác lần thứ hai giữa Quốc dân đảng và Đảng Cộng sản Trung Quốc.'
      },
      {
        heading: 'Phong trào giành độc lập ở Ấn Độ và Đông Nam Á',
        body: 'Tại Ấn Độ, Đảng Quốc đại dưới sự lãnh đạo của M. Gan-đi phát động phong trào bất bạo động, bất hợp tác chống thực dân Anh. Ở Đông Nam Á, giai cấp công nhân và các tầng lớp nhân dân trưởng thành, nhiều đảng cộng sản và mặt trận dân tộc ra đời ở In-đô-nê-xi-a, Đông Dương, Miến Điện, Phi-líp-pin, đấu tranh chống thực dân châu Âu và sau đó chống phát xít Nhật.',
        keyPoint: 'Phong trào giải phóng dân tộc phát triển mạnh mẽ với hình thức phong phú, tiêu biểu là bất hợp tác ở Ấn Độ và đấu tranh vũ trang ở Đông Nam Á.',
        example: 'Cuộc Tuần hành Muối năm 1930 do Gan-đi dẫn đầu thu hút hàng triệu người Ấn Độ phản đối độc quyền muối của thực dân Anh.'
      }
    ]
  },
  {
    id: 'g9-history-04',
    grade: 9,
    strand: 'history',
    title: 'Chiến tranh thế giới thứ hai (1939 - 1945)',
    summary: 'Phân tích nguyên nhân, diễn biến chính qua các giai đoạn bước ngoặt, kết cục và bài học lịch sử của Chiến tranh thế giới thứ hai.',
    objectives: [
      'Trình bày được nguyên nhân sâu xa và duyên cớ bùng nổ Chiến tranh thế giới thứ hai.',
      'Nêu được các mốc diễn biến chính: sự hình thành phe Đồng minh, các trận đánh bước ngoặt và thắng lợi cuối cùng.',
      'Đánh giá được hậu quả nặng nề và ý nghĩa lịch sử của chiến thắng chống chủ nghĩa phát xít.'
    ],
    sections: [
      {
        heading: 'Nguyên nhân và sự bùng nổ chiến tranh (1939–1941)',
        body: 'Mâu thuẫn giữa các nước đế quốc về thuộc địa và thị trường ngày càng gay gắt sau Đại suy thoái 1929–1933. Khối phát xít Đức – I-ta-li-a – Nhật hình thành và ráo riết gây chiến, trong khi Anh, Pháp nhượng bộ qua Hiệp ước Muy-ních (1938). Ngày 1/9/1939, Đức tấn công Ba Lan, mở màn Chiến tranh thế giới thứ hai; đến năm 1941, Đức đánh Liên Xô và Nhật tấn công Trân Châu Cảng, chiến tranh lan rộng toàn cầu.',
        keyPoint: 'Chính sách nhượng bộ của các nước phương Tây không ngăn được tham vọng xâm lược của phe Trục, dẫn tới chiến tranh bùng nổ năm 1939.',
        example: 'Sự kiện Nhật tập kích Trân Châu Cảng ngày 7/12/1941 kéo Mỹ chính thức tham chiến ở cả hai đại dương.'
      },
      {
        heading: 'Bước ngoặt và thắng lợi của phe Đồng minh (1942–1945)',
        body: 'Đầu năm 1942, 26 quốc gia kí Tuyên bố Liên hợp quốc, hình thành mặt trận Đồng minh chống phát xít với trụ cột là Liên Xô, Mỹ, Anh. Các chiến thắng Xta-lin-grát (2/1943), En A-la-men, Mít-uây và cuộc đổ bộ Noóc-măng-đi (6/1944) dồn phe Trục vào thế sụp đổ. Ngày 9/5/1945 phát xít Đức đầu hàng; ngày 15/8/1945 Nhật Bản chấp nhận đầu hàng vô điều kiện sau khi Liên Xô tiêu diệt đạo quân Quan Đông và Mỹ ném hai quả bom nguyên tử.',
        keyPoint: 'Sự phối hợp của khối Đồng minh và chiến thắng bước ngoặt Xta-lin-grát đưa đến thắng lợi hoàn toàn vào năm 1945.',
        example: 'Ngày 9/5/1945 đánh dấu thắng lợi hoàn toàn trước phát xít Đức tại châu Âu.'
      },
      {
        heading: 'Hậu quả và tác động lịch sử',
        body: 'Chiến tranh thế giới thứ hai là cuộc chiến tàn khốc nhất lịch sử nhân loại, cướp đi khoảng 60 triệu sinh mạng và tàn phá hàng loạt thành phố, di sản. Thắng lợi của phe Đồng minh đã tiêu diệt chủ nghĩa phát xít, mở ra sự thành lập Liên hợp quốc và thúc đẩy làn sóng giải phóng dân tộc mạnh mẽ tại châu Á, châu Phi.',
        keyPoint: 'Thắng lợi chống phát xít cứu nhân loại khỏi thảm họa diệt vong và làm thay đổi căn bản cục diện thế giới.',
        example: 'Thắng lợi của Đồng minh trước Nhật Bản tạo điều kiện khách quan thuận lợi cho Cách mạng tháng Tám năm 1945 ở Việt Nam.'
      }
    ]
  },
  {
    id: 'g9-history-05',
    grade: 9,
    strand: 'history',
    title: 'Phong trào dân tộc dân chủ trong những năm 1918 - 1930',
    summary: 'Tìm hiểu tác động của cuộc khai thác thuộc địa lần thứ hai, các phong trào yêu nước của tư sản, tiểu tư sản, công nhân và các tổ chức cách mạng tiền thân giai đoạn 1918–1930.',
    objectives: [
      'Nêu được những chuyển biến về kinh tế và xã hội Việt Nam dưới tác động của cuộc khai thác thuộc địa lần thứ hai.',
      'Trình bày được các phong trào yêu nước của tư sản, tiểu tư sản, công nhân và nông dân (1918–1930).',
      'Phân tích được ý nghĩa lịch sử của phong trào và sự ra đời ba tổ chức cộng sản năm 1929.'
    ],
    sections: [
      {
        heading: 'Khai thác thuộc địa lần thứ hai và phân hóa xã hội',
        body: 'Sau Chiến tranh thế giới thứ nhất, thực dân Pháp tiến hành cuộc khai thác thuộc địa lần thứ hai (1919–1929), tập trung vốn vào đồn điền cao su, khai mỏ và một số ngành công nghiệp nhẹ. Xã hội Việt Nam phân hóa sâu sắc: bên cạnh giai cấp địa chủ và nông dân xuất hiện tư sản dân tộc, tiểu tư sản trí thức và giai cấp công nhân phát triển nhanh về số lượng, sớm mang tinh thần đấu tranh triệt để.',
        keyPoint: 'Cuộc khai thác thuộc địa lần thứ hai làm nảy sinh các lực lượng xã hội mới, nhất là giai cấp công nhân.',
        example: 'Số lượng công nhân mỏ than Hòn Gai và đồn điền cao su Nam Bộ tăng nhanh trong thập niên 1920.'
      },
      {
        heading: 'Phong trào dân tộc dân chủ sôi nổi (1919–1929)',
        body: 'Giai cấp tư sản phát động phong trào chấn hưng nội hóa, bài trừ ngoại hóa (1919) và đấu tranh chống độc quyền cảng Sài Gòn (1923). Tiểu tư sản hăng hái lập nhà xuất bản tiến bộ, đấu tranh đòi thả Phan Bội Châu (1925) và để tang Phan Châu Trinh (1926). Công nhân chuyển dần từ tự phát sang tự giác với đỉnh cao là bãi công Ba Son (8/1925); khuynh hướng dân chủ tư sản tiêu biểu có Việt Nam Quốc dân đảng với khởi nghĩa Yên Bái (2/1930).',
        keyPoint: 'Hai khuynh hướng dân chủ tư sản và vô sản cùng vận động sôi nổi, trong đó khuynh hướng vô sản ngày càng chiếm ưu thế.',
        example: 'Cuộc bãi công của công nhân xưởng Ba Son tháng 8/1925 ngăn tàu chiến Pháp chở lính sang đàn áp cách mạng Trung Quốc.'
      },
      {
        heading: 'Sự ra đời ba tổ chức cộng sản năm 1929',
        body: 'Sự phát triển mạnh mẽ của phong trào công nhân đòi hỏi một chính đảng cộng sản trực tiếp lãnh đạo. Năm 1929, lần lượt xuất hiện Đông Dương Cộng sản đảng (6/1929), An Nam Cộng sản đảng (8/1929) và Đông Dương Cộng sản liên đoàn (9/1929), đặt ra yêu cầu cấp bách phải thống nhất thành một đảng duy nhất.',
        keyPoint: 'Ba tổ chức cộng sản ra đời năm 1929 khẳng định xu thế tất yếu của con đường cách mạng vô sản ở Việt Nam.',
        example: 'Chi bộ cộng sản đầu tiên tại số 5D phố Hàm Long (Hà Nội) là hạt nhân chuẩn bị cho sự thành lập Đông Dương Cộng sản đảng.'
      }
    ]
  },
  {
    id: 'g9-history-06',
    grade: 9,
    strand: 'history',
    title: 'Hoạt động của Nguyễn Ái Quốc và sự thành lập Đảng Cộng sản Việt Nam',
    summary: 'Tìm hiểu hành trình hoạt động của Nguyễn Ái Quốc giai đoạn 1918–1930 ở Pháp, Liên Xô, Trung Quốc và hội nghị hợp nhất thành lập Đảng Cộng sản Việt Nam đầu năm 1930.',
    objectives: [
      'Trình bày được những mốc hoạt động tiêu biểu của Nguyễn Ái Quốc ở Pháp, Liên Xô và Trung Quốc (1918–1929).',
      'Nêu được hoàn cảnh, nội dung cơ bản và ý nghĩa của Hội nghị thành lập Đảng Cộng sản Việt Nam đầu năm 1930.',
      'Phân tích được vai trò quyết định của Nguyễn Ái Quốc đối với sự ra đời của Đảng và Cương lĩnh chính trị đầu tiên.'
    ],
    sections: [
      {
        heading: 'Nguyễn Ái Quốc tìm thấy con đường cứu nước đúng đắn',
        body: 'Năm 1919, Nguyễn Ái Quốc gửi Bản yêu sách của nhân dân An Nam tới Hội nghị Véc-xai. Tháng 7/1920, Người đọc Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa của V.I. Lê-nin, tìm ra con đường giải phóng dân tộc theo cách mạng vô sản. Tháng 12/1920, tại Đại hội Tua, Người bỏ phiếu gia nhập Quốc tế Cộng sản và tham gia sáng lập Đảng Cộng sản Pháp.',
        keyPoint: 'Năm 1920 đánh dấu bước ngoặt Nguyễn Ái Quốc từ người yêu nước trở thành chiến sĩ cộng sản đầu tiên của Việt Nam.',
        example: 'Báo Người cùng khổ (Le Paria) và tác phẩm Bản án chế độ thực dân Pháp góp phần thức tỉnh các dân tộc thuộc địa.'
      },
      {
        heading: 'Chuẩn bị về tư tưởng, chính trị và tổ chức (1923–1929)',
        body: 'Sau thời gian học tập và công tác tại Liên Xô (1923–1924), cuối năm 1924 Nguyễn Ái Quốc tới Quảng Châu (Trung Quốc). Tháng 6/1925, Người lập Hội Việt Nam Cách mạng Thanh niên, xuất bản báo Thanh niên, mở các lớp huấn luyện cán bộ (in thành sách Đường Kách mệnh năm 1927) và phát động phong trào "Vô sản hóa" đưa cán bộ về nhà máy, hầm mỏ tuyên truyền.',
        keyPoint: 'Hội Việt Nam Cách mạng Thanh niên giữ vai trò tổ chức tiền thân chuẩn bị trực tiếp cho sự ra đời của Đảng.',
        example: 'Tác phẩm Đường Kách mệnh năm 1927 trình bày ngắn gọn, dễ hiểu những vấn đề cốt lõi về đường lối cách mạng giải phóng dân tộc.'
      },
      {
        heading: 'Hội nghị thành lập Đảng Cộng sản Việt Nam (đầu năm 1930)',
        body: 'Trước sự chia rẽ của ba tổ chức cộng sản, Nguyễn Ái Quốc chủ trì Hội nghị hợp nhất tại Hương Cảng (Trung Quốc) từ ngày 6/1 đến ngày 7/2/1930, nhất trí thành lập Đảng Cộng sản Việt Nam và thông qua Chánh cương vắn tắt, Sách lược vắn tắt (Cương lĩnh chính trị đầu tiên). Đảng ra đời chấm dứt cuộc khủng hoảng về đường lối và giai cấp lãnh đạo kéo dài nhiều thập kỉ.',
        keyPoint: 'Đảng Cộng sản Việt Nam ra đời là bước ngoặt vĩ đại, mở đầu thời kì đấu tranh có tổ chức và đường lối thống nhất.',
        example: 'Cương lĩnh đầu tiên xác định nhiệm vụ hàng đầu là đánh đổ đế quốc Pháp và phong kiến, làm cho nước Nam hoàn toàn độc lập.'
      }
    ]
  },
  {
    id: 'g9-history-07',
    grade: 9,
    strand: 'history',
    title: 'Phong trào cách mạng Việt Nam thời kì 1930 - 1939',
    summary: 'Tìm hiểu cao trào cách mạng 1930–1931 với đỉnh cao Xô viết Nghệ – Tĩnh và phong trào dân chủ 1936–1939 đòi tự do, dân sinh, dân chủ, hòa bình.',
    objectives: [
      'Trình bày được diễn biến chính và ý nghĩa của phong trào cách mạng 1930–1931 và Xô viết Nghệ – Tĩnh.',
      'Nêu được bối cảnh, mục tiêu và hình thức đấu tranh phong phú của phong trào dân chủ 1936–1939.',
      'So sánh được điểm khác biệt về mục tiêu và hình thức giữa hai cao trào 1930–1931 và 1936–1939.'
    ],
    sections: [
      {
        heading: 'Phong trào cách mạng 1930–1931 và Xô viết Nghệ – Tĩnh',
        body: 'Dưới tác động của khủng hoảng kinh tế thế giới và chính sách khủng bố của Pháp, ngay sau khi Đảng ra đời, phong trào công – nông bùng nổ mạnh mẽ trên cả nước. Từ tháng 9/1930, tại Nghệ An và Hà Tĩnh, chính quyền thực dân phong kiến ở nhiều huyện xã tan rã; các Xô viết ra đời thực hiện chia ruộng đất, bãi bỏ thuế vô lí và dạy chữ Quốc ngữ, trở thành cuộc tổng diễn tập đầu tiên.',
        keyPoint: 'Xô viết Nghệ – Tĩnh là đỉnh cao của phong trào 1930–1931, khẳng định vai trò lãnh đạo của Đảng và liên minh công – nông.',
        example: 'Cuộc biểu tình ngày 12/9/1930 của nông dân Hưng Nguyên (Nghệ An) đánh dấu bước phát triển quyết liệt của phong trào.'
      },
      {
        heading: 'Phong trào dân chủ 1936–1939',
        body: 'Năm 1936, Mặt trận Nhân dân lên cầm quyền ở Pháp, nới lỏng một phần chính sách ở thuộc địa trong khi nguy cơ phát xít lan rộng. Đảng chủ trương tạm gác khẩu hiệu đánh đổ đế quốc và cách mạng ruộng đất, thành lập Mặt trận Dân chủ Đông Dương, đấu tranh đòi tự do, dân sinh, dân chủ, cơm áo và hòa bình bằng báo chí công khai, mít tinh và nghị trường.',
        keyPoint: 'Giai đoạn 1936–1939 là cao trào đấu tranh công khai, hợp pháp và nửa hợp pháp chống phản động thuộc địa và phát xít.',
        example: 'Cuộc mít tinh kỉ niệm ngày Quốc tế Lao động 1/5/1938 tại khu Đấu Xảo (Hà Nội) quy tụ hàng vạn người tham gia.'
      },
      {
        heading: 'Ý nghĩa lịch sử và bài học kinh nghiệm',
        body: 'Hai phong trào cách mạng trong thập niên 1930 giúp Đảng rèn luyện đội ngũ cán bộ, xây dựng lực lượng chính trị đông đảo ở cả thành thị và nông thôn, đồng thời tích lũy kinh nghiệm chuyển hướng chiến lược linh hoạt theo tình hình thế giới và trong nước để chuẩn bị cho thời cơ tổng khởi nghĩa.',
        keyPoint: 'Hai cuộc tập dượt 1930–1931 và 1936–1939 rèn luyện lực lượng quần chúng hùng hậu cho Cách mạng tháng Tám.',
        example: 'Từ bí mật vũ trang ở Nghệ – Tĩnh đến đấu tranh nghị trường và báo chí 1936–1939 cho thấy sự linh hoạt về sách lược.'
      }
    ]
  },
  {
    id: 'g9-history-08',
    grade: 9,
    strand: 'history',
    title: 'Cách mạng tháng Tám năm 1945',
    summary: 'Tìm hiểu bối cảnh Nhật vào Đông Dương, sự chuyển hướng chỉ đạo của Nguyễn Ái Quốc và Đảng với Mặt trận Việt Minh, Cao trào kháng Nhật cứu nước và Tổng khởi nghĩa tháng Tám 1945.',
    objectives: [
      'Trình bày được sự chuẩn bị lực lượng chính trị, vũ trang và căn cứ địa từ 1939 đến đầu năm 1945.',
      'Nêu được diễn biến chính của Cao trào kháng Nhật cứu nước và Tổng khởi nghĩa tháng Tám năm 1945.',
      'Phân tích được nguyên nhân thắng lợi và ý nghĩa lịch sử trọng đại của Cách mạng tháng Tám năm 1945.'
    ],
    sections: [
      {
        heading: 'Chuyển hướng chỉ đạo và Mặt trận Việt Minh (1939–1945)',
        body: 'Chiến tranh thế giới thứ hai bùng nổ, Nhật kéo quân vào Đông Dương (9/1940), nhân dân ta chịu cảnh "một cổ hai tròng". Hội nghị Trung ương 8 (5/1941) tại Pác Bó (Cao Bằng) do Nguyễn Ái Quốc chủ trì đặt nhiệm vụ giải phóng dân tộc lên hàng đầu, thành lập Mặt trận Việt Minh, xây dựng căn cứ địa Việt Bắc và thành lập Đội Việt Nam Tuyên truyền Giải phóng quân (22/12/1944).',
        keyPoint: 'Hội nghị Trung ương 8 (5/1941) hoàn chỉnh chuyển hướng chiến lược giải phóng dân tộc và sáng lập Mặt trận Việt Minh.',
        example: 'Các hội Cứu quốc trong Mặt trận Việt Minh quy tụ đông đảo nông dân, công nhân, thanh niên, phụ nữ, trí thức.'
      },
      {
        heading: 'Cao trào kháng Nhật và Tổng khởi nghĩa tháng Tám 1945',
        body: 'Đêm 9/3/1945, Nhật đảo chính Pháp; Trung ương Đảng ra Chỉ thị "Nhật – Pháp bắn nhau và hành động của chúng ta", phát động cao trào phá kho thóc giải quyết nạn đói. Khi phát xít Nhật đầu hàng Đồng minh (15/8/1945), lệnh Tổng khởi nghĩa được ban bố. Chỉ trong 15 ngày, nhân dân giành chính quyền ở Hà Nội (19/8), Huế (23/8), Sài Gòn (25/8); ngày 2/9/1945 Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa.',
        keyPoint: 'Tổng khởi nghĩa diễn ra nhanh gọn, ít đổ máu và giành thắng lợi hoàn toàn trên cả nước trong nửa cuối tháng 8/1945.',
        example: 'Ba thành phố lớn Hà Nội, Huế, Sài Gòn giành chính quyền liên tiếp chỉ trong vòng 7 ngày từ 19 đến 25/8/1945.'
      },
      {
        heading: 'Nguyên nhân thắng lợi và ý nghĩa lịch sử',
        body: 'Thắng lợi bắt nguồn từ truyền thống yêu nước, sự lãnh đạo sáng suốt, chớp đúng thời cơ của Đảng và Chủ tịch Hồ Chí Minh cùng khối đại đoàn kết toàn dân, kết hợp điều kiện khách quan từ chiến thắng của phe Đồng minh. Cách mạng tháng Tám xóa bỏ ách đô hộ gần một thế kỉ và chế độ quân chủ chuyên chế, đưa nhân dân Việt Nam thành người làm chủ đất nước độc lập.',
        keyPoint: 'Cách mạng tháng Tám mở ra kỉ nguyên mới: độc lập dân tộc gắn liền với quyền làm chủ của nhân dân.',
        example: 'Tuyên ngôn Độc lập ngày 2/9/1945 tại Quảng trường Ba Đình khẳng định quyền tự do và độc lập của dân tộc Việt Nam trước thế giới.'
      }
    ]
  },
  {
    id: 'g9-history-09',
    grade: 9,
    strand: 'history',
    title: 'Chiến tranh lạnh (1947 - 1989)',
    summary: 'Tìm hiểu nguồn gốc Trật tự hai cực I-an-ta, sự đối đầu kinh tế – quân sự giữa Mỹ và Liên Xô, các cuộc xung đột khu vực và tiến trình chấm dứt Chiến tranh lạnh.',
    objectives: [
      'Nêu được nguyên nhân và biểu hiện đối đầu giữa hai siêu cường Mỹ và Liên Xô từ 1947.',
      'Trình bày được những cuộc khủng hoảng tiêu biểu thời Chiến tranh lạnh và hệ quả đối với thế giới.',
      'Giải thích được nguyên nhân dẫn đến việc Mỹ và Liên Xô tuyên bố chấm dứt Chiến tranh lạnh (1989).'
    ],
    sections: [
      {
        heading: 'Sự hình thành Trật tự I-an-ta và đối đầu hai cực',
        body: 'Hội nghị I-an-ta (2/1945) phân chia phạm vi ảnh hưởng giữa các cường quốc sau chiến tranh, đặt nền móng cho trật tự hai cực Liên Xô – Mỹ. Năm 1947, Học thuyết Tru-man và Kế hoạch Mác-san mở đầu cuộc Chiến tranh lạnh; hai khối quân sự đối lập NATO (1949) do Mỹ đứng đầu và Tổ chức Hiệp ước Vác-sa-va (1955) do Liên Xô đứng đầu được thành lập.',
        keyPoint: 'Chiến tranh lạnh là cuộc đối đầu căng thẳng về chính trị, kinh tế, quân sự và ý thức hệ giữa hai phe tư bản và xã hội chủ nghĩa.',
        example: 'Kế hoạch Mác-san viện trợ phục hồi Tây Âu đồng thời tạo đối trọng ảnh hưởng với Liên Xô tại Đông Âu.'
      },
      {
        heading: 'Chạy đua vũ trang và các điểm nóng khu vực',
        body: 'Trong hơn bốn thập kỉ, hai siêu cường chạy đua vũ khí hạt nhân, chinh phục vũ trụ và can dự vào nhiều cuộc chiến tranh, xung đột cục bộ như chiến tranh Triều Tiên (1950–1953), khủng hoảng tên lửa Cu-ba (1962), chiến tranh xâm lược Việt Nam của Mỹ và khủng hoảng Béc-lin. Thế giới luôn đứng trước nguy cơ chiến tranh hạt nhân hủy diệt.',
        keyPoint: 'Tuy không xảy ra thế chiến mới giữa Mỹ và Liên Xô, nhiều cuộc chiến tranh cục bộ đã gây tổn thất nặng nề ở châu Á và châu Âu.',
        example: 'Khủng hoảng tên lửa Cu-ba tháng 10/1962 đưa thế giới đến sát bờ vực chiến tranh hạt nhân trước khi đạt thỏa hiệp ngoại giao.'
      },
      {
        heading: 'Xu thế hòa hoãn và chấm dứt Chiến tranh lạnh (1989)',
        body: 'Chi phí chạy đua vũ trang khổng lồ làm suy giảm sức mạnh của cả Liên Xô và Mỹ, trong khi Tây Âu và Nhật Bản vươn lên cạnh tranh kinh tế mạnh mẽ. Tháng 12/1989, tại đảo Man-ta, Tổng thống Mỹ G. Bu-sơ và Tổng Bí thư Liên Xô M. Goóc-ba-chốp chính thức tuyên bố chấm dứt Chiến tranh lạnh, mở ra xu thế đối thoại hợp tác.',
        keyPoint: 'Cuộc gặp cấp cao Man-ta (12/1989) chính thức chấm dứt hơn bốn thập kỉ đối đầu Chiến tranh lạnh.',
        example: 'Sự sụp đổ của Bức tường Béc-lin tháng 11/1989 trở thành biểu tượng khép lại sự chia cắt Đông – Tây ở châu Âu.'
      }
    ]
  },
  {
    id: 'g9-history-10',
    grade: 9,
    strand: 'history',
    title: 'Liên Xô và Đông Âu từ năm 1945 đến năm 1991',
    summary: 'Tìm hiểu công cuộc khôi phục kinh tế, những thành tựu khoa học kĩ thuật của Liên Xô và các nước Đông Âu từ 1945–1973 cùng nguyên nhân dẫn tới khủng hoảng và tan rã (1991).',
    objectives: [
      'Nêu được những thành tựu nổi bật của Liên Xô và Đông Âu trong giai đoạn 1945 đến đầu thập niên 1970.',
      'Phân tích được nguyên nhân khủng hoảng kinh tế – chính trị từ giữa thập niên 1970 đến cuối thập niên 1980.',
      'Trình bày được sự sụp đổ của chế độ xã hội chủ nghĩa ở Đông Âu (1989) và sự tan rã của Liên Xô (1991).'
    ],
    sections: [
      {
        heading: 'Khôi phục kinh tế và những thành tựu nổi bật (1945–1973)',
        body: 'Sau năm 1945, Liên Xô nhanh chóng khôi phục kinh tế, phá thế độc quyền hạt nhân của Mỹ (1949), phóng vệ tinh nhân tạo Xpút-ních (1957) và đưa Iu-ri Ga-ga-rin bay vào vũ trụ (1961), trở thành siêu cường công nghiệp – khoa học hàng đầu. Các nước Đông Âu tiến hành cải cách ruộng đất, công nghiệp hóa và từng bước cải thiện giáo dục, y tế cho người dân.',
        keyPoint: 'Liên Xô đạt những kì tích về công nghiệp, quốc phòng và chinh phục vũ trụ trong thập niên 1950–1960.',
        example: 'Chuyến bay của phi hành gia Iu-ri Ga-ga-rin ngày 12/4/1961 mở ra kỉ nguyên chinh phục vũ trụ của loài người.'
      },
      {
        heading: 'Trì trệ, khủng hoảng và công cuộc cải tổ',
        body: 'Từ sau khủng hoảng dầu mỏ 1973, mô hình kinh tế kế hoạch hóa tập trung quan liêu bao cấp bộc lộ sự trì trệ, chậm đổi mới công nghệ, đời sống nhân dân gặp nhiều thiếu thốn. Năm 1985, M. Goóc-ba-chốp tiến hành cải tổ nhưng thiếu giải pháp kinh tế hiệu quả và mất kiểm soát về chính trị – dân tộc, khiến khủng hoảng ngày càng trầm trọng.',
        keyPoint: 'Chậm đổi mới mô hình kinh tế và sai lầm trong cải tổ làm khủng hoảng ở Liên Xô và Đông Âu thêm sâu sắc.',
        example: 'Sự thiếu hụt hàng tiêu dùng kéo dài trong thập niên 1980 làm suy giảm niềm tin của xã hội.'
      },
      {
        heading: 'Sự sụp đổ ở Đông Âu (1989) và Liên Xô tan rã (1991)',
        body: 'Từ năm 1988 đến 1990, chính quyền xã hội chủ nghĩa tại các nước Đông Âu lần lượt sụp đổ. Tại Liên Xô, sau cuộc đảo chính bất thành tháng 8/1991, các nước cộng hòa lần lượt tuyên bố độc lập; ngày 25/12/1991, Liên bang Xô viết chính thức chấm dứt tồn tại sau 69 năm, kéo theo sự sụp đổ hoàn toàn của Trật tự hai cực I-an-ta.',
        keyPoint: 'Sự tan rã của Liên Xô tháng 12/1991 khép lại Trật tự hai cực I-an-ta và mở ra trật tự thế giới đa cực đang hình thành.',
        example: 'Hội đồng Tương trợ Kinh tế (SEV) và Tổ chức Hiệp ước Vác-sa-va giải thể trong năm 1991.'
      }
    ]
  },
  {
    id: 'g9-history-11',
    grade: 9,
    strand: 'history',
    title: 'Nước Mỹ và Tây Âu từ năm 1945 đến năm 1991',
    summary: 'Tìm hiểu vị thế kinh tế – quân sự của Mỹ, phong trào dân quyền và các vấn đề đối ngoại giai đoạn 1945–1991 cùng quá trình phục hồi và liên kết khu vực ở Tây Âu (EC/EU).',
    objectives: [
      'Trình bày được sự phát triển kinh tế, khoa học kĩ thuật và chính sách đối ngoại của nước Mỹ (1945–1991).',
      'Nêu được quá trình phục hồi kinh tế và liên kết khu vực của Tây Âu từ sau 1945 đến Hiệp ước Ma-xtrích.',
      'Phân tích được các nguyên nhân thúc đẩy sự hình thành Cộng đồng châu Âu (EC).'
    ],
    sections: [
      {
        heading: 'Nước Mỹ: từ đỉnh cao kinh tế đến điều chỉnh đối ngoại',
        body: 'Sau năm 1945, Mỹ chiếm hơn nửa sản lượng công nghiệp thế giới và trở thành trung tâm tài chính – công nghệ lớn nhất, đi đầu trong cuộc cách mạng khoa học – kĩ thuật (đưa người lên Mặt Trăng năm 1969). Trong nước diễn ra phong trào đòi quyền bình đẳng dân sự mạnh mẽ của người Mỹ gốc Phi. Về đối ngoại, Mỹ triển khai chiến lược toàn cầu và vấp phải thất bại nặng nề tại Việt Nam.',
        keyPoint: 'Mỹ giữ vị thế siêu cường hàng đầu phương Tây nhưng cũng chịu cạnh tranh từ Tây Âu, Nhật Bản và thất bại trong Chiến tranh Việt Nam.',
        example: 'Tàu A-pô-lô 11 năm 1969 đưa phi hành gia Mỹ lần đầu đặt chân lên Mặt Trăng.'
      },
      {
        heading: 'Sự phục hồi của Tây Âu sau chiến tranh',
        body: 'Bị tàn phá nặng nề sau Thế chiến II, các nước Tây Âu nhanh chóng phục hồi nhờ nguồn viện trợ Kế hoạch Mác-san, nguồn nhân lực trình độ cao và việc ứng dụng tiến bộ khoa học kĩ thuật. Từ thập niên 1950–1970, Cộng hòa Liên bang Đức, Pháp, Anh vươn lên thành một trong ba trung tâm kinh tế – tài chính lớn của thế giới tư bản.',
        keyPoint: 'Tây Âu phục hồi nhanh chóng nhờ Kế hoạch Mác-san, cải cách kinh tế và tận dụng cách mạng khoa học kĩ thuật.',
        example: 'Cộng hòa Liên bang Đức đạt tốc độ tăng trưởng cao, trở thành nền kinh tế lớn nhất Tây Âu.'
      },
      {
        heading: 'Quá trình liên kết khu vực châu Âu',
        body: 'Để tăng sức cạnh tranh và bảo đảm hòa bình lâu dài trong khu vực, sáu nước Tây Âu thành lập Cộng đồng Than – Thép (1951), sau mở rộng thành Cộng đồng Kinh tế châu Âu (EEC, 1957) và Cộng đồng châu Âu (EC, 1967). Cuối năm 1991, các nước kí Hiệp ước Ma-xtrích, đặt nền móng cho sự ra đời của Liên minh châu Âu (EU).',
        keyPoint: 'Liên kết khu vực giúp Tây Âu tăng cường sức mạnh kinh tế và hạn chế nguy cơ xung đột nội bộ châu lục.',
        example: 'Quá trình hợp nhất từ 6 thành viên ban đầu đã mở rộng thành Cộng đồng châu Âu gồm 12 nước vào cuối thập niên 1980.'
      }
    ]
  },
  {
    id: 'g9-history-12',
    grade: 9,
    strand: 'history',
    title: 'Khu vực Mỹ La-tinh và châu Á từ năm 1945 đến năm 1991',
    summary: 'Tìm hiểu phong trào giải phóng dân tộc ở châu Á (Trung Quốc, Ấn Độ, Đông Nam Á và ASEAN), sự phát triển kì diệu của Nhật Bản và công cuộc đấu tranh bảo vệ độc lập ở Mỹ La-tinh.',
    objectives: [
      'Nêu được những thắng lợi nổi bật của phong trào độc lập và phát triển ở Trung Quốc, Ấn Độ, Nhật Bản và ASEAN.',
      'Trình bày được diễn biến chính và ý nghĩa của Cách mạng Cu-ba (1959) cùng phong trào Mỹ La-tinh.',
      'Phân tích được bước chuyển của ASEAN từ đối đầu sang đối thoại, hợp tác khu vực.'
    ],
    sections: [
      {
        heading: 'Trung Quốc, Ấn Độ và sự phát triển của Nhật Bản',
        body: 'Năm 1949, nước Cộng hòa Nhân dân Trung Hoa thành lập; từ cuối năm 1978, Trung Quốc thực hiện cải cách mở cửa và đạt tăng trưởng kinh tế vượt bậc. Ấn Độ giành độc lập (1947–1950) và xây dựng nền kinh tế tự chủ với cuộc Cách mạng xanh trong nông nghiệp. Nhật Bản thực hiện cải cách dân chủ sau chiến tranh và vươn lên trở thành nền kinh tế lớn thứ hai thế giới tư bản từ cuối thập niên 1960.',
        keyPoint: 'Châu Á chứng kiến thắng lợi giải phóng dân tộc rộng lớn cùng sự trỗi dậy kinh tế mạnh mẽ của Nhật Bản và Trung Quốc.',
        example: 'Chính sách Cải cách – Mở cửa năm 1978 do Đặng Tiểu Bình khởi xướng đưa Trung Quốc tăng trưởng nhanh chóng.'
      },
      {
        heading: 'Đông Nam Á và sự ra đời của tổ chức ASEAN',
        body: 'Các quốc gia Đông Nam Á lần lượt giành độc lập sau Thế chiến II như In-đô-nê-xi-a, Việt Nam (1945), Phi-líp-pin, Miến Điện, Ma-lai-xi-a, Xin-ga-po, Bru-nây. Ngày 8/8/1967, Hiệp hội các quốc gia Đông Nam Á (ASEAN) thành lập tại Băng Cốc gồm 5 nước sáng lập; sau Hiệp ước Ba-li (1976) và chấm dứt Chiến tranh lạnh, ASEAN mở rộng đối thoại sang Đông Dương.',
        keyPoint: 'ASEAN ra đời năm 1967 nhằm thúc đẩy hợp tác kinh tế, văn hóa và duy trì hòa bình ổn định khu vực.',
        example: 'Hiệp ước Thân thiện và Hợp tác (Ba-li, 1976) đặt nguyên tắc tôn trọng chủ quyền và giải quyết bất đồng bằng biện pháp hòa bình.'
      },
      {
        heading: 'Mỹ La-tinh và thắng lợi của Cách mạng Cu-ba',
        body: 'Khác với châu Á, nhiều nước Mỹ La-tinh giành độc lập chính trị sớm nhưng lệ thuộc nặng nề về kinh tế và chịu các chế độ độc tài thân Mỹ. Ngày 1/1/1959, nghĩa quân do Phi-đen Ca-xtơ-rô lãnh đạo lật đổ chế độ Ba-ti-xta, lập nước Cộng hòa Cu-ba, mở đầu làn sóng đấu tranh vũ trang và cải cách tiến bộ khắp "lục địa bùng cháy" trong các thập niên 1960–1980.',
        keyPoint: 'Cách mạng Cu-ba năm 1959 là lá cờ đầu của phong trào đấu tranh chống độc tài và lệ thuộc tại khu vực Mỹ La-tinh.',
        example: 'Cuộc tiến công trại lính Môn-ca-đa năm 1953 mở đầu con đường đấu tranh cách mạng mới ở Cu-ba.'
      }
    ]
  },
  {
    id: 'g9-history-13',
    grade: 9,
    strand: 'history',
    title: 'Việt Nam trong những năm đầu sau Cách mạng tháng Tám năm 1945',
    summary: 'Tìm hiểu tình thế "ngàn cân treo sợi tóc" của nước Việt Nam Dân chủ Cộng hòa, công cuộc diệt giặc đói, giặc dốt, bầu cử Quốc hội và sách lược ngoại giao bảo vệ chính quyền non trẻ (1945–1946).',
    objectives: [
      'Phân tích được những khó khăn chồng chất của nước Việt Nam mới ngay sau tháng 9/1945.',
      'Trình bày được các biện pháp giải quyết nạn đói, nạn dốt, khó khăn tài chính và xây dựng chế độ dân chủ.',
      'Giải thích được sách lược "hòa để tiến" với quân Tưởng và thực dân Pháp trong năm 1945–1946.'
    ],
    sections: [
      {
        heading: 'Tình thế "ngàn cân treo sợi tóc" (9/1945)',
        body: 'Ngay sau ngày Độc lập, nước Việt Nam Dân chủ Cộng hòa đối mặt với giặc đói (hậu quả nạn đói 1945 và lũ lụt), giặc dốt (hơn 90% dân số mù chữ), ngân khố trống rỗng và thù trong giặc ngoài: quân Trung Hoa Dân quốc kéo vào miền Bắc cùng tay sai, quân Anh mở đường cho thực dân Pháp quay lại xâm lược Nam Bộ (23/9/1945).',
        keyPoint: 'Chính quyền cách mạng non trẻ đứng trước nguy cơ mất độc lập do giặc đói, giặc dốt, tài chính kiệt quệ và ngoại xâm từ hai phía.',
        example: 'Ngày 23/9/1945, thực dân Pháp nổ súng đánh úp trụ sở Ủy ban nhân dân Nam Bộ, mở đầu cuộc xâm lược trở lại.'
      },
      {
        heading: 'Diệt giặc đói, giặc dốt và Tổng tuyển cử 6/1/1946',
        body: 'Chủ tịch Hồ Chí Minh phát động "Hũ gạo cứu đói", "Tuần lễ vàng", lập Nha Bình dân học vụ xóa mù chữ cho hàng triệu người và đẩy mạnh tăng gia sản xuất. Ngày 6/1/1946, hơn 89% cử tri cả nước đi bỏ phiếu bầu Quốc hội khóa I, tiếp đó thông qua Hiến pháp năm 1946, củng cố tính hợp hiến, hợp pháp vững chắc cho nhà nước mới.',
        keyPoint: 'Chiến dịch diệt giặc đói, giặc dốt, giải quyết tài chính và cuộc Tổng tuyển cử 6/1/1946 củng cố vững chắc hậu phương và chính quyền.',
        example: 'Tuần lễ vàng tháng 9/1945 quyên góp được 370 kg vàng và hàng chục triệu đồng cho ngân khố quốc gia.'
      },
      {
        heading: 'Sách lược ngoại giao mềm dẻo giữ vững hòa bình',
        body: 'Từ 9/1945 đến 3/1946, ta tạm hòa hoãn với quân Trung Hoa Dân quốc ở miền Bắc để dồn lực chi viện Nam Bộ kháng chiến. Khi Pháp và Tưởng kí Hiệp ước Hoa – Pháp (28/2/1946), Chủ tịch Hồ Chí Minh kí Hiệp định Sơ bộ (6/3/1946) và Tạm ước (14/9/1946) để đẩy 20 vạn quân Tưởng về nước, tranh thủ thêm thời gian quý báu chuẩn bị kháng chiến lâu dài.',
        keyPoint: 'Hiệp định Sơ bộ 6/3/1946 loại bớt một kẻ thù nguy hiểm và kéo dài thời gian hòa bình chuẩn bị lực lượng.',
        example: 'Với Hiệp định Sơ bộ, Pháp công nhận Việt Nam là một quốc gia tự do có chính phủ, nghị viện, quân đội và tài chính riêng.'
      }
    ]
  },
  {
    id: 'g9-history-14',
    grade: 9,
    strand: 'history',
    title: 'Việt Nam kháng chiến chống thực dân Pháp xâm lược giai đoạn 1946 - 1950',
    summary: 'Tìm hiểu đường lối toàn dân, toàn diện, trường kì, tự lực cánh sinh; cuộc chiến đấu ở các đô thị, chiến thắng Việt Bắc thu – đông 1947 và Chiến dịch Biên giới thu – đông 1950.',
    objectives: [
      'Trình bày được nguyên nhân bùng nổ toàn quốc kháng chiến (19/12/1946) và nội dung cơ bản của đường lối kháng chiến.',
      'Nêu được diễn biến và ý nghĩa cuộc chiến đấu 60 ngày đêm ở Hà Nội cùng Chiến thắng Việt Bắc 1947.',
      'Phân tích được bước ngoặt của Chiến dịch Biên giới thu – đông năm 1950.'
    ],
    sections: [
      {
        heading: 'Toàn quốc kháng chiến (19/12/1946) và đường lối kháng chiến',
        body: 'Do thực dân Pháp liên tiếp bội ước, đánh chiếm Hải Phòng, Lạng Sơn và gửi tối hậu thư đòi giải giáp lực lượng tự vệ Hà Nội, đêm 19/12/1946 Chủ tịch Hồ Chí Minh ra Lời kêu gọi toàn quốc kháng chiến. Quân dân Hà Nội chiến đấu giam chân địch 60 ngày đêm để cơ quan trung ương rút lên Việt Bắc an toàn. Đường lối kháng chiến là toàn dân, toàn diện, trường kì, tự lực cánh sinh.',
        keyPoint: 'Cuộc chiến đấu ở các đô thị phía Bắc vĩ tuyến 16 làm tiêu hao sinh lực địch và bảo toàn lực lượng chủ lực.',
        example: 'Lời kêu gọi "Thà hi sinh tất cả, chứ nhất định không chịu mất nước" cổ vũ cả dân tộc đứng lên kháng chiến.'
      },
      {
        heading: 'Chiến thắng Việt Bắc thu – đông 1947',
        body: 'Thu – đông 1947, Pháp huy động 1,2 vạn quân mở cuộc tiến công lên Việt Bắc hòng tiêu diệt cơ quan đầu não kháng chiến. Quân dân ta thực hiện bao vây, phục kích thắng lớn tại Bông Lau, Đoan Hùng, Khe Lau, buộc Pháp rút lui khỏi Việt Bắc, làm phá sản hoàn toàn chiến lược "đánh nhanh thắng nhanh" và đưa kháng chiến sang giai đoạn giằng co, xây dựng hậu phương.',
        keyPoint: 'Chiến thắng Việt Bắc 1947 bảo vệ an toàn cơ quan đầu não và buộc Pháp chuyển sang đánh kéo dài.',
        example: 'Trận phục kích trên sông Lô tại Đoan Hùng đánh chìm nhiều tàu chiến và canô chở quân của thực dân Pháp.'
      },
      {
        heading: 'Chiến dịch Biên giới thu – đông 1950',
        body: 'Từ năm 1950, Việt Nam nhận được sự công nhận ngoại giao của Trung Quốc, Liên Xô và các nước xã hội chủ nghĩa. Tháng 9/1950, ta chủ động mở Chiến dịch Biên giới, đánh chiếm Đông Khê, truy kích địch rút khỏi Thất Khê và Cao Bằng, khai thông con đường liên lạc quốc tế dài 750 km và giành quyền chủ động chiến lược trên chiến trường chính Bắc Bộ.',
        keyPoint: 'Chiến thắng Biên giới 1950 mở thông biên giới Việt – Trung và đưa quân đội ta giành quyền chủ động chiến lược.',
        example: 'Anh hùng La Văn Cầu và trận công đồn Đông Khê trở thành biểu tượng cho tinh thần quyết thắng của bộ đội chủ lực.'
      }
    ]
  },
  {
    id: 'g9-history-15',
    grade: 9,
    strand: 'history',
    title: 'Việt Nam kháng chiến chống thực dân Pháp xâm lược giai đoạn 1951 - 1954',
    summary: 'Tìm hiểu Đại hội đại biểu toàn quốc lần thứ II của Đảng (1951), hậu phương kháng chiến, cuộc Tiến công chiến lược Đông – Xuân 1953–1954 và Chiến thắng lịch sử Điện Biên Phủ.',
    objectives: [
      'Nêu được những chuyển biến của hậu phương kháng chiến về chính trị, kinh tế, văn hóa và cải cách ruộng đất từ 1951–1953.',
      'Trình bày được diễn biến chính và ý nghĩa của Chiến dịch lịch sử Điện Biên Phủ (1954).',
      'Phân tích được nội dung cơ bản và ý nghĩa của Hiệp định Giơ-ne-vơ năm 1954.'
    ],
    sections: [
      {
        heading: 'Hậu phương kháng chiến lớn mạnh (1951–1953)',
        body: 'Tháng 2/1951, Đại hội lần thứ II của Đảng họp tại Chiêm Hóa (Tuyên Quang) quyết định đưa Đảng ra hoạt động công khai lấy tên là Đảng Lao động Việt Nam; tháng 3/1951 Mặt trận Liên Việt ra đời. Ở hậu phương, quân dân đẩy mạnh tăng gia sản xuất, lập Ngân hàng Quốc gia, tiến hành giảm tô và cải cách ruộng đất (từ cuối 1953) tạo động lực to lớn chi viện tiền tuyến.',
        keyPoint: 'Đại hội II của Đảng (1951) và công cuộc xây dựng hậu phương tạo sức mạnh vật chất – tinh thần cho tổng tiến công.',
        example: 'Phong trào "Ruộng rẫy là chiến trường, cuốc cày là vũ khí" bảo đảm lương thực cho bộ đội ngoài mặt trận.'
      },
      {
        heading: 'Đông – Xuân 1953–1954 và Chiến thắng Điện Biên Phủ',
        body: 'Trước âm mưu của Kế hoạch Na-va, ta mở các cuộc tiến công ở Lai Châu, Trung – Hạ Lào và Tây Nguyên, buộc địch phải phân tán lực lượng và biến Điện Biên Phủ thành tập đoàn cứ điểm mạnh nhất Đông Dương. Từ ngày 13/3 đến 7/5/1954, quân dân ta tiến hành 3 đợt tiến công liên tiếp, bắt sống tướng Đờ Cát-xtơ-ri, đập tan hoàn toàn tập đoàn cứ điểm Điện Biên Phủ.',
        keyPoint: 'Chiến thắng Điện Biên Phủ ngày 7/5/1954 làm phá sản Kế hoạch Na-va, quyết định thắng lợi tại bàn đàm phán Giơ-ne-vơ.',
        example: 'Hàng chục vạn dân công hỏa tuyến với xe đạp thồ vượt núi vận chuyển gạo, đạn phục vụ chiến dịch 56 ngày đêm.'
      },
      {
        heading: 'Hiệp định Giơ-ne-vơ (21/7/1954) và ý nghĩa',
        body: 'Ngày 21/7/1954, Hiệp định Giơ-ne-vơ về chấm dứt chiến tranh, lập lại hòa bình ở Đông Dương được kí kết: các nước công nhận độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ của Việt Nam, Lào, Cam-pu-chia; lấy vĩ tuyến 17 làm giới tuyến quân sự tạm thời chờ tổng tuyển cử thống nhất vào tháng 7/1956. Thắng lợi kết thúc 9 năm kháng chiến, giải phóng hoàn toàn miền Bắc.',
        keyPoint: 'Hiệp định Giơ-ne-vơ là văn bản pháp lí quốc tế đầu tiên công nhận các quyền dân tộc cơ bản của ba nước Đông Dương.',
        example: 'Tháng 10/1954, bộ đội tiến về tiếp quản Thủ đô Hà Nội trong ngày hội giải phóng miền Bắc.'
      }
    ]
  },
  {
    id: 'g9-history-16',
    grade: 9,
    strand: 'history',
    title: 'Việt Nam kháng chiến chống Mỹ, cứu nước, thống nhất đất nước giai đoạn 1954 - 1965',
    summary: 'Tìm hiểu nhiệm vụ cách mạng ở hai miền sau 1954: miền Bắc khôi phục kinh tế, xây dựng chủ nghĩa xã hội và làm hậu phương; miền Nam làm phong trào Đồng khởi (1959–1960) và đánh bại chiến lược Chiến tranh đặc biệt.',
    objectives: [
      'Nêu được những thành tựu của miền Bắc từ 1954–1965 trong vai trò hậu phương lớn.',
      'Trình bày được nguyên nhân, diễn biến và ý nghĩa phong trào Đồng khởi (1959–1960) ở miền Nam.',
      'Phân tích được thắng lợi của quân dân miền Nam đánh bại chiến lược Chiến tranh đặc biệt (1961–1965).'
    ],
    sections: [
      {
        heading: 'Hai miền với hai nhiệm vụ chiến lược và miền Bắc (1954–1965)',
        body: 'Sau năm 1954, đất nước tạm thời bị chia cắt do Mỹ và chính quyền Ngô Đình Diệm phá hoại Hiệp định Giơ-ne-vơ. Miền Bắc hoàn thành cải cách ruộng đất, khôi phục kinh tế (1954–1957), cải tạo và thực hiện Kế hoạch 5 năm lần thứ nhất (1961–1965) theo Nghị quyết Đại hội III của Đảng (9/1960), trở thành hậu phương vững chắc chi viện cho miền Nam qua tuyến đường Trường Sơn.',
        keyPoint: 'Miền Bắc vừa xây dựng chủ nghĩa xã hội vừa làm nghĩa vụ hậu phương lớn chi viện sức người, sức của cho miền Nam.',
        example: 'Đoàn 559 thành lập tháng 5/1959 mở tuyến vận tải chiến lược Trường Sơn nối hậu phương miền Bắc với tiền tuyến miền Nam.'
      },
      {
        heading: 'Phong trào Đồng khởi (1959–1960)',
        body: 'Trước chính sách tố cộng, diệt cộng và Luật 10/59 tàn khốc của Mỹ – Diệm, Nghị quyết Trung ương 15 (1/1959) cho phép nhân dân miền Nam sử dụng bạo lực cách mạng. Phong trào bùng phát từ Bắc Ái, Trà Bồng và lên đỉnh cao ở Bến Tre (1/1960), làm tan rã bộ máy kìm kẹp ở nhiều vùng nông thôn và dẫn tới sự ra đời của Mặt trận Dân tộc Giải phóng miền Nam Việt Nam (20/12/1960).',
        keyPoint: 'Đồng khởi đưa cách mạng miền Nam từ thế giữ gìn lực lượng sang thế tiến công chiến lược.',
        example: 'Đội quân tóc dài ở Bến Tre trở thành hình thức đấu tranh chính trị sáng tạo gắn với khởi nghĩa của quần chúng.'
      },
      {
        heading: 'Đánh bại chiến lược "Chiến tranh đặc biệt" (1961–1965)',
        body: 'Từ năm 1961, Mỹ thực hiện Chiến tranh đặc biệt bằng quân đội Sài Gòn, cố vấn Mỹ và hệ thống "ấp chiến lược". Quân dân miền Nam đẩy mạnh đấu tranh trên ba vùng chiến lược, phá ấp chiến lược, mở màn bằng chiến thắng Ấp Bắc (1/1963) và đánh bại địch tại Bình Giã, Ba Gia, Đồng Xoài, làm phá sản hoàn toàn chiến lược Chiến tranh đặc biệt vào giữa năm 1965.',
        keyPoint: 'Chiến thắng Ấp Bắc (1963) mở đầu cao trào đánh thắng chiến thuật trực thăng vận, thiết xa vận của Mỹ – Sài Gòn.',
        example: 'Cuộc đấu tranh của các tầng lớp thị dân, phật tử và sinh viên Sài Gòn làm chính quyền Ngô Đình Diệm khủng hoảng sâu sắc.'
      }
    ]
  },
  {
    id: 'g9-history-17',
    grade: 9,
    strand: 'history',
    title: 'Việt Nam kháng chiến chống Mỹ, cứu nước, thống nhất đất nước giai đoạn 1965 - 1975',
    summary: 'Tìm hiểu cuộc chiến đấu đánh bại Chiến tranh cục bộ (1965–1968), Việt Nam hóa chiến tranh, chiến thắng "Điện Biên Phủ trên không" 1972, Hiệp định Pa-ri 1973 và Đại thắng mùa Xuân 1975.',
    objectives: [
      'Nêu được thắng lợi tiêu biểu đánh bại Chiến tranh cục bộ, nổi bật là cuộc Tổng tiến công và nổi dậy Tết Mậu Thân 1968.',
      'Trình bày được ý nghĩa thắng lợi "Điện Biên Phủ trên không" (12/1972) và Hiệp định Pa-ri (27/1/1973).',
      'Trình bày được diễn biến chính ba chiến dịch lớn trong Tổng tiến công và nổi dậy mùa Xuân 1975.'
    ],
    sections: [
      {
        heading: 'Đánh bại "Chiến tranh cục bộ" và Tết Mậu Thân 1968',
        body: 'Từ năm 1965, Mỹ đưa hàng chục vạn quân viễn chinh trực tiếp vào miền Nam và ném bom phá hoại miền Bắc. Quân dân miền Nam giành chiến thắng Vạn Tường (8/1965), đánh bại hai cuộc phản công mùa khô, rồi mở cuộc Tổng tiến công và nổi dậy Tết Mậu Thân 1968 đánh thẳng vào các đô thị và Tòa đại sứ Mỹ, buộc Mỹ phải xuống thang, chấp nhận đàm phán tại Pa-ri.',
        keyPoint: 'Tết Mậu Thân 1968 làm lung lay ý chí xâm lược của Mỹ và mở đầu cục diện "vừa đánh vừa đàm".',
        example: 'Tại miền Bắc, quân dân vừa sản xuất vừa chiến đấu bắn rơi hàng nghìn máy bay Mỹ với khẩu hiệu "Nhằm thẳng quân thù mà bắn".'
      },
      {
        heading: '"Điện Biên Phủ trên không" 1972 và Hiệp định Pa-ri 1973',
        body: 'Chuyển sang chiến lược "Việt Nam hóa chiến tranh", Mỹ tiếp tục mở rộng chiến tranh sang Lào, Cam-pu-chia, nhưng bị đánh bại tại Đường 9 – Nam Lào (1971) và Cuộc tiến công chiến lược 1972. Cuối tháng 12/1972, quân dân Hà Nội – Hải Phòng đập tan cuộc tập kích B-52 trong 12 ngày đêm, buộc Mỹ kí Hiệp định Pa-ri (27/1/1973) cam kết rút hết quân viễn chinh.',
        keyPoint: 'Hiệp định Pa-ri 1973 tạo bước ngoặt lịch sử "đánh cho Mỹ cút", tạo thế thuận lợi để tiến tới giải phóng hoàn toàn miền Nam.',
        example: 'Trong 12 ngày đêm cuối năm 1972, lực lượng phòng không – không quân đã bắn rơi nhiều máy bay ném bom chiến lược B-52.'
      },
      {
        heading: 'Tổng tiến công và nổi dậy mùa Xuân 1975',
        body: 'Chớp thời cơ sau chiến thắng Đường 14 – Phước Long, Bộ Chính trị mở cuộc Tổng tiến công và nổi dậy mùa Xuân 1975 với ba chiến dịch lớn liên tiếp: Chiến dịch Tây Nguyên (mở màn bằng giải phóng Buôn Ma Thuột 10/3), Chiến dịch Huế – Đà Nẵng (cuối tháng 3) và Chiến dịch Hồ Chí Minh lịch sử. Lúc 11 giờ 30 phút ngày 30/4/1975, lá cờ giải phóng tung bay trên nóc Dinh Độc Lập, non sông thu về một mối.',
        keyPoint: 'Đại thắng mùa Xuân 1975 kết thúc 21 năm kháng chiến chống Mỹ và 30 năm chiến tranh giải phóng dân tộc.',
        example: 'Chiến dịch Hồ Chí Minh diễn ra thần tốc từ ngày 26 đến 30/4/1975 với 5 cánh quân hợp vây tiến vào trung tâm Sài Gòn.'
      }
    ]
  },
  {
    id: 'g9-history-18',
    grade: 9,
    strand: 'history',
    title: 'Trật tự thế giới mới từ năm 1991 đến nay. Liên bang Nga và nước Mỹ từ năm 1991 đến nay',
    summary: 'Tìm hiểu xu thế hình thành trật tự thế giới đa cực sau năm 1991, quá trình phục hồi vị thế của Liên bang Nga và đường lối kinh tế – đối ngoại của nước Mỹ từ 1991 đến nay.',
    objectives: [
      'Trình bày được các xu thế chính trong quan hệ quốc tế từ sau năm 1991 đến nay.',
      'Nêu được những nét chính về tình hình kinh tế, chính trị, đối ngoại của Liên bang Nga từ 1991 đến nay.',
      'Nêu được đặc điểm phát triển kinh tế, khoa học công nghệ và chính sách đối ngoại của nước Mỹ từ 1991 đến nay.'
    ],
    sections: [
      {
        heading: 'Xu thế trật tự thế giới mới sau năm 1991',
        body: 'Sau khi Liên Xô tan rã, trật tự hai cực chấm dứt, thế giới bước vào thời kì chuyển dịch theo xu thế đa cực, nhiều trung tâm với sự vươn lên của Mỹ, Liên minh châu Âu, Trung Quốc, Nhật Bản, Ấn Độ và Nga. Hòa bình, hợp tác và phát triển trở thành xu thế chủ đạo dù vẫn tồn tại nhiều điểm nóng xung đột khu vực, chủ nghĩa khủng bố và các thách thức an ninh phi truyền thống.',
        keyPoint: 'Từ sau 1991, quan hệ quốc tế vận động theo xu thế đa cực, lấy phát triển kinh tế và hợp tác làm trọng tâm.',
        example: 'Các tổ chức như WTO, G20 và các hiệp định thương mại đa phương phản ánh sự phụ thuộc lẫn nhau giữa các nền kinh tế.'
      },
      {
        heading: 'Liên bang Nga từ năm 1991 đến nay',
        body: 'Là quốc gia kế tục Liên Xô về vị thế quốc tế và thành viên thường trực Hội đồng Bảo an Liên hợp quốc, Liên bang Nga trải qua thập niên 1990 đầy biến động kinh tế – xã hội. Từ năm 2000, dưới thời Tổng thống V. Pu-tin, kinh tế Nga dần phục hồi nhờ nguồn năng lượng và công nghiệp quốc phòng, đồng thời theo đuổi chính sách đối ngoại đa phương, khẳng định vai trò nước lớn.',
        keyPoint: 'Liên bang Nga vượt qua khủng hoảng thập niên 1990 và theo đuổi vị thế cường quốc trong trật tự đa cực.',
        example: 'Nga duy trì quan hệ đối tác chiến lược toàn diện với nhiều quốc gia châu Á, trong đó có Việt Nam.'
      },
      {
        heading: 'Nước Mỹ từ năm 1991 đến nay',
        body: 'Trong suốt ba thập kỉ sau Chiến tranh lạnh, Mỹ vẫn giữ vị thế nền kinh tế lớn và trung tâm đổi mới sáng tạo về công nghệ thông tin, trí tuệ nhân tạo, sinh học và không gian. Về đối ngoại, Mỹ có giai đoạn thúc đẩy trật tự đơn cực và tiến hành các chiến dịch chống khủng bố sau sự kiện 11/9/2001, đồng thời phải ứng phó với sự cạnh tranh ngày càng lớn từ các cường quốc mới nổi.',
        keyPoint: 'Mỹ dẫn đầu về công nghệ cao và tài chính nhưng ngày càng phải chia sẻ ảnh hưởng trong thế giới đa cực.',
        example: 'Thung lũng Si-li-côn trở thành biểu tượng toàn cầu về đổi mới công nghệ số của nước Mỹ từ cuối thế kỉ XX.'
      }
    ]
  },
  {
    id: 'g9-history-19',
    grade: 9,
    strand: 'history',
    title: 'Châu Á từ năm 1991 đến nay',
    summary: 'Tìm hiểu sự phát triển mạnh mẽ của Trung Quốc, Nhật Bản, Hàn Quốc, Ấn Độ và bước tiến hội nhập của ASEAN (từ 6 lên 10 thành viên, Cộng đồng ASEAN) từ 1991 đến nay.',
    objectives: [
      'Nêu được những thành tựu nổi bật về kinh tế và khoa học công nghệ của Trung Quốc, Ấn Độ, Nhật Bản và Hàn Quốc từ 1991 đến nay.',
      'Trình bày được quá trình mở rộng ASEAN từ 6 lên 10 nước và sự thành lập Cộng đồng ASEAN (2015).',
      'Đánh giá được vị thế ngày càng tăng của khu vực châu Á – Thái Bình Dương trong thế giới đương đại.'
    ],
    sections: [
      {
        heading: 'Trung Quốc, Ấn Độ, Nhật Bản và Hàn Quốc phát triển năng động',
        body: 'Từ thập niên 1990, Trung Quốc vươn lên thành nền kinh tế lớn thứ hai thế giới, thu hồi chủ quyền Hồng Kông (1997), Ma Cao (1999) và đạt nhiều bước tiến về không gian, công nghệ cao. Ấn Độ phát triển mạnh phần mềm, dược phẩm và công nghiệp vũ trụ. Nhật Bản giữ vị thế cường quốc kinh tế – công nghệ dù tăng trưởng chậm hơn, còn Hàn Quốc bứt phá mạnh về điện tử, ô tô và văn hóa đại chúng.',
        keyPoint: 'Đông Á và Nam Á trở thành động lực tăng trưởng quan trọng bậc nhất của kinh tế toàn cầu từ sau năm 1991.',
        example: 'Trung Quốc phóng thành công tàu Thần Châu năm 2003, trở thành quốc gia thứ ba tự đưa người vào vũ trụ.'
      },
      {
        heading: 'ASEAN mở rộng và hình thành Cộng đồng ASEAN',
        body: 'Chấm dứt đối đầu Chiến tranh lạnh tạo điều kiện để ASEAN kết nạp thêm Việt Nam (1995), Lào và Mi-an-ma (1997), Cam-pu-chia (1999), trở thành "mái nhà chung" của 10 quốc gia Đông Nam Á. Năm 2007 ASEAN thông qua Hiến chương ASEAN và ngày 31/12/2015 chính thức thành lập Cộng đồng ASEAN với ba trụ cột: Chính trị – An ninh, Kinh tế và Văn hóa – Xã hội.',
        keyPoint: 'Việt Nam gia nhập ASEAN năm 1995 mở đầu thời kì hội nhập toàn diện, đưa tổ chức tiến tới Cộng đồng ASEAN 2015.',
        example: 'Cộng đồng Kinh tế ASEAN (AEC) hướng tới một thị trường chung, luân chuyển hàng hóa, dịch vụ và đầu tư thuận lợi hơn.'
      },
      {
        heading: 'Cơ hội và thách thức của châu Á hiện đại',
        body: 'Bên cạnh tốc độ tăng trưởng ấn tượng và kết nối thương mại sâu rộng, châu Á đối mặt với các thách thức như chênh lệch phát triển, già hóa dân số ở Đông Á, tranh chấp chủ quyền trên biển, an ninh nguồn nước sông Mê Công và tác động nặng nề của biến đổi khí hậu. Đối thoại đa phương và hợp tác tôn trọng luật pháp quốc tế là chìa khóa giữ vững ổn định khu vực.',
        keyPoint: 'Phát triển bền vững ở châu Á đòi hỏi vừa giữ đà đổi mới kinh tế vừa hợp tác giải quyết tranh chấp và biến đổi khí hậu.',
        example: 'ASEAN và các đối tác xây dựng nhiều cơ chế đối thoại như Diễn đàn khu vực ASEAN (ARF) và Cấp cao Đông Á (EAS).'
      }
    ]
  },
  {
    id: 'g9-history-20',
    grade: 9,
    strand: 'history',
    title: 'Việt Nam từ năm 1976 đến nay',
    summary: 'Tìm hiểu công cuộc thống nhất đất nước về mặt nhà nước, vượt qua khủng hoảng bao cấp (1976–1986), đường lối Đổi mới từ Đại hội VI (1986) và những thành tựu hội nhập quốc tế to lớn.',
    objectives: [
      'Nêu được những sự kiện hoàn thành thống nhất nhà nước năm 1976 và bối cảnh dẫn tới công cuộc Đổi mới.',
      'Trình bày được nội dung trọng tâm của đường lối Đổi mới đề ra từ Đại hội VI của Đảng (12/1986).',
      'Nêu được những thành tựu nổi bật về kinh tế, xã hội và đối ngoại của Việt Nam từ năm 1986 đến nay.'
    ],
    sections: [
      {
        heading: 'Thống nhất nhà nước (1976) và tìm đường Đổi mới',
        body: 'Ngày 25/4/1976, cuộc Tổng tuyển cử bầu Quốc hội chung được tiến hành; Quốc hội khóa VI quyết định đổi tên nước thành Cộng hòa xã hội chủ nghĩa Việt Nam, chọn Hà Nội làm Thủ đô và đổi tên Sài Gòn thành Thành phố Hồ Chí Minh. Giai đoạn 1976–1985 đạt nhiều kết quả khôi phục kinh tế và bảo vệ biên giới Tây Nam, biên giới phía Bắc, nhưng mô hình bao cấp khiến lạm phát tăng cao và đòi hỏi đổi mới cấp thiết.',
        keyPoint: 'Năm 1976 hoàn thành thống nhất đất nước về mặt nhà nước; khó khăn kinh tế thời bao cấp thúc đẩy Đảng tìm đường Đổi mới.',
        example: 'Các mô hình "khoán sản phẩm" trong nông nghiệp ở Hải Phòng và Vĩnh Phú gợi mở hướng tháo gỡ cơ chế cũ.'
      },
      {
        heading: 'Đại hội VI (12/1986) và nội dung đường lối Đổi mới',
        body: 'Tháng 12/1986, Đại hội đại biểu toàn quốc lần thứ VI của Đảng khởi xướng công cuộc Đổi mới toàn diện, lấy đổi mới kinh tế làm trọng tâm: xóa bỏ cơ chế tập trung quan liêu bao cấp, phát triển kinh tế hàng hóa nhiều thành phần định hướng xã hội chủ nghĩa, mở rộng đối ngoại và phát huy dân chủ. Các đại hội tiếp theo tiếp tục hoàn thiện thể chế kinh tế thị trường và hội nhập sâu rộng.',
        keyPoint: 'Đổi mới không phải là từ bỏ mục tiêu phát triển bền vững đất nước mà là đổi mới phương thức quản lí kinh tế và mở cửa hội nhập.',
        example: 'Chỉ thị 10 về khoán hộ (Khoán 10 năm 1988) giúp Việt Nam từ nước thiếu ăn trở thành nước xuất khẩu gạo hàng đầu từ năm 1989.'
      },
      {
        heading: 'Thành tựu Đổi mới và vị thế quốc tế ngày nay',
        body: 'Từ nước nghèo, Việt Nam vươn lên thành nền kinh tế phát triển năng động, đạt nhiều thành tựu về xóa đói giảm nghèo, phổ cập giáo dục, y tế và chuyển đổi số. Về đối ngoại, Việt Nam bình thường hóa quan hệ với Trung Quốc (1991), Mỹ (1995), gia nhập ASEAN (1995), WTO (2007), tham gia nhiều FTA thế hệ mới và thiết lập quan hệ đối tác chiến lược toàn diện với nhiều nước lớn.',
        keyPoint: 'Công cuộc Đổi mới đưa Việt Nam thoát khỏi khủng hoảng, tăng trưởng ổn định và nâng cao uy tín trên trường quốc tế.',
        example: 'Việt Nam nhiều lần đảm nhận thành công vai trò Ủy viên không thường trực Hội đồng Bảo an Liên hợp quốc và Chủ tịch ASEAN.'
      }
    ]
  },
  {
    id: 'g9-history-21',
    grade: 9,
    strand: 'history',
    title: 'Cách mạng khoa học - kĩ thuật và xu thế toàn cầu hóa',
    summary: 'Tìm hiểu các giai đoạn của Cách mạng khoa học – kĩ thuật hiện đại từ những năm 1940 đến Cách mạng công nghiệp 4.0, cùng bản chất, tác động hai mặt của xu thế toàn cầu hóa.',
    objectives: [
      'Phân biệt được hai giai đoạn phát triển và các thành tựu tiêu biểu của Cách mạng khoa học – kĩ thuật từ 1945 đến nay.',
      'Trình bày được biểu hiện chính của xu thế toàn cầu hóa về thương mại, tài chính, sản xuất và kết nối số.',
      'Phân tích được cơ hội và thách thức của cách mạng công nghệ và toàn cầu hóa đối với Việt Nam.'
    ],
    sections: [
      {
        heading: 'Từ Cách mạng khoa học – kĩ thuật đến Cách mạng công nghiệp 4.0',
        body: 'Từ thập niên 1940, cuộc Cách mạng khoa học – kĩ thuật hiện đại phát triển qua hai giai đoạn: giai đoạn đầu gắn với tự động hóa, năng lượng hạt nhân, vật liệu mới và vũ trụ; từ thập niên 1970 chuyển sang Cách mạng khoa học – công nghệ lấy công nghệ thông tin làm nòng cốt, rồi tiến tới Cách mạng công nghiệp lần thứ tư với trí tuệ nhân tạo, dữ liệu lớn và sinh học.',
        keyPoint: 'Khoa học trở thành lực lượng sản xuất trực tiếp, rút ngắn thời gian từ phát minh đến ứng dụng thực tiễn.',
        example: 'Sự ra đời của mạng Internet và điện thoại thông minh đã thay đổi hoàn toàn cách học tập, giao tiếp và làm việc.'
      },
      {
        heading: 'Bản chất và biểu hiện của xu thế toàn cầu hóa',
        body: 'Toàn cầu hóa là quá trình tăng lên mạnh mẽ những mối liên hệ, ảnh hưởng và phụ thuộc lẫn nhau giữa các khu vực và quốc gia. Biểu hiện rõ nét qua sự bùng nổ thương mại quốc tế, vai trò chi phối của các công ti xuyên quốc gia, dòng vốn tài chính toàn cầu và sự mở rộng của các tổ chức kinh tế như WTO, các hiệp định thương mại tự do.',
        keyPoint: 'Toàn cầu hóa kết nối chuỗi giá trị sản xuất, thương mại và tri thức vượt qua biên giới quốc gia.',
        example: 'Một chiếc điện thoại thông minh có thể được thiết kế ở một nước, sản xuất linh kiện ở nhiều nước và lắp ráp tại Việt Nam.'
      },
      {
        heading: 'Tác động hai mặt đối với các quốc gia đang phát triển',
        body: 'Cách mạng công nghệ và toàn cầu hóa mang lại cơ hội tiếp thu công nghệ mới, thu hút đầu tư, mở rộng thị trường xuất khẩu và nâng cao năng suất lao động. Tuy nhiên, nó cũng tạo ra thách thức về cạnh tranh gay gắt, gia tăng khoảng cách giàu nghèo, rủi ro an ninh mạng, biến đổi khí hậu và nguy cơ xói mòn bản sắc văn hóa dân tộc nếu không chủ động thích ứng.',
        keyPoint: 'Toàn cầu hóa vừa là thời cơ bứt phá vừa đặt ra yêu cầu nâng cao chất lượng nhân lực và giữ gìn bản sắc dân tộc.',
        example: 'Học sinh thời đại số cần rèn luyện kĩ năng công nghệ, ngoại ngữ song song với bảo vệ an toàn thông tin cá nhân.'
      }
    ]
  },

  // ======================== GRADE 9 GEOGRAPHY (21) ========================
  {
    id: 'g9-geography-01',
    grade: 9,
    strand: 'geography',
    title: 'Dân tộc và dân số',
    summary: 'Tìm hiểu cộng đồng 54 dân tộc Việt Nam, quy mô, gia tăng và cơ cấu dân số theo tuổi, giới tính cũng như những vấn đề đặt ra đối với phát triển kinh tế – xã hội.',
    objectives: [
      'Trình bày được đặc điểm phân bố và tinh thần đoàn kết của 54 dân tộc Việt Nam.',
      'Phân tích được sự thay đổi quy mô, tốc độ gia tăng dân số và cơ cấu dân số theo tuổi ở nước ta.',
      'Nhận xét được tình trạng mất cân bằng giới tính khi sinh và định hướng dân số hiện nay.'
    ],
    sections: [
      {
        heading: 'Cộng đồng 54 dân tộc Việt Nam',
        body: 'Việt Nam là quốc gia đa dân tộc gồm 54 dân tộc anh em cùng sinh sống bình đẳng và gắn bó mật thiết trong quá trình dựng nước, giữ nước. Dân tộc Kinh chiếm khoảng 85% dân số, phân bố rộng khắp cả nước nhất là ở đồng bằng và đô thị; các dân tộc thiểu số chiếm gần 15%, cư trú chủ yếu ở trung du, miền núi và biên giới, có bản sắc văn hóa phong phú.',
        keyPoint: '54 dân tộc cùng chung sống đoàn kết, bình đẳng, tạo nên nền văn hóa Việt Nam thống nhất trong đa dạng.',
        example: 'Người Việt Nam sinh sống ở nước ngoài cũng là bộ phận không tách rời của cộng đồng dân tộc Việt Nam.'
      },
      {
        heading: 'Quy mô và gia tăng dân số',
        body: 'Dân số Việt Nam đứng vào nhóm đông dân trên thế giới và thứ ba Đông Nam Á (khoảng hơn 100 triệu người). Nhờ chính sách dân số hợp lí và nâng cao nhận thức xã hội, tỉ lệ gia tăng dân số tự nhiên đã giảm đáng kể trong những thập kỉ gần đây, song mỗi năm vẫn tăng thêm gần một triệu người do quy mô dân số nền lớn.',
        keyPoint: 'Việt Nam có quy mô dân số đông, tỉ lệ tăng tự nhiên đã giảm nhưng số người tăng thêm hằng năm vẫn lớn.',
        example: 'Dân số đông tạo thị trường tiêu thụ rộng lớn nhưng cũng tạo áp lực lên giáo dục, y tế và việc làm.'
      },
      {
        heading: 'Cơ cấu dân số và những vấn đề cần quan tâm',
        body: 'Cơ cấu dân số theo tuổi chuyển dịch theo hướng giảm tỉ trọng nhóm dưới 15 tuổi và tăng tỉ trọng nhóm từ 65 tuổi trở lên; Việt Nam đang ở giai đoạn cơ cấu dân số vàng đồng thời bước vào tốc độ già hóa nhanh. Tình trạng mất cân bằng giới tính khi sinh ở một số địa phương đặt ra yêu cầu truyền thông bình đẳng giới và chăm sóc an sinh cho người cao tuổi.',
        keyPoint: 'Tận dụng thời cơ dân số vàng gắn với chuẩn bị an sinh cho quá trình già hóa dân số là nhiệm vụ chiến lược.',
        example: 'Đầu tư đào tạo nghề cho lao động trẻ và mở rộng hệ thống chăm sóc người cao tuổi giúp thích ứng chuyển đổi cơ cấu tuổi.'
      }
    ]
  },
  {
    id: 'g9-geography-02',
    grade: 9,
    strand: 'geography',
    title: 'Phân bố dân cư và các loại hình quần cư',
    summary: 'Tìm hiểu sự phân bố dân cư không đều giữa đồng bằng với miền núi, giữa thành thị và nông thôn, cùng sự thay đổi của hai loại hình quần cư nông thôn – thành thị.',
    objectives: [
      'Phân tích được sự phân bố dân cư theo vùng tự nhiên và giải thích được nguyên nhân.',
      'So sánh được đặc điểm chức năng, kiến trúc và hoạt động kinh tế của quần cư nông thôn và quần cư thành thị.',
      'Trình bày được xu hướng đô thị hóa và những thay đổi trong nông thôn mới.'
    ],
    sections: [
      {
        heading: 'Sự phân bố dân cư không đều giữa các vùng',
        body: 'Mật độ dân số Việt Nam thuộc nhóm cao trên thế giới nhưng phân bố rất không đều giữa các khu vực. Đồng bằng sông Hồng, Đông Nam Bộ và các đồng bằng ven biển tập trung mật độ dân cư rất cao nhờ địa hình bằng phẳng, đất phù sa màu mỡ, giao thông thuận lợi và nhiều khu công nghiệp. Trái lại, vùng núi phía Bắc và Tây Nguyên có mật độ dân số thấp hơn nhiều.',
        keyPoint: 'Dân cư tập trung đông đúc ở đồng bằng và ven biển, thưa thớt hơn ở vùng trung du và miền núi.',
        example: 'Mật độ dân số ở Đồng bằng sông Hồng cao gấp nhiều lần so với khu vực Tây Bắc.'
      },
      {
        heading: 'Quần cư nông thôn và quần cư thành thị',
        body: 'Quần cư nông thôn phân bố thành thôn, ấp, bản, làng với mật độ thấp, dân cư hoạt động chủ yếu trong nông, lâm, thủy sản và các làng nghề truyền thống. Quần cư thành thị tập trung dân cư với mật độ cao tại các phường, thị trấn; kinh tế chủ yếu là công nghiệp, xây dựng, thương mại, tài chính và dịch vụ, hạ tầng phát triển hiện đại.',
        keyPoint: 'Hai loại hình quần cư khác biệt rõ về mật độ dân cư, cấu trúc không gian sống và hoạt động kinh tế chủ đạo.',
        example: 'Các làng nghề gốm Bát Tràng hay lụa Vạn Phúc đang kết hợp nông thôn mới với sản xuất thủ công và du lịch.'
      },
      {
        heading: 'Quá trình đô thị hóa hiện nay',
        body: 'Tỉ lệ dân thành thị ở nước ta tăng liên tục cùng với quá trình công nghiệp hóa và mở rộng các khu đô thị, song vẫn thấp hơn mức trung bình nhiều nước phát triển. Đô thị hóa thúc đẩy tăng trưởng kinh tế và chuyển dịch cơ cấu lao động, nhưng đòi hỏi đầu tư đồng bộ giao thông, nhà ở, cấp thoát nước và kiểm soát ô nhiễm môi trường đô thị.',
        keyPoint: 'Đô thị hóa tăng nhanh mở rộng cơ hội việc làm phi nông nghiệp và đặt ra bài toán hạ tầng bền vững.',
        example: 'Hà Nội và Thành phố Hồ Chí Minh là hai đô thị đặc biệt đóng vai trò cực tăng trưởng của cả nước.'
      }
    ]
  },
  {
    id: 'g9-geography-03',
    grade: 9,
    strand: 'geography',
    title: 'Lao động và việc làm',
    summary: 'Phân tích đặc điểm nguồn lao động dồi dào, cơ cấu lao động chuyển dịch theo ngành và thành phần kinh tế, chất lượng lao động và các giải pháp giải quyết việc làm.',
    objectives: [
      'Trình bày được thế mạnh và hạn chế của nguồn lao động Việt Nam hiện nay.',
      'Nhận xét được sự chuyển dịch cơ cấu lao động giữa nông – lâm – thủy sản, công nghiệp và dịch vụ.',
      'Nêu được nguyên nhân của vấn đề việc làm và các giải pháp nâng cao chất lượng nhân lực.'
    ],
    sections: [
      {
        heading: 'Đặc điểm nguồn lao động nước ta',
        body: 'Nguồn lao động Việt Nam dồi dào, lực lượng trẻ chiếm tỉ trọng lớn, cần cù và có khả năng tiếp thu nhanh khoa học kĩ thuật trong các ngành sản xuất truyền thống lẫn hiện đại. Tuy nhiên, tỉ lệ lao động đã qua đào tạo có bằng cấp, chứng chỉ vẫn chưa đáp ứng hết nhu cầu công nghiệp hóa, chuyển đổi số và phân bố lao động tay nghề cao còn chênh lệch giữa các vùng.',
        keyPoint: 'Việt Nam có lực lượng lao động đông đảo, trẻ nhưng cần tiếp tục nâng cao tỉ lệ đào tạo nghề và kĩ năng số.',
        example: 'Nhiều doanh nghiệp công nghệ và cơ khí chính xác đòi hỏi kĩ thuật viên có tay nghề và ngoại ngữ tốt.'
      },
      {
        heading: 'Chuyển dịch cơ cấu lao động',
        body: 'Cùng với tăng trưởng kinh tế, tỉ trọng lao động làm việc trong khu vực nông, lâm, thủy sản giảm dần qua các năm, trong khi tỉ trọng lao động trong công nghiệp – xây dựng và dịch vụ tăng lên rõ rệt. Cơ cấu lao động theo thành phần kinh tế cũng chuyển dịch theo hướng tăng tỉ trọng khu vực ngoài nhà nước và khu vực có vốn đầu tư nước ngoài.',
        keyPoint: 'Lao động dịch chuyển mạnh từ nông nghiệp sang công nghiệp, xây dựng và dịch vụ.',
        example: 'Sự phát triển của các khu công nghiệp và du lịch thu hút hàng triệu lao động nông thôn chuyển sang việc làm phi nông nghiệp.'
      },
      {
        heading: 'Vấn đề việc làm và giải pháp nâng cao chất lượng',
        body: 'Tỉ lệ thất nghiệp ở thành thị và tình trạng thiếu việc làm theo mùa vụ ở nông thôn vẫn là bài toán cần giải quyết. Giải pháp trọng tâm là phát triển đa dạng các ngành kinh tế, khuyến khích khởi nghiệp, đẩy mạnh giáo dục nghề nghiệp gắn với nhu cầu doanh nghiệp, phát triển nông nghiệp công nghệ cao và hợp tác xuất khẩu lao động chất lượng.',
        keyPoint: 'Giải quyết việc làm hiệu quả cần kết hợp mở rộng sản xuất với đào tạo nghề sát thực tiễn thị trường.',
        example: 'Đưa nghề thủ công mỹ nghệ, dịch vụ du lịch cộng đồng về nông thôn giúp tạo thêm việc làm lúc nông nhàn.'
      }
    ]
  },
  {
    id: 'g9-geography-04',
    grade: 9,
    strand: 'geography',
    title: 'Thực hành: Tìm hiểu vấn đề việc làm ở địa phương và phân hóa thu nhập theo vùng',
    summary: 'Rèn luyện kĩ năng thu thập thông tin, đọc bảng số liệu, biểu đồ về tỉ lệ thiếu việc làm, thất nghiệp và mức thu nhập bình quân đầu người giữa các vùng kinh tế Việt Nam.',
    objectives: [
      'Đọc và phân tích được bảng số liệu về thất nghiệp, thiếu việc làm và thu nhập bình quân đầu người giữa các vùng.',
      'Giải thích được nguyên nhân dẫn đến sự chênh lệch thu nhập giữa Đông Nam Bộ, Đồng bằng sông Hồng với các vùng miền núi.',
      'Đề xuất được phương hướng tìm hiểu và giải pháp cải thiện việc làm phù hợp điều kiện địa phương.'
    ],
    sections: [
      {
        heading: 'Phân tích số liệu việc làm và thu nhập theo vùng',
        body: 'Các số liệu thống kê cho thấy thu nhập bình quân đầu người mỗi tháng ở Đông Nam Bộ và Đồng bằng sông Hồng cao hơn rõ rệt so với Trung du và miền núi phía Bắc hoặc Tây Nguyên. Tỉ lệ thiếu việc làm thường cao hơn ở khu vực nông thôn phụ thuộc mùa vụ, trong khi tỉ lệ thất nghiệp ở đô thị phản ánh sự cạnh tranh việc làm và yêu cầu trình độ nghề nghiệp.',
        keyPoint: 'Thu nhập và cơ hội việc làm có sự phân hóa rõ rệt giữa các vùng công nghiệp – dịch vụ phát triển với vùng nông nghiệp miền núi.',
        example: 'So sánh biểu đồ cột giúp nhận ra Đông Nam Bộ luôn dẫn đầu cả nước về mức thu nhập bình quân đầu người.'
      },
      {
        heading: 'Nguyên nhân phân hóa thu nhập giữa các vùng',
        body: 'Sự chênh lệch thu nhập bắt nguồn từ mức độ tập trung các khu công nghiệp, đô thị lớn, hạ tầng giao thông, chất lượng nguồn nhân lực và tỉ trọng ngành dịch vụ giá trị cao. Những vùng địa hình chia cắt, kinh tế còn dựa nhiều vào nông – lâm nghiệp quy mô nhỏ thường có tích lũy thấp hơn và dễ bị tổn thương bởi thiên tai.',
        keyPoint: 'Cơ cấu ngành nghề, hạ tầng kết nối và trình độ lao động quyết định lớn đến mức thu nhập bình quân vùng.',
        example: 'Nhờ thu hút mạnh FDI và dịch vụ logistics, nhiều tỉnh vùng Đông Nam Bộ có việc làm thu nhập ổn định hơn.'
      },
      {
        heading: 'Tìm hiểu thực tế việc làm tại địa phương',
        body: 'Khi thực hành tìm hiểu địa phương, học sinh cần xác định nhóm ngành tạo việc làm chủ lực (nông sản hàng hóa, khu công nghiệp, thương mại hoặc du lịch), phỏng vấn hoặc thu thập số liệu chính thống và nêu giải pháp phù hợp như đào tạo nghề, kết nối tiêu thụ sản phẩm địa phương hay phát triển du lịch sinh thái.',
        keyPoint: 'Báo cáo thực hành cần kết hợp số liệu tin cậy, quan sát thực địa và đề xuất gắn với lợi thế của địa phương.',
        example: 'Một xã ven biển có thể phát triển dịch vụ hậu cần nghề cá và chế biến hải sản đạt chuẩn để tăng thu nhập cho lao động trẻ.'
      }
    ]
  },
  {
    id: 'g9-geography-05',
    grade: 9,
    strand: 'geography',
    title: 'Nông nghiệp',
    summary: 'Tìm hiểu các nhân tố tự nhiên – kinh tế xã hội tác động đến nông nghiệp, hai ngành trồng trọt và chăn nuôi cùng xu hướng phát triển nông nghiệp xanh, công nghệ cao ở Việt Nam.',
    objectives: [
      'Phân tích được các nhân tố tự nhiên và kinh tế – xã hội ảnh hưởng tới phát triển và phân bố nông nghiệp.',
      'Trình bày được cơ cấu ngành trồng trọt, chăn nuôi và sự phân bố một số cây trồng, vật nuôi chủ lực.',
      'Nêu được xu hướng phát triển nông nghiệp hàng hóa, hữu cơ và công nghệ cao.'
    ],
    sections: [
      {
        heading: 'Các nhân tố tác động tới sản xuất nông nghiệp',
        body: 'Việt Nam có khí hậu nhiệt đới ẩm gió mùa phân hóa đa dạng theo vĩ độ và độ cao, nguồn đất phù sa màu mỡ ở đồng bằng cùng đất badan ở miền núi và cao nguyên. Về kinh tế – xã hội, lực lượng lao động có kinh nghiệm, chính sách khuyến nông, tiến bộ giống mới – cơ giới hóa và thị trường xuất khẩu rộng mở là động lực thúc đẩy sản xuất hàng hóa.',
        keyPoint: 'Thiên nhiên nhiệt đới đa dạng cho phép phát triển cả cây nhiệt đới lẫn cây cận nhiệt, ôn đới ở vùng núi cao.',
        example: 'Đất đỏ badan màu mỡ và mùa khô rõ rệt giúp Tây Nguyên trở thành vùng chuyên canh cà phê, hồ tiêu lớn nhất nước.'
      },
      {
        heading: 'Ngành trồng trọt và ngành chăn nuôi',
        body: 'Trồng trọt vẫn chiếm tỉ trọng cao nhưng tỉ trọng chăn nuôi đang có xu hướng tăng. Lúa gạo là cây lương thực chủ lực tập trung ở Đồng bằng sông Cửu Long và Đồng bằng sông Hồng; cây công nghiệp lâu năm (cà phê, cao su, hồ tiêu, chè) tập trung ở Tây Nguyên, Đông Nam Bộ và miền núi phía Bắc. Chăn nuôi lợn, gia cầm, bò sữa và bò thịt phát triển theo hướng trang trại an toàn sinh học.',
        keyPoint: 'Sản xuất nông nghiệp dịch chuyển sang vùng chuyên canh quy mô lớn, tăng tỉ trọng chăn nuôi và cây ăn quả giá trị cao.',
        example: 'Đồng bằng sông Cửu Long đóng góp hơn nửa sản lượng lúa và phần lớn lượng gạo xuất khẩu của Việt Nam.'
      },
      {
        heading: 'Xu hướng nông nghiệp xanh và công nghệ cao',
        body: 'Nông nghiệp Việt Nam đang chuyển mạnh sang áp dụng tưới tiết kiệm, nhà màng, truy xuất nguồn gốc, chuẩn VietGAP, GlobalGAP và hữu cơ nhằm nâng cao giá trị gia tăng và đáp ứng tiêu chuẩn khắt khe của thị trường quốc tế, đồng thời giảm phát thải và thích ứng biến đổi khí hậu.',
        keyPoint: 'Ứng dụng công nghệ cao và sản xuất sạch là hướng đi tất yếu để nâng cao sức cạnh tranh nông sản Việt.',
        example: 'Trồng rau, hoa trong nhà kính điều khiển tự động tại Lâm Đồng mang lại hiệu quả kinh tế cao gấp nhiều lần canh tác truyền thống.'
      }
    ]
  },
  {
    id: 'g9-geography-06',
    grade: 9,
    strand: 'geography',
    title: 'Lâm nghiệp và thủy sản',
    summary: 'Tìm hiểu hiện trạng và vai trò ba loại rừng, hoạt động trồng và bảo vệ rừng, cùng thế mạnh nuôi trồng và khai thác thủy sản xa bờ gắn với bảo vệ chủ quyền biển đảo.',
    objectives: [
      'Phân biệt được vai trò của rừng sản xuất, rừng phòng hộ và rừng đặc dụng cùng xu hướng biến động diện tích rừng.',
      'Trình bày được thế mạnh và sự phát triển của ngành khai thác và nuôi trồng thủy sản Việt Nam.',
      'Nêu được giải pháp phát triển lâm nghiệp và thủy sản bền vững.'
    ],
    sections: [
      {
        heading: 'Ngành lâm nghiệp và bảo vệ tài nguyên rừng',
        body: 'Tổng diện tích và độ che phủ rừng nước ta tăng dần nhờ công tác trồng rừng và khoanh nuôi tái sinh, song chất lượng rừng tự nhiên ở nhiều nơi vẫn cần phục hồi. Rừng gồm ba loại chính: rừng phòng hộ (ngăn lũ, chắn cát, bảo vệ bờ biển), rừng đặc dụng (bảo tồn đa dạng sinh học, vườn quốc gia) và rừng sản xuất (cung cấp gỗ, nguyên liệu giấy).',
        keyPoint: 'Nâng độ che phủ rừng đi đôi với nâng cao chất lượng rừng và phòng chống cháy, chặt phá rừng trái phép.',
        example: 'Rừng ngập mặn ven biển Cà Mau, Cần Giờ đóng vai trò phòng hộ chắn sóng và bảo vệ hệ sinh thái cửa sông.'
      },
      {
        heading: 'Ngành thủy sản: khai thác và nuôi trồng',
        body: 'Với bờ biển dài, ngư trường rộng lớn và hệ thống sông hồ chằng chịt, thủy sản trở thành ngành kinh tế mũi nhọn. Sản lượng nuôi trồng thủy sản (tôm sú, tôm thẻ chân trắng, cá tra) tăng rất nhanh tại Đồng bằng sông Cửu Long và ven biển miền Trung; trong khai thác chú trọng đầu tư tàu công suất lớn vươn khơi xa bờ và trang bị giám sát hành trình.',
        keyPoint: 'Nuôi trồng thủy sản tăng trưởng vượt bậc cùng với hiện đại hóa đội tàu đánh bắt xa bờ.',
        example: 'An Giang, Đồng Tháp và Cà Mau là những trung tâm nuôi cá tra và tôm xuất khẩu hàng đầu cả nước.'
      },
      {
        heading: 'Phát triển bền vững gắn với chống khai thác bất hợp pháp',
        body: 'Ngành thủy sản cần chấm dứt khai thác bằng chất nổ, xung điện hoặc đánh bắt trái phép trên vùng biển nước ngoài (chống khai thác IUU), bảo vệ bãi đẻ tự nhiên và kiểm soát ô nhiễm ao nuôi. Việc phát triển dịch vụ hậu cần nghề cá và chế biến sâu giúp nâng cao giá trị sản phẩm và giữ vững sinh kế ngư dân.',
        keyPoint: 'Khai thác có trách nhiệm, tuân thủ quy định chống IUU và bảo vệ nguồn lợi giúp nghề cá phát triển lâu dài.',
        example: 'Ghi nhật kí khai thác điện tử và kiểm soát nguồn gốc hải sản giúp thủy sản Việt Nam giữ vững thị trường châu Âu.'
      }
    ]
  },
  {
    id: 'g9-geography-07',
    grade: 9,
    strand: 'geography',
    title: 'Thực hành: Viết báo cáo về một mô hình sản xuất nông nghiệp có hiệu quả',
    summary: 'Hướng dẫn cấu trúc, phương pháp thu thập tư liệu và cách viết báo cáo hoàn chỉnh về một mô hình nông nghiệp xanh, nông nghiệp tuần hoàn hoặc ứng dụng công nghệ cao tại Việt Nam.',
    objectives: [
      'Xác định được các tiêu chí đánh giá một mô hình sản xuất nông nghiệp có hiệu quả (kinh tế, xã hội, môi trường).',
      'Sắp xếp được bố cục hợp lí cho một báo cáo địa lí về mô hình sản xuất nông nghiệp.',
      'Tổng hợp được thông tin về điều kiện áp dụng, quy trình kĩ thuật và hiệu quả của mô hình tiêu biểu.'
    ],
    sections: [
      {
        heading: 'Tiêu chí chọn mô hình nông nghiệp hiệu quả',
        body: 'Một mô hình sản xuất nông nghiệp hiệu quả không chỉ cho năng suất và lợi nhuận cao mà còn phải sử dụng hợp lí tài nguyên đất – nước, giảm phát thải hoặc chất thải ra môi trường, tạo việc làm ổn định cho cộng đồng và có khả năng nhân rộng. Các mô hình tiêu biểu hiện nay gồm lúa – tôm sinh thái, nông nghiệp hữu cơ tuần hoàn và trồng rau quả công nghệ cao.',
        keyPoint: 'Hiệu quả thực sự của mô hình nông nghiệp thể hiện ở cả ba mặt: kinh tế, xã hội và bảo vệ môi trường.',
        example: 'Mô hình nuôi tôm – rừng ngập mặn ở Cà Mau vừa bảo vệ rừng vừa tạo sản phẩm tôm sạch xuất khẩu giá cao.'
      },
      {
        heading: 'Cấu trúc một bản báo cáo thực hành chuẩn',
        body: 'Báo cáo gồm bốn phần rõ ràng: (1) Tên mô hình, địa điểm và điều kiện tự nhiên – kinh tế nơi triển khai; (2) Quy trình tổ chức sản xuất và công nghệ áp dụng; (3) Kết quả cụ thể về năng suất, thu nhập, việc làm và môi trường; (4) Thuận lợi, khó khăn và bài học để nhân rộng.',
        keyPoint: 'Bố cục khoa học giúp người đọc nắm nhanh bối cảnh, cách làm, số liệu kết quả và triển vọng của mô hình.',
        example: 'Dùng số liệu so sánh thu nhập trên mỗi héc-ta trước và sau khi áp dụng tưới nhỏ giọt giúp báo cáo thuyết phục hơn.'
      },
      {
        heading: 'Kiểm chứng thông tin và trình bày minh họa',
        body: 'Số liệu đưa vào báo cáo cần có nguồn gốc đáng tin cậy từ báo cáo ngành nông nghiệp, hợp tác xã hoặc khảo sát thực tế; có thể bổ sung bảng tóm tắt, biểu đồ hoặc bản đồ vị trí địa phương. Tránh đưa nhận xét cảm tính thiếu dẫn chứng số liệu hoặc thổi phồng hiệu quả một chiều.',
        keyPoint: 'Thông tin báo cáo phải chính xác, khách quan và nêu rõ cả khó khăn lẫn giải pháp khắc phục.',
        example: 'Khi viết về mô hình trồng cam VietGAP ở Hòa Bình, cần nêu cả chi phí đầu tư ban đầu và yêu cầu liên kết tiêu thụ.'
      }
    ]
  },
  {
    id: 'g9-geography-08',
    grade: 9,
    strand: 'geography',
    title: 'Công nghiệp',
    summary: 'Phân tích các nhân tố phát triển công nghiệp, cơ cấu ngành công nghiệp đa dạng (khai khoáng, điện lực, chế biến – chế tạo) và xu hướng phát triển công nghiệp xanh, công nghệ cao.',
    objectives: [
      'Phân tích được vai trò của tài nguyên, nhân lực, thị trường, vốn và công nghệ đối với phân bố công nghiệp.',
      'Trình bày được đặc điểm và phân bố của các ngành công nghiệp trọng điểm nước ta.',
      'Nêu được định hướng phát triển công nghiệp xanh, tiết kiệm năng lượng và bảo vệ môi trường.'
    ],
    sections: [
      {
        heading: 'Các nhân tố tác động tới phát triển công nghiệp',
        body: 'Tài nguyên khoáng sản (than, dầu khí, bô-xít, đá vôi), nguồn thủy năng và tiềm năng gió – mặt trời tạo cơ sở nguyên nhiên liệu ban đầu. Hiện nay, các nhân tố kinh tế – xã hội như vị trí gần cảng biển, sân bay, lực lượng lao động kĩ thuật, chính sách thu hút đầu tư nước ngoài (FDI) và thị trường toàn cầu giữ vai trò ngày càng quyết định.',
        keyPoint: 'Công nghiệp hiện đại phụ thuộc ngày càng nhiều vào hạ tầng logistics, nhân lực kĩ thuật và dòng vốn đầu tư.',
        example: 'Các khu công nghiệp điện tử tập trung quanh Hà Nội – Hải Phòng và TP. Hồ Chí Minh – Đồng Nai nhờ gần cảng, sân bay và nguồn nhân lực.'
      },
      {
        heading: 'Các ngành công nghiệp trọng điểm',
        body: 'Công nghiệp sản xuất sản phẩm điện tử, máy vi tính và thiết bị điện phát triển bùng nổ và dẫn đầu kim ngạch xuất khẩu. Công nghiệp sản xuất, chế biến thực phẩm và đồ uống phát triển rộng khắp gắn với nguồn nguyên liệu nông lâm thủy sản phong phú; công nghiệp dệt may, da giày tạo nhiều việc làm. Ngành sản xuất điện phát triển cả thủy điện, nhiệt điện và năng lượng tái tạo (điện gió, điện mặt trời).',
        keyPoint: 'Công nghiệp chế biến – chế tạo (đặc biệt điện tử, chế biến nông sản, dệt may) giữ vai trò động lực tăng trưởng chính.',
        example: 'Bắc Ninh, Thái Nguyên và TP. Hồ Chí Minh là các trung tâm sản xuất linh kiện và thiết bị điện tử lớn hàng đầu.'
      },
      {
        heading: 'Phát triển công nghiệp xanh và bền vững',
        body: 'Chuyển dịch cơ cấu công nghiệp gắn liền với giảm tỉ trọng khai khoáng thô, tăng tỉ trọng ngành công nghệ cao ít tiêu hao năng lượng và khuyến khích khu công nghiệp sinh thái. Doanh nghiệp cần xử lí triệt để nước thải, khí thải và tái chế phế liệu theo kinh tế tuần hoàn để bảo vệ sức khỏe cộng đồng.',
        keyPoint: 'Công nghiệp xanh hướng tới tiết kiệm năng lượng, nâng cao hàm lượng công nghệ và kiểm soát chặt ô nhiễm.',
        example: 'Lắp đặt hệ thống điện mặt trời áp mái và tuần hoàn nước làm mát trong khu công nghiệp giúp giảm chi phí và phát thải.'
      }
    ]
  },
  {
    id: 'g9-geography-09',
    grade: 9,
    strand: 'geography',
    title: 'Thực hành: Xác định các trung tâm công nghiệp chính ở nước ta',
    summary: 'Rèn luyện kĩ năng đọc bản đồ công nghiệp Việt Nam để xác định vị trí, quy mô, cơ cấu ngành chuyên môn hóa của các trung tâm công nghiệp lớn và khu vực tập trung.',
    objectives: [
      'Xác định được vị trí các trung tâm công nghiệp rất lớn và lớn trên bản đồ công nghiệp Việt Nam.',
      'Nhận xét được sự khác nhau về mật độ và cơ cấu ngành của các trung tâm công nghiệp giữa các vùng.',
      'Giải thích được lí do hình thành các cụm trung tâm công nghiệp lớn ở Đông Nam Bộ và Đồng bằng sông Hồng.'
    ],
    sections: [
      {
        heading: 'Cách đọc kí hiệu trung tâm công nghiệp trên bản đồ',
        body: 'Trên bản đồ công nghiệp Việt Nam, mỗi trung tâm công nghiệp được biểu hiện bằng hình tròn với kích thước tỉ lệ thuận với quy mô giá trị sản xuất; bên trong hình tròn thể hiện các kí hiệu hình học hoặc biểu tượng tượng trưng cho từng ngành công nghiệp chuyên môn hóa như cơ khí, điện tử, hóa chất, chế biến thực phẩm hay dệt may.',
        keyPoint: 'Kích thước vòng tròn phản ánh quy mô trung tâm, còn các kí hiệu bên trong cho biết ngành chuyên môn hóa.',
        example: 'Đọc phần chú giải trước khi so sánh quy mô giữa TP. Hồ Chí Minh, Hà Nội, Hải Phòng, Bình Dương và Đà Nẵng.'
      },
      {
        heading: 'Phân bố các trung tâm công nghiệp lớn',
        body: 'Các trung tâm công nghiệp tập trung dày đặc nhất ở hai khu vực: Đông Nam Bộ (với TP. Hồ Chí Minh, Biên Hòa, Thủ Dầu Một, Vũng Tàu) và Đồng bằng sông Hồng cùng phụ cận (Hà Nội, Hải Phòng, Bắc Ninh, Thái Nguyên). Dải ven biển miền Trung có Đà Nẵng, Dung Quất (Quảng Ngãi), Huế; Đồng bằng sông Cửu Long có Cần Thơ gắn mạnh với chế biến nông thủy sản.',
        keyPoint: 'Hai cực tập trung công nghiệp lớn nhất cả nước nằm ở Đồng bằng sông Hồng và vùng Đông Nam Bộ.',
        example: 'Vùng Tây Bắc và một số tỉnh vùng cao có ít trung tâm công nghiệp quy mô lớn hơn do địa hình và giao thông khó khăn.'
      },
      {
        heading: 'Giải thích cơ cấu ngành đặc trưng từng trung tâm',
        body: 'Cơ cấu ngành của mỗi trung tâm phản ánh lợi thế tự nhiên và vị trí địa lí: Vũng Tàu nổi bật về khai thác và dịch vụ dầu khí, nhiệt điện; Cần Thơ mạnh về chế biến lương thực thực phẩm và thủy sản; Bắc Ninh và Thái Nguyên phát triển mạnh điện tử công nghệ cao nhờ hạ tầng khu công nghiệp và kết nối vùng Thủ đô thuận lợi.',
        keyPoint: 'Lợi thế tài nguyên tại chỗ, cảng biển và nguồn nhân lực quy định cơ cấu ngành đặc trưng của từng trung tâm.',
        example: 'Cảng nước sâu Lạch Huyện và Cái Mép – Thị Vải giúp Hải Phòng và Bà Rịa – Vũng Tàu thuận lợi thu hút công nghiệp nặng và logistics.'
      }
    ]
  },
  {
    id: 'g9-geography-10',
    grade: 9,
    strand: 'geography',
    title: 'Dịch vụ',
    summary: 'Tìm hiểu vai trò, cơ cấu ngành dịch vụ, các loại hình giao thông vận tải, bưu chính viễn thông, thương mại nội địa – xuất nhập khẩu và du lịch Việt Nam.',
    objectives: [
      'Phân tích được các nhân tố ảnh hưởng tới phát triển và phân bố ngành dịch vụ.',
      'Trình bày được các tuyến giao thông huyết mạch (đường bộ, sắt, biển, hàng không) và mạng lưới viễn thông số.',
      'Nêu được tình hình phát triển thương mại (nội địa, xuất nhập khẩu) và tài nguyên du lịch nổi bật của Việt Nam.'
    ],
    sections: [
      {
        heading: 'Vai trò dịch vụ và các tuyến giao thông vận tải',
        body: 'Ngành dịch vụ chiếm tỉ trọng cao nhất trong cơ cấu GDP và kết nối sản xuất với tiêu dùng. Hệ thống giao thông vận tải phát triển đa dạng với trục xương sống Bắc – Nam gồm Quốc lộ 1, đường cao tốc Bắc – Nam, đường sắt Thống Nhất cùng đường Hồ Chí Minh; các cảng biển lớn (Hải Phòng, Đà Nẵng, TP. Hồ Chí Minh) và sân bay quốc tế (Nội Bài, Tân Sơn Nhất, Đà Nẵng, Phú Quốc) mở rộng hội nhập.',
        keyPoint: 'Mạng lưới giao thông đa phương thức trục Bắc – Nam và hành lang Đông – Tây tạo huyết mạch lưu thông cho nền kinh tế.',
        example: 'Cảng hàng không quốc tế Nội Bài và Tân Sơn Nhất là hai đầu mối vận tải hành khách và hàng hóa lớn nhất cả nước.'
      },
      {
        heading: 'Bưu chính viễn thông và thương mại',
        body: 'Hạ tầng viễn thông, mạng cáp quang, 4G/5G và dịch vụ số phát triển nhanh chóng, thúc đẩy thương mại điện tử và thanh toán không dùng tiền mặt. Nội thương sôi động với sự mở rộng của siêu thị, trung tâm thương mại bên cạnh chợ truyền thống; ngoại thương tăng trưởng mạnh với các mặt hàng xuất khẩu chủ lực như điện thoại – linh kiện, dệt may, giày dép, nông thủy sản.',
        keyPoint: 'Thương mại điện tử và kim ngạch xuất nhập khẩu mở rộng góp phần nâng cao sức cạnh tranh nền kinh tế.',
        example: 'Hà Nội và TP. Hồ Chí Minh là hai trung tâm thương mại và dịch vụ tài chính lớn nhất Việt Nam.'
      },
      {
        heading: 'Du lịch và tài nguyên du lịch phong phú',
        body: 'Việt Nam sở hữu nhiều di sản thiên nhiên và văn hóa thế giới được UNESCO ghi danh như Vịnh Hạ Long – Quần đảo Cát Bà, Phong Nha – Kẻ Bàng, Cố đô Huế, Phố cổ Hội An, Thánh địa Mỹ Sơn, Khu di tích Hoàng thành Thăng Long. Ngành du lịch hướng tới du lịch xanh, du lịch cộng đồng, nâng cao chất lượng dịch vụ và bảo tồn giá trị di sản.',
        keyPoint: 'Tài nguyên du lịch tự nhiên và văn hóa đặc sắc tạo điều kiện đưa du lịch trở thành ngành kinh tế mũi nhọn.',
        example: 'Phát triển du lịch bền vững ở Hội An và Sa Pa đòi hỏi kiểm soát rác thải và giữ gìn bản sắc văn hóa địa phương.'
      }
    ]
  },
  {
    id: 'g9-geography-11',
    grade: 9,
    strand: 'geography',
    title: 'Thực hành: Tìm hiểu xu hướng phát triển ngành thương mại, du lịch',
    summary: 'Thực hành phân tích số liệu, biểu đồ tăng trưởng tổng mức bán lẻ, xuất nhập khẩu, thương mại điện tử và khách du lịch nội địa – quốc tế để rút ra xu hướng ngành dịch vụ.',
    objectives: [
      'Đọc và nhận xét được xu hướng tăng trưởng tổng mức bán lẻ hàng hóa và doanh thu dịch vụ tiêu dùng.',
      'Phân tích được sự chuyển dịch cơ cấu mặt hàng xuất nhập khẩu và sự bùng nổ thương mại điện tử.',
      'Nhận diện được các xu hướng mới của ngành du lịch Việt Nam hiện nay.'
    ],
    sections: [
      {
        heading: 'Xu hướng phát triển của thương mại hiện đại',
        body: 'Số liệu nhiều năm cho thấy tổng mức bán lẻ hàng hóa và doanh thu dịch vụ tiêu dùng tăng liên tục, kéo theo tỉ trọng của bán lẻ hiện đại (siêu thị, cửa hàng tiện lợi, sàn thương mại điện tử) tăng nhanh. Cơ cấu hàng xuất khẩu chuyển dịch tích cực theo hướng tăng sản phẩm công nghiệp chế biến sâu và nông sản đạt chuẩn chất lượng cao.',
        keyPoint: 'Thương mại điện tử tăng tốc mạnh mẽ song hành với việc nâng cao hàm lượng chế biến trong hàng xuất khẩu.',
        example: 'Thanh toán mã QR và mua sắm trực tuyến giúp hàng hóa đặc sản vùng miền tiếp cận người tiêu dùng cả nước dễ dàng hơn.'
      },
      {
        heading: 'Xu hướng mới trong ngành du lịch',
        body: 'Lượng khách du lịch nội địa và quốc tế đều hướng tới trải nghiệm đa dạng hơn như du lịch nghỉ dưỡng biển đảo cao cấp, du lịch sinh thái – mạo hiểm, du lịch văn hóa – ẩm thực và du lịch cộng đồng gắn với bảo vệ môi trường. Ứng dụng bản đồ số, đặt phòng và vé điện tử giúp trải nghiệm du lịch thuận tiện hơn.',
        keyPoint: 'Du lịch chuyển từ tăng số lượng đơn thuần sang nâng cao chất lượng trải nghiệm và phát triển du lịch xanh.',
        example: 'Nhiều điểm du lịch sinh thái tại Ninh Bình và Quảng Bình áp dụng giới hạn rác nhựa dùng một lần để thu hút du khách văn minh.'
      },
      {
        heading: 'Phương pháp phân tích biểu đồ thương mại – du lịch',
        body: 'Khi xử lí số liệu thực hành, cần tính tốc độ tăng trưởng qua các mốc năm (không kể biến động ngắn hạn bất thường), đối chiếu cơ cấu tỉ trọng xuất khẩu so với nhập khẩu (xuất siêu hay nhập siêu) và giải thích gắn với bối cảnh thị trường, thu nhập dân cư cũng như đầu tư hạ tầng.',
        keyPoint: 'Nhận xét số liệu cần nêu cả xu hướng chung, độ lớn mức tăng và nguyên nhân kinh tế – xã hội phía sau.',
        example: 'Nếu giá trị xuất khẩu vượt nhập khẩu qua nhiều năm liên tiếp, nước ta đạt trạng thái xuất siêu hàng hóa.'
      }
    ]
  },
  {
    id: 'g9-geography-12',
    grade: 9,
    strand: 'geography',
    title: 'Vùng Trung du và miền núi phía Bắc',
    summary: 'Tìm hiểu vị trí địa lí, địa hình, khoáng sản, thủy năng vùng Trung du và miền núi phía Bắc; sự phát triển thủy điện, khai khoáng, cây công nghiệp cận nhiệt và du lịch.',
    objectives: [
      'Xác định được vị trí địa lí, phạm vi lãnh thổ và thế mạnh tài nguyên thiên nhiên của vùng.',
      'Trình bày được tình hình phát triển các ngành kinh tế thế mạnh: thủy điện, khoáng sản, cây công nghiệp – ăn quả và du lịch.',
      'Nêu được những hạn chế cần khắc phục về giao thông, thiên tai và bảo vệ rừng đầu nguồn.'
    ],
    sections: [
      {
        heading: 'Vị trí địa lí và điều kiện tự nhiên',
        body: 'Là vùng có diện tích rộng lớn nhất cả nước, tiếp giáp Trung Quốc, Lào, Đồng bằng sông Hồng và Bắc Trung Bộ; có vị trí chiến lược quan trọng về quốc phòng an ninh. Địa hình đồi núi cao chia cắt mạnh (dãy Hoàng Liên Sơn có đỉnh Phan-xi-păng) kết hợp cao nguyên đá vôi và khí hậu nhiệt đới ẩm gió mùa có mùa đông lạnh, rất giàu khoáng sản và tiềm năng thủy điện.',
        keyPoint: 'Vùng giàu tài nguyên khoáng sản, thủy năng lớn nhất nước và có mùa đông lạnh thích hợp cây cận nhiệt – ôn đới.',
        example: 'Sông Đà và hệ thống sông Hồng cung cấp nguồn thủy năng khổng lồ cho đất nước.'
      },
      {
        heading: 'Các ngành kinh tế thế mạnh của vùng',
        body: 'Vùng dẫn đầu cả nước về công nghiệp thủy điện với các nhà máy lớn như Sơn La, Hòa Bình, Lai Châu; khai thác than, a-pa-tít, sắt, đồng và sản xuất vật liệu xây dựng. Nông nghiệp nổi bật với chè (Thái Nguyên, Phú Thọ, Sơn La), hồi, quế, cây ăn quả ôn đới – cận nhiệt và chăn nuôi trâu, bò sữa. Du lịch phát triển mạnh tại Sa Pa, Mộc Châu, Hà Giang, Điện Biên Phủ.',
        keyPoint: 'Thủy điện, khai khoáng, chè – cây ăn quả và du lịch sinh thái – văn hóa vùng cao là các thế mạnh mũi nhọn.',
        example: 'Cao nguyên Mộc Châu (Sơn La) kết hợp hiệu quả chăn nuôi bò sữa, trồng chè, mận đào với du lịch trải nghiệm.'
      },
      {
        heading: 'Thách thức và hướng phát triển bền vững',
        body: 'Địa hình dốc gây khó khăn cho giao thông liên tỉnh và tiềm ẩn lũ quét, sạt lở đất, rét đậm rét hại. Vùng đang đẩy mạnh phát triển đường cao tốc kết nối vùng Thủ đô và cửa khẩu quốc tế, giữ vững rừng phòng hộ đầu nguồn, nâng cao thu nhập và đời sống cho đồng bào các dân tộc.',
        keyPoint: 'Hoàn thiện hạ tầng giao thông, bảo vệ rừng đầu nguồn và phòng chống thiên tai là ưu tiên phát triển của vùng.',
        example: 'Các tuyến cao tốc Nội Bài – Lào Cai, Hà Nội – Thái Nguyên – Bắc Kạn rút ngắn đáng kể thời gian vận chuyển hàng hóa.'
      }
    ]
  },
  {
    id: 'g9-geography-13',
    grade: 9,
    strand: 'geography',
    title: 'Vùng Đồng bằng sông Hồng',
    summary: 'Tìm hiểu vị trí vùng Thủ đô, điều kiện tự nhiên, nguồn nhân lực trình độ cao hàng đầu cả nước, sự phát triển công nghiệp công nghệ cao, dịch vụ, nông nghiệp thâm canh và Vùng kinh tế trọng điểm Bắc Bộ.',
    objectives: [
      'Phân tích được thế mạnh về vị trí, đất phù sa, sông ngòi, bờ biển và nguồn lao động chất lượng cao của vùng.',
      'Trình bày được sự phát triển nổi bật của công nghiệp, dịch vụ, nông nghiệp thâm canh và vùng kinh tế trọng điểm Bắc Bộ.',
      'Nêu được các vấn đề về mật độ dân số cao, môi trường và hướng phát triển bền vững.'
    ],
    sections: [
      {
        heading: 'Vị trí chiến lược và nguồn lực phát triển',
        body: 'Vùng nằm ở hạ lưu sông Hồng, có Thủ đô Hà Nội là trung tâm chính trị – văn hóa – khoa học hàng đầu, phía đông giáp vịnh Bắc Bộ với cụm cảng biển Hải Phòng – Quảng Ninh. Bên cạnh đất phù sa màu mỡ và nguồn nước dồi dào, thế mạnh nổi trội nhất của vùng là dân số đông với đội ngũ lao động có trình độ chuyên môn kĩ thuật cao và hạ tầng tương đối đồng bộ.',
        keyPoint: 'Nguồn nhân lực chất lượng cao, Thủ đô Hà Nội và cửa ngõ hướng biển là lợi thế cạnh tranh lớn nhất của vùng.',
        example: 'Vùng tập trung nhiều trường đại học, viện nghiên cứu hàng đầu cả nước cung cấp nhân lực cho khu công nghiệp và dịch vụ.'
      },
      {
        heading: 'Cơ cấu kinh tế chuyển dịch nhanh theo hướng hiện đại',
        body: 'Công nghiệp và dịch vụ chiếm tỉ trọng áp đảo, nổi bật là sản xuất điện tử, cơ khí chế tạo, ô tô, logistics, tài chính – ngân hàng, du lịch di sản (Vịnh Hạ Long, Tràng An, Hoàng thành Thăng Long). Nông nghiệp phát triển trình độ thâm canh cao hàng đầu nước ta với lúa năng suất cao, rau vụ đông ưa lạnh, cây ăn quả và thủy sản ven biển.',
        keyPoint: 'Công nghiệp công nghệ cao, kinh tế biển và dịch vụ là động lực tăng trưởng của Vùng kinh tế trọng điểm Bắc Bộ.',
        example: 'Tam giác tăng trưởng Hà Nội – Hải Phòng – Quảng Ninh giữ vai trò đầu tàu phát triển kinh tế phía Bắc.'
      },
      {
        heading: 'Sức ép dân số và bảo vệ môi trường',
        body: 'Là vùng có mật độ dân số cao nhất cả nước, Đồng bằng sông Hồng đối mặt sức ép lớn về việc làm, nhà ở, ùn tắc giao thông, ô nhiễm không khí ở đô thị lớn, ô nhiễm sông ngòi và rác thải từ các làng nghề. Giải pháp trọng tâm là phát triển đô thị vệ tinh, xử lí nước thải khu công nghiệp – làng nghề và chuyển đổi giao thông xanh.',
        keyPoint: 'Kiểm soát ô nhiễm môi trường đô thị, làng nghề và phát triển giao thông công cộng là bài toán cấp thiết của vùng.',
        example: 'Quy hoạch các tuyến đường vành đai và đường sắt đô thị giúp giảm tải áp lực giao thông cho nội đô Hà Nội.'
      }
    ]
  },
  {
    id: 'g9-geography-14',
    grade: 9,
    strand: 'geography',
    title: 'Vùng Bắc Trung Bộ',
    summary: 'Tìm hiểu dải đất hẹp ngang miền Trung, sự phân hóa địa hình từ tây sang đông (núi – gò đồi – đồng bằng ven biển – biển đảo) và cơ cấu kinh tế liên hoàn nông lâm ngư kết hợp công nghiệp, du lịch.',
    objectives: [
      'Trình bày được đặc điểm vị trí cầu nối Bắc – Nam và cửa ngõ ra biển của Lào, Đông Bắc Thái Lan.',
      'Phân tích được thế mạnh hình thành cơ cấu kinh tế nông – lâm – ngư nghiệp liên hoàn từ tây sang đông.',
      'Nêu được nét chính về công nghiệp, giao thông, du lịch và thách thức thiên tai của Bắc Trung Bộ.'
    ],
    sections: [
      {
        heading: 'Vị trí cầu nối và cấu trúc địa hình tây – đông',
        body: 'Bắc Trung Bộ kéo dài hẹp ngang, đóng vai trò cầu nối giữa miền Bắc với miền Nam và là cửa ngõ ra Biển Đông qua hành lang kinh tế Đông – Tây của Lào và Đông Bắc Thái Lan. Mọi tỉnh đều có lát cắt từ tây sang đông gồm vùng núi Trường Sơn Bắc, vùng gò đồi trước núi, đồng bằng ven biển hẹp và vùng biển đảo giàu tiềm năng.',
        keyPoint: 'Cấu trúc địa hình tây – đông ở từng tỉnh tạo thuận lợi phát triển cơ cấu nông – lâm – ngư nghiệp liên hoàn.',
        example: 'Các cửa khẩu Lao Bảo, Cha Lo, Cầu Treo giúp kết nối giao thương đường bộ xuyên biên giới tới các cảng biển miền Trung.'
      },
      {
        heading: 'Nông – lâm – ngư nghiệp và công nghiệp – du lịch',
        body: 'Vùng núi và gò đồi phát triển trồng rừng phòng hộ, cây công nghiệp (cao su, hồ tiêu, cà phê, chè) và chăn nuôi gia súc lớn; dải ven biển phát triển cây công nghiệp hằng năm (lạc, mía) và nuôi trồng, đánh bắt thủy sản. Công nghiệp chú trọng vật liệu xây dựng, lọc hóa dầu (Nghi Sơn), nhiệt điện, chế biến nông lâm hải sản; du lịch nổi bật với Phong Nha – Kẻ Bàng, Cố đô Huế và biển Sầm Sơn, Cửa Lò.',
        keyPoint: 'Kinh tế vùng kết hợp bảo vệ rừng đầu nguồn phía tây, phát triển cảng biển – khu kinh tế và du lịch di sản phía đông.',
        example: 'Khu kinh tế Nghi Sơn (Thanh Hóa) và Vũng Áng (Hà Tĩnh) thúc đẩy mạnh mẽ công nghiệp nặng và cảng biển của vùng.'
      },
      {
        heading: 'Thách thức thiên tai khắc nghiệt',
        body: 'Bắc Trung Bộ thường xuyên hứng chịu bão lớn, lũ lụt đột ngột trên các sông ngắn và dốc, gió phơn Tây Nam khô nóng vào mùa hạ cùng hiện tượng cát bay, cát chảy ven biển. Do đó, trồng rừng đầu nguồn và rừng phi lao chắn cát ven biển kết hợp hệ thống hồ chứa thủy lợi giữ vai trò sống còn.',
        keyPoint: 'Phòng chống bão lũ, hạn hán và chắn cát ven biển là điều kiện tiên quyết để ổn định sản xuất và dân sinh.',
        example: 'Các dải rừng phi lao ven biển Quảng Bình, Quảng Trị giúp giữ ổn định đồng ruộng và khu dân cư trước nạn cát bay.'
      }
    ]
  },
  {
    id: 'g9-geography-15',
    grade: 9,
    strand: 'geography',
    title: 'Thực hành: Tìm hiểu vấn đề phòng, chống thiên tai và ứng phó với biến đổi khí hậu ở Bắc Trung Bộ',
    summary: 'Thực hành phân tích các loại hình thiên tai đặc trưng của Bắc Trung Bộ (bão, lũ quét, ngập lụt, gió Lào, hạn hán, sạt lở), nguyên nhân tự nhiên – nhân sinh và giải pháp phòng ngừa tổng hợp.',
    objectives: [
      'Nhận diện được các thiên tai chính theo mùa và không gian tại Bắc Trung Bộ.',
      'Phân tích được mối liên hệ giữa đặc điểm địa hình, khí hậu, độ che phủ rừng với mức độ thiệt hại thiên tai.',
      'Đề xuất được biện pháp phòng, chống trước, trong và sau thiên tai phù hợp cộng đồng.'
    ],
    sections: [
      {
        heading: 'Đặc điểm thiên tai theo mùa ở Bắc Trung Bộ',
        body: 'Do dải đất hẹp, dốc mạnh từ dãy Trường Sơn ra biển, sông ngắn chảy xiết lại đón bão tập trung vào thu – đông, Bắc Trung Bộ dễ xảy ra lũ lên rất nhanh ở miền núi và ngập úng ở vùng trũng ven biển. Mùa hạ chịu tác động của gió Tây Nam khô nóng kéo dài gây hạn hán, thiếu nước ngọt và nguy cơ cháy rừng cao.',
        keyPoint: 'Thiên tai ở Bắc Trung Bộ mang tính đối lập theo mùa: khô hạn, gió nóng mùa hạ và bão, lũ lớn vào thu – đông.',
        example: 'Mưa lớn do hoàn lưu bão trên sườn đông Trường Sơn Bắc có thể gây lũ quét và sạt lở chia cắt các huyện miền núi.'
      },
      {
        heading: 'Tác động của biến đổi khí hậu và hoạt động con người',
        body: 'Biến đổi khí hậu làm cường độ các đợt nắng nóng, mưa cực đoan và bão trái mùa trở nên khó lường hơn. Nếu rừng đầu nguồn bị suy giảm hoặc xây dựng công trình cản dòng thoát lũ tự nhiên, thiệt hại về người, hạ tầng và nông nghiệp sẽ gia tăng gấp bội.',
        keyPoint: 'Bảo vệ rừng đầu nguồn và quy hoạch thoát lũ khoa học giúp giảm rõ rệt tính dễ tổn thương trước cực đoan khí hậu.',
        example: 'Việc chặt phá rừng phòng hộ làm giảm khả năng giữ nước của đất, khiến lũ hạ lưu dâng nhanh hơn.'
      },
      {
        heading: 'Giải pháp chủ động phòng chống và thích ứng',
        body: 'Biện pháp hiệu quả kết hợp cả công trình (hồ điều tiết lũ, đê biển, nhà chống bão lũ cho người dân) và phi công trình (bảo vệ rừng đầu nguồn – rừng chắn cát, bản đồ cảnh báo sạt lở, chuyển đổi cơ cấu mùa vụ tránh lũ, tập huấn kĩ năng sơ tán cho học sinh và cộng đồng).',
        keyPoint: 'Ứng phó thiên tai hiệu quả đòi hỏi phương châm "bốn tại chỗ", cảnh báo sớm và chuyển đổi sinh kế thích ứng.',
        example: 'Nhiều vùng trũng Quảng Bình, Hà Tĩnh xây dựng nhà phao và nhà cộng đồng vượt lũ giúp bảo vệ an toàn tính mạng khi nước dâng.'
      }
    ]
  },
  {
    id: 'g9-geography-16',
    grade: 9,
    strand: 'geography',
    title: 'Vùng Duyên hải Nam Trung Bộ và Tây Nguyên',
    summary: 'Tìm hiểu hai bộ phận bổ trợ lẫn nhau: Duyên hải Nam Trung Bộ giàu tiềm năng kinh tế biển, cảng nước sâu, năng lượng tái tạo và Tây Nguyên giàu đất đỏ badan, cây công nghiệp, lâm nghiệp và thủy điện.',
    objectives: [
      'Nêu được thế mạnh đặc trưng về biển đảo, cảng nước sâu, năng lượng tái tạo của Duyên hải Nam Trung Bộ.',
      'Trình bày được thế mạnh đất badan, cây công nghiệp lâu năm, lâm nghiệp và thủy điện của Tây Nguyên.',
      'Phân tích được sự gắn kết hỗ trợ phát triển kinh tế giữa vùng cao nguyên và vùng duyên hải.'
    ],
    sections: [
      {
        heading: 'Duyên hải Nam Trung Bộ: kinh tế biển và năng lượng tái tạo',
        body: 'Duyên hải Nam Trung Bộ có nhiều vũng, vịnh nước sâu thuận lợi xây dựng cảng biển lớn (Đà Nẵng, Dung Quất, Quy Nhơn, Vân Phong, Cam Ranh), bãi biển đẹp cho du lịch nghỉ dưỡng (Đà Nẵng, Hội An, Nha Trang, Mũi Né) và hai quần đảo Hoàng Sa, Trường Sa có vị trí chiến lược. Nơi đây còn dẫn đầu cả nước về phát triển điện gió và điện mặt trời (Ninh Thuận, Bình Thuận).',
        keyPoint: 'Cảng nước sâu, du lịch biển, thủy sản và năng lượng tái tạo là những mũi nhọn kinh tế của Duyên hải Nam Trung Bộ.',
        example: 'Vịnh Vân Phong và cảng Đà Nẵng đóng vai trò cửa ngõ hàng hải quan trọng của miền Trung và Tây Nguyên.'
      },
      {
        heading: 'Tây Nguyên: đất badan, cây công nghiệp và thủy điện',
        body: 'Tây Nguyên là vùng duy nhất không giáp biển, gồm các cao nguyên xếp tầng giàu đất đỏ badan phì nhiêu rất thích hợp chuyên canh cà phê, hồ tiêu, cao su, điều, chè và cây ăn quả. Vùng còn có trữ năng thủy điện lớn trên hệ thống sông Xê Xan, Xrê Pôk, Đồng Nai, trữ lượng bô-xít lớn cùng Không gian văn hóa Cồng chiêng đặc sắc.',
        keyPoint: 'Tây Nguyên là vùng chuyên canh cây công nghiệp lâu năm lớn hàng đầu và có giá trị sinh thái – văn hóa độc đáo.',
        example: 'Đắk Lắk, Gia Lai và Lâm Đồng cung cấp phần lớn sản lượng cà phê và hoa, rau ôn đới cho cả nước.'
      },
      {
        heading: 'Liên kết vùng cao nguyên – duyên hải và bảo vệ môi trường',
        body: 'Đẩy mạnh các tuyến quốc lộ, cao tốc nối Tây Nguyên xuống cảng biển Duyên hải Nam Trung Bộ giúp rút ngắn chi phí xuất khẩu nông sản, khoáng sản và phát triển tuyến du lịch "biển xanh – đại ngàn". Song song đó cần bảo vệ nghiêm ngặt diện tích rừng Tây Nguyên và chống hoang mạc hóa, khô hạn ở cực Nam Trung Bộ.',
        keyPoint: 'Kết nối giao thông đông – tây và bảo vệ rừng, nguồn nước giúp cả hai tiểu vùng phát huy tối đa thế mạnh bổ sung nhau.',
        example: 'Nông sản từ Gia Lai, Đắk Lắk vận chuyển xuống cảng Quy Nhơn hoặc Nha Trang thuận lợi hơn khi đường đèo được nâng cấp.'
      }
    ]
  },
  {
    id: 'g9-geography-17',
    grade: 9,
    strand: 'geography',
    title: 'Vùng Đông Nam Bộ',
    summary: 'Tìm hiểu vùng kinh tế phát triển năng động nhất cả nước: trung tâm công nghiệp, dịch vụ, khoa học công nghệ, cảng biển quốc tế và sản xuất cây công nghiệp lâu năm hàng đầu.',
    objectives: [
      'Phân tích được các thế mạnh về vị trí, tự nhiên và nhân lực đưa Đông Nam Bộ thành vùng kinh tế phát triển nhất.',
      'Trình bày được vai trò đầu tàu của công nghiệp, dịch vụ, cây công nghiệp lâu năm và Vùng kinh tế trọng điểm phía Nam.',
      'Nêu được những thách thức về hạ tầng giao thông, ngập úng, môi trường và giải pháp phát triển bền vững.'
    ],
    sections: [
      {
        heading: 'Vùng kinh tế năng động và phát triển nhất cả nước',
        body: 'Đông Nam Bộ tiếp giáp vùng nguyên liệu rộng lớn ở Tây Nguyên và Đồng bằng sông Cửu Long, có Thành phố Hồ Chí Minh là trung tâm kinh tế – tài chính – thương mại lớn nhất Việt Nam cùng hệ thống cảng nước sâu Cái Mép – Thị Vải, sân bay Tân Sơn Nhất và Long Thành. Địa hình lượn sóng thoải, đất xám, đất badan và khí hậu cận xích đạo thuận lợi phát triển cả công nghiệp lẫn nông nghiệp hàng hóa.',
        keyPoint: 'Vị trí đầu mối giao thương, hạ tầng cảng – sân bay và nguồn nhân lực trình độ cao giúp Đông Nam Bộ dẫn đầu tăng trưởng.',
        example: 'Đông Nam Bộ đóng góp tỉ trọng lớn nhất vào GDP và ngân sách quốc gia.'
      },
      {
        heading: 'Công nghiệp – dịch vụ đầu tàu và cây công nghiệp',
        body: 'Công nghiệp vùng dẫn đầu cả nước với các ngành khai thác dầu khí ở thềm lục địa, điện lực, cơ khí – điện tử, hóa chất, chế biến thực phẩm và dệt may, tập trung dày đặc tại TP. Hồ Chí Minh, Bình Dương, Đồng Nai, Bà Rịa – Vũng Tàu. Nông nghiệp nổi bật là vùng chuyên canh cao su, điều, hồ tiêu lớn hàng đầu, gắn với công nghiệp chế biến xuất khẩu.',
        keyPoint: 'Công nghiệp công nghệ cao, dầu khí, dịch vụ tài chính – logistics và cây cao su, điều là điểm sáng kinh tế của vùng.',
        example: 'Cụm cảng nước sâu Cái Mép – Thị Vải có thể tiếp nhận tàu container trọng tải lớn đi thẳng sang châu Âu và Bắc Mỹ.'
      },
      {
        heading: 'Thách thức đô thị hóa và hướng liên kết vùng',
        body: 'Tăng trưởng nhanh và thu hút đông người nhập cư gây áp lực lên hạ tầng giao thông, nhà ở công nhân, ngập úng đô thị và ô nhiễm lưu vực sông Đồng Nai – Sài Gòn. Vùng đang đẩy nhanh xây dựng đường vành đai, cao tốc, metro, sân bay Long Thành và phát triển các khu công nghiệp xanh, công nghệ cao.',
        keyPoint: 'Đầu tư hạ tầng giao thông liên vùng, metro và kiểm soát ô nhiễm sông Đồng Nai là chìa khóa phát triển bền vững.',
        example: 'Tuyến Vành đai 3 TP. Hồ Chí Minh giúp kết nối thông suốt giữa các khu công nghiệp Bình Dương, Đồng Nai, Long An với cảng biển.'
      }
    ]
  },
  {
    id: 'g9-geography-18',
    grade: 9,
    strand: 'geography',
    title: 'Thực hành: Phân tích ý nghĩa của việc tăng cường kết nối liên vùng đối với sự phát triển của vùng Đông Nam Bộ',
    summary: 'Thực hành phân tích mối quan hệ liên kết giữa Đông Nam Bộ với Đồng bằng sông Cửu Long, Tây Nguyên và thế giới thông qua hệ thống cao tốc, đường sắt, cảng biển và sân bay quốc tế.',
    objectives: [
      'Trình bày được vai trò của kết nối giao thông, logistics và chuỗi cung ứng đối với Đông Nam Bộ.',
      'Phân tích được lợi ích hai chiều khi kết nối Đông Nam Bộ với Đồng bằng sông Cửu Long và Tây Nguyên.',
      'Nêu được ví dụ thực tế về các công trình hạ tầng liên vùng trọng điểm đang triển khai.'
    ],
    sections: [
      {
        heading: 'Vì sao Đông Nam Bộ cần tăng cường kết nối liên vùng?',
        body: 'Là trung tâm sản xuất và xuất khẩu lớn nhất cả nước nhưng Đông Nam Bộ phụ thuộc rất lớn vào nguồn nguyên liệu nông sản từ Đồng bằng sông Cửu Long, Tây Nguyên cũng như chuỗi cung ứng lao động và thị trường tiêu thụ cả nước. Khi đường bộ quá tải và tắc nghẽn, chi phí logistics tăng cao làm giảm sức cạnh tranh của doanh nghiệp.',
        keyPoint: 'Hạ tầng kết nối đồng bộ giúp giảm chi phí vận tải, mở rộng không gian phát triển công nghiệp – đô thị cho toàn miền Nam.',
        example: 'Việc ách tắc trên các tuyến quốc lộ cũ từng làm tăng đáng kể thời gian vận chuyển hàng xuất khẩu từ Bình Dương ra cảng.'
      },
      {
        heading: 'Lợi ích hai chiều với Đồng bằng sông Cửu Long và Tây Nguyên',
        body: 'Các tuyến cao tốc như TP. Hồ Chí Minh – Trung Lương – Mỹ Thuận – Cần Thơ, Biên Hòa – Vũng Tàu, Bến Lức – Long Thành và các tuyến nối Tây Nguyên giúp nông sản, thủy sản miền Tây và cà phê, trái cây Tây Nguyên đi thẳng tới cảng nước sâu Cái Mép – Thị Vải và sân bay Long Thành nhanh chóng, giảm hao hụt sau thu hoạch.',
        keyPoint: 'Kết nối liên vùng giúp vùng nguyên liệu tiêu thụ nông sản nhanh hơn, còn Đông Nam Bộ phát huy vai trò trung tâm logistics và chế biến.',
        example: 'Tuyến cao tốc Bến Lức – Long Thành giúp hàng hóa từ miền Tây đi thẳng sang cảng Cái Mép mà không phải xuyên qua nội đô TP. Hồ Chí Minh.'
      },
      {
        heading: 'Kết nối đa phương thức và chuyển đổi số logistics',
        body: 'Kết nối hiệu quả cần phối hợp hài hòa đường bộ cao tốc, đường thủy nội địa sông Sài Gòn – Đồng Nai – Tiền Giang, đường sắt kết nối cảng biển và hàng không quốc tế, kết hợp hải quan điện tử và trung tâm logistics thông minh để rút ngắn thời gian thông quan hàng hóa.',
        keyPoint: 'Phát triển vận tải đa phương thức và logistics hiện đại là nền tảng đưa Đông Nam Bộ thành trung tâm dịch vụ tầm khu vực.',
        example: 'Sà lan vận tải đường thủy kết nối các cảng sông đồng bằng với cụm cảng biển nước sâu giúp giảm tải cho đường bộ và giảm phát thải.'
      }
    ]
  },
  {
    id: 'g9-geography-19',
    grade: 9,
    strand: 'geography',
    title: 'Vùng Đồng bằng sông Cửu Long',
    summary: 'Tìm hiểu châu thổ lớn nhất cả nước: thế mạnh đất phù sa, nguồn nước và khí hậu nhiệt đới đưa vùng thành vựa lúa, thủy sản và trái cây số một Việt Nam cùng yêu cầu chuyển đổi thích ứng biến đổi khí hậu.',
    objectives: [
      'Trình bày được thế mạnh tự nhiên và vị trí địa lí của vùng Đồng bằng sông Cửu Long.',
      'Phân tích được vai trò hàng đầu cả nước về sản xuất lúa gạo, thủy sản và cây ăn quả nhiệt đới.',
      'Nêu được những thách thức lớn về xâm nhập mặn, sụt lún và hướng phát triển bền vững của vùng.'
    ],
    sections: [
      {
        heading: 'Châu thổ rộng lớn và điều kiện tự nhiên đặc thù',
        body: 'Là vùng đồng bằng châu thổ rộng nhất cả nước do sông Tiền và sông Hậu bồi đắp, có ba mặt giáp biển và mạng lưới kênh rạch dày đặc. Vùng giàu đất phù sa ngọt dọc sông lớn, bên cạnh diện tích đáng kể đất phèn và đất mặn cần cải tạo hợp lí; khí hậu cận xích đạo nắng ấm quanh năm tạo thuận lợi cho sản xuất nông nghiệp nhiệt đới.',
        keyPoint: 'Đất phù sa màu mỡ, khí hậu cận xích đạo và mạng lưới sông ngòi kênh rạch là nền tảng cho nông nghiệp và giao thông thủy.',
        example: 'Khác với Đồng bằng sông Hồng có mùa đông lạnh, miền Tây Nam Bộ nóng ẩm quanh năm rất thuận lợi trồng cây ăn quả nhiệt đới.'
      },
      {
        heading: 'Vựa lúa, thủy sản và cây ăn quả lớn nhất nước',
        body: 'Đồng bằng sông Cửu Long dẫn đầu cả nước cả về diện tích, sản lượng lúa và sản lượng gạo xuất khẩu; đồng thời chiếm tỉ trọng lớn nhất về nuôi trồng và khai thác thủy sản (cá tra, tôm nước lợ) và sản lượng trái cây nhiệt đới (xoài, sầu riêng, bưởi, thanh long, dừa). Công nghiệp chế biến lương thực – thực phẩm và điện gió, điện khí đang mở rộng mạnh mẽ.',
        keyPoint: 'Vùng giữ vai trò trụ cột bảo đảm an ninh lương thực quốc gia và xuất khẩu nông thủy sản.',
        example: 'Cần Thơ là trung tâm kinh tế, giáo dục và dịch vụ lớn nhất của vùng Đồng bằng sông Cửu Long.'
      },
      {
        heading: 'Thách thức môi trường và phát triển thuận thiên',
        body: 'Vùng chịu tác động nghiêm trọng nhất của nước biển dâng, hạn mặn mùa khô, sụt lún nền đất do khai thác nước ngầm quá mức và sạt lở bờ sông bờ biển khi lượng phù sa thượng nguồn suy giảm. Định hướng hiện nay là phát triển "thuận thiên", chuyển đổi cây trồng vật nuôi theo vùng sinh thái ngọt – lợ – mặn và đầu tư cao tốc kết nối vùng.',
        keyPoint: 'Chuyển đổi mô hình sinh kế theo ba vùng sinh thái (ngọt, lợ, mặn) giúp phát triển bền vững trước biến đổi khí hậu.',
        example: 'Nâng cấp hạ tầng giao thông cao tốc giúp nông sản miền Tây đi thẳng lên Đông Nam Bộ và ra cảng biển quốc tế.'
      }
    ]
  },
  {
    id: 'g9-geography-20',
    grade: 9,
    strand: 'geography',
    title: 'Thực hành: Tìm hiểu về tác động của biến đổi khí hậu đối với vùng Đồng bằng sông Cửu Long',
    summary: 'Thực hành đọc dữ liệu, bản đồ về mực nước biển dâng, ranh giới xâm nhập mặn, sạt lở và phân tích các mô hình thích ứng hiệu quả đang được triển khai tại Đồng bằng sông Cửu Long.',
    objectives: [
      'Trình bày được các biểu hiện chính của biến đổi khí hậu tại Đồng bằng sông Cửu Long (xâm nhập mặn, hạn hán, ngập triều cường, sạt lở).',
      'Phân tích được tác động của biến đổi khí hậu đến đất đai, nguồn nước ngọt, sản xuất nông nghiệp và đời sống cư dân.',
      'Đề xuất được những mô hình sinh kế và giải pháp thích ứng cụ thể cho từng tiểu vùng sinh thái.'
    ],
    sections: [
      {
        heading: 'Biểu hiện rõ nét của biến đổi khí hậu ở đồng bằng',
        body: 'Đồng bằng sông Cửu Long có địa hình thấp, phần lớn độ cao chỉ từ 1–2 m so với mực nước biển nên cực kì nhạy cảm với nước biển dâng. Vào mùa khô, khi dòng chảy sông Mê Công giảm, nước mặn xâm nhập sâu vào nội đồng hàng chục ki-lô-mét; vào mùa mưa kết hợp triều cường gây ngập úng đô thị và sạt lở nghiêm trọng bờ sông, bờ biển.',
        keyPoint: 'Xâm nhập mặn mùa khô, triều cường ngập úng và sạt lở là ba tác động trực tiếp nghiêm trọng nhất.',
        example: 'Các đợt hạn mặn lịch sử năm 2016 và 2020 ảnh hưởng nặng đến hàng chục nghìn héc-ta lúa và cây ăn quả ở Bến Tre, Tiền Giang, Cà Mau.'
      },
      {
        heading: 'Hệ quả đối với sinh kế và đời sống người dân',
        body: 'Thiếu nước ngọt sinh hoạt và sản xuất trong mùa khô làm giảm năng suất lúa, chết cây ăn quả, hư hỏng công trình giao thông do sạt lở và thúc đẩy làn sóng lao động trẻ di cư lên Đông Nam Bộ tìm việc làm. Nếu không kiểm soát khai thác nước ngầm quá mức, tình trạng sụt lún mặt đất càng làm tăng tốc độ ngập lụt.',
        keyPoint: 'Biến đổi khí hậu vừa gây thiệt hại nông nghiệp, thiếu nước ngọt vừa tác động đến di cư lao động nông thôn.',
        example: 'Trữ nước mưa, nước ngọt trong ao hồ phân tán giúp người dân vùng ven biển chủ động nước sinh hoạt trong tháng cao điểm mặn.'
      },
      {
        heading: 'Giải pháp thích ứng "thuận thiên" và công nghệ',
        body: 'Giải pháp trọng tâm là quy hoạch lại sản xuất theo ba vùng ngọt – lợ – mặn: mở rộng mô hình lúa – tôm, tôm – rừng ở vùng ven biển, chọn giống lúa và cây ăn quả chịu mặn, lắp đặt trạm đo độ mặn tự động cảnh báo sớm để đóng mở cống hợp lí và trồng rừng ngập mặn bảo vệ đê biển.',
        keyPoint: 'Chủ động sống chung và điều chỉnh sản xuất thích ứng theo độ mặn, nguồn nước mang lại hiệu quả bền vững lâu dài.',
        example: 'Theo dõi ứng dụng cảnh báo độ mặn giúp nhà vườn kịp thời đóng cống ngăn mặn trước khi tưới tiêu.'
      }
    ]
  },
  {
    id: 'g9-geography-21',
    grade: 9,
    strand: 'geography',
    title: 'Phát triển tổng hợp kinh tế và bảo vệ tài nguyên, môi trường biển đảo',
    summary: 'Tìm hiểu tiềm năng và hiện trạng bốn ngành kinh tế biển tổng hợp (giao thông biển, du lịch biển đảo, khai thác nuôi trồng hải sản, khai thác khoáng sản – năng lượng biển) gắn với bảo vệ chủ quyền.',
    objectives: [
      'Trình bày được ý nghĩa chiến lược của biển, các đảo và hai quần đảo Hoàng Sa, Trường Sa đối với Việt Nam.',
      'Phân tích được tiềm năng và sự phát triển của bốn ngành kinh tế biển tổng hợp.',
      'Nêu được các nguyên nhân gây ô nhiễm môi trường biển và giải pháp bảo vệ tài nguyên, chủ quyền biển đảo.'
    ],
    sections: [
      {
        heading: 'Tiềm năng phát triển tổng hợp kinh tế biển đảo',
        body: 'Việt Nam có vùng biển rộng lớn, đường bờ biển dài 3.260 km cùng hàng nghìn đảo ven bờ và hai quần đảo Hoàng Sa, Trường Sa, nằm trên tuyến hàng hải quốc tế nhộn nhịp. Phát triển tổng hợp nghĩa là phối hợp hài hòa bốn ngành trụ cột: giao thông vận tải biển, du lịch biển đảo, khai thác nuôi trồng hải sản và khai thác khoáng sản – năng lượng biển (dầu khí, điện gió ngoài khơi) để không gây xung đột lẫn nhau.',
        keyPoint: 'Kinh tế biển tổng hợp đòi hỏi kết nối hài hòa giao thông biển, du lịch, thủy sản và khoáng sản – năng lượng biển.',
        example: 'Quy hoạch phân vùng không gian biển tránh để khu vực khai thác khoáng sản hay cảng dầu làm ô nhiễm bãi tắm du lịch và vùng nuôi thủy sản.'
      },
      {
        heading: 'Hiện trạng các ngành kinh tế biển chủ lực',
        body: 'Hệ thống cảng biển nước sâu được hiện đại hóa phục vụ xuất nhập khẩu; du lịch biển đảo thu hút phần lớn lượng khách du lịch cả nước; nghề cá chuyển dịch mạnh sang đánh bắt xa bờ; ngành dầu khí ở thềm lục địa phía nam kết hợp điện gió ven bờ – ngoài khơi mở ra nguồn năng lượng sạch mới cho nền kinh tế.',
        keyPoint: 'Các ngành kinh tế biển đóng góp ngày càng lớn vào tăng trưởng kinh tế và tạo sinh kế cho cộng đồng ven biển.',
        example: 'Phú Quốc, Côn Đảo, Lý Sơn và Cát Bà là những huyện đảo phát triển mạnh du lịch sinh thái gắn với dịch vụ hậu cần nghề cá.'
      },
      {
        heading: 'Bảo vệ môi trường biển đảo gắn với giữ vững chủ quyền',
        body: 'Môi trường biển đang chịu sức ép từ rác thải nhựa, nước thải đô thị và khu công nghiệp từ đất liền đổ ra, nguy cơ tràn dầu và suy giảm rạn san hô, rừng ngập mặn. Cần xử lí rác thải nhựa đại dương, phục hồi sinh cảnh biển, phát triển kinh tế dân sinh trên các đảo và giữ vững môi trường hòa bình, bảo vệ vững chắc chủ quyền, quyền chủ quyền biển đảo Việt Nam.',
        keyPoint: 'Phát triển kinh tế biển bền vững luôn đi đôi với bảo vệ hệ sinh thái biển và bảo vệ chủ quyền quốc gia.',
        example: 'Giảm túi ni-lông dùng một lần tại các khu du lịch biển đảo giúp bảo vệ rạn san hô và sinh vật biển.'
      }
    ]
  },

  // ======================== GRADE 9 INTEGRATED (2) ========================
  {
    id: 'g9-integrated-1',
    grade: 9,
    strand: 'integrated',
    title: 'Đô thị: Lịch sử và hiện tại',
    summary: 'Tìm hiểu tiến trình hình thành các đô thị tiêu biểu ở Việt Nam và thế giới từ cổ – trung đại đến hiện đại; phân tích xu hướng đô thị hóa hiện nay và bài toán xây dựng đô thị thông minh, bền vững.',
    objectives: [
      'Trình bày được lịch sử hình thành và biến đổi chức năng của một số đô thị lớn ở Việt Nam qua các thời kì.',
      'Phân tích được tác động kinh tế – xã hội và áp lực môi trường của quá trình đô thị hóa hiện đại.',
      'Đề xuất được các tiêu chí và giải pháp hướng tới xây dựng đô thị xanh, thông minh và giàu bản sắc.'
    ],
    sections: [
      {
        heading: 'Tiến trình hình thành các đô thị tiêu biểu ở Việt Nam',
        body: 'Từ kinh thành Cổ Loa, Thăng Long (Hà Nội) đến thương cảng Phố Hiến, Hội An và Sài Gòn – Gia Định, các đô thị Việt Nam thường ra đời tại đầu mối đường thủy thuận lợi giao thương hoặc trung tâm chính trị – hành chính. Trong thời kì cận – hiện đại, mạng lưới đô thị mở rộng nhanh với chức năng công nghiệp, cảng biển, thương mại và dịch vụ đa dạng.',
        keyPoint: 'Đô thị Việt Nam phát triển từ các trung tâm hành chính, thương cảng truyền thống thành cực tăng trưởng công nghiệp – dịch vụ hiện đại.',
        example: 'Thăng Long – Hà Nội vừa là trung tâm chính trị lâu đời từ năm 1010 vừa là vùng đất Kẻ Chợ buôn bán sầm uất.'
      },
      {
        heading: 'Đô thị hóa hiện đại: động lực và thách thức',
        body: 'Đô thị đóng góp tỉ trọng lớn trong GDP nhờ tập trung lao động chất lượng cao, doanh nghiệp sáng tạo, trường học, bệnh viện và hạ tầng viễn thông. Tuy nhiên, tốc độ đô thị hóa nhanh kéo theo ùn tắc giao thông, ngập úng khi mưa lớn, thiếu không gian xanh công cộng, ô nhiễm không khí và áp lực nhà ở cho người lao động.',
        keyPoint: 'Đô thị tạo động lực đổi mới sáng tạo nhưng đòi hỏi quy hoạch hạ tầng đi trước để giảm ùn tắc, ngập úng và ô nhiễm.',
        example: 'Hiện tượng "đảo nhiệt đô thị" khiến nhiệt độ khu vực bê tông dày đặc cao hơn vùng cây xanh ngoại thành.'
      },
      {
        heading: 'Hướng tới đô thị xanh, thông minh và bảo tồn di sản',
        body: 'Đô thị tương lai cần kết hợp giao thông công cộng ít phát thải, công viên cây xanh – mặt nước điều hòa khí hậu, quản lí năng lượng và rác thải bằng công nghệ số, đồng thời bảo tồn các khu phố cổ, di tích lịch sử như một phần bản sắc văn hóa sống động của thành phố.',
        keyPoint: 'Phát triển đô thị bền vững phải hài hòa giữa tiện ích thông minh, môi trường xanh và bảo tồn giá trị lịch sử.',
        example: 'Các tuyến phố đi bộ quanh hồ Hoàn Kiếm hay phố cổ Hội An vừa bảo tồn di sản vừa tạo không gian sinh hoạt văn hóa cho cộng đồng.'
      }
    ]
  },
  {
    id: 'g9-integrated-2',
    grade: 9,
    strand: 'integrated',
    title: 'Văn minh châu thổ sông Hồng và sông Cửu Long',
    summary: 'Tổng hợp tiến trình chinh phục, khai khẩn và thích ứng môi trường của cư dân Việt Nam tại hai vùng châu thổ lớn, từ trị thủy đắp đê truyền thống đến tái cơ cấu kinh tế – xã hội bền vững thế kỉ XXI.',
    objectives: [
      'So sánh được quá trình lịch sử khai phá và tổ chức không gian cư trú giữa châu thổ sông Hồng và sông Cửu Long.',
      'Phân tích được những giá trị văn hóa vật thể và phi vật thể tiêu biểu gắn với nền văn minh lúa nước ở hai châu thổ.',
      'Đề xuất được hành động góp phần giữ gìn di sản văn hóa châu thổ và sử dụng bền vững tài nguyên nước.'
    ],
    sections: [
      {
        heading: 'Lịch sử khai khẩn và dấu ấn thích ứng tự nhiên',
        body: 'Cư dân đồng bằng Bắc Bộ từ thời Lý – Trần – Lê đã huy động sức cộng đồng đắp hệ thống đê điều đồ sộ dọc sông Hồng để bảo vệ mùa màng và làng mạc. Ngược lại, trong quá trình khai phá miền Tây Nam Bộ từ thế kỉ XVII–XIX, cư dân đào hàng nghìn ki-lô-mét kênh rạch vừa tiêu chua, rửa phèn vừa mở đường giao thông thủy và thích ứng "sống chung với lũ".',
        keyPoint: 'Trị thủy bằng đê điều ở sông Hồng và đào kênh rạch thích ứng mùa nước nổi ở sông Cửu Long thể hiện bản lĩnh sáng tạo của cư dân.',
        example: 'Hệ thống kênh Thoại Hà, Vĩnh Tế đào đầu thế kỉ XIX vừa phục vụ giao thông, thủy lợi vừa góp phần ổn định cư dân vùng biên giới Tây Nam.'
      },
      {
        heading: 'Di sản văn hóa đặc sắc của văn minh lúa nước',
        body: 'Nền văn minh châu thổ kết tinh trong cấu trúc làng xã truyền thống với đình làng, lễ hội nông nghiệp, múa rối nước, hát Quan họ ở Bắc Bộ và đờn ca tài tử, chợ nổi trên sông, lễ hội Ok Om Bok ở Nam Bộ. Dòng chảy lịch sử tạo nên tính cách cần cù, trọng cộng đồng ở Bắc Bộ và phóng khoáng, cởi mở ở Nam Bộ.',
        keyPoint: 'Di sản văn hóa vật thể và phi vật thể hai châu thổ phản ánh sinh động mối gắn bó giữa con người với dòng sông và đồng ruộng.',
        example: 'Nghệ thuật Đờn ca tài tử Nam Bộ và Dân ca Quan họ Bắc Ninh đều được UNESCO ghi danh là Di sản văn hóa phi vật thể đại diện của nhân loại.'
      },
      {
        heading: 'Bảo tồn di sản gắn với chuyển đổi xanh thế kỉ XXI',
        body: 'Trong bối cảnh công nghiệp hóa và biến đổi khí hậu, hai châu thổ vừa phải bảo vệ không gian di sản, nguồn nước sạch trước chất thải công nghiệp – nông nghiệp, vừa phát triển kinh tế nông nghiệp xanh, du lịch văn hóa – sinh thái bền vững để tiếp nối sức sống lâu dài của nền văn minh châu thổ.',
        keyPoint: 'Gìn giữ nguồn nước sạch, phát triển nông nghiệp xanh và du lịch di sản giúp bảo tồn sức sống văn minh châu thổ cho thế hệ sau.',
        example: 'Du lịch trải nghiệm làng cổ Đường Lâm (Hà Nội) và chợ nổi Cái Răng (Cần Thơ) góp phần tạo thu nhập gắn với bảo tồn văn hóa.'
      }
    ]
  }
];

export const historyGeographyGrade9LessonDrafts: HGLessonDraft[] = COMPACT_LESSONS.map((item) => ({
  id: item.id,
  grade: item.grade,
  strand: item.strand,
  title: item.title,
  summary: item.summary,
  learningObjectives: item.objectives,
  sections: item.sections.map((sec) => ({
    heading: sec.heading,
    body: sec.body,
    keyPoints: [sec.keyPoint],
    example: sec.example
  })),
  questions: [],
  status: 'draft'
}));
