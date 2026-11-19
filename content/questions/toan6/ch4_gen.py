import os, sys, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ch345_lib import *

B = Builder(4004)
q = B.q
C = 'toan6-c4'
out = []
V4 = ['A', 'B', 'C', 'D']


def tri_fig(side=130, text=None, ticks=True):
    h = side * math.sqrt(3) / 2
    A = (side / 2 + 30, 34)
    Bp = (30, 34 + h)
    Cp = (30 + side, 34 + h)
    pts = [A, Bp, Cp]
    c = centroid(pts)
    items = [poly(pts)] + [vlabel(p, c, n) for p, n in zip(pts, 'ABC')]
    if ticks:
        items += ticks_sides(pts)
    if text:
        items.append(txt((A[0] + 62, 34 + h / 2), text[0], 'start', 13))
        items.append(txt((c[0], 34 + h + 24), text[1], 'middle', 13))
    return fig(int(side + 60 + (50 if text else 0)), int(34 + h + 36), items)


def sq_fig(side=110, text=None, inner=None):
    pts = rect_pts(34, 30, side, side)
    c = centroid(pts)
    items = [poly(pts)] + [vlabel(p, c, n) for p, n in zip(pts, V4)] + rt_corners(pts) + ticks_sides(pts)
    if text:
        items.append(dim(pts[0], pts[1], c, text, 14))
    if inner:
        items.append(txt(c, inner, 'middle', 14))
    return fig(side + 80, side + 64, items)


def hex_fig(r=70, text=None, center=False, diags=False, names='ABCDEF'):
    pts = regular(6, r + 40, r + 34, r, 120)
    c = (r + 40, r + 34)
    items = [poly(pts)] + [vlabel(p, c, n, 16) for p, n in zip(pts, names)] + ticks_sides(pts)
    if diags:
        for i in range(6):
            items.append(dash(c, pts[i]))
    if center:
        items.append(pt(c, 'O', -4, -10))
    if text:
        items.append(dim(pts[0], pts[1], c, text, 20))
    return fig(int(2 * r + 80), int(2 * r + 68), items)


def rect_fig(w=150, h=90, tw=None, th=None, diag=False, names=V4, ticks=False):
    pts = rect_pts(40, 30, w, h)
    c = centroid(pts)
    items = [poly(pts)] + [vlabel(p, c, n) for p, n in zip(pts, names)] + rt_corners(pts)
    if diag:
        items += [line(pts[0], pts[2], w=1.8), line(pts[1], pts[3], w=1.8)]
    if tw:
        items.append(dim(pts[0], pts[1], c, tw, 14))
    if th:
        items.append(dim(pts[1], pts[2], c, th, 18))
    return fig(w + 100, h + 66, items), pts


def rhombus_fig(p=70, qh=44, diag=True, dtxt=None, ticks=True, side=None):
    cx, cy = p + 40, qh + 36
    pts = [(cx, cy - qh), (cx + p, cy), (cx, cy + qh), (cx - p, cy)]
    c = (cx, cy)
    items = [poly(pts)] + [vlabel(a, c, n) for a, n in zip(pts, V4)]
    if ticks:
        items += ticks_sides(pts)
    if diag:
        items += [dash(pts[0], pts[2]), dash(pts[1], pts[3]), pt(c, 'O', -16, -6)]
        items.append(rt(c, (1, 0), (0, -1), 9))
    W = 2 * p + 80
    if dtxt:
        W += 90
        items.append(txt((2 * p + 86, 40), dtxt[0], 'start', 13))
        items.append(txt((2 * p + 86, 62), dtxt[1], 'start', 13))
    if side:
        items.append(dim(pts[0], pts[1], c, side, 26))
    return fig(W, 2 * qh + 74, items)


