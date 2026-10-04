"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Arrow, buttonClass } from "~/components/ui/button";
import { lessonBySlug } from "~/lessons/lessons";
import { type Resolved, resolve } from "~/lessons/scene/model";
import { SceneStill } from "~/lessons/scene/still";
import { scenes } from "~/lessons/scenes";
import type { Lesson } from "~/lessons/types";
import { cn } from "~/lib/cn";
import { hasWebGL, useEngaged, useMotion } from "~/lib/prefs";

import { TryItControl } from "./try-it";

// The 3D code loads only when the animated view is on and the browser can run it.
const SceneCanvas = dynamic(() => import("~/lessons/scene/canvas"), {
	ssr: false,
});

export const GOTO_STEP = "ec-goto-step";

const initialInput = (lesson: Lesson) =>
	lesson.tryIt.kind === "slider"
		? lesson.tryIt.initial
		: lesson.tryIt.kind === "hash"
			? 1
			: 0;

export function LessonPlayer({ slug }: { slug: string }) {
	const lesson = lessonBySlug(slug);
	const build = scenes[slug];
	const [input, setInput] = useState(() => (lesson ? initialInput(lesson) : 0));
	const resolved = useMemo(
		() => (build ? resolve(build(input)) : null),
		[build, input],
	);
	if (!lesson || !resolved) return null;
	return (
		<>
			<div className="motion-only">
				<AnimatedLesson
					input={input}
					lesson={lesson}
					resolved={resolved}
					setInput={setInput}
				/>
			</div>
			<div className="static-only">
				<StaticLesson
					input={input}
					lesson={lesson}
					resolved={resolved}
					setInput={setInput}
				/>
			</div>
		</>
	);
}

type ViewProps = {
	lesson: Lesson;
	resolved: Resolved;
	input: number;
	setInput: (v: number) => void;
};

function StepText({
	lesson,
	i,
	input,
	setInput,
	heading: Heading = "h2",
}: {
	lesson: Lesson;
	i: number;
	input: number;
	setInput: (v: number) => void;
	heading?: "h2" | "h3";
}) {
	const step = lesson.steps[i];
	if (!step) return null;
	return (
		<div className="flex flex-col gap-3">
			<p className={cn("eyebrow", step.risk ? "text-accent" : "text-brand-on")}>
				Step {i + 1} of {lesson.steps.length}
			</p>
			<Heading className="display-h3 text-fg">{step.title}</Heading>
			<p className="text-[16px] text-muted leading-relaxed md:text-[17px]">
				{step.body}
			</p>
			{lesson.tryIt.step === i && (
				<TryItControl
					className="mt-1"
					onChange={setInput}
					slug={lesson.slug}
					tryIt={lesson.tryIt}
					value={input}
				/>
			)}
		</div>
	);
}

