"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

// 모바일 하단 고정 문의 바. 문의 페이지에서는 폼과 겹치므로 숨긴다
export function MobileCta() {
  if (usePathname() === "/contact") return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-paper/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <div className="flex gap-2">
        {site.kakaoChannelUrl ? (
          <a
            href={site.kakaoChannelUrl}
            className="flex min-h-12 flex-1 items-center justify-center rounded-full bg-[#fee500] font-medium text-[#191919]"
          >
            카톡 문의
          </a>
        ) : (
          <Link
            href="/samples"
            className="flex min-h-12 flex-1 items-center justify-center rounded-full border border-line bg-surface font-medium"
          >
            샘플 보기
          </Link>
        )}
        <Link href="/contact" className="flex min-h-12 flex-[1.4] items-center justify-center rounded-full bg-ink font-medium text-paper">
          무료 견적 받기
        </Link>
      </div>
    </div>
  );
}
