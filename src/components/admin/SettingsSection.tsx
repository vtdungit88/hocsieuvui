import React, { useCallback, useEffect, useState } from 'react';
import { History, Loader2, Save, Settings, ShieldCheck, Trash2, UserPlus } from 'lucide-react';
import {
  fetchAdminSettingsBundle,
  grantOrRevokeAdminRole,
  updateAdminSystemSetting,
  type AdminSettingsBundle
} from '../../lib/adminApi';

interface SettingsSectionProps {
  refreshSignal?: number;
}

const SETTING_LABELS: Record<string, { title: string; desc: string }> = {
  game_config: {
    title: 'Cấu hình trò chơi & phần thưởng',
    desc: 'Giới hạn Xu ngày, thời lượng Đấu Trường Blitz, số câu 1v1 và XP mặc định.'
  },
  leaderboard_config: {
    title: 'Cấu hình Bảng xếp hạng',
    desc: 'Hiển thị công khai, tự động ẩn tài khoản test và ngưỡng sao tối thiểu.'
  },
  lobby_moderation: {
    title: 'Cấu hình Sảnh Trò Chuyện',
    desc: 'Số báo cáo tự động ẩn tin, thời gian giãn cách chat và chế độ chat tự do.'
  },
  maintenance_mode: {
    title: 'Trạng thái bảo trì & vận hành',
    desc: 'Bật/tắt thông báo bảo trì hệ thống khi nâng cấp cơ sở dữ liệu.'
  }
};

