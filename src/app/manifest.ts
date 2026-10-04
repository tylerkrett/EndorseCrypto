import type { MetadataRoute } from "next";

import { SITE_DESCRIPTION, SITE_NAME } from "~/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: SITE_NAME,
		short_name: SITE_NAME,
		description: SITE_DESCRIPTION,
		start_url: "/",
		display: "standalone",
		background_color: "#05080d",
		theme_color: "#05080d",
		icons: [
			{
				src: "/brand/icon-192x192.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "any",
			},
			{
				src: "/brand/icon-512x512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "any",
			},
			{
				src: "/brand/maskable-512x512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable",
			},
		],
	};
}
