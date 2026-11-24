import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2, Save, Search, X } from 'lucide-react';
import {
  fetchAdminFeedback,
  updateAdminFeedback,
  type AdminFeedbackItem,
  type AdminFeedbackResponse,
  type FeedbackPriority,
  type FeedbackStatus
} from '../../lib/adminApi';
import { FEEDBACK_CATEGORY_LABEL, FEEDBACK_STATUS_META } from './types';

interface FeedbackSectionProps {
  initialStatus?: 'all' | FeedbackStatus;
  globalSearch?: string;
  refreshSignal?: number;
}

const STATUS_TABS: { id: 'all' | FeedbackStatus; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'new', label: 'Mới' },
  { id: 'in_progress', label: 'Đang xử lý' },
  { id: 'resolved', label: 'Đã xử lý' },
  { id: 'closed', label: 'Đã đóng' }
];

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  initialStatus = 'all',
  globalSearch = '',
  refreshSignal = 0
}) => {
  const [status, setStatus] = useState<'all' | FeedbackStatus>(initialStatus);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState(globalSearch);
  const [page, setPage] = useState(0);
  const pageSize = 25;

  const [data, setData] = useState<AdminFeedbackResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Detail Drawer
  const [selected, setSelected] = useState<AdminFeedbackItem | null>(null);
  const [editStatus, setEditStatus] = useState<FeedbackStatus>('new');
  const [editPriority, setEditPriority] = useState<FeedbackPriority>('normal');
  const [editNote, setEditNote] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setStatus(initialStatus);
    setPage(0);
  }, [initialStatus]);

  useEffect(() => {
    setSearch(globalSearch);
    setPage(0);
  }, [globalSearch]);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetchAdminFeedback({
        status,
        category,
        search,
        limit: pageSize,
        offset: page * pageSize
      });
      setData(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Không tải được góp ý');
    } finally {
      setLoading(false);
    }
  }, [status, category, search, page]);

  useEffect(() => {
    void load();
  }, [load, refreshSignal]);

  const openTicket = (item: AdminFeedbackItem) => {
    setSelected(item);
    setEditStatus(item.status);
    setEditPriority(item.priority);
    setEditNote(item.admin_note ?? '');
  };

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    setError('');
    try {
      await updateAdminFeedback(selected.id, editStatus, editPriority, editNote);
      setSelected({ ...selected, status: editStatus, priority: editPriority, admin_note: editNote });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Không lưu được trạng thái góp ý');
    } finally {
      setSaving(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil((data?.total ?? 0) / pageSize));

  return (
    <div className="space-y-4">
      {/* Filter Toolbar */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {STATUS_TABS.map((t) => {
            const count = data?.counts[t.id];
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setStatus(t.id);
                  setPage(0);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  status === t.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {t.label} {count !== undefined ? `(${count})` : ''}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              placeholder="Tìm trong nội dung góp ý hoặc người gửi…"
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(0);
            }}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
            aria-label="Lọc theo loại góp ý"
          >
            <option value="all">Tất cả phân loại</option>
            <option value="bug">Báo lỗi (Bug)</option>
            <option value="suggestion">Góp ý / Đề xuất</option>
            <option value="question">Hỏi đáp / Nội dung</option>
            <option value="compliment">Khen ngợi</option>
          </select>
        </div>
      </div>

      {error && <div role="alert" className="rounded-xl bg-rose-50 text-rose-700 p-3 text-sm">{error}</div>}

      {/* Feedback Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/70 text-xs uppercase text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Người gửi</th>
                <th className="py-3 px-3">Loại</th>
                <th className="py-3 px-3">Nội dung</th>
                <th className="py-3 px-3">Thời gian</th>
                <th className="py-3 px-3">Mức độ</th>
                <th className="py-3 px-3">Trạng thái</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading && !data ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    <Loader2 className="w-5 h-5 animate-spin inline mr-2" /> Đang tải phiếu góp ý…
                  </td>
                </tr>
              ) : (data?.rows ?? []).length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    Chưa có góp ý nào khớp bộ lọc.
                  </td>
                </tr>
              ) : (
                (data?.rows ?? []).map((item) => {
                  const statusMeta = FEEDBACK_STATUS_META[item.status] ?? FEEDBACK_STATUS_META.new;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-semibold whitespace-nowrap">{item.alias}</td>
                      <td className="py-3 px-3 whitespace-nowrap text-xs">
                        {FEEDBACK_CATEGORY_LABEL[item.category] ?? item.category}
                      </td>
                      <td className="py-3 px-3 max-w-md">
                        <div className="truncate text-slate-700 dark:text-slate-200">{item.message}</div>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-xs text-slate-500">
                        {new Date(item.created_at).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          item.priority === 'high'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                        }`}>
                          {item.priority === 'high' ? 'Ưu tiên' : 'Bình thường'}
                        </span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${statusMeta.badge}`}>
                          {statusMeta.label}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => openTicket(item)}
                          className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 dark:bg-slate-800 dark:text-slate-200 text-xs font-semibold cursor-pointer"
                        >
                          Xem &amp; xử lý
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500">
          <span>Tổng: {data?.total ?? 0} góp ý (Trang {page + 1}/{totalPages})</span>
          <div className="flex items-center gap-1.5">
            <button type="button" disabled={page === 0} onClick={() => setPage((p) => Math.max(0, p - 1))} className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button type="button" disabled={page + 1 >= totalPages} onClick={() => setPage((p) => p + 1)} className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Ticket Detail Panel Drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 h-full overflow-y-auto border-l border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold">Chi tiết góp ý</h3>
                <p className="text-xs text-slate-500">
                  {selected.alias} · {new Date(selected.created_at).toLocaleString('vi-VN')}
                </p>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Phân loại: <b>{FEEDBACK_CATEGORY_LABEL[selected.category] ?? selected.category}</b></span>
                {selected.rating ? <span>Đánh giá: <b>{selected.rating}/5</b></span> : null}
              </div>
              <p className="text-sm whitespace-pre-wrap break-words text-slate-800 dark:text-slate-100">{selected.message}</p>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <label className="space-y-1 text-xs font-semibold">
                  <span>Trạng thái xử lý</span>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as FeedbackStatus)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm"
                  >
                    <option value="new">Mới</option>
                    <option value="in_progress">Đang xử lý</option>
                    <option value="resolved">Đã xử lý</option>
                    <option value="closed">Đã đóng</option>
                  </select>
                </label>

                <label className="space-y-1 text-xs font-semibold">
                  <span>Mức độ ưu tiên</span>
                  <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value as FeedbackPriority)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm"
                  >
                    <option value="normal">Bình thường</option>
                    <option value="high">Ưu tiên cao</option>
                  </select>
                </label>
              </div>

              <label className="block space-y-1 text-xs font-semibold">
                <span>Ghi chú quản trị nội bộ</span>
                <textarea
                  rows={4}
                  value={editNote}
                  onChange={(e) => setEditNote(e.target.value)}
                  placeholder="Ghi chú hướng xử lý, bản vá hoặc kết quả phản hồi…"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm"
                />
              </label>

              {selected.handled_by_alias && (
                <div className="text-[11px] text-slate-500">
                  Cập nhật lần cuối bởi <b>{selected.handled_by_alias}</b> lúc {new Date(selected.updated_at).toLocaleString('vi-VN')}
                </div>
              )}

              <button
                type="button"
                disabled={saving}
                onClick={() => void handleSave()}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold inline-flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Lưu cập nhật phiếu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
