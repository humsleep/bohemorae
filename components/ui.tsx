import type { ReactNode } from "react";
import { plans } from "@/lib/pricing";

export function Section({ title, lead, children }: { title: string; lead?: string; children: ReactNode }) {
  return (
    <section>
      <div className="mx-auto max-w-page px-4 py-16 md:py-24">
        <h2 className="text-3xl font-semibold md:text-4xl">{title}</h2>
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

export function PlanCards({ full }: { full?: boolean }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {plans.map((p) => (
        <article key={p.name} className="rounded-2xl border border-line bg-surface p-6">
          <h3 className="text-lg font-semibold">{p.name}</h3>
          <p className="text-sm text-muted">{p.target}</p>
          <p className="mt-5 text-3xl font-semibold">
            <span className="mr-2 text-sm font-medium tracking-normal text-muted">구축</span>
            {p.build}
            <span className="mt-2 block text-base font-medium tracking-normal text-brand">월 {p.monthly}</span>
          </p>
          <dl className="mt-5 divide-y divide-line border-t border-line text-sm">
            {(full ? p.specs : p.specs.slice(0, 3)).map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2">
                <dt className="shrink-0 text-muted">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </article>
      ))}
    </div>
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
