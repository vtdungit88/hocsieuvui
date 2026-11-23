/**
 * Authoritative syllabus manifest for Học Siêu Vui — Kết nối tri thức.
 * Stable lesson IDs are app-owned identifiers; textbook numbering is retained separately.
 * Titles and chapter groupings are transcribed/normalized from the listed public SGK/SGV tables of contents.
 * Draft-only: source verification does not imply lesson content or assessment is approved for publication.
 */
export type HGSyllabusStrand = 'history' | 'geography' | 'integrated';
export type HGSyllabusStatus = 'source_verified' | 'needs_secondary_review';

export interface HGSyllabusLesson {
  id: string;
  number: string;
  title: string;
  strand: HGSyllabusStrand;
  chapterId: string;
  chapterTitle: string;
  status: HGSyllabusStatus;
}
export interface HGSyllabusChapter {
  id: string;
  title: string;
  strand: HGSyllabusStrand;
  lessons: HGSyllabusLesson[];
}
export interface HGSyllabusGrade {
  grade: 6 | 7 | 8 | 9;
  textbook: 'Kết nối tri thức với cuộc sống';
  sources: string[];
  chapters: HGSyllabusChapter[];
  integrated: HGSyllabusLesson[];
}

const chapter = (grade: number, strand: 'history'|'geography', index: number, title: string, rows: [string,string][], status: HGSyllabusStatus = 'source_verified'): HGSyllabusChapter => {
  const chapterId = `g${grade}-${strand}-c${index}`;
  return { id: chapterId, title, strand, lessons: rows.map(([number,lessonTitle]) => ({
    id: `g${grade}-${strand}-${number.replace(/[^0-9]/g,'').padStart(2,'0')}`,
    number, title: lessonTitle, strand, chapterId, chapterTitle: title, status,
  })) };
};
const integrated = (grade: number, rows: [string,string][]): HGSyllabusLesson[] => rows.map(([number,title], i) => ({
  id: `g${grade}-integrated-${i+1}`, number, title, strand: 'integrated',
  chapterId: `g${grade}-integrated`, chapterTitle: 'Chủ đề chung', status: 'source_verified',
}));

