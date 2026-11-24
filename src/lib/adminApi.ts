import { supabase } from './supabase';
import { adminResetPassword } from './api';

function fail(ctx: string, err: { message?: string } | null | undefined): never {
  throw new Error(err?.message ? `${ctx}: ${err.message}` : ctx);
}

export type AccountType = 'real' | 'test' | 'virtual' | 'unknown';
export type StudentFilter = 'all' | 'new_7d' | 'active_7d' | 'inactive' | 'locked' | 'test_only' | 'unknown';
export type FeedbackStatus = 'new' | 'in_progress' | 'resolved' | 'closed';
export type FeedbackPriority = 'normal' | 'high';
export type ReportStatus = 'open' | 'resolved' | 'dismissed';
export type ModerateAction = 'hide_msg' | 'mute_1h' | 'mute_24h' | 'warn' | 'dismiss' | 'reopen' | 'lock_account';
export type QuestionStatus = 'draft' | 'pending_review' | 'approved' | 'published' | 'archived';
export type QuestionDifficulty = 'basic' | 'application' | 'advanced';
export type QuestionAuditMode = 'missing_explanation' | 'missing_answer' | 'duplicate_prompt';

export interface AdminDashboardData {
  kpis: {
    real_users: number;
    test_users: number;
    unknown_users: number;
    new_today: number;
    new_7d: number;
    new_30d: number;
    active_window: number;
    total_study_turns: number;
    avg_score: number | null;
    questions_published: number;
    questions_attention: number;
    empty_or_low_lessons: number;
    feedback_open: number;
    lobby_reports_open: number;
    visits: { total_visits: number; today_visits: number; unique_visitors: number };
  };
  growth_series: { date: string; iso: string; count: number }[];
  activity_series: { date: string; quizzes: number; arena: number }[];
  grade_distribution: { grade: number; label: string; count: number }[];
  subject_question_stats: {
    subject_id: string;
    code: string;
    name: string;
    published: number;
    pending_or_draft: number;
    lessons: number;
  }[];
  recent_activity: {
    students: { id: string; alias: string; created_at: string; grade: number | null }[];
    feedback: { id: string; alias: string; category: string; status: FeedbackStatus; message: string; created_at: string }[];
    reports: { id: string; target_alias: string; reason: string; status: ReportStatus; created_at: string }[];
    audits: { id: number; action: string; entity_type: string; actor_alias: string; created_at: string }[];
  };
}

export interface AdminStudentRow {
  id: string;
  alias: string;
  account_type: AccountType;
  is_locked: boolean;
  locked_reason: string | null;
  alias_status: string;
  show_on_leaderboard: boolean | null;
  created_at: string;
  grade: number | null;
  xp: number;
  coins: number;
  quizzes: number;
  arena_matches: number;
  last_active_at: string;
  muted_until: string | null;
}

export interface AdminStudentsResponse {
  total: number;
  counts: { real: number; new_7d: number; locked: number; test: number; unknown: number };
  rows: AdminStudentRow[];
}

export interface AdminStudentDetail {
  id: string;
  alias: string;
  account_type: AccountType;
  alias_status: string;
  is_locked: boolean;
  locked_reason: string | null;
  locked_at: string | null;
  show_on_leaderboard: boolean | null;
  grade: number | null;
  created_at: string;
  updated_at: string;
  xp: number;
  coins: number;
  stars: number;
  current_dest: string;
  total_km: number;
  muted_until: string | null;
  roles: string[];
  recent_quizzes: {
    id: string;
    mode: string;
    status: string;
    score: number | null;
    correct_count: number;
    total_count: number;
    lesson_title: string;
    started_at: string;
  }[];
  recent_arena: {
    id: string;
    mode: string;
    grade: number;
    score: number | null;
    outcome: string | null;
    started_at: string;
  }[];
  audit_history: {
    id: number;
    action: string;
    details: Record<string, unknown> | null;
    actor_alias: string;
    created_at: string;
  }[];
}

