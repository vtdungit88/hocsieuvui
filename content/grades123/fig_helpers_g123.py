import math


def draw_fig(w: int, h: int, items: list[dict]) -> dict:
    return {'w': w, 'h': h, 'items': items}


def table_fig(title: str, head: list[str], rows: list[list]) -> dict:
    return {'type': 'table', 'title': title, 'head': head, 'rows': rows}


def bars_fig(title: str, labels: list[str], values: list[int], unit: str = '', name: str = '') -> dict:
    s = {'values': values}
    if name:
        s['name'] = name
    out = {'type': 'bars', 'title': title, 'labels': labels, 'series': [s]}
    if unit:
        out['unit'] = unit
    return out


def fig_shape(kind: str, label: str = '', fill: str = '#93c5fd', stroke: str = '#1d4ed8', show_marks: bool = False) -> dict:
    items = []
    if kind == 'triangle':
        pts = [[150, 30], [70, 150], [230, 150]]
        items.append({'t': 'poly', 'p': pts, 'fill': fill, 'stroke': stroke, 'w': 2.5})
        if show_marks:
            for pt, l, dx, dy in zip(pts, ['A', 'B', 'C'], [0, -16, 10], [-10, 12, 12]):
                items.append({'t': 'pt', 'p': pt, 'l': l, 'dx': dx, 'dy': dy})
    elif kind == 'right_triangle':
        pts = [[80, 35], [80, 150], [230, 150]]
        items.append({'t': 'poly', 'p': pts, 'fill': fill, 'stroke': stroke, 'w': 2.5})
        items.append({'t': 'rt', 'at': [80, 150], 'u': [0, -1], 'v': [1, 0], 's': 14})
        if show_marks:
            for pt, l, dx, dy in zip(pts, ['A', 'B', 'C'], [-16, -16, 10], [-4, 14, 14]):
                items.append({'t': 'pt', 'p': pt, 'l': l, 'dx': dx, 'dy': dy})
    elif kind == 'square':
        pts = [[95, 30], [205, 30], [205, 140], [95, 140]]
        items.append({'t': 'poly', 'p': pts, 'fill': fill, 'stroke': stroke, 'w': 2.5})
        if show_marks:
            items.append({'t': 'rt', 'at': [95, 140], 'u': [0, -1], 'v': [1, 0], 's': 12})
            items.append({'t': 'tick', 'a': [95, 30], 'b': [205, 30], 'n': 1})
            items.append({'t': 'tick', 'a': [205, 30], 'b': [205, 140], 'n': 1})
            items.append({'t': 'tick', 'a': [205, 140], 'b': [95, 140], 'n': 1})
            items.append({'t': 'tick', 'a': [95, 140], 'b': [95, 30], 'n': 1})
    elif kind == 'rect':
        pts = [[60, 45], [240, 45], [240, 135], [60, 135]]
        items.append({'t': 'poly', 'p': pts, 'fill': fill, 'stroke': stroke, 'w': 2.5})
        if show_marks:
            items.append({'t': 'rt', 'at': [60, 135], 'u': [0, -1], 'v': [1, 0], 's': 12})
            items.append({'t': 'tick', 'a': [60, 45], 'b': [240, 45], 'n': 2})
            items.append({'t': 'tick', 'a': [60, 135], 'b': [240, 135], 'n': 2})
            items.append({'t': 'tick', 'a': [60, 45], 'b': [60, 135], 'n': 1})
            items.append({'t': 'tick', 'a': [240, 45], 'b': [240, 135], 'n': 1})
    elif kind == 'circle':
        items.append({'t': 'circle', 'c': [150, 90], 'r': 55, 'fill': fill, 'stroke': stroke, 'w': 2.5})
        if show_marks:
            items.append({'t': 'pt', 'p': [150, 90], 'l': 'O', 'dx': -16, 'dy': -6})
            items.append({'t': 'line', 'a': [150, 90], 'b': [205, 90], 'color': stroke, 'w': 2})
    elif kind == 'diamond':
        pts = [[150, 28], [220, 90], [150, 152], [80, 90]]
        items.append({'t': 'poly', 'p': pts, 'fill': fill, 'stroke': stroke, 'w': 2.5})
        if show_marks:
            items.append({'t': 'line', 'a': [150, 28], 'b': [150, 152], 'dash': True, 'color': '#475569'})
            items.append({'t': 'line', 'a': [80, 90], 'b': [220, 90], 'dash': True, 'color': '#475569'})
    elif kind == 'star':
        pts = []
        for i in range(10):
            r = 56 if i % 2 == 0 else 23
            ang = math.radians(-90 + i * 36)
            pts.append([round(150 + r * math.cos(ang), 1), round(90 + r * math.sin(ang), 1)])
        items.append({'t': 'poly', 'p': pts, 'fill': fill, 'stroke': stroke, 'w': 2.5})
    elif kind == 'cube':
        items.append({'t': 'poly', 'p': [[90, 65], [185, 65], [185, 160], [90, 160]], 'fill': fill, 'stroke': stroke, 'w': 2.2})
        items.append({'t': 'poly', 'p': [[90, 65], [130, 32], [225, 32], [185, 65]], 'fill': '#bfdbfe', 'stroke': stroke, 'w': 2.2})
        items.append({'t': 'poly', 'p': [[185, 65], [225, 32], [225, 127], [185, 160]], 'fill': '#60a5fa', 'stroke': stroke, 'w': 2.2})
    elif kind == 'cylinder':
        items.append({'t': 'poly', 'p': [[100, 50], [200, 50], [200, 145], [100, 145]], 'fill': fill, 'stroke': stroke, 'w': 2})
        items.append({'t': 'circle', 'c': [150, 50], 'r': 50, 'fill': '#dbeafe', 'stroke': stroke, 'w': 2})
        items.append({'t': 'line', 'a': [100, 50], 'b': [100, 145], 'color': stroke, 'w': 2.5})
        items.append({'t': 'line', 'a': [200, 50], 'b': [200, 145], 'color': stroke, 'w': 2.5})
    if label:
        items.append({'t': 'txt', 'p': [150, 178], 's': label, 'anchor': 'middle', 'size': 13})
    return draw_fig(300, 190, items)


