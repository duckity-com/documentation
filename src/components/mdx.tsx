import defaultMdxComponents from "fumadocs-ui/mdx";
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import Image from "next/image";
import { Mermaid } from '@/components/mermaid';
import type { MDXComponents } from "mdx/types";
import * as Twoslash from 'fumadocs-twoslash/ui';
import { TypeTable } from 'fumadocs-ui/components/type-table';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    img: (props) => <Image {...(props as any)} />,
    ...TabsComponents,
    ...Twoslash,
    Mermaid,
    TypeTable,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
