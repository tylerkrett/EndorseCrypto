import Link from "next/link";

import { Lockup } from "~/components/ui/logo";
import { RISK_NOTE } from "~/lib/site";

const COLUMNS = [
	{
		head: "Learn",
		links: [
			{ href: "/learn", label: "All lessons" },
			{ href: "/#how-it-works", label: "How a lesson works" },
			{ href: "/learn/blockchain", label: "Start lesson 1" },
		],
	},
	{
		head: "Trust",
		links: [
			{ href: "/sources", label: "Sources and corrections" },
			{ href: "/sources#how-we-check", label: "How we check facts" },
			{ href: "/about#risk", label: "Risk warning" },
		],
	},
	{
		head: "Company",
		links: [
			{ href: "/about", label: "About" },
			{ href: "/about#privacy", label: "Privacy" },
		],
	},
];

export function SiteFooter() {
	return (
		<footer className="bg-panel">
			<div className="container-page flex flex-col gap-10 py-16">
				<div className="flex flex-col gap-10 md:flex-row md:gap-16">
					<div className="flex max-w-[340px] flex-col gap-4">
						<Lockup />
						<p className="text-[15px] text-muted">
							Plain-English, animated lessons on how crypto works. Every claim
							is sourced and dated.
						</p>
					</div>
					<div className="hidden flex-1 md:block" />
					<div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
						{COLUMNS.map((c) => (
							<div className="flex flex-col gap-3" key={c.head}>
								<p className="eyebrow text-dim">{c.head}</p>
								{c.links.map((l) => (
									<Link
										className="font-semibold text-[15px] text-fg hover:text-brand-on"
										href={l.href}
										key={l.href}
									>
										{l.label}
									</Link>
								))}
							</div>
						))}
					</div>
				</div>
				<div className="flex flex-col gap-1.5 rounded-[14px] border border-tint-amber-line bg-tint-amber px-6 py-5">
					<p className="eyebrow text-accent">Risk note</p>
					<p className="text-[15px] text-fg">{RISK_NOTE}</p>
				</div>
				<div className="flex flex-col justify-between gap-2 text-[13px] text-dim sm:flex-row">
					<p>
						EndorseCrypto. Company number and registered office will be shown
						here once the company is registered.
					</p>
					<p className="shrink-0">
						Developed by{" "}
						<a
							className="font-semibold text-muted underline-offset-4 hover:text-fg hover:underline"
							href="https://krett.com"
							rel="noopener"
							target="_blank"
						>
							Krett.com
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
}
