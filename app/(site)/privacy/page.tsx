import type { Metadata } from "next";
import { KV } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "개인정보처리방침" };

export default function Privacy() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">개인정보처리방침</h1>
      <p className="mt-3 mb-8 text-muted">시행일 2026년 11월 23일</p>
      <KV
        rows={[
          ["수집 항목", "이름, 이메일, 연락처(선택), 업종, 문의 내용"],
          ["수집 방법", "문의 페이지의 문의 폼"],
          ["이용 목적", "문의 답변, 견적 안내, 계약 진행"],
          [
            "보관 기간",
            "문의 처리 완료 후 1년. 계약을 맺은 경우 계약·결제 기록은 관련 법령에 따라 5년 보관합니다.",
          ],
          [
            "처리 위탁",
            "Google(메일 수신·발송), Vercel(홈페이지 호스팅). 두 곳 모두 서버가 국외에 있습니다.",
          ],
          ["제3자 제공", "법령에 따른 경우 외에는 제공하지 않습니다."],
          [
            "이용자의 권리",
            "언제든 본인 정보의 열람, 정정, 삭제를 요청할 수 있습니다. 아래 연락처로 요청하시면 지체 없이 처리합니다.",
          ],
          ["쿠키", "로그인이나 광고 목적의 쿠키를 쓰지 않습니다."],
          ["개인정보 보호책임자", `${site.business.owner} (${site.email})`],
        ]}
      />
    </div>
  );
}