function AnimatedLesson({ lesson, resolved, input, setInput }: ViewProps) {
	const n = lesson.steps.length;
	const section = useRef<HTMLElement>(null);
	const progress = useRef(0);
	const [step, setStep] = useState(0);
	const [active, setActive] = useState(false);
	const [webgl, setWebgl] = useState(false);
	const motion = useMotion();

	useEffect(() => setWebgl(hasWebGL()), []);

	// Snap to steps while scrolling a lesson.
	useEffect(() => {
		const root = document.documentElement;
		root.classList.add("lesson-snap");
		return () => root.classList.remove("lesson-snap");
	}, []);

	useEffect(() => {
		const el = section.current;
		if (!el) return;
		let raf = 0;
		const measure = () => {
			raf = 0;
			const r = el.getBoundingClientRect();
			const span = Math.max(1, r.height - window.innerHeight);
			const p = Math.min(1, Math.max(0, -r.top / span)) * (n - 1);
			progress.current = p;
			setStep(Math.min(n - 1, Math.round(p)));
		};
		const onScroll = () => {
			if (!raf) raf = requestAnimationFrame(measure);
		};
		measure();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		const io = new IntersectionObserver((e) =>
			setActive(e.some((x) => x.isIntersecting)),
		);
		io.observe(el);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			io.disconnect();
			if (raf) cancelAnimationFrame(raf);
		};
	}, [n]);

	const go = useCallback(
		(i: number) => {
			const el = section.current;
			if (!el) return;
			const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)")
				.matches;
			if (i >= n) {
				document
					.getElementById("check")
					?.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
				return;
			}
			const top =
				el.getBoundingClientRect().top +
				window.scrollY +
				Math.max(0, i) * window.innerHeight;
			window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
		},
		[n],
	);

	// Arrow keys step through the lesson while it is on screen.
	useEffect(() => {
		if (!active) return;
		const onKey = (e: KeyboardEvent) => {
			const t = e.target as HTMLElement | null;
			if (
				t &&
				(t.tagName === "INPUT" ||
					t.tagName === "TEXTAREA" ||
					t.isContentEditable)
			)
				return;
			if (e.key === "ArrowRight") {
				e.preventDefault();
				go(step + 1);
			} else if (e.key === "ArrowLeft") {
				e.preventDefault();
				go(step - 1);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [active, go, step]);

	// A wrong quiz answer can ask to replay a step.
	useEffect(() => {
		const onGoto = (e: Event) => go((e as CustomEvent<number>).detail);
		window.addEventListener(GOTO_STEP, onGoto);
		return () => window.removeEventListener(GOTO_STEP, onGoto);
	}, [go]);

	const engaged = useEngaged();
	const show3d = motion === "on" && webgl && engaged;
	const current = lesson.steps[step];

	return (
		<section
			aria-label={`${lesson.title}, animated`}
			className="relative"
			ref={section}
			style={{ height: `${n * 100}svh` }}
		>
			<div className="sticky top-0 h-svh pt-16 xl:pt-[72px]">
				<div className="container-page grid h-full grid-rows-[minmax(0,50fr)_minmax(0,50fr)] gap-4 py-4 md:grid-cols-[minmax(300px,400px)_minmax(0,1fr)] md:grid-rows-1 md:gap-10 md:py-8">
					<div className="relative min-h-0 overflow-hidden rounded-[28px] border border-line bg-panel md:order-2">
						<div className="pointer-events-none absolute inset-x-[10%] top-[30%] bottom-[10%] rounded-full bg-glow opacity-70 blur-[90px]" />
						{show3d ? (
							<div className="absolute inset-0">
								<SceneCanvas
									active={active}
									progress={progress}
									resolved={resolved}
									step={step}
								/>
							</div>
						) : (
							<div className="absolute inset-0 flex items-center justify-center p-6">
								<SceneStill
									className="max-h-full"
									label={current?.title ?? lesson.title}
									resolved={resolved}
									step={step}
								/>
							</div>
						)}
						<div className="pointer-events-none absolute inset-x-5 bottom-4 flex items-center justify-between gap-4">
							<span className="mono-tag text-dim">
								{lesson.example ?? "Scroll to play"}
							</span>
							<span className="hidden h-1 w-40 overflow-hidden rounded-full bg-surface-2 sm:block">
								<span
									className="block h-full rounded-full bg-brand transition-[width] duration-300"
									style={{ width: `${((step + 1) / n) * 100}%` }}
								/>
							</span>
						</div>
					</div>
					<div className="flex min-h-0 flex-col gap-4 overflow-y-auto md:order-1 md:justify-center">
						<div aria-hidden="true" className="flex gap-2">
							{lesson.steps.map((s, i) => (
								<span
									className={cn(
										"h-1 flex-1 rounded-full transition-colors md:max-w-14",
										i <= step
											? s.risk
												? "bg-accent"
												: "bg-brand"
											: "bg-surface-2",
									)}
									key={s.title}
								/>
							))}
						</div>
						<div
							aria-live="polite"
							className={cn(
								"rounded-[20px] border p-5 md:p-7",
								current?.risk
									? "border-tint-amber-line bg-tint-amber"
									: "border-line bg-surface",
							)}
							key={step}
						>
							<div className="pop-in">
								<StepText
									i={step}
									input={input}
									lesson={lesson}
									setInput={setInput}
								/>
							</div>
						</div>
						<div className="flex gap-3">
							<button
								className={buttonClass("ghost", "flex-1 md:flex-none")}
								disabled={step === 0}
								onClick={() => go(step - 1)}
								type="button"
							>
								Back
							</button>
							<button
								className={buttonClass("primary", "flex-1 md:flex-none")}
								onClick={() => go(step + 1)}
								type="button"
							>
								{step === n - 1 ? "Quick check" : "Next step"}
								<Arrow />
							</button>
						</div>
						<p className="hidden text-[13px] text-dim md:block">
							Scroll, swipe, use the arrow keys or press the buttons. The scene
							follows you.
						</p>
					</div>
				</div>
			</div>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-x-0 top-0"
			>
				{lesson.steps.map((s) => (
					<div className="h-svh snap-start" key={s.title} />
				))}
			</div>
		</section>
	);
}

function StaticLesson({ lesson, resolved, input, setInput }: ViewProps) {
	return (
		<section
			aria-label={`${lesson.title}, step by step`}
			className="container-page pb-8"
		>
			<ol className="flex flex-col gap-14 md:gap-20">
				{lesson.steps.map((s, i) => (
					<li
						className="grid scroll-mt-24 items-center gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-14"
						id={`step-${i + 1}`}
						key={s.title}
					>
						<div
							className={cn(
								"flex items-center justify-center rounded-[20px] border p-6",
								s.risk
									? "border-tint-amber-line bg-tint-amber"
									: "border-line bg-panel",
							)}
						>
							<SceneStill label={s.title} resolved={resolved} step={i} />
						</div>
						<StepText
							heading="h2"
							i={i}
							input={input}
							lesson={lesson}
							setInput={setInput}
						/>
					</li>
				))}
			</ol>
			{lesson.example && (
				<p className="mono-tag mt-10 text-dim">{lesson.example}</p>
			)}
		</section>
	);
}
