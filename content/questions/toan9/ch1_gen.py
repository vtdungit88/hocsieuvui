#!/usr/bin/env python3
# Toán 9 KNTT - Chương 1. Mọi đáp án tính bằng Fraction và assert.
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from t9lib import *

G = Gen(901)
# ---------------- Bài 1 ----------------
G.lesson("T9-B01-")
G.q("basic", "Phương trình nào sau đây là phương trình bậc nhất hai ẩn $x, y$?",
    "$3x-2y=5$", ["$x^2+y=4$", r"$\frac{2}{x}+y=1$", "$0x+0y=7$"],
    "Phương trình bậc nhất hai ẩn có dạng $ax+by=c$ với $a, b$ không đồng thời bằng 0. Phương án $0x+0y=7$ có $a=b=0$ nên không phải; hai phương án còn lại chứa $x^2$ hoặc ẩn ở mẫu.")
a, b, c = 2, 1, 7
good = (2, 3); bad = [(3, 2), (1, 4), (4, 1)]
assert sat(a, b, c, good) and not any(sat(a, b, c, p) for p in bad)
G.q("basic", "Cặp số nào là một nghiệm của phương trình $2x+y=7$?", pair(*good), [pair(*p) for p in bad],
    "Thay vào: $2\\cdot2+3=7$ đúng. Các cặp còn lại cho $2x+y$ bằng 8, 6, 9. Lỗi hay gặp là đảo thứ tự $(x;y)$.")
G.q("basic", "Cặp số $(x_0;y_0)$ là nghiệm của hệ hai phương trình bậc nhất hai ẩn khi nào?",
    "Khi nó là nghiệm chung của cả hai phương trình của hệ",
    ["Khi nó là nghiệm của ít nhất một phương trình của hệ", "Khi nó chỉ là nghiệm của phương trình thứ nhất", "Khi $x_0+y_0$ bằng tổng hai vế phải"],
    "Nghiệm của hệ là cặp số thỏa mãn đồng thời cả hai phương trình; chỉ thỏa mãn một phương trình thì chưa là nghiệm của hệ.")
sol = (2, 3)
assert sat(1, 1, 5, sol) and sat(2, -1, 1, sol)
bad = [(1, 4), (3, 2), (1, 1)]
assert all(not (sat(1, 1, 5, p) and sat(2, -1, 1, p)) for p in bad)
G.q("application", "Cặp số nào là nghiệm của hệ " + "$" + system(1, 1, 5, 2, -1, 1) + "$?", pair(*sol), [pair(*p) for p in bad],
    "Cặp $(2;3)$ thỏa $2+3=5$ và $2\\cdot2-3=1$. Cặp $(1;4)$ và $(3;2)$ chỉ thỏa phương trình đầu, $(1;1)$ chỉ thỏa phương trình sau.")
m = Fr(7 - 3) / -2 if False else None
# 3*1 + m*(-2) = 7  => m = -2
m = Fr(3 * 1 - 7, 2)
assert m == -2 and 3 * 1 + m * (-2) == 7
G.q("application", "Tìm $m$ để cặp số $(1;-2)$ là một nghiệm của phương trình $3x+my=7$.", "$m=-2$", ["$m=2$", "$m=5$", "$m=-5$"],
    "Thay $x=1,y=-2$: $3-2m=7$, suy ra $m=-2$. Nhầm dấu khi chuyển vế dễ cho $m=2$.")
opts = {"$2x-y=3$": (2, -1, 3), "$2x+y=3$": (2, 1, 3), "$x-2y=3$": (1, -2, 3), "$2x-y=-3$": (2, -1, -3)}
pts = [(0, -3), (1, -1), (2, 1)]
assert all(sat(2, -1, 3, p) for p in pts)
assert all(not all(sat(*v, p) for p in pts) for k, v in opts.items() if k != "$2x-y=3$")
G.q("application", "Các cặp số $(0;-3)$, $(1;-1)$, $(2;1)$ đều là nghiệm của phương trình nào?", "$2x-y=3$",
    ["$2x+y=3$", "$x-2y=3$", "$2x-y=-3$"], "Với $(0;-3)$: $2\\cdot0-(-3)=3$; với $(1;-1)$: $2+1=3$; với $(2;1)$: $4-1=3$. Ba điểm cùng thuộc đường thẳng $2x-y=3$.")