export interface AdminFeedbackItem {
  id: string;
  student_id: string | null;
  alias: string;
  category: 'suggestion' | 'bug' | 'compliment' | 'question';
  rating: number | null;
  message: string;
  status: FeedbackStatus;
  priority: FeedbackPriority;
  admin_note: string | null;
  device_info: Record<string, unknown> | null;
  handled_by: string | null;
  handled_by_alias: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminFeedbackResponse {
  total: number;
  counts: { all: number; new: number; in_progress: number; resolved: number; closed: number };
  rows: AdminFeedbackItem[];
}

export interface AdminLobbyReportItem {
  id: string;
  message_id: string;
  room_key: string;
  reason: string;
  excerpt: string;
  status: ReportStatus;
  target_student_id: string | null;
  target_alias: string;
  target_locked: boolean;
  reporter_id: string | null;
  reporter_alias: string;
  admin_note: string | null;
  handled_at: string | null;
  handled_by_alias: string | null;
  target_report_count: number;
  target_muted_until: string | null;
  created_at: string;
}

export interface AdminLobbyReportsResponse {
  total: number;
  counts: { all: number; open: number; resolved: number; dismissed: number };
  rows: AdminLobbyReportItem[];
}

export interface CurriculumSubject {
  id: string;
  code: string;
  name: string;
}

export interface CurriculumChapter {
  id: string;
  subject_id: string;
  grade_id: number;
  code: string;
  title: string;
  sequence_no: number;
  status: string;
}

export interface CurriculumLesson {
  id: string;
  chapter_id: string;
  code: string;
  title: string;
  sequence_no: number;
  status: string;
  total: number;
  published: number;
  approved: number;
  pending: number;
  draft: number;
  archived: number;
  basic: number;
  application: number;
  advanced: number;
}

export interface QuestionBankTreeResponse {
  summary: {
    total_questions: number;
    published_questions: number;
    draft_or_pending: number;
    archived_questions: number;
    empty_lessons: number;
    low_lessons: number;
    missing_explanation: number;
    missing_answer: number;
    duplicate_prompts: number;
  };
  subjects: CurriculumSubject[];
  chapters: CurriculumChapter[];
  lessons: CurriculumLesson[];
}

export interface QuestionBankItem {
  id: string;
  source_question_code: string | null;
  lesson_id: string;
  lesson_code: string;
  lesson_title: string;
  chapter_id: string;
  chapter_title: string;
  grade_id: number;
  subject_id: string;
  subject_code: string;
  subject_name: string;
  prompt: { text?: string; visualData?: unknown; [key: string]: unknown };
  explanation: { text?: string; [key: string]: unknown };
  difficulty: QuestionDifficulty;
  skill: string | null;
  status: QuestionStatus;
  version: number;
  updated_at: string;
  answer_key: string | null;
  missing_explanation: boolean;
  missing_answer: boolean;
  options: { key: string; text: string; sequence_no: number }[];
  revisions: { id: string; version: number; change_note: string | null; created_at: string }[];
}

export interface AdminSettingsBundle {
  roles: { user_id: string; alias: string; role: string; granted_at: string }[];
  settings: { setting_key: string; setting_value: Record<string, unknown>; updated_at: string }[];
  audit_logs: {
    id: number;
    actor_id: string | null;
    actor_alias: string;
    action: string;
    entity_type: string;
    entity_id: string;
    details: Record<string, unknown> | null;
    created_at: string;
  }[];
}

export async function fetchAdminDashboard(days = 14): Promise<AdminDashboardData> {
  const { data, error } = await supabase.rpc('admin_dashboard_v2', { p_days: days });
  if (error) fail('Không tải được dashboard quản trị', error);
  return data as AdminDashboardData;
}

export async function fetchAdminStudents(params: {
  filter: StudentFilter;
  includeTest: boolean;
  grade: number | null;
  search: string;
  limit?: number;
  offset?: number;
}): Promise<AdminStudentsResponse> {
  const { data, error } = await supabase.rpc('admin_students_list', {
    p_filter: params.filter,
    p_include_test: params.includeTest,
    p_grade: params.grade,
    p_search: params.search || null,
    p_limit: params.limit ?? 25,
    p_offset: params.offset ?? 0
  });
  if (error) fail('Không tải được danh sách học sinh', error);
  return data as AdminStudentsResponse;
}

export async function fetchAdminStudentDetail(studentId: string): Promise<AdminStudentDetail> {
  const { data, error } = await supabase.rpc('admin_student_detail', { p_student_id: studentId });
  if (error) fail('Không tải được hồ sơ học sinh', error);
  return data as AdminStudentDetail;
}

export async function setStudentAccountType(studentId: string, accountType: AccountType, note?: string): Promise<void> {
  const { error } = await supabase.rpc('admin_set_student_account_type', {
    p_student_id: studentId,
    p_account_type: accountType,
    p_note: note ?? null
  });
  if (error) fail('Không đổi được phân loại tài khoản', error);
}

export async function toggleStudentLock(studentId: string, locked: boolean, reason?: string): Promise<void> {
  const { error } = await supabase.rpc('admin_toggle_student_lock', {
    p_student_id: studentId,
    p_locked: locked,
    p_reason: reason ?? null
  });
  if (error) fail('Không cập nhật được trạng thái khóa tài khoản', error);
}

export { adminResetPassword };

export async function fetchAdminFeedback(params: {
  status: 'all' | FeedbackStatus;
  category: string;
  search: string;
  limit?: number;
  offset?: number;
}): Promise<AdminFeedbackResponse> {
  const { data, error } = await supabase.rpc('admin_feedback_list', {
    p_status: params.status,
    p_category: params.category,
    p_search: params.search || null,
    p_limit: params.limit ?? 30,
    p_offset: params.offset ?? 0
  });
  if (error) fail('Không tải được danh sách góp ý', error);
  return data as AdminFeedbackResponse;
}

export async function updateAdminFeedback(id: string, status: FeedbackStatus, priority: FeedbackPriority, adminNote: string): Promise<void> {
  const { error } = await supabase.rpc('admin_update_feedback', {
    p_id: id,
    p_status: status,
    p_priority: priority,
    p_admin_note: adminNote
  });
  if (error) fail('Không cập nhật được góp ý', error);
}

export async function fetchAdminLobbyReports(params: {
  status: 'all' | ReportStatus;
  search: string;
  limit?: number;
  offset?: number;
}): Promise<AdminLobbyReportsResponse> {
  const { data, error } = await supabase.rpc('admin_lobby_reports_v2', {
    p_status: params.status,
    p_search: params.search || null,
    p_limit: params.limit ?? 40,
    p_offset: params.offset ?? 0
  });
  if (error) fail('Không tải được báo cáo sảnh trò chuyện', error);
  return data as AdminLobbyReportsResponse;
}

export async function moderateAdminLobbyReport(reportId: string, action: ModerateAction, note?: string): Promise<void> {
  const { error } = await supabase.rpc('admin_moderate_lobby_v2', {
    p_report_id: reportId,
    p_action: action,
    p_note: note ?? null
  });
  if (error) fail('Không thực hiện được kiểm duyệt', error);
}

export async function fetchQuestionBankTree(): Promise<QuestionBankTreeResponse> {
  const { data, error } = await supabase.rpc('admin_question_bank_tree');
  if (error) fail('Không tải được cây chương trình câu hỏi', error);
  return data as QuestionBankTreeResponse;
}

export async function fetchQuestionBankList(params: {
  subjectId?: string | null;
  gradeId?: number | null;
  chapterId?: string | null;
  lessonId?: string | null;
  difficulty?: string | null;
  status?: string | null;
  auditMode?: QuestionAuditMode | null;
  search?: string;
  limit?: number;
  offset?: number;
}): Promise<{ total: number; rows: QuestionBankItem[] }> {
  const { data, error } = await supabase.rpc('admin_question_bank_list', {
    p_subject_id: params.subjectId ?? null,
    p_grade_id: params.gradeId ?? null,
    p_chapter_id: params.chapterId ?? null,
    p_lesson_id: params.lessonId ?? null,
    p_difficulty: params.difficulty || null,
    p_status: params.status || null,
    p_audit_mode: params.auditMode ?? null,
    p_search: params.search || null,
    p_limit: params.limit ?? 20,
    p_offset: params.offset ?? 0
  });
  if (error) fail('Không tải được danh sách câu hỏi', error);
  return data as { total: number; rows: QuestionBankItem[] };
}

export async function saveQuestionBankItem(params: {
  questionId?: string | null;
  lessonId: string;
  promptText: string;
  explanationText: string;
  difficulty: QuestionDifficulty;
  skill?: string | null;
  options: { key: string; text: string }[];
  answerKey: string;
  status: QuestionStatus;
  changeNote?: string;
}): Promise<{ ok: boolean; question_id: string; version: number }> {
  const { data, error } = await supabase.rpc('admin_question_bank_save', {
    p_question_id: params.questionId ?? null,
    p_lesson_id: params.lessonId,
    p_prompt_text: params.promptText,
    p_explanation_text: params.explanationText,
    p_difficulty: params.difficulty,
    p_skill: params.skill ?? null,
    p_options: params.options,
    p_answer_key: params.answerKey,
    p_status: params.status,
    p_change_note: params.changeNote ?? null
  });
  if (error) fail('Không lưu được câu hỏi', error);
  return data as { ok: boolean; question_id: string; version: number };
}

export async function setQuestionBankStatus(questionId: string, status: QuestionStatus, note?: string): Promise<void> {
  const { error } = await supabase.rpc('admin_question_bank_set_status', {
    p_question_id: questionId,
    p_status: status,
    p_note: note ?? null
  });
  if (error) fail('Không đổi được trạng thái câu hỏi', error);
}

export async function bulkImportLessonQuestions(
  lessonId: string,
  items: { prompt: string; explanation?: string; difficulty?: QuestionDifficulty; skill?: string; options: { key: string; text: string }[]; answer_key: string }[],
  publish: boolean
): Promise<{ ok: boolean; inserted: number }> {
  const { data, error } = await supabase.rpc('admin_question_bank_bulk_import', {
    p_lesson_id: lessonId,
    p_items: items,
    p_publish: publish
  });
  if (error) fail('Không nhập được danh sách câu hỏi', error);
  return data as { ok: boolean; inserted: number };
}

export async function fetchAdminSettingsBundle(logLimit = 60): Promise<AdminSettingsBundle> {
  const { data, error } = await supabase.rpc('admin_settings_bundle', { p_log_limit: logLimit });
  if (error) fail('Không tải được cấu hình hệ thống', error);
  return data as AdminSettingsBundle;
}

export async function updateAdminSystemSetting(key: string, value: Record<string, unknown>): Promise<void> {
  const { error } = await supabase.rpc('admin_update_system_setting', { p_key: key, p_value: value });
  if (error) fail('Không lưu được cấu hình', error);
}

export async function grantOrRevokeAdminRole(alias: string, role: string, revoke: boolean): Promise<void> {
  const { error } = await supabase.rpc('admin_grant_role', { p_alias: alias, p_role: role, p_revoke: revoke });
  if (error) fail('Không cập nhật được quyền quản trị', error);
}
