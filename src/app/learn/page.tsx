import type { Metadata } from "next";

import { LessonCard, PlannedCard } from "~/components/lesson/lesson-card";
import { ProgressRing } from "~/components/lesson/progress-bits";

import { JsonLd } from "~/components/site/json-ld";
import { lessons } from "~/lessons/lessons";
import { STATIC_PAGES } from "~/lib/pages";
import { courseGraph } from "~/lib/structured-data";

export const metadata: Metadata = {
	title: STATIC_PAGES.learn.title,
	description: STATIC_PAGES.learn.description,
	alternates: { canonical: STATIC_PAGES.learn.path },
};

export default function LearnPage() {
	return (
		<section className="container-page flex flex-col gap-12 pt-14 pb-24 md:pt-20">
			<JsonLd graph={[courseGraph()]} />
			<div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
				<div className="flex max-w-[820px] flex-col gap-4">
					<p className="eyebrow text-brand-on">Lessons</p>
					<h1 className="display-section">
						Ten lessons on how crypto is used today.
					</h1>
					<p className="text-[17px] text-muted">
						Three to five minutes each. Every one ends with what can go wrong,
						and lists the sources behind every claim.
					</p>
				</div>
				<ProgressRing />
			</div>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{lessons.map((l) => (
					<LessonCard heading="h2" key={l.slug} lesson={l} />
				))}
				<PlannedCard
					heading="h2"
					summary="How the common scams work, step by step, and how to check a firm on the FCA Register."
					title="Staying safe from scams"
				/>
				<PlannedCard
					heading="h2"
					summary="When tax applies, including on swaps, and what platforms now report to HMRC."
					title="Crypto and UK tax"
				/>
			</div>
		</section>
	);
}
