-- Bu faylni Supabase SQL Editorga joylab, Run bosing.
-- Rasmlardagi royxatdan qolgan savol turlarini toldiradi:
-- Reading: Flow-chart Completion, Short Answer Question
-- Listening: Map/Plan/Diagram Labeling, Flow-chart Completion, Matching, Short Answer Question

-- ===================== READING: Flow-chart Completion =====================
insert into lessons (module, title, level, question_type, content) values
(
  'reading',
  'How Household Recycling Is Processed',
  'B1',
  'Flow-chart Completion',
  '{
    "section_label": "Passage 7",
    "passage": "Once household recycling is collected from the kerbside, it begins a multi-stage journey before becoming new material. First, the mixed recycling is transported to a sorting facility, where workers and machines separate it by material type, such as paper, glass, plastic, and metal. Second, each material category is cleaned to remove food residue and other contamination, since dirty material can ruin an entire batch during reprocessing. Third, the cleaned material is shredded or crushed into smaller pieces, making it easier to melt or pulp depending on the material. Fourth, the processed material is sent to manufacturers, who melt plastic and metal or pulp paper to create raw material for new products. Finally, these raw materials are used to manufacture new items, which are sold back to consumers, completing the cycle.",
    "fields": [
      {"id":"p7f1","label":"Step 1 - recycling is transported to a:","answer":"sorting facility"},
      {"id":"p7f2","label":"Step 2 - material is cleaned to remove:","answer":"food residue"},
      {"id":"p7f3","label":"Step 3 - material is shredded or:","answer":"crushed"},
      {"id":"p7f4","label":"Step 5 - new items are manufactured and sold back to:","answer":"consumers"}
    ]
  }'::jsonb
);

-- ===================== READING: Short Answer Question =====================
insert into lessons (module, title, level, question_type, content) values
(
  'reading',
  'The Economics of Street Markets',
  'B1',
  'Short Answer Question',
  '{
    "section_label": "Passage 8",
    "passage": "Street markets remain a vital part of commerce in many cities, offering lower overhead costs than permanent shops since vendors rent only a stall rather than an entire building. A study of three major cities found that market vendors typically earned slightly less per month than shop owners selling similar goods, yet reported higher satisfaction with their working hours, since most markets operate only two or three days per week. The same study found that customers were drawn to markets primarily by lower prices, followed by the freshness of produce, and lastly by the social atmosphere of bargaining directly with sellers. Answer each question using no more than three words taken from the passage.",
    "fields": [
      {"id":"p8f1","label":"What do vendors rent instead of a building?","answer":"a stall"},
      {"id":"p8f2","label":"How many days per week do most markets operate?","answer":"two or three"},
      {"id":"p8f3","label":"What was the top reason customers gave for visiting markets?","answer":"lower prices"}
    ]
  }'::jsonb
);

-- ===================== LISTENING: Map/Plan/Diagram Labeling =====================
insert into lessons (module, title, level, question_type, content) values
(
  'listening',
  'Finding Your Way Around the Conference Centre',
  'B2',
  'Map/Plan/Diagram Labeling',
  '{
    "section_label": "Section 7",
    "intro": "Haqiqiy audio hali yoq. Reja rasmi hali qoshilmagan, shuning uchun tasvirga tayanib javob bering. Rejada: kirish eshigi markazda, A - chap tomonda birinchi xona, B - chapda ikkinchi xona, C - ong tomonda birinchi xona, D - ong tomonda ikkinchi xona, E - orqada katta zal.",
    "transcript": "As you enter through the main door, the registration desk is immediately on your right, which is room C. If you continue past it, room D at the far right is where the technology exhibits are. On the left side, the first room, A, is reserved for morning workshops, while room B further along the left side hosts the networking lunch. At the very back of the building, the large hall E is used for the main keynote speech.",
    "questions": [
      {"id":"l7q1","prompt":"Where is the registration desk?","options":["Room A","Room B","Room C","Room D"],"correct":2},
      {"id":"l7q2","prompt":"Where are the technology exhibits?","options":["Room A","Room B","Room C","Room D"],"correct":3},
      {"id":"l7q3","prompt":"Where is the networking lunch held?","options":["Room A","Room B","Room E","Room C"],"correct":1},
      {"id":"l7q4","prompt":"Where is the main keynote speech held?","options":["Room A","Room C","Room D","Room E (the large hall)"],"correct":3}
    ]
  }'::jsonb
);

