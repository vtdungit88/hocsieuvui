#!/usr/bin/env python3
# Toán 9 KNTT - Chương VI. Hàm số y=ax² và phương trình bậc hai một ẩn. Đáp án tính bằng Fraction/assert.
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from c678lib import *

B = Builder(6906); q = B.q; C = 'toan9-c6'; out = []
def P(*a): return "$(%s;%s)$" % (ft(a[0]), ft(a[1]))

# ======================= Bài 18 =======================
L = []
L.append(q('T9-B18-001', 'basic', 'Hàm số nào sau đây có dạng $y=ax^2$ với $a\\neq0$?',
  '$y=-3x^2$', ['$y=3x+2$', '$y=x^3$', '$y=2x^2+x$'],
  'Hàm số $y=ax^2$ ($a\\neq0$) không có số hạng bậc nhất hay hằng số. $y=-3x^2$ có $a=-3$; $y=2x^2+x$ còn thêm số hạng $x$.'))
L.append(q('T9-B18-002', 'basic', 'Đồ thị của hàm số $y=ax^2$ ($a\\neq0$) là',
  'một đường parabol có đỉnh là gốc tọa độ O và nhận trục Oy làm trục đối xứng',
  ['một đường thẳng đi qua gốc tọa độ O', 'một đường parabol có đỉnh là O và nhận trục Ox làm trục đối xứng', 'một đường parabol có đỉnh là điểm $(0;a)$ và nhận trục Oy làm trục đối xứng'],
  'Đồ thị $y=ax^2$ là parabol đỉnh O, đối xứng qua Oy vì $f(-x)=f(x)$. Đường thẳng là đồ thị của hàm bậc nhất.'))
f = lambda x: 3 * x * x
cands = [(-2, 12), (2, 6), (-2, -12), (1, 9)]
assert [f(x) == y for x, y in cands] == [True, False, False, False]
L.append(q('T9-B18-003', 'basic', 'Đồ thị của hàm số $y=3x^2$ đi qua điểm nào sau đây?',
  P(-2, 12), [P(2, 6), P(-2, -12), P(1, 9)],
  'Thay $x=-2$: $y=3\\cdot4=12$ nên điểm $(-2;12)$ thuộc đồ thị. Các điểm còn lại đều sai tung độ (nhầm $x^2$ với $2x$ hoặc quên bình phương).'))
a = Fr(-2) / 4; assert a == Fr(-1, 2) and a * 2 * 2 == -2
fg = graph([(lambda x: -x * x / 2, '#2563eb')], (-4, 4), (-8, 1), 24, marks=[(2, -2, 'A', 8, 16, True)])
L.append(q('T9-B18-004', 'application', 'Hình vẽ là đồ thị của hàm số $y=ax^2$, đi qua điểm $A(2;-2)$. Hệ số $a$ bằng',
  fx(Fr(-1, 2)), [fx(Fr(1, 2)), fx(-2), fx(-4)],
  'Thay $x=2,y=-2$ vào $y=ax^2$: $-2=4a$ nên $a=-\\frac{1}{2}$. Đồ thị nằm phía dưới trục hoành, khớp với $a<0$. Nhầm $x^2=2$ cho $a=-1$ là lỗi hay gặp.',
  fig=fg, vals=[Fr(-1, 2), Fr(1, 2), -2, -4]))
L.append(q('T9-B18-005', 'application', 'Với giá trị nào của $m$ thì hàm số $y=(m-2)x^2$ đồng biến khi $x>0$ (và nghịch biến khi $x<0$)?',
  '$m>2$', ['$m<2$', '$m\\neq2$', '$m>0$'],
  'Hàm số $y=ax^2$ đồng biến khi $x>0$ nếu $a>0$. Ở đây $a=m-2>0$ nên $m>2$. $m\\neq2$ chỉ đảm bảo đó là hàm số dạng $ax^2$.'))