# a+2=5, 1-2b=-3
A = 5 - 2; B = Fr(1 + 3, 2)
assert A == 3 and B == 2
G.q("advanced", "Biết cặp $(1;2)$ là nghiệm của hệ " + "$\\begin{cases} ax+y=5 \\\\ x-by=-3 \\end{cases}$" + ". Tìm $(a;b)$.", "$(a;b)=(3;2)$",
    ["$(a;b)=(2;3)$", "$(a;b)=(3;-2)$", "$(a;b)=(-3;2)$"],
    "Thay $x=1,y=2$: $a+2=5\\Rightarrow a=3$ và $1-2b=-3\\Rightarrow b=2$. Cần giải riêng từng phương trình theo ẩn $a$, $b$.")
cnt = sum(1 for y in range(1, 4) for x in range(1, 8) if x + 2 * y == 7)
assert cnt == 3
G.q("advanced", "Có bao nhiêu cặp số nguyên dương $(x;y)$ là nghiệm của phương trình $x+2y=7$?", "3", ["2", "4", "6"],
    "Vì $x=7-2y>0$ nên $y\\in\\{1,2,3\\}$, cho các cặp $(5;1),(3;2),(1;3)$: có 3 cặp. Chú ý điều kiện $x$ nguyên dương.")

# ---------------- Bài 2 ----------------
G.lesson("T9-B02-")
G.q("basic", "Từ phương trình $x-2y=3$ của một hệ, biểu diễn $x$ theo $y$ (bước đầu của phương pháp thế) ta được", "$x=2y+3$",
    ["$x=2y-3$", "$x=3-2y$", "$x=-2y-3$"], "Chuyển $-2y$ sang vế phải: $x=3+2y$. Lỗi hay gặp là quên đổi dấu hoặc đổi dấu cả hai vế sai.")
for y in range(-3, 4):
    assert (2 * y + 3) - 2 * y == 3
x, y = solve2(1, 1, 7, 1, -1, 3); assert (x, y) == (5, 2)
bad = [(2, 5), (4, 3), (-5, 2)]
assert all(not (p[0] + p[1] == 7 and p[0] - p[1] == 3) for p in bad)
G.q("basic", "Nghiệm của hệ " + "$" + system(1, 1, 7, 1, -1, 3) + "$" + " là", pair(x, y), [pair(*p) for p in bad],
    "Cộng hai phương trình: $2x=10$, $x=5$; thay vào được $y=2$. Đảo thứ tự cặp $(x;y)$ cho $(2;5)$ là sai.")
def classify(a, b, c, d, e, f):
    if a * e - b * d != 0: return "unique"
    return "inf" if (a * f - c * d == 0 and b * f - c * e == 0) else "none"
S = {"$" + system(1, 2, 3, 2, 4, 7) + "$": (1, 2, 3, 2, 4, 7), "$" + system(1, 2, 3, 2, 4, 6) + "$": (1, 2, 3, 2, 4, 6),
     "$" + system(1, 2, 3, 2, -1, 1) + "$": (1, 2, 3, 2, -1, 1), "$" + system(1, -1, 3, 1, 1, 1) + "$": (1, -1, 3, 1, 1, 1)}
ks = list(S); assert [classify(*S[k]) for k in ks] == ["none", "inf", "unique", "unique"]
G.q("basic", "Hệ phương trình nào sau đây vô nghiệm?", ks[0], ks[1:],
    "Ở hệ đầu, nhân phương trình thứ nhất với 2 được $2x+4y=6$, mâu thuẫn với $2x+4y=7$ nên vô nghiệm. Hệ thứ hai có hai phương trình tương đương (vô số nghiệm).")
G.q("application", "Để khử ngay ẩn $y$ trong hệ " + "$" + system(3, 2, 7, 5, -2, 1) + "$" + " bằng phương pháp cộng đại số, ta nên",
    "cộng từng vế hai phương trình", ["trừ từng vế hai phương trình", "nhân phương trình thứ nhất với $-1$ rồi cộng", "nhân phương trình thứ hai với 2 rồi cộng"],
    "Hệ số của $y$ là $2$ và $-2$ (đối nhau) nên cộng vế với vế được $8x=8$. Các cách còn lại không làm mất $y$.")
x, y = solve2(2, 3, 12, 1, -1, 1); assert (x, y) == (3, 2)
bad = [(2, 3), (3, -2), (6, 0)]
assert all(not (2 * p[0] + 3 * p[1] == 12 and p[0] - p[1] == 1) for p in bad)
G.q("application", "Giải hệ " + "$" + system(2, 3, 12, 1, -1, 1) + "$", pair(x, y), [pair(*p) for p in bad],
    "Từ $x-y=1$ có $x=y+1$; thế vào: $2(y+1)+3y=12\\Rightarrow y=2$, $x=3$. Kiểm tra lại: $6+6=12$ và $3-2=1$.")
