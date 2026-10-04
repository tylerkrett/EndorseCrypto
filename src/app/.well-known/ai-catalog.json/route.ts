import { absoluteUrl } from "~/lib/pages";
import { SITE_URL } from "~/lib/site";

export const dynamic = "force-static";

/** AI Catalog (SEP-2127): domain-level discovery of the MCP server, as on LotusUmbrella. */
export function GET() {
	const domain = new URL(SITE_URL).hostname.replace(/^www\./, "");
	return new Response(
		JSON.stringify(
			{
				specVersion: "1.0",
				entries: [
					{
						identifier: `urn:air:${domain}:mcp:lessons`,
						displayName: "EndorseCrypto lessons",
						description:
							"Read and search EndorseCrypto's beginner lessons on how crypto works, with the source behind every claim.",
						representativeQueries: [
							"How does a blockchain stop old records being changed?",
							"What backs a stablecoin and how can the peg break?",
							"What is the source for a figure in an EndorseCrypto lesson?",
						],
						type: "application/mcp-server-card+json",
						url: absoluteUrl("/mcp/server-card"),
					},
				],
			},
			null,
			2,
		),
		{
			headers: {
				"content-type": "application/ai-catalog+json",
				"cache-control": "public, max-age=3600",
				"access-control-allow-origin": "*",
			},
		},
	);
}
