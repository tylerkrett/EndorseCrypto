import { ButtonLink } from "~/components/ui/button";

export default function NotFound() {
	return (
		<section className="container-page flex flex-col items-start gap-5 py-28">
			<p className="eyebrow text-brand-on">Page not found</p>
			<h1 className="display-section">This block is not on the chain.</h1>
			<p className="text-[17px] text-muted">
				The page you asked for does not exist.
			</p>
			<ButtonLink href="/learn">See the lessons</ButtonLink>
		</section>
	);
}
