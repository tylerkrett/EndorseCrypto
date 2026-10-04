"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ButtonLink } from "~/components/ui/button";
import { Ring } from "~/components/ui/ring";
import { lessonBySlug, lessons } from "~/lessons/lessons";
import { cn } from "~/lib/cn";
import { useMotion } from "~/lib/prefs";
import { markComplete, useProgress } from "~/lib/progress";

import { GOTO_STEP } from "./lesson-player";

export function Quiz({ slug }: { slug: string }) {
	const lesson = lessonBySlug(slug);
	const [picked, setPicked] = useState<(number | null)[]>(() =>
		(lesson?.quiz ?? []).map(() => null),
	);
	const motion = useMotion();
	const done = useProgress();
	const allRight =
		!!lesson && lesson.quiz.every((q, i) => picked[i] === q.answer);

	useEffect(() => {
		if (allRight && lesson) markComplete(lesson.slug);
	}, [allRight, lesson]);

	if (!lesson) return null;
	const next = lessons.find((l) => l.number === lesson.number + 1);
	const doneCount = lessons.filter(
		(l) => done.includes(l.slug) || (l.slug === slug && allRight),
	).length;

	const replay = (step: number) => {
		if (motion === "on")
			window.dispatchEvent(new CustomEvent(GOTO_STEP, { detail: step }));
		else
			document
				.getElementById(`step-${step + 1}`)
				?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<section
			aria-labelledby="check-title"
			className="container-page snap-start scroll-mt-20 py-16 md:py-24"
			id="check"
		>
			<div className="mx-auto flex max-w-[760px] flex-col gap-8">
				<div className="flex flex-col gap-3">
					<p className="eyebrow text-brand-on">Quick check</p>
					<h2 className="display-section" id="check-title">
						Did it stick?
					</h2>
					<p className="text-[17px] text-muted">
						{lesson.quiz.length} questions. Get them right to complete the
						lesson.
					</p>
				</div>
				{lesson.quiz.map((q, qi) => {
					const choice = picked[qi];
					const answered = choice !== null && choice !== undefined;
					const right = choice === q.answer;
					return (
						<fieldset
							className="flex flex-col gap-3 rounded-[20px] border border-line bg-surface p-6 md:p-8"
							key={q.prompt}
						>
							<legend className="sr-only">Question {qi + 1}</legend>
							<p className="eyebrow text-dim">
								Question {qi + 1} of {lesson.quiz.length}
							</p>
							<p className="display-h3">{q.prompt}</p>
							<div className="mt-2 flex flex-col gap-2">
								{q.options.map((o, oi) => {
									const isPicked = choice === oi;
									return (
										<button
											aria-pressed={isPicked}
											className={cn(
												"flex items-center gap-3 rounded-[14px] border px-4 py-3.5 text-left font-medium text-[15px] transition-colors",
												isPicked &&
													right &&
													"border-tint-green-line bg-tint-green",
												isPicked &&
													!right &&
													"border-tint-red-line bg-tint-red",
												!isPicked &&
													"border-line bg-page hover:border-line-strong",
											)}
											key={o}
											onClick={() =>
												setPicked((p) => p.map((v, i) => (i === qi ? oi : v)))
											}
											type="button"
										>
											<span
												className={cn(
													"h-3.5 w-3.5 shrink-0 rounded-full border-[1.5px]",
													isPicked && right && "border-ok bg-ok",
													isPicked && !right && "border-bad bg-bad",
													!isPicked && "border-line-strong",
												)}
											/>
											{o}
										</button>
									);
								})}
							</div>
							{answered && (
								<div
									aria-live="polite"
									className="pop-in flex flex-col items-start gap-3 pt-1"
								>
									<p
										className={cn(
											"text-[15px]",
											right ? "text-ok" : "text-bad",
										)}
									>
										{right ? "Right. " : "Not quite. "}
										<span className="text-fg">{q.explain}</span>
									</p>
									{!right && (
										<button
											className="font-semibold text-[14px] text-brand-on underline underline-offset-4"
											onClick={() => replay(q.step)}
											type="button"
										>
											Show me step {q.step + 1} again
										</button>
									)}
								</div>
							)}
						</fieldset>
					);
				})}
				{allRight && (
					<div className="pop-in flex flex-col items-center gap-6 rounded-[28px] border border-line bg-panel p-8 text-center md:flex-row md:text-left">
						<Ring
							className="h-28 w-28 shrink-0"
							filled={doneCount}
							label={`${doneCount} of 10 lessons complete`}
						/>
						<div className="flex flex-1 flex-col gap-2">
							<p className="eyebrow text-ok">Lesson complete</p>
							<p className="display-h3">
								{doneCount} of 10 done. Your progress is saved in this browser.
							</p>
						</div>
						{next ? (
							<ButtonLink href={`/learn/${next.slug}`}>
								Lesson {next.number}
							</ButtonLink>
						) : (
							<ButtonLink href="/learn">All lessons</ButtonLink>
						)}
					</div>
				)}
				{!allRight && next && (
					<p className="text-[15px] text-muted">
						Or skip ahead to{" "}
						<Link
							className="font-semibold text-brand-on underline underline-offset-4"
							href={`/learn/${next.slug}`}
						>
							lesson {next.number}: {next.title}
						</Link>
						.
					</p>
				)}
			</div>
		</section>
	);
}
