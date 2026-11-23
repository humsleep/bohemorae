import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BeforeAfter } from "@/components/BeforeAfter";
import { HeroTry } from "@/components/HeroTry";
import { Showcase } from "@/components/Showcase";
import { Faq, PlanCards, Section } from "@/components/ui";
import { apps } from "@/lib/apps";
import { comparison, faqs, plans } from "@/lib/pricing";
import { getSample, samples } from "@/lib/samples";
import { site } from "@/lib/site";

const more = "mt-6 inline-block font-medium text-brand hover:underline";
const tile = "reveal rounded-3xl border border-line bg-surface p-6 md:p-8";

// 첫 화면 미리보기와 비포/애프터에 쓰는 샘플(이름을 바꿔 넣기 좋은 매장형)
const cafe = getSample("cafe")!;

// 포트폴리오 목록: 업종이 고루 섞이게 8채만
const showcase = ["cafe", "creator", "hair", "coach", "restaurant", "sidejob", "pilates", "interior"]
  .map((slug) => getSample(slug)!)
  .map((s) => ({ slug: s.slug, name: s.name, type: s.type }));

// 업종 띠: 샘플 업종에서 겹치지 않게
const industries = [...new Set(samples.map((s) => s.type))];

// 스크롤로 채워지는 문장. 마지막 세 낱말은 금색
const statement = "홈페이지는 만들고 끝이 아닙니다. 가격이 바뀌고, 메뉴가 바뀌고, 공지가 생깁니다. 그때마다 사장님 대신 고쳐드립니다.".split(" ");

// 진행 절차: 누가 하는지(who), 무엇을, 얼마나 걸리는지
const steps = [
  { who: "고객님", title: "샘플 고르기", body: "마음에 드는 디자인을 고릅니다. 못 골라도 괜찮습니다", time: "5분" },
  { who: "고객님", title: "자료 보내기", body: "상호, 가격표, 영업시간, 사진 5~10장을 카톡이나 메일로", time: "편할 때" },
  { who: "보헤모레", title: "초안 받아 보기", body: "만든 화면을 링크로 보내 드립니다. 고칠 곳만 말씀해 주세요", time: `${plans[0].specs[8][1]}` },
  { who: "보헤모레", title: "오픈", body: "도메인에 연결하고 네이버·구글에 등록합니다. 이후 월 관리 시작", time: "확인 후 바로" },
];

// 3년 총액 비교: 직접 제작, 우리 라이트, 초기비 0원 구독형. 숫자는 요금 페이지와 같은 출처.
const totals = [comparison[0], comparison[1], comparison[4]].map((c) => ({
  ...c,
  n: parseFloat(c.total.replace(/[^0-9.]/g, "")),
}));
const maxTotal = Math.max(...totals.map((t) => t.n));

// 수정 요청 화면 예시(가상의 요청)
const requests = [
  ["런치 메뉴 가격을 9,000원에서 10,000원으로 바꿔 주세요", "화 10:12 요청", "수 16:40 반영"],
  ["토요일 영업시간을 17시까지로 고쳐 주세요", "화 10:12 요청", "수 16:40 반영"],
  ["12월 휴무 공지를 올려 주세요", "화 10:13 요청", "수 16:41 반영"],
];

const handover = [
  ["도메인", "처음부터 고객 명의"],
  ["소스 코드", "전체 무료 전달"],
  ["콘텐츠 파일", "문구와 이미지 전부"],
  ["다른 호스팅으로 이전", "원하면 5만원에 대행"],
];

