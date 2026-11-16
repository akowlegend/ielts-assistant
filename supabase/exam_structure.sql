-- Bu faylni Supabase SQL Editorga joylab, Run bosing.
-- Reading/Listening -> Test + Passage/Section tuzilishiga otkaziladi.
-- Writing -> Task 1 / Task 2 turlariga ajratiladi.
-- Speaking -> Part 1 / Part 2 / Part 3 ga ajratiladi, taymer uchun.
-- CEFR moduli ozgarmaydi (daraja tizimi shu yerda qoladi).

-- ===================== READING: Test 1 =====================
update lessons set content = content || '{"test_number":1,"section_label":"Passage 1"}'::jsonb
where module='reading' and title = 'The Rise of Urban Farming';
update lessons set content = content || '{"test_number":1,"section_label":"Passage 2"}'::jsonb
where module='reading' and title = 'The History of Chocolate';
update lessons set content = content || '{"test_number":1,"section_label":"Passage 3"}'::jsonb
where module='reading' and title = 'Renewable Energy in the 21st Century';

-- ===================== READING: Test 2 =====================
update lessons set content = content || '{"test_number":2,"section_label":"Passage 1"}'::jsonb
where module='reading' and title = 'The Science of Sleep';
update lessons set content = content || '{"test_number":2,"section_label":"Passage 2"}'::jsonb
where module='reading' and title = 'City Libraries Today (Matching Headings)';
update lessons set content = content || '{"test_number":2,"section_label":"Passage 3"}'::jsonb
where module='reading' and title = 'Introducing a New Colleague (Note Completion)';

-- ===================== LISTENING: Test 1 =====================
update lessons set content = content || '{"test_number":1,"section_label":"Section 1"}'::jsonb
where module='listening' and title = 'Section 1 — Library Membership Form';
update lessons set content = content || '{"test_number":1,"section_label":"Section 2"}'::jsonb
where module='listening' and title = 'Section 2 — Museum Opening Hours';
update lessons set content = content || '{"test_number":1,"section_label":"Section 3"}'::jsonb
where module='listening' and title = 'Section 3 — University Course Enquiry';

-- Yangi: Section 4 (akademik maruza uslubida, Test 1 ni tolaga chiqarish uchun)
insert into lessons (module, title, level, question_type, content) values
(
  'listening',
  'Section 4 — Lecture on City Planning',
  'C1',
  'Note Completion',
  '{
    "test_number": 1,
    "section_label": "Section 4",
    "intro": "Haqiqiy audio hali qoshilmagan. Hozircha matnni oqib, boshliqlarni toldiring.",
    "transcript": "Today I want to talk about modern city planning. One major challenge is population density, which planners address through vertical housing. Another key factor is green space, since parks improve both air quality and resident wellbeing. Finally, transportation networks must be designed before new districts are built, not after.",
    "fields": [
      {"id": "s4f1", "label": "Planners address density through:", "answer": "vertical housing"},
      {"id": "s4f2", "label": "Green space improves air quality and:", "answer": "resident wellbeing"},
      {"id": "s4f3", "label": "What must be designed before new districts:", "answer": "transportation networks"}
    ]
  }'::jsonb
);

-- ===================== WRITING: Task 2 (mavjudlarni belgilash) =====================
update lessons set question_type = 'Task 2 - Opinion Essay'
where module='writing' and title ilike '%Technology and Creativity%';
update lessons set question_type = 'Task 2 - Problem and Solution'
where module='writing' and title ilike '%Urban Traffic%';
update lessons set question_type = 'Task 2 - Advantages and Disadvantages'
where module='writing' and title ilike '%Remote Work%';

-- ===================== WRITING: Task 1 (yangi) =====================
insert into lessons (module, title, level, question_type, content) values
(
  'writing',
  'Task 1 - Electricity Production by Source (2000-2020)',
  'B2',
  'Task 1 - Line Graph (with years)',
  '{
    "prompt": "The line graph below shows the percentage of electricity produced from three sources (coal, natural gas, and renewables) in a country between 2000 and 2020. In 2000, coal accounted for 60 percent of electricity production, natural gas for 30 percent, and renewables for only 10 percent. By 2010, coal had fallen to 45 percent while renewables rose to 20 percent, and natural gas remained steady at around 30 percent. By 2020, renewables had risen sharply to 40 percent, overtaking natural gas at 28 percent, while coal had declined to just 32 percent. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words."
  }'::jsonb
),
(
  'writing',
  'Task 1 - Water Purification Process',
  'B2',
  'Task 1 - Process',
  '{
    "prompt": "The diagram below shows the process by which water is purified for drinking in a treatment plant. The process has five stages: first, raw water is collected from a river and passed through a screen to remove large debris. Second, the water enters a sedimentation tank where heavier particles settle to the bottom. Third, the water flows through a sand filter to remove finer particles. Fourth, chlorine is added to kill bacteria and other pathogens. Finally, the treated water is stored in a clean reservoir before being pumped to homes. Summarise the information by selecting and reporting the main features. Write at least 150 words."
  }'::jsonb
);

-- ===================== SPEAKING: Part 1/2/3 belgilash =====================
update lessons set content = content || '{"part":1}'::jsonb
where module='speaking' and title ilike '%Hometown%';
update lessons set content = content || '{"part":2}'::jsonb
where module='speaking' and title ilike '%skill%';
update lessons set content = content || '{"part":2}'::jsonb
where module='speaking' and title ilike '%memorable trip%';

-- Yangi: Part 3 (muhokama savollari, Part 2 mavzusining davomi)
insert into lessons (module, title, level, question_type, content) values
(
  'speaking',
  'Part 3 — Discussion: Skills and Learning',
  'C1',
  'Part 3 - Discussion',
  '{
    "part": 3,
    "cue_card": "Let us consider learning skills in general. Why do you think some people find it harder to learn new skills as adults compared to children? Do you believe schools should focus more on practical skills rather than academic subjects? How might technology change the way people learn new skills in the future?"
  }'::jsonb
);
