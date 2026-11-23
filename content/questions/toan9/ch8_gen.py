#!/usr/bin/env python3
# Toán 9 KNTT - Chương VIII. Xác suất của biến cố trong một số mô hình xác suất đơn giản. Đếm bằng itertools.
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from c678lib import *
from itertools import product, permutations

B = Builder(8908); q = B.q; C = 'toan9-c8'; out = []
def prob(space, ev): return Fr(sum(1 for w in space if ev(w)), len(space))
def pq(x): return fx(x)
def wrongs_p(ans, cands):
    ws = []
    for c in cands:
        c = Fr(c)
        if c != ans and c not in ws and 0 <= c <= 1: ws.append(c)
    assert len(ws) >= 3, (ans, cands); return ws[:3]
dice2 = list(product(range(1, 7), repeat=2))

# ======================= Bài 25 =======================
L = []
L.append(q('T9-B25-001', 'basic', 'Phép thử nào sau đây là phép thử ngẫu nhiên?',
  'Gieo một con xúc xắc và quan sát số chấm xuất hiện', ['Đun nước ở 100 °C dưới áp suất thường rồi xem nước có sôi không', 'Tính tổng hai số 3 và 5', 'Thả một vật nặng rơi tự do trong chân không và quan sát vật rơi xuống'],
  'Phép thử ngẫu nhiên là phép thử mà kết quả không đoán trước được dù biết các kết quả có thể xảy ra. Các phép thử còn lại có kết quả hoàn toàn xác định.'))
assert len(range(1, 7)) == 6
L.append(q('T9-B25-002', 'basic', 'Gieo một con xúc xắc cân đối, đồng chất. Không gian mẫu của phép thử là',
  '$\\Omega=\\{1;2;3;4;5;6\\}$', ['$\\Omega=\\{1;2;3;4;5\\}$', '$\\Omega=\\{2;4;6\\}$', '$\\Omega=\\{0;1;2;3;4;5;6\\}$'],
  'Không gian mẫu là tập hợp tất cả các kết quả có thể xảy ra: số chấm từ 1 đến 6, gồm 6 phần tử.'))
sp2 = list(product('SN', repeat=2)); assert len(sp2) == 4
L.append(q('T9-B25-003', 'basic', 'Tung một đồng xu hai lần liên tiếp. Số phần tử của không gian mẫu là',
  '4', ['2', '3', '8'],
  'Mỗi lần tung có 2 kết quả (S hoặc N) nên có $2\\cdot2=4$ kết quả: SS, SN, NS, NN. Hai kết quả SN và NS khác nhau vì thứ tự lần tung khác nhau.', vals=[4, 2, 3, 8]))
pr = [n for n in range(1, 9) if n > 1 and all(n % d for d in range(2, n))]; assert pr == [2, 3, 5, 7]
fg = spinner(['#dbeafe', '#fef3c7'] * 4, list(range(1, 9)))
L.append(q('T9-B25-004', 'application', 'Vòng quay được chia thành 8 hình quạt bằng nhau, đánh số từ 1 đến 8 (hình vẽ). Quay vòng quay một lần. Biến cố A: "Mũi tên dừng ở ô ghi số nguyên tố" được mô tả bởi tập hợp',
  '$A=\\{2;3;5;7\\}$', ['$A=\\{1;3;5;7\\}$', '$A=\\{2;3;5;7;9\\}$', '$A=\\{3;5;7\\}$'],
  'Các số nguyên tố trong $\\{1;2;\\dots;8\\}$ là 2, 3, 5, 7. Số 1 không phải số nguyên tố; số 2 là số nguyên tố chẵn duy nhất.', fig=fg))
