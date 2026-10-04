import type {
	BlockDef,
	Change,
	ChipTone,
	CoinDef,
	LabelDef,
	LinkDef,
	ObjDef,
	Panel,
	PanelDef,
	SceneDef,
	V3,
} from "./scene/model";

// One scene per lesson. Each builder takes the try-it input (0 or 1 for a toggle, the slider's
// value for a slider) and returns the objects plus what changes at each step. The number of
// steps matches the lesson's copy in lessons.ts.

// ---------------------------------------------------------------------------------------------
// Placement helpers

/** The ground point (y = 0, or a given height) that appears at screen position (sx, sy). */
const at = (sx: number, sy: number, y = 0): V3 => {
	const a = sx / Math.SQRT1_2;
	const b = (sy + y * 0.8165) / 0.40825;
	return [(a + b) / 2, y, (b - a) / 2];
};

/** Blocks in a chain run left to right across the screen. */
const GAP = 1.4;
const chainAt = (i: number, origin: V3 = [0, 0, 0]): V3 => [
	origin[0] + i * GAP,
	origin[1],
	origin[2] - i * GAP,
];

const block = (id: string, pos: V3, o: Partial<BlockDef> = {}): BlockDef => ({
	kind: "block",
	id,
	at: pos,
	size: [1, 0.9, 1],
	tone: "blue",
	...o,
});

const coin = (id: string, pos: V3, o: Partial<CoinDef> = {}): CoinDef => ({
	kind: "coin",
	id,
	at: pos,
	r: 0.32,
	tone: "coin",
	...o,
});

/** A link between two neighbouring blocks in a chain, joining their silhouettes. */
const chainLink = (
	id: string,
	i: number,
	o: Partial<LinkDef> = {},
	origin: V3 = [0, 0, 0],
	h = 0.45,
): LinkDef => {
	const a = chainAt(i - 1, origin);
	const b = chainAt(i, origin);
	return {
		kind: "link",
		id,
		from: [a[0] + 1, h, a[2]],
		to: [b[0], h, b[2] + 1],
		tone: "line",
		...o,
	};
};

const link = (
	id: string,
	from: V3,
	to: V3,
	o: Partial<LinkDef> = {},
): LinkDef => ({
	kind: "link",
	id,
	from,
	to,
	tone: "line",
	...o,
});

const label = (
	id: string,
	pos: V3,
	title: string,
	meta: string | undefined,
	tone: ChipTone,
	hidden = true,
): LabelDef => ({ kind: "label", id, at: pos, title, meta, tone, hidden });

const panel = (id: string, pos: V3, p: Panel, hidden = true): PanelDef => ({
	kind: "panel",
	id,
	at: pos,
	panel: p,
	hidden,
});

/** Above a chain block, and below it. */
const above = (pos: V3, lift = 2): V3 => [pos[0] + 0.5, lift, pos[2] + 0.5];
const below = (pos: V3): V3 => [pos[0] + 1.3, -0.2, pos[2] + 1.3];

type Changes = Record<string, Change>;
const show = (ids: string[], stagger = 0, start = 0): Changes =>
	Object.fromEntries(
		ids.map((id, i) => [
			id,
			{ visible: true, delay: Math.min(0.8, start + i * stagger) },
		]),
	);
const hide = (ids: string[]): Changes =>
	Object.fromEntries(ids.map((id) => [id, { visible: false }]));
const set = (ids: string[], c: Change): Changes =>
	Object.fromEntries(ids.map((id) => [id, c]));
/** Merge change sets; changes to the same object combine rather than replace each other. */
const all = (...parts: Changes[]): Changes => {
	const out: Changes = {};
	for (const part of parts)
		for (const [id, c] of Object.entries(part)) out[id] = { ...out[id], ...c };
	return out;
};

const usd = (n: number) =>
	n.toLocaleString("en-GB", { maximumFractionDigits: 0 });
const eth = (n: number) => n.toFixed(4);

// ---------------------------------------------------------------------------------------------
// 1. What is a blockchain?

