import type { Metadata } from "next";
import Link from "next/link";
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
      <div className="sticky top-0 z-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-ink px-4 py-2 text-center text-sm text-paper">
        <span>샘플 사이트입니다 · 이 디자인 그대로 {samplePrice(sample)}</span>
        <Link href={`/contact?sample=${sample.slug}`} className="font-semibold underline">
          이 디자인으로 시작
        </Link>
      </div>
      <SampleSite sample={sample} />
    </>
  );
}
