import { Faq } from "~/components/home/faq";
import { HeroRing } from "~/components/home/hero-ring";
import { LessonPreview } from "~/components/home/lesson-preview";
import { LessonCard, PlannedCard } from "~/components/lesson/lesson-card";
import { ProgressRing } from "~/components/lesson/progress-bits";
import { JsonLd } from "~/components/site/json-ld";
import { ButtonLink } from "~/components/ui/button";
import { Mark } from "~/components/ui/logo";
import { Reveal } from "~/components/ui/reveal";
import { Ring } from "~/components/ui/ring";
import { Chip } from "~/components/ui/tag";
import { lessons } from "~/lessons/lessons";
import { resolve } from "~/lessons/scene/model";
import { SceneStill } from "~/lessons/scene/still";
import { scenes } from "~/lessons/scenes";
import { factSheets } from "~/lessons/sources";
import { faqGraph } from "~/lib/structured-data";

const ICON = {
	check: "M20 6 9 17l-5-5",
	link: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
	calendar:
		"M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
	noCart:
		"M8 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM19 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM2 2l20 20M5.3 5H21l-1.7 8.4M16.6 16H8a2 2 0 0 1-2-1.6L4.3 4.7",
	pen: "M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",
};

function Icon({ d, className }: { d: string; className?: string }) {
	return (
		<svg
			aria-hidden="true"
			className={className ?? "h-5 w-5"}
			fill="none"
			viewBox="0 0 24 24"
		>
			<path
				d={d}
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			/>
		</svg>
	);
}

const RULES = [
	{
		t: "Sourced",
		b: "Every claim links to where it came from.",
		icon: ICON.link,
	},
	{
		t: "Dated",
		b: 'Each lesson shows when it was last checked. Figures that change carry an "as of" date.',
		icon: ICON.calendar,
	},
	{
		t: "No selling",
		b: "No buy buttons, no commission links and no tips on what to buy.",
		icon: ICON.noCart,
	},
	{
		t: "Corrected in the open",
		b: "When we get something wrong, we fix it and list the correction.",
		icon: ICON.pen,
	},
];

