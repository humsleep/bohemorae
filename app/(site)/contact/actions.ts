"use server";

import { randomBytes } from "node:crypto";
import { body, parseInquiry, subject } from "@/lib/inquiry";
import { sendMail } from "@/lib/mail";
import { plans } from "@/lib/pricing";
import { samples } from "@/lib/samples";
import { site } from "@/lib/site";

export type FormState = { ok: boolean; message: string };

// shortcut: 전송 횟수 제한 없음(숨김 필드만), 스팸이 오면 Vercel 방화벽의 rate limit 규칙을 /contact에 건다
export async function submitInquiry(_prev: FormState, form: FormData): Promise<FormState> {
  const parsed = parseInquiry((k) => {
    const v = form.get(k);
    return typeof v === "string" ? v : null;
  }, { samples: samples.map((s) => s.slug), plans: plans.map((p) => p.name) });

  // 봇에게는 성공한 것처럼 보인다
  if (!parsed.ok && parsed.spam) return { ok: true, message: "접수되었습니다." };
  if (!parsed.ok) return { ok: false, message: parsed.error };

  const d = parsed.data;
  const day = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const receipt = `${d.kind === "견적" ? "Q" : "A"}-${day}-${randomBytes(2).toString("hex").toUpperCase()}`;

  try {
    await sendMail({ to: site.email, replyTo: d.email || undefined, subject: subject(d), text: body(d, receipt) });
  } catch (e) {
    console.error("문의 메일 발송 실패", e);
    return {
      ok: false,
      message: `접수에 실패했습니다. 번거로우시겠지만 ${site.email}로 메일을 보내 주세요.`,
    };
  }

  const via = d.email ? "메일" : "연락처";
  // 이메일 없이 연락처만 남기면 자동 회신은 건너뛴다
  // 자동 회신에는 고객이 쓴 본문을 넣지 않는다: 남의 주소로 임의 문구를 보내는 데 악용될 수 있다
  if (d.email) await sendMail({
    to: d.email,
    subject: `[${site.name}] 문의가 접수되었습니다 (${receipt})`,
    text: `${d.name}님, 문의가 접수되었습니다.\n\n접수번호: ${receipt}\n유형: ${d.kind}\n\n영업일 2일 안에 이 메일 주소로 답변드립니다.\n\n${site.name}\n${site.url}`,
  }).catch((e) => console.error("자동 회신 실패", e));

  return { ok: true, message: `접수되었습니다. 접수번호는 ${receipt}입니다. 영업일 2일 안에 ${via}로 답변드립니다.` };
}
