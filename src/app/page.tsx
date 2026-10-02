import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { LogoMark } from "@/components/Logo";
import { ProjectCatalog } from "@/components/ProjectCatalog";
import { ContactForm } from "@/components/ContactForm";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

function SectionHead({ eyebrow, title, lede, dark }: { eyebrow: string; title: ReactNode; lede?: string; dark?: boolean }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-[760px] text-center">
      <p className={`text-[17px] font-semibold ${dark ? "text-gold" : "text-fg-2"}`}>{eyebrow}</p>
      <h2 className="mt-2 font-display text-[40px] leading-[1.08] font-semibold tracking-[-0.025em] sm:text-[56px]">{title}</h2>
      {lede && <p className={`mt-5 text-[19px] sm:text-[21px] ${dark ? "text-[#a1a1a6]" : "text-fg-2"}`}>{lede}</p>}
    </Reveal>
  );
}

const pillars = [
  {
    title: "Open Source",
    body: "We pick real projects, open real pull requests and learn from real code review. Your first good-first-issue is waiting.",
    glyph: "{ }",
    className: "lg:col-span-2",
  },
  {
    title: "AI Agents & MCP",
    body: "Agents, MCP servers and skills: we build the tools that let AI do useful work, safely.",
    glyph: "✦",
    className: "",
  },
  {
    title: "Web3 & Blockchain",
    body: "Ledgers, clients and smart contracts, and the governance tools a DAO actually runs on.",
    glyph: "⬡",
    className: "",
  },
  {
    title: "Learn by building",
    body: "Students and working developers ship side by side. Pairing, reviews and mentorship are how we grow.",
    glyph: "↗",
    className: "",
  },
  {
    title: "Giving back",
    body: "A portion of every project's success goes toward fighting world hunger and funding orphan education. That mission doesn't change, however we grow.",
    glyph: "♥",
    className: "lg:col-span-1 sm:col-span-2",
    feature: true,
  },
];

const steps = [
  { n: "01", title: "Propose", body: "Any member can put forward an idea: a project, a partnership, a change to how we work." },
  { n: "02", title: "Discuss", body: "Proposals are debated in the open, refined together and improved before anyone votes." },
  { n: "03", title: "Vote", body: "Members decide. Outcomes are recorded transparently so everyone can see how we got here." },
  { n: "04", title: "Build", body: "Approved work becomes a project in the catalog, staffed by the people who care most." },
];

