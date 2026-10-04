# EndorseCrypto

Short, animated lessons that show beginners how crypto works and how it is used today.
Every claim is sourced and dated. Phase 1: a static site with no login, hosted free on
Cloudflare. See `plan.md` for the full plan.

## Stack

- T3: Next.js 15 (App Router), TypeScript, Tailwind v4, tRPC (scaffolded for Phase 2)
- three.js through React Three Fiber and drei for the lesson scenes
- Biome for lint and format, pnpm
- Cloudflare Workers through `@opennextjs/cloudflare`, the same setup as Himbad

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Next dev server |
| `pnpm build` | Production Next build |
| `pnpm preview` | Cloudflare build, then a local server on the real Workers runtime |
| `pnpm deploy` | Cloudflare build and deploy |
| `pnpm typecheck` / `pnpm check` | Type check / Biome lint and format check |
| `pnpm seo:audit --url <site>` | SEO and AI-discovery audit of every page; add `--lighthouse` for scores, `--json` for agents. Exits 1 on errors |

## Deploying to Cloudflare

1. `pnpm exec wrangler login` (once).
2. `pnpm preview` and check the site.
3. `pnpm deploy`. The site goes live at `endorsecrypto.<your-subdomain>.workers.dev`.
4. To use endorsecrypto.com, add the domain to your Cloudflare account, then uncomment the
   `routes` block in `wrangler.jsonc` and deploy again.
5. Optional: push to GitHub with the secrets `CLOUDFLARE_API_TOKEN` and
   `CLOUDFLARE_ACCOUNT_ID`, and `.github/workflows/deploy.yml` deploys every push to `main`.

Every page is prerendered, so the site runs on the Workers free plan.

## How the lessons work

Each lesson is plain data in `src/lessons/`:

- `lessons.ts`: the copy (steps, try-it control, quick check).
- `scenes.ts`: the scene, described once: the objects and what changes at each step.
- `sources.ts`: the fact sheet, with the source behind every claim.

The same scene description drives both views. `scene/canvas.tsx` renders it in 3D and
interpolates between steps as the learner scrolls. `scene/still.tsx` draws each step as an
isometric SVG for the static view, the lesson cards and the loading state. The 3D code
only downloads when animation is on.

## The truth rule

A claim goes into a lesson only with a source in that lesson's fact sheet. Figures that
change carry an "as of" date in the text. The research behind the lessons is in
`reports/Crypto uses in markets 2026.md` and `research_notes/`.

## SEO and AI discovery

- Every page has a title, description, canonical URL, Open Graph and Twitter tags and a share
  image (one per lesson). Titles and descriptions live in `src/lib/pages.ts`.
- Structured data (`src/lib/structured-data.ts`): Organization and WebSite on every page,
  Course on `/learn`, LearningResource with citations and BreadcrumbList on each lesson, and
  FAQPage for the home page questions (`src/lib/faq.ts`).
- `/llms.txt` and `/llms-full.txt` describe the site and every lesson, with sources, for AI
  assistants.
- `/mcp` is a small read-only MCP server (Streamable HTTP) with `list_lessons`, `get_lesson`,
  `get_sources` and `search_lessons`. Discovery: `/.well-known/ai-catalog.json` and
  `/mcp/server-card`.
- `pnpm seo:audit` checks all of this, plus links, headings and image alt text, and can run
  Lighthouse on every page.
