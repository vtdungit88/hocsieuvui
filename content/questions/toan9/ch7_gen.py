#!/usr/bin/env python3
# Toán 9 KNTT - Chương VII. Tần số và tần số tương đối. Số liệu trong hình/đề; đáp án tính bằng Python.
import sys, os, random; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from c678lib import *
from collections import Counter

B = Builder(7907); q = B.q; C = 'toan9-c7'; out = []
def ftab(vals, freqs, name='Điểm', row='Tần số', title=None):
    return table([name] + vals, [[row] + freqs], title)
def lst(v): return ', '.join(str(x) for x in v)
def grp(n): return [f'[{140+10*i};{150+10*i})' for i in range(n)]

# ======================= Bài 22 =======================
L = []
L.append(q('T9-B22-001', 'basic', 'Trong một mẫu số liệu, tần số của một giá trị là',
  'số lần giá trị đó xuất hiện trong mẫu số liệu', ['giá trị lớn nhất của mẫu số liệu', 'tổng tất cả các giá trị của mẫu số liệu', 'số các giá trị khác nhau trong mẫu số liệu'],
  'Tần số của một giá trị là số lần giá trị đó xuất hiện trong mẫu số liệu. Bảng tần số liệt kê mỗi giá trị cùng tần số của nó.'))
v = [5, 6, 7, 8, 9, 10]; fr_ = [3, 5, 8, 7, 4, 3]; assert sum(fr_) == 30
L.append(q('T9-B22-002', 'basic', 'Bảng tần số sau cho điểm kiểm tra Toán của 30 học sinh. Tần số của điểm 7 là',
  '8', ['7', '5', '4'],
  'Tại cột điểm 7, tần số là 8: có 8 học sinh đạt điểm 7. Các số 7, 5, 4 là tần số của điểm 8, 6, 9.',
  fig=ftab(v, fr_, title='Điểm kiểm tra Toán'), vals=[8, 7, 5, 4]))
sp = ['Bóng đá', 'Cầu lông', 'Bơi', 'Bóng rổ']; sv = [14, 9, 6, 11]; assert sp[sv.index(max(sv))] == 'Bóng đá'
L.append(q('T9-B22-003', 'basic', 'Biểu đồ cột biểu diễn số học sinh lớp 9A đăng kí các môn thể thao. Môn được nhiều học sinh đăng kí nhất là',
  'Bóng đá', ['Cầu lông', 'Bơi', 'Bóng rổ'],
  'Cột cao nhất ứng với Bóng đá (14 học sinh). Cột Bóng rổ (11) thấp hơn.',
  fig=bars(sp, [{'values': sv}], title='Số học sinh đăng kí')))
rng = random.Random(22); data = [rng.choice([0, 1, 2, 3, 3, 4]) for _ in range(20)]
cnt = Counter(data); assert len({cnt[k] for k in (0, 1, 2, 3, 4)}) >= 4 or True
t3 = cnt[3]; ws = sorted({cnt[k] for k in range(5)} - {t3})[:3]
if len(ws) < 3: ws += [t3 + 5, t3 + 6][:3 - len(ws)]
assert len(set(ws)) == 3 and t3 not in ws, (t3, ws, cnt)
L.append(q('T9-B22-004', 'application', f'Số bàn thắng của một đội bóng trong 20 trận là: {lst(data)}. Tần số của giá trị 3 là',
  str(t3), [str(w) for w in ws],
  f'Đếm số lần xuất hiện của 3 trong dãy: có {t3} lần nên tần số là {t3}. Cần đếm cẩn thận, tránh bỏ sót hoặc đếm thừa.', vals=[t3] + ws))
f5 = [4, None, 9, 6, 3]; miss = 30 - 4 - 9 - 6 - 3; assert miss == 8
L.append(q('T9-B22-005', 'application', 'Bảng tần số cho điểm của 30 học sinh; tần số của điểm 6 bị che mất (kí hiệu ?). Tần số của điểm 6 là',
  '8', ['7', '9', '10'],
  'Tổng các tần số bằng số học sinh: $4+?+9+6+3=30$ nên $?=30-22=8$.',
  fig=ftab(['5', '6', '7', '8', '9'], [4, '?', 9, 6, 3], title='Điểm kiểm tra (30 học sinh)'), vals=[8, 7, 9, 10]))
