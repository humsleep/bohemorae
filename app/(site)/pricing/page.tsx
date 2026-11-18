import type { Metadata } from "next";
import Link from "next/link";
import { Faq, KV, PlanCards, Section } from "@/components/ui";
import { comparison, editScope, extras, faqs, included, terms } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "요금",
  description: "구축비, 월 요금, 수정 범위, 약정·해지 조건을 한 페이지에 전부 공개합니다.",
};

export default function Pricing() {
  return (
    <>
      <div className="mx-auto max-w-page px-4 pt-14">
        <h1 className="text-3xl font-semibold sm:text-4xl">요금</h1>
        <p className="mt-3 text-muted">
          가격, 약정, 해지 조건을 이 페이지에 전부 적었습니다. 모든 금액은 부가세 별도입니다.
        </p>
      </div>

      <Section title="플랜">
        <PlanCards full />
        <p className="mt-4 text-sm text-muted">
          <strong className="text-ink">모든 플랜의 월 요금에 포함:</strong> {included}.
        </p>
        <p className="mt-2 text-sm text-muted">
          <strong className="text-ink">플랜 고르는 기준:</strong> 회원 관리가 필요하거나, 게시글이
          30개 이상이거나, 자주 고쳐야 하는 콘텐츠가 있으면 프로입니다. 그 외에는 라이트나
          스탠다드로 충분합니다.
        </p>
      </Section>

      <Section
        title="수정 범위"
        lead="1건은 문구 한 덩어리, 이미지 한 장, 링크나 연락처 한 곳입니다."
       
      >
        <KV rows={editScope} />
      </Section>

      <Section title="추가 작업 단가">
        <KV rows={extras} />
      </Section>

      <Section title="약정과 해지">
        <KV rows={terms} />
      </Section>

      <Section
        title="3년 총액 비교"
        lead="다른 방식과 3년 동안 드는 돈을 나란히 놓았습니다. 타사 금액은 2026년 11월 공개 요금 기준이며 바뀔 수 있습니다."
      >
        <table className="w-full border-y border-line text-left text-sm">
          <thead className="text-muted">
            <tr className="border-b border-line">
              <th className="py-3 pr-3 font-medium">방식</th>
              <th className="py-3 pr-3 font-medium">3년 총액</th>
              <th className="py-3 font-medium">수정</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {comparison.map((c) => (
              <tr key={c.name} className={c.ours ? "bg-surface" : undefined}>
                <th scope="row" className="py-3 pr-3 pl-2 font-medium">
                  {c.name}
                  <span className="block font-normal text-muted">{c.calc}</span>
                </th>
                <td className="py-3 pr-3 font-medium whitespace-nowrap">{c.total}</td>
                <td className="py-3 text-muted">{c.edits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="자주 묻는 질문">
        <Faq items={faqs} />
      </Section>

      <Section title="조건이 괜찮다면" lead="샘플을 고르고 문의를 남겨 주세요.">
        <div className="flex gap-3">
          <Link href="/samples" className="rounded-lg bg-brand px-5 py-3 font-medium text-brand-ink hover:opacity-90">
            샘플 보기
          </Link>
          <Link href="/contact" className="rounded-lg border border-line px-5 py-3 font-medium hover:bg-surface">
            문의하기
          </Link>
        </div>
      </Section>
    </>
  );
}
