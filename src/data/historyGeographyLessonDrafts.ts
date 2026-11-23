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
  {"id":"g6-history-17","grade":6,"strand":"history","title":"Cuộc đấu tranh bảo tồn và phát triển văn hóa dân tộc của người Việt","summary":"Trong thời Bắc thuộc, cộng đồng người Việt duy trì tiếng nói, phong tục, tín ngưỡng và nhiều tập quán bản địa. Cùng với việc bảo tồn nền tảng văn hóa riêng, người Việt tiếp thu có chọn lọc một số yếu tố từ bên ngoài, biến đổi chúng cho phù hợp với đời sống địa phương. Bài học nhấn mạnh sức sống của văn hóa cộng đồng và khả năng tiếp biến văn hóa.","learningObjectives":["Nêu được một số biểu hiện bảo tồn tiếng nói, phong tục và tín ngưỡng của người Việt trong thời Bắc thuộc.","Nhận biết được việc tiếp thu có chọn lọc một số yếu tố văn hóa và kĩ thuật từ bên ngoài.","Giải thích được vai trò của cộng đồng trong việc duy trì và phát triển bản sắc văn hóa."],"questions":[],"status":"draft"},
  {"id":"g6-history-18","grade":6,"strand":"history","title":"Bước ngoặt lịch sử đầu thế kỉ X","summary":"Đầu thế kỉ X, họ Khúc xây dựng chính quyền tự chủ; Khúc Hạo tiếp tục củng cố nền tự chủ bằng những cải cách về quản lí. Năm 931, Dương Đình Nghệ đánh đuổi quân Nam Hán và khôi phục quyền tự chủ. Năm 938, Ngô Quyền chỉ huy chiến thắng Bạch Đằng, tạo bước ngoặt quan trọng trong tiến trình giành độc lập của người Việt.","learningObjectives":["Trình bày được những nét chính về việc xây dựng và củng cố chính quyền tự chủ của họ Khúc.","Nêu được vai trò của Dương Đình Nghệ trong việc chống quân Nam Hán năm 931.","Mô tả được kế hoạch, diễn biến khái quát và ý nghĩa của chiến thắng Bạch Đằng năm 938."],"questions":[],"status":"draft"},
  {"id":"g6-history-19","grade":6,"strand":"history","title":"Vương quốc Chăm-pa từ thế kỉ II đến thế kỉ X","summary":"Vương quốc Chăm-pa hình thành từ trung tâm Lâm Ấp ở khu vực Tượng Lâm vào cuối thế kỉ II, rồi phát triển qua nhiều giai đoạn ở miền Trung Việt Nam. Cư dân Chăm-pa kết hợp trồng lúa, thủ công nghiệp, khai thác sản vật và thương mại đường biển. Chữ viết, tín ngưỡng, tôn giáo, kiến trúc và điêu khắc phản ánh quá trình giao lưu, sáng tạo văn hóa của cư dân Chăm.","learningObjectives":["Nêu được sự hình thành và một số chặng phát triển của Vương quốc Chăm-pa từ thế kỉ II đến thế kỉ X.","Trình bày được nét chính về hoạt động kinh tế và tổ chức xã hội của cư dân Chăm-pa.","Nhận biết được một số thành tựu văn hóa tiêu biểu như chữ viết, tín ngưỡng, tôn giáo và kiến trúc."],"questions":[],"status":"draft"},
  {"id":"g6-history-20","grade":6,"strand":"history","title":"Vương quốc Phù Nam","summary":"Vương quốc Phù Nam hình thành khoảng thế kỉ I ở khu vực hạ lưu sông Mê Công, gắn với không gian văn hóa Óc Eo ở Nam Bộ. Nhờ nông nghiệp, thủ công nghiệp, hệ thống giao thông đường thủy và thương mại, Phù Nam từng phát triển thành một trung tâm có quan hệ rộng trong khu vực. Vương quốc suy yếu từ đầu thế kỉ VI và đến đầu thế kỉ VII bị Chân Lạp thôn tính.","learningObjectives":["Mô tả được địa bàn hình thành, quá trình phát triển và suy yếu của Vương quốc Phù Nam.","Trình bày được nét chính về kinh tế, tổ chức xã hội và hoạt động giao thương của cư dân Phù Nam.","Nhận biết được một số dấu tích khảo cổ và thành tựu văn hóa gắn với văn hóa Óc Eo."],"questions":[],"status":"draft"},
  {"id":"g6-geography-17","grade":6,"strand":"geography","title":"Thời tiết và khí hậu. Biến đổi khí hậu","summary":"Thời tiết là trạng thái khí quyển tại một nơi trong thời gian ngắn; khí hậu phản ánh quy luật thời tiết được xác lập qua thời gian dài. Bài học giúp nhận biết các đới khí hậu chính, biểu hiện của biến đổi khí hậu và những việc con người có thể làm để giảm phát thải, thích ứng và phòng tránh thiên tai.","learningObjectives":["Phân biệt được thời tiết và khí hậu qua thời gian, không gian và tính ổn định tương đối.","Trình bày được khái quát đặc điểm của một đới khí hậu và nêu một số biểu hiện của biến đổi khí hậu.","Đề xuất được hành động phù hợp để tiết kiệm năng lượng, bảo vệ môi trường và ứng phó thiên tai."],"questions":[],"status":"draft"},
  {"id":"g6-geography-18","grade":6,"strand":"geography","title":"Thực hành: Phân tích biểu đồ nhiệt độ, lượng mưa","summary":"Biểu đồ khí hậu thường kết hợp đường biểu diễn nhiệt độ và cột lượng mưa theo tháng. Khi phân tích, cần đọc đúng tên trạm, trục tháng, đơn vị của từng trục; xác định giá trị cao nhất, thấp nhất, biên độ nhiệt và sự phân bố mưa trong năm. Từ đó có thể mô tả đặc điểm nhiệt độ, lượng mưa và liên hệ với đới khí hậu.","learningObjectives":["Xác định được các thành phần, trục và đơn vị trên biểu đồ nhiệt độ, lượng mưa.","Đọc và so sánh được nhiệt độ, lượng mưa theo tháng; tính biên độ nhiệt từ số liệu.","Viết được nhận xét ngắn gọn về đặc điểm nhiệt độ và lượng mưa của một địa điểm."],"questions":[],"status":"draft"},
  {"id":"g6-geography-19","grade":6,"strand":"geography","title":"Thủy quyển và vòng tuần hoàn của nước","summary":"Thủy quyển gồm toàn bộ nước trên bề mặt, trong vỏ Trái Đất và trong khí quyển, như nước biển, sông hồ, nước ngầm, băng tuyết và hơi nước. Nước liên tục vận động giữa đại dương, lục địa và không khí qua bốc hơi, ngưng tụ, mưa, dòng chảy và thấm xuống đất. Nguồn nước ngọt có thể sử dụng trực tiếp chỉ chiếm phần nhỏ, vì vậy cần bảo vệ và sử dụng hợp lí.","learningObjectives":["Kể tên được các thành phần chủ yếu của thủy quyển và nhận biết sự phân bố nước mặn, nước ngọt.","Mô tả được các quá trình chính trong vòng tuần hoàn lớn của nước.","Giải thích được vì sao cần tiết kiệm, bảo vệ nguồn nước ngọt."],"questions":[],"status":"draft"},
  {"id":"g6-geography-20","grade":6,"strand":"geography","title":"Sông và hồ. Nước ngầm và băng hà","summary":"Sông là dòng nước chảy thường xuyên trên bề mặt lục địa, có thể nhận nước từ mưa, nước ngầm và băng tuyết tan; các phụ lưu cùng đổ vào sông chính trong một lưu vực. Hồ là vùng nước đọng tương đối rộng trong đất liền. Nước ngầm được tích trữ trong các khe nứt, lỗ rỗng của đất đá; băng hà là khối băng tồn tại lâu dài, có vai trò quan trọng trong dự trữ nước ngọt.","learningObjectives":["Trình bày được khái niệm sông, phụ lưu, chi lưu, lưu vực sông và hồ.","Nêu được nguồn hình thành, vai trò và yêu cầu bảo vệ nước ngầm.","Nhận biết được băng hà là nguồn dự trữ nước ngọt và có liên hệ với biến đổi khí hậu."],"questions":[],"status":"draft"},
];