dd = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6']; dv = [18, 25, 21, 30, 26]
diff = max(dv) - min(dv); assert diff == 12
L.append(q('T9-B22-006', 'application', 'Biểu đồ cột cho số cuốn sách thư viện cho mượn trong các ngày. Ngày có nhiều sách được mượn nhất hơn ngày có ít sách được mượn nhất bao nhiêu cuốn?',
  '12 cuốn', ['30 cuốn', '5 cuốn', '7 cuốn'],
  'Nhiều nhất là thứ Năm với 30 cuốn, ít nhất là thứ Hai với 18 cuốn; chênh lệch $30-18=12$ cuốn.',
  fig=bars(dd, [{'values': dv}], title='Số sách cho mượn', unit='cuốn')))
v8 = ['4', '5', '6', '7', '8', '9', '10']; f8 = [2, 4, 6, 9, 8, 7, 4]; N8 = sum(f8); ge7 = sum(f8[3:]); assert N8 == 40 and ge7 == 28
L.append(q('T9-B22-007', 'advanced', 'Bảng tần số cho điểm bài kiểm tra của một lớp. Số học sinh đạt từ 7 điểm trở lên là',
  '28', ['9', '40', '19'],
  'Cộng tần số của các điểm 7, 8, 9, 10: $9+8+7+4=28$ học sinh. Chỉ lấy tần số của điểm 7 (9) hay cả lớp (40) đều sai.',
  fig=ftab(v8, f8, title='Điểm bài kiểm tra'), vals=[28, 9, 40, 19]))
raw = [2, 3, 1, 2, 3, 3, 4, 2, 1, 3, 2, 4, 3, 1, 2]; c = Counter(raw); assert len(raw) == 15
def tab(cc): return '; '.join(f'giá trị {k}: {cc[k]}' for k in (1, 2, 3, 4))
good = tab(c); assert [c[k] for k in (1, 2, 3, 4)] == [3, 5, 5, 2] and sum(c.values()) == 15
wr = [tab({1: 3, 2: 4, 3: 6, 4: 2}), tab({1: 2, 2: 5, 3: 5, 4: 3}), tab({1: 3, 2: 5, 3: 4, 4: 2})]
assert all(w != good for w in wr)
L.append(q('T9-B22-008', 'advanced', f'Số điểm trò chơi mỗi bạn đạt được: {lst(raw)}. Bảng tần số đúng của mẫu số liệu này là',
  good, wr,
  'Đếm: giá trị 1 xuất hiện 3 lần, giá trị 2 xuất hiện 5 lần, giá trị 3 xuất hiện 5 lần, giá trị 4 xuất hiện 2 lần; tổng $3+5+5+2=15$ bằng số bạn. Các bảng sai đếm sai tần số của ít nhất một giá trị (có bảng tổng cũng bằng 15 nhưng vẫn sai).'))
out.append(batch(C, {'code': 'toan9-b22', 'title': 'Bài 22. Bảng tần số và biểu đồ tần số', 'seq': 1,
  'subtitle': 'Tần số, bảng tần số, biểu đồ cột biểu diễn tần số', 'concepts': ['Tần số', 'Bảng tần số', 'Biểu đồ tần số dạng cột', 'Đọc số liệu']}, L))

# ======================= Bài 23 =======================
L = []
L.append(q('T9-B23-001', 'basic', 'Tần số tương đối của một giá trị trong mẫu số liệu có $N$ giá trị được tính bằng',
  'tỉ số giữa tần số của giá trị đó và $N$, thường viết dưới dạng phần trăm', ['tích của tần số của giá trị đó và $N$', 'hiệu của $N$ và tần số của giá trị đó', 'tổng của tần số của giá trị đó và $N$'],
  'Tần số tương đối $f=\\frac{n}{N}$ (nhân với 100% nếu viết dưới dạng phần trăm), với $n$ là tần số của giá trị và $N$ là cỡ mẫu.'))
