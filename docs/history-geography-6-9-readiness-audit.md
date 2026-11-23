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

### Follow-up — Grade 7 History complete as draft (23/11/2026)

The remaining ten Grade 7 History lessons and their 150 questions have been added. Grade 7 History now has 18/18 manifest-aligned draft lessons. Total coverage is 68/166 (1,020 aligned questions) plus eight legacy structural packs (120 questions), for 1,140 draft questions. The 98 remaining units are Grade 7 Geography (19) and integrated topics (2), Grade 8 (33), and Grade 9 (44). This is not independent subject-matter approval and no production import, unlock, or deployment has occurred.


## Progress update — 2026-11-23

- Canonical manifest: **166 units** (78 History, 82 Geography, 6 integrated/common topics).
- Draft coverage now **90/166**: Grade 6 50/50; Grade 7 History 18/18; Grade 7 Geography 19/19; Grade 7 integrated/common 2/2; Grade 8 History 1/19; all other Grade 8 units and all Grade 9 units remain outstanding.
- Matching manifest-aligned assessment packs: 90. Including 8 legacy sample packs: **98 draft packs / 1,470 questions**. Each pack is shaped as 11 basic, 3 application and 1 challenge items.
- Added separate `integrated` strand typing and two Grade 7 common-topic lesson/quiz records. Added the first Grade 8 History lesson and assessment pack.
- Latest source head at time of update: `93ec4b90acd20827e5f5a8a0ca2b162885ff723d`. CI run 45156148026 was still running when checked; do not treat this head as green until its completed result is confirmed.
- Earlier QA findings above remain open unless separately evidenced as resolved. The structural validator does not certify factual accuracy, curriculum fidelity, source quality, or answer/explanation correctness. Teacher/subject-expert review is still required.
- No merge, deployment, production import, or grade unlock has been performed. Grades 6–9 remain locked; production data and runtime were not changed.


## Progress update — 2026-11-23 (continued)

- Grade 8 History drafts now include manifest lessons 1–2: `g8-history-01` and `g8-history-02`, each with three learning sections and a matching 15-question assessment.
- Current expected totals updated in the validator: **100 draft quiz packs / 1,500 questions** including 8 retained legacy samples; **92 manifest-aligned lesson drafts and 92 matching quiz packs**.
- Coverage: Grade 6 50/50; Grade 7 History 18/18; Grade 7 Geography 19/19; Grade 7 integrated 2/2; Grade 8 History 2/19; remaining Grade 8 units 0/14; Grade 9 0/44.
- CI run 45156243320 exposed a missing comma between lesson objects in `historyGeographyLessonDrafts.ts`; fixed in commit `40df809`. New content and validator changes followed. Run 45156533542 is checking commit `8e68d6b`; this run predates the final validator commit `ecb677b`, so a green result on the final branch head is still required.
- No merge, deployment, production import or grade unlock. Drafts still require independent subject-matter review.


## Progress update — 2026-11-23 (Grade 8 History lesson 3)

- Added manifest-aligned lesson `g8-history-03`: **Cách mạng công nghiệp (nửa sau thế kỉ XVIII - giữa thế kỉ XIX)**, with three substantive learning sections, objectives, summary and examples.
- Added its matching 15-question draft assessment using the established 11 basic / 3 application / 1 challenge distribution.
- Fixed one duplicate assessment prompt previously detected by CI in the Grade 8 lesson 2 pack.
- Current branch content totals: **93/166 manifest units** and 93 matching manifest-aligned quiz packs. With 8 retained legacy samples: **101 quiz packs / 1,515 questions**. Grade 8 History is now 3/19; remaining Grade 8 units are 30 and Grade 9 remains 44.
- Validator expected totals were updated to 93 manifest-aligned lessons/packs, 101 total packs and 1,515 questions. CI has not yet been confirmed green on the exact current head `2facaa70b921fc08bbede419b40155bbaa551680`; the earlier duplicate-prompt failure was fixed, and the next completed run must be checked.
- All new materials remain draft-only. They have not received independent teacher/subject-expert review. No Supabase production import, publish, unlock, merge or deployment has occurred.


## Progress update — 2026-11-23 (Grade 8 History lessons 3–5)

