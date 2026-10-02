"use client";

import { useState } from "react";
import { categories, projects, type Category } from "@/lib/projects";

const tint: Record<Category, string> = {
  Flagship: "from-[#f7b733] to-[#fc4a1a]",
  "AI Agents & MCP": "from-[#7f5af0] to-[#2997ff]",
  "Web3 & Blockchain": "from-[#302b63] to-[#7f5af0]",
  "Developer Tools": "from-[#0f9b8e] to-[#2997ff]",
};

export function ProjectCatalog() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter projects"
        className="mx-auto mb-12 flex w-fit max-w-full gap-1 overflow-x-auto rounded-full bg-surface p-1 shadow-[0_1px_2px_rgb(0_0_0/0.06)] [scrollbar-width:none]"
      >
        {categories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={filter === c}
            onClick={() => setFilter(c)}
            className={`shrink-0 rounded-full px-4 py-2 text-[14px] transition-all duration-300 ${
              filter === c ? "bg-fg text-bg" : "text-fg-2 hover:text-fg"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <li key={p.repo} className={p.category === "Flagship" && filter === "All" ? "sm:col-span-2 lg:col-span-3" : ""}>
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col rounded-[28px] bg-surface p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgb(0_0_0/0.25)]"
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-[14px] bg-gradient-to-br ${tint[p.category]} text-[20px] font-semibold text-white`}
                  aria-hidden="true"
                >
                  {p.name[0]}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[12px] font-medium ${
                    p.status === "Building" ? "bg-[#fc4a1a]/10 text-[#d9480f] dark:text-[#ff8a5b]" : "bg-bg-alt text-fg-2"
                  }`}
                >
                  {p.status}
                </span>
              </div>
              <p className="mt-6 text-[12px] font-medium tracking-wide text-fg-2 uppercase">{p.category}</p>
              <h3 className="mt-1 text-[24px] leading-tight font-semibold tracking-tight">{p.name}</h3>
              <p className="mt-3 flex-1 text-[17px] text-fg-2">{p.summary}</p>
              <div className="mt-6 flex items-center justify-between text-[14px]">
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
