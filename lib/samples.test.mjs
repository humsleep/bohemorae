// 샘플 콘텐츠 무결성 검사. lib/samples.ts는 @/ 별칭을 써서 node로 바로 못 불러오므로 content/samples/*.ts를 직접 읽는다
import assert from "node:assert/strict";
import { existsSync, readdirSync } from "node:fs";
import { test } from "node:test";

const dir = new URL("../content/samples/", import.meta.url);
const files = readdirSync(dir).filter((f) => f.endsWith(".ts"));
const samples = await Promise.all(
  files.map(async (f) => ({ file: f.replace(/\.ts$/, ""), s: (await import(new URL(f, dir))).default })),
);

test("샘플 파일이 있다", () => {
  assert.ok(samples.length >= 15, `샘플 ${samples.length}개`);
});

test("slug는 파일 이름과 같고 겹치지 않는다", () => {
  for (const { file, s } of samples) assert.equal(s.slug, file);
  const slugs = samples.map(({ s }) => s.slug);
  assert.equal(new Set(slugs).size, slugs.length);
});

test("필수 필드와 플랜 범위", () => {
  const categories = ["매장", "교육", "회사", "전문직", "개인"];
  for (const { s } of samples) {
    for (const k of ["type", "theme", "name", "tagline", "intro", "phone", "cta"])
      assert.ok(typeof s[k] === "string" && s[k].trim(), `${s.slug}.${k}`);
    assert.ok(categories.includes(s.category), `${s.slug}.category`);
    assert.ok([0, 1, 2].includes(s.plan), `${s.slug}.plan = ${s.plan}`);
    assert.ok(Array.isArray(s.sections) && s.sections.length > 0, `${s.slug}.sections`);
    for (const sec of s.sections) assert.ok(sec.kind && sec.title, `${s.slug} 섹션 ${sec.kind}`);
  }
});

test("사진 파일이 모두 있다", () => {
  for (const { s } of samples)
    for (const n of ["hero.jpg", "1.jpg", "2.jpg", "3.jpg"])
      assert.ok(existsSync(new URL(`../public/samples/${s.slug}/${n}`, import.meta.url)), `${s.slug}/${n}`);
});
