import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LessonPlayer } from "~/components/lesson/lesson-player";
import { Quiz } from "~/components/lesson/quiz";
import { SourcesList } from "~/components/lesson/sources-list";
import { JsonLd } from "~/components/site/json-ld";
import { Tag } from "~/components/ui/tag";
import { lessonBySlug, lessons } from "~/lessons/lessons";
import { factSheets } from "~/lessons/sources";
import { lessonPage } from "~/lib/pages";
import { CHECKED_ON } from "~/lib/site";
import { breadcrumbGraph, lessonGraph } from "~/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
	return lessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const lesson = lessonBySlug(slug);
	if (!lesson) return {};
	const page = lessonPage(slug);
	return {
		title: page?.title,
		description: page?.description,
		alternates: { canonical: page?.path },
		openGraph: {
			title: lesson.title,
			description: page?.description,
			url: page?.path,
		},
	};
}

export default async function LessonPage({ params }: Props) {
	const { slug } = await params;
	const lesson = lessonBySlug(slug);
	if (!lesson) notFound();
	const sources = factSheets[slug]?.sources.length ?? 0;
	return (
		<>
			<header className="container-page flex flex-col gap-4 pt-10 pb-6 md:pt-14">
				<nav aria-label="Breadcrumb" className="eyebrow text-dim">
					<Link className="hover:text-fg" href="/learn">
						Lessons
					</Link>
					<span className="px-2">/</span>
					<span>{String(lesson.number).padStart(2, "0")}</span>
				</nav>
				<h1 className="display-section">{lesson.title}</h1>
				<p className="max-w-[680px] text-[17px] text-muted">{lesson.summary}</p>
				<div className="flex flex-wrap items-center gap-3">
					<Tag>{lesson.minutes} min</Tag>
					<Tag tone="green">Checked {CHECKED_ON}</Tag>
					<a
						className="font-semibold text-[13px] text-brand-on hover:underline"
						href="#sources"
					>
						{sources} sources
					</a>
				</div>
				<p className="static-only max-w-[680px] text-[15px] text-dim">
					Animation is off, so this lesson is a plain page: one still picture
					and a few sentences for each step. Turn animation on in the menu to
					watch it play.
				</p>
			</header>
			<JsonLd
				graph={[
					lessonGraph(lesson),
					breadcrumbGraph([
						{ name: "Home", path: "/" },
						{ name: "Lessons", path: "/learn" },
						{ name: lesson.title, path: `/learn/${lesson.slug}` },
					]),
				]}
			/>
			<LessonPlayer slug={lesson.slug} />
			<Quiz slug={lesson.slug} />
			<SourcesList slug={lesson.slug} />
		</>
	);
}
