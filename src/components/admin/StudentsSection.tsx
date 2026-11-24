import React, { useCallback, useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
  Search,
  ShieldAlert,
  Unlock,
  UserCheck,
  X
} from 'lucide-react';
import {
  adminResetPassword,
  fetchAdminStudentDetail,
  fetchAdminStudents,
  setStudentAccountType,
  toggleStudentLock,
  type AccountType,
  type AdminStudentDetail,
  type AdminStudentRow,
  type AdminStudentsResponse,
  type StudentFilter
} from '../../lib/adminApi';
import { ACCOUNT_TYPE_META, formatRelativeVi } from './types';

interface StudentsSectionProps {
  initialFilter?: StudentFilter;
  globalSearch?: string;
  refreshSignal?: number;
}

const FILTER_TABS: { id: StudentFilter; label: string }[] = [
  { id: 'all', label: 'Tất cả học sinh thật' },
  { id: 'new_7d', label: 'Đăng ký mới' },
  { id: 'active_7d', label: 'Đang hoạt động' },
  { id: 'inactive', label: 'Không hoạt động' },
  { id: 'locked', label: 'Đang khóa' },
  { id: 'test_only', label: 'Chỉ học sinh test' }
];

export const StudentsSection: React.FC<StudentsSectionProps> = ({
  initialFilter = 'all',
  globalSearch = '',
  refreshSignal = 0
}) => {
  const [filter, setFilter] = useState<StudentFilter>(initialFilter);
  const [includeTest, setIncludeTest] = useState(false);
  const [grade, setGrade] = useState<number | null>(null);
  const [search, setSearch] = useState(globalSearch);
  const [page, setPage] = useState(0);
  const pageSize = 25;

  const [data, setData] = useState<AdminStudentsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Detail Drawer state
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<AdminStudentDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [actionBusy, setActionBusy] = useState(false);
  const [actionMsg, setActionMsg] = useState('');
  const [lockReason, setLockReason] = useState('');
  const [confirmLock, setConfirmLock] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    setFilter(initialFilter);
    setPage(0);
  }, [initialFilter]);

  useEffect(() => {
    setSearch(globalSearch);
    setPage(0);
  }, [globalSearch]);

  const loadList = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetchAdminStudents({
        filter,
        includeTest: filter === 'test_only' ? true : includeTest,
        grade,
        search,
        limit: pageSize,
        offset: page * pageSize
      });
      setData(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Lỗi tải danh sách học sinh');
    } finally {
      setLoading(false);
    }
  }, [filter, includeTest, grade, search, page]);

  useEffect(() => {
    void loadList();
  }, [loadList, refreshSignal]);

  const openDetail = async (student: AdminStudentRow) => {
    setSelectedId(student.id);
    setDetail(null);
    setDetailLoading(true);
    setActionMsg('');
    setLockReason(student.locked_reason ?? '');
    setConfirmLock(false);
    setNewPassword('');
    try {
      const d = await fetchAdminStudentDetail(student.id);
      setDetail(d);
    } catch (e) {
      setActionMsg(e instanceof Error ? e.message : 'Không tải được hồ sơ chi tiết');
    } finally {
      setDetailLoading(false);
    }
  };

  const handleClassify = async (accountType: AccountType) => {
    if (!detail) return;
    setActionBusy(true);
    setActionMsg('');
    try {
      await setStudentAccountType(detail.id, accountType, 'Phân loại từ Admin Học sinh');
      setDetail({ ...detail, account_type: accountType });
      setActionMsg(`Đã cập nhật loại tài khoản sang "${ACCOUNT_TYPE_META[accountType].label}".`);
      void loadList();
    } catch (e) {
      setActionMsg(e instanceof Error ? e.message : 'Không cập nhật được loại tài khoản');
    } finally {
      setActionBusy(false);
    }
  };

  const handleToggleLock = async (lock: boolean) => {
    if (!detail) return;
    setConfirmLock(false);
    setActionBusy(true);
    setActionMsg('');
    try {
      await toggleStudentLock(detail.id, lock, lockReason.trim() || undefined);
      setDetail({ ...detail, is_locked: lock, locked_reason: lock ? (lockReason.trim() || 'Tạm khóa bởi quản trị viên') : null });
      setActionMsg(lock ? 'Đã khóa tài khoản.' : 'Đã mở khóa tài khoản.');
      void loadList();
    } catch (e) {
      setActionMsg(e instanceof Error ? e.message : 'Không cập nhật được trạng thái khóa');
    } finally {
      setActionBusy(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!detail) return;
    if (newPassword.length < 6) {
      setActionMsg('Mật khẩu mới cần ít nhất 6 ký tự.');
      return;
    }
    setActionBusy(true);
    setActionMsg('');
    try {
      await adminResetPassword(detail.alias, newPassword);
      setNewPassword('');
      setActionMsg(`Đã đặt lại mật khẩu mới cho "${detail.alias}".`);
    } catch (err) {
      setActionMsg(err instanceof Error ? err.message : 'Không đặt lại được mật khẩu');
    } finally {
      setActionBusy(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil((data?.total ?? 0) / pageSize));

  return (
    <div className="space-y-4">
      {/* Top Filter & Test Toggle Bar */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {FILTER_TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setFilter(t.id);
                  setPage(0);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  filter === t.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Dedicated Real vs Test Account Toggle */}
          <button
            type="button"
            disabled={filter === 'test_only'}
            onClick={() => {
              setIncludeTest((v) => !v);
              setPage(0);
            }}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50 ${
              includeTest || filter === 'test_only'
                ? 'border-violet-300 bg-violet-50 text-violet-800 dark:border-violet-700 dark:bg-violet-950/50 dark:text-violet-200'
                : 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            {includeTest || filter === 'test_only' ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>
              {includeTest || filter === 'test_only'
                ? `Đang hiện tài khoản test (${data?.counts.test ?? 0})`
                : `Ẩn học sinh test (${data?.counts.test ?? 0})`}
            </span>
          </button>
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
              placeholder="Tìm theo biệt danh hoặc mã UUID học sinh…"
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={grade ?? ''}
            onChange={(e) => {
              setGrade(e.target.value ? Number(e.target.value) : null);
              setPage(0);
            }}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
            aria-label="Lọc theo lớp"
          >
            <option value="">Tất cả khối lớp</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((g) => (
              <option key={g} value={g}>
                Lớp {g}
              </option>
            ))}
          </select>
        </div>

        {/* Summary Counters */}
        {data && (
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
            <span>Học sinh thật: <b className="text-slate-900 dark:text-white">{data.counts.real}</b></span>
            <span>Mới 7 ngày: <b className="text-emerald-600">{data.counts.new_7d}</b></span>
            <span>Đang khóa: <b className="text-rose-600">{data.counts.locked}</b></span>
            <span>Tài khoản Test/Ảo: <b className="text-violet-600">{data.counts.test}</b></span>
            {data.counts.unknown > 0 && <span>Chưa xác định: <b className="text-amber-600">{data.counts.unknown}</b></span>}
          </div>
        )}
      </div>

      {error && <div role="alert" className="rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 p-3 text-sm">{error}</div>}

      {/* Students Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/70 text-xs uppercase text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Học sinh</th>
                <th className="py-3 px-3">Lớp</th>
                <th className="py-3 px-3">Ngày đăng ký</th>
                <th className="py-3 px-3">Hoạt động</th>
                <th className="py-3 px-3">XP / Xu / Bài</th>
                <th className="py-3 px-3">Phân loại</th>
                <th className="py-3 px-3">Trạng thái</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading && !data ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500">
                    <Loader2 className="w-5 h-5 animate-spin inline mr-2" /> Đang tải dữ liệu học sinh…
                  </td>
                </tr>
              ) : (data?.rows ?? []).length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500">
                    Không tìm thấy học sinh phù hợp bộ lọc hiện tại.
                  </td>
                </tr>
              ) : (
                (data?.rows ?? []).map((row) => {
                  const typeMeta = ACCOUNT_TYPE_META[row.account_type] ?? ACCOUNT_TYPE_META.unknown;
                  return (
                    <tr key={row.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900 dark:text-white">{row.alias}</div>
                        <div className="text-[11px] font-mono text-slate-400">{row.id.slice(0, 8)}…</div>
                      </td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                        {row.grade ? `Lớp ${row.grade}` : '—'}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-slate-600 dark:text-slate-300">
                        {new Date(row.created_at).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-xs text-slate-500">
                        {formatRelativeVi(row.last_active_at)}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-xs">
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">{row.xp}</span> XP ·{' '}
                        <span className="font-semibold text-amber-600">{row.coins}</span> Xu ·{' '}
                        <span>{row.quizzes} bài</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${typeMeta.badge}`}>
                          {typeMeta.label}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        {row.is_locked ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800">
                            <Lock className="w-3 h-3" /> Đang khóa
                          </span>
                        ) : row.muted_until ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                            Cấm chat
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
                            Hoạt động
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => void openDetail(row)}
                          className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-indigo-950 text-xs font-semibold cursor-pointer"
                        >
                          Chi tiết
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500">
          <span>
            Hiển thị {(data?.rows.length ?? 0)} / {data?.total ?? 0} học sinh (Trang {page + 1}/{totalPages})
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 cursor-pointer"
              aria-label="Trang trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={page + 1 >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 cursor-pointer"
              aria-label="Trang sau"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Student Detail Slide-Over Drawer */}
      {selectedId && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 h-full overflow-y-auto border-l border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {detail ? detail.alias : 'Đang tải hồ sơ học sinh…'}
                </h3>
                <p className="text-xs font-mono text-slate-400">{selectedId}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                aria-label="Đóng chi tiết"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {detailLoading ? (
              <div className="py-12 text-center text-sm text-slate-500">
                <Loader2 className="w-5 h-5 animate-spin inline mr-2" /> Đang tải lịch sử học tập…
              </div>
            ) : detail ? (
              <>
                {actionMsg && (
                  <div className="rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 px-3 py-2 text-xs font-medium text-indigo-800 dark:text-indigo-200">
                    {actionMsg}
                  </div>
                )}

                {/* Stats Summary */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-2.5">
                    <div className="text-[11px] text-slate-500">XP</div>
                    <div className="text-base font-bold text-indigo-600 dark:text-indigo-400">{detail.xp}</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-2.5">
                    <div className="text-[11px] text-slate-500">Xu</div>
                    <div className="text-base font-bold text-amber-600">{detail.coins}</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-2.5">
                    <div className="text-[11px] text-slate-500">Sao</div>
                    <div className="text-base font-bold text-emerald-600">{detail.stars}</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-2.5">
                    <div className="text-[11px] text-slate-500">Lớp</div>
                    <div className="text-base font-bold">{detail.grade ? `Lớp ${detail.grade}` : '—'}</div>
                  </div>
                </div>

                {/* Account Classification (Real vs Test vs Virtual) */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5" /> Phân loại nguồn tài khoản
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(['real', 'test', 'virtual', 'unknown'] as AccountType[]).map((t) => (
                      <button
                        key={t}
                        type="button"
                        disabled={actionBusy}
                        onClick={() => void handleClassify(t)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                          detail.account_type === t
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {ACCOUNT_TYPE_META[t].label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lock / Unlock Account */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-500" /> Kiểm soát truy cập &amp; khóa tài khoản
                  </div>
                  <input
                    value={lockReason}
                    onChange={(e) => setLockReason(e.target.value)}
                    placeholder="Lý do khóa (nếu khóa tài khoản)…"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs"
                  />
                  <div className="flex gap-2">
                    {detail.is_locked ? (
                      <button
                        type="button"
                        disabled={actionBusy}
                        onClick={() => void handleToggleLock(false)}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <Unlock className="w-3.5 h-3.5" /> Mở khóa tài khoản
                      </button>
                    ) : confirmLock ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          disabled={actionBusy}
                          onClick={() => void handleToggleLock(true)}
                          className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                          <Lock className="w-3.5 h-3.5" /> Xác nhận khóa “{detail.alias}”
                        </button>
                        <button
                          type="button"
                          disabled={actionBusy}
                          onClick={() => setConfirmLock(false)}
                          className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold cursor-pointer"
                        >
                          Hủy
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        disabled={actionBusy}
                        onClick={() => setConfirmLock(true)}
                        className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <Lock className="w-3.5 h-3.5" /> Khóa tài khoản
                      </button>
                    )}
                  </div>
                </div>

                {/* Reset Password */}
                <form onSubmit={handleResetPassword} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5" /> Đặt lại mật khẩu cho học sinh
                  </div>
                  <div className="flex gap-2">
                    <input
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Mật khẩu mới (tối thiểu 6 ký tự)"
                      type="text"
                      autoComplete="off"
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs"
                    />
                    <button
                      type="submit"
                      disabled={actionBusy || newPassword.length < 6}
                      className="px-3.5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold disabled:opacity-50 cursor-pointer"
                    >
                      Đổi MK
                    </button>
                  </div>
                </form>

                {/* Recent Quiz Sessions */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Lịch sử làm bài gần đây</h4>
                  {detail.recent_quizzes.length === 0 ? (
                    <p className="text-xs text-slate-400">Chưa có lượt làm bài.</p>
                  ) : (
                    <ul className="space-y-1.5">
                      {detail.recent_quizzes.map((q) => (
                        <li key={q.id} className="flex items-center justify-between text-xs rounded-xl bg-slate-50 dark:bg-slate-800 px-3 py-2">
                          <div className="min-w-0">
                            <div className="font-semibold truncate">{q.lesson_title}</div>
                            <div className="text-[11px] text-slate-500">{new Date(q.started_at).toLocaleString('vi-VN')}</div>
                          </div>
                          <div className="text-right shrink-0 ml-2">
                            <div className="font-bold text-indigo-600 dark:text-indigo-400">
                              {q.score !== null ? `${q.score}đ` : q.status}
                            </div>
                            <div className="text-[11px] text-slate-500">{q.correct_count}/{q.total_count}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Recent Arena Matches */}
                {detail.recent_arena.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Đấu trường gần đây</h4>
                    <ul className="space-y-1.5">
                      {detail.recent_arena.map((a) => (
                        <li key={a.id} className="flex items-center justify-between text-xs rounded-xl bg-slate-50 dark:bg-slate-800 px-3 py-2">
                          <span>{a.mode} · Lớp {a.grade}</span>
                          <span className="font-semibold">{a.score ?? 0}đ {a.outcome ? `(${a.outcome})` : ''}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
