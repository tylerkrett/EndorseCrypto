import { ImageResponse } from "next/og";

import { MARK } from "~/components/ui/logo";

// The social share image: the mark, the ring and the headline. Built once at build time.
export const dynamic = "force-static";
export const alt = "EndorseCrypto: see how crypto actually works";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
	const segs = Array.from({ length: 10 }, (_, i) => {
		const c = 210;
		const R = 200;
		const r = 160;
		const a0 = -Math.PI / 2 + (i * Math.PI) / 5 + 0.07;
		const a1 = -Math.PI / 2 + ((i + 1) * Math.PI) / 5 - 0.07;
		const p = (rad: number, a: number) =>
			`${c + rad * Math.cos(a)} ${c + rad * Math.sin(a)}`;
		return `M${p(R, a0)}A${R} ${R} 0 0 1 ${p(R, a1)}L${p(r, a1)}A${r} ${r} 0 0 0 ${p(r, a0)}Z`;
	});
	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "0 90px",
				background: "#05080d",
				color: "#ffffff",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 24,
					maxWidth: 640,
				}}
			>
				<div
					style={{
						display: "flex",
						fontSize: 26,
						letterSpacing: 4,
						color: "#00a4ff",
						fontWeight: 800,
					}}
				>
					ENDORSECRYPTO
				</div>
				<div
					style={{
						display: "flex",
						fontSize: 72,
						fontWeight: 800,
						lineHeight: 1.04,
						letterSpacing: -2,
					}}
				>
					See how crypto actually works.
				</div>
				<div style={{ display: "flex", fontSize: 28, color: "#a7b4c8" }}>
					Ten short, animated lessons. Every claim sourced and dated.
				</div>
			</div>
			{/* biome-ignore lint/a11y/noSvgWithoutTitle: rendered to a PNG; the image alt text is set above */}
			<svg height="420" viewBox="0 0 420 420" width="420">
				{segs.map((d) => (
					<path d={d} fill="#4dc0ff" key={d} />
				))}
				<g transform="translate(120 120) scale(0.78)">
					<path
						d={MARK}
						fill="#00a4ff"
						fillRule="evenodd"
						transform="translate(-28 -33)"
					/>
				</g>
			</svg>
		</div>,
		size,
	);
}
