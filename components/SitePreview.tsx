import type { CSSProperties } from "react";
import { SampleSite } from "@/components/SampleSite";
import type { Sample } from "@/lib/samples";

// 샘플 사이트를 브라우저 창 모양 틀 안에 실제 코드 그대로 그린다. 그림 파일이 아니라서 샘플을 고치면 같이 바뀐다.
// 넓은 화면에서는 1100px 폭으로 그린 뒤 zoom으로 줄이고, 좁은 화면에서는 모바일 모습 그대로 보여 준다.
export function SitePreview({ sample, zoom = 0.8, className = "" }: { sample: Sample; zoom?: number; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-line bg-surface ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-raised" />
        <span className="size-2.5 rounded-full bg-raised" />
        <span className="size-2.5 rounded-full bg-raised" />
        <span className="ml-3 text-xs text-muted">
          {sample.type} · {sample.name}
        </span>
      </div>
      <div inert aria-hidden>
        <div style={{ "--z": zoom } as CSSProperties} className="md:w-[1100px] md:[zoom:var(--z)]">
          <SampleSite sample={sample} preview />
        </div>
      </div>
    </div>
  );
}
