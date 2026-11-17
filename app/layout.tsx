import type { Metadata } from "next";
import { site } from "@/lib/site";
// 글자 범위별로 쪼갠 파일이라 화면에 쓰인 글자 묶음만 내려받는다
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | 월 관리형 홈페이지`, template: `%s | ${site.name}` },
  description: site.description,
};

// 헤더·푸터는 (site)/layout.tsx에 있다. 데모(/demo)는 고객 사이트처럼 보여야 해서 여기엔 두지 않는다.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