function blockchain(input: number): SceneDef {
	const changed = input === 0;
	const B = [0, 1, 2, 3].map((i) => chainAt(i));
	const miniA: V3 = [-2.6, 0, -2.6];
	const miniB: V3 = [2.4, 0, 2.4];
	const minis = (tag: string, o: V3, bad: boolean): ObjDef[] =>
		[0, 1, 2, 3].map((i) =>
			block(`${tag}${i}`, [o[0] + i * 0.8, 0, o[2] - i * 0.8], {
				size: [0.55, 0.5, 0.55],
				tone: bad && i === 1 ? "red" : "blue",
				hidden: true,
			}),
		);
	const objects: ObjDef[] = [
		...B.map((p, i) =>
			block(`b${i}`, p, { records: true, hidden: i > 0, float: true }),
		),
		chainLink("l1", 1, { hidden: true }),
		chainLink("l2", 2, { hidden: true }),
		chainLink("l3", 3, { hidden: true }),
		chainLink("x2", 2, { hidden: true, tone: "red", dashed: true }),
		chainLink("x3", 3, { hidden: true, tone: "red", dashed: true }),
		label(
			"sealed",
			below(B[0] as V3),
			"Block 1 sealed",
			"Fingerprint 9f2c…a41b",
			"amber",
		),
		label(
			"stores",
			above(B[1] as V3),
			"Block 2 stores 9f2c…a41b",
			"Block 1's fingerprint",
			"blue",
		),
		label(
			"changed",
			below(B[1] as V3),
			"A record in block 2 changed",
			"So its fingerprint changed too",
			"red",
		),
		label(
			"nomatch",
			above(B[2] as V3),
			"Block 3 no longer matches",
			"It still stores 66ed…1719",
			"red",
		),
		label(
			"match",
			above(B[2] as V3),
			"Block 3 matches",
			"It stores 66ed…1719, block 2's fingerprint",
			"green",
		),
		...minis("ma", miniA, false),
		...minis("mb", miniB, true),
		label(
			"compA",
			above(miniA, 1.4),
			"Another computer's copy",
			"Matches",
			"green",
		),
		label(
			"compB",
			below(miniB),
			"A changed copy",
			"Disagrees with everyone else's",
			"red",
		),
		label(
			"risk1",
			above(B[1] as V3, 2.2),
			"Bitcoin, 2010 and 2013",
			"History rewritten after software faults",
			"red",
		),
		label(
			"risk2",
			below(B[2] as V3),
			"Ethereum Classic",
			"Attacked by miners with most of the power",
			"red",
		),
	];
	const minisAll = [0, 1, 2, 3].flatMap((i) => [`ma${i}`, `mb${i}`]);
	return {
		objects,
		steps: [
			show(["sealed"], 0, 0.4),
			all(
				show(["b1", "b2", "b3"], 0.18),
				show(["l1", "l2", "l3"], 0.18, 0.2),
				show(["stores"], 0, 0.5),
			),
			changed
				? all(
						hide(["stores", "l2", "l3", "sealed"]),
						set(["b1"], { tone: "red" }),
						set(["b2", "b3"], { tone: "grey", delay: 0.3 }),
						show(["x2", "x3", "changed", "nomatch"], 0.15, 0.3),
					)
				: all(hide(["stores"]), show(["match"], 0, 0.3)),
			all(
				hide(["changed", "nomatch", "match", "x2", "x3", "sealed"]),
				set(["b1", "b2", "b3"], { tone: "blue" }),
				show(["l2", "l3"]),
				show(minisAll, 0.05),
				show(["compA", "compB"], 0.2, 0.4),
			),
			all(hide(["compA", "compB"]), show(["risk1", "risk2"], 0.25)),
		],
	};
}

// ---------------------------------------------------------------------------------------------
// 2. Keys and wallets

function keysAndWallets(input: number): SceneDef {
	const phrase = input === 1;
	const chain = at(2.6, -0.2);
	const objects: ObjDef[] = [
		panel(
			"wallet",
			at(-4.4, -0.6),
			{
				type: "card",
				icon: "key",
				eyebrow: "Your wallet",
				title: "Secret key",
				lines: ["Never shared"],
			},
			false,
		),
		link("arrow", at(-3, -0.6), at(-1.7, -0.6), { hidden: true }),
		panel("arrowLabel", at(-2.35, -1.05), {
			type: "pill",
			text: "One way only",
			tone: "dim",
		}),
		panel("address", at(-0.4, -0.6), {
			type: "card",
			eyebrow: "Address",
			title: "0x71C4…9A3f",
			lines: ["Safe to share"],
			tone: "blue",
		}),
		block("c0", chainAt(0, chain), { records: true, hidden: true }),
		block("c1", chainAt(1, chain), { records: true, hidden: true }),
		chainLink("cl", 1, { hidden: true }, chain),
		coin(
			"coin",
			[chainAt(1, chain)[0] + 0.5, 0.9, chainAt(1, chain)[2] + 0.5],
			{ hidden: true, float: true },
		),
		label(
			"recorded",
			below(chainAt(0, chain)),
			"Recorded on the chain",
			"0x71C4…9A3f owns 1 coin",
			"amber",
		),
		panel("words", at(-2.4, 2.4), {
			type: "words",
			count: 12,
			hidden: !phrase,
		}),
		label(
			"shareOk",
			at(2.2, 2.1),
			"You shared your address",
			"Safe: people can only send you coins",
			"green",
		),
		label(
			"shareBad",
			at(2.2, 2.1),
			"You shared your recovery phrase",
			"Anyone can now move your coins",
			"red",
		),
		label(
			"support",
			at(2.2, 2.1),
			"Wallet makers never ask for it",
			"Scammers posing as support do",
			"red",
		),
	];
	return {
		objects,
		steps: [
			{},
			show(["arrow", "arrowLabel", "address"], 0.2),
			all(
				show(["c0", "c1", "cl"], 0.1),
				show(["coin"], 0, 0.4),
				show(["recorded"], 0, 0.6),
			),
			all(
				show(["words"]),
				phrase
					? all(
							show(["shareBad"], 0, 0.3),
							set(["coin"], {
								at: [
									chainAt(1, chain)[0] + 3.2,
									0.9,
									chainAt(1, chain)[2] + 0.5,
								],
								tone: "red",
								delay: 0.4,
							}),
						)
					: show(["shareOk"], 0, 0.3),
			),
			all(
				hide(["shareOk", "shareBad"]),
				set(["coin"], {
					at: [chainAt(1, chain)[0] + 0.5, 0.9, chainAt(1, chain)[2] + 0.5],
					tone: "coin",
				}),
				show(["support"], 0, 0.3),
			),
		],
	};
}

