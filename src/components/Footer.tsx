import Link from "next/link";
import { Wordmark } from "./Logo";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Projects", href: "/#projects" },
      { label: "Governance", href: "/#governance" },
      { label: "Child safety", href: "/#safety" },
      { label: "Roadmap", href: "/#roadmap" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "GitHub", href: site.links.github },
      { label: "Discord", href: site.links.discord },
      { label: "X (Twitter)", href: site.links.x },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", href: "/login" },
      { label: "Create account", href: "/signup" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { label: "Get involved", href: "/#contact" },
      { label: site.email, href: `mailto:${site.email}` },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-alt text-caption text-fg-2">
      <div className="mx-auto max-w-[1024px] px-4 pt-12 pb-8 sm:px-6">
        <p className="border-b border-line pb-4 leading-relaxed">
          mawaDao is a non-profit, community-owned marketplace for responsible AI agents, governed as a decentralised
          autonomous organisation. Built by the community, owned by the community, for the children who need it most.
          Open source under the Apache 2.0 Licence. Project names and marks in the catalog belong to their respective
          owners.
        </p>

        <div className="grid grid-cols-2 gap-8 py-8 sm:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 font-semibold text-fg">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("/") ? (
                      <Link href={l.href} className="hover:text-fg hover:underline">
                        {l.label}
                      </Link>
                    ) : (
                      <a href={l.href} className="break-all hover:text-fg hover:underline" rel="noreferrer" target={l.href.startsWith("http") ? "_blank" : undefined}>
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
          <Wordmark />
          <p>Copyright © {new Date().getFullYear()} mawaDao. Built in the open.</p>
        </div>
      </div>
    </footer>
  );
}
