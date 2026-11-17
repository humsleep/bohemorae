import assert from "node:assert/strict";
import { test } from "node:test";
import { parseInquiry, subject } from "./inquiry.ts";

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
  assert.equal(parse({ ...base, agree: undefined }).ok, false);
  assert.equal(parse({ ...base, business: "" }).ok, false);
  assert.equal(parse({ ...base, kind: "문의", business: "" }).ok, false); // 내용 없음
  assert.equal(parse({ ...base, kind: "문의", message: "안녕하세요" }).ok, true);
});

test("숨김 필드가 채워지면 스팸", () => {
  assert.equal(parse({ ...base, website: "http://spam" }).spam, true);
});