// ---------------------------------------------------------------------------------------------
// 3. Sending a payment

function sendingAPayment(input: number): SceneDef {
	const high = input === 1;
	const chain = at(1.8, 0.6);
	const queueX = -1.2;
	const slot = (n: number) => at(queueX, -1.6 + n * 0.62, 0);
	const blockTop = (i: number): V3 => {
		const p = chainAt(i, chain);
		return [p[0] + 0.5, 1.6, p[2] + 0.5];
	};
	const objects: ObjDef[] = [
		panel(
			"wallet",
			at(-4.6, -0.4),
			{
				type: "card",
				icon: "key",
				eyebrow: "Your wallet",
				title: "Signs with your key",
			},
			false,
		),
		panel("queueTitle", at(queueX, -2.35), {
			type: "pill",
			text: "Pending payments (the mempool)",
			tone: "dim",
		}),
		panel("q5", slot(0), {
			type: "pill",
			text: "Payment · fee 5",
			tone: "dim",
		}),
		panel("q2", slot(high ? 2 : 1), {
			type: "pill",
			text: "Payment · fee 2",
			tone: "dim",
		}),
		panel("q1", slot(high ? 3 : 2), {
			type: "pill",
			text: "Payment · fee 1",
			tone: "dim",
		}),
		panel(
			"mine",
			at(-4.6, 0.9),
			{
				type: "pill",
				text: "Your payment · signed",
				tone: "amber",
			},
			false,
		),
		block("c0", chainAt(0, chain), { records: true, hidden: true }),
		block("c1", chainAt(1, chain), { records: true, hidden: true }),
		chainLink("cl1", 1, { hidden: true }, chain),
		block("c2", chainAt(2, chain), {
			records: true,
			tone: "green",
			hidden: true,
		}),
		chainLink("cl2", 2, { hidden: true, tone: "green" }, chain),
		block("c3", chainAt(3, chain), {
			records: true,
			tone: "green",
			hidden: true,
		}),
		chainLink("cl3", 3, { hidden: true, tone: "green" }, chain),
		label(
			"conf",
			above(chainAt(2, chain), 2.3),
			"1 confirmation",
			"Your payment is in a block",
			"green",
		),
		label(
			"conf2",
			above(chainAt(3, chain), 2.3),
			"2 confirmations",
			"One more block on top",
			"green",
		),
		label(
			"fee",
			at(-1.6, 1.9),
			"Average Ethereum fee: about $0.07",
			"4 Oct 2026 · about $0.002 on layer 2",
			"blue",
		),
		label(
			"undo",
			at(-1.6, 1.9),
			"No undo",
			"Confirmed payments are final",
			"red",
		),
		label(
			"check",
			at(1.8, 2.5),
			"Check the whole address",
			"Look-alikes are planted by scammers",
			"red",
		),
	];
	return {
		objects,
		steps: [
			{},
			all(
				show(["queueTitle", "q5", "q2", "q1"], 0.1),
				set(["mine"], { at: slot(high ? 1 : 3), delay: 0.2 }),
				show(["c0", "c1", "cl1"], 0.1),
			),
			all(
				set(["mine"], { at: blockTop(2), delay: 0.3 }),
				set(["q5"], { at: blockTop(2), visible: false }),
				show(["c2", "cl2"], 0, 0.3),
				show(["conf"], 0, 0.6),
			),
			all(
				hide(["conf", "mine"]),
				show(["c3", "cl3", "conf2"], 0.2),
				show(["fee"], 0, 0.5),
			),
			all(hide(["fee", "conf2"]), show(["undo", "check"], 0.3)),
		],
	};
}

// ---------------------------------------------------------------------------------------------
// 4. Bitcoin

