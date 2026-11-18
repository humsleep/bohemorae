import Image from "next/image";
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
        <div className={wrap}>
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
    case "cards":
      return (
        <div className={wrap}>
          <h2 className={h2}>{s.title}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {s.items.map(([name, desc]) => (
              <div key={name} className="rounded-xl border border-line bg-paper p-5">
                <h3 className="font-bold">{name}</h3>
                <p className="mt-2 text-sm text-muted">{desc}</p>
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
// preview: 다른 페이지 안에 미리보기로 넣을 때. 그 페이지의 h1과 겹치지 않게 제목 태그를 바꾼다.
export function SampleSite({ sample, preview }: { sample: Sample; preview?: boolean }) {
  const Title = preview ? "p" : "h1";
  const hero = themes[sample.theme].hero;
  const photos = sample.photos;
  // 히어로 버튼은 첫 가격표·카드 섹션으로 내려간다
  const target = Math.max(0, sample.sections.findIndex((s) => s.kind === "prices" || s.kind === "cards"));
  const bold = hero === "bold";
  const cta = (
    <a href={`#sec-${target}`} className={`${button} mt-8 ${bold ? "!bg-brand-ink !text-brand" : ""}`}>
      {sample.cta}
    </a>
  );
  const kicker = <p className={`text-sm font-semibold ${bold ? "opacity-80" : "text-accent"}`}>{sample.type}</p>;
  const tagline = <p className={`mt-4 text-lg ${bold ? "opacity-90" : "text-muted"}`}>{sample.tagline}</p>;
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
      {hero === "split" ? (
        // 왼쪽 글, 오른쪽 색 면
        <section className="mx-auto grid max-w-5xl sm:grid-cols-2">
          <div className="px-5 py-16 sm:py-28">
            {kicker}
            <Title className="mt-3 font-display text-4xl leading-tight font-bold sm:text-5xl">{sample.name}</Title>
            {tagline}
            {cta}
          </div>
          {photos?.hero ? (
            <div className="relative min-h-64">
              <Image src={photos.hero} alt="" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
            </div>
          ) : (
            <div className="flex flex-col justify-end bg-brand p-8 text-brand-ink sm:p-12">
              <p className="font-display text-2xl leading-snug font-bold sm:text-3xl">{sample.tagline}</p>
              <p className="mt-6 text-sm opacity-80">{sample.phone}</p>
            </div>
          )}
        </section>
      ) : hero === "huge" ? (
        // 상호를 화면 가득 크게
        <section className="border-b border-ink">
          <div className="mx-auto max-w-5xl px-5 pt-16 pb-12 sm:pt-24">
            {kicker}
            <Title className="mt-4 font-display text-6xl leading-none sm:text-9xl">{sample.name}</Title>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
              {tagline}
              {cta}
            </div>
          </div>
        </section>
      ) : (
        <section className={bold ? "bg-brand text-brand-ink" : "bg-surface"}>
          <div className={`mx-auto max-w-3xl px-5 py-20 sm:py-28 ${hero === "center" ? "text-center" : ""}`}>
            {kicker}
            <Title className={`mt-3 font-display leading-tight font-bold ${bold ? "text-5xl sm:text-7xl" : "text-4xl sm:text-5xl"}`}>
              {sample.name}
            </Title>
            {tagline}
            {cta}
          </div>
        </section>
      )}
      {photos?.hero && hero !== "split" && (
        <div className="relative mx-auto aspect-[16/9] max-w-5xl sm:aspect-[21/9]">
          <Image src={photos.hero} alt="" fill sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
        </div>
      )}
      {sample.sections.map((s, i) => (
        <section key={s.title} id={`sec-${i}`} className={i % 2 ? "scroll-mt-10 bg-surface" : "scroll-mt-10"}>
          <Block section={s} sample={sample} />
          {i === 0 && photos && photos.gallery.length > 0 && (
            <div className="mx-auto grid max-w-5xl grid-cols-3 gap-2 px-5 pb-14 sm:gap-4">
              {photos.gallery.map((src) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-md">
                  <Image src={src} alt="" fill sizes="(min-width: 1024px) 330px, 33vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
      <footer className="border-t border-line py-8 text-center text-sm text-muted">
        © {sample.name}
      </footer>
    </div>
  );
}
