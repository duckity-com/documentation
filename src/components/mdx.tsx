import defaultMdxComponents from "fumadocs-ui/mdx";
import Image from "next/image";
import type { MDXComponents } from "mdx/types";

export function getMDXComponents(components?: MDXComponents) {

  return {
    ...defaultMdxComponents,
    img: (props) => <Image {...(props as any)} />,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
