/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** @type {import("next").NextConfig} */
const config = {
	// Next's runtime image optimiser is not available on Workers; every image is already sized.
	images: { unoptimized: true },
	// Inline the stylesheet into each page so the first paint does not wait for a CSS request.
	experimental: { inlineCss: true },
};

export default config;

// Exposes Cloudflare bindings to `next dev` so local and deployed behaviour match.
initOpenNextCloudflareForDev();
