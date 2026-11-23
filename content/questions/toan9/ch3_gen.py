#!/usr/bin/env python3
# Toán 9 KNTT - Chương 3. Căn: đáp án có giá trị số (float) để chống trùng giá trị và kiểm bằng math.
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from t9lib import *
from math import sqrt, cbrt, isclose

def cb(x): return math.copysign(abs(x) ** (1 / 3), x)
def near(a, b): assert isclose(a, b, rel_tol=1e-9, abs_tol=1e-9), (a, b)
s2, s3, s5, s7, s10 = sqrt(2), sqrt(3), sqrt(5), sqrt(7), sqrt(10)

G = Gen(903)
# ---------------- Bài 7 ----------------
G.lesson("T9-B07-")
G.q("basic", "Căn bậc hai số học của 49 là", "7", ["-7", "$\\pm7$", "24,5"],
    "Căn bậc hai số học của số dương $a$ là số dương $x$ sao cho $x^2=a$: $\\sqrt{49}=7$. $\\pm7$ là hai căn bậc hai của 49, không phải căn bậc hai số học.")
G.q("basic", "Số 25 có bao nhiêu căn bậc hai?", "2", ["1", "0", "3"],
    "Mọi số dương có đúng hai căn bậc hai đối nhau: $5$ và $-5$.")
G.q("basic", "Điều kiện để $\\sqrt{x-3}$ có nghĩa là", "$x\\ge3$", ["$x>3$", "$x\\le3$", "$x\\neq3$"],
    "Căn thức $\\sqrt{A}$ có nghĩa khi $A\\ge0$: $x-3\\ge0\\Rightarrow x\\ge3$ (tại $x=3$ căn bằng 0, vẫn có nghĩa).")
assert sqrt((-7) ** 2) == 7
G.q("application", "Giá trị của $\\sqrt{(-7)^2}$ bằng", "7", ["-7", "$\\pm7$", "49"],
    "$\\sqrt{A^2}=|A|$, nên $\\sqrt{(-7)^2}=|-7|=7$. Căn bậc hai số học không bao giờ âm.")
near(sqrt((3 - s10) ** 2), s10 - 3)
G.q("application", "Giá trị của $\\sqrt{(3-\\sqrt{10})^2}$ bằng", ("$\\sqrt{10}-3$", s10 - 3), [("$3-\\sqrt{10}$", 3 - s10), ("$3+\\sqrt{10}$", 3 + s10), ("$-3-\\sqrt{10}$", -3 - s10)],
    "$\\sqrt{A^2}=|A|$ và $3-\\sqrt{10}<0$ (vì $\\sqrt{10}>3$) nên kết quả là $\\sqrt{10}-3$.")
G.q("application", "Điều kiện xác định của $\\sqrt{5-2x}$ là", "$x\\le\\frac{5}{2}$", ["$x\\ge\\frac{5}{2}$", "$x\\le-\\frac{5}{2}$", "$x\\ge-\\frac{5}{2}$"],
    "$5-2x\\ge0\\Rightarrow -2x\\ge-5\\Rightarrow x\\le\\frac{5}{2}$ (chia cho số âm nên đổi chiều).")
for x in (-3, 0, 0.25, 5):
    assert isclose(sqrt(4 * x * x - 4 * x + 1), abs(2 * x - 1))
G.q("advanced", "Với $x<\\frac{1}{2}$, biểu thức $\\sqrt{4x^2-4x+1}$ được rút gọn thành", "$1-2x$", ["$2x-1$", "$2x+1$", "$-2x-1$"],
    "$4x^2-4x+1=(2x-1)^2$ nên căn bằng $|2x-1|$. Vì $x<\\frac12$ nên $2x-1<0$, do đó $|2x-1|=1-2x$.")
t = sqrt(80 / 5); assert t == 4
G.q("advanced", "Thời gian rơi tự do $t$ (giây) từ độ cao $h$ (m), bỏ qua sức cản không khí, tính gần đúng bởi $t=\\sqrt{\\frac{h}{5}}$. Vật rơi từ độ cao 80 m xuống đất mất", "4 giây", ["16 giây", "8 giây", "2 giây"],
    "$t=\\sqrt{\\frac{80}{5}}=\\sqrt{16}=4$ giây. Quên lấy căn sẽ ra 16.")

