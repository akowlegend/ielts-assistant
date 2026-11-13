"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Question = { id: string; prompt: string; options: string[]; correct: number };
type Lesson = { id: string; title: string; level: string | null; content: { passage: string; questions: Question[] } };

export default function ReadingQuiz({ lesson, userId }: { lesson: Lesson; userId: string }) {
  const supabase = createClient();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const total = lesson.content.questions.length;
  const correctCount = lesson.content.questions.filter((q) => answers[q.id] === q.correct).length;

  async function handleSubmit() {
    setSubmitted(true);
    if (saving) return;
    setSaving(true);
    const score = Math.round((correctCount / total) * 100);
    const xpGain = correctCount * 10;

    await supabase.from("progress").insert({ user_id: userId, lesson_id: lesson.id, score });
    await supabase.rpc("award_xp", { p_user_id: userId, p_xp: xpGain, p_lesson: true });
    setSaving(false);
  }

  return (
    <div className="grid grid-cols-2 gap-4 max-[860px]:grid-cols-1">
      <div className="bg-card border border-border rounded-2xl p-5">
        <h3 className="font-bold mb-2.5">Passage: {lesson.title}</h3>
        <span className="text-[11px] bg-[#1c2546] text-blue px-2 py-0.5 rounded-full">{lesson.level}</span>
        <p className="text-[13.5px] leading-7 text-[#c7cdea] mt-3">{lesson.content.passage}</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        {lesson.content.questions.map((q, qi) => (
          <div key={q.id} className="mb-5">
            <p className="text-[13.5px] font-semibold mb-2">{qi + 1}. {q.prompt}</p>
            {q.options.map((opt, oi) => {
              const picked = answers[q.id] === oi;
              let cls = "bg-bg2 border-border";
              if (submitted) {
                if (oi === q.correct) cls = "bg-[#3ecf8e1f] border-good";
                else if (picked) cls = "bg-[#e05a5a1f] border-[#e05a5a]";
              } else if (picked) {
                cls = "bg-card2 border-blue";
              }
              return (
                <button
                  key={oi}
                  disabled={submitted}
                  onClick={() => setAnswers({ ...answers, [q.id]: oi })}
                  className={`block w-full text-left border rounded-lg px-3.5 py-2.5 mb-2 text-[13.5px] ${cls}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        ))}

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < total}
            className="bg-grad text-white text-sm font-semibold px-4 py-2.5 rounded-lg disabled:opacity-40"
          >
            Tekshirish
          </button>
        ) : (
          <div className="bg-bg2 border border-border rounded-lg p-4 mt-2">
            <p className="font-sora font-bold text-lg">{correctCount} / {total} to'g'ri</p>
            <p className="text-xs text-muted mt-1">+{correctCount * 10} XP qo'shildi</p>
          </div>
        )}
      </div>
    </div>
  );
}
