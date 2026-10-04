import { createMcpHandler } from "@modelcontextprotocol/server";

import { absoluteUrl } from "~/lib/pages";
import { createMcpServer } from "~/server/mcp";

export const dynamic = "force-dynamic";

/**
 * Public MCP endpoint (Streamable HTTP, stateless, read-only): AI assistants can list, read and
 * search the lessons and their sources. Discovery: /.well-known/ai-catalog.json, then
 * /mcp/server-card. The same setup as LotusUmbrella.
 */
const handler = createMcpHandler(() => createMcpServer(), {
	responseMode: "json",
});

const CORS: Record<string, string> = {
	"access-control-allow-origin": "*",
	"access-control-allow-methods": "GET, POST, DELETE, OPTIONS",
	"access-control-allow-headers":
		"content-type, accept, authorization, mcp-protocol-version, mcp-session-id, last-event-id",
	"access-control-expose-headers": "mcp-protocol-version, mcp-session-id",
	"access-control-max-age": "86400",
};

function withCors(response: Response) {
	const headers = new Headers(response.headers);
	for (const [name, value] of Object.entries(CORS)) headers.set(name, value);
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
}

async function handle(request: Request) {
	const accept = request.headers.get("accept") ?? "";
	if (
		request.method === "GET" &&
		accept.includes("text/html") &&
		!accept.includes("text/event-stream")
	) {
		return new Response(
			`EndorseCrypto MCP server.\n\nAdd ${absoluteUrl("/mcp")} as a remote MCP server (Streamable HTTP) in your AI assistant to read and search the lessons and their sources.\n\nServer card: ${absoluteUrl("/mcp/server-card")}\nAbout this site for AI assistants: ${absoluteUrl("/llms.txt")}\n`,
			{ headers: { "content-type": "text/plain; charset=utf-8", ...CORS } },
		);
	}
	return withCors(await handler.fetch(request));
}

export const GET = handle;
export const POST = handle;
export const DELETE = handle;

export function OPTIONS() {
	return new Response(null, { status: 204, headers: CORS });
}
