import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
if HERE not in sys.path:
    sys.path.insert(0, HERE)

from g123_core import make_q, make_lesson
from fig_helpers_g123 import table_fig, bars_fig, fig_clock, fig_traffic_sign


def _q(b: int, n: int, d: str, p: str, c: str, w: list[str], e: str, h: str, fig=None):
    return make_q(f'LS1-B{b:02d}-{n:03d}', d, p, c, w, e, 'Giáo dục lối sống 1', h, fig)


def get_lessons_part1() -> list[dict]:
    lessons = []

    # BÀI 1: Thức dậy đúng giờ & Gấp chăn gối gọn gàng
    lessons.append(make_lesson(
        'lssong1-c1', 'lssong1-b01', 'Bài 1. Thức dậy đúng giờ và Gấp chăn gối gọn gàng', 1,
        'Rèn thói quen thức dậy đúng giờ mỗi sáng không mè nheo và tự tay gấp chăn gối ngăn nắp',
        ['Thức dậy đúng giờ', 'Gấp chăn gối gọn gàng', 'Tự lập buổi sáng'],
        [
            _q(1, 1, 'basic', 'Buổi sáng khi đồng hồ báo thức reo hoặc bố mẹ gọi dậy đi học, bạn nhỏ lớp 1 có nếp sống tốt sẽ làm gì?', 'Ngồi dậy ngay, vươn vai tỉnh táo và tươi cười chào bố mẹ', ['Nằm lăn lộn khóc nhè xin ngủ thêm 1 tiếng nữa', 'Trùm kín chăn giả vờ chưa nghe thấy gì', 'Ném đồng hồ báo thức xuống sàn nhà'],
               'Thức dậy vui vẻ đúng giờ giúp em bắt đầu một ngày học tràn đầy năng lượng và không bị trễ học.', 'Nếp thức dậy buổi sáng',
               fig=fig_clock(6, 30, '6 giờ 30 sáng: Giờ thức dậy đi học')),
            _q(1, 2, 'basic', 'Ngay sau khi bước ra khỏi giường vào buổi sáng, việc đầu tiên em nên tự làm với chiếc giường của mình là gì?', 'Giũ phẳng ga giường, gấp gọn chiếc chăn và đặt gối ngay ngắn ở đầu giường', ['Để chăn gối tung tóe bừa bộn cho mẹ dọn', 'Đá chăn rơi xuống gầm giường', 'Nhảy lên nệm giẫm bẩn ga giường'],
               'Tự gấp chăn gối mất chưa tới 2 phút nhưng giúp căn phòng sạch đẹp và rèn tính tự lập từ nhỏ.', 'Gấp chăn gối ngay ngắn'),
            _q(1, 3, 'basic', 'Để buổi sáng thức dậy dễ dàng không bị mệt mỏi uể oải, buổi tối hôm trước em cần làm gì?', 'Đi ngủ đúng giờ từ 21 giờ tối và không xem ti-vi hay điện thoại muộn', ['Thức khuya tới 23 giờ xem hoạt hình', 'Chơi chạy nhảy ầm ĩ sát giờ đi ngủ', 'Uống nhiều nước ngọt có ga lúc 22 giờ'],
               'Ngủ sớm đủ giấc 9–10 tiếng mỗi đêm giúp cơ thể bé lớp 1 khỏe khoắn, sáng dậy tỉnh táo ngay.', 'Ngủ sớm để dậy đúng giờ'),
            _q(1, 4, 'basic', 'Khi gấp chiếc chăn mỏng mùa hè hoặc mùa thu, cách gấp nào giúp chăn vuông vắn gọn gàng nhất?', 'Trải phẳng chăn, gập đôi theo chiều dọc rồi gập làm đôi hoặc ba theo chiều ngang cho vuông góc', ['Vò tròn chiếc chăn thành cục nhét vào góc tường', 'Kéo lê chăn quét bụi dưới sàn nhà', 'Ném chăn lên nóc tủ quần áo'],
               'Vuốt phẳng và gấp theo nếp giúp chăn không bị nhăn nhúm và đặt rất đẹp trên đầu giường.', 'Cách gấp chăn vuông vắn'),
            _q(1, 5, 'basic', 'Vì sao chúng ta KHÔNG nên nằm nướng thêm trên giường sau khi chuông báo thức đã reo?', 'Dễ ngủ quên gây trễ giờ ăn sáng, vội vàng quên sách vở và muộn giờ vào lớp', ['Vì nằm nướng làm chiếc giường bị gãy ngay lập tức', 'Vì đồng hồ báo thức sẽ không bao giờ kêu lại', 'Vì buổi sáng trường học đóng cửa lúc 7 giờ'],
               'Dậy đúng giờ giúp em có đủ thời gian ăn sáng ngon miệng và chuẩn bị cặp sách thong thả.', 'Tác hại của ngủ nướng'),
            _q(1, 6, 'basic', 'Quan sát bảng các việc buổi sáng dưới đây, việc nào em hoàn toàn có thể TỰ LÀM lấy mà không cần nhờ bố mẹ làm hộ?', 'Tự gấp chăn gối, tự đánh răng rửa mặt và tự mặc đồng phục gọn gàng', ['Tự lái xe máy đưa mình đến cổng trường', 'Tự nấu canh nóng bằng bếp ga một mình', 'Tự cắm phích điện bàn là là áo'],
               'Những việc chăm sóc cá nhân nhẹ nhàng giúp em tự tin và đỡ đần được nhiều cho cha mẹ.', 'Việc buổi sáng tự làm',
               fig=table_fig('Nếp buổi sáng Bé Lớp 1', ['Thời gian', 'Việc bé tự làm'], [['6 giờ 30', 'Dậy, gấp chăn gối'], ['6 giờ 35', 'Đánh răng, rửa mặt'], ['6 giờ 45', 'Mặc đồng phục sạch'], ['6 giờ 55', 'Ăn sáng đủ chất']])),
            _q(1, 7, 'application', 'Bạn Bi vừa tỉnh dậy lúc 6 giờ 30 sáng thì thấy trời mùa đông hơi lạnh nên rất ngại chui ra khỏi chăn ấm. Em hãy bày cho Bi cách dậy nhẹ nhàng không bị lạnh nhé:', 'Nằm trong chăn co duỗi nhẹ tay chân 10 giây cho ấm người, khoác ngay chiếc áo ấm để sẵn cạnh gối rồi ngồi dậy', ['Chui sâu xuống chân giường ngủ luôn tới trưa', 'Tung hết chăn ra chạy chân trần ra sân gió lạnh', 'Khóc ầm lên bắt mẹ bế đi học luôn trên giường'],
               'Khởi động nhẹ trong chăn rồi khoác áo ấm ngay giúp cơ thể thích nghi nhiệt độ an toàn.', 'Mẹo dậy sớm mùa lạnh'),
            _q(1, 8, 'application', 'Sáng thứ Hai đầu tuần lớp 1A tổ chức thi đua "Bé tự lập buổi sáng". Trong 4 bạn dưới đây, bạn nào thực hiện ĐÚNG và ĐẸP nhất?', 'Bạn Na dậy lúc 6g30, tự gấp chăn vuông vắn, đặt gấu bông gọn góc giường rồi đi rửa mặt', ['Bạn Tí dậy đúng giờ nhưng vứt chăn xuống đất để đi chơi', 'Bạn Mít bắt bà ngoại 70 tuổi vào gấp chăn hộ', 'Bạn Sóc trễ giờ nên mặc áo trái chạy ra cửa'],
               'Gấp chăn gối gọn và xếp đồ dùng ngăn nắp thể hiện nếp sống văn minh đáng khen.', 'Gương bé tự lập'),
            _q(1, 9, 'application', 'Chiếc giường của bé Bo có 1 chiếc gối ngủ, 1 chiếc gối ôm và 1 chiếc chăn bông. Sau khi gấp chăn xong, Bo nên sắp xếp cả 3 món đồ này ở đâu trên giường?', 'Đặt sát ngay ngắn vào góc đầu giường: gối ngủ nằm dưới, gối ôm xếp cạnh và chăn gấp đặt gọn lên trên hoặc bên cạnh', ['Vứt gối ngủ xuống sàn, giữ mỗi gối ôm', 'Để mỗi thứ một góc giữa giường bừa bãi', 'Nhét gối ngủ vào cặp sách mang đi học'],
               'Xếp bộ chăn gối theo cụm gọn ở đầu giường giúp giường ngủ trông thoáng rộng và sạch sẽ.', 'Sắp xếp chăn gối đẹp'),
            _q(1, 10, 'application', 'Quan sát biểu đồ thời gian đi ngủ tối của 4 bạn lớp 1B. Bạn nào có thói quen đi ngủ hợp lí nhất để sáng hôm sau 6g30 dậy tỉnh táo học bài?', 'Bạn An (ngủ lúc 21 giờ, đủ khoảng 9,5 tiếng)', ['Bạn Bình (ngủ lúc 23 giờ)', 'Bạn Chi (ngủ lúc 24 giờ đêm)', 'Bạn Dũng (ngủ lúc 22 giờ 30)'],
               'Ngủ lúc 21 giờ đảm bảo trẻ 6–7 tuổi có hơn 9 tiếng ngủ sâu phát triển trí não và chiều cao.', 'Đọc biểu đồ giờ đi ngủ',
               fig=bars_fig('Giờ đi ngủ buổi tối (giờ)', ['An', 'Bình', 'Chi', 'Dũng'], [21, 23, 24, 22], 'giờ')),
            _q(1, 11, 'application', 'Hôm nay là sáng Chủ nhật được nghỉ học ở nhà. Bạn Lan thức dậy lúc 7 giờ sáng. Lan có nên gấp chăn gối gọn gàng không?', 'Có, vì gấp chăn gối là thói quen văn minh giữ phòng sạch đẹp mỗi ngày kể cả ngày nghỉ', ['Không, ngày Chủ nhật cứ để bừa bãi tới tối', 'Chủ nhật không cần gấp chăn vì tối lại ngủ tiếp', 'Chỉ gấp chăn khi cô giáo đến nhà thăm'],
               'Thói quen tốt được duy trì đều đặn mỗi ngày sẽ trở thành nếp sống tự nhiên suốt đời.', 'Duy trì thói quen ngày nghỉ'),
            _q(1, 12, 'application', 'Mỗi buổi sáng em mất 15 phút để gấp chăn, đánh răng rửa mặt và mặc đồng phục. Nếu mẹ dặn 7 giờ 00 phải ngồi vào bàn ăn sáng, em cần thức dậy muộn nhất lúc mấy giờ?', '6 giờ 45 phút sáng', ['7 giờ 15 phút sáng', '6 giờ 55 phút sáng', '7 giờ 00 sáng'],
               'Từ 6 giờ 45 đến 7 giờ 00 vừa tròn 15 phút giúp em vệ sinh cá nhân thong thả trước bữa sáng.', 'Tính giờ thức dậy hợp lí'),
            _q(1, 13, 'advanced', 'Vì sao các bác sĩ khuyên sau khi ngủ dậy nên mở cửa sổ thông thoáng và giũ nhẹ chăn một chút trước khi gấp lại gọn gàng?', 'Để hơi ẩm mồ hôi ban đêm bay thoát đi, tránh vi khuẩn nấm mốc trú ngụ giúp chăn gối luôn thơm sạch', ['Để bụi ngoài đường bay thật nhiều vào phòng', 'Để muỗi bay vào trong chăn ngủ', 'Để làm mất mùi thơm của phòng'],
               'Thoát ẩm và đón nắng sớm giúp chiếc giường luôn khô ráo, bảo vệ làn da và đường hô hấp.', 'Vệ sinh chăn gối khoa học'),
            _q(1, 14, 'advanced', 'Bạn Min muốn rèn thói quen không ngủ nướng trong 7 ngày liên tiếp. Công cụ nào dán ở đầu giường giúp Min hứng thú thực hiện nhất?', 'Lập bảng "Sao Chăm Chỉ" mỗi sáng dậy đúng giờ và gấp chăn xong sẽ tự dán 1 ngôi sao khen thưởng', ['Đặt 10 cái đồng hồ kêu inh ỏi sát tai làm giật mình', 'Nhờ anh trai tạt nước lạnh lên mặt', 'Nhịn ăn sáng mỗi ngày để nhớ giờ'],
               'Tự theo dõi bằng bảng ngôi sao khen thưởng tạo động lực tích cực và niềm vui tự giác.', 'Phương pháp tạo thói quen tốt'),
            _q(1, 15, 'advanced', 'Nhiều bạn nghĩ: "Chỉ cần học giỏi đọc viết hay là được, việc gấp chăn gối nhỏ xíu cứ để mẹ làm". Suy nghĩ đó chưa đúng ở điểm nào?', 'Rèn nếp tự lập từ việc nhỏ như gấp chăn giúp em gọn gàng, biết tự lo cho mình và yêu thương san sẻ việc nhà cùng mẹ', ['Vì mẹ không biết cách gấp chăn gối đẹp', 'Vì cô giáo chấm điểm Toán bằng cách kiểm tra chăn', 'Vì gấp chăn giúp em cao lên 10 xăng-ti-mét ngay'],
               'Nếp sống ngăn nắp bắt đầu từ chính chiếc giường của em mỗi sớm mai!', 'Ý nghĩa tính tự lập'),
        ]
    ))

    # BÀI 2: Đánh răng, rửa mặt & Giữ vệ sinh cá nhân buổi sáng
    lessons.append(make_lesson(
        'lssong1-c1', 'lssong1-b02', 'Bài 2. Đánh răng, rửa mặt và Giữ vệ sinh cá nhân', 2,
        'Biết quy trình đánh răng, rửa mặt đúng cách và giữ đầu tóc, móng tay, quần áo luôn sạch đẹp',
        ['Đánh răng đúng cách', 'Rửa mặt sạch sẽ', 'Vệ sinh cá nhân'],
        [
            _q(2, 1, 'basic', 'Mỗi ngày em cần đánh răng đều đặn ít nhất mấy lần và vào những thời điểm nào để hàm răng trắng khỏe không bị sâu?', 'Ít nhất 2 lần mỗi ngày: sau khi thức dậy buổi sáng và trước khi đi ngủ buổi tối', ['Chỉ cần đánh răng 1 lần vào sáng thứ Hai', 'Chỉ đánh răng khi nào thấy răng bị đau nhức', 'Đánh răng 10 lần liên tục rồi nghỉ cả tuần'],
               'Đánh răng sáng và tối giúp loại bỏ mảng bám vi khuẩn gây sâu răng và giữ hơi thở thơm tho.', 'Thời điểm đánh răng chuẩn'),
            _q(2, 2, 'basic', 'Khi đánh răng đúng cách, em nên chải bàn chải theo hướng nào để sạch kẽ răng mà không làm mòn chân răng, đau lợi?', 'Chải nhẹ nhàng theo chiều dọc (từ trên xuống dưới, từ dưới lên trên) hoặc xoay tròn nhỏ cả mặt ngoài, mặt trong và mặt nhai', ['Kéo ngang thật mạnh qua lại hết sức cho nhanh', 'Chỉ chải hai cái răng cửa phía trước cho có lệ', 'Nuốt hết bọt kem đánh răng vào bụng'],
               'Chải dọc hoặc xoay tròn nhẹ đủ thời gian 2 phút giúp làm sạch mọi kẽ răng và bảo vệ nướu.', 'Kĩ thuật chải răng đúng',
               fig=table_fig('Chăm sóc Răng & Mặt', ['Bộ phận', 'Cách giữ sạch đúng'], [['Răng miệng', 'Chải 2 phút sáng tối'], ['Khuôn mặt', 'Khăn riêng sạch sẽ'], ['Móng tay', 'Cắt ngắn mỗi tuần'], ['Đầu tóc', 'Gội sạch, chải gọn']])),
            _q(2, 3, 'basic', 'Khi rửa mặt buổi sáng, em cần dùng vật dụng gì để đảm bảo sạch sẽ và không lây bệnh về mắt?', 'Dùng nước sạch và chiếc khăn mặt riêng của cá nhân đã giặt sạch, phơi khô', ['Dùng chung khăn mặt ẩm ướt của cả 5 người trong nhà', 'Dùng tay bẩn dụi mắt rồi vẩy nước', 'Lấy vạt áo ngủ lau mặt cho nhanh'],
               'Dùng khăn mặt riêng sạch sẽ phòng tránh hiệu quả các bệnh đau mắt đỏ và vi khuẩn ngoài da.', 'Dùng khăn mặt riêng'),
            _q(2, 4, 'basic', 'Trình tự rửa mặt sạch sẽ đúng vệ sinh nên bắt đầu lau từ vùng nào trước để tránh bụi bẩn dính vào mắt?', 'Rửa tay sạch bằng xà phòng trước, dùng góc khăn sạch lau nhẹ hai khóe mắt trước, rồi lau mũi, miệng, trán, má và cổ', ['Lau gáy và cổ bẩn trước rồi mới lấy chỗ đó lau vào mắt', 'Chỉ vốc nước tạt vào cằm rồi thôi', 'Không rửa tay trước khi đưa tay lên mắt'],
               'Luôn rửa tay sạch và lau vùng mắt trước khi lau các vùng da khác trên khuôn mặt.', 'Thứ tự rửa mặt sạch'),
            _q(2, 5, 'basic', 'Với bàn chải đánh răng cá nhân, sau khi dùng xong em nên làm gì và bao lâu thì cần thay bàn chải mới?', 'Rửa sạch bọt dưới vòi nước, vẩy ráo nước, cắm dựng đầu bàn chải lên trên vào cốc khô và thay mới khoảng 3 tháng 1 lần', ['Vứt bàn chải ướt nằm lăn lóc trên bồn rửa', 'Dùng một chiếc bàn chải cũ tòe lông suốt 5 năm', 'Dùng chung bàn chải với em bé ở nhà'],
               'Cắm bàn chải hướng lên trên giúp đầu lông nhanh khô ráo, không bị ẩm mốc vi khuẩn.', 'Bảo quản bàn chải đúng'),
            _q(2, 6, 'basic', 'Ngoài đánh răng rửa mặt, học sinh lớp 1 cần giữ móng tay và mái tóc như thế nào khi đến trường?', 'Nhờ bố mẹ cắt móng tay ngắn gọn sạch sẽ mỗi tuần và chải tóc gọn gàng không che lấp mắt', ['Để móng tay dài nhọn chứa đầy đất đen', 'Để tóc bù xù xõa che kín hai mắt', 'Cắn móng tay mỗi khi ngồi học'],
               'Móng tay cắt ngắn tránh tích tụ trứng giun sán và không làm trầy xước bạn khi vui chơi.', 'Giữ móng tay và tóc gọn'),
            _q(2, 7, 'application', 'Bạn Tôm lấy lượng kem đánh răng dài bằng cả ngón tay chất đầy tràn bàn chải vì nghĩ càng nhiều bọt răng càng sạch. Em khuyên Tôm thế nào?', 'Chỉ cần lấy lượng kem đánh răng bằng hạt đậu nhỏ cho trẻ em là vừa đủ sạch, tránh nuốt nhiều bọt và tiết kiệm kem', ['Lấy càng nhiều kem càng tốt, hết nửa tuýp một lần', 'Không cần dùng kem đánh răng, chỉ súc nước muối đặc', 'Bôi kem đánh răng lên má cho thơm'],
               'Lượng kem cỡ hạt đậu (hoặc hạt ngô nhỏ) là tiêu chuẩn nha khoa an toàn cho học sinh tiểu học.', 'Lượng kem đánh răng phù hợp'),
            _q(2, 8, 'application', 'Bác sĩ nha khoa kiểm tra răng cho lớp 1C và ghi nhận nguyên nhân gây sâu răng ở các bạn nhỏ trong biểu đồ dưới đây. Nguyên nhân nào chiếm nhiều bạn mắc phải nhất?', 'Hay ăn bánh kẹo ngọt buổi tối và lười đánh răng trước khi ngủ (15 bạn)', ['Uống nhiều nước lọc (2 bạn)', 'Ăn nhiều rau xanh (3 bạn)', 'Đánh răng đủ 2 lần một ngày (1 bạn)'],
               'Đường từ bánh kẹo bám lại ban đêm tạo axit ăn mòn men răng rất nhanh nếu không chải răng.', 'Đọc biểu đồ nguyên nhân sâu răng',
               fig=bars_fig('Nguyên nhân sâu răng lớp 1C (bạn)', ['Quên chải tối', 'Ăn kẹo khuya', 'Uống nước ngọt', 'Ít súc miệng'], [15, 12, 9, 6], 'bạn')),
            _q(2, 9, 'application', 'Sau bữa ăn trưa bán trú ở trường, nếu chưa mang theo bàn chải đánh răng, các bạn học sinh lớp 1 nên làm gì để giữ răng miệng sạch thơm vào buổi chiều?', 'Súc miệng kĩ bằng nước lọc sạch hoặc nước muối loãng ngay sau khi ăn và uống một ngụm nước lọc', ['Ngậm thêm 2 viên kẹo dẻo cho thơm miệng', 'Để nguyên thức ăn giắt kẽ răng tới tối', 'Chùi răng bằng giấy nháp'],
               'Súc miệng bằng nước lọc sau bữa ăn trưa giúp cuốn trôi thức ăn thừa và trung hòa axit miệng.', 'Chăm sóc răng sau bữa trưa'),
            _q(2, 10, 'application', 'Sáng nay trời mưa vội đi học, bạn Cún phát hiện chiếc áo sơ mi đồng phục hôm qua quên thay vẫn còn dính vết tương cà ở ngực áo. Cún nên làm gì?', 'Nhanh chóng thay một chiếc áo đồng phục sạch sẽ khác để mặc đến lớp, giữ tác phong tươm tất', ['Mặc nguyên chiếc áo dính tương cà rồi lấy tay che lại', 'Lấy bút xóa tô trắng lên vết tương cà', 'Cởi áo ra mặc mỗi áo lót đi học'],
               'Quần áo sạch thơm giúp em tự tin giao tiếp và thể hiện sự tôn trọng thầy cô, bạn bè.', 'Trang phục sạch sẽ đi học'),
            _q(2, 11, 'application', 'Bạn Bống có thói quen lấy đầu lưỡi đẩy vào chỗ răng sữa vừa rụng hoặc mút ngón tay cái khi xem ti-vi. Thói quen này có tác hại gì?', 'Dễ làm răng vĩnh viễn mọc lệch bị hô, vẩu và đưa vi khuẩn từ tay vào miệng gây đau bụng', ['Giúp răng mới mọc nhanh hơn gấp đôi', 'Giúp ngón tay cái dài đẹp hơn', 'Giúp mắt nhìn ti-vi rõ hơn'],
               'Từ bỏ thói quen mút tay và đẩy lưỡi giúp bảo vệ hàm răng đều đẹp vĩnh viễn.', 'Tránh thói quen xấu cho răng'),
            _q(2, 12, 'application', 'Mẹ tặng em một chiếc đồng hồ cát 2 phút để cạnh bồn rửa mặt. Em sử dụng chiếc đồng hồ cát đó lúc đánh răng như thế nào?', 'Lật ngược đồng hồ cát khi bắt đầu chải răng và chải đều các mặt răng cho tới khi cát chảy hết đủ 2 phút mới súc miệng', ['Đợi cát chảy hết 2 phút rồi mới cầm bàn chải lên', 'Ngậm bọt đứng nhìn đồng hồ cát mà không chải', 'Đập vỡ đồng hồ cát lấy cát chơi'],
               'Đồng hồ cát 2 phút biến việc chải răng đúng thời lượng thành trò chơi thú vị mỗi ngày.', 'Ứng dụng đồng hồ cát 2 phút'),
            _q(2, 13, 'advanced', 'Vì sao khi đánh răng xong, chúng ta nên nhổ sạch bọt kem, súc miệng vừa đủ nhưng KHÔNG nên uống nước ngọt ngay sau đó?', 'Vì men răng vừa làm sạch nếu gặp đường và axit trong nước ngọt sẽ nhanh bị mòn yếu và bám màu trở lại', ['Vì nước ngọt sẽ làm bàn chải bị tan chảy', 'Vì kem đánh răng biến nước ngọt thành nước mặn', 'Vì uống nước ngọt làm rụng hết tóc'],
               'Sau khi chải răng buổi tối chỉ nên uống một chút nước lọc nếu khát rồi đi ngủ.', 'Bảo vệ men răng sau chải'),
            _q(2, 14, 'advanced', 'Có bạn hỏi: "Buổi sáng em ngủ dậy chưa ăn gì cả, miệng sạch lắm, có cần đánh răng buổi sáng không?". Em giải thích cho bạn thế nào?', 'Rất cần, vì ban đêm nước bọt tiết ít nên vi khuẩn sinh sôi mạnh trong miệng tạo mùi và mảng bám suốt 9 tiếng ngủ', ['Không cần, sáng dậy súc miệng bằng sữa là sạch', 'Chỉ cần đánh răng vào buổi trưa nắng', 'Đánh răng buổi sáng làm mất sức học'],
               'Chải răng buổi sáng loại bỏ lớp mảng bám vi khuẩn tích tụ suốt đêm giúp hơi thở thơm mát.', 'Giải thích tầm quan trọng chải sáng'),
            _q(2, 15, 'advanced', 'Nếu lớp em tổ chức góc "Kĩ năng Tự chăm sóc Bản thân", bộ 4 món đồ vệ sinh cá nhân bắt buộc mỗi bạn phải có riêng ở nhà (không dùng chung với ai) gồm những gì?', 'Bàn chải đánh răng, khăn mặt, lược chải đầu cá nhân và cốc uống nước riêng', ['Cặp sách, hộp bút, thước kẻ và tẩy', 'Quả bóng đá, vợt cầu lông, dây nhảy và bi ve', 'Bát ăn cơm, đũa và thìa dùng chung cả nhà'],
               'Dùng riêng bàn chải, khăn mặt, lược và cốc cá nhân là hàng rào bảo vệ sức khỏe đơn giản nhất.', '4 món đồ vệ sinh riêng'),
        ]
    ))

    # BÀI 3: Ngồi học ngay ngắn & Chuẩn bị góc học tập
    lessons.append(make_lesson(
        'lssong1-c1', 'lssong1-b03', 'Bài 3. Ngồi học ngay ngắn và Chuẩn bị góc học tập', 3,
        'Thực hành tư thế ngồi viết, đọc sách đúng cách để phòng cận thị, cong vẹo cột sống và xếp góc học tập gọn đẹp',
        ['Tư thế ngồi học đúng', 'Phòng tránh cận thị', 'Góc học tập ngăn nắp'],
        [
            _q(3, 1, 'basic', 'Khoảng cách chuẩn an toàn từ đôi mắt của em đến mặt trang sách, vở viết khi ngồi học bài là bao nhiêu?', 'Khoảng 25 đến 30 xăng-ti-mét (tương đương độ dài một gang tay lớn cộng thêm chút nữa)', ['Cúi sát mặt cách vở chỉ 5 xăng-ti-mét', 'Đặt vở ra xa tận 2 mét rồi nheo mắt nhìn', 'Áp sát má xuống mặt bàn viết'],
               'Giữ khoảng cách 25–30 cm giúp mắt điều tiết tự nhiên, phòng ngừa hiệu quả tật cận thị học đường.', 'Khoảng cách mắt và vở',
               fig=table_fig('Tư thế Ngồi học Chuẩn', ['Bộ phận', 'Yêu cầu đúng'], [['Lưng', 'Thẳng, không tì ngực'], ['Mắt cách vở', '25 đến 30 cm'], ['Hai chân', 'Chạm đất song song'], ['Ánh sáng', 'Chiếu từ phía trái']])),
            _q(3, 2, 'basic', 'Khi ngồi học trên ghế ở lớp cũng như ở nhà, phần lưng và ngực của em cần giữ ở tư thế nào?', 'Lưng thẳng tự nhiên, hai vai cân bằng, ngực không tì đè vào cạnh bàn và đầu hơi cúi nhẹ', ['Gù cong lưng xuống như con tôm', 'Nằm bò dài cả bụng lên mặt bàn', 'Ngồi nghiêng vẹo hẳn sang một bên tay ghế'],
               'Lưng thẳng và không tì ngực vào cạnh bàn giúp cột sống phát triển thẳng đẹp và hít thở sâu.', 'Tư thế lưng thẳng'),
            _q(3, 3, 'basic', 'Với học sinh viết bằng tay phải, đèn học để bàn nên đặt ở phía bên nào để bóng bàn tay không che mất chữ đang viết?', 'Đặt ở phía bên TRÁI bàn học (ngược phía với tay cầm bút)', ['Đặt ngay sát phía tay PHẢI đang cầm bút', 'Đặt dưới gầm bàn cho đỡ chói', 'Tắt hết đèn ngồi học trong bóng tối'],
               'Ánh sáng chiếu từ bên trái sang giúp trang vở sáng rõ đều mà không bị tay phải hắt bóng tối lên dòng chữ.', 'Vị trí đặt đèn học'),
            _q(3, 4, 'basic', 'Cách đặt hai bàn chân đúng khi ngồi ghế học tập chuẩn chiều cao là gì?', 'Hai bàn chân đặt song song chạm phẳng lên mặt sàn nhà (hoặc bệ gác chân vững chắc)', ['Co hai chân ngồi xếp bằng lên mặt ghế', 'Vắt chéo hai chân đung đưa suốt tiết học', 'Kê một chân lên bàn học'],
               'Hai chân chạm phẳng mặt sàn tạo điểm tựa vững chắc giúp xương sống và hông giữ đúng trục.', 'Vị trí hai bàn chân'),
            _q(3, 5, 'basic', 'Trên mặt bàn góc học tập ở nhà, em nên sắp xếp sách vở và đồ dùng học tập như thế nào?', 'Sắp xếp gọn gàng theo giá sách, cốc cắm bút; chỉ để trên bàn sách vở và dụng cụ đang dùng cho môn học đó', ['Chất đầy đồ chơi xếp hình, ô tô, gấu bông khắp mặt bàn', 'Vứt vở nháp nhàu nát ngập trên mặt bàn', 'Để cốc nước đầy sát mép vở dễ đổ ướt'],
               'Bàn học gọn gàng thoáng đãng giúp đầu óc tập trung nhanh và không làm mất đồ dùng.', 'Sắp xếp góc học tập'),
            _q(3, 6, 'basic', 'Sau khi kết thúc buổi học ở nhà vào buổi tối, em cần làm gì với chiếc cặp sách cho ngày hôm sau?', 'Kiểm tra thời khóa biểu ngày mai, xếp đủ sách vở, hộp bút vào cặp gọn gàng rồi mới đi ngủ', ['Vứt cặp ngoài phòng khách, sáng hôm sau mới tìm', 'Nhét tất cả 15 quyển sách cả tuần vào cặp cho nặng vai', 'Gập cong mép sách nhét vội vào cặp'],
               'Soạn cặp từ tối hôm trước giúp sáng đi học không bao giờ quên vở hay mang thừa quá nặng.', 'Soạn cặp theo thời khóa biểu'),
            _q(3, 7, 'application', 'Bạn Tùng có thói quen nằm sấp trên giường hoặc trên thảm phòng khách để tô màu và đọc truyện tranh suốt 1 tiếng mỗi tối. Thói quen này gây hại gì cho cơ thể Tùng?', 'Gây mỏi cổ vai gáy, dễ cong vẹo cột sống và làm mắt phải nhìn quá gần dẫn tới suy giảm thị lực nhanh', ['Giúp lưng khỏe mạnh dẻo dai hơn', 'Giúp đọc chữ nhanh gấp đôi', 'Giúp mắt nhìn xa tốt hơn'],
               'Luôn ngồi vào bàn ghế đủ ánh sáng khi đọc sách và vẽ tranh, tuyệt đối tránh nằm sấp đọc sách.', 'Tác hại nằm sấp đọc sách'),
            _q(3, 8, 'application', 'Một chiếc bàn học cho bé lớp 1 có thể đặt gần cửa sổ ban ngày. Hướng ngồi quay mặt hay đặt cạnh cửa sổ thế nào giúp mắt dễ chịu nhất?', 'Bàn kê vuông góc với cửa sổ sao cho ánh sáng tự nhiên chiếu từ phía bên trái vào trang vở, không bị nắng gắt rọi thẳng mắt', ['Ngồi quay lưng che kín ánh sáng cửa sổ', 'Ngồi nhìn thẳng vào mặt trời chói chang qua cửa sổ', 'Đóng kín rèm tối om rồi bật đèn pin'],
               'Ánh sáng tự nhiên dịu nhẹ chiếu từ bên trái là điều kiện tuyệt vời nhất bảo vệ đôi mắt.', 'Ánh sáng tự nhiên tại góc học tập'),
            _q(3, 9, 'application', 'Cứ sau mỗi 25–30 phút ngồi học bài chăm chỉ ở nhà, em nên cho đôi mắt nghỉ ngơi như thế nào trong vài phút?', 'Đứng dậy vươn vai, nhìn ra xa khoảng 5–6 mét (ngắm cây xanh ngoài cửa sổ) khoảng 1–2 phút cho mắt thư giãn', ['Lấy điện thoại ra chơi trò chơi nhìn sát màn hình 15 phút', 'Dụi mạnh hai tay vào mắt cho đỡ mỏi', 'Nằm ngủ luôn trên bàn học'],
               'Nhìn ra khoảng xanh ở xa giúp cơ mắt được thả lỏng hoàn toàn sau thời gian tập trung nhìn gần.', 'Cách thư giãn mắt khi học'),
            _q(3, 10, 'application', 'Khám sức khỏe đầu năm ở 4 lớp khối 1 ghi nhận số bạn có thói quen ngồi học sai tư thế (cúi sát mặt xuống bàn) như biểu đồ. Tổng số bạn cần chỉnh sửa tư thế ở cả 4 lớp là bao nhiêu?', '24 bạn (7 + 5 + 8 + 4 = 24 bạn)', ['20 bạn', '22 bạn', '26 bạn'],
               '7 + 5 + 8 + 4 = 24 bạn. Các bạn cần ngồi thẳng lưng và giữ khoảng cách 25–30 cm ngay nhé!', 'Đọc biểu đồ tư thế học',
               fig=bars_fig('Số bạn hay cúi sát vở (bạn)', ['Lớp 1A', 'Lớp 1B', 'Lớp 1C', 'Lớp 1D'], [7, 5, 8, 4], 'bạn')),
            _q(3, 11, 'application', 'Bạn Hà viết bằng tay TRÁI. Để tay trái viết không tự che bóng lên chữ của mình, đèn học trên bàn của Hà nên đặt ở phía bên nào?', 'Đặt ở phía bên PHẢI bàn học của Hà', ['Đặt ở phía bên TRÁI bàn học giống bạn viết tay phải', 'Đặt phía sau lưng Hà', 'Không cần dùng đèn'],
               'Nguyên tắc vàng: đặt đèn ngược phía tay cầm bút! Bạn thuận tay trái đặt đèn bên phải là thông minh nhất.', 'Vị trí đèn cho bạn thuận tay trái'),
            _q(3, 12, 'application', 'Khi ngồi ghế ở nhà, em thấy chân mình bị lơ lửng không chạm đất và mặt bàn cao gần sát cằm em. Cách khắc phục nhanh và an toàn nhất là gì?', 'Nhờ bố mẹ chỉnh lại độ cao ghế phù hợp, hoặc kê thêm chiếc ghế đẩu phẳng vững dưới chân và đệm ngồi chắc chắn', ['Cứ rướn cổ viết mặc kệ đau vai', 'Chuyển sang quỳ gối lên mặt ghế', 'Ngồi xuống sàn nhà rồi đặt vở lên ghế'],
               'Bàn ghế vừa tầm vóc (cẳng tay đặt ngang mặt bàn thoải mái, chân chạm đất) rất quan trọng với trẻ đang lớn.', 'Điều chỉnh bàn ghế vừa tầm'),
            _q(3, 13, 'advanced', 'Cách cầm bút đúng chuẩn lớp 1 (bằng 3 ngón tay: cái, trỏ, giữa) giúp nét chữ đẹp và cổ tay không bị mỏi, đồng thời đầu ngón tay cách đầu ngòi bút khoảng bao nhiêu?', 'Cách đầu ngòi bút khoảng 2,5 xăng-ti-mét (khoảng một đốt ngón tay rưỡi)', ['Cầm sát tịt ngay đầu ngòi bút dính hết mực vào tay', 'Cầm tuốt lên tận phần đuôi bút trên cùng', 'Nắm chặt cả 5 ngón tay như cầm nắm đấm'],
               'Cầm bút bằng 3 ngón tay cách ngòi 2,5 cm giúp mắt nhìn rõ nét chữ đang viết và cổ tay di chuyển linh hoạt.', 'Kĩ thuật cầm bút chuẩn'),
            _q(3, 14, 'advanced', 'Vì sao các thầy cô thường dặn khi tập viết vở ô li, quyển vở nên đặt hơi nghiêng nhẹ khoảng 15 độ (trên nghiêng sang phải với người viết tay phải) thay vì đặt thẳng đứng cứng nhắc?', 'Để thuận theo chiều chuyển động tự nhiên của cánh tay phải khi đưa nét chữ từ trái sang phải, tránh mỏi vai', ['Để làm rách gáy quyển vở', 'Để viết chữ bị đổ ngược sang trái', 'Để che mất lề vở'],
               'Đặt vở nghiêng nhẹ tự nhiên theo hướng cánh tay giúp dòng chữ thẳng đều và tay lướt rất nhẹ.', 'Tư thế đặt vở khoa học'),
            _q(3, 15, 'advanced', 'Nếu phải thiết kế "Góc học tập 3 KHÔNG" cho học sinh lớp 1, theo em 3 điều "KHÔNG" đó là gì?', 'Không đồ chơi gây mất tập trung trên mặt bàn – Không ánh sáng yếu hoặc rọi thẳng mắt – Không ngồi gù lưng sát vở', ['Không sách vở – Không bút viết – Không đèn học', 'Không ghế ngồi – Không bảng tên – Không thước kẻ', 'Không uống nước – Không mở cửa – Không nghỉ giải lao'],
               'Góc học tập 3 KHÔNG giúp bảo vệ cột sống, đôi mắt và tăng tối đa khả năng tập trung!', 'Mô hình Góc học tập 3 KHÔNG'),
        ]
    ))

    # BÀI 4: Rửa tay sạch trước khi ăn & Sau khi đi vệ sinh
    lessons.append(make_lesson(
        'lssong1-c2', 'lssong1-b04', 'Bài 4. Rửa tay sạch trước khi ăn và sau khi đi vệ sinh', 4,
        'Nhận biết các thời điểm vàng cần rửa tay với xà phòng và thực hiện đúng 6 bước rửa tay sạch khuẩn',
        ['6 bước rửa tay', 'Thời điểm rửa tay', 'Phòng bệnh tiêu hóa'],
        [
            _q(4, 1, 'basic', 'Những thời điểm BẮT BUỘC học sinh lớp 1 phải rửa tay sạch bằng xà phòng và nước sạch là khi nào?', 'Trước khi ăn uống, sau khi đi vệ sinh, sau khi chơi đồ chơi hay vuốt ve vật nuôi và khi tay bị bẩn', ['Chỉ cần rửa tay vào ngày Tết', 'Chỉ rửa tay khi nào thấy tay dính mực đen', 'Không cần rửa tay nếu nhìn bằng mắt thấy tay trắng'],
               'Vi khuẩn và trứng giun vô hình bám trên tay sẽ xâm nhập cơ thể nếu ta không rửa tay bằng xà phòng.', 'Các thời điểm vàng rửa tay',
               fig=table_fig('6 Bước Rửa tay Chuẩn', ['Bước', 'Động tác rửa tay'], [['Bước 1', 'Xoa hai lòng bàn tay'], ['Bước 2', 'Chà mu và kẽ ngoài'], ['Bước 3', 'Miết sạch kẽ trong'], ['Bước 4-6', 'Mặt ngoài, ngón cái']])),
            _q(4, 2, 'basic', 'Rửa tay đúng quy trình chuẩn của Bộ Y tế gồm có mấy bước và mất tối thiểu khoảng bao nhiêu giây xoa xà phòng?', 'Gồm 6 bước chuẩn, chà xà phòng kĩ tối thiểu 20 đến 30 giây trước khi tráng sạch', ['Chỉ cần 1 bước nhúng nhanh đầu ngón tay vào nước 2 giây', 'Gồm 2 bước vẩy nước lên quần áo', 'Phải rửa mất đúng 15 phút đồng hồ'],
               '20–30 giây chà đủ 6 bước (bằng hát hai lần bài Chúc mừng sinh nhật) đủ để đánh bay hầu hết vi khuẩn!', 'Quy trình 6 bước rửa tay'),
            _q(4, 3, 'basic', 'Nếu chỉ xối qua nước lã mà KHÔNG dùng xà phòng (hoặc nước rửa tay), đôi tay có thực sự sạch hết vi khuẩn và dầu mỡ không?', 'Không, vì xà phòng mới tạo bọt hòa tan chất nhờn và cuốn trôi vi khuẩn, virus bám chặt trên da', ['Có, nước lã lạnh là sạch tuyệt đối mọi thứ', 'Có, chỉ cần lau tay vào giấy báo là hết khuẩn', 'Có, nếu thổi thật mạnh vào lòng bàn tay'],
               'Xà phòng là "chiến binh" phá vỡ lớp màng chất béo của vi khuẩn giúp dòng nước cuốn sạch chúng đi.', 'Vai trò của xà phòng'),
            _q(4, 4, 'basic', 'Trong 6 bước rửa tay, nhiều bạn nhỏ thường hay bỏ sót bước nào nhất dù ngón tay cái và đầu ngón tay lại hay chạm vào thức ăn nhiều nhất?', 'Bước chà xoay ngón tay cái và chụm 5 đầu ngón tay xoay vào lòng bàn tay kia (bước 5 và 6)', ['Bước xối nước làm ướt tay', 'Bước lấy khăn lau khô tay', 'Bước mở vòi nước'],
               'Chà kĩ ngón cái và đầu móng tay đảm bảo không còn bụi bẩn giấu dưới kẽ móng.', 'Vùng dễ bỏ sót khi rửa tay'),
            _q(4, 5, 'basic', 'Sau khi rửa tay sạch bọt xà phòng dưới vòi nước chảy, em nên lau khô tay bằng gì để tay không bị nhiễm bẩn lại?', 'Lau bằng khăn sạch khô hoặc giấy lau tay sạch dùng một lần', ['Chùi thẳng tay ướt lên quần đùi đang mặc', 'Vẩy nước tung tóe vào mặt bạn đứng cạnh', 'Chạm tay vào tay nắm cửa nhà vệ sinh rồi đi ăn bánh ngay'],
               'Tay ướt rất dễ bám lại vi khuẩn; hãy lau khô bằng khăn sạch và dùng khăn hoặc khuỷu tay đóng vòi nước nếu cần.', 'Lau khô tay sạch sau khi rửa'),
            _q(4, 6, 'basic', 'Nếu ăn bánh kẹo hay hoa quả bằng tay bẩn chưa rửa xà phòng sau khi đi vệ sinh, em có nguy cơ mắc bệnh gì?', 'Đau bụng, tiêu chảy, nhiễm giun sán và các bệnh lây nhiễm đường tiêu hóa, hô hấp', ['Giúp cơ thể khỏe mạnh thông minh hơn', 'Giúp tay trở nên trắng mịn hơn', 'Giúp mắt sáng hơn gấp đôi'],
               'Bàn tay sạch bảo vệ dạ dày và giúp em khỏe mạnh đi học đều mỗi ngày.', 'Tác hại của bàn tay bẩn'),
            _q(4, 7, 'application', 'Giờ ra chơi vừa kết thúc, bạn Nam chạy mồ hôi nhễ nhại từ sân bóng vào lớp rồi cầm ngay chiếc bánh mì mẹ chuẩn bị lên ăn ngấu nghiến vì quá đói. Em nhắc Nam việc gì ngay lập tức?', 'Nhắc Nam khoan ăn, ra ngay bồn rửa tay rửa sạch sẽ 6 bước với xà phòng rồi lau khô mới cầm bánh ăn', ['Khuyên Nam thổi phù phù vào bánh mì là ăn được', 'Bảo Nam lấy giấy ăn bọc bánh là tay không cần rửa', 'Xin Nam bẻ cho một miếng cùng ăn luôn'],
               'Quả bóng và mặt sân có rất nhiều đất bụi; rửa tay trước khi ăn bánh mì chỉ mất 30 giây mà vô cùng an toàn.', 'Xử lí tình huống sau giờ chơi'),
            _q(4, 8, 'application', 'Cô giáo khảo sát thói quen rửa tay bằng xà phòng trước khi ăn bán trú của 4 tổ lớp 1A (biểu đồ dưới). Tổ nào có nhiều bạn thực hiện tốt nhất và tổ nào cần nhắc nhở nhiều nhất?', 'Tổ 2 tốt nhất (10 bạn); Tổ 3 cần nhắc nhở nhất (5 bạn)', ['Tổ 1 tốt nhất; Tổ 4 cần nhắc nhở nhất', 'Tổ 3 tốt nhất; Tổ 1 cần nhắc nhở nhất', 'Cả 4 tổ bằng nhau'],
               'Nhìn độ cao cột: Tổ 2 cao nhất (10 bạn) và Tổ 3 thấp nhất (5 bạn).', 'Đọc biểu đồ thói quen rửa tay',
               fig=bars_fig('Số bạn rửa tay xà phòng trước ăn', ['Tổ 1', 'Tổ 2', 'Tổ 3', 'Tổ 4'], [8, 10, 5, 9], 'bạn')),
            _q(4, 9, 'application', 'Trong chuyến đi dã ngoại công viên không có sẵn vòi nước và xà phòng ngay cạnh chỗ ngồi ăn trưa, các bạn có thể dùng tạm vật gì để làm sạch tay trước khi bóc bánh?', 'Dùng dung dịch rửa tay khô sát khuẩn có cồn phù hợp trẻ em hoặc khăn ướt diệt khuẩn sạch, xoa kĩ 6 bước như rửa tay', ['Chùi tay xuống bãi cỏ công viên cho sạch', 'Nhúng tay xuống hồ nước ao cá công viên', 'Thổi bụi trên tay là sạch'],
               'Nước rửa tay khô là giải pháp cứu nguy tiện lợi khi đi dã ngoại chưa có bồn nước sạch.', 'Rửa tay khi đi dã ngoại'),
            _q(4, 10, 'application', 'Khi đứng chờ tới lượt rửa tay tại bồn nước trường học cùng nhiều bạn khác, hành vi nào thể hiện lối sống văn minh?', 'Xếp hàng trật tự chờ đến lượt mình, mở vòi nước vừa phải tránh bắn ướt bạn và khóa chặt vòi ngay khi xong', ['Chen lấn đẩy bạn ra để rửa trước', 'Mở vòi hết cỡ vẩy nước tung tóe trêu các bạn', 'Rửa xong bỏ đi mặc kệ nước chảy tràn lan'],
               'Vừa giữ vệ sinh cá nhân vừa tiết kiệm nước sạch và nhường nhịn bạn bè là nét đẹp học sinh văn minh!', 'Văn minh tại bồn rửa tay'),
            _q(4, 11, 'application', 'Ở nhà có nuôi một chú mèo con rất đáng yêu. Sau khi vuốt ve ôm ấp chú mèo, em muốn đi lấy quả táo trên bàn ăn. Việc em BẮT BUỘC làm ở giữa hai hành động này là gì?', 'Rửa tay sạch bằng xà phòng và nước sạch (cũng như rửa sạch quả táo trước khi ăn)', ['Chỉ cần vuốt mèo nhẹ nhàng thì tay không bẩn', 'Lấy áo lau qua bàn tay là ăn táo được', 'Đưa quả táo cho mèo ngửi trước'],
               'Lông thú cưng có thể mang kí sinh trùng; rửa tay sau khi chơi với vật nuôi bảo vệ sức khỏe cho cả bé và thú cưng!', 'Rửa tay sau khi chơi với thú cưng'),
            _q(4, 12, 'application', 'Bé Mít mở nắp lọ sữa chua bằng thìa sạch, nhưng trước đó tay Mít vừa cầm tiền lẻ và tay nắm cửa. Mít có cần rửa tay trước khi ăn không?', 'Vẫn rất cần rửa tay sạch bằng xà phòng trước khi ăn vì tay bẩn có thể chạm vào miệng thìa, vỏ hộp hay vuốt mặt khi đang ăn', ['Không cần vì ăn bằng thìa tay không chạm vào sữa chua', 'Chỉ cần liếm ngón tay một cái', 'Rửa mỗi chiếc thìa là đủ'],
               'Tiền giấy và tay nắm cửa là hai vật chứa cực nhiều vi khuẩn nhất; luôn rửa tay trước mọi bữa ăn!', 'Rửa tay cả khi dùng thìa đũa'),
            _q(4, 13, 'advanced', 'Thứ tự nào sau đây đúng với quy trình 6 bước rửa tay thường quy của Bộ Y tế?', 'Làm ướt & xoa lòng bàn tay -> Chà mu và kẽ ngoài -> Miết kẽ trong -> Chà mặt ngoài ngón -> Xoay ngón cái -> Chụm đầu ngón tay xoay lòng bàn tay', ['Lau khô -> Xoa bọt -> Nhúng nước -> Chà ngón cái', 'Chỉ xoa hai lòng bàn tay -> Xả nước -> Đi ăn ngay', 'Chụm đầu ngón tay -> Lau quần -> Lấy xà phòng'],
               'Thực hiện đúng đủ 6 bước giúp xà phòng tiếp xúc toàn bộ bề mặt da tay không bỏ sót vùng nào.', 'Chuỗi 6 bước chuẩn Bộ Y tế'),
            _q(4, 14, 'advanced', 'Vì sao khi đóng vòi nước ở nhà vệ sinh công cộng sau khi đã rửa tay sạch, nhiều người khuyên dùng một tờ giấy lau tay sạch lót cầm vào van vòi để vặn đóng?', 'Vì trước khi rửa, tay bẩn của nhiều người đã chạm vào núm vặn vòi nước; dùng giấy lót giúp tay sạch không chạm lại vết bẩn cũ', ['Vì sợ vòi nước bằng sắt làm gãy ngón tay', 'Vì muốn làm ướt hết cuộn giấy vệ sinh', 'Vì vòi nước không bao giờ đóng được bằng tay'],
               'Mẹo nhỏ thông minh giúp đôi tay vừa rửa 6 bước giữ được độ sạch 100%!', 'Mẹo giữ tay sạch sau khi khóa vòi'),
            _q(4, 15, 'advanced', 'Trong lớp 1B có 30 bạn. Cô giáo phát động "30 ngày rửa tay xà phòng sạch khuẩn". Nếu mỗi bạn tiết kiệm vặn vòi nước vừa nhỏ chỉ mất 1 lít nước một lần rửa thay vì xả tràn mất 3 lít nước, trong 1 lần rửa trước bữa trưa cả lớp tiết kiệm được bao nhiêu lít nước?', '60 lít nước (mỗi bạn tiết kiệm 3 - 1 = 2 lít; 30 bạn x 2 = 60 lít)', ['30 lít nước', '90 lít nước', '15 lít nước'],
               'Mỗi bạn tiết kiệm 2 lít -> cả lớp 30 bạn tiết kiệm tới 60 lít nước sạch chỉ trong một buổi trưa!', 'Rửa tay sạch đi đôi tiết kiệm nước'),
        ]
    ))

    # BÀI 5: Ăn uống gọn gàng, không kén ăn & Không nói chuyện khi nhai
    lessons.append(make_lesson(
        'lssong1-c2', 'lssong1-b05', 'Bài 5. Ăn uống gọn gàng, không kén ăn và lịch sự', 5,
        'Rèn phép lịch sự trên bàn ăn (mời cơm, nhai kĩ không nói chuyện, không rơi vãi) và ăn đủ 4 nhóm chất không kén cá chọn canh',
        ['Lịch sự bàn ăn', 'Ăn đủ chất không kén ăn', 'Tránh hóc sặc'],
        [
            _q(5, 1, 'basic', 'Trước khi bắt đầu bữa cơm cùng ông bà, bố mẹ và anh chị ở nhà, nét đẹp lễ phép đầu tiên của bạn nhỏ lớp 1 là gì?', 'Chờ người lớn ngồi đủ vào mâm, khoanh tay hoặc nhìn lễ phép mời: "Cháu mời ông bà, con mời bố mẹ ăn cơm ạ!" rồi mới cầm đũa thìa', ['Vồ lấy thức ăn ngon gắp ăn trước một mình', 'Không mời ai, bưng bát chạy ra góc xem ti-vi', 'Gõ bát đũa leng keng đòi ăn nhanh'],
               'Lời mời cơm ấm áp thể hiện lòng kính trọng người lớn tuổi và sự gắn kết yêu thương trong gia đình.', 'Phép lịch sự mời cơm'),
            _q(5, 2, 'basic', 'Vì sao khi đang nhai cơm và thức ăn trong miệng, em KHÔNG nên cười đùa ầm ĩ hay nói chuyện liên tục?', 'Vì dễ bị sặc, nghẹn hóc thức ăn vào đường thở rất nguy hiểm và dễ làm văng thức ăn ra ngoài mất lịch sự', ['Vì nói chuyện làm cơm bị nguội ngay lập tức', 'Vì nói chuyện giúp cơm tiêu hóa nhanh hơn', 'Vì đũa sẽ bị gãy nếu đang nhai mà nói'],
               '"Ăn trông nồi, ngồi trông hướng" và nhai kĩ im lặng bảo vệ an toàn đường thở và giữ nét duyên trên bàn ăn.', 'Không nói cười khi đang nhai',
               fig=table_fig('Nếp Ăn uống Văn minh', ['Nên làm', 'Cần tránh tuyệt đối'], [['Mời người lớn trước', 'Ăn trước người lớn'], ['Nhai kĩ, ngậm miệng', 'Cười đùa dễ sặc hóc'], ['Ăn đủ rau thịt cá', 'Chỉ ăn thịt, bỏ rau'], ['Gắp gọn, ăn hết suất', 'Bới tung, bỏ mứa cơm']])),
            _q(5, 3, 'basic', 'Để cơ thể lớn nhanh cao khỏe, thông minh và ít bị táo bón ốm vặt, trong bữa ăn hàng ngày em cần ăn thế nào?', 'Ăn đa dạng đủ thịt cá trứng sữa, cơm bún và ăn đủ các loại rau xanh, trái cây chín (không kén ăn bỏ rau)', ['Chỉ ăn mỗi đùi gà rán và khoai tây chiên suốt tuần', 'Nhặt vứt hết rau xanh ra ngoài mâm cơm', 'Uống nước ngọt có ga thay cơm'],
               'Rau xanh và hoa quả cung cấp vitamin và chất xơ giúp hệ tiêu hóa khỏe mạnh và da dẻ hồng hào!', 'Ăn đa dạng không kén rau'),
            _q(5, 4, 'basic', 'Khi gắp thức ăn từ đĩa chung đặt trên mâm cơm gia đình, cách làm nào là lịch sự và giữ vệ sinh?', 'Chỉ gắp miếng thức ăn ở phía gần mình nhất cho gọn, không dùng đũa bới đảo tung đĩa thức ăn để chọn miếng to', ['Lấy đũa khuấy đảo cả đĩa thịt để tìm miếng ngon nhất', 'Dùng tay bốc thẳng từ đĩa thức ăn chung', 'Liếm đầu đũa rồi gắp gắp khắp các đĩa'],
               'Gắp đúng phần phía mình vừa lịch sự tôn trọng người ăn cùng vừa đảm bảo vệ sinh chung.', 'Phép gắp thức ăn chung'),
            _q(5, 5, 'basic', 'Trong khi ăn cơm trưa tại trường hoặc tại nhà, em cần giữ bàn ăn và bát cơm của mình thế nào?', 'Cầm thìa hoặc đũa gọn gàng, ăn từ tốn tránh làm rơi vãi cơm canh ra bàn và cố gắng ăn hết phần cơm trong bát', ['Xúc đầy tràn thìa làm cơm rơi vãi đầy mặt bàn', 'Chừa lại nửa bát cơm trắng rồi đổ bỏ vào thùng rác', 'Bôi tương ớt vẽ hình lên bàn ăn'],
               'Ăn hết phần cơm không bỏ thừa là biết quý trọng mồ hôi công sức của bác nông dân và bố mẹ.', 'Ăn gọn gàng không bỏ thừa'),
            _q(5, 6, 'basic', 'Khi ăn xong bữa cơm tại nhà, việc làm nhẹ nhàng giúp em thể hiện sự ngoan ngoãn phụ giúp mẹ là gì?', 'Xếp gọn bát đũa của mình bê nhẹ ra bồn rửa, lau sạch chỗ ngồi của mình nếu có rơi vài hạt cơm rồi cất ghế ngay ngắn', ['Bỏ chạy ngay ra sân xem ti-vi để mặc bát đũa bừa trên bàn', 'Ném bát đũa vào chậu thật mạnh', 'Trát cơm thừa xuống gầm bàn'],
               'Bưng bát đũa ra bồn rửa và xếp ghế gọn sau bữa ăn là thói quen cực kì đáng khen của bé lớp 1.', 'Việc làm sau bữa ăn'),
            _q(5, 7, 'application', 'Bữa ăn bán trú hôm nay có món cá sốt cà chua rất bổ dưỡng nhưng có xương cá và món canh rau cải. Bạn Sóc hơi sợ xương cá và không quen ăn rau cải. Cô giáo khuyên Sóc làm thế nào?', 'Nhờ cô hoặc tự cẩn thận tách gỡ nhẹ phần xương cá ra mép đĩa rồi ăn từng miếng nhỏ, ăn kèm thìa canh rau cải cho dễ nuốt và đủ chất', ['Đổ hết suất cơm và canh rau xuống gầm bàn cho xong', 'Nuốt chửng miếng cá nguyên xương cho nhanh', 'Khóc ầm lên đòi ăn riêng bánh quy thay cơm'],
               'Tập ăn dần từng ít món mới và gỡ xương cẩn thận giúp em vượt qua thói quen kén ăn an toàn.', 'Vượt qua thói quen kén ăn'),
            _q(5, 8, 'application', 'Quan sát biểu đồ khẩu phần ăn của 4 bạn lớp 1 trong một bữa cơm tối (tính theo số nhóm thức ăn có trong bữa: tinh bột, đạm, rau xanh, quả chín). Bạn nào ăn cân đối đủ 4 nhóm nhất?', 'Bạn Mai (đủ cả 4 nhóm)', ['Bạn Tý (chỉ ăn 1 nhóm)', 'Bạn Mèo (ăn 2 nhóm)', 'Bạn Cún (ăn 2 nhóm)'],
               'Đủ 4 nhóm chất (tinh bột, đạm, rau củ và vitamin quả chín) là bí quyết bữa ăn chuẩn dinh dưỡng!', 'Đọc biểu đồ 4 nhóm thức ăn',
               fig=bars_fig('Số nhóm thực phẩm trong bữa (nhóm)', ['Mai', 'Tý', 'Mèo', 'Cún'], [4, 1, 2, 2], 'nhóm')),
            _q(5, 9, 'application', 'Em đang ăn cơm trưa vui vẻ ở nhà cùng gia đình, bỗng có một miếng thức ăn hơi bị cay hoặc một hạt cơm nhỏ lỡ làm em muốn hắt xì hơi. Em xử lí thế nào trên bàn ăn?', 'Nghiêng mặt quay hẳn ra xa mâm cơm, dùng khăn giấy hoặc khuỷu tay che kín miệng mũi hắt xì xong rồi xin lỗi nhẹ và lau sạch miệng', ['Hắt xì thẳng vào giữa mâm cơm chung của cả nhà', 'Phun thức ăn từ miệng ra thẳng bát của em bé', 'Quát to lên đổ lỗi cho món ăn'],
               'Quay mặt khỏi mâm cơm và che miệng mũi khi ho/hắt xì giữ vệ sinh tuyệt đối cho cả gia đình.', 'Xử lí khi muốn hắt xì trên bàn ăn'),
            _q(5, 10, 'application', 'Mẹ nấu món canh bí đỏ thịt băm rất ngon nhưng còn đang bốc khói nóng hổi. Bé Na đói bụng định xúc ngay một thìa to đưa thẳng vào miệng. Em hãy nhắc Na điều gì?', 'Nhắc Na chờ nguội bớt, múc một ít ra rìa bát thổi nhẹ cho nguội từ từ rồi mới nếm thử kẻo bị bỏng lưỡi', ['Bảo Na há miệng thật to nuốt nhanh cho hết nóng', 'Đổ nước lạnh từ vòi vào nồi canh chung', 'Thò ngón tay vào ngoáy canh xem nóng không'],
               'Thổi nhẹ thức ăn ở rìa bát tránh bỏng vòm miệng và lưỡi là kĩ năng ăn uống an toàn cần nhớ.', 'Ăn đồ nóng an toàn'),
            _q(5, 11, 'application', 'Trong giờ ăn bán trú ở trường, bạn ngồi đối diện đang nhai cơm mà miệng cứ há to chóp chép và kể chuyện cười làm văng cơm ra bàn. Em nhắc bạn nhẹ nhàng thế nào?', 'Nói nhỏ nhẹ nhàng khi bạn đã nuốt xong: "Cậu ơi mình cùng ăn ngoan, ngậm miệng nhai kĩ kẻo sặc, ăn xong ra sân mình kể chuyện vui tiếp nhé!"', ['Hét toáng lên giữa nhà ăn trêu bạn trước cả lớp', 'Lấy đũa gõ vào bát của bạn cho bạn im', 'Cười theo thật to khi bạn đang đầy cơm trong miệng'],
               'Nhắc bạn tinh tế nhẹ nhàng giúp bạn không xấu hổ mà giữ được an toàn cho cả hai.', 'Nhắc bạn văn minh trong giờ ăn'),
            _q(5, 12, 'application', 'Món quà vặt buổi chiều giữa hai lựa chọn: (1) Một hộp sữa tươi không đường kèm quả chuối chín; (2) Một túi bim bim cay mặn và 1 lon nước ngọt có ga phẩm màu. Lựa chọn nào tốt cho sức khỏe và răng miệng của em?', 'Lựa chọn (1): Hộp sữa tươi và quả chuối chín bổ sung can-xi, kali và vitamin tự nhiên', ['Lựa chọn (2): Bim bim cay và nước ngọt nhiều phẩm màu', 'Cả hai đều có hại như nhau', 'Nhịn đói hoàn toàn cả tuần'],
               'Ưu tiên trái cây tươi và sữa giúp xương chắc, răng khỏe và tinh thần minh mẫn học tốt.', 'Chọn quà vặt lành mạnh'),
            _q(5, 13, 'advanced', 'Khi nhai thức ăn thật kĩ trước khi nuốt (nhai từ 15–20 lần mỗi miếng), điều kì diệu gì xảy ra giúp ích cho chiếc dạ dày nhỏ bé của em?', 'Thức ăn được răng nghiền nát trộn đều nước bọt giúp dạ dày tiêu hóa nhẹ nhàng, hấp thu tối đa chất dinh dưỡng và không bị đau bụng', ['Làm cho răng bị mòn rụng hết sau một bữa', 'Làm thức ăn biến mất không xuống dạ dày nữa', 'Làm ta no giả vờ để khỏi cần ăn bữa sau'],
               '"Nhai kĩ no lâu" – tiêu hóa bắt đầu ngay từ khoang miệng chứ không phải chờ đến dạ dày!', 'Lợi ích khoa học của nhai kĩ'),
            _q(5, 14, 'advanced', 'Vì sao các trường học tiểu học đều đặt thùng phân loại cơm thừa và vỏ hộp sữa riêng ở nhà ăn bán trú và luôn khuyến khích học sinh "Lấy vừa đủ sức ăn"?', 'Để tránh lãng phí lương thực, giảm lượng rác thải ô nhiễm môi trường và dạy học sinh biết trân quý hạt gạo của người lao động', ['Để các bạn ăn thật ít cho nhẹ cân', 'Để làm đẹp góc nhà ăn cho giống siêu thị', 'Vì nhà bếp không có chỗ rửa bát'],
               'Không bỏ phí thức ăn là hành động thiết thực vừa tiết kiệm cho gia đình vừa bảo vệ Trái Đất xanh.', 'Chống lãng phí thực phẩm'),
            _q(5, 15, 'advanced', 'Một bạn lớp 1 chia sẻ: "Ở nhà tớ được bố mẹ mở điện thoại hoạt hình cho xem lúc ăn cơm thì tớ mới chịu nuốt nhanh". Thói quen vừa xem màn hình vừa ăn gây hại gì nhất?', 'Khiến não bị phân tâm không cảm nhận vị ngon, giảm tiết dịch tiêu hóa gây đau dạ dày, dễ ăn quá no hoặc nuốt vội bị hóc và hại mắt', ['Giúp cơm tự tan chảy trong miệng ngon gấp đôi', 'Giúp mắt nhìn chữ trên tivi rõ hơn', 'Giúp tay cầm thìa nhanh hơn'],
               'Bữa cơm không màn hình giúp bé cảm nhận trọn vẹn hương vị thức ăn và trò chuyện ấm áp với gia đình.', 'Tác hại xem màn hình khi ăn'),
        ]
    ))

    # BÀI 6: Uống đủ nước sạch & Ngủ trưa, ngủ tối đúng giờ
    lessons.append(make_lesson(
        'lssong1-c2', 'lssong1-b06', 'Bài 6. Uống đủ nước sạch và Ngủ đủ giấc đúng giờ', 6,
        'Biết lợi ích của nước lọc sạch với cơ thể, cách uống nước đúng lúc và rèn thói quen ngủ trưa, ngủ tối đúng giờ',
        ['Uống đủ nước lọc', 'Ngủ trưa, ngủ tối đúng giờ', 'Bảo vệ sức khỏe'],
        [
            _q(6, 1, 'basic', 'Loại nước uống hằng ngày tốt nhất, cần thiết nhất để giải khát và giúp các cơ quan trong cơ thể học sinh lớp 1 hoạt động khỏe mạnh là gì?', 'Nước đun sôi để nguội hoặc nước lọc sạch đóng chai đảm bảo an toàn', ['Nước ngọt có ga nhiều đường và phẩm màu', 'Nước trà đặc hoặc cà phê của người lớn', 'Nước lã chưa đun sôi múc trực tiếp ở ao hồ'],
               'Hơn 70% cơ thể người là nước; nước lọc sạch tinh khiết là nguồn sống tuyệt vời nhất không gì thay thế được.', 'Loại nước tốt nhất cho bé',
               fig=fig_clock(21, 0, '21 giờ tối: Giờ đi ngủ ngoan của Bé Lớp 1')),
            _q(6, 2, 'basic', 'Mỗi học sinh tiểu học lớp 1 nặng khoảng 20–25 kg nên uống trung bình khoảng bao nhiêu cốc nước lọc mỗi ngày (bao gồm nước ở trường và ở nhà)?', 'Khoảng 5 đến 6 cốc nước vừa (tương đương 1 đến 1,2 lít nước sạch chia đều cả ngày)', ['Chỉ uống nửa cốc nhỏ cả ngày', 'Uống một lúc 10 lít nước ngay trước khi ngủ', 'Không cần uống giọt nước nào'],
               'Chia nhỏ uống đều 5–6 cốc nước lọc mỗi ngày giữ cho cổ họng luôn ẩm mượt và đầu óc tỉnh táo.', 'Lượng nước phù hợp lớp 1'),
            _q(6, 3, 'basic', 'Ở trường học bán trú hoặc ở nhà vào buổi trưa, học sinh lớp 1 nên dành thời gian ngủ trưa khoảng bao lâu để buổi chiều học tập minh mẫn?', 'Khoảng 30 đến 60 phút ngủ trưa yên tĩnh', ['Không cần ngủ trưa, chạy nắng giữa sân suốt trưa', 'Ngủ trưa kéo dài 4 tiếng tới 5 giờ chiều', 'Chơi game trên điện thoại suốt giờ trưa'],
               'Giấc ngủ trưa ngắn 30–60 phút như "liều pin sạc nhanh" giúp não bộ ghi nhớ bài buổi chiều cực tốt.', 'Thời lượng ngủ trưa chuẩn'),
            _q(6, 4, 'basic', 'Khi vừa chạy nhảy đá bóng mồ hôi ướt đẫm vào giờ ra chơi và thấy rất khát, em nên uống nước thế nào cho đúng cách?', 'Ngồi nghỉ cho nhịp thở dịu lại một chút rồi uống từ từ từng ngụm nhỏ nước mát vừa phải', ['Tu ừng ực hết cả chai nước đá lạnh buốt ngay lập tức', 'Vừa chạy vừa đổ nước ào vào mặt và miệng', 'Uống một chai nước ngọt có ga ướp đá'],
               'Uống từng ngụm nhỏ nước mát (tránh nước đá quá buốt) sau khi nghỉ vài phút giúp tránh viêm họng và sốc nhiệt.', 'Cách uống nước sau vận động'),
            _q(6, 5, 'basic', 'Giờ đi ngủ buổi tối hợp lí nhất đối với học sinh lớp 1 để đảm bảo ngủ đủ 9–10 tiếng mỗi đêm là lúc nào?', 'Khoảng 21 giờ (9 giờ tối) hàng ngày', ['23 giờ 30 phút (11 rưỡi đêm)', '1 giờ sáng hôm sau', '18 giờ chiều khi chưa ăn cơm tối'],
               'Ngủ sâu từ 21 giờ tối giúp cơ thể sản sinh tối đa hóc-môn tăng trưởng chiều cao cho trẻ nhỏ.', 'Giờ đi ngủ tối chuẩn'),
            _q(6, 6, 'basic', 'Để có giấc ngủ trưa và ngủ tối ngon giấc không giật mình, em cần giữ thói quen nào trước khi lên giường?', 'Đi vệ sinh sạch sẽ, tắt bớt đèn sáng chói, giữ im lặng và không nô đùa hò hét trước giờ ngủ', ['Ăn thật nhiều kẹo sô-cô-la và xem phim kinh dị', 'Mở nhạc nhảy hết cỡ sát đầu giường', 'Uống hết 2 cốc nước to ngay sát phút nhắm mắt'],
               'Không gian tối dịu, yên tĩnh và đi vệ sinh trước khi ngủ mang lại giấc ngủ sâu liền mạch suốt đêm.', 'Chuẩn bị giấc ngủ ngon'),
            _q(6, 7, 'application', 'Bạn Bi có bình nước cá nhân mang đến lớp mỗi ngày nhưng sáng nào mang đi đầy bình, chiều về nhà bình nước vẫn còn nguyên vẹn vì Bi mải chơi quên uống. Thói quen nhịn uống nước này dẫn tới hậu quả gì?', 'Môi khô nứt nẻ, mệt mỏi nhức đầu giảm tập trung học và dễ bị táo bón, nước tiểu sẫm màu', ['Giúp tiết kiệm được nhiều nước cho Trái Đất nên không cần uống', 'Giúp Bi chạy nhanh hơn trên sân trường', 'Giúp Bi khỏi cần đi vệ sinh nên rất tốt'],
               'Đừng đợi đến lúc khát khô họng mới uống; hãy uống vài ngụm nhỏ mỗi giờ ra chơi!', 'Tác hại của việc nhịn uống nước'),
            _q(6, 8, 'application', 'Bảng theo dõi thói quen uống nước và ngủ đúng giờ của lớp 1A ghi nhận các bạn thực hiện tốt. Nhìn bảng dưới, điều gì là NGUYÊN TẮC CẦN TRÁNH trong sinh hoạt hàng ngày?', 'Uống nước ngọt có ga trước khi ngủ và thức khuya sau 22 giờ', ['Uống một cốc nước ấm buổi sáng sau khi dậy', 'Ngủ trưa 45 phút ở lớp bán trú', 'Uống từng ngụm nước lọc giữa các tiết học'],
               'Nước ngọt có ga vừa chứa đường gây sâu răng vừa có chất kích thích làm bé khó chìm vào giấc ngủ tối.', 'Phân biệt thói quen nên và tránh',
               fig=table_fig('Thói quen Nước & Giấc ngủ', ['Thời điểm', 'Lựa chọn chuẩn'], [['Sáng ngủ dậy', 'Uống 1 ly nước ấm'], ['Giờ ra chơi', 'Uống từng ngụm nhỏ'], ['Buổi trưa', 'Ngủ yên 30-60 phút'], ['Buổi tối', 'Ngủ lúc 21 giờ tối']])),
            _q(6, 9, 'application', 'Trong giờ ngủ trưa bán trú ở lớp, bạn Tôm chưa buồn ngủ ngay nên cứ quay sang nói chuyện rì rầm và cù chân chọc bạn nằm cạnh cười khúc khích. Em nhắc Tôm thế nào?', 'Nói thì thầm thật nhỏ hoặc ra hiệu bằng ngón tay đặt lên môi để Tôm nằm yên nhắm mắt thư giãn, tôn trọng giấc ngủ của cả lớp', ['Quát thật to lên mắng Tôm giữa phòng ngủ', 'Đạp chân trả đũa vào người Tôm', 'Ngồi bật dậy nói chuyện thi xem ai nói to hơn'],
               'Giữ trật tự chung giúp tất cả các bạn và chính bản thân em dễ dàng chìm vào giấc ngủ trưa êm ái.', 'Giữ trật tự giờ ngủ trưa'),
            _q(6, 10, 'application', 'Quan sát biểu đồ tổng số cốc nước lọc uống được trong ngày của 4 bạn nhỏ. Nếu tiêu chuẩn tốt cho bé lớp 1 là tối thiểu 5 cốc mỗi ngày, những bạn nào đã uống ĐẠT chuẩn?', 'Bạn An (6 cốc) và bạn Chi (5 cốc)', ['Chỉ mỗi bạn Bình (3 cốc)', 'Bạn Bình và bạn Dũng (3 và 2 cốc)', 'Cả 4 bạn đều chưa đạt chuẩn'],
               'An uống 6 cốc và Chi uống 5 cốc đều đạt mức khuyến nghị 5–6 cốc nước sạch mỗi ngày!', 'Đọc biểu đồ lượng nước uống',
               fig=bars_fig('Số cốc nước lọc uống trong ngày (cốc)', ['An', 'Bình', 'Chi', 'Dũng'], [6, 3, 5, 2], 'cốc')),
            _q(6, 11, 'application', 'Chai nước lọc của Lan để quên trên bàn học dưới ánh nắng mặt trời suốt 2 ngày cuối tuần, bên trong chai nhựa nóng ấm và có mùi nhựa hơi lạ. Sáng thứ Hai Lan có nên uống chai nước đó không?', 'Không nên uống; đổ bỏ nước cũ đi tưới cây, rửa sạch chai bằng nước rửa bình rồi rót nước lọc mới sạch vào uống', ['Cứ uống hết cho đỡ phí nước', 'Bỏ vào tủ lạnh cho mát rồi uống bình thường', 'Lắc đều chai lên là nước hết mùi lạ'],
               'Nước đóng chai để nắng lâu có thể nhiễm vi nhựa và phát sinh vi khuẩn; luôn dùng nước mới sạch mỗi ngày.', 'An toàn bình nước cá nhân'),
            _q(6, 12, 'application', 'Ở nhà vào buổi tối, khi mẹ báo hiệu "Đã 20 giờ 45 rồi, chuẩn bị đi đánh răng và lên giường ngủ thôi con!", hành động ngoan ngoãn của em là gì?', 'Vui vẻ thu dọn nốt đồ chơi, tắt ti-vi đúng hẹn, đi vệ sinh, đánh răng sạch sẽ và lên giường ngủ lúc 21 giờ', ['Khóc ăn vạ đòi xem thêm 3 tập hoạt hình nữa', 'Lén giấu điện thoại dưới gối để chơi trộm trong chăn', 'Vặn ngược kim đồng hồ về số 7 để lừa mẹ'],
               'Tuân thủ giờ đi ngủ đều đặn giúp đồng hồ sinh học của cơ thể hoạt động chính xác tuyệt vời.', 'Tuân thủ giờ ngủ cùng mẹ'),
            _q(6, 13, 'advanced', 'Nhiều bạn nhỏ lầm tưởng: "Em uống 3 lon nước ngọt có ga và trà sữa một ngày thay cho nước lọc cũng là uống đủ nước rồi mà!". Giải thích nào sau đây chỉ rõ sai lầm đó?', 'Nước ngọt và trà sữa chứa nhiều đường, phẩm màu làm càng khát hơn, dễ sâu răng và béo phì; chỉ nước lọc mới tốt cho cơ thể', ['Sai vì nước ngọt màu đen nên làm đổi màu da', 'Sai vì trà sữa không phải là chất lỏng', 'Đúng hoàn toàn, uống trà sữa còn khỏe hơn nước lọc'],
               'Không loại nước ngọt công nghiệp nào thay thế được vai trò thanh khiết của nước lọc tự nhiên.', 'Phân biệt nước lọc và nước ngọt'),
            _q(6, 14, 'advanced', 'Vì sao khi thức dậy vào buổi sáng, uống ngay một ly nhỏ nước ấm khoảng 100–150 ml trước bữa sáng lại cực kì có lợi cho bé lớp 1?', 'Giúp bù lượng nước thất thoát qua hơi thở suốt đêm, đánh thức dạ dày nhẹ nhàng và hỗ trợ đi vệ sinh đều đặn mỗi sáng', ['Vì nước ấm giúp tẩy trắng đồng phục học sinh', 'Vì uống nước ấm vào buổi sáng giúp không cần ăn cơm cả ngày', 'Vì nước ấm làm răng rụng nhanh hơn'],
               'Một ly nước ấm buổi sáng là thói quen vàng của sức khỏe và tuổi thọ!', 'Bí quyết ly nước ấm buổi sáng'),
            _q(6, 15, 'advanced', 'Cơ thể trẻ em lớn lên chiều cao mạnh nhất vào thời điểm nào trong ngày nếu trẻ có nếp sinh hoạt khoa học?', 'Khi trẻ chìm vào giấc ngủ sâu ban đêm từ khoảng 22 giờ đến 2 giờ sáng (vì thế phải đi ngủ sớm từ 21 giờ để kịp vào giấc ngủ sâu)', ['Khi trẻ thức khuya chơi điện tử tới 1 giờ sáng', 'Chỉ khi trẻ đứng dưới trời nắng gắt buổi trưa', 'Chỉ khi trẻ ăn kẹo ngọt lúc nửa đêm'],
               'Ngủ sớm lúc 21 giờ giúp em bước vào giấc ngủ sâu đúng giờ vàng tăng trưởng chiều cao!', 'Giờ vàng tăng trưởng chiều cao'),
        ]
    ))

    return lessons
