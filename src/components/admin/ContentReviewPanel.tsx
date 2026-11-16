import React, { useCallback, useEffect, useState } from 'react';
import { CheckCircle2, FileCheck2, History, Loader2, RefreshCw, RotateCcw, Send, ShieldCheck } from 'lucide-react';
import {
  adminContentReviewBatchDetail,
  adminContentReviewBatches,
  adminPublishContentBatch,
  adminReviewContentQuestion,
  type ContentReviewBatch,
  type ContentReviewBatchDetail,
  type ContentReviewQuestion
} from '../../lib/api';
import { QuestionFigure } from '../QuestionFigure';

const statusLabel: Record<string, string> = {
  staged: 'Đã nhập',
  validated: 'Đã kiểm tra cấu trúc',
  pending_review: 'Chờ duyệt',
  approved: 'Đã duyệt',
  published: 'Đã xuất bản',
  draft: 'Bản nháp',
  archived: 'Đã lưu trữ'
};

function QuestionCard({ question, busy, onReview }: {
  question: ContentReviewQuestion;
  busy: boolean;
  onReview: (id: string, decision: 'approve' | 'return', note: string) => void;
}) {
  const [note, setNote] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const prompt = question.prompt?.text ?? '';
  const figureData = question.prompt?.visualData;
  return (
    <article className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="text-xs text-slate-500">{question.source_question_code} · {question.lesson_code}</div>
          <h4 className="font-bold">{question.chapter_title} / {question.lesson_title}</h4>
        </div>
        <span className="text-xs rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1">{statusLabel[question.status] ?? question.status} · v{question.version}</span>
      </div>
      <div className="font-semibold whitespace-pre-wrap">{prompt}</div>
      {figureData ? <QuestionFigure data={figureData} alt="Hình minh họa câu hỏi"/> : null}
      <div className="grid sm:grid-cols-2 gap-2">
        {question.options.map((o) => (
          <div key={o.key} className={`rounded-xl border p-3 text-sm ${o.key === question.answer_key ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30' : 'border-slate-200 dark:border-slate-700'}`}>
            <span className="font-bold mr-2">{o.key}.</span>{o.text}
            {o.key === question.answer_key ? <span className="ml-2 text-emerald-700 dark:text-emerald-300 text-xs font-bold">Đáp án đúng</span> : null}
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-slate-50 dark:bg-slate-800/70 p-3 text-sm">
        <div className="font-bold mb-1">Giải thích</div>
        <p className="whitespace-pre-wrap">{question.explanation?.text ?? 'Chưa có lời giải'}</p>
        <div className="text-xs text-slate-500 mt-2">Mức độ: {question.difficulty} · Kỹ năng: {question.skill ?? '—'}</div>
      </div>
      <button type="button" onClick={() => setShowHistory(v => !v)} className="text-sm font-semibold text-indigo-600 flex items-center gap-2">
        <History className="w-4 h-4"/> {showHistory ? 'Ẩn lịch sử chỉnh sửa' : `Xem lịch sử chỉnh sửa (${question.revisions.length})`}
      </button>
      {showHistory ? (
        <div className="space-y-2 border-l-2 border-indigo-200 pl-3">
          {question.revisions.length === 0 ? <p className="text-xs text-slate-500">Chưa có phiên bản lưu.</p> : question.revisions.map(r => (
            <div key={r.id} className="text-xs rounded-lg bg-slate-50 dark:bg-slate-800 p-2">
              <div className="font-bold">Phiên bản {r.version} · {new Date(r.created_at).toLocaleString('vi-VN')}</div>
              <div>{r.change_note ?? 'Không có ghi chú thay đổi'}</div>
              <div className="mt-1 text-slate-500 whitespace-pre-wrap">{r.snapshot?.prompt?.text ?? ''}</div>
            </div>
          ))}
          {question.review_events.length > 0 ? (
            <div className="space-y-1 pt-2">
              <div className="font-bold text-xs">Nhật ký kiểm duyệt</div>
              {question.review_events.map((event, index) => (
                <div key={`${event.action}-${event.created_at}-${index}`} className="text-xs text-slate-500">
                  {event.action === 'approved' ? 'Đã duyệt' : event.action === 'returned_to_draft' ? 'Trả về bản nháp' : event.action} · {new Date(event.created_at).toLocaleString('vi-VN')} {event.note ? `· ${event.note}` : ''}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
      {question.status === 'pending_review' ? (
        <div className="border-t border-slate-200 dark:border-slate-700 pt-3 space-y-2">
          <textarea value={note} onChange={e => setNote(e.target.value)} rows={2} placeholder="Ghi chú kiểm duyệt (nếu cần)" className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent p-2 text-sm"/>
          <div className="flex flex-wrap gap-2">
            <button type="button" disabled={busy} onClick={() => onReview(question.id, 'approve', note)} className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold disabled:opacity-50 flex items-center gap-2">
              {busy ? <Loader2 className="w-4 h-4 animate-spin"/> : <CheckCircle2 className="w-4 h-4"/>} Duyệt câu hỏi
            </button>
            <button type="button" disabled={busy} onClick={() => onReview(question.id, 'return', note)} className="px-3 py-2 rounded-xl bg-amber-100 text-amber-900 text-sm font-bold disabled:opacity-50 flex items-center gap-2">
              <RotateCcw className="w-4 h-4"/> Trả về bản nháp
            </button>
          </div>
        </div>
      ) : null}
    </article>
  );
}

export const ContentReviewPanel: React.FC = () => {
  const [batches, setBatches] = useState<ContentReviewBatch[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<ContentReviewBatchDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const loadBatches = useCallback(async (preferredId?: string | null) => {
    setLoading(true);
    setError('');
    try {
      const rows = await adminContentReviewBatches();
      setBatches(rows);
      const nextId = preferredId ?? selectedId ?? rows[0]?.id ?? null;
      setSelectedId(nextId);
      if (nextId) setDetail(await adminContentReviewBatchDetail(nextId));
      else setDetail(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Không tải được hàng đợi duyệt');
    } finally {
      setLoading(false);
    }
  }, [selectedId]);

  useEffect(() => { void loadBatches(); }, [loadBatches]);

  const selectBatch = async (id: string) => {
    setSelectedId(id);
    setDetail(null);
    setLoading(true);
    setError('');
    try { setDetail(await adminContentReviewBatchDetail(id)); }
    catch (e) { setError(e instanceof Error ? e.message : 'Không tải được lô nội dung'); }
    finally { setLoading(false); }
  };

  const review = async (id: string, decision: 'approve' | 'return', note: string) => {
    setBusyId(id); setError(''); setMessage('');
    try {
      await adminReviewContentQuestion(id, decision, note || (decision === 'approve' ? 'Đã kiểm duyệt trong Admin Panel.' : 'Trả về để chỉnh sửa.'));
      setMessage(decision === 'approve' ? 'Đã duyệt câu hỏi.' : 'Đã trả câu hỏi về bản nháp.');
      await loadBatches(selectedId);
    } catch (e) { setError(e instanceof Error ? e.message : 'Không thực hiện được thao tác duyệt'); }
    finally { setBusyId(null); }
  };

  const publish = async () => {
    if (!selectedId || !detail) return;
    const approved = detail.questions.filter(q => q.status === 'approved').length;
    if (approved !== detail.questions.length) {
      setError('Chỉ xuất bản khi tất cả câu hỏi trong lô đã được duyệt.');
      return;
    }
    if (!window.confirm(`Xuất bản ${approved} câu hỏi trong lô này? Nội dung sẽ hiển thị cho học sinh.`)) return;
    setPublishing(true); setError(''); setMessage('');
    try {
      await adminPublishContentBatch(selectedId);
      setMessage('Đã xuất bản lô nội dung.');
      await loadBatches(selectedId);
    } catch (e) { setError(e instanceof Error ? e.message : 'Không xuất bản được lô'); }
    finally { setPublishing(false); }
  };

  const pending = detail?.questions.filter(q => q.status === 'pending_review').length ?? 0;
  const approved = detail?.questions.filter(q => q.status === 'approved').length ?? 0;
  const published = detail?.questions.filter(q => q.status === 'published').length ?? 0;

  return (
    <section className="space-y-4 border-t border-slate-200 dark:border-slate-700 pt-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-bold flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-indigo-600"/> Duyệt ngân hàng câu hỏi</h3>
        <button type="button" onClick={() => void loadBatches(selectedId)} disabled={loading} className="text-sm rounded-xl border px-3 py-2 flex items-center gap-2">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}/> Làm mới
        </button>
      </div>
      <p className="text-xs text-slate-500">Chỉ tài khoản có quyền platform_admin mới truy cập được. Khóa đáp án chỉ được trả về bởi RPC kiểm duyệt phía máy chủ.</p>
      {error ? <div role="alert" className="rounded-xl bg-rose-50 text-rose-700 p-3 text-sm">{error}</div> : null}
      {message ? <div role="status" className="rounded-xl bg-emerald-50 text-emerald-800 p-3 text-sm">{message}</div> : null}
      <div className="grid md:grid-cols-[minmax(220px,0.8fr)_minmax(0,2fr)] gap-3">
        <aside className="space-y-2">
          <div className="font-bold text-sm">Các lô nội dung</div>
          {batches.map(b => (
            <button key={b.id} type="button" onClick={() => void selectBatch(b.id)} className={`w-full text-left rounded-xl border p-3 space-y-1 ${selectedId === b.id ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30' : 'border-slate-200 dark:border-slate-700'}`}>
              <div className="font-semibold text-sm">{b.source_name}</div>
              <div className="text-xs text-slate-500">{b.question_count} câu · {statusLabel[b.status] ?? b.status}</div>
              <div className="text-xs text-slate-500">Chờ {b.pending_count} · Duyệt {b.approved_count} · Đã xuất bản {b.published_count}</div>
            </button>
          ))}
          {!batches.length && !loading ? <p className="text-sm text-slate-500">Chưa có lô nội dung.</p> : null}
        </aside>
        <div className="min-w-0 space-y-3">
          {detail ? (
            <>
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-3 space-y-2">
                <div className="font-bold">{detail.batch.source_name}</div>
                <div className="text-xs text-slate-500">Phiên bản {detail.batch.source_version ?? '—'} · {detail.batch.row_count} dòng · Trạng thái: {statusLabel[detail.batch.status] ?? detail.batch.status}</div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-xl bg-white dark:bg-slate-900 p-2"><b className="block text-lg">{pending}</b>Chờ duyệt</div>
                  <div className="rounded-xl bg-white dark:bg-slate-900 p-2"><b className="block text-lg">{approved}</b>Đã duyệt</div>
                  <div className="rounded-xl bg-white dark:bg-slate-900 p-2"><b className="block text-lg">{published}</b>Đã xuất bản</div>
                </div>
                {approved === detail.questions.length && published === 0 && detail.questions.length > 0 ? (
                  <button type="button" onClick={() => void publish()} disabled={publishing} className="w-full rounded-xl bg-indigo-600 text-white p-3 font-bold flex justify-center items-center gap-2 disabled:opacity-50">
                    {publishing ? <Loader2 className="w-4 h-4 animate-spin"/> : <Send className="w-4 h-4"/>} Xuất bản toàn bộ lô ({approved} câu)
                  </button>
                ) : null}
                {published === detail.questions.length && detail.questions.length > 0 ? <div className="text-emerald-700 font-bold text-sm flex items-center gap-2"><FileCheck2 className="w-4 h-4"/> Lô đã xuất bản</div> : null}
              </div>
              {detail.questions.map(q => <QuestionCard key={q.id} question={q} busy={busyId === q.id} onReview={review}/>)}
            </>
          ) : loading ? <div className="text-sm text-slate-500 flex gap-2 items-center"><Loader2 className="w-4 h-4 animate-spin"/> Đang tải nội dung…</div> : null}
        </div>
      </div>
    </section>
  );
};
