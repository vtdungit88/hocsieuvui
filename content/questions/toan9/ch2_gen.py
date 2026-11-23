#!/usr/bin/env python3
# Toán 9 KNTT - Chương 2. Đáp án kiểm bằng Fraction/thế ngược.
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from t9lib import *

OPS = {"<": r"<", ">": r">", "<=": r"\le", ">=": r"\ge"}
def ineq(a, b, op, c):
    """ax+b op c -> (op', value)"""
    v = Fr(c - b) / a
    if a < 0: op = {"<": ">", ">": "<", "<=": ">=", ">=": "<="}[op]
    return op, v
def sx(op, v): return "$x%s%s$" % (OPS[op], tx(v))
def holds(op, l, r): return {"<": l < r, ">": l > r, "<=": l <= r, ">=": l >= r}[op]

G = Gen(902)
# ---------------- Bài 4 ----------------
G.lesson("T9-B04-")
for x in (2, -3): assert (x - 2) * (x + 3) == 0
G.q("basic", "Nghiệm của phương trình $(x-2)(x+3)=0$ là", "$x=2$ hoặc $x=-3$", ["$x=-2$ hoặc $x=3$", "$x=2$ hoặc $x=3$", "$x=-2$ hoặc $x=-3$"],
    "Tích bằng 0 khi một thừa số bằng 0: $x-2=0$ hoặc $x+3=0$, tức $x=2$ hoặc $x=-3$. Lỗi hay gặp là quên đổi dấu.")
G.q("basic", r"Điều kiện xác định của phương trình $\frac{3}{x-4}=1$ là", r"$x\neq4$", [r"$x\neq-4$", r"$x\neq3$", r"$x\neq0$"],
    "Mẫu thức phải khác 0: $x-4\\neq0$, tức $x\\neq4$.")
G.q("basic", r"Điều kiện xác định của phương trình $\frac{1}{x+1}+\frac{2}{x-3}=0$ là", r"$x\neq-1$ và $x\neq3$", [r"$x\neq1$ và $x\neq3$", r"$x\neq-1$ và $x\neq-3$", r"$x\neq1$ và $x\neq-3$"],
    "Cần $x+1\\neq0$ và $x-3\\neq0$, tức $x\\neq-1$ và $x\\neq3$.")
for x in (Fr(1, 2), -4): assert (2 * x - 1) * (x + 4) == 0
G.q("application", "Giải phương trình $(2x-1)(x+4)=0$.", r"$x=\frac{1}{2}$ hoặc $x=-4$", [r"$x=-\frac{1}{2}$ hoặc $x=4$", r"$x=\frac{1}{2}$ hoặc $x=4$", r"$x=2$ hoặc $x=-4$"],
    "$2x-1=0\\Rightarrow x=\\frac{1}{2}$ và $x+4=0\\Rightarrow x=-4$. Nhầm hay gặp là quên chia cho hệ số 2.")
x = Fr(7, 2); assert x != 2 and (x + 1) / (x - 2) == 3
G.q("application", r"Giải phương trình $\frac{x+1}{x-2}=3$.", r"$x=\frac{7}{2}$", [r"$x=\frac{5}{2}$", r"$x=-\frac{7}{2}$", r"$x=7$"],
    "ĐKXĐ: $x\\neq2$. Quy đồng: $x+1=3(x-2)\\Rightarrow 2x=7\\Rightarrow x=\\frac{7}{2}$ (thỏa ĐKXĐ). Lỗi hay gặp là quên nhân 3 với $-2$.")
x = 7; assert Fr(2, x - 1) == Fr(3, x + 2)
G.q("application", r"Giải phương trình $\frac{2}{x-1}=\frac{3}{x+2}$.", "$x=7$", ["$x=-7$", "$x=1$", r"$x=\frac{1}{5}$"],
    "ĐKXĐ: $x\\neq1,x\\neq-2$. Nhân chéo: $2(x+2)=3(x-1)\\Rightarrow x=7$ (thỏa ĐKXĐ); kiểm tra: $\\frac{2}{6}=\\frac{3}{9}$.")
G.q("advanced", r"Giải phương trình $\frac{x}{x-2}=\frac{2}{x-2}$.", "Phương trình vô nghiệm", ["$x=2$", "$x=0$", "$x=-2$"],
    "ĐKXĐ: $x\\neq2$. Khử mẫu được $x=2$, nhưng giá trị này không thỏa ĐKXĐ nên bị loại; phương trình vô nghiệm.")
