"use client";
import { useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function AiTutorChat() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Salom! Men sizning shaxsiy ingliz tili yordamchingizman. Grammatika, so'z boyligi yoki IELTS bo'yicha savol bering." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setError("");
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/ai-tutor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Xatolik yuz berdi.");
      return;
    }
    setMessages([...next, { role: "assistant", content: data.reply }]);
    setTimeout(() => boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" }), 50);
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-5 max-w-2xl">
      <div ref={boxRef} className="flex flex-col gap-3 max-h-[420px] overflow-y-auto pb-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-[13.5px] leading-relaxed ${
              m.role === "user"
                ? "self-end bg-grad text-white rounded-br-sm"
                : "self-start bg-card2 border border-border rounded-bl-sm"
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && <div className="self-start text-xs text-muted px-1">Yozmoqda...</div>}
      </div>
      {error && <p className="text-xs text-[#e05a5a] mt-2">{error}</p>}
      <div className="flex gap-2 mt-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Savolingizni yozing..."
          className="flex-1 bg-bg2 border border-border rounded-lg px-3 py-2.5 text-[13.5px] outline-none focus:border-blue"
        />
        <button onClick={send} disabled={loading} className="bg-grad text-white text-sm font-semibold px-4 rounded-lg disabled:opacity-50">
          Yuborish
        </button>
      </div>
    </div>
  );
}
