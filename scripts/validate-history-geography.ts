import assert from 'node:assert/strict';
import { historyGeographyCurriculum } from '../src/data/historyGeographyCurriculum';
import { historyGeographySyllabusManifest, flattenHistoryGeographySyllabus } from '../src/data/historyGeographySyllabusManifest';
import { historyGeographyLessonDrafts } from '../src/data/historyGeographyLessonDrafts';
import { historyGeographyQuizDrafts } from '../src/data/historyGeographyQuizDrafts';
import { geographyQuizDrafts } from '../src/data/historyGeographyGeographyQuizDrafts';

const quizSets = [...historyGeographyQuizDrafts, ...geographyQuizDrafts];
const lessonById = new Map(historyGeographyLessonDrafts.map((lesson) => [lesson.id, lesson]));
const lessonIds = new Set(lessonById.keys());
const quizLessonIds = new Set<string>();
const questionIds = new Set<string>();
const normalizedPrompts = new Map<string, string>();
const expectedLevels = { basic: 11, application: 3, challenge: 1 };
const syllabusLessons = flattenHistoryGeographySyllabus();
const syllabusById = new Map(syllabusLessons.map((lesson) => [lesson.id, lesson]));

assert.equal(historyGeographyCurriculum.length, 4, 'Expected legacy topic overview for grades 6–9');
assert.deepEqual(historyGeographyCurriculum.map((item) => item.grade), [6, 7, 8, 9]);
assert.deepEqual(historyGeographySyllabusManifest.map((item) => item.grade), [6, 7, 8, 9]);

// Syllabus integrity: complete chapter coverage, stable IDs, ordering, and strand separation.
assert.equal(syllabusById.size, syllabusLessons.length, 'Duplicate syllabus lesson ID');
for (const grade of historyGeographySyllabusManifest) {
  const seenNumbers = new Set<string>();
  const chapterIds = new Set<string>();
  for (const item of grade.chapters) {
    assert.ok(!chapterIds.has(item.id), `Grade ${grade.grade}: duplicate chapter ID ${item.id}`);
    chapterIds.add(item.id);
    assert.ok(item.lessons.length > 0, `Grade ${grade.grade}: empty chapter ${item.id}`);
    for (const lesson of item.lessons) {
      assert.equal(lesson.strand, item.strand, `${lesson.id}: strand does not match chapter`);
      assert.equal(lesson.chapterId, item.id, `${lesson.id}: wrong chapter mapping`);
      assert.equal(lesson.chapterTitle, item.title, `${lesson.id}: wrong chapter title`);
      assert.ok(lesson.title.trim(), `${lesson.id}: missing title`);
      assert.ok(!seenNumbers.has(`${lesson.strand}:${lesson.number}`), `Grade ${grade.grade}: duplicate textbook number ${lesson.number} in ${lesson.strand}`);
      seenNumbers.add(`${lesson.strand}:${lesson.number}`);
    }
  }
  for (const lesson of grade.integrated) {
    assert.equal(lesson.strand, 'integrated', `${lesson.id}: integrated topic has wrong strand`);
    assert.equal(lesson.chapterId, `g${grade.grade}-integrated`, `${lesson.id}: wrong integrated chapter`);
    assert.ok(lesson.title.trim(), `${lesson.id}: missing integrated title`);
  }
}
assert.equal(syllabusLessons.filter((item) => item.strand === 'history' && item.status === 'source_verified').length > 0, true);
assert.equal(syllabusLessons.filter((item) => item.strand === 'geography' && item.status === 'source_verified').length > 0);

// Legacy sample packs remain structurally validated. New content must use exact manifest IDs
// to be counted toward coverage; topic-level legacy samples are deliberately not misreported as full lessons.
for (const grade of [6, 7, 8, 9] as const) {
  const gradeLessons = historyGeographyLessonDrafts.filter((lesson) => lesson.grade === grade);
  assert.ok(gradeLessons.some((lesson) => lesson.strand === 'history'), `Grade ${grade} needs a history sample`);
  assert.ok(gradeLessons.some((lesson) => lesson.strand === 'geography'), `Grade ${grade} needs a geography sample`);
}
for (const lesson of historyGeographyLessonDrafts) {
  const manifestLesson = syllabusById.get(lesson.id);
  if (manifestLesson) {
    assert.equal(lesson.grade, Number(lesson.id.match(/^g(\d+)-/)?.[1]), `${lesson.id}: grade encoded in ID mismatch`);
    assert.equal(lesson.strand, manifestLesson.strand, `${lesson.id}: lesson strand mismatch`);
    assert.equal(lesson.title.trim(), manifestLesson.title.trim(), `${lesson.id}: lesson title mismatch`);
  }
}

