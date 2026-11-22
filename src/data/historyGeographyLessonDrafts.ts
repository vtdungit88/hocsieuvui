/**
 * Học Siêu Vui — Draft lesson pack: Lịch sử và Địa lí lớp 6–9.
 * Nội dung khởi đầu để biên tập/đối chiếu; chưa phải ngân hàng đủ 15 câu/bài,
 * chưa tích hợp catalog/game runtime, chưa được publish.
 */
export type HGLessonQuestion = {
  id: string;
  level: 'basic' | 'application' | 'challenge';
  prompt: string;
  options: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
  explanation: string;
};

export type HGLessonDraft = {
  id: string;
  grade: 6 | 7 | 8 | 9;
  strand: 'history' | 'geography';
  title: string;
  summary: string;
  learningObjectives: string[];
  questions: HGLessonQuestion[];
  status: 'draft';
};

export const historyGeographyLessonDrafts: HGLessonDraft[] = [
  {
    id: 'hg6-history-time-sources',
    grade: 6,
    strand: 'history',
    title: 'Lịch sử, tư liệu và dòng thời gian',
    summary: 'Lịch sử tìm hiểu những gì đã diễn ra trong quá khứ. Tư liệu lịch sử giúp con người nhận biết và giải thích quá khứ; có thể là hiện vật, chữ viết, truyền miệng hoặc hình ảnh. Dòng thời gian sắp xếp sự kiện theo thứ tự trước–sau.',
    learningObjectives: ['Phân biệt quá khứ và hiện tại.', 'Nhận biết một số loại tư liệu lịch sử.', 'Đọc thứ tự sự kiện trên dòng thời gian.'],
    questions: [
      { id: 'q1', level: 'basic', prompt: 'Đâu là một tư liệu lịch sử?', options: ['Một chiếc điện thoại mới chưa từng được sử dụng', 'Một chiếc trống đồng được khai quật', 'Một dự đoán về tương lai', 'Một phép tính vừa làm'], answer: 1, explanation: 'Trống đồng được lưu lại từ quá khứ là hiện vật có thể cung cấp thông tin lịch sử.' },
      { id: 'q2', level: 'application', prompt: 'Hai sự kiện A xảy ra năm 1000, B xảy ra năm 1200. Sự kiện nào diễn ra trước?', options: ['A', 'B', 'Hai sự kiện cùng lúc', 'Không thể biết'], answer: 0, explanation: '1000 nhỏ hơn 1200, nên A diễn ra trước B.' },
      { id: 'q3', level: 'challenge', prompt: 'Khi hai tư liệu kể khác nhau về cùng một sự kiện, cách làm phù hợp nhất là gì?', options: ['Chọn tư liệu dài hơn', 'Tin ngay tư liệu mới nhất', 'Đối chiếu nhiều nguồn và xem xét bối cảnh', 'Bỏ qua mọi tư liệu'], answer: 2, explanation: 'Đối chiếu nguồn, bối cảnh và độ tin cậy giúp đánh giá thông tin lịch sử thận trọng hơn.' },
    ],
    status: 'draft',
  },
  {
    id: 'hg6-geography-map',
    grade: 6,
    strand: 'geography',
    title: 'Bản đồ, phương hướng và tỉ lệ',
    summary: 'Bản đồ thể hiện một phần bề mặt Trái Đất trên mặt phẳng theo quy ước. Muốn đọc bản đồ cần xem tên, chú giải, phương hướng và tỉ lệ. Tỉ lệ 1:100 000 nghĩa là 1 cm trên bản đồ ứng với 100 000 cm ngoài thực địa (1 km).',
    learningObjectives: ['Sử dụng chú giải bản đồ.', 'Xác định phương hướng cơ bản.', 'Tính khoảng cách thực tế đơn giản từ tỉ lệ.'],
    questions: [
      { id: 'q1', level: 'basic', prompt: 'Tỉ lệ bản đồ 1:100 000. 1 cm trên bản đồ tương ứng bao nhiêu ngoài thực tế?', options: ['100 m', '1 km', '10 km', '100 km'], answer: 1, explanation: '100 000 cm = 1 000 m = 1 km.' },
      { id: 'q2', level: 'application', prompt: 'Hai điểm cách nhau 3 cm trên bản đồ tỉ lệ 1:100 000. Khoảng cách thực tế là bao nhiêu?', options: ['300 m', '1 km', '3 km', '30 km'], answer: 2, explanation: 'Mỗi cm ứng với 1 km, vậy 3 cm ứng với 3 km.' },
      { id: 'q3', level: 'challenge', prompt: 'Khi tìm kí hiệu một sân bay trên bản đồ, yếu tố nào giúp hiểu chính xác kí hiệu đó?', options: ['Màu nền bản đồ', 'Chú giải bản đồ', 'Độ dày giấy', 'Tên người vẽ'], answer: 1, explanation: 'Chú giải giải thích ý nghĩa các kí hiệu được dùng trên bản đồ.' },
    ],
    status: 'draft',
  },
  {
    id: 'hg7-history-explorations',
    grade: 7,
    strand: 'history',
    title: 'Khởi nghĩa Lam Sơn và khôi phục độc lập',
    summary: 'Khởi nghĩa Lam Sơn (1418–1427) do Lê Lợi lãnh đạo chống ách đô hộ nhà Minh. Từ căn cứ ban đầu ở Thanh Hóa, nghĩa quân từng bước xây dựng lực lượng, chuyển sang thế chủ động và giành thắng lợi, mở đường khôi phục nền độc lập. Năm 1428, Lê Lợi lên ngôi, lập triều Lê sơ.',
    learningObjectives: ['Nêu được mốc khởi đầu và kết thúc chính của khởi nghĩa Lam Sơn.', 'Nhận biết vai trò của Lê Lợi, Nguyễn Trãi và một số chiến thắng tiêu biểu.', 'Phân biệt năm kết thúc chiến tranh (1427) với năm Lê Lợi lên ngôi (1428).'],
    questions: [
      { id: 'q1', level: 'basic', prompt: 'Khởi nghĩa Lam Sơn bắt đầu năm nào?', options: ['1407', '1418', '1427', '1431'], answer: 1, explanation: 'Khởi nghĩa Lam Sơn bắt đầu năm 1418.' },
      { id: 'q2', level: 'application', prompt: 'Chiến thắng Chi Lăng–Xương Giang năm 1427 có ý nghĩa gì?', options: ['Mở đầu thời Bắc thuộc', 'Chấm dứt nhà Trần', 'Đánh tan viện binh Minh, góp phần quyết định kết thúc chiến tranh', 'Mở đầu cuộc phát kiến địa lí'], answer: 2, explanation: 'Chiến thắng Chi Lăng–Xương Giang góp phần quyết định làm thất bại viện binh Minh và kết thúc chiến tranh.' },
      { id: 'q3', level: 'challenge', prompt: 'Lê Lợi lên ngôi vua, mở đầu triều Lê sơ, vào năm nào?', options: ['1428', '1400', '1471', '1527'], answer: 0, explanation: 'Năm 1427 chiến tranh kết thúc; năm 1428 Lê Lợi lên ngôi và lập triều Lê sơ.' },
    ],
    status: 'draft',
  },
  {
    id: 'hg7-geography-continents',
    grade: 7,
    strand: 'geography',
    title: 'Đọc bản đồ và so sánh các châu lục',
    summary: 'Các châu lục có sự khác biệt về vị trí, diện tích, địa hình, khí hậu, dân cư và hoạt động kinh tế. Bản đồ, biểu đồ và số liệu giúp so sánh; cần chú ý đơn vị, thời điểm thống kê và phạm vi lãnh thổ.',
    learningObjectives: ['Xác định châu lục trên bản đồ thế giới.', 'So sánh thông tin địa lí theo tiêu chí.', 'Đọc số liệu và nêu nhận xét có căn cứ.'],
    questions: [
      { id: 'q1', level: 'basic', prompt: 'Công cụ phù hợp nhất để xác định vị trí các châu lục là gì?', options: ['Bản đồ thế giới', 'Lịch học', 'Sơ đồ mạch điện', 'Bảng chữ cái'], answer: 0, explanation: 'Bản đồ thế giới thể hiện vị trí và phạm vi các châu lục.' },
      { id: 'q2', level: 'application', prompt: 'Khi so sánh dân số hai châu lục từ bảng số liệu, điều gì cần kiểm tra trước?', options: ['Màu bảng', 'Đơn vị và năm thống kê', 'Tên tác giả bảng', 'Cỡ chữ'], answer: 1, explanation: 'Cần bảo đảm số liệu cùng đơn vị và thời điểm hoặc lưu ý khác biệt khi so sánh.' },
      { id: 'q3', level: 'challenge', prompt: 'Một châu lục có diện tích lớn nhưng dân số thấp hơn châu lục khác. Kết luận nào đúng?', options: ['Chắc chắn mật độ dân số cao hơn', 'Diện tích quyết định hoàn toàn dân số', 'Cần tính mật độ và xét điều kiện tự nhiên, lịch sử cư trú', 'Không thể dùng số liệu dân số'], answer: 2, explanation: 'Mật độ là dân số chia diện tích; phân bố dân cư còn chịu nhiều yếu tố tác động.' },
    ],
    status: 'draft',
  },
  {
    id: 'hg8-history-industrial',
    grade: 8,
    strand: 'history',
    title: 'Cách mạng công nghiệp và xã hội',
    summary: 'Cách mạng công nghiệp bắt đầu ở Anh vào cuối thế kỉ XVIII, với cơ giới hóa và những thay đổi trong sản xuất. Quá trình này thúc đẩy năng suất, đô thị hóa và hình thành các tầng lớp xã hội mới, đồng thời tạo ra vấn đề về lao động và môi trường.',
    learningObjectives: ['Nêu một số đặc điểm cơ bản của cách mạng công nghiệp.', 'Giải thích tác động tới sản xuất và đời sống.', 'Nhận biết cả thành tựu và hệ quả xã hội.'],
    questions: [
      { id: 'q1', level: 'basic', prompt: 'Cách mạng công nghiệp lần thứ nhất khởi đầu ở quốc gia nào?', options: ['Anh', 'Brazil', 'Nhật Bản', 'Ai Cập'], answer: 0, explanation: 'Cách mạng công nghiệp lần thứ nhất khởi đầu ở Anh vào cuối thế kỉ XVIII.' },
      { id: 'q2', level: 'application', prompt: 'Cơ giới hóa sản xuất có thể dẫn tới thay đổi nào?', options: ['Không còn sản xuất hàng hóa', 'Tăng năng suất và thúc đẩy đô thị hóa', 'Mọi người rời khỏi thành phố', 'Chấm dứt giao thông'], answer: 1, explanation: 'Máy móc giúp tăng sản lượng và góp phần làm phát triển nhà máy, đô thị.' },
      { id: 'q3', level: 'challenge', prompt: 'Vì sao cần xem xét cả tác động xã hội khi học về công nghiệp hóa?', options: ['Vì công nghệ không liên quan con người', 'Vì chỉ có tác động tích cực', 'Vì công nghiệp hóa tạo cơ hội nhưng cũng có vấn đề lao động, môi trường', 'Vì không thể đo năng suất'], answer: 2, explanation: 'Lịch sử công nghiệp hóa gồm cả tiến bộ sản xuất lẫn các thách thức xã hội và môi trường.' },
    ],
    status: 'draft',
  },
  {
    id: 'hg8-geography-vietnam',
    grade: 8,
    strand: 'geography',
    title: 'Khí hậu Việt Nam và tác động đến đời sống',
    summary: 'Khí hậu Việt Nam mang tính nhiệt đới gió mùa, có sự khác biệt theo mùa, vĩ độ, độ cao và địa hình. Mưa, bão, hạn và các đợt rét có ảnh hưởng đến sản xuất, sinh hoạt; hiểu đặc điểm khí hậu hỗ trợ chủ động thích ứng.',
    learningObjectives: ['Nhận biết đặc điểm khí hậu nhiệt đới gió mùa.', 'Giải thích sự phân hóa khí hậu theo vùng.', 'Liên hệ khí hậu với sản xuất và phòng tránh thiên tai.'],
    questions: [
      { id: 'q1', level: 'basic', prompt: 'Đặc điểm nổi bật của khí hậu Việt Nam là gì?', options: ['Nhiệt đới gió mùa', 'Cực địa quanh năm', 'Khô lạnh toàn quốc', 'Không có mùa mưa'], answer: 0, explanation: 'Việt Nam có khí hậu nhiệt đới gió mùa, phân hóa theo vùng và mùa.' },
      { id: 'q2', level: 'application', prompt: 'Vì sao cùng một thời điểm, vùng núi cao có thể mát hơn vùng thấp?', options: ['Do độ cao địa hình ảnh hưởng nhiệt độ', 'Do bản đồ làm sai', 'Vì vùng thấp không có không khí', 'Do kinh độ luôn quyết định nhiệt độ'], answer: 0, explanation: 'Nhiệt độ thường giảm theo độ cao, tạo khác biệt khí hậu giữa vùng cao và vùng thấp.' },
      { id: 'q3', level: 'challenge', prompt: 'Một địa phương dự báo mưa lớn kéo dài. Giải pháp địa lí thích hợp là gì?', options: ['Bỏ qua cảnh báo', 'Chuẩn bị phương án phòng ngập, sạt lở theo khuyến cáo địa phương', 'Chỉ quan sát nhiệt độ', 'Tăng xây dựng ở lòng sông'], answer: 1, explanation: 'Dựa vào điều kiện địa hình và dự báo, cần chủ động phòng ngừa rủi ro phù hợp hướng dẫn.' },
    ],
    status: 'draft',
  },
  {
    id: 'hg9-history-doimoi',
    grade: 9,
    strand: 'history',
    title: 'Việt Nam trong thời kì Đổi mới',
    summary: 'Từ năm 1986, Việt Nam thực hiện công cuộc Đổi mới, từng bước chuyển đổi cách thức quản lí kinh tế, mở rộng sản xuất, trao đổi và hội nhập. Quá trình này tạo nhiều thay đổi về kinh tế, xã hội và đời sống, đồng thời đặt ra những thách thức mới.',
    learningObjectives: ['Nêu mốc khởi đầu Đổi mới năm 1986.', 'Nhận biết một số chuyển biến kinh tế-xã hội.', 'Biết đánh giá thành tựu và thách thức bằng dẫn chứng.'],
    questions: [
      { id: 'q1', level: 'basic', prompt: 'Đại hội VI của Đảng năm 1986 gắn với chủ trương nào?', options: ['Công cuộc Đổi mới', 'Đóng cửa hoàn toàn nền kinh tế', 'Xóa bỏ giáo dục', 'Ngừng trao đổi hàng hóa'], answer: 0, explanation: 'Đại hội VI năm 1986 đánh dấu việc đề ra đường lối Đổi mới.' },
      { id: 'q2', level: 'application', prompt: 'Một biểu hiện của hội nhập kinh tế là gì?', options: ['Không giao thương quốc tế', 'Mở rộng trao đổi, hợp tác với các nước', 'Ngừng xuất nhập khẩu', 'Chỉ sản xuất trong từng hộ gia đình'], answer: 1, explanation: 'Hội nhập thể hiện qua mở rộng quan hệ kinh tế, thương mại và hợp tác quốc tế.' },
      { id: 'q3', level: 'challenge', prompt: 'Khi đánh giá kết quả Đổi mới, cách nào có cơ sở nhất?', options: ['Chỉ nêu ý kiến cảm tính', 'Chọn một số liệu không rõ nguồn', 'Dựa trên nhiều chỉ tiêu, mốc thời gian và nguồn đáng tin cậy', 'Không cần so sánh'], answer: 2, explanation: 'Đánh giá lịch sử cần dẫn chứng có nguồn, nhiều chỉ tiêu và đặt trong bối cảnh thời gian.' },
    ],
    status: 'draft',
  },
  {
    id: 'hg9-geography-economy',
    grade: 9,
    strand: 'geography',
    title: 'Phân tích bảng số liệu và biểu đồ kinh tế',
    summary: 'Bảng số liệu và biểu đồ giúp nhận xét quy mô, cơ cấu, tốc độ thay đổi và sự phân bố. Trước khi kết luận, cần đọc tiêu đề, đơn vị, thời gian, kiểm tra số liệu và chọn dạng biểu đồ phù hợp với mục tiêu thể hiện.',
    learningObjectives: ['Đọc đúng tiêu đề, đơn vị và mốc thời gian.', 'Nhận xét xu hướng và cơ cấu từ số liệu.', 'Chọn cách thể hiện dữ liệu phù hợp.'],
    questions: [
      { id: 'q1', level: 'basic', prompt: 'Khi đọc biểu đồ, điều gì cần kiểm tra đầu tiên?', options: ['Tiêu đề, đơn vị và thời gian', 'Màu yêu thích', 'Kích thước màn hình', 'Tên người xem'], answer: 0, explanation: 'Tiêu đề, đơn vị và thời gian xác định dữ liệu đang thể hiện điều gì.' },
      { id: 'q2', level: 'application', prompt: 'Muốn thể hiện tỉ trọng các thành phần trong một tổng ở cùng thời điểm, biểu đồ nào thường phù hợp?', options: ['Biểu đồ tròn', 'Sơ đồ cây lịch sử', 'Bản đồ địa hình', 'Dòng thời gian'], answer: 0, explanation: 'Biểu đồ tròn thường dùng để thể hiện cơ cấu, tỉ trọng các thành phần trong một tổng.' },
      { id: 'q3', level: 'challenge', prompt: 'Hai năm có số liệu khác nhau về sản lượng. Để so sánh mức tăng tuyệt đối, cần làm gì?', options: ['Lấy số năm sau trừ số năm trước', 'Cộng hai số', 'Chia số năm trước cho diện tích bản đồ', 'Đổi đơn vị tùy ý'], answer: 0, explanation: 'Mức tăng tuyệt đối bằng giá trị kỳ sau trừ giá trị kỳ trước, giữ cùng đơn vị.' },
    ],
    status: 'draft',
  },
];
