-- Bu faylni Supabase SQL Editor'ga joylab, "Run" bosing.
-- Darajalar (B1/B2/C1) va savol turlari bo''yicha filtrlash uchun.

alter table lessons add column if not exists question_type text;

-- Mavjud Reading darslariga savol turini belgilaymiz
update lessons set question_type = 'Multiple Choice' where module = 'reading' and question_type is null;
update lessons set question_type = 'Note/Form Completion' where module = 'listening' and question_type is null;
update lessons set question_type = 'Multiple Choice' where module = 'general' and question_type is null;

-- B1 darajasida yetishmayotgan Reading darslarini qo''shamiz (turli savol turlari bilan)
insert into lessons (module, title, level, question_type, content) values
(
  'reading',
  'City Libraries Today (Matching Headings)',
  'B1',
  'Matching Headings',
  '{
    "passage": "Paragraph A: Many city libraries have changed significantly in the last decade. Instead of simply lending books, they now offer free internet access, community meeting rooms, and even tools for borrowing. Paragraph B: Despite these changes, some people worry that libraries are becoming less relevant because so much information is now available online. Librarians argue, however, that libraries still play an important role by offering a quiet, free space for study and by helping people who do not have internet access at home.",
    "questions": [
      {
        "id": "h1",
        "prompt": "Choose the best heading for Paragraph A.",
        "options": ["The decline of reading", "New services offered by modern libraries", "Why libraries are closing down", "The history of printing"],
        "correct": 1
      },
      {
        "id": "h2",
        "prompt": "Choose the best heading for Paragraph B.",
        "options": ["Concerns about relevance and the librarians response", "A guide to borrowing tools", "The cost of running a library", "Internet access in rural areas"],
        "correct": 0
      }
    ]
  }'::jsonb
),
(
  'reading',
  'Introducing a New Colleague (Note Completion)',
  'B1',
  'Note Completion',
  '{
    "passage": "Dear Team, I am pleased to introduce our new marketing assistant, Laura Bennett, who will join us starting next Monday. Laura previously worked for three years at a small advertising agency in Manchester, where she specialised in social media campaigns. She holds a degree in Communications from the University of Leeds. In her free time, Laura enjoys photography and hiking. Please make her feel welcome during her first few weeks.",
    "fields": [
      {"id": "n1", "label": "New employee name:", "answer": "Laura Bennett"},
      {"id": "n2", "label": "Previous workplace city:", "answer": "Manchester"},
      {"id": "n3", "label": "University attended:", "answer": "University of Leeds"}
    ]
  }'::jsonb
);
