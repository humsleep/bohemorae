import type { Metadata } from "next";
import { site } from "@/lib/site";
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
