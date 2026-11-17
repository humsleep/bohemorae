import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { plans } from "@/lib/pricing";
import { getSample, samplePrice, samples } from "@/lib/samples";

export const generateStaticParams = () => samples.map((s) => ({ slug: s.slug }));

export async function generateMetadata(props: PageProps<"/samples/[slug]">): Promise<Metadata> {
  const sample = getSample((await props.params).slug);
  return {
    title: `${sample?.type} 홈페이지 샘플`,
    description: sample?.intro,
  };
}

export default async function SamplePage(props: PageProps<"/samples/[slug]">) {
  const sample = getSample((await props.params).slug);
  if (!sample) notFound();
  const plan = plans[sample.plan];
  return (
    <div className="mx-auto max-w-page px-4 py-14">
      <p className="text-sm text-muted">
        <Link href="/samples" className="underline">샘플</Link> / {sample.type}
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        {sample.type} 홈페이지 샘플
      </h1>
      <p className="mt-3 max-w-2xl text-muted">{sample.intro}</p>
      <p className="mt-5 text-lg font-bold">
        {plan.name} 플랜 · {samplePrice(sample)}
        <span className="ml-2 text-sm font-normal text-muted">부가세 별도</span>
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href={`/contact?sample=${sample.slug}`}
          className="rounded-md bg-brand px-5 py-3 font-semibold text-brand-ink hover:opacity-90"
        >
          이 디자인으로 시작
        </Link>
        <Link
          href={`/demo/${sample.slug}`}
          className="rounded-md border border-line px-5 py-3 font-semibold hover:bg-surface"
        >
          전체 화면으로 보기
        </Link>
      </div>
      <iframe
        src={`/demo/${sample.slug}`}
        title={`${sample.name} 샘플 미리보기`}
        loading="lazy"
        className="mt-8 h-[70vh] w-full rounded-md border border-line"
      />
      <p className="mt-3 text-sm text-muted">
        {sample.plan > 0 &&
          `데모는 메인 페이지만 보여줍니다. ${plan.name} 플랜은 ${plan.specs[0][1]}까지 만들 수 있습니다. `}
        {sample.name}은 샘플용으로 만든 가상의 가게입니다. 상호, 전화번호, 주소는 실제와 관계가 없습니다.
      </p>
    </div>
  );
}
