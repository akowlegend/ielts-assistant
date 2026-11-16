"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  full_name: string | null;
  xp: number;
  streak: number;
  lessons_completed: number;
  target_band: number;
};

export default function DashboardPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [vocab, setVocab] = useState<{ id: string; word: string }[]>([]);
  const [newWord, setNewWord] = useState("");
  const [missionDone, setMissionDone] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [writingBand, setWritingBand] = useState<number | null>(null);
  const [speakingBand, setSpeakingBand] = useState<number | null>(null);
  const [weaknesses, setWeaknesses] = useState<{ module: string; avg: number }[]>([]);

  const MODULE_LABELS: Record<string, string> = {
    reading: "Reading", listening: "Listening", writing: "Writing",
    speaking: "Speaking", general: "General English", cefr: "CEFR",
  };

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);

      const { data: p } = await supabase
        .from("profiles")
        .select("full_name, xp, streak, lessons_completed, target_band")
        .eq("id", user.id)
        .single();
      if (p) setProfile(p as Profile);

      const { data: v } = await supabase
        .from("vocabulary")
        .select("id, word")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(8);
      if (v) setVocab(v);

      const { data: lastWriting } = await supabase
        .from("writing_submissions")
        .select("band_task_response, band_coherence, band_lexical, band_grammar")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (lastWriting) {
        const avg = (lastWriting.band_task_response + lastWriting.band_coherence + lastWriting.band_lexical + lastWriting.band_grammar) / 4;
        setWritingBand(Math.round(avg * 10) / 10);
      }

      const { data: lastSpeaking } = await supabase
        .from("speaking_submissions")
        .select("estimated_band")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (lastSpeaking) setSpeakingBand(lastSpeaking.estimated_band);

      const { data: prog } = await supabase
        .from("progress")
        .select("score, lessons!inner(module)")
        .eq("user_id", user.id);
      if (prog && prog.length > 0) {
        const byModule: Record<string, number[]> = {};
        for (const row of prog as any[]) {
          const m = row.lessons.module;
          if (!byModule[m]) byModule[m] = [];
          byModule[m].push(row.score);
        }
        const averages = Object.entries(byModule).map(([module, scores]) => ({
          module,
          avg: scores.reduce((a, b) => a + b, 0) / scores.length,
        }));
        averages.sort((a, b) => a.avg - b.avg);
        setWeaknesses(averages.slice(0, 2));
      }

      setLoading(false);
    })();
  }, []);

  async function addXp(amount: number) {
    if (!userId || !profile) return;
    await supabase.rpc("award_xp", { p_user_id: userId, p_xp: amount, p_lesson: false });
    const { data: p } = await supabase
      .from("profiles")
      .select("full_name, xp, streak, lessons_completed, target_band")
      .eq("id", userId)
      .single();
    if (p) setProfile(p as Profile);
  }

  async function completeMission() {
    if (missionDone) return;
    setMissionDone(true);
    await addXp(15);
  }

  async function addVocab() {
    const word = newWord.trim();
    if (!word || !userId) return;
    setNewWord("");
    const { data } = await supabase
      .from("vocabulary")
      .insert({ user_id: userId, word })
      .select("id, word")
      .single();
    if (data) setVocab([data, ...vocab]);
    await addXp(5);
  }

  if (loading) {
    return <div className="text-muted text-sm">Yuklanmoqda...</div>;
  }

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#5b8def29] to-[#9b6bf21a] border border-border rounded-[18px] p-6 mb-5 flex justify-between items-center flex-wrap gap-5">
        <div>
          <h2 className="font-sora text-xl font-semibold mb-1">
            Xush kelibsiz, {profile?.full_name ?? "do'stim"}!
          </h2>
          <p className="text-muted text-sm">
            Target band: <strong className="text-white">{profile?.target_band ?? 7.0}</strong> — davom eting.
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4 mb-4 max-[860px]:grid-cols-2">
        <StatCard num={profile?.xp ?? 0} label="⚡ XP ball" />
        <StatCard num={`${profile?.streak ?? 0} 🔥`} label="Kunlik streak" />
        <StatCard num={profile?.target_band ?? 7.0} label="Target IELTS band" />
        <StatCard num={profile?.lessons_completed ?? 0} label="Yakunlangan darslar" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 max-[860px]:grid-cols-1">
        {/* Daily mission */}
        <Card title="🎯 Daily Mission">
          <p className="text-[13px] text-muted mb-2.5">Bugungi topshiriq — bajarib, XP to'plang.</p>
          <div className="flex items-center justify-between border-b border-border py-2.5">
            <div>
              <div className="text-[13.5px] font-semibold">1 ta yangi so'z saqlash</div>
              <div className="text-xs text-muted mt-0.5">+15 XP</div>
            </div>
            <button
              onClick={completeMission}
              disabled={missionDone}
              className={`text-xs font-semibold px-3.5 py-2 rounded-lg ${
                missionDone ? "bg-card2 text-muted" : "bg-grad text-white"
              }`}
            >
              {missionDone ? "✓ Bajarildi" : "Bajarish"}
            </button>
          </div>
        </Card>

        {/* AI band predictor — real data */}
        <Card title="🤖 AI Band Predictor">
          <p className="text-[12.5px] text-muted mb-3">So'nggi javoblaringiz asosida taxminiy band:</p>
          <div className="flex gap-5">
            <div>
              <div className="font-sora text-2xl font-bold text-blue">{writingBand ?? "—"}</div>
              <div className="text-xs text-muted">Writing</div>
            </div>
            <div>
              <div className="font-sora text-2xl font-bold text-purple">{speakingBand ?? "—"}</div>
              <div className="text-xs text-muted">Speaking</div>
            </div>
          </div>
          {writingBand === null && speakingBand === null && (
            <p className="text-[11px] text-muted mt-3">Birinchi Writing/Speaking javobingizdan keyin shu yerda ko'rinadi.</p>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 max-[860px]:grid-cols-1">
        {/* My weaknesses — real data from progress */}
        <Card title="🧠 My Weaknesses">
          <p className="text-[12.5px] text-muted mb-3">Eng past natijali bolimlaringiz — shu yerga koproq vaqt ajrating.</p>
          {weaknesses.length === 0 ? (
            <p className="text-xs text-muted">Hali yetarli malumot yoq. Bir nechta mashqni yakunlang.</p>
          ) : (
            weaknesses.map((w) => (
              <a
                key={w.module}
                href={`/${w.module}`}
                className="flex justify-between items-center py-2 border-b border-border last:border-none hover:text-blue"
              >
                <span className="text-[13.5px] font-semibold">{MODULE_LABELS[w.module] ?? w.module}</span>
                <span className="text-[11px] bg-[#1c2546] text-blue px-2 py-0.5 rounded-full">
                  ortacha {Math.round(w.avg)}%
                </span>
              </a>
            ))
          )}
        </Card>

        {/* Vocabulary notebook — real DB */}
        <Card title="📚 Vocabulary Notebook">
          <div>
            {vocab.length === 0 && (
              <p className="text-xs text-muted">Hali so'z qo'shilmagan.</p>
            )}
            {vocab.map((v) => (
              <div key={v.id} className="flex justify-between items-center py-2 border-b border-border last:border-none">
                <span className="text-[13.5px] font-semibold">{v.word}</span>
                <span className="text-[11px] bg-[#1c2546] text-blue px-2 py-0.5 rounded-full">saqlangan</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2.5">
            <input
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addVocab()}
              placeholder="Yangi so'z qo'shish..."
              className="flex-1 bg-bg2 border border-border rounded-lg px-3 py-2 text-[13.5px] outline-none focus:border-blue"
            />
            <button onClick={addVocab} className="bg-grad text-white text-xs font-semibold px-3.5 rounded-lg">
              Qo'shish
            </button>
          </div>
        </Card>

        {/* Study planner (static demo) */}
        <Card title="🗓️ Study Planner">
          <PlanRow title="Reading — Matching Headings" sub="Bugun, 20 daqiqa" badge="Reja" />
          <PlanRow title="Writing Task 2 — Opinion Essay" sub="Ertaga, 40 daqiqa" badge="Reja" purple />
        </Card>
      </div>
    </div>
  );
}

function StatCard({ num, label }: { num: number | string; label: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="font-sora text-2xl font-bold">{num}</div>
      <div className="text-xs text-muted mt-1.5">{label}</div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="text-[15px] font-bold mb-3">{title}</div>
      {children}
    </div>
  );
}

function PlanRow({ title, sub, badge, purple }: { title: string; sub: string; badge: string; purple?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-border last:border-none">
      <div>
        <div className="text-[13.5px] font-semibold">{title}</div>
        <div className="text-xs text-muted mt-0.5">{sub}</div>
      </div>
      <span className={`text-[11px] px-2.5 py-1 rounded-full font-semibold ${purple ? "bg-[#241c46] text-purple" : "bg-[#1c2546] text-blue"}`}>
        {badge}
      </span>
    </div>
  );
}
