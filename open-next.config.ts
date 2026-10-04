import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Every page is prerendered at build time and nothing revalidates, so the prerendered HTML ships
// with the static assets and cache interception serves it without running the Next server. That
// keeps each request well inside the free plan's CPU limit. (Himbad uses the same setup.)
export default defineCloudflareConfig({
	incrementalCache: staticAssetsIncrementalCache,
	enableCacheInterception: true,
});
