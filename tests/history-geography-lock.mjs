// UI release-gate E2E: secondary grades 6–9 stay locked while primary grades 4–5 remain open.
import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const BASE = process.env.PREVIEW_URL || 'http://localhost:4173/hocsieuvui/';
const viewports = [
  ['phone', 360, 740],
  ['desktop', 1366, 768]
];

const browser = await chromium.launch();
try {
  for (const [name, width, height] of viewports) {
    const context = await browser.newContext({ viewport: { width, height } });
    const page = await context.newPage();
    await page.goto(BASE, { waitUntil: 'networkidle' });

    await page.getByRole('button', { name: /Trung học/ }).click();
    const historyGeoCard = page.getByRole('button', { name: /Lịch Sử và Địa Lí/ });
    await historyGeoCard.waitFor({ state: 'visible' });
    assert.match(await historyGeoCard.innerText(), /Chờ thẩm định/);
    assert.doesNotMatch(await historyGeoCard.innerText(), /Đang mở/);

    await historyGeoCard.click();
    await page.getByRole('button', { name: /Lớp 6/ }).click();
    const grade6Start = page.getByRole('button', { name: /Vào học Lớp 6/ });
    assert.equal(await grade6Start.isDisabled(), true, name + ': Grade 6 must remain locked');
    assert.equal(await page.getByText(/chờ thẩm định độc lập/i).isVisible(), true);

    await page.getByRole('button', { name: /Tiểu học \(1–5\)/ }).click();
    await page.getByRole('button', { name: /Lớp 4/ }).click();
    const grade4Start = page.getByRole('button', { name: /Vào học Lớp 4/ });
    assert.equal(await grade4Start.isDisabled(), false, name + ': existing Grade 4 access must remain open');

    console.log('PASS History & Geography release gate at ' + name + ' ' + width + 'x' + height);
    await context.close();
  }
} finally {
  await browser.close();
}
