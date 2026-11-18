import type { CSSProperties } from "react";

// 테마 = 디자인 토큰 덮어쓰기 묶음. 공통 섹션은 토큰만 쓰므로 여기 값만 바꾸면 인상이 달라진다.
// 제목 글꼴은 app/fonts.ts에서 불러온 웹글꼴. hero는 첫 화면 구성.
export type Hero = "center" | "left" | "huge" | "bold" | "split";

const defs = {
  warm: {
    label: "따뜻한",
    hero: "center" as Hero,
    vars: {
      "--color-brand": "#3d2c20",
      "--color-accent": "#9a5f33",
      "--color-ink": "#2a211a",
      "--color-muted": "#7a6c5f",
      "--color-line": "#e6dccd",
      "--color-surface": "#f3ece1",
      "--color-paper": "#fbf8f3",
      "--font-display": 'var(--font-gowun), serif',
    },
  },
  mono: {
    label: "모노",
    hero: "huge" as Hero,
    vars: {
      "--color-brand": "#111111",
      "--color-accent": "#111111",
      "--color-ink": "#111111",
      "--color-muted": "#666666",
      "--color-line": "#dddddd",
      "--color-surface": "#f4f4f4",
      "--color-paper": "#ffffff",
      "--radius-md": "0",
      "--radius-xl": "0",
      "--font-display": 'var(--font-blackhan), sans-serif',
    },
  },
  hearty: {
    label: "든든한",
    hero: "bold" as Hero,
    vars: {
      "--color-brand": "#7c2d1e",
      "--color-accent": "#7c2d1e",
      "--color-ink": "#231a16",
      "--color-muted": "#6e625c",
      "--color-line": "#e7ddd3",
      "--color-surface": "#f6efe6",
      "--color-paper": "#fffdfa",
      "--font-display": 'var(--font-myeongjo), serif',
    },
  },
  bright: {
    label: "밝은",
    hero: "center" as Hero,
    vars: {
      "--color-brand": "#1f5eff",
      "--color-accent": "#1f5eff",
      "--color-ink": "#0f172a",
      "--color-muted": "#566178",
      "--color-line": "#dbe4f3",
      "--color-surface": "#eef4ff",
      "--color-paper": "#ffffff",
      "--radius-md": "999px",
      "--radius-xl": "1.25rem",
      "--font-display": 'var(--font-sans)',
    },
  },
  navy: {
    label: "단정한",
    hero: "split" as Hero,
    vars: {
      "--color-brand": "#0f2747",
      "--color-accent": "#3b6ea8",
      "--color-ink": "#0d1522",
      "--color-muted": "#5a6473",
      "--color-line": "#d9dee6",
      "--color-surface": "#f3f5f8",
      "--color-paper": "#ffffff",
      "--radius-md": "0.25rem",
      "--radius-xl": "0.25rem",
      "--font-display": 'var(--font-plex), sans-serif',
    },
  },
  ink: {
    label: "차분한",
    hero: "left" as Hero,
    vars: {
      "--color-brand": "#24423f",
      "--color-accent": "#8a6a45",
      "--color-ink": "#1b2221",
      "--color-muted": "#616b6b",
      "--color-line": "#dfe3df",
      "--color-surface": "#eef1ec",
      "--color-paper": "#fafbf8",
      "--font-display": 'var(--font-hahmlet), serif',
    },
  },
};

export type ThemeName = keyof typeof defs;

export const themes: Record<ThemeName, { label: string; hero: Hero; vars: Record<string, string> }> = defs;

// 테마가 따로 정하지 않는 값은 샘플용 기본값으로 되돌린다
export const themeStyle = (name: ThemeName) =>
  ({ "--color-brand-ink": "#ffffff", colorScheme: "light", ...themes[name].vars }) as CSSProperties;
