-- Bu faylni Supabase SQL Editorga joylab, Run bosing.
-- Eski Test1/Test2 tuzilishidagi Reading/Listening darslarini ochiradi,
-- ornida 4 ta original Reading passage va 4 ta Listening section qoshadi
-- (haqiqiy IELTS formatidagi aralash savol turlari bilan, lekin butunlay original matn).

delete from lessons where module = 'reading';
delete from lessons where module = 'listening';

-- ===================== READING: Passage 1 =====================
-- True/False/Not Given + Note Completion aralash
insert into lessons (module, title, level, question_type, content) values
(
  'reading',
  'The Lost Art of Handwritten Letters',
  'B2',
  'True/False/Not Given + Note Completion',
  '{
    "section_label": "Passage 1",
    "passage": "For most of recorded history, the handwritten letter was the primary means by which people separated by distance exchanged news, affection, and ideas. Long before the telephone or the internet, a letter could take weeks to cross an ocean, yet this slowness did not diminish its importance; if anything, the delay encouraged writers to compose with greater care, knowing that a single letter might be read and reread many times before a reply arrived. Historians studying correspondence from earlier centuries often note that letters reveal details of daily life that official records omit entirely, from the price of bread in a particular town to the private anxieties of a soldier far from home.\n\nThe decline of letter writing did not begin with the internet, as many assume, but considerably earlier, with the spread of the telephone in the twentieth century. Once a voice could travel instantly down a wire, many people saw little reason to wait days for a written reply when a call could be made that same evening. Even so, letters persisted in certain contexts well into the late twentieth century, particularly for formal communication and for messages intended to be kept as a lasting record, such as condolences or congratulations.\n\nToday, handwritten letters are rare enough that receiving one can feel like an unusual event. Email and instant messaging have taken over nearly all the practical functions that letters once served, offering speed that no postal service could match. Yet a small but committed community of hobbyists continues to write and exchange letters purely for the pleasure of it, arguing that the physical object, the handwriting, and the wait itself carry a meaning that a screen cannot replicate. Some schools have even reintroduced letter-writing exercises, not because students need the skill for daily communication, but because composing a letter requires a kind of sustained, linear thinking that shorter digital messages rarely demand.\n\nResearchers who study handwriting suggest that the physical act of forming letters by hand may also support memory and comprehension in ways that typing does not, since the slower pace forces the writer to select words more deliberately. Whether or not this advantage is significant, it is clear that the letter, once purely a practical tool, has acquired a new identity: no longer essential, but valued precisely because it is no longer ordinary.",
    "questions": [
      {"id":"p1q1","prompt":"The slowness of letter delivery discouraged people from writing frequently.","options":["TRUE","FALSE","NOT GIVEN"],"correct":1},
      {"id":"p1q2","prompt":"Letters sometimes contain everyday details not found in official historical records.","options":["TRUE","FALSE","NOT GIVEN"],"correct":0},
      {"id":"p1q3","prompt":"The decline of letter writing began with the invention of email.","options":["TRUE","FALSE","NOT GIVEN"],"correct":1},
      {"id":"p1q4","prompt":"Letters continued to be used for formal occasions even after the telephone became common.","options":["TRUE","FALSE","NOT GIVEN"],"correct":0},
      {"id":"p1q5","prompt":"Most schools now require students to write letters as part of the official curriculum.","options":["TRUE","FALSE","NOT GIVEN"],"correct":2}
    ],
    "fields": [
      {"id":"p1f1","label":"Today, receiving a handwritten letter can feel like an unusual","answer":"event"},
      {"id":"p1f2","label":"A small group of hobbyists write letters purely for the","answer":"pleasure"},
      {"id":"p1f3","label":"Composing a letter requires sustained, linear","answer":"thinking"},
      {"id":"p1f4","label":"Handwriting may support memory because it forces writers to select words more","answer":"deliberately"}
    ]
  }'::jsonb
);

