# Stablecoins and crypto payments: how they are actually used (state of things as of 4 October 2026)

How to read these notes

- Every finding carries a group tag: **[A]** well-established fact, safe to teach; **[B]** fast-changing figure, must be shown with its "as of" date; **[C]** contested or commonly misstated claim, given with the accurate version.
- Every finding also carries a verification tag, because the site's rule is "true and sourced, or not used":
  - **(opened)** = I read the linked source itself in this session (for PDFs and APIs, I extracted the text or data directly).
  - **(secondary)** = a news or analyst report of a primary source; I opened the report but not the primary.
  - **(snippet)** = the figure came from a search-result summary of the linked page; I could not open the page. Treat as a lead and verify before teaching.
- Research date: 4 October 2026. Web search quota ran out part-way, so some items are flagged as gaps rather than chased further.
- Nothing here is investment advice or a price prediction.

---

## 1. Mechanism: how a fiat-backed stablecoin is minted, redeemed and backed, who can do that directly, and how other designs differ

### Takeaway
A fiat-backed stablecoin is created ("minted") only when an approved business customer sends real money to the issuer, and destroyed ("burned") when that customer returns tokens for money; ordinary people normally buy and sell existing tokens on exchanges and do not deal with the issuer. The reserves behind the two largest coins are mostly short-term US government debt and related instruments rather than "cash in a bank", and crypto-collateralised, synthetic and algorithmic designs work in fundamentally different ways with different failure modes.

### Cited Findings

**Definitions**

