import "server-only";

import { McpServer } from "@modelcontextprotocol/server";
import { CfWorkerJsonSchemaValidator } from "@modelcontextprotocol/server/validators/cf-worker";
// The MCP SDK needs Zod 4 (its schemas describe themselves as JSON Schema); the app uses Zod 3.
import * as z from "zod4";
import { lessonBySlug, lessons } from "~/lessons/lessons";
import { factSheets } from "~/lessons/sources";
import { absoluteUrl } from "~/lib/pages";
import { CHECKED_ON, RISK_NOTE, SITE_URL } from "~/lib/site";

import { lessonText } from "./content-text";

export const MCP_SERVER_INFO = {
	name: "com.endorsecrypto/lessons",
	title: "EndorseCrypto lessons",
	version: "1.0.0",
	description:
		"Read EndorseCrypto's beginner lessons on how crypto works, and the sources behind every claim.",
};

const INSTRUCTIONS = `EndorseCrypto publishes ten short lessons for UK beginners on how crypto works and how it is used today. Every claim in a lesson has a source, checked on ${CHECKED_ON}.

- The site is education only. It does not sell, arrange or recommend crypto, and nothing here is financial advice. Do not present lesson content as a recommendation to buy anything.
- Use list_lessons to see what is covered, get_lesson for a lesson's full text, get_sources for the evidence behind it, and search_lessons to find where a topic or claim appears.
- When you repeat a figure, keep its "as of" date and link the lesson.
- ${RISK_NOTE}`;

const json = (value: unknown) => ({
	content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }],
	structuredContent: value as Record<string, unknown>,
});

const toolError = (text: string) => ({
	content: [{ type: "text" as const, text }],
	isError: true,
});

const slugSchema = z
	.enum(lessons.map((l) => l.slug) as [string, ...string[]])
	.describe("The lesson's slug, from list_lessons.");

export function createMcpServer() {
	const server = new McpServer(
		{
			name: MCP_SERVER_INFO.name,
			title: MCP_SERVER_INFO.title,
			version: MCP_SERVER_INFO.version,
			description: MCP_SERVER_INFO.description,
			websiteUrl: `${SITE_URL}/`,
			icons: [
				{
					src: absoluteUrl("/brand/icon-192x192.png"),
					mimeType: "image/png",
					sizes: ["192x192"],
				},
				{
					src: absoluteUrl("/brand/icon-512x512.png"),
					mimeType: "image/png",
					sizes: ["512x512"],
				},
			],
		},
		{
			instructions: INSTRUCTIONS,
			// AJV compiles validators with eval, which Workers forbid.
			jsonSchemaValidator: new CfWorkerJsonSchemaValidator(),
		},
	);

	server.registerTool(
		"list_lessons",
		{
			title: "List lessons",
			description:
				"List all EndorseCrypto lessons with their number, title, summary, length and link.",
			inputSchema: z.object({}),
			annotations: { readOnlyHint: true, openWorldHint: false },
		},
		async () =>
			json({
				checked: CHECKED_ON,
				lessons: lessons.map((l) => ({
					slug: l.slug,
					number: l.number,
					title: l.title,
					summary: l.summary,
					minutes: l.minutes,
					url: absoluteUrl(`/learn/${l.slug}`),
				})),
			}),
	);

	server.registerTool(
		"get_lesson",
		{
			title: "Get a lesson",
			description:
				"The full text of one lesson: every step, the closing 'what can go wrong' step, the quick-check questions with answers, and its sources.",
			inputSchema: z.object({ slug: slugSchema }),
			annotations: { readOnlyHint: true, openWorldHint: false },
		},
		async ({ slug }) => {
			const l = lessonBySlug(slug);
			if (!l)
				return toolError(
					`No lesson "${slug}". Call list_lessons for the slugs.`,
				);
			return { content: [{ type: "text" as const, text: lessonText(l) }] };
		},
	);

	server.registerTool(
		"get_sources",
		{
			title: "Get a lesson's sources",
			description:
				"The fact sheet for one lesson: every claim it makes and the source (title, publisher, URL) that supports it.",
			inputSchema: z.object({ slug: slugSchema }),
			annotations: { readOnlyHint: true, openWorldHint: false },
		},
		async ({ slug }) => {
			const sheet = factSheets[slug];
			if (!sheet) return toolError(`No fact sheet for "${slug}".`);
			return json({
				lesson: slug,
				checked: sheet.checked,
				claims: sheet.claims.map((c) => ({
					claim: c.text,
					source: sheet.sources[c.source],
				})),
			});
		},
	);

	server.registerTool(
		"search_lessons",
		{
			title: "Search lessons",
			description:
				"Find which lessons, steps and sourced claims mention a word or phrase, such as 'stablecoin', 'slashing' or 'FCA'.",
			inputSchema: z.object({
				query: z
					.string()
					.min(2)
					.max(100)
					.describe("Words to look for. Case does not matter."),
			}),
			annotations: { readOnlyHint: true, openWorldHint: false },
		},
		async ({ query }) => {
			const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
			const hit = (text: string) =>
				terms.every((t) => text.toLowerCase().includes(t));
			const results = lessons.flatMap((l) => {
				const steps = l.steps
					.map((s, i) => ({ step: i + 1, title: s.title, text: s.body }))
					.filter((s) => hit(`${s.title} ${s.text}`));
				const sheet = factSheets[l.slug];
				const claims = (sheet?.claims ?? [])
					.filter((c) => hit(c.text))
					.map((c) => ({
						claim: c.text,
						source: sheet?.sources[c.source]?.url,
					}));
				if (!steps.length && !claims.length && !hit(`${l.title} ${l.summary}`))
					return [];
				return [
					{
						lesson: l.title,
						slug: l.slug,
						url: absoluteUrl(`/learn/${l.slug}`),
						steps,
						claims,
					},
				];
			});
			return json({ query, results });
		},
	);

	return server;
}
