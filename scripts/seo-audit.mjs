#!/usr/bin/env node
// SEO and AI-discovery audit, built for agents and CI as well as people.
//
//   pnpm seo:audit                         audit http://localhost:3000
//   pnpm seo:audit --url https://endorsecrypto.com
//   pnpm seo:audit --lighthouse            also run Lighthouse on every page
//   pnpm seo:audit --json                  machine-readable report on stdout
//
// It crawls the sitemap and checks every page (status, title, description, canonical, one h1,
// language, social tags, structured data, image alt text, internal links), then the site-wide
// files (robots.txt, sitemap, llms.txt, the MCP server). Exit code 1 if anything fails, so an
// agent or a CI job can act on it.

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const opt = (name, fallback) => {
	const i = args.indexOf(`--${name}`);
	return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const BASE = opt("url", "http://localhost:3000").replace(/\/$/, "");
const SITE = "https://endorsecrypto.com";
const asJson = flag("json");
const findings = [];
const add = (level, page, check, detail) =>
	findings.push({ level, page, check, detail });

const toLocal = (u) => (u.startsWith(SITE) ? BASE + u.slice(SITE.length) : u);
const get = async (path, init) => {
	const r = await fetch(path.startsWith("http") ? path : BASE + path, {
		redirect: "manual",
		...init,
	});
	return { status: r.status, headers: r.headers, text: await r.text() };
};
const meta = (html, attr, key) =>
	html.match(
		new RegExp(`<meta[^>]+${attr}="${key}"[^>]*content="([^"]*)"`, "i"),
	)?.[1] ??
	html.match(
		new RegExp(`<meta[^>]+content="([^"]*)"[^>]*${attr}="${key}"`, "i"),
	)?.[1];
const decode = (s) =>
	s
		.replace(/&amp;/g, "&")
		.replace(/&#x27;|&#39;/g, "'")
		.replace(/&quot;/g, '"')
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">");

async function auditPage(url, linkCache) {
	const path = new URL(url).pathname;
	const r = await get(toLocal(url));
	if (r.status !== 200) return add("error", path, "status", `HTTP ${r.status}`);
	const html = r.text;
	const title = decode(html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "");
	if (!title) add("error", path, "title", "missing");
	else if (title.length > 65)
		add(
			"warn",
			path,
			"title",
			`${title.length} characters (aim for 65 or fewer): ${title}`,
		);
	const desc = decode(meta(html, "name", "description") ?? "");
	if (!desc) add("error", path, "description", "missing");
	else if (desc.length < 50 || desc.length > 160)
		add(
			"warn",
			path,
			"description",
			`${desc.length} characters (aim for 50 to 160)`,
		);
	const canonical = html.match(
		/<link[^>]+rel="canonical"[^>]*href="([^"]+)"/i,
	)?.[1];
	if (!canonical) add("error", path, "canonical", "missing");
	else if (canonical.replace(/\/$/, "") !== url.replace(/\/$/, ""))
		add("error", path, "canonical", `points to ${canonical}`);
	const h1s = (html.match(/<h1[\s>]/gi) ?? []).length;
	if (h1s !== 1)
		add("error", path, "h1", `${h1s} h1 headings (want exactly 1)`);
	if (!/<html[^>]+lang="en/i.test(html))
		add("error", path, "lang", "html lang is not English");
	if (/<meta[^>]+name="robots"[^>]+noindex/i.test(html))
		add("error", path, "robots", "page is noindex");
	for (const [attr, key] of [
		["property", "og:title"],
		["property", "og:description"],
		["property", "og:image"],
		["name", "twitter:card"],
	])
		if (!meta(html, attr, key)) add("warn", path, key, "missing");
	const blocks = [
		...html.matchAll(
			/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi,
		),
	];
	if (!blocks.length) add("warn", path, "structured data", "no JSON-LD");
	for (const b of blocks) {
		try {
			JSON.parse(b[1]);
		} catch (e) {
			add("error", path, "structured data", `invalid JSON-LD: ${e.message}`);
		}
	}
	for (const img of html.match(/<img\b[^>]*>/gi) ?? [])
		if (!/\balt="/i.test(img)) add("error", path, "img alt", img.slice(0, 80));
	for (const m of html.matchAll(/<a\b[^>]*href="(\/[^"#?]*)/gi)) {
		const href = m[1];
		if (!linkCache.has(href))
			linkCache.set(
				href,
				get(href).then((x) => x.status),
			);
		const status = await linkCache.get(href);
		if (status >= 400)
			add("error", path, "broken link", `${href} returns ${status}`);
	}
	return { path, title, description: desc };
}

async function auditSite() {
	const robots = await get("/robots.txt");
	if (robots.status !== 200)
		add("error", "/robots.txt", "status", `HTTP ${robots.status}`);
	else if (!/sitemap:/i.test(robots.text))
		add("error", "/robots.txt", "sitemap", "no Sitemap line");
	const llms = await get("/llms.txt");
	if (llms.status !== 200 || !llms.text.startsWith("# "))
		add(
			"error",
			"/llms.txt",
			"llms.txt",
			`HTTP ${llms.status} or not markdown`,
		);
	const full = await get("/llms-full.txt");
	if (full.status !== 200)
		add("error", "/llms-full.txt", "status", `HTTP ${full.status}`);
	const card = await get("/mcp/server-card");
	if (card.status !== 200)
		add("error", "/mcp/server-card", "status", `HTTP ${card.status}`);
	const catalog = await get("/.well-known/ai-catalog.json");
	if (catalog.status !== 200)
		add(
			"error",
			"/.well-known/ai-catalog.json",
			"status",
			`HTTP ${catalog.status}`,
		);
	// MCP: initialise and list tools, as an assistant would.
	const rpc = (method, params, id) =>
		get("/mcp", {
			method: "POST",
			headers: {
				"content-type": "application/json",
				accept: "application/json, text/event-stream",
				"mcp-protocol-version": "2025-06-18",
			},
			body: JSON.stringify({ jsonrpc: "2.0", id, method, params }),
		});
	let tools = [];
	try {
		const init = await rpc(
			"initialize",
			{
				protocolVersion: "2025-06-18",
				capabilities: {},
				clientInfo: { name: "seo-audit", version: "1" },
			},
			1,
		);
		if (init.status !== 200)
			add(
				"error",
				"/mcp",
				"initialize",
				`HTTP ${init.status}: ${init.text.slice(0, 120)}`,
			);
		const list = await rpc("tools/list", {}, 2);
		// The reply is JSON, or a server-sent event whose data line holds the JSON.
		const body = list.text.trim().startsWith("{")
			? list.text
			: (list.text.match(/^data: (.*)$/m)?.[1] ?? "{}");
		tools = JSON.parse(body).result?.tools?.map((t) => t.name) ?? [];
		if (!tools.length)
			add("error", "/mcp", "tools/list", list.text.slice(0, 160));
	} catch (e) {
		add("error", "/mcp", "MCP", e.message);
	}
	const sitemap = await get("/sitemap.xml");
	const urls = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
		(m) => m[1],
	);
	if (!urls.length) add("error", "/sitemap.xml", "sitemap", "no URLs");
	return { urls, tools };
}

async function lighthouseScores(urls) {
	const { default: lighthouse } = await import("lighthouse");
	const chromeLauncher = await import("chrome-launcher");
	const chrome = await chromeLauncher.launch({
		chromeFlags: ["--headless=new"],
	});
	const out = [];
	try {
		for (const u of urls) {
			for (const formFactor of ["mobile", "desktop"]) {
				const config =
					formFactor === "desktop"
						? (await import("lighthouse/core/config/desktop-config.js")).default
						: undefined;
				const r = await lighthouse(
					toLocal(u),
					{ port: chrome.port, output: "json", logLevel: "error" },
					config,
				);
				const c = r.lhr.categories;
				const scores = Object.fromEntries(
					Object.entries(c).map(([k, v]) => [k, Math.round(v.score * 100)]),
				);
				const failed = Object.values(r.lhr.audits)
					.filter(
						(a) =>
							a.score !== null &&
							a.score < 1 &&
							a.scoreDisplayMode === "binary",
					)
					.map((a) => a.id);
				out.push({ page: new URL(u).pathname, formFactor, ...scores, failed });
				for (const [k, v] of Object.entries(scores))
					if (v < 100)
						add(
							v < 90 ? "error" : "warn",
							new URL(u).pathname,
							`lighthouse ${formFactor} ${k}`,
							`${v}; failing audits: ${failed.join(", ") || "none binary"}`,
						);
			}
		}
	} finally {
		await chrome.kill();
	}
	return out;
}

const { urls, tools } = await auditSite();
const cache = new Map();
const pages = [];
for (const u of urls) pages.push(await auditPage(u, cache));
const lh = flag("lighthouse") ? await lighthouseScores(urls) : [];
const errors = findings.filter((f) => f.level === "error").length;

if (asJson) {
	console.log(
		JSON.stringify(
			{
				base: BASE,
				pages: pages.filter(Boolean),
				mcpTools: tools,
				lighthouse: lh,
				findings,
				errors,
			},
			null,
			2,
		),
	);
} else {
	console.log(
		`SEO audit of ${BASE}: ${urls.length} pages, MCP tools: ${tools.join(", ") || "none"}`,
	);
	for (const r of lh)
		console.log(
			`  ${r.formFactor.padEnd(7)} ${r.page.padEnd(32)} perf ${r.performance} a11y ${r.accessibility} bp ${r["best-practices"]} seo ${r.seo}`,
		);
	for (const f of findings)
		console.log(`  [${f.level}] ${f.page} ${f.check}: ${f.detail}`);
	console.log(errors ? `${errors} error(s).` : "No errors.");
}
process.exit(errors ? 1 : 0);
