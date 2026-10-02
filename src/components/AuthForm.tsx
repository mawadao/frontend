"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Field } from "./Field";
import { LogoMark } from "./Logo";
import { signIn, signInWith, signUp, type AuthResult, type Provider } from "@/lib/auth";

type Mode = "login" | "signup";
type Errors = Partial<Record<"name" | "email" | "password" | "confirm" | "terms", string>>;

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function validate(mode: Mode, d: Record<string, string>): Errors {
  const e: Errors = {};
  if (mode === "signup" && !d.name?.trim()) e.name = "Enter your name.";
  if (!emailOk(d.email ?? "")) e.email = "Enter a valid email address.";
  if (mode === "login" && !d.password) e.password = "Enter your password.";
  if (mode === "signup") {
    if ((d.password ?? "").length < 8) e.password = "Use at least 8 characters.";
    if (d.confirm !== d.password) e.confirm = "Passwords don't match.";
    if (d.terms !== "on") e.terms = "Please agree to continue.";
  }
  return e;
}

export function AuthForm({ mode }: { mode: Mode }) {
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState<false | "form" | Provider>(false);
  const [result, setResult] = useState<AuthResult | null>(null);
  const isSignup = mode === "signup";

  async function run(kind: "form" | Provider, fn: () => Promise<AuthResult>) {
    setBusy(kind);
    setResult(null);
    setResult(await fn());
    setBusy(false);
  }

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const d = Object.fromEntries(new FormData(ev.currentTarget)) as Record<string, string>;
    const e = validate(mode, d);
    setErrors(e);
    if (Object.keys(e).length) return;
    run("form", () =>
      isSignup ? signUp({ name: d.name, email: d.email, password: d.password }) : signIn({ email: d.email, password: d.password }),
    );
  }

  return (
    <div className="w-full max-w-[420px]">
      <div className="text-center">
        <LogoMark className="mx-auto h-16 w-16 drop-shadow-[0_12px_30px_rgb(127_90_240/0.35)]" />
        <h1 className="mt-6 font-display text-[32px] leading-tight font-semibold tracking-tight">
          {isSignup ? "Join MAWA DAO" : "Sign in to MAWA DAO"}
        </h1>
        <p className="mt-2 text-fg-2">
          {isSignup ? "One account to contribute, propose and vote." : "Welcome back. Pick up where you left off."}
        </p>
      </div>

      <div className="mt-8 grid gap-3">
        <button
          type="button"
          disabled={!!busy}
          onClick={() => run("github", () => signInWith("github"))}
          className="flex h-12 items-center justify-center gap-2.5 rounded-xl bg-fg text-[16px] font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          <svg viewBox="0 0 16 16" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          {busy === "github" ? "Connecting…" : "Continue with GitHub"}
        </button>
        <button
          type="button"
          disabled={!!busy}
          onClick={() => run("wallet", () => signInWith("wallet"))}
          className="flex h-12 items-center justify-center gap-2.5 rounded-xl border border-line bg-field text-[16px] font-medium transition-colors hover:bg-bg-alt disabled:opacity-60"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="3" y="6" width="18" height="13" rx="3" />
            <path d="M16 12.5h2M3 9.5h13a2 2 0 0 0 2-2V6" strokeLinecap="round" />
          </svg>
          {busy === "wallet" ? "Connecting…" : "Connect a wallet"}
        </button>
      </div>

      <div className="my-6 flex items-center gap-4 text-[13px] text-fg-2">
        <span className="h-px flex-1 bg-line" />
        or with email
        <span className="h-px flex-1 bg-line" />
      </div>

      <form noValidate onSubmit={onSubmit} className="grid gap-3">
        {isSignup && <Field label="Full name" name="name" autoComplete="name" error={errors.name} />}
        <Field label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete={isSignup ? "new-password" : "current-password"}
          error={errors.password}
        />
        {isSignup && (
          <Field label="Confirm password" name="confirm" type="password" autoComplete="new-password" error={errors.confirm} />
        )}

        {isSignup ? (
          <div>
            <label className="flex items-start gap-3 px-1 pt-1 text-[14px] text-fg-2">
              <input type="checkbox" name="terms" className="mt-0.5 h-4 w-4 accent-[var(--cta)]" />
              <span>I agree to take part in good faith and follow the community&apos;s code of conduct.</span>
            </label>
            {errors.terms && <p className="mt-1.5 px-1 text-[13px] text-[#e30000] dark:text-[#ff6961]">{errors.terms}</p>}
          </div>
        ) : (
          <div className="flex justify-end px-1">
            <button
              type="button"
              className="text-[14px] text-link hover:underline"
              onClick={() => setResult({ ok: false, message: "Password reset will be available once accounts open." })}
            >
              Forgot password?
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={!!busy}
          className="mt-2 h-12 rounded-xl bg-cta text-[16px] font-medium text-white transition-colors hover:bg-cta-hover disabled:opacity-60"
        >
          {busy === "form" ? (isSignup ? "Creating account…" : "Signing in…") : isSignup ? "Create account" : "Sign in"}
        </button>
      </form>

      <div aria-live="polite">
        {result && (
          <p
            className={`mt-5 rounded-xl px-4 py-3 text-[14px] ${
              result.ok ? "bg-[#34c759]/12 text-[#248a3d]" : "bg-[#f7b733]/15 text-fg"
            }`}
          >
            {result.ok ? "You're in. Welcome to MAWA DAO." : result.message}
          </p>
        )}
      </div>

      <p className="mt-8 text-center text-[15px] text-fg-2">
        {isSignup ? "Already a member? " : "New to MAWA DAO? "}
        <Link href={isSignup ? "/login" : "/signup"} className="text-link hover:underline">
          {isSignup ? "Sign in" : "Create an account"}
        </Link>
      </p>
    </div>
  );
}
