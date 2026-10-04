import { cn } from "~/lib/cn";

// The ten-segment ring: one segment per lesson, echoing the ring in the logo.

const TAU = Math.PI * 2;
const GAP = 0.07;

const arc = (i: number, size: number, thickness: number) => {
	const c = size / 2;
	const R = c;
	const r = c - thickness;
	const a0 = -Math.PI / 2 + (i * TAU) / 10 + GAP;
	const a1 = -Math.PI / 2 + ((i + 1) * TAU) / 10 - GAP;
	const p = (rad: number, a: number) =>
		`${(c + rad * Math.cos(a)).toFixed(2)} ${(c + rad * Math.sin(a)).toFixed(2)}`;
	return `M${p(R, a0)}A${R} ${R} 0 0 1 ${p(R, a1)}L${p(r, a1)}A${r} ${r} 0 0 0 ${p(r, a0)}Z`;
};

export const segmentAngle = (i: number) =>
	-Math.PI / 2 + ((i + 0.5) * TAU) / 10;

export function Ring({
	filled,
	className,
	animate = false,
	thickness = 0.1,
	label,
}: {
	/** Which segments are lit: a count from the start, or "all". */
	filled: number | "all";
	className?: string;
	/** Light the segments in turn on first paint (animation on only). */
	animate?: boolean;
	/** Thickness as a share of the diameter. */
	thickness?: number;
	label?: string;
}) {
	const size = 100;
	return (
		<svg
			aria-hidden={label ? undefined : true}
			aria-label={label}
			className={cn("overflow-visible", className)}
			role={label ? "img" : undefined}
			viewBox={`0 0 ${size} ${size}`}
		>
			{Array.from({ length: 10 }, (_, i) => {
				const on = filled === "all" || i < filled;
				return (
					<path
						className={cn(animate && on && "ring-segment")}
						d={arc(i, size, size * thickness)}
						fill={on ? "var(--brand-on)" : "var(--bg-surface-2)"}
						// biome-ignore lint/suspicious/noArrayIndexKey: ten fixed segments
						key={i}
						style={
							animate ? { animationDelay: `${300 + i * 130}ms` } : undefined
						}
					/>
				);
			})}
		</svg>
	);
}