s8 = [x for x in dice2 if sum(x) == 8]; assert len(dice2) == 36 and len(s8) == 5
L.append(q('T9-B25-005', 'application', 'Gieo một con xúc xắc hai lần liên tiếp. Biến cố "Tổng số chấm của hai lần gieo bằng 8" có bao nhiêu kết quả thuận lợi?',
  '5', ['6', '4', '3'],
  'Các kết quả $(i;j)$ có $i+j=8$ là $(2;6),(3;5),(4;4),(5;3),(6;2)$: có 5 kết quả. Quên các cặp đảo thứ tự hoặc đếm $(4;4)$ hai lần đều sai.', vals=[5, 6, 4, 3]))
sp3 = list(permutations('ĐXV', 2)); assert len(sp3) == 6
L.append(q('T9-B25-006', 'application', 'Một hộp có 3 viên bi: 1 đỏ, 1 xanh, 1 vàng, cùng kích thước. Lấy lần lượt ngẫu nhiên hai viên bi, không hoàn lại, ghi theo thứ tự lấy. Số phần tử của không gian mẫu là',
  '6', ['3', '9', '4'],
  'Lần đầu có 3 cách chọn, lần hai còn 2 cách nên có $3\\cdot2=6$ kết quả (đỏ rồi xanh khác xanh rồi đỏ). Kết quả 9 là khi cho phép lấy lại bi.', vals=[6, 3, 9, 4]))
a6 = [x for x in dice2 if 6 in x]; assert len(a6) == 11
L.append(q('T9-B25-007', 'advanced', 'Gieo một con xúc xắc hai lần liên tiếp. Biến cố "Có ít nhất một lần xuất hiện mặt 6 chấm" có bao nhiêu kết quả thuận lợi?',
  '11', ['12', '10', '6'],
  'Đếm phần bù: số kết quả không có mặt 6 là $5\\cdot5=25$ nên có $36-25=11$ kết quả. Cộng $6+6=12$ đã đếm trùng kết quả $(6;6)$.', vals=[11, 12, 10, 6]))
m5 = [n for n in range(10, 100) if n % 5 == 0]; assert len(m5) == 18 and len(range(10, 100)) == 90
L.append(q('T9-B25-008', 'advanced', 'Chọn ngẫu nhiên một số tự nhiên có hai chữ số. Biến cố "Số được chọn chia hết cho 5" có bao nhiêu kết quả thuận lợi?',
  '18', ['20', '19', '17'],
  'Các số có hai chữ số chia hết cho 5 là $10,15,\\dots,95$, gồm $\\frac{95-10}{5}+1=18$ số. Quên rằng số 5 và 100 không có hai chữ số sẽ cho 19 hoặc 20.', vals=[18, 20, 19, 17]))
out.append(batch(C, {'code': 'toan9-b25', 'title': 'Bài 25. Phép thử ngẫu nhiên và không gian mẫu', 'seq': 1,
  'subtitle': 'Phép thử ngẫu nhiên, không gian mẫu, biến cố', 'concepts': ['Phép thử ngẫu nhiên', 'Không gian mẫu', 'Biến cố', 'Kết quả thuận lợi']}, L))

# ======================= Bài 26 =======================
L = []
L.append(q('T9-B26-001', 'basic', 'Một phép thử có $n$ kết quả có thể, đồng khả năng. Biến cố A có $k$ kết quả thuận lợi. Xác suất của A là',
  '$P(A)=\\frac{k}{n}$', ['$P(A)=\\frac{n}{k}$', '$P(A)=k\\cdot n$', '$P(A)=n-k$'],
  'Xác suất của biến cố A bằng tỉ số giữa số kết quả thuận lợi cho A và số kết quả có thể: $P(A)=\\frac{k}{n}$.'))
sp = list(range(1, 7)); a = prob(sp, lambda x: x < 3); assert a == Fr(1, 3)
L.append(q('T9-B26-002', 'basic', 'Gieo một con xúc xắc cân đối, đồng chất. Xác suất để số chấm xuất hiện nhỏ hơn 3 là',
  pq(a), [pq(Fr(1, 6)), pq(Fr(1, 2)), pq(Fr(1, 2) + Fr(1, 6))], 'Có 2 kết quả thuận lợi (1 và 2) trong 6 kết quả: $\\frac{2}{6}=\\frac{1}{3}$. Chưa rút gọn hoặc chỉ đếm một kết quả đều sai.', vals=[a, Fr(1, 6), Fr(1, 2), Fr(2, 3)]))
