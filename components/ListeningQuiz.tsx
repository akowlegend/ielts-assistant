"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Field = { id: string; label: string; answer: string };
type Question = { id: string; prompt: string; options: string[]; correct: number };
type Lesson = {
  id: string;
  title: string;
  level: string | null;
  content: { intro: string; transcript: string; fields?: Field[]; questions?: Question[]; audio_url?: string };
};

function normalize(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

export default function ListeningQuiz({ lesson, userId }: { lesson: Lesson; userId: string }) {
  const supabase = createClient();
  const [values, setValues] = useState<Record<string, string>>({});
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const fields = lesson.content.fields ?? [];
  const questions = lesson.content.questions ?? [];
  const total = fields.length + questions.length;

  const fieldCorrect = fields.filter((f) => normalize(values[f.id] ?? "") === normalize(f.answer)).length;
  const mcqCorrect = questions.filter((q) => answers[q.id] === q.correct).length;
  const correctCount = fieldCorrect + mcqCorrect;
  const answeredCount = Object.keys(values).filter((k) => values[k]?.trim()).length + Object.keys(answers).length;

  async function handleSubmit() {
    setSubmitted(true);
    const score = Math.round((correctCount / total) * 100);
    const xpGain = correctCount * 10;

    await supabase.from("progress").insert({ user_id: userId, lesson_id: lesson.id, score });
    await supabase.rpc("award_xp", { p_user_id: userId, p_xp: xpGain, p_lesson: true });
  }

  return (
    <div className="max-w-xl">
      <div className="bg-card border border-border rounded-2xl p-5 mb-4">
        {lesson.content.audio_url ? (
          <audio controls src={lesson.content.audio_url} className="w-full" />
        ) : (
          <p className="text-xs text-muted">{lesson.content.intro}</p>
        )}
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        {questions.length > 0 && (
          <div className="mb-5">
            {questions.map((q, qi) => (
              <div key={q.id} className="mb-5">
                <p className="text-[13.5px] font-semibold mb-2">{qi + 1}. {q.prompt}</p>
                {q.options.map((opt, oi) => {
                  const picked = answers[q.id] === oi;
                  let cls = "bg-bg2 border-border";
                  if (submitted) {
                    if (oi === q.correct) cls = "bg-[#3ecf8e1f] border-good";
                    else if (picked) cls = "bg-[#e05a5a1f] border-[#e05a5a]";
                  } else if (picked) cls = "bg-card2 border-blue";
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
          </div>
        )}

        {fields.map((f, i) => {
          const correct = submitted && normalize(values[f.id] ?? "") === normalize(f.answer);
          const wrong = submitted && !correct;
          return (
            <div key={f.id} className="mb-4">
              <label className="text-[13px] text-muted">{questions.length + i + 1}. {f.label}</label>
              <input
                type="text"
                disabled={submitted}
                value={values[f.id] ?? ""}
                onChange={(e) => setValues({ ...values, [f.id]: e.target.value })}
                className={`w-full mt-1 bg-bg2 border rounded-lg px-3 py-2 text-[13.5px] outline-none ${
                  correct ? "border-good" : wrong ? "border-[#e05a5a]" : "border-border focus:border-blue"
                }`}
              />
              {wrong && <p className="text-xs text-[#e05a5a] mt-1">To'g'ri javob: {f.answer}</p>}
            </div>
          );
        })}

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={answeredCount < total}
            className="bg-grad text-white text-sm font-semibold px-4 py-2.5 rounded-lg disabled:opacity-40"
          >
            Tekshirish
          </button>
        ) : (
          <div className="bg-bg2 border border-border rounded-lg p-4 mt-2">
            <p className="font-sora font-bold text-lg">{correctCount} / {total} to'g'ri</p>
            <p className="text-xs text-muted mt-1">+{correctCount * 10} XP qo'shildi</p>
            <button onClick={() => setShowTranscript(!showTranscript)} className="text-xs text-blue mt-2">
              {showTranscript ? "Transkriptni yashirish" : "Transkriptni ko'rish"}
            </button>
            {showTranscript && <p className="text-xs text-muted mt-2 leading-5">{lesson.content.transcript}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
