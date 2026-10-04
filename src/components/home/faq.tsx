import { FAQS } from "~/lib/faq";

export function Faq() {
	return (
		<div className="flex flex-col divide-y divide-line overflow-hidden rounded-[20px] border border-line bg-surface">
			{FAQS.map((f, i) => (
				<details className="group" key={f.q} open={i === 0}>
					<summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 font-display font-semibold text-[17px] text-fg md:px-8">
						<h3>{f.q}</h3>
						<span
							aria-hidden="true"
							className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-brand-on transition-transform group-open:rotate-45"
						>
							+
						</span>
					</summary>
					<div className="flex flex-col gap-2 px-6 pb-6 text-[16px] text-muted leading-relaxed md:px-8">
						<p>{f.a}</p>
						{f.source && (
							<p className="text-[13px] text-dim">
								Source:{" "}
								<a
									className="underline underline-offset-4 hover:text-fg"
									href={f.source.url}
									rel="noreferrer"
									target="_blank"
								>
									{f.source.label}
								</a>
							</p>
						)}
					</div>
				</details>
			))}
		</div>
	);
}
