"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Wordmark } from "./Logo";
import { nav } from "@/lib/site";

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Main"
        className="border-b border-line bg-[var(--nav-bg)] backdrop-blur-xl backdrop-saturate-150"
      >
        <div className="mx-auto flex h-13 max-w-[1024px] items-center justify-between px-4 sm:px-6">
          <Link href="/" aria-label="MAWA DAO home" onClick={() => setOpen(false)}>
            <Wordmark />
          </Link>

          <ul className="hidden items-center gap-8 text-[13px] text-fg/80 md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-4 md:flex">
            <Link href="/login" className="text-[13px] text-fg/80 transition-colors hover:text-fg">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-cta px-3.5 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-cta-hover"
            >
              Join the DAO
            </Link>
          </div>

          <button
            type="button"
            className="-mr-2 flex h-10 w-10 items-center justify-center md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 h-px w-4 bg-fg transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0.5"}`}
              />
              <span
                className={`absolute left-0 h-px w-4 bg-fg transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-x-0 top-13 bottom-0 bg-bg transition-opacity duration-300 md:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <ul className="px-8 pt-6">
          {nav.map((item, i) => (
            <li
              key={item.href}
              className={`transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
              style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
            >
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-[28px] font-semibold tracking-tight"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex gap-3 px-8">
          <Link
            href="/signup"
            onClick={() => setOpen(false)}
            className="rounded-full bg-cta px-5 py-2.5 text-[15px] font-medium text-white"
          >
            Join the DAO
          </Link>
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="rounded-full border border-line px-5 py-2.5 text-[15px] font-medium"
          >
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
}
