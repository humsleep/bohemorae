"use client";

import { type CSSProperties, useState } from "react";
import { SampleSite } from "@/components/SampleSite";
import { useFit } from "@/components/useFit";
import type { Sample } from "@/lib/samples";

const W = 1100; // 미리보기를 그리는 폭

// 첫 화면: 숫자 대비 제목, 가게 이름 입력, 업종 칩, 그 아래 큰 미리보기 무대.
// 이름은 업종을 바꿔도 그대로 따라가고, 그 이름과 업종으로 견적 문의로 넘어간다.
// 휴대폰에서는 제목 → 설명 → 무대 → 칩 → 입력 순서라 키보드가 올라와도 이름이 바뀌는 모습이 보인다
export function HeroTry({ samples, note }: { samples: Sample[]; note: string }) {
  const [name, setName] = useState("");
  const [i, setI] = useState(0);
  const [ref, z] = useFit<HTMLDivElement>(W, 0.9);
  const sample = samples[i];
  const shown = name.trim() || sample.name;
  const step = (n: number) => ({ "--i": n }) as CSSProperties;

  return (
    <section className="mx-auto flex max-w-page flex-col items-center px-4 pt-10 text-center md:pt-16">
      <h1 className="font-head order-1 text-[2rem] leading-[1.25] font-extrabold sm:text-5xl md:text-6xl">
        만드는 데 19만원,
        <br />
        고치는 데는 <span className="whitespace-nowrap text-brand">월 2.5만원</span>
      </h1>
      <p className="line-in order-2 mt-4 max-w-xl text-base text-balance text-muted md:mt-5 md:text-lg" style={step(1)}>
        가게 홈페이지를 업종에 맞춰 만들고, 가격·영업시간이 바뀌면 매달 대신 고쳐 드립니다.
      </p>

      <form action="/contact" className="line-in order-5 mt-4 w-full max-w-xl md:order-3 md:mt-9" style={step(2)}>
        <label htmlFor="try-name" className="sr-only">
          가게 이름
        </label>
        <div className="flex flex-col gap-2 sm:flex-row sm:rounded-full sm:border sm:border-line sm:bg-surface sm:p-1.5 sm:shadow-[0_8px_24px_rgba(28,25,23,0.06)] sm:focus-within:border-brand">
          <input
            id="try-name"
            name="business"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
            autoComplete="organization"
            placeholder="가게 이름을 넣어 보세요"
            className="min-h-12 min-w-0 flex-1 rounded-full border border-line bg-surface px-5 text-base outline-none focus:border-brand sm:border-0 sm:bg-transparent"
          />
          <input type="hidden" name="sample" value={sample.slug} />
          <button type="submit" className="min-h-12 shrink-0 rounded-full bg-ink px-6 font-medium text-paper hover:opacity-90">
            무료 견적 받기
          </button>
        </div>
        <p className="mt-3 text-sm text-muted">{note}</p>
      </form>

      <div role="group" aria-label="업종 고르기" className="line-in order-4 mt-5 flex max-w-full gap-2 overflow-x-auto pb-1 md:order-4 md:mt-6" style={step(3)}>
        {samples.map((s, n) => (
          <button
            key={s.slug}
            type="button"
            aria-pressed={n === i}
            onClick={() => setI(n)}
            className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-medium ${
              n === i ? "border-ink bg-ink text-paper" : "border-line bg-surface text-muted hover:text-ink"
            }`}
          >
            {s.type.split("·")[0]}
          </button>
        ))}
      </div>

      {/* 무대: 페이지 폭 그대로의 브라우저 틀. 아래쪽은 흐려져 스크롤을 부른다 */}
      <div className="line-in order-3 mt-5 w-full md:order-5 md:mt-10" style={step(2)}>
        <div className="overflow-hidden rounded-2xl border border-line bg-surface text-left shadow-[0_24px_60px_rgba(28,25,23,0.14)]">
          <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
            <span className="size-2.5 rounded-full bg-line" />
            <span className="size-2.5 rounded-full bg-line" />
            <span className="size-2.5 rounded-full bg-line" />
            <span className="ml-3 truncate rounded-full bg-raised px-3 py-0.5 text-xs text-muted">
              {shown}
            </span>
          </div>
          <div
            ref={ref}
            inert
            aria-hidden
            className="overflow-hidden [mask-image:linear-gradient(to_bottom,black_80%,transparent)] md:max-h-[56vh]"
            style={{ height: 600 * z }}
          >
            <div key={sample.slug} className="fade-in" style={{ width: W, zoom: z }}>
              <SampleSite sample={{ ...sample, name: shown }} preview />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
