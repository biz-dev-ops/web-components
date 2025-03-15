import MarkdownIt, { Options, Renderer, Token } from "markdown-it";

export type Link = {
  getAttribute(name: string): string | null | undefined
  getText() : string | null | undefined
}

export type TransformResult = {
  open: string
  close: string
}

export type TransformResultOrNull = TransformResult | null;

class LinkImpl implements Link {
  tokens: Token[];

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  getAttribute(name: string): string | null | undefined {
    return this.tokens.find(token => token.type === "link_open")?.attrGet(name);
  }

  getText(): string | null | undefined {
    return this.tokens.find(token => token.type === "text")?.content;
  }
}

export type LinkTransformRuleOptions = {
  transformer: (anchor: Link) => TransformResultOrNull
}

function linkTransformRule(md: MarkdownIt, options: LinkTransformRuleOptions): void {
  const transformer = options.transformer;
  const results: TransformResultOrNull[] = []

  md.renderer.rules.link_open = function (tokens: Token[], idx: number, options: Options, _env: any, self: Renderer): string {
    const linkTokens = getLinkTokens(tokens, idx);
    const result = transformer(new LinkImpl(linkTokens));
    results.push(result);

    if (!result) {
      return self.renderToken(tokens, idx, options);
    }

    return result.open;
  }

  md.renderer.rules.link_close = function (tokens: Token[], idx: number, options: Options, _env: any, self: Renderer): string {
    const result = results.pop();

    if (!result) {
      return self.renderToken(tokens, idx, options);
    }

    return result.close;
  }
}

export default linkTransformRule;

function getLinkTokens(tokens: Token[], idx: number): Token[] {
  const _tokens: Token[] = [];

  for (idx; idx < tokens.length; idx++) {
    const token = tokens[idx];
    _tokens.push(token);
    if (token.type === "link_close") {
      break;
    }
  }
  return _tokens;
}