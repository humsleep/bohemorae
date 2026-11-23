import type { Metadata } from "next";
import { DemoBar } from "@/components/DemoBar";
import { notFound } from "next/navigation";
import { SampleSite } from "@/components/SampleSite";
import { getSample, samplePrice, samples } from "@/lib/samples";

export const generateStaticParams = () => samples.map((s) => ({ slug: s.slug }));

export async function generateMetadata(props: PageProps<"/demo/[slug]">): Promise<Metadata> {
  const sample = getSample((await props.params).slug);
  return {
    title: `${sample?.name} (샘플)`,
    // 가상의 가게가 검색 결과에 실제 가게처럼 뜨지 않게 막는다
    robots: { index: false, follow: false },
  };
}

export default async function Demo(props: PageProps<"/demo/[slug]">) {
  const sample = getSample((await props.params).slug);
  if (!sample) notFound();
  return (
    <>
      {/* 아래쪽에 띄워 둔다. 위에 두면 샘플 사이트의 고정 메뉴를 가린다 */}
      <DemoBar slug={sample.slug} text={`가상의 ${sample.type} 샘플 · 이 디자인 그대로 ${samplePrice(sample)}`} />
      <div className="pb-20">
        <SampleSite sample={sample} />
      </div>
    </>
  );
}