L.append(q('T9-B18-006', 'application', 'Cho hàm số $y=-\\frac{1}{2}x^2$. Phát biểu nào sau đây đúng?',
  'Hàm số có giá trị lớn nhất bằng 0, đạt được khi $x=0$',
  ['Hàm số có giá trị nhỏ nhất bằng 0, đạt được khi $x=0$', 'Hàm số đồng biến khi $x>0$', 'Đồ thị hàm số nằm hoàn toàn phía trên trục hoành'],
  'Vì $a=-\\frac{1}{2}<0$ nên $y\\le0$ với mọi $x$, dấu bằng khi $x=0$: giá trị lớn nhất là 0; hàm số nghịch biến khi $x>0$ và đồ thị nằm phía dưới trục hoành.'))
g1 = lambda x: x * x; g2 = lambda x: x + 2
sol = sorted(x for x in range(-10, 11) if g1(x) == g2(x)); assert sol == [-1, 2]
ans = "$(-1;1)$ và $(2;4)$"
cand = [[(1, 1), (-2, 4)], [(-1, 1), (-2, 4)], [(1, 3), (2, 4)]]
assert all(not all(g1(x) == y and g2(x) == y for x, y in c) for c in cand)
fg = graph([(g1, '#2563eb'), (g2, '#dc2626')], (-3, 3), (-1, 5), 26, marks=[(-1, 1, 'M', -22, 16, False), (2, 4, 'N', 8, 16, False)])
L.append(q('T9-B18-007', 'advanced', 'Hình vẽ cho parabol $y=x^2$ và đường thẳng $y=x+2$ cắt nhau tại hai điểm M và N. Tọa độ của M và N là',
  ans, ["$(1;1)$ và $(-2;4)$", "$(-1;1)$ và $(-2;4)$", "$(1;3)$ và $(2;4)$"],
  'Hoành độ giao điểm thỏa $x^2=x+2$ hay $x^2-x-2=0$, suy ra $x=-1$ hoặc $x=2$. Thay vào $y=x+2$ được $M(-1;1)$, $N(2;4)$.', fig=fg))
s = lambda t: 5 * t * t; assert s(3) - s(2) == 25
L.append(q('T9-B18-008', 'advanced', 'Một vật rơi tự do có quãng đường rơi được sau $t$ giây là $s=5t^2$ (mét). Trong giây thứ ba (từ $t=2$ đến $t=3$) vật rơi được quãng đường là',
  '25 m', ['45 m', '15 m', '20 m'],
  'Quãng đường sau 3 giây là $5\\cdot9=45$ m, sau 2 giây là $5\\cdot4=20$ m. Quãng đường trong giây thứ ba là $45-20=25$ m (không phải 45 m).', vals=[25, 45, 15, 20]))
out.append(batch(C, {'code': 'toan9-b18', 'title': 'Bài 18. Hàm số y = ax² (a ≠ 0)', 'seq': 1,
  'subtitle': 'Hàm số y = ax², đồ thị parabol, tính chất của hàm số', 'concepts': ['Hàm số y = ax²', 'Đồ thị parabol', 'Tính đồng biến, nghịch biến', 'Giao điểm với đường thẳng']}, L))

# ======================= Bài 19 =======================
L = []
L.append(q('T9-B19-001', 'basic', 'Phương trình nào sau đây là phương trình bậc hai một ẩn?',
  '$2x^2-3x+1=0$', ['$x^3-x+1=0$', '$2x-5=0$', '$x(x-2)=x^2+3$'],
  'Phương trình bậc hai một ẩn có dạng $ax^2+bx+c=0$ với $a\\neq0$. Phương trình $x(x-2)=x^2+3$ sau khi rút gọn thành $-2x-3=0$ là bậc nhất.'))
L.append(q('T9-B19-002', 'basic', 'Phương trình $2x^2-x=7$ khi đưa về dạng $ax^2+bx+c=0$ có các hệ số là',
  '$a=2,\\ b=-1,\\ c=-7$', ['$a=2,\\ b=1,\\ c=7$', '$a=2,\\ b=-1,\\ c=7$', '$a=2,\\ b=-1,\\ c=0$'],
  'Chuyển vế: $2x^2-x-7=0$ nên $a=2$, $b=-1$, $c=-7$. Quên đổi dấu số 7 khi chuyển vế là lỗi hay gặp.'))
