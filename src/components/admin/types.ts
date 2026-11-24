import type {
  AccountType,
  FeedbackStatus,
  QuestionAuditMode,
  QuestionStatus,
  ReportStatus,
  StudentFilter
} from '../../lib/adminApi';

export type AdminTab = 'overview' | 'students' | 'feedback' | 'reports' | 'questions' | 'settings';

export interface AdminNavFilterHint {
  studentFilter?: StudentFilter;
  feedbackStatus?: 'all' | FeedbackStatus;
  reportStatus?: 'all' | ReportStatus;
  questionAudit?: QuestionAuditMode | 'low_lessons' | null;
}

export const ACCOUNT_TYPE_META: Record<AccountType, { label: string; badge: string }> = {
  real: {
    label: 'Thật',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
  },
  test: {
    label: 'Test',
    badge: 'bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
  },
  virtual: {
    label: 'Ảo',
    badge: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/50 dark:text-violet-300 dark:border-violet-800'
  },
  unknown: {
    label: 'Chưa rõ',
    badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800'
  }
};

export const FEEDBACK_STATUS_META: Record<FeedbackStatus, { label: string; badge: string }> = {
  new: {
    label: 'Mới',
    badge: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800'
  },
  in_progress: {
    label: 'Đang xử lý',
    badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800'
  },
  resolved: {
    label: 'Đã xử lý',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
  },
  closed: {
    label: 'Đã đóng',
    badge: 'bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
  }
};

export const FEEDBACK_CATEGORY_LABEL: Record<string, string> = {
  bug: 'Báo lỗi',
  suggestion: 'Góp ý',
  question: 'Hỏi đáp',
  compliment: 'Khen ngợi'
};

export const REPORT_STATUS_META: Record<ReportStatus, { label: string; badge: string }> = {
  open: {
    label: 'Chờ kiểm tra',
    badge: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800'
  },
  resolved: {
    label: 'Đã xử lý',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
  },
  dismissed: {
    label: 'Đã bỏ qua',
    badge: 'bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
  }
};

export const QUESTION_STATUS_META: Record<QuestionStatus, { label: string; badge: string }> = {
  published: {
    label: 'Đã xuất bản',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
  },
  approved: {
    label: 'Đã duyệt',
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800'
  },
  pending_review: {
    label: 'Chờ duyệt',
    badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800'
  },
  draft: {
    label: 'Bản nháp',
    badge: 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
  },
  archived: {
    label: 'Lưu trữ',
    badge: 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800'
  }
};

export function formatRelativeVi(iso: string | null | undefined): string {
  if (!iso) return '—';
  const diffMs = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diffMs / 60000);
  if (min < 1) return 'Vừa xong';
  if (min < 60) return `${min} phút trước`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} giờ trước`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day} ngày trước`;
  return new Date(iso).toLocaleDateString('vi-VN');
}
