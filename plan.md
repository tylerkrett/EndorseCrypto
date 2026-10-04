# EndorseCrypto: build plan

Status: Phase 1 built, 4 October 2026. The site, all ten lessons and the Cloudflare setup are in this repo and ready to deploy (see `README.md`).

## Built so far

- **Pages:** home (with the ring hero), the lesson list, ten lesson pages, sources and corrections, about (with the risk warning and privacy), a sitemap and a share image.
- **Lessons:** each plays as a scroll-driven 3D scene with Next and Back buttons, arrow keys, a try-it control, a two-question quick check that can replay the step behind a wrong answer, and a sources list. Progress is saved in the browser and fills the ring.
- **Two views:** the animation switch in the nav swaps every lesson to a plain page of still pictures. The pictures are drawn from the same scene data as the 3D, so the two always match, and the 3D code never downloads when animation is off.
- **Look:** dark theme by default. The 3D scenes have lighting and reflections, rounded blocks with glowing edges, polished coins, soft shadows, a dotted floor, data packets moving along chain links and drifting particles. The static pictures have matching shading and shadows. Lesson 1's try-it is a live demo: edit a payment and its real SHA-256 fingerprint changes, breaking the chain.
- **Facts:** every claim in the ten lessons is in a fact sheet with its source (107 claims). A fact-check against the research changed 11 sentences.
- **Checked:** type-check, lint, the production build and the Cloudflare build all pass. Every route was tested on Cloudflare's local runtime, in both themes and both views, at desktop and phone widths.

Changes from the plan below:

- The hero is the ring from the cover, as you asked, not a 3D preview.
- Smooth scrolling uses the browser's own scroll snapping rather than Lenis and Motion: fewer moving parts, and the step-by-step snapping works the same on phones.
- No bloom glow in the 3D; a soft CSS glow sits behind each scene instead.
- The still pictures are drawn as SVG from the scene data, not captured by a script.

Changes in this draft: there are ten lessons, chosen from research into how crypto is used in today's markets. Every claim must be true and sourced or it is not used. The look comes from your logo pack. The design, including ten animated storyboards, is in Figma.

## Review these first

- **Figma design plan:** https://www.figma.com/design/Wm7zFO3hKamGLLVP4lXqfX
- **Research report:** `reports/Crypto uses in markets 2026.md`, with the notes behind it in `research_notes/Crypto uses in markets 2026/`

The Figma file has four pages:

| Page | What is on it |
|---|---|
| Cover | What the file contains and what is still draft |
| Foundations | Light and dark colour tokens, type styles, components |
| Screens | Home in dark and light, the lesson page in its animated and static views, and two phone screens |
| Lesson animations | Ten animated storyboards, one per lesson. Select a frame and press play in the timeline |

## What we are building

A website that teaches complete beginners how crypto works and how it is used today, through short animated 3D lessons. It is the first stage of a longer path towards a buy-and-swap product and, eventually, managed portfolios.

Confirmed:

- The brand is EndorseCrypto and the site lives at EndorseCrypto.com. You own the domain.
- The business will be registered as a UK limited company (Ltd).
- The stack is T3, with Prisma as the database tool.
- Lessons play by scrolling, with Next and Back buttons as well.
- The site has two views, animated and static, with a switch between them, as on Himbad.
- Phase 1 has no login. Login is documented below and built in Phase 2.
- There are ten lessons, based on how crypto is used in today's markets.
- Everything taught must be true and sourced, or it is not used.
- The design is reviewed in Figma before implementation starts.

Assumptions (tell me if any are wrong):

- This is a new business with no clients or FCA registration yet.
- The audience is UK adults who are new to crypto.

## Two words used in this plan

- A **stage** is a step in the business: learn, then buy and swap, then manage.
- A **phase** is a step in the build. Stage 1 is built in two phases.

## The business path, in three stages

| Stage | What you offer | What you need first | How you earn |
|---|---|---|---|
| 1. Learn, track, practise | Animated lessons, a portfolio tracker, a UK tax summary, a practice swap screen using pretend money | No licence as far as I can tell, provided the content educates rather than sells; a lawyer should confirm | Free to build an audience, with a paid tier later |
| 2. Buy and swap for real | The practice screen goes live: buy with pounds through a regulated partner, then swap at the best market price | A regulated partner to approve your marketing, and advice on FCA registration | A small fee per trade |
| 3. Manage | Model portfolios, advice, managed accounts | Your own FCA authorisation | Advisory or management fees |

## The build, in two phases

