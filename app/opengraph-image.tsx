import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} | 월 관리형 홈페이지`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// shortcut: 한글 글꼴은 빌드 때 next/og가 내려받는다. 빌드가 오프라인이면 글자가 깨지니 그때는 ttf를 저장소에 넣는다.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#1c1917",
          color: "#fafaf9",
        }}
      >
        <div style={{ fontSize: 40, color: "#e0b25c" }}>{site.nameKo}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.2 }}>가게·회사 홈페이지,</div>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.2 }}>구축 19만원부터</div>
          <div style={{ fontSize: 40, marginTop: 28, opacity: 0.85 }}>월 2.5만원에 대신 고쳐드립니다</div>
        </div>
      </div>
    ),
    size,
  );
}
