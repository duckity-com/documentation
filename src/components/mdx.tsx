import defaultMdxComponents from "fumadocs-ui/mdx";
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import Image from "next/image";
import type { MDXComponents } from "mdx/types";
import * as Twoslash from 'fumadocs-twoslash/ui';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    img: (props) => <Image {...(props as any)} />,
    ...TabsComponents,
    ...Twoslash,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
