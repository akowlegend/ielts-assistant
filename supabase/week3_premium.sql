-- Bu faylni Supabase SQL Editorga joylab, Run bosing.

alter table profiles add column if not exists is_premium boolean default false;
alter table profiles add column if not exists premium_until timestamp with time zone;

-- Foydalanuvchini qolda premium qilish uchun (Click/Payme hali ulanmagan bosqichda,
-- tolov kelganini ozingiz tekshirib, shu qatorni ishlating):
-- update public.profiles set is_premium = true, premium_until = now() + interval '30 days'
-- where email = 'foydalanuvchi@email.com';