function bitcoin(input: number): SceneDef {
	const rewards: [string, string, number][] = [
		["50", "2009", 3.2],
		["25", "2012", 1.6],
		["12.5", "2016", 0.8],
		["6.25", "2020", 0.4],
		["3.125", "2024", 0.2],
	];
	const origin = at(-3.6, 1.2);
	const pos = (i: number): V3 => [
		origin[0] + i * 1.25,
		0,
		origin[2] - i * 1.25,
	];
	const mined = at(-0.6, 0.4);
	const toCome = input === 1;
	const objects: ObjDef[] = [
		block("found", mined, { records: true, size: [1.3, 1.1, 1.3] }),
		...[0, 1, 2].map((i) =>
			coin(
				`r${i}`,
				[mined[0] + 0.65 + (i - 1) * 0.2, 1.1 + i * 0.12, mined[2] + 0.65],
				{ hidden: true },
			),
		),
		label(
			"paid",
			above(mined, 2.4),
			"Block found",
			"The miner is paid new bitcoin plus fees",
			"amber",
		),
		...rewards.map((r, i) =>
			block(`h${i}`, pos(i), {
				size: [0.8, r[2], 0.8],
				tone: "amber",
				hidden: true,
			}),
		),
		...rewards.map(([v, y], i) =>
			label(`hl${i}`, below(pos(i)), v, y, "amber"),
		),
		panel("supply", at(0.4, 4.6), {
			type: "bar",
			title: "Bitcoin created so far",
			value: toCome ? 0.043 : 0.957,
			mark: 1,
			left: toCome
				? "Still to come: under 1 million"
				: "About 20.09 million (95.7%), 4 Oct 2026",
			right: "Cap: just under 21 million",
			tone: toCome ? "blue" : "amber",
		}),
		label(
			"fca",
			at(0, 2.9),
			"The FCA's warning",
			"Be prepared to lose all the money you put in",
			"red",
		),
		label(
			"swing",
			above(pos(2), 3.8),
			"A fixed supply is not a steady price",
			"The price has repeatedly fallen by half or more",
			"red",
		),
	];
	return {
		objects,
		steps: [
			show(["r0", "r1", "r2", "paid"], 0.15, 0.2),
			all(
				hide(["found", "r0", "r1", "r2", "paid"]),
				show(
					rewards.map((_, i) => `h${i}`),
					0.14,
					0.15,
				),
				show(
					rewards.map((_, i) => `hl${i}`),
					0.14,
					0.25,
				),
			),
			show(["supply"], 0, 0.2),
			all(hide(["supply"]), show(["fca", "swing"], 0.3)),
		],
	};
}

// ---------------------------------------------------------------------------------------------
// 5. Stablecoins

function stablecoins(input: number): SceneDef {
	const march = input === 1;
	const res = at(-3.4, 0.4);
	const coins = (i: number): V3 => {
		const p = at(1.6 + (i % 3) * 0.95, -0.2 + Math.floor(i / 3) * 0.75);
		return p;
	};
	const flat: [number, number][] = [
		[0, 0.78],
		[0.2, 0.8],
		[0.4, 0.79],
		[0.6, 0.8],
		[0.8, 0.79],
		[1, 0.8],
	];
	const dip: [number, number][] = [
		[0, 0.8],
		[0.35, 0.8],
		[0.45, 0.62],
		[0.52, 0.33],
		[0.58, 0.52],
		[0.66, 0.74],
		[0.75, 0.79],
		[1, 0.8],
	];
	const objects: ObjDef[] = [
		panel(
			"cash",
			at(-3.6, -1.6),
			{ type: "pill", text: "1,000,000 dollars paid in", tone: "green" },
			false,
		),
		link("issue", at(-1.6, -0.2), at(0.6, -0.2), { hidden: true }),
		panel("issueLabel", at(-0.5, -0.75), {
			type: "pill",
			text: "Issues 1 token per dollar",
			tone: "dim",
		}),
		...[0, 1, 2, 3, 4, 5].map((i) =>
			coin(`t${i}`, coins(i), { hidden: true, float: true }),
		),
		label(
			"tokens",
			at(2.6, 1.6),
			"1,000,000 tokens",
			"Each meant to be worth $1",
			"amber",
		),
		block("r0", res, { tone: "green", size: [0.9, 1, 0.9], hidden: true }),
		block("r1", [res[0] + 1.1, 0, res[2] - 0.2], {
			tone: "grey",
			size: [0.9, 0.75, 0.9],
			hidden: true,
		}),
		block("r2", [res[0] + 0.2, 0, res[2] + 1.1], {
			tone: "grey",
			size: [0.9, 0.55, 0.9],
			hidden: true,
		}),
		label(
			"reserves",
			below(res),
			"Reserves",
			"Mostly short-term US government debt",
			"green",
		),
		label(
			"supply",
			at(-2.4, -2.2),
			"About $316 billion of stablecoins",
			"4 Oct 2026, nearly all pegged to the dollar",
			"blue",
		),
		label(
			"share",
			at(2.6, -2.2),
			"USDT and USDC",
			"About four fifths of the total",
			"blue",
		),
		panel("use", at(2.6, 2.5), {
			type: "pill",
			text: "Mostly trading and moving money between platforms",
			tone: "blue",
		}),
		panel("chart", at(-0.2, 2.6), {
			type: "chart",
			title: march
				? "USDC, March 2023 (illustration)"
				: "Price of one token (illustration)",
			points: march ? dip : flat,
			value: 1,
			baseline: 0.8,
			baselineLabel: "$1.00",
		}),
		label(
			"usdc",
			at(3.6, 1.4),
			"Below 90 cents",
			"$3.3 billion stuck at Silicon Valley Bank",
			"red",
		),
		label(
			"terra",
			at(-3.4, -1.8),
			"TerraUSD, May 2022",
			"No reserves behind it; collapsed",
			"red",
		),
	];
	return {
		objects,
		steps: [
			all(
				show(["issue", "issueLabel"], 0, 0.3),
				show(
					[0, 1, 2, 3, 4, 5].map((i) => `t${i}`),
					0.08,
					0.4,
				),
				show(["tokens"], 0, 0.7),
			),
			all(
				hide(["cash", "issueLabel"]),
				show(["r0", "r1", "r2"], 0.15),
				show(["reserves"], 0, 0.5),
			),
			all(hide(["tokens"]), show(["supply", "share", "use"], 0.2)),
			all(
				hide(["supply", "share", "use"]),
				show(["chart"], 0, 0.2),
				show(march ? ["usdc", "terra"] : ["terra"], 0.3, 0.4),
				hide(["reserves", "issue", "tokens"]),
			),
		],
	};
}

