-- Bu faylni Supabase SQL Editorga joylab, Run bosing.

-- 1) profiles jadvaliga email qoshamiz (foydalanuvchilar royxatida korsatish uchun)
alter table profiles add column if not exists email text;

-- 2) Mavjud foydalanuvchilar uchun email'ni toldiramiz
update public.profiles p
set email = u.email
from auth.users u
where p.id = u.id and p.email is null;

-- 3) Yangi royxatdan otganlarga ham email avtomatik yozilsin
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, xp, streak)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email, 0, 0)
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

-- 4) Admin ekanligini xavfsiz tekshiruvchi funksiya (RLS ichida sikllanib qolmasligi uchun)
create or replace function public.is_admin(uid uuid)
returns boolean
language sql
security definer
stable
as $$
  select coalesce((select is_admin from public.profiles where id = uid), false);
$$;

-- 5) Adminlar BARCHA foydalanuvchilar profilini korishi mumkin
create policy "adminlar hamma profilni korishi" on profiles for select using (
  public.is_admin(auth.uid())
);
