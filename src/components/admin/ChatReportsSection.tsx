import React, { useCallback, useEffect, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  EyeOff,
  Loader2,
  Lock,
  RotateCcw,
  Search,
  ShieldAlert,
  X
} from 'lucide-react';
import {
  fetchAdminLobbyReports,
  moderateAdminLobbyReport,
  type AdminLobbyReportItem,
  type AdminLobbyReportsResponse,
  type ModerateAction,
  type ReportStatus
} from '../../lib/adminApi';
import { REPORT_STATUS_META } from './types';

interface ChatReportsSectionProps {
  initialStatus?: 'all' | ReportStatus;
  globalSearch?: string;
  refreshSignal?: number;
}

const REPORT_TABS: { id: 'all' | ReportStatus; label: string }[] = [
  { id: 'open', label: 'Chờ kiểm tra' },
  { id: 'resolved', label: 'Đã xử lý' },
  { id: 'dismissed', label: 'Đã bỏ qua' },
  { id: 'all', label: 'Tất cả' }
];

export const ChatReportsSection: React.FC<ChatReportsSectionProps> = ({
  initialStatus = 'open',
  globalSearch = '',
  refreshSignal = 0
}) => {
  const [status, setStatus] = useState<'all' | ReportStatus>(initialStatus);
  const [search, setSearch] = useState(globalSearch);
  const [data, setData] = useState<AdminLobbyReportsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [selected, setSelected] = useState<AdminLobbyReportItem | null>(null);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [confirmLockAccount, setConfirmLockAccount] = useState(false);

  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  useEffect(() => {
    setSearch(globalSearch);
  }, [globalSearch]);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetchAdminLobbyReports({ status, search });
      setData(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Không tải được báo cáo sảnh trò chuyện');
    } finally {
      setLoading(false);
    }
  }, [status, search]);

  useEffect(() => {
    void load();
  }, [load, refreshSignal]);

  const handleAction = async (reportId: string, action: ModerateAction) => {
    setConfirmLockAccount(false);
    setBusy(true);
    setError('');
    try {
      await moderateAdminLobbyReport(reportId, action, note.trim() || undefined);
      setSelected(null);
      setNote('');
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Không thực hiện được hành động kiểm duyệt');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {REPORT_TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setStatus(t.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  status === t.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {t.label} ({data?.counts[t.id] ?? 0})
              </button>
            ))}
          </div>
          <span className="text-xs text-slate-500">Mọi thao tác kiểm duyệt được lưu vào Audit Log</span>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo nội dung vi phạm, lý do, người bị báo cáo hoặc người gửi…"
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {error && <div role="alert" className="rounded-xl bg-rose-50 text-rose-700 p-3 text-sm">{error}</div>}

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
        {loading && !data ? (
          <div className="py-10 text-center text-sm text-slate-500">
            <Loader2 className="w-5 h-5 animate-spin inline mr-2" /> Đang tải hàng đợi kiểm duyệt…
          </div>
        ) : (data?.rows ?? []).length === 0 ? (
          <div className="py-10 text-center text-sm text-slate-500">
            Không có báo cáo trò chuyện nào trong mục này.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {(data?.rows ?? []).map((r) => {
              const st = REPORT_STATUS_META[r.status] ?? REPORT_STATUS_META.open;
              return (
                <div
                  key={r.id}
                  className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-50/70 dark:hover:bg-slate-800/40"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${st.badge}`}>{st.label}</span>
                      <span className="font-bold text-slate-900 dark:text-white">{r.target_alias}</span>
                      {r.target_report_count > 1 && (
                        <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          {r.target_report_count} báo cáo liên quan
                        </span>
                      )}
                      <span className="text-slate-400">· Phòng: {r.room_key}</span>
                      <span className="text-slate-400">· Báo cáo bởi: {r.reporter_alias}</span>
                      <span className="text-slate-400">· {new Date(r.created_at).toLocaleString('vi-VN')}</span>
                    </div>
                    <div className="text-sm font-medium text-slate-800 dark:text-slate-100 break-words">“{r.excerpt}”</div>
                    <div className="text-xs text-rose-600 dark:text-rose-400">Lý do: {r.reason}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setSelected(r);
                        setNote(r.admin_note ?? '');
                        setConfirmLockAccount(false);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold cursor-pointer"
                    >
                      Xem &amp; xử lý
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Report Detail Moderation Drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 h-full overflow-y-auto border-l border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-500" />
                <div>
                  <h3 className="text-base font-bold">Kiểm duyệt báo cáo trò chuyện</h3>
                  <p className="text-xs text-slate-500">{new Date(selected.created_at).toLocaleString('vi-VN')}</p>
                </div>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 p-4 space-y-2">
              <div className="text-xs font-semibold text-rose-700 dark:text-rose-300">Nội dung bị báo cáo</div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white break-words">“{selected.excerpt}”</p>
              <div className="text-xs text-slate-600 dark:text-slate-300">Lý do: <b>{selected.reason}</b></div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-3 space-y-1">
                <div className="text-slate-500">Người gửi tin</div>
                <div className="font-bold text-slate-900 dark:text-white">{selected.target_alias}</div>
                <div className="text-slate-500">Tổng báo cáo: {selected.target_report_count}</div>
                {selected.target_muted_until && (
                  <div className="text-amber-600 font-semibold">Đang bị tắt chat tới {new Date(selected.target_muted_until).toLocaleString('vi-VN')}</div>
                )}
                {selected.target_locked && <div className="text-rose-600 font-semibold">Tài khoản đang khóa</div>}
              </div>
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-3 space-y-1">
                <div className="text-slate-500">Ngữ cảnh</div>
                <div className="font-semibold">Phòng: {selected.room_key}</div>
                <div className="text-slate-500">Người báo cáo: {selected.reporter_alias}</div>
                {selected.handled_by_alias && (
                  <div className="text-slate-500">Xử lý bởi: {selected.handled_by_alias}</div>
                )}
              </div>
            </div>

            <label className="block space-y-1 text-xs font-semibold">
              <span>Ghi chú xử lý (lưu vào lịch sử kiểm duyệt)</span>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ghi chú lý do quyết định kiểm duyệt…"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm"
              />
            </label>

            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Hành động kiểm duyệt</div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void handleAction(selected.id, 'hide_msg')}
                  className="px-3 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <EyeOff className="w-3.5 h-3.5" /> Ẩn tin nhắn
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void handleAction(selected.id, 'warn')}
                  className="px-3 py-2 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-900 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <AlertTriangle className="w-3.5 h-3.5" /> Cảnh báo
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void handleAction(selected.id, 'mute_1h')}
                  className="px-3 py-2 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-900 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Clock className="w-3.5 h-3.5" /> Khóa chat 1h
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void handleAction(selected.id, 'mute_24h')}
                  className="px-3 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-900 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Clock className="w-3.5 h-3.5" /> Khóa chat 24h
                </button>
                {confirmLockAccount ? (
                  <div className="col-span-2 flex items-center gap-2">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void handleAction(selected.id, 'lock_account')}
                      className="flex-1 px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Lock className="w-3.5 h-3.5" /> Xác nhận khóa {selected.target_alias}
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => setConfirmLockAccount(false)}
                      className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold cursor-pointer"
                    >
                      Hủy
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => setConfirmLockAccount(true)}
                    className="col-span-2 px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Lock className="w-3.5 h-3.5" /> Ẩn tin &amp; khóa tài khoản vi phạm
                  </button>
                )}
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void handleAction(selected.id, 'dismiss')}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Báo cáo không hợp lệ
                </button>
                {selected.status !== 'open' && (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void handleAction(selected.id, 'reopen')}
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Mở lại
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