L.append(q('T9-B19-003', 'basic', 'Phương trình $ax^2+bx+c=0$ ($a\\neq0$) có biệt thức $\\Delta=b^2-4ac$. Phương trình có hai nghiệm phân biệt khi',
  '$\\Delta>0$', ['$\\Delta<0$', '$\\Delta=0$', '$a>0$'],
  'Khi $\\Delta>0$ phương trình có hai nghiệm phân biệt $x=\\frac{-b\\pm\\sqrt{\\Delta}}{2a}$; $\\Delta=0$ cho nghiệm kép; $\\Delta<0$ vô nghiệm.'))
r = solve_quad(2, -5, 3); assert r == [1, Fr(3, 2)]
L.append(q('T9-B19-004', 'application', 'Nghiệm của phương trình $2x^2-5x+3=0$ là',
  '$x=1$ hoặc $x=\\frac{3}{2}$', ['$x=-1$ hoặc $x=-\\frac{3}{2}$', '$x=1$ hoặc $x=\\frac{2}{3}$', '$x=-1$ hoặc $x=\\frac{3}{2}$'],
  '$\\Delta=25-24=1>0$ nên $x=\\frac{5\\pm1}{4}$, tức $x=\\frac{3}{2}$ hoặc $x=1$. Đổi dấu $-b$ sai sẽ cho nghiệm âm.'))
assert 16 - 4 * 4 == 0 and all(16 - 4 * m != 0 for m in (-4, 2, 16))
L.append(q('T9-B19-005', 'application', 'Tìm $m$ để phương trình $x^2-4x+m=0$ có nghiệm kép.',
  '$m=4$', ['$m=-4$', '$m=2$', '$m=16$'],
  'Phương trình có nghiệm kép khi $\\Delta=16-4m=0$, suy ra $m=4$ (nghiệm kép $x=2$). $m=16$ là do nhầm $b^2=16$.'))
assert solve_quad(3, -12, 0) == [0, 4]
L.append(q('T9-B19-006', 'application', 'Phương trình $3x^2-12x=0$ có tập nghiệm là',
  '$\\{0;4\\}$', ['$\\{4\\}$', '$\\{0;-4\\}$', '$\\{-2;2\\}$'],
  'Đặt nhân tử chung: $3x(x-4)=0$ nên $x=0$ hoặc $x=4$. Chia hai vế cho $x$ làm mất nghiệm $x=0$ là lỗi hay gặp.'))
assert (lambda m: 4 * (m + 1) ** 2 - 4 * m * m)(0) == 4  # Δ = 8m+4
L.append(q('T9-B19-007', 'advanced', 'Phương trình $x^2-2(m+1)x+m^2=0$ ($m$ là tham số) có hai nghiệm phân biệt khi và chỉ khi',
  '$m>-\\frac{1}{2}$', ['$m>\\frac{1}{2}$', '$m<-\\frac{1}{2}$', '$m\\ge-\\frac{1}{2}$'],
  '$\\Delta\'=(m+1)^2-m^2=2m+1$. Hai nghiệm phân biệt khi $2m+1>0$, tức $m>-\\frac{1}{2}$. Dấu $\\ge$ ứng với cả trường hợp nghiệm kép nên không đúng.'))
assert solve_quad(1, 3, -70) == [-10, 7]
fg = {'w': 210, 'h': 120, 'items': [{'t': 'poly', 'p': [[20, 20], [190, 20], [190, 90], [20, 90]], 'fill': '#dbeafe'},
  {'t': 'txt', 'p': [105, 108], 's': 'x + 3', 'anchor': 'middle', 'size': 14}, {'t': 'txt', 'p': [10, 60], 's': 'x', 'anchor': 'end', 'size': 14},
  {'t': 'txt', 'p': [105, 60], 's': 'S = 70 m²', 'anchor': 'middle', 'size': 14}]}
L.append(q('T9-B19-008', 'advanced', 'Một mảnh vườn hình chữ nhật có chiều dài hơn chiều rộng 3 m và diện tích 70 m² (hình vẽ, chiều rộng là $x$ mét). Chiều rộng mảnh vườn là',
  '7 m', ['10 m', '$-10$ m', '3 m'],
  'Ta có $x(x+3)=70$, tức $x^2+3x-70=0$, $\\Delta=289$, $x=7$ hoặc $x=-10$. Chiều rộng phải dương nên loại $x=-10$; vậy chiều rộng là 7 m (chiều dài 10 m).', fig=fg))
