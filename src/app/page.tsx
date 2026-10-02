import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { LogoMark } from "@/components/Logo";
import { Icon, type IconName } from "@/components/Icon";
import { ProjectCatalog } from "@/components/ProjectCatalog";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

function SectionHead({ eyebrow, title, lede }: { eyebrow: string; title: ReactNode; lede?: string }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-[760px] text-center">
      <p className="text-body font-semibold text-fg-2">{eyebrow}</p>
      <h2 className="mt-2 font-display text-display text-balance">{title}</h2>
      {lede && <p className="mt-5 text-lede text-pretty text-fg-2">{lede}</p>}
    </Reveal>
  );
}

const steps = [
  ["Developers build", "AI agents for education, learning support and small-business needs, and submit them to the open marketplace."],
  ["Agents are reviewed", "against our responsible AI and child-safety standards before they are made available."],
  ["Schools and educators use them", "free of charge through the marketplace, alongside small businesses."],
  ["Impact is recorded", "on a blockchain ledger, so contributions and outcomes are transparent and verifiable."],
  ["Rewards return to the community", "Developers, reviewers, educators and local communities are recognised for the value they create."],
  ["The community governs", "through a decentralised autonomous organisation operating at local, country and global level."],
];

const features: { icon: IconName; title: string; body: string; className?: string; feature?: boolean }[] = [
  {
    icon: "store",
    title: "Open agent marketplace",
    body: "Developers list and share agents for free. No listing fees and no platform commission on educational use.",
    className: "lg:col-span-2",
    feature: true,
  },
  {
    icon: "chain",
    title: "Blockchain-linked agents",
    body: "Every agent has an on-chain identity: its author, version history, review status and usage.",
  },
  {
    icon: "gift",
    title: "Community rewards",
    body: "Building agents, reviewing code, translating content, reporting safety issues and supporting schools all earn recognition and rewards, paid out transparently by smart contract.",
  },
  {
    icon: "people",
    title: "Shared ownership",
    body: "Contributors become co-owners of the platform with a voice in its direction, not users of someone else's product.",
  },
  {
    icon: "layers",
    title: "Multi-level governance",
    body: "Decisions are made as close as possible to the people they affect, from a single school up to the whole community.",
  },
  {
    icon: "signal",
    title: "Built for low-resource settings",
    body: "Agents work on low-cost devices and limited bandwidth, and in local languages wherever possible.",
    className: "sm:col-span-2 lg:col-span-3",
  },
];

const levels = [
  {
    level: "Local",
    who: "Schools, orphanages, teachers, parents and local organisations",
    decides: ["Which agents are used locally", "Local content and language needs", "How local rewards are allocated"],
  },
  {
    level: "Country",
    who: "National chapters, education partners and regional contributors",
    decides: ["Country-specific safety and curriculum standards", "Compliance with national law", "Regional priorities"],
  },
  {
    level: "Global community",
    who: "All contributors and members",
    decides: ["Platform-wide standards", "Responsible AI policy", "Treasury and reward rules", "The roadmap"],
  },
];

const safety: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "shield",
    title: "Safeguarding first",
    body: "Agents used with children must pass child-safety review, collect no unnecessary personal data, and filter content for the age group.",
  },
  {
    icon: "lock",
    title: "Privacy by design",
    body: "No personal data about children is ever stored on a public blockchain. On-chain records cover agents, contributions and aggregated impact only.",
  },
  {
    icon: "eye",
    title: "Transparency",
    body: "See who built an agent, what it is designed to do, its known limitations and its full review history.",
  },
  {
    icon: "scale",
    title: "Fairness and inclusion",
    body: "Agents are tested for bias and for suitability across languages, cultures and learning needs.",
  },
  {
    icon: "hand",
    title: "Human oversight",
    body: "Agents support teachers and carers; they never replace them. Educators stay in control of how agents are used.",
  },
  {
    icon: "flag",
    title: "Accountability",
    body: "Anyone can report a safety concern. Reports are reviewed by the community, and unsafe agents can be suspended immediately.",
  },
];

const audiences: { icon: IconName; who: string; body: string }[] = [
  {
    icon: "code",
    who: "AI developers",
    body: "Make a real difference with your work, build a public portfolio, earn rewards and help own the platform you contribute to.",
  },
  {
    icon: "school",
    who: "Schools, orphanages and educators",
    body: "Free, trustworthy AI tools for tutoring, literacy, numeracy, language learning and teaching support.",
  },
  {
    icon: "briefcase",
    who: "Small businesses and community organisations",
    body: "Practical AI agents without the cost of commercial platforms.",
  },
  {
    icon: "heart",
    who: "Funders, NGOs and partners",
    body: "Transparent, verifiable evidence of where support goes and what impact it has.",
  },
];

const phases = [
  ["Foundation", "Core marketplace, agent manifest standard, responsible AI and safeguarding policies, and the first education agents."],
  ["Pilot", "Pilots with a small number of schools and orphanages. Contributor registry and reward mechanism live on testnet."],
  ["Governance", "DAO launch with local and country chapters. Community voting on standards and reward rules."],
  ["Scale", "Multi-language support, offline and low-bandwidth deployment, and expansion to small businesses and new regions."],
  ["Impact", "Public, verifiable impact reporting for communities, funders and partners."],
];

