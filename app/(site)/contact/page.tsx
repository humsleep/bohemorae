import type { Metadata } from "next";
import { plans } from "@/lib/pricing";
import Link from "next/link";
import Image from "next/image";
import { getSample, samplePrice, samples } from "@/lib/samples";
import { site } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "문의",
  description: "견적 문의와 기타 문의를 남겨 주세요. 영업일 2일 안에 메일로 답변드립니다.",
};

export default async function Contact(props: PageProps<"/contact">) {
  const { sample } = await props.searchParams;
  // 샘플 페이지의 "이 디자인으로 시작"에서 넘어오면 그 샘플이 선택된 채로 열린다
  const picked = typeof sample === "string" ? getSample(sample) : undefined;
  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <h1 className="text-3xl font-semibold sm:text-4xl">{picked ? "이 디자인으로 시작하기" : "문의"}</h1>
      <p className="mt-3 mb-8 text-muted">
        영업일 2일 안에 메일로 답변드립니다. 전화 영업은 하지 않습니다.
        {site.kakaoChannelUrl && (
          <>
            {" "}
            <a href={site.kakaoChannelUrl} className="font-medium text-brand underline">
              카카오톡 채널로 문의하기
            </a>
          </>
        )}
      </p>
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
        picked={picked && { slug: picked.slug, plan: plans[picked.plan].name }}
      />
    </div>
  );
}