// ---------------------------------------------------------------------------------------------
// 6. Exchanges

function exchanges(input: number): SceneDef {
	const stopped = input === 1;
	const bx = -4.6;
	const sx = -1.9;
	const row = (n: number) => -1.8 + n * 0.62;
	const vault = at(2.2, -0.3);
	const objects: ObjDef[] = [
		panel(
			"buyers",
			at(bx, row(-1)),
			{ type: "pill", text: "Buyers", tone: "green" },
			false,
		),
		panel(
			"sellers",
			at(sx, row(-1)),
			{ type: "pill", text: "Sellers", tone: "red" },
			false,
		),
		...[99, 98, 97].map((p, i) =>
			panel(
				`b${p}`,
				at(bx, row(i + 1)),
				{ type: "pill", text: `Buy at ${p}`, tone: "green" },
				false,
			),
		),
		panel(
			"s101",
			at(sx, row(0)),
			{ type: "pill", text: "Sell at 101", tone: "red" },
			false,
		),
		...[102, 103, 104].map((p, i) =>
			panel(
				`s${p}`,
				at(sx, row(i + 1)),
				{ type: "pill", text: `Sell at ${p}`, tone: "red" },
				false,
			),
		),
		panel("new", at(bx, row(0)), {
			type: "pill",
			text: "New: buy at 101",
			tone: "amber",
		}),
		label(
			"matched",
			at(-3.25, row(4.3)),
			"Matched at 101",
			"The price of the offer already waiting",
			"amber",
		),
		panel("vault", at(2.2, -2.4), {
			type: "card",
			icon: "vault",
			eyebrow: "Exchange wallets",
			title: "The exchange holds the keys",
		}),
		block("v", vault, { tone: "grey", size: [1.6, 0.5, 1.6], hidden: true }),
		...[0, 1, 2, 3].map((i) =>
			coin(
				`c${i}`,
				[
					vault[0] + 0.45 + (i % 2) * 0.7,
					0.5 + Math.floor(i / 2) * 0.1,
					vault[2] + 0.45 + Math.floor(i / 2) * 0.7,
				],
				{ hidden: true, tone: stopped ? "grey" : "coin" },
			),
		),
		panel("balance", at(2.2, 1.3), {
			type: "pill",
			text: "You trust the exchange with custody",
			tone: "dim",
		}),
		label(
			"share",
			at(-3.25, 1.6),
			"About four fifths of spot trading",
			"Centralised exchanges, August 2026",
			"blue",
		),
		label(
			"withdraw",
			at(2.2, 2.3),
			stopped ? "Withdrawals stopped" : "Withdraw to your own wallet",
			stopped
				? "Your balance may still show; you cannot take the coins out"
				: "Possible while the exchange runs normally",
			stopped ? "red" : "green",
		),
		label(
			"ftx",
			at(-3.25, 1.6),
			"FTX, November 2022",
			"Stopped withdrawals, then collapsed",
			"red",
		),
		label(
			"bybit",
			at(-3.25, 2.5),
			"Bybit, February 2025",
			"About $1.5 billion stolen by hackers",
			"red",
		),
	];
	return {
		objects,
		steps: [
			{},
			all(
				show(["new"]),
				set(["new"], { at: at(sx, row(0)), delay: 0.3 }),
				set(["s101"], { visible: false, delay: 0.6 }),
				show(["matched"], 0, 0.7),
			),
			all(
				hide(["new"]),
				show(["v", "c0", "c1", "c2", "c3"], 0.1),
				show(["vault", "balance"], 0.2, 0.3),
			),
			show(["share"], 0, 0.2),
			all(hide(["share"]), show(["withdraw", "ftx", "bybit"], 0.2)),
		],
	};
}

// ---------------------------------------------------------------------------------------------
// 7. Swaps and pools

export function swapNumbers(usdcIn: number) {
	const fee = 0.003;
	const x = 10;
	const y = 20000;
	const out = x - (x * y) / (y + usdcIn * (1 - fee));
	const x2 = x - out;
	const y2 = y + usdcIn;
	const big = 1000 - (1000 * 2_000_000) / (2_000_000 + usdcIn * (1 - fee));
	return {
		out,
		x2,
		y2,
		product: x2 * y2,
		priceAfter: y2 / x2,
		naive: usdcIn / 2000,
		big,
	};
}

