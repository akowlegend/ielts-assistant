-- Bu faylni Supabase SQL Editor'ga joylab, "Run" bosing.
-- 3-kun: Reading va Listening uchun bitta-bitta haqiqiy dars qo'shiladi.

insert into lessons (module, title, level, content) values
(
  'reading',
  'The Rise of Urban Farming',
  'B2',
  '{
    "passage": "Urban farming has transformed from a niche hobby into a significant movement reshaping how cities think about food. Rooftop gardens, vertical farms and community plots now supply fresh produce to millions of residents who once relied entirely on long supply chains. Proponents argue that growing food closer to where it is consumed reduces transport emissions and strengthens food security during disruptions. Critics, however, point out that urban land is expensive and yields per square metre rarely match those of traditional farms. Despite these concerns, many city governments continue to support urban agriculture through grants and dedicated zoning.",
    "questions": [
      {
        "id": "q1",
        "prompt": "According to the passage, what do supporters of urban farming see as a key benefit?",
        "options": [
          "It reduces transport emissions and strengthens food security",
          "It increases land value in cities",
          "It eliminates the need for traditional farms",
          "It guarantees higher yields than rural farms"
        ],
        "correct": 0
      },
      {
        "id": "q2",
        "prompt": "What concern do critics raise about urban farming?",
        "options": [
          "It requires too much water",
          "Urban land is expensive and yields are often lower",
          "It is illegal in most cities",
          "It damages the environment"
        ],
        "correct": 1
      },
      {
        "id": "q3",
        "prompt": "How do many city governments respond to urban agriculture?",
        "options": [
          "They ban it in residential areas",
          "They ignore it completely",
          "They support it through grants and zoning",
          "They tax it heavily"
        ],
        "correct": 2
      }
    ]
  }'::jsonb
),
(
  'listening',
  'Section 1 — Library Membership Form',
  'B1',
  '{
    "intro": "Haqiqiy audio hali yo''q (bu 2-bosqichda qo''shiladi). Hozircha matnni o''qib, bo''shliqlarni to''ldiring — format xuddi haqiqiy IELTS Listening Form Completion kabi.",
    "transcript": "Good morning, I would like to register for a library membership. — Certainly. Can I have your full name, please? — Yes, it''s Sarah Jenkins. — And your address? — 42 Oak Street. — Thank you. One last thing, what is your preferred contact number? — 0770-123-456.",
    "fields": [
      {"id": "f1", "label": "Full name:", "answer": "Sarah Jenkins"},
      {"id": "f2", "label": "Address:", "answer": "42 Oak Street"},
      {"id": "f3", "label": "Contact number:", "answer": "0770-123-456"}
    ]
  }'::jsonb
);
