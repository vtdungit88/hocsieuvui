import assert from 'node:assert/strict';
import { historyGeographyCurriculum } from '../src/data/historyGeographyCurriculum';
import { historyGeographyLessonDrafts } from '../src/data/historyGeographyLessonDrafts';
import { historyGeographyQuizDrafts } from '../src/data/historyGeographyQuizDrafts';
import { geographyQuizDrafts } from '../src/data/historyGeographyGeographyQuizDrafts';

const quizSets = [...historyGeographyQuizDrafts, ...geographyQuizDrafts];
const lessonIds = new Set(historyGeographyLessonDrafts.map((lesson) => lesson.id));
const quizLessonIds = new Set<string>();
const questionIds = new Set<string>();
const expectedLevels = { basic: 11, application: 3, challenge: 1 };

assert.equal(historyGeographyCurriculum.length, 4, 'Expected curriculum for grades 6–9');
assert.deepEqual(historyGeographyCurriculum.map((item) => item.grade), [6, 7, 8, 9]);

for (const grade of [6, 7, 8, 9] as const) {
  const gradeLessons = historyGeographyLessonDrafts.filter((lesson) => lesson.grade === grade);
  assert.ok(gradeLessons.some((lesson) => lesson.strand === 'history'), `Grade ${grade} needs a history lesson`);
  assert.ok(gradeLessons.some((lesson) => lesson.strand === 'geography'), `Grade ${grade} needs a geography lesson`);
}

for (const set of quizSets) {
  assert.ok(lessonIds.has(set.lessonId), `Quiz set has no matching lesson draft: ${set.lessonId}`);
  assert.ok(!quizLessonIds.has(set.lessonId), `Duplicate quiz set for lesson: ${set.lessonId}`);
  quizLessonIds.add(set.lessonId);
  assert.equal(set.questions.length, 15, `${set.lessonId} must contain 15 questions`);

  const levels = { basic: 0, application: 0, challenge: 0 };
  for (const question of set.questions) {
    assert.ok(question.prompt.trim(), `${question.id} has an empty prompt`);
    assert.ok(question.explanation.trim(), `${question.id} has no explanation`);
    assert.equal(question.options.length, 4, `${question.id} must have four options`);
    assert.equal(new Set(question.options).size, 4, `${question.id} has duplicate options`);
    assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer <= 3, `${question.id} has an invalid answer index`);
    assert.ok(!questionIds.has(question.id), `Duplicate question ID: ${question.id}`);
    questionIds.add(question.id);
    levels[question.level] += 1;
  }
  assert.deepEqual(levels, expectedLevels, `${set.lessonId} has an incorrect difficulty distribution`);
}
assert.equal(quizSets.length, 8, 'Expected 8 draft quiz sets (history + geography, grades 6–9)');
assert.equal(quizLessonIds.size, lessonIds.size, 'Every lesson draft must have exactly one quiz set');
console.log(`History & Geography draft validation passed: ${quizSets.length} sets, ${questionIds.size} questions.`);
