import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { apps } from "@/lib/apps";

export const metadata: Metadata = {
  title: "앱",
  description: "보헤모레가 직접 만들어 앱스토어에 출시한 앱입니다.",
};

export default function Apps() {
  return (
    <div className="mx-auto max-w-page px-4 py-14">
      <h1 className="text-4xl font-bold md:text-5xl">앱</h1>
      <p className="mt-3 text-muted">
        기획, 디자인, 개발, 출시까지 혼자 해 낸 앱 {apps.length}개입니다. 홈페이지도 같은 손으로 만듭니다.
      </p>
      <ul className="mt-10 space-y-16">
        {apps.map((a) => (
          <li key={a.slug} className="grid gap-6 md:grid-cols-[1fr_1.4fr] md:items-center md:gap-12">
            <div>
              <div className="flex items-center gap-4">
                <Image
                  src={a.icon}
                  alt={`${a.name} 아이콘`}
                  width={72}
                  height={72}
                  className="size-16 rounded-[22%] border border-line md:size-[72px]"
                />
                <div>
                  <p className="text-sm text-muted">
                    {a.category} · {a.status}
                  </p>
                  <h2 className="mt-0.5 text-2xl font-bold">{a.name}</h2>
                </div>
              </div>
              <p className="mt-4 text-lg text-muted">{a.desc}</p>
              {a.note && <p className="mt-2 text-sm font-medium">{a.note}</p>}
              <a
                href={a.url}
                className="mt-5 inline-flex min-h-11 items-center rounded-full border border-ink px-5 font-medium hover:bg-ink hover:text-paper"
              >
                App Store에서 보기
              </a>
            </div>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {a.shots.map((src, i) => (
                <div key={src} className="relative aspect-[598/1300] overflow-hidden rounded-xl border border-line bg-surface md:rounded-2xl">
                  <Image
                    src={src}
                    alt={`${a.name} 앱 화면 ${i + 1}`}
                    fill
                    sizes="(min-width: 768px) 200px, 31vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-16">
        이 앱들을 만든 개발자가 홈페이지도 직접 만듭니다.{" "}
        <Link href="/samples" className="font-medium text-brand underline">
          홈페이지 샘플 보기
        </Link>
      </p>
    </div>
  );
}
