"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Field = { id: string; label: string; answer: string };
type Lesson = { id: string; title: string; level: string | null; content: { passage: string; fields: Field[] } };

function normalize(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

export default function ReadingFillQuiz({ lesson, userId }: { lesson: Lesson; userId: string }) {
  const supabase = createClient();
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const total = lesson.content.fields.length;
  const correctCount = lesson.content.fields.filter(
    (f) => normalize(values[f.id] ?? "") === normalize(f.answer)
  ).length;

  async function handleSubmit() {
    setSubmitted(true);
    const score = Math.round((correctCount / total) * 100);
    await supabase.from("progress").insert({ user_id: userId, lesson_id: lesson.id, score });
    await supabase.rpc("award_xp", { p_user_id: userId, p_xp: correctCount * 10, p_lesson: true });
  }

  return (
    <div className="grid grid-cols-2 gap-4 max-[860px]:grid-cols-1">
      <div className="bg-card border border-border rounded-2xl p-5">
        <h3 className="font-bold mb-2.5">{lesson.title}</h3>
        <p className="text-[13.5px] leading-7 text-[#c7cdea]">{lesson.content.passage}</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        {lesson.content.fields.map((f) => {
          const correct = submitted && normalize(values[f.id] ?? "") === normalize(f.answer);
          const wrong = submitted && !correct;
          return (
            <div key={f.id} className="mb-4">
              <label className="text-[13px] text-muted">{f.label}</label>
              <input
                type="text"
                disabled={submitted}
                value={values[f.id] ?? ""}
                onChange={(e) => setValues({ ...values, [f.id]: e.target.value })}
                className={`w-full mt-1 bg-bg2 border rounded-lg px-3 py-2 text-[13.5px] outline-none ${
                  correct ? "border-good" : wrong ? "border-[#e05a5a]" : "border-border focus:border-blue"
                }`}
              />
              {wrong && <p className="text-xs text-[#e05a5a] mt-1">Togri javob: {f.answer}</p>}
            </div>
          );
        })}
        {!submitted ? (
          <button onClick={handleSubmit} className="bg-grad text-white text-sm font-semibold px-4 py-2.5 rounded-lg">
            Tekshirish
          </button>
        ) : (
          <div className="bg-bg2 border border-border rounded-lg p-4">
            <p className="font-sora font-bold text-lg">{correctCount} / {total} togri</p>
            <p className="text-xs text-muted mt-1">+{correctCount * 10} XP qoshildi</p>
          </div>
        )}
      </div>
    </div>
  );
}