-- ===================== READING: Passage 2 =====================
-- Matching Headings + Summary Completion aralash
insert into lessons (module, title, level, question_type, content) values
(
  'reading',
  'The Rise of Vertical Farming',
  'C1',
  'Matching Headings + Summary Completion',
  '{
    "section_label": "Passage 2",
    "passage": "Paragraph A: As cities continue to expand and arable land near urban centres becomes increasingly scarce, a growing number of entrepreneurs have turned to vertical farming as a potential solution. Rather than cultivating crops across wide, flat fields, vertical farms stack growing trays inside climate-controlled buildings, sometimes reaching ten or more storeys high, allowing far greater yields per square metre of land than traditional agriculture.\n\nParagraph B: Proponents of vertical farming point to several clear advantages. Because crops are grown indoors under carefully regulated conditions, they are largely immune to the unpredictable weather events that can devastate outdoor harvests. Water usage is also dramatically reduced, since most vertical farms employ recirculating systems that capture and reuse moisture rather than allowing it to drain away into the soil.\n\nParagraph C: Despite these benefits, the economics of vertical farming remain a serious obstacle to widespread adoption. The artificial lighting required to replace sunlight consumes substantial amounts of electricity, and unless a farm has access to unusually cheap renewable energy, these running costs can make vertically grown produce considerably more expensive than its field-grown equivalent. Several high-profile vertical farming companies have struggled financially for precisely this reason.\n\nParagraph D: Looking ahead, many analysts believe that vertical farming is unlikely to replace traditional agriculture entirely, but will instead occupy a specific niche, supplying fresh, perishable crops such as leafy greens to nearby urban markets where transport costs and spoilage are otherwise significant concerns. In this narrower role, the technology may prove both economically sound and environmentally beneficial.",
    "questions": [
      {"id":"p2q1","prompt":"Paragraph A heading","options":["A solution to limited urban farmland","The history of indoor agriculture","Why farmers resist new technology","Global food shortages explained"],"correct":0},
      {"id":"p2q2","prompt":"Paragraph B heading","options":["The environmental cost of farming","Key benefits of growing crops indoors","Why vertical farms fail commercially","Comparing crop varieties"],"correct":1},
      {"id":"p2q3","prompt":"Paragraph C heading","options":["The financial challenge of artificial lighting","A guide to renewable energy","How vertical farms use water","The history of electricity pricing"],"correct":0},
      {"id":"p2q4","prompt":"Paragraph D heading","options":["A likely future role for vertical farming","Why vertical farming will replace all agriculture","The decline of urban markets","Transporting food across continents"],"correct":0}
    ],
    "fields": [
      {"id":"p2f1","label":"Vertical farms stack growing trays inside climate-controlled","answer":"buildings"},
      {"id":"p2f2","label":"Most vertical farms use recirculating systems to reduce","answer":"water"},
      {"id":"p2f3","label":"The main running cost problem comes from artificial","answer":"lighting"},
      {"id":"p2f4","label":"Vertical farming may be best suited to supplying nearby urban","answer":"markets"}
    ]
  }'::jsonb
);

