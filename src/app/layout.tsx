import "~/styles/globals.css";

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";

import { SiteFooter } from "~/components/site/footer";
import { SiteHeader } from "~/components/site/header";
import { JsonLd } from "~/components/site/json-ld";
import { STATIC_PAGES } from "~/lib/pages";
import { PREFS_SCRIPT } from "~/lib/prefs";
import { SITE_NAME, SITE_URL } from "~/lib/site";
import { siteGraph } from "~/lib/structured-data";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: STATIC_PAGES.home.title,
		template: `%s | ${SITE_NAME}`,
	},
	description: STATIC_PAGES.home.description,
	applicationName: SITE_NAME,
	alternates: { canonical: "./" },
	openGraph: {
		type: "website",
		siteName: SITE_NAME,
		locale: "en_GB",
		url: "/",
		title: STATIC_PAGES.home.title,
		description: STATIC_PAGES.home.description,
	},
	twitter: { card: "summary_large_image" },
	formatDetection: { email: false, address: false, telephone: false },
};

export const viewport: Viewport = {
	colorScheme: "dark light",
	themeColor: "#05080d",
};

const sora = Sora({
	subsets: ["latin"],
	weight: ["600", "700", "800"],
	variable: "--font-sora",
});
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({
	subsets: ["latin"],
	weight: ["500"],
	variable: "--font-geist-mono",
	preload: false,
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			className={`${sora.variable} ${geist.variable} ${geistMono.variable}`}
			lang="en-GB"
			suppressHydrationWarning
		>
			<head>
				{/* Theme and animation choice, applied before first paint so nothing flashes. */}
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: a fixed, first-party script */}
				<script dangerouslySetInnerHTML={{ __html: PREFS_SCRIPT }} />
			</head>
			<body>
				<a
					className="fixed top-3 left-3 z-50 -translate-y-20 rounded-full bg-brand px-4 py-2 font-semibold text-brand-ink focus:translate-y-0"
					href="#main"
				>
					Skip to content
				</a>
				<JsonLd graph={siteGraph()} />
				<SiteHeader />
				<main id="main">{children}</main>
				<SiteFooter />
			</body>
		</html>
	);
}
