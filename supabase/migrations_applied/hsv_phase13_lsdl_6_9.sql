-- Phase 13: Publish Lịch sử và Địa lí Grades 6-9 (Kết nối tri thức với cuộc sống)
-- Scope: 48 chapters, 166 lessons, 2,490 questions (Grades 6: 50, 7: 39, 8: 33, 9: 44)
-- Target project: owqbwykjabwevkbjroym (idempotent).

insert into public.subjects (code, name, is_active) values
  ('lsdl', 'Lịch sử và Địa lí', true)
on conflict (code) do update
  set name = excluded.name,
      is_active = true;

with chapter_seed(subject_code, grade_id, code, sequence_no, title) as (
  values
    ('lsdl', 6, 'lsdl6-c1', 1, '[Lịch sử] Vì sao phải học lịch sử?'),
    ('lsdl', 6, 'lsdl6-c2', 2, '[Lịch sử] Xã hội nguyên thủy'),
    ('lsdl', 6, 'lsdl6-c3', 3, '[Lịch sử] Xã hội cổ đại'),
    ('lsdl', 6, 'lsdl6-c4', 4, '[Lịch sử] Đông Nam Á từ những thế kỉ tiếp giáp đầu Công nguyên đến thế kỉ X'),
    ('lsdl', 6, 'lsdl6-c5', 5, '[Lịch sử] Việt Nam từ khoảng thế kỉ VII trước Công nguyên đến đầu thế kỉ X'),
    ('lsdl', 6, 'lsdl6-c6', 6, '[Địa lí] Bản đồ - phương tiện thể hiện bề mặt Trái Đất'),
    ('lsdl', 6, 'lsdl6-c7', 7, '[Địa lí] Trái Đất - hành tinh của hệ Mặt Trời'),
    ('lsdl', 6, 'lsdl6-c8', 8, '[Địa lí] Cấu tạo của Trái Đất. Vỏ Trái Đất'),
    ('lsdl', 6, 'lsdl6-c9', 9, '[Địa lí] Khí hậu và biến đổi khí hậu'),
    ('lsdl', 6, 'lsdl6-c10', 10, '[Địa lí] Nước trên Trái Đất'),
    ('lsdl', 6, 'lsdl6-c11', 11, '[Địa lí] Đất và sinh vật trên Trái Đất'),
    ('lsdl', 6, 'lsdl6-c12', 12, '[Địa lí] Con người và thiên nhiên'),
    ('lsdl', 7, 'lsdl7-c1', 1, '[Lịch sử] Tây Âu từ thế kỉ V đến nửa đầu thế kỉ XVI'),
    ('lsdl', 7, 'lsdl7-c2', 2, '[Lịch sử] Trung Quốc và Ấn Độ thời trung đại'),
    ('lsdl', 7, 'lsdl7-c3', 3, '[Lịch sử] Đông Nam Á từ nửa sau thế kỉ X đến nửa đầu thế kỉ XVI'),
    ('lsdl', 7, 'lsdl7-c4', 4, '[Lịch sử] Đất nước dưới thời các vương triều Ngô - Đinh - Tiền Lê (939 - 1009)'),
    ('lsdl', 7, 'lsdl7-c5', 5, '[Lịch sử] Đại Việt thời Lý - Trần - Hồ (1009 - 1407)'),
    ('lsdl', 7, 'lsdl7-c6', 6, '[Lịch sử] Khởi nghĩa Lam Sơn và Đại Việt thời Lê sơ (1418 - 1527)'),
    ('lsdl', 7, 'lsdl7-c7', 7, '[Lịch sử] Vùng đất phía Nam Việt Nam từ đầu thế kỉ X đến đầu thế kỉ XVI'),
    ('lsdl', 7, 'lsdl7-c8', 8, '[Địa lí] Châu Âu'),
    ('lsdl', 7, 'lsdl7-c9', 9, '[Địa lí] Châu Á'),
    ('lsdl', 7, 'lsdl7-c10', 10, '[Địa lí] Châu Phi'),
    ('lsdl', 7, 'lsdl7-c11', 11, '[Địa lí] Châu Mỹ'),
    ('lsdl', 7, 'lsdl7-c12', 12, '[Địa lí] Châu Đại Dương và châu Nam Cực'),
    ('lsdl', 7, 'lsdl7-c13', 13, '[Chủ đề chung] Chủ đề liên môn Lịch sử – Địa lí'),
    ('lsdl', 8, 'lsdl8-c1', 1, '[Lịch sử] Châu Âu và Bắc Mỹ từ nửa sau thế kỉ XVI đến thế kỉ XVIII'),
    ('lsdl', 8, 'lsdl8-c2', 2, '[Lịch sử] Đông Nam Á từ nửa sau thế kỉ XVI đến giữa thế kỉ XIX'),
    ('lsdl', 8, 'lsdl8-c3', 3, '[Lịch sử] Việt Nam từ đầu thế kỉ XVI đến thế kỉ XVIII'),
    ('lsdl', 8, 'lsdl8-c4', 4, '[Lịch sử] Châu Âu và nước Mỹ từ cuối thế kỉ XVIII đến đầu thế kỉ XX'),
    ('lsdl', 8, 'lsdl8-c5', 5, '[Lịch sử] Sự phát triển của khoa học, kĩ thuật, văn học, nghệ thuật trong các thế kỉ XVIII - XIX'),
    ('lsdl', 8, 'lsdl8-c6', 6, '[Lịch sử] Châu Á từ nửa sau thế kỉ XIX đến nửa đầu thế kỉ XX'),
    ('lsdl', 8, 'lsdl8-c7', 7, '[Lịch sử] Việt Nam từ thế kỉ XIX đến đầu thế kỉ XX'),
    ('lsdl', 8, 'lsdl8-c8', 8, '[Địa lí] Vị trí địa lí và phạm vi lãnh thổ, địa hình và khoáng sản Việt Nam'),
    ('lsdl', 8, 'lsdl8-c9', 9, '[Địa lí] Khí hậu và thủy văn Việt Nam'),
    ('lsdl', 8, 'lsdl8-c10', 10, '[Địa lí] Thổ nhưỡng và sinh vật Việt Nam'),
    ('lsdl', 8, 'lsdl8-c11', 11, '[Địa lí] Biển đảo Việt Nam'),
    ('lsdl', 8, 'lsdl8-c12', 12, '[Chủ đề chung] Chủ đề liên môn Lịch sử – Địa lí'),
    ('lsdl', 9, 'lsdl9-c1', 1, '[Lịch sử] Thế giới từ năm 1918 đến năm 1945'),
    ('lsdl', 9, 'lsdl9-c2', 2, '[Lịch sử] Việt Nam từ năm 1918 đến năm 1945'),
    ('lsdl', 9, 'lsdl9-c3', 3, '[Lịch sử] Thế giới từ năm 1945 đến năm 1991'),
    ('lsdl', 9, 'lsdl9-c4', 4, '[Lịch sử] Việt Nam từ năm 1945 đến năm 1991'),
    ('lsdl', 9, 'lsdl9-c5', 5, '[Lịch sử] Thế giới từ năm 1991 đến nay'),
    ('lsdl', 9, 'lsdl9-c6', 6, '[Lịch sử] Việt Nam từ năm 1976 đến nay'),
    ('lsdl', 9, 'lsdl9-c7', 7, '[Lịch sử] Cách mạng khoa học - kĩ thuật và xu thế toàn cầu hóa'),
    ('lsdl', 9, 'lsdl9-c8', 8, '[Địa lí] Địa lí dân cư Việt Nam'),
    ('lsdl', 9, 'lsdl9-c9', 9, '[Địa lí] Địa lí các ngành kinh tế'),
    ('lsdl', 9, 'lsdl9-c10', 10, '[Địa lí] Sự phân hóa lãnh thổ'),
    ('lsdl', 9, 'lsdl9-c11', 11, '[Chủ đề chung] Chủ đề liên môn Lịch sử – Địa lí')
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