def hbh_fig(s=36, w=140, h=84, base=None, height=None, sides=None, ticks=False, hline=False):
    x0, y0 = 30, 34
    pts = [(x0 + s, y0), (x0 + s + w, y0), (x0 + w, y0 + h), (x0, y0 + h)]  # A, B, C, D
    c = centroid(pts)
    items = [poly(pts)] + [vlabel(a, c, n) for a, n in zip(pts, V4)]
    if ticks:
        items += [tick(pts[0], pts[1], 1), tick(pts[3], pts[2], 1), tick(pts[0], pts[3], 2), tick(pts[1], pts[2], 2)]
        items += [par(pts[0], pts[1]), par(pts[3], pts[2])]
    if hline:
        foot = (pts[0][0], y0 + h)
        items += [dash(pts[0], foot), rt(foot, (1, 0), (0, -1), 9)]
        if height:
            items.append(txt((foot[0] + 6, y0 + h / 2 + 4), height, 'start', 13))
    if base:
        items.append(txt(((pts[3][0] + pts[2][0]) / 2, y0 + h + 24), base, 'middle', 13))
    if sides:
        items.append(txt((pts[0][0] + w / 2, y0 - 12 - 8), sides[0], 'middle', 13))
        items.append(txt((pts[0][0] - 22 - 14, y0 + h / 2 + 4 + 0), sides[1], 'end', 13) if False else txt(((pts[0][0] + pts[3][0]) / 2 - 8, y0 + h / 2 + 4), sides[1], 'end', 13))
    return fig(w + s + 70, h + 76, items), pts


def trap_fig(a=40, b=75, h=70, diag=False, texts=None, names=V4):
    cx, y0 = 40 + b, 34
    pts = [(cx - a, y0), (cx + a, y0), (cx + b, y0 + h), (cx - b, y0 + h)]  # A,B,C,D
    c = centroid(pts)
    items = [poly(pts)] + [vlabel(p, c, n) for p, n in zip(pts, names)]
    items += [tick(pts[3], pts[0], 1), tick(pts[2], pts[1], 1), par(pts[0], pts[1]), par(pts[3], pts[2])]
    if diag:
        items += [line(pts[0], pts[2], w=1.8), line(pts[1], pts[3], w=1.8)]
    if texts:
        if texts.get('ab'):
            items.append(txt((cx, y0 - 10 - 6), texts['ab'], 'middle', 13))
        if texts.get('cd'):
            items.append(txt((cx, y0 + h + 24), texts['cd'], 'middle', 13))
        if texts.get('bc'):
            items.append(txt(((pts[1][0] + pts[2][0]) / 2 + 12, y0 + h / 2 + 5), texts['bc'], 'start', 13))
        if texts.get('ac'):
            items.append(txt((cx, y0 + h + 24), texts['ac'], 'middle', 13))
    return fig(2 * b + 80, h + 76, items)


# ======================= Bài 18 =======================
L = []
L.append(q('T6-B18-001', 'basic', 'Tam giác ABC trong hình vẽ là tam giác đều. Mỗi góc của tam giác đều bằng bao nhiêu độ?', '60°', ['45°', '90°', '30°'],
           'Tam giác đều có ba cạnh bằng nhau và ba góc bằng nhau. Tổng ba góc của tam giác là 180° nên mỗi góc bằng 180° : 3 = 60°.', fig=tri_fig()))
assert 5 * 4 == 20
L.append(q('T6-B18-002', 'basic', 'Hình vuông ABCD có cạnh 5 cm (hình vẽ). Chu vi của hình vuông là bao nhiêu xăng-ti-mét?', '20 cm', ['25 cm', '10 cm', '15 cm'],
           'Hình vuông có bốn cạnh bằng nhau nên chu vi bằng 4 · 5 = 20 (cm). Lỗi hay mắc: tính 5 · 5 = 25 là diện tích (cm²).', fig=sq_fig(text='5 cm')))
