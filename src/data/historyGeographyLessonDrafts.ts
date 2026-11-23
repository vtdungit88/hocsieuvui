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

export type HGLessonSection = { heading: string; body: string; keyPoints?: string[]; example?: string };

export type HGLessonDraft = {
  id: string;
  grade: 6 | 7 | 8 | 9;
  strand: 'history' | 'geography' | 'integrated';
  title: string;
  summary: string;
  learningObjectives: string[];
  sections?: HGLessonSection[];
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

  {
    id: 'g6-history-01',
    grade: 6,
    strand: 'history',
    title: 'Lịch sử và cuộc sống',
    summary: 'Lịch sử là những gì đã diễn ra trong quá khứ của xã hội loài người. Học lịch sử giúp mỗi người hiểu cội nguồn, nhận biết sự thay đổi của cộng đồng và rút ra kinh nghiệm cho hiện tại. Kiến thức lịch sử được xây dựng từ việc đặt câu hỏi, tìm kiếm tư liệu, đối chiếu chứng cứ và giải thích sự kiện trong bối cảnh.',
    learningObjectives: ['Nêu được lịch sử là gì và phân biệt lịch sử với cách kể lại lịch sử.', 'Giải thích được vì sao cần học lịch sử.', 'Liên hệ được một ví dụ về dấu tích quá khứ ở gia đình hoặc địa phương.'],
    questions: [],
    status: 'draft',
  },
  {
    id: 'g6-geography-01',
    grade: 6,
    strand: 'geography',
    title: 'Hệ thống kinh, vĩ tuyến. Tọa độ địa lí',
    summary: 'Kinh tuyến là những nửa đường tròn nối hai cực; vĩ tuyến là những vòng tròn song song với Xích đạo. Kinh độ cho biết khoảng cách góc về phía đông hoặc tây so với kinh tuyến gốc; vĩ độ cho biết khoảng cách góc về phía bắc hoặc nam so với Xích đạo. Tọa độ địa lí được xác định bằng cặp kinh độ và vĩ độ.',
    learningObjectives: ['Nhận biết được kinh tuyến, vĩ tuyến, kinh tuyến gốc và Xích đạo.', 'Phân biệt được kinh độ và vĩ độ.', 'Đọc và ghi được tọa độ địa lí đơn giản trên bản đồ hoặc lưới kinh vĩ tuyến.'],
    questions: [],
    status: 'draft',
  },

  {
    id: 'g6-history-02',
    grade: 6,
    strand: 'history',
    title: 'Dựa vào đâu để biết và phục dựng lại lịch sử?',
    summary: 'Con người tìm hiểu quá khứ thông qua tư liệu lịch sử. Tư liệu có thể là hiện vật, chữ viết, truyền miệng hoặc hình ảnh; mỗi loại có giá trị và giới hạn riêng. Khi phục dựng một sự kiện, cần xác định xuất xứ, thời điểm, người tạo lập, đối chiếu nhiều nguồn và đặt chứng cứ trong bối cảnh lịch sử.',
    learningObjectives: ['Phân biệt được các loại tư liệu lịch sử phổ biến.', 'Nêu được giá trị và giới hạn của từng loại tư liệu.', 'Biết lựa chọn, đối chiếu tư liệu để tìm hiểu một vấn đề lịch sử.'],
    questions: [],
    status: 'draft',
  },
  {
    id: 'g6-geography-02',
    grade: 6,
    strand: 'geography',
    title: 'Bản đồ. Một số lưới kinh vĩ tuyến. Phương hướng trên bản đồ',
    summary: 'Bản đồ là hình ảnh thu nhỏ, có chọn lọc và khái quát bề mặt Trái Đất hoặc một khu vực trên mặt phẳng theo những quy ước nhất định. Lưới kinh, vĩ tuyến giúp xác định vị trí và thể hiện bề mặt cong lên mặt phẳng; phương hướng thường được xác định theo kinh tuyến, vĩ tuyến hoặc mũi tên chỉ Bắc trên bản đồ.',
    learningObjectives: ['Nêu được khái niệm bản đồ và vai trò của lưới kinh, vĩ tuyến.', 'Nhận biết được một số cách thể hiện lưới kinh, vĩ tuyến trên bản đồ.', 'Xác định được phương hướng cơ bản dựa vào bản đồ.'],
    questions: [],
    status: 'draft',
  },

  {
    id: 'g6-history-03', grade: 6, strand: 'history',
    title: 'Thời gian trong lịch sử',
    summary: 'Thời gian lịch sử gắn với các sự kiện và quá trình diễn ra trong quá khứ. Người học cần phân biệt âm lịch, dương lịch, Công nguyên và trước Công nguyên; biết quy đổi thế kỉ, xác định khoảng cách thời gian và sắp xếp sự kiện theo trình tự.',
    learningObjectives: ['Phân biệt được một số cách tính thời gian thường dùng trong lịch sử.', 'Xác định được thế kỉ và mốc thời gian trước/sau Công nguyên.', 'Tính được khoảng cách giữa hai mốc năm và sắp xếp sự kiện theo trình tự.'],
    questions: [], status: 'draft',
  },
  {
    id: 'g6-geography-03', grade: 6, strand: 'geography',
    title: 'Tỉ lệ bản đồ. Tính khoảng cách thực tế dựa vào tỉ lệ bản đồ',
    summary: 'Tỉ lệ bản đồ cho biết mức độ thu nhỏ khoảng cách trên bản đồ so với khoảng cách ngoài thực tế. Có thể biểu hiện bằng tỉ lệ số hoặc thước tỉ lệ. Muốn tính khoảng cách thực tế, cần đo khoảng cách trên bản đồ, nhân với mẫu số tỉ lệ và đổi về đơn vị thích hợp.',
    learningObjectives: ['Giải thích được ý nghĩa của tỉ lệ bản đồ.', 'Phân biệt được tỉ lệ số và thước tỉ lệ.', 'Tính và đổi đơn vị khoảng cách thực tế từ khoảng cách đo trên bản đồ.'],
    questions: [], status: 'draft',
  },


  {
    id: 'g6-history-04', grade: 6, strand: 'history',
    title: 'Nguồn gốc loài người',
    summary: 'Các bằng chứng khảo cổ và nhân học cho thấy loài người xuất hiện trong quá trình tiến hóa lâu dài từ một nhánh vượn người cổ. Châu Phi là nơi tìm thấy những dấu tích sớm quan trọng của người cổ. Qua thời gian, con người biết đi bằng hai chân, chế tạo công cụ, sử dụng lửa, hợp tác và di cư đến nhiều khu vực. Khi tìm hiểu nguồn gốc loài người cần phân biệt các dạng người cổ và dựa vào chứng cứ khoa học.',
    learningObjectives: ['Nêu được những bằng chứng khoa học cơ bản về nguồn gốc loài người.', 'Nhận biết vai trò của châu Phi và một số bước tiến trong quá trình tiến hóa của người.', 'Giải thích được ý nghĩa của công cụ, lửa và sự hợp tác đối với đời sống người nguyên thủy.'],
    questions: [], status: 'draft',
  },
  {
    id: 'g6-geography-04', grade: 6, strand: 'geography',
    title: 'Kí hiệu và bảng chú giải bản đồ. Tìm đường trên bản đồ',
    summary: 'Kí hiệu bản đồ dùng để thể hiện các đối tượng địa lí theo quy ước. Bảng chú giải giải thích ý nghĩa của kí hiệu, màu sắc và đường nét. Khi tìm đường trên bản đồ, cần xác định điểm xuất phát, điểm đến, đọc mạng lưới đường và chú ý phương hướng, khoảng cách, tỉ lệ bản đồ.',
    learningObjectives: ['Nhận biết được vai trò của kí hiệu và bảng chú giải bản đồ.', 'Đọc được một số dạng kí hiệu thường gặp trên bản đồ.', 'Biết xác định tuyến đường phù hợp giữa hai địa điểm trên bản đồ.'],
    questions: [], status: 'draft',
  },


  {
    id: 'g6-history-05', grade: 6, strand: 'history',
    title: 'Xã hội nguyên thủy',
    summary: 'Trong thời nguyên thủy, con người sống thành cộng đồng nhỏ, dựa chủ yếu vào săn bắt, hái lượm và dần biết trồng trọt, chăn nuôi. Công cụ lao động được cải tiến từ đá ghè đẽo đến đá mài, rồi xuất hiện đồ gốm và công cụ kim loại. Tổ chức xã hội, đời sống vật chất và tinh thần thay đổi theo sự phát triển của lực lượng sản xuất.',
    learningObjectives: ['Mô tả được những nét chính về đời sống vật chất của người nguyên thủy.', 'Nhận biết sự tiến bộ của công cụ lao động và hoạt động sản xuất.', 'Giải thích được một số thay đổi trong tổ chức xã hội và đời sống tinh thần.'],
    questions: [], status: 'draft',
  },
  {
    id: 'g6-geography-05', grade: 6, strand: 'geography',
    title: 'Lược đồ trí nhớ',
    summary: 'Lược đồ trí nhớ là hình vẽ đơn giản thể hiện không gian quen thuộc dựa trên những gì người vẽ ghi nhớ. Lược đồ có thể biểu hiện vị trí tương đối, hướng đi, mốc nhận biết và mối liên hệ giữa các địa điểm. Khi vẽ cần chọn điểm mốc rõ ràng, sắp xếp hợp lí và ghi chú dễ hiểu; lược đồ trí nhớ không thay thế bản đồ đo đạc chính xác.',
    learningObjectives: ['Nêu được khái niệm và công dụng của lược đồ trí nhớ.', 'Nhận biết được vai trò của điểm mốc, phương hướng và vị trí tương đối.', 'Tạo và đọc được lược đồ đơn giản về một không gian quen thuộc.'],
    questions: [], status: 'draft',
  },


  {
    id: 'g6-history-06', grade: 6, strand: 'history',
    title: 'Sự chuyển biến và phân hóa của xã hội nguyên thủy',
    summary: 'Khi công cụ kim loại được sử dụng rộng rãi, năng suất lao động tăng, sản phẩm dư thừa xuất hiện thường xuyên hơn. Một số người có điều kiện tích lũy của cải, làm nảy sinh sự phân hóa giàu nghèo và thay đổi quan hệ cộng đồng. Quá trình này góp phần dẫn đến sự tan rã của xã hội nguyên thủy và hình thành xã hội có giai cấp, nhà nước ở một số khu vực.',
    learningObjectives: ['Nêu được tác động của công cụ kim loại và năng suất lao động đối với đời sống.', 'Giải thích được nguyên nhân xuất hiện sản phẩm dư thừa và sự phân hóa xã hội.', 'Nhận biết mối liên hệ giữa biến đổi kinh tế với sự tan rã của xã hội nguyên thủy.'],
    questions: [], status: 'draft',
  },
  {
    id: 'g6-geography-06', grade: 6, strand: 'geography',
    title: 'Trái Đất trong hệ Mặt Trời',
    summary: 'Hệ Mặt Trời gồm Mặt Trời ở trung tâm và các thiên thể chuyển động quanh nó, trong đó có tám hành tinh. Trái Đất là hành tinh thứ ba tính từ Mặt Trời, có khoảng cách và điều kiện tự nhiên thuận lợi cho sự tồn tại của nước ở thể lỏng và sự sống. Trái Đất có dạng gần hình cầu và là nơi con người sinh sống.',
    learningObjectives: ['Xác định được vị trí của Trái Đất trong hệ Mặt Trời.', 'Nêu được một số đặc điểm cơ bản của Trái Đất và hệ Mặt Trời.', 'Giải thích được ý nghĩa khái quát của vị trí Trái Đất đối với sự tồn tại sự sống.'],
    questions: [], status: 'draft',
  },


  {
    id: 'g6-history-07', grade: 6, strand: 'history',
    title: 'Ai Cập và Lưỡng Hà cổ đại',
    summary: 'Các nhà nước cổ đại Ai Cập và Lưỡng Hà hình thành ở lưu vực những con sông lớn, nơi đất đai màu mỡ thuận lợi cho nông nghiệp và thủy lợi. Cư dân xây dựng công trình kiến trúc, phát triển chữ viết, toán học và lịch pháp. Ai Cập gắn với sông Nin, kim tự tháp và chữ tượng hình; Lưỡng Hà nằm giữa hai sông Ti-grơ và Ơ-phơ-rát, nổi bật với chữ hình nêm và bộ luật Ha-mu-ra-bi.',
    learningObjectives: ['Xác định được vị trí hình thành của các nền văn minh Ai Cập và Lưỡng Hà.', 'Nêu được một số thành tựu văn hóa tiêu biểu của hai nền văn minh.', 'Giải thích được vai trò của điều kiện tự nhiên và sông lớn đối với sự hình thành nhà nước cổ đại.'],
    questions: [], status: 'draft',
  },
  {
    id: 'g6-geography-07', grade: 6, strand: 'geography',
    title: 'Chuyển động tự quay quanh trục của Trái Đất và hệ quả',
    summary: 'Trái Đất tự quay quanh một trục tưởng tượng nối hai cực, theo hướng từ tây sang đông. Một vòng quay tương ứng khoảng 24 giờ, tạo nên sự luân phiên ngày và đêm. Do các địa điểm nằm ở những kinh tuyến khác nhau, giờ địa phương khác nhau; hệ thống múi giờ được xây dựng để thuận tiện cho sinh hoạt và giao lưu.',
    learningObjectives: ['Mô tả được hướng và thời gian tự quay quanh trục của Trái Đất.', 'Giải thích được hiện tượng ngày và đêm luân phiên.', 'Nhận biết được sự khác nhau về giờ giữa các kinh tuyến và khái niệm múi giờ.'],
    questions: [], status: 'draft',
  },


  {
    id: 'g6-history-08', grade: 6, strand: 'history',
    title: 'Ấn Độ cổ đại',
    summary: 'Các nền văn minh ở lưu vực sông Ấn hình thành với những đô thị được quy hoạch như Ha-ráp-pa và Mô-hen-giô Đa-rô. Về sau, văn hóa Vê-đa phát triển; nhiều vương triều, tiêu biểu là Maurya và Gupta, góp phần định hình lịch sử Ấn Độ. Phật giáo và Kì-na giáo ra đời tại đây; cư dân Ấn Độ có đóng góp về toán học, văn học, kiến trúc và nghệ thuật.',
    learningObjectives: ['Xác định được những nét chính về điều kiện hình thành văn minh sông Ấn.', 'Nêu được một số thành tựu văn hóa và tôn giáo tiêu biểu của Ấn Độ cổ đại.', 'Nhận biết được đóng góp của các vương triều và thành tựu khoa học Ấn Độ.'],
    questions: [], status: 'draft',
  },
  {
    id: 'g6-geography-08', grade: 6, strand: 'geography',
    title: 'Chuyển động của Trái Đất quanh Mặt Trời và các hệ quả',
    summary: 'Trái Đất chuyển động quanh Mặt Trời theo quỹ đạo gần elip, hết một vòng khoảng 365 ngày 6 giờ. Trục Trái Đất nghiêng và giữ hướng gần ổn định trong quá trình chuyển động, làm thay đổi góc chiếu sáng và thời gian chiếu sáng giữa hai bán cầu. Đây là nguyên nhân chủ yếu tạo nên các mùa và sự khác biệt về độ dài ngày đêm theo mùa.',
    learningObjectives: ['Mô tả được chuyển động quanh Mặt Trời và thời gian chuyển động của Trái Đất.', 'Giải thích được nguyên nhân hình thành các mùa trong năm.', 'Nhận biết được sự thay đổi độ dài ngày đêm theo mùa và giữa hai bán cầu.'],
    questions: [], status: 'draft',
  },
  {
    id: "g6-history-09", grade: 6, strand: "history",
    title: "Trung Quốc từ thời cổ đại đến thế kỉ VII",
    summary: "Tìm hiểu các trung tâm cư trú sớm ở lưu vực Hoàng Hà và Trường Giang, quá trình thống nhất dưới nhà Tần, các triều đại từ Hán đến Tùy và một số thành tựu văn minh Trung Quốc. Bài học chú ý phân biệt mốc thời gian và vai trò của điều kiện tự nhiên.",
    learningObjectives: ["Nêu được vai trò của lưu vực Hoàng Hà và Trường Giang đối với văn minh Trung Quốc cổ đại.","Trình bày được mốc thống nhất năm 221 TCN và một số chính sách của nhà Tần.","Sắp xếp được các triều đại, thời kì chính từ nhà Hán đến nhà Tùy và nhận biết thành tựu văn minh tiêu biểu."],
    questions: [], status: 'draft',
  },
  {
    id: "g6-history-10", grade: 6, strand: "history",
    title: "Hy Lạp và La Mã cổ đại",
    summary: "Khám phá ảnh hưởng của địa hình, biển và hải cảng đến kinh tế Hy Lạp, La Mã; tìm hiểu nhà nước thành bang ở Hy Lạp và các giai đoạn chính của nhà nước La Mã. Bài học giới thiệu một số đóng góp văn hóa, khoa học, kiến trúc và luật pháp của hai nền văn minh.",
    learningObjectives: ["Giải thích được tác động của điều kiện tự nhiên và vị trí ven biển đối với hoạt động kinh tế.","Mô tả được nét chính của nhà nước thành bang Hy Lạp và các giai đoạn phát triển của La Mã.","Nêu được một số thành tựu văn hóa tiêu biểu và nhận xét ảnh hưởng của chúng."],
    questions: [], status: 'draft',
  },
  {
    id: "g6-history-11", grade: 6, strand: "history",
    title: "Các quốc gia sơ kì ở Đông Nam Á",
    summary: "Tìm hiểu cơ sở hình thành các quốc gia sơ kì ở Đông Nam Á trong những thế kỉ trước và đầu Công nguyên. Bài học kết nối nông nghiệp lúa nước, nghề thủ công, điều kiện sông ngòi - biển đảo với giao lưu thương mại và văn hóa trong khu vực.",
    learningObjectives: ["Nêu được một số điều kiện tự nhiên và kinh tế góp phần hình thành quốc gia sơ kì ở Đông Nam Á.","Kể tên được một số quốc gia sơ kì tiêu biểu, trong đó có Văn Lang - Âu Lạc, Chăm-pa và Phù Nam.","Dựa vào hiện vật và dấu tích khảo cổ để nhận biết hoạt động giao lưu thương mại của khu vực."],
    questions: [], status: 'draft',
  },
  {
    id: "g6-history-12", grade: 6, strand: "history",
    title: "Sự hình thành và bước đầu phát triển của các vương quốc phong kiến ở Đông Nam Á (từ thế kỉ VII đến thế kỉ X)",
    summary: "Khái quát sự xuất hiện của các vương quốc phong kiến ở Đông Nam Á từ thế kỉ VII đến thế kỉ X, gắn với những cộng đồng cư dân và không gian sông ngòi, đảo, eo biển. Bài học nhấn mạnh nông nghiệp, thương mại đường biển và sự tiếp biến văn hóa.",
    learningObjectives: ["Nêu được một số vương quốc phong kiến tiêu biểu hình thành ở Đông Nam Á trong thế kỉ VII–X và khu vực phân bố.","Trình bày được vai trò của nông nghiệp, thủ công nghiệp và thương mại đối với sự phát triển của các vương quốc.","Phân tích được tác động của giao lưu thương mại và văn hóa đối với khu vực."],
    questions: [], status: 'draft',
  },
  {
    id: "g6-geography-09", grade: 6, strand: "geography",
    title: "Xác định phương hướng ngoài thực tế",
    summary: "Vận dụng la bàn và các dấu hiệu định hướng quen thuộc để xác định phương hướng khi ở ngoài thực tế. Học sinh luyện cách lấy hướng Bắc làm mốc, xác định các hướng còn lại và kết hợp phương hướng với bản đồ, địa vật.",
    learningObjectives: ["Xác định được bốn hướng chính và bốn hướng phụ.","Sử dụng được la bàn theo đúng nguyên tắc đặt và đọc hướng.","Kết hợp được la bàn, bản đồ và địa vật để mô tả hướng di chuyển."],
    questions: [], status: 'draft',
  },
  {
    id: "g6-geography-10", grade: 6, strand: "geography",
    title: "Cấu tạo của Trái Đất. Các mảng kiến tạo",
    summary: "Tìm hiểu cấu tạo bên trong Trái Đất gồm vỏ, man-ti và nhân; so sánh khái quát độ dày, trạng thái và nhiệt độ của các lớp. Bài học giới thiệu các mảng kiến tạo lớn, chuyển động chậm và một số dạng tiếp xúc giữa các mảng.",
    learningObjectives: ["Trình bày được cấu tạo ba lớp của Trái Đất và đặc điểm khái quát của từng lớp.","Nhận biết được một số mảng kiến tạo lớn trên lược đồ.","Giải thích sơ bộ mối liên hệ giữa ranh giới mảng với núi, động đất và núi lửa."],
    questions: [], status: 'draft',
  },
  {
    id: "g6-geography-11", grade: 6, strand: "geography",
    title: "Quá trình nội sinh và quá trình ngoại sinh. Hiện tượng tạo núi",
    summary: "Phân biệt các quá trình diễn ra bên trong Trái Đất với các quá trình tác động trên bề mặt. Bài học làm rõ việc nội sinh có thể nâng, uốn nếp hoặc làm đứt gãy địa hình, trong khi ngoại sinh phong hóa, xâm thực, vận chuyển và bồi tụ; hai nhóm quá trình có thể diễn ra đồng thời.",
    learningObjectives: ["Phân biệt được quá trình nội sinh và quá trình ngoại sinh.","Nêu được một số biểu hiện và tác động của từng quá trình đối với địa hình.","Giải thích được tác động đồng thời của nội sinh và ngoại sinh trong quá trình hình thành, biến đổi núi."],
    questions: [], status: 'draft',
  },
  {
    id: "g6-geography-12", grade: 6, strand: "geography",
    title: "Núi lửa và động đất",
    summary: "Tìm hiểu núi lửa, động đất và mối liên hệ của chúng với hoạt động bên trong Trái Đất, đặc biệt ở ranh giới các mảng kiến tạo. Bài học nhận diện tác động hai mặt của núi lửa và ý nghĩa của theo dõi cảnh báo, tuân thủ hướng dẫn an toàn.",
    learningObjectives: ["Mô tả được hiện tượng núi lửa phun trào và động đất ở mức độ phù hợp lớp 6.","Nêu được nguyên nhân khái quát và mối liên hệ với các mảng kiến tạo.","Nhận biết được tác động và vai trò của cảnh báo, hướng dẫn ứng phó thiên tai."],
    questions: [], status: 'draft',
  },
  {
    id: "g6-history-13", grade: 6, strand: "history",
    title: "Giao lưu văn hóa ở Đông Nam Á từ đầu Công nguyên đến thế kỉ X",
    summary: "Tìm hiểu sự giao lưu văn hóa giữa cư dân Đông Nam Á với Ấn Độ và Trung Quốc từ đầu Công nguyên đến thế kỉ X. Bài học xem xét ảnh hưởng trong tín ngưỡng, tôn giáo, chữ viết, văn học, kiến trúc và điêu khắc, đồng thời nhấn mạnh sự tiếp nhận có chọn lọc của cư dân bản địa.",
    learningObjectives: ["Nêu được một số nguồn ảnh hưởng văn hóa từ Ấn Độ và Trung Quốc đến Đông Nam Á.","Nhận biết được biểu hiện giao lưu trong tín ngưỡng, tôn giáo, chữ viết, văn học, kiến trúc và điêu khắc.","Phân tích được sự tiếp biến giữa yếu tố bên ngoài và truyền thống bản địa."],
    questions: [], status: 'draft',
  },
  {
    id: "g6-history-14", grade: 6, strand: "history",
    title: "Nhà nước Văn Lang - Âu Lạc",
    summary: "Tìm hiểu sự ra đời, phạm vi và tổ chức nhà nước Văn Lang, tiếp đó là sự hình thành nước Âu Lạc. Bài học giới thiệu vai trò của sản xuất nông nghiệp, thủy lợi, nhu cầu liên kết cộng đồng và bảo vệ đất nước; đồng thời tìm hiểu đời sống vật chất, tinh thần của cư dân.",
    learningObjectives: ["Nêu được khoảng thời gian, địa bàn chủ yếu và tổ chức nhà nước Văn Lang.","Trình bày được sự ra đời của Âu Lạc dưới sự lãnh đạo của An Dương Vương.","Mô tả được một số nét đời sống vật chất, tinh thần và dấu tích tiêu biểu của cư dân Văn Lang – Âu Lạc."],
    questions: [], status: 'draft',
  },
  {
    id: "g6-history-15", grade: 6, strand: "history",
    title: "Chính sách cai trị của các triều đại phong kiến phương Bắc và sự chuyển biến của xã hội Âu Lạc",
    summary: "Khái quát các chính sách hành chính, kinh tế và văn hóa của chính quyền đô hộ phương Bắc, cùng những chuyển biến trong sản xuất và cơ cấu xã hội của cư dân Âu Lạc. Bài học phân biệt chính sách áp đặt với sức sống của phong tục, tiếng nói và truyền thống bản địa.",
    learningObjectives: ["Nêu được một số chính sách cai trị về hành chính, kinh tế và văn hóa của các triều đại phương Bắc.","Nhận biết được một số chuyển biến về nông nghiệp, thủ công nghiệp, giao thông và xã hội.","Giải thích được vì sao cư dân vẫn duy trì nhiều yếu tố văn hóa bản địa trong thời kì Bắc thuộc."],
    questions: [], status: 'draft',
  },
  {
    id: "g6-history-16", grade: 6, strand: "history",
    title: "Các cuộc khởi nghĩa tiêu biểu giành độc lập trước thế kỉ X",
    summary: "Hệ thống hóa các cuộc khởi nghĩa tiêu biểu của người Việt trong thời kì Bắc thuộc, từ Hai Bà Trưng, Bà Triệu đến Lý Bí, Mai Thúc Loan và Phùng Hưng. Bài học chú trọng mốc thời gian, nguyên nhân, kết quả và ý nghĩa đối với truyền thống đấu tranh giành quyền tự chủ.",
    learningObjectives: ["Sắp xếp được các cuộc khởi nghĩa tiêu biểu theo trình tự thời gian.","Trình bày được một số nét chính về nguyên nhân, diễn biến, kết quả của các cuộc khởi nghĩa.","Nêu được ý nghĩa lịch sử và tinh thần tự chủ được thể hiện qua các cuộc đấu tranh."],
    questions: [], status: 'draft',
  },
  {
    id: "g6-geography-13", grade: 6, strand: "geography",
    title: "Các dạng địa hình chính trên Trái Đất. Khoáng sản",
    summary: "Nhận biết đặc điểm cơ bản của núi, đồi, cao nguyên và đồng bằng; phân biệt độ cao, hình dạng và bề mặt địa hình. Bài học phân loại khoáng sản theo nhóm công dụng và hình thành ý thức sử dụng tiết kiệm tài nguyên.",
    learningObjectives: ["Phân biệt được các dạng địa hình chính dựa vào độ cao tương đối, hình dạng và đặc điểm bề mặt.","Kể tên được một số khoáng sản thuộc nhóm năng lượng, kim loại và phi kim loại.","Nêu được sự cần thiết của việc bảo vệ, khai thác và sử dụng tiết kiệm khoáng sản."],
    questions: [], status: 'draft',
  },
  {
    id: "g6-geography-14", grade: 6, strand: "geography",
    title: "Thực hành: Đọc lược đồ địa hình tỉ lệ lớn và lát cắt địa hình đơn giản",
    summary: "Luyện đọc độ cao, đường đồng mức và khoảng cao đều trên lược đồ địa hình tỉ lệ lớn. Học sinh thực hành so sánh độ dốc qua khoảng cách giữa các đường đồng mức và đọc lát cắt để nhận biết trình tự các dạng địa hình.",
    learningObjectives: ["Đọc được độ cao của một số điểm và xác định khoảng cao đều giữa các đường đồng mức.","Nhận biết được sườn dốc, sườn thoải dựa vào khoảng cách đường đồng mức.","Đọc được lát cắt địa hình đơn giản và mô tả trình tự các dạng địa hình."],
    questions: [], status: 'draft',
  },
  {
    id: "g6-geography-15", grade: 6, strand: "geography",
    title: "Lớp vỏ khí của Trái Đất. Khí áp và gió",
    summary: "Tìm hiểu thành phần không khí, các tầng khí quyển và vai trò của tầng đối lưu, tầng bình lưu. Bài học giới thiệu khí áp, sự phân bố các đai khí áp và nguyên tắc gió thổi từ nơi áp cao về nơi áp thấp.",
    learningObjectives: ["Nêu được thành phần chính của không khí và mô tả khái quát các tầng khí quyển.","Trình bày được khái niệm khí áp, biết công dụng của khí áp kế.","Giải thích được nguyên tắc hình thành gió và kể tên một số loại gió thổi thường xuyên trên Trái Đất."],
    questions: [], status: 'draft',
  },
  {
    id: "g6-geography-16", grade: 6, strand: "geography",
    title: "Nhiệt độ không khí. Mây và mưa",
    summary: "Tìm hiểu cách đo nhiệt độ và độ ẩm không khí, sự thay đổi nhiệt độ theo vĩ độ và quá trình hình thành mây, mưa. Bài học rèn kĩ năng đọc nhiệt kế, ẩm kế, tính nhiệt độ trung bình và nhận xét phân bố lượng mưa.",
    learningObjectives: ["Mô tả được sự thay đổi nhiệt độ không khí theo vĩ độ và biết cách sử dụng nhiệt kế.","Giải thích được quá trình bốc hơi, ngưng tụ hình thành mây và mưa.","Biết cách sử dụng ẩm kế, vũ kế và tính giá trị nhiệt độ trung bình từ số liệu đơn giản."],
    questions: [], status: 'draft',
  },

  {
    id: "g6-geography-21", grade: 6, strand: "geography",
    title: "Biển và đại dương",
    summary: "Bài học phân biệt biển với đại dương, tìm hiểu một số đặc điểm của nước biển và các chuyển động chính của nước biển, đại dương. Học sinh liên hệ vai trò của biển đối với khí hậu, giao thông, tài nguyên và hệ sinh thái, đồng thời nhận biết yêu cầu bảo vệ môi trường biển.",
    learningObjectives: ["Phân biệt được biển và đại dương, nêu được một số đặc điểm của nước biển.", "Mô tả được khái quát sóng, thủy triều và dòng biển.", "Trình bày được vai trò của biển và đại dương, nêu được một số việc làm bảo vệ môi trường biển."],
    sections: [
      { heading: "Biển và đại dương", body: "Đại dương là những vùng nước mặn rộng lớn bao phủ phần lớn bề mặt Trái Đất. Biển thường là bộ phận của đại dương, nằm gần lục địa hoặc được ngăn cách một phần bởi đảo và bán đảo. Nước biển có chứa muối hòa tan; độ muối thay đổi theo lượng bốc hơi, mưa, nước sông đổ vào và sự trao đổi nước.", keyPoints: ["Biển thường thuộc một đại dương và có quan hệ với lục địa", "Độ muối không giống nhau ở mọi nơi"], example: "Khi xác định một biển trên bản đồ, hãy tìm vị trí của biển so với lục địa và đại dương tiếp giáp." },
      { heading: "Sóng, thủy triều và dòng biển", body: "Sóng biển thường được tạo ra chủ yếu do gió truyền năng lượng cho mặt nước. Thủy triều là hiện tượng mực nước biển lên xuống theo chu kì, chịu tác động chủ yếu của lực hút Mặt Trăng và Mặt Trời. Dòng biển là sự chuyển động tương đối ổn định của khối nước trong đại dương; dòng biển nóng và lạnh có thể ảnh hưởng đến khí hậu ven bờ.", keyPoints: ["Gió là nguyên nhân phổ biến tạo sóng", "Thủy triều có liên quan đến lực hút của Mặt Trăng và Mặt Trời", "Dòng biển vận chuyển nước và nhiệt"], example: "Quan sát lịch thủy triều tại một cảng để thấy mực nước thay đổi theo thời gian." },
      { heading: "Vai trò và bảo vệ biển", body: "Biển và đại dương điều hòa khí hậu, cung cấp nguồn lợi sinh vật, khoáng sản, tuyến giao thông và không gian du lịch. Hệ sinh thái biển rất nhạy cảm với rác thải, nước thải, khai thác quá mức và sự phá hủy nơi cư trú. Sử dụng tài nguyên có trách nhiệm cần đi cùng kiểm soát ô nhiễm và bảo tồn đa dạng sinh học.", keyPoints: ["Biển có vai trò kinh tế, sinh thái và điều hòa khí hậu", "Khai thác phải gắn với bảo vệ hệ sinh thái"], example: "Không xả rác xuống sông, kênh và bãi biển vì rác có thể theo dòng nước ra biển." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g6-geography-22", grade: 6, strand: "geography",
    title: "Lớp đất trên Trái Đất",
    summary: "Bài học tìm hiểu lớp đất, các thành phần cơ bản, quá trình hình thành và những yếu tố ảnh hưởng đến đất. Học sinh nhận biết vai trò của độ phì, mùn và các nguy cơ làm thoái hóa đất, từ đó lựa chọn biện pháp sử dụng, bảo vệ đất phù hợp.",
    learningObjectives: ["Nêu được khái niệm lớp đất và một số thành phần chính của đất.", "Giải thích được khái quát quá trình hình thành đất và vai trò của độ phì.", "Nhận biết được nguyên nhân gây thoái hóa đất và biện pháp bảo vệ đất."],
    sections: [
      { heading: "Thành phần và đặc điểm của đất", body: "Đất là lớp vật chất tơi xốp trên bề mặt lục địa, hình thành qua thời gian dài. Đất thường gồm chất khoáng, chất hữu cơ, nước và không khí. Mùn được tạo ra từ sự phân giải xác sinh vật, góp phần cung cấp dinh dưỡng và cải thiện cấu trúc đất. Độ phì thể hiện khả năng cung cấp nước, không khí và chất dinh dưỡng cho cây.", keyPoints: ["Đất có thành phần khoáng, hữu cơ, nước và không khí", "Mùn góp phần tạo độ phì"], example: "Đất có nhiều mùn thường sẫm màu hơn và có khả năng giữ ẩm, cung cấp dinh dưỡng tốt hơn." },
      { heading: "Quá trình hình thành đất", body: "Đá gốc bị phong hóa thành vật liệu nhỏ; sinh vật phát triển, chết đi và phân giải, bổ sung chất hữu cơ. Khí hậu, sinh vật, địa hình, đá mẹ và thời gian cùng tác động đến sự hình thành và đặc điểm đất. Vì vậy, đất ở các vùng có điều kiện tự nhiên khác nhau thường có tính chất khác nhau.", keyPoints: ["Phong hóa tạo vật liệu khoáng", "Sinh vật bổ sung chất hữu cơ", "Nhiều yếu tố phối hợp hình thành đất"], example: "Trên sườn dốc bị rửa trôi mạnh, lớp đất có thể mỏng hơn khu vực chân sườn." },
      { heading: "Sử dụng và bảo vệ đất", body: "Đất có thể bị xói mòn, rửa trôi, bạc màu, nhiễm mặn hoặc ô nhiễm khi sử dụng không hợp lí. Biện pháp bảo vệ gồm duy trì lớp phủ thực vật, canh tác theo đường đồng mức ở nơi phù hợp, luân canh, bổ sung hữu cơ và kiểm soát chất thải. Mỗi biện pháp cần phù hợp với loại đất và điều kiện địa phương.", keyPoints: ["Thảm thực vật giúp hạn chế xói mòn", "Canh tác hợp lí giúp duy trì độ phì", "Cần ngăn chất thải gây ô nhiễm đất"], example: "Ở đất dốc, trồng cây theo đường đồng mức và giữ lớp phủ giúp làm chậm dòng chảy mặt." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g6-geography-23", grade: 6, strand: "geography",
    title: "Sự sống trên Trái Đất",
    summary: "Bài học giới thiệu sự sống và sinh quyển, mối liên hệ giữa sinh vật với môi trường, cũng như sự đa dạng của các hệ sinh thái. Học sinh tìm hiểu các yếu tố ảnh hưởng đến phân bố sinh vật và vai trò của đa dạng sinh học đối với tự nhiên, con người.",
    learningObjectives: ["Trình bày được khái niệm sinh quyển và nhận biết các thành phần của hệ sinh thái.", "Nêu được một số yếu tố ảnh hưởng đến sự phân bố sinh vật.", "Giải thích được vai trò của đa dạng sinh học và sự cần thiết phải bảo vệ sinh vật."],
    sections: [
      { heading: "Sinh quyển và hệ sinh thái", body: "Sinh quyển là phần Trái Đất có sự sống, gồm các sinh vật và môi trường sống của chúng. Một hệ sinh thái có sinh vật như thực vật, động vật, vi sinh vật cùng các yếu tố vô sinh như nước, không khí, đất và ánh sáng. Các thành phần tương tác, trao đổi vật chất và năng lượng.", keyPoints: ["Sinh quyển là không gian tồn tại của sự sống", "Hệ sinh thái gồm thành phần hữu sinh và vô sinh"], example: "Một ao có nước, bùn, ánh sáng, tảo, cá và vi sinh vật là ví dụ về hệ sinh thái." },
      { heading: "Các yếu tố ảnh hưởng đến phân bố sinh vật", body: "Khí hậu, nước, đất, địa hình và quan hệ giữa các loài ảnh hưởng đến nơi sinh sống của sinh vật. Nhiệt độ và lượng mưa tạo điều kiện khác nhau cho thực vật; nguồn thức ăn, nơi trú ẩn và khả năng thích nghi cũng ảnh hưởng đến động vật. Hoạt động của con người có thể làm thay đổi nơi cư trú và phạm vi phân bố.", keyPoints: ["Khí hậu và nước có ảnh hưởng lớn đến sinh vật", "Sinh vật thích nghi với điều kiện môi trường", "Hoạt động con người có thể làm thay đổi nơi sống"], example: "Rừng ẩm thường có nhiều tầng cây và nơi cư trú cho nhiều nhóm sinh vật." },
      { heading: "Đa dạng sinh học và vai trò", body: "Đa dạng sinh học thể hiện sự phong phú của các loài, nguồn gen và hệ sinh thái. Sinh vật cung cấp thực phẩm, nguyên liệu, góp phần thụ phấn, phân giải chất hữu cơ, giữ đất và duy trì cân bằng sinh thái. Suy giảm nơi cư trú, ô nhiễm và khai thác quá mức có thể làm giảm đa dạng sinh học.", keyPoints: ["Đa dạng sinh học có giá trị sinh thái và kinh tế", "Bảo vệ nơi cư trú là một cách bảo vệ loài"], example: "Giữ lại cây bản địa và vùng cây ven suối giúp duy trì nơi sống cho nhiều loài." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g6-geography-24", grade: 6, strand: "geography",
    title: "Rừng nhiệt đới",
    summary: "Bài học tìm hiểu đặc điểm khí hậu nóng ẩm, cấu trúc nhiều tầng và sự phong phú sinh vật của rừng nhiệt đới. Học sinh phân tích vai trò của rừng đối với đất, nước, khí hậu và nhận biết tác động của phá rừng, cháy rừng, khai thác không bền vững.",
    learningObjectives: ["Mô tả được một số đặc điểm tự nhiên tiêu biểu của rừng nhiệt đới.", "Trình bày được vai trò của rừng nhiệt đới đối với môi trường và con người.", "Đề xuất được việc làm phù hợp để bảo vệ và phục hồi rừng."],
    sections: [
      { heading: "Điều kiện và cấu trúc rừng nhiệt đới", body: "Rừng nhiệt đới phân bố chủ yếu ở những khu vực có nền nhiệt cao; nhiều nơi có lượng mưa lớn và độ ẩm cao. Thảm thực vật thường phát triển phong phú, có thể hình thành nhiều tầng cây với độ cao và mức độ nhận ánh sáng khác nhau. Điều kiện nóng ẩm tạo môi trường sống cho nhiều loài sinh vật.", keyPoints: ["Nền nhiệt cao là đặc điểm phổ biến", "Nhiều khu vực có mưa và độ ẩm lớn", "Thảm thực vật thường có nhiều tầng"], example: "Quan sát ảnh lát cắt rừng để nhận ra tầng cây cao, tầng cây thấp và lớp cây bụi." },
      { heading: "Vai trò của rừng nhiệt đới", body: "Rừng là nơi cư trú của nhiều loài, lưu giữ nguồn gen và cung cấp lâm sản. Thảm thực vật giữ đất, làm chậm dòng chảy mặt, góp phần điều tiết nước và hấp thụ carbon. Rừng còn có ý nghĩa đối với sinh kế cộng đồng, nghiên cứu khoa học và du lịch sinh thái.", keyPoints: ["Rừng duy trì đa dạng sinh học", "Rừng góp phần bảo vệ đất và nguồn nước", "Rừng có giá trị sinh kế và văn hóa"], example: "Rừng đầu nguồn được bảo vệ tốt có thể giảm xói mòn và góp phần điều tiết dòng chảy." },
      { heading: "Nguy cơ và bảo vệ rừng", body: "Chuyển đổi đất rừng, khai thác trái phép, cháy rừng và chia cắt sinh cảnh làm suy giảm chất lượng rừng. Bảo vệ rừng cần quản lí sử dụng đất, phòng cháy, phục hồi cây bản địa, giám sát khai thác và bảo đảm sinh kế bền vững. Trồng cây mới cần lựa chọn loài phù hợp với điều kiện sinh thái.", keyPoints: ["Phá rừng làm mất nơi cư trú và tăng nguy cơ xói mòn", "Phòng cháy và phục hồi sinh cảnh cần được duy trì", "Quản lí rừng cần gắn với cộng đồng"], example: "Không đốt thực bì tùy tiện trong mùa khô và tuân thủ cảnh báo phòng cháy rừng." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g6-geography-25", grade: 6, strand: "geography",
    title: "Sự phân bố các đới thiên nhiên trên Trái Đất",
    summary: "Bài học giải thích khái quát sự phân hóa thiên nhiên theo vĩ độ và theo độ cao, thông qua mối liên hệ giữa khí hậu, đất, sinh vật và địa hình. Học sinh nhận biết một số đới thiên nhiên tiêu biểu và hiểu rằng ranh giới các đới có thể chuyển tiếp, không phải lúc nào cũng là đường ranh tuyệt đối.",
    learningObjectives: ["Nêu được cơ sở tự nhiên của sự phân hóa các đới thiên nhiên.", "Nhận biết được một số đặc điểm khái quát của các đới thiên nhiên.", "Giải thích được sự thay đổi thiên nhiên theo vĩ độ và độ cao."],
    sections: [
      { heading: "Cơ sở phân hóa các đới thiên nhiên", body: "Nhiệt độ và lượng mưa thay đổi theo vĩ độ, khoảng cách đến biển, địa hình và độ cao. Sự khác nhau về khí hậu kéo theo khác biệt về đất, nguồn nước và sinh vật. Vì các thành phần tự nhiên liên hệ chặt chẽ, chúng tạo nên những tổ hợp cảnh quan có đặc điểm tương đối ổn định.", keyPoints: ["Khí hậu là yếu tố quan trọng tạo sự phân hóa", "Đất, nước và sinh vật có quan hệ với khí hậu"], example: "Cùng một vĩ độ nhưng nơi có địa hình cao có thể mát hơn vùng thấp." },
      { heading: "Các đới thiên nhiên theo vĩ độ", body: "Từ vùng xích đạo về phía hai cực, điều kiện nhiệt và ẩm thay đổi, tạo nên các đới thiên nhiên khác nhau như rừng xích đạo ẩm, xavan, hoang mạc, rừng ôn đới và đài nguyên. Mỗi đới có đặc điểm riêng về nhiệt độ, lượng mưa, đất và thảm thực vật; giữa các đới có thể có vùng chuyển tiếp.", keyPoints: ["Sự phân hóa theo vĩ độ diễn ra từ xích đạo về hai cực", "Mỗi đới có tổ hợp khí hậu, đất và sinh vật đặc trưng"], example: "Trên bản đồ các đới thiên nhiên, hãy quan sát sự thay đổi từ vùng xích đạo đến vùng cực." },
      { heading: "Phân hóa theo độ cao", body: "Ở miền núi, nhiệt độ thường giảm theo độ cao, làm thay đổi thảm thực vật và điều kiện đất. Các đai thiên nhiên có thể xếp nối tiếp từ chân núi lên cao. Độ cao, hướng sườn và lượng mưa khiến các dãy núi khác nhau có sự phân hóa không hoàn toàn giống nhau.", keyPoints: ["Độ cao làm thay đổi nhiệt độ và điều kiện sinh thái", "Hướng sườn và lượng mưa cũng ảnh hưởng đến đai cao"], example: "Một sườn núi có thể chuyển từ rừng nhiệt đới ở chân núi sang thảm thực vật núi cao ở phía trên." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g6-geography-26", grade: 6, strand: "geography",
    title: "Thực hành: Tìm hiểu môi trường tự nhiên địa phương",
    summary: "Bài thực hành hướng dẫn học sinh lựa chọn một khu vực gần nơi sống hoặc trường học để quan sát môi trường tự nhiên. Học sinh ghi nhận địa hình, nước, đất, sinh vật và dấu hiệu tác động của con người bằng bảng quan sát, sơ đồ hoặc ảnh có chú thích.",
    learningObjectives: ["Lập được kế hoạch quan sát một thành phần hoặc khu vực môi trường tự nhiên địa phương.", "Thu thập và ghi chép thông tin có thời gian, địa điểm và nguồn rõ ràng.", "Trình bày được nhận xét dựa trên bằng chứng quan sát và đề xuất việc làm bảo vệ môi trường."],
    sections: [
      { heading: "Lập kế hoạch khảo sát", body: "Trước khi khảo sát, cần xác định câu hỏi tìm hiểu, phạm vi, thời gian và cách ghi chép. Có thể chọn một ao hồ, đoạn suối, khu đất, công viên hoặc khu vực quanh trường. Kế hoạch cần nêu rõ nội dung quan sát, người tham gia và nguyên tắc an toàn, tôn trọng quy định của địa phương.", keyPoints: ["Chọn phạm vi vừa sức và câu hỏi rõ ràng", "Xác định thời gian, phương pháp và cách ghi dữ liệu", "Không tự ý vào khu vực nguy hiểm hoặc bị hạn chế"], example: "Câu hỏi khảo sát có thể là: cây xanh được phân bố như thế nào quanh trường?" },
      { heading: "Quan sát và ghi nhận bằng chứng", body: "Khi quan sát, hãy ghi ngày giờ, vị trí, thời tiết và đặc điểm nhìn thấy được. Có thể dùng sơ đồ đơn giản, bảng kiểm, ảnh có chú thích hoặc số liệu công khai. Cần phân biệt điều trực tiếp quan sát với suy đoán; không làm hỏng cây cối, lấy mẫu trái phép hoặc xả rác trong quá trình khảo sát.", keyPoints: ["Ghi rõ thời gian và địa điểm", "Phân biệt quan sát với suy luận", "Tôn trọng sinh vật và cảnh quan"], example: "Thay vì ghi 'nước bị ô nhiễm nặng', hãy ghi dấu hiệu cụ thể như rác nổi hoặc mùi bất thường và nêu đó là quan sát tại thời điểm khảo sát." },
      { heading: "Tổng hợp và trình bày kết quả", body: "Sau khảo sát, sắp xếp thông tin theo chủ đề, đánh dấu vị trí trên sơ đồ và so sánh các điểm quan sát. Nhận xét cần dựa trên bằng chứng, chỉ rõ giới hạn của mẫu khảo sát và tránh khái quát từ một vị trí nhỏ cho toàn địa phương. Đề xuất giải pháp nên cụ thể và phù hợp với khả năng thực hiện.", keyPoints: ["Tổng hợp dữ liệu theo tiêu chí thống nhất", "Nêu rõ giới hạn khảo sát", "Đề xuất giải pháp khả thi"], example: "Có thể kiến nghị đặt thùng rác đúng vị trí hoặc tổ chức chăm sóc cây xanh cùng nhà trường." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g6-geography-27", grade: 6, strand: "geography",
    title: "Dân số và sự phân bố dân cư trên thế giới",
    summary: "Bài học tìm hiểu dân số, mật độ dân số và sự phân bố không đồng đều của dân cư trên thế giới. Học sinh nhận biết tác động của điều kiện tự nhiên, lịch sử, kinh tế và xã hội đến nơi cư trú, đồng thời rèn kĩ năng đọc bản đồ và tính mật độ dân số đơn giản.",
    learningObjectives: ["Nêu được khái niệm dân số và mật độ dân số.", "Mô tả được sự phân bố dân cư không đồng đều và một số nhân tố ảnh hưởng.", "Tính được mật độ dân số từ số dân và diện tích, đọc được thông tin trên bản đồ dân cư."],
    sections: [
      { heading: "Dân số và mật độ dân số", body: "Dân số là tổng số người sinh sống trong một lãnh thổ tại một thời điểm xác định. Mật độ dân số cho biết số người trung bình trên một đơn vị diện tích, thường tính bằng người trên kilômét vuông. Khi so sánh cần chú ý cùng thời điểm thống kê và cùng đơn vị.", keyPoints: ["Dân số cần gắn với thời điểm thống kê", "Mật độ dân số = số dân chia cho diện tích"], example: "Một khu vực có 100 000 người trên 500 km² có mật độ 200 người/km²." },
      { heading: "Sự phân bố dân cư", body: "Dân cư phân bố không đồng đều giữa các châu lục, quốc gia và khu vực. Đồng bằng, ven biển và nơi có điều kiện giao thông, việc làm, dịch vụ thuận lợi thường tập trung đông dân hơn. Núi cao, hoang mạc, vùng băng giá hoặc nơi thiếu hạ tầng thường có mật độ thấp, nhưng vẫn có những ngoại lệ.", keyPoints: ["Đồng bằng và đô thị thường có mật độ cao", "Điều kiện tự nhiên không phải yếu tố duy nhất quyết định nơi cư trú"], example: "So sánh bản đồ dân cư với bản đồ địa hình để tìm mối liên hệ giữa địa hình và mật độ." },
      { heading: "Nhân tố ảnh hưởng đến phân bố dân cư", body: "Khí hậu, địa hình, nguồn nước và tài nguyên tạo điều kiện sinh sống; lịch sử khai phá, hoạt động kinh tế, giao thông, chính sách và dịch vụ cũng ảnh hưởng đến sự lựa chọn nơi cư trú. Di cư làm thay đổi quy mô và cơ cấu dân số của nơi đi và nơi đến.", keyPoints: ["Phân bố dân cư chịu tác động tổng hợp của tự nhiên và kinh tế - xã hội", "Di cư có thể làm thay đổi phân bố dân cư"], example: "Một khu công nghiệp mới có thể thu hút lao động và làm tăng dân số cơ học ở khu vực lân cận." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g6-geography-28", grade: 6, strand: "geography",
    title: "Mối quan hệ giữa con người và thiên nhiên",
    summary: "Bài học làm rõ sự phụ thuộc của con người vào đất, nước, khí hậu và sinh vật, đồng thời phân tích cách hoạt động sản xuất và sinh hoạt làm biến đổi môi trường. Học sinh nhận biết cả lợi ích và rủi ro, từ đó lựa chọn cách ứng xử hài hòa với thiên nhiên.",
    learningObjectives: ["Nêu được một số ví dụ về sự phụ thuộc của đời sống con người vào thiên nhiên.", "Phân tích được tác động tích cực và tiêu cực của hoạt động con người đến môi trường.", "Đề xuất được hành động phù hợp nhằm giảm tác động xấu và sử dụng tài nguyên hợp lí."],
    sections: [
      { heading: "Thiên nhiên cung cấp điều kiện sống", body: "Con người cần không khí, nước, đất, thực phẩm và năng lượng để duy trì đời sống và sản xuất. Địa hình, khí hậu và sinh vật tạo nên những điều kiện và giới hạn khác nhau giữa các khu vực. Các hệ sinh thái còn cung cấp những lợi ích như điều tiết nước, thụ phấn và duy trì chất lượng môi trường.", keyPoints: ["Con người phụ thuộc vào các thành phần tự nhiên", "Hệ sinh thái cung cấp nhiều lợi ích thiết yếu"], example: "Một lưu vực có rừng đầu nguồn giúp duy trì dòng chảy và giảm xói mòn đất." },
      { heading: "Hoạt động con người làm biến đổi thiên nhiên", body: "Trồng trọt, xây dựng, khai thác khoáng sản và đô thị hóa có thể tạo ra sản phẩm, việc làm và hạ tầng. Tuy nhiên, nếu thiếu quy hoạch và kiểm soát, các hoạt động này có thể gây ô nhiễm, suy giảm sinh cảnh, xói mòn và cạn kiệt tài nguyên. Mức độ tác động phụ thuộc cách tổ chức và công nghệ sử dụng.", keyPoints: ["Tác động có thể tích cực hoặc tiêu cực", "Quy hoạch và công nghệ ảnh hưởng đến mức độ tác động"], example: "Xây dựng hệ thống xử lí nước thải giúp giảm tác động của khu dân cư đến sông." },
      { heading: "Ứng xử hài hòa với thiên nhiên", body: "Ứng xử hài hòa đòi hỏi sử dụng tài nguyên theo khả năng phục hồi, giảm chất thải, bảo vệ hệ sinh thái và chủ động phòng tránh thiên tai. Cộng đồng cần phối hợp với cơ quan chuyên môn để theo dõi môi trường và thực hiện giải pháp phù hợp với đặc điểm địa phương.", keyPoints: ["Sử dụng tài nguyên có giới hạn và có trách nhiệm", "Bảo vệ hệ sinh thái góp phần bảo vệ sinh kế", "Phòng tránh thiên tai cần dựa trên cảnh báo và quy hoạch"], example: "Giữ hành lang cây xanh ven sông giúp bảo vệ bờ và tạo không gian sinh thái." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g6-geography-29", grade: 6, strand: "geography",
    title: "Bảo vệ tự nhiên và khai thác thông minh các tài nguyên thiên nhiên vì sự phát triển bền vững",
    summary: "Bài học giới thiệu nguyên tắc sử dụng tài nguyên thiên nhiên hợp lí, bảo tồn đa dạng sinh học và giảm tác động môi trường. Học sinh phân biệt tài nguyên có khả năng tái tạo và không tái tạo, tìm hiểu khai thác thông minh và liên hệ ba khía cạnh kinh tế, xã hội, môi trường của phát triển bền vững.",
    learningObjectives: ["Phân biệt được một số nhóm tài nguyên và nhận biết giới hạn khai thác.", "Nêu được biện pháp bảo vệ tự nhiên, tiết kiệm và sử dụng hiệu quả tài nguyên.", "Giải thích được vì sao phát triển bền vững cần kết hợp kinh tế, xã hội và môi trường."],
    sections: [
      { heading: "Tài nguyên và giới hạn khai thác", body: "Tài nguyên thiên nhiên gồm đất, nước, sinh vật, khoáng sản, năng lượng và nhiều thành phần khác. Một số tài nguyên có khả năng phục hồi nếu được quản lí phù hợp, trong khi khoáng sản và nhiên liệu hóa thạch hình thành rất lâu và có trữ lượng hữu hạn. Khai thác cần tính đến tốc độ phục hồi, nhu cầu và tác động môi trường.", keyPoints: ["Tài nguyên tái tạo vẫn có thể suy thoái nếu khai thác quá mức", "Tài nguyên không tái tạo có giới hạn"], example: "Rừng có thể phục hồi nếu được bảo vệ và tái sinh, nhưng khai thác vượt khả năng phục hồi sẽ làm suy giảm tài nguyên." },
      { heading: "Khai thác thông minh và bảo tồn", body: "Khai thác thông minh là sử dụng công nghệ, quy hoạch và giám sát để giảm lãng phí, hạn chế ô nhiễm và duy trì chức năng hệ sinh thái. Các biện pháp gồm tiết kiệm năng lượng, tái sử dụng vật liệu, xử lí chất thải, phục hồi môi trường sau khai thác và bảo vệ khu vực có giá trị sinh thái.", keyPoints: ["Giảm lãng phí và chất thải", "Tăng hiệu quả sử dụng tài nguyên", "Phục hồi môi trường sau khai thác"], example: "Thu hồi và tái chế kim loại giúp giảm nhu cầu khai thác quặng mới." },
      { heading: "Phát triển bền vững", body: "Phát triển bền vững hướng tới đáp ứng nhu cầu hiện tại mà không làm suy giảm khả năng đáp ứng nhu cầu của các thế hệ tương lai. Cách tiếp cận này cân bằng hiệu quả kinh tế, công bằng xã hội và bảo vệ môi trường. Người dân, doanh nghiệp và cơ quan quản lí đều có vai trò trong lựa chọn và giám sát giải pháp.", keyPoints: ["Kinh tế, xã hội và môi trường cần được xem xét đồng thời", "Cộng đồng có vai trò trong bảo tồn và giám sát"], example: "Một dự án du lịch cần tạo sinh kế nhưng đồng thời giới hạn sức chứa và bảo vệ cảnh quan." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g6-geography-30", grade: 6, strand: "geography",
    title: "Thực hành: Tìm hiểu mối quan hệ giữa con người và thiên nhiên địa phương",
    summary: "Bài thực hành giúp học sinh khảo sát một hoạt động của con người và thành phần tự nhiên có liên quan tại địa phương. Học sinh thu thập bằng chứng, phân tích lợi ích và tác động, xác định nhóm chịu ảnh hưởng và đề xuất giải pháp khả thi.",
    learningObjectives: ["Lựa chọn được một vấn đề địa phương thể hiện mối quan hệ giữa con người và thiên nhiên.", "Thu thập, phân loại bằng chứng và phân tích được ít nhất một chuỗi nguyên nhân - kết quả.", "Đề xuất được giải pháp có thể thực hiện và tiêu chí theo dõi kết quả."],
    sections: [
      { heading: "Chọn vấn đề và xác định phạm vi", body: "Có thể chọn việc sử dụng nước, canh tác trên đất dốc, rác thải ở kênh mương, cây xanh đô thị hoặc hoạt động du lịch tại một khu vực. Cần xác định phạm vi khảo sát, câu hỏi, thời gian và những nhóm người có liên quan. Chủ đề phải phù hợp lứa tuổi và không yêu cầu học sinh tiếp xúc với nơi nguy hiểm.", keyPoints: ["Chọn vấn đề gần gũi và có thể quan sát", "Xác định phạm vi, câu hỏi và đối tượng liên quan"], example: "Một câu hỏi phù hợp là: rác sinh hoạt quanh chợ ảnh hưởng thế nào đến dòng chảy của mương gần đó?" },
      { heading: "Phân tích mối quan hệ và bằng chứng", body: "Ghi nhận hoạt động của con người, thành phần tự nhiên bị tác động và biểu hiện có thể quan sát. Kết hợp ảnh có chú thích, sơ đồ, số liệu công khai và trao đổi với người có trách nhiệm; kiểm tra chéo thông tin trước khi kết luận. Phân biệt nguyên nhân trực tiếp, yếu tố góp phần và hệ quả.", keyPoints: ["Lập chuỗi hoạt động - tác động - hệ quả", "Đối chiếu nhiều nguồn thông tin", "Không kết luận vượt quá bằng chứng"], example: "Có thể mô tả chuỗi: rác bị bỏ xuống mương - dòng chảy bị cản trở - nguy cơ ứ đọng tăng." },
      { heading: "Đề xuất và theo dõi giải pháp", body: "Giải pháp nên xác định người thực hiện, nguồn lực, thời gian và kết quả mong đợi. Có thể ưu tiên giảm chất thải tại nguồn, sử dụng tiết kiệm nước, giữ cây xanh hoặc tuyên truyền đúng đối tượng. Sau khi thực hiện, theo dõi bằng chỉ số đơn giản như lượng rác thu gom, số điểm được cải thiện hoặc mức độ duy trì vệ sinh.", keyPoints: ["Giải pháp cần cụ thể và có người chịu trách nhiệm", "Chọn chỉ số theo dõi trước khi triển khai", "Đánh giá và điều chỉnh sau thực hiện"], example: "Nhóm học sinh có thể phối hợp với nhà trường tổ chức theo dõi điểm tập kết rác trong một khoảng thời gian." }
    ],
    questions: [], status: 'draft',
  },

  {
    id: "g7-history-01", grade: 7, strand: "history",
    title: "Quá trình hình thành và phát triển của chế độ phong kiến ở Tây Âu",
    summary: "Bài học tìm hiểu sự tan rã của đế quốc La Mã ở Tây Âu, sự hình thành các vương quốc của người Giéc-man và quá trình xác lập quan hệ phong kiến. Học sinh nhận biết lãnh địa, vai trò của lãnh chúa và nông nô, đồng thời giải thích sự phục hồi của thành thị và thương mại từ khoảng thế kỉ XI.",
    learningObjectives: ["Nêu được bối cảnh hình thành các vương quốc phong kiến ở Tây Âu sau khi đế quốc Tây La Mã tan rã.", "Mô tả được những nét chính của lãnh địa phong kiến và quan hệ giữa lãnh chúa với nông nô.", "Giải thích được một số nguyên nhân làm thành thị trung đại phục hồi và phát triển."],
    sections: [
      { heading: "Từ đế quốc Tây La Mã đến các vương quốc mới", body: "Đế quốc Tây La Mã tan rã năm 476. Nhiều nhóm người Giéc-man lập các vương quốc trên lãnh thổ đế quốc cũ. Quá trình tiếp xúc và hòa trộn giữa cư dân La Mã với các cộng đồng mới làm biến đổi tổ chức chính trị, kinh tế và xã hội ở Tây Âu. Quan hệ phong kiến hình thành dần qua việc phân phong đất đai và sự phụ thuộc của người sản xuất vào chủ đất.", keyPoints: ["Năm 476 thường được dùng làm mốc kết thúc đế quốc Tây La Mã", "Các vương quốc mới hình thành trên lãnh thổ Tây Âu", "Quan hệ phong kiến phát triển qua nhiều thế kỉ"], example: "Khi lập dòng thời gian, cần phân biệt sự kiện năm 476 với quá trình hình thành chế độ phong kiến kéo dài sau đó." },
      { heading: "Lãnh địa và xã hội phong kiến", body: "Lãnh địa là đơn vị kinh tế - xã hội do lãnh chúa kiểm soát, gồm đất canh tác, rừng, đồng cỏ, làng và nơi ở. Nông nô canh tác trên ruộng đất, phải thực hiện nghĩa vụ với lãnh chúa và bị ràng buộc bởi nhiều quy định. Lãnh địa có xu hướng tự cung tự cấp, nhưng vẫn có trao đổi với bên ngoài ở những mức độ khác nhau.", keyPoints: ["Lãnh chúa nắm quyền kiểm soát lãnh địa", "Nông nô có nghĩa vụ lao động và nộp sản phẩm", "Kinh tế lãnh địa thiên về tự cung tự cấp"], example: "Sơ đồ lãnh địa có thể biểu diễn khu đất của lãnh chúa, ruộng nông nô, nhà thờ và khu dân cư." },
      { heading: "Thành thị trung đại phát triển", body: "Từ khoảng thế kỉ XI, nông nghiệp và thủ công nghiệp ở nhiều nơi có chuyển biến, sản phẩm dư thừa và trao đổi tăng lên. Thợ thủ công và thương nhân tập trung tại các điểm giao thông, gần lâu đài hoặc tu viện, góp phần hình thành thành thị. Thành thị trở thành trung tâm thủ công nghiệp, buôn bán và đời sống văn hóa, làm xã hội Tây Âu biến đổi.", keyPoints: ["Thủ công nghiệp và thương mại thúc đẩy thành thị", "Thành thị có vai trò kinh tế và văn hóa", "Quan hệ xã hội dần đa dạng hơn"], example: "So sánh lãnh địa với thành thị theo hoạt động kinh tế, dân cư và mức độ trao đổi hàng hóa." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g7-history-02", grade: 7, strand: "history",
    title: "Các cuộc phát kiến địa lí và sự hình thành quan hệ sản xuất tư bản chủ nghĩa ở Tây Âu",
    summary: "Bài học tìm hiểu nguyên nhân, điều kiện và một số chuyến thám hiểm hàng hải lớn từ cuối thế kỉ XV đến đầu thế kỉ XVI. Học sinh phân tích tác động của các cuộc phát kiến đến giao lưu liên lục địa, thương mại, chinh phục thuộc địa và sự phát triển của quan hệ sản xuất tư bản chủ nghĩa ở Tây Âu.",
    learningObjectives: ["Trình bày được một số nguyên nhân và điều kiện dẫn đến các cuộc phát kiến địa lí.", "Nêu được một số chuyến đi tiêu biểu và hệ quả chính của các cuộc phát kiến.", "Giải thích được sự phát triển của thương mại, tích lũy tư bản và quan hệ sản xuất tư bản chủ nghĩa ban đầu ở Tây Âu."],
    sections: [
      { heading: "Nguyên nhân và điều kiện", body: "Nhu cầu tìm đường biển đến các thị trường châu Á, đặc biệt để trao đổi hàng hóa có giá trị, thúc đẩy các chuyến thám hiểm. Kĩ thuật đóng tàu, la bàn, hải đồ và hiểu biết hàng hải được cải thiện, trong khi một số vương triều Tây Âu bảo trợ các đoàn thám hiểm. Những điều kiện này tạo khả năng cho các chuyến đi xa trên đại dương.", keyPoints: ["Nhu cầu thương mại là một động lực quan trọng", "Tiến bộ hàng hải hỗ trợ đi biển xa", "Các vương triều và thương nhân cung cấp nguồn lực"], example: "Khi phân tích một chuyến thám hiểm, cần xem cả mục tiêu kinh tế, kĩ thuật và sự bảo trợ chính trị." },
      { heading: "Một số chuyến đi tiêu biểu", body: "Bartolomeu Dias đi tới mũi phía nam châu Phi năm 1488; Christopher Columbus vượt Đại Tây Dương năm 1492 và đến vùng Caribe; Vasco da Gama tới Ấn Độ bằng đường biển năm 1498. Đoàn thám hiểm do Ferdinand Magellan khởi hành năm 1519, và đoàn của Juan Sebastián Elcano hoàn thành chuyến đi vòng quanh thế giới năm 1522. Các mốc này mở rộng hiểu biết địa lí của người châu Âu.", keyPoints: ["Dias: 1488; Columbus: 1492; da Gama: 1498", "Chuyến đi vòng quanh thế giới hoàn thành năm 1522", "Cần phân biệt người khởi xướng chuyến đi và người hoàn thành hành trình"], example: "Đánh dấu các tuyến đi trên bản đồ thế giới và chú thích mốc thời gian." },
      { heading: "Tác động và biến đổi kinh tế", body: "Các tuyến hàng hải mới làm mở rộng giao thương giữa nhiều khu vực, thúc đẩy hoạt động của thương nhân, ngân hàng và các công ty buôn bán. Của cải và nguồn nguyên liệu được đưa về Tây Âu, góp phần tích lũy tư bản và mở rộng sản xuất hàng hóa. Tuy nhiên, quá trình này cũng gắn với chinh phục thuộc địa, cưỡng bức lao động, buôn bán nô lệ và sự áp đặt lên nhiều cộng đồng bản địa.", keyPoints: ["Thương mại và tích lũy tư bản mở rộng", "Một số hình thức sản xuất và thuê mướn lao động phát triển", "Chinh phục thuộc địa gây hậu quả nghiêm trọng cho cư dân bản địa"], example: "Đánh giá tác động cần xem cả sự mở rộng giao lưu lẫn bạo lực và bóc lột thuộc địa." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g7-history-03", grade: 7, strand: "history",
    title: "Phong trào Văn hóa Phục hưng và Cải cách tôn giáo",
    summary: "Bài học tìm hiểu những biến đổi tư tưởng, văn học, nghệ thuật và tôn giáo ở Tây Âu từ cuối thời trung đại. Học sinh nhận biết tinh thần nhân văn của Văn hóa Phục hưng, một số thành tựu tiêu biểu và nguyên nhân dẫn đến phong trào Cải cách tôn giáo.",
    learningObjectives: ["Nêu được bối cảnh và một số nội dung chính của phong trào Văn hóa Phục hưng.", "Nhận biết được đóng góp của một số nhân vật và thành tựu tiêu biểu.", "Trình bày được nguyên nhân, diễn biến khái quát và tác động của phong trào Cải cách tôn giáo."],
    sections: [
      { heading: "Bối cảnh và tư tưởng Phục hưng", body: "Từ khoảng thế kỉ XIV, các đô thị và hoạt động thương mại ở một số vùng Tây Âu phát triển, tầng lớp thị dân và trí thức ngày càng có vai trò. Nhiều học giả tìm hiểu di sản Hy Lạp - La Mã cổ đại, đề cao năng lực, phẩm giá và đời sống của con người. Phong trào này được gọi là Văn hóa Phục hưng, khởi đầu nổi bật ở các thành thị Italia.", keyPoints: ["Phong trào khởi đầu ở Italia", "Tư tưởng nhân văn chú ý đến con người và thế giới hiện thực", "Di sản cổ đại được nghiên cứu và sáng tạo lại"], example: "Khi phân tích một tác phẩm Phục hưng, chú ý cách thể hiện con người, thiên nhiên và tri thức." },
      { heading: "Thành tựu văn học, nghệ thuật và khoa học", body: "Văn học, hội họa, điêu khắc, kiến trúc và khoa học có nhiều đổi mới. Leonardo da Vinci, Michelangelo và Raphael là những nghệ sĩ tiêu biểu; trong khoa học, các quan sát và nghiên cứu tự nhiên góp phần mở rộng hiểu biết. Thành tựu Phục hưng không chỉ là sự phục hồi hình thức cổ đại mà còn thể hiện tinh thần tìm tòi và sáng tạo.", keyPoints: ["Nhiều lĩnh vực nghệ thuật và tri thức phát triển", "Nghệ sĩ chú ý hơn đến hình thể, không gian và đời sống con người", "Tư duy quan sát và nghiên cứu được đề cao"], example: "So sánh hai tác phẩm ở những thời kì khác nhau theo chủ đề, cách thể hiện và quan niệm về con người." },
      { heading: "Cải cách tôn giáo", body: "Một bộ phận tín đồ và học giả phê phán những biểu hiện bị xem là sai lệch trong Giáo hội Tây Âu, đồng thời mong muốn thay đổi đời sống tôn giáo. Năm 1517, Martin Luther công bố các luận điểm phê phán việc bán ân xá; phong trào Cải cách sau đó lan rộng với nhiều khuynh hướng khác nhau. Phong trào làm biến đổi đời sống tôn giáo và chính trị ở châu Âu, đồng thời dẫn đến xung đột tại một số nơi.", keyPoints: ["Phê phán một số hoạt động của Giáo hội là một nguyên nhân", "Năm 1517 gắn với hoạt động của Martin Luther", "Phong trào tạo ra nhiều hệ phái và biến đổi xã hội"], example: "Khi lập dòng thời gian, đặt mốc 1517 trong bối cảnh rộng hơn của các biến đổi tư tưởng và tôn giáo." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g7-history-04", grade: 7, strand: "history",
    title: "Trung Quốc từ thế kỉ VII đến giữa thế kỉ XIX",
    summary: "Bài học khái quát các triều đại và biến đổi chính trị, kinh tế, văn hóa của Trung Quốc từ nhà Đường đến giữa thế kỉ XIX. Học sinh nhận biết một số thành tựu khoa học - kĩ thuật, hoạt động thương mại và những thách thức của nhà Thanh trước sức ép từ bên ngoài.",
    learningObjectives: ["Nêu được một số triều đại và biến đổi chính trị tiêu biểu ở Trung Quốc từ thế kỉ VII đến giữa thế kỉ XIX.", "Trình bày được nét chính về kinh tế, xã hội và thành tựu văn hóa - kĩ thuật.", "Nhận biết được những khó khăn của Trung Quốc trong quan hệ với các nước phương Tây vào thế kỉ XIX."],
    sections: [
      { heading: "Các triều đại và tổ chức nhà nước", body: "Từ thế kỉ VII, nhà Đường củng cố chính quyền trung ương và mở rộng ảnh hưởng. Sau thời Đường, Trung Quốc trải qua các triều Tống, Nguyên, Minh và Thanh. Mỗi triều đại có bối cảnh và chính sách riêng; bộ máy quan lại, thi cử và hệ thống hành chính góp phần duy trì nhà nước quân chủ tập quyền trong nhiều giai đoạn.", keyPoints: ["Đường, Tống, Nguyên, Minh và Thanh là các triều đại tiêu biểu", "Nhà nước quân chủ duy trì bộ máy hành chính và quan lại", "Lịch sử có những thời kì thống nhất và biến động"], example: "Sắp xếp các triều đại theo thứ tự thời gian thay vì học rời rạc từng tên gọi." },
      { heading: "Kinh tế, văn hóa và kĩ thuật", body: "Nông nghiệp, thủ công nghiệp và thương mại phát triển ở nhiều giai đoạn. Đô thị, chợ và các tuyến trao đổi đường bộ, đường biển kết nối các vùng. Trung Quốc có nhiều thành tựu về in, giấy, la bàn, thuốc súng, văn học, hội họa và kiến trúc; mức độ phát triển và ứng dụng thay đổi theo thời kì.", keyPoints: ["Nông nghiệp và thương mại là nền tảng quan trọng", "Thủ công nghiệp và đô thị phát triển ở nhiều triều đại", "Một số phát minh có ảnh hưởng vượt ra ngoài Trung Quốc"], example: "Liên hệ sự phát triển của kĩ thuật in với việc lưu truyền sách và tri thức." },
      { heading: "Trung Quốc trước sức ép phương Tây", body: "Đến thời Thanh, Trung Quốc vẫn là một đế quốc rộng lớn nhưng đối mặt với nhiều vấn đề về quản lí, tài chính và xã hội. Hoạt động buôn bán với phương Tây diễn ra trong khuôn khổ kiểm soát chặt chẽ. Chiến tranh Nha phiến lần thứ nhất (1840–1842) và các điều ước sau đó cho thấy sức ép quân sự, thương mại từ phương Tây ngày càng tăng.", keyPoints: ["Nhà Thanh gặp khó khăn nội tại", "Quan hệ thương mại với phương Tây bị kiểm soát", "Chiến tranh Nha phiến lần thứ nhất làm thay đổi quan hệ đối ngoại"], example: "Phân biệt nguyên nhân nội tại với sức ép bên ngoài khi giải thích sự suy yếu của một triều đại." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g7-history-05", grade: 7, strand: "history",
    title: "Ấn Độ từ thế kỉ IV đến giữa thế kỉ XIX",
    summary: "Bài học khái quát các thời kì phát triển của Ấn Độ từ vương triều Gupta, các nhà nước trung đại đến đế quốc Mogul và sự mở rộng ảnh hưởng của Công ty Đông Ấn Anh. Học sinh nhận biết thành tựu văn hóa, tôn giáo và sự đa dạng của xã hội Ấn Độ.",
    learningObjectives: ["Nêu được một số mốc chính trong lịch sử Ấn Độ từ thế kỉ IV đến giữa thế kỉ XIX.", "Trình bày được nét khái quát về kinh tế, xã hội và thành tựu văn hóa của Ấn Độ.", "Nhận biết được quá trình mở rộng ảnh hưởng của người Anh ở Ấn Độ đến giữa thế kỉ XIX."],
    sections: [
      { heading: "Các nhà nước và vương triều", body: "Từ thế kỉ IV, vương triều Gupta thống trị phần lớn miền bắc Ấn Độ trong một giai đoạn và để lại dấu ấn về văn hóa, khoa học. Sau đó, tiểu lục địa trải qua nhiều nhà nước và biến động. Vương triều Hồi giáo Delhi hình thành từ đầu thế kỉ XIII; đến năm 1526, Babur lập nền móng đế quốc Mogul, đế quốc này phát triển mạnh dưới một số hoàng đế như Akbar.", keyPoints: ["Gupta là một vương triều quan trọng từ thế kỉ IV", "Vương triều Delhi và đế quốc Mogul thuộc các giai đoạn sau", "Ấn Độ có nhiều trung tâm quyền lực và cộng đồng đa dạng"], example: "Dùng dòng thời gian để phân biệt Gupta, Delhi và Mogul, tránh gộp thành một triều đại." },
      { heading: "Kinh tế, xã hội và văn hóa", body: "Nông nghiệp giữ vai trò quan trọng, bên cạnh thủ công nghiệp và thương mại trong nước, quốc tế. Xã hội Ấn Độ đa dạng về ngôn ngữ, tôn giáo và tập quán. Hindu giáo, Phật giáo và Hồi giáo có ảnh hưởng ở những giai đoạn và khu vực khác nhau. Kiến trúc, văn học, toán học và thiên văn học có nhiều thành tựu, phản ánh giao lưu và sáng tạo lâu dài.", keyPoints: ["Nông nghiệp, thủ công nghiệp và thương mại cùng tồn tại", "Đời sống tôn giáo và văn hóa đa dạng", "Giao lưu góp phần tạo nên các phong cách nghệ thuật phong phú"], example: "Khi tìm hiểu một công trình kiến trúc, cần đặt nó trong bối cảnh triều đại, tôn giáo và khu vực." },
      { heading: "Ảnh hưởng của người Anh mở rộng", body: "Từ thế kỉ XVII, Công ty Đông Ấn Anh xây dựng các cơ sở buôn bán tại Ấn Độ. Qua hoạt động thương mại, liên minh và chiến tranh, công ty dần kiểm soát nhiều vùng lãnh thổ, đặc biệt trong thế kỉ XVIII và đầu thế kỉ XIX. Đến giữa thế kỉ XIX, ảnh hưởng chính trị và kinh tế của Anh đã mở rộng đáng kể, làm biến đổi đời sống nhiều cộng đồng.", keyPoints: ["Công ty Đông Ấn Anh ban đầu hoạt động thương mại", "Ảnh hưởng mở rộng qua nhiều hình thức, trong đó có quân sự và chính trị", "Quá trình này làm thay đổi kinh tế và quyền lực ở Ấn Độ"], example: "Phân biệt việc lập thương điếm với việc kiểm soát lãnh thổ và quyền lực chính trị." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g7-history-06", grade: 7, strand: "history",
    title: "Các vương quốc phong kiến Đông Nam Á từ nửa sau thế kỉ X đến nửa đầu thế kỉ XVI",
    summary: "Bài học tìm hiểu sự phát triển của các vương quốc phong kiến ở Đông Nam Á lục địa và hải đảo từ nửa sau thế kỉ X đến nửa đầu thế kỉ XVI. Học sinh nhận biết vai trò của nông nghiệp lúa nước, thương mại biển, tôn giáo và giao lưu văn hóa trong quá trình hình thành các trung tâm quyền lực.",
    learningObjectives: ["Kể tên được một số vương quốc phong kiến tiêu biểu ở Đông Nam Á trong giai đoạn.", "Trình bày được nét khái quát về kinh tế, tổ chức nhà nước và văn hóa.", "Giải thích được vai trò của giao lưu khu vực và thương mại trong sự phát triển của các vương quốc."],
    sections: [
      { heading: "Các trung tâm quyền lực ở Đông Nam Á", body: "Từ nửa sau thế kỉ X, nhiều vương quốc ở Đông Nam Á tiếp tục phát triển hoặc được củng cố. Ở lục địa có các trung tâm như Pagan, Angkor, Sukhothai và Ayutthaya; ở hải đảo có những thế lực gắn với Java và các tuyến thương mại biển như Majapahit, Malacca. Mỗi vương quốc có thời điểm phát triển và phạm vi ảnh hưởng khác nhau.", keyPoints: ["Đông Nam Á gồm khu vực lục địa và hải đảo", "Các vương quốc không phát triển đồng thời hoặc giống nhau", "Vị trí địa lí ảnh hưởng đến mạng lưới giao thương"], example: "Dùng bản đồ để phân biệt vương quốc ở lưu vực sông lớn với trung tâm thương mại trên đảo hoặc eo biển." },
      { heading: "Kinh tế và tổ chức xã hội", body: "Nông nghiệp lúa nước phát triển ở các đồng bằng và lưu vực sông, kết hợp với thủ công nghiệp, khai thác sản vật và buôn bán. Các vương quốc xây dựng bộ máy quân chủ, tổ chức thu thuế, huy động lao động và xây dựng công trình thủy lợi, đền tháp. Thương mại biển kết nối Đông Nam Á với Ấn Độ, Trung Quốc và các khu vực khác.", keyPoints: ["Nông nghiệp lúa nước là nền tảng ở nhiều vùng", "Thủ công nghiệp và thương mại góp phần tạo nguồn lực", "Nhà nước tổ chức xây dựng công trình và quản lí lãnh thổ"], example: "Liên hệ vị trí của một cảng biển với sự phát triển của thương mại khu vực." },
      { heading: "Tôn giáo và giao lưu văn hóa", body: "Phật giáo, Hindu giáo và Hồi giáo có ảnh hưởng ở những khu vực và thời kì khác nhau. Cư dân Đông Nam Á tiếp nhận một số yếu tố từ bên ngoài rồi điều chỉnh theo điều kiện địa phương. Kiến trúc đền tháp, chữ viết, nghệ thuật và lễ hội thể hiện sự giao lưu nhưng vẫn mang bản sắc riêng của từng cộng đồng.", keyPoints: ["Tôn giáo lan truyền qua giao lưu và thương mại", "Yếu tố ngoại lai được tiếp biến theo văn hóa địa phương", "Di sản kiến trúc phản ánh trình độ và quan hệ khu vực"], example: "Khi so sánh hai di tích, chú ý cả ảnh hưởng chung và đặc điểm sáng tạo bản địa." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g7-history-07", grade: 7, strand: "history",
    title: "Vương quốc Lào",
    summary: "Bài học tìm hiểu sự hình thành vương quốc Lan Xang vào thế kỉ XIV, một số giai đoạn phát triển và nét chính về kinh tế, xã hội, văn hóa của cư dân Lào. Học sinh nhận biết vai trò của vị trí lưu vực sông Mê Công, Phật giáo Theravada và quan hệ với các nước láng giềng.",
    learningObjectives: ["Nêu được mốc hình thành vương quốc Lan Xang và vai trò của Pha Ngừm.", "Trình bày được một số nét chính về kinh tế, xã hội và văn hóa của Lào thời phong kiến.", "Nhận biết được một số biểu hiện giao lưu và quan hệ của Lào với các quốc gia trong khu vực."],
    sections: [
      { heading: "Sự hình thành Lan Xang", body: "Giữa thế kỉ XIV, Pha Ngừm thống nhất nhiều mường và lập vương quốc Lan Xang năm 1353. Vương quốc hình thành trong không gian lưu vực sông Mê Công, nơi có các thung lũng thuận lợi cho cư trú và trồng lúa. Việc củng cố quyền lực trung ương diễn ra cùng quá trình liên kết các cộng đồng địa phương.", keyPoints: ["Lan Xang được thành lập năm 1353", "Pha Ngừm là nhân vật gắn với quá trình thống nhất", "Lưu vực sông Mê Công có ý nghĩa đối với cư trú và sản xuất"], example: "Xác định lưu vực Mê Công trên bản đồ để hiểu không gian hình thành vương quốc." },
      { heading: "Kinh tế, xã hội và các giai đoạn phát triển", body: "Nông nghiệp lúa nước giữ vai trò quan trọng, bên cạnh chăn nuôi, thủ công nghiệp và trao đổi hàng hóa. Vương quốc có những thời kì củng cố và mở rộng dưới các vị vua khác nhau; thời vua Xệt-thả-thi-lạt thường được nhắc đến với việc tăng cường quốc phòng và xây dựng công trình. Địa hình núi và thung lũng tạo nên sự phân bố dân cư không đồng đều.", keyPoints: ["Nông nghiệp là nền tảng kinh tế", "Thủ công nghiệp và trao đổi bổ sung nguồn lực", "Các vua có vai trò khác nhau trong củng cố vương quốc"], example: "So sánh nơi cư trú ở thung lũng sông với vùng núi cao để giải thích khác biệt sản xuất." },
      { heading: "Văn hóa và quan hệ khu vực", body: "Phật giáo Theravada có ảnh hưởng sâu rộng trong đời sống tinh thần, thể hiện qua chùa tháp, lễ hội và nghệ thuật. Văn hóa Lào tiếp nhận một số yếu tố khu vực nhưng vẫn phát triển bản sắc riêng. Lan Xang có quan hệ với các vương quốc láng giềng, khi hợp tác và giao lưu, khi xảy ra cạnh tranh về lãnh thổ và ảnh hưởng.", keyPoints: ["Phật giáo Theravada có vai trò nổi bật", "Chùa tháp và lễ hội là biểu hiện văn hóa", "Quan hệ khu vực vừa có giao lưu vừa có cạnh tranh"], example: "Khi tìm hiểu một ngôi chùa Lào, chú ý kiến trúc, tượng thờ và vai trò của chùa trong cộng đồng." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g7-history-08", grade: 7, strand: "history",
    title: "Vương quốc Cam-pu-chia",
    summary: "Bài học khái quát sự hình thành và phát triển của vương quốc Khmer, thời kì Angkor, những thành tựu về kiến trúc, thủy lợi và văn hóa, cùng sự biến đổi của trung tâm quyền lực từ thế kỉ XV. Học sinh nhận biết mối liên hệ giữa điều kiện tự nhiên, sản xuất nông nghiệp và tổ chức nhà nước.",
    learningObjectives: ["Nêu được một số mốc chính trong quá trình hình thành và phát triển của vương quốc Khmer.", "Trình bày được nét chính về kinh tế, tổ chức xã hội và thành tựu văn hóa thời Angkor.", "Giải thích được vai trò của hệ thống thủy lợi và sự biến đổi của vương quốc từ thế kỉ XV."],
    sections: [
      { heading: "Hình thành và phát triển thời Angkor", body: "Vương quốc Khmer phát triển mạnh từ đầu thế kỉ IX, gắn với quá trình xác lập quyền lực của Jayavarman II và các vua kế tiếp. Khu vực Angkor trở thành trung tâm chính trị, tôn giáo và xây dựng trong nhiều thế kỉ. Phạm vi ảnh hưởng của vương quốc thay đổi theo từng thời kì và có quan hệ phức tạp với các nước láng giềng.", keyPoints: ["Thời Angkor bắt đầu từ đầu thế kỉ IX", "Angkor là trung tâm quyền lực và văn hóa quan trọng", "Lãnh thổ và ảnh hưởng thay đổi theo từng giai đoạn"], example: "Dùng bản đồ lịch sử để so sánh phạm vi ảnh hưởng ở các thời điểm khác nhau." },
      { heading: "Kinh tế, thủy lợi và xã hội", body: "Nông nghiệp lúa nước dựa vào hệ thống sông, hồ và công trình điều tiết nước. Các hồ chứa, kênh dẫn và đê điều hỗ trợ sản xuất ở một số khu vực. Thủ công nghiệp, trao đổi hàng hóa và việc xây dựng đền tháp cũng góp phần tạo nên nguồn lực và tổ chức xã hội của vương quốc.", keyPoints: ["Nông nghiệp lúa nước là nền tảng", "Công trình thủy lợi giúp điều tiết và phân phối nước", "Xây dựng đền tháp cần nguồn lực và tổ chức lao động"], example: "Liên hệ hồ chứa và kênh dẫn với nhu cầu sản xuất ở vùng có mùa mưa, mùa khô." },
      { heading: "Di sản văn hóa và biến đổi sau Angkor", body: "Angkor Wat được xây dựng vào đầu thế kỉ XII dưới thời Suryavarman II; Angkor Thom gắn với thời Jayavarman VII. Kiến trúc, điêu khắc và quy hoạch đô thị phản ánh trình độ nghệ thuật Khmer. Từ thế kỉ XV, trung tâm quyền lực dần chuyển khỏi Angkor trong bối cảnh nhiều biến động chính trị, kinh tế và môi trường; văn hóa Khmer vẫn tiếp tục phát triển.", keyPoints: ["Angkor Wat gắn với Suryavarman II", "Angkor Thom gắn với Jayavarman VII", "Sự chuyển dịch trung tâm không đồng nghĩa văn hóa Khmer biến mất"], example: "Khi giới thiệu di sản Angkor, cần ghi đúng công trình, thời kì và bối cảnh xây dựng." }
    ],
    questions: [], status: 'draft',
  },

  {
    id: "g7-history-09", grade: 7, strand: "history",
    title: "Đất nước buổi đầu độc lập (939 - 967)",
    summary: "Bài học tìm hiểu tình hình Đại Việt sau chiến thắng Bạch Đằng năm 938 và quá trình củng cố nền tự chủ trong các năm 939–967. Học sinh nhận biết vai trò của Ngô Quyền, những khó khăn sau khi ông mất và nguyên nhân dẫn đến tình trạng 12 sứ quân.",
    learningObjectives: ["Trình bày được ý nghĩa của chiến thắng Bạch Đằng năm 938 đối với nền tự chủ.", "Nêu được những việc làm chính của Ngô Quyền trong buổi đầu xây dựng chính quyền độc lập.", "Giải thích được bối cảnh xuất hiện tình trạng 12 sứ quân và yêu cầu thống nhất đất nước."],
    sections: [
      { heading: "Chiến thắng Bạch Đằng và nền tự chủ", body: "Năm 938, Ngô Quyền chỉ huy quân dân đánh bại quân Nam Hán trên sông Bạch Đằng. Chiến thắng chấm dứt âm mưu tái lập ách thống trị của Nam Hán, tạo điều kiện cho đất nước bước vào thời kì tự chủ lâu dài. Năm 939, Ngô Quyền xưng vương, đóng đô ở Cổ Loa và tổ chức chính quyền riêng.", keyPoints: ["Chiến thắng Bạch Đằng diễn ra năm 938", "Năm 939 Ngô Quyền xưng vương", "Cổ Loa là trung tâm chính quyền buổi đầu"], example: "Trên dòng thời gian, đặt chiến thắng năm 938 trước việc tổ chức chính quyền năm 939." },
      { heading: "Những khó khăn sau khi Ngô Quyền mất", body: "Sau khi Ngô Quyền mất năm 944, triều đình xảy ra tranh chấp quyền lực. Dương Tam Kha nắm quyền trong một thời gian; các thế lực địa phương nổi lên, khiến đất nước bị chia cắt. Tình trạng 12 sứ quân phản ánh sự suy yếu của chính quyền trung ương và nhu cầu thống nhất lãnh thổ.", keyPoints: ["Năm 944 Ngô Quyền mất", "Tranh chấp quyền lực làm chính quyền suy yếu", "Nhiều sứ quân kiểm soát các vùng khác nhau"], example: "Dùng bản đồ khái quát để đánh dấu các vùng do sứ quân kiểm soát, không coi đó là ranh giới quốc gia cố định." },
      { heading: "Yêu cầu thống nhất đất nước", body: "Tình trạng cát cứ gây khó khăn cho sản xuất, giao thông và đời sống cư dân. Nhu cầu hòa bình và thống nhất tạo điều kiện cho lực lượng có khả năng tập hợp các địa phương đứng lên. Đến năm 967, Đinh Bộ Lĩnh cơ bản dẹp yên các thế lực cát cứ, mở đường cho việc thành lập nhà nước Đại Cồ Việt năm 968.", keyPoints: ["Cát cứ làm đời sống và quản lí đất nước bất ổn", "Thống nhất là yêu cầu cấp thiết", "Năm 967 gắn với việc dẹp loạn 12 sứ quân"], example: "Phân tích mối liên hệ giữa cát cứ, bất ổn xã hội và nhu cầu xây dựng chính quyền thống nhất." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g7-history-10", grade: 7, strand: "history",
    title: "Đại Cồ Việt thời Đinh và Tiền Lê (968 - 1009)",
    summary: "Bài học tìm hiểu quá trình thành lập nhà nước Đại Cồ Việt, tổ chức chính quyền thời Đinh và Tiền Lê, cùng cuộc kháng chiến chống Tống năm 981. Học sinh nhận biết vai trò của Hoa Lư, sự củng cố nền độc lập và một số nét kinh tế, văn hóa.",
    learningObjectives: ["Nêu được sự thành lập nhà nước Đại Cồ Việt năm 968 và vai trò của Đinh Bộ Lĩnh.", "Trình bày được một số nét chính về tổ chức nhà nước thời Đinh và Tiền Lê.", "Mô tả được cuộc kháng chiến chống Tống năm 981 và một số thành tựu kinh tế, văn hóa."],
    sections: [
      { heading: "Nhà nước Đại Cồ Việt thời Đinh", body: "Sau khi dẹp loạn 12 sứ quân, năm 968 Đinh Bộ Lĩnh lên ngôi hoàng đế, đặt quốc hiệu Đại Cồ Việt và đóng đô ở Hoa Lư. Nhà nước xây dựng bộ máy quản lí từ trung ương đến địa phương, tổ chức quân đội và quy định trật tự xã hội. Việc xưng đế và đặt quốc hiệu thể hiện ý thức độc lập, tự chủ.", keyPoints: ["Năm 968 thành lập nhà nước Đại Cồ Việt", "Đinh Bộ Lĩnh xưng hoàng đế", "Hoa Lư là kinh đô"], example: "Khi đọc bản đồ, xác định Hoa Lư ở vùng núi đá vôi Ninh Bình, có vị trí thuận lợi cho phòng thủ." },
      { heading: "Thời Tiền Lê và kháng chiến chống Tống", body: "Năm 979, Đinh Tiên Hoàng và người kế vị bị sát hại, triều đình đứng trước nguy cơ mất ổn định. Lê Hoàn được suy tôn lên ngôi năm 980, lập nhà Tiền Lê. Năm 981, quân dân Đại Cồ Việt đánh bại cuộc xâm lược của nhà Tống, bảo vệ nền độc lập và củng cố vị thế của nhà nước.", keyPoints: ["Nhà Tiền Lê bắt đầu năm 980", "Lê Hoàn lãnh đạo cuộc kháng chiến năm 981", "Thắng lợi bảo vệ nền tự chủ"], example: "Sắp xếp các mốc 968, 979, 980 và 981 để thấy biến động kế vị và yêu cầu bảo vệ đất nước." },
      { heading: "Kinh tế và văn hóa", body: "Nhà nước chú ý khuyến khích sản xuất nông nghiệp, khai hoang, làm thủy lợi và tổ chức lễ cày ruộng. Thủ công nghiệp, trao đổi trong nước và giao thương với bên ngoài tiếp tục phát triển. Phật giáo có ảnh hưởng đáng kể; chùa chiền và hoạt động văn hóa phản ánh sự gắn bó giữa nhà nước, cộng đồng và tôn giáo.", keyPoints: ["Nông nghiệp giữ vai trò nền tảng", "Nhà nước quan tâm thủy lợi và sản xuất", "Phật giáo có ảnh hưởng trong đời sống văn hóa"], example: "Liên hệ việc làm thủy lợi với nhu cầu ổn định sản xuất ở vùng đồng bằng." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g7-history-11", grade: 7, strand: "history",
    title: "Nhà Lý xây dựng và phát triển đất nước (1009 - 1225)",
    summary: "Bài học tìm hiểu sự thành lập nhà Lý, quyết định dời đô ra Thăng Long năm 1010 và quá trình củng cố nhà nước trong hơn hai thế kỉ. Học sinh nhận biết những nét chính về luật pháp, quân đội, nông nghiệp, Phật giáo và sự phát triển văn hóa thời Lý.",
    learningObjectives: ["Nêu được sự thành lập nhà Lý và ý nghĩa của việc dời đô ra Thăng Long.", "Trình bày được một số chính sách xây dựng chính quyền, pháp luật và phát triển kinh tế.", "Nhận biết được vai trò của Phật giáo và một số thành tựu văn hóa thời Lý."],
    sections: [
      { heading: "Thành lập nhà Lý và dời đô", body: "Năm 1009, Lý Công Uẩn được tôn lên ngôi, mở đầu triều Lý. Năm 1010, ông quyết định dời đô từ Hoa Lư ra Đại La và đổi tên thành Thăng Long. Vị trí mới có điều kiện giao thông, đất đai và khả năng mở rộng đô thị thuận lợi hơn, tạo cơ sở cho sự phát triển lâu dài của quốc gia.", keyPoints: ["Nhà Lý thành lập năm 1009", "Dời đô ra Thăng Long năm 1010", "Thăng Long trở thành trung tâm chính trị lâu dài"], example: "So sánh Hoa Lư với Thăng Long theo địa hình, giao thông và khả năng phát triển đô thị." },
      { heading: "Xây dựng chính quyền và phát triển kinh tế", body: "Nhà Lý củng cố bộ máy trung ương và địa phương, tổ chức quân đội và ban hành bộ Hình thư năm 1042. Nhà nước quan tâm nông nghiệp thông qua khai hoang, đắp đê, làm thủy lợi và khuyến khích sản xuất. Thủ công nghiệp và thương mại phát triển ở kinh đô và một số trung tâm.", keyPoints: ["Hình thư được ban hành năm 1042", "Nhà nước củng cố hành chính và quân đội", "Nông nghiệp, thủ công nghiệp và trao đổi cùng phát triển"], example: "Liên hệ việc đắp đê với yêu cầu bảo vệ đồng ruộng ở vùng sông ngòi." },
      { heading: "Đời sống văn hóa thời Lý", body: "Phật giáo có vị trí quan trọng trong xã hội và được triều đình bảo trợ ở nhiều giai đoạn. Chùa, tháp, tượng và đồ gốm phản ánh trình độ nghệ thuật. Giáo dục Nho học từng bước phát triển; năm 1070, Văn Miếu được xây dựng, năm 1075 có khoa thi đầu tiên được ghi nhận dưới triều Lý.", keyPoints: ["Phật giáo có ảnh hưởng sâu rộng", "Văn Miếu được xây dựng năm 1070", "Khoa thi đầu tiên dưới triều Lý diễn ra năm 1075"], example: "Khi tìm hiểu một di tích, đặt công trình trong bối cảnh chính trị, tôn giáo và giáo dục thời Lý." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g7-history-12", grade: 7, strand: "history",
    title: "Cuộc kháng chiến chống quân xâm lược Tống (1075 - 1077)",
    summary: "Bài học tìm hiểu bối cảnh, diễn biến chính và kết quả cuộc kháng chiến chống Tống thời Lý. Học sinh nhận biết chủ trương chủ động phòng vệ, vai trò của Lý Thường Kiệt, phòng tuyến sông Như Nguyệt và nghệ thuật kết thúc chiến tranh bằng biện pháp phù hợp.",
    learningObjectives: ["Trình bày được bối cảnh và chủ trương đối phó với âm mưu xâm lược của nhà Tống.", "Mô tả được những nét chính của cuộc tiến công năm 1075 và phòng tuyến Như Nguyệt năm 1077.", "Đánh giá được ý nghĩa của thắng lợi đối với nền độc lập và nghệ thuật quân sự Đại Việt."],
    sections: [
      { heading: "Bối cảnh và chủ trương chủ động phòng vệ", body: "Cuối thế kỉ XI, nhà Tống chuẩn bị xâm lược Đại Việt và liên kết với một số lực lượng ở khu vực. Trước tình hình đó, triều Lý tổ chức lực lượng và chủ trương tiến công trước vào các căn cứ chuẩn bị chiến tranh của đối phương năm 1075, sau đó rút quân về xây dựng thế phòng thủ. Chủ trương này nhằm phá thế chuẩn bị của địch và bảo vệ đất nước.", keyPoints: ["Nhà Tống chuẩn bị xâm lược", "Lý Thường Kiệt giữ vai trò chỉ huy quan trọng", "Cuộc tiến công năm 1075 nhằm phá căn cứ chuẩn bị của đối phương"], example: "Phân biệt cuộc tiến công vào căn cứ chuẩn bị chiến tranh với mục tiêu chiếm đóng lâu dài." },
      { heading: "Phòng tuyến sông Như Nguyệt", body: "Năm 1077, quân Tống tiến vào Đại Việt và bị chặn lại ở phòng tuyến sông Như Nguyệt. Quân dân Đại Việt tận dụng địa hình, tổ chức phòng thủ, đánh vào những thời điểm thuận lợi và làm suy giảm sức tiến công của đối phương. Cuộc kháng chiến thể hiện sự phối hợp giữa chỉ huy, quân đội và nhân dân.", keyPoints: ["Phòng tuyến Như Nguyệt là vị trí phòng thủ quan trọng", "Địa hình sông ngòi hỗ trợ tổ chức phòng thủ", "Sự phối hợp quân dân có ý nghĩa lớn"], example: "Trên bản đồ, xác định sông Như Nguyệt và giải thích vì sao sông có thể trở thành tuyến phòng thủ." },
      { heading: "Kết quả và ý nghĩa", body: "Sau những tổn thất và khó khăn, quân Tống phải rút lui; triều Lý chủ động kết thúc chiến tranh bằng biện pháp ngoại giao phù hợp. Thắng lợi bảo vệ nền độc lập, củng cố nhà nước và để lại kinh nghiệm về chủ động chuẩn bị, tận dụng địa hình, phối hợp lực lượng và kết hợp quân sự với ngoại giao.", keyPoints: ["Cuộc kháng chiến kết thúc thắng lợi năm 1077", "Đại Việt giữ vững nền độc lập", "Quân sự và ngoại giao được kết hợp"], example: "Khi đánh giá kết quả, xem cả việc bảo vệ lãnh thổ và cách kết thúc chiến tranh." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g7-history-13", grade: 7, strand: "history",
    title: "Đại Việt thời Trần (1226 - 1400)",
    summary: "Bài học khái quát sự thành lập triều Trần, tổ chức nhà nước, kinh tế và văn hóa Đại Việt trong các thế kỉ XIII–XIV. Học sinh nhận biết bối cảnh ba cuộc kháng chiến chống Mông - Nguyên, những biến đổi cuối triều Trần và sự chuyển tiếp sang nhà Hồ.",
    learningObjectives: ["Nêu được sự thành lập nhà Trần và một số nét chính về tổ chức chính quyền.", "Trình bày được khái quát tình hình kinh tế, xã hội và văn hóa Đại Việt thời Trần.", "Nhận biết được vai trò của các cuộc kháng chiến và những khó khăn cuối triều Trần."],
    sections: [
      { heading: "Thành lập và tổ chức nhà nước", body: "Năm 1226, Trần Cảnh lên ngôi, mở đầu triều Trần. Nhà Trần tổ chức bộ máy chính quyền từ trung ương đến địa phương, chú trọng quân đội và sự tham gia của hoàng tộc trong quản lí. Chế độ Thái thượng hoàng được sử dụng ở một số thời điểm, tạo sự chuyển giao quyền lực trong hoàng tộc.", keyPoints: ["Triều Trần bắt đầu năm 1226", "Hoàng tộc giữ vai trò lớn trong bộ máy nhà nước", "Quân đội được chú trọng"], example: "Vẽ sơ đồ đơn giản thể hiện quan hệ giữa vua, hoàng tộc và các cơ quan quản lí." },
      { heading: "Kinh tế, xã hội và văn hóa", body: "Nông nghiệp được khuyến khích qua khai hoang, lập điền trang và xây dựng công trình thủy lợi. Thủ công nghiệp và thương mại phát triển ở một số trung tâm. Phật giáo, Nho giáo và tín ngưỡng dân gian cùng tồn tại; chữ Nôm, văn học và nghệ thuật có bước phát triển, phản ánh đời sống tinh thần phong phú.", keyPoints: ["Nông nghiệp tiếp tục là nền tảng", "Thủ công nghiệp và thương mại phát triển", "Văn học, chữ viết và tôn giáo có nhiều biểu hiện đa dạng"], example: "Liên hệ việc đắp đê và thủy lợi với nhu cầu bảo vệ sản xuất trước lũ." },
      { heading: "Biến động cuối triều Trần", body: "Từ cuối thế kỉ XIV, triều đình gặp khó khăn về tài chính, xã hội và quyền lực. Một số cuộc nổi dậy nông dân diễn ra; Hồ Quý Ly ngày càng nắm nhiều quyền lực và đến năm 1400 lập nhà Hồ. Những biến động này cho thấy sự suy yếu của triều Trần và yêu cầu cải tổ nhà nước.", keyPoints: ["Cuối thế kỉ XIV xuất hiện nhiều khó khăn", "Quyền lực của Hồ Quý Ly tăng lên", "Năm 1400 nhà Hồ thay thế nhà Trần"], example: "Khi giải thích sự thay đổi triều đại, xem xét cả vấn đề chính trị, kinh tế và xã hội." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g7-history-14", grade: 7, strand: "history",
    title: "Ba lần kháng chiến chống quân xâm lược Mông - Nguyên",
    summary: "Bài học tìm hiểu ba cuộc kháng chiến của Đại Việt chống quân Mông - Nguyên vào các năm 1258, 1285 và 1287–1288. Học sinh nhận biết vai trò của nhà Trần, Trần Hưng Đạo, hội nghị Diên Hồng, chiến thuật phù hợp và chiến thắng Bạch Đằng năm 1288.",
    learningObjectives: ["Nêu được thời gian và bối cảnh ba lần quân Mông - Nguyên xâm lược Đại Việt.", "Trình bày được một số sự kiện và nhân vật tiêu biểu trong các cuộc kháng chiến.", "Phân tích được nguyên nhân thắng lợi và ý nghĩa lịch sử của các cuộc kháng chiến."],
    sections: [
      { heading: "Ba lần xâm lược của quân Mông - Nguyên", body: "Quân Mông Cổ tiến vào Đại Việt lần thứ nhất năm 1258. Nhà Nguyên tiếp tục xâm lược lần thứ hai năm 1285 và lần thứ ba trong các năm 1287–1288. Mỗi cuộc xâm lược có quy mô, hướng tiến công và bối cảnh khác nhau, nhưng đều gặp sự kháng cự quyết liệt của quân dân Đại Việt.", keyPoints: ["Lần thứ nhất: 1258", "Lần thứ hai: 1285", "Lần thứ ba: 1287–1288"], example: "Lập bảng ba lần xâm lược theo thời gian, lực lượng và kết quả." },
      { heading: "Tổ chức kháng chiến và những trận đánh tiêu biểu", body: "Nhà Trần chuẩn bị lực lượng, tổ chức hội nghị Bình Than và Diên Hồng, phát huy vai trò của các tướng lĩnh và nhân dân. Trần Hưng Đạo giữ vai trò chỉ huy quan trọng; chiến thuật rút lui bảo toàn lực lượng, thực hiện kế sách vườn không nhà trống và phản công khi đối phương suy yếu được vận dụng linh hoạt. Các trận Hàm Tử, Chương Dương, Tây Kết và Bạch Đằng là những mốc tiêu biểu.", keyPoints: ["Hội nghị Diên Hồng thể hiện sự đồng lòng của triều đình và nhân dân", "Trần Hưng Đạo là người chỉ huy tiêu biểu", "Chiến thuật linh hoạt kết hợp phòng thủ và phản công"], example: "Phân tích vì sao việc tránh đối đầu bất lợi ban đầu có thể tạo điều kiện phản công sau đó." },
      { heading: "Chiến thắng Bạch Đằng và ý nghĩa", body: "Năm 1288, quân dân Đại Việt đánh bại đoàn thuyền chiến của quân Nguyên trên sông Bạch Đằng bằng cách tận dụng địa hình, thủy triều và bãi cọc. Thắng lợi kết thúc cuộc xâm lược lần thứ ba, bảo vệ nền độc lập và thể hiện sức mạnh đoàn kết, nghệ thuật quân sự cùng khả năng tổ chức của nhà Trần.", keyPoints: ["Chiến thắng Bạch Đằng diễn ra năm 1288", "Địa hình và thủy triều được vận dụng trong trận đánh", "Ba lần kháng chiến bảo vệ nền độc lập"], example: "Đọc sơ đồ sông Bạch Đằng để nhận biết vai trò của dòng chảy và thủy triều trong bố trí trận địa." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g7-history-15", grade: 7, strand: "history",
    title: "Nước Đại Ngu thời Hồ (1400 - 1407)",
    summary: "Bài học tìm hiểu sự thành lập nhà Hồ, một số cải cách của Hồ Quý Ly và cuộc kháng chiến chống quân Minh đầu thế kỉ XV. Học sinh đánh giá được mục tiêu, điểm tiến bộ, hạn chế và nguyên nhân khiến nhà Hồ không giữ được nền độc lập.",
    learningObjectives: ["Nêu được hoàn cảnh thành lập nhà Hồ và quốc hiệu Đại Ngu.", "Trình bày được một số nội dung cải cách về chính trị, kinh tế, xã hội và giáo dục.", "Mô tả được cuộc kháng chiến chống Minh và nhận biết nguyên nhân thất bại."],
    sections: [
      { heading: "Thành lập nhà Hồ", body: "Cuối thế kỉ XIV, Hồ Quý Ly nắm nhiều quyền lực trong triều Trần. Năm 1400, ông lên ngôi, lập nhà Hồ và đổi quốc hiệu thành Đại Ngu. Triều đình chuyển trung tâm về Tây Đô ở Thanh Hóa, xây dựng thành lũy và tổ chức lại một số cơ quan nhà nước.", keyPoints: ["Nhà Hồ thành lập năm 1400", "Quốc hiệu là Đại Ngu", "Tây Đô là trung tâm chính trị quan trọng"], example: "Xác định vị trí Tây Đô trên bản đồ và liên hệ với yêu cầu phòng thủ." },
      { heading: "Cải cách của Hồ Quý Ly", body: "Nhà Hồ thực hiện nhiều cải cách về hành chính, tài chính, ruộng đất, giáo dục và quân sự. Một số chính sách gồm phát hành tiền giấy, hạn chế sở hữu ruộng đất của quý tộc theo quy định, điều chỉnh tổ chức bộ máy và chú ý phát triển vũ khí, thành lũy. Cải cách thể hiện nỗ lực giải quyết khó khăn nhưng triển khai trong thời gian ngắn và gặp nhiều phản ứng.", keyPoints: ["Cải cách diễn ra trên nhiều lĩnh vực", "Tiền giấy là một chính sách tài chính đáng chú ý", "Tác động và mức độ thực hiện còn hạn chế"], example: "Khi đánh giá một cải cách, xem mục tiêu, cách thực hiện, thời gian và phản ứng xã hội." },
      { heading: "Kháng chiến chống Minh và kết cục", body: "Năm 1406, nhà Minh tiến hành xâm lược Đại Ngu. Nhà Hồ tổ chức phòng thủ nhưng không tạo được sự liên kết rộng rãi và sức huy động cần thiết; đến năm 1407, cuộc kháng chiến thất bại, nhà Hồ sụp đổ. Sự kiện mở đầu thời kì nước ta bị nhà Minh đô hộ, đồng thời đặt ra yêu cầu mới về đấu tranh giành độc lập.", keyPoints: ["Nhà Minh xâm lược năm 1406", "Năm 1407 nhà Hồ thất bại", "Đoàn kết và sự ủng hộ của nhân dân có ý nghĩa quyết định"], example: "Phân tích thất bại cần xem cả tương quan lực lượng, cách tổ chức kháng chiến và sự ủng hộ xã hội." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g7-history-16", grade: 7, strand: "history",
    title: "Khởi nghĩa Lam Sơn (1418 - 1427)",
    summary: "Bài học tìm hiểu bối cảnh, quá trình phát triển và thắng lợi của khởi nghĩa Lam Sơn do Lê Lợi lãnh đạo. Học sinh nhận biết vai trò của Nguyễn Trãi, các trận đánh tiêu biểu và nghệ thuật kết hợp quân sự, chính trị, ngoại giao trong cuộc đấu tranh chống quân Minh.",
    learningObjectives: ["Nêu được bối cảnh bùng nổ và những năm đầu gian khó của khởi nghĩa Lam Sơn.", "Trình bày được các bước phát triển và một số chiến thắng tiêu biểu giai đoạn 1424–1427.", "Giải thích được nguyên nhân thắng lợi và ý nghĩa của khởi nghĩa Lam Sơn."],
    sections: [
      { heading: "Bùng nổ và những năm đầu", body: "Năm 1418, Lê Lợi dựng cờ khởi nghĩa tại Lam Sơn, Thanh Hóa, chống ách đô hộ của nhà Minh. Những năm đầu, nghĩa quân gặp nhiều khó khăn về lực lượng, lương thực và địa bàn hoạt động, phải nhiều lần rút lên vùng núi Chí Linh. Nguyễn Trãi tham gia hoạch định đường lối và công tác chính trị, góp phần tập hợp lực lượng.", keyPoints: ["Khởi nghĩa bắt đầu năm 1418", "Lê Lợi là người lãnh đạo", "Nguyễn Trãi có đóng góp về chiến lược và chính trị"], example: "Trên bản đồ Thanh Hóa, xác định Lam Sơn và Chí Linh để hiểu địa bàn hoạt động ban đầu." },
      { heading: "Mở rộng địa bàn và chuyển biến", body: "Từ năm 1424, nghĩa quân chuyển hướng hoạt động vào Nghệ An, mở rộng lực lượng và địa bàn. Các chiến thắng ở Nghệ An, Tân Bình và Thuận Hóa tạo thế đứng vững chắc. Năm 1426, nghĩa quân tiến ra Bắc, giành thắng lợi tại Tốt Động – Chúc Động, làm thay đổi tương quan lực lượng.", keyPoints: ["Năm 1424 mở rộng hoạt động vào Nghệ An", "Lực lượng nghĩa quân phát triển", "Tốt Động – Chúc Động là thắng lợi quan trọng năm 1426"], example: "Đọc bản đồ tuyến tiến quân để nhận biết sự thay đổi địa bàn từ Thanh Hóa ra Bắc." },
      { heading: "Thắng lợi và ý nghĩa", body: "Năm 1427, nghĩa quân giành thắng lợi tại Chi Lăng – Xương Giang, đánh bại các đạo viện binh của nhà Minh. Kết hợp thắng lợi quân sự với đấu tranh ngoại giao, cuộc khởi nghĩa kết thúc thắng lợi, chấm dứt ách đô hộ của nhà Minh và mở đường cho việc khôi phục nền độc lập dưới triều Lê sơ.", keyPoints: ["Chi Lăng – Xương Giang là thắng lợi tiêu biểu năm 1427", "Quân sự kết hợp với ngoại giao", "Khởi nghĩa kết thúc thắng lợi, khôi phục nền độc lập"], example: "Phân tích vai trò của việc đánh bại viện binh và thương lượng trong việc kết thúc chiến tranh." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g7-history-17", grade: 7, strand: "history",
    title: "Đại Việt thời Lê sơ (1428 - 1527)",
    summary: "Bài học tìm hiểu quá trình khôi phục và phát triển đất nước dưới triều Lê sơ từ năm 1428 đến năm 1527. Học sinh nhận biết cải cách hành chính, luật pháp, quân đội, giáo dục, kinh tế và thành tựu văn hóa, đặc biệt dưới thời Lê Thánh Tông.",
    learningObjectives: ["Nêu được sự thành lập triều Lê sơ sau thắng lợi của khởi nghĩa Lam Sơn.", "Trình bày được một số chính sách xây dựng nhà nước và phát triển kinh tế, giáo dục.", "Nhận biết được thành tựu văn hóa và nguyên nhân suy yếu cuối thời Lê sơ."],
    sections: [
      { heading: "Khôi phục đất nước và xây dựng chính quyền", body: "Năm 1428, Lê Lợi lên ngôi hoàng đế, mở đầu triều Lê sơ. Nhà nước khôi phục sản xuất, ổn định xã hội, tổ chức lại bộ máy hành chính và quân đội. Dưới thời Lê Thánh Tông, các cải cách được đẩy mạnh, đơn vị hành chính được tổ chức chặt chẽ hơn và quyền lực trung ương được củng cố.", keyPoints: ["Triều Lê sơ bắt đầu năm 1428", "Nhà nước chú trọng khôi phục sau chiến tranh", "Cải cách thời Lê Thánh Tông tăng cường quản lí"], example: "So sánh tổ chức chính quyền trước và sau cải cách để thấy xu hướng tập trung quyền lực." },
      { heading: "Kinh tế, luật pháp và giáo dục", body: "Nhà nước quan tâm ruộng đất, đê điều, khai hoang và sản xuất nông nghiệp. Thủ công nghiệp, thương mại và các đô thị tiếp tục phát triển. Quốc triều hình luật, thường gọi là luật Hồng Đức, được hoàn thiện dưới thời Lê Thánh Tông; khoa cử Nho học và việc xây dựng Văn Miếu - Quốc Tử Giám góp phần phát triển giáo dục.", keyPoints: ["Nông nghiệp được khôi phục và mở rộng", "Luật Hồng Đức là bộ luật tiêu biểu thời Lê sơ", "Khoa cử và giáo dục Nho học phát triển"], example: "Khi tìm hiểu luật Hồng Đức, chú ý chức năng quản lí xã hội và những quy định về nhiều lĩnh vực đời sống." },
      { heading: "Văn hóa và biến động cuối triều", body: "Văn học chữ Hán và chữ Nôm, sử học, địa lí, nghệ thuật và kiến trúc có nhiều thành tựu. Từ đầu thế kỉ XVI, mâu thuẫn trong triều đình, tranh chấp quyền lực và khó khăn xã hội làm nhà Lê suy yếu. Năm 1527, Mạc Đăng Dung lập triều Mạc, kết thúc thời Lê sơ.", keyPoints: ["Văn học và sử học có nhiều thành tựu", "Đầu thế kỉ XVI triều đình suy yếu", "Năm 1527 triều Mạc thay thế triều Lê sơ"], example: "Phân biệt giai đoạn phát triển mạnh với giai đoạn suy yếu khi trình bày lịch sử một triều đại." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g7-history-18", grade: 7, strand: "history",
    title: "Vương quốc Chăm-pa và vùng đất Nam Bộ từ đầu thế kỉ X đến thế kỉ XVI",
    summary: "Bài học tìm hiểu những biến đổi của vương quốc Chăm-pa và vùng đất Nam Bộ trong giai đoạn từ đầu thế kỉ X đến thế kỉ XVI. Học sinh nhận biết sự đa dạng về cư dân, kinh tế, tôn giáo, thương mại và quan hệ giữa các cộng đồng, tránh đồng nhất lịch sử Nam Bộ với lịch sử một vương quốc duy nhất.",
    learningObjectives: ["Trình bày được một số nét chính về sự biến đổi của Chăm-pa từ đầu thế kỉ X đến thế kỉ XVI.", "Nhận biết được đặc điểm cư dân, kinh tế và giao lưu văn hóa ở vùng đất Nam Bộ trong giai đoạn.", "Phân tích được tác động của giao lưu, xung đột và biến đổi chính trị đối với các cộng đồng trong khu vực."],
    sections: [
      { heading: "Vương quốc Chăm-pa trong giai đoạn", body: "Từ đầu thế kỉ X đến thế kỉ XVI, Chăm-pa trải qua nhiều biến động về trung tâm quyền lực, phạm vi lãnh thổ và quan hệ với các nước láng giềng. Các trung tâm như Vijaya, Kauthara và Panduranga có vai trò ở những thời kì khác nhau. Năm 1471, trung tâm Vijaya thất thủ trước quân Đại Việt, tạo ra biến đổi lớn về chính trị và lãnh thổ Chăm-pa.", keyPoints: ["Chăm-pa có nhiều trung tâm quyền lực theo từng giai đoạn", "Năm 1471 là mốc biến động quan trọng", "Cộng đồng Chăm tiếp tục tồn tại và phát triển sau biến động"], example: "Dùng bản đồ lịch sử để theo dõi sự thay đổi phạm vi ảnh hưởng thay vì xem biên giới là cố định." },
      { heading: "Cư dân và hoạt động kinh tế ở Nam Bộ", body: "Vùng đất Nam Bộ có lịch sử cư trú lâu dài và đa dạng cộng đồng. Trong giai đoạn này, cư dân Khmer và các nhóm cư dân khác sinh sống, canh tác ở đồng bằng, khai thác nguồn lợi sông nước và tham gia trao đổi hàng hóa. Mạng lưới sông ngòi, cửa biển và các tuyến thương mại góp phần kết nối khu vực với những vùng lân cận.", keyPoints: ["Nam Bộ có nhiều cộng đồng cư dân và truyền thống khác nhau", "Nông nghiệp và khai thác nguồn lợi sông nước có vai trò quan trọng", "Sông ngòi và cửa biển hỗ trợ giao lưu"], example: "Đọc bản đồ sông Tiền, sông Hậu và bờ biển để hiểu điều kiện cư trú, sản xuất và giao thông." },
      { heading: "Giao lưu văn hóa và biến đổi khu vực", body: "Chăm-pa, Khmer và Đại Việt có những thời kì giao lưu, trao đổi, cạnh tranh và xung đột. Hindu giáo, Phật giáo và các tín ngưỡng bản địa để lại dấu ấn trong kiến trúc, nghệ thuật và đời sống cộng đồng. Khi nghiên cứu lịch sử Nam Bộ, cần đặt các di tích và tư liệu vào đúng niên đại, địa điểm và bối cảnh, không gán toàn bộ khu vực cho một nhà nước duy nhất.", keyPoints: ["Quan hệ khu vực có cả giao lưu và xung đột", "Di sản phản ánh sự đa dạng văn hóa", "Cần phân biệt lịch sử các cộng đồng và các nhà nước"], example: "Khi giới thiệu một di tích, ghi rõ cộng đồng, niên đại và nguồn tư liệu thay vì suy rộng từ một hiện vật." }
    ],
    questions: [], status: 'draft',
  },

  {
    id: "g7-geography-01", grade: 7, strand: "geography",
    title: "Vị trí địa lí, đặc điểm tự nhiên châu Âu",
    summary: "Bài học xác định vị trí, phạm vi châu Âu và tìm hiểu các đặc điểm tự nhiên chính về địa hình, khí hậu, sông ngòi và cảnh quan. Học sinh sử dụng bản đồ để giải thích sự đa dạng tự nhiên và liên hệ điều kiện tự nhiên với hoạt động kinh tế.",
    learningObjectives: ["Xác định được vị trí, phạm vi và một số đường ranh giới quy ước của châu Âu.", "Mô tả được khái quát địa hình, khí hậu, sông ngòi và cảnh quan châu Âu.", "Giải thích được một số ảnh hưởng của tự nhiên đến đời sống và hoạt động kinh tế."],
    sections: [
      { heading: "Vị trí và phạm vi", body: "Châu Âu nằm ở phía tây lục địa Á - Âu, có đường bờ biển bị chia cắt mạnh, nhiều bán đảo và biển ven bờ. Ranh giới quy ước giữa châu Âu và châu Á thường được xác định qua dãy Ural, sông Ural, biển Caspi, khu vực dãy Kavkaz và Biển Đen. Vị trí tiếp giáp Đại Tây Dương và các biển tạo điều kiện giao lưu hàng hải.", keyPoints: ["Châu Âu thuộc phía tây lục địa Á - Âu", "Bờ biển có nhiều bán đảo và biển ven bờ", "Ranh giới với châu Á là ranh giới quy ước"], example: "Dùng bản đồ thế giới để lần theo ranh giới quy ước từ dãy Ural xuống khu vực Biển Đen." },
      { heading: "Địa hình, khí hậu và sông ngòi", body: "Địa hình châu Âu gồm đồng bằng rộng ở phía đông và trung tâm, các dãy núi ở phía nam như Alps, Pyrenees và Carpathians. Khí hậu thay đổi từ ôn đới hải dương ở phía tây đến lục địa hơn ở phía đông, có kiểu Địa Trung Hải ở phía nam và khí hậu lạnh hơn ở phía bắc. Nhiều sông như Rhine, Danube và Volga có vai trò giao thông, cấp nước và sản xuất.", keyPoints: ["Đồng bằng và núi phân bố không đồng đều", "Khí hậu phân hóa theo vị trí và ảnh hưởng biển", "Sông ngòi có giá trị kinh tế và sinh thái"], example: "So sánh khí hậu ven Đại Tây Dương với khu vực sâu trong lục địa để nhận ra ảnh hưởng của biển." },
      { heading: "Cảnh quan và tác động đến đời sống", body: "Các kiểu cảnh quan gồm rừng lá rộng, rừng lá kim, thảo nguyên, cây bụi Địa Trung Hải và đài nguyên ở phía bắc. Địa hình, khí hậu và nguồn nước ảnh hưởng đến nông nghiệp, giao thông, phân bố dân cư và du lịch. Hoạt động của con người cũng làm biến đổi cảnh quan, vì vậy cần sử dụng tài nguyên hợp lí.", keyPoints: ["Cảnh quan thay đổi theo khí hậu và địa hình", "Tự nhiên tạo thuận lợi và hạn chế cho sản xuất", "Cần bảo vệ hệ sinh thái và tài nguyên"], example: "Liên hệ vùng Địa Trung Hải với cây trồng chịu hạn và hoạt động du lịch ven biển." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g7-geography-02", grade: 7, strand: "geography",
    title: "Đặc điểm dân cư, xã hội châu Âu",
    summary: "Bài học tìm hiểu quy mô, phân bố và một số đặc điểm xã hội của dân cư châu Âu. Học sinh nhận biết mức độ đô thị hóa cao, sự đa dạng ngôn ngữ - văn hóa, xu hướng già hóa ở nhiều quốc gia và vai trò của di cư.",
    learningObjectives: ["Mô tả được khái quát sự phân bố dân cư và mức độ đô thị hóa ở châu Âu.", "Nhận biết được sự đa dạng về ngôn ngữ, văn hóa và tôn giáo.", "Trình bày được một số xu hướng dân số và vấn đề xã hội nổi bật."],
    sections: [
      { heading: "Quy mô và phân bố dân cư", body: "Dân cư châu Âu phân bố không đều. Nhiều khu vực Tây Âu và Trung Âu có mật độ dân số cao, trong khi vùng núi cao và một số khu vực phía bắc có mật độ thấp hơn. Phân bố dân cư chịu ảnh hưởng của lịch sử đô thị hóa, điều kiện tự nhiên, công nghiệp, dịch vụ và mạng lưới giao thông.", keyPoints: ["Dân cư tập trung nhiều ở các vùng đô thị và công nghiệp", "Miền núi và vùng lạnh thường thưa dân hơn", "Phân bố chịu tác động của cả tự nhiên và kinh tế - xã hội"], example: "Đối chiếu bản đồ mật độ dân số với bản đồ địa hình và các đô thị lớn." },
      { heading: "Đô thị hóa và đa dạng xã hội", body: "Châu Âu có mức độ đô thị hóa cao, với nhiều thành phố lâu đời và các vùng đô thị liên kết. Cư dân sử dụng nhiều ngôn ngữ, thuộc các cộng đồng văn hóa và tôn giáo khác nhau. Di cư trong và ngoài châu lục góp phần làm thay đổi cơ cấu dân cư, đồng thời đặt ra yêu cầu về hội nhập và dịch vụ xã hội.", keyPoints: ["Đô thị giữ vai trò lớn trong đời sống kinh tế", "Ngôn ngữ và văn hóa đa dạng", "Di cư làm thay đổi cơ cấu dân số và xã hội"], example: "Một thành phố quốc tế có thể có nhiều nhóm ngôn ngữ và văn hóa cùng sinh sống." },
      { heading: "Xu hướng dân số và vấn đề xã hội", body: "Ở nhiều quốc gia châu Âu, tỉ lệ người cao tuổi tăng và mức sinh thấp tạo áp lực lên lực lượng lao động, y tế và an sinh. Một số khu vực tiếp nhận người nhập cư để bổ sung lao động, nhưng cần chính sách hỗ trợ hội nhập. Khi đọc số liệu dân số, phải chú ý thời điểm, đơn vị và sự khác biệt giữa các quốc gia.", keyPoints: ["Già hóa dân số là xu hướng ở nhiều nước", "Di cư có thể bổ sung lao động và làm tăng tính đa dạng", "Chính sách xã hội cần thích ứng với biến đổi dân số"], example: "So sánh tháp tuổi của hai quốc gia để nhận biết khác biệt về cơ cấu dân số." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g7-geography-03", grade: 7, strand: "geography",
    title: "Khai thác, sử dụng và bảo vệ thiên nhiên ở châu Âu",
    summary: "Bài học tìm hiểu cách con người khai thác tài nguyên đất, nước, rừng, khoáng sản và năng lượng ở châu Âu. Học sinh nhận biết những vấn đề môi trường phát sinh từ công nghiệp hóa, đô thị hóa và các giải pháp sử dụng tài nguyên theo hướng bền vững.",
    learningObjectives: ["Nêu được một số hoạt động khai thác và sử dụng tài nguyên thiên nhiên ở châu Âu.", "Nhận biết được các vấn đề môi trường như ô nhiễm, suy giảm sinh cảnh và biến đổi khí hậu.", "Trình bày được một số giải pháp bảo vệ thiên nhiên và sử dụng tài nguyên hiệu quả."],
    sections: [
      { heading: "Khai thác và sử dụng tài nguyên", body: "Châu Âu sử dụng nhiều nguồn tài nguyên như đất nông nghiệp, rừng, nước, khoáng sản và năng lượng. Công nghiệp, giao thông và đô thị hóa làm tăng nhu cầu nguyên liệu, nước và năng lượng. Một số quốc gia phát triển năng lượng tái tạo, cải tiến công nghệ và nâng hiệu quả sử dụng tài nguyên để giảm phụ thuộc vào nguồn hữu hạn.", keyPoints: ["Tài nguyên phục vụ nông nghiệp, công nghiệp và dịch vụ", "Nhu cầu sử dụng thay đổi theo trình độ phát triển", "Hiệu quả năng lượng giúp giảm áp lực tài nguyên"], example: "So sánh điện gió, thủy điện và nhiên liệu hóa thạch theo nguồn cung và tác động môi trường." },
      { heading: "Vấn đề môi trường", body: "Một số khu vực từng chịu ô nhiễm không khí, nước và đất do công nghiệp, giao thông và chất thải đô thị. Suy giảm rừng, chia cắt sinh cảnh và biến đổi khí hậu ảnh hưởng đến đa dạng sinh học, nông nghiệp và vùng ven biển. Các vấn đề môi trường có thể vượt qua biên giới quốc gia, đòi hỏi phối hợp khu vực.", keyPoints: ["Ô nhiễm có thể tác động đến nhiều thành phần môi trường", "Biến đổi khí hậu làm tăng rủi ro ở một số khu vực", "Vấn đề xuyên biên giới cần hợp tác"], example: "Một dòng sông chảy qua nhiều quốc gia cần được quản lí chất lượng nước theo lưu vực." },
      { heading: "Giải pháp bảo vệ thiên nhiên", body: "Các giải pháp gồm xử lí chất thải, kiểm soát khí thải, phục hồi hệ sinh thái, mở rộng giao thông công cộng và tăng sử dụng năng lượng tái tạo. Quy hoạch không gian xanh, bảo vệ khu vực tự nhiên và tiêu dùng có trách nhiệm góp phần giảm sức ép. Hiệu quả cần được theo dõi bằng dữ liệu và sự tham gia của cộng đồng.", keyPoints: ["Giảm ô nhiễm tại nguồn và xử lí chất thải", "Bảo vệ sinh cảnh và phục hồi hệ sinh thái", "Kết hợp chính sách, công nghệ và hành vi cộng đồng"], example: "Một thành phố có thể giảm ô nhiễm bằng giao thông công cộng, đường đi bộ và kiểm soát khí thải." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g7-geography-04", grade: 7, strand: "geography",
    title: "Liên minh châu Âu",
    summary: "Bài học giới thiệu quá trình hình thành, mục tiêu và một số biểu hiện liên kết của Liên minh châu Âu. Học sinh nhận biết thị trường chung, sự hợp tác giữa các thành viên và vai trò của EU trong kinh tế, thương mại và quan hệ quốc tế.",
    learningObjectives: ["Nêu được khái quát quá trình hình thành và mục tiêu của Liên minh châu Âu.", "Trình bày được một số biểu hiện liên kết về kinh tế và xã hội trong EU.", "Nhận biết được vai trò của EU và sự khác nhau giữa các chính sách của từng thành viên."],
    sections: [
      { heading: "Quá trình hình thành và mục tiêu", body: "Sau Chiến tranh thế giới thứ hai, nhiều nước Tây Âu thúc đẩy hợp tác để khôi phục kinh tế và hạn chế nguy cơ xung đột. Quá trình liên kết phát triển qua nhiều tổ chức và hiệp ước; Liên minh châu Âu chính thức hình thành theo Hiệp ước Maastricht, có hiệu lực năm 1993. EU hướng tới hòa bình, hợp tác, phát triển và tăng cường vai trò của châu Âu.", keyPoints: ["Liên kết châu Âu phát triển qua nhiều giai đoạn", "EU chính thức hình thành năm 1993", "Mục tiêu gồm hợp tác, ổn định và phát triển"], example: "Đặt mốc 1993 trong dòng thời gian của quá trình liên kết châu Âu." },
      { heading: "Thị trường chung và hợp tác", body: "Thị trường chung tạo điều kiện cho hàng hóa, dịch vụ, vốn và con người lưu chuyển thuận lợi hơn giữa các nước thành viên theo các quy định chung. EU phối hợp trong thương mại, môi trường, nghiên cứu, giao thông và nhiều lĩnh vực khác. Một số thành viên sử dụng đồng euro, nhưng không phải mọi thành viên đều dùng chung đồng tiền này.", keyPoints: ["Thị trường chung hỗ trợ lưu chuyển hàng hóa, dịch vụ, vốn và con người", "EU hợp tác trong nhiều lĩnh vực", "Đồng euro không được sử dụng ở tất cả các nước thành viên"], example: "Một doanh nghiệp có thể bán hàng qua nhiều nước thành viên theo các quy tắc chung của thị trường EU." },
      { heading: "Vai trò và thách thức", body: "EU là một trung tâm kinh tế và thương mại lớn, có ảnh hưởng trong các vấn đề quốc tế. Tuy nhiên, các thành viên có trình độ phát triển, lợi ích và quan điểm chính sách khác nhau. Việc phối hợp cần thương lượng, chia sẻ trách nhiệm và điều chỉnh chính sách để xử lí các vấn đề chung.", keyPoints: ["EU có vai trò kinh tế và chính trị quan trọng", "Các thành viên vẫn có khác biệt về lợi ích và trình độ", "Hợp tác cần cơ chế phối hợp và đồng thuận"], example: "Khi phân tích một chính sách chung, cần xem lợi ích của toàn liên minh và điều kiện của từng nước." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g7-geography-05", grade: 7, strand: "geography",
    title: "Vị trí địa lí, đặc điểm tự nhiên châu Á",
    summary: "Bài học xác định vị trí, phạm vi rộng lớn của châu Á và tìm hiểu địa hình, khí hậu, sông ngòi, khoáng sản và cảnh quan. Học sinh giải thích sự đa dạng tự nhiên thông qua kích thước lãnh thổ, địa hình và ảnh hưởng của biển, gió mùa.",
    learningObjectives: ["Xác định được vị trí và phạm vi châu Á trên bản đồ.", "Mô tả được các đặc điểm chính về địa hình, khí hậu và sông ngòi châu Á.", "Giải thích được sự đa dạng cảnh quan và ảnh hưởng của tự nhiên đến đời sống."],
    sections: [
      { heading: "Vị trí và phạm vi", body: "Châu Á là châu lục có diện tích lớn nhất, kéo dài từ vùng gần Bắc Cực đến khu vực gần xích đạo. Lãnh thổ tiếp giáp Bắc Băng Dương, Thái Bình Dương, Ấn Độ Dương và châu Âu. Kích thước rộng lớn theo cả chiều bắc - nam và đông - tây tạo nên sự khác biệt rõ về nhiệt độ, lượng mưa và cảnh quan.", keyPoints: ["Châu Á là châu lục rộng lớn nhất", "Lãnh thổ trải qua nhiều đới khí hậu", "Tiếp giáp ba đại dương lớn"], example: "Dùng bản đồ để xác định các điểm cực và nhận ra chiều kéo dài của châu Á." },
      { heading: "Địa hình và sông ngòi", body: "Địa hình châu Á cao và đồ sộ ở trung tâm, nổi bật với sơn nguyên Tây Tạng và dãy Himalaya; xung quanh có các đồng bằng rộng, bồn địa và hoang mạc. Nhiều sông lớn bắt nguồn từ vùng núi và sơn nguyên, chảy ra các đại dương, cung cấp nước và phù sa cho đồng bằng. Khoáng sản phân bố đa dạng nhưng không đồng đều.", keyPoints: ["Núi và sơn nguyên tập trung ở trung tâm", "Nhiều đồng bằng lớn nằm ở ven biển và hạ lưu sông", "Sông ngòi có vai trò với nông nghiệp và dân cư"], example: "Theo dõi hướng chảy của sông Trường Giang, Hoàng Hà, Ấn và Hằng trên bản đồ." },
      { heading: "Khí hậu và cảnh quan", body: "Do lãnh thổ rộng và địa hình phức tạp, châu Á có khí hậu từ lạnh giá ở phía bắc đến nóng ẩm ở phía nam. Gió mùa ảnh hưởng rõ ở Đông Á, Đông Nam Á và Nam Á; sâu trong lục địa có nhiều khu vực khô hạn. Cảnh quan gồm rừng mưa nhiệt đới, rừng ôn đới, thảo nguyên, hoang mạc và đài nguyên.", keyPoints: ["Khí hậu phân hóa theo vĩ độ, địa hình và khoảng cách biển", "Gió mùa ảnh hưởng đến nhiều khu vực phía nam và phía đông", "Cảnh quan đa dạng"], example: "So sánh khu vực ven biển gió mùa với vùng sâu trong lục địa để thấy khác biệt lượng mưa." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g7-geography-06", grade: 7, strand: "geography",
    title: "Đặc điểm dân cư, xã hội châu Á",
    summary: "Bài học tìm hiểu quy mô dân số lớn, sự phân bố không đều và tính đa dạng văn hóa - xã hội của châu Á. Học sinh nhận biết các khu vực đông dân, vai trò của điều kiện tự nhiên và kinh tế, cùng một số xu hướng đô thị hóa và di cư.",
    learningObjectives: ["Mô tả được khái quát quy mô và sự phân bố dân cư châu Á.", "Nhận biết được sự đa dạng về dân tộc, ngôn ngữ, tôn giáo và văn hóa.", "Giải thích được một số nhân tố ảnh hưởng đến phân bố dân cư và đô thị hóa."],
    sections: [
      { heading: "Quy mô và phân bố dân cư", body: "Châu Á là châu lục đông dân nhất thế giới. Dân cư tập trung đông ở các đồng bằng, lưu vực sông, vùng ven biển và đô thị lớn ở Đông Á, Nam Á và một số khu vực Đông Nam Á. Những vùng núi cao, hoang mạc và khí hậu khắc nghiệt thường thưa dân hơn. Phân bố dân cư chịu tác động tổng hợp của tự nhiên, lịch sử và kinh tế.", keyPoints: ["Dân cư châu Á có quy mô rất lớn", "Đồng bằng và ven biển thường tập trung đông dân", "Núi cao và hoang mạc thường thưa dân"], example: "Đối chiếu bản đồ dân cư với bản đồ sông ngòi để tìm mối liên hệ giữa nước và nơi cư trú." },
      { heading: "Đa dạng văn hóa và xã hội", body: "Châu Á có nhiều dân tộc, ngôn ngữ, tôn giáo và truyền thống. Các tôn giáo lớn như Phật giáo, Hindu giáo, Hồi giáo, Kitô giáo và nhiều tín ngưỡng khác có lịch sử phát triển lâu dài tại các khu vực khác nhau. Sự đa dạng là nguồn lực văn hóa, đồng thời đòi hỏi tôn trọng khác biệt và bảo đảm cơ hội bình đẳng.", keyPoints: ["Châu Á có nhiều cộng đồng và ngôn ngữ", "Tôn giáo phân bố khác nhau theo khu vực", "Đa dạng văn hóa cần được tôn trọng"], example: "Một lễ hội địa phương có thể phản ánh truyền thống của cộng đồng nhưng không đại diện cho toàn bộ châu lục." },
      { heading: "Đô thị hóa và biến đổi dân cư", body: "Nhiều quốc gia châu Á có quá trình đô thị hóa nhanh, tạo thêm việc làm và dịch vụ nhưng cũng gây áp lực lên giao thông, nhà ở, nước sạch và môi trường. Di cư nông thôn - đô thị và di cư giữa các quốc gia làm thay đổi cơ cấu dân cư. Chính sách quy hoạch và phát triển dịch vụ có vai trò quan trọng.", keyPoints: ["Đô thị hóa tạo cơ hội và thách thức", "Di cư làm thay đổi phân bố dân cư", "Quy hoạch cần theo kịp tốc độ tăng dân số đô thị"], example: "Phân tích một đô thị mở rộng để nhận biết nhu cầu về giao thông, nhà ở và không gian xanh." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g7-geography-07", grade: 7, strand: "geography",
    title: "Bản đồ chính trị châu Á, các khu vực của châu Á",
    summary: "Bài học rèn kĩ năng đọc bản đồ chính trị châu Á, nhận biết các quốc gia và những khu vực địa lí lớn. Học sinh sử dụng chú giải, phương hướng, vị trí tương đối và ranh giới để mô tả sự phân bố quốc gia, đồng thời tránh nhầm lẫn giữa khu vực địa lí và đơn vị chính trị.",
    learningObjectives: ["Đọc được bản đồ chính trị châu Á và xác định được một số quốc gia tiêu biểu.", "Phân biệt được các khu vực Đông Á, Đông Nam Á, Nam Á, Trung Á, Tây Nam Á và Bắc Á.", "Sử dụng được bản đồ để mô tả vị trí và quan hệ không gian giữa các quốc gia."],
    sections: [
      { heading: "Bản đồ chính trị châu Á", body: "Bản đồ chính trị thể hiện ranh giới quốc gia, tên nước, thủ đô và một số đơn vị lãnh thổ. Khi đọc bản đồ, cần xem tiêu đề, tỉ lệ, phương hướng, chú giải và thời điểm cập nhật. Ranh giới chính trị có thể thay đổi theo lịch sử, vì vậy cần sử dụng bản đồ phù hợp với mục đích và thời gian nghiên cứu.", keyPoints: ["Bản đồ chính trị thể hiện quốc gia và ranh giới", "Cần đọc tiêu đề, chú giải, tỉ lệ và phương hướng", "Thời điểm bản đồ có ý nghĩa khi nghiên cứu biến động"], example: "Tìm vị trí một quốc gia bằng cách xác định khu vực, quốc gia tiếp giáp và đường bờ biển." },
      { heading: "Các khu vực địa lí của châu Á", body: "Châu Á thường được chia thành các khu vực như Bắc Á, Trung Á, Tây Nam Á, Nam Á, Đông Á và Đông Nam Á. Mỗi khu vực có đặc điểm riêng về vị trí, địa hình, khí hậu, dân cư và hoạt động kinh tế. Cách phân chia giúp học sinh tổ chức thông tin nhưng không có nghĩa các khu vực hoàn toàn đồng nhất.", keyPoints: ["Các khu vực là cách phân nhóm theo vị trí địa lí", "Mỗi khu vực gồm nhiều quốc gia khác nhau", "Bên trong một khu vực vẫn có sự đa dạng"], example: "Đánh dấu sáu khu vực bằng màu khác nhau trên bản đồ để dễ ghi nhớ vị trí tương đối." },
      { heading: "Mô tả vị trí và quan hệ không gian", body: "Để mô tả vị trí một quốc gia, có thể nêu khu vực, hướng tiếp giáp, biển hoặc đại dương gần nhất và các nước láng giềng. Không nên chỉ dựa vào màu sắc trên bản đồ vì màu thường mang tính quy ước. Khi so sánh, cần dùng cùng một bản đồ và chú ý ranh giới, tỉ lệ.", keyPoints: ["Mô tả bằng khu vực và hướng tiếp giáp", "Dùng chú giải thay vì đoán theo màu", "So sánh trên cùng hệ quy chiếu bản đồ"], example: "Mô tả vị trí Việt Nam bằng khu vực Đông Nam Á, phía đông bán đảo Đông Dương và tiếp giáp Biển Đông." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g7-geography-08", grade: 7, strand: "geography",
    title: "Thực hành: Tìm hiểu về các nền kinh tế lớn và kinh tế mới nổi của châu Á",
    summary: "Bài thực hành hướng dẫn học sinh tìm hiểu một số nền kinh tế lớn và đang tăng trưởng nhanh ở châu Á thông qua bản đồ, bảng số liệu và nguồn thông tin có kiểm chứng. Học sinh rèn kĩ năng chọn tiêu chí, so sánh cơ cấu kinh tế và trình bày nhận xét có căn cứ.",
    learningObjectives: ["Lựa chọn được quốc gia và tiêu chí phù hợp để tìm hiểu nền kinh tế.", "Đọc và so sánh được một số chỉ tiêu kinh tế từ nguồn có thời điểm, đơn vị rõ ràng.", "Trình bày được nhận xét về quy mô, cơ cấu và xu hướng phát triển mà không khái quát vượt quá dữ liệu."],
    sections: [
      { heading: "Chọn quốc gia và nguồn dữ liệu", body: "Có thể tìm hiểu các nền kinh tế lớn như Trung Quốc, Nhật Bản, Ấn Độ hoặc những nền kinh tế đang chuyển đổi nhanh ở Đông và Đông Nam Á. Cần chọn nguồn đáng tin cậy, ghi rõ năm thống kê, đơn vị và phạm vi dữ liệu. Không nên so sánh số liệu khác năm hoặc khác phương pháp mà không nêu giới hạn.", keyPoints: ["Chọn quốc gia theo câu hỏi tìm hiểu", "Ưu tiên nguồn thống kê có cơ quan và thời điểm rõ", "Ghi đơn vị và phạm vi dữ liệu"], example: "Một bảng số liệu GDP phải ghi rõ năm và đơn vị tiền tệ trước khi so sánh." },
      { heading: "Chọn tiêu chí và phân tích", body: "Có thể sử dụng GDP, GDP bình quân đầu người, tốc độ tăng trưởng, cơ cấu ngành, thương mại và một số chỉ tiêu xã hội. Mỗi chỉ tiêu phản ánh một khía cạnh; GDP lớn không tự động có nghĩa mọi người dân đều có mức sống cao. Cần kết hợp nhiều tiêu chí và xem xét quy mô dân số, cơ cấu sản xuất và chất lượng phát triển.", keyPoints: ["Không dùng một chỉ tiêu để kết luận toàn diện", "Phân biệt quy mô kinh tế với mức sống bình quân", "Cơ cấu ngành cho biết vai trò nông nghiệp, công nghiệp và dịch vụ"], example: "Hai nước có GDP khác nhau cần được so sánh thêm theo dân số và GDP bình quân đầu người." },
      { heading: "Trình bày kết quả", body: "Kết quả có thể trình bày bằng bảng, biểu đồ cột hoặc biểu đồ đường tùy câu hỏi. Phần nhận xét cần nêu xu hướng, điểm giống và khác, nguyên nhân có thể có và giới hạn của dữ liệu. Tránh xếp hạng khi tiêu chí không thống nhất hoặc dữ liệu không cùng thời điểm.", keyPoints: ["Chọn biểu đồ phù hợp với dạng dữ liệu", "Nêu nhận xét có dẫn chứng", "Ghi rõ giới hạn và nguồn"], example: "Dùng biểu đồ cột để so sánh cùng một chỉ tiêu giữa các quốc gia trong cùng năm." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g7-geography-09", grade: 7, strand: "geography",
    title: "Vị trí địa lí, đặc điểm tự nhiên châu Phi",
    summary: "Bài học xác định vị trí châu Phi và tìm hiểu địa hình, khí hậu, sông hồ, khoáng sản và cảnh quan tự nhiên. Học sinh nhận biết vai trò của đường Xích đạo, hai chí tuyến và sự phân hóa khí hậu, đồng thời liên hệ điều kiện tự nhiên với hoạt động của con người.",
    learningObjectives: ["Xác định được vị trí và phạm vi châu Phi trên bản đồ.", "Mô tả được những đặc điểm chính về địa hình, khí hậu và sông hồ châu Phi.", "Giải thích được sự phân hóa cảnh quan và một số tác động của tự nhiên đến đời sống."],
    sections: [
      { heading: "Vị trí và địa hình", body: "Châu Phi nằm giữa Đại Tây Dương và Ấn Độ Dương, có đường Xích đạo đi qua gần giữa lãnh thổ và phần lớn diện tích nằm trong vùng nhiệt đới. Địa hình nhìn chung là lục địa cao, gồm các cao nguyên rộng, bồn địa và một số dãy núi. Dãy Atlas ở phía tây bắc và khu vực địa hình Đông Phi là những nét nổi bật.", keyPoints: ["Châu Phi nằm giữa Đại Tây Dương và Ấn Độ Dương", "Xích đạo đi qua gần giữa châu lục", "Địa hình có nhiều cao nguyên và bồn địa"], example: "Dùng bản đồ để xác định vị trí Xích đạo, chí tuyến Bắc và chí tuyến Nam trên châu Phi." },
      { heading: "Khí hậu, sông hồ và cảnh quan", body: "Do vị trí hai bên Xích đạo, nhiều khu vực châu Phi có khí hậu nóng; lượng mưa thay đổi rõ theo khoảng cách đến Xích đạo và ảnh hưởng biển. Hoang mạc Sahara rộng lớn ở phía bắc, lưu vực Congo có rừng mưa ẩm, còn nhiều vùng có xavan. Sông Nile, Congo và hồ Victoria có vai trò quan trọng với nước, giao thông và sản xuất.", keyPoints: ["Khí hậu nóng ở phần lớn châu lục", "Sahara khô hạn, lưu vực Congo ẩm hơn", "Sông và hồ có giá trị đối với cư dân"], example: "So sánh cảnh quan Sahara với lưu vực Congo để thấy vai trò của lượng mưa." },
      { heading: "Tài nguyên và tác động đến đời sống", body: "Châu Phi có nhiều loại khoáng sản, đất đai và hệ sinh thái đa dạng, nhưng tài nguyên phân bố không đều. Hạn hán, sa mạc hóa, lũ lụt và suy giảm rừng có thể ảnh hưởng đến sản xuất và đời sống ở một số khu vực. Khai thác cần gắn với bảo vệ đất, nước, rừng và lợi ích của cộng đồng địa phương.", keyPoints: ["Tài nguyên phong phú nhưng phân bố không đều", "Khí hậu và thiên tai tạo ra thách thức khác nhau", "Sử dụng tài nguyên cần có quy hoạch và bảo vệ môi trường"], example: "Ở vùng khô hạn, quản lí nước và bảo vệ thảm thực vật có ý nghĩa quan trọng." }
    ],
    questions: [], status: 'draft',
  },
  {
    id: "g7-geography-10", grade: 7, strand: "geography",
    title: "Đặc điểm dân cư, xã hội châu Phi",
    summary: "Bài học tìm hiểu sự phân bố dân cư, cơ cấu xã hội và tính đa dạng văn hóa của châu Phi. Học sinh nhận biết sự khác biệt giữa các khu vực, vai trò của điều kiện tự nhiên và lịch sử, cùng những cơ hội và thách thức trong quá trình đô thị hóa.",
    learningObjectives: ["Mô tả được khái quát sự phân bố dân cư và một số đặc điểm dân số châu Phi.", "Nhận biết được sự đa dạng về dân tộc, ngôn ngữ và văn hóa.", "Giải thích được một số nhân tố ảnh hưởng đến phân bố dân cư và quá trình đô thị hóa."],
    sections: [
      { heading: "Quy mô và phân bố dân cư", body: "Dân cư châu Phi phân bố không đều. Một số khu vực ven biển, lưu vực sông Nile, vùng ven vịnh Guinea và khu vực hồ lớn có mật độ dân số cao hơn; hoang mạc Sahara và một số vùng khô hạn thưa dân. Nguồn nước, đất canh tác, khí hậu, lịch sử cư trú và cơ hội việc làm cùng ảnh hưởng đến phân bố.", keyPoints: ["Dân cư tập trung ở một số đồng bằng, ven biển và lưu vực sông", "Hoang mạc và vùng khô hạn thường thưa dân", "Nhiều nhân tố tự nhiên và xã hội cùng tác động"], example: "Đối chiếu bản đồ dân cư với bản đồ khí hậu và sông ngòi để tìm mối liên hệ." },
      { heading: "Đa dạng dân tộc và văn hóa", body: "Châu Phi có nhiều cộng đồng dân tộc, ngôn ngữ, tôn giáo và truyền thống. Các hoạt động văn hóa phản ánh lịch sử lâu dài của cư dân, giao lưu khu vực và ảnh hưởng từ bên ngoài. Không nên xem châu Phi như một xã hội đồng nhất; mỗi quốc gia và vùng có bối cảnh, ngôn ngữ và đời sống riêng.", keyPoints: ["Châu Phi có sự đa dạng lớn về cộng đồng và ngôn ngữ", "Văn hóa chịu ảnh hưởng của lịch sử và giao lưu", "Cần tránh khái quát một vùng cho toàn châu lục"], example: "Khi giới thiệu một lễ hội, cần nêu rõ cộng đồng hoặc quốc gia cụ thể." },
      { heading: "Đô thị hóa và các vấn đề xã hội", body: "Nhiều thành phố châu Phi tăng dân số nhanh do gia tăng tự nhiên và di cư. Đô thị hóa tạo cơ hội việc làm và dịch vụ, nhưng cũng có thể gây áp lực lên nhà ở, giao thông, cấp nước, giáo dục và y tế nếu hạ tầng không theo kịp. Các quốc gia có điều kiện phát triển khác nhau và đang thực hiện nhiều giải pháp riêng.", keyPoints: ["Đô thị hóa diễn ra nhanh ở một số khu vực", "Hạ tầng và dịch vụ cần phát triển theo dân số", "Không có một mô hình phát triển chung cho mọi quốc gia"], example: "Phân tích một thành phố đang mở rộng để nhận biết nhu cầu về nhà ở, giao thông và nước sạch." }
    ],
    questions: [], status: 'draft',
  },


  {
    id: "g6-history-17", grade: 6, strand: "history", title: "Cuộc đấu tranh bảo tồn và phát triển văn hóa dân tộc của người Việt",
    summary: "Trong thời Bắc thuộc, người Việt vừa tiếp nhận có chọn lọc yếu tố văn hóa bên ngoài, vừa duy trì tiếng nói, phong tục và tín ngưỡng riêng. Quá trình đó góp phần bảo tồn bản sắc và tạo nền tảng cho văn hóa dân tộc phát triển.",
    learningObjectives: ["Nêu được các đặc điểm chính của nội dung bài học.", "Sử dụng được thông tin, tư liệu hoặc ví dụ để giải thích hiện tượng.", "Liên hệ được ý nghĩa của kiến thức với đời sống và môi trường."],
    sections: [
      { heading: "Tiếng nói và phong tục", body: "Tiếng Việt cùng nhiều phong tục trong gia đình, làng xã được duy trì qua nhiều thế hệ. Dù chịu sức ép đồng hóa, cộng đồng cư dân vẫn gìn giữ cách sinh hoạt, tập quán và tri thức phù hợp với môi trường sống.", keyPoints: ["Nắm được khái niệm hoặc bối cảnh chính", "Nhận biết được đặc điểm tiêu biểu"], example: "Dùng tư liệu hoặc bản đồ phù hợp để xác định nội dung." },
      { heading: "Tín ngưỡng và tiếp biến", body: "Tín ngưỡng thờ cúng tổ tiên, thờ các lực lượng tự nhiên và sinh hoạt cộng đồng tiếp tục tồn tại. Một số yếu tố văn hóa từ bên ngoài được tiếp nhận, điều chỉnh để phù hợp với đời sống bản địa.", keyPoints: ["Phân tích được nguyên nhân hoặc biểu hiện", "Liên hệ được với điều kiện cụ thể"], example: "Đối chiếu một trường hợp cụ thể với kiến thức trong bài." },
      { heading: "Ý nghĩa lịch sử", body: "Sự bền bỉ trong bảo tồn văn hóa giúp cộng đồng duy trì ý thức về cội nguồn và sự khác biệt. Đây là một trong những cơ sở tinh thần quan trọng cho quá trình giành và xây dựng nền tự chủ.", keyPoints: ["Khái quát được ý nghĩa hoặc hệ quả", "Đề xuất cách vận dụng kiến thức phù hợp"], example: "Trình bày một nhận xét có căn cứ từ dữ kiện đã học." }
    ],
    questions: [], status: "draft",
  },
  {
    id: "g6-history-18", grade: 6, strand: "history", title: "Bước ngoặt lịch sử đầu thế kỉ X",
    summary: "Đầu thế kỉ X, chính quyền họ Khúc từng bước xây dựng nền tự chủ. Chiến thắng Bạch Đằng năm 938 của Ngô Quyền đánh bại quân Nam Hán, mở ra thời kì độc lập lâu dài.",
    learningObjectives: ["Nêu được các đặc điểm chính của nội dung bài học.", "Sử dụng được thông tin, tư liệu hoặc ví dụ để giải thích hiện tượng.", "Liên hệ được ý nghĩa của kiến thức với đời sống và môi trường."],
    sections: [
      { heading: "Họ Khúc xây dựng tự chủ", body: "Sau khi giành quyền kiểm soát đất nước năm 905, họ Khúc tiến hành một số cải cách về tổ chức hành chính, thuế khóa và đời sống. Những thay đổi này làm suy yếu cơ chế cai trị cũ và củng cố quyền tự chủ.", keyPoints: ["Nắm được khái niệm hoặc bối cảnh chính", "Nhận biết được đặc điểm tiêu biểu"], example: "Dùng tư liệu hoặc bản đồ phù hợp để xác định nội dung." },
      { heading: "Ngô Quyền và chiến thắng Bạch Đằng", body: "Năm 938, Ngô Quyền lựa chọn vùng cửa sông Bạch Đằng để tổ chức trận quyết chiến. Quân dân ta tận dụng địa hình, thủy triều và sự phối hợp lực lượng để đánh bại quân Nam Hán.", keyPoints: ["Phân tích được nguyên nhân hoặc biểu hiện", "Liên hệ được với điều kiện cụ thể"], example: "Đối chiếu một trường hợp cụ thể với kiến thức trong bài." },
      { heading: "Ý nghĩa của bước ngoặt", body: "Chiến thắng Bạch Đằng chấm dứt về cơ bản thời kì bị các triều đại phương Bắc đô hộ kéo dài, khẳng định năng lực tự chủ và mở đầu thời đại độc lập lâu dài.", keyPoints: ["Khái quát được ý nghĩa hoặc hệ quả", "Đề xuất cách vận dụng kiến thức phù hợp"], example: "Trình bày một nhận xét có căn cứ từ dữ kiện đã học." }
    ],
    questions: [], status: "draft",
  },
  {
    id: "g6-history-19", grade: 6, strand: "history", title: "Vương quốc Chăm-pa từ thế kỉ II đến thế kỉ X",
    summary: "Vương quốc Chăm-pa hình thành ở miền Trung Việt Nam, phát triển dựa trên nông nghiệp, thương mại biển và giao lưu văn hóa. Cư dân Chăm-pa tạo dựng nhiều thành tựu kiến trúc, điêu khắc và tín ngưỡng.",
    learningObjectives: ["Nêu được các đặc điểm chính của nội dung bài học.", "Sử dụng được thông tin, tư liệu hoặc ví dụ để giải thích hiện tượng.", "Liên hệ được ý nghĩa của kiến thức với đời sống và môi trường."],
    sections: [
      { heading: "Sự hình thành và tổ chức", body: "Từ cuối thế kỉ II, nhà nước Lâm Ấp xuất hiện ở khu vực miền Trung, sau phát triển thành Chăm-pa. Lãnh thổ và trung tâm chính trị có những thay đổi theo từng thời kì; các tiểu vùng ven biển và đồng bằng giữ vai trò quan trọng.", keyPoints: ["Nắm được khái niệm hoặc bối cảnh chính", "Nhận biết được đặc điểm tiêu biểu"], example: "Dùng tư liệu hoặc bản đồ phù hợp để xác định nội dung." },
      { heading: "Kinh tế và giao lưu", body: "Cư dân Chăm-pa trồng lúa, khai thác sản vật và phát triển thủ công nghiệp. Vị trí ven biển thuận lợi cho giao thương với các khu vực Đông Nam Á và Ấn Độ, tạo điều kiện tiếp nhận nhiều ảnh hưởng văn hóa.", keyPoints: ["Phân tích được nguyên nhân hoặc biểu hiện", "Liên hệ được với điều kiện cụ thể"], example: "Đối chiếu một trường hợp cụ thể với kiến thức trong bài." },
      { heading: "Văn hóa Chăm-pa", body: "Tín ngưỡng Hindu giáo và Phật giáo có ảnh hưởng trong một số giai đoạn. Tháp Chăm, tượng và phù điêu thể hiện trình độ kiến trúc, điêu khắc đặc sắc; văn hóa Chăm-pa góp phần làm phong phú di sản Việt Nam.", keyPoints: ["Khái quát được ý nghĩa hoặc hệ quả", "Đề xuất cách vận dụng kiến thức phù hợp"], example: "Trình bày một nhận xét có căn cứ từ dữ kiện đã học." }
    ],
    questions: [], status: "draft",
  },
  {
    id: "g6-history-20", grade: 6, strand: "history", title: "Vương quốc Phù Nam",
    summary: "Phù Nam là một nhà nước cổ ở khu vực hạ lưu sông Mekong, phát triển mạnh trong những thế kỉ đầu Công nguyên. Vị trí gần biển và mạng lưới sông ngòi giúp Phù Nam trở thành trung tâm giao thương quan trọng.",
    learningObjectives: ["Nêu được các đặc điểm chính của nội dung bài học.", "Sử dụng được thông tin, tư liệu hoặc ví dụ để giải thích hiện tượng.", "Liên hệ được ý nghĩa của kiến thức với đời sống và môi trường."],
    sections: [
      { heading: "Vị trí và quá trình phát triển", body: "Phù Nam hình thành ở vùng châu thổ và ven biển phía nam Đông Nam Á. Quá trình phát triển gắn với khả năng kiểm soát các tuyến giao thông thủy và kết nối vùng nội địa với biển.", keyPoints: ["Nắm được khái niệm hoặc bối cảnh chính", "Nhận biết được đặc điểm tiêu biểu"], example: "Dùng tư liệu hoặc bản đồ phù hợp để xác định nội dung." },
      { heading: "Kinh tế và thương mại", body: "Nông nghiệp lúa nước dựa vào hệ thống sông, kênh rạch là nền tảng kinh tế. Các hoạt động thủ công và trao đổi hàng hóa phát triển; thương cảng Óc Eo là dấu tích quan trọng cho thấy mạng lưới giao thương rộng.", keyPoints: ["Phân tích được nguyên nhân hoặc biểu hiện", "Liên hệ được với điều kiện cụ thể"], example: "Đối chiếu một trường hợp cụ thể với kiến thức trong bài." },
      { heading: "Di sản và sự chuyển biến", body: "Di tích khảo cổ Óc Eo cung cấp bằng chứng về đời sống, sản xuất và giao lưu của cư dân Phù Nam. Từ khoảng thế kỉ VII, vai trò của Phù Nam suy giảm và các trung tâm quyền lực trong khu vực có sự chuyển biến.", keyPoints: ["Khái quát được ý nghĩa hoặc hệ quả", "Đề xuất cách vận dụng kiến thức phù hợp"], example: "Trình bày một nhận xét có căn cứ từ dữ kiện đã học." }
    ],
    questions: [], status: "draft",
  },
  {
    id: "g6-geography-17", grade: 6, strand: "geography", title: "Thời tiết và khí hậu. Biến đổi khí hậu",
    summary: "Thời tiết là trạng thái khí quyển trong thời gian ngắn tại một địa điểm; khí hậu là đặc điểm thời tiết lặp lại trong thời gian dài. Biến đổi khí hậu làm thay đổi nhiều yếu tố khí hậu và gia tăng rủi ro thiên tai.",
    learningObjectives: ["Nêu được các đặc điểm chính của nội dung bài học.", "Sử dụng được thông tin, tư liệu hoặc ví dụ để giải thích hiện tượng.", "Liên hệ được ý nghĩa của kiến thức với đời sống và môi trường."],
    sections: [
      { heading: "Phân biệt thời tiết và khí hậu", body: "Thời tiết thay đổi từng ngày, thậm chí từng giờ; khí hậu được nhận biết qua quy luật nhiều năm. Nhiệt độ, lượng mưa, gió và độ ẩm là những yếu tố thường được dùng để mô tả thời tiết và khí hậu.", keyPoints: ["Nắm được khái niệm hoặc bối cảnh chính", "Nhận biết được đặc điểm tiêu biểu"], example: "Dùng tư liệu hoặc bản đồ phù hợp để xác định nội dung." },
      { heading: "Biến đổi khí hậu", body: "Biến đổi khí hậu hiện nay thể hiện qua xu hướng nóng lên toàn cầu, thay đổi lượng mưa, mực nước biển dâng và một số hiện tượng cực đoan gia tăng. Nguyên nhân chủ yếu là phát thải khí nhà kính từ hoạt động của con người.", keyPoints: ["Phân tích được nguyên nhân hoặc biểu hiện", "Liên hệ được với điều kiện cụ thể"], example: "Đối chiếu một trường hợp cụ thể với kiến thức trong bài." },
      { heading: "Thích ứng và giảm nhẹ", body: "Giảm phát thải, sử dụng năng lượng hiệu quả, bảo vệ rừng và thay đổi phương thức sản xuất góp phần giảm nhẹ biến đổi khí hậu. Cộng đồng cần theo dõi cảnh báo, quy hoạch phù hợp và chuẩn bị phương án ứng phó thiên tai.", keyPoints: ["Khái quát được ý nghĩa hoặc hệ quả", "Đề xuất cách vận dụng kiến thức phù hợp"], example: "Trình bày một nhận xét có căn cứ từ dữ kiện đã học." }
    ],
    questions: [], status: "draft",
  },
  {
    id: "g6-geography-18", grade: 6, strand: "geography", title: "Thực hành: Phân tích biểu đồ nhiệt độ, lượng mưa",
    summary: "Biểu đồ khí hậu thể hiện sự thay đổi nhiệt độ và lượng mưa theo tháng. Đọc đúng tên địa điểm, đơn vị, trục số và chú giải giúp học sinh mô tả đặc điểm khí hậu có căn cứ.",
    learningObjectives: ["Nêu được các đặc điểm chính của nội dung bài học.", "Sử dụng được thông tin, tư liệu hoặc ví dụ để giải thích hiện tượng.", "Liên hệ được ý nghĩa của kiến thức với đời sống và môi trường."],
    sections: [
      { heading: "Đọc cấu trúc biểu đồ", body: "Trước khi phân tích, cần đọc tên địa điểm, khoảng thời gian, đơn vị nhiệt độ và lượng mưa, trục tháng cùng chú giải. Đường biểu diễn thường thể hiện nhiệt độ, cột thể hiện lượng mưa.", keyPoints: ["Nắm được khái niệm hoặc bối cảnh chính", "Nhận biết được đặc điểm tiêu biểu"], example: "Dùng tư liệu hoặc bản đồ phù hợp để xác định nội dung." },
      { heading: "Mô tả nhiệt độ và lượng mưa", body: "Có thể xác định tháng nóng nhất, lạnh nhất, biên độ nhiệt năm, tháng mưa nhiều và mùa mưa. Khi nêu nhận xét, cần dùng số liệu cụ thể và tránh chỉ mô tả chung chung.", keyPoints: ["Phân tích được nguyên nhân hoặc biểu hiện", "Liên hệ được với điều kiện cụ thể"], example: "Đối chiếu một trường hợp cụ thể với kiến thức trong bài." },
      { heading: "Rút ra nhận xét khí hậu", body: "Kết hợp đặc điểm nhiệt độ và lượng mưa để nhận xét mùa, mức độ phân hóa và khả năng thuộc kiểu khí hậu nào. Cần thận trọng vì một biểu đồ của một địa điểm không đại diện cho toàn bộ khu vực.", keyPoints: ["Khái quát được ý nghĩa hoặc hệ quả", "Đề xuất cách vận dụng kiến thức phù hợp"], example: "Trình bày một nhận xét có căn cứ từ dữ kiện đã học." }
    ],
    questions: [], status: "draft",
  },
  {
    id: "g6-geography-19", grade: 6, strand: "geography", title: "Thủy quyển và vòng tuần hoàn của nước",
    summary: "Thủy quyển gồm toàn bộ nước trên Trái Đất ở đại dương, biển, sông hồ, băng tuyết, nước ngầm và khí quyển. Nước luôn vận động qua các quá trình bốc hơi, ngưng tụ, mưa và dòng chảy.",
    learningObjectives: ["Nêu được các đặc điểm chính của nội dung bài học.", "Sử dụng được thông tin, tư liệu hoặc ví dụ để giải thích hiện tượng.", "Liên hệ được ý nghĩa của kiến thức với đời sống và môi trường."],
    sections: [
      { heading: "Thành phần thủy quyển", body: "Nước phân bố ở đại dương, sông hồ, băng hà, nước ngầm, đất và khí quyển. Nước mặn chiếm phần lớn tổng lượng nước, trong khi nước ngọt có thể khai thác trực tiếp chỉ chiếm tỉ lệ nhỏ.", keyPoints: ["Nắm được khái niệm hoặc bối cảnh chính", "Nhận biết được đặc điểm tiêu biểu"], example: "Dùng tư liệu hoặc bản đồ phù hợp để xác định nội dung." },
      { heading: "Vòng tuần hoàn của nước", body: "Dưới tác động của năng lượng Mặt Trời, nước bốc hơi từ mặt biển, sông hồ và bề mặt đất; thực vật cũng thoát hơi nước. Hơi nước ngưng tụ thành mây rồi rơi xuống dưới dạng mưa hoặc tuyết.", keyPoints: ["Phân tích được nguyên nhân hoặc biểu hiện", "Liên hệ được với điều kiện cụ thể"], example: "Đối chiếu một trường hợp cụ thể với kiến thức trong bài." },
      { heading: "Vai trò và bảo vệ nguồn nước", body: "Nước cần thiết cho sinh hoạt, sản xuất và hệ sinh thái. Ô nhiễm, khai thác quá mức và biến đổi khí hậu có thể làm suy giảm an ninh nguồn nước; sử dụng tiết kiệm và bảo vệ lưu vực là những giải pháp quan trọng.", keyPoints: ["Khái quát được ý nghĩa hoặc hệ quả", "Đề xuất cách vận dụng kiến thức phù hợp"], example: "Trình bày một nhận xét có căn cứ từ dữ kiện đã học." }
    ],
    questions: [], status: "draft",
  },
  {
    id: "g6-geography-20", grade: 6, strand: "geography", title: "Sông và hồ. Nước ngầm và băng hà",
    summary: "Sông, hồ, nước ngầm và băng hà là những thành phần quan trọng của thủy quyển. Chúng cung cấp nước, điều hòa môi trường và tạo điều kiện cho nhiều hoạt động kinh tế, nhưng cũng chịu tác động của con người và khí hậu.",
    learningObjectives: ["Nêu được các đặc điểm chính của nội dung bài học.", "Sử dụng được thông tin, tư liệu hoặc ví dụ để giải thích hiện tượng.", "Liên hệ được ý nghĩa của kiến thức với đời sống và môi trường."],
    sections: [
      { heading: "Sông và hồ", body: "Sông là dòng nước chảy thường xuyên tương đối ổn định trong lòng dẫn; hệ thống sông gồm sông chính, phụ lưu và chi lưu. Hồ là vùng nước đọng trong địa hình trũng, có thể có nguồn gốc tự nhiên hoặc nhân tạo.", keyPoints: ["Nắm được khái niệm hoặc bối cảnh chính", "Nhận biết được đặc điểm tiêu biểu"], example: "Dùng tư liệu hoặc bản đồ phù hợp để xác định nội dung." },
      { heading: "Nước ngầm", body: "Nước ngầm tồn tại trong các lỗ rỗng và khe nứt của đất đá. Nguồn nước này có vai trò quan trọng ở nhiều nơi, nhưng khai thác quá mức có thể gây hạ thấp mực nước, sụt lún hoặc xâm nhập mặn ở vùng ven biển.", keyPoints: ["Phân tích được nguyên nhân hoặc biểu hiện", "Liên hệ được với điều kiện cụ thể"], example: "Đối chiếu một trường hợp cụ thể với kiến thức trong bài." },
      { heading: "Băng hà và sử dụng nước", body: "Băng hà lưu trữ lượng nước ngọt lớn và góp phần điều tiết dòng chảy. Băng tan nhanh do nhiệt độ tăng có thể ảnh hưởng mực nước biển và nguồn nước theo mùa; quản lí tổng hợp nguồn nước giúp giảm rủi ro.", keyPoints: ["Khái quát được ý nghĩa hoặc hệ quả", "Đề xuất cách vận dụng kiến thức phù hợp"], example: "Trình bày một nhận xét có căn cứ từ dữ kiện đã học." }
    ],
    questions: [], status: "draft",
  },
  {
    id: "g7-geography-11", grade: 7, strand: "geography", title: "Phương thức con người khai thác, sử dụng và bảo vệ thiên nhiên ở châu Phi",
    summary: "Con người ở châu Phi khai thác thiên nhiên theo những cách khác nhau tùy điều kiện khí hậu, địa hình và tài nguyên. Sử dụng đất, nước, rừng, đồng cỏ và khoáng sản hợp lí có ý nghĩa đối với sinh kế, bảo tồn đa dạng sinh học và phát triển lâu dài.",
    learningObjectives: ["Trình bày được một số phương thức khai thác thiên nhiên ở các môi trường châu Phi.","Phân tích được tác động của hoạt động kinh tế đến đất, nước, rừng và sinh vật.","Đề xuất được giải pháp sử dụng tài nguyên phù hợp với điều kiện tự nhiên."],
    sections: [{"heading":"Khai thác thiên nhiên ở môi trường xích đạo và cận xích đạo","body":"Ở những khu vực nóng ẩm như lưu vực Congo, rừng mưa cung cấp lâm sản, thực phẩm và nhiều dịch vụ hệ sinh thái. Khai thác gỗ, mở rộng đất nông nghiệp hoặc xây dựng hạ tầng thiếu quy hoạch có thể làm suy giảm diện tích rừng, chia cắt sinh cảnh và ảnh hưởng nguồn nước. Phương thức phù hợp cần gắn khai thác với phục hồi rừng, bảo vệ khu vực có giá trị sinh học cao và sinh kế của cộng đồng địa phương.","keyPoints":["Rừng mưa có giá trị kinh tế và sinh thái lớn","Khai thác thiếu kiểm soát làm mất sinh cảnh và suy giảm đa dạng sinh học"],"example":"Ví dụ: quản lí khai thác gỗ theo quy hoạch, phục hồi khu rừng bị suy thoái và phát triển sản phẩm lâm nghiệp có truy xuất nguồn gốc."},{"heading":"Sử dụng đất, nước ở môi trường nhiệt đới và hoang mạc","body":"Ở xavan, hoạt động chăn nuôi và trồng trọt phụ thuộc rõ vào mùa mưa, mùa khô. Chăn thả quá mức, đốt thảm cỏ hoặc canh tác không phù hợp có thể làm đất thoái hóa và tăng nguy cơ hoang mạc hóa. Tại vùng khô hạn, nguồn nước khan hiếm nên cần sử dụng tiết kiệm, bảo vệ tầng nước ngầm, lựa chọn cây trồng thích nghi và tổ chức tưới tiêu hiệu quả.","keyPoints":["Điều chỉnh hoạt động sản xuất theo tính mùa của mưa","Hạn chế chăn thả quá mức và khai thác nước ngầm thiếu kiểm soát"],"example":"Ví dụ: áp dụng tưới tiết kiệm, luân phiên khu vực chăn thả và bảo vệ thảm thực vật tự nhiên."},{"heading":"Bảo vệ tài nguyên và phát triển bền vững","body":"Thiên nhiên châu Phi chịu sức ép từ khai khoáng, đô thị hóa, biến đổi khí hậu và nhu cầu sinh kế. Các giải pháp cần kết hợp quy hoạch sử dụng đất, đánh giá tác động môi trường, bảo tồn khu vực trọng yếu, phục hồi đất và nguồn nước, đồng thời tạo cơ hội kinh tế cho người dân. Hợp tác giữa các quốc gia cũng quan trọng với lưu vực sông, hệ sinh thái và động vật hoang dã di chuyển qua biên giới.","keyPoints":["Kết hợp bảo tồn với sinh kế bền vững","Cần phối hợp quản lí tài nguyên ở quy mô lưu vực và xuyên biên giới"],"example":"Ví dụ: du lịch sinh thái có giới hạn sức chứa, chia sẻ lợi ích với cộng đồng và giám sát tác động lên động vật hoang dã."}],
    questions: [], status: "draft",
  },
  {
    id: "g7-geography-12", grade: 7, strand: "geography", title: "Thực hành: Tìm hiểu khái quát Cộng hòa Nam Phi",
    summary: "Cộng hòa Nam Phi nằm ở cực nam châu Phi, có vị trí tiếp giáp Đại Tây Dương và Ấn Độ Dương. Đây là quốc gia có nền kinh tế tương đối phát triển trong khu vực, tài nguyên khoáng sản đa dạng, xã hội đa văn hóa và sự phân hóa không gian kinh tế rõ rệt.",
    learningObjectives: ["Xác định được vị trí của Cộng hòa Nam Phi trên bản đồ châu Phi.","Thu thập, chọn lọc và trình bày thông tin khái quát về tự nhiên, dân cư và kinh tế.","Sử dụng số liệu hoặc bản đồ để rút ra nhận xét có căn cứ."],
    sections: [{"heading":"Vị trí địa lí và đặc điểm tự nhiên","body":"Cộng hòa Nam Phi nằm ở phần cực nam lục địa châu Phi. Lãnh thổ có bờ biển dài, tiếp giáp Đại Tây Dương ở phía tây và Ấn Độ Dương ở phía đông, nam. Địa hình gồm cao nguyên rộng, các vùng núi và đồng bằng ven biển; khí hậu thay đổi theo độ cao, vĩ độ và ảnh hưởng của các dòng biển. Điều kiện tự nhiên tạo ra sự đa dạng về cảnh quan và tài nguyên.","keyPoints":["Nằm ở cực nam châu Phi","Hai đại dương ảnh hưởng đến khí hậu và hoạt động kinh tế ven biển"],"example":"Khi đọc bản đồ, xác định vị trí quốc gia, các đại dương tiếp giáp và những nước láng giềng ở phía bắc."},{"heading":"Dân cư và xã hội","body":"Nam Phi có xã hội đa dạng về nguồn gốc cộng đồng, ngôn ngữ và văn hóa. Quá trình lịch sử để lại những khác biệt về cơ hội tiếp cận đất đai, giáo dục, việc làm và dịch vụ giữa các nhóm dân cư và khu vực. Các đô thị lớn tập trung nhiều hoạt động kinh tế, trong khi một số vùng nông thôn còn gặp khó khăn về hạ tầng và cơ hội sinh kế.","keyPoints":["Xã hội đa dạng về văn hóa và ngôn ngữ","Cần xem xét cả tiến bộ phát triển và những bất bình đẳng còn tồn tại"],"example":"Khi mô tả dân cư, tránh xem một nhóm cộng đồng là đại diện cho toàn bộ xã hội Nam Phi."},{"heading":"Kinh tế và cách khai thác tư liệu","body":"Nam Phi có các ngành khai khoáng, công nghiệp chế biến, tài chính, thương mại, giao thông và du lịch. Khoáng sản có vai trò quan trọng nhưng việc khai thác cần tính đến tác động môi trường, an toàn lao động và chuyển đổi năng lượng. Khi làm bài thực hành, cần ghi rõ năm, đơn vị và nguồn của số liệu; kết hợp bản đồ, bảng thống kê và văn bản để tránh kết luận chỉ dựa trên một thông tin đơn lẻ.","keyPoints":["Kinh tế có cơ cấu ngành đa dạng, khai khoáng là một lĩnh vực đáng chú ý","Số liệu phải có nguồn, thời điểm và đơn vị rõ ràng"],"example":"Có thể lập bảng gồm vị trí, điều kiện tự nhiên, dân cư, ngành kinh tế và một vấn đề phát triển cần quan tâm."}],
    questions: [], status: "draft",
  },
  {
    id: "g7-geography-13", grade: 7, strand: "geography", title: "Vị trí địa lí, phạm vi châu Mỹ. Sự phát kiến ra châu Mỹ",
    summary: "Châu Mỹ kéo dài từ vùng cực Bắc đến gần vùng cực Nam, gồm Bắc Mỹ, Trung Mỹ, Nam Mỹ và các đảo, quần đảo phụ cận. Lịch sử tiếp xúc giữa châu Âu và châu Mỹ từ cuối thế kỉ XV gắn với các chuyến hải hành xuyên Đại Tây Dương, nhưng châu Mỹ đã có cư dân bản địa và các nền văn minh phát triển từ rất lâu trước đó.",
    learningObjectives: ["Xác định được vị trí, phạm vi và các bộ phận của châu Mỹ trên bản đồ.", "Trình bày được khái quát các chuyến hải hành của người châu Âu cuối thế kỉ XV và hệ quả lịch sử.", "Nhận thức được vai trò, sự tồn tại lâu đời của cư dân bản địa châu Mỹ trước khi người châu Âu đến."],
    sections: [
      {heading:"Vị trí địa lí và phạm vi",body:"Châu Mỹ nằm hoàn toàn ở bán cầu Tây, trải dài theo hướng bắc - nam từ vùng cực Bắc đến gần vùng cực Nam. Châu lục tiếp giáp Bắc Băng Dương ở phía bắc, Đại Tây Dương ở phía đông và Thái Bình Dương ở phía tây. Eo đất Trung Mỹ nối Bắc Mỹ với Nam Mỹ; các đảo trong vùng biển Ca-ri-bê thuộc phạm vi địa lí châu Mỹ.",keyPoints:["Châu Mỹ nằm ở bán cầu Tây và kéo dài theo chiều bắc - nam","Gồm Bắc Mỹ, Trung Mỹ, Nam Mỹ và các đảo phụ cận"],example:"Dựa vào bản đồ thế giới, xác định hai đại dương tiếp giáp và vị trí eo đất Trung Mỹ."},
      {heading:"Cư dân bản địa và các nền văn minh trước thế kỉ XV",body:"Trước khi các đoàn thám hiểm châu Âu đến vào cuối thế kỉ XV, châu Mỹ đã có cư dân bản địa sinh sống qua nhiều thiên niên kỉ. Nhiều cộng đồng phát triển phương thức sản xuất, tri thức thiên văn, kiến trúc và tổ chức xã hội riêng; các nền văn minh Maya, Aztec và Inca là những ví dụ tiêu biểu. Vì vậy, sự kiện người châu Âu đến châu Mỹ không phải là sự phát hiện một vùng đất không có người ở.",keyPoints:["Cư dân bản địa đã sinh sống lâu đời ở châu Mỹ","Các nền văn minh bản địa có thành tựu riêng về nông nghiệp, kiến trúc và tri thức"],example:"Khi trình bày lịch sử, cần phân biệt góc nhìn của người châu Âu với lịch sử lâu đời của các cộng đồng bản địa."},
      {heading:"Các chuyến hải hành và hệ quả",body:"Cuối thế kỉ XV, một số đoàn thám hiểm châu Âu vượt Đại Tây Dương trong bối cảnh tìm tuyến hàng hải và mở rộng giao thương. Chuyến đi của Christopher Columbus năm 1492 đã đưa người châu Âu đến vùng Caribe, mở đầu quá trình tiếp xúc thường xuyên hơn giữa hai bờ Đại Tây Dương. Quá trình này kéo theo trao đổi cây trồng, vật nuôi và hàng hóa, đồng thời gây xâm chiếm, dịch bệnh, cưỡng bức lao động và tổn thất nghiêm trọng đối với nhiều cộng đồng bản địa.",keyPoints:["Các chuyến hải hành cuối thế kỉ XV làm tăng kết nối xuyên Đại Tây Dương","Hệ quả gồm trao đổi toàn cầu nhưng cũng có xâm chiếm và tổn thất đối với cư dân bản địa"],example:"Phân tích sự kiện từ nhiều góc nhìn: thương mại và giao lưu, đồng thời xem xét tác động đối với cư dân bản địa."}
    ],
    questions: [], status: "draft",
  },
  {
    id: 'g7-geography-14', grade: 7, strand: 'geography', title: "Đặc điểm tự nhiên Bắc Mỹ",
    summary: "Khái quát địa hình, khí hậu, sông hồ và các đới thiên nhiên Bắc Mỹ; giải thích sự phân hóa tự nhiên theo vĩ độ, địa hình và ảnh hưởng của biển.", learningObjectives: ["Xác định các khu vực địa hình chính của Bắc Mỹ trên bản đồ","Trình bày sự phân hóa khí hậu và thiên nhiên từ bắc xuống nam, từ tây sang đông","Giải thích vai trò của địa hình và vị trí đối với phân hóa tự nhiên"],
    sections: [{"heading":"Địa hình và các khu vực tự nhiên","body":"Bắc Mỹ có cấu trúc địa hình khá rõ theo chiều tây – đông. Phía tây là hệ thống núi trẻ Coóc-đi-e kéo dài theo hướng bắc – nam; ở giữa là đồng bằng rộng lớn; phía đông là miền núi già và sơn nguyên. Sự sắp xếp này ảnh hưởng đến hướng di chuyển của khối khí và phân bố mưa.","keyPoints":["Dãy Coóc-đi-e ở phía tây; đồng bằng trung tâm; miền núi già A-pa-lat ở phía đông."],"example":"Dãy Coóc-đi-e ở phía tây; đồng bằng trung tâm; miền núi già A-pa-lat ở phía đông."},{"heading":"Khí hậu, sông hồ và sinh vật","body":"Lãnh thổ Bắc Mỹ trải dài qua nhiều vĩ độ nên có các kiểu khí hậu từ hàn đới, ôn đới đến cận nhiệt. Dòng biển, địa hình và hướng gió làm khí hậu phân hóa theo khu vực. Hệ thống Ngũ Hồ và sông Mi-xi-xi-pi – Mi-xu-ri có vai trò lớn đối với giao thông, cấp nước và kinh tế.","keyPoints":["Miền bắc lạnh, miền nam ấm hơn; ven Thái Bình Dương có khác biệt rõ theo độ cao và hướng sườn."],"example":"Miền bắc lạnh, miền nam ấm hơn; ven Thái Bình Dương có khác biệt rõ theo độ cao và hướng sườn."},{"heading":"Đọc bản đồ và lí giải phân hóa","body":"Khi phân tích một khu vực, cần kết hợp bản đồ địa hình, khí hậu, sông ngòi và thảm thực vật thay vì chỉ dựa vào một yếu tố. Dãy núi cao có thể chắn gió ẩm, đồng bằng mở rộng tạo điều kiện cho khối khí di chuyển sâu vào nội địa. Hoạt động con người cũng làm biến đổi cảnh quan tự nhiên.","keyPoints":["Đối chiếu bản đồ lượng mưa với địa hình để giải thích sự khác nhau giữa sườn đón gió và khuất gió."],"example":"Đối chiếu bản đồ lượng mưa với địa hình để giải thích sự khác nhau giữa sườn đón gió và khuất gió."}],
    questions: [], status: 'draft',
  },
  {
    id: 'g7-geography-15', grade: 7, strand: 'geography', title: "Đặc điểm dân cư, xã hội, phương thức khai thác tự nhiên bền vững ở Bắc Mỹ",
    summary: "Tìm hiểu lịch sử cư trú, thành phần dân cư, đô thị hóa và cách khai thác tài nguyên gắn với bảo vệ môi trường ở Bắc Mỹ.", learningObjectives: ["Nêu được một số đặc điểm dân cư và đô thị hóa Bắc Mỹ","Nhận biết tính đa dạng về nguồn gốc và văn hóa dân cư","Phân tích ví dụ khai thác tài nguyên gắn với phát triển bền vững"],
    sections: [{"heading":"Dân cư và xã hội","body":"Bắc Mỹ là không gian đa dạng về thành phần dân cư, ngôn ngữ và văn hóa. Cư dân bản địa đã sinh sống tại đây từ lâu đời; các làn sóng di cư về sau làm thay đổi quy mô, phân bố và cơ cấu dân số. Dân cư phân bố không đều, tập trung đông ở các đồng bằng, ven biển và vùng đô thị có điều kiện kinh tế thuận lợi.","keyPoints":["Các đô thị lớn thường gắn với mạng lưới giao thông, dịch vụ, công nghiệp và các trung tâm nghiên cứu."],"example":"Các đô thị lớn thường gắn với mạng lưới giao thông, dịch vụ, công nghiệp và các trung tâm nghiên cứu."},{"heading":"Đô thị hóa và các vấn đề đặt ra","body":"Bắc Mỹ có mức độ đô thị hóa cao. Đô thị tạo động lực cho đổi mới, việc làm và dịch vụ nhưng cũng đặt ra yêu cầu về nhà ở, giao thông, phân hóa xã hội, tiêu thụ năng lượng và chất lượng không khí. Quy hoạch cần kết hợp giao thông công cộng, không gian xanh và sử dụng đất hiệu quả.","keyPoints":["Khi đánh giá một thành phố, cần xem xét cả cơ hội kinh tế lẫn chất lượng sống và khả năng tiếp cận dịch vụ."],"example":"Khi đánh giá một thành phố, cần xem xét cả cơ hội kinh tế lẫn chất lượng sống và khả năng tiếp cận dịch vụ."},{"heading":"Khai thác tự nhiên bền vững","body":"Bắc Mỹ có tài nguyên đất, nước, rừng, khoáng sản và năng lượng phong phú. Khai thác thiếu kiểm soát có thể gây xói mòn đất, suy giảm đa dạng sinh học và ô nhiễm nước. Các giải pháp gồm tiết kiệm tài nguyên, phục hồi hệ sinh thái, kiểm soát phát thải, nông nghiệp bảo tồn và tham vấn cộng đồng.","keyPoints":["Ví dụ: luân canh, che phủ đất và tưới tiết kiệm giúp giảm thoái hóa đất nông nghiệp."],"example":"Ví dụ: luân canh, che phủ đất và tưới tiết kiệm giúp giảm thoái hóa đất nông nghiệp."}],
    questions: [], status: 'draft',
  },
  {
    id: 'g7-geography-16', grade: 7, strand: 'geography', title: "Đặc điểm tự nhiên Trung và Nam Mỹ",
    summary: "Nhận biết địa hình, khí hậu, sông ngòi và các môi trường tự nhiên đa dạng của Trung và Nam Mỹ; chú ý mối liên hệ giữa Andes, đồng bằng Amazon và dòng biển.", learningObjectives: ["Xác định các miền địa hình chủ yếu trên bản đồ","Trình bày đặc điểm nổi bật của khí hậu, sông ngòi và sinh vật","Giải thích sự đa dạng tự nhiên qua vĩ độ, độ cao và dòng biển"],
    sections: [{"heading":"Địa hình","body":"Phía tây Nam Mỹ là dãy Andes kéo dài dọc bờ Thái Bình Dương, có nhiều núi cao và hoạt động kiến tạo. Ở trung tâm là các đồng bằng rộng như Amazon, La Plata; phía đông có sơn nguyên Guyana và Brazil. Trung Mỹ gồm eo đất hẹp và các đảo vùng Caribe, địa hình chịu ảnh hưởng rõ của núi và hoạt động núi lửa.","keyPoints":["Dãy Andes chạy dọc phía tây lục địa Nam Mỹ, tạo sự phân hóa mạnh theo độ cao."],"example":"Dãy Andes chạy dọc phía tây lục địa Nam Mỹ, tạo sự phân hóa mạnh theo độ cao."},{"heading":"Khí hậu, sông ngòi và sinh vật","body":"Lãnh thổ trải dài qua vùng xích đạo, nhiệt đới và ôn đới nên khí hậu rất đa dạng. Lưu vực Amazon có mạng lưới sông dày, lượng nước lớn và rừng mưa nhiệt đới rộng. Dãy Andes làm thay đổi nhiệt độ theo độ cao; dòng biển lạnh ven bờ tây góp phần tạo nên những khu vực khô hạn.","keyPoints":["Rừng Amazon có đa dạng sinh học cao; vùng núi Andes có các đai thiên nhiên thay đổi theo độ cao."],"example":"Rừng Amazon có đa dạng sinh học cao; vùng núi Andes có các đai thiên nhiên thay đổi theo độ cao."},{"heading":"Mối quan hệ giữa tự nhiên và con người","body":"Điều kiện tự nhiên tạo thuận lợi và giới hạn khác nhau cho cư trú, giao thông, nông nghiệp và khai khoáng. Phát triển kinh tế cần tính đến nguy cơ động đất, núi lửa, lũ lụt, hạn hán và suy giảm rừng. Bản đồ tự nhiên cần được đọc cùng bản đồ dân cư và sử dụng đất.","keyPoints":["Khi lập kế hoạch sử dụng đất ở lưu vực sông, cần tính đến chế độ nước, độ dốc, rừng đầu nguồn và nguy cơ lũ."],"example":"Khi lập kế hoạch sử dụng đất ở lưu vực sông, cần tính đến chế độ nước, độ dốc, rừng đầu nguồn và nguy cơ lũ."}],
    questions: [], status: 'draft',
  },
  {
    id: 'g7-geography-17', grade: 7, strand: 'geography', title: "Đặc điểm dân cư, xã hội Trung và Nam Mỹ, khai thác, sử dụng và bảo vệ rừng A-ma-dôn",
    summary: "Khái quát sự đa dạng dân cư, đô thị hóa và vai trò của rừng Amazon; phân tích sức ép khai thác và giải pháp bảo vệ hệ sinh thái.", learningObjectives: ["Mô tả một số nét đa dạng dân cư và đô thị hóa Trung, Nam Mỹ","Trình bày vai trò sinh thái và kinh tế của rừng Amazon","Đề xuất giải pháp sử dụng bền vững tài nguyên rừng"],
    sections: [{"heading":"Dân cư và xã hội","body":"Dân cư Trung và Nam Mỹ có nguồn gốc đa dạng, gồm các cộng đồng bản địa, hậu duệ người châu Âu, người gốc Phi và nhiều nhóm có nguồn gốc hỗn hợp. Ngôn ngữ, văn hóa và phân bố dân cư chịu ảnh hưởng của lịch sử thuộc địa, di cư và điều kiện tự nhiên. Dân cư tập trung nhiều ở ven biển, cao nguyên và đô thị.","keyPoints":["Không nên đồng nhất toàn bộ cư dân khu vực; mỗi quốc gia và cộng đồng có lịch sử, bản sắc riêng."],"example":"Không nên đồng nhất toàn bộ cư dân khu vực; mỗi quốc gia và cộng đồng có lịch sử, bản sắc riêng."},{"heading":"Đô thị hóa và chênh lệch phát triển","body":"Nhiều quốc gia có tốc độ đô thị hóa cao, với các đô thị lớn tập trung hoạt động công nghiệp và dịch vụ. Quá trình này tạo cơ hội việc làm nhưng cũng có thể dẫn đến thiếu nhà ở phù hợp, áp lực giao thông và bất bình đẳng tiếp cận dịch vụ. Cần sử dụng dữ liệu theo từng quốc gia và thời điểm để so sánh.","keyPoints":["Một báo cáo đô thị nên đối chiếu dân số, việc làm, hạ tầng và khả năng tiếp cận giáo dục, y tế."],"example":"Một báo cáo đô thị nên đối chiếu dân số, việc làm, hạ tầng và khả năng tiếp cận giáo dục, y tế."},{"heading":"Rừng Amazon và bảo vệ bền vững","body":"Amazon là hệ sinh thái rừng mưa nhiệt đới có quy mô lớn, lưu giữ đa dạng sinh học, tham gia điều hòa khí hậu và duy trì chu trình nước. Mở rộng nông nghiệp, khai thác gỗ, khoáng sản và hạ tầng thiếu kiểm soát gây mất rừng, phân mảnh sinh cảnh và ảnh hưởng sinh kế cộng đồng bản địa. Bảo vệ cần kết hợp thực thi pháp luật, quyền cộng đồng, sinh kế bền vững và phục hồi rừng.","keyPoints":["Đánh giá một dự án cần xem xét lợi ích kinh tế, tác động môi trường và quyền lợi của cộng đồng địa phương."],"example":"Đánh giá một dự án cần xem xét lợi ích kinh tế, tác động môi trường và quyền lợi của cộng đồng địa phương."}],
    questions: [], status: 'draft',
  },
  {
    id: 'g7-geography-18', grade: 7, strand: 'geography', title: "Châu Đại Dương",
    summary: "Tìm hiểu vị trí, các bộ phận lãnh thổ, đặc điểm tự nhiên, dân cư và hoạt động kinh tế tiêu biểu của châu Đại Dương.", learningObjectives: ["Xác định Australia, New Zealand và các nhóm đảo trên bản đồ","Nêu đặc điểm tự nhiên nổi bật của Australia và các đảo","Trình bày nét chính về dân cư và kinh tế châu Đại Dương"],
    sections: [{"heading":"Vị trí và phạm vi","body":"Châu Đại Dương nằm chủ yếu ở Thái Bình Dương, gồm lục địa Australia, New Zealand và nhiều đảo, quần đảo. Các đảo thường được phân thành Melanesia, Micronesia và Polynesia theo vị trí địa lí và đặc điểm lịch sử – văn hóa. Khoảng cách xa giữa các đảo khiến giao thông biển và hàng không có ý nghĩa quan trọng.","keyPoints":["Khi đọc bản đồ, phân biệt lục địa Australia với các quốc đảo và quần đảo ở Thái Bình Dương."],"example":"Khi đọc bản đồ, phân biệt lục địa Australia với các quốc đảo và quần đảo ở Thái Bình Dương."},{"heading":"Tự nhiên","body":"Australia có nội địa rộng, nhiều khu vực khô hạn và bán khô hạn; địa hình gồm cao nguyên phía tây, đồng bằng trung tâm và miền núi phía đông. New Zealand có địa hình núi trẻ, hoạt động kiến tạo và núi lửa. Các đảo Thái Bình Dương có thể là đảo núi lửa hoặc đảo san hô, dễ chịu tác động của bão và nước biển dâng.","keyPoints":["Sự khác nhau giữa nội địa Australia khô hạn và các đảo nhiệt đới ẩm thể hiện rõ tính đa dạng tự nhiên."],"example":"Sự khác nhau giữa nội địa Australia khô hạn và các đảo nhiệt đới ẩm thể hiện rõ tính đa dạng tự nhiên."},{"heading":"Dân cư và kinh tế","body":"Dân cư châu Đại Dương phân bố không đều, tập trung ở ven biển Australia, New Zealand và một số đảo. Kinh tế gồm dịch vụ, khai khoáng, nông nghiệp, chăn nuôi, du lịch và thủy sản với mức độ phát triển khác nhau giữa các quốc gia. Các đảo nhỏ đối mặt với chi phí vận tải cao, thiên tai và biến đổi khí hậu.","keyPoints":["Du lịch đảo cần gắn với bảo tồn rạn san hô, quản lí chất thải và tôn trọng văn hóa bản địa."],"example":"Du lịch đảo cần gắn với bảo tồn rạn san hô, quản lí chất thải và tôn trọng văn hóa bản địa."}],
    questions: [], status: 'draft',
  },
  {
    id: 'g7-geography-19', grade: 7, strand: 'geography', title: "Châu Nam Cực",
    summary: "Khám phá vị trí, điều kiện tự nhiên khắc nghiệt, vai trò khoa học toàn cầu và nguyên tắc bảo vệ môi trường châu Nam Cực.", learningObjectives: ["Xác định vị trí và phạm vi châu Nam Cực","Trình bày đặc điểm băng, khí hậu và sinh vật","Giải thích ý nghĩa nghiên cứu khoa học và bảo vệ môi trường"],
    sections: [{"heading":"Vị trí và điều kiện tự nhiên","body":"Châu Nam Cực nằm quanh cực Nam, phần lớn lãnh thổ nằm trong vòng cực Nam và được bao phủ bởi lớp băng dày. Đây là châu lục có nhiệt độ rất thấp, gió mạnh và lượng mưa thấp, chủ yếu dưới dạng tuyết. Băng lục địa chứa phần lớn lượng nước ngọt đóng băng của Trái Đất.","keyPoints":["Phân biệt băng lục địa trên đất liền với băng biển hình thành khi nước biển đóng băng."],"example":"Phân biệt băng lục địa trên đất liền với băng biển hình thành khi nước biển đóng băng."},{"heading":"Sinh vật và nghiên cứu khoa học","body":"Điều kiện khắc nghiệt khiến sinh vật trên lục địa nghèo nàn hơn vùng biển xung quanh. Chim cánh cụt, hải cẩu, cá voi và sinh vật phù du là những thành phần tiêu biểu của hệ sinh thái Nam Cực và Nam Đại Dương. Các trạm nghiên cứu quốc tế theo dõi khí hậu, băng, đại dương và biến đổi môi trường.","keyPoints":["Nghiên cứu lõi băng giúp tìm hiểu biến động khí hậu trong quá khứ."],"example":"Nghiên cứu lõi băng giúp tìm hiểu biến động khí hậu trong quá khứ."},{"heading":"Hợp tác và bảo vệ môi trường","body":"Nam Cực có ý nghĩa đặc biệt đối với nghiên cứu khoa học và hệ thống khí hậu toàn cầu. Hoạt động của con người cần tuân thủ các cơ chế hợp tác quốc tế, hạn chế ô nhiễm và bảo vệ hệ sinh thái mong manh. Biến đổi khí hậu có thể làm thay đổi khối lượng băng và góp phần tác động đến mực nước biển toàn cầu.","keyPoints":["Một chuyến khảo sát cần giảm rác thải, không làm xáo trộn động vật và tuân thủ quy định bảo tồn."],"example":"Một chuyến khảo sát cần giảm rác thải, không làm xáo trộn động vật và tuân thủ quy định bảo tồn."}],
    questions: [], status: 'draft',
  },
  { id: 'g7-integrated-1', grade: 7, strand: 'integrated', title: "Các cuộc đại phát kiến địa lí thế kỉ XV - XVI", summary: "Tìm hiểu bối cảnh, động lực, hành trình và hệ quả nhiều chiều của các cuộc thám hiểm hàng hải thế kỉ XV–XVI; nhận diện vai trò của tri thức địa lí, thương mại và công nghệ hàng hải.", learningObjectives: ["Trình bày được một số điều kiện thúc đẩy các chuyến thám hiểm hàng hải.","Đọc bản đồ để xác định một số tuyến hàng hải tiêu biểu.","Phân tích được hệ quả kinh tế, văn hóa và xã hội đối với các khu vực, trong đó có cả giao lưu và xâm chiếm thuộc địa."], sections: [{"heading":"Bối cảnh và động lực","body":"Từ cuối thời trung đại, nhu cầu tìm đường biển đến các thị trường châu Á, tìm kiếm hàng hóa và mở rộng hoạt động thương mại thúc đẩy nhiều quốc gia Tây Âu tổ chức thám hiểm. Những tiến bộ về la bàn, bản đồ, kĩ thuật đóng tàu và hiểu biết hàng hải tạo điều kiện cho các chuyến đi xa. Động lực kinh tế, chính trị và tôn giáo đan xen, không thể giải thích sự kiện chỉ bằng một nguyên nhân.","example":"Thương mại đường biển và cải tiến kĩ thuật hàng hải góp phần mở rộng khả năng đi biển."},{"heading":"Hành trình và kết nối thế giới","body":"Các chuyến đi của B. Đi-a-xơ, Va-xcô đơ Ga-ma, C. Cô-lôm-bô và đoàn thám hiểm do Ph. Ma-gien-lăng khởi đầu đã mở ra những tuyến hàng hải mới giữa các đại dương. Khi học bản đồ, cần phân biệt điểm xuất phát, hướng di chuyển, nơi đến và phạm vi hiểu biết địa lí của người châu Âu được mở rộng. Những vùng đất này không phải nơi “vô chủ”: nhiều cộng đồng bản địa đã sinh sống, xây dựng xã hội và nền văn minh từ trước.","example":"Dùng bản đồ tuyến đi để đối chiếu hành trình với các khu vực dân cư đã tồn tại."},{"heading":"Hệ quả nhiều chiều","body":"Các tuyến giao thương liên lục địa phát triển, trao đổi cây trồng, vật nuôi, hàng hóa và tri thức tăng lên. Đồng thời, quá trình chinh phục thuộc địa gây chiến tranh, cưỡng bức lao động, chiếm đất, dịch bệnh và tổn thất nghiêm trọng đối với nhiều cộng đồng bản địa. Đánh giá lịch sử cần đặt lợi ích của các nhóm khác nhau trong cùng bối cảnh, không chỉ nhìn từ góc độ các nước tổ chức thám hiểm.","example":"Một nhận xét cân bằng cần chỉ ra cả kết nối thương mại lẫn bạo lực thuộc địa và biến đổi dân cư."}], questions: [], status: 'draft' },
  { id: 'g7-integrated-2', grade: 7, strand: 'integrated', title: "Đô thị: Lịch sử và hiện tại", summary: "Khám phá sự hình thành, phát triển của đô thị qua các thời kì và phân tích vai trò, cơ hội, thách thức của đô thị trong đời sống hiện nay.", learningObjectives: ["Nhận biết một số điều kiện hình thành đô thị trong lịch sử.","Giải thích được mối quan hệ giữa vị trí, giao thông, sản xuất và sự phát triển đô thị.","Đề xuất cách ứng xử góp phần xây dựng đô thị an toàn, xanh và đáng sống."], sections: [{"heading":"Đô thị trong lịch sử","body":"Đô thị thường hình thành ở nơi thuận lợi cho giao thông, trao đổi hàng hóa, quản lí và tổ chức sản xuất như ven sông, bến cảng, đầu mối đường bộ hoặc trung tâm chính trị. Qua thời gian, chức năng đô thị có thể thay đổi; dấu tích thành lũy, phố cổ, chợ, công trình công cộng và tư liệu bản đồ giúp tìm hiểu quá trình đó.","example":"Khi khảo sát một đô thị cổ, hãy kết hợp bản đồ, di tích và tư liệu thành văn."},{"heading":"Đô thị hóa và chức năng hiện đại","body":"Đô thị hiện đại tập trung dân cư, cơ sở sản xuất, dịch vụ, giáo dục, y tế và các hoạt động văn hóa. Đô thị hóa tạo thêm việc làm, mở rộng cơ hội tiếp cận dịch vụ và thúc đẩy đổi mới, nhưng cũng làm tăng nhu cầu nhà ở, giao thông, nước sạch, năng lượng và xử lí chất thải. Tốc độ phát triển cần đi cùng quy hoạch và năng lực hạ tầng.","example":"Sự gia tăng dân số đô thị cần được xem xét cùng khả năng cung cấp nhà ở, trường học và giao thông."},{"heading":"Đô thị bền vững và di sản","body":"Một đô thị đáng sống cần không gian công cộng, giao thông an toàn, cây xanh, khả năng tiếp cận cho nhiều nhóm cư dân và hệ thống ứng phó thiên tai. Bảo tồn di sản không có nghĩa là đóng băng đô thị; cần kết hợp gìn giữ giá trị lịch sử với sử dụng thích hợp, tôn trọng cộng đồng và giảm tác động môi trường.","example":"Đi bộ, sử dụng phương tiện công cộng, phân loại rác và bảo vệ di tích là những hành động thiết thực."}], questions: [], status: 'draft' },
  {"id":"g8-history-01","grade":8,"strand":"history","title":"Cách mạng tư sản Anh và chiến tranh giành độc lập của 13 thuộc địa Anh ở Bắc Mỹ","summary":"Tìm hiểu bối cảnh, diễn biến chính, kết quả và ý nghĩa của Cách mạng tư sản Anh thế kỉ XVII và cuộc chiến tranh giành độc lập của 13 thuộc địa Anh ở Bắc Mỹ.","learningObjectives":["Nêu được một số nguyên nhân và diễn biến chính của hai cuộc cách mạng.","Phân biệt bối cảnh, lực lượng và kết quả của hai sự kiện.","Nhận xét được ý nghĩa lịch sử và giới hạn của các cuộc cách mạng."],"sections":[{"heading":"Cách mạng tư sản Anh thế kỉ XVII","body":"Đến thế kỉ XVII, quan hệ sản xuất tư bản chủ nghĩa và tầng lớp quý tộc mới phát triển, trong khi chế độ quân chủ chuyên chế và chính sách của triều đình gây bất đồng với nhiều lực lượng trong xã hội. Mâu thuẫn chính trị, kinh tế và tôn giáo dẫn tới nội chiến. Năm 1649, vua Sác-lơ I bị xử tử và nước Anh được tuyên bố là cộng hòa; sau thời kì phục hồi quân chủ, cuộc biến động năm 1688–1689 xác lập chế độ quân chủ lập hiến. Quá trình này diễn ra phức tạp, không phải thay đổi trong một thời điểm duy nhất.","keyPoints":["Nội chiến, cộng hòa, phục hồi quân chủ và Cách mạng Vinh quang là các mốc cần phân biệt."],"example":"Khi lập dòng thời gian, đặt mốc 1649 và 1688–1689 đúng trình tự để thấy tính kéo dài của biến động."},{"heading":"Chiến tranh giành độc lập ở Bắc Mỹ","body":"Mười ba thuộc địa Anh ở Bắc Mỹ phát triển kinh tế nhưng chịu các chính sách thuế và kiểm soát thương mại từ chính quốc. Xung đột về quyền đại diện và quyền tự quản ngày càng gay gắt. Tuyên ngôn Độc lập được công bố ngày 4/7/1776, khẳng định sự tách khỏi Anh. Chiến tranh kết thúc với thắng lợi của thuộc địa; Hiệp ước Pa-ri năm 1783 buộc Anh công nhận nền độc lập của Hoa Kỳ. Bối cảnh thuộc địa và sự tham gia của nhiều nhóm cư dân cần được xem xét khi đánh giá sự kiện.","keyPoints":["Tuyên ngôn Độc lập năm 1776 và Hiệp ước Pa-ri năm 1783 là hai mốc quan trọng."],"example":"Phân biệt thời điểm tuyên bố độc lập với thời điểm Anh chính thức công nhận độc lập."},{"heading":"Kết quả và ý nghĩa lịch sử","body":"Cách mạng tư sản Anh làm suy yếu nền quân chủ chuyên chế và tạo điều kiện cho chủ nghĩa tư bản phát triển. Cuộc chiến ở Bắc Mỹ dẫn tới sự ra đời của Hợp chúng quốc Hoa Kỳ và cổ vũ tư tưởng quyền tự do, quyền đại diện. Tuy nhiên, các tuyên ngôn về quyền bình đẳng chưa được thực hiện đầy đủ với mọi người: chế độ nô lệ tiếp tục tồn tại ở Hoa Kỳ và người bản địa phải chịu quá trình chiếm đất. So sánh hai sự kiện cần nêu điểm giống, khác và giới hạn lịch sử thay vì đánh giá đơn giản.","keyPoints":["Ý nghĩa chính trị cần được xem cùng những giới hạn về quyền bình đẳng trong thực tế."],"example":"Một bảng so sánh có thể dùng các tiêu chí: nguyên nhân, lực lượng, diễn biến, kết quả và tác động xã hội."}],"questions":[],"status":"draft"},
  {"id":"g8-history-02","grade":8,"strand":"history","title":"Cách mạng tư sản Pháp cuối thế kỉ XVIII","summary":"Tìm hiểu nguyên nhân, diễn biến chính, kết quả và ý nghĩa của Cách mạng tư sản Pháp năm 1789; nhận diện vai trò của quần chúng và những giới hạn lịch sử.","learningObjectives":["Nêu được nguyên nhân sâu xa và trực tiếp của cách mạng.","Trình bày được một số mốc diễn biến tiêu biểu từ năm 1789 đến cuối thế kỉ XVIII.","Phân tích được ý nghĩa và giới hạn của cách mạng."],"sections":[{"heading":"Nước Pháp trước cách mạng","body":"Cuối thế kỉ XVIII, xã hội Pháp vẫn duy trì chế độ đẳng cấp với những đặc quyền lớn dành cho tăng lữ và quý tộc. Đẳng cấp thứ ba gồm tư sản, nông dân và bình dân thành thị phải gánh nhiều nghĩa vụ, trong khi khủng hoảng tài chính, mất mùa và giá lương thực tăng làm đời sống thêm khó khăn. Tư tưởng Khai sáng phê phán chế độ chuyên chế và đặc quyền, góp phần tạo cơ sở tư tưởng cho thay đổi chính trị.","keyPoints":["Bất bình đẳng đẳng cấp, khủng hoảng tài chính và tư tưởng Khai sáng là những nguyên nhân quan trọng."],"example":"Phân biệt nguyên nhân xã hội lâu dài với sự kiện trực tiếp làm bùng nổ cách mạng."},{"heading":"Diễn biến chính năm 1789 và những năm tiếp theo","body":"Ngày 14/7/1789, quần chúng Pa-ri tấn công pháo đài Ba-xti, sự kiện biểu tượng cho sự sụp đổ của quyền lực chuyên chế. Quốc hội thông qua Tuyên ngôn Nhân quyền và Dân quyền tháng 8/1789, khẳng định các nguyên tắc tự do và bình đẳng về quyền. Cách mạng tiếp tục qua nhiều giai đoạn, chế độ quân chủ bị lật đổ năm 1792 và nền cộng hòa được thành lập. Diễn biến không tuyến tính mà có xung đột giữa các lực lượng và thay đổi chính quyền.","keyPoints":["14/7/1789 và Tuyên ngôn tháng 8/1789 là các mốc tiêu biểu; năm 1792 chế độ quân chủ bị lật đổ."],"example":"Dùng dòng thời gian để phân biệt sự kiện Ba-xti, Tuyên ngôn Nhân quyền và việc thành lập nền cộng hòa."},{"heading":"Kết quả, ý nghĩa và giới hạn","body":"Cách mạng Pháp lật đổ nền quân chủ chuyên chế, xóa bỏ nhiều đặc quyền phong kiến và tạo điều kiện cho quan hệ tư bản chủ nghĩa phát triển. Tư tưởng tự do, bình đẳng và chủ quyền nhân dân có ảnh hưởng sâu rộng ở châu Âu và thế giới. Tuy nhiên, quyền chính trị và bình đẳng trong thực tế còn giới hạn; phụ nữ và nhiều nhóm dân cư không được hưởng đầy đủ quyền như nam giới. Khi đánh giá cần đặt thành tựu trong bối cảnh lịch sử, đồng thời nhận diện những nhóm chưa được thụ hưởng.","keyPoints":["Cách mạng có ý nghĩa lớn nhưng không lập tức bảo đảm bình đẳng thực chất cho mọi người."],"example":"So sánh nội dung tuyên ngôn với thực tế quyền chính trị của các nhóm xã hội để nhận ra giới hạn."}],"questions":[],"status":"draft"},

  {
    id: 'g8-history-03', grade: 8, strand: 'history',
    title: 'Cách mạng công nghiệp (nửa sau thế kỉ XVIII - giữa thế kỉ XIX)',
    summary: 'Tìm hiểu điều kiện ra đời, những phát minh tiêu biểu, sự chuyển biến trong sản xuất và tác động kinh tế, xã hội của Cách mạng công nghiệp lần thứ nhất.',
    learningObjectives: [
      'Trình bày được những điều kiện chủ yếu dẫn đến Cách mạng công nghiệp ở Anh.',
      'Nêu được một số phát minh tiêu biểu trong ngành dệt và giao thông vận tải.',
      'Phân tích được tác động tích cực, hạn chế và sự biến đổi của đời sống xã hội.'
    ],
    sections: [
      {
        heading: 'Điều kiện và nơi khởi đầu',
        body: 'Cách mạng công nghiệp lần thứ nhất bắt đầu ở Anh vào nửa sau thế kỉ XVIII. Anh có những điều kiện thuận lợi như nguồn vốn tích lũy, thị trường trong và ngoài nước, nguồn nguyên liệu, lao động và tài nguyên than đá, sắt. Nhu cầu tăng năng suất và mở rộng sản xuất thúc đẩy việc cải tiến công cụ, máy móc. Quá trình này diễn ra từng bước, trước hết nổi bật trong ngành dệt, sau đó lan sang luyện kim, khai mỏ và các lĩnh vực khác.',
        keyPoints: ['Anh là nơi khởi đầu; các điều kiện kinh tế, thị trường, tài nguyên và kĩ thuật cùng tác động.'],
        example: 'Khi giải thích vì sao cách mạng công nghiệp khởi đầu ở Anh, cần kết hợp nhiều điều kiện thay vì chỉ nêu một phát minh.'
      },
      {
        heading: 'Phát minh và sự thay đổi trong sản xuất',
        body: 'Những cải tiến máy kéo sợi, máy dệt và việc sử dụng máy hơi nước đã làm thay đổi phương thức sản xuất. Máy móc giúp tăng sản lượng, giảm sự phụ thuộc vào thao tác thủ công và thúc đẩy sự phát triển của nhà máy. Máy hơi nước được cải tiến để cung cấp nguồn động lực cho nhiều ngành, đồng thời góp phần thúc đẩy giao thông vận tải bằng đầu máy xe lửa và tàu thủy chạy bằng hơi nước. Các phát minh thường kế tiếp, bổ trợ và tạo ra nhu cầu cải tiến mới.',
        keyPoints: ['Máy móc và động lực hơi nước là những yếu tố quan trọng thúc đẩy cơ giới hóa sản xuất.'],
        example: 'So sánh một xưởng thủ công với nhà máy cơ khí giúp nhận ra sự khác biệt về quy mô, năng suất và tổ chức lao động.'
      },
      {
        heading: 'Tác động kinh tế và xã hội',
        body: 'Cách mạng công nghiệp làm tăng năng suất, mở rộng sản xuất hàng hóa, thúc đẩy đô thị hóa và hình thành những trung tâm công nghiệp. Xã hội biến đổi với sự phát triển của giai cấp tư sản công nghiệp và giai cấp công nhân. Tuy nhiên, lao động nhà máy trong giai đoạn đầu thường kéo dài, điều kiện làm việc khó khăn; ô nhiễm và chênh lệch giàu nghèo cũng gia tăng. Đánh giá tác động cần nhìn cả thành tựu về sản xuất, giao thông lẫn những vấn đề xã hội và môi trường phát sinh.',
        keyPoints: ['Công nghiệp hóa tạo ra tăng trưởng và biến đổi xã hội, đồng thời đặt ra vấn đề về lao động và môi trường.'],
        example: 'Một nhận xét đầy đủ về đô thị công nghiệp cần xem xét cả việc làm, hạ tầng, điều kiện lao động và ô nhiễm.'
      }
    ],
    questions: [], status: 'draft',
  },

  {
    id: 'g8-history-04', grade: 8, strand: 'history',
    title: 'Đông Nam Á từ nửa sau thế kỉ XVI đến giữa thế kỉ XIX',
    summary: 'Khái quát tình hình các quốc gia Đông Nam Á trong bối cảnh mở rộng thương mại quốc tế, sự xâm nhập của phương Tây và những chuyển biến chính trị, kinh tế, xã hội từ nửa sau thế kỉ XVI đến giữa thế kỉ XIX.',
    learningObjectives: [
      'Nêu được một số nét chính về tình hình Đông Nam Á trong giai đoạn.',
      'Giải thích được những tác động của hoạt động thương mại và sự can thiệp của các nước phương Tây.',
      'Nhận biết được các hình thức đấu tranh và ứng phó của cư dân, chính quyền bản địa.'
    ],
    sections: [
      {
        heading: 'Bối cảnh khu vực và hoạt động thương mại',
        body: 'Từ nửa sau thế kỉ XVI, Đông Nam Á tiếp tục giữ vị trí quan trọng trên các tuyến giao thương nối Ấn Độ Dương và Thái Bình Dương. Các mặt hàng như gia vị, hương liệu, lúa gạo và sản vật nhiệt đới thu hút thương nhân bên ngoài. Một số cảng thị phát triển, đồng thời các thế lực châu Âu từng bước mở rộng hoạt động buôn bán, lập thương điếm và tìm cách kiểm soát nguồn hàng, tuyến đường. Hoạt động thương mại đem lại cơ hội trao đổi nhưng cũng làm gia tăng cạnh tranh và sức ép từ bên ngoài.',
        keyPoints: ['Vị trí giao thương và nguồn sản vật khiến Đông Nam Á trở thành địa bàn cạnh tranh của các thế lực bên ngoài.'],
        example: 'Khi tìm hiểu một cảng thị, cần xem xét vị trí trên tuyến hàng hải, mặt hàng trao đổi và các lực lượng tham gia.'
      },
      {
        heading: 'Sự xâm nhập và mở rộng ảnh hưởng của phương Tây',
        body: 'Các nước phương Tây sử dụng nhiều biện pháp khác nhau để mở rộng ảnh hưởng tại Đông Nam Á, từ lập thương điếm, độc quyền buôn bán đến can thiệp chính trị và dùng vũ lực. Quá trình này diễn ra không đồng đều giữa các quốc gia. Một số vùng lãnh thổ dần trở thành thuộc địa hoặc chịu sự kiểm soát ngày càng chặt chẽ; một số chính quyền tìm cách cải cách, thương lượng hoặc điều chỉnh chính sách để bảo vệ chủ quyền. Không nên coi toàn khu vực có cùng một diễn biến hay cùng một thời điểm mất độc lập.',
        keyPoints: ['Quá trình bành trướng của phương Tây khác nhau theo từng quốc gia và từng thời điểm.'],
        example: 'So sánh cách ứng phó của các chính quyền trong khu vực giúp thấy rõ sự đa dạng của bối cảnh lịch sử.'
      },
      {
        heading: 'Chuyển biến xã hội và các phong trào đấu tranh',
        body: 'Sự cạnh tranh thương mại, chiến tranh và chính sách cai trị từ bên ngoài tác động đến đời sống kinh tế, xã hội ở nhiều nơi. Người dân phải đối mặt với thuế khóa, lao dịch, mất đất hoặc những thay đổi trong hoạt động sản xuất. Nhiều cuộc đấu tranh chống xâm lược và chống áp bức diễn ra với thành phần, mục tiêu và kết quả khác nhau. Khi học về giai đoạn này, cần đặt mỗi phong trào trong hoàn cảnh cụ thể, phân biệt đấu tranh bảo vệ chủ quyền với những xung đột nội bộ.',
        keyPoints: ['Sức ép bên ngoài và biến đổi trong nước làm nảy sinh nhiều hình thức đấu tranh, phản kháng.'],
        example: 'Lập bảng gồm nguyên nhân, lực lượng tham gia, mục tiêu và kết quả sẽ giúp so sánh các phong trào.'
      }
    ],
    questions: [], status: 'draft',
  },

  {
    id: 'g8-history-05', grade: 8, strand: 'history',
    title: 'Cuộc xung đột Nam - Bắc triều và Trịnh - Nguyễn',
    summary: 'Tìm hiểu bối cảnh phân hóa quyền lực ở Đại Việt thế kỉ XVI–XVII, cuộc đối đầu giữa nhà Mạc và lực lượng Lê trung hưng, tiếp đó là xung đột Trịnh – Nguyễn và những tác động lâu dài đối với đất nước.',
    learningObjectives: [
      'Trình bày được bối cảnh hình thành Nam – Bắc triều và xung đột Trịnh – Nguyễn.',
      'Nêu được một số mốc chính và kết quả của các cuộc xung đột.',
      'Phân tích được tác động của tình trạng chia cắt đối với chính trị, kinh tế và đời sống.'
    ],
    sections: [
      {
        heading: 'Sự hình thành Nam – Bắc triều',
        body: 'Đầu thế kỉ XVI, triều Lê sơ suy yếu, tình hình chính trị rối ren và các phe phái tranh giành quyền lực. Năm 1527, Mạc Đăng Dung lập nhà Mạc. Một bộ phận lực lượng trung thành với nhà Lê tiếp tục hoạt động, sau đó xây dựng chính quyền Lê trung hưng ở Thanh Hóa. Từ đây hình thành cục diện đối đầu thường gọi là Nam – Bắc triều. Cuộc chiến kéo dài nhiều thập niên, làm cho đất nước bị phân chia về chính trị và gây tổn thất cho cư dân.',
        keyPoints: ['Nhà Mạc thành lập năm 1527; lực lượng Lê trung hưng hình thành ở phía nam, tạo cục diện Nam – Bắc triều.'],
        example: 'Khi lập dòng thời gian, cần phân biệt năm nhà Mạc thành lập với các mốc kết thúc xung đột sau đó.'
      },
      {
        heading: 'Xung đột Trịnh – Nguyễn',
        body: 'Trong lực lượng Lê trung hưng, quyền lực dần tập trung vào họ Trịnh ở Đàng Ngoài và họ Nguyễn ở Đàng Trong. Nguyễn Hoàng vào trấn thủ Thuận Hóa năm 1558, mở đầu quá trình xây dựng thế lực riêng của họ Nguyễn ở phía nam. Từ năm 1627, chiến tranh Trịnh – Nguyễn bùng nổ và diễn ra qua nhiều đợt. Đến năm 1672, hai bên ngừng giao tranh lớn, lấy sông Gianh làm ranh giới phân chia phạm vi kiểm soát. Vua Lê vẫn tồn tại về danh nghĩa, nhưng quyền lực thực tế nằm trong tay các chúa.',
        keyPoints: ['Trịnh – Nguyễn đối đầu kéo dài; sông Gianh trở thành ranh giới phân chia Đàng Ngoài và Đàng Trong sau năm 1672.'],
        example: 'Dùng bản đồ để xác định vị trí sông Gianh và giải thích ý nghĩa địa lí – chính trị của ranh giới này.'
      },
      {
        heading: 'Hệ quả và đánh giá lịch sử',
        body: 'Các cuộc xung đột làm suy yếu sự thống nhất chính trị, gây thiệt hại về người và của, ảnh hưởng đến sản xuất và đời sống. Tuy vậy, trong thời kì này, quá trình khai phá và mở rộng cư trú về phía nam vẫn tiếp diễn, thương mại ở một số đô thị và cảng thị phát triển. Khi đánh giá giai đoạn, cần phân biệt tác động tiêu cực của chiến tranh với những chuyển biến kinh tế, xã hội diễn ra đồng thời; tránh quy toàn bộ đời sống đất nước vào riêng một mặt của lịch sử.',
        keyPoints: ['Chia cắt và chiến tranh gây nhiều tổn thất, trong khi một số hoạt động kinh tế và quá trình mở rộng lãnh thổ vẫn tiếp tục.'],
        example: 'Một nhận xét cân bằng cần nêu cả hệ quả của xung đột và những chuyển biến khác trong xã hội cùng thời.'
      }
    ],
    questions: [], status: 'draft',
  },

  {
    id: 'g8-history-06', grade: 8, strand: 'history',
    title: 'Công cuộc khai phá vùng đất phía Nam từ thế kỉ XVI đến thế kỉ XVIII',
    summary: 'Tìm hiểu quá trình người Việt mở rộng cư trú, khai phá đất đai và hình thành các đơn vị hành chính ở vùng đất phía Nam từ thế kỉ XVI đến thế kỉ XVIII; nhận biết vai trò của nhiều cộng đồng cư dân trong tiến trình này.',
    learningObjectives: [
      'Nêu được một số mốc chính trong quá trình mở rộng về phía nam.',
      'Giải thích được vai trò của di dân, khai hoang, thương mại và tổ chức hành chính.',
      'Nhận biết được sự đa dạng cộng đồng cư dân và những chuyển biến ở vùng đất phía Nam.'
    ],
    sections: [
      {
        heading: 'Bối cảnh và các đợt di dân',
        body: 'Từ thế kỉ XVI, cùng với quá trình hình thành thế lực họ Nguyễn ở Đàng Trong, nhiều nhóm cư dân từ các vùng khác nhau di chuyển về phía nam. Họ khai hoang, lập làng, phát triển ruộng đồng, nghề thủ công và hoạt động trao đổi. Quá trình này diễn ra trong thời gian dài, gắn với điều kiện tự nhiên, chính sách của chính quyền và sự giao lưu với các cộng đồng đã sinh sống tại đây. Không nên hiểu việc mở rộng cư trú là một sự kiện diễn ra trong một năm hay chỉ do một lực lượng thực hiện.',
        keyPoints: ['Di dân và khai hoang là quá trình lâu dài, có sự tham gia của nhiều cộng đồng cư dân.'],
        example: 'Khi nghiên cứu một vùng đất mới khai phá, cần xem xét cư dân đến từ đâu, điều kiện tự nhiên và cách thức tổ chức sản xuất.'
      },
      {
        heading: 'Mở rộng địa bàn và tổ chức hành chính',
        body: 'Chính quyền họ Nguyễn từng bước mở rộng phạm vi quản lí về phía nam. Năm 1611, phủ Phú Yên được thành lập; năm 1698, Nguyễn Hữu Cảnh được cử vào kinh lược vùng đất phía nam, tổ chức đơn vị hành chính ở khu vực Đồng Nai và Gia Định. Ở phía tây nam, quá trình xác lập quan hệ và tổ chức quản lí diễn ra qua nhiều bước, có sự tham gia của các lực lượng và cộng đồng khác nhau. Các mốc này cho thấy sự mở rộng địa bàn gắn với việc thiết lập bộ máy quản lí, chứ không chỉ là hoạt động di chuyển dân cư.',
        keyPoints: ['Các mốc 1611 và 1698 là dấu mốc quan trọng trong quá trình mở rộng và tổ chức quản lí vùng đất phía nam.'],
        example: 'Đặt các mốc 1611 và 1698 lên dòng thời gian để nhận ra tiến trình diễn ra qua nhiều giai đoạn.'
      },
      {
        heading: 'Kinh tế, văn hóa và sự đa dạng cư dân',
        body: 'Cùng với khai hoang và lập làng, sản xuất nông nghiệp, nghề thủ công và thương mại phát triển ở nhiều địa bàn. Một số đô thị, thương cảng trở thành nơi giao lưu trong khu vực và với bên ngoài. Vùng đất phía nam là không gian sinh sống, giao lưu của người Việt, Khmer, Hoa, Chăm và các cộng đồng khác. Quá trình cộng cư tạo nên những nét phong phú về kinh tế, tín ngưỡng, phong tục và văn hóa. Khi học nội dung này cần tôn trọng vai trò và lịch sử của các cộng đồng cư dân đã sinh sống, đóng góp tại vùng đất.',
        keyPoints: ['Vùng đất phía nam hình thành qua giao lưu, cộng cư và đóng góp của nhiều cộng đồng.'],
        example: 'Tìm hiểu tên địa danh, di tích hoặc lễ hội địa phương có thể giúp nhận biết dấu ấn giao lưu văn hóa.'
      }
    ],
    questions: [], status: 'draft',
  },

  {
    id: 'g8-history-07', grade: 8, strand: 'history',
    title: 'Khởi nghĩa nông dân ở Đàng Ngoài thế kỉ XVIII',
    summary: 'Tìm hiểu nguyên nhân, một số cuộc khởi nghĩa nông dân tiêu biểu ở Đàng Ngoài thế kỉ XVIII và tác động của phong trào đối với chính quyền Lê – Trịnh và xã hội đương thời.',
    learningObjectives: [
      'Giải thích được những nguyên nhân chủ yếu dẫn đến phong trào khởi nghĩa nông dân.',
      'Nêu được một số cuộc khởi nghĩa tiêu biểu và đặc điểm chung của phong trào.',
      'Đánh giá được tác động của các cuộc khởi nghĩa đối với chính quyền và xã hội.'
    ],
    sections: [
      {
        heading: 'Nguyên nhân bùng nổ phong trào',
        body: 'Trong thế kỉ XVIII, chính quyền Lê – Trịnh ở Đàng Ngoài lâm vào tình trạng khủng hoảng. Quan lại tham nhũng, bộ máy cai trị suy yếu, tô thuế và các khoản đóng góp nặng nề khiến đời sống nhiều tầng lớp nhân dân khó khăn. Thiên tai, mất mùa và nạn đói ở một số địa phương càng làm mâu thuẫn xã hội gay gắt. Trong hoàn cảnh đó, nhiều cuộc nổi dậy của nông dân và người dân nghèo bùng nổ ở các vùng khác nhau.',
        keyPoints: ['Khủng hoảng chính quyền, áp bức kinh tế và khó khăn đời sống là những nguyên nhân quan trọng.'],
        example: 'Khi giải thích nguyên nhân một cuộc khởi nghĩa, cần kết hợp bối cảnh chính trị với điều kiện kinh tế và đời sống.'
      },
      {
        heading: 'Một số cuộc khởi nghĩa tiêu biểu',
        body: 'Phong trào diễn ra rộng ở nhiều địa phương, có những cuộc nổi dậy kéo dài và gây sức ép lớn đối với chính quyền. Có thể kể đến cuộc khởi nghĩa của Nguyễn Hữu Cầu ở vùng ven biển và đồng bằng Bắc Bộ, Hoàng Công Chất ở vùng Sơn Nam rồi phát triển lên Tây Bắc, cùng các phong trào do Nguyễn Danh Phương và những thủ lĩnh khác lãnh đạo. Mỗi cuộc khởi nghĩa có địa bàn, lực lượng và diễn biến riêng; không phải tất cả đều liên kết thành một phong trào thống nhất. Phần lớn cuối cùng bị đàn áp, nhưng cho thấy sự bất ổn sâu sắc của xã hội.',
        keyPoints: ['Các cuộc khởi nghĩa có nhiều trung tâm, thủ lĩnh và địa bàn khác nhau; phong trào không phải một tổ chức thống nhất.'],
        example: 'Lập bảng theo thủ lĩnh, địa bàn, thời gian và kết quả giúp tránh nhầm lẫn giữa các cuộc khởi nghĩa.'
      },
      {
        heading: 'Tác động và ý nghĩa lịch sử',
        body: 'Dù phần lớn bị đàn áp, các cuộc khởi nghĩa làm chính quyền Lê – Trịnh phải đối phó trên nhiều địa bàn, bộc lộ rõ sự suy yếu của bộ máy cai trị và làm rung chuyển trật tự xã hội. Phong trào phản ánh nguyện vọng chống áp bức, đòi cải thiện đời sống của nhân dân. Tuy nhiên, do lực lượng phân tán, mục tiêu và cách tổ chức khác nhau, các cuộc nổi dậy chưa tạo được một chính quyền thay thế bền vững. Đây là bối cảnh quan trọng để hiểu những biến động lớn hơn ở Đàng Ngoài vào nửa sau thế kỉ XVIII.',
        keyPoints: ['Phong trào thể hiện mâu thuẫn xã hội sâu sắc và góp phần làm suy yếu chính quyền Lê – Trịnh.'],
        example: 'Đánh giá phong trào cần nêu cả tác động làm rung chuyển chính quyền và hạn chế do thiếu sự liên kết thống nhất.'
      }
    ],
    questions: [], status: 'draft',
  },

  {
    id: 'g8-history-08', grade: 8, strand: 'history',
    title: 'Phong trào Tây Sơn',
    summary: 'Tìm hiểu nguyên nhân bùng nổ, những thắng lợi tiêu biểu và vai trò của phong trào Tây Sơn trong việc lật đổ các tập đoàn phong kiến, bảo vệ độc lập và thống nhất đất nước cuối thế kỉ XVIII.',
    learningObjectives: [
      'Nêu được nguyên nhân và những nét chính về sự phát triển của phong trào Tây Sơn.',
      'Trình bày được ý nghĩa của các chiến thắng Rạch Gầm – Xoài Mút và Ngọc Hồi – Đống Đa.',
      'Đánh giá được vai trò lịch sử của phong trào Tây Sơn và vua Quang Trung.'
    ],
    sections: [
      {
        heading: 'Bối cảnh và sự bùng nổ phong trào',
        body: 'Nửa sau thế kỉ XVIII, chính quyền chúa Nguyễn ở Đàng Trong và chính quyền Lê – Trịnh ở Đàng Ngoài đều bộc lộ nhiều khủng hoảng. Thuế khóa, tham nhũng và những khó khăn kinh tế làm đời sống nhân dân thêm cực khổ. Năm 1771, phong trào Tây Sơn bùng nổ ở vùng Tây Sơn, Bình Định, do ba anh em Nguyễn Nhạc, Nguyễn Huệ và Nguyễn Lữ lãnh đạo. Phong trào nhanh chóng thu hút đông đảo nhân dân tham gia, phát triển từ một cuộc nổi dậy địa phương thành phong trào có ảnh hưởng trên phạm vi rộng.',
        keyPoints: ['Phong trào bùng nổ năm 1771 ở Tây Sơn, Bình Định trong bối cảnh khủng hoảng và mâu thuẫn xã hội.'],
        example: 'Khi giải thích sự lan rộng của phong trào, cần xem xét cả sự suy yếu của chính quyền và sự ủng hộ của các tầng lớp nhân dân.'
      },
      {
        heading: 'Những thắng lợi quân sự tiêu biểu',
        body: 'Phong trào Tây Sơn lần lượt đánh đổ chính quyền chúa Nguyễn ở Đàng Trong và làm thay đổi cục diện chính trị trong nước. Năm 1785, quân Tây Sơn do Nguyễn Huệ chỉ huy giành thắng lợi ở Rạch Gầm – Xoài Mút, đánh bại quân Xiêm can thiệp. Năm 1786, quân Tây Sơn tiến ra Bắc, lật đổ chính quyền họ Trịnh. Cuối năm 1788, quân Thanh tiến vào nước ta; Nguyễn Huệ lên ngôi hoàng đế, lấy niên hiệu Quang Trung và chỉ huy chiến dịch phản công. Chiến thắng Ngọc Hồi – Đống Đa mùa xuân năm 1789 đánh bại quân Thanh, bảo vệ nền độc lập.',
        keyPoints: ['Rạch Gầm – Xoài Mút năm 1785 đánh bại quân Xiêm; Ngọc Hồi – Đống Đa năm 1789 đánh bại quân Thanh.'],
        example: 'Dùng dòng thời gian để phân biệt hai chiến thắng: năm 1785 ở phía nam và mùa xuân 1789 ở phía bắc.'
      },
      {
        heading: 'Ý nghĩa và những việc làm của Quang Trung',
        body: 'Phong trào Tây Sơn góp phần lật đổ các tập đoàn phong kiến đang chia cắt đất nước, đánh bại những lực lượng ngoại xâm lớn và tạo điều kiện cho việc thống nhất quốc gia. Sau khi lên ngôi, Quang Trung quan tâm khôi phục sản xuất, ổn định đời sống, phát triển giáo dục và xây dựng chính quyền. Tuy nhiên, triều đại Tây Sơn tồn tại trong thời gian không dài; sau khi Quang Trung mất năm 1792, tình hình chính trị gặp nhiều khó khăn và triều Tây Sơn sụp đổ năm 1802. Đánh giá phong trào cần nhìn cả đóng góp lớn lao lẫn giới hạn và bối cảnh phức tạp của thời kì.',
        keyPoints: ['Tây Sơn có đóng góp nổi bật về lật đổ các thế lực phong kiến, chống ngoại xâm và thúc đẩy thống nhất đất nước.'],
        example: 'Một đánh giá lịch sử cân bằng cần kết hợp thắng lợi quân sự với những nỗ lực xây dựng đất nước và diễn biến sau năm 1792.'
      }
    ],
    questions: [], status: 'draft',
  },

  {
    id: 'g8-history-09', grade: 8, strand: 'history',
    title: 'Tình hình kinh tế, văn hóa, tôn giáo trong các thế kỉ XVI - XVIII',
    summary: 'Khái quát những chuyển biến về nông nghiệp, thủ công nghiệp, thương mại, đời sống văn hóa và tôn giáo ở Đại Việt trong các thế kỉ XVI–XVIII; nhận biết sự khác biệt giữa các vùng và tác động của bối cảnh chính trị.',
    learningObjectives: [
      'Nêu được một số nét chính về nông nghiệp, thủ công nghiệp và thương mại.',
      'Nhận biết được sự phát triển của đô thị, cảng thị và hoạt động giao lưu.',
      'Trình bày được một số chuyển biến về văn hóa, tín ngưỡng và tôn giáo.'
    ],
    sections: [
      {
        heading: 'Chuyển biến trong nông nghiệp và thủ công nghiệp',
        body: 'Trong các thế kỉ XVI–XVIII, tình hình nông nghiệp có sự khác biệt giữa các vùng và từng thời điểm. Chiến tranh, thiên tai và chính sách thuế khóa gây khó khăn cho sản xuất ở nhiều nơi; quá trình khai hoang và mở rộng cư trú ở phía nam lại tạo thêm những vùng canh tác mới. Các nghề thủ công như dệt, gốm, rèn, đúc và làm đường phát triển ở nhiều làng nghề, phục vụ nhu cầu trong nước và trao đổi hàng hóa. Sản xuất chịu ảnh hưởng của điều kiện tự nhiên, thị trường và tình hình chính trị.',
        keyPoints: ['Nông nghiệp biến động theo vùng; khai hoang mở rộng diện tích canh tác ở một số khu vực, thủ công nghiệp tiếp tục phát triển.'],
        example: 'Khi so sánh nông nghiệp Đàng Ngoài và Đàng Trong, cần chú ý điều kiện đất đai, chiến tranh và quá trình khai hoang.'
      },
      {
        heading: 'Thương mại và sự phát triển của đô thị, cảng thị',
        body: 'Hoạt động trao đổi trong nước và với bên ngoài phát triển ở một số khu vực. Các đô thị và thương cảng như Thăng Long – Kẻ Chợ, Phố Hiến, Hội An trở thành đầu mối buôn bán, nơi gặp gỡ của thương nhân trong nước và nước ngoài. Hàng thủ công, nông sản và sản vật địa phương được trao đổi qua đường bộ và đường biển. Mức độ phát triển không giống nhau ở mọi nơi; chiến tranh và chính sách của chính quyền có thể thúc đẩy hoặc hạn chế hoạt động thương mại.',
        keyPoints: ['Thăng Long – Kẻ Chợ, Phố Hiến và Hội An là những trung tâm giao thương tiêu biểu trong giai đoạn.'],
        example: 'Đọc bản đồ các đô thị, cảng thị giúp xác định vai trò của vị trí địa lí đối với hoạt động buôn bán.'
      },
      {
        heading: 'Đời sống văn hóa, tín ngưỡng và tôn giáo',
        body: 'Đời sống văn hóa tiếp tục phong phú với sự tồn tại và giao thoa của nhiều tín ngưỡng, phong tục và tôn giáo. Nho giáo vẫn giữ vai trò quan trọng trong bộ máy nhà nước và giáo dục ở nhiều nơi; Phật giáo, Đạo giáo cùng tín ngưỡng dân gian tiếp tục hiện diện trong đời sống cộng đồng. Từ thế kỉ XVI, Thiên Chúa giáo được truyền vào một số khu vực, tạo thêm những biến đổi trong đời sống tôn giáo. Văn học, nghệ thuật dân gian và các sinh hoạt cộng đồng phản ánh đời sống đa dạng của cư dân. Cần nhìn nhận sự giao lưu văn hóa trong bối cảnh lịch sử, tránh đánh đồng niềm tin và thực hành của các cộng đồng.',
        keyPoints: ['Đời sống văn hóa, tín ngưỡng và tôn giáo đa dạng; nhiều yếu tố cùng tồn tại và giao lưu.'],
        example: 'Khi tìm hiểu một di tích hoặc lễ hội, cần xem xét nguồn gốc, cộng đồng thực hành và bối cảnh hình thành.'
      }
    ],
    questions: [], status: 'draft',
  },

  {
    id: 'g8-history-10', grade: 8, strand: 'history',
    title: 'Sự hình thành chủ nghĩa đế quốc ở các nước Âu - Mỹ (cuối thế kỉ XIX - đầu thế kỉ XX)',
    summary: 'Tìm hiểu những biến đổi của chủ nghĩa tư bản trong giai đoạn cuối thế kỉ XIX – đầu thế kỉ XX, sự hình thành các tổ chức độc quyền, quá trình mở rộng thuộc địa và những mâu thuẫn quốc tế ngày càng gay gắt.',
    learningObjectives: [
      'Nêu được một số đặc điểm kinh tế của các nước tư bản Âu – Mỹ cuối thế kỉ XIX – đầu thế kỉ XX.',
      'Giải thích được sự hình thành tổ chức độc quyền và xu hướng mở rộng thuộc địa.',
      'Nhận biết được những mâu thuẫn và hệ quả của quá trình cạnh tranh đế quốc.'
    ],
    sections: [
      {
        heading: 'Chuyển biến kinh tế và sự hình thành tổ chức độc quyền',
        body: 'Cuối thế kỉ XIX – đầu thế kỉ XX, những thành tựu của cách mạng công nghiệp lần thứ hai thúc đẩy sản xuất công nghiệp phát triển mạnh ở nhiều nước Âu – Mỹ. Quy mô nhà máy và lượng vốn đầu tư tăng, nhiều doanh nghiệp liên kết hoặc thôn tính đối thủ, hình thành các tổ chức độc quyền trong một số ngành. Ngân hàng và công nghiệp ngày càng gắn bó, vốn tài chính có vai trò lớn trong nền kinh tế. Quá trình tập trung sản xuất và tư bản diễn ra không giống nhau ở mọi quốc gia, tùy theo thời điểm và điều kiện phát triển.',
        keyPoints: ['Tập trung sản xuất, tư bản và sự gắn kết giữa ngân hàng với công nghiệp là những đặc điểm nổi bật.'],
        example: 'Khi phân tích tổ chức độc quyền, cần chú ý quy mô vốn, mức độ tập trung doanh nghiệp và khả năng chi phối thị trường.'
      },
      {
        heading: 'Mở rộng thuộc địa và cạnh tranh giữa các đế quốc',
        body: 'Nhu cầu về nguyên liệu, thị trường, nơi đầu tư và vị trí chiến lược thúc đẩy các nước tư bản lớn mở rộng ảnh hưởng ra bên ngoài. Nhiều khu vực ở châu Á, châu Phi và các nơi khác bị xâm chiếm hoặc đặt dưới ách thống trị thuộc địa. Các cường quốc cạnh tranh để phân chia lãnh thổ và phạm vi ảnh hưởng; những nước công nghiệp phát triển muộn tìm cách thay đổi tương quan thuộc địa đã được thiết lập trước đó. Quá trình này gắn với chiến tranh xâm lược, áp bức và khai thác thuộc địa, gây hậu quả nặng nề cho cư dân bản địa.',
        keyPoints: ['Cạnh tranh thuộc địa gắn với nhu cầu nguyên liệu, thị trường, đầu tư và lợi ích chiến lược.'],
        example: 'Đọc bản đồ thuộc địa theo thời gian giúp nhận biết sự thay đổi phạm vi kiểm soát và cạnh tranh giữa các cường quốc.'
      },
      {
        heading: 'Mâu thuẫn quốc tế và hệ quả lịch sử',
        body: 'Sự phát triển không đồng đều giữa các nước tư bản cùng với việc phân chia thuộc địa không cân xứng làm gia tăng mâu thuẫn giữa các cường quốc. Bên cạnh cạnh tranh kinh tế, các nước tăng cường quân bị và hình thành những liên minh đối lập. Chủ nghĩa đế quốc góp phần làm sâu sắc thêm xung đột quốc tế, trở thành một trong những bối cảnh dẫn tới Chiến tranh thế giới thứ nhất năm 1914. Khi học nội dung này, cần phân biệt nguyên nhân lâu dài, các mâu thuẫn và sự kiện trực tiếp dẫn tới chiến tranh.',
        keyPoints: ['Cạnh tranh giữa các đế quốc và mâu thuẫn về thuộc địa làm tình hình quốc tế thêm căng thẳng.'],
        example: 'Sơ đồ nguyên nhân giúp phân biệt cạnh tranh kinh tế, tranh chấp thuộc địa, chạy đua vũ trang và sự kiện trực tiếp.'
      }
    ],
    questions: [], status: 'draft',
  },

  {
    id: 'g8-history-11', grade: 8, strand: 'history',
    title: 'Phong trào công nhân từ cuối thế kỉ XVIII đến đầu thế kỉ XX và sự ra đời của chủ nghĩa xã hội khoa học',
    summary: 'Tìm hiểu sự hình thành giai cấp công nhân, các hình thức đấu tranh của phong trào công nhân trong thế kỉ XIX và sự ra đời của chủ nghĩa xã hội khoa học gắn với C. Mác và Ph. Ăng-ghen.',
    learningObjectives: [
      'Giải thích được bối cảnh hình thành giai cấp công nhân và phong trào công nhân.',
      'Nêu được một số hình thức, phong trào và tổ chức tiêu biểu của công nhân thế kỉ XIX.',
      'Trình bày được hoàn cảnh ra đời và ý nghĩa cơ bản của chủ nghĩa xã hội khoa học.'
    ],
    sections: [
      {
        heading: 'Sự hình thành giai cấp công nhân và phong trào đấu tranh',
        body: 'Cách mạng công nghiệp làm xuất hiện và phát triển đội ngũ công nhân làm việc trong nhà máy, hầm mỏ và các cơ sở sản xuất. Trong giai đoạn đầu, người lao động thường phải làm việc nhiều giờ, tiền công thấp và điều kiện an toàn hạn chế. Để bảo vệ quyền lợi, công nhân đấu tranh dưới nhiều hình thức như đập phá máy móc trong một số phong trào ban đầu, đình công, mít tinh và thành lập tổ chức nghề nghiệp. Qua thực tiễn, phong trào dần chuyển từ những phản ứng tự phát sang đấu tranh có tổ chức và mục tiêu rõ hơn.',
        keyPoints: ['Giai cấp công nhân hình thành cùng công nghiệp hóa; phong trào phát triển từ đấu tranh tự phát đến có tổ chức.'],
        example: 'So sánh một cuộc phản kháng tự phát với một cuộc đình công có tổ chức để nhận ra sự thay đổi về mục tiêu và phương thức.'
      },
      {
        heading: 'Phong trào công nhân và sự phát triển của tổ chức quốc tế',
        body: 'Trong thế kỉ XIX, phong trào công nhân phát triển ở nhiều nước châu Âu và Bắc Mỹ, đòi cải thiện tiền lương, thời gian làm việc và quyền chính trị. Những phong trào như Hiến chương ở Anh thể hiện yêu cầu mở rộng quyền tham gia chính trị của người lao động. Năm 1864, Hội Liên hiệp Lao động quốc tế (Quốc tế thứ nhất) được thành lập, góp phần kết nối phong trào công nhân ở nhiều nước. Công xã Pa-ri năm 1871 trở thành một sự kiện quan trọng, cho thấy người lao động có thể tham gia tổ chức và quản lí chính quyền trong hoàn cảnh lịch sử đặc biệt.',
        keyPoints: ['Phong trào công nhân mở rộng về quy mô, mục tiêu và tổ chức; Quốc tế thứ nhất thành lập năm 1864.'],
        example: 'Dòng thời gian có thể giúp phân biệt phong trào Hiến chương, Quốc tế thứ nhất và Công xã Pa-ri.'
      },
      {
        heading: 'Sự ra đời của chủ nghĩa xã hội khoa học',
        body: 'Trước những biến đổi của xã hội công nghiệp và yêu cầu của phong trào công nhân, C. Mác và Ph. Ăng-ghen nghiên cứu các quan hệ kinh tế, xã hội và lịch sử. Năm 1848, hai ông công bố Tuyên ngôn của Đảng Cộng sản, trình bày những luận điểm cơ bản của chủ nghĩa xã hội khoa học và kêu gọi người lao động đoàn kết đấu tranh. Học thuyết này có ảnh hưởng lớn đến phong trào công nhân quốc tế và sự phát triển của tư tưởng chính trị hiện đại. Khi học cần đặt tác phẩm trong bối cảnh lịch sử thế kỉ XIX và phân biệt nội dung tư tưởng với các diễn biến chính trị về sau.',
        keyPoints: ['C. Mác và Ph. Ăng-ghen là những người đặt nền tảng cho chủ nghĩa xã hội khoa học; Tuyên ngôn công bố năm 1848.'],
        example: 'Khi phân tích một văn kiện lịch sử, cần xác định tác giả, thời điểm, bối cảnh và thông điệp chính.'
      }
    ],
    questions: [], status: 'draft',
  },

  {
    id: 'g8-history-12', grade: 8, strand: 'history',
    title: 'Chiến tranh thế giới thứ nhất (1914 - 1918) và Cách mạng tháng Mười Nga năm 1917',
    summary: 'Tìm hiểu nguyên nhân, diễn biến và hậu quả của Chiến tranh thế giới thứ nhất; nhận biết bối cảnh, diễn biến chính và ý nghĩa của Cách mạng tháng Mười Nga năm 1917.',
    learningObjectives: [
      'Nêu được nguyên nhân sâu xa và sự kiện mở đầu Chiến tranh thế giới thứ nhất.',
      'Trình bày được một số nét chính về diễn biến và hậu quả của chiến tranh.',
      'Nêu được bối cảnh, diễn biến chính và ý nghĩa của Cách mạng tháng Mười Nga năm 1917.'
    ],
    sections: [
      {
        heading: 'Nguyên nhân và diễn biến Chiến tranh thế giới thứ nhất',
        body: 'Cuối thế kỉ XIX – đầu thế kỉ XX, mâu thuẫn giữa các cường quốc về thị trường, thuộc địa và phạm vi ảnh hưởng ngày càng gay gắt. Các nước hình thành những khối liên minh quân sự và chạy đua vũ trang. Ngày 28/7/1914, Áo – Hung tuyên chiến với Xéc-bi, chiến tranh bùng nổ và nhanh chóng lan rộng thành cuộc chiến giữa nhiều cường quốc. Chiến sự diễn ra trên nhiều mặt trận; năm 1917, Mỹ tham chiến, trong khi nước Nga trải qua biến động cách mạng. Ngày 11/11/1918, Đức kí đình chiến, chiến tranh kết thúc.',
        keyPoints: ['Chiến tranh bùng nổ năm 1914 từ mâu thuẫn giữa các cường quốc; kết thúc năm 1918.'],
        example: 'Khi lập dòng thời gian, phân biệt nguyên nhân lâu dài, sự kiện bùng nổ năm 1914 và mốc đình chiến năm 1918.'
      },
      {
        heading: 'Hậu quả của chiến tranh',
        body: 'Chiến tranh thế giới thứ nhất gây tổn thất rất lớn về người, của và cơ sở vật chất, làm nhiều khu vực bị tàn phá và đời sống dân cư đảo lộn. Bản đồ chính trị thế giới thay đổi; một số đế quốc và chế độ quân chủ sụp đổ, các tranh chấp và bất ổn tiếp tục tồn tại sau chiến tranh. Hòa ước và trật tự quốc tế sau chiến tranh không giải quyết triệt để các mâu thuẫn, tạo ra những vấn đề mới trong quan hệ giữa các nước. Khi đánh giá hậu quả, cần xem xét cả tổn thất nhân đạo, kinh tế và biến động chính trị.',
        keyPoints: ['Chiến tranh để lại hậu quả nặng nề về nhân mạng, kinh tế và trật tự chính trị quốc tế.'],
        example: 'Có thể phân loại hậu quả theo ba nhóm: con người, kinh tế – xã hội và chính trị – lãnh thổ.'
      },
      {
        heading: 'Cách mạng tháng Mười Nga năm 1917',
        body: 'Nước Nga tham gia chiến tranh trong khi tồn tại nhiều mâu thuẫn về ruộng đất, lao động và quyền lực chính trị. Cách mạng tháng Hai năm 1917 làm chế độ quân chủ Nga sụp đổ, nhưng Chính phủ lâm thời tiếp tục tham chiến và chưa giải quyết những yêu cầu cấp thiết của quần chúng. Tháng Mười năm 1917, lực lượng Bolshevik dưới sự lãnh đạo của V. I. Lê-nin tổ chức khởi nghĩa ở Petrograd, giành chính quyền. Cách mạng mở ra nhà nước Xô viết và có ảnh hưởng sâu rộng đến lịch sử thế giới thế kỉ XX. Cần phân biệt Cách mạng tháng Hai và Cách mạng tháng Mười theo thời điểm, lực lượng và kết quả.',
        keyPoints: ['Cách mạng tháng Mười năm 1917 do Bolshevik lãnh đạo, giành chính quyền và mở ra nhà nước Xô viết.'],
        example: 'So sánh tháng Hai và tháng Mười năm 1917 theo bối cảnh, lực lượng lãnh đạo và kết quả để tránh nhầm lẫn.'
      }
    ],
    questions: [], status: 'draft',
  },

  {
    id: 'g8-history-13', grade: 8, strand: 'history',
    title: 'Sự phát triển của khoa học, kĩ thuật, văn học, nghệ thuật trong các thế kỉ XVIII - XIX',
    summary: 'Khái quát những thành tựu tiêu biểu của khoa học tự nhiên, kĩ thuật, văn học và nghệ thuật trong các thế kỉ XVIII–XIX; nhận biết tác động của tri thức và sáng tạo đối với sản xuất, đời sống và tư tưởng xã hội.',
    learningObjectives: [
      'Nêu được một số thành tựu tiêu biểu của khoa học và kĩ thuật trong các thế kỉ XVIII–XIX.',
      'Nhận biết được một số xu hướng, tác giả và tác phẩm văn học, nghệ thuật tiêu biểu.',
      'Giải thích được tác động của thành tựu khoa học, kĩ thuật và văn hóa đối với xã hội.'
    ],
    sections: [
      {
        heading: 'Thành tựu khoa học tự nhiên',
        body: 'Trong các thế kỉ XVIII–XIX, khoa học tự nhiên phát triển mạnh với những bước tiến trong vật lí, hóa học, sinh học và các lĩnh vực nghiên cứu khác. Các nhà khoa học xây dựng phương pháp quan sát, thí nghiệm và khái quát lí thuyết ngày càng chặt chẽ. Những thành tựu này giúp con người hiểu sâu hơn về tự nhiên, tạo cơ sở cho nhiều ứng dụng kĩ thuật và y học. Khi học về một phát minh hay học thuyết, cần xác định lĩnh vực, đóng góp và bối cảnh xuất hiện thay vì chỉ học thuộc tên nhà khoa học.',
        keyPoints: ['Khoa học tự nhiên phát triển cả về phương pháp nghiên cứu và tri thức, góp phần tạo nền tảng cho ứng dụng thực tiễn.'],
        example: 'Có thể phân loại thành tựu theo vật lí, hóa học, sinh học rồi liên hệ với những thay đổi trong sản xuất và đời sống.'
      },
      {
        heading: 'Tiến bộ kĩ thuật và ứng dụng',
        body: 'Những cải tiến về máy móc, luyện kim, năng lượng và giao thông đã thúc đẩy sản xuất công nghiệp và kết nối các vùng. Đầu máy xe lửa, tàu thủy chạy bằng hơi nước, các phương tiện liên lạc và thiết bị sản xuất mới làm thay đổi tốc độ vận chuyển, trao đổi thông tin và tổ chức lao động. Tiến bộ kĩ thuật không chỉ tạo ra tiện ích mà còn làm biến đổi nghề nghiệp, đô thị và môi trường. Cần phân biệt phát minh khoa học với ứng dụng kĩ thuật, bởi một ứng dụng thường dựa trên nhiều kết quả nghiên cứu và cải tiến nối tiếp nhau.',
        keyPoints: ['Kĩ thuật cơ khí, giao thông và liên lạc phát triển, tác động sâu rộng đến sản xuất và đời sống.'],
        example: 'So sánh việc vận chuyển bằng sức kéo với đường sắt hơi nước giúp nhận ra thay đổi về tốc độ và quy mô.'
      },
      {
        heading: 'Văn học, nghệ thuật và đời sống tư tưởng',
        body: 'Văn học và nghệ thuật thế kỉ XVIII–XIX phản ánh những biến đổi của xã hội, các cuộc cách mạng, công nghiệp hóa và đời sống con người. Nhiều trào lưu và phong cách phát triển, trong đó có chủ nghĩa cổ điển, lãng mạn và hiện thực ở những bối cảnh khác nhau. Hội họa, âm nhạc, kiến trúc và văn chương vừa kế thừa truyền thống vừa tìm cách thể hiện những vấn đề mới của thời đại. Tác phẩm nghệ thuật có thể giúp người học nhận biết tâm tư, khát vọng và mâu thuẫn xã hội, nhưng cần đặt tác phẩm trong hoàn cảnh sáng tác cụ thể.',
        keyPoints: ['Văn học và nghệ thuật phản ánh xã hội, con người và những tư tưởng mới của thời đại.'],
        example: 'Khi phân tích một tác phẩm, hãy liên hệ đề tài, nhân vật, phong cách và bối cảnh lịch sử thay vì tách rời tác phẩm khỏi thời đại.'
      }
    ],
    questions: [], status: 'draft',
  },

  {
    id: 'g8-history-14', grade: 8, strand: 'history',
    title: 'Trung Quốc và Nhật Bản từ nửa sau thế kỉ XIX đến đầu thế kỉ XX',
    summary: 'Tìm hiểu tình hình Trung Quốc trước sức ép xâm lược của phương Tây và những cải cách ở Nhật Bản từ Minh Trị; so sánh con đường biến đổi của hai quốc gia châu Á cuối thế kỉ XIX – đầu thế kỉ XX.',
    learningObjectives: [
      'Nêu được những nét chính về tình hình Trung Quốc trước sự xâm nhập của các nước đế quốc.',
      'Trình bày được một số phong trào đấu tranh và biến động chính trị ở Trung Quốc.',
      'Giải thích được nội dung, kết quả và tác động của cuộc Duy tân Minh Trị ở Nhật Bản.'
    ],
    sections: [
      {
        heading: 'Trung Quốc trước sức ép của các nước đế quốc',
        body: 'Từ giữa thế kỉ XIX, Trung Quốc phải đối mặt với sự xâm nhập ngày càng sâu của các nước phương Tây và Nhật Bản. Các cuộc chiến tranh thuốc phiện cùng những hiệp ước bất bình đẳng làm suy giảm chủ quyền và mở rộng đặc quyền của nước ngoài. Triều đình nhà Thanh suy yếu, xã hội xuất hiện nhiều mâu thuẫn và phong trào phản kháng. Cuối thế kỉ XIX, các nước đế quốc gia tăng tranh giành phạm vi ảnh hưởng ở Trung Quốc, khiến nguy cơ mất quyền tự chủ càng lớn.',
        keyPoints: ['Chiến tranh xâm lược và các hiệp ước bất bình đẳng làm Trung Quốc suy giảm chủ quyền.'],
        example: 'Khi đọc một hiệp ước bất bình đẳng, cần xác định quyền lợi nước ngoài được hưởng và quyền tự chủ Trung Quốc bị hạn chế.'
      },
      {
        heading: 'Phong trào đấu tranh và cách mạng ở Trung Quốc',
        body: 'Trước khủng hoảng trong nước và sức ép bên ngoài, nhiều phong trào đấu tranh nổ ra. Phong trào Thái Bình Thiên Quốc giữa thế kỉ XIX và phong trào Nghĩa Hòa Đoàn cuối thế kỉ XIX phản ánh sự phản kháng của các tầng lớp xã hội, dù đều bị đàn áp. Một số sĩ phu và nhà cải cách đề xướng cải cách để canh tân đất nước, nhưng phong trào Duy tân Mậu Tuất năm 1898 thất bại. Cách mạng Tân Hợi năm 1911 lật đổ triều Thanh, chấm dứt chế độ quân chủ tồn tại lâu đời và dẫn tới sự thành lập Trung Hoa Dân quốc năm 1912.',
        keyPoints: ['Cách mạng Tân Hợi năm 1911 lật đổ triều Thanh và chấm dứt chế độ quân chủ ở Trung Quốc.'],
        example: 'Phân biệt phong trào khởi nghĩa, vận động cải cách và cách mạng bằng mục tiêu, lực lượng và kết quả.'
      },
      {
        heading: 'Nhật Bản và cuộc Duy tân Minh Trị',
        body: 'Giữa thế kỉ XIX, Nhật Bản đứng trước sức ép mở cửa từ các nước phương Tây. Năm 1868, cuộc Duy tân Minh Trị bắt đầu, tiến hành cải cách trên nhiều lĩnh vực: chính trị, kinh tế, quân sự, giáo dục và xã hội. Nhà nước tập trung quyền lực, thúc đẩy công nghiệp hóa, xây dựng quân đội và mở rộng giáo dục theo mô hình mới. Những cải cách giúp Nhật Bản phát triển thành một nước tư bản công nghiệp và tăng cường vị thế quốc tế, nhưng đồng thời quốc gia này cũng chuyển sang con đường bành trướng, gây chiến tranh với các nước láng giềng. So sánh Trung Quốc và Nhật Bản cần chú ý sự khác biệt về cải cách, tổ chức nhà nước và kết quả.',
        keyPoints: ['Duy tân Minh Trị bắt đầu năm 1868, thúc đẩy hiện đại hóa Nhật Bản và làm thay đổi vị thế quốc gia.'],
        example: 'Lập bảng so sánh Trung Quốc và Nhật Bản theo bối cảnh, biện pháp cải cách, kết quả và hệ quả khu vực.'
      }
    ],
    questions: [], status: 'draft',
  },

  {
    id: 'g8-history-15', grade: 8, strand: 'history',
    title: 'Ấn Độ và Đông Nam Á từ nửa sau thế kỉ XIX đến đầu thế kỉ XX',
    summary: 'Tìm hiểu quá trình thực dân hóa ở Ấn Độ và các nước Đông Nam Á, những chính sách cai trị thuộc địa và sự phát triển của phong trào đấu tranh giành độc lập cuối thế kỉ XIX – đầu thế kỉ XX.',
    learningObjectives: [
      'Nêu được một số nét chính về quá trình Anh thống trị Ấn Độ và chính sách cai trị thuộc địa.',
      'Nhận biết được tình hình thuộc địa ở một số quốc gia Đông Nam Á và trường hợp Xiêm duy trì độc lập tương đối.',
      'Trình bày được một số phong trào đấu tranh chống thực dân tiêu biểu trong khu vực.'
    ],
    sections: [
      {
        heading: 'Ấn Độ dưới ách thống trị của thực dân Anh',
        body: 'Trong thế kỉ XIX, Anh từng bước mở rộng quyền kiểm soát ở Ấn Độ, sử dụng bộ máy cai trị và quân đội để duy trì sự thống trị. Chính sách khai thác kinh tế, thuế khóa và việc làm suy yếu một số ngành sản xuất truyền thống gây nhiều khó khăn cho cư dân. Cuộc khởi nghĩa của binh lính Xi-pay năm 1857 là một phong trào phản kháng lớn, dù cuối cùng bị đàn áp. Năm 1885, Đảng Quốc đại Ấn Độ ra đời, đánh dấu bước phát triển mới của phong trào chính trị đòi quyền lợi và cải cách.',
        keyPoints: ['Anh thống trị Ấn Độ; khởi nghĩa Xi-pay năm 1857 và sự ra đời Đảng Quốc đại năm 1885 là các mốc tiêu biểu.'],
        example: 'Khi tìm hiểu chính sách thuộc địa, cần xem xét tác động đến thuế, sản xuất, quyền chính trị và đời sống xã hội.'
      },
      {
        heading: 'Đông Nam Á trở thành thuộc địa của các đế quốc',
        body: 'Từ nửa sau thế kỉ XIX, phần lớn các quốc gia Đông Nam Á lần lượt bị các nước phương Tây xâm chiếm hoặc đặt dưới quyền kiểm soát thuộc địa. Anh mở rộng thống trị ở Miến Điện và bán đảo Mã Lai; Pháp thiết lập ách cai trị ở Việt Nam, Lào và Cam-pu-chia; Hà Lan củng cố quyền kiểm soát ở Indonesia; Tây Ban Nha rồi Mỹ kiểm soát Philippines trong những giai đoạn khác nhau. Chính sách cai trị và khai thác thuộc địa làm biến đổi kinh tế, xã hội, đồng thời gây ra nhiều phong trào phản kháng.',
        keyPoints: ['Các đế quốc châu Âu và Mỹ kiểm soát những vùng khác nhau ở Đông Nam Á; không phải mọi nước đều bị cai trị bởi cùng một đế quốc.'],
        example: 'Lập bản đồ theo từng nước giúp phân biệt quốc gia nào chịu sự thống trị của Anh, Pháp, Hà Lan, Tây Ban Nha hoặc Mỹ.'
      },
      {
        heading: 'Phong trào đấu tranh và trường hợp Xiêm',
        body: 'Nhân dân Ấn Độ và Đông Nam Á tiến hành nhiều hình thức đấu tranh, từ khởi nghĩa vũ trang đến vận động cải cách và thành lập tổ chức chính trị. Các phong trào có thành phần, mục tiêu và kết quả khác nhau, nhưng đều phản ánh nguyện vọng chống áp bức và bảo vệ quyền tự chủ. Xiêm (Thái Lan ngày nay) là trường hợp đặc biệt: nhờ cải cách của các vua Rama IV và Rama V, cùng hoạt động ngoại giao và vị trí giữa vùng ảnh hưởng Anh – Pháp, Xiêm duy trì được nền độc lập về hình thức, dù phải nhượng bộ một số quyền lợi và lãnh thổ. Cần tránh hiểu rằng Xiêm hoàn toàn không chịu sức ép từ các nước đế quốc.',
        keyPoints: ['Xiêm duy trì độc lập tương đối nhờ cải cách và ngoại giao, nhưng vẫn chịu sức ép và phải nhượng bộ.'],
        example: 'So sánh Xiêm với các nước thuộc địa theo mức độ kiểm soát, cải cách trong nước và hoạt động ngoại giao.'
      }
    ],
    questions: [], status: 'draft',
  },

  {
    id: 'g8-history-16', grade: 8, strand: 'history',
    title: 'Việt Nam dưới triều Nguyễn (nửa đầu thế kỉ XIX)',
    summary: 'Tìm hiểu quá trình thành lập và củng cố nhà Nguyễn, tổ chức bộ máy nhà nước, tình hình kinh tế – xã hội, văn hóa và chính sách đối ngoại của Việt Nam trong nửa đầu thế kỉ XIX.',
    learningObjectives: [
      'Nêu được sự thành lập nhà Nguyễn và một số cải cách hành chính tiêu biểu.',
      'Trình bày được những nét chính về kinh tế, xã hội và văn hóa dưới triều Nguyễn.',
      'Nhận xét được một số hạn chế trong chính sách đối nội và đối ngoại của triều Nguyễn.'
    ],
    sections: [
      {
        heading: 'Thành lập triều Nguyễn và tổ chức nhà nước',
        body: 'Năm 1802, Nguyễn Ánh lên ngôi hoàng đế, lập triều Nguyễn, đóng đô ở Phú Xuân (Huế). Các vua đầu triều từng bước củng cố chính quyền trung ương và tổ chức bộ máy quản lí trên cả nước. Dưới thời Minh Mạng, cải cách hành chính được tiến hành, chia cả nước thành các tỉnh và tăng cường sự quản lí thống nhất từ trung ương. Nhà nước ban hành luật pháp, xây dựng quân đội và hệ thống quan lại, nhưng quyền lực tập trung cao và cơ chế quản lí còn nhiều hạn chế.',
        keyPoints: ['Nhà Nguyễn thành lập năm 1802; cải cách thời Minh Mạng góp phần củng cố bộ máy hành chính.'],
        example: 'Đối chiếu bản đồ hành chính trước và sau cải cách Minh Mạng để thấy sự thay đổi trong tổ chức lãnh thổ.'
      },
      {
        heading: 'Kinh tế, xã hội và văn hóa',
        body: 'Nông nghiệp vẫn là ngành kinh tế chủ yếu; nhà nước quan tâm khai hoang, đào kênh, đắp đê và sửa chữa thủy lợi ở một số nơi. Thủ công nghiệp nhà nước và dân gian tiếp tục phát triển, trong khi thương mại chịu ảnh hưởng của chính sách quản lí và quan hệ đối ngoại. Xã hội có sự phân hóa, đời sống nông dân ở nhiều nơi khó khăn do thuế khóa, lao dịch, thiên tai và mất mùa. Văn hóa có những thành tựu về kiến trúc, điêu khắc, văn học và sử học; quần thể di tích cố đô Huế là dấu ấn tiêu biểu của thời Nguyễn.',
        keyPoints: ['Kinh tế nông nghiệp giữ vai trò chủ đạo; văn hóa và kiến trúc có nhiều thành tựu, song xã hội còn nhiều khó khăn.'],
        example: 'Khi đánh giá một triều đại, cần xem xét đồng thời hoạt động nhà nước, sản xuất, đời sống cư dân và thành tựu văn hóa.'
      },
      {
        heading: 'Chính sách đối ngoại và những hạn chế',
        body: 'Triều Nguyễn duy trì quan hệ với các nước láng giềng và các thế lực bên ngoài, nhưng chính sách đối ngoại có xu hướng thận trọng, hạn chế giao thương và tiếp xúc với phương Tây ở nhiều thời điểm. Một số chính sách đối với tôn giáo và hoạt động truyền giáo gây căng thẳng trong quan hệ với các nước phương Tây. Trong nước, các cuộc nổi dậy của nông dân và những nhóm xã hội khác phản ánh mâu thuẫn và khó khăn của bộ máy cai trị. Khi nhận xét về triều Nguyễn nửa đầu thế kỉ XIX, cần phân biệt thành tựu xây dựng nhà nước, văn hóa với những hạn chế khiến đất nước gặp khó khăn trước biến động quốc tế.',
        keyPoints: ['Triều Nguyễn củng cố nhà nước nhưng có những hạn chế trong chính sách đối nội, đối ngoại và khả năng thích ứng.'],
        example: 'Lập bảng hai cột thành tựu – hạn chế giúp đưa ra nhận xét cân bằng, có dẫn chứng.'
      }
    ],
    questions: [], status: 'draft',
  },

  {
    id: 'g8-history-17', grade: 8, strand: 'history',
    title: 'Cuộc kháng chiến chống thực dân Pháp xâm lược từ năm 1858 đến năm 1884',
    summary: 'Tìm hiểu quá trình thực dân Pháp nổ súng xâm lược Việt Nam, các cuộc kháng chiến tiêu biểu của nhân dân và triều đình, cùng những hiệp ước từng bước làm mất chủ quyền đất nước từ năm 1858 đến năm 1884.',
    learningObjectives: [
      'Nêu được các mốc chính trong quá trình Pháp xâm lược Việt Nam từ năm 1858 đến năm 1884.',
      'Trình bày được một số cuộc kháng chiến tiêu biểu ở Đà Nẵng, Nam Kì và Bắc Kì.',
      'Phân tích được tác động của các hiệp ước năm 1862, 1874, 1883 và 1884 đối với chủ quyền Việt Nam.'
    ],
    sections: [
      {
        heading: 'Pháp mở đầu cuộc xâm lược và kháng chiến ở Đà Nẵng',
        body: 'Ngày 1/9/1858, liên quân Pháp – Tây Ban Nha nổ súng tấn công Đà Nẵng, mở đầu cuộc xâm lược Việt Nam. Quân dân dưới sự chỉ huy của Nguyễn Tri Phương xây dựng phòng tuyến, thực hiện cách đánh phù hợp và làm thất bại ý đồ đánh nhanh chiếm nhanh của đối phương. Sau khi không đạt mục tiêu ở Đà Nẵng, quân Pháp chuyển hướng tấn công Gia Định năm 1859. Cuộc kháng chiến cho thấy tinh thần chống xâm lược của nhân dân, đồng thời bộc lộ hạn chế trong đường lối và khả năng tổ chức kháng chiến của triều đình.',
        keyPoints: ['Ngày 1/9/1858, Pháp – Tây Ban Nha tấn công Đà Nẵng; kháng chiến làm thất bại ý đồ đánh nhanh của Pháp.'],
        example: 'Dùng bản đồ xác định Đà Nẵng và Gia Định để theo dõi hướng tiến công của quân Pháp.'
      },
      {
        heading: 'Kháng chiến ở Nam Kì và Bắc Kì',
        body: 'Sau khi chiếm được một số vị trí ở Nam Kì, Pháp buộc triều đình kí Hiệp ước Nhâm Tuất năm 1862, nhượng ba tỉnh miền Đông Nam Kì và một số quyền lợi khác. Nhân dân tiếp tục kháng chiến với nhiều thủ lĩnh như Trương Định, Nguyễn Trung Trực và các nghĩa quân địa phương. Năm 1867, Pháp chiếm ba tỉnh miền Tây Nam Kì. Ở Bắc Kì, các cuộc tiến công của Pháp năm 1873 và 1882 vấp phải sự chống trả của quân dân, gắn với những nhân vật như Nguyễn Tri Phương và Hoàng Diệu. Phong trào kháng chiến diễn ra ở nhiều nơi, có hình thức và lực lượng đa dạng.',
        keyPoints: ['Nhân dân Nam Kì tiếp tục kháng chiến sau năm 1862; Pháp chiếm ba tỉnh miền Tây năm 1867 và mở rộng đánh chiếm Bắc Kì.'],
        example: 'Lập bảng theo địa bàn, thủ lĩnh, thời gian và hình thức đấu tranh để so sánh các cuộc kháng chiến.'
      },
      {
        heading: 'Các hiệp ước và sự mất chủ quyền',
        body: 'Trước sức ép quân sự của Pháp, triều đình Nguyễn lần lượt kí các hiệp ước làm chủ quyền đất nước bị thu hẹp. Hiệp ước Giáp Tuất năm 1874 tiếp tục mở rộng quyền lợi của Pháp. Sau các cuộc tiến công của Pháp ở Bắc Kì và kinh thành Huế, triều đình kí Hiệp ước Hác-măng năm 1883 và Hiệp ước Pa-tơ-nốt năm 1884, chấp nhận sự bảo hộ của Pháp ở Trung Kì và Bắc Kì. Đến năm 1884, nền độc lập và chủ quyền quốc gia bị tổn hại nghiêm trọng. Cần phân biệt sự chống trả kiên cường của nhân dân với lựa chọn và trách nhiệm của triều đình trong từng thời điểm.',
        keyPoints: ['Các hiệp ước 1862, 1874, 1883 và 1884 từng bước làm suy giảm chủ quyền Việt Nam.'],
        example: 'So sánh nội dung các hiệp ước theo mốc thời gian để thấy phạm vi quyền kiểm soát của Pháp tăng lên.'
      }
    ],
    questions: [], status: 'draft',
  },

  {
    id: 'g8-history-18', grade: 8, strand: 'history',
    title: 'Phong trào kháng chiến chống Pháp trong những năm 1885 - 1896',
    summary: 'Tìm hiểu sự bùng nổ của phong trào Cần Vương, vai trò của vua Hàm Nghi và Tôn Thất Thuyết, các cuộc khởi nghĩa tiêu biểu và nguyên nhân thất bại của phong trào chống Pháp cuối thế kỉ XIX.',
    learningObjectives: [
      'Trình bày được bối cảnh ra đời và nội dung chính của phong trào Cần Vương.',
      'Nêu được các giai đoạn và một số cuộc khởi nghĩa tiêu biểu trong phong trào.',
      'Phân tích được nguyên nhân thất bại và ý nghĩa lịch sử của phong trào.'
    ],
    sections: [
      {
        heading: 'Sự bùng nổ phong trào Cần Vương',
        body: 'Sau khi triều đình kí các hiệp ước thừa nhận sự bảo hộ của Pháp, mâu thuẫn trong triều đình ngày càng gay gắt. Đêm 4 rạng sáng 5/7/1885, phe chủ chiến do Tôn Thất Thuyết đứng đầu tổ chức cuộc phản công quân Pháp tại kinh thành Huế nhưng thất bại. Tôn Thất Thuyết đưa vua Hàm Nghi ra căn cứ Tân Sở và nhân danh nhà vua ban Chiếu Cần Vương tháng 7/1885, kêu gọi văn thân, sĩ phu và nhân dân giúp vua cứu nước. Chiếu Cần Vương thúc đẩy phong trào chống Pháp lan rộng ở nhiều địa phương.',
        keyPoints: ['Chiếu Cần Vương năm 1885 kêu gọi giúp vua cứu nước và trở thành ngọn cờ tập hợp lực lượng chống Pháp.'],
        example: 'Dùng dòng thời gian phân biệt cuộc phản công ở Huế đầu tháng 7/1885 với thời điểm ban Chiếu Cần Vương.'
      },
      {
        heading: 'Các giai đoạn và cuộc khởi nghĩa tiêu biểu',
        body: 'Phong trào Cần Vương thường được chia thành hai giai đoạn: từ năm 1885 đến năm 1888, phong trào phát triển rộng với sự hưởng ứng của nhiều địa phương; từ năm 1888 đến năm 1896, các cuộc khởi nghĩa tiếp tục nhưng dần tập trung thành những trung tâm lớn. Một số cuộc khởi nghĩa tiêu biểu gồm Ba Đình ở Thanh Hóa, Bãi Sậy ở Hưng Yên và Hương Khê ở Hà Tĩnh – Nghệ An, do Phan Đình Phùng và Cao Thắng lãnh đạo. Khởi nghĩa Hương Khê kéo dài đến năm 1896, được xem là một trong những cuộc khởi nghĩa tiêu biểu và có tổ chức của phong trào.',
        keyPoints: ['Ba Đình, Bãi Sậy và Hương Khê là những cuộc khởi nghĩa tiêu biểu; Hương Khê kết thúc năm 1896.'],
        example: 'Lập bảng địa bàn – lãnh đạo – thời gian – đặc điểm để phân biệt các cuộc khởi nghĩa.'
      },
      {
        heading: 'Kết quả, nguyên nhân thất bại và ý nghĩa',
        body: 'Đến năm 1896, các trung tâm kháng chiến lớn lần lượt bị đàn áp, phong trào Cần Vương kết thúc. Nguyên nhân thất bại gồm tương quan lực lượng chênh lệch, vũ khí và phương thức tổ chức còn hạn chế, các cuộc khởi nghĩa hoạt động phân tán và chưa có sự phối hợp thống nhất trên phạm vi cả nước. Dù thất bại, phong trào thể hiện tinh thần yêu nước, ý chí chống xâm lược và vai trò của văn thân, sĩ phu cùng đông đảo nhân dân. Phong trào để lại kinh nghiệm và ảnh hưởng đối với các xu hướng cứu nước đầu thế kỉ XX.',
        keyPoints: ['Phong trào thất bại năm 1896 nhưng khẳng định tinh thần yêu nước và để lại ảnh hưởng cho các phong trào sau.'],
        example: 'Khi giải thích thất bại, cần kết hợp nguyên nhân khách quan và hạn chế trong tổ chức, phối hợp của phong trào.'
      }
    ],
    questions: [], status: 'draft',
  },

  {
    id: 'g8-history-19', grade: 8, strand: 'history',
    title: 'Phong trào yêu nước chống Pháp ở Việt Nam từ đầu thế kỉ XX đến năm 1917',
    summary: 'Tìm hiểu những xu hướng yêu nước mới đầu thế kỉ XX, hoạt động của Phan Bội Châu, Phan Châu Trinh, Đông Kinh Nghĩa Thục và sự kiện Nguyễn Tất Thành ra đi tìm đường cứu nước năm 1911.',
    learningObjectives: [
      'Nêu được bối cảnh xuất hiện những xu hướng yêu nước mới đầu thế kỉ XX.',
      'Phân biệt được khuynh hướng bạo động và cải cách qua hoạt động của các nhà yêu nước tiêu biểu.',
      'Trình bày được ý nghĩa của sự kiện Nguyễn Tất Thành ra đi tìm đường cứu nước năm 1911.'
    ],
    sections: [
      {
        heading: 'Xu hướng bạo động và phong trào Đông Du',
        body: 'Đầu thế kỉ XX, sau khi các phong trào Cần Vương và khởi nghĩa Yên Thế gặp nhiều khó khăn, một bộ phận sĩ phu Việt Nam tìm kiếm con đường cứu nước mới. Phan Bội Châu chủ trương dựa vào sự giúp đỡ từ bên ngoài và sử dụng bạo động để giành độc lập. Năm 1904, ông cùng các đồng chí thành lập Duy Tân hội; phong trào Đông Du được tổ chức từ năm 1905, đưa thanh niên sang Nhật Bản học tập. Khi Nhật Bản thỏa hiệp với Pháp, phong trào bị giải tán năm 1909. Dù không đạt mục tiêu, phong trào góp phần khơi dậy tinh thần yêu nước và mở rộng giao lưu với bên ngoài.',
        keyPoints: ['Phan Bội Châu gắn với Duy Tân hội và phong trào Đông Du; Đông Du bị giải tán năm 1909.'],
        example: 'Dùng bảng mốc thời gian để phân biệt việc thành lập Duy Tân hội năm 1904 và hoạt động Đông Du từ năm 1905.'
      },
      {
        heading: 'Xu hướng cải cách và các phong trào xã hội',
        body: 'Phan Châu Trinh chủ trương cải cách xã hội, nâng cao dân trí, chấn hưng kinh tế và cải thiện đời sống, không đặt trọng tâm vào bạo động vũ trang. Những tư tưởng canh tân có ảnh hưởng đến phong trào Duy Tân ở Trung Kì và sự ra đời của Đông Kinh Nghĩa Thục tại Hà Nội năm 1907. Năm 1908, phong trào chống thuế bùng nổ ở Trung Kì, phản ánh sự bất bình trước sưu thuế và chính sách cai trị của thực dân. Các phong trào có phương thức khác nhau nhưng cùng thể hiện khát vọng đổi mới đất nước và giành quyền sống, quyền tự chủ.',
        keyPoints: ['Phan Châu Trinh gắn với xu hướng cải cách; Đông Kinh Nghĩa Thục thành lập năm 1907; phong trào chống thuế Trung Kì diễn ra năm 1908.'],
        example: 'So sánh Phan Bội Châu và Phan Châu Trinh theo mục tiêu, phương pháp và hoạt động tiêu biểu.'
      },
      {
        heading: 'Nguyễn Tất Thành ra đi tìm đường cứu nước',
        body: 'Trong bối cảnh các phong trào yêu nước đầu thế kỉ XX chưa tìm được con đường thành công, Nguyễn Tất Thành sớm suy nghĩ về con đường giải phóng dân tộc. Ngày 5/6/1911, tại Bến Nhà Rồng, Người rời Việt Nam trên con tàu Amiral Latouche-Tréville, bắt đầu hành trình tìm hiểu các nước và con đường cứu nước. Sự kiện đánh dấu bước khởi đầu của quá trình khảo sát thực tiễn thế giới, tìm kiếm hướng đi mới cho cách mạng Việt Nam. Khi học cần phân biệt sự kiện ra đi năm 1911 với những bước phát triển tư tưởng và hoạt động chính trị diễn ra trong các năm tiếp theo.',
        keyPoints: ['Ngày 5/6/1911, Nguyễn Tất Thành ra đi tìm đường cứu nước từ Bến Nhà Rồng.'],
        example: 'Đặt sự kiện năm 1911 trong bối cảnh các xu hướng cứu nước trước đó để hiểu vì sao xuất hiện nhu cầu tìm con đường mới.'
      }
    ],
    questions: [], status: 'draft',
  },

  {
    id: 'g8-geography-01', grade: 8, strand: 'geography',
    title: 'Vị trí địa lí và phạm vi lãnh thổ Việt Nam',
    summary: 'Xác định vị trí của Việt Nam ở khu vực Đông Nam Á, mô tả phạm vi lãnh thổ gồm vùng đất, vùng biển và vùng trời; phân tích ý nghĩa của vị trí địa lí đối với tự nhiên, kinh tế và quốc phòng.',
    learningObjectives: [
      'Xác định được vị trí địa lí và giới hạn lãnh thổ Việt Nam trên bản đồ.',
      'Trình bày được các bộ phận của lãnh thổ quốc gia và đặc điểm tiếp giáp.',
      'Phân tích được ý nghĩa tự nhiên, kinh tế và chiến lược của vị trí địa lí.'
    ],
    sections: [
      {
        heading: 'Vị trí địa lí của Việt Nam',
        body: 'Việt Nam nằm ở rìa phía đông bán đảo Đông Dương, thuộc khu vực Đông Nam Á. Phần đất liền nằm trong khoảng từ khoảng 8°34′B đến 23°23′B và từ khoảng 102°09′Đ đến 109°28′Đ. Lãnh thổ kéo dài theo chiều bắc – nam, hẹp ngang ở nhiều nơi và tiếp giáp với Biển Đông. Vị trí này khiến thiên nhiên Việt Nam mang tính chất nhiệt đới gió mùa, đồng thời có sự phân hóa theo vĩ độ, độ cao và ảnh hưởng biển.',
        keyPoints: ['Việt Nam nằm ở phía đông bán đảo Đông Dương, thuộc Đông Nam Á và tiếp giáp Biển Đông.'],
        example: 'Dựa vào bản đồ, xác định Việt Nam so với bán đảo Đông Dương, Biển Đông và các quốc gia láng giềng.'
      },
      {
        heading: 'Phạm vi lãnh thổ và tiếp giáp',
        body: 'Lãnh thổ Việt Nam gồm vùng đất, vùng biển và vùng trời. Vùng đất bao gồm phần đất liền và các đảo, quần đảo; phía bắc giáp Trung Quốc, phía tây giáp Lào và Campuchia. Vùng biển Việt Nam thuộc Biển Đông, có nhiều đảo và quần đảo, trong đó có quần đảo Hoàng Sa và Trường Sa. Vùng trời là khoảng không gian bao trùm vùng đất và vùng biển thuộc chủ quyền, quyền chủ quyền và quyền tài phán của Việt Nam theo quy định của pháp luật và luật pháp quốc tế. Khi đọc bản đồ cần phân biệt đường biên giới trên đất liền, đường bờ biển và các vùng biển theo quy định.',
        keyPoints: ['Lãnh thổ gồm vùng đất, vùng biển và vùng trời; Việt Nam có biên giới đất liền với Trung Quốc, Lào và Campuchia.'],
        example: 'Dùng bản đồ hành chính và bản đồ biển để nhận diện các bộ phận lãnh thổ, không nhầm vùng biển với đường bờ biển.'
      },
      {
        heading: 'Ý nghĩa của vị trí địa lí',
        body: 'Vị trí nằm trong khu vực nhiệt đới gió mùa và giáp biển góp phần tạo nên nguồn tài nguyên thiên nhiên phong phú, thuận lợi cho phát triển nông nghiệp nhiệt đới, kinh tế biển và giao lưu hàng hải. Việt Nam nằm gần các tuyến giao thông quốc tế và có vị trí kết nối lục địa Đông Nam Á với Biển Đông. Tuy nhiên, vị trí và điều kiện tự nhiên cũng khiến nước ta thường chịu ảnh hưởng của bão, áp thấp nhiệt đới, mưa lớn và các rủi ro thiên tai. Vị trí địa lí còn có ý nghĩa quan trọng đối với bảo vệ chủ quyền, an ninh và hợp tác với các nước trong khu vực.',
        keyPoints: ['Vị trí địa lí tạo thuận lợi cho giao lưu và phát triển kinh tế biển, đồng thời đặt ra yêu cầu phòng chống thiên tai và bảo vệ chủ quyền.'],
        example: 'Khi đánh giá ý nghĩa vị trí địa lí, cần nêu cả thuận lợi phát triển kinh tế lẫn thách thức thiên tai và quốc phòng.'
      }
    ],
    questions: [], status: 'draft',
  },

  {
    id: 'g8-geography-02', grade: 8, strand: 'geography',
    title: 'Địa hình Việt Nam',
    summary: 'Nhận biết đặc điểm chung của địa hình Việt Nam, các khu vực địa hình chính, hướng địa hình và tác động của địa hình đến tự nhiên, dân cư và hoạt động kinh tế.',
    learningObjectives: [
      'Trình bày được các đặc điểm chung của địa hình Việt Nam.',
      'Phân biệt được các khu vực đồi núi, đồng bằng và địa hình bờ biển, thềm lục địa.',
      'Giải thích được ảnh hưởng của địa hình đến phân hóa tự nhiên và phát triển kinh tế.'
    ],
    sections: [
      {
        heading: 'Đặc điểm chung của địa hình',
        body: 'Địa hình Việt Nam đa dạng và phân bậc rõ rệt; đồi núi chiếm phần lớn diện tích, nhưng chủ yếu là đồi núi thấp. Địa hình có hai hướng chính là tây bắc – đông nam và hướng vòng cung ở vùng Đông Bắc. Địa hình chịu tác động mạnh của khí hậu nhiệt đới ẩm gió mùa và hoạt động của con người, vì vậy quá trình xâm thực ở miền núi và bồi tụ ở đồng bằng diễn ra phổ biến. Địa hình cũng có sự phân hóa theo độ cao và theo khu vực.',
        keyPoints: ['Đồi núi chiếm phần lớn diện tích, chủ yếu là đồi núi thấp; hai hướng chính là tây bắc – đông nam và vòng cung.'],
        example: 'Quan sát bản đồ địa hình để nhận biết dãy núi Hoàng Liên Sơn, vùng núi Đông Bắc và các đồng bằng lớn.'
      },
      {
        heading: 'Các khu vực địa hình chính',
        body: 'Địa hình đồi núi phân bố ở phía bắc, phía tây và một phần phía đông nam, gồm nhiều khu vực có độ cao và hướng núi khác nhau. Đồng bằng chiếm diện tích nhỏ hơn nhưng có vai trò quan trọng đối với cư trú và sản xuất; hai đồng bằng lớn là đồng bằng sông Hồng và đồng bằng sông Cửu Long, ngoài ra còn có các đồng bằng duyên hải miền Trung. Bờ biển có nhiều dạng địa hình như bãi bồi, cồn cát, đầm phá, vũng vịnh; thềm lục địa thay đổi về độ rộng theo từng vùng biển.',
        keyPoints: ['Các khu vực chính gồm đồi núi, đồng bằng, bờ biển và thềm lục địa; hai đồng bằng lớn nằm ở Bắc Bộ và Nam Bộ.'],
        example: 'So sánh đồng bằng sông Hồng, đồng bằng sông Cửu Long và đồng bằng duyên hải miền Trung theo nguồn gốc, hình dạng và đặc điểm.'
      },
      {
        heading: 'Ảnh hưởng của địa hình đến tự nhiên và kinh tế',
        body: 'Địa hình tác động đến khí hậu, sông ngòi, đất và sinh vật, góp phần tạo nên sự phân hóa tự nhiên giữa miền núi, trung du, đồng bằng và ven biển. Miền núi có thế mạnh về lâm nghiệp, thủy điện và một số cây công nghiệp, nhưng giao thông và sản xuất chịu trở ngại bởi độ dốc, sạt lở và chia cắt địa hình. Đồng bằng thuận lợi cho trồng lúa, tập trung dân cư và phát triển đô thị, song có thể chịu ngập lụt, xâm nhập mặn hoặc sụt lún. Khai thác địa hình cần gắn với bảo vệ đất, rừng và phòng chống thiên tai.',
        keyPoints: ['Địa hình tạo ra thế mạnh và hạn chế khác nhau giữa miền núi, đồng bằng và ven biển.'],
        example: 'Khi chọn vị trí xây dựng công trình, cần cân nhắc độ dốc, nguy cơ sạt lở, ngập lụt và tác động đến hệ sinh thái.'
      }
    ],
    questions: [], status: 'draft',
  },

  {
    id: 'g8-geography-03', grade: 8, strand: 'geography',
    title: 'Khoáng sản Việt Nam',
    summary: 'Tìm hiểu đặc điểm chung, sự phân bố và giá trị của tài nguyên khoáng sản Việt Nam; nhận biết yêu cầu khai thác hợp lí, tiết kiệm và bảo vệ môi trường.',
    learningObjectives: [
      'Nêu được đặc điểm chung và sự phân bố một số loại khoáng sản chính ở Việt Nam.',
      'Xác định được một số vùng, mỏ khoáng sản tiêu biểu trên bản đồ.',
      'Giải thích được sự cần thiết của khai thác hợp lí và sử dụng tiết kiệm tài nguyên khoáng sản.'
    ],
    sections: [
      {
        heading: 'Đặc điểm chung của tài nguyên khoáng sản',
        body: 'Việt Nam có tài nguyên khoáng sản khá phong phú và đa dạng về chủng loại, nhưng nhiều loại có trữ lượng vừa và nhỏ, phân bố không đều giữa các vùng. Khoáng sản hình thành qua những quá trình địa chất lâu dài, vì vậy là nguồn tài nguyên hữu hạn, không thể phục hồi trong thời gian ngắn. Một số nhóm khoáng sản quan trọng gồm năng lượng, kim loại và phi kim loại. Giá trị của khoáng sản phụ thuộc vào trữ lượng, chất lượng, điều kiện khai thác, công nghệ và nhu cầu sử dụng.',
        keyPoints: ['Khoáng sản đa dạng nhưng phân bố không đều và là tài nguyên hữu hạn.'],
        example: 'Phân loại than, dầu khí, bô-xít, sắt và a-pa-tít theo nhóm khoáng sản để thấy sự đa dạng tài nguyên.'
      },
      {
        heading: 'Sự phân bố một số khoáng sản tiêu biểu',
        body: 'Than đá tập trung nhiều ở Quảng Ninh; dầu mỏ và khí tự nhiên phân bố ở các bể trầm tích ngoài khơi, nhất là khu vực phía nam Biển Đông. Bô-xít có tiềm năng lớn ở Tây Nguyên; a-pa-tít tập trung ở Lào Cai; sắt có ở nhiều địa phương như Hà Tĩnh và Thái Nguyên; đá vôi phân bố rộng ở các vùng núi đá vôi. Sự phân bố gắn với lịch sử phát triển địa chất của từng khu vực. Bản đồ khoáng sản giúp xác định vị trí, nhưng không thay thế việc khảo sát trữ lượng và chất lượng tại mỏ.',
        keyPoints: ['Quảng Ninh nổi bật về than; Tây Nguyên có bô-xít; Lào Cai có a-pa-tít; dầu khí phân bố ở các bể trầm tích ngoài khơi.'],
        example: 'Đọc bản đồ khoáng sản theo kí hiệu và chú giải để xác định khu vực phân bố của từng loại.'
      },
      {
        heading: 'Khai thác và sử dụng khoáng sản bền vững',
        body: 'Khoáng sản cung cấp nguyên liệu và năng lượng cho công nghiệp, xây dựng và nhiều hoạt động kinh tế. Tuy nhiên, khai thác thiếu quy hoạch có thể làm suy thoái đất, ô nhiễm nước và không khí, phá vỡ cảnh quan và ảnh hưởng sinh kế cộng đồng. Cần điều tra, đánh giá trữ lượng trước khi khai thác; áp dụng công nghệ phù hợp, tiết kiệm nguyên liệu, tăng tái chế và phục hồi môi trường sau khai thác. Việc lựa chọn dự án cần cân nhắc hiệu quả kinh tế, an toàn, môi trường và lợi ích lâu dài của địa phương.',
        keyPoints: ['Khai thác khoáng sản cần gắn với tiết kiệm tài nguyên, công nghệ phù hợp và phục hồi môi trường.'],
        example: 'Đánh giá một dự án khai thác cần xem xét việc xử lí nước thải, hoàn thổ, phục hồi thảm thực vật và giám sát cộng đồng.'
      }
    ],
    questions: [], status: 'draft',
  },

  {
    id: 'g8-geography-04', grade: 8, strand: 'geography',
    title: 'Khí hậu Việt Nam',
    summary: 'Tìm hiểu đặc điểm khí hậu nhiệt đới ẩm gió mùa của Việt Nam, sự phân hóa khí hậu theo mùa, theo bắc – nam, theo độ cao và tác động đến sản xuất, đời sống.',
    learningObjectives: [
      'Trình bày được các đặc điểm cơ bản của khí hậu Việt Nam.',
      'Giải thích được nguyên nhân và biểu hiện của sự phân hóa khí hậu.',
      'Phân tích được ảnh hưởng của khí hậu đến sản xuất, sinh hoạt và phòng chống thiên tai.'
    ],
    sections: [
      {
        heading: 'Đặc điểm nhiệt đới ẩm gió mùa',
        body: 'Khí hậu Việt Nam mang tính chất nhiệt đới ẩm gió mùa do vị trí nằm trong vùng nội chí tuyến, tiếp giáp Biển Đông và chịu tác động của các hoàn lưu gió mùa. Nhiệt độ trung bình năm nhìn chung cao, lượng mưa lớn và độ ẩm không khí cao. Gió mùa hoạt động theo mùa, kết hợp với địa hình và ảnh hưởng biển tạo nên sự khác biệt về thời tiết giữa các vùng. Khí hậu có vai trò quan trọng đối với hệ sinh thái, nguồn nước và hoạt động sản xuất.',
        keyPoints: ['Khí hậu Việt Nam có tính chất nhiệt đới ẩm gió mùa: nhiệt độ cao, mưa nhiều và độ ẩm lớn.'],
        example: 'Khi đọc biểu đồ khí hậu, cần xem đồng thời nhiệt độ, lượng mưa và sự thay đổi theo tháng.'
      },
      {
        heading: 'Sự phân hóa khí hậu theo mùa và không gian',
        body: 'Khí hậu phân hóa theo mùa do hoạt động của gió mùa. Miền Bắc có mùa đông tương đối lạnh và mùa hạ nóng ẩm, mưa nhiều; miền Nam thể hiện rõ mùa mưa và mùa khô. Miền Trung chịu ảnh hưởng của địa hình Trường Sơn và gió mùa, có thời kì mưa lớn tập trung vào thu – đông ở nhiều nơi. Khí hậu còn phân hóa theo chiều bắc – nam, theo độ cao địa hình và theo hướng sườn núi. Vì vậy, không thể dùng đặc điểm khí hậu của một địa phương để khái quát cho toàn quốc.',
        keyPoints: ['Khí hậu khác nhau giữa miền Bắc, miền Nam, miền Trung và giữa các đai cao.'],
        example: 'So sánh biểu đồ khí hậu Hà Nội, Huế và Thành phố Hồ Chí Minh để nhận ra khác biệt về nhiệt độ và mùa mưa.'
      },
      {
        heading: 'Ảnh hưởng của khí hậu đến đời sống và sản xuất',
        body: 'Khí hậu nhiệt đới ẩm tạo điều kiện cho cây trồng phát triển, tăng vụ và đa dạng hóa sản phẩm nông nghiệp. Tuy nhiên, bão, mưa lớn, lũ lụt, hạn hán, rét đậm, nắng nóng và xâm nhập mặn có thể gây thiệt hại cho sản xuất và đời sống. Các ngành giao thông, du lịch, năng lượng và xây dựng cũng chịu tác động của thời tiết và khí hậu. Thích ứng cần dựa trên dự báo, mùa vụ phù hợp, công trình phòng chống thiên tai, tiết kiệm nước và bảo vệ hệ sinh thái.',
        keyPoints: ['Khí hậu vừa tạo thuận lợi cho sản xuất nhiệt đới vừa đặt ra rủi ro thiên tai và yêu cầu thích ứng.'],
        example: 'Lựa chọn lịch gieo trồng cần căn cứ mùa mưa, mùa khô và nguy cơ thiên tai của từng địa phương.'
      }
    ],
    questions: [], status: 'draft',
  },

  {
    id: 'g8-geography-05', grade: 8, strand: 'geography',
    title: 'Thực hành: Vẽ và phân tích biểu đồ khí hậu',
    summary: 'Rèn luyện kĩ năng đọc bảng số liệu khí hậu, lựa chọn dạng biểu đồ phù hợp, thể hiện nhiệt độ và lượng mưa theo tháng, sau đó nhận xét đặc điểm khí hậu của địa điểm.',
    learningObjectives: [
      'Đọc và xử lí được bảng số liệu nhiệt độ, lượng mưa trung bình tháng.',
      'Lựa chọn và vẽ được biểu đồ khí hậu kết hợp đường nhiệt độ và cột lượng mưa.',
      'Phân tích được diễn biến nhiệt độ, lượng mưa và rút ra nhận xét có căn cứ.'
    ],
    sections: [
      {
        heading: 'Đọc và chuẩn bị bảng số liệu',
        body: 'Trước khi vẽ biểu đồ khí hậu, cần xác định tên địa điểm, thời kì thống kê, đơn vị đo và đủ số liệu của 12 tháng. Nhiệt độ thường tính bằng độ C, lượng mưa tính bằng milimét. Kiểm tra số liệu thiếu, giá trị bất thường và thứ tự tháng; không tự ý thay đổi số liệu gốc. Cần xác định mục đích thể hiện để chọn biểu đồ phù hợp, thường dùng biểu đồ kết hợp cột lượng mưa và đường nhiệt độ cho số liệu khí hậu tháng.',
        keyPoints: ['Kiểm tra tên địa điểm, thời gian, đơn vị và đủ 12 tháng trước khi vẽ.'],
        example: 'Nếu bảng có nhiệt độ trung bình tháng và lượng mưa tháng, có thể dùng biểu đồ kết hợp để thể hiện hai đại lượng.'
      },
      {
        heading: 'Vẽ biểu đồ khí hậu',
        body: 'Trên trục ngang, ghi đủ 12 tháng theo thứ tự. Trục đứng thể hiện lượng mưa với đơn vị mm; nhiệt độ được thể hiện bằng đường biểu diễn theo thang đo phù hợp. Chọn khoảng chia đều, ghi rõ đơn vị, tên biểu đồ và chú giải. Cột lượng mưa cần có độ rộng và khoảng cách thống nhất; các điểm nhiệt độ được đặt đúng vị trí theo số liệu rồi nối theo thứ tự tháng. Khi dùng hai trục đứng, phải ghi rõ đại lượng tương ứng để người đọc không nhầm lẫn.',
        keyPoints: ['Biểu đồ cần đúng tỉ lệ, đủ tên, đơn vị, chú giải và thể hiện chính xác từng tháng.'],
        example: 'Sau khi vẽ, kiểm tra lại một vài tháng có số liệu cao nhất và thấp nhất để phát hiện sai lệch khi đặt điểm hoặc dựng cột.'
      },
      {
        heading: 'Phân tích và nhận xét biểu đồ',
        body: 'Khi phân tích, trước hết nhận xét nhiệt độ: tháng nóng nhất, tháng lạnh nhất, biên độ nhiệt năm và mức độ biến đổi theo mùa. Tiếp theo nhận xét lượng mưa: tổng lượng mưa năm nếu có thể tính, tháng mưa nhiều nhất, tháng ít mưa nhất và thời kì mưa tập trung. Cuối cùng kết hợp hai yếu tố để nhận xét mùa khí hậu và so sánh với đặc điểm vùng. Mọi kết luận cần dựa trên số liệu cụ thể, tránh suy đoán chỉ từ hình dạng biểu đồ.',
        keyPoints: ['Nhận xét cần nêu dẫn chứng tháng và trị số; kết hợp nhiệt độ với lượng mưa để xác định đặc điểm mùa.'],
        example: 'Có thể viết: nhiệt độ cao nhất vào tháng…, thấp nhất vào tháng…; mưa tập trung từ tháng… đến tháng… theo số liệu biểu đồ.'
      }
    ],
    questions: [], status: 'draft',
  },

  {
    id: 'g8-geography-06', grade: 8, strand: 'geography',
    title: 'Thủy văn Việt Nam',
    summary: 'Tìm hiểu đặc điểm mạng lưới sông ngòi, chế độ nước theo mùa, một số hệ thống sông lớn và vai trò của hồ, nước ngầm; nhận biết yêu cầu sử dụng, bảo vệ tài nguyên nước.',
    learningObjectives: [
      'Trình bày được những đặc điểm chung của sông ngòi Việt Nam.',
      'Mô tả được chế độ nước theo mùa và đặc điểm của một số hệ thống sông lớn.',
      'Giải thích được vai trò của tài nguyên nước và yêu cầu bảo vệ nguồn nước.'
    ],
    sections: [
      {
        heading: 'Đặc điểm chung của sông ngòi Việt Nam',
        body: 'Việt Nam có mạng lưới sông ngòi khá dày đặc, phân bố rộng khắp, nhiều sông ngắn và dốc, hướng chảy chủ yếu theo địa hình. Sông ngòi có lượng nước lớn và giàu phù sa ở nhiều hệ thống, nhưng phân bố theo không gian và thời gian không đều. Chế độ mưa nhiệt đới gió mùa, địa hình và cấu trúc địa chất là những nhân tố quan trọng chi phối mạng lưới, dòng chảy và lượng phù sa. Nhiều sông bắt nguồn từ ngoài lãnh thổ nên việc quản lí nguồn nước cần có hợp tác giữa các quốc gia trong lưu vực.',
        keyPoints: ['Sông ngòi dày đặc, nhiều sông ngắn dốc; dòng chảy và lượng nước thay đổi theo mùa.'],
        example: 'Quan sát bản đồ sông ngòi để nhận biết hướng chảy, nơi bắt nguồn và cửa sông của các hệ thống lớn.'
      },
      {
        heading: 'Chế độ nước và các hệ thống sông lớn',
        body: 'Chế độ nước sông thường có mùa lũ và mùa cạn, thời gian xuất hiện khác nhau giữa các vùng do sự phân bố mưa theo mùa. Ở Bắc Bộ, hệ thống sông Hồng – Thái Bình có mùa lũ chủ yếu vào mùa hạ; ở Nam Bộ, hệ thống sông Cửu Long chịu ảnh hưởng của lượng mưa lưu vực và chế độ nước từ thượng nguồn. Miền Trung có nhiều sông ngắn, dốc, lũ thường lên nhanh khi mưa lớn, nhất là vào thu – đông ở nhiều nơi. Ngoài sông, hồ tự nhiên, hồ chứa và nước ngầm có vai trò quan trọng trong cấp nước, điều tiết dòng chảy và phát triển kinh tế.',
        keyPoints: ['Mùa lũ, mùa cạn và thời gian lũ khác nhau theo vùng; sông miền Trung thường ngắn, dốc và lũ lên nhanh.'],
        example: 'So sánh thời gian mùa lũ của sông Hồng, sông Cửu Long và các sông miền Trung dựa trên biểu đồ hoặc số liệu.'
      },
      {
        heading: 'Vai trò và bảo vệ tài nguyên nước',
        body: 'Nguồn nước phục vụ sinh hoạt, tưới tiêu, công nghiệp, giao thông, thủy điện và duy trì hệ sinh thái. Tuy nhiên, ô nhiễm nước, khai thác nước ngầm quá mức, suy giảm rừng đầu nguồn, hạn hán và xâm nhập mặn đang gây sức ép lên tài nguyên nước. Cần sử dụng nước tiết kiệm, xử lí nước thải, bảo vệ lưu vực và hành lang sông, phục hồi rừng đầu nguồn và phối hợp quản lí nguồn nước liên tỉnh, xuyên biên giới. Công trình hồ chứa và đê điều cần được vận hành an toàn, tính đến nhu cầu hạ du và hệ sinh thái.',
        keyPoints: ['Bảo vệ tài nguyên nước cần kết hợp tiết kiệm, xử lí ô nhiễm, bảo vệ lưu vực và quản lí tổng hợp.'],
        example: 'Một trường học có thể tiết kiệm nước bằng cách kiểm tra rò rỉ, thu gom nước mưa phù hợp và không xả chất thải xuống cống, kênh.'
      }
    ],
    questions: [], status: 'draft',
  },

  {
    id: 'g8-geography-07', grade: 8, strand: 'geography',
    title: 'Vai trò của tài nguyên khí hậu và tài nguyên nước đối với sự phát triển kinh tế - xã hội của nước ta',
    summary: 'Phân tích vai trò của khí hậu và nguồn nước đối với nông nghiệp, công nghiệp, dịch vụ, đời sống dân cư; nhận biết sự khác biệt giữa các vùng và yêu cầu sử dụng bền vững.',
    learningObjectives: [
      'Nêu được vai trò của tài nguyên khí hậu và tài nguyên nước đối với các ngành kinh tế.',
      'Liên hệ được đặc điểm khí hậu, nguồn nước với hoạt động sản xuất ở một số vùng.',
      'Đề xuất được biện pháp sử dụng tiết kiệm, hiệu quả và bảo vệ tài nguyên khí hậu, nước.'
    ],
    sections: [
      {
        heading: 'Vai trò của tài nguyên khí hậu',
        body: 'Khí hậu nhiệt đới ẩm gió mùa tạo điều kiện phát triển nền nông nghiệp đa dạng, có thể bố trí nhiều mùa vụ và nhiều loại cây trồng, vật nuôi phù hợp với từng vùng. Nhiệt độ, lượng mưa, số giờ nắng và chế độ gió còn ảnh hưởng đến du lịch, giao thông, năng lượng và hoạt động công nghiệp. Các vùng có khí hậu khác nhau có thể phát triển sản phẩm đặc trưng như cây công nghiệp ở cao nguyên, cây ăn quả ở vùng nhiệt đới và du lịch nghỉ dưỡng ở nơi có điều kiện khí hậu phù hợp. Tuy nhiên, thời tiết cực đoan có thể làm gián đoạn sản xuất và gây thiệt hại.',
        keyPoints: ['Khí hậu là nguồn lực cho nông nghiệp, du lịch, năng lượng và nhiều hoạt động kinh tế, nhưng cũng tạo ra rủi ro thiên tai.'],
        example: 'Cao nguyên có điều kiện phù hợp cho một số cây công nghiệp; vùng ven biển có thể phát triển du lịch nhưng cần tính đến bão.'
      },
      {
        heading: 'Vai trò của tài nguyên nước',
        body: 'Nước mặt và nước dưới đất có vai trò thiết yếu đối với sinh hoạt, tưới tiêu, chăn nuôi, nuôi trồng thủy sản, công nghiệp và dịch vụ. Sông ngòi và hồ chứa còn cung cấp tiềm năng thủy điện, hỗ trợ giao thông và điều tiết nước ở một số lưu vực. Đồng bằng có hệ thống kênh rạch phục vụ tưới tiêu và vận tải; miền núi có tiềm năng thủy điện nhưng cần đánh giá tác động đến dòng chảy, rừng và cộng đồng hạ du. Nguồn nước phân bố không đều theo mùa và theo vùng nên cần quy hoạch sử dụng phù hợp.',
        keyPoints: ['Nước là đầu vào quan trọng của sản xuất và đời sống; khả năng khai thác phụ thuộc vị trí, mùa và điều kiện lưu vực.'],
        example: 'Một vùng trồng lúa cần hệ thống thủy lợi, còn vùng có sông dốc có thể có tiềm năng thủy điện nếu bảo đảm yêu cầu môi trường.'
      },
      {
        heading: 'Khai thác hợp lí và thích ứng',
        body: 'Sử dụng tài nguyên khí hậu và nước hiệu quả cần dựa trên quy hoạch theo vùng, dự báo thời tiết – thủy văn và nhu cầu thực tế. Nông nghiệp có thể điều chỉnh mùa vụ, chọn giống thích ứng và áp dụng tưới tiết kiệm; đô thị và nhà máy cần giảm thất thoát, xử lí nước thải và tăng tái sử dụng nước. Bảo vệ rừng đầu nguồn, hành lang sông, hồ và vùng đất ngập nước góp phần duy trì nguồn nước. Các quyết định phát triển phải cân bằng lợi ích kinh tế với an toàn dân cư, đa dạng sinh học và khả năng chống chịu trước biến đổi khí hậu.',
        keyPoints: ['Quản lí bền vững cần tiết kiệm, tái sử dụng, bảo vệ lưu vực và thích ứng với biến động khí hậu.'],
        example: 'Một địa phương thiếu nước mùa khô có thể kết hợp trữ nước, tưới nhỏ giọt, chuyển đổi cây trồng và kiểm soát khai thác nước ngầm.'
      }
    ],
    questions: [], status: 'draft',
  },

  {
    id: 'g8-geography-08', grade: 8, strand: 'geography',
    title: 'Tác động của biến đổi khí hậu đối với khí hậu và thủy văn Việt Nam',
    summary: 'Nhận biết biểu hiện của biến đổi khí hậu ở Việt Nam, phân tích tác động đến nhiệt độ, mưa, dòng chảy, lũ lụt, hạn hán và xâm nhập mặn; đề xuất biện pháp thích ứng phù hợp.',
    learningObjectives: [
      'Nêu được một số biểu hiện của biến đổi khí hậu ở Việt Nam.',
      'Phân tích được tác động đến khí hậu, nguồn nước và các vùng dễ bị tổn thương.',
      'Đề xuất được biện pháp thích ứng và giảm nhẹ biến đổi khí hậu ở địa phương.'
    ],
    sections: [
      {
        heading: 'Biểu hiện của biến đổi khí hậu',
        body: 'Biến đổi khí hậu thể hiện qua xu hướng tăng nhiệt độ trung bình, thay đổi chế độ mưa, gia tăng một số hiện tượng thời tiết cực đoan và mực nước biển dâng. Ở Việt Nam, biểu hiện cụ thể khác nhau giữa các vùng và từng năm; không phải mọi hiện tượng thời tiết riêng lẻ đều có thể quy trực tiếp cho biến đổi khí hậu. Cần sử dụng chuỗi số liệu dài hạn, nguồn quan trắc đáng tin cậy và so sánh theo thời gian để nhận diện xu thế. Các yếu tố khí hậu và thủy văn có mối liên hệ chặt chẽ nên thay đổi về mưa, nhiệt độ có thể tác động đến dòng chảy và nguồn nước.',
        keyPoints: ['Nhận diện biến đổi khí hậu cần dựa trên xu thế dài hạn, không chỉ một sự kiện thời tiết đơn lẻ.'],
        example: 'So sánh số liệu nhiệt độ trung bình nhiều thập kỉ giúp nhận biết xu hướng thay đổi rõ hơn so với quan sát một ngày nóng.'
      },
      {
        heading: 'Tác động đến khí hậu và thủy văn',
        body: 'Nhiệt độ tăng có thể làm tăng nhu cầu nước, bốc hơi và nguy cơ nắng nóng. Mưa thay đổi về cường độ và phân bố có thể làm tăng rủi ro mưa lớn, lũ quét, sạt lở ở một số khu vực, đồng thời kéo dài hạn hán ở nơi khác. Nước biển dâng kết hợp triều cường và suy giảm dòng chảy mùa khô làm gia tăng nguy cơ ngập và xâm nhập mặn ở vùng ven biển, đặc biệt tại đồng bằng sông Cửu Long và một số khu vực thấp trũng. Các tác động phụ thuộc điều kiện địa hình, sử dụng đất, công trình thủy lợi và cách quản lí lưu vực.',
        keyPoints: ['Biến đổi khí hậu có thể làm tăng rủi ro nắng nóng, mưa cực đoan, hạn hán, ngập và xâm nhập mặn.'],
        example: 'Ở vùng cửa sông, theo dõi độ mặn và dòng chảy mùa khô giúp chủ động điều chỉnh lịch lấy nước.'
      },
      {
        heading: 'Thích ứng và giảm nhẹ tác động',
        body: 'Thích ứng cần kết hợp quy hoạch không gian an toàn, hệ thống cảnh báo sớm, công trình phòng chống thiên tai và giải pháp dựa vào hệ sinh thái. Nông nghiệp có thể điều chỉnh mùa vụ, sử dụng giống chịu hạn hoặc chịu mặn, thay đổi cơ cấu cây trồng và áp dụng tưới tiết kiệm. Đô thị cần tăng khả năng thoát nước, bảo vệ không gian trữ nước và hạn chế xây dựng ở vùng có nguy cơ cao. Giảm nhẹ biến đổi khí hậu thông qua tiết kiệm năng lượng, sử dụng năng lượng sạch, bảo vệ rừng và giảm phát thải. Mỗi địa phương cần lựa chọn giải pháp dựa trên dữ liệu và sự tham gia của cộng đồng.',
        keyPoints: ['Thích ứng giảm thiệt hại; giảm nhẹ góp phần hạn chế nguyên nhân gây biến đổi khí hậu.'],
        example: 'Một vùng ven biển có thể kết hợp phục hồi rừng ngập mặn, cảnh báo mặn, trữ nước ngọt và điều chỉnh mùa vụ.'
      }
    ],
    questions: [], status: 'draft',
  },
];