export const SettingsSection: React.FC<SettingsSectionProps> = ({ refreshSignal = 0 }) => {
  const [subTab, setSubTab] = useState<'config' | 'roles' | 'logs'>('config');
  const [bundle, setBundle] = useState<AdminSettingsBundle | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Editable JSON drafts per setting_key
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [savingKey, setSavingKey] = useState<string | null>(null);

  // Role management
  const [roleAlias, setRoleAlias] = useState('');
  const [roleType, setRoleType] = useState('content_admin');
  const [roleBusy, setRoleBusy] = useState(false);
  const [confirmRevokeKey, setConfirmRevokeKey] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetchAdminSettingsBundle(80);
      setBundle(res);
      const nextDrafts: Record<string, string> = {};
      for (const s of res.settings) {
        nextDrafts[s.setting_key] = JSON.stringify(s.setting_value, null, 2);
      }
      setDrafts(nextDrafts);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Không tải được cấu hình hệ thống');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load, refreshSignal]);

  const handleSaveSetting = async (key: string) => {
    setSavingKey(key);
    setError('');
    setMessage('');
    try {
      const parsed = JSON.parse(drafts[key] ?? '{}');
      await updateAdminSystemSetting(key, parsed);
      setMessage(`Đã lưu cấu hình "${SETTING_LABELS[key]?.title ?? key}".`);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'JSON cấu hình không hợp lệ');
    } finally {
      setSavingKey(null);
    }
  };

  const handleGrantRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleAlias.trim()) return;
    setRoleBusy(true);
    setError('');
    setMessage('');
    try {
      await grantOrRevokeAdminRole(roleAlias.trim(), roleType, false);
      setRoleAlias('');
      setMessage('Đã cấp quyền quản trị.');
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không cấp được quyền');
    } finally {
      setRoleBusy(false);
    }
  };

  const handleRevokeRole = async (alias: string, role: string) => {
    setConfirmRevokeKey(null);
    setRoleBusy(true);
    setError('');
    try {
      await grantOrRevokeAdminRole(alias, role, true);
      setMessage(`Đã thu hồi quyền ${role} của ${alias}.`);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thu hồi được quyền');
    } finally {
      setRoleBusy(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="inline-flex rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1">
        <button
          type="button"
          onClick={() => setSubTab('config')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer ${
            subTab === 'config' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          <Settings className="w-3.5 h-3.5" /> Cấu hình vận hành
        </button>
        <button
          type="button"
          onClick={() => setSubTab('roles')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer ${
            subTab === 'roles' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" /> Phân quyền Admin ({bundle?.roles.length ?? 0})
        </button>
        <button
          type="button"
          onClick={() => setSubTab('logs')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer ${
            subTab === 'logs' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          <History className="w-3.5 h-3.5" /> Nhật ký hoạt động Admin
        </button>
      </div>

      {error && <div role="alert" className="rounded-xl bg-rose-50 text-rose-700 p-3 text-sm">{error}</div>}
      {message && <div role="status" className="rounded-xl bg-emerald-50 text-emerald-800 p-3 text-sm">{message}</div>}

      {loading && !bundle ? (
        <div className="py-10 text-center text-sm text-slate-500">
          <Loader2 className="w-5 h-5 animate-spin inline mr-2" /> Đang tải cấu hình hệ thống…
        </div>
      ) : subTab === 'config' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {(bundle?.settings ?? []).map((s) => {
            const meta = SETTING_LABELS[s.setting_key] ?? { title: s.setting_key, desc: '' };
            return (
              <div key={s.setting_key} className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{meta.title}</h3>
                  <p className="text-xs text-slate-500">{meta.desc}</p>
                </div>
                <textarea
                  rows={5}
                  value={drafts[s.setting_key] ?? ''}
                  onChange={(e) => setDrafts((p) => ({ ...p, [s.setting_key]: e.target.value }))}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs"
                />
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Cập nhật: {new Date(s.updated_at).toLocaleString('vi-VN')}</span>
                  <button
                    type="button"
                    disabled={savingKey === s.setting_key}
                    onClick={() => void handleSaveSetting(s.setting_key)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold inline-flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                  >
                    {savingKey === s.setting_key ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} Lưu
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : subTab === 'roles' ? (
        <div className="space-y-4">
          <form onSubmit={handleGrantRole} className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 flex flex-col sm:flex-row gap-2.5">
            <input
              value={roleAlias}
              onChange={(e) => setRoleAlias(e.target.value)}
              placeholder="Biệt danh tài khoản cần cấp quyền…"
              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm"
            />
            <select
              value={roleType}
              onChange={(e) => setRoleType(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm"
            >
              <option value="content_admin">Content Admin (Nội dung)</option>
              <option value="support_admin">Support Admin (Hỗ trợ)</option>
              <option value="platform_admin">Platform Admin (Toàn quyền)</option>
            </select>
            <button
              type="submit"
              disabled={roleBusy || !roleAlias.trim()}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold inline-flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" /> Cấp quyền
            </button>
          </form>

          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 dark:bg-slate-800 text-xs uppercase text-slate-500">
                <tr>
                  <th className="py-3 px-4">Tài khoản</th>
                  <th className="py-3 px-3">Vai trò</th>
                  <th className="py-3 px-3">Ngày cấp</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {(bundle?.roles ?? []).map((r) => (
                  <tr key={`${r.user_id}-${r.role}`}>
                    <td className="py-3 px-4 font-semibold">{r.alias}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                        {r.role}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-xs text-slate-500">{new Date(r.granted_at).toLocaleString('vi-VN')}</td>
                    <td className="py-3 px-4 text-right">
                      {confirmRevokeKey === `${r.user_id}-${r.role}` ? (
                        <span className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            disabled={roleBusy}
                            onClick={() => void handleRevokeRole(r.alias, r.role)}
                            className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold cursor-pointer disabled:opacity-50"
                          >
                            Thu hồi
                          </button>
                          <button
                            type="button"
                            disabled={roleBusy}
                            onClick={() => setConfirmRevokeKey(null)}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold cursor-pointer"
                          >
                            Hủy
                          </button>
                        </span>
                      ) : (
                        <button
                          type="button"
                          disabled={roleBusy}
                          onClick={() => setConfirmRevokeKey(`${r.user_id}-${r.role}`)}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer"
                          title="Thu hồi quyền"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800 uppercase text-slate-500">
                <tr>
                  <th className="py-3 px-4">Thời gian</th>
                  <th className="py-3 px-3">Quản trị viên</th>
                  <th className="py-3 px-3">Hành động</th>
                  <th className="py-3 px-3">Đối tượng</th>
                  <th className="py-3 px-4">Chi tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {(bundle?.audit_logs ?? []).map((l) => (
                  <tr key={l.id}>
                    <td className="py-2.5 px-4 whitespace-nowrap text-slate-500">{new Date(l.created_at).toLocaleString('vi-VN')}</td>
                    <td className="py-2.5 px-3 font-semibold">{l.actor_alias}</td>
                    <td className="py-2.5 px-3 font-mono text-indigo-600 dark:text-indigo-400">{l.action}</td>
                    <td className="py-2.5 px-3">{l.entity_type} · <span className="font-mono text-slate-400">{l.entity_id.slice(0, 12)}</span></td>
                    <td className="py-2.5 px-4 font-mono text-slate-500 max-w-xs truncate">{JSON.stringify(l.details)}</td>
                  </tr>
                ))}
                {(bundle?.audit_logs ?? []).length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">Chưa có nhật ký quản trị nào.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
