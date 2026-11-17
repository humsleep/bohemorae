import { plans } from "@/lib/pricing";
import type { ThemeName } from "@/lib/themes";
import cafe from "@/content/samples/cafe";
import hair from "@/content/samples/hair";
import academy from "@/content/samples/academy";
import company from "@/content/samples/company";
import freelancer from "@/content/samples/freelancer";
import restaurant from "@/content/samples/restaurant";

export type SampleSection =
  | { kind: "about"; title: string; body: string }
  | { kind: "prices"; title: string; groups: { name: string; items: [string, string][] }[] }
  | { kind: "cards"; title: string; items: [string, string][] }
  | { kind: "reviews"; title: string; items: [string, string][] }
  | { kind: "info"; title: string; hours: [string, string][]; address: string }
  | { kind: "contact"; title: string; body: string; cta: string };

export const categories = ["매장", "교육", "회사", "개인"] as const;
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
  sections: SampleSection[];
};

// 샘플 추가: content/samples에 파일을 만들고 아래 배열에 한 줄 추가
export const samples: Sample[] = [cafe, hair, restaurant, academy, company, freelancer];

export const getSample = (slug: string) => samples.find((s) => s.slug === slug);

export const samplePrice = (s: Sample) =>
  `구축 ${plans[s.plan].build} + 월 ${plans[s.plan].monthly}`;
