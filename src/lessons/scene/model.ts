// The scene model. Each lesson describes its scene once, as plain data: the objects, then what
// changes at each step. The 3D canvas interpolates between steps as the learner scrolls; the
// static view draws each step as an isometric SVG picture. Same data, so the views always match.
//
// Coordinates: y is up; one unit is one block. The camera looks from (1, 1, 1), so the visible
// faces are the top (+y), the left (+z) and the right (+x), as in the Figma storyboards.

export type V3 = [number, number, number];
export type BlockTone = "blue" | "red" | "green" | "amber" | "grey";
export type ChipTone = "blue" | "amber" | "green" | "red" | "dim";
export type LinkTone = "line" | "red" | "green";

export type Panel =
	| {
			type: "card";
			icon?: "key" | "wallet" | "vault" | "fund";
			eyebrow?: string;
			title: string;
			lines?: string[];
			tone?: ChipTone;
	  }
	| {
			type: "bar";
			title: string;
			/** Fill, 0 to 1. Animated between steps. */
			value: number;
			/** A dashed marker, 0 to 1. */
			mark?: number;
			left?: string;
			right?: string;
			tone: "green" | "red" | "amber" | "blue";
	  }
	| {
			type: "chart";
			title: string;
			/** Points in 0..1 space; y = 1 is the top. */
			points: [number, number][];
			/** How much of the line is drawn, 0 to 1. */
			value: number;
			baseline: number;
			baselineLabel: string;
	  }
	| { type: "words"; count: number; hidden?: boolean }
	| { type: "pill"; text: string; tone: ChipTone }
	| { type: "math"; title: string; lines: string[] };

type Common = { id: string; hidden?: boolean };

export type BlockDef = Common & {
	kind: "block";
	/** The corner nearest the origin. */
	at: V3;
	/** Width (x), height (y), depth (z). */
	size: V3;
	tone: BlockTone;
	/** Draw record lines on top and a band on the front, like a block of payments. */
	records?: boolean;
	float?: boolean;
};
export type CoinDef = Common & {
	kind: "coin";
	/** Centre of the bottom face. */
	at: V3;
	r: number;
	tone: "coin" | BlockTone;
	float?: boolean;
};
export type LinkDef = Common & {
	kind: "link";
	from: V3;
	to: V3;
	tone: LinkTone;
	dashed?: boolean;
};
export type LabelDef = Common & {
	kind: "label";
	at: V3;
	title: string;
	meta?: string;
	tone: ChipTone;
};
export type PanelDef = Common & { kind: "panel"; at: V3; panel: Panel };

export type ObjDef = BlockDef | CoinDef | LinkDef | LabelDef | PanelDef;

/** What a step changes about one object. Unchanged objects keep their previous state. */
export type Change = {
	visible?: boolean;
	at?: V3;
	size?: V3;
	tone?: string;
	title?: string;
	meta?: string;
	panel?: Panel;
	/** Start this change later in the transition, 0 to 0.8. Used to stagger. */
	delay?: number;
};

export type SceneDef = {
	objects: ObjDef[];
	/** One entry per lesson step. The first describes the opening state. */
	steps: Record<string, Change>[];
};

export type ObjState = {
	visible: boolean;
	at: V3;
	size: V3;
	tone: string;
	title?: string;
	meta?: string;
	panel?: Panel;
};

export type Resolved = {
	defs: ObjDef[];
	byId: Map<string, ObjDef>;
	/** The full state of every object at each step. */
	states: Map<string, ObjState>[];
	/** Per step, the stagger delay for objects changing into it. */
	delays: Map<string, number>[];
};

const initial = (d: ObjDef): ObjState => {
	switch (d.kind) {
		case "block":
			return { visible: !d.hidden, at: d.at, size: d.size, tone: d.tone };
		case "coin":
			return {
				visible: !d.hidden,
				at: d.at,
				size: [d.r, d.r, d.r],
				tone: d.tone,
			};
		case "link":
			return { visible: !d.hidden, at: d.from, size: d.to, tone: d.tone };
		case "label":
			return {
				visible: !d.hidden,
				at: d.at,
				size: [0, 0, 0],
				tone: d.tone,
				title: d.title,
				meta: d.meta,
			};
		case "panel":
			return {
				visible: !d.hidden,
				at: d.at,
				size: [0, 0, 0],
				tone: "dim",
				panel: d.panel,
			};
	}
};