def fig_lines(kind: str, caption: str = '') -> dict:
    items = []
    if kind == 'straight':
        items.append({'t': 'line', 'a': [40, 90], 'b': [260, 90], 'color': '#1d4ed8', 'w': 3.5})
    elif kind == 'curved':
        pts = [[40 + i * 20, round(90 + 38 * math.sin(i * 0.65), 1)] for i in range(12)]
        items.append({'t': 'curve', 'p': pts, 'color': '#db2777', 'w': 3.5})
    elif kind == 'zigzag':
        pts = [[40, 125], [85, 50], [130, 125], [175, 50], [220, 125], [265, 50]]
        items.append({'t': 'curve', 'p': pts, 'color': '#ea580c', 'w': 3.5})
    elif kind == 'dashed':
        items.append({'t': 'line', 'a': [40, 90], 'b': [260, 90], 'dash': True, 'color': '#059669', 'w': 3.5})
    elif kind == 'parallel':
        items.append({'t': 'line', 'a': [50, 60], 'b': [250, 60], 'color': '#1d4ed8', 'w': 3})
        items.append({'t': 'line', 'a': [50, 118], 'b': [250, 118], 'color': '#1d4ed8', 'w': 3})
        items.append({'t': 'par', 'a': [50, 60], 'b': [250, 60], 'n': 1})
        items.append({'t': 'par', 'a': [50, 118], 'b': [250, 118], 'n': 1})
    if caption:
        items.append({'t': 'txt', 'p': [150, 165], 's': caption, 'anchor': 'middle', 'size': 13})
    return draw_fig(300, 180, items)


def fig_color_mix(c1_name: str, c1_hex: str, c2_name: str, c2_hex: str, res_hex: str, q_mark: bool = True) -> dict:
    items = [
        {'t': 'circle', 'c': [65, 75], 'r': 28, 'fill': c1_hex, 'stroke': '#334155', 'w': 2},
        {'t': 'txt', 'p': [65, 122], 's': c1_name, 'anchor': 'middle', 'size': 12},
        {'t': 'txt', 'p': [112, 82], 's': '+', 'anchor': 'middle', 'size': 22},
        {'t': 'circle', 'c': [158, 75], 'r': 28, 'fill': c2_hex, 'stroke': '#334155', 'w': 2},
        {'t': 'txt', 'p': [158, 122], 's': c2_name, 'anchor': 'middle', 'size': 12},
        {'t': 'txt', 'p': [204, 82], 's': '=', 'anchor': 'middle', 'size': 22},
        {'t': 'circle', 'c': [252, 75], 'r': 28, 'fill': '#f1f5f9' if q_mark else res_hex, 'stroke': '#334155', 'w': 2},
        {'t': 'txt', 'p': [252, 82], 's': '?' if q_mark else '', 'anchor': 'middle', 'size': 22},
    ]
    return draw_fig(315, 140, items)


