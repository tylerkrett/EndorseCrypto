"use client";

import { Environment, Lightformer, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

import { MARK } from "~/components/ui/logo";
import { useTheme } from "~/lib/prefs";

// The hero in 3D: the ring from the logo as ten extruded segments, one per lesson, around a
// solid version of the mark. A pulse of light runs round the ring, packets orbit it, and the
// whole piece tilts towards the pointer.

const R_OUT = 3.2;
const R_IN = 2.56;
const GAP = 0.07;

function segmentGeometry(i: number) {
	const a0 = Math.PI / 2 - (i * Math.PI) / 5 - GAP;
	const a1 = Math.PI / 2 - ((i + 1) * Math.PI) / 5 + GAP;
	const s = new THREE.Shape();
	s.absarc(0, 0, R_OUT, a0, a1, true);
	s.absarc(0, 0, R_IN, a1, a0, false);
	s.closePath();
	const g = new THREE.ExtrudeGeometry(s, {
		depth: 0.34,
		bevelEnabled: true,
		bevelSize: 0.05,
		bevelThickness: 0.05,
		bevelSegments: 3,
		curveSegments: 24,
	});
	g.translate(0, 0, -0.17);
	return g;
}

function markGeometry() {
	const data = new SVGLoader().parse(
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="28 33 230 244"><path d="${MARK}"/></svg>`,
	);
	const shapes = data.paths.flatMap((p) => p.toShapes());
	const g = new THREE.ExtrudeGeometry(shapes, {
		depth: 26,
		bevelEnabled: true,
		bevelSize: 2.2,
		bevelThickness: 2.4,
		bevelSegments: 3,
		curveSegments: 10,
	});
	g.center();
	// SVG y runs down: turn it over (a rotation keeps the faces pointing outwards) and scale it.
	g.rotateX(Math.PI);
	g.scale(0.0118, 0.0118, 0.0118);
	g.computeVertexNormals();
	return g;
}

function HeroPiece() {
	const theme = useTheme();
	const group = useRef<THREE.Group>(null);
	const mark = useRef<THREE.Mesh>(null);
	const orbit = useRef<THREE.Group>(null);
	const start = useRef<number | null>(null);
	const geos = useMemo(
		() => Array.from({ length: 10 }, (_, i) => segmentGeometry(i)),
		[],
	);
	const markGeo = useMemo(() => markGeometry(), []);
	const blue = useMemo(() => {
		void theme;
		const css = getComputedStyle(document.documentElement);
		return new THREE.Color(
			css.getPropertyValue("--brand-on").trim() || "#4dc0ff",
		);
	}, [theme]);
	const segMats = useMemo(
		() =>
			geos.map(
				() =>
					new THREE.MeshStandardMaterial({
						roughness: 0.25,
						metalness: 0.35,
						emissiveIntensity: 1,
					}),
			),
		[geos],
	);
	const markMat = useMemo(
		() =>
			new THREE.MeshPhysicalMaterial({
				color: "#00a4ff",
				roughness: 0.18,
				metalness: 0.35,
				clearcoat: 1,
				clearcoatRoughness: 0.15,
				emissive: "#00a4ff",
				emissiveIntensity: 0.18,
			}),
		[],
	);

	useFrame((state, dt) => {
		const t = state.clock.elapsedTime;
		if (start.current === null) start.current = t;
		const since = t - start.current;
		const k = 1 - Math.exp(-Math.min(dt, 0.1) * 4);
		const g = group.current;
		if (g) {
			g.rotation.x +=
				(-state.pointer.y * 0.28 + Math.sin(t * 0.4) * 0.04 - g.rotation.x) * k;
			g.rotation.y +=
				(state.pointer.x * 0.38 + Math.sin(t * 0.3) * 0.06 - g.rotation.y) * k;
		}
		if (mark.current) mark.current.rotation.y = Math.sin(t * 0.6) * 0.22;
		// Segments light up in turn on arrival, then a pulse keeps running round the ring.
		const pulse = (t * 0.35) % 1;
		segMats.forEach((m, i) => {
			const on = THREE.MathUtils.clamp((since - 0.2 - i * 0.12) / 0.35, 0, 1);
			const d = Math.abs((((i + 0.5) / 10 - pulse + 1.5) % 1) - 0.5);
			const glow = Math.max(0, 1 - d * 6);
			m.color.copy(blue);
			m.emissive.copy(blue).multiplyScalar(0.12 + glow * 0.75 * on);
			m.opacity = 0.15 + on * 0.85;
			m.transparent = on < 1;
		});
		if (orbit.current) orbit.current.rotation.z = -t * 0.5;
	});

	const haloTex = useMemo(() => {
		const c = document.createElement("canvas");
		c.width = c.height = 64;
		const x = c.getContext("2d");
		if (x) {
			const r = x.createRadialGradient(32, 32, 0, 32, 32, 32);
			r.addColorStop(0, "rgba(255,255,255,1)");
			r.addColorStop(0.3, "rgba(255,255,255,0.4)");
			r.addColorStop(1, "rgba(255,255,255,0)");
			x.fillStyle = r;
			x.fillRect(0, 0, 64, 64);
		}
		return new THREE.CanvasTexture(c);
	}, []);

	return (
		<group ref={group}>
			{geos.map((g, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: ten fixed segments
				<mesh geometry={g} key={i} material={segMats[i]} />
			))}
			<mesh geometry={markGeo} material={markMat} ref={mark} />
			<group ref={orbit}>
				{[0, 2.1, 4.2].map((a, i) => (
					<group
						key={a}
						position={[
							Math.cos(a) * (R_OUT + 0.35 + i * 0.12),
							Math.sin(a) * (R_OUT + 0.35 + i * 0.12),
							0.3,
						]}
					>
						<mesh>
							<sphereGeometry args={[0.06, 16, 12]} />
							<meshBasicMaterial color="#d9f1ff" />
						</mesh>
						<sprite scale={0.7}>
							<spriteMaterial
								blending={THREE.AdditiveBlending}
								color="#4dc0ff"
								depthWrite={false}
								map={haloTex}
								transparent
							/>
						</sprite>
					</group>
				))}
			</group>
		</group>
	);
}

export default function HeroScene() {
	const theme = useTheme();
	return (
		<Canvas
			camera={{ position: [0, 0, 12], fov: 35 }}
			dpr={[1, 2]}
			gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
		>
			<ambientLight intensity={theme === "dark" ? 0.5 : 0.8} />
			<directionalLight intensity={1.8} position={[-4, 6, 8]} />
			<directionalLight color="#4dc0ff" intensity={1.2} position={[6, -2, 4]} />
			<Environment frames={1} resolution={128}>
				<Lightformer
					form="rect"
					intensity={3}
					position={[0, 5, 6]}
					scale={[10, 3, 1]}
				/>
				<Lightformer
					color="#4dc0ff"
					form="ring"
					intensity={2.5}
					position={[6, 0, 3]}
					scale={4}
				/>
				<Lightformer
					form="rect"
					intensity={1.2}
					position={[-6, -3, 4]}
					scale={[4, 6, 1]}
				/>
			</Environment>
			<HeroPiece />
			<Sparkles
				color="#4dc0ff"
				count={40}
				noise={0.8}
				opacity={theme === "dark" ? 0.8 : 0.5}
				scale={[9, 9, 3]}
				size={2.6}
				speed={0.3}
			/>
		</Canvas>
	);
}
