import Link from "next/link";

// 2일차에 기획서 4장 '홈' 섹션 8개로 채운다. 지금은 히어로만.
export default function Home() {
  return (
    <section className="mx-auto max-w-page px-4 py-20 sm:py-28">
      <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
        가게·회사 홈페이지,
        <br />
        구축 19만원부터.
      </h1>
      <p className="mt-4 text-lg text-muted">
        월 2.5만원에 대신 고쳐드립니다. 가격과 해지 조건은 전부 공개합니다.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/samples"
          className="rounded-md bg-brand px-5 py-3 font-semibold text-brand-ink hover:opacity-90"
        >
          샘플 보기
        </Link>
        <Link
          href="/contact"
          className="rounded-md border border-line px-5 py-3 font-semibold hover:bg-surface"
        >
          문의하기
        </Link>
      </div>
    </section>
  );
}
