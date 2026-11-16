-- Bu faylni Supabase SQL Editorga joylab, Run bosing.
-- Part 1, Part 2, Part 3 uchun toliq, haqiqiy Cue Card formatidagi savollar banki.

-- ===================== PART 1 (qisqa savollar, ~30 soniya) =====================
insert into lessons (module, title, level, question_type, content) values
(
  'speaking',
  'Part 1 — Studies or Work',
  'B1',
  'Part 1 - Interview',
  '{"part":1,"cue_card":"Let us talk about your studies or job. Do you work or are you a student? What do you like most about your studies or job? Is it something you have always wanted to do? What do you find most difficult about it?"}'::jsonb
),
(
  'speaking',
  'Part 1 — Free Time and Hobbies',
  'B1',
  'Part 1 - Interview',
  '{"part":1,"cue_card":"Let us talk about your free time. What do you usually do in your free time? Have your hobbies changed since you were a child? Do you prefer to spend your free time alone or with others? Is free time important to you? Why?"}'::jsonb
),
(
  'speaking',
  'Part 1 — Food and Cooking',
  'A2',
  'Part 1 - Interview',
  '{"part":1,"cue_card":"Let us talk about food. What kind of food do you like? Do you often cook for yourself? Did you learn to cook from someone in your family? Is food an important part of celebrations in your country?"}'::jsonb
);

-- ===================== PART 2 (uzun javob, 1 daqiqa tayyorgarlik + 2 daqiqa) =====================
insert into lessons (module, title, level, question_type, content) values
(
  'speaking',
  'Part 2 — A Person Who Has Influenced You',
  'B2',
  'Part 2 - Long Turn',
  '{"part":2,"cue_card":"Describe a person who has influenced you. You should say: who this person is, how you know them, what qualities this person has, and explain why this person has influenced you so much."}'::jsonb
),
(
  'speaking',
  'Part 2 — A Piece of Technology You Find Useful',
  'B2',
  'Part 2 - Long Turn',
  '{"part":2,"cue_card":"Describe a piece of technology you find useful. You should say: what it is, how often you use it, how it works, and explain why you find it so useful."}'::jsonb
),
(
  'speaking',
  'Part 2 — A Book You Enjoyed Reading',
  'B2',
  'Part 2 - Long Turn',
  '{"part":2,"cue_card":"Describe a book you enjoyed reading. You should say: what the book was about, when you read it, why you decided to read it, and explain why you enjoyed it so much."}'::jsonb
),
(
  'speaking',
  'Part 2 — A Time You Helped Someone',
  'B1',
  'Part 2 - Long Turn',
  '{"part":2,"cue_card":"Describe a time you helped someone. You should say: who you helped, what the situation was, what you did to help, and explain how you felt afterwards."}'::jsonb
);

-- ===================== PART 3 (muhokama, ~50 soniya, Part 2 mavzusining davomi) =====================
insert into lessons (module, title, level, question_type, content) values
(
  'speaking',
  'Part 3 — Discussion: Role Models and Influence',
  'C1',
  'Part 3 - Discussion',
  '{"part":3,"cue_card":"Let us consider role models in society. Do you think celebrities make good role models for young people? How has the idea of a role model changed with social media? Should parents or teachers be the main influence on a childs values, or is this unrealistic today?"}'::jsonb
),
(
  'speaking',
  'Part 3 — Discussion: Technology in Daily Life',
  'C1',
  'Part 3 - Discussion',
  '{"part":3,"cue_card":"Let us consider technology in daily life. Do you think people have become too dependent on technology? What are the disadvantages of relying heavily on smartphones? How might daily life change if a major technology suddenly became unavailable?"}'::jsonb
),
(
  'speaking',
  'Part 3 — Discussion: Reading Habits in Society',
  'C1',
  'Part 3 - Discussion',
  '{"part":3,"cue_card":"Let us consider reading habits. Do you think people read less now than in the past? What are the benefits of reading fiction compared to non-fiction? Should schools require students to read a certain number of books each year?"}'::jsonb
),
(
  'speaking',
  'Part 3 — Discussion: Helping Others and Community',
  'B2',
  'Part 3 - Discussion',
  '{"part":3,"cue_card":"Let us consider helping others. Why do you think some people are more willing to help strangers than others? Do you believe communities today are less close than in the past? Should schools teach children the importance of helping others?"}'::jsonb
);
