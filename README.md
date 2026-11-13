# IELTS Assistant from Akramjon — 1-kun

## Qadamlar

### 1. Supabase loyihasini oching
1. https://supabase.com → **Start your project** → Google yoki email bilan ro'yxatdan o'ting.
2. **New project** → nom bering (masalan `ielts-assistant`) → parol o'rnating → Region: eng yaqinini tanlang.
3. Loyiha yaratilgach, chap menyudan **SQL Editor** ga kiring.
4. `supabase/schema.sql` faylining ichidagi kodni to'liq nusxalab, SQL Editor'ga joylang va **Run** bosing.
5. Chap menyudan **Project Settings → API** ga kiring. U yerdan **Project URL** va **anon public** kalitini nusxalang.

### 2. Loyihani kompyuteringizga tushiring
Bu zip faylni biror papkaga (masalan `D:\Projects\ielts-assistant`) oching.

### 3. Muhit o'zgaruvchilarini sozlang
`.env.local.example` faylini `.env.local` deb nomlang va ichiga Supabase'dan olgan URL va kalitni yozing.

### 4. Kerakli paketlarni o'rnating
Terminalda loyiha papkasida:
```bash
npm install
```

### 5. Loyihani ishga tushiring
```bash
npm run dev
```
Brauzerda **http://localhost:3000** ni oching. Avtomatik `/login` sahifasiga o'tadi.

### 6. Sinab ko'ring
1. **Ro'yxatdan o'tish** orqali yangi hisob yarating.
2. Supabase'dan kelgan tasdiqlash emailini bosing (yoki Supabase Dashboard → Authentication → Settings'da email tasdiqlashni vaqtincha o'chirib qo'yishingiz mumkin, tezroq sinash uchun).
3. Login qiling → Dashboard sahifasi ochilishi, ismingiz va 0 XP ko'rinishi kerak.

## Qurilgan narsalar (1-kun)
- Next.js 14 + TypeScript + Tailwind (demo dizayn tokenlari bilan)
- Supabase autentifikatsiya (ro'yxatdan o'tish, kirish, himoyalangan sahifalar)
- Ma'lumotlar bazasi sxemasi: profiles, vocabulary, writing_submissions, speaking_submissions, lessons, progress
- Row Level Security: har bir foydalanuvchi faqat o'z ma'lumotini ko'radi

## Keyingi qadam (2-kun)
Demo-HTML'dagi sidebar va dashboard'ni to'liq React komponentlariga aylantirib, XP/streak/vocabulary'ni haqiqiy bazaga ulaymiz.
