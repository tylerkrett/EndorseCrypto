import { Tag } from "~/components/ui/tag";
import { factSheets } from "~/lessons/sources";
import { CHECKED_ON } from "~/lib/site";

/** Every source behind a lesson, with the claims each one supports. */
export function SourcesList({
	slug,
	id = "sources",
}: {
	slug: string;
	id?: string;
}) {
	const sheet = factSheets[slug];
	if (!sheet) return null;
	return (
		<section
			aria-labelledby={`${id}-title`}
			className="container-page snap-start scroll-mt-20 pb-20"
			id={id}
		>
			<div className="mx-auto flex max-w-[760px] flex-col gap-6 rounded-[20px] border border-line bg-surface p-6 md:p-8">
				<div className="flex flex-wrap items-center gap-3">
					<h2 className="eyebrow text-brand-on" id={`${id}-title`}>
						Sources
					</h2>
					<Tag tone="green">Checked {CHECKED_ON}</Tag>
				</div>
				<ol className="flex flex-col gap-5">
					{sheet.sources.map((s, si) => {
						const claims = sheet.claims.filter((c) => c.source === si);
						return (
							<li className="flex flex-col gap-1.5" key={s.url}>
								<a
									className="font-semibold text-[15px] text-fg underline decoration-line-strong underline-offset-4 hover:text-brand-on"
									href={s.url}
									rel="noreferrer"
									target="_blank"
								>
									{s.title}
								</a>
								<span className="text-[13px] text-dim">{s.publisher}</span>
								{claims.length > 0 && (
									<ul className="mt-1 flex list-disc flex-col gap-1 pl-5 text-[14px] text-muted">
										{claims.map((c) => (
											<li key={c.text}>{c.text}</li>
										))}
									</ul>
								)}
							</li>
						);
					})}
				</ol>
				<p className="text-[13px] text-dim">
					Corrections to this lesson: none so far. Spotted something wrong? See
					how we check facts on the sources page.
				</p>
			</div>
		</section>
	);
}
