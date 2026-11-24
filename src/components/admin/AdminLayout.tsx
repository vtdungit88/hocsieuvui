import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpenCheck,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Menu,
  MessageSquareWarning,
  MessagesSquare,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Users,
  X
} from 'lucide-react';
import type { AdminTab } from './types';

interface AdminLayoutProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onClose: () => void;
  onRefresh: () => void;
  refreshing?: boolean;
  fullPage?: boolean;
  globalSearch: string;
  onGlobalSearchChange: (value: string) => void;
  badges?: {
    feedbackOpen?: number;
    reportsOpen?: number;
    realStudents?: number;
  };
  children: React.ReactNode;
}

const NAV_ITEMS: {
  id: AdminTab;
  label: string;
  subtitle: string;
  Icon: React.ComponentType<{ className?: string }>;
  group: 'main' | 'system';
}[] = [
  { id: 'overview', label: 'Tổng quan', subtitle: 'KPI & phân tích hệ thống', Icon: LayoutDashboard, group: 'main' },
  { id: 'students', label: 'Học sinh', subtitle: 'Thật vs Test · Hoạt động', Icon: Users, group: 'main' },
  { id: 'feedback', label: 'Góp ý', subtitle: 'Phiếu báo lỗi & đề xuất', Icon: MessagesSquare, group: 'main' },
  { id: 'reports', label: 'Sảnh trò chuyện', subtitle: 'Kiểm duyệt báo cáo chat', Icon: MessageSquareWarning, group: 'main' },
  { id: 'questions', label: 'Ngân hàng câu hỏi', subtitle: 'Môn · Lớp · Chương · Bài', Icon: BookOpenCheck, group: 'main' },
  { id: 'settings', label: 'Cấu hình hệ thống', subtitle: 'Phân quyền & Nhật ký', Icon: Settings, group: 'system' }
];

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  onSelectTab,
  onClose,
  onRefresh,
  refreshing = false,
  fullPage = false,
  globalSearch,
  onGlobalSearchChange,
  badges,
  children
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentMeta = NAV_ITEMS.find((n) => n.id === activeTab) ?? NAV_ITEMS[0];

  const badgeFor = (id: AdminTab): number | undefined => {
    if (id === 'feedback' && (badges?.feedbackOpen ?? 0) > 0) return badges?.feedbackOpen;
    if (id === 'reports' && (badges?.reportsOpen ?? 0) > 0) return badges?.reportsOpen;
    return undefined;
  };

  const renderSidebarContent = (isDrawer: boolean) => {
    const isCompact = collapsed && !isDrawer;
    return (
      <div className="flex h-full flex-col bg-slate-900 text-slate-100 border-r border-slate-800 select-none">
        {/* Brand */}
        <div className={`h-16 flex items-center border-b border-slate-800 px-3.5 ${isCompact ? 'justify-center' : 'justify-between gap-2'}`}>
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            {!isCompact && (
              <div className="min-w-0">
                <div className="text-sm font-bold tracking-tight text-white truncate">HỌC SIÊU VUI</div>
                <div className="text-[11px] font-medium text-slate-400 truncate">Admin Console</div>
              </div>
            )}
          </div>
          {isDrawer ? (
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              aria-label="Đóng menu"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCollapsed((v) => !v)}
              className="hidden lg:inline-flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              title={collapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
              aria-label={collapsed ? 'Mở rộng menu' : 'Thu gọn menu'}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Navigation groups */}
        <nav className="flex-1 overflow-y-auto px-2.5 py-4 space-y-5" aria-label="Menu quản trị">
          <div className="space-y-1">
            {!isCompact && (
              <div className="px-2.5 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Quản trị nghiệp vụ
              </div>
            )}
            {NAV_ITEMS.filter((i) => i.group === 'main').map(({ id, label, Icon }) => {
              const active = activeTab === id;
              const badge = badgeFor(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    onSelectTab(id);
                    setMobileOpen(false);
                  }}
                  title={isCompact ? label : undefined}
                  className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  } ${isCompact ? 'justify-center px-2' : ''}`}
                >
                  <Icon className="w-[18px] h-[18px] shrink-0" />
                  {!isCompact && <span className="flex-1 text-left truncate">{label}</span>}
                  {!isCompact && badge !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${active ? 'bg-white/20 text-white' : 'bg-rose-500/20 text-rose-300'}`}>
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-1">
            {!isCompact && (
              <div className="px-2.5 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Hệ thống
              </div>
            )}
            {NAV_ITEMS.filter((i) => i.group === 'system').map(({ id, label, Icon }) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    onSelectTab(id);
                    setMobileOpen(false);
                  }}
                  title={isCompact ? label : undefined}
                  className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  } ${isCompact ? 'justify-center px-2' : ''}`}
                >
                  <Icon className="w-[18px] h-[18px] shrink-0" />
                  {!isCompact && <span className="flex-1 text-left truncate">{label}</span>}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Bottom Exit Action */}
        <div className="p-2.5 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            title={isCompact ? 'Quay lại Học Siêu Vui' : undefined}
            className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer ${
              isCompact ? 'justify-center px-2' : ''
            }`}
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            {!isCompact && <span className="truncate">Quay lại Học Siêu Vui</span>}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      className={
        fullPage
          ? 'min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex'
          : 'fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4'
      }
      role={fullPage ? 'application' : 'dialog'}
      aria-modal={fullPage ? undefined : true}
    >
      <div
        className={
          fullPage
            ? 'flex w-full min-h-screen'
            : 'flex w-full max-w-[1440px] h-[94vh] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 shadow-2xl'
        }
      >
        {/* Desktop Persistent Sidebar */}
        <aside className={`hidden lg:block shrink-0 transition-all duration-200 ${collapsed ? 'w-[72px]' : 'w-64'}`}>
          <div className={fullPage ? 'sticky top-0 h-screen' : 'h-full'}>{renderSidebarContent(false)}</div>
        </aside>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div className="w-72 max-w-[85vw] h-full shadow-2xl">{renderSidebarContent(true)}</div>
            <div className="flex-1 bg-slate-950/60" onClick={() => setMobileOpen(false)} />
          </div>
        )}

        {/* Main Workspace */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Top Sticky Header */}
          <header className="sticky top-0 z-30 h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-3 sm:px-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                aria-label="Mở menu quản trị"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">{currentMeta.label}</h1>
                <p className="hidden sm:block text-xs text-slate-500 dark:text-slate-400 truncate">{currentMeta.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative hidden md:block w-64 lg:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  value={globalSearch}
                  onChange={(e) => onGlobalSearchChange(e.target.value)}
                  placeholder="Tìm nhanh trong mục đang mở…"
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="button"
                onClick={onRefresh}
                disabled={refreshing}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 cursor-pointer disabled:opacity-60"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Làm mới</span>
              </button>

              {!fullPage && (
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
                  aria-label="Đóng quản trị"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </header>

          {/* Active Page Content */}
          <main className="flex-1 overflow-y-auto p-3 sm:p-6">
            <div className="max-w-[1400px] mx-auto space-y-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};
