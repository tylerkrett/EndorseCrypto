"use client";

import { Ring } from "~/components/ui/ring";
import { Tag } from "~/components/ui/tag";
import { lessons } from "~/lessons/lessons";
import { useProgress } from "~/lib/progress";

export function DoneTag({ slug }: { slug: string }) {
	const done = useProgress();
	if (!done.includes(slug)) return null;
	return <Tag tone="green">Done</Tag>;
}

export function ProgressRing({ className }: { className?: string }) {
	const done = useProgress();
	const count = lessons.filter((l) => done.includes(l.slug)).length;
	return (
		<div className="flex items-center gap-4">
			<Ring
				className={className ?? "h-16 w-16"}
				filled={count}
				label={`${count} of 10 lessons complete`}
			/>
			<div className="flex flex-col gap-1">
				<span className="font-semibold text-[15px]">
					{count} of 10 complete
				</span>
				<span className="mono-tag text-dim">Saved in this browser</span>
			</div>
		</div>
	);
}
