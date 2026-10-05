import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { safeNext, siteOrigin } from "@/lib/urls";

/** Google and GitHub return here. Swap the one-time code for a session, then send new members to onboarding. */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const next = safeNext(searchParams.get("next"));
  const origin = siteOrigin(request);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const { data: profile } = await supabase.from("profiles").select("id").eq("id", data.user.id).maybeSingle();
      const to = profile ? next : `/onboarding?next=${encodeURIComponent(next)}`;
      return NextResponse.redirect(`${origin}${to}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=callback`);
}