L.append(q('T9-B26-003', 'basic', 'Xác suất của một biến cố $A$ bất kì luôn thỏa mãn',
  '$0\\le P(A)\\le1$', ['$P(A)>1$', '$P(A)<0$', '$P(A)\\ge1$'],
  'Số kết quả thuận lợi không âm và không vượt quá số kết quả có thể nên $0\\le P(A)\\le1$; biến cố không thể có xác suất 0, biến cố chắc chắn có xác suất 1.'))
a = Fr(4, 10); assert a == Fr(2, 5)
L.append(q('T9-B26-004', 'application', 'Một hộp có 4 viên bi đỏ và 6 viên bi xanh, cùng kích thước. Lấy ngẫu nhiên một viên bi. Xác suất lấy được bi đỏ là',
  pq(Fr(2, 5)), [pq(Fr(2, 3)), pq(Fr(3, 5)), pq(Fr(1, 4))], 'Có 4 kết quả thuận lợi trên tổng 10 viên: $\\frac{4}{10}=\\frac{2}{5}$. Lấy $\\frac{4}{6}$ là nhầm tổng số viên bi.', vals=[Fr(2, 5), Fr(2, 3), Fr(3, 5), Fr(1, 4)]))
a = prob(dice2, lambda x: sum(x) == 7); assert a == Fr(1, 6)
L.append(q('T9-B26-005', 'application', 'Gieo một con xúc xắc cân đối hai lần liên tiếp. Xác suất để tổng số chấm bằng 7 là',
  pq(a), [pq(Fr(1, 12)), pq(Fr(7, 36)), pq(Fr(5, 36))], 'Có 36 kết quả đồng khả năng, trong đó 6 kết quả có tổng 7: $(1;6),(2;5),(3;4),(4;3),(5;2),(6;1)$. Vậy $P=\\frac{6}{36}=\\frac{1}{6}$.', vals=[a, Fr(1, 12), Fr(7, 36), Fr(5, 36)]))
sp2 = list(product('SN', repeat=2)); a = prob(sp2, lambda w: 'N' in w); assert a == Fr(3, 4)
L.append(q('T9-B26-006', 'application', 'Tung một đồng xu cân đối hai lần liên tiếp. Xác suất để có ít nhất một lần xuất hiện mặt ngửa (N) là',
  pq(a), [pq(Fr(1, 2)), pq(Fr(1, 4)), pq(Fr(2, 3))], 'Không gian mẫu {SS, SN, NS, NN}; có 3 kết quả có mặt N nên $P=\\frac{3}{4}$. Chỉ đếm hai kết quả SN, NS sẽ được $\\frac{1}{2}$.', vals=[a, Fr(1, 2), Fr(1, 4), Fr(2, 3)]))
sp = list(permutations(['d1', 'd2', 'd3', 'x1', 'x2'], 2)); a = prob(sp, lambda w: w[0][0] == w[1][0]); assert a == Fr(2, 5) and len(sp) == 20
L.append(q('T9-B26-007', 'advanced', 'Một hộp có 3 viên bi đỏ và 2 viên bi xanh, cùng kích thước. Lấy lần lượt ngẫu nhiên hai viên bi, không hoàn lại. Xác suất để hai viên bi lấy được cùng màu là',
  pq(a), [pq(Fr(3, 5)), pq(Fr(3, 10)), pq(Fr(1, 5))], 'Có $5\\cdot4=20$ kết quả đồng khả năng. Cùng màu: hai đỏ $3\\cdot2=6$, hai xanh $2\\cdot1=2$, tổng 8. Vậy $P=\\frac{8}{20}=\\frac{2}{5}$.', vals=[a, Fr(3, 5), Fr(3, 10), Fr(1, 5)]))