export const historyGeographySyllabusManifest: HGSyllabusGrade[] = [
{
 grade:6, textbook:'Kết nối tri thức với cuộc sống',
 sources:['https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-lich-su-va-dia-li-6.4496193929'],
 chapters:[
 chapter(6,'history',1,'Vì sao phải học lịch sử?',[
 ['1','Lịch sử và cuộc sống'],['2','Dựa vào đâu để biết và phục dựng lại lịch sử?'],['3','Thời gian trong lịch sử']]),
 chapter(6,'history',2,'Xã hội nguyên thủy',[
 ['4','Nguồn gốc loài người'],['5','Xã hội nguyên thủy'],['6','Sự chuyển biến và phân hóa của xã hội nguyên thủy']]),
 chapter(6,'history',3,'Xã hội cổ đại',[
 ['7','Ai Cập và Lưỡng Hà cổ đại'],['8','Ấn Độ cổ đại'],['9','Trung Quốc từ thời cổ đại đến thế kỉ VII'],['10','Hy Lạp và La Mã cổ đại']]),
 chapter(6,'history',4,'Đông Nam Á từ những thế kỉ tiếp giáp đầu Công nguyên đến thế kỉ X',[
 ['11','Các quốc gia sơ kì ở Đông Nam Á'],['12','Sự hình thành và bước đầu phát triển của các vương quốc phong kiến ở Đông Nam Á (từ thế kỉ VII đến thế kỉ X)'],['13','Giao lưu văn hóa ở Đông Nam Á từ đầu Công nguyên đến thế kỉ X']]),
 chapter(6,'history',5,'Việt Nam từ khoảng thế kỉ VII trước Công nguyên đến đầu thế kỉ X',[
 ['14','Nhà nước Văn Lang - Âu Lạc'],['15','Chính sách cai trị của các triều đại phong kiến phương Bắc và sự chuyển biến của xã hội Âu Lạc'],['16','Các cuộc khởi nghĩa tiêu biểu giành độc lập trước thế kỉ X'],['17','Cuộc đấu tranh bảo tồn và phát triển văn hóa dân tộc của người Việt'],['18','Bước ngoặt lịch sử đầu thế kỉ X'],['19','Vương quốc Chăm-pa từ thế kỉ II đến thế kỉ X'],['20','Vương quốc Phù Nam']]),
 chapter(6,'geography',1,'Bản đồ - phương tiện thể hiện bề mặt Trái Đất',[
 ['1','Hệ thống kinh, vĩ tuyến. Tọa độ địa lí'],['2','Bản đồ. Một số lưới kinh vĩ tuyến. Phương hướng trên bản đồ'],['3','Tỉ lệ bản đồ. Tính khoảng cách thực tế dựa vào tỉ lệ bản đồ'],['4','Kí hiệu và bảng chú giải bản đồ. Tìm đường trên bản đồ'],['5','Lược đồ trí nhớ']]),
 chapter(6,'geography',2,'Trái Đất - hành tinh của hệ Mặt Trời',[
 ['6','Trái Đất trong hệ Mặt Trời'],['7','Chuyển động tự quay quanh trục của Trái Đất và hệ quả'],['8','Chuyển động của Trái Đất quanh Mặt Trời và các hệ quả'],['9','Xác định phương hướng ngoài thực tế']]),
 chapter(6,'geography',3,'Cấu tạo của Trái Đất. Vỏ Trái Đất',[
 ['10','Cấu tạo của Trái Đất. Các mảng kiến tạo'],['11','Quá trình nội sinh và quá trình ngoại sinh. Hiện tượng tạo núi'],['12','Núi lửa và động đất'],['13','Các dạng địa hình chính trên Trái Đất. Khoáng sản'],['14','Thực hành: Đọc lược đồ địa hình tỉ lệ lớn và lát cắt địa hình đơn giản']]),
 chapter(6,'geography',4,'Khí hậu và biến đổi khí hậu',[
 ['15','Lớp vỏ khí của Trái Đất. Khí áp và gió'],['16','Nhiệt độ không khí. Mây và mưa'],['17','Thời tiết và khí hậu. Biến đổi khí hậu'],['18','Thực hành: Phân tích biểu đồ nhiệt độ, lượng mưa']]),
 chapter(6,'geography',5,'Nước trên Trái Đất',[
 ['19','Thủy quyển và vòng tuần hoàn của nước'],['20','Sông và hồ. Nước ngầm và băng hà'],['21','Biển và đại dương']]),
 chapter(6,'geography',6,'Đất và sinh vật trên Trái Đất',[
 ['22','Lớp đất trên Trái Đất'],['23','Sự sống trên Trái Đất'],['24','Rừng nhiệt đới'],['25','Sự phân bố các đới thiên nhiên trên Trái Đất'],['26','Thực hành: Tìm hiểu môi trường tự nhiên địa phương']]),
 chapter(6,'geography',7,'Con người và thiên nhiên',[
 ['27','Dân số và sự phân bố dân cư trên thế giới'],['28','Mối quan hệ giữa con người và thiên nhiên'],['29','Bảo vệ tự nhiên và khai thác thông minh các tài nguyên thiên nhiên vì sự phát triển bền vững'],['30','Thực hành: Tìm hiểu mối quan hệ giữa con người và thiên nhiên địa phương']]),
 ], integrated:[]
},
{
 grade:7, textbook:'Kết nối tri thức với cuộc sống',
 sources:['https://medialib.qlgd.edu.vn/Uploads/THU_VIEN/shn/2/37/UserFiles/5.-Lich-su-va-dia-li-7-d9d65a75-ee7e-4333-ab5a-abcc7e4b7a7f.pdf','https://ihoc.vn/sgk/lop-7/lich-su-va-dia-li-lop-7/sach-giao-khoa-lich-su-va-dia-li-lop-7-ket-noi-tri-thuc-voi-cuoc-song.html'],
 chapters:[
 chapter(7,'history',1,'Tây Âu từ thế kỉ V đến nửa đầu thế kỉ XVI',[
 ['1','Quá trình hình thành và phát triển của chế độ phong kiến ở Tây Âu'],['2','Các cuộc phát kiến địa lí và sự hình thành quan hệ sản xuất tư bản chủ nghĩa ở Tây Âu'],['3','Phong trào Văn hóa Phục hưng và Cải cách tôn giáo']]),
 chapter(7,'history',2,'Trung Quốc và Ấn Độ thời trung đại',[
 ['4','Trung Quốc từ thế kỉ VII đến giữa thế kỉ XIX'],['5','Ấn Độ từ thế kỉ IV đến giữa thế kỉ XIX']]),
 chapter(7,'history',3,'Đông Nam Á từ nửa sau thế kỉ X đến nửa đầu thế kỉ XVI',[
 ['6','Các vương quốc phong kiến Đông Nam Á từ nửa sau thế kỉ X đến nửa đầu thế kỉ XVI'],['7','Vương quốc Lào'],['8','Vương quốc Cam-pu-chia']]),
 chapter(7,'history',4,'Đất nước dưới thời các vương triều Ngô - Đinh - Tiền Lê (939 - 1009)',[
 ['9','Đất nước buổi đầu độc lập (939 - 967)'],['10','Đại Cồ Việt thời Đinh và Tiền Lê (968 - 1009)']]),
 chapter(7,'history',5,'Đại Việt thời Lý - Trần - Hồ (1009 - 1407)',[
 ['11','Nhà Lý xây dựng và phát triển đất nước (1009 - 1225)'],['12','Cuộc kháng chiến chống quân xâm lược Tống (1075 - 1077)'],['13','Đại Việt thời Trần (1226 - 1400)'],['14','Ba lần kháng chiến chống quân xâm lược Mông - Nguyên'],['15','Nước Đại Ngu thời Hồ (1400 - 1407)']]),
 chapter(7,'history',6,'Khởi nghĩa Lam Sơn và Đại Việt thời Lê sơ (1418 - 1527)',[
 ['16','Khởi nghĩa Lam Sơn (1418 - 1427)'],['17','Đại Việt thời Lê sơ (1428 - 1527)']]),
 chapter(7,'history',7,'Vùng đất phía Nam Việt Nam từ đầu thế kỉ X đến đầu thế kỉ XVI',[
 ['18','Vương quốc Chăm-pa và vùng đất Nam Bộ từ đầu thế kỉ X đến thế kỉ XVI']]),
 chapter(7,'geography',1,'Châu Âu',[
 ['1','Vị trí địa lí, đặc điểm tự nhiên châu Âu'],['2','Đặc điểm dân cư, xã hội châu Âu'],['3','Khai thác, sử dụng và bảo vệ thiên nhiên ở châu Âu'],['4','Liên minh châu Âu']]),
 chapter(7,'geography',2,'Châu Á',[
 ['5','Vị trí địa lí, đặc điểm tự nhiên châu Á'],['6','Đặc điểm dân cư, xã hội châu Á'],['7','Bản đồ chính trị châu Á, các khu vực của châu Á'],['8','Thực hành: Tìm hiểu về các nền kinh tế lớn và kinh tế mới nổi của châu Á']]),
 chapter(7,'geography',3,'Châu Phi',[
 ['9','Vị trí địa lí, đặc điểm tự nhiên châu Phi'],['10','Đặc điểm dân cư, xã hội châu Phi'],['11','Phương thức con người khai thác, sử dụng và bảo vệ thiên nhiên ở châu Phi'],['12','Thực hành: Tìm hiểu khái quát Cộng hòa Nam Phi']]),
 chapter(7,'geography',4,'Châu Mỹ',[
 ['13','Vị trí địa lí, phạm vi châu Mỹ. Sự phát kiến ra châu Mỹ'],['14','Đặc điểm tự nhiên Bắc Mỹ'],['15','Đặc điểm dân cư, xã hội, phương thức khai thác tự nhiên bền vững ở Bắc Mỹ'],['16','Đặc điểm tự nhiên Trung và Nam Mỹ'],['17','Đặc điểm dân cư, xã hội Trung và Nam Mỹ, khai thác, sử dụng và bảo vệ rừng A-ma-dôn']]),
 chapter(7,'geography',5,'Châu Đại Dương và châu Nam Cực',[
 ['18','Châu Đại Dương'],['19','Châu Nam Cực']]),
 ], integrated:integrated(7,[['1','Các cuộc đại phát kiến địa lí thế kỉ XV - XVI'],['2','Đô thị: Lịch sử và hiện tại']])
},
{
 grade:8, textbook:'Kết nối tri thức với cuộc sống',
 sources:['https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/shs-lich-su-va-dia-ly.4495351297','https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-lich-su-va-dia-li.4495336266'],
 chapters:[
 chapter(8,'history',1,'Châu Âu và Bắc Mỹ từ nửa sau thế kỉ XVI đến thế kỉ XVIII',[
 ['1','Cách mạng tư sản Anh và chiến tranh giành độc lập của 13 thuộc địa Anh ở Bắc Mỹ'],['2','Cách mạng tư sản Pháp cuối thế kỉ XVIII'],['3','Cách mạng công nghiệp (nửa sau thế kỉ XVIII - giữa thế kỉ XIX)']]),
 chapter(8,'history',2,'Đông Nam Á từ nửa sau thế kỉ XVI đến giữa thế kỉ XIX',[
 ['4','Đông Nam Á từ nửa sau thế kỉ XVI đến giữa thế kỉ XIX']]),
 chapter(8,'history',3,'Việt Nam từ đầu thế kỉ XVI đến thế kỉ XVIII',[
 ['5','Cuộc xung đột Nam - Bắc triều và Trịnh - Nguyễn'],['6','Công cuộc khai phá vùng đất phía Nam từ thế kỉ XVI đến thế kỉ XVIII'],['7','Khởi nghĩa nông dân ở Đàng Ngoài thế kỉ XVIII'],['8','Phong trào Tây Sơn'],['9','Tình hình kinh tế, văn hóa, tôn giáo trong các thế kỉ XVI - XVIII']]),
 chapter(8,'history',4,'Châu Âu và nước Mỹ từ cuối thế kỉ XVIII đến đầu thế kỉ XX',[
 ['10','Sự hình thành chủ nghĩa đế quốc ở các nước Âu - Mỹ (cuối thế kỉ XIX - đầu thế kỉ XX)'],['11','Phong trào công nhân từ cuối thế kỉ XVIII đến đầu thế kỉ XX và sự ra đời của chủ nghĩa xã hội khoa học'],['12','Chiến tranh thế giới thứ nhất (1914 - 1918) và Cách mạng tháng Mười Nga năm 1917']]),
 chapter(8,'history',5,'Sự phát triển của khoa học, kĩ thuật, văn học, nghệ thuật trong các thế kỉ XVIII - XIX',[
 ['13','Sự phát triển của khoa học, kĩ thuật, văn học, nghệ thuật trong các thế kỉ XVIII - XIX']]),
 chapter(8,'history',6,'Châu Á từ nửa sau thế kỉ XIX đến nửa đầu thế kỉ XX',[
 ['14','Trung Quốc và Nhật Bản từ nửa sau thế kỉ XIX đến đầu thế kỉ XX'],['15','Ấn Độ và Đông Nam Á từ nửa sau thế kỉ XIX đến đầu thế kỉ XX']]),
 chapter(8,'history',7,'Việt Nam từ thế kỉ XIX đến đầu thế kỉ XX',[
 ['16','Việt Nam dưới triều Nguyễn (nửa đầu thế kỉ XIX)'],['17','Cuộc kháng chiến chống thực dân Pháp xâm lược từ năm 1858 đến năm 1884'],['18','Phong trào kháng chiến chống Pháp trong những năm 1885 - 1896'],['19','Phong trào yêu nước chống Pháp ở Việt Nam từ đầu thế kỉ XX đến năm 1917']]),
 chapter(8,'geography',1,'Vị trí địa lí và phạm vi lãnh thổ, địa hình và khoáng sản Việt Nam',[
 ['1','Vị trí địa lí và phạm vi lãnh thổ Việt Nam'],['2','Địa hình Việt Nam'],['3','Khoáng sản Việt Nam']]),
 chapter(8,'geography',2,'Khí hậu và thủy văn Việt Nam',[
 ['4','Khí hậu Việt Nam'],['5','Thực hành: Vẽ và phân tích biểu đồ khí hậu'],['6','Thủy văn Việt Nam'],['7','Vai trò của tài nguyên khí hậu và tài nguyên nước đối với sự phát triển kinh tế - xã hội của nước ta'],['8','Tác động của biến đổi khí hậu đối với khí hậu và thủy văn Việt Nam']]),
 chapter(8,'geography',3,'Thổ nhưỡng và sinh vật Việt Nam',[
 ['9','Thổ nhưỡng Việt Nam'],['10','Sinh vật Việt Nam']]),
 chapter(8,'geography',4,'Biển đảo Việt Nam',[
 ['11','Phạm vi Biển Đông. Vùng biển đảo và đặc điểm tự nhiên vùng biển đảo Việt Nam'],['12','Môi trường và tài nguyên biển đảo Việt Nam']]),
 ], integrated:integrated(8,[['1','Văn minh châu thổ sông Hồng và sông Cửu Long'],['2','Bảo vệ chủ quyền, các quyền và lợi ích hợp pháp của Việt Nam ở Biển Đông']])
},
{
 grade:9, textbook:'Kết nối tri thức với cuộc sống',
 sources:['https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/shs-lich-su-va-dia-ly.4495357589'],
 chapters:[
 chapter(9,'history',1,'Thế giới từ năm 1918 đến năm 1945',[
 ['1','Nước Nga và Liên Xô từ năm 1918 đến năm 1945'],['2','Châu Âu và nước Mỹ từ năm 1918 đến năm 1945'],['3','Châu Á từ năm 1918 đến năm 1945'],['4','Chiến tranh thế giới thứ hai (1939 - 1945)']]),
 chapter(9,'history',2,'Việt Nam từ năm 1918 đến năm 1945',[
 ['5','Phong trào dân tộc dân chủ trong những năm 1918 - 1930'],['6','Hoạt động của Nguyễn Ái Quốc và sự thành lập Đảng Cộng sản Việt Nam'],['7','Phong trào cách mạng Việt Nam thời kì 1930 - 1939'],['8','Cách mạng tháng Tám năm 1945']]),
 chapter(9,'history',3,'Thế giới từ năm 1945 đến năm 1991',[
 ['9','Chiến tranh lạnh (1947 - 1989)'],['10','Liên Xô và Đông Âu từ năm 1945 đến năm 1991'],['11','Nước Mỹ và Tây Âu từ năm 1945 đến năm 1991'],['12','Khu vực Mỹ La-tinh và châu Á từ năm 1945 đến năm 1991']]),
 chapter(9,'history',4,'Việt Nam từ năm 1945 đến năm 1991',[
 ['13','Việt Nam trong những năm đầu sau Cách mạng tháng Tám năm 1945'],['14','Việt Nam kháng chiến chống thực dân Pháp xâm lược giai đoạn 1946 - 1950'],['15','Việt Nam kháng chiến chống thực dân Pháp xâm lược giai đoạn 1951 - 1954'],['16','Việt Nam kháng chiến chống Mỹ, cứu nước, thống nhất đất nước giai đoạn 1954 - 1965'],['17','Việt Nam kháng chiến chống Mỹ, cứu nước, thống nhất đất nước giai đoạn 1965 - 1975']]),
 chapter(9,'history',5,'Thế giới từ năm 1991 đến nay',[
 ['18','Trật tự thế giới mới từ năm 1991 đến nay. Liên bang Nga và nước Mỹ từ năm 1991 đến nay'],['19','Châu Á từ năm 1991 đến nay']]),
 chapter(9,'history',6,'Việt Nam từ năm 1976 đến nay',[
 ['20','Việt Nam từ năm 1976 đến nay']]),
 chapter(9,'history',7,'Cách mạng khoa học - kĩ thuật và xu thế toàn cầu hóa',[
 ['21','Cách mạng khoa học - kĩ thuật và xu thế toàn cầu hóa']]),
 chapter(9,'geography',1,'Địa lí dân cư Việt Nam',[
 ['1','Dân tộc và dân số'],['2','Phân bố dân cư và các loại hình quần cư'],['3','Lao động và việc làm'],['4','Thực hành: Tìm hiểu vấn đề việc làm ở địa phương và phân hóa thu nhập theo vùng']]),
 chapter(9,'geography',2,'Địa lí các ngành kinh tế',[
 ['5','Nông nghiệp'],['6','Lâm nghiệp và thủy sản'],['7','Thực hành: Viết báo cáo về một mô hình sản xuất nông nghiệp có hiệu quả'],['8','Công nghiệp'],['9','Thực hành: Xác định các trung tâm công nghiệp chính ở nước ta'],['10','Dịch vụ'],['11','Thực hành: Tìm hiểu xu hướng phát triển ngành thương mại, du lịch']]),
 chapter(9,'geography',3,'Sự phân hóa lãnh thổ',[
 ['12','Vùng Trung du và miền núi phía Bắc'],['13','Vùng Đồng bằng sông Hồng'],['14','Vùng Bắc Trung Bộ'],['15','Thực hành: Tìm hiểu vấn đề phòng, chống thiên tai và ứng phó với biến đổi khí hậu ở Bắc Trung Bộ'],['16','Vùng Duyên hải Nam Trung Bộ và Tây Nguyên'],['17','Vùng Đông Nam Bộ'],['18','Thực hành: Phân tích ý nghĩa của việc tăng cường kết nối liên vùng đối với sự phát triển của vùng Đông Nam Bộ'],['19','Vùng Đồng bằng sông Cửu Long'],['20','Thực hành: Tìm hiểu về tác động của biến đổi khí hậu đối với vùng Đồng bằng sông Cửu Long'],['21','Phát triển tổng hợp kinh tế và bảo vệ tài nguyên, môi trường biển đảo']]),
 ], integrated:integrated(9,[['1','Đô thị: Lịch sử và hiện tại'],['2','Văn minh châu thổ sông Hồng và sông Cửu Long']])
},
];

export const flattenHistoryGeographySyllabus = () => historyGeographySyllabusManifest.flatMap((grade) => [
 ...grade.chapters.flatMap((item) => item.lessons),
 ...grade.integrated,
]);