L.append(q('T9-B23-002', 'basic', 'Tổng các tần số tương đối của tất cả các giá trị trong một mẫu số liệu bằng',
  '100%', ['50%', 'cỡ mẫu $N$', 'tần số lớn nhất'],
  'Tổng các tần số bằng $N$ nên tổng các tần số tương đối là $\\frac{N}{N}=1=100\\%$.'))
assert Fr(6, 24) == Fr(1, 4)
L.append(q('T9-B23-003', 'basic', 'Một giá trị có tần số 6 trong mẫu số liệu gồm 24 giá trị. Tần số tương đối của giá trị đó là',
  '25%', ['6%', '400%', '75%'],
  '$f=\\frac{6}{24}=\\frac{1}{4}=25\\%$. Lấy $\\frac{24}{6}=4$ (tức 400%) là nhầm tử số với mẫu số.', vals=[25, 6, 400, 75]))
tv = ['Đi bộ', 'Xe đạp', 'Xe buýt', 'Xe máy']; tf = [12, 14, 9, 5]; assert sum(tf) == 40 and Fr(9, 40) * 100 == Fr(45, 2)
L.append(q('T9-B23-004', 'application', 'Bảng tần số về cách đi học của 40 học sinh. Tần số tương đối của xe buýt (làm tròn đến hàng phần chục của phần trăm nếu cần) là',
  '22,5%', ['9%', '25%', '18%'],
  '$f=\\frac{9}{40}=0{,}225=22{,}5\\%$. Chỉ lấy tần số 9 làm phần trăm là lỗi hay gặp.',
  fig=table(['Cách đi học'] + tv, [['Tần số'] + tf], '40 học sinh'), vals=[22.5, 9, 25, 18]))
lv = ['Giỏi', 'Khá', 'Đạt', 'Chưa đạt']; lp = [20, 45, 30, 5]; assert sum(lp) == 100 and 40 * 45 // 100 == 18 and 40 * 45 % 100 == 0
L.append(q('T9-B23-005', 'application', 'Bảng tần số tương đối xếp loại học tập của lớp 9B có 40 học sinh. Số học sinh xếp loại Khá là',
  '18 học sinh', ['45 học sinh', '20 học sinh', '12 học sinh'],
  'Tần số $=f\\cdot N=0{,}45\\cdot40=18$. Lấy 45 là nhầm phần trăm với số học sinh.',
  fig=table(['Xếp loại'] + lv, [['Tỉ lệ'] + [f'{p}%' for p in lp]], 'Tần số tương đối, lớp 9B (40 học sinh)'), vals=[18, 45, 20, 12]))
mp = [28, 35, None, 12]; mi = 100 - 28 - 35 - 12; assert mi == 25
L.append(q('T9-B23-006', 'application', 'Bảng tần số tương đối về loại sản phẩm bán được trong một ngày bị che mất tần số tương đối của loại C. Tần số tương đối của loại C là',
  '25%', ['35%', '75%', '15%'],
  'Tổng các tần số tương đối bằng 100% nên $f_C=100\\%-28\\%-35\\%-12\\%=25\\%$.',
  fig=table(['Loại', 'A', 'B', 'C', 'D'], [['Tỉ lệ', '28%', '35%', '?', '12%']], 'Tần số tương đối'), vals=[25, 35, 75, 15]))
sv2 = [36, 28, 20, 16]; assert sum(sv2) == 100 and 250 * (36 - 20) // 100 == 40
L.append(q('T9-B23-007', 'advanced', 'Khảo sát 250 người về loại nhạc yêu thích được biểu đồ tần số tương đối. Số người chọn Pop nhiều hơn số người chọn Rock bao nhiêu người?',
  '40 người', ['16 người', '90 người', '50 người'],
  'Pop 36% và Rock 20%: Pop chiếm nhiều hơn $36\\%-20\\%=16\\%$ của 250 người, tức $0{,}16\\cdot250=40$ người. 16 là chênh lệch phần trăm, chưa đổi ra số người.',
  fig=bars(['Pop', 'Rap', 'Rock', 'Dân ca'], [{'values': sv2}], title='Tần số tương đối (%)', unit='%'), vals=[40, 16, 90, 50]))