-- ===================== LISTENING: Flow-chart Completion =====================
insert into lessons (module, title, level, question_type, content) values
(
  'listening',
  'Steps to Apply for a Student Visa',
  'B2',
  'Flow-chart Completion',
  '{
    "section_label": "Section 8",
    "intro": "Haqiqiy audio hali yoq. Hozircha matnni oqib, bosqichlarni toldiring.",
    "transcript": "The visa process has four steps. First, applicants must gather their documents, including a passport and an acceptance letter from the university. Second, they complete the online application form and pay the processing fee. Third, applicants attend an interview at the embassy, usually scheduled within three weeks. Finally, once approved, the visa is printed directly into the passport, which is then returned by post.",
    "fields": [
      {"id":"l8f1","label":"Step 1 - gather documents including passport and:","answer":"acceptance letter"},
      {"id":"l8f2","label":"Step 2 - complete the form and pay the:","answer":"processing fee"},
      {"id":"l8f3","label":"Step 3 - attend an interview at the:","answer":"embassy"},
      {"id":"l8f4","label":"Step 4 - visa is printed into the passport and returned by:","answer":"post"}
    ]
  }'::jsonb
);

-- ===================== LISTENING: Matching =====================
insert into lessons (module, title, level, question_type, content) values
(
  'listening',
  'Four Colleagues Discuss Their Work Preferences',
  'B2',
  'Matching',
  '{
    "section_label": "Section 9",
    "intro": "Haqiqiy audio hali yoq. Har bir kishi uchun mos fikrni tanlang (variantlar takrorlanishi mumkin).",
    "transcript": "James said he prefers working early in the morning when the office is quiet. Sarah mentioned she gets more done late at night at home. Michael said he works best in short bursts with frequent breaks. Priya explained that she prefers one long, uninterrupted block of time in the afternoon.",
    "questions": [
      {"id":"l9q1","prompt":"James prefers:","options":["Working early in a quiet office","Working late at night at home","Short bursts with breaks","One long afternoon block"],"correct":0},
      {"id":"l9q2","prompt":"Sarah prefers:","options":["Working early in a quiet office","Working late at night at home","Short bursts with breaks","One long afternoon block"],"correct":1},
      {"id":"l9q3","prompt":"Michael prefers:","options":["Working early in a quiet office","Working late at night at home","Short bursts with breaks","One long afternoon block"],"correct":2},
      {"id":"l9q4","prompt":"Priya prefers:","options":["Working early in a quiet office","Working late at night at home","Short bursts with breaks","One long afternoon block"],"correct":3}
    ]
  }'::jsonb
);

-- ===================== LISTENING: Short Answer Question =====================
insert into lessons (module, title, level, question_type, content) values
(
  'listening',
  'Customer Service Call About a Delayed Order',
  'B1',
  'Short Answer Question',
  '{
    "section_label": "Section 10",
    "intro": "Haqiqiy audio hali yoq. Har bir javobni koping uch sozdan iborat qiling.",
    "transcript": "I am calling about order number four four two one, which was supposed to arrive last Tuesday. I am sorry for the delay, it seems there was a problem at the warehouse. Can you tell me when it will arrive now? Our system shows it will now arrive this Friday instead.",
    "fields": [
      {"id":"l10f1","label":"What is the order number?","answer":"4421"},
      {"id":"l10f2","label":"Where did the problem occur?","answer":"the warehouse"},
      {"id":"l10f3","label":"When will the order now arrive?","answer":"this Friday"}
    ]
  }'::jsonb
);
