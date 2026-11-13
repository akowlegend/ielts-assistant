-- Bu faylni Supabase SQL Editor'ga joylab, "Run" bosing.
-- 5-kun: Speaking Part 2 uchun Cue Card bazaga qo'shiladi.

insert into lessons (module, title, level, content) values
(
  'speaking',
  'Part 2 — A skill you would like to learn',
  'B2',
  '{
    "cue_card": "Describe a skill you would like to learn. You should say: what it is, why you want to learn it, how you would learn it, and explain how it would be useful to you."
  }'::jsonb
);
