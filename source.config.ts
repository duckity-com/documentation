import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { remarkSteps } from "fumadocs-core/mdx-plugins/remark-steps";
import { remarkMdxMermaid } from 'fumadocs-core/mdx-plugins';
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";

// You can customize Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: "content",
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkSteps, remarkMdxMermaid],
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
      ],

      // important: Shiki doesn't support lazy loading languages for codeblocks in Twoslash popups
      // make sure to define them first (e.g. the common ones)
      langs: ["js", "jsx", "ts", "tsx"],
    },
  },
});
