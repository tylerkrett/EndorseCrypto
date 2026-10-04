"use client";

import { useEffect, useState } from "react";
import { loanNumbers, swapNumbers } from "~/lessons/scenes";
import type { TryIt } from "~/lessons/types";

import { cn } from "~/lib/cn";

const usd = (n: number) =>
	n.toLocaleString("en-GB", { maximumFractionDigits: 0 });

function sliderNote(slug: string, value: number) {
	if (slug === "swaps-and-pools") {
		const n = swapNumbers(value);
		return `You get ${n.out.toFixed(4)} ETH. At the starting price it would be ${n.naive.toFixed(4)} ETH, so you lose ${(((n.naive - n.out) / n.naive) * 100).toFixed(1)}% to price impact and the fee.`;
	}
	if (slug === "lending-and-borrowing") {
		const n = loanNumbers(value);
		const state =
			n.health >= 1
				? "The loan is safe for now."
				: "Below 1: the loan can be liquidated.";
		return `Collateral $${usd(n.collateral)}, health factor ${n.health.toFixed(2)}. ${state}`;
	}
	return "";
}

async function sha256(text: string) {
	const bytes = new TextEncoder().encode(text);
	const digest = await crypto.subtle.digest("SHA-256", bytes);
	return [...new Uint8Array(digest)]
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
}

const short = (h: string) => (h ? `${h.slice(0, 4)}…${h.slice(-4)}` : "…");

/** A live fingerprint: edit the record and its real SHA-256 hash changes. */
function HashDemo({
	label,
	original,
	onChange,
}: {
	label: string;
	original: string;
	onChange: (v: number) => void;
}) {
	const [text, setText] = useState(original);
	const [hash, setHash] = useState("");
	const [sealed, setSealed] = useState("");
	useEffect(() => {
		void sha256(original).then(setSealed);
	}, [original]);
	useEffect(() => {
		let live = true;
		void sha256(text).then((h) => live && setHash(h));
		onChange(text === original ? 1 : 0);
		return () => {
			live = false;
		};
	}, [text, original, onChange]);
	const match = hash !== "" && hash === sealed;
	return (
		<div className="flex flex-col gap-3">
			<label className="flex flex-col gap-2">
				<span className="font-medium text-[13px] text-fg">{label}</span>
				<input
					className="rounded-[10px] border border-line-strong bg-page px-3 py-2.5 font-mono text-[14px] text-fg outline-none focus:border-brand"
					maxLength={60}
					onChange={(e) => setText(e.target.value)}
					spellCheck={false}
					value={text}
				/>
			</label>
			<dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 font-mono text-[12px]">
				<dt className="text-dim">Block 2's fingerprint</dt>
				<dd
					className={cn(
						"text-right transition-colors",
						match ? "text-fg" : "text-bad",
					)}
				>
					{short(hash)}
				</dd>
				<dt className="text-dim">Block 3 stores</dt>
				<dd className="text-right text-fg">{short(sealed)}</dd>
			</dl>
			<p
				aria-live="polite"
				className={cn("text-[14px]", match ? "text-ok" : "text-bad")}
			>
				{match
					? "They match, so the chain holds. Change even one letter."
					: "They no longer match, so block 3's link is broken, and so is every link after it."}
			</p>
			{!match && (
				<button
					className="self-start font-semibold text-[13px] text-brand-on underline underline-offset-4"
					onClick={() => setText(original)}
					type="button"
				>
					Put it back
				</button>
			)}
			<p className="text-[12px] text-dim">
				A real SHA-256 fingerprint of the text above, worked out in your
				browser. Bitcoin fingerprints its blocks with SHA-256, applied twice.
			</p>
		</div>
	);
}

export function TryItControl({
	slug,
	tryIt,
	value,
	onChange,
	className,
}: {
	slug: string;
	tryIt: TryIt;
	value: number;
	onChange: (v: number) => void;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"flex flex-col gap-3 rounded-[14px] border border-tint-blue-line bg-tint-blue p-4",
				className,
			)}
		>
			<p className="eyebrow text-brand-on">Try it</p>
			{tryIt.kind === "hash" ? (
				<HashDemo
					label={tryIt.label}
					onChange={onChange}
					original={tryIt.original}
				/>
			) : tryIt.kind === "toggle" ? (
				<>
					<fieldset className="flex flex-col gap-2">
						<legend className="mb-2 font-medium text-[13px] text-fg">
							{tryIt.label}
						</legend>
						<div className="flex flex-wrap gap-1 rounded-xl border border-line bg-page p-1">
							{tryIt.options.map((o, i) => (
								<button
									aria-pressed={value === i}
									className={cn(
										"flex-1 rounded-[9px] px-3 py-2 font-medium text-[13px] transition-colors",
										value === i
											? "bg-surface-2 text-fg"
											: "text-dim hover:text-fg",
									)}
									key={o}
									onClick={() => onChange(i)}
									type="button"
								>
									{o}
								</button>
							))}
						</div>
					</fieldset>
					<p aria-live="polite" className="text-[14px] text-fg">
						{tryIt.notes[value === 1 ? 1 : 0]}
					</p>
				</>
			) : (
				<>
					<label className="flex flex-col gap-2">
						<span className="flex items-baseline justify-between gap-3 font-medium text-[13px] text-fg">
							{tryIt.label}
							<span className="font-mono text-[14px] text-brand-on">
								{tryIt.unit === "usdc" ? `${usd(value)} USDC` : `${value}%`}
							</span>
						</span>
						<input
							className="w-full accent-[var(--brand-blue)]"
							max={tryIt.max}
							min={tryIt.min}
							onChange={(e) => onChange(Number(e.target.value))}
							step={tryIt.by}
							type="range"
							value={value}
						/>
					</label>
					<p aria-live="polite" className="text-[14px] text-fg">
						{sliderNote(slug, value)}
					</p>
				</>
			)}
		</div>
	);
}