# hình lục giác đều chia 6 tam giác đều
pts = regular(6, 110, 104, 70, 120)
c6 = (110, 104)
items = [poly(pts)] + [vlabel(p, c6, n, 16) for p, n in zip(pts, 'ABCDEF')] + ticks_sides(pts) + [dash(c6, p) for p in pts] + [pt(c6, 'O', -4, -24)]
f = fig(220, 208, items)
L.append(q('T6-B18-003', 'basic', 'Lục giác đều ABCDEF có tâm O (hình vẽ). Các đoạn thẳng OA, OB, OC, OD, OE, OF chia lục giác đều thành bao nhiêu tam giác đều bằng nhau?', '6', ['3', '4', '8'],
           'Sáu đoạn thẳng từ tâm O đến các đỉnh chia lục giác đều thành 6 tam giác đều bằng nhau (OAB, OBC, OCD, ODE, OEF, OFA). Mỗi tam giác đều có góc ở tâm bằng 360° : 6 = 60°.', fig=f))
assert 4 * 6 == 24
L.append(q('T6-B18-004', 'application', 'Lục giác đều có cạnh 4 cm (hình vẽ). Chu vi của lục giác đều là bao nhiêu xăng-ti-mét?', '24 cm', ['16 cm', '20 cm', '12 cm'],
           'Lục giác đều có 6 cạnh bằng nhau nên chu vi bằng 6 · 4 = 24 (cm). Lỗi hay mắc: nhầm số cạnh của lục giác (tính 4 hoặc 5 cạnh).', fig=hex_fig(text='4 cm')))
assert 7 * 7 == 49
L.append(q('T6-B18-005', 'application', 'Hình vuông ABCD có diện tích 49 cm² (hình vẽ). Độ dài cạnh của hình vuông là bao nhiêu xăng-ti-mét?', '7 cm', ['14 cm', '24,5 cm', '98 cm'],
           'Diện tích hình vuông bằng cạnh nhân cạnh: a · a = 49 nên a = 7 (vì 7 · 7 = 49). Lỗi hay mắc: chia 49 cho 2 hoặc cho 4.', fig=sq_fig(inner='49 cm²')))
assert 27 // 3 == 9 and 27 % 3 == 0
L.append(q('T6-B18-006', 'application', 'Tam giác đều ABC có chu vi 27 cm (hình vẽ). Độ dài mỗi cạnh của tam giác là bao nhiêu xăng-ti-mét?', '9 cm', ['13,5 cm', '27 cm', '3 cm'],
           'Tam giác đều có ba cạnh bằng nhau nên mỗi cạnh dài 27 : 3 = 9 (cm). Lỗi hay mắc: chia chu vi cho 2.',
           fig=tri_fig(text=('', 'Chu vi 27 cm'))))
sq6 = 6 * 4
assert sq6 == 24 and sq6 % 6 == 0 and sq6 // 6 == 4
# hình vuông + lục giác
hp = regular(6, 250, 84, 50, 120)
items = [poly(rect_pts(30, 34, 100, 100), '#dbeafe')] + [txt((80, 154), 'Hình vuông cạnh 6 cm', 'middle', 13)] + rt_corners(rect_pts(30, 34, 100, 100)) + ticks_sides(rect_pts(30, 34, 100, 100))
items += [poly(hp, '#fde68a')] + ticks_sides(hp) + [txt((250, 154), 'Lục giác đều', 'middle', 13)]
f = fig(320, 168, items)
L.append(q('T6-B18-007', 'advanced', 'Một sợi dây thép dài bằng chu vi hình vuông cạnh 6 cm được uốn thành một lục giác đều (hình vẽ). Độ dài mỗi cạnh của lục giác đều là bao nhiêu xăng-ti-mét?', '4 cm', ['8 cm', '6 cm', '3 cm'],
           'Chu vi hình vuông là 4 · 6 = 24 (cm). Lục giác đều có 6 cạnh bằng nhau nên mỗi cạnh dài 24 : 6 = 4 (cm). Lỗi hay mắc: chia cho 3 (số cạnh tam giác) được 8.', fig=f))
