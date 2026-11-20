"use client";

import Image from "next/image";
import { type MouseEvent, type ReactNode, useEffect, useRef, useState } from "react";

// 한 페이지 스크롤형 사이트의 움직이는 부분만 맡는다: 화면 뒤에 고정된 배경 사진을 장면마다 바꾸고,
// 위 메뉴를 누르면 해당 장면으로 부드럽게 내려간다. 장면 내용은 서버에서 그려 넘겨받는다.
export function SceneScroll({
  name,
  phone,
  labels,
  bgs,
  scenes,
}: {
  name: string;
  phone: string;
  labels: string[]; // scenes[1..]의 메뉴 이름
  bgs: string[]; // 장면 i의 배경 = bgs[i % length]
  scenes: ReactNode[]; // 0번은 첫 화면
}) {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = root.current?.querySelectorAll<HTMLElement>("[data-scene]") ?? [];
    // 화면 가운데 선을 지나는 장면이 지금 장면
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.scene));
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // 메뉴와 버튼의 #scene-n 링크를 부드러운 스크롤로 바꾼다. 움직임 줄이기 설정이면 바로 이동
  const onClick = (e: MouseEvent) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#scene-"]');
    const target = a && document.getElementById(a.hash.slice(1));
    if (!target) return;
    e.preventDefault();
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    history.replaceState(null, "", a.hash);
  };

  return (
    <div ref={root} onClick={onClick} className="relative bg-brand">
      {/* 고정 배경: 흐르는 글 뒤에 붙어 있다. fixed 대신 sticky라 미리보기 틀 밖으로 새지 않는다 */}
      <div aria-hidden className="sticky top-0 -mb-[100svh] h-svh overflow-hidden">
        {bgs.map((src, i) => {
          const on = active % bgs.length === i;
          return (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              sizes="100vw"
              priority={i === 0}
              className={`object-cover transition-[opacity,scale] duration-[1200ms] ease-out motion-reduce:transition-none ${on ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
            />
          );
        })}
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <header className="sticky top-0 z-20 -mb-28 bg-linear-to-b from-black/50 to-transparent text-white md:-mb-16">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-5 py-4">
          <a href="#scene-0" className="font-display text-xl font-bold">
            {name}
          </a>
          <a href={`tel:${phone}`} className="text-sm font-semibold md:order-last">
            {phone}
          </a>
          <nav className="-mx-5 flex w-full gap-5 overflow-x-auto px-5 text-sm whitespace-nowrap md:mx-0 md:w-auto md:px-0">
            {labels.map((label, i) => (
              <a
                key={label}
                href={`#scene-${i + 1}`}
                aria-current={active === i + 1 ? "true" : undefined}
                className={`border-b py-1 transition-colors ${active === i + 1 ? "border-white" : "border-transparent opacity-75 hover:opacity-100"}`}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {scenes.map((scene, i) => (
        <section
          key={i}
          id={`scene-${i}`}
          data-scene={i}
          className="relative flex min-h-svh items-center py-32"
        >
          {scene}
        </section>
      ))}
    </div>
  );
}
