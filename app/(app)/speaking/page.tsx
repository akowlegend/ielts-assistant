"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import GroupedPicker from "@/components/GroupedPicker";
import SpeakingRecorder from "@/components/SpeakingRecorder";

type Lesson = { id: string; title: string; level: string | null; question_type: string | null; content: any };

export default function SpeakingPage() {
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
        .eq("module", "speaking")
        .order("created_at", { ascending: true });
      if (data) setLessons(data);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-sora text-xl font-bold">🎤 IELTS Speaking</h1>
        <p className="text-muted text-sm mt-1">Part 1, 2 yoki 3 ni tanlang</p>
      </div>

      {loading ? (
        <p className="text-sm text-muted">Yuklanmoqda...</p>
      ) : lessons.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-8 max-w-md text-center">
          <p className="text-sm text-muted">Hali dars yoq.</p>
        </div>
      ) : !selected ? (
        <GroupedPicker
          items={lessons}
          groupOf={(l) => `Part ${l.content?.part ?? 2}`}
          groupOrder={["Part 1", "Part 2", "Part 3"]}
          badgeOf={(l) => l.question_type ?? "Speaking"}
          onSelect={(id) => setSelected(lessons.find((l) => l.id === id) ?? null)}
        />
      ) : (
        <div>
          <button onClick={() => setSelected(null)} className="text-sm text-blue mb-4">
            ← Ortga, royxatga
          </button>
          <div className="bg-card border border-border rounded-2xl p-5 mb-4 max-w-xl">
            <p className="text-[13.5px] leading-7">{selected.content.cue_card}</p>
          </div>
          <SpeakingRecorder
            lessonId={selected.id}
            cueCard={selected.content.cue_card}
            userId={userId!}
            part={selected.content.part ?? 2}
          />
        </div>
      )}
    </div>
  );
}
