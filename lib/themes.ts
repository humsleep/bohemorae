import type { CSSProperties } from "react";

// 테마 = 색·글꼴(vars) + 화면 구성(look). 업종마다 하나씩 있고, 콘텐츠 파일은 그대로 두고 테마만 바꿔도 다른 사이트가 된다.
// 제목 글꼴은 app/fonts.ts에서 불러온 웹글꼴.
export type Look = {
  header: "simple" | "nav" | "center";
  hero: "cover" | "huge" | "split" | "board" | "editorial" | "soft";
  about: "plain" | "big" | "side";
  prices: "list" | "menu" | "rows" | "photo" | "table" | "plans";
  cards: "grid" | "numbered" | "list" | "photo";
  reviews: "grid" | "quote" | "strip";
  info: "table" | "panel";
  gallery: "row" | "mosaic" | "strip" | "none";
};

const defs = {
  warm: {
    label: "따뜻한",
    look: { header: "center", hero: "cover", about: "big", prices: "menu", cards: "grid", reviews: "quote", info: "panel", gallery: "mosaic" } as Look,
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
    look: { header: "simple", hero: "huge", about: "side", prices: "rows", cards: "numbered", reviews: "grid", info: "table", gallery: "strip" } as Look,
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
    label: "짙은",
    look: { header: "simple", hero: "split", about: "plain", prices: "photo", cards: "photo", reviews: "strip", info: "table", gallery: "row" } as Look,
    vars: {
      "--color-brand": "#e0b25c",
      "--color-brand-ink": "#17120e",
      "--color-accent": "#e0b25c",
      "--color-ink": "#f4ece0",
      "--color-muted": "#a89b8b",
      "--color-line": "#3a3028",
      "--color-surface": "#211a15",
      "--color-paper": "#17120e",
      "--font-display": 'var(--font-myeongjo), serif',
    },
  },
  bright: {
    label: "밝은",
    look: { header: "nav", hero: "board", about: "side", prices: "plans", cards: "grid", reviews: "grid", info: "table", gallery: "row" } as Look,
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
    look: { header: "nav", hero: "split", about: "side", prices: "table", cards: "numbered", reviews: "grid", info: "panel", gallery: "row" } as Look,
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
    look: { header: "simple", hero: "editorial", about: "plain", prices: "table", cards: "list", reviews: "quote", info: "table", gallery: "row" } as Look,
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
  soft: {
    label: "부드러운",
    look: { header: "center", hero: "soft", about: "big", prices: "plans", cards: "list", reviews: "strip", info: "table", gallery: "mosaic" } as Look,
    vars: {
      "--color-brand": "#4f6457",
      "--color-accent": "#b07a5a",
      "--color-ink": "#26302b",
      "--color-muted": "#6b756f",
      "--color-line": "#e3e1d8",
      "--color-surface": "#efede5",
      "--color-paper": "#f9f8f3",
      "--radius-md": "999px",
      "--radius-xl": "1.75rem",
      "--font-display": 'var(--font-sans)',
    },
  },
  stone: {
    label: "담백한",
    look: { header: "nav", hero: "cover", about: "side", prices: "table", cards: "numbered", reviews: "quote", info: "panel", gallery: "mosaic" } as Look,
    vars: {
      "--color-brand": "#1c1c1a",
      "--color-accent": "#9c5a3c",
      "--color-ink": "#1c1c1a",
      "--color-muted": "#6f6d67",
      "--color-line": "#dcd9d1",
      "--color-surface": "#ebe9e3",
      "--color-paper": "#f5f4f0",
      "--radius-md": "0",
      "--radius-xl": "0",
      "--font-display": 'var(--font-hahmlet), serif',
    },
  },
  blush: {
    label: "화사한",
    look: { header: "center", hero: "soft", about: "plain", prices: "menu", cards: "grid", reviews: "quote", info: "table", gallery: "row" } as Look,
    vars: {
      "--color-brand": "#8c4a55",
      "--color-accent": "#b9796f",
      "--color-ink": "#33262a",
      "--color-muted": "#7d6c70",
      "--color-line": "#eedfdb",
      "--color-surface": "#f8ece8",
      "--color-paper": "#fdf9f7",
      "--radius-md": "999px",
      "--radius-xl": "1.25rem",
      "--font-display": 'var(--font-gowun), serif',
    },
  },
  trust: {
    label: "믿음직한",
    look: { header: "nav", hero: "editorial", about: "side", prices: "table", cards: "list", reviews: "grid", info: "panel", gallery: "row" } as Look,
    vars: {
      "--color-brand": "#173b33",
      "--color-accent": "#9a7b45",
      "--color-ink": "#14211e",
      "--color-muted": "#5d6966",
      "--color-line": "#dde2df",
      "--color-surface": "#f1f4f2",
      "--color-paper": "#ffffff",
      "--radius-md": "0.125rem",
      "--radius-xl": "0.125rem",
      "--font-display": 'var(--font-hahmlet), serif',
    },
  },
  clinic: {
    label: "깨끗한",
    look: { header: "nav", hero: "split", about: "plain", prices: "table", cards: "grid", reviews: "grid", info: "panel", gallery: "row" } as Look,
    vars: {
      "--color-brand": "#0b6477",
      "--color-accent": "#0b6477",
      "--color-ink": "#0f2a30",
      "--color-muted": "#557077",
      "--color-line": "#d5e6ea",
      "--color-surface": "#eef7f9",
      "--color-paper": "#ffffff",
      "--radius-md": "0.75rem",
      "--radius-xl": "1.25rem",
      "--font-display": 'var(--font-plex), sans-serif',
    },
  },
  forest: {
    label: "숲속",
    look: { header: "center", hero: "cover", about: "big", prices: "table", cards: "photo", reviews: "quote", info: "panel", gallery: "none" } as Look,
    vars: {
      "--color-brand": "#2f4a3a",
      "--color-accent": "#a0763f",
      "--color-ink": "#1f2a23",
      "--color-muted": "#667066",
      "--color-line": "#dedccf",
      "--color-surface": "#edebe0",
      "--color-paper": "#f7f5ed",
      "--font-display": 'var(--font-myeongjo), serif',
    },
  },
};

export type ThemeName = keyof typeof defs;

export const themes: Record<ThemeName, { label: string; look: Look; vars: Record<string, string> }> = defs;

// 테마가 따로 정하지 않는 값은 샘플용 기본값으로 되돌린다
export const themeStyle = (name: ThemeName) =>
  ({ "--color-brand-ink": "#ffffff", colorScheme: "light", ...themes[name].vars }) as CSSProperties;
