"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useState } from "react";

export type SampleCard = {
  slug: string;
  name: string;
  tagline: string;
  type: string;
  category: string;
  meta: string; // 플랜 · 가격
  vars: CSSProperties;
};

export function SampleGrid({ cards, categories }: { cards: SampleCard[]; categories: readonly string[] }) {
  const [active, setActive] = useState("전체");
  const shown = active === "전체" ? cards : cards.filter((c) => c.category === active);
  return (
    <>
      <div role="group" aria-label="업종 필터" className="mt-8 flex flex-wrap gap-2">
        {["전체", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold ${
              active === c ? "border-brand bg-brand text-brand-ink" : "border-line hover:bg-surface"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {shown.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/samples/${s.slug}`}
              className="block overflow-hidden rounded-xl border border-line hover:border-brand"
            >
              <div style={s.vars} className="flex h-36 flex-col items-center justify-center bg-surface px-3 text-center text-ink">
                <span className="font-display text-xl font-bold">{s.name}</span>
                <span className="mt-1 text-sm text-muted">{s.tagline}</span>
              </div>
              <div className="p-4">
                <span className="font-bold">{s.type}</span>
                <span className="mt-1 block text-sm text-muted">{s.meta}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
