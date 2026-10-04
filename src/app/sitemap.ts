import type { MetadataRoute } from "next";

import { absoluteUrl, allPages } from "~/lib/pages";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	return allPages().map((p) => ({
		url: absoluteUrl(p.path),
		changeFrequency: "monthly",
		priority: p.path === "/" ? 1 : p.path.startsWith("/learn/") ? 0.8 : 0.6,
	}));
}
