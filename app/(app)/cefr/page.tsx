"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import LevelLessonPicker from "@/components/LevelLessonPicker";
import ReadingQuiz from "@/components/ReadingQuiz";
import GrammarQuiz from "@/components/GrammarQuiz";
import CefrEstimate from "@/components/CefrEstimate";

type Lesson = { id: string; title: string; level: string | null; question_type: string | null; content: any };

export default function CefrPage() {
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
        .eq("module", "cefr")
        .order("created_at", { ascending: true });
      if (data) setLessons(data);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-sora text-xl font-bold">🎓 Multilevel CEFR</h1>
        <p className="text-muted text-sm mt-1">Rasmiy Multilevel imtihoniga tayyorgarlik — A1 dan C1 gacha</p>
      </div>

      {userId && <CefrEstimate userId={userId} />}

      {loading ? (
        <p className="text-sm text-muted">Yuklanmoqda...</p>
      ) : lessons.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-8 max-w-md text-center">
          <p className="text-sm text-muted">Hali dars yoq. Supabase SQL Editorda cefr_full_content.sql faylini ishga tushiring.</p>
        </div>
      ) : !selected ? (
        <LevelLessonPicker
          lessons={lessons}
          onSelect={(id) => setSelected(lessons.find((l) => l.id === id) ?? null)}
        />
      ) : (
        <div>
          <button onClick={() => setSelected(null)} className="text-sm text-blue mb-4">
            ← Ortga, bolimlar royxatiga
          </button>
          {selected.content.passage ? (
            <ReadingQuiz lesson={selected} userId={userId!} />
          ) : (
            <GrammarQuiz lesson={selected} userId={userId!} />
          )}
        </div>
      )}
    </div>
  );
}
