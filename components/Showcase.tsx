"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useFit } from "@/components/useFit";

type Item = { slug: string; name: string; type: string };

// 실제 화면 크기로 그린 샘플 페이지를 줄여 담는다. iframe이라 휴대폰 모드는 진짜 휴대폰 화면 구성으로 보인다
const sizes = { pc: [1280, 800], phone: [390, 844] } as const;

// 포트폴리오: 왼쪽 큰 이름 목록에 마우스를 올리거나 누르면, 오른쪽 PC·휴대폰 틀의 샘플이 바뀐다
export function Showcase({ items, total }: { items: Item[]; total: number }) {
  const [active, setActive] = useState(0);
  const [device, setDevice] = useState<keyof typeof sizes>("pc");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [w, h] = sizes[device];
  // 틀 폭은 CSS가 정하고(PC는 꽉, 휴대폰은 62%), 그 폭에 맞는 배율만 잰다
  const [ref, z] = useFit<HTMLDivElement>(w, device === "pc" ? 0.4 : 0.7);
  const item = items[active];

  // 목록 위를 훑고 지나갈 때마다 페이지를 새로 부르지 않게 잠깐 머문 것만 반영
  const hover = (i: number) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(i), 140);
  };

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.2fr] md:gap-12">
      <div className="order-2 min-w-0 md:order-1">
        <ol className="border-t border-line" onMouseLeave={() => clearTimeout(timer.current)}>
          {items.map((it, i) => (
            <li key={it.slug} className="border-b border-line">
              <button
                type="button"
                onMouseEnter={() => hover(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`group flex w-full items-baseline gap-4 py-4 text-left transition-[padding,color] duration-300 motion-reduce:transition-none md:py-5 ${
                  i === active ? "pl-3 text-ink" : "text-muted hover:text-ink"
                }`}
              >
                <span className="w-6 shrink-0 text-xs tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-head text-2xl font-extrabold md:text-3xl">{it.name}</span>
                <span className="ml-auto shrink-0 text-sm">{it.type}</span>
              </button>
            </li>
          ))}
        </ol>
        <Link href="/samples" className="mt-6 inline-block font-medium text-brand hover:underline">
          업종별 샘플 {total}개 전부 보기 →
        </Link>
      </div>

      <div className="order-1 min-w-0 md:order-2">
        <div className="sticky top-20">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div role="group" aria-label="화면 크기" className="flex rounded-full border border-line bg-surface p-1">
              {(["pc", "phone"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  aria-pressed={device === d}
                  onClick={() => setDevice(d)}
                  className={`min-h-11 rounded-full px-4 text-sm font-medium ${device === d ? "bg-ink text-paper" : "text-muted"}`}
                >
                  {d === "pc" ? "PC 화면" : "휴대폰 화면"}
                </button>
              ))}
            </div>
            <Link href={`/demo/${item.slug}`} className="text-sm font-medium text-brand hover:underline">
              크게 보기 →
            </Link>
          </div>

          <div
            ref={ref}
            className={`mx-auto overflow-hidden border border-line bg-surface shadow-[0_24px_60px_rgba(28,25,23,0.14)] ${
              device === "pc" ? "w-full rounded-2xl" : "w-[min(62%,300px)] rounded-[2.2rem] border-[6px] border-ink"
            }`}
            style={{ height: h * z }}
          >
            <iframe
              key={`${item.slug}-${device}`}
              src={`/demo/${item.slug}`}
              title={`${item.name} 샘플 미리보기`}
              tabIndex={-1}
              loading="lazy"
              className="pointer-events-none origin-top-left border-0"
              style={{ width: w, height: h, transform: `scale(${z})` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
