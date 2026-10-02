"use client";

import { useEffect, useSyncExternalStore, type KeyboardEvent } from "react";
import { Icon, type IconName } from "./Icon";
import { getAppearance, setAppearance, subscribeAppearance, syncThemeColor, type Appearance } from "@/lib/appearance";

const options: { value: Appearance; label: string; icon: IconName }[] = [
  { value: "system", label: "Auto", icon: "auto" },
  { value: "light", label: "Light", icon: "sun" },
  { value: "dark", label: "Dark", icon: "moon" },
];

/** Auto / Light / Dark segmented control. `compact` shows icons only (for the nav). */
export function AppearanceControl({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  const value = useSyncExternalStore(subscribeAppearance, getAppearance, () => "system" as Appearance);
  useEffect(syncThemeColor, []);

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    const i = options.findIndex((o) => o.value === value);
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = options[(i + step + options.length) % options.length];
    setAppearance(next.value);
    e.currentTarget.querySelector<HTMLButtonElement>(`[data-value="${next.value}"]`)?.focus();
  }

  return (
    <div
      role="radiogroup"
      aria-label="Appearance"
      onKeyDown={onKey}
      className={`inline-flex items-center gap-0.5 rounded-full border border-current/15 p-0.5 ${className}`}
    >
      {options.map((o) => {
        const on = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={compact ? `${o.label} appearance` : undefined}
            title={compact ? o.label : undefined}
            data-value={o.value}
            tabIndex={on ? 0 : -1}
            onClick={() => setAppearance(o.value)}
            className={`press flex items-center gap-1.5 rounded-full ${compact ? "h-6 w-6 justify-center" : "h-8 px-3 text-footnote"} ${
              on ? "bg-current/12 opacity-100" : "opacity-60 hover:opacity-100"
            }`}
          >
            <Icon name={o.icon} className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
            {!compact && o.label}
          </button>
        );
      })}
    </div>
  );
}
