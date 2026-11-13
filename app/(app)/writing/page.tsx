"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import GroupedPicker from "@/components/GroupedPicker";
import WritingEditor from "@/components/WritingEditor";

type Lesson = { id: string; title: string; level: string | null; question_type: string | null; content: any };

export default function WritingPage() {
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
        .eq("module", "writing")
        .order("created_at", { ascending: true });
      if (data) setLessons(data);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-sora text-xl font-bold">✍️ IELTS Writing</h1>
        <p className="text-muted text-sm mt-1">Task 1 yoki Task 2 ni tanlang</p>
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
          groupOf={(l) => (l.question_type?.startsWith("Task 1") ? "Task 1" : "Task 2")}
          groupOrder={["Task 1", "Task 2"]}
          badgeOf={(l) => l.question_type ?? "Writing"}
          onSelect={(id) => setSelected(lessons.find((l) => l.id === id) ?? null)}
        />
      ) : (
        <div>
          <button onClick={() => setSelected(null)} className="text-sm text-blue mb-4">
            ← Ortga, royxatga
          </button>
          <p className="text-muted text-sm mb-4 max-w-xl">{selected.content.prompt}</p>
          <WritingEditor lessonId={selected.id} taskPrompt={selected.content.prompt} userId={userId!} />
        </div>
      )}
    </div>
  );
}
