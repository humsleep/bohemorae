"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

const noop = () => () => {};

// 샘플 아래 띠. 홈의 미리보기 틀(iframe) 안에서는 숨긴다
export function DemoBar({ slug, text }: { slug: string; text: string }) {
  // 서버에서는 틀 밖으로 그리고, 브라우저에서 틀 안이면 숨긴다
  const framed = useSyncExternalStore(noop, () => window.self !== window.top, () => false);
  if (framed) return null;
  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-max flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-2xl bg-ink/90 px-5 py-2.5 text-center text-sm text-paper shadow-lg backdrop-blur">
      <Link href="/samples" className="opacity-80 hover:opacity-100">
        ← 샘플 목록
      </Link>
      <span>{text}</span>
      <Link href={`/contact?sample=${slug}`} className="font-semibold underline">
        이 디자인으로 시작
      </Link>
    </div>
  );
}
