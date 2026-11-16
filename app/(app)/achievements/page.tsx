import { createClient } from "@/lib/supabase/server";

export default async function AchievementsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("xp, streak, lessons_completed")
    .eq("id", user!.id)
    .single();

  const { count: vocabCount } = await supabase
    .from("vocabulary")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user!.id);

  const xp = profile?.xp ?? 0;
  const streak = profile?.streak ?? 0;
  const lessons = profile?.lessons_completed ?? 0;
  const vocab = vocabCount ?? 0;

  const achievements = [
    { icon: "🔥", title: "3 kunlik streak", unlocked: streak >= 3 },
    { icon: "🔥🔥", title: "7 kunlik streak", unlocked: streak >= 7 },
    { icon: "📘", title: "10 ta so'z yodlandi", unlocked: vocab >= 10 },
    { icon: "📚", title: "25 ta so'z yodlandi", unlocked: vocab >= 25 },
    { icon: "🥇", title: "Birinchi dars yakunlandi", unlocked: lessons >= 1 },
    { icon: "🏆", title: "5 ta dars yakunlandi", unlocked: lessons >= 5 },
    { icon: "⭐", title: "100 XP to'plandi", unlocked: xp >= 100 },
    { icon: "💎", title: "500 XP to'plandi", unlocked: xp >= 500 },
  ];

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-sora text-xl font-bold">🏅 Achievements</h1>
        <p className="text-muted text-sm mt-1">Yutuqlaringiz — real faoliyatingiz asosida</p>
      </div>
      <div className="grid grid-cols-4 gap-4 max-[860px]:grid-cols-2">
        {achievements.map((a, i) => (
          <div
            key={i}
            className={`bg-card border rounded-2xl p-5 text-center ${
              a.unlocked ? "border-blue" : "border-border opacity-40"
            }`}
          >
            <div className="text-2xl mb-2">{a.icon}</div>
            <div className="text-[12.5px] font-semibold">{a.title}</div>
            {!a.unlocked && <div className="text-[10px] text-muted mt-1.5">hali yopiq</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