| | Phase 1 | Phase 2 |
|---|---|---|
| What ships | The site and the ten animated lessons | Accounts, then the tracker, practice swap and tax summary |
| Login | None | Email link and Google sign-in |
| Database | None | Postgres, through Prisma |
| Progress saved | In the visitor's browser | In their account, on any device |
| Hosting | Cloudflare, free, set up like Himbad | Fly.io, set up like theWyze |
| When | Now | When your colleague is ready |

The code stays portable between the two hosts: Phase 1 uses no Cloudflare-only features, so moving to Fly.io is a change of configuration and DNS. The domain's DNS can stay on Cloudflare throughout.

## The truth rule

Every claim in a lesson is true and sourced, or it is left out.

- **Each lesson has a fact sheet.** It lists every claim the lesson makes, the source, and the date the source was checked.
- **Figures that change carry an "as of" date** on screen, for example "about $14.8 billion as of 4 October 2026".
- **Anything not verified is not taught.** The research report marks which findings rest on secondary sources. Those stay out until someone has read the primary source.
- **Every lesson shows what can go wrong,** not only how the thing works.
- **Each lesson page shows its sources and the date it was last checked,** and lists any corrections.
- **Wording in the Figma storyboards is draft.** It becomes final only when its fact sheet is signed off.

The research covered six areas: stablecoins and payments, Bitcoin and institutional holding, trading venues, lending with staking and tokenised assets, the technical mechanics, and the UK context. Two things it flagged for a lawyer are listed under "Decisions for you".

## Look and layout

The structure follows theWyze. The brand comes from your logo pack.

- **Colours from the logo:** brand blue `#00A4FF` and the dark background `#05080D`. Every other colour is derived from these two and exists as a named token with a light value and a dark value.
- **Light and dark themes.** Dark is the default. Visitors can switch to light with the toggle in the nav, and the site remembers their choice. The theme is applied before the page paints, so there is no flash.
- **Buttons are brand blue with near-black text.** White text on this blue is too hard to read.
- **Type:** Sora for headlines, Geist for body text and Geist Mono for small labels. This is a new pairing, so the site does not look like theWyze. It is easy to change.
- **Layout system from theWyze:** a 1280px column with 80/40/20px gutters, page bands with generous vertical space, alternating page and panel backgrounds, cards with a faint outline and 20px corners, and a sticky translucent nav.
- **Hero shape from theWyze:** copy on the left and a live visual in a card on the right. Here the visual is a 3D lesson preview.
- **The ring:** a ten-segment progress ring that echoes the ring in your logo. One segment fills for each lesson completed.
- **Logo use:** the nav uses the icon and the wordmark without the "Crypto Portfolio Management" tagline. See "Decisions for you".

Home page sections, in order: hero, how a lesson works, the ten lessons, how we keep it honest, and a closing panel that starts lesson 1.

## The lessons

### How a lesson works

- **One continuous 3D scene, played by scrolling.** The scene is pinned to the screen. As the learner scrolls, objects build, move and change, and the camera travels to a new viewpoint for each step. This is the technique behind the umbrella story in LotusUmbrella.
- **Scrolling settles on each step,** so nobody is left half-way through an animation. On phones one swipe is one step, as in Himbad. Arrow keys and Next and Back buttons do the same.
- **Labels live inside the scene** and follow the parts they name. A short text card for the current step sits beside the scene.
- **The scene stays alive when the learner stops:** objects float, coins keep flowing along their paths.
- **At least one hands-on step per lesson,** where the learner taps or drags and the scene reacts.
- **A quick check of 2 or 3 questions ends the lesson.** A right answer plays a short celebration in the scene; a wrong answer replays the moment that explains it.
- **Both themes:** every scene has a light and a dark version, and the dark one adds glow.
- A lesson takes 3 to 5 minutes.

### Two views: animated and static

This works the way Himbad's animation switch does.

- **A switch in the nav,** beside the theme toggle, turns animation on or off. The choice is remembered.
- **The starting view follows the device.** A visitor whose device asks for reduced motion starts in the static view, and can still switch animation on.
- **The static view is the same lesson as a plain page:** each step is a still picture with its text, in order, with no 3D and no smooth scrolling. The 3D code is never downloaded.
- **Hands-on steps stay hands-on** in the static view, through ordinary controls.
- **The still pictures are captured from the 3D scenes** by a script, in both themes, so the two views always match.
- A browser that cannot run 3D gets the static view automatically.

### Animation outside the lessons

- The home hero shows a live 3D preview of lesson 1 that reacts to the pointer.
- Sections fade and rise into view on scroll, as on theWyze.
- Lesson cards play a short looping preview on hover.
- Finishing a lesson fills its segment of the progress ring.

### The ten lessons

Each one has an animated storyboard in Figma.

