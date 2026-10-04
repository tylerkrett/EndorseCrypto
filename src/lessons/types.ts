// Shared lesson types. A lesson is plain data: its copy (lessons.ts), its scene (scenes/), and
// the sources behind every claim (sources.ts). The 3D canvas and the static pictures both draw
// the same scene, so the two views always show the same thing.

export type Step = {
	title: string;
	body: string;
	/** The closing "what can go wrong" step, styled as a warning. */
	risk?: boolean;
};

export type Question = {
	prompt: string;
	options: string[];
	/** Index of the right option. */
	answer: number;
	explain: string;
	/** The step that explains the answer; a wrong answer offers to replay it. */
	step: number;
};

export type TryIt =
	| {
			kind: "toggle";
			/** The step the control belongs to. */
			step: number;
			label: string;
			options: [string, string];
			/** One sentence per option, shown under the control. */
			notes: [string, string];
	  }
	| {
			/** Edit a payment and watch its real SHA-256 fingerprint change. */
			kind: "hash";
			step: number;
			label: string;
			/** The record as originally sealed. Input is 1 while the text matches it, else 0. */
			original: string;
	  }
	| {
			kind: "slider";
			step: number;
			label: string;
			min: number;
			max: number;
			by: number;
			initial: number;
			unit: "usdc" | "percent";
	  };

export type Lesson = {
	slug: string;
	number: number;
	title: string;
	/** One line for cards and metadata. */
	summary: string;
	minutes: number;
	steps: Step[];
	tryIt: TryIt;
	quiz: Question[];
	/** Shown under the scene when the numbers are examples rather than live figures. */
	example?: string;
	/** The step whose picture is used on the lesson card. */
	cardStep: number;
};

export type Source = {
	title: string;
	publisher: string;
	url: string;
};

export type Claim = {
	/** The claim as the lesson states it. */
	text: string;
	/** Index into the lesson's sources. */
	source: number;
};

export type FactSheet = {
	/** ISO date the sources were last checked. */
	checked: string;
	sources: Source[];
	claims: Claim[];
};