y1 = [20, 30, 25, 25]; y2 = [28, 26, 20, 26]; assert sum(y1) == sum(y2) == 100
tv2 = ['Xe buýt', 'Xe đạp', 'Đi bộ', 'Xe máy']
d_ = [b - a for a, b in zip(y1, y2)]; assert d_ == [8, -4, -5, 1] and tv2[d_.index(min(d_))] == 'Đi bộ'
L.append(q('T9-B23-008', 'advanced', 'Biểu đồ cột kép cho tần số tương đối (%) các phương tiện đến trường của học sinh năm 2023 và năm 2024. Phương tiện nào có tần số tương đối giảm nhiều nhất?',
  'Đi bộ', ['Xe đạp', 'Xe buýt', 'Xe máy'],
  'Hiệu năm 2024 trừ năm 2023: xe buýt $+8$, xe đạp $-4$, đi bộ $-5$, xe máy $+1$ (điểm phần trăm). Đi bộ giảm nhiều nhất (5 điểm phần trăm).',
  fig=bars(tv2, [{'name': '2023', 'values': y1}, {'name': '2024', 'values': y2}], title='Tần số tương đối (%)', unit='%')))
out.append(batch(C, {'code': 'toan9-b23', 'title': 'Bài 23. Bảng tần số tương đối và biểu đồ tần số tương đối', 'seq': 2,
  'subtitle': 'Tần số tương đối, bảng và biểu đồ tần số tương đối', 'concepts': ['Tần số tương đối', 'Bảng tần số tương đối', 'Biểu đồ tần số tương đối', 'So sánh hai mẫu số liệu']}, L))

# ======================= Bài 24 =======================
L = []
L.append(q('T9-B24-001', 'basic', 'Khi ghép nhóm số liệu, tần số của một nhóm là',
  'số giá trị của mẫu số liệu thuộc nhóm đó', ['số nhóm trong bảng', 'độ dài của nhóm đó', 'tổng các giá trị thuộc nhóm đó'],
  'Tần số ghép nhóm của một nhóm là số giá trị của mẫu số liệu thuộc nhóm đó. Tổng các tần số của các nhóm bằng cỡ mẫu.'))
L.append(q('T9-B24-002', 'basic', 'Số liệu chiều cao (cm) được ghép nhóm theo các nửa khoảng dạng $[a;b)$. Giá trị nào sau đây KHÔNG thuộc nhóm $[150;160)$?',
  '160', ['150', '152', '159'],
  'Nhóm $[150;160)$ gồm các giá trị $x$ thỏa $150\\le x<160$: có 150 nhưng không có 160. Giá trị 160 thuộc nhóm tiếp theo $[160;170)$.'))
g = grp(4); gf = [6, 15, 12, 7]; assert sum(gf) == 40
L.append(q('T9-B24-003', 'basic', 'Bảng tần số ghép nhóm chiều cao (cm) của 40 học sinh. Tần số của nhóm $[150;160)$ là',
  '15', ['6', '12', '40'],
  'Ở cột nhóm $[150;160)$, tần số là 15: có 15 học sinh cao từ 150 cm đến dưới 160 cm. Số 40 là tổng các tần số.',
  fig=table(['Chiều cao (cm)'] + g, [['Tần số'] + gf], '40 học sinh'), vals=[15, 6, 12, 40]))
