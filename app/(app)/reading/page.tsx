"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import ReadingQuiz from "@/components/ReadingQuiz";

type Lesson = { id: string; title: string; level: string | null; question_type: string | null; content: any };

export default function ReadingPage() {
  const supabase = createClient();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selected, setSelected] = useState<Lesson | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
      const { data } = await supabase
        .from("lessons")
        .select("id, title, level, question_type, content")
        .eq("module", "reading")
        .order("created_at", { ascending: true });
      if (data) setLessons(data);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-sora text-xl font-bold">📖 IELTS Reading</h1>
        <p className="text-muted text-sm mt-1">Passage tanlang (har biri ~20 daqiqa)</p>
      </div>

      {loading ? (
        <p className="text-sm text-muted">Yuklanmoqda...</p>
      ) : lessons.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-8 max-w-md text-center">
          <p className="text-sm text-muted">Hali dars yoq.</p>
        </div>
      ) : !selected ? (
        <div className="grid grid-cols-2 gap-3 max-[700px]:grid-cols-1">
          {lessons.map((l) => (
            <button
              key={l.id}
              onClick={() => setSelected(l)}
              className="text-left bg-card border border-border hover:border-blue rounded-xl p-4"
            >
              <div className="text-[11px] text-blue font-semibold mb-1">{l.content?.section_label ?? "Passage"}</div>
              <div className="text-[13.5px] font-semibold mb-1.5">{l.title}</div>
              <span className="text-[11px] bg-[#1c2546] text-blue px-2 py-0.5 rounded-full">{l.question_type ?? "Mashq"}</span>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setSelected(null)} className="text-sm text-blue mb-4">
            ← Ortga, royxatga
          </button>
          <ReadingQuiz lesson={selected} userId={userId!} />
        </div>
      )}
    </div>
  );
}
