"use client";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Result = { transcript: string; band: number; feedback: string };
type Phase = "idle" | "prep" | "recording" | "uploading" | "done";

const PART_CONFIG: Record<number, { prep: number; speak: number; label: string }> = {
  1: { prep: 0, speak: 30, label: "Part 1 — qisqa javob (~30 soniya)" },
  2: { prep: 60, speak: 120, label: "Part 2 — uzun javob (1 daqiqa tayyorgarlik + 2 daqiqa)" },
  3: { prep: 0, speak: 50, label: "Part 3 — muhokama (~50 soniya)" },
};

export default function SpeakingRecorder({
  lessonId,
  cueCard,
  userId,
  part,
}: {
  lessonId: string;
  cueCard: string;
  userId: string;
  part: number;
}) {
  const supabase = createClient();
  const config = PART_CONFIG[part] ?? PART_CONFIG[2];

  const [phase, setPhase] = useState<Phase>("idle");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  function clearTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }

  async function begin() {
    setError("");
    setResult(null);

    const { data: profile } = await supabase.from("profiles").select("is_premium").eq("id", userId).single();
    if (!profile?.is_premium) {
      const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
      const [{ count: wCount }, { count: sCount }] = await Promise.all([
        supabase.from("writing_submissions").select("id", { count: "exact", head: true }).eq("user_id", userId).gte("created_at", todayStart.toISOString()),
        supabase.from("speaking_submissions").select("id", { count: "exact", head: true }).eq("user_id", userId).gte("created_at", todayStart.toISOString()),
      ]);
      if ((wCount ?? 0) + (sCount ?? 0) >= 1) {
        setError("Bugungi bepul limitingiz (1 ta Writing/Speaking tekshiruv) tugadi. Premium bilan cheksiz foydalaning: /premium");
        return;
      }
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
    } catch {
      setError("Mikrofonga ruxsat berilmadi. Brauzer sozlamalarini tekshiring.");
      return;
    }

    if (config.prep > 0) {
      setPhase("prep");
      setSecondsLeft(config.prep);
      timerRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            clearTimer();
            startRecording();
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      startRecording();
    }
  }

  function startRecording() {
    const stream = streamRef.current;
    if (!stream) return;
    const recorder = new MediaRecorder(stream);
    chunksRef.current = [];
    recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
    recorder.onstop = () => {
      stream.getTracks().forEach((t) => t.stop());
      handleUpload();
    };
    mediaRecorderRef.current = recorder;
    recorder.start();
    setPhase("recording");
    setSecondsLeft(config.speak);
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearTimer();
          stopRecording();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }

  function stopRecording() {
    clearTimer();
    mediaRecorderRef.current?.stop();
  }

  async function handleUpload() {
    setPhase("uploading");
    const blob = new Blob(chunksRef.current, { type: "audio/webm" });
    const form = new FormData();
    form.append("audio", blob, "speech.webm");
    form.append("cueCard", cueCard);

    const res = await fetch("/api/evaluate-speaking", { method: "POST", body: form });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Xatolik yuz berdi.");
      setPhase("idle");
      return;
    }
    setResult(data);
    setPhase("done");

    await supabase.from("speaking_submissions").insert({
      user_id: userId,
      cue_card: cueCard,
      transcript: data.transcript,
      estimated_band: data.band,
      ai_feedback: data.feedback,
    });
    await supabase.from("progress").insert({ user_id: userId, lesson_id: lessonId, score: Math.round(data.band * 10) });
    await supabase.rpc("award_xp", { p_user_id: userId, p_xp: 25, p_lesson: true });
  }

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="max-w-xl">
      <div className="bg-card border border-border rounded-2xl p-5 mb-4">
        <p className="text-xs text-muted mb-3">{config.label}</p>

        {phase === "idle" && (
          <button onClick={begin} className="bg-grad text-white text-sm font-semibold px-4 py-2.5 rounded-lg">
            🔴 Boshlash
          </button>
        )}

        {phase === "prep" && (
          <div>
            <div className="font-sora text-3xl font-bold text-warn mb-1">{mm}:{ss}</div>
            <p className="text-xs text-muted">Tayyorgarlik vaqti — fikrlaringizni tartibga soling.</p>
          </div>
        )}

        {phase === "recording" && (
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e05a5a] animate-pulse" />
            <div className="font-sora text-3xl font-bold text-blue">{mm}:{ss}</div>
            <button onClick={stopRecording} className="text-xs font-semibold border border-border rounded-lg px-3 py-1.5">
              To'xtatish
            </button>
          </div>
        )}

        {phase === "uploading" && <p className="text-sm text-muted">Tahlil qilinmoqda...</p>}

        {error && <p className="text-sm text-[#e05a5a] mt-3">{error}</p>}
      </div>

      {result && phase === "done" && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="text-[15px] font-bold mb-3">AI baholash (taxminiy)</div>
          <div className="font-sora text-2xl font-bold text-blue mb-2">Band: {result.band}</div>
          <p className="text-[13px] text-[#c7cdea] leading-6 mb-3">{result.feedback}</p>
          <details className="text-xs text-muted">
            <summary className="cursor-pointer">Transkripsiyani korish</summary>
            <p className="mt-2 leading-5">{result.transcript}</p>
          </details>
          <p className="text-[11px] text-muted mt-3">* Taxminiy AI bahosi, rasmiy IELTS natijasi emas.</p>
        </div>
      )}
    </div>
  );
}
