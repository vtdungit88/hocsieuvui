// Đảm bảo mỗi lần tăng phiên bản đều có ghi chú "có gì mới" (trợ lý ảo + thanh cập nhật đọc từ đây).
import { readFileSync } from 'node:fs';
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const src = readFileSync('src/data/releaseNotes.ts', 'utf8');
const m = src.match(/RELEASE_NOTES: ReleaseNote\[\] = \[\s*\{\s*version: '([^']+)'/);
if (!m) { console.error('Không đọc được release note đầu tiên'); process.exit(1); }
if (m[1] !== pkg.version) {
  console.error(`package.json version (${pkg.version}) khác release note đầu tiên (${m[1]}). Hãy thêm mục mới vào src/data/releaseNotes.ts và cập nhật trợ lý ảo.`);
  process.exit(1);
}
console.log('release notes OK', pkg.version);
