import { expect } from "@sand4rt/experimental-ct-web";
import MarkdownIt from "markdown-it";
import { Token } from "markdown-it/index.js";

export function expectMarkdownToRenderAsHtml(md: MarkdownIt, markdown: string, expectedHtml: string) {
    const html = md.render(markdown);
    expect(trimHtml(html)).toBe(trimHtml(expectedHtml));
}

export function trimHtml(html: string) : string {
    return html.split("\n").map(l => l.trim()).join("");
}

export function expectTokensToMatchParsedTokens(md: MarkdownIt, markdown: string, expectedTokens: Token[]) {
    const tokens = md.parse(markdown, {});

    expect(tokens.length).toBe(expectedTokens.length);

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const expectedToken = expectedTokens[i];

      for (const property of Object.keys(expectedToken)) {
        const message = `${expectedToken.type} (${i}) property: ${property} should match`;
        expect(token[property], message).toEqual(expectedToken[property]);
      }
    }
  }
