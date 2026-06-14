import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { PostMeta } from "@/lib/blog";

export function PostCard({
  post,
  featured = false,
}: {
  post: PostMeta;
  featured?: boolean;
}) {
  if (featured) return <FeaturedCard post={post} />;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-navy-100 bg-white p-7 shadow-elevated transition-shadow hover:shadow-[0_30px_60px_-20px_rgba(10,23,51,0.25)]"
    >
      <Meta post={post} />
      <h3 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-navy-900">
        {post.title}
      </h3>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {post.description}
      </p>
      <div className="mt-6 flex items-center justify-between border-t border-navy-100 pt-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-500">
          Read article
        </span>
        <span className="grid h-9 w-9 place-items-center rounded-full border border-navy-100 text-navy-700 transition-all duration-300 group-hover:border-navy-900 group-hover:bg-navy-900 group-hover:text-white">
          <ArrowUpRight size={16} />
        </span>
      </div>
    </Link>
  );
}

function FeaturedCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-navy-100 bg-gradient-to-br from-navy-900 via-navy-800 to-royal-600 p-8 text-white shadow-elevated sm:p-12"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-royal-500/30 blur-3xl" />

      <div className="relative">
        <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300 backdrop-blur">
          Featured · {post.category}
        </p>
        <h3 className="mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h3>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-navy-200 sm:text-base">
          {post.description}
        </p>
        <div className="mt-8 flex items-center gap-4 text-xs text-navy-200">
          <span>{formatDate(post.date)}</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={12} /> {post.readingMinutes} min read
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 font-semibold text-gold-300">
            Read featured article <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}

function Meta({ post }: { post: PostMeta }) {
  return (
    <div className="flex items-center gap-3 text-xs text-navy-600">
      <span className="rounded-full bg-navy-50 px-3 py-1 font-medium text-navy-800">
        {post.category}
      </span>
      <span>{formatDate(post.date)}</span>
      <span className="inline-flex items-center gap-1.5">
        <Clock size={12} /> {post.readingMinutes} min
      </span>
    </div>
  );
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
