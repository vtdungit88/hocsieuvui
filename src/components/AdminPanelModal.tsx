import React, { useCallback, useEffect, useState } from 'react';
import { fetchAdminDashboard, type AdminDashboardData } from '../lib/adminApi';
import { AdminLayout } from './admin/AdminLayout';
import { DashboardSection } from './admin/DashboardSection';
import { StudentsSection } from './admin/StudentsSection';
import { FeedbackSection } from './admin/FeedbackSection';
import { ChatReportsSection } from './admin/ChatReportsSection';
import { QuestionBankSection } from './admin/QuestionBankSection';
import { SettingsSection } from './admin/SettingsSection';
import type { AdminNavFilterHint, AdminTab } from './admin/types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  fullPage?: boolean;
}

/** Modular Admin Console v2 backed by platform_admin-gated Supabase RPCs. */
export const AdminPanelModal: React.FC<Props> = ({ isOpen, onClose, fullPage = false }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [filterHint, setFilterHint] = useState<AdminNavFilterHint>({});
  const [globalSearch, setGlobalSearch] = useState('');
  const [days, setDays] = useState(14);
  const [refreshSignal, setRefreshSignal] = useState(0);

  const [dashboard, setDashboard] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAdminDashboard(days);
      setDashboard(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Không tải được dữ liệu quản trị');
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => {
    if (isOpen) void loadDashboard();
  }, [isOpen, loadDashboard]);

  if (!isOpen) return null;

  const handleNavigate = (tab: AdminTab, hint?: AdminNavFilterHint) => {
    setFilterHint(hint ?? {});
    setActiveTab(tab);
  };

  const handleRefresh = () => {
    setRefreshSignal((s) => s + 1);
    void loadDashboard();
  };

  return (
    <AdminLayout
      activeTab={activeTab}
      onSelectTab={(tab) => {
        setFilterHint({});
        setActiveTab(tab);
      }}
      onClose={onClose}
      onRefresh={handleRefresh}
      refreshing={loading}
      fullPage={fullPage}
      globalSearch={globalSearch}
      onGlobalSearchChange={setGlobalSearch}
      badges={{
        feedbackOpen: dashboard?.kpis.feedback_open ?? 0,
        reportsOpen: dashboard?.kpis.lobby_reports_open ?? 0,
        realStudents: dashboard?.kpis.real_users ?? 0
      }}
    >
      {error && (
        <div role="alert" className="rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 p-3 text-sm flex flex-wrap items-center justify-between gap-2">
          <span>{error}</span>
          <button
            type="button"
            onClick={handleRefresh}
            className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer"
          >
            Thử lại
          </button>
        </div>
      )}

      {activeTab === 'overview' && (
        <DashboardSection
          data={dashboard}
          loading={loading}
          days={days}
          onChangeDays={(d) => setDays(d)}
          onNavigate={handleNavigate}
        />
      )}

      {activeTab === 'students' && (
        <StudentsSection
          initialFilter={filterHint.studentFilter ?? 'all'}
          globalSearch={globalSearch}
          refreshSignal={refreshSignal}
        />
      )}

      {activeTab === 'feedback' && (
        <FeedbackSection
          initialStatus={filterHint.feedbackStatus ?? 'all'}
          globalSearch={globalSearch}
          refreshSignal={refreshSignal}
        />
      )}

      {activeTab === 'reports' && (
        <ChatReportsSection
          initialStatus={filterHint.reportStatus ?? 'open'}
          globalSearch={globalSearch}
          refreshSignal={refreshSignal}
        />
      )}

      {activeTab === 'questions' && (
        <QuestionBankSection
          initialAudit={filterHint.questionAudit ?? null}
          globalSearch={globalSearch}
          refreshSignal={refreshSignal}
        />
      )}

      {activeTab === 'settings' && <SettingsSection refreshSignal={refreshSignal} />}
    </AdminLayout>
  );
};
