"use client";

import { type CSSProperties, type PointerEvent, useState } from "react";
import { SampleSite } from "@/components/SampleSite";
import { useFit } from "@/components/useFit";
import type { Sample } from "@/lib/samples";

const W = 1100; // 미리보기를 그리는 폭
const H = 600; // 카페 샘플 첫 화면(표지형) 높이에 맞춘다

// 첫 화면: 가게 이름을 치면 옆 샘플 사이트에 바로 들어가고, 그 이름 그대로 견적 문의로 넘어간다
export function HeroTry({ sample, priceLine }: { sample: Sample; priceLine: string }) {
  const [name, setName] = useState("");
  const [ref, z] = useFit<HTMLDivElement>(W);
  const shown = name.trim() || sample.name;

  // 커서를 따라가는 은은한 금빛(app/globals.css .hero-glow)
  const glow = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section onPointerMove={glow} className="hero-glow relative overflow-hidden">
      <div className="relative mx-auto grid max-w-page grid-cols-1 items-center gap-12 px-4 pt-12 pb-20 md:grid-cols-[1fr_1.15fr] md:gap-10 md:pt-20 md:pb-28">
        <div className="min-w-0">
          <p className="line-in text-sm font-semibold text-brand" style={{ "--i": 0 } as CSSProperties}>
            가게·회사·개인을 위한 월 관리형 홈페이지
          </p>
          <h1
            className="line-in font-serif-ko mt-5 text-5xl leading-[1.12] font-extrabold sm:text-6xl lg:text-7xl"
            style={{ "--i": 1 } as CSSProperties}
          >
            작은 가게도
            <br />
            <span className="text-brand">크게</span> 보이게
          </h1>
          <p className="line-in mt-6 max-w-md text-lg text-muted" style={{ "--i": 2 } as CSSProperties}>
            업종에 맞춘 디자인으로 만들고, 바뀌는 내용은 매달 대신 고쳐드립니다.
          </p>

          <form action="/contact" className="line-in mt-9 max-w-md" style={{ "--i": 3 } as CSSProperties}>
            <label htmlFor="try-name" className="text-sm font-semibold">
              우리 가게 이름을 넣어 보세요
            </label>
            <div className="mt-2 flex gap-2 rounded-full border border-line bg-surface p-1.5 shadow-[0_8px_24px_rgba(28,25,23,0.06)] focus-within:border-brand">
              <input
                id="try-name"
                name="business"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={20}
                autoComplete="organization"
                placeholder={`예: ${sample.name}`}
                className="min-w-0 flex-1 bg-transparent px-4 text-base outline-none"
              />
              <input type="hidden" name="sample" value={sample.slug} />
              <button type="submit" className="min-h-11 shrink-0 rounded-full bg-ink px-5 font-medium text-paper hover:opacity-90">
                이 이름으로 견적
              </button>
            </div>
            <p className="mt-3 text-sm text-muted">{priceLine}</p>
          </form>
        </div>

        {/* 브라우저 틀 안의 샘플. 이름을 치는 대로 바뀐다 */}
        <div className="line-in min-w-0" style={{ "--i": 2 } as CSSProperties}>
          <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_60px_rgba(28,25,23,0.14)] md:-mr-8 lg:-mr-16">
            <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-line" />
              <span className="size-2.5 rounded-full bg-line" />
              <span className="size-2.5 rounded-full bg-line" />
              <span className="ml-3 truncate rounded-full bg-raised px-3 py-0.5 text-xs text-muted" aria-live="polite">
                {shown}
              </span>
            </div>
            <div ref={ref} inert aria-hidden className="overflow-hidden" style={{ height: H * z }}>
              <div style={{ width: W, zoom: z }}>
                <SampleSite sample={{ ...sample, name: shown }} preview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
