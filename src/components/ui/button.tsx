import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "~/lib/cn";

const base =
	"inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full px-6 font-semibold text-[15px] transition-colors";
const variants = {
	primary: "bg-brand text-brand-ink hover:brightness-110",
	ghost: "border-[1.5px] border-line-strong text-fg hover:bg-tint-dim",
};

export const buttonClass = (
	variant: keyof typeof variants = "primary",
	className?: string,
) => cn(base, variants[variant], className);

export function Arrow() {
	return (
		<svg
			aria-hidden="true"
			className="h-[18px] w-[18px]"
			fill="none"
			viewBox="0 0 24 24"
		>
			<path
				d="M5 12h14M12 5l7 7-7 7"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			/>
		</svg>
	);
}

export function ButtonLink({
	href,
	children,
	variant = "primary",
	className,
	arrow = variant === "primary",
}: {
	href: string;
	children: ReactNode;
	variant?: keyof typeof variants;
	className?: string;
	arrow?: boolean;
}) {
	return (
		<Link className={buttonClass(variant, className)} href={href}>
			{children}
			{arrow && <Arrow />}
		</Link>
	);
}
