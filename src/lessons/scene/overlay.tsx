import { Chip } from "~/components/ui/tag";
import { cn } from "~/lib/cn";

import type { ChipTone, ObjDef, ObjState, Panel } from "./model";

// Labels and panels: the parts of a scene that are text. They are ordinary HTML in both views
// (inside the 3D canvas through drei's Html, inside the static pictures through foreignObject),
// so they stay sharp and follow the theme.

const toneText: Record<ChipTone, string> = {
	blue: "text-brand-on",
	amber: "text-accent",
	green: "text-ok",
	red: "text-bad",
	dim: "text-dim",
};
const toneBox: Record<ChipTone, string> = {
	blue: "border-tint-blue-line bg-tint-blue",
	amber: "border-tint-amber-line bg-tint-amber",
	green: "border-tint-green-line bg-tint-green",
	red: "border-tint-red-line bg-tint-red",
	dim: "border-line bg-surface",
};
const barFill = {
	green: "bg-ok",
	red: "bg-bad",
	amber: "bg-accent",
	blue: "bg-brand",
};

const ICONS = {
	key: "M15.5 7.5 17.8 9.8a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4M21 2l-9.6 9.6M13 15.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0",
	wallet:
		"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",
	vault:
		"M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6M7 21v1M17 21v1",
	fund: "M3 21h18M5 21V10M19 21V10M9 21V10M15 21V10M12 3l9 5H3z",
};

function PanelView({ panel }: { panel: Panel }) {
	switch (panel.type) {
		case "card": {
			const tone = panel.tone ?? "dim";
			return (
				<div className="flex w-[210px] flex-col items-center gap-1.5 rounded-[18px] border border-line-strong bg-surface px-4 py-4 text-center shadow-[0_12px_32px_rgb(0_13_31/0.18)]">
					{panel.icon && (
						<svg
							aria-hidden="true"
							className={cn(
								"mb-1 h-12 w-12",
								toneText[tone === "dim" ? "amber" : tone],
							)}
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								d={ICONS[panel.icon]}
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="1.6"
							/>
						</svg>
					)}
					{panel.eyebrow && (
						<span className="mono-tag text-dim">{panel.eyebrow}</span>
					)}
					<span className="font-display font-semibold text-[15px] text-fg">
						{panel.title}
					</span>
					{panel.lines?.map((l) => (
						<span className="font-mono text-[12px] text-muted" key={l}>
							{l}
						</span>
					))}
				</div>
			);
		}
		case "bar":
			return (
				<div className="flex w-[300px] flex-col gap-2 rounded-[14px] border border-line bg-page/90 px-4 py-3">
					<span className="mono-tag text-dim">{panel.title}</span>
					<span className="relative block h-3.5 overflow-hidden rounded-full bg-surface-2">
						<span
							className={cn(
								"absolute inset-y-0 left-0 rounded-full transition-[width,background-color] duration-700 ease-out",
								barFill[panel.tone],
							)}
							style={{
								width: `${Math.max(0, Math.min(1, panel.value)) * 100}%`,
							}}
						/>
						{panel.mark !== undefined && (
							<span
								className="absolute inset-y-[-3px] w-0 border-fg border-l-2 border-dashed"
								style={{ left: `${panel.mark * 100}%` }}
							/>
						)}
					</span>
					{(panel.left || panel.right) && (
						<span className="flex justify-between gap-3 font-mono text-[11px]">
							<span
								className={
									toneText[panel.tone === "blue" ? "blue" : panel.tone]
								}
							>
								{panel.left}
							</span>
							<span className="text-dim">{panel.right}</span>
						</span>
					)}
				</div>
			);
		case "chart": {
			const w = 300;
			const h = 96;
			const d = panel.points
				.map(
					([x, y], i) =>
						`${i ? "L" : "M"}${(x * w).toFixed(1)} ${((1 - y) * h).toFixed(1)}`,
				)
				.join("");
			const by = (1 - panel.baseline) * h;
			return (
				<div className="flex w-[330px] flex-col gap-2 rounded-[14px] border border-line bg-page/90 px-4 py-3">
					<span className="mono-tag text-dim">{panel.title}</span>
					<svg
						aria-hidden="true"
						className="overflow-visible"
						height={h}
						width={w}
					>
						<line
							stroke="var(--stroke-strong)"
							strokeDasharray="4 6"
							strokeWidth="1.5"
							x1="0"
							x2={w}
							y1={by}
							y2={by}
						/>
						<text
							className="font-mono"
							fill="var(--text-dim)"
							fontSize="10"
							textAnchor="end"
							x={w}
							y={by - 6}
						>
							{panel.baselineLabel}
						</text>
						<path
							d={d}
							fill="none"
							pathLength={1}
							stroke="var(--brand-blue)"
							strokeDasharray="1 1"
							strokeDashoffset={1 - panel.value}
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="3"
							style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
						/>
					</svg>
				</div>
			);
		}
		case "words":
			return (
				<div className="grid w-[348px] grid-cols-4 gap-1.5">
					{Array.from({ length: panel.count }, (_, i) => (
						<span
							className="flex items-center gap-2 rounded-[9px] border border-line bg-surface px-2 py-1.5"
							// biome-ignore lint/suspicious/noArrayIndexKey: fixed word slots
							key={i}
						>
							<span className="font-mono text-[10px] text-dim">
								{String(i + 1).padStart(2, "0")}
							</span>
							<span
								className={cn(
									"h-2 flex-1 rounded-full",
									panel.hidden ? "bg-dim/50" : "bg-accent/70",
								)}
							/>
						</span>
					))}
				</div>
			);
		case "pill":
			return (
				<span
					className={cn(
						"mono-tag inline-flex whitespace-nowrap rounded-[10px] border px-3 py-2.5",
						toneBox[panel.tone],
						toneText[panel.tone],
					)}
				>
					{panel.text}
				</span>
			);
		case "math":
			return (
				<div className="flex w-[240px] flex-col gap-1.5 rounded-[14px] border border-line-strong bg-surface px-4 py-3">
					<span className="mono-tag text-dim">{panel.title}</span>
					{panel.lines.map((l) => (
						<span
							className="whitespace-pre font-mono text-[13px] text-fg"
							key={l}
						>
							{l}
						</span>
					))}
				</div>
			);
	}
}

export function Overlay({ def, state }: { def: ObjDef; state: ObjState }) {
	if (def.kind === "label")
		return (
			<Chip
				meta={state.meta}
				title={state.title ?? ""}
				tone={(state.tone as ChipTone) ?? "blue"}
			/>
		);
	if (def.kind === "panel" && state.panel)
		return <PanelView panel={state.panel} />;
	return null;
}
