import type { Metadata } from "next";
import { SampleGrid } from "@/components/SampleGrid";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { plans } from "@/lib/pricing";
import { categories, samplePrice, samples } from "@/lib/samples";
import { themeStyle } from "@/lib/themes";

export const metadata: Metadata = {
  title: "샘플",
  description: "업종별 홈페이지 샘플. 마음에 드는 디자인을 고르면 그대로 만들어 드립니다.",
};

export default function Samples() {
  return (
    <div className="mx-auto max-w-page px-4 py-14">
      <h1 className="text-4xl font-bold md:text-5xl">샘플</h1>
      <p className="mt-3 text-muted">
        마음에 드는 디자인을 고르면 상호와 내용만 바꿔 그대로 만들어 드립니다. 샘플 속 상호, 전화번호, 후기는 모두 가상입니다.
      </p>
      <SampleGrid
        categories={categories}
        cards={samples.map((s) => ({
          slug: s.slug,
          name: s.name,
          tagline: s.tagline,
          type: s.type,
          category: s.category,
          meta: `${plans[s.plan].name} · ${samplePrice(s)}`,
          vars: themeStyle(s.theme),
          photo: s.photos?.hero,
        }))}
      />

      <section className="mt-24 border-t border-line pt-16">
        <h2 className="text-3xl font-bold leading-tight md:text-4xl">같은 가게도 분위기는 고르는 대로</h2>
        <p className="mt-3 max-w-xl text-muted">
          글꼴, 색, 첫 화면 구성을 통째로 바꿉니다. 아래에서 직접 눌러 보세요. 원하는 분위기가 없으면 맞춤 디자인(
          {plans[0].specs[4][1]}부터)으로 새로 만듭니다.
        </p>
        <div className="mt-10">
          <ThemeSwitcher sample={samples[0]} />
        </div>
      </section>
    </div>
  );
}
