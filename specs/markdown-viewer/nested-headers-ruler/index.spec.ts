import { test } from "@sand4rt/experimental-ct-web";
import MarkdownIt from "markdown-it";
import { Token } from "markdown-it/index.js";
import { expectMarkdownToMatch } from "../markdown-test-util";
import nestedHeadersRulerPlugin from "../../../src/markdown-viewer/nested-headers-ruler";

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
    ] as Token[];

    expectTokens(markdown, expectedTokens);
  });

  test("should handle single header and adjust levels", () => {
    const markdown = "# Single Header";

    const expectedTokens = [
      { type: "heading_container_open", level: 0, nesting: 1, attrs: [["data-heading-level", "1"]] },
      { type: "heading_open", level: 1, nesting: 1 },
      { type: "inline", level: 2, nesting: 0 },
      { type: "heading_close", level: 1, nesting: -1 },
      { type: "heading_container_close", level: 0, nesting: -1, attrs: [["data-heading-level", "1"]] },
    ] as Token[];

    expectTokens(markdown, expectedTokens);
  });

  test("should handle no headers and not adjust levels", () => {
    const markdown = "Some plain text.";

    const expectedTokens = [
      { type: "paragraph_open", level: 0, nesting: 1 },
      { type: "inline", level: 1, nesting: 0 },
      { type: "paragraph_close", level: 0, nesting: -1 },
    ] as Token[];

    expectTokens(markdown, expectedTokens);
  });
});

function expectTokens(markdown: string, expectedTokens: Token[]) {
  const md = new MarkdownIt();
  md.use(nestedHeadersRulerPlugin);
  expectMarkdownToMatch(md, markdown, expectedTokens);
}

