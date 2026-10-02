import Link from "next/link";
import { Wordmark } from "./Logo";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Projects", href: "/#projects" },
      { label: "What we do", href: "/#what-we-do" },
      { label: "Governance", href: "/#governance" },
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
      { label: "Contact us", href: "/#contact" },
      { label: site.email, href: `mailto:${site.email}` },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-bg-alt text-[12px] text-fg-2">
      <div className="mx-auto max-w-[1024px] px-4 pt-12 pb-8 sm:px-6">
        <p className="border-b border-line pb-4 leading-relaxed">
          MAWA DAO is a Decentralized Autonomous Organization. A portion of every project&apos;s success goes toward
          fighting world hunger and funding orphan education. Project names and marks belong to their respective
          owners; listed open-source projects are ones our members contribute to.
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
          <p>Copyright © {new Date().getFullYear()} MAWA DAO. Built in the open.</p>
        </div>
      </div>
    </footer>
  );
}
