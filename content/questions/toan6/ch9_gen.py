#!/usr/bin/env python3
# Sinh ch9.json (Toán 6 KNTT, chương IX Dữ liệu và xác suất thực nghiệm). Đáp án tính từ chính số liệu hình bằng Python.
import os, math
from fractions import Fraction as Fr
from ch89_lib import *
HERE = os.path.dirname(os.path.abspath(__file__))
CH = "toan6-c9"
batches = []
def add(code, title, seq, sub, concepts, g, review=False):
    qs = g.finish()
    lesson = {"code": code} if review else {"code": code, "title": title, "seq": seq, "subtitle": sub, "concepts": concepts}
    batches.append({"chapter": CH, "lesson": lesson, "questions": qs})
def frs(x):
    x = Fr(x); return f"{x.numerator}/{x.denominator}" if x.denominator != 1 else str(x.numerator)
def T(title, head, rows): return {"type": "table", "title": title, "head": head, "rows": rows}
def B(title, unit, labels, *series):
    return {"type": "bars", "title": title, "unit": unit, "labels": labels,
            "series": [dict(({"name": n} if n else {}), values=v) for n, v in series]}
def pict(title, rows, per, unit=''):
    """Biểu đồ tranh: rows=[(nhãn, số biểu tượng)] ; mỗi biểu tượng = per; số lẻ .5 = nửa biểu tượng."""
    items = [TX([170, 20], title, size=13)]
    y = 46
    for lb, n in rows:
        items.append(TX([8, y + 5], lb, 'start', 13))
        k = 0
        while n - k >= 1:
            items.append({"t": "circle", "c": [110 + k * 24, y], "r": 9, "fill": "#f59e0b"}); k += 1
        if n - k >= 0.5:
            items.append({"t": "circle", "c": [110 + k * 24, y], "r": 4.5, "fill": "#f59e0b"})
        y += 30
    items.append({"t": "circle", "c": [20, y + 6], "r": 7, "fill": "#f59e0b"})
    items.append(TX([34, y + 11], f"= {per}" + (f" {unit}" if unit else ''), 'start', 12))
    if any(n % 1 for _, n in rows):
        items.append({"t": "circle", "c": [150, y + 6], "r": 4.5, "fill": "#f59e0b"})
        items.append(TX([160, y + 11], f"= {frs(Fr(per) / 2) if Fr(per) % 2 else per // 2}" + (f" {unit}" if unit else ''), 'start', 12))
    return {"w": 330, "h": y + 22, "items": items}
def dice_face(c, n, s=26):
    P = {1: [(0, 0)], 2: [(-1, -1), (1, 1)], 3: [(-1, -1), (0, 0), (1, 1)], 4: [(-1, -1), (1, -1), (-1, 1), (1, 1)],
         5: [(-1, -1), (1, -1), (0, 0), (-1, 1), (1, 1)], 6: [(-1, -1), (1, -1), (-1, 0), (1, 0), (-1, 1), (1, 1)]}[n]
    it = [{"t": "poly", "p": [[c[0] - s, c[1] - s], [c[0] + s, c[1] - s], [c[0] + s, c[1] + s], [c[0] - s, c[1] + s]], "fill": "#f8fafc"}]
    for dx, dy in P: it.append({"t": "circle", "c": [c[0] + dx * s * .5, c[1] + dy * s * .5], "r": 4.2, "fill": "#1e293b"})
    return it
def dice_row(faces, W=None):
    n = len(faces); W = W or 20 + n * 70; it = []
    for i, f in enumerate(faces): it += dice_face([45 + i * 70, 45], f)
    return {"w": W, "h": 92, "items": it}
def cards(nums, W=None):
    it = []
    for i, v in enumerate(nums):
        x = 14 + i * 46
        it.append({"t": "poly", "p": [[x, 14], [x + 38, 14], [x + 38, 66], [x, 66]], "fill": "#dbeafe"})
        it.append(TX([x + 19, 47], str(v), size=18))
    return {"w": 28 + 46 * len(nums), "h": 82, "items": it}
