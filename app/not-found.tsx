import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-page flex-1 px-4 py-24">
        <h1 className="text-3xl font-bold tracking-tight">페이지를 찾을 수 없습니다</h1>
        <p className="mt-4 text-muted">주소가 바뀌었거나 없는 페이지입니다.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="rounded-md bg-brand px-5 py-3 font-semibold text-brand-ink hover:opacity-90">
            홈으로
          </Link>
          <Link href="/samples" className="rounded-md border border-line px-5 py-3 font-semibold hover:bg-surface">
            샘플 보기
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
