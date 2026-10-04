"use client";

import { useSyncExternalStore } from "react";

// Theme and animation preferences live on <html> as data attributes. The inline script in the
// root layout sets both before first paint; these helpers read and change them afterwards.

export type Theme = "light" | "dark";
export type Motion = "on" | "off";

const THEME_KEY = "ec-theme";
const MOTION_KEY = "ec-motion";
const EVENT = "ec-prefs";

/** Runs before first paint. Theme: the saved choice, else dark. Animation: the saved choice, else the device setting. */
export const PREFS_SCRIPT = `(function(){try{var d=document.documentElement,s=localStorage;var t=s.getItem('${THEME_KEY}');if(t!=='light'&&t!=='dark'){t='dark'}d.dataset.theme=t;var m=s.getItem('${MOTION_KEY}');if(m!=='on'&&m!=='off'){m=matchMedia('(prefers-reduced-motion: reduce)').matches?'off':'on'}d.dataset.motion=m}catch(e){}})();`;

const read = <T extends string>(attr: "theme" | "motion", fallback: T): T =>
	typeof document === "undefined"
		? fallback
		: ((document.documentElement.dataset[attr] as T | undefined) ?? fallback);

const subscribe = (callback: () => void) => {
	window.addEventListener(EVENT, callback);
	return () => window.removeEventListener(EVENT, callback);
};

const write = (attr: "theme" | "motion", key: string, value: string) => {
	document.documentElement.dataset[attr] = value;
	try {
		localStorage.setItem(key, value);
	} catch {
		// Private windows can refuse storage; the choice still applies to this page.
	}
	window.dispatchEvent(new Event(EVENT));
};

export const useTheme = () =>
	useSyncExternalStore(
		subscribe,
		() => read<Theme>("theme", "dark"),
		() => "dark" as Theme,
	);

export const useMotion = () =>
	useSyncExternalStore(
		subscribe,
		() => read<Motion>("motion", "off"),
		() => "off" as Motion,
	);

export const setTheme = (theme: Theme) => write("theme", THEME_KEY, theme);
export const setMotion = (motion: Motion) =>
	write("motion", MOTION_KEY, motion);

/** True when the browser can run the 3D scenes. Checked once, on first use. */
let webgl: boolean | undefined;
export const hasWebGL = () => {
	if (webgl !== undefined) return webgl;
	try {
		const canvas = document.createElement("canvas");
		const gl = canvas.getContext("webgl2");
		webgl = Boolean(gl);
		gl?.getExtension("WEBGL_lose_context")?.loseContext();
	} catch {
		webgl = false;
	}
	return webgl;
};

/**
 * True once the visitor has moved the pointer, scrolled, tapped or pressed a key. The 3D scenes
 * wait for this, so the first load stays light (the still pictures show until then).
 */
let engaged = false;
const ENGAGE_EVENT = "ec-engaged";
const ENGAGE_TRIGGERS = [
	"pointermove",
	"pointerdown",
	"keydown",
	"wheel",
	"touchstart",
	"scroll",
] as const;
const engage = () => {
	if (engaged) return;
	engaged = true;
	for (const e of ENGAGE_TRIGGERS) window.removeEventListener(e, engage);
	window.dispatchEvent(new Event(ENGAGE_EVENT));
};
const subscribeEngaged = (callback: () => void) => {
	if (!engaged)
		for (const e of ENGAGE_TRIGGERS)
			window.addEventListener(e, engage, { passive: true, once: true });
	window.addEventListener(ENGAGE_EVENT, callback);
	return () => window.removeEventListener(ENGAGE_EVENT, callback);
};
export const useEngaged = () =>
	useSyncExternalStore(
		subscribeEngaged,
		() => engaged,
		() => false,
	);