export default function HomePage() {
	const chain = scenes.blockchain;
	const original = chain ? resolve(chain(1)) : null;
	const changed = chain ? resolve(chain(0)) : null;
	const claims = Object.values(factSheets).reduce(
		(n, s) => n + s.claims.length,
		0,
	);
	const minutes = lessons.map((l) => l.minutes);
	const stats = [
		{ n: String(lessons.length), l: "short lessons" },
		{ n: String(claims), l: "claims, every one sourced" },
		{ n: `${Math.min(...minutes)}–${Math.max(...minutes)}`, l: "minutes each" },
		{ n: "0", l: "things to buy" },
	];

	return (
		<>
			{/* Hero */}
			<section className="relative overflow-hidden">
				<div className="dot-field pointer-events-none absolute inset-0" />
				<div className="pointer-events-none absolute top-[-20%] right-[-10%] h-[700px] w-[900px] rounded-full bg-glow opacity-60 blur-[160px]" />
				<div className="container-page relative grid items-center gap-12 pt-14 pb-16 md:pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-16 lg:pb-24 xl:pt-24">
					<div className="flex flex-col items-start gap-6">
						<p className="eyebrow inline-flex items-center gap-2.5 text-brand-on">
							<span className="relative flex h-2 w-2">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
								<span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
							</span>
							Crypto, explained by watching it work
						</p>
						<h1 className="display-hero">
							See how crypto{" "}
							<span className="bg-gradient-to-r from-brand to-brand-on bg-clip-text text-transparent">
								actually works.
							</span>
						</h1>
						<p className="max-w-[540px] text-[17px] text-muted leading-relaxed md:text-[19px]">
							Ten short, animated lessons for complete beginners. Plain English,
							no hype, and every claim sourced and dated.
						</p>
						<div className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row">
							<ButtonLink
								className="shadow-[0_10px_40px_-8px_var(--brand-blue)]"
								href="/learn/blockchain"
							>
								Start lesson 1
							</ButtonLink>
							<ButtonLink arrow={false} href="/learn" variant="ghost">
								See all ten lessons
							</ButtonLink>
						</div>
						<ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
							{["Free to use", "No account needed", "Nothing to buy"].map(
								(p) => (
									<li
										className="inline-flex items-center gap-2 font-medium text-[13px] text-muted"
										key={p}
									>
										<Icon className="h-4 w-4 text-ok" d={ICON.check} />
										{p}
									</li>
								),
							)}
						</ul>
					</div>
					<HeroRing />
				</div>
				{/* Topic strip */}
				<div className="marquee-mask relative overflow-hidden border-line border-y bg-panel/60 py-4">
					<div className="marquee flex w-max gap-3">
						{[...lessons, ...lessons].map((l, i) => (
							<a
								className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-surface px-4 py-2 font-medium text-[14px] text-muted transition-colors hover:border-tint-blue-line hover:text-fg"
								href={`/learn/${l.slug}`}
								key={`${l.slug}-${i < lessons.length ? "a" : "b"}`}
								tabIndex={i < lessons.length ? undefined : -1}
							>
								<span className="mono-tag text-brand-on">
									{String(l.number).padStart(2, "0")}
								</span>
								{l.title}
							</a>
						))}
					</div>
				</div>
			</section>

			{/* Figures */}
			<section className="container-page py-14 md:py-20">
				<Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-line bg-line md:grid-cols-4">
					{stats.map((s) => (
						<div className="flex flex-col gap-1 bg-page p-6 md:p-8" key={s.l}>
							<span className="font-display font-extrabold text-[40px] text-fg leading-none tracking-[-0.03em] md:text-[52px]">
								{s.n}
							</span>
							<span className="text-[14px] text-muted">{s.l}</span>
						</div>
					))}
				</Reveal>
			</section>

			{/* How a lesson works */}
			<section className="section-band scroll-mt-16 bg-panel" id="how-it-works">
				<div className="container-page flex flex-col gap-14">
					<div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
						<Reveal className="flex flex-col gap-4">
							<p className="eyebrow text-brand-on">How a lesson works</p>
							<h2 className="display-section">Watch it. Try it. Check it.</h2>
							<p className="max-w-[560px] text-[17px] text-muted leading-relaxed">
								A lesson takes three to five minutes. You scroll, the 3D scene
								plays, and you can stop on any step. This is lesson 1, playing
								on its own.
							</p>
						</Reveal>
						<Reveal>
							<LessonPreview />
						</Reveal>
					</div>
					<div className="grid gap-6 md:grid-cols-3">
						{[
							{
								n: "01",
								t: "Watch",
								b: "One 3D scene plays as you scroll. Each step is a couple of plain sentences beside it.",
								still: original,
								step: 1,
							},
							{
								n: "02",
								t: "Try",
								b: "Every lesson has a hands-on step. In lesson 1 you edit a payment and watch its real fingerprint change.",
								still: changed,
								step: 2,
							},
						].map((c, i) => (
							<Reveal
								className="group flex flex-col gap-3 rounded-[20px] border border-line bg-surface p-7 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-tint-blue-line hover:shadow-[0_24px_60px_-28px_var(--brand-blue)]"
								delay={i * 80}
								key={c.t}
							>
								<div className="flex h-[130px] items-center justify-center">
									{c.still && (
										<SceneStill
											className="max-h-full"
											label=""
											overlays={false}
											resolved={c.still}
											step={c.step}
										/>
									)}
								</div>
								<p className="eyebrow text-dim">{c.n}</p>
								<h3 className="display-h3">{c.t}</h3>
								<p className="text-[15px] text-muted">{c.b}</p>
							</Reveal>
						))}
						<Reveal
							className="flex flex-col gap-3 rounded-[20px] border border-line bg-surface p-7 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-tint-blue-line hover:shadow-[0_24px_60px_-28px_var(--brand-blue)]"
							delay={160}
						>
							<div className="flex h-[130px] flex-col justify-center gap-2">
								<span className="flex items-center gap-3 rounded-[12px] border border-tint-green-line bg-tint-green px-4 py-2.5 font-medium text-[14px]">
									<span className="h-3 w-3 rounded-full bg-ok" /> Its
									fingerprint
								</span>
								<span className="flex items-center gap-3 rounded-[12px] border border-line bg-page px-4 py-2.5 font-medium text-[14px] text-muted">
									<span className="h-3 w-3 rounded-full border-[1.5px] border-line-strong" />{" "}
									A copy of its payments
								</span>
							</div>
							<p className="eyebrow text-dim">03</p>
							<h3 className="display-h3">Check</h3>
							<p className="text-[15px] text-muted">
								Two quick questions at the end, with the sources behind every
								claim.
							</p>
						</Reveal>
					</div>
					<Reveal className="flex flex-col items-start gap-4 rounded-[14px] border border-line px-6 py-5 sm:flex-row sm:items-center">
						<span className="mono-tag inline-flex items-center gap-2 rounded-full border border-line px-3 py-2 text-dim">
							Animation off
						</span>
						<p className="text-[15px] text-muted">
							Prefer no motion? Switch animation off in the menu and every
							lesson becomes a plain page of still pictures and text. Devices
							set to reduce motion start that way.
						</p>
					</Reveal>
				</div>
			</section>

			{/* The ten lessons */}
			<section className="section-band">
				<div className="container-page flex flex-col gap-14">
					<Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
						<div className="flex max-w-[860px] flex-col gap-4">
							<p className="eyebrow text-brand-on">The ten lessons</p>
							<h2 className="display-section">
								How crypto is used today, one lesson at a time.
							</h2>
							<p className="max-w-[640px] text-[17px] text-muted">
								Start anywhere, though each lesson builds on the one before.
								Every lesson ends with what can go wrong.
							</p>
						</div>
						<ProgressRing />
					</Reveal>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{lessons.map((l) => (
							<LessonCard key={l.slug} lesson={l} />
						))}
						<PlannedCard
							summary="How the common scams work, step by step, and how to check a firm on the FCA Register."
							title="Staying safe from scams"
						/>
						<PlannedCard
							summary="When tax applies, including on swaps, and what platforms now report to HMRC."
							title="Crypto and UK tax"
						/>
					</div>
				</div>
			</section>

			{/* Honesty */}
			<section className="section-band relative overflow-hidden bg-panel">
				<div className="container-page relative flex flex-col gap-14">
					<div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
						<Reveal className="flex flex-col gap-4">
							<p className="eyebrow text-brand-on">How we keep it honest</p>
							<h2 className="display-section">True, or it does not go in.</h2>
							<p className="max-w-[640px] text-[17px] text-muted">
								Crypto is full of confident claims. These are the rules every
								lesson follows.
							</p>
						</Reveal>
						<Reveal>
							<a
								className="font-semibold text-[15px] text-brand-on hover:underline"
								href="/sources"
							>
								See all {claims} sources →
							</a>
						</Reveal>
					</div>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{RULES.map((r, i) => (
							<Reveal
								className="flex flex-col gap-4 rounded-[20px] border border-line bg-surface p-7 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-tint-blue-line"
								delay={i * 60}
								key={r.t}
							>
								<span className="inline-flex h-11 w-11 items-center justify-center rounded-[12px] border border-tint-blue-line bg-tint-blue text-brand-on">
									<Icon d={r.icon} />
								</span>
								<p className="eyebrow text-dim">Rule 0{i + 1}</p>
								<h3 className="font-display font-semibold text-[18px]">
									{r.t}
								</h3>
								<p className="text-[15px] text-muted">{r.b}</p>
							</Reveal>
						))}
					</div>
				</div>
			</section>

			{/* FAQ */}
			<section aria-labelledby="faq-title" className="section-band">
				<JsonLd graph={[faqGraph()]} />
				<div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
					<Reveal className="flex flex-col gap-4">
						<p className="eyebrow text-brand-on">Questions</p>
						<h2 className="display-section" id="faq-title">
							Before you start
						</h2>
						<p className="max-w-[440px] text-[17px] text-muted">
							The short answers. The lessons and the sources page have the long
							ones.
						</p>
					</Reveal>
					<Reveal>
						<Faq />
					</Reveal>
				</div>
			</section>

			{/* Closing panel */}
			<section className="section-band pt-0">
				<div className="container-page">
					<Reveal className="relative grid items-center gap-10 overflow-hidden rounded-[28px] border border-line bg-surface p-8 md:grid-cols-[minmax(0,1fr)_auto] md:p-16">
						<div className="dot-field pointer-events-none absolute inset-0 opacity-70" />
						<div className="pointer-events-none absolute top-[-20%] right-[-5%] h-[420px] w-[520px] rounded-full bg-glow opacity-70 blur-[120px]" />
						<div className="relative flex flex-col items-start gap-5">
							<p className="eyebrow text-brand-on">Ready when you are</p>
							<h2 className="display-section max-w-[620px]">
								Start with the first block.
							</h2>
							<p className="max-w-[520px] text-[17px] text-muted">
								Ten lessons, one segment of the ring each. Your progress is
								saved in this browser.
							</p>
							<div className="flex flex-col gap-3 pt-2 sm:flex-row">
								<ButtonLink
									className="shadow-[0_10px_40px_-8px_var(--brand-blue)]"
									href="/learn/blockchain"
								>
									Start lesson 1
								</ButtonLink>
								<ButtonLink arrow={false} href="/sources" variant="ghost">
									How we check facts
								</ButtonLink>
							</div>
						</div>
						<div className="relative mx-auto h-56 w-56 md:h-72 md:w-72">
							<Ring className="h-full w-full" filled={1} />
							<div className="absolute inset-[30%]">
								<Mark className="h-full w-full drop-shadow-[0_0_24px_var(--glow-blue)]" />
							</div>
							<Chip
								className="float-y absolute -bottom-2 left-1/2 -translate-x-1/2"
								meta="Lesson 01"
								title="Start here"
							/>
						</div>
					</Reveal>
				</div>
			</section>
		</>
	);
}
