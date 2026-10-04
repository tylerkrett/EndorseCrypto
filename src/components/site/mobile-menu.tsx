"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { buttonClass } from "~/components/ui/button";
import { NAV_LINKS } from "~/lib/site";

import { MotionToggle } from "./toggles";

export function MobileMenu() {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	// biome-ignore lint/correctness/useExhaustiveDependencies: close whenever the route changes
	useEffect(() => setOpen(false), [pathname]);

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);

	return (
		<div className="xl:hidden">
			<button
				aria-controls="mobile-menu"
				aria-expanded={open}
				aria-label={open ? "Close menu" : "Open menu"}
				className="inline-flex h-10 w-10 items-center justify-center rounded-full text-fg hover:bg-tint-dim"
				onClick={() => setOpen((o) => !o)}
				type="button"
			>
				<svg
					aria-hidden="true"
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						d={open ? "M6 6l12 12M18 6 6 18" : "M4 6h16M4 12h16M4 18h16"}
						stroke="currentColor"
						strokeLinecap="round"
						strokeWidth="2"
					/>
				</svg>
			</button>
			{open && (
				<div
					className="absolute inset-x-0 top-full border-line border-b bg-page shadow-xl"
					id="mobile-menu"
				>
					<div className="container-page flex flex-col gap-1 py-4">
						{NAV_LINKS.map((l) => (
							<Link
								className="rounded-xl px-3 py-3 font-semibold text-[17px] text-fg hover:bg-tint-dim"
								href={l.href}
								key={l.href}
								onClick={() => setOpen(false)}
							>
								{l.label}
							</Link>
						))}
						<div className="mt-3 flex flex-col gap-3">
							<MotionToggle wide />
							<Link className={buttonClass("primary")} href="/learn/blockchain">
								Start lesson 1
							</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
