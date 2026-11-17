import type { Sample, SampleSection } from "@/lib/samples";
import { themes, themeStyle } from "@/lib/themes";

const wrap = "mx-auto max-w-3xl px-5 py-14";
const h2 = "font-display text-2xl font-bold";
const button = "inline-block rounded-md bg-brand px-5 py-3 font-semibold text-brand-ink";

function Block({ section: s, sample }: { section: SampleSection; sample: Sample }) {
  switch (s.kind) {
    case "about":
      return (
        <div className={wrap}>
          <h2 className={h2}>{s.title}</h2>
          <p className="mt-4 leading-relaxed text-muted">{s.body}</p>
        </div>
      );
    case "prices":
      return (
        <div className={wrap} id="prices">
          <h2 className={h2}>{s.title}</h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            {s.groups.map((g) => (
              <div key={g.name}>
                <h3 className="border-b border-ink pb-2 font-bold">{g.name}</h3>
                <dl>
                  {g.items.map(([name, price]) => (
                    <div key={name} className="flex justify-between gap-4 border-b border-line py-3">
                      <dt>{name}</dt>
                      <dd className="font-semibold whitespace-nowrap">{price}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      );
    case "reviews":
      return (
        <div className={wrap}>
          <h2 className={h2}>{s.title}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {s.items.map(([quote, who]) => (
              <figure key={quote} className="rounded-xl border border-line bg-paper p-5">
                <blockquote>“{quote}”</blockquote>
                <figcaption className="mt-3 text-sm text-muted">{who}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      );
    case "info":
      return (
        <div className={wrap}>
          <h2 className={h2}>{s.title}</h2>
          <dl className="mt-6">
            {s.hours.map(([day, time]) => (
              <div key={day} className="flex justify-between gap-4 border-b border-line py-3">
                <dt className="font-semibold">{day}</dt>
                <dd>{time}</dd>
              </div>
            ))}
          </dl>
          <address className="mt-6 text-muted not-italic">
            {s.address}
            <br />
            {sample.phone}
          </address>
        </div>
      );
    case "contact":
      return (
        <div className={wrap + " text-center"}>
          <h2 className={h2}>{s.title}</h2>
          <p className="mt-4 text-muted">{s.body}</p>
          <a href={`tel:${sample.phone}`} className={button + " mt-6"}>
            {s.cta} {sample.phone}
          </a>
        </div>
      );
  }
}

// 콘텐츠 파일 하나를 받아 사이트 한 채를 그린다. 샘플 데모와 고객 사이트가 함께 쓴다.
export function SampleSite({ sample }: { sample: Sample }) {
  const center = themes[sample.theme].center;
  return (
    <div style={themeStyle(sample.theme)} className="flex-1 bg-paper text-ink">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <span className="font-display text-lg font-bold">{sample.name}</span>
          <a href={`tel:${sample.phone}`} className="text-sm font-semibold text-brand">
            {sample.phone}
          </a>
        </div>
      </header>
      <section className="bg-surface">
        <div className={`mx-auto max-w-3xl px-5 py-20 sm:py-28 ${center ? "text-center" : ""}`}>
          <p className="text-sm font-semibold text-accent">{sample.type}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight font-bold sm:text-5xl">
            {sample.name}
          </h1>
          <p className="mt-4 text-lg text-muted">{sample.tagline}</p>
          <a href="#prices" className={button + " mt-8"}>
            {sample.cta}
          </a>
        </div>
      </section>
      {sample.sections.map((s, i) => (
        <section key={s.title} className={i % 2 ? "bg-surface" : undefined}>
          <Block section={s} sample={sample} />
        </section>
      ))}
      <footer className="border-t border-line py-8 text-center text-sm text-muted">
        © {sample.name}
      </footer>
    </div>
  );
}
