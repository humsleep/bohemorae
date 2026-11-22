import type { Sample } from "@/lib/samples";

type Link = NonNullable<Sample["links"]>[number];

// 개인 사이트용 연락 아이콘. 아이콘 라이브러리를 들이지 않으려고 선 아이콘 다섯 개만 직접 그린다(24 그리드, 1.75 선)
const icons: Record<Link["kind"], React.ReactNode> = {
  email: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </>
  ),
  youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="m10 9 5 3-5 3z" fill="currentColor" />
    </>
  ),
  kakao: <path d="M12 4C7 4 3 7.1 3 11c0 2.5 1.7 4.7 4.2 6L6.5 20l3.6-2.2c.6.1 1.2.2 1.9.2 5 0 9-3.1 9-7s-4-7-9-7z" />,
  blog: (
    <>
      <path d="M4 20h4L19 9l-4-4L4 16z" />
      <path d="m13 7 4 4" />
    </>
  ),
};

export function SocialLinks({ links, labeled, className = "" }: { links: Link[]; labeled?: boolean; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${labeled ? "justify-center" : ""} ${className}`}>
      {links.map((l) => (
        <li key={l.kind}>
          <a
            href={l.href}
            aria-label={labeled ? undefined : `${l.label} (${l.handle})`}
            className={`flex min-h-11 items-center gap-2 rounded-full border border-current/25 transition-transform hover:-translate-y-0.5 motion-reduce:transition-none ${labeled ? "px-4 text-sm font-semibold" : "w-11 justify-center"}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="size-5 shrink-0" aria-hidden>
              {icons[l.kind]}
            </svg>
            {labeled && (
              <span>
                {l.label} <span className="font-normal opacity-70">{l.handle}</span>
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