- [A] (opened) EU supervisors' consumer definition: "A so called 'stablecoin' is a crypto-asset that purports to maintain a stable value by reference to one asset (e.g. a fiat currency) or several assets. Stablecoins may not be so stable overtime, especially in stressed market conditions." Joint ESAs factsheet, October 2025 — [ESMA/EBA/EIOPA factsheet](https://www.esma.europa.eu/sites/default/files/2025-10/Joint_ESAs_Factsheet_on_crypto-assets.pdf)
- [A] (opened) FCA research definition: "A token which seeks to stabilise its value in relation to a currency or another asset(s)" — [FCA Cryptoassets consumer research 2025, Wave 6](https://www.fca.org.uk/publication/research-notes/cryptoasset-consumer-research-2025-wave-6.pdf)

**Fiat-backed stablecoins: mint and redeem, step by step (USDC and USDT as the worked examples)**

- [A] (opened) There are two separate markets. In the *primary market* the issuer mints and burns tokens directly with customers. In the *secondary market* (centralised and decentralised exchanges) existing tokens change hands between traders. For USDC and USDT, primary-market access is "restricted to a set of approved customers that tend to be companies rather than retail traders" — [Federal Reserve FEDS Note, "Primary and Secondary Markets for Stablecoins", 23 Feb 2024](https://www.federalreserve.gov/econres/notes/feds-notes/primary-and-secondary-markets-for-stablecoins-20240223.html)
- [A] (opened) Circle (USDC, EURC): direct minting and redemption is through "Circle Mint", which "is for institutional customers". Typical users are exchanges, institutional traders, wallet providers, banks and consumer-app companies. Individuals cannot use it and must go through secondary providers. Mint: the customer sends fiat from a bank account (wire, SEPA or other bank rails) and receives stablecoin. Redeem: the customer returns stablecoin and receives the underlying currency 1:1 — [Circle Mint](https://www.circle.com/circle-mint)
- [A] (opened) Circle's legal obligation, in its SEC filing, is to "redeem all Circle stablecoins presented by Circle Mint customers on a one-for-one basis for U.S. dollars or euros" (i.e. the obligation runs to Circle Mint customers) — [Circle Form 10-Q, quarter ended 30 June 2026](https://www.sec.gov/Archives/edgar/data/0001876042/000187604226000248/crcl-20260630.htm)
- [A] (opened) Tether (USDT): "Minimum Tether Token acquisition or redemption amount: 100,000 USD". Fee to acquire: 0.1%. Fee to redeem: "The greater of $1,000 or 0.1%". Account verification fee: "150 USD in Tether Tokens". "Tether maintains the sole discretion to approve or not approve accounts", and withdrawal requests "are evaluated per request and can take several days to process" — [Tether fees page](https://tether.to/en/fees/)
- [A] (opened) The Fed note also records the "reported minimum of $100,000 of USDT per mint on-chain" and says USDC's primary market is comparatively more accessible — [Federal Reserve FEDS Note, 23 Feb 2024](https://www.federalreserve.gov/econres/notes/feds-notes/primary-and-secondary-markets-for-stablecoins-20240223.html)
- [A] (opened) Issuer redemption depends on the banking system being open. During the March 2023 USDC episode Circle said "issuance and redemption is constrained by the working hours of the U.S. banking system" — [Federal Reserve FEDS Note, 23 Feb 2024](https://www.federalreserve.gov/econres/notes/feds-notes/primary-and-secondary-markets-for-stablecoins-20240223.html)

Animator-ready sequence for a fiat-backed coin (each step is supported by the sources above):

1. A business (for example a crypto exchange) applies to the issuer and passes identity and compliance checks. Only then does it get an issuer account. (Circle Mint is institutions-only; Tether approves accounts at its discretion and has a $100,000 minimum.)
2. The business sends ordinary money (e.g. US dollars by bank wire) from its bank account to the issuer's bank account.
3. The issuer creates ("mints") the same number of new tokens on a blockchain and delivers them to the business. The number of tokens in existence goes up.
4. The issuer puts the dollars into its reserve: mostly short-term US government debt, overnight lending secured on government debt (repo), a government money-market fund, and some bank deposits (see reserve composition below). The issuer keeps the interest earned.
5. The business sells or passes tokens to the public on exchanges and apps. From here on, tokens move wallet-to-wallet on the blockchain. A member of the public who "buys USDC" is normally buying existing tokens from another holder or an intermediary at the market price, not from the issuer.
6. Redemption is the reverse: an approved customer sends tokens back to the issuer, the issuer destroys ("burns") them (the number in existence goes down) and sends dollars from the reserve to the customer's bank account. Bank payments only move during banking hours.
7. The market price on exchanges is usually within a fraction of a cent of $1 but it is a market price, not a guarantee (see Section 4 for times it was not).

**What backs the largest fiat-backed coins (issuer reports)**

- [B] (opened) Tether, as of 30 June 2026 (published 31 July 2026): total assets $187,751,426,411; total liabilities $183,641,897,215; assets exceed liabilities by about $4.11bn; USDT in circulation $184.6bn; more than 146 tonnes of gold; Q2 net operating profit about $1.50bn, "led by U.S. Treasury and repo". The report is an *attestation* "prepared by BDO"; Tether says "the Big Four audit process continued" — [Tether Q2 2026 attestation release](https://tether.io/news/tether-posts-strong-q2-performance-generates-1-5b-net-operating-profit-maintains-4-11b-reserve-buffer-and-expands-gold-holdings-to-more-than-146-tons/)
- [B] (secondary) Breakdown of the same 30 June 2026 Tether report: US Treasury bills $114.96bn; reverse repo $25.62bn; secured loans $13.45bn; gold 146.2 tonnes valued at $18.84bn; 98,933 BTC valued at $5.8bn; excess reserves down from $8.23bn at end-Q1 2026 — [ForkLog, 1 Aug 2026](https://forklog.com/en/tethers-excess-reserves-halve-in-q2/)
- [B] (opened) Tether, as of 31 December 2025 (published 30 Jan 2026): total assets $192,877,729,144; liabilities $186,539,895,593; excess reserves $6.3bn; direct US Treasury holdings above $122bn; total Treasury exposure including reverse repo above $141bn; attestation by BDO — [Tether FY2025 release](https://tether.io/news/tether-delivers-10b-profits-in-2025-6-3b-in-excess-reserves-and-record-141-billion-exposure-in-u-s-treasury-holdings/)
- [A] (opened) Circle: USDC reserves sit in (1) the Circle Reserve Fund, a BlackRock-managed SEC Rule 2a-7 government money market fund holding "cash, short-dated US Treasuries and overnight US Treasury repurchase agreements", and (2) deposits at banks. "A Big Four accounting firm provides monthly third-party assurance that the value of USDC reserves are greater than the amount of USDC in circulation"; Deloitte & Touche LLP has been Circle's auditor since fiscal 2022 — [Circle transparency page, viewed with data as of 24 Sep 2026](https://www.circle.com/transparency)
- [B] (opened) Circle 10-Q: "Cash and cash equivalents segregated for the benefit of stablecoin holders" of $73,161,172 thousand at 30 June 2026, of which $61.9bn was in the Circle Reserve Fund, "a money market fund managed by BlackRock Advisors, LLC" — [Circle Form 10-Q, 30 June 2026](https://www.sec.gov/Archives/edgar/data/0001876042/000187604226000248/crcl-20260630.htm)
- [B] (snippet) Same filing as summarised by search: at 30 June 2026 USDC reserves were $11,428m cash at banks plus $61,917m in the Circle Reserve Fund (about 84% in the fund); at 31 March 2026, $10,658m cash plus $66,467m fund (about 86%) — [Circle 10-Q, 30 June 2026](https://www.sec.gov/Archives/edgar/data/0001876042/000187604226000248/crcl-20260630.htm); [Circle 10-Q, 31 March 2026](https://www.sec.gov/Archives/edgar/data/0001876042/000187604226000150/crcl-20260331.htm)
- [B] (snippet) Cash reserves at banks "significantly exceeded" the FDIC limit; FDIC insurance on USDC reserve deposits was limited to an aggregate $1.8m as of 31 March 2026 — [Circle 10-Q, 31 March 2026](https://www.sec.gov/Archives/edgar/data/0001876042/000187604226000150/crcl-20260331.htm)

**Crypto-collateralised stablecoins (DAI as the worked example)**

- [A] (opened) Anyone can create DAI without an issuer's permission: "any Ethereum user can access the smart contracts issuing the token" — [Federal Reserve FEDS Note, 23 Feb 2024](https://www.federalreserve.gov/econres/notes/feds-notes/primary-and-secondary-markets-for-stablecoins-20240223.html)
- [A] (opened) Mechanism in the protocol's own words: a user "creates a Vault ... by funding it with a specific type and amount of collateral", then generates Dai "in exchange for keeping her collateral locked in the Vault". "Every Dai in circulation is directly backed by excess collateral, meaning that the value of the collateral is higher than the value of the Dai debt." Each collateral type has a Liquidation Ratio, "the collateral-to-debt ratio at which a Vault becomes vulnerable to Liquidation". A vault that becomes too risky "is liquidated through automated ... auctions". To get collateral back the owner "must pay down or completely pay back the Dai she generated, plus the Stability Fee". Prices come from oracles; the Oracle Security Module "delays a price for one hour" — [Maker (now Sky) Protocol whitepaper](https://makerdao.com/en/whitepaper/)

Animator-ready sequence for a crypto-collateralised coin:

1. A user locks crypto worth more than they want to borrow into a smart contract (a "vault"). Example shape only: lock $150 of crypto to create 100 DAI; the required ratio varies by collateral type and is set by governance.
2. The contract creates new DAI and gives it to the user. It is a loan against the locked collateral.
3. A price feed ("oracle") keeps reporting the collateral's market price to the contract.
4. If the collateral's value falls below the required ratio, the contract sells the collateral at auction to repay the DAI, and charges a penalty. No person decides this; it is automatic.
5. To unlock the collateral, the user returns the DAI plus a fee; the returned DAI is destroyed.

**"Synthetic dollar" (Ethena USDe)**

- [A] (opened) Ethena's own documentation: "USDe is **not** the same as a fiat stablecoin like USDC or USDT. USDe is a synthetic dollar, backed with crypto assets and corresponding short futures positions." Direct mint and redeem is "exclusively for approved market making counterparties" after KYC/KYB checks; everyone else trades it in external pools — [Ethena docs](https://docs.ethena.fi/)

**Algorithmic stablecoins (TerraUSD as the worked example; this design failed)**

- [A] (opened) "Terraform promotional materials claimed that, under the Terra Protocol, one UST could always be exchanged for $1 worth of LUNA, the Terra blockchain's native token. Conversely, $1 worth of LUNA could always be exchanged for one UST." There was no reserve of dollars; the peg relied on "a computer algorithm" and market incentives — [US Department of Justice (SDNY), 11 Dec 2025](https://www.justice.gov/usao-sdny/pr/crypto-enabled-fraudster-sentenced-orchestrating-40-billion-fraud)
- [A] (opened) NY Fed description: "one unit of UST exchanged for one dollar worth of Luna", a peg that depended on investors being willing to hold Luna — [NY Fed Liberty Street Economics, 12 July 2023](https://libertystreeteconomics.newyorkfed.org/2023/07/runs-on-stablecoins/)

Animator-ready sequence for the algorithmic design (see Section 4 for the collapse):

1. Two tokens exist: UST (meant to be worth $1) and LUNA (free-floating price).
2. Rule: anyone can swap 1 UST for $1 worth of newly created LUNA, or $1 of LUNA for 1 new UST.
3. If UST trades below $1, traders are supposed to buy cheap UST and swap it for $1 of new LUNA, which removes UST and pushes its price back up.
4. The flaw: this only works while people will pay for LUNA. If confidence goes, each swap creates more LUNA, LUNA's price falls, more LUNA must be created per UST, and both spiral down together.

**Mix of designs in the market**

- [B] (opened) DefiLlama stablecoin API, fetched 4 Oct 2026: of $315.76bn tracked, $287.01bn (90.9%) is labelled fiat-backed, $28.07bn (8.9%) crypto-backed (this label includes USDS $6.86bn, USDe $4.90bn, DAI $4.80bn) and $0.68bn (0.2%) algorithmic — [DefiLlama stablecoins API](https://stablecoins.llama.fi/stablecoins?includePrices=true); dashboard at [defillama.com/stablecoins](https://defillama.com/stablecoins)

**Commonly misstated**

- [C] "Anyone can always swap a stablecoin for $1 with the issuer." Accurate version: for USDC and USDT today, direct redemption is for approved, mostly institutional customers (Tether: $100,000 minimum and fees). Retail holders sell on an exchange at the market price — [Fed FEDS Note](https://www.federalreserve.gov/econres/notes/feds-notes/primary-and-secondary-markets-for-stablecoins-20240223.html); [Tether fees](https://tether.to/en/fees/); [Circle Mint](https://www.circle.com/circle-mint). The UK and EU rulebooks do give holders a legal redemption right for coins issued under those regimes (see Section 5).
- [C] "Stablecoins are backed one-for-one by cash in a bank." Accurate version: the largest issuers hold mainly US Treasury bills, repo and money-market-fund shares; Tether also holds gold, bitcoin and secured loans — sources above.
- [C] "Tether is audited." Accurate version: as of the 30 June 2026 report, Tether publishes quarterly *attestations* by BDO (assurance over figures at a point in time). Tether itself says a Big Four audit process "continued"; no completed full audit is reported in that release — [Tether Q2 2026 release](https://tether.io/news/tether-posts-strong-q2-performance-generates-1-5b-net-operating-profit-maintains-4-11b-reserve-buffer-and-expands-gold-holdings-to-more-than-146-tons/)
- [C] "Stablecoins are protected like a bank deposit." Accurate version: the FCA says consumers should "not expect any kind of compensation to cover any form of crypto-related losses" — [FCA consumer page, updated 29 Jan 2026](https://www.fca.org.uk/consumers/cryptoassets). US law says payment stablecoins "shall not be backed by the full faith and credit of the United States" — [GENIUS Act, Public Law 119-27](https://www.govinfo.gov/content/pkg/PLAW-119publ27/html/PLAW-119publ27.htm)
- [C] "All stablecoins work the same way." Accurate version: USDe's issuer explicitly says it is not the same as a fiat stablecoin — [Ethena docs](https://docs.ethena.fi/); DAI is created by borrowers against crypto collateral — [Maker whitepaper](https://makerdao.com/en/whitepaper/)

### Inferences
- Price stability on exchanges is commonly explained by arbitrage: approved customers can buy below $1 on an exchange and redeem at $1, or mint at $1 and sell above $1. This is consistent with the Fed's primary/secondary market framework but I did not capture a single quotable sentence for it; cite the Fed note for the framework and present arbitrage as the standard explanation.
- From the ForkLog breakdown, T-bills plus reverse repo were about 75% of Tether's total assets at 30 June 2026 ($140.58bn of $187.75bn), gold about 10%, secured loans about 7%, bitcoin about 3%. Tether's cushion of assets over liabilities was about 2.2% of liabilities. These percentages are my arithmetic from secondary figures.
- Because issuers are barred from paying interest to holders under the US, EU and UK rules (Section 5), reserve income stays with the issuer; this is the core of the business model (Tether reported about $1.5bn operating profit in one quarter).

### Gaps
- I did not open Tether's BDO attestation PDF itself, so the asset-by-asset breakdown rests on a secondary report. The totals are from Tether's own release.
- The Circle cash/fund split came from a search summary of the 10-Q; the 10-Q page I opened confirmed the $61.9bn fund figure and the $73.16bn segregated total, which do not add exactly to the snippet's $73.345bn. Check the filing's reserve table before publishing a precise percentage.
- I did not verify the current collateral mix of DAI/USDS (how much is crypto versus real-world assets or other stablecoins). DefiLlama's "crypto-backed" label is a simplification.
- No source captured for typical fees and spreads a UK retail user pays to buy or sell stablecoins on an exchange.

---

## 2. Size and use: supply, issuer shares, on-chain volume, trading versus payments, and what "adjusted" volume means

### Takeaway
About $305-316bn of stablecoins exist (depending on what a tracker counts), over 99% pegged to the US dollar, with Tether and Circle together issuing roughly four-fifths. Headline transfer volumes in the tens of trillions of dollars are mostly trading, exchange plumbing and automated activity; the best available estimate of genuine payments is around $390bn for 2025, and no official statistic splits trading from payment use.

### Cited Findings

**Supply and issuer share**

- [B] (opened) DefiLlama API, fetched 4 Oct 2026 (my computation from the raw data): total $315.76bn across 429 tracked assets. USDT $184.03bn (58.3%); USDC $74.21bn (23.5%); USDS $6.86bn; USDe $4.90bn; DAI $4.80bn; USD1 $4.44bn; USDG $3.09bn; PYUSD $2.87bn; RLUSD $2.50bn. USD-pegged $314.05bn (99.5%); euro-pegged $0.81bn (0.26%) — [DefiLlama stablecoins API](https://stablecoins.llama.fi/stablecoins?includePrices=true)
- [B] (opened) Caveat on that total: DefiLlama's list includes tokenised fund-type tokens whose price is above $1 because they accumulate yield (USYC $2.40bn at $1.139, USDY $2.20bn at $1.147) and BlackRock's BUIDL ($2.25bn). Those are not payment stablecoins in the usual sense — [DefiLlama stablecoins API](https://stablecoins.llama.fi/stablecoins?includePrices=true)
- [B] (snippet) A different tracker gives $304.2bn on 29 Sep 2026, about $16bn below a $320.6bn all-time peak in May 2026, with USDT $183.8bn (60.4%) and USDC $74.6bn (24.5%); supply ranged roughly $300-310bn through Q3 2026 after a $7.7bn drop in June — [Rise, Q3 2026 stablecoin trends report](https://www.riseworks.io/blog/q3-2026-stablecoin-trends-report)
- [B] (opened) Tether's own figure: USDT in circulation $184.6bn at 30 June 2026 — [Tether Q2 2026 release](https://tether.io/news/tether-posts-strong-q2-performance-generates-1-5b-net-operating-profit-maintains-4-11b-reserve-buffer-and-expands-gold-holdings-to-more-than-146-tons/)
- [A] (opened) "Over 99% of stablecoins are US dollar-denominated"; growth is "concentrated in the two largest stablecoins, USDT (Tether) and USDC (Circle)" — [BIS Annual Economic Report 2025, Chapter III, 29 June 2025](https://www.bis.org/publ/arpdf/ar2025e3.htm)

**Transfer volume: raw versus adjusted**

- [A] (opened) Visa's explanation of why raw numbers mislead: on public blockchains "developers can create automated bot programs that perform activities like stablecoin arbitrage, liquidity provision, and market making". Using "a simple heuristic that removes inorganic data", "transaction volume for the last 30 days can be adjusted from $3.9 trillion to $817.5 billion". Retail-sized transactions were "less than one percent of all adjusted stablecoin volume in the past 12 months", and "most stablecoin volume still comes from high-value transfers, not retail transactions". Visa also says the method is still open to debate — [Visa, "Making sense of stablecoins" (first published 25 Apr 2024, page dated 21 July 2025)](https://corporate.visa.com/en/sites/visa-perspectives/trends-insights/making-sense-of-stablecoins.html)
- [B] (secondary) Visa Onchain Analytics (data by Allium Labs): adjusted stablecoin transaction volume was a record $1.79tn in June 2026 (previous record $1.78tn in February 2026; May 2026 about $1.1tn). USDC about $1.21tn (67%), USDT about $576bn (32%), PYUSD $2.42bn. By chain: Base about $565bn, Ethereum about $562bn, Tron about $320bn. The adjustment removes high-frequency bots, exchange treasury rebalancing and repeated smart-contract transactions — [Cointelegraph, 6 July 2026](https://cointelegraph.com/news/stablecoin-transaction-volume-hits-record-179-trillion-in-june-visa); dashboard at [visaonchainanalytics.com](https://visaonchainanalytics.com/transactions)
- [B] (snippet) McKinsey with Artemis Analytics: raw stablecoin transaction volume rose 72% in 2025 to about $33tn, but "actual stablecoin payments" were about $390bn in 2025, roughly 0.02% of global payment volumes and more than double 2024. B2B payments were about $226bn, nearly 60% of the real-payment total. The remainder of raw volume is "mainly ... trading, internal shuffling of funds, and automated blockchain activity" — [McKinsey, "Stablecoins in payments: What the raw transaction numbers miss"](https://www.mckinsey.com/industries/financial-services/our-insights/stablecoins-in-payments-what-the-raw-transaction-numbers-miss)
- [B] (opened) Chainalysis 2026 index (period 1 July 2025 to 30 June 2026, published 23 Sep 2026): global crypto economic activity $9.4tn (down 1.6%). Cross-border stablecoin transfers rose 77.5%, from $124.2bn to $220.3bn; monthly cross-border stablecoin volume went from $11bn (Jan 2025) to $24bn (June 2026). Stablecoins were 96% of domestic peer-to-peer activity. Stablecoin balances were 22.5% of global on-chain balances by June 2026. The UK ranked 17th — [Chainalysis 2026 Global Crypto Adoption Index](https://www.chainalysis.com/blog/2026-global-crypto-adoption-index/)

**What stablecoins are used for**

- [A] (opened) BIS: stablecoins serve "as an on- and off-ramp to the crypto ecosystem" and increasingly "as a cross-border payment instrument for residents in emerging market economies lacking access to the dollar" — [BIS Annual Economic Report 2025, Chapter III](https://www.bis.org/publ/arpdf/ar2025e3.htm)
- [B] (opened) UK evidence (YouGov for the FCA, fieldwork 5 Aug to 2 Sep 2025): a quarter of UK crypto users who have bought crypto say they bought stablecoins. "The most popular reason for purchasing stablecoins is to use them on cryptoasset trading venues when buying or selling other cryptoassets (50%)." Buying goods or services was cited by 17% (down 10 points), buying other financial products 15%, sending to friends and family 11%. 14% of UK crypto holders held Tether. Among crypto users, 58% had heard of stablecoins; among people merely aware of crypto, 12% — [FCA Cryptoassets consumer research 2025, Wave 6](https://www.fca.org.uk/publication/research-notes/cryptoasset-consumer-research-2025-wave-6.pdf)
- [A] (opened) FCA, describing the UK market when costing its rules: stablecoin "uptake among consumers was low and limited to overseas issuers, and there were no stablecoin issuers operating from the UK" — [FCA PS26/10, 30 June 2026](https://www.fca.org.uk/publication/policy/ps26-10.pdf)

**Commonly misstated**

- [C] "Stablecoins now move more money than Visa." Accurate version: that comparison sets *raw* on-chain transfer volume (which counts bots, exchange-internal moves and trading) against card purchases. Visa's own adjustment cut a $3.9tn month to $817.5bn, and McKinsey/Artemis put genuine payments at about $390bn for all of 2025 — [Visa](https://corporate.visa.com/en/sites/visa-perspectives/trends-insights/making-sense-of-stablecoins.html); [McKinsey](https://www.mckinsey.com/industries/financial-services/our-insights/stablecoins-in-payments-what-the-raw-transaction-numbers-miss) (snippet)
- [C] "Adjusted volume is payment volume." Accurate version: adjusted volume removes bot-like activity but still includes large transfers and trading-related flows; Visa says retail-sized transactions were under 1% of adjusted volume — [Visa](https://corporate.visa.com/en/sites/visa-perspectives/trends-insights/making-sense-of-stablecoins.html)
- [C] "The stablecoin market is $X" stated without a date or source. Accurate version: trackers differed by about $10bn on nearly the same day ($304.2bn on 29 Sep vs $315.76bn on 4 Oct 2026) because they count different tokens — sources above.

### Inferences
- USDT plus USDC were about 82% of DefiLlama's total on 4 Oct 2026 (my arithmetic).
- On Visa's June 2026 figures USDC produced about two-thirds of adjusted volume while being about a quarter of supply, and Base and Ethereum led by chain. That pattern suggests adjusted volume is still weighted towards on-chain trading and DeFi rather than everyday payments. This is my reading, not a sourced statement.
- $390bn of real payments against about $33tn raw volume implies roughly 1% of raw volume is payments on the McKinsey/Artemis definition (arithmetic on snippet figures; low confidence until the article is opened).
- There is no official "trading vs payments" split. The honest teaching line is: most stablecoin activity is linked to crypto trading and market plumbing; payments are a small but growing share, concentrated in business-to-business and cross-border use.

### Gaps
- I could not open the McKinsey/Artemis article (two timeouts and an access block), so all its figures are snippet-level. They need checking against the article before use.
- I did not obtain Visa's raw (unadjusted) figure for June 2026, nor Artemis's own dashboard figures.
- The Rise/"Q3 2026 trends" supply numbers are from a company blog seen only as a snippet.
- I could not open the IMF's December 2025 departmental paper "Understanding Stablecoins" (403). It is the obvious official source for a use-case breakdown: [IMF page](https://www.imf.org/en/publications/departmental-papers/issues/2025/12/02/understanding-stablecoins-570602)

---

## 3. Real payment use: who settles with stablecoins, in what way, and what the evidence says about remittance costs

### Takeaway
The evidenced uses in 2026 are mostly behind the scenes: card networks let banks and fintechs settle their obligations to the network in stablecoins, payment processors accept stablecoins and pay the merchant in ordinary money, and money-transfer firms use them for treasury movements. There is no official dataset showing what a stablecoin remittance costs end to end, so "near-zero cost" claims are not evidenced; the World Bank benchmark for conventional digital-only transfer operators is already about 3.6%.

### Cited Findings

**Card networks**

- [B] (secondary) Visa, per a Business Wire release of 29 April 2026 as reported: stablecoin settlement at a $7bn annualised run rate, up 50% on the prior quarter; settlement pilot expanded to nine blockchains (Arc, Base, Canton, Polygon, Tempo added to Avalanche, Ethereum, Solana, Stellar); more than 130 stablecoin-linked card programmes — [The Block, 29 Apr 2026](https://www.theblock.co/amp/post/399405/visa-stablecoin-settlement-hits-7-billion-run-rate-pilot-expands-nine-blockchains)
- [B] (secondary) Visa, per reports of 8 Sep 2026: stablecoin settlement above a $20bn annualised run rate, more than 15 times a year earlier; more than 160 stablecoin-linked card programmes live; payment volume on those programmes up nearly 200% year on year. How it works, as described: "Consumers hold stablecoins, swipe a Visa card, and the merchant receives fiat. Visa handles the conversion and settlement layer in between." — [The Block, 8 Sep 2026](https://theblock.co/news/business/2026-09-08-visa-stablecoin-settlement-tops-20-billion-annualized-run-rate-up-more-than-15x-year-over-year-413749); [Crypto Briefing, 8 Sep 2026](https://cryptobriefing.com/visa-stablecoin-settlement-20-billion/)
- [B] (secondary) Mastercard, 3 June 2026: expanded settlement to allow intraday, weekend and holiday card settlement in regulated stablecoins alongside fiat. Settlement is between issuers and acquirers and the network. Stablecoins: USDC, PYUSD, USDG, USDP, RLUSD, SoFiUSD. Chains: Ethereum, Solana, Polygon, Base, Arbitrum, Canton, Tempo, XRP Ledger. First regions: United States and Latin America. First institutions named: ARQ, CBW Bank, Cross River, Lead Bank, Nuvei — [The Block, 3 June 2026](https://www.theblock.co/post/403474/mastercard-expands-stablecoin-settlement-options-with-usdc-pyusd-and-rlusd); Mastercard's own release (returned 403 to me): [Mastercard press release, June 2026](https://www.mastercard.com/us/en/news-and-trends/press/2026/june/mastercard-expands-settlement-capabilities-to-include-stablecoin.html)

Animator-ready sequence for "card network stablecoin settlement":

1. A shopper pays with a card as normal. The shopper and the shop see an ordinary card payment in ordinary currency.
2. Behind the scenes, the shopper's card issuer owes money to the network, and the network owes money to the shop's bank (the acquirer). Normally these debts are settled by bank transfer on business days.
3. With stablecoin settlement, the issuer or acquirer pays or receives that settlement amount as stablecoins on a blockchain instead, which can happen at weekends and holidays.
4. The shop still receives ordinary money from its bank.

**Payment processors and wallets**

- [A] (opened) Stripe documentation (viewed 4 Oct 2026): customers "choose their preferred stablecoin currency, crypto wallet, and payment network, while completed payments settle in your Stripe balance in your local currency". Accepted tokens: USDC (on Tempo, Ethereum, Solana, Polygon, Base), plus USDP and USDG for US only. Customers can pay from anywhere except sanctioned countries, "but only businesses in supported countries and regions can accept stablecoin payments": the US, with a private preview for the EU, Hong Kong, Mexico and Switzerland. The UK (GB) is not in the listed business locations. Limit $10,000 per transaction; refunds go back as stablecoins to the original wallet; no card-style disputes or chargebacks — [Stripe docs: Stablecoin payments](https://docs.stripe.com/payments/stablecoin-payments)
- [B] (snippet) Stripe charges a flat 1.5% for stablecoin payments, bought Bridge for $1.1bn, and the Stripe/Paradigm-backed Tempo blockchain went live on mainnet in March 2026 — [Eco, "Stripe stablecoin payments 2026"](https://eco.com/support/en/articles/15083174-stripe-stablecoin-payments-2026)
- [A] (opened) PayPal, 17 March 2026: PayPal USD (PYUSD) made available in 70 markets including the United Kingdom. Users can "buy, hold, send, and receive PYUSD directly from their PayPal account", send to PayPal users or third-party wallets, and convert to local currency. "Rewards are not available to Singapore or United Kingdom-based users." PYUSD is issued by Paxos Trust Company, N.A., regulated by the US OCC — [PayPal newsroom, 17 Mar 2026](https://newsroom.paypal-corp.com/2026-03-17-PAYPAL-BRINGS-PAYPAL-USD-TO-USERS-ACROSS-70-MARKETS)
- [B] (opened) PYUSD supply was $2.87bn on 4 Oct 2026, under 1% of all stablecoins — [DefiLlama stablecoins API](https://stablecoins.llama.fi/stablecoins?includePrices=true)

Animator-ready sequence for "pay a merchant with a stablecoin through a processor" (Stripe model):

1. At checkout the customer picks "Crypto".
2. The customer is sent to the processor's page, chooses a stablecoin and network, and connects their own crypto wallet.
3. The customer approves the transfer in their wallet; stablecoins move on the blockchain to the processor.
4. The processor credits the merchant's account in the merchant's local currency. The merchant never has to hold crypto.
5. If refunded, the customer gets stablecoins back to the same wallet. There is no chargeback process.

**Money-transfer companies**

- [B] (secondary) Western Union launched USDPT, a US-dollar stablecoin issued by Anchorage Digital Bank N.A. on Solana, on 4 May 2026. Initial use is "treasury management and transaction settlements" between Western Union and its agents, first in the Philippines and Bolivia; a consumer feature ("Stable by Western Union") was planned for more than 40 countries in 2026. The report contains no quantified cost savings — [The Block, 4 May 2026](https://www.theblock.co/post/399890/western-union-launches-usdpt-stablecoin-anchorage-solana)

**Remittance cost: the conventional benchmark**

- [B] (opened; latest report I could find) World Bank Remittance Prices Worldwide, Issue 53, March 2025 (Q1 2025 data), cost of sending $200: global average 6.49% (up from 6.26% in Q4 2024). Digital remittances 4.85%; non-digital 7.16%. Digital-only money transfer operators 3.55%. By provider: banks 14.55%, post offices 7.71%, money transfer operators 5.04%, mobile operators 4.97% (under 1% of the sample). Cheapest instrument to send: mobile money at 3.63%. Cheapest region to send to: South Asia 4.80%; most expensive: Sub-Saharan Africa 8.78%. 84% of corridors averaged under 5%. Targets: UN SDG and G20 global average of 3% by 2030, and no corridor above 5% — [World Bank RPW Issue 53](https://remittanceprices.worldbank.org/sites/default/files/rpw_main_report_and_annex_q125_1_0.pdf) (read via an Internet Archive copy because the World Bank site blocked automated access)
- [A] (opened) RPW tracks four provider types: "Banks, MTOs, Mobile Operators, and Post Offices". A full-text search of the 32-page Issue 53 report finds no occurrence of "crypto", "stablecoin", "blockchain" or "Bitcoin" — [World Bank RPW Issue 53](https://remittanceprices.worldbank.org/sites/default/files/rpw_main_report_and_annex_q125_1_0.pdf)

**Evidence on stablecoin use for cross-border and person-to-person transfers**

- [B] (opened) Cross-border stablecoin transfers measured by Chainalysis: $220.3bn over July 2025 to June 2026, up 77.5% — [Chainalysis 2026 index](https://www.chainalysis.com/blog/2026-global-crypto-adoption-index/)
- [B] (opened) US Federal Reserve household survey for 2024 (published May 2025): 8% of adults used crypto; 7% held it as an investment; 2% used it "to buy something or make a payment"; 1% "to send money to friends or family" — [Fed, Economic Well-Being of U.S. Households in 2024](https://www.federalreserve.gov/publications/2025-economic-well-being-of-us-households-in-2024-banking-and-credit.htm)
- [B] (opened) UK: 11% of stablecoin buyers cited sending to friends and family as a reason (2025) — [FCA Wave 6](https://www.fca.org.uk/publication/research-notes/cryptoasset-consumer-research-2025-wave-6.pdf)

**Marketing claims to keep separate from evidence**

- [C] PayPal's release says PYUSD enables "faster global transactions with lower costs than traditional payment methods" and that businesses "can use proceeds in minutes rather than days or weeks". These are the company's statements; the release gives no comparative cost data — [PayPal newsroom](https://newsroom.paypal-corp.com/2026-03-17-PAYPAL-BRINGS-PAYPAL-USD-TO-USERS-ACROSS-70-MARKETS)
- [C] "Visa and Mastercard accept stablecoins." Accurate version: the networks let member institutions settle with the network in stablecoins, and support cards funded from stablecoin balances; the merchant is paid in ordinary currency — sources above.
- [C] "Stablecoin remittances are almost free." Accurate version: the blockchain fee is one part of the cost. The sender usually pays to convert money into the stablecoin and the receiver to convert out, and exchange-rate margins apply. The World Bank's dataset does not measure stablecoin routes, and I found no official all-in cost dataset. The benchmark to beat for conventional digital-only operators is 3.55% — [World Bank RPW Issue 53](https://remittanceprices.worldbank.org/sites/default/files/rpw_main_report_and_annex_q125_1_0.pdf)
- [C] "Any business can take stablecoins through Stripe." Accurate version: per Stripe's documentation only US businesses can (preview for EU, Hong Kong, Mexico, Switzerland); UK businesses are not listed — [Stripe docs](https://docs.stripe.com/payments/stablecoin-payments)

### Inferences
- The two Visa run-rate reports conflict on timing: an April 2026 release put the run rate at $7bn, while September 2026 reports attribute "$20bn" to "fiscal second quarter of 2026" (which would be January to March 2026). Both cannot describe the same quarter. Most likely the September figure refers to a later quarter. Do not publish either number without Visa's own text.
- Even at $20bn a year, stablecoin settlement is very small against total card volumes (I did not source Visa's total volume in this session, so no ratio is given).
- The components of a stablecoin remittance cost (on-ramp fee, network fee, off-ramp fee, FX margin) are my framing from how the mechanism works; I have no dataset quantifying them.

### Gaps
- No Visa primary source opened for either settlement figure; no Mastercard primary opened (403).
- Whether the World Bank has published RPW issues after Issue 53 (March 2025) is unconfirmed. I found no later report file; the World Bank data API was updated 13 July 2026 but returned no world-level values. Present Q1 2025 as "latest available that could be verified".
- No official or academic all-in cost comparison of stablecoin versus conventional remittances was found before search quota ran out. BIS/CPMI, IMF and FSB papers would be the places to look.
- Bank use (for example bank-issued deposit tokens or bank stablecoin projects) was not researched; nothing is asserted here.
- I did not verify which stablecoin-funded cards are available to UK residents.

---

## 4. Failures: TerraUSD (May 2022), USDC (March 2023) and other depegs up to 2026

### Takeaway
Stablecoins have broken their pegs for three different reasons: a design with no real reserve (TerraUSD, which also involved fraud), a reserve asset temporarily stuck in a failed bank (USDC), and technical or venue-specific faults (several smaller cases in 2025-2026). Official sources put the Terra losses at about $40bn; USDC recovered within days once US authorities protected the bank's depositors.

### Cited Findings

**TerraUSD (UST) and LUNA, May 2022**

- [A] (opened) UST launched around September 2020 as an "algorithmic stablecoin"; the claimed rule was that 1 UST could always be exchanged for $1 worth of LUNA and vice versa — [US DOJ (SDNY), 11 Dec 2025](https://www.justice.gov/usao-sdny/pr/crypto-enabled-fraudster-sentenced-orchestrating-40-billion-fraud)
- [A] (opened) Earlier warning: UST fell "below 92 cents" in May 2021. Do Kwon claimed the algorithm restored the peg. "That was a lie." He had agreed with a high-frequency trading firm for it to buy "large amounts of UST to artificially support UST's $1 peg" — [US DOJ (SDNY)](https://www.justice.gov/usao-sdny/pr/crypto-enabled-fraudster-sentenced-orchestrating-40-billion-fraud)
- [A] (opened) "At its peak in the spring of 2022, the total market value of all UST and ... LUNA exceeded $50 billion." By May 2022 the UST market was about nine times larger than a year earlier; when the peg broke again it could not be covered up, and "UST and LUNA crashed, resulting in over $40 billion worth in investor losses" — [US DOJ (SDNY)](https://www.justice.gov/usao-sdny/pr/crypto-enabled-fraudster-sentenced-orchestrating-40-billion-fraud)
- [A] (opened) Timeline in the NY Fed's words: "Between May 7 and May 8, the algorithmic mechanism broke, and Terra broke the peg, with its price dropping from $0.9964 to $0.7934." "The supply of Luna increased from 365 million units on May 9, to more than 6 trillion units by May 13." "In about a week, between May 7 and May 16, the crash wiped out $17.17 billion in Terra's market value and $20.77 billion in Luna's market value." Over the same episode circulation of US-based stablecoins rose by 3.88bn units while algorithmic stablecoins fell by 8.70bn and crypto-collateralised by 2.25bn — [NY Fed Liberty Street Economics, 12 July 2023](https://libertystreeteconomics.newyorkfed.org/2023/07/runs-on-stablecoins/)
- [A] (opened) Other false claims found: that the Korean payment app Chai processed payments on the Terra blockchain ("In truth, Chai processed transactions through traditional financial processing networks"), and that the Luna Foundation Guard reserve was independent — [US DOJ (SDNY)](https://www.justice.gov/usao-sdny/pr/crypto-enabled-fraudster-sentenced-orchestrating-40-billion-fraud)
- [A] (opened) Legal outcome: a US civil jury found Terraform and Kwon liable for securities fraud on 5 April 2024; Terraform agreed to pay $4,473,828,306 and Kwon $204,320,196. The SEC says the depeg wiped out "$40 billion in market value" — [SEC press release 2024-73](https://www.sec.gov/newsroom/press-releases/2024-73). Kwon was extradited on 31 Dec 2024, pleaded guilty in August 2025 and was sentenced on 11 Dec 2025 to 15 years in prison, with forfeiture of over $19m — [US DOJ (SDNY)](https://www.justice.gov/usao-sdny/pr/crypto-enabled-fraudster-sentenced-orchestrating-40-billion-fraud)

Animator-ready sequence for the Terra collapse:

1. UST slips below $1 (7-8 May 2022: about $0.996 to about $0.79).
2. Holders rush to swap UST for $1 worth of new LUNA and sell the LUNA.
3. Selling pushes LUNA's price down, so each UST swap now creates more LUNA.
4. LUNA supply balloons (365 million on 9 May to over 6 trillion by 13 May) and its price heads towards zero.
5. With LUNA nearly worthless, nothing stands behind UST, which also collapses. About $38bn of combined market value disappears between 7 and 16 May on the NY Fed's figures.

**USDC, March 2023**

- [A] (opened) On 10 March 2023 Circle announced it "had been unable to wire out a portion of USDC reserves held at Silicon Valley Bank", $3.3bn out of roughly $40bn of reserves. USDC "de-pegged significantly"; USDC and DAI both reached "lows of under 90 cents" and recovered over about three days. On 11 March Circle said "issuance and redemption is constrained by the working hours of the U.S. banking system" and would resume when banks opened on Monday; redemptions resumed on 13 March. USDC's market capitalisation fell by about $10bn over March 2023 while USDT's rose by about $9bn — [Federal Reserve FEDS Note, 23 Feb 2024](https://www.federalreserve.gov/econres/notes/feds-notes/primary-and-secondary-markets-for-stablecoins-20240223.html)
- [A] (opened) What ended it: on 12 March 2023 the US Treasury, Federal Reserve and FDIC announced that Silicon Valley Bank "depositors will have access to all of their money starting Monday, March 13" — [Joint statement, 12 Mar 2023](https://www.federalreserve.gov/newsevents/pressreleases/monetary20230312b.htm)

Animator-ready sequence for the USDC depeg:

1. Friday 10 March 2023: a bank holding $3.3bn (about 8%) of USDC's reserves fails. Circle confirms the money is stuck.
2. Weekend: banks are closed, so the issuer cannot process redemptions. Holders can only sell on exchanges, and the price there falls below 90 cents.
3. DAI falls too. The Fed note records both dropping below 90 cents together. The usual explanation is that part of DAI's collateral was USDC, but I did not capture a quotable sentence for that cause, so show the fact (both fell) and source the reason separately before stating it.
4. Sunday 12 March: US authorities say all the bank's depositors will be made whole.
5. Monday 13 March: redemptions reopen and the price returns towards $1 over the following days.

**Other notable depegs, 2025-2026**

- [B] (opened, secondary analysis) Ethena USDe, 10 Oct 2025: during the largest crypto liquidation event on record, USDe "briefly plunged to $0.65" on Binance's spot market while continuing to trade close to $1 on decentralised venues; minting and redemption stayed open; the Binance dislocation lasted roughly 40 minutes. USDe's market capitalisation fell about $2.2bn, from $14.8bn on 10 Oct to $12.6bn on 12 Oct — [21Shares research](https://www.21shares.com/research/why-did-ethenas-stablecoin-remain-stable-onchain-but-depegged-on-binance)
- [B] (opened) USDe supply was $4.90bn on 4 Oct 2026 — [DefiLlama stablecoins API](https://stablecoins.llama.fi/stablecoins?includePrices=true)
- [B] (snippet) Resolv USR, 22 March 2026: an attacker exploited the minting contract to create about 80 million unbacked USR from roughly $100,000-$200,000 of collateral and extracted about $25m; USR fell to about $0.025 on Curve before recovering to around $0.85; the protocol was paused. Analysts traced it to a privileged minting role held by a single account with no mint limits — [The Block](https://www.theblock.co/post/394582/resolvs-usr-stablecoin-depegs-after-attacker-mints-80-million-unbacked-tokens-extracts-roughly-25-million)
- [B] (snippet) MSUSD (Main Street), 20 June 2026: fell by more than 90% after its reserve-verification provider stopped working with the project — [ForkLog](https://forklog.com/en/stablecoin-msusd-loses-peg-to-the-dollar/)
- [B] (snippet) USD1 (World Liberty Financial), 23 Feb 2026: traded as low as $0.99707 before recovering; a brief dip, not a sustained depeg — [Radom](https://www.radom.com/insights/world-liberty-financial-endorsed-by-trump-asserts-resilience-of-its-usd1-stablecoin-following-a-brief-dip-amid-social-media-scrutiny)

**General findings on depegs**

- [A] (opened) NY Fed researchers find stablecoins behave like money market funds in a run: flows move "from riskier to safer stablecoins on days of crypto-market stress", and there is a "$1 break-the-buck threshold, below which stablecoin redemptions accelerate" — [NY Fed Staff Report 1073 (Sep 2023, revised Apr 2024)](https://www.newyorkfed.org/research/staff_reports/sr1073)
- [A] (opened) BIS: "stablecoins of various stripes have seen substantial deviations from par" — [BIS Annual Economic Report 2025, Chapter III](https://www.bis.org/publ/arpdf/ar2025e3.htm)
- [A] (opened) The FCA's consumer page cites Tether's $41m fine and TerraUSD's collapse as cautionary examples, and warns that "the extent to which stablecoins have reserves of 'stable assets' to keep their values linked, varies in practice" — [FCA consumer page, updated 29 Jan 2026](https://www.fca.org.uk/consumers/cryptoassets)

**Commonly misstated**

- [C] "Terra was just a design that failed." Accurate version: the design did fail, and its founder also admitted fraud, including secretly arranging purchases to fake a recovery in May 2021 — [US DOJ](https://www.justice.gov/usao-sdny/pr/crypto-enabled-fraudster-sentenced-orchestrating-40-billion-fraud)
- [C] "Terra wiped out $60bn." Accurate version: official US sources say "over $40 billion" in losses (DOJ) and "$40 billion in market value" (SEC); the NY Fed measures $17.17bn plus $20.77bn between 7 and 16 May; the combined peak value "exceeded $50 billion" (DOJ). Use "about $40bn" with the source.
- [C] "USDC lost its reserves in 2023." Accurate version: about 8% of reserves ($3.3bn of roughly $40bn) was temporarily inaccessible at one failed bank, and became available again when US authorities protected all depositors — [Fed FEDS Note](https://www.federalreserve.gov/econres/notes/feds-notes/primary-and-secondary-markets-for-stablecoins-20240223.html); [Joint statement](https://www.federalreserve.gov/newsevents/pressreleases/monetary20230312b.htm)
- [C] "USDe collapsed to 65 cents." Accurate version: that price was seen on one exchange for under an hour; elsewhere it stayed near $1 and redemptions continued — [21Shares](https://www.21shares.com/research/why-did-ethenas-stablecoin-remain-stable-onchain-but-depegged-on-binance)

### Inferences
- $3.3bn of roughly $40bn is about 8% of USDC reserves (my arithmetic from the Fed's figures).
- The three failure types map neatly onto the three designs: no real backing (algorithmic), reserve held somewhere that failed (fiat-backed), and code or market-structure faults (synthetic and DeFi-native coins). That mapping is my synthesis.
- The Fed note says USDC fell "under 90 cents"; exact lows differ by exchange, so "below 90 cents" is the safe wording.

### Gaps
- USDT's brief dip during the May 2022 Terra run and its subsequent redemptions: not sourced in this session.
- Other 2025 incidents I am aware of but could not verify after search quota ran out (for example FDUSD in April 2025 and Stream Finance's xUSD in November 2025): not included as findings.
- The Resolv, MSUSD and USD1 items are snippet-level. Open the linked articles before teaching any of them.
- I did not find a primary source for Binance's compensation after the October 2025 event.

---

## 5. Regulation: US GENIUS Act, EU MiCA, the UK regime, and whether a UK consumer can pay with stablecoins today

### Takeaway
As of October 2026 the EU's stablecoin rules are fully in force, the US law is enacted but not yet effective (rules still being finalised; effective no later than 18 January 2027), and the UK has final FCA rules and legislation but the regime does not start until 25 October 2027. The Bank of England's £20,000 holding limit was a 2025 proposal for systemic sterling stablecoins that was dropped in June 2026 in favour of a temporary £40bn cap on each coin's total issuance, and that is still a draft.

### Cited Findings

**United States: GENIUS Act**

- [A] (opened) The Guiding and Establishing National Innovation for U.S. Stablecoins Act is Public Law 119-27, enacted 18 July 2025. Core requirements in the statute:
  - Only "permitted payment stablecoin issuers" may issue: subsidiaries of insured depository institutions, federal qualified issuers approved by the OCC, or state qualified issuers.
  - Reserves at least 1:1 in: US currency or Federal Reserve balances; demand deposits; Treasury bills, notes or bonds with "remaining maturity of 93 days or less"; overnight repo and reverse repo backed by Treasuries; government money market funds; tokenised forms of these.
  - Issuers must "publish the monthly composition of the issuer's reserves on the website", examined monthly by a registered public accounting firm.
  - "No permitted payment stablecoin issuer or foreign payment stablecoin issuer shall pay the holder of any payment stablecoin any form of interest or yield."
  - Reserves "may not be pledged, rehypothecated, or reused" except in limited cases.
  - Issuers with under $10,000,000,000 outstanding may opt for a state regime that is "substantially similar" to the federal one.
  - In insolvency, stablecoin holders' claims rank ahead of other creditors with respect to the reserves.
  - Payment stablecoins "shall not be backed by the full faith and credit of the United States"; implying federal deposit insurance is unlawful. They are not securities.
  - From three years after enactment, digital asset service providers may not offer payment stablecoins that are not issued by a permitted issuer (with a route for qualifying foreign issuers).
  — [GENIUS Act, Public Law 119-27 (govinfo)](https://www.govinfo.gov/content/pkg/PLAW-119publ27/html/PLAW-119publ27.htm)
- [A] (opened) Effective date: "the earlier of January 18, 2027, or 120 days after final rules are issued" — [Chapman and Cutler GENIUS Act tracker, as of 16 July 2026](https://www.chapman.com/assets/htmldocuments/Chapman-GENIUS-Act-Rulemaking-and-Reporting-Tracker-071626.pdf)
- [B] (opened) Rulemaking status at 16 July 2026: all listed items were proposals or pending, none final. Treasury advance notice 18 Sep 2025; FDIC licensing proposal 16 Dec 2025; NCUA licensing proposal Feb 2026; OCC implementation proposal issued 25 Feb 2026 (Federal Register 2 Mar 2026); Treasury "substantially similar" state-regime proposal 1 Apr 2026; FDIC implementation proposal 7 Apr 2026; Treasury AML/sanctions proposal 8 Apr 2026; NCUA implementation proposal (Federal Register 18 May 2026); joint customer-identification proposal 18 June 2026. Statutory deadline for most rules was 18 July 2026 — [Chapman tracker](https://www.chapman.com/assets/htmldocuments/Chapman-GENIUS-Act-Rulemaking-and-Reporting-Tracker-071626.pdf)
- [B] (opened, secondary) Comptroller of the Currency Jonathan Gould, reported 19 Aug 2026: "We will have a final rule out by November" — [PYMNTS, 19 Aug 2026](https://www.pymnts.com/legal/2026/occ-promises-final-rule-for-genius-act-by-november/)

**European Union: MiCA**

- [A] (opened) Regulation (EU) 2023/1114 (MiCA). Stablecoin titles (asset-referenced tokens, ARTs, and e-money tokens, EMTs) apply from 30 June 2024; the rest from 30 December 2024. Issuers must "maintain at all times a reserve of assets covering the liabilities towards the holders"; e-money tokens are issued "at par value on receipt of funds" and redeemable "at any moment and at par value"; no interest on e-money tokens; a white paper is required; the EBA supervises "significant" tokens — [EUR-Lex summary of MiCA](https://eur-lex.europa.eu/EN/legal-content/summary/european-crypto-assets-regulation-mica.html)
- [A] (opened) In consumer terms: an EMT references one official currency; "If you hold an EMT, you have the right to get your money back from the issuer at its full-face value, in the currency to which it references." "Only credit institutions or e-money institutions can offer to the public or seek admission to trading of EMTs in the EU." EMTs and ARTs "do not grant interests to holders" — [Joint ESAs factsheet, Oct 2025](https://www.esma.europa.eu/sites/default/files/2025-10/Joint_ESAs_Factsheet_on_crypto-assets.pdf)
- [A] (opened) EBA page: EMTs must be redeemable at par, on demand, at any time; a share of reserves must be held as bank deposits (at least 30% is cited); tokens used heavily as a means of exchange face limits (1 million transactions or EUR 200m a day is cited) — [EBA: asset-referenced and e-money tokens (MiCA)](https://www.eba.europa.eu/regulation-and-policy/asset-referenced-and-e-money-tokens-mica)
- [A] (opened) Enforcement against non-compliant coins: on 17 January 2025 ESMA said national authorities should ensure crypto-asset service providers comply regarding non-MiCA-compliant ARTs and EMTs "as soon as possible, and no later than the end of Q1 2025" — [ESMA news, 17 Jan 2025](https://www.esma.europa.eu/press-news/esma-news/esma-and-european-commission-publish-guidance-non-mica-compliant-arts-and-emts)
- [A] (snippet) Detail of that statement: restrictions on existing services by end-January 2025, with "sell only" services allowed until end-Q1 2025 so EU investors could exit — [ESMA statement PDF](https://www.esma.europa.eu/sites/default/files/2025-01/ESMA75-223375936-6099_Statement_on_stablecoins.pdf)
- [B] (snippet) The transitional period for existing crypto service providers ran until 1 July 2026 in most member states — [EUR-Lex summary](https://eur-lex.europa.eu/EN/legal-content/summary/european-crypto-assets-regulation-mica.html)

**United Kingdom: legislation and FCA rules**

- [A] (opened) Legislation: the Financial Services and Markets Act 2000 (Cryptoassets) Regulations 2026, SI 2026/102. It creates new regulated activities including issuing qualifying stablecoin, safeguarding qualifying cryptoassets, operating a qualifying cryptoasset trading platform, dealing, arranging and staking — [legislation.gov.uk, SI 2026/102](https://www.legislation.gov.uk/uksi/2026/102/contents/made)
- [A] (opened) FCA timetable: five policy statements published 30 June 2026 (PS26/9 admissions, disclosures and market abuse; PS26/10 stablecoin issuance; PS26/11 regulated cryptoasset activities; PS26/12 prudential; PS26/13 Handbook application). The regime starts 25 October 2027. Firms apply between 30 September 2026 and 28 February 2027 to benefit from transitional arrangements. The FCA page dates the Regulations to 4 February 2026 — [FCA: overview of cryptoasset regime policy statements](https://www.fca.org.uk/publications/policy-statements/cryptoasset-regime)
- [A] (opened) PS26/10 final rules for UK-issued (non-systemic) qualifying stablecoins — [FCA PS26/10, 30 June 2026](https://www.fca.org.uk/publication/policy/ps26-10.pdf):
  - Backing: tokens must be backed 1:1; "core backing assets" are short-term deposits and short-term government debt; an on-demand deposit requirement (5% of the pool was the proposal); issuers using "expanded backing assets" (longer-dated government debt, public-debt constant-NAV money market funds, repos) must also hold a core backing amount equal to the higher of 5% of the pool or their highest daily redemption percentage over the past 180 redemption days.
  - Backing assets held on statutory trust for holders, safeguarded with an unconnected third party (limited intragroup custody allowed); a 5% excess buffer is permitted.
  - Redemption: "We will still require UK stablecoin issuers to redeem any amount of UK-issued qualifying stablecoin within T+1"; the clock starts when the issuer receives the stablecoin; conditions of redemption "must not ... impose any minimum redemption quantity"; fees to retail holders are subject to the Consumer Duty.
  - No interest: issuers may not "pay interest or yield arising from backing assets to tokenholders".
  - Disclosure: backing-asset and circulation information updated "at least once every 3 months", plus an annual independent review of the 1:1 backing statements.
  - Four stablecoin issuers tested the policy in the FCA's Regulatory Sandbox.
- [A] (opened) Stablecoin *payments* are not yet covered by payments regulation: a "Modernising Payments Regulation" programme "will see stablecoin payments brought into future payment regulations alongside other tokenised payments such as tokenised deposits", and the FCA "will consult on proposed rules in due course" — [FCA PS26/10](https://www.fca.org.uk/publication/policy/ps26-10.pdf)
- [A] (opened) Today's position for consumers: "crypto is largely unregulated in the UK", although "the marketing of crypto is regulated"; consumers should "not expect any kind of compensation to cover any form of crypto-related losses" — [FCA consumer page, updated 29 Jan 2026](https://www.fca.org.uk/consumers/cryptoassets)

**United Kingdom: Bank of England regime for systemic sterling stablecoins**

- [A] (opened) Scope: the Bank regulates "systemic" stablecoins, those "widely used in payments" that "may pose risks to UK financial stability", once HM Treasury recognises the issuer under the Banking Act 2009; these are then jointly regulated with the FCA. Stablecoins used for crypto trading stay with the FCA alone — [BoE and FCA approach to joint regulation, 30 June 2026](https://www.bankofengland.co.uk/paper/2026/boe-and-fcas-approach-to-joint-regulation-of-systemic-stablecoin-issuers); [FCA PS26/10 ch. 2](https://www.fca.org.uk/publication/policy/ps26-10.pdf)
- [A] (opened) November 2025 proposal (10 Nov 2025 consultation): holding limits of £20,000 per coin for individuals and £10 million for businesses, with exemptions for retail businesses such as supermarkets and for intermediaries — [BoE consultation paper, 10 Nov 2025](https://www.bankofengland.co.uk/paper/2025/cp/proposed-regulatory-regime-for-sterling-denominated-systemic-stablecoins)
- [A] (snippet) The November 2025 backing proposal was at least 40% in unremunerated Bank of England deposits and up to 60% in short-term UK government debt — [Cointelegraph](https://cointelegraph.com/news/bank-of-england-stablecoin-consultation-final-rules-h2-2026)
- [A] (opened) June 2026 revision (BoE policy statement and draft Code of Practice, 22 June 2026): the Bank moved away from individual and business holding caps to a "temporary issuance guardrail" on the "aggregate issuance of each systemic stablecoin", with the Code to be finalised "by end-2026, after which it will apply to recognised systemic stablecoin issuers" — [BoE: Sterling-denominated systemic stablecoin, 22 June 2026](https://www.bankofengland.co.uk/paper/2026/ps/sterling-denominated-systemic-stablecoin)
- [A] (opened) The numbers, as summarised by the FCA: "Backing asset composition moving to a maximum of 70% UK sovereign debt with remaining maturity of less than 6 months and a minimum of 30% central bank deposits"; "Per-coin temporary issuance guardrails of £40 billion"; "Redemption within a T+0 timeframe" — [FCA PS26/10 para 2.7](https://www.fca.org.uk/publication/policy/ps26-10.pdf)
- [B] (opened, secondary) Consultation on the draft Code closed 22 September 2026; regime expected to operate from 2027; no interest to holders; capital equal to six months' operating expenses or wind-down costs — [The Block, 22 June 2026](https://www.theblock.co/news/regulation/2026-06-22-bank-of-england-drops-proposed-individual-holding-caps-for-sterling-stablecoins-sets-40-billion-issuance-guardrail-405545)

**Can a UK consumer practically pay for things with stablecoins today (October 2026)?**

- [A] (opened) There was no UK-based stablecoin issuer when the FCA costed its rules, and consumer uptake was "low and limited to overseas issuers" — [FCA PS26/10](https://www.fca.org.uk/publication/policy/ps26-10.pdf)
- [A] (opened) A UK PayPal user can buy, hold, send and receive PYUSD and convert it to local currency (since 17 March 2026); rewards are not available in the UK — [PayPal newsroom](https://newsroom.paypal-corp.com/2026-03-17-PAYPAL-BRINGS-PAYPAL-USD-TO-USERS-ACROSS-70-MARKETS)
- [A] (opened) A UK customer holding USDC in their own wallet can pay a merchant that has switched on Stripe's stablecoin option, but UK businesses are not among those that can accept this way — [Stripe docs](https://docs.stripe.com/payments/stablecoin-payments)
- [A] (opened) Tax: for UK individuals, "using tokens to pay for goods or services" is a disposal for Capital Gains Tax, as is "exchanging tokens for a different type of token" — [HMRC Cryptoassets Manual CRYPTO22100, updated 28 Nov 2025](https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22100)
- [B] (opened) Among UK crypto users, 17% say they have ever used crypto to purchase goods or services (2025), back down to 2022 levels; the most common use is converting to cash (45%) — [FCA Wave 6](https://www.fca.org.uk/publication/research-notes/cryptoasset-consumer-research-2025-wave-6.pdf)

**Commonly misstated**

- [C] "The Bank of England is capping stablecoin holdings at £20,000." Accurate version: that was a November 2025 *proposal*, only for systemic sterling stablecoins. It was dropped in June 2026 for a temporary £40bn limit on each coin's total issuance. That replacement is itself still a draft, to be finalised by end-2026 — BoE and FCA sources above.
- [C] "Stablecoins are now regulated in the UK." Accurate version: the law and FCA rules are final, but the regime starts on 25 October 2027. Until then the FCA describes crypto as "largely unregulated", with no compensation scheme cover — [FCA](https://www.fca.org.uk/consumers/cryptoassets); [FCA regime overview](https://www.fca.org.uk/publications/policy-statements/cryptoasset-regime)
- [C] "The UK rules cover USDT and USDC." Accurate version: PS26/10 sets rules for *UK-issued* qualifying stablecoins; it does not regulate overseas issuers' reserves — [FCA PS26/10](https://www.fca.org.uk/publication/policy/ps26-10.pdf). How UK platforms may offer overseas stablecoins is dealt with in the other policy statements, which I did not read.
- [C] "The GENIUS Act is in force." Accurate version: enacted 18 July 2025; effective on the earlier of 18 January 2027 or 120 days after final rules. Key rules were still at proposal stage in mid-July 2026 — [Chapman tracker](https://www.chapman.com/assets/htmldocuments/Chapman-GENIUS-Act-Rulemaking-and-Reporting-Tracker-071626.pdf)
- [C] "US-regulated stablecoins are government-guaranteed." Accurate version: the Act says the opposite — [GENIUS Act](https://www.govinfo.gov/content/pkg/PLAW-119publ27/html/PLAW-119publ27.htm)
- [C] "MiCA banned Tether." Accurate version: MiCA requires anyone offering an e-money token to the EU public to be an authorised EU credit or e-money institution, and ESMA told platforms to stop offering non-compliant stablecoins by end-Q1 2025. The ESMA page I read is about platforms offering and trading them; it does not describe a ban on holding — [ESMA](https://www.esma.europa.eu/press-news/esma-news/esma-and-european-commission-publish-guidance-non-mica-compliant-arts-and-emts)

### Inferences
- All three regimes share a core: full backing with short-term, high-quality assets; redemption at face value; no interest paid by the issuer to holders; regular public reserve disclosure. They differ on who may redeem (the UK and EU give every holder a right; current USDC/USDT practice does not), on speed (FCA T+1, BoE draft T+0) and on how much must sit in bank or central bank deposits.
- Practical answer for a UK beginner: paying directly with stablecoins is possible but niche in October 2026. Routes that exist are person-to-person transfers, PYUSD inside PayPal, and some overseas online merchants; each payment is a taxable disposal; there is no FSCS protection; and no UK-authorised sterling stablecoin exists yet. This summary is my synthesis of the cited findings.
- As of 4 October 2026 I found no evidence that the OCC's final GENIUS rule had been published; the latest public commitment was "by November".

### Gaps
- I did not read FCA PS26/11 or PS26/13, so the precise rules for UK firms offering overseas stablecoins such as USDT and USDC to UK consumers are not covered.
- The final value of the FCA's on-demand deposit requirement was not confirmed (5% was the consultation proposal and the final text keeps a 5% floor in the related core backing calculation). Check CASS 16 in PS26/10.
- The Bank of England's own June 2026 page did not show the £40bn or 70/30 figures in the text I could extract; they are confirmed by the FCA's PS26/10 and by The Block.
- No primary source captured for which EU platforms removed USDT, or for which issuers hold MiCA authorisation.
- MiCA article-level detail (the 30% deposit rule, 60% for significant tokens, the Article 23 usage caps) comes from an EBA page summary rather than the Regulation text; EUR-Lex full text could not be retrieved.
- A European Commission "2026 MiCA review" consultation document exists ([link](https://finance.ec.europa.eu/document/download/62be7015-f066-4fac-b74e-71bacdbcc9f5_en?filename=2026-mica-review-targeted-consultation-document_en.pdf)) but I did not read it.
- Whether any firm has yet been recognised as systemic by HM Treasury: none found; the BoE/FCA paper names none.

---

## 6. Bitcoin and Lightning payments: actual usage and merchant acceptance

### Takeaway
Bitcoin is used far more as an investment than as a way to pay: surveys in the US and UK put payment use at low single-digit percentages of adults, and El Salvador reversed bitcoin's legal-tender status in January 2025 after usage fell. The Lightning Network works and is growing in estimated volume, but it is small (roughly 3,800 BTC of public capacity, an estimated $1.1bn a month in late 2025), and merchant listings are sparse: about 27,000 worldwide and about 360 in the UK on the main community map.

### Cited Findings

**How people actually use crypto (surveys)**

- [B] (opened) United States, 2024: 8% of adults used crypto (down from 12% in 2021); 7% held it as an investment; 2% used it to buy something or make a payment; 1% to send money to friends or family — [Federal Reserve, Economic Well-Being of U.S. Households in 2024 (May 2025)](https://www.federalreserve.gov/publications/2025-economic-well-being-of-us-households-in-2024-banking-and-credit.htm)
- [B] (opened) United Kingdom, 2025 (fieldwork 5 Aug to 2 Sep 2025; 2,353 nationally representative interviews plus a boost of crypto users): 8% of UK adults hold crypto, down from 12% in 2024; 91% have heard of it. Among crypto users, 57% own Bitcoin. Ever-used: converted to cash 45%; exchanged for other crypto 37%; purchased goods and services 17%. 73% buy through a centralised exchange — [FCA Wave 6](https://www.fca.org.uk/publication/research-notes/cryptoasset-consumer-research-2025-wave-6.pdf)

**Lightning Network**

- [B] (opened) Public network statistics, latest record dated 30 Aug 2026: 16,232 nodes; 32,674 channels; total capacity 379,393,623,670 satoshis (about 3,794 BTC); median channel fee rate 100 parts per million — [mempool.space Lightning statistics API](https://mempool.space/api/v1/lightning/statistics/latest)
- [B] (snippet) Another analysis put public capacity at about 4,898 BTC across 41,080 channels and 17,438 nodes in May 2026, after an all-time high of 5,637 BTC in December 2025 — [Spark research, "State of the Lightning Network in 2026"](https://spark.money/research/lightning-network-2026-state)
- [B] (opened, secondary) River estimate reported 19 Feb 2026: Lightning volume about $1.1bn in November 2025 across 5.2 million transactions. Transaction counts are below the August 2023 peak of 6.6 million. River attributed growth largely to exchanges and a growing number of businesses accepting bitcoin — [Cointelegraph, 19 Feb 2026](https://cointelegraph.com/news/bitcoin-lightning-network-1b-monthly-volume)
- [B] (snippet) "Routed Lightning Network volume crossed $2 billion in March 2026" — [Spark research](https://spark.money/research/lightning-network-2026-state)

**Bitcoin base layer**

- [B] (opened) Confirmed Bitcoin transactions averaged about 690,000 a day between 4 Sep and 3 Oct 2026 (range about 536,000 to 893,000). This counts every kind of transaction, not just payments for goods — [Blockchain.com chart API](https://api.blockchain.info/charts/n-transactions?timespan=30days&format=json); chart at [blockchain.com](https://www.blockchain.com/explorer/charts/n-transactions)

**Merchant acceptance**

- [B] (opened) BTC Map (community-maintained, built on OpenStreetMap data), 4 Oct 2026: 27,182 merchants listed worldwide; 23,447 listings accept Lightning and 11,816 accept on-chain bitcoin; only 53% of listings are marked as recently verified — [BTC Map reports API](https://api.btcmap.org/v2/reports?updated_since=2026-10-03T00:00:00Z&limit=5000); map at [btcmap.org](https://btcmap.org)
- [B] (opened) BTC Map, United Kingdom, 26 Sep 2026: 363 merchants listed (310 Lightning, 255 on-chain); 36% recently verified; average verification date January 2025 — [BTC Map reports API](https://api.btcmap.org/v2/reports?updated_since=2026-09-20T00:00:00Z&limit=20000)
- [A] (snippet) Stripe offered Bitcoin checkout from 2014 and withdrew it in 2018; its current crypto product is stablecoin-based — [Eco](https://eco.com/support/en/articles/15083174-stripe-stablecoin-payments-2026); current product: [Stripe docs](https://docs.stripe.com/payments/stablecoin-payments) (opened)

**El Salvador**

- [A] (opened, tertiary) The Bitcoin Law passed 8 June 2021 and took effect 7 September 2021. On 29 January 2025 the legislature (55-2) made acceptance by businesses voluntary, removed bitcoin's legal-tender status and restricted tax payments to US dollars, tied to a $1.4bn IMF programme agreed at staff level on 18 December 2024. Survey share of Salvadorans who used bitcoin: 25.7% (2021), 21% (2022), 12% (2023), 8.1% (2024) — [Wikipedia: Bitcoin Law](https://en.wikipedia.org/wiki/Bitcoin_Law), which cites [Reuters, 30 Jan 2025](https://www.reuters.com/world/americas/lawmakers-el-salvador-rush-new-bitcoin-reform-after-imf-deal-2025-01-30/), the [IMF press release, 18 Dec 2024](https://www.imf.org/en/News/Articles/2024/12/18/pr-24485-el-salvador-imf-reaches-staff-level-agreement-on-an-eff-arrangement) and [elsalvador.com on the IUDOP survey](https://www.elsalvador.com/h-noticias/h-negocios/bitcoin-el-salvador-criptomonedas-iudop-/1194324/2025/) (cited references not opened)
- [A] (opened) Academic study using a representative face-to-face survey and Chivo wallet data: "usage of digital payments and bitcoin is low, concentrated, and has been decreasing over time"; "privacy concerns are key barriers to adoption" — [Alvarez, Argente and Van Patten, NBER Working Paper 29968 (published in Science, 2023)](https://www.nber.org/papers/w29968)

**UK tax point that affects paying with bitcoin**

- [A] (opened) Spending crypto on goods or services is a Capital Gains Tax disposal for UK individuals — [HMRC CRYPTO22100](https://www.gov.uk/hmrc-internal-manuals/cryptoassets-manual/crypto22100)

**Commonly misstated**

- [C] "Bitcoin is legal tender in El Salvador." Accurate version: it was from September 2021; the January 2025 reform removed that status and made acceptance voluntary — sources above.
- [C] "Lightning capacity shows how much is being spent." Accurate version: capacity is the bitcoin locked in *public* channels, not payment volume; private channels are not visible, and volume figures are estimates from firms such as River — [mempool.space](https://mempool.space/api/v1/lightning/statistics/latest); [Cointelegraph](https://cointelegraph.com/news/bitcoin-lightning-network-1b-monthly-volume)
- [C] "Tens of thousands of shops accept bitcoin." Accurate version: the main public map lists about 27,000 worldwide, crowd-sourced, with roughly half not recently verified; 363 are in the UK — BTC Map sources above.
- [C] "Hundreds of thousands of bitcoin transactions a day are payments." Accurate version: the daily count includes exchange transfers, self-transfers and other activity; no source here separates purchases from the rest.

### Inferences
- An average Lightning payment of roughly $210 follows from River's $1.1bn and 5.2m transactions (my arithmetic), which is consistent with exchange transfers being a large part of volume, as River itself says.
- Public Lightning capacity fell between the December 2025 high (5,637 BTC, snippet) and the 30 August 2026 reading (about 3,794 BTC, opened). The two come from different sources, so treat the direction as likely and the size as uncertain.
- Compared with stablecoins, bitcoin's payment role is small: $1.1bn a month estimated on Lightning against an estimated $390bn a year of stablecoin payments. The two estimates use different methods and should not be presented as a precise ratio.
- UK merchant acceptance is negligible in everyday terms (363 listed locations nationwide).

### Gaps
- I could not open River's own report; the Lightning volume figures are via Cointelegraph. River's methodology (which nodes it samples) is not described there.
- The Fed's survey covering 2025 (expected May 2026) was not found at the guessed address; the 2024 survey is the latest verified.
- El Salvador facts are via Wikipedia's citations rather than the Reuters and IMF pages themselves.
- No verified figures for bitcoin payment processors' volumes (for example BitPay), for PayPal's "Pay with Crypto" merchant feature, or for Block/Square's bitcoin acceptance roll-out.
- The mempool.space "latest" record is dated 30 August 2026, five weeks before the research date; I do not know why it is not more recent.
