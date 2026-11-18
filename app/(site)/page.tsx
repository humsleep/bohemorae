import Link from "next/link";
import { Faq, PlanCards, Section } from "@/components/ui";
import { faqs, plans } from "@/lib/pricing";
import { samplePrice, samples } from "@/lib/samples";
import { themeStyle } from "@/lib/themes";

const promises = [
  ["조건 전부 공개", "가격, 약정, 해지 조건을 요금 페이지 한 곳에 전부 적었습니다."],
  ["해지해도 내 사이트", "도메인은 고객 명의로 사고, 해지하면 소스와 콘텐츠를 넘겨드립니다."],
  ["만든 개발자가 직접 응대", "14년차 개발자가 직접 만들고 직접 답합니다. 전화 영업은 하지 않습니다."],
];

const steps = ["샘플 선택", "자료 전달", "영업일 3일 내 초안", "확인 후 오픈"];

const apps = ["모쏠 탈출기", "Wickhollow", "Ribatto", "FC Scope"];

// 히어로 오른쪽 조건표. 가장 싼 요금제 기준.
const sheet = [
  ["구축", plans[0].build],
  ["월 관리", plans[0].monthly],
  ["최소 이용", "3개월"],
  ["해지하면", "소스·콘텐츠 인도"],
];

const primary = "rounded-lg bg-brand px-5 py-3 font-medium text-brand-ink hover:opacity-90";
const secondary = "rounded-lg border border-ink px-5 py-3 font-medium hover:bg-surface";
const more = "mt-8 inline-block border-b border-ink pb-0.5 font-medium hover:border-brand hover:text-brand";
const num = "text-sm font-medium text-accent";

export default function Home() {
  return (
    <>
      <section className="mx-auto grid max-w-page items-end gap-10 px-4 py-16 md:grid-cols-[1fr_19rem] md:py-28">
        <div>
          <h1 className="text-4xl font-semibold leading-[1.15] sm:text-6xl">
            가게·회사 홈페이지,
            <br />
            구축 <span className="text-brand">19만원</span>부터
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted">
            월 2.5만원에 대신 고쳐드립니다. 가격과 해지 조건은 전부 공개합니다.
          </p>
          <div className="mt-9 flex gap-3">
            <Link href="/samples" className={primary}>샘플 보기</Link>
            <Link href="/contact" className={secondary}>문의하기</Link>
          </div>
        </div>
        <div>
          <dl className="border-t-2 border-ink">
          {sheet.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
              <dt className="text-sm text-muted">{k}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
          </dl>
          <p className="pt-3 text-xs text-muted">라이트 요금제 기준, 부가세 별도</p>
        </div>
      </section>

      <Section title="샘플" lead="마음에 드는 디자인을 고르면 그대로 만들어 드립니다.">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3">
          {samples.slice(0, 6).map((s) => (
            <li key={s.slug}>
              <Link href={`/samples/${s.slug}`} className="group block">
                <span
                  style={themeStyle(s.theme)}
                  className="flex aspect-[4/3] flex-col justify-between border border-line bg-surface p-4 text-ink group-hover:border-ink"
                >
                  <span className="h-1 w-8 bg-brand" />
                  <span className="font-display text-lg font-semibold leading-snug sm:text-xl">{s.name}</span>
                </span>
                <span className="mt-3 block font-medium">{s.type}</span>
                <span className="block text-sm text-muted">
                  {plans[s.plan].name} · {samplePrice(s)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/samples" className={more}>샘플 {samples.length}개 전체 보기</Link>
      </Section>

      <Section title="세 가지 약속">
        <ol className="border-t border-line">
          {promises.map(([t, d], i) => (
            <li key={t} className="grid gap-x-6 gap-y-1 border-b border-line py-5 sm:grid-cols-[2.5rem_13rem_1fr]">
              <span className={num}>0{i + 1}</span>
              <h3 className="text-lg font-semibold">{t}</h3>
              <p className="text-muted">{d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="요금" lead="부가세 별도. 최소 이용 기간은 3개월입니다.">
        <PlanCards />
        <Link href="/pricing" className={more}>수정 범위와 해지 조건까지 전부 보기</Link>
      </Section>

      <Section title="진행 절차">
        <ol className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s} className="border-t border-ink pt-3">
              <span className={num}>0{i + 1}</span>
              <span className="mt-1 block font-medium">{s}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="만든 사람">
        <p className="max-w-2xl text-lg leading-relaxed">
          Bohemorae는 앱과 웹을 직접 만드는 1인 개발 스튜디오입니다. 14년차 개발자가 앱스토어에
          출시한 앱({apps.join(", ")})을 만든 손으로 홈페이지도 직접 만듭니다.
        </p>
        <Link href="/apps" className={more}>출시 앱 보기</Link>
      </Section>

      <Section title="자주 묻는 질문">
        <Faq items={faqs.slice(0, 3)} />
        <Link href="/pricing" className={more}>질문 더 보기</Link>
      </Section>

      <section className="bg-brand text-brand-ink">
        <div className="mx-auto flex max-w-page flex-col gap-6 px-4 py-16 md:flex-row md:items-end md:justify-between md:py-20">
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
            업종과 원하는 샘플만
            <br />
            알려주셔도 됩니다
          </h2>
          <Link href="/contact" className="self-start rounded-lg bg-paper px-6 py-3 font-medium text-ink hover:opacity-90 md:self-auto">
            문의하기
          </Link>
        </div>
      </section>
    </>
  );
}
