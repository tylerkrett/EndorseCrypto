"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";

import { Tag } from "~/components/ui/tag";
import { lessonBySlug } from "~/lessons/lessons";
import { resolve } from "~/lessons/scene/model";
import { SceneStill } from "~/lessons/scene/still";
import { scenes } from "~/lessons/scenes";
import { cn } from "~/lib/cn";
import { hasWebGL, useEngaged, useMotion } from "~/lib/prefs";

const SceneCanvas = dynamic(() => import("~/lessons/scene/canvas"), {
	ssr: false,
});

const STEPS = [0, 1, 2, 3];
const HOLD = 3200;

/** Lesson 1 playing on its own, a step every few seconds, while it is on screen. */
export function LessonPreview() {
	const lesson = lessonBySlug("blockchain");
	const resolved = useMemo(() => {
		const build = scenes.blockchain;
		return build ? resolve(build(0)) : null;
	}, []);
	const motion = useMotion();
	const [webgl, setWebgl] = useState(false);
	const [visible, setVisible] = useState(false);
	const [step, setStep] = useState(1);
	const progress = useRef(1);
	const box = useRef<HTMLDivElement>(null);

	useEffect(() => setWebgl(hasWebGL()), []);
	useEffect(() => {
		const el = box.current;
		if (!el) return;
		const io = new IntersectionObserver((e) =>
			setVisible(e.some((x) => x.isIntersecting)),
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);
	const engaged = useEngaged();
	const live = motion === "on" && webgl && engaged;
	const playing = live && visible;
	useEffect(() => {
		if (!playing) return;
		const id = window.setInterval(() => {
			setStep((s) => {
				const next = STEPS[(STEPS.indexOf(s) + 1) % STEPS.length] ?? 0;
				progress.current = next;
				return next;
			});
		}, HOLD);
		return () => window.clearInterval(id);
	}, [playing]);

	if (!lesson || !resolved) return null;
	const current = lesson.steps[step];
	return (
		<div
			className="overflow-hidden rounded-[28px] border border-line bg-surface"
			ref={box}
		>
			<div className="flex items-center justify-between px-6 pt-5">
				<span className="eyebrow text-dim">
					Lesson 01 / What is a blockchain?
				</span>
				<Tag tone="green">{playing ? "Playing" : "Preview"}</Tag>
			</div>
			<div className="relative h-[320px] md:h-[360px]">
				{live ? (
					<SceneCanvas
						active={visible}
						progress={progress}
						resolved={resolved}
						step={step}
					/>
				) : (
					<div className="flex h-full items-center justify-center p-6">
						<SceneStill
							label="Four blocks linked into a chain"
							resolved={resolved}
							step={1}
						/>
					</div>
				)}
			</div>
			<div className="flex flex-col gap-3 border-line border-t px-6 py-5">
				<div className="flex gap-1.5">
					{STEPS.map((s) => (
						<span
							className={cn(
								"h-1 flex-1 rounded-full transition-colors duration-500",
								s <= step ? "bg-brand" : "bg-surface-2",
							)}
							key={s}
						/>
					))}
				</div>
				<p className="font-display font-semibold text-[16px]" key={step}>
					<span className="pop-in inline-block">{current?.title}</span>
				</p>
			</div>
		</div>
	);
}
