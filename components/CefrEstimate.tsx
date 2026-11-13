"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

function levelFromScore(avg: number) {
  if (avg < 40) return "A1";
  if (avg < 55) return "A2";
  if (avg < 70) return "B1";
  if (avg < 82) return "B2";
  if (avg < 92) return "C1";
  return "C2";
}

export default function CefrEstimate({ userId }: { userId: string }) {
  const supabase = createClient();
  const [avg, setAvg] = useState<number | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("progress")
        .select("score, lessons!inner(module)")
        .eq("user_id", userId)
        .eq("lessons.module", "cefr");
      if (data && data.length > 0) {
        const scores = data.map((d: any) => d.score as number);
        setAvg(scores.reduce((a, b) => a + b, 0) / scores.length);
        setCount(scores.length);
      }
    })();
  }, [userId]);

  return (
    <div className="bg-card border border-border rounded-2xl p-5 mb-5 flex items-center justify-between flex-wrap gap-4">
      <div>
        <div className="text-[15px] font-bold mb-1">Sizning taxminiy CEFR darajangiz</div>
        <p className="text-[12.5px] text-muted">
          {count === 0
            ? "Hali hech qanday bo'lim yakunlanmagan. Pastdagi mashqlardan kamida 3-4 tasini bajaring."
            : `${count} ta bo'lim natijasi asosida hisoblangan.`}
        </p>
      </div>
      {avg !== null && (
        <div className="text-center">
          <div className="font-sora text-3xl font-bold text-blue">{levelFromScore(avg)}</div>
          <div className="text-[11px] text-muted mt-1">o'rtacha {Math.round(avg)}%</div>
        </div>
      )}
    </div>
  );
}