export default function Home() {
  return (
    <>
      <HeroTry sample={cafe} priceLine={`구축 ${plans[0].build}부터 · 월 ${plans[0].monthly} (부가세 별도) · 상담은 무료입니다`} />

      {/* 업종 이름이 옆으로 흐르는 띠. 같은 줄을 두 번 이어 붙여 끊김 없이 돈다 */}
      <div className="overflow-hidden bg-ink py-4 text-paper md:py-5">
        <p className="sr-only">만드는 업종: {industries.join(", ")}</p>
        <div aria-hidden className="marquee flex w-max">
          {[0, 1].map((k) => (
            <span key={k} className="flex shrink-0 items-center gap-6 pr-6 text-lg font-semibold whitespace-nowrap md:gap-8 md:pr-8 md:text-2xl">
              {industries.map((t) => (
                <span key={t} className="flex items-center gap-6 md:gap-8">
                  {t}
                  <span className="text-sm text-brand md:text-base">✳</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* 스크롤하면 글자가 앞에서부터 진해진다(app/globals.css .fill-text). 지원하지 않으면 처음부터 진하게 보인다 */}
      <section className="mx-auto max-w-page px-4 py-28 md:py-40">
        <p
          className="fill-text max-w-4xl text-3xl leading-snug font-bold md:text-6xl md:leading-tight"
          style={{ "--n": statement.length } as CSSProperties}
        >
          {statement.map((w, i) => (
            <span key={i} style={{ "--i": i } as CSSProperties} className={i >= statement.length - 3 ? "text-brand" : undefined}>
              {w}{" "}
            </span>
          ))}
        </p>
      </section>

      <Section title="업종마다 다르게 만듭니다" lead="이름에 마우스를 올리거나 눌러 보세요. PC와 휴대폰에서 어떻게 보이는지 바로 바꿔 볼 수 있습니다.">
        <Showcase items={showcase} total={samples.length} />
      </Section>

      <Section title="SNS만 있을 때와 무엇이 다를까요" lead="가운데 손잡이를 좌우로 끌어 보세요. 손님이 DM으로 묻던 것들이 홈페이지에서는 한 번에 보입니다.">
        <BeforeAfter sample={cafe} />
      </Section>

      <Section title="요금" lead="큰 숫자는 부가세 별도 금액이고, 카드마다 부가세 포함가를 함께 적었습니다. 최소 이용 기간은 3개월입니다.">
        <PlanCards />
        <Link href="/pricing" className={more}>수정 범위와 해지 조건까지 전부 보기 →</Link>
      </Section>

      <Section title="진행 절차" lead="고객님이 하실 일은 두 가지뿐입니다. 나머지는 보헤모레가 합니다.">
        <ol className="grid gap-3 md:grid-cols-4 md:gap-4">
          {steps.map((st, i) => (
            <li key={st.title} className="relative flex gap-4 rounded-2xl border border-line bg-surface p-5 md:flex-col md:gap-0 md:p-6">
              <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  st.who === "고객님" ? "border-2 border-brand text-brand" : "bg-brand text-brand-ink"
                }`}
              >
                {i + 1}
              </span>
              <span className="min-w-0 md:mt-5">
                <span className="text-xs font-semibold text-muted">{st.who} · {st.time}</span>
                <span className="mt-1 block text-lg font-bold">{st.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted">{st.body}</span>
              </span>
              {i < steps.length - 1 && (
                <span aria-hidden className="absolute top-1/2 -right-3 z-10 hidden -translate-y-1/2 text-lg text-brand md:block">
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
        <p className="mt-5 text-sm text-muted">
          구축비는 시작할 때 절반, 오픈할 때 절반을 냅니다. 초안을 보기 전에 그만두시면 전액 돌려드립니다.
        </p>
      </Section>

      <Section title="구독하는 동안 해드리는 일" lead="만들고 끝내지 않습니다. 매달 고치고, 지키고, 언제든 가져가실 수 있게 둡니다.">
        <div className="grid gap-4 md:grid-cols-6">
          <div className={`${tile} md:col-span-4 md:row-span-2`}>
            <h3 className="text-2xl font-bold">고칠 일이 생기면 대신 고쳐드립니다</h3>
            <p className="mt-2 text-muted">
              가격표, 영업시간, 사진, 공지는 요청만 하세요. 라이트 기준 {plans[0].specs[1][1]}, {plans[0].specs[2][1]} 안에 반영합니다.
            </p>
            <div className="mt-6 flex items-baseline justify-between text-sm">
              <p className="font-medium">11월 수정 요청</p>
              <p className="text-muted">예시 화면</p>
            </div>
            <ul className="mt-3 space-y-3">
              {requests.map(([text, asked, done]) => (
                <li key={text} className="rounded-2xl bg-raised p-4">
                  <p>{text}</p>
                  <p className="mt-3 flex items-center justify-between text-sm text-muted">
                    <span>{asked}</span>
                    <span className="flex items-center gap-2 text-brand">
                      <span className="size-1.5 rounded-full bg-brand" />
                      {done}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${tile} md:col-span-2`}>
            <h3 className="text-xl font-bold">해지해도 사이트는 고객님 것</h3>
            <dl className="mt-4 divide-y divide-line text-sm">
              {handover.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 py-2.5">
                  <dt>{k}</dt>
                  <dd className="text-right text-muted">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={`${tile} md:col-span-2`}>
            <h3 className="text-xl font-bold">3년 동안 내는 돈</h3>
            <ul className="mt-4 space-y-4 text-sm">
              {totals.map((t) => (
                <li key={t.name}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className={t.ours ? "font-medium" : "text-muted"}>{t.name}</span>
                    <span className={`whitespace-nowrap font-semibold ${t.ours ? "text-brand" : ""}`}>{t.total}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-raised">
                    <div className={`h-1.5 rounded-full ${t.ours ? "bg-brand" : "bg-muted/40"}`} style={{ width: `${(t.n / maxTotal) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted">부가세 별도, 도메인 비용 제외</p>
          </div>

          <div className={`${tile} grid items-center gap-6 md:col-span-6 md:grid-cols-[1fr_1.2fr]`}>
            <div>
              <h3 className="text-2xl font-bold">14년차 개발자가 직접 만들고 직접 답합니다</h3>
              <p className="mt-2 text-muted">
                앱스토어에 앱 {apps.length}개를 출시한 손으로 홈페이지도 직접 만듭니다. 전화 영업은 하지 않습니다.
              </p>
              <Link href="/about" className={more}>만든 사람 소개 →</Link>
            </div>
            {/* 출시 앱의 실제 화면. App Store 등록 이미지(public/apps) */}
            <ul className="grid grid-cols-3 gap-3">
              {[apps[0], apps[2], apps[3]].map((a) => (
                <li key={a.slug}>
                  <Link href="/apps" className="block">
                    <span className="relative block aspect-[598/1300] overflow-hidden rounded-xl border border-line">
                      <Image src={a.shots[0]} alt={`${a.name} 앱 화면`} fill sizes="(min-width: 768px) 160px, 30vw" className="object-cover" />
                    </span>
                    <span className="mt-2 flex items-center gap-2">
                      <Image src={a.icon} alt="" width={20} height={20} className="size-5 rounded-md" />
                      <span className="truncate text-sm font-medium">{a.name}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="자주 묻는 질문">
        <Faq items={faqs.slice(0, 4)} />
        <Link href="/pricing" className={more}>질문 더 보기 →</Link>
      </Section>

      <section className="mx-auto max-w-page px-4 pb-24">
        <div className="rounded-3xl bg-ink px-6 py-16 text-center text-paper md:py-20">
          <h2 className="font-serif-ko text-3xl leading-tight font-extrabold md:text-5xl">
            업종과 원하는 샘플만
            <br />
            알려주셔도 됩니다
          </h2>
          <p className="mt-4 opacity-80">연락처만 남겨 주셔도 영업일 2일 안에 답변드립니다</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="rounded-full bg-paper px-6 py-3 font-medium text-ink hover:opacity-90">무료 견적 받기</Link>
            {site.kakaoChannelUrl ? (
              <a href={site.kakaoChannelUrl} className="rounded-full border border-paper/30 px-6 py-3 font-medium hover:bg-paper/10">카톡으로 물어보기</a>
            ) : (
              <Link href="/pricing" className="rounded-full border border-paper/30 px-6 py-3 font-medium hover:bg-paper/10">요금 보기</Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
