import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { OnboardingForm } from "@/components/OnboardingForm";
import { isCountry } from "@/lib/countries";
import { getClaims } from "@/lib/supabase/server";
import { safeNext } from "@/lib/urls";

export const metadata: Metadata = { title: "Set up your account" };

export default async function OnboardingPage({ searchParams }: PageProps<"/onboarding">) {
  const { next } = await searchParams;
  const to = safeNext(typeof next === "string" ? next : null);

  const { supabase, claims } = await getClaims();
  if (!claims) redirect(`/login?next=${encodeURIComponent("/onboarding")}`);

  const { data: profile } = await supabase.from("profiles").select("id").eq("id", claims.sub).maybeSingle();
  if (profile) redirect(to);

  return (
    <main className="flex min-h-svh items-center justify-center bg-bg-alt px-4 pt-24 pb-16">
      <OnboardingForm
        next={to}
        suggestedUsername={suggestUsername(claims.user_metadata, claims.email)}
        suggestedCountry={countryFromLanguage((await headers()).get("accept-language"))}
      />
    </main>
  );
}

/** A starting point from the provider: the GitHub login, or the part of the email before the @. */
function suggestUsername(meta: Record<string, unknown> | undefined, email = "") {
  const raw = String(meta?.user_name ?? meta?.preferred_username ?? email.split("@")[0]);
  const clean = raw.toLowerCase().replace(/[^a-z0-9_]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 20);
  return clean.length >= 3 ? clean : "";
}

/** A best guess from the browser's first language with a region, such as en-GB. The member confirms it. */
function countryFromLanguage(header: string | null) {
  for (const tag of header?.split(",") ?? []) {
    const region = tag.split(";")[0].trim().split("-")[1]?.toUpperCase();
    if (region && isCountry(region)) return region;
  }
  return "";
}
