-- Bu faylni Supabase SQL Editorga joylab, Run bosing.
-- CEFR moduli uchun A1-C1 darajalarida Grammar va Reading mashqlari.

-- ===================== A1 =====================
insert into lessons (module, title, level, question_type, content) values
(
  'cefr',
  'A1 Grammar - Be verb and basic pronouns',
  'A1',
  'Grammar & Vocabulary',
  '{
    "questions": [
      {"id":"a1g1","prompt":"She ___ a teacher.","options":["am","is","are","be"],"correct":1},
      {"id":"a1g2","prompt":"They ___ from Spain.","options":["is","am","are","be"],"correct":2},
      {"id":"a1g3","prompt":"___ you a student?","options":["Is","Are","Am","Be"],"correct":1}
    ]
  }'::jsonb
),
(
  'cefr',
  'A1 Reading - My Family',
  'A1',
  'Reading',
  '{
    "passage": "My name is Tom. I have a small family. My mother is a nurse and my father is a driver. I have one sister. Her name is Anna. We live in a small house near the park. Every weekend we visit our grandparents.",
    "questions": [
      {"id":"a1r1","prompt":"What is Toms mothers job?","options":["Driver","Nurse","Teacher","Student"],"correct":1},
      {"id":"a1r2","prompt":"Where does Toms family live?","options":["Near the park","In the city center","Near the school","Far from the park"],"correct":0}
    ]
  }'::jsonb
);

-- ===================== A2 =====================
insert into lessons (module, title, level, question_type, content) values
(
  'cefr',
  'A2 Grammar - Past Simple',
  'A2',
  'Grammar & Vocabulary',
  '{
    "questions": [
      {"id":"a2g1","prompt":"I ___ to the cinema last night.","options":["go","went","goes","going"],"correct":1},
      {"id":"a2g2","prompt":"She ___ not come to school yesterday.","options":["did","does","do","was"],"correct":0},
      {"id":"a2g3","prompt":"___ you watch the match last Sunday?","options":["Do","Did","Does","Were"],"correct":1}
    ]
  }'::jsonb
),
(
  'cefr',
  'A2 Reading - A Weekend Trip',
  'A2',
  'Reading',
  '{
    "passage": "Last weekend, Maria and her friends went camping near a lake. They arrived on Saturday morning and set up their tents close to the water. In the afternoon, they went swimming and cooked food on a small fire. At night, they told stories under the stars. On Sunday, they packed their bags and drove back home, tired but happy.",
    "questions": [
      {"id":"a2r1","prompt":"When did Maria and her friends arrive?","options":["Friday night","Saturday morning","Sunday morning","Saturday night"],"correct":1},
      {"id":"a2r2","prompt":"What did they do at night?","options":["Went swimming","Drove home","Told stories","Packed bags"],"correct":2}
    ]
  }'::jsonb
);

-- ===================== B1 =====================
insert into lessons (module, title, level, question_type, content) values
(
  'cefr',
  'B1 Grammar - First Conditional',
  'B1',
  'Grammar & Vocabulary',
  '{
    "questions": [
      {"id":"b1g1","prompt":"If it rains, I ___ stay at home.","options":["will","would","was","am"],"correct":0},
      {"id":"b1g2","prompt":"If she studies hard, she ___ pass the exam.","options":["will","passed","would","pass"],"correct":0},
      {"id":"b1g3","prompt":"We will go to the beach if the weather ___ good.","options":["will be","is","was","be"],"correct":1}
    ]
  }'::jsonb
),
(
  'cefr',
  'B1 Reading - Learning a New Language',
  'B1',
  'Reading',
  '{
    "passage": "Learning a new language can be challenging, but it also brings many benefits. Research shows that people who speak more than one language often find it easier to switch between tasks and solve problems creatively. However, consistent practice is essential; without regular use, even well learned vocabulary can be forgotten within a few months. Many language learners find that combining classroom study with real conversations produces the fastest progress.",
    "questions": [
      {"id":"b1r1","prompt":"What benefit is linked to speaking more than one language?","options":["Better memory for numbers","Easier task switching and problem solving","Faster typing speed","Improved eyesight"],"correct":1},
      {"id":"b1r2","prompt":"What happens without regular practice?","options":["Vocabulary improves","Nothing changes","Vocabulary can be forgotten","Grammar becomes easier"],"correct":2},
      {"id":"b1r3","prompt":"What combination produces the fastest progress?","options":["Only classroom study","Only real conversations","Classroom study and real conversations","Watching television"],"correct":2}
    ]
  }'::jsonb
);

