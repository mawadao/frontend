/**
 * Appearance (Auto / Light / Dark), like the macOS setting. "system" leaves
 * <html> without data-theme so CSS follows prefers-color-scheme.
 */
export type Appearance = "system" | "light" | "dark";

export const STORAGE_KEY = "appearance";
const EVENT = "appearancechange";

/** Runs in <head> before first paint so a saved choice never flashes. */
export const appearanceScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export function getAppearance(): Appearance {
  const t = document.documentElement.getAttribute("data-theme");
  return t === "light" || t === "dark" ? t : "system";
}

export function subscribeAppearance(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  window.addEventListener(EVENT, onChange);
  media.addEventListener("change", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    media.removeEventListener("change", onChange);
  };
}

const chrome = { light: "#ffffff", dark: "#000000" };

/** Keep the browser chrome (theme-color) in step with a pinned appearance. */
export function syncThemeColor() {
  const pinned = getAppearance();
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((m) => {
    m.dataset.media ??= m.media;
    m.dataset.content ??= m.content;
    if (pinned === "system") {
      m.media = m.dataset.media;
      m.content = m.dataset.content;
    } else {
      m.media = "all";
      m.content = chrome[pinned];
    }
  });
}

export function setAppearance(next: Appearance) {
  const root = document.documentElement;
  const apply = () => {
    if (next === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", next);
    try {
      if (next === "system") localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    syncThemeColor();
    window.dispatchEvent(new Event(EVENT));
  };

  // Ease the brightness change with a cross-fade, unless motion is reduced.
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "startViewTransition" in document) {
    // Let listeners measure again once the cross-fade has finished.
    document.startViewTransition(apply).finished.then(() => window.dispatchEvent(new Event(EVENT)));
  } else apply();
}
