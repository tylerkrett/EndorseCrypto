import type { Metadata } from "next";
import Link from "next/link";
import { Tag } from "~/components/ui/tag";
import { lessons } from "~/lessons/lessons";
import { factSheets } from "~/lessons/sources";
import { STATIC_PAGES } from "~/lib/pages";
import { CHECKED_ON } from "~/lib/site";

export const metadata: Metadata = {
	title: STATIC_PAGES.sources.title,
	description: STATIC_PAGES.sources.description,
	alternates: { canonical: STATIC_PAGES.sources.path },
};

const STEPS = [
	[
		"Every claim has a source",
		"Each lesson has a fact sheet listing every claim it makes and the page that supports it. Claims without a source are left out.",
	],
	[
		"Primary sources first",
		"We prefer the original: regulators, official documentation, protocol specifications and published data. A claim we have only seen reported second-hand stays out until we have read the original.",
	],
	[
		"Figures carry a date",
		'Numbers that change, such as market sizes and fees, are shown with an "as of" date. We recheck them and update the date.',
	],
	[
		"Corrections are listed",
		"When we find a mistake, we fix it and record the correction on the lesson and on this page.",
	],
] as const;

export default function SourcesPage() {
	const total = Object.values(factSheets).reduce(
		(n, s) => n + s.claims.length,
		0,
	);
	return (
		<div className="container-page flex flex-col gap-16 pt-14 pb-24 md:pt-20">
			<div className="flex max-w-[820px] flex-col gap-4">
				<p className="eyebrow text-brand-on">Sources and corrections</p>
				<h1 className="display-section">True, or it does not go in.</h1>
				<p className="text-[17px] text-muted">
					The ten lessons make {total} factual claims. Every one is listed below
					with its source. All were last checked on {CHECKED_ON}.
				</p>
			</div>

			<section
				aria-labelledby="how-we-check"
				className="scroll-mt-24"
				id="how-we-check"
			>
				<h2 className="display-h3 mb-6">How we check facts</h2>
				<ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{STEPS.map(([t, b], i) => (
						<li
							className="flex flex-col gap-3 rounded-[20px] border border-line bg-surface p-6"
							key={t}
						>
							<span className="eyebrow text-brand-on">0{i + 1}</span>
							<span className="font-display font-semibold text-[17px]">
								{t}
							</span>
							<span className="text-[15px] text-muted">{b}</span>
						</li>
					))}
				</ol>
			</section>

			<section aria-labelledby="corrections" className="flex flex-col gap-3">
				<h2 className="display-h3" id="corrections">
					Corrections
				</h2>
				<p className="text-[15px] text-muted">None yet.</p>
			</section>

			<section aria-labelledby="by-lesson" className="flex flex-col gap-8">
				<h2 className="display-h3" id="by-lesson">
					Sources by lesson
				</h2>
				{lessons.map((l) => {
					const sheet = factSheets[l.slug];
					if (!sheet) return null;
					return (
						<details
							className="group rounded-[20px] border border-line bg-surface p-6"
							key={l.slug}
						>
							<summary className="flex cursor-pointer list-none flex-wrap items-center gap-3">
								<Tag>Lesson {String(l.number).padStart(2, "0")}</Tag>
								<span className="font-display font-semibold text-[17px]">
									{l.title}
								</span>
								<span className="mono-tag text-dim">
									{sheet.claims.length} claims · {sheet.sources.length} sources
								</span>
							</summary>
							<ul className="mt-5 flex flex-col gap-3">
								{sheet.claims.map((c) => {
									const s = sheet.sources[c.source];
									return (
										<li
											className="flex flex-col gap-0.5 border-line border-t pt-3 text-[14px]"
											key={c.text}
										>
											<span className="text-fg">{c.text}</span>
											{s && (
												<a
													className="text-brand-on hover:underline"
													href={s.url}
													rel="noreferrer"
													target="_blank"
												>
													{s.title} · {s.publisher}
												</a>
											)}
										</li>
									);
								})}
							</ul>
							<Link
								className="mt-5 inline-block font-semibold text-[14px] text-brand-on hover:underline"
								href={`/learn/${l.slug}`}
							>
								Open the lesson
							</Link>
						</details>
					);
				})}
			</section>
		</div>
	);
}
