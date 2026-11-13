"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  ["/dashboard", "📊", "Dashboard"],
  ["/reading", "📖", "Reading"],
  ["/listening", "🎧", "Listening"],
  ["/writing", "✍️", "Writing"],
  ["/speaking", "🎤", "Speaking"],
  ["/general", "🅰️", "General English"],
  ["/cefr", "🎓", "Multilevel CEFR"],
  ["/video", "🎬", "Video Lessons"],
  ["/ai", "🤖", "AI English Tutor"],
  ["/achievements", "🏅", "Achievements"],
  ["/profile", "👤", "My Profile"],
  ["/premium", "💎", "Premium"],
] as const;

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [isAdmin, setIsAdmin] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
      if (data?.is_admin) setIsAdmin(true);
    })();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-3.5 left-3.5 z-30 w-9 h-9 rounded-lg bg-card2 border border-border flex items-center justify-center text-base"
        aria-label="Menyu"
      >
        {open ? "✕" : "☰"}
      </button>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-20"
        />
      )}
      <aside
        className={`w-[240px] min-w-[240px] bg-bg2 border-r border-border p-3.5 flex flex-col gap-1 h-screen overflow-y-auto z-[25]
        fixed md:sticky top-0 transition-transform duration-200
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
      <div className="flex items-center gap-2.5 px-2 pb-5 pt-1.5">
        <div className="w-9 h-9 rounded-[11px] overflow-hidden flex items-center justify-center flex-shrink-0 bg-card2 p-1">
          <Image src="/logo.png" alt="IELTS Assistant" width={36} height={36} className="object-contain w-full h-full" />
        </div>
        <div>
          <div className="font-sora font-bold text-sm leading-tight">IELTS Assistant</div>
          <div className="text-[11px] text-muted">from Akramjon</div>
        </div>
      </div>
      <nav className="flex flex-col gap-0.5">
        {NAV.map(([href, icon, label]) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-sm font-medium transition-colors ${
                active ? "bg-card2 text-white shadow-[inset_2px_0_0_#5b8def]" : "text-muted hover:bg-card2 hover:text-white"
              }`}
            >
              <span className="w-[18px] text-center">{icon}</span>
              <span>{label}</span>
            </Link>
          );
        })}
        {isAdmin && (
          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-sm font-medium transition-colors ${
              pathname === "/admin" ? "bg-card2 text-white shadow-[inset_2px_0_0_#5b8def]" : "text-muted hover:bg-card2 hover:text-white"
            }`}
          >
            <span className="w-[18px] text-center">🛠️</span>
            <span>Admin</span>
          </Link>
        )}
      </nav>
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-sm font-medium text-muted hover:bg-card2 hover:text-white text-left"
      >
        <span className="w-[18px] text-center">🚪</span>
        <span>Chiqish</span>
      </button>
      </aside>
    </>
  );
}
