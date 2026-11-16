-- Agar day6_gamification_admin.sql'dagi "eng birinchi foydalanuvchi" avtomatik
-- aniqlash usuli sizning asl hisobingizni to'g'ri topmagan bo'lsa (masalan, test
-- paytida bir nechta hisob yaratgan bo'lsangiz), shu faylni ishlating.

-- 1) Avval o'zingizning user_id'ingizni toping (email'ingizni moslang):
select id, email from auth.users where email = 'sizning@emailingiz.com';

-- 2) Yuqoridagi natijadan email'ni tasdiqlab, shu qatorni ishga tushiring:
update public.profiles set is_admin = true
where id = (select id from auth.users where email = 'sizning@emailingiz.com');

-- 3) Tekshirish:
select p.id, p.full_name, p.is_admin, u.email
from public.profiles p join auth.users u on u.id = p.id
where p.is_admin = true;