export function resolve(def: SceneDef): Resolved {
	const byId = new Map(def.objects.map((d) => [d.id, d]));
	const states: Map<string, ObjState>[] = [];
	const delays: Map<string, number>[] = [];
	let prev = new Map(def.objects.map((d) => [d.id, initial(d)]));
	def.steps.forEach((changes, i) => {
		const next = new Map(prev);
		const delay = new Map<string, number>();
		for (const [id, c] of Object.entries(changes)) {
			const base = next.get(id);
			if (!base)
				throw new Error(`Scene step ${i} changes unknown object "${id}"`);
			next.set(id, {
				visible: c.visible ?? base.visible,
				at: c.at ?? base.at,
				size: c.size ?? base.size,
				tone: c.tone ?? base.tone,
				title: c.title ?? base.title,
				meta: c.meta ?? base.meta,
				panel: c.panel ?? base.panel,
			});
			if (c.delay) delay.set(id, c.delay);
		}
		states.push(next);
		delays.push(delay);
		prev = next;
	});
	return { defs: def.objects, byId, states, delays };
}

// ---------------------------------------------------------------------------------------------
// Projection and bounds

/** True isometric projection from (1, 1, 1), in world units. */
export const project = (p: V3): [number, number] => [
	(p[0] - p[2]) * Math.SQRT1_2,
	(p[0] + p[2]) * 0.40825 - p[1] * 0.8165,
];

/** Approximate on-screen size of a label or panel, in pixels. */
export const overlaySize = (d: ObjDef, s: ObjState): [number, number] => {
	if (d.kind === "label") {
		const t = (s.title ?? "").length * 7.6;
		const m = (s.meta ?? "").length * 7.1;
		return [Math.max(t, m) + 46, s.meta ? 54 : 38];
	}
	const p = s.panel;
	if (!p) return [0, 0];
	switch (p.type) {
		case "card":
			return [210, 64 + (p.icon ? 64 : 0) + (p.lines?.length ?? 0) * 21];
		case "bar":
			return [300, 76];
		case "chart":
			return [330, 160];
		case "words":
			return [348, 112];
		case "pill":
			return [p.text.length * 7.6 + 30, 34];
		case "math":
			return [240, 46 + p.lines.length * 22];
	}
};

export const isOverlay = (d: ObjDef): d is LabelDef | PanelDef =>
	d.kind === "label" || d.kind === "panel";

/** Corner points of an object, for fitting the camera. Overlays contribute their anchor only. */
export const extent = (d: ObjDef, s: ObjState): V3[] => {
	const [x, y, z] = s.at;
	if (d.kind === "block") {
		const [w, h, dd] = s.size;
		return [
			[x, y, z],
			[x + w, y, z],
			[x, y, z + dd],
			[x + w, y, z + dd],
			[x, y + h, z],
			[x + w, y + h, z + dd],
		];
	}
	if (d.kind === "coin") {
		const r = s.size[0];
		return [
			[x - r, y, z - r],
			[x + r, y + r * 0.3, z + r],
		];
	}
	if (d.kind === "link") return [s.at, s.size];
	return [s.at];
};

export type Box2 = { minX: number; minY: number; maxX: number; maxY: number };

/** Screen bounds (world units) of what is visible at a step, plus overlay sizes in pixels. */
export function stepBounds(r: Resolved, step: number) {
	const st = r.states[step];
	const box: Box2 = {
		minX: Infinity,
		minY: Infinity,
		maxX: -Infinity,
		maxY: -Infinity,
	};
	if (!st) return box;
	for (const d of r.defs) {
		const s = st.get(d.id);
		if (!s?.visible) continue;
		for (const p of extent(d, s)) {
			const [sx, sy] = project(p);
			box.minX = Math.min(box.minX, sx);
			box.maxX = Math.max(box.maxX, sx);
			box.minY = Math.min(box.minY, sy);
			box.maxY = Math.max(box.maxY, sy);
		}
	}
	if (!Number.isFinite(box.minX))
		return { minX: -1, minY: -1, maxX: 1, maxY: 1 };
	return box;
}
