import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "OPENAI_API_KEY sozlanmagan (.env.local'ni tekshiring)." }, { status: 500 });
  }

  const formData = await req.formData();
  const audio = formData.get("audio") as File | null;
  const cueCard = (formData.get("cueCard") as string) ?? "";

  if (!audio) {
    return NextResponse.json({ error: "Audio topilmadi." }, { status: 400 });
  }

  try {
    // 1-qadam: Whisper orqali audio -> matn
    const whisperForm = new FormData();
    whisperForm.append("file", audio, "speech.webm");
    whisperForm.append("model", "whisper-1");

    const whisperRes = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: whisperForm,
    });

    if (!whisperRes.ok) {
      const errText = await whisperRes.text();
      return NextResponse.json({ error: `Whisper xatosi: ${errText}` }, { status: 500 });
    }
    const whisperData = await whisperRes.json();
    const transcript: string = whisperData.text;

    if (!transcript || transcript.trim().split(/\s+/).length < 10) {
      return NextResponse.json({
        error: "Yozuv juda qisqa yoki eshitilmadi. Kamida 20-30 soniya gapirib ko'ring.",
      }, { status: 400 });
    }

    // 2-qadam: GPT orqali baholash
    const systemPrompt = `Siz IELTS Speaking baholovchisiz. Berilgan Cue Card va talabaning gapirgan matni (transkripsiya)
asosida 0.0 dan 9.0 gacha (0.5 qadam bilan) taxminiy umumiy band bering, hamda o'zbek tilida 3-4 jumlali
fikr-mulohaza yozing (ravonlik, so'z boyligi, grammatika va talaffuzga oid taxminlar — transkripsiyadan
ko'rinadigan narsalar asosida). FAQAT quyidagi JSON formatida javob bering: {"band": number, "feedback": "string"}`;

    const chatRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Cue Card: ${cueCard}\n\nTalabaning javobi (transkripsiya):\n${transcript}` },
        ],
        temperature: 0.3,
      }),
    });

    if (!chatRes.ok) {
      const errText = await chatRes.text();
      return NextResponse.json({ error: `OpenAI xatosi: ${errText}` }, { status: 500 });
    }

    const chatData = await chatRes.json();
    const parsed = JSON.parse(chatData.choices[0].message.content);

    return NextResponse.json({ transcript, band: parsed.band, feedback: parsed.feedback });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Noma'lum xato" }, { status: 500 });
  }
}