-- ===================== B2 =====================
insert into lessons (module, title, level, question_type, content) values
(
  'cefr',
  'B2 Grammar - Passive Voice',
  'B2',
  'Grammar & Vocabulary',
  '{
    "questions": [
      {"id":"b2g1","prompt":"The report ___ by the manager yesterday.","options":["wrote","was written","writes","has write"],"correct":1},
      {"id":"b2g2","prompt":"This bridge ___ in 1990.","options":["built","was built","builds","is build"],"correct":1},
      {"id":"b2g3","prompt":"English ___ widely around the world.","options":["speaks","is spoken","spoke","speaking"],"correct":1}
    ]
  }'::jsonb
),
(
  'cefr',
  'B2 Reading - The Gig Economy',
  'B2',
  'Reading',
  '{
    "passage": "The rise of the gig economy has fundamentally altered traditional employment patterns across many industries. Rather than committing to a single employer, growing numbers of workers now piece together income from multiple short-term contracts, often coordinated through digital platforms. Supporters argue that this model offers valuable flexibility, allowing individuals to choose when and how much they work. Critics counter that gig workers frequently lack access to benefits such as health insurance and paid leave, leaving them financially vulnerable during periods of illness or economic downturn.",
    "questions": [
      {"id":"b2r1","prompt":"How do many gig workers earn income, according to the passage?","options":["From a single long-term employer", "By piecing together multiple short-term contracts","Through government grants","By working exclusively offline"],"correct":1},
      {"id":"b2r2","prompt":"What do supporters of the gig economy emphasise?","options":["Job security","Flexibility","Guaranteed benefits","Fixed salaries"],"correct":1},
      {"id":"b2r3","prompt":"What concern do critics raise?","options":["Workers earn too much","Lack of access to benefits","Too much job security","Excessive regulation"],"correct":1}
    ]
  }'::jsonb
);

-- ===================== C1 =====================
insert into lessons (module, title, level, question_type, content) values
(
  'cefr',
  'C1 Grammar - Inversion and Emphasis',
  'C1',
  'Grammar & Vocabulary',
  '{
    "questions": [
      {"id":"c1g1","prompt":"Not only ___ late, but he also forgot the documents.","options":["he was","was he","he is","is he"],"correct":1},
      {"id":"c1g2","prompt":"Rarely ___ such a difficult decision.","options":["I have faced","have I faced","I faced","faced I"],"correct":1},
      {"id":"c1g3","prompt":"Under no circumstances ___ allowed to leave early.","options":["students are","are students","students will","will students"],"correct":1}
    ]
  }'::jsonb
),
(
  'cefr',
  'C1 Reading - Artificial Intelligence and Employment',
  'C1',
  'Reading',
  '{
    "passage": "The accelerating integration of artificial intelligence into the workplace has reignited longstanding debates about technological unemployment. While earlier waves of automation primarily displaced manual labour, contemporary AI systems increasingly encroach upon cognitive tasks once considered the exclusive domain of skilled professionals. Economists remain sharply divided: some contend that historical precedent suggests new categories of employment will emerge to offset those eliminated, whereas others warn that the unprecedented pace and scope of current technological change may outstrip societys capacity to adapt.",
    "questions": [
      {"id":"c1r1","prompt":"How does the passage characterise earlier waves of automation?","options":["They primarily displaced cognitive tasks","They primarily displaced manual labour","They had no economic impact","They only affected agriculture"],"correct":1},
      {"id":"c1r2","prompt":"What is a key point of disagreement among economists?","options":["Whether AI exists","Whether new jobs will offset losses","Whether automation is new","Whether workers want jobs"],"correct":1},
      {"id":"c1r3","prompt":"What concern do some economists raise about the current change?","options":["It is too slow","It may outstrip societys ability to adapt","It only affects skilled professionals","It will reverse automation"],"correct":1}
    ]
  }'::jsonb
);
