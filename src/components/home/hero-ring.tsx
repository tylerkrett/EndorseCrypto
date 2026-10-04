"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Mark } from "~/components/ui/logo";
import { Ring, segmentAngle } from "~/components/ui/ring";
import { Chip } from "~/components/ui/tag";
import { lessons } from "~/lessons/lessons";
import { hasWebGL, useEngaged, useMotion } from "~/lib/prefs";

// The 3D hero loads only when animation is on and the browser can show it.
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

// The hero: the ring from the logo, one segment per lesson. Numbers around it link to lessons.
// The flat SVG ring is the static view and the placeholder while the 3D version loads.
export function HeroRing() {
	const motion = useMotion();
	const [webgl, setWebgl] = useState(false);
	useEffect(() => setWebgl(hasWebGL()), []);
	const engaged = useEngaged();
	const show3d = motion === "on" && webgl && engaged;
	return (
		<div className="relative mx-auto aspect-square w-full max-w-[540px]">
			<div className="pointer-events-none absolute inset-[16%] rounded-full bg-glow blur-[80px]" />
			{show3d ? (
				<div className="absolute inset-0">
					<HeroScene />
				</div>
			) : (
				<>
					<div className="absolute inset-[9%]">
						<Ring
							animate
							className="h-full w-full ring-turn"
							filled="all"
							thickness={0.11}
						/>
					</div>
					<div className="absolute inset-[33%] flex items-center justify-center">
						<Mark className="h-full w-full drop-shadow-[0_0_30px_var(--glow-blue)]" />
					</div>
				</>
			)}
			{lessons.map((l, i) => {
				const a = segmentAngle(i);
				const r = 47;
				return (
					<Link
						aria-label={`${String(l.number).padStart(2, "0")} ${l.title}`}
						className="mono-tag absolute -translate-x-1/2 -translate-y-1/2 rounded-md px-1.5 py-1 text-dim transition-colors hover:bg-tint-blue hover:text-brand-on"
						href={`/learn/${l.slug}`}
						key={l.slug}
						prefetch={false}
						style={{
							left: `${(50 + Math.cos(a) * r).toFixed(3)}%`,
							top: `${(50 + Math.sin(a) * r).toFixed(3)}%`,
						}}
						title={l.title}
					>
						{String(l.number).padStart(2, "0")}
					</Link>
				);
			})}
			<div className="pointer-events-none hidden sm:block">
				<Chip
					className="float-y absolute top-[4%] right-[-2%]"
					meta="Lesson 01"
					title="What is a blockchain?"
				/>
				<Chip
					className="float-y absolute right-[-4%] bottom-[14%] [animation-delay:-2s]"
					meta="Lesson 05"
					title="Stablecoins"
					tone="amber"
				/>
				<Chip
					className="float-y absolute bottom-[30%] left-[-8%] [animation-delay:-4s]"
					meta="Lesson 08"
					title="Staking"
					tone="green"
				/>
			</div>
		</div>
	);
}
