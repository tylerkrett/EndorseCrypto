import Link from "next/link";

import { ButtonLink } from "~/components/ui/button";
import { Lockup } from "~/components/ui/logo";
import { NAV_LINKS } from "~/lib/site";

import { MobileMenu } from "./mobile-menu";
import { MotionToggle, ThemeToggle } from "./toggles";

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-40 border-line border-b bg-glass backdrop-blur-md backdrop-saturate-150">
			<nav
				aria-label="Main"
				className="container-page flex h-16 items-center justify-between gap-6 xl:h-[72px]"
			>
				<Link aria-label="EndorseCrypto home" className="rounded-md" href="/">
					<Lockup className="[&_span]:text-[17px] xl:[&_span]:text-[19px] [&_svg]:h-7 [&_svg]:w-7 xl:[&_svg]:h-8 xl:[&_svg]:w-8" />
				</Link>
				<ul className="hidden items-center gap-9 xl:flex">
					{NAV_LINKS.map((l) => (
						<li key={l.href}>
							<Link
								className="font-semibold text-[15px] text-muted transition-colors hover:text-fg"
								href={l.href}
							>
								{l.label}
							</Link>
						</li>
					))}
				</ul>
				<div className="flex items-center gap-3">
					<span className="hidden sm:block">
						<MotionToggle />
					</span>
					<ThemeToggle />
					<span className="hidden xl:block">
						<ButtonLink href="/learn/blockchain">Start lesson 1</ButtonLink>
					</span>
					<MobileMenu />
				</div>
			</nav>
		</header>
	);
}