- Added manifest-aligned lesson `g8-history-03`: **Cách mạng công nghiệp (nửa sau thế kỉ XVIII - giữa thế kỉ XIX)**, with three substantive sections and a matching 15-question draft quiz.
- Added manifest-aligned lesson `g8-history-04`: **Đông Nam Á từ nửa sau thế kỉ XVI đến giữa thế kỉ XIX**, with three substantive sections and a matching 15-question draft quiz.
- Added manifest-aligned lesson `g8-history-05`: **Cuộc xung đột Nam - Bắc triều và Trịnh - Nguyễn**, with three substantive sections and a matching 15-question draft quiz.
- Fixed CI-detected empty array slots caused by accidental duplicate commas during insertion. The latest branch head after these fixes is `41433e98c2e9763ea60f8f60b4feae3c5481f020`; CI must be checked on this exact head before calling the tranche green.
- Current content totals: **95/166 manifest units** and 95 matching manifest-aligned quiz packs. With 8 retained legacy samples: **103 quiz packs / 1,545 questions**. Grade 8 History is now 5/19; remaining Grade 8 units are 28 and Grade 9 remains 44.
- All added materials remain draft-only. They have not received independent teacher/subject-matter expert review. Validator checks structural integrity and mappings, not textbook fidelity or factual correctness. No production Supabase import, publish, unlock, merge or deployment has occurred.


## Progress update — 2026-11-23 (Grade 8 History lessons 4–6; inventory reconciled)

- Added manifest-aligned lesson `g8-history-04`: **Đông Nam Á từ nửa sau thế kỉ XVI đến giữa thế kỉ XIX**.
- Added manifest-aligned lesson `g8-history-05`: **Cuộc xung đột Nam - Bắc triều và Trịnh - Nguyễn**.
- Added manifest-aligned lesson `g8-history-06`: **Công cuộc khai phá vùng đất phía Nam từ thế kỉ XVI đến thế kỉ XVIII**.
- Each has three substantive learning sections and a matching 15-question draft quiz with the 11/3/1 level distribution.
- Reconciled the validator against the actual source inventory: **95/166 manifest units** and 95 matching manifest-aligned quiz packs. There are 8 retained legacy quiz samples, so the correct total is **103 quiz sets / 1,545 questions** (not 104 / 1,560). Grade 8 History is 6/19; 27 Grade 8 units and 44 Grade 9 units remain.
- The latest CI run on an earlier head failed because the validator's expected total was one too high (actual 102 vs expected 103 at that earlier point). The validator is now corrected to 95 manifest lessons/packs, 103 total quiz sets and 1,545 questions. CI must still be checked on the latest branch head after this reconciliation.
- All new materials remain draft-only and have not received independent teacher/subject-matter expert review. No production Supabase import, publish, unlock, merge or deployment has occurred.


## Progress update — 2026-11-23 (Grade 8 History lessons 6–7)

- Added `g8-history-06`: **Công cuộc khai phá vùng đất phía Nam từ thế kỉ XVI đến thế kỉ XVIII**, with three substantive sections and a matching 15-question draft quiz.
- Added `g8-history-07`: **Khởi nghĩa nông dân ở Đàng Ngoài thế kỉ XVIII**, with three substantive sections and a matching 15-question draft quiz.
- Reconciled counts from the actual manifest-aligned source IDs: **96/166 units** and 96 matching quiz packs. With 8 legacy sample packs, the total is **104 quiz sets / 1,560 questions**. Grade 8 History is 7/19; 26 Grade 8 units and 44 Grade 9 units remain.
- Validator now expects 96 manifest-aligned lessons/packs, 104 total quiz sets and 1,560 questions. Accidental empty array slots have been removed from both source arrays. CI has been triggered on the latest branch head `10ee6a2a38c03250abf25283b69742ea926fd410` and remains to be verified.
- All new materials remain draft-only and require independent teacher/subject-matter review. No production import, publish, unlock, merge or deployment has occurred.


## Progress update — 2026-11-23 (Grade 8 History lesson 8)

- Added `g8-history-08`: **Phong trào Tây Sơn**, with three substantive sections covering context, major victories and historical significance, plus a matching 15-question draft quiz.
- Current inventory: **97/166 manifest units** with 97 matching quiz packs. Including 8 legacy sample packs: **105 quiz sets / 1,575 questions**. Grade 8 History is 8/19; 25 Grade 8 units and 44 Grade 9 units remain.
- Validator expected totals updated to 97 manifest lessons/packs, 105 quiz sets and 1,575 questions.
- CI previously passed on content commit `10ee6a2a38c03250abf25283b69742ea926fd410` (lint, curriculum validator, build and bundle guard). The latest changes for lesson 8 and its validator need a fresh green run on the latest branch head.
- All new materials remain draft-only and need independent teacher/subject-matter review. No production import, publish, unlock, merge or deployment has occurred.


