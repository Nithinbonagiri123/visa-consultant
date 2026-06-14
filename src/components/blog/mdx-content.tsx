import { MDXRemote } from "next-mdx-remote/rsc";

export async function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose-brand max-w-none">
      <MDXRemote source={source} />
    </div>
  );
}
