import defaultMdxComponents from "fumadocs-ui/mdx";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import Image from "next/image";
import { Mermaid } from "@/components/mermaid";
import type { MDXComponents } from "mdx/types";
import * as Twoslash from "fumadocs-twoslash/ui";
import { TypeTable } from "fumadocs-ui/components/type-table";
import * as reactSimpleIcons from "@icons-pack/react-simple-icons";
import { icons as reactLucideIcons } from "lucide-react";
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';

export function getMDXComponents(components?: MDXComponents) {
  let simpleIcons: { [key: string]: any } = {};
  for (const key in reactSimpleIcons) {
    if (!key.endsWith("Hex")) {
      let newKey = "Si" + key.substring(2);
      simpleIcons[newKey] = (reactSimpleIcons as { [key: string]: any })[key];
    }
  }

  let lucideIcons: { [key: string]: any } = {};
  for (const key in reactLucideIcons) {
    if (!key.endsWith("Icon")) {
      let newKey = "Li" + key;
      lucideIcons[newKey] = (reactLucideIcons as { [key: string]: any })[key].render;
    }
  }

  return {
    ...defaultMdxComponents,
    img: (props) => <Image {...(props as any)} />,
    ...TabsComponents,
    ...Twoslash,
    Mermaid,
    TypeTable,
    ...simpleIcons,
    ...lucideIcons,
    Accordion,
    Accordions,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
