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
      {/* 아래쪽에 띄워 둔다. 위에 두면 샘플 사이트의 고정 메뉴를 가린다 */}
      <div className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-max flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-2xl bg-ink/90 px-5 py-2.5 text-center text-sm text-paper shadow-lg backdrop-blur">
        <span>샘플 사이트입니다 · 이 디자인 그대로 {samplePrice(sample)}</span>
        <Link href={`/contact?sample=${sample.slug}`} className="font-semibold underline">
          이 디자인으로 시작
        </Link>
      </div>
      <div className="pb-20">
        <SampleSite sample={sample} />
      </div>
    </>
  );
}
