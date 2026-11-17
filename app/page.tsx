import Link from "next/link";
import { Faq, PlanCards, Section } from "@/components/ui";
import { faqs, plans } from "@/lib/pricing";

// 3일차에 샘플 콘텐츠 파일이 생기면 거기서 읽도록 바꾼다
const sampleTypes: [string, number][] = [
  ["카페", 0],
  ["미용실", 0],
  ["식당", 0],
  ["학원·교습소", 1],
  ["소규모 회사", 2],
  ["강사·프리랜서", 0],
];

const promises = [
  ["조건 전부 공개", "가격, 약정, 해지 조건을 요금 페이지 한 곳에 전부 적었습니다."],
  ["해지해도 내 사이트", "도메인은 고객 명의로 사고, 해지하면 소스와 콘텐츠를 넘겨드립니다."],
  ["만든 개발자가 직접 응대", "14년차 개발자가 직접 만들고 직접 답합니다. 전화 영업은 하지 않습니다."],
];

const steps = ["샘플 선택", "자료 전달", "영업일 3일 내 초안", "확인 후 오픈"];

const apps = ["모쏠 탈출기", "Wickhollow", "Ribatto", "FC Scope"];

const primary = "rounded-md bg-brand px-5 py-3 font-semibold text-brand-ink hover:opacity-90";
const secondary = "rounded-md border border-line px-5 py-3 font-semibold hover:bg-surface";

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-page px-4 py-16 sm:py-24">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
          가게·회사 홈페이지,
          <br />
          구축 19만원부터.
        </h1>
        <p className="mt-4 text-lg text-muted">
          월 2.5만원에 대신 고쳐드립니다. 가격과 해지 조건은 전부 공개합니다.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/samples" className={primary}>샘플 보기</Link>
          <Link href="/contact" className={secondary}>문의하기</Link>
        </div>
      </section>

      <Section title="샘플" lead="마음에 드는 디자인을 고르면 그대로 만들어 드립니다." tinted>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {sampleTypes.map(([type, i]) => (
            <li key={type}>
              <Link href="/samples" className="block rounded-xl border border-line bg-paper p-4 hover:border-brand">
                <span className="block font-bold">{type}</span>
                <span className="mt-1 block text-sm text-muted">
                  {plans[i].name} · 구축 {plans[i].build} + 월 {plans[i].monthly}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/samples" className="mt-5 inline-block font-semibold text-brand underline">
          전체 샘플 보기
        </Link>
      </Section>

      <Section title="세 가지 약속">
        <ul className="grid gap-4 md:grid-cols-3">
          {promises.map(([t, d]) => (
            <li key={t} className="rounded-xl border border-line p-5">
              <h3 className="font-bold">{t}</h3>
              <p className="mt-2 text-sm text-muted">{d}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="요금" lead="부가세 별도. 최소 이용 기간은 3개월입니다." tinted>
        <PlanCards />
        <Link href="/pricing" className="mt-5 inline-block font-semibold text-brand underline">
          수정 범위와 해지 조건까지 전부 보기
        </Link>
      </Section>

      <Section title="진행 절차">
        <ol className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s} className="rounded-xl border border-line p-4">
              <span className="text-sm font-bold text-accent">{i + 1}</span>
              <span className="mt-1 block font-semibold">{s}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="만든 사람" tinted>
        <p className="max-w-2xl text-muted">
          Bohemorae는 앱과 웹을 직접 만드는 1인 개발 스튜디오입니다. 14년차 개발자가 앱스토어에
          출시한 앱({apps.join(", ")})을 만든 손으로 홈페이지도 직접 만듭니다.
        </p>
        <Link href="/apps" className="mt-4 inline-block font-semibold text-brand underline">
          출시 앱 보기
        </Link>
      </Section>

      <Section title="자주 묻는 질문">
        <Faq items={faqs.slice(0, 3)} />
        <Link href="/pricing" className="mt-5 inline-block font-semibold text-brand underline">
          질문 더 보기
        </Link>
      </Section>

      <Section title="문의" lead="업종과 원하는 샘플만 알려주셔도 됩니다." tinted>
        <Link href="/contact" className={primary + " inline-block"}>문의하기</Link>
      </Section>
    </>
  );
}
