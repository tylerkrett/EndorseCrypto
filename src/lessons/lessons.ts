import type { Lesson } from "./types";

// The ten lessons. Every factual claim here appears in the lesson's fact sheet (sources.ts)
// with its source. Figures that change carry an "as of" date in the text itself.

export const lessons: Lesson[] = [
	{
		slug: "blockchain",
		number: 1,
		title: "What is a blockchain?",
		summary: "The shared record that everything else runs on.",
		minutes: 4,
		cardStep: 1,
		steps: [
			{
				title: "Payments are grouped into blocks",
				body: "A blockchain is a shared record of payments. New payments are grouped into a block, and each finished block gets a fingerprint: a short code calculated from everything inside it, called a hash.",
			},
			{
				title: "Every block points to the one before",
				body: "Each new block stores the fingerprint of the block before it. Follow those links back and you reach the very first block. That is the chain.",
			},
			{
				title: "Change one record and the links break",
				body: "Alter an old record and its block gets a different fingerprint. The next block still holds the old one, so the mismatch is plain to see. Try it below.",
			},
			{
				title: "Thousands of computers keep a copy",
				body: "Thousands of computers around the world each keep their own copy and check every new block. A copy that has been changed simply disagrees with everyone else's.",
			},
			{
				title: "What can go wrong",
				body: "Hard to change is not impossible. Bitcoin's history was rewritten after software faults in 2010 and 2013, and smaller blockchains such as Ethereum Classic have been attacked by miners who controlled most of the computing power.",
				risk: true,
			},
		],
		tryIt: {
			kind: "hash",
			step: 2,
			label: "Edit a payment in block 2",
			original: "Alice pays Bob 5",
		},
		quiz: [
			{
				prompt: "What does each block store about the block before it?",
				options: [
					"A copy of all its payments",
					"Its fingerprint",
					"The owner's password",
				],
				answer: 1,
				explain:
					"Each block stores the previous block's fingerprint, which is what links the blocks into a chain.",
				step: 1,
			},
			{
				prompt: "Someone changes a payment in an old block. What happens?",
				options: [
					"Nothing, the change is invisible",
					"The block's fingerprint changes and no longer matches the next block",
					"Every copy of the blockchain updates to match",
				],
				answer: 1,
				explain:
					"Changing any record changes that block's fingerprint, so the link to the next block breaks.",
				step: 2,
			},
		],
		example:
			"Block 1's fingerprint is a made-up example; block 2's is the real SHA-256 of its payment.",
	},
	{
		slug: "keys-and-wallets",
		number: 2,
		title: "Keys and wallets",
		summary: "Who owns what, and what a recovery phrase really is.",
		minutes: 4,
		cardStep: 2,
		steps: [
			{
				title: "Your wallet makes a secret key",
				body: "A self-custody wallet creates a secret number called a private key. Only that key can approve, or sign, a payment from your address.",
			},
			{
				title: "The address comes from the key",
				body: "From the key, the wallet works out an address. You can share the address freely. It cannot be turned back into the key.",
			},
			{
				title: "Coins are recorded, not stored",
				body: "Your coins are not inside the wallet. The blockchain records which address owns them, and the wallet holds the key that can move them.",
			},
			{
				title: "The recovery phrase backs up the key",
				body: "Wallets often show a recovery phrase of 12 to 24 words, taken from a fixed list of 2,048. Anyone with those words can rebuild the key. Try it below.",
			},
			{
				title: "What can go wrong",
				body: "If you lose both the wallet and its recovery phrase, nobody can recover the coins. Share the phrase and they can be taken. Wallet makers such as Ledger say they will never ask for it; scammers posing as support staff do. On an exchange, the exchange holds the keys for you, which brings different risks (lesson 6).",
				risk: true,
			},
		],
		tryIt: {
			kind: "toggle",
			step: 3,
			label: "What you share",
			options: ["Your address", "Your recovery phrase"],
			notes: [
				"Safe. People can send you coins and see the address's history, but nobody can move your coins.",
				"Unsafe. Whoever has the phrase can rebuild your key and move your coins.",
			],
		},
		quiz: [
			{
				prompt: "Where are your coins actually kept?",
				options: [
					"Inside the wallet app",
					"On the blockchain, recorded against your address",
					"With the company that made the wallet",
				],
				answer: 1,
				explain:
					"The blockchain records which address owns the coins. The wallet holds the key that can move them.",
				step: 2,
			},
			{
				prompt: "Which of these is safe to share?",
				options: ["Your address", "Your recovery phrase", "Your private key"],
				answer: 0,
				explain:
					"An address lets people send to you and see its history, but not move your coins. The key and the recovery phrase let someone move them.",
				step: 1,
			},
		],
		example: "The address shown is a made-up example.",
	},
	{
		slug: "sending-a-payment",
		number: 3,
		title: "Sending a payment",
		summary: "From signing to confirmation, and why there is no undo.",
		minutes: 4,
		cardStep: 2,
		steps: [
			{
				title: "You sign the payment",
				body: "Your wallet builds the payment and signs it with your key. The signature proves you approved it without revealing the key.",
			},
			{
				title: "It waits in a queue",
				body: "The signed payment is sent to the network and waits with other pending payments in a pool, often called the mempool. Payments offering higher fees are usually picked first. Try it below.",
			},
			{
				title: "A block includes it",
				body: "A new block includes the payment. That is its first confirmation, and every block added after it is one more. For large Bitcoin payments, the usual guidance is to wait for six.",
			},
			{
				title: "Fees go up and down",
				body: "Fees depend on demand. On 4 October 2026 an average Ethereum transaction cost about $0.07, and on layer 2 networks, which batch transactions, about $0.002.",
			},
			{
				title: "What can go wrong",
				body: "A confirmed payment cannot be reversed. Coins sent to a wrong address are usually gone for good. Check the whole address, and watch for look-alike addresses that scammers plant in your history.",
				risk: true,
			},
		],
		tryIt: {
			kind: "toggle",
			step: 1,
			label: "Your fee",
			options: ["Low fee", "High fee"],
			notes: [
				"Payments offering more are usually picked first, so yours may wait.",
				"Yours is likely to be picked sooner.",
			],
		},
		quiz: [
			{
				prompt: "What can you do once a payment is confirmed?",
				options: [
					"Ask the network to reverse it",
					"Nothing: confirmed payments are final",
					"Cancel it within 24 hours",
				],
				answer: 1,
				explain:
					"There is no undo. That is why checking the address before sending matters.",
				step: 4,
			},
			{
				prompt: "Which payments are usually picked first?",
				options: [
					"The oldest ones",
					"Those offering higher fees",
					"Those sent by larger wallets",
				],
				answer: 1,
				explain:
					"Space in each block is limited, so payments offering higher fees are usually included first.",
				step: 1,
			},
		],
	},
	{
		slug: "bitcoin",
		number: 4,
		title: "Bitcoin",
		summary: "A fixed supply, halving rewards and a price that swings hard.",
		minutes: 5,
		cardStep: 1,
		steps: [
			{
				title: "Miners compete to add each block",
				body: "Bitcoin miners repeat a calculation until one of them finds a valid fingerprint for the next block. The winner adds the block and is paid in newly created bitcoin, plus the fees of the payments inside it.",
			},
			{
				title: "The reward halves",
				body: "The new-bitcoin reward halves every 210,000 blocks, about every four years: from 50 to 25, 12.5, 6.25 and, since 20 April 2024, 3.125 bitcoin per block.",
			},
			{
				title: "So the supply has a cap",
				body: "Because the reward keeps halving, the total can never reach 21 million. About 20.09 million had been created by 4 October 2026, 95.7% of the cap. Try it below.",
			},
			{
				title: "What can go wrong",
				body: "A fixed supply does not mean a steady price. Bitcoin's price has repeatedly fallen by half or more. The FCA warns that anyone buying crypto should be prepared to lose all the money they put in.",
				risk: true,
			},
		],
		tryIt: {
			kind: "toggle",
			step: 2,
			label: "Show",
			options: ["Created so far", "Still to come"],
			notes: [
				"About 20.09 million bitcoin, as of 4 October 2026.",
				"Under a million, released ever more slowly, with the last expected around 2140.",
			],
		},
		quiz: [
			{
				prompt:
					"What happens to the new-bitcoin reward about every four years?",
				options: ["It doubles", "It halves", "It stays the same"],
				answer: 1,
				explain:
					"The reward halves every 210,000 blocks, which is why the supply has a cap.",
				step: 1,
			},
			{
				prompt: "Does a fixed supply mean a steady price?",
				options: [
					"Yes, the price cannot fall",
					"No, the price can still swing hard",
				],
				answer: 1,
				explain:
					"Supply is only half the story. Demand changes, and the price has repeatedly fallen by half or more.",
				step: 3,
			},
		],
	},
	{
		slug: "stablecoins",
		number: 5,
		title: "Stablecoins",
		summary:
			"Tokens pegged to the dollar: what backs them and how the peg can break.",
		minutes: 5,
		cardStep: 1,
		steps: [
			{
				title: "Dollars in, tokens out",
				body: "A stablecoin issuer takes in dollars and creates the same number of tokens, each meant to be worth one dollar. Only approved business customers deal with the issuer directly; everyone else buys tokens on an exchange.",
			},
			{
				title: "Reserves back the tokens",
				body: "The issuer keeps reserves, mostly short-term US government debt and similar assets, so it can pay back a dollar for each token returned.",
			},
			{
				title: "What they are used for",
				body: "About $316 billion of stablecoins existed on 4 October 2026, nearly all pegged to the US dollar. Two, USDT and USDC, made up about four fifths. Most use is trading and moving money between platforms, not shopping.",
			},
			{
				title: "What can go wrong",
				body: "The peg can break. In March 2023, $3.3 billion of USDC's reserves was stuck at the failed Silicon Valley Bank and its price fell below 90 cents. TerraUSD, which had no such reserves, collapsed in May 2022. Try it below.",
				risk: true,
			},
		],
		tryIt: {
			kind: "toggle",
			step: 3,
			label: "Price of one token",
			options: ["A normal day", "March 2023"],
			notes: [
				"Holds close to one dollar.",
				"USDC fell below 90 cents, then recovered once US authorities protected the bank's depositors.",
			],
		},
		quiz: [
			{
				prompt: "What lets an issuer pay back a dollar for each token?",
				options: ["Its reserves", "Its share price", "A government guarantee"],
				answer: 0,
				explain:
					"The issuer holds reserves, mostly short-term US government debt, to pay back tokens.",
				step: 1,
			},
			{
				prompt: "Can a stablecoin fall below one dollar?",
				options: ["No, never", "Yes, the peg can break"],
				answer: 1,
				explain:
					"USDC fell below 90 cents in March 2023, and TerraUSD collapsed in May 2022.",
				step: 3,
			},
		],
	},
	{
		slug: "exchanges",
		number: 6,
		title: "Exchanges",
		summary: "Order books, matching, and who really holds your coins.",
		minutes: 4,
		cardStep: 2,
		steps: [
			{
				title: "An order book of offers",
				body: "A centralised exchange keeps a list of offers called an order book: buyers' prices on one side, sellers' prices on the other.",
			},
			{
				title: "Matching sets the price",
				body: "When a buyer's price meets a seller's, the exchange matches them. The trade happens at the price of the offer that was already waiting in the book.",
			},
			{
				title: "The exchange holds the keys",
				body: "Coins you keep on an exchange sit in its wallets, under its keys. You are trusting the exchange with custody of your coins.",
			},
			{
				title: "Where most trading happens",
				body: "In August 2026 about four fifths of crypto spot trading, meaning buying and selling the coins themselves, happened on centralised exchanges.",
			},
			{
				title: "What can go wrong",
				body: "If an exchange fails, is hacked or commits fraud, customers can be locked out. FTX stopped withdrawals in November 2022 and collapsed. Hackers stole about $1.5 billion from Bybit in February 2025. Try it below.",
				risk: true,
			},
		],
		tryIt: {
			kind: "toggle",
			step: 4,
			label: "The exchange",
			options: ["Running normally", "Stops withdrawals"],
			notes: [
				"You can withdraw to a wallet you control.",
				"Your balance may still show, but you cannot take the coins out.",
			],
		},
		quiz: [
			{
				prompt: "Who holds the keys to coins kept on an exchange?",
				options: ["You", "The exchange", "The blockchain"],
				answer: 1,
				explain:
					"The exchange holds the keys, so you are trusting it with custody of your coins.",
				step: 2,
			},
			{
				prompt:
					"When a buy and a sell offer meet, at what price does the trade happen?",
				options: [
					"A price the exchange chooses",
					"The price of the offer that was already waiting in the book",
					"A price set by a regulator",
				],
				answer: 1,
				explain:
					"The trade happens at the price of the offer already resting in the order book.",
				step: 1,
			},
		],
		example: "Prices in the order book are made-up examples.",
	},
	{
		slug: "swaps-and-pools",
		number: 7,
		title: "Swaps and pools",
		summary: "Trading against a pool instead of a person.",
		minutes: 5,
		cardStep: 2,
		steps: [
			{
				title: "A pool of two tokens",
				body: "On a decentralised exchange, a pool holds two tokens supplied by other people: here, 10 ETH and 20,000 USDC.",
			},
			{
				title: "You swap against the pool",
				body: "To swap, you put one token in and take the other out. Nobody has to be on the other side: a program on the blockchain does the trade.",
			},
			{
				title: "The pool's rule",
				body: "The pool keeps its two balances, multiplied together, the same before fees. This constant-product rule is how Uniswap's original (v2) pools set the price.",
			},
			{
				title: "Bigger swaps, worse prices",
				body: "Put in 1,000 USDC with a 0.30% fee and you get 0.4748 ETH, not the 0.5 that the starting price suggests. The bigger the swap compared with the pool, the worse the price. Try it below.",
			},
			{
				title: "What can go wrong",
				body: "Others can see your swap before it is final and trade around it. These sandwich attacks cost traders on Ethereum about $60 million in the year to October 2025. A slippage limit caps how bad a price you accept.",
				risk: true,
			},
		],
		tryIt: {
			kind: "slider",
			step: 3,
			label: "You put in",
			min: 100,
			max: 10000,
			by: 100,
			initial: 1000,
			unit: "usdc",
		},
		quiz: [
			{
				prompt: "Who is on the other side of a pool swap?",
				options: [
					"Another trader at the same moment",
					"The pool itself, run by a program",
					"The exchange's staff",
				],
				answer: 1,
				explain:
					"You trade against the pool. A program on the blockchain works out the amounts.",
				step: 1,
			},
			{
				prompt: "What happens to your price as your swap gets bigger?",
				options: ["It gets better", "It stays the same", "It gets worse"],
				answer: 2,
				explain:
					"Each extra token you put in buys a little less, so bigger swaps get worse prices.",
				step: 3,
			},
		],
		example: "Example numbers with a 0.30% pool fee, not live prices.",
	},
	{
		slug: "staking",
		number: 8,
		title: "Staking",
		summary: "How locked-up ether secures a network and earns rewards.",
		minutes: 4,
		cardStep: 1,
		steps: [
			{
				title: "Validators lock a deposit",
				body: "Ethereum is secured by validators. Each one locks up at least 32 ETH as a deposit, called a stake.",
			},
			{
				title: "They vote on blocks",
				body: "Validators propose and vote on new blocks. Once validators holding two thirds of the staked ether have voted for it in two rounds of checkpoints, a block is final, about 15 minutes after it was added.",
			},
			{
				title: "Honest work earns rewards",
				body: "Validators that do their job earn rewards, about 2.6% a year as of 4 October 2026. About 43.7 million ETH was staked then, a little over a third of all ether.",
			},
			{
				title: "Breaking the rules costs the deposit",
				body: "A validator that breaks the rules, for example by voting for two conflicting blocks, is slashed: part of its deposit is destroyed and it is removed. Try it below.",
			},
			{
				title: "What can go wrong",
				body: "Staked ether is not instantly available. On 4 October 2026 the queue to leave took about 14 days, and payout can take a week more. Rewards change over time. Staking through a provider such as Lido means its node operators run the validators, and it keeps 10% of the rewards.",
				risk: true,
			},
		],
		tryIt: {
			kind: "toggle",
			step: 3,
			label: "This validator",
			options: ["Votes twice", "Follows the rules"],
			notes: [
				"It is slashed: part of its deposit is destroyed and it is removed.",
				"It earns rewards on its deposit.",
			],
		},
		quiz: [
			{
				prompt: "How much must a validator lock up, at least?",
				options: ["1 ETH", "32 ETH", "1,000 ETH"],
				answer: 1,
				explain: "Each validator locks up at least 32 ETH as its deposit.",
				step: 0,
			},
			{
				prompt: "What happens to a validator that breaks the rules?",
				options: [
					"Nothing",
					"It is slashed: part of its deposit is destroyed",
					"It earns a bonus",
				],
				answer: 1,
				explain:
					"Slashing destroys part of the deposit and removes the validator.",
				step: 3,
			},
		],
	},
	{
		slug: "lending-and-borrowing",
		number: 9,
		title: "Lending and borrowing",
		summary: "Collateral, loan health and automatic liquidation.",
		minutes: 5,
		cardStep: 1,
		steps: [
			{
				title: "Deposit collateral",
				body: "On a lending protocol such as Aave, you deposit crypto as collateral: here, ether worth $10,000.",
			},
			{
				title: "Borrow less than it is worth",
				body: "You can borrow less than your collateral is worth: here, $6,000 of a stablecoin. There is no credit check, because the collateral secures the loan.",
			},
			{
				title: "Watch the health factor",
				body: "The protocol tracks a health factor: here, the collateral counted at 80% of its value, divided by the debt. It starts at 1.33. Below 1, the loan can be liquidated. Try it below.",
			},
			{
				title: "Liquidation is automatic",
				body: "If ether falls 26%, the collateral is worth $7,400 and the health factor drops below 1. Anyone can then repay part of the debt and take some of the collateral at a discount.",
			},
			{
				title: "What can go wrong",
				body: "Prices can fall faster than you can react. About $31 billion was borrowed across lending protocols on 4 October 2026. In April 2026, an attacker used tokens released by a bridge exploit as collateral to borrow about $193 million from Aave. Aave's own code was not broken, but some lenders could not withdraw for a time.",
				risk: true,
			},
		],
		tryIt: {
			kind: "slider",
			step: 2,
			label: "Ether price falls by",
			min: 0,
			max: 40,
			by: 1,
			initial: 10,
			unit: "percent",
		},
		quiz: [
			{
				prompt: "Why is there no credit check?",
				options: [
					"Lending protocols ignore risk",
					"The collateral secures the loan",
					"The government guarantees it",
				],
				answer: 1,
				explain:
					"You borrow less than your collateral is worth, so the collateral covers the loan.",
				step: 1,
			},
			{
				prompt: "What happens when the health factor falls below 1?",
				options: [
					"You get a reminder email",
					"The loan can be liquidated automatically",
					"The interest rate goes down",
				],
				answer: 1,
				explain:
					"Below 1, anyone can repay part of the debt and take collateral at a discount.",
				step: 3,
			},
		],
		example:
			"Example numbers based on a lending protocol's published example, not live prices.",
	},
	{
		slug: "tokenised-assets",
		number: 10,
		title: "Tokenised assets",
		summary: "Funds and government debt recorded on a blockchain.",
		minutes: 4,
		cardStep: 1,
		steps: [
			{
				title: "A fund holds ordinary assets",
				body: "A fund manager buys ordinary assets, such as short-term US government debt, and holds them in the usual way, off the blockchain.",
			},
			{
				title: "It issues tokens",
				body: "The fund issues tokens on a blockchain, each recording a share in the fund. Examples include BlackRock's BUIDL and Circle's USYC.",
			},
			{
				title: "Tokens move between approved wallets",
				body: "The tokens circulate on public blockchains, but only between wallets the issuer has approved. Try it below.",
			},
			{
				title: "Real, but still small",
				body: "Tokenised US government debt was worth about $14.8 billion on 4 October 2026, against about $295 billion of stablecoins on the same tracker. In the UK, the first digital gilt is due by the end of March 2027.",
			},
			{
				title: "What can go wrong",
				body: "A token is only as good as the issuer and the assets behind it. Many tokenised funds are not open to the public: USYC, for example, is only for non-US persons, with a $100,000 minimum. Check who is allowed to buy before believing an offer.",
				risk: true,
			},
		],
		tryIt: {
			kind: "toggle",
			step: 2,
			label: "Send a token to",
			options: ["An approved wallet", "Any wallet"],
			notes: [
				"The transfer goes through.",
				"The transfer is blocked: the issuer has not approved that wallet.",
			],
		},
		quiz: [
			{
				prompt: "Where are the fund's actual assets held?",
				options: [
					"On the blockchain",
					"Off the blockchain, in the usual way",
					"Inside each token",
				],
				answer: 1,
				explain:
					"The assets are held off the blockchain. The tokens record shares in the fund.",
				step: 0,
			},
			{
				prompt: "Can tokenised fund shares go to any wallet?",
				options: [
					"Yes, like any other token",
					"Usually only to wallets the issuer has approved",
				],
				answer: 1,
				explain: "Issuers restrict transfers to approved wallets.",
				step: 2,
			},
		],
	},
];

export const lessonBySlug = (slug: string): Lesson | undefined =>
	lessons.find((l) => l.slug === slug);
