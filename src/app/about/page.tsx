import type { Metadata } from "next";

import { STATIC_PAGES } from "~/lib/pages";

import { RISK_NOTE } from "~/lib/site";

export const metadata: Metadata = {
	title: STATIC_PAGES.about.title,
	description: STATIC_PAGES.about.description,
	alternates: { canonical: STATIC_PAGES.about.path },
};

const FCA = "https://www.fca.org.uk/consumers/cryptoassets";
const FCA_BASICS = "https://www.fca.org.uk/investsmart/crypto-basics";
const FCA_REGISTER = "https://register.fca.org.uk/";

export default function AboutPage() {
	return (
		<div className="container-page flex max-w-[860px] flex-col gap-16 pt-14 pb-24 md:pt-20">
			<div className="flex flex-col gap-4">
				<p className="eyebrow text-brand-on">About</p>
				<h1 className="display-section">
					Crypto, explained by watching it work.
				</h1>
				<p className="text-[17px] text-muted leading-relaxed">
					EndorseCrypto makes short, animated lessons for people in the UK who
					are new to crypto. Each lesson shows how one part of crypto works, how
					it is used today and what can go wrong, in plain English, with every
					claim sourced and dated.
				</p>
			</div>

			<section className="flex flex-col gap-4" id="what-it-is-not">
				<h2 className="display-h3">What this site is not</h2>
				<p className="text-[16px] text-muted leading-relaxed">
					This site is education only. It does not sell, arrange or recommend
					crypto, it has no buy buttons and no commission links, and nothing
					here is financial advice. Lessons use example numbers unless a real
					figure is sourced and dated.
				</p>
			</section>

			<section
				className="flex scroll-mt-24 flex-col gap-4 rounded-[20px] border border-tint-amber-line bg-tint-amber p-6 md:p-8"
				id="risk"
			>
				<h2 className="display-h3">Risk warning</h2>
				<p className="text-[16px] text-fg leading-relaxed">{RISK_NOTE}</p>
				<p className="text-[16px] text-fg leading-relaxed">
					The FCA says crypto is largely unregulated in the UK and that you
					should not expect any compensation if something goes wrong. It also
					says anyone buying crypto should be prepared to lose all their money.
					Before using any crypto firm, check it on the{" "}
					<a
						className="font-semibold underline underline-offset-4"
						href={FCA_REGISTER}
						rel="noreferrer"
						target="_blank"
					>
						FCA Register
					</a>
					.
				</p>
				<p className="text-[13px] text-dim">
					Sources:{" "}
					<a className="underline" href={FCA} rel="noreferrer" target="_blank">
						FCA, cryptoassets
					</a>
					;{" "}
					<a
						className="underline"
						href={FCA_BASICS}
						rel="noreferrer"
						target="_blank"
					>
						FCA InvestSmart, crypto basics
					</a>
					.
				</p>
			</section>

			<section className="flex scroll-mt-24 flex-col gap-4" id="privacy">
				<h2 className="display-h3">Privacy</h2>
				<p className="text-[16px] text-muted leading-relaxed">
					There are no accounts and nothing to sign up for. The site sets no
					cookies of its own and runs no advertising or tracking. Your theme,
					your animation setting and the lessons you have completed are stored
					only in your own browser, and you can clear them at any time by
					clearing this site's data.
				</p>
				<p className="text-[16px] text-muted leading-relaxed">
					The site is hosted by Cloudflare, which processes basic request data,
					such as IP addresses, to deliver and protect it. A full privacy policy
					will be published before any feature that collects personal data, such
					as accounts.
				</p>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="display-h3">The company</h2>
				<p className="text-[16px] text-muted leading-relaxed">
					EndorseCrypto is being set up as a UK limited company. Its registered
					name, company number and registered office will be shown here and in
					the footer once it is registered.
				</p>
			</section>
		</div>
	);
}
