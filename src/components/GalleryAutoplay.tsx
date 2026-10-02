"use client";

import { useEffect } from "react";

/*
 * On phones, each `gallery` row showcases itself: while it is mostly on screen
 * it advances one card every few seconds and loops back to the start. Touching,
 * hovering or focusing a row hands it to the visitor and pauses it for a while.
 * Off for reduced motion and from 40rem up, where the rows are grids.
 */

const STEP_MS = 3500;
const PAUSE_MS = 8000;

export function GalleryAutoplay() {
  useEffect(() => {
    const phone = matchMedia("(width < 40rem)");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const touched = new WeakMap<Element, number>();

    const hold = (e: Event) => {
      const row = (e.target as Element | null)?.closest?.(".gallery");
      if (row) touched.set(row, Date.now());
    };

    const advance = () => {
      if (!phone.matches || reduce.matches || document.hidden) return;
      for (const el of document.querySelectorAll<HTMLElement>(".gallery")) {
        if (Date.now() - (touched.get(el) ?? 0) < PAUSE_MS || el.matches(":hover, :focus-within")) continue;
        const r = el.getBoundingClientRect();
        const visible = Math.min(r.bottom, innerHeight) - Math.max(r.top, 0);
        if (visible < r.height * 0.6) continue;
        const [a, b] = el.children as HTMLCollectionOf<HTMLElement>;
        const max = el.scrollWidth - el.clientWidth;
        if (!a || !b || max <= 0) continue;
        const atEnd = el.scrollLeft >= max - 2;
        el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + (b.offsetLeft - a.offsetLeft), behavior: "smooth" });
      }
    };

    const timer = setInterval(advance, STEP_MS);
    const events = ["pointerdown", "touchstart", "wheel", "focusin"] as const;
    for (const type of events) addEventListener(type, hold, { passive: true, capture: true });
    return () => {
      clearInterval(timer);
      for (const type of events) removeEventListener(type, hold, { capture: true });
    };
  }, []);

  return null;
}