x, y = solve2(1, 2, 1, 3, -1, 2); assert (x, y) == (Fr(5, 7), Fr(1, 7))
bad = [(Fr(1, 7), Fr(5, 7)), (Fr(5, 7), Fr(-1, 7)), (Fr(2, 7), Fr(1, 7))]
assert all(not (p[0] + 2 * p[1] == 1 and 3 * p[0] - p[1] == 2) for p in bad)
G.q("application", "Giải hệ " + "$" + system(1, 2, 1, 3, -1, 2) + "$", pair(x, y), [pair(*p) for p in bad],
    "Nhân phương trình thứ hai với 2 rồi cộng: $7x=5$, $x=\\frac{5}{7}$; thay vào $x+2y=1$ được $y=\\frac{1}{7}$. Nghiệm có thể là phân số.")
# 2x+y=m, x-y=3 ; x+y=1  => m=3
mm = [m_ for m_ in range(-6, 10) if sum(solve2(2, 1, m_, 1, -1, 3)) == 1]
assert mm == [3]
G.q("advanced", "Cho hệ " + "$\\begin{cases} 2x+y=m \\\\ x-y=3 \\end{cases}$" + ". Tìm $m$ để nghiệm $(x;y)$ của hệ thỏa mãn $x+y=1$.", "$m=3$", ["$m=0$", "$m=1$", "$m=6$"],
    "Cộng hai phương trình: $3x=m+3$, $x=\\frac{m+3}{3}$, $y=x-3=\\frac{m-6}{3}$. $x+y=\\frac{2m-3}{3}=1$ cho $m=3$ (khi đó $x=2,y=-1$).")
x, y = solve2(2, -1, 1, 1, 1, 5)  # y=2x-1 ; y=-x+5
assert (x, y) == (2, 3)
bad = [(3, 2), (2, -3), (1, 1)]
G.q("advanced", "Hai đường thẳng $y=2x-1$ và $y=-x+5$ cắt nhau tại điểm có tọa độ", pair(x, y), [pair(*p) for p in bad],
    "Tọa độ giao điểm là nghiệm của hệ $2x-y=1$, $x+y=5$: $x=2$, $y=3$. Kiểm tra: $2\\cdot2-1=3$ và $-2+5=3$.")

# ---------------- Bài 3 ----------------
G.lesson("T9-B03-")
G.q("basic", "Hai số có tổng bằng 50 và hiệu bằng 8. Gọi $x$ là số lớn, $y$ là số bé. Hệ phương trình lập đúng là",
    "$" + system(1, 1, 50, 1, -1, 8) + "$", ["$" + system(1, 1, 50, -1, 1, 8) + "$", "$" + system(1, 1, 8, 1, -1, 50) + "$", r"$\begin{cases} x+y=50 \\ xy=8 \end{cases}$"],
    "Tổng: $x+y=50$; số lớn hơn số bé 8 đơn vị: $x-y=8$. Hệ cuối không phải hệ bậc nhất.")
x, y = solve2(1, 1, 50, 1, -1, 8); assert (x, y) == (29, 21)
G.q("basic", "Hai số có tổng bằng 50 và hiệu (số lớn trừ số bé) bằng 8. Số lớn là", "29", ["21", "42", "58"],
    "Giải hệ $x+y=50$, $x-y=8$: $2x=58$, $x=29$ và $y=21$. Chọn nhầm 21 là lấy số bé.")
G.q("basic", "Các bước giải bài toán bằng cách lập hệ phương trình theo đúng thứ tự là",
    "Lập hệ phương trình; giải hệ; đối chiếu điều kiện rồi kết luận",
    ["Giải hệ; lập hệ phương trình; kết luận", "Kết luận; lập hệ phương trình; giải hệ", "Đối chiếu điều kiện; giải hệ; lập hệ phương trình"],
    "Chọn ẩn, đặt điều kiện, lập hệ; giải hệ; cuối cùng kiểm tra nghiệm thỏa điều kiện bài toán và trả lời.")
x, y = solve2(1, 1, 26, 1, -1, 6); assert (x, y) == (16, 10) and 2 * (x + y) == 52
G.q("application", "Một mảnh vườn hình chữ nhật có chu vi 52 m, chiều dài hơn chiều rộng 6 m. Diện tích mảnh vườn là", "160 m²", ["156 m²", "320 m²", "100 m²"],
    "Nửa chu vi 26: $x+y=26$, $x-y=6$ nên dài 16 m, rộng 10 m; diện tích $16\\cdot10=160$ m². Nhầm hay gặp là dùng 26 và 6.")
