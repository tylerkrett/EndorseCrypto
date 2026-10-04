import { cn } from "~/lib/cn";

import {
	type BlockDef,
	type CoinDef,
	isOverlay,
	type ObjDef,
	type ObjState,
	overlaySize,
	project,
	type Resolved,
	stepBounds,
	type V3,
} from "./model";
import { Overlay } from "./overlay";

// The static picture of one step: the scene drawn as an isometric SVG. Used by the static view,
// the lesson cards, and as the placeholder while the 3D canvas loads. No JavaScript needed.

const S = 60; // pixels per world unit

// Rounded so the server and the browser produce identical markup (their trigonometry can differ
// in the last digit, which would break hydration).
const r1 = (n: number) => Math.round(n * 10) / 10;
const P = (p: V3): [number, number] => {
	const [x, y] = project(p);
	return [r1(x * S), r1(y * S)];
};
const pts = (list: V3[]) =>
	list
		.map(P)
		.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
		.join(" ");

const face = (tone: string, f: "top" | "left" | "right") =>
	`var(--scene-${tone}-${f})`;

function Block({ d, s }: { d: BlockDef; s: ObjState }) {
	const [x, y, z] = s.at;
	const [w, h, dd] = s.size;
	const tone = s.tone;
	const top: V3[] = [
		[x, y + h, z],
		[x + w, y + h, z],
		[x + w, y + h, z + dd],
		[x, y + h, z + dd],
	];
	const left: V3[] = [
		[x, y + h, z + dd],
		[x + w, y + h, z + dd],
		[x + w, y, z + dd],
		[x, y, z + dd],
	];
	const right: V3[] = [
		[x + w, y + h, z],
		[x + w, y + h, z + dd],
		[x + w, y, z + dd],
		[x + w, y, z],
	];
	const stripe = (v0: number, v1: number, u1: number): V3[] => [
		[x + 0.16 * w, y + h, z + v0 * dd],
		[x + u1 * w, y + h, z + v0 * dd],
		[x + u1 * w, y + h, z + v1 * dd],
		[x + 0.16 * w, y + h, z + v1 * dd],
	];
	const band: V3[] = [
		[x + 0.14 * w, y + 0.58 * h, z + dd],
		[x + 0.86 * w, y + 0.58 * h, z + dd],
		[x + 0.86 * w, y + 0.36 * h, z + dd],
		[x + 0.14 * w, y + 0.36 * h, z + dd],
	];
	const lower = (face: "left" | "right"): V3[] =>
		face === "left"
			? [
					[x, y + h * 0.5, z + dd],
					[x + w, y + h * 0.5, z + dd],
					[x + w, y, z + dd],
					[x, y, z + dd],
				]
			: [
					[x + w, y + h * 0.5, z],
					[x + w, y + h * 0.5, z + dd],
					[x + w, y, z + dd],
					[x + w, y, z],
				];
	const [ex, ey] = P([x + w, y + h, z + dd]);
	const [fx, fy] = P([x + w, y, z + dd]);
	return (
		<g strokeLinejoin="round">
			<polygon fill={face(tone, "top")} points={pts(top)} />
			<polygon fill={face(tone, "left")} points={pts(left)} />
			<polygon fill={face(tone, "right")} points={pts(right)} />
			{/* Shading towards the floor, and light catching the top edges. */}
			<polygon fill="#000" opacity={0.12} points={pts(lower("left"))} />
			<polygon fill="#000" opacity={0.16} points={pts(lower("right"))} />
			<polygon
				fill="none"
				opacity={0.55}
				points={pts(top)}
				stroke="#fff"
				strokeWidth={1.4}
			/>
			<line
				opacity={0.35}
				stroke="#fff"
				strokeWidth={1.2}
				x1={ex}
				x2={fx}
				y1={ey}
				y2={fy}
			/>
			{d.records && tone !== "grey" && (
				<>
					<polygon
						fill={face(tone, "right")}
						points={pts(stripe(0.2, 0.3, 0.84))}
					/>
					<polygon
						fill={face(tone, "right")}
						points={pts(stripe(0.45, 0.55, 0.84))}
					/>
					<polygon
						fill={face(tone, "right")}
						points={pts(stripe(0.7, 0.8, 0.6))}
					/>
					<polygon fill="var(--scene-coin)" points={pts(band)} />
				</>
			)}
		</g>
	);
}

