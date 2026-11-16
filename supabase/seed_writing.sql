-- Bu faylni Supabase SQL Editor'ga joylab, "Run" bosing.
-- 4-kun: Writing Task 2 topshirig'ini bazaga qo'shadi.

insert into lessons (module, title, level, content) values
(
  'writing',
  'Opinion Essay — Technology and Creativity',
  'B2',
  '{
    "prompt": "Some people believe that technology makes children less creative, while others disagree. Discuss both views and give your own opinion."
  }'::jsonb
);
