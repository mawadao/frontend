"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "./Logo";
import { AppearanceControl } from "./AppearanceControl";
import { subscribeAppearance } from "@/lib/appearance";
import { createClient } from "@/lib/supabase/client";
import { nav } from "@/lib/site";

const NAV_H = 52;

/** True when the first opaque background at or above `el` (or the body's) is dark. */
function isDark(el: Element | undefined) {
  const chain: Element[] = [];
  for (let node = el; node; node = node.parentElement ?? undefined) chain.push(node);
  chain.push(document.body);
  for (const node of chain) {
    const m = getComputedStyle(node).backgroundColor.match(/[\d.]+/g);
    if (!m || (m.length === 4 && Number(m[3]) < 0.5)) continue;
    const [r, g, b] = m.slice(0, 3).map((v) => Number(v) / 255);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.4;
  }
  return false;
}

/**
 * Reads what is under the bar each frame it scrolls:
 * - tone: dark glass when the background beneath is dark (in any appearance)
 * - scrolled: show the hairline only once content passes underneath
 * - active: which section the reader is in, for wayfinding
 */
function useScrollState(enabled: boolean) {
  const [state, setState] = useState({ tone: "light", scrolled: false, active: "" });

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const under = document
        .elementsFromPoint(window.innerWidth / 2, NAV_H / 2)
        .find((el) => !el.closest("header"));
      const tone = isDark(under) ? "dark" : "light";

      let active = "";
      if (enabled) {
        const line = window.innerHeight * 0.35;
        for (const { href } of nav) {
          const el = document.getElementById(href.split("#")[1]);
          if (el && el.getBoundingClientRect().top <= line && el.getBoundingClientRect().bottom > line) active = href;
        }
      }
      setState((s) =>
        s.tone === tone && s.scrolled === window.scrollY > 4 && s.active === active
          ? s
          : { tone, scrolled: window.scrollY > 4, active },
      );
    };
    const onScroll = () => (frame ||= requestAnimationFrame(read));
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Re-read after an appearance change has painted.
    const unsubscribe = subscribeAppearance(() => setTimeout(onScroll, 0));
    return () => {
      unsubscribe();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled]);

  return state;
}

/** Whether someone is signed in, for the nav's account links. Display only: pages check on the server. */
function useSignedIn() {
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    let supabase;
    try {
      supabase = createClient();
    } catch {
      return; // Supabase isn't configured; keep the signed-out links.
    }
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setSignedIn(!!session));
    return () => data.subscription.unsubscribe();
  }, []);
  return signedIn;
}

function SignOut({ className, onClick }: { className: string; onClick?: () => void }) {
  return (
    <form action="/auth/signout" method="post" className="contents">
      <button type="submit" onClick={onClick} className={className}>
        Sign out
      </button>
    </form>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { tone, scrolled, active } = useScrollState(pathname === "/");
  const signedIn = useSignedIn();
  const dark = tone === "dark" && !open;

  useEffect(() => {
    // iOS only applies :active styles once a touch listener exists on the page.
    const noop = () => {};
    document.addEventListener("touchstart", noop, { passive: true });
    return () => document.removeEventListener("touchstart", noop);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkTone = (href: string) =>
    active === href ? (dark ? "text-white" : "text-fg") : dark ? "text-white/72 hover:text-white" : "text-fg/72 hover:text-fg";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50" data-tone={dark ? "dark" : "light"} data-open={open}>
      {/* One glass surface: it grows to fill the screen when the menu opens. */}
      <div
        className={`material-nav absolute inset-x-0 top-0 transition-[height] duration-500 ease-[var(--ease-spring)] ${
          open ? "h-svh" : "h-13"
        }`}
      />
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-13 h-px transition-opacity duration-300 ${dark ? "bg-white/12" : "bg-line"} ${
          scrolled && !open ? "opacity-100" : "opacity-0"
        }`}
      />

      <nav aria-label="Main" className={`pointer-events-auto relative ${dark ? "text-white" : "text-fg"}`}>
        <div className="mx-auto flex h-13 max-w-[1024px] items-center justify-between px-4 sm:px-6">
          <Link href="/" aria-label="mawaDao home" onClick={() => setOpen(false)} className="press">
            <Wordmark />
          </Link>

          <ul className="hidden items-center gap-8 text-footnote md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active === item.href ? "location" : undefined}
                  className={`transition-colors duration-200 ${linkTone(item.href)}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-4 md:flex">
            <AppearanceControl compact className={dark ? "text-white" : "text-fg"} />
            {signedIn ? (
              <SignOut className={`text-footnote transition-colors duration-200 ${linkTone("")}`} />
            ) : (
              <>
                <Link
                  href="/login"
                  aria-current={pathname === "/login" ? "page" : undefined}
                  className={`text-footnote transition-colors duration-200 ${pathname === "/login" ? (dark ? "text-white" : "text-fg") : linkTone("")}`}
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="press rounded-full bg-cta px-3.5 py-1.5 text-footnote font-medium text-white hover:bg-cta-hover"
                >
                  Join mawaDao
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="press -mr-2 flex h-11 w-11 items-center justify-center md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 h-px w-4 bg-current transition-all duration-500 ease-[var(--ease-spring)] ${open ? "top-1.5 rotate-45" : "top-0.5"}`}
              />
              <span
                className={`absolute left-0 h-px w-4 bg-current transition-all duration-500 ease-[var(--ease-spring)] ${open ? "top-1.5 -rotate-45" : "top-2.5"}`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        inert={!open}
        className={`relative h-[calc(100svh-3.25rem)] overflow-y-auto md:hidden ${open ? "pointer-events-auto" : ""}`}
      >
        <ul className="px-8 pt-6">
          {nav.map((item, i) => (
            <li
              key={item.href}
              className={`transition-[opacity,translate] duration-500 ease-[var(--ease-spring)] ${
                open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${80 + i * 35}ms` : "0ms" }}
            >
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-title"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div
          className={`mt-10 px-8 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: open ? "320ms" : "0ms" }}
        >
          <p className="mb-3 text-footnote text-fg-2">Appearance</p>
          <AppearanceControl />
        </div>
        <div
          className={`mt-8 flex gap-3 px-8 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: open ? "260ms" : "0ms" }}
        >
          {signedIn ? (
            <SignOut onClick={() => setOpen(false)} className="press rounded-full border border-line px-5 py-2.5 text-callout font-medium" />
          ) : (
            <>
              <Link href="/signup" onClick={() => setOpen(false)} className="press rounded-full bg-cta px-5 py-2.5 text-callout font-medium text-white">
                Join mawaDao
              </Link>
              <Link href="/login" onClick={() => setOpen(false)} className="press rounded-full border border-line px-5 py-2.5 text-callout font-medium">
                Sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