for (const set of quizSets) {
  assert.ok(lessonIds.has(set.lessonId), `Quiz set has no matching lesson draft: ${set.lessonId}`);
  const mappedLesson = lessonById.get(set.lessonId)!;
  assert.equal(set.grade, mappedLesson.grade, `${set.lessonId} grade mismatch between quiz and lesson`);
  assert.equal(set.strand, mappedLesson.strand, `${set.lessonId} strand mismatch between quiz and lesson`);
  assert.equal(set.title.trim(), mappedLesson.title.trim(), `${set.lessonId} title mismatch between quiz and lesson`);
  assert.ok(!quizLessonIds.has(set.lessonId), `Duplicate quiz set for lesson: ${set.lessonId}`);
  quizLessonIds.add(set.lessonId);
  assert.equal(set.questions.length, 15, `${set.lessonId} must contain 15 questions`);

  const levels = { basic: 0, application: 0, challenge: 0 };
  for (const question of set.questions) {
    assert.ok(question.prompt.trim(), `${question.id} has an empty prompt`);
    assert.ok(question.explanation.trim(), `${question.id} has no explanation`);
    assert.equal(question.options.length, 4, `${question.id} must have four options`);
    assert.ok(question.options.every((option) => option.trim()), `${question.id} has an empty option`);
    assert.equal(new Set(question.options.map((option) => option.trim().toLocaleLowerCase('vi'))).size, 4, `${question.id} has duplicate options`);
    assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer <= 3, `${question.id} has an invalid answer index`);
    assert.ok(!questionIds.has(question.id), `Duplicate question ID: ${question.id}`);
    questionIds.add(question.id);
    const normalized = question.prompt.normalize('NFKC').toLocaleLowerCase('vi').replace(/[\\s\\p{P}]+/gu, ' ').trim();
    const previous = normalizedPrompts.get(normalized);
    assert.ok(!previous, `Duplicate/near-duplicate question prompt: ${question.id} duplicates ${previous}`);
    normalizedPrompts.set(normalized, question.id);
    levels[question.level] += 1;
  }
  assert.deepEqual(levels, expectedLevels, `${set.lessonId} has an incorrect difficulty distribution`);
}
assert.equal(quizSets.length, 10, 'Expected 10 currently authored draft quiz sets (not a claim of syllabus completeness)');
assert.equal(quizLessonIds.size, lessonIds.size, 'Every current lesson draft must have exactly one quiz set');

const manifestLessonIds = new Set(syllabusLessons.map((lesson) => lesson.id));
const authoredManifestLessons = historyGeographyLessonDrafts.filter((lesson) => manifestLessonIds.has(lesson.id));
const authoredManifestQuizIds = new Set(quizSets.map((set) => set.lessonId).filter((id) => manifestLessonIds.has(id)));
const missingLessons = syllabusLessons.filter((lesson) => !authoredManifestLessons.some((draft) => draft.id === lesson.id));
const missingQuizSets = syllabusLessons.filter((lesson) => !authoredManifestQuizIds.has(lesson.id));
const counts = historyGeographySyllabusManifest.map((grade) => ({
  grade: grade.grade,
  history: grade.chapters.filter((item) => item.strand === 'history').reduce((n, item) => n + item.lessons.length, 0),
  geography: grade.chapters.filter((item) => item.strand === 'geography').reduce((n, item) => n + item.lessons.length, 0),
  integrated: grade.integrated.length,
}));
console.log('Syllabus manifest counts:', JSON.stringify(counts));
console.log(`Syllabus coverage: ${authoredManifestLessons.length}/${syllabusLessons.length} lesson drafts; ${authoredManifestQuizIds.size}/${syllabusLessons.length} quiz packs.`);
console.log(`Missing lesson drafts: ${missingLessons.length}; missing quiz packs: ${missingQuizSets.length}.`);
console.log(`History & Geography structural validation passed: ${quizSets.length} legacy/current sets, ${questionIds.size} questions, ${syllabusLessons.length} manifest items.`);
if (process.argv.includes('--strict-coverage')) {
  assert.equal(missingLessons.length, 0, 'Strict coverage failed: syllabus lessons are missing');
  assert.equal(missingQuizSets.length, 0, 'Strict coverage failed: quiz packs are missing');
}
