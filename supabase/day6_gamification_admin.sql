-- Bu faylni Supabase SQL Editor'ga joylab, "Run" bosing.

-- 1) Streak va admin uchun yangi ustunlar
alter table profiles add column if not exists last_activity_date date;
alter table profiles add column if not exists is_admin boolean default false;

-- 2) XP/streak/lessons_completed'ni BIR JOYDA, xavfsiz hisoblaydigan funksiya.
--    Bundan buyon barcha modullar shu funksiyani chaqiradi (ReadingQuiz, WritingEditor va h.k.),
--    shuning uchun streak endi haqiqiy ishlaydi: bugun faol bo'lsangiz +0 (bir marta hisoblanadi),
--    kecha faol bo'lib, bugun ham faol bo'lsangiz +1, uzilish bo'lsa 1 ga qaytadi.
create or replace function public.award_xp(p_user_id uuid, p_xp integer, p_lesson boolean default true)
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  v_last date;
  v_streak integer;
begin
  select last_activity_date, streak into v_last, v_streak from profiles where id = p_user_id;

  if v_last is null then
    v_streak := 1;
  elsif v_last = current_date then
    v_streak := coalesce(v_streak, 1);
  elsif v_last = current_date - 1 then
    v_streak := coalesce(v_streak, 0) + 1;
  else
    v_streak := 1;
  end if;

  update profiles
  set xp = xp + p_xp,
      streak = v_streak,
      last_activity_date = current_date,
      lessons_completed = lessons_completed + case when p_lesson then 1 else 0 end
  where id = p_user_id;
end;
$$;

grant execute on function public.award_xp to authenticated;

-- 3) Admin panel uchun: faqat is_admin=true bo'lgan foydalanuvchi darslarni
--    qo'sha/o'zgartira/o'chira oladi.
create policy "adminlar dars qo'sha oladi" on lessons for insert with check (
  (select is_admin from profiles where id = auth.uid()) = true
);
create policy "adminlar darsni yangilay oladi" on lessons for update using (
  (select is_admin from profiles where id = auth.uid()) = true
);
create policy "adminlar darsni o'chira oladi" on lessons for delete using (
  (select is_admin from profiles where id = auth.uid()) = true
);

-- 4) Eng birinchi ro'yxatdan o'tgan foydalanuvchini (odatda — siz) admin qilib belgilaymiz.
--    Agar boshqa email'ga admin huquqi berish kerak bo'lsa, shu qatorni email bilan almashtiring:
--    update public.profiles set is_admin = true where id = (select id from auth.users where email = 'sizning@emailingiz.com');
update public.profiles set is_admin = true
where id = (select id from auth.users order by created_at asc limit 1);
