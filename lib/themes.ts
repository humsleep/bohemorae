import type { CSSProperties } from "react";

// 테마 = 디자인 토큰 덮어쓰기 묶음. 공통 섹션은 토큰만 쓰므로 여기 값만 바꾸면 인상이 달라진다.
const serif = '"Noto Serif KR", "Nanum Myeongjo", "AppleMyungjo", serif';

const defs = {
  warm: {
    label: "따뜻한",
    center: true,
    vars: {
      "--color-brand": "#7a4b2a",
      "--color-accent": "#b5651d",
      "--color-ink": "#2b2118",
      "--color-muted": "#75685c",
      "--color-line": "#e8dfd2",
      "--color-surface": "#f7f1e8",
      "--color-paper": "#fffdf9",
      "--font-display": serif,
    },
  },
  mono: {
    label: "모노",
    center: false,
    vars: {
      "--color-brand": "#111111",
      "--color-accent": "#8a6d3b",
      "--color-ink": "#111111",
      "--color-muted": "#666666",
      "--color-line": "#dddddd",
      "--color-surface": "#f2f2f2",
      "--color-paper": "#ffffff",
      "--radius-md": "0",
      "--radius-xl": "0",
    },
  },
  hearty: {
    label: "든든한",
    center: false,
    vars: {
      "--color-brand": "#a8322a",
      "--color-accent": "#a8322a",
      "--color-ink": "#241a17",
      "--color-muted": "#6f625d",
      "--color-line": "#eadfd8",
      "--color-surface": "#faf4ee",
      "--color-paper": "#ffffff",
      "--font-display": serif,
    },
  },
  bright: {
    label: "밝은",
    center: true,
    vars: {
      "--color-brand": "#2456c9",
      "--color-accent": "#e0862a",
      "--color-ink": "#172033",
      "--color-muted": "#5b6577",
      "--color-line": "#dde4f0",
      "--color-surface": "#eef3fc",
      "--color-paper": "#ffffff",
      "--radius-md": "999px",
      "--radius-xl": "1.25rem",
    },
  },
  navy: {
    label: "단정한",
    center: false,
    vars: {
      "--color-brand": "#14305a",
      "--color-accent": "#14305a",
      "--color-ink": "#101826",
      "--color-muted": "#5a6473",
      "--color-line": "#d9dee6",
      "--color-surface": "#f3f5f8",
      "--color-paper": "#ffffff",
      "--radius-md": "0.25rem",
      "--radius-xl": "0.25rem",
    },
  },
  ink: {
    label: "차분한",
    center: false,
    vars: {
      "--color-brand": "#1d4a4a",
      "--color-accent": "#9a6b3f",
      "--color-ink": "#1c2323",
      "--color-muted": "#616b6b",
      "--color-line": "#dfe3df",
      "--color-surface": "#f1f3ef",
      "--color-paper": "#fbfbf8",
      "--font-display": serif,
    },
  },
};

export type ThemeName = keyof typeof defs;

export const themes: Record<ThemeName, { label: string; center: boolean; vars: Record<string, string> }> = defs;

// 사이트 본체가 어두운 바탕이라, 테마가 따로 정하지 않는 값은 밝은 바탕용으로 되돌린다
export const themeStyle = (name: ThemeName) =>
  ({ "--color-brand-ink": "#ffffff", colorScheme: "light", ...themes[name].vars }) as CSSProperties;
