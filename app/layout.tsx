import type { Metadata } from "next";
import { site } from "@/lib/site";
// 글자 범위별로 쪼갠 파일이라 화면에 쓰인 글자 묶음만 내려받는다
// 본문·제목 글꼴: 원티드 산스(SIL OFL 1.1, 상업적 사용 가능). 글자 범위별로 쪼개져 쓰인 묶음만 내려받는다
import "wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.css";
import "./globals.css";
import { fontVars } from "./fonts";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.nameKo} | 가게·회사 월 관리형 홈페이지`, template: `%s | ${site.nameKo}` },
  description: site.description,
};

// 헤더·푸터는 (site)/layout.tsx에 있다. 데모(/demo)는 고객 사이트처럼 보여야 해서 여기엔 두지 않는다.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`h-full antialiased ${fontVars}`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
