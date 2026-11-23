/**
 * Học Siêu Vui — Lịch sử và Địa lí THCS (lớp 6–9)
 * Curriculum outline aligned to the Kết nối tri thức với cuộc sống textbook series baseline.
 * Original learning content will be authored (not copied from the textbook); verify facts and scope before publishing.
 * Framework: GDPT 2018, môn Lịch sử và Địa lí THCS; amendments per TT 17/2025.
 */
export type HistoryGeographyStrand = 'history' | 'geography';

export interface HGTopic {
  id: string;
  title: string;
  strand: HistoryGeographyStrand;
  /** Intended learning focus; content team should verify and write age-appropriate lessons. */
  focus: string;
}

export interface HGGradeCurriculum {
  grade: 6 | 7 | 8 | 9;
  textbookSeries: 'Kết nối tri thức với cuộc sống';
  history: HGTopic[];
  geography: HGTopic[];
  integratedTopics: HGTopic[];
}

export const historyGeographyCurriculum: HGGradeCurriculum[] = [
  {
    grade: 6,
    textbookSeries: 'Kết nối tri thức với cuộc sống',
    history: [
      { id: 'h6-01', title: 'Vì sao phải học lịch sử?', strand: 'history', focus: 'Lịch sử, tư liệu, cách tìm hiểu và phục dựng quá khứ; thời gian lịch sử.' },
      { id: 'h6-02', title: 'Xã hội nguyên thủy', strand: 'history', focus: 'Nguồn gốc loài người, đời sống và chuyển biến xã hội nguyên thủy.' },
      { id: 'h6-03', title: 'Các nền văn minh cổ đại phương Đông', strand: 'history', focus: 'Ai Cập, Lưỡng Hà, Ấn Độ và Trung Quốc cổ đại; thành tựu tiêu biểu.' },
      { id: 'h6-04', title: 'Hy Lạp và La Mã cổ đại', strand: 'history', focus: 'Tổ chức xã hội, văn hóa và di sản của thế giới cổ đại Địa Trung Hải.' },
      { id: 'h6-05', title: 'Đông Nam Á từ đầu Công nguyên đến thế kỉ X', strand: 'history', focus: 'Các quốc gia, giao lưu văn hóa và thương mại khu vực.' },
      { id: 'h6-06', title: 'Việt Nam thời Văn Lang – Âu Lạc', strand: 'history', focus: 'Nhà nước đầu tiên, đời sống cư dân, văn hóa và dấu tích khảo cổ.' },
      { id: 'h6-07', title: 'Việt Nam thời Bắc thuộc và đấu tranh giành độc lập', strand: 'history', focus: 'Các chính sách cai trị, chuyển biến xã hội và những cuộc đấu tranh tiêu biểu đến đầu thế kỉ X.' },
    ],
    geography: [
      { id: 'g6-01', title: 'Nhập môn địa lí và bản đồ', strand: 'geography', focus: 'Vai trò địa lí; phương hướng, tỉ lệ, kí hiệu và đọc bản đồ.' },
      { id: 'g6-02', title: 'Trái Đất trong hệ Mặt Trời', strand: 'geography', focus: 'Hình dạng, kích thước, chuyển động và hệ quả cơ bản.' },
      { id: 'g6-03', title: 'Cấu tạo Trái Đất và địa hình', strand: 'geography', focus: 'Các lớp cấu tạo, nội lực, ngoại lực và dạng địa hình.' },
      { id: 'g6-04', title: 'Khí quyển và thời tiết, khí hậu', strand: 'geography', focus: 'Nhiệt độ, khí áp, gió, mưa, thời tiết và khí hậu.' },
      { id: 'g6-05', title: 'Nước trên Trái Đất', strand: 'geography', focus: 'Thủy quyển, sông, hồ, biển, đại dương và vòng tuần hoàn nước.' },
      { id: 'g6-06', title: 'Đất và sinh vật', strand: 'geography', focus: 'Đất, các nhân tố hình thành đất, hệ sinh thái và đa dạng sinh học.' },
      { id: 'g6-07', title: 'Con người và thiên nhiên', strand: 'geography', focus: 'Tác động qua lại, tài nguyên, thiên tai và bảo vệ môi trường.' },
    ],
    integratedTopics: [],
  },
  {
    grade: 7,
    textbookSeries: 'Kết nối tri thức với cuộc sống',
    history: [
      { id: 'h7-01', title: 'Tây Âu từ thế kỉ V đến nửa đầu thế kỉ XVI', strand: 'history', focus: 'Xã hội phong kiến, thành thị, văn hóa và các chuyển biến cuối thời trung đại.' },
      { id: 'h7-02', title: 'Trung Quốc từ thế kỉ VII đến giữa thế kỉ XIX', strand: 'history', focus: 'Các triều đại, kinh tế, xã hội và thành tựu văn hóa.' },
      { id: 'h7-03', title: 'Ấn Độ từ thế kỉ IV đến giữa thế kỉ XIX', strand: 'history', focus: 'Các vương triều, tôn giáo, xã hội và văn hóa.' },
      { id: 'h7-04', title: 'Đông Nam Á từ nửa sau thế kỉ X đến nửa đầu thế kỉ XVI', strand: 'history', focus: 'Các quốc gia khu vực, thương mại, văn hóa và tôn giáo.' },
      { id: 'h7-05', title: 'Việt Nam từ đầu thế kỉ X đến đầu thế kỉ XVI', strand: 'history', focus: 'Các triều Ngô, Đinh, Tiền Lê, Lý, Trần, Hồ và phát triển đất nước.' },
      { id: 'h7-06', title: 'Việt Nam thời thuộc Minh và khởi nghĩa Lam Sơn', strand: 'history', focus: 'Bối cảnh, diễn biến chính, nhân vật và kết quả giành độc lập.' },
      { id: 'h7-07', title: 'Văn hóa, giáo dục và đời sống thời trung đại', strand: 'history', focus: 'Di sản, tổ chức xã hội, văn hóa và các thành tựu theo giai đoạn.' },
    ],
    geography: [
      { id: 'g7-01', title: 'Châu Âu', strand: 'geography', focus: 'Vị trí, tự nhiên, dân cư, xã hội và kinh tế.' },
      { id: 'g7-02', title: 'Châu Á', strand: 'geography', focus: 'Đặc điểm tự nhiên, dân cư, các khu vực và kinh tế.' },
      { id: 'g7-03', title: 'Châu Phi', strand: 'geography', focus: 'Tự nhiên, dân cư, đô thị hóa và các vấn đề phát triển.' },
      { id: 'g7-04', title: 'Châu Mỹ', strand: 'geography', focus: 'Bắc Mỹ, Trung và Nam Mỹ; tự nhiên, dân cư và kinh tế.' },
      { id: 'g7-05', title: 'Châu Đại Dương', strand: 'geography', focus: 'Australia, các đảo và đặc điểm khu vực.' },
      { id: 'g7-06', title: 'Châu Nam Cực', strand: 'geography', focus: 'Môi trường băng giá, nghiên cứu và vai trò toàn cầu.' },
      { id: 'g7-07', title: 'Bản đồ và kĩ năng địa lí khu vực', strand: 'geography', focus: 'Đọc bản đồ, biểu đồ, so sánh đặc điểm các châu lục.' },
    ],
    integratedTopics: [
      { id: 'i7-01', title: 'Các cuộc đại phát kiến địa lí', strand: 'history', focus: 'Nguyên nhân, tác động và liên hệ không gian địa lí.' },
      { id: 'i7-02', title: 'Văn minh các châu thổ', strand: 'geography', focus: 'Mối liên hệ giữa môi trường sông, cư trú, sản xuất và văn hóa.' },
    ],
  },
  {
    grade: 8,
    textbookSeries: 'Kết nối tri thức với cuộc sống',
    history: [
      { id: 'h8-01', title: 'Châu Âu và Bắc Mỹ từ thế kỉ XVI đến XVIII', strand: 'history', focus: 'Biến đổi kinh tế, xã hội, cách mạng và hình thành trật tự mới.' },
      { id: 'h8-02', title: 'Cách mạng công nghiệp và biến đổi xã hội', strand: 'history', focus: 'Phát minh, sản xuất, đô thị hóa và tác động xã hội.' },
      { id: 'h8-03', title: 'Đông Nam Á từ thế kỉ XVI đến XIX', strand: 'history', focus: 'Giao thương, xâm nhập và thống trị thuộc địa, phản kháng.' },
      { id: 'h8-04', title: 'Châu Âu và nước Mỹ cuối thế kỉ XVIII – đầu XX', strand: 'history', focus: 'Các cuộc cách mạng, thống nhất quốc gia và biến đổi chính trị.' },
      { id: 'h8-05', title: 'Châu Á từ nửa sau thế kỉ XIX đến đầu thế kỉ XX', strand: 'history', focus: 'Cải cách, xâm lược, phong trào đấu tranh và chuyển biến.' },
      { id: 'h8-06', title: 'Việt Nam từ thế kỉ XVI đến XVIII', strand: 'history', focus: 'Chính trị, kinh tế, xã hội, văn hóa và các cuộc xung đột lớn.' },
      { id: 'h8-07', title: 'Việt Nam thế kỉ XIX đến đầu thế kỉ XX', strand: 'history', focus: 'Nhà Nguyễn, xâm lược Pháp, phong trào chống xâm lược và chuyển biến xã hội.' },
    ],
    geography: [
      { id: 'g8-01', title: 'Vị trí địa lí và phạm vi lãnh thổ Việt Nam', strand: 'geography', focus: 'Vị trí, vùng biển, ý nghĩa tự nhiên và kinh tế.' },
      { id: 'g8-02', title: 'Địa hình và khoáng sản Việt Nam', strand: 'geography', focus: 'Đặc điểm địa hình, phân hóa và tài nguyên khoáng sản.' },
      { id: 'g8-03', title: 'Khí hậu và thủy văn Việt Nam', strand: 'geography', focus: 'Đặc điểm khí hậu, sông ngòi, hồ và tác động đến đời sống.' },
      { id: 'g8-04', title: 'Thổ nhưỡng và sinh vật Việt Nam', strand: 'geography', focus: 'Các nhóm đất, hệ sinh thái, đa dạng sinh học và bảo tồn.' },
      { id: 'g8-05', title: 'Biển và đảo Việt Nam', strand: 'geography', focus: 'Đặc điểm biển, tài nguyên, môi trường và chủ quyền theo kiến thức phù hợp lứa tuổi.' },
      { id: 'g8-06', title: 'Thiên tai và bảo vệ môi trường', strand: 'geography', focus: 'Rủi ro tự nhiên, ứng phó và phát triển bền vững.' },
    ],
    integratedTopics: [
      { id: 'i8-01', title: 'Đô thị – lịch sử và hiện tại', strand: 'history', focus: 'Quá trình hình thành đô thị và biến đổi không gian, đời sống.' },
      { id: 'i8-02', title: 'Văn minh châu thổ sông Hồng và sông Cửu Long', strand: 'geography', focus: 'Môi trường, lịch sử cư trú, sản xuất, văn hóa và thích ứng.' },
    ],
  },
  {
    grade: 9,
    textbookSeries: 'Kết nối tri thức với cuộc sống',
    history: [
      { id: 'h9-01', title: 'Thế giới từ năm 1918 đến năm 1945', strand: 'history', focus: 'Trật tự thế giới, khủng hoảng, chiến tranh và các chuyển biến.' },
      { id: 'h9-02', title: 'Việt Nam từ năm 1918 đến năm 1945', strand: 'history', focus: 'Xã hội, phong trào yêu nước, các tổ chức và sự kiện dẫn tới 1945.' },
      { id: 'h9-03', title: 'Thế giới từ năm 1945 đến năm 1991', strand: 'history', focus: 'Trật tự sau chiến tranh, Chiến tranh lạnh, giải phóng dân tộc và biến đổi.' },
      { id: 'h9-04', title: 'Việt Nam từ năm 1945 đến năm 1991', strand: 'history', focus: 'Xây dựng và bảo vệ đất nước, các giai đoạn kháng chiến, thống nhất và đổi mới bước đầu.' },
      { id: 'h9-05', title: 'Thế giới từ năm 1991 đến nay', strand: 'history', focus: 'Trật tự quốc tế, hợp tác, xung đột và xu hướng toàn cầu.' },
      { id: 'h9-06', title: 'Việt Nam từ năm 1991 đến nay', strand: 'history', focus: 'Đổi mới, hội nhập, thành tựu, thách thức và phát triển.' },
      { id: 'h9-07', title: 'Khoa học – kĩ thuật và toàn cầu hóa', strand: 'history', focus: 'Các làn sóng công nghệ, kết nối toàn cầu và tác động đời sống.' },
    ],
    geography: [
      { id: 'g9-01', title: 'Địa lí dân cư Việt Nam', strand: 'geography', focus: 'Dân số, phân bố, lao động, đô thị hóa và chất lượng dân cư.' },
      { id: 'g9-02', title: 'Các ngành kinh tế Việt Nam', strand: 'geography', focus: 'Nông nghiệp, công nghiệp, dịch vụ, cơ cấu và chuyển đổi.' },
      { id: 'g9-03', title: 'Các vùng kinh tế và sự phân hóa lãnh thổ', strand: 'geography', focus: 'Đặc điểm vùng, thế mạnh, liên kết, phân bố dân cư và kinh tế.' },
      { id: 'g9-04', title: 'Khai thác tổng hợp kinh tế biển', strand: 'geography', focus: 'Tài nguyên, ngành kinh tế biển, bảo vệ môi trường và phát triển bền vững.' },
      { id: 'g9-05', title: 'Thực hành bản đồ, biểu đồ và số liệu', strand: 'geography', focus: 'Đọc, phân tích và nhận xét dữ liệu địa lí theo yêu cầu chương trình.' },
      { id: 'g9-06', title: 'Phát triển bền vững và môi trường', strand: 'geography', focus: 'Các vấn đề môi trường, giải pháp và trách nhiệm cộng đồng.' },
    ],
    integratedTopics: [
      { id: 'i9-01', title: 'Bảo vệ chủ quyền, quyền và lợi ích hợp pháp của Việt Nam ở Biển Đông', strand: 'geography', focus: 'Kiến thức nền tảng, bản đồ và nhận thức phù hợp lứa tuổi, dựa trên nguồn chính thống.' },
      { id: 'i9-02', title: 'Đô thị, vùng và phát triển', strand: 'history', focus: 'Liên hệ lịch sử hình thành, không gian địa lí và phát triển hiện đại.' },
    ],
  },
];

export const historyGeographySubjectMeta = {
  id: 'history-geography',
  dbCode: 'lsdl',
  name: 'Lịch sử và Địa lí',
  grades: ['6', '7', '8', '9'] as const,
  status: 'content_draft' as const,
  note: 'Khung chủ đề tham khảo; cần đối chiếu SGK/địa phương trước khi xuất bản bài học và câu hỏi.',
};