assert 20 * 4 // 2 == 40
L.append(q('T6-B18-008', 'advanced', 'Một mảnh vườn hình vuông cạnh 20 m (hình vẽ). Người ta trồng cây dọc theo chu vi mảnh vườn, hai cây liên tiếp cách nhau 2 m và có một cây ở mỗi góc vườn. Cần bao nhiêu cây?', '40', ['20', '80', '36'],
           'Chu vi mảnh vườn là 4 · 20 = 80 (m). Vì đường khép kín nên số cây bằng số khoảng cách: 80 : 2 = 40 (cây). Lỗi hay mắc: chia 20 cho 2 hoặc cộng thêm 1 cây.', fig=sq_fig(side=110, text='20 m')))
out.append(batch(C, {'code': 'toan6-b18', 'title': 'Bài 18. Hình tam giác đều. Hình vuông. Hình lục giác đều', 'seq': 1,
                     'subtitle': 'Tam giác đều, hình vuông, lục giác đều: đặc điểm, chu vi, diện tích',
                     'concepts': ['Tam giác đều', 'Hình vuông', 'Lục giác đều', 'Chu vi và diện tích']}, L))

# ======================= Bài 19 =======================
L = []
f, _ = rect_fig(diag=True)
L.append(q('T6-B19-001', 'basic', 'Hình chữ nhật ABCD có hai đường chéo AC và BD (hình vẽ). Khẳng định nào sau đây luôn đúng?', 'AC = BD', ['AC ⊥ BD', 'AC = AB', 'AC < BD'],
           'Trong hình chữ nhật, hai đường chéo bằng nhau: AC = BD. Hai đường chéo của hình chữ nhật không nhất thiết vuông góc (chỉ vuông góc khi hình chữ nhật là hình vuông).', fig=f))
L.append(q('T6-B19-002', 'basic', 'Hình thoi ABCD có hai đường chéo AC và BD cắt nhau tại O (hình vẽ). Hai đường chéo của hình thoi có tính chất nào?', 'Vuông góc với nhau và cắt nhau tại trung điểm của mỗi đường',
           ['Bằng nhau và cắt nhau tại trung điểm của mỗi đường', 'Song song với nhau', 'Cắt nhau nhưng không vuông góc với nhau'],
           'Hai đường chéo của hình thoi vuông góc với nhau và cắt nhau tại trung điểm của mỗi đường. Hai đường chéo của hình thoi nói chung không bằng nhau.', fig=rhombus_fig()))
v = (9 + 4) * 2
assert v == 26
f, _ = rect_fig(tw='9 cm', th='4 cm')
L.append(q('T6-B19-003', 'basic', 'Hình chữ nhật ABCD có chiều dài 9 cm và chiều rộng 4 cm (hình vẽ). Chu vi của hình chữ nhật là bao nhiêu xăng-ti-mét?', '26 cm', ['36 cm', '13 cm', '52 cm'],
           'Chu vi hình chữ nhật bằng (chiều dài + chiều rộng) · 2 = (9 + 4) · 2 = 26 (cm). Lỗi hay mắc: quên nhân 2 (được 13) hoặc lấy diện tích 36.', fig=f))
assert 84 % 12 == 0 and 84 // 12 == 7
f, _ = rect_fig(tw='12 cm', th=None)
f['items'].append(txt((150, 82), 'S = 84 cm²', 'middle', 14))
L.append(q('T6-B19-004', 'application', 'Hình chữ nhật ABCD có chiều dài 12 cm và diện tích 84 cm² (hình vẽ). Chiều rộng của hình chữ nhật là bao nhiêu xăng-ti-mét?', '7 cm', ['6 cm', '8 cm', '72 cm'],
           'Diện tích bằng chiều dài nhân chiều rộng nên chiều rộng bằng 84 : 12 = 7 (cm). Lỗi hay mắc: lấy 84 − 12 = 72.', fig=f))