/** A soft shadow on the floor under a block or coin. */
function Shadow({ d, s }: { d: ObjDef; s: ObjState }) {
	if (d.kind !== "block" && d.kind !== "coin") return null;
	const [x, , z] = s.at;
	const [w, , dd] =
		d.kind === "coin" ? [s.size[0] * 2, 0, s.size[0] * 2] : s.size;
	const ox = d.kind === "coin" ? x - w / 2 : x;
	const oz = d.kind === "coin" ? z - dd / 2 : z;
	const ring = (g: number): V3[] => [
		[ox - g, 0, oz - g],
		[ox + w + g + 0.15, 0, oz - g],
		[ox + w + g + 0.15, 0, oz + dd + g + 0.15],
		[ox - g, 0, oz + dd + g + 0.15],
	];
	return (
		<g fill="#000" strokeLinejoin="round">
			<polygon
				opacity={0.07}
				points={pts(ring(0.28))}
				stroke="#000"
				strokeOpacity={0.07}
				strokeWidth={10}
			/>
			<polygon opacity={0.12} points={pts(ring(0.08))} />
		</g>
	);
}

function Coin({ s }: { d: CoinDef; s: ObjState }) {
	const r = s.size[0];
	const [cx, cy] = P(s.at);
	const rx = r1(r * S);
	const ry = r1(r * S * 0.5774);
	const t = r1(r * 0.3 * 0.8165 * S);
	const top = s.tone === "coin" ? "var(--scene-coin)" : face(s.tone, "top");
	const edge =
		s.tone === "coin" ? "var(--scene-coin-edge)" : face(s.tone, "right");
	return (
		<g>
			<ellipse cx={cx} cy={cy} fill={edge} rx={rx} ry={ry} />
			<rect fill={edge} height={t} width={rx * 2} x={cx - rx} y={cy - t} />
			<ellipse cx={cx} cy={cy - t} fill={top} rx={rx} ry={ry} />
			<ellipse
				cx={cx}
				cy={cy - t}
				fill="none"
				opacity={0.45}
				rx={rx * 0.7}
				ry={ry * 0.7}
				stroke="#fff"
				strokeWidth={1.4}
			/>
			<ellipse
				cx={cx - rx * 0.25}
				cy={cy - t - ry * 0.3}
				fill="#fff"
				opacity={0.35}
				rx={rx * 0.28}
				ry={ry * 0.18}
			/>
		</g>
	);
}

const linkColour = {
	line: "var(--scene-line)",
	red: "var(--status-red)",
	green: "var(--status-green)",
};

const depth = (d: ObjDef, s: ObjState) => {
	if (d.kind === "block")
		return s.at[0] + s.size[0] / 2 + s.at[1] + s.at[2] + s.size[2] / 2;
	if (d.kind === "link")
		return (
			(s.at[0] + s.size[0] + s.at[1] + s.size[1] + s.at[2] + s.size[2]) / 2 -
			0.5
		);
	return s.at[0] + s.at[1] + s.at[2];
};

/** The dotted floor, fading out from the middle of the picture. */
function FloorDots({
	box,
}: {
	box: { minX: number; minY: number; w: number; h: number };
}) {
	const cx = box.minX + box.w / 2;
	const cy = box.minY + box.h / 2;
	const dots: [number, number, number][] = [];
	// Dots on the ground grid, projected: one every half unit.
	for (let i = -14; i <= 14; i++)
		for (let j = -14; j <= 14; j++) {
			const px = (i - j) * 0.5 * Math.SQRT1_2 * S + cx;
			const py = (i + j) * 0.5 * 0.40825 * S + cy + box.h * 0.12;
			const d = Math.hypot((px - cx) / (box.w / 2), (py - cy) / (box.h / 2));
			if (d < 1) dots.push([px, py, (1 - d) ** 1.5 * 0.5]);
		}
	return (
		<g fill="var(--scene-line)">
			{dots.map(([x, y, o]) => (
				<circle
					cx={x.toFixed(1)}
					cy={y.toFixed(1)}
					key={`${x.toFixed(0)}-${y.toFixed(0)}`}
					opacity={o.toFixed(2)}
					r={1.6}
				/>
			))}
		</g>
	);
}