assert {x for x in range(-10, 10) if x * x - 4 == 3 * (x - 2)} == {1, 2}
G.q("advanced", "Giải phương trình $x^2-4=3(x-2)$.", "$x=1$ hoặc $x=2$", ["$x=2$", "$x=-2$ hoặc $x=2$", "$x=-1$ hoặc $x=-2$"],
    "Chuyển vế: $(x-2)(x+2)-3(x-2)=0\\Rightarrow (x-2)(x-1)=0$, nên $x=2$ hoặc $x=1$. Chia hai vế cho $x-2$ sẽ làm mất nghiệm $x=2$.")

# ---------------- Bài 5 ----------------
G.lesson("T9-B05-")
G.q("basic", "Cho $a<b$. Khẳng định nào sau đây luôn đúng?", "$a+3<b+3$", ["$a-2>b-2$", "$-2a<-2b$", "$3a>3b$"],
    "Cộng cùng một số vào hai vế giữ nguyên chiều bất đẳng thức. Trừ 2 không đổi chiều; nhân với số âm mới đổi chiều; nhân với 3 giữ chiều.")
G.q("basic", "Kí hiệu $a\\ge b$ có nghĩa là", "$a>b$ hoặc $a=b$", ["$a>b$", "$a<b$ hoặc $a=b$", "$a<b$"],
    "$a\\ge b$ đọc là $a$ lớn hơn hoặc bằng $b$: $a>b$ hoặc $a=b$.")
G.q("basic", "Nếu $a<b$ và $b<c$ thì", "$a<c$", ["$a>c$", "$a=c$", "$a\\ge c$"],
    "Đây là tính chất bắc cầu của bất đẳng thức: $a<b<c$ nên $a<c$.")
G.q("application", "Cho $a<b$. Bất đẳng thức nào sau đây đúng?", "$2a-5<2b-5$", ["$-a-1<-b-1$", "$3-4a<3-4b$", r"$\frac{a}{-2}<\frac{b}{-2}$"],
    "Nhân với 2 (dương) rồi trừ 5 giữ chiều. Ba phương án còn lại có nhân hoặc chia với số âm nên đổi chiều: $-a-1>-b-1$, $3-4a>3-4b$, $\\frac{a}{-2}>\\frac{b}{-2}$.")
G.q("application", "Biết $-2x+3>-2y+3$. Khi đó", "$x<y$", ["$x>y$", "$x=y$", "$x\\ge y$"],
    "Trừ 3 hai vế: $-2x>-2y$. Chia hai vế cho $-2$ (số âm) thì đổi chiều: $x<y$.")
G.q("application", "Cho $m>n$. So sánh $5-3m$ và $5-3n$.", "$5-3m<5-3n$", ["$5-3m>5-3n$", "$5-3m=5-3n$", "$5-3m\\ge5-3n$"],
    "Nhân hai vế $m>n$ với $-3$ được $-3m<-3n$, cộng 5 được $5-3m<5-3n$.")
G.q("advanced", "Với mọi số thực $a, b$, bất đẳng thức nào sau đây luôn đúng?", "$a^2+b^2\\ge2ab$", ["$a^2+b^2\\le2ab$", "$a^2+b^2>2ab$", "$a^2+b^2<2ab$"],
    "$a^2+b^2-2ab=(a-b)^2\\ge0$ nên $a^2+b^2\\ge2ab$, dấu bằng khi $a=b$. Phương án có dấu $>$ sai khi $a=b$.")
lo, hi = 3 * -1 + 2, 3 * 2 + 2; assert (lo, hi) == (-1, 8)
G.q("advanced", "Cho $-1\\le x\\le2$. Khi đó $3x+2$ thỏa mãn", "$-1\\le 3x+2\\le8$", ["$-3\\le 3x+2\\le6$", "$1\\le 3x+2\\le8$", "$-1\\le 3x+2\\le6$"],
    "Nhân ba vế với 3: $-3\\le3x\\le6$; cộng 2: $-1\\le3x+2\\le8$. Quên cộng 2 cho một vế sẽ dẫn đến các phương án sai.")

