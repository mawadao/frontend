# mawaDao — frontend

The website for [mawaDao](https://mawadao.com): **a non-profit, community-owned marketplace for responsible AI agents, built to bring quality education to underserved children and orphans.**

Developers build and list AI agents. Schools, orphanages, community educators and small businesses use them free of charge. The value created flows back to the community that built it, and the people affected by the platform decide how it is run, through a decentralised autonomous organisation (DAO).

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4. The design follows Apple's principles of clarity, deference and depth: system typography, generous whitespace, neutral surfaces, a single accent, frosted navigation, scroll reveals, and automatic light and dark mode.

## Pages

| Route     | What it is |
| --------- | ---------- |
| `/`       | Landing: mission, how it works, key features, **project catalog**, governance, child safety, who it is for, roadmap, get involved |
| `/login`  | Sign in (email, GitHub, wallet) |
| `/signup` | Create an account |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Editing content

- **Projects catalog:** `src/lib/projects.ts`
- **Site name, links, contact email:** `src/lib/site.ts`
- **Sections, roadmap and copy:** `src/app/page.tsx`
- **Design tokens (colors, fonts, motion):** `src/app/globals.css`

## Auth

Login and signup are **UI only** for now. Forms validate input, but `src/lib/auth.ts` returns a "coming soon" notice instead of creating accounts. To go live, replace the three functions in that file with a provider (Supabase, Auth.js, wallet sign-in, …). The pages only depend on its `AuthResult` contract.

The contact form has no backend either. It opens the visitor's mail app with the message prefilled and addressed to `site.email`.

## Contributing

Pick something, open a pull request, and say hi on [GitHub](https://github.com/mawadao). Not every contribution is code: reviewing agents for safety, translating content and connecting schools all count.

## Licence

Open source under the [Apache 2.0 Licence](LICENSE).
