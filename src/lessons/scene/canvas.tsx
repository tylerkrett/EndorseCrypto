"use client";

import {
	ContactShadows,
	Environment,
	Lightformer,
	Line,
	RoundedBox,
	Sparkles,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { type RefObject, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { cn } from "~/lib/cn";
import { useTheme } from "~/lib/prefs";

import {
	type BlockDef,
	type CoinDef,
	isOverlay,
	type LinkDef,
	type ObjDef,
	overlaySize,
	project,
	type Resolved,
	stepBounds,
	type V3,
} from "./model";
import { Overlay } from "./overlay";

// The animated view's 3D scene. Scroll position (a float, 0 to steps - 1) comes in through a ref
// so scrolling never re-renders React; every frame the rig interpolates each object between the
// two nearest steps and eases the displayed values towards that, so try-it changes glide too.
// Labels and panels are HTML positioned in 3D, driven by the nearest step.

type Faces = { top: THREE.Color; left: THREE.Color; right: THREE.Color };
type Palette = {
	tones: Record<string, Faces>;
	line: THREE.Color;
	red: THREE.Color;
	green: THREE.Color;
};

const TONES = ["blue", "red", "green", "amber", "grey"] as const;

function readPalette(): Palette {
	const css = getComputedStyle(document.documentElement);
	const c = (name: string) =>
		new THREE.Color(css.getPropertyValue(name).trim() || "#888888");
	const tones: Record<string, Faces> = {};
	for (const t of TONES)
		tones[t] = {
			top: c(`--scene-${t}-top`),
			left: c(`--scene-${t}-left`),
			right: c(`--scene-${t}-right`),
		};
	tones.coin = {
		top: c("--scene-coin"),
		left: c("--scene-coin-edge"),
		right: c("--scene-coin-edge"),
	};
	return {
		tones,
		line: c("--scene-line"),
		red: c("--status-red"),
		green: c("--status-green"),
	};
}

const smooth = (t: number) => t * t * (3 - 2 * t);

/** Labels shrink on small canvases so they do not crowd the scene. */
const overlayScale = (W: number) => (W < 520 ? 0.7 : W < 760 ? 0.85 : 1);

type Fit = {
	box: { minX: number; minY: number; maxX: number; maxY: number };
	overlays: { sx: number; sy: number; w: number; h: number }[];
};

/** Zoom and centre that fit a step's shapes and labels inside the canvas. */
function frame(f: Fit, W: number, H: number) {
	const k = overlayScale(W);
	const margin = Math.min(36, W * 0.05);
	let { minX, maxX, minY, maxY } = f.box;
	let zoom = Math.min(
		(W - margin * 2) / Math.max(1, maxX - minX),
		(H - margin * 2) / Math.max(1, maxY - minY),
		140,
	);
	// Labels have a fixed pixel size, so widen the bounds at the current zoom and refit.
	for (let pass = 0; pass < 3; pass++) {
		({ minX, maxX, minY, maxY } = f.box);
		for (const o of f.overlays) {
			minX = Math.min(minX, o.sx - (o.w * k) / 2 / zoom);
			maxX = Math.max(maxX, o.sx + (o.w * k) / 2 / zoom);
			minY = Math.min(minY, o.sy - (o.h * k) / 2 / zoom);
			maxY = Math.max(maxY, o.sy + (o.h * k) / 2 / zoom);
		}
		zoom = Math.min(
			(W - margin * 2) / Math.max(0.5, maxX - minX),
			(H - margin * 2 - 30) / Math.max(0.5, maxY - minY),
			140,
		);
	}
	return {
		zoom: Math.max(8, zoom),
		cx: (minX + maxX) / 2,
		cy: (minY + maxY) / 2 - 12 / zoom,
	};
}
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

type Disp = {
	at: THREE.Vector3;
	size: THREE.Vector3;
	opacity: number;
	top: THREE.Color;
	left: THREE.Color;
	right: THREE.Color;
};

type Handle = {
	group: THREE.Group;
	inner?: THREE.Object3D;
	mats: THREE.Material[];
	/** Which palette face each material takes. */
	faces: ("top" | "left" | "right" | "coin" | "line")[];
	line?: {
		material: { color: THREE.Color; opacity: number; transparent: boolean };
	};
};

const tmpA = new THREE.Vector3();
const tmpB = new THREE.Vector3();
const tmpC = new THREE.Color();
const tmpD = new THREE.Color();

function Rig({
	resolved,
	progress,
	overlayEls,
}: {
	resolved: Resolved;
	progress: RefObject<number>;
	overlayEls: RefObject<Map<string, HTMLDivElement>>;
}) {
	const theme = useTheme();
	const palette = useMemo(() => {
		void theme;
		return readPalette();
	}, [theme]);
	const handles = useRef(new Map<string, Handle>());
	const disp = useRef(new Map<string, Disp>());
	const shown = useRef(0);
	const camera = useThree((s) => s.camera) as THREE.OrthographicCamera;
	const size = useThree((s) => s.size);
	// Per step: the bounds of the shapes, plus each label's anchor and pixel size.
	const fits = useMemo(
		() =>
			resolved.states.map((st, i) => ({
				box: stepBounds(resolved, i),
				overlays: resolved.defs.filter(isOverlay).flatMap((d) => {
					const s = st.get(d.id);
					if (!s?.visible) return [];
					const [sx, sy] = project(s.at);
					const [w, h] = overlaySize(d, s);
					return [{ sx, sy, w, h }];
				}),
			})),
		[resolved],
	);
	const n = resolved.states.length;

	const register = (id: string) => (h: Handle | null) => {
		if (h) handles.current.set(id, h);
		else handles.current.delete(id);
	};

	useFrame((state, dt) => {
		const target =
			clamp01((progress.current ?? 0) / Math.max(1, n - 1)) * (n - 1);
		const k = 1 - Math.exp(-Math.min(dt, 0.1) * 7);
		shown.current += (target - shown.current) * k;
		const p = shown.current;
		const i0 = Math.min(Math.floor(p), n - 1);
		const i1 = Math.min(i0 + 1, n - 1);
		const t = p - i0;
		const A = resolved.states[i0];
		const B = resolved.states[i1];
		const delays = resolved.delays[i1];
		if (!A || !B) return;
		const time = state.clock.elapsedTime;

		// Camera: fit what is visible, easing between steps, with a slow sway.
		const fa = fits[i0];
		const fb = fits[i1];
		if (fa && fb) {
			const e = smooth(t);
			const za = frame(fa, size.width, size.height);
			const zb = frame(fb, size.width, size.height);
			const zoom = THREE.MathUtils.lerp(za.zoom, zb.zoom, e);
			const cx = THREE.MathUtils.lerp(za.cx, zb.cx, e);
			const cy = THREE.MathUtils.lerp(za.cy, zb.cy, e);
			// The world point on the ground that projects to (cx, cy).
			const a = cx / Math.SQRT1_2;
			const b = cy / 0.40825;
			const tx = (a + b) / 2;
			const tz = (b - a) / 2;
			const sway = Math.sin(time * 0.25) * 0.05 + state.pointer.x * 0.06;
			camera.zoom += (zoom - camera.zoom) * k;
			tmpA.set(tx, 0, tz);
			tmpB
				.set(
					Math.cos(Math.PI / 4 + sway),
					Math.SQRT1_2,
					Math.sin(Math.PI / 4 + sway),
				)
				.normalize()
				.multiplyScalar(60);
			camera.position.copy(tmpA).add(tmpB);
			camera.lookAt(tmpA);
			camera.updateProjectionMatrix();
		}

		resolved.defs.forEach((d, idx) => {
			if (isOverlay(d)) {
				// Labels and panels are DOM, placed over the canvas where their anchor projects.
				const el = overlayEls.current?.get(d.id);
				const sa = A.get(d.id);
				const sb = B.get(d.id);
				if (el && sa && sb) {
					const e = smooth(t);
					tmpA
						.set(...sa.at)
						.lerp(tmpB.set(...sb.at), e)
						.project(camera);
					const x = ((tmpA.x + 1) / 2) * size.width;
					const y = ((1 - tmpA.y) / 2) * size.height;
					el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${overlayScale(size.width)})`;
				}
				return;
			}
			const sa = A.get(d.id);
			const sb = B.get(d.id);
			const h = handles.current.get(d.id);
			if (!sa || !sb || !h) return;
			const delay = delays?.get(d.id) ?? 0;
			const e = smooth(clamp01((t - delay) / (1 - delay)));
			let D = disp.current.get(d.id);
			const tAt = tmpA
				.set(...sa.at)
				.lerp(tmpB.set(...sb.at), e)
				.clone();
			const tSize = tmpA
				.set(...sa.size)
				.lerp(tmpB.set(...sb.size), e)
				.clone();
			const tOp = THREE.MathUtils.lerp(
				sa.visible ? 1 : 0,
				sb.visible ? 1 : 0,
				e,
			);
			const pa = palette.tones[sa.tone] ?? palette.tones.blue;
			const pb = palette.tones[sb.tone] ?? palette.tones.blue;
			if (!pa || !pb) return;
			if (!D) {
				D = {
					at: tAt.clone(),
					size: tSize.clone(),
					opacity: tOp,
					top: pa.top.clone(),
					left: pa.left.clone(),
					right: pa.right.clone(),
				};
				disp.current.set(d.id, D);
			}
			D.at.lerp(tAt, k);
			D.size.lerp(tSize, k);
			D.opacity += (tOp - D.opacity) * k;
			for (const f of ["top", "left", "right"] as const) {
				tmpC.copy(pa[f]).lerp(tmpD.copy(pb[f]), e);
				D[f].lerp(tmpC, k);
			}

			const g = h.group;
			g.visible = D.opacity > 0.01;
			const float =
				(d.kind === "block" || d.kind === "coin") && d.float
					? Math.sin(time * 1.2 + idx) * 0.04
					: 0;
			const drop = d.kind === "link" ? 0 : (1 - D.opacity) * 0.6;
			if (d.kind === "link") {
				g.userData.opacity = D.opacity;
				g.userData.tone = sb.tone;
				if (h.line) {
					const lc =
						sb.tone === "red"
							? palette.red
							: sb.tone === "green"
								? palette.green
								: palette.line;
					h.line.material.color.lerp(lc, k);
					h.line.material.opacity = D.opacity;
				}
				return;
			}
			g.position.set(D.at.x, D.at.y + drop + float, D.at.z);
			if (h.inner) {
				if (d.kind === "coin")
					h.inner.scale.setScalar(Math.max(0.0001, D.size.x));
				else
					h.inner.scale.set(
						Math.max(0.0001, D.size.x),
						Math.max(0.0001, D.size.y),
						Math.max(0.0001, D.size.z),
					);
			}
			h.mats.forEach((m, j) => {
				const f = h.faces[j];
				const mat = m as THREE.MeshStandardMaterial;
				const colour =
					f === "coin"
						? (palette.tones.coin?.top ?? D.top)
						: f
							? D[f as "top" | "left" | "right"]
							: D.left;
				mat.color.copy(colour);
				// Record lines and bands glow softly in their own colour.
				if (mat.emissive && mat.emissiveIntensity > 1)
					mat.emissive.copy(colour).multiplyScalar(0.55);
				// Gold coins are polished metal; coloured tokens are satin so their colour reads.
				if (d.kind === "coin" && "metalness" in mat) {
					mat.metalness = sb.tone === "coin" ? 0.55 : 0.2;
					mat.emissive
						.copy(colour)
						.multiplyScalar(sb.tone === "coin" ? 0.22 : 0.08);
				}
				mat.opacity =
					f === "top" && m instanceof THREE.LineBasicMaterial
						? D.opacity * 0.7
						: D.opacity;
				mat.transparent =
					D.opacity < 0.999 || m instanceof THREE.LineBasicMaterial;
				mat.depthWrite = D.opacity >= 0.999;
			});
		});
	});

	return (
		<>
			{resolved.defs.map((d) => {
				switch (d.kind) {
					case "block":
						return <BlockMesh def={d} key={d.id} onHandle={register(d.id)} />;
					case "coin":
						return <CoinMesh def={d} key={d.id} onHandle={register(d.id)} />;
					case "link":
						return <LinkLine def={d} key={d.id} onHandle={register(d.id)} />;
					default:
						return null;
				}
			})}
		</>
	);
}

const unitBox = new THREE.BoxGeometry(1, 1, 1).translate(0.5, 0.5, 0.5);
const unitEdges = new THREE.EdgesGeometry(unitBox);
const coinGeo = new THREE.CylinderGeometry(1, 1, 0.26, 48).translate(
	0,
	0.13,
	0,
);
const coinFace = new THREE.CylinderGeometry(0.72, 0.72, 0.02, 48).translate(
	0,
	0.27,
	0,
);
const packetGeo = new THREE.SphereGeometry(0.055, 16, 12);

const body = () =>
	new THREE.MeshStandardMaterial({
		roughness: 0.32,
		metalness: 0.15,
		transparent: true,
	});
const glow = () =>
	new THREE.MeshStandardMaterial({
		roughness: 0.4,
		metalness: 0,
		emissiveIntensity: 1.4,
		transparent: true,
	});

/** A soft round halo texture, shared by every glowing sprite. */
let haloTexture: THREE.Texture | null = null;
const halo = () => {
	if (haloTexture) return haloTexture;
	const c = document.createElement("canvas");
	c.width = c.height = 64;
	const g = c.getContext("2d");
	if (g) {
		const r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
		r.addColorStop(0, "rgba(255,255,255,1)");
		r.addColorStop(0.35, "rgba(255,255,255,0.35)");
		r.addColorStop(1, "rgba(255,255,255,0)");
		g.fillStyle = r;
		g.fillRect(0, 0, 64, 64);
	}
	haloTexture = new THREE.CanvasTexture(c);
	return haloTexture;
};

function BlockMesh({
	def,
	onHandle,
}: {
	def: BlockDef;
	onHandle: (h: Handle | null) => void;
}) {
	const group = useRef<THREE.Group>(null);
	const inner = useRef<THREE.Group>(null);
	const mats = useMemo(
		() => ({
			body: body(),
			edge: new THREE.LineBasicMaterial({ transparent: true }),
			stripe: glow(),
			band: glow(),
		}),
		[],
	);
	useLayoutEffect(() => {
		if (!group.current) return;
		onHandle({
			group: group.current,
			inner: inner.current ?? undefined,
			mats: [mats.body, mats.edge, mats.stripe, mats.band],
			faces: ["left", "top", "top", "coin"],
		});
		return () => onHandle(null);
	}, [mats, onHandle]);
	return (
		<group ref={group}>
			<group ref={inner}>
				<RoundedBox
					args={[1, 1, 1]}
					castShadow
					material={mats.body}
					position={[0.5, 0.5, 0.5]}
					radius={0.06}
					smoothness={3}
				/>
				<lineSegments geometry={unitEdges} material={mats.edge} />
				{def.records && (
					<>
						{[
							[0.2, 0.68],
							[0.45, 0.68],
							[0.7, 0.44],
						].map(([v, w]) => (
							<mesh
								key={v}
								material={mats.stripe}
								position={[0.16 + (w ?? 0) / 2, 1.006, (v ?? 0) + 0.05]}
							>
								<boxGeometry args={[w, 0.01, 0.09]} />
							</mesh>
						))}
						<mesh material={mats.band} position={[0.5, 0.47, 1.006]}>
							<boxGeometry args={[0.7, 0.2, 0.01]} />
						</mesh>
					</>
				)}
			</group>
		</group>
	);
}

function CoinMesh({
	onHandle,
}: {
	def: CoinDef;
	onHandle: (h: Handle | null) => void;
}) {
	const group = useRef<THREE.Group>(null);
	const inner = useRef<THREE.Group>(null);
	const mats = useMemo(
		() => ({
			metal: new THREE.MeshStandardMaterial({
				roughness: 0.22,
				metalness: 0.85,
				transparent: true,
			}),
			face: new THREE.MeshStandardMaterial({
				roughness: 0.3,
				metalness: 0.7,
				transparent: true,
			}),
		}),
		[],
	);
	useLayoutEffect(() => {
		if (!group.current) return;
		onHandle({
			group: group.current,
			inner: inner.current ?? undefined,
			mats: [mats.metal, mats.face],
			faces: ["left", "top"],
		});
		return () => onHandle(null);
	}, [mats, onHandle]);
	return (
		<group ref={group}>
			<group ref={inner}>
				<mesh castShadow geometry={coinGeo} material={mats.metal} />
				<mesh geometry={coinFace} material={mats.face} />
			</group>
		</group>
	);
}

function LinkLine({
	def,
	onHandle,
}: {
	def: LinkDef;
	onHandle: (h: Handle | null) => void;
}) {
	const group = useRef<THREE.Group>(null);
	// biome-ignore lint/suspicious/noExplicitAny: drei's Line ref is a Line2 with a LineMaterial
	const line = useRef<any>(null);
	const packets = useRef<THREE.Group>(null);
	const from = useMemo(() => new THREE.Vector3(...def.from), [def.from]);
	const to = useMemo(() => new THREE.Vector3(...def.to), [def.to]);
	const packetMat = useMemo(
		() => new THREE.MeshBasicMaterial({ color: "#bfe6ff", transparent: true }),
		[],
	);
	const haloMat = useMemo(
		() =>
			new THREE.SpriteMaterial({
				map: halo(),
				color: "#4dc0ff",
				transparent: true,
				blending: THREE.AdditiveBlending,
				depthWrite: false,
			}),
		[],
	);
	useLayoutEffect(() => {
		if (!group.current) return;
		onHandle({
			group: group.current,
			mats: [],
			faces: [],
			line: line.current ?? undefined,
		});
		return () => onHandle(null);
	}, [onHandle]);
	// Data moves along every live link; broken (dashed) links carry nothing.
	useFrame((state) => {
		const g = packets.current;
		if (!g || def.dashed) return;
		const opacity =
			(group.current?.userData.opacity as number | undefined) ?? 1;
		const tone = group.current?.userData.tone as string | undefined;
		g.visible = opacity > 0.05 && tone !== "red";
		packetMat.opacity = opacity;
		haloMat.opacity = opacity * 0.9;
		g.children.forEach((c, i) => {
			const f = (state.clock.elapsedTime * 0.45 + i / g.children.length) % 1;
			c.position.lerpVectors(from, to, f);
			const fade = Math.sin(f * Math.PI);
			c.scale.setScalar(0.4 + fade * 0.6);
		});
	});
	return (
		<group ref={group}>
			<Line
				color="#4dc0ff"
				dashed={def.dashed}
				dashScale={1}
				dashSize={0.06}
				gapSize={0.16}
				lineWidth={def.dashed ? 3 : 2.5}
				points={[def.from, def.to] as [V3, V3]}
				ref={line}
				transparent
			/>
			{!def.dashed && (
				<group ref={packets}>
					{[0, 1].map((i) => (
						<group key={i}>
							<mesh geometry={packetGeo} material={packetMat} />
							<sprite material={haloMat} scale={0.5} />
						</group>
					))}
				</group>
			)}
		</group>
	);
}

/** A dotted floor that fades out from the middle of the scene. */
function Floor({ centre }: { centre: V3 }) {
	const theme = useTheme();
	const texture = useMemo(() => {
		void theme;
		const css = getComputedStyle(document.documentElement);
		const dot = css.getPropertyValue("--scene-line").trim() || "#4dc0ff";
		const c = document.createElement("canvas");
		c.width = c.height = 1024;
		const g = c.getContext("2d");
		if (g) {
			for (let x = 16; x < 1024; x += 32)
				for (let y = 16; y < 1024; y += 32) {
					const d = Math.hypot(x - 512, y - 512) / 512;
					g.globalAlpha = Math.max(0, 1 - d) ** 1.6 * 0.55;
					g.fillStyle = dot;
					g.beginPath();
					g.arc(x, y, 2.2, 0, Math.PI * 2);
					g.fill();
				}
		}
		const t = new THREE.CanvasTexture(c);
		t.anisotropy = 4;
		return t;
	}, [theme]);
	return (
		<mesh
			position={[centre[0], -0.004, centre[2]]}
			receiveShadow
			rotation={[-Math.PI / 2, 0, 0]}
		>
			<planeGeometry args={[22, 22]} />
			<meshBasicMaterial depthWrite={false} map={texture} transparent />
		</mesh>
	);
}

/** Light, reflections, shadows and drifting particles shared by every scene. */
function Scenery({ resolved }: { resolved: Resolved }) {
	const theme = useTheme();
	const centre = useMemo<V3>(() => {
		const pts = resolved.defs
			.filter((d) => !isOverlay(d))
			.map((d) => ("at" in d ? d.at : d.from));
		if (!pts.length) return [0, 0, 0];
		const sum = pts.reduce((a, p) => [a[0] + p[0], 0, a[2] + p[2]], [
			0, 0, 0,
		] as V3);
		return [sum[0] / pts.length + 0.5, 0, sum[2] / pts.length + 0.5];
	}, [resolved]);
	const dark = theme === "dark";
	return (
		<>
			<ambientLight intensity={dark ? 0.55 : 0.8} />
			<hemisphereLight
				color="#dff2ff"
				groundColor={dark ? "#05080d" : "#c9dced"}
				intensity={0.6}
			/>
			<directionalLight intensity={dark ? 1.6 : 1.9} position={[-4, 12, 9]} />
			<directionalLight
				color="#4dc0ff"
				intensity={dark ? 1.4 : 0.8}
				position={[10, 5, -6]}
			/>
			<Environment frames={1} resolution={128}>
				<Lightformer
					form="rect"
					intensity={3}
					position={[0, 6, 6]}
					scale={[10, 4, 1]}
				/>
				<Lightformer
					color="#4dc0ff"
					form="rect"
					intensity={2.4}
					position={[8, 2, -4]}
					scale={[6, 6, 1]}
				/>
				<Lightformer
					form="ring"
					intensity={1.5}
					position={[-6, 4, 2]}
					scale={3}
				/>
			</Environment>
			<Floor centre={centre} />
			<ContactShadows
				blur={2.6}
				far={5}
				frames={Infinity}
				opacity={dark ? 0.7 : 0.35}
				position={[centre[0], 0, centre[2]]}
				resolution={512}
				scale={22}
			/>
			<Sparkles
				color="#4dc0ff"
				count={50}
				noise={0.6}
				opacity={dark ? 0.7 : 0.45}
				position={[centre[0], 2, centre[2]]}
				scale={[14, 4, 14]}
				size={2.4}
				speed={0.25}
			/>
		</>
	);
}

function OverlayLayer({
	resolved,
	step,
	els,
}: {
	resolved: Resolved;
	step: number;
	els: RefObject<Map<string, HTMLDivElement>>;
}) {
	const st = resolved.states[step];
	if (!st) return null;
	return (
		<div
			aria-hidden="true"
			className="pointer-events-none absolute inset-0 overflow-hidden"
		>
			{resolved.defs.filter(isOverlay).map((d: ObjDef) => {
				const s = st.get(d.id);
				if (!s) return null;
				return (
					<div
						className="absolute top-0 left-0 will-change-transform"
						key={d.id}
						ref={(el) => {
							if (el) els.current?.set(d.id, el);
							else els.current?.delete(d.id);
						}}
						style={{ transform: "translate3d(-9999px, 0, 0)" }}
					>
						<div className="-translate-x-1/2 -translate-y-1/2">
							<div
								className={cn(
									"transition-[opacity,transform] duration-500 ease-out",
									s.visible ? "opacity-100" : "translate-y-2 opacity-0",
								)}
							>
								<Overlay def={d} state={s} />
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default function SceneCanvas({
	resolved,
	progress,
	step,
	active,
}: {
	resolved: Resolved;
	progress: RefObject<number>;
	step: number;
	active: boolean;
}) {
	const overlayEls = useRef(new Map<string, HTMLDivElement>());
	return (
		<div className="relative h-full w-full">
			<Canvas
				camera={{ position: [30, 30, 30], zoom: 60, near: 0.1, far: 500 }}
				dpr={[1, 2]}
				frameloop={active ? "always" : "never"}
				gl={{
					antialias: true,
					alpha: true,
					powerPreference: "high-performance",
				}}
				orthographic
				shadows
			>
				<Scenery resolved={resolved} />
				<Rig overlayEls={overlayEls} progress={progress} resolved={resolved} />
			</Canvas>
			<OverlayLayer els={overlayEls} resolved={resolved} step={step} />
		</div>
	);
}
