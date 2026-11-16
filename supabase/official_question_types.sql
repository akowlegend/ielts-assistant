-- Bu faylni Supabase SQL Editorga joylab, Run bosing.
-- Rasmiy IELTS savol turi nomlariga moslashtirish + yetishmagan turlarni qoshish.

-- Mavjud darslarni rasmiy nomlash bilan yangilaymiz
update lessons set question_type = 'Identifying Information (True/False/Not Given) + Note Completion'
where module = 'reading' and title = 'The Lost Art of Handwritten Letters';
update lessons set question_type = 'Multiple Choice + Identifying Information (True/False/Not Given)'
where module = 'reading' and title = 'The Surprising Intelligence of Octopuses';

-- ===================== READING: Table Completion (yangi) =====================
insert into lessons (module, title, level, question_type, content) values
(
  'reading',
  'Comparing Three Ancient Capitals',
  'B2',
  'Table Completion',
  '{
    "section_label": "Passage 5",
    "passage": "Historians comparing ancient capital cities often focus on three contrasting examples: Rome, Chang an, and Tenochtitlan. Rome, capital of the Roman Empire, reached a population of roughly one million people at its height around the second century. Its water supply depended on an extensive network of aqueducts, some stretching over fifty kilometres from mountain springs into the city centre. Chang an, capital of the Tang Dynasty, was even larger in certain periods, with population estimates reaching one million as well, though its water came primarily from nearby rivers channelled through a grid of canals rather than raised aqueducts. Tenochtitlan, the Aztec capital built on an island in Lake Texcoco, supported a smaller population of around two hundred thousand, and uniquely relied on a system of causeways and canals that served both transport and the irrigation of floating agricultural gardens known as chinampas.",
    "fields": [
      {"id":"p5f1","label":"Rome - water source:","answer":"aqueducts"},
      {"id":"p5f2","label":"Chang an - water source:","answer":"canals"},
      {"id":"p5f3","label":"Tenochtitlan - approximate population:","answer":"two hundred thousand"},
      {"id":"p5f4","label":"Tenochtitlan - floating gardens are called:","answer":"chinampas"}
    ]
  }'::jsonb
);

-- ===================== READING: Yes/No/Not Given (yangi, fikr-asosli matn) =====================
insert into lessons (module, title, level, question_type, content) values
(
  'reading',
  'Should Cities Ban Private Cars from Their Centres?',
  'C1',
  'Yes/No/Not Given',
  '{
    "section_label": "Passage 6",
    "passage": "A growing number of city planners now argue that private cars should be banned entirely from historic city centres, not merely restricted. In my view, this position is both economically shortsighted and socially unfair. Shop owners in these areas frequently depend on customers who drive in from surrounding suburbs, and removing car access altogether would almost certainly harm local businesses that cannot survive on foot traffic alone. Furthermore, elderly and disabled residents, who may struggle with public transport, would be disproportionately affected by such a ban, turning what sounds like an environmental improvement into a policy that quietly excludes vulnerable groups. I do believe that reducing car use in city centres is a worthwhile goal, and cities are right to invest heavily in cycling infrastructure, which has proven effective in several European cities. However, a complete ban goes further than necessary, when a well-designed congestion charge could achieve similar environmental benefits while still allowing essential access.",
    "questions": [
      {"id":"p6q1","prompt":"The writer believes a complete ban on cars would be fair to all residents.","options":["YES","NO","NOT GIVEN"],"correct":1},
      {"id":"p6q2","prompt":"The writer believes reducing car use in city centres is a worthwhile goal.","options":["YES","NO","NOT GIVEN"],"correct":0},
      {"id":"p6q3","prompt":"The writer believes a congestion charge could achieve similar benefits to a ban.","options":["YES","NO","NOT GIVEN"],"correct":0},
      {"id":"p6q4","prompt":"The writer has personally tested the cycling infrastructure described.","options":["YES","NO","NOT GIVEN"],"correct":2}
    ]
  }'::jsonb
);

-- ===================== LISTENING: Multiple Choice (yangi) =====================
insert into lessons (module, title, level, question_type, content) values
(
  'listening',
  'University Orientation Talk',
  'B2',
  'Multiple Choice',
  '{
    "section_label": "Section 5",
    "intro": "Haqiqiy audio hali yoq. Hozircha matnni oqib, savollarga javob bering.",
    "transcript": "Welcome to orientation. The library is open until midnight during exam weeks, but closes at six in the evening otherwise. International students should register with the health centre within their first two weeks. The student union office handles club registrations, not the main administration building.",
    "questions": [
      {"id":"l5q1","prompt":"When does the library close during exam weeks?","options":["Six in the evening","Midnight","It stays open 24 hours","It is closed during exams"],"correct":1},
      {"id":"l5q2","prompt":"What must international students do within two weeks?","options":["Join a club","Register with the health centre","Visit the library","Meet the dean"],"correct":1},
      {"id":"l5q3","prompt":"Who handles club registrations?","options":["The health centre","The main administration building","The student union office","The library"],"correct":2}
    ]
  }'::jsonb
);

-- ===================== LISTENING: Table Completion (yangi) =====================
insert into lessons (module, title, level, question_type, content) values
(
  'listening',
  'Gym Membership Options',
  'B1',
  'Table Completion',
  '{
    "section_label": "Section 6",
    "intro": "Haqiqiy audio hali yoq. Hozircha matnni oqib, jadvalni toldiring.",
    "transcript": "We offer three membership types. The Basic plan costs twenty five dollars a month and includes gym access only. The Standard plan costs forty dollars a month and adds group classes. The Premium plan costs sixty dollars a month and includes a personal trainer session each week.",
    "fields": [
      {"id":"l6f1","label":"Basic plan - price per month:","answer":"25 dollars"},
      {"id":"l6f2","label":"Standard plan - includes:","answer":"group classes"},
      {"id":"l6f3","label":"Premium plan - price per month:","answer":"60 dollars"}
    ]
  }'::jsonb
);
