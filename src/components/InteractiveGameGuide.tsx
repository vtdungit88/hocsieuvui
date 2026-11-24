import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Compass,
  Gamepad2,
  Map,
  MapPin,
  SkipForward,
  Sparkles,
  Trophy,
  Users,
  X,
  Zap
} from 'lucide-react';
import { soundManager } from '../utils/audio';
import { VuiBotMascot, type VuiBotMotion } from './VuiBotMascot';
import { VUIBOT_EXPRESSION_LABELS, type VuiBotExpression } from '../data/vuibotMascot';

export type GuideView = 'study' | 'shop' | 'blitz' | 'map' | 'leaderboard' | 'lobby';

export const GUIDE_DISABLED_KEY = 'hsv_guide_disabled';

interface GuideStep {
  label: string;
  text: string;
  expression: VuiBotExpression;
  motion: VuiBotMotion;
}

interface AreaGuide {
  title: string;
  intro: string;
  badge: string;
  icon: React.ElementType;
  color: string;
  steps: GuideStep[];
}

const HOME_HIGHLIGHTS: {
  title: string;
  desc: string;
  view: GuideView;
  Icon: React.ElementType;
  tone: string;
}[] = [
  {
    title: 'Học bài thật vui',
    desc: 'Khám phá kiến thức SGK qua các bài tập & trò chơi hấp dẫn!',
    view: 'study',
    Icon: BookOpen,
    tone: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
  },
  {
    title: 'Chơi game trí tuệ',
    desc: 'Rèn luyện tư duy, trang trí nhân vật và nhận thưởng mỗi ngày!',
    view: 'shop',
    Icon: Gamepad2,
    tone: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
  },
  {
    title: 'Tham gia đấu trường',
    desc: 'So tài Siêu Tốc, 1v1 và Phòng Lớp Học để chinh phục đỉnh cao!',
    view: 'blitz',
    Icon: Trophy,
    tone: 'bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300'
  },
  {
    title: 'Khám phá thế giới',
    desc: 'Vượt bản đồ ải, du hành địa danh và sưu tập huy hiệu!',
    view: 'map',
    Icon: MapPin,
    tone: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
  }
];

