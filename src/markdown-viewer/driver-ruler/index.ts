import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token.mjs";

export interface driverRulerPluginOptions {
    tokenToHtml: (token: Token) => string | undefined;
}

export function driverRulerPlugin(md: MarkdownIt, options?: driverRulerPluginOptions): void {
    const tokenToHtml = options?.tokenToHtml || ((_token: Token) => undefined);

    md.core.ruler.push("driver-ruler", (state) => {
        state.tokens = applyDriver(state.tokens, tokenToHtml);
    });
};

function applyDriver(tokens: Token[], tokenToHtml: (token: Token) => string | undefined) {
    let newTokens: Token[] = [];
    let tokenId = 0;
    let replacingTokens = false;

    while (tokenId < tokens.length) {
        const token = tokens[tokenId];
        if (token.children) {
            token.children = applyDriver(token.children, tokenToHtml);
        }

        if (replacingTokens) {
            if (token.type === "link_close") {
                replacingTokens = false;
            }

            tokenId++;
            continue;
        }

        if (token.type !== "link_open") {
            newTokens.push(token);
            tokenId++;
            continue;
        }

        const title = getNextTextContent(tokens, tokenId);
        const newToken = parseToken(token, title, tokenToHtml);
        if (newToken) {
            replacingTokens = true;
            newTokens.push(newToken);
        }
        else {
            newTokens.push(token);
        }

        tokenId++;
    }
    return newTokens;
}

function parseToken(token: Token, title: string | null, tokenToHtml: (token: Token) => string | undefined) : Token | null {
    const html = tokenToHtml(token);
    if (!html) {
        return null;
    }

    const htmlBlockToken = new Token("html_block", "", 0);
    htmlBlockToken.content = html;
    htmlBlockToken.block = true;
    if(title) {
        htmlBlockToken.attrSet("title", title);
    }

    return htmlBlockToken;
}



function getNextTextContent(tokens: Token[], idx: number): string | null {
    for (idx; idx < tokens.length; idx++) {
      const token = tokens[idx];
      if(token.type === "list_item_close") {
        return null;
      }

      if (token.type === "text") {
        return token.content;
      }

      if(token.children) {
        const title = getNextTextContent(token.children, 0);
        if(title) {
          return title;
        }
      }
    }
    return null;
  }
