import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;          // ISO
  author: string;
  category: string;
  tags: string[];
  readingMinutes: number;
};

export type Post = PostMeta & {
  body: string;          // raw MDX
};

let cache: Post[] | null = null;

export async function getAllPosts(): Promise<Post[]> {
  if (cache) return cache;

  const files = await fs.readdir(BLOG_DIR);
  const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

  const posts: Post[] = await Promise.all(
    mdxFiles.map(async (file) => {
      const raw = await fs.readFile(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.mdx$/, "");
      const minutes = Math.max(1, Math.round(readingTime(content).minutes));
      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        author: data.author ?? "Campus Meridian",
        category: data.category ?? "Guides",
        tags: Array.isArray(data.tags) ? data.tags : [],
        readingMinutes: minutes,
        body: content,
      };
    }),
  );

  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  cache = posts;
  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const all = await getAllPosts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getRelatedPosts(slug: string, limit = 3): Promise<PostMeta[]> {
  const all = await getAllPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];

  const others = all.filter((p) => p.slug !== slug);
  // Rank by shared tag count, then recency.
  const ranked = others
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score || +new Date(b.post.date) - +new Date(a.post.date));

  return ranked.slice(0, limit).map(({ post }) => stripBody(post));
}

export async function getAllPostMeta(): Promise<PostMeta[]> {
  const all = await getAllPosts();
  return all.map(stripBody);
}

function stripBody(p: Post): PostMeta {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { body, ...meta } = p;
  return meta;
}
