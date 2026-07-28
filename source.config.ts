import ts from "typescript";
import { setupTypeAcquisition } from "@typescript/ata";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { remarkSteps } from "fumadocs-core/mdx-plugins/remark-steps";
import { transformerTwoslash } from "fumadocs-twoslash";
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import { createFileSystemTypesCache } from "fumadocs-twoslash/cache-fs";

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

// Allow importing @duckity/js from twoslash via `import { Duckity } from "@duckity/js"`.
//
// For this, we need to create a virtual file system that includes the @duckity/js package from node_modules.
const sharedFsMap = new Map<string, string>();

const imports = `
  import duckity from "@duckity/js";
`;

const ata = setupTypeAcquisition({
  projectName: "twoslash-cdn",
  typescript: ts,
  logger: console,
  delegate: {
    receivedFile: (code, path) => {
      // ATA paths look like "/node_modules/@types/lodash/index.d.ts"
      // Strip the leading slash to make it a valid path for the virtual file system

      sharedFsMap.set(path, code);
    },
  },
});

await ata(imports);

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkSteps],
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerTwoslash({
          typesCache: createFileSystemTypesCache({}),
          twoslashOptions: {
            fsMap: sharedFsMap,
            compilerOptions: {
              moduleResolution: ts.ModuleResolutionKind.NodeNext,
              target: ts.ScriptTarget.ESNext,
              module: ts.ModuleKind.ESNext,
              esModuleInterop: true,
              allowJs: true,
            },
          },
        }),
      ],

      // important: Shiki doesn't support lazy loading languages for codeblocks in Twoslash popups
      // make sure to define them first (e.g. the common ones)
      langs: ["js", "jsx", "ts", "tsx"],
    },
  },
});
