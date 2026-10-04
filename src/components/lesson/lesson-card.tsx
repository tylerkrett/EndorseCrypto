import Link from "next/link";

import { Tag } from "~/components/ui/tag";
import { resolve } from "~/lessons/scene/model";
import { SceneStill } from "~/lessons/scene/still";
import { scenes } from "~/lessons/scenes";
import type { Lesson } from "~/lessons/types";

import { DoneTag } from "./progress-bits";

export function LessonCard({
	lesson,
	heading: H = "h3",
}: {
	lesson: Lesson;
	heading?: "h2" | "h3";
}) {
	const build = scenes[lesson.slug];
	const resolved = build
		? resolve(
				build(
					lesson.tryIt.kind === "slider"
						? lesson.tryIt.initial
						: lesson.tryIt.kind === "hash"
							? 1
							: 0,
				),
			)
		: null;
	return (
		<Link
			className="group flex flex-col overflow-hidden rounded-[20px] border border-line bg-surface transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-tint-blue-line hover:shadow-[0_28px_70px_-30px_var(--brand-blue)]"
			href={`/learn/${lesson.slug}`}
			prefetch={false}
		>
			<div className="relative flex h-[170px] items-center justify-center overflow-hidden bg-panel px-8 py-5">
				<div className="dot-field pointer-events-none absolute inset-0 opacity-60" />
				<div className="pointer-events-none absolute inset-x-10 top-6 bottom-2 rounded-full bg-glow opacity-0 blur-[50px] transition-opacity duration-500 group-hover:opacity-100" />
				{resolved && (
					<SceneStill
						className="float-y max-h-full transition-transform duration-500 group-hover:scale-[1.04]"
						label=""
						overlays={false}
						resolved={resolved}
						step={lesson.cardStep}
					/>
				)}
				<span className="absolute top-4 right-4">
					<DoneTag slug={lesson.slug} />
				</span>
			</div>
			<div className="flex flex-1 flex-col gap-3 p-6">
				<div className="flex items-center gap-2.5">
					<Tag>Lesson {String(lesson.number).padStart(2, "0")}</Tag>
					<span className="mono-tag text-dim">{lesson.minutes} min</span>
				</div>
				<H className="display-h3 group-hover:text-brand-on">{lesson.title}</H>
				<p className="text-[15px] text-muted">{lesson.summary}</p>
			</div>
		</Link>
	);
}

export function PlannedCard({
	title,
	summary,
	heading: H = "h3",
}: {
	title: string;
	summary: string;
	heading?: "h2" | "h3";
}) {
	return (
		<div className="flex flex-col gap-3 rounded-[20px] border border-line-strong border-dashed p-6">
			<span>
				<Tag tone="dim">Planned next</Tag>
			</span>
			<H className="display-h3">{title}</H>
			<p className="text-[15px] text-muted">{summary}</p>
		</div>
	);
}