out.append(batch(C, {'code': 'toan9-b19', 'title': 'Bài 19. Phương trình bậc hai một ẩn', 'seq': 2,
  'subtitle': 'Phương trình bậc hai, công thức nghiệm, biệt thức Δ', 'concepts': ['Phương trình bậc hai một ẩn', 'Biệt thức Δ', 'Công thức nghiệm', 'Phương trình khuyết']}, L))

# ======================= Bài 20 =======================
L = []
L.append(q('T9-B20-001', 'basic', 'Nếu phương trình $ax^2+bx+c=0$ ($a\\neq0$) có hai nghiệm $x_1,x_2$ thì theo định lí Viète',
  '$x_1+x_2=-\\frac{b}{a}$ và $x_1x_2=\\frac{c}{a}$', ['$x_1+x_2=\\frac{b}{a}$ và $x_1x_2=\\frac{c}{a}$', '$x_1+x_2=-\\frac{b}{a}$ và $x_1x_2=-\\frac{c}{a}$', '$x_1+x_2=\\frac{c}{a}$ và $x_1x_2=-\\frac{b}{a}$'],
  'Định lí Viète: tổng hai nghiệm bằng $-\\frac{b}{a}$, tích hai nghiệm bằng $\\frac{c}{a}$. Chú ý dấu trừ chỉ ở tổng.'))
assert solve_quad(1, -7, 10) == [2, 5]
L.append(q('T9-B20-002', 'basic', 'Phương trình $x^2-7x+10=0$ có hai nghiệm $x_1,x_2$. Tổng và tích hai nghiệm lần lượt là',
  '7 và 10', ['$-7$ và 10', '7 và $-10$', '$-7$ và $-10$'],
  '$x_1+x_2=-\\frac{b}{a}=7$ và $x_1x_2=\\frac{c}{a}=10$ (thật vậy hai nghiệm là 2 và 5). Lỗi hay gặp là quên đổi dấu của $b$.'))
assert 5 - 3 - 2 == 0 and solve_quad(5, -3, -2) == [Fr(-2, 5), 1]
L.append(q('T9-B20-003', 'basic', 'Phương trình $5x^2-3x-2=0$ có $a+b+c=0$ nên có hai nghiệm là',
  '$x_1=1$ và $x_2=-\\frac{2}{5}$', ['$x_1=-1$ và $x_2=\\frac{2}{5}$', '$x_1=1$ và $x_2=\\frac{2}{5}$', '$x_1=-1$ và $x_2=-\\frac{2}{5}$'],
  'Khi $a+b+c=0$ phương trình có nghiệm $x_1=1$, nghiệm còn lại $x_2=\\frac{c}{a}=-\\frac{2}{5}$.'))
assert 4 + 5 == 9 and 4 * 5 == 20 and solve_quad(1, -9, 20) == [4, 5]
L.append(q('T9-B20-004', 'application', 'Hai số có tổng bằng 9 và tích bằng 20 là',
  '4 và 5', ['$-4$ và $-5$', '3 và 6', '2 và 7'],
  'Hai số là nghiệm của $x^2-9x+20=0$, $\\Delta=1$, nên là 4 và 5. Các cặp 3 và 6, 2 và 7 cũng có tổng 9 nhưng tích là 18 và 14.'))
assert 2 ** 2 - 5 * 2 + 6 == 0 and 5 - 2 == 3
L.append(q('T9-B20-005', 'application', 'Biết phương trình $x^2-5x+m=0$ có một nghiệm bằng 2. Nghiệm còn lại và giá trị của $m$ là',
  '$x=3$ và $m=6$', ['$x=3$ và $m=-6$', '$x=-3$ và $m=6$', '$x=7$ và $m=14$'],
  'Theo Viète: $x_1+x_2=5$ nên nghiệm còn lại là $5-2=3$; $m=x_1x_2=2\\cdot3=6$.'))