assert 10 * 6 // 2 == 30
L.append(q('T6-B19-005', 'application', 'Hình thoi ABCD có hai đường chéo AC = 10 cm và BD = 6 cm (hình vẽ). Diện tích của hình thoi là bao nhiêu xăng-ti-mét vuông?', '30 cm²', ['60 cm²', '16 cm²', '32 cm²'],
           'Diện tích hình thoi bằng nửa tích hai đường chéo: (10 · 6) : 2 = 30 (cm²). Lỗi hay mắc: quên chia cho 2 (được 60).', fig=rhombus_fig(p=45, qh=75, dtxt=('AC = 10 cm', 'BD = 6 cm'), ticks=False)))
assert 7 * 4 == 28
L.append(q('T6-B19-006', 'application', 'Hình thoi ABCD có cạnh dài 7 cm (hình vẽ). Chu vi của hình thoi là bao nhiêu xăng-ti-mét?', '28 cm', ['14 cm', '49 cm', '21 cm'],
           'Hình thoi có bốn cạnh bằng nhau nên chu vi bằng 4 · 7 = 28 (cm). Lỗi hay mắc: lấy 7 · 7 = 49 hoặc chỉ cộng hai cạnh.', fig=rhombus_fig(diag=False, side='7 cm')))
assert 15 * 8 == 120 and 120 // 2 == 60
rp = rect_pts(40, 30, 150, 90)
mids = [((rp[i][0] + rp[(i + 1) % 4][0]) / 2, (rp[i][1] + rp[(i + 1) % 4][1]) / 2) for i in range(4)]
items = [poly(rp, '#fef3c7'), poly(mids, '#dbeafe')] + rt_corners(rp) + [vlabel(p, centroid(rp), n) for p, n in zip(rp, V4)]
items += [vlabel(m, centroid(rp), n, 13) for m, n in zip(mids, 'MNPQ')]
items += [txt((115, 162), '15 m', 'middle', 13), txt((238, 79), '8 m', 'start', 13)]
L.append(q('T6-B19-007', 'advanced', 'Mảnh đất hình chữ nhật ABCD dài 15 m, rộng 8 m. Nối trung điểm M, N, P, Q của bốn cạnh được hình thoi MNPQ (hình vẽ). Diện tích hình thoi MNPQ là bao nhiêu mét vuông?', '60 m²', ['120 m²', '30 m²', '23 m²'],
           'Hai đường chéo của hình thoi MNPQ lần lượt bằng chiều dài (15 m) và chiều rộng (8 m) của hình chữ nhật. Diện tích hình thoi là (15 · 8) : 2 = 60 (m²), bằng nửa diện tích hình chữ nhật.', fig=fig(280, 176, items)))
