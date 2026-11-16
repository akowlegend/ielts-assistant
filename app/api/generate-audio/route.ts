import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "OPENAI_API_KEY sozlanmagan." }, { status: 500 });
  }

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Avval tizimga kiring." }, { status: 401 });
  }

  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
  if (!profile?.is_admin) {
    return NextResponse.json({ error: "Bu amal faqat adminlar uchun." }, { status: 403 });
  }

  const { lessonId } = await req.json();
  if (!lessonId) {
    return NextResponse.json({ error: "lessonId yuborilmadi." }, { status: 400 });
  }

  const { data: lesson } = await supabase.from("lessons").select("id, content").eq("id", lessonId).single();
  if (!lesson) {
    return NextResponse.json({ error: "Dars topilmadi." }, { status: 404 });
  }

  const transcript: string | undefined = lesson.content?.transcript;
  if (!transcript) {
    return NextResponse.json({ error: "Bu darsda transcript matni yoq." }, { status: 400 });
  }

  try {
    // 1-qadam: OpenAI TTS orqali matndan ovoz yaratish
    const ttsRes = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "tts-1",
        voice: "alloy",
        input: transcript,
        response_format: "mp3",
      }),
    });

    if (!ttsRes.ok) {
      const errText = await ttsRes.text();
      return NextResponse.json({ error: `OpenAI TTS xatosi: ${errText}` }, { status: 500 });
    }

    const audioBuffer = Buffer.from(await ttsRes.arrayBuffer());

    // 2-qadam: Supabase Storage'ga yuklash
    const path = `${lessonId}.mp3`;
    const { error: uploadError } = await supabase.storage
      .from("audio")
      .upload(path, audioBuffer, { contentType: "audio/mpeg", upsert: true });

    if (uploadError) {
      return NextResponse.json({ error: `Yuklashda xato: ${uploadError.message}` }, { status: 500 });
    }

    const { data: urlData } = supabase.storage.from("audio").getPublicUrl(path);
    const audioUrl = urlData.publicUrl;

    // 3-qadam: dars content'iga audio_url'ni qo'shib yangilash
    const newContent = { ...lesson.content, audio_url: audioUrl };
    await supabase.from("lessons").update({ content: newContent }).eq("id", lessonId);

    return NextResponse.json({ audioUrl });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Nomalum xato" }, { status: 500 });
  }
}
