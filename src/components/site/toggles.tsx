"use client";

import { useEffect, useState } from "react";

import { cn } from "~/lib/cn";
import {
	hasWebGL,
	setMotion,
	setTheme,
	useMotion,
	useTheme,
} from "~/lib/prefs";

const stroke = {
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round" as const,
	strokeLinejoin: "round" as const,
};

export function ThemeToggle({ className }: { className?: string }) {
	const theme = useTheme();
	const next = theme === "dark" ? "light" : "dark";
	return (
		<button
			aria-label={`Switch to ${next} theme`}
			className={cn(
				"inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg transition-colors hover:bg-tint-dim",
				className,
			)}
			onClick={() => setTheme(next)}
			title={`Switch to ${next} theme`}
			type="button"
		>
			<svg aria-hidden="true" className="h-[18px] w-[18px]" viewBox="0 0 24 24">
				{theme === "dark" ? (
					<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" {...stroke} />
				) : (
					<>
						<circle cx="12" cy="12" r="4" {...stroke} />
						<path
							d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
							{...stroke}
						/>
					</>
				)}
			</svg>
		</button>
	);
}

/**
 * The animation switch, as on Himbad. Off is the plain site: still pictures instead of 3D scenes,
 * and none of the 3D code is downloaded. It starts from the device's reduce-motion setting.
 */
export function MotionToggle({
	className,
	wide,
}: {
	className?: string;
	wide?: boolean;
}) {
	const motion = useMotion();
	const on = motion === "on";
	const [noWebGL, setNoWebGL] = useState(false);

	useEffect(() => {
		if (!hasWebGL()) setNoWebGL(true);
	}, []);

	return (
		<button
			aria-checked={on}
			className={cn(
				"inline-flex h-10 items-center gap-2 rounded-full border border-line pr-3.5 pl-3 text-fg transition-colors hover:bg-tint-dim",
				wide && "w-full justify-between",
				className,
			)}
			onClick={() => setMotion(on ? "off" : "on")}
			role="switch"
			title={
				noWebGL
					? "This browser cannot show the 3D scenes, so lessons use still pictures"
					: on
						? "Turn animation off"
						: "Turn animation on"
			}
			type="button"
		>
			<span className="inline-flex items-center gap-2">
				<svg
					aria-hidden="true"
					className={cn("h-4 w-4", on ? "text-brand-on" : "text-dim")}
					viewBox="0 0 24 24"
				>
					<path
						d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
						{...stroke}
					/>
				</svg>
				<span className="font-medium text-[13px]">Animation</span>
			</span>
			<span className={cn("mono-tag", on ? "text-brand-on" : "text-dim")}>
				{on ? "On" : "Off"}
			</span>
		</button>
	);
}