## Progress update — 2026-11-23 (Grade 8 History lesson 9)

- Added `g8-history-09`: **Tình hình kinh tế, văn hóa, tôn giáo trong các thế kỉ XVI - XVIII**, with three substantive sections and a matching 15-question draft quiz.
- Current inventory: **98/166 manifest units** and 98 matching manifest quiz packs. Including 8 retained legacy samples: **106 quiz sets / 1,590 questions**. Grade 8 History is 9/19; 24 Grade 8 units and 44 Grade 9 units remain.
- Validator expected totals updated to 98 manifest-aligned lessons/packs, 106 total quiz sets and 1,590 questions.
- CI was green on commit `859ea97425a510c27ed2a07a9494bb79ee1054e7` (content and validator through Grade 8 History lesson 7). The new lesson 8–9 changes require a fresh green run on the current head.
- All new materials remain draft-only and require independent teacher/subject-matter review. No production import, publish, unlock, merge or deployment has occurred.


## Progress update — 2026-11-23 (Grade 8 History lesson 10)

- Added `g8-history-10`: **Sự hình thành chủ nghĩa đế quốc ở các nước Âu - Mỹ (cuối thế kỉ XIX - đầu thế kỉ XX)**, with three substantive sections and a matching 15-question draft quiz.
- Current inventory: **99/166 manifest units** and 99 matching manifest quiz packs. Including 8 legacy sample packs: **107 quiz sets / 1,605 questions**. Grade 8 History is 10/19; 23 Grade 8 units and 44 Grade 9 units remain.
- Validator expected totals updated to 99 manifest-aligned lessons/packs, 107 total quiz sets and 1,605 questions.
- CI was green on commit `859ea97425a510c27ed2a07a9494bb79ee1054e7` (through Grade 8 History lesson 7). Lesson 8–10 and their validator changes need a fresh green run on the latest head.
- All new materials remain draft-only and require independent teacher/subject-matter review. No production import, publish, unlock, merge or deployment has occurred.


## Progress update — 2026-11-23 (Grade 8 History lesson 11)

- Added `g8-history-11`: **Phong trào công nhân từ cuối thế kỉ XVIII đến đầu thế kỉ XX và sự ra đời của chủ nghĩa xã hội khoa học**, with three substantive sections and a matching 15-question draft quiz.
- Current inventory: **100/166 manifest units** and 100 matching manifest quiz packs. Including 8 legacy sample packs: **108 quiz sets / 1,620 questions**. Grade 8 History is 11/19; 22 Grade 8 units and 44 Grade 9 units remain.
- Validator expected totals updated to 100 manifest-aligned lessons/packs, 108 total quiz sets and 1,620 questions.
- CI for lesson 10's code commit `e288c2153e88c00b1117c48f1810dfe2f1bbe760` passed lint and the curriculum validator; build was still running at the last check. The latest lesson 11 changes require a new complete green run.
- All materials remain draft-only and require independent teacher/subject-matter review. No production import, publish, unlock, merge or deployment has occurred.


## Progress update — 2026-11-23 (Grade 8 History lesson 12)

- Added `g8-history-12`: **Chiến tranh thế giới thứ nhất (1914 - 1918) và Cách mạng tháng Mười Nga năm 1917**, with three substantive sections and a matching 15-question draft quiz.
- Current inventory: **101/166 manifest units** and 101 matching manifest quiz packs. Including 8 legacy sample packs: **109 quiz sets / 1,635 questions**. Grade 8 History is 12/19; 21 Grade 8 units and 44 Grade 9 units remain.
- Validator expected totals updated to 101 manifest-aligned lessons/packs, 109 total quiz sets and 1,635 questions.
- CI passed on commit `e288c2153e88c00b1117c48f1810dfe2f1bbe760` (through Grade 8 History lesson 10). Lesson 11–12 and the latest validator changes require a fresh green run on the current head.
- All materials remain draft-only and require independent teacher/subject-matter review. No production import, publish, unlock, merge or deployment has occurred.


## Progress update — 2026-11-23 (Grade 8 History lesson 13)

