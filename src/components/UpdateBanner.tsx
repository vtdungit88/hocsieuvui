import React from 'react';
import { RefreshCw } from 'lucide-react';
import { applyUpdate, useUpdateAvailable } from '../lib/appUpdate';
import { RELEASE_NOTES } from '../data/releaseNotes';

/** Thanh nổi nhỏ ở đáy màn hình khi có bản mới. */
export const UpdateBanner: React.FC = () => {
  const available = useUpdateAvailable();
  if (!available) return null;
  const latest = RELEASE_NOTES[0];
  return (
    <div role="status" className="fixed left-3 right-3 bottom-24 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-[90] rounded-2xl bg-slate-900 text-white shadow-2xl border border-white/10 p-3.5 flex items-center gap-3">
      <span className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shrink-0"><RefreshCw className="w-5 h-5" /></span>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-black">Có bản mới của Học Siêu Vui!</div>
        <div className="text-xs text-slate-300 truncate">{latest.title}</div>
      </div>
      <button onClick={() => void applyUpdate()} className="px-3 py-2 rounded-xl bg-yellow-300 hover:bg-yellow-200 text-slate-900 text-xs font-black cursor-pointer shrink-0">Cập nhật</button>
    </div>
  );
};