def fig_traffic_sign(kind: str, caption: str = '') -> dict:
    items = []
    if kind == 'prohibit':
        items.append({'t': 'circle', 'c': [150, 80], 'r': 52, 'fill': '#ffffff', 'stroke': '#dc2626', 'w': 7})
        items.append({'t': 'line', 'a': [114, 44], 'b': [186, 116], 'color': '#dc2626', 'w': 7})
    elif kind == 'warning':
        items.append({'t': 'poly', 'p': [[150, 24], [88, 130], [212, 130]], 'fill': '#facc15', 'stroke': '#dc2626', 'w': 6})
        items.append({'t': 'txt', 'p': [150, 110], 's': '!', 'anchor': 'middle', 'size': 36, 'color': '#1e293b'})
    elif kind == 'command':
        items.append({'t': 'circle', 'c': [150, 80], 'r': 52, 'fill': '#2563eb', 'stroke': '#1d4ed8', 'w': 3})
        items.append({'t': 'line', 'a': [150, 110], 'b': [150, 48], 'arrow': True, 'color': '#ffffff', 'w': 5})
    elif kind == 'guide':
        items.append({'t': 'poly', 'p': [[90, 32], [210, 32], [210, 128], [90, 128]], 'fill': '#2563eb', 'stroke': '#1e40af', 'w': 3})
        items.append({'t': 'txt', 'p': [150, 90], 's': 'P', 'anchor': 'middle', 'size': 34, 'color': '#ffffff'})
    elif kind == 'traffic_light':
        items.append({'t': 'poly', 'p': [[125, 16], [175, 16], [175, 146], [125, 146]], 'fill': '#334155', 'stroke': '#0f172a', 'w': 2})
        items.append({'t': 'circle', 'c': [150, 42], 'r': 14, 'fill': '#ef4444', 'stroke': '#0f172a', 'w': 1.5})
        items.append({'t': 'circle', 'c': [150, 81], 'r': 14, 'fill': '#facc15', 'stroke': '#0f172a', 'w': 1.5})
        items.append({'t': 'circle', 'c': [150, 120], 'r': 14, 'fill': '#22c55e', 'stroke': '#0f172a', 'w': 1.5})
    if caption:
        items.append({'t': 'txt', 'p': [150, 162], 's': caption, 'anchor': 'middle', 'size': 12.5})
    return draw_fig(300, 175, items)


def fig_clock(hour: int, minute: int, caption: str = '') -> dict:
    items = [{'t': 'circle', 'c': [150, 88], 'r': 62, 'fill': '#f8fafc', 'stroke': '#1e293b', 'w': 2.5}]
    for h in range(1, 13):
        ang = math.radians(-90 + h * 30)
        x = round(150 + 49 * math.cos(ang), 1)
        y = round(92 + 49 * math.sin(ang), 1)
        items.append({'t': 'txt', 'p': [x, y], 's': str(h), 'anchor': 'middle', 'size': 11})
    h_ang = math.radians(-90 + ((hour % 12) + minute / 60.0) * 30)
    m_ang = math.radians(-90 + minute * 6)
    items.append({'t': 'line', 'a': [150, 88], 'b': [round(150 + 30 * math.cos(h_ang), 1), round(88 + 30 * math.sin(h_ang), 1)], 'arrow': True, 'color': '#1e293b', 'w': 3.5})
    items.append({'t': 'line', 'a': [150, 88], 'b': [round(150 + 46 * math.cos(m_ang), 1), round(88 + 46 * math.sin(m_ang), 1)], 'arrow': True, 'color': '#dc2626', 'w': 2.2})
    items.append({'t': 'pt', 'p': [150, 88]})
    if caption:
        items.append({'t': 'txt', 'p': [150, 168], 's': caption, 'anchor': 'middle', 'size': 12})
    return draw_fig(300, 180, items)


def fig_music_staff(notes: list[tuple[str, int]], title: str = '') -> dict:
    items = []
    if title:
        items.append({'t': 'txt', 'p': [175, 22], 's': title, 'anchor': 'middle', 'size': 13})
    for i in range(5):
        y = 50 + i * 16
        items.append({'t': 'line', 'a': [30, y], 'b': [320, y], 'color': '#64748b', 'w': 1.4})
    x = 65
    for name, pos in notes:
        ny = 114 - pos * 8
        if pos == 0:
            items.append({'t': 'line', 'a': [x - 12, ny], 'b': [x + 12, ny], 'color': '#1e293b', 'w': 1.5})
        items.append({'t': 'circle', 'c': [x, ny], 'r': 7, 'fill': '#1d4ed8', 'stroke': '#0f172a', 'w': 1.5})
        items.append({'t': 'line', 'a': [x + 7, ny], 'b': [x + 7, ny - 26], 'color': '#0f172a', 'w': 1.8})
        items.append({'t': 'txt', 'p': [x, 148], 's': name, 'anchor': 'middle', 'size': 12})
        x += 48
    return draw_fig(350, 168, items)


