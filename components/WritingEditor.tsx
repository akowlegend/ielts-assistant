"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Feedback = {
  task_response: number;
  coherence: number;
  lexical: number;
  grammar: number;
  feedback: string;
};

export default function WritingEditor({
  lessonId,
  taskPrompt,
  userId,
}: {
  lessonId: string;
  taskPrompt: string;
  userId: string;
}) {
  const supabase = createClient();
  const [essay, setEssay] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Feedback | null>(null);

  const wordCount = essay.trim() ? essay.trim().split(/\s+/).length : 0;

  async function handleCheck() {
    setError("");
    setLoading(true);
    setResult(null);

    const { data: profile } = await supabase.from("profiles").select("is_premium").eq("id", userId).single();
    if (!profile?.is_premium) {
      const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
      const [{ count: wCount }, { count: sCount }] = await Promise.all([
        supabase.from("writing_submissions").select("id", { count: "exact", head: true }).eq("user_id", userId).gte("created_at", todayStart.toISOString()),
        supabase.from("speaking_submissions").select("id", { count: "exact", head: true }).eq("user_id", userId).gte("created_at", todayStart.toISOString()),
      ]);
      if ((wCount ?? 0) + (sCount ?? 0) >= 1) {
        setLoading(false);
        setError("Bugungi bepul limitingiz (1 ta Writing/Speaking tekshiruv) tugadi. Premium bilan cheksiz foydalaning: /premium");
        return;
      }
    }

    const res = await fetch("/api/evaluate-writing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ essay, taskPrompt }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Xatolik yuz berdi.");
      return;
    }
    setResult(data);

    const avgBand = (data.task_response + data.coherence + data.lexical + data.grammar) / 4;

    await supabase.from("writing_submissions").insert({
      user_id: userId,
      task_title: taskPrompt,
      essay_text: essay,
      band_task_response: data.task_response,
      band_coherence: data.coherence,
      band_lexical: data.lexical,
      band_grammar: data.grammar,
      ai_feedback: data.feedback,
    });
    await supabase.from("progress").insert({ user_id: userId, lesson_id: lessonId, score: Math.round(avgBand * 10) });
    await supabase.rpc("award_xp", { p_user_id: userId, p_xp: 25, p_lesson: true });
  }

  return (
    <div className="grid grid-cols-2 gap-4 max-[860px]:grid-cols-1">
      <div className="bg-card border border-border rounded-2xl p-5">
        <textarea
          rows={14}
          value={essay}
          onChange={(e) => setEssay(e.target.value)}
          placeholder="Insholaringizni shu yerga yozing..."
          className="w-full bg-bg2 border border-border rounded-lg p-3 text-[13.5px] outline-none focus:border-blue resize-y"
        />
        <div className="flex justify-between items-center mt-2.5">
          <span className="text-xs text-muted">{wordCount} so'z</span>
          <button
            onClick={handleCheck}
            disabled={loading || wordCount < 30}
            className="bg-grad text-white text-sm font-semibold px-4 py-2.5 rounded-lg disabled:opacity-40"
          >
            {loading ? "Tekshirilmoqda..." : "Tekshirish (AI)"}
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="text-[15px] font-bold mb-3">AI baholash (taxminiy)</div>
        {error && <p className="text-sm text-[#e05a5a]">{error}</p>}
        {!result && !error && (
          <p className="text-[13px] text-muted">Insho yuborilgach, 4 ta mezon bo'yicha taxminiy tahlil shu yerda chiqadi.</p>
        )}
        {result && (
          <div>
            <Row label="Task Response" value={result.task_response} />
            <Row label="Coherence & Cohesion" value={result.coherence} />
            <Row label="Lexical Resource" value={result.lexical} />
            <Row label="Grammatical Range" value={result.grammar} last />
            <p className="text-[13px] text-[#c7cdea] mt-3 leading-6">{result.feedback}</p>
            <p className="text-[11px] text-muted mt-3">* Taxminiy AI bahosi, rasmiy IELTS natijasi emas.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, last }: { label: string; value: number; last?: boolean }) {
  return (
    <div className={`flex justify-between items-center py-2 ${last ? "" : "border-b border-border"}`}>
      <span className="text-[13px]">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
