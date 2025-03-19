import { test } from "@sand4rt/experimental-ct-web";
import MarkdownIt from "markdown-it";
import nestedHeaders from "../../../src/markdown-viewer/nested-headers-ruler";
import { Token } from "markdown-it/index.js";

test.describe("nestedHeadersRuler", () => {

  test("should correctly nest headers and adjust levels", () => {
    const markdown = `
# Level 1
## Level 2
### Level 3
## Level 2 again
# Level 1 again
`;

    const expectedTokens = [
      { type: "heading_container_open", level: 0, nesting: 1, attrs: [["data-heading-level", "1"]] },
      { type: "heading_open", level: 1, nesting: 1 },
      { type: "inline", level: 2, nesting: 0 },
      { type: "heading_close", level: 1, nesting: -1 },
      { type: "heading_container_open", level: 1, nesting: 1, attrs: [["data-heading-level", "2"]] },
      { type: "heading_open", level: 2, nesting: 1 },
      { type: "inline", level: 3, nesting: 0 },
      { type: "heading_close", level: 2, nesting: -1 },
      { type: "heading_container_open", level: 2, nesting: 1, attrs: [["data-heading-level", "3"]] },
      { type: "heading_open", level: 3, nesting: 1 },
      { type: "inline", level: 4, nesting: 0 },
      { type: "heading_close", level: 3, nesting: -1 },
      { type: "heading_container_close", level: 2, nesting: -1, attrs: [["data-heading-level", "3"]] },
      { type: "heading_container_close", level: 1, nesting: -1, attrs: [["data-heading-level", "2"]] },
      { type: "heading_container_open", level: 1, nesting: 1, attrs: [["data-heading-level", "2"]] },
      { type: "heading_open", level: 2, nesting: 1 },
      { type: "inline", level: 3, nesting: 0 },
      { type: "heading_close", level: 2, nesting: -1 },
      { type: "heading_container_close", level: 1, nesting: -1, attrs: [["data-heading-level", "2"]] },
      { type: "heading_container_close", level: 0, nesting: -1, attrs: [["data-heading-level", "1"]] },
      { type: "heading_container_open", level: 0, nesting: 1, attrs: [["data-heading-level", "1"]] },
      { type: "heading_open", level: 1, nesting: 1 },
      { type: "inline", level: 2, nesting: 0 },
      { type: "heading_close", level: 1, nesting: -1 },
      { type: "heading_container_close", level: 0, nesting: -1, attrs: [["data-heading-level", "1"]] },
    ];

    const tokens = parseMarkdown(markdown);

    expectTokensToMatchParsedTokens(tokens, expectedTokens);
  });

  test("should handle single header and adjust levels", () => {
    const markdown = "# Single Header";

    const expectedTokens = [
      { type: "heading_container_open", level: 0, nesting: 1, attrs: [["data-heading-level", "1"]] },
      { type: "heading_open", level: 1, nesting: 1 },
      { type: "inline", level: 2, nesting: 0 },
      { type: "heading_close", level: 1, nesting: -1 },
      { type: "heading_container_close", level: 0, nesting: -1, attrs: [["data-heading-level", "1"]] },
    ];

    const tokens = parseMarkdown(markdown);

    expectTokensToMatchParsedTokens(tokens, expectedTokens);
  });

  test("should handle no headers and not adjust levels", () => {
    const markdown = "Some plain text.";

    const expectedTokens = [
      { type: "paragraph_open", level: 0, nesting: 1 },
      { type: "inline", level: 1, nesting: 0 },
      { type: "paragraph_close", level: 0, nesting: -1 },
    ];

    const tokens = parseMarkdown(markdown);

    expectTokensToMatchParsedTokens(tokens, expectedTokens);
  });
});

function parseMarkdown(markdown: string): Token[] {
  const md = new MarkdownIt();
  md.use(nestedHeaders);
  return md.parse(markdown, {});
}

function expectTokensToMatchParsedTokens(tokens, expectedTokens: { type: string; level: number; nesting: number; }[]) {
  test.expect(tokens.length).toBe(expectedTokens.length);

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const expectedToken = expectedTokens[i];

    for (const property of Object.keys(expectedToken)) {
      const message = `${expectedToken.type} (${i}) property: ${property} should match`;
      test.expect(token[property], message).toEqual(expectedToken[property]);
    }
  }
}
