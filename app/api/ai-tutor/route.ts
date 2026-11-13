import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "OPENAI_API_KEY sozlanmagan (.env.local'ni tekshiring)." }, { status: 500 });
  }

  const { messages } = await req.json();

  const systemPrompt = `Siz "IELTS Assistant from Akramjon" platformasidagi shaxsiy ingliz tili yordamchisisiz.
Vazifangiz: grammatikani tushuntirish, inglizcha-o'zbekcha va o'zbekcha-inglizcha tarjima qilish, qiyin so'zlarni
izohlash, mashq savollari tuzish, IELTS bo'yicha maslahat berish. Javoblaringiz qisqa, tushunarli va samimiy bo'lsin.
Agar foydalanuvchi o'zbek tilida yozsa, o'zbek tilida javob bering; ingliz tilida yozsa, ingliz tilida javob bering
(lekin tushuntirishni osonlashtirish uchun kerak bo'lsa ikkala tilni ham aralashtirib ishlatishingiz mumkin).`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        temperature: 0.6,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ error: `OpenAI xatosi: ${errText}` }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json({ reply: data.choices[0].message.content });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Noma'lum xato" }, { status: 500 });
  }
}
