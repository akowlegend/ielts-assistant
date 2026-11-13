-- Bu faylni Supabase SQL Editorga joylab, Run bosing.
-- Writing va Speaking darslariga mavzu turini belgilaymiz.

update lessons set question_type = 'Opinion Essay' where module = 'writing' and title ilike '%Technology and Creativity%';
update lessons set question_type = 'Problem and Solution' where module = 'writing' and title ilike '%Urban Traffic%';
update lessons set question_type = 'Advantages and Disadvantages' where module = 'writing' and title ilike '%Remote Work%';

update lessons set question_type = 'Part 2 - Long Turn' where module = 'speaking' and title ilike '%skill%';
update lessons set question_type = 'Part 2 - Long Turn' where module = 'speaking' and title ilike '%memorable trip%';
update lessons set question_type = 'Part 1 - Interview' where module = 'speaking' and title ilike '%Hometown%';
