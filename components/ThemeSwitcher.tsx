"use client";

import { useState } from "react";
import { SampleSite } from "@/components/SampleSite";
import type { Sample } from "@/lib/samples";
import { type ThemeName, themes } from "@/lib/themes";

// 같은 가게 내용에 분위기(테마)만 바꿔 입혀 보는 체험
export function ThemeSwitcher({ sample }: { sample: Sample }) {
  const [theme, setTheme] = useState<ThemeName>(sample.theme);
  return (
    <div>
      <div role="group" aria-label="분위기 고르기" className="flex flex-wrap justify-center gap-2">
        {(Object.keys(themes) as ThemeName[]).map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={theme === t}
            onClick={() => setTheme(t)}
            className={`rounded-full border px-5 py-2 font-medium transition-colors ${
              theme === t ? "border-ink bg-ink text-paper" : "border-line bg-surface hover:border-ink"
            }`}
          >
            {themes[t].label}
          </button>
        ))}
      </div>
      <div
        inert
        aria-hidden
        className="mx-auto mt-8 h-[calc(640px*var(--z))] w-[calc(1100px*var(--z))] overflow-hidden rounded-2xl border border-line shadow-[0_8px_24px_rgba(0,0,0,0.06)] [--z:0.31] sm:[--z:0.6] lg:[--z:0.9]"
      >
        <div className="w-[1100px] [zoom:var(--z)]">
          <SampleSite sample={{ ...sample, theme }} preview />
        </div>
      </div>
    </div>
  );
}
