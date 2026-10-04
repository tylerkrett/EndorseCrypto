import { CHECKED_ON } from "./site";

// The home page FAQ. The same list feeds the visible answers and the FAQPage structured data,
// so the two always match. Factual answers carry their source.

export type Faq = {
	q: string;
	a: string;
	source?: { label: string; url: string };
};

export const FAQS: Faq[] = [
	{
		q: "Is EndorseCrypto financial advice?",
		a: "No. It is education only. The site does not sell, arrange or recommend crypto, has no buy buttons and no commission links, and never says what to buy.",
	},
	{
		q: "Is it free, and do I need an account?",
		a: "It is free and there is no account. Your progress through the lessons is saved in your own browser.",
	},
	{
		q: "Where do the facts come from?",
		a: `Every claim in a lesson has a source, listed at the end of the lesson and on the sources page. We prefer original sources such as regulators and official documentation. All sources were last checked on ${CHECKED_ON}.`,
	},
	{
		q: "Is crypto regulated in the UK?",
		a: "Only partly. The FCA says crypto is largely unregulated in the UK and that you should not expect compensation if something goes wrong. A fuller set of rules for crypto firms is due to start on 25 October 2027.",
		source: {
			label: "FCA, cryptoassets",
			url: "https://www.fca.org.uk/consumers/cryptoassets",
		},
	},
	{
		q: "Who are the lessons for?",
		a: "Adults in the UK who are new to crypto and want to understand how it works, and what can go wrong, before deciding anything.",
	},
	{
		q: "Can I turn the animation off?",
		a: "Yes. Switch animation off in the menu and every lesson becomes a plain page of still pictures and text. Devices set to reduce motion start that way.",
	},
];
