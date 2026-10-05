# mawaDao — frontend

The website for [mawaDao](https://mawadao.com): **a non-profit, community-owned marketplace for responsible AI agents, built to bring quality education to underserved children and orphans.**

Developers build and list AI agents. Schools, orphanages, community educators and small businesses use them free of charge. The value created flows back to the community that built it, and the people affected by the platform decide how it is run, through a decentralised autonomous organisation (DAO).

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4. The design follows Apple's principles of clarity, deference and depth: system typography, generous whitespace, neutral surfaces, a single accent, frosted navigation, scroll reveals, and automatic light and dark mode.

## Pages

| Route     | What it is |
| --------- | ---------- |
| `/`       | Landing: mission, how it works, key features, **project catalog**, governance, child safety, who it is for, roadmap, get involved |
| `/login`  | Sign in with Google or GitHub |
| `/signup` | Create an account with Google or GitHub |
| `/onboarding` | First sign-in only: choose a username, country and role |

## Getting started

```bash
npm install
cp .env.example .env.local   # then add your Supabase URL and publishable key
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Editing content

- **Projects catalog:** `src/lib/projects.ts`
- **Site name, links, contact email:** `src/lib/site.ts`
- **Sections, roadmap and copy:** `src/app/page.tsx`
- **Design tokens (colors, fonts, motion):** `src/app/globals.css`

## Auth

Accounts use [Supabase Auth](https://supabase.com/docs/guides/auth) with Google and GitHub sign-in only.

1. The provider returns to `/auth/callback`, which exchanges the code for a session cookie.
2. A member without a row in `profiles` goes to `/onboarding` to choose a username, country and role (student, developer, open-source contributor, educator, organisation or funder). They also agree to the code of conduct there.
3. `src/proxy.ts` refreshes the session on each request. Pages check the user on the server with `getClaims()`.

The database (the `profiles` table, its row-level security and the local Supabase stack) lives in [mawadao/supabase](https://github.com/mawadao/supabase). Its README covers local development and production setup.

For local development, run the Supabase stack, then put the URL and publishable key that `npx supabase start` prints into `.env.local`. For Docker, pass the production values as build args.

The contact form has no backend either. It opens the visitor's mail app with the message prefilled and addressed to `site.email`.

## Contributing

Pick something, open a pull request, and say hi on [GitHub](https://github.com/mawadao). Not every contribution is code: reviewing agents for safety, translating content and connecting schools all count.

## Licence

Open source under the [Apache 2.0 Licence](LICENSE).
