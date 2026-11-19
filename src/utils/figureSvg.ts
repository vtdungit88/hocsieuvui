/**
 * Vẽ hình minh họa cho câu hỏi từ dữ liệu khai báo (JSON) → chuỗi SVG an toàn (mọi chữ đều được escape).
 * Dùng chung cho app (QuestionFigure.tsx) và công cụ kiểm tra hình của nhóm nội dung (content/tools).
 *
 * Hệ tọa độ: pixel, gốc ở góc trên-trái, trục y hướng XUỐNG (như SVG). Góc (độ) đo NGƯỢC chiều kim đồng hồ
 * theo mắt nhìn, bắt đầu từ trục x hướng sang phải (0° = phải, 90° = lên trên).
 *
 * Hình vẽ:   { w, h, items: Item[] }            (type mặc định 'draw')
 * Biểu đồ cột: { type:'bars', title?, unit?, labels:[...], series:[{name?, values:[...]}] }
 * Bảng:      { type:'table', title?, head:[...], rows:[[...], ...] }
 *
 * Item (draw):
 *  {t:'poly', p:[[x,y],...], fill?, stroke?}          đa giác khép kín
 *  {t:'line', a:[x,y], b:[x,y], dash?, arrow?, w?, color?}
 *  {t:'circle', c:[x,y], r, fill?, dash?}
 *  {t:'arc', c:[x,y], r, from, to, color?}            cung/góc (độ), vẽ ngược chiều kim đồng hồ từ `from` đến `to`
 *  {t:'rt', at:[x,y], u:[dx,dy], v:[dx,dy], s?}       ký hiệu góc vuông tại đỉnh `at`, u/v là hướng 2 cạnh
 *  {t:'pt', p:[x,y], l?, dx?, dy?}                    điểm + nhãn (dx,dy: lệch nhãn)
 *  {t:'txt', p:[x,y], s, anchor?:'start'|'middle'|'end', size?, color?}
 *  {t:'tick', a:[x,y], b:[x,y], n?}                   dấu bằng nhau trên đoạn (n=1..3)
 *  {t:'par', a:[x,y], b:[x,y], n?}                    dấu song song (mũi tên >) trên đoạn
 *  {t:'curve', p:[[x,y],...], color?, w?}             đường cong qua nhiều điểm
 *  {t:'ell', c:[x,y], rx, ry, fill?, dash?}           hình elip (mặt đáy hình trụ/nón/cầu)
 */
type P = [number, number];
export interface DrawFigure { type?: 'draw'; w: number; h: number; items: Record<string, unknown>[] }
export interface BarsFigure { type: 'bars'; title?: string; unit?: string; labels: string[]; series: { name?: string; values: number[] }[] }
export interface TableFigure { type: 'table'; title?: string; head: string[]; rows: (string | number)[][] }
export type Figure = DrawFigure | BarsFigure | TableFigure;

const INK = '#1e293b';
const esc = (s: unknown) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
const num = (v: unknown, d = 0) => (typeof v === 'number' && Number.isFinite(v) ? v : d);
const pt = (v: unknown): P => (Array.isArray(v) ? [num(v[0]), num(v[1])] : [0, 0]);
const f = (n: number) => String(Math.round(n * 100) / 100);
const color = (v: unknown, d: string) => (typeof v === 'string' && /^#[0-9a-fA-F]{3,8}$|^[a-z]{3,20}$/.test(v) ? v : d);
const PALETTE = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];

