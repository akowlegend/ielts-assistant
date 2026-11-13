"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { setError(error.message); return; }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-bg px-4">
      <form onSubmit={handleLogin} className="w-full max-w-sm bg-card border border-border rounded-2xl p-7">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-card2 p-1.5">
            <Image src="/logo.png" alt="IELTS Assistant" width={40} height={40} className="object-contain w-full h-full" />
          </div>
          <div>
            <div className="font-sora font-bold text-sm">IELTS Assistant</div>
            <div className="text-xs text-muted">from Akramjon</div>
          </div>
        </div>
        <h1 className="font-sora text-lg font-semibold mb-5">Tizimga kirish</h1>
        {error && <p className="text-sm text-red-400 mb-3">{error}</p>}
        <label className="text-xs text-muted">Email</label>
        <input
          type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-1 mb-4 bg-bg2 border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue"
        />
        <label className="text-xs text-muted">Parol</label>
        <input
          type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-1 mb-5 bg-bg2 border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue"
        />
        <button disabled={loading} className="w-full bg-grad rounded-lg py-2.5 text-sm font-semibold disabled:opacity-60">
          {loading ? "Kirilmoqda..." : "Kirish"}
        </button>
        <p className="text-xs text-muted text-center mt-4">
          Hisobingiz yo'qmi? <Link href="/signup" className="text-blue">Ro'yxatdan o'tish</Link>
        </p>
      </form>
    </main>
  );
}
