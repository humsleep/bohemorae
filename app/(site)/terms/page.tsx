import type { Metadata } from "next";
import { KV } from "@/components/ui";
import { editScope, terms } from "@/lib/pricing";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "이용약관·환불 규정" };

const h2 = "mt-10 mb-3 text-xl font-bold";

// 조건의 원본은 lib/pricing.ts. 요금 페이지와 약관이 서로 달라지지 않게 같은 데이터를 쓴다.
export default function Terms() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">이용약관·환불 규정</h1>
      <p className="mt-3 text-muted">시행일 2026년 11월 23일</p>

      <h2 className={h2}>1. 서비스</h2>
      <p className="text-muted">
        {site.name}(이하 &quot;회사&quot;)는 홈페이지 제작과 월 관리(호스팅, 수정 대행, 장애 대응)
        서비스를 제공합니다. 플랜별 구성과 금액은 요금 페이지에 적힌 내용을 따르고, 개별 계약서에
        다르게 적은 내용이 있으면 계약서가 우선합니다.
      </p>

      <h2 className={h2}>2. 계약, 결제, 해지, 환불</h2>
      <KV rows={terms} />

      <h2 className={h2}>3. 수정 범위</h2>
      <KV rows={editScope} />

      <h2 className={h2}>4. 고객의 책임</h2>
      <p className="text-muted">
        고객이 제공한 문구, 사진, 상표의 저작권과 내용에 대한 책임은 고객에게 있습니다. 의료, 법률
        등 광고 규정이 있는 업종의 표현도 고객이 확인합니다.
      </p>

      <h2 className={h2}>5. 회사의 책임</h2>
      <p className="text-muted">
        회사는 제작상 오류, 화면 깨짐, 접속 장애를 횟수와 무관하게 무상으로 고칩니다. 검색 순위나
        매출은 보장하지 않습니다. 호스팅 사업자의 장애 등 회사가 통제할 수 없는 사유로 생긴 손해는
        책임지지 않습니다.
      </p>

      <h2 className={h2}>6. 문의</h2>
      <p className="text-muted">{site.email}</p>
    </div>
  );
}
