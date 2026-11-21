import Image from "next/image";
import type { Sample, SampleSection } from "@/lib/samples";
import { SceneScroll } from "@/components/SceneScroll";
import { type Look, themes, themeStyle } from "@/lib/themes";

const W = "mx-auto max-w-5xl px-5";
const pad = "py-16 sm:py-20";
const h2 = "font-display text-3xl font-bold";
const button = "inline-block rounded-md bg-brand px-6 py-3 font-semibold text-brand-ink";

type Photos = NonNullable<Sample["photos"]>;

const Photo = ({ src, sizes, className = "" }: { src: string; sizes: string; className?: string }) => (
  <div data-photo className={`relative overflow-hidden ${className}`}>
    <Image src={src} alt="" fill sizes={sizes} className="object-cover" />
  </div>
);

// 가격·항목 한 줄
const Row = ({ name, value, line = "border-line" }: { name: string; value: string; line?: string }) => (
  <div className={`flex justify-between gap-4 border-b py-3 ${line}`}>
    <dt>{name}</dt>
    <dd className="font-semibold whitespace-nowrap">{value}</dd>
  </div>
);

function Block({ section: s, sample, look, photos }: { section: SampleSection; sample: Sample; look: Look; photos: Photos }) {
  switch (s.kind) {
    case "about":
      if (look.about === "big")
        return (
          <div className={`${W} ${pad} text-center`}>
            <p className="text-sm font-semibold text-accent">{s.title}</p>
            <p className="mx-auto mt-5 max-w-3xl font-display text-2xl leading-relaxed sm:text-3xl sm:leading-relaxed">
              {s.body}
            </p>
          </div>
        );
      if (look.about === "side")
        return (
          <div className={`${W} ${pad} grid gap-6 md:grid-cols-2 md:gap-12`}>
            <h2 className={h2 + " leading-snug"}>{s.title}</h2>
            <p className="text-lg leading-relaxed text-muted">{s.body}</p>
          </div>
        );
      return (
        <div className={`${W} ${pad}`}>
          <h2 className={h2}>{s.title}</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{s.body}</p>
        </div>
      );

    case "prices": {
      const side = look.prices === "photo" && photos.gallery[0];
      if (look.prices === "menu")
        // 메뉴판: 가운데 제목, 점선으로 이은 가격
        return (
          <div className={`${W} ${pad}`}>
            <h2 className={h2 + " text-center"}>{s.title}</h2>
            <div className="mx-auto mt-10 grid max-w-4xl gap-x-16 gap-y-10 sm:grid-cols-2">
              {s.groups.map((g) => (
                <div key={g.name}>
                  <h3 className="text-center font-display text-lg text-accent">{g.name}</h3>
                  <dl className="mt-4 space-y-4">
                    {g.items.map(([name, price]) => (
                      <div key={name} className="flex items-baseline gap-3">
                        <dt className="text-lg">{name}</dt>
                        <span className="flex-1 border-b border-dotted border-muted" />
                        <dd className="whitespace-nowrap">{price}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        );
      if (look.prices === "rows")
        // 큰 글씨 한 줄씩
        return (
          <div className={`${W} ${pad}`}>
            <h2 className={h2}>{s.title}</h2>
            {s.groups.map((g) => (
              <div key={g.name} className="mt-10">
                <h3 className="text-sm font-semibold text-muted">{g.name}</h3>
                <dl className="mt-2 border-t-2 border-ink">
                  {g.items.map(([name, price], i) => (
                    <div key={name} className="flex items-baseline gap-5 border-b border-ink py-5 text-xl sm:text-2xl">
                      <span className="w-8 text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
                      <dt className="flex-1 font-semibold">{name}</dt>
                      <dd className="whitespace-nowrap">{price}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        );
      if (look.prices === "plans")
        // 묶음마다 카드 한 장, 첫 장을 강조
        return (
          <div className={`${W} ${pad}`}>
            <h2 className={h2 + " text-center"}>{s.title}</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {s.groups.map((g, i) => (
                <div key={g.name} className={`rounded-xl p-7 sm:p-9 ${i ? "border border-line bg-paper" : "bg-brand text-brand-ink"}`}>
                  <h3 className="font-display text-xl font-bold">{g.name}</h3>
                  <dl className="mt-4">
                    {g.items.map(([name, price]) => (
                      <Row key={name} name={name} value={price} line={i ? "border-line" : "border-brand-ink/20"} />
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        );
      if (look.prices === "table")
        // 왼쪽에 묶음 이름, 오른쪽에 항목
        return (
          <div className={`${W} ${pad}`}>
            <h2 className={h2}>{s.title}</h2>
            <div className="mt-8 border-t-2 border-ink">
              {s.groups.map((g) => (
                <div key={g.name} className="grid gap-x-8 border-b border-ink py-5 sm:grid-cols-[12rem_1fr]">
                  <h3 className="font-display text-lg font-bold">{g.name}</h3>
                  <dl className="[&>div:last-child]:border-0">
                    {g.items.map(([name, price]) => (
                      <Row key={name} name={name} value={price} />
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        );
      return (
        <div className={`${W} ${pad} ${side ? "grid items-start gap-10 md:grid-cols-2" : ""}`}>
          {side && <Photo src={side} sizes="(min-width: 768px) 480px, 100vw" className="aspect-[4/5] rounded-xl" />}
          <div>
            <h2 className={h2}>{s.title}</h2>
            <div className={`mt-6 grid gap-8 ${side ? "" : "sm:grid-cols-2"}`}>
              {s.groups.map((g) => (
                <div key={g.name}>
                  <h3 className="border-b border-ink pb-2 font-bold text-accent">{g.name}</h3>
                  <dl>
                    {g.items.map(([name, price]) => (
                      <Row key={name} name={name} value={price} />
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    case "cards": {
      // 콘텐츠에 이미 "1. " 번호가 붙은 항목은 번호를 떼고 다시 매긴다
      const items = s.items.map(([name, desc]) => [name.replace(/^\d+\.\s*/, ""), desc]);
      const withPhoto = look.cards === "photo" && photos.gallery.length > 0;
      if (look.cards === "numbered")
        return (
          <div className={`${W} ${pad}`}>
            <h2 className={h2}>{s.title}</h2>
            <ol className="mt-8 border-t-2 border-ink">
              {items.map(([name, desc], i) => (
                <li key={name} className="grid gap-x-8 gap-y-1 border-b border-line py-6 sm:grid-cols-[5rem_1fr_1.4fr] sm:items-baseline">
                  <span className="font-display text-3xl text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-xl font-bold">{name}</h3>
                  <p className="text-muted">{desc}</p>
                </li>
              ))}
            </ol>
          </div>
        );
      if (look.cards === "list")
        return (
          <div className={`${W} ${pad} grid gap-8 md:grid-cols-[1fr_2fr] md:gap-12`}>
            <h2 className={h2}>{s.title}</h2>
            <ul>
              {items.map(([name, desc]) => (
                <li key={name} className="border-b border-line py-5 first:pt-0">
                  <h3 className="font-display text-xl font-bold">{name}</h3>
                  <p className="mt-1 text-muted">{desc}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      return (
        <div className={`${W} ${pad}`}>
          <h2 className={h2}>{s.title}</h2>
          <div className={`mt-8 grid gap-5 sm:grid-cols-2 ${withPhoto && items.length > 2 ? "lg:grid-cols-3" : ""}`}>
            {items.map(([name, desc], i) => (
              <div key={name} className="overflow-hidden rounded-xl border border-line bg-paper">
                {withPhoto && photos.gallery[i] && (
                  <Photo src={photos.gallery[i]} sizes="(min-width: 640px) 480px, 100vw" className="aspect-[4/3]" />
                )}
                <div className="p-6">
                  <h3 className="text-lg font-bold">{name}</h3>
                  <p className="mt-2 text-muted">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "reviews":
      if (look.reviews === "quote")
        return (
          <div className={`${W} ${pad} text-center`}>
            <h2 className="text-sm font-semibold text-accent">{s.title}</h2>
            <div className="mx-auto mt-6 max-w-3xl space-y-10">
              {s.items.map(([quote, who]) => (
                <figure key={quote}>
                  <blockquote className="font-display text-2xl leading-snug sm:text-3xl sm:leading-snug">“{quote}”</blockquote>
                  <figcaption className="mt-3 text-sm text-muted">{who}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        );
      if (look.reviews === "strip")
        return (
          <div className="bg-brand text-brand-ink">
            <div className={`${W} ${pad}`}>
              <h2 className="text-sm font-semibold opacity-70">{s.title}</h2>
              <div className="mt-6 grid gap-10 sm:grid-cols-2">
                {s.items.map(([quote, who]) => (
                  <figure key={quote}>
                    <blockquote className="font-display text-2xl leading-snug font-bold">“{quote}”</blockquote>
                    <figcaption className="mt-3 text-sm opacity-70">{who}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        );
      return (
        <div className={`${W} ${pad}`}>
          <h2 className={h2}>{s.title}</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {s.items.map(([quote, who]) => (
              <figure key={quote} className="rounded-xl border border-line bg-paper p-6">
                <blockquote className="text-lg">“{quote}”</blockquote>
                <figcaption className="mt-3 text-sm text-muted">{who}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      );

    case "info": {
      const panel = look.info === "panel";
      return (
        <div className={`${W} ${pad}`}>
          <div className={`grid gap-10 md:grid-cols-2 ${panel ? "rounded-xl bg-brand p-8 text-brand-ink sm:p-12" : ""}`}>
            <div>
              <h2 className={panel ? "font-display text-2xl font-bold" : h2}>{s.title}</h2>
              <address className={`mt-5 text-lg not-italic ${panel ? "opacity-80" : "text-muted"}`}>
                {s.address}
                <br />
                {sample.phone}
              </address>
            </div>
            <dl>
              {s.hours.map(([day, time]) => (
                <Row key={day} name={day} value={time} line={panel ? "border-brand-ink/20" : "border-line"} />
              ))}
            </dl>
          </div>
        </div>
      );
    }

    case "contact":
      return (
        <div className={`${W} ${pad} text-center`}>
          <h2 className={h2}>{s.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">{s.body}</p>
          <a href={`tel:${sample.phone}`} className={button + " mt-7"}>
            {s.cta} {sample.phone}
          </a>
        </div>
      );
  }
}

function Gallery({ kind, photos }: { kind: Look["gallery"]; photos: string[] }) {
  if (kind === "none" || photos.length === 0) return null;
  if (kind === "strip")
    // 화면 끝에서 끝까지, 틈 없이
    return (
      <div className="grid grid-cols-3">
        {photos.map((src) => (
          <Photo key={src} src={src} sizes="34vw" className="aspect-[4/5]" />
        ))}
      </div>
    );
  if (kind === "mosaic" && photos.length === 3)
    // 큰 사진 하나와 작은 사진 둘
    return (
      <div className={`${W} grid grid-cols-3 grid-rows-2 gap-2 pb-16 sm:gap-4`}>
        <Photo src={photos[0]} sizes="(min-width: 1024px) 660px, 66vw" className="col-span-2 row-span-2 rounded-xl" />
        <Photo src={photos[1]} sizes="330px" className="aspect-[4/3] rounded-xl" />
        <Photo src={photos[2]} sizes="330px" className="aspect-[4/3] rounded-xl" />
      </div>
    );
  return (
    <div className={`${W} grid gap-2 pb-16 sm:gap-4`} style={{ gridTemplateColumns: `repeat(${photos.length}, 1fr)` }}>
      {photos.map((src) => (
        <Photo key={src} src={src} sizes="(min-width: 1024px) 480px, 50vw" className="aspect-[4/3] rounded-xl" />
      ))}
    </div>
  );
}

const navLabel = (s: SampleSection) =>
  s.kind === "about" ? "소개" : s.kind === "reviews" ? "후기" : s.kind === "info" ? "오시는 길" : s.title;

// 콘텐츠 파일 하나를 받아 사이트 한 채를 그린다. 샘플 데모와 고객 사이트가 함께 쓴다.
// 화면 구성은 테마의 look이 정한다. 사진이 없으면 사진 자리만 빠진다.
// preview: 다른 페이지 안에 미리보기로 넣을 때. 그 페이지의 h1과 겹치지 않게 제목 태그를 바꾼다.
export function SampleSite({ sample, preview }: { sample: Sample; preview?: boolean }) {
  const Title = preview ? "p" : "h1";
  const photos = sample.photos ?? { gallery: [] };
  const base = themes[sample.theme].look;
  if (base.hero === "scene" && !preview) return <Scene sample={sample} look={base} photos={photos} />;
  // 미리보기 틀 안에서는 스크롤 장면 대신 첫 화면만 보여 준다
  const look: Look = base.hero === "scene" ? { ...base, hero: "cover" } : base;
  const cover = look.hero === "cover";
  // 사진을 가격표·카드 안에서 이미 쓴 구성은 갤러리에서 뺀다
  const usedInCards = look.cards === "photo" && sample.sections.some((s) => s.kind === "cards");
  const usedInPrices = look.prices === "photo" && sample.sections.some((s) => s.kind === "prices");
  const gallery = usedInCards ? [] : usedInPrices ? photos.gallery.slice(1) : photos.gallery;
  // 히어로 버튼은 첫 가격표·카드 섹션으로 내려간다
  const target = Math.max(0, sample.sections.findIndex((s) => s.kind === "prices" || s.kind === "cards"));
  const onBrand = cover || look.hero === "board";
  const cta = (
    <a href={`#sec-${target}`} className={`${button} mt-8 ${cover ? "!bg-white !text-black" : onBrand ? "!bg-brand-ink !text-brand" : ""}`}>
      {sample.cta}
    </a>
  );
  const kicker = <p className={`text-sm font-semibold ${onBrand ? "opacity-80" : "text-accent"}`}>{sample.type}</p>;
  const tagline = <p className={`mt-4 text-lg sm:text-xl ${onBrand ? "opacity-90" : "text-muted"}`}>{sample.tagline}</p>;
  const phone = (
    <a href={`tel:${sample.phone}`} className={`text-sm font-semibold ${cover ? "" : "text-brand"}`}>
      {sample.phone}
    </a>
  );
  const name = <span className="font-display text-xl font-bold">{sample.name}</span>;

  return (
    <div style={themeStyle(sample.theme)} className={`relative flex-1 overflow-x-clip bg-paper text-ink ${look.skin ? `skin-${look.skin}` : ""} ${look.parallax && !preview ? "parallax" : ""}`}>
      <header className={cover ? "absolute inset-x-0 top-0 z-10 text-white" : "border-b border-line"}>
        {look.header === "nav" ? (
          <div className={`${W} flex items-center justify-between gap-6 py-4`}>
            {name}
            <nav className="hidden gap-6 text-sm font-medium md:flex">
              {sample.sections.slice(0, -1).map((s, i) => (
                <a key={s.title} href={`#sec-${i}`}>
                  {navLabel(s)}
                </a>
              ))}
            </nav>
            <a href={`tel:${sample.phone}`} className={`${button} !px-4 !py-2 text-sm ${cover ? "!bg-white !text-black" : ""}`}>
              {sample.phone}
            </a>
          </div>
        ) : look.header === "center" ? (
          <div className={`${W} grid grid-cols-[1fr_auto_1fr] items-center py-5`}>
            <span className="text-sm opacity-80">{sample.type}</span>
            {name}
            <span className="text-right">{phone}</span>
          </div>
        ) : (
          <div className={`${W} flex items-center justify-between py-4`}>
            {name}
            {phone}
          </div>
        )}
      </header>

      {look.hero === "cover" ? (
        // 사진을 화면 가득 깔고 글을 아래쪽에 얹는다
        <section className="relative isolate flex min-h-[600px] items-end overflow-hidden bg-brand text-white">
          {photos.hero && (
            <>
              <div data-photo className="absolute inset-0 -z-10">
                <Image src={photos.hero} alt="" fill sizes="100vw" className="object-cover" />
              </div>
              <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/75 via-black/20 to-black/40" />
            </>
          )}
          <div data-rise className={`${W} w-full pt-40 pb-14`}>
            {kicker}
            <Title className="mt-3 font-display text-5xl leading-tight font-bold sm:text-7xl">{sample.name}</Title>
            {tagline}
            {cta}
          </div>
        </section>
      ) : look.hero === "huge" ? (
        // 상호를 화면 가득 크게
        <section>
          <div data-rise className={`${W} pt-16 pb-12 sm:pt-24`}>
            {kicker}
            <Title className="mt-4 font-display text-6xl leading-none sm:text-9xl">{sample.name}</Title>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
              {tagline}
              {cta}
            </div>
          </div>
          {photos.hero ? (
            <Photo src={photos.hero} sizes="100vw" className="aspect-[16/9] sm:aspect-[21/9]" />
          ) : (
            <div className="border-b border-ink" />
          )}
        </section>
      ) : look.hero === "split" ? (
        <section className={`${W} grid items-center gap-10 py-10 md:grid-cols-2 md:py-16`}>
          <div className="py-6">
            {kicker}
            <Title className="mt-3 font-display text-4xl leading-tight font-bold sm:text-6xl">{sample.name}</Title>
            {tagline}
            {cta}
          </div>
          {photos.hero ? (
            <Photo src={photos.hero} sizes="(min-width: 768px) 560px, 100vw" className="aspect-[4/3] rounded-xl md:aspect-[5/6]" />
          ) : (
            <div className="flex aspect-[4/3] flex-col justify-end rounded-xl bg-brand p-8 text-brand-ink sm:p-12">
              <p className="font-display text-2xl leading-snug font-bold sm:text-3xl">{sample.tagline}</p>
              <p className="mt-6 text-sm opacity-80">{sample.phone}</p>
            </div>
          )}
        </section>
      ) : look.hero === "board" ? (
        // 색 면 위에 글, 사진은 아래 섹션으로 걸쳐 내려온다
        <section className="bg-brand text-brand-ink">
          <div className={`${W} grid items-center gap-10 pt-16 md:grid-cols-2 ${photos.hero ? "" : "pb-16"}`}>
            <div className={photos.hero ? "md:pb-16" : ""}>
              {kicker}
              <Title className="mt-3 font-display text-4xl leading-tight font-bold sm:text-6xl">{sample.name}</Title>
              {tagline}
              {cta}
            </div>
            {photos.hero && (
              <Photo
                src={photos.hero}
                sizes="(min-width: 768px) 480px, 100vw"
                className="-mb-10 aspect-[4/3] rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
              />
            )}
          </div>
        </section>
      ) : look.hero === "poster" ? (
        // 포스터: 화면을 꽉 채우는 상호, 기울인 사진, 숫자 스티커
        <section className="relative">
          <div className={`${W} grid items-center gap-12 py-14 md:grid-cols-[1.25fr_1fr] md:py-20`}>
            <div data-rise>
              <p className="inline-block -rotate-2 border-2 border-ink bg-accent px-3 py-1 text-sm font-bold text-white">
                {sample.type}
              </p>
              <Title className="mt-6 font-display text-[clamp(3.5rem,11vw,8rem)] leading-[0.95]">{sample.name}</Title>
              <p className="mt-6 max-w-md text-lg font-medium sm:text-xl">{sample.tagline}</p>
              {cta}
            </div>
            <div className="relative mx-auto w-4/5 max-w-sm md:w-full">
              {photos.hero ? (
                <Photo
                  src={photos.hero}
                  sizes="(min-width: 768px) 384px, 80vw"
                  className="aspect-[4/5] rotate-3 border-2 border-ink shadow-[10px_10px_0_var(--color-ink)]"
                />
              ) : (
                <div className="aspect-[4/5] rotate-3 border-2 border-ink bg-brand shadow-[10px_10px_0_var(--color-ink)]" />
              )}
              {sample.stats?.[0] && (
                <span
                  aria-hidden
                  className="pop-spin absolute -top-8 -left-8 flex size-28 flex-col items-center justify-center rounded-full border-2 border-ink bg-surface text-center leading-tight font-bold"
                >
                  <span className="font-display text-2xl">{sample.stats[0][0]}</span>
                  <span className="text-xs">{sample.stats[0][1]}</span>
                </span>
              )}
            </div>
          </div>
        </section>
      ) : look.hero === "stage" ? (
        // 무대: 검은 바탕에 큰 이름, 아치형 사진에 형광 테두리
        <section className="relative">
          <div className={`${W} grid gap-12 pt-16 pb-12 md:grid-cols-[1.35fr_1fr] md:items-end md:pt-24`}>
            <div data-rise>
              <p className="text-sm font-semibold text-brand">{sample.type}</p>
              <Title className="mt-5 font-display text-[clamp(3.25rem,10vw,7.5rem)] leading-[1.02] font-bold">{sample.name}</Title>
              <p className="mt-6 max-w-lg text-xl leading-relaxed text-muted sm:text-2xl">{sample.tagline}</p>
              {cta}
            </div>
            {photos.hero ? (
              <Photo
                src={photos.hero}
                sizes="(min-width: 768px) 400px, 90vw"
                className="mx-auto aspect-[3/4] w-4/5 rounded-t-full outline-2 outline-offset-8 outline-brand md:w-full"
              />
            ) : (
              <div className="mx-auto aspect-[3/4] w-4/5 rounded-t-full border-2 border-brand md:w-full" />
            )}
          </div>
        </section>
      ) : look.hero === "editorial" ? (
        // 한 줄 소개를 제목처럼 크게
        <section>
          <div className={`${W} pt-20 pb-14 sm:pt-28`}>
            {kicker}
            <Title className="mt-5 max-w-4xl font-display text-4xl leading-tight font-bold sm:text-6xl sm:leading-tight">
              {sample.tagline}
            </Title>
            <div className="flex flex-wrap items-center gap-x-6">
              {cta}
              <span className="mt-8 text-muted">{sample.name}</span>
            </div>
          </div>
          {photos.hero && (
            <div className={W}>
              <Photo src={photos.hero} sizes="(min-width: 1024px) 984px, 100vw" className="aspect-[16/9] rounded-xl sm:aspect-[5/2]" />
            </div>
          )}
        </section>
      ) : (
        // soft: 가운데 글, 둥근 큰 사진
        <section className="bg-surface">
          <div data-rise className={`${W} pt-20 text-center ${photos.hero ? "pb-12" : "pb-20"}`}>
            {kicker}
            <Title className="mt-3 font-display text-5xl leading-tight font-bold sm:text-6xl">{sample.name}</Title>
            {tagline}
            {cta}
          </div>
          {photos.hero && (
            <div className={`${W} pb-16`}>
              <Photo src={photos.hero} sizes="(min-width: 1024px) 984px, 100vw" className="aspect-[16/9] rounded-[2rem] sm:aspect-[2/1]" />
            </div>
          )}
        </section>
      )}

      {sample.stats && look.marquee ? (
        // 옆으로 흐르는 띠. 같은 줄을 두 번 이어 붙여 끊김 없이 돈다(app/globals.css .marquee)
        <div className="overflow-hidden border-y-2 border-ink bg-brand py-4 text-brand-ink">
          <p className="sr-only">{sample.stats.map(([v, l]) => `${l} ${v}`).join(", ")}</p>
          <div aria-hidden className="marquee flex w-max">
            {[0, 1].map((k) => (
              <span key={k} className="flex shrink-0 items-center gap-10 pr-10 font-display text-2xl whitespace-nowrap sm:text-3xl">
                {[...sample.stats!, ...sample.stats!].map(([v, l], i) => (
                  <span key={i} className="flex items-center gap-10">
                    <span>
                      {v} <span className="text-base font-sans font-semibold opacity-80">{l}</span>
                    </span>
                    <span className="text-lg">✳</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      ) : sample.stats && (
        <dl className={`${W} grid grid-cols-2 gap-y-8 border-b border-line py-12 ${look.hero === "board" && photos.hero ? "pt-20" : ""} ${sample.stats.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-4"}`}>
          {sample.stats.map(([value, label]) => (
            <div key={label} className="flex flex-col-reverse">
              <dt className="mt-1 text-sm text-muted">{label}</dt>
              <dd className="font-display text-3xl font-bold text-brand sm:text-4xl">{value}</dd>
            </div>
          ))}
        </dl>
      )}

      {/* 미리보기 틀은 첫 화면 높이만 보이니 첫 섹션까지만 그린다(홈에 12채가 깔려 사진 수십 장을 아낀다) */}
      {(preview ? sample.sections.slice(0, 1) : sample.sections).map((s, i) => (
        <section key={s.title} id={`sec-${i}`} className={i % 2 ? "scroll-mt-10 bg-surface" : "scroll-mt-10"}>
          <Block section={s} sample={sample} look={look} photos={photos} />
          {i === 0 && !preview && <Gallery kind={look.gallery} photos={gallery} />}
        </section>
      ))}
      <footer className="border-t border-line py-8 text-center text-sm text-muted">© {sample.name}</footer>
    </div>
  );
}

// 한 페이지 스크롤형: 장면마다 화면 한 장을 차지하고, 글은 반투명 판 위에 얹는다
function Scene({ sample, look, photos }: { sample: Sample; look: Look; photos: Photos }) {
  const bgs = [photos.hero, ...photos.gallery].filter((x) => x !== undefined);
  const target = Math.max(0, sample.sections.findIndex((s) => s.kind === "prices" || s.kind === "cards")) + 1;
  const hero = (
    <div className={`${W} w-full text-white`}>
      <p className="text-sm font-semibold opacity-80">{sample.type}</p>
      <h1 className="mt-4 font-display text-6xl leading-tight font-bold sm:text-8xl">{sample.name}</h1>
      <p className="mt-5 text-xl opacity-90 sm:text-2xl">{sample.tagline}</p>
      <a href={`#scene-${target}`} className={`${button} mt-10 !bg-white !text-black`}>
        {sample.cta}
      </a>
      <p className="mt-16 text-sm opacity-70" aria-hidden>
        아래로 내려 보세요 ↓
      </p>
    </div>
  );
  const scenes = sample.sections.map((s, i) => (
    <div key={s.title} className={`${W} w-full`}>
      <div className={`max-w-3xl overflow-hidden rounded-xl bg-paper/90 text-ink backdrop-blur-md ${i % 2 ? "ml-auto" : ""}`}>
        <Block section={s} sample={sample} look={{ ...look, reviews: "quote" }} photos={{ gallery: [] }} />
      </div>
    </div>
  ));
  return (
    <div style={themeStyle(sample.theme)} className="flex-1 bg-paper text-ink">
      <SceneScroll
        name={sample.name}
        phone={sample.phone}
        labels={sample.sections.map(navLabel)}
        bgs={bgs}
        scenes={[hero, ...scenes]}
      />
      <footer className="border-t border-line py-8 text-center text-sm text-muted">© {sample.name}</footer>
    </div>
  );
}
