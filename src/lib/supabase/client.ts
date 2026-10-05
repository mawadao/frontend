import { createBrowserClient } from "@supabase/ssr";
import { supabaseEnv } from "./env";

/** Supabase client for Client Components. It shares the session cookies the server sets. */
export function createClient() {
  const { url, key } = supabaseEnv();
  return createBrowserClient(url, key);
}
