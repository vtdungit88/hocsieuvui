import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { soundManager } from '../utils/audio';
import { AvatarRenderer } from './AvatarRenderer';
import { APP_LOGO_SRC } from '../data/versionHistory';
import {
  BookOpen,
  Sparkles,
  Zap,
  Map,
  Volume2,
  VolumeX,
  IdCard,
  Trophy,
  LogOut,
  ShieldCheck,
  Download,
  Music,
  Users,
  Award
} from 'lucide-react';
import { CoinIcon, StarIcon } from './GameIcons';

export type AppView = 'study' | 'shop' | 'blitz' | 'map' | 'leaderboard' | 'lobby';

interface NavbarProps {
  currentView: AppView;
  onSelectView: (view: AppView) => void;
  student: StudentProfile;
  onOpenProfile: () => void;
  onOpenCard: () => void;
  onOpenLevel?: () => void;
  onLogout?: () => void;
  onOpenAdmin?: () => void;
  onOpenInstallShare?: () => void;
  onlineCount?: number;
  isMuted: boolean;
  onToggleSound: () => void;
  isMusicEnabled: boolean;
  onToggleMusic: () => void;
}

const NAV_ITEMS = [
  { view: 'study', label: 'Bài Học', short: 'Bài Học', Icon: BookOpen, color: 'text-blue-500' },
  { view: 'shop', label: 'Studio', short: 'Studio', Icon: Sparkles, color: 'text-amber-500' },
  { view: 'blitz', label: 'Đấu Trường', short: 'Đấu Trường', Icon: Zap, color: 'text-orange-500' },
  { view: 'map', label: 'Bản Đồ', short: 'Bản Đồ', Icon: Map, color: 'text-emerald-500' },
  { view: 'lobby', label: 'Sảnh Online', short: 'Sảnh', Icon: Users, color: 'text-teal-500' },
  { view: 'leaderboard', label: 'Xếp Hạng', short: 'Xếp Hạng', Icon: Trophy, color: 'text-amber-500' }
] as const;

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSelectView,
  student,
  onOpenProfile,
  onOpenCard,
  onOpenLevel,
  onLogout,
  onOpenAdmin,
  onOpenInstallShare,
  onlineCount,
  isMuted,
  onToggleSound,
  isMusicEnabled,
  onToggleMusic
}) => {
  return (
    <header className="sticky top-0 z-40 pt-[env(safe-area-inset-top)] bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-screen-2xl mx-auto px-2 sm:px-5 min-h-16 flex items-center justify-between gap-1.5 sm:gap-2 md:gap-3 xl:gap-4">
        {/* Zone 1: Brand Wordmark with Mascot Logo */}
        <div
          onClick={() => {
            soundManager.play('click');
            onSelectView('study');
          }}
          className="flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 select-none group"
        >
          <img
            src={APP_LOGO_SRC}
            alt="Học Siêu Vui Mascot Logo"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform shrink-0 border border-blue-200 dark:border-blue-800"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-sm sm:text-base xl:text-lg font-black tracking-tight text-slate-900 dark:text-white leading-none">
              Học Siêu Vui
            </span>
            <span className="hidden sm:block text-[10px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider mt-0.5">
              Vừa Học Vừa Chơi
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links – big, always labelled */}
        <nav aria-label="Điều hướng chính" className="hidden md:flex items-center gap-1 lg:gap-1.5 min-w-0">
          {NAV_ITEMS.map(({ view, label, Icon, color }) => {
            const active = currentView === view;
            return (
              <button
                key={view}
                onClick={() => { soundManager.play('click'); onSelectView(view); }}
                aria-current={active ? 'page' : undefined}
                title={label}
                aria-label={label}
                className={`flex items-center gap-2 whitespace-nowrap shrink-0 rounded-2xl px-3 py-2.5 text-[15px] font-extrabold transition-all cursor-pointer active:scale-95 ${
                  active
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-800 hover:shadow'
                }`}
              >
                <Icon className={`w-6 h-6 shrink-0 ${active ? 'text-white' : color}`} />
                <span className="hidden xl:inline">{label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions, Level, Wallet, Avatar Profile */}
        <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 shrink-0">
          {onlineCount !== undefined && (
            <div
              className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs font-semibold shadow-xs select-none shrink-0"
              title="Số học sinh đang trực tuyến học & chơi"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{onlineCount} bạn online</span>
            </div>
          )}

          {/* Background Music Toggle */}
          <button
            type="button"
            onClick={onToggleMusic}
            aria-pressed={isMusicEnabled && !isMuted}
            aria-label={isMusicEnabled && !isMuted ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
            title={isMusicEnabled && !isMuted ? 'Đang bật nhạc nền theo khu vực (bấm để tắt)' : 'Bật nhạc nền vui nhộn'}
            className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-extrabold transition-all cursor-pointer shrink-0 active:scale-95 ${
              isMusicEnabled && !isMuted
                ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800'
            }`}
          >
            <Music className={`w-3.5 h-3.5 ${isMusicEnabled && !isMuted ? 'text-emerald-600 dark:text-emerald-400' : ''}`} />
            <span className="hidden lg:inline">{isMusicEnabled && !isMuted ? 'Bật nhạc' : 'Tắt nhạc'}</span>
          </button>

          {/* Sound Effects Toggle */}
          <button
            type="button"
            onClick={onToggleSound}
            className="hidden md:inline-flex p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            title={isMuted ? 'Bật tất cả âm thanh' : 'Tắt tất cả âm thanh'}
            aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-rose-500" /> : <Volume2 className="w-5 h-5 text-blue-600" />}
          </button>

          {/* Install & Share App Button */}
          {onOpenInstallShare && (
            <button
              onClick={() => {
                soundManager.play('click');
                onOpenInstallShare();
              }}
              className="hidden sm:flex items-center gap-1 py-1.5 px-2 sm:px-2.5 shrink-0 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-95"
              title="Cài đặt App ra màn hình hoặc chia sẻ Zalo, Facebook"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden 2xl:inline">Cài Đặt App</span>
              <span className="2xl:hidden">App</span>
            </button>
          )}

          {/* Level Badge Button */}
          {onOpenLevel && (
            <button
              onClick={() => {
                soundManager.play('click');
                onOpenLevel();
              }}
              className="hidden sm:inline-flex items-center gap-1 shrink-0 px-2 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-extrabold cursor-pointer transition-colors"
              title="Xem Cấp Độ & Hộ Chiếu Việt Nam"
            >
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Lv.{student.level}</span>
            </button>
          )}

          {/* Quick Wallet preview */}
          <div className="hidden xl:flex items-center gap-1.5 shrink-0 text-xs font-mono font-bold px-2 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
              <CoinIcon className="w-3.5 h-3.5" />
              {student.coins}
            </span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span className="flex items-center gap-1 text-yellow-500 dark:text-yellow-400">
              <StarIcon className="w-3.5 h-3.5 fill-yellow-400" />
              {student.stars}
            </span>
          </div>

          {/* Student ID Card trigger */}
          <button
            onClick={() => {
              soundManager.play('click');
              onOpenCard();
            }}
            className="hidden 2xl:inline-flex p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-colors cursor-pointer shrink-0"
            title="Xem Thẻ Học Sinh"
            aria-label="Thẻ học sinh"
          >
            <IdCard className="w-5 h-5" />
          </button>

          {/* Account menu: profile actions and the admin entry live under the avatar. */}
          <AccountMenu
            student={student}
            onOpenProfile={onOpenProfile}
            onOpenAdmin={onOpenAdmin}
            onLogout={onLogout}
            onOpenCard={onOpenCard}
          />
        </div>
      </div>

      {/* Mobile quick actions: restore music, sound, App, level, and wallet at phone widths without overflowing 320px. */}
      <div className="md:hidden flex items-center justify-center gap-1 min-[360px]:gap-1.5 px-1.5 py-2 bg-slate-50/95 dark:bg-slate-900/95 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={onToggleMusic}
          aria-pressed={isMusicEnabled && !isMuted}
          aria-label={isMusicEnabled && !isMuted ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
          title={isMusicEnabled && !isMuted ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
          className={`inline-flex items-center justify-center gap-1 h-9 px-2 rounded-xl border text-[11px] font-extrabold shrink-0 cursor-pointer ${
            isMusicEnabled && !isMuted
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
          }`}
        >
          <Music className="w-3.5 h-3.5" />
          <span className="hidden min-[360px]:inline">Nhạc</span>
        </button>
        <button
          type="button"
          onClick={onToggleSound}
          aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          className="inline-flex items-center justify-center h-9 w-8 min-[360px]:w-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 shrink-0"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
        </button>
        {onOpenInstallShare && (
          <button onClick={onOpenInstallShare} aria-label="App: cài đặt hoặc chia sẻ" title="App" className="inline-flex items-center justify-center gap-1 h-9 px-2 min-[360px]:px-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-extrabold shrink-0">
            <Download className="w-3.5 h-3.5" />App
          </button>
        )}
        {onOpenLevel && (
          <button onClick={onOpenLevel} aria-label={`Cấp ${student.level}, xem cấp độ`} title="Xem cấp độ" className="inline-flex items-center gap-1 h-9 px-2 min-[360px]:px-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold shrink-0">
            <Award className="w-3.5 h-3.5 text-amber-500" />Lv.{student.level}
          </button>
        )}
        <div aria-label={`${student.coins} Xu, ${student.stars} Sao`} className="flex items-center gap-1 min-[360px]:gap-1.5 h-9 px-2 min-[360px]:px-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold shrink-0">
          <span className="inline-flex items-center gap-0.5 min-[360px]:gap-1 text-amber-600 dark:text-amber-400"><CoinIcon className="w-3.5 h-3.5" />{student.coins}</span>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <span className="inline-flex items-center gap-0.5 min-[360px]:gap-1 text-yellow-500 dark:text-yellow-400"><StarIcon className="w-3.5 h-3.5 fill-yellow-400" />{student.stars}</span>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar for easy thumb navigation */}
      <nav aria-label="Điều hướng nhanh" className="hsv-mobile-nav md:hidden flex items-stretch justify-around border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-1 py-1.5">
        {NAV_ITEMS.map(({ view, short, Icon, color }) => {
          const active = currentView === view;
          return (
            <button
              key={view}
              onClick={() => { soundManager.play('click'); onSelectView(view); }}
              aria-current={active ? 'page' : undefined}
              className={`flex-1 min-w-0 flex flex-col items-center gap-0.5 py-1.5 mx-0.5 rounded-2xl text-[11px] font-extrabold transition-colors ${active ? 'bg-blue-600 text-white shadow' : 'text-slate-600 dark:text-slate-300'}`}
            >
              <Icon className={`w-6 h-6 ${active ? 'text-white' : color}`} />
              <span className="truncate max-w-full">{short}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};


const AccountMenu: React.FC<{
  student: StudentProfile;
  onOpenProfile: () => void;
  onOpenAdmin?: () => void;
  onLogout?: () => void;
  onOpenCard: () => void;
}> = ({ student, onOpenProfile, onOpenAdmin, onLogout, onOpenCard }) => {
  const [open, setOpen] = useState(false);
  const run = (action?: () => void) => {
    setOpen(false);
    if (action) action();
  };
  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => { soundManager.play('click'); setOpen(v => !v); }}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-1.5 sm:gap-2 py-1.5 px-1.5 sm:px-2.5 min-w-0 max-w-full bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-900 rounded-xl text-slate-900 dark:text-white transition-colors cursor-pointer"
        title="Mở menu tài khoản"
      >
        <div className="w-7 h-7 rounded-lg overflow-hidden bg-white dark:bg-slate-800 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800">
          <AvatarRenderer config={student.avatarConfig} size="xs" animated={false} showVehicle={false} showTech={false} showPet={false} />
        </div>
        <div className="text-left min-w-0 max-w-[calc(48vw-48px)] sm:max-w-[92px] 2xl:max-w-[150px]">
          <div className="text-[11px] sm:text-xs font-bold leading-tight truncate">{student.name}</div>
          <div className="text-[9px] sm:text-[10px] text-blue-600 dark:text-blue-400 leading-tight mt-0.5 truncate">
            {student.isGuest ? 'Khách ghé thăm' : `Cấp ${student.level}`}
          </div>
        </div>
      </button>
      {open && (
        <>
          <button aria-label="Đóng menu tài khoản" className="fixed inset-0 z-40 cursor-default" onClick={() => setOpen(false)} />
          <div role="menu" className="absolute right-0 top-full mt-2 z-50 w-56 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl p-2 space-y-1">
            <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
              <div className="font-bold text-sm truncate">{student.name}</div>
              <div className="text-xs text-slate-500">{student.isGuest ? 'Bạn đang dùng chế độ khách' : 'Tài khoản học sinh'}</div>
            </div>
            <button role="menuitem" onClick={() => run(onOpenProfile)} className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 text-sm font-semibold flex items-center gap-2">
              <IdCard className="w-4 h-4 text-blue-600"/>{student.isGuest ? 'Đăng nhập / Đăng ký' : 'Hồ sơ tài khoản'}
            </button>
            <button role="menuitem" onClick={() => run(onOpenCard)} className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 text-sm font-semibold flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500"/>Thẻ học sinh
            </button>
            {onOpenAdmin && (
              <button role="menuitem" onClick={() => run(onOpenAdmin)} className="w-full text-left px-3 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-sm font-extrabold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4"/>Quản trị viên
              </button>
            )}
            {!student.isGuest && onLogout && (
              <button role="menuitem" onClick={() => run(onLogout)} className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 text-sm font-bold flex items-center gap-2">
                <LogOut className="w-4 h-4"/>Đăng xuất
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