-- ===================== READING: Passage 3 =====================
-- Multiple Choice + True/False/Not Given aralash
insert into lessons (module, title, level, question_type, content) values
(
  'reading',
  'The Surprising Intelligence of Octopuses',
  'C1',
  'Multiple Choice + True/False/Not Given',
  '{
    "section_label": "Passage 3",
    "passage": "Among invertebrates, the octopus stands out as an animal whose cognitive abilities continue to surprise researchers. Unlike most molluscs, which display only simple, reflexive behaviour, octopuses have been observed solving puzzles, using tools, and even appearing to recognise individual human caretakers, raising difficult questions about how intelligence evolved so differently in a creature so distantly related to vertebrates.\n\nOne frequently cited piece of evidence comes from laboratory studies in which octopuses were presented with a transparent container holding food, sealed with a screw-top lid. Within a relatively short period, many of the animals learned to manipulate the lid with their arms until it opened, a task that requires not only physical dexterity but also an understanding of cause and effect. Even more notably, some individuals that had learned the technique once were able to repeat it successfully days later, suggesting a capacity for memory that had previously been doubted in invertebrates.\n\nPart of the explanation for this unusual intelligence may lie in the octopus''s distinctive nervous system. Rather than concentrating neurons primarily in a central brain, as vertebrates do, roughly two-thirds of an octopus''s neurons are distributed throughout its eight arms, allowing each arm to process sensory information and initiate movement with a notable degree of independence from the central brain. Some researchers have described this arrangement as a form of distributed intelligence, quite unlike anything seen in mammals or birds.\n\nThe short lifespan of most octopus species, however, remains something of a puzzle for scientists studying the evolution of their intelligence. Most species live for only one to two years, a surprisingly brief span for an animal capable of such sophisticated behaviour, and this has led some to question whether their intelligence evolved primarily to solve immediate problems, such as escaping predators or securing food, rather than for long-term planning of the kind associated with intelligence in longer-lived animals.",
    "questions": [
      {"id":"p3q1","prompt":"What did researchers observe octopuses doing with a sealed container?","options":["Breaking the container to reach the food","Learning to open a screw-top lid","Ignoring the container entirely","Using another animal to open it"],"correct":1},
      {"id":"p3q2","prompt":"What did the repeated success at opening the lid suggest?","options":["Octopuses cannot remember past tasks","Octopuses have a capacity for memory","The task was too difficult for most octopuses","Octopuses rely entirely on instinct"],"correct":1},
      {"id":"p3q3","prompt":"Where are most of an octopus neurons located?","options":["Entirely in the central brain","Distributed throughout its eight arms","In its eyes only","Equally split between two brains"],"correct":1},
      {"id":"p3q4","prompt":"What do some researchers call the octopus nervous system arrangement?","options":["Centralised intelligence","Distributed intelligence","Reflexive intelligence","Artificial intelligence"],"correct":1},
      {"id":"p3q5","prompt":"Octopuses are closely related to vertebrates such as mammals.","options":["TRUE","FALSE","NOT GIVEN"],"correct":1},
      {"id":"p3q6","prompt":"Most octopus species live for several decades.","options":["TRUE","FALSE","NOT GIVEN"],"correct":1},
      {"id":"p3q7","prompt":"Some scientists question whether octopus intelligence evolved for long-term planning.","options":["TRUE","FALSE","NOT GIVEN"],"correct":0},
      {"id":"p3q8","prompt":"Octopuses in the study were trained by the same researcher throughout.","options":["TRUE","FALSE","NOT GIVEN"],"correct":2}
    ]
  }'::jsonb
);

-- ===================== READING: Passage 4 =====================
-- Matching Features (MCQ) + Sentence Completion aralash
insert into lessons (module, title, level, question_type, content) values
(
  'reading',
  'Trade Networks of the Ancient World',
  'C1',
  'Matching Features + Sentence Completion',
  '{
    "section_label": "Passage 4",
    "passage": "Long before modern shipping routes connected distant continents, a web of overland and maritime trade networks already linked much of the ancient world. Historian Elena Marsh has argued that these early networks were driven less by the exchange of luxury goods, which is often emphasised in popular accounts, and more by the steady movement of everyday commodities such as grain, textiles, and metal ore, which sustained the economies of entire regions. Marsh contends that focusing only on silk and spices has led many to underestimate the true scale of ancient commerce.\n\nA different perspective comes from archaeologist Tomas Reyes, who has spent two decades excavating trading settlements along what was once a major overland route. Reyes suggests that the networks functioned not as a single continuous road travelled start to finish by merchants, but rather as a relay system, in which goods passed through the hands of numerous local traders, each covering only a short stretch before passing merchandise on to the next. In his view, very few individuals ever travelled the entire length of these routes themselves.\n\nEconomist Priya Chandran has approached the subject from yet another angle, analysing how these trade networks affected the prices of goods in distant markets. Chandran found that the price of a given commodity tended to rise sharply the further it travelled from its point of origin, not merely because of transport costs, but because of the numerous intermediaries who each added a margin for their own profit along the relay chain described by Reyes.",
    "questions": [
      {"id":"p4q1","prompt":"Which researcher argued that everyday commodities mattered more than luxury goods?","options":["Elena Marsh","Tomas Reyes","Priya Chandran","None of the above"],"correct":0},
      {"id":"p4q2","prompt":"Which researcher proposed that trade routes functioned as a relay system?","options":["Elena Marsh","Tomas Reyes","Priya Chandran","None of the above"],"correct":1},
      {"id":"p4q3","prompt":"Which researcher studied how prices changed as goods travelled further?","options":["Elena Marsh","Tomas Reyes","Priya Chandran","None of the above"],"correct":2}
    ],
    "fields": [
      {"id":"p4f1","label":"Marsh believes popular accounts overemphasise silk and","answer":"spices"},
      {"id":"p4f2","label":"According to Reyes, very few merchants travelled the entire","answer":"route"},
      {"id":"p4f3","label":"Chandran found that prices rose due to transport costs and the margins added by","answer":"intermediaries"}
    ]
  }'::jsonb
);

