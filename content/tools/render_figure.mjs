// Dùng: node --experimental-strip-types content/tools/render_figure.mjs <file.json> <outDir>
// File JSON là một mảng các câu hỏi (có trường "fig") HOẶC một mảng các figure. Xuất <outDir>/<index>.svg và gallery.html
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { figureToSvg } from '../../src/utils/figureSvg.ts';
const [, , inFile, outDir] = process.argv;
const data = JSON.parse(readFileSync(inFile, 'utf8'));
mkdirSync(outDir, { recursive: true });
let html = '<meta charset="utf-8"><body style="font-family:sans-serif;display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:12px;padding:12px;background:#f1f5f9">';
data.forEach((q, i) => {
  const fig = q.fig ?? q;
  const svg = figureToSvg(fig);
  if (!svg) return;
  writeFileSync(`${outDir}/${i}.svg`, svg);
  html += `<div style="background:#fff;padding:8px;border-radius:8px"><b>${q.c ?? i}</b><div style="font-size:12px;margin:4px 0">${(q.p ?? '').replace(/</g, '&lt;')}</div>${svg}</div>`;
});
writeFileSync(`${outDir}/gallery.html`, html);
console.log('rendered', data.length);
