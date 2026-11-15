import React, { useState } from 'react';
import { Backpack, ChevronDown, GraduationCap, Rocket } from 'lucide-react';
import {
  SUBJECTS_CATALOG,
  getSubjectLevelInfo,
  getSubjectsForLevel
} from '../../data/subjectsCatalog';
import type { SchoolLevel, SubjectMeta } from '../../types';
import { SubjectIcon } from './subjectIcons';

/** Open subjects first, subjects that are not open yet after. */
export const SORTED_SUBJECTS: SubjectMeta[] = [...SUBJECTS_CATALOG].sort(
  (a, b) => Number(b.status === 'active') - Number(a.status === 'active')
);

interface Props {
  onPick: (subject: SubjectMeta, level?: SchoolLevel) => void;
}

const PRIMARY_SUBJECTS = getSubjectsForLevel('primary').filter((subject) => subject.status === 'active');
const SECONDARY_SUBJECTS = getSubjectsForLevel('secondary').filter((subject) => subject.status === 'active');

/** Main subject picker: two expandable school-level sections; only available subjects are shown. */
export const SubjectGrid: React.FC<Props> = ({ onPick }) => {
  const [expandedLevel, setExpandedLevel] = useState<SchoolLevel | null>(null);

  const renderGroup = (
    level: SchoolLevel,
    title: string,
    summary: string,
    Icon: React.ComponentType<{ className?: string }>,
    accentCls: string,
    subjects: SubjectMeta[]
  ) => {
    const expanded = expandedLevel === level;

    return (
      <section
        key={level}
        className={`overflow-hidden rounded-3xl border transition-all duration-200 ${
          expanded
            ? 'border-indigo-300 dark:border-indigo-700 bg-white dark:bg-slate-900 shadow-lg'
            : 'border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 shadow-sm hover:shadow-md'
        }`}
      >
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpandedLevel(expanded ? null : level)}
          className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left cursor-pointer"
        >
          <span className="flex items-center gap-3 min-w-0">
            <span className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 ${accentCls}`}>
              <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
            </span>
            <span className="min-w-0">
              <span className="block text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {title}
              </span>
              <span className="block text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {summary}
              </span>
              <span className="inline-flex items-center gap-1.5 mt-2 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {subjects.length} {subjects.length === 1 ? 'môn đang mở' : 'môn đang mở'}
              </span>
            </span>
          </span>
          <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform ${
            expanded
              ? 'rotate-180 bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
              : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300'
          }`}>
            <ChevronDown className="w-5 h-5" />
          </span>
        </button>

        {expanded && (
          <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 border-t border-slate-100 dark:border-slate-800">
            <div className="hsv-subject-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {subjects.map((subj) => {
                const info = getSubjectLevelInfo(subj, level);
                return (
                  <button
                    key={`${level}-${subj.id}`}
                    type="button"
                    onClick={() => onPick(subj, level)}
                    className={`group relative text-left rounded-2xl p-4 text-white bg-gradient-to-br ${subj.color} shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer overflow-hidden min-h-[9rem] flex flex-col justify-between`}
                  >
                    <span aria-hidden className="absolute -right-5 -bottom-6 w-24 h-24 rounded-full bg-white/15" />
                    <div className="flex items-start justify-between gap-2 relative">
                      <span className="w-11 h-11 rounded-xl bg-white/25 backdrop-blur flex items-center justify-center shadow-inner">
                        <SubjectIcon name={subj.iconName} className="w-6 h-6" />
                      </span>
                      <span className="text-[10px] font-black uppercase bg-white text-emerald-700 px-2.5 py-1 rounded-full shadow">
                        Đang mở
                      </span>
                    </div>
                    <div className="relative mt-3">
                      <h3 className="text-lg font-black leading-tight">{subj.name}</h3>
                      {info.tagline && <p className="text-xs font-bold text-white/90 mt-0.5">{info.tagline}</p>}
                      <span className="mt-2.5 inline-flex items-center gap-1 text-xs font-black bg-white/25 group-hover:bg-white group-hover:text-slate-900 px-3 py-1.5 rounded-full transition-colors">
                        Vào học <Rocket className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </section>
    );
  };

  return (
    <section aria-labelledby="subjects-title" className="space-y-4 sm:space-y-5">
      <div>
        <h2 id="subjects-title" className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Rocket className="w-7 h-7 text-fuchsia-500 shrink-0" />
          <span>Chọn môn học của bạn</span>
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Chọn cấp học để xem các môn đã sẵn sàng. Môn học mới sẽ được bổ sung dần.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {renderGroup(
          'primary',
          'Tiểu học',
          'Lớp 1 – 5 · Khám phá kiến thức nền tảng',
          Backpack,
          'bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300',
          PRIMARY_SUBJECTS
        )}
        {renderGroup(
          'secondary',
          'Trung học',
          'Lớp 6 – 9 · Chinh phục kiến thức nâng cao',
          GraduationCap,
          'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300',
          SECONDARY_SUBJECTS
        )}
      </div>
    </section>
  );
};