function swapsAndPools(input: number): SceneDef {
	const n = swapNumbers(input);
	const H = 2.4;
	const ethPos = at(-3.2, 0.6);
	const usdcPos = at(-0.6, 0.6);
	const you = at(-1.9, 2.4);
	const objects: ObjDef[] = [
		block("ethTank", ethPos, { size: [1.2, H, 1.2], tone: "blue" }),
		block("usdcTank", usdcPos, { size: [1.2, H, 1.2], tone: "green" }),
		label(
			"ethL",
			above(ethPos, H + 0.9),
			"10 ETH",
			"In the pool",
			"blue",
			false,
		),
		label(
			"usdcL",
			above(usdcPos, H + 0.9),
			"20,000 USDC",
			"In the pool",
			"green",
			false,
		),
		panel("you", you, { type: "pill", text: "You", tone: "dim" }),
		coin("in", [you[0] + 0.3, 0.2, you[2] + 0.3], {
			tone: "green",
			hidden: true,
		}),
		coin("out", [ethPos[0] + 0.6, H + 0.1, ethPos[2] + 0.6], {
			tone: "blue",
			hidden: true,
		}),
		panel("math", at(3.2, -0.2), {
			type: "math",
			title: "The pool's rule",
			lines: [
				"Before",
				"10 × 20,000 = 200,000",
				"After",
				`${eth(n.x2)} × ${usd(n.y2)}`,
				`= ${usd(n.product)}`,
			],
		}),
		label(
			"fee",
			at(3.2, 1.8),
			"The small extra is the fee",
			"Kept by the pool",
			"dim",
		),
		label(
			"got",
			at(-4.2, 2.9),
			`You receive ${eth(n.out)} ETH`,
			`At the starting price: ${n.naive.toFixed(4)} ETH`,
			"amber",
		),
		label(
			"moved",
			at(0.6, 2.9),
			"The pool's price moved",
			`2,000 to about ${usd(n.priceAfter)} USDC per ETH`,
			"red",
		),
		label(
			"bigger",
			at(3.2, 1.8),
			"In a pool 100 times larger",
			`The same swap returns ${eth(n.big)} ETH`,
			"green",
		),
		label(
			"sandwich",
			at(-1.9, -1.9),
			"Sandwich attacks",
			"About $60 million on Ethereum, year to Oct 2025",
			"red",
		),
		panel("slip", at(-1.9, 2.9), {
			type: "pill",
			text: "Set a slippage limit",
			tone: "amber",
		}),
	];
	return {
		objects,
		steps: [
			{},
			all(
				show(["you"]),
				show(["in"], 0, 0.1),
				set(["in"], {
					at: [usdcPos[0] + 0.6, H + 0.1, usdcPos[2] + 0.6],
					delay: 0.15,
				}),
				set(["usdcTank"], {
					size: [1.2, (H * n.y2) / 20000, 1.2],
					delay: 0.45,
				}),
				set(["usdcL"], {
					title: `${usd(n.y2)} USDC`,
					at: above(usdcPos, (H * n.y2) / 20000 + 0.9),
				}),
				set(["ethTank"], { size: [1.2, (H * n.x2) / 10, 1.2], delay: 0.45 }),
				set(["ethL"], { title: `${eth(n.x2)} ETH` }),
				show(["out"], 0, 0.5),
			),
			all(
				hide(["in"]),
				set(["out"], { at: [you[0] + 0.3, 0.2, you[2] + 0.3] }),
				show(["math", "fee"], 0.25),
			),
			all(hide(["fee"]), show(["got", "moved", "bigger"], 0.2)),
			all(
				hide(["got", "moved", "bigger", "math"]),
				show(["sandwich", "slip"], 0.25),
			),
		],
	};
}

// ---------------------------------------------------------------------------------------------
// 8. Staking

