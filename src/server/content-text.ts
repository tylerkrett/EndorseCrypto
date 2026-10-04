import { lessons } from "~/lessons/lessons";
import { factSheets } from "~/lessons/sources";
import type { Lesson } from "~/lessons/types";
import { absoluteUrl, allPages } from "~/lib/pages";
import { CHECKED_ON, RISK_NOTE, SITE_NAME } from "~/lib/site";

// Plain-text renderings of the site for AI assistants: llms.txt, llms-full.txt and the MCP tools.

export const lessonText = (l: Lesson) => {
	const sheet = factSheets[l.slug];
	const lines = [
		`## Lesson ${l.number}: ${l.title}`,
		"",
		`${l.summary} About ${l.minutes} minutes. ${absoluteUrl(`/learn/${l.slug}`)}`,
		"",
		...l.steps.flatMap((s, i) => [`### ${i + 1}. ${s.title}`, "", s.body, ""]),
		"### Quick check",
		"",
		...l.quiz.flatMap((q) => [
			`- ${q.prompt} Answer: ${q.options[q.answer]}. ${q.explain}`,
		]),
		"",
	];
	if (l.example) lines.push(`Note: ${l.example}`, "");
	if (sheet) {
		lines.push(`### Sources (checked ${CHECKED_ON})`, "");
		sheet.sources.forEach((s, i) => {
			lines.push(`- ${s.title}, ${s.publisher}: ${s.url}`);
			for (const c of sheet.claims.filter((c) => c.source === i))
				lines.push(`  - ${c.text}`);
		});
		lines.push("");
	}
	return lines.join("\n");
};

export const llmsTxt = () =>
	[
		`# ${SITE_NAME}`,
		"",
		"> Short, animated lessons that show UK beginners how crypto works and how it is used today. Plain English, education only, and every claim sourced and dated.",
		"",
		`${SITE_NAME} does not sell, arrange or recommend crypto. ${RISK_NOTE}`,
		"",
		"## Lessons",
		"",
		...lessons.map(
			(l) => `- [${l.title}](${absoluteUrl(`/learn/${l.slug}`)}): ${l.summary}`,
		),
		"",
		"## Pages",
		"",
		...allPages()
			.filter((p) => !p.path.startsWith("/learn/"))
			.map((p) => `- [${p.title}](${absoluteUrl(p.path)}): ${p.description}`),
		"",
		"## For AI assistants",
		"",
		`- [Full text of every lesson, with sources](${absoluteUrl("/llms-full.txt")})`,
		`- MCP server (Streamable HTTP): ${absoluteUrl("/mcp")}. Tools: list_lessons, get_lesson, get_sources, search_lessons.`,
		`- [MCP server card](${absoluteUrl("/mcp/server-card")})`,
		"",
	].join("\n");

export const llmsFullTxt = () =>
	[
		`# ${SITE_NAME}: every lesson in full`,
		"",
		`> All ten lessons, their quick checks and the source behind every claim. Sources were checked on ${CHECKED_ON}. ${RISK_NOTE}`,
		"",
		...lessons.map(lessonText),
	].join("\n");