sp = list(range(1, 51)); a = prob(sp, lambda n: n % 4 == 0 or n % 6 == 0); assert a == Fr(8, 25) and sum(1 for n in sp if n % 4 == 0 or n % 6 == 0) == 16
L.append(q('T9-B26-008', 'advanced', 'Chọn ngẫu nhiên một số nguyên từ 1 đến 50. Xác suất để số được chọn chia hết cho 4 hoặc chia hết cho 6 là',
  pq(a), [pq(Fr(2, 5)), pq(Fr(6, 25)), pq(Fr(4, 25))], 'Có 12 số chia hết cho 4, 8 số chia hết cho 6 và 4 số chia hết cho cả hai (bội của 12). Số thỏa mãn: $12+8-4=16$ nên $P=\\frac{16}{50}=\\frac{8}{25}$. Cộng $12+8=20$ đã đếm trùng.', vals=[a, Fr(2, 5), Fr(6, 25), Fr(4, 25)]))
assert sum(1 for n in sp if n % 4 == 0) == 12 and sum(1 for n in sp if n % 6 == 0) == 8
out.append(batch(C, {'code': 'toan9-b26', 'title': 'Bài 26. Xác suất của biến cố liên quan tới phép thử', 'seq': 2,
  'subtitle': 'Xác suất của biến cố trong các phép thử có các kết quả đồng khả năng', 'concepts': ['Xác suất của biến cố', 'Kết quả đồng khả năng', 'Biến cố chắc chắn, biến cố không thể', 'Tính xác suất bằng cách liệt kê']}, L))

# ======================= Ôn tập chương 8 =======================
L = []
sp3 = list(product('SN', repeat=3)); assert len(sp3) == 8
L.append(q('T9-C8-R01', 'basic', 'Tung một đồng xu ba lần liên tiếp. Số phần tử của không gian mẫu là',
  '8', ['6', '3', '9'],
  'Mỗi lần tung có 2 kết quả nên có $2\\cdot2\\cdot2=8$ kết quả. Cộng $2+2+2=6$ là nhầm giữa quy tắc nhân và quy tắc cộng.', vals=[8, 6, 3, 9]))
sp = list(range(1, 21)); a = prob(sp, lambda n: n % 5 == 0); assert a == Fr(1, 5)
L.append(q('T9-C8-R02', 'basic', 'Rút ngẫu nhiên một thẻ từ hộp có 20 thẻ đánh số từ 1 đến 20. Xác suất rút được thẻ ghi số chia hết cho 5 là',
  pq(a), [pq(Fr(1, 4)), pq(Fr(1, 20)), pq(Fr(2, 5))], 'Các số chia hết cho 5 là 5, 10, 15, 20 nên có 4 kết quả thuận lợi: $P=\\frac{4}{20}=\\frac{1}{5}$.', vals=[a, Fr(1, 4), Fr(1, 20), Fr(2, 5)]))
L.append(q('T9-C8-R03', 'basic', 'Gieo một con xúc xắc cân đối, đồng chất. Biến cố nào sau đây là biến cố chắc chắn?',
  'Số chấm xuất hiện nhỏ hơn 7', ['Số chấm xuất hiện là số chẵn', 'Số chấm xuất hiện lớn hơn 3', 'Số chấm xuất hiện bằng 7'],
  'Mọi kết quả (1 đến 6) đều nhỏ hơn 7 nên biến cố này luôn xảy ra (xác suất 1). Biến cố "bằng 7" là biến cố không thể; hai biến cố còn lại có thể xảy ra hoặc không.'))