function staking(input: number): SceneDef {
	const slashed = input === 0;
	const R = 3.1;
	const vPos = (i: number): V3 => {
		const a = (i / 6) * Math.PI * 2 + 0.4;
		return [Math.cos(a) * R - 0.3, 0, Math.sin(a) * R - 0.3];
	};
	const centre: V3 = [-0.65, 0, -0.65];
	const bad = 4;
	const objects: ObjDef[] = [
		...[0, 1, 2, 3, 4, 5].flatMap((i): ObjDef[] => {
			const p = vPos(i);
			return [
				block(`v${i}`, p, { size: [0.6, 0.5, 0.6] }),
				coin(`d${i}`, [p[0] + 0.3, 0.5, p[2] + 0.3], { r: 0.22 }),
				coin(`w${i}`, [p[0] + 0.3, 0.6, p[2] + 0.3], {
					r: 0.16,
					tone: "green",
					hidden: true,
				}),
				link(
					`vote${i}`,
					[p[0] + 0.3, 0.5, p[2] + 0.3],
					[centre[0] + 0.65, 1.1, centre[2] + 0.65],
					{
						hidden: true,
						dashed: true,
						tone: i === bad && slashed ? "red" : "line",
					},
				),
			];
		}),
		block("block", centre, {
			size: [1.3, 1.1, 1.3],
			records: true,
			hidden: true,
		}),
		label(
			"deposit",
			at(0, -2.9),
			"At least 32 ETH each",
			"Locked as a deposit, the stake",
			"amber",
		),
		label(
			"final",
			at(0, 2.9),
			"Final",
			"Two thirds of staked ether voted, in two rounds",
			"green",
		),
		label(
			"reward",
			at(-3.4, 2.6),
			"About 2.6% a year",
			"Rewards, as of 4 Oct 2026",
			"green",
		),
		label(
			"staked",
			at(3.4, 2.6),
			"About 43.7 million ETH staked",
			"A little over a third of all ether",
			"blue",
		),
		label(
			"slash",
			below(vPos(bad)),
			slashed ? "Slashed" : "Follows the rules",
			slashed ? "Part of its deposit is destroyed" : "It keeps earning rewards",
			slashed ? "red" : "green",
		),
		label(
			"queue",
			at(0, -2.9),
			"Leaving takes time",
			"Exit queue about 14 days on 4 Oct 2026, payout a week more",
			"red",
		),
	];
	const votes = [0, 1, 2, 3, 4, 5].map((i) => `vote${i}`);
	return {
		objects,
		steps: [
			show(["deposit"], 0, 0.3),
			all(
				show(["block"]),
				show(votes, 0.08, 0.2),
				set(["block"], { tone: "green", delay: 0.7 }),
				hide(["deposit"]),
				show(["final"], 0, 0.7),
			),
			all(
				hide(votes),
				hide(["final"]),
				show(
					[0, 1, 2, 3, 4, 5].map((i) => `w${i}`),
					0.08,
				),
				show(["reward", "staked"], 0.2, 0.3),
			),
			all(
				hide(["reward", "staked"]),
				show(["slash"], 0, 0.4),
				slashed
					? all(
							set([`v${bad}`], { tone: "red", delay: 0.2 }),
							hide([`d${bad}`, `w${bad}`]),
							show([`vote${bad}`]),
						)
					: {},
			),
			all(hide(["slash"]), show(["queue"], 0, 0.3)),
		],
	};
}

// ---------------------------------------------------------------------------------------------
// 9. Lending and borrowing

export function loanNumbers(fallPercent: number) {
	const collateral = 10000 * (1 - fallPercent / 100);
	const health = (collateral * 0.8) / 6000;
	return { collateral, health };
}

function lendingAndBorrowing(input: number): SceneDef {
	const H = 2.4;
	const tank = at(-3, 0.6);
	const tried = loanNumbers(input);
	const liquid = loanNumbers(26);
	const bar = (h: number, collateral: number): Panel => ({
		type: "bar",
		title: "Health factor",
		value: Math.min(1, h / 2),
		mark: 0.5,
		left: `Health ${h.toFixed(2)} · collateral $${usd(collateral)}`,
		right: "Liquidation below 1.00",
		tone: h >= 1.1 ? "green" : h >= 1 ? "amber" : "red",
	});
	const coinAt = (i: number): V3 => {
		const p = at(1.4 + (i % 3) * 0.85, -0.4 + Math.floor(i / 3) * 0.7);
		return p;
	};
	const objects: ObjDef[] = [
		panel(
			"protocol",
			at(-3, -2.4),
			{ type: "pill", text: "Lending protocol", tone: "dim" },
			false,
		),
		block("coll", tank, { size: [1.2, H, 1.2], tone: "amber" }),
		label("collL", below(tank), "Collateral", "$10,000 of ETH", "amber", false),
		...[0, 1, 2, 3, 4, 5].map((i) =>
			coin(`b${i}`, coinAt(i), { tone: "green", hidden: true, float: true }),
		),
		label(
			"borrowed",
			at(2.3, 1.4),
			"Borrowed: $6,000",
			"Of a stablecoin. No credit check.",
			"green",
		),
		panel("health", at(-0.4, 2.7), bar(1.3333, 10000)),
		label(
			"liq",
			at(2.6, -2.2),
			"Liquidated",
			"Someone repaid debt and took collateral at a discount",
			"red",
		),
		label(
			"borrowedAll",
			at(-3.2, -2.9),
			"About $31 billion borrowed",
			"All lending protocols, 4 Oct 2026",
			"blue",
		),
		label(
			"aave",
			at(2.6, -2.2),
			"April 2026",
			"Tokens from a bridge exploit used to borrow about $193 million",
			"red",
		),
	];
	return {
		objects,
		steps: [
			{},
			all(
				show(
					[0, 1, 2, 3, 4, 5].map((i) => `b${i}`),
					0.08,
				),
				show(["borrowed"], 0, 0.5),
			),
			all(
				show(["health"]),
				set(["health"], { panel: bar(tried.health, tried.collateral) }),
				set(["coll"], { size: [1.2, (H * tried.collateral) / 10000, 1.2] }),
				set(["collL"], {
					meta: `$${usd(tried.collateral)} of ETH`,
					at: below(tank),
				}),
			),
			all(
				set(["health"], { panel: bar(liquid.health, liquid.collateral) }),
				set(["coll"], {
					size: [1.2, (H * 0.42 * liquid.collateral) / 10000, 1.2],
					tone: "red",
					delay: 0.4,
				}),
				set(["collL"], { meta: "Part of it taken by a liquidator" }),
				show(["liq"], 0, 0.5),
			),
			all(hide(["liq", "health"]), show(["borrowedAll", "aave"], 0.25)),
		],
	};
}

