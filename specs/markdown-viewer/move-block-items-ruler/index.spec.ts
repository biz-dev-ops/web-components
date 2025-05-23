import { test, expect } from "@sand4rt/experimental-ct-web";
import MarkdownIt from "markdown-it";
import { moveBlockItemsRulerPlugin } from "../../../src/markdown-viewer/move-block-items-ruler";
import { Token } from "markdown-it/index.js";
import { expectMarkdownToMatchTokens } from "../markdown-test-util";

test.describe("moveBlockItemsRulerPlugin", () => {

  test("should move block links out of inline tokens", async ({ }) => {
    const markdown = "[Link](example.com)\nSome text.";

    const expectedTokens = [
      { type: "link_open", level: 0, block: true },
      { type: "text", level: 1 },
      { type: "link_close", level: 0 },
      { type: "paragraph_open", level: 0 },
      { type: "inline", level: 1 },
      { type: "paragraph_close", level: 0 }
    ] as Token[];

    expectTokens(markdown, expectedTokens);
  });

  test("should remove empty paragraphs in tokens", async ({ }) => {
    const markdown = "[Link](example.com)";

    const expectedTokens = [
      { type: "link_open" },
      { type: "text" },
      { type: "link_close" }
    ] as Token[];

    expectTokens(markdown, expectedTokens);
  });

  test("should handle multiple block links in tokens", async ({ }) => {
    const markdown = "[Link1](example1.com)\n[Link2](example2.com)\nSome text.";

    const expectedTokens = [
      { type: "link_open", attrs: [["href", "example1.com"]] },
      { type: "text", content: "Link1" },
      { type: "link_close" },
      { type: "link_open", attrs: [["href", "example2.com"]] },
      { type: "text", content: "Link2" },
      { type: "link_close" },
      { type: "paragraph_open" },
      {
        type: "inline",
        children: [
          { type: "softbreak" },
          { type: "softbreak" },
          { type: "text", content: "Some text." }
        ]
      },
      { type: "paragraph_close" }
    ] as unknown as Token[];
    expectTokens(markdown, expectedTokens);
  });
});

function setLinkOpensToBlock(tokens: Token[]) {
  tokens
    .filter(token => token.type === "inline")
    .forEach(token => {
      token.children?.forEach(child => {
        if (child.type === "link_open") {
          child.block = true;
        }
      });
    });
}

function expectTokens(markdown: string, expectedTokens: Token[]) {
  const md = new MarkdownIt();
  md.core.ruler.push("driver-ruler", (state) => {
    setLinkOpensToBlock(state.tokens);
  });
  md.use(moveBlockItemsRulerPlugin);
  expectMarkdownToMatchTokens(md, markdown, expectedTokens);
}