const ways = [
  "Build or improve AI agents for education and small businesses",
  "Review agents for safety, quality and bias",
  "Translate agents and learning content into local languages",
  "Improve documentation and guides",
  "Connect schools, orphanages and communities to the platform",
  "Take part in governance and help shape policy",
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-svh items-center overflow-hidden bg-bg text-fg">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="animate-glow absolute top-[8%] left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow-violet),transparent)] blur-2xl" />
          <div className="animate-glow absolute right-[-10%] bottom-[-20%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,var(--glow-ember),transparent)] blur-2xl [animation-delay:200ms]" />
          <div className="absolute inset-0 bg-[radial-gradient(var(--grid-dot)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] [background-size:28px_28px]" />
        </div>

        <div className="relative mx-auto w-full max-w-[1024px] px-4 pt-28 pb-24 text-center sm:px-6">
          <Reveal>
            <LogoMark className="mx-auto h-20 w-20 drop-shadow-[0_20px_50px_var(--glow-violet)] sm:h-24 sm:w-24" />
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-8 text-footnote font-medium tracking-[0.25em] text-fg-2 uppercase">
              Non-profit&nbsp;&nbsp;·&nbsp;&nbsp;Community-owned&nbsp;&nbsp;·&nbsp;&nbsp;DAO
            </p>
          </Reveal>
          <Reveal delay={200}>
            <h1 className="mt-5 font-display text-hero">
              AI that teaches.
              <br />
              <span className="text-brand">Owned by all of us.</span>
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="mx-auto mt-7 max-w-[42rem] text-lede text-pretty text-fg-2">{site.tagline}</p>
          </Reveal>
          <Reveal delay={400} className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Link href="/signup" className="press rounded-full bg-cta px-7 py-3.5 text-body font-medium text-white hover:bg-cta-hover">
              Join mawaDao
            </Link>
            <Link href="/#how-it-works" className="group text-body text-link hover:underline">
              See how it works
              <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">›</span>
            </Link>
          </Reveal>
        </div>

        <a
          href="#why"
          aria-label="Scroll to learn more"
          className="absolute bottom-8 left-1/2 flex h-10 w-6 -translate-x-1/2 justify-center rounded-full border border-fg/25 pt-2"
        >
          <span className="h-2 w-1 rounded-full bg-fg/50 motion-safe:animate-bounce" />
        </a>
      </section>

      {/* Why this exists + mission */}
      <section id="why" className="bg-bg px-4 py-28 sm:px-6 sm:py-36">
        <Reveal className="mx-auto max-w-[900px] text-center">
          <p className="font-display text-statement text-balance">
            Millions of children have no access to good teachers, tutoring or learning resources.{" "}
            <span className="text-fg-2">
              Developers everywhere are building AI agents that could close that gap. mawaDao connects the two.
            </span>
          </p>
        </Reveal>

        <dl className="mx-auto mt-20 grid max-w-[900px] grid-cols-2 gap-y-10 text-center sm:grid-cols-4">
          {[
            ["Free", "for schools and educators"],
            ["0%", "commission on educational use"],
            ["3", "levels of governance"],
            ["100%", "open source, Apache 2.0"],
          ].map(([value, label], i) => (
            <Reveal key={label} delay={i * 80}>
              <dt className="sr-only">{label}</dt>
              <dd>
                <span className="block font-display text-figure">{value}</span>
                <span className="mt-2 block text-callout text-fg-2">{label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal className="mx-auto mt-24 max-w-[900px] rounded-[28px] bg-gradient-to-br from-[#0f0c29] via-[#24243e] to-[#302b63] px-8 py-12 text-center text-[#f5f5f7] sm:px-16 sm:py-16">
          <p className="text-body font-semibold text-gold">Our mission</p>
          <p className="mt-4 font-display text-headline text-balance sm:text-title">{site.mission}</p>
        </Reveal>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-bg-alt px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-[1100px]">
          <SectionHead
            eyebrow="How it works"
            title={
              <>
                Built by developers.
                <br />
                <span className="text-brand">Free for every classroom.</span>
              </>
            }
            lede="Developers build and list agents. Schools, orphanages, educators and small businesses use them free of charge. The value flows back to the community that built it."
          />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map(([title, body], i) => (
              <Reveal as="li" key={title} delay={(i % 3) * 90} className="rounded-[28px] bg-surface p-8">
                <span className="font-display text-figure text-brand">{i + 1}</span>
                <h3 className="mt-6 text-headline">{title}</h3>
                <p className="mt-2 text-body text-fg-2">{body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Key features */}
      <section id="features" className="bg-bg px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-[1100px]">
          <SectionHead eyebrow="Key features" title="Accountability built in, not bolted on." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal
                key={f.title}
                delay={(i % 3) * 90}
                className={`flex min-h-[260px] flex-col justify-between rounded-[28px] p-8 sm:p-10 ${f.className ?? ""} ${
                  f.feature ? "bg-gradient-to-br from-[#0f0c29] via-[#24243e] to-[#302b63] text-[#f5f5f7]" : "bg-bg-alt"
                }`}
              >
                <span className={f.feature ? "text-gold" : "text-ember"}>
                  <Icon name={f.icon} className="h-9 w-9" />
                </span>
                <div className="mt-10">
                  <h3 className="font-display text-title">{f.title}</h3>
                  <p className={`mt-3 max-w-[40rem] text-body ${f.feature ? "text-[#c7c7cc]" : "text-fg-2"}`}>{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Project catalog */}
      <section id="projects" className="bg-bg-alt px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-[1100px]">
          <SectionHead
            eyebrow="Projects"
            title="The catalog."
            lede="Our platform, and the open-source AI agent and blockchain projects our contributors build with and give back to."
          />
          <Reveal>
            <ProjectCatalog />
          </Reveal>
          <Reveal className="mt-12 text-center">
            <a href={site.links.github} target="_blank" rel="noreferrer" className="group text-body text-link hover:underline">
              See everything on GitHub
              <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">›</span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* Governance */}
      <section id="governance" className="bg-bg px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-[1100px]">
          <SectionHead
            eyebrow="Governance"
            title="Decisions made close to the people they affect."
            lede="mawaDao combines the principles of a decentralised autonomous organisation with AI. Proposals, votes and outcomes are recorded on-chain, so every decision can be traced and audited."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {levels.map((l, i) => (
              <Reveal key={l.level} delay={i * 110} className="rounded-[28px] bg-bg-alt p-8">
                <p className="text-footnote font-semibold tracking-[0.06em] text-accent-text uppercase">Level {i + 1}</p>
                <h3 className="mt-2 font-display text-title">{l.level}</h3>
                <p className="mt-3 text-callout text-fg-2">{l.who}</p>
                <p className="mt-6 text-footnote font-semibold tracking-[0.06em] text-fg-2 uppercase">Decides</p>
                <ul className="mt-3 space-y-2">
                  {l.decides.map((d) => (
                    <li key={d} className="flex gap-3 text-body">
                      <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-gold to-ember" />
                      {d}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Responsible AI and child safety */}
      <section id="safety" className="bg-bg-alt px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-[1100px]">
          <SectionHead
            eyebrow="Responsible AI and child safety"
            title="Because it serves children, safety is not optional."
            lede="Every agent listed on mawaDao must meet these standards."
          />
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {safety.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 90}>
                <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-surface text-cta">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-headline">{s.title}</h3>
                <p className="mt-2 text-body text-fg-2">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who it is for */}
      <section id="who" className="bg-bg px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-[1100px]">
          <SectionHead eyebrow="Who it is for" title="A place for everyone who wants to help." />
          <div className="grid gap-5 sm:grid-cols-2">
            {audiences.map((a, i) => (
              <Reveal key={a.who} delay={(i % 2) * 90} className="flex gap-6 rounded-[28px] bg-bg-alt p-8">
                <span className="text-ember">
                  <Icon name={a.icon} className="h-8 w-8" />
                </span>
                <div>
                  <h3 className="text-headline">{a.who}</h3>
                  <p className="mt-2 text-body text-fg-2">{a.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="bg-bg-alt px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-[1100px]">
          <SectionHead
            eyebrow="Roadmap"
            title="What we're planning."
            lede="mawaDao is in its early stage. Here is the path from first agents to verifiable impact."
          />
          <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
            <span
              aria-hidden="true"
              className="absolute top-7 right-[10%] left-[10%] hidden h-px bg-gradient-to-r from-gold via-ember to-violet lg:block"
            />
            {phases.map(([title, body], i) => (
              <Reveal as="li" key={title} delay={i * 100} className="relative lg:text-center">
                <div className="flex items-center gap-4 lg:block">
                  <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line bg-surface font-display text-callout font-semibold text-accent-text lg:mx-auto">
                    {i + 1}
                  </span>
                  <div className="lg:mt-6">
                    <p className="text-footnote font-semibold tracking-[0.06em] text-fg-2 uppercase">Phase {i + 1}</p>
                    <h3 className="text-headline">{title}</h3>
                  </div>
                </div>
                <p className="mt-3 text-callout text-fg-2 lg:mx-auto lg:max-w-[13rem]">{body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Get involved */}
      <section id="contact" className="bg-bg px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto grid max-w-[1100px] gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="text-body font-semibold text-fg-2">Get involved</p>
            <h2 className="mt-2 font-display text-display">
              Help us reach
              <br />
              <span className="text-brand">every child.</span>
            </h2>
            <p className="mt-5 max-w-[28rem] text-lede text-pretty text-fg-2">
              We are looking for founding contributors, education partners and pilot communities. Not every way to help
              involves code.
            </p>
            <ul className="mt-8 space-y-3">
              {ways.map((w) => (
                <li key={w} className="flex gap-3 text-body">
                  <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-gold to-ember" />
                  {w}
                </li>
              ))}
            </ul>
            <ul className="mt-10 space-y-3 text-body">
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
          <Reveal delay={120} className="self-start rounded-[28px] bg-bg-alt p-6 sm:p-10">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
