import { SUPPORTED_PROTOCOL_VERSIONS } from "@modelcontextprotocol/server";

import { absoluteUrl } from "~/lib/pages";
import { SITE_URL } from "~/lib/site";
import { MCP_SERVER_INFO } from "~/server/mcp";

export const dynamic = "force-static";

/** MCP Server Card (SEP-2127): what an assistant needs to connect, before connecting. */
export function GET() {
	const card = {
		$schema:
			"https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json",
		name: MCP_SERVER_INFO.name,
		version: MCP_SERVER_INFO.version,
		title: MCP_SERVER_INFO.title,
		description: MCP_SERVER_INFO.description,
		websiteUrl: `${SITE_URL}/`,
		icons: [
			{
				src: absoluteUrl("/brand/icon-512x512.png"),
				mimeType: "image/png",
				sizes: ["512x512"],
			},
		],
		remotes: [
			{
				type: "streamable-http",
				url: absoluteUrl("/mcp"),
				supportedProtocolVersions: [
					"2026-07-28",
					...SUPPORTED_PROTOCOL_VERSIONS,
				],
			},
		],
	};
	return new Response(JSON.stringify(card, null, 2), {
		headers: {
			"content-type": "application/mcp-server-card+json",
			"cache-control": "public, max-age=3600",
			"access-control-allow-origin": "*",
		},
	});
}