- Added `g8-history-13`: **Sự phát triển của khoa học, kĩ thuật, văn học, nghệ thuật trong các thế kỉ XVIII - XIX**, with three substantive sections and a matching 15-question draft quiz.
- Current inventory: **102/166 manifest units** and 102 matching manifest quiz packs. Including 8 legacy sample packs: **110 quiz sets / 1,650 questions**. Grade 8 History is 13/19; 20 Grade 8 units and 44 Grade 9 units remain.
- Validator expected totals updated to 102 manifest-aligned lessons/packs, 110 total quiz sets and 1,650 questions.
- CI passed on commit `e288c2153e88c00b1117c48f1810dfe2f1bbe760` through lesson 10. Lesson 11–13 and the latest validator changes require a fresh complete green run on the current head.
- All materials remain draft-only and require independent teacher/subject-matter review. No production import, publish, unlock, merge or deployment has occurred.


## Progress update — 2026-11-23 (Grade 8 History lesson 14)

- Added `g8-history-14`: **Trung Quốc và Nhật Bản từ nửa sau thế kỉ XIX đến đầu thế kỉ XX**, with three substantive sections and a matching 15-question draft quiz.
- Current inventory: **103/166 manifest units** and 103 matching manifest quiz packs. Including 8 legacy sample packs: **111 quiz sets / 1,665 questions**. Grade 8 History is 14/19; 19 Grade 8 units and 44 Grade 9 units remain.
- Validator expected totals updated to 103 manifest-aligned lessons/packs, 111 total quiz sets and 1,665 questions.
- CI passed on commit `d88e578a080cb831356649a46538a887d1add90f` through lesson 11. Lesson 12–14 and the latest validator changes require a fresh complete green run on the current head.
- All materials remain draft-only and require independent teacher/subject-matter review. No production import, publish, unlock, merge or deployment has occurred.


## Progress update — 2026-11-23 (Grade 8 History lesson 15)

- Added `g8-history-15`: **Ấn Độ và Đông Nam Á từ nửa sau thế kỉ XIX đến đầu thế kỉ XX**, with three substantive sections and a matching 15-question draft quiz.
- Current inventory: **104/166 manifest units** and 104 matching manifest quiz packs. Including 8 legacy sample packs: **112 quiz sets / 1,680 questions**. Grade 8 History is 15/19; 18 Grade 8 units and 44 Grade 9 units remain.
- Validator expected totals updated to 104 manifest-aligned lessons/packs, 112 total quiz sets and 1,680 questions.
- CI passed on commit `2660851dc528b4aeba8a337441bdb6ebc84343b1` through lesson 13. Lesson 14–15 and the latest validator changes require a fresh complete green run on the current head.
- All materials remain draft-only and require independent teacher/subject-matter review. No production import, publish, unlock, merge or deployment has occurred.


## Progress update — 2026-11-23 (Grade 8 History lesson 16)

- Added `g8-history-16`: **Việt Nam dưới triều Nguyễn (nửa đầu thế kỉ XIX)**, with three substantive sections and a matching 15-question draft quiz.
- Current inventory: **105/166 manifest units** and 105 matching manifest quiz packs. Including 8 legacy sample packs: **113 quiz sets / 1,695 questions**. Grade 8 History is 16/19; 17 Grade 8 units and 44 Grade 9 units remain.
- Validator expected totals updated to 105 manifest-aligned lessons/packs, 113 total quiz sets and 1,695 questions.
- CI passed on commit `6e5511003fdd73d9f541a30c5fa81653b88051b6` through lesson 14. Lesson 15–16 and the latest validator changes require a fresh complete green run on the current head.
- All materials remain draft-only and require independent teacher/subject-matter review. No production import, publish, unlock, merge or deployment has occurred.


## Progress update — 2026-11-23 (Grade 8 History lesson 17)

- Added `g8-history-17`: **Cuộc kháng chiến chống thực dân Pháp xâm lược từ năm 1858 đến năm 1884**, with three substantive sections and a matching 15-question draft quiz.
- Current inventory: **106/166 manifest units** and 106 matching manifest quiz packs. Including 8 legacy sample packs: **114 quiz sets / 1,710 questions**. Grade 8 History is 17/19; 16 Grade 8 units and 44 Grade 9 units remain.
- Validator expected totals updated to 106 manifest-aligned lessons/packs, 114 total quiz sets and 1,710 questions.
- CI passed on commit `6e5511003fdd73d9f541a30c5fa81653b88051b6` through lesson 14. Lesson 15–17 and the latest validator changes require a fresh complete green run on the current head.
- All materials remain draft-only and require independent teacher/subject-matter review. No production import, publish, unlock, merge or deployment has occurred.


