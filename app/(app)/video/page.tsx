"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type VideoLesson = {
  id: string;
  title: string;
  question_type: string | null;
  content: { youtube_id: string; description: string };
};

export default function VideoPage() {
  const supabase = createClient();
  const [videos, setVideos] = useState<VideoLesson[]>([]);
  const [watched, setWatched] = useState<Set<string>>(new Set());
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);

      const { data } = await supabase
        .from("lessons")
        .select("id, title, question_type, content")
        .eq("module", "video")
        .order("created_at", { ascending: true });
      if (data) setVideos(data);

      const { data: prog } = await supabase
        .from("progress")
        .select("lesson_id, lessons!inner(module)")
        .eq("user_id", user.id)
        .eq("lessons.module", "video");
      if (prog) setWatched(new Set(prog.map((p: any) => p.lesson_id)));

      setLoading(false);
    })();
  }, []);

  async function markWatched(lessonId: string) {
    if (watched.has(lessonId) || !userId) return;
    setWatched(new Set([...watched, lessonId]));
    await supabase.from("progress").insert({ user_id: userId, lesson_id: lessonId, score: 100 });
    await supabase.rpc("award_xp", { p_user_id: userId, p_xp: 10, p_lesson: true });
  }

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-sora text-xl font-bold">🎬 Video Lessons</h1>
        <p className="text-muted text-sm mt-1">Mavzular boyicha tartiblangan videodarslar</p>
      </div>

      {loading ? (
        <p className="text-sm text-muted">Yuklanmoqda...</p>
      ) : videos.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-8 max-w-md text-center">
          <p className="text-sm text-muted">Hali video yoq. Supabase SQL Editorda seed_video.sql faylini ishga tushiring.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 max-[860px]:grid-cols-1">
          {videos.map((v) => (
            <div key={v.id} className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${v.content.youtube_id}`}
                  title={v.title}
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] bg-[#1c2546] text-blue px-2 py-0.5 rounded-full">
                    {v.question_type ?? "Video"}
                  </span>
                  {watched.has(v.id) && <span className="text-[11px] text-good">✓ korilgan</span>}
                </div>
                <div className="text-[14px] font-semibold mb-1">{v.title}</div>
                <p className="text-[12.5px] text-muted mb-3">{v.content.description}</p>
                {!watched.has(v.id) && (
                  <button
                    onClick={() => markWatched(v.id)}
                    className="text-xs font-semibold text-blue hover:underline"
                  >
                    Men korib chiqdim (+10 XP)
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
