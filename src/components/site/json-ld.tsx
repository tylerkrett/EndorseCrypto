import { toJsonLd } from "~/lib/structured-data";

export function JsonLd({ graph }: { graph: unknown[] }) {
	return (
		<script
			// biome-ignore lint/security/noDangerouslySetInnerHtml: serialised structured data, with < escaped
			dangerouslySetInnerHTML={{ __html: toJsonLd(graph) }}
			type="application/ld+json"
		/>
	);
}
