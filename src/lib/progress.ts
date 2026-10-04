"use client";

import { useSyncExternalStore } from "react";

// Lesson progress, kept in this browser only (Phase 1 has no accounts).

const KEY = "ec-progress";
const EVENT = "ec-progress";
let cache: string[] | null = null;

const load = (): string[] => {
	if (cache) return cache;
	try {
		const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
		cache = Array.isArray(parsed)
			? parsed.filter((s): s is string => typeof s === "string")
			: [];
	} catch {
		cache = [];
	}
	return cache;
};

const EMPTY: string[] = [];

const subscribe = (callback: () => void) => {
	window.addEventListener(EVENT, callback);
	return () => window.removeEventListener(EVENT, callback);
};

export const useProgress = () =>
	useSyncExternalStore(subscribe, load, () => EMPTY);

export const markComplete = (slug: string) => {
	const done = load();
	if (done.includes(slug)) return;
	cache = [...done, slug];
	try {
		localStorage.setItem(KEY, JSON.stringify(cache));
	} catch {
		// Progress still shows for this visit.
	}
	window.dispatchEvent(new Event(EVENT));
};
