import { GradeLevel, SchoolLevel, SubjectMeta } from '../types';

const PRIMARY_GRADE_SET = new Set<GradeLevel>(['1', '2', '3', '4', '5']);
const SECONDARY_GRADE_SET = new Set<GradeLevel>(['6', '7', '8', '9']);

export const SUBJECTS_CATALOG: SubjectMeta[] = [
  {
    id: 'math',
    dbCode: 'toan',
    name: 'Toán Học',
    iconName: 'Calculator',
    color: 'from-blue-600 to-indigo-600',
    description: 'Toán chuẩn SGK Kết nối tri thức từ Lớp 1 đến Lớp 9: mỗi chương một bài ôn luyện 15 câu.',
    status: 'active',
    tagline: 'Lớp 1 → 9 · 66 chương · 990 câu',
    schoolLevels: ['primary', 'secondary'],
    levelMeta: {
      primary: {
        tagline: 'Lớp 1 → 5 · 27 chương · 405 câu',
        description: 'Đếm số, phép tính, phân số, số thập phân, hình học & chuyển động (Kết nối tri thức).',
        gradeRangeLabel: 'Lớp 1 – 5'
      },
      secondary: {
        tagline: 'Lớp 6 → 9 · 39 chương · 585 câu',
        description: 'Số học, đại số, hàm số, hình học phẳng & không gian (Kết nối tri thức).',
        gradeRangeLabel: 'Lớp 6 – 9'
      }
    },
    availableGrades: [
      { grade: '1', term1Available: true, term2Available: true, notes: '5 chương, 75 câu trộn mọi mức độ' },
      { grade: '2', term1Available: true, term2Available: true, notes: '5 chương, 75 câu trộn mọi mức độ' },
      { grade: '3', term1Available: true, term2Available: true, notes: '6 chương, 90 câu trộn mọi mức độ' },
      { grade: '4', term1Available: true, term2Available: true, notes: '5 chương, 75 câu trộn mọi mức độ' },
      { grade: '5', term1Available: true, term2Available: true, notes: '6 chương, 90 câu trộn mọi mức độ' },
      { grade: '6', term1Available: true, term2Available: true, notes: '9 chương, 135 câu trộn mọi mức độ' },
      { grade: '7', term1Available: true, term2Available: true, notes: '10 chương, 150 câu trộn mọi mức độ' },
      { grade: '8', term1Available: true, term2Available: true, notes: '10 chương, 150 câu trộn mọi mức độ' },
      { grade: '9', term1Available: true, term2Available: true, notes: '10 chương, 150 câu trộn mọi mức độ' }
    ]
  },
  {
    id: 'science',
    dbCode: 'khtn',
    name: 'Khoa Học Tự Nhiên',
    iconName: 'Atom',
    color: 'from-emerald-500 to-teal-600',
    description: 'Tích hợp Vật lí, Hóa học & Sinh học dành cho học sinh THCS.',
    status: 'active',
    tagline: 'Lớp 6 → 9 · 45 chương · 675 câu',
    schoolLevels: ['secondary'],
    levelMeta: {
      secondary: {
        tagline: 'Lớp 6 → 9 · 45 chương · 675 câu',
        description: 'Tích hợp Vật lí, Hóa học, Sinh học theo bộ SGK Kết nối tri thức.',
        gradeRangeLabel: 'Lớp 6 – 9'
      }
    },
    availableGrades: [
      { grade: '6', term1Available: true, term2Available: true, notes: '10 chương, 150 câu (Kết nối tri thức)' },
      { grade: '7', term1Available: true, term2Available: true, notes: '11 chương, 165 câu (Kết nối tri thức)' },
      { grade: '8', term1Available: true, term2Available: true, notes: '9 chương, 135 câu (Kết nối tri thức)' },
      { grade: '9', term1Available: true, term2Available: true, notes: '15 chương, 225 câu (Kết nối tri thức)' }
    ]
  },
  {
    id: 'vietnamese',
    dbCode: 'tiengviet',
    name: 'Tiếng Việt',
    iconName: 'BookOpenText',
    color: 'from-rose-500 to-pink-600',
    description: 'Đọc hiểu, luyện từ và câu, chính tả và tập làm văn chuẩn SGK Tập 1 & Tập 2.',
    status: 'active',
    tagline: 'Lớp 1 → 5 · 92 bài · 1.380 câu',
    schoolLevels: ['primary'],
    levelMeta: {
      primary: {
        tagline: 'Lớp 1 → 5 · 92 bài · 1.380 câu',
        description: 'Đọc hiểu, từ vựng, câu văn, biện pháp tu từ và viết văn cho học sinh Tiểu học.',
        gradeRangeLabel: 'Lớp 1 – 5'
      }
    },
    availableGrades: [
      { grade: '1', term1Available: true, term2Available: true, notes: '5 chương, 20 bài (300 câu)' },
      { grade: '2', term1Available: true, term2Available: true, notes: '6 chương, 18 bài (270 câu)' },
      { grade: '3', term1Available: true, term2Available: true, notes: '6 chương, 18 bài (270 câu)' },
      { grade: '4', term1Available: true, term2Available: true, notes: '6 chương, 18 bài (270 câu)' },
      { grade: '5', term1Available: true, term2Available: true, notes: '6 chương, 18 bài (270 câu)' }
    ]
  },
  {
    id: 'nature_society',
    dbCode: 'tnxh',
    name: 'Tự Nhiên và Xã Hội',
    iconName: 'Leaf',
    color: 'from-lime-500 to-emerald-600',
    description: 'Gia đình, trường học, cộng đồng, thực vật, động vật và Trái Đất quanh em (Lớp 1–3).',
    status: 'active',
    tagline: 'Lớp 1 → 3 · 18 chương · 89 bài',
    schoolLevels: ['primary'],
    levelMeta: {
      primary: {
        tagline: 'Lớp 1 → 3 · 18 chương · 89 bài',
        description: 'Khám phá gia đình, trường học, thiên nhiên & sức khỏe cho Lớp 1, 2, 3.',
        gradeRangeLabel: 'Lớp 1 – 3'
      }
    },
    availableGrades: [
      { grade: '1', term1Available: true, term2Available: true, notes: '6 chương, 28 bài học (Kết nối tri thức)' },
      { grade: '2', term1Available: true, term2Available: true, notes: '6 chương, 31 bài học (Kết nối tri thức)' },
      { grade: '3', term1Available: true, term2Available: true, notes: '6 chương, 30 bài học (Kết nối tri thức)' }
    ]
  },
  {
    id: 'primary_science',
    dbCode: 'khoahoc',
    name: 'Khoa Học',
    iconName: 'FlaskConical',
    color: 'from-teal-500 to-cyan-600',
    description: 'Chất, năng lượng, thực vật – động vật, con người, sức khỏe và môi trường (Lớp 4–5).',
    status: 'active',
    tagline: 'Lớp 4 → 5 · 36 bài · 540 câu',
    schoolLevels: ['primary'],
    levelMeta: {
      primary: {
        tagline: 'Lớp 4 → 5 · 36 bài · 540 câu',
        description: 'Thí nghiệm vui về chất, ánh sáng, âm thanh, mạch điện, sinh vật và sức khỏe Lớp 4–5.',
        gradeRangeLabel: 'Lớp 4 – 5'
      }
    },
    availableGrades: [
      { grade: '4', term1Available: true, term2Available: true, notes: '6 chương, 18 bài (270 câu)' },
      { grade: '5', term1Available: true, term2Available: true, notes: '6 chương, 18 bài (270 câu)' }
    ]
  },
  {
    id: 'literature',
    dbCode: 'nguvan',
    name: 'Ngữ Văn',
    iconName: 'BookMarked',
    color: 'from-rose-500 to-pink-600',
    description: 'Đọc hiểu truyện, thơ, nghị luận, văn bản thông tin, thực hành tiếng Việt & viết (Kết nối tri thức 6–9).',
    status: 'active',
    tagline: 'Lớp 6 → 9 · 48 bài · 720 câu',
    schoolLevels: ['secondary'],
    levelMeta: {
      secondary: {
        tagline: 'Lớp 6 → 9 · 48 bài · 720 câu',
        description: 'Đọc hiểu văn bản, tiếng Việt và làm văn chuẩn SGK Kết nối tri thức Lớp 6–9.',
        gradeRangeLabel: 'Lớp 6 – 9'
      }
    },
    availableGrades: [
      { grade: '6', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' },
      { grade: '7', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' },
      { grade: '8', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' },
      { grade: '9', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' }
    ]
  },
  {
    id: 'english',
    dbCode: 'tienganh',
    name: 'Tiếng Anh',
    iconName: 'Languages',
    color: 'from-amber-500 to-orange-600',
    description: 'Từ vựng, ngữ pháp, phát âm và giao tiếp trọn bộ Lớp 1–9 (Global Success 1–9).',
    status: 'active',
    tagline: 'Lớp 1 → 9 · 166 bài · 2.490 câu',
    schoolLevels: ['primary', 'secondary'],
    levelMeta: {
      primary: {
        tagline: 'Lớp 1 → 5 · 102 bài · 1.530 câu',
        description: 'Phonics, từ vựng, ngữ pháp và mẫu câu giao tiếp thiếu nhi (Global Success 1–5).',
        gradeRangeLabel: 'Lớp 1 – 5'
      },
      secondary: {
        tagline: 'Lớp 6 → 9 · 64 bài · 960 câu',
        description: 'Từ vựng, ngữ pháp, phát âm và đọc hiểu tiếng Anh THCS (Global Success 6–9).',
        gradeRangeLabel: 'Lớp 6 – 9'
      }
    },
    availableGrades: [
      { grade: '1', term1Available: true, term2Available: true, notes: '4 chương, 20 bài (300 câu · Global Success)' },
      { grade: '2', term1Available: true, term2Available: true, notes: '4 chương, 20 bài (300 câu · Global Success)' },
      { grade: '3', term1Available: true, term2Available: true, notes: '5 chương, 22 bài (330 câu · Global Success)' },
      { grade: '4', term1Available: true, term2Available: true, notes: '4 chương, 20 bài (300 câu · Global Success)' },
      { grade: '5', term1Available: true, term2Available: true, notes: '4 chương, 20 bài (300 câu · Global Success)' },
      { grade: '6', term1Available: true, term2Available: true, notes: '4 chương, 16 bài (240 câu · Global Success)' },
      { grade: '7', term1Available: true, term2Available: true, notes: '4 chương, 16 bài (240 câu · Global Success)' },
      { grade: '8', term1Available: true, term2Available: true, notes: '4 chương, 16 bài (240 câu · Global Success)' },
      { grade: '9', term1Available: true, term2Available: true, notes: '4 chương, 16 bài (240 câu · Global Success)' }
    ]
  },
  {
    id: 'history_geo',
    dbCode: 'lsdl',
    name: 'Lịch Sử và Địa Lí',
    iconName: 'Compass',
    color: 'from-cyan-600 to-blue-700',
    description: 'Lịch sử và Địa lí theo chương trình GDPT; nội dung THCS lấy SGK Kết nối tri thức với cuộc sống làm chuẩn.',
    status: 'active',
    tagline: 'Lớp 4 → 5 · 36 bài · 540 câu',
    schoolLevels: ['primary', 'secondary'],
    levelMeta: {
      primary: {
        tagline: 'Lớp 4 → 5 · 36 bài · 540 câu',
        description: 'Lịch sử dựng nước, giữ nước và địa lí các vùng miền Việt Nam – thế giới (Lớp 4–5).',
        gradeRangeLabel: 'Lớp 4 – 5'
      },
      secondary: {
        tagline: 'Lớp 6 → 9 · Sắp mở',
        description: 'Lớp 6–9 dự kiến theo SGK Kết nối tri thức với cuộc sống; hiện khóa đến khi học liệu, dữ liệu và kiểm thử được duyệt.',
        gradeRangeLabel: 'Lớp 6 – 9'
      }
    },
    availableGrades: [
      { grade: '4', term1Available: true, term2Available: true, notes: '6 chương, 18 bài (270 câu)' },
      { grade: '5', term1Available: true, term2Available: true, notes: '6 chương, 18 bài (270 câu)' },
      { grade: '6', term1Available: false, term2Available: false, notes: 'Kết nối tri thức – đang hoàn thiện, chưa mở' },
      { grade: '7', term1Available: false, term2Available: false, notes: 'Kết nối tri thức – đang hoàn thiện, chưa mở' },
      { grade: '8', term1Available: false, term2Available: false, notes: 'Sắp ra mắt' },
      { grade: '9', term1Available: false, term2Available: false, notes: 'Sắp ra mắt' }
    ]
  },
  {
    id: 'informatics',
    dbCode: 'tinhoc',
    name: 'Tin Học',
    iconName: 'Cpu',
    color: 'from-violet-600 to-purple-700',
    description: 'Làm quen máy tính, lập trình kéo thả Scratch, tư duy thuật toán & an toàn số.',
    status: 'active',
    tagline: 'Lớp 3 → 9 · 92 bài · 1.380 câu',
    schoolLevels: ['primary', 'secondary'],
    levelMeta: {
      primary: {
        tagline: 'Lớp 3 → 5 · 44 bài · 660 câu',
        description: 'Làm quen máy tính, an toàn Internet, soạn thảo, trình chiếu và lập trình Scratch (Lớp 3–5).',
        gradeRangeLabel: 'Lớp 3 – 5'
      },
      secondary: {
        tagline: 'Lớp 6 → 9 · 48 bài · 720 câu',
        description: 'Thông tin, bảng tính, thuật toán, lập trình Scratch, an toàn & pháp lí số (Kết nối tri thức 6–9).',
        gradeRangeLabel: 'Lớp 6 – 9'
      }
    },
    availableGrades: [
      { grade: '3', term1Available: true, term2Available: true, notes: '5 chương, 16 bài (240 câu)' },
      { grade: '4', term1Available: true, term2Available: true, notes: '5 chương, 14 bài (210 câu)' },
      { grade: '5', term1Available: true, term2Available: true, notes: '5 chương, 14 bài (210 câu)' },
      { grade: '6', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' },
      { grade: '7', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' },
      { grade: '8', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' },
      { grade: '9', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' }
    ]
  },
  {
    id: 'technology',
    dbCode: 'congnghe',
    name: 'Công Nghệ',
    iconName: 'Wrench',
    color: 'from-yellow-600 to-amber-700',
    description: 'Thủ công kĩ thuật, công nghệ đời sống, lắp ghép mô hình & định hướng nghề nghiệp.',
    status: 'active',
    tagline: 'Lớp 3 → 9 · 78 bài · 1.170 câu',
    schoolLevels: ['primary', 'secondary'],
    levelMeta: {
      primary: {
        tagline: 'Lớp 3 → 5 · 30 bài · 450 câu',
        description: 'Sử dụng đồ dùng công nghệ gia đình, lắp ghép mô hình & trồng hoa cây cảnh (Lớp 3–5).',
        gradeRangeLabel: 'Lớp 3 – 5'
      },
      secondary: {
        tagline: 'Lớp 6 → 9 · 48 bài · 720 câu',
        description: 'Công nghệ đời sống, trồng trọt – chăn nuôi, vẽ kĩ thuật, mạch điện & thiết kế (Kết nối tri thức 6–9).',
        gradeRangeLabel: 'Lớp 6 – 9'
      }
    },
    availableGrades: [
      { grade: '3', term1Available: true, term2Available: true, notes: '2 chương, 10 bài (150 câu)' },
      { grade: '4', term1Available: true, term2Available: true, notes: '2 chương, 10 bài (150 câu)' },
      { grade: '5', term1Available: true, term2Available: true, notes: '2 chương, 10 bài (150 câu)' },
      { grade: '6', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' },
      { grade: '7', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' },
      { grade: '8', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' },
      { grade: '9', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' }
    ]
  },
  {
    id: 'ethics',
    dbCode: 'daoduc',
    name: 'Đạo Đức',
    iconName: 'HeartHandshake',
    color: 'from-pink-500 to-rose-600',
    description: 'Lễ phép, yêu thương gia đình, trung thực, đoàn kết và bảo vệ môi trường (Lớp 1–5).',
    status: 'active',
    tagline: 'Lớp 1 → 5 · 67 bài · 1.005 câu',
    schoolLevels: ['primary'],
    levelMeta: {
      primary: {
        tagline: 'Lớp 1 → 5 · 67 bài · 1.005 câu',
        description: 'Tình huống đạo đức học đường, lễ phép, trung thực và trách nhiệm (Lớp 1–5).',
        gradeRangeLabel: 'Lớp 1 – 5'
      }
    },
    availableGrades: [
      { grade: '1', term1Available: true, term2Available: true, notes: '4 chương, 16 bài (240 câu)' },
      { grade: '2', term1Available: true, term2Available: true, notes: '4 chương, 15 bài (225 câu)' },
      { grade: '3', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu)' },
      { grade: '4', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu)' },
      { grade: '5', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu)' }
    ]
  },
  {
    id: 'life_skills',
    dbCode: 'lssong',
    name: 'Giáo Dục Lối Sống',
    iconName: 'Sun',
    color: 'from-amber-400 to-yellow-600',
    description: 'Rèn thói quen sinh hoạt văn minh, an toàn giao thông và ứng xử đẹp (Lớp 1–5).',
    status: 'active',
    tagline: 'Lớp 1 → 5 · 60 bài · 900 câu',
    schoolLevels: ['primary'],
    levelMeta: {
      primary: {
        tagline: 'Lớp 1 → 5 · 60 bài · 900 câu',
        description: 'Kĩ năng tự phục vụ, an toàn và nếp sống văn minh hàng ngày.',
        gradeRangeLabel: 'Lớp 1 – 5'
      }
    },
    availableGrades: [
      { grade: '1', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu)' },
      { grade: '2', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu)' },
      { grade: '3', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu)' },
      { grade: '4', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu)' },
      { grade: '5', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu)' }
    ]
  },
  {
    id: 'civic_edu',
    dbCode: 'gdcd',
    name: 'Giáo Dục Công Dân',
    iconName: 'Shield',
    color: 'from-red-500 to-rose-600',
    description: 'Xử lý tình huống đạo đức học đường, pháp luật và kỹ năng sống văn minh.',
    status: 'active',
    tagline: 'Lớp 6 → 9 · 48 bài · 720 câu',
    schoolLevels: ['secondary'],
    levelMeta: {
      secondary: {
        tagline: 'Lớp 6 → 9 · 48 bài · 720 câu',
        description: 'Tình huống công dân, pháp luật, quyền trẻ em, tiêu dùng & lao động THCS (Kết nối tri thức 6–9).',
        gradeRangeLabel: 'Lớp 6 – 9'
      }
    },
    availableGrades: [
      { grade: '6', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' },
      { grade: '7', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' },
      { grade: '8', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' },
      { grade: '9', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' }
    ]
  },
  {
    id: 'music',
    dbCode: 'amnhac',
    name: 'Âm Nhạc',
    iconName: 'Music',
    color: 'from-fuchsia-500 to-purple-600',
    description: 'Cảm thụ tiết tấu, đọc nhạc, nhạc cụ dân tộc và các bài hát thiếu nhi – học đường.',
    status: 'active',
    tagline: 'Lớp 1 → 9 · 124 bài · 1.860 câu',
    schoolLevels: ['primary', 'secondary'],
    levelMeta: {
      primary: {
        tagline: 'Lớp 1 → 5 · 76 bài · 1.140 câu',
        description: 'Hát, đọc nhạc, nhịp phách, di sản UNESCO và nhạc cụ thiếu nhi – dân tộc (Lớp 1–5).',
        gradeRangeLabel: 'Lớp 1 – 5'
      },
      secondary: {
        tagline: 'Lớp 6 → 9 · 48 bài · 720 câu',
        description: 'Nhạc lí, gam giọng, di sản âm nhạc Việt Nam – thế giới và hợp xướng (Kết nối tri thức 6–9).',
        gradeRangeLabel: 'Lớp 6 – 9'
      }
    },
    availableGrades: [
      { grade: '1', term1Available: true, term2Available: true, notes: '4 chương, 16 bài (240 câu)' },
      { grade: '2', term1Available: true, term2Available: true, notes: '4 chương, 16 bài (240 câu)' },
      { grade: '3', term1Available: true, term2Available: true, notes: '4 chương, 16 bài (240 câu)' },
      { grade: '4', term1Available: true, term2Available: true, notes: '4 chương, 14 bài (210 câu)' },
      { grade: '5', term1Available: true, term2Available: true, notes: '4 chương, 14 bài (210 câu)' },
      { grade: '6', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' },
      { grade: '7', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' },
      { grade: '8', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' },
      { grade: '9', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' }
    ]
  },
  {
    id: 'art',
    dbCode: 'mithuat',
    name: 'Mĩ Thuật',
    iconName: 'Palette',
    color: 'from-orange-500 to-red-500',
    description: 'Màu sắc, bố cục tạo hình, vẽ tranh sáng tạo và thưởng thức di sản mĩ thuật.',
    status: 'active',
    tagline: 'Lớp 1 → 9 · 134 bài · 2.010 câu',
    schoolLevels: ['primary', 'secondary'],
    levelMeta: {
      primary: {
        tagline: 'Lớp 1 → 5 · 86 bài · 1.290 câu',
        description: 'Chấm nét, hình khối, pha màu cơ bản và sáng tạo thủ công (Lớp 1–5).',
        gradeRangeLabel: 'Lớp 1 – 5'
      },
      secondary: {
        tagline: 'Lớp 6 → 9 · 48 bài · 720 câu',
        description: 'Mĩ thuật tạo hình, thiết kế đồ họa – thời trang và di sản mĩ thuật (Kết nối tri thức 6–9).',
        gradeRangeLabel: 'Lớp 6 – 9'
      }
    },
    availableGrades: [
      { grade: '1', term1Available: true, term2Available: true, notes: '4 chương, 18 bài (270 câu)' },
      { grade: '2', term1Available: true, term2Available: true, notes: '4 chương, 20 bài (300 câu)' },
      { grade: '3', term1Available: true, term2Available: true, notes: '4 chương, 20 bài (300 câu)' },
      { grade: '4', term1Available: true, term2Available: true, notes: '4 chương, 14 bài (210 câu)' },
      { grade: '5', term1Available: true, term2Available: true, notes: '4 chương, 14 bài (210 câu)' },
      { grade: '6', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' },
      { grade: '7', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' },
      { grade: '8', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' },
      { grade: '9', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' }
    ]
  },
  {
    id: 'pe',
    dbCode: 'gdtc',
    name: 'Giáo Dục Thể Chất',
    iconName: 'Dumbbell',
    color: 'from-sky-500 to-blue-600',
    description: 'Kiến thức rèn luyện thể lực, tư thế vận động, thể thao tự chọn và dinh dưỡng.',
    status: 'active',
    tagline: 'Lớp 1 → 9 · 124 bài · 1.860 câu',
    schoolLevels: ['primary', 'secondary'],
    levelMeta: {
      primary: {
        tagline: 'Lớp 1 → 5 · 76 bài · 1.140 câu',
        description: 'Đội hình đội ngũ, bài tập thể dục buổi sáng và trò chơi vận động (Lớp 1–5).',
        gradeRangeLabel: 'Lớp 1 – 5'
      },
      secondary: {
        tagline: 'Lớp 6 → 9 · 48 bài · 720 câu',
        description: 'Điền kinh, thể dục nhịp điệu, bóng đá, bóng rổ, bóng chuyền, cầu lông & an toàn (Kết nối tri thức 6–9).',
        gradeRangeLabel: 'Lớp 6 – 9'
      }
    },
    availableGrades: [
      { grade: '1', term1Available: true, term2Available: true, notes: '4 chương, 16 bài (240 câu)' },
      { grade: '2', term1Available: true, term2Available: true, notes: '4 chương, 16 bài (240 câu)' },
      { grade: '3', term1Available: true, term2Available: true, notes: '4 chương, 16 bài (240 câu)' },
      { grade: '4', term1Available: true, term2Available: true, notes: '4 chương, 14 bài (210 câu)' },
      { grade: '5', term1Available: true, term2Available: true, notes: '4 chương, 14 bài (210 câu)' },
      { grade: '6', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' },
      { grade: '7', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' },
      { grade: '8', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' },
      { grade: '9', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' }
    ]
  },
  {
    id: 'experience',
    dbCode: 'hdtn',
    name: 'Hoạt Động Trải Nghiệm',
    iconName: 'Sparkles',
    color: 'from-emerald-500 to-green-600',
    description: 'Khám phá bản thân, giao lưu tập thể, bảo vệ môi trường & hoạt động cộng đồng (Lớp 1–5).',
    status: 'active',
    tagline: 'Lớp 1 → 5 · 86 bài · 1.290 câu',
    schoolLevels: ['primary'],
    levelMeta: {
      primary: {
        tagline: 'Lớp 1 → 5 · 86 bài · 1.290 câu',
        description: 'Tự lập, kết bạn, bảo vệ thiên nhiên và truyền thống quê hương (Lớp 1–5).',
        gradeRangeLabel: 'Lớp 1 – 5'
      }
    },
    availableGrades: [
      { grade: '1', term1Available: true, term2Available: true, notes: '4 chương, 18 bài (270 câu)' },
      { grade: '2', term1Available: true, term2Available: true, notes: '4 chương, 18 bài (270 câu)' },
      { grade: '3', term1Available: true, term2Available: true, notes: '4 chương, 18 bài (270 câu)' },
      { grade: '4', term1Available: true, term2Available: true, notes: '4 chương, 16 bài (240 câu)' },
      { grade: '5', term1Available: true, term2Available: true, notes: '4 chương, 16 bài (240 câu)' }
    ]
  },
  {
    id: 'career_experience',
    dbCode: 'hdtn_hn',
    name: 'HĐ Trải Nghiệm, Hướng Nghiệp',
    iconName: 'Sparkles',
    color: 'from-indigo-500 to-violet-600',
    description: 'Phát triển bản thân, trách nhiệm cộng đồng và khám phá nghề nghiệp tương lai (Lớp 6–9).',
    status: 'active',
    tagline: 'Lớp 6 → 9 · 48 bài · 720 câu',
    schoolLevels: ['secondary'],
    levelMeta: {
      secondary: {
        tagline: 'Lớp 6 → 9 · 48 bài · 720 câu',
        description: 'Phát triển bản thân, gia đình – cộng đồng xanh, tài chính & hướng nghiệp THCS (Kết nối tri thức 6–9).',
        gradeRangeLabel: 'Lớp 6 – 9'
      }
    },
    availableGrades: [
      { grade: '6', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' },
      { grade: '7', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' },
      { grade: '8', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' },
      { grade: '9', term1Available: true, term2Available: true, notes: '4 chương, 12 bài (180 câu · Kết nối tri thức)' }
    ]
  }
];

export const SUBJECT_DB_CODES: Record<string, string> = Object.fromEntries(
  SUBJECTS_CATALOG.map((s) => [s.id, s.dbCode])
);

export function getSubjectsForLevel(level: SchoolLevel): SubjectMeta[] {
  return SUBJECTS_CATALOG
    .filter((s) => s.schoolLevels.includes(level))
    .sort((a, b) => Number(b.status === 'active') - Number(a.status === 'active'));
}

export function getGradesForSubject(subj: SubjectMeta, level?: SchoolLevel) {
  if (!level) return subj.availableGrades;
  const set = level === 'primary' ? PRIMARY_GRADE_SET : SECONDARY_GRADE_SET;
  return subj.availableGrades.filter((g) => set.has(g.grade));
}

export function getSubjectLevelInfo(subj: SubjectMeta, level: SchoolLevel) {
  const override = subj.levelMeta?.[level];
  const grades = getGradesForSubject(subj, level);
  const first = grades[0]?.grade;
  const last = grades[grades.length - 1]?.grade;
  const fallbackRange = first && last ? (first === last ? `Lớp ${first}` : `Lớp ${first} → ${last}`) : '';
  return {
    tagline: override?.tagline ?? subj.tagline ?? fallbackRange,
    description: override?.description ?? subj.description,
    gradeRangeLabel: override?.gradeRangeLabel ?? fallbackRange
  };
}
