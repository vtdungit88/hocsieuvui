import React from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BookOpen,
  Flag,
  GraduationCap,
  History,
  MessageSquare,
  Sparkles,
  UserPlus,
  Users
} from 'lucide-react';
import type { AdminDashboardData } from '../../lib/adminApi';
import type { AdminNavFilterHint, AdminTab } from './types';
import { FEEDBACK_STATUS_META, REPORT_STATUS_META, formatRelativeVi } from './types';

interface DashboardSectionProps {
  data: AdminDashboardData | null;
  loading: boolean;
  days: number;
  onChangeDays: (days: number) => void;
  onNavigate: (tab: AdminTab, hint?: AdminNavFilterHint) => void;
}

export const DashboardSection: React.FC<DashboardSectionProps> = ({
  data,
  loading,
  days,
  onChangeDays,
  onNavigate
}) => {
  if (!data && loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="h-28 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!data) return null;

  const { kpis, growth_series, activity_series, grade_distribution, subject_question_stats, recent_activity } = data;
  const maxGrowth = Math.max(1, ...growth_series.map((d) => d.count));
  const maxActivity = Math.max(1, ...activity_series.map((d) => d.quizzes + d.arena));
  const maxGradeCount = Math.max(1, ...grade_distribution.map((g) => g.count));
  const maxSubjectTotal = Math.max(1, ...subject_question_stats.map((s) => s.published + s.pending_or_draft));

  const kpiCards: {
    label: string;
    value: string | number;
    sub: string;
    Icon: React.ComponentType<{ className?: string }>;
    accent: string;
    onClick: () => void;
  }[] = [
    {
      label: 'Tổng học sinh thật',
      value: kpis.real_users.toLocaleString('vi-VN'),
      sub: `Đã ẩn ${kpis.test_users.toLocaleString('vi-VN')} tài khoản test`,
      Icon: Users,
      accent: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 dark:text-indigo-400',
      onClick: () => onNavigate('students', { studentFilter: 'all' })
    },
    {
      label: 'Học sinh mới',
      value: kpis.new_7d.toLocaleString('vi-VN'),
      sub: `Hôm nay: ${kpis.new_today} · 30 ngày: ${kpis.new_30d}`,
      Icon: UserPlus,
      accent: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400',
      onClick: () => onNavigate('students', { studentFilter: 'new_7d' })
    },
    {
      label: `Người hoạt động (${days}n)`,
      value: kpis.active_window.toLocaleString('vi-VN'),
      sub: `${kpis.visits.today_visits} lượt truy cập hôm nay`,
      Icon: Activity,
      accent: 'text-sky-600 bg-sky-50 dark:bg-sky-950/60 dark:text-sky-400',
      onClick: () => onNavigate('students', { studentFilter: 'active_7d' })
    },
    {
      label: 'Tổng lượt học & thi',
      value: kpis.total_study_turns.toLocaleString('vi-VN'),
      sub: `Điểm TB: ${kpis.avg_score !== null ? `${kpis.avg_score}/100` : '—'}`,
      Icon: GraduationCap,
      accent: 'text-violet-600 bg-violet-50 dark:bg-violet-950/60 dark:text-violet-400',
      onClick: () => onNavigate('students', { studentFilter: 'active_7d' })
    },
    {
      label: 'Câu hỏi đang dùng',
      value: kpis.questions_published.toLocaleString('vi-VN'),
      sub: 'Đã xuất bản trên toàn hệ thống',
      Icon: BookOpen,
      accent: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400',
      onClick: () => onNavigate('questions')
    },
    {
      label: 'Cần rà soát nội dung',
      value: (kpis.questions_attention + kpis.empty_or_low_lessons).toLocaleString('vi-VN'),
      sub: `${kpis.empty_or_low_lessons} bài < 5 câu · ${kpis.questions_attention} câu nháp/lỗi`,
      Icon: AlertTriangle,
      accent: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-400',
      onClick: () => onNavigate('questions', { questionAudit: 'low_lessons' })
    },
    {
      label: 'Góp ý chưa xử lý',
      value: kpis.feedback_open.toLocaleString('vi-VN'),
      sub: 'Mới hoặc đang xử lý',
      Icon: MessageSquare,
      accent: kpis.feedback_open > 0
        ? 'text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400'
        : 'text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400',
      onClick: () => onNavigate('feedback', { feedbackStatus: 'new' })
    },
    {
      label: 'Báo cáo trò chuyện',
      value: kpis.lobby_reports_open.toLocaleString('vi-VN'),
      sub: 'Cần kiểm duyệt ở Sảnh Online',
      Icon: Flag,
      accent: kpis.lobby_reports_open > 0
        ? 'text-rose-600 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-400'
        : 'text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400',
      onClick: () => onNavigate('reports', { reportStatus: 'open' })
    }
  ];

  return (
    <div className="space-y-6">
      {/* Period Selector Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Số liệu thực tế từ Supabase — mặc định đã loại bỏ <b>{kpis.test_users}</b> tài khoản test/ảo khỏi thống kê người dùng.
        </div>
        <div className="inline-flex rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1">
          {[7, 14, 30].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => onChangeDays(d)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                days === d
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {d} ngày
            </button>
          ))}
        </div>
      </div>

      {/* 8 Real KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
        {kpiCards.map((card) => {
          const Icon = card.Icon;
          return (
            <button
              key={card.label}
              type="button"
              onClick={card.onClick}
              className="group text-left rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${card.accent}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
              </div>
              <div className="mt-3">
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">{card.label}</div>
                <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-0.5">{card.value}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 truncate">{card.sub}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Growth Chart */}
        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Tăng trưởng học sinh thật ({days} ngày)</h2>
              <p className="text-xs text-slate-500">Số tài khoản mới đăng ký theo ngày</p>
            </div>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Tổng: {growth_series.reduce((s, r) => s + r.count, 0)}
            </span>
          </div>
          <div className="h-44 flex items-end gap-1.5 pt-4 border-b border-slate-100 dark:border-slate-800 pb-1">
            {growth_series.map((pt) => {
              const pct = Math.max(4, Math.round((pt.count / maxGrowth) * 100));
              return (
                <div key={pt.iso} className="flex-1 min-w-0 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <div className="relative w-full flex-1 flex items-end justify-center">
                    <div
                      title={`${pt.date}: ${pt.count} học sinh mới`}
                      style={{ height: `${pt.count === 0 ? 3 : pct}%` }}
                      className={`w-full max-w-[22px] rounded-t-md transition-all ${
                        pt.count > 0 ? 'bg-indigo-500 group-hover:bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'
                      }`}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 truncate max-w-full">
                    {growth_series.length <= 14 ? pt.date : pt.date.endsWith('01') || pt.date.endsWith('05') || pt.date.endsWith('10') || pt.date.endsWith('15') || pt.date.endsWith('20') || pt.date.endsWith('25') ? pt.date : ''}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Study & Arena Activity Chart */}
        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Hoạt động học tập &amp; đấu trường</h2>
              <p className="text-xs text-slate-500">Lượt làm bài (xanh ngọc) và đấu trường (cam)</p>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-xs bg-emerald-500" /> Làm bài</span>
              <span className="inline-flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-xs bg-amber-500" /> Đấu trường</span>
            </div>
          </div>
          <div className="h-44 flex items-end gap-1.5 pt-4 border-b border-slate-100 dark:border-slate-800 pb-1">
            {activity_series.map((pt, idx) => {
              const total = pt.quizzes + pt.arena;
              const quizPct = Math.round((pt.quizzes / maxActivity) * 100);
              const arenaPct = Math.round((pt.arena / maxActivity) * 100);
              return (
                <div key={`${pt.date}-${idx}`} className="flex-1 min-w-0 flex flex-col items-center gap-1.5 h-full justify-end">
                  <div
                    title={`${pt.date}: ${pt.quizzes} bài học · ${pt.arena} đấu trường`}
                    className="w-full max-w-[22px] flex-1 flex flex-col justify-end overflow-hidden rounded-t-md"
                  >
                    {total === 0 ? (
                      <div className="h-[3%] bg-slate-200 dark:bg-slate-800 rounded-t-md" />
                    ) : (
                      <>
                        {arenaPct > 0 && <div style={{ height: `${Math.max(3, arenaPct)}%` }} className="bg-amber-500 w-full" />}
                        {quizPct > 0 && <div style={{ height: `${Math.max(3, quizPct)}%` }} className="bg-emerald-500 w-full" />}
                      </>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 truncate max-w-full">
                    {activity_series.length <= 14 ? pt.date : idx % 4 === 0 ? pt.date : ''}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Grade Distribution */}
        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Phân bố học sinh thật theo khối lớp (1–9)</h2>
            <span className="text-xs text-slate-500">Theo hồ sơ</span>
          </div>
          <div className="space-y-2">
            {grade_distribution.map((g) => (
              <div key={g.grade} className="flex items-center gap-3 text-xs">
                <span className="w-14 font-medium text-slate-600 dark:text-slate-300 shrink-0">{g.label}</span>
                <div className="flex-1 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    style={{ width: `${g.count > 0 ? Math.max(4, Math.round((g.count / maxGradeCount) * 100)) : 0}%` }}
                    className="h-full rounded-full bg-indigo-500"
                  />
                </div>
                <span className="w-10 text-right font-semibold text-slate-700 dark:text-slate-200">{g.count}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Subject Question Distribution */}
        <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Ngân hàng câu hỏi theo môn học</h2>
            <button
              type="button"
              onClick={() => onNavigate('questions')}
              className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
            >
              Mở kho câu hỏi →
            </button>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {subject_question_stats.map((s) => {
              const total = s.published + s.pending_or_draft;
              return (
                <div key={s.subject_id} className="flex items-center gap-3 text-xs">
                  <span className="w-36 truncate font-medium text-slate-700 dark:text-slate-300 shrink-0" title={s.name}>
                    {s.name}
                  </span>
                  <div className="flex-1 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
                    <div
                      style={{ width: `${total > 0 ? Math.max(2, Math.round((s.published / maxSubjectTotal) * 100)) : 0}%` }}
                      className="h-full bg-emerald-500"
                    />
                    {s.pending_or_draft > 0 && (
                      <div
                        style={{ width: `${Math.max(2, Math.round((s.pending_or_draft / maxSubjectTotal) * 100))}%` }}
                        className="h-full bg-amber-400"
                      />
                    )}
                  </div>
                  <span className="w-16 text-right font-semibold text-slate-700 dark:text-slate-200">
                    {s.published.toLocaleString('vi-VN')}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Recent Activity Feeds */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Recent Real Students */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> Học sinh mới (Thật)
            </h3>
            <button type="button" onClick={() => onNavigate('students')} className="text-[11px] font-semibold text-indigo-600 cursor-pointer">Xem tất cả</button>
          </div>
          {recent_activity.students.length === 0 ? (
            <p className="text-xs text-slate-400">Chưa có học sinh mới.</p>
          ) : (
            <ul className="space-y-2">
              {recent_activity.students.map((s) => (
                <li key={s.id} className="flex items-center justify-between text-xs border-b border-slate-100 dark:border-slate-800 pb-1.5 last:border-0">
                  <span className="font-semibold text-slate-800 dark:text-slate-100 truncate">{s.alias}</span>
                  <span className="text-slate-400 shrink-0 ml-2">{formatRelativeVi(s.created_at)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent Feedback */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-blue-500" /> Góp ý mới
            </h3>
            <button type="button" onClick={() => onNavigate('feedback')} className="text-[11px] font-semibold text-indigo-600 cursor-pointer">Xử lý</button>
          </div>
          {recent_activity.feedback.length === 0 ? (
            <p className="text-xs text-slate-400">Chưa có góp ý nào.</p>
          ) : (
            <ul className="space-y-2">
              {recent_activity.feedback.map((f) => (
                <li key={f.id} className="text-xs border-b border-slate-100 dark:border-slate-800 pb-1.5 last:border-0 space-y-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold truncate">{f.alias}</span>
                    <span className={`px-1.5 py-0.5 rounded border text-[10px] font-semibold ${FEEDBACK_STATUS_META[f.status]?.badge ?? ''}`}>
                      {FEEDBACK_STATUS_META[f.status]?.label ?? f.status}
                    </span>
                  </div>
                  <p className="text-slate-500 truncate">{f.message}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent Chat Reports */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Flag className="w-3.5 h-3.5 text-rose-500" /> Báo cáo Sảnh
            </h3>
            <button type="button" onClick={() => onNavigate('reports')} className="text-[11px] font-semibold text-indigo-600 cursor-pointer">Kiểm duyệt</button>
          </div>
          {recent_activity.reports.length === 0 ? (
            <p className="text-xs text-slate-400">Không có báo cáo mới.</p>
          ) : (
            <ul className="space-y-2">
              {recent_activity.reports.map((r) => (
                <li key={r.id} className="text-xs border-b border-slate-100 dark:border-slate-800 pb-1.5 last:border-0 space-y-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold truncate">{r.target_alias}</span>
                    <span className={`px-1.5 py-0.5 rounded border text-[10px] font-semibold ${REPORT_STATUS_META[r.status]?.badge ?? ''}`}>
                      {REPORT_STATUS_META[r.status]?.label ?? r.status}
                    </span>
                  </div>
                  <p className="text-slate-500 truncate">{r.reason}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent Admin Audit Logs */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-indigo-500" /> Nhật ký quản trị
            </h3>
            <button type="button" onClick={() => onNavigate('settings')} className="text-[11px] font-semibold text-indigo-600 cursor-pointer">Chi tiết</button>
          </div>
          {recent_activity.audits.length === 0 ? (
            <p className="text-xs text-slate-400">Chưa có thao tác ghi nhận.</p>
          ) : (
            <ul className="space-y-2">
              {recent_activity.audits.map((a) => (
                <li key={a.id} className="text-xs border-b border-slate-100 dark:border-slate-800 pb-1.5 last:border-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-slate-700 dark:text-slate-200 truncate">{a.action}</span>
                    <span className="text-slate-400 shrink-0">{formatRelativeVi(a.created_at)}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">{a.actor_alias} · {a.entity_type}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
