-- IELTS Assistant from Akramjon — 1-kun bazaviy sxema
-- Bu faylni Supabase Dashboard > SQL Editor ichiga joylab, "Run" bosing.

-- Profillar jadvali (har bir foydalanuvchi uchun 1 qator)
create table if not exists profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  target_band numeric default 7.0,
  xp integer default 0,
  streak integer default 0,
  lessons_completed integer default 0,
  created_at timestamp with time zone default now()
);

-- Lug'at daftari
create table if not exists vocabulary (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  word text not null,
  created_at timestamp with time zone default now()
);

-- Writing javoblari
create table if not exists writing_submissions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  task_title text,
  essay_text text,
  band_task_response numeric,
  band_coherence numeric,
  band_lexical numeric,
  band_grammar numeric,
  ai_feedback text,
  created_at timestamp with time zone default now()
);

-- Speaking javoblari
create table if not exists speaking_submissions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  cue_card text,
  transcript text,
  estimated_band numeric,
  ai_feedback text,
  created_at timestamp with time zone default now()
);

-- Darslar (keyinroq admin panel orqali to'ldiriladi)
create table if not exists lessons (
  id uuid default gen_random_uuid() primary key,
  module text not null,          -- reading | listening | writing | speaking | general | cefr
  title text not null,
  content jsonb,                 -- savollar, matn, audio_url va hokazo
  level text,                    -- A1..C2
  created_at timestamp with time zone default now()
);

-- Progress (har bir dars uchun qaysi foydalanuvchi qachon tugatgani)
create table if not exists progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  lesson_id uuid references lessons(id) on delete cascade,
  score numeric,
  completed_at timestamp with time zone default now()
);

-- Row Level Security: har bir foydalanuvchi faqat o'z ma'lumotini ko'rishi/o'zgartirishi mumkin
alter table profiles enable row level security;
alter table vocabulary enable row level security;
alter table writing_submissions enable row level security;
alter table speaking_submissions enable row level security;
alter table progress enable row level security;

create policy "o'z profilini ko'rish" on profiles for select using (auth.uid() = id);
create policy "o'z profilini yangilash" on profiles for update using (auth.uid() = id);
create policy "o'z profilini yaratish" on profiles for insert with check (auth.uid() = id);

create policy "o'z lug'atini boshqarish" on vocabulary for all using (auth.uid() = user_id);
create policy "o'z writing'ini boshqarish" on writing_submissions for all using (auth.uid() = user_id);
create policy "o'z speaking'ini boshqarish" on speaking_submissions for all using (auth.uid() = user_id);
create policy "o'z progressini boshqarish" on progress for all using (auth.uid() = user_id);

-- lessons hammaga ochiq o'qish uchun (admin panel orqali keyin yoziladi)
alter table lessons enable row level security;
create policy "darslarni hamma o'qiy oladi" on lessons for select using (true);

-- Yangi foydalanuvchi ro'yxatdan o'tganda profiles jadvaliga avtomatik qator qo'shish
-- (email tasdiqlash yoqilgan bo'lsa ham ishlaydi, chunki SECURITY DEFINER bilan ishlaydi)
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