cols = ['#ef4444'] * 3 + ['#3b82f6'] * 2 + ['#facc15'] * 5; a = Fr(5, 10); assert a == Fr(1, 2)
fg = spinner(cols, ['Đ'] * 3 + ['X'] * 2 + ['V'] * 5)
L.append(q('T9-C8-R04', 'application', 'Vòng quay chia thành 10 hình quạt bằng nhau: 3 ô đỏ (Đ), 2 ô xanh (X), 5 ô vàng (V) (hình vẽ). Quay một lần. Xác suất để mũi tên không dừng ở ô vàng là',
  pq(a), [pq(Fr(3, 10)), pq(Fr(1, 5)), pq(Fr(7, 10))], 'Số ô không vàng là $3+2=5$ trong 10 ô nên $P=\\frac{5}{10}=\\frac{1}{2}$. $\\frac{3}{10}$ chỉ là xác suất ô đỏ.', fig=fg, vals=[a, Fr(3, 10), Fr(1, 5), Fr(7, 10)]))
a = prob(dice2, lambda x: x[0] * x[1] % 2 == 1); assert a == Fr(1, 4)
L.append(q('T9-C8-R05', 'application', 'Gieo một con xúc xắc cân đối hai lần liên tiếp. Xác suất để tích hai số chấm là số lẻ là',
  pq(a), [pq(Fr(1, 2)), pq(Fr(3, 4)), pq(Fr(1, 3))], 'Tích lẻ khi cả hai số đều lẻ: $3\\cdot3=9$ kết quả trên 36 nên $P=\\frac{9}{36}=\\frac{1}{4}$.', vals=[a, Fr(1, 2), Fr(3, 4), Fr(1, 3)]))
a = prob(sp3, lambda w: w.count('N') == 2); assert a == Fr(3, 8)
L.append(q('T9-C8-R06', 'application', 'Tung một đồng xu cân đối ba lần liên tiếp. Xác suất để có đúng hai lần xuất hiện mặt ngửa là',
  pq(a), [pq(Fr(1, 4)), pq(Fr(1, 8)), pq(Fr(1, 2))], 'Không gian mẫu có 8 kết quả; đúng hai mặt ngửa gồm NNS, NSN, SNN (3 kết quả). Vậy $P=\\frac{3}{8}$.', vals=[a, Fr(1, 4), Fr(1, 8), Fr(1, 2)]))
sp = list(permutations(range(1, 6), 2)); a = prob(sp, lambda w: w[0] * w[1] % 2 == 0); assert a == Fr(7, 10) and len(sp) == 20
L.append(q('T9-C8-R07', 'advanced', 'Hộp có 5 thẻ đánh số từ 1 đến 5. Rút lần lượt ngẫu nhiên hai thẻ, không hoàn lại. Xác suất để tích hai số ghi trên thẻ là số chẵn là',
  pq(a), [pq(Fr(3, 10)), pq(Fr(2, 5)), pq(Fr(3, 5))], 'Có $5\\cdot4=20$ kết quả. Tích lẻ khi cả hai thẻ lẻ: $3\\cdot2=6$ kết quả. Tích chẵn có $20-6=14$ kết quả nên $P=\\frac{14}{20}=\\frac{7}{10}$. $\\frac{3}{10}$ là xác suất tích lẻ.', vals=[a, Fr(3, 10), Fr(2, 5), Fr(3, 5)]))
a = prob(dice2, lambda x: abs(x[0] - x[1]) == 2); assert a == Fr(2, 9)
L.append(q('T9-C8-R08', 'advanced', 'Gieo một con xúc xắc cân đối hai lần liên tiếp. Xác suất để hiệu của hai số chấm (số lớn trừ số bé) bằng 2 là',
  pq(a), [pq(Fr(1, 9)), pq(Fr(1, 6)), pq(Fr(5, 18))], 'Các cặp có hai số hơn kém nhau 2: $(1;3),(2;4),(3;5),(4;6)$ và các cặp đảo thứ tự, tổng 8 kết quả. Vậy $P=\\frac{8}{36}=\\frac{2}{9}$. Quên các cặp đảo thứ tự cho $\\frac{1}{9}$.', vals=[a, Fr(1, 9), Fr(1, 6), Fr(5, 18)]))
out.append(batch(C, {'code': 'toan9_ch8'}, L))

dump(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ch8.json'), out)
