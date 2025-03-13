import MarkdownIt, { Options, Renderer, Token } from "markdown-it";

interface Mapping {
  extensions: string[];
  componentTag: string;
}

interface WebComponentLinkRuleOptions {
  mappings?: Mapping[];
}

function webComponentLinkRule(md: MarkdownIt, options?: WebComponentLinkRuleOptions): void {
  const mappings: Mapping[] = options?.mappings || [];

  md.renderer.rules.link_open = function (tokens: Token[], idx: number, options: Options, _env: any, self: Renderer): string {
    const href = getHref(tokens, idx);
    const componentTag = getComponentTag(mappings, href);

    if (!componentTag) {
      return self.renderToken(tokens, idx, options);
    }

    return `<${componentTag} src="${href}">`;
  }

  md.renderer.rules.link_close = function (tokens: Token[], idx: number, options: Options, _env: any, self: Renderer): string {
    const componentTag = getComponentTag(mappings, getHref(tokens, idx));

    if (!componentTag) {
      return self.renderToken(tokens, idx, options);
    }

    return `</${componentTag}>`;
  }
}

export default webComponentLinkRule;

function getHref(tokens: Token[], i: number): string | null {
  for (let j = i; j >= 0; j--) {
    const token = tokens[j];
    if(token.type === "link_open") {
      return token?.attrGet("href");
    }
  }
  return null;
}

function getComponentTag(mappings: Mapping[], href: string | null): string | undefined {
  return mappings.find((mapping) => mapping.extensions.some((ext) => href?.endsWith(ext)))?.componentTag;
}