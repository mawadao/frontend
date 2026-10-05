/**
 * Sign-in with Supabase Auth. Members sign in with Google or GitHub only:
 * the form posts to /auth/signin, the provider returns to /auth/callback, and
 * first-timers go on to /onboarding to choose a username, country and role.
 */
export type Provider = "google" | "github";

/** Display-only check for the nav: is a Supabase session cookie present? Pages verify on the server. */
export function hasSessionCookie() {
  return document.cookie.split("; ").some((c) => /^sb-.+-auth-token(\.\d+)?=/.test(c));
}