# ---------------- Bài 8 ----------------
G.lesson("T9-B08-")
G.q("basic", "Với $a\\ge0$, $b\\ge0$, khẳng định nào sau đây đúng?", "$\\sqrt{ab}=\\sqrt{a}\\cdot\\sqrt{b}$", ["$\\sqrt{ab}=\\sqrt{a}+\\sqrt{b}$", "$\\sqrt{a+b}=\\sqrt{a}+\\sqrt{b}$", "$\\sqrt{ab}=a\\sqrt{b}$"],
    "Quy tắc khai căn một tích: $\\sqrt{ab}=\\sqrt a\\cdot\\sqrt b$. Không có quy tắc tương tự cho tổng: $\\sqrt{a+b}\\ne\\sqrt a+\\sqrt b$ nói chung.")
assert sqrt(4 * 25) == 10
G.q("basic", "Giá trị của $\\sqrt{4\\cdot25}$ bằng", "10", ["7", "20", "50"],
    "$\\sqrt{4\\cdot25}=\\sqrt4\\cdot\\sqrt{25}=2\\cdot5=10$. Lỗi hay gặp: cộng $2+5=7$.")
G.q("basic", "Giá trị của $\\sqrt{\\frac{9}{16}}$ bằng", "$\\frac{3}{4}$", ["$\\frac{3}{8}$", "$\\frac{9}{4}$", "$\\frac{3}{16}$"],
    "$\\sqrt{\\frac{9}{16}}=\\frac{\\sqrt9}{\\sqrt{16}}=\\frac34$. Phải khai căn cả tử và mẫu.")
near(sqrt(18) * sqrt(2), 6)
G.q("application", "Giá trị của $\\sqrt{18}\\cdot\\sqrt2$ bằng", "6", ["36", "20", "$3\\sqrt2$"],
    "$\\sqrt{18}\\cdot\\sqrt2=\\sqrt{36}=6$. Không nhân $18\\cdot2$ rồi quên khai căn.")
near(sqrt(98) / sqrt(2), 7)
G.q("application", "Giá trị của $\\frac{\\sqrt{98}}{\\sqrt2}$ bằng", ("7", 7), [("49", 49), ("96", 96), ("14", 14)],
    "$\\frac{\\sqrt{98}}{\\sqrt2}=\\sqrt{\\frac{98}{2}}=\\sqrt{49}=7$.")
near(sqrt(2.5) * sqrt(10), 5)
G.q("application", "Giá trị của $\\sqrt{2,5}\\cdot\\sqrt{10}$ bằng", ("5", 5), [("25", 25), ("12,5", 12.5), ("7,5", 7.5)],
    "$\\sqrt{2,5}\\cdot\\sqrt{10}=\\sqrt{25}=5$.")
for a in (-1, -2.5, -7):
    near(sqrt(9 * a * a), -3 * a)
G.q("advanced", "Với $a<0$, biểu thức $\\sqrt{9a^2}$ bằng", "$-3a$", ["$3a$", "$9a$", "$-9a$"],
    "$\\sqrt{9a^2}=\\sqrt{(3a)^2}=|3a|$. Vì $a<0$ nên $|3a|=-3a$ (dương).")
x = 2; near(sqrt(x - 1) * sqrt(x + 1), sqrt(3)); assert x - 1 >= 0
G.q("advanced", "Giải phương trình $\\sqrt{x-1}\\cdot\\sqrt{x+1}=\\sqrt3$.", "$x=2$", ["$x=2$ hoặc $x=-2$", "$x=-2$", "$x=4$"],
    "Điều kiện $x\\ge1$. Khi đó $\\sqrt{x^2-1}=\\sqrt3\\Rightarrow x^2=4\\Rightarrow x=\\pm2$, nhưng $x=-2$ không thỏa điều kiện, nên $x=2$.")

# ---------------- Bài 9 ----------------
G.lesson("T9-B09-")
near(sqrt(12), 2 * s3)
G.q("basic", "Đưa thừa số ra ngoài dấu căn: $\\sqrt{12}=$", ("$2\\sqrt3$", 2 * s3), [("$3\\sqrt2$", 3 * s2), ("$4\\sqrt3$", 4 * s3), ("$6\\sqrt2$", 6 * s2)],
    "$\\sqrt{12}=\\sqrt{4\\cdot3}=2\\sqrt3$.")
