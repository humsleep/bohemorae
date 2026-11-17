import type { Metadata } from "next";
import Link from "next/link";
import { plans } from "@/lib/pricing";
import { samplePrice, samples } from "@/lib/samples";
import { themes } from "@/lib/themes";

export const metadata: Metadata = {
  title: "샘플",
  description: "업종별 홈페이지 샘플. 마음에 드는 디자인을 고르면 그대로 만들어 드립니다.",
};

export default function Samples() {
  return (
    <div className="mx-auto max-w-page px-4 py-14">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">샘플</h1>
      <p className="mt-3 text-muted">
        마음에 드는 디자인을 고르면 상호와 내용만 바꿔 그대로 만들어 드립니다.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {samples.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/samples/${s.slug}`}
              className="block overflow-hidden rounded-xl border border-line hover:border-brand"
            >
              <div
                style={themes[s.theme].vars}
                className="flex h-36 flex-col items-center justify-center bg-surface text-ink"
              >
                <span className="font-display text-xl font-bold">{s.name}</span>
                <span className="mt-1 text-sm text-muted">{s.tagline}</span>
              </div>
              <div className="p-4">
                <span className="font-bold">{s.type}</span>
                <span className="mt-1 block text-sm text-muted">
                  {plans[s.plan].name} · {samplePrice(s)}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