def box(counts):
    """counts: [(tên màu, mã màu, số)] bóng trong hộp, xếp thành hàng."""
    it = [{"t": "poly", "p": [[10, 30], [290, 30], [290, 150], [10, 150]], "fill": "#f1f5f9"}]
    allb = [(c, n) for nm, c, k in counts for n in range(k)]
    for i, (c, _) in enumerate(allb):
        it.append({"t": "circle", "c": [34 + (i % 8) * 32, 62 + (i // 8) * 36], "r": 12, "fill": c})
    it.append(TX([150, 20], "Hộp bóng: " + ", ".join(f"{k} {nm}" for nm, c, k in counts), size=12))
    return {"w": 300, "h": 160, "items": it}
def spinner(labels, colors, R=78, W=210):
    n = len(labels); c = [W / 2, 95]; it = []
    for i in range(n):
        a0 = 90 - i * 360 / n; a1 = a0 - 360 / n
        pts = [c] + [pol(c, R, a0 + (a1 - a0) * t / 12) for t in range(13)]
        it.append({"t": "poly", "p": pts, "fill": colors[i % len(colors)]})
        m = pol(c, R * 0.62, (a0 + a1) / 2); it.append(TX([m[0], m[1] + 5], str(labels[i]), size=15))
    it.append({"t": "line", "a": [c[0], c[1] - R - 12], "b": [c[0], c[1] - R + 4], "arrow": 1, "w": 2.5, "color": "#dc2626"})
    return {"w": W, "h": 190, "items": it}

# ================= Bài 38 =================
g = Gen(38)
head = ["Học sinh", "Môn yêu thích", "Giờ tự học/tuần"]
g.q("T6-B38-001", "basic", "Trong bảng khảo sát, dữ liệu ở cột nào là số liệu (dữ liệu là số)?", "Giờ tự học/tuần", ["Học sinh", "Môn yêu thích", "Cả ba cột"],
    "Số liệu là dữ liệu cho bằng số. Tên học sinh và môn yêu thích là dữ liệu không phải là số; chỉ cột số giờ tự học mỗi tuần là số liệu.",
    T("Kết quả khảo sát", head, [["An", "Toán", 6], ["Bình", "Văn", 5], ["Chi", "Anh", 8]]))
g.q("T6-B38-002", "basic", "Dãy dữ liệu nào sau đây là số liệu?", "Số quyển sách mỗi bạn mượn trong tháng: 2; 3; 1; 4",
    ["Màu sắc yêu thích của các bạn: xanh, đỏ, vàng, tím", "Tên các môn thể thao: bóng đá, cờ vua, bơi, cầu lông", "Các loại trái cây yêu thích: cam, táo, ổi, nhãn"],
    "Số liệu là dữ liệu có dạng số. Số quyển sách là số; màu sắc, tên môn thể thao, loại trái cây là dữ liệu không phải là số.")
g.q("T6-B38-003", "basic", "Để biết loại nước uống yêu thích của các bạn trong lớp, cách thu thập dữ liệu phù hợp nhất là", "lập phiếu hỏi hoặc phỏng vấn trực tiếp các bạn",
    ["đo chiều cao của từng bạn", "xem sách giáo khoa Toán", "đếm số cửa sổ của lớp học"],
    "Sở thích của các bạn chỉ biết được bằng cách hỏi trực tiếp (phỏng vấn, phiếu hỏi). Các cách còn lại không cho dữ liệu về loại nước uống yêu thích.")
ages = [11, 12, 11, 52, 12, 11]
bad = [a for a in ages if not 9 <= a <= 14]; assert bad == [52]
g.q("T6-B38-004", "application", "Bảng ghi tuổi của 6 học sinh lớp 6. Giá trị nào trong bảng KHÔNG hợp lí?", "52", ["11", "12", "Cả ba giá trị 11, 12, 52 đều hợp lí"],
    "Học sinh lớp 6 thường 11 hoặc 12 tuổi nên 52 là giá trị không hợp lí (có thể ghi nhầm, cần kiểm tra lại dữ liệu).",
    T("Tuổi của 6 học sinh lớp 6", ["Bạn", "An", "Bình", "Chi", "Dũng", "Hà", "Lan"], [["Tuổi"] + ages]))
sp = [("Bóng đá", 12), ("Cờ vua", 5), ("Bơi", 8), ("Cầu lông", 10)]; tot = sum(v for _, v in sp); assert tot == 35
g.q("T6-B38-005", "application", "Mỗi bạn chỉ chọn một môn thể thao yêu thích. Có bao nhiêu bạn tham gia khảo sát?", str(tot), ["12", "30", "40"],
    "Tổng số bạn bằng tổng số lượt chọn: 12 + 5 + 8 + 10 = 35 (bạn). Môn bóng đá (12) chỉ là số bạn chọn riêng môn đó.",
    T("Môn thể thao yêu thích", ["Môn", "Bóng đá", "Cờ vua", "Bơi", "Cầu lông"], [["Số bạn chọn"] + [v for _, v in sp]]))
mus = [("Pop", 7), ("Rock", 5), ("Dân ca", 4), ("Rap", 4)]; sm = sum(v for _, v in mus); hs = 18; assert sm > hs
g.q("T6-B38-006", "application", "Lớp có 18 học sinh, mỗi bạn chọn đúng một thể loại nhạc yêu thích. Nhận xét nào về dữ liệu trong bảng là đúng?", "Không hợp lí, vì tổng số lượt chọn 20 lớn hơn số học sinh 18",
    ["Hợp lí, vì có 4 thể loại nhạc", "Hợp lí, vì thể loại Pop có nhiều lượt chọn nhất", "Không hợp lí, vì có hai thể loại cùng 4 lượt chọn"],
    "Mỗi bạn chọn một thể loại nên tổng lượt chọn phải bằng 18, nhưng 7 + 5 + 4 + 4 = 20. Hai thể loại có cùng số lượt chọn là điều bình thường.",
    T("Thể loại nhạc yêu thích", ["Thể loại"] + [n for n, _ in mus], [["Số lượt chọn"] + [v for _, v in mus]]))
hh = [142, 150, 147, 155, 149, 151]; d7 = max(hh) - min(hh); assert d7 == 13
g.q("T6-B38-007", "advanced", "Bảng ghi chiều cao của 6 bạn trong một tổ. Bạn cao nhất cao hơn bạn thấp nhất bao nhiêu xentimét?", str(d7), ["5", "12", "8"],
    "Cao nhất 155 cm, thấp nhất 142 cm nên chênh lệch là 155 - 142 = 13 (cm).",
    T("Chiều cao (cm)", ["Bạn", "An", "Bình", "Chi", "Dũng", "Hà", "Lan"], [["Cao (cm)"] + hh]))
tr = [("Xe đạp", 15), ("Đi bộ", 12), ("Xe buýt", 8)]; tot8 = 40; mt = tot8 - sum(v for _, v in tr); assert mt == 5
g.q("T6-B38-008", "advanced", "Khảo sát cách đến trường của 40 học sinh, mỗi bạn chọn một cách. Ngoài ba cách trong bảng chỉ còn cách đi xe máy (phụ huynh chở). Có bao nhiêu bạn đi xe máy?", str(mt), ["35", "13", "8"],
    "Số bạn đi xe máy = 40 - (15 + 12 + 8) = 40 - 35 = 5 (bạn). 35 là số bạn đã có trong bảng.",
    T("Cách đến trường", ["Cách đi", "Xe đạp", "Đi bộ", "Xe buýt", "Xe máy"], [["Số bạn", 15, 12, 8, "?"]]))
add("toan6-b38", "Bài 38. Dữ liệu và thu thập dữ liệu", 1, "Dữ liệu, phân loại dữ liệu, thu thập dữ liệu, tính hợp lí của dữ liệu",
    ["Dữ liệu", "Số liệu và dữ liệu không phải là số", "Thu thập dữ liệu", "Tính hợp lí của dữ liệu"], g)

# ================= Bài 39 =================
g = Gen(39)
tr_ = [12, 15, 9, 14]
g.q("T6-B39-001", "basic", "Bảng thống kê cho biết số cây các tổ đã trồng. Tổ 3 trồng được bao nhiêu cây?", str(tr_[2]), ["15", "14", "12"],
    "Đọc ở cột Tổ 3: 9 cây. Các số 12, 15, 14 là số cây của Tổ 1, Tổ 2, Tổ 4.",
    T("Số cây trồng của các tổ", ["Tổ", "Tổ 1", "Tổ 2", "Tổ 3", "Tổ 4"], [["Số cây"] + tr_]))
pc = [("Thứ Hai", 4), ("Thứ Ba", 6), ("Thứ Tư", 3), ("Thứ Năm", 5)]; per = 5
g.q("T6-B39-002", "basic", "Biểu đồ tranh cho biết số quyển truyện thư viện cho mượn (mỗi biểu tượng = 5 quyển). Thứ Ba cho mượn bao nhiêu quyển?", str(dict(pc)["Thứ Ba"] * per), ["6", "5", "20"],
    "Thứ Ba có 6 biểu tượng, mỗi biểu tượng là 5 quyển nên 6 × 5 = 30 (quyển). Đáp án 6 là số biểu tượng, chưa nhân với 5.",
    pict("Số truyện cho mượn", pc, per, "quyển"))
fr = [("Cam", 18), ("Xoài", 25), ("Ổi", 14), ("Nho", 21)]; mn = min(fr, key=lambda t: t[1])
g.q("T6-B39-003", "basic", "Bảng thống kê số kilôgam trái cây bán được trong ngày. Loại trái cây nào bán được ít nhất?", mn[0], ["Cam", "Xoài", "Nho"] if mn[0] == "Ổi" else None,
    "So sánh các số: 14 < 18 < 21 < 25 nên ổi bán được ít nhất (14 kg).",
    T("Trái cây bán trong ngày", ["Loại"] + [n for n, _ in fr], [["Số kg"] + [v for _, v in fr]]))
pc = [("Lớp 6A", 5), ("Lớp 6B", 4), ("Lớp 6C", 7), ("Lớp 6D", 3)]; per = 4; tot = sum(v for _, v in pc) * per; assert tot == 76
g.q("T6-B39-004", "application", "Biểu đồ tranh cho biết số bạn tham gia câu lạc bộ đọc sách của mỗi lớp (mỗi biểu tượng = 4 bạn). Cả bốn lớp có bao nhiêu bạn tham gia?", str(tot), ["19", "28", "60"],
    "Tổng số biểu tượng là 5 + 4 + 7 + 3 = 19 nên số bạn là 19 × 4 = 76. Đáp án 19 là tổng số biểu tượng.",
    pict("Số bạn tham gia CLB đọc sách", pc, per, "bạn"))
nam = [12, 15, 13]; nu = [14, 16, 17]; d5 = sum(nu) - sum(nam); assert d5 == 7
g.q("T6-B39-005", "application", "Dựa vào bảng, tổng số học sinh nữ của ba lớp nhiều hơn tổng số học sinh nam bao nhiêu bạn?", str(d5), ["3", "47", "1"],
    "Tổng nữ: 14 + 16 + 17 = 47; tổng nam: 12 + 15 + 13 = 40. Chênh lệch 47 - 40 = 7 (bạn).",
    T("Số học sinh theo lớp", ["", "Lớp 6A", "Lớp 6B", "Lớp 6C"], [["Nam"] + nam, ["Nữ"] + nu]))
pc = [("Tháng 1", 6), ("Tháng 2", 9), ("Tháng 3", 4)]; per = 3; d6 = (9 - 4) * per; assert d6 == 15
g.q("T6-B39-006", "application", "Biểu đồ tranh cho biết số xe đạp cửa hàng bán được (mỗi biểu tượng = 3 xe). Tháng 2 bán nhiều hơn Tháng 3 bao nhiêu xe?", str(d6), ["5", "27", "12"],
    "Tháng 2: 9 × 3 = 27 xe; Tháng 3: 4 × 3 = 12 xe. Chênh lệch 27 - 12 = 15 (xe). Đáp án 5 là hiệu số biểu tượng, chưa nhân với 3.",
    pict("Số xe đạp bán được", pc, per, "xe"))
pc = [("Tuần 1", 3), ("Tuần 2", 2.5), ("Tuần 3", 4), ("Tuần 4", 3.5)]; per = 20; qty = sum(Fr(v).limit_denominator() for _, v in pc) * per; assert qty == 260
money = qty * 12  # nghìn đồng
g.q("T6-B39-007", "advanced", "Biểu đồ tranh cho biết số quyển vở cửa hàng bán được (mỗi biểu tượng = 20 quyển, biểu tượng nhỏ = một nửa, tức 10 quyển). Mỗi quyển giá 12 nghìn đồng. Trong 4 tuần cửa hàng thu được bao nhiêu nghìn đồng?", f"{money}",
    [f"{260 + 12}", f"{13 * 12}", f"{(3 + 2 + 4 + 3) * 20 * 12}"],
    "Số quyển: (3 + 2,5 + 4 + 3,5) × 20 = 13 × 20 = 260 quyển. Tiền thu được 260 × 12 = 3 120 (nghìn đồng). Nếu bỏ qua biểu tượng nhỏ sẽ thiếu 20 quyển.",
    pict("Số vở bán được", pc, per, "quyển"))
tot8 = 40; g_, k_, tb = 12, 15, 9; y8 = tot8 - g_ - k_ - tb; assert y8 == 4
g.q("T6-B39-008", "advanced", "Bảng thống kê kết quả học tập của 40 học sinh lớp 6A; có 4 loại là Giỏi, Khá, Trung bình, Chưa đạt. Số học sinh loại Chưa đạt là", str(y8), ["3", "5", "6"],
    "Số học sinh Chưa đạt = 40 - (12 + 15 + 9) = 40 - 36 = 4 (bạn).",
    T("Kết quả học tập lớp 6A", ["Loại", "Giỏi", "Khá", "Trung bình", "Chưa đạt"], [["Số HS", g_, k_, tb, "?"]]))
add("toan6-b39", "Bài 39. Bảng thống kê và biểu đồ tranh", 2, "Đọc bảng thống kê, biểu đồ tranh và tính toán trên số liệu",
    ["Bảng thống kê", "Biểu đồ tranh", "Mỗi biểu tượng ứng với một số đơn vị"], g)

# ================= Bài 40 =================
g = Gen(40)
lb = ["Cờ vua", "Bóng đá", "Vẽ", "Hát", "Cầu lông"]; v = [14, 22, 10, 18, 22]
g.q("T6-B40-001", "basic", "Biểu đồ cột cho biết số bạn tham gia mỗi câu lạc bộ. Câu lạc bộ Vẽ có bao nhiêu bạn?", str(v[2]), ["14", "18", "22"],
    "Cột của Vẽ cao đến 10 nên có 10 bạn. Các số 14, 18, 22 là của Cờ vua, Hát, Bóng đá (và Cầu lông).",
    B("Số bạn tham gia câu lạc bộ", "bạn", lb, (None, v)))
lb = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4"]; v = [30, 45, 25, 60]; assert v.index(max(v)) == 3
g.q("T6-B40-002", "basic", "Biểu đồ cột cho biết số sách thư viện cho mượn theo tháng. Tháng nào cho mượn nhiều sách nhất?", "Tháng 4", ["Tháng 1", "Tháng 2", "Tháng 3"],
    "Cột cao nhất là Tháng 4 (60 quyển), nên đó là tháng cho mượn nhiều nhất.",
    B("Số sách cho mượn", "quyển", lb, (None, v)))
lb = ["6A", "6B", "6C", "6D"]; v = [8, 12, 8, 5]
g.q("T6-B40-003", "basic", "Biểu đồ cột cho biết số bạn đạt điểm 10 của các lớp. Hai lớp nào có số bạn đạt điểm 10 bằng nhau?", "6A và 6C", ["6A và 6B", "6B và 6C", "6B và 6D"],
    "Cột của 6A và 6C cùng cao đến 8 nên hai lớp này có số bạn bằng nhau. Các cặp còn lại có chiều cao cột khác nhau.",
    B("Số bạn đạt điểm 10", "bạn", lb, (None, v)))
lb = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6"]; v = [20, 35, 15, 30, 25]; t4 = sum(v); assert t4 == 125
g.q("T6-B40-004", "application", "Biểu đồ cột cho biết số chai nước cửa hàng bán mỗi ngày. Cả 5 ngày cửa hàng bán được bao nhiêu chai nước?", str(t4), ["35", "100", "120"],
    "Tổng số chai = 20 + 35 + 15 + 30 + 25 = 125 (chai). Đáp án 35 chỉ là số chai của ngày cao nhất.",
    B("Số chai nước bán được", "chai", lb, (None, v)))
lb = ["Lớp 6A", "Lớp 6B", "Lớp 6C", "Lớp 6D"]; v = [42, 55, 38, 50]; d5 = v[1] - v[2]; assert d5 == 17
g.q("T6-B40-005", "application", "Biểu đồ cột cho biết số kilôgam giấy vụn mỗi lớp thu gom. Lớp 6B thu được nhiều hơn lớp 6C bao nhiêu kilôgam?", str(d5), ["13", "93", "5"],
    "Lớp 6B thu 55 kg, lớp 6C thu 38 kg nên chênh lệch 55 - 38 = 17 (kg). Phép cộng 55 + 38 = 93 là sai ý.",
    B("Giấy vụn thu gom", "kg", lb, (None, v)))
lb = ["An", "Bình", "Chi", "Dũng", "Hà", "Lan"]; v = [18, 25, 12, 30, 22, 9]; c6 = sum(1 for x in v if x > 20); assert c6 == 3
g.q("T6-B40-006", "application", "Biểu đồ cột cho biết số trang sách mỗi bạn đọc trong tuần. Có bao nhiêu bạn đọc nhiều hơn 20 trang?", str(c6), ["2", "4", "6"],
    "Các bạn có cột cao hơn 20 là Bình (25), Dũng (30), Hà (22): có 3 bạn. An (18), Chi (12), Lan (9) đều dưới 20.",
    B("Số trang đọc trong tuần", "trang", lb, (None, v)))
lb = ["T1", "T2", "T3", "T4", "T5", "T6"]; v = [40, 35, 50, 45, 60, 55]; d7 = sum(v[3:]) - sum(v[:3]); assert d7 == 35
g.q("T6-B40-007", "advanced", "Biểu đồ cột cho biết số áo xưởng may sản xuất trong 6 tháng đầu năm (T1 đến T6). Tổng 3 tháng cuối nhiều hơn tổng 3 tháng đầu bao nhiêu chiếc?", str(d7), ["10", "160", "325"],
    "3 tháng đầu: 40 + 35 + 50 = 125; 3 tháng cuối: 45 + 60 + 55 = 160. Chênh lệch 160 - 125 = 35 (chiếc). 160 chỉ là tổng 3 tháng cuối.",
    B("Số áo sản xuất", "chiếc", lb, (None, v)))
lb = ["6A", "6B", "6C", "6D", "6E"]; v = [18, 25, 15, 20, 12]; goal = 100; need = goal - sum(v); assert need == 10
g.q("T6-B40-008", "advanced", "Cả khối 6 đặt mục tiêu thu gom 100 kg nhựa tái chế. Biểu đồ cột cho biết số kilôgam mỗi lớp đã thu gom. Khối 6 còn cần thu thêm bao nhiêu kilôgam nữa để đạt mục tiêu?", str(need), ["90", "25", "15"],
    "Đã thu: 18 + 25 + 15 + 20 + 12 = 90 (kg). Còn cần 100 - 90 = 10 (kg). Đáp án 90 là số đã thu được.",
    B("Nhựa tái chế đã thu", "kg", lb, (None, v)))
add("toan6-b40", "Bài 40. Biểu đồ cột", 3, "Đọc và phân tích dữ liệu từ biểu đồ cột",
    ["Biểu đồ cột", "Đọc số liệu từ biểu đồ cột", "So sánh và tính toán trên số liệu"], g)

# ================= Bài 41 =================
g = Gen(41)
lb = ["6A", "6B", "6C", "6D"]; nam = [14, 18, 16, 20]; nu = [16, 15, 19, 17]
S = [("Nam", nam), ("Nữ", nu)]
fg = B("Số học sinh nam, nữ", "bạn", lb, *S)
g.q("T6-B41-001", "basic", "Biểu đồ cột kép cho biết số học sinh nam và nữ của bốn lớp 6. Lớp 6B có bao nhiêu bạn nữ?", str(nu[1]), ["18", "16", "33"],
    "Ở lớp 6B, cột Nữ cao đến 15 nên có 15 bạn nữ. Số 18 là số bạn nam; 33 là tổng nam và nữ.", fg)
more = [l for l, a, b in zip(lb, nam, nu) if a > b]; assert more == ["6B", "6D"]
g.q("T6-B41-002", "basic", "Trong biểu đồ cột kép trên (nam và nữ của bốn lớp 6), các lớp nào có số nam nhiều hơn số nữ?", "6B và 6D", ["6A và 6C", "6A và 6B", "6C và 6D"],
    "So sánh hai cột của từng lớp: 6A (14 < 16), 6B (18 > 15), 6C (16 < 19), 6D (20 > 17). Vậy chỉ có 6B và 6D có nam nhiều hơn nữ.", fg)
lb2 = ["Q1", "Q2", "Q3", "Q4"]; y1 = [30, 42, 38, 50]; y2 = [36, 40, 45, 58]
fg2 = B("Doanh thu (triệu đồng)", "triệu đồng", lb2, ("Năm 2023", y1), ("Năm 2024", y2))
big = [l for l, a, b in zip(lb2, y1, y2) if a > b]; assert big == ["Q2"]
g.q("T6-B41-003", "basic", "Biểu đồ cột kép cho biết doanh thu từng quý của hai năm 2023 và 2024. Quý nào doanh thu năm 2023 lớn hơn doanh thu năm 2024?", "Q2", ["Q1", "Q3", "Q4"],
    "Chỉ ở Q2 cột năm 2023 (42) cao hơn cột năm 2024 (40); các quý còn lại năm 2024 lớn hơn.", fg2)
t4 = nam[2] + nu[2]; assert t4 == 35
g.q("T6-B41-004", "application", "Theo biểu đồ cột kép về số học sinh nam, nữ của các lớp 6, lớp 6C có tất cả bao nhiêu học sinh?", str(t4), ["3", "19", "16"],
    "Lớp 6C có 16 nam và 19 nữ nên có 16 + 19 = 35 (học sinh). Số 3 là chênh lệch nam, nữ.", fg)
tn = sum(nu); assert tn == 67
g.q("T6-B41-005", "application", "Theo biểu đồ cột kép về số học sinh nam, nữ, tổng số học sinh nữ của bốn lớp là", str(tn), ["68", "63", "134"],
    "Tổng số nữ = 16 + 15 + 19 + 17 = 67 (bạn). Tổng số nam là 14 + 18 + 16 + 20 = 68 nên chọn nhầm nam sẽ ra 68.", fg)
diff = [abs(b - a) for a, b in zip(y1, y2)]; mx = diff.index(max(diff)); assert lb2[mx] == "Q4" and max(diff) == 8
g.q("T6-B41-006", "application", "Theo biểu đồ cột kép doanh thu hai năm, quý nào có chênh lệch doanh thu giữa hai năm lớn nhất?", "Q4", ["Q1", "Q2", "Q3"],
    "Chênh lệch từng quý: Q1: 6, Q2: 2, Q3: 7, Q4: 8 (triệu đồng). Lớn nhất là Q4.", fg2)
lb3 = ["T1", "T2", "T3", "T4"]; ca = [30, 25, 40, 35]; ta = [20, 30, 35, 45]
fg3 = B("Lượng bán (kg)", "kg", lb3, ("Cam", ca), ("Táo", ta))
sc, st = sum(ca), sum(ta); assert (sc, st) == (130, 130)
ca = [30, 25, 40, 35]; ta = [20, 30, 35, 48]; sc, st = sum(ca), sum(ta); assert st - sc == 3
fg3 = B("Lượng bán (kg)", "kg", lb3, ("Cam", ca), ("Táo", ta))
g.q("T6-B41-007", "advanced", "Biểu đồ cột kép cho biết số kilôgam cam và táo bán được trong 4 tuần (T1 đến T4). Trong cả 4 tuần, loại nào bán được nhiều hơn và nhiều hơn bao nhiêu kilôgam?", "Táo, nhiều hơn 3 kg", ["Cam, nhiều hơn 3 kg", "Táo, nhiều hơn 13 kg", "Hai loại bán bằng nhau"],
    "Cam: 30 + 25 + 40 + 35 = 130 kg; táo: 20 + 30 + 35 + 48 = 133 kg. Táo nhiều hơn 133 - 130 = 3 (kg).", fg3)
lb4 = ["Toán", "Văn", "Anh", "Sử"]; k1 = [7, 6, 8, 9]; k2 = [8, 6, 7, 9]
tw = sum(1 for a, b in zip(k1, k2) if b > a); eq = sum(1 for a, b in zip(k1, k2) if b == a); assert (tw, eq) == (1, 2)
tot_up = sum(k2) - sum(k1); assert tot_up == 0
k2 = [9, 6, 7, 10]; tot_up = sum(k2) - sum(k1); assert tot_up == 2
imp = [l for l, a, b in zip(lb4, k1, k2) if b > a]; assert imp == ["Toán", "Sử"]
g.q("T6-B41-008", "advanced", "Biểu đồ cột kép cho biết điểm trung bình các môn của một bạn ở hai kì (Kì 1 và Kì 2). Những môn nào điểm Kì 2 cao hơn điểm Kì 1?", "Toán và Sử", ["Toán và Anh", "Văn và Anh", "Văn và Sử"],
    "So sánh từng môn: Toán 7 < 9, Văn 6 = 6, Anh 8 > 7 (giảm), Sử 9 < 10. Điểm Kì 2 cao hơn chỉ ở Toán và Sử.",
    B("Điểm trung bình", "điểm", lb4, ("Kì 1", k1), ("Kì 2", k2)))
add("toan6-b41", "Bài 41. Biểu đồ cột kép", 4, "Đọc, so sánh dữ liệu trên biểu đồ cột kép",
    ["Biểu đồ cột kép", "Đọc hai dãy số liệu", "So sánh hai dãy số liệu"], g)

# ================= Bài 42 =================
g = Gen(42)
g.q("T6-B42-001", "basic", "Gieo một con xúc xắc sáu mặt (hình bên). Có bao nhiêu kết quả có thể xảy ra về số chấm ở mặt trên?", "6", ["1", "2", "12"],
    "Mặt trên có thể có 1, 2, 3, 4, 5 hoặc 6 chấm nên có 6 kết quả có thể. Số 12 là nhầm với tổng số mặt của hai con xúc xắc.",
    dice_row([1, 2, 3, 4, 5, 6]))
g.q("T6-B42-002", "basic", "Tung một đồng xu một lần. Tập hợp các kết quả có thể xảy ra là", "mặt sấp, mặt ngửa", ["mặt sấp", "mặt ngửa", "mặt sấp, mặt ngửa, cạnh"],
    "Đồng xu chỉ có hai mặt nên kết quả có thể là mặt sấp hoặc mặt ngửa. Đồng xu rơi đứng trên cạnh không được tính.")
cols = [("đỏ", "#ef4444", 4), ("xanh", "#3b82f6", 3), ("vàng", "#facc15", 2)]
g.q("T6-B42-003", "basic", "Trong hộp có các quả bóng như hình, chỉ khác màu. Lấy ngẫu nhiên một quả bóng, các kết quả có thể về màu của quả bóng là", "đỏ, xanh, vàng", ["chỉ đỏ", "đỏ, xanh", "4, 3, 2"],
    "Hộp có ba màu bóng nên kết quả có thể là đỏ, xanh hoặc vàng. Các số 4, 3, 2 là số quả bóng từng màu, không phải kết quả.", box(cols))
cd = [1, 2, 3, 4, 5, 6, 7, 8]; ev = [x for x in cd if x % 3 == 0]; assert ev == [3, 6]
g.q("T6-B42-004", "application", "Rút ngẫu nhiên một thẻ trong 8 thẻ ghi số từ 1 đến 8 (hình bên). Sự kiện \"số trên thẻ chia hết cho 3\" xảy ra khi thẻ rút được ghi số nào?", "3 hoặc 6", ["3, 6 hoặc 9", "chỉ số 3", "6 hoặc 9"],
    "Trong các số 1 đến 8, chỉ 3 và 6 chia hết cho 3. Số 9 không có trong 8 thẻ nên không thể xảy ra.", cards(cd))
lab = list(range(1, 9)); pr = [x for x in lab if x in (2, 3, 5, 7)]; assert len(pr) == 4
g.q("T6-B42-005", "application", "Quay vòng quay có 8 ô bằng nhau ghi số 1 đến 8 (hình bên), mũi tên dừng ở một ô. Sự kiện \"mũi tên dừng ở ô ghi số nguyên tố\" xảy ra với bao nhiêu kết quả?", "4", ["3", "5", "8"],
    "Các số nguyên tố từ 1 đến 8 là 2, 3, 5, 7: có 4 kết quả. Số 1 không là số nguyên tố; 4, 6, 8 là hợp số.",
    spinner(lab, ["#bfdbfe", "#fde68a"]))
g.q("T6-B42-006", "application", "Gieo một con xúc xắc sáu mặt. Sự kiện \"mặt trên có số chấm là số chẵn\" xảy ra với bao nhiêu kết quả?", "3", ["2", "4", "6"],
    "Số chấm chẵn là 2, 4, 6 nên sự kiện này xảy ra với 3 kết quả (trong 6 kết quả có thể).", dice_row([1, 2, 3, 4, 5, 6]))
g.q("T6-B42-007", "advanced", "Lấy ngẫu nhiên một quả bóng trong hộp (hình bên). Sự kiện \"quả bóng lấy ra không phải màu đỏ\" xảy ra khi kết quả là", "xanh hoặc vàng", ["đỏ", "chỉ xanh", "đỏ hoặc xanh"],
    "Không phải màu đỏ nghĩa là màu xanh hoặc màu vàng. Đáp án \"chỉ xanh\" bỏ sót màu vàng.", box(cols))
dd = [x for x in range(1, 7) if 2 < x < 6]; assert dd == [3, 4, 5]
g.q("T6-B42-008", "advanced", "Gieo một con xúc xắc sáu mặt. Sự kiện \"số chấm lớn hơn 2 và nhỏ hơn 6\" xảy ra khi mặt trên có số chấm là", "3, 4 hoặc 5", ["2, 3, 4, 5 hoặc 6", "3, 4, 5 hoặc 6", "2, 3 hoặc 4"],
    "Cần số lớn hơn 2 và nhỏ hơn 6: các số 3, 4, 5. Số 2 và 6 không thỏa vì không có dấu bằng.", dice_row([1, 2, 3, 4, 5, 6]))
add("toan6-b42", "Bài 42. Kết quả có thể và sự kiện trong trò chơi, thí nghiệm", 5, "Kết quả có thể của trò chơi, thí nghiệm và sự kiện",
    ["Kết quả có thể", "Sự kiện trong trò chơi, thí nghiệm"], g)

# ================= Bài 43 =================
g = Gen(43)
ts = 9; n = 20
g.q("T6-B43-001", "basic", "Tung một đồng xu 20 lần, ghi kết quả như bảng. Xác suất thực nghiệm của sự kiện \"mặt sấp\" là", frs(Fr(ts, n)), [frs(Fr(n - ts, n)), frs(Fr(ts, n - ts)), frs(Fr(n, ts))],
    "Xác suất thực nghiệm = số lần sự kiện xảy ra : tổng số lần thực hiện = 9/20. Phân số 11/20 là xác suất thực nghiệm của mặt ngửa.",
    T("Kết quả 20 lần tung", ["Kết quả", "Mặt sấp", "Mặt ngửa"], [["Số lần", ts, n - ts]]))
cnt = [8, 12, 9, 11, 10, 10]; N = sum(cnt); assert N == 60
g.q("T6-B43-002", "basic", "Gieo một con xúc xắc 60 lần, ghi lại số lần xuất hiện mỗi mặt như bảng. Xác suất thực nghiệm của sự kiện \"xuất hiện mặt 2 chấm\" là", frs(Fr(cnt[1], N)), [frs(Fr(cnt[0], N)), frs(Fr(cnt[1], 6)), frs(Fr(1, 6))],
    "Mặt 2 chấm xuất hiện 12 lần trong 60 lần: 12/60 = 1/5. Phân số 1/6 là tỉ lệ lí thuyết, không phải kết quả thực nghiệm.",
    T("Số lần xuất hiện các mặt", ["Mặt"] + [str(i) for i in range(1, 7)], [["Số lần"] + cnt]))
tot = 50; red = 18
g.q("T6-B43-003", "basic", "Lấy ngẫu nhiên một quả bóng từ hộp, ghi màu rồi trả lại; làm 50 lần được kết quả như bảng. Xác suất thực nghiệm lấy được bóng đỏ là", frs(Fr(red, tot)), [frs(Fr(32, tot)), frs(Fr(red, 32)), frs(Fr(1, 3))],
    "Có 18 lần lấy được bóng đỏ trong 50 lần: 18/50 = 9/25. Phân số 32/50 là xác suất thực nghiệm lấy được bóng không đỏ.",
    T("Kết quả 50 lần lấy bóng", ["Màu", "Đỏ", "Xanh"], [["Số lần", red, tot - red]]))
sap = 27; tot = 50
g.q("T6-B43-004", "application", "Bạn Lan tung đồng xu 50 lần và được 23 lần mặt ngửa. Xác suất thực nghiệm của sự kiện \"mặt sấp\" là", frs(Fr(sap, tot)), [frs(Fr(23, tot)), frs(Fr(27, 23)), frs(Fr(1, 2))],
    "Số lần mặt sấp = 50 - 23 = 27 nên xác suất thực nghiệm là 27/50. Phân số 23/50 là của mặt ngửa.",
    T("Kết quả của Lan", ["Tổng số lần", "Mặt ngửa"], [[tot, 23]]))
cnt = [9, 11, 12, 8, 10, 10]; N = sum(cnt); odd = cnt[0] + cnt[2] + cnt[4]; assert (N, odd) == (60, 31)
g.q("T6-B43-005", "application", "Gieo một con xúc xắc 60 lần, ghi kết quả như bảng. Xác suất thực nghiệm của sự kiện \"số chấm là số lẻ\" là", frs(Fr(odd, N)), [frs(Fr(29, N)), frs(Fr(1, 2)), frs(Fr(31, 29))],
    "Số lần ra mặt lẻ (1, 3, 5 chấm) là 9 + 12 + 10 = 31 trong 60 lần: 31/60. Phân số 29/60 là của số chẵn.",
    T("Số lần xuất hiện các mặt", ["Mặt"] + [str(i) for i in range(1, 7)], [["Số lần"] + cnt]))
sp = [("Đỏ", 14), ("Xanh", 16), ("Vàng", 10)]; N = sum(v for _, v in sp); assert N == 40
g.q("T6-B43-006", "application", "Quay một vòng quay chia ba màu 40 lần, ghi kết quả như bảng. Xác suất thực nghiệm của sự kiện \"mũi tên dừng ở màu vàng\" là", frs(Fr(10, N)), [frs(Fr(14, N)), frs(Fr(16, N)), frs(Fr(1, 3))],
    "Màu vàng xuất hiện 10 lần trong 40 lần quay: 10/40 = 1/4. Các phân số 14/40 và 16/40 là của màu đỏ và màu xanh.",
    T("Kết quả 40 lần quay", ["Màu"] + [a for a, _ in sp], [["Số lần"] + [b for _, b in sp]]))
cnt = [5, 6, 8, 7, 6, 8]; N = sum(cnt); ge5 = cnt[4] + cnt[5]; assert (N, ge5) == (40, 14)
g.q("T6-B43-007", "advanced", "Mai gieo một con xúc xắc 40 lần, được kết quả như bảng. Xác suất thực nghiệm của sự kiện \"số chấm không nhỏ hơn 5\" là", frs(Fr(ge5, N)), [frs(Fr(8, N)), frs(Fr(6, N)), frs(Fr(26, N))],
    "Không nhỏ hơn 5 nghĩa là 5 hoặc 6 chấm: 6 + 8 = 14 lần trong 40 lần, tức 14/40 = 7/20. Phân số 26/40 là của các mặt từ 1 đến 4.",
    T("Kết quả 40 lần gieo", ["Mặt"] + [str(i) for i in range(1, 7)], [["Số lần"] + cnt]))
tot = 25; vao = 17; miss = tot - vao
g.q("T6-B43-008", "advanced", "Một cầu thủ sút phạt đền 25 lần, vào lưới 17 lần. Xác suất thực nghiệm của sự kiện \"cầu thủ sút không vào lưới\" là", frs(Fr(miss, tot)), [frs(Fr(vao, tot)), frs(Fr(miss, vao)), frs(Fr(1, 2))],
    "Số lần không vào là 25 - 17 = 8 nên xác suất thực nghiệm là 8/25. Phân số 17/25 là xác suất thực nghiệm của sự kiện sút vào.",
    T("Kết quả sút phạt đền", ["Kết quả", "Vào lưới", "Không vào"], [["Số lần", vao, "?"]]))
add("toan6-b43", "Bài 43. Xác suất thực nghiệm", 6, "Xác suất thực nghiệm của một sự kiện trong thí nghiệm, trò chơi",
    ["Xác suất thực nghiệm", "Số lần sự kiện xảy ra : tổng số lần thực hiện"], g)

# ================= Ôn tập =================
g = Gen(44)
g.q("T6-C9-R01", "basic", "Trong bảng khảo sát, dữ liệu nào KHÔNG phải là số liệu?", "Màu sắc yêu thích", ["Số anh chị em", "Số giờ ngủ mỗi ngày", "Số tiền tiết kiệm (nghìn đồng)"],
    "Số liệu là dữ liệu dạng số. Màu sắc yêu thích là dữ liệu không phải là số.",
    T("Kết quả khảo sát", ["Bạn", "Màu thích", "Anh chị em", "Giờ ngủ", "Tiết kiệm"], [["An", "Xanh", 1, 9, 50], ["Bình", "Đỏ", 2, 8, 30]]))
pc = [("Thứ Hai", 3), ("Thứ Ba", 5), ("Thứ Tư", 2), ("Thứ Năm", 4)]
g.q("T6-C9-R02", "basic", "Biểu đồ tranh cho biết số cuốn sách bán được (mỗi biểu tượng = 10 cuốn). Thứ Năm bán được bao nhiêu cuốn?", str(dict(pc)["Thứ Năm"] * 10), ["4", "20", "50"],
    "Thứ Năm có 4 biểu tượng, mỗi biểu tượng là 10 cuốn nên 4 × 10 = 40 (cuốn).", pict("Sách bán được", pc, 10, "cuốn"))
lb = ["Cam", "Táo", "Xoài", "Ổi"]; v = [16, 24, 20, 12]
g.q("T6-C9-R03", "basic", "Biểu đồ cột cho biết số kilôgam trái cây bán được. Loại nào bán được nhiều nhất?", "Táo", ["Cam", "Xoài", "Ổi"],
    "Cột Táo cao nhất (24 kg) nên táo bán được nhiều nhất.", B("Trái cây bán được", "kg", lb, (None, v)))
lb = ["6A", "6B", "6C"]; a = [20, 18, 25]; b = [24, 18, 22]; assert sum(b) - sum(a) == 1
g.q("T6-C9-R04", "application", "Biểu đồ cột kép cho biết số học sinh giỏi ở hai học kì của ba lớp 6. Tổng số học sinh giỏi của ba lớp ở Học kì 2 nhiều hơn ở Học kì 1 bao nhiêu bạn?", "1", ["2", "4", "64"],
    "Học kì 1: 20 + 18 + 25 = 63; Học kì 2: 24 + 18 + 22 = 64. Chênh lệch 64 - 63 = 1 (bạn); 64 chỉ là tổng của Học kì 2.", B("Học sinh giỏi", "bạn", lb, ("Học kì 1", a), ("Học kì 2", b)))
cnt = [7, 9, 4]; N = sum(cnt)
g.q("T6-C9-R05", "application", "Lấy ngẫu nhiên một quả bóng từ túi rồi trả lại, làm 20 lần, kết quả như bảng. Xác suất thực nghiệm lấy được bóng xanh là", frs(Fr(cnt[1], N)), [frs(Fr(7, N)), frs(Fr(4, N)), frs(Fr(1, 3))],
    "Bóng xanh được lấy 9 lần trong 20 lần: xác suất thực nghiệm 9/20. Tổng số lần là 7 + 9 + 4 = 20.",
    T("Kết quả 20 lần lấy bóng", ["Màu", "Đỏ", "Xanh", "Vàng"], [["Số lần", 7, 9, 4]]))
g.q("T6-C9-R06", "application", "Quay vòng quay có 8 ô bằng nhau ghi số 1 đến 8 (hình bên). Sự kiện \"mũi tên dừng ở ô ghi số chia hết cho 4\" xảy ra với bao nhiêu kết quả?", "2", ["1", "3", "4"],
    "Trong các số 1 đến 8, chỉ 4 và 8 chia hết cho 4: có 2 kết quả.", spinner(list(range(1, 9)), ["#bbf7d0", "#fecaca"]))
rows = [("Cam", 18), ("Táo", 25), ("Chuối", 12)]; need = 70 - sum(v for _, v in rows); assert need == 15
g.q("T6-C9-R07", "advanced", "Tổng số kilôgam trái cây bán trong ngày là 70 kg gồm 4 loại; bảng cho số kilôgam của ba loại, loại còn lại là nho. Nho bán được bao nhiêu kilôgam?", str(need), ["55", "25", "12"],
    "Nho = 70 - (18 + 25 + 12) = 70 - 55 = 15 (kg). Số 55 là tổng ba loại đã biết.",
    T("Trái cây bán trong ngày", ["Loại", "Cam", "Táo", "Chuối", "Nho"], [["Số kg", 18, 25, 12, "?"]]))
lb = ["Q1", "Q2", "Q3", "Q4"]; n1 = [12, 15, 10, 18]; n2 = [14, 12, 13, 15]
dif = [x - y for x, y in zip(n1, n2)]; mxl = lb[[abs(d) for d in dif].index(max(abs(d) for d in dif))]; assert sum(n1) == 55 and sum(n2) == 54
g.q("T6-C9-R08", "advanced", "Biểu đồ cột kép cho biết số bạn tham gia hoạt động của Nhóm A và Nhóm B theo từng quý. Nhóm A hơn Nhóm B bao nhiêu bạn trong cả 4 quý?", "1", ["3", "55", "109"],
    "Nhóm A: 12 + 15 + 10 + 18 = 55; Nhóm B: 14 + 12 + 13 + 15 = 54. Nhóm A hơn 55 - 54 = 1 (bạn). Số 109 là tổng của cả hai nhóm.",
    B("Số bạn tham gia", "bạn", lb, ("Nhóm A", n1), ("Nhóm B", n2)))
add("toan6_ch9", None, None, None, None, g, review=True)

write(os.path.join(HERE, 'ch9.json'), batches)
print('ok', sum(len(b['questions']) for b in batches))
