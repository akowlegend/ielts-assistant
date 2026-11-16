-- Bu faylni Supabase SQL Editor'ga joylab, "Run" bosing.
-- 1-hafta: barcha modullarga qo''shimcha darslar.

-- ===================== READING (yana 3 ta) =====================
insert into lessons (module, title, level, content) values
(
  'reading',
  'The History of Chocolate',
  'B2',
  '{
    "passage": "Chocolate has a history stretching back over three thousand years, beginning with the ancient Mesoamerican civilizations of Central America. The Maya and later the Aztecs did not eat chocolate as a sweet treat the way modern consumers do; instead, they prepared a bitter, frothy drink from roasted cacao beans, often mixed with chili peppers and spices. This drink held significant ceremonial value and was sometimes used as currency. When Spanish explorers brought cacao back to Europe in the sixteenth century, Europeans gradually added sugar and milk, transforming the bitter beverage into the sweet product familiar today. Industrial innovations in the nineteenth century, particularly the invention of the solid chocolate bar, made chocolate affordable for ordinary people rather than a luxury reserved for the wealthy.",
    "questions": [
      {
        "id": "q1",
        "prompt": "According to the passage, how did the Maya and Aztecs primarily consume cacao?",
        "options": ["As a solid sweet bar", "As a bitter drink, sometimes with spices", "Mixed into bread", "As a powder sprinkled on food"],
        "correct": 1
      },
      {
        "id": "q2",
        "prompt": "What change did Europeans make to the cacao drink?",
        "options": ["They removed all spices and served it cold", "They added sugar and milk", "They turned it into a currency", "They banned it entirely"],
        "correct": 1
      },
      {
        "id": "q3",
        "prompt": "What made chocolate affordable for ordinary people?",
        "options": ["Spanish exploration", "Aztec ceremonies", "The invention of the solid chocolate bar", "European taxation"],
        "correct": 2
      }
    ]
  }'::jsonb
),
(
  'reading',
  'Renewable Energy in the 21st Century',
  'C1',
  '{
    "passage": "The transition toward renewable energy sources such as solar, wind and hydroelectric power has accelerated significantly over the past two decades, driven largely by falling technology costs and growing concern about climate change. Solar panel prices, for instance, have dropped by more than eighty percent since 2010, making solar power competitive with fossil fuels in many regions without any government subsidy. Despite this progress, renewable energy still faces considerable obstacles. Intermittency remains a central challenge: solar panels generate no electricity at night, and wind turbines are useless on calm days. Large-scale battery storage and improved grid infrastructure are often proposed as solutions, yet both require substantial investment and time to implement at the necessary scale.",
    "questions": [
      {
        "id": "q1",
        "prompt": "Why has solar power become competitive with fossil fuels in many regions?",
        "options": ["Government subsidies increased dramatically", "Solar panel prices fell by more than eighty percent", "Fossil fuel production stopped", "Wind power became more expensive"],
        "correct": 1
      },
      {
        "id": "q2",
        "prompt": "What is described as a central challenge for renewable energy?",
        "options": ["High public demand", "Intermittency of supply", "Lack of scientific research", "Excessive battery production"],
        "correct": 1
      },
      {
        "id": "q3",
        "prompt": "What do battery storage and grid improvements require, according to the passage?",
        "options": ["Minimal investment and no time", "Substantial investment and time", "Government bans on fossil fuels", "No infrastructure changes"],
        "correct": 1
      }
    ]
  }'::jsonb
),
(
  'reading',
  'The Science of Sleep',
  'B2',
  '{
    "passage": "Sleep was once viewed by scientists as a largely passive state in which the brain simply shut down for a period of rest. Modern research has overturned this view entirely, revealing that the sleeping brain remains remarkably active, performing essential functions that waking life does not allow. During deep sleep, the brain consolidates memories, transferring information from short-term to long-term storage. During REM sleep, the stage most associated with vivid dreaming, the brain processes emotional experiences and may help regulate mood. Chronic sleep deprivation has been linked to a wide range of negative outcomes, including impaired concentration, weakened immune function, and an increased risk of conditions such as obesity and heart disease.",
    "questions": [
      {
        "id": "q1",
        "prompt": "How did scientists once view sleep?",
        "options": ["As an active, essential process", "As a largely passive state", "As unnecessary for health", "As identical to REM sleep"],
        "correct": 1
      },
      {
        "id": "q2",
        "prompt": "What happens during deep sleep, according to the passage?",
        "options": ["The brain stops all activity", "Memories are consolidated into long-term storage", "Dreaming becomes most vivid", "The immune system shuts down"],
        "correct": 1
      },
      {
        "id": "q3",
        "prompt": "What has chronic sleep deprivation been linked to?",
        "options": ["Improved concentration", "A stronger immune system", "Increased risk of obesity and heart disease", "Better emotional regulation"],
        "correct": 2
      }
    ]
  }'::jsonb
);

