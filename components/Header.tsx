import Link from "next/link";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-page items-center gap-2 px-4">
        <Link href="/" className="mr-auto flex min-h-11 items-center text-lg font-semibold">
          {site.nameKo}
          <span className="ml-1.5 hidden text-sm font-medium text-muted sm:inline">{site.name}</span>
        </Link>
        <nav aria-label="주 메뉴" className="flex items-center text-sm">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              // 모바일에서는 문의와 관계가 먼 메뉴를 숨긴다(푸터에 있다)
              className={`min-h-11 items-center px-2 text-muted hover:text-ink sm:px-3 ${item.mobile ? "flex" : "hidden sm:flex"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="hidden min-h-11 items-center rounded-full bg-ink px-5 text-sm font-medium text-paper hover:opacity-90 md:flex"
        >
          무료 견적 받기
        </Link>
      </div>
    </header>
  );
}
