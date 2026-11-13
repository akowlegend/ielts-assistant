-- Bu faylni Supabase SQL Editor'ga joylab, "Run" bosing.
-- Audio fayllarni saqlash uchun Storage bucket va huquqlar.

insert into storage.buckets (id, name, public)
values ('audio', 'audio', true)
on conflict (id) do nothing;

-- Hamma (tizimga kirmaganlar ham) audio faylni o''qiy (eshita) oladi
create policy "ommaviy audio oqish" on storage.objects for select using (bucket_id = 'audio');

-- Faqat adminlar audio yuklay oladi
create policy "admin audio yuklay oladi" on storage.objects for insert with check (
  bucket_id = 'audio' and (select is_admin from profiles where id = auth.uid()) = true
);

-- Faqat adminlar audio faylni yangilay (qayta yarata) oladi
create policy "admin audio yangilay oladi" on storage.objects for update using (
  bucket_id = 'audio' and (select is_admin from profiles where id = auth.uid()) = true
);