| # | Lesson | What the learner sees | What the learner can do | What can go wrong |
|---|---|---|---|---|
| 1 | What is a blockchain? | Records fill a block, the block gets a fingerprint, and new blocks link on | Change a record and watch every later link stop matching | Blockchains have been rewritten in rare cases; "cannot be changed" is too strong |
| 2 | Keys and wallets | A secret key, the address worked out from it, and a coin recorded on the chain | Deal out the recovery phrase and see what it controls | Anyone who gets the recovery phrase controls the coins |
| 3 | Sending a payment | A signed payment joins a queue, is picked into a block, and gains confirmations | Pick a fee and see how it changes the wait | A confirmed payment cannot be undone |
| 4 | Bitcoin | The block reward halving from 50 to 3.125, and supply filling towards its cap | Step through the halvings | The price has fallen by more than three quarters from a peak several times |
| 5 | Stablecoins | Dollars in, tokens out, reserves behind them, and the price holding at one dollar | Redeem tokens and watch the reserves fall | The peg can break, as in 2022 and 2023 |
| 6 | Exchanges | An order book matching a buyer with a seller, then coins held in the exchange's wallets | Place an order that matches | The exchange holds the keys; if it fails, customers can be locked out |
| 7 | Swaps and pools | A pool of two tokens repricing itself as one is added and the other removed | Drag a slider to change the size of the swap | Bigger swaps get a worse price |
| 8 | Staking | Validators locking a deposit, voting on a block, and earning rewards | Make one validator break the rules | Part of the deposit is destroyed, and withdrawals queue |
| 9 | Lending and borrowing | Collateral in, a smaller loan out, and a health bar | Drag the price down until the loan is liquidated | Liquidation is automatic |
| 10 | Tokenised assets | A fund holding ordinary assets and issuing tokens that record shares in it | Move a token between approved wallets | Often limited to professional investors |

Planned next, outside the ten: staying safe from scams, and crypto and UK tax. The research already covers both.

Build order: lesson 1 first, as the template. You review it. Then the rest in order.

### Wording rules

These keep Stage 1 as education and outside regulated activity.

- Educate, don't sell: no "buy" buttons, no links that earn commission, no tips on what to buy, no price predictions.
- Lessons use example numbers unless a real figure is sourced and dated.
- Every page carries a plain risk note.
- The footer shows the company's registered name, company number and registered office once the Ltd exists. UK law requires this on a limited company's website.
- A lawyer reads the public wording before launch.

## Technology for Phase 1

| Piece | Choice | Why |
|---|---|---|
| Framework | T3 stack: Next.js (App Router), TypeScript, Tailwind v4, tRPC | Your decision, and the same base as Himbad and LotusUmbrella |
| Package manager | pnpm | All three of your projects use it |
| Lint and format | Biome | LotusUmbrella and theWyze use it |
| 3D | three.js, through React Three Fiber and drei | As in Himbad and LotusUmbrella |
| Scroll and interface animation | Motion for scroll progress and transitions, Lenis for smooth scrolling | Motion drives the LotusUmbrella story; Lenis drives Himbad |
| Glow | Bloom post-processing, on capable devices only | As in Himbad |
| Themes | Colour tokens as CSS variables, with a toggle in the nav | theWyze's approach, rebuilt in Tailwind; the Figma tokens carry the same names |
| Animated and static views | An animation switch that starts from the device setting and that the visitor can override | Himbad's approach |
| Lesson content | TypeScript files in the repo, each with its fact sheet | Simple and reviewed like code |
| Hosting | Cloudflare, through OpenNext, with every page built ahead of time | Himbad's setup |

tRPC is scaffolded in Phase 1 but has nothing to serve until Phase 2.

Performance rules, taken from Himbad and LotusUmbrella: the 3D code loads only when it is needed, the resolution adapts to the device's speed, and a scene pauses when it is off screen.

Project layout:

```
src/
  app/
    page.tsx              home page
    learn/page.tsx        list of lessons with the progress ring
    learn/[slug]/page.tsx one lesson
  lessons/
    index.ts              the lesson list: titles, steps, quick-check questions
    engine/               scroll driver, camera keyframes, labels, static view
    blockchain/           timeline, 3D scene and fact sheet for lesson 1
    wallets/              timeline, 3D scene and fact sheet for lesson 2
    ...
  components/             nav, footer, theme toggle, animation switch, layout and type primitives
  styles/                 theme tokens for light and dark
  server/                 tRPC (used from Phase 2)
```

## Hosting and cost

Prices are in US dollars, read from each provider's own pricing pages on 4 October 2026. Fly.io quotes them for a US region; London may differ slightly.

### Phase 1: Cloudflare, free

- Himbad's setup fits Cloudflare's free plan: pages are built ahead of time and served as static files, and requests for static files are free and unlimited.
- The free plan allows 100,000 page requests a day through the worker, which is far more than a new site needs.
- If the site outgrows that, Cloudflare's paid plan is the next step up.

