import type { Metadata } from "next";
import Link from "next/link";
import { apps } from "@/lib/apps";

export const metadata: Metadata = {
  title: "앱",
  description: "Bohemorae가 직접 만들어 앱스토어에 출시한 앱입니다.",
};

export default function Apps() {
  return (
    <div className="mx-auto max-w-page px-4 py-14">
      <h1 className="text-4xl font-bold md:text-5xl">앱</h1>
      <p className="mt-3 text-muted">iOS 4종 출시, Android 개발 중.</p>
      <ul className="mt-8 border-t-2 border-ink">
        {apps.map((a) => (
          <li key={a.name} className="border-b border-line py-5">
            <p className="text-sm text-muted">
              {a.category} · {a.status}
            </p>
            <h2 className="mt-1 text-xl font-semibold">{a.name}</h2>
            <p className="mt-1 text-muted">{a.desc}</p>
            {a.note && <p className="mt-3 text-sm font-medium text-accent">{a.note}</p>}
            {a.url && (
              <a href={a.url} className="mt-3 inline-block font-medium text-brand underline">
                App Store에서 보기
              </a>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-10">
        이 앱들을 만든 개발자가 홈페이지도 직접 만듭니다.{" "}
        <Link href="/samples" className="font-medium text-brand underline">
          홈페이지 샘플 보기
        </Link>
      </p>
    </div>
  );
}
