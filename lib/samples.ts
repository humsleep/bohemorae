import { existsSync } from "node:fs";
import { join } from "node:path";
import { plans } from "@/lib/pricing";
import type { ThemeName } from "@/lib/themes";
import cafe from "@/content/samples/cafe";
import hair from "@/content/samples/hair";
import academy from "@/content/samples/academy";
import company from "@/content/samples/company";
import freelancer from "@/content/samples/freelancer";
import restaurant from "@/content/samples/restaurant";
import pilates from "@/content/samples/pilates";
import interior from "@/content/samples/interior";
import nail from "@/content/samples/nail";
import tax from "@/content/samples/tax";
import dental from "@/content/samples/dental";
import pension from "@/content/samples/pension";

export type SampleSection =
  | { kind: "about"; title: string; body: string }
  | { kind: "prices"; title: string; groups: { name: string; items: [string, string][] }[] }
  | { kind: "cards"; title: string; items: [string, string][] }
  | { kind: "reviews"; title: string; items: [string, string][] }
  | { kind: "info"; title: string; hours: [string, string][]; address: string }
  | { kind: "contact"; title: string; body: string; cta: string };

export const categories = ["매장", "교육", "회사", "전문직", "개인"] as const;
export type Category = (typeof categories)[number];

// 콘텐츠 파일 하나 = 사이트 하나. 고객 사이트도 같은 형식으로 만든다.
export type Sample = {
  slug: string;
  type: string; // 업종
  category: Category; // 목록 필터
  plan: 0 | 1 | 2; // 라이트, 스탠다드, 프로
  theme: ThemeName;
  name: string; // 가상의 상호
  tagline: string;
  intro: string; // 샘플 소개 페이지 설명
  phone: string;
  cta: string;
  stats?: [string, string][]; // 첫 화면 아래 숫자 띠
  sections: SampleSection[];
  photos?: { hero?: string; gallery: string[] }; // 아래에서 파일이 있는 것만 자동으로 채운다
};

// 샘플 추가: content/samples에 파일을 만들고 아래 배열에 한 줄 추가
const list: Sample[] = [cafe, hair, restaurant, academy, company, freelancer,
  pilates, interior, nail, tax, dental, pension,
];

// 사진은 public/samples/<slug>/ 에 hero.jpg, 1.jpg, 2.jpg, 3.jpg 로 넣는다. 있는 파일만 화면에 나온다.
// 프롬프트와 규격은 content/samples/PHOTOS.md
const photo = (slug: string, name: string) =>
  existsSync(join(process.cwd(), "public/samples", slug, name)) ? `/samples/${slug}/${name}` : undefined;

export const samples: Sample[] = list.map((s) => ({
  ...s,
  photos: {
    hero: photo(s.slug, "hero.jpg"),
    gallery: ["1.jpg", "2.jpg", "3.jpg"].map((n) => photo(s.slug, n)).filter((x) => x !== undefined),
  },
}));

export const getSample = (slug: string) => samples.find((s) => s.slug === slug);

export const samplePrice = (s: Sample) =>
  `구축 ${plans[s.plan].build} + 월 ${plans[s.plan].monthly}`;