### Phase 2: Fly.io, cheap but not free

- Fly.io has no free tier. A new account gets a trial of 2 hours of machine time or 7 days, whichever ends first.
- **The app:** a shared-CPU machine running all month costs $3.69 with 512MB of memory or $6.70 with 1GB. theWyze runs on 1GB.
- **The database** is the larger cost, and there are three options:

| Option | Cost | Trade-off |
|---|---|---|
| Fly.io Managed Postgres | From $38 a month | Fly.io runs it and backs it up |
| Postgres on your own Fly.io machine | A few dollars a month | You look after backups and upgrades; Fly.io calls this unsupported |
| An outside Postgres host with a free tier, such as Neon or Supabase | Free to start (check current terms) | The database sits with a second provider |

- **Other costs:** outgoing data is $0.02 per GB, and a shared address is free.
- Expect roughly $4 to $7 a month for the app, plus the database option you choose.

## Phase 2: accounts and login

This section documents the design. None of it is built in Phase 1.

- **What accounts are for:** progress that follows the learner across devices, and later the portfolio tracker and the practice swap.
- **How people sign in:** a link sent to their email, with no password, and Google sign-in. Passkeys can follow. Signing in with a crypto wallet belongs to Stage 2.
- **Library:** Better Auth is my recommendation; NextAuth is the alternative. T3's scaffolder offers both. NextAuth is in maintenance mode, with security fixes only, and its maintainers recommend Better Auth for new projects. You already use Better Auth in LotusUmbrella.
- **Database:** Postgres through Prisma, the same locally and in production. Prisma's support for Cloudflare's own database (D1) is still marked preview in Prisma's docs, which is one more reason Phase 2 runs on Fly.io.
- **What is stored:** the login library's own tables (user, session, account, verification), plus one table of lesson progress: which lesson, when it was completed, and the quick-check score.
- **Moving from Phase 1:** at first sign-in, the progress saved in the browser is copied into the account.
- **Server code:** tRPC procedures to read and save progress, open only to the signed-in user.
- **Security:** no passwords are stored, sessions live in cookies that scripts cannot read, and sign-in attempts are rate limited.
- **What it needs:** an email-sending service, the Postgres database, and the Fly.io server.
- **Legal steps before it goes live:** a privacy policy, and registration with the ICO (the UK data regulator), because the company will then hold personal data.

## Milestones

Before any code:

0. **Design review.** You review the Figma file and the research report, and say what to change.

Phase 1:

1. **Foundation.** T3 app scaffolded; the Figma colour tokens and type styles as CSS; the theme toggle and animation switch; layout primitives; nav and footer.
2. **Lesson engine and lesson 1.** Pinned 3D scene, scroll-driven timeline with settling, Next and Back buttons, camera keyframes, in-scene labels, the hands-on step, the quick check, the sources panel, and the static view with its captured stills. Review point: you check the teaching style and both views before I build more.
3. **Home page.** Hero with the live 3D preview, the sections, the progress ring, reveal animations.
4. **Lessons 2 to 5,** each with a signed-off fact sheet.
5. **Lessons 6 to 10,** each with a signed-off fact sheet.
6. **Launch on Cloudflare** at EndorseCrypto.com, after the lawyer has read the wording.

Phase 2, each with its own plan when the time comes:

7. **Move to Fly.io, add the database and login,** and save progress to accounts.
8. **Portfolio tracker, practice swap with pretend money, UK tax summary,** and the scams and tax lessons.

At each milestone I run the type-check, lint and production build, and view every page in a browser in both themes and both views, at desktop and phone widths.

## Decisions for you

Needed before code starts:

1. **The Figma design:** what would you change in the look, the screens or the animations?
2. **The ten lessons:** are these the right ten, in the right order?
3. **Fonts:** Sora, Geist and Geist Mono as shown in Figma, or something else?
4. **Tooling:** pnpm and Biome, as in your other projects. Change either?
5. **Wording rules and the truth rule:** anything you disagree with?

For your lawyer, both raised by the research:

6. **The logo tagline.** The logo reads "Crypto Portfolio Management", which describes a service the company is not yet authorised to offer. The design uses the icon and wordmark without it. Ask whether the tagline can appear on a Stage 1 site.
7. **The name.** Ask whether "Endorse" in the brand name affects the position that the site educates and does not promote.

Can wait until Phase 2:

8. **Login library:** Better Auth, as I recommend, or NextAuth?
9. **Database host:** which of the three options above?

## Not in this plan

- Real buying or swapping (Stage 2)
- Managed portfolios or advice (Stage 3)
- A mobile app
- Languages other than English
