import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// Mã bản dựng: đổi mỗi lần build/deploy. Ghi vào version.json để máy người dùng so sánh và tự cập nhật.
const BUILD_ID = (process.env.GITHUB_SHA || 'dev').slice(0, 7) + '-' + Date.now().toString(36);

export default defineConfig(() => {
  // Subpath hosting (e.g. GitHub Pages project site) sets VITE_BASE=/repo-name/
  const base = process.env.VITE_BASE || '/';
  return {
    base,
    define: { __BUILD_ID__: JSON.stringify(BUILD_ID) },
    plugins: [
      react(),
      {
        name: 'hsv-version-json',
        generateBundle() {
          this.emitFile({
            type: 'asset',
            fileName: 'version.json',
            source: JSON.stringify({ build: BUILD_ID, builtAt: new Date().toISOString() })
          });
        }
      },
      tailwindcss(),
      VitePWA({
        registerType: 'prompt',
        includeAssets: [
          'favicon.png',
          'apple-touch-icon.png',
          'pwa-192x192.png',
          'pwa-512x512.png',
          'assets/aistudio/image_f524b230.png'
        ],
        manifest: {
          id: '/',
          name: 'Học Siêu Vui',
          short_name: 'Học Siêu Vui',
          description: 'Toán lớp 1–9, KHTN lớp 6–9 theo SGK. Đấu trường, bản đồ thám hiểm, gom Sao leo bảng xếp hạng.',
          theme_color: '#2563eb',
          background_color: '#0f172a',
          display: 'standalone',
          orientation: 'portrait-primary',
          start_url: base,
          scope: base,
          categories: ['education', 'games'],
          icons: [
            {
              src: `${base}pwa-192x192.png`,
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: `${base}pwa-512x512.png`,
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: `${base}pwa-maskable-512x512.png`,
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable'
            }
          ]
        },
        workbox: {
          clientsClaim: true,
          cleanupOutdatedCaches: true,
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024 // Allow up to 5 MiB for high-res 3D Mascot images
        },
        devOptions: {
          enabled: true,
          type: 'module'
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname || '.', '.')
      }
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {}
    }
  };
});
