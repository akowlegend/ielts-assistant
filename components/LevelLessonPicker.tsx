"use client";
import { useMemo, useState } from "react";

type LessonMeta = { id: string; title: string; level: string | null; question_type: string | null };

const LEVEL_ORDER = ["A2", "B1", "B2", "C1", "C2"];

export default function LevelLessonPicker({
  lessons,
  onSelect,
}: {
  lessons: LessonMeta[];
  onSelect: (id: string) => void;
}) {
  const levels = useMemo(() => {
    const present = Array.from(new Set(lessons.map((l) => l.level ?? "—")));
    return LEVEL_ORDER.filter((lv) => present.includes(lv)).concat(
      present.filter((p) => !LEVEL_ORDER.includes(p))
    );
  }, [lessons]);

  const [activeLevel, setActiveLevel] = useState(levels[0] ?? "—");
  const filtered = lessons.filter((l) => (l.level ?? "—") === activeLevel);

  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {levels.map((lv) => (
          <button
            key={lv}
            onClick={() => setActiveLevel(lv)}
            className={`text-[13px] font-semibold px-4 py-2 rounded-lg border ${
              activeLevel === lv
                ? "bg-grad text-white border-transparent"
                : "border-border text-muted hover:text-white hover:border-blue"
            }`}
          >
            {lv}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 max-[700px]:grid-cols-1">
        {filtered.length === 0 && (
          <p className="text-sm text-muted">Bu darajada hali dars yoq.</p>
        )}
        {filtered.map((l) => (
          <button
            key={l.id}
            onClick={() => onSelect(l.id)}
            className="text-left bg-card border border-border hover:border-blue rounded-xl p-4 transition-colors"
          >
            <div className="text-[13.5px] font-semibold mb-1.5">{l.title}</div>
            <span className="text-[11px] bg-[#1c2546] text-blue px-2 py-0.5 rounded-full">
              {l.question_type ?? "Mashq"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
