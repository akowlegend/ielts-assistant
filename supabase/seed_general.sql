-- Bu faylni Supabase SQL Editor'ga joylab, "Run" bosing.

insert into lessons (module, title, level, content) values
(
  'general',
  'Grammar — Present Perfect vs Past Simple',
  'B1',
  '{
    "questions": [
      {
        "id": "g1",
        "prompt": "She ___ to London three times.",
        "options": ["has been", "was", "is", "been"],
        "correct": 0
      },
      {
        "id": "g2",
        "prompt": "I ___ my homework yesterday evening.",
        "options": ["have finished", "finished", "finish", "finishing"],
        "correct": 1
      },
      {
        "id": "g3",
        "prompt": "They ___ in this city since 2015.",
        "options": ["lived", "live", "have lived", "living"],
        "correct": 2
      }
    ]
  }'::jsonb
);
