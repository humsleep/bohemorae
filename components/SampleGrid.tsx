"use client";

import Image from "next/image";
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
  photo?: string;
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
            className={`min-h-11 rounded-full border px-4 text-sm font-medium ${
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
              href={`/demo/${s.slug}`}
              className="group block overflow-hidden rounded-2xl border border-line hover:border-ink"
            >
              <div style={s.vars} className="relative isolate flex aspect-[4/3] flex-col justify-end bg-surface p-5 text-ink">
                {s.photo && (
                  <>
                    <Image
                      src={s.photo}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="-z-10 object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                    />
                    <span className="absolute inset-0 -z-10 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                  </>
                )}
                <span className={`font-display text-2xl font-semibold ${s.photo ? "text-white" : ""}`}>{s.name}</span>
                <span className={`mt-1 text-sm ${s.photo ? "text-white/85" : "text-muted"}`}>{s.tagline}</span>
              </div>
              <div className="p-4">
                <span className="font-semibold">{s.type}</span>
                <span className="mt-1 block text-sm text-muted">{s.meta}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