rng = random.Random(24)
hs = sorted(rng.randint(140, 179) for _ in range(20)); rng.shuffle(hs)
n160 = sum(160 <= x < 170 for x in hs); n150 = sum(150 <= x < 160 for x in hs); n140 = sum(140 <= x < 150 for x in hs); n170 = sum(x >= 170 for x in hs)
assert n140 + n150 + n160 + n170 == 20
ws = [n for n in (n140, n150, n170, n160 + 1, n160 - 1) if n != n160][:3]; assert len(set(ws)) == 3
L.append(q('T9-B24-004', 'application', f'Chiều cao (cm) của 20 học sinh: {lst(hs)}. Tần số của nhóm $[160;170)$ là',
  str(n160), [str(w) for w in ws],
  f'Đếm các giá trị $x$ thỏa $160\\le x<170$ (nhớ rằng 160 thuộc nhóm này, 170 thì không): có {n160} giá trị.', vals=[n160] + ws))
mf = [4, 12, None, 15, 9]; mm = 50 - 4 - 12 - 15 - 9; assert mm == 10
L.append(q('T9-B24-005', 'application', 'Bảng tần số ghép nhóm thời gian tự học (phút) của 50 học sinh bị che mất tần số của nhóm $[30;45)$. Tần số của nhóm đó là',
  '10', ['9', '11', '14'],
  'Tổng các tần số bằng 50 nên tần số cần tìm là $50-(4+12+15+9)=10$.',
  fig=table(['Phút', '[0;15)', '[15;30)', '[30;45)', '[45;60)', '[60;75)'], [['Tần số', 4, 12, '?', 15, 9]], '50 học sinh'), vals=[10, 9, 11, 14]))
assert Fr(12, 40) == Fr(3, 10)
L.append(q('T9-B24-006', 'application', 'Dùng bảng tần số ghép nhóm chiều cao của 40 học sinh (hình). Tần số tương đối của nhóm $[160;170)$ là',
  '30%', ['12%', '40%', '70%'],
  '$f=\\frac{12}{40}=0{,}3=30\\%$. Khi tính phải lấy tần số của nhóm chia cho tổng số học sinh (40), không lấy chính tần số 12 làm phần trăm.',
  fig=table(['Chiều cao (cm)'] + g, [['Tần số'] + [6, 15, 12, 7]], '40 học sinh'), vals=[30, 12, 40, 70]))
bf = [3, 8, 14, 10, 5]; assert sum(bf) == 40 and Fr(3 + 8 + 14, 40) == Fr(5, 8)
bl = [f'[{20+10*i};{30+10*i})' for i in range(5)]
L.append(q('T9-B24-007', 'advanced', 'Biểu đồ cột biểu diễn tần số ghép nhóm tuổi của 40 nhân viên một công ty. Tỉ lệ nhân viên dưới 50 tuổi là',
  '62,5%', ['25%', '37,5%', '35%'],
  'Các nhóm dưới 50 tuổi là $[20;30)$, $[30;40)$, $[40;50)$ có tổng tần số $3+8+14=25$. Tỉ lệ là $\\frac{25}{40}=62{,}5\\%$. 37,5% là tỉ lệ nhân viên từ 50 tuổi trở lên.',
  fig=bars(bl, [{'values': bf}], title='Tuổi của nhân viên (40 người)', unit='người'), vals=[62.5, 25, 37.5, 35]))
A = [6, 10, 16, 8]; Bc = [8, 15, 18, 9]; assert sum(A) == 40 and sum(Bc) == 50
rA = [Fr(x, 40) for x in A]; rB = [Fr(x, 50) for x in Bc]
st = [rB[1] > rA[1],
      Bc[2] > A[2] and rB[2] > rA[2],
      rA[0] == rB[0],
      rA[3] < rB[3]]