# ---------------- Bài 6 ----------------
G.lesson("T9-B06-")
G.q("basic", "Bất phương trình nào sau đây là bất phương trình bậc nhất một ẩn?", "$2x-3>0$", ["$x^2-1<0$", r"$\frac{1}{x}+2>0$", "$0x+5<0$"],
    "Bất phương trình bậc nhất một ẩn có dạng $ax+b>0$ (hoặc $<,\\ge,\\le$) với $a\\neq0$. $0x+5<0$ có $a=0$; hai phương án còn lại chứa $x^2$ hoặc ẩn ở mẫu.")
ops = {"$2x-1>0$": lambda x: 2 * x - 1 > 0, "$x-2>0$": lambda x: x - 2 > 0, "$3x-6>0$": lambda x: 3 * x - 6 > 0, "$5-3x>0$": lambda x: 5 - 3 * x > 0}
assert [k for k, f in ops.items() if f(2)] == ["$2x-1>0$"]
G.q("basic", "Giá trị $x=2$ là nghiệm của bất phương trình nào?", "$2x-1>0$", ["$x-2>0$", "$3x-6>0$", "$5-3x>0$"],
    "Thay $x=2$: $2\\cdot2-1=3>0$ đúng. Các phương án khác cho $0>0$, $0>0$, $-1>0$ đều sai.")
G.q("basic", "Khi nhân hoặc chia cả hai vế của một bất phương trình với cùng một số âm thì", "phải đổi chiều bất phương trình", ["giữ nguyên chiều bất phương trình", "bất phương trình trở thành phương trình", "đổi dấu một vế mà không đổi chiều"],
    "Quy tắc nhân (chia) với số âm: đổi chiều bất đẳng thức. Đây là lỗi học sinh hay quên nhất khi giải bất phương trình.")
op, v = ineq(3, -7, "<=", 2); assert (op, v) == ("<=", 3)
G.q("application", "Giải bất phương trình $3x-7\\le2$.", sx(op, v), [sx(">=", 3), sx("<=", Fr(5, 3)), sx("<=", Fr(-5, 3))],
    "$3x\\le9\\Rightarrow x\\le3$. Chia cho số dương 3 nên giữ nguyên chiều.")
op, v = ineq(-2, 5, ">", 11); assert (op, v) == ("<", -3)
G.q("application", "Giải bất phương trình $-2x+5>11$.", sx(op, v), [sx(">", -3), sx("<", 3), sx(">", 3)],
    "$-2x>6$. Chia hai vế cho $-2$ (số âm) phải đổi chiều: $x<-3$.")
x7 = 7
assert all(((x - 1) / Fr(2) < (x + 2) / Fr(3)) == (x < 7) for x in range(-20, 21))
G.q("application", r"Giải bất phương trình $\frac{x-1}{2}<\frac{x+2}{3}$.", "$x<7$", ["$x>7$", "$x<1$", "$x<-7$"],
    "Nhân hai vế với 6: $3(x-1)<2(x+2)\\Rightarrow 3x-3<2x+4\\Rightarrow x<7$.")
sols = [x for x in range(-20, 20) if 5 - 2 * x > -4]; assert max(sols) == 4
G.q("advanced", "Số nguyên lớn nhất thỏa mãn bất phương trình $5-2x>-4$ là", "4", ["5", "3", "-4"],
    "$-2x>-9\\Rightarrow x<\\frac{9}{2}=4,5$. Các số nguyên thỏa mãn là $x\\le4$, nên số lớn nhất là 4 (số 5 không thỏa vì $x<4,5$).")
n = max(n_ for n_ in range(0, 40) if 12 * n_ + 35 <= 200); assert n == 13
G.q("advanced", "Mai có 200 nghìn đồng, muốn mua một chiếc túi 35 nghìn đồng và một số quyển vở, mỗi quyển 12 nghìn đồng. Mai mua được nhiều nhất bao nhiêu quyển vở?", "13", ["14", "16", "17"],
    "Gọi $n$ là số quyển: $12n+35\\le200\\Rightarrow n\\le13,75$. Vì $n$ nguyên nên $n$ lớn nhất là 13. Không được làm tròn lên 14.")

# ---------------- Ôn tập ----------------
G.lesson("T9-C2-R")
G.q("basic", r"Điều kiện xác định của phương trình $\frac{x}{x+5}=2$ là", r"$x\neq-5$", [r"$x\neq5$", r"$x\neq0$", r"$x\neq2$"],
    "Mẫu $x+5\\neq0$ nên $x\\neq-5$.")
