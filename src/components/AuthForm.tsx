"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { LogoMark } from "./Logo";
import type { Provider } from "@/lib/auth";

type Mode = "login" | "signup";

const providers: { id: Provider; label: string; className: string; icon: ReactNode }[] = [
  {
    id: "google",
    label: "Google",
    className: "border border-line bg-field hover:bg-bg-alt",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81z" />
        <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.92l-3.88-3c-1.07.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.95H1.28v3.1A12 12 0 0 0 12 24z" />
        <path fill="#FBBC05" d="M5.29 14.28A7.2 7.2 0 0 1 4.91 12c0-.79.14-1.56.38-2.28v-3.1H1.28a12 12 0 0 0 0 10.76l4.01-3.1z" />
        <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.62l4.01 3.1C6.23 6.88 8.88 4.77 12 4.77z" />
      </svg>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    className: "bg-fg text-bg hover:opacity-90",
    icon: (
      <svg viewBox="0 0 16 16" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
      </svg>
    ),
  },
];

const failures = {
  callback: "That sign-in didn't complete. Please try again.",
  signin: "We couldn't reach the sign-in service. Please try again.",
};

type Props = { mode: Mode; next?: string; error?: keyof typeof failures };

export function AuthForm({ mode, next = "/", error }: Props) {
  // The form leaves the page for the provider; keep the chosen button busy until it does.
  const [busy, setBusy] = useState<Provider | null>(null);
  const message = error ? failures[error] : "";

  // Coming back from the provider with the Back button restores this page from cache; un-stick the button.
  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => e.persisted && setBusy(null);
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);
  const isSignup = mode === "signup";

  return (
    <div className="w-full max-w-[420px]">
      <div className="text-center">
        <LogoMark className="mx-auto h-16 w-16 drop-shadow-[0_12px_30px_rgb(127_90_240/0.35)]" />
        <h1 className="mt-6 text-title sm:text-[2rem]">
          {isSignup ? "Join mawaDao" : "Sign in to mawaDao"}
        </h1>
        <p className="mt-2 text-body text-fg-2">
          {isSignup ? "One account to build, review, govern and support." : "Welcome back. Pick up where you left off."}
        </p>
      </div>

      <form
        action="/auth/signin"
        method="post"
        onSubmit={(e) => {
          // Block a second click instead of disabling the buttons: a disabled submitter
          // is left out of the form data, so the server would never see which provider.
          if (busy) return e.preventDefault();
          setBusy(((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement).value as Provider);
        }}
        className="mt-8 grid gap-3"
      >
        <input type="hidden" name="next" value={next} />
        <input type="hidden" name="mode" value={mode} />
        {providers.map((p) => (
          <button
            key={p.id}
            type="submit"
            name="provider"
            value={p.id}
            aria-disabled={!!busy}
            className={`press flex h-12 items-center justify-center gap-2.5 rounded-xl text-body font-medium aria-disabled:opacity-60 ${p.className}`}
          >
            {p.icon}
            {busy === p.id ? "Connecting…" : `Continue with ${p.label}`}
          </button>
        ))}
      </form>

      {isSignup && (
        <p className="mt-5 px-1 text-center text-footnote text-fg-2">
          Next, you&apos;ll choose a username, your country and how you&apos;re joining.
        </p>
      )}

      <div aria-live="polite">
        {message && <p className="animate-fade mt-5 rounded-xl bg-[#f7b733]/15 px-4 py-3 text-callout text-fg">{message}</p>}
      </div>

      <p className="mt-8 text-center text-callout text-fg-2">
        {isSignup ? "Already a member? " : "New to mawaDao? "}
        <Link href={isSignup ? "/login" : "/signup"} className="text-link hover:underline">
          {isSignup ? "Sign in" : "Create an account"}
        </Link>
      </p>
    </div>
  );
}