const roadmap = [
  {
    phase: "Now",
    tone: "bg-[#34c759]",
    items: [
      ["Becoming MAWA DAO", "A new name and a new home at mawadao.com. Same people, same mission."],
      ["Open contributor program", "Curated good-first-issues across every project in the catalog."],
    ],
  },
  {
    phase: "Next",
    tone: "bg-cta",
    items: [
      ["Member accounts", "Sign in with email, GitHub or a wallet, and keep a profile of what you've shipped."],
      ["Proposals & voting", "Governance tooling so members can propose, discuss and vote on community decisions."],
      ["AI Agents & MCP lab", "A home for agent, MCP and skills experiments, built in the open."],
    ],
  },
  {
    phase: "Later",
    tone: "bg-violet",
    items: [
      ["Transparent impact treasury", "Publish exactly where our giving goes, for hunger relief and orphan education."],
      ["Mentorship cohorts", "Structured programs pairing students with experienced contributors."],
      ["Community grants", "Funding for member-built projects, decided by member vote."],
    ],
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-svh items-center overflow-hidden bg-black text-[#f5f5f7]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="animate-glow absolute top-[8%] left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(127_90_240/0.45),transparent)] blur-2xl" />
          <div className="animate-glow absolute right-[-10%] bottom-[-20%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(252_74_26/0.22),transparent)] blur-2xl [animation-delay:-6s]" />
          <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.07)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] [background-size:28px_28px]" />
        </div>

        <div className="relative mx-auto w-full max-w-[1024px] px-4 pt-28 pb-24 text-center sm:px-6">
          <Reveal>
            <LogoMark className="mx-auto h-20 w-20 drop-shadow-[0_20px_50px_rgb(127_90_240/0.5)] sm:h-24 sm:w-24" />
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-8 text-[13px] font-medium tracking-[0.3em] text-[#a1a1a6] uppercase">
              Decentralized Autonomous Organization
            </p>
          </Reveal>
          <Reveal delay={200}>
            <h1 className="mt-5 font-display text-[52px] leading-[1.02] font-semibold tracking-[-0.035em] sm:text-[80px] lg:text-[96px]">
              Build the future.
              <br />
              <span className="text-brand">Own it together.</span>
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="mx-auto mt-7 max-w-[640px] text-[19px] leading-snug text-[#a1a1a6] sm:text-[21px]">
              MAWA DAO is a community of developers and students building open source, AI agents and Web3, governed by
              its members and giving back with every project.
            </p>
          </Reveal>
          <Reveal delay={400} className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Link
              href="/signup"
              className="rounded-full bg-cta px-7 py-3.5 text-[17px] font-medium text-white transition-colors hover:bg-cta-hover"
            >
              Join the DAO
            </Link>
            <Link href="/#projects" className="group text-[17px] text-[#2997ff]">
              Explore projects
              <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">›</span>
            </Link>
          </Reveal>
        </div>

        <a
          href="#mission"
          aria-label="Scroll to learn more"
          className="absolute bottom-8 left-1/2 flex h-10 w-6 -translate-x-1/2 justify-center rounded-full border border-white/25 pt-2"
        >
          <span className="h-2 w-1 animate-bounce rounded-full bg-white/60" />
        </a>
      </section>

      {/* Mission statement */}
      <section id="mission" className="bg-bg px-4 py-28 sm:px-6 sm:py-36">
        <Reveal className="mx-auto max-w-[880px] text-center">
          <p className="font-display text-[32px] leading-[1.15] font-semibold tracking-[-0.02em] sm:text-[48px]">
            Open source. AI agents. Web3.{" "}
            <span className="text-fg-2">
              One community that owns what it builds, decides together, and gives back to people who need it most.
            </span>
          </p>
        </Reveal>
        <dl className="mx-auto mt-20 grid max-w-[880px] grid-cols-2 gap-y-10 text-center sm:grid-cols-4">
          {[
            [String(projects.length), "projects in the catalog"],
            ["3", "focus areas"],
            ["2021", "building since"],
            ["1", "unchanged mission"],
          ].map(([value, label], i) => (
            <Reveal key={label} delay={i * 80}>
              <dt className="sr-only">{label}</dt>
              <dd>
                <span className="block font-display text-[48px] leading-none font-semibold tracking-tight sm:text-[56px]">
                  {value}
                </span>
                <span className="mt-2 block text-[15px] text-fg-2">{label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Project catalog */}
      <section id="projects" className="bg-bg-alt px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-[1100px]">
          <SectionHead
            eyebrow="Projects"
            title="The catalog."
            lede="What we're building and the open-source projects our members contribute to. Pick one and start shipping."
          />
          <Reveal>
            <ProjectCatalog />
          </Reveal>
          <Reveal className="mt-12 text-center">
            <a href={site.links.github} target="_blank" rel="noreferrer" className="group text-[17px] text-link">
              See everything on GitHub
              <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">›</span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* What we do */}
      <section id="what-we-do" className="bg-bg px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-[1100px]">
          <SectionHead
            eyebrow="What we do"
            title={
              <>
                Learn it. Build it.
                <br />
                <span className="text-brand">Give it back.</span>
              </>
            }
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal
                key={p.title}
                delay={(i % 3) * 90}
                className={`flex min-h-[280px] flex-col justify-between rounded-[28px] p-8 sm:p-10 ${p.className} ${
                  p.feature ? "bg-gradient-to-br from-[#0f0c29] via-[#24243e] to-[#302b63] text-[#f5f5f7]" : "bg-bg-alt"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`text-[40px] leading-none ${p.feature ? "text-gold" : "text-brand"}`}
                >
                  {p.glyph}
                </span>
                <div className="mt-10">
                  <h3 className="font-display text-[28px] leading-tight font-semibold tracking-tight">{p.title}</h3>
                  <p className={`mt-3 text-[17px] ${p.feature ? "text-[#c7c7cc]" : "text-fg-2"}`}>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section id="governance" className="bg-black px-4 py-24 text-[#f5f5f7] sm:px-6 sm:py-32">
        <div className="mx-auto max-w-[1100px]">
          <SectionHead
            dark
            eyebrow="Governance"
            title="Decided by the people who build it."
            lede="As a Decentralized Autonomous Organization, MAWA has no single owner. Direction comes from members, in the open."
          />
          <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <span
              aria-hidden="true"
              className="absolute top-7 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-gold via-ember to-violet lg:block"
            />
            {steps.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 120} className="relative text-center">
                <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-[#1d1d1f] font-display text-[15px] font-semibold text-gold">
                  {s.n}
                </span>
                <h3 className="mt-6 font-display text-[24px] font-semibold tracking-tight">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-[260px] text-[17px] text-[#a1a1a6]">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="bg-bg-alt px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-[1100px]">
          <SectionHead
            eyebrow="Roadmap"
            title="What we're planning."
            lede="Where MAWA DAO is headed. Like everything here, the roadmap is shaped by member proposals."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {roadmap.map((col, i) => (
              <Reveal key={col.phase} delay={i * 100} className="rounded-[28px] bg-surface p-8">
                <p className="flex items-center gap-2.5 text-[14px] font-semibold tracking-wide text-fg-2 uppercase">
                  <span className={`h-2.5 w-2.5 rounded-full ${col.tone}`} aria-hidden="true" />
                  {col.phase}
                </p>
                <ul className="mt-6 divide-y divide-line">
                  {col.items.map(([title, body]) => (
                    <li key={title} className="py-5 first:pt-0 last:pb-0">
                      <h3 className="text-[19px] font-semibold tracking-tight">{title}</h3>
                      <p className="mt-1.5 text-[16px] text-fg-2">{body}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Get in touch */}
      <section id="contact" className="bg-bg px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto grid max-w-[1100px] gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="text-[17px] font-semibold text-fg-2">Get in touch</p>
            <h2 className="mt-2 font-display text-[40px] leading-[1.08] font-semibold tracking-[-0.025em] sm:text-[56px]">
              Let&apos;s build
              <br />
              <span className="text-brand">something good.</span>
            </h2>
            <p className="mt-5 max-w-[420px] text-[19px] text-fg-2">
              Want to contribute, propose a project, partner with us or support the mission? We&apos;d love to hear
              from you.
            </p>
            <ul className="mt-10 space-y-4 text-[17px]">
              {[
                ["GitHub", site.links.github, "github.com/mawadao"],
                ["Discord", site.links.discord, "Join the conversation"],
                ["Email", `mailto:${site.email}`, site.email],
              ].map(([label, href, text]) => (
                <li key={label} className="flex gap-4">
                  <span className="w-20 shrink-0 text-fg-2">{label}</span>
                  <a href={href} className="text-link hover:underline" target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className="rounded-[28px] bg-bg-alt p-6 sm:p-10">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