def fig_formation(kind: str, caption: str = '') -> dict:
    items = []
    if kind == 'row':
        for i in range(5):
            items.append({'t': 'circle', 'c': [60 + i * 45, 78], 'r': 12, 'fill': '#60a5fa', 'stroke': '#1d4ed8', 'w': 2})
        items.append({'t': 'line', 'a': [35, 108], 'b': [265, 108], 'dash': True, 'color': '#475569'})
    elif kind == 'column':
        for i in range(4):
            items.append({'t': 'circle', 'c': [150, 32 + i * 32], 'r': 11, 'fill': '#34d399', 'stroke': '#059669', 'w': 2})
        items.append({'t': 'line', 'a': [120, 18], 'b': [120, 145], 'dash': True, 'color': '#475569'})
    elif kind == 'circle':
        for i in range(8):
            ang = math.radians(i * 45)
            items.append({'t': 'circle', 'c': [round(150 + 52 * math.cos(ang), 1), round(84 + 52 * math.sin(ang), 1)], 'r': 10, 'fill': '#f472b6', 'stroke': '#db2777', 'w': 2})
    if caption:
        items.append({'t': 'txt', 'p': [150, 170], 's': caption, 'anchor': 'middle', 'size': 12.5})
    return draw_fig(300, 182, items)


def fig_folder_tree(root: str, children: list[str], caption: str = '') -> dict:
    items = [
        {'t': 'poly', 'p': [[35, 32], [135, 32], [135, 62], [35, 62]], 'fill': '#fef08a', 'stroke': '#ca8a04', 'w': 2},
        {'t': 'txt', 'p': [85, 51], 's': root, 'anchor': 'middle', 'size': 12},
    ]
    for i, ch in enumerate(children[:4]):
        y = 32 + i * 36
        items.append({'t': 'line', 'a': [135, 47], 'b': [180, y + 15], 'color': '#64748b', 'w': 1.8})
        items.append({'t': 'poly', 'p': [[180, y], [305, y], [305, y + 30], [180, y + 30]], 'fill': '#dbeafe', 'stroke': '#2563eb', 'w': 2})
        items.append({'t': 'txt', 'p': [242, y + 19], 's': ch, 'anchor': 'middle', 'size': 11.5})
    if caption:
        items.append({'t': 'txt', 'p': [170, 190], 's': caption, 'anchor': 'middle', 'size': 12})
    return draw_fig(340, 200, items)


def fig_flowchart(step1: str, cond: str, yes_step: str, no_step: str) -> dict:
    items = [
        {'t': 'poly', 'p': [[100, 14], [220, 14], [220, 44], [100, 44]], 'fill': '#dcfce7', 'stroke': '#16a34a', 'w': 2},
        {'t': 'txt', 'p': [160, 33], 's': step1, 'anchor': 'middle', 'size': 11.5},
        {'t': 'line', 'a': [160, 44], 'b': [160, 62], 'arrow': True, 'color': '#334155', 'w': 2},
        {'t': 'poly', 'p': [[160, 64], [235, 94], [160, 124], [85, 94]], 'fill': '#fef3c7', 'stroke': '#d97706', 'w': 2},
        {'t': 'txt', 'p': [160, 98], 's': cond, 'anchor': 'middle', 'size': 11.5},
        {'t': 'line', 'a': [85, 94], 'b': [55, 138], 'arrow': True, 'color': '#16a34a', 'w': 2},
        {'t': 'txt', 'p': [58, 110], 's': 'Đúng', 'anchor': 'middle', 'size': 10.5, 'color': '#15803d'},
        {'t': 'poly', 'p': [[10, 140], [135, 140], [135, 170], [10, 170]], 'fill': '#dbeafe', 'stroke': '#2563eb', 'w': 2},
        {'t': 'txt', 'p': [72, 159], 's': yes_step, 'anchor': 'middle', 'size': 11},
        {'t': 'line', 'a': [235, 94], 'b': [265, 138], 'arrow': True, 'color': '#dc2626', 'w': 2},
        {'t': 'txt', 'p': [264, 110], 's': 'Sai', 'anchor': 'middle', 'size': 10.5, 'color': '#dc2626'},
        {'t': 'poly', 'p': [[185, 140], [310, 140], [310, 170], [185, 170]], 'fill': '#fee2e2', 'stroke': '#dc2626', 'w': 2},
        {'t': 'txt', 'p': [247, 159], 's': no_step, 'anchor': 'middle', 'size': 11},
    ]
    return draw_fig(320, 185, items)
