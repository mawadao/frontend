import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { supabaseEnv } from "@/lib/supabase/env";

/**
 * Keeps the Supabase session fresh: an expired access token is refreshed here,
 * and the new cookies are passed both to the page being rendered and back to
 * the browser. Pages still check who is signed in themselves.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  let env;
  try {
    env = supabaseEnv();
  } catch {
    return response; // Not configured yet: serve the public site, and auth pages explain the error.
  }
  const { url, key } = env;

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(toSet, headers) {
        toSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        toSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        Object.entries(headers).forEach(([k, v]) => response.headers.set(k, v));
      },
    },
  });

  // Don't put code between creating the client and this call: it's what refreshes the session.
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims && request.nextUrl.pathname.startsWith("/onboarding")) {
    const login = request.nextUrl.clone();
    login.pathname = "/login";
    login.search = "";
    return NextResponse.redirect(login);
  }

  return response;
}

export const config = {
  // Skip static assets and images; everything else may need a refreshed session.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