assert (600 // 30) * (900 // 30) == 600
f, _ = rect_fig(w=150, h=100, tw='9 m', th='6 m')
L.append(q('T6-B19-008', 'advanced', 'Một nền nhà hình chữ nhật dài 9 m, rộng 6 m (hình vẽ) được lát kín bằng các viên gạch hình vuông cạnh 30 cm. Cần bao nhiêu viên gạch?', '600', ['60', '180', '6000'],
           'Diện tích nền nhà: 9 · 6 = 54 (m²) = 540 000 cm². Diện tích mỗi viên gạch: 30 · 30 = 900 (cm²). Số viên gạch: 540 000 : 900 = 600. Cũng có thể tính: 900 : 30 = 30 viên theo chiều dài, 600 : 30 = 20 viên theo chiều rộng, 30 · 20 = 600.', fig=f))
out.append(batch(C, {'code': 'toan6-b19', 'title': 'Bài 19. Hình chữ nhật. Hình thoi', 'seq': 2,
                     'subtitle': 'Hình chữ nhật, hình thoi: đặc điểm, chu vi, diện tích',
                     'concepts': ['Hình chữ nhật', 'Hình thoi', 'Chu vi và diện tích']}, L))

# ======================= Bài 20 =======================
L = []
f, _ = hbh_fig(ticks=True)
L.append(q('T6-B20-001', 'basic', 'Cho hình bình hành ABCD (hình vẽ). Cạnh AB bằng cạnh nào sau đây?', 'CD', ['BC', 'AC', 'BD'],
           'Trong hình bình hành, các cạnh đối song song và bằng nhau: AB = CD và AD = BC. AC và BD là các đường chéo, không phải cạnh.', fig=f))
L.append(q('T6-B20-002', 'basic', 'Hình thang cân ABCD có hai đáy AB và CD (hình vẽ). Khẳng định nào sau đây đúng?', 'AD = BC và AC = BD', ['AB = CD', 'AC ⊥ BD', 'AD // BC'],
           'Hình thang cân có hai cạnh bên bằng nhau (AD = BC) và hai đường chéo bằng nhau (AC = BD). Hai đáy AB và CD song song nhưng không bằng nhau; hai cạnh bên không song song.', fig=trap_fig(diag=True)))
assert 9 * 5 == 45
f, _ = hbh_fig(base='9 cm', height='5 cm', hline=True)
L.append(q('T6-B20-003', 'basic', 'Hình bình hành ABCD có cạnh đáy DC = 9 cm và chiều cao tương ứng 5 cm (hình vẽ). Diện tích của hình bình hành là bao nhiêu xăng-ti-mét vuông?', '45 cm²', ['14 cm²', '90 cm²', '22,5 cm²'],
           'Diện tích hình bình hành bằng cạnh đáy nhân chiều cao: 9 · 5 = 45 (cm²). Lỗi hay mắc: cộng hai số hoặc chia đôi như diện tích tam giác.', fig=f))
assert (7 + 4) * 2 == 22
f, _ = hbh_fig(sides=('7 cm', '4 cm'))
L.append(q('T6-B20-004', 'application', 'Hình bình hành ABCD có AB = 7 cm và AD = 4 cm (hình vẽ). Chu vi của hình bình hành là bao nhiêu xăng-ti-mét?', '22 cm', ['11 cm', '28 cm', '18 cm'],
           'Các cạnh đối bằng nhau nên chu vi bằng (7 + 4) · 2 = 22 (cm). Lỗi hay mắc: quên nhân 2 (được 11) hoặc lấy 7 · 4 = 28.', fig=f))
assert 12 + 6 + 5 + 5 == 28
L.append(q('T6-B20-005', 'application', 'Hình thang cân ABCD có đáy AB = 6 cm, đáy CD = 12 cm và cạnh bên AD = 5 cm (hình vẽ). Chu vi của hình thang cân là bao nhiêu xăng-ti-mét?', '28 cm', ['23 cm', '36 cm', '30 cm'],
           'Hai cạnh bên của hình thang cân bằng nhau nên BC = AD = 5 cm. Chu vi: 6 + 12 + 5 + 5 = 28 (cm). Lỗi hay mắc: quên một cạnh bên (được 23).',
           fig=trap_fig(texts={'ab': '6 cm', 'cd': '12 cm', 'bc': '5 cm'})))
assert 48 % 6 == 0 and 48 // 6 == 8
f, _ = hbh_fig(base='DC = ?', height='6 cm', hline=True)
f['items'].append(txt((150, 82), 'S = 48 cm²', 'middle', 13))
L.append(q('T6-B20-006', 'application', 'Hình bình hành ABCD có diện tích 48 cm² và chiều cao 6 cm ứng với cạnh đáy DC (hình vẽ). Độ dài cạnh đáy DC là bao nhiêu xăng-ti-mét?', '8 cm', ['9 cm', '42 cm', '54 cm'],
           'Diện tích bằng cạnh đáy nhân chiều cao nên cạnh đáy bằng 48 : 6 = 8 (cm). Lỗi hay mắc: cộng hoặc trừ hai số thay vì chia.', fig=f))
assert 25 * 12 == 300 and 300 * 8 // 10 == 240
f, _ = hbh_fig(base='25 m', height='12 m', hline=True)
L.append(q('T6-B20-007', 'advanced', 'Một thửa ruộng hình bình hành có cạnh đáy 25 m và chiều cao 12 m (hình vẽ). Mỗi mét vuông thu hoạch được 0,8 kg thóc. Cả thửa ruộng thu hoạch được bao nhiêu ki-lô-gam thóc?', '240 kg', ['300 kg', '24 kg', '480 kg'],
           'Diện tích thửa ruộng: 25 · 12 = 300 (m²). Số thóc thu được: 300 · 0,8 = 240 (kg). Lỗi hay mắc: chỉ tính diện tích hoặc nhầm vị trí dấu phẩy.', fig=f))
assert 36 // 2 - 10 == 8
f, _ = hbh_fig(sides=('10 cm', '?'))
f['items'].append(txt((150, 150), 'Chu vi 36 cm', 'middle', 13))
f['h'] += 10
L.append(q('T6-B20-008', 'advanced', 'Hình bình hành ABCD có chu vi 36 cm và AB = 10 cm (hình vẽ). Độ dài cạnh AD là bao nhiêu xăng-ti-mét?', '8 cm', ['26 cm', '16 cm', '9 cm'],
           'Nửa chu vi là AB + AD = 36 : 2 = 18 (cm) nên AD = 18 − 10 = 8 (cm). Lỗi hay mắc: lấy 36 − 10 = 26 mà quên rằng có hai cặp cạnh bằng nhau.', fig=f))
out.append(batch(C, {'code': 'toan6-b20', 'title': 'Bài 20. Hình bình hành. Hình thang cân', 'seq': 3,
                     'subtitle': 'Hình bình hành, hình thang cân: đặc điểm, chu vi, diện tích',
                     'concepts': ['Hình bình hành', 'Hình thang cân', 'Chu vi và diện tích']}, L))

# ======================= Ôn tập chương =======================
L = []
assert 5 * 4 == 20
L.append(q('T6-C4-R01', 'basic', 'Hình thoi ABCD có cạnh AB = 5 cm (hình vẽ). Chu vi của hình thoi là bao nhiêu xăng-ti-mét?', '20 cm', ['25 cm', '10 cm', '15 cm'],
           'Hình thoi có bốn cạnh bằng nhau nên chu vi bằng 4 · 5 = 20 (cm).', fig=rhombus_fig(diag=False, side='5 cm')))
L.append(q('T6-C4-R02', 'basic', 'Hình nào sau đây có hai đường chéo vuông góc với nhau nhưng nói chung không bằng nhau?', 'Hình thoi', ['Hình chữ nhật', 'Hình bình hành', 'Hình thang cân'],
           'Hai đường chéo của hình thoi vuông góc với nhau, nhưng nói chung không bằng nhau. Hình chữ nhật và hình thang cân có hai đường chéo bằng nhau; hình bình hành nói chung có hai đường chéo không vuông góc.'))
f = trap_fig(diag=True, texts={'ac': '8 cm'})
L.append(q('T6-C4-R03', 'basic', 'Hình thang cân ABCD có hai đường chéo AC và BD, biết AC = 8 cm (hình vẽ). Độ dài BD là bao nhiêu xăng-ti-mét?', '8 cm', ['4 cm', '16 cm', '6 cm'],
           'Hai đường chéo của hình thang cân bằng nhau nên BD = AC = 8 cm.', fig=f))
assert 30 // 2 - 9 == 6
f, _ = rect_fig(tw='9 cm', th='?')
f['items'].append(txt((115, 160), 'Chu vi 30 cm', 'middle', 13))
f['h'] += 8
L.append(q('T6-C4-R04', 'application', 'Hình chữ nhật ABCD có chu vi 30 cm và chiều dài 9 cm (hình vẽ). Chiều rộng của hình chữ nhật là bao nhiêu xăng-ti-mét?', '6 cm', ['21 cm', '12 cm', '3 cm'],
           'Nửa chu vi là 30 : 2 = 15 (cm) nên chiều rộng bằng 15 − 9 = 6 (cm). Lỗi hay mắc: lấy 30 − 9 = 21.', fig=f))
assert (36 // 4) ** 2 == 81
L.append(q('T6-C4-R05', 'application', 'Hình vuông ABCD có chu vi 36 cm (hình vẽ). Diện tích của hình vuông là bao nhiêu xăng-ti-mét vuông?', '81 cm²', ['9 cm²', '18 cm²', '324 cm²'],
           'Cạnh hình vuông là 36 : 4 = 9 (cm). Diện tích là 9 · 9 = 81 (cm²). Lỗi hay mắc: nhầm cạnh với diện tích hoặc nhầm chu vi với diện tích.', fig=sq_fig(inner='Chu vi 36 cm')))
assert 54 * 2 // 9 == 12 and 54 * 2 % 9 == 0
L.append(q('T6-C4-R06', 'application', 'Hình thoi ABCD có diện tích 54 cm² và đường chéo AC = 9 cm (hình vẽ). Độ dài đường chéo BD là bao nhiêu xăng-ti-mét?', '12 cm', ['6 cm', '24 cm', '45 cm'],
           'Diện tích hình thoi bằng nửa tích hai đường chéo nên AC · BD = 54 · 2 = 108. Do đó BD = 108 : 9 = 12 (cm). Lỗi hay mắc: quên nhân đôi diện tích (được 6).',
           fig=rhombus_fig(p=70, qh=52, dtxt=('AC = 9 cm', 'BD = ?'), ticks=False)))
assert 6 * 20 == 120 and 120 // 4 == 30
hp = regular(6, 110, 104, 70, 120)
items = [poly(hp)] + ticks_sides(hp) + [txt((110, 108), 'Cạnh 20 m', 'middle', 13)]
L.append(q('T6-C4-R07', 'advanced', 'Một khu đất hình lục giác đều có cạnh 20 m (hình vẽ). Người ta dựng cọc quanh khu đất, hai cọc liên tiếp cách nhau 4 m và có một cọc ở mỗi đỉnh. Cần bao nhiêu cọc?', '30', ['24', '120', '31'],
           'Chu vi khu đất là 6 · 20 = 120 (m). Vì đường khép kín nên số cọc bằng số khoảng cách: 120 : 4 = 30 (cọc). Lỗi hay mắc: cộng thêm 1 như trên đoạn thẳng.', fig=fig(220, 208, items)))
assert 8 * 8 + 8 * 5 == 104
sq = rect_pts(30, 30, 100, 100)
rc = rect_pts(130, 30, 62, 100)
items = [poly(sq, '#dbeafe'), poly(rc, '#fde68a'), txt((80, 86), 'Hình vuông', 'middle', 13), txt((161, 86), 'HCN', 'middle', 13),
         txt((80, 148), '8 m', 'middle', 13), txt((161, 148), '5 m', 'middle', 13), txt((200, 84), '8 m', 'start', 13)]
L.append(q('T6-C4-R08', 'advanced', 'Một mảnh đất gồm hình vuông cạnh 8 m ghép kề với hình chữ nhật có hai kích thước 8 m và 5 m (hình vẽ). Diện tích cả mảnh đất là bao nhiêu mét vuông?', '104 m²', ['52 m²', '69 m²', '208 m²'],
           'Diện tích hình vuông: 8 · 8 = 64 (m²). Diện tích hình chữ nhật: 8 · 5 = 40 (m²). Cả mảnh đất: 64 + 40 = 104 (m²). Lỗi hay mắc: lấy chu vi hoặc lấy tổng các kích thước.', fig=fig(240, 170, items)))
out.append(batch(C, {'code': 'toan6_ch4'}, L))

dump(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ch4.json'), out)
