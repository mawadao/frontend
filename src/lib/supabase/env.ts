/**
 * Supabase project settings, read on the server at runtime so one image can
 * serve any environment. On Cloud Run they come from Secret Manager; locally
 * from .env.local.
 */
export function supabaseEnv() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error("Set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY (see .env.example).");
  }
  return { url, key };
}
