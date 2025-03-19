import { expect } from "@sand4rt/experimental-ct-web";
import MarkdownIt from "markdown-it";
import { Token } from "markdown-it/index.js";

export function expectMarkdownToMatchHtml(md: MarkdownIt, markdown: string, expectedHtml: string) {
  const html = md.render(markdown);
  expect(trimHtml(html)).toBe(trimHtml(expectedHtml));
}

export function trimHtml(html: string): string {
  return html.split("\n").map(l => l.trim()).join("");
}

export function expectMarkdownToMatchTokens(md: MarkdownIt, markdown: string, expectedTokens: Token[]) {
  const tokens = md.parse(markdown, {});

  expect(tokens.length).toBe(expectedTokens.length);

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const expectedToken = expectedTokens[i];

    expectTokenToMatch(expectedToken, i, token);
  }
}

function expectTokenToMatch(expectedToken: Token, i: number, token) {
  for (const property of Object.keys(expectedToken)) {
    const message = `Token(${i}) ${expectedToken.type}, property: ${property} should match`;
    const expectedValue = expectedToken[property];
    const actualValue = token[property];
    if (Array.isArray(expectedValue)) {
      expectArrayToMatch(actualValue, expectedValue);
    }
    else {
      expect(token[property], message).toEqual(expectedToken[property]);
    }
  }
}

function expectArrayToMatch(actualValue: any, expectedValue: any[]) {
  expect(Array.isArray(actualValue)).toBe(true);
  expect(actualValue.length).toBe(expectedValue.length);

  for (let j = 0; j < expectedValue.length; j++) {
    const expectedValueItem = expectedValue[j];
    const actualValueItem = actualValue[j];

    if (Array.isArray(expectedValueItem)) {
      expectArrayToMatch(actualValueItem, expectedValueItem);
    }
    else if (typeof expectedValueItem === "object" && Object.keys(expectedValueItem).some(key => key === "type")) {
      expectTokenToMatch(expectedValueItem, j, actualValueItem);
    }
    else {
      expect(actualValueItem).toEqual(expectedValueItem);
    }
  }
}