S, Pp = 3 + (-5), 3 * (-5); assert (S, Pp) == (-2, -15)
L.append(q('T9-B20-006', 'application', 'Phương trình bậc hai nhận hai số 3 và $-5$ làm nghiệm là',
  '$x^2+2x-15=0$', ['$x^2-2x-15=0$', '$x^2+2x+15=0$', '$x^2-2x+15=0$'],
  'Có $S=3+(-5)=-2$ và $P=3\\cdot(-5)=-15$, nên phương trình là $x^2-Sx+P=0$, tức $x^2+2x-15=0$.'))
S, Pp = 5, 3; assert 25 - 12 > 0 and S * S - 2 * Pp == 19
L.append(q('T9-B20-007', 'advanced', 'Gọi $x_1,x_2$ là hai nghiệm của phương trình $x^2-5x+3=0$. Giá trị của $x_1^2+x_2^2$ là',
  '19', ['22', '31', '28'],
  '$x_1+x_2=5$, $x_1x_2=3$ nên $x_1^2+x_2^2=(x_1+x_2)^2-2x_1x_2=25-6=19$. Nhầm thành $S^2-P=22$ hoặc $S^2+P=28$ là lỗi hay gặp.', vals=[19, 22, 31, 28]))
m = 8; assert solve_quad(1, -6, m) == [2, 4] and 4 == 2 * 2 and all(36 - 4 * k >= 0 for k in (8, 9)) and solve_quad(1, -6, 9) == [3]
L.append(q('T9-B20-008', 'advanced', 'Tìm $m$ để phương trình $x^2-6x+m=0$ có hai nghiệm $x_1,x_2$ thỏa mãn $x_1=2x_2$.',
  '$m=8$', ['$m=9$', '$m=12$', '$m=6$'],
  'Có $x_1+x_2=6$ và $x_1=2x_2$ nên $x_2=2$, $x_1=4$, suy ra $m=x_1x_2=8$ (kiểm tra $\\Delta=36-32>0$). $m=9$ ứng với nghiệm kép $x=3$.', vals=[8, 9, 12, 6]))
out.append(batch(C, {'code': 'toan9-b20', 'title': 'Bài 20. Định lí Viète và ứng dụng', 'seq': 3,
  'subtitle': 'Tổng và tích hai nghiệm, tìm hai số, lập phương trình', 'concepts': ['Định lí Viète', 'Nhẩm nghiệm a+b+c=0', 'Tìm hai số biết tổng và tích', 'Biểu thức đối xứng của hai nghiệm']}, L))

# ======================= Bài 21 =======================
L = []
L.append(q('T9-B21-001', 'basic', 'Hai số tự nhiên liên tiếp có tích bằng 156. Gọi $x$ là số nhỏ hơn; phương trình lập được là',
  '$x(x+1)=156$', ['$x+(x+1)=156$', '$x^2+1=156$', '$x(x+2)=156$'],
  'Hai số tự nhiên liên tiếp là $x$ và $x+1$; tích của chúng bằng 156 nên $x(x+1)=156$. $x(x+2)$ ứng với hai số cách nhau 2 đơn vị.'))
L.append(q('T9-B21-002', 'basic', 'Một hình chữ nhật có chiều dài hơn chiều rộng 5 m. Gọi chiều rộng là $x$ (mét). Điều kiện của $x$ là',
  '$x>0$', ['$x<0$', '$x<5$', '$x>84$'],
  'Chiều rộng là độ dài nên phải dương: $x>0$ (khi đó chiều dài $x+5>5$). Các điều kiện còn lại không xuất phát từ đề bài.'))
L.append(q('T9-B21-003', 'basic', 'Các bước giải bài toán bằng cách lập phương trình theo thứ tự đúng là',
  'Lập phương trình, giải phương trình, đối chiếu với điều kiện rồi kết luận',
  ['Giải phương trình, lập phương trình, kết luận', 'Lập phương trình, kết luận, giải phương trình', 'Kết luận, lập phương trình, giải phương trình'],
  'Phải lập phương trình từ dữ kiện đề (chọn ẩn, đặt điều kiện), giải phương trình, rồi kiểm tra nghiệm có thỏa điều kiện của ẩn để kết luận.'))