for x in (-1, 3): assert (x + 1) * (2 * x - 6) == 0
G.q("basic", "Nghiệm của phương trình $(x+1)(2x-6)=0$ là", "$x=-1$ hoặc $x=3$", ["$x=1$ hoặc $x=-3$", "$x=-1$ hoặc $x=6$", "$x=1$ hoặc $x=3$"],
    "$x+1=0\\Rightarrow x=-1$; $2x-6=0\\Rightarrow x=3$.")
G.q("basic", "Cho $a>b$. Bất đẳng thức nào sau đây đúng?", "$-5a<-5b$", ["$-5a>-5b$", "$a-5<b-5$", "$5a<5b$"],
    "Nhân hai vế với số âm $-5$ thì đổi chiều: $-5a<-5b$. Trừ 5 hoặc nhân 5 giữ chiều nên hai phương án sau sai.")
x = 5; assert (x + 3) / Fr(x - 1) == 2
G.q("application", r"Giải phương trình $\frac{x+3}{x-1}=2$.", "$x=5$", ["$x=-5$", "$x=1$", "$x=-1$"],
    "ĐKXĐ: $x\\neq1$. $x+3=2(x-1)\\Rightarrow x=5$ (thỏa ĐKXĐ).")
op, v = ineq(3, -6 - 5, ">", 0)  # 2x-6 > 5-x -> 3x > 11
assert (op, v) == (">", Fr(11, 3))
G.q("application", "Giải bất phương trình $2(x-3)>5-x$.", sx(op, v), [sx("<", Fr(11, 3)), sx(">", Fr(1, 3)), sx(">", Fr(11))],
    "$2x-6>5-x\\Rightarrow 3x>11\\Rightarrow x>\\frac{11}{3}$.")
op, v = ineq(-1, 2, ">=", 3); assert (op, v) == ("<=", -1)
G.q("application", r"Giải bất phương trình $\frac{2-x}{3}\ge1$.", sx(op, v), [sx(">=", -1), sx("<=", 1), sx(">=", 1)],
    "Nhân hai vế với 3: $2-x\\ge3\\Rightarrow -x\\ge1$. Nhân (chia) với $-1$ phải đổi chiều: $x\\le-1$.")
assert {x for x in range(-10, 10) if (x - 3) * (x + 1) == x - 3} == {0, 3}
G.q("advanced", "Giải phương trình $(x-3)(x+1)=x-3$.", "$x=0$ hoặc $x=3$", ["$x=3$", "$x=-1$ hoặc $x=3$", "$x=0$ hoặc $x=-3$"],
    "Chuyển vế: $(x-3)(x+1)-(x-3)=0\\Rightarrow (x-3)x=0$, nên $x=3$ hoặc $x=0$. Chia hai vế cho $x-3$ sẽ mất nghiệm $x=3$.")
k = max(k_ for k_ in range(0, 40) if 10 + 12 * k_ <= 150); assert k == 11
G.q("advanced", "Một hãng taxi tính 10 nghìn đồng cho quãng đường mở cửa và 12 nghìn đồng cho mỗi ki-lô-mét. Với 150 nghìn đồng, đi được tối đa bao nhiêu ki-lô-mét (số nguyên)?", "11 km", ["12 km", "13 km", "15 km"],
    "$10+12k\\le150\\Rightarrow k\\le\\frac{35}{3}\\approx11,67$. Vì $k$ nguyên nên $k\\le11$.")

write(G, "toan9-c2", [
    ("toan9-b04", "Bài 4. Phương trình quy về phương trình bậc nhất một ẩn", 1, "Phương trình tích, phương trình chứa ẩn ở mẫu", ["Phương trình tích", "Điều kiện xác định", "Phương trình chứa ẩn ở mẫu"], "T9-B04-"),
    ("toan9-b05", "Bài 5. Bất đẳng thức và tính chất", 2, "Bất đẳng thức, liên hệ giữa thứ tự và phép cộng, phép nhân", ["Bất đẳng thức", "Tính chất bắc cầu", "Cộng, nhân hai vế với một số"], "T9-B05-"),
    ("toan9-b06", "Bài 6. Bất phương trình bậc nhất một ẩn", 3, "Bất phương trình bậc nhất, cách giải, bài toán thực tế", ["Bất phương trình bậc nhất một ẩn", "Quy tắc chuyển vế, quy tắc nhân", "Giải bài toán thực tế"], "T9-B06-"),
], ("toan9_ch2", "T9-C2-R"), "ch2.json")
