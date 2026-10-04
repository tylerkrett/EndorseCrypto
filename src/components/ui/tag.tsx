import type { ReactNode } from "react";

import { cn } from "~/lib/cn";

export type Tone = "blue" | "amber" | "green" | "red" | "dim";

const tones: Record<Tone, string> = {
	blue: "bg-tint-blue border-tint-blue-line text-brand-on",
	amber: "bg-tint-amber border-tint-amber-line text-accent",
	green: "bg-tint-green border-tint-green-line text-ok",
	red: "bg-tint-red border-tint-red-line text-bad",
	dim: "bg-tint-dim border-tint-dim-line text-dim",
};

const dots: Record<Tone, string> = {
	blue: "bg-brand",
	amber: "bg-accent",
	green: "bg-ok",
	red: "bg-bad",
	dim: "bg-dim",
};

export function Tag({
	tone = "blue",
	children,
	className,
}: {
	tone?: Tone;
	children: ReactNode;
	className?: string;
}) {
	return (
		<span
			className={cn(
				"mono-tag inline-flex items-center whitespace-nowrap rounded-md border px-2 py-[3px]",
				tones[tone],
				className,
			)}
		>
			{children}
		</span>
	);
}

/** A floating event chip, as used in the scenes and the hero. */
export function Chip({
	title,
	meta,
	tone = "blue",
	className,
}: {
	title: string;
	meta?: string;
	tone?: Tone;
	className?: string;
}) {
	return (
		<span
			className={cn(
				"inline-flex items-center gap-2.5 rounded-[14px] border border-line bg-page px-3.5 py-2.5 shadow-[0_10px_28px_rgb(0_13_31/0.22)]",
				className,
			)}
		>
			<span className={cn("h-2 w-2 shrink-0 rounded-full", dots[tone])} />
			<span className="flex flex-col gap-0.5 text-left">
				<span className="whitespace-nowrap font-medium text-[13px] text-fg leading-tight">
					{title}
				</span>
				{meta && (
					<span className="mono-tag whitespace-nowrap text-dim">{meta}</span>
				)}
			</span>
		</span>
	);
}