near(1 / s3, s3 / 3)
G.q("basic", "Trục căn thức ở mẫu: $\\frac{1}{\\sqrt3}=$", ("$\\frac{\\sqrt3}{3}$", s3 / 3), [("$\\frac{1}{3}$", 1 / 3), ("$\\sqrt3$", s3), ("$\\frac{\\sqrt3}{9}$", s3 / 9)],
    "Nhân tử và mẫu với $\\sqrt3$: $\\frac{1}{\\sqrt3}=\\frac{\\sqrt3}{3}$.")
near(3 * s5, sqrt(45))
G.q("basic", "Đưa thừa số vào trong dấu căn: $3\\sqrt5=$", ("$\\sqrt{45}$", sqrt(45)), [("$\\sqrt{15}$", sqrt(15)), ("$\\sqrt{75}$", sqrt(75)), ("$\\sqrt{35}$", sqrt(35))],
    "$3\\sqrt5=\\sqrt{3^2\\cdot5}=\\sqrt{45}$. Phải bình phương thừa số 3 khi đưa vào trong căn.")
near(sqrt(27) - sqrt(12) + sqrt(3), 2 * s3)
G.q("application", "Rút gọn $\\sqrt{27}-\\sqrt{12}+\\sqrt3$.", ("$2\\sqrt3$", 2 * s3), [("$6\\sqrt3$", 6 * s3), ("$\\sqrt{18}$", sqrt(18)), ("$4\\sqrt3$", 4 * s3)],
    "$\\sqrt{27}=3\\sqrt3$, $\\sqrt{12}=2\\sqrt3$ nên biểu thức bằng $(3-2+1)\\sqrt3=2\\sqrt3$. Không được cộng, trừ các số dưới dấu căn.")
near(6 / (s5 - s2), 2 * s5 + 2 * s2)
G.q("application", "Trục căn thức ở mẫu: $\\frac{6}{\\sqrt5-\\sqrt2}=$", ("$2\\sqrt5+2\\sqrt2$", 2 * s5 + 2 * s2), [("$2\\sqrt5-2\\sqrt2$", 2 * s5 - 2 * s2), ("$6\\sqrt5+6\\sqrt2$", 6 * s5 + 6 * s2), ("$\\sqrt5+\\sqrt2$", s5 + s2)],
    "Nhân với biểu thức liên hợp: $\\frac{6(\\sqrt5+\\sqrt2)}{5-2}=2(\\sqrt5+\\sqrt2)$.")
near(sqrt(2 / 3), sqrt(6) / 3)
G.q("application", "Khử mẫu của biểu thức lấy căn: $\\sqrt{\\frac23}=$", ("$\\frac{\\sqrt6}{3}$", sqrt(6) / 3), [("$\\frac{\\sqrt6}{9}$", sqrt(6) / 9), ("$\\frac{\\sqrt2}{3}$", s2 / 3), ("$\\frac{2\\sqrt3}{3}$", 2 * s3 / 3)],
    "$\\sqrt{\\frac23}=\\sqrt{\\frac{2\\cdot3}{3^2}}=\\frac{\\sqrt6}{3}$.")
near(1 / (2 - s3) + 1 / (2 + s3), 4)
G.q("advanced", "Giá trị của $\\frac{1}{2-\\sqrt3}+\\frac{1}{2+\\sqrt3}$ bằng", ("4", 4), [("2", 2), ("1", 1), ("$2\\sqrt3$", 2 * s3)],
    "Quy đồng: $\\frac{(2+\\sqrt3)+(2-\\sqrt3)}{2^2-3}=\\frac{4}{1}=4$.")
for x in (0.3, 2, 5, 9):
    near((x * sqrt(x) - 1) / (sqrt(x) - 1), x + sqrt(x) + 1)
G.q("advanced", "Với $x\\ge0$, $x\\neq1$, rút gọn $\\frac{x\\sqrt x-1}{\\sqrt x-1}$.", "$x+\\sqrt x+1$", ["$x-\\sqrt x+1$", "$x+1$", "$\\sqrt x+1$"],
    "Dùng $a^3-b^3=(a-b)(a^2+ab+b^2)$ với $a=\\sqrt x$, $b=1$: $x\\sqrt x-1=(\\sqrt x-1)(x+\\sqrt x+1)$.")