export function SceneStill({
	resolved,
	step,
	className,
	label,
	overlays = true,
}: {
	resolved: Resolved;
	step: number;
	className?: string;
	/** Text alternative for the picture. */
	label: string;
	overlays?: boolean;
}) {
	const st = resolved.states[step];
	if (!st) return null;
	const visible = resolved.defs.filter((d) => st.get(d.id)?.visible);
	const shapes = visible
		.filter((d) => !isOverlay(d))
		.sort(
			(a, b) =>
				depth(a, st.get(a.id) as ObjState) - depth(b, st.get(b.id) as ObjState),
		);
	const texts = overlays ? visible.filter(isOverlay) : [];

	const b = stepBounds(resolved, step);
	let minX = b.minX * S;
	let minY = b.minY * S;
	let maxX = b.maxX * S;
	let maxY = b.maxY * S;
	const boxes = texts.map((d) => {
		const s = st.get(d.id) as ObjState;
		const [w, h] = overlaySize(d, s);
		const [px, py] = P(s.at);
		const box = { x: r1(px - w / 2), y: r1(py - h / 2), w: r1(w), h: r1(h) };
		minX = Math.min(minX, box.x);
		minY = Math.min(minY, box.y);
		maxX = Math.max(maxX, box.x + w);
		maxY = Math.max(maxY, box.y + h);
		return { d, s, box };
	});
	const pad = 28;
	// Small scenes are framed at a minimum size so their labels are not magnified.
	const MIN_W = 620;
	const MIN_H = 300;
	if (maxX - minX < MIN_W) {
		const c = (minX + maxX) / 2;
		minX = c - MIN_W / 2;
		maxX = c + MIN_W / 2;
	}
	if (maxY - minY < MIN_H) {
		const c = (minY + maxY) / 2;
		minY = c - MIN_H / 2;
		maxY = c + MIN_H / 2;
	}
	const vb = [
		minX - pad,
		minY - pad,
		maxX - minX + pad * 2,
		maxY - minY + pad * 2,
	];

	return (
		<svg
			aria-hidden={label ? undefined : true}
			aria-label={label || undefined}
			className={cn("h-auto w-full", className)}
			role={label ? "img" : undefined}
			viewBox={vb.map((n) => n.toFixed(1)).join(" ")}
		>
			{overlays && (
				<FloorDots
					box={{
						minX: vb[0] ?? 0,
						minY: vb[1] ?? 0,
						w: vb[2] ?? 0,
						h: vb[3] ?? 0,
					}}
				/>
			)}
			{shapes.map((d) => (
				<Shadow d={d} key={`${d.id}-shadow`} s={st.get(d.id) as ObjState} />
			))}
			{shapes.map((d) => {
				const s = st.get(d.id) as ObjState;
				if (d.kind === "block") return <Block d={d} key={d.id} s={s} />;
				if (d.kind === "coin") return <Coin d={d} key={d.id} s={s} />;
				if (d.kind === "link") {
					const [x1, y1] = P(s.at);
					const [x2, y2] = P(s.size);
					return (
						<line
							key={d.id}
							stroke={
								linkColour[s.tone as keyof typeof linkColour] ?? linkColour.line
							}
							strokeDasharray={d.dashed ? "3 10" : undefined}
							strokeLinecap="round"
							strokeWidth={5}
							x1={x1}
							x2={x2}
							y1={y1}
							y2={y2}
						/>
					);
				}
				return null;
			})}
			{boxes.map(({ d, s, box }) => (
				<foreignObject
					height={box.h}
					key={d.id}
					width={box.w}
					x={box.x}
					y={box.y}
				>
					<div className="flex h-full w-full items-center justify-center">
						<Overlay def={d} state={s} />
					</div>
				</foreignObject>
			))}
		</svg>
	);
}