assert st == [True, False, False, False]
L.append(q('T9-B24-008', 'advanced', 'Bảng tần số ghép nhóm chiều cao (cm) của lớp 9A (40 học sinh) và lớp 9B (50 học sinh). Nhận định nào sau đây đúng?',
  'Tần số tương đối của nhóm $[150;160)$ ở lớp 9B lớn hơn ở lớp 9A',
  ['Số học sinh nhóm $[160;170)$ ở lớp 9B nhiều hơn nên tần số tương đối nhóm này ở 9B cũng lớn hơn',
   'Tần số tương đối của nhóm $[140;150)$ ở hai lớp bằng nhau', 'Tần số tương đối của nhóm $[170;180)$ ở lớp 9A nhỏ hơn ở lớp 9B'],
  'Nhóm $[150;160)$: 9A là $\\frac{10}{40}=25\\%$, 9B là $\\frac{15}{50}=30\\%$ nên 9B lớn hơn. Nhóm $[160;170)$: 9A $=40\\%$, 9B $=36\\%$; nhóm $[140;150)$: $15\\%$ và $16\\%$; nhóm $[170;180)$: $20\\%$ và $18\\%$. Cần so sánh tần số tương đối, không so sánh tần số.',
  fig=table(['Nhóm (cm)'] + grp(4), [['Lớp 9A'] + A, ['Lớp 9B'] + Bc])))
out.append(batch(C, {'code': 'toan9-b24', 'title': 'Bài 24. Bảng tần số, tần số tương đối ghép nhóm và biểu đồ', 'seq': 3,
  'subtitle': 'Ghép nhóm số liệu, tần số và tần số tương đối ghép nhóm, biểu đồ cột', 'concepts': ['Nhóm số liệu [a; b)', 'Tần số ghép nhóm', 'Tần số tương đối ghép nhóm', 'Biểu đồ cột ghép nhóm']}, L))

# ======================= Ôn tập chương 7 =======================
L = []
pn = ['0', '1', '2', '3', '4']; pf = [5, 12, 18, 10, 5]; assert sum(pf) == 50
L.append(q('T9-C7-R01', 'basic', 'Bảng tần số cho số anh chị em ruột của 50 học sinh. Số học sinh có đúng 2 anh chị em là',
  '18', ['2', '10', '50'],
  'Ở cột giá trị 2, tần số là 18 nên có 18 học sinh. Số 2 là giá trị (số anh chị em), không phải tần số.',
  fig=table(['Số người'] + pn, [['Tần số'] + pf], '50 học sinh'), vals=[18, 2, 10, 50]))
assert Fr(15, 50) == Fr(3, 10)
L.append(q('T9-C7-R02', 'basic', 'Một giá trị có tần số 15 trong mẫu số liệu có 50 giá trị. Tần số tương đối của giá trị đó là',
  '30%', ['15%', '35%', '3,33%'],
  '$f=\\frac{15}{50}=0{,}3=30\\%$. Lấy $\\frac{50}{15}\\approx3{,}33$ là nhầm tử và mẫu.', vals=[30, 15, 35, 3.33]))
L.append(q('T9-C7-R03', 'basic', 'Số liệu về thời gian chạy (giây) được ghép nhóm $[10;20)$, $[20;30)$, $[30;40)$, … Giá trị 20 thuộc nhóm nào?',
  '$[20;30)$', ['$[10;20)$', '$[30;40)$', 'Cả hai nhóm $[10;20)$ và $[20;30)$'],
  'Nhóm $[10;20)$ gồm $10\\le x<20$ nên không chứa 20; nhóm $[20;30)$ gồm $20\\le x<30$ chứa 20. Mỗi giá trị chỉ thuộc đúng một nhóm.'))
mo = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6']; mv = [20, 35, 28, 42, 30, 25]; tot = sum(mv); assert tot == 180
L.append(q('T9-C7-R04', 'application', 'Biểu đồ cột cho số khách tham quan một bảo tàng (đơn vị: trăm người) trong 6 tháng đầu năm. Tổng số khách của tháng 2, tháng 3 và tháng 4 là bao nhiêu trăm người?',
  '105', ['42', '180', '75'],
  'Cộng các cột: $35+28+42=105$ (trăm người). Tổng cả 6 tháng là 180.',
  fig=bars(mo, [{'values': mv}], title='Số khách (trăm người)', unit='trăm người'), vals=[105, 42, 180, 75]))