# ---------------- Bài 10 ----------------
G.lesson("T9-B10-")
assert round(cb(27)) == 3
G.q("basic", "Căn bậc ba của 27 là", "3", ["-3", "9", "$\\pm3$"],
    "$3^3=27$ nên $\\sqrt[3]{27}=3$. Mỗi số thực có đúng một căn bậc ba.")
assert round(cb(-64)) == -4
G.q("basic", "Giá trị của $\\sqrt[3]{-64}$ là", "$-4$", ["4", "$-8$", "không tồn tại"],
    "$(-4)^3=-64$ nên $\\sqrt[3]{-64}=-4$. Khác căn bậc hai, căn bậc ba của số âm vẫn tồn tại.")
G.q("basic", "Căn bậc ba của số thực $a$ là số $x$ thỏa mãn", "$x^3=a$", ["$x^2=a$", "$3x=a$", "$x=3a$"],
    "Theo định nghĩa, $x=\\sqrt[3]{a}$ khi $x^3=a$.")
assert round(cb(8) + cb(-27)) == -1
G.q("application", "Giá trị của $\\sqrt[3]{8}+\\sqrt[3]{-27}$ bằng", "$-1$", ["1", "5", "$-5$"],
    "$\\sqrt[3]{8}=2$, $\\sqrt[3]{-27}=-3$ nên tổng là $-1$.")
near(cb(54), 3 * cb(2))
G.q("application", "Đưa thừa số ra ngoài dấu căn: $\\sqrt[3]{54}=$", ("$3\\sqrt[3]{2}$", 3 * cb(2)), [("$2\\sqrt[3]{3}$", 2 * cb(3)), ("$9\\sqrt[3]{2}$", 9 * cb(2)), ("$\\sqrt[3]{18}$", cb(18))],
    "$54=27\\cdot2$ nên $\\sqrt[3]{54}=\\sqrt[3]{27}\\cdot\\sqrt[3]{2}=3\\sqrt[3]{2}$.")
assert (-3) ** 3 + 27 == 0
G.q("application", "Giải phương trình $x^3+27=0$.", "$x=-3$", ["$x=3$", "$x=\\pm3$", "$x=-9$"],
    "$x^3=-27\\Rightarrow x=\\sqrt[3]{-27}=-3$. Phương trình này chỉ có một nghiệm.")
x = 13; assert round(cb(2 * x + 1)) == 3
G.q("advanced", "Giải phương trình $\\sqrt[3]{2x+1}=3$.", "$x=13$", ["$x=4$", "$x=14$", "$x=5$"],
    "Lập phương hai vế: $2x+1=27\\Rightarrow x=13$. Kiểm tra: $\\sqrt[3]{27}=3$.")
edge = round(cb(1728)); assert edge ** 3 == 1728 and 6 * edge ** 2 == 864
G.q("advanced", "Một hình lập phương có thể tích 1 728 cm³. Diện tích toàn phần của nó là", "864 cm²", ["144 cm²", "288 cm²", "5 184 cm²"],
    "Cạnh $a=\\sqrt[3]{1728}=12$ cm; diện tích toàn phần $6a^2=6\\cdot144=864$ cm². 144 chỉ là diện tích một mặt.")

# ---------------- Ôn tập ----------------
G.lesson("T9-C3-R")
G.q("basic", "Điều kiện xác định của $\\sqrt{2x+6}$ là", "$x\\ge-3$", ["$x\\ge3$", "$x\\le-3$", "$x>-3$"],
    "$2x+6\\ge0\\Rightarrow x\\ge-3$.")
G.q("basic", "Với mọi số thực $a$, $\\sqrt{a^2}$ bằng", "$|a|$", ["$a$", "$-a$", "$a^2$"],
    "Hằng đẳng thức $\\sqrt{A^2}=|A|$: bằng $A$ khi $A\\ge0$ và bằng $-A$ khi $A<0$.")
assert round(cb(-125)) == -5
G.q("basic", "Giá trị của $\\sqrt[3]{-125}$ là", "$-5$", ["5", "$-25$", "không xác định"],
    "$(-5)^3=-125$. Căn bậc ba xác định với mọi số thực.")
