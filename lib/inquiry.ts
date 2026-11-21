// 문의 폼 입력 검증. 외부 입력은 전부 여기를 거친다. (node --test로 검사: lib/inquiry.test.mjs)

export const domainOptions = ["있음", "없음", "모름"];

export type Inquiry = {
  kind: "견적" | "문의";
  name: string;
  email: string;
  phone: string;
  message: string;
  business: string;
  sample: string;
  plan: string;
  domain: string;
  openDate: string;
};

type Result =
  | { ok: true; data: Inquiry }
  | { ok: false; spam?: true; error: string };

// 한 줄 필드: 줄바꿈 제거(메일 제목에 들어가므로)
const line = (v: string | null, max: number) =>
  (v ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

const oneOf = (v: string, allowed: string[]) => (allowed.includes(v) ? v : "");

export function parseInquiry(
  get: (key: string) => string | null,
  allowed: { samples: string[]; plans: string[] },
): Result {
  // 숨김 필드가 채워져 있으면 봇
  if (get("website")) return { ok: false, spam: true, error: "" };

  const kind = get("kind") === "문의" ? "문의" : "견적";
  const data: Inquiry = {
    kind,
    name: line(get("name"), 40),
    email: line(get("email"), 100),
    phone: line(get("phone"), 20),
    message: (get("message") ?? "").trim().slice(0, 2000),
    business: line(get("business"), 40),
    sample: oneOf(line(get("sample"), 40), allowed.samples),
    plan: oneOf(line(get("plan"), 20), allowed.plans),
    domain: oneOf(line(get("domain"), 10), domainOptions),
    openDate: line(get("openDate"), 20),
  };

  if (!data.name) return { ok: false, error: "이름을 적어 주세요." };
  // 소상공인은 전화가 편하다: 연락처와 이메일 중 하나만 있으면 된다
  if (!data.email && !data.phone) return { ok: false, error: "답변받을 연락처나 이메일 중 하나를 적어 주세요." };
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return { ok: false, error: "이메일 주소를 확인해 주세요." };
  if (data.phone && !/^[0-9+\- ]{7,20}$/.test(data.phone))
    return { ok: false, error: "연락처는 숫자와 하이픈으로 적어 주세요." };
  if (kind === "견적" && !data.business) return { ok: false, error: "업종을 적어 주세요." };
  if (kind === "문의" && !data.message) return { ok: false, error: "문의 내용을 적어 주세요." };
  if (get("agree") !== "on")
    return { ok: false, error: "개인정보 수집·이용에 동의해 주세요." };

  return { ok: true, data };
}

// Gmail 필터가 머리말([견적]·[문의])로 분류한다
export const subject = (d: Inquiry) =>
  d.kind === "견적" ? `[견적] ${d.business} / ${d.name}` : `[문의] ${d.name}`;

export const body = (d: Inquiry, receipt: string) =>
  [
    `접수번호: ${receipt}`,
    `유형: ${d.kind}`,
    `이름: ${d.name}`,
    `이메일: ${d.email || "-"}`,
    `연락처: ${d.phone || "-"}`,
    ...(d.kind === "견적"
      ? [
          `업종: ${d.business}`,
          `원하는 샘플: ${d.sample || "-"}`,
          `희망 플랜: ${d.plan || "-"}`,
          `도메인 보유: ${d.domain || "-"}`,
          `희망 오픈일: ${d.openDate || "-"}`,
        ]
      : []),
    "",
    d.message || "(내용 없음)",
  ].join("\n");
