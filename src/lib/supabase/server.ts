import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { supabaseEnv } from "./env";

/** Supabase client for Server Components, Server Actions and Route Handlers. Create one per request. */
export async function createClient() {
  const { url, key } = supabaseEnv();
  const cookieStore = await cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll(toSet) {
        try {
          toSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server Components can't set cookies. The proxy refreshes the session instead.
        }
      },
    },
  });
}

/** The signed-in user's verified JWT claims, or null. */
export async function getClaims() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  return { supabase, claims: data?.claims ?? null };
}
