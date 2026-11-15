import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, Ban, Flag, Inbox, Loader2, Send, ShieldCheck, X } from 'lucide-react';
import {
  dmBlock, dmFetch, dmGetAllowed, dmInbox, dmReport, dmSend, dmSetAllowed,
  type DmInboxRow, type DmMessage
} from '../lib/api';
import { soundManager } from '../utils/audio';

export interface DmPeer { id: string; alias: string }

interface Props {
  selfId: string;
  /** Mở thẳng cuộc trò chuyện với bạn này (từ thẻ bạn bè ở Sảnh). */
  initialPeer?: DmPeer | null;
  onClose: () => void;
  onUnreadChange?: (n: number) => void;
}

const timeLabel = (iso: string) => {
  const d = new Date(iso);
  const same = d.toDateString() === new Date().toDateString();
  return same
    ? d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    : d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
};

/** Hộp thư nhắn riêng: danh sách cuộc trò chuyện + khung chat 1-1 (tự làm mới mỗi 4 giây khi đang mở). */
export const DirectMessages: React.FC<Props> = ({ selfId, initialPeer, onClose, onUnreadChange }) => {
  const [peer, setPeer] = useState<DmPeer | null>(initialPeer ?? null);
  const [inbox, setInbox] = useState<DmInboxRow[]>([]);
  const [msgs, setMsgs] = useState<DmMessage[]>([]);
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);
  const [allow, setAllow] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);

  const loadInbox = useCallback(async () => {
    try {
      const rows = await dmInbox();
      setInbox(rows);
      onUnreadChange?.(rows.reduce((n, r) => n + r.unread, 0));
    } catch (e) { setNotice((e as Error).message); }
    finally { setLoading(false); }
  }, [onUnreadChange]);

  const loadThread = useCallback(async (id: string) => {
    try { setMsgs(await dmFetch(id)); } catch (e) { setNotice((e as Error).message); }
  }, []);

  useEffect(() => { void dmGetAllowed().then(setAllow).catch(() => undefined); }, []);

  useEffect(() => {
    void loadInbox();
    if (peer) void loadThread(peer.id);
    const t = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      if (peer) void loadThread(peer.id); else void loadInbox();
    }, 4000);
    return () => window.clearInterval(t);
  }, [peer, loadInbox, loadThread]);

  useEffect(() => { endRef.current?.scrollIntoView({ block: 'end' }); }, [msgs.length, peer]);

  const send = async () => {
    const body = text.trim();
    if (!peer || !body || busy) return;
    setBusy(true); setNotice(null);
    try {
      const m = await dmSend(peer.id, body);
      setMsgs((prev) => [...prev, m]);
      setText('');
      soundManager.play('click');
    } catch (e) { setNotice((e as Error).message); }
    finally { setBusy(false); }
  };

  const report = async (m: DmMessage) => {
    if (!window.confirm('Báo cáo tin nhắn này? Tin sẽ bị ẩn và bạn sẽ không nhận tin từ bạn đó nữa.')) return;
    try { await dmReport(m.id); setMsgs((p) => p.filter((x) => x.id !== m.id)); setNotice('Đã báo cáo và chặn bạn này. Cảm ơn bạn!'); void loadInbox(); }
    catch (e) { setNotice((e as Error).message); }
  };

  const block = async (blockIt: boolean) => {
    if (!peer) return;
    try { await dmBlock(peer.id, blockIt); setNotice(blockIt ? `Đã chặn ${peer.alias}.` : `Đã bỏ chặn ${peer.alias}.`); void loadInbox(); }
    catch (e) { setNotice((e as Error).message); }
  };

  const toggleAllow = async () => {
    const next = !allow;
    try { await dmSetAllowed(next); setAllow(next); } catch (e) { setNotice((e as Error).message); }
  };

  const peerRow = peer ? inbox.find((r) => r.peer_id === peer.id) : undefined;

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center bg-slate-900/60 p-0 sm:p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Tin nhắn riêng"
        className="w-full sm:max-w-md h-[85dvh] sm:h-[600px] bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 p-3 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          {peer ? (
            <button onClick={() => { setPeer(null); setMsgs([]); setNotice(null); void loadInbox(); }} className="p-1.5 rounded-lg hover:bg-white/20 cursor-pointer" aria-label="Về hộp thư"><ArrowLeft className="w-5 h-5" /></button>
          ) : <Inbox className="w-5 h-5 ml-1" />}
          <div className="flex-1 min-w-0 font-black truncate">{peer ? peer.alias : 'Hộp thư'}</div>
          {peer && (
            peerRow?.blocked
              ? <button onClick={() => void block(false)} className="text-[11px] font-bold px-2 py-1 rounded-lg bg-white/20 cursor-pointer">Bỏ chặn</button>
              : <button onClick={() => void block(true)} className="p-1.5 rounded-lg hover:bg-white/20 cursor-pointer" aria-label="Chặn bạn này" title="Chặn bạn này"><Ban className="w-4 h-4" /></button>
          )}
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/20 cursor-pointer" aria-label="Đóng"><X className="w-5 h-5" /></button>
        </div>

        {notice && <div className="px-3 py-2 text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200" onClick={() => setNotice(null)}>{notice}</div>}

        {!peer ? (
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {loading ? <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-blue-600" /></div>
              : inbox.length === 0 ? (
                <div className="text-center text-sm text-slate-500 py-10 px-4">Chưa có tin nhắn nào. Vào Sảnh Online, bấm vào một bạn rồi chọn <b>Nhắn riêng</b> để bắt đầu nhé!</div>
              ) : inbox.map((r) => (
                <button key={r.peer_id} onClick={() => { setPeer({ id: r.peer_id, alias: r.peer_alias }); setNotice(null); }}
                  className="w-full text-left p-3 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 flex items-center gap-3 cursor-pointer bg-white dark:bg-slate-800">
                  <span className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-black flex items-center justify-center shrink-0">{r.peer_alias.slice(0, 1).toUpperCase()}</span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2"><span className="text-sm font-black text-slate-900 dark:text-white truncate">{r.peer_alias}</span><span className="text-[10px] text-slate-500 shrink-0">Cấp {r.peer_level}</span></span>
                    <span className="block text-xs text-slate-500 truncate">{r.blocked ? 'Đã chặn' : r.last_preview}</span>
                  </span>
                  <span className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-[10px] text-slate-400">{timeLabel(r.last_at)}</span>
                    {r.unread > 0 && <span className="min-w-5 h-5 px-1.5 rounded-full bg-rose-500 text-white text-[11px] font-black flex items-center justify-center">{r.unread}</span>}
                  </span>
                </button>
              ))}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-slate-50 dark:bg-slate-950/40">
            {msgs.length === 0 && <div className="text-center text-xs text-slate-500 py-8">Hãy gửi lời chào đầu tiên tới {peer.alias} 👋</div>}
            {msgs.map((m) => {
              const mine = m.sender_id === selfId;
              return (
                <div key={m.id} className={`flex ${mine ? 'justify-end' : 'justify-start'} group`}>
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm break-words ${mine ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-sm'}`}>
                    {m.body}
                    <div className={`flex items-center gap-2 mt-0.5 text-[10px] ${mine ? 'text-blue-100 justify-end' : 'text-slate-400'}`}>
                      <span>{timeLabel(m.created_at)}{mine && m.read_at ? ' · Đã xem' : ''}</span>
                      {!mine && <button onClick={() => void report(m)} className="opacity-60 hover:opacity-100 cursor-pointer" aria-label="Báo cáo tin nhắn" title="Báo cáo"><Flag className="w-3 h-3" /></button>}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={endRef} />
          </div>
        )}

        {peer ? (
          <form onSubmit={(e) => { e.preventDefault(); void send(); }} className="p-2.5 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 bg-white dark:bg-slate-900">
            <input value={text} onChange={(e) => setText(e.target.value)} maxLength={200} placeholder={peerRow?.blocked ? 'Bạn đã chặn bạn này' : 'Nhập tin nhắn…'} disabled={peerRow?.blocked}
              className="flex-1 min-w-0 px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-base" />
            <button type="submit" disabled={busy || !text.trim() || peerRow?.blocked} className="p-3 rounded-xl bg-blue-600 text-white disabled:opacity-40 cursor-pointer" aria-label="Gửi">
              {busy ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </form>
        ) : (
          <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-2 bg-white dark:bg-slate-900">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
              <input type="checkbox" checked={allow} onChange={() => void toggleAllow()} /> Cho phép bạn bè nhắn riêng cho mình
            </label>
            <p className="text-[11px] text-slate-500 flex items-start gap-1"><ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-600" />Đừng chia sẻ tên thật, địa chỉ, số điện thoại hay mật khẩu. Tin không phù hợp hãy bấm cờ để báo cáo.</p>
          </div>
        )}
      </div>
    </div>
  );
};