a_, b_ = solve2(3, 2, 46, 5, 3, 75); assert (a_, b_) == (12, 5)
G.q("application", "Mua 3 quyển vở và 2 chiếc bút hết 46 nghìn đồng; mua 5 quyển vở và 3 chiếc bút hết 75 nghìn đồng. Giá một chiếc bút là", "5 nghìn đồng",
    ["12 nghìn đồng", "6 nghìn đồng", "4 nghìn đồng"],
    "Gọi giá vở $x$, bút $y$: $3x+2y=46$, $5x+3y=75$. Giải được $x=12$, $y=5$. Kiểm tra: $36+10=46$; $60+15=75$.")
v1, v2 = solve2(1, 1, 90, 1, -1, 30); assert (v1, v2) == (60, 30) and 180 / (v1 + v2) == 2 and 180 / (v1 - v2) == 6
G.q("application", "Hai xe cùng khởi hành từ A và B cách nhau 180 km. Nếu đi ngược chiều thì sau 2 giờ gặp nhau; nếu xe từ A đuổi theo xe từ B cùng chiều thì sau 6 giờ gặp nhau. Vận tốc xe nhanh là",
    "60 km/h", ["30 km/h", "90 km/h", "45 km/h"],
    "$2(v_1+v_2)=180$ và $6(v_1-v_2)=180$ cho $v_1+v_2=90$, $v_1-v_2=30$, nên $v_1=60$, $v_2=30$.")
y, x = solve2(1, 4, 0, 1, 1, 0) if False else (None, None)
# mẹ = 4 con ; sau 5 năm tổng = 50: x=4y ; x+y=40
x, y = solve2(1, -4, 0, 1, 1, 40); assert (x, y) == (32, 8)
G.q("advanced", "Hiện nay tuổi mẹ gấp 4 lần tuổi con. Sau 5 năm nữa, tổng số tuổi của hai mẹ con là 50. Tuổi mẹ hiện nay là", "32 tuổi", ["8 tuổi", "40 tuổi", "36 tuổi"],
    "Gọi tuổi mẹ $x$, tuổi con $y$: $x=4y$ và $(x+5)+(y+5)=50$, tức $x+y=40$. Suy ra $y=8$, $x=32$. Lỗi hay gặp là quên cộng 5 cho cả hai người.")
x, y = solve2(1, 1, 40, 3, 2, 95); assert (x, y) == (15, 25)
G.q("advanced", "Lớp 9A có 40 học sinh tham gia trồng cây. Mỗi bạn nam trồng 3 cây, mỗi bạn nữ trồng 2 cây, cả lớp trồng được 95 cây. Số học sinh nữ của lớp là", "25", ["15", "20", "30"],
    "Gọi số nam $x$, số nữ $y$: $x+y=40$, $3x+2y=95$. Giải ra $x=15$, $y=25$ (kiểm tra: $45+50=95$).")

# ---------------- Ôn tập ----------------
G.lesson("T9-C1-R")
G.q("basic", "Phương trình nào sau đây là phương trình bậc nhất hai ẩn?", "$0x+2y=6$", ["$xy=4$", "$x^2+y^2=1$", r"$x+\frac{1}{y}=2$"],
    "$0x+2y=6$ có dạng $ax+by=c$ với $b=2\\neq0$ nên là phương trình bậc nhất hai ẩn. Ba phương án còn lại có tích $xy$, bình phương hoặc ẩn ở mẫu.")
G.q("basic", "Phương trình bậc nhất hai ẩn $ax+by=c$ (với $a,b$ không đồng thời bằng 0) có bao nhiêu nghiệm?", "Vô số nghiệm", ["Đúng một nghiệm", "Đúng hai nghiệm", "Vô nghiệm"],
    "Mỗi giá trị của $x$ cho một giá trị của $y$ tương ứng, nên có vô số nghiệm; tập nghiệm là một đường thẳng.")
S = {"$" + system(1, 1, 0, 2, 1, 1) + "$": (1, 1, 0, 2, 1, 1), "$" + system(1, 1, 1, 1, -1, 0) + "$": (1, 1, 1, 1, -1, 0),
     "$" + system(2, 1, 1, 1, 1, 3) + "$": (2, 1, 1, 1, 1, 3), "$" + system(1, -1, 1, 2, 1, 2) + "$": (1, -1, 1, 2, 1, 2)}
