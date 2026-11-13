"use client";
import { useMemo, useState } from "react";

export default function GroupedPicker<T extends { id: string; title: string }>({
  items,
  groupOf,
  groupOrder,
  badgeOf,
  onSelect,
}: {
  items: T[];
  groupOf: (item: T) => string;
  groupOrder?: string[];
  badgeOf: (item: T) => string;
  onSelect: (id: string) => void;
}) {
  const groups = useMemo(() => {
    const present = Array.from(new Set(items.map(groupOf)));
    if (groupOrder) {
      return groupOrder.filter((g) => present.includes(g)).concat(present.filter((p) => !groupOrder.includes(p)));
    }
    return present.sort();
  }, [items]);

  const [active, setActive] = useState(groups[0] ?? "—");
  const filtered = items.filter((it) => groupOf(it) === active);

  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {groups.map((g) => (
          <button
            key={g}
            onClick={() => setActive(g)}
            className={`text-[13px] font-semibold px-4 py-2 rounded-lg border ${
              active === g
                ? "bg-grad text-white border-transparent"
                : "border-border text-muted hover:text-white hover:border-blue"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 max-[700px]:grid-cols-1">
        {filtered.length === 0 && <p className="text-sm text-muted">Bu bolimda hali dars yoq.</p>}
        {filtered.map((it) => (
          <button
            key={it.id}
            onClick={() => onSelect(it.id)}
            className="text-left bg-card border border-border hover:border-blue rounded-xl p-4 transition-colors"
          >
            <div className="text-[13.5px] font-semibold mb-1.5">{it.title}</div>
            <span className="text-[11px] bg-[#1c2546] text-blue px-2 py-0.5 rounded-full">{badgeOf(it)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
