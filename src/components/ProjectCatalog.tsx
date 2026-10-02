"use client";

import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { categories, projects, type Category } from "@/lib/projects";

type Filter = (typeof categories)[number];

const tint: Record<Category, string> = {
  Flagship: "from-[#f7b733] to-[#fc4a1a]",
  "AI Agents & MCP": "from-[#7f5af0] to-[#2997ff]",
  "Web3 & Blockchain": "from-[#302b63] to-[#7f5af0]",
  "Developer Tools": "from-[#0f9b8e] to-[#2997ff]",
};

/** Segmented control whose thumb springs to the selected segment from wherever it currently is. */
function Segmented({ value, onChange }: { value: Filter; onChange: (v: Filter) => void }) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [thumb, setThumb] = useState<{ x: number; w: number } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const el = refs.current[value];
      if (el) setThumb({ x: el.offsetLeft, w: el.offsetWidth });
    };
    measure();
    const el = refs.current[value];
    const strip = el?.closest<HTMLElement>("[data-strip]");
    if (el && strip) {
      const target = el.offsetLeft - (strip.clientWidth - el.offsetWidth) / 2;
      strip.scrollTo({ left: target, behavior: "smooth" });
    }
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [value]);

  function onKey(e: KeyboardEvent) {
    const i = categories.indexOf(value);
    const next = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : -1;
    if (next < 0 || next >= categories.length) return;
    e.preventDefault();
    onChange(categories[next]);
    refs.current[categories[next]]?.focus();
  }

  return (
    <div data-strip className="-mx-4 mb-8 overflow-x-auto px-4 [scrollbar-width:none] max-sm:[mask-image:linear-gradient(to_right,transparent,black_1rem,black_calc(100%-2.5rem),transparent)] sm:mx-auto sm:mb-12 sm:w-fit sm:max-w-full sm:px-0 [&::-webkit-scrollbar]:hidden">
      <div
        role="tablist"
        aria-label="Filter projects by category"
        onKeyDown={onKey}
        className="relative flex w-max gap-1 rounded-full bg-surface p-1 shadow-[0_1px_2px_rgb(0_0_0/0.06)]"
      >
        {thumb && (
          <span
            aria-hidden="true"
            className="absolute top-1 bottom-1 left-0 rounded-full bg-fg transition-[translate,width] duration-[640ms] ease-[var(--ease-spring)] motion-reduce:transition-none"
            style={{ translate: `${thumb.x}px 0`, width: thumb.w }}
          />
        )}
        {categories.map((c) => (
          <button
            key={c}
            ref={(el) => {
              refs.current[c] = el;
            }}
            role="tab"
            aria-selected={value === c}
            tabIndex={value === c ? 0 : -1}
            onClick={() => onChange(c)}
            className={`press relative shrink-0 rounded-full px-4 py-2 text-callout ${
              value === c ? (thumb ? "text-bg" : "bg-fg text-bg") : "text-fg-2 hover:text-fg"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProjectCatalog() {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <Segmented value={filter} onChange={setFilter} />

      <p className="sr-only" aria-live="polite">
        {shown.length} projects shown
      </p>

      <ul key={filter} className="animate-fade gallery sm:grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {shown.map((p) => (
          <li key={p.repo} className={p.category === "Flagship" && filter === "All" ? "sm:col-span-2 lg:col-span-3" : ""}>
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="press group flex h-full flex-col rounded-[28px] bg-surface p-6 sm:p-7 motion-safe:hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgb(0_0_0/0.25)]"
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-[14px] bg-gradient-to-br ${tint[p.category]} text-subhead font-semibold text-white`}
                  aria-hidden="true"
                >
                  {p.name[0]}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-caption font-medium ${
                    p.status === "Building" ? "bg-[#fc4a1a]/10 text-[#c2410c] dark:text-[#ff8a5b]" : "bg-bg-alt text-fg-2"
                  }`}
                >
                  {p.status}
                </span>
              </div>
              <p className="mt-5 text-caption font-medium sm:mt-6 tracking-[0.06em] text-fg-2 uppercase">{p.category}</p>
              <h3 className="mt-1 text-headline">{p.name}</h3>
              <p className="mt-3 flex-1 text-body text-fg-2">{p.summary}</p>
              <div className="mt-6 flex items-center justify-between text-callout">
                <span className="text-fg-2">{p.language}</span>
                <span className="text-link">
                  View on GitHub
                  <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">›</span>
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
