"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import LevelLessonPicker from "@/components/LevelLessonPicker";
import GrammarQuiz from "@/components/GrammarQuiz";

type Lesson = { id: string; title: string; level: string | null; question_type: string | null; content: any };

export default function GeneralPage() {
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
        .eq("module", "general")
        .order("created_at", { ascending: true });
      if (data) setLessons(data);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-sora text-xl font-bold">🅰️ General English</h1>
        <p className="text-muted text-sm mt-1">Darajangizni va grammatika mavzusini tanlang</p>
      </div>

      {loading ? (
        <p className="text-sm text-muted">Yuklanmoqda...</p>
      ) : lessons.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-8 max-w-md text-center">
          <p className="text-sm text-muted">Hali dars yoq.</p>
        </div>
      ) : !selected ? (
        <LevelLessonPicker
          lessons={lessons}
          onSelect={(id) => setSelected(lessons.find((l) => l.id === id) ?? null)}
        />
      ) : (
        <div>
          <button onClick={() => setSelected(null)} className="text-sm text-blue mb-4">
            ← Ortga, mavzular royxatiga
          </button>
          <GrammarQuiz lesson={selected} userId={userId!} />
        </div>
      )}
    </div>
  );
}
