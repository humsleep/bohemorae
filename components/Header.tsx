import Link from "next/link";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-page items-center gap-3 px-4">
        <Link href="/" className="mr-auto text-lg font-bold tracking-tight">
          {site.name}
        </Link>
        <nav aria-label="주 메뉴" className="flex items-center text-sm">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-2 py-2 text-muted hover:text-ink sm:px-3"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="rounded-md bg-brand px-3 py-2 text-sm font-semibold text-brand-ink hover:opacity-90"
        >
          문의하기
        </Link>
      </div>
    </header>
  );
}
