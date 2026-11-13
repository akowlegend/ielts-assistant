-- Bu faylni Supabase SQL Editorga joylab, Run bosing.
-- Haqiqiy, bepul IELTS video darslari (IELTS Liz kanalidan, 2 million+ obunachi,
-- eng ishonchli bepul IELTS manbalaridan biri).

insert into lessons (module, title, level, question_type, content) values
(
  'video',
  'How to Write an Introduction (Writing Task 2)',
  'B2',
  'Writing',
  '{"youtube_id": "YngqHl_BLOU", "description": "IELTS Writing Task 2 uchun kirish qismini qanday yozish kerakligi haqida."}'::jsonb
),
(
  'video',
  'Conclusion Linking Words (Writing Task 2)',
  'B2',
  'Writing',
  '{"youtube_id": "SpAIW4p8wkw", "description": "Insho xulosasida ishlatiladigan toqri bogloвchi soz va iboralar."}'::jsonb
),
(
  'video',
  'Paraphrasing Tips for IELTS Writing',
  'B2',
  'Writing',
  '{"youtube_id": "rlsqbSFOBCg", "description": "Task 1 va Task 2 uchun togri parafraz qilish usullari va umumiy xatolar."}'::jsonb
),
(
  'video',
  'Grammar: Connecting Sentences',
  'B1',
  'Grammar',
  '{"youtube_id": "-nkwOxLwyQ8", "description": "Gaplarni togri boglovchilar bilan ulash — grammatika darsi."}'::jsonb
),
(
  'video',
  'How Many Words Should You Write?',
  'B1',
  'Writing',
  '{"youtube_id": "TcQKUwmOMFo", "description": "Writing Task 1 va 2 uchun minimal soz soni va jazo qoidalari."}'::jsonb
);
