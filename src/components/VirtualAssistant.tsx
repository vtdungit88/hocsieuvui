import React, { useEffect, useMemo, useRef, useState } from 'react';
import { soundManager } from '../utils/audio';
import { submitFeedback } from '../lib/api';
import { StudentProfile } from '../types';
import confetti from 'canvas-confetti';
import {
  X,
  Send,
  BookOpen,
  Zap,
  Map,
  Shirt,
  Trophy,
  CheckCircle2,
  MessageSquareHeart,
  Lightbulb,
  Compass,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { StarIcon } from './GameIcons';
import { answerQuestion, QUICK_QUESTIONS, type BrainAnswer, type NavView } from '../lib/assistantBrain';
import { VuiBotMascot, type VuiBotMotion } from './VuiBotMascot';
import type { VuiBotExpression } from '../data/vuibotMascot';

const GUIDE_ITEMS: {
  title: string;
  desc: string;
  cta: string;
  view: NavView;
  Icon: React.ComponentType<{ className?: string }>;
  tone: string;
}[] = [
  {
    title: 'Bài Học & Luyện Tập',
    desc: 'Chọn môn, lớp, chương và bài học hiện có để làm trắc nghiệm theo SGK, xem giải thích khi có và tích lũy Xu.',
    cta: 'Bắt đầu học',
    view: 'study',
    Icon: BookOpen,
    tone: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Bản Đồ Ải',
    desc: 'Khám phá bản đồ kiến thức theo từng chương và mở các chặng tiếp theo khi đạt từ 1–3 sao theo tiến trình đang có.',
    cta: 'Mở bản đồ',
    view: 'map',
    Icon: Map,
    tone: 'bg-emerald-100 text-emerald-600'
  },
  {
    title: 'Đấu Trường',
    desc: 'Siêu Tốc 60 giây (lớp 1–2 có 90 giây), Thách Đấu 1v1 cùng Vui-Bot tính điểm Elo, hoặc Phòng Lớp Học bằng mã PIN.',
    cta: 'Vào đấu trường',
    view: 'blitz',
    Icon: Zap,
    tone: 'bg-orange-100 text-orange-600'
  },
  {
    title: 'Studio Nhân Vật',
    desc: 'Sử dụng Xu và Sao để mở khóa hơn 100 vật phẩm: trang phục siêu anh hùng & biệt đội, thú cưng, siêu xe, hào quang, 7 bộ sưu tập và tự trang trí Phòng Cá Nhân.',
    cta: 'Tới Studio',
    view: 'shop',
    Icon: Shirt,
    tone: 'bg-amber-100 text-amber-600'
  },
  {
    title: 'Sảnh Online & Nhắn riêng',
    desc: 'Giao lưu trực tuyến, đố vui cùng Vui-Bot mỗi ngày, du hành khắp Việt Nam và nhắn tin riêng an toàn.',
    cta: 'Vào sảnh',
    view: 'lobby',
    Icon: Compass,
    tone: 'bg-teal-100 text-teal-600'
  },
  {
    title: 'Bảng Xếp Hạng',
    desc: 'Theo dõi thứ hạng và thành tích sao, xu của học sinh theo dữ liệu hệ thống đang hiển thị.',
    cta: 'Xem bảng vàng',
    view: 'leaderboard',
    Icon: Trophy,
    tone: 'bg-yellow-100 text-yellow-600'
  }
];

interface ContextualPrompt {
  tag: string;
  title: string;
  subtitle: string;
  expression: VuiBotExpression;
  motion: VuiBotMotion;
}

interface VirtualAssistantProps {
  student: StudentProfile;
  currentView: NavView;
  onNavigateToView: (view: NavView) => void;
  onOpenInteractiveGuide?: () => void;
}

export const VirtualAssistant: React.FC<VirtualAssistantProps> = ({
  student,
  currentView,
  onNavigateToView,
  onOpenInteractiveGuide
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'guide' | 'feedback'>('chat');
  const [showBubble, setShowBubble] = useState(true);
  const [bubbleIndex, setBubbleIndex] = useState(0);

  // Build activity-aware dynamic speech bubbles (chào mừng, gợi ý bài học, nhắc nhiệm vụ, chúc mừng)
  const contextualPrompts = useMemo<ContextualPrompt[]>(() => {
    const gradeNum = String(student.grade || '6').replace(/\D/g, '') || '6';
    const welcomeTitle = student.isGuest
      ? 'Chào bạn nhỏ! Mình là Vui-Bot!'
      : `Chào ${student.name}! Vui-Bot đây!`;

    const viewSuggestion: Record<NavView, string> = {
      study: `Gợi ý: Thử ngay 1 bài Lớp ${gradeNum} để nhận thêm Xu & Sao nhé!`,
      map: 'Chạm hòn đảo đang sáng để vượt ải và mở khóa kho báu!',
      blitz: 'Sẵn sàng chưa? Thử Siêu Tốc hoặc Đấu 1v1 để tăng hạng Elo!',
      shop: 'Ghé Studio phối đồ chất cho nhân vật rồi khoe ở Sảnh nhé!',
      lobby: 'Đừng quên ghé ki-ốt Vui-Bot ở góc sân để nhận +3 Xu mỗi ngày!',
      leaderboard: 'Học đều mỗi ngày 1 ải sẽ giúp bạn leo Bảng Vàng cực nhanh!'
    };

    const questReminder = student.isGuest
      ? 'Nhắc nhiệm vụ: Tạo biệt danh chỉ 10 giây để nhận 120 Xu!'
      : 'Nhắc nhiệm vụ: Hoàn thành 1 bài hôm nay hoặc đố vui Sảnh Online!';

    const celebration =
      student.stars >= 10 || student.coins >= 80
        ? `Chúc mừng! Bạn đã có ${student.stars} Sao & ${student.coins} Xu rồi đó!`
        : 'Cố lên! Mỗi câu đúng giúp bạn tiến gần hơn tới Cấp tiếp theo!';

    return [
      {
        tag: 'Chào mừng',
        title: welcomeTitle,
        subtitle: 'Bấm vào Vui-Bot để trò chuyện & xem gợi ý',
        expression: 'happy',
        motion: 'wave'
      },
      {
        tag: 'Gợi ý bài học',
        title: 'Gợi ý từ Vui-Bot',
        subtitle: viewSuggestion[currentView],
        expression: 'guiding',
        motion: 'float'
      },
      {
        tag: 'Nhắc nhiệm vụ',
        title: 'Nhiệm vụ hôm nay',
        subtitle: questReminder,
        expression: 'thinking',
        motion: 'float'
      },
      {
        tag: 'Chúc mừng',
        title: student.stars > 0 ? 'Thành tích tuyệt vời!' : 'Cùng cố gắng nhé!',
        subtitle: celebration,
        expression: 'cheer',
        motion: 'cheer'
      }
    ];
  }, [student.name, student.isGuest, student.grade, student.stars, student.coins, currentView]);

  useEffect(() => {
    if (!showBubble || isOpen) return;
    const id = window.setInterval(() => {
      setBubbleIndex((i) => (i + 1) % contextualPrompts.length);
    }, 7500);
    return () => window.clearInterval(id);
  }, [showBubble, isOpen, contextualPrompts.length]);

  const activePrompt = contextualPrompts[bubbleIndex % contextualPrompts.length];

  // Chat state (rule-based helper; no external AI service)
  type ChatMsg = { from: 'bot' | 'me'; text: string; actions?: BrainAnswer['actions'] };
  const [chat, setChat] = useState<ChatMsg[]>([
    {
      from: 'bot',
      text: 'Xin chào! Mình là Vui-Bot 🤖 – trợ lý chính thức của Học Siêu Vui. Hỏi mình cách làm bài, kiếm xu, vượt bản đồ, mua đồ… hoặc bấm một gợi ý bên dưới nhé!'
    }
  ]);
  const [botExpression, setBotExpression] = useState<VuiBotExpression>('happy');
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ block: 'end' });
  }, [chat]);

  const ask = (q: string) => {
    const text = q.trim();
    if (!text) return;
    soundManager.play('click');
    const a = answerQuestion(text, {
      name: student.name,
      isGuest: !!student.isGuest,
      coins: student.coins,
      stars: student.stars
    });
    setBotExpression(a.expression ?? 'happy');
    setChat((c) => [...c, { from: 'me', text }, { from: 'bot', text: a.text, actions: a.actions }]);
    setChatInput('');
  };

  // Feedback form state
  const [feedbackCategory, setFeedbackCategory] = useState<'suggestion' | 'bug' | 'compliment' | 'question'>('suggestion');
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackError, setFeedbackError] = useState('');
  const [sending, setSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMessage.trim() || sending) return;
    setSending(true);
    setFeedbackError('');
    try {
      await submitFeedback(feedbackCategory, feedbackRating, feedbackMessage.trim());
    } catch (err) {
      setFeedbackError(err instanceof Error ? err.message : 'Không gửi được, thử lại sau nhé.');
      setSending(false);
      return;
    }
    setSending(false);
    soundManager.play('fanfare');
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    setIsSubmitted(true);
    setTimeout(() => {
      setFeedbackMessage('');
      setIsSubmitted(false);
      setActiveTab('guide');
    }, 2500);
  };

  return (
    <>
      {/* FLOATING VUI-BOT TRIGGER & DYNAMIC SPEECH BUBBLE */}
      <div className="fixed bottom-20 md:bottom-5 right-3 sm:right-5 z-40 flex items-end gap-2 sm:gap-3 pointer-events-none">
        {showBubble && !isOpen && (
          <div className="pointer-events-auto relative max-w-[230px] sm:max-w-[280px] rounded-2xl rounded-br-sm bg-white/95 dark:bg-slate-900/95 backdrop-blur border-2 border-blue-400/90 dark:border-cyan-500/70 shadow-xl px-3.5 py-2.5 transition-all">
            <div className="flex items-start justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  soundManager.play('click');
                  setIsOpen(true);
                  setShowBubble(false);
                }}
                className="text-left min-w-0 flex-1 cursor-pointer focus:outline-none"
              >
                <div className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                  {activePrompt.tag}
                </div>
                <div className="text-xs sm:text-[13px] font-black text-slate-900 dark:text-white leading-snug">
                  {activePrompt.title}
                </div>
                <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 leading-snug mt-0.5 line-clamp-2">
                  {activePrompt.subtitle}
                </div>
              </button>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowBubble(false);
                  }}
                  aria-label="Ẩn bong bóng trò chuyện"
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    soundManager.play('click');
                    setBubbleIndex((i) => (i + 1) % contextualPrompts.length);
                  }}
                  aria-label="Gợi ý tiếp theo"
                  title="Xem gợi ý tiếp theo"
                  className="text-blue-600 dark:text-cyan-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg p-0.5 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Larger Floating Vui-Bot Mascot Button */}
        <button
          type="button"
          onClick={() => {
            soundManager.play('click');
            setIsOpen(true);
            setShowBubble(false);
          }}
          aria-label="Mở Trợ Lý Ảo Vui-Bot"
          title="Trợ lý ảo Vui-Bot – Bấm để trò chuyện & hướng dẫn"
          className="pointer-events-auto relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-full cursor-pointer group focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400 transition-transform hover:scale-105 active:scale-95"
        >
          <span
            aria-hidden="true"
            className="absolute inset-2 rounded-full bg-gradient-to-tr from-blue-500/30 via-cyan-400/25 to-indigo-500/30 blur-md group-hover:scale-110 transition-transform"
          />
          <VuiBotMascot
            expression={activePrompt.expression}
            motion={activePrompt.motion}
            className="relative z-10 w-20 h-20 sm:w-24 sm:h-24"
            alt="Vui-Bot – Trợ lý ảo Học Siêu Vui"
          />
          <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 z-20 px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black shadow-md border border-white/80 whitespace-nowrap">
            Vui-Bot
          </span>
        </button>
      </div>

      {/* ASSISTANT MODAL DIALOG */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="Trợ Lý Ảo Vui-Bot"
        >
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/30 flex items-center justify-center p-0.5 shrink-0">
                  <VuiBotMascot
                    expression={activeTab === 'guide' ? 'guiding' : activeTab === 'feedback' ? 'cheer' : botExpression}
                    motion="none"
                    showBlinkGlint={false}
                    className="w-11 h-11"
                    alt="Vui-Bot"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-base sm:text-lg">
                      Trợ Lý Ảo Vui-Bot
                    </h3>
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
                      Hỗ trợ 24/7
                    </span>
                  </div>
                  <p className="text-xs text-blue-100">
                    Hướng dẫn tương tác, hỏi đáp & tiếp nhận góp ý
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundManager.play('click');
                  setIsOpen(false);
                }}
                aria-label="Đóng Trợ lý ảo"
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 px-4 pt-2 gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  soundManager.play('click');
                  setActiveTab('chat');
                }}
                className={`py-2.5 px-3.5 sm:px-4 font-bold text-xs rounded-t-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'chat'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 border-t-2 border-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                <Lightbulb className="w-4 h-4" />
                <span>Hỏi Vui-Bot</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.play('click');
                  setActiveTab('guide');
                }}
                className={`py-2.5 px-3.5 sm:px-4 font-bold text-xs rounded-t-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'guide'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 border-t-2 border-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Hướng Dẫn</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.play('click');
                  setActiveTab('feedback');
                }}
                className={`py-2.5 px-3.5 sm:px-4 font-bold text-xs rounded-t-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'feedback'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 border-t-2 border-blue-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                <MessageSquareHeart className="w-4 h-4" />
                <span>Góp Ý</span>
              </button>
            </div>

            {/* Content Body */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
              {activeTab === 'chat' ? (
                <div className="flex flex-col gap-3">
                  <div className="mx-auto flex items-center justify-center rounded-2xl bg-gradient-to-b from-sky-50 to-blue-50/70 dark:from-slate-800/80 dark:to-slate-800/30 px-6 py-2 border border-blue-100 dark:border-slate-700/70">
                    <VuiBotMascot
                      expression={botExpression}
                      motion={botExpression === 'cheer' ? 'cheer' : 'float'}
                      className="w-24 h-24"
                      alt="Vui-Bot đang trò chuyện"
                    />
                  </div>
                  <div className="space-y-2.5" aria-live="polite">
                    {chat.map((m, i) => (
                      <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <div
                          className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-line ${
                            m.from === 'me'
                              ? 'bg-blue-600 text-white rounded-br-sm'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-sm'
                          }`}
                        >
                          {m.text}
                          {m.actions && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {m.actions.map((a) => (
                                <button
                                  type="button"
                                  key={a.label}
                                  onClick={() => {
                                    soundManager.play('click');
                                    onNavigateToView(a.view);
                                    setIsOpen(false);
                                  }}
                                  className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-slate-600 cursor-pointer"
                                >
                                  {a.label} →
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_QUESTIONS.map((q) => (
                      <button
                        type="button"
                        key={q}
                        onClick={() => ask(q)}
                        className="px-2.5 py-1 rounded-full bg-amber-50 dark:bg-slate-800 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-slate-700 cursor-pointer"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      ask(chatInput);
                    }}
                    className="flex gap-2"
                  >
                    <input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      maxLength={200}
                      placeholder="Gõ câu hỏi cho Vui-Bot…"
                      className="flex-1 min-w-0 px-3 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                    />
                    <button type="submit" aria-label="Gửi" className="px-3 rounded-2xl bg-blue-600 text-white cursor-pointer">
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                  <p className="text-[11px] text-slate-400">
                    Vui-Bot là trợ lý hướng dẫn của Học Siêu Vui, chưa giải được bài tập cụ thể.
                  </p>
                </div>
              ) : activeTab === 'guide' ? (
                <div className="space-y-3">
                  {onOpenInteractiveGuide && (
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.play('click');
                        setIsOpen(false);
                        onOpenInteractiveGuide();
                      }}
                      className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white flex items-center justify-between gap-3 shadow-md cursor-pointer transition-transform active:scale-[0.99]"
                    >
                      <span className="flex items-center gap-2.5 text-left">
                        <HelpCircle className="w-5 h-5 shrink-0" />
                        <span>
                          <span className="block text-sm font-black">Mở hướng dẫn tương tác Vui-Bot</span>
                          <span className="block text-xs text-blue-100">Xem hướng dẫn từng bước ngay tại khu vực đang mở</span>
                        </span>
                      </span>
                      <ChevronRight className="w-5 h-5 shrink-0" />
                    </button>
                  )}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-850 border border-blue-200 dark:border-slate-700 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    <strong>Học Siêu Vui</strong> là nền tảng học tập kết hợp trò chơi với đầy đủ 14 môn Tiểu học (Lớp 1–5) và 12 môn THCS (Lớp 6–9). Chọn môn học, lớp và bài học hiện có để ôn tập, luyện câu hỏi, khám phá các hoạt động và tích lũy thành tích.
                  </div>
                  {GUIDE_ITEMS.map((g) => (
                    <button
                      type="button"
                      key={g.title}
                      onClick={() => {
                        soundManager.play('click');
                        onNavigateToView(g.view);
                        setIsOpen(false);
                      }}
                      className="w-full text-left p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 flex items-start gap-3 cursor-pointer"
                    >
                      <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${g.tone}`}>
                        <g.Icon className="w-5 h-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-black text-slate-900 dark:text-white">{g.title}</span>
                        <span className="block text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{g.desc}</span>
                        <span className="block text-xs font-bold text-blue-600 mt-0.5">{g.cta} →</span>
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                /* TAB 3: USER FEEDBACK FORM */
                <div className="space-y-4">
                  {isSubmitted ? (
                    <div className="p-8 text-center space-y-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 rounded-3xl animate-fadeIn">
                      <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="text-base font-black text-emerald-900 dark:text-emerald-200">
                        Gửi Phản Hồi Thành Công!
                      </h4>
                      <p className="text-xs text-emerald-700 dark:text-emerald-300 max-w-sm mx-auto leading-relaxed">
                        Cảm ơn bạn! Ý kiến đóng góp của bạn đã được gửi tới quản trị viên để giúp Học Siêu Vui tốt hơn mỗi ngày!
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitFeedback} className="space-y-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Học sinh gửi: <strong>{student.name}</strong> ({student.grade} • {student.school})
                        </span>
                        <span className="text-[10px] text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-full font-bold">
                          Gửi tới Quản trị viên
                        </span>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                          Bạn muốn gửi điều gì?
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: 'suggestion', label: '💡 Ý Tưởng / Góp Ý' },
                            { id: 'bug', label: '🐞 Báo Lỗi Bài Học' },
                            { id: 'compliment', label: '❤️ Lời Khen & Cảm Ơn' },
                            { id: 'question', label: '❓ Câu Hỏi & Thắc Mắc' }
                          ].map((cat) => (
                            <button
                              type="button"
                              key={cat.id}
                              onClick={() => setFeedbackCategory(cat.id as 'suggestion' | 'bug' | 'compliment' | 'question')}
                              className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                                feedbackCategory === cat.id
                                  ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 text-blue-700 dark:text-blue-300 shadow-sm'
                                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                              }`}
                            >
                              {cat.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                          Đánh giá độ vui của ứng dụng:
                        </label>
                        <div className="flex items-center gap-1.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => {
                                soundManager.play('click');
                                setFeedbackRating(star);
                              }}
                              className="p-1 cursor-pointer transition-transform hover:scale-125"
                            >
                              <StarIcon
                                className={`w-6 h-6 ${
                                  star <= feedbackRating
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-slate-300 dark:text-slate-700'
                                }`}
                              />
                            </button>
                          ))}
                          <span className="text-xs font-bold text-amber-500 ml-2">
                            {feedbackRating === 5 ? 'Quá Tuyệt Vời! 🌟' : `${feedbackRating} Sao`}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                          Nội dung chi tiết:
                        </label>
                        <textarea
                          rows={3}
                          value={feedbackMessage}
                          onChange={(e) => setFeedbackMessage(e.target.value)}
                          placeholder="Nhập cảm nghĩ, đề xuất bài toán mới, góp ý giao diện hoặc tính năng bạn mong muốn..."
                          className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
                          required
                        />
                      </div>

                      <p className="text-[11px] text-slate-500">
                        Đừng ghi tên thật, số điện thoại hay email nhé. Góp ý sẽ được gửi tới quản trị viên.
                      </p>
                      {feedbackError && (
                        <div role="alert" className="text-xs text-rose-700 bg-rose-50 p-2 rounded-xl">
                          {feedbackError}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full py-3 px-4 disabled:opacity-60 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                      >
                        <Send className="w-4 h-4" />
                        <span>Gửi Phản Hồi Về Quản Trị Viên</span>
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
