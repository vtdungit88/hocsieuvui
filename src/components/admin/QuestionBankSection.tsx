import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  Archive,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Edit3,
  FolderTree,
  History,
  Layers,
  Loader2,
  Plus,
  Search,
  Upload,
  X
} from 'lucide-react';
import {
  bulkImportLessonQuestions,
  fetchQuestionBankList,
  fetchQuestionBankTree,
  saveQuestionBankItem,
  setQuestionBankStatus,
  type CurriculumChapter,
  type CurriculumLesson,
  type QuestionAuditMode,
  type QuestionBankItem,
  type QuestionBankTreeResponse,
  type QuestionDifficulty,
  type QuestionStatus
} from '../../lib/adminApi';
import { ContentReviewPanel } from './ContentReviewPanel';
import { QuestionFigure } from '../QuestionFigure';
import { QUESTION_STATUS_META } from './types';

interface QuestionBankSectionProps {
  initialAudit?: QuestionAuditMode | 'low_lessons' | null;
  globalSearch?: string;
  refreshSignal?: number;
}

const DIFFICULTY_LABEL: Record<QuestionDifficulty, string> = {
  basic: 'Cơ bản',
  application: 'Vận dụng',
  advanced: 'Nâng cao'
};

export const QuestionBankSection: React.FC<QuestionBankSectionProps> = ({
  initialAudit = null,
  globalSearch = '',
  refreshSignal = 0
}) => {
  const [subMode, setSubMode] = useState<'bank' | 'batches'>('bank');
  const [tree, setTree] = useState<QuestionBankTreeResponse | null>(null);
  const [treeLoading, setTreeLoading] = useState(false);

  // Selected curriculum scope
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedGradeId, setSelectedGradeId] = useState<number | null>(null);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  // Tree expansion state
  const [openSubjects, setOpenSubjects] = useState<Record<string, boolean>>({});
  const [openGrades, setOpenGrades] = useState<Record<string, boolean>>({});
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({});
  const [lessonFilterMode, setLessonFilterMode] = useState<'all' | 'empty' | 'low'>(
    initialAudit === 'low_lessons' ? 'low' : 'all'
  );

  // Question table filters & data
  const [difficulty, setDifficulty] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [auditMode, setAuditMode] = useState<QuestionAuditMode | null>(
    initialAudit && initialAudit !== 'low_lessons' ? initialAudit : null
  );
  const [search, setSearch] = useState(globalSearch);
  const [page, setPage] = useState(0);
  const pageSize = 20;

  const [listData, setListData] = useState<{ total: number; rows: QuestionBankItem[] }>({ total: 0, rows: [] });
  const [listLoading, setListLoading] = useState(false);
  const [error, setError] = useState('');
  const [bannerMsg, setBannerMsg] = useState('');
  const [confirmArchiveId, setConfirmArchiveId] = useState<string | null>(null);

  // Question Editor Drawer
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<QuestionBankItem | null>(null);
  const [edLessonId, setEdLessonId] = useState<string>('');
  const [edPrompt, setEdPrompt] = useState('');
  const [edExplanation, setEdExplanation] = useState('');
  const [edDifficulty, setEdDifficulty] = useState<QuestionDifficulty>('basic');
  const [edStatus, setEdStatus] = useState<QuestionStatus>('published');
  const [edAnswerKey, setEdAnswerKey] = useState('A');
  const [edOptA, setEdOptA] = useState('');
  const [edOptB, setEdOptB] = useState('');
  const [edOptC, setEdOptC] = useState('');
  const [edOptD, setEdOptD] = useState('');
  const [edNote, setEdNote] = useState('');
  const [saving, setSaving] = useState(false);

  // Bulk Import Modal
  const [importOpen, setImportOpen] = useState(false);
  const [importJson, setImportJson] = useState('');
  const [importPublish, setImportPublish] = useState(false);
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    if (initialAudit === 'low_lessons') {
      setLessonFilterMode('low');
      setAuditMode(null);
    } else if (initialAudit) {
      setAuditMode(initialAudit);
      setLessonFilterMode('all');
    }
  }, [initialAudit]);

  useEffect(() => {
    setSearch(globalSearch);
    setPage(0);
  }, [globalSearch]);

  const loadTree = useCallback(async () => {
    setTreeLoading(true);
    try {
      const t = await fetchQuestionBankTree();
      setTree(t);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Không tải được cây chương trình');
    } finally {
      setTreeLoading(false);
    }
  }, []);

  const loadQuestions = useCallback(async () => {
    setListLoading(true);
    setError('');
    try {
      const res = await fetchQuestionBankList({
        subjectId: selectedSubjectId,
        gradeId: selectedGradeId,
        chapterId: selectedChapterId,
        lessonId: selectedLessonId,
        difficulty: difficulty === 'all' ? null : difficulty,
        status: statusFilter === 'all' ? null : statusFilter,
        auditMode,
        search,
        limit: pageSize,
        offset: page * pageSize
      });
      setListData(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Không tải được danh sách câu hỏi');
    } finally {
      setListLoading(false);
    }
  }, [selectedSubjectId, selectedGradeId, selectedChapterId, selectedLessonId, difficulty, statusFilter, auditMode, search, page]);

  useEffect(() => {
    void loadTree();
  }, [loadTree, refreshSignal]);

  useEffect(() => {
    if (subMode === 'bank') void loadQuestions();
  }, [subMode, loadQuestions, refreshSignal]);

  // Fast lookup maps for curriculum tree
  const lessonsByChapter = useMemo(() => {
    const map = new Map<string, CurriculumLesson[]>();
    for (const l of tree?.lessons ?? []) {
      if (lessonFilterMode === 'empty' && l.total !== 0) continue;
      if (lessonFilterMode === 'low' && (l.total === 0 || l.total >= 10)) continue;
      const arr = map.get(l.chapter_id) ?? [];
      arr.push(l);
      map.set(l.chapter_id, arr);
    }
    return map;
  }, [tree, lessonFilterMode]);

  const chaptersBySubjectGrade = useMemo(() => {
    const map = new Map<string, Map<number, CurriculumChapter[]>>();
    for (const ch of tree?.chapters ?? []) {
      const chLessons = lessonsByChapter.get(ch.id) ?? [];
      if (lessonFilterMode !== 'all' && chLessons.length === 0) continue;
      let gradeMap = map.get(ch.subject_id);
      if (!gradeMap) {
        gradeMap = new Map<number, CurriculumChapter[]>();
        map.set(ch.subject_id, gradeMap);
      }
      const list = gradeMap.get(ch.grade_id) ?? [];
      list.push(ch);
      gradeMap.set(ch.grade_id, list);
    }
    return map;
  }, [tree, lessonsByChapter, lessonFilterMode]);

  const selectedLesson = useMemo(
    () => tree?.lessons.find((l) => l.id === selectedLessonId) ?? null,
    [tree, selectedLessonId]
  );

  const selectedChapter = useMemo(
    () => tree?.chapters.find((c) => c.id === (selectedLesson?.chapter_id ?? selectedChapterId)) ?? null,
    [tree, selectedLesson, selectedChapterId]
  );

  const selectedSubject = useMemo(
    () => tree?.subjects.find((s) => s.id === (selectedChapter?.subject_id ?? selectedSubjectId)) ?? null,
    [tree, selectedChapter, selectedSubjectId]
  );

  const selectScope = (opts: { subjectId?: string | null; gradeId?: number | null; chapterId?: string | null; lessonId?: string | null }) => {
    setSelectedSubjectId(opts.subjectId ?? null);
    setSelectedGradeId(opts.gradeId ?? null);
    setSelectedChapterId(opts.chapterId ?? null);
    setSelectedLessonId(opts.lessonId ?? null);
    setPage(0);
  };

  const openCreateEditor = () => {
    const targetLesson = selectedLessonId ?? tree?.lessons[0]?.id ?? '';
    setEditingItem(null);
    setEdLessonId(targetLesson);
    setEdPrompt('');
    setEdExplanation('');
    setEdDifficulty('basic');
    setEdStatus('published');
    setEdAnswerKey('A');
    setEdOptA('');
    setEdOptB('');
    setEdOptC('');
    setEdOptD('');
    setEdNote('Tạo câu hỏi mới từ Admin');
    setEditorOpen(true);
  };

  const openEditEditor = (item: QuestionBankItem) => {
    const getOpt = (k: string) => item.options.find((o) => o.key === k)?.text ?? '';
    setEditingItem(item);
    setEdLessonId(item.lesson_id);
    setEdPrompt(item.prompt?.text ?? '');
    setEdExplanation(item.explanation?.text ?? '');
    setEdDifficulty(item.difficulty);
    setEdStatus(item.status);
    setEdAnswerKey(item.answer_key ?? 'A');
    setEdOptA(getOpt('A'));
    setEdOptB(getOpt('B'));
    setEdOptC(getOpt('C'));
    setEdOptD(getOpt('D'));
    setEdNote('');
    setEditorOpen(true);
  };

  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setBannerMsg('');
    try {
      const options = [
        { key: 'A', text: edOptA.trim() },
        { key: 'B', text: edOptB.trim() },
        { key: 'C', text: edOptC.trim() },
        { key: 'D', text: edOptD.trim() }
      ].filter((o) => o.text !== '');

      if (edPrompt.trim() === '') {
        throw new Error('Nội dung câu hỏi không được để trống.');
      }
      if (options.length < 2) {
        throw new Error('Cần ít nhất 2 phương án trả lời khác rỗng.');
      }
      if (!options.some((o) => o.key === edAnswerKey)) {
        throw new Error(`Bạn đang chọn đáp án đúng là ${edAnswerKey}, nhưng phương án ${edAnswerKey} đang bị để trống.`);
      }

      await saveQuestionBankItem({
        questionId: editingItem?.id ?? null,
        lessonId: edLessonId,
        promptText: edPrompt,
        explanationText: edExplanation,
        difficulty: edDifficulty,
        options,
        answerKey: edAnswerKey,
        status: edStatus,
        changeNote: edNote
      });
      setEditorOpen(false);
      setBannerMsg(editingItem ? 'Đã lưu chỉnh sửa câu hỏi & ghi nhận phiên bản mới.' : 'Đã thêm câu hỏi mới vào bài học.');
      await Promise.all([loadTree(), loadQuestions()]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không lưu được câu hỏi');
    } finally {
      setSaving(false);
    }
  };

  const handleArchive = async (item: QuestionBankItem) => {
    setConfirmArchiveId(null);
    try {
      await setQuestionBankStatus(item.id, 'archived', 'Lưu trữ từ Admin Question Bank');
      setBannerMsg('Đã chuyển câu hỏi vào lưu trữ.');
      await Promise.all([loadTree(), loadQuestions()]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không cập nhật được trạng thái');
    }
  };

  const handleBulkImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLessonId) {
      setError('Hãy chọn một Bài học cụ thể ở cây bên trái trước khi nhập hàng loạt.');
      return;
    }
    setImporting(true);
    setError('');
    try {
      const parsed = JSON.parse(importJson);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error('JSON phải là mảng các câu hỏi [{ prompt, options, answer_key, difficulty, explanation }].');
      }
      const res = await bulkImportLessonQuestions(selectedLessonId, parsed, importPublish);
      setImportOpen(false);
      setImportJson('');
      setBannerMsg(`Đã nhập thành công ${res.inserted} câu hỏi vào bài học.`);
      await Promise.all([loadTree(), loadQuestions()]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi nhập dữ liệu JSON');
    } finally {
      setImporting(false);
    }
  };

  const handleExportFiltered = () => {
    const payload = JSON.stringify(listData.rows, null, 2);
    const blob = new Blob([payload], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hocsieuvui_questions_${selectedLesson?.code ?? 'filtered'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalPages = Math.max(1, Math.ceil(listData.total / pageSize));

  return (
    <div className="space-y-4">
      {/* Sub-navigation between Full Curriculum Bank & Batch Queue */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1">
          <button
            type="button"
            onClick={() => setSubMode('bank')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer ${
              subMode === 'bank' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5" /> Ngân hàng theo Chương trình
          </button>
          <button
            type="button"
            onClick={() => setSubMode('batches')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer ${
              subMode === 'batches' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Hàng đợi Lô nhập (Batch Review)
          </button>
        </div>

        {tree && (
          <div className="text-xs text-slate-500">
            Kho hiện tại: <b className="text-slate-900 dark:text-white">{tree.summary.total_questions.toLocaleString('vi-VN')}</b> câu ·{' '}
            <b>{tree.subjects.length}</b> môn · <b>{tree.lessons.length.toLocaleString('vi-VN')}</b> bài học
          </div>
        )}
      </div>

      {subMode === 'batches' ? (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
          <ContentReviewPanel />
        </div>
      ) : (
        <>
          {/* Audit Quick Chips */}
          {tree && (
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3.5 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-slate-500 mr-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500" /> Kiểm toán nội dung:
              </span>
              <button
                type="button"
                onClick={() => {
                  setLessonFilterMode((m) => (m === 'empty' ? 'all' : 'empty'));
                  setAuditMode(null);
                }}
                className={`px-2.5 py-1 rounded-lg border font-semibold cursor-pointer ${
                  lessonFilterMode === 'empty'
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800'
                }`}
              >
                Bài chưa có câu ({tree.summary.empty_lessons})
              </button>
              <button
                type="button"
                onClick={() => {
                  setLessonFilterMode((m) => (m === 'low' ? 'all' : 'low'));
                  setAuditMode(null);
                }}
                className={`px-2.5 py-1 rounded-lg border font-semibold cursor-pointer ${
                  lessonFilterMode === 'low'
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
                }`}
              >
                Bài ít câu &lt; 10 ({tree.summary.low_lessons})
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuditMode((a) => (a === 'duplicate_prompt' ? null : 'duplicate_prompt'));
                  setPage(0);
                }}
                className={`px-2.5 py-1 rounded-lg border font-semibold cursor-pointer ${
                  auditMode === 'duplicate_prompt'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                }`}
              >
                Trùng nội dung ({tree.summary.duplicate_prompts})
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuditMode((a) => (a === 'missing_explanation' ? null : 'missing_explanation'));
                  setPage(0);
                }}
                className={`px-2.5 py-1 rounded-lg border font-semibold cursor-pointer ${
                  auditMode === 'missing_explanation'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                }`}
              >
                Thiếu giải thích ({tree.summary.missing_explanation})
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuditMode((a) => (a === 'missing_answer' ? null : 'missing_answer'));
                  setPage(0);
                }}
                className={`px-2.5 py-1 rounded-lg border font-semibold cursor-pointer ${
                  auditMode === 'missing_answer'
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                }`}
              >
                Thiếu đáp án ({tree.summary.missing_answer})
              </button>
              {(lessonFilterMode !== 'all' || auditMode !== null || selectedSubjectId || selectedGradeId || selectedChapterId || selectedLessonId) && (
                <button
                  type="button"
                  onClick={() => {
                    setLessonFilterMode('all');
                    setAuditMode(null);
                    selectScope({});
                  }}
                  className="ml-auto text-indigo-600 hover:underline font-semibold cursor-pointer"
                >
                  Đặt lại bộ lọc
                </button>
              )}
            </div>
          )}

          {error && <div role="alert" className="rounded-xl bg-rose-50 text-rose-700 p-3 text-sm">{error}</div>}
          {bannerMsg && <div role="status" className="rounded-xl bg-emerald-50 text-emerald-800 p-3 text-sm">{bannerMsg}</div>}

          {/* Split Tree + Questions View */}
          <div className="grid grid-cols-1 lg:grid-cols-[310px_minmax(0,1fr)] gap-4 items-start">
            {/* LEFT: Curriculum Hierarchy Tree */}
            <aside className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 space-y-2 lg:sticky lg:top-20 max-h-[75vh] overflow-y-auto">
              <div className="flex items-center justify-between px-1 pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> Nội dung chương trình
                </span>
                <button
                  type="button"
                  onClick={() => selectScope({})}
                  className={`text-[11px] font-semibold cursor-pointer ${!selectedSubjectId && !selectedLessonId ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Toàn bộ
                </button>
              </div>

              {treeLoading && !tree ? (
                <div className="py-6 text-center text-xs text-slate-500">
                  <Loader2 className="w-4 h-4 animate-spin inline mr-1" /> Đang tải cây bài học…
                </div>
              ) : (
                <div className="space-y-1 text-xs">
                  {(tree?.subjects ?? []).map((sub) => {
                    const gradeMap = chaptersBySubjectGrade.get(sub.id);
                    if (lessonFilterMode !== 'all' && (!gradeMap || gradeMap.size === 0)) return null;
                    const isSubOpen = !!openSubjects[sub.id];
                    const grades = Array.from(gradeMap?.keys() ?? []).sort((a, b) => a - b);

                    return (
                      <div key={sub.id} className="space-y-0.5">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setOpenSubjects((p) => ({ ...p, [sub.id]: !p[sub.id] }))}
                            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                            aria-label={`Mở ${sub.name}`}
                          >
                            {isSubOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setOpenSubjects((p) => ({ ...p, [sub.id]: true }));
                              selectScope({ subjectId: sub.id });
                            }}
                            className={`flex-1 text-left px-2 py-1.5 rounded-lg font-semibold truncate cursor-pointer ${
                              selectedSubjectId === sub.id && !selectedGradeId
                                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                                : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                            }`}
                          >
                            {sub.name}
                          </button>
                        </div>

                        {isSubOpen && (
                          <div className="pl-4 space-y-0.5 border-l border-slate-200 dark:border-slate-800 ml-2.5">
                            {grades.map((g) => {
                              const gKey = `${sub.id}-${g}`;
                              const isGradeOpen = !!openGrades[gKey];
                              const chapters = gradeMap?.get(g) ?? [];
                              return (
                                <div key={gKey} className="space-y-0.5">
                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      onClick={() => setOpenGrades((p) => ({ ...p, [gKey]: !p[gKey] }))}
                                      className="p-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                                    >
                                      {isGradeOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setOpenGrades((p) => ({ ...p, [gKey]: true }));
                                        selectScope({ subjectId: sub.id, gradeId: g });
                                      }}
                                      className={`flex-1 text-left px-2 py-1 rounded-md font-medium truncate cursor-pointer ${
                                        selectedSubjectId === sub.id && selectedGradeId === g && !selectedChapterId
                                          ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                                      }`}
                                    >
                                      Lớp {g} ({chapters.length} chương)
                                    </button>
                                  </div>

                                  {isGradeOpen && (
                                    <div className="pl-3.5 space-y-0.5 border-l border-slate-200 dark:border-slate-800 ml-2">
                                      {chapters.map((ch) => {
                                        const isChOpen = !!openChapters[ch.id];
                                        const lessons = lessonsByChapter.get(ch.id) ?? [];
                                        return (
                                          <div key={ch.id} className="space-y-0.5">
                                            <div className="flex items-center gap-1">
                                              <button
                                                type="button"
                                                onClick={() => setOpenChapters((p) => ({ ...p, [ch.id]: !p[ch.id] }))}
                                                className="p-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                                              >
                                                {isChOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                                              </button>
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  setOpenChapters((p) => ({ ...p, [ch.id]: true }));
                                                  selectScope({ subjectId: sub.id, gradeId: g, chapterId: ch.id });
                                                }}
                                                title={ch.title}
                                                className={`flex-1 text-left px-1.5 py-1 rounded-md truncate cursor-pointer ${
                                                  selectedChapterId === ch.id && !selectedLessonId
                                                    ? 'bg-indigo-50 text-indigo-700 font-semibold dark:bg-indigo-950/60 dark:text-indigo-300'
                                                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                                                }`}
                                              >
                                                {ch.title}
                                              </button>
                                            </div>

                                            {isChOpen && (
                                              <div className="pl-4 space-y-0.5">
                                                {lessons.map((ls) => (
                                                  <button
                                                    key={ls.id}
                                                    type="button"
                                                    onClick={() => selectScope({ subjectId: sub.id, gradeId: g, chapterId: ch.id, lessonId: ls.id })}
                                                    title={ls.title}
                                                    className={`w-full flex items-center justify-between gap-2 px-2 py-1 rounded-md text-left cursor-pointer ${
                                                      selectedLessonId === ls.id
                                                        ? 'bg-indigo-600 text-white font-semibold'
                                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                                    }`}
                                                  >
                                                    <span className="truncate">{ls.title}</span>
                                                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold shrink-0 ${
                                                      selectedLessonId === ls.id
                                                        ? 'bg-white/20 text-white'
                                                        : ls.total === 0
                                                          ? 'bg-rose-100 text-rose-700'
                                                          : ls.total < 10
                                                            ? 'bg-amber-100 text-amber-800'
                                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                                                    }`}>
                                                      {ls.total}
                                                    </span>
                                                  </button>
                                                ))}
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </aside>

            {/* RIGHT: Lesson Stats + Filters + Question List */}
            <div className="min-w-0 space-y-4">
              {/* Selected Scope & Lesson Stats */}
              <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs text-slate-500 truncate">
                      {selectedSubject?.name ?? 'Tất cả môn'}
                      {selectedGradeId ? ` · Lớp ${selectedGradeId}` : ''}
                      {selectedChapter ? ` · ${selectedChapter.title}` : ''}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                      {selectedLesson ? selectedLesson.title : 'Danh sách câu hỏi hệ thống'}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={openCreateEditor}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Thêm câu hỏi
                    </button>
                    <button
                      type="button"
                      onClick={() => setImportOpen(true)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" /> Nhập hàng loạt
                    </button>
                    <button
                      type="button"
                      onClick={handleExportFiltered}
                      disabled={listData.rows.length === 0}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold inline-flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> Xuất JSON
                    </button>
                  </div>
                </div>

                {/* Per-lesson stats */}
                {selectedLesson && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-2.5 text-center">
                      <div className="text-[11px] text-slate-500">Tổng câu hỏi</div>
                      <div className="text-lg font-bold">{selectedLesson.total}</div>
                    </div>
                    <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/30 p-2.5 text-center">
                      <div className="text-[11px] text-emerald-700 dark:text-emerald-300">Đã xuất bản</div>
                      <div className="text-lg font-bold text-emerald-700 dark:text-emerald-300">{selectedLesson.published}</div>
                    </div>
                    <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-2.5 text-center">
                      <div className="text-[11px] text-slate-500">Cơ bản</div>
                      <div className="text-lg font-bold">{selectedLesson.basic}</div>
                    </div>
                    <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-2.5 text-center">
                      <div className="text-[11px] text-slate-500">Vận dụng / Nâng cao</div>
                      <div className="text-lg font-bold">{selectedLesson.application + selectedLesson.advanced}</div>
                    </div>
                  </div>
                )}

                {/* Search & Select Filters */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(0);
                      }}
                      placeholder="Tìm nội dung câu hỏi, mã câu hoặc tên bài…"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <select
                    value={difficulty}
                    onChange={(e) => {
                      setDifficulty(e.target.value);
                      setPage(0);
                    }}
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
                    aria-label="Lọc độ khó"
                  >
                    <option value="all">Tất cả độ khó</option>
                    <option value="basic">Cơ bản</option>
                    <option value="application">Vận dụng</option>
                    <option value="advanced">Nâng cao</option>
                  </select>
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setPage(0);
                    }}
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
                    aria-label="Lọc trạng thái"
                  >
                    <option value="all">Đang hoạt động (trừ lưu trữ)</option>
                    <option value="published">Đã xuất bản</option>
                    <option value="approved">Đã duyệt</option>
                    <option value="pending_review">Chờ duyệt</option>
                    <option value="draft">Bản nháp</option>
                    <option value="archived">Đã lưu trữ</option>
                  </select>
                </div>
              </div>

              {/* Questions Table */}
              <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
                {listLoading ? (
                  <div className="py-12 text-center text-sm text-slate-500">
                    <Loader2 className="w-5 h-5 animate-spin inline mr-2" /> Đang tải câu hỏi…
                  </div>
                ) : listData.rows.length === 0 ? (
                  <div className="py-12 text-center text-sm text-slate-500">
                    Không có câu hỏi nào trong phạm vi bộ lọc hiện tại.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {listData.rows.map((q) => {
                      const stMeta = QUESTION_STATUS_META[q.status] ?? QUESTION_STATUS_META.draft;
                      return (
                        <div key={q.id} className="p-4 space-y-2 hover:bg-slate-50/70 dark:hover:bg-slate-800/30">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex flex-wrap items-center gap-2 text-[11px]">
                              <span className={`px-2 py-0.5 rounded-full border font-semibold ${stMeta.badge}`}>{stMeta.label}</span>
                              <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 font-semibold">
                                {DIFFICULTY_LABEL[q.difficulty]}
                              </span>
                              <span className="font-mono text-slate-400">{q.source_question_code ?? q.lesson_code}</span>
                              <span className="text-slate-500">
                                {q.subject_name} · Lớp {q.grade_id} · {q.lesson_title}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {q.revisions.length > 0 && (
                                <span className="text-[11px] text-slate-400 inline-flex items-center gap-1 mr-1">
                                  <History className="w-3 h-3" /> v{q.version}
                                </span>
                              )}
                              <button
                                type="button"
                                onClick={() => openEditEditor(q)}
                                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 dark:bg-slate-800 dark:text-slate-200 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5" /> Sửa
                              </button>
                              {q.status !== 'archived' && (
                                confirmArchiveId === q.id ? (
                                  <span className="inline-flex items-center gap-1">
                                    <button
                                      type="button"
                                      onClick={() => void handleArchive(q)}
                                      className="px-2 py-1 rounded-lg bg-rose-600 text-white text-[11px] font-bold cursor-pointer"
                                    >
                                      Xác nhận lưu trữ
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setConfirmArchiveId(null)}
                                      className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold cursor-pointer"
                                    >
                                      Hủy
                                    </button>
                                  </span>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => setConfirmArchiveId(q.id)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer"
                                    title="Lưu trữ câu hỏi"
                                  >
                                    <Archive className="w-3.5 h-3.5" />
                                  </button>
                                )
                              )}
                            </div>
                          </div>

                          <div className="text-sm font-semibold text-slate-900 dark:text-white whitespace-pre-wrap">
                            {q.prompt?.text ?? ''}
                          </div>

                          {q.prompt?.visualData ? (
                            <div className="max-w-xs">
                              <QuestionFigure data={q.prompt.visualData as never} alt="Hình minh họa câu hỏi" />
                            </div>
                          ) : null}

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                            {q.options.map((opt) => (
                              <div
                                key={opt.key}
                                className={`px-2.5 py-1.5 rounded-lg border ${
                                  opt.key === q.answer_key
                                    ? 'border-emerald-300 bg-emerald-50/70 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200 font-semibold'
                                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                                }`}
                              >
                                <span className="font-bold mr-1.5">{opt.key}.</span>
                                {opt.text}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500">
                  <span>
                    Hiển thị {listData.rows.length} / {listData.total.toLocaleString('vi-VN')} câu hỏi (Trang {page + 1}/{totalPages})
                  </span>
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
            </div>
          </div>
        </>
      )}

      {/* Question Editor Slide-Over Drawer */}
      {editorOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs">
          <form
            onSubmit={handleSaveQuestion}
            className="w-full max-w-xl bg-white dark:bg-slate-900 h-full overflow-y-auto border-l border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold">{editingItem ? 'Chỉnh sửa câu hỏi' : 'Thêm câu hỏi mới'}</h3>
                <p className="text-xs text-slate-500">
                  {editingItem ? `${editingItem.source_question_code ?? editingItem.lesson_code} · v${editingItem.version}` : 'Lưu trực tiếp vào bài học'}
                </p>
              </div>
              <button type="button" onClick={() => setEditorOpen(false)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {!editingItem && (
              <label className="block space-y-1 text-xs font-semibold">
                <span>Bài học áp dụng</span>
                <select
                  value={edLessonId}
                  onChange={(e) => setEdLessonId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs"
                  required
                >
                  {(tree?.lessons ?? []).map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.code} — {l.title}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <label className="block space-y-1 text-xs font-semibold">
              <span>Nội dung câu hỏi</span>
              <textarea
                rows={3}
                required
                value={edPrompt}
                onChange={(e) => setEdPrompt(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm"
              />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { key: 'A', val: edOptA, set: setEdOptA, req: true },
                { key: 'B', val: edOptB, set: setEdOptB, req: true },
                { key: 'C', val: edOptC, set: setEdOptC, req: false },
                { key: 'D', val: edOptD, set: setEdOptD, req: false }
              ].map((o) => (
                <label key={o.key} className="block space-y-1 text-xs font-semibold">
                  <span>Đáp án {o.key}</span>
                  <input
                    required={o.req}
                    value={o.val}
                    onChange={(e) => o.set(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs"
                  />
                </label>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <label className="block space-y-1 text-xs font-semibold">
                <span>Đáp án đúng</span>
                <select
                  value={edAnswerKey}
                  onChange={(e) => setEdAnswerKey(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs"
                >
                  {['A', 'B', 'C', 'D'].map((k) => (
                    <option key={k} value={k}>Đáp án {k}</option>
                  ))}
                </select>
              </label>
              <label className="block space-y-1 text-xs font-semibold">
                <span>Độ khó</span>
                <select
                  value={edDifficulty}
                  onChange={(e) => setEdDifficulty(e.target.value as QuestionDifficulty)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs"
                >
                  <option value="basic">Cơ bản</option>
                  <option value="application">Vận dụng</option>
                  <option value="advanced">Nâng cao</option>
                </select>
              </label>
              <label className="block space-y-1 text-xs font-semibold">
                <span>Trạng thái</span>
                <select
                  value={edStatus}
                  onChange={(e) => setEdStatus(e.target.value as QuestionStatus)}
                  disabled={editingItem?.status === 'published'}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs disabled:opacity-60"
                >
                  <option value="published">Đã xuất bản</option>
                  <option value="approved">Đã duyệt</option>
                  <option value="pending_review">Chờ duyệt</option>
                  <option value="draft">Bản nháp</option>
                  <option value="archived">Đã lưu trữ</option>
                </select>
              </label>
            </div>

            <label className="block space-y-1 text-xs font-semibold">
              <span>Lời giải chi tiết</span>
              <textarea
                rows={3}
                value={edExplanation}
                onChange={(e) => setEdExplanation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs"
              />
            </label>

            <label className="block space-y-1 text-xs font-semibold">
              <span>Ghi chú phiên bản sửa đổi</span>
              <input
                value={edNote}
                onChange={(e) => setEdNote(e.target.value)}
                placeholder="Ví dụ: Chuẩn hóa đáp án / bổ sung giải thích"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-xs"
              />
            </label>

            {editingItem && editingItem.revisions.length > 0 && (
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-3 space-y-1.5 text-xs">
                <div className="font-bold text-slate-600 dark:text-slate-300">Lịch sử chỉnh sửa</div>
                {editingItem.revisions.map((r) => (
                  <div key={r.id} className="text-slate-500">
                    <b>v{r.version}</b> · {new Date(r.created_at).toLocaleString('vi-VN')} · {r.change_note ?? 'Không có ghi chú'}
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold inline-flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />} Lưu câu hỏi
            </button>
          </form>
        </div>
      )}

      {/* Bulk JSON Import Modal */}
      {importOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4">
          <form
            onSubmit={handleBulkImport}
            className="w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold">Nhập câu hỏi hàng loạt (JSON)</h3>
              <button type="button" onClick={() => setImportOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Bài học đang chọn: <b>{selectedLesson ? `${selectedLesson.code} — ${selectedLesson.title}` : 'Chưa chọn bài học ở cây bên trái'}</b>
            </p>
            <textarea
              rows={8}
              value={importJson}
              onChange={(e) => setImportJson(e.target.value)}
              placeholder='[{"prompt":"2 + 3 = ?","options":[{"key":"A","text":"4"},{"key":"B","text":"5"},{"key":"C","text":"6"},{"key":"D","text":"7"}],"answer_key":"B","difficulty":"basic","explanation":"2 + 3 = 5"}]'
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs"
            />
            <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
              <input type="checkbox" checked={importPublish} onChange={(e) => setImportPublish(e.target.checked)} />
              <span>Xuất bản ngay sau khi nhập (nếu bỏ chọn sẽ lưu ở Bản nháp)</span>
            </label>
            <button
              type="submit"
              disabled={importing || !selectedLessonId}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold disabled:opacity-50 cursor-pointer"
            >
              {importing ? 'Đang nhập…' : 'Xác nhận nhập vào bài học'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