good = [k for k, v in S.items() if sat(v[0], v[1], v[2], (1, -1)) and sat(v[3], v[4], v[5], (1, -1))]
assert len(good) == 1 and good[0] == list(S)[0]
ks = list(S)
G.q("basic", "Hệ phương trình nào nhận cặp $(1;-1)$ làm nghiệm?", ks[0], ks[1:],
    "Với $(1;-1)$: $1-1=0$ và $2\\cdot1-1=1$ nên thỏa hệ đầu. Các hệ khác có ít nhất một phương trình không thỏa.")
x, y = solve2(3, 1, 7, 2, -3, 1); assert (x, y) == (2, 1)
bad = [(1, 4), (3, -2), (2, 3)]
assert all(not (3 * p[0] + p[1] == 7 and 2 * p[0] - 3 * p[1] == 1) for p in bad)
G.q("application", "Giải hệ " + "$" + system(3, 1, 7, 2, -3, 1) + "$", pair(x, y), [pair(*p) for p in bad],
    "Nhân phương trình thứ nhất với 3 rồi cộng với phương trình thứ hai: $11x=22$, $x=2$; thay vào được $y=1$.")
assert classify(2, -4, 6, -1, 2, -3) == "inf"
G.q("application", "Hệ " + "$" + system(2, -4, 6, -1, 2, -3) + "$" + " có bao nhiêu nghiệm?", "Vô số nghiệm", ["Vô nghiệm", "Đúng một nghiệm", "Đúng hai nghiệm"],
    "Phương trình thứ nhất bằng $-2$ lần phương trình thứ hai, nên hai phương trình tương đương: hệ có vô số nghiệm.")
assert 5 * 1 + 0 == 5 and -(-1) + 2 * 3 == 7 and -(-1) * 1 + 6 == 7
mm = Fr(1 - 6, -1); assert mm == 5 and mm * (-1) + 2 * 3 == 1
G.q("application", "Tìm $m$ để cặp $(-1;3)$ là nghiệm của phương trình $mx+2y=1$.", "$m=5$", ["$m=-5$", "$m=7$", "$m=1$"],
    "Thay $x=-1,y=3$: $-m+6=1$, suy ra $m=5$. Nhầm dấu khi chuyển vế cho $m=-5$.")
a_, b_ = solve2(3, 2, 1150, 2, 5, 1500); assert (a_, b_) == (250, 200)
G.q("advanced", "Cửa hàng bán áo và quần. Mua 3 áo và 2 quần hết 1 150 nghìn đồng; mua 2 áo và 5 quần hết 1 500 nghìn đồng. Giá một chiếc áo là", "250 nghìn đồng",
    ["200 nghìn đồng", "300 nghìn đồng", "150 nghìn đồng"],
    "Gọi giá áo $x$, quần $y$: $3x+2y=1150$, $2x+5y=1500$. Giải ra $x=250$, $y=200$ (kiểm tra: $750+400=1150$; $500+1000=1500$).")
mm = [m_ for m_ in range(-5, 8) if (lambda s: s[0] == s[1])(solve2(1, 2, m_, 2, -1, 1))]
assert mm == [3]
G.q("advanced", "Tìm $m$ để hệ " + "$\\begin{cases} x+2y=m \\\\ 2x-y=1 \\end{cases}$" + " có nghiệm $(x;y)$ thỏa mãn $x=y$.", "$m=3$", ["$m=1$", "$m=2$", "$m=5$"],
    "Với $x=y$, phương trình $2x-y=1$ cho $x=y=1$; thay vào $x+2y=m$ được $m=3$. Kiểm tra: hệ có nghiệm $(1;1)$.")

write(G, "toan9-c1", [
    ("toan9-b01", "Bài 1. Khái niệm phương trình và hệ hai phương trình bậc nhất hai ẩn", 1, "Phương trình bậc nhất hai ẩn, hệ hai phương trình, nghiệm của hệ", ["Phương trình bậc nhất hai ẩn", "Nghiệm của phương trình", "Hệ hai phương trình bậc nhất hai ẩn"], "T9-B01-"),
    ("toan9-b02", "Bài 2. Giải hệ hai phương trình bậc nhất hai ẩn", 2, "Phương pháp thế, phương pháp cộng đại số", ["Phương pháp thế", "Phương pháp cộng đại số", "Số nghiệm của hệ"], "T9-B02-"),
    ("toan9-b03", "Bài 3. Giải bài toán bằng cách lập hệ phương trình", 3, "Lập hệ, giải hệ, kết luận", ["Chọn ẩn và đặt điều kiện", "Lập hệ phương trình", "Giải bài toán thực tế"], "T9-B03-"),
], ("toan9_ch1", "T9-C1-R"), "ch1.json")
