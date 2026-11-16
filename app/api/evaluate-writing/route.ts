import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { essay, taskPrompt } = await req.json();

  if (!essay || essay.trim().split(/\s+/).length < 30) {
    return NextResponse.json({ error: "Insho juda qisqa (kamida 30 so'z kerak)." }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "OPENAI_API_KEY sozlanmagan (.env.local'ni tekshiring)." }, { status: 500 });
  }

  const systemPrompt = `Siz IELTS Writing Task 2 baholovchisiz. Berilgan insho uchun rasmiy IELTS mezonlari bo'yicha
0.0 dan 9.0 gacha (0.5 qadam bilan) baho bering: Task Response, Coherence and Cohesion, Lexical Resource,
Grammatical Range and Accuracy. Shuningdek o'zbek tilida 3-4 jumlali qisqa, foydali fikr-mulohaza yozing
(kuchli va zaif tomonlarini aniq ko'rsating). FAQAT quyidagi JSON formatida javob bering, boshqa hech narsa yozmang:
{"task_response": number, "coherence": number, "lexical": number, "grammar": number, "feedback": "string"}`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Topshiriq: ${taskPrompt}\n\nInsho:\n${essay}` },
        ],
        temperature: 0.3,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ error: `OpenAI xatosi: ${errText}` }, { status: 500 });
    }

    const data = await res.json();
    const parsed = JSON.parse(data.choices[0].message.content);
    return NextResponse.json(parsed);
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Noma'lum xato" }, { status: 500 });
  }
}
