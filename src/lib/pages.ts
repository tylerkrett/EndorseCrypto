import { lessons } from "~/lessons/lessons";

import { SITE_URL } from "./site";

// Every public page, with its title and description. The page files, the sitemap, llms.txt,
// the MCP server and the SEO audit all read from here, so they never disagree.

export type PageInfo = { path: string; title: string; description: string };

export const STATIC_PAGES = {
	home: {
		path: "/",
		title: "EndorseCrypto: see how crypto actually works",
		description:
			"Ten short, animated lessons that show beginners how crypto works and how it is used today. Plain English, every claim sourced and dated.",
	},
	learn: {
		path: "/learn",
		title: "Lessons",
		description:
			"Ten short, animated lessons on how crypto works and how it is used today, from blockchains to tokenised assets.",
	},
	sources: {
		path: "/sources",
		title: "Sources and corrections",
		description:
			"Every source behind every EndorseCrypto lesson, how we check facts, and the corrections we have made.",
	},
	about: {
		path: "/about",
		title: "About",
		description:
			"What EndorseCrypto is and is not, the risks of crypto, and how the site handles your data.",
	},
} satisfies Record<string, PageInfo>;

export const lessonPage = (slug: string): PageInfo | undefined => {
	const l = lessons.find((x) => x.slug === slug);
	if (!l) return undefined;
	return {
		path: `/learn/${l.slug}`,
		title: `${l.title} (lesson ${l.number})`,
		description: `${l.summary} A ${l.minutes}-minute animated lesson for beginners, with every claim sourced.`,
	};
};

export const allPages = (): PageInfo[] => [
	...Object.values(STATIC_PAGES),
	...lessons.flatMap((l) => {
		const p = lessonPage(l.slug);
		return p ? [p] : [];
	}),
];

export const absoluteUrl = (path: string) =>
	`${SITE_URL}${path === "/" ? "" : path}`;