assert solve_quad(1, 5, -84) == [-12, 7] and 2 * (7 + 12) == 38
x, y = 7, 12
fg = {'w': 230, 'h': 130, 'items': [{'t': 'poly', 'p': [[30, 20], [200, 20], [200, 90], [30, 90]], 'fill': '#dbeafe'},
  {'t': 'txt', 'p': [115, 110], 's': 'x + 5', 'anchor': 'middle', 'size': 14}, {'t': 'txt', 'p': [22, 60], 's': 'x', 'anchor': 'end', 'size': 14},
  {'t': 'txt', 'p': [115, 60], 's': 'S = 84 m²', 'anchor': 'middle', 'size': 14}]}
L.append(q('T9-B21-004', 'application', 'Một mảnh đất hình chữ nhật có chiều dài hơn chiều rộng 5 m và diện tích 84 m² (hình vẽ). Chu vi mảnh đất là',
  '38 m', ['19 m', '34 m', '42 m'],
  'Gọi chiều rộng $x>0$: $x(x+5)=84\\Rightarrow x^2+5x-84=0$, $x=7$ (loại $x=-12$). Chiều dài 12 m, chu vi $2(7+12)=38$ m. Quên nhân 2 sẽ được 19 m.', fig=fg, vals=[38, 19, 34, 42]))
assert solve_quad(1, 1, -182) == [-14, 13] and 13 ** 2 + 14 ** 2 == 365
L.append(q('T9-B21-005', 'application', 'Tổng bình phương của hai số tự nhiên liên tiếp bằng 365. Số lớn hơn là',
  '14', ['13', '12', '15'],
  'Gọi số nhỏ là $x$: $x^2+(x+1)^2=365\\Rightarrow x^2+x-182=0$, $x=13$ (loại $x=-14$). Hai số là 13 và 14, số lớn là 14.', vals=[14, 13, 12, 15]))
assert solve_quad(1, 10, -2000) == [-50, 40] and Fr(120, 40) - Fr(120, 50) == Fr(3, 5)
L.append(q('T9-B21-006', 'application', 'Một ô tô đi quãng đường 120 km với vận tốc dự định $x$ km mỗi giờ. Thực tế ô tô tăng vận tốc thêm 10 km mỗi giờ nên đến sớm hơn dự định 36 phút. Vận tốc dự định là',
  '40 km mỗi giờ', ['50 km mỗi giờ', '30 km mỗi giờ', '$-50$ km mỗi giờ'],
  'Đổi 36 phút $=\\frac{3}{5}$ giờ: $\\frac{120}{x}-\\frac{120}{x+10}=\\frac{3}{5}\\Rightarrow x^2+10x-2000=0$, $x=40$ (loại $x=-50$ vì vận tốc dương). Kiểm tra: $3-2{,}4=0{,}6$ giờ.'))
assert solve_quad(5, -14, -24) == [Fr(-6, 5), 4] and Fr(1, 4) + Fr(1, 6) == Fr(5, 12)
L.append(q('T9-B21-007', 'advanced', 'Hai vòi nước cùng chảy vào một bể không có nước thì sau $\\frac{12}{5}$ giờ đầy bể. Nếu chảy riêng thì vòi thứ nhất đầy bể nhanh hơn vòi thứ hai 2 giờ. Vòi thứ hai chảy một mình đầy bể sau',
  '6 giờ', ['4 giờ', '8 giờ', '3 giờ'],
  'Gọi vòi thứ nhất đầy bể sau $x>0$ giờ: $\\frac{1}{x}+\\frac{1}{x+2}=\\frac{5}{12}\\Rightarrow5x^2-14x-24=0$, $x=4$ (loại $x=-\\frac{6}{5}$). Vòi thứ hai mất $x+2=6$ giờ.'))