-- ===================== LISTENING (yana 2 ta) =====================
insert into lessons (module, title, level, content) values
(
  'listening',
  'Section 2 — Museum Opening Hours',
  'B1',
  '{
    "intro": "Haqiqiy audio hali qoshilmagan (2-haftada qoshiladi). Hozircha matnni oqib, boshliqlarni toldiring.",
    "transcript": "Welcome to the City History Museum information line. The museum is open Tuesday through Sunday, from nine in the morning until five in the evening. We are closed on Mondays for maintenance. Entry for adults costs twelve dollars, while students pay only seven dollars with a valid student card. Our guided tours begin every hour on the hour and last approximately forty five minutes.",
    "fields": [
      {"id": "f1", "label": "Opening day range:", "answer": "Tuesday through Sunday"},
      {"id": "f2", "label": "Adult ticket price:", "answer": "12 dollars"},
      {"id": "f3", "label": "Tour duration:", "answer": "45 minutes"}
    ]
  }'::jsonb
),
(
  'listening',
  'Section 3 — University Course Enquiry',
  'B2',
  '{
    "intro": "Haqiqiy audio hali qoshilmagan (2-haftada qoshiladi). Hozircha matnni oqib, boshliqlarni toldiring.",
    "transcript": "Good afternoon, I am calling to ask about the Environmental Science course. The course runs for three years full time, and applications must be submitted by the fifteenth of January. Successful applicants will need a minimum grade point average of three point five from their previous studies. The course coordinator is Doctor Sarah Mitchell, and she is available for enquiries every Wednesday afternoon.",
    "fields": [
      {"id": "f1", "label": "Course duration:", "answer": "three years"},
      {"id": "f2", "label": "Application deadline:", "answer": "15th of January"},
      {"id": "f3", "label": "Course coordinator:", "answer": "Doctor Sarah Mitchell"}
    ]
  }'::jsonb
);

-- ===================== WRITING (yana 2 ta) =====================
insert into lessons (module, title, level, content) values
(
  'writing',
  'Problem and Solution — Urban Traffic',
  'B2',
  '{
    "prompt": "In many major cities, traffic congestion has become a serious problem. What problems does this cause, and what measures could be taken to solve it?"
  }'::jsonb
),
(
  'writing',
  'Advantages and Disadvantages — Remote Work',
  'C1',
  '{
    "prompt": "More companies now allow employees to work from home instead of coming to the office. What are the advantages and disadvantages of this trend?"
  }'::jsonb
);

-- ===================== SPEAKING (yana 2 ta) =====================
insert into lessons (module, title, level, content) values
(
  'speaking',
  'Part 2 — A memorable trip',
  'B2',
  '{
    "cue_card": "Describe a memorable trip you have taken. You should say: where you went, who you went with, what you did there, and explain why it was memorable for you."
  }'::jsonb
),
(
  'speaking',
  'Part 1 — Hometown and daily life',
  'B1',
  '{
    "cue_card": "Let us talk about your hometown. Where is it located? What do you like most about it? What do you usually do in your free time there? Do you think you will continue living there in the future?"
  }'::jsonb
);

-- ===================== GENERAL ENGLISH (yana 1 ta) =====================
insert into lessons (module, title, level, content) values
(
  'general',
  'Grammar — Modals of Possibility',
  'B1',
  '{
    "questions": [
      {
        "id": "g1",
        "prompt": "It ___ rain later, so take an umbrella just in case.",
        "options": ["must", "might", "can", "need"],
        "correct": 1
      },
      {
        "id": "g2",
        "prompt": "She is not answering her phone. She ___ be busy at work.",
        "options": ["must", "can", "would", "shall"],
        "correct": 0
      },
      {
        "id": "g3",
        "prompt": "You ___ be joking! I do not believe that story at all.",
        "options": ["might", "must", "could", "shall"],
        "correct": 1
      }
    ]
  }'::jsonb
);
