import { useEffect, useState } from 'react';
import { registerSW } from 'virtual:pwa-register';

/**
 * Tự cập nhật phiên bản:
 *  - /version.json (không cache) được kiểm tra khi mở app, khi quay lại tab, khi có mạng lại và mỗi 5 phút.
 *  - Khi mã bản dựng khác bản đang chạy → báo "có bản mới"; service worker mới được tải sẵn ở nền.
 *  - Người dùng bấm "Cập nhật" (hoặc tab bị ẩn/đóng lại) → kích hoạt bản mới và tải lại đúng một lần.
 */
const BASE = import.meta.env.BASE_URL;
const CHECK_EVERY_MS = 5 * 60 * 1000;

type Listener = (available: boolean) => void;
const listeners = new Set<Listener>();
let available = false;
let started = false;
let updateSW: ((reload?: boolean) => Promise<void>) | null = null;
let registration: ServiceWorkerRegistration | undefined;

function setAvailable(v: boolean) {
  if (available === v) return;
  available = v;
  listeners.forEach((l) => l(v));
}

async function checkVersion() {
  try {
    const res = await fetch(`${BASE}version.json?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return;
    const data = (await res.json()) as { build?: string };
    if (data.build && data.build !== __BUILD_ID__) {
      setAvailable(true);
      void registration?.update(); // tải sẵn SW mới để bấm là có ngay
    }
  } catch {
    /* offline: bỏ qua */
  }
}

export function startAppUpdateWatcher() {
  if (started || typeof window === 'undefined') return;
  started = true;
  if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    updateSW = registerSW({
      immediate: true,
      onNeedRefresh() { setAvailable(true); },
      onRegisteredSW(_url, reg) { registration = reg; }
    });
  }
  if (!import.meta.env.PROD) return; // dev: không có version.json
  void checkVersion();
  window.setInterval(() => void checkVersion(), CHECK_EVERY_MS);
  window.addEventListener('online', () => void checkVersion());
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') void checkVersion();
    else if (available) void applyUpdate(); // người dùng rời tab: cập nhật êm, không làm gián đoạn
  });
}

let applying = false;
export async function applyUpdate() {
  if (applying) return;
  applying = true;
  try {
    if (updateSW) await updateSW(true); // skipWaiting + reload
    else window.location.reload();
  } catch {
    window.location.reload();
  }
  // dự phòng nếu SW không kích hoạt được: tải lại bằng URL mới
  window.setTimeout(() => {
    const u = new URL(window.location.href);
    u.searchParams.set('v', Date.now().toString(36));
    window.location.replace(u.toString());
  }, 3000);
}

export function useUpdateAvailable(): boolean {
  const [v, setV] = useState(available);
  useEffect(() => {
    listeners.add(setV);
    setV(available);
    return () => { listeners.delete(setV); };
  }, []);
  return v;
}
