import type { Metadata } from "next";
import { plans } from "@/lib/pricing";
import Link from "next/link";
import Image from "next/image";
import { getSample, samplePrice, samples } from "@/lib/samples";
import { site } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "문의",
  description: "견적 문의와 기타 문의를 남겨 주세요. 영업일 2일 안에 답변드립니다.",
};

export default async function Contact(props: PageProps<"/contact">) {
  const { sample, plan, business } = await props.searchParams;
  // 샘플 페이지의 "이 디자인으로 시작"에서 넘어오면 그 샘플이 선택된 채로 열린다
  const picked = typeof sample === "string" ? getSample(sample) : undefined;
  // 요금 카드의 "견적 받기"에서 오면 그 플랜이 골라진 채로 열린다
  const plan0 = picked ? plans[picked.plan].name : plans.find((p) => p.name === plan)?.name;
  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <h1 className="text-4xl font-bold md:text-5xl">{picked ? "이 디자인으로 시작하기" : "문의"}</h1>
      <p className="mt-3 mb-8 text-muted">
        업종과 연락처만 남겨 주셔도 됩니다. 영업일 2일 안에 남겨 주신 연락처로 답변드리고, 전화 영업은 하지 않습니다.
      </p>
      {site.kakaoChannelUrl && (
        <a
          href={site.kakaoChannelUrl}
          className="mb-8 flex min-h-12 items-center justify-center rounded-full bg-[#fee500] px-6 font-medium text-[#191919] hover:opacity-90"
        >
          폼이 번거로우면 카카오톡으로 물어보기
        </a>
      )}
      {picked && (
        <div className="mb-10 flex items-center gap-4 rounded-2xl border border-line bg-surface p-3 pr-5">
          {picked.photos?.hero && (
            <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-xl sm:w-36">
              <Image src={picked.photos.hero} alt="" fill sizes="144px" className="object-cover" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-sm text-muted">고른 디자인</p>
            <p className="mt-0.5 font-semibold">
              {picked.type} · {picked.name}
            </p>
            <p className="mt-0.5 text-sm text-muted">{samplePrice(picked)} · 상호와 내용은 내 가게 것으로 바꿉니다</p>
          </div>
          <Link href={`/demo/${picked.slug}`} className="hidden shrink-0 text-sm font-medium text-brand hover:underline sm:block">
            다시 보기
          </Link>
        </div>
      )}
      <ContactForm
        samples={samples.map((s) => ({ slug: s.slug, label: `${s.type} (${s.name})` }))}
        plans={plans.map((p) => p.name)}
        picked={picked?.slug}
        plan={plan0}
        business={typeof business === "string" ? business.slice(0, 40) : undefined}
      />
    </div>
  );
}
