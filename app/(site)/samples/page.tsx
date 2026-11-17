import type { Metadata } from "next";
import { SampleGrid } from "@/components/SampleGrid";
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
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">샘플</h1>
      <p className="mt-3 text-muted">
        마음에 드는 디자인을 고르면 상호와 내용만 바꿔 그대로 만들어 드립니다.
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
        }))}
      />
    </div>
  );
}