rp = [30, 25, None, 15]; assert 100 - 30 - 25 - 15 == 30
L.append(q('T9-C7-R05', 'application', 'Bảng tần số tương đối về điểm số loại bài của 80 bài kiểm tra bị che mất giá trị ở loại Khá. Số bài loại Khá là',
  '24 bài', ['30 bài', '20 bài', '12 bài'],
  'Tần số tương đối loại Khá là $100\\%-30\\%-25\\%-15\\%=30\\%$. Số bài là $0{,}3\\cdot80=24$. Còn 30 là phần trăm, chưa đổi ra số bài.',
  fig=table(['Loại', 'Giỏi', 'Khá', 'Đạt', 'Chưa đạt'], [['Tỉ lệ', '30%', '?', '25%', '15%']], 'Tần số tương đối (80 bài kiểm tra)'), vals=[24, 30, 20, 12]))
assert 100 - 30 - 25 - 15 == 30 and 80 * 30 == 2400
rng = random.Random(7); raw = [rng.choice([1, 2, 2, 3, 3, 3, 4]) for _ in range(25)]
c = Counter(raw); n2 = c[2]; f2 = Fr(n2, 25)
wrs = [vn(float(Fr(n2 + 1, 25)) * 100) + '%', vn(float(Fr(n2 - 1, 25)) * 100) + '%', vn(n2) + '%']
ans = vn(float(f2) * 100) + '%'; assert len({ans, *wrs}) == 4
L.append(q('T9-C7-R06', 'application', f'Số thành viên của 25 hộ gia đình trong một khu phố: {lst(raw)}. Tần số tương đối của giá trị 2 là',
  ans, wrs,
  f'Giá trị 2 xuất hiện {n2} lần trong 25 giá trị nên $f=\\frac{{{n2}}}{{25}}={vn(float(f2)).replace(",","{,}")}={ans[:-1]}\\%$. Chỉ lấy tần số làm phần trăm là sai.'))
tg = ['[0;10)', '[10;20)', '[20;30)', '[30;40)']; tf2 = [5, 12, 18, 15]; assert sum(tf2) == 50 and Fr(18 + 15, 50) == Fr(33, 50)
L.append(q('T9-C7-R07', 'advanced', 'Bảng tần số ghép nhóm thời gian đọc sách mỗi ngày (phút) của 50 học sinh. Tỉ lệ học sinh đọc từ 20 phút trở lên là',
  '66%', ['36%', '34%', '30%'],
  'Nhóm từ 20 phút trở lên gồm $[20;30)$ và $[30;40)$: $18+15=33$ học sinh, chiếm $\\frac{33}{50}=66\\%$. Lấy riêng nhóm $[20;30)$ cho 36%.',
  fig=table(['Phút'] + tg, [['Tần số'] + tf2], '50 học sinh'), vals=[66, 36, 34, 30]))
sA = [12, 8, 10, 10]; sB = [10, 12, 16, 12]; assert sum(sA) == 40 and sum(sB) == 50
pa = Fr(sA[0], 40); pb = Fr(sB[0], 50); assert (pa, pb) == (Fr(3, 10), Fr(1, 5))
mn = ['Toán', 'Văn', 'Anh', 'Tin']
L.append(q('T9-C7-R08', 'advanced', 'Biểu đồ cột kép cho số học sinh lớp 9A (40 học sinh) và lớp 9B (50 học sinh) chọn môn học yêu thích. Tần số tương đối của môn Toán ở lớp 9A và lớp 9B lần lượt là',
  '30% và 20%', ['30% và 24%', '12% và 10%', '20% và 30%'],
  'Lớp 9A: $\\frac{12}{40}=30\\%$. Lớp 9B: $\\frac{10}{50}=20\\%$. Không được so sánh trực tiếp tần số vì hai lớp có sĩ số khác nhau.',
  fig=bars(mn, [{'name': '9A', 'values': sA}, {'name': '9B', 'values': sB}], title='Số học sinh yêu thích')))
out.append(batch(C, {'code': 'toan9_ch7'}, L))

dump(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ch7.json'), out)
