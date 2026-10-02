export const categories = [
  "All",
  "Flagship",
  "AI Agents & MCP",
  "Web3 & Blockchain",
  "Developer Tools",
] as const;

export type Category = Exclude<(typeof categories)[number], "All">;

export type Project = {
  name: string;
  repo: string;
  category: Category;
  language: string;
  summary: string;
  status: "Building" | "Contributing";
};

const gh = (repo: string) => `https://github.com/mawadao/${repo}`;

export const projects: (Project & { href: string })[] = (
  [
    {
      name: "MAWA Platform",
      repo: "mawadao",
      category: "Flagship",
      language: "TypeScript",
      summary:
        "Our own platform: a Next.js web app, an Electron desktop app, data pipelines and the cloud infrastructure behind them.",
      status: "Building",
    },
    {
      name: "Activepieces",
      repo: "activepieces",
      category: "AI Agents & MCP",
      language: "TypeScript",
      summary: "AI workflow automation with around 400 MCP servers ready for agents to use.",
      status: "Contributing",
    },
    {
      name: "Dify",
      repo: "dify",
      category: "AI Agents & MCP",
      language: "TypeScript",
      summary: "A platform for building LLM apps, from prototype to production.",
      status: "Contributing",
    },
    {
      name: "OpenManus",
      repo: "OpenManus",
      category: "AI Agents & MCP",
      language: "Python",
      summary: "An open-source general AI agent framework. No fortress, purely open ground.",
      status: "Contributing",
    },
    {
      name: "Browser Use Web UI",
      repo: "web-ui",
      category: "AI Agents & MCP",
      language: "Python",
      summary: "Let AI agents operate a real web browser through a simple interface.",
      status: "Contributing",
    },
    {
      name: "Agent Skills",
      repo: "skills",
      category: "AI Agents & MCP",
      language: "TypeScript",
      summary: "The open agent skills tool, for packaging and sharing what agents know how to do.",
      status: "Contributing",
    },
    {
      name: "n8n",
      repo: "n8n",
      category: "AI Agents & MCP",
      language: "TypeScript",
      summary: "Fair-code workflow automation with native AI capabilities.",
      status: "Contributing",
    },
    {
      name: "Hyperledger Iroha",
      repo: "iroha",
      category: "Web3 & Blockchain",
      language: "Rust",
      summary: "A fast, enterprise-grade decentralized ledger written in Rust.",
      status: "Contributing",
    },
    {
      name: "Besu",
      repo: "besu",
      category: "Web3 & Blockchain",
      language: "Java",
      summary: "An enterprise-grade, Apache 2.0 licensed Ethereum client.",
      status: "Contributing",
    },
    {
      name: "opencode",
      repo: "opencode",
      category: "Developer Tools",
      language: "TypeScript",
      summary: "The open-source coding agent that lives in your terminal.",
      status: "Contributing",
    },
    {
      name: "OpenUI",
      repo: "openui",
      category: "Developer Tools",
      language: "TypeScript",
      summary: "Describe a UI in plain words and watch it render live.",
      status: "Contributing",
    },
    {
      name: "Scrapling",
      repo: "Scrapling",
      category: "Developer Tools",
      language: "Python",
      summary: "An adaptive web scraping framework, from a single request to a full crawl.",
      status: "Contributing",
    },
    {
      name: "MoneyPrinterTurbo",
      repo: "MoneyPrinterTurbo",
      category: "Developer Tools",
      language: "Python",
      summary: "Generate HD short videos from a topic or keyword with an automated AI workflow.",
      status: "Contributing",
    },
  ] satisfies Project[]
).map((p) => ({ ...p, href: gh(p.repo) }));
