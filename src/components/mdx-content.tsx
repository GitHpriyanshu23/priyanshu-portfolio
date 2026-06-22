import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

export function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
    />
  );
}
