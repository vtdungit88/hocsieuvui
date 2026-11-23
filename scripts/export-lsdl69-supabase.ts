import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { historyGeographySyllabusManifest, type HGSyllabusLesson } from '../src/data/historyGeographySyllabusManifest';
import { historyGeographyLessonDrafts } from '../src/data/historyGeographyLessonDrafts';
import { historyGeographyQuizDrafts } from '../src/data/historyGeographyQuizDrafts';
import { geographyQuizDrafts } from '../src/data/historyGeographyGeographyQuizDrafts';
import { integratedQuizDrafts } from '../src/data/historyGeographyIntegratedQuizDrafts';

type BatchQuestion = {
  c: string;
  d: 'basic' | 'application' | 'advanced';
  p: string;
  o: [string, string, string, string];
  k: 'A' | 'B' | 'C' | 'D';
  e: string;
  s: string;
  h: string;
};

type BatchLesson = {
  chapter: string;
  lesson: {
    code: string;
    title: string;
    seq: number;
    subtitle: string;
    concepts: string[];
  };
  questions: BatchQuestion[];
};

const KEYS = ['A', 'B', 'C', 'D'] as const;

const lessonMap = new Map(historyGeographyLessonDrafts.map((l) => [l.id, l]));
const allQuizzes = [...historyGeographyQuizDrafts, ...geographyQuizDrafts, ...integratedQuizDrafts];
const quizMap = new Map(allQuizzes.map((q) => [q.lessonId, q]));

function sqlStr(val: string): string {
  return `'${val.replace(/'/g, "''")}'`;
}

function strandPrefix(strand: 'history' | 'geography' | 'integrated'): string {
  if (strand === 'history') return '[Lịch sử] ';
  if (strand === 'geography') return '[Địa lí] ';
  return '[Chủ đề chung] ';
}

function formatLessonTitle(lesson: HGSyllabusLesson): string {
  if (lesson.strand === 'integrated') {
    return `Chủ đề chung ${lesson.number}. ${lesson.title}`;
  }
  return `Bài ${lesson.number}. ${lesson.title}`;
}

const chapterRows: Array<{
  subjectCode: 'lsdl';
  gradeId: number;
  code: string;
  seq: number;
  title: string;
}> = [];

const outDir = resolve('content/grades69');
mkdirSync(outDir, { recursive: true });
mkdirSync(resolve('supabase/migrations_applied'), { recursive: true });

let totalChapters = 0;
let totalLessons = 0;
let totalQuestions = 0;

