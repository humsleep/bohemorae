import Link from "next/link";
import type { ReactNode } from "react";
import { guarantee, plans, steps } from "@/lib/pricing";

export function Section({ title, lead, children }: { title: string; lead?: string; children: ReactNode }) {
  return (
    <section>
      <div className="reveal mx-auto max-w-page px-4 py-20 md:py-28">
        <h2 className="font-head text-3xl leading-tight font-extrabold md:text-5xl">{title}</h2>
        {lead && <p className="mt-3 max-w-xl text-muted">{lead}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

// 2열 표. 모바일에서는 항목명이 위, 내용이 아래로 쌓인다.
export function KV({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="divide-y divide-line border-y border-line">
      {rows.map(([k, v]) => (
        <div key={k} className="gap-4 py-3 sm:grid sm:grid-cols-[14rem_1fr]">
          <dt className="font-medium">{k}</dt>
          <dd className="text-muted">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

// cta: 카드마다 견적 버튼(요금 페이지). 홈은 버튼을 줄이려고 끈다
export function PlanCards({ full, cta = true }: { full?: boolean; cta?: boolean }) {
  return (
    <>
    <div className="grid gap-4 md:grid-cols-3">
      {plans.map((p) => (
        <article key={p.name} className="flex flex-col rounded-2xl border border-line bg-surface p-6">
          <h3 className="text-lg font-semibold">{p.name}</h3>
          <p className="text-sm text-muted">{p.target}</p>
          <p className="mt-5 text-3xl font-semibold">
            <span className="mr-2 text-sm font-medium tracking-normal text-muted">구축</span>
            {p.build}
            <span className="mt-2 block text-base font-medium tracking-normal text-brand">월 {p.monthly}</span>
          </p>
          <p className="mt-1 text-xs text-muted">{p.vat}</p>
          <dl className="mt-5 divide-y divide-line border-t border-line text-sm">
            {(full ? p.specs : p.specs.slice(0, 3)).map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2">
                <dt className="shrink-0 text-muted">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          {cta && (
          <div className="mt-auto pt-6">
            <Link
              href={`/contact?plan=${encodeURIComponent(p.name)}`}
              className="flex min-h-12 items-center justify-center rounded-full border border-ink font-medium hover:bg-ink hover:text-paper"
            >
              {p.name} 견적 받기
            </Link>
          </div>
          )}
        </article>
      ))}
    </div>
    <p className="mt-4 flex items-start gap-2 text-sm font-medium">
      <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
      {guarantee}
    </p>
    </>
  );
}

export function Faq({ items }: { items: [string, string][] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map(([q, a]) => (
        <details key={q} className="py-4">
          <summary className="cursor-pointer font-medium">{q}</summary>
          <p className="mt-2 text-muted">{a}</p>
        </details>
      ))}
    </div>
  );
}

// 진행 절차 4단계. 고객 단계는 테두리 번호, 보헤모레 단계는 채운 번호
export function Steps() {
  return (
    <ol className="grid gap-3 md:grid-cols-4 md:gap-4">
      {steps.map((st, i) => (
        <li key={st.title} className="flex gap-4 rounded-2xl border border-line bg-surface p-5 md:flex-col md:gap-0 md:p-6">
          <span
            className={`flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
              st.who === "고객님" ? "border-2 border-brand text-brand" : "bg-brand text-brand-ink"
            }`}
          >
            {i + 1}
          </span>
          <span className="min-w-0 md:mt-5">
            <span className="text-xs font-semibold text-muted">
              {st.who} · {st.time}
            </span>
            <span className="mt-1 block text-lg font-bold">{st.title}</span>
            <span className="mt-1 block text-sm leading-relaxed text-muted">{st.body}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
