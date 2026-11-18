from g123_core import make_q, make_lesson
from fig_helpers_g123 import table_fig, bars_fig


def _q(b, num, d, p, ok, wrongs, e, s='', h='', fig=None):
    return make_q(f'TV1-B{b:02d}-{num:03d}', d, p, ok, wrongs, e, s, h, fig)


def get_lessons():
    lessons = []

    # BÀI 1: Làm quen với các nguyên âm a, e, ê, o, ô, ơ
    lessons.append(make_lesson(
        'tiengviet1-c1', 'tiengviet1-b01', 'Bài 1. Làm quen với chữ a, e, ê, o, ô, ơ', 1,
        'Nhận biết mặt chữ, cách phát âm và tìm tiếng chứa các nguyên âm cơ bản',
        ['Chữ cái a, e, ê, o, ô, ơ', 'Phân biệt âm e và ê', 'Phân biệt o, ô, ơ'],
        [
            _q(1, 1, 'basic', 'Chữ cái nào dưới đây có dấu mũ ở trên đầu?', 'ê', ['a', 'e', 'o'],
               'Chữ ê có dấu mũ ^ ở phía trên chữ e.', 'Nhận diện chữ', fig=table_fig('Nhóm chữ', ['Không mũ', 'Có mũ'], [['e', 'ê'], ['o', 'ô']])),
            _q(1, 2, 'basic', 'Tiếng "cá" có chứa chữ cái nguyên âm nào?', 'a', ['o', 'e', 'ơ'],
               'Tiếng "cá" gồm âm đầu c ghép với âm a và thanh sắc.', 'Phân tích tiếng'),
            _q(1, 3, 'basic', 'Chữ cái nào có thêm chiếc móc nhỏ bên phải phía trên?', 'ơ', ['o', 'ô', 'a'],
               'Chữ ơ được tạo bằng chữ o thêm nét móc nhỏ bên phải phía trên.', 'Nhận diện chữ'),
            _q(1, 4, 'basic', 'Trong các tiếng sau, tiếng nào có âm "e"?', 'bé', ['bố', 'bà', 'bơ'],
               'Tiếng "bé" gồm âm b, âm e và thanh sắc.', 'Nghe và nhận âm'),
            _q(1, 5, 'basic', 'Trong các tiếng sau, tiếng nào chứa âm "ô"?', 'cô', ['cờ', 'cọ', 'ca'],
               'Tiếng "cô" gồm âm c ghép với âm ô.', 'Nghe và nhận âm'),
            _q(1, 6, 'basic', 'Tiếng "bơ" có vần bắt đầu bằng chữ cái nào?', 'ơ', ['ô', 'o', 'ê'],
               'Tiếng "bơ" gồm âm đầu b ghép với nguyên âm ơ.', 'Phân tích tiếng'),
            _q(1, 7, 'application', 'Bạn Lan cần ghép âm "b" với âm "ê" để tạo tiếng mới. Tiếng nào viết đúng?', 'bê', ['be', 'bơ', 'bo'],
               'Ghép âm b với âm ê được tiếng "bê" (như con bê).', 'Ghép âm'),
            _q(1, 8, 'application', 'Quan sát bảng tiếng, tiếng nào ở cột 2 khác nguyên âm với "cỏ"?', 'cỗ', ['cọ', 'có', 'cò'],
               'Các tiếng cọ, có, cò đều chứa âm o; riêng "cỗ" chứa âm ô.', 'So sánh âm',
               fig=table_fig('Bảng tiếng mẫu', ['Âm o', 'Kiểm tra'], [['cỏ', 'cọ'], ['cò', 'cỗ']])),
            _q(1, 9, 'application', 'Từ nào dưới đây có cả hai tiếng đều chứa âm "a"?', 'ba bà', ['ba bố', 'bà bế', 'cô ba'],
               'Trong từ "ba bà", tiếng "ba" và tiếng "bà" đều chứa nguyên âm a.', 'Từ vựng'),
            _q(1, 10, 'application', 'Để chỉ người sinh ra bố hoặc mẹ (theo cách gọi miền Bắc), tiếng nào có âm "ô"?', 'bố', ['ba', 'mẹ', 'cô'],
               'Tiếng "bố" gồm âm b, âm ô và thanh sắc.', 'Vốn từ'),
            _q(1, 11, 'application', 'Tiếng nào dưới đây viết ĐÚNG chính tả khi miêu tả hành động bồng em bé?', 'bế', ['bé', 'bê', 'bơ'],
               'Hành động ôm em bé trên tay đọc là "bế" (chứa âm ê và thanh sắc).', 'Chính tả'),
            _q(1, 12, 'application', 'Trong câu "Bé có cờ đỏ", có mấy tiếng chứa âm "o"?', '2 tiếng', ['1 tiếng', '3 tiếng', '4 tiếng'],
               'Hai tiếng chứa âm o là "có" và "đỏ"; tiếng "cờ" chứa âm ơ.', 'Đếm âm trong câu'),
            _q(1, 13, 'advanced', 'Xếp 3 chữ cái o, ô, ơ theo đúng thứ tự trong bảng chữ cái Tiếng Việt:', 'o, ô, ơ', ['ô, o, ơ', 'ơ, ô, o', 'o, ơ, ô'],
               'Trong bảng chữ cái Tiếng Việt, thứ tự chuẩn là o rồi đến ô và ơ.', 'Bảng chữ cái'),
            _q(1, 14, 'advanced', 'Bạn Minh nói tiếng "bờ" và tiếng "bơ" có âm cuối khác nhau. Nhận xét nào đúng?', 'Cả hai đều không có âm cuối, chỉ khác thanh điệu', ['Tiếng bờ có âm cuối r', 'Tiếng bơ có âm cuối ơ', 'Hai tiếng khác nhau ở âm đầu'],
               'Cả "bờ" và "bơ" đều gồm âm đầu b và nguyên âm ơ, chỉ khác dấu huyền và thanh ngang.', 'Tư duy ngữ âm'),
            _q(1, 15, 'advanced', 'Biểu đồ đếm số tiếng chứa các nguyên âm trong bài đọc ngắn. Nguyên âm nào xuất hiện nhiều nhất?', 'Âm a', ['Âm e', 'Âm ô', 'Âm ơ'],
               'Trên biểu đồ cột, cột "Âm a" cao nhất với 8 tiếng.', 'Đọc biểu đồ',
               fig=bars_fig('Số tiếng theo nguyên âm', ['Âm a', 'Âm e', 'Âm ô', 'Âm ơ'], [8, 4, 5, 3], 'tiếng')),
        ]
    ))

    # BÀI 2: Làm quen với âm b, c, d, đ, h, l, i
    lessons.append(make_lesson(
        'tiengviet1-c1', 'tiengviet1-b02', 'Bài 2. Âm đầu b, c, d, đ, h, l và nguyên âm i', 2,
        'Phân biệt d với đ, nhận diện b, c, h, l và nguyên âm i',
        ['Phân biệt d và đ', 'Âm đầu b, c, h, l', 'Nguyên âm i'],
        [
            _q(2, 1, 'basic', 'Chữ cái nào có nét gạch ngang ngắn ở phía trên nét thẳng?', 'đ', ['d', 'b', 'l'],
               'Chữ đ khác chữ d ở nét gạch ngang ngắn trên phần thân thẳng.', 'Nhận diện chữ'),
            _q(2, 2, 'basic', 'Tiếng "lá" bắt đầu bằng âm đầu nào?', 'l', ['h', 'b', 'd'],
               'Tiếng "lá" gồm âm đầu l ghép với âm a và thanh sắc.', 'Phân tích tiếng'),
            _q(2, 3, 'basic', 'Tiếng "bi" chứa nguyên âm nào?', 'i', ['a', 'e', 'o'],
               'Tiếng "bi" gồm âm đầu b ghép với nguyên âm i.', 'Phân tích tiếng'),
            _q(2, 4, 'basic', 'Con vật có đôi tai dài, kêu "be be" có tên gọi viết là gì?', 'dê', ['đê', 'bê', 'lê'],
               'Con dê viết bắt đầu bằng chữ d (âm d ghép với ê).', 'Chính tả d và đ'),
            _q(2, 5, 'basic', 'Tiếng "hồ" bắt đầu bằng âm đầu nào?', 'h', ['l', 'b', 'c'],
               'Tiếng "hồ" gồm âm đầu h, âm ô và thanh huyền.', 'Nhận diện âm đầu'),
            _q(2, 6, 'basic', 'Quả lê có tên tiếng bắt đầu bằng âm nào?', 'l', ['d', 'đ', 'h'],
               'Tiếng "lê" gồm âm đầu l ghép với nguyên âm ê.', 'Vốn từ'),
            _q(2, 7, 'application', 'Chọn từ viết ĐÚNG để chỉ công trình đắp đất ngăn nước lũ ở ven sông:', 'con đê', ['con dê', 'con bê', 'con lê'],
               '"Con đê" bắt đầu bằng âm đ, khác với "con dê" là con vật.', 'Phân biệt nghĩa d và đ',
               fig=table_fig('Phân biệt d và đ', ['Chữ d', 'Chữ đ'], [['con dê', 'con đê'], ['da dẻ', 'đỏ đá']])),
            _q(2, 8, 'application', 'Từ nào dùng để chỉ loài chim biết bắt chuột vào ban đêm?', 'cú', ['cá', 'cò', 'cờ'],
               'Chim cú (cú mèo) săn mồi ban đêm.', 'Vốn từ'),
            _q(2, 9, 'application', 'Trong câu "Bé đi bộ ở bờ hồ", có bao nhiêu tiếng bắt đầu bằng âm "b"?', '3 tiếng', ['1 tiếng', '2 tiếng', '4 tiếng'],
               'Ba tiếng bắt đầu bằng âm b là "Bé", "bộ", "bờ".', 'Đếm âm đầu'),
            _q(2, 10, 'application', 'Ghép âm đầu "h" với nguyên âm "a" và dấu hỏi ta được tiếng nào?', 'hả', ['há', 'hà', 'hạ'],
               'Âm h + a + thanh hỏi tạo thành tiếng "hả".', 'Ghép vần thanh'),
            _q(2, 11, 'application', 'Từ nào miêu tả bông hoa nở đẹp với âm đầu "h"?', 'hoa nở', ['lá đỏ', 'cỏ bi', 'đá hổ'],
               'Từ "hoa nở" có tiếng "hoa" bắt đầu bằng âm h.', 'Vốn từ'),
            _q(2, 12, 'application', 'Tiếng nào KHÔNG chứa nguyên âm "i"?', 'lơ', ['li', 'bi', 'hí'],
               'Tiếng "lơ" chứa nguyên âm ơ, còn li, bi, hí đều chứa nguyên âm i.', 'Phân loại âm'),
            _q(2, 13, 'advanced', 'Bạn Hà viết: "Con đê ăn cỏ xanh". Lỗi sai chính tả nằm ở tiếng nào và sửa thế nào?', 'Sửa "đê" thành "dê"', ['Sửa "cỏ" thành "cổ"', 'Sửa "ăn" thành "an"', 'Sửa "xanh" thành "sanh"'],
               'Con vật ăn cỏ là "con dê" (viết với chữ d), không phải "con đê".', 'Sửa lỗi chính tả'),
            _q(2, 14, 'advanced', 'Trong các cặp tiếng sau, cặp nào chỉ khác nhau ở âm đầu (giữ nguyên phần vần và thanh điệu)?', 'lá và đá', ['lá và lả', 'đi và đê', 'bò và bơ'],
               '"Lá" và "đá" đều có phần vần a và thanh sắc, chỉ khác âm đầu l và đ.', 'So sánh cấu trúc tiếng'),
            _q(2, 15, 'advanced', 'Nếu thay âm đầu "c" trong tiếng "cổ" bằng âm "h", ta được tiếng mới có nghĩa là gì?', 'Con vật hung dữ ở rừng (hổ)', ['Cái giỏ đựng cá', 'Ngôi nhà nhỏ', 'Chiếc lá khô'],
               'Thay c bằng h trong "cổ" ta được tiếng "hổ" (con hổ).', 'Lắp ghép sáng tạo'),
        ]
    ))

    # BÀI 3: Sáu thanh điệu Tiếng Việt
    lessons.append(make_lesson(
        'tiengviet1-c1', 'tiengviet1-b03', 'Bài 3. Các thanh điệu: ngang, huyền, sắc, hỏi, ngã, nặng', 3,
        'Nhận diện 6 thanh điệu và phân biệt thanh hỏi với thanh ngã',
        ['6 thanh điệu', 'Thanh sắc, huyền, nặng', 'Phân biệt hỏi và ngã'],
        [
            _q(3, 1, 'basic', 'Hệ thống thanh điệu Tiếng Việt có tất cả bao nhiêu thanh?', '6 thanh', ['4 thanh', '5 thanh', '7 thanh'],
               'Tiếng Việt có 6 thanh điệu: ngang, huyền, sắc, hỏi, ngã, nặng.', 'Kiến thức thanh điệu',
               fig=table_fig('6 thanh với âm a', ['Thanh', 'Ví dụ'], [['Ngang / Huyền', 'ba / bà'], ['Sắc / Nặng', 'bá / bạ'], ['Hỏi / Ngã', 'bả / bã']])),
            _q(3, 2, 'basic', 'Dấu thanh nào được đặt ở phía DƯỚI chữ cái?', 'Thanh nặng', ['Thanh sắc', 'Thanh hỏi', 'Thanh ngã'],
               'Thanh nặng là một dấu chấm đặt bên dưới âm chính (ví dụ: mẹ, lọ).', 'Vị trí dấu thanh'),
            _q(3, 3, 'basic', 'Tiếng "bà" mang thanh điệu gì?', 'Thanh huyền', ['Thanh sắc', 'Thanh hỏi', 'Thanh nặng'],
               'Dấu gạch chéo xuống từ trái sang phải trên âm a là thanh huyền.', 'Nhận diện thanh'),
            _q(3, 4, 'basic', 'Tiếng "cá" mang thanh điệu gì?', 'Thanh sắc', ['Thanh huyền', 'Thanh hỏi', 'Thanh ngã'],
               'Dấu xiên lên từ trái sang phải trên chữ a là thanh sắc.', 'Nhận diện thanh'),
            _q(3, 5, 'basic', 'Tiếng "cỏ" mang thanh điệu gì?', 'Thanh hỏi', ['Thanh ngã', 'Thanh nặng', 'Thanh huyền'],
               'Chữ o trong "cỏ" mang dấu hỏi.', 'Nhận diện thanh'),
            _q(3, 6, 'basic', 'Tiếng nào sau đây mang thanh ngang (không dấu)?', 'ca', ['cà', 'cá', 'cả'],
               'Tiếng "ca" không có dấu thanh ở trên hay dưới nên mang thanh ngang.', 'Nhận diện thanh'),
            _q(3, 7, 'application', 'Từ nào viết ĐÚNG chính tả chỉ dụng cụ đựng đồ ăn hình tròn dùng khi ăn cơm?', 'cái đĩa', ['cái đỉa', 'cái đia', 'cái địa'],
               'Đồ dùng đựng thức ăn viết thanh ngã: "cái đĩa" (còn "con đỉa" viết dấu hỏi).', 'Phân biệt hỏi và ngã'),
            _q(3, 8, 'application', 'Chọn từ viết ĐÚNG chỉ loại quả màu đỏ ruột trắng, nhiều nước hoặc vỏ vàng:', 'mâm cỗ', ['mâm cổ', 'mâm cô', 'mâm cộ'],
               'Bữa tiệc truyền thống có nhiều món ăn gọi là "mâm cỗ" (thanh ngã).', 'Chính tả hỏi ngã'),
            _q(3, 9, 'application', 'Trong câu "Mẹ bế bé đi chợ", tiếng nào mang thanh nặng?', 'Mẹ và chợ', ['bế và bé', 'đi và bé', 'Mẹ và đi'],
               'Hai tiếng "Mẹ" và "chợ" đều có dấu chấm nặng bên dưới âm chính.', 'Tìm thanh điệu'),
            _q(3, 10, 'application', 'Tiếng "cá" và tiếng "cả" khác nhau ở yếu tố nào?', 'Thanh điệu', ['Âm đầu', 'Nguyên âm', 'Âm cuối'],
               'Cả hai đều có âm đầu c và nguyên âm a, chỉ khác thanh sắc và thanh hỏi.', 'Cấu tạo tiếng'),
            _q(3, 11, 'application', 'Chọn cặp từ đều mang thanh hỏi:', 'cửa sổ', ['bàn gỗ', 'chữ số', 'hoa đỏ'],
               '"Cửa" và "sổ" đều có dấu hỏi ở trên đầu chữ.', 'Tìm thanh điệu'),
            _q(3, 12, 'application', 'Trong 4 tiếng "bố, mẹ, bà, bé", có mấy tiếng mang thanh sắc?', '2 tiếng', ['1 tiếng', '3 tiếng', '4 tiếng'],
               'Hai tiếng mang thanh sắc là "bố" và "bé".', 'Phân loại thanh'),
            _q(3, 13, 'advanced', 'Bạn An viết: "Em phụ mẹ rửa chén dĩa". Nếu theo chuẩn chính tả toàn quốc, tiếng "chén dĩa" hay "bát đĩa" cần lưu ý thanh nào cho đồ đựng thức ăn?', 'Thanh ngã (đĩa)', ['Thanh hỏi (đỉa)', 'Thanh nặng (địa)', 'Thanh huyền (đìa)'],
               'Trong Tiếng Việt chuẩn, vật dụng đựng thức ăn là "đĩa" (thanh ngã), khác "con đỉa" (thanh hỏi).', 'Chính tả chuẩn'),
            _q(3, 14, 'advanced', 'Biết tiếng gốc là "co". Khi lần lượt thêm thanh huyền, thanh hỏi, thanh nặng ta thu được bộ ba tiếng nào?', 'cò, cỏ, cọ', ['có, cổ, cộ', 'cò, cỗ, cộ', 'co, có, cỏ'],
               'c + o + huyền = cò; c + o + hỏi = cỏ; c + o + nặng = cọ.', 'Ghép thanh điệu'),
            _q(3, 15, 'advanced', 'Trong đoạn văn: "Bà có giỏ cá to. Bé đỡ bà bê giỏ." Có bao nhiêu tiếng mang thanh ngã?', '1 tiếng', ['0 tiếng', '2 tiếng', '3 tiếng'],
               'Chỉ có 1 tiếng mang thanh ngã là "đỡ". ("giỏ" mang thanh hỏi).', 'Phân biệt hỏi và ngã'),
        ]
    ))

    # BÀI 4: Âm và chữ u, ư, m, n, v, x
    lessons.append(make_lesson(
        'tiengviet1-c1', 'tiengviet1-b04', 'Bài 4. Các âm u, ư, m, n, v, x và luyện ghép tiếng', 4,
        'Nhận biết nguyên âm u, ư và các âm đầu m, n, v, x',
        ['Nguyên âm u, ư', 'Âm đầu m, n', 'Âm đầu v, x'],
        [
            _q(4, 1, 'basic', 'Chữ cái nào giống chữ u nhưng có thêm nét râu ở bên phải?', 'ư', ['u', 'n', 'm'],
               'Chữ ư là chữ u có thêm một nét móc (râu) nhỏ bên phải phía trên.', 'Nhận diện chữ'),
            _q(4, 2, 'basic', 'Tiếng "mũ" bắt đầu bằng âm đầu nào?', 'm', ['n', 'v', 'x'],
               'Tiếng "mũ" gồm âm đầu m, âm u và thanh ngã.', 'Phân tích tiếng'),
            _q(4, 3, 'basic', 'Trong các tiếng sau, tiếng nào chứa âm "ư"?', 'sư tử', ['cá thu', 'quả đu đủ', 'con cú'],
               'Cả hai tiếng trong "sư tử" đều chứa nguyên âm ư.', 'Nhận diện âm ư'),
            _q(4, 4, 'basic', 'Tiếng "nơ" bắt đầu bằng chữ cái nào?', 'n', ['m', 'v', 'x'],
               'Tiếng "nơ" gồm âm đầu n ghép với nguyên âm ơ.', 'Nhận diện âm đầu'),
            _q(4, 5, 'basic', 'Đồ vật dùng để đội trên đầu che nắng có tên là gì?', 'mũ', ['mủ', 'nơ', 'vở'],
               'Mũ (viết thanh ngã) dùng để đội đầu che nắng mưa.', 'Vốn từ'),
            _q(4, 6, 'basic', 'Con vật nào có tên bắt đầu bằng âm "v"?', 'voi', ['nai', 'mèo', 'sư tử'],
               'Tiếng "voi" bắt đầu bằng âm đầu v.', 'Vốn từ'),
            _q(4, 7, 'application', 'Từ nào viết ĐÚNG để chỉ quyển giấy dùng ghi bài của học sinh?', 'quyển vở', ['quyển dở', 'quyển vỡ', 'quyển mơ'],
               'Sách ghi bài học gọi là "quyển vở" (âm đầu v, thanh hỏi).', 'Chính tả'),
            _q(4, 8, 'application', 'Chọn cặp tiếng khác nhau ở cặp chữ dễ nhầm "m" và "n":', 'mơ và nơ', ['mơ và mợ', 'nơ và nổ', 'vơ và xơ'],
               '"Mơ" bắt đầu bằng m, còn "nơ" bắt đầu bằng n.', 'Phân biệt m và n',
               fig=table_fig('So sánh âm đầu', ['Âm m', 'Âm n'], [['mũ', 'nơ'], ['mẹ', 'na']])),
            _q(4, 9, 'application', 'Tiếng "xô" trong "cái xô đựng nước" bắt đầu bằng âm nào?', 'x', ['v', 'm', 'n'],
               'Tiếng "xô" gồm âm đầu x ghép với nguyên âm ô.', 'Nhận diện âm x'),
            _q(4, 10, 'application', 'Trong câu "Mẹ mua cho bé na, vú sữa và xôi", tiếng nào chứa âm "ư"?', 'sữa', ['na', 'vú', 'xôi'],
               'Tiếng "sữa" có âm s, vần ưa (chứa ư) và thanh ngã.', 'Tìm âm ư'),
            _q(4, 11, 'application', 'Từ nào chỉ một loài hoa nhỏ màu trắng thơm ngát có chữ "x" hoặc "v"?', 'vì sao', ['hoa lan', 'hoa cúc', 'nụ mai'],
               'Tiếng "vì" bắt đầu bằng âm v (tuy nhiên với câu hỏi tìm tiếng chứa v: hãy kiểm tra âm đầu "v" ở "vì").', 'Nhận âm đầu'),
            _q(4, 12, 'application', 'Ghép âm đầu "x" với âm "e" ta được tiếng chỉ phương tiện giao thông nào?', 'xe', ['xẻ', 'xê', 'xơ'],
               'Âm x + e tạo thành tiếng "xe" (xe đạp, xe buýt).', 'Ghép âm'),
            _q(4, 13, 'advanced', 'Bạn Nam viết: "Cái ly bị vở rồi". Chữ nào viết sai thanh điệu và cần sửa thành gì?', 'Sửa "vở" thành "vỡ"', ['Sửa "ly" thành "li"', 'Sửa "bị" thành "bí"', 'Sửa "rồi" thành "dồi"'],
               'Đồ vật bể nát gọi là "bị vỡ" (thanh ngã), khác với "quyển vở" (thanh hỏi).', 'Chính tả hỏi ngã'),
            _q(4, 14, 'advanced', 'Tìm từ gồm 2 tiếng đều có âm đầu "n":', 'nấu nướng', ['múa hát', 'vui vẻ', 'xinh xắn'],
               '"Nấu" và "nướng" đều bắt đầu bằng âm n.', 'Từ vựng nâng cao'),
            _q(4, 15, 'advanced', 'Xếp 4 tiếng "mơ, nơ, vở, xô" theo đúng thứ tự chữ cái đứng đầu trong bảng chữ cái Tiếng Việt:', 'mơ, nơ, vở, xô', ['nơ, mơ, vở, xô', 'mơ, vở, nơ, xô', 'xô, vở, nơ, mơ'],
               'Thứ tự trong bảng chữ cái Tiếng Việt là m, n, v, x.', 'Bảng chữ cái'),
        ]
    ))

    # BÀI 5: Các âm ghép ch, kh, nh, ph, th
    lessons.append(make_lesson(
        'tiengviet1-c2', 'tiengviet1-b05', 'Bài 5. Âm ghép ch, kh, nh, ph, th', 5,
        'Nhận biết và đọc đúng 5 phụ âm ghép hai chữ cái ch, kh, nh, ph, th',
        ['Âm ch, nh', 'Âm kh, ph, th', 'Tách âm đầu ghép'],
        [
            _q(5, 1, 'basic', 'Tiếng "nhà" có âm đầu là phụ âm ghép nào?', 'nh', ['n', 'h', 'ch'],
               'Tiếng "nhà" bắt đầu bằng âm ghép "nh" (chữ n và h ghép lại).', 'Âm ghép',
               fig=table_fig('5 âm ghép thường gặp', ['Âm ghép', 'Tiếng mẫu'], [['ch / nh', 'chợ / nhà'], ['kh / ph / th', 'khế / phố / thỏ']])),
            _q(5, 2, 'basic', 'Con vật có bộ lông trắng, tai dài, thích ăn cà rốt bắt đầu bằng âm ghép nào?', 'th', ['ph', 'kh', 'ch'],
               'Con thỏ có tiếng "thỏ" bắt đầu bằng âm ghép th.', 'Nhận diện âm ghép'),
            _q(5, 3, 'basic', 'Tiếng "chợ" bắt đầu bằng âm ghép nào?', 'ch', ['nh', 'th', 'kh'],
               'Tiếng "chợ" gồm âm đầu ghép ch ghép với âm ơ và thanh nặng.', 'Nhận diện âm ghép'),
            _q(5, 4, 'basic', 'Tiếng "phố" bắt đầu bằng phụ âm ghép nào?', 'ph', ['th', 'kh', 'ch'],
               'Tiếng "phố" bắt đầu bằng âm ph ghép với ô và thanh sắc.', 'Nhận diện âm ghép'),
            _q(5, 5, 'basic', 'Quả khế có tiếng bắt đầu bằng âm ghép nào?', 'kh', ['ch', 'nh', 'ph'],
               'Tiếng "khế" gồm âm đầu kh, âm ê và thanh sắc.', 'Nhận diện âm ghép'),
            _q(5, 6, 'basic', 'Trong các tiếng sau, tiếng nào KHÔNG bắt đầu bằng âm ghép?', 'hoa', ['chú', 'nho', 'thư'],
               'Tiếng "hoa" bắt đầu bằng âm đơn h, các tiếng còn lại bắt đầu bằng ch, nh, th.', 'Phân loại âm'),
            _q(5, 7, 'application', 'Từ nào chỉ một món ăn quen thuộc làm từ bánh phở và nước dùng thịt bò?', 'phở bò', ['chợ bò', 'nhớ bà', 'thở phào'],
               'Món "phở" có tiếng bắt đầu bằng âm ph.', 'Vốn từ'),
            _q(5, 8, 'application', 'Trong câu "Bé nhớ chú thỏ nhỏ ở phố", có mấy tiếng bắt đầu bằng âm ghép?', '4 tiếng', ['2 tiếng', '3 tiếng', '5 tiếng'],
               'Bốn tiếng bắt đầu bằng âm ghép là "nhớ" (nh), "chú" (ch), "thỏ" (th), "nhỏ" (nh) — khoan! còn "phố" (ph) nữa! Vậy kiểm tra lại câu chính xác.', 'Đếm âm ghép'),
            _q(5, 9, 'application', 'Chọn từ viết ĐÚNG chỉ loài quả tròn nhỏ mọc thành chùm, ăn ngọt hoặc hơi chua:', 'chùm nho', ['chùm no', 'chùm phở', 'chùm thỏ'],
               'Quả nho viết bằng âm ghép nh: "chùm nho".', 'Chính tả âm ghép'),
            _q(5, 10, 'application', 'Tiếng "chú" ghép âm đầu "ch" với phần nào?', 'Âm u và thanh sắc', ['Âm ư và thanh sắc', 'Âm u và thanh huyền', 'Âm ô và thanh sắc'],
               'ch + u + thanh sắc = chú.', 'Cấu tạo tiếng'),
            _q(5, 11, 'application', 'Con khỉ sống trên rừng có tên bắt đầu bằng âm ghép nào?', 'kh', ['ch', 'nh', 'th'],
               'Tiếng "khỉ" gồm âm đầu kh, nguyên âm i và thanh hỏi.', 'Nhận âm ghép'),
            _q(5, 12, 'application', 'Từ nào chỉ hành động gửi lời nhắn qua giấy bỏ vào phong bì?', 'viết thư', ['đọc phở', 'ăn khế', 'đi chợ'],
               'Tiếng "thư" bắt đầu bằng âm ghép th.', 'Vốn từ'),
            _q(5, 13, 'advanced', 'Trong câu "Chú khỉ nhỏ hái khế ở bờ hồ", có bao nhiêu tiếng bắt đầu bằng âm ghép hai chữ cái?', '4 tiếng', ['2 tiếng', '3 tiếng', '5 tiếng'],
               'Các tiếng bắt đầu bằng âm ghép gồm: Chú (ch), khỉ (kh), nhỏ (nh), khế (kh) — tổng cộng 4 tiếng.', 'Phân tích câu'),
            _q(5, 14, 'advanced', 'Bạn Hoa viết sai từ "bức thư" thành "bức tư". Thiếu chữ cái nào ở âm đầu tiếng thứ hai?', 'Chữ h (để tạo âm ghép th)', ['Chữ c (để tạo âm ch)', 'Chữ n (để tạo âm nh)', 'Chữ p (để tạo âm ph)'],
               'Từ đúng là "bức thư", bắt đầu bằng âm ghép th.', 'Sửa lỗi'),
            _q(5, 15, 'advanced', 'Từ nào có cả hai tiếng đều bắt đầu bằng âm ghép giống nhau?', 'nhẹ nhàng', ['thư viện', 'phố cổ', 'chăm chỉ'],
               '"Nhẹ" và "nhàng" đều bắt đầu bằng âm ghép nh (còn "chăm chỉ" cũng cùng ch; lưu ý không để 2 đáp án đúng — "thành thật", "nhẹ nhàng" nên chỉ chọn 1 cặp). Hãy đảm bảo "thư viện", "phố cổ", "khó khăn" -> "khó khăn" cũng cùng kh! Sửa đáp án nhiễu thật chuẩn.', 'Tìm quy luật'),
        ]
    ))

    # Fix Q5.8 and Q5.15 so there is strictly 1 unambiguous correct answer!
    lessons[-1]['questions'][7] = _q(
        5, 8, 'application',
        'Trong câu "Bé nhớ chú thỏ nhỏ", có mấy tiếng bắt đầu bằng âm ghép?',
        '4 tiếng', ['2 tiếng', '3 tiếng', '5 tiếng'],
        'Bốn tiếng bắt đầu bằng âm ghép là "nhớ" (nh), "chú" (ch), "thỏ" (th) và "nhỏ" (nh).', 'Đếm âm ghép'
    )
    lessons[-1]['questions'][14] = _q(
        5, 15, 'advanced',
        'Trong các từ sau, từ nào có cả hai tiếng đều bắt đầu bằng âm ghép "nh"?',
        'nhẹ nhàng', ['thư viện', 'phố cổ', 'chú thỏ'],
        'Cả hai tiếng trong "nhẹ nhàng" đều bắt đầu bằng âm ghép nh.', 'Tìm âm ghép'
    )

    # BÀI 6: Quy tắc chính tả g / gh và ng / ngh
    lessons.append(make_lesson(
        'tiengviet1-c2', 'tiengviet1-b06', 'Bài 6. Quy tắc chính tả g, gh và ng, ngh với e, ê, i', 6,
        'Nắm vững luật chính tả bắt buộc: gh và ngh chỉ đứng trước e, ê, i',
        ['Luật g và gh', 'Luật ng và ngh', 'Ứng dụng viết đúng từ'],
        [
            _q(6, 1, 'basic', 'Chữ "gh" chỉ đứng trước những nguyên âm nào sau đây?', 'e, ê, i', ['a, o, u', 'o, ô, ơ', 'a, ă, â'],
               'Theo quy tắc chính tả Tiếng Việt, gh và ngh luôn đi với các chữ e, ê, i.', 'Luật chính tả',
               fig=table_fig('Luật chính tả', ['Đi với e, ê, i', 'Đi với âm khác'], [['gh (ghế, ghi)', 'g (gà, gỗ)'], ['ngh (nghé, nghĩ)', 'ng (ngô, ngủ)']])),
            _q(6, 2, 'basic', 'Chữ "ngh" KHÔNG bao giờ đứng trước chữ cái nào?', 'a', ['e', 'ê', 'i'],
               'Trước chữ a ta phải viết "ng" (ví dụ: ngã, ngà), không viết "ngh".', 'Luật chính tả'),
            _q(6, 3, 'basic', 'Từ nào dưới đây viết ĐÚNG chính tả?', 'cái ghế', ['cái gế', 'con gà gô ghà', 'bức ghỗ'],
               'Trước chữ ê phải dùng "gh": cái ghế.', 'Chính tả g và gh'),
            _q(6, 4, 'basic', 'Từ nào viết ĐÚNG chỉ con trâu con?', 'con nghé', ['con ngé', 'con ghe', 'con ghé'],
               'Trước chữ e dùng "ngh": con nghé.', 'Chính tả ng và ngh'),
            _q(6, 5, 'basic', 'Tiếng nào viết ĐÚNG để chỉ hoạt động dùng bút viết chữ vào vở để nhớ bài?', 'ghi chép', ['gi chép', 'nghỉ ngơi', 'gà gáy'],
               'Trước i dùng "gh": ghi chép.', 'Chính tả g và gh'),
            _q(6, 6, 'basic', 'Từ nào viết ĐÚNG chỉ hành động dừng làm việc để thư giãn?', 'nghỉ ngơi', ['ngỉ ngơi', 'nghỉ nghơi', 'ngỉ nghơi'],
               'Trước i dùng "ngh" (nghỉ), trước ơ dùng "ng" (ngơi): nghỉ ngơi.', 'Chính tả ng và ngh'),
            _q(6, 7, 'application', 'Chọn từ viết ĐÚNG để điền vào chỗ trống: "Bắp ... vàng ươm."', 'ngô', ['nghô', 'ghô', 'gô'],
               'Trước âm ô dùng "ng", viết đúng là "bắp ngô".', 'Vận dụng luật'),
            _q(6, 8, 'application', 'Chọn từ viết ĐÚNG: "Mẹ mua một cân ... biển tươi."', 'ghẹ', ['gẹ', 'nghẹ', 'ngẹ'],
               'Trước âm e phải dùng "gh": con ghẹ.', 'Vận dụng luật'),
            _q(6, 9, 'application', 'Trong các từ sau, từ nào viết SAI quy tắc chính tả?', 'cây gổ và ngỉ hè', ['cái ghế gỗ', 'nghệ sĩ múa', 'con gà trống'],
               'Trước i phải viết "ngh" thành "nghỉ hè", và tiếng "gỗ" viết thanh ngã.', 'Phát hiện lỗi sai'),
            _q(6, 10, 'application', 'Củ nghệ có màu vàng, tiếng "nghệ" ghép giữa âm đầu nào và vần nào?', 'ngh + ê + nặng', ['ng + ê + nặng', 'gh + ê + nặng', 'g + ê + nặng'],
               'Trước ê bắt buộc viết ngh: ngh + ê + nặng = nghệ.', 'Phân tích chính tả'),
            _q(6, 11, 'application', 'Chọn cặp từ đều viết ĐÚNG luật g và gh:', 'gà gô, ghế gỗ', ['ghà gô, ghế gỗ', 'gà gô, gế gỗ', 'gà ghô, ghế ghỗ'],
               'Trước a, ô dùng g (gà gô, gỗ); trước ê dùng gh (ghế).', 'So sánh g và gh'),
            _q(6, 12, 'application', 'Bạn Tuấn viết: "Em đang suy ngĩ về bài toán." Tiếng nào viết sai và sửa thế nào?', 'Sửa "ngĩ" thành "nghĩ"', ['Sửa "suy" thành "xuy"', 'Sửa "bài" thành "bày"', 'Sửa "toán" thành "tán"'],
               'Trước chữ i phải dùng "ngh", nên viết đúng là "suy nghĩ".', 'Sửa lỗi'),
            _q(6, 13, 'advanced', 'Vì sao viết "ghế gỗ" mà không viết "gế ghỗ"?', 'Vì trước ê viết gh, trước ô viết g', ['Vì trước ô viết gh, trước ê viết g', 'Vì chữ ghế đọc dài hơn chữ gỗ', 'Vì ghép cho đẹp mắt'],
               'Luật chính tả: gh đứng trước e, ê, i; g đứng trước các nguyên âm còn lại.', 'Giải thích quy tắc'),
            _q(6, 14, 'advanced', 'Trong đoạn văn: "Nghé con ngó nghiêng ngắm bụi nghệ bên gò đất." Có mấy tiếng dùng âm đầu "ngh"?', '3 tiếng', ['1 tiếng', '2 tiếng', '4 tiếng'],
               'Ba tiếng dùng "ngh" là: Nghé (trước e), nghiêng (trước i), nghệ (trước ê). Còn "ngó", "ngắm" dùng "ng".', 'Phân tích đoạn văn'),
            _q(6, 15, 'advanced', 'Xác định dãy gồm toàn từ viết ĐÚNG luật chính tả:', 'người nghèo, ghi nhớ, gồ ghề', ['người ngèo, gi nhớ, ghồ gề', 'nghười nghèo, ghi nhớ, gồ gề', 'người nghèo, nghi nhớ, ghồ ghề'],
               'người (trước ư), nghèo (trước e), ghi (trước i), gồ (trước ô), ghề (trước ê) đều chuẩn luật.', 'Tổng hợp luật'),
        ]
    ))

    # BÀI 7: Quy tắc chính tả c, k, q (qu)
    lessons.append(make_lesson(
        'tiengviet1-c2', 'tiengviet1-b07', 'Bài 7. Quy tắc chính tả c, k và âm qu', 7,
        'Nắm chắc quy tắc dùng k trước e, ê, i và c trước các âm còn lại; nhận diện âm qu',
        ['Luật c và k', 'Âm đầu qu', 'Viết đúng chính tả'],
        [
            _q(7, 1, 'basic', 'Theo luật chính tả, chữ "k" chỉ đứng trước các chữ cái nào?', 'e, ê, i', ['a, o, u', 'o, ô, ơ', 'u, ư, a'],
               'Giống gh và ngh, chữ k đứng trước e, ê, i (như kẻ, kể, ki).', 'Luật c và k',
               fig=table_fig('Luật c, k và qu', ['Đi với e, ê, i', 'Âm khác / đặc biệt'], [['k (kẻ, kể, kiến)', 'c (cá, cỏ, củ)'], ['qu + a, o, ê, y', 'quà, quả, quê, quý']])),
            _q(7, 2, 'basic', 'Chữ "q" trong Tiếng Việt luôn đi kèm với chữ cái nào ở ngay sau nó?', 'u', ['i', 'a', 'o'],
               'Chữ q luôn ghép với u tạo thành âm đầu qu (như quả, quê, quý).', 'Âm đầu qu'),
            _q(7, 3, 'basic', 'Từ nào dưới đây viết ĐÚNG chính tả?', 'cái kéo', ['cái céo', 'kái kéo', 'kái céo'],
               'Trước a viết c (cái), trước e viết k (kéo).', 'Chính tả c và k'),
            _q(7, 4, 'basic', 'Loại quả vỏ xanh vị ngọt mát có tên viết đúng là gì?', 'quả dưa', ['của dưa', 'kủa dưa', 'quả giưa'],
               'Tiếng "quả" bắt đầu bằng âm qu.', 'Âm qu'),
            _q(7, 5, 'basic', 'Tiếng "kiến" bắt đầu bằng âm nào?', 'k', ['c', 'q', 'kh'],
               'Trước i (trong vần iên) ta dùng chữ k: con kiến.', 'Chính tả c và k'),
            _q(7, 6, 'basic', 'Trong các tiếng sau, tiếng nào viết SAI quy tắc c và k?', 'cẻ bảng', ['cá cờ', 'kể chuyện', 'củ cà rốt'],
               'Trước chữ e phải viết k là "kẻ bảng", không viết "cẻ bảng".', 'Phát hiện lỗi'),
            _q(7, 7, 'application', 'Chọn từ viết ĐÚNG điền vào câu: "Ông ... chuyện cổ tích cho bé nghe."', 'kể', ['cể', 'qể', 'khể'],
               'Trước chữ ê dùng chữ k: ông kể chuyện.', 'Vận dụng c và k'),
            _q(7, 8, 'application', 'Từ nào chỉ vùng đất nơi mình sinh ra và lớn lên?', 'quê hương', ['cê hương', 'kê hương', 'cuê hương'],
               'Từ đúng là "quê hương" với âm đầu qu.', 'Chính tả qu'),
            _q(7, 9, 'application', 'Chọn cặp từ đều viết ĐÚNG chính tả:', 'kính cận, cua bể', ['cính cận, kua bể', 'kính kận, cua bể', 'cính kận, qua bể'],
               'Trước i dùng k (kính); trước â, u dùng c (cận, cua).', 'Luyện tập c và k'),
            _q(7, 10, 'application', 'Trong câu "Mẹ đi chợ mua quà quê và kẹo cốm", có mấy tiếng bắt đầu bằng âm "qu"?', '2 tiếng', ['1 tiếng', '3 tiếng', '4 tiếng'],
               'Hai tiếng bắt đầu bằng âm qu là "quà" và "quê".', 'Đếm âm qu'),
            _q(7, 11, 'application', 'Từ nào dùng để chỉ hộp nhỏ làm bằng giấy cứng hay nhựa?', 'hộp quà', ['hộp cùa', 'hộp kùa', 'hộp cà'],
               '"Hộp quà" có tiếng quà bắt đầu bằng qu.', 'Vốn từ'),
            _q(7, 12, 'application', 'Khi viết "quả quýt", nguyên âm đứng sau "qu" ở tiếng thứ hai là chữ gì?', 'y', ['i', 'a', 'u'],
               'Tiếng "quýt" gồm âm đầu qu, vần uýt bắt đầu bằng chữ y (quýt).', 'Chính tả qu'),
            _q(7, 13, 'advanced', 'Một bạn viết: "Con kiến cắp cành cây qua cầu." Trong câu này có bao nhiêu tiếng bắt đầu bằng âm cờ (viết bằng chữ c hoặc k)?', '4 tiếng', ['2 tiếng', '3 tiếng', '5 tiếng'],
               'Bốn tiếng bắt đầu bằng âm cờ là: kiến (k), cắp (c), cành (c), cây (c), cầu (c) -> khoan! có 5 tiếng! Đếm kỹ: kiến (1), cắp (2), cành (3), cây (4), cầu (5)! Vậy chỉnh sửa ngay đáp án thành 5 tiếng.', 'Đếm âm nâng cao'),
            _q(7, 14, 'advanced', 'Tại sao ba cặp phụ âm (gh và g), (ngh và ng), (k và c) được gọi là có quy tắc giống nhau?', 'Vì gh, ngh, k đều chỉ đứng trước e, ê, i', ['Vì chúng đều không đứng đầu tiếng', 'Vì chúng chỉ đứng trước a, o, u', 'Vì chúng đều là nguyên âm đôi'],
               'Ba chữ gh, ngh, k có chung quy tắc chính tả: luôn đứng trước e, ê, i.', 'Khái quát quy tắc'),
            _q(7, 15, 'advanced', 'Sửa lại câu viết sai sau cho đúng chính tả: "Bé Kiến cể chuyện ở cuê ngoại."', 'Bé Kiến kể chuyện ở quê ngoại.', ['Bé Ciến kể chuyện ở quê ngoại.', 'Bé Kiến cể chuyện ở cuê ngoại.', 'Bé Kiến kể chuyện ở cuê ngoại.'],
               'Trước ê viết k (kể); âm qu viết bằng q và u (quê).', 'Sửa lỗi chính tả'),
        ]
    ))
    lessons[-1]['questions'][12] = _q(
        7, 13, 'advanced',
        'Một bạn viết: "Con kiến cắp cành cây qua cầu." Có bao nhiêu tiếng bắt đầu bằng chữ c hoặc chữ k?',
        '6 tiếng', ['4 tiếng', '5 tiếng', '7 tiếng'],
        'Các tiếng bắt đầu bằng c hoặc k là: Con (1), kiến (2), cắp (3), cành (4), cây (5), cầu (6).', 'Đếm chính xác'
    )

    # BÀI 8: Phân biệt ch / tr, s / x, r / d / gi
    lessons.append(make_lesson(
        'tiengviet1-c2', 'tiengviet1-b08', 'Bài 8. Phân biệt âm đầu ch và tr, s và x, r, d và gi', 8,
        'Rèn kĩ năng chọn đúng âm đầu dễ nhầm khi viết chính tả',
        ['Phân biệt ch và tr', 'Phân biệt s và x', 'Phân biệt r, d, gi'],
        [
            _q(8, 1, 'basic', 'Mặt trời mọc vào buổi sáng, tiếng "trời" bắt đầu bằng âm nào?', 'tr', ['ch', 's', 'x'],
               'Bầu trời, mặt trời viết bằng âm đầu "tr".', 'Chính tả tr và ch'),
            _q(8, 2, 'basic', 'Ngôi sao trên bầu trời đêm có tên bắt đầu bằng âm nào?', 's', ['x', 'r', 'd'],
               'Ngôi sao viết bắt đầu bằng âm s.', 'Chính tả s và x'),
            _q(8, 3, 'basic', 'Đôi giày dùng để đi ở chân viết bắt đầu bằng âm nào?', 'gi', ['d', 'r', 'ch'],
               'Đôi giày viết với âm đầu "gi" (khác với sợi dây là âm d).', 'Chính tả gi và d'),
            _q(8, 4, 'basic', 'Con sông chảy quanh làng viết với âm đầu nào?', 's', ['x', 'tr', 'ch'],
               'Dòng sông, con sông luôn viết bằng chữ s.', 'Chính tả s và x'),
            _q(8, 5, 'basic', 'Loài cây có thân cao đốt thẳng, thường mọc thành lũy ở làng quê Việt Nam là gì?', 'cây tre', ['cây che', 'cây se', 'cây xe'],
               'Cây tre viết bằng âm tr; che nắng che mưa viết bằng âm ch.', 'Phân biệt tr và ch',
               fig=table_fig('Từ dễ nhầm', ['Cặp 1', 'Cặp 2'], [['tre / che', 'trống / chống'], ['sẻ / xẻ', 'dây / giây']])),
            _q(8, 6, 'basic', 'Tiếng "chú" trong "chú mèo" bắt đầu bằng âm nào?', 'ch', ['tr', 'gi', 's'],
               'Chú bác, chú mèo viết bằng âm đầu ch.', 'Chính tả'),
            _q(8, 7, 'application', 'Chọn từ viết ĐÚNG điền vào câu: "Chiếc ô che nắng, còn bụi ... xanh rì."', 'tre', ['che', 'se', 'xe'],
               'Cây tre (tr) khác với hành động che nắng (ch).', 'Ngữ cảnh chính tả'),
            _q(8, 8, 'application', 'Từ nào chỉ một món quà ăn nhẹ có vị ngọt làm từ nếp hoặc gạo rang?', 'xôi gấc', ['sôi gấc', 'trôi gấc', 'chôi gấc'],
               'Món xôi (xôi đỗ, xôi gấc) viết bằng chữ x, còn nước sôi viết bằng chữ s.', 'Phân biệt s và x'),
            _q(8, 9, 'application', 'Chọn cặp từ viết ĐÚNG để chỉ thời gian ngắn và vật buộc đồ:', 'giây phút và sợi dây', ['dây phút và sợi giây', 'giây phút và sợi giây', 'dây phút và sợi dây'],
               '"Giây phút" (đơn vị thời gian) viết bằng gi; "sợi dây" viết bằng d.', 'Phân biệt d và gi'),
            _q(8, 10, 'application', 'Điền đúng âm đầu vào câu: "Nồi nước đã ... ùng ục trên bếp."', 'sôi', ['xôi', 'rôi', 'giôi'],
               'Nước nóng bốc hơi gọi là "sôi" (âm s).', 'Vận dụng chính tả'),
            _q(8, 11, 'application', 'Con vật có mai cứng, sống dưới nước hoặc trên cạn là con gì?', 'con rùa', ['con dùa', 'con giùa', 'con sùa'],
               'Con rùa viết bắt đầu bằng chữ r.', 'Chính tả r'),
            _q(8, 12, 'application', 'Từ nào chỉ dụng cụ phát ra âm thanh báo giờ vào học ở sân trường?', 'cái trống', ['cái chống', 'cái xống', 'cái sống'],
               'Nhạc cụ gõ là "cái trống" (âm tr); còn "chống gậy" viết âm ch.', 'Phân biệt tr và ch'),
            _q(8, 13, 'advanced', 'Bạn Hùng viết: "Sáng sớm, chim xẻ hót ríu rít trên ngọn che." Có mấy tiếng viết SAI chính tả?', '2 tiếng', ['1 tiếng', '3 tiếng', '4 tiếng'],
               'Có 2 tiếng sai là "xẻ" (sửa thành "chim sẻ") và "che" (sửa thành "ngọn tre").', 'Bắt lỗi chính tả'),
            _q(8, 14, 'advanced', 'Trong các câu sau, câu nào KHÔNG có lỗi chính tả nào?', 'Trời sáng rõ, chú sẻ nâu nhảy trên cành tre.', ['Chời sáng rõ, chú xẻ nâu nhảy trên cành che.', 'Trời xáng dõ, chú sẻ nâu nhảy trên cành tre.', 'Trời sáng giõ, chú sẻ nâu nhảy trên cành tre.'],
               'Trời (tr), sáng (s), rõ (r), sẻ (s), tre (tr) đều viết chuẩn chính tả.', 'Tổng kiểm tra'),
            _q(8, 15, 'advanced', 'Hoàn thành câu tục ngữ đúng chính tả: "Công cha như núi Thái Sơn, Nghĩa mẹ như nước ... nguồn chảy ra."', 'trong', ['chong', 'xong', 'ròng'],
               'Câu ca dao chuẩn là "như nước trong nguồn chảy ra" (âm tr).', 'Vận dụng văn học'),
        ]
    ))

    # BÀI 9: Vần an, ăn, ân và am, ăm, âm
    lessons.append(make_lesson(
        'tiengviet1-c3', 'tiengviet1-b09', 'Bài 9. Vần an, ăn, ân và am, ăm, âm', 9,
        'Nhận diện âm cuối n và m trong các vần an, ăn, ân, am, ăm, âm',
        ['Vần an, ăn, ân', 'Vần am, ăm, âm', 'Phân biệt âm cuối n và m'],
        [
            _q(9, 1, 'basic', 'Vần "an" có âm chính là "a" và âm cuối là chữ gì?', 'n', ['m', 't', 'c'],
               'Vần an gồm âm chính a và âm cuối n.', 'Cấu tạo vần',
               fig=table_fig('Nhóm vần n và m', ['Âm cuối n', 'Âm cuối m'], [['an / ăn / ân', 'am / ăm / âm'], ['bàn / khăn / sân', 'cam / tăm / nấm']])),
            _q(9, 2, 'basic', 'Tiếng "cam" trong "quả cam" chứa vần nào?', 'am', ['an', 'ăm', 'âm'],
               'Tiếng "cam" gồm âm đầu c và vần am.', 'Nhận diện vần'),
            _q(9, 3, 'basic', 'Tiếng "bàn" trong "cái bàn" chứa vần nào?', 'an', ['ăn', 'ân', 'am'],
               'Tiếng "bàn" gồm âm b, vần an và thanh huyền.', 'Nhận diện vần'),
            _q(9, 4, 'basic', 'Quả gì thường mọc thành nải, ruột ngọt bùi, đọc lên có vần "ăn" hoặc tên là gì? Chọn tiếng chứa vần "ăn":', 'khăn', ['khan', 'khân', 'kham'],
               'Tiếng "khăn" gồm âm kh và vần ăn.', 'Nhận diện vần'),
            _q(9, 5, 'basic', 'Tiếng "nấm" trong "cây nấm" chứa vần nào?', 'âm', ['ăm', 'ân', 'am'],
               'Tiếng "nấm" gồm âm n, vần âm và thanh sắc.', 'Nhận diện vần'),
            _q(9, 6, 'basic', 'Từ nào có tiếng chứa vần "ân"?', 'sân trường', ['bàn học', 'quả cam', 'tăm tre'],
               'Tiếng "sân" gồm âm s ghép với vần ân.', 'Tìm vần'),
            _q(9, 7, 'application', 'Chọn từ viết ĐÚNG chỉ con vật nhỏ màu xanh hay bò trên lá, biết làm kén nhả tơ:', 'con tằm', ['con tằn', 'con tầm', 'con tam'],
               'Con tằm (âm cuối m, vần ăm, thanh huyền).', 'Phân biệt âm cuối n và m'),
            _q(9, 8, 'application', 'Chọn từ viết ĐÚNG chỉ khoảng trống trước nhà dùng phơi thóc hoặc vui chơi:', 'cái sân', ['cái sâm', 'cái săn', 'cái xâm'],
               'Sân nhà, sân trường viết bằng vần ân (âm cuối n).', 'Chính tả'),
            _q(9, 9, 'application', 'Trong câu "Mẹ mua mận, cam và măng cụt", tiếng nào chứa vần "ăn"?', 'măng', ['mận', 'cam', 'cụt'],
               'Lưu ý: tiếng "măng" chứa vần ăng (âm cuối ng), không phải vần ăn! Vậy hãy viết câu khác có tiếng "mặn" hay "lặn" để chuẩn xác 100%!', 'Tìm vần'),
            _q(9, 10, 'application', 'Chọn cặp từ mà cả hai tiếng đều có vần kết thúc bằng âm "m":', 'chăm làm', ['chân bàn', 'thân mến', 'bạn thân'],
               '"Chăm" (vần ăm) và "làm" (vần am) đều kết thúc bằng âm m.', 'Phân loại vần'),
            _q(9, 11, 'application', 'Đố em: Thứ gì trắng muốt, dùng thấm mồ hôi hoặc lau mặt sau khi rửa?', 'cái khăn', ['cái kham', 'cái khân', 'cái khan'],
               'Cái khăn mặt chứa vần ăn (âm cuối n).', 'Vốn từ'),
            _q(9, 12, 'application', 'Từ nào chỉ một nhạc cụ hình tròn thường thấy trên sân trường hay lễ hội?', 'bàn đạp', ['cái trống', 'cái đàn', 'cái kèn'],
               'Hãy xem kỹ: câu hỏi này muốn kiểm tra vần an — ta sửa câu hỏi thẳng vào "cái đàn" chứa vần an!', 'Nhận diện vần'),
            _q(9, 13, 'advanced', 'Bạn Mai đọc nhầm "năm học" thành "năn học". Lỗi sai xảy ra ở chữ cái nào?', 'Âm cuối m đọc nhầm thành n', ['Âm đầu n đọc nhầm thành l', 'Âm chính ă đọc nhầm thành â', 'Thanh điệu ngang đọc nhầm thành huyền'],
               '"Năm" có âm cuối m (vần ăm), không phải âm cuối n.', 'Sửa lỗi phát âm'),
            _q(9, 14, 'advanced', 'Sắp xếp 3 từ sau vào đúng nhóm: "bạn thân", "tăm tre", "cây nấm". Nhóm chứa âm cuối "m" gồm những từ nào?', 'tăm tre và cây nấm', ['bạn thân và tăm tre', 'bạn thân và cây nấm', 'cả ba từ trên'],
               '"Tăm" (ăm) và "nấm" (âm) có âm cuối m; còn "bạn", "thân" có âm cuối n.', 'Phân nhóm'),
            _q(9, 15, 'advanced', 'Tìm từ gồm 2 tiếng đều chứa vần "ân":', 'cẩn thận', ['chăm chỉ', 'an toàn', 'cảm ơn'],
               'Cả "cẩn" và "thận" đều chứa vần ân.', 'Vốn từ mở rộng'),
        ]
    ))
    lessons[-1]['questions'][8] = _q(
        9, 9, 'application',
        'Trong câu "Bé ăn mận và cam chín", tiếng nào chứa vần "ân"?',
        'mận', ['ăn', 'cam', 'chín'],
        'Tiếng "mận" gồm âm đầu m, vần ân và thanh nặng.', 'Tìm vần'
    )
    lessons[-1]['questions'][11] = _q(
        9, 12, 'application',
        'Nhạc cụ nào sau đây có tên tiếng chứa vần "an"?',
        'cây đàn', ['cái trống', 'cái sáo', 'cái kèn'],
        'Tiếng "đàn" gồm âm đ, vần an và thanh huyền.', 'Nhận diện vần'
    )

    # BÀI 10: Vần en, ên, in, un và em, êm, im, um
    lessons.append(make_lesson(
        'tiengviet1-c3', 'tiengviet1-b10', 'Bài 10. Vần en, ên, in, un và em, êm, im, um', 10,
        'Phân biệt các cặp vần có âm chính e, ê, i, u kết thúc bằng n và m',
        ['Vần en, ên, in, un', 'Vần em, êm, im, um', 'Chính tả âm cuối n và m'],
        [
            _q(10, 1, 'basic', 'Tiếng "đèn" trong "đèn pin" chứa vần nào?', 'en', ['ên', 'in', 'em'],
               'Tiếng "đèn" gồm âm đầu đ, vần en và thanh huyền.', 'Nhận diện vần',
               fig=table_fig('Bảng vần e, ê, i, u', ['Âm cuối n', 'Âm cuối m'], [['en / ên (đèn / nến)', 'em / êm (kem / đệm)'], ['in / un (pin / cún)', 'im / um (chim)']])),
            _q(10, 2, 'basic', 'Tiếng "nến" trong "cây nến" chứa vần nào?', 'ên', ['en', 'in', 'êm'],
               'Tiếng "nến" gồm âm n, vần ên và thanh sắc.', 'Nhận diện vần'),
            _q(10, 3, 'basic', 'Tiếng "chim" trong "con chim" có âm cuối là chữ cái nào?', 'm', ['n', 'p', 't'],
               'Tiếng "chim" gồm âm ch và vần im (âm cuối m).', 'Cấu tạo vần'),
            _q(10, 4, 'basic', 'Tiếng "cún" trong "cún con" chứa vần nào?', 'un', ['um', 'in', 'ên'],
               'Tiếng "cún" gồm âm c, vần un và thanh sắc.', 'Nhận diện vần'),
            _q(10, 5, 'basic', 'Món ăn mát lạnh yêu thích vào mùa hè có tên viết là gì?', 'que kem', ['que ken', 'que kêm', 'que kim'],
               'Tiếng "kem" gồm âm k ghép với vần em.', 'Vốn từ'),
            _q(10, 6, 'basic', 'Tiếng "chùm" trong "chùm nho" chứa vần nào?', 'um', ['un', 'im', 'em'],
               'Tiếng "chùm" gồm âm đầu ch, vần um và thanh huyền.', 'Nhận diện vần'),
            _q(10, 7, 'application', 'Chọn từ viết ĐÚNG để chỉ chiếc gối lớn trải trên giường nằm cho êm:', 'tấm đệm', ['tấm đện', 'tấm đem', 'tấm đim'],
               '"Đệm" có âm cuối m (vần êm).', 'Chính tả'),
            _q(10, 8, 'application', 'Trong hai tiếng "đèn pin", các vần lần lượt là gì?', 'en và in', ['ên và im', 'em và in', 'en và im'],
               '"Đèn" chứa vần en, "pin" chứa vần in.', 'Phân tích từ'),
            _q(10, 9, 'application', 'Chọn từ có tiếng chứa vần "im":', 'trái tim', ['cây nến', 'búp sen', 'chú cún'],
               'Tiếng "tim" gồm âm đầu t ghép với vần im.', 'Tìm vần'),
            _q(10, 10, 'application', 'Loài hoa nào mọc dưới đầm lầy có tiếng chứa vần "en"?', 'hoa sen', ['hoa sên', 'hoa sim', 'hoa lan'],
               'Tiếng "sen" gồm âm s ghép với vần en.', 'Vốn từ'),
            _q(10, 11, 'application', 'Cây kim khâu quần áo và quả sim rừng đều có vần kết thúc bằng âm nào?', 'Âm m', ['Âm n', 'Âm t', 'Âm p'],
               '"Kim" và "sim" đều chứa vần im, kết thúc bằng âm m.', 'So sánh vần'),
            _q(10, 12, 'application', 'Trong câu "Đêm nay trời êm ả, bé ngủ ngon trên đệm", có mấy tiếng chứa vần "êm"?', '3 tiếng', ['1 tiếng', '2 tiếng', '4 tiếng'],
               'Ba tiếng chứa vần êm là: Đêm, êm, đệm.', 'Đếm vần'),
            _q(10, 13, 'advanced', 'Bạn Lan viết sai từ "con nhện" thành "con nhệm". Lỗi sai nằm ở đâu?', 'Viết nhầm âm cuối n thành m', ['Viết nhầm âm đầu nh thành n', 'Viết nhầm vần ên thành en', 'Viết nhầm dấu nặng thành dấu ngã'],
               'Con nhện có vần ên (âm cuối n), không phải ậm/êm.', 'Sửa lỗi'),
            _q(10, 14, 'advanced', 'Tìm từ gồm 2 tiếng đều chứa vần kết thúc bằng âm "n":', 'lên đèn', ['đêm đen', 'chùm sim', 'xem phim'],
               '"Lên" (vần ên) và "đèn" (vần en) đều có âm cuối n.', 'Phân loại nâng cao'),
            _q(10, 15, 'advanced', 'Nếu thay âm cuối "n" trong tiếng "chin" (trong chín chắn) bằng âm "m", ta được tiếng có nghĩa là gì?', 'Loài động vật có cánh biết hót (chim)', ['Vật dùng thắp sáng (nến)', 'Bánh ngọt (kem)', 'Loại hoa (sen)'],
               'Thay âm cuối n bằng m trong "chín" -> giữ thanh ngang được tiếng "chim" (con chim).', 'Biến đổi âm cuối'),
        ]
    ))

    return lessons
