import React, { useEffect, useState } from 'react';
import { BookOpen, ChevronRight, Map, SkipForward, Sparkles, Trophy, Users, X, Zap } from 'lucide-react';
import { soundManager } from '../utils/audio';

type GuideView = 'study' | 'shop' | 'blitz' | 'map' | 'leaderboard' | 'lobby';
const GUIDE: Record<GuideView, { title: string; intro: string; steps: string[]; icon: React.ElementType; color: string }> = {
  study: { title: 'Cùng học thật vui nhé!', intro: 'Mình sẽ chỉ bạn cách chọn môn, chọn lớp và bắt đầu một bài học.', steps: ['Chọn môn học mà bạn muốn khám phá.', 'Chọn lớp của mình để xem các chương và bài học.', 'Chọn một bài rồi nhấn Bắt đầu để luyện tập, tích lũy Sao và Xu.'], icon: BookOpen, color: 'from-blue-500 to-cyan-400' },
  shop: { title: 'Chào mừng đến Studio!', intro: 'Đây là nơi bạn sáng tạo phong cách riêng cho nhân vật.', steps: ['Chọn nhóm tóc, áo, quần hoặc phụ kiện.', 'Chạm món đồ để thử lên nhân vật.', 'Nhấn trang bị để lưu diện mạo mới của bạn.'], icon: Sparkles, color: 'from-amber-500 to-orange-400' },
  blitz: { title: 'Sẵn sàng vào đấu trường?', intro: 'Thử phản xạ và kiến thức qua những thử thách vui nhộn.', steps: ['Chọn chế độ chơi phù hợp.', 'Đọc kỹ luật và thời gian của thử thách.', 'Trả lời thật chính xác để tích lũy điểm và nâng hạng.'], icon: Zap, color: 'from-orange-500 to-rose-400' },
  map: { title: 'Khám phá bản đồ phiêu lưu!', intro: 'Mỗi hòn đảo là một chặng học tập đang chờ bạn chinh phục.', steps: ['Chọn hòn đảo hoặc chương muốn khám phá.', 'Chạm vào một ải đang mở để xem nhiệm vụ.', 'Hoàn thành bài thử thách để nhận Sao và mở khóa hành trình tiếp theo.'], icon: Map, color: 'from-emerald-500 to-teal-400' },
  lobby: { title: 'Chào mừng đến Sảnh Online!', intro: 'Gặp gỡ bạn bè, trò chuyện và cùng khám phá các địa danh Việt Nam.', steps: ['Chạm vào sân để di chuyển nhân vật và gặp bạn bè.', 'Chọn Vui-Bot để chơi câu đố vui.', 'Mở Du Hành để khám phá địa danh và vào Studio để thay đồ.'], icon: Users, color: 'from-teal-500 to-cyan-400' },
  leaderboard: { title: 'Cùng xem bảng xếp hạng!', intro: 'Theo dõi thành tích và cố gắng chinh phục những cột mốc mới.', steps: ['Xem thứ hạng và thành tích của các bạn.', 'Tích lũy Sao qua các bài học và thử thách.', 'Quay lại học tập, luyện tập đều đặn để tiến bộ mỗi ngày.'], icon: Trophy, color: 'from-yellow-500 to-amber-400' }
};

interface Props { view: GuideView; open: boolean; onClose: () => void; onNavigate: (view: GuideView) => void; }
export const InteractiveGameGuide: React.FC<Props> = ({ view, open, onClose, onNavigate }) => {
  const [step, setStep] = useState(0);
  const guide = GUIDE[view];
  const Icon = guide.icon;
  useEffect(() => { if (open) setStep(0); }, [open, view]);
  if (!open) return null;
  return <div className="fixed inset-0 z-[90] bg-slate-950/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-label="Hướng dẫn khu vực">
    <div className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] bg-white dark:bg-slate-900 shadow-2xl border border-white/30">
      <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${guide.color}`} />
      <button onClick={onClose} className="absolute right-3 top-3 z-10 rounded-full bg-slate-100 dark:bg-slate-800 p-2 text-slate-500 hover:text-slate-900" aria-label="Đóng hướng dẫn"><X className="w-5 h-5"/></button>
      <div className="grid md:grid-cols-[.85fr_1.15fr] items-center gap-3 p-5 sm:p-8 pt-10">
        <div className="relative flex items-center justify-center min-h-[210px] md:min-h-[320px]">
          <div className={`absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br ${guide.color} opacity-20 animate-pulse`}/>
          <img src={`${import.meta.env.BASE_URL}assets/icons/mascot-full.webp`} alt="Bé Siêu Vui" className="relative z-10 max-h-[260px] md:max-h-[330px] w-auto object-contain drop-shadow-2xl animate-[guideFloat_3s_ease-in-out_infinite]" onError={(e) => { e.currentTarget.src = `${import.meta.env.BASE_URL}assets/icons/mascot-face.webp`; }}/>
          <span className="absolute bottom-2 rounded-full bg-white dark:bg-slate-800 border px-3 py-1 text-xs font-black shadow">Bé Siêu Vui hướng dẫn</span>
        </div>
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 px-3 py-1.5 text-xs font-black"><Icon className="w-4 h-4"/> HƯỚNG DẪN KHU VỰC</div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{guide.title}</h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">{guide.intro}</p>
          <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/80 p-4 border border-slate-200 dark:border-slate-700 min-h-[116px]">
            <div className="text-xs font-black text-blue-600 dark:text-blue-300 mb-2">BƯỚC {step + 1}/{guide.steps.length}</div>
            <p className="font-bold text-slate-800 dark:text-slate-100">{guide.steps[step]}</p>
            <div className="flex gap-1.5 mt-4">{guide.steps.map((_, i) => <span key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-blue-500' : 'bg-slate-200 dark:bg-slate-700'}`}/>)}</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {step < guide.steps.length - 1 ? <button onClick={() => { soundManager.play('click'); setStep(s => s + 1); }} className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 font-black text-sm">Tiếp theo <ChevronRight className="w-4 h-4"/></button> : <button onClick={() => { soundManager.play('fanfare'); onClose(); }} className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 font-black text-sm">Bắt đầu khám phá!</button>}
            <button onClick={() => { soundManager.play('click'); onClose(); }} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-300"><SkipForward className="w-4 h-4"/> Bỏ qua</button>
          </div>
          <button onClick={() => onNavigate(view === 'study' ? 'map' : view === 'map' ? 'shop' : 'study')} className="text-xs text-blue-600 dark:text-blue-300 font-bold hover:underline">Khám phá nhanh khu vực khác</button>
        </div>
      </div>
    </div>
  </div>;
};
