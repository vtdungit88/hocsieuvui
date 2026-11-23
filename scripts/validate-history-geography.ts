import assert from 'node:assert/strict';
import { historyGeographyCurriculum } from '../src/data/historyGeographyCurriculum';
import { historyGeographySyllabusManifest, flattenHistoryGeographySyllabus } from '../src/data/historyGeographySyllabusManifest';
import { historyGeographyLessonDrafts } from '../src/data/historyGeographyLessonDrafts';
import { historyGeographyQuizDrafts } from '../src/data/historyGeographyQuizDrafts';
import { geographyQuizDrafts } from '../src/data/historyGeographyGeographyQuizDrafts';
import { integratedQuizDrafts } from '../src/data/historyGeographyIntegratedQuizDrafts';
import { SUBJECTS_CATALOG } from '../src/data/subjectsCatalog';

const quizSets = [...historyGeographyQuizDrafts, ...geographyQuizDrafts, ...integratedQuizDrafts];
const lessonById = new Map(historyGeographyLessonDrafts.map((lesson) => [lesson.id, lesson]));
const lessonIds = new Set(lessonById.keys());
for (const lesson of historyGeographyLessonDrafts) {
  if (!lesson.sections) continue;
  assert.ok(lesson.sections.length >= 3, `${lesson.id}: expected at least three structured learning sections`);
  for (const section of lesson.sections) {
    assert.ok(section.heading.trim(), `${lesson.id}: empty learning section heading`);
    assert.ok(section.body.trim().length >= 80, `${lesson.id}: learning section body is too short`);
  }
}
for (const id of [
  'g6-history-17','g6-history-18','g6-history-19','g6-history-20',
  'g6-geography-17','g6-geography-18','g6-geography-19','g6-geography-20',
  'g6-geography-21','g6-geography-22','g6-geography-23','g6-geography-24','g6-geography-25',
  'g6-geography-26','g6-geography-27','g6-geography-28','g6-geography-29','g6-geography-30',
  'g7-history-01','g7-history-02','g7-history-03','g7-history-04',
  'g7-history-05','g7-history-06','g7-history-07','g7-history-08',
  'g7-history-09','g7-history-10','g7-history-11','g7-history-12','g7-history-13',
  'g7-history-14','g7-history-15','g7-history-16','g7-history-17','g7-history-18',
]) {
  assert.equal(lessonById.get(id)?.sections?.length ?? 0, 3, `${id}: exactly three structured learning sections are required`);
}
assert.equal(lessonIds.size, historyGeographyLessonDrafts.length, 'Duplicate lesson draft ID');
const quizLessonIds = new Set<string>();
const questionIds = new Set<string>();
const normalizedPrompts = new Map<string, string>();
const expectedLevels = { basic: 11, application: 3, challenge: 1 };
const syllabusLessons = flattenHistoryGeographySyllabus();
const syllabusById = new Map(syllabusLessons.map((lesson) => [lesson.id, lesson]));

assert.equal(historyGeographyCurriculum.length, 4, 'Expected legacy topic overview for grades 6–9');
assert.deepEqual(historyGeographyCurriculum.map((item) => item.grade), [6, 7, 8, 9]);
assert.deepEqual(historyGeographySyllabusManifest.map((item) => item.grade), [6, 7, 8, 9]);

const historyGeoSubject = SUBJECTS_CATALOG.find((subject) => subject.id === 'history_geo');
assert.ok(historyGeoSubject, 'History & Geography must remain in the subject catalog');
assert.equal(historyGeoSubject.dbCode, 'lsdl', 'History & Geography database code must remain stable');
const availabilityByGrade = new Map(historyGeoSubject.availableGrades.map((item) => [item.grade, item]));
for (const grade of ['4', '5'] as const) {
  const availability = availabilityByGrade.get(grade);
  assert.ok(availability?.term1Available && availability.term2Available, `Existing primary grade ${grade} content must remain open`);
}
for (const grade of ['6', '7', '8', '9'] as const) {
  const availability = availabilityByGrade.get(grade);
  assert.ok(availability, `History & Geography catalog is missing grade ${grade}`);
  assert.equal(availability.term1Available, false, `Grade ${grade} must remain locked until release approval`);
  assert.equal(availability.term2Available, false, `Grade ${grade} must remain locked until release approval`);
}


// Syllabus integrity: complete chapter coverage, stable IDs, ordering, and strand separation.
assert.equal(syllabusById.size, syllabusLessons.length, 'Duplicate syllabus lesson ID');
assert.equal(syllabusLessons.length, 166, 'Expected 166 Kết nối tri thức learning units across grades 6–9');
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
assert.equal(syllabusLessons.filter((item) => item.strand === 'geography' && item.status === 'source_verified').length > 0, true, 'Manifest must include verified geography lessons');

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
assert.equal(quizSets.length, 110, 'Expected 110 current/legacy draft quiz sets (not a claim of syllabus completeness)');
assert.equal(questionIds.size, 1650, 'Expected 1650 questions across 110 draft quiz sets');
assert.equal(quizLessonIds.size, lessonIds.size, 'Every current lesson draft must have exactly one quiz set');

const manifestLessonIds = new Set(syllabusLessons.map((lesson) => lesson.id));
const authoredManifestLessons = historyGeographyLessonDrafts.filter((lesson) => manifestLessonIds.has(lesson.id));
const authoredManifestQuizIds = new Set(quizSets.map((set) => set.lessonId).filter((id) => manifestLessonIds.has(id)));
assert.equal(authoredManifestLessons.length, 102, 'Expected 102 manifest-aligned lesson drafts in the current tranche');
assert.equal(authoredManifestQuizIds.size, 102, 'Expected 102 manifest-aligned quiz packs in the current tranche');
assert.equal(authoredManifestLessons.filter((lesson) => lesson.grade === 6).length, 50, 'Grade 6 must have 50 manifest-aligned lesson drafts');
assert.equal(authoredManifestLessons.filter((lesson) => lesson.grade === 7 && lesson.strand === 'history').length, 18, 'Grade 7 History must have 18 manifest-aligned lesson drafts');
assert.equal(authoredManifestLessons.filter((lesson) => lesson.grade === 7 && lesson.strand === 'integrated').length, 2, 'Grade 7 integrated topics must have two manifest-aligned lesson drafts');
assert.equal(authoredManifestLessons.filter((lesson) => lesson.grade === 8 && lesson.strand === 'history').length, 13, 'Grade 8 History must have thirteen manifest-aligned lesson drafts in the current tranche');
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
