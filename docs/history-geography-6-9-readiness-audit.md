# Lịch sử & Địa lí 6–9 — Readiness audit

**Audit date:** 2026-11-22  
**PR:** [#27](https://github.com/vtdungit88/hocsieuvui/pull/27)  
**Branch:** `feature/history-geography-grades-6-9`  
**Reviewed head:** `469718bd640172f47bafefaa4a7744e08dc15c7a`

## Current state

- 8 draft lesson records (2 per grade), 8 draft quiz packs, 120 questions total.
- Grade 6–9 remain locked in the subject catalog. Only existing grades 4–5 content is published.
- Curriculum scaffold is a broad outline, not a verified full Kết nối tri thức lesson inventory.
- CI at head is green (run 44969335935): build/lint/content-shape validator, Supabase E2E and responsive-layout jobs all succeeded. The E2E suite exercises existing platform content and is **not** a history/geography integration test.
- PR remains Draft; no content is imported or published to production.

## Content QA findings to resolve before approval

1. **Lesson/quiz mapping mismatch:** `hg7-history-explorations` lesson draft is titled “Các cuộc phát kiến địa lí và những biến đổi”, but its 15-question quiz pack is titled “Khởi nghĩa Lam Sơn” and tests Lam Sơn. The mapping must be reconciled; do not rely on the current ID-only validator.
2. **Incorrect date in draft question:** the question “Khởi nghĩa Lam Sơn kết thúc thắng lợi vào năm?” currently keys 1428. The textbook topic period is 1418–1427; 1428 is the subsequent enthronement/establishment year. Reword the question or correct the key after source review.
3. **Scope incomplete:** eight sample lessons do not cover the full grade 6–9 textbook scope. Existing grade 6–9 curriculum arrays group topics broadly and must be checked against chapter/lesson TOCs, especially practical geography, regional geography, and common/integrated themes.
4. **Validator gap:** shape checks (15 items, difficulty distribution, unique IDs, options and answer index) do not establish factual correctness, curriculum coverage, answer/explanation agreement, lesson/quiz title consistency, or distractor quality. Add checks where deterministic and a review checklist for expert verification.

## Supabase and runtime verification

- Production project is healthy; no development/staging branches exist.
- Read-only schema inspection confirmed the expected `subjects`, `chapters`, `lessons`, `learning_objectives`, `questions`, and `question_options` columns. Quiz answer keys remain in the private server-side model; do not expose them or import answer data to client files.
- Aggregate production query for `lsdl` found published grades 4 and 5 only (6 chapters, 18 lessons, 270 questions per grade). No grade 6–9 rows appeared. This is a useful baseline, not proof of every content status.
- `CoursePicker` relies on catalog `availableGrades`; `fetchCurriculum` reads published chapters/lessons. Keep grade 6–9 unavailable until data and runtime verification are complete.

## Staging gate

Supabase has no dev branch. Creating one was quoted at **US$0.01344/hour** (about US$9.81 for 30 days continuously). Do not create or import a staging branch until the project owner approves this recurring cost. Production must not be used as a substitute staging environment.

## Curriculum TOC sources to cross-check (do not copy textbook text)

- Grade 6 TOC: https://sachgiaokhoa.aistudybuddy.net/sach-online/lop-6/lich-su-va-dia-li-6/ and https://giaokhoaonline.com/lich-su-va-dia-li-lop-6-ket-noi-tri-thuc/
- Grade 7 TOC: https://sachgiaokhoa.aistudybuddy.net/sach-online/lop-7/lich-su-va-dia-li-7/
- Grade 8 TOC: https://sachgiaokhoa.aistudybuddy.net/sach-online/lop-8/lich-su-va-dia-li-8/
- Grade 9 TOC: https://giaokhoaonline.com/lich-su-va-dia-li-lop-9-ket-noi-tri-thuc/

These are secondary TOC references; verify titles, counts and learning outcomes against the official printed/digital textbook or a qualified reviewer before publishing. The learning content and quizzes should be original, not copied.

## Release checklist

- [ ] Verified complete grade 6–9 lesson inventory and stable lesson IDs.
- [ ] Authored original learning material and a balanced, mapped quiz bank for every lesson.
- [ ] Correctness review for prompts, answer keys, explanations, map/chart data and age-appropriate wording.
- [ ] Staging import is idempotent and preserves draft/approval/publish workflow.
- [ ] RLS/RPC and answer-key privacy tested on staging, including student isolation.
- [ ] Subject/course flow, quiz gameplay and score persistence tested using History & Geography data.
- [ ] Desktop, tablet and phone preview verified.
- [ ] CI green on the final head; PR approved and merged only after gates pass.
- [ ] Production deployment verified at https://vnptluongson.cloud without enabling incomplete grade 6–9 content.


## Status update — 23/11/2026

This document records the initial readiness audit and its eight-sample baseline. That baseline is superseded by the current audit in [history-geography-grade-6-9-audit.md](history-geography-grade-6-9-audit.md).

At this update, the canonical manifest contains 166 learning units. All 50 Grade 6 lessons (20 History + 30 Geography) now have manifest-aligned draft lesson material and 15-question draft packs each. Grades 7–9 and the six integrated topics remain incomplete. The current total is 50/166 manifest-aligned packs (750 questions) plus eight legacy structural samples (120 questions), for 870 draft questions. This is not an approval or a publication state.

The Grade 6 material has not yet received independent subject-matter review. CI shape checks cannot prove factual correctness or answer-key accuracy. Grade 6–9 remain locked in the catalog; no Grade 6–9 content has been imported to production. Supabase has no development branch, and production is not an acceptable substitute for staging.

### Follow-up — Grade 7 History tranche (23/11/2026)

Eight manifest-aligned Grade 7 History lessons and eight 15-question packs have been added. Current manifest coverage is 58/166 (870 aligned questions) plus eight legacy structural packs (120 questions), 990 draft questions total. Grade 6 is complete as draft content; Grade 7 History is 8/18. Grade 7 Geography, the remaining Grade 7 History lessons, integrated topics, and Grades 8–9 remain incomplete. No subject-matter approval, production import, unlock, or deployment has occurred.