-- ===================== LISTENING: Section 1 =====================
insert into lessons (module, title, level, question_type, content) values
(
  'listening',
  'Booking a Hotel Room',
  'A2',
  'Form Completion',
  '{
    "section_label": "Section 1",
    "intro": "Haqiqiy audio hali yoq (admin panelda Audio yaratish tugmasi orqali qoshing). Hozircha matnni oqib, boshliqlarni toldiring.",
    "transcript": "Good afternoon, Lakeside Hotel, how can I help? I would like to book a room for three nights starting on the 14th of June. Certainly, can I have your name please? It is Robert Hanley. And a contact number? 0750-221-983. We have a double room available for 85 dollars per night, breakfast included. That sounds good, I will take it.",
    "fields": [
      {"id":"l1f1","label":"Guest name:","answer":"Robert Hanley"},
      {"id":"l1f2","label":"Contact number:","answer":"0750-221-983"},
      {"id":"l1f3","label":"Price per night:","answer":"85 dollars"}
    ]
  }'::jsonb
),
(
  'listening',
  'Community Centre Facilities',
  'B1',
  'Note Completion',
  '{
    "section_label": "Section 2",
    "intro": "Haqiqiy audio hali yoq. Hozircha matnni oqib, boshliqlarni toldiring.",
    "transcript": "Welcome to Riverside Community Centre. Our swimming pool is open from six in the morning until nine at night, every day except Tuesday, when we carry out maintenance. The gym on the second floor requires a separate membership card, available at the front desk for twenty dollars a year. Our cafe on the ground floor serves breakfast and lunch only.",
    "fields": [
      {"id":"l2f1","label":"Pool closed on:","answer":"Tuesday"},
      {"id":"l2f2","label":"Gym membership cost:","answer":"20 dollars a year"},
      {"id":"l2f3","label":"Cafe serves breakfast and:","answer":"lunch"}
    ]
  }'::jsonb
),
(
  'listening',
  'Group Project Discussion',
  'B2',
  'Note Completion',
  '{
    "section_label": "Section 3",
    "intro": "Haqiqiy audio hali yoq. Hozircha matnni oqib, boshliqlarni toldiring.",
    "transcript": "So for our project, I think we should divide the research by topic rather than by source. I agree, and I think Maria should handle the data analysis section since she has experience with statistics. That makes sense. Our deadline is the 3rd of next month, so we should aim to finish a draft by the 20th of this month to allow time for revisions.",
    "fields": [
      {"id":"l3f1","label":"Research will be divided by:","answer":"topic"},
      {"id":"l3f2","label":"Maria will handle:","answer":"data analysis"},
      {"id":"l3f3","label":"Draft deadline:","answer":"20th of this month"}
    ]
  }'::jsonb
),
(
  'listening',
  'Lecture: Renewable Energy Storage',
  'C1',
  'Summary Completion',
  '{
    "section_label": "Section 4",
    "intro": "Haqiqiy audio hali yoq. Hozircha matnni oqib, boshliqlarni toldiring.",
    "transcript": "Today we examine energy storage. The main challenge with solar and wind power is intermittency, meaning supply does not always match demand. Battery storage is the most common current solution, though its high cost remains a barrier. An emerging alternative is pumped hydro storage, which uses surplus electricity to pump water uphill, later releasing it to generate power when needed.",
    "fields": [
      {"id":"l4f1","label":"The main challenge with solar and wind power is:","answer":"intermittency"},
      {"id":"l4f2","label":"The most common current storage solution is:","answer":"battery storage"},
      {"id":"l4f3","label":"An emerging alternative solution is pumped:","answer":"hydro storage"}
    ]
  }'::jsonb
);
