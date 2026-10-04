import { llmsFullTxt } from "~/server/content-text";

export const dynamic = "force-static";

export function GET() {
	return new Response(llmsFullTxt(), {
		headers: { "content-type": "text/plain; charset=utf-8" },
	});
}