const GUIDE: Record<GuideView, AreaGuide> = {
  study: {
    title: 'Mình là Vui-Bot!',
    intro: 'Chào mừng bạn đến Học Siêu Vui — hãy cùng mình chọn môn, luyện tập và gom thật nhiều Xu & Sao nhé!',
    badge: 'TRANG CHỦ · HỌC TẬP',
    icon: BookOpen,
    color: 'from-blue-600 to-cyan-500',
    steps: [
      {
        label: 'Chào mừng & làm quen',
        text: 'Chọn môn học và khối lớp (Lớp 1–9) ở ngay trang chủ để xem danh sách chương và bài học theo SGK.',
        expression: 'happy',
        motion: 'wave'
      },
      {
        label: 'Cách làm bài thông minh',
        text: 'Đọc kỹ đề và công thức minh họa. Nếu gặp câu khó, đừng vội — hãy đọc lời giải chi tiết sau mỗi câu nhé!',
        expression: 'thinking',
        motion: 'float'
      },
      {
        label: 'Phần thưởng bất ngờ',
        text: 'Mỗi câu trả lời đúng sẽ tặng Xu và XP; đạt 1–3 Sao để mở khóa trang phục tại Studio và leo bảng vàng!',
        expression: 'surprised',
        motion: 'float'
      },
      {
        label: 'Sẵn sàng xuất phát',
        text: 'Mình luôn đứng ở góc màn hình để gợi ý bài học, nhắc nhiệm vụ và cổ vũ bạn mỗi ngày. Bắt đầu thôi!',
        expression: 'cheer',
        motion: 'cheer'
      }
    ]
  },
  shop: {
    title: 'Chào mừng đến Studio!',
    intro: 'Đây là nơi bạn sáng tạo phong cách riêng cho nhân vật với tóc, trang phục, hậu cảnh và thú cưng.',
    badge: 'STUDIO NHÂN VẬT',
    icon: Sparkles,
    color: 'from-amber-500 to-orange-500',
    steps: [
      {
        label: 'Thử đồ tự do',
        text: 'Chọn nhóm Tóc, Áo, Quần, Phụ kiện hoặc Thú cưng ở thanh danh mục và chạm vào món đồ để ướm thử ngay.',
        expression: 'guiding',
        motion: 'float'
      },
      {
        label: 'Mở rương bất ngờ',
        text: 'Ồ! Bạn có thể dùng Xu hoặc Sao tích lũy để mở khóa vật phẩm mới và lưu diện mạo trên tài khoản.',
        expression: 'surprised',
        motion: 'wave'
      },
      {
        label: 'Tỏa sáng ở mọi khu vực',
        text: 'Nhấn trang bị xong là nhân vật của bạn sẽ xuất hiện cực ngầu ở Trang chủ, Sảnh Online và Đấu Trường!',
        expression: 'cheer',
        motion: 'cheer'
      }
    ]
  },
  blitz: {
    title: 'Sẵn sàng vào Đấu Trường?',
    intro: 'Thử thách phản xạ và kiến thức qua Siêu Tốc, Đấu 1v1 và Phòng Lớp Học dùng mã PIN.',
    badge: 'ĐẤU TRƯỜNG TRÍ TUỆ',
    icon: Zap,
    color: 'from-orange-500 to-rose-500',
    steps: [
      {
        label: 'Chọn chế độ thi đấu',
        text: 'Thử Siêu Tốc 60 giây (Lớp 1–2 được 90 giây), Thách Đấu 1v1 tính Elo hoặc nhập PIN Phòng Lớp Học.',
        expression: 'guiding',
        motion: 'float'
      },
      {
        label: 'Giữ bình tĩnh & chính xác',
        text: 'Nhẩm nhanh nhưng cẩn thận câu bẫy! Ở chế độ 1v1 Lớp 3–9, bạn còn có thẻ trợ lực 50/50 nữa đó.',
        expression: 'thinking',
        motion: 'float'
      },
      {
        label: 'Chinh phục bảng xếp hạng',
        text: 'Chuỗi trả lời đúng liên tiếp nhân đôi điểm số — cố lên, Vui-Bot luôn cổ vũ hết mình cho bạn!',
        expression: 'cheer',
        motion: 'cheer'
      }
    ]
  },
  map: {
    title: 'Khám phá Bản Đồ Phiêu Lưu!',
    intro: 'Mỗi chương học là một hòn đảo kho báu đang chờ bạn chinh phục từng chặng.',
    badge: 'BẢN ĐỒ ẢI',
    icon: Map,
    color: 'from-emerald-600 to-teal-500',
    steps: [
      {
        label: 'Chọn hòn đảo xuất phát',
        text: 'Kiểm tra môn học và khối lớp trên thanh đầu bản đồ, rồi chạm vào hòn đảo đang sáng để vào ải.',
        expression: 'guiding',
        motion: 'float'
      },
      {
        label: 'Chiến thuật mở khóa ải mới',
        text: 'Đạt từ 1 Sao trở lên để mở đường sang đảo kế tiếp; giữa chặng có rương quà và cuối đường là Trùm Cuối!',
        expression: 'surprised',
        motion: 'wave'
      },
      {
        label: 'Thu thập trọn bộ 3 Sao',
        text: 'Bạn có thể chơi lại bất kỳ ải nào để đạt đủ 3 Sao và ghi tên vào Top 10 Bản Đồ. Cố lên nhé!',
        expression: 'cheer',
        motion: 'cheer'
      }
    ]
  },
  lobby: {
    title: 'Chào mừng đến Sảnh Online!',
    intro: 'Gặp gỡ bạn bè trực tuyến, trả lời đố vui cùng Vui-Bot và Du Hành Xuyên Việt qua 10 địa danh 3D.',
    badge: 'SẢNH ONLINE & DU HÀNH',
    icon: Users,
    color: 'from-teal-600 to-cyan-500',
    steps: [
      {
        label: 'Di chuyển quanh sân',
        text: 'Chạm hoặc vuốt ngón tay trên sân (hoặc dùng phím WASD / mũi tên) để dạo bước và trò chuyện cùng bạn bè.',
        expression: 'happy',
        motion: 'wave'
      },
      {
        label: 'Đố vui mỗi ngày với Vui-Bot',
        text: 'Tìm ki-ốt Vui-Bot ở góc sân để trả lời câu đố địa danh — trả lời đúng nhận ngay +3 Xu & +10 XP mỗi ngày!',
        expression: 'surprised',
        motion: 'float'
      },
      {
        label: 'Khám phá bản đồ Việt Nam',
        text: 'Mở mục Du Hành để đi thăm Hà Nội, Hạ Long, Huế, TP.HCM, Phú Quốc và sưu tầm trọn bộ dấu hộ chiếu!',
        expression: 'guiding',
        motion: 'cheer'
      }
    ]
  },
  leaderboard: {
    title: 'Cùng xem Bảng Xếp Hạng!',
    intro: 'Theo dõi thứ hạng Sao, Xu, Elo và đặt mục tiêu vượt qua cột mốc tiếp theo mỗi ngày.',
    badge: 'BẢNG VÀNG VINH DANH',
    icon: Trophy,
    color: 'from-amber-500 to-yellow-500',
    steps: [
      {
        label: 'So sánh thành tích',
        text: 'Xem thứ hạng toàn hệ thống và kiểm tra xem bạn đang đứng ở vị trí nào trên Bảng Vàng.',
        expression: 'thinking',
        motion: 'float'
      },
      {
        label: 'Bí quyết thăng hạng nhanh',
        text: 'Hoàn thành đều mỗi ngày 1 bài học + 1 lượt Đấu Trường sẽ giúp Sao và XP tăng cực ổn định!',
        expression: 'cheer',
        motion: 'cheer'
      }
    ]
  }
};

