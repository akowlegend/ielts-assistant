import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, xp, streak, target_band")
    .eq("id", user!.id)
    .single();

  return (
    <div>
      <h1 className="font-sora text-xl font-bold mb-5">👤 My Profile</h1>
      <div className="bg-card border border-border rounded-2xl p-5 max-w-md">
        <Row label="Ism" value={profile?.full_name ?? "—"} />
        <Row label="Email" value={user?.email ?? "—"} />
        <Row label="IELTS maqsad" value={String(profile?.target_band ?? 7.0)} />
        <Row label="XP" value={String(profile?.xp ?? 0)} />
        <Row label="Streak" value={`${profile?.streak ?? 0} kun`} last />
      </div>
    </div>
  );
}

function Row({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`flex justify-between items-center py-2.5 ${last ? "" : "border-b border-border"}`}>
      <span className="text-[13.5px] font-semibold">{label}</span>
      <span className="text-sm text-muted">{value}</span>
    </div>
  );
}