assert solve_quad(1, 2, -120) == [-12, 10] and Fr(600000, 10) - Fr(600000, 12) == 10000
L.append(q('T9-B21-008', 'advanced', 'Một nhóm bạn thuê xe với giá 600 000 đồng, chia đều cho mỗi bạn. Nếu có thêm 2 bạn nữa thì mỗi bạn trả ít hơn ban đầu 10 000 đồng. Số bạn trong nhóm ban đầu là',
  '10 bạn', ['12 bạn', '8 bạn', '15 bạn'],
  'Gọi số bạn ban đầu là $x$: $\\frac{600000}{x}-\\frac{600000}{x+2}=10000\\Rightarrow x^2+2x-120=0$, $x=10$ (loại $x=-12$). Kiểm tra: 60 000 $-$ 50 000 $=$ 10 000.'))
out.append(batch(C, {'code': 'toan9-b21', 'title': 'Bài 21. Giải bài toán bằng cách lập phương trình', 'seq': 4,
  'subtitle': 'Lập phương trình bậc hai từ bài toán thực tế, đối chiếu điều kiện', 'concepts': ['Các bước giải toán bằng cách lập phương trình', 'Bài toán số học, hình học', 'Bài toán chuyển động, năng suất']}, L))

# ======================= Ôn tập chương 6 =======================
L = []
fg = graph([(lambda x: -x * x / 2, '#2563eb')], (-4, 4), (-8, 1), 24)
L.append(q('T9-C6-R01', 'basic', 'Hình vẽ là đồ thị của hàm số $y=-\\frac{1}{2}x^2$. Phát biểu nào sau đây đúng?',
  'Đồ thị nằm phía dưới trục hoành và nhận O là điểm cao nhất',
  ['Đồ thị nằm phía trên trục hoành và nhận O là điểm thấp nhất', 'Đồ thị là một đường thẳng đi qua O', 'Đồ thị đối xứng qua trục hoành'],
  'Vì $a=-\\frac{1}{2}<0$ nên $y\\le0$ với mọi $x$; đồ thị là parabol hướng xuống dưới, đỉnh O là điểm cao nhất, đối xứng qua trục Oy (không phải Ox).', fig=fg))
assert 16 + 20 == 36
L.append(q('T9-C6-R02', 'basic', 'Biệt thức $\\Delta$ của phương trình $x^2-4x-5=0$ là',
  '36', ['$-4$', '16', '26'],
  '$\\Delta=b^2-4ac=(-4)^2-4\\cdot1\\cdot(-5)=16+20=36$. Quên dấu của $c$ sẽ cho $16-20=-4$.', vals=[36, -4, 16, 26]))
assert 36 - 8 > 0
L.append(q('T9-C6-R03', 'basic', 'Phương trình $2x^2-6x+1=0$ có hai nghiệm $x_1,x_2$. Tổng $x_1+x_2$ bằng',
  '3', ['$-3$', '6', '$\\frac{1}{2}$'],
  'Theo Viète: $x_1+x_2=-\\frac{b}{a}=-\\frac{-6}{2}=3$ ($\\Delta=28>0$ nên phương trình có nghiệm). $\\frac{1}{2}$ là tích hai nghiệm.', vals=[3, -3, 6, Fr(1, 2)]))
a = Fr(-3, 9); assert a == Fr(-1, 3) and all(a * x * x == y for x, y in [(-6, -12)]) and a * 36 != 12 and a * 9 != 3
fg = graph([(lambda x: -x * x / 3, '#2563eb')], (-6, 6), (-12, 1), 22, marks=[(3, -3, 'A', 8, 16, False)])
L.append(q('T9-C6-R04', 'application', 'Hình vẽ là đồ thị của hàm số $y=ax^2$ đi qua điểm $A(3;-3)$. Điểm nào sau đây cũng thuộc đồ thị?',
  P(-6, -12), [P(6, 12), P(-6, 12), P(-3, 3)],
  'Từ $-3=9a$ suy ra $a=-\\frac{1}{3}$. Với $x=-6$: $y=-\\frac{1}{3}\\cdot36=-12$ nên $(-6;-12)$ thuộc đồ thị. Các điểm còn lại có tung độ sai dấu.', fig=fg))
assert 9 - 6 * 0 > 0 and all((9 - m > 0) == (m < 9) for m in range(-5, 15))
L.append(q('T9-C6-R05', 'application', 'Phương trình $x^2-6x+m=0$ có hai nghiệm phân biệt khi',
  '$m<9$', ['$m>9$', '$m\\le9$', '$m<-9$'],
  '$\\Delta\'=9-m>0$ suy ra $m<9$. Với $m=9$ phương trình có nghiệm kép nên không thỏa "hai nghiệm phân biệt".'))