// ---------------------------------------------------------------------------------------------
// 10. Tokenised assets

function tokenisedAssets(input: number): SceneDef {
	const anyWallet = input === 1;
	const fund = at(-3.4, 0.4);
	const chain = at(0.6, -0.6);
	const top = (i: number): V3 => {
		const p = chainAt(i, chain);
		return [p[0] + 0.5, 0.9, p[2] + 0.5];
	};
	const walletA = at(0.6, 2.2);
	const walletB = at(3.6, 2.2);
	const coinA = at(0.6, 2.85);
	const coinB = at(3.6, 2.85);
	const objects: ObjDef[] = [
		block("a0", fund, { tone: "grey", size: [0.9, 0.6, 0.9] }),
		block("a1", [fund[0] + 1.1, 0, fund[2] - 0.2], {
			tone: "grey",
			size: [0.9, 0.9, 0.9],
		}),
		block("a2", [fund[0] + 0.2, 0, fund[2] + 1.1], {
			tone: "grey",
			size: [0.9, 1.2, 0.9],
		}),
		label(
			"fund",
			below(fund),
			"The fund",
			"Holds US government debt, off the blockchain",
			"dim",
			false,
		),
		link("issue", at(-1.6, -0.3), at(-0.2, -0.3), { hidden: true }),
		...[0, 1, 2].map((i) =>
			block(`c${i}`, chainAt(i, chain), { hidden: true }),
		),
		...[1, 2].map((i) => chainLink(`cl${i}`, i, { hidden: true }, chain)),
		...[0, 1, 2].map((i) => coin(`t${i}`, top(i), { hidden: true })),
		label(
			"share",
			above(chainAt(1, chain), 2.4),
			"Each token: one share in the fund",
			"Recorded on a blockchain",
			"amber",
		),
		label(
			"examples",
			at(-3.4, -2.6),
			"Examples",
			"BlackRock's BUIDL, Circle's USYC",
			"blue",
		),
		panel("wa", walletA, {
			type: "pill",
			text: "Approved wallet A",
			tone: "blue",
		}),
		panel("wb", walletB, {
			type: "pill",
			text: anyWallet ? "Wallet not approved" : "Approved wallet B",
			tone: anyWallet ? "red" : "blue",
		}),
		coin("moving", coinA, { hidden: true, r: 0.24 }),
		label(
			"result",
			at(2.1, 3.7),
			anyWallet ? "Blocked" : "Transfer goes through",
			anyWallet
				? "The issuer has not approved that wallet"
				: "Recorded on the blockchain",
			anyWallet ? "red" : "green",
		),
		label(
			"size",
			at(-3.4, -2.6),
			"About $14.8 billion",
			"Tokenised US government debt, 4 Oct 2026",
			"blue",
		),
		label(
			"stable",
			at(2.8, -2.6),
			"About $295 billion",
			"Stablecoins on the same tracker",
			"dim",
		),
		label(
			"gilt",
			at(-0.2, 3.1),
			"UK digital gilt",
			"First issue due by the end of March 2027",
			"amber",
		),
		label(
			"pro",
			at(-0.2, 3.1),
			"Not open to everyone",
			"USYC: non-US persons only, $100,000 minimum",
			"red",
		),
	];
	return {
		objects,
		steps: [
			{},
			all(
				show(["issue", "c0", "c1", "c2", "cl1", "cl2"], 0.08),
				show(["t0", "t1", "t2"], 0.12, 0.4),
				show(["share", "examples"], 0.2, 0.5),
			),
			all(
				hide(["share", "examples"]),
				show(["wa", "wb", "moving"], 0.15),
				anyWallet ? {} : set(["moving"], { at: coinB, delay: 0.5 }),
				show(["result"], 0, 0.7),
			),
			all(
				hide(["wa", "wb", "moving", "result"]),
				show(["size", "stable", "gilt"], 0.2),
			),
			all(hide(["size", "stable", "gilt"]), show(["pro"], 0, 0.3)),
		],
	};
}

export const scenes: Record<string, (input: number) => SceneDef> = {
	blockchain,
	"keys-and-wallets": keysAndWallets,
	"sending-a-payment": sendingAPayment,
	bitcoin,
	stablecoins,
	exchanges,
	"swaps-and-pools": swapsAndPools,
	staking,
	"lending-and-borrowing": lendingAndBorrowing,
	"tokenised-assets": tokenisedAssets,
};
