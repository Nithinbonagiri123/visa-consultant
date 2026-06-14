import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock } from "lucide-react";

import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd } from "@/components/seo/jsonld";
import { MdxContent } from "@/components/blog/mdx-content";
import { PostCard, formatDate } from "@/components/blog/post-card";
import { getAllPostMeta, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { site } from "@/lib/site";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getAllPostMeta();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${site.url}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug);
  const crumbs: Crumb[] = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: post.title },
  ];

  return (
    <>
      <OrganizationJsonLd />
      <BreadcrumbJsonLd items={crumbs} />
      <ArticleJsonLd post={post} />

      <section className="relative isolate overflow-hidden pb-12">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-muted via-white to-white" />
        <div className="absolute inset-0 -z-10 bg-grid opacity-[0.04]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-[40vh] bg-radial-fade" />

        <Breadcrumb items={crumbs} />

        <Container className="mt-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-full bg-navy-50 px-3 py-1 font-medium text-navy-800">
              {post.category}
            </span>
            <span className="text-navy-600">{formatDate(post.date)}</span>
            <span className="inline-flex items-center gap-1.5 text-navy-600">
              <Clock size={12} /> {post.readingMinutes} min read
            </span>
          </div>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-navy-900 sm:text-5xl lg:text-[3.4rem]">
            {post.title}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {post.description}
          </p>

          <div className="mt-8 flex items-center gap-3 border-t border-navy-100 pt-6 text-sm">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-navy-900 to-navy-700 font-display text-xs font-semibold text-white">
              {post.author
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div>
              <p className="font-medium text-navy-900">{post.author}</p>
              <p className="text-xs text-muted-foreground">Senior education counsellors</p>
            </div>
          </div>
        </Container>
      </section>

      <Container className="max-w-3xl pb-16">
        <article>
          <MdxContent source={post.body} />
        </article>

        <div className="mt-12 flex flex-wrap gap-2 border-t border-navy-100 pt-8">
          {post.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-navy-800"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/#enquire"
            className={buttonVariants({ variant: "primary", size: "lg" })}
          >
            Book free consultation <ArrowRight size={18} />
          </Link>
          <Link
            href="/blog"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            More articles
          </Link>
        </div>
      </Container>

      {related.length > 0 && (
        <section className="border-t border-navy-100 bg-surface-muted py-20">
          <Container>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-500">
              Continue reading
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">
              Related guides
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTABand />
    </>
  );
}

function ArticleJsonLd({
  post,
}: {
  post: Awaited<ReturnType<typeof getPostBySlug>>;
}) {
  if (!post) return null;
  const json = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