assert solve_quad(4, 0, -9) == [Fr(-3, 2), Fr(3, 2)]
L.append(q('T9-C6-R06', 'application', 'Tập nghiệm của phương trình $4x^2-9=0$ là',
  '$\\left\\{-\\frac{3}{2};\\frac{3}{2}\\right\\}$', ['$\\left\\{\\frac{3}{2}\\right\\}$', '$\\left\\{-\\frac{9}{4};\\frac{9}{4}\\right\\}$', '$\\left\\{-3;3\\right\\}$'],
  '$4x^2=9\\Rightarrow x^2=\\frac{9}{4}\\Rightarrow x=\\pm\\frac{3}{2}$. Quên nghiệm âm hoặc quên lấy căn bậc hai là các lỗi hay gặp.'))
assert solve_quad(1, 7, -60) == [-12, 5] and 5 ** 2 + 12 ** 2 == 13 ** 2 and 5 * 12 // 2 == 30
sc = 14
fg = {'w': 230, 'h': 120, 'items': [{'t': 'poly', 'p': [[30, 100], [30 + 12 * sc // 1.0 * 0.9, 100], [30, 100 - 5 * sc * 0.9]], 'fill': '#dbeafe'},
  {'t': 'rt', 'at': [30, 100], 'u': [1, 0], 'v': [0, -1], 's': 10},
  {'t': 'pt', 'p': [30, 100], 'l': 'A', 'dx': -16, 'dy': 6}, {'t': 'pt', 'p': [R(30 + 12 * sc * .9), 100], 'l': 'B', 'dx': 6, 'dy': 6}, {'t': 'pt', 'p': [30, R(100 - 5 * sc * .9)], 'l': 'C', 'dx': -16, 'dy': 4},
  {'t': 'txt', 'p': [24, R(100 - 5 * sc * .45) + 4], 's': 'x', 'anchor': 'end', 'size': 14},
  {'t': 'txt', 'p': [R(30 + 12 * sc * .45), 118], 's': 'x + 7', 'anchor': 'middle', 'size': 14},
  {'t': 'txt', 'p': [R(30 + 12 * sc * .45) + 14, R(100 - 5 * sc * .45) - 8], 's': '13 cm', 'anchor': 'start', 'size': 14}]}
L.append(q('T9-C6-R07', 'advanced', 'Tam giác ABC vuông tại A có cạnh huyền BC = 13 cm và hai cạnh góc vuông hơn kém nhau 7 cm (hình vẽ, $AC=x$, $AB=x+7$). Diện tích tam giác ABC là',
  '30 cm²', ['60 cm²', '35 cm²', '40 cm²'],
  'Theo Pythagore: $x^2+(x+7)^2=169\\Rightarrow x^2+7x-60=0$, $x=5$ (loại $x=-12$). Hai cạnh góc vuông là 5 cm và 12 cm nên $S=\\frac{1}{2}\\cdot5\\cdot12=30$ cm².', fig=fg, vals=[30, 60, 35, 40]))
assert solve_quad(1, -5, 6) == [2, 3] and 2 ** 2 + 3 ** 2 == 13 and 25 - 4 * 19 < 0 and 25 - 4 * 6 > 0
L.append(q('T9-C6-R08', 'advanced', 'Tìm $m$ để phương trình $x^2-5x+m=0$ có hai nghiệm $x_1,x_2$ thỏa mãn $x_1^2+x_2^2=13$.',
  '$m=6$', ['$m=19$', '$m=12$', '$m=-6$'],
  '$x_1^2+x_2^2=(x_1+x_2)^2-2x_1x_2=25-2m=13\\Rightarrow m=6$. Kiểm tra $\\Delta=25-24=1>0$ (hai nghiệm là 2 và 3). $m=19$ làm $\\Delta<0$.', vals=[6, 19, 12, -6]))
out.append(batch(C, {'code': 'toan9_ch6'}, L))

dump(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ch6.json'), out)
