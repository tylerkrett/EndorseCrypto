"use client";

import { type ReactNode, useEffect, useRef } from "react";

import { cn } from "~/lib/cn";

/**
 * Fades and lifts its content in when it scrolls into view, as on theWyze. Nothing already on
 * screen is ever hidden, and nothing moves when animation is off (the CSS is gated on it).
 */
export function Reveal({
	children,
	className,
	delay = 0,
}: {
	children: ReactNode;
	className?: string;
	delay?: number;
}) {
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const node = ref.current;
		if (!node || typeof IntersectionObserver === "undefined") return;
		if (node.getBoundingClientRect().top < window.innerHeight * 0.9) return;
		node.classList.add("is-pending");
		const io = new IntersectionObserver(
			(entries) => {
				if (entries.some((e) => e.isIntersecting)) {
					node.classList.remove("is-pending");
					io.disconnect();
				}
			},
			{ rootMargin: "0px 0px -10% 0px" },
		);
		io.observe(node);
		return () => io.disconnect();
	}, []);
	return (
		<div
			className={cn("reveal", className)}
			ref={ref}
			style={delay ? { transitionDelay: `${delay}ms` } : undefined}
		>
			{children}
		</div>
	);
}