interface Props {
  view: GuideView;
  open: boolean;
  onClose: (dontShowAgain?: boolean) => void;
  onNavigate: (view: GuideView) => void;
}

export const InteractiveGameGuide: React.FC<Props> = ({ view, open, onClose, onNavigate }) => {
  const [step, setStep] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(() => {
    try {
      return localStorage.getItem(GUIDE_DISABLED_KEY) === '1';
    } catch {
      return false;
    }
  });

  const guide = GUIDE[view];
  const currentStep = guide.steps[step] ?? guide.steps[0];
  const Icon = guide.icon;
  const isHomeOverview = view === 'study' && step === 0;

  useEffect(() => {
    if (open) setStep(0);
  }, [open, view]);

  if (!open) return null;

  const handleClose = (persistOptOut = dontShowAgain) => {
    onClose(persistOptOut);
  };

  return (
    <div
      className="fixed inset-0 z-[90] bg-slate-950/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Hướng dẫn tương tác Vui-Bot"
    >
      <div className="relative w-full max-w-4xl overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem] bg-white dark:bg-slate-900 shadow-2xl border border-blue-200/70 dark:border-slate-700 max-h-[92svh] overflow-y-auto">
        <div className={`h-2 w-full bg-gradient-to-r ${guide.color}`} />

        <button
          type="button"
          onClick={() => {
            soundManager.play('click');
            handleClose();
          }}
          className="absolute right-3.5 top-4 z-20 w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center justify-center cursor-pointer transition-transform active:scale-95"
          aria-label="Đóng hướng dẫn"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-[0.82fr_1.18fr] items-center gap-4 sm:gap-6 p-5 sm:p-8 pt-7">
          {/* Left: Unified Vui-Bot Stage */}
          <div className="relative flex flex-col items-center justify-center rounded-3xl bg-gradient-to-b from-sky-50 via-blue-50/80 to-indigo-50 dark:from-slate-800/80 dark:via-slate-800/60 dark:to-slate-900 border border-blue-100 dark:border-slate-700/80 p-4 sm:p-6 min-h-[210px] md:min-h-[360px] overflow-hidden">
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-gradient-to-br ${guide.color} opacity-20 blur-2xl`}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-10 w-36 h-6 rounded-full bg-blue-900/15 dark:bg-black/40 blur-md"
            />
            <VuiBotMascot
              expression={currentStep.expression}
              motion={currentStep.motion}
              className="relative z-10 w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64"
              alt={`Vui-Bot – ${VUIBOT_EXPRESSION_LABELS[currentStep.expression]}`}
            />
            <div className="relative z-10 mt-2 inline-flex items-center gap-1.5 rounded-xl bg-white/95 dark:bg-slate-900/90 border border-blue-200 dark:border-slate-700 px-3 py-1 text-xs font-extrabold text-blue-700 dark:text-cyan-300 shadow-sm">
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              <span>Vui-Bot · {VUIBOT_EXPRESSION_LABELS[currentStep.expression]}</span>
            </div>
          </div>

          {/* Right: Interactive Guide Card */}
          <div className="space-y-4 min-w-0">
            <div className="flex flex-wrap items-center gap-2 pr-8">
              <span className={`inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r ${guide.color} text-white px-3 py-1 text-xs font-black shadow-sm`}>
                <Icon className="w-3.5 h-3.5" />
                {guide.badge}
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Bước {step + 1}/{guide.steps.length}
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                {guide.title}
              </h2>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {guide.intro}
              </p>
            </div>

            {isHomeOverview && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {HOME_HIGHLIGHTS.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => {
                      soundManager.play('click');
                      if (item.view === 'study') {
                        setStep(1);
                      } else {
                        onNavigate(item.view);
                      }
                    }}
                    className="flex items-start gap-2.5 text-left rounded-2xl border border-slate-200 dark:border-slate-700/90 bg-slate-50/90 dark:bg-slate-800/70 hover:border-blue-400 dark:hover:border-cyan-500 p-2.5 transition-colors cursor-pointer"
                  >
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.tone}`}>
                      <item.Icon className="w-4 h-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-black text-slate-900 dark:text-white leading-snug">
                        {item.title}
                      </span>
                      <span className="block text-[11px] text-slate-600 dark:text-slate-300 leading-snug mt-0.5">
                        {item.desc}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            )}

            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/80 p-4 border border-slate-200 dark:border-slate-700">
              <div className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-cyan-400 mb-1">
                {currentStep.label}
              </div>
              <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100 leading-relaxed">
                {currentStep.text}
              </p>
              <div className="flex gap-1.5 mt-3.5" aria-hidden="true">
                {guide.steps.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      i <= step ? 'bg-blue-600 dark:bg-cyan-400' : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.play('click');
                    setStep((s) => Math.max(0, s - 1));
                  }}
                  className="inline-flex items-center justify-center gap-1 rounded-xl border border-slate-300 dark:border-slate-700 px-3.5 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Trước
                </button>
              )}

              {step < guide.steps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.play('click');
                    setStep((s) => s + 1);
                  }}
                  className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-slate-950 px-5 py-2.5 font-black text-sm shadow-md cursor-pointer transition-transform active:scale-95"
                >
                  <span>{isHomeOverview ? 'Xem hướng dẫn chi tiết' : 'Tiếp theo'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.play('fanfare');
                    handleClose();
                  }}
                  className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-5 py-2.5 font-black text-sm shadow-md cursor-pointer transition-transform active:scale-95"
                >
                  <span>Bắt đầu khám phá ngay!</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  soundManager.play('click');
                  handleClose();
                }}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 dark:border-slate-700 px-3.5 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <SkipForward className="w-4 h-4" />
                <span>Bỏ qua</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
              <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setDontShowAgain(checked);
                    try {
                      if (checked) localStorage.setItem(GUIDE_DISABLED_KEY, '1');
                      else localStorage.removeItem(GUIDE_DISABLED_KEY);
                    } catch {
                      /* storage optional */
                    }
                  }}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Không hiển thị hướng dẫn tự động này nữa</span>
              </label>

              <button
                type="button"
                onClick={() => {
                  soundManager.play('click');
                  onNavigate(view === 'study' ? 'map' : view === 'map' ? 'blitz' : view === 'blitz' ? 'lobby' : 'study');
                }}
                className="text-xs text-blue-600 dark:text-cyan-400 font-bold hover:underline cursor-pointer"
              >
                Chuyển nhanh khu vực khác →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