## Progress update — 2026-11-23 (Grade 8 History lesson 18)

- Added `g8-history-18`: **Phong trào kháng chiến chống Pháp trong những năm 1885 - 1896**, with three substantive sections and a matching 15-question draft quiz.
- Current inventory: **107/166 manifest units** and 107 matching manifest quiz packs. Including 8 legacy sample packs: **115 quiz sets / 1,725 questions**. Grade 8 History is 18/19; 15 Grade 8 units and 44 Grade 9 units remain.
- Validator expected totals updated to 107 manifest-aligned lessons/packs, 115 total quiz sets and 1,725 questions.
- CI passed on commit `314eae34ce30667b9b92be23e9d3d6436136b847` through lesson 16. Lesson 17–18 and the latest validator changes require a fresh complete green run on the current head.
- All materials remain draft-only and require independent teacher/subject-matter review. No production import, publish, unlock, merge or deployment has occurred.


## Progress update — 2026-11-23 (Grade 8 History strand completed)

- Added `g8-history-19`: **Phong trào yêu nước chống Pháp ở Việt Nam từ đầu thế kỉ XX đến năm 1917**, with three substantive sections and a matching 15-question draft quiz.
- Grade 8 History is now **19/19** manifest units complete.
- Overall inventory: **108/166 manifest units** and 108 matching manifest quiz packs. Including 8 legacy sample packs: **116 quiz sets / 1,740 questions**.
- Remaining Grade 8 units: **14** (12 Geography + 2 integrated/common). Grade 9: **44** units. Total remaining: 58.
- Validator expected totals updated to 108 manifest-aligned lessons/packs, 116 total quiz sets and 1,740 questions.
- CI passed on commit `314eae34ce30667b9b92be23e9d3d6436136b847` through lesson 16. Lesson 17–19 and the latest validator changes require a fresh complete green run on the current head.
- All materials remain draft-only and require independent teacher/subject-matter review. No production import, publish, unlock, merge or deployment has occurred.


## Progress update — 2026-11-23 (Grade 8 Geography lesson 1)

- Added `g8-geography-01`: **Vị trí địa lí và phạm vi lãnh thổ Việt Nam**, with three substantive sections and a matching 15-question geography quiz.
- Grade 8 History is complete at 19/19; Grade 8 Geography is now 1/12, with two integrated/common topics still outstanding.
- Overall inventory: **109/166 manifest units** and 109 matching manifest quiz packs. Including 8 legacy sample packs: **117 quiz sets / 1,755 questions**.
- Remaining Grade 8 units: **13** (11 Geography + 2 integrated/common). Grade 9: **44** units. Total remaining: 57.
- Validator expected totals updated to 109 manifest-aligned lessons/packs, 117 total quiz sets and 1,755 questions; Grade 8 Geography has an explicit one-lesson coverage assertion.
- CI passed on commit `314eae34ce30667b9b92be23e9d3d6436136b847` through Grade 8 History lesson 16. Grade 8 History lessons 17–19 and Geography lesson 1 require a fresh complete green run on the current head.
- All materials remain draft-only and require independent teacher/subject-matter review. No production import, publish, unlock, merge or deployment has occurred.


## Progress update — 2026-11-23 (Grade 8 Geography lesson 2)

- Added `g8-geography-02`: **Địa hình Việt Nam**, with three substantive sections and a matching 15-question geography quiz.
- Grade 8 History remains complete at 19/19; Grade 8 Geography is now 2/12.
- Overall inventory: **110/166 manifest units** and 110 matching manifest quiz packs. Including 8 legacy sample packs: **118 quiz sets / 1,770 questions**.
- Remaining Grade 8 units: **12** (10 Geography + 2 integrated/common). Grade 9: **44** units. Total remaining: 56.
- Validator expected totals updated to 110 manifest-aligned lessons/packs, 118 total quiz sets and 1,770 questions; Grade 8 Geography assertion updated to two lessons.
- CI passed on commit `85b9ac3ce7feaa684b838c558f3c6c5187c2eee9` through Grade 8 History lesson 19. Grade 8 Geography lessons 1–2 and latest validator changes need a fresh complete green run on the current head.
- All materials remain draft-only and require independent teacher/subject-matter review. No production import, publish, unlock, merge or deployment has occurred.
