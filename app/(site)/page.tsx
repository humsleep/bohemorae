import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SitePreview } from "@/components/SitePreview";
import { Faq, PlanCards, Section } from "@/components/ui";
import { apps } from "@/lib/apps";
import { comparison, faqs, plans } from "@/lib/pricing";
import { samples } from "@/lib/samples";
import { site } from "@/lib/site";

const primary = "rounded-full bg-ink px-6 py-3 font-medium text-paper hover:opacity-90";
const secondary = "rounded-full border border-line bg-surface px-6 py-3 font-medium hover:border-ink";
const more = "mt-6 inline-block font-medium text-brand hover:underline";
const panel = "rounded-3xl border border-line bg-surface p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] md:p-10";

// 샘플 벽: 두 채씩 묶어 세로 단을 만든다
const columns = Array.from({ length: Math.ceil(samples.length / 2) }, (_, i) => samples.slice(i * 2, i * 2 + 2));

const steps = [
  ["샘플 선택", "마음에 드는 디자인을 고릅니다"],
  ["자료 전달", "상호, 가격표, 영업시간, 사진 5~10장이면 충분합니다"],
  ["초안 확인", `${plans[0].specs[8][1]} 안에 초안을 드립니다`],
  ["오픈", "확인이 끝나면 도메인에 연결합니다"],
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

function Feature({
  title,
  body,
  href,
  link,
  flip,
  children,
}: {
  title: string;
  body: string;
  href: string;
  link: string;
  flip?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="reveal mx-auto grid max-w-page items-center gap-8 px-4 py-12 md:grid-cols-2 md:gap-16 md:py-20">
      <div className={flip ? "md:order-2" : undefined}>
        <h2 className="text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
        <p className="mt-4 max-w-md text-lg text-muted">{body}</p>
        <Link href={href} className={more}>
          {link} →
        </Link>
      </div>
      <div className={panel}>{children}</div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="overflow-hidden pt-16 md:pt-24">
        <div className="px-rise mx-auto max-w-page px-4 text-center">
          <h1 className="text-4xl font-bold leading-[1.15] sm:text-5xl md:text-7xl">
            가게·회사 홈페이지,
            <br />
            구축{" "}
            <span className="text-brand">19만원</span>
            부터
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg text-muted">
            가게와 회사는 물론 인플루언서·전문가 개인 사이트까지. 월 2.5만원에 대신 고쳐드립니다.
          </p>
          <div className="mt-9 flex justify-center gap-3">
            <Link href="/samples" className={primary}>샘플 보기</Link>
            <Link href="/contact" className={secondary}>무료 견적 받기</Link>
          </div>
          <p className="mt-4 text-sm text-muted">{plans[0].vat}</p>
        </div>

        {/* 샘플 사이트 벽. 업종마다 글꼴, 색, 첫 화면 구성이 다르다. 화면보다 넓게 깔고 가운데를 맞춘다. */}
        <div className="relative mt-16 [--z:0.24] md:[--z:0.34]">
          <div className="flex justify-center gap-4 md:gap-6">
            {columns.map((col, i) => (
              <div key={i} className={`flex shrink-0 flex-col gap-4 md:gap-6 ${i % 2 ? "px-drift-b pt-12 md:pt-20" : "px-drift-a"}`}>
                {col.map((s) => (
                  <SitePreview key={s.slug} sample={s} />
                ))}
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-paper to-transparent" />
          <Link href="/samples" aria-label="샘플 전체 보기" className="absolute inset-0" />
        </div>
        <div className="relative mx-auto -mt-6 max-w-page px-4 pb-4 text-center">
          <Link href="/samples" className="font-medium text-brand hover:underline">
            업종별 샘플 {samples.length}개 전부 보기 →
          </Link>
        </div>
      </section>

      <Section title="요금" lead="큰 숫자는 부가세 별도 금액이고, 카드마다 부가세 포함가를 함께 적었습니다. 최소 이용 기간은 3개월입니다.">
        <PlanCards />
        <Link href="/pricing" className={more}>수정 범위와 해지 조건까지 전부 보기 →</Link>
      </Section>

      <Section title="진행 절차">
        <ol className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {steps.map(([t, d], i) => (
            <li key={t} className="rounded-2xl border border-line p-6">
              <span className="text-sm font-medium text-accent">0{i + 1}</span>
              <p className="mt-6 text-lg font-medium">{t}</p>
              <p className="mt-1 text-sm text-muted">{d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Feature
        title="고칠 일이 생기면 대신 고쳐드립니다"
        body={`가격표, 영업시간, 사진, 공지처럼 자주 바뀌는 내용은 요청만 하시면 됩니다. 라이트 기준 ${plans[0].specs[1][1]}, ${plans[0].specs[2][1]} 안에 반영합니다.`}
        href="/pricing"
        link="수정 범위 보기"
      >
        <div className="flex items-baseline justify-between">
          <p className="font-medium">11월 수정 요청</p>
          <p className="text-sm text-muted">예시 화면</p>
        </div>
        <ul className="mt-6 space-y-3">
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
      </Feature>

      <Feature
        flip
        title="해지해도 사이트는 고객님 것입니다"
        body="도메인은 처음부터 고객 명의로 삽니다. 해지하면 소스와 콘텐츠 파일을 무료로 넘겨드립니다. 최소 이용 기간은 3개월입니다."
        href="/pricing"
        link="약정과 해지 조건"
      >
        <p className="font-medium">해지할 때 받는 것</p>
        <dl className="mt-6 divide-y divide-line border-y border-line">
          {handover.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4 py-4">
              <dt>{k}</dt>
              <dd className="text-right text-muted">{v}</dd>
            </div>
          ))}
        </dl>
      </Feature>

      <Feature
        title="가격과 조건을 전부 공개합니다"
        body="구축비, 월 요금, 약정, 해지 조건을 요금 페이지 한 곳에 적었습니다. 3년 동안 내는 돈까지 미리 계산해 두었습니다."
        href="/pricing"
        link="요금 전부 보기"
      >
        <p className="font-medium">3년 동안 내는 돈</p>
        <ul className="mt-6 space-y-6">
          {totals.map((t) => (
            <li key={t.name}>
              <div className="flex items-baseline justify-between gap-4">
                <span className={t.ours ? "font-medium" : "text-muted"}>{t.name}</span>
                <span className={`whitespace-nowrap text-xl font-semibold ${t.ours ? "text-brand" : ""}`}>{t.total}</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-raised">
                <div
                  className={`h-2 rounded-full ${t.ours ? "bg-brand" : "bg-muted/40"}`}
                  style={{ width: `${(t.n / maxTotal) * 100}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-muted">수정: {t.edits}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-muted">부가세 별도, 도메인 비용 제외</p>
      </Feature>

      <Feature
        flip
        title="14년차 개발자가 직접 만들고 직접 답합니다"
        body="보헤모레는 앱과 웹을 직접 만드는 1인 개발 스튜디오입니다. 앱스토어에 앱 5개를 출시한 손으로 홈페이지도 직접 만듭니다. 전화 영업은 하지 않습니다."
        href="/about"
        link="만든 사람 소개"
      >
        {/* 출시 앱의 실제 화면. App Store 등록 이미지(public/apps) */}
        <ul className="grid grid-cols-3 gap-3">
          {[apps[0], apps[2], apps[3]].map((a) => (
            <li key={a.slug}>
              <Link href="/apps" className="block">
                <span className="relative block aspect-[598/1300] overflow-hidden rounded-xl border border-line">
                  <Image src={a.shots[0]} alt={`${a.name} 앱 화면`} fill sizes="(min-width: 768px) 160px, 30vw" className="object-cover" />
                </span>
                <span className="mt-3 flex items-center gap-2">
                  <Image src={a.icon} alt="" width={24} height={24} className="size-6 rounded-md" />
                  <span className="truncate text-sm font-medium">{a.name}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-muted">앱스토어 출시 {apps.length}개 · 기획부터 출시까지 1인 개발</p>
      </Feature>

      <Section title="자주 묻는 질문">
        <Faq items={faqs.slice(0, 4)} />
        <Link href="/pricing" className={more}>질문 더 보기 →</Link>
      </Section>

      <section className="mx-auto max-w-page px-4 pb-24">
        <div className="rounded-3xl bg-ink px-6 py-16 text-center text-paper md:py-20">
          <h2 className="text-3xl font-bold leading-tight md:text-5xl">
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
