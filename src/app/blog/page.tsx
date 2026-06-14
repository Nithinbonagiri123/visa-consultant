import type { Metadata } from "next";

import { Container, SectionHeading } from "@/components/ui/container";
import { Breadcrumb, BreadcrumbJsonLd, type Crumb } from "@/components/layout/breadcrumb";
import { CTABand } from "@/components/sections/cta-band";
import { OrganizationJsonLd } from "@/components/seo/jsonld";
import { PostCard } from "@/components/blog/post-card";
import { getAllPostMeta } from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Study Abroad Blog — Guides, Costs, Visas & University Insights",
  description:
    "Honest study-abroad guides for Indian students — country comparisons, costs, visa processes, scholarships, and university shortlists from senior counsellors.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Study Abroad Blog — Campus Meridian",
    description:
      "Honest study-abroad guides for Indian students — countries, costs, visas, and universities.",
    type: "website",
  },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Blog" },
];

export default async function BlogIndexPage() {
  const posts = await getAllPostMeta();
  const [featured, ...rest] = posts;

  return (
    <>
      <OrganizationJsonLd />
      <BreadcrumbJsonLd items={crumbs} />
      <BlogListJsonLd posts={posts} />

      <section className="relative isolate overflow-hidden pb-12">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-muted via-white to-white" />
        <div className="absolute inset-0 -z-10 bg-grid opacity-[0.04]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-[50vh] bg-radial-fade" />

        <Breadcrumb items={crumbs} />

        <Container className="mt-10">
          <SectionHeading
            eyebrow="Study abroad blog"
            title={
              <>
                Senior-counsellor <span className="gradient-text">guides</span>, <br className="hidden sm:inline" />
                without the fluff.
              </>
            }
            description="Country comparisons, real costs in INR, the visa process step-by-step, scholarships that Indian students actually win, and university shortlists that account for graduate outcomes — not just rankings."
          />
        </Container>
      </section>

      <Container>
        {featured && (
          <div className="mt-4">
            <PostCard post={featured} featured />
          </div>
        )}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>

      <CTABand />
    </>
  );
}

function BlogListJsonLd({ posts }: { posts: Awaited<ReturnType<typeof getAllPostMeta>> }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${site.name} Blog`,
    url: `${site.url}/blog`,
    description:
      "Study-abroad guides for Indian students — countries, costs, visas, scholarships, and university shortlists.",
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${site.url}/blog/${p.slug}`,
      datePublished: p.date,
      author: { "@type": "Organization", name: p.author },
    })),
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
