-- Bu faylni Supabase SQL Editorga joylab, Run bosing.

insert into storage.buckets (id, name, public)
values ('writing-images', 'writing-images', true)
on conflict (id) do nothing;

create policy "ommaviy writing rasm oqish" on storage.objects for select using (bucket_id = 'writing-images');

create policy "admin writing rasm yuklay oladi" on storage.objects for insert with check (
  bucket_id = 'writing-images' and (select is_admin from profiles where id = auth.uid()) = true
);
