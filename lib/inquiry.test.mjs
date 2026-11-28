import assert from "node:assert/strict";
import { test } from "node:test";
import { keepFields, parseInquiry, subject } from "./inquiry.ts";

const allowed = { samples: ["cafe"], plans: ["라이트"] };
const parse = (o) => parseInquiry((k) => o[k] ?? null, allowed);
const base = { kind: "견적", name: "홍길동", email: "a@b.co", business: "카페", agree: "on" };

test("정상 견적 문의", () => {
  const r = parse({ ...base, sample: "cafe", plan: "라이트" });
  assert.equal(r.ok, true);
  assert.equal(subject(r.data), "[견적] 카페 / 홍길동");
});

test("허용 목록에 없는 샘플·플랜은 버린다", () => {
  const r = parse({ ...base, sample: "../etc", plan: "무료" });
  assert.equal(r.data.sample, "");
  assert.equal(r.data.plan, "");
});

test("제목에 줄바꿈이 들어가지 않는다", () => {
  const r = parse({ ...base, name: "홍\r\nBcc: x@y.z" });
  assert.ok(!subject(r.data).includes("\n"));
});

test("필수값·동의·이메일 형식", () => {
  assert.equal(parse({ ...base, email: "nope" }).ok, false);
  assert.equal(parse({ ...base, email: "" }).ok, false); // 연락 수단 없음
  assert.equal(parse({ ...base, email: "", phone: "010-1234-5678" }).ok, true);
  assert.equal(parse({ ...base, agree: undefined }).ok, false);
  assert.equal(parse({ ...base, business: "" }).ok, false);
  assert.equal(parse({ ...base, kind: "문의", business: "" }).ok, false); // 내용 없음
  assert.equal(parse({ ...base, kind: "문의", message: "안녕하세요" }).ok, true);
});

test("숨김 필드가 채워지면 스팸", () => {
  assert.equal(parse({ ...base, website: "http://spam" }).spam, true);
});

test("검증 실패 이유별 문구", () => {
  assert.equal(parse({ ...base, name: "" }).error, "이름을 적어 주세요.");
  assert.equal(parse({ ...base, email: "nope" }).error, "이메일 주소를 확인해 주세요.");
  assert.equal(parse({ ...base, email: "", phone: "공일공" }).error, "연락처는 숫자와 하이픈으로 적어 주세요.");
  assert.equal(parse({ ...base, business: "" }).error, "업종을 적어 주세요.");
  assert.equal(parse({ ...base, agree: undefined }).error, "개인정보 수집·이용에 동의해 주세요.");
});

test("실패 때 되돌려 줄 입력값: 쓴 값은 남기고 숨김 필드·동의는 뺀다", () => {
  const form = { ...base, phone: "공일공", message: "줄1\n줄2", plan: "라이트", website: "x", agree: "on" };
  const kept = keepFields((k) => form[k] ?? null);
  assert.deepEqual(kept, {
    name: "홍길동",
    email: "a@b.co",
    phone: "공일공",
    message: "줄1\n줄2",
    business: "카페",
    plan: "라이트",
  });
});

test("되돌려 줄 입력값: 지운 칸은 빈 값으로 남고 길이는 자른다", () => {
  const form = { business: "", name: "가".repeat(500), message: "나".repeat(5000) };
  const kept = keepFields((k) => form[k] ?? null);
  assert.equal(kept.business, "");
  assert.equal(kept.name.length, 100);
  assert.equal(kept.message.length, 2000);
});
