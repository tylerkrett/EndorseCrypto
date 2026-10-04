import { lessons } from "~/lessons/lessons";
import { factSheets } from "~/lessons/sources";
import type { Lesson } from "~/lessons/types";

import { FAQS } from "./faq";
import { absoluteUrl, STATIC_PAGES } from "./pages";
import { CHECKED_ON, SITE_NAME, SITE_URL } from "./site";

// Schema.org data for search engines and AI assistants.

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const COURSE_ID = `${SITE_URL}/learn#course`;

export const siteGraph = () => [
	{
		"@type": "Organization",
		"@id": ORG_ID,
		name: SITE_NAME,
		url: `${SITE_URL}/`,
		logo: absoluteUrl("/brand/icon-512x512.png"),
	},
	{
		"@type": "WebSite",
		"@id": SITE_ID,
		name: SITE_NAME,
		url: `${SITE_URL}/`,
		description: STATIC_PAGES.home.description,
		inLanguage: "en-GB",
		publisher: { "@id": ORG_ID },
	},
];

export const courseGraph = () => ({
	"@type": "Course",
	"@id": COURSE_ID,
	name: "How crypto works: ten animated lessons",
	description: STATIC_PAGES.learn.description,
	url: absoluteUrl("/learn"),
	provider: { "@id": ORG_ID },
	inLanguage: "en-GB",
	isAccessibleForFree: true,
	educationalLevel: "Beginner",
	hasCourseInstance: {
		"@type": "CourseInstance",
		courseMode: "Online",
		courseWorkload: `PT${lessons.reduce((n, l) => n + l.minutes, 0)}M`,
	},
	offers: {
		"@type": "Offer",
		price: 0,
		priceCurrency: "GBP",
		category: "Free",
	},
	hasPart: lessons.map((l) => ({
		"@id": `${absoluteUrl(`/learn/${l.slug}`)}#lesson`,
	})),
});

export const lessonGraph = (l: Lesson) => ({
	"@type": "LearningResource",
	"@id": `${absoluteUrl(`/learn/${l.slug}`)}#lesson`,
	name: l.title,
	description: l.summary,
	url: absoluteUrl(`/learn/${l.slug}`),
	position: l.number,
	learningResourceType: "Interactive lesson",
	educationalLevel: "Beginner",
	timeRequired: `PT${l.minutes}M`,
	inLanguage: "en-GB",
	isAccessibleForFree: true,
	isPartOf: { "@id": COURSE_ID },
	publisher: { "@id": ORG_ID },
	dateModified: new Date(`${CHECKED_ON} UTC`).toISOString().slice(0, 10),
	teaches: l.steps.filter((s) => !s.risk).map((s) => s.title),
	citation: (factSheets[l.slug]?.sources ?? []).map((s) => ({
		"@type": "CreativeWork",
		name: s.title,
		publisher: s.publisher,
		url: s.url,
	})),
});

export const toJsonLd = (graph: unknown[]) =>
	JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
		/</g,
		"\\u003c",
	);

export const faqGraph = () => ({
	"@type": "FAQPage",
	"@id": `${SITE_URL}/#faq`,
	mainEntity: FAQS.map((f) => ({
		"@type": "Question",
		name: f.q,
		acceptedAnswer: { "@type": "Answer", text: f.a },
	})),
});

export const breadcrumbGraph = (items: { name: string; path: string }[]) => ({
	"@type": "BreadcrumbList",
	itemListElement: items.map((it, i) => ({
		"@type": "ListItem",
		position: i + 1,
		name: it.name,
		item: absoluteUrl(it.path),
	})),
});
