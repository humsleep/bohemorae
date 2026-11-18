import type { Metadata } from "next";
import { plans } from "@/lib/pricing";
import { getSample, samples } from "@/lib/samples";
import { site } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "문의",
  description: "견적 문의와 기타 문의를 남겨 주세요. 영업일 2일 안에 메일로 답변드립니다.",
};

export default async function Contact(props: PageProps<"/contact">) {
  const { sample } = await props.searchParams;
  // 샘플 페이지의 "이 디자인으로 시작"에서 넘어오면 그 샘플이 선택된 채로 열린다
  const defaultSample = typeof sample === "string" && getSample(sample) ? sample : "";
  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">문의</h1>
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
      <ContactForm
        samples={samples.map((s) => ({ slug: s.slug, label: `${s.type} (${s.name})` }))}
        plans={plans.map((p) => p.name)}
        defaultSample={defaultSample}
      />
    </div>
  );
}
