import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { safeNext, siteOrigin } from "@/lib/urls";
import type { Provider } from "@/lib/auth";

const providers: Provider[] = ["google", "github"];

/** Starts Google or GitHub sign-in on the server, so the browser never needs Supabase settings. */
export async function POST(request: NextRequest) {
  const form = await request.formData();
  const provider = String(form.get("provider")) as Provider;
  const next = safeNext(String(form.get("next") ?? ""));
  const origin = siteOrigin(request);
  const back = form.get("mode") === "signup" ? "/signup" : "/login";

  if (providers.includes(provider)) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}` },
    });
    if (!error && data.url) return NextResponse.redirect(data.url, { status: 303 });
  }

  return NextResponse.redirect(`${origin}${back}?error=signin`, { status: 303 });
}
