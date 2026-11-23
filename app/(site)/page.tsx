import Link from "next/link";
import { HeroTry } from "@/components/HeroTry";
import { Showcase } from "@/components/Showcase";
import { Faq, PlanCards, Section } from "@/components/ui";
import { faqs, plans } from "@/lib/pricing";
import { getSample, samples } from "@/lib/samples";
import { site } from "@/lib/site";

// 홈은 다섯 덩어리: 첫 화면 → 샘플 → 매달 고쳐 드림 → 요금 → 질문과 문의. 자세한 것은 /pricing, /samples, /about
const more = "mt-6 inline-block font-medium text-brand hover:underline";
const pick = (slugs: string[]) => slugs.map((slug) => getSample(slug)!);

// 첫 화면 업종 칩: 제목의 19만원(라이트)과 맞도록 라이트 플랜 샘플만
const hero = pick(["cafe", "hair", "restaurant", "pilates", "nail", "tax"]);

// 샘플 섹션: 첫 화면과 겹치지 않는 업종으로 폭을 보여 준다
const showcase = pick(["creator", "coach", "sidejob", "dental", "academy", "pension"]).map((s) => ({
  slug: s.slug,
  name: s.name,
  type: s.type,
}));

// 수정 요청 화면 예시(가상의 요청)
const requests = [
  ["런치 메뉴 가격을 9,000원에서 10,000원으로 바꿔 주세요", "화 10:12 요청", "수 16:40 반영"],
  ["토요일 영업시간을 17시까지로 고쳐 주세요", "화 10:12 요청", "수 16:40 반영"],
  ["12월 휴무 공지를 올려 주세요", "화 10:13 요청", "수 16:41 반영"],
];

const light = plans[0];

export default function Home() {
  return (
    <>
      <HeroTry samples={hero} note={`라이트 기준 · 부가세 별도 (포함가 구축 209,000원 · 월 27,500원)`} />

      <Section title={`우리 업종 샘플 ${samples.length}개`} lead="인플루언서·강연자부터 치과·학원·펜션까지. PC와 휴대폰 화면을 바꿔 가며 보세요.">
        <Showcase items={showcase} total={samples.length} />
      </Section>

      <Section title="만들고 끝나지 않습니다">
        <div className="grid items-start gap-8 md:grid-cols-2 md:gap-12">
          <div className="space-y-4 text-lg leading-relaxed text-muted">
            <p>홈페이지는 보통 만든 날부터 낡기 시작합니다.</p>
            <p>
              그런데 고칠 줄 모르면, 가격이 오르고 영업시간이 바뀌어도 예전 내용이 그대로 남습니다.
            </p>
            <p className="text-ink">
              그래서 보헤모레는 매달 대신 고쳐 드립니다. 라이트 기준 {light.specs[1][1]}, {light.specs[2][1]} 안에 반영합니다.
            </p>
            <p className="text-base">해지해도 도메인과 소스, 콘텐츠는 그대로 고객님 것입니다.</p>
            <Link href="/about" className={more}>
              14년차 개발자가 직접 만들고 직접 답합니다 →
            </Link>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-6">
            <div className="flex items-baseline justify-between text-sm">
              <p className="font-medium">11월 수정 요청</p>
              <p className="text-muted">예시 화면</p>
            </div>
            <ul className="mt-4 space-y-3">
              {requests.map(([text, asked, done]) => (
                <li key={text} className="rounded-xl bg-raised p-4">
                  <p>{text}</p>
                  <p className="mt-3 flex items-center justify-between text-sm text-muted">
                    <span>{asked}</span>
                    <span>{done}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section
        title="19만원부터 시작합니다"
        lead={`부가세 별도, 최소 이용 3개월. 하실 일은 샘플 고르기와 자료 보내기 두 가지이고, 초안은 라이트 기준 ${light.specs[8][1]} 안에 드립니다.`}
      >
        <PlanCards cta={false} />
        <Link href="/pricing" className={more}>
          수정 범위·진행 절차·해지 조건 전부 보기 →
        </Link>
      </Section>

      <Section title="자주 묻는 질문">
        {/* 해지·도메인은 위 섹션에서 말했으니 겹치지 않는 질문만 */}
        <Faq items={[faqs[2], faqs[3], faqs[5]]} />
      </Section>

      <section className="mx-auto max-w-page px-4 pb-24">
        <div className="rounded-2xl bg-ink px-6 py-14 text-center text-paper md:py-20">
          <h2 className="font-head text-3xl leading-tight font-extrabold md:text-5xl">
            가게 이름만 알려 주셔도
            <br />
            견적을 드립니다
          </h2>
          <p className="mx-auto mt-4 max-w-md opacity-80">
            전화 영업은 하지 않습니다. 문의에는 영업일 2일 안에 답하고, 초안 전에 취소하면 전액 돌려드립니다.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="rounded-full bg-paper px-6 py-3 font-medium text-ink hover:opacity-90">
              무료 견적 받기
            </Link>
            {site.kakaoChannelUrl && (
              <a href={site.kakaoChannelUrl} className="rounded-full border border-paper/30 px-6 py-3 font-medium hover:bg-paper/10">
                카톡 문의
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