near(sqrt(50) - sqrt(18) + sqrt(8), 4 * s2)
G.q("application", "Rút gọn $\\sqrt{50}-\\sqrt{18}+\\sqrt8$.", ("$4\\sqrt2$", 4 * s2), [("$\\sqrt{40}$", sqrt(40)), ("$6\\sqrt2$", 6 * s2), ("$10\\sqrt2$", 10 * s2)],
    "$5\\sqrt2-3\\sqrt2+2\\sqrt2=4\\sqrt2$. Không được thực hiện phép trừ, cộng trong dấu căn.")
near(4 / (s7 + s3), s7 - s3)
G.q("application", "Trục căn thức ở mẫu: $\\frac{4}{\\sqrt7+\\sqrt3}=$", ("$\\sqrt7-\\sqrt3$", s7 - s3), [("$\\sqrt7+\\sqrt3$", s7 + s3), ("$4\\sqrt7-4\\sqrt3$", 4 * s7 - 4 * s3), ("$\\frac{\\sqrt7-\\sqrt3}{4}$", (s7 - s3) / 4)],
    "Nhân với biểu thức liên hợp: $\\frac{4(\\sqrt7-\\sqrt3)}{7-3}=\\sqrt7-\\sqrt3$.")
near(sqrt(48) * sqrt(3), 12)
G.q("application", "Giá trị của $\\sqrt{48}\\cdot\\sqrt3$ bằng", ("12", 12), [("144", 144), ("6", 6), ("24", 24)],
    "$\\sqrt{48}\\cdot\\sqrt3=\\sqrt{144}=12$.")
near(sqrt(7 + 4 * s3), 2 + s3)
G.q("advanced", "Giá trị của $\\sqrt{7+4\\sqrt3}$ bằng", ("$2+\\sqrt3$", 2 + s3), [("$2-\\sqrt3$", 2 - s3), ("$\\sqrt7+2\\sqrt3$", s7 + 2 * s3), ("$7+2\\sqrt3$", 7 + 2 * s3)],
    "$7+4\\sqrt3=4+4\\sqrt3+3=(2+\\sqrt3)^2$ nên căn bằng $2+\\sqrt3$ (dương).")
sol = [x for x in (1, 6) if x + 3 >= 0 and x - 3 >= 0 and isclose(sqrt(x + 3), x - 3)]
assert sol == [6] and isclose(sqrt(1 + 3), 2) and (1 - 3) < 0
G.q("advanced", "Giải phương trình $\\sqrt{x+3}=x-3$.", "$x=6$", ["$x=1$ hoặc $x=6$", "$x=1$", "$x=3$"],
    "Cần $x\\ge3$. Bình phương: $x+3=x^2-6x+9\\Rightarrow x^2-7x+6=0\\Rightarrow x=1$ hoặc $x=6$; $x=1$ không thỏa $x\\ge3$ (vế phải âm) nên chỉ nhận $x=6$.")

write(G, "toan9-c3", [
    ("toan9-b07", "Bài 7. Căn bậc hai và căn thức bậc hai", 1, "Căn bậc hai số học, điều kiện xác định, hằng đẳng thức", ["Căn bậc hai", "Căn thức bậc hai", "√(A²)=|A|"], "T9-B07-"),
    ("toan9-b08", "Bài 8. Khai căn bậc hai với phép nhân và phép chia", 2, "Khai căn một tích, một thương", ["Căn bậc hai của một tích", "Căn bậc hai của một thương"], "T9-B08-"),
    ("toan9-b09", "Bài 9. Biến đổi đơn giản và rút gọn biểu thức chứa căn thức bậc hai", 3, "Đưa thừa số ra, vào dấu căn; khử mẫu; trục căn thức", ["Đưa thừa số ra ngoài dấu căn", "Khử mẫu", "Trục căn thức ở mẫu"], "T9-B09-"),
    ("toan9-b10", "Bài 10. Căn bậc ba và căn thức bậc ba", 4, "Căn bậc ba, tính chất, ứng dụng", ["Căn bậc ba", "Căn thức bậc ba"], "T9-B10-"),
], ("toan9_ch3", "T9-C3-R"), "ch3.json")
