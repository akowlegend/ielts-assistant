"use client";

type UserRow = {
  id: string;
  full_name: string | null;
  email: string | null;
  xp: number;
  streak: number;
  lessons_completed: number;
  is_admin: boolean;
  created_at: string;
};

export default function AdminUsers({ users }: { users: UserRow[] }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="text-[15px] font-bold mb-1">Foydalanuvchilar ({users.length})</div>
      <p className="text-[12.5px] text-muted mb-4">Saytga royxatdan otgan barcha foydalanuvchilar.</p>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-border text-muted text-[11px] uppercase">
              <th className="py-2 pr-3">Ism</th>
              <th className="py-2 pr-3">Email</th>
              <th className="py-2 pr-3">XP</th>
              <th className="py-2 pr-3">Streak</th>
              <th className="py-2 pr-3">Darslar</th>
              <th className="py-2 pr-3">Royxatdan otgan</th>
              <th className="py-2">Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-border last:border-none">
                <td className="py-2.5 pr-3 font-semibold">{u.full_name ?? "—"}</td>
                <td className="py-2.5 pr-3 text-muted">{u.email ?? "—"}</td>
                <td className="py-2.5 pr-3">{u.xp}</td>
                <td className="py-2.5 pr-3">{u.streak} 🔥</td>
                <td className="py-2.5 pr-3">{u.lessons_completed}</td>
                <td className="py-2.5 pr-3 text-muted">
                  {new Date(u.created_at).toLocaleDateString("uz-UZ")}
                </td>
                <td className="py-2.5">
                  {u.is_admin && <span className="text-[11px] bg-[#1c2546] text-blue px-2 py-0.5 rounded-full">admin</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && <p className="text-sm text-muted py-4">Hali foydalanuvchi yoq.</p>}
      </div>
    </div>
  );
}