for (const gradeBlock of historyGeographySyllabusManifest) {
  const grade = gradeBlock.grade;
  const gradeBatches: BatchLesson[] = [];
  let chapterSeq = 0;
  let lessonSeq = 0;

  const chapterGroups: Array<{
    strand: 'history' | 'geography' | 'integrated';
    title: string;
    lessons: HGSyllabusLesson[];
  }> = [
    ...gradeBlock.chapters.map((ch) => ({
      strand: ch.strand,
      title: `${strandPrefix(ch.strand)}${ch.title}`,
      lessons: ch.lessons,
    })),
    ...(gradeBlock.integrated.length > 0
      ? [
          {
            strand: 'integrated' as const,
            title: `${strandPrefix('integrated')}Chủ đề liên môn Lịch sử – Địa lí`,
            lessons: gradeBlock.integrated,
          },
        ]
      : []),
  ];

  for (const ch of chapterGroups) {
    chapterSeq += 1;
    const chapterCode = `lsdl${grade}-c${chapterSeq}`;
    chapterRows.push({
      subjectCode: 'lsdl',
      gradeId: grade,
      code: chapterCode,
      seq: chapterSeq,
      title: ch.title,
    });
    totalChapters += 1;

    for (const symLesson of ch.lessons) {
      lessonSeq += 1;
      const lessonCode = `lsdl${grade}-b${String(lessonSeq).padStart(2, '0')}`;
      const draft = lessonMap.get(symLesson.id);
      const quiz = quizMap.get(symLesson.id);
      assert.ok(draft, `Missing lesson draft for ${symLesson.id}`);
      assert.ok(quiz, `Missing quiz set for ${symLesson.id}`);
      assert.equal(quiz.questions.length, 15, `Expected 15 questions for ${symLesson.id}`);

      const sectionPoints =
        draft.sections?.flatMap((sec) => sec.keyPoints ?? []).filter((x) => x.trim().length > 0) ?? [];
      const concepts = Array.from(new Set([...draft.learningObjectives, ...sectionPoints])).slice(0, 6);

      const questions: BatchQuestion[] = quiz.questions.map((q, idx) => {
        const opts = q.options.map((o) => o.trim()) as [string, string, string, string];
        assert.equal(new Set(opts.map((o) => o.toLocaleLowerCase('vi'))).size, 4, `${q.id}: duplicate options`);
        const prompt = q.prompt.trim();
        const explanation = q.explanation.trim();
        assert.ok(prompt.length >= 5, `${q.id}: prompt too short`);
        assert.ok(explanation.length >= 5, `${q.id}: explanation too short`);
        const qCode = `LSDL${grade}-B${String(lessonSeq).padStart(2, '0')}-${String(idx + 1).padStart(3, '0')}`;
        return {
          c: qCode,
          d: q.level === 'challenge' ? 'advanced' : q.level,
          p: prompt,
          o: opts,
          k: KEYS[q.answer],
          e: explanation,
          s: `Lịch sử và Địa lí ${grade}`,
          h: ch.title,
        };
      });

      gradeBatches.push({
        chapter: chapterCode,
        lesson: {
          code: lessonCode,
          title: formatLessonTitle(symLesson),
          seq: lessonSeq,
          subtitle: draft.summary.trim(),
          concepts,
        },
        questions,
      });

      totalLessons += 1;
      totalQuestions += questions.length;
    }
  }

  const batchPath = resolve(outDir, `lsdl${grade}_batches.json`);
  writeFileSync(batchPath, JSON.stringify(gradeBatches, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${batchPath}: ${chapterSeq} chapters, ${gradeBatches.length} lessons, ${gradeBatches.length * 15} questions.`);
}

assert.equal(totalChapters, 48, 'Expected 48 chapters');
assert.equal(totalLessons, 166, 'Expected 166 lessons');
assert.equal(totalQuestions, 2490, 'Expected 2490 questions');

const valuesSql = chapterRows
  .map((r) => `    (${sqlStr(r.subjectCode)}, ${r.gradeId}, ${sqlStr(r.code)}, ${r.seq}, ${sqlStr(r.title)})`)
  .join(',\n');

const migrationSql = `-- Phase 13: Publish Lịch sử và Địa lí Grades 6-9 (Kết nối tri thức với cuộc sống)
-- Scope: 48 chapters, 166 lessons, 2,490 questions (Grades 6: 50, 7: 39, 8: 33, 9: 44)
-- Target project: owqbwykjabwevkbjroym (idempotent).

insert into public.subjects (code, name, is_active) values
  ('lsdl', 'Lịch sử và Địa lí', true)
on conflict (code) do update
  set name = excluded.name,
      is_active = true;

with chapter_seed(subject_code, grade_id, code, sequence_no, title) as (
  values
${valuesSql}
)
insert into public.chapters (grade_id, subject_id, code, title, sequence_no, status)
select
  cs.grade_id,
  s.id,
  cs.code,
  cs.title,
  cs.sequence_no,
  'published'
from chapter_seed cs
join public.subjects s on s.code = cs.subject_code
on conflict (code) do update
  set title = excluded.title,
      sequence_no = excluded.sequence_no,
      grade_id = excluded.grade_id,
      subject_id = excluded.subject_id,
      status = 'published';
`;

const migrationPath = resolve('supabase/migrations_applied/hsv_phase13_lsdl_6_9.sql');
writeFileSync(migrationPath, migrationSql, 'utf8');
console.log(`Wrote ${migrationPath}: ${totalChapters} chapters ready for publication.`);
