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

        const newToken = parseToken(token, tokenToHtml);
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

function parseToken(token: Token, tokenToHtml: (token: Token) => string | undefined) {
    const html = tokenToHtml(token);
    if (!html) {
        return null;
    }

    const htmlBlockToken = new Token("html_block", "", 0);
    htmlBlockToken.content = html;
    htmlBlockToken.block = true;

    return htmlBlockToken;
}