-- Bu faylni Supabase SQL Editor'ga joylab, "Run" bosing.
-- Maqsad: ro'yxatdan o'tgan HAR BIR foydalanuvchi uchun, email tasdiqlash holatidan
-- qat'i nazar, "profiles" jadvalida avtomatik qator yaratilishi.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, xp, streak)
  values (new.id, new.raw_user_meta_data->>'full_name', 0, 0)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Orqaga qaytib tuzatish: avval ro'yxatdan o'tgan, lekin profili yo'q
-- foydalanuvchilar uchun ham profil yaratib beradi (sizning hozirgi hisobingiz shular qatorida).
insert into public.profiles (id, full_name, xp, streak)
select id, raw_user_meta_data->>'full_name', 0, 0
from auth.users
where id not in (select id from public.profiles);
