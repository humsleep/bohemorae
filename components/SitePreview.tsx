import { SampleSite } from "@/components/SampleSite";
import type { Sample } from "@/lib/samples";

// 샘플 사이트를 실제 코드 그대로 1100px 폭으로 그린 뒤 줄여서 보여 준다. 그림 파일이 아니라서 샘플을 고치면 같이 바뀐다.
// 크기는 CSS 변수 --z(배율)로 정한다. 예: className="[--z:0.3] md:[--z:0.6]"
export function SitePreview({ sample, className = "" }: { sample: Sample; className?: string }) {
  return (
    <div
      inert
      aria-hidden
      className={`h-[calc(720px*var(--z))] w-[calc(1100px*var(--z))] shrink-0 overflow-hidden rounded-xl border border-line bg-surface shadow-[0_8px_24px_rgba(0,0,0,0.06)] ${className}`}
    >
      <div className="w-[1100px] [zoom:var(--z)]">
        <SampleSite sample={sample} preview />
      </div>
    </div>
  );
}
