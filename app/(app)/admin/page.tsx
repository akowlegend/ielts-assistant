import { createClient } from "@/lib/supabase/server";
import AdminLessons from "@/components/AdminLessons";
import AdminUsers from "@/components/AdminUsers";

export default async function AdminPage({ searchParams }: { searchParams: { tab?: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user!.id).single();

  if (!profile?.is_admin) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 max-w-md">
        <p className="text-sm text-muted">Bu sahifa faqat adminlar uchun.</p>
      </div>
    );
  }

  const tab = searchParams.tab === "users" ? "users" : "lessons";

  const { data: lessons } = await supabase
    .from("lessons")
    .select("id, module, title, level, question_type, content, created_at")
    .order("created_at", { ascending: false });

  const { data: users } = await supabase
    .from("profiles")
    .select("id, full_name, email, xp, streak, lessons_completed, is_admin, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-sora text-xl font-bold">🛠️ Admin panel</h1>
        <p className="text-muted text-sm mt-1">Darslarni boshqarish va foydalanuvchilarni korish</p>
      </div>

      <div className="flex gap-2 mb-5">
        <a
          href="/admin?tab=lessons"
          className={`text-[13px] font-semibold px-4 py-2 rounded-lg border ${
            tab === "lessons" ? "bg-grad text-white border-transparent" : "border-border text-muted"
          }`}
        >
          📚 Darslar
        </a>
        <a
          href="/admin?tab=users"
          className={`text-[13px] font-semibold px-4 py-2 rounded-lg border ${
            tab === "users" ? "bg-grad text-white border-transparent" : "border-border text-muted"
          }`}
        >
          👥 Foydalanuvchilar
        </a>
      </div>

      {tab === "lessons" ? (
        <AdminLessons initialLessons={lessons ?? []} />
      ) : (
        <AdminUsers users={users ?? []} />
      )}
    </div>
  );
}
