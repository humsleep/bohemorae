import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  const b = site.business;
  return (
    <footer className="border-t border-line bg-surface text-sm text-muted">
      <div className="mx-auto flex max-w-page flex-col gap-3 px-4 py-8">
        <p className="font-semibold text-ink">{site.name}</p>
        <p>
          상호 {b.company} · 대표 {b.owner} · 사업자등록번호 {b.regNo}
          <br />
          문의 <a href={`mailto:${site.email}`} className="underline">{site.email}</a>
        </p>
        <p className="flex gap-4">
          <Link href="/terms" className="hover:text-ink">이용약관·환불 규정</Link>
          <Link href="/privacy" className="hover:text-ink">개인정보처리방침</Link>
        </p>
        <p>© {site.name}</p>
      </div>
    </footer>
  );
}
