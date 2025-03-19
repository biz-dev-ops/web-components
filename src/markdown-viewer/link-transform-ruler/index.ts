import MarkdownIt, { StateCore, Token } from "markdown-it";

export type Link = {
  tokens: Token[];
  getAttribute(name: string): string | null | undefined;
  getPath(): string | null | undefined;
  getText(): string | null | undefined;
}

export class LinkImpl implements Link {
  tokens: Token[];

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  getAttribute(name: string): string | null | undefined {
    return this.tokens.find(token => token.type === "link_open")?.attrGet(name);
  }

  getPath(): string | null | undefined {
    return this.getAttribute("href")?.split("?")[0]?.split("#")[0];
  }

  getText(): string | null | undefined {
    return this.tokens.find(token => token.type === "text")?.content;
  }
}

export type LinkTransFormRulerPluginOptions = {
  transformer: (link: Link) => void
}

export default function linkTransformRulerPlugin(md: MarkdownIt, options: LinkTransFormRulerPluginOptions): void {
  const transformer = options.transformer;

  md.core.ruler.push("links_transform_ruler", (state: StateCore): void => {
    for (const token of state.tokens) {
      if (token.type === "inline" && token.children) {
        let activeLink: LinkImpl | null = null;

        for (let childIdx = 0; childIdx < token.children.length; childIdx++) {
          const child = token.children[childIdx];

          if (child.type === "link_open") {
            activeLink = new LinkImpl(getLinkTokens(token.children, childIdx));
            transformer(activeLink);
          }

          if (child.type === "link_close" && activeLink) {
            activeLink = null;
          }
        }
      }
    }
  });

  md.core.ruler.push("move_block_items_out_of_inline_children_ruler", (state: StateCore): void => {
    const tokens: Token[] = [];

    for (const token of state.tokens) {
      if (token.type === "inline" && token.children) {
        let displayBlock = false;
        const children: Token[] = [];

        for (const child of token.children) {
          if (child.type === "link_open" && child.block) {
            displayBlock = true;
          }

          if (displayBlock) {
            moveTokenOneLevelUp(child, token.level);
          }
          else {
            children.push(child);
          }

          if (child.type === "link_close") {
            if (displayBlock) {
              child.block = true;
            }
            displayBlock = false;
          }
        }

        token.children = children;


        if (token.children.length > 0) {
          tokens.push(token);
        }
      }
      else {
        tokens.push(token);
      }
    }

    state.tokens = tokens;

    function moveTokenOneLevelUp(token: Token, level: number) {
      token.level = level + token.level;
      token["moved"] = true;
      tokens.push(token);
    }
  });

  md.core.ruler.push("move_block_items_out_of_paragraph_rule", (state: StateCore): void => {
    const tokens: Token[] = [];
    let paragraphOpenIdx = -1;

    for (const token of state.tokens) {
      if (token.type === "paragraph_open") {
        paragraphOpenIdx = tokens.length;
      }
      else if (token.type === "paragraph_close") {
        paragraphOpenIdx = -1;
      }

      if ((token as any).moved) {
        moveOutOfParagraph(token);
      }
      else {
        tokens.push(token);
      }

      if (token.type === "paragraph_close") {
        removeEmptyParagraph();
      }
    }

    state.tokens = tokens;

    function moveOutOfParagraph(token: Token) {
      delete token["moved"];
      if (paragraphOpenIdx >= 0) {
        token.level -= 1;
        tokens.splice(paragraphOpenIdx++, 0, token);
      }
      else {
        tokens.push(token);
      }
    }

    function removeEmptyParagraph() {
      const index = tokens.length - 2;
      if (tokens[index].type === "paragraph_open") {
        tokens.splice(index, 2);
      }
    }
  });
}

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