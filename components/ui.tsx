import type { ReactNode } from "react";
import { plans } from "@/lib/pricing";

export function Section({
  title,
  lead,
  tinted,
  children,
}: {
  title: string;
  lead?: string;
  tinted?: boolean;
  children: ReactNode;
}) {
  return (
    <section className={tinted ? "bg-surface" : undefined}>
      <div className="mx-auto max-w-page px-4 py-14">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {lead && <p className="mt-2 text-muted">{lead}</p>}
        <div className="mt-6">{children}</div>
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
          <dt className="font-semibold">{k}</dt>
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
        <article key={p.name} className="rounded-xl border border-line bg-paper p-5">
          <h3 className="text-lg font-bold">{p.name}</h3>
          <p className="text-sm text-muted">{p.target}</p>
          <p className="mt-4 text-2xl font-bold">
            구축 {p.build}
            <span className="block text-base font-semibold text-brand">월 {p.monthly}</span>
          </p>
          <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
            {(full ? p.specs : p.specs.slice(0, 3)).map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
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
          <summary className="cursor-pointer font-semibold">{q}</summary>
          <p className="mt-2 text-muted">{a}</p>
        </details>
      ))}
    </div>
  );
}
