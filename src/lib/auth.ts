/**
 * Sign-in with Supabase Auth. Members sign in with Google or GitHub only; the
 * provider returns to /auth/callback, which sends first-timers to /onboarding
 * to choose a username and country.
 */
import { createClient } from "@/lib/supabase/client";

export type Provider = "google" | "github";

export type AuthResult = { ok: true } | { ok: false; message: string };

/** Leaves the page for the provider's consent screen. Resolves only if that couldn't start. */
export async function signInWith(provider: Provider, next = "/"): Promise<AuthResult> {
  const redirectTo = `${location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
  const { error } = await createClient().auth.signInWithOAuth({ provider, options: { redirectTo } });
  return error ? { ok: false, message: "We couldn't reach the sign-in service. Please try again." } : { ok: true };
}
