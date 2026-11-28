"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { domainOptions } from "@/lib/inquiry";
import { site } from "@/lib/site";
import { submitInquiry } from "./actions";

// text-base: 16px 미만 입력칸은 iOS가 포커스할 때 화면을 확대한다
const input =
  "mt-1 block w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-base font-normal focus:border-brand focus:ring-2 focus:ring-brand/30 focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium">
      {label}
      {children}
    </label>
  );
}

export function ContactForm({
  samples,
  plans,
  picked,
  plan,
  business,
}: {
  samples: { slug: string; label: string }[];
  plans: string[];
  picked?: string; // 샘플의 "이 디자인으로 시작"에서 왔을 때 그 샘플
  plan?: string; // 미리 골라 둘 플랜
  business?: string; // 홈 첫 화면에서 넣어 본 가게 이름
}) {
  const [state, action, pending] = useActionState(submitInquiry, { ok: false, message: "" });
  const [kind, setKind] = useState("견적");
  // React 19는 액션 뒤 폼을 비운다. 실패하면 서버가 돌려준 입력값으로 다시 채운다
  const f = state.fields ?? {};

  if (state.ok)
    return (
      <div role="status" className="rounded-lg border border-brand bg-surface p-5">
        <p className="font-medium">{state.message}</p>
        {site.kakaoChannelUrl && (
          <p className="mt-3 text-sm text-muted">
            급하시면{" "}
            <a href={site.kakaoChannelUrl} className="font-medium text-brand underline">
              카카오톡
            </a>
            으로 접수번호를 알려 주세요.
          </p>
        )}
      </div>
    );

  return (
    // key: select는 마운트 뒤 바뀐 defaultValue를 반영하지 않으므로, 되돌려 받은 값이 바뀌면 폼을 새로 그린다
    <form key={JSON.stringify(f)} action={action} className="space-y-5">
      {picked || plan ? (
        <input type="hidden" name="kind" value="견적" />
      ) : (
        <fieldset className="flex gap-2">
          <legend className="mb-2 text-sm font-medium">문의 유형</legend>
          {[
            ["견적", "견적 문의"],
            ["문의", "기타 문의"],
          ].map(([value, label]) => (
            <label
              key={value}
              className={`inline-flex min-h-11 cursor-pointer items-center rounded-full border px-5 text-sm font-medium has-focus-visible:ring-2 has-focus-visible:ring-brand ${
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
      )}

      {kind === "견적" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="상호·업종 *">
            <input name="business" required maxLength={40} defaultValue={f.business ?? business} placeholder="예: 달목 커피, 카페" className={input} />
          </Field>
          {picked ? (
            <input type="hidden" name="sample" value={picked} />
          ) : (
            <Field label="원하는 샘플">
              <select name="sample" defaultValue={f.sample ?? ""} className={input}>
                <option value="">아직 못 골랐어요</option>
                {samples.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.label}
                  </option>
                ))}
              </select>
            </Field>
          )}
          <Field label="희망 플랜">
            <select name="plan" defaultValue={f.plan ?? plan ?? ""} className={input}>
              <option value="">상담 후 결정</option>
              {plans.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </Field>
        </div>
      )}

      <div>
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="이름 *">
            <input name="name" defaultValue={f.name} required maxLength={40} autoComplete="name" className={input} />
          </Field>
          <Field label="연락처">
            <input
              name="phone"
              defaultValue={f.phone}
              type="tel"
              inputMode="tel"
              maxLength={20}
              autoComplete="tel"
              placeholder="010-0000-0000"
              className={input}
            />
          </Field>
          <Field label="이메일">
            <input name="email" defaultValue={f.email} type="email" maxLength={100} autoComplete="email" className={input} />
          </Field>
        </div>
        <p className="mt-2 text-sm text-muted">연락처와 이메일 중 하나만 적어도 됩니다.</p>
      </div>

      {kind === "견적" && (
        <details open={Boolean(f.domain || f.openDate)} className="rounded-lg border border-line px-4">
          <summary className="flex min-h-12 cursor-pointer items-center text-sm font-medium">
            더 알려주실 것 (선택)
          </summary>
          <div className="grid gap-5 pb-4 sm:grid-cols-2">
            <Field label="도메인 보유 여부">
              <select name="domain" defaultValue={f.domain ?? ""} className={input}>
                <option value="">선택</option>
                {domainOptions.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </Field>
            <Field label="희망 오픈일">
              <input name="openDate" defaultValue={f.openDate} type="date" className={input} />
            </Field>
          </div>
        </details>
      )}

      <Field label={kind === "견적" ? "남기실 말 (선택)" : "문의 내용 *"}>
        <textarea name="message" defaultValue={f.message} rows={4} maxLength={2000} required={kind === "문의"} className={input} />
      </Field>

      {/* 스팸 방지용 숨김 필드. 사람은 채우지 않는다 */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <label className="flex cursor-pointer items-start gap-3 text-sm">
        <input type="checkbox" name="agree" required className="mt-0.5 size-5 shrink-0 accent-brand" />
        <span>
          문의 답변을 위한 개인정보(이름, 연락처, 이메일) 수집·이용에 동의합니다.{" "}
          <Link href="/privacy" className="underline">
            개인정보처리방침
          </Link>
        </span>
      </label>

      {state.message && (
        <p role="alert" className="font-medium text-red-700">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="min-h-12 w-full rounded-full bg-ink px-8 font-medium text-paper hover:opacity-90 disabled:opacity-60 sm:w-auto"
      >
        {pending ? "보내는 중..." : kind === "견적" ? "견적 받아보기" : "문의 보내기"}
      </button>
    </form>
  );
}
