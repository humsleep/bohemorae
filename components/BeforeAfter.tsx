"use client";

import Image from "next/image";
import { useState } from "react";
import { SampleSite } from "@/components/SampleSite";
import { useFit } from "@/components/useFit";
import type { Sample } from "@/lib/samples";

const W = 1100;
const H = 640;

// 비포/애프터: 손잡이를 끌면 "SNS 프로필만 있을 때"와 "홈페이지가 있을 때"가 갈린다
export function BeforeAfter({ sample }: { sample: Sample }) {
  const [pos, setPos] = useState(50);
  const [ref, z] = useFit<HTMLDivElement>(W, 0.8);
  const pics = [sample.photos?.hero, ...(sample.photos?.gallery ?? [])].filter((x) => x !== undefined);

  return (
    <div>
      <div ref={ref} className="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_60px_rgba(28,25,23,0.12)]" style={{ height: H * z }}>
        <div inert aria-hidden className="absolute inset-0" style={{ width: W, height: H, zoom: z }}>
          {/* 애프터: 실제 샘플 사이트 */}
          <SampleSite sample={sample} preview />

          {/* 비포: SNS 프로필 한 장. 손잡이 왼쪽만 보인다 */}
          {/* 손잡이가 처음 놓이는 가운데 선(550px)보다 왼쪽에 모두 들어가게 둔다 */}
          <div className="absolute inset-0 bg-[#ecebe7]" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <div className="absolute top-1/2 left-16 w-[340px] -translate-y-1/2 overflow-hidden rounded-[28px] bg-white text-[#262626] shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
              <div className="border-b border-[#eee] px-5 py-3 text-sm font-semibold">{sample.name}</div>
              <div className="flex items-center gap-6 px-5 pt-5">
                {pics[0] && (
                  <span className="relative size-20 shrink-0 overflow-hidden rounded-full">
                    <Image src={pics[0]} alt="" fill sizes="80px" className="object-cover" />
                  </span>
                )}
                <div className="flex flex-1 justify-around text-center text-sm">
                  {[["214", "게시물"], ["1,203", "팔로워"], ["98", "팔로잉"]].map(([n, l]) => (
                    <div key={l}>
                      <p className="font-semibold">{n}</p>
                      <p className="text-[#8e8e8e]">{l}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-0.5 px-5 pt-4 pb-4 text-sm">
                <p className="font-semibold">{sample.name}</p>
                <p>{sample.tagline}</p>
                <p className="text-[#8e8e8e]">영업시간·가격은 DM 주세요</p>
              </div>
              <div className="grid grid-cols-3 gap-0.5">
                {[...pics, ...pics].slice(0, 6).map((src, i) => (
                  <span key={i} className="relative aspect-square">
                    <Image src={src} alt="" fill sizes="140px" className="object-cover" />
                  </span>
                ))}
              </div>
            </div>
            {/* 손님이 실제로 하는 질문들 */}
            <ul className="absolute top-1/2 left-[300px] w-[230px] -translate-y-1/2 space-y-4">
              {["영업시간이 어떻게 되나요?", "가격표는 어디서 보나요?", "검색해도 안 나와요", "주차 되나요?"].map((q, i) => (
                <li key={q} className="w-fit rounded-2xl rounded-bl-sm bg-white px-4 py-2.5 text-base text-[#262626] shadow-md" style={{ marginLeft: i % 2 ? 24 : 0 }}>
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 손잡이 */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 bg-brand" style={{ left: `${pos}%` }}>
          <span className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-ink shadow-lg">
            ⇆
          </span>
        </div>
        <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-paper">SNS만 있을 때</span>
        <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-brand-ink">홈페이지가 있을 때</span>

        {/* 끌기와 키보드(좌우 화살표)를 모두 받는 투명 막대 */}
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="비포 애프터 비교 위치"
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </div>
  );
}