function drawItem(it: Record<string, unknown>): string {
  const t = it.t;
  const stroke = color(it.color ?? it.stroke, INK);
  const sw = num(it.w, 2);
  const dash = it.dash ? ' stroke-dasharray="6 4"' : '';
  if (t === 'poly') {
    const pts = (Array.isArray(it.p) ? it.p : []).map(pt).map((q) => `${f(q[0])},${f(q[1])}`).join(' ');
    return `<polygon points="${pts}" fill="${color(it.fill, 'none')}" fill-opacity="${it.fill ? 0.55 : 1}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"${dash}/>`;
  }
  if (t === 'line') {
    const a = pt(it.a), b = pt(it.b);
    let head = '';
    if (it.arrow) {
      const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
      const l = 9, w = Math.PI / 7;
      head = `<polygon points="${f(b[0])},${f(b[1])} ${f(b[0] - l * Math.cos(ang - w))},${f(b[1] - l * Math.sin(ang - w))} ${f(b[0] - l * Math.cos(ang + w))},${f(b[1] - l * Math.sin(ang + w))}" fill="${stroke}"/>`;
    }
    return `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"${dash}/>${head}`;
  }
  if (t === 'circle') {
    const c = pt(it.c);
    return `<circle cx="${f(c[0])}" cy="${f(c[1])}" r="${f(num(it.r, 10))}" fill="${color(it.fill, 'none')}" fill-opacity="${it.fill ? 0.5 : 1}" stroke="${stroke}" stroke-width="${sw}"${dash}/>`;
  }
  if (t === 'ell') {
    const c = pt(it.c);
    return `<ellipse cx="${f(c[0])}" cy="${f(c[1])}" rx="${f(num(it.rx, 20))}" ry="${f(num(it.ry, 8))}" fill="${color(it.fill, 'none')}" fill-opacity="${it.fill ? 0.5 : 1}" stroke="${stroke}" stroke-width="${sw}"${dash}/>`;
  }
  if (t === 'arc') {
    const c = pt(it.c), r = num(it.r, 14);
    const a1 = (num(it.from) * Math.PI) / 180, a2 = (num(it.to) * Math.PI) / 180;
    const s: P = [c[0] + r * Math.cos(a1), c[1] - r * Math.sin(a1)];
    const e: P = [c[0] + r * Math.cos(a2), c[1] - r * Math.sin(a2)];
    let sweep = (((num(it.to) - num(it.from)) % 360) + 360) % 360;
    if (sweep === 0) sweep = 360;
    return `<path d="M ${f(s[0])} ${f(s[1])} A ${f(r)} ${f(r)} 0 ${sweep > 180 ? 1 : 0} 0 ${f(e[0])} ${f(e[1])}" fill="none" stroke="${color(it.color, '#dc2626')}" stroke-width="${num(it.w, 2)}"/>`;
  }
  if (t === 'rt') {
    const o = pt(it.at), u = pt(it.u), v = pt(it.v), s = num(it.s, 11);
    const nu = Math.hypot(u[0], u[1]) || 1, nv = Math.hypot(v[0], v[1]) || 1;
    const a: P = [o[0] + (u[0] / nu) * s, o[1] + (u[1] / nu) * s];
    const b: P = [o[0] + (v[0] / nv) * s, o[1] + (v[1] / nv) * s];
    const c: P = [a[0] + b[0] - o[0], a[1] + b[1] - o[1]];
    return `<polyline points="${f(a[0])},${f(a[1])} ${f(c[0])},${f(c[1])} ${f(b[0])},${f(b[1])}" fill="none" stroke="#dc2626" stroke-width="1.8"/>`;
  }
  if (t === 'pt') {
    const p = pt(it.p);
    const label = it.l ? `<text x="${f(p[0] + num(it.dx, 7))}" y="${f(p[1] + num(it.dy, -7))}" font-size="15" font-weight="700" fill="${INK}" font-family="'Be Vietnam Pro',system-ui,sans-serif">${esc(it.l)}</text>` : '';
    return `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="3.2" fill="${INK}"/>${label}`;
  }
  if (t === 'txt') {
    const p = pt(it.p);
    return `<text x="${f(p[0])}" y="${f(p[1])}" text-anchor="${it.anchor === 'middle' || it.anchor === 'end' ? it.anchor : 'start'}" font-size="${num(it.size, 13)}" fill="${color(it.color, INK)}" font-family="'Be Vietnam Pro',system-ui,sans-serif">${esc(it.s)}</text>`;
  }
  if (t === 'tick' || t === 'par') {
    const a = pt(it.a), b = pt(it.b), n = Math.min(3, Math.max(1, num(it.n, 1)));
    const m: P = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
    const ux = Math.cos(ang), uy = Math.sin(ang), nx = -uy, ny = ux;
    let out = '';
    for (let i = 0; i < n; i++) {
      const off = (i - (n - 1) / 2) * 5;
      const cx = m[0] + ux * off, cy = m[1] + uy * off;
      if (t === 'tick') out += `<line x1="${f(cx - nx * 6)}" y1="${f(cy - ny * 6)}" x2="${f(cx + nx * 6)}" y2="${f(cy + ny * 6)}" stroke="#dc2626" stroke-width="2"/>`;
      else out += `<polyline points="${f(cx - ux * 4 + nx * 6)},${f(cy - uy * 4 + ny * 6)} ${f(cx + ux * 4)},${f(cy + uy * 4)} ${f(cx - ux * 4 - nx * 6)},${f(cy - uy * 4 - ny * 6)}" fill="none" stroke="#dc2626" stroke-width="2"/>`;
    }
    return out;
  }
  if (t === 'curve') {
    const pts = (Array.isArray(it.p) ? it.p : []).map(pt);
    if (pts.length < 2) return '';
    return `<polyline points="${pts.map((q) => `${f(q[0])},${f(q[1])}`).join(' ')}" fill="none" stroke="${color(it.color, '#2563eb')}" stroke-width="${num(it.w, 2.4)}" stroke-linejoin="round" stroke-linecap="round"/>`;
  }
  return '';
}

