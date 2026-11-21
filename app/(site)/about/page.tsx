import type { Metadata } from "next";
import { KV } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "소개",
  description: "보헤모레는 앱과 웹을 직접 만드는 1인 개발 스튜디오입니다.",
};

export default function About() {
  const b = site.business;
  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <h1 className="text-4xl font-bold md:text-5xl">소개</h1>
      <p className="mt-4 text-lg">보헤모레는 앱과 웹을 직접 만드는 1인 개발 스튜디오입니다.</p>

      <h2 className="mt-10 text-xl font-semibold">경력</h2>
      <p className="mt-3 text-muted">
        대기업에서 14년 동안 개발했습니다. 공공·해운·유통·제약 분야의 시스템을 만들었고, 지금은
        앱스토어에 출시한 앱과 고객 홈페이지를 직접 만들고 직접 응대합니다.
      </p>

      <h2 className="mt-10 mb-3 text-xl font-semibold">사업자 정보</h2>
      <KV
        rows={[
          ["상호", b.company],
          ["대표자", b.owner],
          ["사업자등록번호", b.regNo],
          ["통신판매업 신고번호", b.mailOrderNo],
          ["사업장 주소", b.address],
          ["과세 유형", "일반과세자 (세금계산서 발행 가능)"],
          ["연락처", site.email],
        ]}
      />
    </div>
  );
}
