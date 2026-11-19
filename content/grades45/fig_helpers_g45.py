import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
G123 = os.path.join(os.path.dirname(HERE), 'grades123')
if G123 not in sys.path:
    sys.path.insert(0, G123)

from fig_helpers_g123 import (  # noqa: E402, F401
    bars_fig,
    draw_fig,
    fig_clock,
    fig_flowchart,
    fig_folder_tree,
    fig_formation,
    fig_lines,
    fig_music_staff,
    fig_shape,
    fig_color_mix,
    fig_traffic_sign,
    table_fig,
)


def fig_food_chain(nodes: list[str], caption: str = '') -> dict:
    items = []
    n = min(len(nodes), 4)
    xs = [45, 125, 205, 285][:n]
    fills = ['#dcfce7', '#fef9c3', '#ffedd5', '#fee2e2']
    strokes = ['#16a34a', '#ca8a04', '#ea580c', '#dc2626']
    for i, label in enumerate(nodes[:n]):
        x = xs[i]
        items.append({'t': 'poly', 'p': [[x - 32, 42], [x + 32, 42], [x + 32, 82], [x - 32, 82]], 'fill': fills[i], 'stroke': strokes[i], 'w': 2})
        items.append({'t': 'txt', 'p': [x, 66], 's': label[:12], 'anchor': 'middle', 'size': 10.5})
        if i < n - 1:
            items.append({'t': 'line', 'a': [x + 32, 62], 'b': [xs[i + 1] - 32, 62], 'arrow': True, 'color': '#334155', 'w': 2})
    if caption:
        items.append({'t': 'txt', 'p': [165, 114], 's': caption, 'anchor': 'middle', 'size': 11.5})
    return draw_fig(330, 130, items)


def fig_timeline(events: list[tuple[str, str]], caption: str = '') -> dict:
    items = [{'t': 'line', 'a': [25, 68], 'b': [315, 68], 'arrow': True, 'color': '#2563eb', 'w': 2.5}]
    n = min(len(events), 4)
    for i, (yr, lbl) in enumerate(events[:n]):
        x = 55 + i * 75
        items.append({'t': 'pt', 'p': [x, 68]})
        items.append({'t': 'txt', 'p': [x, 48], 's': yr, 'anchor': 'middle', 'size': 11.5, 'color': '#1d4ed8'})
        items.append({'t': 'txt', 'p': [x, 94], 's': lbl[:14], 'anchor': 'middle', 'size': 10.5})
    if caption:
        items.append({'t': 'txt', 'p': [170, 125], 's': caption, 'anchor': 'middle', 'size': 11.5})
    return draw_fig(340, 140, items)


def fig_circuit(switch_closed: bool = True, bulb_on: bool = True, caption: str = '') -> dict:
    items = [
        {'t': 'poly', 'p': [[70, 35], [250, 35], [250, 135], [70, 135]], 'stroke': '#334155', 'w': 2.5},
        # Pin
        {'t': 'poly', 'p': [[55, 68], [85, 68], [85, 102], [55, 102]], 'fill': '#fef08a', 'stroke': '#ca8a04', 'w': 2},
        {'t': 'txt', 'p': [70, 90], 's': 'Pin', 'anchor': 'middle', 'size': 11},
        # Bóng đèn
        {'t': 'circle', 'c': [250, 85], 'r': 20, 'fill': '#fde047' if bulb_on else '#e2e8f0', 'stroke': '#1e293b', 'w': 2},
        {'t': 'txt', 'p': [250, 89], 's': 'Đèn', 'anchor': 'middle', 'size': 10.5},
        # Công tắc ở cạnh trên
        {'t': 'poly', 'p': [[135, 25], [185, 25], [185, 45], [135, 45]], 'fill': '#ffffff', 'stroke': '#ffffff', 'w': 1},
        {'t': 'pt', 'p': [140, 35]},
        {'t': 'pt', 'p': [180, 35]},
    ]
    if switch_closed:
        items.append({'t': 'line', 'a': [140, 35], 'b': [180, 35], 'color': '#16a34a', 'w': 3.2})
    else:
        items.append({'t': 'line', 'a': [140, 35], 'b': [176, 16], 'color': '#dc2626', 'w': 3.2})
    if caption:
        items.append({'t': 'txt', 'p': [160, 162], 's': caption, 'anchor': 'middle', 'size': 11.5})
    return draw_fig(320, 175, items)


def fig_compass(caption: str = 'La bàn 4 hướng chính') -> dict:
    items = [
        {'t': 'circle', 'c': [150, 88], 'r': 50, 'fill': '#f8fafc', 'stroke': '#334155', 'w': 2},
        {'t': 'line', 'a': [150, 44], 'b': [150, 132], 'arrow': True, 'color': '#dc2626', 'w': 2.2},
        {'t': 'line', 'a': [106, 88], 'b': [194, 88], 'color': '#2563eb', 'w': 2},
        {'t': 'txt', 'p': [150, 30], 's': 'Bắc (B)', 'anchor': 'middle', 'size': 11.5, 'color': '#dc2626'},
        {'t': 'txt', 'p': [150, 152], 's': 'Nam (N)', 'anchor': 'middle', 'size': 11.5},
        {'t': 'txt', 'p': [218, 92], 's': 'Đông (Đ)', 'anchor': 'middle', 'size': 11.5},
        {'t': 'txt', 'p': [82, 92], 's': 'Tây (T)', 'anchor': 'middle', 'size': 11.5},
    ]
    if caption:
        items.append({'t': 'txt', 'p': [150, 174], 's': caption, 'anchor': 'middle', 'size': 11.5})
    return draw_fig(300, 185, items)


def fig_scratch_blocks(blocks: list[str], caption: str = '') -> dict:
    items = []
    colors = ['#eab308', '#3b82f6', '#f97316', '#8b5cf6']
    for i, blk in enumerate(blocks[:4]):
        y = 18 + i * 34
        c = colors[i % len(colors)]
        items.append({'t': 'poly', 'p': [[45, y], [275, y], [275, y + 28], [45, y + 28]], 'fill': c, 'stroke': '#1e293b', 'w': 1.5})
        items.append({'t': 'txt', 'p': [160, y + 18], 's': blk[:32], 'anchor': 'middle', 'size': 11, 'color': '#ffffff'})
    if caption:
        items.append({'t': 'txt', 'p': [160, 174], 's': caption, 'anchor': 'middle', 'size': 11.5})
    return draw_fig(320, 186, items)
