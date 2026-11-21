import Link from "next/link";
import { site } from "@/lib/site";

const columns = [
  { title: "서비스", links: [["샘플", "/samples"], ["요금", "/pricing"], ["문의", "/contact"]] },
  { title: "스튜디오", links: [["소개", "/about"], ["출시 앱", "/apps"]] },
  { title: "약관", links: [["이용약관·환불 규정", "/terms"], ["개인정보처리방침", "/privacy"]] },
];

export function Footer() {
  const b = site.business;
  return (
    <footer className="border-t border-line text-sm text-muted">
      <div className="mx-auto grid max-w-page gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="text-lg font-semibold text-ink">{site.nameKo} <span className="text-sm font-medium text-muted">{site.name}</span></p>
          <p className="mt-3 max-w-xs">{site.description}</p>
          <a href={`mailto:${site.email}`} className="mt-4 inline-block text-ink underline underline-offset-4">
            {site.email}
          </a>
        </div>
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="font-medium text-ink">{c.title}</p>
            <ul className="mt-2">
              {c.links.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="inline-block py-2 hover:text-ink">{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line">
        {/* 모바일 하단 고정 문의 바(MobileCta)에 가리지 않게 여백 */}
        <p className="mx-auto max-w-page px-4 pt-6 pb-28 text-xs md:pb-6">
          상호 {b.company} · 대표 {b.owner} · 사업자등록번호 {b.regNo} · 통신판매업 {b.mailOrderNo}
          <br />
          {b.address} · {site.email} · © {site.name}
        </p>
      </div>
    </footer>
  );
}