function barsSvg(fig: BarsFigure): string {
  const labels = fig.labels.slice(0, 12);
  const series = fig.series.slice(0, 3);
  const maxV = Math.max(1, ...series.flatMap((s) => s.values.map((v) => num(v))));
  const step = maxV <= 10 ? 1 : maxV <= 20 ? 2 : maxV <= 50 ? 5 : maxV <= 100 ? 10 : Math.pow(10, Math.ceil(Math.log10(maxV)) - 1);
  const top = Math.ceil(maxV / step) * step;
  const W = Math.max(260, 70 + labels.length * (series.length > 1 ? 54 : 40)), H = 200;
  const L = 38, B = 36, T = fig.title ? 34 : 14, R = 10;
  const pw = W - L - R, ph = H - T - B;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img">`;
  if (fig.title) s += `<text x="${W / 2}" y="18" text-anchor="middle" font-size="13" font-weight="700" fill="${INK}" font-family="'Be Vietnam Pro',system-ui,sans-serif">${esc(fig.title)}</text>`;
  for (let v = 0; v <= top; v += step) {
    const y = T + ph - (v / top) * ph;
    s += `<line x1="${L}" y1="${f(y)}" x2="${W - R}" y2="${f(y)}" stroke="#e2e8f0"/><text x="${L - 5}" y="${f(y + 4)}" text-anchor="end" font-size="11" fill="#475569" font-family="sans-serif">${v}</text>`;
  }
  const slot = pw / labels.length;
  labels.forEach((lb, i) => {
    const gw = slot * 0.7, bw = gw / series.length;
    series.forEach((se, j) => {
      const v = num(se.values[i]);
      const h = (v / top) * ph;
      s += `<rect x="${f(L + i * slot + (slot - gw) / 2 + j * bw)}" y="${f(T + ph - h)}" width="${f(bw - 2)}" height="${f(h)}" fill="${PALETTE[j]}" rx="2"/>`;
      s += `<text x="${f(L + i * slot + (slot - gw) / 2 + j * bw + (bw - 2) / 2)}" y="${f(T + ph - h - 3)}" text-anchor="middle" font-size="10" fill="${INK}" font-family="sans-serif">${esc(v)}</text>`;
    });
    s += `<text x="${f(L + i * slot + slot / 2)}" y="${H - 18}" text-anchor="middle" font-size="11" fill="${INK}" font-family="'Be Vietnam Pro',system-ui,sans-serif">${esc(lb)}</text>`;
  });
  s += `<line x1="${L}" y1="${T}" x2="${L}" y2="${T + ph}" stroke="${INK}"/><line x1="${L}" y1="${T + ph}" x2="${W - R}" y2="${T + ph}" stroke="${INK}"/>`;
  if (fig.unit) s += `<text x="${L + 6}" y="${T - 3}" font-size="10" fill="#475569" font-family="sans-serif">${esc(fig.unit)}</text>`;
  if (series.length > 1 || series[0]?.name) {
    series.forEach((se, j) => { s += `<rect x="${L + j * 80}" y="${H - 12}" width="9" height="9" fill="${PALETTE[j]}"/><text x="${L + j * 80 + 12}" y="${H - 4}" font-size="10" fill="${INK}" font-family="'Be Vietnam Pro',system-ui,sans-serif">${esc(se.name ?? '')}</text>`; });
  }
  return s + '</svg>';
}

function tableSvg(fig: TableFigure): string {
  const cols = fig.head.length, rows = fig.rows.slice(0, 10);
  const cw = Math.max(52, Math.min(110, Math.floor(460 / Math.max(cols, 1))));
  const W = cw * cols + 2, rh = 28, T = fig.title ? 28 : 2, H = T + rh * (rows.length + 1) + 2;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img">`;
  if (fig.title) s += `<text x="${W / 2}" y="18" text-anchor="middle" font-size="13" font-weight="700" fill="${INK}" font-family="'Be Vietnam Pro',system-ui,sans-serif">${esc(fig.title)}</text>`;
  const cell = (r: number, c: number, text: unknown, head: boolean) =>
    `<rect x="${1 + c * cw}" y="${T + r * rh}" width="${cw}" height="${rh}" fill="${head ? '#dbeafe' : r % 2 ? '#ffffff' : '#f8fafc'}" stroke="#94a3b8"/><text x="${1 + c * cw + cw / 2}" y="${T + r * rh + 18}" text-anchor="middle" font-size="12.5" font-weight="${head ? 700 : 500}" fill="${INK}" font-family="'Be Vietnam Pro',system-ui,sans-serif">${esc(text)}</text>`;
  fig.head.forEach((h, c) => { s += cell(0, c, h, true); });
  rows.forEach((row, r) => row.slice(0, cols).forEach((v, c) => { s += cell(r + 1, c, v, false); }));
  return s + '</svg>';
}

export function figureToSvg(fig: unknown): string {
  if (!fig || typeof fig !== 'object') return '';
  const g = fig as Figure;
  if (g.type === 'bars') return Array.isArray(g.labels) && Array.isArray(g.series) ? barsSvg(g) : '';
  if (g.type === 'table') return Array.isArray(g.head) && Array.isArray(g.rows) ? tableSvg(g) : '';
  const d = g as DrawFigure;
  const w = Math.min(520, Math.max(80, num(d.w, 240))), h = Math.min(420, Math.max(60, num(d.h, 170)));
  const items = Array.isArray(d.items) ? d.items.slice(0, 120) : [];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img">${items.map(drawItem).join('')}</svg>`;
}
