"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { domainOptions } from "@/lib/inquiry";
import { submitInquiry } from "./actions";

const input =
  "mt-1 block w-full rounded-md border border-line bg-paper px-3 py-2 focus:border-brand focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      {children}
    </label>
  );
}

export function ContactForm({
  samples,
  plans,
  defaultSample,
}: {
  samples: { slug: string; label: string }[];
  plans: string[];
  defaultSample: string;
}) {
  const [state, action, pending] = useActionState(submitInquiry, { ok: false, message: "" });
  const [kind, setKind] = useState("견적");

  if (state.ok)
    return (
      <p role="status" className="rounded-xl border border-brand bg-surface p-5 font-semibold">
        {state.message}
      </p>
    );

  return (
    <form action={action} className="space-y-5">
      <fieldset className="flex gap-2">
        <legend className="mb-2 text-sm font-semibold">문의 유형</legend>
        {[
          ["견적", "견적 문의"],
          ["문의", "기타 문의"],
        ].map(([value, label]) => (
          <label
            key={value}
            className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold ${
              kind === value ? "border-brand bg-brand text-brand-ink" : "border-line"
            }`}
          >
            <input
              type="radio"
              name="kind"
              value={value}
              checked={kind === value}
              onChange={() => setKind(value)}
              className="sr-only"
            />
            {label}
          </label>
        ))}
      </fieldset>

      {kind === "견적" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="업종 *">
            <input name="business" required maxLength={40} placeholder="예: 카페, 학원" className={input} />
          </Field>
          <Field label="원하는 샘플">
            <select name="sample" defaultValue={defaultSample} className={input}>
              <option value="">아직 못 골랐어요</option>
              {samples.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="희망 플랜">
            <select name="plan" defaultValue="" className={input}>
              <option value="">상담 후 결정</option>
              {plans.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </Field>
          <Field label="도메인 보유 여부">
            <select name="domain" defaultValue="" className={input}>
              <option value="">선택</option>
              {domainOptions.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </Field>
          <Field label="희망 오픈일">
            <input name="openDate" type="date" className={input} />
          </Field>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="이름 *">
          <input name="name" required maxLength={40} autoComplete="name" className={input} />
        </Field>
        <Field label="이메일 *">
          <input name="email" type="email" required maxLength={100} autoComplete="email" className={input} />
        </Field>
        <Field label="연락처">
          <input name="phone" type="tel" maxLength={20} autoComplete="tel" placeholder="010-0000-0000" className={input} />
        </Field>
      </div>

      <Field label={kind === "견적" ? "남기실 말" : "문의 내용 *"}>
        <textarea name="message" rows={5} maxLength={2000} required={kind === "문의"} className={input} />
      </Field>

      {/* 스팸 방지용 숨김 필드. 사람은 채우지 않는다 */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" name="agree" required className="mt-1" />
        <span>
          문의 답변을 위한 개인정보(이름, 이메일, 연락처) 수집·이용에 동의합니다.{" "}
          <Link href="/privacy" className="underline">
            개인정보처리방침
          </Link>
        </span>
      </label>

      {state.message && (
        <p role="alert" className="font-semibold text-accent">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-brand px-6 py-3 font-semibold text-brand-ink hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "보내는 중..." : "문의 보내기"}
      </button>
    </form>
  );
}
