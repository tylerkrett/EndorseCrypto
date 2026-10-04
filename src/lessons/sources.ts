import type { FactSheet } from "./types";

// Fact sheets: every claim a lesson teaches, with the source that supports it.
// Sources are primary pages opened during research or re-opened on the check date.
// Figures marked "computed" are arithmetic on the named public data.

export const factSheets: Record<string, FactSheet> = {
	blockchain: {
		checked: "2026-10-04",
		sources: [
			{
				title: "Bitcoin developer guide: block chain",
				publisher: "Bitcoin Project",
				url: "https://developer.bitcoin.org/devguide/block_chain.html",
			},
			{
				title: "Bitcoin developer reference: block chain",
				publisher: "Bitcoin Project",
				url: "https://developer.bitcoin.org/reference/block_chain.html",
			},
			{
				title: "Glossary: cryptographic hash function",
				publisher: "NIST Computer Security Resource Center",
				url: "https://csrc.nist.gov/glossary/term/cryptographic_hash_function",
			},
			{
				title: "Bitcoin: A Peer-to-Peer Electronic Cash System",
				publisher: "Satoshi Nakamoto (Satoshi Nakamoto Institute copy)",
				url: "https://nakamotoinstitute.org/library/bitcoin/",
			},
			{
				title: "Ethereum node tracker",
				publisher: "Etherscan",
				url: "https://etherscan.io/nodetracker",
			},
			{
				title: "Value overflow incident",
				publisher: "Bitcoin Wiki",
				url: "https://en.bitcoin.it/wiki/Value_overflow_incident",
			},
			{
				title: "BIP-50: March 2013 chain fork post-mortem",
				publisher: "Bitcoin Improvement Proposals",
				url: "https://github.com/bitcoin/bips/blob/master/bip-0050.mediawiki",
			},
			{
				title: "Attacker stole 807K ETC in Ethereum Classic 51% attack",
				publisher: "Bitquery",
				url: "https://bitquery.io/blog/attacker-stole-807k-etc-in-ethereum-classic-51-attack",
			},
			{
				title: "51% attacks",
				publisher: "MIT Digital Currency Initiative",
				url: "http://www.dci.mit.edu/projects/51-percent-attacks",
			},
			{
				title: "Bitcoin genesis block (block 0)",
				publisher: "mempool.space",
				url: "https://mempool.space/block/000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
			},
		],
		claims: [
			{
				text: "Bitcoin fingerprints its blocks with SHA-256, applied twice.",
				source: 1,
			},
			{
				text: "A blockchain is a shared record of payments: new payments are grouped into blocks.",
				source: 0,
			},
			{
				text: "Each block gets a hash, a short fixed-length code calculated from its contents.",
				source: 1,
			},
			{
				text: "A hash works like a fingerprint: it is computationally infeasible to work back to the input or find two inputs with the same hash.",
				source: 2,
			},
			{
				text: "Each new block stores the fingerprint of the block before it.",
				source: 1,
			},
			{
				text: "Follow those links back and you reach the very first block.",
				source: 9,
			},
			{
				text: "Alter an old record and its block gets a different fingerprint; the next block still holds the old one, so the link breaks.",
				source: 0,
			},
			{
				text: "Thousands of computers around the world each keep their own copy (12,105 Ethereum nodes found on 4 October 2026).",
				source: 4,
			},
			{
				text: "Those computers check every new block and accept it only if its payments are valid.",
				source: 3,
			},
			{
				text: "A copy that has been changed simply disagrees with everyone else's, and the network ignores it.",
				source: 0,
			},
			{
				text: "Hard to change is not impossible: rewriting history is computationally infeasible, not impossible.",
				source: 2,
			},
			{
				text: "Bitcoin's history was rewritten after a software fault in 2010.",
				source: 5,
			},
			{
				text: "Bitcoin's history was rewritten after a software fault in 2013.",
				source: 6,
			},
			{
				text: "Ethereum Classic was attacked in 2020 by an attacker who controlled most of its computing power.",
				source: 7,
			},
			{
				text: "Smaller blockchains have repeatedly been attacked by miners who controlled most of the computing power.",
				source: 8,
			},
		],
	},
	"keys-and-wallets": {
		checked: "2026-10-04",
		sources: [
			{
				title: "Ethereum accounts",
				publisher: "ethereum.org",
				url: "https://ethereum.org/en/developers/docs/accounts/",
			},
			{
				title: "Bitcoin developer guide: transactions",
				publisher: "Bitcoin Project",
				url: "https://developer.bitcoin.org/devguide/transactions.html",
			},
			{
				title: "Ethereum wallets",
				publisher: "ethereum.org",
				url: "https://ethereum.org/en/wallets/",
			},
			{
				title: "BIP-39: Mnemonic code for generating deterministic keys",
				publisher: "Bitcoin Improvement Proposals",
				url: "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki",
			},
			{
				title: "BIP-32: Hierarchical deterministic wallets",
				publisher: "Bitcoin Improvement Proposals",
				url: "https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki",
			},
			{
				title: "Some things you need to know",
				publisher: "bitcoin.org",
				url: "https://bitcoin.org/en/you-need-to-know",
			},
			{
				title: "Ongoing phishing campaigns",
				publisher: "Ledger",
				url: "https://www.ledger.com/phishing-campaigns-status",
			},
			{
				title: "Protect your privacy",
				publisher: "bitcoin.org",
				url: "https://bitcoin.org/en/protect-your-privacy",
			},
		],
		claims: [
			{
				text: "A self-custody wallet creates a secret number called a private key.",
				source: 1,
			},
			{
				text: "Only that key can sign a payment from your address.",
				source: 1,
			},
			{
				text: "From the key, the wallet works out an address.",
				source: 0,
			},
			{
				text: "The address cannot be turned back into the key.",
				source: 0,
			},
			{
				text: "Your coins are not inside the wallet: the wallet is a window onto the blockchain and holds the keys.",
				source: 2,
			},
			{
				text: "The blockchain records which address owns the coins.",
				source: 1,
			},
			{
				text: "Wallets often show a recovery phrase to write down.",
				source: 2,
			},
			{
				text: "A recovery phrase is 12 to 24 words, taken from a fixed list of 2,048.",
				source: 3,
			},
			{
				text: "Anyone with those words can rebuild the key.",
				source: 4,
			},
			{
				text: "If you lose both the wallet and its recovery phrase, nobody can recover the coins.",
				source: 5,
			},
			{
				text: "The recovery phrase is the only way to recover a self-custody wallet.",
				source: 2,
			},
			{
				text: "Share the phrase and the coins can be taken: scammers use it to recreate the wallet.",
				source: 6,
			},
			{
				text: "Wallet makers such as Ledger say they will never ask for your recovery phrase; scammers posing as support staff do.",
				source: 6,
			},
			{
				text: "On an exchange, the exchange holds the keys for you.",
				source: 2,
			},
			{
				text: "Anyone can see the balance and history of an address you share.",
				source: 7,
			},
		],
	},
	"sending-a-payment": {
		checked: "2026-10-04",
		sources: [
			{
				title: "Bitcoin developer guide: transactions",
				publisher: "Bitcoin Project",
				url: "https://developer.bitcoin.org/devguide/transactions.html",
			},
			{
				title: "Ethereum transactions",
				publisher: "ethereum.org",
				url: "https://ethereum.org/en/developers/docs/transactions/",
			},
			{
				title: "Gas and fees",
				publisher: "ethereum.org",
				url: "https://ethereum.org/en/developers/docs/gas/",
			},
			{
				title: "Some things you need to know",
				publisher: "bitcoin.org",
				url: "https://bitcoin.org/en/you-need-to-know",
			},
			{
				title: "Layer 2",
				publisher: "ethereum.org",
				url: "https://ethereum.org/en/layer-2/",
			},
			{
				title: "Optimistic rollups",
				publisher: "ethereum.org",
				url: "https://ethereum.org/en/developers/docs/scaling/optimistic-rollups/",
			},
			{
				title: "Address poisoning scams",
				publisher: "Chainalysis",
				url: "https://www.chainalysis.com/blog/address-poisoning-scam/",
			},
			{
				title: "BIP-141: Segregated Witness (block weight limit)",
				publisher: "Bitcoin Improvement Proposals",
				url: "https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki",
			},
		],
		claims: [
			{
				text: "Your wallet builds the payment and signs it with your key.",
				source: 1,
			},
			{
				text: "The signature proves you approved it without revealing the key.",
				source: 0,
			},
			{
				text: "The signed payment is sent to the network and waits with other pending payments in a pool, often called the mempool.",
				source: 1,
			},
			{
				text: "Payments offering higher fees are usually picked first.",
				source: 2,
			},
			{
				text: "A block that includes the payment is its first confirmation, and every block added after it is one more.",
				source: 3,
			},
			{
				text: "For large Bitcoin payments, the usual guidance is to wait for six confirmations.",
				source: 3,
			},
			{
				text: "Fees depend on demand for space in blocks.",
				source: 0,
			},
			{
				text: "Space in each block is limited.",
				source: 7,
			},
			{
				text: "On 4 October 2026 an average Ethereum transaction cost about $0.07, and on layer 2 networks about $0.002.",
				source: 4,
			},
			{
				text: "Layer 2 networks batch transactions and post them to Ethereum.",
				source: 5,
			},
			{
				text: "A confirmed payment cannot be reversed.",
				source: 3,
			},
			{
				text: "Coins sent to a wrong address are usually gone for good: only the receiver can send them back.",
				source: 3,
			},
			{
				text: "Scammers plant look-alike addresses in your history.",
				source: 6,
			},
		],
	},
	bitcoin: {
		checked: "2026-10-04",
		sources: [
			{
				title: "Bitcoin developer guide: mining",
				publisher: "Bitcoin Project",
				url: "https://developer.bitcoin.org/devguide/mining.html",
			},
			{
				title: "Bitcoin: A Peer-to-Peer Electronic Cash System",
				publisher: "Satoshi Nakamoto (Satoshi Nakamoto Institute copy)",
				url: "https://nakamotoinstitute.org/library/bitcoin/",
			},
			{
				title: "Controlled supply",
				publisher: "Bitcoin Wiki",
				url: "https://en.bitcoin.it/wiki/Controlled_supply",
			},
			{
				title: "Bitcoin block 840,000",
				publisher: "mempool.space",
				url: "https://mempool.space/block/0000000000000000000320283a032748cef8227873ff4872689bf23f1cda83a5",
			},
			{
				title: "Current block height",
				publisher: "mempool.space",
				url: "https://mempool.space/api/blocks/tip/height",
			},
			{
				title: "Historical bitcoin price (US dollars)",
				publisher: "mempool.space",
				url: "https://mempool.space/api/v1/historical-price?currency=USD",
			},
			{
				title: "Crypto basics",
				publisher: "Financial Conduct Authority (InvestSmart)",
				url: "https://www.fca.org.uk/investsmart/crypto-basics",
			},
		],
		claims: [
			{
				text: "Bitcoin miners repeat a calculation until one of them finds a valid fingerprint for the next block.",
				source: 0,
			},
			{
				text: "The winner is paid in newly created bitcoin, plus the fees of the payments inside the block.",
				source: 1,
			},
			{
				text: "The new-bitcoin reward halves every 210,000 blocks, about every four years: 50, 25, 12.5, 6.25 and now 3.125 bitcoin per block.",
				source: 2,
			},
			{
				text: "The reward has been 3.125 bitcoin per block since 20 April 2024 (block 840,000).",
				source: 3,
			},
			{
				text: "Because the reward keeps halving, the total can never reach 21 million (the ceiling is 20,999,999.9769).",
				source: 2,
			},
			{
				text: "About 20.09 million bitcoin had been created by 4 October 2026, 95.7% of the cap (computed from the block height and the reward schedule).",
				source: 4,
			},
			{
				text: "Under a million bitcoin is still to come, released ever more slowly, with the last expected around 2140.",
				source: 2,
			},
			{
				text: "Bitcoin's price has repeatedly fallen by half or more: about 83% from late 2013 to early 2015, 77% in 2018, 76% in 2022 and 53% from October 2025 to July 2026 (computed).",
				source: 5,
			},
			{
				text: "The FCA warns that anyone buying crypto should be prepared to lose all their money.",
				source: 6,
			},
		],
	},
	stablecoins: {
		checked: "2026-10-04",
		sources: [
			{
				title: "Primary and secondary markets for stablecoins",
				publisher: "Federal Reserve (FEDS Notes)",
				url: "https://www.federalreserve.gov/econres/notes/feds-notes/primary-and-secondary-markets-for-stablecoins-20240223.html",
			},
			{
				title: "Circle Mint",
				publisher: "Circle",
				url: "https://www.circle.com/circle-mint",
			},
			{
				title: "USDC transparency and reserves",
				publisher: "Circle",
				url: "https://www.circle.com/transparency",
			},
			{
				title: "Stablecoins data",
				publisher: "DefiLlama",
				url: "https://stablecoins.llama.fi/stablecoins?includePrices=true",
			},
			{
				title:
					"Annual Economic Report 2025, chapter III: the next-generation monetary and financial system",
				publisher: "Bank for International Settlements",
				url: "https://www.bis.org/publ/arpdf/ar2025e3.htm",
			},
			{
				title: "Making sense of stablecoins",
				publisher: "Visa",
				url: "https://corporate.visa.com/en/sites/visa-perspectives/trends-insights/making-sense-of-stablecoins.html",
			},
			{
				title:
					"Joint statement by Treasury, Federal Reserve and FDIC, 12 March 2023",
				publisher: "Federal Reserve",
				url: "https://www.federalreserve.gov/newsevents/pressreleases/monetary20230312b.htm",
			},
			{
				title:
					"Crypto-enabled fraudster sentenced for orchestrating $40 billion fraud",
				publisher: "US Department of Justice (SDNY)",
				url: "https://www.justice.gov/usao-sdny/pr/crypto-enabled-fraudster-sentenced-orchestrating-40-billion-fraud",
			},
		],
		claims: [
			{
				text: "Only approved customers, mostly companies, deal with the issuer directly; everyone else buys tokens on an exchange.",
				source: 0,
			},
			{
				text: "The issuer takes in dollars and creates the same number of tokens, and pays back a dollar for each token returned.",
				source: 1,
			},
			{
				text: "Reserves are mostly short-term US government debt and similar assets.",
				source: 2,
			},
			{
				text: "About $316 billion of stablecoins existed on 4 October 2026; USDT and USDC made up about four fifths.",
				source: 3,
			},
			{
				text: "Nearly all stablecoins are pegged to the US dollar.",
				source: 4,
			},
			{
				text: "Stablecoins serve mainly as a way into and out of crypto trading.",
				source: 4,
			},
			{
				text: "Retail-sized payments are a tiny share of stablecoin transfers.",
				source: 5,
			},
			{
				text: "In March 2023, $3.3 billion of USDC's reserves was stuck at the failed Silicon Valley Bank and its price fell below 90 cents.",
				source: 0,
			},
			{
				text: "USDC recovered once US authorities protected the bank's depositors.",
				source: 6,
			},
			{
				text: "TerraUSD, which had no reserve of dollars, collapsed in May 2022.",
				source: 7,
			},
		],
	},
	exchanges: {
		checked: "2026-10-04",
		sources: [
			{
				title: "Matching engine",
				publisher: "Coinbase Exchange documentation",
				url: "https://docs.cdp.coinbase.com/exchange/concepts/matching-engine",
			},
			{
				title: "Ethereum wallets",
				publisher: "ethereum.org",
				url: "https://ethereum.org/en/wallets/",
			},
			{
				title: "Securing your wallet",
				publisher: "bitcoin.org",
				url: "https://bitcoin.org/en/secure-your-wallet",
			},
			{
				title: "Exchange Review, August 2026",
				publisher: "CoinDesk Data",
				url: "https://www.coindesk.com/research/exchange-review-august-2026",
			},
			{
				title: "SEC v. Samuel Bankman-Fried, complaint, 13 December 2022",
				publisher: "US Securities and Exchange Commission",
				url: "https://www.sec.gov/litigation/complaints/2022/comp-pr2022-219.pdf",
			},
			{
				title: "North Korea responsible for $1.5 billion Bybit hack",
				publisher: "FBI Internet Crime Complaint Center",
				url: "https://www.ic3.gov/PSA/2025/PSA250226",
			},
		],
		claims: [
			{
				text: "A centralised exchange keeps an order book: buyers' prices on one side, sellers' prices on the other.",
				source: 0,
			},
			{
				text: "When a buyer's price meets a seller's, the exchange matches them.",
				source: 0,
			},
			{
				text: "The trade happens at the price of the offer that was already waiting in the book.",
				source: 0,
			},
			{
				text: "Coins you keep on an exchange are under its keys: you are trusting the exchange with custody of them.",
				source: 1,
			},
			{
				text: "Exchanges can be hacked, fail or freeze access to funds.",
				source: 2,
			},
			{
				text: "In August 2026 about four fifths of tracked crypto spot trading happened on centralised exchanges (decentralised exchanges had 18.7%).",
				source: 3,
			},
			{
				text: "FTX stopped withdrawals in November 2022 and collapsed (paused 8 November, bankrupt 11 November).",
				source: 4,
			},
			{
				text: "Hackers stole about $1.5 billion from Bybit in February 2025.",
				source: 5,
			},
		],
	},
	"swaps-and-pools": {
		checked: "2026-10-04",
		sources: [
			{
				title: "Uniswap v2 Core whitepaper",
				publisher: "Uniswap",
				url: "https://app.uniswap.org/whitepaper.pdf",
			},
			{
				title: "Maximal Extractable Value: implications for crypto markets",
				publisher: "European Securities and Markets Authority",
				url: "https://www.esma.europa.eu/sites/default/files/2025-07/ESMA50-481369926-29744_Maximal_Extractable_Value_Implications_for_crypto_markets.pdf",
			},
			{
				title:
					"Exclusive data from EigenPhi reveals that sandwich attacks on Ethereum have waned",
				publisher: "Cointelegraph Research",
				url: "https://cointelegraph.com/research/exclusive-data-from-eigenphi-reveals-that-sandwich-attacks-on-ethereum-have-waned",
			},
			{
				title: "Uniswap v2 pricing",
				publisher: "Uniswap documentation",
				url: "https://developers.uniswap.org/docs/protocols/v2/concepts/pricing",
			},
		],
		claims: [
			{
				text: "On a decentralised exchange, a pool holds two tokens supplied by other people.",
				source: 0,
			},
			{
				text: "You swap against the pool, and a program on the blockchain does the trade.",
				source: 0,
			},
			{
				text: "The pool keeps its two balances, multiplied together, from falling; before fees the product stays the same.",
				source: 0,
			},
			{
				text: "This constant-product rule is how Uniswap's original (v2) pools set the price.",
				source: 0,
			},
			{
				text: "Put 1,000 USDC with a 0.30% fee into a pool of 10 ETH and 20,000 USDC and you get 0.4748 ETH, not 0.5 (arithmetic from the whitepaper's rule).",
				source: 0,
			},
			{
				text: "The bigger the swap compared with the pool, the worse the price.",
				source: 0,
			},
			{
				text: "Others can see your swap before it is final and trade around it (a sandwich attack).",
				source: 1,
			},
			{
				text: "Sandwich attacks cost traders on Ethereum about $60 million in the year to October 2025.",
				source: 2,
			},
			{
				text: "A slippage limit caps how bad a price you accept.",
				source: 3,
			},
		],
	},
	staking: {
		checked: "2026-10-04",
		sources: [
			{
				title: "Proof-of-stake",
				publisher: "ethereum.org",
				url: "https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/",
			},
			{
				title: "Pectra",
				publisher: "ethereum.org",
				url: "https://ethereum.org/en/roadmap/pectra/",
			},
			{
				title: "Ethereum validator queue",
				publisher: "validatorqueue.com",
				url: "https://www.validatorqueue.com/",
			},
			{
				title: "Ethereum staking",
				publisher: "ethereum.org",
				url: "https://ethereum.org/en/staking/",
			},
			{
				title: "Proof-of-stake rewards and penalties",
				publisher: "ethereum.org",
				url: "https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/",
			},
			{
				title: "Lido documentation",
				publisher: "Lido",
				url: "https://docs.lido.fi/",
			},
		],
		claims: [
			{
				text: "Ethereum is secured by validators, each of which locks up a deposit called a stake.",
				source: 0,
			},
			{
				text: "Each validator locks up at least 32 ETH.",
				source: 1,
			},
			{
				text: "Validators propose and vote on new blocks.",
				source: 0,
			},
			{
				text: "Once validators holding at least two thirds of the staked ether have voted for it in two rounds of checkpoints, a block is final, about 15 minutes after it was added.",
				source: 0,
			},
			{
				text: "Validators that do their job earned about 2.6% a year as of 4 October 2026.",
				source: 2,
			},
			{
				text: "About 43.7 million ETH was staked on 4 October 2026, a little over a third of all ether.",
				source: 2,
			},
			{
				text: "A validator that signs two conflicting blocks is slashed: part of its deposit is destroyed and it is removed.",
				source: 3,
			},
			{
				text: "On 4 October 2026 the queue to leave took about 14 days.",
				source: 2,
			},
			{
				text: "Rewards change over time: they fall as more ether is staked.",
				source: 4,
			},
			{
				text: "Staking through a provider such as Lido means its node operators run the validators and it keeps 10% of the rewards.",
				source: 5,
			},
		],
	},
	"lending-and-borrowing": {
		checked: "2026-10-04",
		sources: [
			{
				title: "Liquidations",
				publisher: "Aave Help Center",
				url: "https://aave.com/help/borrowing/liquidations",
			},
			{
				title: "Aave V3 overview",
				publisher: "Aave documentation",
				url: "https://aave.com/docs/aave-v3/overview",
			},
			{
				title: "DeFi lending: intermediation without information?",
				publisher: "Bank for International Settlements (Bulletin 57)",
				url: "https://www.bis.org/publ/bisbull57.htm",
			},
			{
				title: "Protocols data",
				publisher: "DefiLlama",
				url: "https://api.llama.fi/protocols",
			},
			{
				title: "rsETH incident report, 20 April 2026",
				publisher: "Aave governance forum",
				url: "https://governance.aave.com/t/rseth-incident-report-april-20-2026/24580",
			},
		],
		claims: [
			{
				text: "On a lending protocol such as Aave, you deposit crypto as collateral and borrow less than it is worth.",
				source: 1,
			},
			{
				text: "Borrowers are anonymous, so loans are secured by collateral rather than a credit check.",
				source: 2,
			},
			{
				text: "The health factor is the collateral counted at its liquidation threshold (80% here) divided by the debt: $10,000 of ether against $6,000 gives 1.33.",
				source: 0,
			},
			{
				text: "Below a health factor of 1, the loan can be liquidated.",
				source: 0,
			},
			{
				text: "If ether falls 26%, the collateral is worth $7,400 and the health factor drops to about 0.99, below 1 (arithmetic from the formula).",
				source: 0,
			},
			{
				text: "Anyone can then repay part of the debt and take some of the collateral at a discount.",
				source: 0,
			},
			{
				text: "About $31 billion was borrowed across lending protocols on 4 October 2026 (computed).",
				source: 3,
			},
			{
				text: "In April 2026, an attacker used tokens released by a bridge exploit as collateral to borrow about $193 million from Aave.",
				source: 4,
			},
			{
				text: "Aave's own code was not broken, but some lenders could not withdraw for a time.",
				source: 4,
			},
		],
	},
	"tokenised-assets": {
		checked: "2026-10-04",
		sources: [
			{
				title: "The rise of tokenised money market funds",
				publisher: "Bank for International Settlements (Bulletin 115)",
				url: "https://www.bis.org/publ/bisbull115.htm",
			},
			{
				title: "USYC",
				publisher: "Circle",
				url: "https://www.circle.com/usyc",
			},
			{
				title: "Tokenized Treasuries",
				publisher: "rwa.xyz",
				url: "https://app.rwa.xyz/treasuries",
			},
			{
				title: "Tokenized real-world assets overview",
				publisher: "rwa.xyz",
				url: "https://app.rwa.xyz/",
			},
			{
				title: "Update on the digital gilt instrument (DIGIT) pilot issuance",
				publisher: "HM Treasury",
				url: "https://www.gov.uk/government/publications/update-on-the-digital-gilt-instrument-digit-pilot-issuance/update-on-the-digital-gilt-instrument-digit-pilot-issuance",
			},
		],
		claims: [
			{
				text: "A fund manager buys ordinary assets, such as short-term US government debt.",
				source: 1,
			},
			{
				text: "The fund issues tokens on a blockchain, each recording a share in the fund.",
				source: 1,
			},
			{
				text: "Circle's USYC is an example: each token is a share in a fund holding short-term US government debt.",
				source: 1,
			},
			{
				text: "BlackRock's BUIDL is another tokenised US Treasury fund.",
				source: 2,
			},
			{
				text: "The tokens circulate on public blockchains, but only between wallets the issuer has approved.",
				source: 0,
			},
			{
				text: "Tokenised US government debt was worth about $14.8 billion on 4 October 2026.",
				source: 2,
			},
			{
				text: "On the same tracker, stablecoins were worth about $295 billion that day.",
				source: 3,
			},
			{
				text: "In the UK, the first digital gilt is due by the end of March 2027.",
				source: 4,
			},
			{
				text: "Tokenised funds carry the risks of the fund behind them.",
				source: 0,
			},
			{
				text: "Many tokenised funds are not open to the public: USYC, for example, is only for non-US persons, with a $100,000 minimum.",
				source: 1,
			},
		],
	},
};
